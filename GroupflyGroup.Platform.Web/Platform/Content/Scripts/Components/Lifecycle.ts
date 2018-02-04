/*生命周期
  组件名Gf-Lifecycle

  属性:
  width:组件宽度(默认100%)
  height:组件高度(默认100%)
  newnodename:新建节点名称,默认值"新状态"
  newlinkname:新建链接名称,默认值"改变"
  lifecycleid:生命周期对象ID,必填

  方法:
  //得到视图数据
  GetDiagramData:

  事件:

*/

class Lifecycle extends UIComponentBase {

    constructor() {

        super();   
        
       
    }

    static elementName = "Gf-Lifecycle".toLowerCase();


    /** 组件容器面板 */
    private _lifecyclePanel: HTMLDivElement;

    /** 数据提交模型 */
    private _submitModel=[];

    /** 初始数据模型 */
    private _initialModel = [];

    /** GoJs方法  */
    private _goJs:any;

    /** GoJs模版  */
    private _goMake :any;

    /** 视图 */
    private _lifecycleDiagram: any;


    /** 视图 */
    get lifecycleDiagram() {

        return this._lifecycleDiagram;

    }


    /** 组件宽度(默认100%) */
    get width() {

        if (!this.getAttribute("width")) {

            return "100%";

        }

        return this.getAttribute("width");

    }
    set width(val) {

        this.setAttribute("width", val.toString());

    }

    /** 组件高度(默认100%) */
    get height() {

        if (!this.getAttribute("height")) {

            return "100%";

        }

        return this.getAttribute("height");

    }
    set height(val) {

        this.setAttribute("height", val.toString());

    }

    /** 新建节点名称,默认值"新状态" */
    get newNodeName() {

        if (!this.getAttribute("newnodename")) {

            return this.GetNewNodeName("新状态");
            

        } else {

            return this.GetNewNodeName(this.getAttribute("newnodename"));


        }
    }

    /** 获得新建节点的名称 */
    protected GetNewNodeName(newNodeName: string) {

        var nodeModel = this._lifecycleDiagram.model.nodeDataArray;

        var createNodeName = newNodeName;
       
        var countString = "";

        var count = 1;

        $(nodeModel).each(function () {

            var nodeIndex = Utils.ObjectArraySearch(nodeModel, "text", createNodeName + count);

            if (nodeIndex != -1) {

                countString = count.toString();

                count++;
              
            }

        })

        return createNodeName + count;
    }
   
    /** 新建链接名称,默认值"改变" */
    get newLinkName() {

        if (!this.getAttribute("newlinkname")) {

            return "改变";

        }

        return this.getAttribute("newlinkname");

    }
    set newLinkName(val) {

        this.setAttribute("newlinkname", val.toString());

    }

    /** 生命周期对象ID,必填 */
    get lifecycleId() {

        return this.getAttribute("lifecycleId");

    }
    set lifecycleId(val) {

        this.setAttribute("lifecycleId", val.toString());

    }

    createComponentBrowseState() {

        return null;

    }

    createComponentEditState() {


        return null;
    }

    onRender() {

        return this.LifecycleInit();
                     
    }

    created() {

        this.isMessageBoundary = true;
    }

    /*
    * 组件初始化
    */    
    protected LifecycleInit() {

        var that = this;
        
        //创建视图面板
        var LifecyclePanel = document.createElement("div");

        LifecyclePanel.id = this.getUniqueId("LifecyclePanel");

        $(LifecyclePanel).css({

            "width": that.width,

            "height": that.height

        });

        $(LifecyclePanel).addClass("GfLifecycle");
        
        that._lifecyclePanel = LifecyclePanel;

        this.DiagramInit();

        return LifecyclePanel;
    }

