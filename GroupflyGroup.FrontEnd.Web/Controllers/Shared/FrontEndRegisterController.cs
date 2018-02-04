using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using GroupflyGroup.FrontEnd.Service;
using GroupflyGroup.FrontEnd.Service.Models;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    public class FrontEndRegisterController : BaseController
    {
        /// <summary>
        /// 注册页面
        /// </summary>
        /// <returns></returns>
        // GET: FrontEndRegister
        public ActionResult Index()
        {
            FrontEndRegisterViewModel RegisterViewModel = new FrontEndRegisterViewModel();
            //注册模版路径
            var templatePath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Register, "~/Register.cshtml");
            //模版所在路径
            RegisterViewModel.TemplateDirectoryPath = this.TemplateResourcePathByType(FeValueIDs.FeTemplateType_Register, "~/");

            //首页LOGO
            var config = ObjektFactory.Find<SystemConfiguration>(FeSystemConfigurationIDs.FrontEndHomeLogo);
            RegisterViewModel.LogoId = config.Value;

            return View(templatePath, RegisterViewModel);
        }

        /// <summary>
        /// 验证账户名能否注册
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public JsonResult CheckUserName(string userName)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IsRegister", "false");
            dic.Add("Message", "");
                      
            if (!AccountService.CheckUserNameIsMateFormat(userName))
            {
                dic["Message"] = "用户名格式不正确";
                return Json(dic);
            }
            

            if (AccountService.CheckUserNameIsExist(userName))
            {
                dic["Message"] = "用户名已存在";
                return Json(dic);
            }

            dic["IsRegister"] = "true";
            return Json(dic);
        }

        /// <summary>
        /// 验证密码
        /// </summary>
        /// <param name="Password"></param>
        /// <returns></returns>
        public JsonResult CheckLoginPassword(string Password)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IsRegister", "false");
            dic.Add("Message", "");
            
            if (!AccountService.CheckUserLoginPasswordIsMateFormat(Password))
            {
                dic["Message"] = "密码格式不正确";
                return Json(dic);
            }
            
            dic["IsRegister"] = "true";
            return Json(dic);
        }

        /// <summary>
        /// 验证码手机号
        /// </summary>
        /// <param name="Mobile"></param>
        /// <returns></returns>
        public JsonResult CheckLoginMobile(string Mobile)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IsRegister", "false");
            dic.Add("Message", "");
                        
            if (!AccountService.CheckUserCellIsMateFormat(Mobile))
            {
                dic["Message"] = "手机号格式不正确";
                return Json(dic);
            }
            

            if (AccountService.CheckUserCellIsExist(Mobile))
            {
                dic["Message"] = "手机号已存在";
                return Json(dic);
            }

            dic["IsRegister"] = "true";
            return Json(dic);
        }

        /// <summary>
        /// 得到用户的描述信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetUserDescription()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("UserNameDescription", AccountService.GetUserDescription(PropertyNames.name));
            dic.Add("UserCellDescription", AccountService.GetUserDescription(PropertyNames.cell));
            dic.Add("UserPasswordDescription", AccountService.GetUserDescription(PropertyNames.password));
            return Json(dic);
        }

        /// <summary>
        /// 企业会员注册
        /// </summary>
        /// <param name="Model">企业会员</param>
        /// <param name="Code">图片验证码</param>
        /// <param name="CodeKey">图片验证码唯一标签</param>
        /// <param name="MessageCode">消息验证码Code</param>
        /// <param name="MessageCodeKey">消息验证码唯一标签</param>
        /// <returns></returns>
        public JsonResult RegisterComPanyMember(FrontEndRegisterViewModel Model, string Code, string CodeKey, string MessageCode, string MessageCodeKey)
        {            
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IsRegister", "false");
            dic.Add("Message", "");

            VerifyCodeViewModel verifyCodeViewModel = new VerifyCodeViewModel();
            if (!verifyCodeViewModel.CheckImgVerifyCode(Code, CodeKey))
            {
                dic["Message"] = "图片验证码错误";
                return Json(dic);
            }

            if (!verifyCodeViewModel.CheckSmsVerifyCode(MessageCode, MessageCodeKey))
            {
                dic["Message"] = "短信验证码错误";
                return Json(dic);
            }

            if (Model.PasswordConfirm != Model.Password)
            {
                dic["Message"] = "两次密码不一致";
                return Json(dic);
            }
     
            OrganizationMemberModel organizationMemberModel = new OrganizationMemberModel();
            var person = new Person();
            organizationMemberModel.ContactFirstName = Model.ContactFirstName;
            organizationMemberModel.ContactEmail = Model.ContactEmail;
            organizationMemberModel.ContactCellphone = Model.Cell;
            organizationMemberModel.ContactTelephone = Model.ContactTelephone;
            organizationMemberModel.CompanyAddress = Model.OrganizationAddress;
            organizationMemberModel.CompanyIndustry = Model.OrganizationIndustry == null ? null : ObjektFactory.Find<Value>(Model.OrganizationIndustry);
            organizationMemberModel.CompanyLabelName = Model.OrganizationName;
            organizationMemberModel.CompanyLocation = Model.OrganizationLocation == null ? null : ObjektFactory.Find<Location>(Model.OrganizationLocation);
            organizationMemberModel.CompanyName = Model.OrganizationName;
            organizationMemberModel.CompanyNature = Model.OrganizationNature == null ? null : ObjektFactory.Find<Value>(Model.OrganizationNature);
            organizationMemberModel.CompanyScale = Model.OrganizationScale == null ? null : ObjektFactory.Find<Value>(Model.OrganizationScale);
            organizationMemberModel.Name = Model.UserName;
            organizationMemberModel.Cell = Model.Cell;
            organizationMemberModel.Email = Model.Email;
            organizationMemberModel.CreateFrom = ObjektFactory.Find<Value>(FeValueIDs.FeUserCreateFrom_FrontEnd_Front);
            organizationMemberModel.Password = Model.Password;
            AccountService.OrganizationMemberRegister(organizationMemberModel);

            dic["IsRegister"] = "true";
            return Json(dic);
        }




        /// <summary>
        /// 个人会员注册
        /// </summary>
        /// <param name="Model">普通会员</param>
        /// <param name="Code">图片验证码</param>
        /// <param name="CodeKey">图片验证码唯一标签</param>
        /// <param name="MessageCode">消息验证码Code</param>
        /// <param name="MessageCodeKey">消息验证码唯一标签</param>
        /// <returns></returns>
        public JsonResult RegisterGeneralMember(FrontEndRegisterViewModel Model, string Code, string CodeKey, string MessageCode, string MessageCodeKey)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IsRegister", "false");
            dic.Add("Message", "");

            VerifyCodeViewModel verifyCodeViewModel = new VerifyCodeViewModel();
            if (!verifyCodeViewModel.CheckImgVerifyCode(Code, CodeKey))
            {
                dic["Message"] = "图片验证码错误";
                return Json(dic);
            }

            if (!verifyCodeViewModel.CheckSmsVerifyCode(MessageCode, MessageCodeKey))
            {
                dic["Message"] = "短信验证码错误";
                return Json(dic);
            }

            if (Model.PasswordConfirm != Model.Password)
            {
                dic["Message"] = "两次密码不一致";
                return Json(dic);
            }

            PersonMemberModel personMemberrModel = new PersonMemberModel();                        
            personMemberrModel.PersonCell = Model.Cell;            
            personMemberrModel.FirstName = Model.UserName;            
            personMemberrModel.Name = Model.UserName;
            personMemberrModel.Cell = Model.Cell;            
            personMemberrModel.Password = Model.Password;
            personMemberrModel.CreateFrom = ObjektFactory.Find<Value>(FeValueIDs.FeUserCreateFrom_FrontEnd_Front);
            AccountService.PersonMemberRegister(personMemberrModel);
                      
            dic["IsRegister"] = "true";
            return Json(dic);
        }


        /// <summary>
        /// 获取公司位置,公司人数,公司行业,公司性质列表值,
        /// </summary>
        /// <returns></returns>
        public JsonResult GetCompanyValueList()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            string strLocationData = string.Empty;
            string strLocationRoot = string.Empty;
            ObjektCollection<Location> locationRoot = new ObjektCollection<Location>(Klass.ForId(KlassIDs.Location), new WhereClause("\"parent\" is null "));

            if (locationRoot.Count > 0)
            {
                strLocationRoot = locationRoot[0].Id;
            }

            ObjektCollection<Location> locations = new ObjektCollection<Location>(Klass.ForId(KlassIDs.Location), new WhereClause("\"parent\" is not null "));
            foreach (Location obj in locations)
            {
                strLocationData = strLocationData + obj.Id + "_" + obj.Label + "_" + obj.Parent.Id + "_,";
            }
            dic.Add("LocationRoot", strLocationRoot);
            dic.Add("LocationData", strLocationData);
            dic.Add("PersonScale", FeListIDs.PersonScale);
            dic.Add("Industry", FeListIDs.Industry);
            dic.Add("OrganizationNature", FeListIDs.OrganizationNature);

            return Json(dic);
        }
    }
}