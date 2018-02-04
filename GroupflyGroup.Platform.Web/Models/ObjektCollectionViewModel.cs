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
using GroupflyGroup.Platform.Web.Models.DataModel;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 对象列表模型
    /// </summary>
    public class ObjektCollectionViewModel : BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ObjektCollectionViewModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="klassName"></param>
        /// <param name="isTrashStation"></param>
        public ObjektCollectionViewModel(string klassName, 
            bool isTrashStation = false)
        {
            this.Init(klassName, isTrashStation);
            

        }
        /// <summary>
        /// 
        /// </summary>
        private QueryModel _query;

        #region DataGrid控件属性

        /// <summary>
        /// UI组件标签名
        /// </summary>
        public virtual string ElementName {
            get { return Const.ElementName_ObjektCollectionView; } }

        /// <summary>
        /// 自定义属性
        /// </summary>
        public Dictionary<string,string> Attributes { get; set; } = new Dictionary<string, string>();
        

        /// <summary>
        /// 是否分页
        /// </summary>
        public bool Pagination { get; set; } = true;

        /// <summary>
        /// 
        /// </summary>
        public string Width { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Height { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string IdField { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string NameField { get; set; }


        /// <summary>
        /// 
        /// </summary>
        public string CustomAttr { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool AutoSelect { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool SingleSelect { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<string> HideTools { get; set; } = new List<string>();

        /// <summary>
        /// 
        /// </summary>
        public string DataUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string SaveUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ExportUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string DetailUrl { get; set; }

        /// <summary>
        /// 过滤器ID
        /// </summary>
        public string FilterId { get; set; }

        /// <summary>
        /// 初始化后事件
        /// </summary>
        public string AfterInit { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string RelatedColumns { get; set; }

        #endregion

        #region 模型属性

        /// <summary>
        /// 需要哪些属性的筛选条件
        /// </summary>
        public virtual Predicate<Property> GetPropertyPredicate()
        {
            return property => !property.HiddenInObjektCollectionView;
        }

        /// <summary>
        /// 是否包含已回收数据
        /// </summary>
        public bool IsTrashStation { get; set; }

        /// <summary>
        /// 类
        /// </summary>
        protected Klass Klas { get; set; }

        /// <summary>
        /// 类名
        /// </summary>
        public string KlassName { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// 分页总条数
        /// </summary>
        public long TotalCount { get; protected set; }

        /// <summary>
        /// 对象模型集合
        /// </summary>
        public List<ObjektViewModel> ObjektViewModels { get; set; } = new List<ObjektViewModel>();

        /// <summary>
        /// 属性元数据集合
        /// </summary>
        public List<PropertyViewModel> PropertyMetadata { get; set; }

        /// <summary>
        /// 默认排序
        /// </summary>
        protected virtual OrderByCell DefaultOrder { get; set; } = new OrderByCell(PropertyNames.modifiedOn, Order.Desc);

        #endregion

        #region 方法


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Property> GetCollectionProperties()
        {
            return
                Klas.GetProperties(
                    p =>
                        this.GetPropertyPredicate()(p) ||
                        p.Name == PropertyNames.combinedLabel ||
                        p.Name == PropertyNames.id ||
                        p.Name == PropertyNames.permission);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="klassName"></param>
        /// <param name="isTrashStation"></param>
        protected virtual void Init(string klassName,bool isTrashStation = false)
        {

            ObjektViewModels = new List<ObjektViewModel>();

            KlassName = klassName;
            Klas = Klass.ForName(klassName);
            var rocc = Klas.PropertyMetadata.OrderBy(o=> (o as Property).SortOrder);
            this.PropertyMetadata = new List<PropertyViewModel>();
            foreach (var relationshipObjekt in rocc)
            {
                var property = relationshipObjekt as Property;
                if (!property.IsNull())
                {
                    var properymodel = PropertyViewFactory.CreateInstance(property);
                    properymodel.Hidden = !this.GetPropertyPredicate()(property);
                    if (properymodel.ElementName == Const.ElementName_GfRichContentPropertyView)
                        properymodel.ReadOnly = true;
                    this.PropertyMetadata.Add(properymodel);
                }
            }

            if (Klas.Abstract || !Klas.CanNew())
            {
                this.HideTools.Add("add");
            }
            if (Klas.Children.IsNullOrEmpty())
            {
                this.HideTools.Add("subclass");
            }

            this.Label = Klas.CombinedLabel;
            this.IdField = PropertyNames.id;
            this.NameField = PropertyNames.combinedLabel;
            this.Width = "";
            this.Height = "";
            this.Title = this.Klas.CombinedLabel;
            this.CustomAttr = "";
            this.AutoSelect = true;
            this.SingleSelect = false;
            this.DataUrl = "";
            this.SaveUrl = "";
            this.ExportUrl = "";
            this.DetailUrl = "";
            this.IsTrashStation = isTrashStation;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected virtual List<OrderByCell> GetOrderBy()
        {
            var list = new List<OrderByCell>();
            var properties = PropertyMetadata.OrderBy(o => o.OrderBy).ToList();
            var orderby = properties.Exists(o => o.OrderBy > 0) ? Order.Asc : Order.Desc;
            properties.Each(p =>
            {
                if (!p.OrderBy.IsNull())
                {
                    if(p.OrderBy.Value != 0)
                        list.Add(new OrderByCell(p.Name, orderby));
                }
            });
            return list;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        public void GetObjektViewModels(QueryModel query)
        {
            this._query = query;
            query.param.Each(o =>
            {
                if (o.value is string[])
                    o.value = (o.value as string[])[0];
            });
            var where = query.param.ToWhereClause(Klas);
            if (!query.filter.IsNullOrEmpty())
            {
                var clause = ObjektFactory.Find<Filter>(query.filter);
                if (where.SqlString.IsNullOrEmpty())
                {
                    where = clause.ToWhereClause();
                }
                else
                    where.And(clause.ToWhereClause());
            }
            var oc = new ObjektCollection<Objekt>(Klas, new Pagination(query.pageIndex, query.pageSize), query.includeSubKlass, where).ToView();
            
            if (Klas.Id == KlassIDs.File)
            {
                if (query.orderBy.IsNullOrEmpty())
                {
                    oc.OrderByClause.Add(new OrderByCell(PropertyNames.isdirectory, Order.Desc));
                    oc.OrderByClause.Add(new OrderByCell(PropertyNames.fileType, Order.Asc));
                }
                else if (query.orderBy != PropertyNames.isdirectory)
                {
                    oc.OrderByClause.Add(new OrderByCell(PropertyNames.isdirectory, Order.Desc));
                    oc.OrderByClause.Add(new OrderByCell(PropertyNames.fileType, Order.Asc));
                    oc.OrderByClause.Add(new OrderByCell(query.orderBy, query.isAsc ? Order.Asc : Order.Desc));
                }
                else
                {
                    oc.OrderByClause.Add(new OrderByCell(query.orderBy, query.isAsc ? Order.Asc : Order.Desc));
                    oc.OrderByClause.Add(new OrderByCell(PropertyNames.fileType, Order.Asc));
                }
            }
            else
            {
                if (!query.orderBy.IsNullOrEmpty())
                {
                    oc.OrderByClause.Add(new OrderByCell(query.orderBy, query.isAsc ? Order.Asc : Order.Desc));
                }
                else
                {
                    var orders = this.GetOrderBy();
                    if (!orders.IsNullOrEmpty())
                    {
                        oc.OrderByClause.AddRange(orders);
                    }
                    else
                    {
                        oc.OrderByClause.Add(DefaultOrder);
                    }
                }

            }
            oc.Load();

            foreach (var obj in oc)
            {
                var model = new ObjektViewModel(obj);
                model.AddProperties(this.GetCollectionProperties());
                model.AddRelatedProperties(query.relatedProperties);
                ObjektViewModels.Add(model);
            }
            this.TotalCount = oc.Pagination.ObjektCount;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <param name="orderby"></param>
        /// <param name="isAsc"></param>
        /// <param name="relatedColumns"></param>
        /// <param name="filter"></param>
        [Obsolete]
        public void GetObjektViewModels(int page, int rows, string param, string orderby = PropertyNames.modifiedOn, bool isAsc = false, string relatedColumns = "", string filter = "")
        {
            var paramlist = param.JsonToObject<List<QueryParamModel>>();
            if(paramlist.IsNull())
                paramlist = new List<QueryParamModel>();
            
            var where = paramlist.ToWhereClause(Klas);
            if (!filter.IsNullOrEmpty())
            {
                var clause = ObjektFactory.Find<Filter>(filter);
                if (where.SqlString.IsNullOrEmpty())
                {
                    where = clause.ToWhereClause();
                }
                else
                    where.And(clause.ToWhereClause());
            }
            var oc = new ObjektCollection<Objekt>(Klas, new Pagination(page, rows), true, where);
            oc.OrderByClause.Add(new OrderByCell(orderby, isAsc ? Order.Asc : Order.Desc));
            oc.Load();

            foreach (var obj in oc)
            {
                var model = new ObjektViewModel(obj);
                model.AddProperties(this.GetCollectionProperties());
                model.AddRelatedProperties(relatedColumns);
                ObjektViewModels.Add(model);
            }
            this.TotalCount = oc.Pagination.ObjektCount;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public string GetExportTable(string param)
        {
            var paramlist = param.JsonToObject<List<QueryParamModel>>();
            var where = paramlist.ToWhereClause(Klas);
            var oc = new ObjektCollection<Objekt>(Klas, where);
            oc.Load();
            var list = oc.ToList();
            var showProperties = Klas.GetProperties(this.GetPropertyPredicate());
            return list.ToHtmlTable(showProperties);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public string GetListJson(QueryModel query)
        {
            this.GetObjektViewModels(query);
            return this.ToJson();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <param name="orderby"></param>
        /// <param name="isAsc"></param>
        /// <param name="relatedColumns"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [Obsolete]
        public string GetListJson(int page, int rows, string param, string orderby = PropertyNames.modifiedOn, bool isAsc = false, string relatedColumns = "", string filter = "")
        {
            this.GetObjektViewModels(page, rows, param, orderby, isAsc, relatedColumns, filter);
            return this.ToListJson();
        }

        /// <summary>
        /// 对象集合保存
        /// </summary>
        /// <param name="changes"></param>
        public virtual void CollectionSave(string changes)
        {
            var changesList = changes.JsonToObject<List<Dictionary<string,string>>>();
            var savelist = new List<Objekt>();
            changesList.ForEach(obj =>
            {
                var klassid = ObjektFactory.ObjektId2KlassId(obj["id"]);
                var klass = Klass.ForId(klassid);
                var entity = obj["$"] == "C" ? ObjektFactory.New(obj["id"], klass) : ObjektFactory.Find(obj["id"]);
                if (!entity.IsNull())
                {
                    savelist.Add(entity);
                }
            });

            changesList.ForEach(obj =>
            {
                var entity = ObjektFactory.Find(obj["id"]);
                if (entity.IsNull())
                    return;
                if (obj["$"] == "D")
                {
                    entity.Delete();
                }
                else
                {
                    var properties = entity.Klass.GetProperties(o => !o.ReadOnly);
                    obj.Each(change =>
                    {
                        if (change.Key != "$")
                        {
                            if (entity.IsWritableProperty(change.Key))
                            {
                                var property = properties.Find(o => o.Name == change.Key);
                                var value = change.Value.Parse(property.DataTypeId);
                                entity.SetProperty(property.Name, value);
                            }
                        }
                    });
                }
            });
            savelist.Each(o =>o.Save());
        }

        /// <summary>
        /// 对象集合中的对象保存
        /// </summary>
        protected virtual Objekt CollectionObjektSave(Dictionary<string, string> obj)
        {
            var klassid = ObjektFactory.ObjektId2KlassId(obj["id"]);
            var klass = Klass.ForId(klassid);
            var properties = klass.GetProperties(o => !o.ReadOnly);

            Objekt entity;
            if (obj["$"] == "U")
            {
                entity = ObjektFactory.Find(obj["id"]);
                if (entity.IsNull())
                    return null;
            }
            else
                entity = ObjektFactory.New(obj["id"],klass);

            obj.Each(change =>
            {
                if (change.Key != "$")
                {
                    if (entity.IsWritableProperty(change.Key))
                    {
                        var property = properties.Find(o => o.Name == change.Key);
                        var value = change.Value.Parse(property.DataTypeId);
                        entity.SetProperty(property.Name, value);
                    }
                }
            });
            return entity;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToListJson()
        {
            var rows = new StringBuilder("[");
            foreach (var objektModel in this.ObjektViewModels)
            {
                if (rows.ToString() != "[")
                    rows.Append(",");

                rows.Append(objektModel.ToJson());
            }
            rows.Append("]");

            return $"{{ \"total\": \"{this.TotalCount}\", \"rows\": {rows} }}";

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToJson()
        {
            var model = new ObjektCollectionDataModel();
            model.total = this.TotalCount;
            if (!this._query.IsNull())
            {
                model.isAsc = this._query.isAsc;
                model.orderBy = this._query.orderBy;
                model.pageIndex = this._query.pageIndex;
                model.pageSize = this._query.pageSize;
            }
            foreach (var objektModel in this.ObjektViewModels)
            {
                objektModel.AddProperties();
                model.objekts.Add(objektModel.ToJsonObject());
            }
            return model.ObjectToJson();
        }
        

        #endregion

    }
}