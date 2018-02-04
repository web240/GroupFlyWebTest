using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using DataType = System.ComponentModel.DataAnnotations.DataType;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     文章
    /// </summary>
    [Serializable]
    public class FeArticle : Objekt
    {
        /// <summary>
        ///     文章的标题
        /// </summary>
        public string Title
        {
            get { return GetProperty<string>(FePropertyNames.title); }
            set { SetProperty(FePropertyNames.title, value); }
        }

        /// <summary>
        ///     文章的标题
        /// </summary>
        public string TitleValue
        {
            get { return GetProperty<string>(FePropertyNames.titleValue); }
            set { SetProperty(FePropertyNames.titleValue, value); }
        }

        /// <summary>
        ///     文章的所属分类
        /// </summary>
        public FeArticleCategory Category
        {
            get { return GetProperty<FeArticleCategory>(FePropertyNames.category); }
            set { SetProperty(FePropertyNames.category, value); }
        }

        /// <summary>
        ///     文章在所属分类中的排序序号
        /// </summary>
        public decimal? SortOrder
        {
            get { return GetProperty<decimal?>(FePropertyNames.sortOrder); }
            set { SetProperty(FePropertyNames.sortOrder, value); }
        }

        /// <summary>
        ///     文章主题图片
        /// </summary>
        public File Image
        {
            get { return GetProperty<File>(FePropertyNames.image); }
            set { SetProperty(FePropertyNames.image, value); }
        }

        /// <summary>
        ///     文章主题图片ID
        /// </summary>
        public string ImageFileId
        {
            get
            {
                var file = GetProperty<File>(FePropertyNames.image);
                if (file != null)
                {
                    return file.Id;
                }
                return "";
            }
        }

        /// <summary>
        ///     文章内容
        /// </summary>
        public string Content
        {
            get
            {
                var s = GetProperty<Stream>(FePropertyNames.content);
                if (s == null)
                {
                    return "";
                }
                var t = new byte[s.Length];
                s.Read(t, 0, (int) s.Length);
                return Encoding.UTF8.GetString(t, 0, t.Length);
            }
            set { SetProperty(FePropertyNames.content, new MemoryStream(Encoding.UTF8.GetBytes(value))); }
        }

        /// <summary>
        ///     文章的属性ID
        /// </summary>
        public string CharacterId
        {
            get
            {
                var relationship = ROCC.GetROC(FeRelationshipNames.FeArticleCharacter);

                var sb = new StringBuilder();

                foreach (var item in relationship)
                {
                    var character = item.Related as FeCharacter;

                    if (character != null)
                    {
                        if (sb.Length > 0)
                        {
                            sb.Append(",");
                        }

                        sb.Append(character.Id);
                    }
                }

                return sb.ToString();
            }
        }

        /// <summary>
        ///     文章的属性
        /// </summary>
        public string Character
        {
            get
            {
                var relationship = ROCC.GetROC(FeRelationshipNames.FeArticleCharacter);

                var sb = new StringBuilder();

                foreach (var item in relationship)
                {
                    var character = item.Related as FeCharacter;

                    if (character != null)
                    {
                        if (sb.Length > 0)
                        {
                            sb.Append(",");
                        }

                        sb.Append(character.Name);
                    }
                }

                return sb.ToString();
            }
        }

        /// <summary>
        ///     文章的作者
        /// </summary>
        public string Author
        {
            get { return GetProperty<string>(FePropertyNames.author); }
            set { SetProperty(FePropertyNames.author, value); }
        }

        /// <summary>
        ///     文章的浏览（点击）数
        /// </summary>
        public int? HitsNum
        {
            get { return GetProperty<int?>(FePropertyNames.hitsNum); }
            set { SetProperty(FePropertyNames.hitsNum, value); }
        }

        /// <summary>
        ///     文章的评论数
        /// </summary>
        public int? CommentNum
        {
            get { return GetProperty<int?>(FePropertyNames.commentNum); }
            set { SetProperty(FePropertyNames.commentNum, value); }
        }

        /// <summary>
        ///     SEO标题
        /// </summary>
        public string SeoTitle
        {
            get { return GetProperty<string>(FePropertyNames.seoTitle); }
            set { SetProperty(FePropertyNames.seoTitle, value); }
        }

        /// <summary>
        ///     seo关键字
        /// </summary>
        public string SeoKeys
        {
            get
            {
                var relationship = ROCC.GetROC(FeRelationshipNames.FeArticleSeoKey);

                var sb = new StringBuilder();

                foreach (var item in relationship)
                {
                    var seoKey = item.Related as FeSeoKey;

                    if (seoKey != null)
                    {
                        if (sb.Length > 0)
                        {
                            sb.Append(",");
                        }

                        sb.Append(seoKey.Key);
                    }
                }

                return sb.ToString();
            }
        }

        /// <summary>
        ///     SEO描述
        /// </summary>
        public string SeoDescription
        {
            get { return GetProperty<string>(FePropertyNames.seoDescription); }
            set { SetProperty(FePropertyNames.seoDescription, value); }
        }

        /// <summary>
        ///     文章是否在前台显示
        /// </summary>
        public bool IsDisplay
        {
            get { return GetProperty<bool>(FePropertyNames.isDisplay); }
            set { SetProperty(FePropertyNames.isDisplay, value); }
        }

        /// <summary>
        ///     文章审核状态
        /// </summary>
        public Value ApprovalStatus
        {
            get { return GetProperty<Value>(FePropertyNames.approvalStatus); }
            set { SetProperty(FePropertyNames.approvalStatus, value); }
        }

        /// <summary>
        ///     文章审核人
        /// </summary>
        public GroupflyGroup.Platform.ObjectFramework.User Approver
        {
            get { return GetProperty<GroupflyGroup.Platform.ObjectFramework.User>(FePropertyNames.approver); }
            set { SetProperty(FePropertyNames.approver, value); }
        }

        /// <summary>
        ///     文章审核时间
        /// </summary>
        public DateTime? ApprovedOn
        {
            get { return GetProperty<DateTime?>(FePropertyNames.approvedOn); }
            set { SetProperty(FePropertyNames.approvedOn, value); }
        }

        /// <summary>
        ///     文章是否允许评论
        /// </summary>
        public bool CanComment
        {
            get { return GetProperty<bool>(FePropertyNames.canComment); }
            set { SetProperty(FePropertyNames.canComment, value); }
        }

        /// <summary>
        ///     文章是否回收
        /// </summary>
        public bool IsTrash
        {
            get { return GetProperty<bool>(FePropertyNames.isTrash); }
            set { SetProperty(FePropertyNames.isTrash, value); }
        }

        /// <summary>
        ///     文章是否草稿
        /// </summary>
        public bool IsDraft
        {
            get { return GetProperty<bool>(FePropertyNames.isDraft); }
            set { SetProperty(FePropertyNames.isDraft, value); }
        }

        /// <summary>
        ///     文章来源
        /// </summary>
        public string From
        {
            get { return GetProperty<string>(FePropertyNames.from); }
            set { SetProperty(FePropertyNames.from, value); }
        }

        /// <summary>
        ///     文章标签
        /// </summary>
        public string Tag
        {
            get
            {
                var relationship = ROCC.GetROC(FeRelationshipNames.FeArticleTag);
                var sb = new StringBuilder();
                foreach (var item in relationship)
                {
                    var ft = item.Related as FeTag;
                    if (ft != null)
                    {
                        if (sb.Length > 0)
                        {
                            sb.Append(",");
                        }
                        sb.Append(ft.Tag);
                    }
                }
                return sb.ToString();
            }
        }


        /// <summary>
        ///     创建新增对象排序。
        /// </summary>
        /// <returns></returns>
        public static decimal NewSortOrder()
        {
            var oc = new ObjektCollection<FeArticle>
                (
                Klass.ForId(FeKlassIDs.FeArticle),
                new WhereClause("\"sortOrder\" is not null")
                );
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.sortOrder, Order.Desc));
            var entity = oc.FirstOrDefault();

            var sort = 1;

            if (entity != null && entity.IsExists() && entity.SortOrder.HasValue)
            {
                sort = (int) entity.SortOrder.Value;
                sort++;
            }

            return sort;
        }

        /// <summary>
        /// 
        /// </summary>
        public override void BeforeSave()
        {
            if (ObjektStatus == ObjektStatus.NewModified)
            {
                //文章全局审核开关检测
                var sysArticGlobal =
                    ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleApprovedEnable);

                //开关关闭直接审核通过
                if (sysArticGlobal.Value == "False")
                {
                    ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Approved);
                }
                //开关打开为待审核
                else
                {
                    ApprovalStatus = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Pending);
                }
            }


            base.BeforeSave();
        }

    }
}