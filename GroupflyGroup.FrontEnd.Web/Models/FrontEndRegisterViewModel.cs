using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FrontEndRegisterViewModel : BaseViewModel
    {
        /// <summary>
        ///     模板根目录的路径
        /// </summary>
        public string TemplateDirectoryPath { get; set; }

        /// <summary>
        /// 前台LogoID
        /// </summary>
        public string LogoId { get; set; }



        /// <summary>
        /// 会员名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 会员绑定手机
        /// </summary>
        public string Cell { get; set; }
        /// <summary>
        /// 会员绑定邮箱
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// 会员密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// 会员确认密码
        /// </summary>
        public string PasswordConfirm { get; set; }

        /// <summary>
        /// 联系人名
        /// </summary>
        public string ContactFirstName { get; set; }

        /// <summary>
        /// 联系人邮箱
        /// </summary>
        public string ContactEmail { get; set; }


        /// <summary>
        /// 联系人固定电话
        /// </summary>
        public string ContactTelephone { get; set; }


        /// <summary>
        /// 公司详细地址
        /// </summary>
        public string OrganizationAddress { get; set; }


        /// <summary>
        /// 公司行业
        /// </summary>
        public string OrganizationIndustry { get; set; }
        /// <summary>
        /// 公司名字
        /// </summary>
        public string OrganizationName { get; set; }
        /// <summary>
        /// 公司地理位置
        /// </summary>
        public string OrganizationLocation { get; set; }
        /// <summary>
        /// 公司性质
        /// </summary>
        public string OrganizationNature { get; set; }
        /// <summary>
        /// 公司人员规模
        /// </summary>
        public string OrganizationScale { get; set; }
     
    }
}