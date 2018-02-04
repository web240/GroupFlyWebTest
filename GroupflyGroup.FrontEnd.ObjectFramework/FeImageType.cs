using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Linq;
using System.Text;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    /// 频道
    /// </summary>
    [Serializable]
    public class FeImageType : Objekt
    {

        /// <summary>
        /// 频道名称。
        /// </summary>
        public string Name
        {
            get
            {
                return GetProperty<string>(FePropertyNames.name);
            }
            set
            {
                SetProperty(FePropertyNames.name, value);
            }
        }

        /// <summary>
        /// 频道绑定的文章分类
        /// </summary>
        public string Description
        {
            get
            {
                return GetProperty<string>(FePropertyNames.description);
            }
            set
            {
                SetProperty(FePropertyNames.description, value);
            }
        }

    }
}
