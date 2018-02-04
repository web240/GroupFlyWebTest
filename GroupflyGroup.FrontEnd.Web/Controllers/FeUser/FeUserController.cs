using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.FrontEnd.Service;
using GroupflyGroup.FrontEnd.Service.Models;
using GroupflyGroup.FrontEnd.Web.Controllers.Shared;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.FeUser
{
    /// <summary>
    /// 用户管理
    /// </summary>
    public class FeUserController : Controller
    {

        #region 用户列表

        /// <summary>
        /// 用户列表
        /// </summary>
        /// <returns></returns>
        public ActionResult FeUserPersonOrganizationList()
        {
            return View(new BaseViewModel());
        }
        
        /// <summary>
        /// 用户列表查询
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetFeUserPersonOrganizationList(int pageNumber, int pageSize, string param)
        {
            var paramlist = param.JsonToObject<List<QueryParamModel>>();

            var sbText = new StringBuilder("1=1");
            List<OdbcParam> whereParamList = new List<OdbcParam>();
            foreach (var item in paramlist)
            {
                //用户名
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("userName"))
                {
                    sbText.Append(" and \"name\" like '%" + item.value + "%'");
                }
                //姓名/组织名称
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("personOrOrganizationName"))
                {
                    sbText.Append(
                        "and ( \"person\" in (SELECT \"id\" FROM \"Person\" where \"firstName\" like '%" +
                       item.value + "%' or \"lastName\" like '%" +
                       item.value + "%' or concat(\"firstName\",\"lastName\") like '%" +
                       item.value + "%' or concat(concat(\"firstName\",' '),\"lastName\") like '%" +
                       item.value + "%' or concat(\"lastName\",\"firstName\") like '%" +
                       item.value + "%' or concat(concat(\"lastName\",' '),\"firstName\") like '%" +
                       item.value + "%' ) or \"organization\" in (SELECT \"id\" FROM \"Organization\" where \"name\" like '%" +
                       item.value + "%' ))");
                }
                //注册时间
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("startRegistTime"))
                {
                    sbText.Append(" and \"createdOn\" >=?");
                    whereParamList.Add(new OdbcParam(DataType.DATETIME, item.value.ToString()));
                }
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("endRegistTime"))
                {
                    sbText.Append(" and \"createdOn\" <=?");
                    whereParamList.Add(new OdbcParam(DataType.DATETIME, item.value.ToString()));
                }
                //用户类型
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("userType"))
                {
                    sbText.Append(" and \"userType\"='" + item.value + "'");
                }
                //是否允许登录
                if (!string.IsNullOrEmpty(item.field) && item.field.Equals("logonEnabled"))
                {
                    sbText.Append(" and \"logonEnabled\"='" + (item.value.ToString() == "true" ? 1 : 0) + "'");
                }
            }

            var where = new WhereClause(sbText.ToString());
            where.Parameters.AddRange(whereParamList);
            if (pageNumber <= 0)
            {
                pageNumber = 1;
            }
            var ViewModels = new List<FeUserPersonOrganizationListViewModel>();
            var klass = Klass.ForName(FeKlassNames.User);

            var oc = new ObjektCollection<User>(klass, new Pagination(pageNumber, pageSize), where);
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.createdOn, Order.Desc));

            foreach (var obj in oc)
            {
                var model = new FeUserPersonOrganizationListViewModel();
                model.CopyEntity(obj);
                ViewModels.Add(model);
            }
            var data = $"{{ \"total\": \"{oc.Pagination.RowCount}\", \"rows\": {ViewModels.ObjectToJson()} }}";
            var resault = new JsonResultModel(data);
            return Json(resault);

        }

        /// <summary>
        /// 禁用用户
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult UserDisable(string id)
        {
            var result = new JsonActionResult();

            var user = ObjektFactory.Find<User>(id);
            if (user != null && user.IsExists())
            {
                user.LogonEnabled = false;
                user.Save();
                result.Code = 1;
            }
            else
            {
                result.ErrorMessage = "找不到指定的用户";
            }

            return Json(result);
        }

        /// <summary>
        /// 启用用户
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult UserEnable(string id)
        {
            var result = new JsonActionResult();

            var user = ObjektFactory.Find<User>(id);
            if (user != null && user.IsExists())
            {
                user.LogonEnabled = true;
                user.Save();
                result.Code = 1;
            }
            else
            {
                result.ErrorMessage = "找不到指定的用户";
            }

            return Json(result);
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="UserList"></param>
        /// <returns></returns>
        public JsonResult DelUser(List<FeUserPersonOrganizationListViewModel> UserList)
        {
            var result = new JsonActionResult();
            result.Code = 1;

            foreach (var user in UserList)
            {
                var feUser = ObjektFactory.Find<User>(user.Id);
                if (feUser.LastLogInOn != null)
                {
                    throw new Exception(feUser.Name + "用户已被使用，不允许删除");
                }
                else
                {
                    AccountService.MemberDelete(user.Id);
                }
            }
            return Json(result);
        }

        /// <summary>
        /// 用户验证
        /// </summary>
        /// <param name="feUser">要验证的对象(运行时解析)</param>
        /// <returns></returns>
        public JsonActionResult UserValidate(dynamic feUser)
        {            
            var result = new JsonActionResult();
            result.Code = 1;
            if (feUser.UserName != null && feUser.UserName != string.Empty)
            {
                if (AccountService.CheckUserNameIsExist(feUser.UserName,feUser.Id))
                {
                    result.Code = 0;
                    result.ErrorMessage = "用户名已被使用;";
                }
            }
            if (feUser.Cell != null && feUser.Cell != string.Empty)
            {
                if (AccountService.CheckUserCellIsExist(feUser.Cell, feUser.Id))
                {
                    result.Code = 0;
                    result.ErrorMessage = result.ErrorMessage + "绑定手机已被使用;";
                }
            }
            if (feUser.Email != null && feUser.Email != string.Empty)
            {               
                if (AccountService.CheckUserCellIsExist(feUser.Email, feUser.Id))
                {
                    result.Code = 0;
                    result.ErrorMessage = result.ErrorMessage + "绑定邮箱已被使用;";
                }
            }
            return result;
        }

        /// <summary>
        /// 用户详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult UserDetails(string id)
        {
            User user = null;
            Person person = null;
            Organization organization = null;
            string userTypeLabel = "";

            #region Location
            string strLocationData = "";
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

            user = ObjektFactory.Find<User>(id);
            if (user != null)
            {
                 
                if (user.GetProperty("userType") != null)
                {
                    Value userType = (Value)user.GetProperty("userType");
                    userTypeLabel = userType.Label;

                    if (userType.Id == FeValueIDs.FeUserType_Person)
                    {
                        PersonMemberModel personMemberModel = AccountService.GetPersonMemberInfo(id);

                        return View("FePersonEdit", new FePersonEditViewModel
                        {
                            Id = personMemberModel.UserId,
                            RegisterTime = personMemberModel.RegisterTime==null?null: personMemberModel.RegisterTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                            LastLoginTime = personMemberModel.LastLoginTime==null?null: personMemberModel.LastLoginTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                            UserName = personMemberModel.Name,
                            UserTypeLabel = personMemberModel.UserType.Label,
                            RegisterFrom = personMemberModel.CreateFrom.Label,
                            Avatar = personMemberModel.Avatar==null?null: personMemberModel.Avatar.Id,
                            Email = personMemberModel.Email,
                            Cell = personMemberModel.Cell,
                            FirstName = personMemberModel.FirstName,
                            LastName = personMemberModel.LastName,
                            Birthday = personMemberModel.Birthday==null?null: personMemberModel.Birthday.Value.ToString("yyyy/MM/dd"),
                            Location = personMemberModel.Location==null?null: personMemberModel.Location.Id,
                            Address = personMemberModel.Address,
                            PersonEmail = personMemberModel.Email,
                            PersonCell = personMemberModel.PersonCell,
                            Sex = personMemberModel.Sex==null?null: personMemberModel.Sex.Id,
                            ImageDirectoryId = "",
                            LocationRoot = strLocationRoot,
                            LocationData = strLocationData
                        });
                    }
                    else if (userType.Id == FeValueIDs.FeUserType_Organization)
                    {                      
                        OrganizationMemberModel organizationMemberModel = AccountService.GetOrganizationMemberInfo(id);
                        
                        return View("FeOrganizationEdit", new FeOrganizationEditViewModel
                        {
                            Id = organizationMemberModel.UserId,
                            RegisterTime = organizationMemberModel.RegisterTime==null?null: organizationMemberModel.RegisterTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                            LastLoginTime = organizationMemberModel.LastLoginTime==null?null: organizationMemberModel.LastLoginTime.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
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
                }

                return View("FeUserEdit", new FeUserEditViewModel
                {
                    Id = user.Id,
                    RegisterTime = user.CreatedOn == null ? null : user.CreatedOn.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                    LastLoginTime = user.LastLogInOn == null ? null : user.LastLogInOn.Value.ToString("yyyy/MM/dd  HH:mm:ss"),
                    UserName = user.Name,
                    UserTypeLabel = userTypeLabel,
                    RegisterFrom = user.GetProperty("createFrom") == null ? null : ((Value)user.GetProperty("createFrom")).Label,
                    Avatar = user.Avatar == null ? null : user.Avatar.Id,
                    Email = user.Email,
                    Cell = user.Cell,

                    ImageDirectoryId = ""
                });
            }
            else
            {
                throw new Exception("用户ID无效！");
            }
        }

        #endregion

        #region 用户
 
        /// <summary>
        /// 编辑用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UserEdit(FeUserEditViewModel model)
        {
            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.Code = 0;
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                if (model.Id == null)
                {
                    if (model.UserName == null)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 用户名";
                    }
                    else if (model.Password == null)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 登录密码";
                    }
                    else if (model.PasswordConfirm == null)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else if (model.PasswordConfirm != model.Password)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else
                    {
                        result = UserValidate(model);
                        if (result.Code == 0)
                        {
                            return Json(result);
                        }
                        else
                        {
                            var user = new User();
                            user.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                            user.Name = model.UserName;
                            user.Cell = model.Cell;
                            user.Email = model.Email;
                            user.Password = model.Password;
                            user.Save();
                            result.Code = 1;
                        }
                    }
                }
                else
                {
                    if (model.PasswordConfirm != model.Password)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else
                    {                                                
                        result = UserValidate(model);
                        if (result.Code == 0)
                        {
                            return Json(result);
                        }
                        else
                        {
                            var user = ObjektFactory.Find<User>(model.Id);
                            user.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                            user.Cell = model.Cell;
                            user.Email = model.Email;
                            if (!string.IsNullOrEmpty(model.PasswordConfirm) && !string.IsNullOrEmpty(model.Password) && model.PasswordConfirm == model.Password)
                            {
                                user.Password = model.Password;
                            }
                            user.Save();
                            result.Code = 1;
                        }

                    }
                }
            }
            return Json(result);
        }

        #endregion

        #region 个人用户

        /// <summary>
        /// 添加个人用户
        /// </summary>
        /// <returns></returns>
        public ActionResult PersonAdd()
        {
            #region Location
            string strLocationData = "";
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


            return View("FePersonEdit", new FePersonEditViewModel
            {
                ImageDirectoryId = "",
                LocationRoot = strLocationRoot,
                LocationData = strLocationData
            });
        }

        /// <summary>
        /// 编辑个人用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult PersonEdit(FePersonEditViewModel model)
        {
            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.Code = 0;
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                if (model.Id == null)
                {
                    if (string.IsNullOrEmpty(model.UserName))
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 用户名";
                    }
                    else if (string.IsNullOrEmpty(model.Password))
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 登录密码";
                    }
                    else if (string.IsNullOrEmpty(model.PasswordConfirm))
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 确认登录密码！";
                    }
                    else if (model.PasswordConfirm != model.Password)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else
                    {                       
                        result = UserValidate(model);
                        if (result.Code == 0)
                        {
                            return Json(result);
                        }
                        else if (model.FirstName == null || model.FirstName == string.Empty)
                        {
                            result.Code = 0;
                            result.ErrorMessage = "请填写 名";
                        }
                        else
                        {
                            PersonMemberModel personMemberModel = new PersonMemberModel();
                            personMemberModel.Address = model.Address;
                            if (!string.IsNullOrEmpty(model.Birthday))
                            {
                                personMemberModel.Birthday = DateTime.Parse(model.Birthday);
                            }
                            personMemberModel.PersonCell = model.PersonCell;
                            personMemberModel.PersonEmail = model.PersonEmail;
                            personMemberModel.FirstName = model.FirstName;
                            personMemberModel.LastName = model.LastName;
                            personMemberModel.Location= model.Location == null ? null : ObjektFactory.Find<Location>(model.Location);
                            personMemberModel.Sex = model.Sex == null ? null : ObjektFactory.Find<Value>(model.Sex);
                            personMemberModel.Telephone = model.Telephone;                            
                            personMemberModel.Avatar= model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                            personMemberModel.Name = model.UserName;
                            personMemberModel.Cell = model.Cell;
                            personMemberModel.Email = model.Email;
                            personMemberModel.Password = model.Password;
                            personMemberModel.CreateFrom = ObjektFactory.Find<Value>(FeValueIDs.FeUserCreateFrom_FrontEnd_Back);
                            AccountService.PersonMemberRegister(personMemberModel);

                            result.Code = 1;
                        }
                    }
                }
                else
                {
                    if (model.PasswordConfirm != model.Password)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }                    
                    else if (model.FirstName == null || model.FirstName == string.Empty)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 名";
                    }
                    else
                    {                                               
                        result = UserValidate(model);
                        if (result.Code == 0)
                        {
                            return Json(result);
                        }
                        else
                        {
                            PersonMemberModel personMemberModel = new PersonMemberModel();
                            personMemberModel.UserId = model.Id;
                            personMemberModel.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                            personMemberModel.Cell = model.Cell;
                            personMemberModel.Email = model.Email;
                            if (!string.IsNullOrEmpty(model.PasswordConfirm)&& !string.IsNullOrEmpty(model.Password)&& model.PasswordConfirm == model.Password)
                            { 
                                personMemberModel.Password = model.Password;
                            }
                            personMemberModel.Address = model.Address;
                            if (!string.IsNullOrEmpty(model.Birthday))
                            {
                                personMemberModel.Birthday = DateTime.Parse(model.Birthday);
                            }
                            personMemberModel.PersonCell = model.PersonCell;
                            personMemberModel.PersonEmail = model.PersonEmail;                            
                            personMemberModel.Email = model.PersonEmail;
                            personMemberModel.FirstName = model.FirstName;
                            personMemberModel.LastName = model.LastName;
                            personMemberModel.Location = model.Location == null ? null : ObjektFactory.Find<Location>(model.Location);
                            personMemberModel.Sex = model.Sex == null ? null : ObjektFactory.Find<Value>(model.Sex);
                            personMemberModel.Telephone = model.Telephone;
                            AccountService.PersonMemberEdit(personMemberModel);
                            result.Code = 1;
                        }

                    }
                }
            }
            return Json(result);
        }

        #endregion

        #region 组织用户

        /// <summary>
        /// 添加组织用户
        /// </summary>
        /// <returns></returns>
        public ActionResult OrganizationAdd()
        {
            #region Location
            string strLocationData = "";
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

            return View("FeOrganizationEdit", new FeOrganizationEditViewModel
            {
                ImageDirectoryId = "",
                LocationRoot = strLocationRoot,
                LocationData = strLocationData
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult OrganizationEdit(FeOrganizationEditViewModel model)
        {
            var result = new JsonActionResult();

            if (!ModelState.IsValid)
            {
                result.Code = 0;
                result.ErrorMessage = ModelState.ErrorMessageString();
            }
            else
            {
                if (model.Id == null)
                {
                    if (model.UserName == null)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 用户名";
                    }
                    else
                    if (model.Password == null)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 登录密码";
                    }
                    else if (model.PasswordConfirm == null)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else if (model.PasswordConfirm != model.Password)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else if(model.OrganizationName == null || model.OrganizationName == string.Empty)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 组织名称";
                    }
                    else if (string.IsNullOrEmpty(model.ContactFirstName))
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 联系人名";
                    }
                    else
                    {                       
                        result = UserValidate(model);
                        if (result.Code == 0)
                        {
                            return Json(result);
                        }
                        else
                        {
                            
                            OrganizationMemberModel organizationMemberModel = new OrganizationMemberModel();                            
                            organizationMemberModel.ContactFirstName = model.ContactFirstName;
                            organizationMemberModel.ContactLastName = model.ContactLastName;
                            organizationMemberModel.ContactEmail = model.ContactEmail;
                            organizationMemberModel.ContactCellphone = model.ContactCellphone;
                            organizationMemberModel.ContactTelephone = model.ContactTelephone;
                            organizationMemberModel.CompanyAddress = model.OrganizationAddress;
                            organizationMemberModel.CompanyIndustry = model.OrganizationIndustry == null ? null : ObjektFactory.Find<Value>(model.OrganizationIndustry);
                            organizationMemberModel.CompanyLabelName = model.OrganizationName;
                            organizationMemberModel.CompanyLocation = model.OrganizationLocation == null ? null : ObjektFactory.Find<Location>(model.OrganizationLocation);
                            organizationMemberModel.CompanyName = model.OrganizationName;
                            organizationMemberModel.CompanyNature = model.OrganizationNature == null ? null : ObjektFactory.Find<Value>(model.OrganizationNature);
                            organizationMemberModel.CompanyScale = model.OrganizationScale == null ? null : ObjektFactory.Find<Value>(model.OrganizationScale);
                            organizationMemberModel.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                            organizationMemberModel.Name = model.UserName;
                            organizationMemberModel.Cell = model.Cell;
                            organizationMemberModel.Email = model.Email;
                            organizationMemberModel.CreateFrom = ObjektFactory.Find<Value>(FeValueIDs.FeUserCreateFrom_FrontEnd_Back);
                            organizationMemberModel.Password = model.Password;                            
                            AccountService.OrganizationMemberRegister(organizationMemberModel);

                            result.Code = 1;
                        }

                    }
                }
                else
                {
                    if (model.PasswordConfirm != model.Password)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "确认登录密码不一致，请重新填写！";
                    }
                    else if (model.OrganizationName == null || model.OrganizationName == string.Empty)
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 组织名称";
                    }
                    else if (string.IsNullOrEmpty(model.ContactFirstName))
                    {
                        result.Code = 0;
                        result.ErrorMessage = "请填写 联系人名";
                    }
                    else
                    {                       
                        result = UserValidate(model);
                        if (result.Code == 0)
                        {
                            return Json(result);
                        }
                        else
                        {
                            OrganizationMemberModel organizationMemberModel = new OrganizationMemberModel();
                            organizationMemberModel.UserId = model.Id;
                            organizationMemberModel.Avatar = model.Avatar == null ? null : ObjektFactory.Find<File>(model.Avatar);
                            organizationMemberModel.Cell = model.Cell;
                            organizationMemberModel.Email = model.Email;
                            if (!string.IsNullOrEmpty(model.PasswordConfirm) && !string.IsNullOrEmpty(model.Password) && model.PasswordConfirm == model.Password)
                            {
                                organizationMemberModel.Password = model.Password;
                            }
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
                            AccountService.OrganizationMemberEdit(organizationMemberModel);

                            result.Code = 1;
                        }
                    }
                }
            }
            return Json(result);
        }

        #endregion

    }
}
