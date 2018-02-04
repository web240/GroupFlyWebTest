using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;


namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    /// SEO关键字
    /// </summary>
    [Serializable]
    public class FeSeoKey : Objekt
    {

        /// <summary>
        /// SEO关键字
        /// </summary>
        public string Key
        {
            get
            {
                return GetProperty<string>(FePropertyNames.key);
            }
            set
            {
                SetProperty(FePropertyNames.key, value);
            }
        }

        /// <summary>
        /// 查询seo关键字。
        /// 根据value模糊查询。
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static List<FeSeoKey> FindSeoKes(string value)
        {

            ObjektCollection<FeSeoKey> oc = new ObjektCollection<FeSeoKey>(Klass.ForId(FeKlassIDs.FeSeoKey), new WhereClause("\"key\" like '%" + value + "%'"));

            return oc.ToList();

        }

        /// <summary>
        /// 设置指定对象的seo关键字。
        /// </summary>
        /// <param name="keys"></param>
        /// <param name="relationshipName"></param>
        /// <param name="sourceId"></param>
        public static void SetObjektSeo(List<string> keys, string relationshipName, string sourceId)
        {

            List<FeSeoKey> entityKeys = new List<FeSeoKey>();

            //遍历所有设定的key
            foreach (var key in keys)
            {

                //以key为关键字查询所有seo关键字。
                FeSeoKey entity = new ObjektCollection<FeSeoKey>(Klass.ForId(FeKlassIDs.FeSeoKey), new WhereClause("\"" + FePropertyNames.key + "\" = '" + key + "'")).TryGetSingleResult();

                //如果是新的key，先保存。
                if (entity == null)
                {
                    entity = new FeSeoKey();
                    entity.Key = key;
                    entity.Save();
                }

                //判断重复。
                var query = from t in entityKeys
                            where t.Key == entity.Key
                            select t;

                if (query.Count() == 0)
                {
                    entityKeys.Add(entity);
                }

            }

            //找到source对象。
            Objekt objekt = ObjektFactory.Find(sourceId);

            //找到source对象与seo关联roc集合。
            List<RelationshipObjekt> relationshipList = objekt.ROCC.GetROC(relationshipName).ToList();

            List<RelationshipObjekt> deleteList = new List<RelationshipObjekt>();

            //检查关联
            foreach (var item in relationshipList)
            {

                var existQuery = from t in entityKeys
                    where t.Id == item.Related.Id
                    select t;

                //如果不存在，需要删除原有关系/
                if (existQuery.Count() == 0)
                {
                    deleteList.Add(item);
                }

            }

            foreach (var deleteItem in deleteList)
            {
                deleteItem.Delete();
                deleteItem.Save();
            }

            //再设置新的seo关联。
            foreach (var item in entityKeys)
            {

                var existQuery = from t in relationshipList
                    where t.Related.Id == item.Id
                    select t;

                if (existQuery.Count() == 0)
                {
                    RelationshipObjekt relationship = ObjektFactory.New<RelationshipObjekt>(Klass.ForName(relationshipName));
                    relationship.Source = objekt;
                    relationship.Related = item;
                    relationship.Save();
                }

            }

        }

    }
}
