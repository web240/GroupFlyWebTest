using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 部件菜单视图模型
    /// </summary>
    public class WidgetMenuItemViewModel
    {   
        /// <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }


        /// <summary>
        /// 关联部件ID
        /// </summary>
        public string WidgetId { get; set; }

        /// <summary>
        /// 关联菜单ID
        /// </summary>
        public string MenuId { get; set; }
        
        /// <summary>
        /// 菜单标签
        /// </summary>
        public string MenuLabel { get; set; }

        /// <summary>
        /// 菜单打开模式1主页标签页2模态窗口3非模态窗口4新页面0无
        /// </summary>
        public string MenuShowMode { get; set; }

        /// <summary>
        /// 排序号
        /// </summary>
        public decimal? SortOrder { get; set; }

        /// <summary>
        /// 菜单字体图标
        /// </summary>
        public string MenuFaIcon { get; set; }

    }  
}