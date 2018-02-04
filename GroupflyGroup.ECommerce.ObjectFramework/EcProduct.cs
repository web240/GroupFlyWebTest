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
    ///     商品
    /// </summary>
    [Serializable]
    public class EcProduct : Objekt
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
        ///     商品图片
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
        ///     品牌
        /// </summary>
        public EcBrand Brand
        {
            get { return GetProperty<EcBrand>(EcPropertyNames.brand); }
            set { SetProperty(EcPropertyNames.brand, value); }
        }

        /// <summary>
        ///     市场价
        /// </summary>
        public decimal? MarketPrice
        {
            get { return GetProperty<decimal?>(EcPropertyNames.marketPrice); }
            set { SetProperty(EcPropertyNames.marketPrice, value); }
        }


        /// <summary>
        ///     库存计数类型
        /// </summary>
        public Value RepertorySetType
        {
            get { return GetProperty<Value>(EcPropertyNames.repertorySetType); }
            set { SetProperty(EcPropertyNames.repertorySetType, value); }
        }

        /// <summary>
        ///     邮费承担方
        /// </summary>
        public Value FeePayType
        {
            get { return GetProperty<Value>(EcPropertyNames.feePayType); }
            set { SetProperty(EcPropertyNames.feePayType, value); }
        }

        /// <summary>
        ///     邮费模板
        /// </summary>
        public EcFeeTemplate FeeTemplate
        {
            get { return GetProperty<EcFeeTemplate>(EcPropertyNames.feeTemplate); }
            set { SetProperty(EcPropertyNames.feeTemplate, value); }
        }

        /// <summary>
        ///     商品状态
        /// </summary>
        public Value ProductStatus
        {
            get { return GetProperty<Value>(EcPropertyNames.productStatus); }
            set { SetProperty(EcPropertyNames.productStatus, value); }
        }

        /// <summary>
        ///     邮费承担方
        /// </summary>
        public Value PublishType
        {
            get { return GetProperty<Value>(EcPropertyNames.publishType); }
            set { SetProperty(EcPropertyNames.publishType, value); }
        }

        /// <summary>
        ///     邮费承担方
        /// </summary>
        public DateTime? PublishTime
        {
            get { return GetProperty<DateTime?>(EcPropertyNames.publishTime); }
            set { SetProperty(EcPropertyNames.publishTime, value); }
        }

 
        /// <summary>
        ///     保存前操作
        /// </summary>
    public override void BeforeSave()
        {
            if (ObjektStatus == ObjektStatus.NewModified ||
                ObjektStatus == ObjektStatus.Modified)
            {
                EcBrand entity = new ObjektCollection<EcBrand>(Klass.ForId(EcKlassIDs.EcBrand), new WhereClause("\"" + PropertyNames.name + "\" = '" + Name + "'")).TryGetSingleResult();

                if (entity != null)
                {
                    throw new Exception("不允许重复");
                }
            }

            base.BeforeSave();
        }

    }
}