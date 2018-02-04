using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     频道试图模型。
    /// </summary>
    [Serializable]
    public class FeChannelViewModel : BaseViewModel
    {
        /// <summary>
        ///     实例化。
        /// </summary>
        public FeChannelViewModel()
        {
            TemplateList = new List<SelectListItem>();
        }

        /// <summary>
        ///     logo文件id
        /// </summary>
        public string LogoId { get; set; }

        /// <summary>
        ///     logo文件名
        /// </summary>
        public string LogoName { get; set; }

        /// <summary>
        /// logo权限编码
        /// </summary>
        public string LogoPermissionCode { get; set; }

        /// <summary>
        ///     id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     频道名称。
        /// </summary>
        [Display(Name = "频道名称")]
        [Required]
        public string Name { get; set; }

        /// <summary>
        ///     分类id。
        /// </summary>
        [Display(Name = "绑定分类")]
        [Required]
        public string CategoryId { get; set; }

        /// <summary>
        ///     分类名称
        /// </summary>
        public string CategoryName { get; set; }

        /// <summary>
        ///     分类名称的路径。
        /// </summary>
        public string CategoryNamePath { get; set; }

        /// <summary>
        ///     模板的id。
        /// </summary>
        [Display(Name = "频道模板")]
        public string TemplateId { get; set; }

        /// <summary>
        ///     模板的名称。
        /// </summary>
        public string TemplateName { get; set; }

        /// <summary>
        ///     频道是否在前台显示
        /// </summary>
        [Display(Name = "添加到频道导航")]
        public string IsDisplay { get; set; }

        /// <summary>
        ///     频道logo
        /// </summary>
        [Display(Name = "频道LOGO")]
        public string Logo { get; set; }

        /// <summary>
        ///     频道的排序序号
        /// </summary>
        [Display(Name = "排序")]
        [DataType(DataType.Currency)]
        public decimal? SortOrder { get; set; }

        /// <summary>
        ///     SEO标题
        /// </summary>
        [Display(Name = "SEO标题")]
        public string SeoTitle { get; set; }

        /// <summary>
        ///     SEO描述
        /// </summary>
        [Display(Name = "SEO描述")]
        public string SeoDescription { get; set; }

        /// <summary>
        ///     操作类型。
        ///     1=新增，2=修改。
        /// </summary>
        public int OperationType { get; set; }

        /// <summary>
        ///     seo关键字。
        /// </summary>
        [Display(Name = "SEO关键字")]
        public string SeoKeys { get; set; }

        /// <summary>
        ///     SEO关键字备注提示。
        /// </summary>
        public string SeoKeyRemark { get; set; }

        /// <summary>
        ///     访问域名类型，使用目录名称、二级域名、顶级域名
        /// </summary>
        [Display(Name = "访问域名")]
        [Required]
        public string DomainType { get; set; }

        /// <summary>
        ///     目录输入文本
        /// </summary>
        public string DirectoryNameDomainText { get; set; }

        /// <summary>
        ///     二级域名输入文本
        /// </summary>
        public string SecondDomainDomainText { get; set; }

        /// <summary>
        ///     顶级域名输入文本
        /// </summary>
        public string TopDomainDomainText { get; set; }

        /// <summary>
        ///     模板列表
        /// </summary>
        public List<SelectListItem> TemplateList { get; set; }

        /// <summary>
        ///     url
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// url的ID
        /// </summary>
        public string UrlId { get; set; }

        /// <summary>
        ///     复制实体类的值到试图模型。
        /// </summary>
        /// <param name="entity"></param>
        public void CopyEntity(FeChannel entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            CategoryId = !IsExists(entity.Category) ? null : entity.Category.Id;
            CategoryNamePath = !IsExists(entity.Category) ? null : entity.Category.RootPath;
            CategoryName = !IsExists(entity.Category) ? null : entity.Category.Name;
            TemplateId = !IsExists(entity.Template) ? null : entity.Template.Id;
            TemplateName = !IsExists(entity.Template) ? null : entity.Template.Name;
            IsDisplay = entity.IsDisplay ? "on" : "off";
            SortOrder = entity.SortOrder;
            SeoTitle = entity.SeoTitle;
            SeoDescription = entity.SeoDescription;
            SeoKeys = entity.SeoKeys;
            SeoKeyRemark = "(','号分开)";
            DomainType = !IsExists(entity.DomainType) ? null : entity.DomainType.Id;
            Url = !IsExists(entity.Url) ? null : entity.Url.url;
            UrlId = !IsExists(entity.Url) ? null : entity.Url.Id;

            switch (DomainType)
            {
                case FeValueIDs.FeDomainType_DirectoryName:
                    DirectoryNameDomainText = entity.DomainText;
                    break;
                case FeValueIDs.FeDomainType_SecondDomain:
                    SecondDomainDomainText = entity.DomainText;
                    break;
                case FeValueIDs.FeDomainType_TopDomain:
                    TopDomainDomainText = entity.DomainText;
                    break;
                default:
                    break;
            }
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