using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// 文章分类选择控件。
    /// </summary>
    public class FeCharacterSelectController : Controller
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Title"></param>
        /// <param name="Width"></param>
        /// <returns></returns>
        public PartialViewResult Load(
            string Title = "请选择文章属性",
            int Width = 400
            )
        {
            FeCharacterSeachBoxViewModel mode = new FeCharacterSeachBoxViewModel();
            mode.Guid = Guid.NewGuid().ToString();
            mode.Title = Title;
            mode.Width = Width;
            return PartialView("_FeCharacterSelect", mode);
        }
    }
}