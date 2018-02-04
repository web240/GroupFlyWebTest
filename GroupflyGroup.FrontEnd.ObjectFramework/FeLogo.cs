using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     LOGO
    /// </summary>
    public class FeLogo : Objekt
    {
        /// <summary>
        ///     LOGO对象的名称
        /// </summary>
        public string Name
        {
            get { return GetProperty<string>(FePropertyNames.name); }
            set { SetProperty(FePropertyNames.name, value); }
        }

        /// <summary>
        ///     LOGO图像文件
        /// </summary>
        public File ImageFile
        {
            get { return GetProperty<File>(FePropertyNames.imageFile); }
            set { SetProperty(FePropertyNames.imageFile, value); }
        }

        /// <summary>
        ///     LOGO中的文本标签
        /// </summary>
        public string Label
        {
            get { return GetProperty<string>(FePropertyNames.label); }
            set { SetProperty(FePropertyNames.label, value); }
        }

        /// <summary>
        ///     点击LOGO图片后跳转链接的url
        /// </summary>
        public string Link
        {
            get { return GetProperty<string>(FePropertyNames.link); }
            set { SetProperty(FePropertyNames.link, value); }
        }
    }
}