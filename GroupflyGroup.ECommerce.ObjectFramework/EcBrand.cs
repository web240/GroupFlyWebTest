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
    ///     品牌
    /// </summary>
    [Serializable]
    public class EcBrand : Objekt
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
        ///     Logo图片
        /// </summary>
        public FeLogo Logo
        {
            get { return GetProperty<FeLogo>(FePropertyNames.logo); }
            set { SetProperty(FePropertyNames.logo, value); }
        }

        /// <summary>
        ///     网址
        /// </summary>
        public string Url
        {
            get { return GetProperty<string>(PropertyNames.url); }
            set { SetProperty(PropertyNames.url, value); }
        }


        /// <summary>
        ///     简介
        /// </summary>
        public string Remark
        {
            get { return GetProperty<string>(PropertyNames.remark); }
            set { SetProperty(PropertyNames.remark, value); }
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
        ///     保存前操作
        /// </summary>
        public override void BeforeSave()
        {
            if (User.Current.Id == Creator.Id)
            {
                if (ObjektStatus == ObjektStatus.NewModified)
                {
                    EcBrand entity = new ObjektCollection<EcBrand>(Klass.ForId(EcKlassIDs.EcBrand), new WhereClause("\"" + PropertyNames.name + "\" = '" + Name + "' and \"" + EcPropertyNames.principle + "\"= '" + User.Current.Id + "' ")).TryGetSingleResult();

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
                ObjektCollection<EcPrincipleBrand> principleBrands = new ObjektCollection<EcPrincipleBrand>(Klass.ForId(EcKlassIDs.EcPrincipleBrand), new WhereClause("\"" + PropertyNames.related + "\"='" + this.Id + "'"));
                principleBrands.DeleteAll();

                base.BeforeDelete();
            }
            else
            {
                throw new Exception("不允许删除");
            }
        }
    }
}