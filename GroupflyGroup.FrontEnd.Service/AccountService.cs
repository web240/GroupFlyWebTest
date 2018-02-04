using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Service.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GroupflyGroup.FrontEnd.Service
{
    /// <summary>
    /// 用户操作
    /// </summary>
    public class AccountService
    {

        /// <summary>
        /// 会员删除
        /// </summary>
        /// <param name="userId">会员ID</param>
        public static void MemberDelete(string userId)
        {
            var feUser = ObjektFactory.Find<User>(userId);

            if (feUser.GetProperty("userType") != null)
            {
                Value MemberType = (Value)feUser.GetProperty("userType");
                if (MemberType.Id == FeValueIDs.FeUserType_Organization)
                {
                    var organization = (Organization)feUser.GetProperty("organization");
                    ObjektCollection<OrganizationPerson> contactPerson = new ObjektCollection<OrganizationPerson>(Klass.ForId(KlassIDs.OrganizationPerson), new WhereClause("\"source\" = '" + organization.Id + "' and \"contactPerson\"=1"));

                    if (contactPerson.Count > 0)
                    {
                        OrganizationPerson organizationPerson = contactPerson[0];

                        Person person = organizationPerson.Related as Person;

                        if (person != null)
                        {
                            person.Delete();
                            person.Save();
                        }

                        if (organization != null)
                        {
                            organization.Delete();
                            organization.Save();
                        }

                        if (organizationPerson != null)
                        {
                            organizationPerson.Delete();
                            organizationPerson.Save();
                        }
                    }
                }
                else if (MemberType.Id == FeValueIDs.FeUserType_Person)
                {
                    var person = (Person)feUser.GetProperty("person");
                    if (person != null)
                    {
                        person.Delete();
                        person.Save();
                    }
                }
            }

            feUser.Delete();
            feUser.Save();
        }



        /// <summary>
        /// 获得企业会员信息
        /// </summary>
        /// <param name="userId">会员ID</param>
        /// <returns></returns>
        public static OrganizationMemberModel GetOrganizationMemberInfo(string userId)
        {
            OrganizationMemberModel organizationMemberModel = new OrganizationMemberModel();
            var feUser = ObjektFactory.Find<User>(userId);

            organizationMemberModel.UserId = feUser.Id;
            organizationMemberModel.Avatar = feUser.Avatar;
            organizationMemberModel.Name = feUser.Name;
            organizationMemberModel.Cell = feUser.Cell;
            organizationMemberModel.Email = feUser.Email;
            organizationMemberModel.CreateFrom = (Value)feUser.GetProperty("createFrom");
            organizationMemberModel.Password = feUser.Password;
            organizationMemberModel.RegisterTime = feUser.CreatedOn;
            organizationMemberModel.LastLoginTime = feUser.LastLogInOn;

            var organization = (Organization)feUser.GetProperty("organization");
            organizationMemberModel.CompanyAddress = organization.Address;
            organizationMemberModel.CompanyIndustry = organization.Industry;
            organizationMemberModel.CompanyName = organization.Label;
            organizationMemberModel.CompanyLocation = organization.Location;
            organizationMemberModel.CompanyName = organization.Name;
            organizationMemberModel.CompanyNature = organization.Nature;
            organizationMemberModel.CompanyParent = organization.Parent;
            organizationMemberModel.CompanyScale = organization.Scale;

            ObjektCollection<OrganizationPerson> contactPerson = new ObjektCollection<OrganizationPerson>(Klass.ForId(KlassIDs.OrganizationPerson), new WhereClause("\"source\" = '" + organization.Id + "' and \"contactPerson\"=1"));

            var person = contactPerson[0].Related as Person;

            organizationMemberModel.ContactFirstName = person.FirstName;
            organizationMemberModel.ContactLastName = person.LastName;
            organizationMemberModel.ContactEmail = person.Email;
            organizationMemberModel.ContactCellphone = person.Cellphone;
            organizationMemberModel.ContactTelephone = person.Telephone;

            return organizationMemberModel;
        }
        /// <summary>
        /// 企业会员注册
        /// </summary>
        /// <param name="organizationMemberModel">企业会员模型</param>
        public static void OrganizationMemberRegister(OrganizationMemberModel organizationMemberModel)
        {
            var person = new Person();
            person.FirstName = organizationMemberModel.ContactFirstName;
            person.LastName = organizationMemberModel.ContactLastName;
            person.Email = organizationMemberModel.ContactEmail;
            person.Cellphone = organizationMemberModel.ContactCellphone;
            person.Telephone = organizationMemberModel.ContactTelephone;
            person.Save();

            var organization = new Organization();
            organization.Address = organizationMemberModel.CompanyAddress;
            organization.Industry = organizationMemberModel.CompanyIndustry;
            organization.Label = organizationMemberModel.CompanyName;
            organization.Location = organizationMemberModel.CompanyLocation;
            organization.Name = organizationMemberModel.CompanyName;
            organization.Nature = organizationMemberModel.CompanyNature;
            organization.Parent = organizationMemberModel.CompanyParent == null ? ObjektFactory.Find<Organization>(OrganizationIDs.root) : organizationMemberModel.CompanyParent;
            organization.Scale = organizationMemberModel.CompanyScale;
            organization.Save();

            var organizationPerson = new OrganizationPerson();
            organizationPerson.Source = organization;
            organizationPerson.Related = person;
            organizationPerson.ContactPerson = true;
            organizationPerson.Save();

            var user = new User();
            user.Avatar = organizationMemberModel.Avatar;
            user.Name = organizationMemberModel.Name;
            user.Cell = organizationMemberModel.Cell;
            user.Email = organizationMemberModel.Email;
            user.SetProperty("userType", organizationMemberModel.UserType);
            user.SetProperty("createFrom", organizationMemberModel.CreateFrom);
            user.SetProperty("organization", organization);
            user.Password = organizationMemberModel.Password;
            user.Save();
        }

        /// <summary>
        /// 企业会员编辑
        /// </summary>
        /// <param name="organizationMemberModel">企业会员模型</param>
        public static void OrganizationMemberEdit(OrganizationMemberModel organizationMemberModel)
        {
            var user = ObjektFactory.Find<User>(organizationMemberModel.UserId);

            var organization = (Organization)user.GetProperty("organization");
            organization.Address = organizationMemberModel.CompanyAddress;
            organization.Industry = organizationMemberModel.CompanyIndustry;
            organization.Label = organizationMemberModel.CompanyName;
            organization.Location = organizationMemberModel.CompanyLocation;
            organization.Name = organizationMemberModel.CompanyName;
            organization.Nature = organizationMemberModel.CompanyNature;
            organization.Scale = organizationMemberModel.CompanyScale;
            organization.Save();

            //ROC<RelationshipObjekt> organizationPersonList = organization.ROCC.GetROC(FeRelationshipNames.OrganizationPerson);            
            ObjektCollection<OrganizationPerson> contactPerson = new ObjektCollection<OrganizationPerson>(Klass.ForId(KlassIDs.OrganizationPerson), new WhereClause("\"source\" = '" + organization.Id + "' and \"contactPerson\"=1"));

            if (contactPerson.Count > 0)
            {
                var person = contactPerson[0].Related as Person;
                person.FirstName = organizationMemberModel.ContactFirstName;
                person.LastName = organizationMemberModel.ContactLastName;
                person.Email = organizationMemberModel.ContactEmail;
                person.Cellphone = organizationMemberModel.ContactCellphone;
                person.Telephone = organizationMemberModel.ContactTelephone;
                person.Save();
            }

            user.Avatar = organizationMemberModel.Avatar;
            user.Cell = organizationMemberModel.Cell;
            user.Email = organizationMemberModel.Email;
            if (!string.IsNullOrEmpty(organizationMemberModel.Password))
            {
                user.Password = organizationMemberModel.Password;
            }
            user.Save();

        }




        /// <summary>
        /// 获得个人会员信息
        /// </summary>
        ///<param name="userId">会员ID</param>
        public static PersonMemberModel GetPersonMemberInfo(string userId)
        {
            PersonMemberModel personMemberModel = new PersonMemberModel();

            var user = ObjektFactory.Find<User>(userId);

            var person = (Person)user.GetProperty("person");


            personMemberModel.Address = person.Address;
            personMemberModel.Birthday = person.Birthday;
            personMemberModel.PersonCell = person.Cellphone;
            personMemberModel.PersonEmail = person.Email;
            personMemberModel.FirstName = person.FirstName;
            personMemberModel.LastName = person.LastName;
            personMemberModel.Location = person.Location;
            personMemberModel.Sex = person.Sex;
            personMemberModel.Telephone = person.Telephone;

            personMemberModel.UserId = user.Id;
            personMemberModel.Avatar = user.Avatar;
            personMemberModel.Name = user.Name;
            personMemberModel.Cell = user.Cell;
            personMemberModel.Email = user.Email;
            personMemberModel.CreateFrom = (Value)user.GetProperty("createFrom");
            personMemberModel.Password = user.Password;
            personMemberModel.RegisterTime = user.CreatedOn;
            personMemberModel.LastLoginTime = user.LastLogInOn;
            return personMemberModel;
        }


        /// <summary>
        /// 个人会员注册
        /// </summary>
        ///<param name="personMemberModel">个人会员模型</param>
        public static void PersonMemberRegister(PersonMemberModel personMemberModel)
        {
            var person = new Person();
            person.Address = personMemberModel.Address;
            person.Birthday = personMemberModel.Birthday;
            person.Cellphone = personMemberModel.PersonCell;
            person.Email = personMemberModel.PersonEmail;
            person.FirstName = personMemberModel.FirstName;
            person.LastName = personMemberModel.LastName;
            person.Location = personMemberModel.Location;
            person.Sex = personMemberModel.Sex;
            person.Telephone = personMemberModel.Telephone;
            person.Save();

            var user = new User();
            user.Avatar = personMemberModel.Avatar;
            user.Name = personMemberModel.Name;
            user.Cell = personMemberModel.Cell;
            user.Email = personMemberModel.Email;
            user.Password = personMemberModel.Password;
            user.SetProperty("userType", personMemberModel.UserType);
            user.SetProperty("createFrom", personMemberModel.CreateFrom);
            user.SetProperty("person", person);
            user.Save();
        }

        /// <summary>
        /// 个人会员编辑
        /// </summary>
        /// <param name="personMemberModel">个人会员模型</param>
        public static void PersonMemberEdit(PersonMemberModel personMemberModel)
        {
            var user = ObjektFactory.Find<User>(personMemberModel.UserId);

            var person = (Person)user.GetProperty("person");
            person.Address = personMemberModel.Address;
            person.Birthday = personMemberModel.Birthday;
            person.Cellphone = personMemberModel.PersonCell;
            person.Email = personMemberModel.PersonEmail;
            person.FirstName = personMemberModel.FirstName;
            person.LastName = personMemberModel.LastName;
            person.Location = personMemberModel.Location;
            person.Sex = personMemberModel.Sex;
            person.Telephone = personMemberModel.Telephone;
            person.Save();

            user.Avatar = personMemberModel.Avatar;
            user.Cell = personMemberModel.Cell;
            user.Email = personMemberModel.Email;
            if (!string.IsNullOrEmpty(personMemberModel.Password))
            {
                user.Password = personMemberModel.Password;
            }
            user.Save();
        }


        /// <summary>
        /// 检测用户名是否已存在
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <param name="userId">用户ID,传此值表示查询除了ID以外的所有用户</param>
        /// <returns>true:用户名存在,false:用户名不存在</returns>
        public static bool CheckUserNameIsExist(string userName, string userId = null)
        {
            var sWhereText = new StringBuilder("1=1");
            sWhereText.Append(" and \"name\" = '" + userName + "' ");
            if (!string.IsNullOrEmpty(userId))
            {
                sWhereText.Append(" and \"id\" <> '" + userId + "' ");
            }

            var userNameList = new ObjektCollection<User>(Klass.ForId(KlassIDs.User), new WhereClause(sWhereText.ToString()));
            if (userNameList.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 检测用户名格式是否正确
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <returns>true:正确,false:错误</returns>
        public static bool CheckUserNameIsMateFormat(string userName)
        {
            User user = new User();
            Property proUserName = user.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.name) as Property;

            if (proUserName.GetProperty(PropertyNames.pattern) != null)
            {
                string userNamePattern = proUserName.GetProperty(PropertyNames.pattern).ToString();

                if (!Regex.IsMatch(userName, userNamePattern))
                {
                    return false;
                }
            }
            return true;
        }


        /// <summary>
        /// 检测用户登录密码格式是否正确
        /// </summary>
        /// <param name="passWord">登录密码</param>
        /// <returns>true:正确,false:错误</returns>
        public static bool CheckUserLoginPasswordIsMateFormat(string passWord)
        {
            User user = new User();
            Property proPassword = user.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.password) as Property;

            if (proPassword.GetProperty(PropertyNames.pattern) != null)
            {
                string proPasswordPattern = proPassword.GetProperty(PropertyNames.pattern).ToString();

                if (!Regex.IsMatch(passWord, proPasswordPattern))
                {
                    return false;
                }
            }
            return true;
        }


        /// <summary>
        /// 检测用户手机号是否已存在
        /// </summary>
        /// <param name="cell">手机号</param>
        /// <param name="userId">用户ID,传此值表示查询除了ID以外的所有用户</param>
        /// <returns>true:存在,false:不存在</returns>
        public static bool CheckUserCellIsExist(string cell, string userId = null)
        {
            var sWhereText = new StringBuilder("1=1");
            sWhereText.Append(" and \"cell\" = '" + cell + "' ");
            if (!string.IsNullOrEmpty(userId))
            {
                sWhereText.Append(" and \"id\" <> '" + userId + "' ");
            }
            var cellList = new ObjektCollection<User>(Klass.ForId(KlassIDs.User), new WhereClause(sWhereText.ToString()));
            if (cellList.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        /// <summary>
        /// 检测用户手机号格式是否正确
        /// </summary>
        /// <param name="cell">手机号</param>
        /// <returns>true:正确,false:错误</returns>
        public static bool CheckUserCellIsMateFormat(string cell)
        {
            User user = new User();
            Property proCell = user.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.cell) as Property;
            if (proCell.GetProperty(PropertyNames.pattern) != null)
            {
                string proCellPattern = proCell.GetProperty(PropertyNames.pattern).ToString();

                if (!Regex.IsMatch(cell, proCellPattern))
                {
                    return false;
                }
            }
            return true;
        }

        /// <summary>
        /// 检测用户邮箱格式是否正确
        /// </summary>
        /// <param name="email">邮箱</param>
        /// <returns>true:正确,false:错误</returns>
        public static bool CheckUserEmailIsMateFormat(string email)
        {
            User user = new User();
            Property proEmail = user.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.email) as Property;
            if (proEmail.GetProperty(PropertyNames.pattern) != null)
            {
                string proEmailPattern = proEmail.GetProperty(PropertyNames.pattern).ToString();
                if (!Regex.IsMatch(email, proEmailPattern))
                {
                    return false;
                }
            }
            return true;
        }


        /// <summary>
        /// 检测用户邮箱是否已存在
        /// </summary>
        /// <param name="email">手机号</param>
        /// <param name="userId">用户ID,传此值表示查询除了ID以外的所有用户</param>
        /// <returns>true:存在,false:不存在</returns>
        public static bool CheckUserEmailIsExist(string email, string userId = null)
        {
            var sWhereText = new StringBuilder("1=1");
            sWhereText.Append(" and \"email\" = '" + email + "' ");
            if (!string.IsNullOrEmpty(userId))
            {
                sWhereText.Append(" and \"id\" <> '" + userId + "' ");
            }
            ObjektCollection<User> emailList = new ObjektCollection<User>(Klass.ForId(KlassIDs.User), new WhereClause("\"email\" = '" + email + "' and \"id\" <> '" + userId + "'"));
            if (emailList.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 得到用户属性的描述信息
        /// </summary>
        /// <param name="propertyName">属性Name</param>
        /// <returns>描述信息</returns>
        public static string GetUserDescription(string propertyName)
        {
            User user = new User();
            Property property = user.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == propertyName) as Property;
            if (property != null)
            {
                if (property.GetProperty(PropertyNames.description) != null)
                {
                    return property.GetProperty(PropertyNames.description).ToString();

                }
            }

            return string.Empty;
        }

    }
}
