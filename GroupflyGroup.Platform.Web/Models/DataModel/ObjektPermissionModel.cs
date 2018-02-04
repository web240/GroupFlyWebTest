using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.Platform.Web.Models.DataModel
{
    /// <summary>
    /// 
    /// </summary>
    public class ObjektPermissionModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="permission"></param>
        public ObjektPermissionModel(ObjektPermission permission) 
        {
            this.Id = permission.Id;
            this.Label = permission.Label;
            this.Description = permission.Description;
            this.PermissionCode = new PermissionModel(permission).Code;
        }

        /// <summary>
        /// 
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool IsDefault { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool IsCurrent { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string PermissionCode { get; set; }
    }
}