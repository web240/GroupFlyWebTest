using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    /// <summary>
    /// 选择图片控件
    /// </summary>
    public class SelectImgController : BaseController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="IsMultiselect"></param>
        /// <param name="Title"></param>
        /// <param name="Width"></param>
        /// <returns></returns>
        // GET: Indx
        public PartialViewResult Index(bool IsMultiselect, string Title = "请选择图片",int Width = 400,string DirectoryId= FileIDs.root)
        {
            SelectImgViewModel model = new SelectImgViewModel();
            List<FileModel> FileModels = new List<FileModel>();
            FileModels.Add(new FileModel(DirectoryId));
            model.DirectoryId = DirectoryId;
            //filemodel.state = "open";
            model.Guid = Guid.NewGuid().ToString();
            model.TreeData = FileModels.ObjectToJson();
            model.IsMultiselect = IsMultiselect;
            model.Title = Title;
            model.Width = Width;
            return PartialView("_SelectImg",model);
        }
        /// <summary>
        /// 上传图片文件
        /// </summary>
        /// <param name="FileId"></param>
        /// <returns></returns>
        public JsonResult UploadImg(string FileId = FileIDs.root)
        {
            JsonResultModel result = new JsonResultModel();

            HttpPostedFileBase upFile = this.HttpContext.Request.Files[0];
            string strFileName= System.IO.Path.GetFileName(upFile.FileName);
            var klass = Klass.ForName(KlassNames.File);
            var condition = new WhereExpression<File>(klass);
            condition.Where(PropertyNames.pathName, Const.Oper_Equals, strFileName);
            condition.Where(PropertyNames.parent, Const.Oper_Equals, FileId);
            File file = new ObjektCollection<File>(klass, condition.ToWhereClause()).TryGetSingleResult();
            if (file == null)
            {
                file = new File();
                file.Name = strFileName;
                file.FileContent = upFile.InputStream;
                file.Parent = ObjektFactory.Find<File>(FileId);
                file.IsDirectory = false;
                file.IsLink = false;
                file.Save();
                result.IsSuccess = true;
            }
            else
            {
                result.IsSuccess = false;
                result.Message = "当前文件夹下已存在相同文件名图片！";
            }

            return Json(result);
        }
    /// <summary>
    /// 根据文件目录获取图片列表
    /// </summary>
    /// <param name="Page"></param>
    /// <param name="Rows"></param>
    /// <param name="FileId"></param>
    /// <param name="FileName"></param>
    /// <returns></returns>
    public JsonResult GetImgList(int Page, int Rows, string FileId,string FileName)
        {
            JsonResultModel result = new JsonResultModel();
            try
            {
                List<ImgViewModel> list = new List<ImgViewModel>();
                File file = ObjektFactory.Find<File>(FileId);
                var klass = Klass.ForName(KlassNames.File);
                var condition = new WhereExpression<File>(klass);
                condition.Where(PropertyNames.pathName, Const.Oper_BeginWith, file.PathName);
                condition.Where(PropertyNames.id, Const.Oper_NotEquals, file.Id);
                condition.Where(PropertyNames.isdirectory, Const.Oper_Equals, "false");
                if (!string.IsNullOrWhiteSpace(FileName))
                {
                    condition.Where(PropertyNames.name, Const.Oper_Contains, FileName);
                }
                var where = condition.ToWhereClause();
                where.And(new WhereClause("\"fileType\" in (select \"id\" from \"FileType\" where \"isImage\"=1 )"));
                ObjektCollection <File> descendantsFiles = new ObjektCollection<File>(klass, new Pagination(Page, Rows), where);
                descendantsFiles.OrderByClause.Add(new OrderByCell(PropertyNames.modifiedOn, Order.Desc));
                foreach (var item in descendantsFiles)
                {
                    ImgViewModel model = new ImgViewModel();
                    model.Id = item.Id;
                    model.ParentId = item.Parent.Id;
                    model.Name = item.Name;
                    model.PathName = (item.IsExists()) ? Url.Content("~" + item.PathName) : Url.Content("~/FrontEnd/Back/Content/images/loading.gif");
                    list.Add(model);
                }
                result.IsSuccess = true;                
                result.Data = $"{{ \"total\": \"{descendantsFiles.Pagination.RowCount}\", \"rows\": {list.ObjectToJson()} }}";
            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Message = e.Message;
            }
            return Json(result);
        }
    }
}