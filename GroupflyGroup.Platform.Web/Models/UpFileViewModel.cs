using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 文件上传组件模型
    /// </summary>
    public class UpFileViewModel:BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string ButtoonName { get; set; }
        public string ButtoonCss { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string DirectoryId { get; set; }
        public string DirectoryName
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(this.DirectoryId))
                {
                    ObjectFramework.File file = ObjektFactory.Find<ObjectFramework.File>(this.DirectoryId);
                    return file.Name;
                }
                return "";

            }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string DialogWidth { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string DialogHeight { get; set; }
        
        
    }
}