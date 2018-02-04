using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class SequencePropertyViewModel : StringPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public SequencePropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public SequencePropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            this.ElementName = string.Empty;
        }


    }
}