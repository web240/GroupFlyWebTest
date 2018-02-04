using System;
using System.Collections.Generic;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     frontend层datagrid数据源
    /// </summary>
    [Serializable]
    public class FeDataGridViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeDataGridViewModel()
        {
            Items = new List<FeDataGridItemViewModel>();
            Navigation = new List<FeDataGridNavigationItemViewModel>();
            Columns = new List<FeDataGridColumnViewModel>();
            RecordTotal = 1;
            PageSize = 10;
            PageNumber = 1;
            ShowRefresh = true;
            PageList = new List<int>();
        }

        /// <summary>
        ///     记录总数，默认值：1
        /// </summary>
        public int RecordTotal { get; set; }

        /// <summary>
        ///     每页显示的最大记录数，默认值：10
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        ///     创建分页时显示的页码，默认值：1
        /// </summary>
        public int PageNumber { get; set; }

        /// <summary>
        ///     用户能改变页面尺寸。pageList 属性定义了能改成多大的尺寸，默认值：[10,20,30,50]
        /// </summary>
        public List<int> PageList { get; set; }

        /// <summary>
        ///     定义数据是否正在加载，默认值：false
        /// </summary>
        public bool Loading { get; set; }

        /// <summary>
        ///     定义是否显示刷新按钮，默认值：true
        /// </summary>
        public bool ShowRefresh { get; set; }

        /// <summary>
        ///     在 input 组件之前显示 label
        /// </summary>
        public string BeforePageText { get; set; }

        /// <summary>
        ///     在 input 组件之后显示 label
        /// </summary>
        public string AfterPageText { get; set; }

        /// <summary>
        ///     显示 {from} to {to} of {total} 页面信息
        /// </summary>
        public string DisplayMsg { get; set; }

        /// <summary>
        ///     大小12.3G 共12个文件夹和3个图片
        /// </summary>
        public string NavRightText { get; set; }

        /// <summary>
        ///     所在目录id
        /// </summary>
        public string DirectoryId { get; set; }

        /// <summary>
        ///     所在目录名
        /// </summary>
        public string DirectoryName { get; set; }

        /// <summary>
        ///     数据集合
        /// </summary>
        public List<FeDataGridItemViewModel> Items { get; set; }

        /// <summary>
        ///     当前目录的导航
        /// </summary>
        public List<FeDataGridNavigationItemViewModel> Navigation { get; set; }

        /// <summary>
        ///     列表视图中的列信息
        /// </summary>
        public List<FeDataGridColumnViewModel> Columns { get; set; }
    }
}