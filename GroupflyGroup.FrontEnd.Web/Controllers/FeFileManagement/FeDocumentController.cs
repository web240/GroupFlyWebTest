using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Service;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;
using File = GroupflyGroup.Platform.ObjectFramework.File;
using System.Drawing.Drawing2D;
using System.Threading;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeFileManagement
{
    /// <summary>
    ///     文档管理
    /// </summary>
    public class FeDocumentController : Controller
    {

        /// <summary>
        /// 文件级子文件是否被引用
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        [HttpPost]
        public bool FileIsReference(string fileId)
        {

            bool result = false;

            File file = ObjektFactory.Find<File>(fileId);

            if (file != null)
            {

                //1.先查找自己是否被非file对象的parent引用过
                List<Property> porperty;
                var refFileList = file.LogicalReferencedBy(out porperty);

                for (int i = 0; i < refFileList.Count; i++)
                {

                    if (refFileList[i].KlassId != KlassIDs.File || porperty[i].Name != FePropertyNames.parent)
                    {
                        result = true;
                        break;
                    }

                }

                //2.如果自己是文件夹，切自己没被引用过，查找自己所有子孙文件，是否被非file对象的parent引用过
                if (!result && file.IsDirectory)
                {
                    foreach (var descendantsFile in file.GetDescendantsFiles())
                    {

                        refFileList = descendantsFile.LogicalReferencedBy(out porperty);

                        for (int i = 0; i < refFileList.Count; i++)
                        {

                            if (refFileList[i].KlassId != KlassIDs.File || porperty[i].Name != FePropertyNames.parent)
                            {
                                result = true;
                                break;
                            }

                        }

                    }
                }

            }

            return result;
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        /// 回收站
        /// </summary>
        /// <returns></returns>
        public ActionResult Recycle()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        ///     获取数据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Get(string directoryId, string sortField, int sortType, int? pageSize, int? pageNumber,
            string queryParams, string isTrash)
        {
            var parentId = directoryId;
            if (string.IsNullOrWhiteSpace(parentId))
            {

                parentId = FeFileIDs.FeDocument;
            }

            var fedocument = ObjektFactory.Find<File>(parentId);
            var result = new FeDataGridViewModel();
            var navFile = fedocument;

            result.DirectoryId = fedocument.Id;
            result.DirectoryName = fedocument.Name;

            #region //为目录添加导航

            while (navFile != null)
            {
                if (navFile.Id != FeFileIDs.FeDocument)
                {
                    result.Navigation.Insert(0, new FeDataGridNavigationItemViewModel
                    {
                        Id = navFile.Id,
                        Text = navFile.Name
                    });
                    if (navFile.Parent != null && navFile.Parent.IsExists())
                    {
                        navFile = navFile.Parent;
                    }
                    else
                    {
                        navFile = null;
                    }
                }
                else
                {
                    result.Navigation.Insert(0, new FeDataGridNavigationItemViewModel
                    {
                        Id = navFile.Id,
                        Text = "全部文件"
                    });

                    break;
                }
            }

            #endregion
            
            var FileCount = 0;
            var FileImageCount = 0;

            //从后台设置分页信息           
            if (pageSize != null)
            {
                result.PageSize = pageSize.Value;
            }
            else
            {
                result.PageSize = 21;
            }
            if (pageNumber != null)
            {
                result.PageNumber = pageNumber.Value;
            }
            else
            {
                result.PageNumber = 1;
            }


            #region //检索文件目录

            ObjektCollection<File> oc = null;
            if (string.IsNullOrEmpty(isTrash)) { isTrash = "0"; }
            var strWhere = "";
            var isref = "all";
            if (queryParams != null)
            {
                var DocumentSearchlist = JsonConvert.DeserializeObject<List<DocumentSearch>>(queryParams);
                strWhere = "\"parent\" = '" + fedocument.Id + "' and \"isTrash\" = '" + isTrash + "'  ";
                var i = 0;
                while (i < DocumentSearchlist.Count)
                {
                    var DocumentSearch = DocumentSearchlist[i];
                    switch (DocumentSearch.field)
                    {
                        case "dicname":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")} like '%" + DocumentSearch.value.ToLower() + "%' and \"isdirectory\" = '1' ";
                            }
                            break;
                        case "picname":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")} like '%" + DocumentSearch.value.ToLower() + "%' and \"isdirectory\" = '0'";
                            }
                            break;
                        case "creator":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and \"creator\" in (select  \"id\"  from  \"Identity\"  where { fn LCASE(\"" + PropertyNames.combinedLabel + "\")} like \'%" + DocumentSearch.value.ToLower() + "%\')";
                            }
                            break;
                        case "isref":
                            if (DocumentSearch.value != "-1")
                            {
                                isref = DocumentSearch.value;
                            }
                            break;
                        case "showdocument":
                            if (DocumentSearch.value == "true")
                            {
                                strWhere += "and \"isdirectory\" = '0'";
                            }
                            break;
                        case "begindate":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and \"createdOn\" <= '" + DocumentSearch.value + "'";
                            }
                            break;
                        case "enddate":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and \"createdOn\">= '" + DocumentSearch.value + "'";
                            }
                            break;
                    }
                    i++;
                }
            }

            if (strWhere.Length > 0)
            {
                var where = new WhereClause(strWhere);
                oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new Pagination(result.PageNumber, result.PageSize), where).ToView();
            }
            else
            {
                oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new Pagination(result.PageNumber, result.PageSize),
                    new WhereClause("\"parent\" = '" + fedocument.Id + "'  and \"isTrash\" = '" + isTrash + "' ")).ToView();
            }

            #region//------------------------ 排序-------------------------//
            string strpropertyName = string.Empty;
            string strDataType = string.Empty;
            Order order;
            if (sortType == 0) { order = Order.Asc; } else { order = Order.Desc; }
            if (string.IsNullOrEmpty(sortField)) { sortField = "name"; }
            switch (sortField)
            {
                case "name":
                    strpropertyName = "name";
                    strDataType = DataType.STRING;
                    break;
                case "Size":
                    strpropertyName = "size";
                    strDataType = DataType.FLOAT;
                    break;
                case "FileType":
                    strpropertyName = "extensionName";
                    strDataType = DataType.STRING;
                    break;
                case "CreatedOn":
                    strpropertyName = "createdOn";
                    strDataType = DataType.DATE;
                    break;
                default:
                    strpropertyName = "name";
                    strDataType = DataType.STRING;

                    break;
            }
            oc.OrderByClause.Add(new OrderByCell(strpropertyName, strDataType, order));
            #endregion

            //添加子文件
            foreach (var file in oc)
            {

                if (file.IsDirectory)
                {
                    FileCount = FileCount + 1; //不包含文档包
                }
                else
                {
                    FileImageCount = FileImageCount + 1; //文档或者文档包
                }
                var model = new FeDataGridItemViewModel(file);
                model.IsRef = false;
                model.IsShowImageView = false;
                model.Icon = "";
                if (file.FileType.Icon != null && file.FileType.Icon.IsExists() && !string.IsNullOrEmpty(file.FileType.Icon.PathName))
                {
                    model.Icon = file.FileType.Icon.PathName;
                    model.Width = file.FileType.Icon.Width;
                    model.Height = file.FileType.Icon.Height;
                }
                if (!string.IsNullOrEmpty(file.FileType.FaIcon))
                {
                    model.FaIcon = file.FileType.FaIcon;
                }
                if (string.IsNullOrEmpty(model.Icon) && string.IsNullOrEmpty(model.FaIcon))
                {
                    model.FaIcon = "fa fa-file-o";
                }
                model.Creator = file.Creator.CombinedLabel;//创建人
                if (isref == "all")
                {
                    result.Items.Add(model);
                }
                else if (isref == "0" && model.IsRef == false)
                {
                    result.Items.Add(model);
                }
                else if (isref == "1" && model.IsRef)
                {
                    result.Items.Add(model);
                }
            }
            #endregion

            //从后台设置分页信息
            result.RecordTotal =int.Parse(oc.Pagination.RowCount.ToString());         

            //目录排序
            result.Items = result.Items.OrderByDescending(t => t.IsDirectory).ToList();
                //.Skip((result.PageNumber - 1) * result.PageSize).Take(result.PageSize).ToList();
            result.Loading = true;
            result.ShowRefresh = false;

            //配置列信息
            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "名称",
                Field = "Name",
                Align = "center"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "类型",
                Field = "FileType",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "大小",
                Field = "FileSize",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "是否引用",
                Field = "IsRef",
                Align = "center",
                Width = "100",
                Formatter = "function (value,rowData,rowIndex){ if(value) {return '是';} else {return '否';} }"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "引用次数",
                Field = "RefCount",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "上传者",
                Field = "Creator",
                Align = "center"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "上传时间",
                Field = "CreateOn",
                Align = "center",
                Width = "233",
                Formatter = "function(value,rowData,rowIndex){ return DataFormater(value); }"
            });

            string resultSize = "0";
            long FileSize = (int)fedocument.Size;
            if (FileSize < 1024)
            {
                resultSize = FileSize + "K";
            }
            else if (FileSize / 1024 > 0 && FileSize / 1024 < 1024)
            {
                resultSize = (FileSize / 1024).ToString("F2") + "M";
            }
            else
            {
                resultSize = (FileSize / 1024 / 1024).ToString("F2") + "G";
            }
            result.NavRightText = "大小" + resultSize + " 共" + FileCount + "个文件夹和" + FileImageCount +
                                  "个文档";

            return Json(result);
        }

        /// <summary>
        /// 回收站列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public JsonResult GetRecyclePageList(int pageNumber, int pageSize, string param)
        {

            #region //检索文件目录
            var DocumentSearchlist = JsonConvert.DeserializeObject<List<DocumentSearch>>(param);
            ObjektCollection<File> oc = null;
            string  isTrash = "1"; //默认回收
           
            var strWhere = "";
            var fedocumentFile= ObjektFactory.Find<File>(FeFileIDs.FeDocument);
            {     
                strWhere = " { fn LCASE(\"" + PropertyNames.pathName + "\")}  like  '" + fedocumentFile.PathName.ToLower() + "%' and \"isTrash\" = '" + isTrash + "' ";                
                var i = 0;
                while (i < DocumentSearchlist.Count)
                {
                    var DocumentSearch = DocumentSearchlist[i];
                    switch (DocumentSearch.field)
                    {
                        case "dicname":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")}  like '%" + DocumentSearch.value.ToLower() + "%' and \"isdirectory\" = '1' ";
                            }
                            break;
                        case "picname":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")}  like '%" + DocumentSearch.value.ToLower() + "%' and \"isdirectory\" = '0'";
                            }
                            break;
                        case "creator":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and \"creator\" in (select  \"id\"  from  \"Identity\"  where fn LCASE(\"" + PropertyNames.combinedLabel + "\")} like \'%" + DocumentSearch.value.ToLower() + "%\')";
                            }
                            break;
                        //case "isref":
                        //    if (DocumentSearch.value != "-1")
                        //    {
                        //        isref = DocumentSearch.value;
                        //    }
                        //    break;
                        case "showdocument":
                            if (DocumentSearch.value == "true")
                            {
                                strWhere += "and \"isdirectory\" = '0'";
                            }
                            break;
                        case "begindate":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and \"createdOn\" <= '" + DocumentSearch.value + "'";
                            }
                            break;
                        case "enddate":
                            if (!string.IsNullOrEmpty(DocumentSearch.value))
                            {
                                strWhere += "and \"createdOn\">= '" + DocumentSearch.value + "'";
                            }
                            break;
                    }

                    i++;
                }
                    
                }
            

                var where = new WhereClause(strWhere);
                oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),new Pagination(pageNumber, pageSize), where).ToView();
                oc.OrderByClause.Add(new OrderByCell("modifiedOn", DataType.DATE, Order.Desc));
            #endregion

            List<FeFileModel> listFeFileModel = new List<FeFileModel>();
            foreach (var m in oc)
            {               
                FeFileModel fefilemodel = new FeFileModel();
                fefilemodel.Id = m.Id.ToString();
                if (string.IsNullOrEmpty(m.ExtensionName)) {
                    fefilemodel.Icon = "FrontEnd/Back/Content/images/folder.png"; //文件夹文档
                    fefilemodel.ExtensionName = "文件夹"; }
                else
                {
                    fefilemodel.ExtensionName = m.ExtensionName;
                    //fefilemodel.Icon = m.PathName;

                }               
                if (m.FileType.Icon != null && m.FileType.Icon.IsExists() && !string.IsNullOrEmpty(m.FileType.Icon.PathName))
                {
                    fefilemodel.Icon = m.FileType.Icon.PathName;
                }
                if (!string.IsNullOrEmpty(m.FileType.FaIcon))
                {
                    fefilemodel.FaIcon = m.FileType.FaIcon;
                }
                if (string.IsNullOrEmpty(fefilemodel.Icon) && string.IsNullOrEmpty(fefilemodel.FaIcon))
                {
                    fefilemodel.FaIcon = "fa fa-file-o";
                }

                fefilemodel.Size = m.Size.ToString();
                fefilemodel.Name = m.Name; 
                fefilemodel.Creator = m.Creator.CombinedLabel;
                fefilemodel.ModifiedOn = DateTime.Parse(m.ModifiedOn.ToString()).ToString("yyyy/MM/dd  HH:mm:ss");

                listFeFileModel.Add(fefilemodel);              
            }

            var data = $"{{ \"total\": \"{oc.Pagination.RowCount}\", \"rows\": {listFeFileModel.ObjectToJson()} }}";
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 撤销回收
        /// </summary>
        /// <returns></returns>
        public JsonResult Trash(List<FeFileModel> listfefile)
        {
            foreach (var tag in listfefile)
            {
                File file = ObjektFactory.Find<File>(tag.Id);
                file.Revert();
                file.Save();
            }
            return Json(new JsonResultModel());
        }
        /// <summary>
        /// 彻底删除
        /// </summary>
        /// <returns></returns>
        public JsonResult RemoveCompletely(List<FeFileModel> listfefile)
        {
            foreach (var tag in listfefile)
            {
                File file = ObjektFactory.Find<File>(tag.Id);
                file.Delete();
                file.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 清空回收站
        /// </summary>
        /// <returns></returns>
        public JsonResult ClearCompletely()
        {
            var oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),
              new WhereClause("\"parent\" = '" + FeFileIDs.FeDocument + "' and \"isTrash\" = '1' "));  //回收的所有文档
            foreach (var tag in oc)
            {
                File file = ObjektFactory.Find<File>(tag.Id);
                file.Delete();
                file.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 文件夹是否存在
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult ISExist(string parentdic, string newdicname)
        {
            if (string.IsNullOrEmpty(parentdic))
            {
                parentdic = FeFileIDs.FeDocument;
            }

            var oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),
                new WhereClause("\"parent\" = '" + parentdic + "' and { fn LCASE(\"" + PropertyNames.name + "\")} = '" + newdicname.ToLower() + "' "));
            if (oc.Count >= 1)
            {

                var data = new JsonResultModel("false");
                return Json(data);
            }
            else
            {
                var data = new JsonResultModel("true");
                return Json(data);
            }
        }

        /// <summary>
        ///新建文件夹
        /// </summary>
        [HttpPost]
        public JsonResult AddNewDic(string parentdic, string newdicname)
        {
            if (string.IsNullOrEmpty(parentdic))
            {
                parentdic = FeFileIDs.FeDocument;
            }
            var dicFile = new File();
            dicFile.Name = newdicname;
            dicFile.IsDirectory = true;
            dicFile.Parent = ObjektFactory.Find<File>(parentdic);           
            dicFile.Save();
            return Json(new JsonResultModel());
        }


        /// <summary>
        ///     @*'移动', '替换', '查看引用', '下载', '放入回收站', '彻底删除'*@
        /// </summary>
        /// <returns></returns>
        /// 

        public JsonResult DicTree(string parentId, string isTrash, string noShowId)
        {
            var fedocumentid = FeFileIDs.FeDocument;
            var fedocument = ObjektFactory.Find<File>(fedocumentid);
            var list = fedocument.GetDescendantsDirectorys();
            List<FeFileModel> modelList = new List<FeFileModel>();

            modelList.Add(new FeFileModel()
            {
                Id = fedocumentid.Replace("@", "*"),
                Name = fedocument.Name,
                //如果是顶层节点必须为null，easyui才能识别。
                //@转为*号，easyui才能识别。
                _parentId =  null ,
                CreateOn = fedocument.CreatedOn.ToString()

            });

            foreach (var item in list)
            {
                if (item.IsTrash == true) { continue; }
                modelList.Add(new FeFileModel()
                {
                    Id = item.Id.Replace("@", "*"),
                    Name = item.Name,
                    //如果是顶层节点必须为null，easyui才能识别。
                    //@转为*号，easyui才能识别。
                    _parentId = item.Parent.Id.Replace("@", "*"),
                    CreateOn = item.CreatedOn.ToString()
                              
                });
            }
            modelList = modelList.OrderBy(t => t.CreateOn).ToList();

            //不包含自己和自己的子孙节点，
            if (!string.IsNullOrWhiteSpace(noShowId))
            {
                string[] noShowids = noShowId.Split(',');
                for (int i = 0; i < noShowids.Length; i++)
                {
                    var entity = ObjektFactory.Find<File>(noShowids[i]);
                    if (entity != null)
                    {
                        string removeId = entity.Id.Replace("@", "*");
                        var query = from t in modelList
                                    where t.Id == removeId
                                    select t;

                        var removeItem = query.SingleOrDefault();

                        if (removeItem != null)
                        {
                            modelList.Remove(removeItem);
                        }
                        var descendants = entity.GetDescendants();
                        foreach (var item in descendants)
                        {
                            removeId = item.Id.Replace("@", "*");
                            query = from t in modelList
                                    where t.Id == removeId
                                    select t;

                            removeItem = query.SingleOrDefault();

                            if (removeItem != null)
                            {
                                modelList.Remove(removeItem);
                            }
                        }
                    }
                }
            }

            var source = new
            {
                total = modelList.Count,
                rows = modelList
            };
            return Json(source, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 移动文件
        /// </summary>
        /// <returns></returns>
        public JsonResult MoveFile(string moveid, string moveToid)
        {

            //moveid 可以多个同时移动
            string[] moveids = moveid.Split(',');
            for (int i = 0; i < moveids.Length; i++)
            {
                var MovedicFile = ObjektFactory.Find<File>(moveids[i]);
                var moveTodicFile = ObjektFactory.Find<File>(moveToid.Replace("*", "@"));
                MovedicFile.Parent = moveTodicFile;
                MovedicFile.Save();
            }
            return Json(new JsonResultModel());
        }


        /// <summary>
        /// 文档文件夹打包下载
        /// </summary>
        /// 
        public FilePathResult DownLoadPic(string ids)
        {
            //文件夹，文档包 ，文档
            HttpContextBase context = this.HttpContext;
            //上传的目录
            string fileZipTime = System.DateTime.Now.ToString("yyyyMMddhhmmss");

            string downloadDir = "~/fileupload/Document_" + System.DateTime.Now.ToString("yyyyMMddhhmmss");
            //生成年月文件夹及日文件夹
            if (!System.IO.Directory.Exists(context.Server.MapPath(downloadDir)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(downloadDir));
            }
            //所有文件存储路径          
            string downloadPath = downloadDir + "/Document_" + fileZipTime;
            if (!System.IO.Directory.Exists(context.Server.MapPath(downloadPath)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(downloadPath));// 删除原命名文件
            }
            string[] Fileids = ids.Split(',');

            #region //获取文件
            for (int i = 0; i < Fileids.Length; i++)
            {
                File directoryfiles = ObjektFactory.Find<File>(Fileids[i]);
                if (directoryfiles.IsDirectory)
                {
                    string childfilepath = downloadPath + "/" + directoryfiles.Name;
                    if (!System.IO.Directory.Exists(context.Server.MapPath(childfilepath)))
                    {
                        System.IO.Directory.CreateDirectory(context.Server.MapPath(childfilepath));// 删除原命名文件
                    }
                    foreach (var files in directoryfiles.GetChildren().ToList())
                    {
                        if (files.IsDirectory == true)
                        {
                            CreateChildrenFile(context, childfilepath, files);
                        }
                        else
                        {
                            File file = ObjektFactory.Find<File>(files.Id);
                            using (System.IO.Stream fst = file.FileContent)
                            {
                                byte[] buffer = new byte[fst.Length];
                                fst.Read(buffer, 0, buffer.Length);
                                // 设置当前流的位置为流的开始 
                                fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件              
                                System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(childfilepath + "/" + file.Name.Replace("_*", "_auto")), System.IO.FileMode.Create);
                                System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                                bw.Write(buffer);
                                bw.Close();
                                fs.Close();
                            }
                        }
                    }
                }
                else
                {
                    File file = ObjektFactory.Find<File>(directoryfiles.Id); //直接为文档
                    using (System.IO.Stream fst = file.FileContent)
                    {
                        byte[] buffer = new byte[fst.Length];
                        fst.Read(buffer, 0, buffer.Length);
                        // 设置当前流的位置为流的开始 
                        //fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件              
                        System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(downloadPath + "/" + file.Name), System.IO.FileMode.Create);
                        System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                        bw.Write(buffer);
                        bw.Close();
                        fs.Close();
                    }
                }
            }
            #endregion

            //打包压缩
            string zippath = downloadDir + "/" + fileZipTime + ".zip";
            string serverzippath = context.Server.MapPath(zippath);
            ZipUtil.Zip(context.Server.MapPath(downloadPath), serverzippath, "");
            return File(zippath, "application/zip", fileZipTime+".zip");
        }

        /// <summary>
        /// 创建子文件目录
        /// </summary>
        /// <param name="context"></param>
        /// <param name="downloadDir"></param>
        /// <param name="childfile"></param>
        public void CreateChildrenFile(HttpContextBase context, string downloadDir, File childfile)
        {
            string childfilepath = downloadDir + "/" + childfile.Name;
            if (childfilepath.EndsWith(".feimgpack"))
            {
                childfilepath = childfilepath.Replace(".feimgpack", ""); //名称替换
            }
            if (!System.IO.Directory.Exists(context.Server.MapPath(childfilepath)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(childfilepath));// 删除原命名文件
            }
            foreach (var files in childfile.GetChildren().ToList())
            {
                if (files.IsDirectory == true)
                {
                    CreateChildrenFile(context, childfilepath, files);
                }
                else
                {
                    File file = ObjektFactory.Find<File>(files.Id);
                    using (System.IO.Stream fst = file.FileContent)
                    {
                        byte[] buffer = new byte[fst.Length];
                        fst.Read(buffer, 0, buffer.Length);
                        // 设置当前流的位置为流的开始 
                        fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件              
                        System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(childfilepath + "/" + file.Name.Replace("_*", "_auto")), System.IO.FileMode.Create);
                        System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                        bw.Write(buffer);
                        bw.Close();
                        fs.Close();
                    }
                }
            }
        }

        /// <summary>
        /// 回收
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public JsonResult TrashFile(string ids)
        {
            string[] Fileids = ids.Split(',');
            for (int i = 0; i < Fileids.Length; i++)
            {
                if (!FeFileIDs.FeLockFiles.Contains(Fileids[i]))
                {
                    var dicFile = ObjektFactory.Find<File>(Fileids[i]);
                    dicFile.Trash();
                }
                else
                {
                    throw new Exception("包含系统文件，无法执行回收");
                }
            }
            return Json(new JsonResultModel());
        }



        /// <summary>
        ///     '彻底删除'
        /// </summary>
        /// <returns></returns>
        public JsonResult delFile(string fileids)
        {
            string[] ids = fileids.Split(',');
            foreach (string a in ids)
            {
                if (!FeFileIDs.FeLockFiles.Contains(a))
                {
                    var dicFile = ObjektFactory.Find<File>(a);
                    dicFile.Delete();
                    dicFile.Save();
                }
                else
                {
                    throw new Exception("包含系统文件，无法执行删除");
                }

            }
            return Json(new JsonResultModel());
        }





    }


    public struct DocumentSearch
    {
        public string field { get; set; }

        public string value { get; set; }

        //public string operator { get; set; }
    }
}