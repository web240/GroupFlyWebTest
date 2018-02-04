using System;
using System.ComponentModel.DataAnnotations;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.FrontEnd.Web.Models
{
    /// <summary>
    ///     frontend层datagrid数据项
    /// </summary>
    [Serializable]
    public class FeDataGridItemViewModel
    {
        /// <summary>
        ///     实例化
        /// </summary>
        public FeDataGridItemViewModel()
        {
        }

        /// <summary>
        ///     通过file对象实例化
        /// </summary>
        /// <param name="file"></param>
        public FeDataGridItemViewModel(File file)
        {
            Id = file.Id;
            Name = file.Name;
            IsDirectory = file.IsDirectory;
            FileSize = file.Size.ToString();
            Creator = file.Creator.Name;
            CreateOn = file.CreatedOn;
            Width = file.Width;
            Height = file.Height;

            if (file.FileType != null && file.FileType.IsExists())
            {
                FileType = file.FileType.Name;
            }

            if (!IsDirectory)
            {
                Icon = file.PathName;
            }

            if (FeFileIDs.FeLockFiles.Contains(Id))
            {
                IsLock = true;
            }
            else
            {
                IsLock = false;
            }
        }

        /// <summary>
        /// 图片的宽
        /// </summary>
        public int? Width { get; set; }

        /// <summary>
        /// 图片的高
        /// </summary>
        public int? Height { get; set; }

        /// <summary>
        ///     文件id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///     文件名
        /// </summary>
        [Display(Name = "名称")]
        public string Name { get; set; }

        /// <summary>
        ///     是否为目录
        /// </summary>
        public bool IsDirectory { get; set; }

        /// <summary>
        ///     是否显示锁图标
        /// </summary>
        public bool IsLock { get; set; }

        /// <summary>
        ///     文件图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 字体图标
        /// </summary>
        public string FaIcon { get; set; }

        /// <summary>
        ///     是否显示为图片视图
        /// </summary>
        public bool IsShowImageView { get; set; }

        /// <summary>
        ///     是否被引用过
        /// </summary>
        public bool IsRef { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        public string FileType { get; set; }

        /// <summary>
        /// 尺寸
        /// </summary>
        public string ImageSize { get; set; }

        /// <summary>
        /// 大小
        /// </summary>
        public string FileSize { get; set; }

        /// <summary>
        /// 引用次数
        /// </summary>
        public long RefCount {
            get; set;
        }

        /// <summary>
        /// 上传者
        /// </summary>
        public string Creator { get; set; }

        /// <summary>
        /// 上传时间
        /// </summary>
        public DateTime? CreateOn { get; set; }

    }
}