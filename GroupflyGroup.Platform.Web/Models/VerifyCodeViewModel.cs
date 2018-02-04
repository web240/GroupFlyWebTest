using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 验证码
    /// </summary>
    public class VerifyCodeViewModel: BaseViewModel
    {
        /// <summary>
        /// 判断图片验证码是否正确
        /// </summary>
        /// <param name="VerifyCode">待验证的验证码</param>
        /// <param name="VerifyCodeKey">验证码对应Key,不填则为图片验证码默认Key</param>
        /// <returns></returns>
        public bool CheckImgVerifyCode(string VerifyCode, string VerifyCodeKey = Const.DefaultImgVerifyCode)
        {
            return CheckVerifyCode(VerifyCode, VerifyCodeKey);
        }

        /// <summary>
        /// 判断短信验证码是否正确
        /// </summary>
        /// <param name="VerifyCode">待验证的验证码</param>
        /// <param name="VerifyCodeKey">验证码对应Key,不填则为短信验证码默认Key</param>
        /// <returns></returns>
        public bool CheckSmsVerifyCode(string VerifyCode, string VerifyCodeKey = Const.DefaultSmsVerifyCode)
        {
            return CheckVerifyCode(VerifyCode, VerifyCodeKey);
        }

        /// <summary>
        /// 判断验证码是否正确
        /// </summary>
        /// <param name="VerifyCode">待验证的验证码</param>
        /// <param name="VerifyCodeKey">验证码对应Key,如无此值则取GroupflyGroup.Platform.Web.Common.Const下的默认验证码Key</param>
        /// <returns></returns>
        public bool CheckVerifyCode(string VerifyCode, string VerifyCodeKey)
        {            
            if (ObjectFramework.WebAdapter.WebSessionDataCache.Get(VerifyCodeKey) != null)
            {
                if (ObjectFramework.WebAdapter.WebSessionDataCache.Get(VerifyCodeKey).ToString().ToLower() == VerifyCode.ToLower())
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
        /// 生成随机码
        /// </summary>
        /// <param name="CodeLength">随机码长度</param>
        /// <returns></returns>
        public static string CreateRandomCode(int CodeLength)
        {
            string Vchar = Const.VerifyCodeCharacter;
            string[] VcArray = Vchar.Split(new Char[] { ',' });
            string VNum = "";
            //int temp = -1;
            Random rand = new Random();
            for (int i = 1; i < CodeLength + 1; i++)
            {
                int t = rand.Next(VcArray.Length);
                VNum += VcArray[t];
            }
            return VNum;
        }
    }
}