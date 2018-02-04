using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 查询参数
    /// </summary>
    public class QueryModel
    {
        /// <summary>
        /// 类名
        /// </summary>
        public string klass { get; set; }

        /// <summary>
        /// 是否包含子类实例
        /// </summary>
        public bool includeSubKlass { get; set; }

        /// <summary>
        /// 属性条件
        /// </summary>
        public List<QueryParamModel> param { get; set; } = new List<QueryParamModel>();

        /// <summary>
        /// 页数
        /// </summary>
        public int pageIndex { get; set; } = 1;

        /// <summary>
        /// 行数
        /// </summary>
        public int pageSize { get; set; } = 20;

        /// <summary>
        /// 排序属性名
        /// </summary>
        public string orderBy { get; set; } 

        /// <summary>
        /// 排序是否升序
        /// </summary>
        public bool isAsc { get; set; } 

        /// <summary>
        /// 附加属性（对象型属性的属性）
        /// </summary>
        public string relatedProperties { get; set; } = "";

        /// <summary>
        /// 筛选条件ID
        /// </summary>
        public string filter { get; set; } = "";
    }
}