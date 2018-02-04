/// <reference path="UIComponentBase.ts" />

/** 关联对象添加 */
class RocAdd extends UIComponentBase {
    
    constructor() {
        super();
    }
    static elementName = "Gf-RocAdd".toLowerCase();

    /** 可创建新关联对象 */
    get canCreate(){
        return this.safeToString(this.getAttribute("canCreate")).toLowerCase() == "true";
    }
    set canCreate(val){
        this.setAttribute("canCreate",val.toString());
    }
    /** 可选择已有关联对象 */
    get canSelect(){
        return this.safeToString(this.getAttribute("canSelect")).toLowerCase() == "true";
    }
    set canSelect(val){
        this.setAttribute("canSelect",val.toString());
    }
    /** 关联对象创建选项（select：选择已有对象；add：创建新对象。） */
    get createOption(){
        return this.get("list").getObject().value;
    }
    /** 显示标记 */
    get whentoshow(){
        return this.getAttribute("whentoshow");
    }
    set whentoshow(val){
        this.setAttribute("whentoshow",val);
    }
    /** 下拉框值 */
    get listvalue(){
        return this.getAttribute("listvalue");
    }
    set listvalue(val){
        this.setAttribute("listvalue",val);
    }
    /** 下拉框宽度 */
    get listwidth(){
        return this.getAttribute("listwidth");
    }
    set listwidth(val){
        this.setAttribute("listwidth",val);
    }

    public enable(){
        this.get("list").enable();
        $(this.get("button")).linkbutton("enable");
    }

    public disable(){
        this.get("list").disable();
        $(this.get("button")).linkbutton("disable");
    }

    public onCreate(func:()=>void){
        this.addHook(EventNames.Create, func);
    }

    public onRender() {
        var span = document.createElement("span");
        var element = this;
        var list = document.createElement("Gf-ListPropertyView");
        span.appendChild(list);
        element.set("list", list);
        var data = [];
        if (element.canSelect) {
            var obj = {};
            obj["value"] = "select";
            obj["text"] = "引用";
            obj["permissioncode"] = "11111";
            data.push(obj);
        }
        if (element.canCreate) {
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

        var add = this.createButton("新建", "fa fa-plus", function () {
            element.fireHook(EventNames.Create);
        });
        span.appendChild(add);
        element.set("button", add);

        if (!element.canCreate && !element.canSelect) {
            $(list).hide();
            $(add).hide();
        }
        return span;

    }
}
RocAdd.register();