/// <reference path="BasePropertyView.ts" />

/** 列表属性组件 */
class ListPropertyView extends BasePropertyView {
    
    constructor() {
        super();
        this.emptyValue = null;
    }
    
    static elementName = "Gf-ListPropertyView".toLowerCase();

    protected createComponentBrowseState() {
        return new ListPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new ListPropertyViewEdit(this);
    }

    /** select标签 */
    private _selectElement: HTMLSelectElement;

    /** 隐藏input标签 */
    private _valueInput: HTMLInputElement;

    /** select标签 */
    get selectElement() {
        return this._selectElement;
    }
    set selectElement(val) {

        this._selectElement= val;
    }

    /** 隐藏input标签 */
    get valueInput() {
        return this._valueInput;
    }
    set valueInput(val) {

        this._valueInput = val;
    }

    /** 背景颜色 */
    get items(){
        return this.get("items");
    }

    /** 背景颜色 */
    get color(){
        return this.getAttribute("color");
    }
    set color(val){
        this.setAttribute("color",val);
    }

    /** 数据源 */
    get source(){
        return this.getAttribute("source");
    }
    set source(val){
        this.setAttribute("source",val);
    }

    /** 默认选项 */
    get defaultoption(){
        return this.getAttribute("defaultoption");
    }
    set defaultoption(val){
        this.setAttribute("defaultoption",val);
    }

    /** 值属性名称 */
    get valuefield(){
        return this.getAttribute("valuefield") || PropertyNames.id;
    }
    set valuefield(val){
        this.setAttribute("valuefield",val);
    }

    /** 标签属性名称 */
    get textfield(){
        return this.getAttribute("textfield") || PropertyNames.combinedLabel;
    }
    set textfield(val){
        this.setAttribute("textfield",val);
    }

    /** 数据 */
    get data(){
        return this.getAttribute("data");
    }
    set data(val){
        this.setAttribute("data",val);
    }
    
    public resize(width) {
        $(this._selectElement).combobox('resize', width);
    }
    
    public disable(){
        $(this._selectElement).combobox('disable');
    }

    public enable(){
        $(this._selectElement).combobox('enable');
    }

    public getText(){
        var obj = this.get("obj"); 
        return obj ? obj[this.textfield] : "";
    }

    
    public loadDatastring(data){
        if(data){
            var objs = [];
            var array = data.split(',');
            var element = this;
            $(array).each(function(){
                if(this.length > 0){
                    var obj = {};
                    var arr = this.split('_');
                    obj[element.valuefield] = arr[0];
                    obj[element.textfield] = arr[1];
                    obj["color"] = arr[2];
                    obj["permissioncode"] = arr[3];
                    obj["description"] = arr[4];
                    objs.push(obj);
                }
            });
            this.loadData(objs);
        }
    }

    public loadData(data){
        if(this.isString(data)){
            data = this.stringToObject(data);
        }
        for(var item of data){
            if(item.id === this.getValue()){
                this.set("obj",item);
            }
        }
        if(this.defaultoption){
            var obj = {};
            obj[this.valuefield] = "";
            obj[this.textfield] = this.defaultoption;
            obj["permissioncode"] = "11111";
            data.unshift(obj);
        }
        this.set("items",data);
    }

    public getObject(){
        return this.get("obj");
    }

    public setObject(obj){
        if(!obj || !obj[this.valuefield]){
            obj = {};
            obj['klass'] = '';
            obj[this.textfield] = '';
            obj[this.valuefield] = '';
            obj.permissioncode = '11111';
        }
        if(!obj.permissioncode){
            obj[this.textfield] = '无发现权';
        }
        else if(obj.permissioncode === "-1"){
            obj[this.textfield] = '该对象不存在';
        }
        else if(obj.permissioncode[0] === "0"){
            obj[this.textfield] = '无发现权';
        }
        this.set("obj", obj);
        $(this._valueInput).val(JSON.stringify(obj));
        $(this._selectElement).combobox('setValue', obj[this.valuefield]); 
    }

    protected onSetValue(value) {
        if (value) {
            if (window["isString"](value)) {
                var obj = this.stringToObject(value);
                this.setObject(obj);
            } else {
                this.setObject(value);
            }
        }
        else {
            this.setObject(null);
        }
    }

    protected setReadOnly(readonly: boolean) {
        
    }

    protected parseToObject(value) {
        var obj = {};
        obj[this.textfield] = '';
        obj[this.valuefield] = '';

        if (value) {
            if (window["isString"](value)) {
                obj = this.stringToObject(value);
            }
            else {
                obj = value
            }
        }
        return obj;
    }

    /**
     * 创建后事件
     */
    protected created() {

        super.created();

        var element = this;
        element.addHook(EventNames.BeforeInit, function (event) {
            if (element.data) {
                element.loadDatastring(element.data);
            } else {
                if (element.source) {
                    element.ajax({
                        sync:true,
                        url: ComponentRoot.APIs.getListValues,
                        data: { listid:element.source },
                        success: function (result) {
                            element.loadDatastring(result.Data);
                        }
                    });
                }
            }
        });
    }
}
ListPropertyView.register();


class ListPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var wrapper = this.getWrapper() as ListPropertyView;
        var display = super.onRender();

        var value = wrapper.getText();
      
        $(display).html(value);

        return display;
    }


}

class ListPropertyViewEdit extends BasePropertyViewEdit {

    isRendered:boolean = false;
    onRender() {
        var stateObj = this;
        var element = this.getWrapper() as ListPropertyView;

        var span = super.onRender();
        $(span).hide();        

        var select = document.createElement("select");
        span.appendChild(select);
        element.selectElement = select;  

        var valueInput = document.createElement("input");
        $(valueInput).attr("type", "hidden");
        $(valueInput).attr("name", $(element).attr("name"));
        span.appendChild(valueInput);
        element.valueInput = valueInput;        

        $(select).combobox({
            valueField: element.valuefield,
            textField: element.textfield,
            width: element.width || 170,
            height: element.height || 26,
            editable: false,
            onChange: function (newValue, oldValue) {
            },
            formatter: function (row) {
                var opts = $(this).combobox('options');
                return `<span style="width:100%; height: 100%;display:block;" title="` + row[`description`] + `">` + row[opts.textField] + '</span>';
            },
            onSelect: function (record) {
                if(!stateObj.isRendered){
                    return;
                }
                var obj = element.getObject();
                if (!obj || record[element.valuefield] != obj[element.valuefield]) {
                    element.setObject(record);
                    element.fireValueChange(obj[element.valuefield], record[element.valuefield]);
                }
            }
        });
        $(element.selectElement).combobox('loadData',element.items);
        element.setObject(element.getObject());
        stateObj.isRendered = true;
        return span;

    }
}