using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FeTagModel
    {
        public string ID { get; set; }

        /// <summary>
        /// 标签名称
        /// </summary>
        public string Tag { get; set; }
        /// <summary>
        /// 标签来源
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        public string Creater { get; set; }

        /// <summary>
        /// 修改人
        /// </summary>
        public string Modifier { get; set; }

        /// <summary>
        /// 添加时间
        /// </summary>
        public string CreateTime { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public string ModifyTime { get; set; }

    }
}