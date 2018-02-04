
/// <reference path="../UIComponentBase.ts" />

/** 对象属性视图适配器 */
class ObjektPropertyViewAdapter extends UIComponentBase{

    constructor(){
        super();
    }
    static elementName = "Gf-ObjektPropertyViewAdapter".toLowerCase();

    protected propertyView:BasePropertyView;

    /** return null不区分状态 */
    protected createComponentEditState(){
        return null;
    }
    
    /** return null不区分状态 */
    protected createComponentBrowseState(){
        return null;
    }

    /** 对象ID */
    get objektId(){
        return this.getAttribute("objektId");
    }
    set objektId(val){
        this.setAttribute("objektId",val);
    }

    /** 属性名称 */
    get propertyName(){
        return this.getAttribute("propertyName");
    }
    set propertyName(val){
        this.setAttribute("propertyName",val);
    }

    /** 参数 */
    get options(){
        return this.getAttribute("options");
    }
    set options(val){
        this.setAttribute("options",val);
    }

    

    
    /**
     * 根据数据类型构造具体数据类型的XxxPropertyView实例赋值到propertyView (getObjektData(objektId).Klass.getProperty(propertyName).dataType);并且propertyView.onRender() 
     */
    public onRender():HTMLElement {
        var elementOptions = this.getElementOptions();
        if(!elementOptions.elementName){
            return document.createElement("pre");
        }
        
        var element:BasePropertyView = document.createElement(elementOptions.elementName);
        for(var name in elementOptions){
            if(name != "elementName"){
                element[name] = elementOptions[name];
            }
        }
        element.objektId = this.objektId;
        element.propertyName = this.propertyName;
        this.propertyView = element;

        return element;
    }

    protected getElementOptions(){
        if(this.options){
            return JSON.parse(this.options);
        }
        var view = this;
        var options;
        view.ajax({
            sync:true,
            url: ComponentRoot.APIs.getPropertyViewOption,
            data: { objektId: view.objektId, propertyName: view.propertyName },
            success: function (result) {
                options = JSON.parse(result.Data);
            }
        });
        return options;
    }
}
ObjektPropertyViewAdapter.register();