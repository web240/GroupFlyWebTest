using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    public class FeArticleColumnConfigurationController : Controller
    {
        // GET: FeArticleConfiguration
        public ActionResult Index()
        {
            return RedirectToAction("SystemConfigCollectionView", "Platform", new
            {
                configType = "FeArticleColumn"
            });
            //FeArticle,FeArticleColumn
        }

    }
}