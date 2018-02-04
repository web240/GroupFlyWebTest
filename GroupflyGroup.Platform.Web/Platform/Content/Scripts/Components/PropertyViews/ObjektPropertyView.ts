/// <reference path="BasePropertyView.ts" />

/** 对象属性组件 */
class ObjektPropertyView extends BasePropertyView {
    
    constructor() {
        super();
        this.emptyValue = null;
    }

    static elementName = "Gf-ObjektPropertyView".toLowerCase();

    protected createComponentBrowseState() {
        return new ObjektPropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new ObjektPropertyViewEdit(this);
    }

    /** 是否已加载 */
    private _loaded: boolean;

    /** 字符串属性组件 */
    private _nameinput: StringPropertyView;

    /** valueinput */
    private _valueinput: HTMLInputElement;

    /** 打开按钮 */
    private _opendetail: HTMLButtonElement;

    /** 选择按钮 */
    private _selectobject: HTMLButtonElement;

    /** 清除按钮 */
    private _clear: HTMLButtonElement;

    /** 浏览链接 */
    private _browser: HTMLAnchorElement;


    /** 对象 */
    private _obj: any;


    /** 浏览链接 */
    get browser() {
        return this._browser;
    }
    set browser(val) {
        this._browser = val;
    }



    /** 选择按钮 */
    get clear() {
        return this._clear;
    }
    set clear(val) {
        this._clear = val;
    }


     /** 选择按钮 */
    get selectobject() {
        return this._selectobject;
    }
    set selectobject(val) {
        this._selectobject = val;
    }


    /** 打开按钮 */
    get opendetail() {
        return this._opendetail;
    }
    set opendetail(val) {
        this._opendetail = val;
    }



    /** 加载 */
    get loaded() {
        return this._loaded;
    }
    set loaded(val) {
        this._loaded = val;
    }

    /** 字符串属性组件 */
    get nameinput() {
        return this._nameinput;
    }
    set nameinput(val) {
        this._nameinput = val;
    }

    /** valueinput */
    get valueinput() {
        return this._valueinput;
    }
    set valueinput(val) {
        this._valueinput = val;
    }

    /** 链接 */
    get href(){
        return this.getAttribute("href");
    }
    set href(val){
        this.setAttribute("href",val);
    }
    /** id属性名称 */
    get idfield(){
        return this.getAttribute("idfield") || PropertyNames.id;
    }
    set idfield(val){
        this.setAttribute("idfield",val);
    }
    /** 标签属性名称 */
    get namefield(){
        return this.getAttribute("namefield") || PropertyNames.combinedLabel;
    }
    set namefield(val){
        this.setAttribute("namefield",val);
    }
    /** 类名 */
    get klass(){
        return this.getAttribute("klass");
    }
    set klass(val){
        this.setAttribute("klass",val);
    }

    /** 是否禁止编辑 */
    get forbidEdit(){
        return this.safeToString(this.getAttribute("forbidEdit")).toLowerCase() == "true";
    }
    set forbidEdit(val){
        this.setAttribute("forbidEdit",val.toString());
    }
    
    /** 是否禁止清除 */
    get forbidClear(){
        return this.safeToString(this.getAttribute("forbidClear")).toLowerCase() == "true";
    }
    set forbidClear(val){
        this.setAttribute("forbidClear",val.toString());
    }
    
    /** 是否禁止打开 */
    get forbidOpen(){
        return this.safeToString(this.getAttribute("forbidOpen")).toLowerCase() == "true";
    }
    set forbidOpen(val){
        this.setAttribute("forbidOpen",val.toString());
    }
    
    public resize(width) { 
        this.nameinput.resize(width - 52);

        
    }
   
    protected setReadOnly(readonly: boolean) {
       
    } 

     
    public getObject() {
        return this._obj;
    }
        
    public setObject(obj){ 
        if(!obj || !obj[this.idfield]){
            obj = {};
            obj['klass'] = this.klass;
            obj['title'] = '';
            obj[this.namefield] = '';
            obj[this.idfield] = '';
            obj.permissioncode = '11111';
        }
        var browser = this._browser;
        var name = obj[this.namefield];
        if(!obj.permissioncode){
            this.forbidOpen = true;
            obj[this.namefield] = '无发现权';
            name = "<span class='fa fa-exclamation-circle'></span>无发现权";
        }
        else if(obj.permissioncode === "-1"){
            this.forbidOpen = true;
            obj[this.namefield] = '该对象不存在';
            name = "<span class='fa fa-exclamation-circle'></span>该对象不存在";
        }
        else if(obj.permissioncode[0] === "0"){
            this.forbidOpen = true;
            obj[this.namefield] = '无发现权';
            name = "<span class='fa fa-exclamation-circle'></span>无发现权"
        }
        else if(obj.permissioncode[1] === "0"){
            this.forbidOpen = true;
        }

        $(browser).html(name);  
        if(obj[this.namefield] === ""){
            obj[this.namefield] = obj[this.idfield];
        }
        
        this._obj = obj;

        this.nameinput["setValue"](obj[this.namefield]);  
    }

 

