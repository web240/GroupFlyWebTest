using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeAccount
{
    /// <summary>
    /// 账户管理
    /// </summary>
    [LoginRequired(LoginUrl = "~/FrontEndLogin")]
    public class FeAccountController : Platform.Web.Controllers.BaseController
    {
        /// <summary>
        /// 账户管理首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        /// 欢迎页
        /// </summary>
        /// <returns></returns>
        public PartialViewResult Welcome() {
            return PartialView(new BaseViewModel());
        }
        /// <summary>
        /// 左菜单
        /// </summary>
        /// <returns></returns>
        public PartialViewResult Left()
        {
            var model = new HomeIndexViewModel();
            model.LoadMenus(ObjectFramework.Strings.FeMenuItemIDs.FeFrontMenu, Url);
            return PartialView("_LeftMenu", model);
        }
        /// <summary>
        /// 顶部
        /// </summary>
        /// <returns></returns>
        public PartialViewResult Head()
        {
            var model = new HomeIndexViewModel();
            model.LoadMenus(ObjectFramework.Strings.FeMenuItemIDs.FeFrontMenu, Url);
            return PartialView("_Header", model);
        }
        /// <summary>
        /// 底部
        /// </summary>
        /// <returns></returns>
        public PartialViewResult Foot()
        {
            return PartialView("_Footer",new BaseViewModel());
        }

        /// <summary>
        /// 获取菜单
        /// </summary>
        /// <param name="id"></param>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public JsonResult GetSubMenus(string id, string parentId)
        {
            if (id.IndexOf('_') > 0)
                id = id.Split('_')[1];
            var model = new HomeIndexViewModel();
            model.LoadMenus(id.Replace("-", "@"), Url, parentId);
            return Json(new JsonResultModel(model.MenusJson));
        }

        /// <summary>
        /// 导航菜单跳转
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Navigation(string id)
        {
            var entity = ObjektFactory.Find<NavigationMenuItem>(id.Replace("-", "@"));
            var url = entity.IsWithinThePlatform ? Url.Content("~" + entity.Url) : entity.Url;
            return Redirect(url);
        }
    }
}