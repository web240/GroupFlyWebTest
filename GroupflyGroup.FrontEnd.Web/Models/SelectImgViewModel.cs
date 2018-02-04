using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class SelectImgViewModel
    {
        /// <summary>
        /// guid。
        /// </summary>
        public string Guid
        {
            get;
            set;
        }
        public string DirectoryId
        {
            get;
            set;
        }
        /// <summary>
        /// 是否多选
        /// </summary>
        public bool IsMultiselect { get; set; }
        /// <summary>
        /// 图片选择树数据
        /// </summary>
        public string TreeData { get; set; }
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
        /// 查询按钮ID。
        /// </summary>
        public string QueryId
        {
            get
            {
                return "Query" + Guid;
            }
        }
        /// <summary>
        /// 上传按钮ID。
        /// </summary>
        public string UnloadId
        {
            get
            {
                return "Unload" + Guid;
            }
        }
        /// <summary>
        /// 搜索框ID
        /// </summary>
        public string SeachBoxId
        {
            get
            {
                return "SeachBox" + Guid;
            }
        }
        /// <summary>
        /// 布局控件的id。
        /// </summary>
        public string LayoutId
        {
            get
            {
                return "Layout" + Guid;
            }
        }
        /// <summary>
        /// 内容框id。
        /// </summary>
        public string PanelId
        {
            get
            {
                return "Panel" + Guid;
            }
        }

        /// <summary>
        /// 图片列表容器id。
        /// </summary>
        public string ImgPanelId
        {
            get
            {
                return "ImgPanel" + Guid;
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
        /// 树控件id。
        /// </summary>
        public string TreeId
        {
            get
            {
                return "Tree" + Guid;
            }
        }

        /// <summary>
        /// 树控件id。
        /// </summary>
        public string PaginationId
        {
            get
            {
                return "Pagination" + Guid;
            }
        }
    }
}