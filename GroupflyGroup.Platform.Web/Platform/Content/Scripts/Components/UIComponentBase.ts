
/// <reference path="Lib/Lib.ts" />
/** 根组件(全局唯一实例) */
var ComponentRoot: Page;

/** UI组件基类 */
abstract class UIComponentBase extends HTMLElement {
    /** 构造函数内无法获取与修改HTML标签属性及子标签，请注意 */
    constructor() {
        super();
        this._storage = {};
        this._state = UIState.browse;
        this.set("firedMessages", []);
        this.set("childrenComponents", []);
        this.set("parentComponent", null);
        this.set("customAttributes", {});
        this.set("eventHandlers", {});

        this._componenteditState = this.createComponentEditState();
        this._componentbrowseState = this.createComponentBrowseState();
        if (this.state == UIState.browse) {
            this._componentState = this._componentbrowseState;
        } else {
            this._componentState = this._componenteditState;
        }
        this.created();
        this.fireHook(EventNames.AfterCreate);
    }

    /** 组件标签名称 */
    public static elementName: string;

    /** 视图状态存储对象 */
    private _storage: any;

    /** 对象数据 */
    private _objektData: Map<string, ObjektModel> = new Map<string, ObjektModel>();

    /** 状态枚举 */
    protected _state: UIState = UIState.browse;

    /** 当前状态对象 */
    private _componentState: UIComponentBaseState;
    /** 当前状态对象 */
    get componentState(): UIComponentBaseState {
        return this._componentState;
    }
    /** 当前状态渲染的标签 */
    private _renderedHTMLElement: HTMLElement;
    /** 当前状态渲染的标签 */
    get renderedHTMLElement(): HTMLElement {
        return this._renderedHTMLElement;
    }



    //缓存两种状态对象以及渲染的DOM结果
    /** 编辑状态对象 */
    private _componenteditState: UIComponentBaseEdit;
    /** 编辑状态dom */
    private _editContent: HTMLElement;
    /** 浏览状态对象 */
    private _componentbrowseState: UIComponentBaseBrowse;
    /** 浏览状态dom */
    private _browseContent: HTMLElement;



    /** 是否有修改 */
    private _isModified: boolean = false;

    /** 修改数据集合（只包含被修改的对象和属性，区别于对象数据集合） */
    protected _changes: Map<string, ObjektModel> = new Map<string, ObjektModel>();

    /** 是否根组件*/
    private _isRoot: boolean = false;

    /** 接受过的消息集合（只保留最近10条） */
    private _firedMessages: Array<string> = new Array<string>();


    /** 组件id */
    get id() {
        return this.getAttribute("id");
    }
    set id(val) {
        this.setAttribute("id", val);
    }

