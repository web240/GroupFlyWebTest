using System.ComponentModel.DataAnnotations;
using System.Web;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     文章模型
    /// </summary>
    public class FeArticleModel : BaseViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeArticleModel()
        {
            FeArticleImageDirectoryId = FeFileIDs.FeArticle;
        }

        /// <summary>
        ///     文章图片目录id
        /// </summary>
        public string FeArticleImageDirectoryId { get; set; }

        public string Tab { get; set; }
        public string Id { get; set; }

        /// <summary>
        ///     文章标题是否修改，加此字段主要是为了避免2进制内容没有改变内容的情况下重复提交
        /// </summary>
        public bool TitleIsModify { get; set; }

        /// <summary>
        ///     文章内容是否修改，加此字段主要是为了避免2进制内容没有改变内容的情况下重复提交
        /// </summary>
        public bool ContentIsModify { get; set; }

        /// <summary>
        ///     文章的标题
        /// </summary>
        [Display(Name = "文章标题")]
        [Required]
        public string Title { get; set; }

        /// <summary>
        ///     文章的标题文本值
        /// </summary>
        [Required]
        public string TitleValue { get; set; }

        /// <summary>
        ///     文章的所属分类
        /// </summary>
        [Display(Name = "文章分类")]
        [Required]
        public string Category { get; set; }

        /// <summary>
        ///     文章的所属分类ID
        /// </summary>
        [Display(Name = "文章分类ID")]
        public string CategoryID { get; set; }

        /// <summary>
        ///     文章在所属分类中的排序序号
        /// </summary>
        [Display(Name = "排序号")]
        public decimal? SortOrder { get; set; }

        /// <summary>
        ///     文章主题图片
        /// </summary>
        [Display(Name = "主题图片")]
        public string ImageFileId { get; set; }

        /// <summary>
        ///     文章内容
        /// </summary>
        [Display(Name = "文章内容")]
        [Required]
        public string Content { get; set; }

        /// <summary>
        ///     TAG
        /// </summary>
        [Display(Name = "TAG")]
        public string Tag { get; set; }

        /// <summary>
        ///     文章属性值
        /// </summary>
        [Display(Name = "文章属性")]
        public string Character { get; set; }

        /// <summary>
        ///     文章属性值ID
        /// </summary>
        [Display(Name = "文章属性ID")]
        public string CharacterID { get; set; }

        /// <summary>
        ///     Hot
        /// </summary>
        [Display(Name = "Hot")]
        public string Hot { get; set; }

        /// <summary>
        ///     Head
        /// </summary>
        [Display(Name = "Head")]
        public string Head { get; set; }

        /// <summary>
        ///     Recommend
        /// </summary>
        [Display(Name = "Recommend")]
        public string Recommend { get; set; }

        /// <summary>
        ///     文章的作者
        /// </summary>
        [Display(Name = "作者")]
        public string Author { get; set; }

        /// <summary>
        ///     文章的浏览（点击）数
        /// </summary>
        [Display(Name = "点击数")]
        public int? HitsNum { get; set; }

        /// <summary>
        ///     文章的评论数
        /// </summary>
        [Display(Name = "评论数")]
        public int? CommentNum { get; set; }

        /// <summary>
        ///     文章是否在前台显示
        /// </summary>
        [Display(Name = "是否显示")]
        public bool IsDisplay { get; set; }

        /// <summary>
        ///     文章审核状态
        /// </summary>
        [Display(Name = "审核状态")]
        public string ApprovalStatus { get; set; }

        /// <summary>
        ///     文章审核人
        /// </summary>
        [Display(Name = "审核人")]
        public string Approver { get; set; }

        /// <summary>
        ///     文章审核时间
        /// </summary>
        [Display(Name = "审核时间")]
        public string ApprovedOn { get; set; }

        /// <summary>
        ///     文章是否允许评论
        /// </summary>
        [Display(Name = "是否允许评论")]
        public bool CanComment { get; set; }

        /// <summary>
        ///     文章是否回收
        /// </summary>
        public bool IsTrash { get; set; }

        /// <summary>
        ///     文章是否草稿
        /// </summary>
        public bool IsDraft { get; set; }

        /// <summary>
        ///     文章来源
        /// </summary>
        [Display(Name = "文章来源")]
        public string From { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        [Display(Name = "发布时间")]
        public string CreatedOn { get; set; }

        /// <summary>
        ///     发布人
        /// </summary>
        [Display(Name = "发布人")]
        public string Creator { get; set; }

        /// <summary>
        ///     SEO标题
        /// </summary>
        [Display(Name = "SEO标题")]
        public string SeoTitle { get; set; }

        /// <summary>
        ///     SEO关键字
        /// </summary>
        [Display(Name = "SEO关键字")]
        public string SeoKeys { get; set; }

        /// <summary>
        ///     SEO描述
        /// </summary>
        [Display(Name = "SEO描述")]
        public string SeoDescription { get; set; }

        /// <summary>
        ///     修改时间
        /// </summary>
        [Display(Name = "修改时间")]
        public string ModifiedOn { get; set; }

        /// <summary>
        ///     修改人
        /// </summary>
        [Display(Name = "修改人")]
        public string Modificator { get; set; }

        /// <summary>
        ///     复制实体类的值到试图模型。
        /// </summary>
        /// <param name="entity"></param>
        public void CopyEntity(FeArticle entity)
        {
            Id = entity.Id;
            Title = entity.Title;
            TitleValue = entity.TitleValue;
            Category = entity.Category.Name;
            CategoryID = entity.Category.Id;
            SortOrder = entity.SortOrder;
            ImageFileId = entity.ImageFileId;
            Content = entity.Content;

            Content = Content.Replace("~/file?id=", HttpContext.Current.Request.ApplicationPath + "/file?id=");

            IsDisplay = entity.IsDisplay;
            CanComment = entity.CanComment;
            Author = entity.Author;
            HitsNum = entity.HitsNum;
            From = entity.From;
            CreatedOn = entity.CreatedOn.ToString();
            Creator = entity.Creator.CombinedLabel; //创建人
            SeoTitle = entity.SeoTitle;
            SeoDescription = entity.SeoDescription;
            Tag = entity.Tag;
            SeoKeys = entity.SeoKeys;
            Character = entity.Character;
            CharacterID = entity.CharacterId;
            Modificator = entity.Modificator != null ? entity.Modificator.CombinedLabel : ""; //修改人
            ModifiedOn = entity.ModifiedOn.ToString();
            Approver = entity.Approver != null ? entity.Approver.CombinedLabel : ""; //评论用户
            ApprovedOn = entity.ApprovedOn.ToString();
            ApprovalStatus = entity.ApprovalStatus.Label;
            CommentNum = entity.CommentNum;
        }
    }
}