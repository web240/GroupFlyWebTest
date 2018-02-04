using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System.Web.Mvc;
using System.Web.WebSockets;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// frontend控制器基类
    /// </summary>
    public abstract class BaseController : Controller
    {
        /// <summary>
        /// 操作执行前开始事务
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
        }

        /// <summary>
        /// 错误时撤销
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnException(ExceptionContext filterContext)
        {
            PersistenceContext.Discard();
            base.OnException(filterContext);
        }

        /// <summary>
        /// 执行完成后，提交事务。
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            base.OnResultExecuted(filterContext);
            PersistenceContext.Accept();
        }

    }
}