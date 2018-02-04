using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using log4net;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 控制器基类
    /// </summary>
    public class BaseController : Controller
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(BaseController));

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnException(ExceptionContext filterContext)
        {
            log.Info("OnException");
            ObjektFramework.OnException(filterContext.Exception);
            // 跳转到错误页
            if (Request.Params[Const.AjaxType] == Const.AjaxType_Operation)
            {
                var ex = filterContext.Exception;
                //不能把异常标记为已处理，否则会导致HttpApplication.Error不触发，对象框架自动事务处理出现不可预料的问题
                //filterContext.ExceptionHandled = true;
                filterContext.Result = Json(new JsonResultModel(false, ex.Message, string.Empty, ex.StackTrace));
            }
        }
    }
}