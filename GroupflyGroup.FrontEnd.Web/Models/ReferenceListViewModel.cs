using System.Collections.Generic;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     引用列表
    /// </summary>
    public class ReferenceListViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public ReferenceListViewModel()
        {
            Items = new List<ReferenceListItemViewModel>();
        }

        /// <summary>
        ///     引用列表
        /// </summary>
        public List<ReferenceListItemViewModel> Items { get; set; }

        /// <summary>
        ///     记录总数
        /// </summary>
        public int Total { get; set; }
    }

    /// <summary>
    ///     引用列表数据项
    /// </summary>
    public class ReferenceListItemViewModel
    {
        /// <summary>
        ///     引用对象id
        /// </summary>
        public string RefObjectId { get; set; }

        /// <summary>
        ///     引用对象
        /// </summary>
        public string RefObject { get; set; }

        /// <summary>
        ///     引用属性
        /// </summary>
        public string RefPorperty { get; set; }

        /// <summary>
        ///     被引用对象
        /// </summary>
        public string SourceObject { get; set; }
    }
}