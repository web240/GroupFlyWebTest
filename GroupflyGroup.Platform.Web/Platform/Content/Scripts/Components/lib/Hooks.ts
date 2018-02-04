
/** 钩子上下文*/
class HookContext{

    constructor(param?:any){
        this._param = param;
    }

    /** 默认参数any，用于单参数情况*/
    private _param:any;
    
    /** key,value参数集，如果有多个参数时使用 */
    private _context:Map<String,any> = new Map<String,any>();


    /**
     * 添加参数
     * @param name 参数名
     * @param value 参数值
     */
    addParam(name:String,value:any):HookContext{
        this._context.set(name,value);
        return this;
    }

    /**
     * 获取参数
     * @param name 参数名（多参数情况使用，单参数不传）
     */
    getParam(name?:String):any{
        if(!name){
            return this._param;
        }
        return this._context.get(name);
    }
}

/** 代码钩子。分层架构中，层次越高，顺序越大，执行时升序排序，其中创建单组件Hook取有效的末尾*/
abstract class Hook{
    static subClasses:Set<Function> = new Set<Function>();

    static register(){
        this.subClasses.add(this);
    }
    abstract getOrder():Number;
    abstract getDescription():String;
}

/** 前处理钩子*/
abstract class BeforeDoHook extends Hook{
    /** 返回是否进行了实质的处理*/
    abstract doBefore(context:HookContext):boolean;
}

/** 处理钩子*/
abstract class DoHook extends Hook{
    /** 返回是否进行了实质的处理*/
    abstract do(context:HookContext):boolean;
}

/** 后处理钩子*/
abstract class AfterDoHook extends Hook{
    /** 返回是否进行了实质的处理*/
    abstract doAfter(context:HookContext):boolean;
}

/** 创建单组件钩子*/
abstract class CreateComponentHook extends Hook{
    abstract createComponent(context:HookContext):IComponent;
}

/** 创建多个组件钩子*/
abstract class CreateComponentsHook extends Hook{
    abstract createComponents(context:HookContext):Array<IComponent>;
}

/** 加工组件钩子*/
abstract class ProcessComponentHook extends Hook{
    /** 返回是否进行了实质的处理*/
    abstract processComponent(component:IComponent,context:HookContext):boolean;
}

/** 代码钩子挂载工具类*/
class Hooks{

    /** 升序排序*/
    private static sortAsc(a:Hook, b:Hook){
        var aOrder = a.getOrder();
        var bOrder = b.getOrder();
        if(aOrder > bOrder){
            return -1;
        }
        else if(aOrder == bOrder){
            return 0;
        }
        else{
            return 1;
        }
    }

    /** 降序排序*/
    private static sortDesc(a:Hook, b:Hook){
        var aOrder = a.getOrder();
        var bOrder = b.getOrder();
        if(aOrder > bOrder){
            return 1;
        }
        else if(aOrder == bOrder){
            return 0;
        }
        else{
            return -1;
        }
    }


    /**
     * 前处理挂钩,返回已实质进行处理的钩子数量
     * @param h 钩子类
     * @param context 钩子上下文 
     */
    public static doBefore<H extends BeforeDoHook>(h:Function, context:HookContext):Number{
        var num = 0;
        var hooks = new Array<BeforeDoHook>();
        (h["subClasses"] as Set<{ new(): H }>).forEach(o=>{
            let obj = new o();
            if(obj instanceof h){
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        sortedHooks.forEach(p=>{
            if(p.doBefore(context)){
                num++;
            }
        })
        return num;
    }
    
    
    /**
     * 处理挂钩，返回已实质进行处理的钩子数量
     * @param h 钩子类
     * @param context 钩子上下文 
     */
    public static do<H extends DoHook>(h:Function, context:HookContext):Number{
        var num = 0;
        var hooks = new Array<DoHook>();
        (h["subClasses"] as Set<{ new(): H }>).forEach(o=>{
            let obj = new o();
            if(obj instanceof h){
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        sortedHooks.forEach(p=>{
            if(p.do(context)){
                num++;
            }
        })
        return num;
    }

    /**
     * 后处理挂钩，返回已实质进行处理的钩子数量
     * @param h 钩子类
     * @param context 钩子上下文 
     */
    public static doAfter<H extends AfterDoHook>(h:Function, context:HookContext):Number{
        var num = 0;
        var hooks = new Array<AfterDoHook>();
        (h["subClasses"] as Set<{ new(): H }>).forEach(o=>{
            let obj = new o();
            if(obj instanceof h){
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        sortedHooks.forEach(p=>{
            if(p.doAfter(context)){
                num++;
            }
        })
        return num;
    }
    
    /**
     * 创建单组件挂钩
     * @param h 钩子类
     * @param context 钩子上下文 
     */
    public static createComponent<H extends CreateComponentHook>(h:Function, context:HookContext):IComponent{
        var component:IComponent;
        var hooks = new Array<CreateComponentHook>();
        (h["subClasses"] as Set<{ new(): H }>).forEach(o=>{
            let obj = new o();
            if(obj instanceof h){
                hooks.push(obj);
            }
        })
        var sortedHooks = hooks.sort(this.sortDesc);
        for(var p of sortedHooks){
            var oc = p.createComponent(context);
            if(oc){
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
    public static createComponents<H extends CreateComponentsHook>(h:Function, context:HookContext):Array<IComponent>{
        var components = new Array<IComponent>();
        var hooks = new Array<CreateComponentsHook>();
        (h["subClasses"] as Set<{ new(): H }>).forEach(o=>{
            let obj = new o();
            if(obj instanceof h){
                hooks.push(obj);
            }
        });
        var sortedHooks = hooks.sort(this.sortAsc);
        for(var p of sortedHooks){
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
    public static ProcessComponentHook<H extends ProcessComponentHook>(h:Function,c:IComponent, context:HookContext):Number{
        var num = 0;
        var hooks = new Array<ProcessComponentHook>();
        (h["subClasses"] as Set<{ new(): H }>).forEach(o=>{
            let obj = new o();
            if(obj instanceof h){
                hooks.push(obj);
            }
        })
        var sortedHooks = hooks.sort(this.sortAsc);
        for(var p of sortedHooks){
            if(p.processComponent(c, context)){
                num++;
            }
        }
        return num;
    }
}