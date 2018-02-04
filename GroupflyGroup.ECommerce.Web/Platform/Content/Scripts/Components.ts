declare var $: any;
declare var jQuery: any;
declare var xtag: any;
declare var CKEDITOR: any;
declare var WebUploader: any;

//【扩展接口】
interface ICustomElementExtend {
    afterCreate?(element): void;
    afterInsert?(element): void;
    afterRemove?(element): void;
    afterAttributeChange?(element, attrName: string, oldValue, newValue): void;

    beforeInit?(element): void;
    afterInit?(element): void;

}

//【自定义标签基类】
abstract class CustomElement {

    constructor(extension?: ICustomElementExtend) {
        this.extension = extension || {};
        this.properties = new Array();
        this.methods = new Array();

        this.addProperties("elementname,state,containerid,viewmodel,customattr,onaftercreate,onafterinsert,onafterremove,onafterattributechange,onbeforeinit,onafterinit");
        this.addboolProperties("iscustomelement,initcompleted,autoinit,readonly");
        this.addMethod("init", `function() { control.init(this); this.initcompleted = true; }`);
        this.addMethod("overrideEventHandler", `function(name, func) { 
                                                this.xtag["EventHandlers"][name] = [];
                                                this.xtag["EventHandlers"][name].push(func);
                                                }`);
        this.addMethod("registerEventHandler", `function(name, func) { 
                                                if(!this.xtag["EventHandlers"][name]){ 
                                                    this.xtag["EventHandlers"][name] = [];
                                                }
                                                this.xtag["EventHandlers"][name].push(func);
                                                }`);
        this.addMethod("triggerEventHandler", `function(name,params) { 
                                                    var element = this;
                                                    var handlers = this.xtag["EventHandlers"][name];
                                                    if(handlers) {
                                                        $(handlers).each(function () {
                                                            this.apply(element,params);
                                                        });
                                                    }
                                                }`);
        this.addMethod("set", `function(name, obj) { this.xtag[name] = obj; }`);
        this.addMethod("get", `function(name) { return this.xtag[name]; }`);
        this.addMethod("setCustomAttr", `function(attr,value){ this.get("customAttrObj")[attr] = value; }`);
        this.addMethod("getCustomAttr", `function(attr){ return this.get("customAttrObj")[attr]; }`);
        this.addMethod("setExtraParams", `function(attr,value){ this.get("ExtraParams")[attr] = value; }`);
        this.addMethod("getExtraParams", `function(attr){ return this.get("ExtraParams")[attr]; }`);
        this.addMethod("createLinkbutton", "function(text, iconCls, onclick,options){ return control.createLinkbutton(text, iconCls, onclick,options); }");
        this.addMethod("GetUniqueId", `function(prefix){ return control.GetUniqueId(prefix); }`);
        this.addMethod("getChildren", `function(){ return $(this).find("[iscustomelement]"); }`);
        this.addMethod("warning", `function(message) { control.warning(message); }`);
        this.addMethod("setState", `function(state) { control.setState(this,state); }`);
    }
    //标签名称
    protected elementName: string;
    //标签静态内容
    protected content: string;
    //继承自
    protected extends: string;
    //自动初始化
    protected autoInit: boolean;
    //属性列表
    protected properties: Array<string>;
    //方法列表
    protected methods: Array<string>;

    //扩展对象
    private extension: ICustomElementExtend;

    //默认方法
    protected defaultMethod = "function() { }";
    //默认属性
    protected defaultProperty = "{ attribute: {} }";

    //添加属性
    protected addProperty(name: string, value?: string) {
        if (name) {
            if (!value) {
                value = this.defaultProperty;
            }
            this.properties[name] = value;
        }
    }
    //添加bool属性
    protected addboolProperty(name: string) {
        this.addProperty(name, "{ attribute: { boolean:true } }");
    }
    //批量添加属性
    protected addProperties(names: string) {
        var nameArray = names.split(',');
        for (var key in nameArray) {
            this.addProperty(nameArray[key]);
        }

    }
    //批量添加属性
    protected addboolProperties(names: string) {
        var nameArray = names.split(',');
        for (var key in nameArray) {
            this.addboolProperty(nameArray[key]);
        }

    }

    //添加只读属性（存储于组件视图状态中，名称同属性名）
    protected addReadonlyProperty(name: string){
        this.addProperty(name, `{ attribute: {}, get: function()  { return this.get("` + name +`"); } }`);
    }

    //批量添加只读属性
    protected addReadonlyProperties(names: string){
        var nameArray = names.split(',');
        for (var key in nameArray) {
            this.addReadonlyProperty(nameArray[key]);
        }

    }


    //添加方法
    protected addMethod(name: string, value?: string) {
        if (name) {
            if (!value) {
                value = this.defaultMethod;
            }
            this.methods[name] = value;
        }
    }
    //批量添加方法
    protected addMethods(names: string) {
        var nameArray = names.split(',');
        for (var key in nameArray) {
            this.addMethod(nameArray[key]);
        }

    }
    //注册属性
    protected setProperties() {
        var accessors = "";
        for (var key in this.properties) {
            if (accessors == "") {
                accessors = key + ":" + this.properties[key];
            }
            else {
                accessors += "," + key + ":" + this.properties[key];
            }
        }
        return accessors;
    }
    //注册方法
    protected setMethods() {
        var methods = "";
        for (var key in this.methods) {
            if (methods == "") {
                methods = key + ":" + this.methods[key];
            }
            else {
                methods += "," + key + ":" + this.methods[key];
            }
        }
        return methods;
    }

    protected createLinkbutton(text: string, iconCls: string, onclick: Function, options) {
        var tool = document.createElement("a");
        $(tool).attr("title", text);
        $(tool).css("margin", "2px");
        tool.innerText = text;
        $(tool).linkbutton({
            iconCls: iconCls + " iconfont"
        });
        var option = $(tool).linkbutton('options');
        $(tool).bind('click', function () {
            if (!option.disabled) {
                onclick();
            }
        });
        if (options) {
            for (var p in options) {
                if (options.hasOwnProperty(p)) {
                    $(tool).attr(p, options[p]);
                }
            }
        }
        return tool;
    }
    //创建内容（各元素自定义）
    protected initContent(element) { }

    //初始化
    protected init(element) {
        var control = this;
        if (!element.initcompleted) {
            if (this.extension.beforeInit) {
                this.extension.beforeInit(element);
            }
            element.triggerEventHandler("onbeforeinit");
            if (element.onbeforeinit) {
                eval(element.onbeforeinit);
            }

            this.initContent(element);
            if (!element.id) { element.id = this.GetUniqueId(this.elementName); }
            element.initcompleted = true;

            if (this.extension.afterInit) {
                this.extension.afterInit(element);
            }
            element.triggerEventHandler("onafterinit");
            if (element.onafterinit) {
                eval(element.onafterinit);
            }
        }
    }

    //创建后事件
    protected create(element) {
        var control = this;
        if (element.autoinit) {
            $(element).ready(function () {
                control.init(element);
            });
        }
    }


    //插入后事件
    protected insert(element) { }

    //属性修改后事件
    protected attributeChange(element, attrName: string, oldValue, newValue) { }

    //移除后事件
    protected remove(element) { }

    //注册元素
    public register() {
        if (!xtag.tags[this.elementName.toLowerCase()]) {

            var accessors = this.setProperties();
            var methods = this.setMethods();
            var extendsfrom = this.extends ? "extends: '" + this.extends + "'," : "";
            var control = this;
            eval(`xtag.register(control.elementName, {
                ` + extendsfrom + `
                content: control.content,
                accessors: {` + accessors +
                `},
                lifecycle: {
                    created: function () {
                        if(this.customattr) {  this.set("customAttrObj", control.stringToObject(this.customattr)); }
                        else { this.set("customAttrObj",{}); }
                        if(control.autoInit){  this.autoinit = true; }
                        this.set("EventHandlers",[]);
                        this.set("ExtraParams",[]);
                        this.iscustomelement = true;
                        this.elementname = control.elementName.toLowerCase();

                        control.create(this);
                        if (control.extension.afterCreate) {
                            control.extension.afterCreate(this);
                        }
                        if(this.onaftercreate){
                            eval(this.onaftercreate);
                        }
                    },
                    inserted: function () {
                        control.insert(this);
                        if (control.extension.afterInsert) {
                            control.extension.afterInsert(this);
                        }
                        if(this.onafterinsert){
                            eval(this.onafterinsert);
                        }
                    },
                    removed: function () {
                        control.remove(this);
                        if (control.extension.afterRemove) {
                            control.extension.afterRemove(this);
                        }
                        if(this.onafterremove){
                            eval(this.onafterremove);
                        }
                    },
                    attributeChanged: function (attrName, oldValue, newValue) {
                        control.attributeChange(this,attrName, oldValue, newValue);
                        if (control.extension.afterAttributeChange) {
                            control.extension.afterAttributeChange(this,attrName,oldValue,newValue);
                        }
                        if(this.onafterattributechange){
                            eval(this.onafterattributechange);
                        }
                    }
                },
                methods: {` + methods + `
                }
            });`);
        }
    }

    //查询对象属性数
    protected getPropertyCount(obj: Object, exceptions?: Array<string>) {
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (!exceptions || exceptions.indexOf(i) < 0) {
                    count++;
                }
            }
        }
        return count;
    }

    //字符串转对象
    protected stringToObject(str: string) {
        return eval("(" + str + ")");
    }
    //生成控件Id
    protected GetUniqueId(prefix?: string) {
        return prefix + Date.parse(new Date().toString()).toString(16) + Math.floor(Math.random() * 10000);
    }

    //提示框
    protected warning(message: string) {
        $.messager.alert('提示', message);
    }

    //确认框
    protected confirm(message: string, func: Function) {
        $.messager.confirm('请确认', message, function (r) {
            if (r) {
                func();
            }
        });
    }

    //判断对象是否是字符串  
    protected isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    }
    protected safeToString(obj: Object) {
        if (!obj) {
            return '';
        }
        return obj.toString();
    }
    protected includeJS(source) {
        if (source) {
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.src = source;
            if ($("head")[0].innerHTML.indexOf(source) === -1) {
                $('head').append(oScript);
            }
        }
    }
    protected includeStyle(source) {
        if (source) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = source;
            $('head').append(link);
        }
    }

    protected setState(element, state: string) {
        if (state != element.state) {
            element.state = state;
            element.triggerEventHandler("onStateChange");
        }
    }

    protected ajax(element, option){
        if(element.xtag["EventHandlers"]["onAjaxError"]){
            option.error = function(rezult){
               element.triggerEventHandler("onAjaxError", [rezult]); 
            };
        }
        window["platformAjax"](option);
    }
}

//【对话框】
class GfDialog extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Dialog";
        this.addboolProperties("modal");
        this.addProperties("title,href,width,height");
        this.addProperty("contents", `{ attribute: {}, get: function()  { return this.get("contents"); } }`);
        this.addProperty("div", `{ attribute: {}, get: function()  { return this.get("div"); } }`);
        this.addMethod("maximize", `function(){
                                        $(this.get('div')).dialog('maximize');
                                    }`);
        this.addMethod("open", `function(){ 
                                    var div = this.get('div');
                                    $(div).dialog({ 
                                        title: this.title, 
                                        /*width : this.width,
                                        height : this.height,*/
                                        modal : this.modal
                                    }); 
                                    if(this.href){
                                        $(div).dialog({ href : this.href });
                                    }
                                    this.restore();
                                    $(div).dialog('open'); 
                                    this.triggerEventHandler("onOpen");
                                }`);
        this.addMethod("close", `function(){ 
                                    $(this.get('div')).dialog('close');
                                }`);
        this.addMethod("restore", "function(){ $(this.get('div')).dialog('restore'); }");
        this.addMethod("clearContent", `function(){ 
                                            $(this.get('div')).html(''); 
                                            this.set("contents",[]);
                                        }`);
        this.addMethod("appendContent", `function(component){ 
                                            $(component).appendTo(this.get('div'));
                                            this.get("contents").push(component);
                                        }`);
    }

    protected initContent(element) {
        element.set("contents", []);
        var div = document.createElement("div");
        element.set("div", div);
        element.appendChild(div);
        element.set("max", false);
        var control = this;
        $(div).css("padding", "2px");
        $(div).dialog({
            title: element.title || 'Dialog',
            width: element.width || 1200,
            height: element.height || 600,
            closed: true,
            resizable: true,
            maximizable: true,
            cache: false,
            onMaximize: function () {
                element.set("max", true);
                element.triggerEventHandler("onMaximize");
            },
            onRestore: function () {
                element.set("max", false);
                element.triggerEventHandler("onRestore");
            },
            onBeforeClose: function () {
                element.triggerEventHandler("onBeforeClose");
            },
            onClose: function () {
                element.triggerEventHandler("onClose");
            },
            modal: element.modal
        });
        $(div).dialog("header").dblclick(function (event) {
            if (element.get("max")) {
                $(div).dialog("restore");
                element.set("max", false);
            }
            else {
                $(div).dialog("maximize");
                element.set("max", true);
            }
        });

    }
}

//【对象详情】
class GfObjektView extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-ObjektView";
        this.addProperty("inputs", "{ attribute: {}, get: function()  { return this.xtag.inputs;} }");
        this.addProperties("objektid,klass,title,leftwidth,rightwidth");
        this.addMethod("load", `function(state,inspectChange) {  
                                    var element = this;
                                    if(!state){
                                        state = element.state;
                                    }
                                    var func = function(){
                                            element.state = state;
                                            control.buildPropertyControls(element);
                                        };
                                    if(inspectChange && control.haschange(this)){
                                        control.confirm('有未保存的修改，是否放弃？', func);
                                    }
                                    else{
                                        func();
                                    } 
                                }`);
        this.addMethod("save", `function() { control.save(this); }`);
        this.addMethod("setChangeObject", `function(change) { control.setChangeObject(this,change); }`);
        this.addMethod("setTrash", `function(isTrash) { 
                                            var dialog = this;
                                            platformAjax({
                                                url: document.body.trashurl,
                                                data: {objektIds: this.objektid, isTrash : isTrash},
                                                success: function(result) {
                                                    dialog.load("read",false);
                                                }
                                            });
                                        }`);
        this.addMethod("close", `function(){ document.body["closeDialog"](this.objektid);}`);
    }

    protected initContent(element) {
        if (!element.state) element.state = "read";
        var div = document.createElement("div");
        element.set("div", div);
        element.appendChild(div);

        var toolbar = document.createElement("div");
        toolbar.id = this.GetUniqueId("toolbar");
        $(toolbar).addClass("Toolbar");

        var read = this.createLinkbutton("浏览", "fa fa-square-o", function () {
            element.load("read", true);
        }, {});
        var edit = this.createLinkbutton("编辑", "fa fa-pencil-square-o", function () {
            element.setState("edit");
        }, {});
        var save = this.createLinkbutton("保存", "fa fa-floppy-o", function () {
            if (element.state == "edit") {
                element.save();
            }
        }, {});
        var trash = this.createLinkbutton("回收", "fa fa-trash-o", function () {
            control.confirm("是否确认回收？", function () {
                element.setTrash(true);
            });
        }, {});
        var untrash = this.createLinkbutton("还原", "fa fa-recycle", function () {
            element.setTrash(false);
        }, {});

        var refresh = this.createLinkbutton("刷新", "fa fa-refresh", function () {
            element.load("", true);
        }, {});
        var idshower = this.createLinkbutton("查看ID", "fa fa-id-card-o", function () {
            var ids = '<div style="padding:15px;">';
            ids += '<p>"' + element.title + '"的ID： ' + element.objektid + '</p>';
            ids += "</div>";
            document.body["openDialog"]({
                id: element.id + "-CheckID",
                width: 500,
                height: 200,
                title: '查看ID',
                content: ids
            });
        }, {});
        var reference = this.createLinkbutton("查看引用", "fa fa-arrow-left", function () {
            document.body["openDialog"]({
                id: element.objektid,
                width: 800,
                title: '引用“' + element.title + '”的对象',
                href: document.body["referenceurl"] + "?id=" + element.objektid
            });
        }, {});

        var permission = document.createElement("Gf-Authorization");

        var uml = this.createLinkbutton("UML", "fa fa-retweet", function () {
            var umlParam = document.createElement("Gf-UmlParams");
            umlParam["ids"] = element.objektid;
            umlParam["init"]();
            umlParam["open"]();
        }, {});

        element.set("read", read);
        element.set("edit", edit);
        element.set("save", save);
        element.set("untrash", untrash);
        element.set("refresh", refresh);
        element.set("idshower", idshower);
        element.set("reference", reference);
        element.set("trash", trash);
        element.set("permission", permission);
        element.set("uml", uml);

        $(read).hide();
        $(edit).hide();
        $(save).hide();
        $(trash).hide();
        $(untrash).hide();
        $(permission).hide();
        if(element.klass != 'Klass'){
            $(uml).hide();
        }
        toolbar.appendChild(read);
        toolbar.appendChild(edit);
        toolbar.appendChild(save);
        toolbar.appendChild(refresh);
        toolbar.appendChild(idshower);
        toolbar.appendChild(reference);
        toolbar.appendChild(trash);
        toolbar.appendChild(untrash);
        toolbar.appendChild(permission);
        toolbar.appendChild(uml);
        element.set("toolbar", toolbar);

        var layout = document.createElement("div");
        element.set("layout", layout);
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
            width: element.leftwidth || 500,
            collapsible: true,
            split: true
        });
        $(layout).layout('add', {
            region: 'north',
            height: 36,
            collapsible: false,
            split: false
        });
        $(layout).layout('add', {
            region: 'south',
            height: 350,
            collapsible: false,
            split: true
        });

        var center = $(layout).find('.layout-panel-center').find('.layout-body');
        var north = $(layout).find('.layout-panel-north').find('.layout-body');
        var west = $(layout).find('.layout-panel-west').find('.layout-body');
        var south = $(layout).find('.layout-panel-south').find('.layout-body');
        element.set("center", center);
        element.set("west", west);
        element.set("south", south);
        element.set("top", north);
        $(north).css("border-bottom", "1px solid lightgray");
        $(north).append(toolbar);

        var control = this;
        $(div).css("width", "100%");
        $(div).css("height", "100%");

        var tabid = control.GetUniqueId("tab");
        center.html(`<div id="` + tabid + `" is="Gf-Tabs" class="frametabs" fit lazyload autoinit></div>`);
        element.set("tabid", tabid);


        permission["init"]();
        element.registerEventHandler("oninitLoaded", function () {
            permission["load"]({ id: element.objektid });
        });
        this.buildPropertyControls(element, true);

    }

    protected setState(element, state) {
        var edit = element.get("edit");
        var save = element.get("save");
        var read = element.get("read");
        var trash = element.get("trash");
        var untrash = element.get("untrash");
        var idshower = element.get("idshower");

        var obj = element.get("ServerObjekt");
        var forminputs = element.get("inputs");

        if (obj.isTrash.value.toLowerCase() == 'true') {
            
            var obj = element.get("ServerObjekt");
            if(obj.permissioncode[3] == '1'){
                $(untrash).show();
            }
            $(trash).hide();
        }
        else {
            if(obj.permissioncode[3] == '1'){
                $(trash).show();
            }
            $(untrash).hide();
        }
        if (state == "edit") {
            $(edit).hide();
            $(save).show();
            $(read).show();
        }
        else {
            var obj = element.get("ServerObjekt");
            if(obj.permissioncode[2] == '1'){
                $(edit).show();
            }
            $(save).hide();
            $(read).hide();
        }
        if (element.objektid) {
            $(idshower).show();
        }
        else {
            $(idshower).hide();
        }
        $(forminputs).each(function () {
            this.setState(state);
        });
        var tab = document.querySelector("#" + element.get("tabid"));

        super.setState(element, state);
    }

    protected buildPropertyControls(element, firstLoad) {
        var control = this;
        var change = element.get("changeObject");
        if (change && change["dataType"]) {
            var datatype = JSON.parse(change["dataType"]);
            element.set("PropertyDataType", datatype.id);
        }

        control.ajax(element,{
            url: document.body["getobjwithmetaurl"],
            data: { id: element.objektid, klass: element.klass, dataTypeId: element.get("PropertyDataType") },
            success: function (result) {
                var tabid = element.get("tabid");
                var tab = document.getElementById(tabid);
                var layout = element.get("layout");
                var center = element.get("center");
                var west = element.get("west");
                var north = element.get("north");
                var south = element.get("south");
                var obj = JSON.parse(result.Data);
                element.set("ServerObjekt", obj);
                //有当前对象的授权权或者当前权限对象的查看权
                if(obj.permissioncode[4] == '1' || obj.permission.value.permissioncode[1] == '1'){
                    var permission = element.get("permission");
                    $(permission).show();
                }

                var table = document.createElement("table");
                $(table).addClass("ObjektView");

                var inputs = [];
                for (var propertyname in obj) {
                    var property = obj[propertyname]
                    if (property.hidden == "false") {
                        var elementname = property['elementname'];

                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        $(th).addClass("PropertyLabel");
                        $(th).attr("title", property["description"]);
                        var label = property['required'] == "true" ? "*" + property["label"] : property["label"];
                        $(th).text(label + "：");
                        var td = document.createElement("td");
                        $(td).addClass("PropertyValue");
                        $(tr).append(th).append(td);
                        $(table).append(tr);
                        if (elementname) {
                            var ui = document.createElement(elementname);
                            $(td).append(ui);
                            ui['name'] = property['name'];
                            ui['label'] = property['label'];
                            ui['description'] = property['description'];
                            ui['filterid'] = property['filterid'];
                            ui['objektid'] = property['objektid'];
                            ui['propertyname'] = property['propertyname'];
                            ui['width'] = property['width'];
                            ui['state'] = property['state'];
                            ui['autosave'] = property['autosave'] == "true";
                            ui['readonly'] = property['readonly'] == "true";
                            ui['hidden'] = property['hidden'] == "true";
                            ui['required'] = property['required'] == "true";
                            ui['prec'] = property['prec'];
                            ui['scale'] = property['scale'];

                            if (elementname == 'Gf-ObjectSelector') {
                                ui['value'] = JSON.stringify(property['value']);
                                ui['idfield'] = property['idfield'];
                                ui['namefield'] = property['namefield'];
                                ui['href'] = property['href'];
                                ui['klass'] = property['klass'];
                            }
                            else if (elementname == 'Gf-DropDownList') {
                                ui['value'] = JSON.stringify(property['value']);
                                ui['valuefield'] = property['valuefield'];
                                ui['textfield'] = property['textfield'];
                                ui['defaultoption'] = property['defaultoption'];
                                ui['data'] = property['data'];
                                if (property['value'] && property['value'].color) {
                                    $(td).css("background-color", "#" + property['value'].color);
                                }
                            }
                            else {
                                ui['value'] = property['value'];
                            }
                            //ui["init"]();
                            inputs.push(ui);
                        }
                        else {
                            $(td).html(property['value']);
                        }

                    }

                }
                element.set("inputs", inputs);

                if (obj.roccnames.length == 0) {
                    center.html("");
                    center.removeClass("panel-noscroll");
                    center.append(table);
                    $(layout).layout("remove", "west");
                    $(layout).layout("remove", "south");
                    element.set("hasRelated", false);
                }
                else {
                    if (obj.viewLayout == 'Vertical') {
                        $(tab).appendTo(south[0])
                        south.addClass("panel-noscroll");
                        center.html("");
                        center.append(table);
                        center.removeClass("panel-noscroll");
                        $(layout).layout("remove", "west");
                    }
                    else {
                        $(layout).layout("remove", "south");
                        west.find("table").remove();
                        west.append(table);
                    }
                    element.set("hasRelated", true);
                    tab["lazyload"] = true;
                    tab["init"]();
                    tab["closeAll"]();
                    $(obj.roccnames).each(function () {
                        var klass = this.split('-')[0];
                        var title = this.split('-')[1];
                        var id = control.GetUniqueId(klass);
                        var href = document.body["rocviewurl"] + "?klass=" + klass + "&id=" + element.objektid + "&sourceKlass=" + element.klass;
                        tab["add"](id, title, href, "", false);
                    });
                    tab["overrideEventHandler"]("onLazyLoad", function (index) {
                        var subTab = tab["getTab"](index);
                        var grid = $(subTab).find("gf-datagrid")[0];
                        if (grid && tab["state"] == "edit")
                            grid.setState("edit");
                    });
                    tab["overrideEventHandler"]("onStateChange", function () {
                        var tabs = tab["getAllTabs"]();
                        $(tabs).each(function () {
                            var grid = $(this).find("gf-datagrid")[0];
                            if (grid) {
                                grid.setState(tab["state"]);
                            }
                        });
                    });
                    if (firstLoad) {
                        element.registerEventHandler("onStateChange", function () {
                            if (element.state == "edit")
                                tab["setState"](element.state);
                        });
                    }
                    tab["setState"](element.state);
                    tab["select"](0);
                }

                //后处理
                for (var inputitem in inputs) {
                    inputs[inputitem]["init"]();
                }

                $(element.get("layout")).layout("resize", { width: '100%', height: '100%' });
                control.setState(element, element.state);
                if (firstLoad) {
                    $(inputs).each(function () {
                        var input = this;
                        if (change && input.propertyname in change) {
                            if (input.initcompleted)
                                input.setValue(change[input.name]);
                            else
                                input.registerEventHandler("onafterinit", function () {
                                    input.setValue(change[input.name]);
                                });
                        }
                    });
                    element.triggerEventHandler("oninitLoaded");
                }
            }
        });
    }

    protected haschange(element) {
        var haschange = false;
        $(element.inputs).each(function () {
            if (this.haschange) {
                haschange = true;
            }
        });
        if (element.get("hasRelated")) {
            //列表保存
            var tab = document.querySelector("#" + element.get("tabid"));
            var subTabs = tab["getAllTabs"]();
            $(subTabs).each(function () {
                var grid = $(this).find("gf-datagrid")[0];
                if (grid) {
                    if (grid.haschange)
                        haschange = true;
                }
            });
        }
        return haschange;
    }

    protected setChangeObject(element, change) {
        element.set("changeObject", change);
    }

    protected save(element) {
        var ServerObjekt = element.get("ServerObjekt");
        var forminputs = element.get("inputs");
        var obj = element.get("changeObject") || {};
        var haschange = false;
        var validate = true;

        var savelists = function () {
            if (element.get("hasRelated")) {
                //列表保存
                var tab = document.querySelector("#" + element.get("tabid"));
                var subTabs = tab["getAllTabs"]();
                $(subTabs).each(function () {
                    var grid = $(this).find("gf-datagrid")[0];
                    if (grid) {
                        //处理klass的id
                        if (element.klass == 'Klass' && obj.name) {
                            var extra = grid.getExtraParams("saveList");
                            extra = obj.name + "@Klass," + extra.split(',')[1];
                            grid.setExtraParams("saveList", extra);
                        }
                        grid["saveList"](haschange);
                    }
                });
            }
        };
        if (element.get("hasRelated")) {
            //列表保存
            var tab = document.querySelector("#" + element.get("tabid"));
            var subTabs = tab["getAllTabs"]();
            $(subTabs).each(function () {
                var grid = $(this).find("gf-datagrid")[0];
                if (grid && !grid.endEditRows()) {
                    validate = false;
                }
            });
        }
        //属性校验
        $(forminputs).each(function () {
            if (this.haschange) {
                haschange = true;
                obj[this.propertyname] = this.getValue();
            }
            else {
                delete obj[this.propertyname];
            }
            if (!this.validate()) {
                validate = false;
            }
        });
        if (!haschange && this.getPropertyCount(obj) > 0) {
            haschange = true;
        }
        if (haschange && validate) {
            window["platformAjax"]({
                url: document.body["editurl"],
                data: { id: element.objektid, klass: element.klass, obj: JSON.stringify(obj) },
                success: function (result) {
                    savelists();
                    element.objektid = result.Data;
                    element.load("", false);
                    element.triggerEventHandler("onaftersave");
                }
            });
        }
        else if (validate) {
            savelists();
        }
    }
}

