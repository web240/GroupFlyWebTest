using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.Web.Controllers;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeArticle
{
    public class FeArticleCommentController : BaseController
    {
        /// <summary>
        /// 评论框架
        /// </summary>
        /// <returns></returns>
        // GET: FeArticleComment
        public ActionResult Index()
        {
            return View("FeArticleCommentPageList", new BaseViewModel());
        
        }

        /// <summary>
        /// 评论列表
        /// </summary>
        /// <param name="tab">tab切换ID用于切换列表</param>
        /// <returns></returns>
        public ActionResult FeArticleCommenGridList(string tab)
        {
            FeArticleCommentViewModel feArticleCommentViewModel = new FeArticleCommentViewModel();
            feArticleCommentViewModel.FeArticleCommentTab = tab;
            return View("FeArticleCommentGridList", feArticleCommentViewModel);
        }

        /// <summary>
        /// 回收站框架
        /// </summary>
        /// <returns></returns>
        public ActionResult FeArticleCommentTrash()
        {
            return View("FeArticleCommentTrashPageList", new BaseViewModel());
        }

        /// <summary>
        /// 回收站列表
        /// </summary>
        /// <param name="tab">tab切换ID用于切换列表</param>
        /// <returns></returns>
        public ActionResult FeArticleCommentTrashGridList(string tab)
        {
            FeArticleCommentViewModel feArticleCommentViewModel = new FeArticleCommentViewModel();
            feArticleCommentViewModel.FeArticleCommentTab = tab;
            return View("FeArticleCommentTrashGridList", feArticleCommentViewModel);

        }
       

     
     

        /// <summary>
        /// 评论详情
        /// </summary>
        /// <param name="FeCommentID">评论ID用于获得顶级评论的详情</param>
        /// <returns></returns>
        public ActionResult FeArticleCommentDetail(string FeCommentID)
        {
            FeArticleCommentViewModel feArticleCommentViewModel = new FeArticleCommentViewModel();
            var feComment = ObjektFactory.Find<FeComment>(FeCommentID);

            //获得顶级评论
            var feTopComment = GetTopFeComment(feComment);

            feArticleCommentViewModel.ID = feTopComment.Id;
            feArticleCommentViewModel.Creator = feTopComment.Creator.CombinedLabel;
            feArticleCommentViewModel.CreatedOn = feTopComment.CreatedOn.ToString();
            feArticleCommentViewModel.Content = feTopComment.Content;
            

            var feArticleCommentList = new ObjektCollection<FeArticleComment>(Klass.ForId(FeKlassIDs.FeArticleComment), new WhereClause("\"related\" = '" + feArticleCommentViewModel.ID + "'")).ToList();
            //获取文章ID 
            feArticleCommentViewModel.ArticleID = feArticleCommentList[0].Source.Id;


            return View("FeArticleCommentDetail", feArticleCommentViewModel);
        }


        /// <summary>
        /// 获得顶级评论
        /// </summary>
        /// <param name="feComment">次级评论类用于检索父评论</param>
        public FeComment GetTopFeComment(FeComment feComment)
        {
            if (feComment.Parent == null)
            {
                return feComment;
            }
            return  GetTopFeComment(feComment.Parent);
        }



        List<FeArticleCommentViewModel> feCommentChildrenList = new List<FeArticleCommentViewModel>();
        /// <summary>
        /// 获得所有子评论
        /// </summary>
        /// <param name="FeCommentID">顶级评论ID</param>
        /// <returns></returns>
        public JsonResult GetFeCommentChildrenByID(string FeCommentID)
        {
            var feCommentList = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new WhereClause("\"parent\" = '" + FeCommentID + "' AND "+"\"isTrash\"='0'")).ToList();

            GetFeCommentChildren(feCommentList);
                      
            return Json(new JsonResultModel(feCommentChildrenList.OrderByDescending(o => o.CreatedOn).ObjectToJson()));
        }

        /// <summary>
        /// 获取文章的所有所有顶级评论(前台调用)
        /// </summary>
        /// <param name="FeArticleID"></param>
        /// <returns></returns>
        public JsonResult GetArticleAllComment(string SourceID, int pageIndex,int pageSize)
        {
            //查询文章的所有顶级评论(没有回复)
            var feCommentList = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new Pagination(pageIndex,pageSize), new WhereClause(" \"approvalStatus\"='"+ ObjectFramework.Strings.FeValueIDs.FeApprovalStatus_Approved + "' and \"isDisplay\"=1 and \"isTrash\"=0 and (\"parent\"is null or \"parent\"='') and \"id\" in (select \"related\" from \"FeArticleComment\"  where \"source\"='" + SourceID + "')"));

            //时间倒序
            feCommentList.OrderByClause.Add(new OrderByCell(PropertyNames.createdOn,Order.Desc));

            //评论视图模型
            List<FeArticleCommentViewModel> feArticleCommentViewModelList = new List<FeArticleCommentViewModel>(); 

            foreach (var feComment in feCommentList)
            {
                FeArticleCommentViewModel feArticleCommentViewModel = new FeArticleCommentViewModel();

                feArticleCommentViewModel.Creator = feComment.Creator.CombinedLabel;
                feArticleCommentViewModel.CreatedOn = feComment.CreatedOn.ToString();
                feArticleCommentViewModel.Content = feComment.Content;
                feArticleCommentViewModel.ID = feComment.Id;
                feArticleCommentViewModel.CreatorImg = string.Empty;
                if (feComment.Creator.Avatar != null)
                {
                    feArticleCommentViewModel.CreatorImg = feComment.Creator.Avatar.Id;
                }

                feArticleCommentViewModelList.Add(feArticleCommentViewModel);
            }

            Dictionary<string, object> dic = new Dictionary<string, object>();

            dic.Add("total", feCommentList.Pagination.RowCount);
            dic.Add("rows", feArticleCommentViewModelList);
            return Json(dic);
        }

        /// <summary>
        /// 子评论递归 
        /// </summary>
        /// <param name="feCommentList">用于递归的List评论列表</param>
        public void GetFeCommentChildren(List<FeComment> feCommentList)
        {
            foreach (var feComment in feCommentList)
            {
                FeArticleCommentViewModel feArticleCommentViewModel = new FeArticleCommentViewModel();

                feArticleCommentViewModel.CreatedOn = feComment.CreatedOn.ToString();
                feArticleCommentViewModel.Creator = feComment.Creator.CombinedLabel;
                feArticleCommentViewModel.ID = feComment.Id;
                feArticleCommentViewModel.Content = feComment.Content;
                feArticleCommentViewModel.ReplyUpPerson = feComment.Parent.Creator.CombinedLabel;               

                var feArticleCommentList = new ObjektCollection<FeArticleComment>(Klass.ForId(FeKlassIDs.FeArticleComment), new WhereClause("\"related\" = '" + feArticleCommentViewModel.ID + "'")).ToList();
                //获取文章ID 
                feArticleCommentViewModel.ArticleID = feArticleCommentList[0].Source.Id;

                feCommentChildrenList.Add(feArticleCommentViewModel);

                var feCommentListModel = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new WhereClause("\"parent\" = '" + feComment.Id + "'")).ToList();

                GetFeCommentChildren(feCommentListModel);
            }
        }



        /// <summary>
        /// 获取评论列表
        /// </summary>
        /// <param name="page">第几页</param>
        /// <param name="rows">每一页条数</param>
        /// <param name="param">参数</param>
        /// <param name="isTrash">是否回收</param>
        /// <returns></returns>
        public JsonResult GetFeArticleCommenGridList(int pageNumber, int pageSize, string param)
        {                       
            var model = new ObjektCollectionViewModel(FeKlassNames.FeComment);



            model.GetObjektViewModels(pageNumber, pageSize, param, "createdOn", false,"");
          
            foreach (var pro in model.ObjektViewModels)
            {
                //评论ID属性
                PropertyViewModel proid = pro.Properties.Find(o => o.Name == "id");

                //获取父评论属性
                PropertyViewModel proparent = pro.Properties.Find(o => o.Name == "parent");
                if (proparent.Value != null)
                {
                    FeComment feComment = proparent.Value as FeComment;
                    proparent.FormatterValue = '"'+feComment.Content.ConvertUnicodeToJsonFormatL()+'"' ;                 
                }
                else
                {
                    proparent.FormatterValue = '"' + string.Empty +'"';
                }
                                
                //增加创建人
                FeComment feCommentCreator = new FeComment();
                Property proCreator = feCommentCreator.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == "creator") as Property;
                var propertyCreator = new PropertyViewModel(proCreator);

                FeComment FeCommentIDModel = ObjektFactory.Find<FeComment>(proid.Value.ToString());
                propertyCreator.FormatterValue = "'" + FeCommentIDModel.Creator.CombinedLabel + "'";
                propertyCreator.Value = "'" + FeCommentIDModel.Creator.CombinedLabel + "'";
                pro.Properties.Add(propertyCreator);


                //增加文章标题属性
                ObjectFramework.FeArticle feArticle = new ObjectFramework.FeArticle();
                Property protitle = feArticle.Klass.TryGetProperty("title");
                var property = new PropertyViewModel(protitle);
                //标题属性赋值
                property.FormatterValue = "";
                property.Value = "";
                
                ObjectFramework.FeArticle feArticleByFeComment = GetArticle(proid.Value.ToString());              
                if (feArticleByFeComment != null)
                {
                    property.FormatterValue = feArticleByFeComment.Title;
                    property.Value = feArticleByFeComment.Title;
                }
                pro.Properties.Add(property);


            }
            var data = new JsonResultModel(model.ToListJson());
            return Json(data);
        }


        /// <summary>
        /// 查询FeArticleComment关联的FeCommentID
        /// </summary>
        /// <returns></returns>
        public JsonResult GetFeCommentID()
        {
            List<string> model = new List<string>();

            var feArticleCommentList= new ObjektCollection<FeArticleComment>(Klass.ForId(FeKlassIDs.FeArticleComment));

            foreach (var feArticleComment in feArticleCommentList)
            {
                if (feArticleComment.Related != null)
                {
                    model.Add(feArticleComment.Related.Id);
                }
            }


            return Json(new JsonResultModel(model.ObjectToJson()));
        }

        /// <summary>
        /// 查询回复本人的回复
        /// </summary>
        /// <param name="FeCommentCreator">登录名</param>
        /// <returns></returns>
        public JsonResult GetFeCommentIDByCreator(string FeCommentCreator)
        {
            List<string> model = new List<string>();

            var feMyCommentList = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment),new WhereClause("\"creator\" = '" + FeCommentCreator + "'"));

            foreach (var feMyComment in feMyCommentList)
            {
                var feCommentList= new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new WhereClause("\"parent\" = '" + feMyComment.Id + "'"));
                foreach (var feComment in feCommentList)
                {
                    model.Add(feComment.Id);
                }
            }

            return Json(new JsonResultModel(model.ObjectToJson()));
        }


        /// <summary>
        /// 查询文章内容关联文章评论ID
        /// </summary>
        /// <param name="FeArticleTitle">文章标题</param>
        public JsonResult GetFeCommentIDByFeArticleTitle(string FeArticleTitle)
        {
            var tKclass = Klass.ForName(FeKlassNames.FeArticle);
            var condition = new WhereExpression<Objekt>(tKclass);
            condition.Where("title", Const.Oper_Contains, FeArticleTitle);

            List<string> feCommentList = new List<string>();

            //文章列表
            var feArticleList = new ObjektCollection<ObjectFramework.FeArticle>(tKclass, condition.ToWhereClause());

            foreach(var feArticle in feArticleList)
            {
                //文章关联实体
                var feArticleCommentList= feArticle.ROCC.GetROC(FeRelationshipNames.FeArticleComment);
                foreach (var feArticleComment in feArticleCommentList)
                {
                    feCommentList.Add((feArticleComment.Related as FeComment).Id);

                }

            }
            return Json(new JsonResultModel(feCommentList.ObjectToJson()));
        }





        /// <summary>
        /// 根据评论ID获取文章实体
        /// </summary>
        /// <param name="FeCommentID">评论ID</param>
        /// <returns></returns>
        public ObjectFramework.FeArticle GetArticle(string FeCommentID)
        {
            var model = new ObjektCollection<FeArticleComment>(Klass.ForId(FeKlassIDs.FeArticleComment), new WhereClause("\"related\" = '" + FeCommentID + "'"));
            if (model.Count > 0)
            {
                var  feArcitle = model.ToList()[0].Source as ObjectFramework.FeArticle;
                return feArcitle;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 删除评论到回收站
        /// </summary>
        /// <param name="FeCommentList">删除的对象实体集合</param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult DelFeComment(List<FeArticleCommentViewModel> FeCommentList)
        {

            foreach (var feCommentViewModel in FeCommentList)
            {
                FeComment feComment = ObjektFactory.Find<FeComment>(feCommentViewModel.ID);
                feComment.Trash();
                
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 彻底删除评论 
        /// </summary>
        /// <param name="FeCommentList">删除的对象实体集合</param>
        [ValidateInput(false)]
        public JsonResult DelFeCommentTrash(List<FeArticleCommentViewModel> FeCommentList)
        {
            foreach (var feCommentViewModel in FeCommentList)
            {

                //删除文章评论关联对象
                var feArticleCommentList = new ObjektCollection<FeArticleComment>(Klass.ForId(FeKlassIDs.FeArticleComment), new WhereClause("\"related\" = '" + feCommentViewModel.ID + "'"));
                foreach (var feArticleComment in feArticleCommentList)
                {
                    feArticleComment.Delete();
                    feArticleComment.Save();
                }

                                           
            }
            return Json(new JsonResultModel());
        }



        /// <summary>
        /// 添加文章评论
        /// </summary>
        /// <param name="ParentID"></param>
        /// <param name="SourceID">数据源ID</param>
        /// <param name="FeCommentContent"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult AddArticleComment(string ParentID,string SourceID, string FeCommentContent)
        {            
            FeComment feComment = new FeComment();
            feComment.Content = FeCommentContent;
            feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Pending);
            feComment.IsDisplay = true;
            

            if (!string.IsNullOrEmpty(ParentID))
            {
                FeComment feComment1 = new FeComment();
                feComment1 = ObjektFactory.Find<FeComment>(ParentID);
                feComment.Parent = feComment1;
            }
            
            //添加关联对象
            FeArticleComment feArticleComment = new FeArticleComment();
            feArticleComment.Source = ObjektFactory.Find<ObjectFramework.FeArticle>(SourceID);
            feArticleComment.Related = feComment;

            //先保存文章评论关联
            feArticleComment.Save();
            //再保存评论
            feComment.Save();

            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 根据ID查找评论
        /// </summary>
        /// <param name="FeCommentID">评论ID</param>
        /// <returns></returns>
        public FeArticleCommentViewModel SearchFeCommentByID(string FeCommentID)
        {
            var FeCommentIDModel = ObjektFactory.Find<FeComment>(FeCommentID);
            
            FeArticleCommentViewModel feTagModel = new FeArticleCommentViewModel();

            feTagModel.Content = FeCommentIDModel.Content;
            feTagModel.ApprovalStatus = FeCommentIDModel.ApprovalStatus.CombinedLabel;
            feTagModel.IsDisplay = FeCommentIDModel.IsDisplay.ToString();
            feTagModel.Approver = FeCommentIDModel.Approver.CombinedLabel;
            feTagModel.ApprovedOn = FeCommentIDModel.ApprovedOn.ToString();
            feTagModel.Parent = "";
            if (FeCommentIDModel.Parent != null)
            {
                feTagModel.Parent = FeCommentIDModel.Parent.Id;
            }
            feTagModel.IsTrash = FeCommentIDModel.IsTrash.ToString();
            feTagModel.CreatedOn = FeCommentIDModel.CreatedOn.ToString();
            feTagModel.Creator = FeCommentIDModel.Creator.CombinedLabel;

            return feTagModel;
        }


        /// <summary>
        /// 根据ID查找评论
        /// </summary>
        /// <param name="FeCommentID">评论ID</param>
        /// <returns></returns>
        public JsonResult SearchFeCommentByIDToJson(string FeCommentID)
        {
            FeArticleCommentViewModel feTagModel = SearchFeCommentByID(FeCommentID);

            return   Json(new JsonResultModel(feTagModel.ObjectToJson()));

        }


        /// <summary>
        /// 设置评论是否显示
        /// </summary>
        /// <param name="FeCommentList">评论实体集合</param>
        /// <param name="isDisplay">是否显示</param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult SetDisplay(List<FeArticleCommentViewModel> FeCommentList,bool isDisplay)
        {

            foreach (var feCommentViewModel in FeCommentList)
            {
                FeComment feComment = ObjektFactory.Find<FeComment>(feCommentViewModel.ID);
                feComment.IsDisplay = isDisplay;
                feComment.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 设置评论审核状态
        /// </summary>
        /// <param name="FeCommentList">评论实体集合</param>
        /// <param name="isApproved">是否审核</param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult SetApproved(List<FeArticleCommentViewModel> FeCommentList, bool isApproved)
        {

            foreach (var feCommentViewModel in FeCommentList)
            {
                FeComment feComment = ObjektFactory.Find<FeComment>(feCommentViewModel.ID);
                if (isApproved)
                {
                    feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Approved);
                }
                else
                {
                    feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_NotApproved);
                }

                feComment.Approver = SessionContext.Current.User;
                feComment.ApprovedOn = DateTime.Now;
                feComment.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 评论回收站还原评论
        /// </summary>
        /// <param name="FeCommentList">评论实体类集合</param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult ReducedFeComment(List<FeArticleCommentViewModel> FeCommentList)
        {
            foreach (var feCommentViewModel in FeCommentList)
            {
                FeComment feComment = ObjektFactory.Find<FeComment>(feCommentViewModel.ID);
                feComment.Revert() ;
                
            }
            return Json(new JsonResultModel());
        }
    }
}