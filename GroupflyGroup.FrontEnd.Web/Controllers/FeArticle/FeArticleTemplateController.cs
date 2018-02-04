using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    /// <summary>
    /// 模板管理
    /// </summary>
    public class FeArticleTemplateController : Platform.Web.Controllers.BaseController
    {
        #region 模板保存路径
        //public string strTemplate =FeFileIDs.FeTemplate;                              // 文件系统根目录
        /// <summary>
        /// 首页模板目录
        /// </summary>        
        public string strHomeTemplate = FeFileIDs.FeHomeTemplate;
        /// <summary>
        /// 首页模板备份目录
        /// </summary>
        public string strHomeTemplateBackup = FeFileIDs.FeHomeTemplateBackup;
        /// <summary>
        /// 频道模板目录
        /// </summary>
        public string strChannelTemplate = FeFileIDs.FeChannelTemplate;
        /// <summary>
        /// 频道模板备份目录
        /// </summary>
        public string strChannelTemplateBackup = FeFileIDs.FeChannelTemplateBackup;
        #endregion

        #region 模板视图加载
        /// <summary>
        /// 模板首页视图
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }
        /// <summary>
        /// 模板上传视图
        /// </summary>
        /// <returns></returns>
        public ActionResult AddTemplate()
        {
            return View("FeArticleTemplateOperater", new BaseViewModel());
        }
        #endregion

        #region 模板操作
        #region 获取模板列表、备份模板列表
        /// <summary>
        /// 获取模板列表
        /// </summary>
        /// <param name="templateType">模板类型 默认为文章模板列表</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult TemplateList(string templateType)
        {
            FeArticleTemplateModelList list = GetTemplate("", templateType);
            ViewBag.TemplateType = templateType;
            return PartialView("FeArticleTemplateList", list);
        }

        /// <summary>
        /// 获取备份模板列表
        /// </summary>
        /// <param name="templateId">源模板ID</param>
        /// <param name="templateType">模板类型</param>
        /// <returns></returns>
        public ActionResult BackupTemplateList(string templateId, string templateType)
        {
            FeArticleTemplateModelList list = GetTemplate(templateId, templateType);
            ViewBag.TemplateType = templateType;
            return PartialView("FeArticleTemplateListBakup", list);
        }

        /// <summary>
        /// 获取模板列表
        /// </summary>
        /// <param name="templateId">源模板ID</param>
        /// <param name="templateType">模板类型</param>
        /// <returns></returns>
        private FeArticleTemplateModelList GetTemplate(string templateId, string templateType)
        {
            string type = templateType == FeValueValues.FeTemplateType_Channel ? FeValueIDs.FeTemplateType_Channel : FeValueIDs.FeTemplateType_ArticleSystem;
            FeArticleTemplateModelList list = new FeArticleTemplateModelList();
            list.listArticleTemplateModel = new List<FeArticleTemplateModel>();
            list.listChannelTemplateModel = new List<FeArticleTemplateModel>();
            var where = new WhereClause("\"type\" = '" + type + "'" + " AND \"backupSource\" IS NULL");
            if (!string.IsNullOrEmpty(templateId))
            {
                where = new WhereClause("\"type\" = '" + type + "'" + " AND \"backupSource\"='" + templateId + "'");
            }
            ObjektCollection<FeTemplate> newFeTemplate = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), where).ToView();

            foreach (var file in newFeTemplate)
            {
                //加载图片
                string imgPath = file.Directory.PathName + "/" + "thumb.jpg";
                string imgUrl = "./FrontEnd/Back/Content/images/noimage.gif";
                //判断文件系统是否存在
                var images = Platform.ObjectFramework.File.ForPathName(imgPath);
                if (images != null)
                {
                    imgUrl = HttpContext.Request.ApplicationPath + imgPath;
                }
                FeArticleTemplateModel temp = new FeArticleTemplateModel()
                {
                    Id = file.Id,
                    ImageURL = imgUrl,
                    TemplateName = file.Name,
                    DirectoryName = file.Directory.Name,
                    IsDefault = file.IsDefault,
                    IsEnable = file.IsEnable,
                    TemplateType = file.Type.Value_,
                    TemplateTypeId = file.Type.Id,
                    CreatedOn = file.CreatedOn,
                    Description = file.Description,
                    IsSystemTemplate = file.IsSystemTemplate,
                };
                if (file.Type.Id == FeValueIDs.FeTemplateType_ArticleSystem)
                {
                    list.listArticleTemplateModel.Add(temp);
                }
                if (file.Type.Id == FeValueIDs.FeTemplateType_Channel)
                {
                    list.listChannelTemplateModel.Add(temp);
                }
            }
            list.listArticleTemplateModel = list.listArticleTemplateModel.OrderByDescending(t => t.CreatedOn).ToList();
            list.listChannelTemplateModel = list.listChannelTemplateModel.OrderByDescending(t => t.CreatedOn).ToList();

            return list;
        }
        #endregion

        #region 修改模板启用状态（启用、禁用）使用状态（正在使用）
        /// <summary>
        /// 修改模板启用状态（启用、禁用）使用状态（正在使用）
        /// </summary>
        /// <param name="templatetId">模板名称</param>
        /// <param name="templateType">模板类型</param>
        /// <param name="status">模板状态：able启用 enable禁用 defalut应用</param>
        /// <returns></returns>
        public JsonResult OperateTemplateStatus(string templatetId, string templateType, string status)
        {
            var result = new JsonResultModel("false");
            if (!string.IsNullOrEmpty(status))
            {
                //正在使用模板只有一套
                if (status == "default")
                {
                    string type = templateType == FeValueValues.FeTemplateType_ArticleSystem ? FeValueIDs.FeTemplateType_ArticleSystem : FeValueIDs.FeTemplateType_Channel;
                    var where = new WhereClause("\"type\" = '" + type + "'");
                    var feTemplates = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), where);
                    foreach (var templates in feTemplates)
                    {
                        templates.IsDefault = false;
                        templates.Save();
                    }
                }
                //修改模板状态
                FeTemplate template = ObjektFactory.Find<FeTemplate>(templatetId);
                switch (status)
                {
                    case ("able"): template.IsEnable = true; break;
                    case ("enable"): template.IsEnable = false; break;
                    case ("default"): template.IsDefault = true; break;
                }
                template.Save();
                result = new JsonResultModel();
            }
            return Json(result);
        }
        #endregion

        #region 修改模板名称、说明
        /// <summary>
        /// 修改模板名称 说明
        /// </summary>
        /// <param name="templatetId">模板ID</param>
        /// <param name="name">模板名称</param>
        /// <param name="description">模板说明</param>
        /// <returns></returns>
        public JsonResult OperateTemplateTitle(string templatetId, string name, string description)
        {
            FeTemplate template = ObjektFactory.Find<FeTemplate>(templatetId);
            if (!string.IsNullOrEmpty(name))
            {
                template.Name = name;
            }
            if (!string.IsNullOrEmpty(description))
            {
                template.Description = description;
            }
            template.Save();
            var resault = new JsonResultModel();
            return Json(resault);
        }
        #endregion

        #region 备份模板、复制模板
        /// <summary>
        /// 备份模板、复制模板
        /// </summary>
        /// <param name="sourceTemplatetId">源模板</param>
        /// <param name="type">new表示复制，产生新模板 backup表示备份，产生备份模板</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult BackupTemplate(string sourceTemplatetId, string type)
        {
            FeTemplate sourceTemplate = ObjektFactory.Find<FeTemplate>(sourceTemplatetId);

            File dicFile = new File();//文件模板对应的根目录文件
            string strTemplate, directoryName;
            if (type == "backup")//备份模板
            {
            directoryName = System.Text.RegularExpressions.Regex.Replace(sourceTemplate.Directory.Name, @"\d{18}$", "") +System.DateTime.Now.ToString("yyyyMMddHHmmssffff");
                if (sourceTemplate.Type.Id == FeValueIDs.FeTemplateType_ArticleSystem)
                {
                    strTemplate = strHomeTemplateBackup;
                }
                else
                {
                    strTemplate = strChannelTemplateBackup;
                }
            }
            else//复制模板
            {
                directoryName = GetNewDirectory(sourceTemplate.Directory.Name);
                if (sourceTemplate.Type.Id == FeValueIDs.FeTemplateType_ArticleSystem)
                {
                    strTemplate = strHomeTemplate;
                }
                else
                {
                    strTemplate = strChannelTemplate;
                }
            }
            File entity = ObjektFactory.Find<File>(strTemplate);
            dicFile.Parent = entity;
            dicFile.Name = directoryName;
            dicFile.IsDirectory = true;
            dicFile.IsLink = false;
            dicFile.Save();

            FeTemplate backupTemplate = new FeTemplate();
            backupTemplate.Name = directoryName;
            backupTemplate.Description = sourceTemplate.Description;

            backupTemplate.Directory = dicFile;
            backupTemplate.Type = sourceTemplate.Type;
            backupTemplate.IsDefault = false;
            backupTemplate.IsEnable = false;
            //备份操作时备份模板的源模板为原模板
            if (type == "backup")
            {
                backupTemplate.BackupSource = sourceTemplate;
            }
            backupTemplate.Save();

            //CopyFile(backupTemplate.Id, sourceTemplatetId);
            ReplaceFile(backupTemplate.Id, sourceTemplatetId);

            return Json(new JsonResultModel());
        }
        /// <summary>
        /// 生成新目录
        /// </summary>
        /// <param name="directory">原目录</param>
        /// <returns></returns>
        private string GetNewDirectory(string directory)
        {
            var oc = new ObjektCollection<FeTemplate>
                (
                Klass.ForId(FeKlassIDs.FeTemplate),
                new WhereClause("\"directory\" in( select \"id\" from \"File\" where \"name\" like '"+directory+"_Copy%')")
                );
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.createdOn, Order.Desc));
            var entity = oc.FirstOrDefault();

            var newDirectory = directory+"_Copy";

            if (entity != null && entity.IsExists())
            {
                int number = 1;//当前复制目录数
                int index = entity.Directory.Name.LastIndexOf("_Copy");
                if ((index+5) != entity.Directory.Name.Length)
                {
                    number = int.Parse(entity.Directory.Name.Substring(index + 5));
                }
                newDirectory = entity.Directory.Name.Substring(0,entity.Directory.Name.LastIndexOf("_Copy")) + (number+1);
            }

            return newDirectory;
        }

        /// <summary>
        /// 获取文件
        /// </summary>
        /// <param name="backupTemplateId">备份模板ID</param>
        /// <param name="sourceTemplatetId">源模板ID</param>
        private void CopyFile(string backupTemplateId, string sourceTemplatetId)
        {
            #region //获取文件
            FeTemplate sourceTemplate = ObjektFactory.Find<FeTemplate>(sourceTemplatetId);
            FeTemplate backupTemplate = ObjektFactory.Find<FeTemplate>(backupTemplateId);

            foreach (var files in sourceTemplate.Directory.GetChildren().ToList())
            {
                if (files.IsDirectory == true)
                {
                    File newfile = new File();
                    newfile.Name = files.Name;
                    newfile.IsDirectory = true;
                    newfile.IsLink = false;
                    newfile.Parent = backupTemplate.Directory; //新模板目录 
                    newfile.Save();
                    CopyChildrenFile(files, newfile);
                }
                else
                {
                    File file = ObjektFactory.Find<File>(files.Id);
                    File newfile = new File();
                    newfile.Name = file.Name;
                    newfile.IsDirectory = false;
                    newfile.IsLink = false;
                    newfile.Parent = backupTemplate.Directory; //新模板目录 
                    byte[] bytecontent = file.FileContent.ToBytes();
                    System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
                    newfile.FileContent = sm;
                    newfile.Save();
                }
            }
            #endregion
        }
        /// <summary>
        /// 获取子文件
        /// </summary>
        /// <param name="childfile"></param>
        /// <param name="fnewfile"></param>
        private void CopyChildrenFile(File childfile, File fnewfile)
        {
            foreach (var files in childfile.GetChildren().ToList())
            {
                if (files.IsDirectory == true)
                {
                    File newfile = new File();
                    newfile.Name = files.Name;
                    newfile.IsDirectory = true;
                    newfile.IsLink = false;
                    newfile.Parent = fnewfile;
                    newfile.Save();
                    CopyChildrenFile(files, newfile);
                }
                else
                {
                    File file = ObjektFactory.Find<File>(files.Id);
                    file.Load();
                    File newfile = new File();
                    newfile.Name = file.Name;
                    newfile.IsDirectory = false;
                    newfile.IsLink = false;
                    newfile.Parent = fnewfile;
                    byte[] bytecontent = file.FileContent.ToBytes();
                    System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
                    newfile.FileContent = sm;
                    newfile.Save();
                }
            }
        }

        /// <summary>
        /// 通过对象引用方式获取文件
        /// </summary>
        /// <param name="backupTemplateId">备份文件</param>
        /// <param name="sourceTemplatetId">源文件</param>
        private void ReplaceFile(string backupTemplateId, string sourceTemplatetId)
        {
            FeTemplate sourceTemplate = ObjektFactory.Find<FeTemplate>(sourceTemplatetId);
            FeTemplate backupTemplate = ObjektFactory.Find<FeTemplate>(backupTemplateId);

            foreach (var sourceFile in sourceTemplate.Directory.GetChildren().ToList())
            {
                File backupFile = (File)sourceFile.Replicate();
                backupFile.Parent = backupTemplate.Directory;
                backupFile.Save();
                if (sourceFile.IsDirectory == true)
                {
                    ReplaceChildrenFile(sourceFile, backupFile);
                }
            }
        }
        /// <summary>
        /// 通过对象引用方式获取子文件
        /// </summary>
        /// <param name="sourceDirectory">备份文件</param>
        /// <param name="backupDirectory">源文件</param>
        private void ReplaceChildrenFile(File sourceDirectory, File backupDirectory)
        {
            foreach (var sourceFile in sourceDirectory.GetChildren().ToList())
            {
                File backupFile = (File)sourceFile.Replicate();
                backupFile.Parent = backupDirectory;
                backupFile.Save();
                if (sourceFile.IsDirectory == true)
                {
                    CopyChildrenFile(sourceFile, backupFile);
                }
            }
        }
        #endregion

        #region 模板恢复
        /// <summary>
        /// 恢复备份
        /// </summary>
        /// <param name="backupTemplatetId">模板ID</param>
        /// <returns></returns>
        public JsonResult RecoverTemplate(string backupTemplatetId)
        {
            //获取备份模板
            FeTemplate backupTemplate = ObjektFactory.Find<FeTemplate>(backupTemplatetId);
            if (backupTemplate.BackupSource != null)
            {
                //获取备份模板目录
                File backupDirectory = backupTemplate.Directory;
                //获取备份模板的还原目标模板目录
                File sourceDirectory = backupTemplate.BackupSource.Directory;
                //获取备份模板目录下的所有目录和文件
                foreach (var backupFile in backupDirectory.GetChildren().ToList())
                {
                    //查询源模板有无此目录或文件
                    var sourceFilesWhere = new WhereClause("{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + backupFile.Name.ToLower() + "' and \"parent\" = '" + sourceDirectory.Id + "' ");
                    var sourceFilesTemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), sourceFilesWhere);
                    //备份文件是目录
                    if (backupFile.IsDirectory == true)
                    {
                        //源文件存在
                        if (sourceFilesTemp.Count > 0)
                        {
                            //这里的代码不必要
                            //File backupFile = ObjektFactory.Find<File>(backupFiles.Id);
                            File sourceFile = sourceFilesTemp[0];
                            sourceFile.Name = backupFile.Name;
                            sourceFile.IsDirectory = true;
                            sourceFile.IsLink = false;
                            sourceFile.Parent = sourceDirectory; //新模板目录 
                            sourceFile.Save();
                            RecoverChildrenFile(sourceFile, backupFile);
                        }
                        else
                        {
                            //File backupFile = ObjektFactory.Find<File>(backupFiles.Id);
                            File sourceFile = new File();
                            sourceFile.Name = backupFile.Name;
                            sourceFile.IsDirectory = true;
                            sourceFile.IsLink = false;
                            sourceFile.Parent = sourceDirectory; //新模板目录 
                            sourceFile.Save();
                            RecoverChildrenFile(sourceFile, backupFile);
                        }
                    }
                    else
                    {
                        if (sourceFilesTemp.Count > 0)
                        {
                            //File backupFile = ObjektFactory.Find<File>(backupFiles.Id);
                            File sourceFile = sourceFilesTemp[0];
                            sourceFile.Name = backupFile.Name;
                            sourceFile.IsDirectory = false;
                            sourceFile.IsLink = false;
                            //model.Linked;  对应另外一个file
                            sourceFile.Parent = sourceDirectory; //新模板目录 
                            byte[] bytecontent = backupFile.FileContent.ToBytes();
                            System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
                            sourceFile.FileContent = sm;
                            sourceFile.Save();
                        }
                        else
                        {
                            //File backupFile = ObjektFactory.Find<File>(backupFiles.Id);
                            File sourceFile = new File();
                            sourceFile.Name = backupFile.Name;
                            sourceFile.IsDirectory = false;
                            sourceFile.IsLink = false;
                            //model.Linked;  对应另外一个file
                            sourceFile.Parent = sourceDirectory; //新模板目录 
                            byte[] bytecontent = backupFile.FileContent.ToBytes();
                            System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
                            sourceFile.FileContent = sm;
                            sourceFile.Save();
                        }
                    }
                }

            }
            else
            {
                throw new Exception("备份源不存在");
            }
            #region MyRegion
            ////设定自己为默认选中
            //string file = templatetype == FeValueValues.FeTemplateType_ArticleSystem ? FeValueIDs.FeTemplateType_ArticleSystem : FeValueIDs.FeTemplateType_Channel;
            //var where = new WhereClause("\"type\" = '" + file + "'");
            //var feTemplates = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), where);
            //foreach (var templates in feTemplates)
            //{
            //    templates.IsDefault = false;
            //    templates.Save();
            //}
            //FeTemplate sourcetemplate = ObjektFactory.Find<FeTemplate>(templatetid);
            //string sourcename = System.Text.RegularExpressions.Regex.Replace(sourcetemplate.Name, @"\d{18}$", ""); //sourcetemplate.Name.Substring(0, sourcetemplate.Name.IndexOf("||back"));
            //var sourcewhere = new WhereClause("\"backupSource\" = '" + templatetid + "'"); //根目录
            //var targertTemplates = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), sourcewhere);
            //if (targertTemplates.Count == 1)
            //{
            //    File fatherFile = targertTemplates[0].Directory;
            //    fatherFile.GetChildren().DeleteAll();

            //    targertTemplates[0].IsDefault = true;
            //    targertTemplates[0].Save();

            //    foreach (var files in sourcetemplate.Directory.GetChildren().ToList())
            //    {
            //        if (files.IsDirectory == true)
            //        {
            //            File dicfile = ObjektFactory.Find<File>(files.Id);
            //            File newfile = new File();
            //            newfile.Name = dicfile.Name;
            //            newfile.IsDirectory = true;
            //            newfile.IsLink = false;
            //            //model.Linked;  对应另外一个file                  
            //            newfile.Parent = fatherFile; //模板目录   
            //            //newfile.FileContent = sm;
            //            newfile.Save();
            //            OperateBackFile(files);
            //        }
            //        else
            //        {
            //            File sourcefile = ObjektFactory.Find<File>(files.Id);
            //            File newfile = new File();
            //            newfile.Name = sourcefile.Name;
            //            newfile.IsDirectory = false;
            //            newfile.IsLink = false;
            //            //model.Linked;  对应另外一个file
            //            newfile.Parent = fatherFile; //模板目录   
            //            byte[] bytecontent = sourcefile.FileContent.ToBytes();
            //            System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
            //            newfile.FileContent = sm;
            //            newfile.Save();
            //        }
            //    }
            //} 
            #endregion
            return Json(new JsonResultModel());
        }
        private void RecoverChildrenFile(File sourceFile, File backupFile)
        {
            foreach (var backupChildFile in backupFile.GetChildren().ToList())
            {
                //查询源模板有无此目录或文件
                var sourceFilesWhere = new WhereClause("{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + backupChildFile.Name.ToLower() + "' and \"parent\" = '" + sourceFile.Id + "' ");
                var sourceFilesTemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), sourceFilesWhere);
                if (backupChildFile.IsDirectory == true)
                {
                    if (sourceFilesTemp.Count > 0)
                    {
                        // File file = ObjektFactory.Find<File>(files.Id);
                        File sourceChildFile = sourceFilesTemp[0];
                        sourceChildFile.Name = backupChildFile.Name;
                        sourceChildFile.IsDirectory = true;
                        sourceChildFile.IsLink = false;
                        sourceChildFile.Parent = sourceFile;
                        sourceChildFile.Save();
                        RecoverChildrenFile(sourceChildFile, backupChildFile);

                    }
                    else
                    {
                        // File file = ObjektFactory.Find<File>(files.Id);
                        File sourceChildFile = new File();
                        sourceChildFile.Name = backupChildFile.Name;
                        sourceChildFile.IsDirectory = true;
                        sourceChildFile.IsLink = false;
                        sourceChildFile.Parent = sourceFile;
                        sourceChildFile.Save();
                        RecoverChildrenFile(sourceChildFile, backupChildFile);
                    }
                }
                else
                {
                    if (sourceFilesTemp.Count > 0)
                    {
                        File sourceChildFile = sourceFilesTemp[0];
                        sourceChildFile.Name = backupChildFile.Name;
                        sourceChildFile.IsDirectory = false;
                        sourceChildFile.IsLink = false;
                        sourceChildFile.Parent = sourceFile;
                        byte[] bytecontent = backupChildFile.FileContent.ToBytes();
                        System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
                        sourceChildFile.FileContent = sm;
                        sourceChildFile.Save();
                    }
                    else
                    {
                        //File file = ObjektFactory.Find<File>(files.Id);
                        //file.Load();
                        File sourceChildFile = new File();
                        sourceChildFile.Name = backupChildFile.Name;
                        sourceChildFile.IsDirectory = false;
                        sourceChildFile.IsLink = false;
                        sourceChildFile.Parent = sourceFile;
                        byte[] bytecontent = backupChildFile.FileContent.ToBytes();
                        System.IO.MemoryStream sm = new System.IO.MemoryStream(bytecontent);
                        sourceChildFile.FileContent = sm;
                        sourceChildFile.Save();
                    }
                }
            }
        }
        #endregion

        #region 模板下载
        /// <summary>
        /// 下载模板
        /// </summary>
        /// <param name="templatetId"></param>
        /// <returns></returns>
        public FilePathResult DownloadTemplate(string templatetId)
        {
            //获取模板对象
            FeTemplate template = ObjektFactory.Find<FeTemplate>(templatetId);
            //创建压缩文件并生成文件下载目录
            string zippath = CeateTemplateZIP(template);
            return File(zippath, "application/zip", System.Text.RegularExpressions.Regex.Replace(template.Name, @"\d{18}$", "") + System.DateTime.Now.ToString("yyyyMMddHHmmssffff") + ".zip");
        }
        /// <summary>
        /// 把文件添加到ZIP文件
        /// </summary>
        /// <param name="templateSource"></param>
        /// <returns></returns>
        public string CeateTemplateZIP(FeTemplate templateSource)
        {
            HttpContextBase context = this.HttpContext;
            //PersistenceContext.Accept();
            //上传的目录
            string fileZipTime = System.DateTime.Now.ToString("yyyyMMddhhmmss");
            string downloadDirectory = "~/temp/" + GroupflyGroup.Platform.ObjectFramework.User.Current.Id + "/download";
            //判断是否有临时文件，用户下载备份文件并未删除，在再次上传时删除
            if (System.IO.Directory.Exists(context.Server.MapPath(downloadDirectory)))
            {
                System.IO.Directory.Delete(context.Server.MapPath(downloadDirectory), true);// 删除以前上传的文件
            }
            //生成年月文件夹及日文件夹
            if (!System.IO.Directory.Exists(context.Server.MapPath(downloadDirectory)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(downloadDirectory));
            }
            //文件存储路径          
            string downloadPath = downloadDirectory + templateSource.Directory.PathName;
            if (!System.IO.Directory.Exists(context.Server.MapPath(downloadPath)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(downloadPath));
            }

            #region //获取文件
            FeTemplate template = templateSource;
            File directoryfiles = template.Directory;
            foreach (var files in directoryfiles.GetChildren().ToList())
            {
                if (files.IsDirectory == true)
                {
                    CreateChildrenFile(context, downloadDirectory, files);
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
                        System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(downloadDirectory + file.PathName), System.IO.FileMode.Create);
                        System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                        bw.Write(buffer);
                        bw.Close();
                        fs.Close();
                    }
                }
            }
            #endregion

            #region 打包压缩
            //打包压缩
            string zippath = downloadDirectory + "/" + fileZipTime + ".zip";
            string serverzippath = context.Server.MapPath(zippath);
            ZipUtil.Zip(context.Server.MapPath(downloadPath), serverzippath, "");
            //if (System.IO.Directory.Exists(context.Server.MapPath(downloadPath)))
            //{
            //    System.IO.Directory.Delete(context.Server.MapPath(downloadPath), true);
            //}
            return zippath;
            //Response.ContentType = "application/x-zip-compressed";
            //Response.AddHeader("Content-Disposition", "attachment;filename=z.zip");
            ////string filename = Server.MapPath(zippath);
            //Response.TransmitFile(zippath);
            //文件目录删除
            //System.IO.Directory.Delete(context.Server.MapPath(downloadDir), true); 
            #endregion

        }
        /// <summary>
        /// 递归创建文件
        /// </summary>
        /// <param name="context">当前上下文</param>
        /// <param name="downloadDirectory">下载路径</param>
        /// <param name="childFile">子文件</param>
        public void CreateChildrenFile(HttpContextBase context, string downloadDirectory, File childFile)
        {
            string childfilepath = downloadDirectory + childFile.PathName;
            if (!System.IO.Directory.Exists(context.Server.MapPath(childfilepath)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(childfilepath));
            }
            foreach (var files in childFile.GetChildren().ToList())
            {
                if (files.IsDirectory == true)
                {
                    CreateChildrenFile(context, downloadDirectory, files);
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
                        System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(downloadDirectory + file.PathName), System.IO.FileMode.Create);
                        System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                        bw.Write(buffer);
                        bw.Close();
                        fs.Close();
                    }
                }
            }
        }
        #endregion

        #region 模板删除
        /// <summary>
        /// 删除模板
        /// 系统模板不让删除
        /// 存在备份模板会直接删除，删除使用模板会一起删除备份模板
        /// </summary>
        /// <param name="id">模板ID</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteTemplate(string id)
        {
            //根据id查询数据。 
            JsonResultModel result = new JsonResultModel();
            FeTemplate entity = ObjektFactory.Find<FeTemplate>(id);
            if (entity.IsDefault)
            {
                result = new JsonResultModel(false, "正在使用模板不能删除！");
            }
            else
            {
                //查询是否存在备份文件
                var whereClause = new WhereClause("\"backupSource\" = '" + id + "' ");
                var feTemplates = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), whereClause);
                foreach (var feTemplate in feTemplates)
                {
                    //删除备份模板
                    if (feTemplate.Directory.IsExists())
                    {
                        feTemplate.Directory.Delete();
                        feTemplate.Directory.Save();
                    }
                    feTemplate.Delete();
                    feTemplate.Save();
                }

                if (entity.Directory.IsExists())
                {
                    entity.Directory.Delete();
                    entity.Directory.Save();
                }
                entity.Delete();
                entity.Save();
            }
            return Json(result);
        }
        #endregion


        #region 模板上传
        /// <summary>
        /// 上传模板文件
        /// </summary>
        /// <returns></returns>
        public JsonResult ImportTemplate()
        {
            JsonResultModel result = new JsonResultModel();
            HttpContextBase context = this.HttpContext;
            string strFileName = context.Request.Params["name"];
            string strtype = context.Request.Params["type"];
            string strFileDesciption = context.Request.Params["description"];

            HttpFileCollectionBase files = context.Request.Files;
            Random r = new Random();
            //上传的目录
            string uploadDir = "~/temp/" + GroupflyGroup.Platform.ObjectFramework.User.Current.Id + "/upload";
            try
            {
                string strTemplate;
                if (strtype == FeValueIDs.FeTemplateType_ArticleSystem) { strTemplate = strHomeTemplate; } else { strTemplate = strChannelTemplate; }
                //判断文件是否存在
                //var where = new WhereClause(" { fn LCASE(\"" + PropertyNames.name + "\")}  = '" + name.toLower() + "' and \"parent\" = '" + strTemplate + "' ");
                //var modeltemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), where);
                //if (modeltemp.Count > 0)
                //{
                //    return Json(new JsonResultModel(false, "文件己存在！"));
                //}
                //生成年月文件夹及日文件夹
                if (!System.IO.Directory.Exists(context.Server.MapPath(uploadDir)))
                {
                    System.IO.Directory.CreateDirectory(context.Server.MapPath(uploadDir));
                }
                //文件存储路径          
                string uploadPath = uploadDir + "/" + Guid.NewGuid() + ".zip";
                if (System.IO.Directory.Exists(context.Server.MapPath(uploadPath)))
                {
                    System.IO.Directory.Delete(context.Server.MapPath(uploadPath), true);// 删除原命名文件
                }
                //保存文件
                files[0].SaveAs(context.Server.MapPath(uploadPath));

                string deZipPath = uploadPath.Substring(0, uploadPath.LastIndexOf("."));
                if (!System.IO.Directory.Exists(context.Server.MapPath(deZipPath)))
                {
                    System.IO.Directory.CreateDirectory(context.Server.MapPath(deZipPath));
                }

                //解压文件
                UnZipUtil.UnZip(context.Server.MapPath(uploadPath), context.Server.MapPath(deZipPath), "");

                System.IO.DirectoryInfo theFolder = new System.IO.DirectoryInfo(context.Server.MapPath(deZipPath));

                System.IO.DirectoryInfo[] dirInfo = theFolder.GetDirectories();
                System.IO.FileInfo[] theFileInfo = theFolder.GetFiles();

                if (dirInfo.Length == 1 && dirInfo[0].Name == theFolder.Name && theFileInfo.Length == 0)
                {
                    //自己文件夹与父级文件夹同名
                    theFileInfo = dirInfo[0].GetFiles();
                    dirInfo = dirInfo[0].GetDirectories();

                }

                #region 保存文件
                File model = new File();   //根目录
                string fileName=System.IO.Path.GetFileNameWithoutExtension(files[0].FileName);// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
                if (!System.Text.RegularExpressions.Regex.IsMatch(fileName, @"^[\da-zA-Z_]{2,250}$")) {
                    result = new JsonResultModel(false, "上传压缩包文件名不规范，文件名只能包含2到250个字母、数字或下划线");
                    return Json(result);
                }

                model.Name = fileName;
                model.IsDirectory = true;
                model.IsLink = false;

                File entity = ObjektFactory.Find<File>(strTemplate); // 模板路径
                model.Parent = entity;
                //model.Description = strFileDesciption;//模板描述
                //model.Linked;  对应另外一个file
                //model.FileContent = fs; 
                var where = new WhereClause(" { fn LCASE(\"" + PropertyNames.name + "\")} = '" + model.Name.ToLower() + "' and \"parent\" = '" + entity.Id + "' ");
                var modeltemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), where);
                if (modeltemp.Count > 0)
                {
                    result = new JsonResultModel(false, "模板己存在");
                    return Json(result);
                }
                else
                {
                    model.Save();
                }

                File Imagemodel = new File();       //根目录中的模板
                foreach (System.IO.FileInfo fatherfiles in theFileInfo)
                {
                    #region  //文件处理   
                    File dirInfoFilemodel = new File();       //根目录中的文件               
                    var wheredirInfoFile = new WhereClause("{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + fatherfiles.Name.ToLower() + "' and \"parent\" = '" + model.Id + "' ");
                    var dirInfoFiletemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), wheredirInfoFile);
                    if (dirInfoFiletemp.Count > 0)
                    {
                        result = new JsonResultModel(false, "模板文件己存在");
                        return Json(result);
                    }
                    else
                    {
                        dirInfoFilemodel.Name = fatherfiles.Name;
                        dirInfoFilemodel.IsDirectory = false;
                        dirInfoFilemodel.IsLink = false;
                        //model.Linked;  对应另外一个file
                        //System.IO.FileStream fs = theFolder.
                        dirInfoFilemodel.Parent = model;
                        System.IO.FileStream fs = new System.IO.FileStream(fatherfiles.FullName, System.IO.FileMode.Open);
                        dirInfoFilemodel.FileContent = fs;
                        dirInfoFilemodel.Save();
                        //fs.Close();
                    }
                    #endregion
                }

                File fathermodel = model;
                GetChildren(dirInfo, fathermodel);  //递归子文件 
                #endregion

                #region 保存到模板
                FeTemplate feTemplate = new FeTemplate();
                feTemplate.Name = strFileName;
                var whereFeTemplate = new WhereClause("{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + feTemplate.Name.ToLower() + "' and \"directory\" = '" + model.Id + "'");
                var FeTemplatetemp = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), whereFeTemplate);

                if (FeTemplatetemp.Count > 0)
                {
                    result = new JsonResultModel(false, "模板己存在");
                    return Json(result);
                }
                else
                {
                    feTemplate.Description = strFileDesciption;
                    feTemplate.Directory = model;
                    feTemplate.Type = ObjektFactory.Find<Value>(strtype);
                    feTemplate.IsDefault = false;
                    feTemplate.IsEnable = true;
                    feTemplate.Save();
                }
                #endregion

                //文件删除
                PersistenceContext.Accept();
            }
            catch (Exception e)
            {
                PersistenceContext.Discard();
                result = new JsonResultModel(false, e.Message);
            }
            finally
            {
                System.IO.Directory.Delete(context.Server.MapPath(uploadDir), true);
            }
            return Json(result);
        }
        /// <summary>
        /// 递归子文件
        /// </summary>
        /// <param name="dirInfo"></param>
        /// <param name="fathermodel"></param>
        public void GetChildren(System.IO.DirectoryInfo[] dirInfo, File fathermodel)
        {
            //遍历文件夹
            foreach (System.IO.DirectoryInfo NextFolder in dirInfo)
            {
                #region MyRegion
                File modelNewfather = new File();
                modelNewfather.Name = NextFolder.Name;
                var wheremodelNewfather = new WhereClause("\"name\" = '" + modelNewfather.Name + "' and \"parent\" = '" + fathermodel.Id + "' ");
                var modelNewfathertemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), wheremodelNewfather);
                if (modelNewfathertemp.Count > 0)
                {
                    modelNewfathertemp[0].IsDirectory = true;
                    modelNewfathertemp[0].IsLink = false;
                    //model.Linked;  对应另外一个file               
                    modelNewfather.Parent = fathermodel;
                    modelNewfathertemp[0].Save();
                    modelNewfather = modelNewfathertemp[0];
                }
                else
                {
                    modelNewfather.IsDirectory = true;
                    modelNewfather.IsLink = false;
                    //model.Linked;  对应另外一个file                  
                    modelNewfather.Parent = fathermodel;
                    modelNewfather.Save();
                }
                #endregion

                System.IO.FileInfo[] fileInfo = NextFolder.GetFiles();
                foreach (System.IO.FileInfo NextFile in fileInfo)  //遍历文件
                {
                    File model = new File();
                    model.Name = NextFile.Name;
                    var wheremodel = new WhereClause("\"name\" = '" + NextFile.Name + "' and \"parent\" = '" + modelNewfather.Id + "' ");
                    var wheremodeltemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), wheremodel);
                    if (wheremodeltemp.Count > 0)
                    {
                        model = wheremodeltemp[0];
                    }
                    else
                    {
                        model.IsDirectory = false;
                        model.IsLink = false;
                        model.Parent = modelNewfather;
                        System.IO.FileStream fs = new System.IO.FileStream(NextFile.FullName, System.IO.FileMode.Open);
                        model.FileContent = fs;
                        model.Save();
                        //fs.Close();
                    }
                }

                System.IO.DirectoryInfo[] newdirInfo = NextFolder.GetDirectories();
                if (newdirInfo.Length > 0)
                    GetChildren(newdirInfo, modelNewfather);
            }
        }
        #endregion
        #endregion

        #region Old Discard
        public ActionResult Index1()
        {
            //var feArticleTemplate = new List<FeArticleTemplateModel>();
            //GroupflyGroup.Platform.ObjectFramework.File q= ObjektFactory.Find<GroupflyGroup.Platform.ObjectFramework.File>("fe0b143721b0466380a0d5608e8e894a@File");
            //var list = Klass.ForId(FeKlassIDs.FeArticleCategory).GetInstances<FeArticleCategory>();

            ObjektCollection<FeTemplate> newFeTemplate = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate));
            //string type=templatetype == FeValueValues.FeTemplateType_Channel ? FeValueIDs.FeTemplateType_Channel : FeValueIDs.FeTemplateType_ArticleSystem;
            //var where = new WhereClause("\"type\" = '" + type + "'"+ " AND \"backupSource\" IS NULL");
            //ObjektCollection<FeTemplate> newFeTemplate = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate),where);

            FeArticleTemplateModelList list = new FeArticleTemplateModelList();
            list.listArticleTemplateModel = new List<FeArticleTemplateModel>();
            list.listChannelTemplateModel = new List<FeArticleTemplateModel>();

            foreach (var file in newFeTemplate)
            {
                //File entity = file.Directory;
                //System.IO.Stream fileimage = entity.FileContent;
                FeArticleTemplateModel temp = new FeArticleTemplateModel();

                temp.Id = file.Id;

                //加载图片
                string imgPath = file.Directory.PathName + "/" + "thumb.jpg";
                //判断本地是否存在
                if (System.IO.File.Exists(Url.Content("~" + imgPath)))
                {
                    temp.ImageURL = Url.Content("~" + imgPath);
                }
                else
                {
                    //判断文件系统是否存在
                    var where = new WhereClause("\"pathName\"='" + imgPath + "'");
                    ObjektCollection<File> fefiles = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), where);
                    if (fefiles.Count > 0)
                    {
                        temp.ImageURL = HttpContext.Request.ApplicationPath + imgPath;
                    }
                    else
                    {
                        //加载默认图片
                        temp.ImageURL = "./FrontEnd/Back/Content/images/WatermarkImagePreview.jpg";
                    }
                }

                temp.TemplateName = file.Name;
                temp.DirectoryName = file.Directory.Name;
                temp.IsDefault = file.IsDefault;
                temp.IsEnable = file.IsEnable;
                temp.TemplateType = file.Type.Value_;
                temp.TemplateTypeId = file.Type.Id;
                temp.CreatedOn = file.CreatedOn;
                temp.Description = file.Description;
                temp.IsSystemTemplate = file.IsSystemTemplate;

                //加载到文章模板列表
                if (file.Type.Id == FeValueIDs.FeTemplateType_ArticleSystem)
                {
                    list.listArticleTemplateModel.Add(temp);
                }
                //加载到频道模板列表
                if (file.Type.Id == FeValueIDs.FeTemplateType_Channel)
                {
                    list.listChannelTemplateModel.Add(temp);
                }
            }
            return View(list);
        }


        /// <summary>
        /// 获取模板列表
        /// </summary>
        /// <param name="templatetype">模板类型</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult ShowList(string templatetype)
        {
            var fileKlass = Klass.ForId(KlassIDs.File);

            //var where = new WhereExpression<File>(fileKlass);
            //where.Where(PropertyNames.pathName, Const.Oper_Equals, "PathName");
            //var oc = new ObjektCollection<File>(fileKlass, where.ToWhereClause());
            //oc.Load();
            //if(oc.Count == 0)
            //{

            //}
            // string strfile = templatetype == "0" ? FeValueIDs.FeTemplateType_ArticleSystem : FeValueIDs.FeTemplateType_Channel;
            //var where = new WhereClause("\"type\" = '" + strfile + "'");
            var feTemplates = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate));

            FeArticleTemplateModelList list = new FeArticleTemplateModelList();
            list.listArticleTemplateModel = new List<FeArticleTemplateModel>();
            list.listChannelTemplateModel = new List<FeArticleTemplateModel>();
            foreach (var file in feTemplates)
            {
                //加载图片
                string imgPath = file.Directory.PathName + "/" + "thumb.jpg";
                string imgUrl = string.Empty;
                //判断本地是否存在
                if (System.IO.File.Exists(Url.Content("~" + imgPath)))
                {
                    imgUrl = Url.Content("~" + imgPath);
                }
                else
                {
                    //判断文件系统是否存在
                    var whereClause = new WhereClause("\"pathName\"='" + imgPath + "'");
                    ObjektCollection<File> fefiles = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), whereClause);
                    if (fefiles.Count > 0)
                    {
                        imgUrl = HttpContext.Request.ApplicationPath + imgPath;
                    }
                    else
                    {
                        //加载默认图片
                        imgUrl = "./FrontEnd/Back/Content/images/WatermarkImagePreview.jpg";
                    }
                }
                FeArticleTemplateModel temp = new FeArticleTemplateModel()
                {
                    Id = file.Id,
                    //ImageURL = (file.Images != null && file.Images.IsExists()) ? Url.Content("~" + file.Images.PathName) : Url.Content("~/FrontEnd/Cont ent/images/loading.gif"),
                    ImageURL = imgUrl,
                    TemplateName = file.Name,
                    DirectoryName = file.Directory.PathName,
                    IsDefault = file.IsDefault,
                    IsEnable = file.IsEnable,
                    TemplateType = file.Type.Value_,
                    TemplateTypeId = file.Type.Id,
                    CreatedOn = file.CreatedOn,
                    Description = file.Description,
                    IsSystemTemplate = file.IsSystemTemplate,
                };
                if (file.Type.Id == FeValueIDs.FeTemplateType_ArticleSystem)
                {
                    list.listArticleTemplateModel.Add(temp);
                }
                if (file.Type.Id == FeValueIDs.FeTemplateType_Channel)
                {
                    list.listChannelTemplateModel.Add(temp);
                }
            }

            //var data = $"{{\"rows\": { list.ObjectToJson()} }}";
            var resault = new JsonResultModel(list.ObjectToJson());
            return Json(resault);
        }


        public string ImportTemplateData1()
        {

            string result = "ok | ";
            try
            {
                HttpContextBase context = this.HttpContext;
                string strFileName = context.Request.Params["Name"];
                string strtype = context.Request.Params["type"];
                string strFileDesciption = context.Request.Params["description"];

                HttpFileCollectionBase files = context.Request.Files;
                Random r = new Random();
                //上传的目录
                string uploadDir = "~/fileupload/" + System.DateTime.Now.ToString("yyyyMMddhhmmss");
                //生成年月文件夹及日文件夹
                if (!System.IO.Directory.Exists(context.Server.MapPath(uploadDir)))
                {
                    System.IO.Directory.CreateDirectory(context.Server.MapPath(uploadDir));
                }
                //文件存储路径          
                string uploadPath = uploadDir + "/" + Guid.NewGuid() + ".zip";
                if (System.IO.Directory.Exists(context.Server.MapPath(uploadPath)))
                {
                    System.IO.Directory.Delete(context.Server.MapPath(uploadPath), true);// 删除原命名文件
                }
                //保存文件
                files[0].SaveAs(context.Server.MapPath(uploadPath));

                string deZipPath = uploadPath.Substring(0, uploadPath.LastIndexOf("."));
                if (!System.IO.Directory.Exists(context.Server.MapPath(deZipPath)))
                {
                    System.IO.Directory.CreateDirectory(context.Server.MapPath(deZipPath));
                }

                UnZipUtil.UnZip(context.Server.MapPath(uploadPath), context.Server.MapPath(deZipPath), "");

                System.IO.DirectoryInfo theFolder = new System.IO.DirectoryInfo(context.Server.MapPath(deZipPath));

                System.IO.DirectoryInfo[] dirInfo = theFolder.GetDirectories();
                System.IO.FileInfo[] theFileInfo = theFolder.GetFiles();

                if (dirInfo.Length == 1 && dirInfo[0].Name == theFolder.Name && theFileInfo.Length == 0)
                {
                    //自己文件夹与父级文件夹同名
                    theFileInfo = dirInfo[0].GetFiles();
                    dirInfo = dirInfo[0].GetDirectories();

                }

                File model = new File();   //根目录
                model.Name = System.IO.Path.GetFileNameWithoutExtension(files[0].FileName);// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
                model.IsDirectory = true;
                model.IsLink = false;
                string strTemplate;
                if (strtype == FeValueIDs.FeTemplateType_ArticleSystem) { strTemplate = strHomeTemplate; } else { strTemplate = strChannelTemplate; }
                File entity = ObjektFactory.Find<File>(strTemplate); // 文件系统跟目录
                model.Parent = entity;
                //model.Description = strFileDesciption;//模板描述
                //model.Linked;  对应另外一个file
                //model.FileContent = fs; 
                var where = new WhereClause(" { fn LCASE(\"" + PropertyNames.name + "\")} = '" + model.Name.ToLower() + "' and \"parent\" = '" + entity.Id + "' ");
                var modeltemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), where);
                if (modeltemp.Count > 0)
                {
                    modeltemp[0].IsDirectory = true;
                    modeltemp[0].IsLink = false;
                    //model.Linked;  对应另外一个file
                    //model.FileContent = fs; 
                    modeltemp[0].Save();
                    model = modeltemp[0];
                }
                else
                {
                    model.Save();
                }

                File Imagemodel = new File();       //根目录中的模板
                foreach (System.IO.FileInfo fatherfiles in theFileInfo)
                {
                    bool isimage = false;
                    if (fatherfiles.Extension == ".png" || fatherfiles.Extension == ".jpg")
                    {
                        #region  //图片处理
                        isimage = true;
                        var whereImage = new WhereClause(" { fn LCASE(\"" + PropertyNames.name + "\")} = '" + fatherfiles.Name.ToLower() + "' and \"parent\" = '" + model.Id + "' ");
                        var Imagemodeltemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), whereImage);
                        if (Imagemodeltemp.Count > 0)
                        {
                            Imagemodeltemp[0].Name = fatherfiles.Name;
                            Imagemodeltemp[0].IsDirectory = false;
                            Imagemodeltemp[0].IsLink = false;
                            //model.Linked;  对应另外一个file
                            //System.IO.FileStream fs = theFolder.
                            Imagemodeltemp[0].Parent = model;
                            System.IO.FileStream fs = new System.IO.FileStream(fatherfiles.FullName, System.IO.FileMode.Open);
                            Imagemodeltemp[0].FileContent = fs;
                            Imagemodeltemp[0].Save();
                            //fs.Close();
                            Imagemodel = Imagemodeltemp[0];
                        }
                        else
                        {

                            Imagemodel.Name = fatherfiles.Name;
                            Imagemodel.IsDirectory = false;
                            Imagemodel.IsLink = false;
                            //model.Linked;  对应另外一个file
                            //System.IO.FileStream fs = theFolder.
                            Imagemodel.Parent = model;
                            System.IO.FileStream fs = new System.IO.FileStream(fatherfiles.FullName, System.IO.FileMode.Open);
                            Imagemodel.FileContent = fs;
                            Imagemodel.Save();
                            //fs.Close();
                        }
                        #endregion
                    }
                    if (isimage == false)
                    {
                        #region  //其他文件处理   
                        File dirInfoFilemodel = new File();       //根目录中的文件               
                        var wheredirInfoFile = new WhereClause("{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + fatherfiles.Name.ToLower() + "' and \"parent\" = '" + model.Id + "' ");
                        var dirInfoFiletemp = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), wheredirInfoFile);
                        if (dirInfoFiletemp.Count > 0)
                        {
                            dirInfoFiletemp[0].Name = fatherfiles.Name;
                            dirInfoFiletemp[0].IsDirectory = false;
                            dirInfoFiletemp[0].IsLink = false;
                            //model.Linked;  对应另外一个file
                            //System.IO.FileStream fs = theFolder.
                            dirInfoFiletemp[0].Parent = model;
                            System.IO.FileStream fs = new System.IO.FileStream(fatherfiles.FullName, System.IO.FileMode.Open);
                            dirInfoFiletemp[0].FileContent = fs;
                            dirInfoFiletemp[0].Save();
                            //fs.Close();
                            dirInfoFilemodel = dirInfoFiletemp[0];
                        }
                        else
                        {

                            dirInfoFilemodel.Name = fatherfiles.Name;
                            dirInfoFilemodel.IsDirectory = false;
                            dirInfoFilemodel.IsLink = false;
                            //model.Linked;  对应另外一个file
                            //System.IO.FileStream fs = theFolder.
                            dirInfoFilemodel.Parent = model;
                            System.IO.FileStream fs = new System.IO.FileStream(fatherfiles.FullName, System.IO.FileMode.Open);
                            dirInfoFilemodel.FileContent = fs;
                            dirInfoFilemodel.Save();
                            //fs.Close();
                        }
                        #endregion
                    }
                }

                File fathermodel = model;
                GetChildren(dirInfo, fathermodel);  //递归子文件

                #region FeTemplate
                FeTemplate feTemplate = new FeTemplate();
                feTemplate.Name = strFileName;
                var whereFeTemplate = new WhereClause("{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + feTemplate.Name.ToLower() + "' and \"directory\" = '" + model.Id + "'");
                var FeTemplatetemp = new ObjektCollection<FeTemplate>(Klass.ForId(FeKlassIDs.FeTemplate), whereFeTemplate);

                if (FeTemplatetemp.Count > 0)
                {
                    FeTemplatetemp[0].Description = strFileDesciption;
                    FeTemplatetemp[0].Directory = model;
                    FeTemplatetemp[0].Type = ObjektFactory.Find<Value>(strtype);
                    FeTemplatetemp[0].IsDefault = false;
                    FeTemplatetemp[0].IsEnable = true;
                    FeTemplatetemp[0].Save();
                }
                else
                {
                    feTemplate.Description = strFileDesciption;
                    feTemplate.Directory = model;
                    feTemplate.Type = ObjektFactory.Find<Value>(strtype);
                    feTemplate.IsDefault = false;
                    feTemplate.IsEnable = true;
                    feTemplate.Save();
                }
                #endregion

                //文件删除
                System.IO.Directory.Delete(context.Server.MapPath(uploadDir), true);
                PersistenceContext.Accept();
            }
            catch (Exception e)
            {
                PersistenceContext.Discard();
                result = e.Message;
            }
            return result;// + strFileName + "@@" + files[0].FileName
        }

        #endregion
    }

}