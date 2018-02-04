using System.Collections.Generic;
using System.Web.Mvc;
using GroupflyGroup.FrontEnd.ObjectFramework;
using GroupflyGroup.FrontEnd.Web.Models;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;
using GroupflyGroup.Platform.Web.Models;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{
    /// <summary>
    ///     图片选择控件控制器
    /// </summary>
    public class FeImageSelectorController : Controller
    {
        /// <summary>
        ///     加载指定目录下载的所有子孙目录树
        /// </summary>
        /// <param name="directoryId"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DirectoryTree(string directoryId)
        {
            if (string.IsNullOrWhiteSpace(directoryId))
            {
                directoryId = FileIDs.root;
            }

            var directory = ObjektFactory.Find<File>(directoryId);

            var model = new FileModel(directory);

            //获取子孙目录
            GetDescendants(model);
            model.state = "open";
            model.iconCls = directory.FileType.FaIcon;

            var result = new List<FileModel>();
            result.Add(model);

            return Json(result);
        }

        private void GetChildren(FileModel model)
        {
            var klass = Klass.ForName(KlassNames.File);
            var condition = new WhereExpression<File>(klass);
            condition.Where(PropertyNames.parent, Const.Oper_Equals, model.id);
            condition.Where(PropertyNames.isTrash, Const.Oper_NotEquals, 1);
            condition.Where(PropertyNames.isdirectory, Const.Oper_Equals, 1);

            //临时替代方法，等下次版本更新需要换成不结束于.feimgpack的对象
            condition.Where(PropertyNames.name, Const.Oper_NotContains, ".feimgpack");

            var oc = new ObjektCollection<File>(klass, condition.ToWhereClause());

            foreach (var file in oc)
            {
                model.children.Add(new FileModel(file)
                {
                    iconCls = file.FileType.FaIcon
                });
            }
        }

        private void GetDescendants(FileModel model)
        {
            GetChildren(model);

            if (model.children.Count > 0)
            {
                model.state = "closed";

                foreach (var child in model.children)
                {
                    GetDescendants(child);
                }
            }
            else
            {
                model.state = "open";
            }
        }

        /// <summary>
        ///     获取指定目录下的图片，包括图片包
        /// </summary>
        /// <param name="directoryId"></param>
        /// <param name="imageName"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult ImageList(string directoryId,string imageName)
        {
            if (string.IsNullOrWhiteSpace(directoryId))
            {
                directoryId = FileIDs.root;
            }

            string sql = "\"parent\" = '" + directoryId +
                         "' and \"isTrash\" != 1 and (\"fileType\" in (select \"id\" from \"FileType\" where \"isImage\" = 1) or (\"isdirectory\" = 1 and \"name\" like '%.feimgpack' ))";

            if (!string.IsNullOrWhiteSpace(imageName))
            {
                sql = "{ fn LCASE(\"name\")} like '%" + imageName.ToLower() + "%' and " + sql;
            }

            var result = new List<FeImageViewerListItemViewModel>();
            var oc = new ObjektCollection<File>(Klass.ForId(KlassIDs.File),
                new WhereClause(sql));

            foreach (var file in oc)
            {
                var feFile = new FeFile(file);

                //如果是图片
                if (!feFile.IsImagePack)
                {

                    result.Add(new FeImageViewerListItemViewModel
                    {
                        Id = feFile.File.Id,
                        Name = feFile.File.Name,
                        ImageUrl = feFile.File.PathName,
                        Width = feFile.File.Width,
                        Height = feFile.File.Height,
                        IsImagePack = false
                    });
                }
                else
                {
                    var sourceImage = feFile.SourceImageFile();
                    var sizeList = feFile.ImageSizeList();

                    var item = new FeImageViewerListItemViewModel
                    {
                        Id = feFile.File.Id,
                        Name = sourceImage.Name,
                        ImageUrl = sourceImage.PathName,
                        SourceImageId = sourceImage.Id,
                        Width = sourceImage.Width,
                        Height = sourceImage.Height,
                        IsImagePack = true
                    };

                    foreach (var sizeItem in sizeList)
                    {
                        item.ImageSizeList.Add(new FeImageViewerListItemViewModel
                        {
                            Id = sizeItem.File.Id,
                            Name = sizeItem.File.Name,
                            ImageUrl = sizeItem.File.PathName,
                            Width = sizeItem.File.Width,
                            Height = sizeItem.File.Height,
                            IsImagePack = false,
                            HopeWidth = sizeItem.HopeWidth,
                            HopeHeight = sizeItem.HopeHeight
                        });
                    }

                    //如果是图片包
                    result.Add(item);
                }
            }

            return Json(result);
        }
    }
}