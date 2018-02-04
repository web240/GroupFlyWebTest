using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 权限模型
    /// </summary>
    public class PermissionModel
    {
        /// <summary>
        /// 
        /// </summary>
        public PermissionModel()
        {
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objekt"></param>
        public PermissionModel(Objekt objekt)
        {
            this.Entity = objekt;
        }

        /// <summary>
        /// 实体
        /// </summary>
        protected Objekt Entity { get; set; }

        /// <summary>
        /// 发现
        /// </summary>
        public bool CanDiscover {
            get
            {
                if (!Entity.IsNull())
                {
                    if (Entity.IsExists())
                        return Entity.CanDiscover();
                }
                return true;
            }
        }


        /// <summary>
        /// 读取
        /// </summary>
        public bool CanRead
        {
            get
            {
                if (!Entity.IsNull())
                {
                    if (Entity.IsExists())
                        return Entity.CanRead();
                }
                return true;
            }
        }


        /// <summary>
        /// 修改
        /// </summary>
        public bool CanUpdate
        {
            get
            {
                if (!Entity.IsNull())
                {
                    if (Entity.IsExists())
                        return Entity.CanUpdate();
                }
                return true;
            }
        }


        /// <summary>
        /// 删除
        /// </summary>
        public bool CanDelete
        {
            get
            {
                if (!Entity.IsNull())
                {
                    if (Entity.IsExists())
                        return Entity.CanDelete();
                }
                return true;
            }
        }


        /// <summary>
        /// 授权
        /// </summary>
        public bool CanChangeAccess
        {
            get
            {
                if (!Entity.IsNull())
                {
                    if (Entity.IsExists())
                        return Entity.CanChangeAccess();
                }
                return true;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Code
        {
            get
            {
                return (this.CanDiscover ? "1" : "0")
                       + (this.CanRead ? "1" : "0")
                       + (this.CanUpdate ? "1" : "0")
                       + (this.CanDelete ? "1" : "0")
                       + (this.CanChangeAccess ? "1" : "0");
            }
        }
    }
}