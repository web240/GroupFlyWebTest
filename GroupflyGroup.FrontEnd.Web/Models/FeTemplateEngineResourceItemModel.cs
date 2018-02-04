namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     模板引擎资源项模型
    /// </summary>
    public class FeTemplateEngineResourceItemModel
    {
        /// <summary>
        ///     资源项的路径
        /// </summary>
        public string ResourceItemPath { get; set; }

        /// <summary>
        ///     资源项类型：js，css
        /// </summary>
        public string ResourceItemType { get; set; }
    }
}