using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Filters
{
    /// <summary>
    /// 登陆验证筛选器
    /// </summary>
    public class LoginRequiredAttribute : ActionFilterAttribute
    {

        /// <summary>
        /// 登陆页Url，带"~"的形式
        /// </summary>
        public string LoginUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var loginUserId = PersistenceContext.SessionContext.User.Id;
            if (loginUserId.IsNullOrEmpty() || loginUserId == ObjectFramework.User.IDs.guest)
            {
                var urlHelper = new UrlHelper(filterContext.RequestContext);

                var loginUrl = urlHelper.Action("Index", "Login");

                if (!this.LoginUrl.IsNullOrEmpty())
                    loginUrl = urlHelper.Content(this.LoginUrl);

                var isOperation = filterContext.RequestContext.HttpContext.Request.Params[Const.AjaxType] == Const.AjaxType_Operation;
                if (isOperation)
                {
                    var resault = new JsonResultModel(false, "未登录或会话超时", Const.FailType_LoginRequired, loginUrl);
                    var jsonResault = new JsonResult();
                    jsonResault.Data = resault;
                    jsonResault.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                    filterContext.Result = jsonResault;
                }
                else
                {
                    var resault = new ContentResult();
                    resault.Content = $"<script> if(top){{ top.location.href=\"{loginUrl}\";}} else {{ window.location.href=\"{loginUrl}\"; }}</script>";
                    filterContext.Result = resault;
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}