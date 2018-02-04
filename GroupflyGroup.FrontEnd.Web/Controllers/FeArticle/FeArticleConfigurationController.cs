using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    public class FeArticleConfigurationController : Controller
    {
        // GET: FeArticleConfiguration
        public ActionResult Index()
        {
            return RedirectToAction("SystemConfigCollectionView", "Platform", new
            {
                configType = "FeArticle"
            });
            //FeArticle,FeArticleColumn
        }

        /// <summary>
        /// 根据键值查询配置项
        /// </summary>
        /// <param name="key">key值</param>
        /// <returns></returns>
        public JsonResult ReturnValue(string key)
        {
            SystemConfiguration sysArticCommentTourist = ObjektFactory.Find<SystemConfiguration>(key);
            return Json(sysArticCommentTourist.Value);
        }


    }
}