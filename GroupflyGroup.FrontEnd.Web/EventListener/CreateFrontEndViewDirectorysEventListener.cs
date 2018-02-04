using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Extension;

namespace GroupflyGroup.FrontEnd.Web.EventListener
{
    /// <summary>
    /// 前端层View目录
    /// </summary>
    [Export(typeof(CreateViewDirectorysEventListener))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class CreateFrontEndViewDirectorysEventListener : CreateViewDirectorysEventListener
    {
        public override List<string> CreateComponent(Event e)
        {
            var directorys = new List<string>();
            directorys.Add("FrontEnd/Back");
            //...
            directorys.Add("FrontEnd/Account");
            directorys.Add("FrontEnd/Account/Views/FeAccount");
            return directorys;
        }

        public override int Priority
        {
            get { return 900; }
        }

        public override string Description
        {
            get { return "前端层View目录"; }
        }
    }
}