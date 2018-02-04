using System;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeFileManagement
{
    /// <summary>
    ///     文件上传配置
    /// </summary>
    public class FeFileUploadConfigController : Controller
    {
        /// <summary>
        ///     显示平台层配置页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return RedirectToAction("SystemConfigCollectionView", "Platform", new
            {
                configType = "FeFileUpload",
                guid = Guid.NewGuid().ToString()
            });
        }

        /// <summary>
        ///     获取系统配置中允许文件上传类型设置
        /// </summary>
        /// <param name="uploadType"></param>
        /// <returns></returns>
        public string FileExtConfig(string uploadType)
        {
            var result = "";

            if (uploadType == "Image")
            {
                var config = ObjektFactory.Find<SystemConfiguration>(FeFileIDs.ImageUploadType);
                result = config.Value.Replace("|", ",");
            }
            else if (uploadType == "Document")
            {
                var config = ObjektFactory.Find<SystemConfiguration>(FeFileIDs.DocumentUploadType);
                result = config.Value.Replace("|", ",");
            }

            return result;
        }

        /// <summary>
        /// 获取系统配置中允许文件上传大小设置
        /// </summary>
        /// <param name="uploadType"></param>
        /// <param name="isBack">后台为ture，否则为false</param>
        /// <returns></returns>
        public long FileSizeConfig(string uploadType)
        {

            long size = 0;
            string id = "";

            switch (uploadType)
            {
                case "BackImage":
                    id = FeFileIDs.BackImageUploadSize;
                    break;
                case "FrontImage":
                    id = FeFileIDs.FrontImageUploadSize;
                    break;
                case "BackDocument":
                    id = FeFileIDs.BackDocumentUploadSize;
                    break;
                case "FrontDocument":
                    id = FeFileIDs.FrontDocumentUploadSize;
                    break;
            }

            if (!string.IsNullOrWhiteSpace(id))
            {
                var config = ObjektFactory.Find<SystemConfiguration>(id);
                if (!long.TryParse(config.Value, out size))
                {
                    size = 0;
                }
            }

            return size;
        }

    }
}