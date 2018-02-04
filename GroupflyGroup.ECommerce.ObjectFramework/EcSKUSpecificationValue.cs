﻿using System;
using GroupflyGroup.ECommerce.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.ECommerce.ObjectFramework
{
    /// <summary>
    ///     SKU规格值
    /// </summary>
    [Serializable]
    public class EcSKUSpecificationValue : RelationshipObjekt
    {
        /// <summary>
        ///     商品类型
        /// </summary>
        public EcSKU Source
        {
            get { return GetProperty<EcSKU>(PropertyNames.source); }
            set { SetProperty(PropertyNames.source, value); }
        }

        /// <summary>
        ///     规格值
        /// </summary>
        public EcProductSpecificationValue Related
        {
            get { return GetProperty<EcProductSpecificationValue>(PropertyNames.related); }
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