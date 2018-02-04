/// <reference path="../Extension/AfterComponentInitHook.ts" />

class AfterObjektCollectionInitHookImpl extends AfterComponentInitHook{
    getOrder(){
        return 100;
    }

    getDescription(){
        return `对象集合视图组件初始化后处理`;
    }

    doAfter(context:HookContext){
        var component = context.getParam() as UIComponentBase;
        if(component instanceof ObjektCollectionView){
            var element = component as ObjektCollectionView;
            if (element.klass == 'File'){
                (element.getOptions().columns[0] as Array<ObjektCollectionColumn>).forEach(o=>{
                    if(o.field == 'isLink' || o.field ==  'isdirectory')
                    {
                        o.formatter = function(){ return ''; };
                    }
                });
                element.toolbar.addButton({ 
                    label: '上传', 
                    icon: 'fa fa-upload iconfont',
                    name : 'upload',
                    after: 'exporter'
                });
                element.toolbar.addButton({ 
                    label: '新建链接', 
                    icon: 'fa fa-link iconfont',
                    name : 'addlink',
                    whenToShow: { stateToShow : 'edit' },
                    after: 'exporter'
                });
                element.toolbar.addButton({ 
                    label: '新建文件夹', 
                    icon: 'fa fa-folder-o iconfont',
                    name : 'adddirectory',
                    whenToShow: { stateToShow : 'edit' },
                    after: 'exporter'
                });
                element.onLoadSuccess(function() {
                    var outParams = element.outParams;
                    var directoryId = outParams.length > 0 ? outParams[0].value : '';
                    var directoryname = element.getCustomAttribute('directoryname') || '/';
                    var callback = function(){element.reload();};
                    ComponentRoot.setCustomAttribute('fileOptions',{ directoryid : directoryId,directoryname: directoryname,callback:callback });
                });
                element.toolbar.addButton({ 
                    label: '下载', 
                    icon: 'fa fa-download iconfont',
                    name : 'download',
                    whenToShow: { selectToShow : 'singleSelect' },
                    after: 'exporter'
                });
                element.toolbar.addButton(
                { 
                    label: '替换', 
                    icon: 'fa fa-exchange iconfont',
                    name : 'changefile',
                    whenToShow: { selectToShow : 'singleSelect' },
                    after: 'exporter'
                });
    
                element.toolbar.onToolbarCommand(function(toolname){
                    if(toolname == 'addlink'){
                        var fileOptions = ComponentRoot.getCustomAttribute('fileOptions');
                        element.insertRow({ index:0, row: { customRowId : element.getUniqueId('row'), customRowState : "inserted", isLink : true, 
                        parent : fileOptions.directoryid, permissioncode : "11111" }});
                        element.selectRow(0);
                        element.beginEditRow(0);
                        element.endEditRows(0);
                    }
                    else if(toolname == 'adddirectory'){
                        var fileOptions = ComponentRoot.getCustomAttribute('fileOptions');
                        var parent = fileOptions.directoryid;
                        var dir:any = IDs.DirectoryFileTypeID;
                        element.insertRow({ index:0, row: { customRowId : element.getUniqueId('row'), customRowState : "inserted", isdirectory : true,
                        fileType : dir, parent : parent ,permissioncode : "11111"}});
                        element.selectRow(0);
                        element.beginEditRow(0);
                        element.endEditRows(0);
                    }
                    else if(toolname == 'download'){
                        var row = element.getSelectedRow();
                        if(row){
                            window.location.href = ComponentRoot.APIs.downloadfile + '?id=' + row.id + '&download=true'
                        }
                    }
                    else if(toolname == 'upload'){
                        ComponentRoot.openUpFileDetail();
                    }
                    else if(toolname == 'changefile'){
                        var row = element.getSelectedRow();
                        if(row){
                            var objid = row[element.idfield];
                            var ext = row['extensionName'];
                            var dir = row['parent'];
                            ComponentRoot.openUpFileDetail(dir[element.idfield], dir[element.namefield], null, 1, ext, ComponentRoot.APIs.exchangefile + '?fileid=' + objid);
                        }
                    }
                });
    
                element.toolbar.hideTool('adddirectory');
                element.toolbar.hideTool('addlink');
                element.toolbar.hideTool('changefile');
                element.toolbar.hideTool('download');
                element.toolbar.onCheckToShow(function(){
                    var array = element.toolbar.selected;
                    if(array && array.length > 0){
                        $(array).each(function () {
                            var klass = this.id.split('@')[1];
                            if(klass.toLowerCase() != 'file'){
                                element.toolbar.hideTool('changefile');
                                element.toolbar.hideTool('download');
                            }
                        });
                    }
                });
                return true;
            }

            return false;
        }
    }
}
AfterObjektCollectionInitHookImpl.register();