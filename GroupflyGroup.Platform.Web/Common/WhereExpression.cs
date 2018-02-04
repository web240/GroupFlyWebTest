
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using EB.Common;
using EB.Common.Extensions;
using EB.Common.ExtraExtention;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;


namespace GroupflyGroup.Platform.Web.Common
{
    /// <summary>
    /// 
    /// </summary>
    public class WhereExpression<TModel> where TModel : Objekt
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="klass">类</param>
        public WhereExpression(Klass klass)
        {
            _klass = klass;
        }

        private Klass _klass;

        private List<QueryParamModel> _paramList = new List<QueryParamModel>();

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="expression"></param>
        /// <param name="operatorType"></param>
        /// <param name="value"></param>
        public void Where<TProperty>(Expression<Func<TModel, TProperty>> expression, string operatorType, object value)
        {
            if (expression.Body.NodeType != ExpressionType.MemberAccess)
                throw new NotSupportedException("不支持的表达式");

            MemberExpression memberExpression = (MemberExpression)expression.Body;
            var propertyName = memberExpression.Member is PropertyInfo ? memberExpression.Member.Name : (string)null;

            this.Where(propertyName.ToCamel(), operatorType, value);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="operatorType"></param>
        /// <param name="value"></param>
        /// <param name="caseSensitive"></param>
        public void Where(string propertyName, string operatorType, object value, bool caseSensitive = true)
        {
            var paramModel = new QueryParamModel {field = propertyName, type = operatorType, value = value, caseSensitive = caseSensitive };
            this._paramList.Add(paramModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public WhereClause ToWhereClause()
        {
            return this._paramList.ToWhereClause(_klass);
        }
    }
}
