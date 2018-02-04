using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.ObjectFramework.WebAdapter;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 对象框架WebApi
    /// </summary>
    public class ObjektFrameworkController : ApiController
    {
        /// <summary>
        /// 数据处理
        /// </summary>
        /// <returns></returns>
        //[HttpGet]
        //public string X()
        //{
        //    ObjectFramework.Utils.X.ProcessAllObjektPerssionAndMisc();
        //    return "数据处理完成！";
        //}

        /// <summary>
        /// 数据处理
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string PlantUML()
        {
            List<Klass> klasses = new List<Klass>();
            klasses.Add(Klass.ForId(KlassIDs.MessageSender));
            klasses.Add(Klass.ForId(KlassIDs.User));
            return ObjectFramework.Utils.PlantUML.GenerateUmlText(2,klasses, true, false, true);
        }
    }
}
