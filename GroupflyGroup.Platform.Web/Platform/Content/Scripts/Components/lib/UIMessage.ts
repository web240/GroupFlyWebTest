class PreventDoingReason{

    /** 原因，不重复 */
    private _reasons:Set<String> = new Set<String>();

    /** 添加原因，已添加过的串，忽略*/
    public addReason(reason:String){
        this._reasons.add(reason);
    }
    
    /** 获取整合的原因字符串，用换行符分隔*/
    public getReasons(){
        var message = "";
        for(var reason of this._reasons) {
            if(message != ""){
                message += "<br/>";
            }
            message += reason;
        }
        return message;
    }

    /** 有未保存的数据，继续操作将丢失这些修改！*/
    static notSaved = "有未保存的数据，继续操作将丢失这些修改！";
}

class UIMessage{
    id:string;
    constructor(){
        this.id = Utils.getUniqueId("message");
    }

    /** 消息边界组件 */
    private _boundary:IComponent;

    /** 是否忽略消息边界，默认false */
    private  _isIgnoreMessageBoundary:boolean = false;

    /** 是否忽略消息边界，默认false */
    get isIgnoreMessageBoundary(){
        return this._isIgnoreMessageBoundary;
    }

    /** 消息边界组件 */
    get boundary(){
        return this._boundary;
    }
    set boundary(val){
        this._boundary = val;
    }

    /* public processed */

    /** 忽略消息边界*/
    public ignoreMessageBoundary(){
        this._isIgnoreMessageBoundary = true;
    }

}

/** 前消息 */
abstract class UIDoingMessage extends UIMessage{

    /** 是否继续处理，默认true */
    private _continuing:boolean = true;

    /** 是否可忽略阻止，默认true */
    private _isIgnorable:boolean = true;
    
    /** 阻止原因 */
    protected _reason:PreventDoingReason = new PreventDoingReason();

    /** 是否继续处理，默认true */
    public getReasons(){
        return this._reason.getReasons();
    }

    /** 是否继续处理，默认true */
    get continuing(){
        return this._continuing;
    } 

    /** 是否可忽略阻止，默认true */
    get isIgnorable(){
        return this._isIgnorable;
    } 

    
    /** 阻止处理，continuing设continuing为false*/
    public preventDoing(reason?:String,isIgnorable?:boolean){
        if(reason){
            this._reason.addReason(reason);
        }
        if(isIgnorable === false){
            this._isIgnorable = false;
        }
        this._continuing = false;
        
    }

}

/** 后消息 */
abstract class UIDidMessage extends UIMessage{

}

/** 保存前消息 */
class UIMessageSaving extends UIDoingMessage{
    
}
/** 保存后消息 */
class UIMessageSaved extends UIDidMessage{
    
}
/** 刷新前消息 */
class UIMessageRefreshing extends UIDoingMessage{
    
}
/** 刷新后消息 */
class UIMessageRefreshed extends UIDidMessage{
    
}


/** 对象选择前消息 */
class UIMessageObjektSelecting extends UIDoingMessage{
    originalSelected:Object[]
    currentSelected:Object[]
    constructor(originalSelected:Object[],currentSelected:Object[]){
        super();
        this.originalSelected = originalSelected;
        this.currentSelected = currentSelected;
    }
}

/** 对象选择后处理 */
class UIMessageObjektSelected extends UIDidMessage{
    originalSelected:Object[]
    currentSelected:Object[]
    constructor(originalSelected:Object[],currentSelected:Object[]){
        super();
        this.originalSelected = originalSelected;
        this.currentSelected = currentSelected;
    }
}

/** 值改变前消息 */
class UIMessageValueChanging  extends UIDoingMessage{
    originalValue:string
    currentValue:string
    constructor(originalValue:string,currentValue:string){
        super();
        this.originalValue = originalValue;
        this.currentValue = currentValue;
    }
}
/** 值改变后消息 */
class UIMessageValueChanged  extends UIDidMessage{
    originalValue:string
    currentValue:string

    constructor(originalValue:string,currentValue:string){
        super();
        this.originalValue = originalValue;
        this.currentValue = currentValue;
    }
}

/** 状态切换前消息 */
class UIMessageStateSwitching extends UIDoingMessage{
    originalState:UIState
    currentState:UIState

    constructor(originalState:UIState,currentState:UIState){
        super();
        this.originalState = originalState;
        this.currentState = currentState;
    }
}

/** 状态切换后消息 */
class UIMessageStateSwitched extends UIDidMessage{
    originalState:UIState
    currentState:UIState

    constructor(originalState:UIState,currentState:UIState){
        super();
        this.originalState = originalState;
        this.currentState = currentState;
    }
}

/** 对象打开消息 */
class UIMessageObjektOpend extends UIDidMessage{
}

/** 对象创建消息 */
class UIMessageObjektCreated extends UIDidMessage{
}

/** 对象删除消息 */
class UIMessageObjektDeleted extends UIDidMessage{
    objektId: string

    constructor(objektId?: string) {
        super();
        this.objektId = objektId;
        
    }

}




/** 是否显示查询切换消息 */
class UIMessageShownQueryChanged extends UIDidMessage{
    isShowQuery:boolean;

    constructor(isShowQuery:boolean){
        super();
        this.isShowQuery = isShowQuery;
    }
}

/** 是否包含子类切换消息 */
class UIMessageIncludeSubKlassChanged extends UIDidMessage{
    isIncludeSubKlass:boolean;

    constructor(isIncludeSubKlass:boolean){
        super();
        this.isIncludeSubKlass = isIncludeSubKlass;
    }
}

/** 导出消息 */
class UIMessageExported extends UIDidMessage{
}
