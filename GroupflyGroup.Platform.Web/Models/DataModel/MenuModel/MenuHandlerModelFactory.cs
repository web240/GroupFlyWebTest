using GroupflyGroup.Platform.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{

    /// <summary>
    /// 菜单点击处理模型工厂
    /// </summary>
    public static class MenuHandlerModelFactory
    {
      
        /// <summary>
        /// 创建地址菜单点击处理模型(点击菜单跳转到Url)
        /// </summary>
        /// <param name="menuId">菜单ID</param>
        /// <param name="url">Url地址</param>
        /// <param name="title">打开页面标题</param>
        /// <param name="isPage">是页面或者DIV</param>
        /// <returns></returns>
        public static UrlMenuHandlerModel CreateUrlModel(string menuId, string url, string title, bool isPage)
        {

            return new UrlMenuHandlerModel
            {
                MenuId= menuId,
                Url = url,
                Title = title,
                IsPage = isPage
            };
        }

        /// <summary>
        /// 创建内容菜单点击处理模型(点击菜单会将内容写入到页面)
        /// </summary>
        /// <param name="menuId">菜单ID</param>
        /// <param name="content">页面内容</param>
        /// <param name="title">打开页面标题</param>
        /// <returns></returns>
        public static ContentMenuHandlerModel CreateContentModel(string menuId,string content,string title)
        {
            return new ContentMenuHandlerModel
            {
                MenuId= menuId,
                Content =content,
                Title=title
            };
        }


        /// <summary>
        /// 创建脚本菜单点击处理模型(点击菜单会处理一段脚本)
        /// </summary>
        /// <param name="menuId">菜单ID</param>
        /// <param name="script">脚本内容</param>
        /// <returns></returns>
        public static ScriptMenuHandlerModel CreateScriptModel(string menuId,string script)
        {
            return new ScriptMenuHandlerModel
            {
                MenuId= menuId,
                Script =script
            };
             
        }


        /// <summary>
        /// 创建空菜单点击处理模型(点击菜单不做任何操作)
        /// </summary>
        /// <param name="menuId">菜单ID</param>
        /// <returns></returns>
        public static MenuHandlerModel CreateEmptyModel(string menuId)
        {
            return new MenuHandlerModel
            {
                MenuId=menuId,
                HandleType=Const.MenuHandleType_None
            };
        }



    }
}
