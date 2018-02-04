using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public static class MenuModelFactory
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="url"></param>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public static MenuModel CreateInstance(string id, UrlHelper url, string parentId = "")
        {
            var entity = ObjektFactory.Find(id);

            if (entity is NavigationMenuItem)
            {
                return new NavigateMenuModel(entity as NavigationMenuItem, url);
            }
            else if (entity is ObjektMenuItem)
            {
                return new ObjektMenuModel(entity as ObjektMenuItem, url);
            }
            else if (entity is KlassMenuItem)
            {
                return new KlassMenuModel(entity as KlassMenuItem, url);
            }
            else if (entity is Klass)
            {
                var menu = ObjektFactory.Find<KlassMenuItem>(parentId);
                return new KlassMenuModel(menu, url, entity as Klass);
            }
            else if (entity is CustomMenuItem)
            {
                return new CustomMenuModel(entity as CustomMenuItem);
            }
            return new DirectoryMenuModel(entity as DirectoryMenuItem, url);
        }
    }
}