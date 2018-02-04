using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public abstract class TreeModel
    {
        /// <summary>
        /// 
        /// </summary>
        protected TreeModel(Objekt entity)
        {
            this.Entity = entity;
            this.id = Entity.Id;
            this.text = Entity.CombinedLabel;
            this.Permission = new PermissionModel(this.Entity);
        }
        /// <summary>
        /// 
        /// </summary>
        protected TreeModel(string id)
        {
            this.Entity = ObjektFactory.Find(id);
            this.id = Entity.Id;
            this.text = Entity.CombinedLabel;
            this.Permission = new PermissionModel(this.Entity);
        }

        /// <summary>
        /// 
        /// </summary>
        protected TreeModel()
        {
            
        }

        /// <summary>
        /// 权限
        /// </summary>
        public PermissionModel Permission { get; set; }

        /// <summary>
        /// 
        /// </summary>
        protected Objekt Entity { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool isDirectory { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string text { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string state { get; set; }


        /// <summary>
        /// 
        /// </summary>
        public string iconCls { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public abstract void GetChildren();
    }
}