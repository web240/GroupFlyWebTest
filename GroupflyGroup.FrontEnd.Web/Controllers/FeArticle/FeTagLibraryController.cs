using System.Collections.Generic;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    /// <summary>
    /// </summary>
    public class FeTagLibraryController : Controller
    {
        /// <summary>
        ///     获取使用最多的标签
        /// </summary>
        /// <param name="count">要获取的标签数</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetTopTags(int count)
        {

            string sql = "select \"related\" as \"id\" from (select \"related\",count(\"related\") as \"count\" from \"FeArticleTag\" GROUP BY \"related\" order by \"count\" desc )";
            Querable<FeTag> query;

            if (count > 0)
            {
                query = new Querable<FeTag>(new OdbcQuery(sql), new Pagination(1, count));
            }
            else
            {
                query = new Querable<FeTag>(new OdbcQuery(sql));
            }

            List<dynamic> model = new List<dynamic>();

            foreach (var feTag in query)
            {
                model.Add(new
                {
                    Id = feTag.Id,
                    Name = feTag.Tag
                });
            }

            return Json(model);
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("FeTagLibraryPageList", new BaseViewModel());
        }

        /// <summary>
        ///     标签列表页
        /// </summary>
        /// <returns></returns>
        public ActionResult FeTagLibraryPageList()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        ///     标签操作页
        /// </summary>
        /// <returns></returns>
        public ActionResult FeTagLibraryOperate()
        {
            return View(new BaseViewModel());
        }


        public JsonResult DelTag(List<FeTagModel> TagList)
        {
            foreach (var tag in TagList)
            {
                var feTag = ObjektFactory.Find<FeTag>(tag.ID);
                feTag.Delete();
                feTag.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        ///     根据ID查找标签
        /// </summary>
        /// <param name="TagID"></param>
        /// <returns></returns>
        public JsonResult SearchFeTagByID(string TagID)
        {
            var TabModel = ObjektFactory.Find<FeTag>(TagID);

            var feTagModel = new FeTagModel();
            feTagModel.Tag = TabModel.Tag;
            feTagModel.From = TabModel.From.CombinedLabel;
            feTagModel.Creater = TabModel.Creator.CombinedLabel;
            feTagModel.Modifier = TabModel.Modificator.CombinedLabel;
            feTagModel.CreateTime = TabModel.CreatedOn.ToString();
            feTagModel.ModifyTime = TabModel.ModifiedOn.ToString();

            return Json(new JsonResultModel(JsonConvert.SerializeObject(feTagModel)));
        }

        /// <summary>
        ///     获取标签列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public JsonResult GetTagLibraryPageList(int pageNumber, int pageSize, string param)
        {
            var model = new ObjektCollectionViewModel(FeKlassNames.FeTag);
            model.GetObjektViewModels(pageNumber, pageSize, param, "createdOn", false);

            foreach (var pro in model.ObjektViewModels)
            {
                //标签ID属性
                var proid = pro.Properties.Find(o => o.Name == "id");

                var feTagCreator = new FeTag();
                var proCreator =
                    feTagCreator.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == "creator") as
                        Property;
                var propertyCreator = new PropertyViewModel(proCreator);

                var FeTagIDModel = ObjektFactory.Find<FeTag>(proid.Value.ToString());
                propertyCreator.FormatterValue = "'" + FeTagIDModel.Creator.CombinedLabel + "'";
                propertyCreator.Value = "'" + FeTagIDModel.Creator.CombinedLabel + "'";
                pro.Properties.Add(propertyCreator);
            }
            var data = new JsonResultModel(model.ToListJson());
            return Json(data);
        }

        /// <summary>
        ///     添加标签
        /// </summary>
        /// <param name="TabName"></param>
        /// <returns></returns>
        public JsonResult AddFeTag(string TabName)
        {
            var Tag = new FeTag();
            Tag.Tag = TabName;
            Tag.From = ObjektFactory.Find<Value>(FeValueIDs.FeTagSource_Manual);
            Tag.Save();
            return Json(new JsonResultModel());
        }

        /// <summary>
        ///     修改标签
        /// </summary>
        /// <param name="TabName"></param>
        /// <returns></returns>
        public JsonResult EditFeTag(string TabName, string TagID)
        {
            var Tag = ObjektFactory.Find<FeTag>(TagID);
            Tag.Tag = TabName;
            Tag.Save();
            return Json(new JsonResultModel());
        }
    }
}