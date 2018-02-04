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
    ///     商品规格
    /// </summary>
    [Serializable]
    public class EcProductSpecification : Objekt
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
        ///     规格显示类型
        /// </summary>
        public Value ShowType
        {
            get { return GetProperty<Value>(EcPropertyNames.showType); }
            set { SetProperty(EcPropertyNames.showType, value); }
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
        ///     保存前操作
        /// </summary>
        public override void BeforeSave()
        {
            if (User.Current.Id == Creator.Id)
            {
                if (ObjektStatus == ObjektStatus.NewModified)
                {
                    EcProductSpecification entity = new ObjektCollection<EcProductSpecification>(Klass.ForId(EcKlassIDs.EcProductSpecification), new WhereClause("\"" + PropertyNames.name + "\" = '" + Name + "' and \"" + EcPropertyNames.principle + "\"= '" + User.Current.Id + "' ")).TryGetSingleResult();

                    if (entity != null)
                    {
                        throw new Exception("不允许重复");
                    }
                }
            }
            else
            {
                throw new Exception("不允许添加或修改");
            }

            base.BeforeSave();
        }

        /// <summary>
        ///     删除前操作
        /// </summary>
        public override void BeforeDelete()
        {
            if (User.Current.Id == Creator.Id)
            {
                ObjektCollection<EcProductSpecificationValue>  productSpecificationValue = new ObjektCollection<EcProductSpecificationValue>(Klass.ForId(EcKlassIDs.EcProductSpecificationValue), new WhereClause("\"" + PropertyNames.source + "\"='" + this.Id + "'"));
                productSpecificationValue.DeleteAll();

                base.BeforeDelete();
            }
            else
            {
                throw new Exception("不允许删除");
            }
        }
        
        /// <summary>
        /// 获取可使用的规格值
        /// </summary>
        /// <returns></returns>
        private ObjektCollection<EcProductSpecificationValue> GetValues()
        {
            //var entity = ObjektFactory.Find<FeArticleCategory>(id);

            var oc = new ObjektCollection<EcProductSpecificationValue>
                (
                Klass.ForId(EcKlassIDs.EcProductSpecificationValue),
                new WhereClause("\"" + PropertyNames.source + "\" = '" + Id + "' and  ")
                );


            

            return oc;
        }

    }
}