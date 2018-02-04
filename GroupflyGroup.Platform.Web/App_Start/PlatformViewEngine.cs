using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Extension;
using Microsoft.SqlServer.Server;

namespace GroupflyGroup.Platform.Web
{
    /// <summary>
    /// 
    /// </summary>
    public class PlatformViewEngine : RazorViewEngine
    {
        /// <summary>
        /// 
        /// </summary>
        public PlatformViewEngine()
        {
            var directorys = Hooks.CreateComponents<string, CreateViewDirectorysHook>(new HookContext(null));
            if (!directorys.IsNullOrEmpty())
            {
                var array = new List<string>();
                directorys.Each(directoryString =>
                {
                    array.Add(directoryString);
                });
                this.AddViewRootDirectories(array);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="directoryNames"></param>
        protected void AddViewRootDirectories(List<string> directoryNames)
        {
            if (directoryNames.IsNullOrEmpty())
                return;

            var formats = new List<string>();
            var areaFormats = new List<string>();

            directoryNames.Each(directoryName =>
            {
                var ViewFormat = $"~/{directoryName}/Views/{{1}}/{{0}}.cshtml";
                var PartialViewFormat = $"~/{directoryName}/Views/Shared/{{1}}/{{0}}.cshtml";
                var areaViewFormat = $"~/{directoryName}/Areas/Views/{{1}}/{{0}}.cshtml";
                var areaPartialViewFormat = $"~/{directoryName}/Areas/Views/Shared/{{1}}/{{0}}.cshtml";

                formats.Add(ViewFormat);
                formats.Add(PartialViewFormat);
                areaFormats.Add(areaViewFormat);
                areaFormats.Add(areaPartialViewFormat);
            });
            var areaFormatsArray = areaFormats.ToArray();
            var formatsArray = formats.ToArray();

            this.AreaViewLocationFormats = areaFormatsArray;
            this.AreaMasterLocationFormats = areaFormatsArray;
            this.AreaPartialViewLocationFormats = areaFormatsArray;
            this.ViewLocationFormats = formatsArray;
            this.MasterLocationFormats = formatsArray;
            this.PartialViewLocationFormats = formatsArray;

        }
    }
}