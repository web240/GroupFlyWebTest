/// <reference path="UIComponentBase.ts" />

/** 工具栏 */
class ToolBar extends UIComponentBase {
    constructor() {
        super();
    }
    static elementName = "Gf-ToolBar".toLowerCase();

    /** 是否显示查询框 */
    private _isShowQuery = false;

    /** 是否包含子类 */
    private _isIncludeSubKlass = false;

    /** 是否显示查询框 */
    get isShowQuery() {
        return this._isShowQuery;
    }
    set isShowQuery(val) {
        this._isShowQuery = val;
        if(val){
            this.selectButton("query");
        }
        else{
            this.unSelectButton("query");
        }
    }
    /** 是否包含子类 */
    get isIncludeSubKlass() {
        return this._isIncludeSubKlass;
    }
    set isIncludeSubKlass(val) {
        this._isIncludeSubKlass = val;
        if(val){
            this.selectButton("subclass");
        }
        else{
            this.unSelectButton("subclass");
        }
    }

    /** 选中的对象集合 */
    get selected() {
        return this.get("selected");
    }
    set selected(val) {
        this.set("selected", val);
        this.checkToShow();
    }

    /** 隐藏工具按钮集合 */
    get hidetools() {
        return this.get("hidetools");
    }
    set hidetools(val) {
        this.set("hidetools", val);
    }

    /** 容器 */
    get toolbarDiv() {
        return this.get("toolbarDiv");
    }

    public onToolbarCommand(handler:(name:string)=>void){
        this.addHook(EventNames.ToolbarCommand,handler);
    }

    public onToolbarCommandSuccess(handler:(name:string)=>void){
        this.addHook(EventNames.ToolbarCommandSuccess,handler);
    }

    public onCheckToShow(handler:()=>void){
        this.addHook(EventNames.CheckToShow,handler);
    }

    public selectButton(toolname) {
        this.setButtonSelectByName(toolname, true);
    }
    public unSelectButton(toolname) {
        this.setButtonSelectByName(toolname, false);
    }

    public showTool(toolname) {
        this.setToolVisibleByName(toolname, true);
    }
    public hideTool(toolname) {
        this.setToolVisibleByName(toolname, false);
    }

    protected setToolVisibleByName(toolname: string, visible: boolean) {
        var tool = this.getToolByName(toolname);
        this.setToolVisible(tool, visible);
    }

    protected setToolVisible(tool, visible: boolean) {
        if (visible) {
            $(tool).show();
            $(tool).css("display", "inline-block");
        }
        else {
            $(tool).hide();
        }
    }

    protected setButtonSelectByName(toolname: string, select: boolean) {
        var tool = this.getToolByName(toolname);
        var method = select ? "select" : "unselect";
        $(tool).linkbutton(method);
    }

    protected getToolByName(toolname: string) {
        var toolbar = this.get("toolbar");
        for (var name in toolbar) {
            if (name == toolname) {
                return toolbar[name];
            }
        }
    }

    public addButton(option) {
        var element = this;
        var button = this.createButton(option.label, option.icon, function () {
            element.fireHook(EventNames.ToolbarCommand, [option.name]);
        }, option.whenToShow);

        option.tool = button;
        this.addTool(option);
    }

    public addTool(option) {
        var tool = option.tool;
        var toolbar = this.get("toolbar");

        if (option.whenToShow) {
            if (option.whenToShow.stateToShow) {
                $(tool).attr("stateToShow", option.whenToShow.stateToShow);
            }
            if (option.whenToShow.selectToShow) {
                $(tool).attr("selectToShow", option.whenToShow.selectToShow);
            }
        }
        if (option.before) {
            for (var toolname in toolbar) {
                if (toolname == option.before) {
                    $(toolbar[toolname]).before(tool);
                }
            }
        }
        else if (option.after) {
            for (var toolname in toolbar) {
                if (toolname == option.after) {
                    $(toolbar[toolname]).after(tool);
                }
            }
        }
        else {
            var toolbarDiv = this.get("toolbarDiv");
            $(toolbarDiv).append(tool);
        }
        toolbar[option.name] = tool;
    }

