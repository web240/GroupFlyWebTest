using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 菜单点击处理模型
    /// </summary>
    public class MenuHandlerModel
    {
        /// <summary>
        /// 菜单实体Id
        /// </summary>
        public string MenuId { get; set; }


        /// <summary>
        /// 返回值处理类型，从Const.MenuHandleType中取
        /// </summary>
        public virtual string HandleType { get; set; }
      
    }
}