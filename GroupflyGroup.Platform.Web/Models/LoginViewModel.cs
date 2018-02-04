using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Auth;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.WebAdapter;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Controllers;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class LoginViewModel : BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="passWord">登录密码</param>
        /// <param name="verifyCode">登录验证码</param>
        public LoginViewModel(string userName, string passWord, string verifyCode)
        {
            UserName = userName;
            PassWord = passWord;
            VerifyCode = verifyCode;
        }

        /// <summary>
        /// 
        /// </summary>
        public LoginViewModel()
        {
            var loginBannerConfig= ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.loginBanner);
            if (loginBannerConfig.IsExists())
                BannerId = loginBannerConfig.Value;

            LoginTitleLogoId = ObjektFactory.Find<SystemConfiguration>("7e8d093d4374471f87894d9563c49be4@SystemConfiguration").Value;
            SystemTitle =  ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.title).Value;
            CopyRight = ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.copyright).Value;

        }

        /// <summary>
        /// 
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string PassWord { get; set; }

        /// <summary>
        /// 登录页标题图片id
        /// </summary>
        public string LoginTitleLogoId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string SystemTitle { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string BannerId { get; set; }

        /// <summary>
        /// 版权信息
        /// </summary>
        public string CopyRight { get; set; }

        /// <summary>
        /// 验证码
        /// </summary>
        public string VerifyCode { get; set; }

        /// <summary>
        /// 验证失败次数
        /// </summary>
        public string AuthFaultCount { get; set; }

        /// <summary>
        /// 验证失败总次数
        /// </summary>
        public string AuthFaultTotalCount { get; set; }

        /// <summary>
        /// 最后验证失败时间
        /// </summary>
        public string AuthFaultTime { get; set; }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public JsonResultModel Login()
        {
            if (UserName.IsNullOrEmpty() || PassWord.IsNullOrEmpty())
            {
                return new JsonResultModel(false, "用户名和密码必填");
            }

            if (CheckLoginNeedVerifyCode(UserName))
            {
                VerifyCodeViewModel verifyCodeViewModel = new VerifyCodeViewModel();
                if (!verifyCodeViewModel.CheckImgVerifyCode(VerifyCode))
                {
                    return new JsonResultModel(false, "验证码错误", "LoginNeedVerifyCode");
                }
            }

            try
            {
                Authentication.Login(UserName, PassWord);
                return new JsonResultModel();
            }
            catch (Exception ex)
            {
                PersistenceContext.Discard();
                
                if (CheckLoginNeedVerifyCode(UserName))
                {
                    return new JsonResultModel(false, ex.Message, "LoginNeedVerifyCode");
                }
                
                return new JsonResultModel(false, ex.Message);
            }
        }

        /// <summary>
        /// 检测登录是否需要验证码(为true需要,为false不需要)
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public bool CheckLoginNeedVerifyCode(string userName)
        {
            var user = new ObjektCollection<User>(Klass.ForId(KlassIDs.User), new WhereClause(" \"name\"='" + userName + "'"));
            if (user.Count > 0)
            {
                if (user[0].AuthFaultCount >= 3)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }

        }


        /// <summary>
        /// 
        /// </summary>
        public void LogOut()
        {
            Authentication.Logout();
        }
    }
}