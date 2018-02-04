using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Service;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;
using File = GroupflyGroup.Platform.ObjectFramework.File;
using System.Drawing.Drawing2D;
using System.Threading;
using System.Web;
//using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using GroupflyGroup.Platform.ObjectFramework.RDb;
using System.Data.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Configuration;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeFileManagement
{
    /// <summary>
    ///     图片管理
    /// </summary>
    public class FeImageController : Controller
    {

        /// <summary>
        /// 文件级子文件是否被引用
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        [HttpPost]
        public bool FileIsReference(string fileId)
        {

            bool result = false;

            File file = ObjektFactory.Find<File>(fileId);

            if (file != null)
            {

                //1.先查找自己是否被非file对象的parent引用过
                List<Property> porperty;
                var refFileList = file.LogicalReferencedBy(out porperty);

                for (int i = 0; i < refFileList.Count; i++)
                {

                    if (refFileList[i].KlassId != KlassIDs.File || porperty[i].Name != FePropertyNames.parent)
                    {
                        result = true;
                        break;
                    }

                }

                //2.如果自己是文件夹，切自己没被引用过，查找自己所有子孙文件，是否被非file对象的parent引用过
                if (!result && file.IsDirectory)
                {
                    foreach (var descendantsFile in file.GetDescendantsFiles())
                    {

                        refFileList = descendantsFile.LogicalReferencedBy(out porperty);

                        for (int i = 0; i < refFileList.Count; i++)
                        {

                            if (refFileList[i].KlassId != KlassIDs.File || porperty[i].Name != FePropertyNames.parent)
                            {
                                result = true;
                                break;
                            }

                        }

                    }
                }

            }

            return result;
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult ImageViewer()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        /// 回收站
        /// </summary>
        /// <returns></returns>
        public ActionResult Recycle()
        {
            return View(new BaseViewModel());
        }

        /// <summary>
        /// 获取引用列表
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetReferenceList(string fileId, int pageSize, int pageNumber)
        {

            File file = ObjektFactory.Find<File>(fileId);

            if (file == null)
            {
                throw new Exception("无法找到文件");
            }
            List<Property> porperty;
            var refFileList = file.LogicalReferencedBy(out porperty);
            List<ReferenceListItemViewModel> referenceList = new List<ReferenceListItemViewModel>();

            for (int i = 0; i < refFileList.Count; i++)
            {

                if (refFileList[i].KlassId != KlassIDs.File || porperty[i].Name != FePropertyNames.parent)
                {
                    referenceList.Add(new ReferenceListItemViewModel
                    {
                        RefObjectId = refFileList[i].Id,
                        RefObject = refFileList[i].CombinedLabel,
                        RefPorperty = porperty[i].CombinedLabel,
                        SourceObject = file.CombinedLabel
                    });
                }

            }

            if (file.IsDirectory)
            {
                foreach (var descendantsFile in file.GetDescendantsFiles())
                {

                    refFileList = descendantsFile.LogicalReferencedBy(out porperty);

                    for (int i = 0; i < refFileList.Count; i++)
                    {

                        if (refFileList[i].KlassId != KlassIDs.File || porperty[i].Name != FePropertyNames.parent)
                        {
                            referenceList.Add(new ReferenceListItemViewModel
                            {
                                RefObjectId = refFileList[i].Id,
                                RefObject = refFileList[i].CombinedLabel,
                                RefPorperty = porperty[i].CombinedLabel,
                                SourceObject = descendantsFile.CombinedLabel
                            });
                        }

                    }

                }
            }

            ReferenceListViewModel model = new ReferenceListViewModel();
            model.Total = referenceList.Count;

            referenceList = referenceList.Take(pageSize * pageNumber).Skip(pageSize * (pageNumber - 1)).ToList();
            model.Items.AddRange(referenceList);

            return Json(model);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="url"></param>
        /// <param name="controlId"></param>
        /// <param name="pageSize"></param>
        /// <param name="htmlAttributes"></param>
        /// <returns></returns>
        public PartialViewResult FeReferenceDialog(string url, string controlId, int? pageSize, object htmlAttributes)
        {

            RouteValueDictionary routeValueDictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);

            FeReferenceDialogViewModel model = new FeReferenceDialogViewModel();
            model.Url = url;
            model.ControlId = controlId;

            if (pageSize.HasValue)
            {
                model.PageSize = pageSize.Value;
            }

            int width;
            int height;

            if (TryFindHtmlAttribute<int>(routeValueDictionary, "width", out width))
            {
                model.Width = width;
            }

            if (TryFindHtmlAttribute<int>(routeValueDictionary, "height", out height))
            {
                model.Width = width;
            }

            return PartialView("_FeReferenceDialog", model);
        }

        private bool TryFindHtmlAttribute<T>(RouteValueDictionary routeValueDictionary, string key, out T value)
        {

            var query = from t in routeValueDictionary
                        where t.Key.ToLower() == key.ToLower()
                        select t;

            value = default(T);

            bool result = true;

            if (query.Count() == 1)
            {

                try
                {
                    value = (T)query.Single().Value;
                }
                catch
                {
                    result = false;
                }

            }
            else
            {
                result = false;
            }

            return result;

        }

        /// <summary>
        /// 多文件上传
        /// </summary>
        /// <param name="directoryId"></param>
        /// <param name="watermarkId"></param>
        /// <param name="sizeIds"></param>
        /// <param name="uploadType"></param>
        /// <param name="replaceId"></param>
        /// <returns></returns>
        public ActionResult UpLoadProcess(string directoryId, string watermarkId, string sizeIds, string uploadType,
            string replaceId)
        {

            var result = new JsonResultModel();
            ImageOperator imageOperator = new ImageOperator();

            if (string.IsNullOrWhiteSpace(uploadType))
            {
                uploadType = "new";
            }

            if (uploadType == "new")
            {
                #region 文件上传

                if (string.IsNullOrWhiteSpace(directoryId))
                {
                    directoryId = FeFileIDs.FeImages;
                }

                if (Request.Files.Count == 0)
                {
                    result.IsSuccess = false;
                    result.Message = "上传失败";
                }
                else
                {
                    try
                    {

                        var upFile = Request.Files[0];

                        //开始处理图片包
                        var strFileName = Path.GetFileName(upFile.FileName);

                        var klass = Klass.ForName(KlassNames.File);
                        var condition = new WhereExpression<File>(klass);
                        condition.Where(PropertyNames.name, Const.Oper_Equals, strFileName + ".feimgpack");
                        condition.Where(PropertyNames.parent, Const.Oper_Equals, directoryId);

                        string sql = "{ fn LCASE(\"" + PropertyNames.name + "\")} = '" + strFileName.ToLower() + ".feimgpack' ";
                        sql += "and \"" + PropertyNames.parent + "\" = '" + directoryId + "'";

                        var file = new ObjektCollection<File>(klass, new WhereClause(sql)).TryGetSingleResult();
                        if (file == null)
                        {

                            //获取图片的宽和高
                            var bmp = new Bitmap(upFile.InputStream);

                            //新增一个图片包目录
                            var imgPack = new File
                            {
                                Name = strFileName + ".feimgpack",
                                Parent = ObjektFactory.Find<File>(directoryId),
                                IsDirectory = true
                            };
                            imgPack.Save();

                            var sourceImg = new File
                            {
                                Name = strFileName,
                                Parent = ObjektFactory.Find<File>(imgPack.Id),
                            };

                            //在图片包中新增原图图片文件
                            sourceImg.FileContent = !string.IsNullOrWhiteSpace(watermarkId) ? imageOperator.CreateWarterImage(watermarkId, upFile.InputStream) : upFile.InputStream;

                            sourceImg.Save();

                            //添加尺寸图片
                            if (!string.IsNullOrWhiteSpace(sizeIds))
                            {
                                string[] ids = sizeIds.Split(new string[] { "," },
                                    StringSplitOptions.RemoveEmptyEntries);

                                foreach (var id in ids)
                                {
                                    FeImageSize imageSize = ObjektFactory.Find<FeImageSize>(id);
                                    //bmp = ZoomImage(upFile, imageOperator, sourceImg, imageSize);
                                    int width = sourceImg.Width.HasValue ? sourceImg.Width.Value : 0;
                                    int height = sourceImg.Height.HasValue ? sourceImg.Height.Value : 0;

                                    bmp = ZoomImage(upFile.InputStream, width, height, imageSize.Width,
                                        imageSize.Height);

                                    if (bmp != null)
                                    {

                                        //using (MemoryStream ms = new MemoryStream())
                                        //{



                                        //}
                                        MemoryStream ms = new MemoryStream();
                                        bmp.Save(ms, new Bitmap(upFile.InputStream).RawFormat);

                                        //生成新文件名
                                        string zoomImageName = strFileName.Substring(0,
                                            strFileName.LastIndexOf("."));
                                        zoomImageName += "_" +
                                                         (imageSize.Width == -1
                                                             ? "*"
                                                             : imageSize.Width.ToString());
                                        zoomImageName += "_" +
                                                         (imageSize.Height == -1
                                                             ? "*"
                                                             : imageSize.Height.ToString());
                                        zoomImageName += strFileName.Substring(strFileName.LastIndexOf("."));

                                        var zoomImage = new File
                                        {
                                            Name = zoomImageName,
                                            Parent = ObjektFactory.Find<File>(imgPack.Id),
                                        };

                                        zoomImage.FileContent = !string.IsNullOrWhiteSpace(watermarkId)
                                            ? imageOperator.CreateWarterImage(watermarkId, ms)
                                            : ms;

                                        zoomImage.Save();

                                    }

                                }

                            }

                            result.IsSuccess = true;
                            //result.Data = file.PathName + strFileName;
                            PersistenceContext.Accept();
                        }
                        else
                        {
                            result.IsSuccess = false;
                            result.Message = "当前文件夹下以存在相同文件名图片！";
                        }
                    }
                    catch (Exception ex)
                    {
                        result.IsSuccess = false;
                        result.Message = "上传失败！";
                        PersistenceContext.Discard();
                    }
                }
                #endregion
            }
            else if (uploadType == "replace")
            {
                #region 替换文件

                result.IsSuccess = false;
                result.Message = "替换失败";

                if (Request.Files.Count != 0)
                {

                    //0.手动事务
                    //1.获取要替换的文件
                    //2.如果是图片，直接替换内容
                    //3.如果图片包，先替换原图
                    //4.根据原有图片包中的其他图片名称计算出尺寸，缩放后并替换
                    try
                    {
                        var upFile = Request.Files[0];
                        File replaceFile = ObjektFactory.Find<File>(replaceId);

                        if (replaceFile != null)
                        {

                            //获取图片的宽和高
                            var bmp = new Bitmap(upFile.InputStream);

                            //如果是图片，直接替换内容
                            if (replaceFile.FileType.IsImage)
                            {

                                replaceFile.FileContent = !string.IsNullOrWhiteSpace(watermarkId)
                                    ? imageOperator.CreateWarterImage(watermarkId, upFile.InputStream)
                                    : upFile.InputStream;

                                //replaceFile.Height;
                                //replaceFile.Width;


                                replaceFile.Save();
                                result.IsSuccess = true;
                                result.Message = "替换成功";
                            }
                            else if (replaceFile.IsDirectory && replaceFile.Name.EndsWith(".feimgpack")) //如果图片包
                            {
                                #region 处理所有子图片文件

                                //处理所有子图片文件
                                foreach (var childrenFile in replaceFile.GetChildrenFiles())
                                {

                                    if (childrenFile.FileType != null
                                        && childrenFile.FileType.IsExists()
                                        && childrenFile.FileType.IsImage)
                                    {

                                        //原图直接替换
                                        if (childrenFile.Name + ".feimgpack" == replaceFile.Name)
                                        {

                                            childrenFile.FileContent = !string.IsNullOrWhiteSpace(watermarkId)
                                                ? imageOperator.CreateWarterImage(watermarkId, upFile.InputStream)
                                                : upFile.InputStream;
                                            childrenFile.Save();
                                        }
                                        else
                                        {
                                            string childrenFileName = childrenFile.Name;
                                            childrenFileName = childrenFileName.Substring(0, childrenFileName.LastIndexOf("."));
                                            var split = childrenFileName.Split(new string[] { "_" },
                                                StringSplitOptions.RemoveEmptyEntries);

                                            int width;
                                            int height;
                                            bool tag = true;

                                            if (split[split.Length - 1] == "*")
                                            {
                                                height = -1;
                                            }
                                            else if (!int.TryParse(split[split.Length - 1], out height))
                                            {
                                                tag = false;
                                            }

                                            if (split[split.Length - 2] == "*")
                                            {
                                                width = -1;
                                            }
                                            else if (!int.TryParse(split[split.Length - 2], out width))
                                            {
                                                tag = false;
                                            }

                                            if (tag)
                                            {
                                                var newImage = ZoomImage(upFile.InputStream, bmp.Width,
                                                    bmp.Height, width, height);

                                                if (newImage != null)
                                                {
                                                    using (MemoryStream ms = new MemoryStream())
                                                    {
                                                        newImage.Save(ms, new Bitmap(upFile.InputStream).RawFormat);

                                                        childrenFile.FileContent = !string.IsNullOrWhiteSpace(watermarkId) ?
                                                            imageOperator.CreateWarterImage(watermarkId, ms) :
                                                            ms;
                                                        childrenFile.Save();
                                                    }
                                                }
                                            }

                                        }

                                    }

                                }

                                #endregion

                                result.IsSuccess = true;
                                result.Message = "替换成功";
                            }
                        }
                        PersistenceContext.Accept();
                    }
                    catch
                    {
                        result.IsSuccess = false;
                        result.Message = "替换失败！";
                        PersistenceContext.Discard();
                    }
                }
                #endregion
            }
            else
            {
                result.IsSuccess = false;
                result.Message = "无法识别的操作";
            }
            return Json(result);
        }

        private static Bitmap ZoomImage(Stream imageStream, int sourceWidth, int souceHeight, int destWidth,
            int destHeight)
        {
            Bitmap bmp = null;
            ImageOperator imageOperator = new ImageOperator();

            //如果宽and高大于原图，那么就使用原图
            if (destWidth >= sourceWidth && destHeight >= souceHeight)
            {
                bmp = new Bitmap(imageStream);
            }
            else
            {
                //根据高度缩放图片
                if (destWidth == -1 && destHeight != -1)
                {
                    bmp = imageOperator.ZoomByHeight(imageStream, destHeight);
                }
                else if (destHeight == -1 && destWidth != -1)
                {
                    //根据宽度缩放图片
                    bmp = imageOperator.ZoomByWidth(imageStream, destWidth);
                }
                else if (destHeight != -1 && destWidth != -1)
                {

                    //按比例计算尺寸
                    var imgSource = new Bitmap(imageStream);
                    int sW = 0, sH = 0;
                    // 按比例缩放 
                    var sWidth = imgSource.Width;
                    var sHeight = imgSource.Height;

                    if (sHeight > destHeight || sWidth > destWidth)
                    {
                        if (sWidth * destHeight > sHeight * destWidth)
                        {
                            sW = destWidth;
                            sH = destWidth * sHeight / sWidth;
                        }
                        else

                        {
                            sH = destHeight;
                            sW = sWidth * destHeight / sHeight;
                        }
                    }
                    else
                    {
                        sW = sWidth;
                        sH = sHeight;
                    }

                    bmp = imageOperator.Zoom(imgSource, sW, sH);
                }
            }

            return bmp;
        }

        /// <summary>
        /// 获取图片信息
        /// </summary>
        /// <param name="imageid"></param>
        /// <param name="sortField"></param>
        /// <param name="sortType"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetImageInfo(string imageid, string sortField, int? sortType)
        {
            if (string.IsNullOrWhiteSpace(imageid))
            {
                throw new ArgumentNullException("imageid");
            }

            //获取文件
            var feImages = ObjektFactory.Find<File>(imageid);

            if (feImages == null)
            {
                throw new Exception("不是有效的图片包文件");
            }

            FeFile feFile = new FeFile(feImages);
            FeImageViewerViewModel model = new FeImageViewerViewModel();

            //如果是图片包
            if (feFile.IsImagePack)
            {

                //获取图片所有尺寸
                var imageSizeList = feFile.ImageSizeList();

                //获取原图
                var sourceImage = feFile.SourceImageFile();

                if (sourceImage == null)
                {
                    throw new Exception("图片包不正确，无法找到原图");
                }

                var imageSize = "";
                var imageLocation = "";

                //原图尺寸
                if (sourceImage.GetProperty<int?>("width") != null
                    && sourceImage.GetProperty<int?>("height") != null)
                {
                    imageSize = sourceImage.GetProperty<int?>("width").Value + "*" +
                                sourceImage.GetProperty<int?>("height").Value;
                }

                //图片位置
                if (feFile.File.Parent != null && feFile.File.Parent.IsExists())
                {
                    imageLocation = feFile.File.Parent.Name;
                }

                //图片属性
                model.FileSize = sourceImage.Size.ToString(CultureInfo.InvariantCulture);
                model.ImageUrl = sourceImage.PathName;
                model.ImageName = sourceImage.Name;
                model.CreateOn = sourceImage.CreatedOn?.ToString("yyyy-MM-dd HH:mm:ss") ?? "";
                model.Creator = sourceImage.Creator == null ? "" : sourceImage.Creator.CombinedLabel;
                model.ImageSize = imageSize;
                model.ImageLocation = imageLocation;
                model.Height = sourceImage.Height;
                model.Width = sourceImage.Width;

                //添加尺寸,长宽任意值超过300为大图，都等于300为中图，都小于300为小图
                //排序，第一个原图，然后按面积从大到小
                model.ImageSizeList.Add(new FeImageViewerSizeListItemViewModel
                {
                    Id = sourceImage.Id,
                    Title = "原",
                    Size = imageSize,
                    Url = sourceImage.PathName
                });

                var sizeList = new List<FeImageViewerSizeListItemViewModel>();

                foreach (var item in imageSizeList)
                {
                    var size = "";
                    var area = 0;
                    var title = "小";
                    var width = item.File.GetProperty<int?>("width").HasValue ? item.File.GetProperty<int?>("width").Value : 0;
                    var height = item.File.GetProperty<int?>("height").HasValue ? item.File.GetProperty<int?>("height").Value : 0;

                    if (width != 0 && height != 0)
                    {
                        size = width + "*" + height;
                        area = width * height;

                        if (width == 300 && height == 300)
                        {
                            title = "中";
                        }
                        else if (width > 300 || height > 300)
                        {
                            title = "大";
                        }
                    }

                    sizeList.Add(new FeImageViewerSizeListItemViewModel
                    {
                        Id = item.File.Id,
                        Size = size,
                        Area = area,
                        Title = title,
                        Url = item.File.PathName
                    });
                }

                //按面积排序
                sizeList = sizeList.OrderByDescending(t => t.Area).ToList();
                model.ImageSizeList.AddRange(sizeList);

            }
            else if (feImages.FileType != null && feImages.FileType.IsExists() && feImages.FileType.IsImage)
            {
                //如果是单图片
                var imageSize = "";
                var imageLocation = "";

                //原图尺寸
                if (feImages.GetProperty<int?>("width") != null
                    && feImages.GetProperty<int?>("height") != null)
                {
                    imageSize = feImages.GetProperty<int?>("width").Value + "*" +
                                feImages.GetProperty<int?>("height").Value;
                }

                //图片位置
                if (feImages.Parent != null && feImages.Parent.IsExists())
                {
                    imageLocation = feImages.Parent.Name;
                }

                //图片属性
                model.FileSize = feImages.Size.ToString(CultureInfo.InvariantCulture);
                model.ImageUrl = feImages.PathName;
                model.ImageName = feImages.Name;
                model.CreateOn = feImages.CreatedOn?.ToString("yyyy-MM-dd HH:mm:ss") ?? "";
                model.Creator = feImages.Creator == null ? "" : feImages.Creator.CombinedLabel;
                model.ImageSize = imageSize;
                model.ImageLocation = imageLocation;
                model.Width = feImages.Width;
                model.Height = feImages.Height;

            }
            else
            {
                throw new Exception("无法识别的图片");
            }

            //获取当前目录其他图片包
            //1.获取所有以.feimgpack结尾的文件夹
            if (feImages.Parent != null && feImages.Parent.IsExists())
            {

                var parentId = feImages.Parent.Id;

                ObjektCollection<File> oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),
                    new WhereClause("\"parent\" = '" + parentId + "' and \"isTrash\" = 0"));

                string strpropertyName;
                string strDataType;
                Order order;
                if (sortType == null || sortType == 0)
                {
                    order = Order.Asc;
                }
                else
                {
                    order = Order.Desc;
                }

                if (string.IsNullOrEmpty(sortField))
                {
                    sortField = "name";
                }

                switch (sortField)
                {
                    case "name":
                        strpropertyName = "name";
                        strDataType = DataType.STRING;
                        break;
                    case "Size":
                        strpropertyName = "size";
                        strDataType = DataType.FLOAT;
                        break;
                    case "FileType":
                        strpropertyName = "extensionName";
                        strDataType = DataType.STRING;
                        break;
                    case "CreatedOn":
                        strpropertyName = "createdOn";
                        strDataType = DataType.DATE;
                        break;
                    default:
                        strpropertyName = "name";
                        strDataType = DataType.STRING;
                        break;
                }
                oc.OrderByClause.Add(new OrderByCell(strpropertyName, strDataType, order));

                foreach (var item in oc)
                {
                    feFile = new FeFile(item);

                    if (feFile.IsImagePack)
                    {
                        var sourceItem = feFile.SourceImageFile();

                        if (sourceItem != null)
                        {
                            model.ImageList.Add(new FeImageViewerListItemViewModel
                            {
                                Id = feFile.File.Id,
                                ImageUrl = sourceItem.PathName,
                                Width = sourceItem.Width,
                                Height = sourceItem.Height
                            });
                        }

                    }
                    else if (feFile.File.FileType != null && feFile.File.FileType.IsExists() && feFile.File.FileType.IsImage)
                    {
                        model.ImageList.Add(new FeImageViewerListItemViewModel
                        {
                            Id = feFile.File.Id,
                            ImageUrl = feFile.File.PathName,
                            Width = feFile.File.Width,
                            Height = feFile.File.Height
                        });
                    }

                }

            }

            return Json(model);
        }

        /// <summary>
        ///     获取数据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Get(string directoryId, string sortField, int sortType, int? pageSize, int? pageNumber,
            string queryParams, string isTrash)
        {
            var parentId = directoryId;
            if (string.IsNullOrWhiteSpace(parentId))
            {
                parentId = FeFileIDs.FeImages;
            }

            var feImages = ObjektFactory.Find<File>(parentId);
            var result = new FeDataGridViewModel();
            var navFile = feImages;

            result.DirectoryId = feImages.Id;
            result.DirectoryName = feImages.Name;

            #region //为目录添加导航

            while (navFile != null)
            {
                if (navFile.Id != FeFileIDs.FeImages)
                {
                    result.Navigation.Insert(0, new FeDataGridNavigationItemViewModel
                    {
                        Id = navFile.Id,
                        Text = navFile.Name
                    });
                    if (navFile.Parent != null && navFile.Parent.IsExists())
                    {
                        navFile = navFile.Parent;
                    }
                    else
                    {
                        navFile = null;
                    }
                }
                else
                {
                    result.Navigation.Insert(0, new FeDataGridNavigationItemViewModel
                    {
                        Id = navFile.Id,
                        Text = "全部文件"
                    });

                    break;
                }
            }

            #endregion

            var FileCount = 0;
            var FileImageCount = 0;

            //从后台设置分页信息           
            if (pageSize != null)
            {
                result.PageSize = pageSize.Value;
            }
            else
            {
                result.PageSize = 21;
            }
            if (pageNumber != null)
            {
                result.PageNumber = pageNumber.Value;
            }
            else
            {
                result.PageNumber = 1;
            }


            #region //检索文件目录
            ObjektCollection<File> oc = null;
            if (string.IsNullOrEmpty(isTrash)) { isTrash = "0"; }
            var strWhere = "";
            var isref = "all";
            if (queryParams != null)
            {
                var imagesearchlist = JsonConvert.DeserializeObject<List<ImageSearch>>(queryParams);
                strWhere = "\"parent\" = '" + feImages.Id + "' and \"isTrash\" = '" + isTrash + "'  ";
                var i = 0;
                var showDicName = false;
                while (i < imagesearchlist.Count)
                {
                    var imagesearch = imagesearchlist[i];
                    switch (imagesearch.field)
                    {
                        case "dicname":
                            if (!string.IsNullOrEmpty(imagesearch.value))
                            {
                                showDicName = true;
                                strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")} like '%" + imagesearch.value.ToLower() + "%' and \"isdirectory\" = '1' and  \"name\" not like '%.feimgpack' ";
                            }
                            break;
                        case "picname":
                            if (!string.IsNullOrEmpty(imagesearch.value))
                            {
                                string aa = " SUBSTR( { fn LCASE(\"" + PropertyNames.name + "\")} ,0,LENGTH (\"name\")-10)";
                                strWhere += "and ( (\"isdirectory\" = '0'  and   { fn LCASE(\"" + PropertyNames.name + "\")} like '%" + imagesearch.value.ToLower() + "%' ) or (\"isdirectory\" = '1'  and  " + aa + " like '%" + imagesearch.value.ToLower() + "%') )";
                            }
                            break;
                        case "creator":
                            if (!string.IsNullOrEmpty(imagesearch.value))
                            {

                                strWhere += "and \"creator\" in (select  \"id\"  from  \"Identity\"  where { fn LCASE(\"" + PropertyNames.combinedLabel + "\")} like \'%" + imagesearch.value.ToLower() + "%\')";
                            }
                            break;
                        case "isref":
                            if (imagesearch.value != "-1")
                            {
                                isref = imagesearch.value;
                            }
                            break;
                        //case "pictype":
                        //    if (!string.IsNullOrEmpty(imagesearch.value)&&showDicName == false) {
                        //        strWhere += "and \"fileType\" = '" + imagesearch.value + "'";
                        //    }
                        //    break;
                        case "showimage":
                            if (imagesearch.value == "true" && showDicName == false)
                            {
                                strWhere += "and (\"isdirectory\" = '0' or  \"name\" like '%.feimgpack')";
                            }
                            break;
                        case "begindate":
                            if (!string.IsNullOrEmpty(imagesearch.value))
                            {
                                strWhere += "and \"createdOn\" <= '" + imagesearch.value + "'";
                            }
                            break;
                        case "enddate":
                            if (!string.IsNullOrEmpty(imagesearch.value))
                            {
                                strWhere += "and \"createdOn\">= '" + imagesearch.value + "'";
                            }
                            break;
                    }
                    i++;
                }
            }

            if (strWhere.Length > 0)
            {
                var where = new WhereClause(strWhere);
                oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new Pagination(result.PageNumber, result.PageSize), where).ToView();

            }
            else
            {
                oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new Pagination(result.PageNumber, result.PageSize),
                    new WhereClause("\"parent\" = '" + feImages.Id + "'  and \"isTrash\" = '" + isTrash + "' ")).ToView();

            }

            #region//------------------------ 排序-------------------------//
            string strpropertyName = string.Empty;
            string strDataType = string.Empty;
            Order order;
            if (sortType == 0) { order = Order.Asc; } else { order = Order.Desc; }
            if (string.IsNullOrEmpty(sortField)) { sortField = "name"; }
            switch (sortField)
            {
                case "name":
                    strpropertyName = "name";
                    strDataType = DataType.STRING;
                    break;
                case "Size":
                    strpropertyName = "size";
                    strDataType = DataType.FLOAT;
                    break;
                case "FileType":
                    strpropertyName = "extensionName";
                    strDataType = DataType.STRING;
                    break;
                case "CreatedOn":
                    strpropertyName = "createdOn";
                    strDataType = DataType.DATE;
                    break;
                default:
                    strpropertyName = "name";
                    strDataType = DataType.STRING;

                    break;
            }
            oc.OrderByClause.Add(new OrderByCell(strpropertyName, strDataType, order));
            #endregion

            //添加子文件
            foreach (var file in oc)
            {

                //如果是文件夹或者图片
                if (file.IsDirectory || file.FileType.IsImage)
                {

                    FeFile feFile = new FeFile(file);
                    var model = new FeDataGridItemViewModel(feFile.File);
                    model.IsRef = false;   //性能问题，暂时没用

                    //图片包
                    if (feFile.IsImagePack)
                    {

                        var sourceItem = feFile.SourceImageFile();

                        FileImageCount = FileImageCount + 1;
                        model.IsShowImageView = true;
                        model.IsDirectory = false;
                        model.Name = sourceItem.Name;
                        model.FileType = sourceItem.FileType.Name.ToString();
                        model.ImageSize = sourceItem.Width + "X" + sourceItem.Height;
                        model.FileSize = sourceItem.Size.ToString();
                        model.Icon = sourceItem == null ? "" : sourceItem.PathName;
                        model.Width = sourceItem.Width;
                        model.Height = sourceItem.Height;
                        if (isref == "1" || isref == "0")
                        { 
                            model.IsRef = FileIsReference(feFile.File.Id);
                        }
                    }
                    else if (feFile.File.IsDirectory)
                    {
                        //文件夹
                        FileCount = FileCount + 1;
                        model.IsShowImageView = false;
                    }
                    else if (feFile.File.FileType.IsImage)
                    {
                        //图片
                        FileImageCount = FileImageCount + 1;
                        model.IsShowImageView = false;
                        if (isref == "1" || isref == "0")
                        {
                            model.IsRef = FileIsReference(feFile.File.Id);
                        }
                    }

                    model.Creator = file.Creator.CombinedLabel;//创建人
                    if (isref == "all")
                    {
                        result.Items.Add(model);
                    }
                    else if (isref == "0" && model.IsRef == false)
                    {
                        result.Items.Add(model);
                    }
                    else if (isref == "1" && model.IsRef)
                    {
                        result.Items.Add(model);
                    }
                }
            }
            #endregion


            result.RecordTotal = int.Parse(oc.Pagination.RowCount.ToString());

            //目录排序
            result.Items = result.Items.OrderByDescending(t => t.IsDirectory).ToList(); //

            result.Loading = true;
            result.ShowRefresh = false;

            //配置列信息
            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "名称",
                Field = "Name",
                Align = "center"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "类型",
                Field = "FileType",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "尺寸",
                Field = "ImageSize",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "大小",
                Field = "FileSize",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "是否引用",
                Field = "IsRef",
                Align = "center",
                Width = "100",
                Formatter = "function (value,rowData,rowIndex){ if(value) {return '是';} else {return '否';} }"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "引用次数",
                Field = "RefCount",
                Align = "center",
                Width = "100"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "上传者",
                Field = "Creator",
                Align = "center"
            });

            result.Columns.Add(new FeDataGridColumnViewModel
            {
                Text = "上传时间",
                Field = "CreateOn",
                Align = "center",
                Width = "233",
                Formatter = "function(value,rowData,rowIndex){ return DataFormater(value); }"
            });

            string resultSize = "0";
            long FileSize = (int)feImages.Size;
            if (FileSize < 1024)
            {
                resultSize = FileSize + "K";
            }
            else if (FileSize / 1024 > 0 && FileSize / 1024 < 1024)
            {
                resultSize = (FileSize / 1024).ToString("F2") + "M";
            }
            else
            {
                resultSize = (FileSize / 1024 / 1024).ToString("F2") + "G";
            }
            result.NavRightText = "大小" + resultSize + " 共" + FileCount + "个文件夹和" + FileImageCount +
                                  "个图片";


            return Json(result);
        }

        /// <summary>
        /// 回收站列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public JsonResult GetRecyclePageList(int pageNumber, int pageSize, string param)
        {

            #region //检索文件目录
            var imagesearchlist = JsonConvert.DeserializeObject<List<ImageSearch>>(param);
            ObjektCollection<File> oc = null;
            string isTrash = "1"; //默认回收

            var strWhere = "";
            var FeImagesFile = ObjektFactory.Find<File>(FeFileIDs.FeImages);
            strWhere = "{ fn LCASE(\"" + PropertyNames.pathName + "\")} like  '" + FeImagesFile.PathName.ToLower() + "%' and \"isTrash\" = '" + isTrash + "' and \"parent\"  not in  (select \"id\" from \"File\" where \"name\" like '%.feimgpack') ";
            var i = 0;
            var showDicName = false;
            while (i < imagesearchlist.Count)
            {
                var imagesearch = imagesearchlist[i];
                switch (imagesearch.field)
                {
                    case "dicname":
                        if (!string.IsNullOrEmpty(imagesearch.value))
                        {
                            showDicName = true;
                            strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")} like '%" + imagesearch.value.ToLower() + "%' and \"isdirectory\" = '1'  and  \"name\" not like '%.feimgpack'  ";
                        }
                        break;
                    case "picname":
                        if (!string.IsNullOrEmpty(imagesearch.value))
                        {
                            strWhere += "and { fn LCASE(\"" + PropertyNames.name + "\")} like '%" + imagesearch.value.ToLower() + "%'  and (\"isdirectory\" = '0' or  \"name\" like '%.feimgpack') ";
                        }
                        break;
                    case "creator":
                        if (!string.IsNullOrEmpty(imagesearch.value))
                        {
                            strWhere += "and \"creator\" in (select  \"id\"  from  \"Identity\"  where { fn LCASE(\"" + PropertyNames.combinedLabel + "\")} like \'%" + imagesearch.value.ToLower() + "%\')";
                        }
                        break;
                    case "showimage":
                        if (imagesearch.value == "true" && showDicName == false)
                        {
                            strWhere += "and (\"isdirectory\" = '0' or  \"name\" like '%.feimgpack')";
                        }
                        break;
                    case "begindate":
                        if (!string.IsNullOrEmpty(imagesearch.value))
                        {
                            strWhere += "and \"modifiedOn\" <= '" + imagesearch.value + "'";
                        }
                        break;
                    case "enddate":
                        if (!string.IsNullOrEmpty(imagesearch.value))
                        {
                            strWhere += "and \"modifiedOn\">= '" + imagesearch.value + "'";
                        }
                        break;
                }
                i++;
            }


            var where = new WhereClause(strWhere);
            oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new Pagination(pageNumber, pageSize), where).ToView();
            oc.OrderByClause.Add(new OrderByCell("modifiedOn", DataType.DATE, Order.Desc));
            #endregion
            //ObjektCollection<File> oc = new ObjektCollection<File>(, new WhereClause(), new Pagination());
            //var model = new ObjektCollectionViewModel(KlassNames.File);
            //model.GetObjektViewModels(page, rows, param, "modifiedOn", false);

            List<FeFileModel> listFeFileModel = new List<FeFileModel>();
            foreach (var m in oc)
            {
                FeFileModel fefilemodel = new FeFileModel();
                fefilemodel.Id = m.Id.ToString();
                if (string.IsNullOrEmpty(m.ExtensionName))
                {
                    fefilemodel.Icon = "FrontEnd/Back/Content/images/folder.png"; //文件夹图片
                    fefilemodel.ExtensionName = "文件夹";
                    fefilemodel.HeightXWidth = "";
                }
                else
                {
                    fefilemodel.ExtensionName = m.ExtensionName;
                    fefilemodel.Icon = m.PathName;
                    fefilemodel.HeightXWidth = m.Width + "X" + m.Height;  //尺寸
                }


                fefilemodel.Size = m.Size.ToString();

                if (m.IsDirectory == true && m.Name.EndsWith(".feimgpack"))
                {
                    fefilemodel.Name = m.Name.Replace(".feimgpack", "").ToString();
                    ObjektCollection<File> getoc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new WhereClause("\"name\"='" + fefilemodel.Name + "'")).ToView();
                    fefilemodel.Icon = getoc[0].PathName; //图片路径
                    fefilemodel.ExtensionName = getoc[0].ExtensionName;
                    fefilemodel.HeightXWidth = getoc[0].Width + "X" + getoc[0].Height;  //尺寸
                    fefilemodel.Size = getoc[0].Size.ToString();

                }
                else { fefilemodel.Name = m.Name; }

                fefilemodel.Creator = m.Creator.CombinedLabel;
                fefilemodel.ModifiedOn = m.ModifiedOn.Value.ToString("yyyy/MM/dd  HH:mm:ss");
                listFeFileModel.Add(fefilemodel);
            }

            var data = $"{{ \"total\": \"{oc.Pagination.RowCount}\", \"rows\": {listFeFileModel.ObjectToJson()} }}";
            var resault = new JsonResultModel(data);
            return Json(resault);

        }

        /// <summary>
        /// 撤销回收
        /// </summary>
        /// <returns></returns>
        public JsonResult Trash(List<FeFileModel> listfefile)
        {
            foreach (var tag in listfefile)
            {
                File file = ObjektFactory.Find<File>(tag.Id);
                file.Revert();
                file.Save();
            }
            return Json(new JsonResultModel());
        }
        /// <summary>
        /// 彻底删除
        /// </summary>
        /// <returns></returns>
        public JsonResult RemoveCompletely(List<FeFileModel> listfefile)
        {
            foreach (var tag in listfefile)
            {
                File file = ObjektFactory.Find<File>(tag.Id);
                file.Delete();
                file.Save();
            }
            return Json(new JsonResultModel());
        }


        /// <summary>
        /// 清空回收站
        /// </summary>
        /// <returns></returns>
        public JsonResult ClearCompletely()
        {
            var oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),
              new WhereClause("\"parent\" = '" + FeFileIDs.FeImages + "' and \"isTrash\" = '1' "));  //回收的所有文档
            foreach (var tag in oc)
            {
                File file = ObjektFactory.Find<File>(tag.Id);
                file.Delete();
                file.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 文件夹是否存在
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult ISExist(string parentdic, string newdicname)
        {
            if (string.IsNullOrEmpty(parentdic))
            {
                parentdic = FeFileIDs.FeImages;
            }

            var oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),
                new WhereClause("\"parent\" = '" + parentdic + "' and { fn LCASE(\"" + PropertyNames.name + "\")} = '" + newdicname.ToLower() + "' "));
            if (oc.Count >= 1)
            {
                var data = new JsonResultModel("false");
                return Json(data);
            }
            else
            {
                var data = new JsonResultModel("true");
                return Json(data);
            }
        }

        /// <summary>
        ///     新建文件夹
        /// </summary>
        [HttpPost]
        public JsonResult AddNewDic(string parentdic, string newdicname)
        {
            if (string.IsNullOrEmpty(parentdic))
            {
                parentdic = FeFileIDs.FeImages;
            }
            var dicFile = new File();
            dicFile.Name = newdicname;
            dicFile.IsDirectory = true;
            dicFile.Parent = ObjektFactory.Find<File>(parentdic);
            dicFile.Save();
            return Json(new JsonResultModel());
        }


        /// <summary>
        ///     @*'移动', '设置水印', '替换', '查看引用', '下载', '放入回收站', '彻底删除'*@
        /// </summary>
        /// <returns></returns>

        public JsonResult DicTree(string parentId, string isTrash, string noShowId)
        {

            var feImagesid = FeFileIDs.FeImages;

            var feImages = ObjektFactory.Find<File>(feImagesid);
            var list = feImages.GetDescendantsDirectorys();

            List<FeFileModel> modelList = new List<FeFileModel>();
            modelList.Add(new FeFileModel()
            {
                Id = feImagesid.Replace("@", "*"),
                Name = feImages.Name,
                //如果是顶层节点必须为null，easyui才能识别。
                //@转为*号，easyui才能识别。
                _parentId = null,
                CreateOn = feImages.CreatedOn.ToString()

            });

            foreach (var item in list)
            {
                if ((item.IsDirectory && item.Name.EndsWith(".feimgpack")) || item.IsTrash == true)
                {
                    continue; //调过图片包
                }
                modelList.Add(new FeFileModel()
                {
                    Id = item.Id.Replace("@", "*"),
                    Name = item.Name,
                    //如果是顶层节点必须为null，easyui才能识别。
                    //@转为*号，easyui才能识别。
                    _parentId = item.Parent.Id.Replace("@", "*"),
                    CreateOn = item.CreatedOn.ToString()
                    // SortOrder = item.SortOrder,             
                });
            }
            modelList = modelList.OrderBy(t => t.CreateOn).ToList();

            //不包含自己和自己的子孙节点，
            if (!string.IsNullOrWhiteSpace(noShowId))
            {
                string[] noShowids = noShowId.Split(',');
                for (int i = 0; i < noShowids.Length; i++)
                {
                    var entity = ObjektFactory.Find<File>(noShowids[i]);
                    if (entity != null)
                    {
                        string removeId = entity.Id.Replace("@", "*");
                        var query = from t in modelList
                                    where t.Id == removeId
                                    select t;

                        var removeItem = query.SingleOrDefault();
                        if (removeItem != null)
                        {
                            modelList.Remove(removeItem);
                        }
                        var descendants = entity.GetDescendants();
                        foreach (var item in descendants)
                        {
                            removeId = item.Id.Replace("@", "*");
                            query = from t in modelList
                                    where t.Id == removeId
                                    select t;

                            removeItem = query.SingleOrDefault();
                            if (removeItem != null)
                            {
                                modelList.Remove(removeItem);
                            }
                        }
                    }
                }
            }

            var source = new
            {
                total = modelList.Count,
                rows = modelList
            };
            return Json(source, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 移动文件
        /// </summary>
        /// <returns></returns>
        public JsonResult MoveFile(string moveid, string moveToid)
        {
            //moveid 可以多个同时移动
            string[] moveids = moveid.Split(',');
            for (int i = 0; i < moveids.Length; i++)
            {
                var MovedicFile = ObjektFactory.Find<File>(moveids[i]);
                var moveTodicFile = ObjektFactory.Find<File>(moveToid.Replace("*", "@"));
                MovedicFile.Parent = moveTodicFile;
                MovedicFile.Save();
            }
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 设置水印
        /// </summary>
        /// <returns></returns>
        public JsonResult SetWarterFile(List<FeDataGridItemViewModel> listFeDataGridItemViewModel, string watertypeid)
        {
            foreach (var griditem in listFeDataGridItemViewModel)
            {
                var dicFile = ObjektFactory.Find<File>(griditem.Id);
                if (dicFile.IsDirectory == true && dicFile.Name.EndsWith(".feimgpack"))
                {
                    var ocfile = dicFile.GetDescendants();
                    foreach (var o in ocfile)
                    {
                        if (o.IsDirectory == true && o.Name.EndsWith(".feimgpack"))
                        {
                            continue;
                        }
                        ImageOperator imageoperator = new ImageOperator();
                        Stream imagestream = imageoperator.CreateWarterImage(watertypeid, o.Id);
                        o.FileContent = imagestream;
                        o.Save();
                    }
                }
                else
                {
                    ImageOperator imageoperator = new ImageOperator();
                    Stream imagestream = imageoperator.CreateWarterImage(watertypeid, griditem.Id);
                    dicFile.FileContent = imagestream;
                    dicFile.Save();
                }
            }
            return Json(new JsonResultModel());
        }


        /// <summary>
        /// 图片文件夹打包下载
        /// </summary>
        /// 
        public FilePathResult DownLoadPic(string ids)
        {
            //文件夹，图片包 ，图片
            HttpContextBase context = this.HttpContext;
            //上传的目录
            string fileZipTime = System.DateTime.Now.ToString("yyyyMMddhhmmss");

            string downloadDir = "~/fileupload/Image_" + System.DateTime.Now.ToString("yyyyMMddhhmmss");
            //生成年月文件夹及日文件夹
            if (!System.IO.Directory.Exists(context.Server.MapPath(downloadDir)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(downloadDir));
            }
            //所有文件存储路径          
            string downloadPath = downloadDir + "/Image_" + fileZipTime;
            if (!System.IO.Directory.Exists(context.Server.MapPath(downloadPath)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(downloadPath));// 删除原命名文件
            }
            string[] Fileids = ids.Split(',');

            #region //获取文件
            for (int i = 0; i < Fileids.Length; i++)
            {
                File directoryfiles = ObjektFactory.Find<File>(Fileids[i]);
                if (directoryfiles.IsDirectory)
                {
                    string childfilepath = downloadPath + "/" + directoryfiles.Name;
                    if (childfilepath.EndsWith(".feimgpack"))
                    {
                        childfilepath = childfilepath.Replace(".feimgpack", ""); //名称替换
                    }
                    if (!System.IO.Directory.Exists(context.Server.MapPath(childfilepath)))
                    {
                        System.IO.Directory.CreateDirectory(context.Server.MapPath(childfilepath));// 删除原命名文件
                    }
                    foreach (var files in directoryfiles.GetChildren().ToList())
                    {
                        if (files.IsDirectory == true)
                        {
                            CreateChildrenFile(context, childfilepath, files);
                        }
                        else
                        {
                            File file = ObjektFactory.Find<File>(files.Id);
                            using (System.IO.Stream fst = file.FileContent)
                            {
                                byte[] buffer = new byte[fst.Length];
                                fst.Read(buffer, 0, buffer.Length);
                                // 设置当前流的位置为流的开始 
                                fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件              
                                System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(childfilepath + "/" + file.Name.Replace("_*", "_auto")), System.IO.FileMode.Create);
                                System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                                bw.Write(buffer);
                                bw.Close();
                                fs.Close();
                            }
                        }
                    }
                }
                else
                {
                    File file = ObjektFactory.Find<File>(directoryfiles.Id); //直接为图片
                    using (System.IO.Stream fst = file.FileContent)
                    {
                        byte[] buffer = new byte[fst.Length];
                        fst.Read(buffer, 0, buffer.Length);
                        // 设置当前流的位置为流的开始 
                        fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件              
                        System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(downloadPath + "/" + file.Name), System.IO.FileMode.Create);
                        System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                        bw.Write(buffer);
                        bw.Close();
                        fs.Close();
                    }
                }
            }
            #endregion

            //打包压缩
            string zippath = downloadDir + "/" + fileZipTime + ".zip";
            string serverzippath = context.Server.MapPath(zippath);
            ZipUtil.Zip(context.Server.MapPath(downloadPath), serverzippath, "");
            return File(zippath, "application/zip", fileZipTime + ".zip");
        }

        /// <summary>
        /// 创建子文件目录
        /// </summary>
        /// <param name="context"></param>
        /// <param name="downloadDir"></param>
        /// <param name="childfile"></param>
        public void CreateChildrenFile(HttpContextBase context, string downloadDir, File childfile)
        {
            string childfilepath = downloadDir + "/" + childfile.Name;
            if (childfilepath.EndsWith(".feimgpack"))
            {
                childfilepath = childfilepath.Replace(".feimgpack", ""); //名称替换
            }
            if (!System.IO.Directory.Exists(context.Server.MapPath(childfilepath)))
            {
                System.IO.Directory.CreateDirectory(context.Server.MapPath(childfilepath));// 删除原命名文件
            }
            foreach (var files in childfile.GetChildren().ToList())
            {
                if (files.IsDirectory == true)
                {
                    CreateChildrenFile(context, childfilepath, files);
                }
                else
                {
                    File file = ObjektFactory.Find<File>(files.Id);
                    using (System.IO.Stream fst = file.FileContent)
                    {
                        byte[] buffer = new byte[fst.Length];
                        fst.Read(buffer, 0, buffer.Length);
                        // 设置当前流的位置为流的开始 
                        fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件              
                        System.IO.FileStream fs = new System.IO.FileStream(context.Server.MapPath(childfilepath + "/" + file.Name.Replace("_*", "_auto")), System.IO.FileMode.Create);
                        System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                        bw.Write(buffer);
                        bw.Close();
                        fs.Close();
                    }
                }
            }
        }
        /// <summary>
        /// 回收
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public JsonResult TrashFile(string ids)
        {
            string[] Fileids = ids.Split(',');
            //log4net.ILog ilog = log4net.LogManager.GetLogger("AAAa");
            //ilog.Info("回收系统开始时间" + DateTime.Now.ToString());
            DateTime starttime = DateTime.Now;
            for (int i = 0; i < Fileids.Length; i++)
            {
                if (!FeFileIDs.FeLockFiles.Contains(Fileids[i]))
                {
                    var dicFile = ObjektFactory.Find<File>(Fileids[i]);
                    dicFile.Trash();
                }
                else
                {
                    throw new Exception("包含系统文件，无法执行回收");
                }
            }
            //System.IO.File.AppendAllText(HttpContext.Server.MapPath("~/log/lot.txt"), "\r\n回收系统结束时间" + (DateTime.Now- starttime) + "\r\n");
            return Json(new JsonResultModel());
        }

        /// <summary>
        ///  '彻底删除'
        /// </summary>
        /// <returns></returns>
        public JsonResult delFile(string fileids)
        {
            //DateTime starttime = DateTime.Now;
            string[] ids = fileids.Split(',');
            foreach (string a in ids)
            {
                if (!FeFileIDs.FeLockFiles.Contains(a))
                {
                    var dicFile = ObjektFactory.Find<File>(a);
                    dicFile.Delete();
                    dicFile.Save();
                }
                else
                {
                    throw new Exception("包含系统文件，无法执行删除");
                }
            }
            //System.IO.File.AppendAllText(HttpContext.Server.MapPath("~/log/lot.txt"), "\r\n删除时间" + (DateTime.Now - starttime) + "\r\n");
            return Json(new JsonResultModel());
        }

        /// <summary>
        /// 图片统计页面视图
        /// </summary>
        /// <returns></returns>
        public ActionResult Statistics()
        {
            //List<FeArticleModel> ArticleList, string CategoryId
            return View(new BaseViewModel());
        }

        /// <summary>
        /// 获取图片统计信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetFileStatisticsInfo()
        {
            List<FeFileStatisticsModel> resultList = new List<FeFileStatisticsModel>();

            Database dbBase = MainDatabase.Database;
            DbCommand cmd = dbBase.DbProviderFactory.CreateCommand();
            DateTime dtEnd = DateTime.Now;
            DateTime dtStart = dtEnd.AddDays(-7);

            //cmd.CommandText = "select to_char(\"createdOn\",'yyyy-mm-dd') as \"createTime\",count(*) as \"fileCount\",sum(\"size\") as \"fileSumSize\"  from \"File\" where to_char(\"createdOn\",'yyyy-mm-dd') >= '" + dtStart.ToString("yyyy-MM-dd") + "' and to_char(\"createdOn\",'yyyy-mm-dd') <= '" + dtEnd.ToString("yyyy-MM-dd") + "' and  \"pathName\" like '/FeImages%' and \"size\" <> 0 group by to_char(\"createdOn\",'yyyy-mm-dd') order by \"createTime\" desc ";
            cmd.CommandText = "select to_char(\"createdOn\",'yyyy-mm-dd') as \"createTime\",count(*) as \"fileCount\",sum(\"size\") as \"fileSumSize\"  from \"File\" where  \"pathName\" like '/feimages%' and \"size\" <> 0 group by to_char(\"createdOn\", 'yyyy-mm-dd') order by \"createTime\" desc ";
            DataSet dsColletion = MainDatabase.Database.ExecuteDataSet(cmd);
            //if (dsColletion == null || dsColletion.Tables.Count == 0) { return Json(new JsonResultModel()); }

            resultList.Add(new FeFileStatisticsModel() { CreateOn = dtEnd.ToString("yyyy-MM-dd") });
            for (int i = 1; i < 8; i++)
            {
                FeFileStatisticsModel model = new FeFileStatisticsModel();
                model.CreateOn = dtEnd.AddDays(-i).ToString("yyyy-MM-dd");
                resultList.Add(model);
            }

            DataTable dtTemp = dsColletion.Tables[0];
            int sumCount = 0, sumSize = 0;
            for (int i = 0; i < dtTemp.Rows.Count; i++)
            {
                sumCount += Convert.ToInt32(dtTemp.Rows[i]["fileCount"]);//计算整站的文件个数
                sumSize += Convert.ToInt32(dtTemp.Rows[i]["fileSumSize"]);//计算整站的文件大小
            }

            DataRow[] drList = dtTemp.Select("createTime >= '" + dtStart.ToString("yyyy-MM-dd") + "' and createTime <= '" + dtEnd.ToString("yyyy-MM-dd") + "'");
            List<DataRow> rowList = drList.ToList();
            for (int i = 0; i < resultList.Count; i++)
            {
                if (rowList.Count == 0) { break; }

                for (int j = 0; j < rowList.Count; j++)
                {
                    if (resultList[i].CreateOn.Equals(DateTime.Parse(rowList[j]["createTime"].ToString()).ToString("yyyy-MM-dd")))
                    {
                        resultList[i].CurrtRealCount = Convert.ToInt32(rowList[j]["fileCount"]);
                        resultList[i].CurrtRealSize = Convert.ToInt32(rowList[j]["fileSumSize"]);

                        rowList.RemoveAt(j);
                        break;
                    }
                }
            }


            resultList[0].FileCount = sumCount; resultList[0].FileSumSize = sumSize;
            for (int i = 1; i < resultList.Count; i++)
            {
                resultList[i].FileCount = resultList[i - 1].FileCount - resultList[i - 1].CurrtRealCount;
                resultList[i].FileSumSize = resultList[i - 1].FileSumSize - resultList[i - 1].CurrtRealSize;
            }

            resultList.Reverse();

            return Json(new JsonResultModel(resultList.ObjectToJson()));

        }
    }


    public struct ImageSearch
    {
        public string field { get; set; }

        public string value { get; set; }

        //public string operator { get; set; }
    }
}