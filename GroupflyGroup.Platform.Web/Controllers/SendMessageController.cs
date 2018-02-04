using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.WebAdapter;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.Platform.Web.Controllers
{
    public class SendMessageController : BaseController
    {
        /// <summary>
        /// 发送消息验证码
        /// </summary>
        /// <param name="messageTemplateId">消息模版Id</param>
        /// <param name="messageSenderId">消息发送器Id可多个,用','分隔</param>
        /// <param name="accounts">消息接收账户,可多个用','分隔</param>
        /// <param name="codeLength">验证码长度</param>
        /// <param name="smsVerifyCodeKey">消息验证码Key</param>
        /// <returns></returns>
        public JsonResult SendMessageCode(string messageTemplateId,string messageSenderId,string accounts, int codeLength=4,string smsVerifyCodeKey=Const.DefaultSmsVerifyCode)
        {
            JsonResultModel jsonResultModel = new JsonResultModel();
            //生成随即验证码
            var randomCode = VerifyCodeViewModel.CreateRandomCode(codeLength);

            //设置上下文,计算验证码表达式         
            PersistenceContext.SetParameter(Const.SmsVerifyCodeExpression, randomCode);

            //得到消息模版
            MessageTemplate messageTemplate = ObjektFactory.Find<MessageTemplate>(messageTemplateId);

            //得到消息发送器
            List<MessageSender> messageSenders = new List<MessageSender>();
            string[] messageSenderArray = messageSenderId.Split(new Char[] { ',' });
            foreach (string messageSender in messageSenderArray)
            {
                messageSenders.Add(ObjektFactory.Find<MessageSender>(messageSender));
            }

            //得到消息接收对象           
            string[] accountArray = accounts.Split(new Char[] { ',' });
            //以Guest身份接收信息
            User receiver = ObjektFactory.Find<User>(UserIDs.guest); ;
            foreach (string account in accountArray)
            {
                List<User> receivers = new List<User>();              
                receiver.Cell = account;
                receiver.Email = account;
                receivers.Add(receiver);

                //执行消息发送器
                DoSendSmsCode(messageTemplate, messageSenders, receivers);
            }

            //消息验证码过期时间
            SystemConfiguration messageVerificationCodeExpiration = ObjektFactory.Find<SystemConfiguration>(Const.MessageVerificationCodeExpiration);

            TimeSpan timeSpan = new TimeSpan(0,0,Convert.ToInt32(messageVerificationCodeExpiration.Value));

            //存储短信验证码
            WebSessionDataCache.Set(smsVerifyCodeKey, randomCode,timeSpan);

            return Json(jsonResultModel);
        }

        /// <summary>
        /// 执行消息发送器
        /// </summary>
        /// <param name="messageTemplate">消息模版</param>
        /// <param name="messageSenders">消息发送器</param>
        /// <param name="receivers">接收用户对象</param>
        public void DoSendSmsCode(MessageTemplate messageTemplate, List<MessageSender> messageSenders, List<User> receivers)
        {            
            //以系统管理员身份执行代码
            PersistenceContext.BeginTransaction(new SessionContext(UserIDs.admin));
                      
            //得到消息内容
            Message message = new Message();
            //计算模版内容
            message.Text = messageTemplate.GetPropertyCalculated(PropertyNames.text); 
            //计算模版标题
            message.Title = messageTemplate.GetPropertyCalculated(PropertyNames.title);
            //以系统管理员身份发送信息            
            message.Sender = ObjektFactory.Find<User>(UserIDs.admin);
            //使用模版
            message.Template = messageTemplate;

            foreach (MessageSender mSender in messageSenders)
            {
                mSender.Send(message, receivers);
            }
           
        }

    }
}