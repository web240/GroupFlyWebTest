using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;
using File = GroupflyGroup.Platform.ObjectFramework.File;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class FileModel : TreeModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        public FileModel(File file) : base(file)
        {
            this.isDirectory = file.IsDirectory;
            this.state = isDirectory ? "closed" : "open";
            this.PathName = file.PathName;
            this.ExtensionName = file.ExtensionName;
            this.FileName = file.Name;
            this.iconCls = file.FileType.FaIcon;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        public FileModel(string id) : base(id)
        {
            var file = Entity as File;
            this.isDirectory = file.IsDirectory;
            this.state = isDirectory ? "closed" : "open";
            this.PathName = file.PathName;
            this.ExtensionName = file.ExtensionName;
            this.FileName = file.Name;
            this.iconCls = file.FileType.FaIcon;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="postedFile"></param>
        public FileModel(HttpPostedFileBase postedFile)
        {
            var file = ObjektFactory.New<File>(KlassIDs.File);
            file.FileContent = postedFile.InputStream;
            file.Name = postedFile.FileName;
            file.IsDirectory = false;
            file.Description = "文件列表上传";

            Entity = file;
        }

        /// <summary>
        /// 
        /// </summary>
        public FileModel()
        {

        }


        /// <summary>
        /// 
        /// </summary>
        public List<FileModel> children { get; set; } = new List<FileModel>();

        /// <summary>
        /// 
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string PathName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ExtensionName { get; set; }
        

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Stream GetFileContent(string id)
        {
            var file = ObjektFactory.Find<File>(id);

            if (file.IsDirectory)
                return new MemoryStream();
            Stream fileContent = null;

            while (file.IsLink)
                file = file.Linked;

            if (file.CanRead())
                fileContent = file.GetProperty<Stream>(PropertyNames.fileContent);

            return fileContent.IsNull() ? new MemoryStream() : fileContent;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetMimeType(string id)
        {
            var entity = ObjektFactory.Find<File>(id);
            if (entity.IsNull())
                return string.Empty;

            return Common.Common.GetMimeType(entity.ExtensionName);
        }

        /// <summary>
        /// 
        /// </summary>
        public override void GetChildren()
        {
            if (this.isDirectory)
            {
                var file = this.Entity as File;

                var subFiles = file.GetChildrenDirectorys();

                foreach (var subfile in subFiles)
                {
                    var model = new FileModel(subfile);
                    if (subfile.GetChildrenDirectorys().Count == 0)
                    {
                        model.state = "open";
                    }
                    this.children.Add(model);

                }
                if (this.children.Count == 0)
                    this.state = "open";
            }
        }

        /// <summary>
        /// 上传文件
        /// </summary>
        /// <param name="directoryId"></param>
        public void Upload(string directoryId)
        {
            if (directoryId.IsNullOrEmpty())
                directoryId = FileIDs.root;
            var file = Entity as File;
            file.Parent = ObjektFactory.Find<File>(directoryId);
            file.Save();
        }
    }
}