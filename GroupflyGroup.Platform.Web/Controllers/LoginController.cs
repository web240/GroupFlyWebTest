using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using EB.Common;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class LoginController : Controller
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
        /// 检测登录是否需要验证码
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public JsonResult CheckLoginNeedVerifyCode(string userName)
        {
            JsonResultModel jsonResultModel = new JsonResultModel();

            LoginViewModel model = new LoginViewModel();
            if (model.CheckLoginNeedVerifyCode(userName))
            {
                jsonResultModel.IsSuccess = false;
                jsonResultModel.FailCode = "LoginNeedVerifyCode";
                jsonResultModel.Message = "需要验证码";
            }            
            return Json(jsonResultModel);
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