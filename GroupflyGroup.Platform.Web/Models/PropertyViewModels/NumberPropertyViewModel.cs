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
    public class NumberPropertyViewModel : PropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public NumberPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public NumberPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfNumberPropertyView;
            if (!property.Prec.IsNull() && !property.Scale.IsNull())
            {
                Prec = property.Prec.ToInt() - property.Scale.ToInt();
            }
            if (!property.Scale.IsNull())
            {
                Scale = property.Scale.ToInt();
            }
        }
    }
}