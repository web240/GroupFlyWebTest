using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GroupflyGroup.Platform.ObjectFramework.Utils;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 机器码
    /// </summary>
    public class RdbMigraterController : ApiController
    {
        ///// <summary>
        ///// 迁移到MySQL
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet]
        //public string ToMySQL()
        //{
        //    RdbMigraters.MigrateToMysql();
        //    return "迁移成功！";
        //}
        /// <summary>
        /// 迁移到SqlServer
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string ToSqlServer()
        {
            RdbMigraters.MigrateToSqlServer();
            return "迁移成功！";
        }
    }
}
