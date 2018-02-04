using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class NavigateMenuModel : MenuModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="urlHelper"></param>
        public NavigateMenuModel(NavigationMenuItem entity, UrlHelper urlHelper) : base(entity, urlHelper)
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override MenuHandlerModel GetClickHandler()
        {
            var entity = this.Entity as NavigationMenuItem;

            return MenuHandlerModelFactory.CreateUrlModel(entity.Id, this.Url.Action("Navigation", "Home") + "?id=" + entity.Id, entity.Label, entity.GetProperty<bool>(PropertyNames.isPage));     
        }
    }
}