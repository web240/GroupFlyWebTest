using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using EB.Common;
using EB.Common.ExtraExtention;
using EB.Common.QueryBuilder;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Common
{
    /// <summary>
    /// 
    /// </summary>
    public static class ControlExtensions
    {

        /// <summary>
        /// 获取属性控件参数
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static Dictionary<string, string> GetPropertyUIOptions(this PropertyViewModel model)
        {

            if (model.DataType != DataType.OBJEKT && model.DataType != DataType.LIST)
                model.FormatterValue = model.FormatterValue.ConvertUnicodeToJsonFormatL();

            var dic = new Dictionary<string, string>();
            dic.Add("elementname", model.ElementName);
            dic.Add("name", model.Name);
            dic.Add("label", model.Label.ConvertUnicodeToJsonFormatL());
            dic.Add("description", model.Description.ConvertUnicodeToJsonFormatL());
            dic.Add("filterid", model.FilterId);
            dic.Add("objektId", model.ObjektId);
            dic.Add("propertyName", model.Name);
            dic.Add("width", model.Width.ToString());
            dic.Add("height", model.Height.ToString());
            dic.Add("autosave", model.AutoSave.ToString().ToLower());
            dic.Add("readonly", model.ReadOnly.ToString().ToLower());
            dic.Add("required", model.IsRequired.ToString().ToLower());
            dic.Add("prec", model.Prec.IsNull() ? "" : model.Prec.Value.ToString());
            dic.Add("scale", model.Scale.IsNull() ? "" : model.Scale.Value.ToString());
            dic.Add("ishidden", model.Hidden.ToString().ToLower());
            dic.Add("customattr", model.CustomAttr);

            switch (model.DataType)
            {
                case DataType.OBJEKT:
                    dic.Add("href", HttpContext.Current.Request.ApplicationPath + "/Platform/SelectObjektCollectionView");
                    dic.Add("klass", (model as ObjektPropertyViewModel).DataSourceName);
                    break;
                case DataType.LIST:
                    dic.Add("defaultoption", "--请选择--");
                    dic.Add("source", model.Entity.ListDataSourceId);
                    break;
            }

            return dic;
        }

        /// <summary>
        /// 根据数据类型生成编辑控件
        /// </summary>
        /// <param name="page"></param>
        /// <param name="model"></param>
        /// <param name="htmlAttributes"></param>
        /// <returns></returns>
        public static MvcHtmlString CustomControl(this WebViewPage page, PropertyViewModel model,
            object htmlAttributes = null)
        {
            if (model.ElementName.IsNullOrEmpty())
                return new MvcHtmlString(model.FormatterValue.Replace("\"", "&quot;"));

            var dic = new Dictionary<string, string>();
            dic.Add("autoinit", "");
            dic.Add("name", model.Name);
            dic.Add("filterid", model.FilterId);
            dic.Add("objektId", model.ObjektId);
            dic.Add("propertyName", model.Name);
            dic.Add("width", model.Width.ToString());
            dic.Add("state", model.State);
            dic.Add("value", model.FormatterValue?.Replace("\"", "&quot;"));

            if (model.AutoSave)
                dic.Add("autoSave", "");
            if (model.ReadOnly)
                dic.Add("readonly", "");

            switch (model.DataType)
            {
                case DataType.OBJEKT:
                    dic.Add("idfield", "id");
                    dic.Add("namefield", "combinedLabel");
                    dic.Add("href", page.Url.Action("SelectObjektCollectionView", "Platform"));
                    dic.Add("klass", (model as ObjektPropertyViewModel).DataSourceName);
                    break;
                case DataType.LIST:
                    dic.Add("valuefield", "id");
                    dic.Add("textfield", "combinedLabel");
                    dic.Add("defaultoption", "--请选择--");
                    dic.Add("data", (model as ListPropertyViewModel).ListData);
                    break;
            }

            if (!htmlAttributes.IsNull())
            {
                htmlAttributes.GetValues().Each(o =>
                {
                    if (dic.ContainsKey(o.Key.SafeToString()))
                        dic[o.Key.SafeToString()] = o.Value.SafeToString();
                    else
                        dic.Add(o.Key.SafeToString(), o.Value.SafeToString());

                });
            }
            var a = ControlFactory.CreateControl(model.ElementName, dic);
            return MvcHtmlString.Create(a);
        }

        /// <summary>
        /// GfDataGrid控件
        /// </summary>
        /// <param name="page"></param>
        /// <param name="model"></param>
        /// <param name="htmlAttributes"></param>
        /// <returns></returns>
        public static MvcHtmlString GfDataGrid(this WebViewPage page, ObjektCollectionViewModel model,
            object htmlAttributes = null)
        {
            var modelAttr = new Dictionary<string, string>();
            modelAttr.Add("width", model.Width);
            modelAttr.Add("height", model.Height);
            modelAttr.Add("idfield", model.IdField);
            modelAttr.Add("namefield", model.NameField);
            modelAttr.Add("klass", model.KlassName);
            modelAttr.Add("filter", model.FilterId);
            modelAttr.Add("onafterinit", model.AfterInit);
            modelAttr.Add("customAttr", model.CustomAttr);

            if (!model.RelatedColumns.IsNullOrEmpty())
                modelAttr.Add("relatedcolumns", model.RelatedColumns);

            if (model.AutoSelect)
                modelAttr.Add("autoSelect", "true");
            if (model.SingleSelect)
                modelAttr.Add("singleSelect", "true");
            if (model.Pagination)
                modelAttr.Add("pagination", "true");
            if (model.IsTrashStation)
                modelAttr.Add("trashstation", "true");

            if (model.HideTools.Count > 0)
            {
                var hidetools = "[";
                model.HideTools.Each(tool =>
                {
                    if (hidetools == "[")
                    {
                        hidetools += "'" + tool + "'";
                    }
                    else
                    {
                        hidetools += ",'" + tool + "'";
                    }
                });
                hidetools += "]";
                modelAttr.Add("hidetools", hidetools);
            }
            modelAttr.Add("InnerHTML", "");

            model.PropertyMetadata.ForEach(property =>
            {
                var columnAttr = new Dictionary<string, string>();
                columnAttr.Add("field", property.Name);
                columnAttr.Add("filterid", property.FilterId);
                columnAttr.Add("datatype", property.DataType);
                columnAttr.Add("title", property.Label);
                columnAttr.Add("width", property.Width.ToString());
                columnAttr.Add("ishidden", property.Hidden.ToString().ToLower());
                columnAttr.Add("sortable", property.Sortable.ToString().ToLower());
                columnAttr.Add("description", property.Description);
                columnAttr.Add("isRequired", property.IsRequired.ToString());
                columnAttr.Add("isreadonly", property.ReadOnly.ToString());
                columnAttr.Add("createonly", property.CreateOnly.ToString());
                columnAttr.Add("label", property.Label);
                columnAttr.Add("iscolor", (property is ColorPropertyViewModel).ToString().ToLower());


                GetEditor(page, property, model, columnAttr);

                var column = ControlFactory.CreateControl(Const.ElementName_GfColumn, columnAttr);
                modelAttr["InnerHTML"] += column;

            });

            if (!model.Attributes.IsNull())
            {
                model.Attributes.Each(o =>
                {
                    if (modelAttr.ContainsKey(o.Key.SafeToString()))
                        modelAttr[o.Key.SafeToString()] = o.Value.SafeToString();
                    else
                        modelAttr.Add(o.Key.SafeToString(), o.Value.SafeToString());

                });
            }

            if (!htmlAttributes.IsNull())
            {
                htmlAttributes.GetValues().Each(o =>
                {
                    if (modelAttr.ContainsKey(o.Key.SafeToString()))
                        modelAttr[o.Key.SafeToString()] = o.Value.SafeToString();
                    else
                        modelAttr.Add(o.Key.SafeToString(), o.Value.SafeToString());

                });
            }

            var datagrid = ControlFactory.CreateControl(model.ElementName, modelAttr);

            return new MvcHtmlString(datagrid);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="property"></param>
        /// <param name="model"></param>
        /// <param name="columnAttr"></param>
        private static void GetEditor(WebViewPage page, PropertyViewModel property, ObjektCollectionViewModel model,
            Dictionary<string, string> columnAttr)
        {

            var options = "''";
            var elementName = property is RichContentPropertyViewModel
                ? string.Empty
                : property.ElementName;
            switch (property.DataType)
            {
                case DataType.BIGINT:
                case DataType.INTEGER:
                case DataType.FLOAT:
                case DataType.DECIMAL:
                case DataType.DOUBLE:
                    var prec = property.Prec.IsNull() ? "" : property.Prec.Value.ToString();
                    var scale = property.Scale.IsNull() ? "" : property.Scale.Value.ToString();
                    options =
                        $"{{  prec : '{prec}', scale : '{scale}' }}";
                    break;
                case DataType.OBJEKT:
                    var url = page.Url.Action("SelectObjektCollectionView", "Platform");
                    options =
                        $"{{  idfield : '{model.IdField}', namefield : '{model.NameField}', klass : '{(property as ObjektPropertyViewModel).DataSourceName}', filterid : '{property.FilterId}', href : '{url}' }}";
                    break;
                case DataType.LIST:
                    options =
                        $"{{ source : '{property.Entity.ListDataSourceId}', defaultoption : '--请选择--' }}";
                    break;
                default:
                    options =
                        "{}";
                    break;

            }

            columnAttr.Add("editor", $"{{ type : '{elementName}', options : {options}  }}");
        }


    }
}