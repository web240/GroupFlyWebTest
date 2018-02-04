/// <reference path="BasePropertyView.ts" />
/** 源码文本属性组件 */
class SourceCodePropertyView extends BasePropertyView {

    constructor() {
        super();
    }

    /** 组件标签名称 */
    static elementName = "gf-sourcecodepropertyview";

    /** 源码文本属性组件 */
    private _aceeditor: any;

    /** 源码文本属性组件 */
    get aceeditor() {
        return this._aceeditor;
    }
    set aceeditor(val) {
        this._aceeditor = val;
    }

    onRecievedMessage(message: UIMessage, source: UIComponentBase) {
        if (message instanceof UIMessageStateSwitched) {
            var StateSwitched = message as UIMessageStateSwitched;
            if (StateSwitched.currentState = UIState.edit) {
                this.setReadOnly(false);
            } else
            {
                this.setReadOnly(true);
            }
        }
    }

    public onRender()  {

        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var control = this;
        if (window["require"] === undefined) {
            control.includeJS("Platform/Content/Scripts/aceeditor/ace.js");
            control.includeJS("Platform/Content/Scripts/aceeditor/ext-old_ie.js");
        }
        var element = this;
        var div = document.createElement("div");
        $(div).css("height", 604);
        $(div).addClass("GfSourceCodePropertyView")
        //element.appendChild(div);

        var pre = document.createElement("pre");
        pre.id = this.getUniqueId("AceEditor");
        $(pre).attr("name", $(element).attr("name"));
       
        pre.innerHTML = window["htmlEncode"](element.value);
        div.appendChild(pre);
        element.set("pre", pre);

        return div;
    }

    public afterRender() {
        var element = this;
        var div = element.get("div");
        var pre = element.get("pre");
        if (!element.get("aceeditor")) {
            window["require"]("ace/ext/old_ie");
            var editor = window["ace"].edit(pre.id);
            editor.setTheme("ace/theme/textmate");
            editor.session.setMode("ace/mode/javascript");
            editor.resize();
            this._aceeditor = editor;
            editor.getSession().on('change', function (e) {
                var newValue = element.aceeditor.getValue();
                var oldValue = element.getValue();
                element.fireHook(EventNames.ValueChange, [oldValue, newValue]);
            });

            $(div).resizable({
                onStartResize: function (e) {
                },
                onResize: function (e) {
                },
                onStopResize: function (e) {
                    $(element.get("pre")).css("height", $(div).height() - 4);
                    element.get("aceeditor").resize();
                }
            });
        }
    }
    /**
     * 取值
     */
    public getValue() {
        if (this._aceeditor)
            return this._aceeditor.getValue();
        else
            return "";
    }

    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    protected onSetValue(value) {
        
    }
    
    /**
     * 初始化内容 
     */
    protected initContent() {
        
    }
    
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    public setReadOnly(readonly: boolean) {
        this._aceeditor.setReadOnly(true);
    }

    /**
     * 禁用组件
     */
    public disable() {
        this._aceeditor.attr("disabled", true);
    }

    /**
     * 启用组件
     */
    public enable() {
        this._aceeditor.attr("disabled", false);
    }
}
SourceCodePropertyView.register();


