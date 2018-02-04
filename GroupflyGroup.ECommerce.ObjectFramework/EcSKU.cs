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
    ///     商品库存
    /// </summary>
    [Serializable]
    public class EcSKU : RelationshipObjekt
    {
        /// <summary>
        ///     商品
        /// </summary>
        public EcProduct Source
        {
            get { return GetProperty<EcProduct>(PropertyNames.source); }
            set { SetProperty(PropertyNames.source, value); }
        }

        /// <summary>
        ///    Objekt
        /// </summary>
        public Objekt Related
        {
            get; set;
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
        ///     货号
        /// </summary>
        public string ProductNum
        {
            get { return GetProperty<string>(EcPropertyNames.productNum); }
            set { SetProperty(EcPropertyNames.productNum, value); }
        }

        /// <summary>
        ///     售价
        /// </summary>
        public decimal? ShopPrice
        {
            get { return GetProperty<decimal?>(EcPropertyNames.shopPrice); }
            set { SetProperty(EcPropertyNames.shopPrice, value); }
        }

        /// <summary>
        ///     库存
        /// </summary>
        public int? RepertoryCount
        {
            get { return GetProperty<int?>(EcPropertyNames.repertoryCount); }
            set { SetProperty(EcPropertyNames.repertoryCount, value); }
        }

        /// <summary>
        ///     库存警告
        /// </summary>
        public int? RepertoryAlertCount
        {
            get { return GetProperty<int?>(EcPropertyNames.repertoryAlertCount); }
            set { SetProperty(EcPropertyNames.repertoryAlertCount, value); }
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