    /*
    * 视图初始化
    */
    protected DiagramInit() {
        
        var that = this;

        //引用go.js
        that.includeJS(ComponentRoot.apppath + "/Platform/Content/Scripts/go.js");

        this._goJs = window["go"];

        this._goMake = this._goJs.GraphObject.make;

        //声明视图  
        var lifecycleDiagram;

        //初始化视图窗口
        lifecycleDiagram =

            //必须命名或引用DIV HTML元素
            that._goMake(that._goJs.Diagram,that._lifecyclePanel,
                {
                    //启动视图中间的所有内容,确保视图初始化的时候内容始终在视图的中心
                    initialContentAlignment: that._goJs.Spot.Center,

                    //鼠标滚轮事件放大和缩小而不是上下滚动
                    "toolManager.mouseWheelBehavior": that._goJs.ToolManager.WheelZoom,

                    //双击创建新节点数据
                    "clickCreatingTool.archetypeNodeData": {},

                    //双击创建新节点事件
                    "clickCreatingTool.insertPart": function (loc) {

                        //创建节点视图模型                                      
                        this.archetypeNodeData = that.CreateNewNodeModel();

                        return that._goJs.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },

                    //创建新链接数据
                    "linkingTool.archetypeLinkData": {},

                    //创建新链接事件
                    "linkingTool.insertLink": function (fromnode, fromport, tonode, toport) {

                        this.archetypeLinkData = that.CreateNewLinkModel();

                        return that._goJs.LinkingTool.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);

                    },

                    //启用撤消和重做
                    "undoManager.isEnabled": true,

                    //不允许内部剪切板复制
                    "allowClipboard": false,

                    isEnabled: false
                                        
                });

        //视图模型绑定唯一主键id
        lifecycleDiagram.model.nodeKeyProperty = "id";
   
        that._lifecycleDiagram = lifecycleDiagram;

        //节点模版初始化
        that.NodeTemplateInit();

        //链接模版初始化
        that.LinkTemplateInit();
               
        //创建一个用于向后台提交数据的数据模型,用于记录数据的增加,删除,修改        
        that.set("submitModel", []);
        
        //加载数据模型
        this.LoadModel();

