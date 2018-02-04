/// <reference path="../UIComponentBase.ts" />

//【对象视图】
class GfObjektView extends UIComponentBase {

    constructor() {
        super();
    }
    static elementName = "Gf-ObjektView".toLowerCase();

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

    /** 左边宽 */
    get leftwidth() {
        return this.getAttribute("leftwidth");
    }
    set leftwidth(val) {
        this.setAttribute("leftwidth", val);
    }

    /** 工具栏 */
    get toolbar() {
        return this.get("toolbar");
    }

    public onRender(): HTMLElement {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        this.isMessageBoundary = true;
        var element = this;
        if (!element.state) element.state = UIState.browse;//"read";
        var div = document.createElement("div");
        element.set("div", div);


        return div;
        
    }


    afterRender() {
        var element = this;
        var div =  element.get("div");
        var toolbar = document.createElement("Gf-ToolBar");

        element.set("toolbar", toolbar);

        var layout = document.createElement("div");
        element.set("layout", layout);
        div.appendChild(layout);

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
            width: element.leftwidth || 500,
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
        element.set("center", center);
        element.set("west", west);
        element.set("south", south);
        element.set("top", north);
        $(north).css("border-bottom", "1px solid lightgray");
        $(north).append(toolbar);
 
        var control = this;
        $(div).css("width", "100%");
        $(div).css("height", "100%");
 

        var tab = document.createElement("Gf-Tabs");
        $(center).append(tab);
        element.set("tab", tab);

       
        this.buildPropertyControls(element, true);

    }
 

    protected buildPropertyControls(element, firstLoad) {
        var control = this;
        var change = element.get("changeObject");
        if (change && change["dataType"]) {
            var datatype = JSON.parse(change["dataType"]);
            element.set("PropertyDataType", datatype.id);
        }

        control.ajax({
            url: ComponentRoot.APIs.getObjWithMeta,
            data: { id: element.objektid, klass: element.klass, dataTypeId: element.get("PropertyDataType") },
            success: function (result) {
                var toolbar = element.get("toolbar");
                var tabid = element.get("tabid");
                var tab = element.get("tab");
                var layout = element.get("layout");
                var center = element.get("center");
                var west = element.get("west");
                var north = element.get("north");
                var south = element.get("south");
                var obj = JSON.parse(result.Data);
                element.set("ServerObjekt", obj);
                toolbar.selected = [
                    {
                        id: obj.id.value,
                        permission: obj.permission.value,
                        permissioncode: obj.permissioncode,
                        combinedtitle: obj.combinedtitle,
                        isTrash: obj.isTrash.value
                    }
                ];

                var table = document.createElement("table");
                $(table).addClass("ObjektView");

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
                            ui['objektId'] = property['objektid'];
                            ui['propertyname'] = property['propertyname'];
                            ui['width'] = property['width'];
                            ui['height'] = property['height'];
                            //ui['state'] = property['state'];
                            ui['autosave'] = property['autosave'] == "true";
                            ui['readonly'] = property['readonly'] == "true";
                            ui['hidden'] = property['hidden'] == "true";
                            ui['required'] = property['required'] == "true";
                            ui['prec'] = property['prec'];
                            ui['scale'] = property['scale'];

                            if (elementname == 'Gf-ObjektPropertyView') {
                                ui['value'] = JSON.stringify(property['value']);
                                ui['idfield'] = property['idfield'];
                                ui['namefield'] = property['namefield'];
                                ui['href'] = property['href'];
                                ui['klass'] = property['klass'];
                            }
                            else if (elementname == 'Gf-ListPropertyView') {
                                ui['value'] = JSON.stringify(property['value']);
                                ui['valuefield'] = property['valuefield'];
                                ui['textfield'] = property['textfield'];
                                ui['defaultoption'] = property['defaultoption'];
                                ui['data'] = property['data'];
                                if (property['value'] && property['value'].color) {
                                    $(td).css("background-color", "#" + property['value'].color);
                                }
                            }
                            else {
                                ui['value'] = property['value'];
                            }
                            //ui["init"]();
                            inputs.push(ui);
                        }
                        else {
                            $(td).html(property['value']);
                        }

                    }

                }
                element.set("inputs", inputs);

                if (obj.roccnames.length == 0) {
                    center.html("");
                    center.removeClass("panel-noscroll");
                    center.append(table);
                    $(layout).layout("remove", "west");
                    $(layout).layout("remove", "south");
                    element.set("hasRelated", false);
                }
                else {
                    if (obj.viewLayout == 'Vertical') {
                        $(tab).appendTo(south[0])
                        south.addClass("panel-noscroll");
                        center.html("");
                        center.append(table);
                        center.removeClass("panel-noscroll");
                        $(layout).layout("remove", "west");
                    }
                    else {
                        $(layout).layout("remove", "south");
                        west.find("table").remove();
                        west.append(table);
                    }
                    element.set("hasRelated", true);
                    tab["lazyload"] = true;
                    //tab["init"]();
                    tab["closeAll"]();
                    $(obj.roccnames).each(function () {
                        var klass = this.split('-')[0];
                        var title = this.split('-')[1];
                        var id = control.getUniqueId(klass);
                        var href = ComponentRoot.APIs.rocView + "?klass=" + klass + "&id=" + element.objektid + "&sourceKlass=" + element.klass;
                        tab["add"](id, title, href, "", false);
                    });
                    tab.addEventListener("onLazyLoad", function (index) {
                        var subTab = tab["getTab"](index);
                        var grid = $(subTab).find("Gf-ObjektCollectionView")[0];
                        //if (grid && tab["state"] == "edit")
                            //grid.setState("edit");
                    });
                    tab.addEventListener("onStateChange", function () {
                        var tabs = tab["getAllTabs"]();
                        $(tabs).each(function () {
                            var grid = $(this).find("Gf-ObjektCollectionView")[0];
                            if (grid) {
                                //grid.setState(tab["state"]);
                            }
                        });
                    });
                    if (firstLoad) {
                        //element.registerEventHandler("onStateChange", function () {
                        //    if (element.state == "edit")
                        //        tab["setState"](element.state);
                        //});
                    }
                    //tab["setState"](element.state);
                    tab["select"](0);
                }

                //后处理
                for (var inputitem in inputs) {
                    //inputs[inputitem]["init"]();
                }

                $(element.get("layout")).layout("resize", { width: '100%', height: '100%' });
                //control.setState(element, element.state);
                if (firstLoad) {
                    $(inputs).each(function () {
                        var input = this;
                        if (change && input.propertyname in change) {
                            if (input.initcompleted)
                                input.setValue(change[input.name]);
                             
                                //input.registerEventHandler("onafterinit", function () {
                                //    input.setValue(change[input.name]);
                                //});
                        }
                    });
                   // element.triggerEventHandler("oninitLoaded");
                }
            }
        });
    }
}
GfObjektView.register();