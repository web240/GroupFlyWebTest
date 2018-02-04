using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.Platform.Web.Controllers
{
    public class VerifyCodeController : BaseController
    {
        // GET: VerifyCode
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// 生成验证码图片
        /// </summary>
        /// <param name="VerifyCodeLength">验证码长度</param>
        /// <param name="ImgWidth">图片宽度</param>
        /// <param name="ImgHeigth">图片高度</param>
        /// <param name="FontSize">验证码字号</param>
        /// <param name="VerifyCodeKey">验证码唯一Key(不填则验证码全局唯一,填则不唯一且可并发多个验证码)</param>
        /// <returns></returns>
        public ActionResult CreatVerifyCode(int VerifyCodeLength=4,int ImgWidth=60, int ImgHeigth=30,int FontSize=14,string VerifyCodeKey=Const.DefaultImgVerifyCode)
        {
            //生成验证码字符串
            string str_ValidateCode =VerifyCodeViewModel.CreateRandomCode(VerifyCodeLength);
            
            //根据高度和宽度创建图片对象
            Bitmap theBitmap = new Bitmap(ImgWidth, ImgHeigth);

            //创建图片Graphics对象
            Graphics theGraphics = Graphics.FromImage(theBitmap);

            //指定图片白色背景
            theGraphics.Clear(Color.White);

            //指定图片灰色边框
            theGraphics.DrawRectangle(new Pen(Color.LightGray, 1), 0, 0, ImgWidth-1, ImgHeigth-1);

            //指定字体大小
            Font theFont = new Font("Arial", FontSize);

            //创建一个随机对象
            Random newRandom = new Random();

            //循环在图片上创建验证码
            for (int int_index = 0; int_index < str_ValidateCode.Length; int_index++)
            {
                //得到验证码的一个字符
                string str_char = str_ValidateCode.Substring(int_index, 1);
                //创建字符的颜色
                Brush newBrush = new SolidBrush(GetRandomColor());
                //创建字符的位置
                Point thePos = new Point(int_index * FontSize + 1 + newRandom.Next(3), 1 + newRandom.Next(3));
                //在图片上画出字符
                theGraphics.DrawString(str_char, theFont, newBrush, thePos);
            }

            //将生成的图片发回客户端
            MemoryStream verifyCodeStream = new MemoryStream();
            theBitmap.Save(verifyCodeStream, System.Drawing.Imaging.ImageFormat.Jpeg);
            theBitmap.Dispose();
            theGraphics.Dispose();

            //存储图片验证码
           
            GroupflyGroup.Platform.ObjectFramework.WebAdapter.WebSessionDataCache.Set(VerifyCodeKey, str_ValidateCode);
            

            return File(verifyCodeStream.ToArray(), "image/jpeg");            
        }

        /// <summary>
        /// 随机颜色
        /// </summary>
        /// <returns></returns>
        private Color GetRandomColor()
        {          
            return Color.FromArgb(128, 128, 128);
        }
    }
}