using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace GroupflyGroup.FrontEnd.Service
{
    /// <summary>
    ///     图片操作
    /// </summary>
    public class ImageOperator
    {

        /// <summary>
        ///     按指定尺寸缩放图片
        /// </summary>
        /// <param name="img"></param>
        /// <param name="destWidth"></param>
        /// <param name="destHeight"></param>
        /// <returns></returns>
        public Bitmap Zoom(Image img, int destWidth, int destHeight)
        {
            var imgSource = img;
            var thisFormat = imgSource.RawFormat;
            int sW = 0, sH = 0;

            // 按比例缩放 
            var sWidth = imgSource.Width;
            var sHeight = imgSource.Height;

            if (sHeight > destHeight || sWidth > destWidth)
            {
                if (sWidth*destHeight > sHeight*destWidth)
                {
                    sW = destWidth;
                    sH = destWidth*sHeight/sWidth;
                }
                else

                {
                    sH = destHeight;
                    sW = sWidth*destHeight/sHeight;
                }
            }
            else
            {
                sW = sWidth;
                sH = sHeight;
            }

            var outBmp = new Bitmap(destWidth, destHeight);
            var g = Graphics.FromImage(outBmp);
            g.Clear(Color.Transparent);

            // 设置画布的描绘质量
            g.CompositingQuality = CompositingQuality.HighQuality;
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.DrawImage(imgSource, new Rectangle((destWidth - sW)/2, (destHeight - sH)/2, sW, sH), 0, 0, imgSource.Width,
                imgSource.Height, GraphicsUnit.Pixel);
            g.Dispose();

            //设置压缩质量
            var encoderParams = new EncoderParameters();
            var quality = new long[1];
            quality[0] = 100;
            var encoderParam = new EncoderParameter(Encoder.Quality, quality);
            encoderParams.Param[0] = encoderParam;
            imgSource.Dispose();

            return outBmp;
        }

        /// <summary>
        ///     按尺寸缩放图片
        /// </summary>
        /// <param name="imgStream"></param>
        /// <param name="destWidth"></param>
        /// <param name="destHeight"></param>
        /// <returns></returns>
        public Bitmap Zoom(Stream imgStream, int destWidth, int destHeight)
        {
            var bmp = new Bitmap(imgStream);
            return Zoom(bmp, destWidth, destHeight);
        }

        /// <summary>
        ///     按高度缩放图片，自动计算宽度
        /// </summary>
        /// <param name="img"></param>
        /// <param name="destHeight"></param>
        /// <returns></returns>
        public Bitmap ZoomByHeight(Bitmap img, int destHeight)
        {
            var sWidth = img.Width;
            var sHeight = img.Height;
            var destWidth = 0;

            if (destHeight > sHeight)
            {
                destWidth = (int) (destHeight/(double) sHeight*sWidth);
            }
            else
            {
                destWidth = (int) (sWidth/(sHeight/(double) destHeight));
            }

            return Zoom(img, destWidth, destHeight);
        }

        /// <summary>
        ///     按高度缩放图片，自动计算宽度
        /// </summary>
        /// <param name="imgStream"></param>
        /// <param name="destHeight"></param>
        /// <returns></returns>
        public Bitmap ZoomByHeight(Stream imgStream, int destHeight)
        {
            var bmp = new Bitmap(imgStream);
            return ZoomByHeight(bmp, destHeight);
        }

        /// <summary>
        ///     按宽度缩放图片，自动计算高度
        /// </summary>
        /// <param name="img"></param>
        /// <param name="destWidth"></param>
        /// <returns></returns>
        public Bitmap ZoomByWidth(Bitmap img, int destWidth)
        {
            var sWidth = img.Width;
            var sHeight = img.Height;
            var destHeight = 0;

            if (destWidth > sWidth)
            {
                destHeight = (int) (destWidth/(double) sWidth*sHeight);
            }
            else
            {
                destHeight = (int) (sHeight/(sWidth/(double) destWidth));
            }

            return Zoom(img, destWidth, destHeight);
        }

        /// <summary>
        ///     按宽度缩放图片，自动计算高度
        /// </summary>
        /// <param name="imgStream"></param>
        /// <param name="destWidth"></param>
        /// <returns></returns>
        public Bitmap ZoomByWidth(Stream imgStream, int destWidth)
        {
            var bmp = new Bitmap(imgStream);
            return ZoomByWidth(bmp, destWidth);
        }

        /// <summary>
        ///     图片剪切
        /// </summary>
        /// <param name="img"></param>
        /// <param name="startX"></param>
        /// <param name="startY"></param>
        /// <param name="destWidth"></param>
        /// <param name="destHeight"></param>
        /// <returns></returns>
        public Bitmap Cut(Bitmap img, int startX, int startY, int destWidth, int destHeight)
        {
            var w = img.Width;
            var h = img.Height;

            if (startX >= w || startY >= h)
            {
                throw new Exception("起始点大于原图尺寸");
            }

            if (startX + destWidth > w)
            {
                destWidth = w - startX;
            }

            if (startY + destHeight > h)
            {
                destHeight = h - startY;
            }

            var bmpOut = new Bitmap(destWidth, destHeight, PixelFormat.Format24bppRgb);
            var g = Graphics.FromImage(bmpOut);
            g.DrawImage(img, new Rectangle(0, 0, destWidth, destHeight),
                new Rectangle(startX, startY, destWidth, destHeight), GraphicsUnit.Pixel);
            g.Dispose();
            return bmpOut;
        }

        /// <summary>
        ///     图片剪切
        /// </summary>
        /// <param name="imgStream"></param>
        /// <param name="startX"></param>
        /// <param name="startY"></param>
        /// <param name="destWidth"></param>
        /// <param name="destHeight"></param>
        /// <returns></returns>
        public Bitmap Cut(Stream imgStream, int startX, int startY, int destWidth, int destHeight)
        {
            var bmp = new Bitmap(imgStream);
            return Cut(bmp, startX, startY, destWidth, destHeight);
        }

        /// <summary>
        /// 生成水印
        /// </summary>
        /// <param name="warterid"></param>
        /// <param name="imgStream"></param>
        /// <returns></returns>
        public Stream CreateWarterImage(string warterid, Stream imgStream)
        {

            FeWatermark watermarkType = ObjektFactory.Find<FeWatermark>(warterid);
            MemoryStream result = null;
            double inttransparency = 1;

            //显示位置   
            string tlocationValueName = watermarkType.Location.Value_;

            using (Bitmap bitmap = new Bitmap(imgStream))
            {

                if (watermarkType.Type.Id == FeValueIDs.FeWatermark_FeText)
                {
                    #region 文字水印

                    //字体
                    string tfontSizeName = watermarkType.FontSize.Value_;

                    //字号  
                    string tfontfamilyValueName = watermarkType.Font.Value_;

                    //文字颜色透明度
                    inttransparency = Convert.ToDouble(watermarkType.Transparency) / (double)100 * 255;

                    float fontsize = float.Parse(tfontSizeName); //字体大小 
                    float textwidth = watermarkType.Text.Length * fontsize; //文本的长度 

                    float rectx = 0;
                    float recty = 0;
                    float rectwidth = watermarkType.Text.Length * (fontsize + 8);
                    //声明矩形域
                    float rectheight = fontsize + 8;

                    float imageHeight = bitmap.Height;
                    float imageWeight = bitmap.Width;

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

                    //下面定义一个矩形区域，以后在这个矩形里画上白底黑字
                    RectangleF textarea = new RectangleF(rectx, recty, rectwidth, rectheight);
                    //定义字体 
                    Font font = new Font(tfontfamilyValueName, fontsize);
                    Color color = ColorTranslator.FromHtml(watermarkType.FontColor);
                    //画文字用 
                    Brush whitebrush = new SolidBrush(Color.FromArgb(Convert.ToInt32(inttransparency), color));
                    //画背景用   透明
                    Brush blackbrush = new SolidBrush(Color.FromArgb(0xdd2378));

                    using (Graphics g = Graphics.FromImage(bitmap))
                    {
                        g.FillRectangle(blackbrush, rectx, recty, rectwidth, rectheight);
                        StringFormat strFormat = new StringFormat();
                        //定义需要印的文字居中对齐
                        strFormat.Alignment = StringAlignment.Center;
                        g.DrawString(watermarkType.Text, font, whitebrush, textarea, strFormat);
                        result = new MemoryStream();
                        bitmap.Save(result, bitmap.RawFormat);
                    }

                    #endregion
                }
                else
                {
                    #region 图片水印

                    //确定其长宽
                    int phWidth = bitmap.Width;
                    int phHeight = bitmap.Height;

                    //封装 GDI+ 位图，此位图由图形图像及其属性的像素数据组成。
                    using (Bitmap bmPhoto = new Bitmap(phWidth, phHeight, PixelFormat.Format24bppRgb))
                    {

                        //设定分辨率
                        bmPhoto.SetResolution(bitmap.HorizontalResolution, bitmap.VerticalResolution);

                        //定义一个绘图画面用来装载位图
                        using (Graphics grPhoto = Graphics.FromImage(bmPhoto))
                        {

                            ////同样，由于水印是图片，我们也需要定义一个Image来装载它
                            using (Image imgWatermark = new Bitmap(watermarkType.imageFile.FileContent))
                            {
                                //获取水印图片的高度和宽度
                                int wmWidth = imgWatermark.Width;
                                int wmHeight = imgWatermark.Height;

                                //消除锯齿的呈现
                                grPhoto.SmoothingMode = SmoothingMode.AntiAlias;

                                //第一次描绘，将我们的底图描绘在绘图画面上
                                grPhoto.DrawImage(
                                    bitmap,
                                    new Rectangle(0, 0, phWidth, phHeight),
                                    0,
                                    0,
                                    phWidth,
                                    phHeight,
                                    GraphicsUnit.Pixel
                                    );

                                //与底图一样，我们需要一个位图来装载水印图片。并设定其分辨率
                                using (Bitmap bmWatermark = new Bitmap(bmPhoto))
                                {
                                    bmWatermark.SetResolution(bitmap.HorizontalResolution, bitmap.VerticalResolution);

                                    //继续，将水印图片装载到一个绘图画面grWatermark
                                    using (Graphics grWatermark = Graphics.FromImage(bmWatermark))
                                    {
                                        //ImageAttributes 对象包含有关在呈现时如何操作位图和图元文件颜色的信息
                                        ImageAttributes imageAttributes = new ImageAttributes();

                                        //Colormap: 定义转换颜色的映射
                                        ColorMap colorMap = new ColorMap();

                                        //我的水印图被定义成拥有绿色背景色的图片被替换成透明
                                        colorMap.OldColor = Color.FromArgb(255, 0, 255, 0);
                                        colorMap.NewColor = Color.FromArgb(0, 0, 0, 0);
                                        ColorMap[] remapTable = { colorMap };
                                        imageAttributes.SetRemapTable(remapTable, ColorAdjustType.Bitmap);
                                        float alpha = float.Parse(watermarkType.Transparency.ToString()) / 100;

                                        //ColorMatrix:定义包含 RGBA 空间坐标的 5 x 5 矩阵。
                                        float[][] colorMatrixElements =
                                        {
                                                new float[] {1.0f, 0.0f, 0.0f, 0.0f, 0.0f}, // red红色  
                                                new float[] {0.0f, 1.0f, 0.0f, 0.0f, 0.0f}, //green绿色  
                                                new float[] {0.0f, 0.0f, 1.0f, 0.0f, 0.0f}, //blue蓝色         
                                                new float[] {0.0f, 0.0f, 0.0f, alpha, 0.0f}, //透明度       
                                                new float[] {0.0f, 0.0f, 0.0f, 0.0f, 1.0f}
                                            };


                                        //ImageAttributes 类的若干方法通过使用颜色矩阵调整图像颜色。
                                        ColorMatrix wmColorMatrix = new ColorMatrix(colorMatrixElements);
                                        imageAttributes.SetColorMatrix(wmColorMatrix, ColorMatrixFlag.Default,
                                            ColorAdjustType.Bitmap);

                                        //开始设置位置
                                        int xPosOfWm = 0;
                                        int yPosOfWm = 0;

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

                                        //第二次绘图，把水印印上去
                                        grWatermark.DrawImage(
                                            imgWatermark,
                                            new Rectangle(xPosOfWm, yPosOfWm, wmWidth, wmHeight),
                                            0,
                                            0,
                                            wmWidth,
                                            wmHeight,
                                            GraphicsUnit.Pixel,
                                            imageAttributes
                                            );
                                        result = new MemoryStream();
                                        bmWatermark.Save(result, bitmap.RawFormat);

                                    }

                                }

                            }

                        }

                    }

                    #endregion
                }

            }

            return result;

        }

        /// <summary>
        /// 创建水印
        /// </summary>
        /// <param name="warterid"></param>
        /// <param name="fileid"></param>
        /// <returns></returns>
        public Stream CreateWarterImage(string warterid, string fileid)
        {
            GroupflyGroup.Platform.ObjectFramework.File waterImage = ObjektFactory.Find<GroupflyGroup.Platform.ObjectFramework.File>(fileid);
            return CreateWarterImage(warterid, waterImage.FileContent);
        }
    }
}