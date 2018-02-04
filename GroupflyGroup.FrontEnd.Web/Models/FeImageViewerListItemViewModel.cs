using System;
using System.Collections.Generic;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     图片列表项模型
    /// </summary>
    [Serializable]
    public class FeImageViewerListItemViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeImageViewerListItemViewModel()
        {
            ImageSizeList = new List<FeImageViewerListItemViewModel>();
        }

        /// <summary>
        ///     如果是图片包，原图的id
        /// </summary>
        public string SourceImageId { get; set; }

        /// <summary>
        ///     图片尺寸列表，不包括原图
        /// </summary>
        public List<FeImageViewerListItemViewModel> ImageSizeList { get; set; }

        /// <summary>
        ///     希望宽度，图片缩放时，希望缩放为300*300的尺寸，但为了规避不失真，实际尺寸并不是希望的尺寸。
        ///     实际尺寸可查看文件中的width和height
        /// </summary>
        public int? HopeWidth { get; set; }

        /// <summary>
        ///     希望高度，图片缩放时，希望缩放为300*300的尺寸，但为了规避不失真，实际尺寸并不是希望的尺寸。
        ///     实际尺寸可查看文件中的width和height
        /// </summary>
        public int? HopeHeight { get; set; }

        /// <summary>
        ///     图片文件id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     图片url
        /// </summary>
        public string ImageUrl { get; set; }

        /// <summary>
        ///     宽度
        /// </summary>
        public int? Width { get; set; }

        /// <summary>
        ///     高度
        /// </summary>
        public int? Height { get; set; }

        /// <summary>
        ///     是否为图片包
        /// </summary>
        public bool IsImagePack { get; set; }

        /// <summary>
        ///     图片名称
        /// </summary>
        public string Name { get; set; }
    }
}