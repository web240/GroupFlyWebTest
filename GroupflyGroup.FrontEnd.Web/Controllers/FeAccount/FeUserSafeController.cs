using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Auth;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeAccount
{
    /// <summary>
    /// 账户安全
    /// </summary>
    public class FeUserSafeController : Platform.Web.Controllers.BaseController
    {
        /// <summary>
        /// 账户安全
        /// </summary>
        /// <returns></returns>
        [LoginRequired(LoginUrl = "~/FrontEndLogin")]
        public PartialViewResult Index()
        {
            return PartialView(new BaseViewModel());
        }

        #region 修改密码
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        [LoginRequired(LoginUrl = "FrontEndLogin")]
        public PartialViewResult UpdatePassword()
        {
            return PartialView(new BaseViewModel());
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="oldPwd">老密码</param>
        /// <param name="newPwd">新密码</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult UpdatePassword(string oldPwd, string newPwd)
        {
            var result = new JsonResultModel(false, "新旧密码不能为空");
            if (string.IsNullOrEmpty(oldPwd) || string.IsNullOrEmpty(newPwd))
            {
                return Json(result);
            }
            result.Message = "更新密码失败";
            try
            {
                Platform.ObjectFramework.User user;
                if (Authentication.VerifyPasswork(SessionContext.Current.User.Name, oldPwd, out user))
                {
                    if (user != null)
                    {
                        user.Password = newPwd;
                        user.Save();
                        result.IsSuccess = true;
                        result.Message = "更新密码成功";
                    }
                    else
                    {
                        result.Message = "旧密码错误";
                    }
                }
            }
            catch (Exception ex)
            {
                PersistenceContext.Discard();
                result.Message = ex.Message;
            }
            return Json(result);
        }

        /// <summary>
        /// 验证密码
        /// </summary>
        /// <param name="oldPwd">旧密码</param>
        /// <returns></returns>
        public JsonResult CheckPassword(string oldPwd)
        {
            var result = new JsonResultModel(false, "旧密码不能为空");
            if (string.IsNullOrEmpty(oldPwd))
            {
                return Json(result);
            }
            result.Message = "旧密码错误";
            try
            {
                Platform.ObjectFramework.User user;
                if (Authentication.VerifyPasswork(SessionContext.Current.User.Name, oldPwd, out user))
                {
                    if (user != null)
                    {
                        result.IsSuccess = true;
                        result.Message = "验证通过";
                    }
                }
            }
            catch (Exception ex)
            {
                PersistenceContext.Discard();
                result.Message = ex.Message;
            }
            return Json(result);
        }
        #endregion

        #region 绑定手机
        /// <summary>
        /// 绑定手机
        /// </summary>
        /// <returns></returns>
        [LoginRequired(LoginUrl = "FrontEndLogin")]
        public PartialViewResult BindMobile()
        {
            //验证是否绑定
            Platform.ObjectFramework.User user = ObjektFactory.Find<Platform.ObjectFramework.User>(SessionContext.Current.User.Id);
            if (string.IsNullOrEmpty(user.Cell)) { ViewBag.isVerified = 0; } else { ViewBag.isVerified = 1; }

            return PartialView(new BaseViewModel());
        }

        /// <summary>
        /// 解绑手机
        /// </summary>
        /// <param name="imgCode">图片验证码</param>
        /// <param name="cellCode">手机验证码</param>
        /// <returns></returns>
        public JsonResult BindMobile1(string imgCode, string cellCode)
        {
            var result = new JsonResultModel(false, "");
            //验证图片验证码和手机验证码
            VerifyCodeViewModel verifyCodeViewModel = new VerifyCodeViewModel();
            if (!verifyCodeViewModel.CheckImgVerifyCode(imgCode))
            {
                result.Message = "图片验证码不对;";
                return Json(result);
            }

            if (!verifyCodeViewModel.CheckSmsVerifyCode(cellCode, "MessageCode1"))
            {
                result.Message += "手机验证码不对;";
                return Json(result);
            }
            try
            {
                //var user = SessionContext.Current.User;
                //user.Cell = null;  //设置为null报错
                //user.Save();
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.ToString();
            }
            return Json(result);
        }

        /// <summary>
        /// 绑定新手机
        /// </summary>
        /// <param name="cell">手机号</param>
        /// <param name="imgCode">图片验证码</param>
        /// <param name="cellCode">手机验证码</param>
        /// <returns></returns>
        public JsonResult BindMobile2(string cell, string imgCode, string cellCode)
        {
            var result = new JsonResultModel(false, "");
            //验证图片验证码和手机验证码
            VerifyCodeViewModel verifyCodeViewModel = new VerifyCodeViewModel();
            if (!verifyCodeViewModel.CheckImgVerifyCode(imgCode))
            {
                result.Message = "图片验证码不对;";
                return Json(result);
            }
            if (!verifyCodeViewModel.CheckSmsVerifyCode(cellCode, "MessageCode"))
            {
                result.Message += "手机验证码不对;";
                return Json(result);
            }
            try
            {
                var user = SessionContext.Current.User;
                user.Cell = cell;
                user.Save();
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.ToString();
            }
            return Json(result);
        }
        #endregion

        #region 绑定邮箱
        /// <summary>
        /// 绑定邮箱
        /// </summary>
        /// <returns></returns>
        public PartialViewResult BindEmail()
        {
            //验证是否绑定
            Platform.ObjectFramework.User user = SessionContext.Current.User;
            if (string.IsNullOrEmpty(user.Email)) { ViewBag.isVerified = 0; } else { ViewBag.isVerified = 1; }

            return PartialView(new BaseViewModel());
        }
        /// <summary>
        /// 绑定邮箱
        /// </summary>
        /// <param name="code">验证部分</param>
        /// <returns></returns>
        public ViewResult ValidateBindEmail(string code)
        {
            var dic = ValidateBindEmailUrl(code);
            string userid = string.Empty,
                email = string.Empty,
                ofAccessToken = string.Empty;
            foreach (var item in dic)
            {
                switch (item.Key)
                {
                    case "userid": userid = item.Value; break;
                    case "email": email = item.Value; break;
                    case "ofAccessToken": ofAccessToken = item.Value; break;
                }
            }
            if (!string.IsNullOrEmpty(ofAccessToken))
            {
                HttpContext.Request.QueryString.Set("ofAccessToken", ofAccessToken);
                //HttpContext.Request.Cookies.Set(new HttpCookie("ofAccessToken", ofAccessToken));
                var user = Platform.ObjectFramework.User.Current;
            }
            else
            {
                throw new Exception("身份信息无效");
            }
            if (!string.IsNullOrEmpty(userid) && !string.IsNullOrEmpty(email))
            {
                Service.EmailService.BindEmailService(userid, email);
            }
            else
            {
                throw new Exception("解绑邮箱异常");
            }
            ViewBag.isBind = true;
            return View("BindEmailSuccess", new BaseViewModel());
        }
        /// <summary>
        /// 解绑邮箱
        /// </summary>
        /// <param name="code">验证参数</param>
        /// <returns></returns>
        public ViewResult ValidateUnBindEmail(string code)
        {
            var dic = ValidateBindEmailUrl(code);
            string userid = string.Empty,
                email = string.Empty,
                ofAccessToken = string.Empty;
            foreach (var item in dic)
            {
                switch (item.Key)
                {
                    case "userid": userid = item.Value; break;
                    case "email": email = item.Value; break;
                    case "ofAccessToken": ofAccessToken = item.Value; break;
                }
            }
            if (!string.IsNullOrEmpty(ofAccessToken))
            {
                HttpContext.Request.Cookies.Set(new HttpCookie("ofAccessToken", ofAccessToken));
                var user = Platform.ObjectFramework.User.Current;
            }
            else
            {
                throw new Exception("身份信息无效");
            }
            if (!string.IsNullOrEmpty(userid) && !string.IsNullOrEmpty(email))
            {
                Service.EmailService.UnbindEmailService(userid, email);
            }
            else
            {
                throw new Exception("解绑邮箱异常");
            }
            ViewBag.isBind = false;
            return View("BindEmailSuccess", new BaseViewModel());
        }
        /// <summary>
        /// 验证绑定邮箱URL合法性
        /// </summary>
        /// <param name="url">验证URL</param>
        private Dictionary<string, string> ValidateBindEmailUrl(string url)
        {
            string userid = string.Empty,
                email = string.Empty,
                ofAccessToken = string.Empty;
            Dictionary<string, string> dic = new Dictionary<string, string>();
            string code = DtDecrypt(url, "groupfly");
            if (!string.IsNullOrEmpty(code))
            {
                string[] parameters = code.Split('&');
                foreach (var parameter in parameters)
                {
                    string key = parameter.Split('=')[0];
                    string value = parameter.Split('=')[1];
                    switch (key)
                    {
                        case "userid": userid = value; break;
                        case "email": email = value; break;
                        case "ofAccessToken": ofAccessToken = value; break;
                    }
                }
            }
            else
            {
                throw new Exception("链接无效");
            }
            dic.Add("userid", userid);
            dic.Add("email", email);
            dic.Add("ofAccessToken", ofAccessToken);
            return dic;
        }
        /// <summary>
        /// 绑定邮箱操作
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <param name="email">邮箱</param>
        /// <returns></returns>
        public JsonResult DoBindEmail(string userid, string email)
        {
            var result = new JsonResultModel(false, "");
            if (string.IsNullOrEmpty(email))
            {
                result.Message = "邮箱为空";
                return Json(result);
            }
            if (!Service.AccountService.CheckUserEmailIsMateFormat(email))
            {
                result.Message = "邮箱格式不对";
                return Json(result);
            }
            if (Service.AccountService.CheckUserEmailIsExist(email))
            {
                result.Message = "邮箱己存在";
                return Json(result);
            }
            try
            {
                #region 发送绑定邮箱的消息
                //模板参数
                Dictionary<string, string> parameters = new Dictionary<string, string>();
                string baseurl = "userid=" + userid + "&email=" + email + "&ofAccessToken=" + PersistenceContext.AccessToken;
                string url = HttpContext.Request.Url.AbsoluteUri.Replace("DoBindEmail", "ValidateBindEmail") + "?code=" + DtEncrypt(baseurl, "groupfly");
                parameters.Add("bindEmailUrl", url);
                //发送模板消息
                SendEmailMessage(userid, email, "c44db277ff0444d086dc3e9bb7b4b01d@MessageTemplate", parameters);
                #endregion
                result.IsSuccess = true;
            }
            catch (Exception e)
            {
                result.Message = e.ToString();
            }

            return Json(result);
        }
        /// <summary>
        /// 解绑邮箱操作
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <param name="email">邮箱</param>
        /// <returns></returns>
        public JsonResult DoUnbindEmail(string userid, string email)
        {
            var result = new JsonResultModel(false, "");
            if (string.IsNullOrEmpty(email))
            {
                result.Message = "邮箱为空";
                return Json(result);
            }
            if (!Service.AccountService.CheckUserEmailIsMateFormat(email))
            {
                result.Message = "邮箱格式不对";
                return Json(result);
            }

            try
            {
                #region 发送解绑邮箱的消息
                //模板参数
                Dictionary<string, string> parameters = new Dictionary<string, string>();
                string baseurl = "userid=" + userid + "&email=" + email + "&ofAccessToken=" + PersistenceContext.AccessToken;
                string url = HttpContext.Request.Url.AbsoluteUri.Replace("DoUnbindEmail", "ValidateUnBindEmail") + "?code=" + DtEncrypt(baseurl, "groupfly");
                parameters.Add("unbindEmailUrl", url);
                //发送模板消息
                SendEmailMessage(userid, email, "c1b0b11aebba40fb8414aeb08f841235@MessageTemplate", parameters);
                #endregion
                result.IsSuccess = true;
            }
            catch (Exception e)
            {
                result.Message = e.ToString();
            }

            return Json(result);
        }

        /// <summary>
        /// 发送模板消息
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <param name="email">邮箱</param>
        /// <param name="messageTemplateId">模板ID</param>
        /// <param name="parameter">模板参数</param>
        private void SendEmailMessage(string userid, string email, string messageTemplateId, Dictionary<string, string> parameter)
        {
            //得到消息模板 绑定邮箱
            MessageTemplate messageTemplate = ObjektFactory.Find<MessageTemplate>(messageTemplateId);
            //得到消息发送器
            MessageSender messageSender = ObjektFactory.Find<MessageSender>("ebabb829eb374a0aa0306b9436bb4369@MessageSender");
            //接受信息的人
            User receiver = ObjektFactory.Find<User>(userid);
            receiver.Email = email;
            //执行消息发送器
            DoSendEmailMessage(messageTemplate, messageSender, receiver, parameter);
        }
        /// <summary>
        /// 执行消息发送器
        /// </summary>
        /// <param name="messageTemplate">消息模版</param>
        /// <param name="messageSender">消息发送器</param>
        /// <param name="receiver">接收用户对象</param>
        /// <param name="parameter">模板参数</param>
        private void DoSendEmailMessage(MessageTemplate messageTemplate, MessageSender messageSender, User receiver, Dictionary<string, string> parameter)
        {
            //以系统身份执行
            PersistenceContext.BeginTransaction(new SessionContext(UserIDs.system));
            //得到消息内容
            Message message = new Message();
            foreach (var item in parameter)
            {
                PersistenceContext.SetParameter(item.Key, item.Value);
            }
            message.Text = messageTemplate.GetPropertyCalculated(PropertyNames.text);
            message.Title = messageTemplate.GetPropertyCalculated(PropertyNames.title);
            message.Sender = ObjektFactory.Find<User>(UserIDs.system);
            message.Template = messageTemplate;
            //接收方
            List<User> receivers = new List<Platform.ObjectFramework.User>();
            receivers.Add(receiver);
            //发送消息
            messageSender.Send(message, receivers);
        }

        #endregion

        #region 验证
        /// <summary>
        /// 验证手机号是否存在
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        public JsonResult CheckMobile(string mobile)
        {
            var result = new JsonResultModel(false, "");
            if (string.IsNullOrEmpty(mobile))
            {
                result.Message = "手机号不能为空";
            }
            else
            {
                if (Regex.IsMatch(mobile, @"1\d{10}"))
                {
                    var oc = new ObjektCollection<Platform.ObjectFramework.User>(Platform.ObjectFramework.Klass.ForName(Platform.ObjectFramework.Strings.KlassNames.User), new WhereClause("\"cell\" = '" + mobile + "'"));
                    if (oc != null && oc.Count > 0)
                    {
                        result.Message = "已存在该手机号";
                    }
                    else
                    {
                        result.IsSuccess = true;
                    }
                }
                else
                {
                    result.Message = "手机号错误";
                }
            }
            return Json(result);
        }
        /// <summary>
        /// 验证邮箱是否存在
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public JsonResult CheckEmail(string email)
        {
            var result = new JsonResultModel(false, "");
            if (string.IsNullOrEmpty(email))
            {
                result.Message = "邮箱不能为空";
            }
            else
            {
                if (Regex.IsMatch(email, @"\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+"))
                {
                    var oc = new ObjektCollection<Platform.ObjectFramework.User>(Platform.ObjectFramework.Klass.ForName(Platform.ObjectFramework.Strings.KlassNames.User), new WhereClause("\"email\" = '" + email + "'"));
                    if (oc != null && oc.Count > 0)
                    {
                        result.Message = "已存在该邮箱";
                    }
                    else
                    {
                        result.IsSuccess = true;
                    }
                }
                else
                {
                    result.Message = "邮箱错误";
                }
            }
            return Json(result);
        }
        #endregion

        #region 加解密方法

        #region DES加解密
        /// <summary>
        /// 进行DES加密。
        /// </summary>
        /// <param name="pToEncrypt">要加密的字符串。</param>
        /// <param name="sKey">密钥，且必须为8位。</param>
        /// <returns>以Base64格式返回的加密字符串。</returns>
        public static string DESEncrypt(string pToEncrypt, string sKey)
        {
            if (string.Empty.Equals(pToEncrypt))
                return string.Empty;
            using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
            {
                byte[] inputByteArray = Encoding.UTF8.GetBytes(pToEncrypt);
                des.Key = ASCIIEncoding.ASCII.GetBytes(sKey);
                des.IV = ASCIIEncoding.ASCII.GetBytes(sKey);
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                using (CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(inputByteArray, 0, inputByteArray.Length);
                    cs.FlushFinalBlock();
                    cs.Close();
                }
                string str = Convert.ToBase64String(ms.ToArray());
                ms.Close();
                return str;
            }
        }

        /// <summary>
        /// 进行DES解密。
        /// </summary>
        /// <param name="pToDecrypt">要解密的以Base64</param>
        /// <param name="sKey">密钥，且必须为8位。</param>
        /// <returns>已解密的字符串。</returns>
        public static string DESDecrypt(string pToDecrypt, string sKey)
        {
            if (string.Empty.Equals(pToDecrypt))
                return string.Empty;
            byte[] inputByteArray = Convert.FromBase64String(pToDecrypt);
            using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
            {
                des.Key = ASCIIEncoding.ASCII.GetBytes(sKey);
                des.IV = ASCIIEncoding.ASCII.GetBytes(sKey);
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                using (CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(inputByteArray, 0, inputByteArray.Length);
                    cs.FlushFinalBlock();
                    cs.Close();
                }
                string str = Encoding.UTF8.GetString(ms.ToArray());
                ms.Close();
                return str;
            }
        }
        #endregion
        #region MyRegion
        //默认密钥向量
        private static byte[] Keys = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
        /// <summary>
        /// DES加密字符串
        /// </summary>
        /// <param name=”encryptString”>待加密的字符串</param>
        /// <param name=”encryptKey”>加密密钥,要求为8位</param>
        /// <returns>加密成功返回加密后的字符串，失败返回源串</returns>
        public static string EncryptDES(string encryptString, string encryptKey)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 8));
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Convert.ToBase64String(mStream.ToArray());
            }
            catch
            {
                return encryptString;
            }
        }

        /// <summary>
        /// DES解密字符串
        /// </summary>
        /// <param name=”decryptString”>待解密的字符串</param>
        /// <param name=”decryptKey”>解密密钥,要求为8位,和加密密钥相同</param>
        /// <returns>解密成功返回解密后的字符串，失败返源串</returns>
        public static string DecryptDES(string decryptString, string decryptKey)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey);
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Convert.FromBase64String(decryptString);
                DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV), CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Encoding.UTF8.GetString(mStream.ToArray());
            }
            catch
            {
                return decryptString;
            }
        }
        #endregion
        #region dt加解密
        /// <summary> 
        /// 加密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string DtEncrypt(string Text, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray;
            inputByteArray = Encoding.Default.GetBytes(Text);
            des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            return ret.ToString();
        }
        /// <summary> 
        /// 解密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string DtDecrypt(string Text, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            int len;
            len = Text.Length / 2;
            byte[] inputByteArray = new byte[len];
            int x, i;
            for (x = 0; x < len; x++)
            {
                i = Convert.ToInt32(Text.Substring(x * 2, 2), 16);
                inputByteArray[x] = (byte)i;
            }
            des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            return Encoding.Default.GetString(ms.ToArray());
        }
        /// <summary>
        /// 32位MD5加密
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private static string Md5Hash(string input)
        {
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }
        #endregion
        #region 字符串加解密
        //字符串加密
        static string Encrypt(string str, string salt)
        {
            DESCryptoServiceProvider descsp = new DESCryptoServiceProvider();
            byte[] key = Encoding.Unicode.GetBytes(salt);
            byte[] data = Encoding.Unicode.GetBytes(str);
            MemoryStream MStream = new MemoryStream();
            CryptoStream CStream = new CryptoStream(MStream, descsp.CreateEncryptor(key, key), CryptoStreamMode.Write);
            CStream.Write(data, 0, data.Length);
            CStream.FlushFinalBlock();
            return Convert.ToBase64String(MStream.ToArray());
        }

        //字符串解密
        static string Decrypt(string str, string salt)
        {
            DESCryptoServiceProvider descsp = new DESCryptoServiceProvider();
            byte[] key = Encoding.Unicode.GetBytes(salt);
            byte[] data = Convert.FromBase64String(str);
            MemoryStream MStream = new MemoryStream();
            CryptoStream CStram = new CryptoStream(MStream, descsp.CreateDecryptor(key, key), CryptoStreamMode.Write);
            CStram.Write(data, 0, data.Length);
            CStram.FlushFinalBlock();
            return Encoding.Unicode.GetString(MStream.ToArray());
        }
        #endregion
        #region DES加密解密
        /// <summary>
        /// DES加密
        /// </summary>
        /// <param name="data">加密数据</param>
        /// <param name="key">8位字符的密钥字符串</param>
        /// <param name="iv">8位字符的初始化向量字符串</param>
        /// <returns></returns>
        public static string DESEncrypt(string data, string key, string iv)
        {
            byte[] byKey = System.Text.ASCIIEncoding.ASCII.GetBytes(key);
            byte[] byIV = System.Text.ASCIIEncoding.ASCII.GetBytes(iv);

            DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
            int i = cryptoProvider.KeySize;
            MemoryStream ms = new MemoryStream();
            CryptoStream cst = new CryptoStream(ms, cryptoProvider.CreateEncryptor(byKey, byIV), CryptoStreamMode.Write);

            StreamWriter sw = new StreamWriter(cst);
            sw.Write(data);
            sw.Flush();
            cst.FlushFinalBlock();
            sw.Flush();
            return Convert.ToBase64String(ms.GetBuffer(), 0, (int)ms.Length);
        }

        /// <summary>
        /// DES解密
        /// </summary>
        /// <param name="data">解密数据</param>
        /// <param name="key">8位字符的密钥字符串(需要和加密时相同)</param>
        /// <param name="iv">8位字符的初始化向量字符串(需要和加密时相同)</param>
        /// <returns></returns>
        public static string DESDecrypt(string data, string key, string iv)
        {
            byte[] byKey = System.Text.ASCIIEncoding.ASCII.GetBytes(key);
            byte[] byIV = System.Text.ASCIIEncoding.ASCII.GetBytes(iv);

            byte[] byEnc;
            try
            {
                byEnc = Convert.FromBase64String(data);
            }
            catch
            {
                return null;
            }

            DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider();
            MemoryStream ms = new MemoryStream(byEnc);
            CryptoStream cst = new CryptoStream(ms, cryptoProvider.CreateDecryptor(byKey, byIV), CryptoStreamMode.Read);
            StreamReader sr = new StreamReader(cst);
            return sr.ReadToEnd();
        }
        #endregion
        #region 3DES 加密解密

        public static string DES3Encrypt(string data, string key)
        {
            TripleDESCryptoServiceProvider DES = new TripleDESCryptoServiceProvider();

            DES.Key = ASCIIEncoding.ASCII.GetBytes(key);
            DES.Mode = CipherMode.CBC;
            DES.Padding = PaddingMode.PKCS7;

            ICryptoTransform DESEncrypt = DES.CreateEncryptor();

            byte[] Buffer = ASCIIEncoding.ASCII.GetBytes(data);
            return Convert.ToBase64String(DESEncrypt.TransformFinalBlock(Buffer, 0, Buffer.Length));
        }

        public static string DES3Decrypt(string data, string key)
        {
            TripleDESCryptoServiceProvider DES = new TripleDESCryptoServiceProvider();

            DES.Key = ASCIIEncoding.ASCII.GetBytes(key);
            DES.Mode = CipherMode.CBC;
            DES.Padding = System.Security.Cryptography.PaddingMode.PKCS7;

            ICryptoTransform DESDecrypt = DES.CreateDecryptor();

            string result = "";
            try
            {
                byte[] Buffer = Convert.FromBase64String(data);
                result = ASCIIEncoding.ASCII.GetString(DESDecrypt.TransformFinalBlock(Buffer, 0, Buffer.Length));
            }
            catch (Exception e)
            {

            }
            return result;
        }

        #endregion 
        #endregion


    }
}