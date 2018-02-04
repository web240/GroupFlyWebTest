using System.ComponentModel.DataAnnotations;

namespace GroupflyGroup.FrontEnd.Web.Models
{

    /// <summary>
    /// 文章分类选择控件模型。
    /// </summary>
    public class FeArticleCategorySeachBoxViewModel
    {

        /// <summary>
        /// 当前分类的id。
        /// </summary>
        public string Id
        {
            get;
            set;
        }

        /// <summary>
        /// guid。
        /// </summary>
        public string Guid
        {
            get;
            set;
        }

        /// <summary>
        /// 搜索框id。
        /// </summary>
        public string TreeviewSelectId
        {
            get
            {
                return "TreeviewSelect" + Guid;
            }
        }

        /// <summary>
        /// 弹出框id。
        /// </summary>
        public string TreeDialogId
        {
            get
            {
                return "TreeDialog" + Guid;
            }
        }

        /// <summary>
        /// 树控件id。
        /// </summary>
        public string TreeTableId
        {
            get
            {
                return "TreeTable" + Guid;
            }
        }

        /// <summary>
        /// 选择值控件的id。
        /// </summary>
        public string TreeviewSelectValueId
        {
            get
            {
                return "TreeviewSelectValue" + Guid;
            }
        }

        /// <summary>
        /// 父分类id。
        /// </summary>
        public string ParentId
        {
            get; set;
        }

        /// <summary>
        /// 父分类路径。
        /// </summary>
        public string ParentNamePath
        {
            get; set;
        }

        /// <summary>
        /// 引用试图中父节点id在视图中的名称。
        /// </summary>
        public string ParentIdModelFieldName
        {
            get; set;
        }

        /// <summary>
        /// 引用试图中父节点路径在视图中的名称。
        /// </summary>
        public string ParentNamePathModelFieldName
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
        /// 异步请求时候显示loading容器的id
        /// </summary>
        public string LoadingIndicatorId
        {
            get;
            set;
        }

    }
}