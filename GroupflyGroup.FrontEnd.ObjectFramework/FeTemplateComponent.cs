using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     模板组件
    /// </summary>
    public class FeTemplateComponent : Objekt
    {
        /// <summary>
        ///     组件标签名
        /// </summary>
        public string TagName
        {
            get { return GetProperty<string>(FePropertyNames.tagName); }
            set { SetProperty(FePropertyNames.tagName, value); }
        }

        /// <summary>
        ///     组件路径
        /// </summary>
        public string DirectoryPath
        {
            get { return GetProperty<string>(FePropertyNames.directoryPath); }
            set { SetProperty(FePropertyNames.directoryPath, value); }
        }

        /// <summary>
        ///     组件分类
        /// </summary>
        public Value Category
        {
            get { return GetProperty<Value>(FePropertyNames.category); }
            set { SetProperty(FePropertyNames.category, value); }
        }

        /// <summary>
        /// 父亲组件
        /// </summary>
        public FeTemplateComponent BaseComponent {
            get
            {
                return GetProperty<FeTemplateComponent>(FePropertyNames.baseComponent);
            }
            set
            {
                SetProperty(FePropertyNames.baseComponent, value);
            }
        }

    }
}