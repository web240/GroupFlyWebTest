using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Models.DataModel
{
    /// <summary>
    /// 对象数据模型
    /// </summary>
    public class ObjektDataModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 对象状态
        /// </summary>
        public string ObjektState { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToJson()
        {
            return $"{{ \"id\" : \"{this.id}\", \"$\" : \"{this.ObjektState}\" }}";
        }
    }
    
}