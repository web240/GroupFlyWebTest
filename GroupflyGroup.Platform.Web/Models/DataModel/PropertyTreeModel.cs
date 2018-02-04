using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;
using File = GroupflyGroup.Platform.ObjectFramework.File;
using System.Text.RegularExpressions;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 属性树模型
    /// </summary>
    public class PropertyTreeModel : TreeModel
    {

        /// <summary>
        /// 通过属性id在构造属性树模型
        /// </summary>
        /// <param name="id"></param>
        public PropertyTreeModel(string id) : base(id)
        {

            this.viewType = id.Split('@')[1];
            if (this.viewType == "Property")
            {
                Property property = ObjektFactory.Find<Property>(id);
                this.name = property.Name;
                if (property.DataType.Value_ == "objekt")
                {
                    this.viewType = "ObjektProperty";
                }
            }
            setInfoByviewType();
        }

        /// <summary>
        /// 
        /// </summary>
        public PropertyTreeModel()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public override void GetChildren()
        {

        }
        /// <summary>
        /// 父Id
        /// </summary>
        public string parentId { get; set; }
        
        /// <summary>
        /// 属性来源Id
        /// </summary>
        public string pathId { get; set; }
        
        /// <summary>
        /// 属性来源
        /// </summary>
        public string pathname { get; set; }

        /// <summary>
        /// 属性名称
        /// </summary>
        public string name { get; set; }


        /// <summary>
        /// 视图类型(Property:纯属性;ObjektProperty:对象属性;Klass:文件夹;ObjektCustomFormView:对象表单视图;ObjektDetailView:明细视图;ObjektCollectionView:集合视图)
        /// </summary>
        public string viewType { get; set; }

        /// <summary>
        /// Property:纯属性;ObjektProperty:对象属性;Klass:文件夹;ObjektCustomFormView:对象表单视图;ObjektDetailView:明细视图;ObjektCollectionView:集合视图
        /// </summary>
        public void setInfoByviewType()
        {
            this.isDirectory = false;
            switch (viewType)
            {
                case "Property":
                    this.isDirectory = false;
                    this.iconCls = "fa fa-code";
                    break;
                case "ObjektProperty":
                    this.isDirectory = true;
                    this.iconCls = "fa fa-file-text-o";
                    break;
                case "Klass":
                    this.isDirectory = true;
                    this.iconCls = "fa fa-list-ul";
                    break;
                case "ObjektCustomFormView":
                    this.isDirectory = false;
                    this.iconCls = "fa fa-id-card-o";
                    break;
                case "ObjektDetailView":
                    this.isDirectory = false;
                    this.iconCls = "fa fa-id-card-o";
                    break;
                case "ObjektCollectionView":
                    this.isDirectory = false;
                    this.iconCls = "fa fa-id-card-o";
                    break;
            }

            this.state = isDirectory ? "closed" : "open";
        }

        /// <summary>
        /// 对象数据源的所属属性
        /// </summary>
        public List<PropertyTreeModel> children { get; set; } = new List<PropertyTreeModel>();

        /// <summary>
        /// 子视图
        /// </summary>
        public string childrenviews { get; set; }

        /// <summary>
        /// 获得子视图
        /// </summary>
        public void GetChildrenViews()
        {
            this.childrenviews = "";
            if (this.viewType == "ObjektDetailView" || this.viewType == "ObjektCustomFormView")
            {
                Objekt objekt = ObjektFactory.Find<Objekt>(id);

                string content = objekt.GetProperty("content").ToString();
                Regex reg = new Regex("viewid=\"(?<viewid>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                // 搜索匹配的字符串 
                MatchCollection matches = reg.Matches(content);
                string viewid = "";
                foreach (Match match in matches)
                {
                    viewid = match.Groups["viewid"].Value;
                    this.childrenviews = this.childrenviews + "," + viewid;
                    var model = new PropertyTreeModel(viewid);
                    //this.children.Add(model);
                    GetChildrenViews(viewid);
                }
            }
        }


        /// <summary>
        /// 获得Content中子视图
        /// </summary>
        /// <param name="id"></param>
        public void GetChildrenViews(string id)
        {
            try
            {
                // 子视图如果找到自己，就不继续往下找了
                if (id != this.id)
                {
                    Objekt objekt = ObjektFactory.Find<Objekt>(id);
                    if (objekt != null)
                    {
                        string content = objekt.GetProperty("content").ToString();

                        Regex reg = new Regex("viewid=\"(?<viewid>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                        // 搜索匹配的字符串 
                        MatchCollection matches = reg.Matches(content);
                        string viewid = "";
                        foreach (Match match in matches)
                        {
                            viewid = match.Groups["viewid"].Value;
                            this.childrenviews = this.childrenviews + "," + viewid;
                            var model = new PropertyTreeModel(viewid);
                            //this.children.Add(model);
                            GetChildrenViews(viewid);
                        }
                    }
                }
            }
            catch
            {
                //throw new Exception("获得子视图失败！");
            }
        }

        /// <summary>
        /// 获得对象的属性或视图
        /// </summary>
        /// <param name="parentId"></param>
        public void GetChildren(string parentId)
        {
            if (this.isDirectory)
            {
                string[] parents = parentId.Split('/');
                string propertyPath = "";
                string propertyKlass = "";
                if (parents.Length > 0)
                {
                    int viewflag = 1;// 视图查找无需查找最后一级路径
                    if (id.IndexOf("@Property") > -1)
                    {
                        viewflag = 0;
                    }
                    propertyPath = parents[0].Replace("@Klass", "");
                    propertyKlass = parents[0];
                    for (int i = 1; i < parents.Length - viewflag; i++)
                    {
                        var property = ObjektFactory.Find<Property>(parents[i]);
                        propertyPath = propertyPath + "/" + property.Name;
                        propertyKlass = property.ObjektDataSourceId;
                    }
                }
                if (id.IndexOf("@Property") > -1)
                {
                    if (this.isDirectory)
                    {
                        Property property = ObjektFactory.Find<Property>(id);
                        var sonpropertys = new ObjektCollection<Property>(Klass.ForId(KlassIDs.Property), new WhereClause(" \"source\"='" + property.ObjektDataSourceId + "'"));
                        foreach (var son in sonpropertys)
                        {
                            var model = new PropertyTreeModel(son.Id);

                            if (model.text.IsNullOrEmpty())
                            {
                                model.text = model.name;
                            }
                            model.parentId = parentId;
                            model.pathId = parentId + "/" + son.Id;
                            model.pathname = propertyPath + "/" + model.name;
                            this.children.Add(model);
                        }
                        var objektviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektCustomFormView@Klass"), new WhereClause(" \"source\"='" + property.ObjektDataSourceId + "'"));
                        if (objektviews.Count > 0)
                        {
                            //"类-ObjektCustomFormView 对象视图模型"的ID： ObjektCustomFormView @Klass
                            var objektview = new PropertyTreeModel("ObjektCustomFormView@Klass");
                            objektview.pathId = parentId + "/ObjektCustomFormView@Klass";
                            objektview.parentId = parentId;
                            objektview.pathname = propertyPath + "/对象视图模型";
                            this.children.Add(objektview);
                        }

                        var objektdetailviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektDetailView@Klass"), new WhereClause(" \"source\"='" + property.ObjektDataSourceId + "'"));
                        if (objektdetailviews.Count > 0)
                        {
                            //"类-ObjektDetailView 对象明细视图"的ID： ObjektDetailView @Klass
                            var objektdetailview = new PropertyTreeModel("ObjektDetailView@Klass");
                            objektdetailview.parentId = parentId;
                            objektdetailview.pathId = parentId + "/ObjektDetailView@Klass";
                            objektdetailview.pathname = propertyPath + "/对象明细视图";
                            this.children.Add(objektdetailview);
                        }
                        var objektcollectionviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektCollectionView@Klass"), new WhereClause(" \"source\"='" + property.ObjektDataSourceId + "'"));
                        if (objektcollectionviews.Count > 0)
                        {
                            //"类-ObjektCollectionView 对象集合视图"的ID： ObjektCollectionView @Klass
                            var objektcollectionview = new PropertyTreeModel("ObjektCollectionView@Klass");
                            objektcollectionview.parentId = parentId;
                            objektcollectionview.pathId = parentId + "/ObjektCollectionView@Klass";
                            objektcollectionview.pathname = propertyPath + "/对象集合视图";
                            this.children.Add(objektcollectionview);
                        }
                        if (this.children.Count == 0)
                            this.state = "open";
                    }
                }
                else
                {
                    if (id.IndexOf("ObjektCustomFormView") > -1)
                    {
                        var objektviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektCustomFormView@Klass"), new WhereClause(" \"source\"='" + propertyKlass + "'"));
                        foreach (var view in objektviews)
                        {

                            var model = new PropertyTreeModel(view.Id);
                            model.parentId = parentId;
                            model.pathId = parentId + "/" + view.Id;
                            model.pathname = propertyPath + "/ObjektCustomFormView/" + view.GetProperty("name");
                            model.GetChildrenViews();
                            if (model.text.IsNullOrEmpty())
                            {
                                model.text = view.GetProperty("name").ToString();
                            }
                            this.children.Add(model);
                        }
                    }
                    else if (id.IndexOf("ObjektDetailView") > -1)
                    {
                        var objektviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektDetailView@Klass"), new WhereClause(" \"source\"='" + propertyKlass + "'"));
                        foreach (var view in objektviews)
                        {
                            var model = new PropertyTreeModel(view.Id);
                            model.parentId = parentId;
                            model.pathId = parentId + "/" + view.Id;
                            model.pathname = propertyPath + "/ObjektDetailView/" + view.GetProperty("name");
                            model.GetChildrenViews();
                            this.children.Add(model);
                        }
                    }
                    if (id.IndexOf("ObjektCollectionView") > -1)
                    {
                        var objektviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektCollectionView@Klass"), new WhereClause(" \"source\"='" + propertyKlass + "'"));
                        foreach (var view in objektviews)
                        {
                            var model = new PropertyTreeModel(view.Id);
                            model.parentId = parentId;
                            model.pathId = parentId + "/" + view.Id;
                            model.pathname = propertyPath + "/ObjektCollectionView/" + view.GetProperty("name");
                            model.GetChildrenViews();
                            this.children.Add(model);
                        }
                    }
                }
            }
        }
    }
}