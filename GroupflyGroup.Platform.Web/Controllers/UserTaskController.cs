using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Models;
using Org.Reddragonit.BpmEngine;

namespace BpmEngine.Web.Controllers
{
    public class UserTaskController : Controller
    {
        public ActionResult Index()
        {
            return View("UserTask", new BaseViewModel());
        }

        public ActionResult Begin()
        {
            //var doc = new XmlDocument();
            //var url = Server.MapPath("~/bpmn/diagram.bpmn");
            //doc.Load(url);
            //var p = new BusinessProcess(doc);
            //var stateXmlPath = Server.MapPath("~/bpmn/state.xml");

            var process = ObjektFactory.Find<WFProcess>("a2c22549093749329106a5c9950b808e@WFProcess");
            var test = ObjektFactory.New(Klass.ForName("Test"));
            test.SetProperty<string>("string", "wf");
            test.Save();
            process.Begin(test);

            return View("UserTask", new BaseViewModel());
        }

        public ActionResult Continue()
        {
            //var doc = new XmlDocument();
            //var url = Server.MapPath("~/bpmn/diagram.bpmn");
            //doc.Load(url);
            //var p = new BusinessProcess(doc);
            //var stateXmlPath = Server.MapPath("~/bpmn/state.xml");
            var instance = ObjektFactory.Find<WFInstance>("05c9ac15e6584895a60b43dc6bce8e8e@WFInstance");
            instance.Continue();
            //var process = ObjektFactory.Find<WFProcess>("a2c22549093749329106a5c9950b808e@WFProcess");
            

            return View("UserTask", new BaseViewModel());
        }
    }
}