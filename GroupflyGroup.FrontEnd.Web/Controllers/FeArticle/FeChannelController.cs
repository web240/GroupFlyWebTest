using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Controllers.Shared;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    /// <summary>
    ///     频道管理
    /// </summary>
    //[LoginRequired]
    public class FeChannelController : BaseController
    {
        /// <summary>
        ///     主页
        /// </summary>
        /// <returns></returns>
        // GET: FeChannel
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        ///     获取列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Get(int pageNumber, int pageSize)
        {
            var list = new List<FeChannelViewModel>();
            var oc = new ObjektCollection<FeChannel>(Klass.ForId(FeKlassIDs.FeChannel), new Pagination(pageNumber, pageSize)).ToView();
            foreach (var item in oc)
            {
                var model = new FeChannelViewModel();
                model.CopyEntity(item);
                list.Add(model);
            }
            list = list.OrderBy(t => t.SortOrder).ToList();
            //return Json(list);            
            var data = $"{{ \"total\": \"{oc.Pagination.RowCount}\", \"rows\": {list.ObjectToJson()} }}";
            var resault = new JsonResultModel(data);
            return Json(resault);
        }


        /// <summary>
        ///     获取频道列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetChannelList()
        {

            var klass = Klass.ForId(FeKlassIDs.FeChannel);
            var condition = new WhereExpression<FeChannel>(klass);
            condition.Where(FePropertyNames.isDisplay, Const.Oper_Equals, 1);
            var model = new List<FeChannelViewModel>();

            ObjektCollection<FeChannel> oc = new ObjektCollection<FeChannel>(klass, condition.ToWhereClause());

            foreach (var feChannel in oc)
            {
                FeChannelViewModel viewModel = new FeChannelViewModel();
                viewModel.CopyEntity(feChannel);
                model.Add(viewModel);
            }

            model = model.OrderBy(t => t.SortOrder).ToList();
            return Json(model);
        }


        /// <summary>
        ///     获取频道的分类列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetCategoryList(string channelId)
        {
            var model = new List<FeArticleCategoryViewModel>();

            var channel = ObjektFactory.Find<FeChannel>(channelId);

            FeArticleCategoryViewModel viewModel = new FeArticleCategoryViewModel();
            viewModel.Id = channel.Category.Id;
            viewModel.Name = channel.Category.Name;
            viewModel.ParentId = "";
            model.Add(viewModel);

            var categoryOc = new ObjektCollection<FeArticleCategory>(Klass.ForId(FeKlassIDs.FeArticleCategory), new WhereClause("\"" + FePropertyNames.parent + "\" = '" + channel.Category.Id + "'"));
            foreach (var feCategory in categoryOc)
            {
                FeArticleCategoryViewModel viewModel1 = new FeArticleCategoryViewModel();
                viewModel1.CopyEntity(feCategory);
                model.Add(viewModel1);

                var categoryOc2 = new ObjektCollection<FeArticleCategory>(Klass.ForId(FeKlassIDs.FeArticleCategory), new WhereClause("\"" + FePropertyNames.parent + "\" = '" + feCategory.Id + "'"));
                foreach (var feCategory2 in categoryOc2)
                {
                    FeArticleCategoryViewModel viewModel2 = new FeArticleCategoryViewModel();
                    viewModel2.CopyEntity(feCategory2);
                    model.Add(viewModel2);
                }
            }
            return Json(model);
        }

        /// <summary>
        ///     进入频道创建页。
        /// </summary>
        /// <returns></returns>
        public ActionResult Create()
        {
            var model = new FeChannelViewModel();
            model.OperationType = 1;
            model.SeoKeyRemark = "(','号分开)";
            model.IsDisplay = "on";
            model.SortOrder = FeChannel.NewSortOrder();

            var list = LoadTemplateList();

            foreach (var item in list)
            {
                model.TemplateList.Add(item);
            }

            return View("ChannelDetails", model);
        }

        private static List<SelectListItem> LoadTemplateList()
        {
            var klass = Klass.ForId(FeKlassIDs.FeTemplate);
            var condition = new WhereExpression<FeTemplate>(klass);
            condition.Where(PropertyNames.type, Const.Oper_Equals, FeValueIDs.FeTemplateType_Channel);
            condition.Where(FePropertyNames.isEnable, Const.Oper_Equals, 1);

            var oc = new
                ObjektCollection<FeTemplate>(klass, condition.ToWhereClause());

            var list = new List<SelectListItem>();

            foreach (var item in oc)
            {
                list.Add(new SelectListItem { Text = item.Name + "[" + (item.Description.Length >= 10 ? (item.Description.Substring(0, 10) + "...") : item.Description) + "]", Value = item.Id });
            }

            list.Insert(0, new SelectListItem { Text = "请选择", Value = "0" });

            return list;
        }

        /// <summary>
        ///     添加操作
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Add(FeChannelViewModel model)
        {
            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.ErrorMessage = ModelState.ErrorMessageString();
            }

            //加入自己的验证，选择域名类型后，必须填写相应的文本内容。
            if ((model.DomainType == FeValueIDs.FeDomainType_DirectoryName &&
                 string.IsNullOrWhiteSpace(model.DirectoryNameDomainText))
                ||
                (model.DomainType == FeValueIDs.FeDomainType_SecondDomain &&
                 string.IsNullOrWhiteSpace(model.SecondDomainDomainText))
                ||
                (model.DomainType == FeValueIDs.FeDomainType_TopDomain &&
                 string.IsNullOrWhiteSpace(model.TopDomainDomainText)))
            {
                result.ErrorMessage += "\r\n请输入选择的访问域名";
            }

            if (string.IsNullOrWhiteSpace(result.ErrorMessage))
            {
                FeArticleCategory category;
                FeTemplate template;

                if (!ObjektFactory.IsExists(model.CategoryId))
                {
                    result.Code = 0;
                    result.ErrorMessage = "找不到选择的文章分类";
                }
                else
                {
                    try
                    {
                        var channel = new FeChannel();
                        channel.Name = model.Name;
                        category = ObjektFactory.Find<FeArticleCategory>(model.CategoryId);
                        channel.Category = category;
                        if (model.TemplateId != "0")
                        {
                            template = ObjektFactory.Find<FeTemplate>(model.TemplateId);
                            channel.Template = template;
                        }
                        channel.DomainType = ObjektFactory.Find<Value>(model.DomainType);

                        switch (model.DomainType)
                        {
                            case FeValueIDs.FeDomainType_DirectoryName:

                                channel.DomainText = model.DirectoryNameDomainText;

                                break;
                            case FeValueIDs.FeDomainType_SecondDomain:

                                channel.DomainText = model.SecondDomainDomainText;

                                break;
                            case FeValueIDs.FeDomainType_TopDomain:

                                channel.DomainText = model.TopDomainDomainText;

                                break;
                        }

                        channel.IsDisplay = model.IsDisplay == "on" ? true : false;
                        channel.SortOrder = model.SortOrder;
                        channel.SeoTitle = model.SeoTitle;
                        channel.SeoDescription = model.SeoDescription;

                        var channelUrl = new Platform.ObjectFramework.Url();
                        channelUrl.url = HttpContext.Request.ApplicationPath + "/" + channel.DomainText;
                        channelUrl.Save();

                        channel.Url = channelUrl; //CreateUrl(model.DomainType, channel.DomainText);

                        channel.Save();

                        SetSeoKeys(model.SeoKeys, channel.Id);

                        result.Code = 1;
                    }
                    catch (Exception ex)
                    {
                        result.Code = 0;
                        result.ErrorMessage = ex.ToString();
                    }
                }
            }
            else
            {
                result.Code = 0;
            }

            return Json(result);
        }

        private void SetSeoKeys(string seoKeys, string id)
        {
            if (string.IsNullOrWhiteSpace(seoKeys))
            {
                seoKeys = "";
            }

            var list = seoKeys.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            FeSeoKey.SetObjektSeo(new List<string>(list), FeRelationshipNames.FeChannelSeoKey, id);
        }

        private Url CreateUrl(string domainType, string domainText)
        {
            var url = ObjektFactory.Find<Url>("578014a6e48a4058ad944a8e453a6b83@Url");
            return url;
        }

        /// <summary>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Edit(string id)
        {
            var channel = ObjektFactory.Find<FeChannel>(id);

            if (channel != null && channel.IsExists())
            {
                var model = new FeChannelViewModel();
                model.CopyEntity(channel);
                model.OperationType = 2;

                if (channel.Logo != null && channel.Logo.IsExists())
                {
                    model.LogoId = channel.Logo.Id;
                    model.LogoName = channel.Logo.Name;
                    model.LogoPermissionCode = new PermissionModel(channel).Code;
                }

                model.TemplateList = LoadTemplateList();

                if (channel.Template == null)
                {
                    model.TemplateId = "0";
                }
                else
                {
                    model.TemplateId = channel.Template.Id;
                }

                return View("ChannelDetails", model);
            }
            return View("Index");
        }

        /// <summary>
        ///     修改操作
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Edit(FeChannelViewModel model)
        {
            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.ErrorMessage = ModelState.ErrorMessageString();
            }

            //加入自己的验证，选择域名类型后，必须填写相应的文本内容。
            if ((model.DomainType == FeValueIDs.FeDomainType_DirectoryName &&
                 string.IsNullOrWhiteSpace(model.DirectoryNameDomainText))
                ||
                (model.DomainType == FeValueIDs.FeDomainType_SecondDomain &&
                 string.IsNullOrWhiteSpace(model.SecondDomainDomainText))
                ||
                (model.DomainType == FeValueIDs.FeDomainType_TopDomain &&
                 string.IsNullOrWhiteSpace(model.TopDomainDomainText)))
            {
                result.ErrorMessage += "\r\n请输入选择的访问域名";
            }

            if (string.IsNullOrWhiteSpace(result.ErrorMessage))
            {
                FeArticleCategory category;
                FeTemplate template = null;

                if (!ObjektFactory.IsExists(model.CategoryId))
                {
                    result.Code = 0;
                    result.ErrorMessage = "找不到选择的文章分类";
                }
                else
                {
                    try
                    {
                        category = ObjektFactory.Find<FeArticleCategory>(model.CategoryId);

                        if (model.TemplateId != "0")
                        {
                            template = ObjektFactory.Find<FeTemplate>(model.TemplateId);
                        }

                        var channel = ObjektFactory.Find<FeChannel>(model.Id);
                        channel.Name = model.Name;
                        channel.Category = category;
                        channel.Template = template;
                        channel.DomainType = ObjektFactory.Find<Value>(model.DomainType);

                        switch (model.DomainType)
                        {
                            case FeValueIDs.FeDomainType_DirectoryName:

                                channel.DomainText = model.DirectoryNameDomainText;

                                break;
                            case FeValueIDs.FeDomainType_SecondDomain:

                                channel.DomainText = model.SecondDomainDomainText;

                                break;
                            case FeValueIDs.FeDomainType_TopDomain:

                                channel.DomainText = model.TopDomainDomainText;

                                break;
                        }

                        channel.IsDisplay = model.IsDisplay == "on" ? true : false;
                        channel.SortOrder = model.SortOrder;
                        channel.SeoTitle = model.SeoTitle;
                        channel.SeoDescription = model.SeoDescription;


                        var url = ObjektFactory.Find<Url>(model.UrlId);
                        var newUrl = HttpContext.Request.ApplicationPath + "/" + channel.DomainText;
                        if (url.url != newUrl)
                        {
                            var channelUrl = new Platform.ObjectFramework.Url();
                            channelUrl.url = newUrl;
                            channelUrl.Save();
                            channel.Url = channelUrl;
                        }

                        FeLogo logo = null;

                        if (!string.IsNullOrWhiteSpace(model.Logo))
                        {
                            var serializer = new JsonSerializer();
                            var sr = new StringReader(model.Logo);
                            var o = serializer.Deserialize(new JsonTextReader(sr), typeof(FeChannelViewModel));
                            var t = o as FeChannelViewModel;

                            if (t != null && !string.IsNullOrWhiteSpace(t.Id))
                            {
                                logo = ObjektFactory.Find<FeLogo>(t.Id);
                            }
                        }

                        channel.Logo = logo;

                        channel.Save();

                        SetSeoKeys(model.SeoKeys, channel.Id);

                        result.Code = 1;

                    }
                    catch (Exception ex)
                    {
                        result.Code = 0;
                        result.ErrorMessage = ex.ToString();
                    }
                }
            }
            else
            {
                result.Code = 0;
            }

            return Json(result);
        }

        /// <summary>
        ///     设置频道是否在前台显示.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SetIsDisplay(string id, string value)
        {
            var result = new JsonActionResult();
            if (value == "true" || value == "false")
            {
                var channel = ObjektFactory.Find<FeChannel>(id);
                if (channel != null && channel.IsExists())
                {
                    channel.IsDisplay = value == "true" ? true : false;
                    channel.Save();
                    result.Code = 1;
                }
                else
                {
                    result.ErrorMessage = "找不到指定的频道";
                }
            }
            else
            {
                result.ErrorMessage = "参数错误";
            }

            return Json(result);
        }

        /// <summary>
        ///     设置频道排序字段。
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SetSortOrder(string id, decimal value)
        {
            var result = new JsonActionResult();

            var channel = ObjektFactory.Find<FeChannel>(id);

            if (channel != null && channel.IsExists())
            {
                channel.SortOrder = value;
                channel.Save();
                result.Code = 1;
            }
            else
            {
                result.ErrorMessage = "找不到指定的频道";
            }


            return Json(result);
        }

        /// <summary>
        ///     删除频道。
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Del(string id)
        {
            var result = new JsonActionResult();

            var channel = ObjektFactory.Find<FeChannel>(id);

            if (channel != null && channel.IsExists())
            {
                channel.Delete();
                channel.Save();
                result.Code = 1;
            }
            else
            {
                result.ErrorMessage = "找不到指定的频道";
            }

            return Json(result);
        }
    }
}