using System.Collections.Generic;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     模板引擎资源模型
    /// </summary>
    public class FeTemplateEngineResourcesJsonModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeTemplateEngineResourcesJsonModel()
        {
            Items = new List<FeTemplateEngineResourceItemModel>();
        }

        /// <summary>
        ///     模板组件路径
        /// </summary>
        public string TemplateComponentPath { get; set; }

        /// <summary>
        /// 组件标签名
        /// </summary>
        public string TagName { get; set; }

        /// <summary>
        ///     资源项
        /// </summary>
        public List<FeTemplateEngineResourceItemModel> Items { get; set; }
    }
}