using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Linq;
using System.Text;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    /// 图片尺寸
    /// </summary>
    [Serializable]
    public class FeWatermarkModel : BaseViewModel
    {
        /// <summary>
        /// 图片名称。
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// 图片名称。
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 水印类型
        /// </summary>
        public string Type { get; set; }     

        /// <summary>
        /// 文字内容
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// 文字
        /// </summary>
        public string Font { get; set; }

        /// <summary>
        /// 字体大小
        /// </summary>
        public string FontSize { get; set; }

        /// <summary>
        /// 字体颜色
        /// </summary>
        public string FontColor { get; set; }

        /// <summary>
        /// 字体透明度
        /// </summary>
        public int Transparency { get; set; }

        /// <summary>
        /// 字体透明度
        /// </summary>
        public string Location { get; set; }

        /// <summary>
        /// 是否显示
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// 水印图片ID
        /// </summary>
        public string imageFile { get; set; }

        /// <summary>
        /// 添加人
        /// </summary>
        public string Creator { get; set; }

        /// <summary>
        /// 添加时间
        /// </summary>
        public string CreatedOn { get; set; }


    }

}
