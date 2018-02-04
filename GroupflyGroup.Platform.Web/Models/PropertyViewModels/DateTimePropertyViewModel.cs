using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class DateTimePropertyViewModel : PropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public DateTimePropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public DateTimePropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfDateTimePropertyView;
        }
    }
}