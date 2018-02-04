
/// <reference path="../UIComponentBase.ts" />

/** 属性组件基类 */
abstract class BasePropertyView extends UIComponentBase {
    
    /** 空值（用于对比当前实例是否设过值） */
    protected emptyValue: any;
    
    /** 原值 */
    private _originalValue:any;
    
    /** 当前值 */
    private _currentValue:any;

    /**
     * 需要侦听值改变事件的属性
     */
    static get observedAttributes(){ 
        return super.observedAttributes.concat(["readonly"]);
     }

    /** 名称 */
    get name(){
        return this.getAttribute("name");
    }
    set name(val){
        this.setAttribute("name",val);
    }

    /** 值 */
    get value(){
        return this.getAttribute("value");
    }
    set value(val){
        this.setAttribute("value",val);
    }

    /** 标签 */
    get label(){
        return this.getAttribute("label");
    }
    set label(val){
        this.setAttribute("label",val);
    }
    
    /** 描述 */
    get description(){
        return this.getAttribute("description");
    }
    set description(val){
        this.setAttribute("description",val);
    }

    /** 对象ID */
    get objektId(){
        return this.getAttribute("objektId");
    }
    set objektId(val){
        this.setAttribute("objektId",val);
    }

    /** 属性名称 */
    get propertyName(){
        return this.getAttribute("propertyName");
    }
    set propertyName(val){
        this.setAttribute("propertyName",val);
    }

    /** 筛选器ID */
    get filterId(){
        return this.getAttribute("filterId");
    }
    set filterId(val){
        this.setAttribute("filterId",val);
    }
    
    /** 是否禁止修改 */
    get diseditable(){
        return this.safeToString(this.getAttribute("diseditable")).toLowerCase() == "true";
    }
    set diseditable(val){
        this.setAttribute("diseditable",val.toString());
    }
    
    /** 是否必填 */
    get required(){
        return this.safeToString(this.getAttribute("required")).toLowerCase() == "true";
    }
    set required(val){
        this.setAttribute("required",val.toString());
    }

    /** 是否只读 */
    get readonly(){
        return this.safeToString(this.getAttribute("readonly")).toLowerCase() == "true";
    }
    set readonly(val){
        this.setAttribute("readonly",this.safeToString(val));
    }

    /** 是否仅创建可写 */
    get createonly(){
        return this.safeToString(this.getAttribute("createonly")).toLowerCase() == "true";
    }
    set createonly(val){
        this.setAttribute("createonly",this.safeToString(val));
    }

    /** 是否自动保存 */
    get autosave(){
        return this.safeToString(this.getAttribute("autosave")).toLowerCase() == "true";
    }
    set autosave(val){
        this.setAttribute("autosave",val.toString());
    }
    
    /** 是否禁用 */
    get disabled(){
        return this.safeToString(this.getAttribute("disabled")).toLowerCase() == "true";
    }
    set disabled(val){
        this.setAttribute("disabled",val.toString());
    }

    protected attributeChanged(name,oldValue,newValue){
        if(name == "readonly"){
            this.setReadOnly(this.readonly);
        }
        super.attributeChanged(name,oldValue,newValue);
    }

    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    protected abstract setReadOnly(readonly:boolean);

    /**
     * 重设组件大小
     * @param width 宽度（单位:px）
     * @param height 高度（单位:px，可选参数）
     */
    public resize(width:Number, height?:Number) {  }

    /**
     * 获取焦点
     */
    public focus() {  }

    /**
     * 输入校验
     */
    public validate() {
        if (this.required) {
            if (this.valueEquals(this.getValue(), this.emptyValue)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断值是否相等
     * @param oldValue 旧值
     * @param newValue 新值
     */
    protected valueEquals(oldValue, newValue) {
        return this.valueConvert(oldValue) === this.valueConvert(newValue);
    }

    /**
     * 设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    protected abstract onSetValue(value):void;
    
    /**
     * 值改变回调
     * @param eventHandler 回调函数
     */
    public onValueChange(eventHandler:(oldValue:any, newValue:any)=>void){
        this.addHook(EventNames.ValueChange,eventHandler);
    }

    /**
     * 触发值改变回调
     * @param oldValue 旧值
     * @param newValue 新值
     */
    public fireValueChange(oldValue:any, newValue:any){
        this.fireHook(EventNames.ValueChange,[oldValue, newValue])
    }


    /**
     * 设值
     * @param value 值
     */
    public setValue(value) {
        if(this.readonly || this.state == UIState.browse){
            return;
        }
        var oldValue = this._currentValue;
        this.onSetValue(value);
        this._currentValue = value;

        if (!this.valueEquals(oldValue, value)) {
            this.fireHook(EventNames.ValueChange, [oldValue,value]);
        }
        else if (this._originalValue === null) {
            this._originalValue = value;
        }
    }
    
    /**
     * 取值
     */
    public getValue(){
        return this._currentValue;
    }

    /**
     * 值数据类型转换
     * @param value 值
     */
    protected valueConvert(value:string):any{
        return value;
    }

    
    /**
     * 创建后事件
     */
    protected created() {
        this.emptyValue = '';
        var element = this;
        this.addHook(EventNames.BeforeInit, function () {
            if (typeof ($(element).attr("value")) != "undefined") {
                element._currentValue =  element.valueConvert(element.value);
                element._originalValue = element._currentValue;
            }
            else if(element.objektId && element.propertyName){ 
                var obj = element.getObjektData([element.objektId]).get(element.objektId);
                element._currentValue = obj[element.propertyName];
                element._originalValue = element._currentValue;
            }
        });

        this.addHook(EventNames.ValueChange, function (oldValue,newValue) {
            element._currentValue = newValue;

            if (element._originalValue === null) {
                element._originalValue = newValue;
            }
            else {
                element.setModified(!element.valueEquals(element._originalValue, newValue));
                if (element.autosave) {
                    element.sendMessage(new UIMessageSaving());
                }
            }
        });
        $(this).dblclick(function (event) {
            if (element.state == UIState.edit) {
                event.stopPropagation();
            }
        });
        super.created();
    }



}