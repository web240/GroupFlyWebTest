using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Controllers.Shared;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    /// <summary>
    ///     文章分类控制器。
    /// </summary>
    //[LoginRequired]
    public class FeArticleCategoryController : BaseController
    {
        /// <summary>
        ///     默认页。
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        ///     初始化文章分类数据。
        /// </summary>
        /// <returns></returns>
        public ActionResult Init()
        {
            //FeArticleCategory.DeleteAll();

            //var topCategory = new FeArticleCategory();
            //topCategory.Name = "顶级分类";
            //topCategory.IsDisplay = true;
            //topCategory.Save();

            //var newsCategory = new FeArticleCategory();
            //newsCategory.Name = "新闻";
            //newsCategory.IsDisplay = true;
            //newsCategory.SortOrder = 1;
            //newsCategory.Parent = topCategory;
            //newsCategory.Save();

            //var militaryCategory = new FeArticleCategory();
            //militaryCategory.Name = "军事";
            //militaryCategory.IsDisplay = true;
            //militaryCategory.SortOrder = 2;
            //militaryCategory.Parent = topCategory;
            //militaryCategory.Save();

            //var financeCategory = new FeArticleCategory();
            //financeCategory.Name = "财经";
            //financeCategory.SortOrder = 1;
            //financeCategory.IsDisplay = true;
            //financeCategory.Parent = topCategory;
            //financeCategory.Save();

            //FeArticleCategory category;
            //category = new FeArticleCategory();
            //category.Name = "国际";
            //category.IsDisplay = true;
            //category.Parent = newsCategory;
            //category.SortOrder = 1;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "社会";
            //category.IsDisplay = true;
            //category.Parent = newsCategory;
            //category.SortOrder = 2;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "历史";
            //category.IsDisplay = true;
            //category.Parent = newsCategory;
            //category.SortOrder = 3;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "文化";
            //category.IsDisplay = true;
            //category.Parent = newsCategory;
            //category.SortOrder = 4;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "中国军情";
            //category.IsDisplay = true;
            //category.Parent = militaryCategory;
            //category.SortOrder = 1;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "环球军情";
            //category.IsDisplay = true;
            //category.Parent = militaryCategory;
            //category.SortOrder = 2;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "军备动态";
            //category.IsDisplay = true;
            //category.Parent = militaryCategory;
            //category.SortOrder = 3;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "金融";
            //category.IsDisplay = true;
            //category.Parent = financeCategory;
            //category.SortOrder = 1;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "证券";
            //category.IsDisplay = true;
            //category.Parent = financeCategory;
            //category.SortOrder = 2;
            //category.Save();

            //category = new FeArticleCategory();
            //category.Name = "港股";
            //category.IsDisplay = true;
            //category.Parent = financeCategory;
            //category.SortOrder = 3;
            //category.Save();


            return RedirectToAction("Index");
        }

        /// <summary>
        ///     进入创建分类页。
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateArticleCategory()
        {
            var model = new FeArticleCategoryViewModel
            {
                OperationType = 1,
                SeoKeyRemark = "(','号分开)",
                SortOrder = FeArticleCategory.NewSortOrder(),
                IsError = false
            };
            return View("ArticleCategoryDetails", model);
        }

        /// <summary>
        ///     编辑分类。
        /// </summary>
        /// <param name="recordId"></param>
        /// <returns></returns>
        public ActionResult EditArticleCategory(string recordId)
        {
            var id = recordId.Replace("*", "@");
            var entity = ObjektFactory.Find<FeArticleCategory>(id);

            var model = new FeArticleCategoryViewModel
            {
                Id = entity.Id,
                Name = entity.Name,
                ParentId = entity.Parent.Id,
                ParentNamePath = entity.ParentNamePath,
                SortOrder = entity.SortOrder,
                SeoTitle = entity.SeoTitle,
                SeoDescription = entity.SeoDescription,
                OperationType = 2,
                SeoKeyRemark = "(','号分开)",
                IsError = false,
                SeoKeys = entity.SeoKeys
            };
            return View("ArticleCategoryDetails", model);
        }

        /// <summary>
        ///     添加分类。
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Add(FeArticleCategoryViewModel model)
        {
            if (ModelState.IsValid)
            {
                var recordId = model.ParentId.Replace("*", "@");

                var category = new FeArticleCategory();
                category.Name = model.Name;
                category.Parent = ObjektFactory.Find<FeArticleCategory>(recordId);
                category.SortOrder = model.SortOrder;
                category.IsDisplay = true;
                category.SeoTitle = model.SeoTitle;
                category.SeoDescription = model.SeoDescription;
                category.Save();

                //处理seo关键字。
                SetSeoKeys(model.SeoKeys, category.Id);

                return Json(new JsonResultModel());
            }
            model.IsError = true;
            var query = from t in ModelState
                where t.Value.Errors.Count > 0
                select t;

            foreach (var valuePair in query)
            {
                foreach (var modelError in valuePair.Value.Errors)
                {
                    if (!string.IsNullOrWhiteSpace(model.ErrorMessage))
                    {
                        model.ErrorMessage += "\\r\\n";
                    }

                    model.ErrorMessage += modelError.ErrorMessage;
                }
            }

            return View("ArticleCategoryDetails", model);
        }

        private void SetSeoKeys(string seoKeys, string id)
        {
            if (string.IsNullOrWhiteSpace(seoKeys))
            {
                seoKeys = "";
            }

            var list = seoKeys.Split(new[] {","}, StringSplitOptions.RemoveEmptyEntries);
            FeSeoKey.SetObjektSeo(new List<string>(list), FeRelationshipNames.FeArticleCategorySeoKey, id);
        }

        /// <summary>
        ///     修改分类。
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Edit(FeArticleCategoryViewModel model)
        {
            if (ModelState.IsValid)
            {
                var recordId = model.ParentId.Replace("*", "@");

                var category = ObjektFactory.Find<FeArticleCategory>(model.Id);
                category.Name = model.Name;
                category.Parent = ObjektFactory.Find<FeArticleCategory>(recordId);
                category.SortOrder = model.SortOrder;
                category.SeoTitle = model.SeoTitle;
                category.SeoDescription = model.SeoDescription;
                category.Save();

                //处理seo关键字。
                SetSeoKeys(model.SeoKeys, category.Id);

                return Json(new JsonResultModel());
            }
            model.IsError = true;
            var query = from t in ModelState
                where t.Value.Errors.Count > 0
                select t;

            foreach (var valuePair in query)
            {
                foreach (var modelError in valuePair.Value.Errors)
                {
                    if (!string.IsNullOrWhiteSpace(model.ErrorMessage))
                    {
                        model.ErrorMessage += "\\r\\n";
                    }

                    model.ErrorMessage += modelError.ErrorMessage;
                }
            }

            return View("ArticleCategoryDetails", model);
        }

        /// <summary>
        ///     获取文章分类信息。
        /// </summary>
        /// <returns></returns>
        public JsonResult Get(string noShowId)
        {
            var list = Klass.ForId(FeKlassIDs.FeArticleCategory).GetInstances<FeArticleCategory>().ToView();
            var modelList = new List<FeArticleCategoryViewModel>();

            foreach (var item in list)
            {
                modelList.Add(new FeArticleCategoryViewModel
                {
                    Id = item.Id.Replace("@", "*"),
                    Name = item.Name,
                    //如果是顶层节点必须为null，easyui才能识别。
                    //@转为*号，easyui才能识别。
                    ParentId = item.Parent == null ? null : item.Parent.Id.Replace("@", "*"),
                    SortOrder = item.SortOrder,
                    SeoTitle = item.SeoTitle,
                    SeoDescription = item.SeoDescription,
                    IsDisplay = item.IsDisplay
                });
            }

            modelList = modelList.OrderBy(t => t.SortOrder).ToList();

            //不包含自己和自己的子孙节点，
            if (!string.IsNullOrWhiteSpace(noShowId))
            {
                var entity = ObjektFactory.Find<FeArticleCategory>(noShowId);

                if (entity != null)
                {
                    var removeId = entity.Id.Replace("@", "*");
                    var query = from t in modelList
                        where t.Id == removeId
                        select t;

                    var removeItem = query.SingleOrDefault();

                    if (removeItem != null)
                    {
                        modelList.Remove(removeItem);
                    }

                    var descendants = entity.GetDescendants();

                    foreach (var item in descendants)
                    {
                        removeId = item.Id.Replace("@", "*");
                        query = from t in modelList
                            where t.Id == removeId
                            select t;

                        removeItem = query.SingleOrDefault();

                        if (removeItem != null)
                        {
                            modelList.Remove(removeItem);
                        }
                    }
                }
            }

            var source = new
            {
                total = modelList.Count,
                rows = modelList
            };

            return Json(source, JsonRequestBehavior.AllowGet);
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
            //前台id转为记录中的id。
            var recordId = id.Replace("*", "@");
            var result = "true";

            try
            {
                //根据id查询数据。
                var entity = ObjektFactory.Find<FeArticleCategory>(recordId);
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
        ///     修改指定分类的排序.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sortOrder"></param>
        /// <returns></returns>
        [HttpPost]
        public string SetSortOrder(string id, string sortOrder)
        {
            //前台id转为记录中的id。
            var recordId = id.Replace("*", "@");
            var result = "true";

            try
            {
                //根据id查询数据。
                var entity = ObjektFactory.Find<FeArticleCategory>(recordId);

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

        /// <summary>
        ///     删除分类
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public string DelCategory(string id)
        {
            //前台id转为记录中的id。
            var recordId = id.Replace("*", "@");
            var result = "true";

            try
            {

                if (FeArticleCategoryIDs.TopCategory == id)
                {
                    throw new Exception("顶级分类无法删除");
                }

                //根据id查询数据。
                var entity = ObjektFactory.Find<FeArticleCategory>(recordId);
                entity.Delete();
                entity.Save();
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }

        /// <summary>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public string FindCategoryParentPath(string id)
        {
            //前台id转为记录中的id。
            var recordId = id.Replace("*", "@");
            var entity = ObjektFactory.Find<FeArticleCategory>(recordId);
            var result = entity.ParentNamePath;
            return result;
        }
    }
}