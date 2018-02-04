using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models.DataModel;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class AuthorizationModel
    {
        /// <summary>
        /// 
        /// </summary>
        public AuthorizationModel(string id)
        {
            if (ObjektFactory.IsExists(id))
            {
                Entity = ObjektFactory.Find(id);
                PermissionKlass = Entity.Klass;

                if (Entity is RelationshipObjekt)
                {
                    if (Entity.Klass.GetProperty<bool>(PropertyNames.isUsingSourcePermission))
                    {
                        var source = (Entity as RelationshipObjekt).Source;
                        PermissionKlass = source.Klass;
                    }
                }
                this.AllowPrivatePermission = PermissionKlass.AllowPrivatePermission;

                PermissionKlass.ROCC[RelationshipNames.AllowedPermission].Each(o =>
                {
                    var allowedPermission = o as AllowedPermission;
                    var model = new ObjektPermissionModel(allowedPermission.Related as ObjektPermission);

                    model.IsCurrent = Entity.Permission.Id == model.Id;
                    model.IsDefault = allowedPermission.IsDefault;

                    PermissionList.Add(model);
                });
            }
        }

        /// <summary>
        /// 权限源类
        /// </summary>
        public Klass PermissionKlass { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Objekt Entity { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<ObjektPermissionModel> PermissionList { get; set; } = new List<ObjektPermissionModel>();

        /// <summary>
        /// 是允许私有权限
        /// </summary>
        public bool AllowPrivatePermission { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public void SetPermission(string permissionId)
        {
            var permission = ObjektFactory.Find<ObjektPermission>(permissionId);
            if (!permission.IsExists())
                throw new Exception("权限对象不存在！");

            Entity.ChangeAccess(permission);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetDefaultPrivatePermission()
        {
            var dap = Entity.Klass.GetDefaultAllowedPermission();

            var defaultPermission = dap.Related as ObjektPermission;
            List<RelationshipObjekt> rs = new List<RelationshipObjekt>();
            var duplicatedPermission = defaultPermission.Replicate(rs);
            duplicatedPermission.SetProperty(PropertyNames.name, ObjektFactory.ObjektId2UniqueString(duplicatedPermission.Id));
            duplicatedPermission.SetProperty<bool>(PropertyNames.isPrivate, true);
            duplicatedPermission.SetProperty<string>(PropertyNames.description, duplicatedPermission + "的私有权限");
            duplicatedPermission.SetProperty<string>(PropertyNames.label, duplicatedPermission + "的私有权限");
            duplicatedPermission.Save();
            foreach (var relationshipObjekt in rs)
            {
                relationshipObjekt.Save();
            }
            Entity.ChangeAccess(duplicatedPermission as ObjektPermission);


            var objModel = new ObjektViewModel(duplicatedPermission);
            return objModel.ToJson();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToJson()
        {
            if (!Entity.IsNull())
                return new
                {
                    PermissionCode = new PermissionModel(Entity).Code,
                    AllowPrivatePermission,
                    Current = new ObjektViewModel(this.Entity.Permission).ToJson(),
                    Permissions = PermissionList.ObjectToJson()
                }.ObjectToJson();
            else
                return new { NotExists = true }.ObjectToJson();
        }
    }
}