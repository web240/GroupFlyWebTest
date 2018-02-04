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
    ///     主体商品
    /// </summary>
    [Serializable]
    public class EcPrincipleProduct : RelationshipObjekt
    {
        /// <summary>
        ///     主体
        /// </summary>
        public Organization Source
        {
            get { return GetProperty<Organization>(PropertyNames.source); }
            set { SetProperty(PropertyNames.source, value); }
        }

        /// <summary>
        ///     商品
        /// </summary>
        public EcProduct Related
        {
            get { return GetProperty<EcProduct>(PropertyNames.related); }
            set { SetProperty(PropertyNames.related, value); }
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
        ///     商品分类
        /// </summary>
        public EcProductCategory ProductCategory
        {
            get { return GetProperty<EcProductCategory>(EcPropertyNames.productCategory); }
            set { SetProperty(EcPropertyNames.productCategory, value); }
        }

        /// <summary>
        ///     保存前操作
        /// </summary>
        public override void BeforeSave()
        {
            if (ObjektStatus == ObjektStatus.NewModified ||
                ObjektStatus == ObjektStatus.Modified)
            {
                
                EcBrand entity = new ObjektCollection<EcBrand>(Klass.ForId(EcKlassIDs.EcBrand), new WhereClause("\"" + PropertyNames.related + "\" = '" + Related + "'")).TryGetSingleResult();

                if (entity != null)
                {
                    throw new Exception("不允许重复");
                }
            }

            base.BeforeSave();
        }

    }
}