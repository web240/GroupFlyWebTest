using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
using EB.Common;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    /// <summary>
    /// 新闻资讯
    /// </summary>
    public class FeArticleController : Controller
    {
        #region 后台方法
        /// <summary>
        ///     FeArticle
        /// </summary>
        /// <param name="tab"></param>
        /// <returns></returns>
        public ActionResult Index(string tab = "1")
        {
            ViewBag.Tab = tab;
            return View(new BaseViewModel());
        }

        /// <summary>
        ///     回收文章视图
        /// </summary>
        /// <returns></returns>
        public ActionResult TrashFeArticle()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        ///     文章列表视图
        /// </summary>
        /// <param name="tab"></param>
        /// <returns></returns>
        public ActionResult Grid(string tab)
        {
            ViewData["Tab"] = tab;
            return PartialView("Grid");
        }

        /// <summary>
        ///     保存文章
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="isDraft"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SaveFeArticle(FeArticleModel mode, bool isDraft = false)
        {
            //Klass.ForId(FeKlassIDs.FeArticle).GetInstances<ObjectFramework.FeArticle>().DeleteAll();
            var result = new JsonResultModel();
            try
            {
                if (ModelState.IsValid)
                {
                    ObjectFramework.FeArticle feArticle = null;
                    if (!string.IsNullOrEmpty(mode.Id))
                    {
                        feArticle = ObjektFactory.Find<ObjectFramework.FeArticle>(mode.Id);
                    }
                    else
                    {
                        feArticle = new ObjectFramework.FeArticle();
                        feArticle.TitleValue = mode.TitleValue;
                        feArticle.Content = mode.Content;
                    }

                    feArticle.Title = mode.Title;
                    if (mode.TitleIsModify)
                    {
                        feArticle.TitleValue = mode.TitleValue;
                    }

                    feArticle.Category = ObjektFactory.Find<FeArticleCategory>(mode.CategoryID);
                    if (!string.IsNullOrEmpty(mode.ImageFileId))
                    {
                        feArticle.Image = ObjektFactory.Find<File>(mode.ImageFileId);
                    }
                    feArticle.SortOrder = mode.SortOrder;
                    if (mode.ContentIsModify)
                    {
                        feArticle.Content = mode.Content;
                    }

                    feArticle.HitsNum = mode.HitsNum;
                    feArticle.IsDisplay = mode.IsDisplay;
                    feArticle.CanComment = mode.CanComment;
                    feArticle.Author = mode.Author;
                    feArticle.From = mode.From;
                    feArticle.SeoTitle = mode.SeoTitle;
                    feArticle.SeoDescription = mode.SeoDescription;
                    feArticle.IsDraft = isDraft;
                    feArticle.Save();
                    SetTags(mode.Tag, feArticle.Id);
                    SetSeoKeys(mode.SeoKeys, feArticle.Id);
                    SetCharacters(mode.CharacterID, feArticle.Id);
                    result.IsSuccess = true;
                }
                else
                {
                    var query = from t in ModelState
                                where t.Value.Errors.Count > 0
                                select t;
                    var ErrorMessage = string.Empty;
                    foreach (var valuePair in query)
                    {
                        foreach (var modelError in valuePair.Value.Errors)
                        {
                            if (!string.IsNullOrWhiteSpace(ErrorMessage))
                            {
                                ErrorMessage += "\n";
                            }
                            ErrorMessage += modelError.ErrorMessage;
                        }
                    }
                    result.IsSuccess = false;
                    result.Message = ErrorMessage;
                }
            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Message = e.Message;
            }
            return Json(result);
        }

        /// <summary>
        /// 设置SEO
        /// </summary>
        /// <param name="seoKeys"></param>
        /// <param name="id"></param>
        private void SetSeoKeys(string seoKeys, string id)
        {
            if (string.IsNullOrWhiteSpace(seoKeys))
            {
                seoKeys = string.Empty;
            }
            var list = seoKeys.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            FeSeoKey.SetObjektSeo(new List<string>(list), FeRelationshipNames.FeArticleSeoKey, id);
        }

        /// <summary>
        /// 设置文章标签
        /// </summary>
        /// <param name="tags"></param>
        /// <param name="id"></param>
        private void SetTags(string tags, string id)
        {
            if (string.IsNullOrWhiteSpace(tags))
            {
                tags = string.Empty;
            }
            var list = tags.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            FeTag.SetObjektTag(new List<string>(list), FeRelationshipNames.FeArticleTag, id);
        }

        /// <summary>
        ///     设置文章属性
        /// </summary>
        /// <param name="characters"></param>
        /// <param name="id"></param>
        private void SetCharacters(string characters, string id)
        {
            if (string.IsNullOrWhiteSpace(characters))
            {
                characters = string.Empty;
            }
            var list = characters.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            FeCharacter.SetObjektCharacter(new List<string>(list), FeRelationshipNames.FeArticleCharacter, id);
        }

        /// <summary>
        ///     获取文章列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public JsonResult GetFeArticlePageList(int pageNumber, int pageSize, string param)
        {
            var ViewModels = new List<FeArticleModel>();
            var klass = Klass.ForName(FeKlassNames.FeArticle);
            var paramlist = param.JsonToObject<List<QueryParamModel>>();
            //var where = paramlist.ToWhereClause(klass);

            var sbText = new StringBuilder("1=1");
            List<OdbcParam> whereParamList = new List<OdbcParam>();
            foreach (var item in paramlist)
            {
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("isTrash")) {
                    sbText.Append(" and \"isTrash\"='" + (item.value.ToString() == "true" ? 1 : 0) + "'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("isDraft"))
                {
                    sbText.Append(" and \"isDraft\"='" + (item.value.ToString() == "true" ? 1 : 0) + "'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("approvalStatus"))
                {
                    sbText.Append(" and \"approvalStatus\"='" + item.value + "'");
                }

                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("titleValue"))
                {
                    sbText.Append(" and \"title\" like '%" + item.value + "%'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("author"))
                {
                    sbText.Append(" and \"author\" = '" + item.value + "'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("creator"))
                {
                    sbText.Append(" and \"creator\" =  '" + item.value +
                                  "' ");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("approver"))
                {
                    sbText.Append(" and \"approver\" = '" + item.value + "'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("createdBeginDate"))
                {
                    sbText.Append(" and \"createdOn\" >=?"); //to_date('" + item.value + "','YYYY-MM-DD HH24:MI:SS')");
                    whereParamList.Add(new OdbcParam(DataType.DATETIME, item.value.ToString()));
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("createdEndDate"))
                {
                    sbText.Append(" and \"createdOn\" <=?");//to_date('" + item.value + "','YYYY-MM-DD HH24:MI:SS')");
                    whereParamList.Add(new OdbcParam(DataType.DATETIME, item.value.ToString()));
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("approvedBeginDate"))
                {
                    sbText.Append(" and \"approvedOn\" >=?");// to_date('" + item.value + "','YYYY-MM-DD HH24:MI:SS')");
                    whereParamList.Add(new OdbcParam(DataType.DATETIME, item.value.ToString()));
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("approvedEndDate"))
                {
                    sbText.Append(" and \"approvedOn\" <=?");// to_date('" + item.value + "','YYYY-MM-DD HH24:MI:SS')");
                    whereParamList.Add(new OdbcParam(DataType.DATETIME, item.value.ToString()));

                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("commentNum"))
                {
                    sbText.Append(" and \"commentNum\" = '" + item.value + "'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("category"))
                {
                    sbText.Append(" and \"category\" = '" + item.value + "'");
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("character"))
                {
                    sbText.Append(
                        " and \"id\" in (select \"source\" from \"FeArticleCharacter\" where \"related\" = '" +
                        item.value + "')");
                }
            }

            var where = new WhereClause(sbText.ToString());
            where.Parameters.AddRange(whereParamList);

            if (pageNumber <= 0)
            {
                pageNumber = 1;
            }
            var oc = new ObjektCollection<ObjectFramework.FeArticle>(klass, new Pagination(pageNumber, pageSize), where).ToView();
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.createdOn, Order.Desc));
            foreach (var obj in oc)
            {
                var model = new FeArticleModel();
                model.CopyEntity(obj);
                ViewModels.Add(model);
            }
            var data = $"{{ \"total\": \"{oc.Pagination.RowCount}\", \"rows\": {ViewModels.ObjectToJson()} }}";
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        ///     进入创建分类页。
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateFeArticle(string id, string tab = "1")
        {
            var model = new FeArticleModel();
            model.Tab = tab;
            if (!string.IsNullOrEmpty(id))
            {
                var fearticle = ObjektFactory.Find<ObjectFramework.FeArticle>(id);
                model.CopyEntity(fearticle);
            }
            else
            {
                model.SortOrder = ObjectFramework.FeArticle.NewSortOrder();
            }
            return View("FeArticleEdit", model);
        }

        /// <summary>
        ///     彻底删除文章
        /// </summary>
        /// <param name="ArticleList"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public string DelFeArticle(List<FeArticleModel> ArticleList)
        {
            var result = "true";

            try
            {
                foreach (var article in ArticleList)
                {
                    var feArticle = ObjektFactory.Find<ObjectFramework.FeArticle>(article.Id);
                    feArticle.Delete();
                    feArticle.Save();
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }

        /// <summary>
        ///     设置属性
        /// </summary>
        /// <param name="ArticleList"></param>
        /// <param name="Characters"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SetCharacter(List<FeArticleModel> ArticleList, string Characters)
        {
            var result = new JsonResultModel();
            result.IsSuccess = true;
            try
            {
                foreach (var article in ArticleList)
                {
                    SetCharacters(Characters, article.Id);
                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }

            return Json(result);
        }

        /// <summary>
        ///     文章审核
        /// </summary>
        /// <param name="ArticleList"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public string SetApprovalStatus(List<FeArticleModel> ArticleList, string Status)
        {
            var result = "true";
            try
            {
                foreach (var article in ArticleList)
                {
                    var feArticle = ObjektFactory.Find<ObjectFramework.FeArticle>(article.Id);
                    feArticle.Approver = Platform.ObjectFramework.User.Current;
                    feArticle.ApprovedOn = ObjektFactory.GetCurrentTime();
                    feArticle.ApprovalStatus = ObjektFactory.Find<Value>(Status);
                    feArticle.Save();
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }

        /// <summary>
        ///     放入回收站
        /// </summary>
        /// <param name="ArticleList"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public string SetTrash(List<FeArticleModel> ArticleList, bool IsTrash)
        {
            var result = "true";
            foreach (var article in ArticleList)
            {
                var feArticle = ObjektFactory.Find<ObjectFramework.FeArticle>(article.Id);
                if (IsTrash)
                {
                    feArticle.Trash(); //回收
                }
                else
                {
                    feArticle.Revert(); //恢复
                }
            }
            return result;
        }

        /// <summary>
        ///     设置是否显示
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isChecked"></param>
        /// <returns></returns>
        [HttpPost]
        public string SetDisplay(string id, bool isChecked)
        {
            var result = "true";

            try
            {
                //根据id查询数据。
                var entity = ObjektFactory.Find<ObjectFramework.FeArticle>(id);
                entity.IsDisplay = isChecked;
                entity.Save();
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }

        /// <summary>
        ///     设置标题
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="HtmlTitle"></param>
        /// <param name="textTitle"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SetTitle(string Id, string HtmlTitle, string textTitle)
        {
            var result = new JsonResultModel();
            result.IsSuccess = true;

            try
            {
                //根据id查询数据。
                var entity = ObjektFactory.Find<ObjectFramework.FeArticle>(Id);
                entity.Title = HtmlTitle;
                entity.TitleValue = textTitle;
                entity.Save();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }

            return Json(result);
        }

        /// <summary>
        ///     设置文章分类
        /// </summary>
        /// <param name="ArticleList"></param>
        /// <param name="CategoryId"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SetFeArticleCategory(List<FeArticleModel> ArticleList, string CategoryId)
        {
            var result = new JsonResultModel();
            result.IsSuccess = true;

            try
            {
                CategoryId = CategoryId.Replace("*", "@");
                foreach (var article in ArticleList)
                {
                    var feArticle = ObjektFactory.Find<ObjectFramework.FeArticle>(article.Id);
                    feArticle.Category = ObjektFactory.Find<FeArticleCategory>(CategoryId);
                    feArticle.Save();
                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }

            return Json(result);
        }

        /// <summary>
        ///     修改指定分类的排序.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sortOrder"></param>
        /// <returns></returns>
        [HttpPost]
        public string SetSortOrder(string id, string sortOrder)
        {
            var result = "true";

            try
            {
                //根据id查询数据。
                var entity = ObjektFactory.Find<ObjectFramework.FeArticle>(id);

                if (string.IsNullOrWhiteSpace(sortOrder))
                {
                    entity.SortOrder = null;
                    entity.Save();
                }
                else
                {
                    entity.SortOrder = Convert.ToDecimal(sortOrder);
                    entity.Save();
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }
        #endregion

        
        #region 前台方法
        /// <summary>
        ///     前端首页
        /// </summary>
        /// <returns></returns>
        public ActionResult FrontIndex()
        {
            var model = new FeArticleFrontIndexViewModel();
            model.Hot = FeCharacterIDs.Hot;
            model.Head = FeCharacterIDs.Head;
            model.Recommend = FeCharacterIDs.Recommend;
            int count;

            var config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleHomeLogo);
            model.LogoId = config.Value;

            config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleHomeColumnCount);

            if (!int.TryParse(config.Value, out count))
            {
                count = 0;
            }
            model.ColumnCount = count;

            config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleRightColumnCount);

            if (!int.TryParse(config.Value, out count))
            {
                count = 0;
            }
            model.RightColumnCount = count;

            config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeTagCount);

            if (!int.TryParse(config.Value, out count))
            {
                count = 0;
            }
            model.FeTagCount = count;

            var oc =
                new ObjektCollection<FeArticleCategory>(Klass.ForId(FeKlassIDs.FeArticleCategory),
                    new WhereClause("\"parent\" = '" + FeArticleCategoryIDs.TopCategory +
                                    "' and \"isDisplay\" = 1 and \"isTrash\" = 0"));

            foreach (var category in oc)
            {
                int pageCount;
                string titleName;
                if(FindByCategory(out pageCount, out titleName, category.Id, PropertyNames.modifiedOn).Count>0)
                {
                    model.Categories.Add(category.Id);
                }
            }

            var templatePath = 
                this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem,
                    "~/Index.cshtml");

            model.TemplateDirectoryPath = 
                this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem, "~/");

            //通过模板类型获取当前应用模板中根目录下的"Index.cshtml"资源的路径
            return View(templatePath, model);
        }

        /// <summary>
        ///     频道首页
        /// </summary>
        /// <param name="channelId"></param>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public ActionResult FrontChannelIndex(string channelId, string categoryId)
        {
            if (channelId == "首页" || channelId == "")
            {
                return RedirectToAction("FrontIndex");
            }

            var model = new FeArticleFrontChannelIndexViewModel();
            #region 加载配置
            int count;

            var config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeChannelColumnCount);// FeArticleHomeColumnCount

            if (!int.TryParse(config.Value, out count))
            {
                count = 0;
            }
            model.ColumnCount = count;

            config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleRightColumnCount);

            if (!int.TryParse(config.Value, out count))
            {
                count = 0;
            }
            model.RightColumnCount = count;

            //var oc =
            //    new ObjektCollection<FeArticleCategory>(Klass.ForId(FeKlassIDs.FeArticleCategory),
            //        new WhereClause("\"parent\" = '" + FeArticleCategoryIDs.TopCategory +
            //                        "' and \"isDisplay\" = 1 and \"isTrash\" = 0"));

            //foreach (var category in oc)
            //{
            //    model.Categories.Add(category.Id);
            //}
            #endregion

            var templatePath = "";

            model.ChannelId = channelId;
            var channel = ObjektFactory.Find<FeChannel>(channelId);
            if (channel.Logo != null && channel.Logo.IsExists())
            {
                model.LogoId = channel.Logo.Id;
            }
            if (categoryId != string.Empty && categoryId != null)
            {
                model.CategoryId = categoryId;
            }
            else
            {
                model.CategoryId = channel.Category.Id;
            }

            if (channel != null && channel.IsExists() && channel.IsDisplay && !channel.IsTrash)
            {
                if (channel.Template == null || !channel.Template.IsExists() || !channel.Template.IsEnable ||
                    channel.Template.IsTrash)
                {
                    templatePath =  this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel,
                        "~/Index.cshtml");
                    model.TemplateDirectoryPath = 
                        this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel, "~/");
                }
                else
                {
                    templatePath = this.TemplateResourcePathById(channel.Template.Id, "~/Index.cshtml");
                    model.TemplateDirectoryPath = this.TemplateResourcePathById(channel.Template.Id, "~/");
                }
            }

            return View(templatePath, model);
        }

        /// <summary>
        ///     文章详情
        /// </summary>
        /// <param name="articleId"></param>
        /// <returns></returns>
        public ActionResult FrontArticleDetails(string articleId)
        {
            var article = ObjektFactory.Find<ObjectFramework.FeArticle>(articleId);

            #region 点击数增加
            FeArticleHits feArticleHits = new FeArticleHits();
            feArticleHits.Article = article;
            feArticleHits.Save();
            PersistenceContext.Accept();

            PersistenceContext.BeginTransaction(new SessionContext(UserIDs.system));
            article.HitsNum = article.HitsNum.ToInt() + 1;
            article.Save();
            PersistenceContext.Accept();
            #endregion

            var model = new FrontArticleDetailViewModel();
            model.ArticleId = articleId;
            model.CategoryId = article.Category.Id;

            #region 系统配置
            model.Hot = FeCharacterIDs.Hot;
            model.Head = FeCharacterIDs.Head;
            model.Recommend = FeCharacterIDs.Recommend;

            var config = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleRightColumnCount);
            var count = 0;
            if (int.TryParse(config.Value, out count))
            {
                model.RightColumnCount = count;
            }
            #endregion

            #region 获取频道及模版
            FeChannel channel = new FeChannel(); ;
            FindChannelByByCategoryId(article.Category.Id, out channel);
            var templatePath = "";
            //如果没有绑定频道则使用首页模板
            if (channel == null || !channel.IsExists())
            {
                config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleHomeLogo);
                model.LogoId = config.Value;

                templatePath =  this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem,
                    "~/Details.cshtml");
                model.TemplateDirectoryPath = 
                    this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem, "~/");
            }
            else if (channel.Template == null || !channel.Template.IsExists() || !channel.Template.IsEnable ||
                     channel.Template.IsTrash)
            {
                model.ChannelId = channel.Id;
                if (channel.Logo != null && channel.Logo.IsExists())
                {
                    model.LogoId = channel.Logo.Id;
                }
                //如果频道未绑定模板，则使用默认的频道模板
                templatePath =  this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel,
                    "~/Details.cshtml");
                model.TemplateDirectoryPath = 
                    this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel, "~/");
            }
            else
            {
                model.ChannelId = channel.Id;
                if (channel.Logo != null && channel.Logo.IsExists())
                {
                    model.LogoId = channel.Logo.Id;
                }
                //如果频道绑定了模板，则使用频道模板
                templatePath = this.TemplateResourcePathById(channel.Template.Id, "~/Details.cshtml");
                model.TemplateDirectoryPath =   this.TemplateResourcePathById(channel.Template.Id, "~/");
            }

            #endregion

            return View(templatePath, model);
        }

        #region 根据呈现模式获取文章列表
        /// <summary>
        /// 根据呈现模式获取文章列表
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="modeValue"></param>
        /// <param name="channelId"></param>
        /// <param name="count"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetArticleList(string mode, string modeValue, string channelId, int count, int pageIndex)
        {

            var list = new List<ObjectFramework.FeArticle>();
            var titleName = "";
            var model = new FeArticleCategoryListModel();

            int pageCount;
            string categoryId = "";
            if (channelId != null && channelId != string.Empty)
            {
                var channel = ObjektFactory.Find<ObjectFramework.FeChannel>(channelId);
                categoryId = channel.Category.Id;
            }

            if (mode == "Category")
            {
                categoryId = modeValue;

                list = count > 0
                    ? FindByCategory(out pageCount, out titleName, categoryId, PropertyNames.modifiedOn, count: count,
                        pageIndex: pageIndex)
                    : FindByCategory(out pageCount, out titleName, categoryId, PropertyNames.modifiedOn);

                if (pageIndex >= pageCount)
                {
                    model.IsLastPage = true;
                }
            }
            else if (mode == "Character")
            {
                string characterId = modeValue;
                var character = ObjektFactory.Find<ObjectFramework.FeCharacter>(characterId);
                titleName = character.Name + "资讯";

                if (!string.IsNullOrWhiteSpace(characterId))
                {
                    if (count > 0)
                    {
                        //查询时增加分类
                        list = FindByCharacterId(out pageCount, categoryId, characterId, count, pageIndex);

                        if (pageIndex >= pageCount)
                        {
                            model.IsLastPage = true;
                        }
                    }
                    else
                    {
                        list = FindByCharacterId(out pageCount, categoryId, characterId);
                        model.IsLastPage = true;
                    }
                }
            }
            else if (mode == "Tag")
            {
                string tag = modeValue;
                list = FindByTag(out pageCount, categoryId, tag, count, pageIndex);

                if (pageIndex >= pageCount)
                {
                    model.IsLastPage = true;
                }

            }
            else if (mode == "Newest")
            {
                titleName = "最新资讯";
                list = FindNewest(out pageCount, categoryId, count, pageIndex);

                if (pageIndex >= pageCount)
                {
                    model.IsLastPage = true;
                }
            }
            else if (mode == "Search")
            {
                string searchText = modeValue;
                list = count > 0
                     ? FindByCategory(out pageCount, out titleName, categoryId, PropertyNames.modifiedOn, count: count,
                         pageIndex: pageIndex)
                     : FindByCategory(out pageCount, out titleName, categoryId, PropertyNames.modifiedOn);

                if (pageIndex >= pageCount)
                {
                    model.IsLastPage = true;
                }
            }

            model.TitleName = titleName;

            foreach (var feArticle in list)
            {
                model.Items.Add(new FeArticleCategoryListItemModel(feArticle));
            }

            return Json(model);
        }

        private List<ObjectFramework.FeArticle> FindNewest(out int pageCount, string categoryId, int? count = null,
            int pageIndex = 1)
        {
            var whereClause = new WhereClause("\"isDisplay\" = 1 and \"isTrash\" = 0");
            #region 分类查询
            if (!string.IsNullOrWhiteSpace(categoryId))
            {
                var category = ObjektFactory.Find<FeArticleCategory>(categoryId);

                if (category != null && category.IsExists() && category.IsDisplay && !category.IsTrash)
                {
                    //获取子孙分类
                    var descendants = category.GetDescendants();
                    var categories = new List<FeArticleCategory> { category };
                    categories.AddRange(descendants.Where(t => t.IsDisplay && !t.IsTrash));
                    StringBuilder whereBuilder = new StringBuilder();
                    //查询条件
                    foreach (var feArticleCategory in categories)
                    {
                        if (whereBuilder.Length > 0)
                        {
                            whereBuilder.Append(",");
                        }

                        whereBuilder.Append("'" + feArticleCategory.Id + "'");
                    }

                    whereBuilder.Insert(0, "\"isDisplay\" = 1 and \"isTrash\" = 0 and \"category\" in (");

                    //isdisplay和isTrash查询条件
                    whereBuilder.Append(") ");
                    whereClause = new WhereClause(whereBuilder.ToString());
                }
            }
            #endregion

            ObjektCollection<ObjectFramework.FeArticle> oc;

            if (count != null)
            {
                var pagination = new Pagination(pageIndex, count.Value);

                oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle), pagination,
                    whereClause);
            }
            else
            {
                oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle), whereClause);
            }

            oc.OrderByClause.Add(new OrderByCell(PropertyNames.createdOn, Order.Desc));

            var result = oc.ToList();
            pageCount = oc.Pagination.PageCount;

            return result;

        }

        /// <summary>
        ///     根据articleId获取文章内容
        /// </summary>
        /// <param name="articleId">Id</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetArticleDetail(string articleId)
        {
            var article = ObjektFactory.Find<ObjectFramework.FeArticle>(articleId);

            var model = new FeArticleModel();
            model.CopyEntity(article);

            //model.Character = GetCharacters(articleId);
            model.Hot = FeCharacterIDs.Hot;
            model.Head = FeCharacterIDs.Head;
            model.Recommend = FeCharacterIDs.Recommend;

            return Json(model);
        }

        /// <summary>
        /// 通过标签查找文章
        /// </summary>
        /// <param name="pageCount"></param>
        /// <param name="categoryId"></param>
        /// <param name="tag"></param>
        /// <param name="count"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        private List<ObjectFramework.FeArticle> FindByTag(out int pageCount, string categoryId, string tag, int? count = null,
            int pageIndex = 1)
        {

            var sql =
                "select \"id\" from \"FeArticle\" where \"isTrash\" < 1 and \"isDisplay\" > 0 and \"id\" in (select \"source\" from \"FeArticleTag\" where \"isTrash\" < 1 and \"related\" in (select \"id\" from \"FeTag\" where \"tag\" = '" +
                tag + "' and \"isTrash\" < 1)) ORDER BY \"modifiedOn\"";
            #region 分类查询
            if (!string.IsNullOrWhiteSpace(categoryId))
            {
                var category = ObjektFactory.Find<FeArticleCategory>(categoryId);

                if (category != null && category.IsExists() && category.IsDisplay && !category.IsTrash)
                {
                    //获取子孙分类
                    var descendants = category.GetDescendants();
                    var categories = new List<FeArticleCategory> { category };
                    categories.AddRange(descendants.Where(t => t.IsDisplay && !t.IsTrash));
                    StringBuilder whereBuilder = new StringBuilder();
                    //查询条件
                    foreach (var feArticleCategory in categories)
                    {
                        if (whereBuilder.Length > 0)
                        {
                            whereBuilder.Append(",");
                        }

                        whereBuilder.Append("'" + feArticleCategory.Id + "'");
                    }

                    whereBuilder.Insert(0, "select \"id\" from \"FeArticle\" where \"isTrash\" < 1 and \"isDisplay\" > 0 and \"id\" in (select \"source\" from \"FeArticleTag\" where \"isTrash\" < 1 and \"related\" in (select \"id\" from \"FeTag\" where \"tag\" = '" +
                tag + "' and \"isTrash\" < 1)) and \"category\" in (");

                    //isdisplay和isTrash查询条件
                    whereBuilder.Append(")  ORDER BY \"modifiedOn\"");
                    sql = whereBuilder.ToString();
                }
            }
            #endregion

            Querable<ObjectFramework.FeArticle> query;

            if (count != null)
            {
                var pagination = new Pagination(pageIndex, count.Value);
                query = new Querable<ObjectFramework.FeArticle>(new OdbcQuery(sql), pagination);
            }
            else
            {
                query = new Querable<ObjectFramework.FeArticle>(new OdbcQuery(sql));
            }

            var result = query.ToList();
            pageCount = query.Pagination.PageCount;

            return result;

        }

        /// <summary>
        /// 通过文章属性查找文章
        /// </summary>
        /// <param name="pageCount"></param>
        /// <param name="categoryId"></param>
        /// <param name="characterId"></param>
        /// <param name="count"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        private List<ObjectFramework.FeArticle> FindByCharacterId(out int pageCount, string categoryId, string characterId,
            int? count = null,
            int pageIndex = 1)
        {
            var whereClause =
            new WhereClause(
                "\"isDisplay\" > 0 and \"id\" in (select \"source\" from \"FeArticleCharacter\" where \"related\" = '" +
                characterId +
                "')");
            #region 分类查询
            if (!string.IsNullOrWhiteSpace(categoryId))
            {
                var category = ObjektFactory.Find<FeArticleCategory>(categoryId);

                if (category != null && category.IsExists() && category.IsDisplay && !category.IsTrash)
                {
                    //获取子孙分类
                    var descendants = category.GetDescendants();
                    var categories = new List<FeArticleCategory> { category };
                    categories.AddRange(descendants.Where(t => t.IsDisplay && !t.IsTrash));
                    StringBuilder whereBuilder = new StringBuilder();
                    //查询条件
                    foreach (var feArticleCategory in categories)
                    {
                        if (whereBuilder.Length > 0)
                        {
                            whereBuilder.Append(",");
                        }

                        whereBuilder.Append("'" + feArticleCategory.Id + "'");
                    }

                    whereBuilder.Insert(0, " \"id\" in (select \"source\" from \"FeArticleCharacter\" where \"related\" = '" +
                        characterId +
                        "') and \"category\" in (");

                    //isdisplay和isTrash查询条件
                    whereBuilder.Append(") and \"isDisplay\" > 0 and \"isTrash\" < 1");
                    whereClause = new WhereClause(whereBuilder.ToString());
                }
            }
            #endregion

            ObjektCollection<ObjectFramework.FeArticle> oc;

            if (count != null)
            {
                var pagination = new Pagination(pageIndex, count.Value);

                oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle), pagination,
                    whereClause);
            }
            else
            {
                oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle), whereClause);
            }

            oc.OrderByClause.Add(new OrderByCell(PropertyNames.modifiedOn, Order.Desc));

            var result = oc.ToList();
            pageCount = oc.Pagination.PageCount;

            return result;
        }

        /// <summary>
        /// 通过文章分类查找文章
        /// </summary>
        /// <param name="pageCount"></param>
        /// <param name="categoryName"></param>
        /// <param name="categoryId"></param>
        /// <param name="propertyName"></param>
        /// <param name="order"></param>
        /// <param name="count"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        private List<ObjectFramework.FeArticle> FindByCategory(out int pageCount, out string categoryName,
            string categoryId = null,
            string propertyName = null,
            Order order = Order.Desc, int? count = null, int pageIndex = 1)
        {
            var result = new List<ObjectFramework.FeArticle>();
            var whereBuilder = new StringBuilder();
            categoryName = "";
            var id = categoryId;
            pageCount = 0;

            if (string.IsNullOrWhiteSpace(id))
            {
                id = FeArticleCategoryIDs.TopCategory;
            }

            //1.根据id获取分类对象。
            var category = ObjektFactory.Find<FeArticleCategory>(id);

            if (category != null && category.IsExists() && category.IsDisplay && !category.IsTrash)
            {
                categoryName = category.Name;

                //2.获取子孙分类
                var descendants = category.GetDescendants();
                var categories = new List<FeArticleCategory> { category };
                categories.AddRange(descendants.Where(t => t.IsDisplay && !t.IsTrash));

                //3.in查询条件
                foreach (var feArticleCategory in categories)
                {
                    if (whereBuilder.Length > 0)
                    {
                        whereBuilder.Append(",");
                    }

                    whereBuilder.Append("'" + feArticleCategory.Id + "'");
                }

                whereBuilder.Insert(0, "\"category\" in (");

                //4.isdisplay和isTrash查询条件
                whereBuilder.Append(") and \"isDisplay\" > 0 and \"isTrash\" < 1");

                ObjektCollection<ObjectFramework.FeArticle> oc;

                //5.指定返回记录数量
                if (count != null)
                {
                    var pagination = new Pagination(pageIndex, count.Value);

                    oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle), pagination,
                        new WhereClause(whereBuilder.ToString()));
                }
                else
                {
                    oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle),
                        new WhereClause(whereBuilder.ToString()));
                }

                //6.排序
                if (!string.IsNullOrWhiteSpace(propertyName))
                {
                    oc.OrderByClause.Add(new OrderByCell(propertyName, order));
                }

                result.AddRange(oc.ToList());

                pageCount = oc.Pagination.PageCount;
            }

            return result;
        }
        #endregion

        /// <summary>
        /// 搜索
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="modeValue"></param>
        /// <param name="channelId"></param>
        /// <returns></returns>
        public ActionResult FrontArticleSearch(string mode, string modeValue, string channelId)
        {

            var model = new FrontArticleSearchViewModel();

            model.Mode = mode;
            model.ModeValue = modeValue;

            #region 默认值设置
            model.Hot = FeCharacterIDs.Hot;
            model.Head = FeCharacterIDs.Head;
            model.Recommend = FeCharacterIDs.Recommend;

            var count = 0;
            model.ColumnCount = 0;

            //设置右侧最新资讯显示数，FeArticleRightColumnCount
            var config = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleRightColumnCount);

            if (int.TryParse(config.Value, out count))
            {
                model.RightColumnCount = count;
            }

            if (channelId != null && channelId != string.Empty)
            {
                config = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeChannelColumnCount);
            }
            else
            {
                config = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleColumnCount);
            }
            if (int.TryParse(config.Value, out count))
            {
                model.ColumnCount = count;
            }

            #endregion

            #region 获取频道及模版
            FeChannel channel = new FeChannel(); ;
            if (channelId != null && channelId != string.Empty)
            {
                channel = ObjektFactory.Find<FeChannel>(channelId);
            }
            else
            {
                if (mode == "Category")
                {
                    model.CategoryId = modeValue;
                    FindChannelByByCategoryId(modeValue, out channel);
                }
            }
            var templatePath = "";
            //如果没有绑定频道则使用首页模板
            if (channel == null || !channel.IsExists())
            {
                config =ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleHomeLogo);
                model.LogoId = config.Value;

                templatePath =  this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem,
                    "~/List.cshtml");
                model.TemplateDirectoryPath = 
                    this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem, "~/");
            }
            else if (channel.Template == null || !channel.Template.IsExists() || !channel.Template.IsEnable ||
                     channel.Template.IsTrash)
            {
                model.ChannelId = channel.Id;
                if (channel.Logo != null && channel.Logo.IsExists())
                {
                    model.LogoId = channel.Logo.Id;
                }
                //如果频道未绑定模板，则使用默认的频道模板
                templatePath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel,
                    "~/List.cshtml");
                model.TemplateDirectoryPath = 
                    this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel, "~/");
            }
            else
            {
                model.ChannelId = channel.Id;
                if (channel.Logo != null && channel.Logo.IsExists())
                {
                    model.LogoId = channel.Logo.Id;
                }
                //如果频道绑定了模板，则使用频道模板
                templatePath =  this.TemplateResourcePathById(channel.Template.Id, "~/List.cshtml");
                model.TemplateDirectoryPath =  this.TemplateResourcePathById(channel.Template.Id, "~/");
            }

            #endregion

            return View(templatePath, model);
        }

        /// <summary>
        /// 通过文章分类找文章频道
        /// </summary>
        /// <param name="categoryId"></param>
        /// <param name="channel"></param>
        private void FindChannelByByCategoryId(string categoryId, out FeChannel channel)
        {
            var category = ObjektFactory.Find<FeArticleCategory>(categoryId);
            channel = null;

            if (category != null && category.IsExists())
            {
                //分类文章列表查询指定分类级所有上级分类，是否有绑定频道。
                var categoryIds = new List<string>();

                do
                {
                    categoryIds.Add(category.Id);
                    category = category.Parent;
                } while (category != null && category.IsExists());

                var where = "";

                foreach (var id in categoryIds)
                {
                    if (!string.IsNullOrWhiteSpace(where))
                    {
                        where += ",";
                    }

                    where += "'" + id + "'";
                }

                where = "\"" + FePropertyNames.category + "\" in (" + where + ")";
                var oc = new ObjektCollection<FeChannel>(Klass.ForId(FeKlassIDs.FeChannel),
                    new Pagination(1, 1), new WhereClause(where));
                channel = oc.TryGetSingleResult();
            }
        }

        /// <summary>
        /// 通过文章分类找模板路径
        /// </summary>
        /// <param name="categoryId"></param>
        /// <param name="templatePath"></param>
        /// <param name="templateDirectoryPath"></param>
        /// <param name="channel"></param>
        /// <param name="fileRelativePath"></param>
        private void FindTemplatePathByCategoryId(string categoryId, out string templatePath,
            out string templateDirectoryPath, out FeChannel channel, string fileRelativePath)
        {
            var category = ObjektFactory.Find<FeArticleCategory>(categoryId);
            templatePath = "";
            templateDirectoryPath = "";
            channel = null;

            if (category != null && category.IsExists())
            {
                //分类文章列表查询指定分类级所有上级分类，是否有绑定频道。
                var categoryIds = new List<string>();

                do
                {
                    categoryIds.Add(category.Id);
                    category = category.Parent;
                } while (category != null && category.IsExists());

                var where = "";

                foreach (var id in categoryIds)
                {
                    if (!string.IsNullOrWhiteSpace(where))
                    {
                        where += ",";
                    }

                    where += "'" + id + "'";
                }

                where = "\"" + FePropertyNames.category + "\" in (" + where + ")";
                var oc = new ObjektCollection<FeChannel>(Klass.ForId(FeKlassIDs.FeChannel),
                    new Pagination(1, 1), new WhereClause(where));
                channel = oc.TryGetSingleResult();

                //如果没有绑定频道则使用首页模板
                if (channel == null || !channel.IsExists())
                {
                    templatePath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem,
                        fileRelativePath);
                    templateDirectoryPath =
                        this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_ArticleSystem, "~/");
                }
                else if (channel.Template == null || !channel.Template.IsExists() || !channel.Template.IsEnable ||
                         channel.Template.IsTrash)
                {
                    //如果频道未绑定模板，则使用默认的频道模板
                    templatePath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel,
                        fileRelativePath);
                    templateDirectoryPath =
                        this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel, "~/");
                }
                else
                {
                    //如果频道绑定了模板，则使用频道模板
                    templatePath = this.TemplateResourcePathById(channel.Template.Id, fileRelativePath);
                    templateDirectoryPath = this.TemplateResourcePathById(channel.Template.Id, "~/");
                }
            }
        }

        /// <summary>
        /// 通过频道找模板路径
        /// </summary>
        /// <param name="channelId"></param>
        /// <param name="templatePath"></param>
        /// <param name="templateDirectoryPath"></param>
        /// <param name="channel"></param>
        /// <param name="fileRelativePath"></param>
        private void FindTemplatePathByChannelId(string channelId, out string templatePath,
            out string templateDirectoryPath, out FeChannel channel, string fileRelativePath)
        {
            channel = ObjektFactory.Find<FeChannel>(channelId);
            templatePath = "";
            templateDirectoryPath = "";
            //如果没有绑定频道则使用首页模板
            if (channel == null || !channel.IsExists())
            {

            }
            else if (channel.Template == null || !channel.Template.IsExists() || !channel.Template.IsEnable ||
                     channel.Template.IsTrash)
            {
                //如果频道未绑定模板，则使用默认的频道模板
                templatePath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel,
                    fileRelativePath);
                templateDirectoryPath =
                    this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Channel, "~/");
            }
            else
            {
                //如果频道绑定了模板，则使用频道模板
                templatePath = this.TemplateResourcePathById(channel.Template.Id, fileRelativePath);
                templateDirectoryPath = this.TemplateResourcePathById(channel.Template.Id, "~/");
            }

        }

        /// <summary>
        ///按分类和时间点击排行
        /// </summary>
        /// <param name="categoryId">分类ID</param>
        /// <param name="count">要查询的记录数</param>
        /// <param name="queryType">查询类型0 yesterday,1 today,2 week</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetArticleHitsRankList(string categoryId, int count, string queryType)
        {
            var list = new List<ObjectFramework.FeArticle>();
            var model = new FeArticleCategoryListModel();

            var listArticle = FindArticleByCategory(categoryId, count, queryType);

            foreach (var feArticle in listArticle)
            {
                model.Items.Add(new FeArticleCategoryListItemModel(feArticle));
            }

            return Json(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="categoryId">分类ID</param>
        /// <param name="count">要查询的记录数</param>
        /// <param name="type">查询类型0 yesterday,1 today,2 week</param>
        /// <returns></returns>
        private List<ObjectFramework.FeArticle> FindArticleByCategory(string categoryId, int count, string type)
        {
            var result = new List<ObjectFramework.FeArticle>();
            var whereBuilder = new StringBuilder();
            string startTime, endTime;

            string categoryid = categoryId;
            //分类ID不存在
            if (string.IsNullOrWhiteSpace(categoryid))
            {
                categoryid = FeArticleCategoryIDs.TopCategory;
            }
            //1.根据id获取分类对象。
            var category = ObjektFactory.Find<FeArticleCategory>(categoryid);

            if (category != null && category.IsExists() && category.IsDisplay && !category.IsTrash)
            {
                switch (type)
                {
                    case "0":
                        startTime = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00";
                        endTime = DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00";
                        break;
                    case "1":
                        startTime = DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00";
                        endTime = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd") + " 00:00:00";
                        break;
                    case "2":
                        startTime = DateTime.Now.AddDays(-(int)DateTime.Now.DayOfWeek).ToString("yyyy-MM-dd") + " 00:00:00";
                        endTime = DateTime.Now.AddDays(7 - (int)DateTime.Now.DayOfWeek).ToString("yyyy-MM-dd") + " 00:00:00";
                        break;
                    default:
                        startTime = DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00";
                        endTime = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd") + " 00:00:00";
                        break;
                }
                //2.获取子孙分类
                var descendants = category.GetDescendants();
                var categories = new List<FeArticleCategory> { category };
                categories.AddRange(descendants.Where(t => t.IsDisplay && !t.IsTrash));

                //3.category in查询条件
                foreach (var feArticleCategory in categories)
                {
                    if (whereBuilder.Length > 0)
                    {
                        whereBuilder.Append(",");
                    }

                    whereBuilder.Append("'" + feArticleCategory.Id + "'");
                }
                //whereBuilder.Insert(0, "select* from ( SELECT ARTICLES.*, (select count(1) from \"FeArticleHits\" where \"article\" = ARTICLES.\"id\" and  to_date('" + startTime + "', 'yyyy-mm-dd hh24:mi:ss') < \"createdOn\" and \"createdOn\" < to_date('" + endTime + "', 'yyyy-mm-dd hh24:mi:ss')) hitnum from \"FeArticle\" ARTICLES,\"FeArticleCategory\" CATEGORYS where CATEGORYS.\"id\" in(");
                //whereBuilder.Insert(0, "select* from ( SELECT ARTICLES.*, (select count(1) from \"FeArticleHits\" where \"article\" = ARTICLES.\"id\" and  to_date('" + startTime + "', 'yyyy-mm-dd hh24:mi:ss') < \"createdOn\" and \"createdOn\" < to_date('" + endTime + "', 'yyyy-mm-dd hh24:mi:ss')) hitnum from \"FeArticle\" ARTICLES,\"FeArticleCategory\" CATEGORYS where CATEGORYS.\"id\" in(");

                //4.isdisplay和isTrash查询条件
                //whereBuilder.Append(") and CATEGORYS.\"isDisplay\" > 0 and CATEGORYS.\"isTrash\" < 1 AND CATEGORYS.\"id\" = ARTICLES.\"category\") article order by article.hitnum desc,article.\"createdOn\" desc");
//                string sql = "\"article\" in( " +
//"select \"FeArticleHits\".\"article\" from \"FeArticle\", \"FeArticleHits\", \"FeArticleCategory\" " +
//"where \"FeArticle\".\"id\"=\"FeArticleHits\".\"article\" and { fn IFNULL(\"FeArticle\".\"isDisplay\",0)}=1 and { fn IFNULL(\"FeArticle\".\"isTrash\",0)}=0 " +
//                    "and \"FeArticle\".\"category\"=\"FeArticleCategory\".\"id\"  and { fn IFNULL(\"FeArticleCategory\".\"isDisplay\",0)}=1 and { fn IFNULL(\"FeArticleCategory\".\"isTrash\",0)}=0 " +
//"and \"FeArticle\".\"category\" in(" + whereBuilder.ToString() + ") and \"FeArticleHits\".\"createdOn\" >= ? and \"FeArticleHits\".\"createdOn\" < ? " +
//"group by \"FeArticleHits\".\"article\" order by count(\"FeArticleHits\".\"article\") desc)";
                string sql = "SELECT \"article\" \"id\" from \"FeArticleHits\" where \"createdOn\" >= ? AND \"createdOn\" < ?  AND \"article\" in(" +
"SELECT \"id\" from \"FeArticle\" where { fn IFNULL(\"isDisplay\",0)} = 1 and { fn IFNULL(\"isTrash\",0)} = 0 and \"category\" in(" +
"SELECT \"id\" from \"FeArticleCategory\" where { fn IFNULL(\"isDisplay\",0)} = 1 and { fn IFNULL(\"isTrash\",0)} = 0 and \"id\" in(" + whereBuilder.ToString() +
"))) GROUP BY \"article\" ORDER BY COUNT(\"article\") DESC";

                var oq = new OdbcQuery(sql)
                    .AddParameter(new OdbcParam(DataType.DATETIME, startTime))
                    .AddParameter(new OdbcParam(DataType.DATETIME, endTime));
                var q = new Querable<ObjectFramework.FeArticle>(oq);
                result.AddRange(q.ToList());

                //5.返回排行记录
                //ObjektCollection<ObjectFramework.FeArticle> oc = new ObjektCollection<ObjectFramework.FeArticle>(Klass.ForId(FeKlassIDs.FeArticle),
                //    new Pagination(1, count),
                //    new WhereClause(sql)
                //    .AddParameter(new OdbcParam(DataType.DATETIME, startTime))
                //    .AddParameter(new OdbcParam(DataType.DATETIME, endTime))
                //    );
                //result = oc.ToList();



                //Querable<ObjectFramework.FeArticle> query = new Querable<ObjectFramework.FeArticle>(new OdbcQuery(whereBuilder.ToString()));
                //result.AddRange(query.Take(count).ToList());
                //var x = new ObjektCollection<FeArticleHits>(Klass.ForId(FeKlassIDs.FeArticleHits), new Pagination(1,count),new WhereClause("id in (select "article" from(    select count("FeArticleHits"."id") as x, "FeArticleHits"."article" from "FeArticleHits", "FeArticle" where "FeArticle"."id" = "FeArticleHits"."article" and    "FeArticle"."category" in ('108a5aef412f432598915d5e93723fd7@FeArticleCategory')    group by "FeArticleHits"."article" order by x desc    );)")
            }

            return result;
        }

        /// <summary>
        /// 根据文章ID获取文章属性
        /// </summary>
        /// <param name="articleId">文章ID</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetCharacters(string articleId)
        {
            #region MyRegion
            //string sql = "select \"related\" as \"id\" from (select \"related\",count(\"related\") as \"count\" from \"FeArticleTag\" GROUP BY \"related\" order by \"count\" desc )";
            //Querable<FeTag> query;            
            //    query = new Querable<FeTag>(new OdbcQuery(sql));

            //List<dynamic> model = new List<dynamic>();

            //foreach (var feTag in query)
            //{
            //    model.Add(new
            //    {
            //        Id = feTag.Id,
            //        Name = feTag.Tag
            //    });
            //} 
            //return Json(model);
            #endregion

            var list = new List<FeCharacterViewModel>();
            if (articleId != null && articleId != string.Empty)
            {
                var objekt = ObjektFactory.Find(articleId);
                //找到article对象与character关联roc集合。
                var relationshipList = objekt.ROCC.GetROC(FeRelationshipNames.FeArticleCharacter);
                foreach (var item in relationshipList)
                {
                    var character = new Models.FeCharacterViewModel();
                    var feCharacter = (ObjectFramework.FeCharacter)item.Related;
                    if (feCharacter != null)
                    {
                        character.Id = feCharacter.Id;
                        character.Name = feCharacter.Name;
                        character.SortOrder = feCharacter.SortOrder;
                        character.Icon = feCharacter.Icon;
                        character.IsDisplay = feCharacter.IsDisplay ? "on" : "off";
                        character.BigIcon = feCharacter.BigIcon == null ? null : feCharacter.BigIcon.Id;
                        character.SmallIcon = feCharacter.SmallIcon == null ? null : feCharacter.SmallIcon.Id;
                        list.Add(character);
                    }
                }
            }
            return Json(list.OrderBy(t=>t.SortOrder));
        }

        /// <summary>
        /// 面包屑导航
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="modevalue"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetNavigateString(string mode, string modevalue)
        {
            if (mode == "Article")
            {
                mode = "Category";
                var article = ObjektFactory.Find<ObjectFramework.FeArticle>(modevalue);
                modevalue = article.Category.Id;
            }

            var model = new FrontArticleSearchViewModel();

            if (mode == "Tag")
            {
                //添加导航
                model.Navigate.Add(new NavigateItem
                {
                    text = "搜索结果"
                });

                model.Navigate.Add(new NavigateItem
                {
                    text = "标签：" + modevalue
                });
            }
            else if (mode == "Search")
            {
                //添加导航
                model.Navigate.Add(new NavigateItem
                {
                    text = "搜索结果"
                });

                model.Navigate.Add(new NavigateItem
                {
                    text = "关键词：" + modevalue
                });
            }
            else if (mode == "Category")
            {
                string channelId = "";
                var category = ObjektFactory.Find<FeArticleCategory>(modevalue);

                if (category != null)
                {
                    do
                    {
                        model.Navigate.Insert(0, new NavigateItem
                        {
                            text = category.Name,
                            url = "~/FeArticle/FrontArticleSearch?mode=Category&modeValue=" + Url.Encode(category.Id)
                        });
                        var channelOc = new ObjektCollection<FeChannel>(Klass.ForId(FeKlassIDs.FeChannel), new WhereClause("\"" + FePropertyNames.category + "\" = '" + category.Id + "'"));
                        if (channelOc != null && channelOc.Count > 0)
                        {
                            channelId = channelOc[0].Id;
                            break;
                        }
                        category = category.Parent;
                    } while (category != null && category.IsExists());
                }

                model.Navigate.Insert(0, new NavigateItem
                {
                    text = "首页",
                    url = "~/FeArticle/FrontChannelIndex?channelId=" + channelId
                });
            }
            else if (mode == "Character")
            {
                string characterId = modevalue;

                //添加导航
                model.Navigate.Add(new NavigateItem
                {
                    text = "搜索结果"
                });

                var character = ObjektFactory.Find<ObjectFramework.FeCharacter>(characterId);

                model.Navigate.Add(new NavigateItem
                {
                    text = character.Name + "资讯"
                });


            }
            return Json(model);
        }
        #endregion

    }
}