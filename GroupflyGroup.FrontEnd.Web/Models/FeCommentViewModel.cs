using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FeCommentViewModel: BaseViewModel
    {
        /// <summary>
        /// 评论ID
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 评论内容
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// 审核状态
        /// </summary>
        public string ApprovalStatus { get; set; }
        /// <summary>
        /// 是否显示
        /// </summary>
        public string IsDisplay { get; set; }
        /// <summary>
        /// 审核人
        /// </summary>
        public string Approver { get; set; }
        /// <summary>
        /// 审核时间
        /// </summary>
        public string ApprovedOn { get; set; }
        /// <summary>
        /// 父评论
        /// </summary>
        public string Parent { get; set; }
        /// <summary>
        /// 是否回收
        /// </summary>
        public string IsTrash { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreatedOn { get; set; }
        /// <summary>
        /// 创建人
        /// </summary>
        public string Creator { get; set; }

        /// <summary>
        /// 回复上级评论人
        /// </summary>
        public string ReplyUpPerson { get; set; }

        /// <summary>
        /// 评论人头像
        /// </summary>
        public string CreatorImg { get; set; }

        /// <summary>
        /// 评论二级回复列表
        /// </summary>
        public object CommentChildrenList { get; set; }

        /// <summary>
        /// 评论二级回复列表总数量
        /// </summary>
        public string CommentChildrenListTotalCount { set; get; }

    }
}