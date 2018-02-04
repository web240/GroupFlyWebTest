using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class KlassMenuModel : MenuModel
    {
        /// <summary>
        /// 
        /// </summary>
        public KlassMenuModel(KlassMenuItem entity, UrlHelper urlHelper) : base(entity, urlHelper)
        {
            this.Klas = entity.ReferKlass;
            this.IsShowChildren = entity.GetProperty<bool>(PropertyNames.expandChildren);
            if (!Klas.IsNull() && Klas.IsExists())
            {
                if (Klas.Children.Count > 0)
                    this.state = "closed";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="urlHelper"></param>
        /// <param name="entity"></param>
        public KlassMenuModel(KlassMenuItem entity, UrlHelper urlHelper, Klass klass) : base(entity, urlHelper)
        {
            this.Klas = klass;
            this.IsShowChildren = true;
            this.id = entity.Id + "_" + klass.Id;
            this.text = klass.Label;
            this.label = $"{entity.Label}({klass.Label})";
            this.parentId = entity.Id;
            this.iconCls = entity.FaIcon;
        }
        

        /// <summary>
        /// 
        /// </summary>
        protected bool IsShowChildren { get; set; }

        /// <summary>
        /// 
        /// </summary>
        protected Klass Klas { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override MenuHandlerModel GetClickHandler()
        {
            if(this.Klas.IsNull() || !this.Klas.IsExists())
                throw new Exception("该类菜单“引用类”属性未赋值！");

            var entity = this.Entity as KlassMenuItem;
            var IsTrashStation = false;
            var url = Url.Action("ObjektCollectionView", "Platform") + "?klass=" + this.Klas.Name;
            
            if (!entity.Filter.IsNull())
            {
                url += "&filterId=" + entity.Filter.Id;
                if(entity.Filter.Id == "961c351ffc6d47db8928bc98bf10e89f@Filter")
                    IsTrashStation = true;
            }
            url += "&isTrashStation=" + IsTrashStation;
            url += "&subClass=" + !IsShowChildren;



            return MenuHandlerModelFactory.CreateUrlModel(entity.Id, url,this.label, false);
        }

        /// <summary>
        /// 
        /// </summary>
        public override void GetChildren()
        {
            if (this.IsShowChildren)
            {
                var subclasses = Klas.Children;
                subclasses.Each(subklass =>
                {
                    var isTrash = subklass.GetProperty<bool>(PropertyNames.isTrash);
                    if (!isTrash)
                    {
                        var model = new KlassMenuModel(this.Entity as KlassMenuItem, Url, subklass);
                        model.iconCls = this.iconCls;
                        if (subklass.Children.Count > 0)
                            model.state = "closed";
                        this.children.Add(model);
                    }
                });
            }
            base.GetChildren();
        }
    }
}