using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EB.Common;
using EB.Common.ExtraExtention;
using EB.Common.QueryBuilder;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 对象视图模型
    /// </summary>
    public class ObjektViewModel : BaseViewModel
    {
        #region 构造函数

        /// <summary>
        /// 构造函数
        /// </summary>
        public ObjektViewModel(Objekt obj) : base(obj)
        {
            Properties = new List<PropertyViewModel>();
            var name = obj.IsExists() ? obj.CombinedLabel?.SafeToString() : obj.Id;
            Id = obj.Id;
            Name = name;
            Klas = obj.Klass;
            Entity = obj;
            Title = Entity.Klass.Label + "-" + name.ConvertUnicodeToJsonFormatL();

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="klassName"></param>
        public ObjektViewModel(string id = "", string klassName = "")
        {
            
            Properties = new List<PropertyViewModel>();
            if (!id.IsNullOrEmpty())
            {
                if (id.IndexOf('@') < 0)
                {
                    throw new Exception("无效的对象id");
                }
                var code = id.Split('@')[0];
                klassName = id.Split('@')[1];

                if (code.IsNullOrEmpty())
                {
                    Entity = ObjektFactory.New(Klass.ForName(klassName));
                }
                else
                {
                    if (ObjektFactory.IsExists(id))
                    {
                        Entity = ObjektFactory.Find(id);
                    }
                    else
                    {
                        Entity = ObjektFactory.New(id, Klass.ForName(klassName));
                    }
                }
                Name = Entity.CombinedLabel.IsNullOrEmpty() ? Entity.Id : Entity.CombinedLabel;
                Klas = Entity.Klass;
                KlassName = Klas.Name;
                Title = Entity.Klass.Label + "-" + Name.ConvertUnicodeToJsonFormatL();
                Id = id;
                Permission = new ObjektViewModel(Entity).Permission;
            }
            else if (!klassName.IsNullOrEmpty())
            {
                var klass = Klass.ForName(klassName);
                Properties = new List<PropertyViewModel>();
                Entity = ObjektFactory.New(klass);
                Name = Entity.CombinedLabel.IsNullOrEmpty() ? Entity.Id : Entity.CombinedLabel;
                Title = Entity.Klass.Label + "-" + Name.ConvertUnicodeToJsonFormatL();
                Klas = klass;
                KlassName = Klas.Name;
                Id = Entity.Id;
            }
            Permission = new PermissionModel(Entity);
            
        }

        #endregion

        #region 属性

        /// <summary>
        /// 对象名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string KlassName { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 编号
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 模式
        /// </summary>
        protected string State { get; set; }

        /// <summary>
        /// 类名
        /// </summary>
        public Klass Klas { get; set; }

        /// <summary>
        /// 对象实体类
        /// </summary>
        public Objekt Entity { get; set; }

        /// <summary>
        /// 属性集合
        /// </summary>
        public List<PropertyViewModel> Properties { get; set; }

        #endregion

        #region 方法

        /// <summary>
        /// 设置浏览模式
        /// </summary>
        /// <param name="state"></param>
        public void SetState(string state)
        {
            this.State = state;
            this.Properties.Each(o => o.State = state);
        }


        /// <summary>
        /// 转换为对象详情模型（添加详情页属性）
        /// </summary>
        /// <returns></returns>
        public ObjektViewModel AddDetailProperties(string dataTypeId = "") 
        {
            var showProperties = Entity.Klass.GetProperties();
            this.AddProperties(showProperties.OrderBy(o => o .SortOrder).ToList(), "", p => p.HiddenInObjektDetailView);


            if (Entity is Property)
            {
                var property = Entity as Property;
                var datatype = dataTypeId.IsNullOrEmpty() ? property.DataTypeId : dataTypeId;

                //根据数据类型隐藏属性

                this.Properties.Each(p =>
                {
                    if (datatype != DataType.LIST)
                    {
                        if (p.Entity.Name == PropertyNames.listDataSource
                            || p.Entity.Name == PropertyNames.listDefaultValue)
                            p.Hidden = true;

                        if (datatype != DataType.OBJEKT && p.Entity.Name == PropertyNames.filter)
                        {
                            p.Hidden = true;
                        }
                    }
                    if (datatype != DataType.OBJEKT)
                    {
                        if (p.Entity.Name == PropertyNames.objektDataSource
                            || p.Entity.Name == PropertyNames.objektDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.SEQUENCE)
                    {
                        if (p.Entity.Name == PropertyNames.sequDataSource)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.STRING)
                    {
                        if (p.Entity.Name == PropertyNames.multiline
                         || p.Entity.Name == PropertyNames.isColor
                         || p.Entity.Name == PropertyNames.stringDefaultValue)
                            p.Hidden = true;

                        if (datatype != DataType.SEQUENCE && p.Entity.Name == PropertyNames.storedLength)
                        {
                            p.Hidden = true;
                        }
                        if (datatype != DataType.BINARY && p.Entity.Name == PropertyNames.isRichText)
                        {
                            p.Hidden = true;
                        }

                        if (p.Entity.Name == PropertyNames.enableExpress && (datatype != DataType.BINARY || !p.Entity.IsRichText) && datatype != DataType.TEXT)
                        {
                            p.Hidden = true;
                        }
                        if (datatype != DataType.MD5 && p.Entity.Name == PropertyNames.pattern)
                        {
                            p.Hidden = true;
                        }
                        if (datatype != DataType.BINARY && datatype != DataType.TEXT && p.Entity.Name == "isI18N")
                        {
                            p.Hidden = true;
                        }

                    }
                    if (datatype != DataType.DECIMAL)
                    {
                        if (p.Entity.Name == PropertyNames.prec
                         || p.Entity.Name == PropertyNames.scale
                         || p.Entity.Name == PropertyNames.decimalDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.BOOLEAN)
                    {
                        if (p.Entity.Name == PropertyNames.booleanDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.BIGINT)
                    {
                        if (p.Entity.Name == PropertyNames.bigintDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.DOUBLE)
                    {
                        if (p.Entity.Name == PropertyNames.doubleDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.INTEGER)
                    {
                        if (p.Entity.Name == PropertyNames.integerDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.FLOAT)
                    {
                        if (p.Entity.Name == PropertyNames.floatDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.DATE)
                    {
                        if (p.Entity.Name == PropertyNames.dateDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.TIME)
                    {
                        if (p.Entity.Name == PropertyNames.timeDefaultValue)
                            p.Hidden = true;
                    }
                    if (datatype != DataType.DATETIME)
                    {
                        if (p.Entity.Name == PropertyNames.datetimeDefaultValue)
                            p.Hidden = true;
                    }
                });
            }
            return this;
        }

        /// <summary>
        /// 添加属性
        /// </summary>
        /// <param name="showProperties"></param>
        /// <param name="objektName"></param>
        /// <param name="hidden"></param>
        public void AddProperties(List<Property> showProperties = null, string objektName = "", Predicate<Property> hidden = null)
        {
            var objekt = objektName.IsNullOrEmpty() ? null : Entity.GetProperty<Objekt>(objektName);
            var current = objekt.IsNull() ? Entity : objekt;

            if (showProperties.IsNullOrEmpty())
            {
                showProperties = this.Entity.Klass.GetProperties();
            }
            foreach (var property in showProperties)
            {
                var propertyModel = PropertyViewFactory.CreateInstance(property, current);
                propertyModel.GetPropertyValue(current);
                propertyModel.Hidden = hidden.IsNull() ? false : hidden(property);

                if (!objekt.IsNull())
                    propertyModel.Name = objektName + "." + propertyModel.Name;
                propertyModel.ReadOnly = !current.IsWritableProperty(property.Name);
                if (!this.Properties.Contains(o => o.Name == propertyModel.Name))
                    this.Properties.Add(propertyModel);

            }


        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="relatedPropertyNames"></param>
        public virtual void AddRelatedProperties(string relatedPropertyNames)
        {
            if (!relatedPropertyNames.IsNullOrEmpty())
            {
                var entityExists = ObjektFactory.IsExists(this.Id);
                var names = relatedPropertyNames.Split(',');
                names.Each(name =>
                {
                    var objname = name.Split('.')[0];
                    var objproperty = name.Split('.')[1];
                    var obj = this.Entity.GetProperty(objname);
                    if (!entityExists && obj.IsNull())
                    {
                        var klass = Klas.GetPropertyMetadata(objname).ObjektDataSource;
                        obj = ObjektFactory.New(klass);
                        this.Entity.SetProperty(objname, obj);
                    }
                    if (!obj.IsNull())
                        this.AddProperties((obj as Objekt).Klass.GetProperties(p => p.Name == objproperty), objname);
                });
            }
        }

        /// <summary>
        /// 详情编辑
        /// </summary>
        public void ObjektEdit(string row)
        {
            var dic = row.JsonToObject<Dictionary<string, string>>();
            if (dic.Count == 0)
                return;

            var properties = Entity.Klass.GetProperties(p => !p.ReadOnly);
            dic.ForEach(o =>
            {
                
                var property = properties.Find(p => p.Name == o.Key);
                if (!property.IsNull() && Entity.IsWritableProperty(property.Name))
                {
                    var value = o.Value.Parse(property.DataTypeId);
                    Entity.SetProperty(o.Key, value);

                }

            });
            Execute(Entity.Save);
        }

        /// <summary>
        /// 设置对象回收状态
        /// </summary>
        /// <param name="objektIds"></param>
        /// <param name="isTrash"></param>
        public void SetTrash(string objektIds,bool isTrash)
        {
            var ids = objektIds.Split(',');
            Execute(() =>
            {
                ids.Each(id =>
                {
                    if (!id.IsNullOrEmpty() && ObjektFactory.IsExists(id))
                    {
                        var entity = ObjektFactory.Find(id);
                        if (isTrash)
                            entity.Trash();
                        else
                            entity.Revert();
                    }
                });
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToJson()
        {
            var obj = new StringBuilder("{");
            foreach (var propertyModel in this.Properties)
            {
                if (obj.ToString() != "{")
                    obj.Append(",");
                if (propertyModel.DataType != DataType.OBJEKT && propertyModel.DataType != DataType.LIST)
                    propertyModel.FormatterValue =  propertyModel.FormatterValue.ConvertUnicodeToJsonFormatL();

                obj.Append("\"" + propertyModel.Name + "\" :\"" + propertyModel.FormatterValue + "\"");
            }
            if (this.Properties.IsNullOrEmpty())
            {
                obj.Append(" \"" + PropertyNames.id + "\" : \"" + this.Id + "\"");
                obj.Append(", \"" + PropertyNames.combinedLabel + "\" : \"" + this.Name + "\"");
                obj.Append(", \"" + PropertyNames.klass + "\" : \"" + this.KlassName + "\"");
            }
            obj.Append(", \"permissioncode\" : \"" + this.Permission?.Code + "\"");
            obj.Append(", \"combinedtitle\" : \"" + this.Title + "\"");
            obj.Append("}");

            return obj.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public object ToJsonObject()
        {
            var dic = new Dictionary<string,string>();
            foreach (var propertyModel in this.Properties)
            {
                //if ((propertyModel.DataType != DataType.OBJEKT && propertyModel.DataType != DataType.LIST) || propertyModel.Name == "id")
                //    propertyModel.FormatterValue = "\"" + propertyModel.FormatterValue.ConvertUnicodeToJsonFormatL() + "\"";

                dic.Add(propertyModel.Name, propertyModel.FormatterValue);
            }
            if (this.Properties.IsNullOrEmpty())
            {
                dic.Add(PropertyNames.id, this.Id);
                dic.Add(PropertyNames.combinedLabel, this.Name);
                dic.Add(PropertyNames.klass, this.KlassName);
            }
            dic.Add("permissioncode", this.Permission?.Code);
            dic.Add("combinedtitle", this.Title);

            return dic;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToJsonWithPropertyMeta()
        {
            var obj = new StringBuilder("{");
            obj.Append("\"combinedtitle\" : \"" + this.Title + "\",");
            obj.Append("\"permissioncode\" : \"" + this.Permission.Code + "\",");
            var layout = this.Klas.ObjektDetailViewLayout.IsNull() ? "Horizontal" : this.Klas.ObjektDetailViewLayout.Value_;
            obj.Append("\"viewLayout\" : \"" + layout + "\"");
            foreach (var propertyModel in this.Properties)
            {
                obj.Append(",");

                var options = new StringBuilder("{");
                options.Append($"\"elementname\" : \"{propertyModel.ElementName}\"");

                var dic = propertyModel.GetPropertyUIOptions();
                dic.Each(d =>
                {
                    options.Append(",");
                    options.Append("\"" + d.Key + "\" :\"" + d.Value + "\"");
                });
                options.Append("}");

                obj.Append("\"" + propertyModel.Name + "\" : " + options);
            }
            
            var roccnames = "[";
            var rocList =
                this.Entity.ROCC.OrderBy(roc => Entity.Klass.GetRelationshipMetadata(roc.RelationshipName).SortOrder);
            rocList.Each(roc =>
            {
                var relationship = Entity.Klass.GetRelationshipMetadata(roc.RelationshipName);
                if (relationship.ShowInRoccView)
                {
                    var name = "\"" + relationship.Name + "-" + relationship.Label + "\"";

                    if (roccnames == "[")
                        roccnames += name;
                    else
                        roccnames += "," + name;
                }
            });
            roccnames += "]";

            obj.Append($",\"roccnames\" : {roccnames}");

            obj.Append("}");

            return obj.ToString();
        }


        #endregion
    }
}