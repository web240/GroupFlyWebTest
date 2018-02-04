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
    ///     商品类型
    /// </summary>
    [Serializable]
    public class EcProductType : Objekt
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
        ///     是否允许自定义属性
        /// </summary>
        public bool CanCustomProperty
        {
            get { return GetProperty<bool>(EcPropertyNames.canCustomProperty); }
            set { SetProperty(EcPropertyNames.canCustomProperty, value); }
        }

        /// <summary>
        ///     是否实物
        /// </summary>
        public bool IsReal
        {
            get { return GetProperty<bool>(EcPropertyNames.isReal); }
            set { SetProperty(EcPropertyNames.isReal, value); }
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