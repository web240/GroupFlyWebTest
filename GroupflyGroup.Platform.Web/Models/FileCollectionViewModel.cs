using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class FileCollectionViewModel : ObjektCollectionViewModel
    {

        /// <summary>
        /// 
        /// </summary>
        public FileCollectionViewModel(string klassName) : base(klassName)
        {
            FileModels.Add(new FileModel(FileIDs.root));
        }

        /// <summary>
        /// 
        /// </summary>
        public List<FileModel> FileModels { get; set; } = new List<FileModel>();
    }
}