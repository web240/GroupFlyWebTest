/// <reference path="BasePropertyView.ts" />

/** 颜色字符串属性组件 */
class ColorStringPropertyView extends BasePropertyView {

    constructor() {
        super();
    };

    static elementName = "Gf-ColorStringPropertyView".toLowerCase();

    protected createComponentBrowseState() {
        return new ColorStringPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new ColorStringPropertyViewEdit(this);
    }

    public disable() {
        $(this.get("input")).attr("disabled", "disabled");
    }

    public enable() {
        $(this.get("input")).removeAttr("enable");
    }

    /** input标签 */
    private _inputElement: HTMLInputElement;


    get input() {
        return this._inputElement;
    }
    set input(val) {

        this._inputElement = val;
    }

    /** span标签 */
    private _shower: HTMLSpanElement;


    get shower() {
        return this._shower;
    }
    set shower(val) {
        this._shower = val;
    }

    /** span标签 */
    private _displayShower: HTMLSpanElement;

    get displayShower() {
        return this._displayShower;
    }
    set displayShower(val) {
        this._displayShower = val;
    }

    public resize(width) {
        $(this.input).width(width - 25);
    }

    protected onSetValue(value) {
        $(this.input).val(value);
        $(this.shower).css("backgroundColor", "#" + value);
        $(this.displayShower).css("backgroundColor", "#" + value);
    }

    protected connected(){
        $(this).addClass("ColorStringPropertyView");
        super.connected();
    }

    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    protected setReadOnly(readonly: boolean) {
        $(this.input).textbox('readonly', readonly);
    }

}
ColorStringPropertyView.register();

class ColorStringPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper() as ColorStringPropertyView;
        var displayShower = document.createElement("span");
        $(displayShower).css("width", 20);
        $(displayShower).css("height", 20);
        $(displayShower).css("border", "1px solid darkgrey");
        $(displayShower).css("display", "block");
        $(displayShower).css("backgroundColor", "#" + wrapper.getValue());
        span.appendChild(displayShower);
        wrapper.displayShower = displayShower;
        return span;
    }
}

class ColorStringPropertyViewEdit extends BasePropertyViewEdit {

    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper() as ColorStringPropertyView;
        var input = document.createElement("input");
        $(input).attr("name", wrapper.name);
        $(input).val(wrapper.getValue());
        $(input).attr("readonly", "readonly");
        $(input).css("width", wrapper.width ? (parseInt(wrapper.width) - 22) : 150);
        $(input).css("height", 24);
        $(input).addClass("textbox textbox-text");

        //颜色显示
        var shower = document.createElement("span");
        $(shower).addClass("shower");
        $(shower).click(function () {
            $(input).click();
        });
        $(shower).css("backgroundColor", "#" + wrapper.getValue());
        wrapper.shower = shower;
        wrapper.input = input;
        span.appendChild(input);
        span.appendChild(shower);

        $(input).ColorPicker({
            color: wrapper.value,
            onChange: function (hsb, hex, rgb) {
                //$(shower).css('backgroundColor', '#' + hex);
            },
            onSubmit: function (hsb, hex, rgb, el) {
                $(el).ColorPickerHide();
                wrapper.setValue(hex);
            },
            onBeforeShow: function () {
                $(this).ColorPickerSetColor(this.value);
            }
        })
            .bind('keyup', function () {
                $(this).ColorPickerSetColor(this.value);
            });
        if (wrapper.value) {
            wrapper.setValue(wrapper.value);
        }
        return span;
    }
}