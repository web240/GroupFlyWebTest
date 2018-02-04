using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 部件视图模型
    /// </summary>
    public class WidgetViewModel
    {
       /// <summary>
       /// ID
       /// </summary>
       public string Id { get; set; }
       /// <summary>
       /// 部件标题
       /// </summary>
       public string Title { get; set; }   

       /// <summary>
       ///是否可最大化
       /// </summary>
       public bool IsMaximizable { get; set; }

       /// <summary>
       /// 是否可关闭
       /// </summary>
       public bool IsClosable { get; set; }

       
       /// <summary>
       /// 部件菜单集合
       /// </summary>
       public List<WidgetMenuItemViewModel> ListWidgetMenuItem { get;set;}

        /// <summary>
        /// 是否是自己的小部件
        /// </summary>
        public bool IsOwnWidget { get; set; }
    }
}