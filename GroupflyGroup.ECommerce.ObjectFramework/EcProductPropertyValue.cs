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
    ///     商品属性值
    /// </summary>
    [Serializable]
    public class EcProductPropertyValue : RelationshipObjekt
    {
        /// <summary>
        ///     属性
        /// </summary>
        public EcProductPropertyValue Source
        {
            get { return GetProperty<EcProductPropertyValue>(PropertyNames.source); }
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
        ///     图片
        /// </summary>
        public File Image
        {
            get { return GetProperty<File>(EcPropertyNames.image); }
            set { SetProperty(EcPropertyNames.image, value); }
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