//【页面】
class GfPage extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Page";
        this.autoInit = true;
        this.extends = "body";
        this.addProperty("apppath");
        this.addReadonlyProperties("menuhandleurl,getlistdataurl,getumlurl,checkumlurl,authorizeurl,getnewprivatepermissionurl");
        this.addReadonlyProperties(`getklasstree,listexporturl,listsaveurl,listdataurl,rocviewurl,getobjwithmetaurl,editurl,selectobjekturl,referenceurl,getauthorizationurl`);
        this.addReadonlyProperties(`onchangesaveurl,errorurl,upfileserver,exchangefileurl,trashurl,getobjekturl,getnewobjekturl`);
        this.addMethod("openDialog", `function(option){/*option : id,title,modal,content,href,width,height,onBeforeClose,onClose,onOpen*/
                                        var dialog = document.getElementById(option.id);
                                        if (!dialog){
                                            dialog = document.createElement("Gf-Dialog");
                                            document.body.appendChild(dialog);
                                            dialog.id = option.id;
                                            dialog.modal = option.modal;
                                            if(option.width){
                                                dialog.width = option.width;
                                            }
                                            if(option.height){
                                                dialog.height = option.height;
                                            }
                                            if(option.href){
                                                dialog.href = option.href;
                                            }
                                            dialog.title = option.title;
                                            dialog.init();
                                        }
                                        if(option.onBeforeClose){
                                            dialog.registerEventHandler("onBeforeClose",onBeforeClose);
                                        }
                                        if(option.onClose){
                                            dialog.registerEventHandler("onClose",onClose);
                                        }
                                        if(option.onOpen){
                                            dialog.registerEventHandler("onOpen",onOpen);
                                        }
                                        if(option.content){
                                            dialog.clearContent();
                                            dialog.appendContent(option.content);
                                        }
                                        dialog.open();    
                                        return dialog;                         
        }`);
        this.addMethod("closeDialog", `function(id){
            var dialog = document.getElementById(id);
            if(dialog){
                dialog.close();
            }
        }`)
        this.addMethod("openObjDetail", `function (option) {    /*option : controlid,objid,klass,state,title,oninitLoaded, modal*/
                                            var objektview = document.createElement("Gf-ObjektView");
                                            objektview.objektid = option.objid || "";
                                            objektview.klass = option.klass;
                                            objektview.title = option.title;
                                            objektview.state = option.state;
                                            if(option.onbeforeinit){
                                                objektview.registerEventHandler("onbeforeinit", option.onbeforeinit);
                                            }
                                            if(option.onafterinit){
                                                objektview.registerEventHandler("onafterinit", option.onafterinit);
                                            }
                                            if(option.onaftersave){
                                                objektview.registerEventHandler("onaftersave", option.onaftersave);
                                            }
                                            if(option.oninitLoaded){
                                                objektview.registerEventHandler("oninitLoaded", option.oninitLoaded);
                                            }
                                            this.openDialog({
                                                id : option.controlid + "dialog",
                                                title : option.title,
                                                modal : option.modal,
                                                content : objektview
                                            });
                                            objektview.init();
                                        }`);
        this.addMethod("openTabPage", `function (id, url, title, isiframe) {
                                            var tabs = document.querySelector("#frametabs");
                                            tabs.add(id, title, url, "",isiframe);
                                        }`);
        this.addMethod("openMenu", `function (menu) {
            var element = this;
            window["platformAjax"]({
                url: document.body["menuhandleurl"],
                data: { menuId: menu.id, parentMenuId: menu.parentId },
                success: function(result) {
                    var tabs = document.querySelector("#frametabs");
                    switch(result.HandleType){
                        case 'Url':
                            var url = result.Data;
                            if(result.OpenedMode == 'standalone'){
                                window.open(url,result.Title);
                            }
                            else if(result.ShowMode == "1"){
                                tabs.add(menu.id, result.Title, url, "",result.IsPage);
                            }
                            else if(result.ShowMode == "2" || result.ShowMode == "3"){
                                element.openDialog({
                                    id : menu.id + "dialog",
                                    title : result.Title,
                                    modal : result.ShowMode == "2",
                                    href : url
                                });
                            }
                        break;
                        case 'Content':
                            var content = result.Data;
                            if(result.ShowMode == "1"){
                                tabs.addContent(menu.id,result.Title,content);
                            }
                            else if(result.ShowMode == "2" || result.ShowMode == "3"){
                                element.openDialog({
                                    id : menu.id + "dialog",
                                    title : result.Title,
                                    modal : result.ShowMode == "2",
                                    content : content
                                });
                            }
                        break;
                        case 'Objekt':
                            var objektid = result.Data;
                            if(menu.showMode != "0"){
                                if(menu.showMode == "1"){
                                    var objektview = document.createElement("Gf-ObjektView");
                                    objektview.objektid = objektid;
                                    objektview.title = result.Title;
                                    objektview.state = "read";
                                    tabs.addContent(menu.id, result.Title,objektview);
                                    objektview.init();
                                }
                                else if(menu.showMode == "2" || menu.showMode == "3"){
                                    element.openObjDetail({
                                        controlid : menu.id,
                                        objid : objektid,
                                        title : result.Title
                                    });
                                }
                            }
                        break;
                        case 'Script':
                        eval(result.Data);
                        break;
                    }
                }
            });
        }`);
        this.addMethod("showError", `function (message, detail) {
                                            var page = this;
                                            var div = page.get("errorDiv");
                                            if(!div){
                                                div = document.createElement("div");
                                                page.set("errorDiv",div);
                                                page.appendChild(div);
                                            }
                                            $(div).load(page.errorurl,{message:message,detail:detail});
                                             $(div).dialog({
                                                title: '异常',
                                                width: 800,
                                                height: 500,
                                                closed: true,
                                                cache: false,
                                                modal: false,
                                                resizable: true
                                            });
                                        }`);

        this.addMethod("openUpFileDetail", `function (dirid, dirname, func, fileNumLimit,ext,url) {
                                            var fileOptions = this.getCustomAttr('fileOptions');
                                            var directoryid = dirid || fileOptions.directoryid;
                                            var directoryname = dirname || fileOptions.directoryname;
                                            var callback = func || fileOptions.callback;
                                            var upfileserver = url || this.upfileserver;

                                            var UpFile = this.get("UpFile");
                                            if (!UpFile) {
                                                UpFile = document.createElement("Gf-UpFileDialog");
                                                document.body.appendChild(UpFile);                                                
                                            }
                                            UpFile.title='文件上传';
                                            UpFile.directoryid=directoryid;
                                            UpFile.directoryname=directoryname;
                                            UpFile.upfileserver= upfileserver;
                                            UpFile.fileNumLimit = fileNumLimit || 100;
                                            UpFile.registerEventHandler("onSubmit", callback);
                                            UpFile.ext = ext || "";
                                            this.set("UpFile",UpFile);
                                            UpFile.open();

                                            //this.setCustomAttr('fileOptions',{ directoryid : directoryid,directoryname: directoryname,callback:callback });
                                        }`);
        this.addMethod("tabGoto", `function(url){
            var tabs = document.querySelector("#frametabs");
            tabs.tabGoto(url);
        }`);
        this.addMethod("tabGoback", `function(){
            var tabs = document.querySelector("#frametabs");
            tabs.tabGoback();
        }`);

    }

    protected initContent(element){
        var urls = [
            "getnewprivatepermissionurl",
            "menuhandleurl",
            "getlistdataurl",
            "getumlurl",
            "checkumlurl",
            "authorizeurl",
            "getklasstree",
            "listexporturl",
            "listsaveurl",
            "listdataurl",
            "rocviewurl",
            "getobjwithmetaurl",
            "editurl",
            "selectobjekturl",
            "referenceurl",
            "getauthorizationurl",
            "onchangesaveurl",
            "errorurl",
            "upfileserver",
            "exchangefileurl",
            "trashurl",
            "getobjekturl",
            "getnewobjekturl"
        ];
        $(urls).each(function(){
            var url = $(element).attr(this);
            if(url){
                element.set(this,url);
                $(element).removeAttr(this);
            }
        });
    }

}

//【属性控件基类】
abstract class GfPropertyControl extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.addProperties("name,value,label,description,width,height,objektid,propertyname,filterid");
        this.addboolProperties("required,readonly,autosave,disable");
        this.addProperty("haschange", "{ attribute: {}, get: function()  { return this.xtag.haschange;} }");
        this.addMethod("validate", "function() { return control.validate(this); }");
        this.addMethods("getValue");
        this.addMethod("setValue", "function(value) { control.setValue(this, value); }");
        this.addMethod("setDisplay", "function(display) { $(display).html(this.getValue()); }");
        this.addMethod("resize", "function(width) { }");
        this.addMethod("focus", "function() { }");
        this.emptyValue = '';
    }

    protected emptyValue: any;

    protected validate(element) {
        if (element.required) {
            if (this.valueEquals(element.getValue(), this.emptyValue, element)) {
                this.warning('"' + element.label + '"必填');
                return false;
            }
        }
        return true;
    }

    protected valueEquals(oldValue, newValue, element) {
        return oldValue === newValue;
    }

    protected innerSetValue(element, value) { }

    protected setValue(element, value) {
        var oldValue = element.getValue();

        this.innerSetValue(element, value);
        var newValue = element.getValue();

        if (!this.valueEquals(oldValue, newValue, element)) {
            element.triggerEventHandler("onafterchange", [value, oldValue]);
        }
        else if (element.get("originalValue") === null) {
            element.set("originalValue", value);
        }
    }

    protected create(element) {
        var control = this;
        this.buildStateFrame(element);

        element.set("originalValue", null);
        element.set("haschange", false);

        element.registerEventHandler("onafterinit", function () {
            element.state = element.state || "edit";
            element.setState(element.state);
            if (typeof ($(element).attr("value")) != "undefined") {
                element.setValue(element.value);
            }
            $(element).find("pre").css("font-family", "微软雅黑");
        });

        element.registerEventHandler("onafterchange", function () {
            var originalValue = element.get("originalValue");
            var value = element.getValue();
            if (originalValue === null) {
                element.set("originalValue", value)
            }
            else {
                element.set("haschange", !control.valueEquals(originalValue, value, element));
                if (element.autosave) {
                    control.onChangeSave(element);
                }
            }
            element.setDisplay(element.get("display"));
        });
        $(element).dblclick(function (event) {
            if (element.state == "edit") {
                event.stopPropagation();
            }
        });
        super.create(element);
    }

    protected buildStateFrame(element) {

        var wrapper = document.createElement("span");
        element.set("wrapper", wrapper);
        element.appendChild(wrapper);

        var display = document.createElement("pre");
        $(display).hide();
        element.set("display", display);
        element.appendChild(display);
    }

    protected setState(element, state) {

        if (state == "edit" && !element.readonly) {
            $(element.get("wrapper")).show();
            $(element.get("display")).hide();
        }
        else {
            var display = element.get("display");
            element.setDisplay(display);
            $(display).css("display", "inline");
            $(element.get("wrapper")).hide();
        }
        super.setState(element, state);
    }

    protected hidepre(element) {
        $(element.get("display")).hide();
    }

    protected onChangeSave(element) {
        window["platformAjax"]({
            url: document.body["onchangesaveurl"],
            data: { objektid: element.objektid, propertyname: element.propertyname, value: element.getValue() },
            success: function (result) { }
        });
    }
}

//【文本框】
class GfInput extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Input";
        this.addboolProperties("disabled,diseditable");
        this.methods["disable"] = "function() {   $(this.xtag.input).textbox('disable'); }";
        this.methods["enable"] = "function() {   $(this.xtag.input).textbox('enable'); }";
        this.methods["getValue"] = "function() {  return $(this.xtag.input).textbox('getValue'); }";
        this.methods["resize"] = "function(width) { $(this.xtag.input).textbox('resize',width); }";
        this.methods["setDisplay"] = `function(display) { 
                                            var value = this.getValue();
                                            if(this.propertyname && this.propertyname.toLowerCase() == 'filecontent'){
                                                value = window["htmlEncode"](value);
                                            }
                                            $(display).html(value);
                                        }`;
        this.methods["focus"] = `function() {  $(this.xtag.input).textbox('textbox').focus();  }`;
        this.addMethod("setReadOnly", "function(isReadOnly) {  $(this.xtag.input).textbox('readonly',isReadOnly); }");

    }
    protected innerSetValue(element, value) {
        $(element.xtag.input).textbox('setValue', value);
    }

    protected buildinput(element) {
        var input = document.createElement("input");
        $(input).attr("name", $(element).attr("name"));
        $(input).val(element.value);
        element.set("input", input);
        element.get("wrapper").appendChild(input);
        return input;
    }

    protected initContent(element) {

        var input = this.buildinput(element);
        $(input).textbox({
            width: element.width || 170,
            height: element.height || 26,
            disabled: element.disabled,
            editable: !element.diseditable,
            onChange: function (newValue, oldValue) {
                element.triggerEventHandler("onafterchange", [newValue, oldValue]);
            }
        });
    }
}

