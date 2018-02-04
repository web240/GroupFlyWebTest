using System;
using System.Collections.Generic;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     前端文件
    /// </summary>
    public class FeFile
    {
        /// <summary>
        /// </summary>
        /// <param name="fileId"></param>
        public FeFile(string fileId) : this(ObjektFactory.Find<File>(fileId))
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="file"></param>
        public FeFile(File file)
        {
            File = file;
        }

        /// <summary>
        ///     获取文件对象
        /// </summary>
        public File File { get; }

        /// <summary>
        ///     当前文件是否为图片包
        /// </summary>
        public bool IsImagePack
        {
            get
            {
                if (File.IsDirectory && File.Name.EndsWith(".feimgpack"))
                {
                    return true;
                }

                return false;
            }
        }

        /// <summary>
        ///     希望宽度，图片缩放时，希望缩放为300*300的尺寸，但为了规避不失真，实际尺寸并不是希望的尺寸。
        ///     实际尺寸可查看文件中的width和height
        /// </summary>
        public int? HopeWidth { get; set; }

        /// <summary>
        ///     希望高度，图片缩放时，希望缩放为300*300的尺寸，但为了规避不失真，实际尺寸并不是希望的尺寸。
        ///     实际尺寸可查看文件中的width和height
        /// </summary>
        public int? HopeHeight { get; set; }

        /// <summary>
        ///     获取图片包中原图文件
        /// </summary>
        /// <returns></returns>
        public File SourceImageFile()
        {
            if (!IsImagePack)
            {
                throw new Exception("当前文件并不是图片包");
            }

            var fileName = File.Name.Substring(0, File.Name.Length - 10);
            var sql = "\"parent\" = '" + File.Id + "' and \"name\" = '" + fileName + "'";

            var oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File), new WhereClause(sql));
            return oc.GetSingleResult();
        }

        /// <summary>
        ///     获取图片包中所有尺寸图片列表
        /// </summary>
        /// <returns></returns>
        public List<FeFile> ImageSizeList()
        {
            var list = new List<FeFile>();
            File sourceFile = SourceImageFile();

            if (sourceFile != null)
            {

                foreach (var childrenFile in File.GetChildrenFiles())
                {
                    //a_600_600.jpg
                    //先去掉后缀名
                    var fileName = childrenFile.Name;
                    fileName = fileName.Substring(0, fileName.Length - childrenFile.ExtensionName.Length - 1);
                    int? width = null;
                    int? height = null;
                    int size;

                    //确保文件名一致
                    var sourceName = sourceFile.Name;
                    sourceName = sourceName.Substring(0, sourceName.Length - sourceFile.ExtensionName.Length - 1);

                    if (fileName.StartsWith(sourceName))
                    {
                        fileName = fileName.Substring(sourceName.Length);

                        //以_分隔，取得数组最后2个，如果可以被转换为整数或为*号，就认为是当前图片的缩放尺寸
                        var tmp = fileName.Split(new string[] {"_"}, StringSplitOptions.RemoveEmptyEntries);

                        if (tmp.Length == 2)
                        {
                            if (tmp[tmp.Length - 2] == "*")
                            {
                                width = -1;
                            }
                            else if (int.TryParse(tmp[tmp.Length - 2], out size))
                            {
                                width = size;
                            }

                            if (tmp[tmp.Length - 1] == "*")
                            {
                                height = -1;
                            }
                            else if (int.TryParse(tmp[tmp.Length - 1], out size))
                            {
                                height = size;
                            }

                            if (width != null && height != null)
                            {
                                list.Add(new FeFile(childrenFile)
                                {
                                    HopeWidth = width,
                                    HopeHeight = height
                                });
                            }
                        }

                    }

                }

            }

            return list;
        }
    }
}