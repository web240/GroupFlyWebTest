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
    /// 图片尺寸
    /// </summary>
    [Serializable]
    public class FeImageSize : Objekt
    {

        /// <summary>
        /// 图片名称。
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
        /// 图片配置参数。
        /// </summary>
        public int Height
        {
            get
            {
                return GetProperty<int>(FePropertyNames.height);
            }
            set
            {
                SetProperty(FePropertyNames.height, value);
            }
        }




        /// <summary>
        /// 图片配置的宽度。
        /// </summary>
        public int Width
        {
            get
            {
                return GetProperty<int>(FePropertyNames.width);
            }
            set
            {
                SetProperty(FePropertyNames.width, value);
            }
        }


  


    }
}
