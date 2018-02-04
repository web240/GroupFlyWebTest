using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using GroupflyGroup.ECommerce.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.ECommerce.ObjectFramework
{
    /// <summary>
    ///     商品分类
    /// </summary>
    [Serializable]
    public class EcProductCategory : Objekt
    {
        /// <summary>
        ///     名称
        /// </summary>
        public string Name
        {
            get { return GetProperty<string>(PropertyNames.name); }
            set { SetProperty(PropertyNames.name, value); }
        }

        /// <summary>
        ///     显示标签
        /// </summary>
        public string Label
        {
            get { return GetProperty<string>(PropertyNames.label); }
            set { SetProperty(PropertyNames.label, value); }
        }

        /// <summary>
        ///     描述
        /// </summary>
        public string Description
        {
            get { return GetProperty<string>(PropertyNames.description); }
            set { SetProperty(PropertyNames.description, value); }
        }

        /// <summary>
        ///     排序序号
        /// </summary>
        public decimal? SortOrder
        {
            get { return GetProperty<decimal?>(PropertyNames.sortOrder); }
            set { SetProperty(PropertyNames.sortOrder, value); }
        }

        /// <summary>
        ///     是否启用
        /// </summary>
        public bool IsEnable
        {
            get { return GetProperty<bool>(PropertyNames.isEnable); }
            set { SetProperty(PropertyNames.isEnable, value); }
        }
 
        /// <summary>
        ///     父
        /// </summary>
        public EcProductCategory Parent
        {
            get { return GetProperty<EcProductCategory>(PropertyNames.parent); }
            set { SetProperty(PropertyNames.parent, value); }
        }

        /// <summary>
        ///     路径
        /// </summary>
        public string Path
        {
            get { return GetProperty<string>(PropertyNames.path); }
        }
 
        /// <summary>
        ///     分类图片
        /// </summary>
        public File Image
        {
            get { return GetProperty<File>(EcPropertyNames.image); }
            set { SetProperty(EcPropertyNames.image, value); }
        }

        /// <summary>
        ///     商品类型
        /// </summary>
        public EcProductType ProductType
        {
            get { return GetProperty<EcProductType>(EcPropertyNames.productType); }
            set { SetProperty(EcPropertyNames.productType, value); }
        }

        /// <summary>
        ///     添加删除业务逻辑。
        /// </summary>
        public override void BeforeDelete()
        {

            //查询当前分类的商品，如果有则删除失败。
            var oc = new ObjektCollection<EcPrincipleProduct>
                (
                Klass.ForId(EcKlassIDs.EcPrincipleProduct),
                new WhereClause("\"productCategory\" = '" + Id + "'")
                );
            if (oc.Count > 0)
            {
                throw new Exception("请先删除分类下的所有商品");
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
            SetProperty(PropertyNames.isEnable, Parent.Path + "/" + Id);
            base.BeforeSave();
            //重写方法，保存前。
            //如果是新增和修改，且修改过是否显示。
            //更新所有子孙分类的是否显示属性。
            if (ObjektStatus == ObjektStatus.NewModified ||
                ObjektStatus == ObjektStatus.Modified)
            {
                //判断是否显示属性被修改
                if (IsModifiedProperty(PropertyNames.isEnable))
                {
                    //查询所有子分类
                    var list = GetChildren();

                    //修改子孙分类的是否显示属性
                    foreach (var item in list)
                    {
                        item.SetProperty(PropertyNames.isEnable, GetProperty(PropertyNames.isEnable));
                        item.Save();
                    }
                }
            }
        }

        /// <summary>
        ///     获取
        /// </summary>
        /// <returns></returns>
        public List<EcProductCategory> GetDescendants()
        {
            var result = new List<EcProductCategory>();

            var children = GetChildren();

            result.AddRange(children.ToList());

            foreach (var child in children)
            {
                result.AddRange(child.GetDescendants());
            }

            return result;
        }

        /// <summary>
        ///     清空商品分类所有数据。
        /// </summary>
        public static void DeleteAll()
        {
            var list = Klass.ForId(EcKlassIDs.EcProductCategory).GetInstances<EcProductCategory>();
            list.DeleteAll();
        }

        private ObjektCollection<EcProductCategory> GetChildren()
        {
            var oc = new ObjektCollection<EcProductCategory>
                (
                Klass.ForId(EcKlassIDs.EcProductCategory),
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
            ObjektCollection<EcProductCategory> oc = new ObjektCollection<EcProductCategory>
                (
                Klass.ForId(EcKlassIDs.EcProductCategory),
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