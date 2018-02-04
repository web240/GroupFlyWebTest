using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class DirectoryMenuModel : MenuModel
    {
        /// <summary>
        /// 
        /// </summary>
        protected static Klass directoryMenuKlass = Klass.ForId(KlassIDs.DirectoryMenuItem);

        /// <summary>
        /// 
        /// </summary>
        protected static Klass NavigateMenuKlass = Klass.ForId(KlassIDs.NavigationMenuItem);

        /// <summary>
        /// 
        /// </summary>
        protected static Klass KlassMenuKlass = Klass.ForId(KlassIDs.KlassMenuItem);

        /// <summary>
        /// 
        /// </summary>
        protected static Klass ObjektMenuKlass = Klass.ForId(KlassIDs.ObjektMenuItem);

        /// <summary>
        /// 
        /// </summary>
        protected static Klass CustomMenuKlass = Klass.ForId(KlassIDs.CustomMenuItem);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="urlHelper"></param>
        public DirectoryMenuModel(DirectoryMenuItem entity, UrlHelper urlHelper) : base(entity, urlHelper)
        {
            this.isDirectory = true;
            this.GetChildren();
        }

        public override MenuHandlerModel GetClickHandler()
        {
            var entity = this.Entity as DirectoryMenuItem;            
            return MenuHandlerModelFactory.CreateEmptyModel(entity.Id); ;
        }

        /// <summary>
        /// 
        /// </summary>
        public override void GetChildren()
        {
            var dir = Entity as DirectoryMenuItem;
            foreach (var menu in dir.SubMenuItem)
            {
                var isShow = menu.GetProperty<bool>(PropertyNames.isShow);
                var isTrash = menu.GetProperty<bool>(PropertyNames.isTrash);
                if (isShow && !isTrash)
                {
                    MenuModel model = null;
                    if (menu.IsInstanceOf(directoryMenuKlass))
                        model = new DirectoryMenuModel(menu as DirectoryMenuItem, Url);
                    else if(menu.IsInstanceOf(NavigateMenuKlass))
                        model = new NavigateMenuModel(menu as NavigationMenuItem, Url);
                    else if (menu.IsInstanceOf(KlassMenuKlass))
                        model = new KlassMenuModel(menu as KlassMenuItem, Url);
                    else if (menu.IsInstanceOf(ObjektMenuKlass))
                        model = new ObjektMenuModel(menu as ObjektMenuItem, Url);
                    else if (menu.IsInstanceOf(CustomMenuKlass))
                        model = new CustomMenuModel(menu as CustomMenuItem);


                    if (!model.IsNull())
                        this.children.Add(model);
                }
                this.state = "closed";
            }
            base.GetChildren();
        }
    }
}