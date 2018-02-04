using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// 数据网格控件控制器
    /// </summary>
    public class FeDataGridController : Controller
    {
        
        /// <summary>
        /// 数据网格控件
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("_FeDataGrid");
        }
    }
}