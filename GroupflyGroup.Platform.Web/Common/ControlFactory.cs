using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.Platform.Web.Common
{
    /// <summary>
    /// 
    /// </summary>
    public static class ControlFactory
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="elementName"></param>
        /// <param name="attrs"></param>
        /// <returns></returns>
        public static string CreateControl(string elementName, Dictionary<string, string> attrs)
        {
            var factory = new CustomElementControlFactory();
            return factory.CreateControl(elementName, attrs);
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class CustomElementControlFactory
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="attrs"></param>
        /// <returns></returns>
        protected virtual string BuildAttributes(Dictionary<string, string> attrs)
        {
            var attributes = string.Empty;
            if (!attrs.IsNull())
            {
                attrs.Each(o =>
                {
                    if (!o.Key.IsNullOrEmpty() && o.Key != "InnerHTML")
                    {
                        if (!o.Value.IsNullOrEmpty())
                            attributes += $"{o.Key}=\"{o.Value}\" ";
                        else
                            attributes += o.Key + " ";
                    }
                });
            }
            return attributes;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="elementName"></param>
        /// <param name="attributes"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        protected virtual string BuildElement(string elementName, string attributes = "", string content = "")
        {
            return $"<{elementName} {attributes}>{content}</{elementName}>";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="elementName"></param>
        /// <param name="attrs"></param>
        /// <returns></returns>
        protected virtual string BuildContent(string elementName, Dictionary<string, string> attrs)
        {
            return attrs.ContainsKey("InnerHTML") ? attrs["InnerHTML"] : string.Empty;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="elementName"></param>
        /// <param name="attrs"></param>
        /// <returns></returns>
        public virtual string CreateControl(string elementName, Dictionary<string, string> attrs)
        {
            var attributes = BuildAttributes(attrs);
            var content = BuildContent(elementName,attrs);

            return BuildElement(elementName, attributes, content);
        }
    }
}