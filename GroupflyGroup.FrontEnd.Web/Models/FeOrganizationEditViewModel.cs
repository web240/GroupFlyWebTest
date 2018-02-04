using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    /// 组织信息
    /// </summary>
    public class FeOrganizationEditViewModel : BaseViewModel
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        [DisplayName("用户Id")]
        public string Id { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        [DisplayName("用户类型")]
        public string UserTypeLabel { get; set; }

        /// <summary>
        /// 注册来源
        /// </summary>
        [DisplayName("注册来源")]
        public string RegisterFrom { get; set; }
        
        /// <summary>
        /// 用户名
        /// </summary>
        [DisplayName("用户名")]
        public string UserName { get; set; }


        /// <summary>
        /// 用户头像
        /// </summary>
        [DisplayName("用户头像")]
        public string Avatar { get; set; }

        #region person
        /// <summary>
        /// 联系人名
        /// </summary>
        [DisplayName("联系人名")]
        public string ContactFirstName { get; set; }
        /// <summary>
        /// 联系人姓
        /// </summary>
        [DisplayName("联系人姓")]
        public string ContactLastName { get; set; }
        /// <summary>
        /// 联系人邮箱
        /// </summary>
        [DisplayName("联系人邮箱")]
        public string ContactEmail { get; set; }
        /// <summary>
        /// 联系人手机
        /// </summary>
        [DisplayName("联系人手机")]
        public string ContactCellphone { get; set; }

        /// <summary>
        /// 联系人固定电话
        /// </summary>
        [DisplayName("联系人固定电话")]
        public string ContactTelephone { get; set; }
        
        #endregion

        #region Organization
        /// <summary>
        /// 组织名称
        /// </summary>
        [DisplayName("组织名称")]
        public string OrganizationName { get; set; }
        /// <summary>
        /// 组织所在地
        /// </summary>
        [DisplayName("组织所在地")]
        public string OrganizationLocation { get; set; }
        /// <summary>
        /// 组织地址
        /// </summary>
        [DisplayName("组织地址")]
        public string OrganizationAddress { get; set; }
        /// <summary>
        /// 组织人数
        /// </summary>
        [DisplayName("组织人数")]
        public string OrganizationScale { get; set; }
        /// <summary>
        /// 组织行业
        /// </summary>
        [DisplayName("组织行业")]
        public string OrganizationIndustry { get; set; }
        /// <summary>
        /// 组织性质
        /// </summary>
        [DisplayName("组织性质")]
        public string OrganizationNature { get; set; }
        
        #endregion

        /// <summary>
        /// 绑定邮箱
        /// </summary>
        [DisplayName("绑定邮箱")]
        public string Email { get; set; }

        /// <summary>
        /// 绑定手机
        /// </summary>
        [DisplayName("绑定手机")]
        public string Cell { get; set; }
        
        /// <summary>
        /// 登录密码
        /// </summary>
        [DisplayName("登录密码")]
        public string Password { get; set; }

        /// <summary>
        /// 登录密码确认
        /// </summary>
        [DisplayName("登录密码确认")]
        public string PasswordConfirm { get; set; }

        /// <summary>
        /// 注册时间
        /// </summary>
        [DisplayName("注册时间")]
        public string RegisterTime { get; set; }

        /// <summary>
        /// 最后登录时间
        /// </summary>
        [DisplayName("最后登录时间")]
        public string LastLoginTime { get; set; }

        /// <summary>
        /// 头像路径
        /// </summary>
        [DisplayName("头像路径")]
        public string ImageDirectoryId { get; set; }

        /// <summary>
        /// 位置数据
        /// </summary>
        [DisplayName("位置数据")]
        public string LocationData { get; set; }

        /// <summary>
        /// 根位置
        /// </summary>
        [DisplayName("根位置")]
        public string LocationRoot { get; set; }


    }

}