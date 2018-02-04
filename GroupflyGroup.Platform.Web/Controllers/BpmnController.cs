using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Controllers
{
    public class BpmnController : Controller
    {
        // GET: Bpmn
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }
    }
}