//【多行文本框】
class GfText extends GfInput {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Text";
        this.methods["setDisplay"] = `function (display) { $(display).html(control.replaceDisplayWrapMark(this.getValue())); }`;
        this.methods["getValue"] = "function() {  return $(this.xtag.input).textbox('getValue'); }";
    }

    protected innerSetValue(element, value) {
        $(element.xtag.input).textbox('setValue', this.replaceEditWrapMark(value));
    }

    protected replaceDisplayWrapMark(text) {
        var value = this.safeToString(text).replace(new RegExp('\r\n', 'gm'), '<br>');
        value = value.replace(new RegExp('\n', 'gm'), '<br>');
        return value;
    }

    protected replaceEditWrapMark(text) {
        return this.safeToString(text).replace(new RegExp('<br>', 'gm'), '\r\n');
    }

    protected setState(element, state) {
        element.setValue(element.getValue());
        super.setState(element, state);
    }

    protected initContent(element) {
        var input = this.buildinput(element);
        $(input).textbox({
            width: element.width || 550,
            height: element.height || 100,
            multiline: true,
            onChange: function (newValue, oldValue) {
                element.triggerEventHandler("onafterchange", [newValue, oldValue]);
            }
        });
    }
}
//【富文本编辑器】
class GfEditor extends GfInput {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.addProperties("klass,filebrowserBrowseUrl,filebrowserUploadUrl,toolbar,applicationPath,maxlength");
        this.elementName = "Gf-Editor";
        this.methods["setDisplay"] = `function(display) { 
                                            var value = this.getValue();
                                            $(display).html(control.addAppPath(value));
                                        }`;
        this.methods["getValue"] = `function() { 
            var value = '';
            if(CKEDITOR.instances[this.xtag.input.id]){
                CKEDITOR.instances[this.xtag.input.id].updateElement(); 
                value = CKEDITOR.instances[this.xtag.input.id].getData();
            }
            else{
                value = $(this.xtag.input).val();
            }
            return control.removeAppPath(value);
         }`;
        this.addMethod("insertHtml", `function(value){
             control.insertHtml(this,value);
         }`);
    }

    protected addAppPath(value) {
        var text = this.safeToString(value);
        while (text.indexOf('~/file?id=') >= 0) {
            text = text.replace('~/file?id=', document.body["apppath"] + 'file?id=');
        }
        return text;
    }

    protected removeAppPath(value) {
        return this.safeToString(value).replace(new RegExp(document.body["apppath"] + '/file?id=', 'gm'), '~/file?id=');
    }

    protected insertHtml(element, value) {
        CKEDITOR.instances[element.xtag.input.id].insertHtml(value);
    }

    protected innerSetValue(element, value) {
        value = this.addAppPath(value);
        if (CKEDITOR.instances[element.xtag.input.id]) {
            CKEDITOR.instances[element.xtag.input.id].setData(value);
        }
        else {
            $(element.xtag.input).val(value);
        }
    }

    protected setState(element, state) {
        if (state == "edit" && !element.get("editor")) {
            var input = element.get("input");
            var config = {
                toolbar: element.toolbar || 'Full',
                filebrowserBrowseUrl: element.filebrowserBrowseUrl || "",
                filebrowserUploadUrl: element.filebrowserUploadUrl || element.applicationPath + "/CkEditor/CkeditorUpload",
                width: element.width || 200,
                height: element.height || 150,
                toolbarLocation: element.toolbar == 'None' ? 'none' : 'top',
                resize_enabled: element.toolbar != 'None'
            };

            CKEDITOR.replace(input.id, config);

            var editor = CKEDITOR.instances[input.id];
            editor.setData($(input).val());

            editor.on('change', function (evt) {
                $(input).val(editor.getData());
                element.triggerEventHandler("onafterchange");
            });
            if (element.maxlength) {
                var maxlength = parseInt(element.maxlength);
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
            element.xtag.editor = editor;
        }
        super.setState(element, state);
    }

    protected create(element) {
        var control = this;
        element.registerEventHandler("onbeforeinit", function () {
            if (typeof CKEDITOR === "undefined") {
                control.includeJS(document.body["apppath"] + "/Platform/Content/Scripts/ckeditor/ckeditor.js");
            }
        });
        super.create(element);
    }
    protected initContent(element) {
        element.applicationPath = document.body["apppath"];
        var input = this.buildinput(element);
        input.id = this.GetUniqueId("Editor");
    }
}
//【源代码编辑器】
class GfAceEditor extends GfPropertyControl {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-AceEditor";
        this.methods["getValue"] = `function() {  
            var editor = this.get("aceeditor");
            if(editor)
                return editor.getValue(); 
            else
                return "";
        }`;
        this.methods["setDisplay"] = `function(display) { 

                                        }`;
    }

    protected innerSetValue(element, value) {
        if (element.get("aceeditor")) {
        }
        else {
        }
    }

    protected initContent(element) {

        var div = document.createElement("div");
        $(div).css("height", 604);
        $(div).css("background-color", "#8B8682");
        element.appendChild(div);

        var pre = document.createElement("pre");
        pre.id = this.GetUniqueId("AceEditor");
        $(pre).attr("name", $(element).attr("name"));
        $(pre).css("height", 600);
        $(pre).css("margin", 2);
        $(pre).css("top", 2);
        $(pre).css("bottom", 0);
        $(pre).css("left", 0);
        $(pre).css("right", 0);
        pre.innerHTML = window["htmlEncode"](element.value);
        div.appendChild(pre);
        element.set("pre", pre);

        if (!element.get("aceeditor")) {
            window["require"]("ace/ext/old_ie");
            var editor = window["ace"].edit(pre.id);
            editor.setTheme("ace/theme/textmate");
            editor.session.setMode("ace/mode/javascript");
            editor.resize();
            element.set("aceeditor", editor);
            editor.getSession().on('change', function (e) {
                element.triggerEventHandler("onafterchange", ["", editor.getValue()]);
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

    protected setState(element, state) {
        if (state == "edit") {
            element.get("aceeditor").setReadOnly(false);
        } else {
            element.get("aceeditor").setReadOnly(true);
        }
        super.setState(element, state);
        super.hidepre(element);
    }

    protected create(element) {
        var control = this;
        element.registerEventHandler("onbeforeinit", function () {
            if (window["require"] === undefined) {
                control.includeJS(document.body["apppath"] + "Platform/Content/Scripts/aceeditor/ace.js");
                control.includeJS(document.body["apppath"] + `Platform/Content/Scripts/aceeditor/ext-old_ie.js`);
            }
        });
        super.create(element);
    }
}

//【密文输入框】
class GfEncryptionInput extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-EncryptionInput";
        this.addboolProperties("disabled,diseditable");
        this.methods["disable"] = "function() {   $(this.xtag.passwordbox).passwordbox('disable'); }";
        this.methods["enable"] = "function() {   $(this.xtag.passwordbox).passwordbox('enable'); }";
        this.methods["getValue"] = "function() {  return $(this.xtag.input).val(); }";
        this.methods["resize"] = "function(width) { $(this.xtag.passwordbox).passwordbox('resize',width); }";
        this.methods["setDisplay"] = `function(display) { 
                                            $(display).html('******');
                                        }`;
        this.methods["focus"] = `function() { $(this).find(".textbox-text").focus();  }`;
        this.addMethod("setReadOnly", "function(isReadOnly) {  $(this.xtag.passwordbox).passwordbox('readonly',isReadOnly); }");

    }
    protected innerSetValue(element, value) {
        $(element.xtag.input).val(value);
        $(element.get("passwordbox")).passwordbox('setValue', value);
    }

    protected buildinput(element) {
        var input = document.createElement("input");
        $(input).attr("name", $(element).attr("name"));
        $(input).val(element.value);
        $(input).hide();
        element.set("input", input);
        element.get("wrapper").appendChild(input);

        var passwordbox = document.createElement("input");
        element.set("passwordbox", passwordbox);
        element.get("wrapper").appendChild(passwordbox);

        return passwordbox;
    }

    protected initContent(element) {

        var passwordbox = this.buildinput(element);
        passwordbox.id = this.GetUniqueId("passwordbox");
        element.set("passwordbox", passwordbox);
        $(passwordbox).passwordbox({
            showEye: false,
            passwordChar: '•',
            width: element.width || 170,
            height: element.height || 26,
            disabled: element.disabled,
            editable: !element.diseditable,
            onChange: function (newValue, oldValue) {
            }
        });
        var realInput = $(element).find(".textbox-prompt");
        realInput.focus(function () {
            $(passwordbox).passwordbox('setValue', '');
        });
        realInput.blur(function () {
            var newValue = $(passwordbox).passwordbox('getValue');
            var oldValue = element.getValue();
            if (newValue != '') {
                element.setValue(newValue);
                element.triggerEventHandler("onafterchange", [newValue, oldValue]);
            }
            else {
                $(passwordbox).passwordbox('setValue', oldValue);
            }
        });
    }
}

//【小数输入框】
class GfNumberInput extends GfInput {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-NumberInput";
        this.addProperties("min,max,prec,scale");

        this.defaultMaxValue = 9007199254740992;
        this.defaultMinValue = -9007199254740992;
        this.defaultPrecision = 16;
        this.defaultScale = 8;
    }
    //最大值
    protected defaultMaxValue: number;
    //最小值
    protected defaultMinValue: number;
    //整数位数
    protected defaultPrecision: number;
    //小数位数
    protected defaultScale: number;

    protected valueEquals(oldValue, newValue, element) {
        if (!oldValue && !newValue) {
            return true;
        }
        return parseFloat(oldValue) == parseFloat(newValue);
    }

    protected getValueRange(element) {

        //整数位数允许的最大值
        var precisionMax = 1;
        //小数位数决定的小数点后的部分
        var scaleMin = "";

        var precision = Math.min(parseInt(element.prec || this.defaultPrecision), this.defaultPrecision);
        if (precision > 0) {
            for (var i = 0; i < precision; i++) {
                precisionMax = precisionMax * 10;
            }
        }
        var scale = Math.min(parseInt(element.scale || this.defaultScale), this.defaultScale);
        if (scale > 0) {
            scaleMin += ".";
            for (var i = 0; i < scale; i++) {
                scaleMin += "9";
            }
        }

        var precisionMax = parseFloat((precisionMax - 1).toString() + scaleMin);

        var max = Math.min(precisionMax, parseInt(element.max || this.defaultMaxValue), this.defaultMaxValue);

        var min = Math.max(0 - precisionMax, parseInt(element.min || this.defaultMinValue), this.defaultMinValue);
        return { max: max, min: min };
    }

    protected initContent(element) {

        var range = this.getValueRange(element);

        var scale = Math.min(parseInt(element.scale || this.defaultScale), this.defaultScale);
        var input = this.buildinput(element);
        $(input).numberbox({
            min: range.min,
            max: range.max,
            width: element.width || 170,
            height: element.height || 26,
            precision: scale,
            onChange: function (value) {
                element.triggerEventHandler("onafterchange");
            }
        });
    }
}

//【大整数输入框】
class GfBigIntInput extends GfNumberInput {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-BigIntInput";
        this.defaultScale = 0;
    }

    protected valueEquals(oldValue, newValue, element) {
        if (!oldValue && !newValue) {
            return true;
        }
        return parseInt(oldValue) == parseInt(newValue);
    }
}

//【整数输入框】
class GfIntInput extends GfBigIntInput {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-IntInput";

        this.defaultMaxValue = 2147483647;
        this.defaultMinValue = -2147483648;
        this.defaultPrecision = 10;
    }

}

//【日期选择】
class GfDatePicker extends GfInput {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-DatePicker";
    }

    protected initContent(element) {
        var input = this.buildinput(element);
        $(input).datebox({
            width: element.width || 170,
            height: element.height || 26,
            editable: true,
            formatter: function (date) { return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(); },
            parser: function (s) {
                var t = Date.parse(s);
                if (!isNaN(t)) {
                    return new Date(t);
                } else {
                    return new Date();
                }
            },
            onChange: function (value) {
                element.triggerEventHandler("onafterchange", [value]);
            }
        });
    }
}

//【日期时间选择】
class GfDateTimePicker extends GfDatePicker {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-DateTimePicker";

    }
    protected initContent(element) {
        var input = this.buildinput(element);
        $(input).datetimebox({
            width: element.width || 170,
            height: element.height || 26,
            editable: true,
            formatter: function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mi = date.getMinutes();
                var s = date.getSeconds();
                function formatNumber(value) {
                    return (value < 10 ? '0' : '') + value;
                }
                return y + '/' + m + '/' + d + ' ' + formatNumber(h) + ':' + formatNumber(mi) + ':' + formatNumber(s);
            },
            parser: function (s) {
                var t = Date.parse(s);
                if (!isNaN(t)) {
                    return new Date(t);
                } else {
                    return new Date();
                }
            },
            onChange: function (value) {
                element.triggerEventHandler("onafterchange", [value]);
            }
        });
        var name = this.elementName;
    }
}

//【时间选择】
class GfTimePicker extends GfInput {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-TimePicker";
    }

    protected initContent(element) {
        var input = this.buildinput(element);
        $(input).timespinner({
            width: element.width || 170,
            height: element.height || 26,
            showSeconds: true,
            onChange: function (value) {
                element.triggerEventHandler("onafterchange", [value]);
            }
        });
    }
}

//【布尔选择】
class GfToggle extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Toggle";
        this.addProperty("checked", "{ attribute: {}, get: function()  { return $(this.xtag.input).attr('checked') == 'checked';}, set: function(val)  { this.setValue(val); } }");
        this.methods["disable"] = "function() {   $(this.xtag.input).attr('disabled','disabled'); }";
        this.methods["enable"] = "function() {   $(this.xtag.input).removeAttr('disabled'); }";
        this.methods["getValue"] = `function() {   return $(this.xtag.hiddenValue).val().toLowerCase() == "true";}`;
        this.methods["setDisplay"] = `function(display) { $(display).html(this.getValue() ? "√" : ""); }`;
    }


    protected innerSetValue(element, value) {
        $(element.xtag.input).prop('checked', (value && value.toString().toLowerCase() == 'true'));
        $(element.xtag.hiddenValue).val(value);
    }

    protected initContent(element) {
        var wrapper = element.get("wrapper");
        var display = element.get("display");

        var input = document.createElement("input");
        var hiddenValue = document.createElement("input");
        $(input).attr("name", $(element).attr("name"));
        $(input).attr("type", "checkbox");
        var value = $(element).attr("value");
        if (value && value.toString().toLowerCase() == "true") {
            $(input).attr("checked", "checked");
        }
        $(input).val(value);
        $(input).change(function () {
            if ($(input).prop('checked')) {
                $(hiddenValue).val("true");
            }
            else {
                $(hiddenValue).val("false");
            }
            element.triggerEventHandler("onafterchange");

        });
        $(hiddenValue).attr("name", $(element).attr("name"));
        $(hiddenValue).attr("type", "hidden");
        $(hiddenValue).val("false");

        wrapper.appendChild(hiddenValue);
        wrapper.appendChild(input);
        element.xtag.input = input;
        element.xtag.hiddenValue = hiddenValue;
    }
}

