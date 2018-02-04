using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using GroupflyGroup.Platform.Web.Models;
using Org.Reddragonit.BpmEngine;
using Org.Reddragonit.BpmEngine.Interfaces;

namespace BpmEngine.Web.Controllers
{
    public class MessageEventController : Controller
    {
        public ActionResult Index()
        {
            return View("MessageEvent", new BaseViewModel());
        }

        public ActionResult Begin()
        {
            var doc = new XmlDocument();
            var url = Server.MapPath("~/bpmn/MessageEvent.bpmn");
            doc.Load(url);
            var p = new BusinessProcess(doc);
            var stateXmlPath = Server.MapPath("~/bpmn/state.xml");


            p.ProcessTask = (IStepElement task, ref ProcessVariablesContainer variables) =>
            {
                //p.State.Document.Save(stateXmlPath);
            };

            p.OnProcessCompleted = (process, variables) =>
            {
                p.State.Document.Save(stateXmlPath);
            };

            p.BeginProcess(new ProcessVariablesContainer());

            return View("MessageEvent", new BaseViewModel());
        }
    }
}