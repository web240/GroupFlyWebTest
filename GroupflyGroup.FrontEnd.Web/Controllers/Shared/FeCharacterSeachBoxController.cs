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
    public class FeCharacterSeachBoxController : Controller
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="Text"></param>
        /// <param name="ControlIdName"></param>
        /// <param name="ControlTextName"></param>
        /// <param name="Title"></param>
        /// <param name="Width"></param>
        /// <returns></returns>
        public PartialViewResult Load(
            string Id,
            string Text,
            string ControlIdName, 
            string ControlTextName, 
            string Title = "请选择文章属性",
            int Width = 400
            )
        {
            FeCharacterSeachBoxViewModel mode = new FeCharacterSeachBoxViewModel();
            mode.Guid = Guid.NewGuid().ToString();
            mode.Id = Id;
            mode.Text = Text;
            mode.ControlIdName = ControlIdName;
            mode.ControlTextName = ControlTextName;
            mode.Title = Title;
            mode.Width = Width;
            return PartialView("_FeCharacterSeachBox",mode);
        }
    }
}