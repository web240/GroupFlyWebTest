using System.IO;
using System.Text;
using System.Web.Hosting;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Hook;
using GroupflyGroup.Platform.Web.Extension;
using log4net;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.Platform.Web
{
    /// <summary>
    /// 表示虚拟文件或资源空间中的一个文件对象
    /// </summary>
    public class PlaformVirtualFile : VirtualFile
    {
        private readonly File file;

        private static readonly ILog log = LogManager.GetLogger(typeof(MvcApplication));
        /// <summary>
        ///     初始化 System.Web.Hosting.VirtualFile 类的新实例
        /// </summary>
        /// <param name="virtualPath">此实例所表示资源的虚拟路径</param>
        /// <param name="file">文件对象</param>
        public PlaformVirtualFile(string virtualPath, File file) : base(virtualPath)
        {
            Hooks.Do<DoVirtualFileProviderHook>(new HookContext(file));
            this.file = file;
        }
        /// <summary>
        ///     返回到虚拟资源的只读流
        /// </summary>
        /// <returns>虚拟文件的只读流</returns>
        public override Stream Open()
        {
            var currentFile = file;

            while (currentFile.IsLink)
            {
                currentFile = currentFile.Linked;
            }

            return currentFile.FileContent;
        }
    }


}