    protected checkToShow() {
        var element = this;
        var total = 0;
        var readCounts = 0;
        var deleteCounts = 0;
        var toolbar = element.get("toolbar");
        var selected = element.selected || [];
        if (selected) {
            total = selected.length;
            $(selected).each(function () {

                var canRead = this.permissioncode[1] === "1";
                var canDelete = this.permissioncode[4] === "1";
                if (canRead) {
                    readCounts += 1;
                }
                if (canDelete) {
                    deleteCounts += 1;
                }
            });

            var checkState = function (tool, stateToShow) {
                var show = (!stateToShow || stateToShow === element.state);
                element.setToolVisible(tool, show);
            };

            var checkObjKlass = function (array) {
                var isKlass = true;
                if (array && array.length > 0) {
                    $(array).each(function () {
                        if (!element.isString(this.id)) {
                            this.id = this.id.value;
                        }
                        var klass = this.id.split('@')[1];
                        if (klass.toLowerCase() != 'klass') {
                            isKlass = false;
                        }
                    });
                }
                else {
                    isKlass = false;
                }
                return isKlass;
            }

            var checkTrash = function (array, isTrash) {
                var cando = true;
                if (array && array.length > 0) {
                    $(array).each(function () {
                        if (this.isTrash.toString().toLowerCase() == isTrash.toString().toLowerCase())
                            cando = false;
                    });
                }
                else {
                    cando = false;
                }
                return cando;
            };

            var checkPermission = function (array) {
                if (!array || array.length == 0) {
                    return false;
                }
                var obj = array[0];
                if (obj.$ && obj.$ == 'C') {
                    return false;
                }
                //有当前对象的授权权或者当前权限对象的查看权
                var canAuthorize = obj.permissioncode[4] == '1';
                var canRead = false;
                if (obj.permission) {
                    var permissioncode = obj.permission.permissioncode;
                    canRead = (permissioncode && permissioncode[1] == '1');
                }
                $.parser.parse();
                return (canAuthorize || canRead);
            };

            for (var toolname in toolbar) {
                var tool = toolbar[toolname];
                var stateToShow = $(tool).attr("stateToShow");
                var selectToShow = $(tool).attr("selectToShow");

                if (selectToShow == "singleSelect") {
                    if (total != 1) {
                        $(tool).hide();
                    }
                    else if (toolname == "open" && readCounts != 1) {
                        $(tool).hide();
                    }
                    else if (toolname == "permission") {
                        if (!checkPermission(selected)) {
                            $(tool).hide();
                        }
                        else {
                            if (!tool["initcompleted"]) {
                                tool["init"]();
                            }
                            $(tool).show();
                        }
                    }
                    else {
                        checkState(tool, stateToShow);
                    }
                }
                else if (selectToShow == "select") {
                    if (total == 0) {
                        $(tool).hide();
                    }
                    else if (toolname == "del" && deleteCounts != total) {
                        $(tool).hide();
                    }
                    else if (toolname == "trash" && (deleteCounts != total || !checkTrash(selected, true))) {
                        $(tool).hide();
                    }
                    else if (toolname == "untrash" && (deleteCounts != total || !checkTrash(selected, false))) {
                        $(tool).hide();
                    }
                    else if (toolname == "uml" && !checkObjKlass(selected)) {
                        $(tool).hide();
                    }
                    else {
                        checkState(tool, stateToShow);
                    }
                }
                else {
                    checkState(tool, stateToShow);
                }


            }
            element.fireHook(EventNames.CheckToShow);
        }

        if (element.hidetools) {
            if (element.hidetools == 'all') {
                var toolbar = element.get("toolbarDiv");
                $(toolbar).hide();
            }
            else {
                var toolbar = element.get("toolbar");
                $(element.hidetools).each(function () {
                    if (toolbar[this]) {
                        $(toolbar[this]).hide();
                    }
                });
            }
        }

    }

