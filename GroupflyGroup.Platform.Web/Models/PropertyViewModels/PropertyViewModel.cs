
using System.Collections.Generic;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 属性视图模型
    /// </summary>
    public class PropertyViewModel : BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public PropertyViewModel()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <param name="objekt"></param>
        public PropertyViewModel(Property property, Objekt objekt)
        {
            if (!objekt.IsNull())
                ObjektId = objekt.Id;
            Entity = property;
            Name = property.Name;
            Label = property.Label;
            DataType = property.DataTypeId;
            DataTypeName = property.DataType.Value_;
            SortOrder = property.SortOrder;
            ReadOnly = property.ReadOnly;
            CreateOnly = property.CreateOnly;
            Description = property.Description;
            IsRequired = property.IsRequired && !property.ReadOnly;
            ElementName = Const.ElementName_StringPropertyView;
            Sortable = true;
            OrderBy = property.OrderBy;
            Width = 180;
            Height = 26;
            if (!property.Filter.IsNull())
                FilterId = property.Filter.Id;
        }

        /// <summary>
        /// 属性所属的对象Id
        /// </summary>
        public string ObjektId { get; set; }

        /// <summary>
        /// 属性Id
        /// </summary>
        public string FilterId { get; set; }

        /// <summary>
        /// 属性名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 数据类型
        /// </summary>
        public string DataType { get; set; }

        /// <summary>
        /// 数据类型名称
        /// </summary>
        public string DataTypeName { get; set; }

        /// <summary>
        /// 属性标签
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// 属性原始值
        /// </summary>
        public object Value { get; set; }

        /// <summary>
        /// 属性展示值
        /// </summary>
        public string FormatterValue { get; set; }

        /// <summary>
        /// 只读
        /// </summary>
        public bool ReadOnly { get; set; }

        /// <summary>
        /// 只允许创建
        /// </summary>
        public bool CreateOnly { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public string State { get; set; } = "read";

        /// <summary>
        /// 是否隐藏
        /// </summary>
        public bool Hidden { get; set; }

        /// <summary>
        /// 自动保存
        /// </summary>
        public bool AutoSave { get; set; }

        /// <summary>
        /// UI组件名称
        /// </summary>
        public string ElementName { get; set; }

        /// <summary>
        /// UI组件宽度
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        /// UI组件高度
        /// </summary>
        public int Height { get; set; }

        /// <summary>
        /// 是否可排序
        /// </summary>
        public bool Sortable { get; set; }

        /// <summary>
        /// 是否必填
        /// </summary>
        public bool IsRequired { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 属性实体
        /// </summary>
        public Property Entity { get; set; }

        /// <summary>
        /// 检索排序
        /// </summary>
        public int? OrderBy { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public decimal? SortOrder { get; set; }

        /// <summary>
        /// 整数位数
        /// </summary>
        public int? Prec { get; set; }

        /// <summary>
        /// 小数位数
        /// </summary>
        public int? Scale { get; set; }

        /// <summary>
        /// 自定义属性
        /// </summary>

        public string CustomAttr { get; set; }

        /// <summary>
        /// 保存属性值
        /// </summary>
        public virtual void Save(string objektId, string propertyName, string value)
        {
            Execute(() =>
            {
                var entity = ObjektFactory.Find(objektId);
                var objValue = new object();

                if (entity.Klass.Name == KlassNames.SystemConfiguration)
                {
                    var datatype = (entity as SystemConfiguration).DataType.Id;
                    objValue = value.Parse(datatype);
                    if (objValue is Objekt)
                    {
                        objValue = (objValue as Objekt).Id;
                    }
                }
                else
                {
                    var property = entity.Klass.GetPropertyMetadata(propertyName);
                    objValue = value.Parse(property.DataTypeId);
                }
                entity.SetProperty(propertyName, objValue);
                entity.Save();
            });
        }

        /// <summary>
        /// 从属性所属的对象中获取属性值
        /// </summary>
        public virtual void GetPropertyValue(Objekt objekt)
        {
            this.Value = objekt.TryGetValue(o => o.GetProperty(this.Name));
            this.FormatterValue = this.Value.SafeToString();
        }
    }
}
