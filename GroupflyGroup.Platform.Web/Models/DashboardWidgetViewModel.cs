using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 欢迎页小部件视图模型
    /// </summary>
    public class DashboardWidgetViewModel
    {
        /// <summary>
        /// 欢迎页小部件ID
        /// </summary>
        public string DashboardWidgetId { get; set; }

        /// <summary>
        /// 欢迎页ID
        /// </summary>

        public string DashboardId { get;set;}

        /// <summary>
        /// 部件ID
        /// </summary>
        public string WidgetId { get; set; }
    }
}