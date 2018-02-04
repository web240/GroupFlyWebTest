

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

    }

    static elementName = "Gf-Dashboard".toLowerCase();

    /** 后台数据模型*/
    private _initialModel: any;

    /** 菜单拖动图标*/
    public _menuDraggableImg: HTMLSpanElement;

    /** 数据提交模型*/
    private _submitModel: Array<any> = new Array<any>();

    /** 欢迎页北部区域*/
    private _dashboardNorth: HTMLDivElement;

    /** 布局*/
    private _dashboardLayout: HTMLDivElement;

    /** 欢迎页中心内容区域*/
    private _dashboardCenter: HTMLDivElement;

    /** 编辑确定按钮*/
    private _confirmEditButton: HTMLAnchorElement;

    /** 编辑取消按钮*/
    private _cancelEditButton: HTMLAnchorElement;

    /** 增加部件按钮*/
    private _addWidgetButton: HTMLAnchorElement;

    /** 保存按钮*/
    private _saveButton: HTMLAnchorElement;

    /** 欢迎页ID*/
    private _dashboardId: string;

    /** 欢迎页ID*/
    get dashboardId() {
        
        if (!this._dashboardId) {

            if (this.initialModel.IsMyOwn == true) {

                this._dashboardId = this.initialModel.DashboardId

            } else {

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
    protected ModelFill() {
        
        if (!this._initialModel) {

            var that = this;

            this.GetDashboard(function (DataModel) { that.DataFill(DataModel) });

        } 

        if (this.state == UIState.browse) {

            $(this._confirmEditButton).show();

            $(this._cancelEditButton).hide();

            $(this._addWidgetButton).hide();

            $(this._saveButton).hide();

            this.MenuDragCancel();

        } else {

            $(this._confirmEditButton).hide();

            $(this._cancelEditButton).show();

            $(this._addWidgetButton).show();

            $(this._saveButton).show();

            this.MenuDragEnabled();

        }

    }

    /** 数据填充*/
    protected DataFill(DataModel: any) {
        
        $(this._dashboardCenter).html(DataModel.Content);

        var gfwidget = $(this._dashboardCenter).find("gf-widget");

        var that = this;

        $(gfwidget).each(function () {

            var widget = this as Widget;

            widget.state = that.state;

            that.RegisterGfwidgetDrag(widget);

        });

    }


    /*
    * 获取欢迎页数据
    * @param 回调函数
    */
    protected GetDashboard(LoadData: Function) {

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
    protected DashboardInit() {

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
    protected DashboardNorthInit() {


        var that = this;

        var DashboardNorth = that._dashboardNorth;

        //编辑确定按钮
        var ConfirmEditButton = document.createElement("a");

        $(ConfirmEditButton).addClass("ToolButton");

        $(ConfirmEditButton).linkbutton({

            width: 72,

            height: 20,

            text: "编辑",

            onClick: function () { that.ConfirmEditButtonClick() }

        });

        this._confirmEditButton = ConfirmEditButton;

        //编辑取消按钮
        var CancelEditButton = document.createElement("a");

        $(CancelEditButton).addClass("ToolButton");

        $(CancelEditButton).linkbutton({

            width: 72,

            height: 20,

            text: "取消编辑",

            onClick: function () { that.CancelEditButtonClick() }

        });

        this._cancelEditButton = CancelEditButton;

        //增加部件按钮
        var AddWidgetButton = document.createElement("a");

        $(AddWidgetButton).addClass("ToolButton");

        $(AddWidgetButton).linkbutton({

            width: 72,

            height: 20,

            text: "新增小部件",

            onClick: function () { that.AddWidgetButtonClick() }

        });

        this._addWidgetButton = AddWidgetButton;

        //保存按妞
        var SaveButton = document.createElement("a");

        $(SaveButton).addClass("ToolButton");

        $(SaveButton).linkbutton({

            width: 72,

            height: 20,

            text: "保存",

            onClick: function () { that.SaveButtonClick() }

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
    protected ConfirmEditButtonClick() {

        //发送编辑消息
        this.sendMessage(new UIMessageStateSwitching(this.state, UIState.edit));
    }

    /**
    *编辑取消按钮点击
    */
    protected CancelEditButtonClick() {

        //发送浏览消息
        this.sendMessage(new UIMessageStateSwitching(this.state, UIState.browse));
    }

    /**
    *增加小部件按钮点击
    */
    protected AddWidgetButtonClick() {

        this.AddWidget();

    }

    /**
    *增加部件
    */
    protected AddWidget() {

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
    protected SaveButtonClick() {
        
        this.DashboardSave();

        this.sendMessage(new UIMessageSaving());
    }

    /**
    *欢迎页保存
    */
    protected DashboardSave() {
        
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
            //不是自己的欢迎页
            else {
                //新增
                SubmitModel.push({ "id": that.dashboardId, "objektState": ObjektState.Created, "content": DashboardCenterHtml, "name": InitialModel.MySelfIdentityId + "-Dashboard", "label": InitialModel.MySelfIdentityId +"-Dashboard" });

                //新增身份个性化
                var newIdentityPersonalizationModel = that.newObjekt("IdentityPersonalization");

                SubmitModel.push({ "id": newIdentityPersonalizationModel.id, "objektState": ObjektState.Created, "source":InitialModel.MySelfIdentityId, "related": that.dashboardId });

               
            }
        }

        this.CheckIsModify();

    }

    /**
    *得到欢迎页内Html
    */
    protected GetDashboardCenterHtml() {

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

            var widget1 = this as Widget;

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
            //小部件为新增状态
            else if (widget1.widgetstatus == ObjektState.Created) {

                DashboardCenterHtml += that.WidgetToHtml(widget1);

                //新增小部件关联
                var newDashboardWidgetModel = that.newObjekt("DashboardWidget");

                SubmitModel.push({ "id": newDashboardWidgetModel.id, "objektState": ObjektState.Created, "source": that.dashboardId, "related": widget1.widgetId });

            }
            //小部件为删除状态
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
    protected WidgetToHtml(widget: Widget) {

        var newWidget = new Widget();

        newWidget.width = widget.width;

        newWidget.height = widget.height;

        newWidget.widgetId = widget.widgetId;

        return $(newWidget).prop("outerHTML");

    }

    /**
    *欢迎页中心内容初始化
    */
    protected DashboardCenterInit() {



    }

    /**
    *菜单拖动初始化  
    */
    protected MenuDragInit() {

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
    protected RegisterGfwidgetDrag(gfwidget: Widget) {

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
    public MenuDragCancel() {

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
    public MenuDragEnabled() {

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
    protected CheckIsModify() {

        if (this.submitModel.length > 0) {

            this.setModified(true);

        } else {

            this.setModified(false);
        }
    }

    onObjektDataWriteback() {

        var that = this;

        $(that.submitModel).each(function () {

            if (this.objektState == ObjektState.Created) {

                delete this.objektState;

                that.createObjekts([this]);


            } else if (this.objektState == ObjektState.Updated) {

                delete this.objektState;

                that.updateObjekts([this]);


            } else if (this.objektState == ObjektState.Deleted) {

                delete this.objektState;

                that.deleteObjekts([this]);

            }

        });


    }


    onRecievedMessage(message: UIMessage, source: UIComponentBase) {

        super.onRecievedMessage(message, source);
        
        if (message instanceof UIMessageObjektDeleted) {
            
            var submitModelIndex = Utils.ObjectArraySearch(this.submitModel, "id", message.objektId);

            if (submitModelIndex !=-1) {

                this.submitModel.splice(submitModelIndex, 1)

                this.CheckIsModify();

            }
            

        }

        //状态转换前
        if (message instanceof UIMessageStateSwitching) {
 
            
        }
        //状态转换后
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
        //保存前
        else if (message instanceof UIMessageSaving) {
           
            //判断是否能保存


        }
        //保存后
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
Dashboard.register();



