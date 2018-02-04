using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.Platform.Web
{
    /// <summary>
    ///     文件路径检索,用于检索虚拟文件和本地磁盘文件
    /// </summary>
    public class PlatformVirtualPathProvider : VirtualPathProvider
    {
        private static readonly Dictionary<string, PlatformCacheDependency> dependencies =
            new Dictionary<string, PlatformCacheDependency>();

        internal static bool PlatformFileExists(string virtualPath, out File file)
        {
            var result = false;
            //转换成小写
            var appPath = HttpContext.Current.Request.ApplicationPath.ToLower();
            var vPath = virtualPath.ToLower();

            //处理路径。
            //“~/ddl.html”去掉“~”
            //“/GroupflyGroup.Platform.Web/ddl.html”去掉“/GroupflyGroup.Platform.Web”
            //没有虚拟目录的应用程序“/ddl.html”不处理
            //结果为：“/ddl.html”
            if (vPath.StartsWith("~/"))
            {
                vPath = vPath.Substring(1);
            }
            else if (appPath != "/" && vPath.StartsWith(appPath))
            {
                vPath = vPath.Substring(appPath.Length);
            }
            #region 去掉区分大小写代码，统一用小写判断
            //以小写格式替换应用程序根目录后，通过剩余字符串长度在原路径上截取文件目录，与数据库匹配，这里的路径区分大小写
            //vPath = virtualPath.Substring(virtualPath.Length - vPath.Length);
            #endregion
            //在分布式文件系统中查找文件
            file = File.ForPathName(vPath);
            if (file != null && !file.IsTrash)
            {
                result = true;
            }
            return result;
        }

        /// <summary>
        ///     文件检索,获取一个值,该值指示文件是否存在于虚拟文件系统中
        /// </summary>
        /// <param name="virtualPath">文件检索路径</param>
        /// <returns>文件是否存在</returns>
        public override bool FileExists(string virtualPath)
        {

            //先检查磁盘目录，如果磁盘目录没有，再从文件数据库中检索
            bool result = Previous.FileExists(virtualPath);

            if (!result)
            {

                //如果文件在windows中不存在，尝试在数据库中找。
                //只是找文件，而不是找目录，所以必须有后缀名的才去尝试
                string filePath = HttpContext.Current.Server.MapPath(virtualPath);
                string extension = Path.GetExtension(filePath);

                //存在后缀名，不检查config
                if (!string.IsNullOrWhiteSpace(extension) && extension.ToLower() != ".config")
                {

                    Uri requestUri = HttpContext.Current.Request.Url;

                    //解析url路径
                    //1.如果是“~/”那么替换为“/GroupflyGroup.Platform.Web/”
                    if (virtualPath.StartsWith("~/"))
                    {
                        virtualPath = virtualPath.Substring(1);
                        virtualPath = HttpContext.Current.Request.ApplicationPath + virtualPath;
                    }

                    //2.根据当前协议，host和端口号构建uri对象“http://localhost:80”
                    UriBuilder builder = new UriBuilder(requestUri.Scheme, requestUri.Host, requestUri.Port);

                    //3.拼接uri “http://localhost:80” + “/GroupflyGroup.Platform.Web/......”
                    Uri uri = new Uri(builder.Uri, virtualPath);

                    //4.获取有效的uri
                    virtualPath = uri.AbsolutePath;

                    File file = null;

                    if (PlatformFileExists(virtualPath, out file))
                    {
                        //从缓存依赖中对比文件内容修改时间
                        if (dependencies.ContainsKey(file.PathName) &&
                            dependencies[file.PathName].UtcLastModified < file.FileModifiedOn)
                        {
                            //释放缓存
                            var dependency = dependencies[file.PathName];
                            dependency.Invalidate();
                            dependency.Dispose();
                            dependencies.Remove(file.PathName);
                        }

                        result = true;
                    }

                }

            }

            return result;
        }

        /// <summary>
        ///     获取文件,从虚拟文件系统中获取一个虚拟文件
        /// </summary>
        /// <param name="virtualPath">文件路径</param>
        /// <returns>文件</returns>
        public override VirtualFile GetFile(string virtualPath)
        {
            File file = null;

            string path = HttpContext.Current.Server.MapPath(virtualPath);

            //如果磁盘目录存在
            if (System.IO.File.Exists(path))
            {
                //return Previous.GetFile(virtualPath);
                var fileinfo = new FileInfo(path);
                FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read);// new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                file = new File();
                file.FileContent = fs;
                file.Name = fileinfo.Name + "." + fileinfo.Extension;
                return new PlaformVirtualFile(virtualPath, file);
            }


            else if (PlatformFileExists(virtualPath, out file))
            {
                return new PlaformVirtualFile(virtualPath, file);
            }

            throw new FileNotFoundException("无法在磁盘或文件系统找到指定的文件", virtualPath);
            
        }

        /// <summary>
        ///     缓存保存,基于指定的虚拟路径创建一个缓存依赖项
        /// </summary>
        /// <param name="virtualPath">主虚拟资源的路径</param>
        /// <param name="virtualPathDependencies"> 一个路径数组，路径指向主要虚拟资源需要的其他资源</param>
        /// <param name="utcStart">虚拟资源被读取的 UTC 时间</param>
        /// <returns>指定虚拟资源的 System.Web.Caching.CacheDependency 对象</returns>
        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies,
            DateTime utcStart)
        {
            string path = HttpContext.Current.Server.MapPath(virtualPath);

            //如果磁盘目录存在
            if (System.IO.File.Exists(path))
            {
                return Previous.GetCacheDependency(virtualPath, virtualPathDependencies, utcStart);
            }

            File file = null;

            if (PlatformFileExists(virtualPath, out file))
            {
                //添加缓存依赖，以数据库中pathname为key
                if (!dependencies.ContainsKey(file.PathName))
                {
                    dependencies.Add(file.PathName,
                        new PlatformCacheDependency(file.FileModifiedOn ?? DateTime.MinValue));
                }

                return dependencies[file.PathName];
            }

            return Previous.GetCacheDependency(virtualPath, virtualPathDependencies, utcStart);

        }
    }
}