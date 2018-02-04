using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using EB.Common.ExtraExtention;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ListPropertyViewModel : ObjektPropertyViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ListPropertyViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public ListPropertyViewModel(string listid)
        {
            ListEntity = ObjektFactory.Find<List>(listid);
            GetDataSource();
        }

        /// <summary>
        /// 
        /// </summary>
        public ListPropertyViewModel(Property property, Objekt objekt) : base(property, objekt)
        {
            ElementName = Const.ElementName_GfListPropertyView;
            ListEntity = property.ListDataSource;
        }

        /// <summary>
        /// 
        /// </summary>
        public List ListEntity { get; set; }

        /// <summary>
        /// list属性数据源json
        /// </summary>
        public string ListData { get; set; }
        


        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        protected override void GetDataSource(Property property = null)
        {
            if (ListEntity.IsNull())
            {
                if (!property.ListDataSource.IsNull())
                    ListEntity = property.ListDataSource;
                else
                    return;
            }

            var roc = ListEntity.ROCC[RelationshipNames.Value];

            roc.Each(o =>
            {
                var permissioncode = new ObjektViewModel(o).Permission.Code;
                this.ListData += o.Id + "_" + o.CombinedLabel + "_" + o.GetProperty(PropertyNames.color) + "_" +  permissioncode + "_" + (o as Value).Description.SafeToString() + ",";

            });
            this.DataSourceName = ListEntity.Name;
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="objekt"></param>
        //public override void GetPropertyValue(Objekt objekt)
        //{
        //    if (this.Name == PropertyNames.id)
        //    {
        //        this.Value = objekt.Id;
        //        this.FormatterValue = objekt.Id;
        //    }
        //    else
        //    {
        //        var obj = objekt.TryGetValue(o => o.GetProperty(this.Name));

        //        var id = "";
        //        var combinedLabel = "";
        //        var klass = KlassNames.Objekt;
        //        var title = "";
        //        var color = "";
        //        var permissioncode = "";

        //        if (!obj.IsNull())
        //        {
        //            var o = obj as Value;
        //            id = o.Id;
        //            combinedLabel = o.IsExists() ? o.CombinedLabel : "该对象不存在";
        //            permissioncode = o.IsExists() ? new ObjektViewModel(o).Permission.Code : "-1";
        //            klass = o.Klass.Name;
        //            title = o.Klass.Label + "-" + o.CombinedLabel;
        //            color = o.GetProperty<string>(PropertyNames.color);
        //        }

        //        this.Value = obj;
        //        this.FormatterValue = new { id, combinedLabel, klass, title, color, permissioncode }.ObjectToJson();
        //    }
        //}
    }
}