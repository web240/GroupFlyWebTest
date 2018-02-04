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
    public class MD5PropertyViewModel : StringPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public MD5PropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public MD5PropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            this.ElementName = Const.ElementName_GfMD5PropertyView;
        }
    }
}