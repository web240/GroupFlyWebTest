using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FeFileModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 文件夹名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 父级
        /// </summary>
        public string _parentId { get; set; }


        /// <summary>
        /// 文件图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 文件类型图标
        /// </summary>
        public string FaIcon { get; set; }

        /// <summary>
        /// 添加人
        /// </summary>
        public string Creator { get; set; }
        /// <summary>
        /// 添加时间
        /// </summary>
        public string CreateOn { get; set; }

        /// <summary>
        ///大小
        /// </summary>
        public string Size { get; set; }

        /// <summary>
        ///扩展名称
        /// </summary>
        public string ExtensionName { get; set; }


        /// <summary>
        /// 删除时间
        /// </summary>
        public string ModifiedOn { get; set; }

        /// <summary>
        /// 尺寸
        /// </summary>
        public string HeightXWidth { get; set; }

    }
}