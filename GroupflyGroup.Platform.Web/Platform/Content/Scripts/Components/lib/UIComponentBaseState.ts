
abstract class UIComponentBaseState{
    constructor(wrapper:UIComponentBase){
        this._wrapper = wrapper;
    }

    private _wrapper:UIComponentBase

    public getWrapper(){
        return this._wrapper;
    }
    /**
     * 当渲染时的回调函数
     */
    public onRenderFunc:(element:HTMLElement) => HTMLElement; 
    public onRecievedMessageFunc: Function;
    public onObjektDataWritebackFunc: Function;

    /**
     * 当组件渲染后
     */
    public afterRender(): void {
        return;
    }

    /**
     * 当渲染时的回调
     */
    abstract onRender() : HTMLElement;
    abstract onRecievedMessage(message:UIMessage , source:UIComponentBase);
    abstract onObjektDataWriteback();
}

abstract class UIComponentBaseBrowse extends UIComponentBaseState{
    
}
abstract class UIComponentBaseEdit extends UIComponentBaseState{
    
}

class BasePropertyViewEdit extends UIComponentBaseEdit{

    onRender():HTMLElement{
        var span = document.createElement("span");
        $(span).hide();
        $(span).click(function(e){ 
            (e as Event).stopPropagation();
        });
        return span;
    }

    onRecievedMessage(message:UIMessage, source:UIComponentBase){
        if(message instanceof UIMessageSaving){
            var wrapper = this.getWrapper() as BasePropertyView;
            if(!wrapper.validate()){
                message.preventDoing(`"`+ wrapper.label +`" 必填`,false) ;
            }
        }
    }

    onObjektDataWriteback(){
        var wrapper = this.getWrapper() as BasePropertyView;
        if(wrapper.isModified()){
            var objektData = new ObjektModel();
            objektData.id = wrapper.objektId;
            objektData[wrapper.propertyName] = wrapper.getValue();
            wrapper.updateObjekts([objektData]);
        }
    }
}

class BasePropertyViewBrowse extends UIComponentBaseBrowse{

    onRender(): HTMLElement{
        var wrapper = this.getWrapper() as BasePropertyView;
        var display = document.createElement("pre");
        $(display).css("margin","0px");
        $(display).css("display","inline-block");
        wrapper.onValueChange(function(oldValue,newValue){
            $(display).html(newValue);
        });
        return display;
    }
    onRecievedMessage(message:UIMessage , source:UIComponentBase){
    }
    onObjektDataWriteback(){
    }
}