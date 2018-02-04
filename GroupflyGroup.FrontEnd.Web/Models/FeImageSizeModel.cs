using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FeImageSizeModel: BaseViewModel
    {
        public string ID { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string TypeName { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 裁切类型
        /// </summary>
        public string CutType { get; set; }

        /// <summary>
        /// 尺寸名称
        /// </summary>
        public string SizeName { get; set; }
        /// <summary>
        /// 高度
        /// </summary>
        public int Height { get; set; }

        /// <summary>
        /// 宽度
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        public string Creator { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreatedOn { get; set; }



    }
}