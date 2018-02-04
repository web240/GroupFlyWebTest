using System;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     表格控件列信息
    /// </summary>
    [Serializable]
    public class FeDataGridColumnViewModel
    {
        /// <summary>
        ///     列的字段名。
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        ///     列的字段名。
        /// </summary>
        public string Field { get; set; }

        /// <summary>
        ///     列的宽度。如果未定义，则宽度会自动扩展以适应它的内容。没有定义宽度将会降低性能。
        /// </summary>
        public string Width { get; set; }

        /// <summary>
        ///     指示如何对齐该列的数据，可以用 'left'、'right'、'center'。
        /// </summary>
        public string Align { get; set; }

        /// <summary>
        ///     指示如何对齐该列的头部，可能的值：'left'、'right'、'center'。如果没有分配值，则头部对齐方式将与通过 'align' 属性定义的数据对齐方式一致。
        /// </summary>
        public string HAlign { get; set; }

        /// <summary>
        ///     设置为 true，则允许该列被排序。
        /// </summary>
        public bool SorTable { get; set; }

        /// <summary>
        ///     设置为 true，则允许该列可调整尺寸。
        /// </summary>
        public bool ReSizable { get; set; }

        /// <summary>
        ///     设置为 true，则隐藏该列。
        /// </summary>
        public bool Hidden { get; set; }

        /// <summary>
        /// 设置为 true，则显示复选框。复选框有固定宽度。
        /// </summary>
        public bool Checkbox { get; set; }

        /// <summary>
        /// 单元格的格式化函数，需要三个参数：
        /// value：字段的值。
        /// rowData：行的记录数据。
        /// rowIndex：行的索引。
        /// </summary>
        public string Formatter { get; set; }

    }
}