/// <reference path="BasePropertyView.ts" />
/** 字符串属性组件 */
class StringPropertyView extends BasePropertyView {

    constructor() {

        super();

    }

    /** 组件标签名称 */
    static elementName = "gf-stringpropertyview";
 
    protected createComponentBrowseState(){
        return new StringPropertyViewBrowse(this);
    }

    protected createComponentEditState(){
        return new StringPropertyViewEdit(this);
    }

     /** input标签 */
    private _inputElement: HTMLInputElement;


    get input() {
        return this._inputElement;
    }
    set input(val) {

        this._inputElement = val;
    }

    /**
     * 禁用组件
     */
    public disable() {
        $(this._inputElement).textbox('disable');
    }

    /**
     * 启用组件
     */
    public enable(){
        $(this._inputElement).textbox('enable');
    }
    
    /**
     * 重设宽度
     * @param width 宽度(单位：px)
     */
    public resize(width){
        $(this._inputElement).textbox('resize',width); 
    }

    /**
     * 获取焦点
     */
    public focus() { 
        $(this._inputElement).textbox('textbox').focus(); 
    }
    
    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    protected onSetValue(value) {
        $(this._inputElement).textbox('setValue', value);
    }
    
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    protected setReadOnly(readonly:boolean){
        $(this._inputElement).textbox('readonly',readonly);
    }
}
StringPropertyView.register();


class StringPropertyViewBrowse extends BasePropertyViewBrowse{
     
    onRender() {
        
        var wrapper = this.getWrapper() as StringPropertyView;
        var display = super.onRender();

        var value = wrapper.getValue();
        
        if(wrapper.propertyName && wrapper.propertyName.toLowerCase() == 'filecontent'){
            value = window["htmlEncode"](value);
        }
        $(display).html(value);

        return display;
    }

}

class StringPropertyViewEdit extends BasePropertyViewEdit{

    onRender(){
        var wrapper = this.getWrapper() as StringPropertyView;
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.getValue());
        wrapper.input = input;
        var span = super.onRender();
        span.appendChild(input);

        $(input).textbox({
            width: wrapper.width || 170,
            height: wrapper.height || 24,
            disabled: wrapper.disabled,
            editable: !wrapper.diseditable,
            onChange: function (newValue, oldValue) {
                
                wrapper.fireValueChange(oldValue,newValue);
            }
        });

        return span;
    }
}