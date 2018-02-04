using System;
using System.Collections.Generic;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     图片查看控件视图模型
    /// </summary>
    [Serializable]
    public class FeImageViewerViewModel
    {
        /// <summary>
        ///     实例化模型
        /// </summary>
        public FeImageViewerViewModel()
        {
            ImageSizeList = new List<FeImageViewerSizeListItemViewModel>();
            ImageList = new List<FeImageViewerListItemViewModel>();
        }

        /// <summary>
        ///     图片的url
        /// </summary>
        public string ImageUrl { get; set; }

        /// <summary>
        ///     图片名
        /// </summary>
        public string ImageName { get; set; }

        /// <summary>
        ///     创建时间
        /// </summary>
        public string CreateOn { get; set; }

        /// <summary>
        ///     创建人
        /// </summary>
        public string Creator { get; set; }

        /// <summary>
        ///     图片文件大小
        /// </summary>
        public string FileSize { get; set; }

        /// <summary>
        ///     图片尺寸
        /// </summary>
        public string ImageSize { get; set; }

        /// <summary>
        ///     图片位置
        /// </summary>
        public string ImageLocation { get; set; }

        /// <summary>
        ///     原图宽度
        /// </summary>
        public int? Width { get; set; }

        /// <summary>
        ///     原图高度
        /// </summary>
        public int? Height { get; set; }

        /// <summary>
        ///     图片尺寸列表
        /// </summary>
        public List<FeImageViewerSizeListItemViewModel> ImageSizeList { get; set; }

        /// <summary>
        ///     图片列表
        /// </summary>
        public List<FeImageViewerListItemViewModel> ImageList { get; set; }
    }
}