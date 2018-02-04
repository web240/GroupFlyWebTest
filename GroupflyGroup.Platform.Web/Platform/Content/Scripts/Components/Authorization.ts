/// <reference path="UIComponentBase.ts" />

/** 授权 */
class Authorization extends UIComponentBase {
    constructor() {
        super();
    }

    static elementName = "Gf-Authorization".toLowerCase();

    /** 在何种对象选择情况下显示（选择：'select'，单选:'singleSelect'，多选:'multiSelect'） */
    get selecttoshow(){
        return this.getAttribute("selecttoshow");
    }
    set selecttoshow(val){
        this.setAttribute("selecttoshow",val);
    }
    
    /** 获取权限选项数据api */
    get dataurl(){
        return this.getAttribute("dataurl");
    }
    set dataurl(val){
        this.setAttribute("dataurl",val);
    }
    
    public onBeforeShow(handler:()=>void){
        this.addHook(EventNames.BeforeShow,handler);
    }

    public onAfterShow(handler:()=>void){
        this.addHook(EventNames.AfterShow,handler);
    }


    public load(entity) {
        var element = this;
        element.ajax({
            url: element.dataurl || ComponentRoot.APIs.getAuthorization,
            sync: true,
            data: { id: entity.id },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                if (obj.NotExists) {
                    element.hide();
                    return;
                }
                var Permissions = JSON.parse(obj.Permissions);
                var current = element.stringToObject(obj.Current);
                var AllowPrivate = obj.AllowPrivatePermission;

                //当前权限对象的读取权
                var currentRead = current.permissioncode[1] === '1';
                //源对象的授权权
                var sourceAuthorize = obj.PermissionCode[4] === '1';

                element.set("source", entity);
                element.set("Current", current);
                element.set("Permissions", Permissions);
                element.set("model", obj);

                element.clearMenu();

                var menu = element.get("menu");


                if (currentRead) {
                    $('#' + menu.id).menu('appendItem', {
                        text: '查看当前权限',
                        iconCls: '',
                        onclick: function () {
                            ComponentRoot.openObjDetail({
                                controlid: null,
                                objid: current.id,
                                klass: current.klass,
                                title: current.combinedtitle
                            });
                        }
                    });

                    $('#' + menu.id).menu('appendItem', {
                        separator: true
                    });
                }


                if (sourceAuthorize) {

                    if (AllowPrivate) {
                        $('#' + menu.id).menu('appendItem', {
                            text: '分派“私有权限”',
                            iconCls: '',
                            onclick: function () {
                                element.createPrivatePermission();
                            }
                        });
                    }

                    $(Permissions).each(function () {

                        var id = this.Id.replace("@", "-");
                        var label = this.Label;
                        var description = this.Description;
                        var isCurrent = this.IsCurrent;
                        var code = this.PermissionCode;
                        var icon = "";
                        if (this.IsDefault) {
                            label += '[默认]';
                        }
                        if (this.IsCurrent) {
                            icon = 'fa fa-check iconfont';
                        }
                        else {
                            label = '分派“' + label + '“';
                        }

                        var item = {
                            id: id,
                            description: description,
                            isCurrent: isCurrent,
                            text: code[0] === '1' ? label : '无发现权',//权限对象的发现权
                            iconCls: icon,
                            onclick: function () {
                                if (!item.isCurrent) {
                                    element.authorize(item.id, null);
                                }
                            }
                        };
                        $('#' + menu.id).menu('appendItem', item);
                        $('#' + item.id).attr("title", description);
                        element.get("menuItems").push(item);

                    });
                }
            }
        });
    }

    public hide() {
        var menu = this.get("menu");
        $(menu).menu("hide");
        $(menu).hide();
        $(this).hide();
    }

    protected clearMenu() {
        var menu = this.get("menu");
        var items = this.get("menuItems");
        $(items).each(function () {
            var item = $('#' + menu.id).menu('findItem', this.text);
            $(item.target).remove();
        });
        $(menu).html("");
        this.set("menuItems", []);

    }

    protected createPrivatePermission() {
        var element = this;
        element.confirm("将为当前对象分派私有权限。<br>初始私有权限复制于当前对象的“默认权限”，以便编辑设置该私有权限。<br>【确定】继续分派，【取消】返回", function () {
            element.ajax({
                url: ComponentRoot.APIs.getNewPrivatePermission,
                sync: true,
                data: { id: element.get("source").id },
                success: function (result) {
                    var permission = JSON.parse(result.Data);
                    ComponentRoot.openObjDetail({
                        controlid: permission.id,
                        objid: permission.id,
                        klass: 'ObjektPermission',
                        title: permission.combinedtitle,
                        oninitLoaded: function () {
                            this.state = UIState.edit;
                        }
                    });
                }
            });
        });
    }

    protected authorize(permissionId, onsuccess) {
        var element = this;
        element.ajax({
            url: ComponentRoot.APIs.authorize,
            data: { id: element.get("source").id, permissionId: permissionId },
            success: onsuccess || function (result) { }
        });
    }

    public onRender() {
        var span = document.createElement("span");
        var element = this;
        var button = document.createElement("a");
        var menuid = this.getUniqueId("menu");
        $(button).addClass("easyui-menubutton");
        $(button).text("权限");
        $(button).attr("href", "javascript:void(0)");
        $(button).attr("data-options", "menu:'#" + menuid + "',iconCls:'fa fa-key iconfont'");
        button.id = this.getUniqueId("menubutton");

        var menu = document.createElement("div");
        menu.id = menuid;
        $(menu).hide();
        $(menu).css("width", 220);

        $(button).blur(function () {
            if (!element.get("clicked")) {
                $(menu).menu("hide");
                $(menu).hide();
            }
        });
        $(button).click(function () {
            element.fireHook(EventNames.BeforeShow);
            element.set("clicked", true);
            $(menu).menu("show");
            $(menu).show();
            element.fireHook(EventNames.AfterShow);
        });
        $(button).mouseout(function () {
            element.set("clicked", false);
        });

        span.appendChild(menu);
        span.appendChild(button);
        element.set("button", button);
        element.set("menu", menu);
        element.set("menuItems", []);

        $("#" + button.id).menubutton({
            iconCls: 'fa fa-key',
            menu: '#' + menuid
        });

        $(button).children("span").css("border", "1px solid #e1e6eb");
        $(button).children("span").css("border-radius", "3px");
        $(button).children("span").attr("title", "权限");

        return span;
    }
}
Authorization.register();