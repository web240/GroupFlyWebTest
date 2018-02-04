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
    /// 企业会员模型
    /// </summary>
    public class OrganizationMemberModel
    {
        /// <summary>
        /// 企业会员用户ID
        /// </summary>
        public string UserId { get; set; }
        /// <summary>
        /// 会员个联系人手机
        /// </summary>
        public string ContactCellphone { get; set; }

        /// <summary>
        /// 会员联系人邮箱
        /// </summary>
        public string ContactEmail { get; set; }

        /// <summary>
        /// 联系人名
        /// </summary>
        public string ContactFirstName { get; set; }

        /// <summary>
        /// 联系人姓
        /// </summary>
        public string ContactLastName { get; set; }

        /// <summary>
        /// 会员固定电话
        /// </summary>
        public string ContactTelephone { get; set; }


        /// <summary>
        /// 公司详细地址
        /// </summary>
        public string CompanyAddress { get; set; }

        /// <summary>
        /// 公司行业
        /// </summary>
        public Value CompanyIndustry { get; set; }

        /// <summary>
        /// 公司标签名称
        /// </summary>
        public string CompanyLabelName { get; set; }


        /// <summary>
        /// 公司地理位置
        /// </summary>
        public Location CompanyLocation { get; set; }


        /// <summary>
        /// 公司名称
        /// </summary>
        public string CompanyName { get; set; }


        /// <summary>
        /// 公司性质
        /// </summary>
        public Value CompanyNature { get; set; }

        /// <summary>
        /// 公司人员规模
        /// </summary>
        public Value CompanyScale { get; set; }

        /// <summary>
        /// 公司父组织
        /// </summary>
        public Organization CompanyParent { get; set; }


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
        /// 用户类型(企业用户)
        /// </summary>
        public Value UserType { get { return ObjektFactory.Find<Value>(FeValueIDs.FeUserType_Organization);} }
    }
}
