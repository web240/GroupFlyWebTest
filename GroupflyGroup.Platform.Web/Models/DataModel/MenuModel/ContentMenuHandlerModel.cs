using GroupflyGroup.Platform.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// Content内容菜单点击处理模型
    /// </summary>
    public class ContentMenuHandlerModel:MenuHandlerModel
    {
        /// <summary>
        /// 页面内容
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// 返回值处理类型为Content
        /// </summary>
        public override string HandleType { get { return Const.MenuHandleType_Content; } }

        /// <summary>
        /// 打开页面的标题
        /// </summary>
        public string Title { get; set; }
    }
}