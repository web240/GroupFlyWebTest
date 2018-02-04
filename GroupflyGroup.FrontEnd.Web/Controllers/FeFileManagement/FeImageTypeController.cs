using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.ObjectFramework.Strings;
namespace GroupflyGroup.FrontEnd.Web.Controllers.FileManagement
{
    public class FeImageTypeController : Controller
    {
        // GET: FeTabLibrary
        public ActionResult Index()
        {
            return View("FeImageTypeList", new BaseViewModel());
        }        

        public ActionResult GotoAddImageType(string TypeID)
        {
            if (TypeID == null)
            {
                FeImageSizeModel imagetypesize = new FeImageSizeModel();
                return View("FeImageTypeNew", imagetypesize);
            }
            else
            {
                FeImageType feImageType = ObjektFactory.Find<FeImageType>(TypeID);
                FeImageSizeModel imagetypesize = new FeImageSizeModel();
                imagetypesize.TypeName = feImageType.Name;
                imagetypesize.Description = feImageType.Description;
                return View("FeImageTypeOperate", imagetypesize);
            }
            
           
        }



        public JsonResult DelImageTypeOne(string id)
        {          
            FeImageType feImageType = ObjektFactory.Find<FeImageType>(id);
            feImageType.Delete();
            feImageType.Save();          
            return Json(new JsonResultModel());
        }


        public JsonResult DelImageType(List<FeImageType> ImageTypeList)
        {
            foreach (var ImageType in ImageTypeList)
            {
                FeImageType feImageType = ObjektFactory.Find<FeImageType>(ImageType.Id);
                feImageType.Delete();
                feImageType.Save();
            }
            return Json(new JsonResultModel());
        }


