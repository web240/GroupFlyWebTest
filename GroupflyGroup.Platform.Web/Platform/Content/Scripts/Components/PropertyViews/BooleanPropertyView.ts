/// <reference path="BasePropertyView.ts" />

/** 布尔属性组件 */
class BooleanPropertyView extends BasePropertyView {

    constructor() {
        super();
    }
    static elementName = "Gf-BooleanPropertyView".toLowerCase();

    protected createComponentBrowseState() {
        return new BooleanPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new BooleanPropertyViewEdit(this);
    }
    private _input : HTMLInputElement;
    private _hideInput:HTMLInputElement;
    
    get input(){
        return this._input;
    }
    set input(val){
        this._input = val;
    }

    get hideInput(){
        return this._hideInput;
    }
    set hideInput(val){
        this._hideInput = val;
    }
    
    
    /** 是否选中 */
    get checked() {
        return $(this._input).attr('checked') == 'checked';
    }
    set checked(val) {
        this.setValue(val);
    }

    public disable() {
        $(this._input).attr('disabled', 'disabled');
    }
    public enable() {
        $(this._input).removeAttr('disabled');
    }


    /**
     * 输入校验
    */
    public validate()
    {
        return true;
    }
    
    /**
     * 值数据类型转换
     * @param value 值
     */
    protected valueConvert(value:string){
        if(!value){
            return false;
        }
        return value.toString().toLowerCase() == "true";
    }


    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    protected onSetValue(value) {
        $(this._input).prop('checked', (value && value.toString().toLowerCase() == 'true'));
        $(this.hideInput).val(value);
    }

    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    protected setReadOnly(readonly: boolean) {
        $(this._input).textbox('readonly', readonly);
    }
}
BooleanPropertyView.register();

class BooleanPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper() as BooleanPropertyView;
        var value = wrapper.getValue();
        if (value && value.toString().toLowerCase() == "true") {
            span.innerHTML = "√";
        }
        return span;
    }
}

class BooleanPropertyViewEdit extends BasePropertyViewEdit {

    onRender() {

        var wrapper = this.getWrapper() as BooleanPropertyView;
        var input = document.createElement("input");
        var hiddenValue = document.createElement("input");
        $(input).attr("name", $(wrapper).attr("name"));
        $(input).attr("type", "checkbox");
        var value = wrapper.getValue();
        if (value && value.toString().toLowerCase() == "true") {
            $(input).attr("checked", "checked");
        }
        $(input).val(value);
        $(input).change(function () {
            var oldValue = wrapper.getValue();
            var newValue;

            if ($(input).prop('checked')) {
                newValue = true;
                $(hiddenValue).val("true");
            }
            else {
                newValue = false;
                $(hiddenValue).val("false");
            }
            wrapper.fireValueChange(oldValue, newValue);
        });
        $(hiddenValue).attr("name", $(wrapper).attr("name"));
        $(hiddenValue).attr("type", "hidden");
        $(hiddenValue).val(value);

        /* wrapper.appendChild(hiddenValue);
        wrapper.appendChild(input); */
        var height = parseInt(wrapper.height || "24");
        height = height > 13 ? height : 13;
        var diff = Math.floor(height / 2 - 7);
        $(wrapper).css("vertical-align", "-" + diff + "px");
        $(wrapper).css("padding-left", "5px");
        wrapper.input = input;
        wrapper.hideInput = hiddenValue;

        var span = super.onRender();
        span.appendChild(input);
        span.appendChild(hiddenValue);


        return span;
    }
}