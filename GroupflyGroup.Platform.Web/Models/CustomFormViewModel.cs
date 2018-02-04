using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using EB.Common;
using EB.Common.QueryBuilder;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 对象列表模型
    /// </summary>
    public class CustomFormViewModel : BaseViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        public CustomFormViewModel()
        {

        }

 

        #region 控件属性

        /// <summary>
        /// 是否分页
        /// </summary>
        public bool Pagination { get; set; } = true;

        /// <summary>
        /// 
        /// </summary>
        public string Width { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Height { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Title { get; set; }

        #endregion

        #region 模型属性

        /// <summary>
        /// 
        /// </summary>
        public string ObjektId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ViewId { get; set; }


        #endregion

        #region 方法


        
        #endregion

    }
}