        /// <summary>
        /// 获取图片尺寸列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetImageSizeList()
        {
            ObjektCollection<FeImageSize> oc = new
               ObjektCollection<FeImageSize>(Klass.ForId(FeKlassIDs.FeImageSize));
            // oc.OrderByClause.Add(new OrderByCell(PropertyNames.modifiedOn, Order.Desc));
            List<FeImageSizeModel> listfeImageSize = new List<FeImageSizeModel>();
            foreach (var o in oc)
            {
                FeImageSizeModel imagetypesize = new FeImageSizeModel();  
                imagetypesize.ID = o.Id;              
                imagetypesize.Height = o.Height;
                imagetypesize.Width = o.Width;
                listfeImageSize.Add(imagetypesize);
            }      
            return Json(listfeImageSize.ToList(), JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 获取图片类型列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetImageTypePageList(int pageNumber, int pageSize, string param)
        {
            ObjektCollection<FeImageTypeImageSize> oc = new
               ObjektCollection<FeImageTypeImageSize>(Klass.ForId(FeKlassIDs.FeImageTypeImageSize)).ToView();
            // oc.OrderByClause.Add(new OrderByCell(PropertyNames.modifiedOn, Order.Desc));

            string ids = "";
            List<FeImageSizeModel> listfeImageTypeSize = new List<FeImageSizeModel>();
            foreach (var o in oc)
            {
                FeImageSizeModel imagetypesize = new FeImageSizeModel();
                FeImageType feImageType = (o.Source as FeImageType);
                FeImageSize feImageSize = (o.Related as FeImageSize);
                ids = ids + "'" + feImageType.Id + "',";
                imagetypesize.ID = feImageType.Id;
                imagetypesize.TypeName = feImageType.Name;
                imagetypesize.Description = feImageType.Description;
                if (feImageSize != null)
                {
                    imagetypesize.Height = feImageSize.Height;
                    imagetypesize.Width = feImageSize.Width;
                }
                listfeImageTypeSize.Add(imagetypesize);
            }


            ObjektCollection<FeImageType> oc2;
            if (!string.IsNullOrEmpty(ids))
            {
                oc2 = new ObjektCollection<FeImageType>(Klass.ForId(FeKlassIDs.FeImageType), new WhereClause("\"id\" not in (" + ids.TrimEnd(',') + ")")).ToView();
            }
            else
            {
                oc2 = new ObjektCollection<FeImageType>(Klass.ForId(FeKlassIDs.FeImageType)).ToView();
            }
            if (oc2 != null)
            {
                foreach (var o in oc2)
                {
                    FeImageSizeModel imagetypesize = new FeImageSizeModel();
                    FeImageType feImageType = (o as FeImageType);

                    ids = "'" + feImageType.Id + "',";
                    imagetypesize.ID = feImageType.Id;
                    imagetypesize.TypeName = feImageType.Name;
                    imagetypesize.Description = feImageType.Description;
                    listfeImageTypeSize.Add(imagetypesize);
                }
            }
            var count = listfeImageTypeSize.OrderBy(t => t.TypeName).Count();
            var rows = listfeImageTypeSize.OrderBy(t => t.TypeName).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("total", count);
            dic.Add("rows", rows);
            var data = new JsonResultModel(dic.ObjectToJson());
            return Json(data);
        }

        /// <summary>
        /// 获取图片类型列表（图片类型下拉）
        /// </summary>
        /// <returns></returns>
        public JsonResult GetImageTypeList()
        {
            ObjektCollection<FeImageType> oc = new  ObjektCollection<FeImageType>(Klass.ForId(FeKlassIDs.FeImageType));        
            List<FeImageTypeModel> listfeImageType = new List<FeImageTypeModel>();

            FeImageTypeModel feImageTypeModel1 = new FeImageTypeModel();
            feImageTypeModel1.ID = "-1";
            feImageTypeModel1.Name ="--全部--";

            listfeImageType.Add(feImageTypeModel1);

            foreach (var o in oc)
            {
                FeImageTypeModel feImageTypeModel = new FeImageTypeModel();
                feImageTypeModel.ID = o.Id;
                feImageTypeModel.Name = o.Name;
                listfeImageType.Add(feImageTypeModel);
            }
            return Json(listfeImageType, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 添加图片类型
        /// </summary>
        /// <param name="TabName"></param>
        /// <returns></returns>
        public JsonResult AddFeImageType()
        {
            ObjektCollection<FeImageSize> oc = new ObjektCollection<FeImageSize>(Klass.ForId(FeKlassIDs.FeImageSize));
                     
            FeImageType ImageType = new FeImageType();
            Random ra = new Random(9999);
            ImageType.Name= "默认图片类型"+ ra.Next(0,9999);
            ImageType.Description ="默认图片描述";
            ImageType.Save();

            FeImageTypeImageSize imageTypeImageSize = new FeImageTypeImageSize();
            imageTypeImageSize.Source = ImageType;
            imageTypeImageSize.Related = oc[0];
            imageTypeImageSize.cutType = ObjektFactory.Find<Value>(FeValueIDs.FeImageCutType_LeftTop);
            imageTypeImageSize.Save();

            return Json(new JsonResultModel(),JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 修改图片类型
        /// </summary>
        public JsonResult OpFeImageType(string id, string tname, string tdes)
        {
            FeImageType ImageType = new FeImageType();
            if (id != null)
            {
                ImageType = ObjektFactory.Find<FeImageType>(id);
            }
            ImageType.Name = tname;
            ImageType.Description = tdes;
            ImageType.Save();
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 添加图片类型
        /// </summary>
        /// <param name="TabName"></param>
        /// <returns></returns>
        public JsonResult OpFeImageTypeSize(string theight, string twidth,string tcuttype,string imagetypid,string typesizesizeid)
        {
            if (typesizesizeid=="0")
            {
                FeImageTypeImageSize typeImageSize = new FeImageTypeImageSize();
                FeImageType imagetype = ObjektFactory.Find<FeImageType>(imagetypid);             
                typeImageSize.Source = imagetype;                                                               
                typeImageSize.cutType = ObjektFactory.Find<Value>(tcuttype);
                FeImageSize imagesize;
                string strImageSizeName="";
                if (tcuttype == FeValueIDs.FeImageCutType_LeftTop)
                {
                    strImageSizeName = FeValueValues.FeImageCutType_LeftTop + "_" + twidth + "X" + theight;
                }
                else
                {
                    if (twidth == "-1")
                    {
                        strImageSizeName = FeValueValues.FeImageCutType_RatioZoom + "_" +  "*" + "X" +theight;
                    }
                    else
                    {
                        strImageSizeName = FeValueValues.FeImageCutType_RatioZoom + "_" + twidth + "X" + "*";
                    }
                }
                var existimageSize = new ObjektCollection<FeImageSize>(Klass.ForId(FeKlassIDs.FeImageSize), new WhereClause("\"name\" = '" + strImageSizeName + "'"));
                if (existimageSize.Count > 0)
                {
                     imagesize = existimageSize[0] as FeImageSize;
                }
                else
                {
                     imagesize = new FeImageSize();
                     imagesize.Name = strImageSizeName;
                     imagesize.Width = Convert.ToInt32(twidth);
                     imagesize.Height = Convert.ToInt32(theight);
                     imagesize.Save();
                }   
                typeImageSize.Related = imagesize;   
                typeImageSize.Save();

            }
            else
            {
                FeImageTypeImageSize typeImageSize = ObjektFactory.Find<FeImageTypeImageSize>(typesizesizeid);
                FeImageSize imagesize = typeImageSize.Related as FeImageSize;
                typeImageSize.cutType = ObjektFactory.Find<Value>(tcuttype);
                string strImageSizeName = "";
                if (tcuttype == FeValueIDs.FeImageCutType_LeftTop)
                {
                    strImageSizeName = FeValueValues.FeImageCutType_LeftTop + "_" + twidth + "X" + theight;
                }
                else
                {
                    if (twidth == "-1")
                    {
                        strImageSizeName = FeValueValues.FeImageCutType_RatioZoom + "_" + "*" + "X" + theight;
                    }
                    else
                    {
                        strImageSizeName = FeValueValues.FeImageCutType_RatioZoom + "_" + twidth + "X" + "*";
                    }
                }
                var existimageSize = new ObjektCollection<FeImageSize>(Klass.ForId(FeKlassIDs.FeImageSize), new WhereClause("\"name\" = '" + strImageSizeName + "'"));
                if (existimageSize.Count > 0)
                {
                    imagesize = existimageSize[0] as FeImageSize;
                }
                else
                {
                    imagesize = new FeImageSize();
                    imagesize.Name = strImageSizeName;
                    imagesize.Width = Convert.ToInt32(twidth);
                    imagesize.Height = Convert.ToInt32(theight);
                    imagesize.Save();
                }
                typeImageSize.Related = imagesize;
                typeImageSize.Save();
            }  

            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 删除类型对应尺寸
        /// </summary>
        /// <returns></returns>
        public JsonResult DelFeImageTypeSize(string typesizesizeid)
        {
            FeImageTypeImageSize typeImageSize = ObjektFactory.Find<FeImageTypeImageSize>(typesizesizeid);
            //FeImageSize imagesize = typeImageSize.Related as FeImageSize;
            typeImageSize.Delete();
            //imagesize.Delete();
            typeImageSize.Save();
           // imagesize.Save();
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 获取类型对应尺寸
        /// </summary>
        /// <returns></returns>
        public JsonResult GetFeImageTypeSize(string typesizesizeid)
        {
            FeImageTypeImageSize typeImageSize = ObjektFactory.Find<FeImageTypeImageSize>(typesizesizeid);
            FeImageSize imagesize = typeImageSize.Related as FeImageSize;
            FeImageSizeModel sizeModel = new FeImageSizeModel();
            sizeModel.ID = typeImageSize.Id;
            sizeModel.Height = imagesize.Height;
            sizeModel.Width = imagesize.Width;
            sizeModel.SizeName = imagesize.Name;
            sizeModel.CutType = typeImageSize.cutType.Id;
            return Json(sizeModel.ObjectToJson());
        }


        /// <summary>
        /// 获取图片类型对应的尺寸列表
        /// </summary>
        /// <param name="typeid"></param>
        /// <returns></returns>
        public JsonResult GetImageTypeSizeList(string ttypeid)
        {
            FeImageType feImageType = ObjektFactory.Find<FeImageType>(ttypeid);
            var FeImageTyp0eSizeList=  feImageType.ROCC.GetROC(FeRelationshipNames.FeImageTypeImageSize);                   
            List<FeImageSizeModel> listfeImageTypeSize = new List<FeImageSizeModel>();
            foreach (var o in FeImageTyp0eSizeList)
            {
                if (o.Related as FeImageSize == null) { continue; }
                FeImageSizeModel imagetypesize = new FeImageSizeModel();
                imagetypesize.ID = o.Id;
                imagetypesize.SizeName = (o.Related as FeImageSize).Name;
                imagetypesize.CutType = (o as FeImageTypeImageSize).cutType.Value_;
                imagetypesize.TypeName = (o.Source as FeImageType).Name;
                imagetypesize.Description = (o.Source as FeImageType).Description;
                imagetypesize.Height = (o.Related as FeImageSize).Height;
                imagetypesize.Width = (o.Related as FeImageSize).Width;
                imagetypesize.Creator = (o.Related as FeImageSize).Creator.Name;
                imagetypesize.CreatedOn = (o.Related as FeImageSize).CreatedOn.Value.ToString("yyyy/MM/dd  HH:mm:ss");

                listfeImageTypeSize.Add(imagetypesize);
            }

            return Json(listfeImageTypeSize);

        }

    }
}