        //注册视图模型修改监听
        that.ModelChangedListener();

    }

    /*
    * 节点模版初始化
    */
    protected NodeTemplateInit() {

        var that = this;

        //定义节点模板,节点外形
        that._lifecycleDiagram.nodeTemplate =

            that._goMake(that._goJs.Node, "Auto",

                //将节点的location位置属性绑定在视图模版内容的loc中

                //go.Point.parse:强制将实际的属性值转换为location位置属性,这里用于将源数据值转换为location

                //makeTwoWay将视图模型上的更改传播回数据,这里用于回传更改
                new that._goJs.Binding("location", "loc", that._goJs.Point.parse).makeTwoWay(that._goJs.Point.stringify),

                // 定义节点的外形，将环绕TextBlock
                that._goMake(that._goJs.Shape, "RoundedRectangle",
                    {
                        //节点外形圆角半径
                        parameter1: 5,

                        //节点颜色,渐变色从一个颜色到另一个颜色，从上到下（默认）
                        fill: that._goMake(that._goJs.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),

                        //节点外边框颜色,为null标识没有外边框
                        stroke: null,

                        //此形状是节点的端口，而不是整个节点
                        portId: "",

                        //获取或设置用户是否可以从此端口绘制链接
                        fromLinkable: true,

                        //获取或设置用户是否可以绘制从该端口的Node连接的链接
                        fromLinkableSelfNode: true,

                        //获取或设置用户是否可以从此端口绘制重复的链接
                        fromLinkableDuplicates: true,

                        //获取或设置用户是否可以向该端口绘制链接
                        toLinkable: true,

                        //获取或设置用户是否可以绘制连接到此端口的节点的链接
                        toLinkableSelfNode: true,

                        //获取或设置用户是否可以向该端口绘制重复的链接
                        toLinkableDuplicates: true,

                        //光标悬停在节点上鼠标的外形
                        cursor: "pointer"

                    }),
                //定义节点的文字内容
                that._goMake(that._goJs.TextBlock,
                    {
                        //字体
                        font: "bold 11pt helvetica, bold arial, sans-serif",

                        //编辑文本自动更新模型数据
                        editable: true,

                        margin: new that._goJs.Margin(5, 7, 5, 7)
                    },

                    //回传text的更改
                    new that._goJs.Binding("text").makeTwoWay()
                )
            );

        //定义节点选择模版,节点选中处理
        that._lifecycleDiagram.nodeTemplate.selectionAdornmentTemplate =

            //装饰spot
            that._goMake(that._goJs.Adornment, "Spot",

                that._goMake(that._goJs.Panel, "Auto",

                    //选中之后的外形
                    that._goMake(that._goJs.Shape, { fill: null, stroke: "#00CCFF", strokeWidth: 1 }),

                    //选择的外形与节点的边距为0
                    that._goMake(that._goJs.Placeholder)

                ),

                // 在右上角创建一个“下一个”节点的按钮。
                that._goMake("Button",
                    {
                        //按钮显示在右上角
                        alignment: that._goJs.Spot.TopRight,

                        //调用创建新节点方法
                        click: addNodeAndLink

                    },
                    //按钮外形
                    that._goMake(that._goJs.Shape, "PlusLine", { width: 6, height: 6 })
                )
            );

        function addNodeAndLink(e, obj) {

            //节点
            var adornment = obj.part;

            //视图
            var diagram = e.diagram;

            //开始一个"增加状态"的事务
            diagram.startTransaction("Add State");

            // 获取用户单击按钮的节点数据。
            var fromNode = adornment.adornedPart;

            var fromData = fromNode.data;

            //创建一个新的“状态”数据对象，定位在节点的右侧。
            var toData = that.CreateNewNodeModel();

            //获取用户单机按钮的节点位置
            var p = fromNode.location.copy();

            //新节点的位置往右偏移200
            p.x += 200;

            //"LOC"属性是字符串，而不是点对象。
            toData["loc"] = that._goJs.Point.stringify(p);

            // 添加新的节点数据的模型
            var model = diagram.model;
            model.addNodeData(toData);

            // 从旧节点数据创建链接数据到新的节点数据
            var CreateModel = that.CreateNewLinkModel();

            var linkdata = {

                id: CreateModel["id"],

                text: CreateModel["text"],

                //旧结点
                from: model.getKeyForNodeData(fromData),

                //新节点
                to: model.getKeyForNodeData(toData),

            };
            //并添加链接数据模型
            model.addLinkData(linkdata);

            // 选择新节点
            var newnode = diagram.findNodeForData(toData);

            diagram.select(newnode);

            //结束一个"增加状态"的事务
            diagram.commitTransaction("Add State");

            // 如果新节点已关闭屏幕，则滚动图表以显示新节点。
            diagram.scrollToRect(newnode.actualBounds);
        }

    }

    /*
    * 链接模版初始化
    */
    protected LinkTemplateInit() {
        
        var that = this;
      
        //定义链接模版,链接的外形
        that._lifecycleDiagram.linkTemplate =

            //整个链接面板
            that._goMake(that._goJs.Link,
                {
                    //曲线类型,"Bezier"曲线
                    curve: that._goJs.Link.Bezier,

                    //获取或设置路由的计算方式
                    adjusting: that._goJs.Link.Stretch,

                    //获取或设置用户是否可以重塑曲线
                    reshapable: true,

                    //获取或设置用户是否可以重新连接从末端的现有链接
                    relinkableFrom: true,

                    //获取或设置用户是否可以重新连接到端的现有链接
                    relinkableTo: true,

                    //获取或设置端段距离实际端口多远
                    toShortLength: 3

                },

                //绑定的位置回传到模型
                new that._goJs.Binding("points", "points").makeTwoWay(),

                //弯曲度
                new that._goJs.Binding("curviness"),

                that._goMake(that._goJs.Shape,

                    //链接的宽度
                    { strokeWidth: 2 }

                ),

                that._goMake(that._goJs.Shape,  // 箭头
                    {
                        //箭头类型
                        toArrow: "standard",

                        //获取或设置描绘如何用笔绘制几何图形的画笔或字符串
                        stroke: null

                    }
                ),
                //面板
                that._goMake(that._goJs.Panel, "Auto",

                    //标签的背景，它变得透明周围的边缘。
                    that._goMake(that._goJs.Shape,
                        {
                            //链接颜色,渐变色从一个颜色到另一个颜色，从上到下（默认）
                            fill: that._goMake(that._goJs.Brush, "Radial",
                                { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),

                            //链接外边框颜色,为null标识没有外边框
                            stroke: null
                        }),

                    that._goMake(that._goJs.TextBlock, that.newLinkName,  // 标签文本
                        {
                            //标签对齐方式
                            textAlign: "center",

                            //标签字体
                            font: "9pt helvetica, arial, sans-serif",

                            //边距
                            margin: 4,

                            //启用就地编辑
                            editable: true
                        },

                        //标签数据回传
                        new that._goJs.Binding("text").makeTwoWay())

                )
            );

    }

    /**
    * 加载视图模型数据
    */
    protected LoadModel() {

        var that = this;

        var diagram = that._lifecycleDiagram;

        if (!that.lifecycleId) {
            return;
        }

        window["platformAjax"]({

            url: ComponentRoot.APIs.getLifecycleInfo,

            type: "post",

            data: { lifecycleId: that.lifecycleId },

            success: function (result) {

                //将原始值存入模型中
                var initialModel = that._initialModel;

                var model = eval("(" + result.Data + ")");
                
                var diagramModel = { "class": window["go"].GraphLinksModel, "nodeKeyProperty": "id", "nodeDataArray": [], "linkDataArray": [] };

                $(model.ListLifecycleState).each(function () {

                    diagramModel.nodeDataArray.push({ "id": this.Id, "text": this.Label, "loc": this.Loc });

                    initialModel.push({ "id": this.Id, "name": this.Name, "label": this.Label, "loc": this.Loc });
                });

                $(model.ListLifecycleTransition).each(function () {

                    diagramModel.linkDataArray.push({ "id": this.Id, "text": this.Label, "points": that.LinkPointsToNumberArray(this.Points), "from": this.From, "to": this.To });

                    initialModel.push({ "id": this.Id, "name": this.Name, "label": this.Label, "points": this.Points, "from": this.From, "to": this.To });

                });

                diagram.model = window["go"].Model.fromJson(JSON.stringify(diagramModel));
            }
        });
    }

    /**
    * 视图模型改变监听
    */
    protected ModelChangedListener() {

        var that = this;
              
        //注册模型修改事件监听,用于监听数据的更改并向后台提交数据
        that._lifecycleDiagram.addModelChangedListener(function (e) {

            //模型数据插入
            if (e.change == that._goJs.ChangedEvent.Insert) {

                that.ModelChangedListener_Insert(e);

                that.CheckIsModify();

            }
            
            //模型数据删除
            if (e.change == that._goJs.ChangedEvent.Remove) {

                that.ModelChangedListener_Delete(e);

                that.CheckIsModify();

            }
            //模型数据修改
            if (e.change == that._goJs.ChangedEvent.Property) {

                that.ModelChangedListener_Modify(e);

                that.CheckIsModify();
            }
                      
        });
    }

    /**
    * 检查组件是否修改  
    */
    protected CheckIsModify() {

        if (this._submitModel.length > 0) {

            this.setModified(true);
       
        } else {

            this.setModified(false);

        }
    }

    /**
    * 监听新增模型(在ModelChangedListener方法中使用)
    * @param modelChangeObject 模型修改对象
    */
    protected ModelChangedListener_Insert(modelChangeObject) {
        
        var that = this;

        var item = {};

        item["id"] = modelChangeObject.newValue.id;

        item["objektState"] = ObjektState.Created;

        item["name"] = modelChangeObject.newValue.text;

        item["label"] = modelChangeObject.newValue.text;

        item["source"] = that.lifecycleId;

        //节点数据新增
        if (modelChangeObject.modelChange == "nodeDataArray") {

            item["loc"] = modelChangeObject.newValue.loc;

            this._submitModel.push(item);
        }
        //链接数据新增
        else if (modelChangeObject.modelChange == "linkDataArray"){

            item["points"] = that.LinkPointsTostring(modelChangeObject.newValue.points);

            item["from"] = modelChangeObject.newValue.from;

            item["to"] = modelChangeObject.newValue.to;

            this._submitModel.push(item);

        }
        
    }

    /**
    * 监听修改模型(在ModelChangedListener方法中使用)
    * @param modelChangeObject 模型修改对象
    */
    protected ModelChangedListener_Modify(modelChangeObject) {

        var that = this;

        //修改的属性名                             
        var propertyName = modelChangeObject.propertyName;

        //修改的属性值
        var newValue = modelChangeObject.newValue;

        if (propertyName == "points") {

            newValue = that.LinkPointsTostring(newValue);

        }
        if (propertyName == "from" || propertyName == "to") {

            newValue = newValue;

        }
        if (propertyName == "text") {

            propertyName = "label";

        }


        //查询修改的数据是否在原始值模型中
        var initialModelIndex = Utils.ObjectArraySearch(that._initialModel, "id", modelChangeObject.object.id);

        //原始值
        var initialValue;

        if (initialModelIndex != -1) {

            initialValue = that._initialModel[initialModelIndex][propertyName];

        }

        //查询修改的数据是否在数据提交模型中
        var submitModelIndex = Utils.ObjectArraySearch(that._submitModel, "id", modelChangeObject.object.id);

        //如果在数据提交模型中
        if (submitModelIndex != -1) {

            //与数据原始值不同则更新到提交模型中
            if (initialValue != newValue) {

                //更新修改的值                        
                that._submitModel[submitModelIndex][propertyName] = newValue;

                //如果属性为text,那么name和label一起修改
                if (propertyName == "label") {

                    if (initialValue) {

                        if (that._initialModel[initialModelIndex]["name"] == that._initialModel[initialModelIndex]["label"]) {

                            that._submitModel[submitModelIndex]["name"] = newValue;

                        }
                    } else {

                        that._submitModel[submitModelIndex]["name"] = newValue;

                    }
                }

                //判断是否为新增数据
                if (that._submitModel[submitModelIndex].objektState != "C") {

                    that._submitModel[submitModelIndex].objektState = "U";

                }
            }
            //与原始值数据相同则删除该属性
            else {

                //删除这条属性
                delete that._submitModel[submitModelIndex][propertyName];

                //如果属性为text,那么name和label一起删除
                if (propertyName == "label") {

                    if (that._initialModel[initialModelIndex]["name"] == that._initialModel[initialModelIndex]["label"]) {

                        delete that._submitModel[submitModelIndex]["name"];

                    }
                }
                //如果删除属性后只剩下id属性,那么整条记录删除
                var propertyCount = that.getPropertyCount(that._submitModel[submitModelIndex]);

                if (propertyCount == 2) {

                    that._submitModel.splice(submitModelIndex, 1);

                }
            }
        }
        //不在数据提交模型中,则新增一条
        else {

            //与数据原始值不同则插入到提交模型中
            if (newValue != initialValue) {

                var model = {};

                model["id"] = modelChangeObject.object.id;

                model[propertyName] = newValue;

                if (propertyName == "text") {

                    if (that._initialModel[initialModelIndex]["name"] == that._initialModel[initialModelIndex]["label"]) {

                        model["name"] = newValue;

                    }
                }
                model["objektState"] = "U";

                that._submitModel.push(model);
            }

        }

    }

    /**
    * 监听删除模型(在ModelChangedListener方法中使用)
    * @param modelChangeObject 模型修改对象
    */
    protected ModelChangedListener_Delete(modelChangeObject) {

        var that = this;
        //查询删除的数据是否在数据提交模型中                
        var submitModelIndex = Utils.ObjectArraySearch(that._submitModel, "id", modelChangeObject.oldValue.id);

        //如果在数据提交模型中
        if (submitModelIndex != -1) {

            //不是新增数据则将状态改为删除
            if (that._submitModel[submitModelIndex].objektState != ObjektState.Created) {

                that._submitModel[submitModelIndex].objektState = ObjektState.Deleted;

            }
            //是新增数据直接删除
            else {

                that._submitModel.splice(submitModelIndex, 1);

            }
        }
        //不在数据提交模型中,则新增一条
        else {

            var item = {};

            item["id"] = modelChangeObject.oldValue.id;

            item["objektState"] = ObjektState.Deleted;

            that._submitModel.push(item);
        }


    }

    /**
    * 链接的Points转换为string
    */    
    protected LinkPointsTostring(points) {

        if (points) {

            var strPoint = "";

            var pointsLength = points.n.length;

            $(points.n).each(function (index) {

                strPoint += this.x + ",";

                if (pointsLength - 1 == index) {

                    strPoint += this.y;

                }
                else {

                    strPoint += this.y + ",";

                }
            });

            return strPoint;

        }
        else {

            return points;

        }

    }

    /**
    * 链接的Points转换为数字数组
    */
    protected LinkPointsToNumberArray(points) {

        if (points) {

            var strArray = points.split(",");

            var floatArray = [];

            $(strArray).each(function (index) {

                floatArray.push(Number(this));

            });

            return floatArray;

        }
        else {

            return points;

        }

    }

    /**
    * 创建新节点模型
    */
    protected CreateNewNodeModel() {
       
        var ModeData = {};

        var model = this.newObjekt("LifecycleState");

        ModeData["id"] = model.id;

        ModeData["text"] = this.newNodeName;

        return ModeData;    

    }

    /**
    * 创建新链接模型
    */
    protected CreateNewLinkModel() {

        var ModeData = {};

        var model = this.newObjekt("LifecycleTransition");

        ModeData["id"] = model.id;

        ModeData["text"] = this.newLinkName;

        return ModeData;  

    }

    //得到视图数据(临时)
    public GetDiagramData() {

        this.SaveDiagramData();

        return this._lifecycleDiagram.model.toJson();
    }

    /**
    * 保存视图数据
    */    
    protected SaveDiagramData() {
        
        this.sendMessage(new UIMessageSaving());

    }


    /**
    * 切换编辑状态
    */
    public SwitchState() {

        if (this.state == UIState.browse) {

            this.sendMessage(new UIMessageStateSwitching(this._state, UIState.edit));

        } else {


            this.sendMessage(new UIMessageStateSwitching(this._state, UIState.browse));
        }

    }

    /**
    * 接收消息
    */   
    onRecievedMessage(message: UIMessage, source: UIComponentBase) {
               
        //状态转换前
        if (message instanceof UIMessageStateSwitching) {


        }
        //状态转换后
        else if (message instanceof UIMessageStateSwitched) {

            if (this.state == UIState.browse) {

                if (this._submitModel.length > 0) {

                    this._submitModel = [];
                           
                    this.LoadModel();

                }
                this.lifecycleDiagram.setProperties({

                    isEnabled: false

                });

            } else {
               
                this.lifecycleDiagram.setProperties({

                    isEnabled: true

                })

            }
        }
        //保存前
        else if (message instanceof UIMessageSaving) {
            
            if (!this.CheckFreeState()) {

                message.preventDoing("存在游离状态!", false);

            }


        }
        //保存后
        else if (message instanceof UIMessageSaved){

            if (this._submitModel.length>0) {

                this._submitModel = [];

                this.CheckIsModify();

                this.LoadModel();

            }

        }

        super.onRecievedMessage(message, source);

    }

    /**
    * 检测游离状态
    */
    protected CheckFreeState(): boolean {
        
        var check = true;

        var nodeModel = this._lifecycleDiagram.model.nodeDataArray;

        var linkModel = this._lifecycleDiagram.model.linkDataArray;

        $(nodeModel).each(function () {

            var fromIndex = Utils.ObjectArraySearch(linkModel, "from", this.id);

            var toIndex = Utils.ObjectArraySearch(linkModel, "to", this.id);

            if (fromIndex == -1 && toIndex == -1) {

                check = false;

                return false;

            }

        });

        return check;
    }



    /**
    * 检测开始状态
    */
    public CheckStartState(): boolean {



        return false;

    }



    /**
    * 数据回传
    */
    onObjektDataWriteback() {
        
        var that = this;
                
        $(that._submitModel).each(function () {
                   
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


    

}
Lifecycle.register();
