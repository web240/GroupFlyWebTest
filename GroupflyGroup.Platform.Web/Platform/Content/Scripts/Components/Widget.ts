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

    }

    static elementName = "Gf-Widget".toLowerCase();

    /** 后台数据模型*/
    private _initialModel: any;

    /** 数据提交模型*/
    private _submitModel: Array<any> = new Array<any>();

    /** Widget对象状态*/
    public widgetstatus: ObjektState;

    /** 小部件标题 */
    public widgetTitle: string = "";

    /** 是否可最大化 */
    public isMaximizable: boolean = true;

    /** 是否可关闭 */
    public isClosable: boolean = true;

    /** 部件菜单模型*/
    public widgetMenuModel: Array<any> = new Array<any>();

    /** 是否是自己的小部件*/
    public isOwnWidget: boolean = true;

    /** 浏览状态是否填充数据*/
    public browseIsModeFill: boolean = true;

    /** 编辑状态是否填充数据*/
    public editIsModeFill: boolean = true;

    /** 部件原始宽度*/
    private _originalWidth: any;

    /** 部件原始高度*/
    private _originalHeight: any;

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
    public CheckIsModify() {

        //不是自己的小部件不提交数据
        if (this.isOwnWidget == false) {

            this.submitModel = [];

        }

        if (this.submitModel.length > 0) {

            this.setModified(true);
        
        } else {

            this.setModified(false);

        }
    }

    /**
    *部件存在加载后台数据
    *@param LoadData 数据回调函数
    */
    protected WidgetExistDataLoad(LoadData: Function)
    {        
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
    public GetWidgetData(LoadData: Function) {
        
        //模型存在
        if (this._initialModel) {

            LoadData(this._initialModel);

        }
        //模型不存在
        else {

            if (this.widgetstatus == ObjektState.Created) {

                this._initialModel = this.WidgetNewData();

                LoadData(this._initialModel);

            } else {
                
                this.WidgetExistDataLoad(LoadData);

            }
        }
           
    }

    /**
    *部件新增
    */
    protected WidgetNewData() {
        
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
    public fireAfterDragEnter() {

        this.fireHook("AfterDragEnter");

    }

    /**
    *拖动元素进入后回调
    */
    public onAfterDragEnter(eventHandler:()=>void) {

        this.addHook("AfterDragEnter", eventHandler);

    }

    /**
    *触发拖动元素离开后事件
    */
    public fireAfterDragLeave() {

        this.fireHook("AfterDragLeave");

    }
    /**
    *拖动元素离开后回调
    */
    public onAfterDragLeave(eventHandler: () => void) {

        this.addHook("AfterDragLeave", eventHandler);

    }

    /**
    *触发拖动元素放置后事件
    */
    public fireAfterDragEnd() {

        this.fireHook("AfterDragEnd");

    }

    /**
   *拖动元素放置后回调
   */
    public onAfterDragEnd(eventHandler: () => void) {

        this.addHook("AfterDragEnd", eventHandler);

    }


}
Widget.register();


class WidgetBrowse extends UIComponentBaseBrowse {

    /** 组件*/
    private _widget = this.getWrapper() as Widget;

    /** 部件容器*/
    private _widgetPanel: HTMLDivElement;

    /** 部件布局*/
    private _widgetPanel_Layout: HTMLDivElement;

    /** 部件北部区域*/
    private _widgetNorth: HTMLDivElement;

    /** 部件标题内容元素*/
    private _widgetTitleContent: HTMLAnchorElement;

    /** 部件中心内容区域*/
    private _widgetCenter: HTMLDivElement;

    /** 部件关闭按钮*/
    private _widgetClose: HTMLAnchorElement;

    /** 部件放大按钮*/
    private _widgetEnlarge: HTMLAnchorElement;

    /** 部件缩小按钮*/
    private _widgetShrink: HTMLAnchorElement;

    /** 部件缩小宽度*/
    private _shrinkWidth: any;

    /** 部件缩小高度*/
    private _shrinkHeight: any;

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
    protected WidgetInit_Browse() {
        
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
    public ModelFill() {
        
        var that = this;

        this._widget.GetWidgetData(function (DataModel) { that.DataFill(DataModel) });

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


    protected DataFill(DataModel: any) {
        
        $(this._widgetTitleContent).html(DataModel.Title);

        //是否有放大缩小
        if (DataModel.IsMaximizable) {

            $(this._widgetEnlarge).show();

        } else {

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
    protected WidgetNorthInit_Browse() {

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
    protected WidgetEnlargeClick() {
        
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
    protected WidgetShrinkClick() {

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
    protected WidgetCloseClick() {

        //小部件容器
        var WidgetPanel = this._widgetPanel;

        $(WidgetPanel).remove();

    }

    /**
    *中心内容面板初始化
    */
    protected WidgetCenterInit_Browse() {

        var that = this;
        
        var WidgetCenter = that._widgetCenter;
        
    }

    /**
    *加载小部件菜单
    * @param widgetMenuModelArray 小部件菜单对象数组:[{id:小部件菜单对象ID,menuId:菜单ID, menuName: 菜单名称, menuShowMode: 菜单展示模式,menuSortOrder:小部件菜单排序,menuFaIcon: 菜单字体图标 }]
    */
    protected WidgetMenuModelLoad(widgetMenuModelArray) {
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
        //加载数据为多条显示快捷方式
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
    protected MenuShortcutLoad(widgetMenuModel) {

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
    protected MenuClick(menuId, showMode) {

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
    protected MenuResultViewLoad(widgetMenuModel) {
        
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

    onRecievedMessage(message: UIMessage, source: UIComponentBase) {
        
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
        //状态转换后
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

    /** 组件*/
    private _widget = this.getWrapper() as Widget;

    /** 部件容器*/
    private _widgetPanel: HTMLDivElement;

    /** 部件布局*/
    private _widgetPanel_Layout: HTMLDivElement;

    /** 部件北部区域*/
    private _widgetNorth: HTMLDivElement;

    /** 部件中心内容区域*/
    private _widgetCenter: HTMLDivElement;

    /** 部件放大按钮*/
    private _widgetEnlarge: HTMLAnchorElement;

    /** 部件缩小按钮*/
    private _widgetShrink: HTMLAnchorElement;

    /** 部件标题内容元素*/
    private _widgetTitleContent: HTMLAnchorElement;

    /** 是否自动更改标题*/
    private _isAutoChangeWidgetTitle: boolean;

    /** 部件标题编辑按钮*/
    private _widgetTitleEdit: HTMLAnchorElement;

    /** 部件标题输入框容器*/
    private _widgetTitlePanel: HTMLDivElement;

    /** 部件标题输入框*/
    private _widgetTitleText: HTMLAnchorElement;

    /** 部件删除按钮*/
    private _widgetDelete: HTMLAnchorElement;

    /** 部件缩小宽度*/
    private _shrinkWidth: any;

    /** 部件缩小高度*/
    private _shrinkHeight: any;
  
    /** 菜单快捷方式右键菜单*/
    private _rightMenu: HTMLDivElement;


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
    protected ModelFill() {
        
        var that = this;
        
        this._widget.GetWidgetData(function (DataModel) { that.DataFill(DataModel)}  );

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
    public DataFill(DataModel: any) {
        
        //标题填充
        $(this._widgetTitleContent).html(DataModel.Title);

        //自动更改标题
        if (DataModel.Title) {

            this._isAutoChangeWidgetTitle = false;

        } else {

            this._isAutoChangeWidgetTitle = true;

        }

        //是否有放大缩小
        if (DataModel.IsMaximizable) {

            $(this._widgetEnlarge).show();

        } else {

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
    protected WidgetInit_Edit() {
        
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
    protected WidgetNorthInit_Edit() {
        
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
    protected WidgetEnlargeClick() {

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
    protected WidgetShrinkClick() {

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
    protected WidgetTitleEditClick() {

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
    protected WidgetInputTextBlur() {
        
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
    protected WidgetDeleteClick() {

        this.WidgetDelete();

    }

    /**
    *小部件删除
    */
    protected WidgetDelete() {
        
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
            //在提交模型中更改状态
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
    protected WidgetChange(submitModelPropertyName, submitModelPropertyValue) {

        var that = this;

        var SubmitModel = that._widget.submitModel;

        //查询修改的数据是否在数据提交模型中
        var submitModelIndex = Utils.ObjectArraySearch(SubmitModel, "id", that._widget.widgetId);

        //如果在数据提交模型中
        if (submitModelIndex != -1) {

            //更新修改的值                        
            SubmitModel[submitModelIndex][submitModelPropertyName] = submitModelPropertyValue;

        }
        //不在数据提交模型中,则新增一条
        else {
            var model = {};

            model["id"] = that._widget.widgetId;

            model[submitModelPropertyName] = submitModelPropertyValue;

            model["objektState"] =ObjektState.Updated;

            SubmitModel.push(model);
        }
        that._widget.CheckIsModify();
    }

    /**
    *小部件标题修改
    *@param titleContent 标题名称
    */
    protected WidgetTitleChange(titleContent) {

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
    protected WidgetCenterInit_Edit() {

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
    protected WidgetMenuModelLoad(widgetMenuModelArray) {
        
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
        //加载数据为多条显示快捷方式
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
    protected MenuShortcutLoad(widgetMenuModel) {
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

                } else {

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

        $(RightMenuDiv).menu({

        });

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
    protected MenuResultViewLoad(widgetMenuModel) {

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
    protected WidgetMenuAdd(menuModelArray) {
        
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
        //视图模型为1条,待添加的视图模型为1条时提示用户是否覆盖(此时一定显示的结果视图)
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
                //不覆盖变为快捷方式
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
        //插入的数据模型为多条时
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
    protected WidgetMenuDelete(id) {

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
        //小于1判断为结果视图,直接清空页面
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
    protected WidgetMenuChange(id, menuModelPropertyName, menuModelPropertyValue) {

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

        } else {

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
        //不在数据提交模型中,则新增一条
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
    protected CalculationMenuSortOrder() {

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


            } else if (this.objektState == ObjektState.Updated) {

                delete this.objektState;

                that._widget.updateObjekts([this]);


            } else if (this.objektState == ObjektState.Deleted) {

                delete this.objektState;

                that._widget.deleteObjekts([this]);

            }

        });
    }

    onRecievedMessage(message: UIMessage, source: UIComponentBase) {
        
        var that = this;

        //保存前
        if (message instanceof UIMessageSaving) {

            
        }
        //保存后
        else if (message instanceof UIMessageSaved) {
            
            if (that._widget.submitModel.length > 0) {

                that._widget.submitModel = [];

                that._widget.initialModel = "";
               
                that._widget.widgetstatus = ObjektState.Original;

                that._widget.CheckIsModify();

                that._widget.browseIsModeFill = true;

            } 
                     
        }
        //状态转换前
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
        //状态转换后
        else if (message instanceof UIMessageStateSwitched) {
           
            if (that._widget.state == UIState.edit) {
                
                if (this._widget.editIsModeFill) {
                
                    that.ModelFill();

                }

            }

        }
    }

}