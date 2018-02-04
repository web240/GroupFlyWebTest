using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class BinaryPropertyViewModel : PropertyViewModel
    {

        /// <summary>
        /// 
        /// </summary>
        public BinaryPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public BinaryPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            this.ElementName = string.Empty;
            this.Sortable = false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objekt"></param>
        public override void GetPropertyValue(Objekt objekt)
        {
            this.FormatterValue = string.Empty;
            if (objekt is File && this.Name == PropertyNames.fileContent)
            {
                var file = objekt as File;
                var filetype = file.FileType;
                if (filetype.Viewable)
                {
                    if (filetype.IsImage)
                    {
                        var url = $"{HttpContext.Current.Request.ApplicationPath}/file?id={file.Id}";
                        this.FormatterValue = $"<a href='{url}' target='_blank'>";
                        this.FormatterValue += $"<img style='max-width:400px;max-height:400px;' src='{url}' /></a>";
                    }
                    else if (filetype.GetProperty<bool>("isText"))
                    {
                        this.Value = objekt.TryGetValue(o => o.GetProperty(this.Name));
                        this.ElementName = Const.ElementName_GfRichContentPropertyView;
                        this.Width = 550;
                        Stream s = this.Value as Stream;
                        if (s != null)
                        {
                            byte[] t = s.ToBytes();
                            this.FormatterValue = Encoding.UTF8.GetString(t, 0, t.Length);
                        }
                    }
                }
            }
        }
    }
}