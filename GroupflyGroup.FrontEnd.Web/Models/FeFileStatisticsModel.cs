using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FeFileStatisticsModel
    {
        /// <summary>
        /// 统计日期
        /// </summary>
        public string CreateOn { get; set; }
        /// <summary>
        /// 某一天的文件个数
        /// </summary>
        public int FileCount { get; set; }
        /// <summary>
        /// 某一天的文件大小
        /// </summary>
        public int FileSumSize { get; set; }
        ///// <summary>
        ///// 整个服务器上总的文件大小
        ///// </summary>
        //public int SumSize { get; set; }
        ///// <summary>
        ///// 整个服务器上总的文件个数
        ///// </summary>
        //public int SumCount { get; set; }
        /// <summary>
        /// 某一天上传的文件个数增量
        /// </summary>
        public int CurrtRealCount { get; set; }
        /// <summary>
        /// 某一天上传的文件大小增量
        /// </summary>
        public int CurrtRealSize { get; set; }
    }
}