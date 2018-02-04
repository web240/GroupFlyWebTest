/// <reference path="../UIComponentBase.ts" />

//【对象视图】
class ObjektPropertyCollectionView extends UIComponentBase {

    constructor() {
        super();
    }
    static elementName = "Gf-ObjektPropertyCollectionView".toLowerCase();

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

    /** objektid */
    get objektid() {
        return this.getAttribute("objektid");
    }
    set objektid(val) {
        this.setAttribute("objektid", val);
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
        var div = document.createElement("div");
        this.div = div

        return div;
    }


    afterRender() {

 
        var control = this;
        var  objektpropertycollectionview  = Hooks.createComponent(CreateObjektPropertyCollectionViewImpl, new HookContext(this));;
        if (objektpropertycollectionview != null && objektpropertycollectionview != "") {

        } else {
            control.ajax({
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: control.klass, objektid: control.objektid, viewtype: "ObjektDetailView" },
                success: function (result) {
                    var obj = JSON.parse(result.Data);
                    control.set("ServerObjekt", obj);

                    var div = control.get("div");
                    var customviewcount = 0;
                    var viewid = "";
                    if ("viewtype" in obj) {
                        //自定义对象内容视图
                        for (var viewobj in obj) {
                            var view = obj[viewobj]
                            if (view.ishidden == "false") {
                                viewid = view['viewid'];
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                    if (customviewcount > 0) {
                        if (customviewcount == 1) {
                            var viewmodel = document.createElement("gf-viewmodel");
                            viewmodel["objektid"] = control.objektid
                            viewmodel["viewid"] = viewid;
                            div.appendChild(viewmodel);
                        } else {
                            var tab = document.createElement("Gf-Tabs");
                            tab["lazyload"] = true;
                            tab["fit"] = true;
                            div.appendChild(tab);
                            tab["closeAll"]();
                            for (var viewobj in obj) {
                                var view = obj[viewobj]
                                if (view.ishidden == "false") {
                                    viewid = view['viewid'];
                                    var viewname = view['viewname'];
                                    var id = control.getUniqueId(control.klass);
                                    var href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView" + "?objektid=" + control.objektid + "&viewid=" + viewid;
                                    tab["add"](id, viewname, href, "", false);
                                    customviewcount = customviewcount + 1;
                                }
                            }
                            tab["select"](0);
                        }
                    }
                    else {
                        $(control.div).empty();
                        //默认对象内容视图
                        var table = document.createElement("table");
                        $(table).addClass("ObjektDefaultView");

                        var inputs = [];
                        for (var propertyname in obj) {
                            var property = obj[propertyname]
                            if (property.ishidden == "false") {
                                var elementname = property['elementname'];
                                var tr = document.createElement("tr");
                                var th = document.createElement("th");
                                $(th).addClass("PropertyLabel");
                                $(th).attr("title", property["description"]);
                                var label = property['required'] == "true" ? "*" + property["label"] : property["label"];
                                $(th).text(label + "：");
                                var td = document.createElement("td");
                                $(td).addClass("PropertyValue");
                                $(tr).append(th).append(td);
                                $(table).append(tr);
                                if (elementname) {
                                    var ui = document.createElement(elementname);
                                    $(td).append(ui);
                                    ui['name'] = property['name'];
                                    ui['label'] = property['label'];
                                    ui['description'] = property['description'];
                                    ui['filterid'] = property['filterid'];
                                    ui['objektId'] = property['objektId'];
                                    ui['propertyName'] = property['propertyName'];
                                    ui['width'] = property['width'];
                                    ui['height'] = property['height'];
                                    ui['autosave'] = property['autosave'] == "true";
                                    ui['readonly'] = property['readonly'] == "true";
                                    ui['hidden'] = property['hidden'] == "true";
                                    ui['required'] = property['required'] == "true";
                                    ui['prec'] = property['prec'];
                                    ui['scale'] = property['scale'];

                                    if (elementname == 'Gf-ObjektPropertyView') {
                                        ui['href'] = property['href'];
                                        ui['klass'] = property['klass'];
                                    }
                                    else if (elementname == 'Gf-ListPropertyView') {

                                        ui['valuefield'] = property['valuefield'];
                                        ui['textfield'] = property['textfield'];
                                        ui['defaultoption'] = property['defaultoption'];
                                        ui['data'] = property['data'];
                                        if (property['value'] && property['value'].color) {
                                            $(td).css("background-color", "#" + property['value'].color);
                                        }
                                    }
                                    inputs.push(ui);
                                }
                                else {
                                    $(td).html(property['value']);
                                }
                            }
                        }
                        control.set("inputs", inputs);
                        control.div.appendChild(table);
                    }
                }
            });

        }
    }

 
 
     
}
ObjektPropertyCollectionView.register();