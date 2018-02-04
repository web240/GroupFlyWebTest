using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.Platform.Web.Controllers
{    
    /// <summary>
    /// 
    /// </summary>
    public class mobantestController : Controller
    {
        public string strTemplate = "4cb9b097717d4dbdb9c5f08944e5cebc@File";  // 文件系统跟目录
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }


        public ContentResult add()
        {

            //File model = ObjektFactory.Find<File>("7ce89654ed2d4e2aaf3e313efe8bad94@File");   //根目录
            //model.Name = "index";// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
            //model.IsDirectory = false;
            //model.IsLink = false;
            //File entity = ObjektFactory.Find<File>(strTemplate); // 文件系统跟目录
            //model.Parent = entity;
            //string strmapPath = @"I:\NewPlatformDevelopWork\DevelopWorkPlatform\GroupflyGroup.Platform\GroupflyGroup.Platform.Web\Platform\Views2\Home1\Index.cshtml";
            //model.FileContent = FileToStream(strmapPath);
            //model.Save();

            //File model2 = new File();   //根目录
            //model2.Name = "_LoginPartial";// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
            //model2.IsDirectory = false;
            //model2.IsLink = false;
            //File entity2 = ObjektFactory.Find<File>(strTemplate); // 文件系统跟目录
            //model2.Parent = entity2;
            //string strmapPath2 = @"I:\NewPlatformDevelopWork\DevelopWorkPlatform\GroupflyGroup.Platform\GroupflyGroup.Platform.Web\Platform\Views2\Home1\_LoginPartial.cshtml";
            //model2.FileContent = FileToStream(strmapPath2);
            //model2.Save();



            //File model2 = new File();   //根目录
            //model2.Name = "_Layout.cshtml";// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
            //model2.IsDirectory = false;
            //model2.IsLink = false;
            //File entity2 = ObjektFactory.Find<File>(strTemplate); // 文件系统跟目录
            //model2.Parent = entity2;
            //string strmapPath2 = @"I:\NewPlatformDevelopWork\DevelopWorkPlatform\GroupflyGroup.Platform\GroupflyGroup.Platform.Web\Platform\Views2\Shared\_Layout.cshtml";
            //model2.FileContent = FileToStream(strmapPath2);
            //model2.Save();

            //File model2 = new File();   //根目录
            //model2.Name = "_PlatformLayout.cshtml";// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
            //model2.IsDirectory = false;
            //model2.IsLink = false;
            //File entity2 = ObjektFactory.Find<File>(strTemplate); // 文件系统跟目录
            //model2.Parent = entity2;
            //string strmapPath2 = @"I:\NewPlatformDevelopWork\DevelopWorkPlatform\GroupflyGroup.Platform\GroupflyGroup.Platform.Web\Platform\Views\Shared\_Layout.cshtml";
            //model2.FileContent = FileToStream(strmapPath2);
            //model2.Save();

            //File model = ObjektFactory.Find<File>("84e2765f269e4fa581ecd7447703924d@File");
            //model.Delete();
            //model.Save();

            File model2 = ObjektFactory.Find<File>("e6660ad6895d4a898357f8a6da61cb3e@File");   //根目录
            model2.Name = "_PlatformLayout.cshtml";// files[0].FileName.Substring(0, files[0].FileName.LastIndexOf("."));  //压缩包名称
            model2.IsDirectory = false;
            model2.IsLink = false;
            File entity2 = ObjektFactory.Find<File>(strTemplate); // 文件系统跟目录
            model2.Parent = entity2;
            string strmapPath2 = @"F:\_PlatformLayout.cshtml";
            model2.FileContent = FileToStream(strmapPath2);
            model2.Save();
            return Content("1");
        }

        public System.IO.Stream FileToStream(string fileName)
        {
            // 打开文件 
            System.IO.FileStream fileStream = new System.IO.FileStream(fileName, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.Read);
            // 读取文件的 byte[] 
            byte[] bytes = new byte[fileStream.Length];
            fileStream.Read(bytes, 0, bytes.Length);
            fileStream.Close();
            // 把 byte[] 转换成 Stream 
            System.IO.Stream stream = new System.IO.MemoryStream(bytes);
            return stream;
        }
        
    }
}