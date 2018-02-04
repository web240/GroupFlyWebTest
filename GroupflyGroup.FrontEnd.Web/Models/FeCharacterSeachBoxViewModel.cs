using System.ComponentModel.DataAnnotations;

namespace GroupflyGroup.FrontEnd.Web.Models
{

    /// <summary>
    /// 文章分类选择控件模型。
    /// </summary>
    public class FeCharacterSeachBoxViewModel
    {

        /// <summary>
        /// guid。
        /// </summary>
        public string Guid
        {
            get;
            set;
        }
        /// <summary>
        /// 当前属性的id。
        /// </summary>
        public string Id
        {
            get;
            set;
        }

        /// <summary>
        /// 当前属性的文本。
        /// </summary>
        public string Text
        {
            get;
            set;
        }

        /// <summary>
        /// 控件ID名称
        /// </summary>
        public string ControlIdName
        {
            get; set;
        }

        /// <summary>
        /// 控件文本名称。
        /// </summary>
        public string ControlTextName
        {
            get; set;
        }

        /// <summary>
        /// 文本提示内容。
        /// </summary>
        public string Title
        {
            get;
            set;
        }

        /// <summary>
        /// 宽度。
        /// </summary>
        public int Width
        {
            get;
            set;
        }
        /// <summary>
        /// 搜索框id。
        /// </summary>
        public string SelectTextId
        {
            get
            {
                return "Select" + Guid;
            }
        }

        /// <summary>
        /// 选择值控件的id。
        /// </summary>
        public string SelectValueId
        {
            get
            {
                return "SelectValue" + Guid;
            }
        }
        /// <summary>
        /// 弹出框id。
        /// </summary>
        public string DialogId
        {
            get
            {
                return "Dialog" + Guid;
            }
        }

        /// <summary>
        /// 列表控件id。
        /// </summary>
        public string TableId
        {
            get
            {
                return "Table" + Guid;
            }
        }
    }
}