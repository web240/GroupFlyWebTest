using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using log4net;
using System.Web.Hosting;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.ObjectFramework.WebAdapter;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace GroupflyGroup.Platform.Web
{
    public class MvcApplication : HttpApplication
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(MvcApplication));

        protected void Application_Start()
        {
            //System.Diagnostics.Debugger.Break();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new PlatformViewEngine());
            //文件规则注册
            HostingEnvironment.RegisterVirtualPathProvider(new PlatformVirtualPathProvider());
        }

        /// <summary>
        /// 屏蔽此方法，以避免以下情况：
        /// SessionStateModule模块从特定状态提供程序中读取数据。
        /// 在程序代码中实际上访问的是会话数据在本地内存中的副本，
        /// 如果其他页面也视图同步访问该会话状态就可能会导致数据冲突。
        /// 为了避免这种情况，SessionStateModule模块实现了一个读取器/写入器的锁定机制，
        /// 并对状态值的访问进行排队。对会话状态具有写入权限的页面将保留该会话的写入器锁定，直到请求终止。
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        //protected void Session_Start(object sender, EventArgs e)
        //{
        //    //System.Diagnostics.Debugger.Break();
        //    //在新会话启动时运行的代码
        //}

        protected void Application_Error(object sender, EventArgs e)
        {
            log.Info("Application_Error");
            ObjektFramework.OnException(Server.GetLastError());
            var message = Server.GetLastError().Message;
            var stackTrace = Server.GetLastError().StackTrace;
            if (Request.Params[Const.AjaxType] == Const.AjaxType_Operation)
            {
                Server.ClearError();
                Response.Clear();
                var resault = new JsonResultModel(false, message, string.Empty, stackTrace);
                Response.Write(resault.ObjectToJson());
                Response.Flush();
            }
            else
            {

            }
        }
    }
}
