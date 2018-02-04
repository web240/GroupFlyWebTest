//using GroupflyGroup.Platform.ObjectFramework.Persistence;
//using System.Collections.Generic;
//using GroupflyGroup.Platform.ObjectFramework;
//using GroupflyGroup.Platform.ObjectFramework.Strings;
//using Microsoft.VisualStudio.TestTools.UnitTesting;

//namespace GroupflyGroup.Platform.Web.Test
//{
//    /// <summary>
//    ///     SendMessageTest
//    /// </summary>
//    [TestClass]

//    public class SendMessageTest
//    {

//        [TestMethod]
//        public void SendTest()
//        {

//            //设置上下文
//            PersistenceContext.SetParameter("Title", "--标题--");
//            PersistenceContext.SetParameter("ValueExpression", "--值--");
//            PersistenceContext.SetParameter("TestUser", SessionContext.Current.User);

//            //模版
//            MessageTemplate messageTemplate = ObjektFactory.Find<MessageTemplate>("c250cad2a28d4cbeb062045c0150273a@MessageTemplate");

//            //消息
//            var message = new Message();
//            message.Template = messageTemplate;
//            message.Text = messageTemplate.GetPropertyCalculated(PropertyNames.text);
//            message.Title = messageTemplate.GetPropertyCalculated(PropertyNames.title);

//            //发送器（可多个）
//            List<MessageSender> messageSenders = new List<MessageSender>();
//            messageSenders.Add(ObjektFactory.Find<MessageSender>("f1872f2f2d704b1db3432b83203f94a6@MessageSender"));//内部
//            messageSenders.Add(ObjektFactory.Find<MessageSender>("ebabb829eb374a0aa0306b9436bb4369@MessageSender"));//邮件
//            messageSenders.Add(ObjektFactory.Find<MessageSender>("b19fda5c61ca49258302b3c3ff7eb3b5@MessageSender"));//短信

//            //接收方（可多个）
//            List<Platform.ObjectFramework.User> receiverss = new List<Platform.ObjectFramework.User>();
//            Platform.ObjectFramework.User receiver = SessionContext.Current.User;
//            receiver.Email = "10636628@qq.com";
//            receiver.Cell = "18162661711";
//            receiverss.Add(SessionContext.Current.User);

//            //发送邮件
//            foreach (MessageSender mSender in messageSenders)
//            {
//                mSender.Send(message, receiverss);

//            }
//        }
//    }
//}