    public open(){ 
        var ObjectSelector = this;
        var href = this.href || ComponentRoot.APIs.selectObjekt;
        var dialog = this.get('SelectDialog');
        if (!this._loaded) {
            this.openSelector();
            this._loaded = true;
        }
        dialog.open();
    }

    public close(){ 
        this.get('SelectDialog').close(); 
    };

    protected attributeChanged(attrName: string, oldValue, newValue) {

        super.attributeChanged(attrName, oldValue, newValue);

        if (attrName === "forbidOpen" && newValue === "") {
            var browser = this._browser;
            $(browser).css("text-decoration", "none");
            $(browser).unbind();
        }
    }

    protected onSetValue(value) {
        var element = this;
        if (value) {
            var obj = this.getObjektData([value]).get(value);
            element.setObject(obj);
        }
        else {
            element.setObject(null);
        }
    }

    protected getKlassMeta() {
        var element = this;
        if (element._loaded) {
            return element.get("KlassMeta");
        }
        var obj = {};
        element.ajax({
            url: ComponentRoot.APIs.getklassTree,
            sync: true,
            data: { klassname: element.klass },
            success: function (result) {
                obj = JSON.parse(result.Data);
                element.set("KlassMeta", obj);
            }
        });
        return obj;
    }

    protected openSelector() {
        var element = this;
        var div = element.get("SelectDialog");
        var klassMeta = this.getKlassMeta();
        var href = element.href || ComponentRoot.APIs.selectObjekt;
        var buttonsdiv = element.get("buttonsdiv");
        /*创建选择区域*/
        var layout = document.createElement("div");
        element.set("layout", layout);
        div.appendContent(layout);

        $(layout).layout({
            fit: true
        });
        if (klassMeta.children && klassMeta.children.length > 0) {
            $(layout).layout('add', {
                region: 'center',
                width: 620,
                collapsible: true,
                split: true
            });
            $(layout).layout('add', {
                region: 'west',
                width: 180,
                title: '类目录',
                collapsible: true,
                split: true
            });
            var west = $(layout).find('.layout-panel-west').find('.layout-body');

            var array = [];
            array.push(klassMeta);
            var tree = document.createElement("Gf-Tree");
            tree["hidefoldericon"] = true;
            tree["loadData"](array);
            tree["registerEventHandler"]("onNodeClick", function (node) {
                center.load(href, { klass: node.klassName, filterid: element.filterId || '' });
            });
            west.append(tree);
            element.set("west", west);
        }
        else {
            $(layout).layout('add', {
                region: 'center',
                width: 800,
                collapsible: true,
                split: true
            });
        }
        $(layout).layout('add', {
            region: 'south',
            collapsible: false,
            split: false
        });

        var south = $(layout).find('.layout-panel-south').find('.layout-body');
        south.append(buttonsdiv);

        var center = $(layout).find('.layout-panel-center').find('.layout-body');
        center.load(href, { klass: element.klass, filterid: element.filterId || '' });

        element.set("center", center);
        element.set("south", south);

    }

    public buildSelectDialog() {
        var element = this;
        var dialog =new Dialog();
        dialog.width = "800";
        dialog.height = "460";
        dialog.modal = true;
        dialog.title = '选择“' + element.klass + '”对象';
        dialog.init();
        element.set("SelectDialog", dialog);


        /*创建按钮*/
        this.buildSelectDialogButtons();
    }

