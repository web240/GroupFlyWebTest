using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using System;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class CkEditorController : BaseController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ckEditor"></param>
        /// <param name="ckEditorFuncNum"></param>
        /// <param name="langCode"></param>
        [HttpPost]
        public void CkeditorUpload(string ckEditor, int ckEditorFuncNum, string langCode)
        {
            var imgExt = "gif,jpg,jpeg,png,bmp";
            var maxSize = 5 * 1024 * 1024;

            HttpPostedFileBase imgFile = Request.Files["upload"];
            if (imgFile == null)
            {
                showError(ckEditorFuncNum, "请选择文件。");
                return;
            }

            var fileName = imgFile.FileName;
            var fileExt = System.IO.Path.GetExtension(fileName).ToLower();

            if (imgFile.InputStream == null || imgFile.InputStream.Length > maxSize)
            {
                showError(ckEditorFuncNum, "上传文件大小超过5M限制。");
                return;
            }

            if (String.IsNullOrEmpty(fileExt) ||
                Array.IndexOf((imgExt).Split(','), fileExt.Substring(1).ToLower()) == -1)
            {
                showError(ckEditorFuncNum, "上传文件扩展名只允许" + imgExt + "格式。");
                return;
            }

            var file = new File();
            file.Name = ObjektFactory.GenerateGuid() + System.IO.Path.GetFileName(imgFile.FileName);
            file.FileContent = imgFile.InputStream;
            file.Parent = ObjektFactory.Find<File>(FileIDs.PlatformRichTextFiles);//富文本专用目录
            file.IsDirectory = false;
            file.IsLink = false;
            file.Save();
            PersistenceContext.Accept();
            string fileUrl = Url.Content("~/file?id=" + file.Id);

            Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
            Response.Write("<script>window.parent.CKEDITOR.tools.callFunction(" + ckEditorFuncNum + ",'" + fileUrl +
                           "','')</script>");
            Response.End();
        }

        private void showError(int ckEditorFuncNum, string message)
        {
            Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
            Response.Write("<script>window.parent.CKEDITOR.tools.callFunction(" +
                ckEditorFuncNum + ",'','" + message + "');</script>");
            Response.End();
        }
    }
}