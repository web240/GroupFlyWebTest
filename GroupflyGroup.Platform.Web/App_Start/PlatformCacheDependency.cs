using System;
using System.Web.Caching;

namespace GroupflyGroup.Platform.Web
{
    /// <summary>
    /// 文件系统缓存依赖
    /// </summary>
    public class PlatformCacheDependency : CacheDependency
    {
        /// <summary>
        ///     实例化，设置最后修改时间
        /// </summary>
        /// <param name="fileModifiedOn"></param>
        public PlatformCacheDependency(DateTime fileModifiedOn)
        {
            SetUtcLastModified(fileModifiedOn);
        }

        /// <summary>
        ///     设置缓存无效
        /// </summary>
        public void Invalidate()
        {
            NotifyDependencyChanged(this, EventArgs.Empty);
        }
    }
}