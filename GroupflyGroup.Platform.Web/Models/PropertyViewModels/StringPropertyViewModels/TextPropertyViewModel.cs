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
    public class TextPropertyViewModel : StringPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public TextPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public TextPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            this.ElementName = Const.ElementName_GfTextPropertyView;
            this.Width = 555;
            this.Height = 100;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objekt"></param>
        public override void GetPropertyValue(Objekt objekt)
        {
            base.GetPropertyValue(objekt);
            this.FormatterValue = FormatterValue.Replace("\r\n", "<br>").Replace("\n","<br>");
        }
    }
}