/// <reference path="UIComponentBase.ts" />

/** 查询条件 */
class QueryCondition extends UIComponentBase {

    constructor() {
        super();
    }

    static elementName = "Gf-QueryCondition".toLowerCase();
    
    /** 是否忽视大小写 */
    get ignorecase(){
        return this.safeToString(this.getAttribute("ignorecase")).toLowerCase() == "true";
    }
    set ignorecase(val){
        this.setAttribute("ignorecase",val.toString());
    }

    /** list组件值属性名称 */
    get listvaluefield(){
        return this.getAttribute("listvaluefield");
    }
    set listvaluefield(val){
        this.setAttribute("listvaluefield",val);
    }

    /** list组件标签属性名称 */
    get listtextfield(){
        return this.getAttribute("listtextfield");
    }
    set listtextfield(val){
        this.setAttribute("listtextfield",val);
    }
    
    /** list组件数据源 */
    get listsource(){
        return this.getAttribute("listsource");
    }
    set listsource(val){
        this.setAttribute("listsource",val);
    }
    
    /** list组件默认选项 */
    get listdefaultoption(){
        return this.getAttribute("listdefaultoption");
    }
    set listdefaultoption(val){
        this.setAttribute("listdefaultoption",val);
    }
    
    /** 属性数据类型 */
    get datatype(){
        return this.getAttribute("datatype");
    }
    set datatype(val){
        this.setAttribute("datatype",val);
    }
    
    /** 属性名称 */
    get field(){
        return this.getAttribute("field");
    }
    set field(val){
        this.setAttribute("field",val);
    }

    public isModified(){
        return false;
    }

    /**
     * 值改变回调
     * @param eventHandler 回调函数
     */
    public onValueChange(eventHandler:(oldValue:any, newValue:any)=>void){
        this.addHook(EventNames.ValueChange,eventHandler);
    }

    public clear(isTriggerQuery?:boolean) {
        this.set("clearstatic",true);
        this.get("editor").setValue("");
        this.get("querySelect").setValue("");
        if(this.get("hasDoubleEditor")){
            this.get("editorFrom").setValue("");
            this.get("editorTo").setValue("");
            $(this.get("editor")).show();
            $(this.get("doubleEditor")).hide();
        }
        this.set("clearstatic",false);
        if(isTriggerQuery){
            this.fireHook(EventNames.ValueChange);
        }
    }
    
    public getValue(){
        var element = this;
        var type = this.get("querySelect").getValue();
        if(type){
            var value = ((type != "[..]" && type != "(..)") ? this.get("editor").getValue() : this.GetDoubleEditorValue(this));
            return {  field: this.field,
            type: type,
            value: value,
            caseSensitive: !element.ignorecase
            };
        }else{
            return null;
        }
    }

    public setValue(obj){
        if(obj && obj.type){
            this.get("querySelect").setValue(obj.type);
            if(obj.type == "[..]" || obj.type == "(..)"){
                var values = obj.value.split(',');
                this.get("editorFrom").setValue(values[0]);
                this.get("editorTo").setValue(values[1]);
            }
            else{
                this.get("editor").setValue(obj.value);
            }
        }else{
            this.clear();
        } 
    }
    
    public resize(width){
        width = width - 28;
        if(width < 0){
            width = 0;
        }
        this.get("editor").resize(width);
        if(this.get("hasDoubleEditor")){
            width = width / 2;
            this.get("editorFrom").resize(width);
            this.get("editorTo").resize(width);
        }
    }


