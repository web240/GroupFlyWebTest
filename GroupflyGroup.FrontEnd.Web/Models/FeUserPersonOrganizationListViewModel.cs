using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
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
    /// 用户人员组织
    /// </summary>
    public class FeUserPersonOrganizationListViewModel : BaseViewModel
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        [DisplayName("用户ID")]
        public string Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [DisplayName("用户名")]
        public string UserName { get; set; }

        /// <summary>
        /// 用户类型ID
        /// </summary>
        [DisplayName("用户类型ID")]
        public string UserTypeId { get; set; }

        /// <summary>
        /// 用户类型名称
        /// </summary>
        [DisplayName("用户类型名称")]
        public string UserTypeLable { get; set; }

        /// <summary>
        /// 组织机构ID
        /// </summary>
        [DisplayName("组织机构ID")]
        public string OrganizationId { get; set; }

        /// <summary>
        /// 组织名称
        /// </summary>
        [DisplayName("组织名称")]
        public string OrganizationName { get; set; }

        /// <summary>
        /// 个人ID
        /// </summary>
        [DisplayName("个人ID")]
        public string PersonId { get; set; }

        /// <summary>
        /// 姓氏
        /// </summary>
        [DisplayName("姓氏")]
        public string LastName { get; set; }

        /// <summary>
        /// 名字
        /// </summary>
        [DisplayName("名字")]
        public string FirstName { get; set; }

        /// <summary>
        /// 绑定邮箱
        /// </summary>
        [DisplayName("绑定邮箱")]
        public string UserEmail { get; set; }

        /// <summary>
        /// 绑定手机
        /// </summary>
        [DisplayName("绑定手机")]
        public string UserCell { get; set; }

        /// <summary>
        /// 注册时间
        /// </summary>
        [DisplayName("注册时间")]
        public string RegisterTime { get; set; }

        /// <summary>
        /// 注册渠道
        /// </summary>
        [DisplayName("注册渠道")]
        public string RegisterFrom { get; set; }

        /// <summary>
        /// 最后登录时间
        /// </summary>
        [DisplayName("最后登录时间")]
        public string LastLoginTime { get; set; }

        /// <summary>
        /// 用户状态
        /// </summary>
        [DisplayName("用户状态")]
        public bool LogonEnabled { get; set; }


        /// <summary>
        /// 复制
        /// </summary>
        /// <param name="entity"></param>
        public void CopyEntity(User entity)
        {
            Id = entity.Id;
            UserName = entity.Name;
            if (entity.GetProperty("userType") != null)
            {
                Value UserType = (Value)entity.GetProperty("userType");
                UserTypeId = UserType.Id;
                UserTypeLable = UserType.Label;
                if (UserType.Id == FeValueIDs.FeUserType_Person)
                {
                    if (entity.GetProperty("person") != null)
                    {
                        Person person = (Person)entity.GetProperty("person");
                        PersonId = person.Id;
                        FirstName = person.FirstName;
                        LastName = person.LastName;
                    }
                }
                else if (UserType.Id == FeValueIDs.FeUserType_Organization)
                {
                    if (entity.GetProperty("organization") != null)
                    {
                        Organization organization = (Organization)entity.GetProperty("organization");
                        OrganizationId = organization.Id;
                        OrganizationName = organization.Name;
                    }

                }
            }
            UserEmail = entity.Email;
            UserCell = entity.Cell;
            RegisterTime = entity.CreatedOn.ToString();
            if (entity.GetProperty("createFrom") != null)
            {
                RegisterFrom = ((Value)entity.GetProperty("createFrom")).Label;
            }
            LastLoginTime = entity.LastLogInOn.ToString();
            LogonEnabled = entity.LogonEnabled;
        }
    }
}