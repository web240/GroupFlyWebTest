using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Extension;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Filters
{
    /// <summary>
    /// 
    /// </summary>
    public class GlobalFilterAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            Hooks.Do<DoGlobalFilterHook>(new HookContext(filterContext));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            Hooks.Do<DoGlobalFilterHook>(new HookContext(filterContext));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {

            base.OnResultExecuting(filterContext);
            Hooks.Do<DoGlobalFilterHook>(new HookContext(filterContext));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            base.OnResultExecuted(filterContext);
            Hooks.Do<DoGlobalFilterHook>(new HookContext(filterContext));
        }
    }
}