//【表格】
class GfDataGrid extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-DataGrid";
        this.autoInit = true;
        this.addProperties("hidetools,loadmsg,title,width,height,klass,idfield,namefield,orderby,dataurl,saveurl,exporturl,newrowurl,relatedcolumns,filter");
        this.addboolProperties("autoselect,singleselect,showquery,forbidUpdateTip,pagination,isasc,trashstation,forbidedit,hassubklass");
        this.addProperty("toolbar", "{ attribute: {}, get: function()  { return this.xtag.toolbar;} }");
        this.addProperty("haschange", "{ attribute: {}, get: function()  { return this.xtag.haschange;} }");
        this.addMethod("beginEditRow", `function(index) { 
                                            if(this.endEditRows(index)){
                                                $(this.xtag.table).datagrid('beginEdit', index); 
                                                control.restoreSelection(this);
                                                this.xtag.haschange = true;
                                            }
                                        }`);
        this.addMethod("endEditRow", "function(index) { $(this.xtag.table).datagrid('endEdit', index);}");
        this.addMethod("endEditRows", `function(index)  {  
                                            var validate = true;
                                            var element = this;
                                            var rows = this.getRows();
                                            for(var key in rows){
                                                var row = rows[key];
                                                var rowindex = this.getRowIndex(row);
                                                if(index != rowindex){
                                                    if(control.validate(element,rowindex)){
                                                        this.endEditRow(rowindex);
                                                    }
                                                    else{
                                                        validate = false;
                                                    }
                                                }
                                            }
                                            return validate;
                                        }`);
        this.addMethod("refreshRow", "function(index) { $(this.xtag.table).datagrid('refreshRow', index);}");
        this.addMethod("selectRow", "function(index) { $(this.xtag.table).datagrid('selectRow', index);}");
        this.addMethod("unSelectRow", "function(index) { $(this.xtag.table).datagrid('unselectRow', index);}");
        this.addMethod("unSelectRows", `function(index) {  
                                            var rows = this.getRows();
                                            for(var key in rows){
                                                var row = rows[key];
                                                var rowindex = this.getRowIndex(row);
                                                if(index != rowindex)
                                                    this.unSelectRow(rowindex);
                                            } 
                                        }`);
        this.addMethod("getPager", "function() { return $(this.xtag.table).datagrid('getPager'); }");
        this.addMethod("getRows", "function() { return $(this.xtag.table).datagrid('getRows'); }");
        this.addMethod("getSelectedRow", "function() { return $(this.xtag.table).datagrid('getSelected'); }");
        this.addMethod("getSelectedRows", "function() { return $(this.xtag.table).datagrid('getSelections'); }");
        this.addMethod("getRowIndex", "function(row) { return $(this.xtag.table).datagrid('getRowIndex',row); }");
        this.addMethod("cancelEditRow", "function(index) { $(this.xtag.table).datagrid('cancelEdit', index);}");
        this.addMethod("cancelEditRows", `function(index) {  
                                            var rows = this.getRows();
                                            for(var key in rows){
                                                var row = rows[key];
                                                if(row.editing){
                                                    var rowindex = this.getRowIndex(row);
                                                    if(index != rowindex)
                                                        this.cancelEditRow(rowindex);
                                                } 
                                            } 
                                        }`);
        this.addMethod("select", "function(index) {  $(this.xtag.pager).pagination('select',index); }");
        this.addMethod("loadData", "function(data) { $(this.xtag.table).datagrid('loadData',data); this.restoreQueryState();}");
        this.addMethod("loading", "function() { $(this.xtag.table).datagrid('loading'); }");
        this.addMethod("loaded", "function() { $(this.xtag.table).datagrid('loaded'); }");
        this.addMethod("reload", `function() { 
                                        if(this.xtag.currentPage && this.xtag.currentRows)
                                        this.loadDataPage(this.xtag.currentPage, this.xtag.currentRows);
                                    }`);
        this.addMethod("reloadstatic", `function() { this.loadData(this.getData()); }`);
        this.addMethod("getData", "function() { return $(this.xtag.table).datagrid('getData'); }");
        this.addMethod("getOptions", "function() { return $(this.xtag.table).datagrid('options'); }");
        this.addMethod("loadDataPage", `function(page, rows) {
                                            var grid = this;
                                            if(page < 1) page = 1;
                                            grid.loading();
                                            this.xtag.currentPage = page;
                                            this.xtag.currentRows = rows;
                                            
                                            var orderby = this.get("orderby");
                                            var isAsc = this.get("isAsc");
                                            var param = this.xtag.params ? this.xtag.params.concat(this.xtag.outParams) : this.xtag.outParams;
                                            
                                            var data = { page:page, rows:rows, param:param.concat([{ field:"isTrash", type : "=", value : grid.trashstation }]), klass : grid.klass, IncludeSubKlass: grid.hassubklass};
                                            if(grid.relatedcolumns){
                                                data["relatedcolumns"] = grid.relatedcolumns;
                                            }
                                            if(grid.filter){
                                                data["filter"] = grid.filter;
                                            }
                                            if(orderby){
                                                data.orderby = orderby;
                                                data.isAsc = isAsc;
                                            }
                                            platformAjax({
                                                url: grid.dataurl || document.body.listdataurl,
                                                data: data,
                                                success: function(result) {
                                                    var data = control.stringToObject(result.Data);
                                                    $(data.rows).each(function(){
                                                        this.customRowId = control.GetUniqueId("row");
                                                    });
                                                    if(!grid.pagination){
                                                        var pageList = new Array();
                                                        pageList.push(data.rows.length);
                                                        $(grid.xtag.pager).pagination({
                                                            pageSize: data.rows.length,
                                                            pageList: pageList
                                                        }); 
                                                        data.total = data.rows.length;
                                                        grid.xtag.currentPage = 1;
                                                        grid.xtag.currentRows = data.rows.length;
                                                    }
                                                    grid.xtag.data = JSON.stringify(data.rows); 
                                                    grid.loadData(data);
                                                    grid.set('haschange', false);
                                                    grid.set('changes', {});
                                                },
                                                finallyCall: function(result) {
                                                    grid.loaded();
                                                    grid.set("loaded", true);
                                                    control.setSelectedTip(grid);
                                                }
                                            });
                                        }`);
        this.addMethod("restoreQueryState", `function() {
                                            var columns = this.xtag.columns[0];
                                            $(columns).each(function() {
                                                if(!this.hidden && this.param){
                                                    this.query.setValue(this.param);
                                                }
                                            });
                                        }`);
        this.addMethod("queryData", `function(outParams) {
                                            if(outParams){
                                                this.set("outParams",outParams);
                                            }
                                            var params = new Array();
                                            var columns = this.xtag.columns[0];
                                            $(columns).each(function() {
                                                if(!this.hidden && this.query){
                                                    var param = this.query["getValue"]();
                                                    if(param){
                                                        params.push(param);
                                                    }
                                                    this.param = param;
                                                }
                                            });
                                            this.xtag.params = params;
                                            this.select(1);
                                            
                                        }`);
        this.addMethod("deleteRow", `function(row) {
                                        var index = this.getRowIndex(row);
                                        $(this.xtag.table).datagrid('deleteRow', index);
                                     }`);
        this.addMethod("insertRow", `function(obj) {  $(this.xtag.table).datagrid('insertRow', obj);  }`);
        this.addMethod("exportExcel", `function() {
                                            var grid = this;
                                            var param = this.xtag.params ? JSON.stringify(this.xtag.params) : "";
                                            platformAjax({
                                                url: grid.exporturl || document.body.listexporturl,
                                                data : {param : param, klass : grid.klass},
                                                success: function (result) {
                                                    $(result.Data).table2excel({
                                                        exclude: ".noExl",
                                                        name: grid.klass,
                                                        filename: grid.klass
                                                    });
                                                }
                                            });
                                        }`);
        this.addMethod("toggleQuery", `function(isShow) { 
                                        this.showquery = isShow;
                                        var clear = this.xtag.clear;
                                        var array = this.xtag.columns[0];
                                        var heightAdjust = 0;
                                        var headerHeight = $(this).find(".datagrid-header").height();
                                        var bodyHeight = $(this).find(".datagrid-body").height();
                                        if(isShow) {
                                           headerHeight += 24;
                                           bodyHeight -= 24;
                                        } 
                                        else {
                                           headerHeight -= 24;
                                           bodyHeight += 24;
                                        } 
                                        $(this).find(".datagrid-header").css("height",headerHeight);
                                        $(this).find(".datagrid-header").find(".datagrid-htable").css("height",headerHeight); 
                                        $(this).find(".datagrid-body").css("height",bodyHeight);

                                        $(array).each(function() {
                                            if(!this.hidden){
                                                var query = this.query;
                                                if(isShow){ 
                                                    $(query).show(); 
                                                    $(clear).show(); 
                                                }
                                                else{ 
                                                    $(query).hide();
                                                    $(clear).hide();
                                                }
                                            }
                                        });
                                    }`);
        this.addMethod("saveList", `function(forbidReload) {
                                            var grid = this;
                                            if(!grid.xtag.haschange){
                                                return;
                                            }
                                            if (!grid.endEditRows()) {
                                                return;
                                            }
                                            grid.loading();
                                            var changes = JSON.stringify(grid.xtag.changes);
                                            platformAjax({
                                                url: grid.saveurl || document.body.listsaveurl,
                                                data: {changes: changes, klass: grid.klass, extraParams : grid.getExtraParams("saveList")},
                                                success: function(result) {
                                                    if(!forbidReload)
                                                        grid.reload();
                                                },
                                                finallyCall: function(result) {
                                                    grid.loaded();
                                                    grid.triggerEventHandler("onafterSaveList");
                                                }
                                            });
                                        }`);
        this.addMethod("getCellValue", `function(rowid, field) { 
                                            var rows = JSON.parse(this.xtag.data); 
                                            var value = "";
                                            $.map(rows,function(row,i){
                                                if(row.customRowId == rowid){
                                                    value = row[field];
                                                }
                                            });
                                            return value;
                                        }`);
        this.addMethod("setTrash", `function(objektIds, isTrash) { 
                                            var grid = this;
                                            grid.loading();
                                            platformAjax({
                                                url: document.body.trashurl,
                                                data: {objektIds: objektIds, isTrash : isTrash},
                                                success: function(result) {
                                                    grid.reload();
                                                },
                                                finallyCall: function(result) {
                                                    grid.loaded();
                                                }
                                            });
                                        }`);
        this.addMethod("addNewRow", `function(row) { 
                                            if(!row){
                                                row = control.getNewRow(this);
                                            }
                                            row['customRowId'] = control.GetUniqueId('row');
                                            row['customRowState'] = 'inserted';
                                            var rows = JSON.parse(this.xtag.data); 
                                            rows.push(row);
                                            this.set("data",JSON.stringify(rows));
                                            this.insertRow({ index: 0, row: row });
                                            control.refreshRowIndex(this);
                                            this.selectRow(0);
                                            this.unSelectRows(0);
                                            this.beginEditRow(0);
                                            this.triggerEventHandler("onAddRow",[row]);
                                        }`);
        this.addMethod("updateRow", `function(row,select){ 
                                            var index = this.getRowIndex(row);
                                            var rows = JSON.parse(this.get("data"));
                                            rows = removeObjFromArray(rows,'customRowId',row.customRowId);
                                            rows.push(row);
                                            this.set("data",JSON.stringify(rows));
                                            $(this.get("table")).datagrid('updateRow',{ 
                                                index: index,
                                                row : row
                                             });
                                            this.refreshRow(index);
                                            if(select){
                                                this.selectRow(index);
                                                control.restoreSelection(this);
                                            }
                                        }`);
        this.addMethod("recordChange", "function(row, field, value) { control.recordChange(this, row, field, value); }");



        this.extendEditors(`Gf-Toggle,Gf-DateTimePicker,Gf-DatePicker,Gf-TimePicker,Gf-IntInput,Gf-BigIntInput,Gf-NumberInput,Gf-Input,Gf-Text,Gf-ObjectSelector,Gf-DropDownList,Gf-ColorPicker,Gf-EncryptionInput`);
    }

    protected removeChange(element, row, field, value) {
        if (field == element.idfield) {
            return;
        }
        var control = this;
        var exceptions = [element.idfield, "customRowId", "customRowState"];
        var changes = element.get("changes");
        var changedrow = changes[row.customRowId];
        if (changedrow) {
            delete changedrow[field];
            if (control.getPropertyCount(changedrow, exceptions) == 0) {
                delete changes[row.customRowId];
            }
        }
        if (control.getPropertyCount(changes) == 0) {
            element.set("haschange", false);
        }
        element.set("changes", changes);
    }

    protected recordChange(element, row, field, value) {
        var changes = element.get("changes");
        if (changes[row.customRowId]) {
            changes[row.customRowId][field] = value;
        }
        else {
            var newChange = {};
            if (row[element.idfield]) {
                newChange[element.idfield] = row[element.idfield];
                newChange["customRowState"] = row["customRowState"] || "updated";
            }
            else {
                newChange["customRowState"] = row["customRowState"] || "inserted";
            }
            newChange["customRowId"] = row.customRowId;
            newChange[field] = value;
            changes[row.customRowId] = newChange;
        }
        element.set("haschange", true);
        element.set("changes", changes);
    }

    protected recordDelete(element, row) {
        var changes = element.get("changes");
        var changedrow = changes[row.customRowId];
        if (changedrow) {
            if (changedrow["customRowState"] == "inserted") {
                delete changes[row.customRowId];
            }
            else {
                changedrow["customRowState"] = "deleted";
            }
        }
        else {
            if (row[element.idfield]) {
                var newChange = {};
                newChange[element.idfield] = row[element.idfield];
                newChange["customRowState"] = "deleted";
                newChange["customRowId"] = row.customRowId;
                changes[row.customRowId] = newChange;
                element.set("haschange", true);
            }
        }
        element.set("changes", changes);
    }

    protected fieldChanged(element, row, field) {
        var changes = element.get("changes");
        var change = changes[row.customRowId];
        if (change) {
            return !(change[field] == null);
        }
        else {
            return false;
        }

    }

    protected buildColums(element) {

        var control = this;
        var columns = element.getElementsByTagName("Gf-Column");
        var value = "[[";
        var arr = new Array();
        for (var i = 0; i < columns.length; i++) {
            var obj = columns[i];
            var hidden = control.safeToString($(obj).attr("ishidden")).toLowerCase() == 'true';
            var column = {
                id: this.GetUniqueId("column" + i),
                field: $(obj).attr("field"),
                datatype: $(obj).attr("datatype"),
                label: $(obj).attr("title"),
                title: $(obj).attr("title"),
                description: $(obj).attr("description"),
                hidden: hidden,
                width: (parseInt($(obj).attr("width")) || 180),
                align: ($(obj).attr("align") || 'left'),
                editor: ($(obj).attr("editor") && !hidden) ? this.stringToObject($(obj).attr("editor")) : "",
                styler: function (value, row, index) { },
                forbidquery: obj.forbidquery,
                isRequired: control.safeToString($(obj).attr("isRequired")).toLowerCase() == 'true',
                sortable: control.safeToString($(obj).attr("sortable")).toLowerCase() == 'true',
                isreadonly: control.safeToString($(obj).attr("isreadonly")).toLowerCase() == 'true',
                iscolor: control.safeToString($(obj).attr("iscolor")).toLowerCase() == 'true',
                formatter: obj.formatter,
                query: {},
                param: {}
            };
            column["formatter"] = this.getColumnFormatter(element, column);

            if (!column.hidden) {
                var query = this.createQueryEditor(column, element);
                column.title = "<div id='" + column.id + "div' title='" + column.description + "' style=' padding:5px;display:inline-block;'>" + (column.isRequired ? "*" : "") + column.label + "</div>";
                column.query = query;
                query["resize"](column.width);

                (function (col) {
                    col.styler = function (value, row, index) {
                        var data = element.getCellValue(row.customRowId, col.field);
                        obj;
                        var isEqual = true;
                        var dataid;
                        var objid;
                        var cls = '';
                        var style = '';
                        if (col.isreadonly && element.state == 'edit') {
                            cls = 'ReadonlyColumn';
                        }
                        if (col.datatype == 'list') {
                            if (value && value.color) {
                                style = 'background-color:#' + value.color;
                            }
                        }
                        if (col.datatype == 'objekt') {
                            var obj = value;
                            if (col.field == element.idfield) {
                                dataid = data;
                                objid = value;
                            }
                            else if (control.isString(value)) {
                                objid = JSON.parse(value)[element.idfield];
                                dataid = data ? data[element.idfield] : "";
                            }
                            else {
                                objid = obj ? obj[element.idfield] : "";
                                dataid = data ? data[element.idfield] : "";
                            }

                            isEqual = dataid == objid;
                        }
                        else {
                            var formatValue = value;
                            var formatData = data;
                            if (col.formatter) {
                                formatData = col.formatter(data, row, index);
                                formatValue = col.formatter(value, row, index);
                            }
                            formatValue = formatValue ? formatValue : "";
                            if (formatData === null || formatData === undefined)
                                formatData = "";
                            isEqual = formatValue == formatData
                        }

                        if (isEqual) {
                            control.removeChange(element, row, col.field, value);
                        }
                        else {
                            control.recordChange(element, row, col.field, value);
                            cls += ' editflag';
                        }

                        return { class: cls, style: style };
                    };
                })(column);

            }
            arr.push(column);
        }
        var arrs = new Array();
        arrs.push(arr);
        element.xtag.columns = arrs;

        var frozenColums = new Array();
        var subarray = new Array();
        var check = this.buildCheckColumn(element);
        subarray.push(check);
        frozenColums.push(subarray);
        element.xtag.frozenColums = frozenColums

        return arrs;
    }

    protected buildRowNumberHeader(element) {
        var clear = document.createElement("a");
        $(clear).attr("href", "javascript:void(0);");
        $(clear).attr("title", "清除所有条件");
        $(clear).addClass("fa fa-times iconfont");
        $(clear).css("font-size", "16px");
        $(clear).click(function () {
            var columns = element.xtag.columns[0];
            $(columns).each(function () {
                if (!this.hidden && this.query)
                    this.query.clear();
            });
            element.queryData();
        });
        $(clear).hide();
        element.xtag.clear = clear;

        var div = document.createElement("div");
        $(div).html("No.<br />");
        div.id = "rownumber-header";
        div.appendChild(clear);
        $(element).find(".datagrid-header-rownumber").css("height", "auto").append(div);
    }

    protected buildCheckColumn(element) {
        var checkid = this.GetUniqueId("check");
        element.set("checkid", checkid);

        if (element.singleselect) {
            return {
                field: 'checkcolumn', title: '', width: 30,
                formatter: function (value, row, rowIndex) {
                    return "<input type=\"radio\"  name=\"" + checkid + "\" rowIndex=\"" + rowIndex + "\" id=\"" + checkid + "-" + rowIndex + "\" >";
                }
            };
        }
        else {
            return {
                field: 'checkcolumn', title: '<input id=\"' + checkid + '\" type=\"checkbox\"  >', width: 30,
                formatter: function (value, row, rowIndex) {
                    return "<input type=\"checkbox\"  name=\"" + checkid + "\" rowIndex=\"" + rowIndex + "\" id=\"" + checkid + "-" + rowIndex + "\" >";
                }
            };
        }
    }

    protected createQueryEditor(column, element) {
        var query = document.createElement("Gf-QueryCondition");
        query["field"] = column.field;
        query["datatype"] = column.datatype;
        query["ignorecase"] = true;
        if (column.datatype == 'list') {
            var options = column.editor.options;
            query["listdefaultoption"] = options.defaultoption;
            query["listdata"] = options.data;
            query["listtextfield"] = options.textfield;
            query["listvaluefield"] = options.valuefield;
        }
        $(query).ready(function () {
            query["registerEventHandler"]("onafterchange", function () { element.queryData(); });
            if (!element.showquery) {
                $(query).hide();
            }
        });
        query["init"]();
        return query;
    }

    protected buildToolbar(element) {
        var control = this;

        var edit = this.createLinkbutton("编辑", "fa fa-pencil-square-o", function () {
            control.setState(element, "edit");
        }, { whenToShow: ",read"});

        var read = this.createLinkbutton("浏览", "fa fa-square-o", function () {
            control.setState(element, "read");
        }, {whenToShow: ",edit"});

        var open = this.createLinkbutton("打开", "fa fa-folder-open-o", function () {
            var rows = element.getSelectedRows();
            if (rows) {
                $(rows).each(function () {
                    var row = this;
                    var index = element.getRowIndex(row);
                    element.endEditRow(index);
                    $("#" + element.get("checkid") + "-" + index).prop("checked", true);

                    //对象详情加载后事件
                    var func = function () {
                        this.overrideEventHandler("onaftersave", function () {
                            element.reload();
                        });
                        var changes = element.get("changes");
                        if (changes && changes[row.customRowId]) {
                            var change = window["clone"](changes[row.customRowId]);
                            delete change[element.idfield];
                            delete change["customRowState"];
                            delete change["customRowId"];
                            this.setChangeObject(change);
                        }
                    };
                    var id = row[element.idfield];
                    var title = row["combinedtitle"];
                    if (id) {
                        document.body["openObjDetail"]({
                            controlid: row.customRowId,
                            objid: id,
                            klass: element.klass,
                            title: title,
                            onbeforeinit: func
                        });
                    }
                });
            }
        }, { whenToShow: "singleSelect" });

        var add = this.createLinkbutton("新建", "fa fa-plus", function () {
            element.addNewRow();
        }, {whenToShow: ",edit"});

        var del = this.createLinkbutton("删除", "fa fa-minus", function () {
            var rows = element.getSelectedRows();
            if (rows) {
                $(rows).each(function () {
                    element.deleteRow(this);
                    control.recordDelete(element, this);
                });
            }
            control.refreshRowIndex(element);
            control.setToolbarPermission(element);
        }, { whenToShow: "select,edit" });

        var save = this.createLinkbutton("保存", "fa fa-floppy-o", function () {
            element.saveList();
        }, {whenToShow: ",edit"});

        var refresh = this.createLinkbutton("刷新", "fa fa-refresh", function () {
            element.reload();
        }, {});

        var subclass = this.createLinkbutton("包含子类", "fa fa-sitemap", function () {
            element.hassubklass = !element.hassubklass;
            element.select(1);
        }, {});

        var query = this.createLinkbutton("查询", "fa fa-search", function () {
            element.toggleQuery(!element.showquery);
        }, {});

        var exporter = this.createLinkbutton("导出", "fa fa-file-excel-o", function () {
            element.exportExcel();
        }, {});

        var idshower = this.createLinkbutton("查看ID", "fa fa-id-card-o", function () {
            var rows = element.getSelectedRows();
            if (rows && rows.length > 0) {
                var ids = '<div style="padding:15px;">';
                $(rows).each(function () {
                    ids += '<p>"' + this['combinedtitle'] + '"的ID： ' + this[element.idfield] + '</p>';
                });
                ids += "</div>";
                document.body["openDialog"]({
                    id: element.id + "-CheckID",
                    width: 500,
                    height: 200,
                    title: '查看ID',
                    content: ids
                });
            }
        }, { whenToShow: "select" });

        var reference = this.createLinkbutton("查看引用", "fa fa-arrow-left", function () {
            var rows = element.getSelectedRows();
            $(rows).each(function () {
                var id = this[element.idfield];
                var name = this["combinedtitle"];
                document.body["openDialog"]({
                    id: id,
                    width: 800,
                    title: '引用“' + name + '”的对象',
                    href: document.body["referenceurl"] + "?id=" + id
                });
            });
        }, { whenToShow: "singleSelect" });

        var trash = this.createLinkbutton("回收", "fa fa-trash-o", function () {
            var rows = element.getSelectedRows();
            if (rows.length > 0) {
                control.confirm("是否确认回收？", function () {
                    var ids = "";
                    $(rows).each(function () {
                        ids += this[element.idfield] + ",";
                    });
                    element.setTrash(ids, true);
                });
            }
        }, { whenToShow: "select" });

        var untrash = this.createLinkbutton("还原", "fa fa-recycle", function () {
            var rows = element.getSelectedRows();
            if (rows) {
                var ids = "";
                $(rows).each(function () {
                    ids += this[element.idfield] + ",";
                });
                element.setTrash(ids, false);
            }
        }, { whenToShow: "select" });

        var uml = this.createLinkbutton("UML", "fa fa-retweet", function () {
            var rows = element.getSelectedRows();
            if (rows) {
                var ids = '';
                $(rows).each(function () {
                    ids += this[element.idfield];
                    ids += ',';
                });
                var umlParam = document.createElement("Gf-UmlParams");
                umlParam["ids"] = ids;
                umlParam["init"]();
                umlParam["open"]();
            }
        }, { whenToShow: "select" });

        var permission = document.createElement("Gf-Authorization");
        permission["whentoshow"] = "singleSelect";
        permission["registerEventHandler"]("onBeforeShow", function () {
            var row = element.getSelectedRow();
            if (row) {
                permission["load"](row);
            }
        });

        $(query).linkbutton("options").toggle = true;
        $(subclass).linkbutton("options").toggle = true;
        if (element.hassubklass) {
            $(subclass).linkbutton("select");
        }

        var div = document.createElement("div");
        div.id = this.GetUniqueId("gridToolbar");
        $(div).addClass("datagrid-toolbar");
        div.appendChild(edit);
        div.appendChild(read);
        div.appendChild(open);
        div.appendChild(add);
        div.appendChild(del);
        div.appendChild(save);
        div.appendChild(refresh);
        div.appendChild(subclass);
        div.appendChild(query);
        div.appendChild(exporter);
        div.appendChild(idshower);
        div.appendChild(reference);
        div.appendChild(trash);
        div.appendChild(untrash);
        div.appendChild(permission);
        div.appendChild(uml);
        element.xtag.toolbar = {
            div: div, add: add, del: del, edit: edit, save: save, read: read, permission: permission,
            exporter: exporter, open: open, query: query, refresh: refresh, subclass: subclass,
            trash: trash, untrash: untrash, idshower: idshower, reference: reference, uml: uml
        };

        element.set("toolbarDiv", div);

        var setState = function (state: string) {
            if (state == "edit") {

                var rows = element.getSelectedRows();
                element.reloadstatic();
                $(rows).each(function () {
                    var index = element.getRowIndex(this);
                    element.selectRow(index);
                });
            }
            else {
                element.cancelEditRows();
                element.reload();

            }

        }

        element.set("setState", setState);

        this.setState(element, element.state);
        $(element).find(".datagrid-view").before(div);

    }

    protected setSelectedTip(element) {
        var rows = element.getSelectedRows();
        $("#" + element.get("selectedTipID")).text(rows.length);
    }

    protected restoreSelection(element) {
        var rows = element.getSelectedRows();
        for (var key in rows) {
            var row = rows[key];
            var rowindex = element.getRowIndex(row);
            $("#" + element.get("checkid") + "-" + rowindex).prop("checked", true);
        }
    }

    protected getRow(element, index) {
        var rows = element.getRows();
        var row;
        $(rows).each(function () {
            if (element.getRowIndex(this) == index)
                row = this;
        });
        return row;
    }

    protected getNewRow(element) {
        var control = this;
        var row = {};
        window["platformAjax"]({
            url: element.newrowurl || document.body["getnewobjekturl"],
            sync: true,
            data: { klass: element.klass, relatedcolumns: element.relatedcolumns },
            success: function (result) {
                row = JSON.parse(result.Data);
            }
        });
        return row;
    }

    protected initContent(element) {
        var control = this;
        var table = document.createElement("table");
        element.set("table", table);
        element.appendChild(table);
        if (!element.state) {
            element.state = "read"
        };
        $(table).datagrid({
            title: element.title,
            loadMsg: element.loadmsg || "数据加载中，请稍后...",
            emptyMsg: "没有符合条件的数据",
            width: element.width || 1000,
            height: element.height || 400,
            idfield: element.idfield,
            checkOnSelect: false,
            selectOnCheck: false,
            nowrap: true,
            striped: true,
            border: true,
            collapsible: true, //是否可折叠
            remoteSort: true,
            singleSelect: element.singleselect,  //是否单选
            pagination: true,  //分页控件
            rownumbers: true,  //行号
            columns: this.buildColums(element),
            frozenColumns: element.get("frozenColums"),
            onSortColumn: function (sort, order) {
                element.set("orderby", sort);
                element.set("isAsc", order == 'asc');
                element.reload();
            },
            onClickCell: function (index, field, value) {
                if (field != "checkcolumn") {
                    element.unSelectRows(index);
                    if (element.state == "edit") {
                        var row = control.getRow(element, index);
                        if (row.customRowState != "inserted" && row.permissioncode[2] == "0")
                            return;
                        element.beginEditRow(index);
                        var input = $(element).find("[datagrid-row-index='" + index + "']").find("td[field='" + field + "']").find("[iscustomelement='']")[0];
                        if (input && input.focus) {
                            input.focus();
                        }
                    }
                }

            },
            onClickRow: function (index, row) {
            },
            onDblClickRow: function (index, row) {
                element.selectRow(index);
                var open = element.get("toolbar").open;
                if (open && $(open).is(":visible")) {
                    $(open).click();
                }
            },
            onResizeColumn: function (field, width) {
                var cols = element.get("columns")[0].concat(element.get("frozenColums")[0]);
                $(cols).each(function () {
                    if (this.field == field) {
                        this.query.resize(width);
                    }
                });
            },
            onSelect: function (index, row) {
                var checkid = "#" + element.get("checkid") + "-" + index;
                var checked = $(checkid).prop("checked");
                if (!checked) {
                    $(checkid).prop("checked", true);
                }
                control.setSelectedTip(element);
                control.setToolbarPermission(element);
            },
            onUnselect: function (index, row) {
                var check = $("#" + element.get("checkid") + "-" + index);
                if (check.prop("checked")) check.prop("checked", false);
                control.setSelectedTip(element);
                control.setToolbarPermission(element);
            },
            onBeforeEdit: function (index, row) {
                element.set("editingRow", row);
                row.editing = true;
                element.refreshRow(index);
            },
            onEndEdit: function (index, row, changes) {
            },
            onAfterEdit: function (index, row, changes) {
            },
            onCancelEdit: function (index, row) {
                row.editing = false;
                element.refreshRow(index);
            },
            onLoadSuccess: function () {
                var checkid = element.get("checkid");
                var checkall = $("#" + checkid);
                //全选
                checkall.unbind().bind("change", function () {
                    var checked = $(this).prop("checked");
                    $("input[name='" + checkid + "']").each(function () {
                        $(this).prop("checked", checked);
                        var rowIndex = parseInt($(this).attr("rowIndex"));
                        if (checked)
                            element.selectRow(rowIndex);
                        else
                            element.unSelectRow(rowIndex);
                    });
                });
                $("input[name='" + checkid + "']").unbind().bind("click", function (e) {
                    e.stopPropagation();
                }).bind("change", function () {
                    var rowIndex = parseInt($(this).attr("rowIndex"));
                    if ($(this).prop("checked"))
                        element.selectRow(rowIndex);
                    else
                        element.unSelectRow(rowIndex);
                });
                control.setToolbarPermission(element);
                element.triggerEventHandler("onLoadSuccess");

            }
        });

        var gfPager = element.getElementsByTagName("Gf-Pager")[0];
        if (!gfPager) { gfPager = {}; }
        var pager = element.getPager();
        var selectedTipID = this.GetUniqueId("selectedTipID");
        element.set("selectedTipID", selectedTipID);
        element.xtag.pager = pager;
        $(pager).pagination({
            pageNumber: gfPager.pagenumber || 1, //默认显示第几页
            pageSize: gfPager.pagesize || 20,
            pageList: this.stringToObject(gfPager.pagelist) || [5, 10, 20, 50, 100],
            beforePageText: gfPager.beforepagetext || '第',
            afterPageText: gfPager.afterpagetext || '页     共{pages}页',
            displayMsg: '当前选中<span style="color:red;" id="' + selectedTipID + '">0</span>条记录 ' + (gfPager.displaymsg ||
                '显示<span style="color:red;">{from}-{to}</span>条记录  共<span style="color:red;">{total}</span>条记录'),
            onSelectPage: function (pageNumber, pageSize) {
                element.loadDataPage(pageNumber, pageSize);
            }
        });

        var columns = element.xtag.columns[0];
        $(columns).each(function () {
            if (!this.hidden && this.query && !this.forbidquery) {
                $('#' + this.id).append(this.query);
            }
            $('#' + this.id).attr("title", this.description);
        });

        this.buildRowNumberHeader(element);
        this.buildToolbar(element);

        if (!element.width && !element.height) {
            var container = $(element).parent();
            container.css("overflow", "hidden");

            $(function () {
                $(table).datagrid('resize', {
                    width: container.width() - 10,
                    height: container.height() - 4
                });
                if (element.hidetools == 'all') {
                    var wrap = $(element).find(".datagrid-wrap");
                    var height = wrap.height();
                    wrap.height(height + 35);
                }
                container.resize(function () {
                    if (!table.ownerDocument.body.contains(table)) {
                        return;
                    }
                    $(table).datagrid('resize', {
                        width: container.width() - 10,
                        height: container.height() - 4
                    });
                    if (element.hidetools == 'all') {
                        var wrap = $(element).find(".datagrid-wrap");
                        var height = wrap.height();
                        wrap.height(height + 35);
                    }
                });

            });
        }

        element.set("changes", {});
        element.set("outParams", []);
        element.set("loaded", false);
        element.set("orderby", element.orderby);
        element.set("isAsc", element.isasc == 'asc');

        if (element.autoselect) {
            element.select(1);
        }

    }

    protected setToolbarPermission(element) {
        var total = 0;
        var readRows = 0;
        var deleteRows = 0;
        var toolbar = element.get("toolbar");
        var rows = element.getSelectedRows();
        if (rows) {
            total = rows.length;
            $(rows).each(function () {
                var canRead = this.permissioncode[1] === "1";
                var canDelete = this.permissioncode[4] === "1";
                if (canRead) {
                    readRows += 1;
                }
                if (canDelete) {
                    deleteRows += 1;
                }
            });

            var checkState = function(tool,stateToShow){
                    if(stateToShow === '' || stateToShow === element.state){
                        $(tool).show();
                        $(tool).css("display", "inline-block");
                    }
                    else{
                        $(tool).hide();
                    }
                };

            for (var toolname in toolbar) {
                if (toolname == "div")
                    continue;
                var tool = toolbar[toolname];
                var selectToShow = '';
                var stateToShow = '';
                var whenToShow = $(tool).attr("whenToShow");
                if(whenToShow){
                    if(whenToShow.indexOf(',') >= 0){
                        selectToShow = whenToShow.split(',')[0];
                        stateToShow = whenToShow.split(',')[1];
                    }
                    else
                        selectToShow = whenToShow;
                }

                if (selectToShow == "singleSelect") {
                    if (total != 1) {
                        $(tool).hide();
                    }
                    else if (toolname == "open" && readRows != 1) {
                        $(tool).hide();
                    }
                    else if (toolname == "permission") {
                        var row = rows[0];
                        if (row.customRowState == 'inserted' || (row.permissioncode[4] != '1' && row.permission.permissioncode[1] != '1')) {
                            $(tool).hide();
                        }
                        else {
                            if (!tool["initcompleted"]) {
                                tool["init"]();
                            }
                            $(tool).show();
                        }
                    }
                    else {
                        checkState(tool,stateToShow);
                    }
                }
                else if (selectToShow == "select") {
                    if (total == 0) {
                        $(tool).hide();
                    }
                    else if (toolname == "del" && deleteRows != total ) {
                        $(tool).hide();
                    }
                    else if (toolname == "trash" && (deleteRows != total || element.trashstation)) {
                        $(tool).hide();
                    }
                    else if (toolname == "untrash" && (deleteRows != total || !element.trashstation)) {
                        $(tool).hide();
                    }
                    else if (toolname == "uml" && element.klass != "Klass") {
                        $(tool).hide();
                    }
                    else {
                        checkState(tool,stateToShow);
                    }
                }
                else {
                    checkState(tool,stateToShow);
                }
                
                    
            }
        }
        /*if (element.state == "edit") {
            $(toolbar.edit).hide();
            $(toolbar.add).show();
            $(toolbar.save).show();
            $(toolbar.read).show();
            $(toolbar.edit).hide();
        }
        else {
            $(toolbar.edit).show();
            $(toolbar.add).hide();
            $(toolbar.save).hide();
            $(toolbar.edit).css("display", "inline-block")
            $(toolbar.read).hide();
        }*/

        if (element.hidetools) {
            if (element.hidetools == 'all') {
                var toolbar = element.get("toolbarDiv");
                $(toolbar).hide();
            }
            else {
                var toolbar = element.get("toolbar");
                var hidetools = this.stringToObject(element.hidetools);
                $(hidetools).each(function () {
                    if (toolbar[this]) {
                        $(toolbar[this]).hide();
                    }
                });
            }
        }
    }

    protected getColumnFormatter(element, column) {
        var control = this;
        var func = function (value, row, index) { return value; };
        if (column.field == element.idfield)
            return func;
        if ($(column).attr("formatter"))
            return column.formatter;
        switch (column.datatype) {
            case 'objekt':
                func = function (value, row, index) {
                    if (!value) { return null; }
                    else {
                        var obj = control.isString(value) ? JSON.parse(value) : value;
                        if (obj && obj[element.idfield] && obj[element.namefield]) {
                            return `<Gf-ObjectSelector autoinit value="` + JSON.stringify(obj).replace(/"/g, "'") + `" idfield="` + element.idfield + `" namefield="` + element.namefield + `" klass="` + element.klass + `" href="" state="read" ></Gf-ObjectSelector>`;
                        }
                        else
                            return '';
                    }
                };
                break;

            case 'list':
                func = function (value, row, index) {
                    if (!value) { return null; }
                    else {
                        var obj = control.isString(value) ? JSON.parse(value) : value;
                        if (obj && obj[element.idfield] && obj[element.namefield]) {
                            return obj[element.namefield];
                        }
                        else
                            return '';
                    }
                };
                break;

            case "boolean":
                func = function (value, row, index) {
                    if (value && value.toString().toLowerCase() == 'true') { return '√'; }
                    else { return ''; };
                };
                break;

            case "icon":
                func = function (value, row, index) {
                    if (!value) return '';
                    else return '<span class=\"' + value + '\"></span>';
                };
                break;

        }
        if (column.iscolor) {
            func = function (value, row, index) {
                if (!value) return '';
                else return '<span style=\"display: block;\" class=\"GfColorPicker\"><span class=\"shower\" style=\"background-color:#' + value + '\"></span></span>';
            };
        }
        return func;
    }

    protected refreshRowIndex(element) {
        var checkid = element.get("checkid");
        $("input[name='" + checkid + "']").each(function () {
            var newindex = $(this).closest("tr").attr("datagrid-row-index");
            $(this).attr("rowIndex", newindex);
            $(this).attr("id", checkid + "-" + newindex);
        });
    }

    protected extendEditors(elementName: string) {
        var names = elementName.split(',');
        for (var key in names) {
            var name = names[key];
            var getvalue = "return target[0].getValue();";
            var setvalue = "target[0].setValue(value);";
            var init = `var input = document.createElement("` + name + `");`
            var setProperties = `input['required'] = options.required == 'true'; 
                                 input['label'] = options.label;
                                 input['init']();`;

            switch (name) {
                case 'Gf-ObjectSelector':
                    setProperties = `input["idfield"] = options.idfield;
                                 input["namefield"] = options.namefield;
                                 input["klass"] = options.klass; 
                                 input["filterid"] = options.filterid; 
                                 input["href"] = options.href;` + setProperties;
                    break;

                case 'Gf-DropDownList':
                    setProperties = `input["defaultoption"] = options.defaultoption;
                                 input["data"] = options.data;
                                 input["textfield"] = options.textfield; 
                                 input["valuefield"] = options.valuefield;` + setProperties;
                    break;

                case 'Gf-DatePicker':
                    setvalue = "if(value && value.indexOf(' ') > 0){ value = value.split(' ')[0]; }" + setvalue;
                    break;
                case 'Gf-NumberInput':
                case 'Gf-IntInput':
                case 'Gf-BigIntInput':
                    setProperties = `input["prec"] = options.prec;
                                     input["scale"] = options.scale;` + setProperties;
                    break;
            }

            eval(`$.extend($.fn.datagrid.defaults.editors, {
            '`+ name + `': {
                init: function (container, options) {
                    `+ init + `
                    if(options.createonly == 'true'){
                        var grid = $(container).closest("`+ this.elementName + `")[0];
                        var row = grid.get("editingRow");
                        if(row.customRowState != "inserted"){
                            input["state"] = 'read'; 
                        }
                    }
                    `+ setProperties + `
                    var $input = $(input).appendTo(container);
                    return $input;
                },
                getValue: function (target) {
                    `+ getvalue + `
                },
                setValue: function (target, value) {
                    `+ setvalue + `
                },
                resize: function (target, width) {
                    target[0].resize(width);
                }
            }
        });`);

        }

    }

    protected validate(element, rowIndex) {
        var inputs = $(element).find("[datagrid-row-index=" + rowIndex + "]").find("[iscustomelement]");
        var validate = true;
        $(inputs).each(function () {
            if (!this.validate()) {
                validate = false;
            }
        });
        return validate;
    }

    protected setState(element, state) {
        if (element.forbidedit && state == "edit")
            return;

        var func = () => {
            element.get("setState")(state);
            super.setState(element, state);
            this.setToolbarPermission(element);
        };

        element.endEditRows();
        if (!element.forbidUpdateTip && state == 'read' && element.haschange) {
            this.confirm('有未保存的修改，是否放弃？', func);
        }
        else {
            func();
        }
    }
}

