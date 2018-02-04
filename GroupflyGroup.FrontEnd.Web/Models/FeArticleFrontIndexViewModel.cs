using System.Collections.Generic;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     文章前台主页视图模型
    /// </summary>
    public class FeArticleFrontIndexViewModel : BaseViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeArticleFrontIndexViewModel()
        {
            Categories = new List<string>();
            Hot = FeCharacterIDs.Hot;
            Head = FeCharacterIDs.Head;
            Recommend = FeCharacterIDs.Recommend;
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
        ///     主栏目显示条数
        /// </summary>
        public int ColumnCount { get; set; }

        /// <summary>
        ///     右侧栏目显示条数
        /// </summary>
        public int RightColumnCount { get; set; }

        /// <summary>
        ///     标签显示个数
        /// </summary>
        public int FeTagCount { get; set; }

        /// <summary>
        ///     分类
        /// </summary>
        public List<string> Categories { get; set; }

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