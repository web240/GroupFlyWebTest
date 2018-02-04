/** 平台数据类型 */
class DataType {
}
/** 布尔型 */
DataType.BOOLEAN = "f7036b21e6e34919b504df2cfc2d88e2@Value";
/** 整型 */
DataType.INTEGER = "346df36bea7945e5a1a395eb476e6607@Value";
/** 大整型 */
DataType.BIGINT = "b1c68b04908b4982bfd4280cd5b93e77@Value";
/** 单精度浮点型 */
DataType.FLOAT = "cecae31853204b39a6c2569632346a1b@Value";
/** 双精度浮点型 */
DataType.DOUBLE = "8c561fdc3d774ec387a597143dbd1ad5@Value";
/** 数值型 */
DataType.DECIMAL = "a862c03d5cdf4355b5d3a438c81cfbfe@Value";
/** 日期时间型 */
DataType.DATETIME = "229104957d384e72aa32ba288658dd3a@Value";
/** 日期型 */
DataType.DATE = "462e7094194d4f15828ca2e1de2f552b@Value";
/** 时间型 */
DataType.TIME = "ad87c1ec981045bd931d4fcf937697bd@Value";
/** 字符串 */
DataType.STRING = "0ce934524195428aa506260b0f97baf0@Value";
/** 文本 */
DataType.TEXT = "bbf35797f1124a6a89e9111e2ffde111@Value";
/** 二进制型 */
DataType.BINARY = "867da97346bc4eb5b802ed6b8b3b54cc@Value";
/** 对象型 */
DataType.OBJEKT = "c80693211fc4426a88ebca05b34a5f2d@Value";
/** 列表型 */
DataType.LIST = "ab097f34fd9d4b7ca216084e6386b99e@Value";
/** 序列型 */
DataType.SEQUENCE = "6926c35fec59420c8fcac25e7e97ecd0@Value";
/** 密文串 */
DataType.MD5 = "21ea616a571240b491653e13973dd83f@Value";
/** 平台属性名 */
class PropertyNames {
}
/** ID */
PropertyNames.id = "id";
/** 组合标签 */
PropertyNames.combinedLabel = "combinedLabel";
/** 组件事件名称 */
class EventNames {
}
EventNames.AfterSave = "AfterSave";
EventNames.AjaxError = "AjaxError";
EventNames.EditStateChange = "EditStateChange";
EventNames.ObjectsSelectedChange = "ObjectsSelectedChange";
EventNames.Save = "Save";
EventNames.SaveSucceeded = "SaveSucceeded";
EventNames.ValueChange = "ValueChange";
EventNames.Create = "Create";
EventNames.Submit = "Submit";
EventNames.InitLoad = "InitLoad";
EventNames.BeforeInit = "BeforeInit";
EventNames.AfterInit = "AfterInit";
EventNames.AfterCreate = "AfterCreate";
EventNames.AfterConnect = "AfterConnect";
EventNames.AfterDisconnect = "AfterDisconnect";
EventNames.AfterAdopt = "AfterAdopt";
EventNames.AfterAttributeChange = "AfterAttributeChange";
EventNames.AfterRefresh = "AfterRefresh";
EventNames.BeforeClose = "BeforeClose";
EventNames.Close = "Close";
EventNames.Open = "Open";
EventNames.TabLoad = "TabLoad";
EventNames.TabPanelLoad = "TabPanelLoad";
EventNames.TabSelect = "TabSelect";
EventNames.NodeClick = "NodeClick";
EventNames.UploadBeforeSend = "UploadBeforeSend";
EventNames.BeforeShow = "BeforeShow";
EventNames.AfterShow = "AfterShow";
EventNames.Maximize = "Maximize";
EventNames.Restore = "Restore";
EventNames.ToolbarCommand = "ToolbarCommand";
EventNames.ToolbarCommandSuccess = "ToolbarCommandSuccess";
EventNames.CheckToShow = "CheckToShow";
EventNames.AddRow = "AddRow";
EventNames.LoadSuccess = "LoadSuccess";
/** 查询条件操作符 */
class OperationTag {
}
/** 等于 */
OperationTag.Equals = "=";
/** 不等于 */
OperationTag.NotEquals = "!=";
/** 为空 */
OperationTag.IsNull = "N";
/** 不为空 */
OperationTag.IsNotNull = "!N";
/** 大于 */
OperationTag.Greater = ">";
/** 大于等于 */
OperationTag.GreaterOrEquals = ">=";
/** 小于 */
OperationTag.Less = "<";
/** 小于等于 */
OperationTag.LessOrEquals = "<=";
/** 介于（含两端） */
OperationTag.Between = "[..]";
/** 介于（不含两端） */
OperationTag.BetweenInner = "(..)";
/** 包含 */
OperationTag.Contains = "*";
/** 不包含 */
OperationTag.NotContains = "!*";
/** 开始于 */
OperationTag.BeginWith = "=*";
/** 结束于 */
OperationTag.EndWith = "*=";
/** 存在于 */
OperationTag.In = "In";
class IDs {
}
IDs.DirectoryFileTypeID = "d072ec72d0f245e3b80e577c9f0dbfcf@FileType";
/** 对象状态枚举 */
var ObjektState;
(function (ObjektState) {
    /** 原始 */
    ObjektState["Original"] = "O";
    /** 创建 */
    ObjektState["Created"] = "C";
    /** 修改 */
    ObjektState["Updated"] = "U";
    /** 删除 */
    ObjektState["Deleted"] = "D";
})(ObjektState || (ObjektState = {}));
/** 组件状态 */
var UIState;
(function (UIState) {
    /** 编辑状态 */
    UIState["edit"] = "edit";
    /** 浏览状态 */
    UIState["browse"] = "browse";
})(UIState || (UIState = {}));
/** 对象数据模型 */
class ObjektModel {
}
/** API模型 */
class API {
    constructor() {
        this._apis = new Map([
            ["getNewPrivatePermission", ""],
            ["menuHandle", ""],
            ["getListValues", ""],
            ["getUml", ""],
            ["checkUml", ""],
            ["authorize", ""],
            ["getklassTree", ""],
            ["listExport", ""],
            ["save", ""],
            ["getListdata", ""],
            ["rocView", ""],
            ["getObjWithMeta", ""],
            ["edit", ""],
            ["selectObjekt", ""],
            ["reference", ""],
            ["getAuthorization", ""],
            ["error", ""],
            ["uploadFile", ""],
            ["exchangeFile", ""],
            ["setTrash", ""],
            ["getObjekt", ""],
            ["getObjekts", ""],
            ["getNewObjekt", ""],
            ["ifModified", ""],
            ["sendMessageCode", ""],
            ["getLifecycleInfo", ""],
            ["getDashboardInfo", ""],
            ["getPropertyViewOption", ""],
            ["objektCollection", ""],
            ["downloadfile", ""],
            ["exchangefile", ""],
            ["getWidgetInfo", ""]
        ]);
        var apiObject = this;
        $(document).ready(function () {
            for (var [key, value] of apiObject._apis) {
                if (document.body.hasAttribute(key)) {
                    var api = document.body.getAttribute(key);
                    if (api) {
                        apiObject._apis.set(key, api);
                        document.body.removeAttribute(key);
                    }
                }
            }
        });
    }
    getApi(name) {
        if (!this._apis.has(name)) {
            return "";
        }
        if (!this._apis.get(name) && document.body.hasAttribute(name)) {
            this._apis.set(name, document.body.getAttribute(name));
            document.body.removeAttribute(name);
        }
        return this._apis.get(name);
    }
    get exchangefile() {
        return this.getApi("exchangefile");
    }
    get objektCollection() {
        return this.getApi("objektCollection");
    }
    get downloadfile() {
        return this.getApi("downloadfile");
    }
    get getPropertyViewOption() {
        return this.getApi("getPropertyViewOption");
    }
    get getNewPrivatePermission() {
        return this.getApi("getNewPrivatePermission");
    }
    get menuHandle() {
        return this.getApi("menuHandle");
    }
    get getListValues() {
        return this.getApi("getListValues");
    }
    get checkUml() {
        return this.getApi("checkUml");
    }
    get getUml() {
        return this.getApi("getUml");
    }
    get authorize() {
        return this.getApi("authorize");
    }
    get getklassTree() {
        return this.getApi("getklassTree");
    }
    get listExport() {
        return this.getApi("listExport");
    }
    get save() {
        return this.getApi("save");
    }
    get getListdata() {
        return this.getApi("getListdata");
    }
    get rocView() {
        return this.getApi("rocView");
    }
    get getObjWithMeta() {
        return this.getApi("getObjWithMeta");
    }
    get edit() {
        return this.getApi("edit");
    }
    get selectObjekt() {
        return this.getApi("selectObjekt");
    }
    get reference() {
        return this.getApi("reference");
    }
    get getAuthorization() {
        return this.getApi("getAuthorization");
    }
    get error() {
        return this.getApi("error");
    }
    get uploadFile() {
        return this.getApi("uploadFile");
    }
    get exchangeFile() {
        return this.getApi("exchangeFile");
    }
    get setTrash() {
        return this.getApi("setTrash");
    }
    get getObjekt() {
        return this.getApi("getObjekt");
    }
    get getObjekts() {
        return this.getApi("getObjekts");
    }
    get getNewObjekt() {
        return this.getApi("getNewObjekt");
    }
    get ifModified() {
        return this.getApi("ifModified");
    }
    get sendMessageCode() {
        return this.getApi("sendMessageCode");
    }
    get getLifecycleInfo() {
        return this.getApi("getLifecycleInfo");
    }
    get getDashboardInfo() {
        return this.getApi("getDashboardInfo");
    }
    get getWidgetInfo() {
        return this.getApi("getWidgetInfo");
    }
}
/** 对象集合数据模型 */
class ObjektCollectionModel {
}
/** 对象集合查询参数模型 */
class QueryModel {
    constructor() {
        /** 查询条件集合 */
        this.param = new Array();
    }
}
/** 属性查询条件模型 */
class QueryParamModel {
    constructor() {
        this.caseSensitive = true;
    }
}
/** 对象集合视图列模型 */
class ObjektCollectionColumn {
    constructor() {
        this.id = Utils.getUniqueId("column");
        this.styler = function (value, row, index) { };
        this.forbidquery = false;
    }
}
/**
 * 工具类
 */
class Utils {
    /**
     * 生成唯一id
     * @param prefix id随机编码的前缀部分
     */
    static getUniqueId(prefix) {
        return prefix + Date.parse(new Date().toString()).toString(16) + Math.floor(Math.random() * 10000);
    }
    /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
    */
    static strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }
    /**
     *map转换为json
    */
    static mapToJson(map) {
        return JSON.stringify(Utils.strMapToObj(map));
    }
    /**
    *对象转换为Map
    */
    static objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }
    /**
     *json转换为对象，再转为map
     */
    static jsonToMap(jsonStr) {
        return Utils.objToStrMap(JSON.parse(jsonStr));
    }
    /**
     *map转为数组
     */
    static mapToArray(map) {
        var array = [];
        for (let [k, v] of map) {
            array.push(v);
        }
        return array;
    }
    /**
    * 对象数组条件查询,返回第一个匹配对象的index,不匹配则返回-1
    * @param objArray 对象数组
    * @param objPropery 对象属性名
    * @param objValue 对象属性值
    */
    static ObjectArraySearch(objArray, objPropery, objValue) {
        var arrayIndex = -1;
        $(objArray).each(function (index) {
            if (this[objPropery] == objValue) {
                arrayIndex = index;
            }
        });
        return arrayIndex;
    }
    /**
     * 字符串转对象
   * @param str 字符串
     */
    static stringToObject(str) {
        if (!str) {
            return null;
        }
        return eval("(" + str + ")");
    }
    /**
    * 判断对象是否是字符串
    * @param obj 对象
    */
    static isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    }
    /**
    * 判断对象是否是函数
    * @param obj 对象
    */
    static isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }
    /**
    * 执行操作等待提示
    * @param msg 提示消息（可空，默认为‘正在处理，请稍候...’）
    */
    static ajaxLoading(msg) {
        window["ajaxLoading"](msg);
    }
    /**
    * 关闭执行操作等待提示
    */
    static ajaxLoadEnd() {
        window["ajaxLoadEnd"]();
    }
    /* console.log(eq(0, 0)) // true
    console.log(eq(0, -0)) // false

    console.log(eq(NaN, NaN)); // true
    console.log(eq(Number(NaN), Number(NaN))); // true

    console.log(eq('Curly', new String('Curly'))); // true

    console.log(eq([1], [1])); // true
    console.log(eq({ value: 1 }, { value: 1 })); // true

    var a, b;

    a = { foo: { b: { foo: { c: { foo: null } } } } };
    b = { foo: { b: { foo: { c: { foo: null } } } } };
    a.foo.b.foo.c.foo = a;
    b.foo.b.foo.c.foo = b;

    console.log(eq(a, b)) // true */
    static eq(a, b, aStack, bStack) {
        // === 结果为 true 的区别出 +0 和 -0
        if (a === b)
            return a !== 0 || 1 / a === 1 / b;
        // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
        if (a == null || b == null)
            return false;
        // 判断 NaN
        if (a !== a)
            return b !== b;
        // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
        var type = typeof a;
        if (type !== 'function' && type !== 'object' && typeof b != 'object')
            return false;
        // 更复杂的对象使用 deepEq 函数进行深度比较
        return this.deepEq(a, b, aStack, bStack);
    }
    ;
    static deepEq(a, b, aStack, bStack) {
        // a 和 b 的内部属性 [[class]] 相同时 返回 true
        var className = toString.call(a);
        if (className !== toString.call(b))
            return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a)
                    return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        var areArrays = className === '[object Array]';
        // 不是数组
        if (!areArrays) {
            // 过滤掉两个函数的情况
            if (typeof a != 'object' || typeof b != 'object')
                return false;
            var aCtor = a.constructor, bCtor = b.constructor;
            // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
            if (aCtor == bCtor && !(this.isFunction(aCtor) && aCtor instanceof aCtor && this.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        // 检查是否有循环引用的部分
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b;
            }
        }
        aStack.push(a);
        bStack.push(b);
        // 数组判断
        if (areArrays) {
            length = a.length;
            if (length !== b.length)
                return false;
            while (length--) {
                if (!this.eq(a[length], b[length], aStack, bStack))
                    return false;
            }
        }
        else {
            var keys = Object.keys(a), key;
            length = keys.length;
            if (Object.keys(b).length !== length)
                return false;
            while (length--) {
                key = keys[length];
                if (!(b.hasOwnProperty(key) && this.eq(a[key], b[key], aStack, bStack)))
                    return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }
}
class UIComponentBaseState {
    constructor(wrapper) {
        this._wrapper = wrapper;
    }
    getWrapper() {
        return this._wrapper;
    }
    /**
     * 当组件渲染后
     */
    afterRender() {
        return;
    }
}
class UIComponentBaseBrowse extends UIComponentBaseState {
}
class UIComponentBaseEdit extends UIComponentBaseState {
}
class BasePropertyViewEdit extends UIComponentBaseEdit {
    onRender() {
        var span = document.createElement("span");
        $(span).hide();
        $(span).click(function (e) {
            e.stopPropagation();
        });
        return span;
    }
    onRecievedMessage(message, source) {
        if (message instanceof UIMessageSaving) {
            var wrapper = this.getWrapper();
            if (!wrapper.validate()) {
                message.preventDoing(`"` + wrapper.label + `" 必填`, false);
            }
        }
    }
    onObjektDataWriteback() {
        var wrapper = this.getWrapper();
        if (wrapper.isModified()) {
            var objektData = new ObjektModel();
            objektData.id = wrapper.objektId;
            objektData[wrapper.propertyName] = wrapper.getValue();
            wrapper.updateObjekts([objektData]);
        }
    }
}
class BasePropertyViewBrowse extends UIComponentBaseBrowse {
    onRender() {
        var wrapper = this.getWrapper();
        var display = document.createElement("pre");
        $(display).css("margin", "0px");
        $(display).css("display", "inline-block");
        wrapper.onValueChange(function (oldValue, newValue) {
            $(display).html(newValue);
        });
        return display;
    }
    onRecievedMessage(message, source) {
    }
    onObjektDataWriteback() {
    }
}
class PreventDoingReason {
    constructor() {
        /** 原因，不重复 */
        this._reasons = new Set();
    }
    /** 添加原因，已添加过的串，忽略*/
    addReason(reason) {
        this._reasons.add(reason);
    }
    /** 获取整合的原因字符串，用换行符分隔*/
    getReasons() {
        var message = "";
        for (var reason of this._reasons) {
            if (message != "") {
                message += "<br/>";
            }
            message += reason;
        }
        return message;
    }
}
/** 有未保存的数据，继续操作将丢失这些修改！*/
PreventDoingReason.notSaved = "有未保存的数据，继续操作将丢失这些修改！";
class UIMessage {
    constructor() {
        /** 是否忽略消息边界，默认false */
        this._isIgnoreMessageBoundary = false;
        this.id = Utils.getUniqueId("message");
    }
    /** 是否忽略消息边界，默认false */
    get isIgnoreMessageBoundary() {
        return this._isIgnoreMessageBoundary;
    }
    /** 消息边界组件 */
    get boundary() {
        return this._boundary;
    }
    set boundary(val) {
        this._boundary = val;
    }
    /* public processed */
    /** 忽略消息边界*/
    ignoreMessageBoundary() {
        this._isIgnoreMessageBoundary = true;
    }
}
/** 前消息 */
class UIDoingMessage extends UIMessage {
    constructor() {
        super(...arguments);
        /** 是否继续处理，默认true */
        this._continuing = true;
        /** 是否可忽略阻止，默认true */
        this._isIgnorable = true;
        /** 阻止原因 */
        this._reason = new PreventDoingReason();
    }
    /** 是否继续处理，默认true */
    getReasons() {
        return this._reason.getReasons();
    }
    /** 是否继续处理，默认true */
    get continuing() {
        return this._continuing;
    }
    /** 是否可忽略阻止，默认true */
    get isIgnorable() {
        return this._isIgnorable;
    }
    /** 阻止处理，continuing设continuing为false*/
    preventDoing(reason, isIgnorable) {
        if (reason) {
            this._reason.addReason(reason);
        }
        if (isIgnorable === false) {
            this._isIgnorable = false;
        }
        this._continuing = false;
    }
}
/** 后消息 */
class UIDidMessage extends UIMessage {
}
/** 保存前消息 */
class UIMessageSaving extends UIDoingMessage {
}
/** 保存后消息 */
class UIMessageSaved extends UIDidMessage {
}
/** 刷新前消息 */
class UIMessageRefreshing extends UIDoingMessage {
}
/** 刷新后消息 */
class UIMessageRefreshed extends UIDidMessage {
}
/** 对象选择前消息 */
class UIMessageObjektSelecting extends UIDoingMessage {
    constructor(originalSelected, currentSelected) {
        super();
        this.originalSelected = originalSelected;
        this.currentSelected = currentSelected;
    }
}
/** 对象选择后处理 */
class UIMessageObjektSelected extends UIDidMessage {
    constructor(originalSelected, currentSelected) {
        super();
        this.originalSelected = originalSelected;
        this.currentSelected = currentSelected;
    }
}
/** 值改变前消息 */
class UIMessageValueChanging extends UIDoingMessage {
    constructor(originalValue, currentValue) {
        super();
        this.originalValue = originalValue;
        this.currentValue = currentValue;
    }
}
/** 值改变后消息 */
class UIMessageValueChanged extends UIDidMessage {
    constructor(originalValue, currentValue) {
        super();
        this.originalValue = originalValue;
        this.currentValue = currentValue;
    }
}
/** 状态切换前消息 */
class UIMessageStateSwitching extends UIDoingMessage {
    constructor(originalState, currentState) {
        super();
        this.originalState = originalState;
        this.currentState = currentState;
    }
}
/** 状态切换后消息 */
class UIMessageStateSwitched extends UIDidMessage {
    constructor(originalState, currentState) {
        super();
        this.originalState = originalState;
        this.currentState = currentState;
    }
}
/** 对象打开消息 */
class UIMessageObjektOpend extends UIDidMessage {
}
/** 对象创建消息 */
class UIMessageObjektCreated extends UIDidMessage {
}
/** 对象删除消息 */
class UIMessageObjektDeleted extends UIDidMessage {
    constructor(objektId) {
        super();
        this.objektId = objektId;
    }
}
/** 是否显示查询切换消息 */
class UIMessageShownQueryChanged extends UIDidMessage {
    constructor(isShowQuery) {
        super();
        this.isShowQuery = isShowQuery;
    }
}
/** 是否包含子类切换消息 */
class UIMessageIncludeSubKlassChanged extends UIDidMessage {
    constructor(isIncludeSubKlass) {
        super();
        this.isIncludeSubKlass = isIncludeSubKlass;
    }
}
/** 导出消息 */
class UIMessageExported extends UIDidMessage {
}
/** 钩子上下文*/
class HookContext {
    constructor(param) {
        /** key,value参数集，如果有多个参数时使用 */
        this._context = new Map();
        this._param = param;
    }
    /**
     * 添加参数
     * @param name 参数名
     * @param value 参数值
     */
    addParam(name, value) {
        this._context.set(name, value);
        return this;
    }
    /**
     * 获取参数
     * @param name 参数名（多参数情况使用，单参数不传）
     */
    getParam(name) {
        if (!name) {
            return this._param;
        }
        return this._context.get(name);
    }
}
/** 代码钩子。分层架构中，层次越高，顺序越大，执行时升序排序，其中创建单组件Hook取有效的末尾*/
class Hook {
    static register() {
        this.subClasses.add(this);
    }
}
Hook.subClasses = new Set();
/** 前处理钩子*/
class BeforeDoHook extends Hook {
}
/** 处理钩子*/
class DoHook extends Hook {
}
/** 后处理钩子*/
class AfterDoHook extends Hook {
}
/** 创建单组件钩子*/
class CreateComponentHook extends Hook {
}
/** 创建多个组件钩子*/
class CreateComponentsHook extends Hook {
}
/** 加工组件钩子*/
class ProcessComponentHook extends Hook {
}
/** 代码钩子挂载工具类*/
class Hooks {
    /** 升序排序*/
    static sortAsc(a, b) {
        var aOrder = a.getOrder();
        var bOrder = b.getOrder();
        if (aOrder > bOrder) {
            return -1;
        }
        else if (aOrder == bOrder) {
            return 0;
        }
        else {
            return 1;
        }
    }
    /** 降序排序*/
    static sortDesc(a, b) {
        var aOrder = a.getOrder();
        var bOrder = b.getOrder();
        if (aOrder > bOrder) {
            return 1;
        }
        else if (aOrder == bOrder) {
            return 0;
        }
        else {
            return -1;
        }
    }
    /**
     * 前处理挂钩,返回已实质进行处理的钩子数量
     * @param h 钩子类
     * @param context 钩子上下文
     */
    static doBefore(h, context) {
        var num = 0;
        var hooks = new Array();
        h["subClasses"].forEach(o => {
            let obj = new o();
            if (obj instanceof h) {
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        sortedHooks.forEach(p => {
            if (p.doBefore(context)) {
                num++;
            }
        });
        return num;
    }
    /**
     * 处理挂钩，返回已实质进行处理的钩子数量
     * @param h 钩子类
     * @param context 钩子上下文
     */
    static do(h, context) {
        var num = 0;
        var hooks = new Array();
        h["subClasses"].forEach(o => {
            let obj = new o();
            if (obj instanceof h) {
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        sortedHooks.forEach(p => {
            if (p.do(context)) {
                num++;
            }
        });
        return num;
    }
    /**
     * 后处理挂钩，返回已实质进行处理的钩子数量
     * @param h 钩子类
     * @param context 钩子上下文
     */
    static doAfter(h, context) {
        var num = 0;
        var hooks = new Array();
        h["subClasses"].forEach(o => {
            let obj = new o();
            if (obj instanceof h) {
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        sortedHooks.forEach(p => {
            if (p.doAfter(context)) {
                num++;
            }
        });
        return num;
    }
    /**
     * 创建单组件挂钩
     * @param h 钩子类
     * @param context 钩子上下文
     */
    static createComponent(h, context) {
        var component;
        var hooks = new Array();
        h["subClasses"].forEach(o => {
            let obj = new o();
            if (obj instanceof h) {
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortDesc);
        for (var p of sortedHooks) {
            var oc = p.createComponent(context);
            if (oc) {
                component = oc;
                break;
            }
        }
        return component;
    }
    /**
     * 创建多个组件挂钩
     * @param h 钩子类
     * @param context 钩子上下文
     */
    static createComponents(h, context) {
        var components = new Array();
        var hooks = new Array();
        h["subClasses"].forEach(o => {
            let obj = new o();
            if (obj instanceof h) {
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        for (var p of sortedHooks) {
            var ocs = p.createComponents(context);
            components = components.concat(ocs);
        }
        return components;
    }
    /**
     * 处理组件挂钩
     * @param h 狗子类
     * @param c 组件
     * @param context 钩子上下文
     */
    static ProcessComponentHook(h, c, context) {
        var num = 0;
        var hooks = new Array();
        h["subClasses"].forEach(o => {
            let obj = new o();
            if (obj instanceof h) {
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        for (var p of sortedHooks) {
            if (p.processComponent(c, context)) {
                num++;
            }
        }
        return num;
    }
}
/// <reference path="Const.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Models.ts" />
/// <reference path="Utils.ts" />
/// <reference path="UIComponentBaseState.ts" />
/// <reference path="UIMessage.ts" />
/// <reference path="Hooks.ts" />
/// <reference path="Lib/Lib.ts" />
/** 根组件(全局唯一实例) */
var ComponentRoot;
/** UI组件基类 */
class UIComponentBase extends HTMLElement {
    /** 构造函数内无法获取与修改HTML标签属性及子标签，请注意 */
    constructor() {
        super();
        /** 对象数据 */
        this._objektData = new Map();
        /** 状态枚举 */
        this._state = UIState.browse;
        /** 是否有修改 */
        this._isModified = false;
        /** 修改数据集合（只包含被修改的对象和属性，区别于对象数据集合） */
        this._changes = new Map();
        /** 是否根组件*/
        this._isRoot = false;
        /** 接受过的消息集合（只保留最近10条） */
        this._firedMessages = new Array();
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
        }
        else {
            this._componentState = this._componenteditState;
        }
        this.created();
        this.fireHook(EventNames.AfterCreate);
    }
    /** 当前状态对象 */
    get componentState() {
        return this._componentState;
    }
    /** 当前状态渲染的标签 */
    get renderedHTMLElement() {
        return this._renderedHTMLElement;
    }
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
    get onBeforeInitAttribute() {
        var func = `function(){ ` + this.safeToString(this.getAttribute("onBeforeInit")) + ` }`;
        return Utils.stringToObject(func);
    }
    /** 初始化后处理标签属性 */
    get onAfterInitAttribute() {
        var func = `function(){ ` + this.safeToString(this.getAttribute("onAfterInit")) + ` }`;
        return Utils.stringToObject(func);
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
    get isdelayToBrowse() {
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
        return this.get("childrenComponents");
    }
    set childrenComponents(val) {
        this.set("childrenComponents", val);
    }
    /** 父组件 */
    get parentComponent() {
        return this.get("parentComponent");
    }
    set parentComponent(val) {
        this.set("parentComponent", val);
    }
    /** 自定义属性（用于标签声明式赋值） */
    get customAttributes() {
        return this.stringToObject(this.getAttribute("customAttributes"));
    }
    /** 事件处理程序集合（用于标签声明式赋值） */
    get eventHandlers() {
        return this.stringToObject(this.getAttribute("eventHandlers"));
    }
    /** 组件编辑状态代理对象，由具体子类实现 */
    createComponentEditState() {
        return null;
    }
    /** 组件浏览状态代理对象，由具体子类实现 */
    createComponentBrowseState() {
        return null;
    }
    /** 整体刷新对象数据，调用后端API Map<string,ObjektData> ifModified(Map<string,datetime>) 返回相应的对象id和对象数据键值对，如最后修改时间没有变，则对象数据为空 */
    refreshObjektData() {
        var map = new Map();
        for (var [k, v] of this._objektData) {
            map.set(k, v["modifiedOn"] || "");
        }
        this.ifModified(map);
    }
    ifModified(map) {
        var element = this;
        element.ajax({
            url: ComponentRoot.APIs.ifModified,
            sync: true,
            data: { map: Utils.mapToJson(map) },
            success: function (result) {
                var models = JSON.parse(result.Data);
                for (var model of models.objekts) {
                    if (!model.$) {
                        model.$ = ObjektState.Original;
                    }
                    element._objektData.set(model.id, model);
                }
            }
        });
    }
    onBeforeInit(handler) {
        this.addHook(EventNames.BeforeInit, handler);
    }
    onAfterInit(handler) {
        this.addHook(EventNames.AfterInit, handler);
    }
    onAfterCreate(handler) {
        this.addHook(EventNames.AfterCreate, handler);
    }
    onSaveSucceeded(handler) {
        this.addHook(EventNames.SaveSucceeded, handler);
    }
    onAfterSave(handler) {
        this.addHook(EventNames.AfterSave, handler);
    }
    onAjaxError(handler) {
        this.addHook(EventNames.AjaxError, handler);
    }
    onObjectsSelectedChange(handler) {
        this.addHook(EventNames.ObjectsSelectedChange, handler);
    }
    onAfterRefresh(handler) {
        this.addHook(EventNames.AfterRefresh, handler);
    }
    onAfterAdopt(handler) {
        this.addHook(EventNames.AfterAdopt, handler);
    }
    onAfterConnect(handler) {
        this.addHook(EventNames.AfterConnect, handler);
    }
    onAfterDisconnect(handler) {
        this.addHook(EventNames.AfterDisconnect, handler);
    }
    onAfterAttributeChange(handler) {
        this.addHook(EventNames.AfterAttributeChange, handler);
    }
    onEditStateChange(handler) {
        this.addHook(EventNames.EditStateChange, handler);
    }
    /** 是否有值改变（遍历自己及子组件，有任意一个_isModified为true则为true）*/
    isModified() {
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
    setModified(isModified) {
        this._isModified = isModified;
    }
    /**
     * 根据id获取对象（数据共享）
     * @param objektIds 对象id集合
     */
    getObjektData(objektIds) {
        if (!this.isBoundary()) {
            return this.parentComponent.getObjektData(objektIds);
        }
        var datas = new Map();
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
    getObjektCollection(query, success, finallyCall) {
        if (!this.isBoundary()) {
            this.parentComponent.getObjektCollection(query, success);
        }
        else {
            this.ajax({
                url: ComponentRoot.APIs.getListdata,
                data: query,
                success: (result) => {
                    var ocModel = JSON.parse(result.Data);
                    for (var model of ocModel.objekts) {
                        model.$ = ObjektState.Original;
                        this._objektData.set(model.id, model);
                    }
                    if (success) {
                        success(ocModel);
                    }
                },
                finallyCall: (result) => {
                    if (finallyCall) {
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
    getObjektDataPackage(api, params, success, finallyCall) {
        if (!this.isBoundary()) {
            this.parentComponent.getObjektDataPackage(api, params, success);
        }
        else {
            this.ajax({
                url: api,
                data: params,
                success: (result) => {
                    var data = JSON.parse(result.Data);
                    if (!data.objektCollections) {
                        throw new Error("数据包格式错误：未包含对象数据属性objektCollections:Array<ObjektCollectionModel>");
                    }
                    let collections = data.objektCollections;
                    for (var ocModel of collections) {
                        for (var model of ocModel.objekts) {
                            model.$ = ObjektState.Original;
                            this._objektData.set(model.id, model);
                        }
                    }
                    if (success) {
                        success(result);
                    }
                },
                finallyCall: (result) => {
                    if (finallyCall) {
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
    newObjekt(klassName, relatedPropertyNames) {
        if (!this.isBoundary()) {
            return this.parentComponent.newObjekt(klassName, relatedPropertyNames);
        }
        else {
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
    deleteObjekts(objekts) {
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
    updateObjekts(objekts) {
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
    createObjekts(objekts) {
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
    onObjektDataWriteback() {
        if (this._componentState) {
            this._componentState.onObjektDataWriteback();
        }
    }
    /**
     * 遍历子组件+自己搜集对象数据，并触发onObjektDataWriteback
     */
    objektDataWriteback() {
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
    clearChanges() {
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
    save() {
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
    static register() {
        if (this.elementName) {
            window["customElements"].define(this.elementName, this);
        }
    }
    /**
     * 弹出提示框
     * @param message 消息内容
     */
    alert(message) {
        $.messager.alert('提示', message);
    }
    /**
     * 弹出确认提示框
     * @param message 消息内容
     * @param message 点击“确定”按钮的处理程序
     */
    confirm(message, todo) {
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
    getPropertyCount(obj, exceptions) {
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
    isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    }
    /**
     * 对象转换为字符串，如果对象为null或者undefined则取默认值（默认为空字符串）。
     * @param obj 对象
     * @param defaultValue 默认值，可选（默认为空字符串）
     */
    safeToString(obj, defaultValue) {
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
    stringToObject(str) {
        return eval("(" + str + ")");
    }
    /**
     * 在页面头部添加脚本引用
     * @param source 脚本资源路径
     */
    includeJS(source) {
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
    includeStyle(source) {
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
    getUniqueId(prefix) {
        return Utils.getUniqueId(prefix);
    }
    /**
     * 保存视图状态数据
     * @param name 存储键值
     * @param obj 要存储的对象
     */
    set(name, obj) {
        this._storage[name] = obj;
    }
    /**
     * 获取视图状态数据
     * @param name 存储键值
     */
    get(name) {
        return this._storage[name];
    }
    /**
     * 设置额外参数
     * @param name 参数名称
     * @param obj 参数值
     */
    setExtraParams(name, obj) {
        this.get("ExtraParams")[name] = obj;
    }
    /**
     * 获取额外参数
     * @param name 参数名称
     */
    getExtraParams(name) {
        return this.get("ExtraParams")[name];
    }
    /**
     * 保存自定义属性
     * @param name 属性名
     * @param obj 属性值
     */
    setCustomAttribute(name, obj) {
        this._storage["customAttributes"][name] = obj;
    }
    /**
     * 获取自定义属性
     * @param name 属性名
     */
    getCustomAttribute(name) {
        return this._storage["customAttributes"][name];
    }
    /**
     * 添加事件处理程序
     * @param name 事件名称
     * @param handler 事件处理程序（系统会自动为参数列表起始位置添加一个事件对象参数）
     */
    addHook(name, handler) {
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
    overrideHook(name, handler) {
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
    fireHook(name, params) {
        var handlers = this._storage["eventHandlers"][name];
        if (handlers) {
            for (var handler of handlers) {
                handler.apply(this, params);
            }
        }
    }
    /** 是否边界（消息边界或组件树根）*/
    isBoundary(message) {
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
    reportMessage(message, source) {
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
    broadcastMessage(message, source) {
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
    sendMessage(message) {
        this.reportMessage(message, this);
    }
    /**
     * 底层ajax调用封装
     * @param option ajax参数
     */
    ajax(option) {
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
    addChildComponent(component) {
        if (this.childrenComponents.indexOf(component) < 0) {
            this.childrenComponents.push(component);
        }
        component.parentComponent = this;
    }
    /**
     * 移除子组件
     * @param component 子组件
     */
    removeChildComponent(component) {
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
    createButton(text, iconCls, onclick, options) {
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
    created() { }
    /**
     * 渲染
     */
    render() {
        let element;
        if (this.state == UIState.browse && this._browseContent) {
            element = this._browseContent;
            this._renderedHTMLElement = element;
            this.isRendered = true;
            return;
        }
        else if (this.state == UIState.edit && this._editContent) {
            element = this._editContent;
            this._renderedHTMLElement = element;
            this.isRendered = true;
            return;
        }
        else if (this._componentState) {
            element = this._componentState.onRender();
            if (this._componentState.onRenderFunc) {
                element = this._componentState.onRenderFunc.apply(this._componentState, [element]);
            }
            this._renderedHTMLElement = element;
            if (this.state == UIState.browse && !this._browseContent) {
                this._browseContent = this.renderedHTMLElement;
                this.appendChild(this.renderedHTMLElement);
            }
            else if (this.state == UIState.edit && !this._editContent) {
                this._editContent = this.renderedHTMLElement;
                this.appendChild(this.renderedHTMLElement);
            }
            this.isRendered = true;
            element = this._componentState.afterRender();
            return;
        }
        else {
            if (this._renderedHTMLElement) {
                this.isRendered = true;
                return;
            }
            else {
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
     * 当组件渲染时。如果组件的渲染不区分状态，即浏览状态和编辑状态返回的HTMLElement是一样的，重写该方法；
     * 跟状态有关，需派生状态类，在状态类上实现render逻辑，
     * 有状态类，组件上的onRender将被忽略
     */
    onRender() {
        return null;
    }
    /**
     * 当组件渲染后
     */
    afterRender() {
        return;
    }
    /**
     * 接受消息
     */
    onRecievedMessage(message, source) {
        if (message instanceof UIMessageSaving) {
            if (message.boundary == this && this.isModified()) {
                var MessageSaving = message;
                if (MessageSaving.continuing) {
                    this.save();
                }
                else if (MessageSaving.isIgnorable) {
                    this.confirm(MessageSaving.getReasons(), () => { this.save(); });
                }
                else {
                    this.alert(MessageSaving.getReasons());
                }
            }
            ;
        }
        else if (message instanceof UIMessageStateSwitching) {
            var StateSwitching = message;
            if (message.boundary == this) {
                if (this.isModified() && StateSwitching.currentState == UIState.browse) {
                    StateSwitching.preventDoing(PreventDoingReason.notSaved);
                }
                var todo = () => {
                    this.switchToStateMayDelay(StateSwitching.currentState);
                    this.sendMessage(new UIMessageStateSwitched(message.originalState, message.currentState));
                };
                if (StateSwitching.continuing) {
                    todo();
                }
                else if (StateSwitching.isIgnorable) {
                    this.confirm(StateSwitching.getReasons(), todo);
                }
            }
        }
        else if (message instanceof UIMessageStateSwitched) {
            var StateSwitched = message;
            this.switchToStateMayDelay(StateSwitched.currentState);
        }
        else if (message instanceof UIMessageObjektSelecting) {
            var ObjektSelecting = message;
            if (message.boundary == this) {
                var todo = () => {
                    this.sendMessage(new UIMessageObjektSelected(message.originalSelected, message.currentSelected));
                };
                if (ObjektSelecting.continuing) {
                    todo();
                }
                else if (ObjektSelecting.isIgnorable) {
                    this.confirm(ObjektSelecting.getReasons(), todo);
                }
            }
            ;
        }
        else if (message instanceof UIMessageObjektSelected) {
            var ObjektSelected = message;
            this.fireHook(EventNames.ObjectsSelectedChange, [message.originalSelected, message.currentSelected]);
        }
        else if (message instanceof UIMessageRefreshing) {
            var Refreshing = message;
            if (message.boundary == this) {
                if (this.isModified()) {
                    message.preventDoing(PreventDoingReason.notSaved);
                }
                var todo = () => {
                    this.refreshObjektData();
                    this.sendMessage(new UIMessageRefreshed());
                };
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
    switchToState(state) {
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
    switchToStateMayDelay(state) {
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
    init() {
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
            if (this.onBeforeInitAttribute) {
                this.onBeforeInitAttribute.apply(this);
            }
            element.fireHook(EventNames.BeforeInit);
            Hooks.doBefore(BeforeComponentInitHook, new HookContext(this));
            this.render();
            if (!element.id) {
                element.id = this.getUniqueId(this.tagName.toLowerCase());
            }
            $(element).addClass("Components");
            if (this.onAfterInitAttribute) {
                this.onAfterInitAttribute.apply(this);
            }
            element.fireHook(EventNames.AfterInit);
            Hooks.doAfter(AfterComponentInitHook, new HookContext(this));
        }
    }
    /**
     * 插入DOM回调
     */
    connected() {
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
    disconnected() {
    }
    /**
     * 属性改变回调
     */
    attributeChanged(name, oldValue, newValue) {
    }
    /**
     * 父节点变更回调
     */
    adopted() {
    }
    /**
     * 标签插入DOM回调事件
     */
    connectedCallback() {
        this.setAttribute("isUIComponent", "true");
        if (!this.parentComponent && this.autoBuildComponentTree && !this.isRoot) {
            var parent = $(this).parents("[isUIComponent]")[0];
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
    disconnectedCallback() {
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
    attributeChangedCallback(name, oldValue, newValue) {
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
    adoptedCallback() {
        if (this.parentComponent && this.autoBuildComponentTree) {
            this.parentComponent.removeChildComponent(this);
        }
        if (!this.parentComponent && this.autoBuildComponentTree) {
            var parent = $(this).parents("[isCustomElement]")[0];
            if (!parent) {
                parent = ComponentRoot;
            }
            parent.addChildComponent(this);
        }
        this.adopted();
        this.fireHook(EventNames.AfterAdopt);
    }
}
/// <reference path="UIComponentBase.ts" />
/** 授权 */
class Authorization extends UIComponentBase {
    constructor() {
        super();
    }
    /** 在何种对象选择情况下显示（选择：'select'，单选:'singleSelect'，多选:'multiSelect'） */
    get selecttoshow() {
        return this.getAttribute("selecttoshow");
    }
    set selecttoshow(val) {
        this.setAttribute("selecttoshow", val);
    }
    /** 获取权限选项数据api */
    get dataurl() {
        return this.getAttribute("dataurl");
    }
    set dataurl(val) {
        this.setAttribute("dataurl", val);
    }
    onBeforeShow(handler) {
        this.addHook(EventNames.BeforeShow, handler);
    }
    onAfterShow(handler) {
        this.addHook(EventNames.AfterShow, handler);
    }
    load(entity) {
        var element = this;
        element.ajax({
            url: element.dataurl || ComponentRoot.APIs.getAuthorization,
            sync: true,
            data: { id: entity.id },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                if (obj.NotExists) {
                    element.hide();
                    return;
                }
                var Permissions = JSON.parse(obj.Permissions);
                var current = element.stringToObject(obj.Current);
                var AllowPrivate = obj.AllowPrivatePermission;
                //当前权限对象的读取权
                var currentRead = current.permissioncode[1] === '1';
                //源对象的授权权
                var sourceAuthorize = obj.PermissionCode[4] === '1';
                element.set("source", entity);
                element.set("Current", current);
                element.set("Permissions", Permissions);
                element.set("model", obj);
                element.clearMenu();
                var menu = element.get("menu");
                if (currentRead) {
                    $('#' + menu.id).menu('appendItem', {
                        text: '查看当前权限',
                        iconCls: '',
                        onclick: function () {
                            ComponentRoot.openObjDetail({
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
                                element.createPrivatePermission();
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
                        else {
                            label = '分派“' + label + '“';
                        }
                        var item = {
                            id: id,
                            description: description,
                            isCurrent: isCurrent,
                            text: code[0] === '1' ? label : '无发现权',
                            iconCls: icon,
                            onclick: function () {
                                if (!item.isCurrent) {
                                    element.authorize(item.id, null);
                                }
                            }
                        };
                        $('#' + menu.id).menu('appendItem', item);
                        $('#' + item.id).attr("title", description);
                        element.get("menuItems").push(item);
                    });
                }
            }
        });
    }
    hide() {
        var menu = this.get("menu");
        $(menu).menu("hide");
        $(menu).hide();
        $(this).hide();
    }
    clearMenu() {
        var menu = this.get("menu");
        var items = this.get("menuItems");
        $(items).each(function () {
            var item = $('#' + menu.id).menu('findItem', this.text);
            $(item.target).remove();
        });
        $(menu).html("");
        this.set("menuItems", []);
    }
    createPrivatePermission() {
        var element = this;
        element.confirm("将为当前对象分派私有权限。<br>初始私有权限复制于当前对象的“默认权限”，以便编辑设置该私有权限。<br>【确定】继续分派，【取消】返回", function () {
            element.ajax({
                url: ComponentRoot.APIs.getNewPrivatePermission,
                sync: true,
                data: { id: element.get("source").id },
                success: function (result) {
                    var permission = JSON.parse(result.Data);
                    ComponentRoot.openObjDetail({
                        controlid: permission.id,
                        objid: permission.id,
                        klass: 'ObjektPermission',
                        title: permission.combinedtitle,
                        oninitLoaded: function () {
                            this.state = UIState.edit;
                        }
                    });
                }
            });
        });
    }
    authorize(permissionId, onsuccess) {
        var element = this;
        element.ajax({
            url: ComponentRoot.APIs.authorize,
            data: { id: element.get("source").id, permissionId: permissionId },
            success: onsuccess || function (result) { }
        });
    }
    onRender() {
        var span = document.createElement("span");
        var element = this;
        var button = document.createElement("a");
        var menuid = this.getUniqueId("menu");
        $(button).addClass("easyui-menubutton");
        $(button).text("权限");
        $(button).attr("href", "javascript:void(0)");
        $(button).attr("data-options", "menu:'#" + menuid + "',iconCls:'fa fa-key iconfont'");
        button.id = this.getUniqueId("menubutton");
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
            element.fireHook(EventNames.BeforeShow);
            element.set("clicked", true);
            $(menu).menu("show");
            $(menu).show();
            element.fireHook(EventNames.AfterShow);
        });
        $(button).mouseout(function () {
            element.set("clicked", false);
        });
        span.appendChild(menu);
        span.appendChild(button);
        element.set("button", button);
        element.set("menu", menu);
        element.set("menuItems", []);
        $("#" + button.id).menubutton({
            iconCls: 'fa fa-key',
            menu: '#' + menuid
        });
        $(button).children("span").css("border", "1px solid #e1e6eb");
        $(button).children("span").css("border-radius", "3px");
        $(button).children("span").attr("title", "权限");
        return span;
    }
}
Authorization.elementName = "Gf-Authorization".toLowerCase();
Authorization.register();
/*Bpmn视图
  组件名Gf-BpmnView

  属性:
  
  方法:

  事件:

*/
class BpmnView extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    onRender() {
        return this.BpmnViewInit();
    }
    afterRender() {
        $(this._bpmnViewLayout).layout('resize', {
            width: '100%',
            height: '100%'
        });
    }
    onRecievedMessage(message, source) {
        super.onRecievedMessage(message, source);
        //对象选择后事件
        if (message instanceof UIMessageObjektSelected) {
            var ObjektSelectedMessage = message;
            var id = ObjektSelectedMessage.currentSelected;
        }
    }
    /*
    *初始化
    */
    BpmnViewInit() {
        $(this).addClass("GfBpmnView");
        //组件容器
        var BpmnViewPanel = document.createElement("div");
        $(BpmnViewPanel).addClass("BpmnViewPanel");
        //创建布局Div
        var BpmnViewPanel_Layout = document.createElement("div");
        $(BpmnViewPanel).append(BpmnViewPanel_Layout);
        $(BpmnViewPanel_Layout).layout({
            fit: true
        });
        this._bpmnViewLayout = BpmnViewPanel_Layout;
        //增加北部面板
        $(BpmnViewPanel_Layout).layout('add', {
            region: 'north',
            height: 41
        });
        //增加下方内容面板
        $(BpmnViewPanel_Layout).layout('add', {
            region: 'center'
        });
        //北部面板容器Div
        var BpmnViewPanel_Layout_LayoutNorth_NorthPanel = document.createElement("div");
        $(BpmnViewPanel_Layout_LayoutNorth_NorthPanel).addClass("NorthPanel");
        var BpmnViewPanel_Layout_LayoutNorth = $(BpmnViewPanel_Layout).layout("panel", "north");
        $(BpmnViewPanel_Layout_LayoutNorth).append(BpmnViewPanel_Layout_LayoutNorth_NorthPanel);
        this._bpmnViewNorth = BpmnViewPanel_Layout_LayoutNorth_NorthPanel;
        //北部初始化
        this.BpmnViewNorthInit();
        //内容面板容器Div
        var BpmnViewPanel_Layout_LayoutNorth_CenterPanel = document.createElement("div");
        $(BpmnViewPanel_Layout_LayoutNorth_CenterPanel).addClass("CenterPanel");
        var BpmnViewPanel_Layout_LayoutCenter = $(BpmnViewPanel_Layout).layout("panel", "center");
        $(BpmnViewPanel_Layout_LayoutCenter).append(BpmnViewPanel_Layout_LayoutNorth_CenterPanel);
        this._bpmnViewCenter = BpmnViewPanel_Layout_LayoutCenter;
        //中心内容初始化
        this.BpmnViewCenterInit();
        return BpmnViewPanel;
    }
    /*
    *Bpmn视图北部初始化
    */
    BpmnViewNorthInit() {
        var that = this;
        //保存按钮
        let SaveButton = document.createElement("a");
        $(SaveButton).addClass("ToolButton");
        $(SaveButton).linkbutton({
            width: 72,
            height: 20,
            text: "保存",
            onClick: function () { that.SaveButtonClick(); }
        });
        this._saveButton = SaveButton;
        $(this._bpmnViewNorth).append(SaveButton);
    }
    //保存
    SaveButtonClick() {
        var that = this;
        this._bpmnModeler.saveXML({ format: true }, function (err, xml) {
            if (err) {
                console.error('Bpmn视图保存失败', err);
            }
            else {
                console.info('Bpmn视图保存成功');
                console.info(xml);
            }
            that.alert('Bpmn视图保存成功,请按F12查看');
        });
    }
    /*
    *Bpmn视图内容初始化
    */
    BpmnViewCenterInit() {
        //引用建模器所需文件
        this.includeStyle(ComponentRoot.apppath + "/Platform/Content/Css/diagram-js.css");
        this.includeStyle(ComponentRoot.apppath + "/Platform/Content/Css/bpmn-embedded.css");
        this.includeJS(ComponentRoot.apppath + "/Platform/Content/Scripts/bpmn-modeler.js");
        this._bpmnView = window["BpmnJS"];
        //视图渲染
        var bpmnModeler = new this._bpmnView({
            //引擎容器
            container: this._bpmnViewCenter,
            //启用按钮事件
            keyboard: { bindTo: document }
        });
        this._bpmnModeler = bpmnModeler;
        var diagramXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\"\r\n             xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\"\r\n             xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\"\r\n             xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\"\r\n             xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n             expressionLanguage=\"http://www.w3.org/1999/XPath\"\r\n             typeLanguage=\"http://www.w3.org/2001/XMLSchema\"\r\n             targetNamespace=\"\"\r\n             xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd\">\r\n<collaboration id=\"sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424\">\r\n    <participant id=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F\" name=\"Customer\" processRef=\"sid-C3803939-0872-457F-8336-EAE484DC4A04\">\r\n    </participant>\r\n</collaboration>\r\n<process id=\"sid-C3803939-0872-457F-8336-EAE484DC4A04\" isClosed=\"false\" isExecutable=\"false\" name=\"Customer\" processType=\"None\">\r\n    <extensionElements/>\r\n    <laneSet id=\"sid-b167d0d7-e761-4636-9200-76b7f0e8e83a\">\r\n        <lane id=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254\">\r\n            <flowNodeRef>sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138</flowNodeRef>\r\n            <flowNodeRef>sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26</flowNodeRef>\r\n            <flowNodeRef>SCAN_OK</flowNodeRef>\r\n            <flowNodeRef>sid-E49425CF-8287-4798-B622-D2A7D78EF00B</flowNodeRef>\r\n            <flowNodeRef>sid-E433566C-2289-4BEB-A19C-1697048900D2</flowNodeRef>\r\n            <flowNodeRef>sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9</flowNodeRef>\r\n        </lane>\r\n    </laneSet>\r\n    <startEvent id=\"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138\" name=\"Notices&#10;QR code\">\r\n        <outgoing>sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD</outgoing>\r\n    </startEvent>\r\n    <task completionQuantity=\"1\" id=\"sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26\" isForCompensation=\"false\" name=\"Scan QR code\" startQuantity=\"1\">\r\n        <incoming>sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D</incoming>\r\n        <outgoing>sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A</outgoing>\r\n    </task>\r\n    <exclusiveGateway gatewayDirection=\"Diverging\" id=\"SCAN_OK\" name=\"Scan successful?&#10;\">\r\n        <incoming>sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A</incoming>\r\n        <outgoing>sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB</outgoing>\r\n        <outgoing>sid-337A23B9-A923-4CCE-B613-3E247B773CCE</outgoing>\r\n    </exclusiveGateway>\r\n    <task completionQuantity=\"1\" id=\"sid-E49425CF-8287-4798-B622-D2A7D78EF00B\" isForCompensation=\"false\" name=\"Open product information in mobile  app\" startQuantity=\"1\">\r\n        <incoming>sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB</incoming>\r\n        <outgoing>sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C</outgoing>\r\n    </task>\r\n    <endEvent id=\"sid-E433566C-2289-4BEB-A19C-1697048900D2\" name=\"Is informed\">\r\n        <incoming>sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C</incoming>\r\n    </endEvent>\r\n    <exclusiveGateway gatewayDirection=\"Converging\" id=\"sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9\">\r\n        <incoming>sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD</incoming>\r\n        <incoming>sid-337A23B9-A923-4CCE-B613-3E247B773CCE</incoming>\r\n        <outgoing>sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D</outgoing>\r\n    </exclusiveGateway>\r\n    <sequenceFlow id=\"sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD\" sourceRef=\"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138\" targetRef=\"sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9\"/>\r\n    <sequenceFlow id=\"sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A\" sourceRef=\"sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26\" targetRef=\"SCAN_OK\"/>\r\n    <sequenceFlow id=\"sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C\" sourceRef=\"sid-E49425CF-8287-4798-B622-D2A7D78EF00B\" targetRef=\"sid-E433566C-2289-4BEB-A19C-1697048900D2\"/>\r\n    <sequenceFlow id=\"sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB\" name=\"No\" sourceRef=\"SCAN_OK\" targetRef=\"sid-E49425CF-8287-4798-B622-D2A7D78EF00B\"/>\r\n    <sequenceFlow id=\"sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D\" sourceRef=\"sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9\" targetRef=\"sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26\"/>\r\n    <sequenceFlow id=\"sid-337A23B9-A923-4CCE-B613-3E247B773CCE\" name=\"Yes\" sourceRef=\"SCAN_OK\" targetRef=\"sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9\"/>\r\n</process>\r\n<bpmndi:BPMNDiagram id=\"sid-74620812-92c4-44e5-949c-aa47393d3830\">\r\n    <bpmndi:BPMNPlane bpmnElement=\"sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424\" id=\"sid-cdcae759-2af7-4a6d-bd02-53f3352a731d\">\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F\" id=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F_gui\" isHorizontal=\"true\">\r\n            <omgdc:Bounds height=\"250.0\" width=\"933.0\" x=\"42.5\" y=\"75.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\r\n                <omgdc:Bounds height=\"59.142852783203125\" width=\"12.000000000000014\" x=\"47.49999999999999\" y=\"170.42857360839844\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254\" id=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254_gui\" isHorizontal=\"true\">\r\n            <omgdc:Bounds height=\"250.0\" width=\"903.0\" x=\"72.5\" y=\"75.0\"/>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138\" id=\"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138_gui\">\r\n            <omgdc:Bounds height=\"30.0\" width=\"30.0\" x=\"150.0\" y=\"165.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\r\n                <omgdc:Bounds height=\"22.0\" width=\"46.35714340209961\" x=\"141.8214282989502\" y=\"197.0\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26\" id=\"sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26_gui\">\r\n            <omgdc:Bounds height=\"80.0\" width=\"100.0\" x=\"352.5\" y=\"140.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\r\n                <omgdc:Bounds height=\"12.0\" width=\"84.0\" x=\"360.5\" y=\"172.0\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"SCAN_OK\" id=\"SCAN_OK_gui\" isMarkerVisible=\"true\">\r\n            <omgdc:Bounds height=\"40.0\" width=\"40.0\" x=\"550.0\" y=\"160.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\r\n                <omgdc:Bounds height=\"12.0\" width=\"102.0\" x=\"521.0\" y=\"127.0\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-E49425CF-8287-4798-B622-D2A7D78EF00B\" id=\"sid-E49425CF-8287-4798-B622-D2A7D78EF00B_gui\">\r\n            <omgdc:Bounds height=\"80.0\" width=\"100.0\" x=\"687.5\" y=\"140.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\r\n                <omgdc:Bounds height=\"36.0\" width=\"83.14285278320312\" x=\"695.9285736083984\" y=\"162.0\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-E433566C-2289-4BEB-A19C-1697048900D2\" id=\"sid-E433566C-2289-4BEB-A19C-1697048900D2_gui\">\r\n            <omgdc:Bounds height=\"28.0\" width=\"28.0\" x=\"865.0\" y=\"166.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\r\n                <omgdc:Bounds height=\"11.0\" width=\"62.857147216796875\" x=\"847.5714263916016\" y=\"196.0\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNShape bpmnElement=\"sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9\" id=\"sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9_gui\" isMarkerVisible=\"true\">\r\n            <omgdc:Bounds height=\"40.0\" width=\"40.0\" x=\"240.0\" y=\"160.0\"/>\r\n        </bpmndi:BPMNShape>\r\n        <bpmndi:BPMNEdge bpmnElement=\"sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A\" id=\"sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A_gui\">\r\n            <omgdi:waypoint x=\"452.5\" y=\"180\"/>\r\n            <omgdi:waypoint x=\"550.0\" y=\"180\"/>\r\n        </bpmndi:BPMNEdge>\r\n        <bpmndi:BPMNEdge bpmnElement=\"sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB\" id=\"sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB_gui\">\r\n            <omgdi:waypoint x=\"590.0\" y=\"180\"/>\r\n            <omgdi:waypoint x=\"687.5\" y=\"180\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\r\n                <omgdc:Bounds height=\"12.048704338048935\" width=\"16.32155963195521\" x=\"597.8850936986571\" y=\"155\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNEdge>\r\n        <bpmndi:BPMNEdge bpmnElement=\"sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD\" id=\"sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD_gui\">\r\n            <omgdi:waypoint x=\"180.0\" y=\"180\"/>\r\n            <omgdi:waypoint x=\"240.0\" y=\"180\"/>\r\n        </bpmndi:BPMNEdge>\r\n        <bpmndi:BPMNEdge bpmnElement=\"sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D\" id=\"sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D_gui\">\r\n            <omgdi:waypoint x=\"280.0\" y=\"180\"/>\r\n            <omgdi:waypoint x=\"352.5\" y=\"180\"/>\r\n        </bpmndi:BPMNEdge>\r\n        <bpmndi:BPMNEdge bpmnElement=\"sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C\" id=\"sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C_gui\">\r\n            <omgdi:waypoint x=\"787.5\" y=\"180.0\"/>\r\n            <omgdi:waypoint x=\"865.0\" y=\"180.0\"/>\r\n        </bpmndi:BPMNEdge>\r\n        <bpmndi:BPMNEdge bpmnElement=\"sid-337A23B9-A923-4CCE-B613-3E247B773CCE\" id=\"sid-337A23B9-A923-4CCE-B613-3E247B773CCE_gui\">\r\n            <omgdi:waypoint x=\"570.5\" y=\"200.0\"/>\r\n            <omgdi:waypoint x=\"570.5\" y=\"269.0\"/>\r\n            <omgdi:waypoint x=\"260.5\" y=\"269.0\"/>\r\n            <omgdi:waypoint x=\"260.5\" y=\"200.0\"/>\r\n            <bpmndi:BPMNLabel labelStyle=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\r\n                <omgdc:Bounds height=\"21.4285888671875\" width=\"12.0\" x=\"550\" y=\"205\"/>\r\n            </bpmndi:BPMNLabel>\r\n        </bpmndi:BPMNEdge>\r\n    </bpmndi:BPMNPlane>\r\n    <bpmndi:BPMNLabelStyle id=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\r\n        <omgdc:Font isBold=\"false\" isItalic=\"false\" isStrikeThrough=\"false\" isUnderline=\"false\" name=\"Arial\" size=\"11.0\"/>\r\n    </bpmndi:BPMNLabelStyle>\r\n    <bpmndi:BPMNLabelStyle id=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\r\n        <omgdc:Font isBold=\"false\" isItalic=\"false\" isStrikeThrough=\"false\" isUnderline=\"false\" name=\"Arial\" size=\"12.0\"/>\r\n    </bpmndi:BPMNLabelStyle>\r\n</bpmndi:BPMNDiagram>\r\n</definitions>\r\n\r\n";
        //初始化视图
        bpmnModeler.importXML(diagramXML, function (err) {
            if (err) {
                return console.error('could not import BPMN 2.0 diagram', err);
            }
            var canvas = bpmnModeler.get('canvas');
            canvas.zoom(0.92);
        });
        var that = this;
        //元素点击事件
        bpmnModeler.on("element.click", function (event) {
            that.BpmnModelerElementClick(event);
        });
        //元素添加事件
        bpmnModeler.on("shape.added", function (event) {
        });
    }
    /*
    *Bpmn视图元素点击事件
    */
    BpmnModelerElementClick(event) {
        var canvas = this._bpmnModeler.get('canvas');
        if (event.element != canvas.getRootElement()) {
            var newObject = new ObjektModel();
            newObject.id = event.element.id;
            this.sendMessage(new UIMessageObjektSelecting([], [newObject]));
        }
    }
}
BpmnView.elementName = "Gf-BpmnView".toLowerCase();
BpmnView.register();
/// <reference path="UIComponentBase.ts" />
/** 按钮点击下拉框 */
class ButtonComboBox extends UIComponentBase {
    constructor() {
        super();
    }
    /** 数据 */
    get data() {
        return this.getAttribute("data");
    }
    set data(val) {
        this.setAttribute("data", val);
    }
    getValue() {
        return $(this.get("button")).val();
    }
    /**
     * 值改变回调
     * @param eventHandler 回调函数
     */
    onValueChange(eventHandler) {
        this.addHook(EventNames.ValueChange, eventHandler);
    }
    setValue(value) {
        var old = $(this.get("button")).val();
        $(this.get("button")).val(value);
        if (value != old) {
            this.fireHook(EventNames.ValueChange, [old, value]);
        }
    }
    loadData(data) {
        var expand = $(this.get("div"));
        var target = this.get("button");
        var element = this;
        expand.html("");
        $(data).each(function () {
            element.addOption(this.value, this.label);
        });
    }
    toggleExpand() {
        var div = this.get("div");
        var button = this.get("button");
        if (!$(div).is(":hidden")) {
            $(div).hide();
            return;
        }
        var x = button.getBoundingClientRect().left + document.documentElement.scrollLeft;
        var y = button.getBoundingClientRect().top + document.documentElement.scrollTop;
        div.style.left = x + "px";
        div.style.top = y + 25 + "px";
        $(div).show();
    }
    addOption(value, label) {
        var element = this;
        var option = document.createElement("div");
        $(option).addClass("combobox-item item");
        option.innerText = label;
        $(option).attr("value", value);
        $(option).click(function () {
            if (element.getValue() != value) {
                element.setValue(value);
            }
            $(element.get("div")).hide();
        });
        element.get("div").appendChild(option);
    }
    onRender() {
        var span = document.createElement("span");
        var element = this;
        $(element).addClass("GfButtonComboBox");
        //按钮
        var button = document.createElement("input");
        button.id = this.getUniqueId("Button");
        $(button).attr("type", "button");
        $(button).css("width", (element.width || "25"));
        $(button).css("height", (element.height || "25"));
        element.set("button", button);
        //下拉框
        var expanddiv = document.createElement("div");
        expanddiv.id = this.getUniqueId("ComboBox");
        $(expanddiv).addClass("combo-panel panel-body panel-body-noheader GfButtonComboBox expanddiv");
        $(expanddiv).hide();
        element.set("div", expanddiv);
        //点击按钮切换下拉框显示/隐藏
        $(button).click(function () {
            element.toggleExpand();
        });
        $(button).mouseout(function () {
            $(expanddiv).hide();
        });
        $(expanddiv).mouseover(function () {
            $(expanddiv).show();
        });
        $(expanddiv).mouseout(function () {
            $(expanddiv).hide();
        });
        //添加到主元素中
        span.appendChild(button);
        document.body.appendChild(expanddiv);
        //绑定数据
        var options = element.getElementsByTagName("Gf-Option");
        if (options) {
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                this.addOption(option.getAttribute("value"), option.getAttribute("label"));
            }
        }
        return span;
    }
}
ButtonComboBox.elementName = "Gf-ButtonComboBox".toLowerCase();
ButtonComboBox.register();
/// <reference path="UIComponentBase.ts" />
/** 计算 */
class CalcComponent extends UIComponentBase {
    constructor() {
        super();
    }
    /** 公式 */
    get formula() {
        return this.getAttribute("formula");
    }
    set formula(val) {
        this.setAttribute("formula", val);
    }
    /** 值 */
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        this.setAttribute("value", val);
    }
    /** 高 */
    get height() {
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val);
    }
    /** 宽 */
    get width() {
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val);
    }
    onRender() {
        var element = this;
        var div = document.createElement("div");
        $(div).addClass("GfCalcu");
        $(div).attr("width", "99.7%");
        $(div).css("width", "99.7%");
        var calformula = element.formula;
        var p = /\[([^\]]*)\]/g;
        var s = [], m;
        while (m = p.exec(element.formula)) {
            s.push(m[0]);
        }
        for (var key in s) {
            var componentid = s[key].replace("[", "").replace("]", "").split("/");
            var componentobj = document.getElementById(componentid);
            if (componentobj) {
                var componentvalue = componentobj.getValue();
                if (componentvalue) {
                    calformula = calformula.replace(s[key], componentvalue);
                }
            }
        }
        element.value = eval(calformula);
        div.innerHTML = element.value;
        //element.appendChild(div);
        return div;
    }
}
CalcComponent.elementName = "gf-CalcComponent".toLowerCase();
CalcComponent.register();
/// <reference path="UIComponentBase.ts" />
/** 计算 */
class CalcProperty extends UIComponentBase {
    constructor() {
        super();
    }
    /** 对象ID */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }
    /** 公式 */
    get formula() {
        return this.getAttribute("formula");
    }
    set formula(val) {
        this.setAttribute("formula", val);
    }
    /** 值 */
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        this.setAttribute("value", val);
    }
    /** 高 */
    get height() {
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val);
    }
    /** 宽 */
    get width() {
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val);
    }
    onRender() {
        var element = this;
        var div = document.createElement("div");
        $(div).addClass("GfCalcProperty");
        $(div).attr("width", "99.7%");
        $(div).css("width", "99.7%");
        var calformula = element.formula;
        var p = /\[([^\]]*)\]/g;
        var s = [], m;
        while (m = p.exec(element.formula)) {
            s.push(m[0]);
        }
        var obj = element.getObjektData([element.objektId]).get(element.objektId);
        for (var key in s) {
            var propertyobj = obj;
            var propertyvalue = "";
            var propertynames = s[key].replace("[", "").replace("]", "").split("/");
            for (var i = 1; i < propertynames.length; i++) {
                propertyvalue = propertyobj[propertynames[i]];
                if (i == propertynames.length - 1) {
                    break;
                }
                else {
                    propertyobj = element.getObjektData([propertyvalue]).get(propertyvalue);
                }
            }
            if (propertyvalue) {
                calformula = calformula.replace(s[key], propertyvalue);
            }
        }
        element.value = eval(calformula);
        div.innerHTML = element.value;
        return div;
    }
}
CalcProperty.elementName = "gf-CalcProperty".toLowerCase();
CalcProperty.register();
/// <reference path="UIComponentBase.ts" />
/** 计算 */
class Calcu extends UIComponentBase {
    constructor() {
        super();
    }
    /** 对象ID */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }
    /** 公式 */
    get formula() {
        return this.getAttribute("formula");
    }
    set formula(val) {
        this.setAttribute("formula", val);
    }
    /** 值 */
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        this.setAttribute("value", val);
    }
    /** 高 */
    get height() {
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val);
    }
    /** 宽 */
    get width() {
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val);
    }
    onRender() {
        var element = this;
        var div = document.createElement("div");
        $(div).addClass("GfCalcu");
        $(div).attr("width", "99.7%");
        $(div).css("width", "99.7%");
        var calformula = element.formula;
        var p = /\[([^\]]*)\]/g;
        var s = [], m;
        while (m = p.exec(element.formula)) {
            s.push(m[0]);
        }
        var obj = element.getObjektData([element.objektId]).get(element.objektId);
        for (var key in s) {
            var propertyobj = obj;
            var propertyvalue = "";
            var propertynames = s[key].replace("[", "").replace("]", "").split("/");
            for (var i = 1; i < propertynames.length; i++) {
                propertyvalue = propertyobj[propertynames[i]];
                if (i == propertynames.length - 1) {
                    break;
                }
                else {
                    propertyobj = element.getObjektData([propertyvalue]).get(propertyvalue);
                }
            }
            if (propertyvalue) {
                calformula = calformula.replace(s[key], propertyvalue);
            }
        }
        element.value = eval(calformula);
        div.innerHTML = element.value;
        //element.appendChild(div);
        return div;
    }
}
Calcu.elementName = "gf-calcu".toLowerCase();
Calcu.register();
///<reference path="UIComponentBase.ts" />
/*欢迎页
  组件名Gf-Dashboard

  属性:
 
  方法:

  事件:

*/
class Dashboard extends UIComponentBase {
    constructor() {
        super();
        /** 数据提交模型*/
        this._submitModel = new Array();
    }
    /** 欢迎页ID*/
    get dashboardId() {
        if (!this._dashboardId) {
            if (this.initialModel.IsMyOwn == true) {
                this._dashboardId = this.initialModel.DashboardId;
            }
            else {
                var newDashboardModel = this.newObjekt("Dashboard");
                this._dashboardId = newDashboardModel.id;
            }
        }
        return this._dashboardId;
    }
    /** 后台数据模型*/
    get initialModel() {
        return this._initialModel;
    }
    set initialModel(val) {
        this._initialModel = val;
    }
    /** 数据提交模型*/
    get submitModel() {
        return this._submitModel;
    }
    set submitModel(val) {
        this._submitModel = val;
    }
    //菜单项集合
    get menuTreeItem() {
        return $("#westDiv").find("gf-tree").find(".tree-node");
    }
    //取得菜单组件集合
    get menuTree() {
        return $("#westDiv").find("gf-tree");
    }
    created() {
        this.isMessageBoundary = true;
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    disconnected() {
        this.MenuDragCancel();
    }
    onRender() {
        return this.DashboardInit();
    }
    afterRender() {
        this.ModelFill();
        $(this._dashboardLayout).layout('resize', {
            width: '100%',
            height: '100%'
        });
    }
    /**
    *模型填充
    */
    ModelFill() {
        if (!this._initialModel) {
            var that = this;
            this.GetDashboard(function (DataModel) { that.DataFill(DataModel); });
        }
        if (this.state == UIState.browse) {
            $(this._confirmEditButton).show();
            $(this._cancelEditButton).hide();
            $(this._addWidgetButton).hide();
            $(this._saveButton).hide();
            this.MenuDragCancel();
        }
        else {
            $(this._confirmEditButton).hide();
            $(this._cancelEditButton).show();
            $(this._addWidgetButton).show();
            $(this._saveButton).show();
            this.MenuDragEnabled();
        }
    }
    /** 数据填充*/
    DataFill(DataModel) {
        $(this._dashboardCenter).html(DataModel.Content);
        var gfwidget = $(this._dashboardCenter).find("gf-widget");
        var that = this;
        $(gfwidget).each(function () {
            var widget = this;
            widget.state = that.state;
            that.RegisterGfwidgetDrag(widget);
        });
    }
    /*
    * 获取欢迎页数据
    * @param 回调函数
    */
    GetDashboard(LoadData) {
        var that = this;
        window["platformAjax"]({
            url: ComponentRoot.APIs.getDashboardInfo,
            type: "post",
            data: {},
            success: function (result) {
                var DashboardModel = eval("(" + result.Data + ")");
                that._initialModel = DashboardModel;
                LoadData(DashboardModel);
            },
            fail: function (result) {
            }
        });
    }
    /** 欢迎页初始化*/
    DashboardInit() {
        var that = this;
        $(that).addClass("GfDashboard");
        //组件容器Div
        var DashboardPanel = document.createElement("div");
        $(DashboardPanel).addClass("GfDashboardPanel");
        //创建布局Div
        var DashboardPanel_Layout = document.createElement("div");
        $(DashboardPanel).append(DashboardPanel_Layout);
        $(DashboardPanel_Layout).layout({
            fit: true
        });
        that._dashboardLayout = DashboardPanel_Layout;
        //增加北部面板
        $(DashboardPanel_Layout).layout('add', {
            region: 'north',
            height: 41
        });
        //增加下方内容面板
        $(DashboardPanel_Layout).layout('add', {
            region: 'center'
        });
        //北部面板容器Div
        var DashboardPanel_Layout_LayoutNorth_NorthPanel = document.createElement("div");
        $(DashboardPanel_Layout_LayoutNorth_NorthPanel).addClass("NorthPanel");
        var DashboardPanel_Layout_LayoutNorth = $(DashboardPanel_Layout).layout("panel", "north");
        $(DashboardPanel_Layout_LayoutNorth).append(DashboardPanel_Layout_LayoutNorth_NorthPanel);
        that._dashboardNorth = DashboardPanel_Layout_LayoutNorth_NorthPanel;
        //欢迎页北部初始化
        that.DashboardNorthInit();
        //内容面板容器Div
        var DashboardPanel_Layout_LayoutNorth_CenterPanel = document.createElement("div");
        $(DashboardPanel_Layout_LayoutNorth_CenterPanel).addClass("CenterPanel");
        var DashboardPanel_Layout_LayoutCenter = $(DashboardPanel_Layout).layout("panel", "center");
        $(DashboardPanel_Layout_LayoutCenter).append(DashboardPanel_Layout_LayoutNorth_CenterPanel);
        that._dashboardCenter = DashboardPanel_Layout_LayoutCenter;
        //欢迎页中心内容初始化
        that.DashboardCenterInit();
        //菜单拖动控制
        that.MenuDragInit();
        return DashboardPanel;
    }
    /*
    *欢迎页北部初始化
    */
    DashboardNorthInit() {
        var that = this;
        var DashboardNorth = that._dashboardNorth;
        //编辑确定按钮
        var ConfirmEditButton = document.createElement("a");
        $(ConfirmEditButton).addClass("ToolButton");
        $(ConfirmEditButton).linkbutton({
            width: 72,
            height: 20,
            text: "编辑",
            onClick: function () { that.ConfirmEditButtonClick(); }
        });
        this._confirmEditButton = ConfirmEditButton;
        //编辑取消按钮
        var CancelEditButton = document.createElement("a");
        $(CancelEditButton).addClass("ToolButton");
        $(CancelEditButton).linkbutton({
            width: 72,
            height: 20,
            text: "取消编辑",
            onClick: function () { that.CancelEditButtonClick(); }
        });
        this._cancelEditButton = CancelEditButton;
        //增加部件按钮
        var AddWidgetButton = document.createElement("a");
        $(AddWidgetButton).addClass("ToolButton");
        $(AddWidgetButton).linkbutton({
            width: 72,
            height: 20,
            text: "新增小部件",
            onClick: function () { that.AddWidgetButtonClick(); }
        });
        this._addWidgetButton = AddWidgetButton;
        //保存按妞
        var SaveButton = document.createElement("a");
        $(SaveButton).addClass("ToolButton");
        $(SaveButton).linkbutton({
            width: 72,
            height: 20,
            text: "保存",
            onClick: function () { that.SaveButtonClick(); }
        });
        this._saveButton = SaveButton;
        $(DashboardNorth).append(ConfirmEditButton);
        $(DashboardNorth).append(CancelEditButton);
        $(DashboardNorth).append(AddWidgetButton);
        $(DashboardNorth).append(SaveButton);
    }
    /**
    *编辑确定按钮点击
    */
    ConfirmEditButtonClick() {
        //发送编辑消息
        this.sendMessage(new UIMessageStateSwitching(this.state, UIState.edit));
    }
    /**
    *编辑取消按钮点击
    */
    CancelEditButtonClick() {
        //发送浏览消息
        this.sendMessage(new UIMessageStateSwitching(this.state, UIState.browse));
    }
    /**
    *增加小部件按钮点击
    */
    AddWidgetButtonClick() {
        this.AddWidget();
    }
    /**
    *增加部件
    */
    AddWidget() {
        var DashboardCenter = this._dashboardCenter;
        var WidgetModel = this.newObjekt("Widget");
        this.submitModel.push({ "id": WidgetModel.id, objektState: ObjektState.Created, "isMaximizable": true, "isClosable": true });
        this.CheckIsModify();
        //创建部件
        var GfWidget = new Widget();
        GfWidget.widgetId = WidgetModel.id;
        GfWidget.widgetstatus = ObjektState.Created;
        this.RegisterGfwidgetDrag(GfWidget);
        $(DashboardCenter).append(GfWidget);
        GfWidget.state = UIState.edit;
    }
    /**
    *保存按钮点击
    */
    SaveButtonClick() {
        this.DashboardSave();
        this.sendMessage(new UIMessageSaving());
    }
    /**
    *欢迎页保存
    */
    DashboardSave() {
        var that = this;
        //初始数据模型
        var InitialModel = that.initialModel;
        //提交数据模型
        var SubmitModel = that.submitModel;
        //得到将要保存的Html
        var DashboardCenterHtml = this.GetDashboardCenterHtml();
        //得到中心内容区域
        var DashboardCenter = that._dashboardCenter;
        if (InitialModel.Content != DashboardCenterHtml) {
            //自己的欢迎页
            if (InitialModel.IsMyOwn == true) {
                //更新
                SubmitModel.push({ "id": that.dashboardId, "objektState": ObjektState.Updated, "content": DashboardCenterHtml });
            }
            else {
                //新增
                SubmitModel.push({ "id": that.dashboardId, "objektState": ObjektState.Created, "content": DashboardCenterHtml, "name": InitialModel.MySelfIdentityId + "-Dashboard", "label": InitialModel.MySelfIdentityId + "-Dashboard" });
                //新增身份个性化
                var newIdentityPersonalizationModel = that.newObjekt("IdentityPersonalization");
                SubmitModel.push({ "id": newIdentityPersonalizationModel.id, "objektState": ObjektState.Created, "source": InitialModel.MySelfIdentityId, "related": that.dashboardId });
            }
        }
        this.CheckIsModify();
    }
    /**
    *得到欢迎页内Html
    */
    GetDashboardCenterHtml() {
        var that = this;
        //初始数据模型
        var InitialModel = that.initialModel;
        //提交数据模型
        var SubmitModel = that.submitModel;
        //得到中心内容区域
        var DashboardCenter = that._dashboardCenter;
        var DashboardCenterHtml = "";
        //找到小部件
        var gfwidget = $(DashboardCenter).find("gf-widget");
        //小部件处理
        $(gfwidget).each(function () {
            var widget1 = this;
            //小部件为原始状态和修改状态
            if (widget1.widgetstatus == ObjektState.Original || widget1.widgetstatus == ObjektState.Updated) {
                DashboardCenterHtml += that.WidgetToHtml(widget1);
                //不是自己的欢迎页,则复制这个Widget并新增小部件关联
                if (InitialModel.IsMyOwn == false) {
                    //复制这个Widget
                    var newWidgetModel = that.newObjekt("Widget");
                    SubmitModel.push({ "id": newWidgetModel.id, objektState: ObjektState.Created, "title": widget1.widgetTitle, "isMaximizable": widget1.isMaximizable, "isClosable": widget1.isClosable });
                    //复制WidgetMenu菜单关联
                    $(widget1.widgetMenuModel).each(function () {
                        var WidgetMenuItemModel = that.newObjekt("WidgetMenuItem");
                        SubmitModel.push({ "id": WidgetMenuItemModel.id, objektState: ObjektState.Created, "source": newWidgetModel.id, "related": this.menuId, "sortOrder": this.menuSortOrder });
                    });
                    //新增小部件关联
                    var newDashboardWidgetModel = that.newObjekt("DashboardWidget");
                    SubmitModel.push({ "id": newDashboardWidgetModel.id, "objektState": ObjektState.Created, "source": that.dashboardId, "related": newWidgetModel.id });
                    //替换掉Html里的部件ID
                    DashboardCenterHtml.replace(widget1.widgetId, newWidgetModel.id);
                }
            }
            else if (widget1.widgetstatus == ObjektState.Created) {
                DashboardCenterHtml += that.WidgetToHtml(widget1);
                //新增小部件关联
                var newDashboardWidgetModel = that.newObjekt("DashboardWidget");
                SubmitModel.push({ "id": newDashboardWidgetModel.id, "objektState": ObjektState.Created, "source": that.dashboardId, "related": widget1.widgetId });
            }
            else if (widget1.widgetstatus == ObjektState.Deleted) {
                //是自己的欢迎页则删除数据,不是自己的欢迎页不做处理
                if (InitialModel.IsMyOwn == true) {
                    //判断初始数据模型是否有这条数据
                    var dashboardWidgetIndex = Utils.ObjectArraySearch(InitialModel.DashboardWidgetList, "WidgetId", this.widgetid);
                    //如果有这条数据则删除
                    if (dashboardWidgetIndex != -1) {
                        SubmitModel.push({ "id": InitialModel.DashboardWidgetList[dashboardWidgetIndex].DashboardWidgetId, "objektState": ObjektState.Deleted });
                    }
                }
            }
        });
        return DashboardCenterHtml;
    }
    /**
    *Widget转换成Html标签
    * @param widget 小部件对象
    */
    WidgetToHtml(widget) {
        var newWidget = new Widget();
        newWidget.width = widget.width;
        newWidget.height = widget.height;
        newWidget.widgetId = widget.widgetId;
        return $(newWidget).prop("outerHTML");
    }
    /**
    *欢迎页中心内容初始化
    */
    DashboardCenterInit() {
    }
    /**
    *菜单拖动初始化
    */
    MenuDragInit() {
        var that = this;
        //拖动代理样式
        var DraggablePanel = document.createElement("div");
        $(DraggablePanel).addClass("GfDashboard DraggablePanel");
        //拖动图标
        var DraggableEnable = document.createElement("span");
        $(DraggableEnable).addClass("DraggableDisable");
        $(DraggablePanel).append(DraggableEnable);
        //菜单拖动图标
        that._menuDraggableImg = DraggableEnable;
        //拖动内容
        var DraggableContent = document.createElement("div");
        $(DraggablePanel).append(DraggableContent);
        //菜单项拖动设置
        that.menuTreeItem.draggable({
            revert: true,
            proxy: function (source) {
                var cloneSource = $(source).clone();
                $(cloneSource).find(".tree-indent").remove();
                $(cloneSource).find(".GfDashboard.DraggableTips").remove();
                $(DraggableContent).html($(cloneSource).html());
                var drag = $(DraggablePanel).appendTo('body');
                return drag;
            },
            disabled: true
        });
    }
    /**
    *注册小部件拖动事件
    *@param gfwidget 小部件对象
    */
    RegisterGfwidgetDrag(gfwidget) {
        //拖拽图标
        var DraggableImg = this._menuDraggableImg;
        gfwidget.onAfterDragEnter(function () {
            //菜单拖拽成功图标
            $(DraggableImg).removeClass("DraggableDisable").addClass("DraggableEnable");
        });
        gfwidget.onAfterDragLeave(function () {
            //菜单拖拽成功图标
            $(DraggableImg).removeClass("DraggableEnable").addClass("DraggableDisable");
        });
        gfwidget.onAfterDragEnd(function () {
            //菜单拖拽失败图标
            $(DraggableImg).removeClass("DraggableEnable").addClass("DraggableDisable");
        });
    }
    /**
    *菜单拖动取消
    */
    MenuDragCancel() {
        var that = this;
        var MenuTree = that.menuTree;
        var MenuTreeItem = that.menuTreeItem;
        //菜单拖动提示
        var MenuDragTips = document.createElement("div");
        $(MenuDragTips).addClass("GfDashboard DraggableTips");
        //菜单可拖动
        $(MenuTreeItem).draggable("disable");
        //菜单拖动提示
        $(MenuTreeItem).find(".GfDashboard.DraggableTips").remove();
        $(MenuTree).each(function () {
            //菜单点击事件开启            
            this.isMenuClick = true;
        });
    }
    /**
    *菜单拖动启用
    */
    MenuDragEnabled() {
        var that = this;
        var MenuTree = that.menuTree;
        var MenuTreeItem = that.menuTreeItem;
        //菜单拖动提示
        var MenuDragTips = document.createElement("div");
        $(MenuDragTips).addClass("GfDashboard DraggableTips");
        //菜单可拖动
        $(MenuTreeItem).draggable("enable");
        //菜单拖动提示
        $(MenuTreeItem).find(".GfDashboard.DraggableTips").remove();
        $(MenuTreeItem).prepend(MenuDragTips);
        $(MenuTree).each(function () {
            //菜单点击事件关闭            
            this.isMenuClick = false;
        });
    }
    /**
    * 检查组件是否修改
    */
    CheckIsModify() {
        if (this.submitModel.length > 0) {
            this.setModified(true);
        }
        else {
            this.setModified(false);
        }
    }
    onObjektDataWriteback() {
        var that = this;
        $(that.submitModel).each(function () {
            if (this.objektState == ObjektState.Created) {
                delete this.objektState;
                that.createObjekts([this]);
            }
            else if (this.objektState == ObjektState.Updated) {
                delete this.objektState;
                that.updateObjekts([this]);
            }
            else if (this.objektState == ObjektState.Deleted) {
                delete this.objektState;
                that.deleteObjekts([this]);
            }
        });
    }
    onRecievedMessage(message, source) {
        super.onRecievedMessage(message, source);
        if (message instanceof UIMessageObjektDeleted) {
            var submitModelIndex = Utils.ObjectArraySearch(this.submitModel, "id", message.objektId);
            if (submitModelIndex != -1) {
                this.submitModel.splice(submitModelIndex, 1);
                this.CheckIsModify();
            }
        }
        //状态转换前
        if (message instanceof UIMessageStateSwitching) {
        }
        else if (message instanceof UIMessageStateSwitched) {
            //浏览状态清空提交数据
            if (this.state == UIState.browse) {
                if (this.submitModel.length > 0) {
                    this.submitModel = [];
                    this.CheckIsModify();
                    this.initialModel = "";
                }
                this.ModelFill();
            }
            else {
                this.ModelFill();
            }
        }
        else if (message instanceof UIMessageSaving) {
            //判断是否能保存
        }
        else if (message instanceof UIMessageSaved) {
            if (this.submitModel.length > 0) {
                if (this.initialModel.IsMyOwn != true) {
                    this.initialModel = "";
                    //中心内容切换成自己的
                    this.ModelFill();
                }
                this.submitModel = [];
                this.initialModel = "";
                this.CheckIsModify();
            }
            this.alert("保存成功");
        }
    }
}
Dashboard.elementName = "Gf-Dashboard".toLowerCase();
Dashboard.register();
/// <reference path="UIComponentBase.ts" />
/** 面板 */
class Panel extends UIComponentBase {
    constructor() {
        super();
        /** 内容 */
        this._contents = new Array();
    }
    /** 内容 */
    get contents() {
        return this._contents;
    }
    /** 容器 */
    get div() {
        return this._panel;
    }
    set div(val) {
        this._panel = val;
    }
    /** 是否最大化 */
    get max() {
        return this._max;
    }
    set max(val) {
        this._max = val;
    }
    /** 标题 */
    get title() {
        return this.getAttribute("title");
    }
    set title(val) {
        this.setAttribute("title", val);
    }
    /** 面板内容url */
    get href() {
        return this.getAttribute("href");
    }
    set href(val) {
        this.setAttribute("href", val);
    }
    appendContent(component) {
        $(component).appendTo(this._panel);
        this._contents.push(component);
    }
    clearContent() {
        $(this._panel).html('');
        this._contents = [];
    }
    maximize() {
        $(this._panel).panel('maximize');
    }
    restore() {
        $(this._panel).panel('restore');
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    onRender() {
        var element = this;
        var span = document.createElement("span");
        var div = document.createElement("div");
        this._panel = div;
        element._max = false;
        span.appendChild(div);
        var control = this;
        $(div).css("padding", "2px");
        $(div).panel({
            title: element.title || '',
            width: element.width || 800,
            height: element.height || 600,
            resizable: true,
            maximizable: true,
            cache: false,
            onMaximize: function () {
                element._max = true;
                element.fireHook(EventNames.Maximize);
            },
            onRestore: function () {
                element._max = false;
                element.fireHook(EventNames.Restore);
            }
        });
        return span;
    }
}
Panel.elementName = "Gf-Panel".toLowerCase();
Panel.register();
/// <reference path="Panel.ts" />
/** 对话框 */
class Dialog extends Panel {
    constructor() {
        super();
    }
    /** 是否模态 */
    get modal() {
        return this.safeToString(this.getAttribute("modal")).toLowerCase() == "true";
    }
    set modal(val) {
        this.setAttribute("modal", val === true ? "true" : "false");
    }
    onOpen(handler) {
        this.addHook(EventNames.Open, handler);
    }
    onMaximize(handler) {
        this.addHook(EventNames.Maximize, handler);
    }
    onRestore(handler) {
        this.addHook(EventNames.Restore, handler);
    }
    onBeforeClose(handler) {
        this.addHook(EventNames.BeforeClose, handler);
    }
    onClose(handler) {
        this.addHook(EventNames.Close, handler);
    }
    open() {
        var div = this.div;
        $(div).dialog({
            title: this.title,
            width: this.width || 1200,
            height: this.height || 600,
            modal: this.modal
        });
        if (this.href) {
            $(div).dialog({ href: this.href });
        }
        this.restore();
        $(div).dialog('open');
        this.fireHook(EventNames.Open);
    }
    close() {
        $(this.div).dialog('close');
    }
    maximize() {
        $(this.div).dialog('maximize');
    }
    restore() {
        $(this.div).dialog('restore');
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    onRender() {
        var span = document.createElement("span");
        var element = this;
        var div = document.createElement("div");
        element.div = div;
        element.max = false;
        span.appendChild(div);
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
                element.max = true;
                element.fireHook(EventNames.Maximize);
            },
            onRestore: function () {
                element.max = false;
                element.fireHook(EventNames.Restore);
            },
            onBeforeClose: function () {
                element.fireHook(EventNames.BeforeClose);
            },
            onClose: function () {
                element.fireHook(EventNames.Close);
            },
            modal: element.modal
        });
        $(div).dialog("header").dblclick(function (event) {
            if (element.max) {
                $(div).dialog("restore");
                element.max = false;
            }
            else {
                $(div).dialog("maximize");
                element.max = true;
            }
        });
        return span;
    }
}
Dialog.elementName = "Gf-Dialog".toLowerCase();
Dialog.register();
/*生命周期
  组件名Gf-Lifecycle

  属性:
  width:组件宽度(默认100%)
  height:组件高度(默认100%)
  newnodename:新建节点名称,默认值"新状态"
  newlinkname:新建链接名称,默认值"改变"
  lifecycleid:生命周期对象ID,必填

  方法:
  //得到视图数据
  GetDiagramData:

  事件:

*/
class Lifecycle extends UIComponentBase {
    constructor() {
        super();
        /** 数据提交模型 */
        this._submitModel = [];
        /** 初始数据模型 */
        this._initialModel = [];
    }
    /** 视图 */
    get lifecycleDiagram() {
        return this._lifecycleDiagram;
    }
    /** 组件宽度(默认100%) */
    get width() {
        if (!this.getAttribute("width")) {
            return "100%";
        }
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val.toString());
    }
    /** 组件高度(默认100%) */
    get height() {
        if (!this.getAttribute("height")) {
            return "100%";
        }
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val.toString());
    }
    /** 新建节点名称,默认值"新状态" */
    get newNodeName() {
        if (!this.getAttribute("newnodename")) {
            return this.GetNewNodeName("新状态");
        }
        else {
            return this.GetNewNodeName(this.getAttribute("newnodename"));
        }
    }
    /** 获得新建节点的名称 */
    GetNewNodeName(newNodeName) {
        var nodeModel = this._lifecycleDiagram.model.nodeDataArray;
        var createNodeName = newNodeName;
        var countString = "";
        var count = 1;
        $(nodeModel).each(function () {
            var nodeIndex = Utils.ObjectArraySearch(nodeModel, "text", createNodeName + count);
            if (nodeIndex != -1) {
                countString = count.toString();
                count++;
            }
        });
        return createNodeName + count;
    }
    /** 新建链接名称,默认值"改变" */
    get newLinkName() {
        if (!this.getAttribute("newlinkname")) {
            return "改变";
        }
        return this.getAttribute("newlinkname");
    }
    set newLinkName(val) {
        this.setAttribute("newlinkname", val.toString());
    }
    /** 生命周期对象ID,必填 */
    get lifecycleId() {
        return this.getAttribute("lifecycleId");
    }
    set lifecycleId(val) {
        this.setAttribute("lifecycleId", val.toString());
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    onRender() {
        return this.LifecycleInit();
    }
    created() {
        this.isMessageBoundary = true;
    }
    /*
    * 组件初始化
    */
    LifecycleInit() {
        var that = this;
        //创建视图面板
        var LifecyclePanel = document.createElement("div");
        LifecyclePanel.id = this.getUniqueId("LifecyclePanel");
        $(LifecyclePanel).css({
            "width": that.width,
            "height": that.height
        });
        $(LifecyclePanel).addClass("GfLifecycle");
        that._lifecyclePanel = LifecyclePanel;
        this.DiagramInit();
        return LifecyclePanel;
    }
    /*
    * 视图初始化
    */
    DiagramInit() {
        var that = this;
        //引用go.js
        that.includeJS(ComponentRoot.apppath + "/Platform/Content/Scripts/go.js");
        this._goJs = window["go"];
        this._goMake = this._goJs.GraphObject.make;
        //声明视图  
        var lifecycleDiagram;
        //初始化视图窗口
        lifecycleDiagram =
            //必须命名或引用DIV HTML元素
            that._goMake(that._goJs.Diagram, that._lifecyclePanel, {
                //启动视图中间的所有内容,确保视图初始化的时候内容始终在视图的中心
                initialContentAlignment: that._goJs.Spot.Center,
                //鼠标滚轮事件放大和缩小而不是上下滚动
                "toolManager.mouseWheelBehavior": that._goJs.ToolManager.WheelZoom,
                //双击创建新节点数据
                "clickCreatingTool.archetypeNodeData": {},
                //双击创建新节点事件
                "clickCreatingTool.insertPart": function (loc) {
                    //创建节点视图模型                                      
                    this.archetypeNodeData = that.CreateNewNodeModel();
                    return that._goJs.ClickCreatingTool.prototype.insertPart.call(this, loc);
                },
                //创建新链接数据
                "linkingTool.archetypeLinkData": {},
                //创建新链接事件
                "linkingTool.insertLink": function (fromnode, fromport, tonode, toport) {
                    this.archetypeLinkData = that.CreateNewLinkModel();
                    return that._goJs.LinkingTool.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);
                },
                //启用撤消和重做
                "undoManager.isEnabled": true,
                //不允许内部剪切板复制
                "allowClipboard": false,
                isEnabled: false
            });
        //视图模型绑定唯一主键id
        lifecycleDiagram.model.nodeKeyProperty = "id";
        that._lifecycleDiagram = lifecycleDiagram;
        //节点模版初始化
        that.NodeTemplateInit();
        //链接模版初始化
        that.LinkTemplateInit();
        //创建一个用于向后台提交数据的数据模型,用于记录数据的增加,删除,修改        
        that.set("submitModel", []);
        //加载数据模型
        this.LoadModel();
        //注册视图模型修改监听
        that.ModelChangedListener();
    }
    /*
    * 节点模版初始化
    */
    NodeTemplateInit() {
        var that = this;
        //定义节点模板,节点外形
        that._lifecycleDiagram.nodeTemplate =
            that._goMake(that._goJs.Node, "Auto", 
            //将节点的location位置属性绑定在视图模版内容的loc中
            //go.Point.parse:强制将实际的属性值转换为location位置属性,这里用于将源数据值转换为location
            //makeTwoWay将视图模型上的更改传播回数据,这里用于回传更改
            new that._goJs.Binding("location", "loc", that._goJs.Point.parse).makeTwoWay(that._goJs.Point.stringify), 
            // 定义节点的外形，将环绕TextBlock
            that._goMake(that._goJs.Shape, "RoundedRectangle", {
                //节点外形圆角半径
                parameter1: 5,
                //节点颜色,渐变色从一个颜色到另一个颜色，从上到下（默认）
                fill: that._goMake(that._goJs.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                //节点外边框颜色,为null标识没有外边框
                stroke: null,
                //此形状是节点的端口，而不是整个节点
                portId: "",
                //获取或设置用户是否可以从此端口绘制链接
                fromLinkable: true,
                //获取或设置用户是否可以绘制从该端口的Node连接的链接
                fromLinkableSelfNode: true,
                //获取或设置用户是否可以从此端口绘制重复的链接
                fromLinkableDuplicates: true,
                //获取或设置用户是否可以向该端口绘制链接
                toLinkable: true,
                //获取或设置用户是否可以绘制连接到此端口的节点的链接
                toLinkableSelfNode: true,
                //获取或设置用户是否可以向该端口绘制重复的链接
                toLinkableDuplicates: true,
                //光标悬停在节点上鼠标的外形
                cursor: "pointer"
            }), 
            //定义节点的文字内容
            that._goMake(that._goJs.TextBlock, {
                //字体
                font: "bold 11pt helvetica, bold arial, sans-serif",
                //编辑文本自动更新模型数据
                editable: true,
                margin: new that._goJs.Margin(5, 7, 5, 7)
            }, 
            //回传text的更改
            new that._goJs.Binding("text").makeTwoWay()));
        //定义节点选择模版,节点选中处理
        that._lifecycleDiagram.nodeTemplate.selectionAdornmentTemplate =
            //装饰spot
            that._goMake(that._goJs.Adornment, "Spot", that._goMake(that._goJs.Panel, "Auto", 
            //选中之后的外形
            that._goMake(that._goJs.Shape, { fill: null, stroke: "#00CCFF", strokeWidth: 1 }), 
            //选择的外形与节点的边距为0
            that._goMake(that._goJs.Placeholder)), 
            // 在右上角创建一个“下一个”节点的按钮。
            that._goMake("Button", {
                //按钮显示在右上角
                alignment: that._goJs.Spot.TopRight,
                //调用创建新节点方法
                click: addNodeAndLink
            }, 
            //按钮外形
            that._goMake(that._goJs.Shape, "PlusLine", { width: 6, height: 6 })));
        function addNodeAndLink(e, obj) {
            //节点
            var adornment = obj.part;
            //视图
            var diagram = e.diagram;
            //开始一个"增加状态"的事务
            diagram.startTransaction("Add State");
            // 获取用户单击按钮的节点数据。
            var fromNode = adornment.adornedPart;
            var fromData = fromNode.data;
            //创建一个新的“状态”数据对象，定位在节点的右侧。
            var toData = that.CreateNewNodeModel();
            //获取用户单机按钮的节点位置
            var p = fromNode.location.copy();
            //新节点的位置往右偏移200
            p.x += 200;
            //"LOC"属性是字符串，而不是点对象。
            toData["loc"] = that._goJs.Point.stringify(p);
            // 添加新的节点数据的模型
            var model = diagram.model;
            model.addNodeData(toData);
            // 从旧节点数据创建链接数据到新的节点数据
            var CreateModel = that.CreateNewLinkModel();
            var linkdata = {
                id: CreateModel["id"],
                text: CreateModel["text"],
                //旧结点
                from: model.getKeyForNodeData(fromData),
                //新节点
                to: model.getKeyForNodeData(toData),
            };
            //并添加链接数据模型
            model.addLinkData(linkdata);
            // 选择新节点
            var newnode = diagram.findNodeForData(toData);
            diagram.select(newnode);
            //结束一个"增加状态"的事务
            diagram.commitTransaction("Add State");
            // 如果新节点已关闭屏幕，则滚动图表以显示新节点。
            diagram.scrollToRect(newnode.actualBounds);
        }
    }
    /*
    * 链接模版初始化
    */
    LinkTemplateInit() {
        var that = this;
        //定义链接模版,链接的外形
        that._lifecycleDiagram.linkTemplate =
            //整个链接面板
            that._goMake(that._goJs.Link, {
                //曲线类型,"Bezier"曲线
                curve: that._goJs.Link.Bezier,
                //获取或设置路由的计算方式
                adjusting: that._goJs.Link.Stretch,
                //获取或设置用户是否可以重塑曲线
                reshapable: true,
                //获取或设置用户是否可以重新连接从末端的现有链接
                relinkableFrom: true,
                //获取或设置用户是否可以重新连接到端的现有链接
                relinkableTo: true,
                //获取或设置端段距离实际端口多远
                toShortLength: 3
            }, 
            //绑定的位置回传到模型
            new that._goJs.Binding("points", "points").makeTwoWay(), 
            //弯曲度
            new that._goJs.Binding("curviness"), that._goMake(that._goJs.Shape, 
            //链接的宽度
            { strokeWidth: 2 }), that._goMake(that._goJs.Shape, // 箭头
            {
                //箭头类型
                toArrow: "standard",
                //获取或设置描绘如何用笔绘制几何图形的画笔或字符串
                stroke: null
            }), 
            //面板
            that._goMake(that._goJs.Panel, "Auto", 
            //标签的背景，它变得透明周围的边缘。
            that._goMake(that._goJs.Shape, {
                //链接颜色,渐变色从一个颜色到另一个颜色，从上到下（默认）
                fill: that._goMake(that._goJs.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
                //链接外边框颜色,为null标识没有外边框
                stroke: null
            }), that._goMake(that._goJs.TextBlock, that.newLinkName, // 标签文本
            {
                //标签对齐方式
                textAlign: "center",
                //标签字体
                font: "9pt helvetica, arial, sans-serif",
                //边距
                margin: 4,
                //启用就地编辑
                editable: true
            }, 
            //标签数据回传
            new that._goJs.Binding("text").makeTwoWay())));
    }
    /**
    * 加载视图模型数据
    */
    LoadModel() {
        var that = this;
        var diagram = that._lifecycleDiagram;
        if (!that.lifecycleId) {
            return;
        }
        window["platformAjax"]({
            url: ComponentRoot.APIs.getLifecycleInfo,
            type: "post",
            data: { lifecycleId: that.lifecycleId },
            success: function (result) {
                //将原始值存入模型中
                var initialModel = that._initialModel;
                var model = eval("(" + result.Data + ")");
                var diagramModel = { "class": window["go"].GraphLinksModel, "nodeKeyProperty": "id", "nodeDataArray": [], "linkDataArray": [] };
                $(model.ListLifecycleState).each(function () {
                    diagramModel.nodeDataArray.push({ "id": this.Id, "text": this.Label, "loc": this.Loc });
                    initialModel.push({ "id": this.Id, "name": this.Name, "label": this.Label, "loc": this.Loc });
                });
                $(model.ListLifecycleTransition).each(function () {
                    diagramModel.linkDataArray.push({ "id": this.Id, "text": this.Label, "points": that.LinkPointsToNumberArray(this.Points), "from": this.From, "to": this.To });
                    initialModel.push({ "id": this.Id, "name": this.Name, "label": this.Label, "points": this.Points, "from": this.From, "to": this.To });
                });
                diagram.model = window["go"].Model.fromJson(JSON.stringify(diagramModel));
            }
        });
    }
    /**
    * 视图模型改变监听
    */
    ModelChangedListener() {
        var that = this;
        //注册模型修改事件监听,用于监听数据的更改并向后台提交数据
        that._lifecycleDiagram.addModelChangedListener(function (e) {
            //模型数据插入
            if (e.change == that._goJs.ChangedEvent.Insert) {
                that.ModelChangedListener_Insert(e);
                that.CheckIsModify();
            }
            //模型数据删除
            if (e.change == that._goJs.ChangedEvent.Remove) {
                that.ModelChangedListener_Delete(e);
                that.CheckIsModify();
            }
            //模型数据修改
            if (e.change == that._goJs.ChangedEvent.Property) {
                that.ModelChangedListener_Modify(e);
                that.CheckIsModify();
            }
        });
    }
    /**
    * 检查组件是否修改
    */
    CheckIsModify() {
        if (this._submitModel.length > 0) {
            this.setModified(true);
        }
        else {
            this.setModified(false);
        }
    }
    /**
    * 监听新增模型(在ModelChangedListener方法中使用)
    * @param modelChangeObject 模型修改对象
    */
    ModelChangedListener_Insert(modelChangeObject) {
        var that = this;
        var item = {};
        item["id"] = modelChangeObject.newValue.id;
        item["objektState"] = ObjektState.Created;
        item["name"] = modelChangeObject.newValue.text;
        item["label"] = modelChangeObject.newValue.text;
        item["source"] = that.lifecycleId;
        //节点数据新增
        if (modelChangeObject.modelChange == "nodeDataArray") {
            item["loc"] = modelChangeObject.newValue.loc;
            this._submitModel.push(item);
        }
        else if (modelChangeObject.modelChange == "linkDataArray") {
            item["points"] = that.LinkPointsTostring(modelChangeObject.newValue.points);
            item["from"] = modelChangeObject.newValue.from;
            item["to"] = modelChangeObject.newValue.to;
            this._submitModel.push(item);
        }
    }
    /**
    * 监听修改模型(在ModelChangedListener方法中使用)
    * @param modelChangeObject 模型修改对象
    */
    ModelChangedListener_Modify(modelChangeObject) {
        var that = this;
        //修改的属性名                             
        var propertyName = modelChangeObject.propertyName;
        //修改的属性值
        var newValue = modelChangeObject.newValue;
        if (propertyName == "points") {
            newValue = that.LinkPointsTostring(newValue);
        }
        if (propertyName == "from" || propertyName == "to") {
            newValue = newValue;
        }
        if (propertyName == "text") {
            propertyName = "label";
        }
        //查询修改的数据是否在原始值模型中
        var initialModelIndex = Utils.ObjectArraySearch(that._initialModel, "id", modelChangeObject.object.id);
        //原始值
        var initialValue;
        if (initialModelIndex != -1) {
            initialValue = that._initialModel[initialModelIndex][propertyName];
        }
        //查询修改的数据是否在数据提交模型中
        var submitModelIndex = Utils.ObjectArraySearch(that._submitModel, "id", modelChangeObject.object.id);
        //如果在数据提交模型中
        if (submitModelIndex != -1) {
            //与数据原始值不同则更新到提交模型中
            if (initialValue != newValue) {
                //更新修改的值                        
                that._submitModel[submitModelIndex][propertyName] = newValue;
                //如果属性为text,那么name和label一起修改
                if (propertyName == "label") {
                    if (initialValue) {
                        if (that._initialModel[initialModelIndex]["name"] == that._initialModel[initialModelIndex]["label"]) {
                            that._submitModel[submitModelIndex]["name"] = newValue;
                        }
                    }
                    else {
                        that._submitModel[submitModelIndex]["name"] = newValue;
                    }
                }
                //判断是否为新增数据
                if (that._submitModel[submitModelIndex].objektState != "C") {
                    that._submitModel[submitModelIndex].objektState = "U";
                }
            }
            else {
                //删除这条属性
                delete that._submitModel[submitModelIndex][propertyName];
                //如果属性为text,那么name和label一起删除
                if (propertyName == "label") {
                    if (that._initialModel[initialModelIndex]["name"] == that._initialModel[initialModelIndex]["label"]) {
                        delete that._submitModel[submitModelIndex]["name"];
                    }
                }
                //如果删除属性后只剩下id属性,那么整条记录删除
                var propertyCount = that.getPropertyCount(that._submitModel[submitModelIndex]);
                if (propertyCount == 2) {
                    that._submitModel.splice(submitModelIndex, 1);
                }
            }
        }
        else {
            //与数据原始值不同则插入到提交模型中
            if (newValue != initialValue) {
                var model = {};
                model["id"] = modelChangeObject.object.id;
                model[propertyName] = newValue;
                if (propertyName == "text") {
                    if (that._initialModel[initialModelIndex]["name"] == that._initialModel[initialModelIndex]["label"]) {
                        model["name"] = newValue;
                    }
                }
                model["objektState"] = "U";
                that._submitModel.push(model);
            }
        }
    }
    /**
    * 监听删除模型(在ModelChangedListener方法中使用)
    * @param modelChangeObject 模型修改对象
    */
    ModelChangedListener_Delete(modelChangeObject) {
        var that = this;
        //查询删除的数据是否在数据提交模型中                
        var submitModelIndex = Utils.ObjectArraySearch(that._submitModel, "id", modelChangeObject.oldValue.id);
        //如果在数据提交模型中
        if (submitModelIndex != -1) {
            //不是新增数据则将状态改为删除
            if (that._submitModel[submitModelIndex].objektState != ObjektState.Created) {
                that._submitModel[submitModelIndex].objektState = ObjektState.Deleted;
            }
            else {
                that._submitModel.splice(submitModelIndex, 1);
            }
        }
        else {
            var item = {};
            item["id"] = modelChangeObject.oldValue.id;
            item["objektState"] = ObjektState.Deleted;
            that._submitModel.push(item);
        }
    }
    /**
    * 链接的Points转换为string
    */
    LinkPointsTostring(points) {
        if (points) {
            var strPoint = "";
            var pointsLength = points.n.length;
            $(points.n).each(function (index) {
                strPoint += this.x + ",";
                if (pointsLength - 1 == index) {
                    strPoint += this.y;
                }
                else {
                    strPoint += this.y + ",";
                }
            });
            return strPoint;
        }
        else {
            return points;
        }
    }
    /**
    * 链接的Points转换为数字数组
    */
    LinkPointsToNumberArray(points) {
        if (points) {
            var strArray = points.split(",");
            var floatArray = [];
            $(strArray).each(function (index) {
                floatArray.push(Number(this));
            });
            return floatArray;
        }
        else {
            return points;
        }
    }
    /**
    * 创建新节点模型
    */
    CreateNewNodeModel() {
        var ModeData = {};
        var model = this.newObjekt("LifecycleState");
        ModeData["id"] = model.id;
        ModeData["text"] = this.newNodeName;
        return ModeData;
    }
    /**
    * 创建新链接模型
    */
    CreateNewLinkModel() {
        var ModeData = {};
        var model = this.newObjekt("LifecycleTransition");
        ModeData["id"] = model.id;
        ModeData["text"] = this.newLinkName;
        return ModeData;
    }
    //得到视图数据(临时)
    GetDiagramData() {
        this.SaveDiagramData();
        return this._lifecycleDiagram.model.toJson();
    }
    /**
    * 保存视图数据
    */
    SaveDiagramData() {
        this.sendMessage(new UIMessageSaving());
    }
    /**
    * 切换编辑状态
    */
    SwitchState() {
        if (this.state == UIState.browse) {
            this.sendMessage(new UIMessageStateSwitching(this._state, UIState.edit));
        }
        else {
            this.sendMessage(new UIMessageStateSwitching(this._state, UIState.browse));
        }
    }
    /**
    * 接收消息
    */
    onRecievedMessage(message, source) {
        //状态转换前
        if (message instanceof UIMessageStateSwitching) {
        }
        else if (message instanceof UIMessageStateSwitched) {
            if (this.state == UIState.browse) {
                if (this._submitModel.length > 0) {
                    this._submitModel = [];
                    this.LoadModel();
                }
                this.lifecycleDiagram.setProperties({
                    isEnabled: false
                });
            }
            else {
                this.lifecycleDiagram.setProperties({
                    isEnabled: true
                });
            }
        }
        else if (message instanceof UIMessageSaving) {
            if (!this.CheckFreeState()) {
                message.preventDoing("存在游离状态!", false);
            }
        }
        else if (message instanceof UIMessageSaved) {
            if (this._submitModel.length > 0) {
                this._submitModel = [];
                this.CheckIsModify();
                this.LoadModel();
            }
        }
        super.onRecievedMessage(message, source);
    }
    /**
    * 检测游离状态
    */
    CheckFreeState() {
        var check = true;
        var nodeModel = this._lifecycleDiagram.model.nodeDataArray;
        var linkModel = this._lifecycleDiagram.model.linkDataArray;
        $(nodeModel).each(function () {
            var fromIndex = Utils.ObjectArraySearch(linkModel, "from", this.id);
            var toIndex = Utils.ObjectArraySearch(linkModel, "to", this.id);
            if (fromIndex == -1 && toIndex == -1) {
                check = false;
                return false;
            }
        });
        return check;
    }
    /**
    * 检测开始状态
    */
    CheckStartState() {
        return false;
    }
    /**
    * 数据回传
    */
    onObjektDataWriteback() {
        var that = this;
        $(that._submitModel).each(function () {
            if (this.objektState == ObjektState.Created) {
                delete this.objektState;
                that.createObjekts([this]);
            }
            else if (this.objektState == ObjektState.Updated) {
                delete this.objektState;
                that.updateObjekts([this]);
            }
            else if (this.objektState == ObjektState.Deleted) {
                delete this.objektState;
                that.deleteObjekts([this]);
            }
        });
    }
}
Lifecycle.elementName = "Gf-Lifecycle".toLowerCase();
Lifecycle.register();
/*消息验证码
  组件名Gf-SmsCode

  属性:
  messagetemplateid:消息模版Id,必填

  messagesenderid:消息发送器Id可多个,用','分隔,必填

  accounts:消息接收账户,可多个,用','分隔,必填

  codekey:验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突

  width:组件宽度,不填默认150px

  codelength:验证码长度,不填默认长度4

  timeNumber:消息发送间隔计数,默认计数60秒

  方法:

  事件:

   //发送消息前事件
   document.querySelector("xx").registerEventHandler("BeforeSendMessage", function () {});

   //发送消息后事件
   document.querySelector("xx").registerEventHandler("AfterSendMessage", function () {});

*/
class MessageCode extends UIComponentBase {
    constructor() {
        super();
    }
    /** 消息发送间隔计数,默认计数60秒 */
    get timeNumber() {
        if (!this.getAttribute("timeNumber")) {
            return 60;
        }
        return parseInt(this.getAttribute("timeNumber"));
    }
    set timeNumber(val) {
        this.setAttribute("timeNumber", val.toString());
    }
    /** 验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突 */
    get codeKey() {
        return this.getAttribute("codekey");
    }
    set codeKey(val) {
        this.setAttribute("codekey", val.toString());
    }
    /** 组件宽度,不填默认150px */
    get width() {
        if (!this.getAttribute("width")) {
            return "150px";
        }
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val.toString());
    }
    /** 验证码长度,不填默认长度4 */
    get codeLength() {
        if (!this.getAttribute("codelength")) {
            return 4;
        }
        return parseInt(this.getAttribute("codelength"));
    }
    set codeLength(val) {
        this.setAttribute("codelength", val.toString());
    }
    /** 消息接收账户,可多个,用','分隔 */
    get accounts() {
        return this.getAttribute("accounts");
    }
    set accounts(val) {
        this.setAttribute("accounts", val.toString());
    }
    /** 消息模版Id */
    get messageTemplateId() {
        return this.getAttribute("messageTemplateId");
    }
    set messageTemplateId(val) {
        this.setAttribute("messageTemplateId", val.toString());
    }
    /** 消息发送器Id可多个,用','分隔,必填 */
    get messageSenderId() {
        return this.getAttribute("messageSenderId");
    }
    set messageSenderId(val) {
        this.setAttribute("messageSenderId", val.toString());
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    onRender() {
        return this.MessageCodeInit();
    }
    /*
    * 初始化
    */
    MessageCodeInit() {
        var that = this;
        this.id = this.id || this.getUniqueId("SmsCode");
        //控件容器
        var container = document.createElement("div");
        $(container).addClass("MessageCode");
        var btnSendMessage = document.createElement("input");
        $(btnSendMessage).attr("type", "button");
        $(btnSendMessage).attr("value", "点击免费获取");
        $(btnSendMessage).addClass("BtnSendMessage");
        $(btnSendMessage).css({
            "width": that.width
        });
        $(btnSendMessage).on("mousedown", function () {
            $(this).addClass("MouseDown");
        }).on("mouseup", function () {
            $(this).removeClass("MouseDown");
        }).on("click", function () {
            that.SendMessage();
        });
        this._btnSendMessage = btnSendMessage;
        $(container).append(btnSendMessage);
        return container;
    }
    /*
    * 发送消息
    */
    SendMessage() {
        var that = this;
        this.fireHook("BeforeSendMessage");
        if (!this.accounts) {
            return;
        }
        var data = {
            messageTemplateId: this.messageTemplateId,
            messageSenderId: this.messageSenderId,
            accounts: this.accounts,
            codeLength: this.codeLength
        };
        if (this.codeKey) {
            data["smsVerifyCodeKey"] = this.codeKey;
        }
        var btnSendMessage = this._btnSendMessage;
        $(btnSendMessage).attr("disabled", "false");
        window["platformAjax"]({
            url: ComponentRoot.APIs.sendMessageCode,
            type: "post",
            data: data,
            success: function (result) {
                that._clearIntervalId = setInterval("document.querySelector('#" + that.id + "').MessageCountDown()", 1000);
            },
            fail: function (result) {
                $(btnSendMessage).val("失败重新获取");
                $(btnSendMessage).removeAttr("disabled");
            },
            error: function () {
                $(btnSendMessage).val("失败重新获取");
                $(btnSendMessage).removeAttr("disabled");
            }
        });
        this.fireHook("AfterSendMessage");
    }
    /*
    * 消息倒数计时
    */
    MessageCountDown() {
        var btnSendMessage = this._btnSendMessage;
        this.timeNumber--;
        $(btnSendMessage).val(this.timeNumber + "秒后可重新发送");
        if (this.timeNumber == 0) {
            this.timeNumber = 60;
            $(btnSendMessage).val("点击免费获取");
            clearInterval(this._clearIntervalId);
            $(btnSendMessage).removeAttr("disabled");
        }
    }
    /*
    * 发送消息前回调
    */
    onBeforeSendMessage(eventHandler) {
        this.addHook("BeforeSendMessage", eventHandler);
    }
    /*
    * 发送消息后回调
    */
    onAfterSendMessage(eventHandler) {
        this.addHook("BeforeSendMessage", eventHandler);
    }
}
MessageCode.elementName = "Gf-MessageCode".toLowerCase();
MessageCode.register();
/// <reference path="UIComponentBase.ts" />
/** 页面（根组件） */
class Page extends UIComponentBase {
    constructor() {
        super();
        this._APIs = new API();
        this.isRoot = true;
    }
    static get pageInstance() {
        if (!this._singleInstance) {
            this._singleInstance = new Page();
            var element = this;
            $(document).ready(function () {
                element._singleInstance.init();
            });
        }
        return this._singleInstance;
    }
    /** 应用程序域名 */
    get apppath() {
        if (!this._apppath) {
            this._apppath = document.body.getAttribute("apppath");
        }
        return this._apppath;
    }
    /** API集合对象 */
    get APIs() {
        return this._APIs;
    }
    /**
     * 注册组件自定义标签
     */
    static register() {
        super.register();
        //设置全局唯一对象
        ComponentRoot = this.pageInstance;
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /**
     * 打开对话框
     * @param option option属性 : id,title,modal,content,href,width,height,onBeforeClose,onClose,onOpen
     */
    openDialog(option) {
        var dialog = document.getElementById(option.id);
        if (!dialog) {
            dialog = new Dialog();
            document.body.appendChild(dialog);
            dialog.id = option.id;
            dialog.modal = option.modal;
            if (option.width) {
                dialog.width = option.width;
            }
            if (option.height) {
                dialog.height = option.height;
            }
            if (option.href) {
                dialog.href = option.href;
            }
            dialog.title = option.title;
            dialog.init();
        }
        if (option.onBeforeClose) {
            dialog.onBeforeClose(option.onBeforeClose);
        }
        if (option.onClose) {
            dialog.onClose(option.onClose);
        }
        if (option.onOpen) {
            dialog.onOpen(option.onOpen);
        }
        if (option.content) {
            dialog.clearContent();
            dialog.appendContent(option.content);
        }
        dialog.open();
        return dialog;
    }
    /**
     * 关闭对话框
     * @param id 对话框id
     */
    closeDialog(id) {
        var dialog = document.getElementById(id);
        if (dialog) {
            dialog.close();
        }
    }
    /**
     * 打开tab页
     * @param id tab页id
     * @param url 显示内容url
     * @param title tab页标签
     * @param isiframe 是否iframe1
     */
    openTabPage(id, url, title, isiframe) {
        var tabs = document.querySelector("#frametabs");
        tabs.add(id, title, url, "", isiframe);
    }
    /**
     * tab页跳转
     * @param url 跳转url
     */
    tabGoto(url) {
        var tabs = document.querySelector("#frametabs");
        tabs.tabGoto(url);
    }
    /**
     * tab页返回初始页
     */
    tabGoback() {
        var tabs = document.querySelector("#frametabs");
        tabs.tabGoback();
    }
    /**
     * 打开菜单链接
     * @param menu 菜单对象
     */
    openMenu(menu) {
        var element = this;
        window["platformAjax"]({
            url: element.APIs.menuHandle,
            data: { menuId: menu.id, parentMenuId: menu.parentId },
            success: function (result) {
                var tabs = document.querySelector("#frametabs");
                switch (result.HandleType) {
                    case 'Url':
                        if (menu.ShowMode == "1") {
                            tabs.add(menu.id, result.Title, result.Url, menu.iconCls, result.IsPage);
                        }
                        else if (menu.ShowMode == "2" || menu.ShowMode == "3") {
                            element.openDialog({
                                id: menu.id + "dialog",
                                title: result.Title,
                                modal: result.ShowMode == "2",
                                href: result.Url
                            });
                        }
                        else if (menu.ShowMode == "4") {
                            window.open(result.Url, result.Title);
                        }
                        break;
                    case 'Content':
                        if (menu.ShowMode == "1") {
                            tabs.addContent(menu.id, result.Title, result.Content);
                        }
                        else if (menu.ShowMode == "2" || menu.ShowMode == "3") {
                            element.openDialog({
                                id: menu.id + "dialog",
                                title: result.Title,
                                modal: result.ShowMode == "2",
                                content: result.Content
                            });
                        }
                        else if (menu.ShowMode == "4") {
                            tabs.addContent(menu.id, result.Title, result.Content);
                        }
                        break;
                    case 'Script':
                        eval(result.Script);
                        break;
                }
            }
        });
    }
    /**
     * 打开对象详情
     * @param option option:id,title,modal,content,href,width,height,onBeforeClose,onClose,onOpen
     */
    openObjDetail(option) {
        //var objektview: any = document.createElement("gf-objektview");
        //objektview.objektid = option.objid || "";
        //objektview.klass = option.klass;
        //objektview.title = option.title;
        //objektview.state = option.state;
        ////if(option.onbeforeinit){
        ////    objektview.addHook(EventNames.BeforeInit, option.onbeforeinit);
        ////}
        ////if(option.onafterinit){
        ////    objektview.addHook(EventNames.AfterInit, option.onafterinit);
        ////}
        ////if(option.onaftersave){
        ////    objektview.addHook(EventNames.AfterSave, option.onaftersave);
        ////}
        ////if(option.oninitLoaded){
        ////    objektview.addHook(EventNames.InitLoad, option.oninitLoaded);
        ////}
        //this.openDialog({
        //    id: option.controlid + "dialog",
        //    title: option.title,
        //    modal: option.modal,
        //    content: objektview
        //});
        ////objektview.init();
        var objektcontentview = document.createElement("gf-objektcontentview");
        objektcontentview.objektid = option.objid || "";
        objektcontentview.klass = option.klass;
        this.openDialog({
            id: option.controlid + "dialog",
            title: option.title,
            modal: option.modal,
            content: objektcontentview
        });
    }
    /**
     * 打开文件上传
     * @param dirid 目录id
     * @param dirname 目录名称
     * @param func 回调函数
     * @param fileNumLimit 文件数量限制
     * @param ext 文件扩展名
     * @param url 上传api
     */
    openUpFileDetail(dirid, dirname, func, fileNumLimit, ext, url) {
        var fileOptions = this.getCustomAttribute('fileOptions');
        var directoryid = dirid || fileOptions.directoryid;
        var directoryname = dirname || fileOptions.directoryname;
        var callback = func || fileOptions.callback;
        var upfileserver = url || this.APIs.uploadFile;
        var UpFile = this.get("UpFile");
        if (!UpFile) {
            UpFile = document.createElement("Gf-UpFileDialog");
            document.body.appendChild(UpFile);
        }
        UpFile.title = '文件上传';
        UpFile.directoryid = directoryid;
        UpFile.directoryname = directoryname;
        UpFile.upfileserver = upfileserver;
        UpFile.fileNumLimit = fileNumLimit || 100;
        UpFile.onSubmit(callback);
        UpFile.ext = ext || "";
        this.set("UpFile", UpFile);
        UpFile.open();
    }
    /**
    * 打开异常详情
    * @param message 异常消息
    * @param detail 异常详情
    */
    showError(message, detail) {
        var page = this;
        var div = page.get("errorDiv");
        if (!div) {
            div = document.createElement("div");
            page.set("errorDiv", div);
            page.appendChild(div);
        }
        $(div).load(page.APIs.error, { message: message, detail: detail });
        $(div).dialog({
            title: '异常',
            width: 800,
            height: 500,
            closed: true,
            cache: false,
            modal: false,
            resizable: true
        });
    }
    onRender() {
        return document.createElement("div");
    }
}
Page.elementName = 'Gf-Page'.toLowerCase();
Page.register();
/// <reference path="UIComponentBase.ts" />
/** 查询条件 */
class QueryCondition extends UIComponentBase {
    constructor() {
        super();
    }
    /** 是否忽视大小写 */
    get ignorecase() {
        return this.safeToString(this.getAttribute("ignorecase")).toLowerCase() == "true";
    }
    set ignorecase(val) {
        this.setAttribute("ignorecase", val.toString());
    }
    /** list组件值属性名称 */
    get listvaluefield() {
        return this.getAttribute("listvaluefield");
    }
    set listvaluefield(val) {
        this.setAttribute("listvaluefield", val);
    }
    /** list组件标签属性名称 */
    get listtextfield() {
        return this.getAttribute("listtextfield");
    }
    set listtextfield(val) {
        this.setAttribute("listtextfield", val);
    }
    /** list组件数据源 */
    get listsource() {
        return this.getAttribute("listsource");
    }
    set listsource(val) {
        this.setAttribute("listsource", val);
    }
    /** list组件默认选项 */
    get listdefaultoption() {
        return this.getAttribute("listdefaultoption");
    }
    set listdefaultoption(val) {
        this.setAttribute("listdefaultoption", val);
    }
    /** 属性数据类型 */
    get datatype() {
        return this.getAttribute("datatype");
    }
    set datatype(val) {
        this.setAttribute("datatype", val);
    }
    /** 属性名称 */
    get field() {
        return this.getAttribute("field");
    }
    set field(val) {
        this.setAttribute("field", val);
    }
    isModified() {
        return false;
    }
    /**
     * 值改变回调
     * @param eventHandler 回调函数
     */
    onValueChange(eventHandler) {
        this.addHook(EventNames.ValueChange, eventHandler);
    }
    clear(isTriggerQuery) {
        this.set("clearstatic", true);
        this.get("editor").setValue("");
        this.get("querySelect").setValue("");
        if (this.get("hasDoubleEditor")) {
            this.get("editorFrom").setValue("");
            this.get("editorTo").setValue("");
            $(this.get("editor")).show();
            $(this.get("doubleEditor")).hide();
        }
        this.set("clearstatic", false);
        if (isTriggerQuery) {
            this.fireHook(EventNames.ValueChange);
        }
    }
    getValue() {
        var element = this;
        var type = this.get("querySelect").getValue();
        if (type) {
            var value = ((type != "[..]" && type != "(..)") ? this.get("editor").getValue() : this.GetDoubleEditorValue(this));
            return { field: this.field,
                type: type,
                value: value,
                caseSensitive: !element.ignorecase
            };
        }
        else {
            return null;
        }
    }
    setValue(obj) {
        if (obj && obj.type) {
            this.get("querySelect").setValue(obj.type);
            if (obj.type == "[..]" || obj.type == "(..)") {
                var values = obj.value.split(',');
                this.get("editorFrom").setValue(values[0]);
                this.get("editorTo").setValue(values[1]);
            }
            else {
                this.get("editor").setValue(obj.value);
            }
        }
        else {
            this.clear();
        }
    }
    resize(width) {
        width = width - 28;
        if (width < 0) {
            width = 0;
        }
        this.get("editor").resize(width);
        if (this.get("hasDoubleEditor")) {
            width = width / 2;
            this.get("editorFrom").resize(width);
            this.get("editorTo").resize(width);
        }
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var span = document.createElement("span");
        var element = this;
        element.id = this.getUniqueId("QueryCondition");
        var querySelect = new ButtonComboBox();
        var editor;
        var emptyValue;
        emptyValue = "";
        var elementName;
        var hasDoubleEditor = false;
        var commonTypes = [{ value: '=', label: '等于' },
            { value: '!=', label: '不等于' },
            { value: 'N', label: '等于空' },
            { value: '!N', label: '不等于空' },
            { value: '', label: '清除本条件' }];
        var stringTypes = [{ value: '*', label: '包含' },
            { value: '!*', label: '不包含' },
            { value: '=*', label: '开始于' },
            { value: '*=', label: '结束于' }];
        var timeTypes = [{ value: '>', label: '晚于' },
            { value: '>=', label: '晚于等于' },
            { value: '<', label: '早于' },
            { value: '<=', label: '早于等于' },
            { value: '[..]', label: '介于（含两端）' },
            { value: '(..)', label: '介于（不含两端）' }];
        var numberTypes = [{ value: '>', label: '大于' },
            { value: '>=', label: '大于等于' },
            { value: '<', label: '小于' },
            { value: '<=', label: '小于等于' },
            { value: '[..]', label: '介于（含两端）' },
            { value: '(..)', label: '介于（不含两端）' }];
        var selectTypes = commonTypes;
        switch (element.datatype) {
            case DataType.LIST:
                elementName = "Gf-ListPropertyView";
                break;
            case DataType.STRING:
            case DataType.TEXT:
            case DataType.OBJEKT:
            case DataType.SEQUENCE:
            case DataType.MD5:
                elementName = "Gf-StringPropertyView";
                selectTypes = stringTypes.concat(commonTypes);
                break;
            case DataType.BOOLEAN:
                elementName = "Gf-BooleanPropertyView";
                emptyValue = false;
                break;
            case DataType.DATETIME:
            case DataType.TIME:
            case DataType.DATE:
                if (element.datatype == DataType.DATETIME)
                    elementName = "Gf-DateTimePropertyView";
                else if (element.datatype == DataType.TIME)
                    elementName = "Gf-TimePropertyView";
                else if (element.datatype == DataType.DATE)
                    elementName = "Gf-DatePropertyView";
                selectTypes = timeTypes.concat(commonTypes);
                hasDoubleEditor = true;
                break;
            case DataType.FLOAT:
            case DataType.DOUBLE:
            case DataType.DECIMAL:
            case DataType.INTEGER:
            case DataType.BIGINT:
                if (element.datatype == DataType.INTEGER)
                    elementName = "Gf-IntPropertyView";
                else if (element.datatype == DataType.BIGINT)
                    elementName = "Gf-BigIntPropertyView";
                else
                    elementName = "Gf-NumberPropertyView";
                selectTypes = numberTypes.concat(commonTypes);
                hasDoubleEditor = true;
                break;
            default:
                elementName = "Gf-StringPropertyView";
                break;
        }
        var id = this.getUniqueId("queryeditor");
        editor = document.createElement(elementName);
        editor.autoBuildComponentTree = false;
        editor.id = id;
        editor.width = "150";
        if (element.datatype == DataType.LIST) {
            editor["defaultoption"] = element.listdefaultoption;
            editor["source"] = element.listsource;
        }
        querySelect.id = this.getUniqueId("querySelect");
        editor.init();
        editor.state = UIState.edit;
        editor.onValueChange(function (event) {
            if (element.get("clearstatic")) {
                return;
            }
            var type = querySelect.getValue();
            var value = editor.getValue();
            if (!type && value) {
                if (editor.tagName.toLowerCase() == 'gf-stringpropertyview') {
                    type = '*';
                }
                else {
                    type = '=';
                }
                querySelect.setValue(type);
            }
            if (type && type != '!N' && type != 'N') {
                element.fireHook(EventNames.ValueChange);
            }
        });
        span.appendChild(editor);
        element.set("editor", editor);
        querySelect.init();
        querySelect.loadData(selectTypes);
        querySelect.onValueChange(function () {
            var type = querySelect.getValue();
            var value = editor.getValue();
            var doubleEditor = element.get("doubleEditor");
            var editorFrom = element.get("editorFrom");
            var editorTo = element.get("editorTo");
            var fromValue = editorFrom ? editorFrom.getValue() : null;
            var toValue = editorTo ? editorTo.getValue() : null;
            if (!type) {
                if (value)
                    editor.setValue(emptyValue);
                if (fromValue)
                    editorFrom.setValue(emptyValue);
                if (toValue)
                    editorTo.setValue(emptyValue);
                if (doubleEditor) {
                    $(editor).show();
                    $(doubleEditor).hide();
                }
                if (!element.get("clearstatic")) {
                    element.fireHook(EventNames.ValueChange);
                }
            }
            else if (type == "N" || type == "!N") {
                element.fireHook(EventNames.ValueChange);
            }
            else if (type == "[..]" || type == "(..)") {
                $(editor).hide();
                $(doubleEditor).show();
                if (fromValue && toValue) {
                    element.fireHook(EventNames.ValueChange);
                }
            }
            else {
                if (doubleEditor) {
                    $(editor).show();
                    $(doubleEditor).hide();
                }
                if (editor.tagName == "Gf-BooleanPropertyView" || value) {
                    element.fireHook(EventNames.ValueChange);
                }
            }
        });
        element.set("querySelect", querySelect);
        span.appendChild(querySelect);
        if (hasDoubleEditor)
            this.buildDoubleEditor(elementName);
        element.set("hasDoubleEditor", hasDoubleEditor);
        return span;
    }
    buildDoubleEditor(elementName) {
        var element = this;
        var editorFrom;
        editorFrom = document.createElement(elementName);
        editorFrom.autoBuildComponentTree = false;
        editorFrom.width = "75";
        editorFrom.init();
        var editorTo;
        editorTo = document.createElement(elementName);
        editorTo.autoBuildComponentTree = false;
        editorTo.width = "75";
        editorTo.init();
        var onafterchange = function () {
            if (editorFrom.getValue() && editorTo.getValue()) {
                element.fireHook(EventNames.ValueChange);
            }
        };
        editorFrom.addHook(EventNames.ValueChange, onafterchange);
        editorTo.addHook(EventNames.ValueChange, onafterchange);
        var span = document.createElement("span");
        span.appendChild(editorFrom);
        span.appendChild(editorTo);
        $(span).hide();
        element.appendChild(span);
        element.set("doubleEditor", span);
        element.set("editorFrom", editorFrom);
        element.set("editorTo", editorTo);
    }
    GetDoubleEditorValue(element) {
        if (element.get("hasDoubleEditor")) {
            return element.get("editorFrom").getValue() + ',' + element.get("editorTo").getValue();
        }
        else {
            return "";
        }
    }
}
QueryCondition.elementName = "Gf-QueryCondition".toLowerCase();
QueryCondition.register();
/// <reference path="UIComponentBase.ts" />
/** 关联对象添加 */
class RocAdd extends UIComponentBase {
    constructor() {
        super();
    }
    /** 可创建新关联对象 */
    get canCreate() {
        return this.safeToString(this.getAttribute("canCreate")).toLowerCase() == "true";
    }
    set canCreate(val) {
        this.setAttribute("canCreate", val.toString());
    }
    /** 可选择已有关联对象 */
    get canSelect() {
        return this.safeToString(this.getAttribute("canSelect")).toLowerCase() == "true";
    }
    set canSelect(val) {
        this.setAttribute("canSelect", val.toString());
    }
    /** 关联对象创建选项（select：选择已有对象；add：创建新对象。） */
    get createOption() {
        return this.get("list").getObject().value;
    }
    /** 显示标记 */
    get whentoshow() {
        return this.getAttribute("whentoshow");
    }
    set whentoshow(val) {
        this.setAttribute("whentoshow", val);
    }
    /** 下拉框值 */
    get listvalue() {
        return this.getAttribute("listvalue");
    }
    set listvalue(val) {
        this.setAttribute("listvalue", val);
    }
    /** 下拉框宽度 */
    get listwidth() {
        return this.getAttribute("listwidth");
    }
    set listwidth(val) {
        this.setAttribute("listwidth", val);
    }
    enable() {
        this.get("list").enable();
        $(this.get("button")).linkbutton("enable");
    }
    disable() {
        this.get("list").disable();
        $(this.get("button")).linkbutton("disable");
    }
    onCreate(func) {
        this.addHook(EventNames.Create, func);
    }
    onRender() {
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
RocAdd.elementName = "Gf-RocAdd".toLowerCase();
RocAdd.register();
/// <reference path="UIComponentBase.ts" />
/** 选项卡 */
class Tabs extends UIComponentBase {
    constructor() {
        super();
        /** panel数组 */
        this._panelArray = new Array();
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    /** 面板集合 */
    get panels() {
        return this._panelArray;
    }
    /** 是否可关闭（显示关闭图标与右键菜单） */
    get closable() {
        return this.safeToString(this.getAttribute("closable")).toLowerCase() == "true";
    }
    set closable(val) {
        this.setAttribute("closable", val.toString());
    }
    /** 是否自适应父容器尺寸 */
    get fit() {
        return this.safeToString(this.getAttribute("fit")).toLowerCase() == "true";
    }
    set fit(val) {
        this.setAttribute("fit", val.toString());
    }
    /** 是否延迟加载面板内容（面板第一次打开时加载） */
    get lazyload() {
        return this.safeToString(this.getAttribute("lazyload")).toLowerCase() == "true";
    }
    set lazyload(val) {
        this.setAttribute("lazyload", val.toString());
    }
    add(id, title, href, iconCls, isiframe) {
        var element = this;
        var div = this._tabsElement;
        if (!id) {
            id = this.getUniqueId("tab");
        }
        var tabExist = element.tabExist(id);
        if (!tabExist) {
            var tabhref = '';
            if (!element.lazyload) {
                tabhref = isiframe ? '' : href;
            }
            $(div).tabs('add', {
                id: id,
                title: title,
                content: isiframe ? '<iframe src="' + href + '" width="99%" height="99%" style="border-width:0px;">' : '',
                href: tabhref,
                iconCls: iconCls,
                closable: element.closable
            });
            element.panels.push({ id: id, href: href, loaded: false });
        }
    }
    addContent(id, title, content) {
        var element = this;
        var container = element._tabsElement;
        var tabExist = element.tabExist(id);
        if (!tabExist) {
            $(container).tabs('add', {
                id: id,
                title: title,
                content: '<div id="' + id + 'div" class="easyui-layout" data-options="fit:true" ><div>',
                href: '',
                closable: element.closable
            });
            element.panels.push({ id: id, content: content, loaded: true });
            var wrapper = document.getElementById(id + "div");
            $(content).appendTo(wrapper);
        }
    }
    close(index) {
        $(this._tabsElement).tabs("close", index);
    }
    closeAll() {
        var element = this;
        var div = element._tabsElement;
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function () {
            var index = $(div).tabs('getTabIndex', this[0]);
            element.close(index);
        });
    }
    closeAllExcept(tabIndex) {
        var element = this;
        var div = element._tabsElement;
        var selectedTab = $(div).tabs('getSelected');
        var selectedIndex = $(div).tabs('getTabIndex', selectedTab);
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function () {
            var index = $(element).tabs('getTabIndex', this[0]);
            if (tabIndex != index) {
                element.close(index);
            }
            if (index < tabIndex) {
                tabIndex--;
                if (selectedIndex > 0) {
                    selectedIndex--;
                }
            }
        });
        $(div).tabs('select', selectedIndex);
    }
    closeLeft(tabIndex) {
        var element = this;
        var div = element._tabsElement;
        var selectedTab = $(div).tabs('getSelected');
        var selectedIndex = $(div).tabs('getTabIndex', selectedTab);
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function () {
            var index = $(div).tabs('getTabIndex', this[0]);
            if (index < tabIndex) {
                element.close(index);
                tabIndex--;
                if (selectedIndex > 0) {
                    selectedIndex--;
                }
            }
        });
        $(div).tabs('select', selectedIndex);
    }
    closeRight(tabIndex) {
        var element = this;
        var div = element._tabsElement;
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function () {
            var index = $(div).tabs('getTabIndex', this[0]);
            if (index > tabIndex) {
                element.close(index);
            }
        });
    }
    getAllTabs() {
        return $(this._tabsElement).tabs("tabs");
    }
    getTab(index) {
        return $(this._tabsElement).tabs("getTab", index);
    }
    getTabIndex(tab) {
        return $(this._tabsElement).tabs("getTabIndex", tab);
    }
    getSelected() {
        return $(this._tabsElement).tabs("getSelected");
    }
    refreshTab(index) {
        var panelobj = this.panels[index];
        if (panelobj) {
            $("#" + panelobj.id).load(panelobj.href);
            panelobj.loaded = true;
        }
    }
    select(index) {
        var currentIndex = $(this._tabsElement).tabs('getTabIndex', this.getSelected());
        currentIndex = currentIndex < 0 ? 0 : currentIndex;
        $(this._tabsElement).tabs("select", index);
        if (currentIndex == index) {
            this.fireHook(EventNames.TabSelect, ["", index]);
        }
    }
    tabExist(id) {
        var container = this._tabsElement;
        var tabExist = false;
        var alltabs = $(container).tabs('tabs');
        $(alltabs).each(function () {
            if (this[0].id == id) {
                var index = $(container).tabs('getTabIndex', this[0]);
                $(container).tabs('select', index);
                tabExist = true;
            }
        });
        return tabExist;
    }
    tabGoto(href) {
        var tab = this.getSelected();
        $(tab).load(href);
    }
    tabGoback() {
        var tab = this.getSelected();
        var index = this.getTabIndex(tab);
        var panelobj = this.panels[index];
        $(tab).load(panelobj.href);
    }
    connected() {
        //this.autoInit = true;
        super.connected();
    }
    hideTitle() {
        for (var i = 0; i < $(this._tabsElement).tabs('tabs').length; i++) {
            $(this._tabsElement).tabs('getTab', i).panel('options').tab.hide();
        }
    }
    onRender() {
        var element = this;
        $(this).addClass("GfTab");
        var container = document.createElement("div");
        $(container).addClass("GfTabPanel");
        var div = document.createElement("div");
        $(div).addClass("GfTabElement");
        $(container).append(div);
        element._tabsElement = div;
        return container;
    }
    afterRender() {
        var element = this;
        element.addHook(EventNames.TabSelect, function (title, index) {
            if (element.lazyload) {
                var panelobj = element.panels[index];
                if (panelobj && !panelobj.loaded) {
                    $("#" + panelobj.id).load(panelobj.href, null, function () {
                        element.fireHook(EventNames.TabPanelLoad, [index]);
                    });
                    panelobj.loaded = true;
                }
            }
        });
        $(element._tabsElement).tabs({
            width: element.width || 'auto',
            height: element.height || 'auto',
            fit: element.fit,
            border: false,
            scrollDuration: 0,
            onSelect: function (title, index) {
                element.fireHook(EventNames.TabSelect, [title, index]);
            },
            onLoad: function (panel) {
                element.fireHook(EventNames.TabLoad, [panel]);
            },
            onClose: function (title, index) {
                element.panels.splice(index, 1);
            },
            onContextMenu: function (e, title, index) {
                if (element.closable) {
                    e.preventDefault();
                    var id = element.getUniqueId('tabContextMenu');
                    var menu = $(`<div id="` + id + `" class="easyui-menu" style="width:120px;">
                                    <div id="` + id + `-tabRefresh" data-options="name:-1">刷新</div>
                                    <div id="` + id + `-tabclose" data-options="name:1">关闭</div>
                                    <div id="` + id + `-tabcloseall" data-options="name:2">关闭全部</div>
                                    <div id="` + id + `-tabcloseother" data-options="name:3">关闭其他</div>
                                    <div class="menu-sep"></div>
                                    <div id="` + id + `-tabcloseright" data-options="name:4">关闭左侧全部</div>
                                    <div id="` + id + `-tabcloseleft" data-options="name:5">关闭右侧全部</div>
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
    }
}
Tabs.elementName = "Gf-Tabs".toLowerCase();
Tabs.register();
/// <reference path="UIComponentBase.ts" />
/** 工具栏 */
class ToolBar extends UIComponentBase {
    constructor() {
        super();
        /** 是否显示查询框 */
        this._isShowQuery = false;
        /** 是否包含子类 */
        this._isIncludeSubKlass = false;
    }
    /** 是否显示查询框 */
    get isShowQuery() {
        return this._isShowQuery;
    }
    set isShowQuery(val) {
        this._isShowQuery = val;
        if (val) {
            this.selectButton("query");
        }
        else {
            this.unSelectButton("query");
        }
    }
    /** 是否包含子类 */
    get isIncludeSubKlass() {
        return this._isIncludeSubKlass;
    }
    set isIncludeSubKlass(val) {
        this._isIncludeSubKlass = val;
        if (val) {
            this.selectButton("subclass");
        }
        else {
            this.unSelectButton("subclass");
        }
    }
    /** 选中的对象集合 */
    get selected() {
        return this.get("selected");
    }
    set selected(val) {
        this.set("selected", val);
        this.checkToShow();
    }
    /** 隐藏工具按钮集合 */
    get hidetools() {
        return this.get("hidetools");
    }
    set hidetools(val) {
        this.set("hidetools", val);
    }
    /** 容器 */
    get toolbarDiv() {
        return this.get("toolbarDiv");
    }
    onToolbarCommand(handler) {
        this.addHook(EventNames.ToolbarCommand, handler);
    }
    onToolbarCommandSuccess(handler) {
        this.addHook(EventNames.ToolbarCommandSuccess, handler);
    }
    onCheckToShow(handler) {
        this.addHook(EventNames.CheckToShow, handler);
    }
    selectButton(toolname) {
        this.setButtonSelectByName(toolname, true);
    }
    unSelectButton(toolname) {
        this.setButtonSelectByName(toolname, false);
    }
    showTool(toolname) {
        this.setToolVisibleByName(toolname, true);
    }
    hideTool(toolname) {
        this.setToolVisibleByName(toolname, false);
    }
    setToolVisibleByName(toolname, visible) {
        var tool = this.getToolByName(toolname);
        this.setToolVisible(tool, visible);
    }
    setToolVisible(tool, visible) {
        if (visible) {
            $(tool).show();
            $(tool).css("display", "inline-block");
        }
        else {
            $(tool).hide();
        }
    }
    setButtonSelectByName(toolname, select) {
        var tool = this.getToolByName(toolname);
        var method = select ? "select" : "unselect";
        $(tool).linkbutton(method);
    }
    getToolByName(toolname) {
        var toolbar = this.get("toolbar");
        for (var name in toolbar) {
            if (name == toolname) {
                return toolbar[name];
            }
        }
    }
    addButton(option) {
        var element = this;
        var button = this.createButton(option.label, option.icon, function () {
            element.fireHook(EventNames.ToolbarCommand, [option.name]);
        }, option.whenToShow);
        option.tool = button;
        this.addTool(option);
    }
    addTool(option) {
        var tool = option.tool;
        var toolbar = this.get("toolbar");
        if (option.whenToShow) {
            if (option.whenToShow.stateToShow) {
                $(tool).attr("stateToShow", option.whenToShow.stateToShow);
            }
            if (option.whenToShow.selectToShow) {
                $(tool).attr("selectToShow", option.whenToShow.selectToShow);
            }
        }
        if (option.before) {
            for (var toolname in toolbar) {
                if (toolname == option.before) {
                    $(toolbar[toolname]).before(tool);
                }
            }
        }
        else if (option.after) {
            for (var toolname in toolbar) {
                if (toolname == option.after) {
                    $(toolbar[toolname]).after(tool);
                }
            }
        }
        else {
            var toolbarDiv = this.get("toolbarDiv");
            $(toolbarDiv).append(tool);
        }
        toolbar[option.name] = tool;
    }
    checkToShow() {
        var element = this;
        var total = 0;
        var readCounts = 0;
        var deleteCounts = 0;
        var toolbar = element.get("toolbar");
        var selected = element.selected || [];
        if (selected) {
            total = selected.length;
            $(selected).each(function () {
                var canRead = this.permissioncode[1] === "1";
                var canDelete = this.permissioncode[4] === "1";
                if (canRead) {
                    readCounts += 1;
                }
                if (canDelete) {
                    deleteCounts += 1;
                }
            });
            var checkState = function (tool, stateToShow) {
                var show = (!stateToShow || stateToShow === element.state);
                element.setToolVisible(tool, show);
            };
            var checkObjKlass = function (array) {
                var isKlass = true;
                if (array && array.length > 0) {
                    $(array).each(function () {
                        if (!element.isString(this.id)) {
                            this.id = this.id.value;
                        }
                        var klass = this.id.split('@')[1];
                        if (klass.toLowerCase() != 'klass') {
                            isKlass = false;
                        }
                    });
                }
                else {
                    isKlass = false;
                }
                return isKlass;
            };
            var checkTrash = function (array, isTrash) {
                var cando = true;
                if (array && array.length > 0) {
                    $(array).each(function () {
                        if (this.isTrash.toString().toLowerCase() == isTrash.toString().toLowerCase())
                            cando = false;
                    });
                }
                else {
                    cando = false;
                }
                return cando;
            };
            var checkPermission = function (array) {
                if (!array || array.length == 0) {
                    return false;
                }
                var obj = array[0];
                if (obj.$ && obj.$ == 'C') {
                    return false;
                }
                //有当前对象的授权权或者当前权限对象的查看权
                var canAuthorize = obj.permissioncode[4] == '1';
                var canRead = false;
                if (obj.permission) {
                    var permissioncode = obj.permission.permissioncode;
                    canRead = (permissioncode && permissioncode[1] == '1');
                }
                $.parser.parse();
                return (canAuthorize || canRead);
            };
            for (var toolname in toolbar) {
                var tool = toolbar[toolname];
                var stateToShow = $(tool).attr("stateToShow");
                var selectToShow = $(tool).attr("selectToShow");
                if (selectToShow == "singleSelect") {
                    if (total != 1) {
                        $(tool).hide();
                    }
                    else if (toolname == "open" && readCounts != 1) {
                        $(tool).hide();
                    }
                    else if (toolname == "permission") {
                        if (!checkPermission(selected)) {
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
                        checkState(tool, stateToShow);
                    }
                }
                else if (selectToShow == "select") {
                    if (total == 0) {
                        $(tool).hide();
                    }
                    else if (toolname == "del" && deleteCounts != total) {
                        $(tool).hide();
                    }
                    else if (toolname == "trash" && (deleteCounts != total || !checkTrash(selected, true))) {
                        $(tool).hide();
                    }
                    else if (toolname == "untrash" && (deleteCounts != total || !checkTrash(selected, false))) {
                        $(tool).hide();
                    }
                    else if (toolname == "uml" && !checkObjKlass(selected)) {
                        $(tool).hide();
                    }
                    else {
                        checkState(tool, stateToShow);
                    }
                }
                else {
                    checkState(tool, stateToShow);
                }
            }
            element.fireHook(EventNames.CheckToShow);
        }
        if (element.hidetools) {
            if (element.hidetools == 'all') {
                var toolbar = element.get("toolbarDiv");
                $(toolbar).hide();
            }
            else {
                var toolbar = element.get("toolbar");
                $(element.hidetools).each(function () {
                    if (toolbar[this]) {
                        $(toolbar[this]).hide();
                    }
                });
            }
        }
    }
    handleIdshower() {
        var objectArray = this.get("selected");
        if (objectArray.length > 0) {
            var ids = '<div style="padding:15px;">';
            $(objectArray).each(function () {
                ids += '<p>"' + this['combinedtitle'] + '"的ID： ' + this["id"] + '</p>';
            });
            ids += "</div>";
            ComponentRoot.openDialog({
                id: this.id + "-CheckID",
                width: 500,
                height: 200,
                title: '查看ID',
                content: ids
            });
        }
    }
    handlePermission() {
        var objectArray = this.get("selected");
        if (objectArray.length > 0) {
            this.get("toolbar").permission.load(objectArray[0]);
        }
    }
    handleReference() {
        var objectArray = this.get("selected");
        $(objectArray).each(function () {
            var id = this["id"];
            var name = this["combinedtitle"];
            ComponentRoot.openDialog({
                id: id,
                width: 800,
                title: '引用“' + name + '”的对象',
                href: ComponentRoot.APIs.reference + "?id=" + id
            });
        });
    }
    handleUml() {
        var objectArray = this.get("selected");
        if (objectArray.length > 0) {
            var ids = '';
            $(objectArray).each(function () {
                ids += this["id"];
                ids += ',';
            });
            var umlParam = new UmlParams();
            umlParam.ids = ids;
            umlParam.init();
            umlParam.open();
        }
    }
    handleTrash() {
        var element = this;
        var objectArray = element.get("selected");
        if (objectArray.length > 0) {
            element.confirm("是否确认回收？", function () {
                var ids = "";
                $(objectArray).each(function () {
                    ids += this["id"] + ",";
                });
                element.setTrash(ids, true);
            });
        }
    }
    handleUntrash() {
        var element = this;
        var objectArray = element.get("selected");
        if (objectArray.length > 0) {
            var ids = "";
            $(objectArray).each(function () {
                ids += this["id"] + ",";
            });
            element.setTrash(ids, false);
        }
    }
    setTrash(objektIds, isTrash) {
        var element = this;
        window["ajaxLoading"]();
        window["platformAjax"]({
            url: ComponentRoot.APIs.setTrash,
            data: { objektIds: objektIds, isTrash: isTrash },
            success: function (result) {
                var toolname = isTrash ? "trash" : "untrash";
                element.sendMessage(new UIMessageRefreshing());
                element.fireHook(EventNames.ToolbarCommandSuccess, [toolname]);
            },
            finallyCall: function (result) {
                window["ajaxLoadEnd"]();
            }
        });
    }
    onRecievedMessage(message, source) {
        super.onRecievedMessage(message, source);
        if (message instanceof UIMessageObjektSelected) {
            var ObjektSelectedMessage = message;
            this.selected = ObjektSelectedMessage.currentSelected;
        }
        if (message instanceof UIMessageStateSwitched) {
            this.checkToShow();
        }
    }
    created() {
        var element = this;
        if (!$(element).attr("hidetools")) {
            element.set("hidetools", []);
        }
        else {
            element.set("hidetools", this.stringToObject($(element).attr("hidetools")));
        }
        element.addHook(EventNames.ToolbarCommand, function (toolname) {
            switch (toolname) {
                case "idshower":
                    element.handleIdshower();
                    break;
                case "reference":
                    element.handleReference();
                    break;
                case "trash":
                    element.handleTrash();
                    break;
                case "untrash":
                    element.handleUntrash();
                    break;
                case "uml":
                    element.handleUml();
                    break;
                case "permission":
                    element.handlePermission();
                    break;
            }
        });
        super.created();
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var element = this;
        var edit = this.createButton("编辑", "fa fa-pencil-square-o", function () {
            element.sendMessage(new UIMessageStateSwitching(element.state, UIState.edit));
        }, { stateToShow: "browse" });
        var read = this.createButton("浏览", "fa fa-square-o", function () {
            element.sendMessage(new UIMessageStateSwitching(element.state, UIState.browse));
        }, { stateToShow: "edit" });
        var open = this.createButton("打开", "fa fa-folder-open-o", function () {
            element.sendMessage(new UIMessageObjektOpend());
        }, { selectToShow: "singleSelect" });
        var add = this.createButton("新建", "fa fa-plus", function () {
            element.sendMessage(new UIMessageObjektCreated());
        }, { stateToShow: "edit" });
        var del = this.createButton("删除", "fa fa-minus", function () {
            element.sendMessage(new UIMessageObjektDeleted());
        }, { selectToShow: "select", stateToShow: "edit" });
        var save = this.createButton("保存", "fa fa-floppy-o", function () {
            element.sendMessage(new UIMessageSaving());
        }, { stateToShow: "edit" });
        var refresh = this.createButton("刷新", "fa fa-refresh", function () {
            element.sendMessage(new UIMessageRefreshing());
        });
        var subclass = this.createButton("包含子类", "fa fa-sitemap", function () {
            element.isIncludeSubKlass = !element.isIncludeSubKlass;
            element.sendMessage(new UIMessageIncludeSubKlassChanged(element.isIncludeSubKlass));
        });
        var query = this.createButton("查询", "fa fa-search", function () {
            element.isShowQuery = !element.isShowQuery;
            element.sendMessage(new UIMessageShownQueryChanged(element.isShowQuery));
        });
        var exporter = this.createButton("导出", "fa fa-file-excel-o", function () {
            element.sendMessage(new UIMessageExported());
        });
        var idshower = this.createButton("查看ID", "fa fa-id-card-o", function () {
            element.fireHook(EventNames.ToolbarCommand, ["idshower"]);
        }, { selectToShow: "select" });
        var reference = this.createButton("查看引用", "fa fa-arrow-left", function () {
            element.fireHook(EventNames.ToolbarCommand, ["reference"]);
        }, { selectToShow: "singleSelect" });
        var trash = this.createButton("回收", "fa fa-trash-o", function () {
            element.fireHook(EventNames.ToolbarCommand, ["trash"]);
        }, { selectToShow: "select" });
        var untrash = this.createButton("还原", "fa fa-recycle", function () {
            element.fireHook(EventNames.ToolbarCommand, ["untrash"]);
        }, { selectToShow: "select" });
        var uml = this.createButton("UML", "fa fa-retweet", function () {
            element.fireHook(EventNames.ToolbarCommand, ["uml"]);
        }, { selectToShow: "select" });
        var permission = new Authorization();
        permission["selecttoshow"] = "singleSelect";
        permission.onBeforeShow(function () {
            element.fireHook(EventNames.ToolbarCommand, ["permission"]);
        });
        permission["init"]();
        $(query).linkbutton("options").toggle = true;
        $(subclass).linkbutton("options").toggle = true;
        var div = document.createElement("div");
        div.id = this.getUniqueId("toolbar");
        //$(div).addClass("datagrid-toolbar");
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
        element.set("toolbar", {
            add: add, del: del, edit: edit, save: save, read: read, permission: permission,
            exporter: exporter, open: open, query: query, refresh: refresh, subclass: subclass,
            trash: trash, untrash: untrash, idshower: idshower, reference: reference, uml: uml
        });
        element.set("toolbarDiv", div);
        element.checkToShow();
        return div;
    }
}
ToolBar.elementName = "Gf-ToolBar".toLowerCase();
ToolBar.register();
/// <reference path="UIComponentBase.ts" />
/** 树 */
class Tree extends UIComponentBase {
    constructor() {
        super();
        /** 点击启用 */
        this.isMenuClick = true;
    }
    /** 延迟加载子菜单api */
    get lazyLoaduUrl() {
        return this.getAttribute("lazyLoaduUrl");
    }
    set lazyLoaduUrl(val) {
        this.setAttribute("lazyLoaduUrl", val);
    }
    /** 菜单项点击事件处理 */
    get clickHandler() {
        return this.getAttribute("clickHandler");
    }
    set clickHandler(val) {
        this.setAttribute("clickHandler", val);
    }
    /** 左侧留白距离 */
    get paddingleft() {
        return this.getAttribute("paddingleft");
    }
    set paddingleft(val) {
        this.setAttribute("paddingleft", val);
    }
    /** 数据 */
    get data() {
        return this.getAttribute("data");
    }
    set data(val) {
        this.setAttribute("data", val);
    }
    expand(node) {
        $(this.get("ul")).tree('expand', node);
    }
    append(node, data) {
        $(this.get("ul")).tree('append', {
            parent: node,
            data: data
        });
    }
    reload() {
        var ul = this.get("ul");
        var selected = $(ul).tree('getSelected');
        if (this.data) {
            this.loadDatastring(this.data, this.clickHandler);
        }
        if (selected) {
            $(ul).tree('expandAll');
            var node = $(ul).tree('find', selected.id);
            if (node) {
                $(ul).tree('select', node.target);
            }
        }
    }
    loadData(data, click) {
        var element = this;
        $(element.get("ul")).tree({
            data: data,
            onBeforeExpand: function (node, param) {
                if (!node.children || node.children.length == 0) {
                    element.ajax({
                        url: element.lazyLoaduUrl,
                        data: { id: node.id, parentId: node.parentId },
                        success: function (result) {
                            element.append(node.target, JSON.parse(result.Data));
                            element.expand(node);
                        }
                    });
                }
            },
            onExpand: function (node, param) {
                element.changeCssClass();
            },
            onClick: function (node) {
                if (element.isMenuClick) {
                    if (click) {
                        var func = element.stringToObject(click);
                        func(node);
                    }
                    element.fireHook(EventNames.NodeClick, [node]);
                }
            }
        });
        element.changeCssClass();
    }
    loadDatastring(data, click) {
        var element = this;
        var ul = this.get("ul");
        $(ul).tree({
            data: element.stringToObject(data),
            onBeforeExpand: function (node, param) {
                ;
                if (!node.children || node.children.length == 0) {
                    element.ajax({
                        url: element.lazyLoaduUrl,
                        data: { id: node.id, parentId: node.parentId },
                        sync: true,
                        success: function (result) {
                            element.append(node.target, JSON.parse(result.Data));
                        }
                    });
                }
            },
            onExpand: function (node, param) {
                element.changeCssClass();
            },
            onClick: function (node) {
                if (element.isMenuClick) {
                    if (click) {
                        var func = element.stringToObject(click);
                        func(node);
                    }
                    element.fireHook(EventNames.NodeClick, [node]);
                }
            }
        });
        element.changeCssClass();
    }
    find(id) {
        return $(this.get("ul")).tree('find', id);
    }
    select(id) {
        var node = this.find(id);
        $(this.get("ul")).tree('select', node.target);
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var element = this;
        var ul = document.createElement("ul");
        //element.appendChild(ul);
        element.set("ul", ul);
        if (element.data) {
            element.loadDatastring(element.data, element.clickHandler);
        }
        return ul;
    }
    afterRender() {
        var element = this;
        $(element).find(".tree-file").removeClass("tree-file");
        if (element.paddingleft) {
            $(element).find(".tree-node").css("padding-left", parseInt(element.paddingleft));
        }
        $(element).find(".tree-folder").removeClass("tree-folder");
        $(element).find(".tree-folder-open").removeClass("tree-folder-open");
    }
    changeCssClass() {
        var element = this;
        $(element).find(".tree-file").removeClass("tree-file");
        if (element.paddingleft) {
            $(element).find(".tree-node").css("padding-left", parseInt(element.paddingleft));
        }
        $(element).find(".tree-folder").removeClass("tree-folder");
        $(element).find(".tree-folder-open").removeClass("tree-folder-open");
    }
    getNode(target) {
        return $(this.get("ul")).tree('getNode', target);
    }
}
Tree.elementName = "gf-tree".toLowerCase();
Tree.register();
/// <reference path="UIComponentBase.ts" />
/** UML生成参数 */
class UmlParams extends UIComponentBase {
    constructor() {
        super();
    }
    /** 多对象id拼接*/
    get ids() {
        return this.getAttribute("ids");
    }
    set ids(val) {
        this.setAttribute("ids", val);
    }
    /** 获取uml图api */
    get getumlurl() {
        return this.getAttribute("getumlurl");
    }
    set getumlurl(val) {
        this.setAttribute("getumlurl", val);
    }
    /** 检查uml请求api */
    get checkumlurl() {
        return this.getAttribute("checkumlurl");
    }
    set checkumlurl(val) {
        this.setAttribute("checkumlurl", val);
    }
    /** 生成选项数据api */
    get listdataurl() {
        return this.getAttribute("listdataurl");
    }
    set listdataurl(val) {
        this.setAttribute("listdataurl", val);
    }
    onRender() {
        var span = document.createElement("span");
        var element = this;
        var listData;
        element.ajax({
            url: element.listdataurl || ComponentRoot.APIs.getListValues,
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
                                ` + options + `
                            </select>
                            <input type="hidden" name="ids" value="` + element.ids + `" />
                            </td>
                        </tr>
                    </table>
                </div>`);
                element.set("form", form);
                span.appendChild(form);
                span.appendChild(element.buildButtons());
            }
        });
        return span;
    }
    buildButtons() {
        var element = this;
        var sure = this.createButton("生成", "fa fa-check", function () {
            var obj = $(element.get("form")).serializeObject();
            obj.conciseGeneration = obj.conciseGeneration == "on";
            obj.showPropertyRelationship = obj.showPropertyRelationship == "on";
            obj.showLabel = obj.showLabel == "on";
            var dialog = element.get("dialog");
            dialog.close();
            window["ajaxLoading"]("正在生成UML，请稍候...");
            element.ajax({
                url: element.getumlurl || ComponentRoot.APIs.getUml,
                data: { model: obj },
                success: function (result) {
                    var umlObj = JSON.parse(result.Data);
                    var text = window["unescape"](encodeURIComponent(umlObj.text));
                    text = window["encode64"](window["zip_deflate"](text, 9));
                    element.ajax({
                        url: element.checkumlurl || ComponentRoot.APIs.checkUml,
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
        });
        var check = this.createButton("查看", "fa fa-code", function () {
            var obj = $(element.get("form")).serializeObject();
            obj.conciseGeneration = obj.conciseGeneration == "on";
            obj.showPropertyRelationship = obj.showPropertyRelationship == "on";
            obj.showLabel = obj.showLabel == "on";
            window["platformAjax"]({
                url: element.getumlurl || ComponentRoot.APIs.getUml,
                sync: true,
                data: { model: obj },
                success: function (result) {
                    var umlObj = JSON.parse(result.Data);
                    var div = document.createElement("div");
                    var textarea = document.createElement("textarea");
                    $(textarea).attr("disabled", "disabled");
                    $(textarea).height("500px");
                    $(textarea).width("750px");
                    $(textarea).val(umlObj.text);
                    $(div).css("padding", "10px");
                    $(div).append(textarea);
                    ComponentRoot.openDialog({
                        id: element.id + "-checkText",
                        width: 800,
                        height: 600,
                        title: '查看UML源码',
                        content: div
                    });
                }
            });
        });
        var cancel = element.createButton("取消", "fa fa-times", function () {
            var dialog = element.get("dialog");
            dialog.close();
        });
        var buttonsdiv = document.createElement("div");
        $(buttonsdiv).addClass("dialog-button");
        buttonsdiv.id = element.getUniqueId("buttonsdiv");
        buttonsdiv.appendChild(sure);
        buttonsdiv.appendChild(check);
        buttonsdiv.appendChild(cancel);
        return buttonsdiv;
    }
    open() {
        var element = this;
        var dialog = ComponentRoot.openDialog({
            id: element.id + "-uml",
            width: 500,
            height: 225,
            title: '生成UML参数',
            content: element
        });
        element.set("dialog", dialog);
    }
}
UmlParams.elementName = "Gf-UmlParams".toLowerCase();
UmlParams.register();
/// <reference path="UIComponentBase.ts" />
/** 文件上传 */
class UpFileDialog extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    /** 文件总大小限制 */
    get fileSizeLimit() {
        return this.getAttribute("fileSizeLimit");
    }
    set fileSizeLimit(val) {
        this.setAttribute("fileSizeLimit", val);
    }
    /** 单个文件大小限制 */
    get fileSingleSizeLimit() {
        return this.getAttribute("fileSingleSizeLimit");
    }
    set fileSingleSizeLimit(val) {
        this.setAttribute("fileSingleSizeLimit", val);
    }
    /** 文件数量限制 */
    get fileNumLimit() {
        return this.getAttribute("fileNumLimit");
    }
    set fileNumLimit(val) {
        this.setAttribute("fileNumLimit", val);
    }
    /** mimeTypes */
    get mimeTypes() {
        return this.getAttribute("mimeTypes");
    }
    set mimeTypes(val) {
        this.setAttribute("mimeTypes", val);
    }
    /** 文件扩展名 */
    get ext() {
        return this.getAttribute("ext");
    }
    set ext(val) {
        this.setAttribute("ext", val);
    }
    /** 文件上传API */
    get upfileserver() {
        return this.getAttribute("upfileserver");
    }
    set upfileserver(val) {
        this.setAttribute("upfileserver", val);
    }
    /** 目录名称 */
    get directoryname() {
        return this.getAttribute("directoryname");
    }
    set directoryname(val) {
        this.setAttribute("directoryname", val);
    }
    /** 目录ID */
    get directoryid() {
        return this.getAttribute("directoryid");
    }
    set directoryid(val) {
        this.setAttribute("directoryid", val);
    }
    /** 标题 */
    get title() {
        return this.getAttribute("title");
    }
    set title(val) {
        this.setAttribute("title", val);
    }
    onSubmit(handler) {
        this.addHook(EventNames.Submit, handler);
    }
    open() {
        var div = this.get('div');
        $(div).dialog({
            title: this.title || '文件上传',
            width: this.width || 800,
            height: this.height || 600,
            closed: true,
            cache: false
        });
        var uploader = this.get('uploader');
        if (uploader) {
            if ($(".filelist li")[0]) {
                $(".filelist li").each(function () {
                    var id = $(this).attr("id");
                    uploader.removeFile(id);
                });
            }
            else {
                this.get('updateTotalProgress')();
            }
            var uploaderPanel = this.get('uploaderPanel');
            $(uploaderPanel).remove();
        }
        this.initWebUploader();
        $(div).dialog('open');
    }
    close() {
        $(this.get('div')).dialog('close');
    }
    created() {
        var element = this;
        element.addHook(EventNames.BeforeInit, function () {
            element.includeStyle($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/css/style.css");
            element.includeStyle($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/css/webuploader.css");
            element.includeJS($(document.body).attr("apppath") + "/Platform/Content/Scripts/webuploader/js/webuploader.js");
        });
        super.created();
    }
    connected() {
        super.connected();
    }
    initWebUploader() {
        var element = this;
        var uploaderPanel = document.createElement("div");
        var toolbarid = element.get("toolbarid");
        element.set("uploaderPanel", uploaderPanel);
        $(uploaderPanel).addClass("container");
        $(uploaderPanel).append(`<div class="page-container">
                            <div class="uploader wu-example">
                                <span style="font-size:16px;font-weight:bolder;">当前目录：` + element.directoryname + `</span>
                                <span id="` + toolbarid + `" style="float:right"></span>
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
        thumbnailWidth = 110 * ratio, thumbnailHeight = 110 * ratio, 
        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding', 
        // 所有文件的进度信息，key为file id
        percentages = {}, succeedFile = [], supportTransition = (function () {
            var s = document.createElement('p').style, r = 'transition' in s ||
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
            element.alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
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
            fileNumLimit: parseInt(element.fileNumLimit || "100"),
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
            fileSizeLimit: (parseInt(element.fileSizeLimit) || 500 * 1024) * 1024,
            fileSingleSizeLimit: (parseInt(element.fileSingleSizeLimit) || 100 * 1024) * 1024,
        });
        uploader.onUploadProgress = function (file, percentage) {
            var $li = $('#' + file.id), $percent = $li.find('.progress span');
            $percent.css('width', percentage * 100 + '%');
            percentages[file.id][1] = percentage;
            updateTotalProgress();
        };
        uploader.onBeforeFileQueued = function (file) {
            //file.id = control.GetUniqueId("File");
        };
        uploader.onFileQueued = function (file) {
            if (file.name == 'image' || file.name == 'image.png') {
                file.id = element.getUniqueId("");
                file.name = file.id;
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
                element.alert(response.Message);
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
            element.fireHook(EventNames.UploadBeforeSend, [object, data, headers]);
        });
        uploader.onError = function (code) {
            var text = '';
            switch (code) {
                case 'F_DUPLICATE':
                    text = '该文件已经被选择了!';
                    break;
                case 'Q_EXCEED_NUM_LIMIT':
                    text = '上传文件数量超过限制!';
                    break;
                case 'F_EXCEED_SIZE':
                    text = '文件大小超过限制!(' + (parseInt(element.fileSingleSizeLimit) || 100 * 1024) + 'KB)';
                    break;
                case 'Q_EXCEED_SIZE_LIMIT':
                    text = '所有文件总大小超过限制!(' + (parseInt(element.fileSizeLimit) || 500 * 1024) + 'KB)';
                    break;
                case 'Q_TYPE_DENIED':
                    text = '文件类型不正确或者是空文件!';
                    break;
                default:
                    text = '未知错误!';
                    break;
            }
            element.alert(text);
        };
        $upload.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            if (state === 'ready') {
                uploader.upload();
            }
            else if (state === 'paused') {
                uploader.upload();
            }
            else if (state === 'uploading') {
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
                '</li>'), $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo($li), $prgress = $li.find('p.progress span'), $wrap = $li.find('p.imgWrap'), $info = $('<p class="error"></p>'), showError = function (code) {
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
            }
            else {
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
                }
                else if (cur === 'interrupt') {
                    showError('interrupt');
                }
                else if (cur === 'queued') {
                    percentages[file.id][1] = 0;
                }
                else if (cur === 'progress') {
                    $info.remove();
                    $prgress.css('display', 'block');
                }
                else if (cur === 'complete') {
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
                var index = $(this).index(), deg;
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
                }
                else {
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
            var loaded = 0, total = 0, spans = $progress.children(), percent;
            $.each(percentages, function (k, v) {
                total += v[0];
                loaded += v[0] * v[1];
            });
            percent = total ? loaded / total : 0;
            spans.eq(0).text(Math.round(percent * 100) + '%');
            spans.eq(1).css('width', Math.round(percent * 100) + '%');
            updateStatus();
        };
        function updateStatus() {
            var text = '', stats;
            if (state === 'ready') {
                text = '选中' + fileCount + '个文件。';
            }
            else if (state === 'confirm') {
                stats = uploader.getStats();
                if (stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '个文件，' +
                        stats.uploadFailNum + '个文件上传失败';
                }
            }
            else {
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
                    element.fireHook(EventNames.Submit);
                    $progress.hide();
                    $upload.text('开始上传'); //.addClass('disabled');
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
                    }
                    else {
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
        element.set("updateTotalProgress", updateTotalProgress);
    }
    onRender() {
        var element = this;
        var div = document.createElement("div");
        element.set("div", div);
        var toolbarid = element.getUniqueId("toolbar");
        element.set("toolbarid", toolbarid);
        $(div).css("padding", "2px");
        $(div).dialog({
            title: element.title || '文件上传',
            width: element.width || 800,
            height: element.height || 600,
            closed: true,
            cache: false,
            modal: true
        });
        return div;
    }
}
UpFileDialog.elementName = "Gf-UpFileDialog".toLowerCase();
UpFileDialog.register();
/*图片验证码
  组件名Gf-VerifyCode

  属性:
  codelength：验证码长度(默认值4,即4个验证码)
  fontsize：字体大小(默认值14字号)
  imgwidth：图片宽度(默认值60)
  imgheight：图片高度(默认值30)
  codekey: 验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突

  方法:
  刷新验证码
  document.querySelector("#xxx").Refresh();
  事件:

*/
class VerifyCode extends UIComponentBase {
    constructor() {
        super();
    }
    /** 验证码长度(默认值4,即4个验证码) */
    get codeLength() {
        if (!this.getAttribute("codeLength")) {
            return 4;
        }
        return parseInt(this.getAttribute("codeLength"));
    }
    set codeLength(val) {
        this.setAttribute("codeLength", val.toString());
    }
    /** 字体大小(默认值14字号) */
    get fontSize() {
        if (!this.getAttribute("fontSize")) {
            return 14;
        }
        return parseInt(this.getAttribute("fontSize"));
    }
    set fontSize(val) {
        this.setAttribute("fontSize", val.toString());
    }
    /** 图片宽度(默认值60) */
    get imgWidth() {
        if (!this.getAttribute("imgWidth")) {
            return 60;
        }
        return parseInt(this.getAttribute("imgWidth"));
    }
    set imgWidth(val) {
        this.setAttribute("imgWidth", val.toString());
    }
    /** 图片高度(默认值30) */
    get imgHeight() {
        if (!this.getAttribute("imgHeight")) {
            return 30;
        }
        return parseInt(this.getAttribute("imgHeight"));
    }
    set imgHeight(val) {
        this.setAttribute("imgHeight", val.toString());
    }
    /** 验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突 */
    get codeKey() {
        return this.getAttribute("codeKey");
    }
    set codeKey(val) {
        this.setAttribute("codeKey", val.toString());
    }
    createComponentBrowseState() {
        return null;
    }
    createComponentEditState() {
        return null;
    }
    onRender() {
        return this.VerifyCodeInit();
    }
    /*
    *刷新验证码
    */
    Refresh() {
        var VerifyCodeImg = this._verifyCodeImg;
        var ImgSrc = this._verifyCodeImgSrc + "&" + this.getUniqueId();
        $(VerifyCodeImg).attr("src", ImgSrc);
    }
    /*
    *初始化
    */
    VerifyCodeInit() {
        //控件容器
        var container = document.createElement("div");
        $(container).addClass("ImgVerifyCode");
        $(container).css("height", "100%");
        $(container).css("width", "100%");
        //图片宽度
        var ImgWidth = this.imgWidth;
        //图片高度
        var ImgHeight = this.imgHeight;
        //字体大小
        var FontSize = this.fontSize;
        //验证码长度
        var CodeLength = this.codeLength;
        //图片路径
        var ImgSrc = ComponentRoot.apppath + "/VerifyCode/CreatVerifyCode?" + "VerifyCodeLength=" + CodeLength + "&ImgWidth=" + ImgWidth + "&ImgHeigth=" + ImgHeight + "&FontSize=" + FontSize + "&" + this.getUniqueId();
        if (this.codeKey) {
            ImgSrc += "&VerifyCodeKey=" + this.codeKey;
        }
        this._verifyCodeImgSrc = ImgSrc;
        //创建图片
        var VerifyCodeImg = document.createElement("img");
        $(VerifyCodeImg).attr("src", ImgSrc);
        $(VerifyCodeImg).css("cursor", "pointer");
        $(container).append(VerifyCodeImg);
        this._verifyCodeImg = VerifyCodeImg;
        $(VerifyCodeImg).click((e) => {
            this.Refresh();
        });
        return container;
    }
}
VerifyCode.elementName = "Gf-VerifyCode".toLowerCase();
VerifyCode.register();
///<reference path="UIComponentBase.ts" />
/*部件
  组件名Gf-Widget

  属性:
  width:组件宽度,默认值200px
  height:组件高度,默认值150px
  widgetid:部件ID
  方法:
  事件:
*/
class Widget extends UIComponentBase {
    constructor() {
        super();
        /** 数据提交模型*/
        this._submitModel = new Array();
        /** 小部件标题 */
        this.widgetTitle = "";
        /** 是否可最大化 */
        this.isMaximizable = true;
        /** 是否可关闭 */
        this.isClosable = true;
        /** 部件菜单模型*/
        this.widgetMenuModel = new Array();
        /** 是否是自己的小部件*/
        this.isOwnWidget = true;
        /** 浏览状态是否填充数据*/
        this.browseIsModeFill = true;
        /** 编辑状态是否填充数据*/
        this.editIsModeFill = true;
    }
    /** 后台数据模型*/
    get initialModel() {
        return this._initialModel;
    }
    set initialModel(val) {
        this._initialModel = val;
    }
    /** 数据提交模型*/
    get submitModel() {
        return this._submitModel;
    }
    set submitModel(val) {
        this._submitModel = val;
    }
    /** 部件ID */
    get widgetId() {
        return this.getAttribute("widgetId");
    }
    set widgetId(val) {
        this.setAttribute("widgetId", val.toString());
    }
    /** 组件当前宽度(默认200px) */
    get width() {
        if (!this.getAttribute("width")) {
            return "200px";
        }
        return this.getAttribute("width");
    }
    set width(val) {
        this.setAttribute("width", val.toString());
    }
    /** 组件当前高度(默认200px) */
    get height() {
        if (!this.getAttribute("height")) {
            return "150px";
        }
        return this.getAttribute("height");
    }
    set height(val) {
        this.setAttribute("height", val.toString());
    }
    /** 组件id */
    get id() {
        if (!this.getAttribute("id")) {
            this.setAttribute("id", this.getUniqueId("Gf-Widget"));
        }
        return this.getAttribute("id");
    }
    set id(val) {
        this.setAttribute("id", val);
    }
    /** 部件原始宽度*/
    get originalWidth() {
        if (!this._originalWidth) {
            this._originalWidth = this.width;
        }
        return this._originalWidth;
    }
    /** 部件原始高度*/
    get originalHeight() {
        if (!this._originalHeight) {
            this._originalHeight = this.height;
        }
        return this._originalHeight;
    }
    createComponentBrowseState() {
        return new WidgetBrowse(this);
    }
    createComponentEditState() {
        return new WidgetEdit(this);
    }
    /**
   * 检查组件是否修改
   */
    CheckIsModify() {
        //不是自己的小部件不提交数据
        if (this.isOwnWidget == false) {
            this.submitModel = [];
        }
        if (this.submitModel.length > 0) {
            this.setModified(true);
        }
        else {
            this.setModified(false);
        }
    }
    /**
    *部件存在加载后台数据
    *@param LoadData 数据回调函数
    */
    WidgetExistDataLoad(LoadData) {
        var that = this;
        window["platformAjax"]({
            url: ComponentRoot.APIs.getWidgetInfo,
            type: "post",
            data: { widgetId: this.widgetId },
            success: function (result) {
                var WidgetModel = eval("(" + result.Data + ")");
                that.widgetTitle = WidgetModel.Title;
                that.isClosable = WidgetModel.IsClosable;
                that.isMaximizable = WidgetModel.IsMaximizable;
                that.isOwnWidget = WidgetModel.IsOwnWidget;
                that.widgetstatus = ObjektState.Original;
                that.initialModel = WidgetModel;
                LoadData(WidgetModel);
            },
            fail: function (result) {
            }
        });
    }
    /**
    *获取小部件数据
    *@param LoadData 数据回调函数
    */
    GetWidgetData(LoadData) {
        //模型存在
        if (this._initialModel) {
            LoadData(this._initialModel);
        }
        else {
            if (this.widgetstatus == ObjektState.Created) {
                this._initialModel = this.WidgetNewData();
                LoadData(this._initialModel);
            }
            else {
                this.WidgetExistDataLoad(LoadData);
            }
        }
    }
    /**
    *部件新增
    */
    WidgetNewData() {
        var that = this;
        that.widgetTitle = "";
        that.isMaximizable = true;
        that.isClosable = true;
        that.isOwnWidget = true;
        var NewModel = { "Id": that.widgetId, "IsClosable": true, "IsMaximizable": true };
        this.widgetstatus = ObjektState.Created;
        return NewModel;
    }
    /**
    *触发拖动元素进入后事件
    */
    fireAfterDragEnter() {
        this.fireHook("AfterDragEnter");
    }
    /**
    *拖动元素进入后回调
    */
    onAfterDragEnter(eventHandler) {
        this.addHook("AfterDragEnter", eventHandler);
    }
    /**
    *触发拖动元素离开后事件
    */
    fireAfterDragLeave() {
        this.fireHook("AfterDragLeave");
    }
    /**
    *拖动元素离开后回调
    */
    onAfterDragLeave(eventHandler) {
        this.addHook("AfterDragLeave", eventHandler);
    }
    /**
    *触发拖动元素放置后事件
    */
    fireAfterDragEnd() {
        this.fireHook("AfterDragEnd");
    }
    /**
   *拖动元素放置后回调
   */
    onAfterDragEnd(eventHandler) {
        this.addHook("AfterDragEnd", eventHandler);
    }
}
Widget.elementName = "Gf-Widget".toLowerCase();
Widget.register();
class WidgetBrowse extends UIComponentBaseBrowse {
    constructor() {
        super(...arguments);
        /** 组件*/
        this._widget = this.getWrapper();
    }
    onRender() {
        return this.WidgetInit_Browse();
    }
    afterRender() {
        this.ModelFill();
        $(this._widgetPanel_Layout).layout('resize', {
            width: '100%',
            height: '100%'
        });
    }
    /**
    *小部件初始化
    */
    WidgetInit_Browse() {
        var that = this;
        $(that._widget).addClass("GfWidget");
        //部件容器Div
        var WidgetPanel = document.createElement("div");
        $(WidgetPanel).addClass("GfWidgetPanel");
        $(WidgetPanel).css({
            "width": that._widget.width,
            "height": that._widget.height
        });
        that._widgetPanel = WidgetPanel;
        //创建布局
        var WidgetPanel_Layout = document.createElement("div");
        $(WidgetPanel).append(WidgetPanel_Layout);
        that._widgetPanel_Layout = WidgetPanel_Layout;
        //初始化布局
        $(WidgetPanel_Layout).layout({
            //自适应
            fit: true
        });
        //增加上方北部面板
        $(WidgetPanel_Layout).layout('add', {
            region: 'north',
            height: 28
        });
        //增加下方内容面板
        $(WidgetPanel_Layout).layout('add', {
            region: 'center'
        });
        //北部面板Div
        var WidgetPanel_Layout_LayoutNorth_NorthPanel = document.createElement("div");
        $(WidgetPanel_Layout_LayoutNorth_NorthPanel).addClass("GfWidgetNorthPanel");
        var WidgetPanel_Layout_LayoutNorth = $(WidgetPanel_Layout).layout("panel", "north");
        $(WidgetPanel_Layout_LayoutNorth).append(WidgetPanel_Layout_LayoutNorth_NorthPanel);
        that._widgetNorth = WidgetPanel_Layout_LayoutNorth_NorthPanel;
        //小部件北部初始化
        that.WidgetNorthInit_Browse();
        //部件内容Div
        var WidgetPanel_Layout_LayoutCenter_CenterPanel = document.createElement("div");
        $(WidgetPanel_Layout_LayoutCenter_CenterPanel).addClass("WidgetCenterPanel");
        var WidgetDiv_Layout_LayoutCenter = $(WidgetPanel_Layout).layout("panel", "center");
        $(WidgetDiv_Layout_LayoutCenter).append(WidgetPanel_Layout_LayoutCenter_CenterPanel);
        that._widgetCenter = WidgetPanel_Layout_LayoutCenter_CenterPanel;
        //小部件中心内容初始化
        that.WidgetCenterInit_Browse();
        return WidgetPanel;
    }
    /**
    *模型填充
    */
    ModelFill() {
        var that = this;
        this._widget.GetWidgetData(function (DataModel) { that.DataFill(DataModel); });
        $(this._widgetPanel).css({
            "width": this._widget.width,
            "height": this._widget.height
        });
        $(this._widgetPanel_Layout).css({
            "width": "100%",
            "height": "100%"
        });
        this._widget.browseIsModeFill = false;
    }
    DataFill(DataModel) {
        $(this._widgetTitleContent).html(DataModel.Title);
        //是否有放大缩小
        if (DataModel.IsMaximizable) {
            $(this._widgetEnlarge).show();
        }
        else {
            $(this._widgetEnlarge).hide();
        }
        //加载部件菜单
        if (DataModel.ListWidgetMenuItem) {
            var widgetMenuModelArray = [];
            $(DataModel.ListWidgetMenuItem).each(function () {
                widgetMenuModelArray.push({ id: this.Id, menuId: this.MenuId, menuName: this.MenuLabel, menuShowMode: this.MenuShowMode, menuSortOrder: this.SortOrder, menuFaIcon: this.MenuFaIcon });
            });
            this._widget.widgetMenuModel = [];
            this.WidgetMenuModelLoad(widgetMenuModelArray);
        }
    }
    /**
    *北部面板初始化
    */
    WidgetNorthInit_Browse() {
        var that = this;
        var WidgetNorth = that._widgetNorth;
        //部件标题Div
        var WidgetNorth_TitlePanel = document.createElement("div");
        $(WidgetNorth_TitlePanel).addClass("GfWidgetTitlePanel");
        $(WidgetNorth).append(WidgetNorth_TitlePanel);
        //标题内容元素
        var WidgetNorth_TitlePanel_Content = document.createElement("a");
        $(WidgetNorth_TitlePanel_Content).addClass("GfWidgetTitleContent");
        $(WidgetNorth_TitlePanel).append(WidgetNorth_TitlePanel_Content);
        that._widgetTitleContent = WidgetNorth_TitlePanel_Content;
        //标题右边关闭按钮
        var WidgetNorth_Close = document.createElement("a");
        $(WidgetNorth_Close).addClass("GfWidgetClose");
        $(WidgetNorth_Close).attr("title", "关闭");
        $(WidgetNorth_Close).click(function () {
            that.WidgetCloseClick();
        });
        $(WidgetNorth).append(WidgetNorth_Close);
        that._widgetClose = WidgetNorth_Close;
        //标题右边放大按钮
        var WidgetNorth_Enlarge = document.createElement("a");
        $(WidgetNorth_Enlarge).addClass("GfWidgetEnlarge");
        $(WidgetNorth_Enlarge).attr("title", "最大化");
        $(WidgetNorth).append(WidgetNorth_Enlarge);
        that._widgetEnlarge = WidgetNorth_Enlarge;
        //放大按钮事件
        $(WidgetNorth_Enlarge).click(function () {
            that.WidgetEnlargeClick();
        });
        //标题右边缩小按钮
        var WidgetNorth_Shrink = document.createElement("a");
        $(WidgetNorth_Shrink).addClass("GfWidgetShrink");
        $(WidgetNorth_Shrink).attr("title", "还原");
        $(WidgetNorth).append(WidgetNorth_Shrink);
        that._widgetShrink = WidgetNorth_Shrink;
        $(WidgetNorth_Shrink).hide();
        //缩小按钮事件
        $(WidgetNorth_Shrink).click(function () {
            that.WidgetShrinkClick();
        });
    }
    /**
    *小部件放大按钮点击
    */
    WidgetEnlargeClick() {
        //小部件容器
        var WidgetPanel = this._widgetPanel;
        //小部件布局
        var WidgetLayout = this._widgetPanel_Layout;
        //放大按钮
        var WidgetEnlarge = this._widgetEnlarge;
        //缩小按钮
        var WidgetShrink = this._widgetShrink;
        //组件缩小宽度
        this._shrinkWidth = $(WidgetPanel).width();
        //组件缩小高度
        this._shrinkHeight = $(WidgetPanel).height();
        $(WidgetPanel).css({
            "width": "100%",
            "height": "100%"
        });
        $(WidgetLayout).layout('resize', {
            height: "100%",
            width: "100%"
        });
        $(WidgetEnlarge).hide();
        $(WidgetShrink).show();
    }
    /**
    *小部件缩小按钮点击
    */
    WidgetShrinkClick() {
        //小部件容器
        var WidgetPanel = this._widgetPanel;
        //小部件布局
        var WidgetLayout = this._widgetPanel_Layout;
        //放大按钮
        var WidgetEnlarge = this._widgetEnlarge;
        //缩小按钮
        var WidgetShrink = this._widgetShrink;
        $(WidgetPanel).css({
            "width": this._shrinkWidth + "px",
            "height": this._shrinkHeight + "px"
        });
        $(WidgetLayout).layout('resize', {
            height: "100%",
            width: "100%"
        });
        $(WidgetEnlarge).show();
        $(WidgetShrink).hide();
    }
    /**
    *小部件关闭按钮点击
    */
    WidgetCloseClick() {
        //小部件容器
        var WidgetPanel = this._widgetPanel;
        $(WidgetPanel).remove();
    }
    /**
    *中心内容面板初始化
    */
    WidgetCenterInit_Browse() {
        var that = this;
        var WidgetCenter = that._widgetCenter;
    }
    /**
    *加载小部件菜单
    * @param widgetMenuModelArray 小部件菜单对象数组:[{id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }]
    */
    WidgetMenuModelLoad(widgetMenuModelArray) {
        var that = this;
        //菜单视图模型
        var MenuModel = that._widget.widgetMenuModel;
        var WidgetCenter = that._widgetCenter;
        //清空Div内容
        $(WidgetCenter).empty();
        //加载数据为1条显示结果视图
        if (widgetMenuModelArray.length == 1) {
            //加载菜单结果视图
            that.MenuResultViewLoad(widgetMenuModelArray[0]);
            //插入到视图模型中
            MenuModel.push(widgetMenuModelArray[0]);
        }
        else {
            //加载菜单快捷方式
            $(widgetMenuModelArray).each(function () {
                that.MenuShortcutLoad(this);
                MenuModel.push(this);
            });
        }
    }
    /**
    *菜单快捷方式加载
    * @param widgetMenuModel 小部件菜单对象 {id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }
    */
    MenuShortcutLoad(widgetMenuModel) {
        var that = this;
        var WidgetCenter = that._widgetCenter;
        //创建一个快捷方式的Button
        var shortcutButton = document.createElement("a");
        $(shortcutButton).attr("id", widgetMenuModel.id);
        $(shortcutButton).attr("menuid", widgetMenuModel.menuId);
        $(shortcutButton).attr("showmode", widgetMenuModel.menuShowMode);
        $(shortcutButton).attr("menuname", widgetMenuModel.menuName);
        $(shortcutButton).attr("sortorder", widgetMenuModel.menuSortOrder);
        $(shortcutButton).attr("menufaicon", widgetMenuModel.menuFaIcon);
        $(shortcutButton).addClass("ShortcutButton");
        $(shortcutButton).linkbutton({
            iconCls: widgetMenuModel.menuFaIcon,
            text: widgetMenuModel.menuName
        });
        $(shortcutButton).click(function (e) {
            that.MenuClick(widgetMenuModel.menuId, widgetMenuModel.menuShowMode);
            e.stopPropagation();
        });
        //快捷方式按钮加入到组件
        $(WidgetCenter).append(shortcutButton);
    }
    /**
    *菜单快捷方式点击
    * @param menuId 菜单ID
    * @param showMode 菜单点击显示模式
    */
    MenuClick(menuId, showMode) {
        window["platformAjax"]({
            url: ComponentRoot.APIs.menuHandle,
            data: { menuId: menuId, parentMenuId: "" },
            success: function (result) {
                var tabs = document.querySelector("#frametabs");
                switch (result.HandleType) {
                    case 'Url':
                        if (showMode == "1") {
                            tabs["add"](menuId, result.Title, result.Url, "", result.IsPage);
                        }
                        else if (showMode == "2" || showMode == "3") {
                            document.body["openDialog"]({
                                id: menuId + "dialog",
                                title: result.Title,
                                modal: result.ShowMode == "2",
                                href: result.Url
                            });
                        }
                        else if (showMode == "4") {
                            window.open(result.Url, result.Title);
                        }
                        break;
                    case 'Content':
                        if (showMode == "1") {
                            tabs["addContent"](menuId, result.Title, result.Content);
                        }
                        else if (showMode == "2" || showMode == "3") {
                            document.body["openDialog"]({
                                id: menuId + "dialog",
                                title: result.Title,
                                modal: result.ShowMode == "2",
                                content: result.Content
                            });
                        }
                        else if (showMode == "4") {
                            tabs["addContent"](menuId, result.Title, result.Content);
                        }
                        break;
                    case 'Script':
                        eval(result.Script);
                        break;
                }
            }
        });
    }
    /**
    *菜单结果视图加载
    * @param widgetMenuModel 小部件菜单对象 {id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }
    */
    MenuResultViewLoad(widgetMenuModel) {
        var WidgetCenter = this._widgetCenter;
        window["platformAjax"]({
            url: ComponentRoot.APIs.menuHandle,
            data: { menuId: widgetMenuModel.menuId, parentMenuId: "" },
            success: function (result) {
                switch (result.HandleType) {
                    case 'Url':
                        $(WidgetCenter).load(result.Url);
                        break;
                    case 'Content':
                        $(WidgetCenter).html(result.Content);
                        break;
                }
            }
        });
    }
    onObjektDataWriteback() {
    }
    onRecievedMessage(message, source) {
        //状态转换前
        if (message instanceof UIMessageStateSwitching) {
            if (this._widget.state == UIState.browse) {
                $(this._widgetPanel).css({
                    "width": this._widget.originalWidth,
                    "height": this._widget.originalHeight
                });
                $(this._widgetPanel_Layout).css({
                    "width": "100%",
                    "height": "100%"
                });
            }
        }
        else if (message instanceof UIMessageStateSwitched) {
            //浏览状态清空提交数据
            if (this._widget.state == UIState.browse) {
                if (this._widget.submitModel.length > 0) {
                    this._widget.editIsModeFill = true;
                }
                this._widget.submitModel = [];
                this._widget.setModified(false);
                if (this._widget.browseIsModeFill) {
                    this.ModelFill();
                }
            }
        }
    }
}
class WidgetEdit extends UIComponentBaseEdit {
    constructor() {
        super(...arguments);
        /** 组件*/
        this._widget = this.getWrapper();
    }
    onRender() {
        return this.WidgetInit_Edit();
    }
    afterRender() {
        this.ModelFill();
        $(this._widgetPanel_Layout).layout('resize', {
            width: '100%',
            height: '100%'
        });
    }
    /**
    *模型填充
    */
    ModelFill() {
        var that = this;
        this._widget.GetWidgetData(function (DataModel) { that.DataFill(DataModel); });
        $(this._widgetPanel).css({
            "width": this._widget.width,
            "height": this._widget.height
        });
        $(this._widgetPanel_Layout).css({
            "width": "100%",
            "height": "100%"
        });
        this._widget.editIsModeFill = false;
    }
    /**
    *数据填充
    *@param DataModel 后台数据模型
    */
    DataFill(DataModel) {
        //标题填充
        $(this._widgetTitleContent).html(DataModel.Title);
        //自动更改标题
        if (DataModel.Title) {
            this._isAutoChangeWidgetTitle = false;
        }
        else {
            this._isAutoChangeWidgetTitle = true;
        }
        //是否有放大缩小
        if (DataModel.IsMaximizable) {
            $(this._widgetEnlarge).show();
        }
        else {
            $(this._widgetEnlarge).hide();
        }
        //标题输入框文字填充
        $(this._widgetTitleText).textbox({
            prompt: DataModel.Title
        });
        $(this._widgetTitleText).textbox('textbox').bind('mousedown', function (e) {
            e.stopPropagation();
        });
        var that = this;
        $(this._widgetTitleText).textbox('textbox').bind('blur', function (e) {
            that.WidgetInputTextBlur();
        });
        //加载部件菜单
        if (DataModel.ListWidgetMenuItem) {
            $(this._widgetCenter).html("");
            var widgetMenuModelArray = [];
            $(DataModel.ListWidgetMenuItem).each(function () {
                widgetMenuModelArray.push({ id: this.Id, menuId: this.MenuId, menuName: this.MenuLabel, menuShowMode: this.MenuShowMode, menuSortOrder: this.SortOrder, menuFaIcon: this.MenuFaIcon });
            });
            this._widget.widgetMenuModel = [];
            this.WidgetMenuModelLoad(widgetMenuModelArray);
        }
    }
    /**
    *小部件初始化
    */
    WidgetInit_Edit() {
        var that = this;
        var id = that._widget.id;
        $(that._widget).addClass("GfWidget");
        //部件容器Div
        var WidgetPanel = document.createElement("div");
        $(WidgetPanel).addClass("GfWidgetPanel");
        $(WidgetPanel).css({
            "width": that._widget.width,
            "height": that._widget.height
        });
        that._widgetPanel = WidgetPanel;
        //创建布局
        var WidgetPanel_Layout = document.createElement("div");
        $(WidgetPanel).append(WidgetPanel_Layout);
        that._widgetPanel_Layout = WidgetPanel_Layout;
        //初始化布局
        $(WidgetPanel_Layout).layout({
            //自适应
            fit: true
        });
        //增加上方北部面板
        $(WidgetPanel_Layout).layout('add', {
            region: 'north',
            height: 28
        });
        //增加下方内容面板
        $(WidgetPanel_Layout).layout('add', {
            region: 'center'
        });
        //北部面板Div
        var WidgetPanel_Layout_LayoutNorth_NorthPanel = document.createElement("div");
        $(WidgetPanel_Layout_LayoutNorth_NorthPanel).addClass("GfWidgetNorthPanel");
        var WidgetPanel_Layout_LayoutNorth = $(WidgetPanel_Layout).layout("panel", "north");
        $(WidgetPanel_Layout_LayoutNorth).append(WidgetPanel_Layout_LayoutNorth_NorthPanel);
        that._widgetNorth = WidgetPanel_Layout_LayoutNorth_NorthPanel;
        //小部件北部初始化
        that.WidgetNorthInit_Edit();
        //部件内容Div
        var WidgetPanel_Layout_LayoutCenter_CenterPanel = document.createElement("div");
        $(WidgetPanel_Layout_LayoutCenter_CenterPanel).addClass("WidgetCenterPanel");
        var WidgetDiv_Layout_LayoutCenter = $(WidgetPanel_Layout).layout("panel", "center");
        $(WidgetDiv_Layout_LayoutCenter).append(WidgetPanel_Layout_LayoutCenter_CenterPanel);
        that._widgetCenter = WidgetPanel_Layout_LayoutCenter_CenterPanel;
        //小部件中心内容初始化
        that.WidgetCenterInit_Edit();
        //部件容器设置改变大小
        $(WidgetPanel).resizable({
            minWidth: 120,
            minHeight: 90,
            onResize: function (e) {
                $(WidgetPanel_Layout).layout('resize', {
                    height: "100%",
                    width: "100%"
                });
                that._widget.width = $(WidgetPanel).width();
                that._widget.height = $(WidgetPanel).height();
            }
        });
        //部件容器设置可拖动
        $(WidgetPanel).draggable({
            revert: true,
            handle: $(WidgetPanel_Layout_LayoutNorth_NorthPanel),
            deltaX: 0,
            deltaY: 0
        });
        //部件容器可改变位置            
        $(WidgetPanel).droppable({
            //可接受的拖动元素
            accept: ".GfWidgetPanel",
            onDragEnter: function (e, source) {
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            onDragOver: function (e, source) {
                var width = $(source).width();
                $(this).css({
                    "margin-right": width + "px"
                });
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            onDragLeave: function (e, source) {
                $(this).css({
                    "margin-right": "10px"
                });
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            onDrop: function (e, source) {
                $(source).parents(Widget.elementName).insertAfter($(this).parents(Widget.elementName));
                $(this).css({
                    "margin-right": "10px"
                });
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            }
        });
        return WidgetPanel;
    }
    /**
    *北部面板初始化
    */
    WidgetNorthInit_Edit() {
        var that = this;
        var WidgetNorth = that._widgetNorth;
        //部件标题Div
        var WidgetNorth_TitlePanel = document.createElement("div");
        $(WidgetNorth_TitlePanel).addClass("GfWidgetTitlePanel");
        $(WidgetNorth).append(WidgetNorth_TitlePanel);
        //标题内容元素
        var WidgetNorth_TitlePanel_Content = document.createElement("a");
        $(WidgetNorth_TitlePanel_Content).addClass("GfWidgetTitleContent");
        $(WidgetNorth_TitlePanel).append(WidgetNorth_TitlePanel_Content);
        that._widgetTitleContent = WidgetNorth_TitlePanel_Content;
        //标题右边放大按钮
        var WidgetNorth_Enlarge = document.createElement("a");
        $(WidgetNorth_Enlarge).addClass("GfWidgetEnlarge");
        $(WidgetNorth_Enlarge).attr("title", "最大化");
        $(WidgetNorth).append(WidgetNorth_Enlarge);
        that._widgetEnlarge = WidgetNorth_Enlarge;
        //放大按钮事件
        $(WidgetNorth_Enlarge).click(function () {
            that.WidgetEnlargeClick();
        });
        //标题右边缩小按钮
        var WidgetNorth_Shrink = document.createElement("a");
        $(WidgetNorth_Shrink).addClass("GfWidgetShrink");
        $(WidgetNorth_Shrink).attr("title", "还原");
        $(WidgetNorth).append(WidgetNorth_Shrink);
        that._widgetShrink = WidgetNorth_Shrink;
        $(WidgetNorth_Shrink).hide();
        //缩小按钮事件
        $(WidgetNorth_Shrink).click(function () {
            that.WidgetShrinkClick();
        });
        //标题内容编辑按钮
        var WidgetNorth_TitlePanel_Edit = document.createElement("a");
        $(WidgetNorth_TitlePanel_Edit).addClass("fa fa-pencil-square-o GfWidgetTitleEdit");
        $(WidgetNorth_TitlePanel_Edit).attr("title", "编辑标题");
        $(WidgetNorth_TitlePanel_Edit).click(function () {
            that.WidgetTitleEditClick();
        });
        $(WidgetNorth_TitlePanel).append(WidgetNorth_TitlePanel_Edit);
        that._widgetTitleEdit = WidgetNorth_TitlePanel_Edit;
        //标题输入框容器
        var WidgetNorth_TitlePanel_InputPanel = document.createElement("div");
        $(WidgetNorth_TitlePanel_InputPanel).addClass("WidgetTitleInputPanel");
        $(WidgetNorth_TitlePanel).append(WidgetNorth_TitlePanel_InputPanel);
        that._widgetTitlePanel = WidgetNorth_TitlePanel_InputPanel;
        $(WidgetNorth_TitlePanel_InputPanel).hide();
        //标题输入框
        var WidgetNorth_TitlePanel_InputPanel_InputText = document.createElement("a");
        $(WidgetNorth_TitlePanel_InputPanel).append(WidgetNorth_TitlePanel_InputPanel_InputText);
        $(WidgetNorth_TitlePanel_InputPanel_InputText).textbox({
            width: 90,
            height: 16,
            cls: "WidgetTitleInputText",
            onChange: function (newValue, oldValue) {
                that.WidgetTitleChange(newValue);
                that._isAutoChangeWidgetTitle = false;
            }
        });
        $(WidgetNorth_TitlePanel_InputPanel_InputText).textbox('textbox').bind('mousedown', function (e) {
            e.stopPropagation();
        });
        $(WidgetNorth_TitlePanel_InputPanel_InputText).textbox('textbox').bind('blur', function (e) {
            that.WidgetInputTextBlur();
        });
        that._widgetTitleText = WidgetNorth_TitlePanel_InputPanel_InputText;
        //删除按钮
        var WidgetTitleDivDelete = document.createElement("a");
        $(WidgetTitleDivDelete).addClass("fa fa-trash-o GfWidgetDelete");
        $(WidgetTitleDivDelete).attr("title", "小部件删除(保存生效)");
        $(WidgetNorth).append(WidgetTitleDivDelete);
        $(WidgetTitleDivDelete).click(function () {
            //部件删除
            that.WidgetDeleteClick();
        });
        that._widgetDelete = WidgetTitleDivDelete;
    }
    /**
    *小部件放大按钮点击
    */
    WidgetEnlargeClick() {
        //小部件容器
        var WidgetPanel = this._widgetPanel;
        //小部件布局
        var WidgetLayout = this._widgetPanel_Layout;
        //放大按钮
        var WidgetEnlarge = this._widgetEnlarge;
        //缩小按钮
        var WidgetShrink = this._widgetShrink;
        //组件缩小宽度
        this._shrinkWidth = $(WidgetPanel).width();
        //组件缩小高度
        this._shrinkHeight = $(WidgetPanel).height();
        $(WidgetPanel).css({
            "width": "100%",
            "height": "100%"
        });
        $(WidgetLayout).layout('resize', {
            height: "100%",
            width: "100%"
        });
        $(WidgetEnlarge).hide();
        $(WidgetShrink).show();
        this._widget.width = $(this._widgetPanel).width();
        this._widget.height = $(this._widgetPanel).height();
    }
    /**
    *小部件缩小按钮点击
    */
    WidgetShrinkClick() {
        //小部件容器
        var WidgetPanel = this._widgetPanel;
        //小部件布局
        var WidgetLayout = this._widgetPanel_Layout;
        //放大按钮
        var WidgetEnlarge = this._widgetEnlarge;
        //缩小按钮
        var WidgetShrink = this._widgetShrink;
        $(WidgetPanel).css({
            "width": this._shrinkWidth + "px",
            "height": this._shrinkHeight + "px"
        });
        $(WidgetLayout).layout('resize', {
            height: "100%",
            width: "100%"
        });
        $(WidgetEnlarge).show();
        $(WidgetShrink).hide();
        this._widget.width = $(this._widgetPanel).width();
        this._widget.height = $(this._widgetPanel).height();
    }
    /**
    *标题编辑按钮点击
    */
    WidgetTitleEditClick() {
        var WidgetTitleContent = this._widgetTitleContent;
        var WidgetTitleEdit = this._widgetTitleEdit;
        var WidgetTitleInputText = this._widgetTitleText;
        $(WidgetTitleContent).hide();
        $(WidgetTitleEdit).hide();
        $(WidgetTitleInputText).parent().show();
        $(WidgetTitleInputText).textbox('textbox').focus();
    }
    /**
    *标题输入框失去焦点事件
    */
    WidgetInputTextBlur() {
        var WidgetTitleContent = this._widgetTitleContent;
        var WidgetTitleEdit = this._widgetTitleEdit;
        var WidgetTitleInputText = this._widgetTitleText;
        $(WidgetTitleEdit).show();
        $(WidgetTitleContent).show();
        $(WidgetTitleInputText).parent().hide();
    }
    /**
    *小部件删除按钮点击
    */
    WidgetDeleteClick() {
        this.WidgetDelete();
    }
    /**
    *小部件删除
    */
    WidgetDelete() {
        var that = this;
        //数据提交模型
        var SubmitModel = that._widget.submitModel;
        //小部件容器
        var WidgetPanel = that._widgetPanel;
        //小部件是否为新增
        if (that._widget.widgetstatus == ObjektState.Created) {
            //清空提交数据
            that._widget.submitModel = [];
            //发送删除对象删除消息
            that._widget.sendMessage(new UIMessageObjektDeleted(that._widget.widgetId));
            //删除组件
            $(that._widget).remove();
        }
        else {
            //从提交模型中查询待删除的数据        
            var submitModelIndex = Utils.ObjectArraySearch(SubmitModel, "id", that._widget.widgetId);
            //不在提交模型中则新增一条
            if (submitModelIndex == -1) {
                SubmitModel.push({ "id": that._widget.widgetId, objektState: ObjektState.Deleted });
            }
            else {
                SubmitModel[submitModelIndex].objektState = ObjektState.Deleted;
            }
            //删除元素
            $(WidgetPanel).remove();
            that._widget.widgetstatus = ObjektState.Deleted;
        }
        that._widget.CheckIsModify();
    }
    /**
    *小部件修改
    @param submitModelPropertyName 提交模型属性名
    @param submitModelPropertyValue 提交模型属性值
    */
    WidgetChange(submitModelPropertyName, submitModelPropertyValue) {
        var that = this;
        var SubmitModel = that._widget.submitModel;
        //查询修改的数据是否在数据提交模型中
        var submitModelIndex = Utils.ObjectArraySearch(SubmitModel, "id", that._widget.widgetId);
        //如果在数据提交模型中
        if (submitModelIndex != -1) {
            //更新修改的值                        
            SubmitModel[submitModelIndex][submitModelPropertyName] = submitModelPropertyValue;
        }
        else {
            var model = {};
            model["id"] = that._widget.widgetId;
            model[submitModelPropertyName] = submitModelPropertyValue;
            model["objektState"] = ObjektState.Updated;
            SubmitModel.push(model);
        }
        that._widget.CheckIsModify();
    }
    /**
    *小部件标题修改
    *@param titleContent 标题名称
    */
    WidgetTitleChange(titleContent) {
        var that = this;
        //部件标题
        var WidgetTitleContent = that._widgetTitleContent;
        //标题修改
        $(WidgetTitleContent).html(titleContent);
        that._widget.widgetTitle = titleContent;
        that.WidgetChange("title", titleContent);
    }
    /**
    *中心内容面板初始化
    */
    WidgetCenterInit_Edit() {
        var that = this;
        var WidgetCenter = that._widgetCenter;
        //部件内容设置可接收元素
        $(WidgetCenter).droppable({
            //可接受的拖动元素
            accept: "#westDiv .tree-node",
            onDragEnter: function (e, source) {
                //拖动元素进入时组件添加背景色
                $(this).addClass('DraggableEnter');
                that._widget.fireAfterDragEnter();
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            //拖动元素进入时触发
            onDragOver: function (e, source) {
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            //拖动元素离开时触发
            onDragLeave: function (e, source) {
                //拖动元素离开组建时去除背景色
                $(this).removeClass('DraggableEnter');
                that._widget.fireAfterDragLeave();
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            //元素拖动时触发
            onDrop: function (e, source) {
                var node = $(source).closest("gf-tree")[0].getNode(source);
                //去除背景色
                $(this).removeClass('DraggableEnter');
                //构建一个菜单对象数组                
                var menuModelArray = [{ menuId: node.id.replace("-", "@"), menuName: node.text, menuShowMode: node.ShowMode, menuFaIcon: node.iconCls }];
                //增加小部件菜单
                that.WidgetMenuAdd(menuModelArray);
                that._widget.fireAfterDragEnd();
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            }
        });
    }
    /**
   *加载小部件菜单
   * @param widgetMenuModelArray 小部件菜单对象数组:[{id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }]
   */
    WidgetMenuModelLoad(widgetMenuModelArray) {
        var that = this;
        //菜单视图模型
        var MenuModel = that._widget.widgetMenuModel;
        var WidgetCenter = that._widgetCenter;
        //清空Div内容
        $(WidgetCenter).empty();
        //加载数据为1条显示结果视图
        if (widgetMenuModelArray.length == 1) {
            //加载菜单结果视图
            that.MenuResultViewLoad(widgetMenuModelArray[0]);
            //插入到视图模型中
            MenuModel.push(widgetMenuModelArray[0]);
        }
        else {
            //加载菜单快捷方式
            $(widgetMenuModelArray).each(function () {
                that.MenuShortcutLoad(this);
                MenuModel.push(this);
            });
        }
    }
    /**
    *菜单快捷方式加载
    * @param widgetMenuModel 小部件菜单对象 {id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }
    */
    MenuShortcutLoad(widgetMenuModel) {
        var that = this;
        var WidgetCenter = that._widgetCenter;
        //创建一个快捷方式的Button
        var shortcutButton = document.createElement("a");
        $(shortcutButton).attr("id", widgetMenuModel.id);
        $(shortcutButton).attr("menuid", widgetMenuModel.menuId);
        $(shortcutButton).attr("showmode", widgetMenuModel.menuShowMode);
        $(shortcutButton).attr("menuname", widgetMenuModel.menuName);
        $(shortcutButton).attr("sortorder", widgetMenuModel.menuSortOrder);
        $(shortcutButton).attr("menufaicon", widgetMenuModel.menuFaIcon);
        $(shortcutButton).addClass("ShortcutButton");
        $(shortcutButton).linkbutton({
            iconCls: widgetMenuModel.menuFaIcon,
            text: widgetMenuModel.menuName
        });
        //设置元素设置为可拖动
        $(shortcutButton).draggable({
            onBeforeDrag: function (e) {
                //鼠标右键不能拖动
                if (e.which == 3) {
                    return false;
                }
            },
            revert: true
        });
        //按钮可改变位置            
        $(shortcutButton).droppable({
            //可接受的拖动元素
            accept: "#" + that._widget.id + " .ShortcutButton",
            onDragEnter: function (e, source) {
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            onDragOver: function (e, source) {
                var width = $(source).width();
                $(this).css({
                    "margin-right": width + "px"
                });
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            onDragLeave: function (e, source) {
                $(this).css({
                    "margin-right": "0px"
                });
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            },
            onDrop: function (e, source) {
                $(this).css({
                    "margin-right": "0px"
                });
                $(source).insertAfter(this);
                //前一个元素的排序值
                var beforeMenuSortOrder = parseFloat($(this).attr("sortorder"));
                var newSortOrder = 0;
                if ($(source).next().length > 0) {
                    //后一个元素的排序值
                    var afterMenuSortOrder = parseFloat($(source).next().attr("sortorder"));
                    //计算改变后的排序值
                    newSortOrder = (beforeMenuSortOrder + afterMenuSortOrder) / 2;
                }
                else {
                    newSortOrder = beforeMenuSortOrder + 1;
                }
                that.WidgetMenuChange($(source).attr("id"), "menuSortOrder", newSortOrder);
                $(source).attr("sortorder", newSortOrder);
                //阻止事件冒泡,防止嵌套
                e.stopPropagation();
            }
        });
        //快捷方式按钮右键菜单
        var RightMenuDiv = document.createElement("div");
        $(RightMenuDiv).menu({});
        //增加菜单删除按钮
        $(RightMenuDiv).menu('appendItem', {
            text: '删除',
            iconCls: 'fa fa-trash-o ShortcutButtonRightMenu GfWidget',
            onclick: function () { that.WidgetMenuDelete($(shortcutButton).attr("id")); }
        });
        that._rightMenu = RightMenuDiv;
        $(shortcutButton).bind('contextmenu', function (e) {
            e.preventDefault();
            $(RightMenuDiv).menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        });
        //快捷方式按钮加入到组件
        $(WidgetCenter).append(shortcutButton);
    }
    /**
    *菜单结果视图加载
    * @param widgetMenuModel 小部件菜单对象 {id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }
    */
    MenuResultViewLoad(widgetMenuModel) {
        var WidgetCenter = this._widgetCenter;
        window["platformAjax"]({
            url: ComponentRoot.APIs.menuHandle,
            data: { menuId: widgetMenuModel.menuId, parentMenuId: "" },
            success: function (result) {
                switch (result.HandleType) {
                    case 'Url':
                        $(WidgetCenter).load(result.Url);
                        break;
                    case 'Content':
                        $(WidgetCenter).html(result.Content);
                        break;
                }
            }
        });
    }
    /**
   *新增小部件菜单
   * @param menuModelArray 菜单对象数组:[{menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式, menuFaIcon: 菜单字体图标 }]
   */
    WidgetMenuAdd(menuModelArray) {
        var that = this;
        var WidgetCenter = that._widgetCenter;
        //数据提交模型
        var SubmitModel = that._widget.submitModel;
        //菜单视图模型
        var MenuModel = that._widget.widgetMenuModel;
        //待添加菜单视图模型
        var AddMenuModel = [];
        //判断添加的数据是否在视图模型中,如果不在模型中则添加
        $(menuModelArray).each(function () {
            var arrayIndex = Utils.ObjectArraySearch(MenuModel, "menuId", this.menuId);
            //不在模型中则添加
            if (arrayIndex == -1) {
                var WidgetMenuItemModel = that._widget.newObjekt("WidgetMenuItem");
                this.id = WidgetMenuItemModel.id;
                //计算菜单排序
                if (!this.menuSortOrder) {
                    var sortOrder = that.CalculationMenuSortOrder();
                    this.menuSortOrder = sortOrder;
                }
                AddMenuModel.push(this);
                //加入到数据提交模型中
                SubmitModel.push({ "id": WidgetMenuItemModel.id, objektState: ObjektState.Created, "source": that._widget.widgetId, "related": this.menuId, "sortOrder": this.menuSortOrder });
            }
        });
        //视图模型为0条,待添加的视图模型为1条时显示结果视图
        if (MenuModel.length == 0 && AddMenuModel.length == 1) {
            //加载结果视图
            that.MenuResultViewLoad(AddMenuModel[0]);
            //将标题改为菜单名
            if (that._isAutoChangeWidgetTitle) {
                //修改标题
                that.WidgetTitleChange(AddMenuModel[0].menuName);
            }
            //视图模型增加一条数据
            MenuModel.push(AddMenuModel[0]);
        }
        else if (MenuModel.length == 1 && AddMenuModel.length == 1) {
            $.messager.confirm('消息', '是否覆盖', function (r) {
                //确定覆盖
                if (r) {
                    //删除视图模型中数据
                    that.WidgetMenuDelete(MenuModel[0].id);
                    //加载结果视图
                    that.MenuResultViewLoad(AddMenuModel[0]);
                    //将标题改为菜单名
                    if (that._isAutoChangeWidgetTitle) {
                        //修改标题
                        that.WidgetTitleChange(AddMenuModel[0].menuName);
                    }
                    //视图模型增加一条数据
                    MenuModel.push(AddMenuModel[0]);
                }
                else {
                    //视图模型增加一条数据
                    MenuModel.push(AddMenuModel[0]);
                    //清空结果视图
                    $(WidgetCenter).empty();
                    //加载快捷方式
                    $(MenuModel).each(function () {
                        that.MenuShortcutLoad(this);
                    });
                    if (that._isAutoChangeWidgetTitle) {
                        //修改标题
                        that.WidgetTitleChange("快捷方式");
                    }
                }
            });
        }
        else {
            $(AddMenuModel).each(function () {
                that.MenuShortcutLoad(this);
                MenuModel.push(this);
            });
            if (AddMenuModel.length > 0) {
                //将标题改为快捷方式
                if (that._isAutoChangeWidgetTitle) {
                    //修改标题
                    that.WidgetTitleChange("快捷方式");
                }
            }
        }
        that._widget.CheckIsModify();
    }
    /**
    *删除小部件菜单
    * @param id 小部件菜单ID
    */
    WidgetMenuDelete(id) {
        var that = this;
        //视图模型
        var MenuModel = that._widget.widgetMenuModel;
        //数据提交模型
        var SubmitModel = that._widget.submitModel;
        //下方容器
        var WidgetCenter = that._widgetCenter;
        //视图模型大于1判断为快捷方式视图,界面上找到这个快捷方式并删除
        if (MenuModel.length > 1) {
            $(WidgetCenter).find("[id='" + id + "']").remove();
        }
        else {
            $(WidgetCenter).empty();
        }
        //从视图模型中查询待删除的数据
        var menuModelIndex = Utils.ObjectArraySearch(MenuModel, "id", id);
        //从视图模型中删除
        MenuModel.splice(menuModelIndex, 1);
        //从提交模型中查询待删除的数据        
        var submitModelIndex = Utils.ObjectArraySearch(SubmitModel, "id", id);
        //不在提交模型中则新增一条
        if (submitModelIndex == -1) {
            SubmitModel.push({ "id": id, objektState: ObjektState.Deleted });
        }
        else {
            //判断是否为新增数据
            if (SubmitModel[submitModelIndex].objektState != ObjektState.Created) {
                SubmitModel[submitModelIndex].objektState = ObjektState.Deleted;
            }
            else {
                SubmitModel.splice(submitModelIndex, 1);
            }
        }
        that._widget.CheckIsModify();
    }
    /**
    *修改小部件菜单
    * @param id 小部件菜单ID
    * @param menuModelPropertyName 菜单视图模型属性名
    * @param menuModelPropertyValue 菜单视图模型属性值
    */
    WidgetMenuChange(id, menuModelPropertyName, menuModelPropertyValue) {
        var that = this;
        //视图模型
        var MenuModel = that._widget.widgetMenuModel;
        //数据提交模型
        var SubmitModel = that._widget.submitModel;
        //视图模型中查询数据
        var menuModelArrayIndex = Utils.ObjectArraySearch(MenuModel, "id", id);
        MenuModel[menuModelArrayIndex][menuModelPropertyName] = menuModelPropertyValue;
        //查询修改的数据是否在数据提交模型中
        var submitModelIndex = Utils.ObjectArraySearch(SubmitModel, "id", id);
        //区分视图模型属性名对应的提交模型的属性名
        var submitModelPropertyName = "";
        if (menuModelPropertyName == "menuSortOrder") {
            submitModelPropertyName = "sortOrder";
        }
        else {
            return;
        }
        //如果在数据提交模型中
        if (submitModelIndex != -1) {
            //更新修改的值                        
            SubmitModel[submitModelIndex][submitModelPropertyName] = menuModelPropertyValue;
            //判断是否为新增数据
            if (SubmitModel[submitModelIndex].objektState != ObjektState.Created) {
                SubmitModel[submitModelIndex].objektState = ObjektState.Updated;
            }
        }
        else {
            var model = {};
            model["id"] = id;
            model[submitModelPropertyName] = menuModelPropertyValue;
            model["objektState"] = ObjektState.Updated;
            SubmitModel.push(model);
        }
        that._widget.CheckIsModify();
    }
    /**
    *计算新增小部件菜单sortOrder
    */
    CalculationMenuSortOrder() {
        //菜单视图模型
        var MenuModel = this._widget.widgetMenuModel;
        //默认排序
        var sortOrder = 0;
        $(MenuModel).each(function () {
            if (this.menuSortOrder) {
                if (parseFloat(this.menuSortOrder) > sortOrder) {
                    sortOrder = parseFloat(this.menuSortOrder);
                }
            }
        });
        return sortOrder + 1;
    }
    onObjektDataWriteback() {
        var that = this;
        $(that._widget.submitModel).each(function () {
            if (this.objektState == ObjektState.Created) {
                delete this.objektState;
                that._widget.createObjekts([this]);
            }
            else if (this.objektState == ObjektState.Updated) {
                delete this.objektState;
                that._widget.updateObjekts([this]);
            }
            else if (this.objektState == ObjektState.Deleted) {
                delete this.objektState;
                that._widget.deleteObjekts([this]);
            }
        });
    }
    onRecievedMessage(message, source) {
        var that = this;
        //保存前
        if (message instanceof UIMessageSaving) {
        }
        else if (message instanceof UIMessageSaved) {
            if (that._widget.submitModel.length > 0) {
                that._widget.submitModel = [];
                that._widget.initialModel = "";
                that._widget.widgetstatus = ObjektState.Original;
                that._widget.CheckIsModify();
                that._widget.browseIsModeFill = true;
            }
        }
        else if (message instanceof UIMessageStateSwitching) {
            if (that._widget.state == UIState.edit) {
                $(this._widgetPanel).css({
                    "width": this._widget.originalWidth,
                    "height": this._widget.originalHeight
                });
                $(this._widgetPanel_Layout).css({
                    "width": "100%",
                    "height": "100%"
                });
            }
        }
        else if (message instanceof UIMessageStateSwitched) {
            if (that._widget.state == UIState.edit) {
                if (this._widget.editIsModeFill) {
                    that.ModelFill();
                }
            }
        }
    }
}
/// <reference path="../UIComponentBase.ts" />
/** 属性组件基类 */
class BasePropertyView extends UIComponentBase {
    /**
     * 需要侦听值改变事件的属性
     */
    static get observedAttributes() {
        return super.observedAttributes.concat(["readonly"]);
    }
    /** 名称 */
    get name() {
        return this.getAttribute("name");
    }
    set name(val) {
        this.setAttribute("name", val);
    }
    /** 值 */
    get value() {
        return this.getAttribute("value");
    }
    set value(val) {
        this.setAttribute("value", val);
    }
    /** 标签 */
    get label() {
        return this.getAttribute("label");
    }
    set label(val) {
        this.setAttribute("label", val);
    }
    /** 描述 */
    get description() {
        return this.getAttribute("description");
    }
    set description(val) {
        this.setAttribute("description", val);
    }
    /** 对象ID */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }
    /** 属性名称 */
    get propertyName() {
        return this.getAttribute("propertyName");
    }
    set propertyName(val) {
        this.setAttribute("propertyName", val);
    }
    /** 筛选器ID */
    get filterId() {
        return this.getAttribute("filterId");
    }
    set filterId(val) {
        this.setAttribute("filterId", val);
    }
    /** 是否禁止修改 */
    get diseditable() {
        return this.safeToString(this.getAttribute("diseditable")).toLowerCase() == "true";
    }
    set diseditable(val) {
        this.setAttribute("diseditable", val.toString());
    }
    /** 是否必填 */
    get required() {
        return this.safeToString(this.getAttribute("required")).toLowerCase() == "true";
    }
    set required(val) {
        this.setAttribute("required", val.toString());
    }
    /** 是否只读 */
    get readonly() {
        return this.safeToString(this.getAttribute("readonly")).toLowerCase() == "true";
    }
    set readonly(val) {
        this.setAttribute("readonly", this.safeToString(val));
    }
    /** 是否仅创建可写 */
    get createonly() {
        return this.safeToString(this.getAttribute("createonly")).toLowerCase() == "true";
    }
    set createonly(val) {
        this.setAttribute("createonly", this.safeToString(val));
    }
    /** 是否自动保存 */
    get autosave() {
        return this.safeToString(this.getAttribute("autosave")).toLowerCase() == "true";
    }
    set autosave(val) {
        this.setAttribute("autosave", val.toString());
    }
    /** 是否禁用 */
    get disabled() {
        return this.safeToString(this.getAttribute("disabled")).toLowerCase() == "true";
    }
    set disabled(val) {
        this.setAttribute("disabled", val.toString());
    }
    attributeChanged(name, oldValue, newValue) {
        if (name == "readonly") {
            this.setReadOnly(this.readonly);
        }
        super.attributeChanged(name, oldValue, newValue);
    }
    /**
     * 重设组件大小
     * @param width 宽度（单位:px）
     * @param height 高度（单位:px，可选参数）
     */
    resize(width, height) { }
    /**
     * 获取焦点
     */
    focus() { }
    /**
     * 输入校验
     */
    validate() {
        if (this.required) {
            if (this.valueEquals(this.getValue(), this.emptyValue)) {
                return false;
            }
        }
        return true;
    }
    /**
     * 判断值是否相等
     * @param oldValue 旧值
     * @param newValue 新值
     */
    valueEquals(oldValue, newValue) {
        return this.valueConvert(oldValue) === this.valueConvert(newValue);
    }
    /**
     * 值改变回调
     * @param eventHandler 回调函数
     */
    onValueChange(eventHandler) {
        this.addHook(EventNames.ValueChange, eventHandler);
    }
    /**
     * 触发值改变回调
     * @param oldValue 旧值
     * @param newValue 新值
     */
    fireValueChange(oldValue, newValue) {
        this.fireHook(EventNames.ValueChange, [oldValue, newValue]);
    }
    /**
     * 设值
     * @param value 值
     */
    setValue(value) {
        if (this.readonly || this.state == UIState.browse) {
            return;
        }
        var oldValue = this._currentValue;
        this.onSetValue(value);
        this._currentValue = value;
        if (!this.valueEquals(oldValue, value)) {
            this.fireHook(EventNames.ValueChange, [oldValue, value]);
        }
        else if (this._originalValue === null) {
            this._originalValue = value;
        }
    }
    /**
     * 取值
     */
    getValue() {
        return this._currentValue;
    }
    /**
     * 值数据类型转换
     * @param value 值
     */
    valueConvert(value) {
        return value;
    }
    /**
     * 创建后事件
     */
    created() {
        this.emptyValue = '';
        var element = this;
        this.addHook(EventNames.BeforeInit, function () {
            if (typeof ($(element).attr("value")) != "undefined") {
                element._currentValue = element.valueConvert(element.value);
                element._originalValue = element._currentValue;
            }
            else if (element.objektId && element.propertyName) {
                var obj = element.getObjektData([element.objektId]).get(element.objektId);
                element._currentValue = obj[element.propertyName];
                element._originalValue = element._currentValue;
            }
        });
        this.addHook(EventNames.ValueChange, function (oldValue, newValue) {
            element._currentValue = newValue;
            if (element._originalValue === null) {
                element._originalValue = newValue;
            }
            else {
                element.setModified(!element.valueEquals(element._originalValue, newValue));
                if (element.autosave) {
                    element.sendMessage(new UIMessageSaving());
                }
            }
        });
        $(this).dblclick(function (event) {
            if (element.state == UIState.edit) {
                event.stopPropagation();
            }
        });
        super.created();
    }
}
/// <reference path="BasePropertyView.ts" />
/** 字符串属性组件 */
class StringPropertyView extends BasePropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new StringPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new StringPropertyViewEdit(this);
    }
    get input() {
        return this._inputElement;
    }
    set input(val) {
        this._inputElement = val;
    }
    /**
     * 禁用组件
     */
    disable() {
        $(this._inputElement).textbox('disable');
    }
    /**
     * 启用组件
     */
    enable() {
        $(this._inputElement).textbox('enable');
    }
    /**
     * 重设宽度
     * @param width 宽度(单位：px)
     */
    resize(width) {
        $(this._inputElement).textbox('resize', width);
    }
    /**
     * 获取焦点
     */
    focus() {
        $(this._inputElement).textbox('textbox').focus();
    }
    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    onSetValue(value) {
        $(this._inputElement).textbox('setValue', value);
    }
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    setReadOnly(readonly) {
        $(this._inputElement).textbox('readonly', readonly);
    }
}
/** 组件标签名称 */
StringPropertyView.elementName = "gf-stringpropertyview";
StringPropertyView.register();
class StringPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var wrapper = this.getWrapper();
        var display = super.onRender();
        var value = wrapper.getValue();
        if (wrapper.propertyName && wrapper.propertyName.toLowerCase() == 'filecontent') {
            value = window["htmlEncode"](value);
        }
        $(display).html(value);
        return display;
    }
}
class StringPropertyViewEdit extends BasePropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.getValue());
        wrapper.input = input;
        var span = super.onRender();
        span.appendChild(input);
        $(input).textbox({
            width: wrapper.width || 170,
            height: wrapper.height || 24,
            disabled: wrapper.disabled,
            editable: !wrapper.diseditable,
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });
        return span;
    }
}
/// <reference path="StringPropertyView.ts" />
/** 小数属性组件 */
class NumberPropertyView extends StringPropertyView {
    constructor() {
        super();
        this.defaultMaxValue = 9007199254740992;
        this.defaultMinValue = -9007199254740992;
        this.defaultPrecision = 16;
        this.defaultScale = 8;
    }
    createComponentBrowseState() {
        return new NumberPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new NumberPropertyViewEdit(this);
    }
    /** 小数位数 */
    get scale() {
        return this.getAttribute("scale");
    }
    set scale(val) {
        this.setAttribute("scale", val);
    }
    /** 整数位数 */
    get prec() {
        return this.getAttribute("prec");
    }
    set prec(val) {
        this.setAttribute("prec", val);
    }
    /** 最小值 */
    get min() {
        return this.getAttribute("min");
    }
    set min(val) {
        this.setAttribute("min", val);
    }
    /** 最大值 */
    get max() {
        return this.getAttribute("max");
    }
    set max(val) {
        this.setAttribute("max", val);
    }
    /**
     * 值数据类型转换
     * @param value 值
     */
    valueConvert(value) {
        if (!value) {
            return null;
        }
        return parseFloat(value);
    }
    /* protected valueEquals(oldValue, newValue) {
        if (!oldValue && !newValue) {
            return true;
        }
        return parseFloat(oldValue) == parseFloat(newValue);
    } */
    getValueRange() {
        //整数位数允许的最大值
        var precisionMax = 1;
        //小数位数决定的小数点后的部分
        var scaleMin = "";
        var precision = Math.min(parseInt(this.prec || this.defaultPrecision.toString()), this.defaultPrecision);
        if (precision > 0) {
            for (var i = 0; i < precision; i++) {
                precisionMax = precisionMax * 10;
            }
        }
        var scale = Math.min(parseInt(this.scale || this.defaultScale.toString()), this.defaultScale);
        if (scale > 0) {
            scaleMin += ".";
            for (var i = 0; i < scale; i++) {
                scaleMin += "9";
            }
        }
        var precisionMax = parseFloat((precisionMax - 1).toString() + scaleMin);
        var max = Math.min(precisionMax, parseInt(this.max || this.defaultMaxValue.toString()), this.defaultMaxValue);
        var min = Math.max(0 - precisionMax, parseInt(this.min || this.defaultMinValue.toString()), this.defaultMinValue);
        return { max: max, min: min };
    }
}
NumberPropertyView.elementName = "Gf-NumberPropertyView".toLowerCase();
NumberPropertyView.register();
class NumberPropertyViewBrowse extends StringPropertyViewBrowse {
}
class NumberPropertyViewEdit extends StringPropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.getValue());
        wrapper.input = input;
        var span = document.createElement("span");
        $(span).hide();
        $(span).click(function (e) {
            e.stopPropagation();
        });
        span.appendChild(input);
        var range = wrapper.getValueRange();
        var scale = Math.min(parseInt(wrapper.scale || wrapper.defaultScale.toString()), wrapper.defaultScale);
        $(input).numberbox({
            min: range.min,
            max: range.max,
            width: wrapper.width || 170,
            height: wrapper.height || 26,
            precision: scale,
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });
        return span;
    }
}
/// <reference path="NumberPropertyView.ts" />
/** 大整数属性组件 */
class BigIntPropertyView extends NumberPropertyView {
    constructor() {
        super();
        this.defaultScale = 0;
    }
    /**
     * 值数据类型转换
     * @param value 值
     */
    valueConvert(value) {
        if (!value) {
            return null;
        }
        return parseInt(value);
    }
}
BigIntPropertyView.elementName = "Gf-BigIntPropertyView".toLowerCase();
BigIntPropertyView.register();
/// <reference path="BasePropertyView.ts" />
/** 布尔属性组件 */
class BooleanPropertyView extends BasePropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new BooleanPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new BooleanPropertyViewEdit(this);
    }
    get input() {
        return this._input;
    }
    set input(val) {
        this._input = val;
    }
    get hideInput() {
        return this._hideInput;
    }
    set hideInput(val) {
        this._hideInput = val;
    }
    /** 是否选中 */
    get checked() {
        return $(this._input).attr('checked') == 'checked';
    }
    set checked(val) {
        this.setValue(val);
    }
    disable() {
        $(this._input).attr('disabled', 'disabled');
    }
    enable() {
        $(this._input).removeAttr('disabled');
    }
    /**
     * 输入校验
    */
    validate() {
        return true;
    }
    /**
     * 值数据类型转换
     * @param value 值
     */
    valueConvert(value) {
        if (!value) {
            return false;
        }
        return value.toString().toLowerCase() == "true";
    }
    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    onSetValue(value) {
        $(this._input).prop('checked', (value && value.toString().toLowerCase() == 'true'));
        $(this.hideInput).val(value);
    }
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    setReadOnly(readonly) {
        $(this._input).textbox('readonly', readonly);
    }
}
BooleanPropertyView.elementName = "Gf-BooleanPropertyView".toLowerCase();
BooleanPropertyView.register();
class BooleanPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper();
        var value = wrapper.getValue();
        if (value && value.toString().toLowerCase() == "true") {
            span.innerHTML = "√";
        }
        return span;
    }
}
class BooleanPropertyViewEdit extends BasePropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var input = document.createElement("input");
        var hiddenValue = document.createElement("input");
        $(input).attr("name", $(wrapper).attr("name"));
        $(input).attr("type", "checkbox");
        var value = wrapper.getValue();
        if (value && value.toString().toLowerCase() == "true") {
            $(input).attr("checked", "checked");
        }
        $(input).val(value);
        $(input).change(function () {
            var oldValue = wrapper.getValue();
            var newValue;
            if ($(input).prop('checked')) {
                newValue = true;
                $(hiddenValue).val("true");
            }
            else {
                newValue = false;
                $(hiddenValue).val("false");
            }
            wrapper.fireValueChange(oldValue, newValue);
        });
        $(hiddenValue).attr("name", $(wrapper).attr("name"));
        $(hiddenValue).attr("type", "hidden");
        $(hiddenValue).val(value);
        /* wrapper.appendChild(hiddenValue);
        wrapper.appendChild(input); */
        var height = parseInt(wrapper.height || "24");
        height = height > 13 ? height : 13;
        var diff = Math.floor(height / 2 - 7);
        $(wrapper).css("vertical-align", "-" + diff + "px");
        $(wrapper).css("padding-left", "5px");
        wrapper.input = input;
        wrapper.hideInput = hiddenValue;
        var span = super.onRender();
        span.appendChild(input);
        span.appendChild(hiddenValue);
        return span;
    }
}
/// <reference path="BasePropertyView.ts" />
/** 颜色字符串属性组件 */
class ColorStringPropertyView extends BasePropertyView {
    constructor() {
        super();
    }
    ;
    createComponentBrowseState() {
        return new ColorStringPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new ColorStringPropertyViewEdit(this);
    }
    disable() {
        $(this.get("input")).attr("disabled", "disabled");
    }
    enable() {
        $(this.get("input")).removeAttr("enable");
    }
    get input() {
        return this._inputElement;
    }
    set input(val) {
        this._inputElement = val;
    }
    get shower() {
        return this._shower;
    }
    set shower(val) {
        this._shower = val;
    }
    get displayShower() {
        return this._displayShower;
    }
    set displayShower(val) {
        this._displayShower = val;
    }
    resize(width) {
        $(this.input).width(width - 25);
    }
    onSetValue(value) {
        $(this.input).val(value);
        $(this.shower).css("backgroundColor", "#" + value);
        $(this.displayShower).css("backgroundColor", "#" + value);
    }
    connected() {
        $(this).addClass("ColorStringPropertyView");
        super.connected();
    }
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    setReadOnly(readonly) {
        $(this.input).textbox('readonly', readonly);
    }
}
ColorStringPropertyView.elementName = "Gf-ColorStringPropertyView".toLowerCase();
ColorStringPropertyView.register();
class ColorStringPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper();
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
        var wrapper = this.getWrapper();
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
/// <reference path="StringPropertyView.ts" />
/** 日期属性组件 */
class DatePropertyView extends StringPropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new DatePropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new DatePropertyViewEdit(this);
    }
}
DatePropertyView.elementName = "Gf-DatePropertyView".toLowerCase();
DatePropertyView.register();
class DatePropertyViewBrowse extends StringPropertyViewBrowse {
}
class DatePropertyViewEdit extends StringPropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.value);
        wrapper.input = input;
        var span = document.createElement("span");
        $(span).hide();
        $(span).click(function (e) {
            e.stopPropagation();
        });
        span.appendChild(input);
        $(input).datebox({
            value: wrapper.getValue(),
            width: wrapper.width || 170,
            height: wrapper.height || 24,
            editable: true,
            formatter: function (date) { return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(); },
            parser: function (s) {
                var t = Date.parse(s);
                if (!isNaN(t)) {
                    return new Date(t);
                }
                else {
                    return new Date();
                }
            },
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });
        return span;
    }
}
/// <reference path="DatePropertyView.ts" />
/** 日期时间属性组件 */
class DateTimePropertyView extends DatePropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new DateTimePropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new DateTimePropertyViewEdit(this);
    }
}
DateTimePropertyView.elementName = "Gf-DateTimePropertyView".toLowerCase();
DateTimePropertyView.register();
class DateTimePropertyViewBrowse extends DatePropertyViewBrowse {
}
class DateTimePropertyViewEdit extends DatePropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var span = super.onRender();
        $(wrapper.input).datetimebox({
            value: wrapper.getValue(),
            width: wrapper.width || 170,
            height: wrapper.height || 24,
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
                }
                else {
                    return new Date();
                }
            },
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });
        return span;
    }
}
/// <reference path="BigIntPropertyView.ts" />
/** 整数属性组件 */
class IntPropertyView extends BigIntPropertyView {
    constructor() {
        super();
        this.defaultMaxValue = 2147483647;
        this.defaultMinValue = -2147483648;
        this.defaultPrecision = 10;
    }
}
IntPropertyView.elementName = "Gf-IntPropertyView".toLowerCase();
IntPropertyView.register();
/// <reference path="BasePropertyView.ts" />
/** 列表属性组件 */
class ListPropertyView extends BasePropertyView {
    constructor() {
        super();
        this.emptyValue = null;
    }
    createComponentBrowseState() {
        return new ListPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new ListPropertyViewEdit(this);
    }
    /** select标签 */
    get selectElement() {
        return this._selectElement;
    }
    set selectElement(val) {
        this._selectElement = val;
    }
    /** 隐藏input标签 */
    get valueInput() {
        return this._valueInput;
    }
    set valueInput(val) {
        this._valueInput = val;
    }
    /** 背景颜色 */
    get items() {
        return this.get("items");
    }
    /** 背景颜色 */
    get color() {
        return this.getAttribute("color");
    }
    set color(val) {
        this.setAttribute("color", val);
    }
    /** 数据源 */
    get source() {
        return this.getAttribute("source");
    }
    set source(val) {
        this.setAttribute("source", val);
    }
    /** 默认选项 */
    get defaultoption() {
        return this.getAttribute("defaultoption");
    }
    set defaultoption(val) {
        this.setAttribute("defaultoption", val);
    }
    /** 值属性名称 */
    get valuefield() {
        return this.getAttribute("valuefield") || PropertyNames.id;
    }
    set valuefield(val) {
        this.setAttribute("valuefield", val);
    }
    /** 标签属性名称 */
    get textfield() {
        return this.getAttribute("textfield") || PropertyNames.combinedLabel;
    }
    set textfield(val) {
        this.setAttribute("textfield", val);
    }
    /** 数据 */
    get data() {
        return this.getAttribute("data");
    }
    set data(val) {
        this.setAttribute("data", val);
    }
    resize(width) {
        $(this._selectElement).combobox('resize', width);
    }
    disable() {
        $(this._selectElement).combobox('disable');
    }
    enable() {
        $(this._selectElement).combobox('enable');
    }
    getText() {
        var obj = this.get("obj");
        return obj ? obj[this.textfield] : "";
    }
    loadDatastring(data) {
        if (data) {
            var objs = [];
            var array = data.split(',');
            var element = this;
            $(array).each(function () {
                if (this.length > 0) {
                    var obj = {};
                    var arr = this.split('_');
                    obj[element.valuefield] = arr[0];
                    obj[element.textfield] = arr[1];
                    obj["color"] = arr[2];
                    obj["permissioncode"] = arr[3];
                    obj["description"] = arr[4];
                    objs.push(obj);
                }
            });
            this.loadData(objs);
        }
    }
    loadData(data) {
        if (this.isString(data)) {
            data = this.stringToObject(data);
        }
        for (var item of data) {
            if (item.id === this.getValue()) {
                this.set("obj", item);
            }
        }
        if (this.defaultoption) {
            var obj = {};
            obj[this.valuefield] = "";
            obj[this.textfield] = this.defaultoption;
            obj["permissioncode"] = "11111";
            data.unshift(obj);
        }
        this.set("items", data);
    }
    getObject() {
        return this.get("obj");
    }
    setObject(obj) {
        if (!obj || !obj[this.valuefield]) {
            obj = {};
            obj['klass'] = '';
            obj[this.textfield] = '';
            obj[this.valuefield] = '';
            obj.permissioncode = '11111';
        }
        if (!obj.permissioncode) {
            obj[this.textfield] = '无发现权';
        }
        else if (obj.permissioncode === "-1") {
            obj[this.textfield] = '该对象不存在';
        }
        else if (obj.permissioncode[0] === "0") {
            obj[this.textfield] = '无发现权';
        }
        this.set("obj", obj);
        $(this._valueInput).val(JSON.stringify(obj));
        $(this._selectElement).combobox('setValue', obj[this.valuefield]);
    }
    onSetValue(value) {
        if (value) {
            if (window["isString"](value)) {
                var obj = this.stringToObject(value);
                this.setObject(obj);
            }
            else {
                this.setObject(value);
            }
        }
        else {
            this.setObject(null);
        }
    }
    setReadOnly(readonly) {
    }
    parseToObject(value) {
        var obj = {};
        obj[this.textfield] = '';
        obj[this.valuefield] = '';
        if (value) {
            if (window["isString"](value)) {
                obj = this.stringToObject(value);
            }
            else {
                obj = value;
            }
        }
        return obj;
    }
    /**
     * 创建后事件
     */
    created() {
        super.created();
        var element = this;
        element.addHook(EventNames.BeforeInit, function (event) {
            if (element.data) {
                element.loadDatastring(element.data);
            }
            else {
                if (element.source) {
                    element.ajax({
                        sync: true,
                        url: ComponentRoot.APIs.getListValues,
                        data: { listid: element.source },
                        success: function (result) {
                            element.loadDatastring(result.Data);
                        }
                    });
                }
            }
        });
    }
}
ListPropertyView.elementName = "Gf-ListPropertyView".toLowerCase();
ListPropertyView.register();
class ListPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var wrapper = this.getWrapper();
        var display = super.onRender();
        var value = wrapper.getText();
        $(display).html(value);
        return display;
    }
}
class ListPropertyViewEdit extends BasePropertyViewEdit {
    constructor() {
        super(...arguments);
        this.isRendered = false;
    }
    onRender() {
        var stateObj = this;
        var element = this.getWrapper();
        var span = super.onRender();
        $(span).hide();
        var select = document.createElement("select");
        span.appendChild(select);
        element.selectElement = select;
        var valueInput = document.createElement("input");
        $(valueInput).attr("type", "hidden");
        $(valueInput).attr("name", $(element).attr("name"));
        span.appendChild(valueInput);
        element.valueInput = valueInput;
        $(select).combobox({
            valueField: element.valuefield,
            textField: element.textfield,
            width: element.width || 170,
            height: element.height || 26,
            editable: false,
            onChange: function (newValue, oldValue) {
            },
            formatter: function (row) {
                var opts = $(this).combobox('options');
                return `<span style="width:100%; height: 100%;display:block;" title="` + row[`description`] + `">` + row[opts.textField] + '</span>';
            },
            onSelect: function (record) {
                if (!stateObj.isRendered) {
                    return;
                }
                var obj = element.getObject();
                if (!obj || record[element.valuefield] != obj[element.valuefield]) {
                    element.setObject(record);
                    element.fireValueChange(obj[element.valuefield], record[element.valuefield]);
                }
            }
        });
        $(element.selectElement).combobox('loadData', element.items);
        element.setObject(element.getObject());
        stateObj.isRendered = true;
        return span;
    }
}
/// <reference path="BasePropertyView.ts" />
/** MD5属性组件 */
class MD5PropertyView extends BasePropertyView {
    constructor() {
        super();
    }
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
    createComponentBrowseState() {
        return new MD5PropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new MD5PropertyViewEdit(this);
    }
    onSetValue(value) {
        $(this.input).val(value);
        $(this.passwordbox).passwordbox('setValue', value);
    }
    disable() {
        $(this.passwordbox).passwordbox('disable');
    }
    enable() {
        $(this.passwordbox).passwordbox('enable');
    }
    resize(width) {
        $(this.passwordbox).passwordbox('resize', width);
    }
    //public setDisplay() {
    //    $(this._browseContent).html('******');
    //}
    focus() {
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
    setReadOnly(readonly) {
        $(this.input).textbox('readonly', readonly);
    }
}
MD5PropertyView.elementName = "Gf-MD5PropertyView".toLowerCase();
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
        var wrapper = this.getWrapper();
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
        var wrapper = this.getWrapper();
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
/// <reference path="BasePropertyView.ts" />
/** 对象属性组件 */
class ObjektPropertyView extends BasePropertyView {
    constructor() {
        super();
        this.emptyValue = null;
    }
    createComponentBrowseState() {
        return new ObjektPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new ObjektPropertyViewEdit(this);
    }
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
    get href() {
        return this.getAttribute("href");
    }
    set href(val) {
        this.setAttribute("href", val);
    }
    /** id属性名称 */
    get idfield() {
        return this.getAttribute("idfield") || PropertyNames.id;
    }
    set idfield(val) {
        this.setAttribute("idfield", val);
    }
    /** 标签属性名称 */
    get namefield() {
        return this.getAttribute("namefield") || PropertyNames.combinedLabel;
    }
    set namefield(val) {
        this.setAttribute("namefield", val);
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** 是否禁止编辑 */
    get forbidEdit() {
        return this.safeToString(this.getAttribute("forbidEdit")).toLowerCase() == "true";
    }
    set forbidEdit(val) {
        this.setAttribute("forbidEdit", val.toString());
    }
    /** 是否禁止清除 */
    get forbidClear() {
        return this.safeToString(this.getAttribute("forbidClear")).toLowerCase() == "true";
    }
    set forbidClear(val) {
        this.setAttribute("forbidClear", val.toString());
    }
    /** 是否禁止打开 */
    get forbidOpen() {
        return this.safeToString(this.getAttribute("forbidOpen")).toLowerCase() == "true";
    }
    set forbidOpen(val) {
        this.setAttribute("forbidOpen", val.toString());
    }
    resize(width) {
        this.nameinput.resize(width - 52);
    }
    setReadOnly(readonly) {
    }
    getObject() {
        return this._obj;
    }
    setObject(obj) {
        if (!obj || !obj[this.idfield]) {
            obj = {};
            obj['klass'] = this.klass;
            obj['title'] = '';
            obj[this.namefield] = '';
            obj[this.idfield] = '';
            obj.permissioncode = '11111';
        }
        var browser = this._browser;
        var name = obj[this.namefield];
        if (!obj.permissioncode) {
            this.forbidOpen = true;
            obj[this.namefield] = '无发现权';
            name = "<span class='fa fa-exclamation-circle'></span>无发现权";
        }
        else if (obj.permissioncode === "-1") {
            this.forbidOpen = true;
            obj[this.namefield] = '该对象不存在';
            name = "<span class='fa fa-exclamation-circle'></span>该对象不存在";
        }
        else if (obj.permissioncode[0] === "0") {
            this.forbidOpen = true;
            obj[this.namefield] = '无发现权';
            name = "<span class='fa fa-exclamation-circle'></span>无发现权";
        }
        else if (obj.permissioncode[1] === "0") {
            this.forbidOpen = true;
        }
        $(browser).html(name);
        if (obj[this.namefield] === "") {
            obj[this.namefield] = obj[this.idfield];
        }
        this._obj = obj;
        this.nameinput["setValue"](obj[this.namefield]);
    }
    open() {
        var ObjectSelector = this;
        var href = this.href || ComponentRoot.APIs.selectObjekt;
        var dialog = this.get('SelectDialog');
        if (!this._loaded) {
            this.openSelector();
            this._loaded = true;
        }
        dialog.open();
    }
    close() {
        this.get('SelectDialog').close();
    }
    ;
    attributeChanged(attrName, oldValue, newValue) {
        super.attributeChanged(attrName, oldValue, newValue);
        if (attrName === "forbidOpen" && newValue === "") {
            var browser = this._browser;
            $(browser).css("text-decoration", "none");
            $(browser).unbind();
        }
    }
    onSetValue(value) {
        var element = this;
        if (value) {
            var obj = this.getObjektData([value]).get(value);
            element.setObject(obj);
        }
        else {
            element.setObject(null);
        }
    }
    getKlassMeta() {
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
    openSelector() {
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
    buildSelectDialog() {
        var element = this;
        var dialog = new Dialog();
        dialog.width = "800";
        dialog.height = "460";
        dialog.modal = true;
        dialog.title = '选择“' + element.klass + '”对象';
        dialog.init();
        element.set("SelectDialog", dialog);
        /*创建按钮*/
        this.buildSelectDialogButtons();
    }
    buildSelectDialogButtons() {
        var element = this;
        var sure = this.createButton("确定", "fa fa-check", function () {
            var grid = $(element.get("SelectDialog").div).find("Gf-ObjektCollectionView")[0];
            var row = grid.getSelectedRow();
            grid.endEditRows();
            if (grid.haschange) {
                $.messager.alert('提示', '请保存数据后再选择！');
            }
            else if (!row) {
                $.messager.alert('提示', '请至少选择一条数据！');
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
    created() {
        super.created();
        this.addHook(EventNames.BeforeInit, () => {
            var value = this.getValue();
            if (value) {
                this._obj = this.getObjektData([value]).get(value);
            }
        });
    }
}
ObjektPropertyView.elementName = "Gf-ObjektPropertyView".toLowerCase();
ObjektPropertyView.register();
class ObjektPropertyViewBrowse extends StringPropertyViewBrowse {
    onRender() {
        var element = this.getWrapper();
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
        }
        else {
            $(browser).html(obj[element.namefield]);
        }
        $(display).html(browser);
        return display;
    }
}
class ObjektPropertyViewEdit extends StringPropertyViewEdit {
    onRender() {
        var element = this.getWrapper();
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
        }
        else {
            nameinput.setValue(obj[element.namefield]);
        }
        //存值隐藏域
        var valueinput = document.createElement("input");
        $(valueinput).attr("type", "hidden");
        $(valueinput).attr("name", $(element).attr("name"));
        element.valueinput = valueinput;
        span.appendChild(valueinput);
        //创建按钮方法
        var createButton = function (name, icon, func) {
            var button = document.createElement("Button");
            $(button).attr("type", "button");
            $(button).addClass("clean-gray");
            $(button).css("height", parseInt(element.height || "24") - 2);
            $(button).html("<i class='" + icon + "'></i>");
            $(button).click(function (e) {
                e.stopPropagation();
                func();
            });
            name = button;
            span.appendChild(button);
        };
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
/// <reference path="../UIComponentBase.ts" />
/** 对象属性视图适配器 */
class ObjektPropertyViewAdapter extends UIComponentBase {
    constructor() {
        super();
    }
    /** return null不区分状态 */
    createComponentEditState() {
        return null;
    }
    /** return null不区分状态 */
    createComponentBrowseState() {
        return null;
    }
    /** 对象ID */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }
    /** 属性名称 */
    get propertyName() {
        return this.getAttribute("propertyName");
    }
    set propertyName(val) {
        this.setAttribute("propertyName", val);
    }
    /** 参数 */
    get options() {
        return this.getAttribute("options");
    }
    set options(val) {
        this.setAttribute("options", val);
    }
    /**
     * 根据数据类型构造具体数据类型的XxxPropertyView实例赋值到propertyView (getObjektData(objektId).Klass.getProperty(propertyName).dataType);并且propertyView.onRender()
     */
    onRender() {
        var elementOptions = this.getElementOptions();
        if (!elementOptions.elementName) {
            return document.createElement("pre");
        }
        var element = document.createElement(elementOptions.elementName);
        for (var name in elementOptions) {
            if (name != "elementName") {
                element[name] = elementOptions[name];
            }
        }
        element.objektId = this.objektId;
        element.propertyName = this.propertyName;
        this.propertyView = element;
        return element;
    }
    getElementOptions() {
        if (this.options) {
            return JSON.parse(this.options);
        }
        var view = this;
        var options;
        view.ajax({
            sync: true,
            url: ComponentRoot.APIs.getPropertyViewOption,
            data: { objektId: view.objektId, propertyName: view.propertyName },
            success: function (result) {
                options = JSON.parse(result.Data);
            }
        });
        return options;
    }
}
ObjektPropertyViewAdapter.elementName = "Gf-ObjektPropertyViewAdapter".toLowerCase();
ObjektPropertyViewAdapter.register();
/// <reference path="StringPropertyView.ts" />
/** 【富文本属性组件】 */
class RichContentPropertyView extends StringPropertyView {
    constructor() {
        super();
    }
    /**  */
    get richinput() {
        return this._richinput;
    }
    set richinput(val) {
        this._richinput = val;
    }
    createComponentBrowseState() {
        return new RichContentPropertyViewBrowse(this);
    }
    createComponentEditState() {
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
    setResize_enabled(resize_enabled) {
        CKEDITOR.instances[this.richinput.id].config.setresize_enabled = resize_enabled;
    }
    setHeight(offsetHeight) {
        CKEDITOR.instances[this.richinput.id].resize(CKEDITOR.instances[this.richinput.id].container.getStyle('width') - 5, offsetHeight - 31);
    }
    setToolbar(toolbar) {
        CKEDITOR.instances[this.richinput.id].config.toolbar = toolbar;
    }
    ;
    //public setDisplay() {
    //    var value = this.getValue();
    //    //$(display).html(this.addAppPath(value));
    //    $(this._browseContent).html(this.addAppPath(value));
    //}
    addAppPath(value) {
        var text = this.safeToString(value);
        while (text.indexOf('~/file?id=') >= 0) {
            text = text.replace('~/file?id=', document.body["apppath"] + 'file?id=');
        }
        return text;
    }
    removeAppPath(value) {
        return this.safeToString(value).replace(new RegExp(document.body["apppath"] + '/file?id=', 'gm'), '~/file?id=');
    }
    insertHtml(value) {
        CKEDITOR.instances[this.richinput.id].insertHtml(value);
    }
    innerSetValue(value) {
        //var input = this.input;
        value = this.addAppPath(value);
        if (CKEDITOR.instances[this.richinput.id]) {
            CKEDITOR.instances[this.richinput.id].setData(value);
        }
        else {
            $(this.richinput).val(value);
        }
    }
    stateChanged() {
        var element = this;
        if (element.state == UIState.edit && !element.get("editor")) {
        }
        //super.stateChanged();
    }
}
RichContentPropertyView.elementName = 'gf-richcontentpropertyview';
RichContentPropertyView.register();
class RichContentPropertyViewBrowse extends BasePropertyViewBrowse {
    onRender() {
        var span = super.onRender();
        var wrapper = this.getWrapper();
        var value = wrapper.getValue();
        span.innerHTML = wrapper.addAppPath(value);
        return span;
    }
}
class RichContentPropertyViewEdit extends BasePropertyViewEdit {
    setReadOnly(readonly) {
        var wrapper = this.getWrapper();
        CKEDITOR.instances[wrapper.richinput.id].config.readOnly = readonly;
    }
    onRender() {
        var wrapper = this.getWrapper();
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
        var wrapper = this.getWrapper();
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
/// <reference path="BasePropertyView.ts" />
/** 源码文本属性组件 */
class SourceCodePropertyView extends BasePropertyView {
    constructor() {
        super();
    }
    /** 源码文本属性组件 */
    get aceeditor() {
        return this._aceeditor;
    }
    set aceeditor(val) {
        this._aceeditor = val;
    }
    onRecievedMessage(message, source) {
        if (message instanceof UIMessageStateSwitched) {
            var StateSwitched = message;
            if (StateSwitched.currentState = UIState.edit) {
                this.setReadOnly(false);
            }
            else {
                this.setReadOnly(true);
            }
        }
    }
    onRender() {
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
        $(div).addClass("GfSourceCodePropertyView");
        //element.appendChild(div);
        var pre = document.createElement("pre");
        pre.id = this.getUniqueId("AceEditor");
        $(pre).attr("name", $(element).attr("name"));
        pre.innerHTML = window["htmlEncode"](element.value);
        div.appendChild(pre);
        element.set("pre", pre);
        return div;
    }
    afterRender() {
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
    getValue() {
        if (this._aceeditor)
            return this._aceeditor.getValue();
        else
            return "";
    }
    /**
     * 内部设值（在外部设值方法setValue中回调）
     * @param value 值
     */
    onSetValue(value) {
    }
    /**
     * 初始化内容
     */
    initContent() {
    }
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    setReadOnly(readonly) {
        this._aceeditor.setReadOnly(true);
    }
    /**
     * 禁用组件
     */
    disable() {
        this._aceeditor.attr("disabled", true);
    }
    /**
     * 启用组件
     */
    enable() {
        this._aceeditor.attr("disabled", false);
    }
}
/** 组件标签名称 */
SourceCodePropertyView.elementName = "gf-sourcecodepropertyview";
SourceCodePropertyView.register();
/// <reference path="StringPropertyView.ts" />
/** 文本属性组件 */
class TextPropertyView extends StringPropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new TextPropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new TextPropertyViewEdit(this);
    }
    onSetValue(value) {
        $(this.input).textbox('setValue', this.replaceEditWrapMark(value));
    }
    /**
     * 替换展示区域换行符
     * @param text 待替换的文本
     */
    replaceDisplayWrapMark(text) {
        var value = this.safeToString(text).replace(new RegExp('\r\n', 'gm'), '<br>');
        value = value.replace(new RegExp('\n', 'gm'), '<br>');
        return value;
    }
    /**
     * 替换编辑区域换行符
     * @param text 待替换的文本
     */
    replaceEditWrapMark(text) {
        return this.safeToString(text).replace(new RegExp('<br>', 'gm'), '\r\n');
    }
}
TextPropertyView.elementName = "Gf-TextPropertyView".toLowerCase();
TextPropertyView.register();
class TextPropertyViewBrowse extends StringPropertyViewBrowse {
    onRender() {
        var wrapper = this.getWrapper();
        var display = super.onRender();
        var value = wrapper.replaceDisplayWrapMark(wrapper.getValue());
        $(display).html(value);
        return display;
    }
}
class TextPropertyViewEdit extends StringPropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var span = super.onRender();
        $(wrapper.input).textbox({
            multiline: true,
            width: wrapper.width || 550,
            height: wrapper.height || 100
        });
        return span;
    }
}
/// <reference path="StringPropertyView.ts" />
/** 时间属性组件 */
class TimePropertyView extends StringPropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new TimePropertyViewBrowse(this);
    }
    createComponentEditState() {
        return new TimePropertyViewEdit(this);
    }
}
TimePropertyView.elementName = "Gf-TimePropertyView".toLowerCase();
TimePropertyView.register();
class TimePropertyViewBrowse extends StringPropertyViewBrowse {
}
class TimePropertyViewEdit extends StringPropertyViewEdit {
    onRender() {
        var wrapper = this.getWrapper();
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.value);
        wrapper.input = input;
        var span = document.createElement("span");
        $(span).hide();
        $(span).click(function (e) {
            e.stopPropagation();
        });
        span.appendChild(input);
        $(input).timespinner({
            value: wrapper.getValue(),
            width: wrapper.width || 170,
            height: wrapper.height || 22,
            showSeconds: true,
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });
        return span;
    }
}
/// <reference path="BasePropertyView.ts" />
////【视图模型编辑组件】
class ViewModelContentPropertyView extends BasePropertyView {
    constructor() {
        super();
    }
    createComponentBrowseState() {
        return new ViewModelContentPropertyViewBrowse(this);
    }
    createComponentEditState() {
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
    onSetValue(value) {
    }
    /**
     * 设值是否只读
     * @param readonly 是否只读
     */
    setReadOnly(readonly) {
    }
}
/** 组件标签名称 */
ViewModelContentPropertyView.elementName = "Gf-ViewModelContentPropertyView".toLowerCase();
ViewModelContentPropertyView.register();
class ViewModelContentPropertyViewBrowse extends BasePropertyViewBrowse {
    /**  */
    get input() {
        return this._input;
    }
    set input(val) {
        this._input = val;
    }
    onRender() {
        var wrapper = this.getWrapper();
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
        var wrapper = this.getWrapper();
        var config = {
            toolbar: 'None',
            filebrowserBrowseUrl: wrapper.filebrowserBrowseUrl || "",
            filebrowserUploadUrl: wrapper.filebrowserUploadUrl || wrapper.applicationPath + "/CkEditor/CkeditorUpload",
            width: "675px",
            height: "300px",
            toolbarLocation: 'none',
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
    get div() {
        return this._div;
    }
    set div(val) {
        this._div = val;
    }
    /** layout */
    get layout() {
        return this._layout;
    }
    set layout(val) {
        this._layout = val;
    }
    /** divtabs */
    get divtabs() {
        return this._divtabs;
    }
    set divtabs(val) {
        this._divtabs = val;
    }
    /** floweditor */
    get floweditor() {
        return this._floweditor;
    }
    set floweditor(val) {
        this._floweditor = val;
    }
    /** customeditor */
    get customeditor() {
        return this._customeditor;
    }
    set customeditor(val) {
        this._customeditor = val;
    }
    /** selecteditor */
    get selecteditor() {
        return this._selecteditor;
    }
    set selecteditor(val) {
        this._selecteditor = val;
    }
    onRender() {
        var wrapper = this.getWrapper();
        var div = document.createElement("div");
        $(div).addClass("GfViewModel");
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
        var wrapper = this.getWrapper();
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
                }
                else if (title == "自定义布局") {
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
                }
                else {
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
        if (!wrapper.layouttype) {
            wrapper.layouttype = "customlayout";
            this.selecteditor = customeditor;
            $(this.divtabs).tabs("select", 2);
        }
        this.setEdit();
    }
    setEdit() {
        var control = this;
        var wrapper = this.getWrapper();
        var west = $(control.layout).find('.layout-panel-west').find('.layout-body');
        if (control.div) {
            $(west).width(200);
            $(control.layout).layout("resize", {
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
                            }
                            else if (node.id.indexOf("@ObjektCollectionView") > -1) {
                                control.selecteditor.insertHtml("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\" id=\"DATA_1502437208833\" img_type=\"date\" name=\"DATA_1502437208833\" parentid=\"" + node.parentId + "\" pathname=\"" + node.pathname + "\" src=\"" + document.body["apppath"] + "/Platform/Content/Scripts/ckeditor/plugins/xd_view/view.jpg\" style=\"height:110px;width:110px;\" value=\"" + node.text + "\" viewid=\"" + node.id + "\" viewname=\"" + node.name + "\" />");
                            }
                            else if (node.id.indexOf("@ObjektCollectionView") > -1) {
                                control.selecteditor.insertHtml("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\" id=\"DATA_1502437208833\" img_type=\"date\" name=\"DATA_1502437208833\" parentid=\"" + node.parentId + "\" pathname=\"" + node.pathname + "\" src=\"" + document.body["apppath"] + "/Platform/Content/Scripts/ckeditor/plugins/xd_view/view.jpg\" style=\"height:110px;width:110px;\" value=\"" + node.text + "\" viewid=\"" + node.id + "\" viewname=\"" + node.name + "\" />");
                            }
                            else if (node.id.indexOf("@Property") > -1) {
                                var id = wrapper.getUniqueId(node.name);
                                control.selecteditor.insertHtml("<input element_type=\"xd_property\" align=\"absMiddle\" class=\"AUTO\" datafld=\"SYS_DATE_CN\"  id=\"" + id + "\" input_type=\"property\" name=\"DATA_1501643216318\" style=\"font-size:12px;width:133px;\" parentid=\"" + node.parentId + "\"  pathname=\"" + node.pathname + "\"   propertyid=\"" + node.id + "\" propertyname=\"" + node.name + "\" value=\"" + node.text + "\" />");
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
/// <reference path="../UIComponentBase.ts" />
//【对象明细视图】
class ObjektContentView extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** 对象Id */
    get objektid() {
        return this.getAttribute("objektid");
    }
    set objektid(val) {
        this.setAttribute("objektid", val);
    }
    /** 左边宽 */
    get leftwidth() {
        return this.getAttribute("leftwidth");
    }
    set leftwidth(val) {
        this.setAttribute("leftwidth", val);
    }
    /** div */
    get div() {
        return this._div;
    }
    set div(val) {
        this._div = val;
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        this.isMessageBoundary = false;
        var element = this;
        var div = document.createElement("div");
        element.div = div;
        return div;
    }
    afterRender() {
        var control = this;
        var objektcontentview = Hooks.createComponent(CreateObjektContentViewHookImpl, new HookContext(this));
        ;
        if (objektcontentview != null && objektcontentview != "") {
            //control.div.appendChild(objektcontentview);
        }
        else {
            //默认布局视图
            control.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: control.klass, objektid: control.objektid, viewtype: "ObjektCustomFormView" },
                success: function (result) {
                    var obj = JSON.parse(result.Data);
                    var customviewcount = 0;
                    if ("viewtype" in obj) {
                        for (var viewobj in obj) {
                            var view = obj[viewobj];
                            if (view.ishidden == "false") {
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                    if (customviewcount == 0) {
                        //自定义表单视图
                        var toolbar = document.createElement("Gf-ToolBar");
                        var layout = document.createElement("div");
                        control.div.appendChild(layout);
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
                            width: control.leftwidth || 500,
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
                        $(north).css("border-bottom", "1px solid lightgray");
                        $(north).append(toolbar);
                        $(control.div).css("width", "100%");
                        $(control.div).css("height", "100%");
                        var objektpropertycollectionview = document.createElement("Gf-ObjektPropertyCollectionView"); //对象属性内容视图
                        objektpropertycollectionview.objektid = control.objektid || "";
                        objektpropertycollectionview.klass = control.klass;
                        var objektroctabview = document.createElement("Gf-ObjektRocTabView"); //对象关联列表视图
                        objektroctabview.objektid = control.objektid || "";
                        objektroctabview.klass = control.klass;
                        if (obj.roccnames.length == 0) {
                            center.html("");
                            center.removeClass("panel-noscroll");
                            center.append(objektpropertycollectionview);
                            $(layout).layout("remove", "west");
                            $(layout).layout("remove", "south");
                        }
                        else {
                            if (obj.viewLayout == 'Vertical') {
                                south.addClass("panel-noscroll");
                                center.html("");
                                center.append(objektpropertycollectionview);
                                center.removeClass("panel-noscroll");
                                $(layout).layout("remove", "west");
                            }
                            else {
                                $(layout).layout("remove", "south");
                                west.append(objektpropertycollectionview);
                                center.append(objektroctabview);
                            }
                        }
                    }
                }
            });
        }
    }
}
ObjektContentView.elementName = "Gf-ObjektContentView".toLowerCase();
ObjektContentView.register();
/// <reference path="../UIComponentBase.ts" />
//【对象默认容器视图】
class ObjektDefaultPanelView extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** 对象Id */
    get objektid() {
        return this.getAttribute("objektid");
    }
    set objektid(val) {
        this.setAttribute("objektid", val);
    }
    /** 左边宽 */
    get leftwidth() {
        return this.getAttribute("leftwidth");
    }
    set leftwidth(val) {
        this.setAttribute("leftwidth", val);
    }
    /** div */
    get div() {
        return this._div;
    }
    set div(val) {
        this._div = val;
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        this.isMessageBoundary = false;
        var element = this;
        var div = document.createElement("div");
        element.div = div;
        return div;
    }
    afterRender() {
        var control = this;
        var objektcontentview = Hooks.createComponent(CreateObjektContentViewHook, new HookContext(this));
        ;
        if (objektcontentview != null && objektcontentview != "") {
            control.div.appendChild(objektcontentview);
        }
        else {
            //默认布局视图
            control.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: control.klass, objektid: control.objektid, viewtype: "ObjektCustomFormView" },
                success: function (result) {
                    var obj = JSON.parse(result.Data);
                    var customviewcount = 0;
                    if ("viewtype" in obj) {
                        for (var viewobj in obj) {
                            var view = obj[viewobj];
                            if (view.ishidden == "false") {
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                    if (customviewcount == 0) {
                        //自定义表单视图
                        var toolbar = document.createElement("Gf-ToolBar");
                        var layout = document.createElement("div");
                        control.div.appendChild(layout);
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
                            width: control.leftwidth || 500,
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
                        $(north).css("border-bottom", "1px solid lightgray");
                        $(north).append(toolbar);
                        $(control.div).css("width", "100%");
                        $(control.div).css("height", "100%");
                        var objektpropertycollectionview = document.createElement("Gf-ObjektPropertyCollectionView"); //对象属性内容视图
                        objektpropertycollectionview.objektid = control.objektid || "";
                        objektpropertycollectionview.klass = control.klass;
                        var objektroctabview = document.createElement("Gf-ObjektRocTabView"); //对象关联列表视图
                        objektroctabview.objektid = control.objektid || "";
                        objektroctabview.klass = control.klass;
                        if (obj.roccnames.length == 0) {
                            center.html("");
                            center.removeClass("panel-noscroll");
                            center.append(objektpropertycollectionview);
                            $(layout).layout("remove", "west");
                            $(layout).layout("remove", "south");
                        }
                        else {
                            if (obj.viewLayout == 'Vertical') {
                                south.addClass("panel-noscroll");
                                center.html("");
                                center.append(objektpropertycollectionview);
                                center.removeClass("panel-noscroll");
                                $(layout).layout("remove", "west");
                            }
                            else {
                                $(layout).layout("remove", "south");
                                west.append(objektpropertycollectionview);
                                //center.append(objektroctabview);
                            }
                        }
                    }
                }
            });
        }
    }
}
ObjektDefaultPanelView.elementName = "Gf-ObjektDefaultPanelView".toLowerCase();
ObjektDefaultPanelView.register();
/// <reference path="../UIComponentBase.ts" />
//【对象视图】
class ObjektPropertyCollectionView extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** objektid */
    get objektid() {
        return this.getAttribute("objektid");
    }
    set objektid(val) {
        this.setAttribute("objektid", val);
    }
    /** div */
    get div() {
        return this._div;
    }
    set div(val) {
        this._div = val;
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var div = document.createElement("div");
        this.div = div;
        return div;
    }
    afterRender() {
        var control = this;
        var objektpropertycollectionview = Hooks.createComponent(CreateObjektPropertyCollectionViewImpl, new HookContext(this));
        ;
        if (objektpropertycollectionview != null && objektpropertycollectionview != "") {
        }
        else {
            control.ajax({
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: control.klass, objektid: control.objektid, viewtype: "ObjektDetailView" },
                success: function (result) {
                    var obj = JSON.parse(result.Data);
                    control.set("ServerObjekt", obj);
                    var div = control.get("div");
                    var customviewcount = 0;
                    var viewid = "";
                    if ("viewtype" in obj) {
                        //自定义对象内容视图
                        for (var viewobj in obj) {
                            var view = obj[viewobj];
                            if (view.ishidden == "false") {
                                viewid = view['viewid'];
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                    if (customviewcount > 0) {
                        if (customviewcount == 1) {
                            var viewmodel = document.createElement("gf-viewmodel");
                            viewmodel["objektid"] = control.objektid;
                            viewmodel["viewid"] = viewid;
                            div.appendChild(viewmodel);
                        }
                        else {
                            var tab = document.createElement("Gf-Tabs");
                            tab["lazyload"] = true;
                            tab["fit"] = true;
                            div.appendChild(tab);
                            tab["closeAll"]();
                            for (var viewobj in obj) {
                                var view = obj[viewobj];
                                if (view.ishidden == "false") {
                                    viewid = view['viewid'];
                                    var viewname = view['viewname'];
                                    var id = control.getUniqueId(control.klass);
                                    var href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView" + "?objektid=" + control.objektid + "&viewid=" + viewid;
                                    tab["add"](id, viewname, href, "", false);
                                    customviewcount = customviewcount + 1;
                                }
                            }
                            tab["select"](0);
                        }
                    }
                    else {
                        $(control.div).empty();
                        //默认对象内容视图
                        var table = document.createElement("table");
                        $(table).addClass("ObjektDefaultView");
                        var inputs = [];
                        for (var propertyname in obj) {
                            var property = obj[propertyname];
                            if (property.ishidden == "false") {
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
                                    ui['objektId'] = property['objektId'];
                                    ui['propertyName'] = property['propertyName'];
                                    ui['width'] = property['width'];
                                    ui['height'] = property['height'];
                                    ui['autosave'] = property['autosave'] == "true";
                                    ui['readonly'] = property['readonly'] == "true";
                                    ui['hidden'] = property['hidden'] == "true";
                                    ui['required'] = property['required'] == "true";
                                    ui['prec'] = property['prec'];
                                    ui['scale'] = property['scale'];
                                    if (elementname == 'Gf-ObjektPropertyView') {
                                        ui['href'] = property['href'];
                                        ui['klass'] = property['klass'];
                                    }
                                    else if (elementname == 'Gf-ListPropertyView') {
                                        ui['valuefield'] = property['valuefield'];
                                        ui['textfield'] = property['textfield'];
                                        ui['defaultoption'] = property['defaultoption'];
                                        ui['data'] = property['data'];
                                        if (property['value'] && property['value'].color) {
                                            $(td).css("background-color", "#" + property['value'].color);
                                        }
                                    }
                                    inputs.push(ui);
                                }
                                else {
                                    $(td).html(property['value']);
                                }
                            }
                        }
                        control.set("inputs", inputs);
                        control.div.appendChild(table);
                    }
                }
            });
        }
    }
}
ObjektPropertyCollectionView.elementName = "Gf-ObjektPropertyCollectionView".toLowerCase();
ObjektPropertyCollectionView.register();
/// <reference path="../UIComponentBase.ts" />
//【对象关联对象视图】
class ObjektRocTabView extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** 对象Id */
    get objektid() {
        return this.getAttribute("objektid");
    }
    set objektid(val) {
        this.setAttribute("objektid", val);
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        //this.isMessageBoundary = true;
        var element = this;
        var div = document.createElement("div");
        $(div).css("width", "100%");
        $(div).css("height", "100%");
        element.set("div", div);
        return div;
    }
    afterRender() {
        var control = this;
        control.ajax({
            url: ComponentRoot.APIs.getObjWithMeta,
            data: { id: control.objektid, klass: control.klass, dataTypeId: control.get("PropertyDataType") },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                control.set("ServerObjekt", obj);
                if (obj.roccnames.length > 0 && obj.viewLayout != 'Vertical') {
                    var div = control.get("div");
                    var tab = document.createElement("Gf-Tabs");
                    tab["fit"] = true;
                    tab["lazyload"] = true;
                    div.appendChild(tab);
                    tab["closeAll"]();
                    $(obj.roccnames).each(function () {
                        var klass = this.split('-')[0];
                        var title = this.split('-')[1];
                        var id = control.getUniqueId(klass);
                        var href = ComponentRoot.APIs.rocView + "?klass=" + klass + "&id=" + control.objektid + "&sourceKlass=" + control.klass;
                        //href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView?objektid=63c8fd5f5a094ae9bee8b3af1e1e7bda@Test&viewid=f4e5f307a2954403a8ab6430c173ca12@ObjektDetailView";
                        tab["add"](id, title, href, "", false);
                    });
                    tab["select"](0);
                }
            }
        });
    }
}
ObjektRocTabView.elementName = "Gf-ObjektRocTabView".toLowerCase();
ObjektRocTabView.register();
/// <reference path="../UIComponentBase.ts" />
//【对象视图】
class GfObjektView extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** 左边宽 */
    get leftwidth() {
        return this.getAttribute("leftwidth");
    }
    set leftwidth(val) {
        this.setAttribute("leftwidth", val);
    }
    /** 工具栏 */
    get toolbar() {
        return this.get("toolbar");
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        this.isMessageBoundary = true;
        var element = this;
        if (!element.state)
            element.state = UIState.browse; //"read";
        var div = document.createElement("div");
        element.set("div", div);
        return div;
    }
    afterRender() {
        var element = this;
        var div = element.get("div");
        var toolbar = document.createElement("Gf-ToolBar");
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
        var tab = document.createElement("Gf-Tabs");
        $(center).append(tab);
        element.set("tab", tab);
        this.buildPropertyControls(element, true);
    }
    buildPropertyControls(element, firstLoad) {
        var control = this;
        var change = element.get("changeObject");
        if (change && change["dataType"]) {
            var datatype = JSON.parse(change["dataType"]);
            element.set("PropertyDataType", datatype.id);
        }
        control.ajax({
            url: ComponentRoot.APIs.getObjWithMeta,
            data: { id: element.objektid, klass: element.klass, dataTypeId: element.get("PropertyDataType") },
            success: function (result) {
                var toolbar = element.get("toolbar");
                var tabid = element.get("tabid");
                var tab = element.get("tab");
                var layout = element.get("layout");
                var center = element.get("center");
                var west = element.get("west");
                var north = element.get("north");
                var south = element.get("south");
                var obj = JSON.parse(result.Data);
                element.set("ServerObjekt", obj);
                toolbar.selected = [
                    {
                        id: obj.id.value,
                        permission: obj.permission.value,
                        permissioncode: obj.permissioncode,
                        combinedtitle: obj.combinedtitle,
                        isTrash: obj.isTrash.value
                    }
                ];
                var table = document.createElement("table");
                $(table).addClass("ObjektView");
                var inputs = [];
                for (var propertyname in obj) {
                    var property = obj[propertyname];
                    if (property.ishidden == "false") {
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
                            ui['objektId'] = property['objektid'];
                            ui['propertyname'] = property['propertyname'];
                            ui['width'] = property['width'];
                            ui['height'] = property['height'];
                            //ui['state'] = property['state'];
                            ui['autosave'] = property['autosave'] == "true";
                            ui['readonly'] = property['readonly'] == "true";
                            ui['hidden'] = property['hidden'] == "true";
                            ui['required'] = property['required'] == "true";
                            ui['prec'] = property['prec'];
                            ui['scale'] = property['scale'];
                            if (elementname == 'Gf-ObjektPropertyView') {
                                ui['value'] = JSON.stringify(property['value']);
                                ui['idfield'] = property['idfield'];
                                ui['namefield'] = property['namefield'];
                                ui['href'] = property['href'];
                                ui['klass'] = property['klass'];
                            }
                            else if (elementname == 'Gf-ListPropertyView') {
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
                        $(tab).appendTo(south[0]);
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
                    //tab["init"]();
                    tab["closeAll"]();
                    $(obj.roccnames).each(function () {
                        var klass = this.split('-')[0];
                        var title = this.split('-')[1];
                        var id = control.getUniqueId(klass);
                        var href = ComponentRoot.APIs.rocView + "?klass=" + klass + "&id=" + element.objektid + "&sourceKlass=" + element.klass;
                        tab["add"](id, title, href, "", false);
                    });
                    tab.addEventListener("onLazyLoad", function (index) {
                        var subTab = tab["getTab"](index);
                        var grid = $(subTab).find("Gf-ObjektCollectionView")[0];
                        //if (grid && tab["state"] == "edit")
                        //grid.setState("edit");
                    });
                    tab.addEventListener("onStateChange", function () {
                        var tabs = tab["getAllTabs"]();
                        $(tabs).each(function () {
                            var grid = $(this).find("Gf-ObjektCollectionView")[0];
                            if (grid) {
                                //grid.setState(tab["state"]);
                            }
                        });
                    });
                    if (firstLoad) {
                        //element.registerEventHandler("onStateChange", function () {
                        //    if (element.state == "edit")
                        //        tab["setState"](element.state);
                        //});
                    }
                    //tab["setState"](element.state);
                    tab["select"](0);
                }
                //后处理
                for (var inputitem in inputs) {
                    //inputs[inputitem]["init"]();
                }
                $(element.get("layout")).layout("resize", { width: '100%', height: '100%' });
                //control.setState(element, element.state);
                if (firstLoad) {
                    $(inputs).each(function () {
                        var input = this;
                        if (change && input.propertyname in change) {
                            if (input.initcompleted)
                                input.setValue(change[input.name]);
                            //input.registerEventHandler("onafterinit", function () {
                            //    input.setValue(change[input.name]);
                            //});
                        }
                    });
                    // element.triggerEventHandler("oninitLoaded");
                }
            }
        });
    }
}
GfObjektView.elementName = "Gf-ObjektView".toLowerCase();
GfObjektView.register();
/// <reference path="../UIComponentBase.ts" />
/** 视图模型 */
class ViewModel extends UIComponentBase {
    constructor() {
        super();
    }
    createComponentEditState() {
        return null;
    }
    createComponentBrowseState() {
        return null;
    }
    /** 对象Id */
    get objektId() {
        return this.getAttribute("objektId");
    }
    set objektId(val) {
        this.setAttribute("objektId", val);
    }
    /** 视图Id */
    get viewid() {
        return this.getAttribute("viewid");
    }
    set viewid(val) {
        this.setAttribute("viewid", val);
    }
    /** 视图线 */
    get viewline() {
        return this.getAttribute("viewline");
    }
    set viewline(val) {
        this.setAttribute("viewline", val);
    }
    onRender() {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var control = this;
        if (!control.state)
            control.state = UIState.browse;
        var div = document.createElement("div");
        control.set("div", div);
        return div;
    }
    afterRender() {
        var control = this;
        control.ajax({
            url: "/GroupflyGroup.Platform.Web/Platform/GetView",
            data: { objektid: control.objektId, viewid: control.viewid, viewline: control.viewline },
            success: function (result) {
                var obj = JSON.parse(result.Data);
                var divview = document.createElement("div");
                $(divview).addClass("ViewModel");
                var html = obj.htmlview;
                var isflow = false;
                if (html.indexOf("<div name='flowlayout' style='display:none'>&nbsp;</div>") > -1) {
                    isflow = true;
                    html = html.replace(new RegExp("<p>", "gm"), "");
                    html = "<div>" + html.replace(new RegExp("</p>", "gm"), "") + "</div>";
                }
                html = html.replace("<div name='flowlayout' style='display:none'>&nbsp;</div>", "");
                html = html.replace("<div name='customeditor' style='display:none'>&nbsp;</div>", "");
                var htmlviewobj = $(html);
                var inputs = [];
                for (var propertyname in obj) {
                    var property = obj[propertyname];
                    if (property.ishidden == "false") {
                        var elementname = property['elementname'];
                        var uidiv = $(htmlviewobj).find("div[name='" + property['divname'] + "']");
                        if (isflow) {
                            uidiv.css("float", "left");
                        }
                        if (elementname && uidiv.length > 0) {
                            var ui = document.createElement(elementname);
                            uidiv[0].append(ui);
                            if (elementname == 'Gf-Calcu') {
                                ui['objektId'] = property['objektId'];
                                ui['formula'] = property['formula'];
                                ui['title'] = property['divname'];
                            }
                            else if (elementname == 'Gf-CalcProperty') {
                                ui['objektId'] = property['objektId'];
                                ui['formula'] = property['formula'];
                            }
                            else if (elementname == 'Gf-CalcComponent') {
                                ui['id'] = property['id'];
                                ui['formula'] = property['formula'];
                            }
                            else if (elementname == 'Gf-ViewModel') {
                                ui['objektId'] = property['objektId'];
                                ui['viewid'] = property['viewid'];
                                ui['viewline'] = property['viewline'];
                            }
                            else {
                                ui['id'] = property['id'];
                                ui['name'] = property['name'];
                                ui['label'] = property['label'];
                                ui['description'] = property['description'];
                                ui['filterid'] = property['filterid'];
                                ui['objektId'] = property['objektId'];
                                ui['propertyName'] = property['propertyName'];
                                ui['width'] = property['width'];
                                ui['height'] = property['height'];
                                ui['autosave'] = property['autosave'] == "true";
                                ui['readonly'] = property['readonly'] == "true";
                                ui['hidden'] = property['hidden'] == "true";
                                ui['required'] = property['required'] == "true";
                                ui['prec'] = property['prec'];
                                ui['scale'] = property['scale'];
                                if (elementname == 'Gf-ObjektPropertyView') {
                                    ui['value'] = JSON.stringify(property['value']);
                                    ui['idfield'] = property['idfield'];
                                    ui['namefield'] = property['namefield'];
                                    ui['href'] = property['href'];
                                    ui['klass'] = property['klass'];
                                }
                                else if (elementname == 'Gf-ListPropertyView') {
                                    ui['value'] = JSON.stringify(property['value']);
                                    ui['valuefield'] = property['valuefield'];
                                    ui['textfield'] = property['textfield'];
                                    ui['defaultoption'] = property['defaultoption'];
                                    ui['data'] = property['data'];
                                    if (property['value'] && property['value'].color) {
                                        uidiv.css("background-color", "#" + property['value'].color);
                                    }
                                }
                                else {
                                }
                            }
                            inputs.push(ui);
                        }
                        else {
                        }
                    }
                }
                $(divview).append(htmlviewobj);
                var div = control.get("div");
                div.appendChild(divview);
            }
        });
    }
}
ViewModel.elementName = "Gf-ViewModel".toLowerCase();
ViewModel.register();
/// <reference path="../UIComponentBase.ts" />
/** 对象集合视图 */
class ObjektCollectionView extends UIComponentBase {
    constructor() {
        super();
        /** 本地修改 */
        this._localChanges = new Map();
    }
    /** 保存数据api */
    get saveurl() {
        return this.getAttribute("saveurl");
    }
    set saveurl(val) {
        this.setAttribute("saveurl", val);
    }
    get outParams() {
        return this.get("outParams") || [];
    }
    /** 是否包含子类 */
    get hassubklass() {
        return this.safeToString(this.getAttribute("hassubklass")).toLowerCase() == 'true';
    }
    set hassubklass(val) {
        this.setAttribute("hassubklass", val.toString());
    }
    /** 是否禁止修改 */
    get forbidedit() {
        return this.safeToString(this.getAttribute("forbidedit")).toLowerCase() == 'true';
    }
    set forbidedit(val) {
        this.setAttribute("forbidedit", val.toString());
    }
    /** 是否回收站 */
    get trashstation() {
        return this.safeToString(this.getAttribute("trashstation")).toLowerCase() == 'true';
    }
    set trashstation(val) {
        this.setAttribute("trashstation", val.toString());
    }
    /** 排序（升序：asc，降序：desc） */
    get isasc() {
        return this.getAttribute("isasc");
    }
    set isasc(val) {
        this.setAttribute("isasc", val);
    }
    /** 是否分页 */
    get pagination() {
        return this.safeToString(this.getAttribute("pagination")).toLowerCase() == 'true';
    }
    set pagination(val) {
        this.setAttribute("pagination", val.toString());
    }
    /** 是否禁用放弃修改提示 */
    get forbidUpdateTip() {
        return this.safeToString(this.getAttribute("forbidUpdateTip")).toLowerCase() == 'true';
    }
    set forbidUpdateTip(val) {
        this.setAttribute("forbidUpdateTip", val.toString());
    }
    /** 是否默认显示查询条件 */
    get showquery() {
        return this.safeToString(this.getAttribute("showquery")).toLowerCase() == 'true';
    }
    set showquery(val) {
        this.setAttribute("showquery", val.toString());
    }
    /** 是否单选 */
    get singleselect() {
        return this.safeToString(this.getAttribute("singleselect")).toLowerCase() == 'true';
    }
    set singleselect(val) {
        this.setAttribute("singleselect", val.toString());
    }
    /** 是否自动查询 */
    get autoselect() {
        return this.safeToString(this.getAttribute("autoselect")).toLowerCase() == 'true';
    }
    set autoselect(val) {
        this.setAttribute("autoselect", val.toString());
    }
    /** 筛选器 */
    get filter() {
        return this.getAttribute("filter");
    }
    set filter(val) {
        this.setAttribute("filter", val);
    }
    /** 附加属性 */
    get relatedcolumns() {
        return this.getAttribute("relatedcolumns");
    }
    set relatedcolumns(val) {
        this.setAttribute("relatedcolumns", val);
    }
    /** 获取新对象api */
    get newrowurl() {
        return this.getAttribute("newrowurl");
    }
    set newrowurl(val) {
        this.setAttribute("newrowurl", val);
    }
    /** 导出数据api */
    get exporturl() {
        return this.getAttribute("exporturl");
    }
    set exporturl(val) {
        this.setAttribute("exporturl", val);
    }
    /** 获取数据api */
    get dataurl() {
        return this.getAttribute("dataurl");
    }
    set dataurl(val) {
        this.setAttribute("dataurl", val);
    }
    /** 排序属性名 */
    get orderby() {
        return this.getAttribute("orderby");
    }
    set orderby(val) {
        this.setAttribute("orderby", val);
    }
    /** name属性名称 */
    get namefield() {
        return this.getAttribute("namefield") || PropertyNames.combinedLabel;
    }
    set namefield(val) {
        this.setAttribute("namefield", val);
    }
    /** ID属性名称 */
    get idfield() {
        return this.getAttribute("idfield") || PropertyNames.id;
    }
    set idfield(val) {
        this.setAttribute("idfield", val);
    }
    /** 类名 */
    get klass() {
        return this.getAttribute("klass");
    }
    set klass(val) {
        this.setAttribute("klass", val);
    }
    /** 标题 */
    get title() {
        return this.getAttribute("title");
    }
    set title(val) {
        this.setAttribute("title", val);
    }
    /** 加载数据提示消息 */
    get loadmsg() {
        return this.getAttribute("loadmsg");
    }
    set loadmsg(val) {
        this.setAttribute("loadmsg", val);
    }
    /** 工具栏隐藏按钮 */
    get hidetools() {
        return this.getAttribute("hidetools");
    }
    set hidetools(val) {
        this.setAttribute("hidetools", val);
    }
    /** 工具栏 */
    get toolbar() {
        return this.get("toolbar");
    }
    onRecievedMessage(message, source) {
        if (message instanceof UIMessageExported) {
            this.exportExcel();
        }
        else if (message instanceof UIMessageShownQueryChanged) {
            var ShownQueryChanged = message;
            this.toggleQuery(ShownQueryChanged.isShowQuery);
        }
        else if (message instanceof UIMessageIncludeSubKlassChanged) {
            var IncludeSubKlassChanged = message;
            this.subclassChanged(IncludeSubKlassChanged.isIncludeSubKlass);
        }
        else if (message instanceof UIMessageRefreshed) {
            this.reload();
        }
        else if (message instanceof UIMessageObjektDeleted) {
            this.delObjekts();
        }
        else if (message instanceof UIMessageObjektCreated) {
            this.addNewRow();
        }
        else if (message instanceof UIMessageObjektOpend) {
            this.openObjekt();
        }
        else if (message instanceof UIMessageExported) {
            this.exportExcel();
        }
        else if (message instanceof UIMessageSaved) {
            this.reload();
        }
        super.onRecievedMessage(message, source);
    }
    /**
     * 添加行回调
     * @param eventHandler 回调函数
     */
    onAddRow(eventHandler) {
        this.addHook(EventNames.AddRow, eventHandler);
    }
    /**
     * 加载数据完成回调
     * @param eventHandler 回调函数
     */
    onLoadSuccess(eventHandler) {
        this.addHook(EventNames.LoadSuccess, eventHandler);
    }
    addNewRow(row) {
        if (!row) {
            row = this.getNewRow();
        }
        row.$ = ObjektState.Created;
        var rows = JSON.parse(this.get("data") || "[]");
        rows.push(row);
        this.set("data", JSON.stringify(rows));
        this.insertRow({ index: 0, row: row });
        this.refreshRowIndex();
        this.selectRow(0);
        this.unSelectRows(0);
        this.beginEditRow(0);
        this.fireHook(EventNames.AddRow, [row]);
    }
    beginEditRow(index) {
        var element = this;
        var inputs = $(this).find("[datagrid-row-index='" + index + "']").find("[isUIComponent='true']");
        inputs.each(function () {
            var component = this;
            if (!component.readonly) {
                var row = element.getRow(index);
                if (!component.createonly || (component.createonly && row.$ == ObjektState.Created)) {
                    component.state = UIState.edit;
                }
            }
        });
        $(this.get("table")).datagrid('fixRowHeight', index);
    }
    cancelEditRow(index) {
        $(this.get("table")).datagrid('cancelEdit', index);
    }
    cancelEditRows(index) {
        var rows = this.getRows();
        for (var key in rows) {
            var row = rows[key];
            if (row.editing) {
                var rowindex = this.getRowIndex(row);
                if (index != rowindex)
                    this.cancelEditRow(rowindex);
            }
        }
    }
    deleteRow(row) {
        var index = this.getRowIndex(row);
        $(this.get("table")).datagrid('deleteRow', index);
        this.recordDelete(row);
    }
    endEditRow(index) {
        $(this.get("table")).datagrid('endEdit', index);
    }
    endEditRows(index) {
        var validate = true;
        var element = this;
        var rows = this.getRows();
        for (var key in rows) {
            var row = rows[key];
            var rowindex = this.getRowIndex(row);
            if (index != rowindex) {
                if (element.validate(rowindex)) {
                    this.endEditRow(rowindex);
                }
                else {
                    validate = false;
                }
            }
        }
        return validate;
    }
    exportExcel() {
        var grid = this;
        var param = this.get("params") ? JSON.stringify(this.get("params")) : "";
        grid.ajax({
            url: grid.exporturl || ComponentRoot.APIs.listExport,
            data: { param: param, klass: grid.klass },
            success: function (result) {
                $(result.Data).table2excel({
                    exclude: ".noExl",
                    name: grid.klass,
                    filename: grid.klass
                });
            }
        });
    }
    getData() {
        return $(this.get("table")).datagrid('getData');
    }
    getOptions() {
        return $(this.get("table")).datagrid('options');
    }
    getSelectedRow() {
        return $(this.get("table")).datagrid('getSelected');
    }
    getSelectedRows() {
        return $(this.get("table")).datagrid('getSelections');
    }
    getPager() {
        return $(this.get("table")).datagrid('getPager');
    }
    getRows() {
        return $(this.get("table")).datagrid('getRows');
    }
    getRowIndex(row) {
        return $(this.get("table")).datagrid('getRowIndex', row);
    }
    getCellValue(id, field) {
        var rows = JSON.parse(this.get("data"));
        var value = "";
        $.map(rows, function (row, i) {
            if (row.id == id) {
                value = row[field];
            }
        });
        return value;
    }
    insertRow(obj) {
        $(this.get("table")).datagrid('insertRow', obj);
    }
    loadData(data) {
        $(this.get("table")).datagrid('loadData', data);
        this.restoreQueryState();
    }
    loadDataPage(page, rows) {
        var grid = this;
        if (page < 1)
            page = 1;
        grid.loading();
        this.set("currentPage", page);
        this.set("currentRows", rows);
        var orderby = this.get("orderby");
        var isAsc = this.get("isAsc");
        var param = (this.get("params") ? this.get("params").concat(this.outParams) : this.outParams);
        var istrash = { field: "isTrash", type: "=", value: grid.trashstation };
        var data = new QueryModel();
        data.pageIndex = page;
        data.pageSize = rows;
        data.param = param.concat(istrash);
        data.klass = grid.klass;
        data.includeSubKlass = grid.hassubklass;
        data.pageIndex = page;
        if (grid.relatedcolumns) {
            data.relatedProperties = grid.relatedcolumns;
        }
        if (grid.filter) {
            data.filter = grid.filter;
        }
        if (orderby) {
            data.orderBy = orderby;
            data.isAsc = isAsc;
        }
        grid.getObjektCollection(data, function (model) {
            var data = { total: model.total, rows: model.objekts };
            if (!grid.pagination) {
                var pageList = new Array();
                pageList.push(data.rows.length);
                $(grid.get("pager")).pagination({
                    pageSize: data.rows.length,
                    pageList: pageList
                });
                data.total = data.rows.length;
                grid.set("currentPage", 1);
                grid.set("currentRows", data.rows.length);
            }
            grid.set("data", JSON.stringify(data.rows));
            grid.loadData(data);
            grid.setModified(false);
            grid._localChanges.clear();
        }, function (result) {
            grid.loaded();
            grid.set("loaded", true);
            grid.setSelectedTip();
        });
    }
    loading() {
        $(this.get("table")).datagrid('loading');
    }
    loaded() {
        $(this.get("table")).datagrid('loaded');
    }
    queryData(outParams) {
        if (outParams) {
            this.set("outParams", outParams);
        }
        var params = new Array();
        var columns = this.get("columns")[0];
        $(columns).each(function () {
            if (!this.hidden && this.query) {
                var param = this.query["getValue"]();
                if (param) {
                    params.push(param);
                }
                this.param = param;
            }
        });
        this.set("params", params);
        this.select(1);
    }
    refreshRow(index) {
        $(this.get("table")).datagrid('refreshRow', index);
    }
    reload() {
        if (this.get("currentPage") && this.get("currentRows"))
            this.loadDataPage(this.get("currentPage"), this.get("currentRows"));
    }
    reloadstatic() {
        this.loadData(this.getData());
    }
    restoreQueryState() {
        var columns = this.get("columns")[0];
        $(columns).each(function () {
            if (!this.hidden && this.param && this.query) {
                this.query.setValue(this.param);
            }
        });
    }
    select(index) {
        $(this.get("pager")).pagination('select', index);
    }
    selectRow(index) {
        $(this.get("table")).datagrid('selectRow', index);
    }
    selectAll() {
        $(this.get("table")).datagrid('selectAll');
    }
    toggleQuery(isShow) {
        this.showquery = isShow;
        var clear = this.get("clear");
        var array = this.get("columns")[0];
        var heightAdjust = 0;
        var headerHeight = $(this).find(".datagrid-header").height();
        var bodyHeight = $(this).find(".datagrid-body").height();
        if (isShow) {
            headerHeight += 24;
            bodyHeight -= 24;
        }
        else {
            headerHeight -= 24;
            bodyHeight += 24;
        }
        $(this).find(".datagrid-header").css("height", headerHeight);
        $(this).find(".datagrid-header").find(".datagrid-htable").css("height", headerHeight);
        $(this).find(".datagrid-body").css("height", bodyHeight);
        $(array).each(function () {
            if (!this.hidden) {
                var query = this.query;
                if (isShow) {
                    $(query).show();
                    $(clear).show();
                }
                else {
                    $(query).hide();
                    $(clear).hide();
                }
            }
        });
    }
    unSelectRow(index) {
        $(this.get("table")).datagrid('unselectRow', index);
    }
    unSelectRows(index) {
        var rows = this.getSelectedRows();
        for (var row of rows) {
            var rowindex = this.getRowIndex(row);
            if (index != rowindex)
                this.unSelectRow(rowindex);
        }
    }
    unSelectAll() {
        $(this.get("table")).datagrid('unselectAll');
    }
    updateRow(row, select) {
        var index = this.getRowIndex(row);
        var rows = JSON.parse(this.get("data"));
        rows = window["removeObjFromArray"](rows, 'id', row.id);
        rows.push(row);
        this.set("data", JSON.stringify(rows));
        $(this.get("table")).datagrid('updateRow', {
            index: index,
            row: row
        });
        this.refreshRow(index);
        if (select) {
            this.selectRow(index);
            this.restoreSelection();
        }
    }
    recordDelete(row) {
        var element = this;
        var changes = element._localChanges;
        if (changes.has(row.id)) {
            var changedrow = changes.get(row.id);
            if (changedrow.$ == ObjektState.Created) {
                delete changes[row.id];
            }
            else {
                changedrow.$ = ObjektState.Deleted;
            }
        }
        else {
            if (row.id) {
                var newChange = new ObjektModel();
                newChange.id = row.id;
                newChange.$ = ObjektState.Deleted;
                changes.set(newChange.id, newChange);
            }
        }
        element.setModified(changes.size > 0);
    }
    recordCreate(row) {
        var element = this;
        var changes = element._localChanges;
        if (!changes.has(row.id)) {
            var newChange = new ObjektModel();
            newChange.id = row.id;
            newChange.$ = ObjektState.Created;
            changes.set(newChange.id, newChange);
        }
        element.setModified(changes.size > 0);
    }
    recordChange(row, field, value) {
        var element = this;
        var changes = element._localChanges;
        if (changes.has(row.id)) {
            changes.get(row.id)[field] = value;
        }
        else {
            var newChange = new ObjektModel();
            newChange.id = row.id;
            newChange.$ = ObjektState.Updated;
            newChange[field] = value;
            changes.set(newChange.id, newChange);
        }
        element.setModified(changes.size > 0);
    }
    fieldChanged(row, field) {
        var changes = this._localChanges;
        var change = changes[row.id];
        if (change) {
            return !(change[field] == null);
        }
        else {
            return false;
        }
    }
    buildColums() {
        var element = this;
        var columns = element.getElementsByTagName("Gf-Column");
        var value = "[[";
        var arr = new Array();
        for (var i = 0; i < columns.length; i++) {
            var obj = columns[i];
            var hidden = element.safeToString($(obj).attr("ishidden")).toLowerCase() == 'true';
            var column = {
                id: this.getUniqueId("column" + i),
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
                isRequired: element.safeToString($(obj).attr("isRequired")).toLowerCase() == 'true',
                sortable: element.safeToString($(obj).attr("sortable")).toLowerCase() == 'true',
                isreadonly: element.safeToString($(obj).attr("isreadonly")).toLowerCase() == 'true',
                createonly: element.safeToString($(obj).attr("createonly")).toLowerCase() == 'true',
                iscolor: element.safeToString($(obj).attr("iscolor")).toLowerCase() == 'true',
                formatter: obj.formatter,
                query: null,
                param: {}
            };
            column.formatter = this.getColumnFormatter(column);
            if (!column.hidden) {
                var query = this.createQueryEditor(column);
                column.title = "<div id='" + column.id + "div' title='" + column.description + "' style=' padding:5px;display:inline-block;'>" + (column.isRequired ? "*" : "") + column.label + "</div>";
                column.query = query;
                if (query) {
                    query["resize"](column.width);
                }
            }
            arr.push(column);
        }
        var arrs = new Array();
        arrs.push(arr);
        element.set("columns", arrs);
        var frozenColums = new Array();
        var subarray = new Array();
        var check = this.buildCheckColumn();
        subarray.push(check);
        frozenColums.push(subarray);
        element.set("frozenColums", frozenColums);
        return arrs;
    }
    buildRowNumberHeader() {
        var element = this;
        var clear = document.createElement("a");
        $(clear).attr("href", "javascript:void(0);");
        $(clear).attr("title", "清除所有条件");
        $(clear).addClass("fa fa-times iconfont");
        $(clear).css("font-size", "16px");
        $(clear).click(function () {
            var columns = element.get("columns")[0];
            $(columns).each(function () {
                if (!this.hidden && this.query)
                    this.query.clear();
            });
            element.queryData();
        });
        $(clear).hide();
        element.set("clear", clear);
        var div = document.createElement("div");
        $(div).html("No.<br />");
        div.id = "rownumber-header";
        div.appendChild(clear);
        $(element).find(".datagrid-header-rownumber").css("height", "auto").append(div);
    }
    buildCheckColumn() {
        var checkid = this.getUniqueId("check");
        this.set("checkid", checkid);
        if (this.singleselect) {
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
    createQueryEditor(column) {
        var element = this;
        if (column.datatype == DataType.BINARY)
            return null;
        var query = new QueryCondition();
        query.field = column.field;
        query.datatype = column.datatype;
        query.ignorecase = true;
        if (column.datatype == DataType.LIST) {
            var options = column.editor.options;
            query.listdefaultoption = options.defaultoption;
            query.listsource = options.source;
        }
        query.onValueChange(function () { element.queryData(); });
        if (!element.showquery) {
            $(query).hide();
        }
        query.init();
        return query;
    }
    openObjekt() {
        var element = this;
        var rows = element.getSelectedRows();
        if (rows) {
            $(rows).each(function () {
                var row = this;
                var index = element.getRowIndex(row);
                element.endEditRow(index);
                $("#" + element.get("checkid") + "-" + index).prop("checked", true);
                //对象详情加载后事件
                var func = function () {
                    var objektView = this;
                    var changes = element._localChanges;
                    if (changes && changes.has(row.id)) {
                        var change = window["clone"](changes.get(row.id));
                        delete change[element.idfield];
                        delete change["$"];
                        this.setChangeObject(change);
                    }
                };
                var id = row[element.idfield];
                var title = row["combinedtitle"];
                if (id) {
                    ComponentRoot.openObjDetail({
                        controlid: row.id,
                        objid: id,
                        klass: element.klass,
                        state: element.state,
                        title: title,
                        onbeforeinit: func,
                        onInitLoaded: function () {
                            this.addHook(EventNames.SaveSucceeded, function () {
                                element.reload();
                            });
                        }
                    });
                }
            });
        }
    }
    onObjektDataWriteback() {
        var changes = this._localChanges;
        for (var [k, v] of changes) {
            if (v.$ == ObjektState.Created) {
                this.createObjekts([v]);
            }
            else if (v.$ == ObjektState.Deleted) {
                this.deleteObjekts([v]);
            }
        }
    }
    delObjekts() {
        var element = this;
        var rows = element.getSelectedRows();
        if (rows) {
            $(rows).each(function () {
                element.deleteRow(this);
            });
        }
        element.refreshRowIndex();
        element.ObjectsSelectedChange();
    }
    subclassChanged(isHasSubKlass) {
        this.hassubklass = isHasSubKlass;
        this.select(1);
    }
    buildToolbar() {
        var toolbar = Hooks.createComponent(CreateObjektContentViewToolbarHook, new HookContext(this));
        var span = this.renderedHTMLElement;
        if (toolbar) {
            $(span).find(".datagrid-view").before(toolbar);
            return toolbar;
        }
        else {
            var defaultToolbar = new ToolBar();
            if (this.hidetools) {
                var hidetools = this.hidetools == 'all' ? 'all' : this.stringToObject(this.hidetools);
                defaultToolbar.hidetools = hidetools;
            }
            defaultToolbar.isIncludeSubKlass = this.hassubklass;
            defaultToolbar.isShowQuery = this.showquery;
            defaultToolbar.init();
            this.addChildComponent(defaultToolbar);
            $(span).find(".datagrid-view").before(defaultToolbar["toolbarDiv"]);
            return defaultToolbar;
        }
    }
    setSelectedTip() {
        var rows = this.getSelectedRows();
        $("#" + this.get("selectedTipID")).text(rows.length);
    }
    restoreSelection() {
        var rows = this.getSelectedRows();
        for (var key in rows) {
            var row = rows[key];
            var rowindex = this.getRowIndex(row);
            $("#" + this.get("checkid") + "-" + rowindex).prop("checked", true);
        }
    }
    getRow(index) {
        var element = this;
        var rows = element.getRows();
        var row;
        $(rows).each(function () {
            if (element.getRowIndex(this) == index)
                row = this;
        });
        return row;
    }
    getNewRow() {
        var row = this.newObjekt(this.klass, this.relatedcolumns);
        this.recordCreate(row);
        return row;
    }
    onRender() {
        var span = document.createElement("span");
        var element = this;
        var table = document.createElement("table");
        element.set("table", table);
        span.appendChild(table);
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
            collapsible: true,
            remoteSort: true,
            singleSelect: element.singleselect,
            pagination: true,
            rownumbers: true,
            columns: element.buildColums(),
            frozenColumns: element.get("frozenColums"),
            onSortColumn: function (sort, order) {
                element.set("orderby", sort);
                element.set("isAsc", order == 'asc');
                element.reload();
            },
            onClickCell: function (index, field, value) {
                if (field != "checkcolumn") {
                    element.set("preventDefault", true);
                    element.unSelectRows(index);
                    element.set("preventDefault", false);
                    if (element.state == UIState.edit) {
                        var row = element.getRow(index);
                        if (row.$ != "C" && row.permissioncode[2] == "0")
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
                if (element.get("preventDefault")) {
                    return;
                }
                element.setSelectedTip();
                element.ObjectsSelectedChange();
            },
            onUnselect: function (index, row) {
                var check = $("#" + element.get("checkid") + "-" + index);
                if (check.prop("checked"))
                    check.prop("checked", false);
                if (element.get("preventDefault")) {
                    return;
                }
                element.setSelectedTip();
                element.ObjectsSelectedChange();
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
                    if (checked)
                        element.selectAll();
                    else
                        element.unSelectAll();
                    $("input[name='" + checkid + "']").each(function () {
                        $(this).prop("checked", checked);
                    });
                    element.ObjectsSelectedChange();
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
                element.ObjectsSelectedChange();
                element.fireHook(EventNames.LoadSuccess);
            }
        });
        var gfPager = element.getElementsByTagName("Gf-Pager")[0];
        if (!gfPager) {
            gfPager = {};
        }
        var pager = element.getPager();
        var selectedTipID = this.getUniqueId("selectedTipID");
        element.set("selectedTipID", selectedTipID);
        element.set("pager", pager);
        $(pager).pagination({
            pageNumber: gfPager.pagenumber || 1,
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
        return span;
    }
    ObjectsSelectedChange() {
        var element = this;
        var rows = element.getSelectedRows();
        if (!rows) {
            rows = [];
        }
        $(rows).each(function () {
            if (!this.isTrash)
                this.isTrash = element.trashstation;
        });
        element.sendMessage(new UIMessageObjektSelecting([], rows));
    }
    getColumnFormatter(column) {
        if (column.formatter) {
            return column.formatter;
        }
        var element = this;
        var func = function (value, row, index) { return value; };
        if (column.field == element.idfield)
            return func;
        var options = column.editor.options;
        if (!options) {
            return func;
        }
        func = function (value, row, index) {
            options.elementName = column.editor.type;
            options.required = column.isRequired;
            options.label = column.label;
            options.readonly = column.isreadonly;
            options.createonly = column.createonly;
            options.isdelayToEdit = true;
            var view = new ObjektPropertyViewAdapter();
            if (column.field.indexOf('.') >= 0) {
                var sourceObj = element.getObjektData([row.id]).get(row.id);
                view.objektId = sourceObj[column.field.split('.')[0]];
                view.propertyName = column.field.split('.')[1];
            }
            else {
                view.objektId = row.id;
                view.propertyName = column.field;
            }
            view.options = JSON.stringify(options);
            return view.outerHTML;
        };
        return func;
    }
    refreshRowIndex() {
        var checkid = this.get("checkid");
        $("input[name='" + checkid + "']").each(function () {
            var newindex = $(this).closest("tr").attr("datagrid-row-index");
            $(this).attr("rowIndex", newindex);
            $(this).attr("id", checkid + "-" + newindex);
        });
    }
    static extendEditors(elementNames) {
        for (var key in elementNames) {
            var name = elementNames[key];
            var getvalue = "return target[0].getValue();";
            var setvalue = "target[0].setValue(value);";
            var init = `var grid = $(container).closest("` + this.elementName + `")[0];  
                        var input = document.createElement("` + name.toLowerCase() + `");`;
            var setProperties = `input['required'] = options.required == 'true'; 
                                    input['label'] = options.label;
                                    input['init']();
                                    input.state = UIState.edit;`;
            switch (name) {
                case 'Gf-ObjektPropertyView':
                    setProperties = `input["idfield"] = options.idfield;
                                    input["namefield"] = options.namefield;
                                    input["klass"] = options.klass; 
                                    input["filterid"] = options.filterid; 
                                    input["href"] = options.href;` + setProperties;
                    break;
                case 'Gf-ListPropertyView':
                    setProperties = `input["defaultoption"] = options.defaultoption;
                                    input["data"] = options.data;
                                    input["textfield"] = options.textfield; 
                                    input["valuefield"] = options.valuefield;` + setProperties;
                    break;
                case 'Gf-DatePropertyView':
                    setvalue = "if(value && value.indexOf(' ') > 0){ value = value.split(' ')[0]; }" + setvalue;
                    break;
                case 'Gf-NumberPropertyView':
                case 'Gf-IntPropertyView':
                case 'Gf-BigIntPropertyView':
                    setProperties = `input["prec"] = options.prec;
                                        input["scale"] = options.scale;` + setProperties;
                    break;
            }
            eval(`$.extend($.fn.datagrid.defaults.editors, {
            '` + name + `': {
                init: function (container, options) {
                    ` + init + `
                    ` + setProperties + `
                    if(options.createonly == 'true'){
                        var grid = $(container).closest("` + ObjektCollectionView.elementName + `")[0];
                        var row = grid.get("editingRow");
                        if(row.$ != "C"){
                            input["editState"] = 'read'; 
                        }
                    }
                    var $input = $(input).appendTo(container);
                    return $input;
                },
                getValue: function (target) {
                    ` + getvalue + `
                },
                setValue: function (target, value) {
                    ` + setvalue + `
                },
                resize: function (target, width) {
                    target[0].resize(width);
                }
            }
        });`);
        }
    }
    validate(rowIndex) {
        var inputs = $(this).find("[datagrid-row-index=" + rowIndex + "]").find("[iscustomelement]");
        var validate = true;
        $(inputs).each(function () {
            if (!this.validate()) {
                validate = false;
            }
        });
        return validate;
    }
    /**
     * 切换状态
     * @param state 状态枚举
     */
    switchToState(state) {
        if (state != this._state && state == UIState.browse) {
            this.reload();
        }
        super.switchToState(state);
    }
    created() {
        this.isMessageBoundary = true;
        var element = this;
        element.onAfterInit(function () {
            var table = element.get("table");
            var columns = element.get("columns")[0];
            $(columns).each(function () {
                if (!this.hidden && this.query && !this.forbidquery) {
                    $('#' + this.id).append(this.query);
                }
                $('#' + this.id).attr("title", this.description);
            });
            this.buildRowNumberHeader();
            var toolbar = this.buildToolbar();
            element.set("toolbar", toolbar);
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
            element.set("loaded", false);
            element.set("orderby", element.orderby);
            element.set("isAsc", element.isasc == 'asc');
            if (element.autoselect) {
                element.select(1);
            }
        });
        super.created();
    }
}
ObjektCollectionView.elementName = "Gf-ObjektCollectionView".toLowerCase();
ObjektCollectionView.register();
/// <reference path="ObjektCollectionView.ts" />
/** 对象集合视图 */
class RelationshipObjektCollectionView extends ObjektCollectionView {
    constructor() {
        super();
    }
    /** 源对象id */
    get sourceId() {
        return this.getAttribute("sourceId");
    }
    set sourceId(val) {
        this.setAttribute("sourceId", val);
    }
    /** 可创建被关联对象 */
    get relatedCanCreate() {
        return this.safeToString(this.getAttribute("relatedCanCreate")).toLowerCase() == 'true';
    }
    set relatedCanCreate(val) {
        this.setAttribute("relatedCanCreate", val.toString());
    }
    /** 可选择被关联对象 */
    get relatedCanPick() {
        return this.safeToString(this.getAttribute("relatedCanPick")).toLowerCase() == 'true';
    }
    set relatedCanPick(val) {
        this.setAttribute("relatedCanPick", val.toString());
    }
    /** 被关联对象所属类 */
    get relatedKlass() {
        return this.getAttribute("relatedKlass");
    }
    set relatedKlass(val) {
        this.setAttribute("relatedKlass", val);
    }
    /** 被关联对象名称 */
    get relatedLabel() {
        return this.getAttribute("relatedLabel");
    }
    set relatedLabel(val) {
        this.setAttribute("relatedLabel", val);
    }
    created() {
        super.created();
        this.onAfterInit(() => {
            if (this.sourceId) {
                var source = this.getObjektData([this.sourceId]).get(this.sourceId);
                this.onAddRow((row) => {
                    row['source'] = source;
                    this.recordChange(row, "source", this.sourceId);
                });
            }
            if (this.relatedKlass) {
                //打开关联对象
                this.toolbar.addButton({
                    label: '打开' + source["combinedLabel"],
                    icon: 'fa fa-folder-open iconfont',
                    name: 'openRelated',
                    whenToShow: { selectToShow: 'singleSelect' },
                    before: 'add'
                });
                //创建关联对象
                var createRelated = new RocAdd();
                if (this.relatedCanCreate)
                    createRelated.canCreate = true;
                if (this.relatedCanPick)
                    createRelated.canSelect = true;
                createRelated.listwidth = "70";
                createRelated.init();
                createRelated.onCreate(() => {
                    if (createRelated.createOption == 'select') {
                        var objektSelector = document.createElement('Gf-ObjectSelector');
                        objektSelector.klass = this.relatedKlass;
                        objektSelector.filterId = this.filter;
                        objektSelector.init();
                        objektSelector.onValueChange(() => {
                            var obj = objektSelector.getObject();
                            var row = new ObjektModel();
                            this.ajax({
                                url: ComponentRoot.APIs.getObjekt,
                                sync: true,
                                data: {
                                    klass: this.klass,
                                    relatedcolumns: this.relatedcolumns,
                                    relatedId: obj[objektSelector.idfield],
                                    relatedName: 'related'
                                },
                                success: function (result) {
                                    row = JSON.parse(result.Data);
                                    this.addNewRow(row);
                                    this.recordChange(row, 'related', row["related"]);
                                }
                            });
                        });
                        objektSelector.open();
                    }
                    else {
                        this.addNewRow();
                    }
                });
                this.toolbar.addTool({
                    tool: createRelated,
                    name: 'createRelated',
                    whenToShow: { stateToShow: 'edit' },
                    before: 'add'
                });
                //替换关联对象
                this.toolbar.addButton({
                    label: '替换',
                    icon: 'fa fa-exchange iconfont',
                    name: 'addRelated',
                    whenToShow: { selectToShow: 'singleSelect', stateToShow: 'edit' },
                    before: 'add'
                });
                //移除关联对象
                this.toolbar.addButton({
                    label: '移除',
                    icon: 'fa fa-remove iconfont',
                    name: 'removeRelated',
                    whenToShow: { selectToShow: 'singleSelect', stateToShow: 'edit' },
                    before: 'add'
                });
                this.toolbar.onToolbarCommand((toolname) => {
                    if (toolname == 'openRelated') {
                        var rows = this.getSelectedRows();
                        if (rows) {
                            for (let row of rows) {
                                let index = this.getRowIndex(row);
                                this.endEditRow(index);
                                $('#' + this.get('checkid') + '-' + index).prop('checked', true);
                                var related = this.getObjektData([row['related']]).get(row['related']);
                                var id = related.id;
                                var title = related['combinedtitle'];
                                if (id) {
                                    ComponentRoot.openObjDetail({
                                        controlid: row.id + id,
                                        objid: id,
                                        klass: this.relatedKlass,
                                        title: title
                                    });
                                }
                            }
                            ;
                        }
                    }
                    else if (toolname == 'removeRelated') {
                        let row = this.getSelectedRow();
                        for (var p in row) {
                            if (p.indexOf('.') > 0 && p.split('.')[0] == 'related') {
                                row[p] = null;
                            }
                        }
                        row['related'] = '';
                        this.updateRow(row, true);
                        this.recordChange(row, 'related', '');
                    }
                    else if (toolname == 'addRelated') {
                        var rows = this.getSelectedRows();
                        if (!rows || rows.length == 0)
                            return;
                        var objektSelector = new ObjektPropertyView();
                        objektSelector.klass = this.relatedKlass;
                        objektSelector.filterId = this.filter;
                        objektSelector.state = UIState.edit;
                        objektSelector.init();
                        objektSelector.onValueChange(() => {
                            var obj = objektSelector.getObject();
                            var related = new ObjektModel();
                            this.ajax({
                                url: ComponentRoot.APIs.getObjekt,
                                sync: true,
                                data: {
                                    klass: this.klass,
                                    id: obj[objektSelector.idfield]
                                },
                                success: (result) => {
                                    related = JSON.parse(result.Data);
                                    var row = this.getSelectedRow();
                                    $(this.relatedcolumns.split(',')).each(function () {
                                        if (this.split('.')[0] == 'related') {
                                            row[this] = related[this.split('.')[1]];
                                        }
                                    });
                                    row['related'] = related.id;
                                    this.updateRow(row, true);
                                    this.recordChange(row, 'related', related.id);
                                }
                            });
                        });
                        objektSelector.open();
                    }
                });
                this.toolbar.hideTool('openRelated');
                this.toolbar.hideTool('createRelated');
                this.toolbar.hideTool('removeRelated');
                this.toolbar.hideTool('addRelated');
            }
        });
    }
}
RelationshipObjektCollectionView.elementName = "Gf-RelationshipObjektCollectionView".toLowerCase();
RelationshipObjektCollectionView.register();
/// <reference path="../Lib/Hooks.ts" />
class AfterComponentInitHook extends AfterDoHook {
}
/// <reference path="../Extension/AfterComponentInitHook.ts" />
class AfterObjektCollectionInitHookImpl extends AfterComponentInitHook {
    getOrder() {
        return 100;
    }
    getDescription() {
        return `对象集合视图组件初始化后处理`;
    }
    doAfter(context) {
        var component = context.getParam();
        if (component instanceof ObjektCollectionView) {
            var element = component;
            if (element.klass == 'File') {
                element.getOptions().columns[0].forEach(o => {
                    if (o.field == 'isLink' || o.field == 'isdirectory') {
                        o.formatter = function () { return ''; };
                    }
                });
                element.toolbar.addButton({
                    label: '上传',
                    icon: 'fa fa-upload iconfont',
                    name: 'upload',
                    after: 'exporter'
                });
                element.toolbar.addButton({
                    label: '新建链接',
                    icon: 'fa fa-link iconfont',
                    name: 'addlink',
                    whenToShow: { stateToShow: 'edit' },
                    after: 'exporter'
                });
                element.toolbar.addButton({
                    label: '新建文件夹',
                    icon: 'fa fa-folder-o iconfont',
                    name: 'adddirectory',
                    whenToShow: { stateToShow: 'edit' },
                    after: 'exporter'
                });
                element.onLoadSuccess(function () {
                    var outParams = element.outParams;
                    var directoryId = outParams.length > 0 ? outParams[0].value : '';
                    var directoryname = element.getCustomAttribute('directoryname') || '/';
                    var callback = function () { element.reload(); };
                    ComponentRoot.setCustomAttribute('fileOptions', { directoryid: directoryId, directoryname: directoryname, callback: callback });
                });
                element.toolbar.addButton({
                    label: '下载',
                    icon: 'fa fa-download iconfont',
                    name: 'download',
                    whenToShow: { selectToShow: 'singleSelect' },
                    after: 'exporter'
                });
                element.toolbar.addButton({
                    label: '替换',
                    icon: 'fa fa-exchange iconfont',
                    name: 'changefile',
                    whenToShow: { selectToShow: 'singleSelect' },
                    after: 'exporter'
                });
                element.toolbar.onToolbarCommand(function (toolname) {
                    if (toolname == 'addlink') {
                        var fileOptions = ComponentRoot.getCustomAttribute('fileOptions');
                        element.insertRow({ index: 0, row: { customRowId: element.getUniqueId('row'), customRowState: "inserted", isLink: true,
                                parent: fileOptions.directoryid, permissioncode: "11111" } });
                        element.selectRow(0);
                        element.beginEditRow(0);
                        element.endEditRows(0);
                    }
                    else if (toolname == 'adddirectory') {
                        var fileOptions = ComponentRoot.getCustomAttribute('fileOptions');
                        var parent = fileOptions.directoryid;
                        var dir = IDs.DirectoryFileTypeID;
                        element.insertRow({ index: 0, row: { customRowId: element.getUniqueId('row'), customRowState: "inserted", isdirectory: true,
                                fileType: dir, parent: parent, permissioncode: "11111" } });
                        element.selectRow(0);
                        element.beginEditRow(0);
                        element.endEditRows(0);
                    }
                    else if (toolname == 'download') {
                        var row = element.getSelectedRow();
                        if (row) {
                            window.location.href = ComponentRoot.APIs.downloadfile + '?id=' + row.id + '&download=true';
                        }
                    }
                    else if (toolname == 'upload') {
                        ComponentRoot.openUpFileDetail();
                    }
                    else if (toolname == 'changefile') {
                        var row = element.getSelectedRow();
                        if (row) {
                            var objid = row[element.idfield];
                            var ext = row['extensionName'];
                            var dir = row['parent'];
                            ComponentRoot.openUpFileDetail(dir[element.idfield], dir[element.namefield], null, 1, ext, ComponentRoot.APIs.exchangefile + '?fileid=' + objid);
                        }
                    }
                });
                element.toolbar.hideTool('adddirectory');
                element.toolbar.hideTool('addlink');
                element.toolbar.hideTool('changefile');
                element.toolbar.hideTool('download');
                element.toolbar.onCheckToShow(function () {
                    var array = element.toolbar.selected;
                    if (array && array.length > 0) {
                        $(array).each(function () {
                            var klass = this.id.split('@')[1];
                            if (klass.toLowerCase() != 'file') {
                                element.toolbar.hideTool('changefile');
                                element.toolbar.hideTool('download');
                            }
                        });
                    }
                });
                return true;
            }
            return false;
        }
    }
}
AfterObjektCollectionInitHookImpl.register();
/// <reference path="../Extension/AfterComponentInitHook.ts" />
class AfterToolbarInitHookImpl extends AfterComponentInitHook {
    getOrder() {
        return 100;
    }
    getDescription() {
        return `工具栏组件初始化后处理`;
    }
    doAfter(context) {
        var component = context.getParam();
        if (component instanceof ToolBar) {
            var tb = component;
            tb.addButton({
                label: '打开实例',
                icon: 'fa fa-list iconfont',
                name: 'openInstance',
                whenToShow: { selectToShow: 'singleSelect' },
                after: 'refresh'
            });
            tb.onToolbarCommand(function (toolname) {
                if (toolname == 'openInstance') {
                    var objs = tb.selected;
                    if (objs && objs.length > 0) {
                        let obj = objs[0];
                        ComponentRoot.openTabPage(obj.name, ComponentRoot.APIs.objektCollection + '?klass=' + obj.name, obj.label, false);
                    }
                }
            });
            tb.hideTool('openInstance');
            tb.onCheckToShow(function () {
                var array = tb.selected;
                if (array && array.length > 0) {
                    $(array).each(function () {
                        var klass = this.id.split('@')[1];
                        if (klass.toLowerCase() != 'klass') {
                            tb.hideTool('openInstance');
                        }
                    });
                }
            });
            return true;
        }
        return false;
    }
}
AfterToolbarInitHookImpl.register();
/// <reference path="../Lib/Hooks.ts" />
class BeforeComponentInitHook extends BeforeDoHook {
}
/// <reference path="../Extension/BeforeComponentInitHook.ts" />
class BeforeObjektCollectionInitHookImpl extends BeforeComponentInitHook {
    getOrder() {
        return 100;
    }
    getDescription() {
        return `对象集合视图组件初始化前处理`;
    }
    doBefore(context) {
        var component = context.getParam();
        if (component instanceof ObjektCollectionView) {
            var element = component;
            if (element.klass == "File") {
                element.isasc = "asc";
                element.orderby = "sortOrder";
                element.relatedcolumns = 'fileType.faIcon';
                var column = document.createElement('Gf-Column');
                $(column).attr("field", "fileType.faIcon");
                $(column).attr("datatype", DataType.STRING);
                $(column).attr("title", '');
                $(column).attr("width", '50');
                $(column).attr("isreadonly", "true");
                $(column).attr("forbidquery", "true");
                column["formatter"] = function (value, row, index) { if (!value)
                    return '';
                else
                    return '<span class="' + value + '"></span>'; };
                $(element).prepend(column);
                if (!element.hidetools) {
                    element.hidetools = '[]';
                }
                if (element.hidetools != 'all') {
                    var hidetools = Utils.stringToObject(element.hidetools);
                    hidetools.push('add');
                    element.hidetools = JSON.stringify(hidetools);
                }
            }
            return true;
        }
        return false;
    }
}
BeforeObjektCollectionInitHookImpl.register();
/// <reference path="../Lib/Hooks.ts" />
class CreateObjektContentViewHook extends CreateComponentHook {
}
/// <reference path="../Extension/CreateObjektContentViewHook.ts" />
class CreateObjektContentViewHookImpl extends CreateObjektContentViewHook {
    getOrder() {
        return 100;
    }
    getDescription() {
        return `对象视图组件初始化前处理`;
    }
    createComponent(context) {
        var component = context.getParam();
        if (component instanceof ObjektContentView) {
            var element = component;
            var customviewcount = 0;
            var viewid = "";
            var obj;
            element.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: element.klass, objektid: element.objektid, viewtype: "ObjektCustomFormView" },
                success: function (result) {
                    obj = JSON.parse(result.Data);
                    customviewcount = 0;
                    if ("viewtype" in obj) {
                        for (var viewobj in obj) {
                            var view = obj[viewobj];
                            if (view.ishidden == "false") {
                                viewid = view['viewid'];
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                }
            });
            if (customviewcount > 0) {
                //自定义表单视图
                if (customviewcount == 1) {
                    var viewmodel = document.createElement("gf-viewmodel");
                    viewmodel["objektid"] = element.objektid;
                    viewmodel["viewid"] = viewid;
                    element.div.appendChild(viewmodel);
                }
                else {
                    var tab = document.createElement("Gf-Tabs");
                    tab["fit"] = true;
                    tab["lazyload"] = true;
                    element.div.appendChild(tab);
                    tab["closeAll"]();
                    for (var viewobj in obj) {
                        var view = obj[viewobj];
                        if (view.ishidden == "false") {
                            viewid = view['viewid'];
                            var viewname = view['viewname'];
                            var id = element.getUniqueId(element.klass);
                            var href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView" + "?objektid=" + element.objektid + "&viewid=" + viewid;
                            tab["add"](id, viewname, href, "", false);
                        }
                    }
                    tab["select"](0);
                }
            }
            else {
                return "";
            }
        }
        return "";
    }
}
CreateObjektContentViewHookImpl.register();
/// <reference path="../Lib/Hooks.ts" />
class CreateObjektPropertyCollectionViewHook extends CreateComponentHook {
}
/// <reference path="../Extension/CreateObjektPropertyCollectionViewHook.ts" />
class CreateObjektPropertyCollectionViewImpl extends CreateObjektPropertyCollectionViewHook {
    getOrder() {
        return 100;
    }
    getDescription() {
        return `对象视图组件初始化前处理`;
    }
    createComponent(context) {
        var component = context.getParam();
        if (component instanceof ObjektPropertyCollectionView) {
            var element = component;
            var obj;
            element.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: element.klass, objektid: element.objektid, viewtype: "ObjektDetailView" },
                success: function (result) {
                    obj = JSON.parse(result.Data);
                }
            });
            var customviewcount = 0;
            var viewid = "";
            if ("viewtype" in obj) {
                for (var viewobj in obj) {
                    var view = obj[viewobj];
                    if (view.ishidden == "false") {
                        view = obj[viewobj];
                        customviewcount = customviewcount + 1;
                    }
                }
            }
            if (customviewcount > 0) {
                //自定义表单视图
                if (customviewcount == 1) {
                    var viewmodel = document.createElement("gf-viewmodel");
                    viewmodel["objektid"] = element.objektid;
                    viewmodel["viewid"] = viewid;
                    element.appendChild(viewmodel);
                    return viewmodel;
                }
                else {
                    var tab = document.createElement("Gf-Tabs");
                    tab["fit"] = true;
                    tab["lazyload"] = true;
                    element.appendChild(tab);
                    tab["closeAll"]();
                    for (var viewobj in obj) {
                        var view = obj[viewobj];
                        if (view.ishidden == "false") {
                            viewid = view['viewid'];
                            var viewname = view['viewname'];
                            var id = element.getUniqueId(element.klass);
                            var href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView" + "?objektid=" + element.objektid + "&viewid=" + viewid;
                            tab["add"](id, viewname, href, "", false);
                            customviewcount = customviewcount + 1;
                        }
                    }
                    tab["select"](0);
                    return tab;
                }
            }
            else {
                return "";
            }
        }
    }
}
CreateObjektPropertyCollectionViewImpl.register();
/// <reference path="../Lib/Hooks.ts" />
class CreateObjektContentViewToolbarHook extends CreateComponentHook {
}