    protected handleIdshower() {
        var objectArray = this.get("selected");
        if (objectArray.length > 0) {
            var ids = '<div style="padding:15px;">';
            $(objectArray).each(function () {
                ids += '<p>"' + this['combinedtitle'] + '"的ID： ' + this["id"] + '</p>';
            });
            ids += "</div>";
            ComponentRoot.openDialog({
                id: this.id + "-CheckID",
                width: 500,
                height: 200,
                title: '查看ID',
                content: ids
            });
        }
    }
    protected handlePermission() {
        var objectArray = this.get("selected");
        if (objectArray.length > 0) {
            this.get("toolbar").permission.load(objectArray[0]);
        }
    }
    protected handleReference() {
        var objectArray = this.get("selected");
        $(objectArray).each(function () {
            var id = this["id"];
            var name = this["combinedtitle"];
            ComponentRoot.openDialog({
                id: id,
                width: 800,
                title: '引用“' + name + '”的对象',
                href: ComponentRoot.APIs.reference + "?id=" + id
            });
        });
    }
    protected handleUml() {
        var objectArray = this.get("selected");
        if (objectArray.length > 0) {
            var ids = '';
            $(objectArray).each(function () {
                ids += this["id"];
                ids += ',';
            });
            var umlParam = new UmlParams();
            umlParam.ids = ids;
            umlParam.init();
            umlParam.open();
        }
    }
    protected handleTrash() {
        var element = this;
        var objectArray = element.get("selected");
        if (objectArray.length > 0) {
            element.confirm("是否确认回收？", function () {
                var ids = "";
                $(objectArray).each(function () {
                    ids += this["id"] + ",";
                });
                element.setTrash(ids, true);
            });
        }
    }
    protected handleUntrash() {
        var element = this;
        var objectArray = element.get("selected");
        if (objectArray.length > 0) {
            var ids = "";
            $(objectArray).each(function () {
                ids += this["id"] + ",";
            });
            element.setTrash(ids, false);
        }
    }
    protected setTrash(objektIds, isTrash) {
        var element = this;
        window["ajaxLoading"]();
        window["platformAjax"]({
            url: ComponentRoot.APIs.setTrash,
            data: { objektIds: objektIds, isTrash: isTrash },
            success: function (result) {
                var toolname = isTrash ? "trash" : "untrash";
                element.sendMessage(new UIMessageRefreshing());
                element.fireHook(EventNames.ToolbarCommandSuccess, [toolname]);
            },
            finallyCall: function (result) {
                window["ajaxLoadEnd"]();
            }
        });
    }
    
    protected onRecievedMessage(message:UIMessage,source:UIComponentBase){
        super.onRecievedMessage(message,source);
        if(message instanceof UIMessageObjektSelected){
            var ObjektSelectedMessage = message as UIMessageObjektSelected;
            this.selected = ObjektSelectedMessage.currentSelected;
        }
        if(message instanceof UIMessageStateSwitched){
            this.checkToShow();
        }
    }

