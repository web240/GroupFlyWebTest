using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 文件
    /// </summary>
    public class FileController : BaseController
    {
        /// <summary>
        /// 文件下载
        /// </summary>
        /// <param name="id"></param>
        /// <param name="download"></param>
        /// <returns></returns>
        public ActionResult Index(string id, bool download = false)
        {
            var model = new FileModel();
            var fileResault = new FileStreamResult(model.GetFileContent(id), model.GetMimeType(id));
            if (download)
                fileResault.FileDownloadName = model.FileName;
            return fileResault;
        }

        /// <summary>
        /// 单文件上传
        /// </summary>
        /// <returns></returns>
        public JsonResult Upload(string directoryId)
        {
            var model = new FileModel(Request.Files[0]);
            model.Upload(directoryId);
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 文件替换
        /// </summary>
        /// <param name="fileid"></param>
        /// <returns></returns>
        public ActionResult UpLoadExchangeProcess(string fileid)
        {
            JsonResultModel result = new JsonResultModel();
            if (Request.Files.Count == 0)
            {
                result.IsSuccess = false;
                result.Message = "上传失败";
            }
            else
            {
                HttpPostedFileBase upFile = Request.Files[0];

                string strFileName = System.IO.Path.GetFileName(upFile.FileName);
                var klass = Klass.ForName(KlassNames.File);

                if (ObjektFactory.IsExists(fileid))
                {
                    File file = ObjektFactory.Find<File>(fileid);
                    file.FileContent = upFile.InputStream;
                    file.Save();
                    result.IsSuccess = true;
                    result.Data = file.PathName + strFileName;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "请选择要替换的文件！";
                }
            }
            return Json(result);
        }

        /// <summary>
        /// 多文件上传
        /// </summary>
        /// <param name="DirectoryId"></param>
        /// <returns></returns>
        public ActionResult UpLoadProcess(string DirectoryId = FileIDs.root)
        {
            JsonResultModel result = new JsonResultModel();
            if (Request.Files.Count == 0)
            {
                result.IsSuccess = false;
                result.Message = "上传失败";
            }
            else
            {
                HttpPostedFileBase upFile = Request.Files[0];

                string strFileName = System.IO.Path.GetFileName(upFile.FileName);
                var klass = Klass.ForName(KlassNames.File);
                var condition = new WhereExpression<File>(klass);
                condition.Where(PropertyNames.name, Const.Oper_Equals, strFileName, false);
                condition.Where(PropertyNames.parent, Const.Oper_Equals, DirectoryId);
                File file = new ObjektCollection<File>(klass, condition.ToWhereClause()).TryGetSingleResult();
                if (file == null)
                {
                    file = new File();
                    file.Name = strFileName;
                    file.FileContent = upFile.InputStream;
                    file.Parent = ObjektFactory.Find<File>(DirectoryId);
                    file.IsDirectory = false;
                    file.IsLink = false;
                    file.Save();
                    result.IsSuccess = true;
                    result.Data = file.PathName + strFileName;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "当前文件夹下已存在同名文件！";
                }
            }
            return Json(result);
        }

        /// <summary>
        /// 文件列表
        /// </summary>
        /// <returns></returns>
        public ActionResult FileCollectionView()
        {
            var model = new FileCollectionViewModel(KlassNames.File);
            model.AutoSelect = false;
            model.AfterInit = $"this.queryData([{{  field: '{PropertyNames.parent}', type: '{Const.Oper_Equals}', value:'{FileIDs.root}'  }}]); this.addHook('AfterSave',function(){{  var tree = $(this).closest('.easyui-layout').find('gf-tree')[0];tree.reload(); }});";
            return PartialView(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iconCls"></param>
        /// <returns></returns>
        public JsonResult GetSubFiles(string id, string iconCls = "")
        {
            var model = new FileModel(id);
            model.GetChildren();
            return Json(new JsonResultModel(model.children.ObjectToJson()));
        }
    }
}