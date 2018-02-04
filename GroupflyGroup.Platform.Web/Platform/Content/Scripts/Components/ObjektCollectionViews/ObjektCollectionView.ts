/// <reference path="../UIComponentBase.ts" />

/** 对象集合视图 */
class ObjektCollectionView extends UIComponentBase {
    
    constructor() {
        super();
    }
    static elementName = "Gf-ObjektCollectionView".toLowerCase();
    
    /** 创建工具栏 */
    protected createToolbar: Function;

    /** 本地修改 */
    private _localChanges:Map<string,ObjektModel> = new Map<string,ObjektModel>();

    /** 保存数据api */
    get saveurl(){
        return this.getAttribute("saveurl");
    }
    set saveurl(val){
        this.setAttribute("saveurl",val);
    }
    
    get outParams(){
        return this.get("outParams") || [];
    }
    /** 是否包含子类 */
    get hassubklass(){
        return this.safeToString(this.getAttribute("hassubklass")).toLowerCase() == 'true';
    }
    set hassubklass(val){
        this.setAttribute("hassubklass",val.toString());
    }
    /** 是否禁止修改 */
    get forbidedit(){
        return this.safeToString(this.getAttribute("forbidedit")).toLowerCase() == 'true';
    }
    set forbidedit(val){
        this.setAttribute("forbidedit",val.toString());
    }
    /** 是否回收站 */
    get trashstation(){
        return this.safeToString(this.getAttribute("trashstation")).toLowerCase() == 'true';
    }
    set trashstation(val){
        this.setAttribute("trashstation",val.toString());
    }
    /** 排序（升序：asc，降序：desc） */
    get isasc(){
        return this.getAttribute("isasc");
    }
    set isasc(val){
        this.setAttribute("isasc",val);
    }
    /** 是否分页 */
    get pagination(){
        return this.safeToString(this.getAttribute("pagination")).toLowerCase() == 'true';
    }
    set pagination(val){
        this.setAttribute("pagination",val.toString());
    }
    /** 是否禁用放弃修改提示 */
    get forbidUpdateTip(){
        return this.safeToString(this.getAttribute("forbidUpdateTip")).toLowerCase() == 'true';
    }
    set forbidUpdateTip(val){
        this.setAttribute("forbidUpdateTip",val.toString());
    }
    /** 是否默认显示查询条件 */
    get showquery(){
        return this.safeToString(this.getAttribute("showquery")).toLowerCase() == 'true';
    }
    set showquery(val){
        this.setAttribute("showquery",val.toString());
    }
    /** 是否单选 */
    get singleselect(){
        return this.safeToString(this.getAttribute("singleselect")).toLowerCase() == 'true';
    }
    set singleselect(val){
        this.setAttribute("singleselect",val.toString());
    }
    /** 是否自动查询 */
    get autoselect(){
        return this.safeToString(this.getAttribute("autoselect")).toLowerCase() == 'true';
    }
    set autoselect(val){
        this.setAttribute("autoselect",val.toString());
    }

    /** 筛选器 */
    get filter(){
        return this.getAttribute("filter");
    }
    set filter(val){
        this.setAttribute("filter",val);
    }

    /** 附加属性 */
    get relatedcolumns(){
        return this.getAttribute("relatedcolumns");
    }
    set relatedcolumns(val){
        this.setAttribute("relatedcolumns",val);
    }
    /** 获取新对象api */
    get newrowurl(){
        return this.getAttribute("newrowurl");
    }
    set newrowurl(val){
        this.setAttribute("newrowurl",val);
    }
    /** 导出数据api */
    get exporturl(){
        return this.getAttribute("exporturl");
    }
    set exporturl(val){
        this.setAttribute("exporturl",val);
    }
    /** 获取数据api */
    get dataurl(){
        return this.getAttribute("dataurl");
    }
    set dataurl(val){
        this.setAttribute("dataurl",val);
    }
    /** 排序属性名 */
    get orderby(){
        return this.getAttribute("orderby");
    }
    set orderby(val){
        this.setAttribute("orderby",val);
    }
    /** name属性名称 */
    get namefield(){
        return this.getAttribute("namefield") || PropertyNames.combinedLabel;
    }
    set namefield(val){
        this.setAttribute("namefield",val);
    }
    /** ID属性名称 */
    get idfield(){
        return this.getAttribute("idfield") || PropertyNames.id;
    }
    set idfield(val){
        this.setAttribute("idfield",val);
    }
    /** 类名 */
    get klass(){
        return this.getAttribute("klass");
    }
    set klass(val){
        this.setAttribute("klass",val);
    }
    /** 标题 */
    get title(){
        return this.getAttribute("title");
    }
    set title(val){
        this.setAttribute("title",val);
    }
    /** 加载数据提示消息 */
    get loadmsg(){
        return this.getAttribute("loadmsg");
    }
    set loadmsg(val){
        this.setAttribute("loadmsg",val);
    }
    /** 工具栏隐藏按钮 */
    get hidetools(){
        return this.getAttribute("hidetools");
    }
    set hidetools(val){
        this.setAttribute("hidetools",val);
    }