//【分页】
class GfPager extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Pager";
        this.addProperties("pagenumber,pagesize,pagelist,beforepagetext,afterpagetext,displaymsg");
    }
}

//【列】
class GfColumn extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Column";
        this.addProperties("field,title,datatype,label,description,width,align,editor");
        this.addProperty("formatter", "{ attribute: {},set:function(func)  { this.xtag.formatter = func;}, get: function()  { return this.xtag.formatter;} }");
        this.addboolProperties("ishidden,isRequired,sortable,isreadonly,iscolor,forbidquery");
    }
}

//【下拉选项】
class GfOption extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Option";
        this.addProperties("value,label");
    }

}

//【按钮点击下拉框】
class GfButtonComboBox extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-ButtonComboBox";
        this.addProperties("width,height,data");
        this.methods["getValue"] = "function() { return $(this.xtag.button).val(); }";
        this.methods["setValue"] = "function(value) { $(this.xtag.button).val(value); }";
        this.addMethod("loadData", `function(data) {
                                        var expand = $(this.xtag.div);
                                        var target = $(this.xtag.button);
                                        var element = this;
                                        expand.html("");

                                        $(data).each(function() {
                                            control.addOption(element,this.value,this.label);
                                        });
                                    }`);
        this.addMethod("toggleExpand", `function() {
                                            var div = this.xtag.div;
                                            var button = this.xtag.button;

                                            if (!$(div).is(":hidden")) {  $(div).hide(); return;  }
                                            
                                            var x= button.getBoundingClientRect().left+document.documentElement.scrollLeft;
                                            var y =button.getBoundingClientRect().top+document.documentElement.scrollTop;
                                            div.style.left = x + "px";
                                            div.style.top = y + 25 + "px";
                                            $(div).show();
                                        }`);
    }

    protected addOption(element, value: string, label: string) {

        var option = document.createElement("div");
        $(option).addClass("combobox-item");
        $(option).css("cursor", "pointer");
        $(option).hover(function () {
            $(option).css("background-color", "#9cc8f7");
            $(option).css("color", "#404040");
        }, function () {
            $(option).css("background-color", "");
            $(option).css("color", "");
        });
        option.innerText = label;
        $(option).attr("value", value);
        $(option).click(function () {
            if (element.getValue() != value) {
                element.setValue(value);
                element.triggerEventHandler("onafterselect");
            }
            $(element.xtag.div).hide();
        });
        element.xtag.div.appendChild(option);
    }

    protected initContent(element) {
        //按钮
        var button = document.createElement("input");
        button.id = this.GetUniqueId("Button");
        $(button).attr("type", "button");
        $(button).css("float", "left");
        $(button).css("width", (element.width || "25"));
        $(button).css("height", (element.height || "25"));
        element.xtag.button = button;

        //下拉框
        var expanddiv = document.createElement("div");
        expanddiv.id = this.GetUniqueId("ComboBox");
        $(expanddiv).addClass("combo-panel panel-body panel-body-noheader");
        $(expanddiv).css("display", "none");
        $(expanddiv).css("position", "absolute");
        $(expanddiv).css("z-index", "9999999");
        $(expanddiv).css("width", "auto");
        $(expanddiv).css("min-width", "60px");
        $(expanddiv).css("height", "auto");
        $(expanddiv).css("max-height", "300px");
        $(expanddiv).css("overflow-y", "auto");
        $(expanddiv).hide();
        element.xtag.div = expanddiv;

        //点击按钮切换下拉框显示/隐藏
        $(button).click(function () {
            element.toggleExpand();
        });
        //在页面其他地方点击将隐藏下拉框
        $(document).click(function (e) {
            if (e.target.id != button.id) {
                $(expanddiv).hide();
            }
        });
        //添加到主元素中
        element.appendChild(button);
        document.body.appendChild(expanddiv);


        //绑定数据
        var options = element.getElementsByTagName("Gf-Option");
        if (options) {
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                this.addOption(element, option.value, option.label);
            }
        }
    }
}

