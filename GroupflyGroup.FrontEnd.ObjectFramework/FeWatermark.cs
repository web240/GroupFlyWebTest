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
    public class FeWatermark : Objekt
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
        /// 水印类型
        /// </summary>
        public Value Type
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.type);
            }
            set
            {
                SetProperty(FePropertyNames.type, value);
            }
        }


        /// <summary>
        /// 文字内容
        /// </summary>
        public string Text
        {
            get
            {
                return GetProperty<string>(FePropertyNames.text);
            }
            set
            {
                SetProperty(FePropertyNames.text, value);
            }
        }

        /// <summary>
        /// 文字字体
        /// </summary>
        public Value Font
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.font);
            }
            set
            {
                SetProperty(FePropertyNames.font, value);
            }
        }


        /// <summary>
        /// 字体大小
        /// </summary>
        public Value FontSize
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.fontSize);
            }
            set
            {
                SetProperty(FePropertyNames.fontSize, value);
            }
        }

        /// <summary>
        /// 字体颜色
        /// </summary>
        public string FontColor
        {
            get
            {
                return GetProperty<string>(FePropertyNames.fontColor);
            }
            set
            {
                SetProperty(FePropertyNames.fontColor, value);
            }
        }


        /// <summary>
        /// 字体透明度
        /// </summary>
        public int Transparency
        {
            get
            {
                return GetProperty<int>(FePropertyNames.transparency);
            }
            set
            {
                SetProperty(FePropertyNames.transparency, value);
            }
        }

        /// <summary>
        /// 字体显示位置
        /// </summary>
        public Value Location
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.location);
            }
            set
            {
                SetProperty(FePropertyNames.location, value);
            }
        }


        /// <summary>
        /// 是否启用
        /// </summary>
        public bool Enabled
        {
            get
            {
                return GetProperty<bool>(FePropertyNames.enabled);
            }
            set
            {
                SetProperty(FePropertyNames.enabled, value);
            }
        }

        /// <summary>
        /// 水印图片
        /// </summary>
        public File imageFile
        {
            get
            {
                return GetProperty<File>(FePropertyNames.imageFile);
            }
            set
            {
                SetProperty(FePropertyNames.imageFile, value);
            }
        }

    }

}
