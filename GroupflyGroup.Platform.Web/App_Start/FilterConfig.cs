using System.Web;
using System.Web.Mvc;
using GroupflyGroup.Platform.Web.Filters;

namespace GroupflyGroup.Platform.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new GlobalFilterAttribute());
        }
    }
}
