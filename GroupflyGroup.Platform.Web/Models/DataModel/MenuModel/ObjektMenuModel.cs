using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 对象菜单模型
    /// </summary>
    public class ObjektMenuModel : MenuModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ObjektMenuModel(ObjektMenuItem entity, UrlHelper urlHelper) : base(entity, urlHelper)
        {
       
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override MenuHandlerModel GetClickHandler()
        {
            var entity = this.Entity as ObjektMenuItem;
            
            return MenuHandlerModelFactory.CreateUrlModel(entity.Id, Url.Action("ObjektView", "Platform") + "?id=" + entity.RefItem.Id+ "&klass="+ entity.RefItem.Klass.Name, entity.Label, false);           
        }
    }
}