    protected created() {
        var element = this;
        if (!$(element).attr("hidetools")) {
            element.set("hidetools", []);
        }
        else {
            element.set("hidetools", this.stringToObject($(element).attr("hidetools")));
        }
        element.addHook(EventNames.ToolbarCommand, function (toolname) {
            switch (toolname) {
                case "idshower":
                    element.handleIdshower();
                    break;

                case "reference":
                    element.handleReference();
                    break;

                case "trash":
                    element.handleTrash();
                    break;

                case "untrash":
                    element.handleUntrash();
                    break;

                case "uml":
                    element.handleUml();
                    break;

                case "permission":
                    element.handlePermission();
                    break;
            }
        });
        super.created();
    }
    public onRender() {
        if(this.renderedHTMLElement){
            return this.renderedHTMLElement;
        }
        var element = this;
        var edit = this.createButton("编辑", "fa fa-pencil-square-o", function () {
            element.sendMessage(new UIMessageStateSwitching(element.state, UIState.edit));
        }, { stateToShow: "browse" });

        var read = this.createButton("浏览", "fa fa-square-o", function () {
            element.sendMessage(new UIMessageStateSwitching(element.state, UIState.browse));
        }, { stateToShow: "edit" });

        var open = this.createButton("打开", "fa fa-folder-open-o", function () {
            element.sendMessage(new UIMessageObjektOpend());
        }, { selectToShow: "singleSelect" });

        var add = this.createButton("新建", "fa fa-plus", function () {
            element.sendMessage(new UIMessageObjektCreated());
        }, { stateToShow: "edit" });

        var del = this.createButton("删除", "fa fa-minus", function () {
            element.sendMessage(new UIMessageObjektDeleted());
        }, { selectToShow: "select", stateToShow: "edit" });

        var save = this.createButton("保存", "fa fa-floppy-o", function () {
            element.sendMessage(new UIMessageSaving());
        }, { stateToShow: "edit" });

        var refresh = this.createButton("刷新", "fa fa-refresh", function () {
            element.sendMessage(new UIMessageRefreshing());
        });

        var subclass = this.createButton("包含子类", "fa fa-sitemap", function () {
            element.isIncludeSubKlass = !element.isIncludeSubKlass;
            element.sendMessage(new UIMessageIncludeSubKlassChanged(element.isIncludeSubKlass));
        });

        var query = this.createButton("查询", "fa fa-search", function () {
            element.isShowQuery = !element.isShowQuery;
            element.sendMessage(new UIMessageShownQueryChanged(element.isShowQuery));
        });

        var exporter = this.createButton("导出", "fa fa-file-excel-o", function () {
            element.sendMessage(new UIMessageExported());
        });

        var idshower = this.createButton("查看ID", "fa fa-id-card-o", function () {
            element.fireHook(EventNames.ToolbarCommand, ["idshower"]);
        }, { selectToShow: "select" });

        var reference = this.createButton("查看引用", "fa fa-arrow-left", function () {
            element.fireHook(EventNames.ToolbarCommand, ["reference"]);
        }, { selectToShow: "singleSelect" });

        var trash = this.createButton("回收", "fa fa-trash-o", function () {
            element.fireHook(EventNames.ToolbarCommand, ["trash"]);
        }, { selectToShow: "select" });

        var untrash = this.createButton("还原", "fa fa-recycle", function () {
            element.fireHook(EventNames.ToolbarCommand, ["untrash"]);
        }, { selectToShow: "select" });

        var uml = this.createButton("UML", "fa fa-retweet", function () {
            element.fireHook(EventNames.ToolbarCommand, ["uml"]);
        }, { selectToShow: "select" });

        var permission = new Authorization();
        permission["selecttoshow"] = "singleSelect";
        permission.onBeforeShow(function () {
            element.fireHook(EventNames.ToolbarCommand, ["permission"]);
        });
        permission["init"]();

        $(query).linkbutton("options").toggle = true;
        $(subclass).linkbutton("options").toggle = true;

        var div = document.createElement("div");
        div.id = this.getUniqueId("toolbar");
        //$(div).addClass("datagrid-toolbar");
        div.appendChild(edit);
        div.appendChild(read);
        div.appendChild(open);
        div.appendChild(add);
        div.appendChild(del);
        div.appendChild(save);
        div.appendChild(refresh);
        div.appendChild(subclass);
        div.appendChild(query);
        div.appendChild(exporter);
        div.appendChild(idshower);
        div.appendChild(reference);
        div.appendChild(trash);
        div.appendChild(untrash);
        div.appendChild(permission);
        div.appendChild(uml);

        element.set("toolbar", {
            add: add, del: del, edit: edit, save: save, read: read, permission: permission,
            exporter: exporter, open: open, query: query, refresh: refresh, subclass: subclass,
            trash: trash, untrash: untrash, idshower: idshower, reference: reference, uml: uml
        });
        element.set("toolbarDiv", div);
        element.checkToShow();
        return div;
    }

}
ToolBar.register();