    /** 工具栏 */
    get toolbar(){
        return this.get("toolbar") as ToolBar;
    }

    protected onRecievedMessage(message:UIMessage,source:UIComponentBase){
        if(message instanceof UIMessageExported){
            this.exportExcel();
        }
        else if(message instanceof UIMessageShownQueryChanged){
            var ShownQueryChanged = message as UIMessageShownQueryChanged;
            this.toggleQuery(ShownQueryChanged.isShowQuery);
        }
        else if(message instanceof UIMessageIncludeSubKlassChanged){
            var IncludeSubKlassChanged = message as UIMessageIncludeSubKlassChanged;
            this.subclassChanged(IncludeSubKlassChanged.isIncludeSubKlass);
        }
        else if(message instanceof UIMessageRefreshed){
            this.reload();
        }
        else if(message instanceof UIMessageObjektDeleted){
            this.delObjekts();
        }
        else if(message instanceof UIMessageObjektCreated){
            this.addNewRow();
        }
        else if(message instanceof UIMessageObjektOpend){
            this.openObjekt();
        }
        else if(message instanceof UIMessageExported){
            this.exportExcel();
        }
        else if(message instanceof UIMessageSaved){
            this.reload();
        }
        
        
        super.onRecievedMessage(message,source);
    }

    /**
     * 添加行回调
     * @param eventHandler 回调函数
     */
    public onAddRow(eventHandler:(row:ObjektModel)=>void){
        this.addHook(EventNames.AddRow, eventHandler);
    }

    /**
     * 加载数据完成回调
     * @param eventHandler 回调函数
     */
    public onLoadSuccess(eventHandler:()=>void){
        this.addHook(EventNames.LoadSuccess, eventHandler);
    }
    
    public addNewRow(row?:ObjektModel){
        if(!row){
            row = this.getNewRow();
        }
        row.$ = ObjektState.Created;
        var rows = JSON.parse(this.get("data") || "[]"); 
        rows.push(row);
        this.set("data",JSON.stringify(rows));
        this.insertRow({ index: 0, row: row });
        this.refreshRowIndex();
        this.selectRow(0);
        this.unSelectRows(0);
        this.beginEditRow(0);
        this.fireHook(EventNames.AddRow,[row]);
    }
    
    public beginEditRow(index){
        var element = this;
        var inputs = $(this).find("[datagrid-row-index='" + index + "']").find("[isUIComponent='true']");
        inputs.each(function(){
            var component = this as BasePropertyView;
            if(!component.readonly){
                var row = element.getRow(index) as ObjektModel;
                if(!component.createonly || (component.createonly && row.$ == ObjektState.Created)){
                    component.state = UIState.edit;
                }
            }
        });
        $(this.get("table")).datagrid('fixRowHeight',index);
    }
    
    public cancelEditRow(index) { 
        $(this.get("table")).datagrid('cancelEdit', index);
    }
    
    public cancelEditRows(index?){
        var rows = this.getRows();
        for(var key in rows){
            var row = rows[key];
            if(row.editing){
                var rowindex = this.getRowIndex(row);
                if(index != rowindex)
                    this.cancelEditRow(rowindex);
            } 
        } 
    }
    
    public deleteRow(row){
        var index = this.getRowIndex(row);
        $(this.get("table")).datagrid('deleteRow', index);
        this.recordDelete(row);
    }
    
    public endEditRow(index){
        $(this.get("table")).datagrid('endEdit', index);
    }
    
    public endEditRows(index?){
        var validate = true;
        var element = this;
        var rows = this.getRows();
        for(var key in rows){
            var row = rows[key];
            var rowindex = this.getRowIndex(row);
            if(index != rowindex){
                if(element.validate(rowindex)){
                    this.endEditRow(rowindex);
                }
                else{
                    validate = false;
                }
            }
        }
        return validate;
    }
    
