using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using EB.Common.ExtraExtention;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ObjektPropertyViewModel : PropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ObjektPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public ObjektPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            this.GetDataSource(property);
        }


        /// <summary>
        /// 数据源类型名称
        /// </summary>
        public string DataSourceName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        protected virtual void GetDataSource(Property property)
        {
            var objektSource = property.ObjektDataSource;
            this.DataSourceName = objektSource.IsNull() ? KlassNames.Objekt : objektSource.Name;
            this.ElementName = Const.ElementName_GfObjektPropertyView;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objekt"></param>
        public override void GetPropertyValue(Objekt objekt)
        {
            if (this.Name == PropertyNames.id)
            {
                this.Value = objekt.Id;
                this.FormatterValue = objekt.Id;
            }
            else
            {
                var obj = objekt.TryGetValue(o => o.GetProperty(this.Name));
                
                if (!obj.IsNull())
                {
                    var o = obj as Objekt;
                    this.Value = o.Id;
                    this.FormatterValue = o.Id;
                }
                else
                {
                    this.Value = string.Empty;
                    this.FormatterValue = string.Empty;
                }

            }
        }
    }
}