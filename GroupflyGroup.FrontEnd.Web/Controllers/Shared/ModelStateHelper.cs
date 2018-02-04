using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace GroupflyGroup.FrontEnd.Web.Controllers.Shared
{

    /// <summary>
    /// 
    /// </summary>
    public static class ModelStateHelper
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="state"></param>
        /// <returns></returns>
        public static List<string> ErrorMessageList(this ModelStateDictionary state)
        {
            List<string> result = new List<string>();

            var query = from t in state
                        where t.Value.Errors.Count > 0
                        select t;

            foreach (KeyValuePair<string, ModelState> valuePair in query)
            {

                foreach (ModelError modelError in valuePair.Value.Errors)
                {
                    result.Add(modelError.ErrorMessage);
                }

            }

            return result;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="state"></param>
        /// <param name="separator"></param>
        /// <returns></returns>
        public static string ErrorMessageString(this ModelStateDictionary state, string separator = "\r\n")
        {
            List<string> list = ErrorMessageList(state);
            StringBuilder sb = new StringBuilder();

            foreach (var item in list)
            {
                if (sb.Length > 0)
                {
                    sb.Append(separator);
                }

                sb.Append(item);
            }

            return sb.ToString();

        }

    }
}