using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using EB.Common;
using EB.Common.QueryBuilder;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 关联对象视图模型
    /// </summary>
    public class ROCViewModel : ObjektCollectionViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="klassName"></param>
        /// <param name="isTrashStation"></param>
        public ROCViewModel(string klassName, bool isTrashStation = false) : base(klassName, isTrashStation)
        {

        }
        

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sourceKlass"></param>
        /// <param name="relationshipName"></param>
        /// <param name="isTrashStation"></param>
        public ROCViewModel(string id, string relationshipName, string sourceKlass = "", bool isTrashStation = false)
        {
            
            this.SourceEntity = ObjektFactory.IsExists(id)
                ? ObjektFactory.Find(id)
                : ObjektFactory.New(id, Klass.ForName(sourceKlass));

            this.IsTrashStation = SourceEntity.GetProperty<bool>(PropertyNames.isTrash);
            this.RelationshipEntity = SourceEntity.Klass.GetRelationshipMetadata(relationshipName);
            this.RelatedEntity = RelationshipEntity.Related;
            if (RelationshipEntity.Name == RelationshipNames.AllowedPermission)
            {
                this.RelatedEntity = SourceEntity.Klass.GetPropertyMetadata(PropertyNames.permission).ObjektDataSource;
            }

            base.Init(this.RelationshipEntity.RelationshipKlass.Name, isTrashStation);
            var filter = RelationshipEntity.RelationshipKlass.GetPropertyMetadata(PropertyNames.related).Filter;

            this.Attributes.Add("sourceId", SourceEntity.Id);
            this.Attributes.Add("filterId", filter.IsNull() ? "" : filter.Id);

            if (!RelatedEntity.IsNull())
                this.Attributes.Add("relatedLabel", RelatedEntity.GetProperty<string>(PropertyNames.label));

            this.HideTools.Add("edit");
            this.HideTools.Add("subclass");
            this.HideTools.Add("read");
            this.HideTools.Add("save");
            this.HideTools.Add("refresh");
            if (!this.RelationshipEntity.RelationshipObjektViewable)
                this.HideTools.Add("open");
            if (!this.RelationshipEntity.RelationshipObjektEditable)
                this.Attributes.Add("forbidedit", "");
            if (!this.RelationshipEntity.AllowDelete)
                this.HideTools.Add("del");
            if (!this.RelationshipEntity.AllowAdd)
                this.HideTools.Add("addRelated");
            if (!this.RelationshipEntity.AllowRemove)
                this.HideTools.Add("removeRelated");

            if (!this.RelationshipEntity.AllowNew)
                this.HideTools.Add("createRelated");
            else if (!this.RelationshipEntity.RelatedOption.IsNull())
            {
                this.Attributes.Add("relatedCanCreate", (this.RelationshipEntity.RelatedOption.Id ==
                                                         ValueIDs.ForRelatedOption_CreateOnly
                                                         ||
                                                         this.RelationshipEntity.RelatedOption.Id ==
                                                         ValueIDs.ForRelatedOption_PickAndCreate).ToString().ToLower());

                this.Attributes.Add("relatedCanPick", (this.RelationshipEntity.RelatedOption.Id == ValueIDs.ForRelatedOption_PickOnly
                                        ||
                                        this.RelationshipEntity.RelatedOption.Id ==
                                        ValueIDs.ForRelatedOption_PickAndCreate).ToString().ToLower());
            }

            if (!RelatedEntity.IsNull() && RelationshipEntity.NewShowRelated)
            {
                this.Attributes.Add("relatedKlass", (RelatedEntity as Klass).Name);
                this.HideTools.Add("add");
            }
            else if (RelatedEntity.IsNull())
            {
                this.PropertyMetadata.Find(p => p.Name == PropertyNames.related).Hidden = true;
            }

            this.AddRelatedObjektProperties();

            this.AutoSelect = false;

            //this.Attributes.Add("saveurl", HttpContext.Current.Request.ApplicationPath + "/Platform/ROCSave");
            //this.Attributes.Add("dataurl", HttpContext.Current.Request.ApplicationPath + "/Platform/GetObjektROC");
            //this.Attributes.Add("onbeforeinit",
            //    $"element.setCustomAttr('RocOptions',window.stringToObject(`{option.ObjectToJson().Replace("\"", "'")}`)); element.setExtraParams('saveList','{id},{relationshipName}');");
            this.AfterInit =
                $"this.queryData([{{  field: '{PropertyNames.source}', type: '{Const.Oper_Equals}', value:'{id}'  }}]);";




        }

        /// <summary>
        /// 
        /// </summary>
        public override string ElementName
        {
            get { return Const.ElementName_RelationshipObjektCollectionView; }
        }

        /// <summary>
        /// 关联源对象实体
        /// </summary>
        public Objekt SourceEntity { get; set; }

        /// <summary>
        /// 关联目的对象实体
        /// </summary>
        public Objekt RelatedEntity { get; set; }

        /// <summary>
        /// 关联对象实体
        /// </summary>
        public Relationship RelationshipEntity { get; set; }

        /// <summary>
        /// 默认排序
        /// </summary>
        protected override OrderByCell DefaultOrder { get; set; } = new OrderByCell(PropertyNames.sortOrder, Order.Asc);

        /// <summary>
        /// 取关联对象属性元数据
        /// </summary>
        public void AddRelatedObjektProperties()
        {
            if (!RelationshipEntity.NewShowRelated || RelatedEntity.IsNull())
            {
                if (!RelatedEntity.IsNull())
                {
                    this.PropertyMetadata.Find(p=>p.Name == PropertyNames.related).Hidden = false;
                }
                return;
            }
            this.PropertyMetadata.Find(p => p.Name == PropertyNames.related).Hidden = true;

            var properties = (RelatedEntity as Klass).GetProperties(p => !p.HiddenInRocView).OrderBy(o=>o.SortOrder);
            var propertyModels = new List<PropertyViewModel>();
            var relatedColumns = "";
            properties.Each(p =>
            {
                var propertyModel = PropertyViewFactory.CreateInstance(p);
                propertyModel.Sortable = false;
                propertyModel.Name = PropertyNames.related + "." + propertyModel.Name;
                propertyModels.Add(propertyModel);
                if (relatedColumns.IsNullOrEmpty())
                    relatedColumns += propertyModel.Name;
                else
                    relatedColumns += "," + propertyModel.Name;
            });
            this.RelatedColumns = relatedColumns;

            var option = this.RelationshipEntity.RocViewRelatedOption;
            if (option.IsNull() || option.Id == ValueIDs.RocViewRelatedView_right)
            {
                this.PropertyMetadata.AddRange(propertyModels);
            }
            else if (option.Id == ValueIDs.RocViewRelatedView_left)
            {
                this.PropertyMetadata.InsertRange(0, propertyModels);
            }
            else
            {
                this.PropertyMetadata.AddRange(propertyModels);
                this.PropertyMetadata = this.PropertyMetadata.OrderBy(o => o.SortOrder).ToList();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override Predicate<Property> GetPropertyPredicate()
        {
            return property => !property.HiddenInRocView || property.Name == PropertyNames.related;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        protected override Objekt CollectionObjektSave(Dictionary<string, string> obj)
        {
            var klassid = ObjektFactory.ObjektId2KlassId(obj["id"]);
            var klass = Klass.ForId(klassid);
            var properties = klass.GetProperties(o => !o.ReadOnly);

            RelationshipObjekt entity;
            if (obj["$"] == "U")
            {
                entity = ObjektFactory.Find(obj["id"]) as RelationshipObjekt; ;
                if (entity.IsNull())
                    return null;
            }
            else
            {
                entity = ObjektFactory.New(obj["id"], klass) as RelationshipObjekt;
            }

            obj.Each(change =>
            {
                if (change.Key != "$")
                {
                    if (change.Key.IndexOf('.') > 0)
                    {
                        if (entity.Related.IsNull())
                            entity.Related = ObjektFactory.New(RelatedEntity as Klass);

                        var key = change.Key.Split('.')[1];
                        if (entity.Related.IsWritableProperty(key))
                        {
                            var property = entity.Related.Klass.GetPropertyMetadata(key);
                            var value = change.Value.Parse(property.DataTypeId);
                            entity.Related.SetProperty(key, value);
                        }
                    }
                    else if (entity.IsWritableProperty(change.Key))
                    {
                        var property = properties.Find(o => o.Name == change.Key);
                        var value = change.Value.Parse(property.DataTypeId);

                        if (change.Key == PropertyNames.source)
                            value = SourceEntity;

                        entity.SetProperty(property.Name, value);
                    }
                }
            });
            if(!entity.Related.IsNull() && entity.Related.ObjektStatus != ObjektStatus.Original)
                entity.Related.Save();
            return entity;
        }
    }

    ///// <summary>
    ///// 关联对象列表组件参数类
    ///// </summary>
    //public class RocOptions
    //{
    //    /// <summary>
    //    /// 源对象ID
    //    /// </summary>
    //    public string SourceId { get; set; }

    //    /// <summary>
    //    /// 源对象权限
    //    /// </summary>
    //    public string SourcePermissionCode { get; set; }

    //    /// <summary>
    //    /// 过滤器id
    //    /// </summary>
    //    public string FilterId { get; set; }

    //    /// <summary>
    //    /// 源对象名称
    //    /// </summary>
    //    public string SourceLabel { get; set; }

    //    /// <summary>
    //    /// 源对象标题
    //    /// </summary>
    //    public string SourceTitle { get; set; }
        
    //    /// <summary>
    //    /// 关联对象名称
    //    /// </summary>
    //    public string RelatedLabel { get; set; }

    //    /// <summary>
    //    /// 被关联对象所属类
    //    /// </summary>
    //    public string RelatedKlass { get; set; }

    //    /// <summary>
    //    /// 可创建被关联对象
    //    /// </summary>
    //    public bool RelatedCanCreate { get; set; }

    //    /// <summary>
    //    /// 可选择被关联对象
    //    /// </summary>
    //    public bool RelatedCanPick { get; set; }
    //}
}
