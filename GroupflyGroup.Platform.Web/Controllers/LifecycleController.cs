using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 生命周期视图控制类
    /// </summary>
    public class LifecycleController : BaseController
    {
        /// <summary>
        /// 默认页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("Lifecycle",new BaseViewModel());
        }


        /// <summary>
        /// 查询生命周期相关信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetLifecycleInfo(string lifecycleId)
        {
            LifecycleViewModel lifecycleViewModel = new LifecycleViewModel();

            Lifecycle fifecycleModel = ObjektFactory.Find<Lifecycle>(lifecycleId);

            lifecycleViewModel.Name = fifecycleModel.Name;
            lifecycleViewModel.Label = fifecycleModel.Label;
            lifecycleViewModel.ListLifecycleState = new List<LifecycleStateViewModel>();
            lifecycleViewModel.ListLifecycleTransition = new List<LifecycleTransitionViewModel>();

            //查询生命周期状态
            var listLifecycleStateModel = new ObjektCollection<LifecycleState>(Klass.ForId(KlassIDs.LifecycleState),new WhereClause("\"source\"='"+ lifecycleId + "'"));

            foreach (var lifecycleStateModel in listLifecycleStateModel)
            {
                LifecycleStateViewModel lifecycleStateViewModel = new LifecycleStateViewModel();

                lifecycleStateViewModel.Id = lifecycleStateModel.Id;
                lifecycleStateViewModel.Name = lifecycleStateModel.Name;
                lifecycleStateViewModel.Label = lifecycleStateModel.Label;
                if (lifecycleStateModel.GetProperty("loc") != null)
                {
                    lifecycleStateViewModel.Loc = lifecycleStateModel.GetProperty("loc").ToString();
                }
                else
                {
                    lifecycleStateViewModel.Loc = "";
                }
                lifecycleStateViewModel.Width = lifecycleStateModel.Width;
                lifecycleStateViewModel.Height = lifecycleStateModel.Height;

                lifecycleViewModel.ListLifecycleState.Add(lifecycleStateViewModel);
             }

            //查询生命周期转换
            var listLifecycleTransitionModel = new ObjektCollection<LifecycleTransition>(Klass.ForId(KlassIDs.LifecycleTransition), new WhereClause("\"source\"='" + lifecycleId + "'"));

            foreach (var lifecycleTransitionModel in listLifecycleTransitionModel)
            {
                LifecycleTransitionViewModel lifecycleTransitionViewModel = new LifecycleTransitionViewModel();

                lifecycleTransitionViewModel.Id = lifecycleTransitionModel.Id;
                lifecycleTransitionViewModel.Name = lifecycleTransitionModel.Name;
                lifecycleTransitionViewModel.Label = lifecycleTransitionModel.Label;
                lifecycleTransitionViewModel.From = lifecycleTransitionModel.From.Id;
                lifecycleTransitionViewModel.To = lifecycleTransitionModel.To.Id;
                if (lifecycleTransitionModel.GetProperty("points") != null)
                {
                    lifecycleTransitionViewModel.Points = lifecycleTransitionModel.GetProperty("points").ToString();
                }
                else
                {
                    lifecycleTransitionViewModel.Points = "";
                }
                lifecycleViewModel.ListLifecycleTransition.Add(lifecycleTransitionViewModel);
            }

            var data = new JsonResultModel(lifecycleViewModel.ObjectToJson());
            return Json(data);
        }
    }
}