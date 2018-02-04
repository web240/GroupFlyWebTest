using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Auth;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    public class FrontEndLoginController : BaseController
    {
        // GET: FrontEndLogin
        public ActionResult Index()
        {
            FrontEndLoginViewModel LoginViewModel = new FrontEndLoginViewModel();
            //登录模版路径
            var templatePath =this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Login,"~/Login.cshtml");
            //模版所在路径
            LoginViewModel.TemplateDirectoryPath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Login, "~/");
            //首页LOGO
            var config =ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FrontEndHomeLogo);
            LoginViewModel.LogoId = config.Value;

            return View(templatePath, LoginViewModel);            
        }


        /// <summary>
        /// 判断是否登录
        /// </summary>
        /// <returns></returns>
        public JsonResult CheckIsLogin()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            if (SessionContext.Current.User.Id == GroupflyGroup.Platform.ObjectFramework.Strings.UserIDs.guest)
            {
                dic.Add("IsLogin", "false");
                
            }
            else
            {
                dic.Add("IsLogin", "true");
            }

            dic.Add("UserName", SessionContext.Current.User.Name);
            return Json(dic);
        }

        public JsonResult LogOut()
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            Authentication.Logout();

            return Json(dic);
        }




    }
}