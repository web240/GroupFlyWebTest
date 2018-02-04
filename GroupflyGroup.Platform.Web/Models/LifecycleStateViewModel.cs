using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 生命周期状态视图模型
    /// </summary>
    public class LifecycleStateViewModel:BaseViewModel
    {
        /// <summary>
        /// 生命周期状态Id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 生命周期状态名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 生命周期状态标签
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// 生命周期状态启动状态
        /// </summary>
        public bool IsStartState { get; set; }

        /// <summary>
        /// 生命周期状态设置为发布
        /// </summary>
        public bool SetIsReleased { get; set; }

        /// <summary>
        /// 生命周期状态颜色
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// 生命周期状态GoJs位置坐标
        /// </summary>
        public string Loc { get; set; }


        /// <summary>
        /// 生命周期状态设置为不可锁定
        /// </summary>
        public bool SetNotLockable { get; set; }

        /// <summary>
        /// 生命周期状态宽度
        /// </summary>
        public double? Width { get; set; }

        /// <summary>
        /// 生命周期状态高度
        /// </summary>
        public double? Height { get; set; }

        /// <summary>
        /// 生命周期状态描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 生命周期状态关联源对象(Lifecycle)
        /// </summary>
        public string Source { get; set; }
    }
}