//【查询条件】
class GfQueryCondition extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-QueryCondition";
        this.addProperties("field,datatype,listdefaultoption,listdata,listtextfield,listvaluefield");
        this.addboolProperty("ignorecase");
        this.addMethod("clear", `function(isTriggerQuery) {
                                    this.set("clearstatic",true);
                                    this.xtag.editor.setValue("");
                                    this.xtag.querySelect.setValue("");
                                    if(this.xtag.hasDoubleEditor){
                                        this.xtag.editorFrom.setValue("");
                                        this.xtag.editorTo.setValue("");
                                        $(this.xtag.editor).show();
                                        $(this.xtag.doubleEditor).hide();
                                    }
                                    this.set("clearstatic",false);
                                    if(isTriggerQuery){
                                        element.triggerEventHandler("onafterchange");
                                    }
                                }`);
        this.methods["getValue"] = `function() {
                                        var element = this;
                                        var type = this.xtag.querySelect.getValue();
                                        if(type){
                                            var value = (type != "[..]" ? this.xtag.editor.getValue() : control.GetDoubleEditorValue(this));
                                            return {  field: this.field,
                                            type: type,
                                            value: value,
                                            caseSensitive: !element.ignorecase
                                         };
                                        }else{
                                            return null;
                                        } }`;
        this.methods["setValue"] = `function(obj) {
                                        if(obj && obj.type){
                                            this.xtag.querySelect.setValue(obj.type);
                                            if(obj.type == "[..]"){
                                                var values = obj.value.split(',');
                                                this.xtag.editorFrom.setValue(values[0]);
                                                this.xtag.editorTo.setValue(values[1]);
                                            }
                                            else{
                                                this.xtag.editor.setValue(obj.value);
                                            }
                                        }else{
                                            this.clear();
                                        } }`;
        this.addMethod("resize", `function(width) {
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
                                    
                                }`);
    }

    protected initContent(element) {
        element.id = this.GetUniqueId("QueryCondition");
        var querySelect: any = document.createElement("Gf-ButtonComboBox");
        var editor;
        var emptyValue; emptyValue = "";
        var elementName;
        var hasDoubleEditor = false;

        var commonTypes = [{ value: '=', label: '等于' },
        { value: '!=', label: '不等于' },
        { value: 'IsN', label: '等于空' },
        { value: '!N', label: '不等于空' },
        { value: '', label: '取消本条件' }];

        var stringTypes = [{ value: '*', label: '包含' },
        { value: '!*', label: '不包含' },
        { value: '=*', label: '开始于' },
        { value: '*=', label: '结束于' }];

        var timeTypes = [{ value: '>', label: '晚于' },
        { value: '>=', label: '晚于等于' },
        { value: '<', label: '早于' },
        { value: '<=', label: '早于等于' },
        { value: '[..]', label: '介于' }];

        var numberTypes = [{ value: '>', label: '大于' },
        { value: '>=', label: '大于等于' },
        { value: '<', label: '小于' },
        { value: '<=', label: '小于等于' },
        { value: '[..]', label: '介于' }];

        var selectTypes = commonTypes;

        switch (element.datatype) {
            case "list":
                elementName = "Gf-DropDownList";
                break;
            case "string":
            case "text":
            case "objekt":
            case "sequence":
            case "md5":
                elementName = "Gf-Input";
                selectTypes = stringTypes.concat(commonTypes);
                break;

            case "boolean":
                elementName = "Gf-Toggle";
                emptyValue = false;
                break;

            case "datetime":
            case "time":
            case "date":
                if (element.datatype == 'datetime') elementName = "Gf-DateTimePicker";
                else if (element.datatype == 'time') elementName = "Gf-TimePicker";
                else if (element.datatype == 'date') elementName = "Gf-DatePicker";
                selectTypes = timeTypes.concat(commonTypes);
                hasDoubleEditor = true;
                break;

            case "float":
            case "double":
            case "decimal":
            case "integer":
            case "bigint":
                if (element.datatype == 'integer') elementName = "Gf-IntInput";
                else if (element.datatype == 'bigint') elementName = "Gf-BigIntInput";
                else elementName = "Gf-NumberInput";
                selectTypes = numberTypes.concat(commonTypes);
                hasDoubleEditor = true;
                break;
            default:
                elementName = "Gf-Input";
                break;
        }

        var id = this.GetUniqueId("queryeditor");
        editor = document.createElement(elementName);
        editor.id = id;
        editor.width = 150;
        if (element.datatype == "list") {
            editor.defaultoption = element.listdefaultoption;
            editor.data = element.listdata;
            editor.textfield = element.listtextfield;
            editor.valuefield = element.listvaluefield;
        }
        querySelect.id = this.GetUniqueId("querySelect");
        editor.init();
        editor.registerEventHandler('onafterchange', function () {
            if (element.get("clearstatic")) {
                return;
            }
            var type = querySelect.getValue();
            var value = editor.getValue();
            if (!type && value) {
                if (editor.elementname == 'gf-input') { type = '*'; } else { type = '='; }
                querySelect.setValue(type);
            }
            if (type && type != '!N' && type != 'IsN') {
                element.triggerEventHandler('onafterchange');
            }
        });

        $(element).append(editor);
        element.set("editor", editor);

        querySelect.init();
        querySelect.loadData(selectTypes);
        querySelect.registerEventHandler("onafterselect", function () {
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
                    element.triggerEventHandler("onafterchange");
                }
            }
            else if (type == "IsN" || type == "!N") {
                element.triggerEventHandler("onafterchange");
            }
            else if (type == "[..]") {
                $(editor).hide();
                $(doubleEditor).show();
                if (fromValue && toValue) {
                    element.triggerEventHandler("onafterchange");
                }
            }
            else {
                if (doubleEditor) {
                    $(editor).show();
                    $(doubleEditor).hide();
                }
                if (editor.elementname == "gf-toggle" || value) element.triggerEventHandler("onafterchange");
            }
        });


        element.set("querySelect", querySelect);
        element.appendChild(querySelect);

        if (hasDoubleEditor)
            this.buildDoubleEditor(element, elementName);

        element.set("hasDoubleEditor", hasDoubleEditor);
    }

    protected buildDoubleEditor(element, elementName) {
        var editorFrom;
        editorFrom = document.createElement(elementName);
        editorFrom.width = 75;
        editorFrom.init();

        var editorTo;
        editorTo = document.createElement(elementName);
        editorTo.width = 75;
        editorTo.init();

        var onafterchange = function () {
            if (editorFrom.getValue() && editorTo.getValue()) {
                element.triggerEventHandler("onafterchange");
            }
        }

        editorFrom.registerEventHandler("onafterchange", onafterchange);
        editorTo.registerEventHandler("onafterchange", onafterchange);

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

//【对象选择】
class GfObjectSelector extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-ObjectSelector";
        this.addProperties("href,idfield,namefield,klass");
        this.addboolProperties("forbidOpen,forbidEdit,forbidClear");
        this.addMethod("open", `function(){ 
                                    var ObjectSelector = this;
                                    var href = this.href || document.body.selectobjekturl;
                                    var dialog = this.get('SelectDialog'); 
                                    if(!this.get("loaded")){
                                        control.openSelector(this);
                                        this.set("loaded",true);
                                    }
                                    dialog.open();
                                    /*$(dialog).dialog('open'); */
                                }`);
        this.addMethod("close", "function(){ this.get('SelectDialog').close(); }");
        this.methods["getValue"] = `function() { return JSON.stringify(this.get("obj")); }`;
        this.methods["setDisplay"] = `function(display) { 
                                        var browser = this.get("browser");
                                        var obj = this.get("obj"); 
                                        if(!obj){
                                            $(browser).html("");
                                            return;
                                        }
                                        $(browser).html(obj[this.namefield]);  
                                    }`;
        this.methods["resize"] = "function(width) { this.xtag.nameinput.resize(width - 52); }";
        this.addMethod("setObject", `function(obj){ 
                                        if(!obj || !obj[this.idfield]){
                                            obj = {};
                                            obj['klass'] = this.klass;
                                            obj['title'] = '';
                                            obj[this.namefield] = '';
                                            obj[this.idfield] = '';
                                            obj.permissioncode = '11111';
                                        }
                                        var browser = this.get("browser");
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
                                        this.set("obj",obj); 
                                        this.get("nameinput").setValue(obj[this.namefield]);
                                        this.get("valueinput").value = JSON.stringify(obj);
                                     }`);
        this.addMethod("getObject", `function(){ return this.get("obj"); }`);
        this.emptyValue = null;

    }

    protected attributeChange(element, attrName: string, oldValue, newValue) {

        super.attributeChange(element, attrName, oldValue, newValue);

        if (attrName === "forbid-open" && newValue === "") {
            var browser = element.get("browser");
            $(browser).css("text-decoration", "none");
            $(browser).unbind();
        }
    }

    protected innerSetValue(element, value) {
        if (value) {
            if (window["isString"](value)) {
                var obj = this.stringToObject(value);
                element.setObject(obj);
            } else {
                element.setObject(value);
            }
        }
        else {
            element.setObject(null);
        }
    }

    protected parseToObject(element, value) {
        var obj = {};
        obj['klass'] = element.klass;
        obj['title'] = '';
        obj[element.namefield] = '';
        obj[element.idfield] = '';

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

    protected valueEquals(oldValue, newValue, element) {
        return this.parseToObject(element, oldValue)[element.idfield] == this.parseToObject(element, newValue)[element.idfield];
    }

    protected initContent(element) {
        element.set("loaded", false);
        element.idfield = element.idfield || "id";
        element.namefield = element.namefield || "combinedLabel";
        //输入框
        var nameinput = document.createElement("Gf-Input");
        element.set("nameinput", nameinput);
        element.get("wrapper").appendChild(nameinput);
        nameinput["width"] = parseInt(element.width || 170) - 52;
        nameinput["diseditable"] = true;
        nameinput["init"]();
        //存值隐藏域
        var valueinput = document.createElement("input");
        $(valueinput).attr("type", "hidden");
        $(valueinput).attr("name", $(element).attr("name"));
        element.set("valueinput", valueinput);
        element.get("wrapper").appendChild(valueinput);
        //创建按钮方法
        var createButton = function (name, icon, func) {
            var button = document.createElement("Button");
            $(button).attr("type", "button");
            $(button).addClass("clean-gray");
            $(button).css("font-size", "10px");
            $(button).css("padding", "2px");
            $(button).css("width", "17");
            $(button).css("height", "22");
            $(button).html("<i class='" + icon + "'></i>");
            $(button).click(func);

            element.set(name, button);
            element.get("wrapper").appendChild(button);

        }

        var openfunc = function () {
            if (element.forbidOpen)
                return;
            var obj = element.getObject();
            if (obj && obj[element.idfield]) {
                document.body["openObjDetail"]({
                    controlid: element.id,
                    objid: obj[element.idfield],
                    klass: element.klass,
                    title: obj["title"]
                });
            }
        };

        //打开按钮
        createButton("opendetail", "fa fa-folder-open-o", openfunc);
        //选择按钮
        createButton("selectobject", "fa fa-pencil-square-o", function () {
            if (element.forbidEdit)
                return;
            element.open();
        });
        //清除按钮
        createButton("clear", "fa fa-times", function () {
            if (element.forbidClear)
                return;
            element.setValue(null);
        });

        //浏览链接
        var browser = document.createElement("a");
        $(browser).attr("href", "javascript:void(0);");
        $(browser).css("text-decoration", "underline");
        $(browser).css("color", "inherit");
        $(browser).click(openfunc);
        element.set("browser", browser);
        element.get("display").appendChild(browser);

        this.buildSelectDialog(element);
        var control = this;
        element.registerEventHandler("onafterinit", function () {
            if (element.value) {
                var obj = element.value;
                if (control.isString(element.value)) {
                    obj = control.stringToObject(element.value);
                }
                element.setObject(obj);
            }
        });

    }

    protected getKlassMeta(element) {
        var control = this;
        if (element.get("loaded")) {
            return element.get("KlassMeta");
        }
        var obj = {};
        window["platformAjax"]({
            url: document.body["getklasstree"],
            sync: true,
            data: { klassname: element.klass },
            success: function (result) {
                obj = JSON.parse(result.Data);
                element.set("KlassMeta", obj);
            }
        });
        return obj;
    }

    protected openSelector(element) {
        var div = element.get("SelectDialog");
        var klassMeta = this.getKlassMeta(element);
        var href = element.href || document.body["selectobjekturl"];
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
                center.load(href, { klass: node.klassName, filterid: element.filterid || '' });
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
        center.load(href, { klass: element.klass, filterid: element.filterid || '' });

        element.set("center", center);
        element.set("south", south);
        /*}
        else {
            div["href"] = href + "?klass=" + element.klass + "&filterid=" + (element.filterid || '');
            div["appendContent"](buttonsdiv);
            //$(div).load(href, { klass: element.klass, filterid: element.filterid || '' });
        }*/

    }

    protected buildSelectDialog(element) {
        var dialog = document.createElement("Gf-Dialog");
        dialog["width"] = 800;
        dialog["height"] = 460;
        dialog["modal"] = true;
        dialog["title"] = '选择“' + element.klass + '”对象';
        dialog["init"]();
        element.set("SelectDialog", dialog);


        /*创建按钮*/
        this.buildSelectDialogButtons(element);
    }

    protected buildSelectDialogButtons(element) {
        var sure = this.createLinkbutton("确定", "fa fa-check", function () {
            var grid = $(element.get("SelectDialog").div).find("gf-datagrid")[0];
            var row = grid.getSelectedRow();
            grid.endEditRows();
            if (grid.haschange) {
                $.messager.alert('提示', '请保存数据后再选择！')
            }
            else if (!row) {
                $.messager.alert('提示', '请至少选择一条数据！')
            }
            else {
                var obj = {};
                obj[element.idfield] = row[element.idfield];
                obj[element.namefield] = row[element.namefield];
                obj["klass"] = element.klass;
                obj["title"] = row["combinedtitle"];
                obj["permissioncode"] = row["permissioncode"];

                element.setValue(obj);
                element.close();
                element.triggerEventHandler("onafterselect");
            }
        }, {});

        var cancel = this.createLinkbutton("取消", "fa fa-times", function () {
            element.close();
        }, {});

        var buttonsdiv = document.createElement("div");
        $(buttonsdiv).addClass("dialog-button");
        buttonsdiv.id = this.GetUniqueId("buttonsdiv");
        buttonsdiv.appendChild(sure);
        buttonsdiv.appendChild(cancel);
        element.set("buttonsdiv", buttonsdiv);
        /*var layout = element.get("layout");
        if(layout){
            

        }
        else{
            element.get("SelectDialog").appendContent(buttonsdiv);
        }*/

    }
}

//【选项卡】
class GfTabs extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Tabs";
        this.autoInit = true;
        this.extends = "div";
        this.addProperty("panels", `{ attribute: {}, get: function()  { return this.get("panels");} }`);
        this.addProperties("width,height");
        this.addboolProperties("closable,fit,lazyload");
        this.addMethod("refreshTab", `function(index){
            var panelobj = this.panels[index];
                if (panelobj) {
                    $("#" + panelobj.id).load(panelobj.href);
                    panelobj.loaded = true;
                }
        }`);
        this.addMethod("closeAll", `function() {
                                    var element = this;
                                    var tabs = $(element).tabs('tabs');
                                    $(tabs).each(function(){
                                        var index = $(element).tabs('getTabIndex', this[0]);
                                        element.close(index);
                                    });
                                }`);
        this.addMethod("closeAllExcept", `function(tabIndex) {
                                    var element = this;
                                    var selectedTab = $(element).tabs('getSelected');
                                    var selectedIndex = $(element).tabs('getTabIndex',selectedTab);
                                    var tabs = $(element).tabs('tabs');
                                    $(tabs).each(function(){
                                        var index = $(element).tabs('getTabIndex', this[0]);
                                        if(tabIndex != index){
                                            element.close(index);   
                                        }
                                        if(index < tabIndex){
                                            tabIndex --;
                                            if(selectedIndex > 0){
                                                selectedIndex --;
                                            }
                                        }
                                    });
                                    $(element).tabs('select',selectedIndex);
                                }`);
        this.addMethod("closeLeft", `function(tabIndex) {
                                    var element = this;
                                    var selectedTab = $(element).tabs('getSelected');
                                    var selectedIndex = $(element).tabs('getTabIndex',selectedTab);
                                    var tabs = $(element).tabs('tabs');
                                    
                                    $(tabs).each(function(){
                                        var index = $(element).tabs('getTabIndex', this[0]);
                                        if(index < tabIndex){
                                            element.close(index);   
                                            tabIndex --;
                                            if(selectedIndex > 0){
                                                selectedIndex --;
                                            }
                                        }
                                    });
                                    $(element).tabs('select',selectedIndex);

                                }`);
        this.addMethod("closeRight", `function(tabIndex) {
                                    var element = this;
                                    var tabs = $(element).tabs('tabs');
                                    $(tabs).each(function(){
                                        var index = $(element).tabs('getTabIndex', this[0]);
                                        if(index > tabIndex){
                                            element.close(index);   
                                        }
                                    });
                                }`);
        this.addMethod("close", `function(index) {
                                    $(this).tabs("close", index);
                                    //this.panels.splice(index, 1);
                                }`);
        this.addMethod("select", `function (index) { 
                                    var currentIndex = $(this).tabs('getTabIndex', this.getSelected());
                                    currentIndex = currentIndex < 0 ? 0 : currentIndex;
                                    $(this).tabs("select", index); 
                                    if(currentIndex == index){
                                        this.triggerEventHandler("onSelect",["",index]);
                                    }
                                }`);
        this.addMethod("getTabIndex", `function (tab) { return $(this).tabs("getTabIndex", tab); }`);
        this.addMethod("getTab", `function (index) { return $(this).tabs("getTab", index); }`);
        this.addMethod("getAllTabs", `function () { return $(this).tabs("tabs"); }`);
        this.addMethod("getSelected", `function () { return $(this).tabs("getSelected"); }`);
        this.addMethod("tabExist", `function(id){
                                        var container = this;
                                        var tabExist = false;
                                        var alltabs = $(container).tabs('tabs');
                                        $(alltabs).each(function () {
                                            if(this[0].id == id){
                                                var index = $(container).tabs('getTabIndex', this[0]);
                                                $(container).tabs('select', index);
                                                tabExist = true;
                                            }
                                        });
                                        return tabExist;
                                    }`);
        this.addMethod("add", `function(id,title,href,iconCls,isiframe) {
                                var container = this;
                                if(!id){
                                    id = control.GetUniqueId("tab");
                                }
                                var tabExist = container.tabExist(id);
                                if(!tabExist){
                                    var tabhref = '';
                                    if(!container.lazyload){
                                        tabhref = isiframe ? '' : href;
                                    }
                                    $(container).tabs('add',{
                                        id : id,
                                        title: title,
                                        content : isiframe ? '<iframe src="'+ href +'" width="99%" height="99%" style="border-width:0px;">' : '',
                                        href : tabhref,
                                        iconCls : iconCls,
                                        closable : container.closable
                                    });
                                    container.get("panels").push({ id : id, href : href, loaded : false });
                                }
                            }`);
        this.addMethod("addContent", `function(id,title,content){
                                        var container = this;
                                        var tabExist = container.tabExist(id);
                                        if(!tabExist){
                                            $(container).tabs('add',{
                                                id : id,
                                                title: title,
                                                content : '<div id="' + id + 'div" class="easyui-layout" data-options="fit:true" ><div>',
                                                href : '',
                                                closable : container.closable
                                            });
                                            container.get("panels").push({ id : id, content : content, loaded : true });
                                            var wrapper = document.getElementById(id + "div");
                                            $(content).appendTo(wrapper);
                                        }
                                        
                                    }`);
        this.addMethod("tabGoto", `function(href) {
            var tab = this.getSelected();
            $(tab).load(href);
            }`);
        this.addMethod("tabGoback", `function() {
            var tab = this.getSelected();
            var index = this.getTabIndex(tab);
            var panelobj = this.panels[index];
            $(tab).load(panelobj.href);
            }`);
    }

    protected initContent(element) {
        var control = this;
        element.registerEventHandler("onSelect", function (title, index) {
            if (element.lazyload) {
                var panelobj = element.panels[index];
                if (panelobj && !panelobj.loaded) {
                    $("#" + panelobj.id).load(panelobj.href, null, function () {
                        element.triggerEventHandler("onLazyLoad", [index]);
                    });
                    panelobj.loaded = true;
                }
            }
        });
        $(element).tabs({
            width: element.width || 'auto',
            height: element.height || 'auto',
            fit: element.fit,
            border: false,
            scrollDuration: 0,
            onSelect: function (title, index) {
                element.triggerEventHandler("onSelect", [title, index]);
            },
            onLoad: function (panel) {
                element.triggerEventHandler("onLoad", [panel]);
            },
            onClose: function (title, index) {
                element.panels.splice(index, 1);
            },
            onContextMenu: function (e, title, index) {
                if (element.closable) {
                    e.preventDefault();
                    var id = control.GetUniqueId('tabContextMenu');
                    var menu = $(`<div id="` + id + `" class="easyui-menu" style="width:120px;">
                                    <div id="`+ id + `-tabRefresh" data-options="name:-1">刷新</div>
                                    <div id="`+ id + `-tabclose" data-options="name:1">关闭</div>
                                    <div id="`+ id + `-tabcloseall" data-options="name:2">关闭全部</div>
                                    <div id="`+ id + `-tabcloseother" data-options="name:3">关闭其他</div>
                                    <div class="menu-sep"></div>
                                    <div id="`+ id + `-tabcloseright" data-options="name:4">关闭左侧全部</div>
                                    <div id="`+ id + `-tabcloseleft" data-options="name:5">关闭右侧全部</div>
                                </div>`).appendTo(document.body);

                    $("#" + id).menu({
                        onClick: function (item) {
                            switch (item.name) {
                                case -1:
                                    element.refreshTab(index);
                                    break;
                                case 1:
                                    element.close(index);
                                    break;
                                case 2:
                                    element.closeAll();
                                    break;
                                case 3:
                                    element.closeAllExcept(index);
                                    break;
                                case 4:
                                    element.closeLeft(index);
                                    break;
                                case 5:
                                    element.closeRight(index);
                                    break;

                            }
                        }
                    });

                    if (index >= 0) {
                        $("#" + id).menu('show', {
                            left: e.pageX,
                            top: e.pageY
                        });
                    }
                }
            }
        });
        element.set("panels", []);
    }
}

//【下拉框】
class GfDropDownList extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-DropDownList";
        this.addProperties("data,valuefield,textfield,defaultText,defaultoption,color,source");
        this.methods["setDisplay"] = "function(display) { $(display).text(this.getText()); }";
        this.methods["getValue"] = `function() { 
                                        var obj = this.get("obj");
                                        if(obj && obj[this.valuefield]){
                                            return JSON.stringify(obj); 
                                        }
                                        else{
                                            return null;
                                        }
                                    }`;
        this.addMethod("setObject", `function(obj){ 
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
                                        this.set("obj",obj); 
                                        $(this.get("valueInput")).val(JSON.stringify(obj));
                                        $(this.get("select")).combobox('setValue', obj[this.valuefield]); 
                                     }`);
        this.addMethod("getObject", `function(){ return this.get("obj"); }`);
        this.addMethod("loadData", `function(data) { 
                                        if(control.isString(data)){
                                            data = control.stringToObject(data);
                                        }
                                        if(this.defaultoption){
                                            var obj = {};
                                            obj[this.valuefield] = "";
                                            obj[this.textfield] = this.defaultoption;
                                            obj.permissioncode = "11111";
                                            data.unshift(obj);
                                        }
                                        $(this.get("select")).combobox('loadData',data); 
                                    }`);
        this.addMethod("loadDatastring", `function(data) { 
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
                                                    obj.color = arr[2];
                                                    obj.permissioncode = arr[3];
                                                    obj.description = arr[4];
                                                    objs.push(obj);
                                                }
                                            });
                                            this.loadData(objs);
                                        }
                                    }`);
        this.addMethod("getText", `function(){ var obj = this.get("obj"); return obj ? obj[this.textfield] : ""; }`);
        this.addMethod("enable", `function(){ $(this.get("select")).combobox('enable');  }`);
        this.addMethod("disable", `function(){ $(this.get("select")).combobox('disable');  }`);
        this.methods["resize"] = `function(width) { $(this.get("select")).combobox('resize',width);  }`;
        this.emptyValue = null;
    }

    protected innerSetValue(element, value) {
        if (value) {
            if (window["isString"](value)) {
                var obj = this.stringToObject(value);
                element.setObject(obj);
            } else {
                element.setObject(value);
            }
        }
        else {
            element.setObject(null);
        }
    }

    protected parseToObject(element, value) {
        var obj = {};
        obj['klass'] = element.klass;
        obj[element.textfield] = '';
        obj[element.valuefield] = '';

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

    protected valueEquals(oldValue, newValue, element) {
        return this.parseToObject(element, oldValue)[element.valuefield] == this.parseToObject(element, newValue)[element.valuefield];
    }

    protected create(element) {
        element.registerEventHandler("onafterinit", function () {
            if (element.data) {
                element.loadDatastring(element.data);
            } else {
                if (element.source) {
                    var seldata = { param: [{ field: "source", type: "=", value: element.source }], klass: "Value" };
                    window['platformAjax']({
                        url: document.body['listdataurl'],
                        data: seldata,
                        success: function (result) {
                            var listData = JSON.parse(result.Data);
                            var loadDatastr = "";
                            for (var item in listData.rows) {

                                var valueData = listData.rows[item];

                                loadDatastr = loadDatastr + valueData.id + "_" + valueData.label + "_";
                                if (item != listData.rows.count) {
                                    loadDatastr = loadDatastr + ",";
                                }
                            }
                            element.loadDatastring(loadDatastr);
                        }
                    });
                }
            }
            //element.setValue(element.value);
        });
        super.create(element);
    }

    protected initContent(element) {

        var wrapper = element.get("wrapper");
        var display = element.get("display");

        var select = document.createElement("select");
        wrapper.appendChild(select);
        element.set("select", select);

        var valueInput = document.createElement("input");
        $(valueInput).attr("type", "hidden");
        $(valueInput).attr("name", $(element).attr("name"));
        element.appendChild(valueInput);
        element.set("valueInput", valueInput);

        $(select).combobox({
            valueField: element.valuefield,
            textField: element.textfield,
            width: element.width || 170,
            height: element.height || 26,
            editable: false,
            onChange: function (newValue, oldValue) {
            },
            formatter: function(row){
                var opts = $(this).combobox('options');
		        return `<span style="width:100%; height: 100%;display:block;" title="`+ row[`description`] +`">` + row[opts.textField] + '</span>';
            },
            onSelect: function (record) {
                var obj = element.getObject();
                if (!obj || record[element.valuefield] != obj[element.valuefield]) {
                    element.setObject(record);
                    element.triggerEventHandler("onafterchange", [record]);
                }
            }
        });

    }
}

