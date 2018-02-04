using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    public class FeArticleCategorySelectController : Controller
    {
        // GET: FeArticleCategorySelect
        public PartialViewResult Index()
        {
            string id= Guid.NewGuid().ToString();
            ViewBag.FeArticleCategoryDialog = "FeArticleCategoryDialog" + id;
            ViewBag.FeArticleCategoryTree = "FeArticleCategoryTree" + id;
            return PartialView("_FeArticleCategorySelect");
        }
    }
}