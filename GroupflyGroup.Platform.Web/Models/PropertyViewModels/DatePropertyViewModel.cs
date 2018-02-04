using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using EB.Common.ExtraExtention;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class DatePropertyViewModel : PropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public DatePropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public DatePropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfDatePropertyView;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objekt"></param>
        public override void GetPropertyValue(Objekt objekt)
        {
            base.GetPropertyValue(objekt);
            this.FormatterValue = this.FormatterValue.IsNullOrEmpty() ? string.Empty : this.Value.ToDateTime().ToString("yyyy/M/d");
        }
    }
}