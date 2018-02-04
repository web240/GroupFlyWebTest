using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    /// 资讯模板模型
    /// </summary>
    public class FeArticleTemplateModel
    {                                          
        /// <summary>
        /// 模板ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 模板名称
        /// </summary>
        public string TemplateName { get; set; }

        /// <summary>
        /// 目录名称
        /// </summary>
        public string DirectoryName { get; set; }

        /// <summary>
        /// 图片路径
        /// </summary>
        public string ImageURL { get; set; }

        /// <summary>
        /// 模板类型
        /// </summary>
        public string TemplateType { get; set; }

        /// <summary>
        /// 模板类型ID
        /// </summary>
        public string TemplateTypeId { get; set; }

        /// <summary>
        /// 备份时间
        /// </summary>
        public DateTime? CreatedOn { get; set; }

        /// <summary>
        /// 是否默认
        /// </summary>
        public Boolean IsDefault { get; set; }

        /// <summary>
        /// 是否被应用
        /// </summary>
        public Boolean IsEnable { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Icon { get; set; }
        /// <summary>
        /// 模板说明
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// 是否为系统默认模板
        /// </summary>
        public Boolean IsSystemTemplate { get; set; }
        /// <summary>
        /// 备份源
        /// </summary>
        public ObjectFramework.FeTemplate BackupSource { get; set; }
    }


    /// <summary>
    /// 资讯模板列表模型
    /// </summary>
    public class FeArticleTemplateModelList:BaseViewModel
    {
        public List<FeArticleTemplateModel> listArticleTemplateModel { get; set; }
        public List<FeArticleTemplateModel> listChannelTemplateModel { get; set; }
    }

}