
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.Web.Models;
using System.Text.RegularExpressions;
using System.Text;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [LoginRequired]
    public class PlatformController : BaseController
    {
        #region 页面

        /// <summary>
        /// 对象集合页
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="subClass"></param>
        /// <param name="isTrashStation"></param>
        /// <param name="filterId"></param>
        /// <returns></returns>
        public ActionResult ObjektCollectionView(string klass, bool subClass = true, bool isTrashStation = false, string filterId = "")
        {
            var model = new ObjektCollectionViewModel(klass, isTrashStation);
            model.FilterId = filterId.Replace("-", "@");
            if (subClass)
                model.Attributes.Add("hassubklass", "");
            return PartialView("../Shared/_ObjektCollectionView", model);
        }

        /// <summary>
        /// 对象关联集合页
        /// </summary>
        /// <returns></returns>
        public ActionResult ObjektROCView(string id, string sourceKlass, string klass)
        {
            var model = new ROCViewModel(id, klass, sourceKlass);
            return PartialView("../Shared/_ObjektCollectionView", model);
        }


        /// <summary>
        /// 对象页
        /// </summary>
        /// <param name="id">对象ID</param>
        /// <param name="klass">类名</param>
        /// <param name="state"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public ActionResult ObjektView(string id, string klass, string state = "read")
        {
            var model = new ObjektViewModel(id, klass);
            return PartialView("../Shared/_ObjektView", model);
        }

        /// <summary>
        /// 对象引用集合页
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ObjektReferencedCollectionView(string id)
        {
            var model = new ObjektReferencedCollectionViewModel(id);
            return PartialView(model);
        }

        /// <summary>
        /// 对象选择集合页
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="subClass"></param>
        /// <param name="filterid"></param>
        /// <returns></returns>
        public ActionResult SelectObjektCollectionView(string klass, bool subClass = true, string filterid = "")
        {
            var model = new ObjektCollectionViewModel(klass);
            model.FilterId = filterid;
            model.SingleSelect = true;
            if (subClass)
                model.Attributes.Add("hassubklass", "");
            return PartialView("../Shared/_ObjektCollectionView", model);
        }

        /// <summary>
        /// 系统配置页
        /// </summary>
        /// <returns></returns>
        public ActionResult SystemConfigCollectionView(string configType)
        {
            var model = new SystemConfigCollectionViewModel(configType);
            return PartialView(model);
        }


        #endregion

        #region 操作

        /// <summary>
        /// 对象查询
        /// </summary>
        /// <returns></returns>
        public JsonResult GetObjekt(string id, string relatedPropertyNames = "")
        {
            var model = new ObjektViewModel(id);
            var klas = Klass.ForName(model.KlassName);
            model.AddProperties(klas.GetProperties());
            if (!relatedPropertyNames.IsNullOrEmpty())
            {
                model.AddRelatedProperties(relatedPropertyNames);
            }
            var data = model.ToJson();
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 新建ROC对象查询
        /// </summary>
        /// <returns></returns>
        public JsonResult GetNewObjekt(string klass, string relatedId = "", string relatedName = "", string relatedColumns = "")
        {
            var model = new ObjektViewModel("", klass);
            var klas = Klass.ForName(model.KlassName);
            if (!relatedId.IsNullOrEmpty() && !relatedName.IsNullOrEmpty())
            {
                model.Entity.SetProperty(relatedName, ObjektFactory.Find(relatedId));
            }
            model.AddProperties(klas.GetProperties());
            if (!relatedColumns.IsNullOrEmpty())
            {
                model.AddRelatedProperties(relatedColumns);
            }
            var data = model.ToJson();
            var resault = new JsonResultModel(data);
            return Json(resault);
        }


        /// <summary>
        /// 对象查询（包括属性元数据）
        /// </summary>
        /// <returns></returns>
        public JsonResult GetObjektWithPropertyMeta(string klass, string id = "", string dataTypeId = "")
        {
            var model = new ObjektViewModel(id, klass).AddDetailProperties(dataTypeId);
            var data = model.ToJsonWithPropertyMeta();
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="klassname"></param>
        /// <returns></returns>
        public JsonResult GetKlassTree(string klassname)
        {
            var model = new KlassTreeModel(Klass.ForName(klassname));
            model.GetChildren();
            return Json(new JsonResultModel(model.ObjectToJson()));
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="klassname"></param>
        /// <returns></returns>
        public JsonResult GetKlassTreeForViewModle(string klassname)
        {
            var model = new KlassTreeModel(Klass.ForName(klassname));
            model.GetChildren();
            return Json(new JsonResultModel(model.ObjectToJson()));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objektId"></param>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public JsonResult GetPropertyViewOption(string objektId, string propertyName)
        {
            var obj = ObjektFactory.Find(objektId);
            var property = obj.Klass.GetPropertyMetadata(propertyName);
            var propertyModel = PropertyViewFactory.CreateInstance(property, obj);
            var data = propertyModel.GetPropertyUIOptions().ObjectToJson();
            return Json(new JsonResultModel(data));
        }



        /// <summary>
        /// 列表查询
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <param name="orderby"></param>
        /// <param name="isAsc"></param>
        /// <param name="relatedColumns"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [Obsolete("该方法已过时，请使用GetObjektCollection(QueryModel query)代替。", false)]
        public JsonResult GetObjektList(string klass, int page, int rows, string param, string orderby = PropertyNames.modifiedOn, bool isAsc = false, string relatedColumns = "", string filter = "")
        {
            var model = new ObjektCollectionViewModel(klass);
            var data = model.GetListJson(page, rows, param, orderby, isAsc, relatedColumns, filter);
            var resault = new JsonResultModel(data);
            return Json(resault);
        }
        

        /// <summary>
        /// 查询对象集合
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public JsonResult GetObjektCollection(QueryModel query)
        {
            var model = new ObjektCollectionViewModel(query.klass);
            var data = model.GetListJson(query);
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public JsonResult GetObjektCollectionByIds(string[] ids)
        {
            if (ids.IsNullOrEmpty())
            {
                return Json(new JsonResultModel(false,"无效id"));
            }
            var list = new ObjektCollectionViewModel();
            ids.Each(id =>
            {
                if (ObjektFactory.IsExists(id))
                {
                    var obj = ObjektFactory.Find(id);
                    var objModel = new ObjektViewModel(obj);
                    objModel.AddProperties(obj.Klass.GetProperties());
                    list.ObjektViewModels.Add(objModel);
                }
            });
            var result = new JsonResultModel();
            result.Data = list.ToJson();
            return Json(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="map"></param>
        /// <returns></returns>
        public JsonResult GetModifiedObjektCollection(string map)
        {
            var list = new ObjektCollectionViewModel();
            var dic = map.JsonToObject<Dictionary<string, string>>();
            dic.Each(o =>
            {
                if (ObjektFactory.IsExists(o.Key))
                {
                    var obj = ObjektFactory.Find(o.Key);
                    if (obj.ModifiedOn.ToString() != o.Value)
                    {
                        list.ObjektViewModels.Add(new ObjektViewModel(obj));
                    }
                }
            });
            var result = new JsonResultModel();
            result.Data = list.ToJson();
            return Json(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public JsonResult GetObjektReferencedCollection(QueryModel query)
        {
            query.param.Each(o => o.value = (o.value as string[])[0]);
            var model = new ObjektReferencedCollectionViewModel(query.param.Find(o => o.field == PropertyNames.id).value.ToString());
            var data = model.GetReferencedCollectionJson(query);
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 关联集合查询
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public JsonResult GetObjektROC(QueryModel query)
        {
            var model = new ROCViewModel(query.klass);
            var data = model.GetListJson(query);
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 列表保存
        /// </summary>
        /// <param name="changes"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult ListSave(string changes)
        {
            var model = new ObjektCollectionViewModel();
            model.CollectionSave(changes);
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 列表保存
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="changes"></param>
        /// <param name="extraParams">id</param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult ROCSave(string klass, string changes, string extraParams)
        {
            var id = extraParams.Split(',')[0];
            var relationshipName = extraParams.Split(',')[1];
            var model = new ROCViewModel(id, relationshipName, klass);
            model.CollectionSave(changes);
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 详情编辑
        /// </summary>
        /// <param name="id"></param>
        /// <param name="klass"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public JsonResult ObjektEdit(string id, string klass, string obj)
        {
            var model = new ObjektViewModel(id, klass);
            model.ObjektEdit(obj);
            return Json(new JsonResultModel(model.Entity.Id));
        }

        /// <summary>
        /// 列表导出excel
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public JsonResult GridExport(string klass, string param)
        {
            var model = new ObjektCollectionViewModel(klass);
            var data = model.GetExportTable(param);
            var resault = new JsonResultModel(data);
            return Json(resault);
        }

        /// <summary>
        /// 单个属性保存
        /// </summary>
        /// <param name="objektId"></param>
        /// <param name="propertyName"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public JsonResult PropertySave(string objektId, string propertyName, string value)
        {
            var propertyModel = new PropertyViewModel();
            propertyModel.Save(objektId, propertyName, value);
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 对象回收
        /// </summary>
        /// <param name="objektIds"></param>
        /// <param name="isTrash"></param>
        /// <returns></returns>
        public JsonResult SetTrash(string objektIds, bool isTrash)
        {
            var model = new ObjektViewModel();
            model.SetTrash(objektIds, isTrash);
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="listid"></param>
        /// <returns></returns>
        public JsonResult GetListValues(string listid)
        {
            var model = new ListPropertyViewModel(listid);
            return Json(new JsonResultModel(model.ListData));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public JsonResult GetUmlUrl(PlantUMLParamModel model)
        {
            var text = model.GenerateUmlJson();
            return Json(new JsonResultModel(text));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public JsonResult CheckUmlUrl(string url)
        {
            var check = Common.Common.HttpGet(url);
            if (check == "(Error)")
            {
                throw new Exception("UML生成错误！");
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 通过ID获取属性数，并记录对象来源
        /// </summary>
        /// <param name="id"></param>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public JsonResult GetSubPropertys(string id, string parentId)
        {
            var model = new ViewTreeModel(id);
            model.GetChildren(parentId + "/" + id);
            return Json(new JsonResultModel(model.children.ObjectToJson()));
        }


        /// <summary>
        /// 通过id获取对象的属性树集合
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetKlassPropertys(string id)
        {
            List<ViewTreeModel> propertys = new List<Models.ViewTreeModel>();
            string klass = "";

            try
            {
                var objekt = ObjektFactory.Find<Objekt>(id);
                klass = objekt.GetProperty<Klass>("source").Id;
                var sonpropertys = new ObjektCollection<Property>(Klass.ForId(KlassIDs.Property), new WhereClause(" \"source\"='" + klass + "'"));

                foreach (var son in sonpropertys)
                {
                    var treemodel = new ViewTreeModel(son.Id);
                    treemodel.parentId = klass;
                    treemodel.pathId = klass + "/" + son.Id; ;
                    treemodel.pathname = klass.Replace("@Klass", "") + "/" + treemodel.name;
                    propertys.Add(treemodel);
                }


                //"类-ObjektCustomFormView 对象表单视图 的ID：  ObjektCustomFormView@Klass
                var objektcustomformviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektCustomFormView@Klass"), new WhereClause(" \"source\"='" + klass + "'"));
                if (objektcustomformviews.Count > 0)
                {
                    var objektcustomformview = new ViewTreeModel("ObjektCustomFormView@Klass");
                    objektcustomformview.parentId = klass;
                    objektcustomformview.pathId = klass + "/ObjektCustomFormView@Klass";
                    objektcustomformview.pathname = klass.Replace("@Klass", "") + "/ObjektCustomFormView "; ;
                    propertys.Add(objektcustomformview);
                }

                var objektdetailviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektDetailView@Klass"), new WhereClause(" \"source\"='" + klass + "'"));
                if (objektdetailviews.Count > 0)
                {
                    //"类-ObjektDetailView 对象明细视图"的ID： ObjektDetailView @Klass
                    var objektdetailview = new ViewTreeModel("ObjektDetailView@Klass");
                    objektdetailview.parentId = klass;
                    objektdetailview.pathId = klass + "/ObjektDetailView@Klass";
                    objektdetailview.pathname = klass.Replace("@Klass", "") + "/ObjektDetailView"; ;
                    propertys.Add(objektdetailview);
                }
                var objektcollectionviews = new ObjektCollection<Objekt>(Klass.ForId("ObjektCollectionView@Klass"), new WhereClause(" \"source\"='" + klass + "'"));
                if (objektcollectionviews.Count > 0)
                {
                    //"类-ObjektCollectionView 对象集合视图"的ID： ObjektCollectionView @Klass
                    var objektcollectionview = new ViewTreeModel("ObjektCollectionView@Klass");
                    objektcollectionview.parentId = klass;
                    objektcollectionview.pathId = klass + "/ObjektCollectionView@Klass";
                    objektcollectionview.pathname = klass.Replace("@Klass", "") + "/ObjektCollectionView";
                    propertys.Add(objektcollectionview);
                }
            }
            catch
            {

            }

            return Json(new JsonResultModel(propertys.ObjectToJson()));
        }


        /// <summary>
        /// 获得视图模型显示数据
        /// </summary>
        /// <param name="objektid"></param>
        /// <param name="viewid"></param>
        /// <param name="viewline"></param>
        /// <returns></returns>
        public JsonResult GetView(string objektid, string viewid, string viewline)
        {

            string klass = "";
            string htmlview = "";

            var objekt = ObjektFactory.Find<Objekt>(viewid);
            klass = objekt.GetProperty<Klass>("source").Id.Replace("@Klass", "");
            htmlview = objekt.GetProperty("content").ToString();

            var obj = new StringBuilder("{");
            obj.Append("\"objektid\" : \"" + objektid + "\",");
            obj.Append("\"viewid\" : \"" + viewid + "\",");
            if (objektid.IndexOf("@" + klass) > -1)
            {

                #region xd_property 属性组件
                // 定义正则表达式用来匹配  
                Regex regproperty = new Regex("<input align=\"absMiddle\" class=\"AUTO\" datafld=\"SYS_DATE_CN\" element_type=\"xd_property\"(?<inputflag>[\\s\\S]*?)/>", RegexOptions.IgnoreCase);

                // 搜索匹配的字符串 
                MatchCollection matchepropertys = regproperty.Matches(htmlview);
                string inputflag = "";
                string pathname = "";
                string propertyid = "";
                string propertyname = "";
                string id = "";
                

                // 取得匹配项列表 
                foreach (Match match in matchepropertys)
                {
                    inputflag = match.Groups["inputflag"].Value;
                    Regex regParent = new Regex("pathname=\"(?<pathname>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection parentmatches = regParent.Matches(inputflag);
                    pathname = parentmatches[0].Groups["pathname"].Value;
                    //Property
                    Regex regPropertyname = new Regex("propertyname=\"(?<propertyname>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection propertynamematches = regPropertyname.Matches(inputflag);
                    propertyname = propertynamematches[0].Groups["propertyname"].Value;
                    //propertyid
                    Regex regpropertyid = new Regex("propertyid=\"(?<propertyid>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection propertyidmatches = regpropertyid.Matches(inputflag);
                    propertyid = propertyidmatches[0].Groups["propertyid"].Value;


                    //id
                    Regex regid = new Regex("id=\"(?<id>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection idmatches = regid.Matches(inputflag);
                    id = idmatches[0].Groups["id"].Value;


                    string[] parents = pathname.Split('/');


                    Objekt parentobjekt = ObjektFactory.Find<Objekt>(objektid);
                    for (int i = 1; i < parents.Length - 1; i++)
                    {
                        if (parentobjekt != null)
                        {
                            parentobjekt = parentobjekt.GetProperty<Objekt>(parents[i]);
                        }
                    }
                    if (parentobjekt != null)
                    {
                        var property = ObjektFactory.Find<Property>(propertyid);
                        var propertyModel = PropertyViewFactory.CreateInstance(property, parentobjekt);
                        propertyModel.GetPropertyValue(parentobjekt);
                        propertyModel.Hidden = false;
                        var options = new StringBuilder("{");
                        options.Append($"\"elementname\" : \"{propertyModel.ElementName}\"");
                        options.Append(",");
                        options.Append("\"id\" : \""+ id + "\"");
                        options.Append(",");
                        options.Append("\"divname\" : \"" + pathname + "\"");
                        var dic = propertyModel.GetPropertyUIOptions();
                        dic.Each(d =>
                        {
                            options.Append(",");
                            //var dvalue = d.Value;
                            //if (d.Key != "value")
                            //    dvalue = "\"" + d.Value + "\"";
                            var dvalue = "\"" + d.Value + "\"";
                            char[] chrCharArray = dvalue.ToCharArray();
                            if (chrCharArray.Length > 3 && chrCharArray[1] == '\"' && chrCharArray[chrCharArray.Length - 2] == '\"')
                            {
                                dvalue = d.Value;
                            }
                            options.Append("\"" + d.Key + "\" :" + dvalue);
                        });
                        options.Append("},");

                        obj.Append("\"" + pathname + "\" : " + options);
                    }
                    htmlview = htmlview.Replace("<input align=\"absMiddle\" class=\"AUTO\" datafld=\"SYS_DATE_CN\" element_type=\"xd_property\"" + inputflag + "/>", "<div name=\"" + pathname + "\"></div>");
                }
                #endregion

                #region  xd_calc_property  按属性计算
                // 定义正则表达式用来匹配  
                Regex regcalc_property = new Regex("<input align=\"absMiddle\" class=\"CALCU\" element_type=\"xd_calc_property\"(?<inputflag>[\\s\\S]*?)/>", RegexOptions.IgnoreCase);
                //
                // 搜索匹配的字符串 
                MatchCollection matchecalc_property = regcalc_property.Matches(htmlview);

                string formula = "";
                // 取得匹配项列表 
                foreach (Match match in matchecalc_property)
                {
                    //title = "";
                    formula = "";
                    inputflag = match.Groups["inputflag"].Value;
                    // 搜索匹配的字符串 
                    Regex regvalue = new Regex("value=\"(?<value>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    MatchCollection valuematches = regvalue.Matches(inputflag);
                    formula = valuematches[0].Groups["value"].Value;
                    var options = new StringBuilder("{");
                    options.Append($"\"elementname\" : \"Gf-CalcProperty\"");
                    options.Append(",");
                    options.Append("\"formula\" : \"" + formula + "\"");
                    options.Append(",");
                    options.Append("\"objektId\" : \"" + objektid + "\"");
                    options.Append(",");
                    options.Append("\"ishidden\" : \"false\"");
                    options.Append(",");
                    options.Append("\"divname\" : \"" + formula + "\"");
                    options.Append("},");
                    obj.Append("\"" + formula + "\" : " + options);
                    htmlview = htmlview.Replace("<input align=\"absMiddle\" class=\"CALCU\" element_type=\"xd_calc_property\"" + inputflag + "/>", "<div name=\"" + formula + "\"></div>");
                }
                #endregion

                #region  xd_calc_component  按组件计算
                // 定义正则表达式用来匹配  
                Regex regcalc_component = new Regex("<input align=\"absMiddle\" class=\"CALCU\" element_type=\"xd_calc_component\"(?<inputflag>[\\s\\S]*?)/>", RegexOptions.IgnoreCase);
                // 搜索匹配的字符串 
                MatchCollection matchecalc_component = regcalc_component.Matches(htmlview);
                string formula_component = "";
                // 取得匹配项列表 
                foreach (Match match in matchecalc_component)
                {
                    formula_component = "";
                    inputflag = match.Groups["inputflag"].Value;
                    // 搜索匹配的字符串 
                    Regex regvalue = new Regex("value=\"(?<value>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    MatchCollection valuematches = regvalue.Matches(inputflag);
                    formula_component = valuematches[0].Groups["value"].Value;


                    //id
                    Regex regid = new Regex("id=\"(?<id>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection idmatches = regid.Matches(inputflag);
                    id = idmatches[0].Groups["id"].Value;

                    var options = new StringBuilder("{");
                    options.Append($"\"elementname\" : \"Gf-CalcComponent\"");
                    options.Append(",");
                    options.Append("\"formula\" : \"" + formula_component + "\"");
                    options.Append(",");
                    options.Append("\"id\" : \"" + id + "\"");
                    options.Append(",");
                    options.Append("\"ishidden\" : \"false\"");
                    options.Append(",");
                    options.Append("\"divname\" : \"" + formula_component + "\"");
                    options.Append("},");
                    obj.Append("\"" + formula_component + "\" : " + options);
                    htmlview = htmlview.Replace("<input align=\"absMiddle\" class=\"CALCU\" element_type=\"xd_calc_component\"" + inputflag + "/>", "<div name=\"" + formula_component + "\"></div>");
                }
                #endregion

                #region  xd_view  子视图
                // 定义正则表达式用来匹配  
                Regex regview = new Regex("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\"(?<imgflag>[\\s\\S]*?)/>", RegexOptions.IgnoreCase);
                //
                // 搜索匹配的字符串 
                MatchCollection matcheview = regview.Matches(htmlview);
                string imgflag = "";
                string childviewid = "";
                string parentid = "";
                // 取得匹配项列表 
                foreach (Match match in matcheview)
                {
                    imgflag = match.Groups["imgflag"].Value;

                    Regex regParent = new Regex("pathname=\"(?<pathname>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection parentmatches = regParent.Matches(imgflag);
                    pathname = parentmatches[0].Groups["pathname"].Value;

                    Regex regtitle = new Regex("viewid=\"(?<viewid>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection viewidmatches = regtitle.Matches(imgflag);
                    childviewid = viewidmatches[0].Groups["viewid"].Value;
                    Regex regparentid = new Regex("value=\"(?<parentid>[\\s\\S]*?)\"", RegexOptions.IgnoreCase);
                    // 搜索匹配的字符串 
                    MatchCollection parentidmatches = regparentid.Matches(imgflag);
                    parentid = parentidmatches[0].Groups["parentid"].Value;

                    //视图线
                    viewline = viewline + "|" + objektid + "," + viewid;

                    Objekt childobjekt = ObjektFactory.Find<Objekt>(objektid);
                    string[] parents = parentid.Split('/');

                    for (int i = 1; i < parents.Length - 1; i++)
                    {
                        if (childobjekt != null)
                        {
                            childobjekt = childobjekt.GetProperty<Objekt>(parents[i]);
                        }
                    }
                    if (childobjekt != null)
                    {
                        if (viewline.IndexOf("|" + childobjekt.Id + "," + childviewid) > -1)
                        {
                            //视图循环
                            htmlview = htmlview.Replace("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\"" + imgflag + "/>", "<div name=\"" + pathname + "/" + childviewid + "\">视图循环</div>");
                        }
                        else
                        {
                            var options = new StringBuilder("{");
                            options.Append($"\"elementname\" : \"Gf-ViewModel\"");
                            options.Append(",");
                            options.Append("\"objektId\" : \"" + childobjekt.Id + "\"");
                            options.Append(",");
                            options.Append("\"viewid\" : \"" + childviewid + "\"");
                            options.Append(",");
                            options.Append("\"viewline\" : \"" + viewline + "\"");
                            options.Append(",");
                            options.Append("\"ishidden\" : \"false\"");
                            options.Append(",");
                            options.Append("\"divname\" : \"" + pathname + "/" + childviewid + "\"");
                            options.Append("},");
                            obj.Append("\"" + pathname + "/" + childviewid + "\" : " + options);
                            htmlview = htmlview.Replace("<img align=\"absMiddle\" class=\"CALENDAR\" element_type=\"xd_view\"" + imgflag + "/>", "<div name=\"" + pathname + "/" + childviewid + "\"></div>");
                        }
                    }
                }

                #endregion
                obj.Append("\"htmlview\" : \"" + htmlview.ConvertUnicodeToJsonFormatL() + "\"");
                obj.Append("}");
            }
            else
            {
                throw new Exception("");
            }
            var resault = new JsonResultModel(obj.ToString());
            return Json(resault);
        }

        /// <summary>
        /// 获得对象的视图列表
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="objektid"></param>
        /// <param name="viewtype"></param>
        /// <returns></returns>
        public JsonResult GetViewList(string klass, string objektid , string viewtype)
        {
            int viewcount = 0;
            var obj = new StringBuilder("{");
            obj.Append("\"viewtype\" : \"" + viewtype + "\"");
            if (viewtype == "ObjektCustomFormView")
            {
                //"类-ObjektCustomFormView 对象表单视图"的ID： ObjektCustomFormView@Klass
                var views = new ObjektCollection<Objekt>(Klass.ForId("ObjektCustomFormView@Klass"), new WhereClause(" \"source\"='" + klass + "@Klass'"));
                if (views.Count > 0)
                {
                    foreach (Objekt view in views)
                    {
                        var options = new StringBuilder("{");
                        options.Append("\"viewid\" : \"" + view.Id + "\"");
                        options.Append(",");
                        options.Append("\"viewname\" : \"" + view.GetProperty("name").ToString() + "\"");
                        options.Append(",");
                        options.Append("\"ishidden\" : \"false\"");
                        options.Append("}");
                        obj.Append(",\"" + view.GetProperty("name").ToString() + "\" : " + options);
                        viewcount = viewcount + 1;
                    }
                }
            }
            else if (viewtype == "ObjektDetailView")
            {
                var views = new ObjektCollection<Objekt>(Klass.ForId("ObjektDetailView@Klass"), new WhereClause(" \"source\"='" + klass + "@Klass'"));
                if (views.Count > 0)
                {
                    foreach (Objekt view in views)
                    {
                        var options = new StringBuilder("{");
                        options.Append("\"viewid\" : \"" + view.Id + "\"");
                        options.Append(",");
                        options.Append("\"viewname\" : \"" + view.GetProperty("name").ToString() + "\"");
                        options.Append(",");
                        options.Append("\"ishidden\" : \"false\"");
                        options.Append("}");
                        obj.Append(",\"" + view.GetProperty("name").ToString() + "\" : " + options);
                        viewcount = viewcount + 1;
                    }
                }
            }
            obj.Append("}");


            if (viewcount > 0)
            {
                var resault = new JsonResultModel(obj.ToString());
                return Json(resault);
            }
            else
            {
                return GetObjektWithPropertyMeta(klass, objektid, "");
            }
        }

        /// <summary>
        /// 获取视图内容
        /// </summary>
        /// <param name="objektid"></param>
        /// <param name="viewid"></param>
        /// <returns></returns>
        public ActionResult GetCustomFormView(string objektid, string viewid)
        {
            var model = new CustomFormViewModel();
            model.ObjektId = objektid;
            model.ViewId = viewid;
            return PartialView("../Shared/_CustomFormView", model);
        }

        #endregion
    }
}