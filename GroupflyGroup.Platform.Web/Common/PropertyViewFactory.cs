using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public static class PropertyViewFactory
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <param name="objekt"></param>
        /// <returns></returns>
        public static PropertyViewModel CreateInstance(Property property, Objekt objekt = null)
        {
            switch (property.DataTypeId)
            {
                case DataType.LIST:
                    return new ListPropertyViewModel(property, objekt);
                case DataType.OBJEKT:
                    return new ObjektPropertyViewModel(property, objekt);
                case DataType.BOOLEAN:
                    return new BoolPropertyViewModel(property, objekt);
                case DataType.DATE:
                    return new DatePropertyViewModel(property, objekt);
                case DataType.TIME:
                    return new TimePropertyViewModel(property, objekt);
                case DataType.DATETIME:
                    return new DateTimePropertyViewModel(property, objekt);
                case DataType.BIGINT:
                    return new BigIntPropertyViewModel(property, objekt);
                case DataType.INTEGER:
                    return new IntPropertyViewModel(property, objekt);
                case DataType.SEQUENCE:
                    return new SequencePropertyViewModel(property, objekt);
                case DataType.MD5:
                    return new MD5PropertyViewModel(property, objekt);

                case DataType.FLOAT:
                case DataType.DECIMAL:
                case DataType.DOUBLE:
                    return new NumberPropertyViewModel(property, objekt);

                case DataType.STRING:
                    if (property.IsColor)
                        return new ColorPropertyViewModel(property, objekt);
                    if (property.Multiline)
                        return new TextPropertyViewModel(property, objekt);
                    if (property.IsRichText)
                        return new RichContentPropertyViewModel(property, objekt);

                    return new StringPropertyViewModel(property, objekt);

                case DataType.BINARY:
                    if (IsSourceCode(property,objekt))
                        return new SourceCodePropertyViewModel(property, objekt);
                    if (property.IsRichText)
                        return new RichContentPropertyViewModel(property, objekt);


                    return new BinaryPropertyViewModel(property, objekt);

                case DataType.TEXT:
                    if (IsViewModle(property, objekt))
                        return new ViewModelContentPropertyViewModel(property, objekt);
                    if (property.IsRichText)
                        return new RichContentPropertyViewModel(property, objekt);

                    return new TextPropertyViewModel(property, objekt);

                default:
                    return new PropertyViewModel(property, objekt);
            }
        }

        private static bool IsSourceCode(Property property, Objekt objekt)
        {
            if (!objekt.IsNull() && objekt.KlassId == KlassIDs.File && property.Name == PropertyNames.fileContent)
            {
                var file = objekt as File;
                var filetype = file.FileType;
                if (filetype.GetProperty<bool>("isText"))
                {
                    return true;
                }
            }
            return false;
        }


        private static bool IsViewModle(Property property, Objekt objekt)
        {
            if (!objekt.IsNull() &&( objekt.KlassId == KlassIDs.ObjektDetailView || objekt.KlassId == "ObjektCustomFormView@Klass") && property.Name == PropertyNames.content)
            {
                return true;
            }
            return false;
        }
    }
}