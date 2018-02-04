using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    /// <summary>
    ///     模板控制器
    /// </summary>
    public class FeTemplateEngineController : Controller
    {
        /// <summary>
        ///     获取组件资源列表
        /// </summary>
        /// <param name="tagNames"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetComponentResources(List<string> tagNames)
        {
            //var models = new List<FeTemplateEngineResourcesJsonModel>();

            //if (tagNames != null && tagNames.Count > 0)
            //{
            //    foreach (var tagName in tagNames)
            //    {
            //        LoadComponentResource(tagName, models);
            //    }
            //}

            //return Json(models);
            var models = ComponentResourcesLoader.LoadComponentResource(tagNames);
            return Json(models);
        }

        private void LoadComponentResource(string tagName, List<FeTemplateEngineResourcesJsonModel> models)
        {
            var pathName = "";
            var model = new FeTemplateEngineResourcesJsonModel();
            model.TagName = tagName;

            //从数据库中获取tagName的路径
            var componentKlass = Klass.ForId(FeKlassIDs.FeTemplateComponent);
            var where = new WhereExpression<FeTemplateComponent>(componentKlass);
            where.Where(FePropertyNames.tagName, Const.Oper_Equals, tagName, false);
            var query = new ObjektCollection<FeTemplateComponent>(componentKlass, where.ToWhereClause());
            var component = query.TryGetSingleResult();

            if (component != null && component.IsExists() && !component.IsTrash &&
                component.Id != FeTemplateIDs.ComponentBase)
            {
                pathName = component.DirectoryPath;
                model.TemplateComponentPath = pathName;

                //以目录为单位，检查组件包是否存在，本地资源优先级高于文件系统
                pathName = HttpContext.Server.MapPath("~" + pathName);

                if (Directory.Exists(pathName))
                {
                    //找到文件夹
                    var directoryInfo = new DirectoryInfo(pathName);

                    //获取文件下所有js文件
                    foreach (var fileInfo in directoryInfo.GetFiles("*.js", SearchOption.AllDirectories))
                    {
                        model.Items.Add(ResourceItemBuilder(fileInfo, "js", model.TemplateComponentPath));
                    }

                    //获取文件下所有css文件
                    foreach (var fileInfo in directoryInfo.GetFiles("*.css", SearchOption.AllDirectories))
                    {
                        model.Items.Add(ResourceItemBuilder(fileInfo, "css", model.TemplateComponentPath));
                    }
                }
                else
                {
                    //从文件系统中查找目录，规则同上
                    var klass = Klass.ForId(KlassIDs.File);
                    var condition = new WhereExpression<File>(klass);
                    condition.Where(PropertyNames.isdirectory, Const.Oper_Equals, 1);
                    condition.Where(PropertyNames.pathName, Const.Oper_Equals, model.TemplateComponentPath.ToLower());
                    var oc = new ObjektCollection<File>(klass, condition.ToWhereClause());

                    var directory = oc.TryGetSingleResult();

                    if (directory != null && directory.IsExists() && directory.IsDirectory && !directory.IsTrash)
                    {

                        foreach (var file in directory.GetDescendantsFiles())
                        {
                            if (file.ExtensionName.ToLower() == "js")
                            {
                                model.Items.Add(new FeTemplateEngineResourceItemModel
                                {
                                    ResourceItemPath = file.PathName,
                                    ResourceItemType = "js"
                                });
                            }
                            else if (file.ExtensionName.ToLower() == "css")
                            {
                                model.Items.Add(new FeTemplateEngineResourceItemModel
                                {
                                    ResourceItemPath = file.PathName,
                                    ResourceItemType = "css"
                                });
                            }
                        }

                    }
                    
                }

                if (component.BaseComponent != null
                    && component.BaseComponent.IsExists()
                    && !component.BaseComponent.IsTrash
                    && component.BaseComponent.Id != FeTemplateIDs.ComponentBase)
                {
                    LoadComponentResource(component.BaseComponent.TagName, models);
                }

                models.Add(model);
            }
        }

        private FeTemplateEngineResourceItemModel ResourceItemBuilder(FileInfo file, string type,
            string directoryPath)
        {
            var model = new FeTemplateEngineResourceItemModel();
            var directoryPhysicalPath = HttpContext.Server.MapPath("~" + directoryPath);
            var path = file.FullName.Substring(directoryPhysicalPath.Length);
            path = path.Replace("\\", "/");
            path = directoryPath + path;
            model.ResourceItemPath = path;
            model.ResourceItemType = type;
            return model;
        }
    }

    /// <summary>
    ///     模板引擎控制器扩展
    /// </summary>
    public static class FeTemplateEngineControllerExtend
    {
        /// <summary>
        ///     根据模板id和文件相对路径获取模板资源
        /// </summary>
        /// <param name="controller"></param>
        /// <param name="templateId">模板id</param>
        /// <param name="fileRelativePath">文件相对路径，参数请以“~/”开头，代表模板文件夹的起始目录。</param>
        /// <returns></returns>
        /// <remarks>
        ///     根据模板id获取模板包目录，以模板包为根目录，通过相对路径返回指定的模板资源文件。
        ///     模板引擎会先在windows磁盘中查找，如果没有会在分布式文件系统中查询。
        /// </remarks>
        public static string TemplateResourcePathById(this Controller controller, string templateId,
            string fileRelativePath = null)
        {
            //1.通过模板id获取模板文件夹
            var template = ObjektFactory.Find<FeTemplate>(templateId);
            var path = "";

            if (template != null
                && template.IsExists()
                && template.Directory != null
                && template.Directory.IsExists()
                && template.Directory.IsDirectory)
            {
                //2.根据模板获取在虚拟文件系统中的文件夹
                path = template.Directory.PathName;

                var filePath = "";

                if (string.IsNullOrWhiteSpace(fileRelativePath))
                {
                    filePath = "~";
                }
                else
                {
                    filePath = fileRelativePath;
                }

                if (filePath.StartsWith("~/"))
                {
                    if (!path.EndsWith("/"))
                    {
                        path += "/";
                    }

                    path = path + filePath.Substring(2);
                }
            }

            if (!string.IsNullOrWhiteSpace(path) && !path.StartsWith("~/"))
            {
                path = "~" + path;
            }

            return path;
        }

        /// <summary>
        ///     获取指定模板类型当前正在应用的模板资源
        /// </summary>
        /// <param name="controller"></param>
        /// <param name="templateTypeId">模板类型id</param>
        /// <param name="fileRelativePath">文件相对路径，参数请以“~/”开头，代表模板文件夹的起始目录。默认为空，返回模板根目录</param>
        /// <returns></returns>
        public static string TemplateResourcePathByType(this Controller controller, string templateTypeId,
            string fileRelativePath = null)
        {
            var klass = Klass.ForId(FeKlassIDs.FeTemplate);
            var condition = new WhereExpression<FeTemplate>(klass);
            condition.Where(PropertyNames.type, Const.Oper_Equals, templateTypeId);
            condition.Where(PropertyNames.isDefault, Const.Oper_Equals, 1);
            var oc = new ObjektCollection<FeTemplate>(klass, condition.ToWhereClause());
            var template = oc.TryGetSingleResult();

            if (template == null)
            {
                throw new Exception("无法找到默认模板，或找到1个以上的默认模板");
            }

            return TemplateResourcePathById(controller, template.Id, fileRelativePath);
        }
    }


    /// <summary>
    /// 
    /// </summary>
    public static class ComponentResourcesLoader
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public static List<FeTemplateEngineResourcesJsonModel> LoadComponentResource(string text)
        {
            var tagNames = GetTagNames(text);
            return LoadComponentResource(tagNames);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tagNames"></param>
        /// <returns></returns>
        public static List<FeTemplateEngineResourcesJsonModel> LoadComponentResource(List<string> tagNames)
        {
            var models = new List<FeTemplateEngineResourcesJsonModel>();

            if (tagNames != null && tagNames.Count > 0)
            {
                foreach (var tagName in tagNames)
                {
                    LoadComponentResource(tagName, models);
                }
            }
            return models;
        }

        /// <summary>
        /// 
        /// </summary>
        private static void LoadComponentResource(string tagName, List<FeTemplateEngineResourcesJsonModel> models)
        {
            var model = new FeTemplateEngineResourcesJsonModel();
            model.TagName = tagName;

            //从数据库中获取tagName的路径
            var componentKlass = Klass.ForId(FeKlassIDs.FeTemplateComponent);
            var where = new WhereExpression<FeTemplateComponent>(componentKlass);
            where.Where(FePropertyNames.tagName, Const.Oper_Equals, tagName);
            var query = new ObjektCollection<FeTemplateComponent>(componentKlass, where.ToWhereClause());
            var component = query.TryGetSingleResult();

            if (component != null && component.IsExists() && !component.IsTrash &&
                component.Id != FeTemplateIDs.ComponentBase)
            {
                var pathName = "";
                pathName = component.DirectoryPath;
                model.TemplateComponentPath = pathName;

                //以目录为单位，检查组件包是否存在，本地资源优先级高于文件系统
                pathName = HttpContext.Current.Server.MapPath("~" + pathName); //HttpContext.Server.MapPath;

                if (Directory.Exists(pathName))
                {
                    //找到文件夹
                    var directoryInfo = new DirectoryInfo(pathName);

                    //获取文件下所有js文件
                    foreach (var fileInfo in directoryInfo.GetFiles("*.js", SearchOption.AllDirectories))
                    {
                        model.Items.Add(ResourceItemBuilder(fileInfo, "js", model.TemplateComponentPath));
                    }

                    ////获取文件下所有css文件
                    //foreach (var fileInfo in directoryInfo.GetFiles("*.css", SearchOption.AllDirectories))
                    //{
                    //    model.Items.Add(ResourceItemBuilder(fileInfo, "css", model.TemplateComponentPath));
                    //}
                }
                else
                {
                    //从文件系统中查找目录，规则同上
                    var klass = Klass.ForId(KlassIDs.File);
                    var condition = new WhereExpression<File>(klass);
                    condition.Where(PropertyNames.isdirectory, Const.Oper_Equals, 1);
                    condition.Where(PropertyNames.pathName, Const.Oper_Equals, model.TemplateComponentPath.ToLower());
                    var oc = new ObjektCollection<File>(klass, condition.ToWhereClause());

                    var directory = oc.TryGetSingleResult();

                    if (directory != null && directory.IsExists() && directory.IsDirectory && !directory.IsTrash)
                    {

                        foreach (var file in directory.GetDescendantsFiles())
                        {
                            if (file.ExtensionName.ToLower() == "js")
                            {
                                model.Items.Add(new FeTemplateEngineResourceItemModel
                                {
                                    ResourceItemPath = file.PathName,
                                    ResourceItemType = "js"
                                });
                            }
                            //else if (file.ExtensionName.ToLower() == "css")
                            //{
                            //    model.Items.Add(new FeTemplateEngineResourceItemModel
                            //    {
                            //        ResourceItemPath = file.PathName,
                            //        ResourceItemType = "css"
                            //    });
                            //}
                        }

                    }

                }

                if (component.BaseComponent != null
                    && component.BaseComponent.IsExists()
                    && !component.BaseComponent.IsTrash
                    && component.BaseComponent.Id != FeTemplateIDs.ComponentBase)
                {
                    LoadComponentResource(component.BaseComponent.TagName, models);
                }

                models.Add(model);
            }
        }

        private static FeTemplateEngineResourceItemModel ResourceItemBuilder(FileInfo file, string type,
            string directoryPath)
        {
            var model = new FeTemplateEngineResourceItemModel();
            var directoryPhysicalPath = HttpContext.Current.Server.MapPath("~" + directoryPath);
            var path = file.FullName.Substring(directoryPhysicalPath.Length);
            path = path.Replace("\\", "/");
            path = directoryPath + path;
            model.ResourceItemPath = path;
            model.ResourceItemType = type;
            return model;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private static List<string> GetTagNames(string text)
        {
            var tagNames = new List<string>();
            Regex r = new Regex(@"</(.[^>]*)>");
            var matches = r.Matches(text);

            for (int i = 0; i < matches.Count; i++)
            {
                Match match = matches[i];
                var value = match.Value;
                if (value.IndexOf(" ") >= 0)
                    value = value.Split(' ')[0];
                value = value.Replace("</", "").Replace(">", "");
                if (value.ToUpper().StartsWith("GF-FETEMPLATE-COMPOSITECOMPONENT-") ||
                    value.ToUpper().StartsWith("GF-FETEMPLATE-COMPONENT-"))
                {
                    //match.Value是匹配的内容
                    if (tagNames.IndexOf(value) == -1)
                    {
                        tagNames.Add(value);
                    }
                }

                string name = match.Groups[1].Value;
            }
            return tagNames;

        }
    }
}

