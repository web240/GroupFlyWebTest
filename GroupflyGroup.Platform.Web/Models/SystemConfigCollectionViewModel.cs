using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class SystemConfigCollectionViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public SystemConfigCollectionViewModel(string configType = "")
        {
            this.Init(configType);
        }

        /// <summary>
        /// 
        /// </summary>
        public Dictionary<string, List<PropertyViewModel>> Configs { get; set; } = new Dictionary<string, List<PropertyViewModel>>();

        /// <summary>
        /// 
        /// </summary>
        protected void Init(string configType)
        {
            //查询所有配置类型
            var configKlass = Klass.ForId(KlassIDs.SystemConfiguration);
            var typeCondition = new WhereExpression<Value>(Klass.ForId(KlassIDs.Value));
            typeCondition.Where(PropertyNames.source, Const.Oper_Equals, configKlass.GetPropertyMetadata(PropertyNames.configurationType).ListDataSource.Id);

            //指定配置类型
            if (!configType.IsNullOrEmpty())
                typeCondition.Where(PropertyNames.value, Const.Oper_In, configType);

            var oc = new ObjektCollection<Value>(Klass.ForId(KlassIDs.Value), typeCondition.ToWhereClause());
            oc.Load();
            
            //查询每个配置类型下的配置项
            oc.Each(o =>
            {
                var propertylist = new List<PropertyViewModel>();
                var condition = new WhereExpression<SystemConfiguration>(configKlass);
                condition.Where(PropertyNames.configurationType, Const.Oper_Equals, o.Id);
                var configOc = new ObjektCollection<SystemConfiguration>(configKlass, condition.ToWhereClause());
                configOc.Load();

                if (!configOc.IsNullOrEmpty())
                {
                    var configs = configOc.OrderBy(con => con.SortOrder).ToList();
                    configs.Each(c =>
                    {
                        var property = new Property();
                        property.Name = PropertyNames.value;
                        property.Label = c.Label;
                        property.ReadOnly = false;
                        property.DataType = c.DataType;
                        property.ObjektDataSource = c.ObjektDataSource;
                        property.ListDataSource = c.ListDataSource;

                        var propertyModel = PropertyViewFactory.CreateInstance(property);
                        propertyModel.ObjektId = c.Id;
                        propertyModel.Value = c.Value;
                        propertyModel.State = "edit";
                        propertyModel.AutoSave = true;

                        //对象型属性值处理（包含id,名称,类型属性的json字符串）
                        if (property.DataType.Id == DataType.OBJEKT || property.DataType.Id == DataType.LIST)
                        {
                            var datasourse = string.Empty;
                            if (property.DataType.Id == DataType.OBJEKT && !c.ObjektDataSource.IsNull())
                            {
                                datasourse = c.ObjektDataSource.Klass.Name;
                            }
                            else if (property.DataType.Id == DataType.LIST && !c.ListDataSource.IsNull())
                            {
                                datasourse = c.ListDataSource.Klass.Name;
                            }
                            
                            if (c.Value.IsNullOrEmpty())
                                propertyModel.FormatterValue = new { id = "", combinedLabel = "", klass = datasourse, permissioncode = "-1" }.ObjectToJson();
                            else if (!ObjektFactory.IsExists(c.Value))
                                propertyModel.FormatterValue = new { id = c.Value, combinedLabel = "", klass = datasourse, permissioncode = "" }.ObjectToJson();
                            else
                            {
                                var id = c.Value;
                                var objValue = ObjektFactory.Find(id);
                                var combinedLabel = objValue.GetProperty(PropertyNames.combinedLabel);
                                var klass = objValue.Klass.Name;
                                var permissioncode = new ObjektViewModel(objValue).Permission.Code;
                                propertyModel.FormatterValue = new { id, combinedLabel, klass, permissioncode }.ObjectToJson();
                            }
                            if (!c.Filter.IsNull())
                                propertyModel.FilterId = c.Filter.Id;
                        }
                        else
                        {
                            propertyModel.FormatterValue = c.Value;
                        }
                        propertylist.Add(propertyModel);
                    });
                }
                Configs.Add(o.Label, propertylist);
            });
        }
    }
}