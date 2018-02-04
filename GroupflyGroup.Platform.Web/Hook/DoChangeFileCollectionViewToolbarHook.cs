//using System;
//using System.Collections.Generic;
//using System.ComponentModel.Composition;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using EB.Common;
//using GroupflyGroup.Platform.Extension;
//using GroupflyGroup.Platform.ObjectFramework;
//using GroupflyGroup.Platform.ObjectFramework.Persistence;
//using GroupflyGroup.Platform.ObjectFramework.Strings;
//using GroupflyGroup.Platform.Web.Models;

//namespace GroupflyGroup.Platform.Web.Hook
//{
//    /// <summary>
//    /// 
//    /// </summary>
//    [Export(typeof(DoUiExtensionGlobalFilterHook))]
//    [PartCreationPolicy(CreationPolicy.Shared)]
//    public class DoChangeFileCollectionViewToolbarHook : DoUiExtensionGlobalFilterHook
//    {
//        public override string Description
//        {
//            get { return "在文件系统的工具条中增加上传与下载按钮，屏蔽添加按钮"; }
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
//                        var urlHelper = new UrlHelper(aec.RequestContext);
//                        var downloadUrl = urlHelper.Action("Index", "File");
//                        var exchangeUrl = urlHelper.Action("UpLoadExchangeProcess", "File");
//                        var klass = KlassNames.File;
//                        var fieldname = PropertyNames.fileType + "." + PropertyNames.faIcon;
//                        var directory = ObjektFactory.Find<FileType>(FileTypeIDs.directory);
//                        model.AddUIExtension("GfObjektCollectionView", "beforeInit",
//                            "if (element.klass == '" + klass + @"'){
//                        element.isasc = true;
//                        element.orderby =  '" + PropertyNames.sortOrder + @"';
//                        element.relatedcolumns = '" + fieldname + @"';
//                        var column = document.createElement('Gf-Column');
//                        column.field = '" + fieldname + @"';
//                        column.datatype = 'string';
//                        column.title = '';
//                        column.width = '50';
//                        column.isreadonly = true;
//                        column.forbidquery = true;

//                        column.formatter = function (value, row, index) {  if(!value) return ''; else return '<span class=""'+ value +'""></span>'; };

//                        $(element).prepend(column);

//                        if(!element.hidetools){
//                            element.hidetools = '[]';
//                        }
//                        if(element.hidetools != 'all')
//                        {
//                            hidetools = window.stringToObject(element.hidetools);
//                            hidetools.push('add');
//                            element.hidetools = JSON.stringify(hidetools);
//                        }
//                        }");
//                        model.AddUIExtension("GfObjektCollectionView", "afterInit",
//                        "if (element.klass == '" + klass + @"'){
//                            $(element.getOptions().columns[0]).each(function(){
//                                if(this.field == '" + PropertyNames.isLink + @"' || this.field ==  '" + PropertyNames.isdirectory + @"')
//                                {
//                                    this.editor = '';
//                                }
//                            });
//                            element.toolbar.addButton(
//                            { 
//                                label: '上传', 
//                                icon: 'fa fa-upload iconfont',
//                                name : 'upload',
//                                after: 'exporter'
//                            });
//                            element.toolbar.addButton(
//                            { 
//                                label: '新建链接', 
//                                icon: 'fa fa-link iconfont',
//                                name : 'addlink',
//                                whenToShow: { stateToShow : 'edit' },
//                                after: 'exporter'
//                            });
//                            element.toolbar.addButton(
//                            { 
//                                label: '新建文件夹', 
//                                icon: 'fa fa-folder-o iconfont',
//                                name : 'adddirectory',
//                                whenToShow: { stateToShow : 'edit' },
//                                after: 'exporter'
//                            });
//                            element.registerEventHandler('onLoadSuccess', function() {
//                                var outParams = element.get('outParams');
//                                var directoryId = outParams.length > 0 ? outParams[0].value : '';
//                                var directoryname = element.getCustomAttr('directoryname') || '/';
//                                var callback = function(){element.reload();};
//                                document.body.setCustomAttr('fileOptions',{ directoryid : directoryId,directoryname: directoryname,callback:callback });
//                            });
//                        }" + @"

