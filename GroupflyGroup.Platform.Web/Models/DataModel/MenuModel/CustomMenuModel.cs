using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Extension;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class CustomMenuModel : MenuModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        public CustomMenuModel(CustomMenuItem entity) : base(entity)
        {

        }

        /// <summary>
        /// 菜单点击处理
        /// </summary>
        public MenuHandlerModel MenuHandlerModel { get; set; }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override MenuHandlerModel GetClickHandler()
        {
            var entity = this.Entity as CustomMenuItem;

            var model = MenuHandlerModelFactory.CreateEmptyModel(entity.Id);

            this.MenuHandlerModel = model;

            Hooks.Do<DoCustomMenuClickHook>(new HookContext(this));

            return this.MenuHandlerModel;
        }
    }
}