    protected buildSelectDialogButtons() {
        var element = this;
        var sure = this.createButton("确定", "fa fa-check", function () {
            var grid = $(element.get("SelectDialog").div).find("Gf-ObjektCollectionView")[0];
            var row = grid.getSelectedRow();
            grid.endEditRows();
            if (grid.haschange) {
                $.messager.alert('提示', '请保存数据后再选择！')
            }
            else if (!row) {
                $.messager.alert('提示', '请至少选择一条数据！')
            }
            else {
                element.setValue(row[element.idfield]);
                element.close();
            }
        });

        var cancel = this.createButton("取消", "fa fa-times", function () {
            element.close();
        });

        var buttonsdiv = document.createElement("div");
        $(buttonsdiv).addClass("dialog-button");
        buttonsdiv.id = this.getUniqueId("buttonsdiv");
        buttonsdiv.appendChild(sure);
        buttonsdiv.appendChild(cancel);
        element.set("buttonsdiv", buttonsdiv);

    }

    protected created(){
        super.created();
        this.addHook(EventNames.BeforeInit,()=>{
            var value = this.getValue();
            if(value){
                this._obj = this.getObjektData([value]).get(value);
            }
        });
    }
    
}
ObjektPropertyView.register();



class ObjektPropertyViewBrowse extends StringPropertyViewBrowse {

    onRender() {

        var element = this.getWrapper() as ObjektPropertyView;
        var display = super.onRender();
        //浏览链接
        var browser = document.createElement("a");
        $(browser).attr("href", "javascript:void(0);");
        $(browser).css("text-decoration", "underline");
        $(browser).css("color", "inherit");


        var openfunc = function () {
            if (element.forbidOpen)
                return;
            var obj = element.getObject();
            if (obj && obj[element.idfield]) {
                ComponentRoot.openObjDetail({
                    controlid: element.id,
                    objid: obj[element.idfield],
                    klass: element.klass,
                    title: obj["title"]
                });
            }
        };

        $(browser).click(openfunc);

        var obj = element.getObject();
        if (!obj) {
            $(browser).html("");
        } else {
            $(browser).html(obj[element.namefield]);
        }
        
        $(display).html(browser);

        return display;
        
    }
      

     
}

class ObjektPropertyViewEdit extends StringPropertyViewEdit {

    onRender() {
        var element = this.getWrapper() as ObjektPropertyView;
        $(element).addClass("GfObjektPropertyView");
        element.loaded = false;        
        element.idfield = element.idfield || PropertyNames.id;
        element.namefield = element.namefield || PropertyNames.combinedLabel;

        //输入框
        var nameinput = new StringPropertyView();
        nameinput.autoBuildComponentTree = false;
        element.nameinput = nameinput; 


        var span = document.createElement("span");
        $(span).hide();

        span.appendChild(nameinput);
        nameinput.width = (parseInt(element.width || "170") - 52).toString();
        nameinput.diseditable = true;
        nameinput.state = UIState.edit;
        
        var obj = element.getObject();
        if (!obj) {
            nameinput.setValue("");
        } else {
            nameinput.setValue(obj[element.namefield]);
        }

        //存值隐藏域
        var valueinput = document.createElement("input");
        $(valueinput).attr("type", "hidden");
        $(valueinput).attr("name", $(element).attr("name"));
        element.valueinput=valueinput;
        span.appendChild(valueinput);
        //创建按钮方法
        var createButton = function (name: HTMLButtonElement, icon, func) {
            var button = document.createElement("Button") as HTMLButtonElement;
            $(button).attr("type", "button");
            $(button).addClass("clean-gray");
            $(button).css("height", parseInt(element.height || "24") - 2);
            $(button).html("<i class='" + icon + "'></i>");
            $(button).click(function(e){
                (e as Event).stopPropagation();
                func();
            });

            name = button;
                       
            span.appendChild(button);

        }

        var openfunc = function () {
            if (element.forbidOpen)
                return;
            var obj = element.getObject();
            if (obj && obj[element.idfield]) {
                ComponentRoot.openObjDetail({
                    controlid: element.id,
                    objid: obj[element.idfield],
                    klass: element.klass,
                    title: obj["title"]
                });
            }
        };

        //打开按钮
        createButton(element.opendetail, "fa fa-folder-open-o", openfunc);
        //选择按钮
        createButton(element.selectobject, "fa fa-pencil-square-o", function () {
            if (element.forbidEdit)
                return;
            element.open();
        });
        //清除按钮
        createButton(element.clear, "fa fa-times", function () {
            if (element.forbidClear)
                return;
            element.setValue(null);
        });

       

        element.buildSelectDialog();


        element.onAfterInit(function () {
            if (element.value) {
                var obj = element.value;
                if (Utils.isString(element.value)) {
                    obj = Utils.stringToObject(element.value);
                }
                element.setObject(obj);
            }
        }); 

        return span;
    }
}