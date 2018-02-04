using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FeImageTypeModel 
    {
        public string ID { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 对应尺尺寸
        /// </summary>
        public List<FeImageSizeModel> listFeImageSize { get; set; }


    }
}