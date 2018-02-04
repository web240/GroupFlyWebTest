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
    /// 评论
    /// </summary>
    [Serializable]
    public class FeComment : Objekt
    {


        /// <summary>
        /// 评论内容
        /// </summary>
        public string Content
        {
            get
            {
                return GetProperty<string>(FePropertyNames.content);
            }
            set
            {
                SetProperty(FePropertyNames.content, value);
            }
        }
        /// <summary>
        /// 审核状态
        /// </summary>
        public Value ApprovalStatus
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.approvalStatus);
            }
            set
            {
                SetProperty(FePropertyNames.approvalStatus, value);
            }
        }

        /// <summary>
        /// 是否显示
        /// </summary>
        public bool IsDisplay
        {
            get
            {
                return GetProperty<bool>(FePropertyNames.isDisplay);
            }
            set
            {
                SetProperty(FePropertyNames.isDisplay, value);
            }
        }

        /// <summary>
        /// 审核人
        /// </summary>
        public GroupflyGroup.Platform.ObjectFramework.User Approver
        {
            get
            {
                return GetProperty<User>(FePropertyNames.approver);
            }
            set
            {
                SetProperty(FePropertyNames.approver, value);
            }
        }


        /// <summary>
        /// 审核时间
        /// </summary>
        public DateTime ApprovedOn
        {
            get
            {
                return GetProperty<DateTime>(FePropertyNames.approvedOn);
            }
            set
            {
                SetProperty(FePropertyNames.approvedOn, value);
            }
        }

        /// <summary>
        /// 父评论
        /// </summary>
        public FeComment Parent
        {
            get
            {
                return GetProperty<FeComment>(FePropertyNames.parent);
            }
            set
            {
                SetProperty(FePropertyNames.parent, value);
            }
        }

        /// <summary>
        /// 路径ID
        /// </summary>
        public string Path
        {
            get
            {
                return GetProperty<string>(FePropertyNames.path);
            }
            set
            {
                SetProperty(FePropertyNames.path, value);
            }

        }


        public override void BeforeSave()
        {
            if (ObjektStatus == ObjektStatus.NewModified)
            {
                if (this.Parent != null)
                {
                    Parent.Save();
                    this.Path = this.Parent.Path + "/" + this.Id;
                }
                else
                {
                    this.Path = this.Id;
                }
            }
            base.BeforeSave();
        }



        public override void BeforeDelete()
        {

            ChildrenDeleteCheck();

            base.BeforeDelete();
        }

        //子评论删除处理
        public void ChildrenDeleteCheck()
        {
            //查询是否有子评论
            var feComment = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new WhereClause("\"parent\" = '" + Id + "'")).ToList();
            if (feComment.Count > 0)
            {
                //如果有子评论连带子评论一起删除
                foreach (var item in feComment)
                {                    
                    //删除文章评论关联对象
                    var feArticleCommentList = new ObjektCollection<FeArticleComment>(Klass.ForId(FeKlassIDs.FeArticleComment), new WhereClause("\"related\" = '" + item.Id + "'")).ToList();
                    foreach (var feArticleComment in feArticleCommentList)
                    {
                        feArticleComment.Delete();
                        feArticleComment.Save();
                    }
                }

            }

        }


        public override void BeforeTrash()
        {
            ChildrenTrashCheck();
            base.BeforeTrash();
        }

        /// <summary>
        /// 子评论回收处理
        /// </summary>
        public void ChildrenTrashCheck()
        {
            //查询是否有子评论
            var feComment = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new WhereClause("\"parent\" = '" + Id + "'"));            

            if (feComment.Count > 0)
            {
                //如果有子评论连带子评论一起更改状态
                foreach (var item in feComment)
                {                                       
                    item.Trash();
                }

            }
        }


        public override void BeforeRevert()
        {
            ChildrenRevertCheck();
            base.BeforeRevert();
        }


        /// <summary>
        /// 子评论恢复处理
        /// </summary>
        public void ChildrenRevertCheck()
        {
            //查询是否有子评论
            var feComment = new ObjektCollection<FeComment>(Klass.ForId(FeKlassIDs.FeComment), new WhereClause("\"parent\" = '" + Id + "'"));
            if (feComment.Count > 0)
            {
                //如果有子评论连带子评论一起更改状态
                foreach (var item in feComment)
                {
                    item.Revert();
                }

            }
        }

        public override void BeforeUpdate()
        {
            base.BeforeUpdate();
        }
    }
}
