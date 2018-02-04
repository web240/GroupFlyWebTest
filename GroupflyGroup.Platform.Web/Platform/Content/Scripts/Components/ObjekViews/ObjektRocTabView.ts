/// <reference path="../UIComponentBase.ts" />


//【对象关联对象视图】
class ObjektRocTabView extends UIComponentBase {

    constructor() {
        super();
    }
    static elementName = "Gf-ObjektRocTabView".toLowerCase();

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

    public onRender(): HTMLElement {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        //this.isMessageBoundary = true;
        var element = this;
        var div = document.createElement("div");
        $(div).css("width", "100%");
        $(div).css("height", "100%");
        element.set("div", div);

        return div;

    }

    afterRender() {
        var control = this;
        control.ajax({
            url: ComponentRoot.APIs.getObjWithMeta,
            data: { id: control.objektid, klass: control.klass, dataTypeId: control.get("PropertyDataType") },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                control.set("ServerObjekt", obj);

                if (obj.roccnames.length > 0 && obj.viewLayout != 'Vertical') {
                    var div = control.get("div");
                    var tab = document.createElement("Gf-Tabs");
                    tab["fit"] = true;
                    tab["lazyload"] = true;
                    div.appendChild(tab);
                    tab["closeAll"]();

                    $(obj.roccnames).each(function () {
                        var klass = this.split('-')[0];
                        var title = this.split('-')[1];
                        var id = control.getUniqueId(klass);
                        var href = ComponentRoot.APIs.rocView + "?klass=" + klass + "&id=" + control.objektid + "&sourceKlass=" + control.klass;
                        //href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView?objektid=63c8fd5f5a094ae9bee8b3af1e1e7bda@Test&viewid=f4e5f307a2954403a8ab6430c173ca12@ObjektDetailView";
                        tab["add"](id, title, href, "", false);
                    });
                    tab["select"](0);
                }
            }
        });

    }
 
}
ObjektRocTabView.register();