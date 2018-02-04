using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupflyGroup.FrontEnd.Service.Models
{
    /// <summary>
    /// 个人会员模型
    /// </summary>
    public class PersonMemberModel
    {

        /// <summary>
        /// 个人会员用户ID
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 会员注册详细地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 会员生日
        /// </summary>
        public DateTime? Birthday { get; set; }

        /// <summary>
        /// 会员个人资料手机
        /// </summary>
        public string PersonCell { get; set; }

        /// <summary>
        /// 会员个人资料邮箱
        /// </summary>
        public string PersonEmail { get; set; }

        /// <summary>
        /// 会员名字
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// 会员姓氏
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// 会员地理位置
        /// </summary>
        public Location Location { get; set; }
        /// <summary>
        /// 会员性别
        /// </summary>
        public Value Sex { get; set; }

        /// <summary>
        /// 会员固定电话
        /// </summary>
        public string Telephone { get; set; }

        /// <summary>
        /// 会员头像
        /// </summary>
        public File Avatar { get; set; }

        /// <summary>
        /// 会员名
        /// </summary>
        public string Name { get; set; }
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
        /// 会员注册来源
        /// </summary>
        public Value CreateFrom { get; set; }

        /// <summary>
        /// 会员注册时间
        /// </summary>
        public DateTime? RegisterTime { get; set; }


        /// <summary>
        /// 会员最后登录时间
        /// </summary>
        public DateTime? LastLoginTime { get; set; }


        /// <summary>
        /// 用户类型(个人用户)
        /// </summary>
        public Value UserType  { get{ return ObjektFactory.Find<Value>(FeValueIDs.FeUserType_Person); } }

    }
}
