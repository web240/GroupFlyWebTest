using System;
using System.ComponentModel.DataAnnotations;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     文章列表树模型。
    /// </summary>
    [Serializable]
    public class FeArticleCategoryViewModel : BaseViewModel
    {
        /// <summary>
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     名称
        /// </summary>
        [Display(Name = "分类名称")]
        [Required]
        public string Name { get; set; }

        /// <summary>
        ///     父分类
        /// </summary>
        [Display(Name = "上级分类")]
        public string ParentId { get; set; }

        /// <summary>
        ///     用于easyui树控件的默认父节点id字段。
        /// </summary>
        public string _parentId
        {
            get { return ParentId; }
        }

        /// <summary>
        ///     上级分类名称路径
        /// </summary>
        [Required]
        [Display(Name = "上级分类")]
        public string ParentNamePath { get; set; }

        /// <summary>
        ///     序号
        /// </summary>
        [Display(Name = "分类排序")]
        [DataType(DataType.Currency)]
        public decimal? SortOrder { get; set; }

        /// <summary>
        ///     SEO标题
        /// </summary>
        [Display(Name = "SEO标题")]
        public string SeoTitle { get; set; }

        /// <summary>
        ///     SEO关键字
        /// </summary>
        [Display(Name = "SEO关键字")]
        public string SeoKeys { get; set; }

        /// <summary>
        ///     SEO关键字备注提示。
        /// </summary>
        public string SeoKeyRemark { get; set; }

        /// <summary>
        ///     SEO描述
        /// </summary>
        [Display(Name = "SEO描述")]
        public string SeoDescription { get; set; }

        /// <summary>
        ///     显示
        /// </summary>
        public bool IsDisplay { get; set; }

        /// <summary>
        ///     描述当前业务的操作类型。
        ///     1=添加
        ///     2=修改
        /// </summary>
        public int OperationType { get; set; }

        /// <summary>
        ///     是否提示错误信息。
        /// </summary>
        public bool IsError { get; set; }

        /// <summary>
        ///     错误信息内容。
        /// </summary>
        public string ErrorMessage { get; set; }


        /// <summary>
        ///     复制实体类的值到试图模型。
        /// </summary>
        /// <param name="entity"></param>
        public void CopyEntity(FeArticleCategory entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            ParentId = !IsExists(entity.Parent) ? null : entity.Parent.Id;
        }

        private bool IsExists(Objekt obj)
        {
            if (obj != null && obj.IsExists())
            {
                return true;
            }

            return false;
        }
    }
}