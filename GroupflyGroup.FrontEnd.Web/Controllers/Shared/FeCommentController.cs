using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    public class FeCommentController : BaseController
    {
        /// <summary>
        /// 根据评论ID查询评论的所有回复
        /// </summary>
        /// <param name="pageIndex">第几页</param>
        /// <param name="pageSize">每页大小</param>
        /// <param name="order">排序</param>
        /// <param name="commentID">评论ID</param>
        /// <returns></returns>
        public JsonResult GetCommentChildrenByCommentID(int pageIndex, int pageSize, string commentID)
        {
            var feCommentChildrenList = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new Pagination(pageIndex, pageSize), new WhereClause(" \"approvalStatus\"='" + ObjectFramework.Strings.FeValueIDs.FeApprovalStatus_Approved + "' and \"isDisplay\"=1 and \"isTrash\"=0 and (\"parent\"is not null or \"parent\"<>'')  and \"path\" like '" + commentID + "%'"));

            //时间倒序
            feCommentChildrenList.OrderByClause.Add(new OrderByCell(PropertyNames.createdOn, Order.Desc));

            //查询此评论下的所有回复(包括回复的回复)
            List<FeCommentViewModel> feCommentViewModelChildrenList = new List<FeCommentViewModel>();

            foreach (var feCommentChildren in feCommentChildrenList)
            {
                FeCommentViewModel feCommentViewModelChildren = new FeCommentViewModel();
                feCommentViewModelChildren.Creator = feCommentChildren.Creator.CombinedLabel;
                feCommentViewModelChildren.CreatedOn = feCommentChildren.CreatedOn.ToString();
                feCommentViewModelChildren.Content = feCommentChildren.Content;
                feCommentViewModelChildren.ID = feCommentChildren.Id;
                feCommentViewModelChildren.CreatorImg = string.Empty;
                if (feCommentChildren.Creator.Avatar != null)
                {
                    feCommentViewModelChildren.CreatorImg = feCommentChildren.Creator.Avatar.Id;
                }
                feCommentViewModelChildren.ReplyUpPerson = string.Empty;
                //二级回复列表的回复人（即父级评论）不显示
                if (feCommentChildren.Parent != null && feCommentChildren.Parent.Id != commentID)
                {
                    feCommentViewModelChildren.ReplyUpPerson = feCommentChildren.Parent.Creator.CombinedLabel;
                }

                feCommentViewModelChildrenList.Add(feCommentViewModelChildren);
            }


            Dictionary<string, object> dic = new Dictionary<string, object>();

            dic.Add("total", feCommentChildrenList.Pagination.RowCount);
            dic.Add("rows", feCommentViewModelChildrenList);
            return Json(dic);
        }

    }
}