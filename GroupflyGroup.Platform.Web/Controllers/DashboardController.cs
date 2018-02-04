using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 欢迎页
    /// </summary>
    [LoginRequired]
    public class DashboardController : BaseController
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            return View("Dashboard", new DashboardViewModel());
        }



        /// <summary>
        /// 查询欢迎页信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDashboardInfo()
        {
            DashboardViewModel dashboardViewModel = new DashboardViewModel();

            var klass = ObjektFactory.Find<Klass>(Const.DashboardKlassID);

            var identityPersonalization = GetMatchIdentityPersonalization(SessionContext.Current.User, klass);

            Personalization personalization = null;

            dashboardViewModel.IsMyOwn = false;
            if (identityPersonalization != null)
            {
                personalization = identityPersonalization.Related as Personalization;

                var identity = identityPersonalization.Source as Identity;

                if (SessionContext.Current.User.Id == identity.Id)
                {
                    dashboardViewModel.IsMyOwn = true;
                }
            }
            else
            {
                personalization = ObjektFactory.Find<Personalization>(Const.DefaultDashboard);
                
            }
            dashboardViewModel.DashboardId = personalization.Id;
            dashboardViewModel.Name = personalization.Name;
            dashboardViewModel.Label = personalization.GetProperty("label") == null ? "" : personalization.GetProperty("label").ToString();
            dashboardViewModel.Description = personalization.Description;
            dashboardViewModel.Content = personalization.GetProperty("content") == null ? "" : personalization.GetProperty("content").ToString();
            dashboardViewModel.DashboardWidgetList = new List<DashboardWidgetViewModel>();
            dashboardViewModel.MySelfIdentityId = SessionContext.Current.User.Id;

            var dashboardWidgetList =new ObjektCollection<RelationshipObjekt>(Klass.ForId(Const.DashboardWidgetKlassID),new WhereClause("\"source\"='"+ personalization .Id+ "'"));
            foreach (var dashboardWidget in dashboardWidgetList)
            {
                DashboardWidgetViewModel dashboardWidgetViewModel = new DashboardWidgetViewModel();
                dashboardWidgetViewModel.DashboardWidgetId = dashboardWidget.Id;
                dashboardWidgetViewModel.DashboardId = dashboardWidget.Source.Id;
                if (dashboardWidget.Related != null)
                {
                    dashboardWidgetViewModel.WidgetId = dashboardWidget.Related.Id;
                }
                dashboardViewModel.DashboardWidgetList.Add(dashboardWidgetViewModel);
            }



            var data = new JsonResultModel(dashboardViewModel.ObjectToJson());
            return Json(data);
        }


        /// <summary>
        /// 查询身份对应的个性化信息
        /// </summary>
        /// <param name="identity">身份</param>
        /// <param name="klass">个性化类</param> 
        /// <param name="order">排序,默认升序</param>
        public ObjektCollection<IdentityPersonalization> GetIdentityPersonalization(Identity identity, Klass klass,Order order=Order.Asc)
        {            
            var modelList = new ObjektCollection<IdentityPersonalization>(Klass.ForId(KlassIDs.IdentityPersonalization), new WhereClause("\"source\"='" + identity.Id + "'and \"related\" in (select \"id\" from \"Personalization\" where \"klass\"='" + klass.Id + "')"));

            modelList.OrderByClause.Add(new OrderByCell(PropertyNames.priority, Order.Asc));

            return modelList;
        }

        /// <summary>
        /// 查询匹配的身份个性化信息
        /// </summary>
        /// <param name="identity">对象身份</param>
        /// <param name="klass">个性化类</param>        
        /// <returns></returns>
        public IdentityPersonalization GetMatchIdentityPersonalization(Identity identity, Klass klass)
        {

            //查询对象的身份个性化信息
            var identityPersonalizationList = GetIdentityPersonalization(identity, klass);

            //对象存在个性化信息直接返回第一个
            if (identityPersonalizationList.Count > 0)
            {
                return identityPersonalizationList[0];
            }
            //对象不存在个性化信息取父角色个性化信息
            else
            {
                //查询身份对应的父角色
                var parentRoleList = identity.GetParentRoles();

                foreach (var parentRole in parentRoleList)
                {
                    var model = GetMatchIdentityPersonalization(parentRole, klass);
                    if (model != null)
                    {
                        return model;
                    }
                  
                }
            }

            return null;


        }
    }
}