using System;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     图片尺寸项模型
    /// </summary>
    [Serializable]
    public class FeImageViewerSizeListItemViewModel
    {
        /// <summary>
        ///     文件id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        ///     图片尺寸
        /// </summary>
        public string Size { get; set; }

        /// <summary>
        ///     图片的url
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        ///     面积
        /// </summary>
        public int Area { get; set; }
    }
}