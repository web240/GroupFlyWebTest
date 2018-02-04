using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models.DataModel
{
    /// <summary>
    /// 对象集合数据模型
    /// </summary>
    public class ObjektCollectionDataModel
    {

        /// <summary>
        /// 对象集合
        /// </summary>
        public List<object> objekts { get; set; } = new List<object>();

        /// <summary>
        /// 当前页数（从1开始）
        /// </summary>
        public int pageIndex { get; set; } = 1;

        /// <summary>
        /// 每页条数
        /// </summary>
        public int pageSize { get; set; }

        /// <summary>
        /// 查询总条数
        /// </summary>
        public long total { get; set; }

        /// <summary>
        /// 排序属性
        /// </summary>
        public string orderBy { get; set; }

        /// <summary>
        /// 是否升序
        /// </summary>
        public bool isAsc { get; set; }
    }
}