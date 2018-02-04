/// <reference path="UIComponentBase.ts" />


/** 计算 */
class CalcProperty extends UIComponentBase {

    constructor() {
        super();
    }

    static elementName = "gf-CalcProperty".toLowerCase();

    /** 对象ID */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }

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
        $(div).addClass("GfCalcProperty");
        $(div).attr("width", "99.7%");
        $(div).css("width", "99.7%");

        var calformula = element.formula;

        var p = /\[([^\]]*)\]/g;
        var s = [], m;
        while (m = p.exec(element.formula)) {
            s.push(m[0])
        }

        var obj = element.getObjektData([element.objektId]).get(element.objektId);

        for (var key in s) {
            var propertyobj = obj;
            var propertyvalue = "";
            var propertynames = s[key].replace("[", "").replace("]", "").split("/");
            for (var i = 1; i < propertynames.length; i++) {
                propertyvalue = propertyobj[propertynames[i]];
                if (i == propertynames.length - 1) {
                    break;
                } else {
                    propertyobj = element.getObjektData([propertyvalue]).get(propertyvalue);
                }
            }
            if (propertyvalue) {
                calformula = calformula.replace(s[key], propertyvalue)
            }
        }

        element.value = eval(calformula);
        div.innerHTML = element.value;

        return div;     
    }
}
CalcProperty.register();


