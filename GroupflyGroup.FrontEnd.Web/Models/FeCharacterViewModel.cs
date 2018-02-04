using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace GroupflyGroup.FrontEnd.Web.Models
{

    /// <summary>
    /// 文章属性视图模型。
    /// </summary>
    [Serializable]
    public class FeCharacterViewModel : BaseViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeCharacterViewModel()
        {
            FeFeCharacterImageDirectoryId = FeFileIDs.FeArticleCharacter;
        }

        /// <summary>
        /// 文章属性id
        /// </summary>
        public string FeFeCharacterImageDirectoryId
        {
            get;
            set;
        }



        /// <summary>
        /// 文章属性id
        /// </summary>
        public string Id
        {
            get;
            set;
        }

        /// <summary>
        /// 文章属性的名称
        /// </summary>
        [Required]
        [Display(Name = "属性名称")]
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// 文章属性的显示内容
        /// </summary>
        public string Label
        {
            get;
            set;
        }

        /// <summary>
        /// 文章属性的排序序号
        /// </summary>
        [Display(Name = "排序")]
        public decimal? SortOrder
        {
            get;
            set;
        }

        /// <summary>
        /// Font Awesome字体图标名称
        /// </summary>
        [Display(Name = "字体图标")]
        public string Icon
        {
            get;
            set;
        }

        /// <summary>
        /// 文章属性是否在前台显示
        /// </summary>
        [Display(Name = "是否启用")]
        public string IsDisplay
        {
            get;
            set;
        }

        /// <summary>
        /// 大图标
        /// </summary>
        [Display(Name="大图标")]
        public string BigIcon { get; set; }

        /// <summary>
        /// 小图标
        /// </summary>
        [Display(Name = "小图标")]
        public string SmallIcon { get; set; }

        /// <summary>
        /// 选择状态 0未选 1半选 2全选
        /// </summary>
        public int IsChecked { get; set; }

        /// <summary>
        /// 复制实体类的值到试图模型。
        /// </summary>
        /// <param name="entity"></param>
        public void CopyEntity(FeCharacter entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            Label = entity.Label;
            SortOrder = entity.SortOrder;
            Icon = entity.Icon;      
            IsDisplay = entity.IsDisplay ? "on" : "off";
            BigIcon = entity.BigIcon==null?null:entity.BigIcon.Id;
            SmallIcon = entity.SmallIcon == null ? null : entity.SmallIcon.Id;
        }

        /// <summary>
        /// 操作类型。
        /// 1=新增，2=修改。
        /// </summary>
        public int OperationType
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        public string DefaultId_Hot = "347fffd1e0a7404892c781a61bd464b1@FeCharacter";

        /// <summary>
        /// 
        /// </summary>
        public string DefaultId_Head = "ab6c86756f604da1bdbd7e19dc46575e@FeCharacter";

        /// <summary>
        /// 
        /// </summary>
        public string DefaultId_Recommend = "19930431d58247529fea1d29a48cada4@FeCharacter";

    }


}