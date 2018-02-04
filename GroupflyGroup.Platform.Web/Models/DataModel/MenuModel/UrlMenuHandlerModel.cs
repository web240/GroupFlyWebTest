using GroupflyGroup.Platform.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// Url链接菜单点击处理模型
    /// </summary>
    public class UrlMenuHandlerModel:MenuHandlerModel
    {
        /// <summary>
        /// 是页面或者DIV
        /// </summary>
        public bool IsPage { get; set; }

        /// <summary>
        /// Url地址
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 返回值处理类型为Url
        /// </summary>
        public override string HandleType { get { return Const.MenuHandleType_Url; } }

        /// <summary>
        /// 打开页面的标题
        /// </summary>
        public string Title { get; set; }

    }
}