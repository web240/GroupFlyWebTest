namespace GroupflyGroup.FrontEnd.Web.Models
{

    /// <summary>
    /// json返回对象。
    /// </summary>
    public class JsonActionResult
    {

        /// <summary>
        /// 1位请求成功！其他为失败。
        /// </summary>
        public int Code
        {
            get;
            set;
        }

        /// <summary>
        /// 错误信息。
        /// </summary>
        public string ErrorMessage
        {
            get;
            set;
        }

        /// <summary>
        /// 返回值。
        /// </summary>
        public string Result
        {
            get;
            set;
        }

    }
}