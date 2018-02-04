//using System;
//using System.Collections.Generic;
//using System.ComponentModel.Composition;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using EB.Common;
//using GroupflyGroup.Platform.Extension;
//using GroupflyGroup.Platform.ObjectFramework.Strings;
//using GroupflyGroup.Platform.Web.Models;

//namespace GroupflyGroup.Platform.Web.Hook
//{
//    /// <summary>
//    /// 
//    /// </summary>
//    [Export(typeof(DoUiExtensionGlobalFilterHook))]
//    [PartCreationPolicy(CreationPolicy.Shared)]
//    public class DoBuildRocViewToolBarHook : DoUiExtensionGlobalFilterHook
//    {
//        public override string Description
//        {
//            get { return "关联对象视图"; }
//        }

//        public override int Order
//        {
//            get { return 100; }
//        }

//        public override bool Do(HookContext context)
//        {
//            if (context.Parameter is ActionExecutedContext)
//            {
//                ActionExecutedContext aec = context.Parameter as ActionExecutedContext;
//                ViewResult view = aec.Result as ViewResult;
//                if (!view.IsNull())
//                {
//                    BaseViewModel model = view.Model as BaseViewModel;
//                    if (!model.IsNull())
//                    {
//                        model.AddUIExtension("GfObjektCollectionView", "afterInit",
//                        @"var RocOptions = element.getCustomAttr('RocOptions');
//                        if (RocOptions && RocOptions.SourceId){
//                            element.registerEventHandler('onAddRow', function(row) {
//                                var source =  { " + PropertyNames.id + @": RocOptions.SourceId,
//                                                " + PropertyNames.combinedLabel + @": RocOptions.SourceLabel,
//                                                combinedtitle: RocOptions.SourceTitle,
//                                                permissioncode: RocOptions.SourcePermissionCode};
//                                row['" + PropertyNames.source + @"'] = source;
//                                element.recordChange(row, '" + PropertyNames.source + @"', JSON.stringify(source));
//                            });
//                        }
//                        if (RocOptions && RocOptions.RelatedKlass){
//                            //打开关联对象
//                            element.toolbar.addButton(
//                            { 
//                                label: '打开' + RocOptions.RelatedLabel, 
//                                icon: 'fa fa-folder-open iconfont',
//                                name : 'openRelated',
//                                whenToShow: { selectToShow : 'singleSelect' },
//                                before: 'add'
//                            });

//                            //创建关联对象
//                            var createRelated = document.createElement('Gf-RocAdd');
//                            if(RocOptions.RelatedCanCreate)
//                                createRelated.cancreate = true;
//                            if(RocOptions.RelatedCanPick)
//                                createRelated.canselect = true;
//                            createRelated.listwidth = 70;
//                            createRelated.init();
//                            createRelated.registerEventHandler('onAddRoc', function() {
//                                if(createRelated.createOption == 'select'){
//                                    var objektSelector = document.createElement('Gf-ObjectSelector');
//                                    objektSelector.klass = RocOptions.RelatedKlass;
//                                    objektSelector.filterid = RocOptions.FilterId;
//                                    objektSelector.init();
//                                    objektSelector.registerEventHandler('onafterselect', function () {
//                                        var obj = objektSelector.getObject();
//                                        var row = {};
//                                        window['platformAjax']({
//                                            url: element.newrowurl || document.body['getnewobjekturl'],
//                                            sync: true,
//                                            data: { 
//                                                    klass: element.klass,
//                                                    relatedcolumns : element.relatedcolumns, 
//                                                    relatedId : obj[objektSelector.idfield], 
//                                                    relatedName : '" + PropertyNames.related + @"'
//                                                  },
//                                            success: function(result) {
//                                                row = JSON.parse(result.Data);
//                                                element.addNewRow(row);
//                                                element.recordChange(row, '" + PropertyNames.related + @"', JSON.stringify({ 'id': row.related.id,'combinedLabel': row.related.combinedLabel,'combinedtitle': row.related.title,'permissioncode' : ''}));
//                                            }
//                                        });
//                                    });
//                                    objektSelector.open();
//                                }
//                                else{
//                                    element.addNewRow();
//                                }
//                            });
//                            element.toolbar.addTool(
//                            { 
//                                tool: createRelated,
//                                name : 'createRelated',
//                                whenToShow: { stateToShow : 'edit' },
//                                before: 'add'
//                            });
                            
