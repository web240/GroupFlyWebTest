using System.ComponentModel.Composition;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Extension;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.FrontEnd.Web.EventListener
{
    /// <summary>
    ///     在frontend层中注册全局控件fedatagird
    /// </summary>
    [Export(typeof (DoGlobalFilterEventListener))]
    public class DoAddLayoutResourceEventListener : DoGlobalFilterEventListener
    {
        public override int Priority
        {
            get { return 100; }
        }

        public override string Description
        {
            get { return ""; }
        }

        public override void Do(Event e)
        {
            if (e.Parameter is ActionExecutedContext)
            {
                var aec = e.Parameter as ActionExecutedContext;
                var view = aec.Result as ViewResult;
                if (!view.IsNull())
                {
                    var model = view.Model as BaseViewModel;
                    if (!model.IsNull())
                    {
                        var urlHelper = new UrlHelper(aec.RequestContext);

                        model.CssSection += urlHelper.Css("~/Platform/Content/themes/icon.css");
                        model.CssSection += urlHelper.Css("~/FrontEnd/Back/Content/Css/lc_switch.css");
                        model.CssSection += urlHelper.Css("~/FrontEnd/Back/Content/Css/showLoading.css");
                        model.CssSection += urlHelper.Css("~/FrontEnd/Back/Content/Css/FeBackCommon.css");
                        model.CssSection += urlHelper.Css("~/FrontEnd/Back/Content/themes/default/FeComponent.css");

                        model.ScriptSection += urlHelper.Script("~/FrontEnd/Back/Content/Scripts/jquery.zclip.js"); 
                        model.ScriptSection += urlHelper.Script("~/FrontEnd/Back/Content/Scripts/lc_switch.js");
                        model.ScriptSection += urlHelper.Script("~/FrontEnd/Back/Content/Scripts/jquery.showLoading.js");
                        model.UIComponentDefineSection += urlHelper.Script("~/FrontEnd/Back/Content/Scripts/FeComponents.js");
                        model.UIComponentRegisterSection += urlHelper.Script("~/FrontEnd/Back/Content/Scripts/FeComponentsRegister.js");
                        model.UIComponentRegisterSection += urlHelper.Script("~/FrontEnd/Back/Content/Scripts/FeCommon.js");

                    }
                }
            }
        }
    }
}