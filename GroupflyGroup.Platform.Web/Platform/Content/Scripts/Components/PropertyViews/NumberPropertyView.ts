/// <reference path="StringPropertyView.ts" />
/** 小数属性组件 */
class NumberPropertyView extends StringPropertyView {
    
    constructor() {
        super();
        this.defaultMaxValue = 9007199254740992;
        this.defaultMinValue = -9007199254740992;
        this.defaultPrecision = 16;
        this.defaultScale = 8;
    }

    static elementName = "Gf-NumberPropertyView".toLowerCase();
    /** 默认最大值*/
    protected defaultMaxValue: number;
    /** 默认最小值*/
    protected defaultMinValue: number;
    /** 默认整数位数*/
    protected defaultPrecision: number;
    /** 默认小数位数*/
    public defaultScale: number;


    protected createComponentBrowseState() {
        return new NumberPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new NumberPropertyViewEdit(this);
    }


    /** 小数位数 */
    get scale(){
        return this.getAttribute("scale");
    }
    set scale(val){
        this.setAttribute("scale",val);
    }

    /** 整数位数 */
    get prec(){
        return this.getAttribute("prec");
    }
    set prec(val){
        this.setAttribute("prec",val);
    }

    /** 最小值 */
    get min(){
        return this.getAttribute("min");
    }
    set min(val){
        this.setAttribute("min",val);
    }

    /** 最大值 */
    get max(){
        return this.getAttribute("max");
    }
    set max(val){
        this.setAttribute("max",val);
    }
    
    /**
     * 值数据类型转换
     * @param value 值
     */
    protected valueConvert(value:string){
        if(!value){
            return null;
        }
        return parseFloat(value);
    }

    /* protected valueEquals(oldValue, newValue) {
        if (!oldValue && !newValue) {
            return true;
        }
        return parseFloat(oldValue) == parseFloat(newValue);
    } */

    public getValueRange() {

        //整数位数允许的最大值
        var precisionMax = 1;
        //小数位数决定的小数点后的部分
        var scaleMin = "";

        var precision = Math.min(parseInt(this.prec || this.defaultPrecision.toString()), this.defaultPrecision);
        if (precision > 0) {
            for (var i = 0; i < precision; i++) {
                precisionMax = precisionMax * 10;
            }
        }
        var scale = Math.min(parseInt(this.scale || this.defaultScale.toString()), this.defaultScale);
        if (scale > 0) {
            scaleMin += ".";
            for (var i = 0; i < scale; i++) {
                scaleMin += "9";
            }
        }

        var precisionMax = parseFloat((precisionMax - 1).toString() + scaleMin);

        var max = Math.min(precisionMax, parseInt(this.max || this.defaultMaxValue.toString()), this.defaultMaxValue);

        var min = Math.max(0 - precisionMax, parseInt(this.min || this.defaultMinValue.toString()), this.defaultMinValue);
        return { max: max, min: min };
    }

 
}
NumberPropertyView.register();



class NumberPropertyViewBrowse extends StringPropertyViewBrowse {



}

class NumberPropertyViewEdit extends StringPropertyViewEdit {

    onRender() {             
        var wrapper = this.getWrapper() as NumberPropertyView;
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.getValue());
        wrapper.input = input;

        var span = document.createElement("span");
        $(span).hide();    
        $(span).click(function(e){ 
            (e as Event).stopPropagation();
        });   
        span.appendChild(input);

        var range = wrapper.getValueRange();
        var scale = Math.min(parseInt(wrapper.scale || wrapper.defaultScale.toString()), wrapper.defaultScale);        

        $(input).numberbox({
            min: range.min,
            max: range.max,
            width: wrapper.width || 170,
            height: wrapper.height || 26,
            precision: scale,
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });

        return span;
    }
}