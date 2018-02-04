using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Controllers
{
    public class TemplateController : Controller
    {
        /// <summary>
        /// 登陆页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            var model = new LoginViewModel();
            return View(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public JsonResult LoginSubmit(string userName, string password, string verifycode)
        {
            var model = new LoginViewModel(userName, password, verifycode);
            var resault = model.Login();
            return Json(resault);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public RedirectResult LogOut()
        {
            var model = new LoginViewModel();
            model.LogOut();
            return Redirect("Index");
        }
    }
}