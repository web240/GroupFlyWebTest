/// <reference path="StringPropertyView.ts" />
/** 文本属性组件 */
class TextPropertyView extends StringPropertyView {
    constructor() {
        super();
    }
    static elementName = "Gf-TextPropertyView".toLowerCase();

    protected createComponentBrowseState() {
        return new TextPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new TextPropertyViewEdit(this);
    }

    protected onSetValue(value) {
        
        $(this.input).textbox('setValue', this.replaceEditWrapMark(value));
    }

    /**
     * 替换展示区域换行符
     * @param text 待替换的文本
     */
    public replaceDisplayWrapMark(text) {
        var value = this.safeToString(text).replace(new RegExp('\r\n', 'gm'), '<br>');
        value = value.replace(new RegExp('\n', 'gm'), '<br>');
        return value;
    }

    /**
     * 替换编辑区域换行符
     * @param text 待替换的文本
     */
    public replaceEditWrapMark(text) {
        return this.safeToString(text).replace(new RegExp('<br>', 'gm'), '\r\n');
    }


}
TextPropertyView.register();


class TextPropertyViewBrowse extends StringPropertyViewBrowse {

    onRender() {

        var wrapper = this.getWrapper() as TextPropertyView;
        var display = super.onRender();

        var value = wrapper.replaceDisplayWrapMark(wrapper.getValue());

        $(display).html(value);

        return display;

    }

}

class TextPropertyViewEdit extends StringPropertyViewEdit {

    onRender() {
        
        var wrapper = this.getWrapper() as TextPropertyView;

        var span = super.onRender();

        $(wrapper.input).textbox({
            multiline: true,
            width: wrapper.width || 550,
            height: wrapper.height || 100
        });

        return span;
    }
}