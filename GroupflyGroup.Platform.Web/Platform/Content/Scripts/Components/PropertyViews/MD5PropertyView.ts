/// <reference path="BasePropertyView.ts" />
/** MD5属性组件 */
class MD5PropertyView extends BasePropertyView {

    constructor() {
        super();

    }
    static elementName = "Gf-MD5PropertyView".toLowerCase();


    /** 密码框 */
    private _passwordbox: HTMLInputElement;
    
    /** 输入框 */
    private _input: HTMLInputElement;

    /** 密码框 */
    get passwordbox() {
        return this._passwordbox;
    }
    set passwordbox(val) {
        this._passwordbox = val;
    }
    
    /** 输入框 */
    get input() {
        return this._input;
    }
    set input(val) {
        this._input = val;
    }

    protected createComponentBrowseState() {
        return new MD5PropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new MD5PropertyViewEdit(this);
    }

    protected onSetValue(value) {
        $(this.input).val(value);
        $(this.passwordbox).passwordbox('setValue', value);
    }

    public disable() {
        $(this.passwordbox).passwordbox('disable');
    }

    public enable() {
        $(this.passwordbox).passwordbox('enable');
    }

    public resize(width) {
        $(this.passwordbox).passwordbox('resize', width);
    }

    //public setDisplay() {
    //    $(this._browseContent).html('******');
    //}

    public focus() {
        $(this).find(".textbox-text").focus();
    }

    /* public buildinput() {
        var element = this;
        element.set("passwordbox", passwordbox);

        return passwordbox;
    } */

    //protected initContent() {
    //    var element = this;
    //    var passwordbox = this.buildinput();
    //    passwordbox.id = this.getUniqueId("passwordbox");
    //    element.set("passwordbox", passwordbox);
    //    $(passwordbox).passwordbox({
    //        showEye: false,
    //        passwordChar: '•',
    //        width: element.width || 170,
    //        height: element.height || 26,
    //        disabled: element.disabled,
    //        editable: !element.diseditable,
    //        onChange: function (newValue, oldValue) {
    //        }
    //    });
    //    var realInput = $(element).find(".textbox-prompt");
    //    realInput.focus(function () {
    //        $(passwordbox).passwordbox('setValue', '');
    //    });
    //    realInput.blur(function () {
    //        var newValue = $(passwordbox).passwordbox('getValue');
    //        var oldValue = element.getValue();
    //        if (newValue != '') {
    //            element.setValue(newValue);
    //            element.fireHook(EventNames.ValueChange, [oldValue, newValue]);
    //        }
    //        else {
    //            $(passwordbox).passwordbox('setValue', oldValue);
    //        }
    //    });
    //}

    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    protected setReadOnly(readonly: boolean) {
        $(this.input).textbox('readonly', readonly);
    }

}
MD5PropertyView.register();



class MD5PropertyViewBrowse extends BasePropertyViewBrowse {

    onRender() {
        var span = super.onRender();
        span.innerHTML = "******";
        return span;
    }

}

class MD5PropertyViewEdit extends BasePropertyViewEdit {

    onRender() {

        var span = super.onRender();
        var wrapper = this.getWrapper() as MD5PropertyView;

        var input = document.createElement("input");
        $(input).attr("name", $(wrapper).attr("name"));
        $(input).val(wrapper.getValue());
        $(input).hide();
        wrapper.input = input;
        span.appendChild(input);

        var passwordbox = document.createElement("input");
        passwordbox.id = Utils.getUniqueId("passwordbox");

        wrapper.passwordbox = passwordbox;

        span.appendChild(passwordbox);
        return span;
    }

    afterRender() {

        var wrapper = this.getWrapper() as MD5PropertyView;
        $(wrapper.passwordbox).passwordbox({
            showEye: false,
            passwordChar: '*',
            width: wrapper.width || 170,
            height: wrapper.height || 26,
            disabled: wrapper.disabled,
            editable: !wrapper.diseditable,
            onChange: function (newValue, oldValue) {

            }
        });
        var realInput = $(wrapper).find(".textbox-prompt");
        realInput.focus(function () {
            $(wrapper.passwordbox).passwordbox('setValue', '');
        });
        realInput.blur(function () {
            var newValue = $(wrapper.passwordbox).passwordbox('getValue');
            var oldValue = wrapper.getValue();
            if (newValue != '') {
                wrapper.setValue(newValue);
                wrapper.fireValueChange(oldValue, newValue);
            }
            else {
                $(wrapper.passwordbox).passwordbox('setValue', oldValue);
            }
        });
    }
}