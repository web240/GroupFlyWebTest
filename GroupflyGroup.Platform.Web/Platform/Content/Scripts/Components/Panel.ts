/// <reference path="UIComponentBase.ts" />

/** 面板 */
class Panel extends UIComponentBase {
    
    constructor() {
        super();
    }
    static elementName = "Gf-Panel".toLowerCase();

    /** 容器 */
    private _panel: HTMLDivElement;

    /** 是否最大化 */
    private _max: boolean;

    /** 内容 */
    private _contents: Array<any> = new Array<any>();

    /** 内容 */
    get contents(){
        return this._contents;
    }

    /** 容器 */
    get div(){
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
    get title(){
        return this.getAttribute("title");
    }
    set title(val){
        this.setAttribute("title",val);
    }
    
    /** 面板内容url */
    get href(){
        return this.getAttribute("href");
    }
    set href(val){
        this.setAttribute("href",val);
    }

    public appendContent(component) {
        $(component).appendTo(this._panel);
        this._contents.push(component);
    }

    public clearContent() {
        $(this._panel).html(''); 
        this._contents=[];
    }
    public maximize() {
        $(this._panel).panel('maximize');
    }
    public restore() {
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
Panel.register();