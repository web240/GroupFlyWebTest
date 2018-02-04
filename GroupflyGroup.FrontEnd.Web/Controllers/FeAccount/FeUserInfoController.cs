using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Service.Models;
using GroupflyGroup.FrontEnd.Web.Controllers.Shared;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Filters;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeAccount
{
    /// <summary>
    /// 账户中心
    /// </summary>
    [LoginRequired(LoginUrl = "~/FrontEndLogin")]
    public class FeUserInfoController : BaseController
    {
        /// <summary>
        /// 会员中心
        /// </summary>
        /// <returns></returns>
        public PartialViewResult Index()
        {
            User user = SessionContext.Current.User;
            Organization organization = null;
            Person person = null;

            #region Location
            string strLocationData = "";
            var locationdata = ObjektFactory.Find<Platform.ObjectFramework.User>(user.Id);
            ObjektCollection<Location> locations = new ObjektCollection<Location>(Klass.ForId(KlassIDs.Location), new WhereClause("\"parent\" is not null "));
            foreach (Location obj in locations)
            {
                strLocationData = strLocationData + obj.Id + "_" + obj.Label + "_" + obj.Parent.Id + "_,";
            }
            string strLocationRoot = "";
            ObjektCollection<Location> locationRoot = new ObjektCollection<Location>(Klass.ForId(KlassIDs.Location), new WhereClause("\"parent\" is null "));
            if (locationRoot.Count > 0)
            {
                strLocationRoot = locationRoot[0].Id;
            }
            #endregion

            if (user != null && user.GetProperty("userType") != null) {
                Value userType = (Value)user.GetProperty("userType");
                if (userType.Id == FeValueIDs.FeUserType_Person)

                {
                    PersonMemberModel personMemberModel = Service.AccountService.GetPersonMemberInfo(user.Id);
                    return PartialView(new FePersonEditViewModel
                    {
                        Id = personMemberModel.UserId,
                        RegisterTime = personMemberModel.RegisterTime == null ? null : personMemberModel.RegisterTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                        LastLoginTime = personMemberModel.LastLoginTime == null ? null : personMemberModel.LastLoginTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                        UserName = personMemberModel.Name,
                        UserTypeLabel = personMemberModel.UserType.Label,
                        RegisterFrom = personMemberModel.CreateFrom.Label,
                        Avatar = personMemberModel.Avatar == null ? null : personMemberModel.Avatar.Id,
                        Email = personMemberModel.Email,
                        Cell = personMemberModel.Cell,
                        FirstName = personMemberModel.FirstName,
                        LastName = personMemberModel.LastName,
                        Birthday = personMemberModel.Birthday == null ? null : personMemberModel.Birthday.Value.ToString("yyyy/MM/dd"),
                        Location = personMemberModel.Location == null ? null : personMemberModel.Location.Id,
                        Address = personMemberModel.Address,
                        PersonEmail = personMemberModel.Email,
                        PersonCell = personMemberModel.PersonCell,
                        Sex = personMemberModel.Sex == null ? null : personMemberModel.Sex.Id,
                        ImageDirectoryId = "",
                        LocationRoot = strLocationRoot,
                        LocationData = strLocationData
                    });
                }
                else if (userType.Id == FeValueIDs.FeUserType_Organization)
                {
                    OrganizationMemberModel organizationMemberModel = Service.AccountService.GetOrganizationMemberInfo(user.Id);
                    return PartialView("OrganizationInfo", new FeOrganizationEditViewModel
                    {
                        Id = organizationMemberModel.UserId,
                        RegisterTime = organizationMemberModel.RegisterTime == null ? null : organizationMemberModel.RegisterTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                        LastLoginTime = organizationMemberModel.LastLoginTime == null ? null : organizationMemberModel.LastLoginTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                        UserName = organizationMemberModel.Name,
                        UserTypeLabel = organizationMemberModel.UserType.Label,
                        RegisterFrom = organizationMemberModel.CreateFrom.Label,
                        Avatar = organizationMemberModel.Avatar == null ? null : organizationMemberModel.Avatar.Id,
                        Email = organizationMemberModel.Email,
                        Cell = organizationMemberModel.Cell,

                        OrganizationName = organizationMemberModel.CompanyName,
                        OrganizationLocation = organizationMemberModel.CompanyLocation == null ? "" : organizationMemberModel.CompanyLocation.Id,
                        OrganizationAddress = organizationMemberModel.CompanyAddress,
                        OrganizationIndustry = organizationMemberModel.CompanyIndustry == null ? null : organizationMemberModel.CompanyIndustry.Id,
                        OrganizationNature = organizationMemberModel.CompanyNature == null ? null : organizationMemberModel.CompanyNature.Id,
                        OrganizationScale = organizationMemberModel.CompanyScale == null ? null : organizationMemberModel.CompanyScale.Id,
                        ContactFirstName = organizationMemberModel.ContactFirstName,
                        ContactLastName = organizationMemberModel.ContactLastName,
                        ContactEmail = organizationMemberModel.ContactEmail,
                        ContactCellphone = organizationMemberModel.ContactCellphone,
                        ContactTelephone = organizationMemberModel.ContactTelephone,

                        ImageDirectoryId = "",
                        LocationRoot = strLocationRoot,
                        LocationData = strLocationData
                    });
                }
                else {
                    throw new Exception("用户信息异常");
                }
            }
            else
            {
                throw new Exception("用户信息异常");
            }
        }

        /// <summary>
        /// 编辑个人会员
        /// </summary>
        /// <param name="model">个人会员</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult PersonEdit(FePersonEditViewModel model)
        {
            var result = new JsonActionResult();
                    result.Code = 0;

            if (!ModelState.IsValid)
            {
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                if (model.LastName == null)
                {
                    result.ErrorMessage = "请填写 名";
                }
                else
                {
                    //var result1 = UserValidate(model);
                    //if (result1.Code == 0) {
                    //    return Json(result1);
                    //}
                    try
                    {
                        PersonMemberModel personMemberModel = Service.AccountService.GetPersonMemberInfo(model.Id);

                        personMemberModel.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);                        
                        personMemberModel.Address = model.Address;
                        personMemberModel.Name = model.UserName;
                        personMemberModel.Telephone = model.Telephone;
                        personMemberModel.Birthday = model.Birthday == null ? DateTime.MinValue : DateTime.Parse(model.Birthday);
                        personMemberModel.PersonCell = model.PersonCell;
                        personMemberModel.PersonEmail = model.PersonEmail;
                        personMemberModel.FirstName = model.FirstName;
                        personMemberModel.LastName = model.LastName;
                        personMemberModel.Location = model.Location == null ? null : ObjektFactory.Find<Location>(model.Location);
                        personMemberModel.Sex = model.Sex == null ? null : ObjektFactory.Find<Value>(model.Sex);
                        Service.AccountService.PersonMemberEdit(personMemberModel);

                        

                        result.Code = 1;

                    }
                    catch (Exception ex)
                    {
                        result.ErrorMessage = ex.ToString();
                    }
                }

            }
            return Json(result);
        }

        /// <summary>
        /// 企业会员编辑
        /// </summary>
        /// <param name="model">企业会员</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult OrganizationEdit(FeOrganizationEditViewModel model)
        {
            var result = new JsonActionResult();
                result.Code = 0;

            if (!ModelState.IsValid)
            {
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                if (model.OrganizationName == null || model.OrganizationName == string.Empty)
                {
                    result.ErrorMessage = "请填写 企业名称";
                }
                else
                {
                    try
                    {

                        OrganizationMemberModel organizationMemberModel = Service.AccountService.GetOrganizationMemberInfo(model.Id);
                        organizationMemberModel.UserId = model.Id;
                        organizationMemberModel.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                        
                        organizationMemberModel.CompanyAddress = model.OrganizationAddress;
                        organizationMemberModel.CompanyIndustry = model.OrganizationIndustry == null ? null : ObjektFactory.Find<Value>(model.OrganizationIndustry);
                        organizationMemberModel.CompanyLabelName = model.OrganizationName;
                        organizationMemberModel.CompanyLocation = model.OrganizationLocation == null ? null : ObjektFactory.Find<Location>(model.OrganizationLocation);
                        organizationMemberModel.CompanyName = model.OrganizationName;
                        organizationMemberModel.CompanyNature = model.OrganizationNature == null ? null : ObjektFactory.Find<Value>(model.OrganizationNature);
                        organizationMemberModel.CompanyScale = model.OrganizationScale == null ? null : ObjektFactory.Find<Value>(model.OrganizationScale);
                        

                        organizationMemberModel.ContactFirstName = model.ContactFirstName;
                        organizationMemberModel.ContactLastName = model.ContactLastName;
                        organizationMemberModel.ContactEmail = model.ContactEmail;
                        organizationMemberModel.ContactCellphone = model.ContactCellphone;
                        organizationMemberModel.ContactTelephone = model.ContactTelephone;

                        Service.AccountService.OrganizationMemberEdit(organizationMemberModel);

                        result.Code = 1;
                    }
                    catch (Exception ex)
                    {
                        result.ErrorMessage = ex.ToString();
                    }

                }
            }
            return Json(result);
        }

        /// <summary>
        /// 用户验证
        /// </summary>
        /// <param name="user">当前用户</param>
        /// <returns></returns>
        public JsonActionResult UserValidate(dynamic user)
        {
            var result = new JsonActionResult();
            User user1 = new User();
            result.Code = 1;
            if (user.UserName != null && user.UserName != string.Empty)
            {
                Property proName = user1.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.name) as Property;
                if (proName.GetProperty(PropertyNames.pattern) != null) {
                    string proNamePattern = proName.GetProperty(PropertyNames.pattern).ToString();
                    if (System.Text.RegularExpressions.Regex.IsMatch(user.UserName, proNamePattern))
                    {
                        ObjektCollection<Platform.ObjectFramework.User> users = new ObjektCollection<Platform.ObjectFramework.User>(Klass.ForId(KlassIDs.User), new WhereClause(" \"name\" = '" + user.UserName + "' "));
                        if (users.Count > 0)
                        {
                            result.Code = 0;
                            result.ErrorMessage = "用户名已被使用;";
                        }
                    }
                    else {
                        result.Code = 0;
                        result.ErrorMessage = "用户名不合法;";
                    }
                }
            }
            else
            {
                result.Code = 0;
                result.ErrorMessage = "用户名必须填写;";
            }

            if (user.Cell != null && user.Cell != string.Empty)
            {
                Property proCell = user1.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.cell) as Property;
                if (proCell.GetProperty(PropertyNames.pattern) != null)
                {
                    string proCellPattern = proCell.GetProperty(PropertyNames.pattern).ToString();
                    if (System.Text.RegularExpressions.Regex.IsMatch(user.Cell, proCellPattern))
                    {
                        ObjektCollection<Platform.ObjectFramework.User> users = new ObjektCollection<Platform.ObjectFramework.User>(Klass.ForId(KlassIDs.User), new WhereClause(" \"cell\" = '" + user.Cell + "' "));
                        if (users.Count > 0)
                        {
                            result.Code = 0;
                            result.ErrorMessage = result.ErrorMessage + "绑定手机已被使用;";
                        }
                    }
                    else
                    {
                        result.Code = 0;
                        result.ErrorMessage = result.ErrorMessage + "绑定手机不合法;";
                    }
                }
            }
            if (user.Email != null && user.Email != string.Empty)
            {
                Property proEmail = user1.Klass.PropertyMetadata.ToList().Find(o => (o as Property).Name == PropertyNames.email) as Property;
                if (proEmail.GetProperty(PropertyNames.pattern) != null)
                {
                    string proEmailPattern = proEmail.GetProperty(PropertyNames.pattern).ToString();
                    if (System.Text.RegularExpressions.Regex.IsMatch(user.Email, proEmailPattern))
                    {
                        ObjektCollection<Platform.ObjectFramework.User> users = new ObjektCollection<Platform.ObjectFramework.User>(Klass.ForId(KlassIDs.User), new WhereClause(" \"email\" = '" + user.Email + "' "));
                        if (users.Count > 0)
                        {
                            result.Code = 0;
                            result.ErrorMessage = result.ErrorMessage + "绑定邮箱已被使用;";
                        }
                    }
                    else
                    {
                        result.Code = 0;
                        result.ErrorMessage = result.ErrorMessage + "绑定邮箱不合法;";
                    }
                }
            }
            return result;
        }

    }
}