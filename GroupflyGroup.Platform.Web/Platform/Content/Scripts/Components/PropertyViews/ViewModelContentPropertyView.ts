/// <reference path="BasePropertyView.ts" />
 
////【视图模型编辑组件】
class ViewModelContentPropertyView extends BasePropertyView {

    constructor() {
        super();
    }

    /** 组件标签名称 */
    static elementName = "Gf-ViewModelContentPropertyView".toLowerCase();


    protected createComponentBrowseState() {
        return new ViewModelContentPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new ViewModelContentPropertyViewEdit(this);
    }

    /** klass */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }

    /** layouttype */
    get layouttype() {
        return this.getAttribute("layouttype");
    }
    set layouttype(val) {
        this.setAttribute("layouttype", val);
    }

     /** 应用程序路径 */
    get applicationPath() {
        return this.getAttribute("applicationPath");
    }
    set applicationPath(val) {
        this.setAttribute("applicationPath", val);
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

    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    protected onSetValue(value) {

    }

    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    public setReadOnly(readonly: boolean) {
        
    }

 

}
ViewModelContentPropertyView.register();

class ViewModelContentPropertyViewBrowse extends BasePropertyViewBrowse {

    /**  */
    private _input: any;

    /**  */
    get input() {
        return this._input;
    }
    set input(val) {
        this._input = val;
    }

    onRender() {
        var wrapper = this.getWrapper() as ViewModelContentPropertyView;

        if (typeof CKEDITOR === "undefined") {
            wrapper.includeJS("/GroupflyGroup.Platform.Web/Platform/Content/Scripts/ckeditor/ckeditor.js");
            wrapper.includeJS("/GroupflyGroup.Platform.Web/Platform/Content/Scripts/ckeditor/ck_utility.js");
        }

        var input = document.createElement("input");
        $(input).attr("name", $(wrapper).attr("name"));
        input.id = wrapper.getUniqueId("Editor");
        this.input = input;
        var span = super.onRender();
        span.appendChild(input);

        return span;
    }

    afterRender() {
        var wrapper = this.getWrapper() as ViewModelContentPropertyView;
 
        var config = {
            toolbar: 'None',
            filebrowserBrowseUrl: wrapper.filebrowserBrowseUrl || "",
            filebrowserUploadUrl: wrapper.filebrowserUploadUrl || wrapper.applicationPath + "/CkEditor/CkeditorUpload",
            width:  "675px",
            height:  "300px",
            toolbarLocation:   'none',
            resize_enabled: true 
        };
        CKEDITOR.replace(this.input.id, config);
        var editor = CKEDITOR.instances[this.input.id];
        editor.setData(wrapper.getValue());
        editor.config.readOnly = true;
    }
}

class ViewModelContentPropertyViewEdit extends BasePropertyViewEdit {

    /** div */
    private _div: any;

    /** div */
    get div() {
        return this._div;
    }
    set div(val) {
        this._div = val;
    }

    /** layout */
    private _layout: any;

    /** layout */
    get layout() {
        return this._layout;
    }
    set layout(val) {
        this._layout = val;
    }

    /** divtabs */
    private _divtabs: any;

    /** divtabs */
    get divtabs() {
        return this._divtabs;
    }
    set divtabs(val) {
        this._divtabs = val;
    }

    /** floweditor */
    private _floweditor: any;

    /** floweditor */
    get floweditor() {
        return this._floweditor;
    }
    set floweditor(val) {
        this._floweditor = val;
    }

    /** customeditor */
    private _customeditor: any;

    /** customeditor */
    get customeditor() {
        return this._customeditor;
    }
    set customeditor(val) {
        this._customeditor = val;
    }

    /** selecteditor */
    private _selecteditor: any;

    /** selecteditor */
    get selecteditor() {
        return this._selecteditor;
    }
    set selecteditor(val) {
        this._selecteditor = val;
    }

