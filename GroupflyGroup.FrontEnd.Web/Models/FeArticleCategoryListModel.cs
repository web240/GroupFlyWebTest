using System;
using System.Collections.Generic;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Service;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     文章分类呈现列表模型
    /// </summary>
    public class FeArticleCategoryListModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeArticleCategoryListModel()
        {
            Items = new List<FeArticleCategoryListItemModel>();
            IsLastPage = false;
        }

        /// <summary>
        ///     是否为最后一页
        /// </summary>
        public bool IsLastPage { get; set; }

        /// <summary>
        ///     分类名称
        /// </summary>
        public string CategoryName { get; set; }

        /// <summary>
        ///     标题名称
        /// </summary>
        public string TitleName { get; set; }

        /// <summary>
        ///     列表项集合
        /// </summary>
        public List<FeArticleCategoryListItemModel> Items { get; set; }

        ///// <summary>
        /////     热点
        ///// </summary>
        //public string Hot { get; set; }

        ///// <summary>
        /////     头条
        ///// </summary>
        //public string Head { get; set; }

        ///// <summary>
        /////     推荐
        ///// </summary>
        //public string Recommend { get; set; }
    }

    /// <summary>
    ///     文章分类呈现列表项模型
    /// </summary>
    public class FeArticleCategoryListItemModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeArticleCategoryListItemModel()
        {
            Tags = new List<string>();
            CharacterId = new List<string>();
        }

        /// <summary>
        ///     实例化
        /// </summary>
        /// <param name="feArticle"></param>
        public FeArticleCategoryListItemModel(FeArticle feArticle) : this()
        {
            Id = feArticle.Id;
            ImageId = feArticle.ImageFileId;
            Title = feArticle.TitleValue;
            CategoryName = feArticle.Category.Name;
            CategoryId = feArticle.Category.Id;
            if (feArticle.CreatedOn != null) CreatedOn = feArticle.CreatedOn.Value.ToString("yyyy-MM-dd HH:mm");
            Content = HtmlFormat.NoHtml(feArticle.Content);

            var tags = feArticle.Tag.Split(new[] {","}, StringSplitOptions.RemoveEmptyEntries);

            foreach (var tag in tags)
            {
                Tags.Add(tag);
            }

            var characterIds = feArticle.CharacterId.Split(new[] {","}, StringSplitOptions.RemoveEmptyEntries);

            foreach (var characterId in characterIds)
            {
                CharacterId.Add(characterId);
            }

            if (feArticle.CreatedOn.HasValue)
            {
                TimeSpan timeSpan = DateTime.Now - feArticle.CreatedOn.Value;

                if (timeSpan.TotalHours < 1)
                {
                    if (timeSpan.Minutes != 0)
                    {
                        Time = timeSpan.Minutes.ToString() + "分钟前";
                    }
                    else
                    {
                        Time = "1分钟前";
                    }
                }
                else if (timeSpan.TotalDays < 1)
                {
                    Time = timeSpan.Hours.ToString() + "小时前";
                }
                else if (DateTime.Now < feArticle.CreatedOn.Value.AddMonths(1))
                {
                    Time = timeSpan.Days.ToString() + "天前";
                }
                else if (DateTime.Now < feArticle.CreatedOn.Value.AddYears(1))
                {
                    for (int i = 0; i < 13; i++)
                    {
                        if (feArticle.CreatedOn.Value.AddMonths(i) > DateTime.Now)
                        {
                            Time = i.ToString() + "月前";
                            break;
                        }
                    }
                }
                else
                {
                    int intyear =  DateTime.Now.Year - feArticle.CreatedOn.Value.Year;
                    if (feArticle.CreatedOn.Value.AddYears(intyear) > DateTime.Now)
                    {
                        intyear = intyear - 1;
                    }
                    Time = intyear.ToString() + "年前";
                }

            }

        }

        /// <summary>
        ///     文章id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     文章图片的url
        /// </summary>
        public string ImageId { get; set; }

        /// <summary>
        ///     文章标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        ///     所在分类名
        /// </summary>
        public string CategoryName { get; set; }

        /// <summary>
        ///     所在分id
        /// </summary>
        public string CategoryId { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        public string CreatedOn { get; set; }

        /// <summary>
        ///     标签集合
        /// </summary>
        public List<string> Tags { get; set; }

        /// <summary>
        ///     内容
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        ///     时间
        /// </summary>
        public string Time { get; set; }

        /// <summary>
        ///     属性id集合
        /// </summary>
        public List<string> CharacterId { get; set; }
    }
}