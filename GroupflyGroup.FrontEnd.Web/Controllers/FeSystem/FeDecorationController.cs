using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System.Collections.Generic;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeSystem
{
    /// <summary>
    /// </summary>
    public class FeDecorationController : Controller
    {
        /// <summary>
        ///     获得Prims数据列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetPrimsList()
        {
            List<dynamic> model = new List<dynamic>();

            model.Add(new
            {
                Title = "多",
                Text = "品类齐全 轻松购物"
            });

            model.Add(new
            {
                Title = "快",
                Text = "多仓直发 极速配送"
            });

            model.Add(new
            {
                Title = "好",
                Text = "正品行货 精致服务"
            });

            model.Add(new
            {
                Title = "省",
                Text = "天天低价 畅选无忧"
            });

            return Json(model);
        }


        /// <summary>
        ///     获得HelpBox数据列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetHelpBoxList()
        {
            List<dynamic> model = new List<dynamic>();

            #region 特色服务
            List<dynamic> model_1 = new List<dynamic>();
            model_1.Add(new
            {
                href = "#",
                text = "礼物赠送"
            });
            model_1.Add(new
            {
                href = "#",
                text = "上门服务"
            });
            model_1.Add(new
            {
                href = "#",
                text = "延保服务"
            });
            model_1.Add(new
            {
                href = "#",
                text = "价格保护"
            });
            model_1.Add(new
            {
                href = "#",
                text = "商品拍卖"
            });
            model.Add(new
            {
                Title = "特色服务",
                Items = model_1
            });
            #endregion


            #region 售后服务
            List<dynamic> model_2 = new List<dynamic>();
            model_2.Add(new
            {
                href = "#",
                text = "延迟发货"
            });
            model_2.Add(new
            {
                href = "#",
                text = "上门维修"
            });
            model_2.Add(new
            {
                href = "#",
                text = "退货说明"
            });
            model_2.Add(new
            {
                href = "#",
                text = "保修换货"
            });
            model_2.Add(new
            {
                href = "#",
                text = "联系客服"
            });
            model.Add(new
            {
                Title = "售后服务",
                Items = model_2
            });
            #endregion


            #region 支付方式
            List<dynamic> model_3 = new List<dynamic>();
            model_3.Add(new
            {
                href = "#",
                text = "网银支付"
            });
            model_3.Add(new
            {
                href = "#",
                text = "银行转账"
            });
            model_3.Add(new
            {
                href = "#",
                text = "公司转账"
            });
            model_3.Add(new
            {
                href = "#",
                text = "邮局汇款"
            });
            model_3.Add(new
            {
                href = "#",
                text = "货到付款"
            });
            model.Add(new
            {
                Title = "支付方式",
                Items = model_3
            });
            #endregion

            #region 配送方式
            List<dynamic> model_4 = new List<dynamic>();
            model_4.Add(new
            {
                href = "#",
                text = "申通快递"
            });
            model_4.Add(new
            {
                href = "#",
                text = "中铁快运"
            });
            model_4.Add(new
            {
                href = "#",
                text = "特快专递(EMS)"
            });
            model_4.Add(new
            {
                href = "#",
                text = "邮局普包"
            });
            model_4.Add(new
            {
                href = "#",
                text = "快递运输"
            });
            model.Add(new
            {
                Title = "配送方式",
                Items = model_4
            });
            #endregion

            #region 购物指南
            List<dynamic> model_5 = new List<dynamic>();
            model_5.Add(new
            {
                href = "#",
                text = "系统指引"
            });
            model_5.Add(new
            {
                href = "#",
                text = "积分方案"
            });
            model_5.Add(new
            {
                href = "#",
                text = "联系客服"
            });
            model_5.Add(new
            {
                href = "#",
                text = "交易条款"
            });
            model_5.Add(new
            {
                href = "#",
                text = "购物流程"
            });
            model.Add(new
            {
                Title = "购物指南",
                Items = model_5
            });
            #endregion


            #region 关于我们
            List<dynamic> model_6 = new List<dynamic>();
            model_6.Add(new
            {
                href = "#",
                text = "礼物赠送"
            });
            model_6.Add(new
            {
                href = "#",
                text = "上门服务"
            });
            model_6.Add(new
            {
                href = "#",
                text = "延保服务"
            });
            model_6.Add(new
            {
                href = "#",
                text = "价格保护"
            });
            model_6.Add(new
            {
                href = "#",
                text = "商品拍卖"
            });
            model.Add(new
            {
                Title = "关于我们",
                Items = model_6
            });
            #endregion

            return Json(model);
        }


        /// <summary>
        ///     获得二维码数据列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetQRCodeList()
        {
            List<dynamic> model = new List<dynamic>();

           var config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.AppQRcode);
            model.Add(new
            {
                Title = "下载手机APP",
                Url = "www.baidu.com",
                Image = config.Value
            });

            config =
                ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.WeChatQRcode);
            model.Add(new
            {
                Title = "关注微信公众号",
                Url = "",
                Image = config.Value
            });

            return Json(model);
        }


        /// <summary>
        ///     获得页尾数据列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetFootDownList()
        {
            List<dynamic> model = new List<dynamic>();

            #region 本地连接
            List<dynamic> locallink = new List<dynamic>();
            locallink.Add(new
            {
                href = "#",
                text = "关于我们"
            });
            locallink.Add(new
            {
                href = "#",
                text = "联系我们"
            });
            locallink.Add(new
            {
                href = "#",
                text = "商家入驻"
            });
            locallink.Add(new
            {
                href = "#",
                text = "人才招聘"
            });
            locallink.Add(new
            {
                href = "#",
                text = "圈子活动"
            });
            locallink.Add(new
            {
                href = "#",
                text = "商品公告"
            });
            locallink.Add(new
            {
                href = "#",
                text = "商城招商"
            });
            #endregion

            #region 友情链接
            List<dynamic> friendlink = new List<dynamic>();
            friendlink.Add(new
            {
                href = "#",
                text = "百度度娘"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "官方网站"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "城市多用户系统"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "网商社区"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "网店代销"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "网店货源"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "代理分销系统"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "网络分销系统"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "渠道分销系统"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "CRM系统"
            });
            friendlink.Add(new
            {
                href = "#",
                text = "ERP系统"
            });
            #endregion

            #region 备案及版权信息
            List<dynamic> copyright = new List<dynamic>();
            copyright.Add(new
            {
                image = "e9b324b4eac04f8494be19768b3d0ab4@File",
                text = "诚信网站示范企业"
            });
            copyright.Add(new
            {
                image = "2a6c16022aa14f0e9eb26c703f953867@File",
                text = "可信网站信誉评价"
            });
            copyright.Add(new
            {
                image = "ed336dc69b8148c4b431eaf167e61c2a@File",
                text = "经营网站备案信息"
            });

            #endregion

            model.Add(new
            {
                LocalLink = locallink,
                FriendLink = friendlink,
                Tel = "4006-918-851",
                WorkTime = "08:00--23:00",
                Email = "groupfly2009@hotmail.com",
                Copyright = copyright,
            });

            return Json(model);
        }
    }
}