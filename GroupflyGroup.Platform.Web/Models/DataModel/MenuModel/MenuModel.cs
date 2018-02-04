using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 菜单模型
    /// </summary>
    public abstract class MenuModel : TreeModel
    {

    

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="urlHelper"></param>
        protected MenuModel(MenuItem entity, UrlHelper urlHelper = null):base(entity)
        {
            this.state =  "open";
            this.iconCls = entity.FaIcon;
            this.Url = urlHelper;
            this.text = entity.Label;
            this.label = entity.Label;
            this.ShowMode= entity.ShowMode.Value_;
        }

        /// <summary>
        /// 
        /// </summary>
        protected MenuModel(UrlHelper urlHelper = null)
        {
            this.state = "open";
            this.Url = urlHelper;
        }
       
        /// <summary>
        /// 显示方式（0:无，1:显示在标签页，2:显示模态窗口，3:显示非模态窗口,4:显示新页面）
        /// </summary>
        public string ShowMode { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public string label { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string parentId { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        protected UrlHelper Url { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<MenuModel> children { get; set; } = new List<MenuModel>();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public abstract MenuHandlerModel GetClickHandler();

        /// <summary>
        /// 
        /// </summary>
        public override void GetChildren()
        {
            if (!this.children.IsNullOrEmpty())
            {
                this.children = this.children.FindAll(o => o.Permission.CanDiscover);
            }
        }
    }
}