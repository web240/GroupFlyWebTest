using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.Web.Models;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Collections.Specialized;
using System.Net;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using System.Web.Mvc;
using EB.Common.ExtraExtention;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using Newtonsoft.Json.Linq;
using Ude.Core;

namespace GroupflyGroup.Platform.Web.Common
{
    /// <summary>
    /// 
    /// </summary>
    public static class Common
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static string StreamToString(this Stream stream, Encoding encoding = null)
        {
            if (stream.IsNull())
                return string.Empty;

            byte[] t = stream.ToBytes();
            var en = encoding.IsNull() ? Encoding.Default : encoding;
            return en.GetString(t, 0, t.Length);
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="text"></param>
        ///// <returns></returns>
        //public static Stream StringToStream(this string text)
        //{
        //    var stream = new MemoryStream();
        //    if (text.IsNullOrEmpty())
        //        return stream;

        //}

        /// <summary>
        /// HttpGet请求
        /// </summary>
        /// <param name="Url">请求的url地址</param>
        /// <param name="postDataStr">请求参数</param>
        /// <returns>请求返回的全部内容</returns>
        public static string HttpGet(string Url, string postDataStr = "")
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
            request.Method = "GET";
            request.ContentType = "text/html;charset=UTF-8";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();

            return retString;
        }

        /// <summary>
        /// 引用脚本资源（View中使用@Url.Script(path)）
        /// </summary>
        /// <param name="url">UrlHelper对象</param>
        /// <param name="path">脚本资源路径</param>
        /// <returns>带版本号参数的完整脚本资源标签</returns>
        public static MvcHtmlString Script(this UrlHelper url, string path)
        {
            var src = url.Resource(path);
            return new MvcHtmlString($"<script type=\"text/javascript\" src=\"{src}\"></script>");
        }

        /// <summary>
        /// 引用样式资源（View中使用@Url.Css(path)）
        /// </summary>
        /// <param name="url">UrlHelper对象</param>
        /// <param name="path">样式资源路径</param>
        /// <returns>带版本号参数的完整样式资源标签</returns>
        public static MvcHtmlString Css(this UrlHelper url, string path)
        {
            var href = url.Resource(path);
            return new MvcHtmlString($"<link rel=\"stylesheet\" type=\"text/css\" href=\"{href}\">");
        }

        /// <summary>
        /// 引用资源（View中使用@Url.Resource(path)）
        /// </summary>
        /// <param name="url">UrlHelper对象</param>
        /// <param name="path">资源路径</param>
        /// <returns>带版本号参数的资源路径</returns>
        public static MvcHtmlString Resource(this UrlHelper url, string path)
        {
            if(path.IsNullOrEmpty())
                return new MvcHtmlString("");

            var versionConfigDir = string.Empty;
            var versionConfigFound = false;
            var ver = string.Empty;

            //应用程序根目录起始的路径，从当前文件所在目录逐级向上查找配置文件
            if (path.StartsWith("~"))
            {
                versionConfigDir = path;
                while (!versionConfigFound)
                {
                    if (versionConfigDir.IndexOf('/') == -1)
                        break;

                    versionConfigDir = versionConfigDir.Substring(0, versionConfigDir.LastIndexOf('/'));

                    if (System.IO.File.Exists(HttpContext.Current.Server.MapPath(versionConfigDir + "/version.json")))
                    {
                        versionConfigFound = true;
                        versionConfigDir += "/version.json";
                    }

                }
            }

            if (versionConfigFound)
            {
                var verJson = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath(versionConfigDir));
                ver = verJson.JsonToObject<Dictionary<string, string>>()["version"];
            }
            //其他情况，从程序集信息中取版本号
            else
            {
                ver = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();
            }