//                            //替换关联对象
//                            element.toolbar.addButton(
//                            { 
//                                label: '替换', 
//                                icon: 'fa fa-exchange iconfont',
//                                name : 'addRelated',
//                                whenToShow: { selectToShow : 'singleSelect', stateToShow : 'edit' },
//                                before: 'add'
//                            });
                            

//                            //移除关联对象
//                            element.toolbar.addButton(
//                            { 
//                                label: '移除', 
//                                icon: 'fa fa-remove iconfont',
//                                name : 'removeRelated',
//                                whenToShow: { selectToShow : 'singleSelect', stateToShow : 'edit' },
//                                before: 'add'
//                            });


//                            element.toolbar.registerEventHandler('toolCommand',function(toolname){
//                                if(toolname == 'openRelated'){
//                                    var rows = element.getSelectedRows();
//                                    if (rows) {
//                                        $(rows).each(function () {
//                                            var row = this;
//                                            var index = element.getRowIndex(row);
//                                            element.endEditRow(index);
//                                            $('#' + element.get('checkid') + '-' + index).prop('checked', true);
//                                                var id = row['" + PropertyNames.related + @"'][element.idfield];
//                                                var title = row['" + PropertyNames.related + @"']['title'];
//                                                if (id)
//                                                {
//                                                    document.body['openObjDetail']({
//                                                        controlid: row.id + id,
//                                                    objid: id,
//                                                    klass: RocOptions.RelatedKlass,
//                                                    title: title
//                                                    });
//                                                }
//                                            });
//                                        }
//                                }
//                                else if(toolname == 'removeRelated'){
//                                    var row = element.getSelectedRow();
//                                    for (var p in row) {
//                                        if (p.indexOf('.') > 0 && p.split('.')[0] == '" + PropertyNames.related + @"') {
//                                            row[p] = null;
//                                        }
//                                    }
//                                    row['" + PropertyNames.related + @"'] = '';
//                                    element.updateRow(row,true);
//                                    element.recordChange(row, '" + PropertyNames.related + @"', '');
//                                }
//                                else if(toolname == 'addRelated'){
//                                    var rows = element.getSelectedRows();
//                                    if(!rows || rows.length == 0) return;
//                                    var objektSelector = document.createElement('Gf-ObjectSelector');
//                                    objektSelector.klass = RocOptions.RelatedKlass;
//                                    objektSelector.filterid = RocOptions.FilterId;
//                                    objektSelector.init();
//                                    objektSelector.registerEventHandler('onafterselect', function () {
//                                        var obj = objektSelector.getObject();
//                                        var related = {};
//                                        window['platformAjax']({
//                                            url: document.body['getobjekturl'],
//                                            sync: true,
//                                            data: { 
//                                                    klass: element.klass,
//                                                    id : obj[objektSelector.idfield]
//                                                  },
//                                            success: function(result) {
//                                                related = JSON.parse(result.Data);
//                                                var row = element.getSelectedRow();
//                                                $(element.relatedcolumns.split(',')).each(function(){
//                                                    if(this.split('.')[0] == '" + PropertyNames.related + @"'){
//                                                        row[this] = related[this.split('.')[1]];
//                                                    }
//                                                });
//                                                row['" + PropertyNames.related + @"'] = related;
//                                                element.updateRow(row,true);
//                                                element.recordChange(row, '" + PropertyNames.related + @"', JSON.stringify({ 'id': related.id,'combinedLabel': related.combinedLabel,'combinedtitle': related.title, 'permissioncode' : related.permissioncode }));
//                                            }
//                                        });
//                                    });
//                                    objektSelector.open();
//                                }
//                            });
                            
//                            element.toolbar.hideTool('openRelated');
//                            element.toolbar.hideTool('createRelated');
//                            element.toolbar.hideTool('removeRelated');
//                            element.toolbar.hideTool('addRelated');

//                        }");
//                    }
//                }
//                return true;
//            }
//            return false;
//        }
//    }
//}