    public onRender() {
        if(this.renderedHTMLElement){
            return this.renderedHTMLElement;
        }
        var span = document.createElement("span");
        var element = this;
        element.id = this.getUniqueId("QueryCondition");
        var querySelect = new ButtonComboBox();
        
        var editor:BasePropertyView;
        var emptyValue; emptyValue = "";
        var elementName;
        var hasDoubleEditor = false;

        var commonTypes = [{ value: '=', label: '等于' },
        { value: '!=', label: '不等于' },
        { value: 'N', label: '等于空' },
        { value: '!N', label: '不等于空' },
        { value: '', label: '清除本条件' }];

        var stringTypes = [{ value: '*', label: '包含' },
        { value: '!*', label: '不包含' },
        { value: '=*', label: '开始于' },
        { value: '*=', label: '结束于' }];

        var timeTypes = [{ value: '>', label: '晚于' },
        { value: '>=', label: '晚于等于' },
        { value: '<', label: '早于' },
        { value: '<=', label: '早于等于' },
        { value: '[..]', label: '介于（含两端）' },
        { value: '(..)', label: '介于（不含两端）' }];

        var numberTypes = [{ value: '>', label: '大于' },
        { value: '>=', label: '大于等于' },
        { value: '<', label: '小于' },
        { value: '<=', label: '小于等于' },
        { value: '[..]', label: '介于（含两端）' },
        { value: '(..)', label: '介于（不含两端）' }];

        var selectTypes = commonTypes;

        switch (element.datatype) {
            case DataType.LIST:
                elementName = "Gf-ListPropertyView";
                break;
            case DataType.STRING:
            case DataType.TEXT:
            case DataType.OBJEKT:
            case DataType.SEQUENCE:
            case DataType.MD5:
                elementName = "Gf-StringPropertyView";
                selectTypes = stringTypes.concat(commonTypes);
                break;

            case DataType.BOOLEAN:
                elementName = "Gf-BooleanPropertyView";
                emptyValue = false;
                break;

            case DataType.DATETIME:
            case DataType.TIME:
            case DataType.DATE:
                if (element.datatype == DataType.DATETIME) elementName = "Gf-DateTimePropertyView";
                else if (element.datatype == DataType.TIME) elementName = "Gf-TimePropertyView";
                else if (element.datatype == DataType.DATE) elementName = "Gf-DatePropertyView";
                selectTypes = timeTypes.concat(commonTypes);
                hasDoubleEditor = true;
                break;

            case DataType.FLOAT:
            case DataType.DOUBLE:
            case DataType.DECIMAL:
            case DataType.INTEGER:
            case DataType.BIGINT:
                if (element.datatype == DataType.INTEGER) elementName = "Gf-IntPropertyView";
                else if (element.datatype == DataType.BIGINT) elementName = "Gf-BigIntPropertyView";
                else elementName = "Gf-NumberPropertyView";
                selectTypes = numberTypes.concat(commonTypes);
                hasDoubleEditor = true;
                break;
            default:
                elementName = "Gf-StringPropertyView";
                break;
        }

        var id = this.getUniqueId("queryeditor");
        editor = document.createElement(elementName) as BasePropertyView;
        editor.autoBuildComponentTree = false;
        editor.id = id;
        editor.width = "150";
        if (element.datatype == DataType.LIST) {
            editor["defaultoption"] = element.listdefaultoption;
            editor["source"] = element.listsource;
        }
        querySelect.id = this.getUniqueId("querySelect");
        editor.init();
        editor.state = UIState.edit;
        editor.onValueChange(function (event) {
            if (element.get("clearstatic")) {
                return;
            }
            var type = querySelect.getValue();
            var value = editor.getValue();
            if (!type && value) {
                if (editor.tagName.toLowerCase() == 'gf-stringpropertyview') { type = '*'; } else { type = '='; }
                querySelect.setValue(type);
            }
            if (type && type != '!N' && type != 'N') {
                element.fireHook(EventNames.ValueChange);
            }
        });

        span.appendChild(editor);
        element.set("editor", editor);

        querySelect.init();
        querySelect.loadData(selectTypes);
        querySelect.onValueChange(function () {
            var type = querySelect.getValue();
            var value = editor.getValue();
            var doubleEditor = element.get("doubleEditor");
            var editorFrom = element.get("editorFrom");
            var editorTo = element.get("editorTo");
            var fromValue = editorFrom ? editorFrom.getValue() : null;
            var toValue = editorTo ? editorTo.getValue() : null;

            if (!type) {
                if (value) editor.setValue(emptyValue);
                if (fromValue) editorFrom.setValue(emptyValue);
                if (toValue) editorTo.setValue(emptyValue);

                if (doubleEditor) {
                    $(editor).show();
                    $(doubleEditor).hide();
                }
                if (!element.get("clearstatic")) {
                    element.fireHook(EventNames.ValueChange);
                }
            }
            else if (type == "N" || type == "!N") {
                element.fireHook(EventNames.ValueChange);
            }
            else if (type == "[..]" || type == "(..)") {
                $(editor).hide();
                $(doubleEditor).show();
                if (fromValue && toValue) {
                    element.fireHook(EventNames.ValueChange);
                }
            }
            else {
                if (doubleEditor) {
                    $(editor).show();
                    $(doubleEditor).hide();
                }
                if (editor.tagName == "Gf-BooleanPropertyView" || value) {
                    element.fireHook(EventNames.ValueChange);
                }
            }
        });


        element.set("querySelect", querySelect);
        span.appendChild(querySelect);

        if (hasDoubleEditor)
            this.buildDoubleEditor(elementName);

        element.set("hasDoubleEditor", hasDoubleEditor);

        return span;
    }

    protected buildDoubleEditor(elementName) {
        var element = this;
        var editorFrom:any;
        editorFrom = document.createElement(elementName);
        editorFrom.autoBuildComponentTree = false;
        editorFrom.width = "75";
        editorFrom.init();

        var editorTo:any;
        editorTo = document.createElement(elementName);
        editorTo.autoBuildComponentTree = false;
        editorTo.width = "75";
        editorTo.init();

        var onafterchange = function () {
            if (editorFrom.getValue() && editorTo.getValue()) {
                element.fireHook(EventNames.ValueChange);
            }
        }

        editorFrom.addHook(EventNames.ValueChange, onafterchange);
        editorTo.addHook(EventNames.ValueChange, onafterchange);

        var span = document.createElement("span");
        span.appendChild(editorFrom);
        span.appendChild(editorTo);
        $(span).hide();
        element.appendChild(span);

        element.set("doubleEditor", span);
        element.set("editorFrom", editorFrom);
        element.set("editorTo", editorTo);
    }

    protected GetDoubleEditorValue(element) {
        if (element.get("hasDoubleEditor")) {
            return element.get("editorFrom").getValue() + ',' + element.get("editorTo").getValue()
        }
        else {
            return "";
        }
    }
}
QueryCondition.register();