    public exportExcel(){
        var grid = this;
        var param = this.get("params") ? JSON.stringify(this.get("params")) : "";
        grid.ajax({
            url: grid.exporturl || ComponentRoot.APIs.listExport,
            data : {param : param, klass : grid.klass},
            success: function (result) {
                $(result.Data).table2excel({
                    exclude: ".noExl",
                    name: grid.klass,
                    filename: grid.klass
                });
            }
        });
    }
    public getData(){
        return $(this.get("table")).datagrid('getData');
    }
    public getOptions(){
        return $(this.get("table")).datagrid('options');
    }
    
    public getSelectedRow(){
        return $(this.get("table")).datagrid('getSelected');
    }
    public getSelectedRows():ObjektModel[]{
        return $(this.get("table")).datagrid('getSelections');
    }
    public getPager(){
        return $(this.get("table")).datagrid('getPager'); 
    }
    public getRows(){
        return $(this.get("table")).datagrid('getRows');
    }
    public getRowIndex(row){
        return $(this.get("table")).datagrid('getRowIndex',row);
    }
    
    public getCellValue(id, field){
        var rows = JSON.parse(this.get("data")); 
        var value = "";
        $.map(rows,function(row,i){
            if(row.id == id){
                value = row[field];
            }
        });
        return value;
    }
    public insertRow(obj){
        $(this.get("table")).datagrid('insertRow', obj);
    }
    
    public loadData(data){
        $(this.get("table")).datagrid('loadData',data); 
        this.restoreQueryState();
    }
    public loadDataPage(page, rows) {
        var grid = this;
        if(page < 1) page = 1;
        grid.loading();
        this.set("currentPage", page);
        this.set("currentRows", rows);
        
        var orderby = this.get("orderby");
        var isAsc = this.get("isAsc");
        var param = (this.get("params") ? this.get("params").concat(this.outParams) : this.outParams) as Array<QueryParamModel>;
        
        var istrash = { field:"isTrash", type : "=", value : grid.trashstation } as QueryParamModel;
        var data = new QueryModel();
        data.pageIndex = page;
        data.pageSize = rows;
        data.param = param.concat(istrash);
        data.klass = grid.klass;
        data.includeSubKlass = grid.hassubklass;
        data.pageIndex = page;
 
        if(grid.relatedcolumns){
            data.relatedProperties = grid.relatedcolumns;
        }
        if(grid.filter){
            data.filter = grid.filter;
        }
        if(orderby){
            data.orderBy = orderby;
            data.isAsc = isAsc;
        }
        grid.getObjektCollection(
            data,
            function(model) {
            var data = { total:model.total, rows: model.objekts };
            if(!grid.pagination){
                var pageList = new Array();
                pageList.push(data.rows.length);
                $(grid.get("pager")).pagination({
                    pageSize: data.rows.length,
                    pageList: pageList
                }); 
                data.total = data.rows.length;
                grid.set("currentPage",1);
                grid.set("currentRows",data.rows.length);
            }
            grid.set("data", JSON.stringify(data.rows)); 
            grid.loadData(data);
            grid.setModified(false);
            grid._localChanges.clear();
        },
        function(result) {
            grid.loaded();
            grid.set("loaded", true);
            grid.setSelectedTip();
        });
    }
    public loading(){
        $(this.get("table")).datagrid('loading');
    }
    public loaded(){
        $(this.get("table")).datagrid('loaded');
    }
    public queryData(outParams?){
        if(outParams){
            this.set("outParams",outParams);
        }
        var params = new Array();
        var columns = this.get("columns")[0];
        $(columns).each(function() {
            if(!this.hidden && this.query){
                var param = this.query["getValue"]();
                if(param){
                    params.push(param);
                }
                this.param = param;
            }
        });
        this.set("params",params);
        this.select(1);
    }
    public refreshRow(index){
        $(this.get("table")).datagrid('refreshRow', index);
    }
    public reload(){
        if(this.get("currentPage") && this.get("currentRows"))
        this.loadDataPage(this.get("currentPage"), this.get("currentRows"));
    }
    public reloadstatic(){
        this.loadData(this.getData());
    }
    public restoreQueryState(){
        var columns = this.get("columns")[0];
        $(columns).each(function() {
            if(!this.hidden && this.param && this.query){
                this.query.setValue(this.param);
            }
        });
    }

    public select(index){
        $(this.get("pager")).pagination('select',index);
    }
    public selectRow(index){
        $(this.get("table")).datagrid('selectRow', index);
    }
    
    public selectAll(){
        $(this.get("table")).datagrid('selectAll');
    }

