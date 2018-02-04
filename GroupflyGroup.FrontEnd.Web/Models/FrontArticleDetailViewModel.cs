using System.Collections.Generic;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     文章详情视图模型
    /// </summary>
    public class FrontArticleDetailViewModel : BaseViewModel
    {
        /// <summary>
        ///     初始化
        /// </summary>
        public FrontArticleDetailViewModel()
        {
            Navigate = new List<NavigateItem>();
        }

        /// <summary>
        ///     导航
        /// </summary>
        public List<NavigateItem> Navigate { get; set; }

        /// <summary>
        ///     导航序列化为字符串格式
        /// </summary>
        public string NavigateString
        {
            get { return JsonConvert.SerializeObject(Navigate); }
        }

        /// <summary>
        ///     模板根目录的路径
        /// </summary>
        public string TemplateDirectoryPath { get; set; }

        /// <summary>
        ///     LOGO对象的id
        /// </summary>
        public string LogoId { get; set; }

        /// <summary>
        ///     ArticleId
        /// </summary>
        public string ArticleId { get; set; }

        /// <summary>
        ///     右侧列表显示数
        /// </summary>
        public int RightColumnCount { get; set; }

        /// <summary>
        ///     分类Id
        /// </summary>
        public string CategoryId { get; set; }

        /// <summary>
        ///     频道Id
        /// </summary>
        public string ChannelId { get; set; }

        /// <summary>
        ///     热点
        /// </summary>
        public string Hot { get; set; }

        /// <summary>
        ///     头条
        /// </summary>
        public string Head { get; set; }

        /// <summary>
        ///     推荐
        /// </summary>
        public string Recommend { get; set; }

    }
}