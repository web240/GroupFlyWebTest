using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ObjektReferencedCollectionViewModel : BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ObjektReferencedCollectionViewModel()
        {
            
        }

        /// <summary>
        /// 
        /// </summary>
        public ObjektReferencedCollectionViewModel(string id)
        {
            if (ObjektFactory.IsExists(id))
            {
                Id = id;
                Entity = ObjektFactory.Find(id);
            }
        }

        /// <summary>
        /// 获取引用实体集合
        /// </summary>
        public void GetReferencedCollection(QueryModel query)
        {
            var refProperties = new List<Property>();
            var refObjekts = new List<Objekt>();
            if (Entity.IsNull() || !Entity.IsExists())
            {
                this.TotalCount = 0;
                return;
            }

            refObjekts = Entity.LogicalReferencedBy(out refProperties);
            this.TotalCount = refObjekts.Count;

            refObjekts = refObjekts.Take(query.pageSize * query.pageIndex).Skip(query.pageSize * (query.pageIndex - 1)).ToList();
            refProperties = refProperties.Take(query.pageSize * query.pageIndex).Skip(query.pageSize * (query.pageIndex - 1)).ToList();

            for (int i = 0; i < refObjekts.Count; i++)
            {
                var o = refObjekts[i];
                var c = o.Klass;
                var p = refProperties[i];
                ReferencedCollection.Add(new ObjektReferencedViewModel
                {
                    RefKlass = new
                    {
                        id = c.Id,
                        combinedLabel = c.CombinedLabel,
                        klass = c.Klass.Name,
                        title = c.Klass.Label + "-" + c.CombinedLabel,
                        permissioncode = new ObjektViewModel(c).Permission.Code
                    }.ObjectToJson(),

                    RefObjekt = new
                    {
                        id = o.Id,
                        combinedLabel = o.CombinedLabel,
                        klass = o.Klass.Name,
                        title = o.Klass.Label + "-" + o.CombinedLabel,
                        permissioncode = new ObjektViewModel(o).Permission.Code
                    }.ObjectToJson(),

                    RefProperty = new
                    {
                        id = p.Id,
                        combinedLabel = p.CombinedLabel,
                        klass = p.Klass.Name,
                        title = p.Klass.Label + "-" + p.CombinedLabel,
                        permissioncode = new ObjektViewModel(p).Permission.Code
                    }.ObjectToJson()
                });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToListJson()
        {
            var rows = new StringBuilder("[");
            foreach (var objektModel in this.ReferencedCollection)
            {
                if (rows.ToString() != "[")
                    rows.Append(",");

                rows.Append(objektModel.ToJson());
            }
            rows.Append("]");

            return $"{{ \"total\": \"{this.TotalCount}\", \"rows\": {rows} }}";
        }

        /// <summary>
        /// 获取引用实体集合json
        /// </summary>
        public string GetReferencedCollectionJson(QueryModel query)
        {
            this.GetReferencedCollection(query);
            return this.ToListJson();
        }

        /// <summary>
        /// 被引用源实体
        /// </summary>
        public Objekt Entity { get; set; }

        /// <summary>
        /// 被引用源实体Id
        /// </summary>
        public string Id { get; protected set; }

        /// <summary>
        /// 分页总条数
        /// </summary>
        public long TotalCount { get; protected set; }

        /// <summary>
        /// 引用实体集合
        /// </summary>
        public List<ObjektReferencedViewModel> ReferencedCollection { get; set; } = new List<ObjektReferencedViewModel>();
    }
}