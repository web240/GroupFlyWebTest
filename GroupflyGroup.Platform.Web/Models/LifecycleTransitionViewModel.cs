using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 生命周期转换视图模型
    /// </summary>
    public class LifecycleTransitionViewModel: BaseViewModel
    {
        /// <summary>
        /// 生命周期转换Id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 生命周期转换名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 生命周期转换标签
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// 生命周期转换位置描述
        /// </summary>
        public string Points { get; set; }

        /// <summary>
        /// 生命周期转换源状态
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// 生命周期转换目标状态
        /// </summary>
        public string To { get; set; }

        /// <summary>
        /// 生命周期转换关联源对象(Lifecycle)
        /// </summary>
        public string Source { get; set; }

    }
}