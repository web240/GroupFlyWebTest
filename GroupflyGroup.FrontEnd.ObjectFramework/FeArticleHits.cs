using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    ///文章点击记录
    /// </summary>
    public class FeArticleHits : Objekt
    {

        /// <summary>
        ///点击的文章
        /// </summary>
        public FeArticle Article
        {
            get { return GetProperty<FeArticle>(FePropertyNames.article); }
            set { SetProperty(FePropertyNames.article, value); }
        }

        enum FeArticleHitsQueryType
        {
            yesterday, today, week
        }
    }
    

}