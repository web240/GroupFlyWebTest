using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Extension;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Common;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
using System.Linq.Expressions;
using System.Text;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Hook
{
    /// <summary>
    /// 
    /// </summary>
    [Export(typeof(AfterUpdateHook))]
    public class WebAfterUpdateHook : AfterUpdateHook
    {
        public override int Order
        {
            get { return 100; }
        }
        public override string Description
        {
            get { return ""; }
        }
        /// <summary>
        /// 对象保存后事件
        /// </summary>
        /// <param name="e"></param>
        public override bool DoAfter(HookContext context)
        {
            var objekt = context.Parameter as Objekt;
            var klass = objekt.Klass;
            var properties = klass.PropertyMetadata;
            string strPropertyVal = string.Empty;
            bool ret = false;
            foreach (var item in properties)
            {
                var property = item as Property;

                if ((property.DataTypeId == DataType.TEXT || property.DataTypeId == DataType.STRING)
                    && property.IsRichText && objekt.IsModifiedProperty(property.Name))
                {
                    strPropertyVal = objekt.GetProperty<string>(property.Name);
                    objekt.SaveObjektRichTextRefFile(strPropertyVal);
                    ret = true;
                }
                if (property.DataTypeId == DataType.BINARY && property.IsRichText && objekt.IsModifiedProperty(property.Name))
                {
                    Stream s = objekt.GetProperty<Stream>(property.Name);
                    if (s != null)
                    {
                        byte[] t = s.ToBytes();
                        strPropertyVal = Encoding.UTF8.GetString(t, 0, t.Length);
                        objekt.SaveObjektRichTextRefFile(strPropertyVal);
                        ret = true;
                    }
                }
            }
            return ret;
        }
    }
}