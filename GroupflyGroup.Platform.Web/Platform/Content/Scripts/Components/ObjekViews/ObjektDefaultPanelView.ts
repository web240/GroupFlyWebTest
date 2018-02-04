/// <reference path="../UIComponentBase.ts" />

//【对象默认容器视图】
class ObjektDefaultPanelView extends UIComponentBase {

    constructor() {
        super();
    }
    static elementName = "Gf-ObjektDefaultPanelView".toLowerCase();

    protected createComponentEditState() {
        return null;
    }

    protected createComponentBrowseState() {
        return null;
    }

    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }

    /** 对象Id */
    get objektid() {
        return this.getAttribute("objektid");
    }
    set objektid(val) {
        this.setAttribute("objektid", val);
    }
 
    /** 左边宽 */
    get leftwidth() {
        return this.getAttribute("leftwidth");
    }
    set leftwidth(val) {
        this.setAttribute("leftwidth", val);
    }

    /** div */
    private _div: any;

    /** div */
    get div() {
        return this._div;
    }
    set div(val) {
        this._div = val;
    }

    public onRender(): HTMLElement {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        this.isMessageBoundary = false;
        var element = this;

        var div = document.createElement("div");
        element.div = div;
        return div;
    }

    afterRender() {
        var control = this;
        var objektcontentview = Hooks.createComponent(CreateObjektContentViewHook, new HookContext(this));;
        if (objektcontentview != null && objektcontentview != "") {
            control.div.appendChild(objektcontentview);
        }
        else {

            //默认布局视图
            control.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: control.klass, objektid: control.objektid, viewtype: "ObjektCustomFormView" },
                success: function (result) {

                    var obj = JSON.parse(result.Data);
                    var customviewcount = 0;
                    if ("viewtype" in obj) {
                        for (var viewobj in obj) {
                            var view = obj[viewobj]
                            if (view.ishidden == "false") {
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                    if (customviewcount == 0) {
                        //自定义表单视图
                        var toolbar = document.createElement("Gf-ToolBar");
                        var layout = document.createElement("div");

                        control.div.appendChild(layout);

                        $(layout).layout({
                            fit: true
                        });

                        $(layout).layout('add', {
                            region: 'center',
                            collapsible: true,
                            split: true
                        });
                        $(layout).layout('add', {
                            region: 'west',
                            width: control.leftwidth || 500,
                            collapsible: true,
                            split: true
                        });
                        $(layout).layout('add', {
                            region: 'north',
                            height: 36,
                            collapsible: false,
                            split: false
                        });
                        $(layout).layout('add', {
                            region: 'south',
                            height: 350,
                            collapsible: false,
                            split: true
                        });

                        var center = $(layout).find('.layout-panel-center').find('.layout-body');
                        var north = $(layout).find('.layout-panel-north').find('.layout-body');
                        var west = $(layout).find('.layout-panel-west').find('.layout-body');
                        var south = $(layout).find('.layout-panel-south').find('.layout-body');

                        $(north).css("border-bottom", "1px solid lightgray");
                        $(north).append(toolbar);

                        $(control.div).css("width", "100%");
                        $(control.div).css("height", "100%");

                        var objektpropertycollectionview: any = document.createElement("Gf-ObjektPropertyCollectionView"); //对象属性内容视图
                        objektpropertycollectionview.objektid = control.objektid || "";
                        objektpropertycollectionview.klass = control.klass;

                        var objektroctabview: any = document.createElement("Gf-ObjektRocTabView");//对象关联列表视图
                        objektroctabview.objektid = control.objektid || "";
                        objektroctabview.klass = control.klass;

                        if (obj.roccnames.length == 0) {
                            center.html("");
                            center.removeClass("panel-noscroll");
                            center.append(objektpropertycollectionview);
                            $(layout).layout("remove", "west");
                            $(layout).layout("remove", "south");
                        }
                        else {
                            if (obj.viewLayout == 'Vertical') {
                                south.addClass("panel-noscroll");
                                center.html("");
                                center.append(objektpropertycollectionview);
                                center.removeClass("panel-noscroll");
                                $(layout).layout("remove", "west");
                            }
                            else {
                                $(layout).layout("remove", "south");
                                west.append(objektpropertycollectionview);
                                //center.append(objektroctabview);
                            }
                        }
                    }
                }
            });
        }
    }
}
ObjektDefaultPanelView.register();