    onRender() {
        var wrapper = this.getWrapper() as ViewModelContentPropertyView;
        var div = document.createElement("div");
        $(div).addClass("GfViewModel")
        $(div).css("width", "700px");
        $(div).css("height", "800px;");
        $(div).css("border", "1px solid #A1A1A1");
        this.div = div;

        var layout = document.createElement("div");
        $(layout).css("min-height", "500px");
        div.appendChild(layout);

        $(layout).layout({
            fit: true
        });

        $(layout).layout('add', {
            region: 'center',
            collapsible: true,
            split: true
        });
        $(layout).layout('add', {
            region: 'west',
            width: 0,
            collapsible: true,
            split: true
        });

        var center = $(layout).find('.layout-panel-center').find('.layout-body');
        this.layout = layout;
   
        var divtabs = document.createElement("div");

        $(divtabs).attr("name", "divtabs");
        $(divtabs).css("width", "99.7%");
        $(divtabs).css("height", "99.7%");
        this.divtabs = divtabs;

        var divtabspanl = document.createElement("div");

        center.append(divtabspanl);
        divtabspanl.appendChild(divtabs);
        

        return div;
    }

    afterRender() {
        var control = this;
        var wrapper = this.getWrapper() as ViewModelContentPropertyView;
        
        $(this.divtabs).tabs({
            width: '100%',
            height: 'auto',
            border: false,
            scrollDuration: 0,
            onSelect: function (title, index) {
                if (title == "流式布局") {
                    if (control.floweditor) {
                        control.selecteditor = control.floweditor;
                        wrapper.layouttype = "flowlayout";

                        var newValue = floweditor.getData();
                        var oldValue = wrapper.getValue();
                        newValue = newValue.replace("<div name='flowlayout' style='display:none'>&nbsp;</div>", "");
                        newValue = newValue.replace("<div name='customeditor' style='display:none'>&nbsp;</div>", "");
                        newValue = "<div name='flowlayout' style='display:none'>&nbsp;</div>" + newValue;

                        wrapper.fireValueChange(oldValue, newValue);
                    }
                } else if (title == "自定义布局") {
                    if (control.customeditor) {
                        control.selecteditor = control.customeditor;
                        wrapper.layouttype = "customlayout";

                        var newValue = customeditor.getData();
                        var oldValue = wrapper.getValue();

                        newValue = newValue.replace("<div name='flowlayout' style='display:none'>&nbsp;</div>", "");
                        newValue = newValue.replace("<div name='customeditor' style='display:none'>&nbsp;</div>", "");
                        newValue = "<div name='customlayout' style='display:none'>&nbsp;</div>" + newValue;
                         

                        wrapper.fireValueChange(oldValue, newValue);
                    }
                } else {
                    control.selecteditor = "";
                    wrapper.layouttype = "positionlayout";
                    var oldValue = wrapper.getValue();
                    wrapper.fireValueChange(oldValue, "<div name='positionlayout' style='display:none'>&nbsp;</div>");
                }
            }
        });

        var flowinput = document.createElement("input");
        $(flowinput).attr("name", $(wrapper).attr("name"));
        flowinput.id = wrapper.getUniqueId("Editor");

        var customeinput = document.createElement("input");
        $(customeinput).attr("name", $(wrapper).attr("name"));
        customeinput.id = wrapper.getUniqueId("Editor");

        $(this.divtabs).tabs('add', {
            title: '流式布局',
            width: '100%',
            content: flowinput,
            selected: false,
            closable: false
        });

        $(this.divtabs).tabs('add', {
            title: '固定布局',
            content: "暂未实现",
            width: '100%',
            selected: false,
            closable: false
        });

        $(this.divtabs).tabs('add', {
            title: '自定义布局',
            width: '100%',
            content: customeinput,
            selected: true,
            closable: false
        });
        //流式布局
        var flowconfig = {
            toolbar: 'None',
            filebrowserBrowseUrl: wrapper.filebrowserBrowseUrl || "",
            filebrowserUploadUrl: wrapper.filebrowserUploadUrl || wrapper.applicationPath + "/CkEditor/CkeditorUpload",
            width: wrapper.width || "675px",
            height: wrapper.height || "780px",
            toolbarLocation: 'none',
            resize_enabled: false
        };
        CKEDITOR.replace(flowinput.id, flowconfig);
        var floweditor = CKEDITOR.instances[flowinput.id];
        floweditor.on('change', function (evt) {
            $(flowinput).val(floweditor.getData());
            var newValue = floweditor.getData();
            var oldValue = wrapper.getValue();

            newValue = newValue.replace("<div name='flowlayout' style='display:none'>&nbsp;</div>", "");
            newValue = newValue.replace("<div name='customeditor' style='display:none'>&nbsp;</div>", "");
            newValue = "<div name='flowlayout' style='display:none'>&nbsp;</div>" + newValue;

            wrapper.fireValueChange(oldValue, newValue);
        });

        this.floweditor = floweditor;
      
        if (wrapper.getValue().indexOf("<div name='flowlayout' style='display:none'>&nbsp;</div>") > -1) {
            floweditor.setData(wrapper.getValue());
            wrapper.layouttype = "flowlayout";
            this.selecteditor = floweditor;
            $(this.divtabs).tabs("select", 0);
        }

        //固定布局
        if (wrapper.getValue().indexOf("<div name='positionlayout' style='display:none'>&nbsp;</div>") > -1) {
            wrapper.layouttype = "positionlayout";
            $(this.divtabs).tabs("select", 1);
        }

        //自定义布局
        var customeconfig = {
            toolbar: 'Full',
            filebrowserBrowseUrl: wrapper.filebrowserBrowseUrl || "",
            filebrowserUploadUrl: wrapper.filebrowserUploadUrl || wrapper.applicationPath + "/CkEditor/CkeditorUpload",
            width: wrapper.width || "675px",
            height: wrapper.height || "780px",
            toolbarLocation: 'top',
            resize_enabled: false
        };
        CKEDITOR.replace(customeinput.id, customeconfig);
        var customeditor = CKEDITOR.instances[customeinput.id];
        customeditor.on('change', function (evt) {
            $(customeinput).val(customeditor.getData());
            var newValue = customeditor.getData();
            var oldValue = wrapper.getValue();

            newValue = newValue.replace("<div name='flowlayout' style='display:none'>&nbsp;</div>", "");
            newValue = newValue.replace("<div name='customeditor' style='display:none'>&nbsp;</div>", "");
            newValue = "<div name='customlayout' style='display:none'>&nbsp;</div>" + newValue;

            wrapper.fireValueChange(oldValue, newValue);
        });

        this.customeditor = customeditor;
        if (wrapper.getValue().indexOf("<div name='customlayout' style='display:none'>&nbsp;</div>") > -1) {
            customeditor.setData(wrapper.getValue());
            wrapper.layouttype = "customlayout";
            this.selecteditor = customeditor;
            $(this.divtabs).tabs("select", 2);
        }

        //初始状态
        if (!wrapper.layouttype)
        {
            wrapper.layouttype = "customlayout";
            this.selecteditor = customeditor;
            $(this.divtabs).tabs("select", 2);
        }

        this.setEdit();
    }

