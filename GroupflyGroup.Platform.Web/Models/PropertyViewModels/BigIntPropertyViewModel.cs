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
    public class BigIntPropertyViewModel : NumberPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public BigIntPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public BigIntPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfBigIntPropertyView;
        }
    }
}