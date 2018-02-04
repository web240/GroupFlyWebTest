/// <reference path="../UIComponentBase.ts" />

/** 视图模型 */
class ViewModel extends UIComponentBase {

    constructor() {
        super();
    }
    static elementName = "Gf-ViewModel".toLowerCase();

    protected createComponentEditState() {
        return null;
    }

    protected createComponentBrowseState() {
        return null;
    }

    /** 对象Id */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }

    /** 视图Id */
    get viewid() {
        return this.getAttribute("viewid");
    }
    set viewid(val) {
        this.setAttribute("viewid", val);
    }

    /** 视图线 */
    get viewline() {
        return this.getAttribute("viewline");
    }
    set viewline(val) {
        this.setAttribute("viewline", val);
    }

    public onRender(): HTMLElement {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var control = this;
        if (!control.state) control.state = UIState.browse;
        var div = document.createElement("div");
        control.set("div", div);
 
        return div;
    }

    afterRender() {

        var control = this;
        control.ajax({
            url: "/GroupflyGroup.Platform.Web/Platform/GetView",
            data: { objektid: control.objektId, viewid: control.viewid, viewline: control.viewline },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                
                var divview = document.createElement("div");
                $(divview).addClass("ViewModel");
                var html = obj.htmlview;
                var isflow = false;
                if (html.indexOf("<div name='flowlayout' style='display:none'>&nbsp;</div>") > -1) {
                    isflow = true;

                    html = html.replace(new RegExp("<p>", "gm"), "")
                    html = "<div>" + html.replace(new RegExp("</p>", "gm"), "") + "</div>"
                }

                html = html.replace("<div name='flowlayout' style='display:none'>&nbsp;</div>", "");
                html = html.replace("<div name='customeditor' style='display:none'>&nbsp;</div>", "");

                var htmlviewobj = $(html);
                var inputs = [];
                for (var propertyname in obj) {
                    var property = obj[propertyname]
                    if (property.ishidden == "false") {
                        var elementname = property['elementname'];
                        var uidiv = $(htmlviewobj).find("div[name='" + property['divname'] + "']");
                        if (isflow) {
                            uidiv.css("float", "left");
                        }
                        if (elementname && uidiv.length > 0) {
                            var ui = document.createElement(elementname);
                            uidiv[0].append(ui);
                           
                            if (elementname == 'Gf-Calcu') {
                                ui['objektId'] = property['objektId'];
                                ui['formula'] = property['formula'];
                                ui['title'] = property['divname'];
                            }
                            else if (elementname == 'Gf-CalcProperty') {
                                ui['objektId'] = property['objektId'];
                                ui['formula'] = property['formula'];
                            }
                            else if (elementname == 'Gf-CalcComponent') {
                                ui['id'] = property['id'];
                                ui['formula'] = property['formula'];
                            }
                            else if (elementname == 'Gf-ViewModel') {
                                ui['objektId'] = property['objektId'];
                                ui['viewid'] = property['viewid'];
                                ui['viewline'] = property['viewline'];
                            }
                            else {
                                ui['id'] = property['id'];
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
                                        uidiv.css("background-color", "#" + property['value'].color);
                                    }
                                }
                                else {
                                }
                            }
                            inputs.push(ui);
                        }
                        else {

                        }
                    }
                }
                
                $(divview).append(htmlviewobj);

                var div = control.get("div");
                div.appendChild(divview);
            }
        });
    }
}

ViewModel.register();