/// <reference path="StringPropertyView.ts" />
declare var CKEDITOR: any;

/** 【富文本属性组件】 */
class RichContentPropertyView extends StringPropertyView {

    constructor() {
        super();
    }

    static elementName = 'gf-richcontentpropertyview';

    /**  */
    private _richinput: any;

    /**  */
    get richinput() {
        return this._richinput;
    }
    set richinput(val) {
        this._richinput = val;
    }

    protected createComponentBrowseState() {
        return new RichContentPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new RichContentPropertyViewEdit(this);
    }

    /** 最大长度 */
    get maxlength() {
        return parseInt(this.getAttribute("maxlength"));
    }
    set maxlength(val) {
        this.setAttribute("maxlength", val.toString());
    }

    /** 应用程序路径 */
    get applicationPath() {
        return this.getAttribute("applicationPath");
    }
    set applicationPath(val) {
        this.setAttribute("applicationPath", val);
    }

    /** 工具栏 */
    get toolbar() {
        return this.getAttribute("toolbar");
    }
    set toolbar(val) {
        this.setAttribute("toolbar", val);
    }

    /** filebrowserUploadUrl */
    get filebrowserUploadUrl() {
        return this.getAttribute("filebrowserUploadUrl");
    }
    set filebrowserUploadUrl(val) {
        this.setAttribute("filebrowserUploadUrl", val);
    }

    /** filebrowserBrowseUrl */
    get filebrowserBrowseUrl() {
        return this.getAttribute("filebrowserBrowseUrl");
    }
    set filebrowserBrowseUrl(val) {
        this.setAttribute("filebrowserBrowseUrl", val);
    }

    //public getValue() {
    //    var input = this.input;
    //    var value = '';
    //    if (CKEDITOR.instances[input.id]) {
    //        CKEDITOR.instances[input.id].updateElement();
    //        value = CKEDITOR.instances[input.id].getData();
    //    }
    //    else {
    //        value = $(input).val();
    //    }
    //    return this.removeAppPath(value);
    //}

    public setResize_enabled(resize_enabled) {
        CKEDITOR.instances[this.richinput.id].config.setresize_enabled = resize_enabled;
    }

    public setHeight(offsetHeight) {
        CKEDITOR.instances[this.richinput.id].resize(CKEDITOR.instances[this.richinput.id].container.getStyle('width')-5, offsetHeight - 31);
    }


    public setToolbar(toolbar) {
        CKEDITOR.instances[this.richinput.id].config.toolbar = toolbar;
    };

    //public setDisplay() {
    //    var value = this.getValue();
    //    //$(display).html(this.addAppPath(value));
    //    $(this._browseContent).html(this.addAppPath(value));
    //}

    public addAppPath(value) {
        var text = this.safeToString(value);
        while (text.indexOf('~/file?id=') >= 0) {
            text = text.replace('~/file?id=', document.body["apppath"] + 'file?id=');
        }
        return text;
    }

    protected removeAppPath(value) {
        return this.safeToString(value).replace(new RegExp(document.body["apppath"] + '/file?id=', 'gm'), '~/file?id=');
    }

    public insertHtml(value) {
        CKEDITOR.instances[this.richinput.id].insertHtml(value);
    }

    protected innerSetValue(value) {
        //var input = this.input;
        value = this.addAppPath(value);
        if (CKEDITOR.instances[this.richinput.id]) {
            CKEDITOR.instances[this.richinput.id].setData(value);
        }
        else {
            $(this.richinput).val(value);
        }
    }

    protected stateChanged() {
        var element = this;
        if (element.state == UIState.edit && !element.get("editor")) {
           
        }
        //super.stateChanged();
    }

    //public created() {
    //    var element = this;
    //    element.addHook(EventNames.BeforeInit, function () {
    //        if (typeof CKEDITOR === "undefined") {
    //            element.includeJS("/GroupflyGroup.Platform.Web/Platform/Content/Scripts/ckeditor/ckeditor.js");
    //            element.includeJS("/GroupflyGroup.Platform.Web/Platform/Content/Scripts/ckeditor/ck_utility.js");
    //        }
    //    });
    //    super.created();
    //}

    //protected initContent() {
    //    this.applicationPath = document.body["apppath"];
    //    var input = this.buildinput();
    //    input.id = this.getUniqueId("Editor");
    //}
}
RichContentPropertyView.register();


class RichContentPropertyViewBrowse extends BasePropertyViewBrowse {

    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper() as RichContentPropertyView;

        var value = wrapper.getValue();
        span.innerHTML = wrapper.addAppPath(value);
        return span;
    }

}

class RichContentPropertyViewEdit extends BasePropertyViewEdit {


    public setReadOnly(readonly: boolean) {
        var wrapper = this.getWrapper() as RichContentPropertyView;
        CKEDITOR.instances[wrapper.richinput.id].config.readOnly = readonly;
    }

    onRender() {
        var wrapper = this.getWrapper() as RichContentPropertyView;

        if (typeof CKEDITOR === "undefined") {
            wrapper.includeJS("/GroupflyGroup.Platform.Web/Platform/Content/Scripts/ckeditor/ckeditor.js");
            wrapper.includeJS("/GroupflyGroup.Platform.Web/Platform/Content/Scripts/ckeditor/ck_utility.js");
        }

        var input = document.createElement("input");
        $(input).attr("name", $(wrapper).attr("name"));
        //$(input).val(wrapper.value);
        input.id = wrapper.getUniqueId("Editor");
        wrapper.richinput = input;
        var span = super.onRender();
        span.appendChild(input);

        return span;
    }

    afterRender() {
        var wrapper = this.getWrapper() as RichContentPropertyView;
        var input = wrapper.richinput;
        var config = {
            toolbar: wrapper.toolbar || 'Full',
            filebrowserBrowseUrl: wrapper.filebrowserBrowseUrl || "",
            filebrowserUploadUrl: wrapper.filebrowserUploadUrl || wrapper.applicationPath + "/CkEditor/CkeditorUpload",
            width: wrapper.width || 200,
            height: wrapper.height || 150,
            toolbarLocation: wrapper.toolbar == 'None' ? 'none' : 'top',
            resize_enabled: wrapper.toolbar != 'None'
        };

        CKEDITOR.replace(input.id, config);

        var editor = CKEDITOR.instances[input.id];
        editor.setData(wrapper.getValue());

        editor.on('change', function (evt) {
            $(input).val(editor.getData());
            var newValue = editor.getData();
            var oldValue = wrapper.getValue();
            wrapper.fireValueChange(oldValue, newValue);
        });
        if (wrapper.maxlength) {
            var maxlength = wrapper.maxlength;
            editor.on('key', function (event) {

                var keycode = event.data.keyCode;
                if (keycode == 8 || keycode == 13 || keycode == 32)
                    return;
                var oldhtml = editor.document.getBody().getHtml();
                var description = oldhtml.replace(/<.*?>/ig, "");

                if (description.length >= maxlength) {
                    editor.setData(oldhtml);
                }
            });
        }
    }
}