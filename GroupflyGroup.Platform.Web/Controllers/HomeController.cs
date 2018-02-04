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
using GroupflyGroup.Platform.Web.Filters;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [LoginRequired]
    public class HomeController : BaseController
    {
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {           
            var model = new HomeIndexViewModel();
            model.LoadMenus(MenuItemIDs.Root, Url);
            return View(model);
        }

        /// <summary>
        /// 菜单点击
        /// </summary>
        /// <param name="menuId"></param>
        /// <param name="parentMenuId"></param>
        /// <returns></returns>
        public ActionResult MenuClick(string menuId, string parentMenuId = "")
        {
            if (menuId.IndexOf('_') > 0)
                menuId = menuId.Split('_')[1];
            var menuModel = MenuModelFactory.CreateInstance(menuId.Replace("-","@"), Url, parentMenuId.Replace("-", "@"));
            var result = menuModel.GetClickHandler();
            return Json(result);
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


        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detail"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public ActionResult Error(string message, string detail)
        {
            var model = new ErrorViewModel(message, detail);
            return PartialView("../Shared/_Error", model);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public JsonResult GetSubMenus(string id,string parentId)
        {
            if (id.IndexOf('_') > 0)
                id = id.Split('_')[1];
            var model = new HomeIndexViewModel();
            model.LoadMenus(id.Replace("-", "@"), Url, parentId);
            return Json(new JsonResultModel(model.MenusJson));
        }

    }
}