using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.Web.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// seo控制器。
    /// </summary>
    public class SeoController : Controller
    {

        /// <summary>
        /// seo关键字输入控件。
        /// </summary>
        /// <param name="seoKeys"></param>
        /// <param name="seoKeysModelFieldName"></param>
        /// <returns></returns>
        public PartialViewResult SeoKeysInput(string seoKeys,string seoKeysModelFieldName)
        {
            ViewBag.SeoKeys = seoKeys;
            ViewBag.SeoKeysModelFieldName = seoKeysModelFieldName;
            return PartialView("_SeoKeyInput");
        }

        /// <summary>
        /// 搜索seo关键字服务。
        /// </summary>
        /// <param name="query"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public JsonResult SearchSeoKey(int limit,string query)
        {

            List<FeSeoKeyViewModel> list = new List<FeSeoKeyViewModel>();

            if (query != null && !query.EndsWith(","))
            {
                //获取最后一组输入文本。
                string[] values = query.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

                if (values.Length > 0)
                {

                    string text = values[values.Length - 1];
                    var result = FeSeoKey.FindSeoKes(text);
                    result = result.Take(limit).ToList();

                    foreach (var item in result)
                    {
                        list.Add(new FeSeoKeyViewModel() {
                            label = item.Key,
                            Name = item.Key
                        });
                    }

                }

            }

            return Json(list, JsonRequestBehavior.AllowGet);

        }

    }
}