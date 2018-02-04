using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using Org.Reddragonit.BpmEngine;

namespace BpmEngine.Web.Controllers
{
    public class ProcessImgController : Controller
    {
        // GET: ProcessImg
        public FileResult Index()
        {
            var doc = new XmlDocument();
            var url = Server.MapPath("~/bpmn/MessageEvent.bpmn");
            doc.Load(url);
            var p = new BusinessProcess(doc);
            return File(p.Animate(false),"application/image");
        }
    }
}