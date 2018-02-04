using System.Text.RegularExpressions;
using System.Web;

namespace GroupflyGroup.FrontEnd.Service
{
    /// <summary>
    ///     html格式化
    /// </summary>
    public static class HtmlFormat
    {
        /// <summary>
        ///     把带标签的html字符串转换为纯文本
        /// </summary>
        /// <param name="htmlString"></param>
        /// <returns></returns>
        public static string NoHtml(string htmlString)
        {
            //删除脚本
            htmlString = htmlString.Replace("\r\n", "");
            htmlString = Regex.Replace(htmlString, @"<script.*?</script>", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"<style.*?</style>", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"<.*?>", "", RegexOptions.IgnoreCase);
            //删除HTML //&ndash;
            htmlString = Regex.Replace(htmlString, @"<(.[^>]*)>", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"([\r\n])[\s]+", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&ndash;", "-", RegexOptions.IgnoreCase); //1
            htmlString = Regex.Replace(htmlString, @"&ldquo;", "", RegexOptions.IgnoreCase); //2
            htmlString = Regex.Replace(htmlString, @"&rdquo;", "", RegexOptions.IgnoreCase); //3增加了3个替换
            htmlString = Regex.Replace(htmlString, @"-->", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"<!--.*", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(quot|#34);", "\"", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(amp|#38);", "&", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(lt|#60);", "<", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(gt|#62);", ">", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(nbsp|#160);", "", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(iexcl|#161);", "\xa1", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(cent|#162);", "\xa2", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(pound|#163);", "\xa3", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&(copy|#169);", "\xa9", RegexOptions.IgnoreCase);
            htmlString = Regex.Replace(htmlString, @"&#(\d+);", "", RegexOptions.IgnoreCase);
            htmlString = htmlString.Replace("<", "");
            htmlString = htmlString.Replace(">", "");
            htmlString = htmlString.Replace("\r\n", "");
            htmlString = HttpContext.Current.Server.HtmlEncode(htmlString).Trim();
            return htmlString;
        }
    }
}