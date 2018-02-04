using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    public class FrontEndController : BaseController
    {
        public JsonResult GetObjektCollection(QueryModel query)
        {
            var model = new ObjektCollectionViewModel(query.klass);
            var data = model.GetListJson(query);
            var resault = new JsonResultModel(data);
            return Json(resault);
        }
    }
}