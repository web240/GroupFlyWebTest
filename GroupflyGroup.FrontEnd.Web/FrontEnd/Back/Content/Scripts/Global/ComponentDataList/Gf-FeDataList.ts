/*
****属性*****







****方法****
设置数据表格
document.querySelector("xx").SetDataGrid(columns,frozenColumns)
columns:设置的数据列
frozenColumns:设置的冻结列

查询数据
document.querySelector("xx").SearchData(url,dataparam,pagenumber)
url:请求的数据源Url(注意此异步方法里必须要有(pageNumber, pageSize, param)三个参数
dataparam:数据参数
pagenumber:请求第几页数据(不写为请求当前页数据)

得到选择的数据行
document.querySelector("xx").GetSelections()

设置行列
document.querySelector("xx").SetMergeCells(mergeCells)
mergeCells设置的行列

****事件****
 表格控件数据加载完成，并呈现后初始化
 document.querySelector("xx").registerEventHandler("SetDataGridLoadSuccess", function (row, data) {});
 row:行
 data:数据集合

 数据查询成功后事件  
 document.querySelector("xx").registerEventHandler("AfterSelectPage", function (result) {})
 result:查询完成后得到的数据集合
*/

//class GfFeDataList extends CustomElement {

//    constructor(extension?: ICustomElementExtend) {
//        super(extension);
//        this.autoInit = true;
//        this.elementName = "Gf-FeDataList";        
//        this.addMethod("SetDataGrid", "function(columns,frozenColumns){control.SetDataGrid(this,columns,frozenColumns) }");        
//        this.addMethod("SearchData", "function(url,dataparam,pagenumber){control.SearchData(this,url,dataparam,pagenumber) }");
//        this.addMethod("GetSelections", "function(){return control.GetSelections(this) }");
//        this.addMethod("SetMergeCells", "function(mergeCells){control.SetMergeCells(this,mergeCells) }");
       
//    }

//    protected initContent(element) {
//        var container = this.buildControls(element);
//    }

//    //设置行列
//    public SetMergeCells(element,mergeCells)
//    {
//        var DataListTable = $(element.get("DataListTable"));
//        $(DataListTable).datagrid('mergeCells', mergeCells);

//    }



//    //返回选中行的实例
//    protected GetSelections(element)
//    {
        
//        var DataListTable = $(element.get("DataListTable"));

//        return $(DataListTable).datagrid("getSelections");
//    } 


//    //查询方法
//    protected SearchData(element, url, dataparam,pagenumber)
//    {
//        element.set("ActionUrl", url);
//        element.set("DataParam", dataparam);
//        var DataListTable = $(element.get("DataListTable"));         
//        if (pagenumber != "undefine" && pagenumber != "") {
//            $(DataListTable).datagrid("getPager").pagination('select', pagenumber);
//        }
//        else{
//            $(DataListTable).datagrid("getPager").pagination('select');
//        }
//    }


//    //设置列表项
//    protected SetDataGrid(element, columns, frozenColumns)
//    {
       
//        var that = this;             
//        var DataListTable = $(element.get("DataListTable"));

//        $(DataListTable).datagrid({
//            rownumbers: true,
//            pagination: true,
//            onLoadSuccess: function (row, data) {               //表格控件数据加载完成，并呈现后初始化
//                element.triggerEventHandler("SetDataGridLoadSuccess", [row,data]);
//            },
//            columns: [
//                columns
//            ],
//            frozenColumns: [
//                frozenColumns
//            ]
//        });

//        $(DataListTable).datagrid('getPager').pagination({
//            pageNumber: 1, //默认显示第几页
//            pageSize: 10,
//            pageList: [5, 10, 20, 50, 100],
//            beforePageText: '第',
//            afterPageText: '页     共{pages}页',
//            displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
//            onSelectPage: function (pageNumber, pageSize) {
//                that.OnSelectPage(pageNumber, pageSize, element); 
//            }
//        });
        
//    }


//    protected OnSelectPage(pageNumber, pageSize, element)
//    {
       
//        if (pageNumber < 1) {

//            pageNumber = 1;
//        }

//        var DataListTable = $(element.get("DataListTable"));
//        $(DataListTable).datagrid("options").loadMsg = "正在加载...";
//        $(DataListTable).datagrid("loading");

//        var DataParam = element.get("DataParam");

//        window["platformAjax"]({
//            url: element.get("ActionUrl"),
//            type: "post",
//            data: { pageNumber: pageNumber, pageSize: pageSize, param: DataParam},
//            success: function (result) {
            
//                var data = eval("(" + result.Data + ")");
//                $(DataListTable).datagrid('loadData', data);
//                $(DataListTable).datagrid("loaded");

//                $(DataListTable).datagrid('resize', {                        
//                    height: "100%",
//                    width:"100%"
//                 });
               
//                element.triggerEventHandler("AfterSelectPage", [result]);
//            }
//        });

//    }



//    protected buildControls(element) {
        
//        //初始化运行时状态对象
//        element.xtag.runtime = {};

//        //控件容器
//        var container = document.createElement("div");
//        $(container).addClass("feDataList");
//        $(container).css("height", "100%");
//        $(container).css("width", "99.3%");
//        element.appendChild(container);

//        //控件表格
//        var table = document.createElement("table");     
//        $(container).append(table);

//        element.set("DataListTable", table);
        
//    }

//}