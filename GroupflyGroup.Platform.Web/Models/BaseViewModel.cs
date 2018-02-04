using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 视图模型基类
    /// </summary>
    public class BaseViewModel
    {
        /// <summary>
        /// UI组件扩展集合
        /// </summary>
        private Dictionary<string, Dictionary<string, List<string>>> UIExtensions { get; } =
            new Dictionary<string, Dictionary<string, List<string>>>();

        /// <summary>
        /// 
        /// </summary>
        public BaseViewModel()
        {
            
        }

        /// <summary>
        /// 
        /// </summary>
        public BaseViewModel(Objekt objekt)
        {
            this.Permission = new PermissionModel(objekt);
        }

        /// <summary>
        /// 权限模型
        /// </summary>
        public PermissionModel Permission { get; set; }


        /// <summary>
        /// 
        /// </summary>
        public string ScriptSection { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string CssSection { get; set; }

        /// <summary>
        /// UI组件定义脚本节点
        /// </summary>
        public string UIComponentDefineSection { get; set; }

        /// <summary>
        /// UI组件注册脚本节点
        /// </summary>
        public string UIComponentRegisterSection { get; set; }

        /// <summary>
        /// 组合后的UI组件扩展节点
        /// </summary>
        public string UIExtensionSection { get; private set; }

        /// <summary>
        /// 添加UI组件扩展
        /// </summary>
        /// <param name="elementName">组件名称</param>
        /// <param name="eventName">事件名称</param>
        /// <param name="script">脚本</param>
        public void AddUIExtension(string elementName, string eventName, string script)
        {
            var dic = new Dictionary<string, List<string>>();
            var scripts = new List<string>();
            if (UIExtensions.ContainsKey(elementName))
            {
                var ui = UIExtensions[elementName];
                if (ui.ContainsKey(eventName))
                {
                    ui[eventName].Add(script);
                }
                else
                {
                    scripts.Add(script);
                    ui.Add(eventName, scripts);
                }
            }
            else
            {
                scripts.Add(script);
                dic.Add(eventName, scripts);
                UIExtensions.Add(elementName, dic);
            }
        }

        /// <summary>
        /// 组合已添加的扩展到UIExtensionSection中
        /// </summary>
        public void BuildUIExtensions()
        {
            var scripts = new StringBuilder();
            UIExtensions.Each(extension =>
            {
                var uiScript = new StringBuilder($"var {extension.Key}Obj = {{ ");
                extension.Value.Each(elementEvent =>
                {
                    var paras = elementEvent.Key == "afterAttributeChange"
                        ? ",attrName,oldValue,newValue"
                        : string.Empty;
                    uiScript.Append($"{elementEvent.Key}: function(element{paras}) {{ ");

                    elementEvent.Value.Each(script =>
                    {
                        uiScript.Append($"(function(){{ {script} }})();");
                    });

                    uiScript.Append(" },");
                });
                uiScript = uiScript.Remove(uiScript.Length - 1, 1);
                uiScript.Append(" };");
                uiScript.Append($"new {extension.Key}({extension.Key}Obj).register();");
                scripts.Append(uiScript);
            });
            UIExtensionSection = $@"<script type=""text/javascript"">
        {scripts}
    </script>";
        }

        /// <summary>
        /// 执行事务持久化
        /// </summary>
        /// <param name="action"></param>
        protected void Execute(Action action)
        {
            try
            {
                action();
                PersistenceContext.Accept();
            }
            finally
            {
                PersistenceContext.Discard();
            }
        }
    }
}