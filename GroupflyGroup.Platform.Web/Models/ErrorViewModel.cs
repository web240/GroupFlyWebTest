using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ErrorViewModel 
    {
        /// <summary>
        /// 
        /// </summary>
        public ErrorViewModel()
        {
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detail"></param>
        public ErrorViewModel(string message, string detail)
        {
            this.ErrorMessage = message;
            this.ErrorDetail = detail;
        }
        /// <summary>
        /// 错误消息
        /// </summary>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// 错误详情
        /// </summary>
        public string ErrorDetail { get; set; }

        /// <summary>
        /// 是否能查看详情
        /// </summary>
        public bool CanRead {
            get
            {
                var user = SessionContext.Current.User;
                var admin = ObjektFactory.Find<Role>(RoleIDs.Administrator);
                var canRead = user.IsBelongToRole(admin) || user.Id == UserIDs.root;
                return canRead;
            }
        }
    }
}