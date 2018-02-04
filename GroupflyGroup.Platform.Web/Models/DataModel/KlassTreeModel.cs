using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class KlassTreeModel : TreeModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="klass"></param>
        public KlassTreeModel(Klass klass) : base(klass)
        {
            this.iconCls = "tree-icon fa fa-sitemap";
            this.state = "open";
            this.klassName = klass.Name;
            this.text = klass.Label;
        }

        /// <summary>
        /// 类名
        /// </summary>
        public string klassName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<KlassTreeModel> children { get; set; } = new List<KlassTreeModel>();


        /// <summary>
        /// 
        /// </summary>
        public override void GetChildren()
        {
            var klass = Entity as Klass;
            if (!klass.Children.IsNullOrEmpty())
            {
                klass.Children.Each(k =>
                {
                    if (!k.IsTrash && k.Permission.CanDiscover())
                    {
                        var model = new KlassTreeModel(k);
                        if (!k.Children.IsNullOrEmpty())
                            model.state = "closed";
                        this.children.Add(model);
                    }
                });
            }
        }
    }
}