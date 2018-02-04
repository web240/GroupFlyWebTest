/** 组件接口 */
interface IComponent{
}

/** 对象数据模型 */
class ObjektModel{
    /** ID */
    public id:string;
    /** 对象状态 */
    public $:ObjektState;
}

/** API模型 */
class API{
    constructor(){
        var apiObject = this;
        $(document).ready(function(){
            for(var [key,value] of apiObject._apis){
                if(document.body.hasAttribute(key)){
                    var api = document.body.getAttribute(key);
                    if (api) {
                        apiObject._apis.set(key, api);
                        document.body.removeAttribute(key);
                    }
                }
            }
        });
    }

    private getApi(name:string){
        if(!this._apis.has(name)){
            return "";
        }
        if(!this._apis.get(name) && document.body.hasAttribute(name)){
            this._apis.set(name, document.body.getAttribute(name));
            document.body.removeAttribute(name);
        }
        return this._apis.get(name);
    }

    private _apis: Map<string,string> = new Map([
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
        ["getPropertyViewOption",""],
        ["objektCollection",""],
        ["downloadfile",""],
        ["exchangefile",""],
        ["getWidgetInfo",""]
    ]);
    
    get exchangefile(){
        return this.getApi("exchangefile");
    }
    get objektCollection(){
        return this.getApi("objektCollection");
    }
    get downloadfile(){
        return this.getApi("downloadfile");
    }
    get getPropertyViewOption(){
        return this.getApi("getPropertyViewOption");
    }
    get getNewPrivatePermission(){
        return this.getApi("getNewPrivatePermission");
    }
    get menuHandle(){
        return this.getApi("menuHandle");
    }
    get getListValues(){
        return this.getApi("getListValues");
    }
    get checkUml(){
        return this.getApi("checkUml");
    }
    get getUml(){
        return this.getApi("getUml");
    }
    get authorize(){
        return this.getApi("authorize");
    }
    get getklassTree(){
        return this.getApi("getklassTree");
    }
    get listExport(){
        return this.getApi("listExport");
    }
    get save(){
        return this.getApi("save");
    }
    get getListdata(){
        return this.getApi("getListdata");
    }
    get rocView(){
        return this.getApi("rocView");
    }
    get getObjWithMeta(){
        return this.getApi("getObjWithMeta");
    }
    get edit(){
        return this.getApi("edit");
    }
    get selectObjekt(){
        return this.getApi("selectObjekt");
    }
    get reference(){
        return this.getApi("reference");
    }
    get getAuthorization(){
        return this.getApi("getAuthorization");
    }
    get error(){
        return this.getApi("error");
    }
    get uploadFile(){
        return this.getApi("uploadFile");
    }
    get exchangeFile(){
        return this.getApi("exchangeFile");
    }
    get setTrash(){
        return this.getApi("setTrash");
    }
    get getObjekt(){
        return this.getApi("getObjekt");
    }
    get getObjekts(){
        return this.getApi("getObjekts");
    }
    get getNewObjekt(){
        return this.getApi("getNewObjekt");
    }
    get ifModified(){
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
class ObjektCollectionModel{
    /** 对象集合名称（唯一标识） */
    name:string;
    /** 对象集合 */
    objekts:Array<ObjektModel>;
    /** 查询总条数 */
    total:Number;
    /** 当前页数（从1开始）*/
    pageIndex:Number;
    /** 每页条数 */
    pageSize:Number;
    /** 排序属性 */
    orderBy:string;
    /** 是否升序 */
    isAsc:boolean;
}

/** 对象集合查询参数模型 */
class QueryModel{
    /** 类名 */
    klass:string;
    /** 是否包含子类实例 */
    includeSubKlass:boolean;
    /** 查询条件集合 */
    param:Array<QueryParamModel> = new Array<QueryParamModel>();
    /** 页数 */
    pageIndex:Number;
    /** 每页行数 */
    pageSize:Number;
    /** 排序属性名 */
    orderBy:string;
    /** 排序是否升序 */
    isAsc:string;
    /** 附加属性（对象型属性的属性） */
    relatedProperties:string;
    /** 筛选条件ID */
    filter:string;
}

/** 属性查询条件模型 */
class QueryParamModel{
    field:string;
    type:string;
    datatype:string;
    value:any;
    caseSensitive:boolean = true;
}

/** 对象集合视图列模型 */
class ObjektCollectionColumn{
    
    id: string = Utils.getUniqueId("column");
    field: string;
    datatype: string;
    label: string;
    title: string;
    description: string;
    hidden: boolean;
    width: Number;
    align: string;
    editor: { type:string,options:any};
    styler: Function = function (value, row, index) { };
    forbidquery: boolean = false;
    isRequired: boolean;
    sortable: boolean;
    isreadonly: boolean;
    createonly: boolean;
    iscolor: boolean;
    formatter: Function;
    query: QueryCondition;
    param: any;

}
