using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{

    /// <summary>
    /// 文章评论
    /// </summary>
    [Serializable]
    public class FeArticleComment : RelationshipObjekt
    {
        /// <summary>
        /// 文章回收后自动回收评论
        /// </summary>
        public override void AfterTrash()
        {
            base.AfterTrash();
            Related.Trash();
        }


        /// <summary>
        /// 文章还原后自动还原评论
        /// </summary>
        public override void AfterRevert()
        {
            base.AfterRevert();
            Related.Revert();
        }




        /// <summary>
        /// 文章删除后自动删除评论
        /// </summary>
        public override void AfterDelete()
        {
            base.AfterDelete();
          
            //删除文章关联评论
            Related.Delete();
            Related.Save();
            
        }

        /// <summary>
        /// 保存之前检查文章配置
        /// </summary>
        public override void BeforeSave()
        {
            //如果是新增文章
            if (ObjektStatus == ObjektStatus.NewModified)
            {
                //文章全局评论开关检测
                SystemConfiguration sysArticCommentGlobal = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleCommentType);
                switch (sysArticCommentGlobal.Value)
                {
                    case FeValueIDs.FeArticleCommentType_On:
                        break;
                    case FeValueIDs.FeArticleCommentType_Off:
                        throw new Exception("不允许评论");
                    case FeValueIDs.FeArticleCommentType_ByArticle:
                        if ((Source as FeArticle).CanComment == false)
                        {
                            throw new Exception("该文章不允许评论");
                        }
                        break;
                    default:
                        throw new Exception("未检测到文章配置");
                }


                FeComment feComment = Related as FeComment;
                if (feComment.Parent == null)
                {
                    //文章评论审核检测
                    SystemConfiguration sysArticCommentApproved = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleCommentApprovedEnable);
                    if (sysArticCommentApproved.Value == "True")
                    {
                        feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Pending);
                    }
                    else
                    {
                        feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Approved);
                    }
                }
                else
                {
                    //文章回复审核检测
                    SystemConfiguration sysArticCommentApproved = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleCommentReplyApprovedEnable);
                    if (sysArticCommentApproved.Value == "True")
                    {
                        feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Pending);
                    }
                    else
                    {
                        feComment.ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Approved);
                    }

                }


                //文章评论游客检测
                SystemConfiguration sysArticCommentTourist = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleGuestCommentEnable);
                if (sysArticCommentTourist.Value == "False")
                {
                    if (User.Current.Id == User.IDs.guest)
                    {
                        throw new Exception("不允许游客评论");
                    }
                }
            }
            base.BeforeSave();
        }
    }
}
