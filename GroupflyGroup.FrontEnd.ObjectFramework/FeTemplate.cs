using System;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     模板
    /// </summary>
    [Serializable]
    public class FeTemplate : Objekt
    {
        /// <summary>
        ///     模板名称
        /// </summary>
        public string Name
        {
            get { return GetProperty<string>(FePropertyNames.name); }
            set { SetProperty(FePropertyNames.name, value); }
        }

        /// <summary>
        ///     模板描述
        /// </summary>
        public string Description
        {
            get { return GetProperty<string>(FePropertyNames.description); }
            set { SetProperty(FePropertyNames.description, value); }
        }

        /// <summary>
        ///     模板包对应的文件目录
        /// </summary>
        public File Directory
        {
            get { return GetProperty<File>(FePropertyNames.directory); }
            set { SetProperty(FePropertyNames.directory, value); }
        }

        /// <summary>
        ///     template
        /// </summary>
        public Value Type
        {
            get { return GetProperty<Value>(FePropertyNames.type); }
            set { SetProperty(FePropertyNames.type, value); }
        }

        /// <summary>
        ///     isDefault
        /// </summary>
        public bool IsDefault
        {
            get { return GetProperty<bool>(FePropertyNames.isDefault); }
            set { SetProperty(FePropertyNames.isDefault, value); }
        }

        /// <summary>
        ///     isEnable
        /// </summary>
        public bool IsEnable
        {
            get { return GetProperty<bool>(FePropertyNames.isEnable); }
            set { SetProperty(FePropertyNames.isEnable, value); }
        }

        /// <summary>
        ///     备份源
        /// </summary>
        public FeTemplate BackupSource
        {
            get { return GetProperty<FeTemplate>(FePropertyNames.backupSource); }
            set { SetProperty(FePropertyNames.backupSource, value); }
        }

        /// <summary>
        ///     是否为系统默认模板，系统默认模板不允许删除
        /// </summary>
        public bool IsSystemTemplate
        {
            get { return GetProperty<bool>(FePropertyNames.isSystemTemplate); }
            set { SetProperty(FePropertyNames.isSystemTemplate, value); }
        }

        /// <summary>
        /// 删除模板
        /// </summary>
        public override void BeforeDelete()
        {
            if (this.IsSystemTemplate) {
                throw new Exception("系统预设模板，不能删除");
            }
            base.BeforeDelete();
        }
    }
}