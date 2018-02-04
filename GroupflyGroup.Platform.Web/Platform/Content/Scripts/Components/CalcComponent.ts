/// <reference path="UIComponentBase.ts" />


/** 计算 */
class CalcComponent extends UIComponentBase {

    constructor() {
        super();
    }

    static elementName = "gf-CalcComponent".toLowerCase();

    /** 公式 */
    get formula() {
        return this.getAttribute("formula");
    }
    set formula(val) {
        this.setAttribute("formula", val);
    }

    /** 值 */
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        this.setAttribute("value", val);
    }

    /** 高 */
    get height() {
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val);
    }

    /** 宽 */
    get width() {
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val);
    }

    
    public onRender(): HTMLElement {
        var element = this;
        var div = document.createElement("div");
        $(div).addClass("GfCalcu");
        $(div).attr("width", "99.7%");
        $(div).css("width", "99.7%");

        var calformula = element.formula;

        var p = /\[([^\]]*)\]/g;
        var s = [], m;
        while (m = p.exec(element.formula)) {
            s.push(m[0])
        }

        for (var key in s) {
            var componentid = s[key].replace("[", "").replace("]", "").split("/");
            var componentobj: any = document.getElementById(componentid);
            if (componentobj) {
                var componentvalue = componentobj.getValue();
                if (componentvalue) {
                    calformula = calformula.replace(s[key], componentvalue)
                }
            }
        }

        element.value = eval(calformula);
        div.innerHTML = element.value;

        //element.appendChild(div);

        return div;     
    }
}
CalcComponent.register();


