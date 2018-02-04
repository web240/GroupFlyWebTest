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
    public class IntPropertyViewModel : BigIntPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public IntPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public IntPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfIntPropertyView;
        }
    }
}