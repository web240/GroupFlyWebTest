using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using EB.Common;
using System.Web.Routing;
using System.Web.Mvc;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ViewModelContentPropertyViewModel : PropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ViewModelContentPropertyViewModel()
        {
            
        }

        /// <summary>
        /// 
        /// </summary>
        public ViewModelContentPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfViewModelContentPropertyView;
            Width = 550;
            this.Sortable = false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="objekt"></param>
        public override void GetPropertyValue(Objekt objekt)
        {
            this.Value = objekt.TryGetValue(o => o.GetProperty(this.Name));
            
            if (this.DataType == ObjectFramework.Persistence.DataType.BINARY)
            {
                Stream s = this.Value as Stream;
                if (s != null)
                {
                    byte[] t = s.ToBytes();
                    this.Value = Encoding.UTF8.GetString(t, 0, t.Length);
                }
            }
            this.FormatterValue = this.Value.SafeToString();
        }
    }
}