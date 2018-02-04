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
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    /// <summary>
    ///     文章属性。
    /// </summary>
    public class FeCharacterController : BaseController
    {
        /// <summary>
        ///     展示列表。
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new FeCharacterViewModel());
        }

        /// <summary>
        ///     获取数据。
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="ArticleList"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Get(List<FeArticleModel> ArticleList=null,int pageNumber = 0, int pageSize = 0)
        {
            string articleId = string.Empty;
            if (ArticleList != null)
            {
                foreach (var item in ArticleList)
                {
                    articleId += "'" + item.Id + "',";
                }
                articleId = articleId.TrimEnd(',');
            }

            List<FeCharacterViewModel> list = new List<FeCharacterViewModel>();
            
            ObjektCollection<FeCharacter> oc = null;
            //如果没传分页参数则表示不分页
            if (pageNumber == 0 && pageSize == 0)
            {
                oc = new ObjektCollection<FeCharacter>(Klass.ForId(FeKlassIDs.FeCharacter)).ToView();
            }
            else
            {
                oc = new ObjektCollection<FeCharacter>(Klass.ForId(FeKlassIDs.FeCharacter), new Pagination(pageNumber, pageSize)).ToView();
            }

            foreach (var item in oc)
            {
                var model = new FeCharacterViewModel();
                model.CopyEntity(item);
                model.IsChecked = 0;
                if (!string.IsNullOrEmpty(articleId))
                { int count = GetArticleCountsByCharacter(item.Id, articleId);
                    if (count != 0) { if (count == ArticleList.Count) { model.IsChecked = 2; } else { model.IsChecked = 1; } }
                }
                list.Add(model);
            }

            list = list.OrderBy(t => t.SortOrder).ToList();

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("rows",list);
            dic.Add("total", oc.Count);
            var data = new JsonResultModel(dic.ObjectToJson());
            return Json(data);
        }
        /// <summary>
        /// 通过文章属性获取文章条数
        /// </summary>
        /// <param name="characterId"></param>
        /// <param name="articleId"></param>
        /// <returns></returns>
        protected int GetArticleCountsByCharacter(string characterId,string articleId)
        {
            ObjektCollection<ObjectFramework.FeArticleCharacter> oc = new ObjektCollection<FeArticleCharacter>(Klass.ForId(FeKlassIDs.FeArticleCharacter),new WhereClause(" \"source\" in("+articleId+") and \"related\"='"+characterId+"'"));

            return oc.Count;
        }

        /// <summary>
        ///     显示新增属性页。
        /// </summary>
        /// <returns></returns>
        public ActionResult Create()
        {
            var model = new FeCharacterViewModel();
            model.OperationType = 1;
            model.SortOrder = FeCharacter.NewSortOrder();
            return View("CharacterDetails", model);
        }

        /// <summary>
        ///     新增属性。
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult Add(FeCharacterViewModel model)
        {
            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.Code = 0;
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                var character = new FeCharacter();
                character.Name = model.Name;
                character.Label = model.Name;
                character.IsDisplay = model.IsDisplay == "on" ? true : false;
                character.SortOrder = model.SortOrder;
                character.Icon = model.Icon;
                character.BigIcon= model.BigIcon==null?null: ObjektFactory.Find<File>(model.BigIcon);
                character.SmallIcon = model.SmallIcon==null?null: ObjektFactory.Find<File>(model.SmallIcon);
                character.Save();
                result.Code = 1;
            }

            return Json(result);
        }

        /// <summary>
        /// 修改属性。
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Edit(string id)
        {

            FeCharacter character = ObjektFactory.Find<FeCharacter>(id);

            if (character != null && character.IsExists())
            {
                FeCharacterViewModel model = new FeCharacterViewModel();
                model.CopyEntity(character);
                model.BigIcon = character.BigIcon==null?null: character.BigIcon.Id;
                model.SmallIcon = character.SmallIcon==null?null: character.SmallIcon.Id;
                model.OperationType = 2;
                return View("CharacterDetails", model);
            }
            else
            {
                return View("Index");
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Edit(FeCharacterViewModel model)
        {

            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.Code = 0;
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                var character = ObjektFactory.Find<FeCharacter>(model.Id);
                character.Name = model.Name;
                character.Label = model.Name;
                character.IsDisplay = model.IsDisplay == "on" ? true : false;
                character.SortOrder = model.SortOrder;
                character.Icon = model.Icon;
                character.BigIcon = model.BigIcon == null ? null : ObjektFactory.Find<File>(model.BigIcon);
                character.SmallIcon = model.SmallIcon == null ? null : ObjektFactory.Find<File>(model.SmallIcon);
                character.Save();
                result.Code = 1;
            }

            return Json(result);

        }

        /// <summary>
        ///     删除文章属性。
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Del(string id)
        {
            var result = new JsonActionResult();

            if (id == FeCharacterIDs.Head
                || id == FeCharacterIDs.Hot
                || id == FeCharacterIDs.Recommend
                )
            {
                result.ErrorMessage = "不能删除系统默认项";
            }
            else
            {
                var character = ObjektFactory.Find<FeCharacter>(id);

                if (character != null && character.IsExists())
                {
                    character.Delete();
                    character.Save();
                    result.Code = 1;
                }
                else
                {
                    result.ErrorMessage = "找不到指定的属性";
                }
            }

            return Json(result);
        }

        /// <summary>
        ///     设置文章属性是否显示。
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
                var character = ObjektFactory.Find<FeCharacter>(id);

                if (character != null && character.IsExists())
                {
                    character.IsDisplay = value == "true" ? true : false;
                    character.Save();
                    result.Code = 1;
                }
                else
                {
                    result.ErrorMessage = "找不到指定的属性";
                }
            }
            else
            {
                result.ErrorMessage = "参数错误";
            }

            return Json(result);
        }

        /// <summary>
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public JsonResult SetSortOrder(string id, decimal value)
        {
            var result = new JsonActionResult();

            var character = ObjektFactory.Find<FeCharacter>(id);

            if (character != null && character.IsExists())
            {
                character.SortOrder = value;
                character.Save();
                result.Code = 1;
            }
            else
            {
                result.ErrorMessage = "找不到指定的属性";
            }

            return Json(result);
        }
    }
}