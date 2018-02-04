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
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FileManagement
{
    public class FeWatermarkController : Controller
    {
        // GET: FeTabLibrary
        public ActionResult Index()
        {
            return View("FeWatermarkList", new BaseViewModel());
        }

        public ActionResult GotoWatermark(string TypeID)
        {
            //FeWatermark Watermark = ObjektFactory.Find<FeWatermark>(TypeID);
            FeWatermarkModel feWatermarkModel = new FeWatermarkModel();
            return View("FeWatermarkOperate", feWatermarkModel);
        }


        public JsonResult GetFontFamilyList()
        {
            ObjektCollection<Value> oc = new ObjektCollection<Value>(Klass.ForId(KlassIDs.Value), new WhereClause("\"source\" = '" + FeListIDs.FeWatermarkFontFamily + "' "));
            List<FeFont> listfont = new List<FeFont>();
            foreach (var o in oc)
            {
                FeFont font = new FeFont();
                font.FontFamilyID = o.Id;
                font.FontFamilyName = o.Value_;
                listfont.Add(font);
            }
            return Json(listfont, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFontSizeList()
        {
            ObjektCollection<Value> oc = new ObjektCollection<Value>(Klass.ForId(KlassIDs.Value), new WhereClause("\"source\" = '" + FeListIDs.FeWatermarkFontSize + "' "));
            List<FeFont> listfont = new List<FeFont>();
            foreach (var o in oc)
            {
                FeFont font = new FeFont();
                font.FontSizeID = o.Id;
                font.FontSizeName = o.Value_;
                listfont.Add(font);
            }
            return Json(listfont, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取图片类型列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetFeWatermarkPageList()//int pageNumber,int pageSize,string param)
        {
            ObjektCollection<FeWatermark> oc = new ObjektCollection<FeWatermark>(Klass.ForId(FeKlassIDs.FeWatermark)).ToView();//, new Pagination(pageNumber, pageSize)).ToView();
            //var a= oc.OrderBy(t => t.Source);
            List<FeWatermarkModel> listFeWatermark = new List<FeWatermarkModel>();
            foreach (var o in oc)
            {
                FeWatermarkModel feWatermark = new FeWatermarkModel();
                feWatermark.ID = o.Id;
                feWatermark.Name = o.Name;
                feWatermark.Type = o.Type.Label;
                feWatermark.Creator = o.Creator.CombinedLabel;
                feWatermark.CreatedOn = DateTime.Parse(o.CreatedOn.ToString()).ToString("yyyy/MM/dd  HH:mm:ss");
                listFeWatermark.Add(feWatermark);
               
            }
           
            listFeWatermark = listFeWatermark.OrderByDescending(t => t.CreatedOn).ToList();

            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("total", oc.Pagination.RowCount);
            dic.Add("rows", listFeWatermark);
            var data = new JsonResultModel(dic.ObjectToJson()); 
            return Json(data,JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 添加图片类型
        /// </summary>
        /// <param name="TabName"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult OpFeWatermark()
        {
            HttpContextBase context = this.HttpContext;
            string strFileName = context.Request.Params["WatermarkName"];
            string strTypeValue = context.Request.Params["FeWatermarkValue"];
            string strWatermarkFont = context.Request.Params["WatermarkFont"]; //水印文字
            string strFontFamily = context.Request.Params["FontFamily"];
            string strFontSize = context.Request.Params["FontSize"];
            string strColorPicker = context.Request.Params["colorpicker"];
              strColorPicker = "#" + strColorPicker;
            string strTransparency = context.Request.Params["Transparency"];
            string strLocationValue = context.Request.Params["LocationValue"];

            string WatermarkImageValue = context.Request.Params["WatermarkImageValue"];

            string strEnabledValues = context.Request.Params["EnabledValues"];


            string strEditID = context.Request.Params["EditID"];

            if (strEditID == "")
            {
                FeWatermark feWatermark = new FeWatermark();
                feWatermark.Name = strFileName;
                feWatermark.Type = ObjektFactory.Find<Value>(strTypeValue);
                if (strTypeValue == FeValueIDs.FeWatermark_FeText)
                {
                    feWatermark.Text = strWatermarkFont;
                    feWatermark.Font = ObjektFactory.Find<Value>(strFontFamily);
                    feWatermark.FontSize = ObjektFactory.Find<Value>(strFontSize);
                    feWatermark.FontColor = strColorPicker;
                }
                else
                {
                    feWatermark.imageFile = ObjektFactory.Find<File>(WatermarkImageValue);
                }
                feWatermark.Transparency = Convert.ToInt32(strTransparency);
                feWatermark.Location = ObjektFactory.Find<Value>(strLocationValue);
                feWatermark.Enabled = (strEnabledValues == "1" ? true : false);
                feWatermark.Save();

            }
            else
            {
                FeWatermark feWatermark = ObjektFactory.Find<FeWatermark>(strEditID);

                feWatermark.Name = strFileName;
                feWatermark.Type = ObjektFactory.Find<Value>(strTypeValue);
                if (strTypeValue == FeValueIDs.FeWatermark_FeText)
                {
                    feWatermark.Text = strWatermarkFont;
                    feWatermark.Font = ObjektFactory.Find<Value>(strFontFamily);
                    feWatermark.FontSize = ObjektFactory.Find<Value>(strFontSize);
                    feWatermark.FontColor = strColorPicker;
                }
                else
                {
                    feWatermark.imageFile = ObjektFactory.Find<File>(WatermarkImageValue);
                }
                feWatermark.Transparency = Convert.ToInt32(strTransparency);
                feWatermark.Location = ObjektFactory.Find<Value>(strLocationValue);
                feWatermark.Enabled = (strEnabledValues == "1" ? true : false);

                feWatermark.Save();
            }

            return Json(new JsonResultModel());
        }



        public JsonResult GetFeWatermarkInfo(string id)
        {
            FeWatermark feWatermark = ObjektFactory.Find<FeWatermark>(id);
            FeWatermarkModel feWatermarkModel = new FeWatermarkModel();
            feWatermarkModel.Name = feWatermark.Name;
            feWatermarkModel.Type = feWatermark.Type.Id;
            feWatermarkModel.Text = feWatermark.Text;
            if (feWatermark.Type.Id == FeValueIDs.FeWatermark_FeText)
            {
                feWatermarkModel.Font = feWatermark.Font.Id;
                feWatermarkModel.FontSize = feWatermark.FontSize.Id;
                feWatermarkModel.FontColor = feWatermark.FontColor;
            }
            else
            {
                if (feWatermark.imageFile != null)
                    feWatermarkModel.imageFile = feWatermark.imageFile.Id; //图片文件ID
            }

            feWatermarkModel.Transparency = feWatermark.Transparency;
            feWatermarkModel.Location = feWatermark.Location.Id;
            feWatermarkModel.Enabled = feWatermark.Enabled;

            return Json(feWatermarkModel, JsonRequestBehavior.AllowGet); ;
        }
        /// <summary>
        /// 删除类型对应尺寸
        /// </summary>
        /// <returns></returns>
        public JsonResult DelFeWatermark(string id)
        {
            FeWatermark feWatermark = ObjektFactory.Find<FeWatermark>(id);
            feWatermark.Delete();
            feWatermark.Save();
            return Json(new JsonResultModel());
        }


        //图片水印预览
        public JsonResult OpWatermarkImagePreview(string ttype, string tfont, string tfontcolor, string ttransparency, string tlocation, string tfontsize, string tfontfamily, string twatermarkid)
        {
            //文字
            //字体，颜色，大小，显示位置,透明度
            //图片
            //水印图片，透明度，显示位置 【尺寸大于原图尺寸就不执行】
            double inttransparency = 1;
            Value tlocationValue = ObjektFactory.Find<Value>(tlocation);
            string tlocationValueName = tlocationValue.Value_; 
            if (ttype == FeValueIDs.FeWatermark_FeText)
            {
                #region 文字
                if (tfont == string.Empty)
                {
                    return Json(0);
                }

                Value tfontSizeValue = ObjektFactory.Find<Value>(tfontsize);
                string tfontSizeName = tfontSizeValue.Value_;

                Value tfontfamilyValue = ObjektFactory.Find<Value>(tfontfamily);
                string tfontfamilyValueName = tfontfamilyValue.Value_;
              

                inttransparency = Convert.ToDouble(ttransparency) / (double)100 * 255; //文字颜色透明度

                //还需要判断文件类型是否为图像类型，这里就不赘述了 
                Image image = Image.FromFile(System.Web.HttpContext.Current.Server.MapPath("~/FrontEnd/Back/Content/images/WatermarkImagePreview.jpg"));
                Bitmap bitmap = new Bitmap(image, image.Width, image.Height);
                Graphics g = Graphics.FromImage(bitmap);

                float fontsize = float.Parse(tfontSizeName); //字体大小 
                float textwidth = tfont.Length * fontsize; //文本的长度 

                float rectx = 0;
                float recty = 0;
                float rectwidth = tfont.Length * (fontsize + 8);
                float rectheight = fontsize + 8; //声明矩形域

                float imageHeight = image.Height;
                float imageWeight = image.Width;
                //设置水印的位置
                switch (tlocationValueName)
                {
                    case "1":   // 左上
                        rectx = 0;
                        recty = 0;

                        break;
                    case "2":   // 中上
                        rectx = (imageWeight / 2) - (rectwidth / 2);
                        recty = 0;
                        break;
                    case "3":   // 右上
                        rectx = imageWeight - rectwidth;
                        recty = 0;
                        break;
                    case "4":   // 中左
                        rectx = 0;
                        recty = (imageHeight / 2) - (rectheight / 2);
                        break;
                    case "5":   //  中中
                        rectx = (imageWeight / 2) - (rectwidth / 2);
                        recty = (imageHeight / 2) - (rectheight / 2);
                        break;
                    case "6":   // 中右
                        rectx = imageWeight - rectwidth;
                        recty = (imageHeight / 2) - (rectheight / 2);
                        break;
                    case "7":   // 左下
                        rectx = 0;
                        recty = imageHeight - rectheight;
                        break;
                    case "8":   // 中下
                        rectx = (imageWeight / 2) - (rectwidth / 2);
                        recty = imageHeight - rectheight;
                        break;
                    case "9":   // 右下
                        rectx = imageWeight - rectwidth;
                        recty = imageHeight - rectheight;
                        break;
                    default:
                        break;
                }


                RectangleF textarea = new RectangleF(rectx, recty, rectwidth, rectheight); //下面定义一个矩形区域，以后在这个矩形里画上白底黑字

                Font font = new Font(tfontfamilyValueName, fontsize); //定义字体 

                System.Drawing.Color color = System.Drawing.ColorTranslator.FromHtml(tfontcolor);
              
                Brush whitebrush = new SolidBrush(Color.FromArgb(Convert.ToInt32(inttransparency),color)); //画文字用 
                Brush blackbrush = new SolidBrush(Color.FromArgb(0xdd2378)); //画背景用   透明

                g.FillRectangle(blackbrush, rectx, recty, rectwidth, rectheight);

                StringFormat StrFormat = new StringFormat();
                //定义需要印的文字居中对齐
                StrFormat.Alignment = StringAlignment.Center;
                g.DrawString(tfont, font, whitebrush, textarea, StrFormat);


                System.IO.MemoryStream ms = new System.IO.MemoryStream(); //保存为jpg类型 
                bitmap.Save(ms, ImageFormat.Jpeg); //输出处理后的图像，这里为了演示方便，我将图片显示在页面中了 
                bitmap.Save(System.Web.HttpContext.Current.Server.MapPath("~/FrontEnd/Back/Content/images/" + "WatermarkImagePreviewTemp.jpg"), ImageFormat.Jpeg); //保存到磁盘上 
                g.Dispose();
                bitmap.Dispose();
                image.Dispose();
                #endregion
            }
            else
            {
                #region 图片水印
                //  
                // 判断参数是否有效  
                GroupflyGroup.Platform.ObjectFramework.File waterfile = ObjektFactory.Find<GroupflyGroup.Platform.ObjectFramework.File>(twatermarkid);
                if (!waterfile.IsExists()) { return Json(0); }

                string waterPictureName = ""; //水印图片
                using (System.IO.Stream fst = waterfile.FileContent)
                {
                    byte[] buffer = new byte[fst.Length];
                    fst.Read(buffer, 0, buffer.Length);
                    // 设置当前流的位置为流的开始 
                    //fst.Seek(0, System.IO.SeekOrigin.Begin);   // 把 byte[] 写入文件 
                    waterPictureName = System.Web.HttpContext.Current.Server.MapPath("~/FrontEnd/Back/Content/images/" + waterfile.Name);
                    System.IO.FileStream fs = new System.IO.FileStream(waterPictureName, System.IO.FileMode.Create);
                    System.IO.BinaryWriter bw = new System.IO.BinaryWriter(fs);
                    bw.Write(buffer);
                    bw.Close();
                    fs.Close();
                }
                //  
                // 源图片，水印图片全路径  
                //  
                string sourcePictureName = System.Web.HttpContext.Current.Server.MapPath("~/FrontEnd/Back/Content/images/WatermarkImagePreview.jpg"); //PicturePath + sourcePicture;

                string fileSourceExtension = System.IO.Path.GetExtension(sourcePictureName).ToLower();
                string fileWaterExtension = System.IO.Path.GetExtension(waterPictureName).ToLower();
                //  
                // 判断文件是否存在,以及类型是否正确  
                if (System.IO.File.Exists(sourcePictureName) == false ||
                    System.IO.File.Exists(waterPictureName) == false || (
                    fileSourceExtension != ".gif" &&
                    fileSourceExtension != ".jpg" &&
                    fileSourceExtension != ".png") || (
                    fileWaterExtension != ".gif" &&
                    fileWaterExtension != ".jpg" &&
                    fileWaterExtension != ".png")
                    )
                {
                    return Json(0);
                }

                //  
                // 目标图片名称及全路径  
                string targetImage = System.Web.HttpContext.Current.Server.MapPath("~/FrontEnd/Back/Content/images/WatermarkImagePreviewTemp.jpg"); ; //sourcePictureName.Replace(System.IO.Path.GetExtension(sourcePictureName), "") + "_1101.jpg";
                //  
                // 将需要加上水印的图片装载到Image对象中  
                Image imgPhoto = Image.FromFile(sourcePictureName);
                //  
                // 确定其长宽  
                int phWidth = imgPhoto.Width;
                int phHeight = imgPhoto.Height;

                //  
                // 封装 GDI+ 位图，此位图由图形图像及其属性的像素数据组成。  
                Bitmap bmPhoto = new Bitmap(phWidth, phHeight, PixelFormat.Format24bppRgb);
                //  
                // 设定分辨率     
                bmPhoto.SetResolution(imgPhoto.HorizontalResolution, imgPhoto.VerticalResolution);
                //  
                // 定义一个绘图画面用来装载位图  
                Graphics grPhoto = Graphics.FromImage(bmPhoto);
                //  
                //同样，由于水印是图片，我们也需要定义一个Image来装载它  
                Image imgWatermark = new Bitmap(waterPictureName);
                //  
                // 获取水印图片的高度和宽度  
                int wmWidth = imgWatermark.Width;
                int wmHeight = imgWatermark.Height;

                //SmoothingMode：指定是否将平滑处理（消除锯齿）应用于直线、曲线和已填充区域的边缘。  
                // 成员名称   说明   
                // AntiAlias      指定消除锯齿的呈现。    
                // Default        指定不消除锯齿。    
                // HighQuality  指定高质量、低速度呈现。    
                // HighSpeed   指定高速度、低质量呈现。    
                // Invalid        指定一个无效模式。    
                // None          指定不消除锯齿。   
                grPhoto.SmoothingMode = SmoothingMode.AntiAlias;

                //  
                // 第一次描绘，将我们的底图描绘在绘图画面上  
                //  
                grPhoto.DrawImage(imgPhoto,
                                            new Rectangle(0, 0, phWidth, phHeight),
                                            0,
                                            0,
                                            phWidth,
                                            phHeight,
                                            GraphicsUnit.Pixel);

                //  
                // 与底图一样，我们需要一个位图来装载水印图片。并设定其分辨率  
                //  
                Bitmap bmWatermark = new Bitmap(bmPhoto);
                bmWatermark.SetResolution(imgPhoto.HorizontalResolution, imgPhoto.VerticalResolution);

                //  
                // 继续，将水印图片装载到一个绘图画面grWatermark  
                //  
                Graphics grWatermark = Graphics.FromImage(bmWatermark);
                //  
                //ImageAttributes 对象包含有关在呈现时如何操作位图和图元文件颜色的信息。  
                //         
                ImageAttributes imageAttributes = new ImageAttributes();
                //  
                //Colormap: 定义转换颜色的映射  
                //  
                ColorMap colorMap = new ColorMap();

                //  
                //我的水印图被定义成拥有绿色背景色的图片被替换成透明  
                //  
                colorMap.OldColor = Color.FromArgb(255, 0, 255, 0);
                colorMap.NewColor = Color.FromArgb(0, 0, 0, 0);

                ColorMap[] remapTable = { colorMap };

                imageAttributes.SetRemapTable(remapTable, ColorAdjustType.Bitmap);

                float alpha = float.Parse(ttransparency) / 100;
                float[][] colorMatrixElements = {
               new float[] {1.0f,  0.0f,  0.0f,  0.0f, 0.0f}, // red红色  
               new float[] {0.0f,  1.0f,  0.0f,  0.0f, 0.0f}, //green绿色  
               new float[] {0.0f,  0.0f,  1.0f,  0.0f, 0.0f}, //blue蓝色         
               new float[] {0.0f,  0.0f,  0.0f,  alpha, 0.0f}, //透明度       
               new float[] {0.0f,  0.0f,  0.0f,  0.0f, 1.0f}};//  

                //  ColorMatrix:定义包含 RGBA 空间坐标的 5 x 5 矩阵。  
                //  ImageAttributes 类的若干方法通过使用颜色矩阵调整图像颜色。  
                ColorMatrix wmColorMatrix = new ColorMatrix(colorMatrixElements);

                imageAttributes.SetColorMatrix(wmColorMatrix, ColorMatrixFlag.Default,
                 ColorAdjustType.Bitmap);

                //  
                //上面设置完颜色，下面开始设置位置  
                int xPosOfWm=0;
                int yPosOfWm=0;   
                switch (tlocationValueName)
                {
                    case "1":   // 左上
                        xPosOfWm = 0;
                        yPosOfWm = 0;
                        break;
                    case "2":   // 中上
                        xPosOfWm = (phWidth / 2) - (wmWidth / 2);
                        yPosOfWm = 0;
                        break;
                    case "3":   // 右上
                        xPosOfWm = phWidth - wmWidth;
                        yPosOfWm = 0;
                        break;
                    case "4":   // 中左
                        xPosOfWm = 0;
                        yPosOfWm = (phHeight / 2) - (wmHeight / 2);
                        break;
                    case "5":   //  中中
                        xPosOfWm = (phWidth / 2) - (wmWidth / 2);
                        yPosOfWm = (phHeight / 2) - (wmHeight / 2);
                        break;
                    case "6":   // 中右
                        xPosOfWm = phWidth - wmWidth;
                        yPosOfWm = (phHeight / 2) - (wmHeight / 2);
                        break;
                    case "7":   // 左下
                        xPosOfWm = 0;
                        yPosOfWm = phHeight - wmHeight;
                        break;
                    case "8":   // 中下
                        xPosOfWm = (phWidth / 2) - (wmWidth / 2);
                        yPosOfWm = phHeight - wmHeight;
                        break;
                    case "9":   // 右下
                        xPosOfWm = phWidth - wmWidth;
                        yPosOfWm = phHeight - wmHeight;
                        break;
                    default:
                        break;
                }

                //  
                // 第二次绘图，把水印印上去  
                //  
                grWatermark.DrawImage(imgWatermark,
                 new Rectangle(xPosOfWm,
                                     yPosOfWm,
                                     wmWidth,
                                     wmHeight),
                                     0,
                                     0,
                                     wmWidth,
                                     wmHeight,
                                     GraphicsUnit.Pixel,
                                     imageAttributes);


                imgPhoto = bmWatermark;
                grPhoto.Dispose();
                grWatermark.Dispose();

                //  
                // 保存文件到服务器的文件夹里面  
                imgPhoto.Save(targetImage, ImageFormat.Jpeg);
                imgPhoto.Dispose();
                imgWatermark.Dispose();

                if (System.IO.File.Exists(waterPictureName))
                {
                    System.IO.File.Delete(waterPictureName);
                }
                #endregion
            }

            if (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath("~/FrontEnd/Back/Content/images/" + "WatermarkImagePreviewTemp.jpg")))
            {
                var data = Url.Content($"~/FrontEnd/Back/Content/images/WatermarkImagePreviewTemp.jpg?guid=" + Guid.NewGuid().ToString());
                var resault = new JsonResultModel(data);
                return Json(resault);
            }
            else
            {             
                var data = Url.Content($"~/FrontEnd/Back/Content/images/WatermarkImagePreview.jpg?guid=" + Guid.NewGuid().ToString());
                var resault = new JsonResultModel(data);
                return Json(resault);
            }
        }

    }
}




