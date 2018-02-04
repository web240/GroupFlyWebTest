/// <reference path="Panel.ts" />

/** 对话框 */
class Dialog extends Panel {
    
    constructor() {
        super();
    }
    
    static elementName = "Gf-Dialog".toLowerCase();


    /** 是否模态 */
    get modal(){
        return this.safeToString(this.getAttribute("modal")).toLowerCase() == "true";
    }
    set modal(val){
        this.setAttribute("modal",val === true ? "true" : "false");
    }

    public onOpen(handler:()=>void){
        this.addHook(EventNames.Open,handler);
    }
    
    public onMaximize(handler:()=>void){
        this.addHook(EventNames.Maximize,handler);
    }

    public onRestore(handler:()=>void){
        this.addHook(EventNames.Restore,handler);
    }

    public onBeforeClose(handler:()=>void){
        this.addHook(EventNames.BeforeClose,handler);
    }

    public onClose(handler:()=>void){
        this.addHook(EventNames.Close,handler);
    }

    public open() {
        var div = this.div;
        $(div).dialog({ 
            title: this.title, 
            width : this.width || 1200,
            height : this.height || 600,
            modal : this.modal
        }); 
        if(this.href){
            $(div).dialog({ href : this.href });
        }
        this.restore();
        $(div).dialog('open');
        this.fireHook(EventNames.Open);
    }

    public close(){
        $(this.div).dialog('close');
    }

    public maximize(){
        $(this.div).dialog('maximize');
    }
    public restore(){
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
Dialog.register();
