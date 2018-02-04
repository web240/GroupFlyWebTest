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
    ///     销售商品属性
    /// </summary>
    [Serializable]
    public class EcProductProductProperty : RelationshipObjekt
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
        ///     属性
        /// </summary>
        public EcProductProperty Related
        {
            get { return GetProperty<EcProductProperty>(PropertyNames.related); }
            set { SetProperty(PropertyNames.related, value); }
        }


        /// <summary>
        ///     选择值
        /// </summary>
        public EcProductPropertyValue SelectValue
        {
            get { return GetProperty<EcProductPropertyValue>(EcPropertyNames.selectValue); }
            set { SetProperty(EcPropertyNames.selectValue, value); }
        }

        /// <summary>
        ///     输入值
        /// </summary>
        public string InputValue
        {
            get { return GetProperty<string>(EcPropertyNames.inputValue); }
            set { SetProperty(EcPropertyNames.inputValue, value); }
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