//【树】
class GfTree extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Tree";
        this.autoInit = true;
        this.addProperties("data,click,paddingleft,url");
        this.addboolProperty("hidefoldericon");
        this.addMethod("expand", `function(node) {
                                    $(this.get("ul")).tree('expand',node);
                                }`)
        this.addMethod("append", `function(node,data) {
                                    $(this.get("ul")).tree('append', {
                                    parent: node,
                                    data: data
                                    });
                                }`)
        this.addMethod("reload", `function() {
                                    var ul = this.get("ul");
                                    var selected = $(ul).tree('getSelected');
                                    if(this.data){
                                        this.loadDatastring(this.data, this.click)
                                    }
                                    if(selected){
                                        $(ul).tree('expandAll');
                                        var node = $(ul).tree('find', selected.id);
                                        if(node){
                                            $(ul).tree('select',node.target);
                                        }
                                    }
                                }`);
        this.addMethod("loadData", `function(data, click) {
                                        var element = this;
                                        $(element.get("ul")).tree({
                                            data : data,
                                            onBeforeExpand:function(node,param){  
                                                if(!node.children || node.children.length == 0){
                                                    platformAjax({
                                                        url: element.url,
                                                        data:{ id:node.id, parentId : node.parentId },
                                                        success: function(result) {
                                                            element.append(node.target,JSON.parse(result.Data));
                                                            element.expand(node);
                                                        }
                                                    });
                                                }
                                            },  
                                            onExpand:function(node,param){ 
                                                control.changeCssClass(element);
                                            },
                                            onClick : function (node) {
                                                if(click){
                                                    var func = control.stringToObject(click);
                                                    func(node);
                                                }
                                                element.triggerEventHandler("onNodeClick",[node]);
                                            }
                                        });
                                        control.changeCssClass(this);
                                    }`);
        this.addMethod("loadDatastring", `function(data, click) {
                                            var element = this;
                                            var ul = this.get("ul");
                                            $(ul).tree({
                                                data : control.stringToObject(data),
                                                onBeforeExpand:function(node,param){  
                                                    if(!node.children || node.children.length == 0){
                                                        platformAjax({
                                                            url: element.url,
                                                            data:{ id:node.id, parentId : node.parentId },
                                                            sync:true,
                                                            success: function(result) {
                                                                element.append(node.target,JSON.parse(result.Data));
                                                            }
                                                        });
                                                    }
                                                },  
                                                onExpand:function(node,param){ 
                                                    control.changeCssClass(element);
                                                },
                                                onClick : function (node) {
                                                    if(click){
                                                        var func = control.stringToObject(click);
                                                        func(node);
                                                    }
                                                    element.triggerEventHandler("onNodeClick",[node]);
                                                }
                                            });
                                            control.changeCssClass(this);
                                        }`);

        this.addMethod("find", `function(id) { return $(this.get("ul")).tree('find', id); }`);
        this.addMethod("select", `function(id) { var node = this.find(id); $(this.get("ul")).tree('select', node.target); }`);
    }

    protected initContent(element) {
        var ul = document.createElement("ul");
        element.appendChild(ul);
        element.set("ul", ul);
        if (element.data) {
            element.loadDatastring(element.data, element.click)
        }
    }

    protected changeCssClass(element) {
        $(element).find(".tree-file").removeClass("tree-file");
        if (element.paddingleft) {
            $(element).find(".tree-node").css("padding-left", parseInt(element.paddingleft));
        }
        if (element.hidefoldericon) {
            $(element).find(".tree-folder").removeClass("tree-folder");
            $(element).find(".tree-folder-open").removeClass("tree-folder-open");
        }
    }
}

//【颜色选择】
class GfColorPicker extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-ColorPicker";
        this.methods["disable"] = `function() {   $(this.xtag.input).attr("disabled","disabled"); }`;
        this.methods["enable"] = `function() {   $(this.xtag.input).removeAttr("disabled");  }`;
        this.methods["getValue"] = `function() { return $(this.get("input")).val(); }`;
        this.methods["setDisplay"] = `function(display) { 
            $(this.get("shower")).css("backgroundColor","#" + this.getValue());
            $(this.get("displayShower")).css("backgroundColor","#" + this.getValue());
         }`;
        this.methods["resize"] = "function(width) { $(this.xtag.input).width(width - 25); }";
    };

    protected innerSetValue(element, value) {
        $(element.get("input")).val(value);
        $(element.get("shower")).css("backgroundColor", "#" + value);
        $(element.get("displayShower")).css("backgroundColor", "#" + value);
    }

    protected initContent(element) {

        var input = document.createElement("input");
        $(input).attr("name", $(element).attr("name"));
        $(input).val($(element).attr("value"));
        $(input).attr("readonly", "readonly");
        $(input).css("width", element.width ? (parseInt(element.width) - 22) : 150);
        $(input).css("height", 24);
        $(input).addClass("textbox textbox-text");
        element.xtag.input = input;

        var display = element.get("display");
        var wrapper = element.get("wrapper");
        $(wrapper).addClass("GfColorPicker");
        $(display).addClass("GfColorPicker");

        //颜色显示
        var shower = document.createElement("span");
        $(shower).addClass("shower");
        var displayShower = document.createElement("span");
        $(displayShower).css("width", 20);
        $(displayShower).css("height", 20);
        $(displayShower).css("border", "1px solid darkgrey");
        $(displayShower).css("display", "block");

        element.set("shower", shower);
        element.set("displayShower", displayShower);
        wrapper.appendChild(input);
        wrapper.appendChild(shower);
        display.appendChild(displayShower);

        $(input).ColorPicker({
            color: element.value,
            onChange: function (hsb, hex, rgb) {
                //$(input).css('backgroundColor', '#' + hex);
            },
            onSubmit: function (hsb, hex, rgb, el) {
                $(el).ColorPickerHide();
                element.setValue(hex);
            },
            onBeforeShow: function () {
                $(this).ColorPickerSetColor(this.value);
            }
        })
            .bind('keyup', function () {
                $(this).ColorPickerSetColor(this.value);
            });
        if (element.value) {
            element.setValue(element.value);
        }
        this.setState(element, element.state);
    }
}

//【布局】
class GfLayOut extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-LayOut";
        this.autoInit = true;
        this.addMethod("addRegion", `function(name,title,width,tools) {
            $(this.get("div")).layout('add',{
                region: name,
                width: width,
                title: title,
                split: true,
                tools:tools
            });
        }`);
    }

    protected initContent(element) {
        $(element).css("width", "100%");
        $(element).css("height", "100%");
        var div = document.createElement("div");
        element.appendChild(div);
        element.set("div", div);
        $(div).layout();
    }
}

