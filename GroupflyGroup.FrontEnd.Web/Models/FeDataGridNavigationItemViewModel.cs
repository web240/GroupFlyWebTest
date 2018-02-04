using System;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     控件导航
    /// </summary>
    [Serializable]
    public class FeDataGridNavigationItemViewModel
    {
        /// <summary>
        ///     显示的文本
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        ///     文件的id
        /// </summary>
        public string Id { get; set; }
    }
}