using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.Platform.Web
{
    /// <summary>
    /// 
    /// </summary>
    public class FileAccessModule : IHttpModule
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>

        public void Init(HttpApplication context)
        {
            context.EndRequest += context_EndRequest;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void context_EndRequest(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            HttpApplication application = sender as HttpApplication;
            HttpRequest request = application.Request;
            HttpResponse response = application.Response;

            if (response.StatusCode == 404)
            {
                if (!PersistenceContext.IsExisting)
                {
                    PersistenceContext.Begin(new SessionContext("404", ObjektFactory.Find<User>(User.IDs.guest)));
                }
                var pathname = request.AppRelativeCurrentExecutionFilePath.Substring(1).ToLower();
                var file = File.ForPathName(pathname);
                if (file!=null)
                {
                    ctx.ClearError();
                    response.Clear();
                    response.StatusCode = 200;
                    response.BinaryWrite(file.FileContent.ToBytes());
                }
                PersistenceContext.Accept();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
        }
    }
}