//using System;
//using System.Collections.Generic;
//using System.ComponentModel.Composition;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Web;
//using System.Web.Mvc;
//using EB.Common;
//using GroupflyGroup.FrontEnd.Web.Controllers.Shared;
//using GroupflyGroup.Platform.Extension;
//using GroupflyGroup.Platform.Web;
//using GroupflyGroup.Platform.Web.Common;
//using GroupflyGroup.Platform.Web.Extension;
//using GroupflyGroup.Platform.Web.SimpleHelpers;
//using log4net;
//using File = GroupflyGroup.Platform.ObjectFramework.File;

//namespace GroupflyGroup.FrontEnd.Web.EventListener
//{
//    /// <summary>
//    /// 获取前台组件资源
//    /// </summary>
//    [Export(typeof(DoVirtualFileProviderEventListener))]
//    public class DoGetComponentResourcesEventListener : DoVirtualFileProviderEventListener
//    {
//        //private static readonly ILog log = log4net.LogManager.GetLogger(typeof(MvcApplication));
//        public override int Priority
//        {
//            get { return 100; }
//        }

//        public override string Description
//        {
//            get { return "获取前台组件资源"; }
//        }

//        public override void Do(Event e)
//        {
//            if (e.Parameter is File)
//            {
//                var file = e.Parameter as File;

//                var extensionName = "";
//                var name = "";
//                if (file.IsExists())
//                {
//                    name = file.Name;
//                    extensionName = file.ExtensionName;
//                }
//                else
//                {
//                    name = file.Name.Split('.')[0];
//                    extensionName = file.Name.Split('.')[1];
//                }

//                if (extensionName != "cshtml" || name.StartsWith("_"))
//                    return;
//                if (file.FileContent.IsNull())
//                    return;

//                var stream = file.FileContent;
//                var encoding = FileEncoding.DetectFileEncoding(stream, Encoding.Default);

//                stream.Position = 0;
//                StreamReader reader = new StreamReader(stream, encoding);
//                var text = reader.ReadToEnd();

//                var list = ComponentResourcesLoader.LoadComponentResource(text);
//                if (list.IsNullOrEmpty())
//                {
//                    stream.Position = 0;
//                    return;
//                }

//                var newText = text;
//                var scriptTemplate = @"<script type=""text/javascript"" src=""{0}""></script>";
//                var cssTemplate = @"<link href=""{0}"" rel=""stylesheet"" />";
//                var cssSb = new StringBuilder("@section css{");
//                var scriptSb = new StringBuilder("@section components{");

//                list.Each(model =>
//                {
//                    var oldTag = "<" + model.TagName + ">";
//                    var oldTagWithAttr = "<" + model.TagName + " ";
//                    var path = model.TemplateComponentPath.Substring(1);
//                    newText = newText.Replace(oldTag, "<" + model.TagName + " component-path=\"" + path + "\" >");
//                    newText = newText.Replace(oldTagWithAttr, "<" + model.TagName + " component-path=\"" + path + "\" ");

//                    if (!model.Items.IsNullOrEmpty())
//                    {
//                        model.Items.Each(i =>
//                        {
//                            if (i.ResourceItemType == "js")
//                            {
//                                scriptSb.Append(scriptTemplate.Formated(HttpContext.Current.Request.ApplicationPath + i.ResourceItemPath));
//                            }
//                            else if (i.ResourceItemType == "css")
//                            {
//                                cssSb.Append(cssTemplate.Formated(HttpContext.Current.Request.ApplicationPath + i.ResourceItemPath));
//                            }
//                        });
//                    }
//                });

//                newText = newText.Replace("@section css{", cssSb.ToString()).Replace("@section components{", scriptSb.ToString());

//                var newStream = new MemoryStream(Encoding.Default.GetBytes(newText));

//                file.FileContent = newStream;
//            }
//        }
//    }
//}