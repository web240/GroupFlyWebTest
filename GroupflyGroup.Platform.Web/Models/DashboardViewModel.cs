using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 欢迎页视图模型
    /// </summary>
    public class DashboardViewModel:BaseViewModel
    {
        /// <summary>
        /// 欢迎页ID
        /// </summary>
        public string DashboardId{get;set;}

        /// <summary>
        /// 是否属于自己
        /// </summary>
        public bool IsMyOwn { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 内容
        /// </summary>
        public string Content { get; set; }


        /// <summary>
        /// 自己身份的ID
        /// </summary>
        public string MySelfIdentityId { get; set; }


        /// <summary>
        /// 欢迎页小部件ID
        /// </summary>
        public List<DashboardWidgetViewModel> DashboardWidgetList { get; set; }
    }
}