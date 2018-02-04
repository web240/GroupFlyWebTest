using System.ComponentModel.Composition;
using System.Web.Mvc;
using EB.Common;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.Web.Extension;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.ObjectFramework.Extension;
using System.Text;
using System.Net;
using System;
using System.IO;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.Web.EventListener
{
    /// <summary>
    ///     短信宝发短信扩展点实现
    /// </summary>
    [Export(typeof (DoMessageSendingEventListener))]
    public class DoSmsBaoHttpSmsMessageSendingEventListener : DoMessageSendingEventListener
    {
        public override int Priority
        {
            get { return 101; }
        }

        public override string Description
        {
            get { return ""; }
        }

        public override void Do(Event e)
        {
            var msp = e.Parameter as MessageSendingParameter;
            if (msp.Receiver == null)
            {
                throw new Exception("发送短信接收人无效！");
            }
            if (msp.MessageService == null)
            {
                throw new Exception("发送短信服务无效！");
            }
            if (msp.MessageService.Id == FeSmsIDs.SMS_SmsBao_Http)
            {
                msp.ReceiverAccount = msp.Receiver.Cell;
                if (string.IsNullOrEmpty(msp.ReceiverAccount))
                {
                    throw new Exception(msp.Receiver + "手机号未设置！");
                }
                SMS sms = ObjektFactory.Find<SMS>(FeSmsIDs.SMS_SmsBao_Http);
                var u = sms.GetAttribute("u").Value;
                if (string.IsNullOrEmpty(u))
                {
                    throw new Exception("短信宝短信发送服务配置错误： cdkey为空！");
                }
                var p = sms.GetAttribute("p").Value;
                if (string.IsNullOrEmpty(p))
                {
                    throw new Exception("短信宝短信发送服务配置错误： password为空！");
                }
                var url = sms.GetAttribute("url").Value;
                if (string.IsNullOrEmpty(url))
                {
                    throw new Exception("短信宝短信发送服务配置错误： url为空！");
                }

                url = url + "?" + "u=" + u.Trim() + "&p=" + System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(p.Trim(), "MD5").ToLower()
                    + "&m=" + msp.ReceiverAccount + "&c=" + msp.Message.Text ;
                string responseString = string.Empty;
                StreamReader streamReader = null;

                Encoding code = Encoding.GetEncoding("utf-8");
                HttpWebRequest request = HttpWebRequest.CreateHttp(url); ;
                HttpWebResponse response = null;
                response = request.GetResponse() as HttpWebResponse;
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    throw new Exception("短信宝短信发送请求失败,HttpStatusCode：" + response.StatusCode);
                }
                streamReader = new StreamReader(response.GetResponseStream(), code);
                responseString = streamReader.ReadToEnd();
                responseString = responseString.Replace("\n", "|").Split('|')[0];
                string errmsg = "";
                switch (responseString)
                {
                    case "0":
                        break;
                    case "30":
                        errmsg = "密码错误";
                        break;
                    case "40":
                        errmsg = "账号不存在";
                        break;
                    case "41":
                        errmsg = "余额不足";
                        break;
                    case "42":
                        errmsg = "帐号过期";
                        break;
                    case "43":
                        errmsg = "IP地址限制";
                        break;
                    case "50":
                        errmsg = "内容含有敏感词";
                        break;
                    case "51":
                        errmsg = "手机号码不正确";
                        break;
                    default:
                        errmsg = "未知错误";
                        break;
                }
                if (!string.IsNullOrEmpty(errmsg))
                {
                    throw new Exception("短信宝短信发送失败,失败原因：" + errmsg);
                }
            }
        }

    }
}