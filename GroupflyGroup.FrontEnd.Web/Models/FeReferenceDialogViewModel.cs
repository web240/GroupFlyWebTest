using System;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     查看引用弹框控件视图模型
    /// </summary>
    [Serializable]
    public class FeReferenceDialogViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeReferenceDialogViewModel()
        {
            Width = 775;
            Height = 366;
            PageSize = 10;
        }

        /// <summary>
        ///     分页大小
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        ///     请求数据的url
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        ///     控件的id
        /// </summary>
        public string ControlId { get; set; }

        /// <summary>
        ///     宽度
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        ///     高度
        /// </summary>
        public int Height { get; set; }
    }
}