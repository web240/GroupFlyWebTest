using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Extension;

namespace GroupflyGroup.Platform.Web.Hook
{
    /// <summary>
    /// 创建一系列Platform系统View目录字符串
    /// </summary>
    [Export(typeof(CreateViewDirectorysHook))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class CreatePlatformViewDirectorysHook : CreateViewDirectorysHook
    {
        public override IList<string> CreateComponents(HookContext context)
        {
            var directorys = new List<string>();
            directorys.Add("Platform");
            return directorys;
        }

        public override int Order
        {
            get { return 100; }
        }

        public override string Description
        {
            get { return "平台层View目录"; }
        }
    }
}