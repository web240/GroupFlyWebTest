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
    public class BoolPropertyViewModel : PropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public BoolPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public BoolPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfBooleanPropertyView;
            Width = 80;
            Height = 13;
        }
    }
}