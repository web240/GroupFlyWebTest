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
    /// 
    /// </summary>
    public class ObjektReferencedViewModel : BaseViewModel
    {

        /// <summary>
        /// 引用实体所属类
        /// </summary>
        public string RefKlass { get; set; }

        /// <summary>
        /// 引用实体
        /// </summary>
        public string RefObjekt { get; set; }

        /// <summary>
        /// 引用属性
        /// </summary>
        public string RefProperty { get; set; }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToJson()
        {
            var obj = new StringBuilder("{");

            obj.Append("\"RefKlass\" :" + RefKlass);
            obj.Append(", \"RefObjekt\" :" + RefObjekt);
            obj.Append(", \"RefProperty\" :" + RefProperty);
            obj.Append("}");

            return obj.ToString();
        }
    }
}