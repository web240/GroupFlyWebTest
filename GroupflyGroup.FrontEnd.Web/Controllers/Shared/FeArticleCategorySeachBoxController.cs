using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// 文章分类选择控件。
    /// </summary>
    public class FeArticleCategorySeachBoxController : Controller
    {

        /// <summary>
        /// 加载控件。
        /// </summary>
        /// <param name="parentId">当前父节点id。</param>
        /// <param name="parentNamePath">当前父节点路径</param>
        /// <param name="parentIdModelFieldName">引用试图中父节点id在视图中的名称。</param>
        /// <param name="parentNamePathModelFieldName">引用试图中父节点路径在视图中的名称。</param>
        /// <param name="id">当前分类的id。</param>
        /// <param name="title">文本提示内容</param>
        /// <param name="width">宽度。</param>
        /// <param name="loadingIndicatorId">异步请求时候显示loading容器的id。</param>
        /// <returns></returns>
        public PartialViewResult Load(
            string parentId, 
            string parentNamePath, 
            string parentIdModelFieldName, 
            string parentNamePathModelFieldName,
            string id,
            string loadingIndicatorId,
            string title = "请选择分类",
            int width = 400
            )
        {

            FeArticleCategorySeachBoxViewModel model = new FeArticleCategorySeachBoxViewModel();
            model.Guid = Guid.NewGuid().ToString("N");
            model.ParentId = parentId;
            model.ParentNamePath = parentNamePath;
            model.ParentIdModelFieldName = parentIdModelFieldName;
            model.ParentNamePathModelFieldName = parentNamePathModelFieldName;
            model.Id = id;
            model.Title = title;
            model.Width = width;
            model.LoadingIndicatorId = loadingIndicatorId;

            return PartialView("_FeArticleCategorySeachBox", model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public string FindCategoryParentPath(string id)
        {

            //前台id转为记录中的id。
            string recordId = id.Replace("*", "@");
            FeArticleCategory entity = ObjektFactory.Find<FeArticleCategory>(recordId);
            string result = entity.RootPath;
            return result;
        }

    }
}