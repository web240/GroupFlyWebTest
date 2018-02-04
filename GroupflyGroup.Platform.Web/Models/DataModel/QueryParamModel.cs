using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class QueryParamModel
    {
        /// <summary>
        /// 公共查询条件类型
        /// </summary>
        private static readonly Dictionary<string, string> CommonClauseTypes = new Dictionary<string, string>
        {
            {Const.Oper_Equals, "\"{field}\" = ?"},
            {Const.Oper_NotEquals, "\"{field}\" <> ?"},
            {Const.Oper_IsNull, "\"{field}\" is null"},
            {Const.Oper_IsNotNull, "\"{field}\" is not null"},
            {Const.Oper_Greater, "\"{field}\" > ?"},
            {Const.Oper_GreaterOrEquals, "\"{field}\" >= ?"},
            {Const.Oper_Less, "\"{field}\" < ?"},
            {Const.Oper_LessOrEquals, "\"{field}\" <= ?"},
            {Const.Oper_Between, "\"{field}\" >= ? and \"{field}\" <= ?"},
            {Const.Oper_BetweenInner, "\"{field}\" > ? and \"{field}\" < ?"},
            {Const.Oper_Contains, "\"{field}\" like ?"},
            {Const.Oper_NotContains, "\"{field}\" not like ?"},
            {Const.Oper_BeginWith, "\"{field}\" like ?"},
            {Const.Oper_EndWith, "\"{field}\" like ?"},
            {Const.Oper_In, "\"{field}\" in (?)"}
        };

        /// <summary>
        /// 
        /// </summary>
        public string field { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 数据类型
        /// </summary>
        public string datatype { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public object value { get; set; }

        /// <summary>
        /// 大小写敏感
        /// </summary>
        public bool caseSensitive { get; set; } = true;

        /// <summary>
        /// string查询参数转换为查询表达式
        /// </summary>
        /// <returns></returns>
        public string ToStringWhereClause()
        {
            if (!this.caseSensitive)
            {
                this.value = this.value.ToString().ToLower();
            }
            switch (this.type)
            {
                case Const.Oper_Contains:
                case Const.Oper_NotContains:
                    this.value = "%" + this.value + "%";
                    break;
                case Const.Oper_BeginWith:
                    this.value = this.value + "%";
                    break;
                case Const.Oper_EndWith:
                    this.value = "%" + this.value;
                    break;
            }
            return this.ToWhereClause();
        }

        /// <summary>
        /// 查询参数转换为查询表达式
        /// </summary>
        /// <returns></returns>
        public string ToWhereClause()
        {
            if (this.type == Const.Oper_In)
            {
                return this.ToInWhereClause();
            }
            var isNotCaseSensitive = !caseSensitive && (datatype == DataType.TEXT || datatype == DataType.STRING || datatype == DataType.MD5 || datatype == DataType.SEQUENCE);
            var clause = CommonClauseTypes[this.type];
            var where = isNotCaseSensitive ? clause.Replace("\"{field}\"", "{ fn LCASE(\"" + this.field + "\")}") 
                : clause.Replace("{field}", this.field);
            return where;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToTimeWhereClause()
        {
            if (this.type == Const.Oper_Between || this.type == Const.Oper_BetweenInner)
            {
                var values = this.value.ToString().Split(',');
                this.value = "1900-1-1 " + values[0] + ',' + "1900-1-1 " + values[1];
            }
            else
            {
                this.value = "1900-1-1 " + this.value;
            }
            this.datatype = DataType.DATETIME;
            return this.ToWhereClause();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToObjektWhereClause(Property property)
        {
            if (this.field.IndexOf('.') > 0)
                return this.ToObjektPropertyWhereClause(property);

            switch (this.type)
            {
                case Const.Oper_BeginWith:
                case Const.Oper_EndWith:
                case Const.Oper_Contains:
                case Const.Oper_NotContains:
                    return this.ToObjektPropertyWhereClause(property);

                case Const.Oper_In:
                case Const.Oper_IsNotNull:
                case Const.Oper_IsNull:
                    return this.ToWhereClause();

                default:
                    //传入对象
                    if (this.value is Objekt)
                    {
                        this.value = (this.value as Objekt).Id;
                    }
                    return this.ToWhereClause();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        public string ToListWhereClause(Property property)
        {
            switch (this.type)
            {
                case Const.Oper_Equals:
                case Const.Oper_NotEquals:
                    if (!this.value.SafeToString().IsNullOrEmpty())
                    {
                        try
                        {
                            var obj = this.value.ToString().JsonToObject<Dictionary<string, string>>();
                            this.value = obj["id"];
                        }
                        catch (Exception)
                        {

                            
                        }
                    }
                    else
                    {
                        this.type = this.type == Const.Oper_Equals ? Const.Oper_IsNull : Const.Oper_IsNotNull;
                    }
                    break;
            }
            
            return this.ToWhereClause();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        public string ToObjektPropertyWhereClause(Property property)
        {
            if (this.field.IndexOf('.') < 0)
                this.field += '.' + PropertyNames.combinedLabel;
            var relatedKlass = property.DataType.Id == DataType.LIST
                ? Klass.ForId(KlassIDs.Value)
                : property.ObjektDataSource;

            var relatedProperties = this.field.Split('.');
            var relatedProperty = relatedKlass.GetPropertyMetadata(relatedProperties[1]);

            var list = new List<QueryParamModel>();
            var innerParam = new QueryParamModel {field = relatedProperty.Name, type = this.type, value = this.value, caseSensitive = this.caseSensitive};
            list.Add(innerParam);
            var subClause = list.ToWhereClause(relatedKlass);

            this.value = innerParam.value;
            this.datatype = innerParam.datatype;
            return
                $"\"{relatedProperties[0]}\" in (select \"id\" from \"{relatedKlass.DbTable}\" where {subClause.SqlString})";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected string ToInWhereClause()
        {
            var isNotCaseSensitive = !caseSensitive && (datatype == DataType.TEXT || datatype == DataType.STRING);
            var clause = CommonClauseTypes[this.type];
            var where = isNotCaseSensitive ? clause.Replace("\"{field}\"", "{ fn LCASE(\"" + this.field + "\")}")
                : clause.Replace("{field}", this.field);
            var values = this.value.ToString().Split(',');
            var inValue = "?";
            for (int i = 0; i < values.Length; i++)
            {
                if (i > 0 && !values[i].IsNullOrEmpty())
                {
                    inValue += ",?";
                }
            }

            where = where.Replace("?", inValue);
            return where;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string ToBoolWhereClause()
        {
            var clause = CommonClauseTypes[this.type];
            var where = (this.type == Const.Oper_Equals || this.type == Const.Oper_NotEquals) ? clause.Replace("\"{field}\"", "{ fn IFNULL(\"" + this.field + "\", 0)}")
                : clause.Replace("{field}", this.field);
            return where;
        }
    }
}