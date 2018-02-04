/// <reference path="UIComponentBase.ts" />

/** 页面（根组件） */
class Page extends UIComponentBase {
    
    constructor() {
        super();
        this.isRoot = true;
    }
    static elementName = 'Gf-Page'.toLowerCase();

    static get pageInstance(){
        if(!this._singleInstance){
            this._singleInstance = new Page();
            var element = this;
            $(document).ready(function(){
                element._singleInstance.init();
            });
        }
        return this._singleInstance;
    }

    private _apppath:string;

    private static _singleInstance:Page;

    private _APIs = new API();

    /** 应用程序域名 */
    get apppath(){
        if(!this._apppath){
            this._apppath = document.body.getAttribute("apppath");
        }
        return this._apppath;
    }

    /** API集合对象 */
    get APIs(){
        return this._APIs;
    }

    /**
     * 注册组件自定义标签
     */
    public static register(){
        super.register();
        //设置全局唯一对象
        ComponentRoot = this.pageInstance;
    }

    protected createComponentEditState(){
        return null;
    }

    protected createComponentBrowseState(){
        return null;
    }

    /** 
     * 打开对话框
     * @param option option属性 : id,title,modal,content,href,width,height,onBeforeClose,onClose,onOpen
     */
    public openDialog(option:any){
        var dialog = document.getElementById(option.id) as Dialog;
        if (!dialog){
            dialog = new Dialog();
            document.body.appendChild(dialog);
            dialog.id = option.id;
            dialog.modal = option.modal;
            if(option.width){
                dialog.width = option.width;
            }
            if(option.height){
                dialog.height = option.height;
            }
            if(option.href){
                dialog.href = option.href;
            }
            dialog.title = option.title;
            dialog.init();
        }
        if(option.onBeforeClose){
            dialog.onBeforeClose(option.onBeforeClose);
        }
        if(option.onClose){
            dialog.onClose(option.onClose);
        }
        if(option.onOpen){
            dialog.onOpen(option.onOpen);
        }
        if(option.content){
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
    public closeDialog(id:string){
        var dialog:any = document.getElementById(id);
        if(dialog){
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
    public openTabPage(id, url, title, isiframe) {
        var tabs:any = document.querySelector("#frametabs");
        tabs.add(id, title, url, "",isiframe);
    }

    /** 
     * tab页跳转
     * @param url 跳转url
     */
    public tabGoto(url){
        var tabs:any = document.querySelector("#frametabs");
        tabs.tabGoto(url);
    }

    /** 
     * tab页返回初始页
     */
    public tabGoback(){
        var tabs:any  = document.querySelector("#frametabs");
        tabs.tabGoback();
    }
    

    /** 
     * 打开菜单链接
     * @param menu 菜单对象
     */
    public openMenu(menu) {        
        var element = this;
        window["platformAjax"]({
            url: element.APIs.menuHandle,
            data: { menuId: menu.id, parentMenuId: menu.parentId },
            success: function(result) {
                var tabs:any = document.querySelector("#frametabs");
                switch(result.HandleType){
                    case 'Url':                        
                        if (menu.ShowMode == "1") {
                            tabs.add(menu.id, result.Title, result.Url, menu.iconCls, result.IsPage);
                    }
                    else if(menu.ShowMode == "2" || menu.ShowMode == "3"){
                        element.openDialog({
                            id : menu.id + "dialog",
                            title : result.Title,
                            modal : result.ShowMode == "2",
                            href : result.Url
                        });
                    }
                    else if(menu.ShowMode=="4"){
                        window.open(result.Url,result.Title);
                    }
                break;
                case 'Content':                            
                    if(menu.ShowMode == "1"){
                        tabs.addContent(menu.id,result.Title,result.Content);
                    }
                    else if(menu.ShowMode == "2" || menu.ShowMode == "3"){
                        element.openDialog({
                            id : menu.id + "dialog",
                            title : result.Title,
                            modal : result.ShowMode == "2",
                            content : result.Content
                        });
                    }
                    else if(menu.ShowMode=="4"){                                
                        tabs.addContent(menu.id,result.Title,result.Content);
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
    public openObjDetail(option: any) {

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
 
  
        var objektcontentview: any = document.createElement("gf-objektcontentview");  
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
    public openUpFileDetail(dirid?, dirname?, func?, fileNumLimit?,ext?,url?){
        var fileOptions:any = this.getCustomAttribute('fileOptions');
        var directoryid = dirid || fileOptions.directoryid;
        var directoryname = dirname || fileOptions.directoryname;
        var callback = func || fileOptions.callback;
        var upfileserver = url || this.APIs.uploadFile;

        var UpFile = this.get("UpFile") as UpFileDialog;
        if (!UpFile) {
            UpFile = document.createElement("Gf-UpFileDialog") as UpFileDialog;
            document.body.appendChild(UpFile);                                                
        }
        UpFile.title='文件上传';
        UpFile.directoryid=directoryid;
        UpFile.directoryname=directoryname;
        UpFile.upfileserver= upfileserver;
        UpFile.fileNumLimit = fileNumLimit || 100;
        UpFile.onSubmit(callback);
        UpFile.ext = ext || "";
        this.set("UpFile",UpFile);
        UpFile.open();
    }

    /**
    * 打开异常详情 
    * @param message 异常消息
    * @param detail 异常详情
    */
    public showError(message:string, detail:string){
        var page = this;
        var div = page.get("errorDiv");
        if(!div){
            div = document.createElement("div");
            page.set("errorDiv",div);
            page.appendChild(div);
        }
        $(div).load(page.APIs.error, {message:message,detail:detail});
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

Page.register();