    public toggleQuery(isShow){
        this.showquery = isShow;
        var clear = this.get("clear");
        var array = this.get("columns")[0];
        var heightAdjust = 0;
        var headerHeight = $(this).find(".datagrid-header").height();
        var bodyHeight = $(this).find(".datagrid-body").height();
        if(isShow) {
            headerHeight += 24;
            bodyHeight -= 24;
        } 
        else {
            headerHeight -= 24;
            bodyHeight += 24;
        } 
        $(this).find(".datagrid-header").css("height",headerHeight);
        $(this).find(".datagrid-header").find(".datagrid-htable").css("height",headerHeight); 
        $(this).find(".datagrid-body").css("height",bodyHeight);

        $(array).each(function() {
            if(!this.hidden){
                var query = this.query;
                if(isShow){ 
                    $(query).show(); 
                    $(clear).show(); 
                }
                else{ 
                    $(query).hide();
                    $(clear).hide();
                }
            }
        });
    }

    public unSelectRow(index){
        $(this.get("table")).datagrid('unselectRow', index);
    }

    public unSelectRows(index?){
        var rows = this.getSelectedRows();
        for(var row of rows){
            var rowindex = this.getRowIndex(row);
            if(index != rowindex)
                this.unSelectRow(rowindex);
        } 
    }

    public unSelectAll(){
        $(this.get("table")).datagrid('unselectAll');
    }

    public updateRow(row,select){
        var index = this.getRowIndex(row);
        var rows = JSON.parse(this.get("data"));
        rows = window["removeObjFromArray"](rows,'id',row.id);
        rows.push(row);
        this.set("data",JSON.stringify(rows));
        $(this.get("table")).datagrid('updateRow',{ 
            index: index,
            row : row
            });
        this.refreshRow(index);
        if(select){
            this.selectRow(index);
            this.restoreSelection();
        }
    }
    
    protected recordDelete(row:ObjektModel) {
        var element = this;
        var changes = element._localChanges;
        
        if (changes.has(row.id)) {
            var changedrow = changes.get(row.id);
            if (changedrow.$ == ObjektState.Created) {
                delete changes[row.id];
            }
            else {
                changedrow.$ = ObjektState.Deleted;
            }
        }
        else {
            if (row.id) {
                var newChange = new ObjektModel();
                newChange.id = row.id;
                newChange.$ = ObjektState.Deleted;
                changes.set(newChange.id,newChange);
            }
        }
        element.setModified(changes.size > 0);
    }

    protected recordCreate(row:ObjektModel){
        var element = this;
        var changes = element._localChanges;
        
        if (!changes.has(row.id)) {
            var newChange = new ObjektModel();
            newChange.id = row.id;
            newChange.$ = ObjektState.Created;
            changes.set(newChange.id,newChange);
        }
        element.setModified(changes.size > 0);
    }

    protected recordChange(row:ObjektModel, field, value) {
        var element = this;
        var changes = element._localChanges;

        if (changes.has(row.id)) {
            changes.get(row.id)[field] = value;
        }
        else {
            var newChange = new ObjektModel();
            newChange.id = row.id;
            newChange.$ = ObjektState.Updated;
            newChange[field] = value;
            changes.set(newChange.id, newChange);
        }
        element.setModified(changes.size > 0);
    }

    protected fieldChanged(row, field) {
        var changes = this._localChanges;
        var change = changes[row.id];
        if (change) {
            return !(change[field] == null);
        }
        else {
            return false;
        }

    }

