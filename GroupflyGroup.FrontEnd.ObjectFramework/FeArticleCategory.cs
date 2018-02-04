using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     文章分类
    /// </summary>
    [Serializable]
    public class FeArticleCategory : Objekt
    {
        /// <summary>
        ///     名称
        /// </summary>
        public string Name
        {
            get
            {
                return GetProperty<string>(FePropertyNames.name);
            }
            set
            {
                SetProperty(FePropertyNames.name, value);
            }
        }

        /// <summary>
        ///     父分类
        /// </summary>
        public FeArticleCategory Parent
        {
            get
            {
                return GetProperty<FeArticleCategory>(FePropertyNames.parent);
            }
            set
            {
                SetProperty(FePropertyNames.parent, value);
            }
        }

        /// <summary>
        ///     序号
        /// </summary>
        public decimal? SortOrder
        {
            get
            {
                return GetProperty<decimal?>(FePropertyNames.sortOrder);
            }
            set
            {
                SetProperty(FePropertyNames.sortOrder, value);
            }
        }

        /// <summary>
        ///     SEO标题
        /// </summary>
        public string SeoTitle
        {
            get
            {
                return GetProperty<string>(FePropertyNames.seoTitle);
            }
            set
            {
                SetProperty(FePropertyNames.seoTitle, value);
            }
        }

        /// <summary>
        /// seo关键字
        /// </summary>
        public string SeoKeys
        {
            get
            {

                ROC<RelationshipObjekt> relationship = ROCC.GetROC(FeRelationshipNames.FeArticleCategorySeoKey);

                StringBuilder sb = new StringBuilder();

                foreach (var item in relationship)
                {
                    FeSeoKey seoKey = item.Related as FeSeoKey;

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
        ///     SEO描述
        /// </summary>
        public string SeoDescription
        {
            get
            {
                return GetProperty<string>(FePropertyNames.seoDescription);
            }
            set
            {
                SetProperty(FePropertyNames.seoDescription, value);
            }
        }

        /// <summary>
        ///     显示
        /// </summary>
        public bool IsDisplay
        {
            get
            {
                return GetProperty<bool>(FePropertyNames.isDisplay);
            }
            set
            {
                SetProperty(FePropertyNames.isDisplay, value);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public string RootPath
        {
            get
            {

                string result = "";

                var item = this;

                do
                {

                    if (!string.IsNullOrWhiteSpace(result))
                    {
                        result = "/" + result;
                    }

                    result = item.Name + result;
                    item = item.Parent;

                } while (item != null);

                return result;

            }
        }

        /// <summary>
        /// 上级节点全路径。
        /// </summary>
        public string ParentNamePath
        {
            get
            {

                string result = "";

                var item = this.Parent;

                do
                {

                    if (!string.IsNullOrWhiteSpace(result))
                    {
                        result = "/" + result;
                    }

                    result = item.Name + result;
                    item = item.Parent;

                } while (item != null);

                return result;

            }
        }

        /// <summary>
        ///     添加删除业务逻辑。
        /// </summary>
        public override void BeforeDelete()
        {

            //查询当前分类的文章，如果有则删除失败。
            var oc = new ObjektCollection<FeArticle>
                (
                Klass.ForId(FeKlassIDs.FeArticle),
                new WhereClause("\"category\" = '" + Id + "'")
                );
            if (oc.Count > 0)
            {
                throw new Exception("请先删除分类下的所有文章");
            }

            //查询是否被频道引用
            var channelOc = new ObjektCollection<FeChannel>(Klass.ForId(FeKlassIDs.FeChannel), new WhereClause("\"" + FePropertyNames.category + "\" = '" + Id + "'"));

            if (channelOc.Count > 0)
            {
                throw new Exception("请先删除分类绑定的频道");
            }

            //删除子分类。
            var children = GetChildren().ToList();

            foreach (var item in children)
            {
                item.Delete();
                item.Save();
            }

            base.BeforeDelete();
        }

        /// <summary>
        /// </summary>
        public override void BeforeSave()
        {
            base.BeforeSave();

            //重写方法，保存前。
            //如果是新增和修改，且修改过是否显示。
            //更新所有子孙分类的是否显示属性。
            if (ObjektStatus == ObjektStatus.NewModified ||
                ObjektStatus == ObjektStatus.Modified)
            {
                //判断是否显示属性被修改
                if (IsModifiedProperty(FePropertyNames.isDisplay))
                {
                    //查询所有子分类
                    var list = GetChildren();

                    //修改子孙分类的是否显示属性
                    foreach (var item in list)
                    {
                        item.SetProperty(FePropertyNames.isDisplay, GetProperty(FePropertyNames.isDisplay));
                        item.Save();
                    }
                }
            }
        }

        /// <summary>
        ///     获取
        /// </summary>
        /// <returns></returns>
        public List<FeArticleCategory> GetDescendants()
        {
            var result = new List<FeArticleCategory>();

            var children = GetChildren();

            result.AddRange(children.ToList());

            foreach (var child in children)
            {
                result.AddRange(child.GetDescendants());
            }

            return result;
        }

        /// <summary>
        ///     清空文章分类所有数据。
        /// </summary>
        public static void DeleteAll()
        {
            var list = Klass.ForId(FeKlassIDs.FeArticleCategory).GetInstances<FeArticleCategory>();
            list.DeleteAll();
        }

        private ObjektCollection<FeArticleCategory> GetChildren()
        {
            //var entity = ObjektFactory.Find<FeArticleCategory>(id);

            var oc = new ObjektCollection<FeArticleCategory>
                (
                Klass.ForId(FeKlassIDs.FeArticleCategory),
                new WhereClause("\"" + FePropertyNames.parent + "\" = '" + Id + "'")
                );

            return oc;
        }

        /// <summary>
        /// 创建新增对象排序。
        /// </summary>
        /// <returns></returns>
        public static decimal NewSortOrder()
        {

            ObjektCollection<FeArticleCategory> oc = new ObjektCollection<FeArticleCategory>
                (
                Klass.ForId(FeKlassIDs.FeArticleCategory),
                new WhereClause("\"sortOrder\" is not null")
                );
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.sortOrder, Order.Desc));
            var entity = oc.FirstOrDefault();

            int sort = 1;

            if (entity != null && entity.IsExists() && entity.SortOrder.HasValue)
            {
                sort = (int)entity.SortOrder.Value;
                sort++;
            }

            return sort;

        }

    }
}