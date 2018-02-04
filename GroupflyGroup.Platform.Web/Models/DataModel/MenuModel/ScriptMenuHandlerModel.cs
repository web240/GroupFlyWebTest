using GroupflyGroup.Platform.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// Script脚本菜单点击处理模型
    /// </summary>
    public class ScriptMenuHandlerModel:MenuHandlerModel
    {
        /// <summary>
        /// 脚本
        /// </summary>
        public string Script { get; set; }

        /// <summary>
        /// 返回值处理类型为Script
        /// </summary>
        public override string HandleType { get { return Const.MenuHandleType_Script; } }
    }
}