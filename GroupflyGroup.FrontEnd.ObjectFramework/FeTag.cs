using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Persistence;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    /// 标签
    /// </summary>
    [Serializable]
    public class FeTag : Objekt
    {
        /// <summary>
        /// 标签名称
        /// </summary>
        public string Tag
        {
            get
            {
                return GetProperty<string>(FePropertyNames.tag);
            }
            set
            {
                SetProperty(FePropertyNames.tag, value);
            }
        }
        /// <summary>
        /// 标签来源
        /// </summary>
        public Value From
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.@from);
            }
            set
            {
                SetProperty(FePropertyNames.@from, value);
            }
        }



        /// <summary>
        /// 保存前操作
        /// </summary>
        public override void BeforeSave()
        {
            base.BeforeSave();
         
        }


        /// <summary>
        /// 查询Tag名称是否存在
        /// </summary>
        /// <param name="tag">Tag名称</param>
        /// <returns>true存在,false不存在</returns>
        public bool CheckTagIsExit(string tag)
        {
            var oc = new ObjektCollection<Objekt>(Klass.ForId(FeKlassIDs.FeTag), new WhereClause("\"" + FePropertyNames.tag + "\" = '" + tag + "'"));
            if (oc != null)
            {
                return true;
            }
            else
            {
                return false;
            }




          

        }

        /// <summary>
        /// 查询tag关键字。
        /// 根据value模糊查询。
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static List<FeTag> FindTags(string value)
        {

            ObjektCollection<FeTag> oc = new ObjektCollection<FeTag>(Klass.ForId(FeKlassIDs.FeTag), new WhereClause("\"" + FePropertyNames.tag + "\" like '%" + value + "%'"));
          
            return oc.ToList();

        }

        /// <summary>
        /// 设置指定对象的seo关键字。
        /// </summary>
        /// <param name="tags"></param>
        /// <param name="relationshipName"></param>
        /// <param name="sourceId"></param>
        public static void SetObjektTag(List<string> tags, string relationshipName, string sourceId)
        {

            List<FeTag> entityTags = new List<FeTag>();

            //遍历所有设定的key
            foreach (var tag in tags)
            {

                //以key为关键字查询所有seo关键字。
                FeTag entity = new ObjektCollection<FeTag>(Klass.ForId(FeKlassIDs.FeTag), new WhereClause("\"" + FePropertyNames.tag + "\" = '" + tag + "'")).TryGetSingleResult();

                //如果是新的key，先保存。
                if (entity == null)
                {
                    entity = new FeTag();
                    entity.Tag = tag;
                    entity.From= ObjektFactory.Find<Value>(FeValueIDs.FeTagSource_Auto);
                    entity.Save();
                }

                //判断重复。
                var query = from t in entityTags
                            where t.Tag == entity.Tag
                            select t;

                if (query.Count() == 0)
                {
                    entityTags.Add(entity);
                }

            }

            //找到source对象。
            Objekt objekt = ObjektFactory.Find(sourceId);

            //找到source对象与seo关联roc集合。
            List<RelationshipObjekt> relationshipList = objekt.ROCC.GetROC(relationshipName).ToList();

            //删除所有关联
            foreach (var item in relationshipList)
            {
                item.Delete();
                item.Save();
            }

            //再设置新的seo关联。
            foreach (var item in entityTags)
            {

                RelationshipObjekt relationship = ObjektFactory.New<RelationshipObjekt>(Klass.ForName(relationshipName));
                relationship.Source = objekt;
                relationship.Related = item;
                relationship.Save();

            }

        }
    }
}
