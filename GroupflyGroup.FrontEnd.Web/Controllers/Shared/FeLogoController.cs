using System;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    /// <summary>
    ///     LOGO控制器
    /// </summary>
    public class FeLogoController : Controller
    {
        /// <summary>
        ///     根据id，获取logo对象
        /// </summary>
        /// <param name="id">LogoID</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetLogo(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentNullException("id");
            }

            var logo = ObjektFactory.Find<FeLogo>(id);

            return Json(new
            {
                logo.Id,
                logo.Name,
                ImagePath = logo.ImageFile.PathName,
                logo.Label,
                logo.Link
            });
        }
    }
}