//【文件上传】
class GfUpFileDialog extends CustomElement {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.autoInit = true;
        this.elementName = "Gf-UpFileDialog";
        this.addProperties("title,width,height,directoryid,directoryname,upfileserver,ext,mimeTypes,fileNumLimit,fileSingleSizeLimit,fileSizeLimit");
        this.addMethod("open", `function(){ 
                                    var div = this.get('div');
                                    $(div).dialog({
                                        title: this.title || '文件上传',
                                        width: this.width || 800,
                                        height: this.height || 600,
                                        closed: true,
                                        cache: false
                                    });
                                    var uploader=this.get('uploader');
                                    if(uploader){
                                        if($(".filelist li")[0]){
                                            $(".filelist li").each(function () {
                                                var id = $(this).attr("id");
                                                uploader.removeFile(id);
                                            });
                                        }
                                        else{
                                            this.get('updateTotalProgress')();
                                        }
                                        var uploaderPanel=this.get('uploaderPanel');
                                        $(uploaderPanel).remove();
                                    }
                                    control.initWebUploader(this);
                                    $(div).dialog('open'); 
                                }`);
        this.addMethod("close", "function(){ $(this.get('div')).dialog('close'); }");
    }

    protected create(element) {
        var control = this;
        element.registerEventHandler("onbeforeinit", function () {
            control.includeStyle($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/css/style.css");
            control.includeStyle($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/css/webuploader.css");
            control.includeJS($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/js/webuploader.js");
        });
        super.create(element);
    }


    protected initWebUploader(element) {
        var control = this;
        var uploaderPanel = document.createElement("div");
        var toolbarid = element.get("toolbarid", toolbarid);
        element.set("uploaderPanel", uploaderPanel);
        $(uploaderPanel).addClass("container");
        $(uploaderPanel).append(`<div class="page-container">
                            <div class="uploader wu-example">
                                <span style="font-size:16px;font-weight:bolder;">当前目录：` + element.directoryname + `</span>
                                <span id="`+ toolbarid + `" style="float:right"></span>
                                <div class="queueList filled">
                                    <div  class="placeholder">
                                        <p>试试将电脑里的文件拖到此处上传<br />或将截图复制到此处  </p>
                                    </div>
                                </div>
                                <div class="statusBar">
                                    <div class="progress">
                                        <span class="text">0%</span>
                                        <span class="percentage"></span>
                                    </div>
                                    <div class="info"></div>
                                    <div class="btns">
                                        <div class="clearBtn">清空</div><div class="filePicker"></div><div class="uploadBtn">开始上传</div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
        $(element.get('div')).append(uploaderPanel);
        var $wrap = $('.uploader'),

            // 图片容器
            $queue = $('<ul class="filelist"></ul>')
                .appendTo($wrap.find('.queueList')),

            // 状态栏，包括进度和控制按钮
            $statusBar = $wrap.find('.statusBar'),

            // 文件总体选择信息。
            $info = $statusBar.find('.info'),

            // 上传按钮
            $upload = $wrap.find('.uploadBtn'),

            // 没选择文件之前的内容。
            $placeHolder = $wrap.find('.placeholder'),

            // 总体进度条
            $progress = $statusBar.find('.progress').hide(),

            // 添加的文件数量
            fileCount = 0,

            // 添加的文件总大小
            //fileSize = 0,

            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth = 110 * ratio,
            thumbnailHeight = 110 * ratio,

            // 可能有pedding, ready, uploading, confirm, done.
            state = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages = {},

            succeedFile = [],

            supportTransition = (function () {
                var s = document.createElement('p').style,
                    r = 'transition' in s ||
                        'WebkitTransition' in s ||
                        'MozTransition' in s ||
                        'msTransition' in s ||
                        'OTransition' in s;
                s = null;
                return r;
            })(),

            // WebUploader实例
            uploader;

        if (!WebUploader.Uploader.support()) {
            control.warning('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error('WebUploader does not support the browser you are using.');
        }
        // 实例化
        var accept = {};
        if (element.ext) {
            accept["extensions"] = element.ext;
        }
        if (element.mimeTypes) {
            accept["mimeTypes"] = element.mimeTypes;
        }
        uploader = WebUploader.create({
            fileNumLimit: parseInt(element.fileNumLimit || 100),
            pick: {
                id: '.filePicker',
                label: '选择文件'
            },
            accept: accept,
            dnd: '.uploader .queueList',
            paste: document.body,

            // swf文件路径
            swf: $(document.body).attr("apppath") + '/Content/js/Uploader.swf',
            disableGlobalDnd: true,
            duplicate: true,
            chunked: false,
            threads: 1,
            server: element.upfileserver,
            fileSizeLimit: (parseInt(element.fileSizeLimit) || 500 * 1024) * 1024,    // 500 M
            fileSingleSizeLimit: (parseInt(element.fileSingleSizeLimit) || 100 * 1024) * 1024,    // 100 M
            //formData: { DirectoryId: "" }
        });


        uploader.onUploadProgress = function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            $percent.css('width', percentage * 100 + '%');
            percentages[file.id][1] = percentage;
            updateTotalProgress();
        };

        uploader.onBeforeFileQueued = function (file) {
            //file.id = control.GetUniqueId("File");
        };
        uploader.onFileQueued = function (file) {
            if(file.name == 'image' || file.name == 'image.png'){
                file.id = this.GetUniqueId("");
                file.name = file.id ;
            }
            fileCount++;
            //fileSize += file.size;

            if (fileCount === 1) {
                $placeHolder.addClass('element-invisible');
                $statusBar.show();
            }

            addFile(file);
            setState('ready');
            updateTotalProgress();
        };

        uploader.onFileDequeued = function (file) {
            fileCount--;
            //fileSize -= file.size;

            if (!fileCount) {
                setState('pedding');
            }

            removeFile(file);
            updateTotalProgress();

        };
        uploader.onUploadBeforeSend = function (obj, data, headers) {
            if (element.directoryid) {
                data["DirectoryId"] = element.directoryid;
            }

        };
        uploader.onUploadAccept = function (obj, response) {
            if (response.IsSuccess) {
                succeedFile.push(obj.file.id);
            }
            else {
                control.warning(response.Message);
                return false;
            }
        };
        uploader.on('all', function (type) {
            var stats;
            switch (type) {
                case 'uploadFinished':
                    setState('confirm');
                    break;

                case 'startUpload':
                    setState('uploading');
                    break;

                case 'stopUpload':
                    setState('paused');
                    break;

            }
        });
        uploader.on('uploadBeforeSend', function (object, data, headers) {
            element.triggerEventHandler("uploadBeforeSend", [object, data, headers])
        });


        uploader.onError = function (code) {
            var text = '';
            switch (code) {
                case 'F_DUPLICATE': text = '该文件已经被选择了!';
                    break;
                case 'Q_EXCEED_NUM_LIMIT': text = '上传文件数量超过限制!';
                    break;
                case 'F_EXCEED_SIZE': text = '文件大小超过限制!(' + (parseInt(element.fileSingleSizeLimit) || 100 * 1024) + 'KB)';
                    break;
                case 'Q_EXCEED_SIZE_LIMIT': text = '所有文件总大小超过限制!(' + (parseInt(element.fileSizeLimit) || 500 * 1024) + 'KB)';
                    break;
                case 'Q_TYPE_DENIED': text = '文件类型不正确或者是空文件!';
                    break;
                default: text = '未知错误!';
                    break;
            }
            control.warning(text);
        };
        $upload.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            if (state === 'ready') {
                uploader.upload();
            } else if (state === 'paused') {
                uploader.upload();
            } else if (state === 'uploading') {
                uploader.stop();
            }
        });

        $(".clearBtn").on('click', function () {
            $(".filelist li").each(function () {
                var id = $(this).attr("id");
                uploader.removeFile(id);
            });
        });
        $info.on('click', '.retry', function () {
            uploader.retry();
        });

        // 当有文件添加进来时执行，负责view的创建
        function addFile(file) {
            var $li = $('<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>' +
                '<p class="progress"><span></span></p>' +
                '</li>'),

                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find('p.imgWrap'),
                $info = $('<p class="error"></p>'),

                showError = function (code) {
                    var text;
                    switch (code) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text(text).appendTo($li);
                };

            if (file.getStatus() === 'invalid') {
                showError(file.statusText);
            } else {
                // lazyload
                $wrap.text('预览中');
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        $wrap.text('不能预览');
                        $btns.find('.rotateRight,.rotateLeft').remove();
                        return;
                    }

                    var img = $('<img src="' + src + '">');
                    $wrap.empty().append(img);
                }, thumbnailWidth, thumbnailHeight);

                percentages[file.id] = [file.size, 0];
                file.rotation = 0;
            }

            file.on('statuschange', function (cur, prev) {
                if (prev === 'progress') {
                    $prgress.hide().width(0);
                }

                // 成功
                if (cur === 'error' || cur === 'invalid') {
                    //console.log(file.statusText);
                    showError(file.statusText);
                    percentages[file.id][1] = 1;
                } else if (cur === 'interrupt') {
                    showError('interrupt');
                } else if (cur === 'queued') {
                    percentages[file.id][1] = 0;
                } else if (cur === 'progress') {
                    $info.remove();
                    $prgress.css('display', 'block');
                } else if (cur === 'complete') {
                    $li.off('mouseenter mouseleave');
                    $btns.remove();
                    $li.append('<span class="success"></span>');
                }

                $li.removeClass('state-' + prev).addClass('state-' + cur);
            });

            $li.on('mouseenter', function () {
                $btns.stop().animate({ height: 30 });
            });

            $li.on('mouseleave', function () {
                $btns.stop().animate({ height: 0 });
            });

            $btns.on('click', 'span', function () {
                var index = $(this).index(),
                    deg;

                switch (index) {
                    case 0:
                        uploader.removeFile(file);
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }
                if (supportTransition) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                }
            });

            $li.appendTo($queue);
        }

        // 负责view的销毁
        function removeFile(file) {
            var $li = $('#' + file.id);

            delete percentages[file.id];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }

        var updateTotalProgress = function () {
            var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;

            $.each(percentages, function (k, v) {
                total += v[0];
                loaded += v[0] * v[1];
            });

            percent = total ? loaded / total : 0;

            spans.eq(0).text(Math.round(percent * 100) + '%');
            spans.eq(1).css('width', Math.round(percent * 100) + '%');
            updateStatus();
        }

        function updateStatus() {
            var text = '', stats;

            if (state === 'ready') {
                text = '选中' + fileCount + '个文件。';
            } else if (state === 'confirm') {
                stats = uploader.getStats();
                if (stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '个文件，' +
                        stats.uploadFailNum + '个文件上传失败'
                }

            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '个文件，已上传' + stats.successNum + '个文件';

                if (stats.uploadFailNum) {
                    text += '，失败' + stats.uploadFailNum + '个文件';
                }
            }

            $info.html(text);
        }

        function setState(val) {
            var file, stats;

            if (val === state) {
                return;
            }

            $upload.removeClass('state-' + state);
            $upload.addClass('state-' + val);
            state = val;

            switch (state) {
                case 'pedding':
                    $placeHolder.removeClass('element-invisible');
                    $queue.parent().removeClass('filled');
                    $queue.hide();
                    //$statusBar.addClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'ready':
                    $placeHolder.addClass('element-invisible');
                    $queue.parent().addClass('filled');
                    $queue.show();
                    uploader.refresh();
                    break;

                case 'uploading':
                    $progress.show();
                    $upload.text('暂停上传');
                    break;

                case 'paused':
                    $progress.show();
                    $upload.text('继续上传');
                    break;

                case 'confirm':
                    element.triggerEventHandler("onSubmit");
                    $progress.hide();
                    $upload.text('开始上传');//.addClass('disabled');
                    stats = uploader.getStats();
                    if (stats.successNum && !stats.uploadFailNum) {
                        setState('finish');
                        return;
                    }

                    break;
                case 'finish':
                    stats = uploader.getStats();
                    if (stats.successNum) {
                        //alert('上传成功');
                    } else {
                        // 没有成功的图片，重设
                        state = 'done';
                        location.reload();
                    }

                    break;
            }

            updateStatus();
        }

        $upload.addClass('state-' + state);

        updateTotalProgress();
        element.set("uploader", uploader);
        element.set("updateTotalProgress", updateTotalProgress)
    }

    protected initContent(element) {
        var div = document.createElement("div");
        element.set("div", div);
        element.appendChild(div);

        var toolbarid = this.GetUniqueId("toolbar");
        element.set("toolbarid", toolbarid);

        var control = this;
        $(div).css("padding", "2px");
        $(div).dialog({
            title: element.title || '文件上传',
            width: element.width || 800,
            height: element.height || 600,
            closed: true,
            cache: false,
            modal: true
        });
    }
}

//【关联对象添加】
class GfRocAdd extends CustomElement {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-RocAdd";
        this.addProperty("createOption", `{ attribute: {}, get: function()  { return this.get("list").getObject().value;} }`);
        this.addProperties("listwidth,listvalue,whentoshow");
        this.addboolProperties("cancreate,canselect");
        this.addMethod("enable", `function(){
            this.get("list").enable();
            $(this.get("button")).linkbutton("enable");
        }`);
        this.addMethod("disable", `function(){
            this.get("list").disable();
            $(this.get("button")).linkbutton("disable");
        }`);
    }

    protected initContent(element) {

        var list = document.createElement("Gf-DropDownList");
        element.appendChild(list);
        element.set("list", list);
        var data = [];
        if (element.canselect) {
            var obj = {};
            obj["value"] = "select";
            obj["text"] = "引用";
            obj["permissioncode"] = "11111";
            data.push(obj);
        }
        if (element.cancreate) {
            var obj = {};
            obj["value"] = "add";
            obj["text"] = "新建";
            obj["permissioncode"] = "11111";
            data.push(obj);
        }
        if (element.listvalue) {
            list["value"] = element.listvalue;
        }
        list["valuefield"] = "value";
        list["textfield"] = "text";
        list["width"] = element.listwidth;
        list["init"]();
        list["loadData"](data);
        list["setObject"](data[0]);

        var add = this.createLinkbutton("新建", "fa fa-plus", function () {
            element.triggerEventHandler("onAddRoc");
        }, {});
        element.appendChild(add);
        element.set("button", add);

        if (!element.cancreate && !element.canselect) {
            $(list).hide();
            $(add).hide();
        }

    }
}

//【多级下拉框】
class GfMultDropDownList extends GfPropertyControl {

    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-MultDropDownList";
        this.addProperties("data,valuefield,textfield,defaultoption,color,source,rootvalue");
        this.methods["setDisplay"] = "function(display) { $(display).text(this.getText()); }";
        this.methods["getValue"] = `function() { 
                                        var obj = this.get("obj");
                                        if(obj && obj[this.valuefield]){
                                            return JSON.stringify(obj); 
                                        }
                                        else{
                                            return "";
                                        }
                                    }`;
        this.addMethod("setObject", `function(obj){ 
                                        if(!obj){
                                            obj = {};
                                            obj['klass'] = '';
                                            obj[this.textfield] = '';
                                            obj[this.valuefield] = '';
                                        }
                                        this.set("obj",obj); 
                                        $(this.get("valueInput")).val(JSON.stringify(obj));
                                        $(this.get("select")).combobox('setValue', obj[this.valuefield]); 
                                     }`);
        this.addMethod("getObject", `function(){ return this.get("obj"); }`);
        this.addMethod("getText", `function(){ var selecttext = this.get("selecttext"); var obj = this.get("obj"); return selecttext ? selecttext : obj[this.textfield]; }`);
        this.addMethod("enable", `function(){
                                        var selects = this.get("selects");
                                        for (var i = 0; i < selects.length; i++) {
                                            $(selects[i]).combobox('enable'); 
                                        }
                                    }`);
        this.addMethod("disable", `function(){ 
                                        var selects = this.get("selects");
                                        for (var i = 0; i < selects.length; i++) {
                                            $(selects[i]).combobox('disable'); 
                                        }
                                    }`);
        this.methods["resize"] = `function(width) { 
                                        var selects = this.get("selects");
                                        for (var i = 0; i < selects.length; i++) {
                                            $(selects[i]).combobox('resize',width); 
                                        }
                                     }`;
        this.emptyValue = null;
    }

    protected innerSetValue(element, value) {
        if (value) {
            if (window["isString"](value)) {
                var obj = this.stringToObject(value);
                element.setObject(obj);
            } else {
                element.setObject(value);
            }
        }
        else {
            element.setObject(null);
        }
    }

    protected parseToObject(element, value) {
        var obj = {};
        obj['klass'] = element.klass;
        obj[element.textfield] = '';
        obj[element.valuefield] = '';

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

    protected valueEquals(oldValue, newValue, element) {
        return this.parseToObject(element, oldValue)[element.valuefield] == this.parseToObject(element, newValue)[element.valuefield];
    }

    protected create(element) {
        var control = this;
        element.registerEventHandler("onafterchange", function () {
            element.value = element.getObject()[element.valuefield];
            control.planSelect(element, element.getObject()[element.valuefield]);
        });
        super.create(element);
    }

    protected initContent(element) {
        this.planSelect(element, element.value);
    }

    public getSelectList(element, selectvalue) {
        var selectlist = selectvalue;
        if (selectvalue != "") {
            var j = 1;
            for (var i = 0; i < j; i++) {
                selectvalue = this.getParentvalue(element, selectvalue);
                if (selectvalue != element.rootvalue && selectvalue != "") {
                    selectlist = selectvalue + "," + selectlist;
                    j = j + 1;
                }
            }
        }
        return selectlist;
    }

    public getParentvalue(element, sonvalue) {
        var parentvalue = "";
        if (element.data) {
            var array = element.data.split(',');
            $(array).each(function () {
                if (this.length > 0 && this.split('_')[0] == sonvalue) {
                    parentvalue = this.split('_')[2];
                }
            });
        }
        return parentvalue;
    }

    public planSelect(element, selectvalue) {
        var objselects = [];
        element.set("selects", objselects);
        element.set("selecttext", "");
        $(element.get("wrapper")).empty();
        var valueInput = document.createElement("input");
        $(valueInput).attr("type", "hidden");
        $(valueInput).attr("name", $(element).attr("name"));
        element.appendChild(valueInput);
        element.set("valueInput", valueInput);
        var selectlist = this.getSelectList(element, selectvalue);
        selectlist = element.rootvalue + "," + selectlist + ","
        selectlist = selectlist.replace(",,", ",").replace(",,", ",");
        var array = selectlist.split(',');
        for (var i = 0; i < array.length - 1; i++) {
            this.addSelect(element, array[i], array[i + 1]);
        }
    }

    public addSelect(element, parentvalue, selectvalue) {
        var objs = [];
        if (element.data) {
            var array = element.data.split(',');
            $(array).each(function () {

                if (this.length > 0 && this.split('_')[2] == parentvalue) {
                    var obj: any = {};
                    obj[element.valuefield] = this.split('_')[0];
                    obj[element.textfield] = this.split('_')[1];
                    obj.color = this.split('_')[3];
                    objs.push(obj);

                    if (this.split('_')[0] == selectvalue) {
                        element.setObject(obj);
                        var ttext = element.get("selecttext");
                        element.set("selecttext", ttext + " " + this.split('_')[1]);
                    }
                }
            });
        }
        if (objs) {
            if (objs.length > 0) {
                if (element.defaultoption) {
                    var obj = {};
                    obj[element.valuefield] = "";
                    obj[element.textfield] = element.defaultoption;
                    objs.unshift(obj);
                }
                var wrapper = element.get("wrapper");
                var display = element.get("display");

                var select = document.createElement("select");
                wrapper.appendChild(select);

                var objselects = element.get("selects");
                objselects.push(select);
                element.set("selects", objselects);

                $(select).combobox({
                    valueField: element.valuefield,
                    textField: element.textfield,
                    width: element.width || 170,
                    editable: false,
                    loadData: objs,
                    onChange: function (newValue, oldValue) {
                    },
                    onClick: function (record) {
                        $("div.combo-panel").show();
                    },
                    onSelect: function (record) {
                        element.setObject(record);
                        $("div.combo-panel").hide();
                        element.triggerEventHandler("onafterchange", [record]);
                    }
                });

                $(select).combobox('loadData', objs);
                if (selectvalue != "") {
                    $(select).combobox('setValue', element.getObject()[element.textfield]);
                }
            }
        }
    }
}


//【授权】
class GfAuthorization extends CustomElement {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-Authorization";
        this.addProperties("whentoshow,dataurl");
        this.addMethod("load", `function(entity){ control.load(this,entity); }`);
        this.addMethod("hide", `function(){ control.hide(this); }`);
    }

    protected load(element, entity) {
        var control = this;
        window["platformAjax"]({
            url: element.dataurl || document.body["getauthorizationurl"],
            sync: true,
            data: { id: entity.id },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                if (obj.NotExists) {
                    element.hide();
                    return;
                }
                var Permissions = JSON.parse(obj.Permissions);
                var current = control.stringToObject(obj.Current);
                var AllowPrivate = obj.AllowPrivatePermission;

                //当前权限对象的读取权
                var currentRead = current.permissioncode[1] === '1';
                //源对象的授权权
                var sourceAuthorize = obj.PermissionCode[4] === '1';

                element.set("source", entity);
                element.set("Current", current);
                element.set("Permissions", Permissions);
                element.set("model", obj);

                control.clearMenu(element);

                var menu = element.get("menu");


                if (currentRead) {
                    $('#' + menu.id).menu('appendItem', {
                        text: '查看当前权限',
                        iconCls: '',
                        onclick: function () {
                            document.body["openObjDetail"]({
                                controlid: null,
                                objid: current.id,
                                klass: current.klass,
                                title: current.combinedtitle
                            });
                        }
                    });

                    $('#' + menu.id).menu('appendItem', {
                        separator: true
                    });
                }


                if (sourceAuthorize) {

                    if (AllowPrivate) {
                        $('#' + menu.id).menu('appendItem', {
                            text: '分派“私有权限”',
                            iconCls: '',
                            onclick: function () {
                                control.createPrivatePermission(element);
                            }
                        });
                    }

                    $(Permissions).each(function () {

                        var id = this.Id.replace("@", "-");
                        var label = this.Label;
                        var description = this.Description;
                        var isCurrent = this.IsCurrent;
                        var code = this.PermissionCode;
                        var icon = "";
                        if (this.IsDefault) {
                            label += '[默认]';
                        }
                        if (this.IsCurrent) {
                            icon = 'fa fa-check iconfont';
                        }
                        else{
                            label = '分派“' + label + '“';
                        }

                        var item = {
                            id: id,
                            description: description,
                            isCurrent: isCurrent,
                            text: code[0] === '1' ? label : '无发现权',//权限对象的发现权
                            iconCls: icon,
                            onclick: function () {
                                if (!item.isCurrent) {
                                    control.authorize(element, item.id, null);
                                }
                            }
                        };
                        $('#' + menu.id).menu('appendItem', item);
                        $('#' + item.id).attr("title",description);
                        element.get("menuItems").push(item);

                    });
                }
            }
        });
    }

    protected hide(element) {
        var menu = element.get("menu");
        $(menu).menu("hide");
        $(menu).hide();
        $(element).hide();

    }

    protected clearMenu(element) {
        var menu = element.get("menu");
        var items = element.get("menuItems");
        $(items).each(function () {
            var item = $('#' + menu.id).menu('findItem', this.text);
            $(item.target).remove();
        });
        $(menu).html("");
        element.set("menuItems", []);

    }

    protected createPrivatePermission(element) {
        var control = this;
        control.confirm("将为当前对象分派私有权限。<br>初始私有权限复制于当前对象的“默认权限”，以便编辑设置该私有权限。<br>【确定】继续分派，【取消】返回",function(){
            window["platformAjax"]({
                url: document.body["getnewprivatepermissionurl"],
                sync: true,
                data: { id: element.get("source").id },
                success: function (result) {
                    var permission = JSON.parse(result.Data);
                    document.body["openObjDetail"]({
                        controlid: permission.id,
                        objid: permission.id,
                        klass: 'ObjektPermission',
                        title: permission.combinedtitle,
                        oninitLoaded: function () {
                            this.setState("edit");
                        }
                    });
                }
            });
        });
        

    }

    protected authorize(element, permissionId, onsuccess) {
        window["platformAjax"]({
            url: document.body["authorizeurl"],
            data: { id: element.get("source").id, permissionId: permissionId },
            success: onsuccess || function (result) { }
        });
    }

    protected initContent(element) {
        var button = document.createElement("a");
        var menuid = this.GetUniqueId("menu");
        $(button).addClass("easyui-menubutton"); 
        $(button).text("权限");
        $(button).attr("href", "javascript:void(0)");
        $(button).attr("data-options", "menu:'#" + menuid + "',iconCls:'fa fa-key iconfont'");
        button.id = this.GetUniqueId("menubutton");

        var menu = document.createElement("div");
        menu.id = menuid;
        $(menu).hide();
        $(menu).css("width", 220);

        $(button).blur(function () {
            if (!element.get("clicked")) {
                $(menu).menu("hide");
                $(menu).hide();
            }
        });
        $(button).click(function () {
            element.triggerEventHandler("onBeforeShow");
            element.set("clicked", true);
            $(menu).menu("show");
            $(menu).show();
            element.triggerEventHandler("onAfterShow");
        });
        $(button).mouseout(function () {
            element.set("clicked", false);
        });

        element.appendChild(menu);
        element.appendChild(button);
        element.set("button", button);
        element.set("menu", menu);
        element.set("menuItems", []);

        $("#" + button.id).menubutton({
            iconCls: 'fa fa-key',
            menu: '#' + menuid
        });
        
        $(button).children("span").css("border","1px solid #e1e6eb");     
        $(button).children("span").css("border-radius","3px"); 
        $(button).children("span").attr("title","权限"); 
    }
}

//【生成UML参数】
class GfUmlParams extends CustomElement {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.elementName = "Gf-UmlParams";
        this.addProperties("ids,getumlurl,checkumlurl,listdataurl");
        this.addMethod("open", `function(){ control.open(this); }`);
    }

    protected initContent(element) {
        var control = this;
        var listData;
        window["platformAjax"]({
            url: element.listdataurl || document.body["getlistdataurl"],
            sync: true,
            data: { listid: 'a91676b8d73046d6aa29b2d87df7f73a@List' },
            success: function (result) {
                listData = result.Data;
                var array = listData.split(',');
                var options = '';
                $(array).each(function () {
                    if (this != "") {
                        options += `<option value ="` + this.split('_')[0] + `">` + this.split('_')[1] + `</option>`;
                    }
                });
                var form = document.createElement("form");
                $(form).html(`
                <div>
                    <table>
                        <tr>
                            <th class="PropertyLabel">展开 :</th>
                            <td class="PropertyValue">
                            <select name="extendingLayerNum">
                                <option value ="0">0</option>
                                <option value ="1" selected = "selected" >1</option>
                                <option value ="2">2</option>
                                <option value ="3">3</option>
                                <option value ="10">不限</option>
                            </select>层
                            </td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">简化继承 :</th>
                            <td class="PropertyValue"> <input type="checkbox" name="conciseGeneration" checked="checked" /></td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">属性关联 :</th>
                            <td class="PropertyValue"> <input type="checkbox" name="showPropertyRelationship" /></td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">显示标签 :</th>
                            <td class="PropertyValue"> <input type="checkbox" name="showLabel" checked="checked" /></td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">生成格式 :</th>
                            <td class="PropertyValue">
                            <select name="format">
                                `+ options + `
                            </select>
                            <input type="hidden" name="ids" value="`+ element.ids + `" />
                            </td>
                        </tr>
                    </table>
                </div>`);
                element.appendChild(form);
                element.set("form", form);
                control.buildButtons(element);
            }
        });


    }

    protected buildButtons(element) {
        var sure = this.createLinkbutton("生成", "fa fa-check", function () {
            var obj = $(element.get("form")).serializeObject();
            obj.conciseGeneration = obj.conciseGeneration == "on";
            obj.showPropertyRelationship = obj.showPropertyRelationship == "on";
            obj.showLabel = obj.showLabel == "on";

            var dialog = element.get("dialog");
            dialog.close();
            window["ajaxLoading"]("正在生成UML，请稍候...");

            window["platformAjax"]({
                url: element.getumlurl || document.body["getumlurl"],
                data: { model: obj },
                success: function (result) {

                    var umlObj = JSON.parse(result.Data);
                    var text = window["unescape"](encodeURIComponent(umlObj.text));
                    text = window["encode64"](window["zip_deflate"](text, 9));

                    window["platformAjax"]({
                        url: element.checkumlurl || document.body["checkumlurl"],
                        sync: true,
                        data: { url: umlObj.url + "check/" + text },
                        success: function (result) {
                            var url = umlObj.url + umlObj.format + "/" + text;
                            window.open(url);
                            window["ajaxLoadEnd"]();
                        }
                    });
                }
            });
        }, {});


        var check = this.createLinkbutton("查看", "fa fa-code", function () {
            var obj = $(element.get("form")).serializeObject();
            obj.conciseGeneration = obj.conciseGeneration == "on";
            obj.showPropertyRelationship = obj.showPropertyRelationship == "on";
            obj.showLabel = obj.showLabel == "on";

            window["platformAjax"]({
                url: element.getumlurl || document.body["getumlurl"],
                sync: true,
                data: { model: obj },
                success: function (result) {
                    var umlObj = JSON.parse(result.Data);
                    var div = document.createElement("div");
                    var textarea = document.createElement("textarea");
                    $(textarea).attr("disabled", "disabled");
                    $(textarea).height("500px");
                    $(textarea).width("750px"); 0
                    $(textarea).val(umlObj.text);
                    $(div).css("padding", "10px")
                    $(div).append(textarea);
                    document.body["openDialog"]({
                        id: element.id + "-checkText",
                        width: 800,
                        height: 600,
                        title: '查看UML源码',
                        content: div
                    });
                }
            });
        }, {});

        var cancel = this.createLinkbutton("取消", "fa fa-times", function () {
            var dialog = element.get("dialog");
            dialog.close();
        }, {});

        var buttonsdiv = document.createElement("div");
        $(buttonsdiv).addClass("dialog-button");
        buttonsdiv.id = this.GetUniqueId("buttonsdiv");
        buttonsdiv.appendChild(sure);
        buttonsdiv.appendChild(check);
        buttonsdiv.appendChild(cancel);
        $(element).append(buttonsdiv);
    }

    protected open(element) {
        var dialog = document.body["openDialog"]({
            id: element.id + "-uml",
            width: 500,
            height: 225,
            title: '生成UML参数',
            content: element
        });
        element.set("dialog", dialog);
    }
}

/*图片验证码
  组件名Gf-VerifyCode

  属性:
  codelength：验证码长度(默认值4,即4个验证码)
  fontsize：字体大小(默认值14字号)
  imgwidth：图片宽度(不填则取父容器宽度)
  imgheight：图片高度(不填则取父容器高度度)
  codekey:验证码Key,用于保证验证码的唯一性,不填则为默认Key

  方法:
  刷新验证码
  document.querySelector("#xxx").Refresh();
  事件:

*/

class GfVerifyCode extends CustomElement {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.autoInit = false;
        this.elementName = "Gf-VerifyCode";
        this.addProperties("codelength,fontsize,imgwidth,imgheight,codekey");
        this.addMethod("Refresh", "function(){control.Refresh(this) }");
    }

    //刷新验证码
    protected Refresh(element) {
        var VerifyCodeImg = element.get("VerifyCodeImg");

        var ImgSrc = element.get("VerifyCodeImgSrc") + "&" + this.GetUniqueId();

        $(VerifyCodeImg).attr("src", ImgSrc);
    }

    protected initContent(element) {
        var container = this.buildControls(element);
    }
    protected buildControls(element) {
        //初始化运行时状态对象
        element.xtag.runtime = {};

        //控件容器
        var container = document.createElement("div");
        $(container).addClass("ImgVerifyCode");
        $(container).css("height", "100%");
        $(container).css("width", "100%");
        element.appendChild(container);

        //图片宽度
        var ImgWidth = element.imgwidth || $(container).width();
        //图片高度
        var ImgHeight = element.imgheight || $(container).height();
        //字体大小
        var FontSize = element.fontsize || 14;
        //验证码长度
        var CodeLength = element.codelength || 4;

        //图片路径
        var ImgSrc = document.body["apppath"] + "/VerifyCode/CreatVerifyCode?" + "VerifyCodeLength=" + CodeLength + "&ImgWidth=" + ImgWidth + "&ImgHeigth=" + ImgHeight + "&FontSize=" + FontSize + "&" + this.GetUniqueId();


        if (element.codekey) {
            ImgSrc += "&VerifyCodeKey=" + element.codekey;
        }

        element.set("VerifyCodeImgSrc", ImgSrc);

        //创建图片
        var VerifyCodeImg = document.createElement("img");
        $(VerifyCodeImg).attr("src", ImgSrc);
        $(VerifyCodeImg).css("cursor", "pointer");
        $(container).append(VerifyCodeImg);
        element.set("VerifyCodeImg", VerifyCodeImg);
        $(VerifyCodeImg).click((e) => {
            this.Refresh(element);
        });
    }
}



/*消息验证码
  组件名Gf-SmsCode

  属性:
  messagetemplateid:消息模版Id
  messagesenderid:消息发送器Id可多个,用','分隔
  accounts:消息接收账户,可多个,用','分隔
  codekey:验证码Key,用于保证验证码的唯一性,不填则为默认短信验证码Key
  width:组件宽度,不填默认150px
  codelength:验证码长度,不填默认长度4  
  方法:


  事件:
   //发送消息前事件
   document.querySelector("xx").registerEventHandler("BeforeSendMessage", function () {});
   //发送消息后事件
   document.querySelector("xx").registerEventHandler("AfterSendMessage", function () {});

*/
class GfMessageCode extends CustomElement {
    constructor(extension?: ICustomElementExtend) {
        super(extension);
        this.autoInit = false;
        this.elementName = "Gf-MessageCode";
        this.addProperties("codekey,width,codelength,accounts,messagetemplateid,messagesenderid");
        this.addMethod("goTo", `function(){ control.goTo(this); }`);      
    }

    protected initContent(element) {
        var container = this.buildControls(element);
    }
    protected buildControls(element) {
        //初始化运行时状态对象
        element.xtag.runtime = {};
        element.id = element.id|| this.GetUniqueId("SmsCode");
        //控件容器
        var container = document.createElement("div");
        $(container).addClass("SmsVerifyCode");
        element.appendChild(container);
        
        var btnSendSmsCss = {
            "width": element.width || "150px",
            "position": "relative",
            "display": "inline - block",
            "zoom": "1",
            "overflow": "visible",
            "vertical-align": "middle",
            "height": "26px",
            "margin": "0",
            "border-width": "1px",
            "border-style": "solid",
            "outline": "0",
            "-webkit-border-radius": "0.2em",
            "-moz-border-radius": "0.2em",
            "border-radius": "0.2em",
            "-webkit-box-shadow": "2px 2px 2px #cfcfcf",
            "-moz-box-shadow": "2px 2px 2px #cfcfcf",
            "box-shadow": "2px 2px 2px #cfcfcf",
            "cursor": "pointer",
            "-moz-background-clip": "padding",
            "background-clip": "padding-box",
            "font": "bold 14px/16px 'SimSun',sans-serif",
            "text-decoration": "none",
            "text-align": "center",
            "white-space": "nowrap",
            "background": "linear-gradient(#fff, #eee)",
            "color": "#333",
            "border-color": "#bdbdbd"
        };

        var that = this;            

        var btnSendSms = document.createElement("input");
        $(btnSendSms).attr("type", "button");
        $(btnSendSms).attr("value", "点击免费获取");
        $(btnSendSms).css(btnSendSmsCss);

        $(btnSendSms).on("mousedown", function () {
            $(this).css({
                "background": "linear-gradient(#eee, #fff)",
                "color": "#333"
            });
        }).on("mousemove", function () {

            $(this).css({
                "background": "linear-gradient(#fff, #f7f7f7)",
                "color": "#333"
            });
        }).on("mouseleave", function () {
            $(this).css(btnSendSmsCss);
        }).on("mouseup", function () {
                $(this).css(btnSendSmsCss);
            }).on("click", function () {
                that.SendSms(element);
            });
        element.set("btnSendSms", btnSendSms);
        $(container).append(btnSendSms);        
    }

    protected SendSms(element)
    {
        element.triggerEventHandler("BeforeSendMessage");
        if (!element.accounts)
        {            
            return;
        }
        var data = {
            messageTemplateId: element.messagetemplateid,
            messageSenderId: element.messagesenderid,
            accounts: element.accounts,
            codeLength: element.codelength || 4};

        if (element.codekey)
        {
            data["smsVerifyCodeKey"] = element.codekey;
        }

        var btnSendSms = element.get("btnSendSms");
        $(btnSendSms).attr("disabled", "false");
        $.ajax({
            url: document.body["apppath"] + "/SendMessage/SendMessageCode",
            type: 'POST',
            dataType: "json",
            data: data,
            async: false,
            success: (result) => {
                if (result.IsSuccess == true) {
                    element.set("TimeNumber", 60);
                    var timerId = setInterval("document.querySelector('#" + element.id + "').goTo()", 1000);
                    element.set("TimerId", timerId);
                }
                else {
                    alert(result.Message);
                    $(btnSendSms).val("失败重新获取");
                    $(btnSendSms).removeAttr("disabled");
                }
               
            }
            
            
        });
        element.triggerEventHandler("AfterSendMessage");
       
    }




    protected goTo(element)
    {
        var btnSendSms= element.get("btnSendSms");
        var TimeNumber = element.get("TimeNumber");
        TimeNumber--;
        element.set("TimeNumber", TimeNumber);
        $(btnSendSms).val(TimeNumber+"秒后可重新发送");
        if (TimeNumber == 0) {
            var TimerId = element.get("TimerId");
            $(btnSendSms).val("点击免费获取");
            clearInterval(TimerId);         
            $(btnSendSms).removeAttr("disabled");   
        }
    }
       
}