    protected buildColums() {

        var element = this;
        var columns = element.getElementsByTagName("Gf-Column");
        var value = "[[";
        var arr = new Array();
        for (var i = 0; i < columns.length; i++) {
            var obj:any = columns[i];
            
            var hidden = element.safeToString($(obj).attr("ishidden")).toLowerCase() == 'true';
            var column:ObjektCollectionColumn = {
                id: this.getUniqueId("column" + i),
                field: $(obj).attr("field"),
                datatype: $(obj).attr("datatype"),
                label: $(obj).attr("title"),
                title: $(obj).attr("title"),
                description: $(obj).attr("description"),
                hidden: hidden,
                width: (parseInt($(obj).attr("width")) || 180),
                align: ($(obj).attr("align") || 'left'),
                editor: ($(obj).attr("editor") && !hidden) ? this.stringToObject($(obj).attr("editor")) : "",
                styler: function (value, row, index) { },
                forbidquery: obj.forbidquery,
                isRequired: element.safeToString($(obj).attr("isRequired")).toLowerCase() == 'true',
                sortable: element.safeToString($(obj).attr("sortable")).toLowerCase() == 'true',
                isreadonly: element.safeToString($(obj).attr("isreadonly")).toLowerCase() == 'true',
                createonly:element.safeToString($(obj).attr("createonly")).toLowerCase() == 'true',
                iscolor: element.safeToString($(obj).attr("iscolor")).toLowerCase() == 'true',
                formatter: obj.formatter,
                query: null,
                param: {}
            };
            column.formatter = this.getColumnFormatter(column);

            if (!column.hidden) {
                var query = this.createQueryEditor(column);
                column.title = "<div id='" + column.id + "div' title='" + column.description + "' style=' padding:5px;display:inline-block;'>" + (column.isRequired ? "*" : "") + column.label + "</div>";
                column.query = query;
                if (query) {
                    query["resize"](column.width);
                }

            }
            arr.push(column);
        }
        var arrs = new Array();
        arrs.push(arr);
        element.set("columns",arrs);

        var frozenColums = new Array();
        var subarray = new Array();
        var check = this.buildCheckColumn();
        subarray.push(check);
        frozenColums.push(subarray);
        element.set("frozenColums",frozenColums);

        return arrs;
    }

    protected buildRowNumberHeader() {
        var element = this;
        var clear = document.createElement("a");
        $(clear).attr("href", "javascript:void(0);");
        $(clear).attr("title", "清除所有条件");
        $(clear).addClass("fa fa-times iconfont");
        $(clear).css("font-size", "16px");
        $(clear).click(function () {
            var columns = element.get("columns")[0];
            $(columns).each(function () {
                if (!this.hidden && this.query)
                    this.query.clear();
            });
            element.queryData();
        });
        $(clear).hide();
        element.set("clear",clear);

        var div = document.createElement("div");
        $(div).html("No.<br />");
        div.id = "rownumber-header";
        div.appendChild(clear);
        $(element).find(".datagrid-header-rownumber").css("height", "auto").append(div);
    }

    protected buildCheckColumn() {
        var checkid = this.getUniqueId("check");
        this.set("checkid", checkid);

        if (this.singleselect) {
            return {
                field: 'checkcolumn', title: '', width: 30,
                formatter: function (value, row, rowIndex) {
                    return "<input type=\"radio\"  name=\"" + checkid + "\" rowIndex=\"" + rowIndex + "\" id=\"" + checkid + "-" + rowIndex + "\" >";
                }
            };
        }
        else {
            return {
                field: 'checkcolumn', title: '<input id=\"' + checkid + '\" type=\"checkbox\"  >', width: 30,
                formatter: function (value, row, rowIndex) {
                    return "<input type=\"checkbox\"  name=\"" + checkid + "\" rowIndex=\"" + rowIndex + "\" id=\"" + checkid + "-" + rowIndex + "\" >";
                }
            };
        }
    }

    protected createQueryEditor(column) {
        var element = this;
        if (column.datatype == DataType.BINARY)
            return null;
        var query = new QueryCondition();
        query.field = column.field;
        query.datatype = column.datatype;
        query.ignorecase = true;
        if (column.datatype == DataType.LIST) {
            var options = column.editor.options;
            query.listdefaultoption = options.defaultoption;
            query.listsource = options.source;
        }
        query.onValueChange(function () { element.queryData(); });
        if (!element.showquery) {
            $(query).hide();
        }
        query.init();
        return query;
    }

    protected openObjekt(){
        var element = this;
        var rows = element.getSelectedRows();
        if (rows) {
            $(rows).each(function () {
                var row = this;
                var index = element.getRowIndex(row);
                element.endEditRow(index);
                $("#" + element.get("checkid") + "-" + index).prop("checked", true);

                //对象详情加载后事件
                var func = function () {
                    var objektView:UIComponentBase = this;
                    var changes = element._localChanges;
                    if (changes && changes.has(row.id)) {
                        var change = window["clone"](changes.get(row.id));
                        delete change[element.idfield];
                        delete change["$"];
                        this.setChangeObject(change);
                    }
                };
                var id = row[element.idfield];
                var title = row["combinedtitle"];
                if (id) {
                    ComponentRoot.openObjDetail({
                        controlid: row.id,
                        objid: id,
                        klass: element.klass,
                        state: element.state,
                        title: title,
                        onbeforeinit: func,
                        onInitLoaded:function(){ this.addHook(EventNames.SaveSucceeded, function () {
                            element.reload();
                        }); }
                    });
                }
            });
        }
    }

