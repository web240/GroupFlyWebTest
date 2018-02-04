using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ColorPropertyViewModel : StringPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ColorPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public ColorPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            this.ElementName = Const.ElementName_GfColorStringPropertyView;
        }
    }
}