//                        element.toolbar.addButton(
//                        { 
//                            label: '下载', 
//                            icon: 'fa fa-download iconfont',
//                            name : 'download',
//                            whenToShow: { selectToShow : 'singleSelect' },
//                            after: 'exporter'
//                        });
//                        element.toolbar.addButton(
//                        { 
//                            label: '替换', 
//                            icon: 'fa fa-exchange iconfont',
//                            name : 'changefile',
//                            whenToShow: { selectToShow : 'singleSelect' },
//                            after: 'exporter'
//                        });

//                        element.toolbar.registerEventHandler('toolCommand',function(toolname){
//                            if(toolname == 'addlink'){
//                                var fileOptions = document.body.getCustomAttr('fileOptions');
//                                var parent = { ""id"" : fileOptions.directoryid,""combinedLabel"" : fileOptions.directoryname, ""permissioncode"" : ""11111"",
//                                    ""klass"" : """ + KlassNames.File + @""",   ""title"" : """ + KlassNames.File + "-" + @""" + fileOptions.directoryname };
//                                element.insertRow({ index:0, row: { customRowId : element.GetUniqueId('row'), customRowState : ""inserted"", "
//                                    + PropertyNames.isLink + @" : ""True"", parent : parent,permissioncode : ""11111"" }});
//                                element.selectRow(0);
//                                element.beginEditRow(0);
//                                element.endEditRows(0);
//                            }
//                            else if(toolname == 'adddirectory'){
//                                var fileOptions = document.body.getCustomAttr('fileOptions');
//                                var parent = { ""id"" : fileOptions.directoryid,""combinedLabel"" : fileOptions.directoryname,""permissioncode"" : ""11111"",
//                                    ""klass"" : """ + KlassNames.File + @""",   ""title"" : """ + KlassNames.File + "-" + @""" + fileOptions.directoryname };
//                                var dir = '{ ""id"" : """ + directory.Id + @""",""combinedLabel"" : """ + directory.CombinedLabel + @""", ""klass"" : """ + KlassNames.FileType + @""",   ""title"" : """ + KlassNames.FileType + "-" + directory.CombinedLabel + @""",""permissioncode"" : ""11111"" }';
//                                element.insertRow({ index:0, row: { customRowId : element.GetUniqueId('row'), customRowState : ""inserted"", " + PropertyNames.isdirectory + @" : ""True"",
//                                fileType : dir, parent : parent ,permissioncode : ""11111""}});
//                                element.selectRow(0);
//                                element.beginEditRow(0);
//                                element.endEditRows(0);
//                            }
//                            else if(toolname == 'download'){
//                                var row = element.getSelectedRow();
//                                if(row){
//                                    window.location.href = '" + downloadUrl + @"?id=' + row.id + '&download=true'
//                                }
//                            }
//                            else if(toolname == 'upload'){
//                                document.body.openUpFileDetail();
//                            }
//                            else if(toolname == 'changefile'){
//                                var row = element.getSelectedRow();
//                                if(row){
//                                    var objid = row[element.idfield];
//                                    var ext = row['" + PropertyNames.extensionName + @"'];
//                                    var dir = row['" + PropertyNames.parent + @"'];
//                                    document.body.openUpFileDetail(dir[element.idfield], dir[element.namefield], null, 1, ext,'" + exchangeUrl + @"?fileid=' + objid);
//                                }
//                            }
//                        });

//                        element.toolbar.hideTool('adddirectory');
//                        element.toolbar.hideTool('addlink');
//                        element.toolbar.hideTool('changefile');
//                        element.toolbar.hideTool('download');
//                        element.toolbar.registerEventHandler('onCheckToShow',function(){
//                            var array = element.toolbar.selected;
//                            if(array && array.length > 0){
//                                $(array).each(function () {
//                                    var klass = this.id.split('@')[1];
//                                    if(klass.toLowerCase() != 'file'){
//                                        element.toolbar.hideTool('changefile');
//                                        element.toolbar.hideTool('download');
//                                    }
//                                });
//                            }
//                        });
                            
//                        ");
//                    }
//                }
//                return true;
//            }
//            return false;
//        }
//    }
//}