    protected onObjektDataWriteback(){
        var changes = this._localChanges;
        for(var [k,v] of changes){
            if(v.$ == ObjektState.Created){
                this.createObjekts([v]);
            }
            else if(v.$ == ObjektState.Deleted){
                this.deleteObjekts([v]);
            }
        }
    }

    protected delObjekts(){
        var element = this;
        var rows = element.getSelectedRows();
        if (rows) {
            $(rows).each(function () {
                element.deleteRow(this);
            });
        }
        element.refreshRowIndex();
        element.ObjectsSelectedChange();
    }

    protected subclassChanged(isHasSubKlass:boolean){
        this.hassubklass = isHasSubKlass;
        this.select(1);
    }

    protected buildToolbar() {
        var toolbar = Hooks.createComponent(CreateObjektContentViewToolbarHook,new HookContext(this));
        var span = this.renderedHTMLElement;
        if(toolbar){
            $(span).find(".datagrid-view").before(toolbar);
            return toolbar;
        }
        else{
            var defaultToolbar = new ToolBar();
            if (this.hidetools) {
                var hidetools = this.hidetools == 'all' ? 'all' : this.stringToObject(this.hidetools);
                defaultToolbar.hidetools = hidetools;
            }
            defaultToolbar.isIncludeSubKlass = this.hassubklass;
            defaultToolbar.isShowQuery = this.showquery;
            defaultToolbar.init();
            this.addChildComponent(defaultToolbar);
            $(span).find(".datagrid-view").before(defaultToolbar["toolbarDiv"]);
            return defaultToolbar;
        }

    }

    protected setSelectedTip() {
        var rows = this.getSelectedRows();
        $("#" + this.get("selectedTipID")).text(rows.length);
    }

    protected restoreSelection() {
        var rows = this.getSelectedRows();
        for (var key in rows) {
            var row = rows[key];
            var rowindex = this.getRowIndex(row);
            $("#" + this.get("checkid") + "-" + rowindex).prop("checked", true);
        }
    }

    protected getRow(index) {
        var element = this;
        var rows = element.getRows();
        var row;
        $(rows).each(function () {
            if (element.getRowIndex(this) == index)
                row = this;
        });
        return row;
    }

    protected getNewRow() {
        var row = this.newObjekt(this.klass,this.relatedcolumns);
        this.recordCreate(row)
        return row;
    }

