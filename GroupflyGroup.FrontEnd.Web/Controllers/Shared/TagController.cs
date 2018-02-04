using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// Tag控制器。
    /// </summary>
    public class TagController : Controller
    {

        /// <summary>
        /// Tag关键字输入控件。
        /// </summary>
        /// <param name="tag"></param>
        /// <param name="tagModelFieldName"></param>
        /// <returns></returns>
        public PartialViewResult TagKeyInput(string tag,string tagModelFieldName,string width="400")
        {
            ViewBag.Tag = tag;
            ViewBag.TagModelFieldName = tagModelFieldName;
            ViewBag.Width = width+"px";
            return PartialView("_TagKeyInput");
        }

        /// <summary>
        /// 搜索tag关键字服务。
        /// </summary>
        /// <param name="query"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public JsonResult SearchTagKey(int limit,string query)
        {

            List<FeSeoKeyViewModel> list = new List<FeSeoKeyViewModel>();

            if (query != null && !query.EndsWith(","))
            {
                //获取最后一组输入文本。
                string[] values = query.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

                if (values.Length > 0)
                {

                    string text = values[values.Length - 1];
                    var result = FeTag.FindTags(text);
                    result = result.Take(limit).ToList();

                    foreach (var item in result)
                    {
                        list.Add(new FeSeoKeyViewModel() {
                            label = item.Tag,
                            Name = item.Tag
                        });
                    }

                }

            }

            return Json(list, JsonRequestBehavior.AllowGet);

        }

    }
}