    /** 宽 */
    get width() {
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val);
    }

    /** 初始化前处理标签属性 */
    get onBeforeInitAttribute(){
        var func = `function(){ `+ this.safeToString(this.getAttribute("onBeforeInit")) +` }`;
        return Utils.stringToObject(func) as Function;
    }

    /** 初始化后处理标签属性 */
    get onAfterInitAttribute(){
        var func = `function(){ `+ this.safeToString(this.getAttribute("onAfterInit")) +` }`;
        return Utils.stringToObject(func) as Function;
    }

    /** 高 */
    get height() {
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val);
    }

    /** 状态：编辑-edit，浏览-browse */
    get state() {
        return this._state;
    }
    set state(val) {
        this.switchToState(val);
    }

    /** 是否根组件 */
    get isRoot() {
        return this._isRoot;
    }
    set isRoot(val) {
        this._isRoot = val;
    }

    /** 是否消息边界 */
    get isMessageBoundary() {
        return this.safeToString(this.getAttribute("isMessageBoundary")).toLowerCase() == 'true';
    }
    set isMessageBoundary(val) {
        this.setAttribute("isMessageBoundary", val.toString());
    }

    /** 自定义标签标记 */
    get isUIComponent() {
        return this.safeToString(this.getAttribute("isUIComponent")).toLowerCase() == 'true';
    }

    /**
     * 是否延迟切换到编辑状态
     */
    get isdelayToEdit() {
        return this.safeToString(this.getAttribute("isdelayToEdit")).toLowerCase() == 'true';
    }
    set isdelayToEdit(val) {
        this.setAttribute("isdelayToEdit", val.toString());
    }

    /**
     * 是否延迟切换到浏览状态
     */
    get isdelayToBrowse(): boolean {
        return this.safeToString(this.getAttribute("isdelayToBrowse")).toLowerCase() == 'true';
    }
    set isdelayToBrowse(val) {
        this.setAttribute("isdelayToBrowse", val.toString());
    }

    /** 是否自动初始化 */
    /* get autoInit(){
        return this.safeToString(this.getAttribute("autoInit")).toLowerCase() == 'true';
    }
    set autoInit(val){
        this.setAttribute("autoInit",val.toString());
    } */


    /** 是否自动维护组件树，true则将组件树与组件在DOM中的树结构维持同步；false则需要手工维护；默认值为true。 */
    get autoBuildComponentTree() {
        return this.safeToString(this.getAttribute("autoBuildComponentTree"), "true").toLowerCase() == 'true';
    }
    set autoBuildComponentTree(val) {
        this.setAttribute("autoBuildComponentTree", val.toString());
    }

    /** 是否填充内容完成 */
    get isRendered() {
        return this.safeToString(this.getAttribute("isRendered")).toLowerCase() == 'true';
    }
    set isRendered(val) {
        this.setAttribute("isRendered", val.toString());
    }

    /** 子组件集合 */
    get childrenComponents() {
        return this.get("childrenComponents") as Array<UIComponentBase>;
    }
    set childrenComponents(val) {
        this.set("childrenComponents", val);
    }

    /** 父组件 */
    get parentComponent() {
        return this.get("parentComponent") as UIComponentBase;
    }
    set parentComponent(val) {
        this.set("parentComponent", val);
    }

    /** 自定义属性（用于标签声明式赋值） */
    get customAttributes(): Array<any> {
        return this.stringToObject(this.getAttribute("customAttributes"));
    }

    /** 事件处理程序集合（用于标签声明式赋值） */
    get eventHandlers(): Array<any> {
        return this.stringToObject(this.getAttribute("eventHandlers"));
    }

    /** 组件编辑状态代理对象，由具体子类实现 */
    protected createComponentEditState(): UIComponentBaseEdit {
        return null;
    }

    /** 组件浏览状态代理对象，由具体子类实现 */
    protected createComponentBrowseState(): UIComponentBaseBrowse {
        return null;
    }

    /** 整体刷新对象数据，调用后端API Map<string,ObjektData> ifModified(Map<string,datetime>) 返回相应的对象id和对象数据键值对，如最后修改时间没有变，则对象数据为空 */
    private refreshObjektData() {
        var map = new Map<string, string>();
        for (var [k, v] of this._objektData) {
            map.set(k, v["modifiedOn"] || "");
        }
        this.ifModified(map);
    }

    private ifModified(map: Map<string, string>) {
        var element = this;
        element.ajax({
            url: ComponentRoot.APIs.ifModified,
            sync: true,
            data: { map: Utils.mapToJson(map) },
            success: function (result) {
                var models: ObjektCollectionModel = JSON.parse(result.Data);
                for (var model of models.objekts) {
                    if (!model.$) {
                        model.$ = ObjektState.Original;
                    }
                    element._objektData.set(model.id, model);
                }
            }
        });
    }

    public onBeforeInit(handler:()=>void){
        this.addHook(EventNames.BeforeInit,handler);
    }

    public onAfterInit(handler:()=>void){
        this.addHook(EventNames.AfterInit,handler);
    }
    
    public onAfterCreate(handler:()=>void){
        this.addHook(EventNames.AfterCreate,handler);
    }
    
    public onSaveSucceeded(handler:()=>void){
        this.addHook(EventNames.SaveSucceeded,handler);
    }
    
    public onAfterSave(handler:()=>void){
        this.addHook(EventNames.AfterSave,handler);
    }
    
    public onAjaxError(handler:(rezult:any)=>void){
        this.addHook(EventNames.AjaxError,handler);
    }
    
    public onObjectsSelectedChange(handler:(oldSelected:ObjektModel[], newSelected:ObjektModel[])=>void){
        this.addHook(EventNames.ObjectsSelectedChange,handler);
    }
    
    public onAfterRefresh(handler:()=>void){
        this.addHook(EventNames.AfterRefresh,handler);
    }
    
    public onAfterAdopt(handler:()=>void){
        this.addHook(EventNames.AfterAdopt,handler);
    }
    
    public onAfterConnect(handler:()=>void){
        this.addHook(EventNames.AfterConnect,handler);
    }
    
    public onAfterDisconnect(handler:()=>void){
        this.addHook(EventNames.AfterDisconnect,handler);
    }
    
    public onAfterAttributeChange(handler:(oldValue,newValue)=>void){
        this.addHook(EventNames.AfterAttributeChange,handler);
    }

    public onEditStateChange(handler:(oldState:UIState, newState:UIState)=>void){
        this.addHook(EventNames.EditStateChange,handler);
    }

    /** 是否有值改变（遍历自己及子组件，有任意一个_isModified为true则为true）*/
    public isModified() {
        var flag = false;
        if (this._isModified) {
            return true;
        }
        else {
            for (var child of this.childrenComponents) {
                if (child.isModified()) {
                    flag = true;
                }
            }
        }
        return flag;
    }

    /** 
     * 设置是否修改
     * @param isModified 是否有修改
     */
    public setModified(isModified: boolean) {
        this._isModified = isModified;
    }

    /** 
     * 根据id获取对象（数据共享）
     * @param objektIds 对象id集合
     */
    public getObjektData(objektIds: Array<string>): Map<string, ObjektModel> {
        if (!this.isBoundary()) {
            return this.parentComponent.getObjektData(objektIds);
        }
        var datas = new Map<string, ObjektModel>();
        var absence = [];

        for (var id of objektIds) {
            if (this._objektData.has(id)) {
                var obj = this._objektData.get(id);
                datas.set(id, obj);
            }
            else {
                if (id != "\"\"") {
                    absence.push(id);
                }
            }
        }
        if (absence.length > 0) {
            var element = this;
            element.ajax({
                url: ComponentRoot.APIs.getObjekts,
                sync: true,
                data: { ids: absence },
                success: function (result) {
                    var models = JSON.parse(result.Data);
                    for (var model of models.objekts) {
                        if (!model.$) {
                            model.$ = ObjektState.Original;
                        }
                        element._objektData.set(model.id, model);
                        datas.set(model.id, model);
                    }
                }
            });
        }
        return datas;
    }

    /** 
     * 根据条件查询对象集合（数据共享）
     * @param query 查询参数模型
     * @param success 成功处理函数（参数：ocModel:ObjektCollectionModel）
     * @param finallyCall 结束处理函数（参数：result）
     */
    public getObjektCollection(query: QueryModel,success:(model:ObjektCollectionModel)=>void, finallyCall?:(result)=>void){
        if(!this.isBoundary()){
            this.parentComponent.getObjektCollection(query, success);
        }
        else{
            this.ajax({
                url: ComponentRoot.APIs.getListdata,
                data: query,
                success: (result) =>{
                    var ocModel = JSON.parse(result.Data) as ObjektCollectionModel;
                    for(var model of ocModel.objekts){
                        model.$ = ObjektState.Original;
                        this._objektData.set(model.id, model);
                    }
                    if(success){
                        success(ocModel);
                    }
                },
                finallyCall:(result) =>{
                    if(finallyCall){
                        finallyCall(result);
                    }
                }
            });
        }
    }

    /** 
     * 获取包含对象数据的自定义数据包（可自定义数据对象结构，但必须包含对象数据属性：objektCollections:Array<ObjektCollectionModel>），其中的对象数据部分共享。
     * @param api 获取数据的服务端api
     * @param params api参数对象
     * @param success 成功处理函数（参数：result）
     * @param finallyCall 结束处理函数（参数：result）
     */
    public getObjektDataPackage(api:string, params:any,success:Function,finallyCall?:Function){
        if(!this.isBoundary()){
            this.parentComponent.getObjektDataPackage(api, params, success);
        }
        else{
            this.ajax({
                url: api,
                data: params,
                success: (result) =>{
                    var data = JSON.parse(result.Data);
                    if(!data.objektCollections){
                        throw new Error("数据包格式错误：未包含对象数据属性objektCollections:Array<ObjektCollectionModel>");
                    }
                    let collections = data.objektCollections as Array<ObjektCollectionModel>;
                    for(var ocModel of collections){
                        for(var model of ocModel.objekts){
                            model.$ = ObjektState.Original;
                            this._objektData.set(model.id, model);
                        }
                    }
                    if(success){
                        success(result);
                    }
                },
                finallyCall:(result) =>{
                    if(finallyCall){
                        finallyCall(result);
                    }
                }
            });
        }
    }

    /** 
     * 获取新对象
     * @param klassName 类名
     * @param relatedPropertyNames 关联属性名称，','分隔
     */
    public newObjekt(klassName: string, relatedPropertyNames?: string):ObjektModel {
        if(!this.isBoundary()){
           return this.parentComponent.newObjekt(klassName,relatedPropertyNames);
        }
        else{
            var element = this;
            var obj = new ObjektModel();
            element.ajax({
                url: ComponentRoot.APIs.getObjekt,
                sync: true,
                data: {
                    id: '@' + klassName,
                    relatedPropertyNames: relatedPropertyNames
                },
                success: function (result) {
                    var model = JSON.parse(result.Data);
                    for (var property in model) {
                        obj[property] = model[property];
                    }
                    obj.$ = ObjektState.Created;
                    element._objektData.set(obj.id, obj);
                }
            });
            return obj;
        }
    }

    /** 
     * 删除对象数据，在onObjektDataWriteback中使用
     * @param objekts 对象数据集合
     */
    public deleteObjekts(objekts: Array<ObjektModel>) {
        if (!this.isRoot) {
            ComponentRoot.updateObjekts(objekts);
        }
        else {
            if (objekts && objekts.length > 0) {
                for (var objekt of objekts) {
                    if (this._changes.has(objekt.id)) {
                        var change = this._changes.get(objekt.id);
                        if (!change.$ || change.$ == ObjektState.Original) {
                            change.$ = ObjektState.Deleted;
                        }

                        switch (change.$) {
                            case ObjektState.Created:
                                this._changes.delete(objekt.id);
                                break;
                            case ObjektState.Updated:
                                objekt.$ = ObjektState.Deleted;
                                this._changes.set(objekt.id, objekt);
                                break;
                            default:
                                break;
                        }

                    }
                    else {
                        objekt.$ = ObjektState.Deleted;
                        this._changes.set(objekt.id, objekt);
                    }
                }
            }
        }
    }

    /** 
     * 修改对象数据，在onObjektDataWriteback中使用
     * @param objekts 对象数据集合
     */
    public updateObjekts(objekts: Array<ObjektModel>) {
        if (!this.isRoot) {
            ComponentRoot.updateObjekts(objekts);
        }
        else {
            if (objekts && objekts.length > 0) {
                for (var objekt of objekts) {
                    if (this._changes.has(objekt.id)) {
                        var change = this._changes.get(objekt.id);
                        if (!change.$ || change.$ == ObjektState.Original) {
                            change.$ = ObjektState.Updated;
                        }
                        switch (change.$) {
                            case ObjektState.Created:
                            case ObjektState.Updated:
                                for (var name in objekt) {
                                    if (name != "$")
                                        change[name] = objekt[name];
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        objekt.$ = ObjektState.Updated;
                        this._changes.set(objekt.id, objekt);
                    }
                }
            }
        }
    }

    /** 
     * 创建对象数据，在onObjektDataWriteback中使用
     * @param objekts 对象数据集合
     */
    public createObjekts(objekts: Array<ObjektModel>) {
        if (!this.isRoot) {
            ComponentRoot.updateObjekts(objekts);
        }
        else {
            if (objekts && objekts.length > 0) {
                for (var objekt of objekts) {
                    if (this._changes.has(objekt.id)) {
                        var change = this._changes.get(objekt.id);
                        if (!change.$ || change.$ == ObjektState.Original) {
                            change.$ = ObjektState.Created;
                        }

                        switch (change.$) {
                            case ObjektState.Created:
                                for (var name in objekt) {
                                    if (name != "$")
                                        change[name] = objekt[name];
                                }
                                break;
                            default:
                                throw new Error("无法创建已存在的对象");
                        }

                    }
                    else {
                        objekt.$ = ObjektState.Created;
                        this._changes.set(objekt.id, objekt);
                    }
                }
            }
        }

    }

    /**
     * 把组件的属性值写入ObjektData，如componentState有效，转交componentState
     */
    protected onObjektDataWriteback() {
        if (this._componentState) {
            this._componentState.onObjektDataWriteback();
        }

    }

    /**
     * 遍历子组件+自己搜集对象数据，并触发onObjektDataWriteback
     */
    protected objektDataWriteback() {
        if (this._isModified) {
            this.onObjektDataWriteback();
        }
        if (this.childrenComponents) {
            for (var child of this.childrenComponents) {
                child.objektDataWriteback();
            }
        }
    }

    /**
     * 清除修改 
     */
    protected clearChanges(){
        this.setModified(false);
        if (this.childrenComponents) {
            for (var child of this.childrenComponents) {
                child.clearChanges();
            }
        }
    }

    /**
     * 保存当前组件及其子组件的所有修改 
     */
    public save() {
        this.objektDataWriteback();
        if (ComponentRoot._changes.size == 0) {
            return;
        }
        Utils.ajaxLoading();
        var changes = Utils.mapToArray(this._changes);
        var element = this;
        this.ajax({
            url: ComponentRoot.APIs.save,
            data: { changes: JSON.stringify(changes) },
            success: function (result) {
                ComponentRoot._changes.clear();
                element.clearChanges();
                element.sendMessage(new UIMessageSaved());
                element.fireHook(EventNames.SaveSucceeded);
                element.refreshObjektData();
            },
            finallyCall: function (result) {
                element.fireHook(EventNames.AfterSave);
                Utils.ajaxLoadEnd();
            }
        });
    }

    /**
     * 注册组件自定义标签
     */
    public static register() {
        if (this.elementName) {
            window["customElements"].define(this.elementName, this);
        }
    }


    /**
     * 弹出提示框
     * @param message 消息内容
     */
    public alert(message: string) {
        $.messager.alert('提示', message);
    }

    /**
     * 弹出确认提示框
     * @param message 消息内容
     * @param message 点击“确定”按钮的处理程序
     */
    public confirm(message: string, todo: Function) {
        $.messager.confirm('请确认', message, function (r) {
            if (r) {
                todo();
            }
        });
    }

    /**
     * 查询对象属性数
     * @param obj 对象
     * @param exceptions 不参与计算的例外属性集合
     */
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

    /**
     * 判断对象是否是字符串
     * @param obj 对象
     */
    protected isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    }

    /**
     * 对象转换为字符串，如果对象为null或者undefined则取默认值（默认为空字符串）。
     * @param obj 对象
     * @param defaultValue 默认值，可选（默认为空字符串）
     */
    protected safeToString(obj: Object, defaultValue?: string) {
        if (obj === null || obj === undefined) {
            if (defaultValue === null || defaultValue === undefined) {
                defaultValue = '';
            }
            return defaultValue;
        }
        return obj.toString();
    }

    /**
     * 字符串转对象
     */
    protected stringToObject(str) {
        return eval("(" + str + ")");
    }

    /**
     * 在页面头部添加脚本引用
     * @param source 脚本资源路径
     */
    public includeJS(source) {
        if (source) {
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.src = source;
            if ($("head")[0].innerHTML.indexOf(source) === -1) {
                $('head').append(oScript);
            }
        }
    }

    /**
     * 在页面头部添加样式引用
     * @param source 样式资源路径
     */
    protected includeStyle(source) {
        if (source) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = source;
            if ($("head")[0].innerHTML.indexOf(source) === -1) {
                $('head').append(link);
            }
        }
    }

    /**
     * 生成唯一id
     * @param prefix 前缀
     */
    public getUniqueId(prefix?: string) {
        return Utils.getUniqueId(prefix);
    }

    /**
     * 保存视图状态数据
     * @param name 存储键值
     * @param obj 要存储的对象
     */
    protected set(name: string, obj: any) {
        this._storage[name] = obj;
    }

    /**
     * 获取视图状态数据
     * @param name 存储键值
     */
    protected get(name: string): any {
        return this._storage[name];
    }

    /**
     * 设置额外参数
     * @param name 参数名称
     * @param obj 参数值
     */
    public setExtraParams(name: string, obj: any) {
        this.get("ExtraParams")[name] = obj;
    }

    /**
     * 获取额外参数
     * @param name 参数名称
     */
    public getExtraParams(name: string): any {
        return this.get("ExtraParams")[name];
    }

    /**
     * 保存自定义属性
     * @param name 属性名
     * @param obj 属性值
     */
    public setCustomAttribute(name: string, obj: any) {
        this._storage["customAttributes"][name] = obj;
    }

    /**
     * 获取自定义属性
     * @param name 属性名
     */
    public getCustomAttribute(name: string): any {
        return this._storage["customAttributes"][name];
    }

    /**
     * 添加事件处理程序
     * @param name 事件名称
     * @param handler 事件处理程序（系统会自动为参数列表起始位置添加一个事件对象参数）
     */
    protected addHook(name: string, handler?: Function) {
        if (!this._storage["eventHandlers"][name]) {
            this._storage["eventHandlers"][name] = [];
        }
        if (!handler) {
            handler = function () { };
        }
        this._storage["eventHandlers"][name].push(handler);
    }

    /**
     * 添加事件处理程序并覆盖该事件的原有处理程序
     * @param name 事件名称
     * @param handler 事件处理程序（系统会自动为参数列表起始位置添加一个事件对象参数）
     */
    protected overrideHook(name: string, handler?: Function) {
        if (!handler) {
            handler = function () { };
        }
        this._storage["eventHandlers"][name] = [];
        this._storage["eventHandlers"][name].push(handler);
    }

    /**
     * 触发组件事件
     * @param name 事件名称
     * @param params 处理程序参数列表
     * @param event 事件对象
     */
    protected fireHook(name: string, params?: Array<any>) {
        var handlers = this._storage["eventHandlers"][name];
        if (handlers) {
            for (var handler of handlers) {
                handler.apply(this, params);
            }
        }
    }

    /** 是否边界（消息边界或组件树根）*/
    protected isBoundary(message?: UIMessage) {
        var isBoundary = false;
        if (this.isRoot || !this.parentComponent) {
            isBoundary = true;
        }
        else if (this.isMessageBoundary) {
            if (!message || !message.isIgnoreMessageBoundary) {
                isBoundary = true;
            }
        }
        return isBoundary;
    }

    /**
     * 向上报告消息，直到消息边界或者组件树根
     * @param message 消息
     * @param source 消息发送源组件
     */
    private reportMessage(message: UIMessage, source: UIComponentBase) {        
        if (this.isBoundary(message)) {
            message.boundary = this;
            this.broadcastMessage(message, source);
        }
        else {
            this.parentComponent.reportMessage(message, source);
        }
    }

    /**
     * 消息边界或组件树根向下广播消息，重复广播检查（健壮性保证，一个10元素的已处理消息队列）
     * @param message 消息
     * @param source 消息发送源组件
     */
    private broadcastMessage(message: UIMessage, source: UIComponentBase) {
        if (this._firedMessages.indexOf(message.id) >= 0) {
            return;
        }
        this._firedMessages.push(message.id);

        while (this._firedMessages.length > 10) {
            this._firedMessages.shift();
        }

        if (this.childrenComponents) {
            for (var child of this.childrenComponents) {
                child.broadcastMessage(message, source);
            }
        }
        this.onRecievedMessage(message, source);
    }

    /**
     * 发送消息（向上报告到根组件，再向子组件广播）
     * @param message 消息
     */
    public sendMessage(message: UIMessage) {
        this.reportMessage(message, this);
    }

    /**
     * 底层ajax调用封装
     * @param option ajax参数
     */
    public ajax(option: any) {
        if (this._storage["eventHandlers"][EventNames.AjaxError]) {
            var component = this;
            option.error = function (rezult) {
                component.fireHook(EventNames.AjaxError, [rezult]);
            };
        }
        window["platformAjax"](option);
    }

    /**
     * 添加子组件
     * @param component 子组件
     */
    public addChildComponent(component: UIComponentBase) {
        if (this.childrenComponents.indexOf(component) < 0) {
            this.childrenComponents.push(component);
        }
        component.parentComponent = this;
    }

    /**
     * 移除子组件
     * @param component 子组件
     */
    public removeChildComponent(component: UIComponentBase) {
        if (!this.childrenComponents) {
            this.childrenComponents = [];
            return;
        }
        var children = window["removeObjFromArray"](this.childrenComponents, "id", component.id);
        this.childrenComponents = children;
        component.parentComponent = null;
    }

    /**
     * 创建按钮
     * @param text 按钮文字
     * @param iconCls 按钮样式类
     * @param onclick 按钮点击处理程序
     * @param options 自定义属性
     */
    public createButton(text: string, iconCls: string, onclick: Function, options?: any) {
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

    /**
     * 创建后事件
     */
    protected created() { }

    /**
     * 渲染
     */
    private render(): void {
        
        let element;
        if (this.state == UIState.browse && this._browseContent) {//渲染结果缓存
            element = this._browseContent;
            this._renderedHTMLElement = element;
            this.isRendered = true;
            return;
        } else if (this.state == UIState.edit && this._editContent) {//渲染结果缓存
            element = this._editContent;
            this._renderedHTMLElement = element;
            this.isRendered = true;
            return;
        } else if (this._componentState) {//状态类负责
            element = this._componentState.onRender();
            if (this._componentState.onRenderFunc) {
                element = this._componentState.onRenderFunc.apply(this._componentState, [element]);
            }
            this._renderedHTMLElement = element;
            if (this.state == UIState.browse && !this._browseContent) {
                this._browseContent = this.renderedHTMLElement;
                this.appendChild(this.renderedHTMLElement);

            } else if (this.state == UIState.edit && !this._editContent) {
                this._editContent = this.renderedHTMLElement;
                this.appendChild(this.renderedHTMLElement);
            }
            this.isRendered = true;
            element = this._componentState.afterRender();
            return;
        } else {//组件类负责
            if (this._renderedHTMLElement) {
                this.isRendered = true;
                return;
            } else {
                element = this.onRender();
                if (this.onRenderFunc) {
                    element = this.onRenderFunc.apply(this, [element]);
                }
                this._renderedHTMLElement = element;
                this.appendChild(this.renderedHTMLElement);
            }
            this.isRendered = true;
            element = this.afterRender();
            return;
        }

    }

    /**
     * 当组件渲染时的回调
     */
    public onRenderFunc: (element: HTMLElement) => HTMLElement;

    /**
     * 当组件渲染时。如果组件的渲染不区分状态，即浏览状态和编辑状态返回的HTMLElement是一样的，重写该方法；
     * 跟状态有关，需派生状态类，在状态类上实现render逻辑，
     * 有状态类，组件上的onRender将被忽略
     */
    public onRender(): HTMLElement {
        return null;
    }
    /**
     * 当组件渲染后
     */
    public afterRenderFunc: () => void;

    /**
     * 当组件渲染后
     */
    public afterRender(): void {
        return;
    }
    /**
     * 接受消息 
     */
    protected onRecievedMessage(message: UIMessage, source: UIComponentBase) {
        if (message instanceof UIMessageSaving) {
            if (message.boundary == this && this.isModified()) {
                var MessageSaving = message as UIMessageSaving;
                if (MessageSaving.continuing) {
                    this.save();
                }
                else if (MessageSaving.isIgnorable) {
                    this.confirm(MessageSaving.getReasons(), ()=>{ this.save();});
                }
                else{
                    this.alert(MessageSaving.getReasons());
                }
            };
        }
        else if (message instanceof UIMessageStateSwitching) {
            var StateSwitching = message as UIMessageStateSwitching;
            if (message.boundary == this) {
                if (this.isModified() && StateSwitching.currentState == UIState.browse) {
                    StateSwitching.preventDoing(PreventDoingReason.notSaved);
                }
                var todo = () => {
                    this.switchToStateMayDelay(StateSwitching.currentState);
                    this.sendMessage(new UIMessageStateSwitched(message.originalState, message.currentState));
                }
                if (StateSwitching.continuing) {
                    todo();
                }
                else if (StateSwitching.isIgnorable) {
                    this.confirm(StateSwitching.getReasons(), todo);
                }
            }
        }
        else if (message instanceof UIMessageStateSwitched) {
            var StateSwitched = message as UIMessageStateSwitched;
            this.switchToStateMayDelay(StateSwitched.currentState);
        }

        else if (message instanceof UIMessageObjektSelecting) {
            var ObjektSelecting = message as UIMessageObjektSelecting;
            if (message.boundary == this) {
                var todo = () => {
                    this.sendMessage(new UIMessageObjektSelected(message.originalSelected, message.currentSelected));
                }
                if (ObjektSelecting.continuing) {
                    todo();
                }
                else if (ObjektSelecting.isIgnorable) {
                    this.confirm(ObjektSelecting.getReasons(), todo);
                }
            };
        }
        else if (message instanceof UIMessageObjektSelected) {
            var ObjektSelected = message as UIMessageObjektSelected;
            this.fireHook(EventNames.ObjectsSelectedChange, [message.originalSelected, message.currentSelected]);
        }

        else if (message instanceof UIMessageRefreshing) {
            var Refreshing = message as UIMessageRefreshing;
            if (message.boundary == this) {
                if (this.isModified()) {
                    message.preventDoing(PreventDoingReason.notSaved);
                }
                var todo = () => {
                    this.refreshObjektData();
                    this.sendMessage(new UIMessageRefreshed());
                }
                if (Refreshing.continuing) {
                    todo();
                }
                else if (Refreshing.isIgnorable) {
                    this.confirm(Refreshing.getReasons(), todo);
                }
            }
        }
        else if (message instanceof UIMessageRefreshed) {
            this.fireHook(EventNames.AfterRefresh);
        }

        if (this._componentState) {
            this._componentState.onRecievedMessage(message, source);
            if (this._componentState.onRecievedMessageFunc) {
                this._componentState.onRecievedMessageFunc.apply(this);
            }
        }
    }


    /**
     * 切换状态 
     * @param state 状态枚举
     */
    protected switchToState(state: UIState) {
        if (state == this._state) {
            return;
        }
        this._state = state;

        if (state == UIState.edit) {
            if (this._componenteditState) {
                this._componentState = this._componenteditState;
            }
        }
        else if (state == UIState.browse) {
            if (this._componentbrowseState) {
                this._componentState = this._componentbrowseState;
            }
        }
        $(this.renderedHTMLElement).hide();
        this.render();
        $(this.renderedHTMLElement).show();

        this.fireHook(EventNames.EditStateChange);
    }

    /**
     * (可能延迟)切换状态
     * @param state 状态枚举
     */
    private switchToStateMayDelay(state: UIState) {
        if (state == UIState.browse && this.isdelayToBrowse) {
            return;
        }
        if (state == UIState.edit && this.isdelayToEdit) {
            return;
        }
        this.switchToState(state);
    }

    /**
     * 初始化
     */
    public init() {
        var element = this;
        if (!element.isRendered) {

            if (this.customAttributes) {
                var attributes = this.get("customAttributes");
                var newone = this.stringToObject(this.customAttributes);
                for (var name in newone) {
                    attributes[name] = newone[name];
                }
                this.set("customAttributes", attributes);
            }

            if (this.eventHandlers) {
                var handlers = this.get("eventHandlers");
                var newone = this.stringToObject(this.eventHandlers);
                for (var name in newone) {
                    handlers[name] = newone[name];
                }
                this.set("eventHandlers", handlers);
            }

            if(this.onBeforeInitAttribute){
                this.onBeforeInitAttribute.apply(this);
            }
            element.fireHook(EventNames.BeforeInit);
            Hooks.doBefore(BeforeComponentInitHook, new HookContext(this));
            
            this.render();
            if (!element.id) { element.id = this.getUniqueId(this.tagName.toLowerCase()); }
            $(element).addClass("Components");
            
            if(this.onAfterInitAttribute){
                this.onAfterInitAttribute.apply(this);
            }
            element.fireHook(EventNames.AfterInit);
            Hooks.doAfter(AfterComponentInitHook, new HookContext(this));
        }
    }

    /**
     * 插入DOM回调
     */
    protected connected() {
        /* var element = this;
        if (this.autoInit) {
            $(element).ready(function () {
                element.init();
            });
        } */
    }

    /**
     * 移出DOM回调
     */
    protected disconnected() {

    }

    /**
     * 属性改变回调
     */
    protected attributeChanged(name, oldValue, newValue) {

    }

    /**
     * 父节点变更回调
     */
    protected adopted() {

    }

    /**
     * 标签插入DOM回调事件
     */
    private connectedCallback() {
        this.setAttribute("isUIComponent", "true");

        if (!this.parentComponent && this.autoBuildComponentTree && !this.isRoot) {
            var parent = $(this).parents("[isUIComponent]")[0] as UIComponentBase;
            if (!parent) {
                parent = ComponentRoot;
            }
            parent.addChildComponent(this);
        }
        this.connected();
        this.fireHook(EventNames.AfterConnect);
        this.init();
    }

    /**
     * 标签移出DOM回调事件
     */
    private disconnectedCallback() {
        if (this.parentComponent && this.autoBuildComponentTree) {
            this.parentComponent.removeChildComponent(this);
        }
        this.disconnected();
        this.fireHook(EventNames.AfterDisconnect);
    }

    /**
     * 属性修改后回调事件
     * @param name 属性名称(小写)
     * @param oldValue 修改前属性值
     * @param newValue 修改后属性值
     */
    private attributeChangedCallback(name, oldValue, newValue) {
        this.attributeChanged(name, oldValue, newValue);
        this.fireHook(EventNames.AfterAttributeChange, [oldValue, newValue]);
    }

    /**
     * 需要侦听值改变事件的属性
     */
    static get observedAttributes() { return []; }

    /**
     * 父节点更改后回调
     */
    private adoptedCallback() {
        if (this.parentComponent && this.autoBuildComponentTree) {
            this.parentComponent.removeChildComponent(this);
        }
        if (!this.parentComponent && this.autoBuildComponentTree) {
            var parent = $(this).parents("[isCustomElement]")[0] as UIComponentBase;
            if (!parent) {
                parent = ComponentRoot;
            }
            parent.addChildComponent(this);
        }
        this.adopted();
        this.fireHook(EventNames.AfterAdopt);
    }
}