    public onRender() {
        var span = document.createElement("span");
        var element = this;
        var table = document.createElement("table");
        element.set("table", table);
        span.appendChild(table);
        $(table).datagrid({
            title: element.title,
            loadMsg: element.loadmsg || "数据加载中，请稍后...",
            emptyMsg: "没有符合条件的数据",
            width: element.width || 1000,
            height: element.height || 400,
            idfield: element.idfield,
            checkOnSelect: false,
            selectOnCheck: false,
            nowrap: true,
            striped: true,
            border: true,
            collapsible: true, //是否可折叠
            remoteSort: true,
            singleSelect: element.singleselect,  //是否单选
            pagination: true,  //分页控件
            rownumbers: true,  //行号
            columns: element.buildColums(),
            frozenColumns: element.get("frozenColums"),
            onSortColumn: function (sort, order) {
                element.set("orderby", sort);
                element.set("isAsc", order == 'asc');
                element.reload();
            },
            onClickCell: function (index, field, value) {
                if (field != "checkcolumn") {
                    element.set("preventDefault",true);
                    element.unSelectRows(index);
                    element.set("preventDefault",false);
                    if (element.state == UIState.edit) {
                        var row = element.getRow(index);
                        if (row.$ != "C" && row.permissioncode[2] == "0")
                            return;
                        element.beginEditRow(index);
                        var input = $(element).find("[datagrid-row-index='" + index + "']").find("td[field='" + field + "']").find("[iscustomelement='']")[0];
                        if (input && input.focus) {
                            input.focus();
                        }
                    }
                }

            },
            onClickRow: function (index, row) {
            },
            onDblClickRow: function (index, row) {
                element.selectRow(index);
                var open = element.get("toolbar").open;
                if (open && $(open).is(":visible")) {
                    $(open).click();
                }
            },
            onResizeColumn: function (field, width) {
                var cols = element.get("columns")[0].concat(element.get("frozenColums")[0]);
                $(cols).each(function () {
                    if (this.field == field) {
                        this.query.resize(width);
                    }
                });
            },
            onSelect: function (index, row) {
                var checkid = "#" + element.get("checkid") + "-" + index;
                var checked = $(checkid).prop("checked");
                if (!checked) {
                    $(checkid).prop("checked", true);
                }
                if(element.get("preventDefault")){
                    return;
                }
                element.setSelectedTip();
                element.ObjectsSelectedChange();
            },
            onUnselect: function (index, row) {
                var check = $("#" + element.get("checkid") + "-" + index);
                if (check.prop("checked")) check.prop("checked", false);

                if(element.get("preventDefault")){
                    return;
                }
                element.setSelectedTip();
                element.ObjectsSelectedChange();
            },
            onBeforeEdit: function (index, row) {
                element.set("editingRow", row);
                row.editing = true;
                element.refreshRow(index);
            },
            onEndEdit: function (index, row, changes) {
            },
            onAfterEdit: function (index, row, changes) {
            },
            onCancelEdit: function (index, row) {
                row.editing = false;
                element.refreshRow(index);
            },
            onLoadSuccess: function () {
                var checkid = element.get("checkid");
                var checkall = $("#" + checkid);
                //全选
                checkall.unbind().bind("change", function () {
                    var checked = $(this).prop("checked");
                    if (checked)
                        element.selectAll();
                    else
                        element.unSelectAll();

                    $("input[name='" + checkid + "']").each(function () {
                        $(this).prop("checked", checked);
                    });
                    element.ObjectsSelectedChange();
                });
                $("input[name='" + checkid + "']").unbind().bind("click", function (e) {
                    e.stopPropagation();
                }).bind("change", function () {
                    var rowIndex = parseInt($(this).attr("rowIndex"));
                    if ($(this).prop("checked"))
                        element.selectRow(rowIndex);
                    else
                        element.unSelectRow(rowIndex);
                });
                element.ObjectsSelectedChange();
                element.fireHook(EventNames.LoadSuccess);

            }
        });
        
        var gfPager:any = element.getElementsByTagName("Gf-Pager")[0];
        if (!gfPager) { gfPager = {}; }
        var pager = element.getPager();
        var selectedTipID = this.getUniqueId("selectedTipID");
        element.set("selectedTipID", selectedTipID);
        element.set("pager",pager);
        $(pager).pagination({
            pageNumber: gfPager.pagenumber || 1, //默认显示第几页
            pageSize: gfPager.pagesize || 20,
            pageList: this.stringToObject(gfPager.pagelist) || [5, 10, 20, 50, 100],
            beforePageText: gfPager.beforepagetext || '第',
            afterPageText: gfPager.afterpagetext || '页     共{pages}页',
            displayMsg: '当前选中<span style="color:red;" id="' + selectedTipID + '">0</span>条记录 ' + (gfPager.displaymsg ||
                '显示<span style="color:red;">{from}-{to}</span>条记录  共<span style="color:red;">{total}</span>条记录'),
            onSelectPage: function (pageNumber, pageSize) {
                element.loadDataPage(pageNumber, pageSize);
            }
        });
        
        return span;
    }

    protected ObjectsSelectedChange() {
        var element = this;
        var rows = element.getSelectedRows();
        if (!rows) {
            rows = [];
        }
        $(rows).each(function () {
            if (!this.isTrash)
                this.isTrash = element.trashstation;
        });
        element.sendMessage(new UIMessageObjektSelecting([],rows));
    }

    protected getColumnFormatter(column:ObjektCollectionColumn) {
        if(column.formatter){
            return column.formatter;
        }
        var element = this;
        var func = function (value, row, index) { return value; };
        if (column.field == element.idfield)
            return func;
        
        var options = column.editor.options;
        if(!options){
            return func;
        }
        func = function (value, row, index) {
            options.elementName = column.editor.type;
            options.required = column.isRequired;
            options.label = column.label;
            options.readonly = column.isreadonly;
            options.createonly = column.createonly;
            options.isdelayToEdit = true;

            var view = new ObjektPropertyViewAdapter();
            if(column.field.indexOf('.') >= 0){
                var sourceObj = element.getObjektData([row.id]).get(row.id);
                view.objektId = sourceObj[column.field.split('.')[0]];
                view.propertyName = column.field.split('.')[1];
            }
            else{
                view.objektId = row.id;
                view.propertyName = column.field;
            }
            view.options = JSON.stringify(options);
            return view.outerHTML;
        };
        return func;
    }

    protected refreshRowIndex() {
        var checkid = this.get("checkid");
        $("input[name='" + checkid + "']").each(function () {
            var newindex = $(this).closest("tr").attr("datagrid-row-index");
            $(this).attr("rowIndex", newindex);
            $(this).attr("id", checkid + "-" + newindex);
        });
    }

