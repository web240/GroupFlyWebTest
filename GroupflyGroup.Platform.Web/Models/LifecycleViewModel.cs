using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 生命周期组件视图模型
    /// </summary>
    public class LifecycleViewModel: BaseViewModel
    {

        /// <summary>
        /// 生命周期名称
        /// </summary>
        public string Name { get; set; }
        
        /// <summary>
        /// 生命周期描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 生命周期标签
        /// </summary>
        public string Label { get; set; }
        
        /// <summary>
        /// 生命周期状态集合
        /// </summary>
        public List<LifecycleStateViewModel> ListLifecycleState { get; set; }

        /// <summary>
        /// 生命周期转换集合
        /// </summary>
        public List<LifecycleTransitionViewModel> ListLifecycleTransition { get; set; }


    }

}