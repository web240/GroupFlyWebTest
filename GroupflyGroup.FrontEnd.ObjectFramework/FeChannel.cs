using System;
using System.Linq;
using System.Text;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     频道
    /// </summary>
    [Serializable]
    public class FeChannel : Objekt
    {
        /// <summary>
        ///     频道名称。
        /// </summary>
        public string Name
        {
            get { return GetProperty<string>(FePropertyNames.name); }
            set { SetProperty(FePropertyNames.name, value); }
        }

        /// <summary>
        ///     频道绑定的文章分类
        /// </summary>
        public FeArticleCategory Category
        {
            get { return GetProperty<FeArticleCategory>(FePropertyNames.category); }
            set { SetProperty(FePropertyNames.category, value); }
        }

        /// <summary>
        ///     频道对应的模板
        /// </summary>
        public FeTemplate Template
        {
            get { return GetProperty<FeTemplate>(FePropertyNames.template); }
            set { SetProperty(FePropertyNames.template, value); }
        }

        /// <summary>
        ///     频道是否在前台显示
        /// </summary>
        public bool IsDisplay
        {
            get { return GetProperty<bool>(FePropertyNames.isDisplay); }
            set { SetProperty(FePropertyNames.isDisplay, value); }
        }

        /// <summary>
        ///     频道的排序序号
        /// </summary>
        public decimal? SortOrder
        {
            get { return GetProperty<decimal>(FePropertyNames.sortOrder); }
            set { SetProperty(FePropertyNames.sortOrder, value); }
        }

        /// <summary>
        ///     SEO标题
        /// </summary>
        public string SeoTitle
        {
            get { return GetProperty<string>(FePropertyNames.seoTitle); }
            set { SetProperty(FePropertyNames.seoTitle, value); }
        }

        /// <summary>
        ///     SEO描述
        /// </summary>
        public string SeoDescription
        {
            get { return GetProperty<string>(FePropertyNames.seoDescription); }
            set { SetProperty(FePropertyNames.seoDescription, value); }
        }

        /// <summary>
        ///     频道的访问URL，可以是子域名、独立域名、目录方式
        /// </summary>
        public Url Url
        {
            get { return GetProperty<Url>(FePropertyNames.url); }
            set { SetProperty(FePropertyNames.url, value); }
        }

        /// <summary>
        ///     seo关键字
        /// </summary>
        public string SeoKeys
        {
            get
            {
                var relationship = ROCC.GetROC(FeRelationshipNames.FeChannelSeoKey);

                var sb = new StringBuilder();

                foreach (var item in relationship)
                {
                    var seoKey = item.Related as FeSeoKey;

                    if (seoKey != null)
                    {
                        if (sb.Length > 0)
                        {
                            sb.Append(",");
                        }

                        sb.Append(seoKey.Key);
                    }
                }

                return sb.ToString();
            }
        }

        /// <summary>
        ///     访问域名类型，使用目录名称、二级域名、顶级域名
        /// </summary>
        public Value DomainType
        {
            get { return GetProperty<Value>(FePropertyNames.domainType); }
            set { SetProperty(FePropertyNames.domainType, value); }
        }

        /// <summary>
        ///     用户输入的域名文本内容
        /// </summary>
        public string DomainText
        {
            get { return GetProperty<string>(FePropertyNames.domainText); }
            set { SetProperty(FePropertyNames.domainText, value); }
        }

        /// <summary>
        ///     LOGO图像文件
        /// </summary>
        public FeLogo Logo
        {
            get { return GetProperty<FeLogo>(FePropertyNames.logo); }
            set { SetProperty(FePropertyNames.logo, value); }
        }

        /// <summary>
        ///     创建新增对象排序。
        /// </summary>
        /// <returns></returns>
        public static decimal NewSortOrder()
        {
            var oc = new ObjektCollection<FeChannel>(
                Klass.ForId(FeKlassIDs.FeChannel),
                new WhereClause("\"sortOrder\" is not null")
                );
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.sortOrder, Order.Desc));
            var entity = oc.FirstOrDefault();

            var sort = 1;

            if (entity != null && entity.IsExists() && entity.SortOrder.HasValue)
            {
                sort = (int) entity.SortOrder.Value;
                sort++;
            }

            return sort;
        }
    }
}