using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Extension;
using GroupflyGroup.Platform.Web.Models;
using System.ComponentModel.Composition;
using System.Text;

namespace GroupflyGroup.Platform.Web.Hook
{
    /// <summary>
    /// 
    /// </summary>
    [Export(typeof(DoGlobalFilterHook))]
    public class DoUiExtensionGlobalFilterHook : DoGlobalFilterHook
    {
        public override int Order {
            get { return 100; }
        }
        public override string Description {
            get { return ""; }
        }
        public override bool Do(HookContext context)
        {
            return false;
            //if (e.Parameter is ActionExecutedContext)
            //{
            //    ActionExecutedContext aec = e.Parameter as ActionExecutedContext;
            //    ViewResult view = aec.Result as ViewResult;
            //    if (!view.IsNull())
            //    {
            //        BaseViewModel model = view.Model as BaseViewModel;
            //        if (!model.IsNull())
            //        {
            //            var extension = new DoExtensionPoint<DoUIExtensionGlobalFilterEventListener>();
            //            extension.Do(new Event(aec));
            //            model.BuildUIExtensions();
            //        }
            //    }
            //}
        }
    }
}