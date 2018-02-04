/// <reference path="ObjektCollectionView.ts" />

/** 对象集合视图 */
class RelationshipObjektCollectionView extends ObjektCollectionView {
    
    constructor() {
        super();
    }
    static elementName = "Gf-RelationshipObjektCollectionView".toLowerCase();

    /** 源对象id */
    get sourceId(){
        return this.getAttribute("sourceId");
    }
    set sourceId(val){
        this.setAttribute("sourceId",val)
    }
    
    /** 可创建被关联对象 */
    get relatedCanCreate() {
        return this.safeToString(this.getAttribute("relatedCanCreate")).toLowerCase() == 'true';
    }
    set relatedCanCreate(val) {
        this.setAttribute("relatedCanCreate", val.toString());
    }
    
    /** 可选择被关联对象 */
    get relatedCanPick() {
        return this.safeToString(this.getAttribute("relatedCanPick")).toLowerCase() == 'true';
    }
    set relatedCanPick(val) {
        this.setAttribute("relatedCanPick", val.toString());
    }
    /** 被关联对象所属类 */
    get relatedKlass(){
        return this.getAttribute("relatedKlass");
    }
    set relatedKlass(val){
        this.setAttribute("relatedKlass",val)
    }
    /** 被关联对象名称 */
    get relatedLabel(){
        return this.getAttribute("relatedLabel");
    }
    set relatedLabel(val){
        this.setAttribute("relatedLabel",val)
    }

    created(){
        super.created();
        this.onAfterInit(()=>{
            if (this.sourceId){
                var source = this.getObjektData([this.sourceId]).get(this.sourceId)
                this.onAddRow((row)=> {
                    row['source'] = source;
                    this.recordChange(row, "source", this.sourceId);
                });
            }
            if (this.relatedKlass){
                //打开关联对象
                this.toolbar.addButton(
                { 
                    label: '打开' + source["combinedLabel"], 
                    icon: 'fa fa-folder-open iconfont',
                    name : 'openRelated',
                    whenToShow: { selectToShow : 'singleSelect' },
                    before: 'add'
                });

                //创建关联对象
                var createRelated = new RocAdd();
                if(this.relatedCanCreate)
                    createRelated.canCreate = true;
                if(this.relatedCanPick)
                    createRelated.canSelect = true;
                createRelated.listwidth = "70";
                createRelated.init();
                createRelated.onCreate(()=> {
                    if(createRelated.createOption == 'select'){
                        var objektSelector = document.createElement('Gf-ObjectSelector') as ObjektPropertyView;
                        objektSelector.klass = this.relatedKlass;
                        objektSelector.filterId = this.filter;
                        objektSelector.init();
                        objektSelector.onValueChange(()=>{
                            var obj = objektSelector.getObject();
                            var row = new ObjektModel();
                            this.ajax({
                                url:  ComponentRoot.APIs.getObjekt,
                                sync: true,
                                data: { 
                                        klass: this.klass,
                                        relatedcolumns : this.relatedcolumns, 
                                        relatedId : obj[objektSelector.idfield], 
                                        relatedName : 'related'
                                      },
                                success: function(result) {
                                    row = JSON.parse(result.Data);
                                    this.addNewRow(row);
                                    this.recordChange(row, 'related', row["related"]);
                                }
                            });
                        });
                        objektSelector.open();
                    }
                    else{
                        this.addNewRow();
                    }
                });
                this.toolbar.addTool(
                { 
                    tool: createRelated,
                    name : 'createRelated',
                    whenToShow: { stateToShow : 'edit' },
                    before: 'add'
                });
                
                //替换关联对象
                this.toolbar.addButton(
                { 
                    label: '替换', 
                    icon: 'fa fa-exchange iconfont',
                    name : 'addRelated',
                    whenToShow: { selectToShow : 'singleSelect', stateToShow : 'edit' },
                    before: 'add'
                });
                

                //移除关联对象
                this.toolbar.addButton(
                { 
                    label: '移除', 
                    icon: 'fa fa-remove iconfont',
                    name : 'removeRelated',
                    whenToShow: { selectToShow : 'singleSelect', stateToShow : 'edit' },
                    before: 'add'
                });


                this.toolbar.onToolbarCommand((toolname)=>{
                    if(toolname == 'openRelated'){
                        var rows = this.getSelectedRows();
                        if (rows) {
                            for(let row of rows){
                                let index = this.getRowIndex(row);
                                this.endEditRow(index);
                                $('#' + this.get('checkid') + '-' + index).prop('checked', true);
                                    var related = this.getObjektData([row['related']]).get(row['related']);
                                    var id = related.id;
                                    var title = related['combinedtitle'];
                                    if (id)
                                    {
                                        ComponentRoot.openObjDetail({
                                            controlid: row.id + id,
                                        objid: id,
                                        klass: this.relatedKlass,
                                        title: title
                                        });
                                    }
                                };
                            }
                    }
                    else if(toolname == 'removeRelated'){
                        let row = this.getSelectedRow();
                        for (var p in row) {
                            if (p.indexOf('.') > 0 && p.split('.')[0] == 'related') {
                                row[p] = null;
                            }
                        }
                        row['related'] = '';
                        this.updateRow(row,true);
                        this.recordChange(row, 'related', '');
                    }
                    else if(toolname == 'addRelated'){
                        var rows = this.getSelectedRows();
                        if(!rows || rows.length == 0) return;
                        var objektSelector = new ObjektPropertyView();
                        objektSelector.klass = this.relatedKlass;
                        objektSelector.filterId = this.filter;
                        objektSelector.state = UIState.edit;
                        objektSelector.init();
                        objektSelector.onValueChange(()=> {
                            var obj = objektSelector.getObject();
                            var related = new ObjektModel();
                            this.ajax({
                                url:  ComponentRoot.APIs.getObjekt,
                                sync: true,
                                data: { 
                                        klass: this.klass,
                                        id : obj[objektSelector.idfield]
                                      },
                                success: (result)=> {
                                    related = JSON.parse(result.Data);
                                    var row = this.getSelectedRow();
                                    $(this.relatedcolumns.split(',')).each(function(){
                                        if(this.split('.')[0] == 'related'){
                                            row[this] = related[this.split('.')[1]];
                                        }
                                    });
                                    row['related'] = related.id;
                                    this.updateRow(row,true);
                                    this.recordChange(row, 'related', related.id);
                                }
                            });
                        });
                        objektSelector.open();
                    }
                });
                
                this.toolbar.hideTool('openRelated');
                this.toolbar.hideTool('createRelated');
                this.toolbar.hideTool('removeRelated');
                this.toolbar.hideTool('addRelated');
            }
        });
    }
}
RelationshipObjektCollectionView.register();