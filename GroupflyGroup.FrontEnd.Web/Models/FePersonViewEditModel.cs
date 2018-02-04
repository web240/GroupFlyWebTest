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
    /// 个人用户
    /// </summary>
    public class FePersonEditViewModel : BaseViewModel
    {
        /// <summary>
        /// 个人ID
        /// </summary>
        [DisplayName("个人ID")]
        public string Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [DisplayName("用户名")]
        public string UserName { get; set; }

        /// <summary>
        /// 姓
        /// </summary>
        [DisplayName("姓")]
        public string LastName { get; set; }

        /// <summary>
        /// 名
        /// </summary>
        [DisplayName("名")]
        public string FirstName { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        [DisplayName("用户类型")]
        public string UserTypeLabel { get; set; }
        
        /// <summary>
        /// 用户头像
        /// </summary>
        [DisplayName("用户头像")]
        public string Avatar { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        [DisplayName("性别")]
        public string Sex { get; set; }

        /// <summary>
        /// 出生日期
        /// </summary>
        [DisplayName("出生日期")]
        public string Birthday { get; set; }

        /// <summary>
        /// 所在地区
        /// </summary>
        [DisplayName("所在地区")]
        public string Location { get; set; }

        /// <summary>
        /// 详细地址
        /// </summary>
        [DisplayName("详细地址")]
        public string Address { get; set; }

        /// <summary>
        /// 用户邮箱
        /// </summary>
        [DisplayName("用户邮箱")]
        public string PersonEmail { get; set; }

        /// <summary>
        /// 用户手机
        /// </summary>
        [DisplayName("用户手机")]
        public string PersonCell { get; set; }
    
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
        /// 注册渠道
        /// </summary>
        [DisplayName("注册渠道")]
        public string RegisterFrom { get; set; }

        /// <summary>
        /// 是否允许登录
        /// </summary>
        [DisplayName("是否允许登录")]
        public bool LogonEnabled { get; set; }

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
        /// 图片路径
        /// </summary>
        [DisplayName("图片路径")]
        public string ImageDirectoryId { get; set; }


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
        /// 位置数据
        /// </summary>
        [DisplayName("位置数据")]
        public string LocationData { get; set; }

        /// <summary>
        /// 根位置
        /// </summary>
        [DisplayName("根位置")]
        public string LocationRoot { get; set; }


        /// <summary>
        /// 固定电话
        /// </summary>
        public string Telephone { get; set; }
    }
}