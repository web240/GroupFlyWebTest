using GroupflyGroup.Platform.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    public class FrontEndLoginViewModel: BaseViewModel
    {
        /// <summary>
        ///     模板根目录的路径
        /// </summary>
        public string TemplateDirectoryPath { get; set; }

        /// <summary>
        /// 前台LogoID
        /// </summary>
        public string LogoId { get; set; }
    }
}