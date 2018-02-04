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
    ///     主体商品品牌
    /// </summary>
    [Serializable]
    public class EcPrincipleBrand : RelationshipObjekt
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
        ///     品牌
        /// </summary>
        public EcBrand Related
        {
            get { return GetProperty<EcBrand>(PropertyNames.related); }
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
        ///     是否启用
        /// </summary>
        public bool IsEnable
        {
            get { return GetProperty<bool>(PropertyNames.isEnable); }
            set { SetProperty(PropertyNames.isEnable, value); }
        }

        /// <summary>
        ///     是否推荐
        /// </summary>
        public bool IsCommend
        {
            get { return GetProperty<bool>(EcPropertyNames.isCommend); }
            set { SetProperty(EcPropertyNames.isCommend, value); }
        }


        /// <summary>
        ///     保存前操作
        /// </summary>
        public override void BeforeSave()
        {
            if (ObjektStatus == ObjektStatus.NewModified ||
                ObjektStatus == ObjektStatus.Modified)
            {

                EcPrincipleBrand entity = new ObjektCollection<EcPrincipleBrand>(Klass.ForId(EcKlassIDs.EcPrincipleBrand), new WhereClause("\"" + PropertyNames.related + "\" = '" + Related + "'")).TryGetSingleResult();

                if (entity != null)
                {
                    throw new Exception("不允许重复");
                }
            }

            base.BeforeSave();
        }

    }
}