    protected static extendEditors(elementNames: Array<string>) {
        for (var key in elementNames) {
            var name = elementNames[key];
            var getvalue = "return target[0].getValue();";
            var setvalue = "target[0].setValue(value);";
            var init = `var grid = $(container).closest("`+ this.elementName +`")[0];  
                        var input = document.createElement("` + name.toLowerCase() + `");`
            var setProperties = `input['required'] = options.required == 'true'; 
                                    input['label'] = options.label;
                                    input['init']();
                                    input.state = UIState.edit;`;

            switch (name) {
                case 'Gf-ObjektPropertyView':
                    setProperties = `input["idfield"] = options.idfield;
                                    input["namefield"] = options.namefield;
                                    input["klass"] = options.klass; 
                                    input["filterid"] = options.filterid; 
                                    input["href"] = options.href;` + setProperties;
                    break;

                case 'Gf-ListPropertyView':
                    setProperties = `input["defaultoption"] = options.defaultoption;
                                    input["data"] = options.data;
                                    input["textfield"] = options.textfield; 
                                    input["valuefield"] = options.valuefield;` + setProperties;
                    break;

                case 'Gf-DatePropertyView':
                    setvalue = "if(value && value.indexOf(' ') > 0){ value = value.split(' ')[0]; }" + setvalue;
                    break;
                case 'Gf-NumberPropertyView':
                case 'Gf-IntPropertyView':
                case 'Gf-BigIntPropertyView':
                    setProperties = `input["prec"] = options.prec;
                                        input["scale"] = options.scale;` + setProperties;
                    break;
            }

            eval(`$.extend($.fn.datagrid.defaults.editors, {
            '`+ name + `': {
                init: function (container, options) {
                    `+ init + `
                    `+ setProperties + `
                    if(options.createonly == 'true'){
                        var grid = $(container).closest("`+ ObjektCollectionView.elementName + `")[0];
                        var row = grid.get("editingRow");
                        if(row.$ != "C"){
                            input["editState"] = 'read'; 
                        }
                    }
                    var $input = $(input).appendTo(container);
                    return $input;
                },
                getValue: function (target) {
                    `+ getvalue + `
                },
                setValue: function (target, value) {
                    `+ setvalue + `
                },
                resize: function (target, width) {
                    target[0].resize(width);
                }
            }
        });`);

        }

    }

    protected validate(rowIndex) {
        var inputs = $(this).find("[datagrid-row-index=" + rowIndex + "]").find("[iscustomelement]");
        var validate = true;
        $(inputs).each(function () {
            if (!this.validate()) {
                validate = false;
            }
        });
        return validate;
    }
    
    /**
     * 切换状态 
     * @param state 状态枚举
     */
    protected switchToState(state: UIState) {
        if(state != this._state && state == UIState.browse){
            this.reload();
        }
        super.switchToState(state);
    }

    protected created(){
        this.isMessageBoundary = true;
        var element = this;
        element.onAfterInit(function(){
            var table = element.get("table");
            var columns = element.get("columns")[0];
            $(columns).each(function () {
                if (!this.hidden && this.query && !this.forbidquery) {
                    $('#' + this.id).append(this.query);
                }
                $('#' + this.id).attr("title", this.description);
            });
    
            this.buildRowNumberHeader();
            var toolbar = this.buildToolbar();
            element.set("toolbar", toolbar);
            
    
            if (!element.width && !element.height) {
                var container = $(element).parent();
                container.css("overflow", "hidden");
    
                $(function () {
                    $(table).datagrid('resize', {
                        width: container.width() - 10,
                        height: container.height() - 4
                    });
                    if (element.hidetools == 'all') {
                        var wrap = $(element).find(".datagrid-wrap");
                        var height = wrap.height();
                        wrap.height(height + 35);
                    }
                    container.resize(function () {
                        if (!table.ownerDocument.body.contains(table)) {
                            return;
                        }
                        $(table).datagrid('resize', {
                            width: container.width() - 10,
                            height: container.height() - 4
                        });
                        if (element.hidetools == 'all') {
                            var wrap = $(element).find(".datagrid-wrap");
                            var height = wrap.height();
                            wrap.height(height + 35);
                        }
                    });
    
                });
            }
    
            element.set("loaded", false);
            element.set("orderby", element.orderby);
            element.set("isAsc", element.isasc == 'asc');
    
            if (element.autoselect) {
                element.select(1);
            }
        });
        super.created();
    }

}
ObjektCollectionView.register();