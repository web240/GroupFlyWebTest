using System;
using System.Collections.Generic;
using System.Linq;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///     文章属性（特征），如“热点”、“头条”、“推荐”
    /// </summary>
    [Serializable]
    public class FeCharacter : Objekt
    {
        /// <summary>
        ///     文章属性的名称
        /// </summary>
        public string Name
        {
            get { return GetProperty<string>(FePropertyNames.name); }
            set { SetProperty(FePropertyNames.name, value); }
        }

        /// <summary>
        ///     文章属性的显示内容
        /// </summary>
        public string Label
        {
            get { return GetProperty<string>(FePropertyNames.label); }
            set { SetProperty(FePropertyNames.label, value); }
        }

        /// <summary>
        ///     文章属性的排序序号
        /// </summary>
        public decimal? SortOrder
        {
            get { return GetProperty<decimal?>(FePropertyNames.sortOrder); }
            set { SetProperty(FePropertyNames.sortOrder, value); }
        }

        /// <summary>
        ///     Font Awesome字体图标名称
        /// </summary>
        public string Icon
        {
            get { return GetProperty<string>(PropertyNames.faIcon); }
            set { SetProperty(PropertyNames.faIcon, value); }
        }

        /// <summary>
        /// 大图标
        /// </summary>
        public File BigIcon
        {
            get { return GetProperty<File>(FePropertyNames.bigIcon); }
            set { SetProperty(FePropertyNames.bigIcon, value); }
        }

        /// <summary>
        /// 小图标
        /// </summary>
        public File SmallIcon
        {
            get { return GetProperty<File>(FePropertyNames.smallIcon); }
            set { SetProperty(FePropertyNames.smallIcon, value); }
        }

        /// <summary>
        ///     文章属性是否在前台显示
        /// </summary>
        public bool IsDisplay
        {
            get { return GetProperty<bool>(FePropertyNames.isDisplay); }
            set { SetProperty(FePropertyNames.isDisplay, value); }
        }


        /// <summary>
        ///     创建新增对象排序。
        /// </summary>
        /// <returns></returns>
        public static decimal NewSortOrder()
        {
            var oc = new ObjektCollection<FeCharacter>(
                Klass.ForId(FeKlassIDs.FeCharacter),
                new WhereClause("\"sortOrder\" is not null")
                );
            oc.OrderByClause.Add(new OrderByCell(PropertyNames.sortOrder, Order.Desc));
            var character = oc.FirstOrDefault();

            var sort = 1;

            if (character != null && character.IsExists() && character.SortOrder.HasValue)
            {
                sort = (int) character.SortOrder.Value;
                sort++;
            }

            return sort;
        }


        /// <summary>
        ///     设置指定对象的属性。
        /// </summary>
        /// <param name="characters"></param>
        /// <param name="relationshipName"></param>
        /// <param name="sourceId"></param>
        public static void SetObjektCharacter(List<string> characters, string relationshipName, string sourceId)
        {
            //找到source对象。
            var objekt = ObjektFactory.Find(sourceId);

            //找到source对象与seo关联roc集合。
            var relationshipList = objekt.ROCC.GetROC(relationshipName).ToList();

            //删除所有关联
            foreach (var item in relationshipList)
            {
                item.Delete();
                item.Save();
            }

            //再设置新的seo关联。
            foreach (var characterId in characters)
            {
                var relationship = ObjektFactory.New<RelationshipObjekt>(Klass.ForName(relationshipName));
                relationship.Source = objekt;
                relationship.Related = ObjektFactory.Find(characterId);
                relationship.Save();
            }
        }

        /// <summary>
        /// 删除属性时 删除文章属性表
        /// </summary>
        public override void BeforeDelete()
        {
            ObjektCollection<FeArticleCharacter> articleCharcter = new ObjektCollection<FeArticleCharacter>(Klass.ForId(FeKlassIDs.FeArticleCharacter), new WhereClause("\"related\"='" + this.Id + "'"));
            articleCharcter.DeleteAll();

            base.BeforeDelete();
        }
    }
}