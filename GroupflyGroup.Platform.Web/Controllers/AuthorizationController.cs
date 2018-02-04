using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [LoginRequired]
    public class AuthorizationController : Controller
    {
        /// <summary>
        /// 获得对象的权限信息
        /// </summary>
        /// <param name="id">对象id</param>
        /// <returns></returns>
        public JsonResult GetAuthorization(string id)
        {
            var model = new AuthorizationModel(id);
            return Json(new JsonResultModel(model.ToJson()));
        }

        /// <summary>
        /// 获得对象的新建私有权限
        /// </summary>
        /// <param name="id">对象id</param>
        /// <returns></returns>
        public JsonResult GetDefaultPrivatePermission(string id)
        {
            var model = new AuthorizationModel(id);
            return Json(new JsonResultModel(model.GetDefaultPrivatePermission()));
        }

        /// <summary>
        /// 授权
        /// </summary>
        /// <param name="id">对象id</param>
        /// <param name="permissionId">权限id</param>
        /// <returns></returns>
        public JsonResult Authorize(string id, string permissionId)
        {
            var model = new AuthorizationModel(id);
            model.SetPermission(permissionId.Replace("-","@"));
            return Json(new JsonResultModel());
        }
    }
}