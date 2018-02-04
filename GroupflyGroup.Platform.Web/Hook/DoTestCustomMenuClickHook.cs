using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Extension;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Hook
{
    /// <summary>
    /// 
    /// </summary>
    [Export(typeof(DoCustomMenuClickHook))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class DoTestCustomMenuClickHook : DoCustomMenuClickHook
    {
        public override string Description
        {
            get { return "测试自定义菜单-文件系统"; }
        }

        public override int Order
        {
            get { return 100; }
        }

        public override bool Do(HookContext context)
        {
            var customMenuModel = context.Parameter as CustomMenuModel;
            if (customMenuModel.MenuHandlerModel.MenuId == MenuItemIDs.FileSystem)
            {
                var menu = ObjektFactory.Find<CustomMenuItem>(customMenuModel.MenuHandlerModel.MenuId);
                customMenuModel.MenuHandlerModel = MenuHandlerModelFactory.CreateUrlModel(customMenuModel.MenuHandlerModel.MenuId, HttpContext.Current.Request.ApplicationPath + "/File/FileCollectionView", menu.Label, false);
                return true;
            }
            return false;
        }
    }
}