            if (path.Contains("?"))
            {
                path += "&v=" + ver;
            }
            else
            {
                path += "?v=" + ver;
            }
            return new MvcHtmlString(url.Content(path));
        }

        /// <summary>
        /// 获取文件类型对应的mimetype
        /// </summary>
        /// <param name="extension">文件扩展名（不带'.'）</param>
        /// <returns>mimetype(如：image/jpeg)</returns>
        public static string GetMimeType(string extension)
        {
            var dic = new Dictionary<string,string>
            {
                {"bmp","image/x-ms-bmp"},
                {"jpg","image/jpeg"},
                {"jpeg","image/jpeg"},
                {"gif","image/gif"},
                {"png","image/png"},
                {"tif","image/tiff"},
                {"tiff","image/tiff"},
                {"tga","image/x-targa"},
                {"psd","image/vnd.adobe.photoshop"}
            };
            if (dic.ContainsKey(extension))
                return dic[extension];

            return "application/" + extension.SafeToString();
        }

        /// <summary>
        /// 转换json格式前的字符替换处理（替换影响json格式的字符，不影响展示结果）
        /// </summary>
        /// <returns>不影响json格式的字符串</returns>
        public static string ConvertUnicodeToJsonFormatL(this string text)
        {
            if (text.IsNullOrEmpty())
                return string.Empty;
            var json = new StringBuilder();
            foreach (var letter in text)
            {
                switch (letter)
                {
                    case '\\':
                        json.Append("\\\\");
                        break;
                    case '/':
                        json.Append("\\/");
                        break;
                    case '"':
                        json.Append("\\\"");
                        break;
                    case '\t':
                        json.Append("\\t");
                        break;
                    case '\f':
                        json.Append("\\f");
                        break;
                    case '\b':
                        json.Append("\\b");
                        break;
                    case '\n':
                        json.Append("\\n");
                        break;
                    case '\r':
                        json.Append("\\r");
                        break;
                    default:
                        json.Append(letter);
                        break;

                }
            }
            return json.ToString();
        }

        /// <summary>
        /// json字符串转对象
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="jsonText">待转换的json字符串</param>
        /// <returns><typeparamref name="T"/>类型的对象</returns>
        public static T JsonToObject<T>(this string jsonText)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            try
            {
                return jss.Deserialize<T>(jsonText);
            }
            catch (Exception ex)
            {
                throw new Exception("JSONToObject(): " + ex.Message);
            }
        }

        /// <summary>
        /// 对象转json字符串
        /// </summary>
        /// <param name="o">待转换的对象</param>
        /// <returns></returns>
        public static string ObjectToJson(this object o)
        {
            try
            {
                return JsonConvert.SerializeObject(o);
            }
            catch (Exception ex)
            {
                throw new Exception("ObjectToJson(): " + ex.Message);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="klass"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public static List<Property> GetProperties(this Klass klass, Predicate<Property> predicate = null)
        {
            var properties = new List<Property>();
            var rocc = klass.PropertyMetadata;
            foreach (var relationshipObjekt in rocc)
            {
                var property = relationshipObjekt as Property;
                if (!predicate.IsNull())
                {
                    if (predicate(property))
                        properties.Add(property);
                }
                else
                {
                    properties.Add(property);
                }
            }
            return properties;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="o"></param>
        /// <param name="dataType"></param>
        /// <returns></returns>
        public static object Parse(this object o, string dataType)
        {

            switch (dataType)
            {
                case DataType.DATETIME:
                case DataType.DATE:
                    return o.ToNullable<DateTime>();
                case DataType.TIME:
                    return o.ToNullable<TimeSpan>();
                case DataType.INTEGER:
                    return o.ToNullable<int>();
                case DataType.BIGINT:
                    return o.ToNullable<long>();
                case DataType.FLOAT:
                    return o.ToNullable<float>();
                case DataType.DOUBLE:
                    return o.ToNullable<double>();
                case DataType.DECIMAL:
                    return o.ToNullable<decimal>();
                case DataType.BOOLEAN:
                    return o.ToBool();
                case DataType.BINARY:
                    return new MemoryStream(Encoding.UTF8.GetBytes(o.ToString())); ;
                case DataType.OBJEKT:
                case DataType.LIST:
                    if (o.IsNull() || o.ToString() == "") return null;
                    return ObjektFactory.Find(o.ToString());
                default:
                    return o;
            }
        }

        /// <summary>
        /// 查询参数列表转换为查询条件表达式
        /// </summary>
        /// <param name="paramList"></param>
        /// <param name="klass"></param>
        /// <returns></returns>
        public static WhereClause ToWhereClause(this List<QueryParamModel> paramList, Klass klass)
        {
            if (paramList.IsNull())
                paramList = new List<QueryParamModel>();

            var dbparamList = new List<OdbcParam>();
            var clause = new StringBuilder();

            for (int i = 0; i < paramList.Count; i++)
            {
                if (i != 0)
                {
                    clause.Append(" and ");
                }
                var param = paramList[i];
                Property property;
                if (param.field.IndexOf('.') > 0)
                {
                    property = klass.GetPropertyMetadata(param.field.Split('.')[0]);
                    var relatedProperty = property.ObjektDataSource.GetPropertyMetadata(param.field.Split('.')[1]);
                    param.datatype = relatedProperty.DataTypeId;
                }
                else
                {
                    property = klass.GetPropertyMetadata(param.field);
                    param.datatype = property.DataTypeId;
                }
                switch (property.DataTypeId)
                {
                    case DataType.TEXT:
                    case DataType.STRING:
                    case DataType.MD5:
                    case DataType.SEQUENCE:
                        clause.Append(param.ToStringWhereClause());
                        break;
                    case DataType.TIME:
                        clause.Append(param.ToTimeWhereClause());
                        break;
                    case DataType.OBJEKT:
                        clause.Append(param.ToObjektWhereClause(property));
                        break;
                    case DataType.LIST:
                        clause.Append(param.ToListWhereClause(property));
                        break;
                    case DataType.BOOLEAN:
                        clause.Append(param.ToBoolWhereClause());
                        break;
                    default:
                        clause.Append(param.ToWhereClause());
                        break;
                }

                if (param.type != Const.Oper_IsNull && param.type != Const.Oper_IsNotNull)
                {
                    if (param.type == Const.Oper_Between || param.type == Const.Oper_BetweenInner)
                    {
                        var values = param.value.ToString().Split(',');
                        dbparamList.Add(new OdbcParam(param.datatype, values[0]));
                        dbparamList.Add(new OdbcParam(param.datatype, values[1]));
                    }
                    else if (param.type == Const.Oper_In)
                    {
                        var values = param.value.ToString().Split(',');
                        values.Each(val => dbparamList.Add(new OdbcParam(param.datatype, val)));
                    }
                    else
                        dbparamList.Add(new OdbcParam(param.datatype, param.value));
                }

            }

            var where = new WhereClause(clause.ToString());
            dbparamList.Each(param => where.AddParameter(param));

            return where;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <param name="func"></param>
        /// <returns></returns>
        public static object TryGetValue<T>(this T t, Func<T, object> func)
        {
            try
            {
                return func(t);
            }
            catch (Exception)
            {

                return null;
            }
        }

        /// <summary>
        /// 查询table格式数据
        /// </summary>
        /// <param name="list"></param>
        /// <param name="properties"></param>
        /// <returns></returns>
        public static string ToHtmlTable<T>(this List<T> list, List<Property> properties) where T : Objekt
        {
            StringBuilder sColumns = new StringBuilder(string.Empty);
            StringBuilder sRows = new StringBuilder(string.Empty);

            sColumns.Append("<tr height=\"20\" align=\"center\" >");
            for (int i = 0; i < list.Count; i++)
            {
                sRows.Append("<tr height=\"20\" align=\"left\">");
                foreach (var property in properties)
                {
                    if (i == 0)
                    {
                        sColumns.Append($"<td>{property.Label}</td>");
                    }
                    sRows.Append("<td>" + list[i].GetProperty(property.Name) + "</td>");
                }
                sRows.Append("</tr>");
            }
            sColumns.Append("</tr>");

            return $"<table border=\"1\" width=\"100%\">{sColumns}{sRows}</table>";
        }

        /// <summary>
        /// 首字母大写
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public static string ToPascal(this string text)
        {
            if (text.IsNullOrEmpty())
                return text;
            return text[0].ToString().ToUpper() + text.Substring(1);

        }

        /// <summary>
        /// 首字母小写
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public static string ToCamel(this string text)
        {
            if (text.IsNullOrEmpty())
                return text;
            return text[0].ToString().ToLower() + text.Substring(1);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static byte[] ToBytes(this Stream stream)
        {
            if(stream.IsNull())
                return new byte[0];

            byte[] bytes = new byte[stream.Length];
            stream.Read(bytes, 0, bytes.Length);

            // 设置当前流的位置为流的开始 
            stream.Seek(0, SeekOrigin.Begin);
            return bytes;
        }


        /// <summary> 
        /// 取得HTML中所有图片的 URL。 
        /// </summary> 
        /// <param name="sHtmlText">HTML代码</param> 
        /// <returns>图片的URL列表</returns> 
        public static string[] GetHvtImgUrls(this string sHtmlText)
        {
            // 定义正则表达式用来匹配 img 标签 
            Regex m_hvtRegImg = new Regex(@"<img\b[^<>]*?\bsrc[\s\t\r\n]*=[\s\t\r\n]*[""']?[\s\t\r\n]*(?<imgUrl>[^\s\t\r\n""'<>]*)[^<>]*?/?[\s\t\r\n]*>", RegexOptions.IgnoreCase);
            //参考:http://hovertree.com/hvtart/bjae/e4pya1x0.htm


            // 搜索匹配的字符串 
            MatchCollection matches = m_hvtRegImg.Matches(sHtmlText);
            int m_i = 0;
            string[] sUrlList = new string[matches.Count];

            // 取得匹配项列表 
            foreach (Match match in matches)
                sUrlList[m_i++] = match.Groups["imgUrl"].Value;
            return sUrlList;
        }


        /// <summary>
        /// 将查询字符串解析转换为名值集合.
        /// </summary>
        /// <param name="queryString"></param>
        /// <returns></returns>
        public static NameValueCollection GetQueryString(this string queryString)
        {
            queryString = queryString.Replace("?","");
            NameValueCollection result = new NameValueCollection(StringComparer.OrdinalIgnoreCase);
            if (!string.IsNullOrEmpty(queryString))
            {
                int count = queryString.Length;
                for (int i = 0; i < count; i++)
                {
                    int startIndex = i;
                    int index = -1;
                    while (i < count)
                    {
                        char item = queryString[i];
                        if (item == '=')
                        {
                            if (index < 0)
                            {
                                index = i;
                            }
                        }
                        else if (item == '&')
                        {
                            break;
                        }
                        i++;
                    }
                    string key = null;
                    string value = null;
                    if (index >= 0)
                    {
                        key = queryString.Substring(startIndex, index - startIndex);
                        value = queryString.Substring(index + 1, (i - index) - 1);
                    }
                    else
                    {
                        key = queryString.Substring(startIndex, i - startIndex);
                    }
                    result[key] = value;
                    if ((i == (count - 1)) && (queryString[i] == '&'))
                    {
                        result[key] = string.Empty;
                    }
                }
            }
            return result;
        }
        /// <summary>
        /// 保存对象与文件关联
        /// </summary>
        /// <param name="objekt"></param>
        /// <param name="strRichText"></param>
        public static void SaveObjektRichTextRefFile(this Objekt objekt, string strRichText)
        {
            ROC<RelationshipObjekt> relationshipList= objekt.ROCC.GetROC(RelationshipNames.ObjektRichTextRefFile);
            List<string> FileIdList = new List<string>();
            string[] imgPaths = strRichText.GetHvtImgUrls();
            foreach (var path in imgPaths)
            {
                var idx = path.ToLower().IndexOf("~/file?id=");
                if (idx != -1)
                {
                    idx = path.IndexOf("?");
                    string queryString = path.Substring(idx);
                    NameValueCollection col = queryString.GetQueryString();
                    string id = col["id"];
                    if (!string.IsNullOrWhiteSpace(id))
                    {
                        FileIdList.Add(id);
                    }
                }
            }
            //获取不包含选择文件ID的关联对象集合
            var NotContainsRelationshipList = relationshipList.Where(t => FileIdList.All(b => b != t.Related.Id));
            //获取不包含已有关联对象文件ID集合
            var NotContainsFileIdList= FileIdList.Where(t => relationshipList.All(b => b.Related.Id!=t));
            //删除不包含的关联
            foreach (var item in NotContainsRelationshipList)
            {
                item.Delete();
                item.Save();
            }
            //添加新的关联
            foreach (var id in NotContainsFileIdList)
            {
                Objekt file = ObjektFactory.Find(id);
                RelationshipObjekt relationship = ObjektFactory.New<RelationshipObjekt>(Klass.ForName(RelationshipNames.ObjektRichTextRefFile));
                relationship.Source = objekt;
                relationship.Related = file;
                relationship.Save();
            }
        }
        /// <summary>
        /// 获取替换图片地址后的富文本字符串
        /// </summary>
        /// <param name="strRichText"></param>
        /// <returns></returns>
        public static string GetNewRichText(this string strRichText)
        {
            if (!string.IsNullOrWhiteSpace(strRichText))
            {
                var ApplicationPath = HttpContext.Current.Request.ApplicationPath;
                //如果当前程序目录不为根目录则替换掉程序目录
                if (ApplicationPath != "/")
                {
                    strRichText = strRichText.Replace(ApplicationPath, "~");
                }
            }
            return strRichText;
        }

    }
}