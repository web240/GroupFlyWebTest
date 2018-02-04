using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Models.DataModel;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 部件
    /// </summary>
    [LoginRequired]
    public class WidgetController : Controller
    {
        /// <summary>
        /// 查询部件和部件关联菜单信息
        /// </summary>
        /// <param name="widgetId"></param>
        /// <returns></returns>
        public JsonResult GetWidgetInfo(string widgetId)
        {
            WidgetViewModel widgetViewModel = new WidgetViewModel();
            widgetViewModel.ListWidgetMenuItem=  new List<WidgetMenuItemViewModel>();

            //查询部件信息
            var widget = ObjektFactory.Find(widgetId);
            widgetViewModel.Id = widget.Id;
            widgetViewModel.IsMaximizable =Convert.ToBoolean(widget.GetProperty("isMaximizable"));
            widgetViewModel.IsClosable =Convert.ToBoolean(widget.GetProperty("isClosable"));            
            widgetViewModel.Title = widget.GetProperty("title")==null?"": widget.GetProperty("title").ToString();
            widgetViewModel.IsOwnWidget = true;
            if (widget.Creator.Id != SessionContext.Current.User.Id)
            {

                widgetViewModel.IsOwnWidget = false;

            }

            //查询部件关联菜单项信息
            var listWidgetMenuItemModel = new ObjektCollection<RelationshipObjekt>(Klass.ForId(Const.WidgetMenuItemKlassID), new WhereClause("\"source\"='" + widgetViewModel.Id + "'"));

            listWidgetMenuItemModel.OrderByClause.Add(new OrderByCell(PropertyNames.sortOrder, Order.Asc));

            foreach (var widgetMenuItemModel in listWidgetMenuItemModel)
            {               
                if (widgetMenuItemModel.Related != null)
                {
                    WidgetMenuItemViewModel widgetMenuItemViewModel = new WidgetMenuItemViewModel();
                    widgetMenuItemViewModel.WidgetId = widgetMenuItemModel.GetProperty("source").ToString();
                    var menuItem = widgetMenuItemModel.Related as MenuItem;
                    widgetMenuItemViewModel.Id = widgetMenuItemModel.Id;
                    widgetMenuItemViewModel.WidgetId = widgetViewModel.Id;
                    widgetMenuItemViewModel.SortOrder = widgetMenuItemModel.SortOrder;
                    widgetMenuItemViewModel.MenuId = menuItem.Id;
                    widgetMenuItemViewModel.MenuLabel = menuItem.Label;
                    widgetMenuItemViewModel.MenuShowMode = menuItem.ShowMode.Value_;
                    widgetMenuItemViewModel.MenuFaIcon = menuItem.FaIcon;
                    widgetViewModel.ListWidgetMenuItem.Add(widgetMenuItemViewModel);
                }
            }
                 
            var data = new JsonResultModel(widgetViewModel.ObjectToJson());
            return Json(data);
        }
    }
}