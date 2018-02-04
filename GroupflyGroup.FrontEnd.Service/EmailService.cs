using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupflyGroup.FrontEnd.Service
{
    /// <summary>
    /// 邮箱操作
    /// </summary>
    public class EmailService
    {
        /// <summary>
        /// 绑定邮箱
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <param name="email">邮箱</param>
        public static bool BindEmailService(string userid, string email)
        {
            try
            {
                var user = ObjektFactory.Find<User>(userid);
                user.Email = email;
                user.Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
        /// <summary>
        /// 解绑邮箱
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <param name="email">邮箱</param>
        public static bool UnbindEmailService(string userid, string email)
        {
            try
            {
                var user = ObjektFactory.Find<User>(userid);
                user.Email = null;
                user.Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
    }
}
