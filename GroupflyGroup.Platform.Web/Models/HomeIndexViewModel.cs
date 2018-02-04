using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using System.Web.Mvc;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class HomeIndexViewModel : BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public HomeIndexViewModel()
        {
            var logoConfig = ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.logo);
            if (logoConfig.IsExists())
                LogoId = logoConfig.Value;
            SystemTitle = ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.title).Value;

            var copyRightConfig = ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.copyright);
            if (copyRightConfig.IsExists())
                CopyRight = copyRightConfig.Value;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public void LoadMenus(string id, UrlHelper Url, string parentId = "")
        {
            var RootMenuItem = ObjektFactory.Find(id);
            MenuModel RootMenuItemModel;
            if (RootMenuItem is DirectoryMenuItem)
            {
                RootMenuItemModel = new DirectoryMenuModel(RootMenuItem as DirectoryMenuItem, Url);
            }
            else if (RootMenuItem is KlassMenuItem)
            {
                RootMenuItemModel = new KlassMenuModel(RootMenuItem as KlassMenuItem, Url);
                RootMenuItemModel.GetChildren();
            }
            else
            {
                var menu = ObjektFactory.Find<KlassMenuItem>(parentId.Replace('-', '@'));
                RootMenuItemModel = new KlassMenuModel(menu, Url, RootMenuItem as Klass);
                RootMenuItemModel.GetChildren();
            }

            this.Menus = RootMenuItemModel.children;
            this.MenusJson = this.Menus.ObjectToJson().Replace('@', '-');
        }

        /// <summary>
        /// 
        /// </summary>
        public List<MenuModel> Menus { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string MenusJson { get; set; }

        /// <summary>
        /// 系统图标地址
        /// </summary>
        public string LogoId { get; set; }

        /// <summary>
        /// 系统标题
        /// </summary>
        public string SystemTitle { get; set; }

        /// <summary>
        /// 版权信息
        /// </summary>
        public string CopyRight { get; set; }
    }
}