    protected setEdit() {
        var control = this;
        var wrapper = this.getWrapper() as ViewModelContentPropertyView;

        var west = $(control.layout).find('.layout-panel-west').find('.layout-body');
        if (control.div) {
            $(west).width(200);
            $(control.layout).layout ("resize", {
                width: "100%",
                height: "100%"
            });

            if (control.floweditor) {
                control.floweditor.state = UIState.edit;
            }
            if (control.customeditor) {
                control.customeditor.state = UIState.edit;
            }
            $(control.div).resizable({
                onStartResize: function (e) {
                },
                onResize: function (e) {
                },
                onStopResize: function (e) {
                    if (control.floweditor) {
                        control.floweditor.resize(control.floweditor.container.getStyle('width'), $(control.div).css('height').replace("px", "") - 31);
                    }
                    if (control.customeditor) {
                        control.customeditor.resize(control.customeditor.container.getStyle('width'), $(control.div).css('height').replace("px", "") - 31);
                    }
                    $(control.layout).layout("resize", {
                        width: "100%",
                        height: "100%"
                    });
                }
            });
            wrapper.ajax({
                url: "/GroupflyGroup.Platform.Web/Platform/GetKlassPropertys",
                data: { id: wrapper.objektId },
                success: function (result) {

                    setTimeout(function () {
                        if (control.floweditor) {
                            control.floweditor.resize(control.floweditor.container.getStyle('width'), $(control.div).css('height').replace("px", "") - 31);
                        }
                        if (control.customeditor) {
                            control.customeditor.resize(control.customeditor.container.getStyle('width'), $(control.div).css('height').replace("px", "") - 31);
                        }
                    }, 300);
                    if (west) {
                        west.find("table").remove();
                    }
                    var tree = document.createElement("Gf-Tree");
                    tree["data"] = result.Data;
                    tree["hidefoldericon"] = true;
                    tree["autoinit"] = "";
                    tree["lazyLoaduUrl"] = "/GroupflyGroup.Platform.Web/Platform/GetSubPropertys";
                    tree["iscustomelement"] = "";
                    tree["initcompleted"] = "";
                    tree["addHook"](EventNames.NodeClick, function (node) {
                        if (!node.isDirectory) {
                            if (node.id.indexOf("@ObjektDetailView") > -1) {
                                control.selecteditor.insertHtml("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\" id=\"DATA_1502437208833\" img_type=\"date\" name=\"DATA_1502437208833\" parentid=\"" + node.parentId + "\" pathname=\"" + node.pathname + "\" src=\"" + document.body["apppath"] + "/Platform/Content/Scripts/ckeditor/plugins/xd_view/view.jpg\" style=\"height:110px;width:110px;\" value=\"" + node.text + "\" viewid=\"" + node.id + "\" viewname=\"" + node.name + "\" />");
                                //if (node.childrenViews.indexOf(wrapper.objektId) > -1 || node.id == wrapper.objektId) {
                                //    alert("，该视图与当前视图形成循环，无法添加！")
                                //} else {
                                    
                                //}
                               
                            } else if (node.id.indexOf("@ObjektCollectionView") > -1) {
                                control.selecteditor.insertHtml("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\" id=\"DATA_1502437208833\" img_type=\"date\" name=\"DATA_1502437208833\" parentid=\"" + node.parentId + "\" pathname=\"" + node.pathname + "\" src=\"" + document.body["apppath"] + "/Platform/Content/Scripts/ckeditor/plugins/xd_view/view.jpg\" style=\"height:110px;width:110px;\" value=\"" + node.text + "\" viewid=\"" + node.id + "\" viewname=\"" + node.name + "\" />");
                            } else if (node.id.indexOf("@ObjektCollectionView") > -1) {
                                control.selecteditor.insertHtml("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\" id=\"DATA_1502437208833\" img_type=\"date\" name=\"DATA_1502437208833\" parentid=\"" + node.parentId + "\" pathname=\"" + node.pathname + "\" src=\"" + document.body["apppath"] + "/Platform/Content/Scripts/ckeditor/plugins/xd_view/view.jpg\" style=\"height:110px;width:110px;\" value=\"" + node.text + "\" viewid=\"" + node.id + "\" viewname=\"" + node.name + "\" />");
                            } else if (node.id.indexOf("@Property") > -1) {
                                var id = wrapper.getUniqueId(node.name);
                                control.selecteditor.insertHtml("<input element_type=\"xd_property\" align=\"absMiddle\" class=\"AUTO\" datafld=\"SYS_DATE_CN\"  id=\"" + id +"\" input_type=\"property\" name=\"DATA_1501643216318\" style=\"font-size:12px;width:133px;\" parentid=\"" + node.parentId + "\"  pathname=\"" + node.pathname + "\"   propertyid=\"" + node.id + "\" propertyname=\"" + node.name + "\" value=\"" + node.text + "\" />");
                            }
                        }
                    });
                    if (west) {
                        west.append(tree);
                    }
                }
            });
        }
    }
}

