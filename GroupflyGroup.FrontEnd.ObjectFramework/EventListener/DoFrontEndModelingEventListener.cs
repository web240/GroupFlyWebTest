using System;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.Extension;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Extension;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using log4net;
using System.ComponentModel.Composition;

namespace GroupflyGroup.FrontEnd.ObjectFramework.EventListener
{
    /// <summary>
    /// FrontEnd系统建模
    /// </summary>
    [Export(typeof(DoModelingEventListener))]
    public class DoFrontEndModelingEventListener : DoModelingEventListener
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(DoFrontEndModelingEventListener));

        /// <summary>
        ///     第二层
        /// </summary>
        public override int Priority
        {
            get { return 900; }
        }

        public override string Description
        {
            get { return "前端系统建模。"; }
        }

        public override void Do(Event e)
        {
            
            //Modeling1_0_0();
            //Modeling1_0_1();
        }

        private void Modeling1_0_0()
        {
            Modeling1_0_0_ApprovalStatusList();
            Modeling1_0_0_SeoKey();
            Modeling1_0_0_TAG();
            Modeling1_0_0_ArticleCategory();
            Modeling1_0_0_Character();
            Modeling1_0_0_Comment();
            Modeling1_0_0_Article();
            Modeling1_0_0_Template();
            Modeling1_0_0_Channel();
            Modeling1_0_0_Channel_DomainType();
            Modeling1_0_0_MenuItem();
            Modeling1_0_0_SystemConfiguration();
        }

        /// <summary>
        ///     SEO关键字
        /// </summary>
        private void Modeling1_0_0_SeoKey()
        {
            //文章分类
            if (ObjektFactory.IsExists(FeKlassIDs.FeSeoKey))
            {
                return;
            }
            var ecSeoKey = ObjektFactory.New<Klass>(FeKlassIDs.FeSeoKey, Klass.ForId(KlassIDs.Klass));
            ecSeoKey.Name = FeKlassNames.FeSeoKey;
            ecSeoKey.Label = "SEO关键字";
            ecSeoKey.Description = "SEO关键字";
            ecSeoKey.EntityClass = typeof(FeSeoKey).FullName;
            ecSeoKey.EntityClassAssembly = typeof(FeSeoKey).Assembly.GetName().Name;
            ecSeoKey.Sealed = true;
            ecSeoKey.Save();
            var p = new Property();
            p.Source = ecSeoKey;
            p.Name = FePropertyNames.key;
            p.SortOrder = 3000;
            p.IsKeyed = true;
            p.Label = "关键字";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "SEO关键字";
            p.IsRequired = true;
            p.StoredLength = 64;
            p.Save();
        }

        /// <summary>
        ///     SEO关键字
        /// </summary>
        private void Modeling1_0_0_TAG()
        {
            //文章分类
            if (ObjektFactory.IsExists(FeKlassIDs.FeTag))
            {
                return;
            }
            var tagSource = ObjektFactory.New<List>(FeListIDs.FeTagSource, Klass.ForId(KlassIDs.List));
            tagSource.Name = FeListNames.FeTagSource;
            tagSource.Label = "添加来源";
            tagSource.Description = "标签的来源，分为手工添加、自动添加";
            tagSource.Save();
            var v = ObjektFactory.New<Value>(FeValueIDs.FeTagSource_Auto, Klass.ForId(KlassIDs.Value));
            v.Source = tagSource;
            v.SortOrder = 100;
            v.Value_ = FeValueValues.FeTagSource_Auto;
            v.Label = "自动添加";
            v.SetProperty(PropertyNames.description, "自动添加的标签");
            v.Save();
            v = ObjektFactory.New<Value>(FeValueIDs.FeTagSource_Manual, Klass.ForId(KlassIDs.Value));
            v.Source = tagSource;
            v.SortOrder = 200;
            v.Value_ = FeValueValues.FeTagSource_Manual;
            v.Label = "手工添加";
            v.SetProperty(PropertyNames.description, "手工在标签库中维护标签所增加的标签");
            v.Save();

            var feTag = ObjektFactory.New<Klass>(FeKlassIDs.FeTag, Klass.ForId(KlassIDs.Klass));
            feTag.Name = FeKlassNames.FeTag;
            feTag.Label = "标签";
            feTag.Description = "系统集中维护的标签";
            feTag.EntityClass = typeof(FeTag).FullName;
            feTag.EntityClassAssembly = typeof(FeTag).Assembly.GetName().Name;
            feTag.Sealed = true;
            feTag.Save();
            var p = new Property();
            p.Source = feTag;
            p.Name = FePropertyNames.tag;
            p.SortOrder = 3000;
            p.IsKeyed = true;
            p.Label = "标签";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "标签值";
            p.IsRequired = true;
            p.StoredLength = 16;
            p.Save();
            p = new Property();
            p.Source = feTag;
            p.Name = FePropertyNames.@from;
            p.SortOrder = 3100;
            p.Label = "添加来源";
            p.DataType = ObjektFactory.Find<Value>(DataType.LIST);
            p.Description = "标签添加来源";
            p.ListDataSource = tagSource;
            p.IsRequired = true;
            p.Save();
        }

        /// <summary>
        ///     文章分类
        /// </summary>
        private void Modeling1_0_0_ArticleCategory()
        {
            //文章分类
            if (ObjektFactory.IsExists(FeKlassIDs.FeArticleCategory))
            {
                return;
            }
            var feArticleCategory = ObjektFactory.New<Klass>(FeKlassIDs.FeArticleCategory, Klass.ForId(KlassIDs.Klass));
            feArticleCategory.Name = FeKlassNames.FeArticleCategory;
            feArticleCategory.Label = "文章分类";
            feArticleCategory.Description = "咨询文章分类，如“体育”、“娱乐”等等";
            feArticleCategory.EntityClass = typeof(FeArticleCategory).FullName;
            feArticleCategory.EntityClassAssembly = typeof(FeArticleCategory).Assembly.GetName().Name;
            feArticleCategory.Sealed = true;
            feArticleCategory.Save();
            var p = new Property();
            p.Source = feArticleCategory;
            p.Name = FePropertyNames.name;
            p.Label = "名称";
            p.SortOrder = 3000;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "文章分类的名称";
            p.IsRequired = true;
            p.StoredLength = 32;
            p.Save();
            p = new Property();
            p.Source = feArticleCategory;
            p.Name = FePropertyNames.parent;
            p.SortOrder = 3100;
            p.Label = "父分类";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "文章分类的父分类";
            p.ObjektDataSource = feArticleCategory;
            p.Save();
            p = new Property();
            p.Source = feArticleCategory;
            p.Name = FePropertyNames.sortOrder;
            p.SortOrder = 3200;
            p.Label = "序号";
            p.DataType = ObjektFactory.Find<Value>(DataType.DECIMAL);
            p.Prec = 11;
            p.Scale = 3;
            p.Description = "文章分类的排序序号";
            p.Save();
            p = new Property();
            p.Source = feArticleCategory;
            p.Name = FePropertyNames.seoTitle;
            p.Label = "SEO标题";
            p.SortOrder = 3300;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "SEO标题";
            p.IsRequired = false;
            p.StoredLength = 128;
            p.Save();
            p = new Property();
            p.Source = feArticleCategory;
            p.Name = FePropertyNames.seoDescription;
            p.Label = "SEO描述";
            p.SortOrder = 3400;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "SEO描述";
            p.IsRequired = false;
            p.StoredLength = 512;
            p.Save();
            p = new Property();
            p.Source = feArticleCategory;
            p.Name = FePropertyNames.isDisplay;
            p.SortOrder = 3500;
            p.Label = "显示";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "文章分类的文章是否在前台显示";
            p.Save();
            var feArticleCategorySeoKey =
                ObjektFactory.New<Relationship>(FeRelationshipIDs.FeArticleCategorySeoKey,
                    Klass.ForId(KlassIDs.Relationship));
            feArticleCategorySeoKey.Name = FeRelationshipNames.FeArticleCategorySeoKey;
            feArticleCategorySeoKey.Label = "文章分类SEO关键字";
            feArticleCategorySeoKey.Description = "文章分类的SEO关键字";
            feArticleCategorySeoKey.Source = feArticleCategory;
            feArticleCategorySeoKey.Related = ObjektFactory.Find<Klass>(FeKlassIDs.FeSeoKey);
            feArticleCategorySeoKey.RelatedNotnull = true;
            feArticleCategorySeoKey.Save();

            Klass k = Klass.ForId(FeKlassIDs.FeArticleCategorySeoKey);
            k.EntityClass = typeof(FeArticleCategorySeoKey).FullName;
            k.EntityClassAssembly = typeof(FeArticleCategorySeoKey).Assembly.GetName().Name;
            k.Save();
        }

        /// <summary>
        ///     文章属性（特征）
        /// </summary>
        private void Modeling1_0_0_Character()
        {
            //文章属性（特性）
            if (ObjektFactory.IsExists(FeKlassIDs.FeCharacter))
            {
                return;
            }
            var feCharacter = ObjektFactory.New<Klass>(FeKlassIDs.FeCharacter, Klass.ForId(KlassIDs.Klass));
            feCharacter.Name = FeKlassNames.FeCharacter;
            feCharacter.Label = "文章属性";
            feCharacter.Description = "文章属性（特性）";
            feCharacter.EntityClass = typeof(FeCharacter).FullName;
            feCharacter.EntityClassAssembly = typeof(FeCharacter).Assembly.GetName().Name;
            feCharacter.Sealed = true;
            feCharacter.Save();
            var p = new Property();
            p.Source = feCharacter;
            p.Name = FePropertyNames.name;
            p.Label = "名称";
            p.SortOrder = 3000;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "文章属性的名称";
            p.IsRequired = true;
            p.StoredLength = 64;
            p.Save();
            p = new Property();
            p.Source = feCharacter;
            p.Name = FePropertyNames.label;
            p.Label = "显示标签";
            p.SortOrder = 3100;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "文章属性的显示标签";
            p.IsRequired = true;
            p.StoredLength = 64;
            p.Save();

            p = new Property();
            p.Source = feCharacter;
            p.Name = FePropertyNames.sortOrder;
            p.SortOrder = 3200;
            p.Label = "序号";
            p.DataType = ObjektFactory.Find<Value>(DataType.DECIMAL);
            p.Prec = 11;
            p.Scale = 3;
            p.Description = "文章属性的排序序号";
            p.Save();

            p = new Property();
            p.Source = feCharacter;
            p.Name = PropertyNames.faIcon;
            p.Label = "图标";
            p.Description = "Font Awesome字体图标名称";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.StoredLength = 48;
            p.Save();

            p = new Property();
            p.Source = feCharacter;
            p.Name = FePropertyNames.isDisplay;
            p.SortOrder = 3400;
            p.Label = "显示";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "文章属性是否在前台显示";
            p.Save();

        }


        private void Modeling1_0_0_ApprovalStatusList()
        {
            if (ObjektFactory.IsExists(FeListIDs.FeApprovalStatus))
            {
                return;
            }
            var articleApprovalStatus = ObjektFactory.New<List>(FeListIDs.FeApprovalStatus, Klass.ForId(KlassIDs.List));
            articleApprovalStatus.Name = FeListNames.FeApprovalStatus;
            articleApprovalStatus.Label = "文章审核状态";
            articleApprovalStatus.Description = "文章审核状态，分为待审核、审核通过、审核不通过";
            articleApprovalStatus.Save();
            var v = ObjektFactory.New<Value>(FeValueIDs.FeApprovalStatus_Pending, Klass.ForId(KlassIDs.Value));
            v.Source = articleApprovalStatus;
            v.SortOrder = 100;
            v.Value_ = FeValueValues.FeApprovalStatus_Pending;
            v.Label = "待审核";
            v.SetProperty(PropertyNames.description, "待审核");
            v.Save();
            v = ObjektFactory.New<Value>(FeValueIDs.FeApprovalStatus_Approved, Klass.ForId(KlassIDs.Value));
            v.Source = articleApprovalStatus;
            v.SortOrder = 200;
            v.Value_ = FeValueValues.FeApprovalStatus_Approved;
            v.Label = "审核通过";
            v.SetProperty(PropertyNames.description, "审核通过");
            v.Save();
            v = ObjektFactory.New<Value>(FeValueIDs.FeApprovalStatus_NotApproved, Klass.ForId(KlassIDs.Value));
            v.Source = articleApprovalStatus;
            v.SortOrder = 300;
            v.Value_ = FeValueValues.FeApprovalStatus_NotApproved;
            v.Label = "审核不通过";
            v.SetProperty(PropertyNames.description, "审核不通过");
            v.Save();
        }

        /// <summary>
        ///     文章
        /// </summary>
        private void Modeling1_0_0_Article()
        {
            //文章
            if (ObjektFactory.IsExists(FeKlassIDs.FeArticle))
            {
                return;
            }

            var feArticle = ObjektFactory.New<Klass>(FeKlassIDs.FeArticle, Klass.ForId(KlassIDs.Klass));
            feArticle.Name = FeKlassNames.FeArticle;
            feArticle.Label = "文章";
            feArticle.Description = "咨询文章";
            feArticle.EntityClass = typeof(FeArticle).FullName;
            feArticle.EntityClassAssembly = typeof(FeArticle).Assembly.GetName().Name;
            feArticle.Sealed = true;
            feArticle.Save();
            var p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.title;
            p.SortOrder = 3000;
            p.Label = "标题";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "文章的标题";
            p.IsRequired = true;
            p.IsRichText = true;
            p.StoredLength = 2000;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.titleValue;
            p.SortOrder = 3100;
            p.Label = "标题值";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "文章标题的内部值";
            p.IsRequired = true;
            p.StoredLength = 2000;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.category;
            p.SortOrder = 3100;
            p.Label = "分类";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.ObjektDataSource = Klass.ForId(FeKlassIDs.FeArticleCategory);
            p.Description = "文章的所属分类";
            p.IsRequired = true;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.sortOrder;
            p.SortOrder = 3200;
            p.Label = "序号";
            p.DataType = ObjektFactory.Find<Value>(DataType.DECIMAL);
            p.Prec = 11;
            p.Scale = 3;
            p.Description = "文章在所属分类中的排序序号";
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.content;
            p.SortOrder = 3300;
            p.Label = "内容";
            p.DataType = ObjektFactory.Find<Value>(DataType.BINARY);
            p.Description = "文章内容";
            p.IsRichText = true;
            p.IsRequired = true;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.author;
            p.SortOrder = 3400;
            p.Label = "作者";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "文章的作者";
            p.IsRequired = false;
            p.StoredLength = 32;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.hitsNum;
            p.SortOrder = 3500;
            p.Label = "点击数";
            p.DataType = ObjektFactory.Find<Value>(DataType.INTEGER);
            p.Description = "文章的浏览（点击）数";
            p.IsRequired = false;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.commentNum;
            p.SortOrder = 3550;
            p.Label = "评论数";
            p.DataType = ObjektFactory.Find<Value>(DataType.INTEGER);
            p.Description = "文章的评论数";
            p.IsRequired = false;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.seoTitle;
            p.Label = "SEO标题";
            p.SortOrder = 3600;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "SEO标题";
            p.IsRequired = false;
            p.StoredLength = 128;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.seoDescription;
            p.Label = "SEO描述";
            p.SortOrder = 3700;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "SEO描述";
            p.IsRequired = false;
            p.StoredLength = 512;
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.isDisplay;
            p.SortOrder = 3800;
            p.Label = "显示";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "文章是否在前台显示";
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.approvalStatus;
            p.SortOrder = 3900;
            p.Label = "审核状态";
            p.DataType = ObjektFactory.Find<Value>(DataType.LIST);
            p.Description = "文章审核状态";
            p.ListDataSource = ObjektFactory.Find<List>(FeListIDs.FeApprovalStatus);
            p.IsRequired = true;
            p.ListDefaultValue = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Pending);
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.approver;
            p.SortOrder = 4000;
            p.Label = "审核人";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "文章审核人";
            p.ObjektDataSource = Klass.ForId(KlassIDs.User);
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.approvedOn;
            p.SortOrder = 4100;
            p.Label = "审核时间";
            p.DataType = ObjektFactory.Find<Value>(DataType.DATETIME);
            p.Description = "文章审核时间";
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.image;
            p.SortOrder = 4200;
            p.Label = "主题图片";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "文章主题图片";
            p.ObjektDataSource = Klass.ForId(KlassIDs.File);
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.canComment;
            p.SortOrder = 4300;
            p.Label = "允许评论";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "文章是否允许评论";
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.isTrash;
            p.SortOrder = 4400;
            p.Label = "回收";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "文章是否回收";
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.isDraft;
            p.SortOrder = 4500;
            p.Label = "草稿";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "文章是否草稿";
            p.Save();
            p = new Property();
            p.Source = feArticle;
            p.Name = FePropertyNames.@from;
            p.SortOrder = 4600;
            p.Label = "来源";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.StoredLength = 128;
            p.Description = "文章来源";
            p.Save();

            var feArticleTag = ObjektFactory.New<Relationship>(FeRelationshipIDs.FeArticleTag,
                Klass.ForId(KlassIDs.Relationship));
            feArticleTag.Name = FeRelationshipNames.FeArticleTag;
            feArticleTag.Label = "文章标签";
            feArticleTag.Description = "文章的标签";
            feArticleTag.Source = feArticle;
            feArticleTag.Related = ObjektFactory.Find<Klass>(FeKlassIDs.FeTag);
            feArticleTag.RelatedNotnull = true;
            feArticleTag.Save();
            Klass k = Klass.ForId(FeKlassIDs.FeArticleTag);
            k.EntityClass = typeof(FeArticleTag).FullName;
            k.EntityClassAssembly = typeof(FeArticleTag).Assembly.GetName().Name;
            k.Save();

            var feArticleSeoKey = ObjektFactory.New<Relationship>(FeRelationshipIDs.FeArticleSeoKey,
                Klass.ForId(KlassIDs.Relationship));
            feArticleSeoKey.Name = FeRelationshipNames.FeArticleSeoKey;
            feArticleSeoKey.Label = "文章SEO关键字";
            feArticleSeoKey.Description = "文章的SEO关键字";
            feArticleSeoKey.Source = feArticle;
            feArticleSeoKey.Related = ObjektFactory.Find<Klass>(FeKlassIDs.FeSeoKey);
            feArticleSeoKey.RelatedNotnull = true;
            feArticleSeoKey.Save();

            k = Klass.ForId(FeKlassIDs.FeArticleSeoKey);
            k.EntityClass = typeof(FeArticleSeoKey).FullName;
            k.EntityClassAssembly = typeof(FeArticleSeoKey).Assembly.GetName().Name;
            k.Save();

            var feArticleCharacter = ObjektFactory.New<Relationship>(FeRelationshipIDs.FeArticleCharacter,
                Klass.ForId(KlassIDs.Relationship));
            feArticleCharacter.Name = FeRelationshipNames.FeArticleCharacter;
            feArticleCharacter.Label = "文章属性";
            feArticleCharacter.Description = "文章的属性";
            feArticleCharacter.Source = feArticle;
            feArticleCharacter.Related = ObjektFactory.Find<Klass>(FeKlassIDs.FeCharacter);
            feArticleCharacter.RelatedNotnull = true;
            feArticleCharacter.Save();

            k = Klass.ForId(FeKlassIDs.FeArticleCharacter);
            k.EntityClass = typeof(FeArticleCharacter).FullName;
            k.EntityClassAssembly = typeof(FeArticleCharacter).Assembly.GetName().Name;
            k.Save();

            //System.Diagnostics.Debugger.Break();
            var feArticleComment = ObjektFactory.New<Relationship>(FeRelationshipIDs.FeArticleComment,
                Klass.ForId(KlassIDs.Relationship));
            feArticleComment.Name = FeRelationshipNames.FeArticleComment;
            feArticleComment.Label = "文章评论";
            feArticleComment.Description = "文章的评论";
            feArticleComment.Source = feArticle;
            feArticleComment.Related = ObjektFactory.Find<Klass>(FeKlassIDs.FeComment);
            feArticleComment.RelatedNotnull = true;
            feArticleComment.Save();

            k = Klass.ForId(FeKlassIDs.FeArticleComment);
            k.EntityClass = typeof(FeArticleComment).FullName;
            k.EntityClassAssembly = typeof(FeArticleComment).Assembly.GetName().Name;
            k.Save();

        }

        /// <summary>
        ///     评论
        /// </summary>
        private void Modeling1_0_0_Comment()
        {
            if (ObjektFactory.IsExists(FeKlassIDs.FeComment))
            {
                return;
            }
            var feComment = ObjektFactory.New<Klass>(FeKlassIDs.FeComment, Klass.ForId(KlassIDs.Klass));
            feComment.Name = FeKlassNames.FeComment;
            feComment.Label = "评论";
            feComment.Description = "评论";
            feComment.EntityClass = typeof(FeComment).FullName;
            feComment.EntityClassAssembly = typeof(FeComment).Assembly.GetName().Name;
            feComment.Save();
            var p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.content;
            p.Label = "内容";
            p.SortOrder = 3000;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "评论内容";
            p.IsRequired = true;
            p.IsRichText = true;
            p.StoredLength = 1024;
            p.Save();
            p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.approvalStatus;
            p.SortOrder = 3100;
            p.Label = "审核状态";
            p.DataType = ObjektFactory.Find<Value>(DataType.LIST);
            p.Description = "评论及其回复的审核状态";
            p.ListDataSource = List.ForName(FeListNames.FeApprovalStatus);
            p.IsRequired = true;
            p.ListDefaultValue = ObjektFactory.Find<Value>(FeValueIDs.FeApprovalStatus_Pending);
            p.Save();
            p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.isDisplay;
            p.SortOrder = 3200;
            p.Label = "显示";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "评论（回复）是否在前台显示";
            p.Save();
            p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.approver;
            p.SortOrder = 3300;
            p.Label = "审核人";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "评论（回复）审核人";
            p.ObjektDataSource = Klass.ForId(KlassIDs.User);
            p.Save();
            p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.approvedOn;
            p.SortOrder = 3400;
            p.Label = "审核时间";
            p.DataType = ObjektFactory.Find<Value>(DataType.DATETIME);
            p.Description = "评论（回复） 审核时间";
            p.Save();
            p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.parent;
            p.SortOrder = 3500;
            p.Label = "父评论";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "回复的评论";
            p.ObjektDataSource = feComment;
            p.Save();
            p = new Property();
            p.Source = feComment;
            p.Name = FePropertyNames.isTrash;
            p.SortOrder = 3600;
            p.Label = "回收";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "评论是否回收";
            p.Save();
        }
        /// <summary>
        /// 模板
        /// </summary>
        private void Modeling1_0_0_Template()
        {
            if (ObjektFactory.IsExists(FeKlassIDs.FeTemplate))
            {
                return;
            }
            var templateType = ObjektFactory.New<List>(FeListIDs.FeTemplateType, KlassIDs.List);
            templateType.Name = FeListNames.FeTemplateType;
            templateType.Label = "模板类型";
            templateType.Description = "模板类型，如文章系统模板、频道模板、商品模板等";
            templateType.Save();
            var v = ObjektFactory.New<Value>(FeValueIDs.FeTemplateType_ArticleSystem, KlassIDs.Value);
            v.Source = templateType;
            v.SortOrder = 100;
            v.Value_ = FeValueValues.FeTemplateType_ArticleSystem;
            v.Label = "文章系统模板";
            v.Description = "文章系统模板";
            v.Save();
            v = ObjektFactory.New<Value>(FeValueIDs.FeTemplateType_Channel, KlassIDs.Value);
            v.Source = templateType;
            v.SortOrder = 200;
            v.Value_ = FeValueValues.FeTemplateType_Channel;
            v.Label = "频道模板";
            v.SetProperty(PropertyNames.description, "频道模板");
            v.Save();

            var feTemplate = ObjektFactory.New<Klass>(FeKlassIDs.FeTemplate, KlassIDs.Klass);
            feTemplate.Name = FeKlassNames.FeTemplate;
            feTemplate.Label = "模板";
            feTemplate.Description = "页面模板包，包含一组模板页面";
            feTemplate.EntityClass = typeof(FeTemplate).FullName;
            feTemplate.EntityClassAssembly = typeof(FeTemplate).Assembly.GetName().Name;
            feTemplate.Save();
            var p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.name;
            p.Label = "名称";
            p.SortOrder = 3000;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.CombinedLabelOrder = 1;
            p.Description = "模板名称";
            p.IsRequired = true;
            p.StoredLength = 48;
            p.Save();
            p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.description;
            p.Label = "描述";
            p.SortOrder = 3100;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "模板描述";
            p.IsRequired = false;
            p.StoredLength = 1024;
            p.Save();
            p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.directory;
            p.Label = "目录";
            p.SortOrder = 3200;
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.ObjektDataSource = Klass.ForId(KlassIDs.File);
            p.Description = "模板包对应的文件目录";
            p.IsRequired = true;
            p.Save();
            p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.type;
            p.Label = "类型";
            p.SortOrder = 3300;
            p.DataType = ObjektFactory.Find<Value>(DataType.LIST);
            p.ListDataSource = templateType;
            p.Description = "模板类型";
            p.IsRequired = true;
            p.Save();
            p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.isDefault;
            p.SortOrder = 3400;
            p.Label = "默认";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "是否默认模板";
            p.Save();
            p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.isEnable;
            p.SortOrder = 3500;
            p.Label = "启用";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "模板是否启用";
            p.Save();
            p = new Property();
            p.Source = feTemplate;
            p.Name = FePropertyNames.image;
            p.Label = "图片";
            p.SortOrder = 3600;
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.ObjektDataSource = Klass.ForId(KlassIDs.File);
            p.Description = "模板包展示图片";
            p.IsRequired = false;
            p.Save();
        }

        /// <summary>
        ///     频道
        /// </summary>
        private void Modeling1_0_0_Channel()
        {
            if (ObjektFactory.IsExists(FeKlassIDs.FeChannel))
            {
                return;
            }
            var feChannel = ObjektFactory.New<Klass>(FeKlassIDs.FeChannel, Klass.ForId(KlassIDs.Klass));
            feChannel.Name = FeKlassNames.FeChannel;
            feChannel.Label = "频道";
            feChannel.Description = "文章频道";
            feChannel.EntityClass = typeof(FeChannel).FullName;
            feChannel.EntityClassAssembly = typeof(FeChannel).Assembly.GetName().Name;
            feChannel.Save();
            var p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.name;
            p.Label = "名称";
            p.SortOrder = 3000;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "频道名称";
            p.IsRequired = true;
            p.StoredLength = 64;
            p.CombinedLabelOrder = 1;
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.category;
            p.SortOrder = 3100;
            p.Label = "绑定文章分类";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "频道绑定的文章分类";
            p.ObjektDataSource = Klass.ForId(FeKlassIDs.FeArticleCategory);
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.template;
            p.SortOrder = 3200;
            p.Label = "模板";
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "频道对应的模板";
            p.ObjektDataSource = Klass.ForId(FeKlassIDs.FeTemplate);
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.isDisplay;
            p.SortOrder = 3300;
            p.Label = "显示";
            p.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            p.Description = "频道是否在前台显示";
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.sortOrder;
            p.SortOrder = 3400;
            p.Label = "序号";
            p.DataType = ObjektFactory.Find<Value>(DataType.DECIMAL);
            p.Prec = 11;
            p.Scale = 3;
            p.Description = "频道的排序序号";
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.seoTitle;
            p.Label = "SEO标题";
            p.SortOrder = 3500;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "SEO标题";
            p.IsRequired = false;
            p.StoredLength = 128;
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.seoDescription;
            p.Label = "SEO描述";
            p.SortOrder = 3600;
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "SEO描述";
            p.IsRequired = false;
            p.StoredLength = 512;
            p.Save();
            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.url;
            p.Label = "URL";
            p.SortOrder = 3700;
            p.DataType = ObjektFactory.Find<Value>(DataType.OBJEKT);
            p.Description = "频道的访问URL，可以是子域名、独立域名、目录方式";
            p.IsRequired = true;
            p.ObjektDataSource = Klass.ForId(KlassIDs.Url);
            p.Save();

            var feChannelSeoKey = ObjektFactory.New<Relationship>(FeRelationshipIDs.FeChannelSeoKey,
                Klass.ForId(KlassIDs.Relationship));
            feChannelSeoKey.Name = FeRelationshipNames.FeChannelSeoKey;
            feChannelSeoKey.Label = "频道SEO关键字";
            feChannelSeoKey.Description = "频道的SEO关键字";
            feChannelSeoKey.Source = feChannel;
            feChannelSeoKey.Related = ObjektFactory.Find<Klass>(FeKlassIDs.FeSeoKey);
            feChannelSeoKey.RelatedNotnull = true;
            feChannelSeoKey.Save();

            Klass k = Klass.ForId(FeKlassIDs.FeChannelSeoKey);
            k.EntityClass = typeof(FeChannelSeoKey).FullName;
            k.EntityClassAssembly = typeof(FeChannelSeoKey).Assembly.GetName().Name;
            k.Save();

        }

        private void Modeling1_0_0_Channel_DomainType()
        {
            if (ObjektFactory.IsExists(FeListIDs.FeDomainType))
            {
                return;
            }

            //添加访问域名类型List
            var domainType = ObjektFactory.New<List>(FeListIDs.FeDomainType, Klass.ForId(KlassIDs.List));
            domainType.Name = FeListNames.FeDomainType;
            domainType.Label = "访问域名类型";
            domainType.Description = "访问域名类型，使用目录名称、二级域名、顶级域名";
            domainType.Save();

            var v = ObjektFactory.New<Value>(FeValueIDs.FeDomainType_DirectoryName, Klass.ForId(KlassIDs.Value));
            v.Source = domainType;
            v.SortOrder = 100;
            v.Value_ = FeValueValues.FeDomainType_DirectoryName;
            v.Label = "使用目录名称";
            v.SetProperty(PropertyNames.description, "使用目录名称");
            v.Save();

            v = ObjektFactory.New<Value>(FeValueIDs.FeDomainType_SecondDomain, Klass.ForId(KlassIDs.Value));
            v.Source = domainType;
            v.SortOrder = 200;
            v.Value_ = FeValueValues.FeDomainType_SecondDomain;
            v.Label = "二级域名";
            v.SetProperty(PropertyNames.description, "使用二级域名");
            v.Save();

            v = ObjektFactory.New<Value>(FeValueIDs.FeDomainType_TopDomain, Klass.ForId(KlassIDs.Value));
            v.Source = domainType;
            v.SortOrder = 300;
            v.Value_ = FeValueValues.FeDomainType_TopDomain;
            v.Label = "顶级域名";
            v.SetProperty(PropertyNames.description, "使用顶级域名");
            v.Save();

            //添加属性
            var feChannel = ObjektFactory.Find<Klass>(FeKlassIDs.FeChannel);
            var p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.domainType;
            p.SortOrder = 4000;
            p.Label = "访问域名类型";
            p.DataType = ObjektFactory.Find<Value>(DataType.LIST);
            p.Description = "访问域名类型";
            p.ListDataSource = domainType;
            p.IsRequired = true;
            p.Save();

            p = new Property();
            p.Source = feChannel;
            p.Name = FePropertyNames.domainText;
            p.SortOrder = 4100;
            p.Label = "用户输入的域名文本内容";
            p.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            p.Description = "用户输入的域名文本内容";
            p.StoredLength = 1024;
            p.Save();

        }

        /// <summary>
        /// 菜单项
        /// </summary>
        private void Modeling1_0_0_MenuItem()
        {
                   


            if (ObjektFactory.IsExists(FeMenuItemIDs.FeOperations))
            {
                return;
            }
            var feOperations = ObjektFactory.New<DirectoryMenuItem>(FeMenuItemIDs.FeOperations, KlassIDs.DirectoryMenuItem);
            feOperations.Name = FeMenuItemNames.FeOperations;
            feOperations.Label = "运营";
            feOperations.Description = "运营";
            feOperations.FaIcon = "fa fa-desktop";
            feOperations.Save();
            var smi = new SubMenuItem();
            smi.Source = ObjektFactory.Find<DirectoryMenuItem>(MenuItemIDs.Root);
            smi.Related = feOperations;
            smi.SortOrder = 500;
            smi.Save();
            var feArticleManagement = ObjektFactory.New<DirectoryMenuItem>(FeMenuItemIDs.FeArticleManagement, KlassIDs.DirectoryMenuItem);
            feArticleManagement.Name = FeMenuItemNames.FeArticleManagement;
            feArticleManagement.Label = "文章管理";
            feArticleManagement.Description = "文章管理";
            feArticleManagement.FaIcon = "fa fa-newspaper-o";
            feArticleManagement.Save();
            smi = new SubMenuItem();
            smi.Source = feOperations;
            smi.Related = feArticleManagement;
            smi.SortOrder = 100;
            smi.Save();

            var nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleList, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);
            nmi.Url = "/FeArticle";
            nmi.Name = FeMenuItemNames.FeArticleList;
            nmi.Label = "文章列表";
            nmi.FaIcon = "fa fa-list-alt";
            nmi.Description = "打开文章列表";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 100;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleTrash, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeArticleTrash";
            nmi.Name = FeMenuItemNames.FeArticleTrash;
            nmi.Label = "文章回收站";
            nmi.FaIcon = "fa fa-trash";
            nmi.Description = "打开文章回收站";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 200;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeTag, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeTagLibrary";
            nmi.Name = FeMenuItemNames.FeTag;
            nmi.Label = "标签库";
            nmi.FaIcon = "fa fa-tags";
            nmi.Description = "打开标签库";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 300;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleCategory, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeArticleCategory";
            nmi.Name = FeMenuItemNames.FeArticleCategory;
            nmi.Label = "文章分类";
            nmi.FaIcon = "fa fa-th-large";
            nmi.Description = "打开文章分类";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 400;
            smi.Save();

            //nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleCategoryTop, KlassIDs.NavigationMenuItem);
            //nmi.IsWithinThePlatform = true;
            //nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            //nmi.Url = "";
            //nmi.Name = FeMenuItemNames.FeArticleCategoryTop;
            //nmi.Label = "分类置顶文章";
            //nmi.FaIcon = "fa fa-arrow-up";
            //nmi.Description = "打开分类置顶文章";
            //nmi.Save();
            //smi = new SubMenuItem();
            //smi.Source = feArticleManagement;
            //smi.Related = nmi;
            //smi.SortOrder = 500;
            //smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleCharacter, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeCharacter";
            nmi.Name = FeMenuItemNames.FeArticleCharacter;
            nmi.Label = "文章属性";
            nmi.FaIcon = "fa fa-bookmark";
            nmi.Description = "打开文章属性";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 600;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleComment, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeArticleComment";
            nmi.Name = FeMenuItemNames.FeArticleComment;
            nmi.Label = "文章评论";
            nmi.FaIcon = "fa fa-commenting-o";
            nmi.Description = "打开文章评论";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 700;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleCommentTrash, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeArticleCommentTrash";
            nmi.Name = FeMenuItemNames.FeArticleCommentTrash;
            nmi.Label = "评论回收站";
            nmi.FaIcon = "fa fa-trash";
            nmi.Description = "打开文章评论回收站";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 800;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeChannel, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeChannel";
            nmi.Name = FeMenuItemNames.FeChannel;
            nmi.Label = "频道管理";
            nmi.FaIcon = "fa fa-th-list";
            nmi.Description = "打开频道管理";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 900;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleTemplate, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, true);

            nmi.Url = "/FeArticleTemplate";
            nmi.Name = FeMenuItemNames.FeArticleTemplate;
            nmi.Label = "模板管理";
            nmi.FaIcon = "fa fa-folder-o";
            nmi.Description = "打开文章模板管理";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 1000;
            smi.Save();

            nmi = ObjektFactory.New<NavigationMenuItem>(FeMenuItemIDs.FeArticleConfiguration, KlassIDs.NavigationMenuItem);
            nmi.IsWithinThePlatform = true;
            nmi.OpenedMode = ObjektFactory.Find<Value>(ValueIDs.NavigationOpenMode_embeding);
            nmi.SetProperty(PropertyNames.isPage, false);

            nmi.Url = "/FeArticleConfiguration";
            nmi.Name = FeMenuItemNames.FeArticleConfiguration;
            nmi.Label = "文章配置";
            nmi.FaIcon = "fa fa-sliders";
            nmi.Description = "打开文章配置";
            nmi.Save();
            smi = new SubMenuItem();
            smi.Source = feArticleManagement;
            smi.Related = nmi;
            smi.SortOrder = 1100;
            smi.Save();
        }

        /// <summary>
        /// 菜单项
        /// </summary>
        private void Modeling1_0_0_SystemConfiguration()
        {
            if (ObjektFactory.IsExists(FeValueIDs.FeConfigurationType_Article))
            {
                return;
            }
            PersistenceContext.Accept();
            PersistenceContext.BeginTransaction(new SessionContext("建模", ObjektFactory.Find<User>(UserIDs.root)));
            var configurationType = ObjektFactory.Find<List>(ListIDs.ConfigurationType);
            var v = ObjektFactory.New<Value>(FeValueIDs.FeConfigurationType_Article, KlassIDs.Value);
            v.Source = configurationType;
            v.SortOrder = 500;
            v.Value_ = FeValueValues.FeConfigurationType_Article;
            v.Label = "文章配置";
            v.Description = "文章管理相关配置";
            v.Save();

            var con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleApprovedEnable,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "文章审核开关";
            con.Label = "文章审核开关";
            con.Value = true.ToString();
            con.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            con.SortOrder = 100;
            con.Description = "文章是否需要审核";
            con.Save();

            var articleCommentType = ObjektFactory.New<List>(FeListIDs.FeArticleCommentType, KlassIDs.List);
            articleCommentType.Name = FeListNames.FeArticleCommentType;
            articleCommentType.Label = "文章评论开关";
            articleCommentType.Description = "文章全局评论开关，分为全部开启、全部开启、文章内决定";
            articleCommentType.Save();
            var v1 = ObjektFactory.New<Value>(FeValueIDs.FeArticleCommentType_On, Klass.ForId(KlassIDs.Value));
            v1.Source = articleCommentType;
            v1.SortOrder = 100;
            v1.Value_ = FeValueValues.FeArticleCommentType_On;
            v1.Label = "全部开启";
            v1.SetProperty(PropertyNames.description, "文章评论全部开启");
            v1.Save();
            v1 = ObjektFactory.New<Value>(FeValueIDs.FeArticleCommentType_ByArticle, Klass.ForId(KlassIDs.Value));
            v1.Source = articleCommentType;
            v1.SortOrder = 200;
            v1.Value_ = FeValueValues.FeArticleCommentType_ByArticle;
            v1.Label = "文章内决定";
            v1.SetProperty(PropertyNames.description, "文章评论是否开启由文章决定");
            v1.Save();
            v1 = ObjektFactory.New<Value>(FeValueIDs.FeArticleCommentType_Off, Klass.ForId(KlassIDs.Value));
            v1.Source = articleCommentType;
            v1.SortOrder = 300;
            v1.Value_ = FeValueValues.FeArticleCommentType_Off;
            v1.Label = "全部关闭";
            v1.SetProperty(PropertyNames.description, "文章评论全部关闭");
            v1.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleCommentType,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "文章全局评论开关";
            con.Label = "文章全局评论开关";
            con.Value = FeValueIDs.FeArticleCommentType_On;
            con.DataType = ObjektFactory.Find<Value>(DataType.LIST);
            con.ListDataSource = articleCommentType;
            con.SortOrder = 200;
            con.Description = "文章全局评论开关";
            con.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleCommentApprovedEnable,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "文章评论审核";
            con.Label = "文章评论审核";
            con.Value = true.ToString();
            con.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            con.SortOrder = 300;
            con.Description = "文章评论审核是否开启";
            con.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleCommentReplyApprovedEnable,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "评论回复审核";
            con.Label = "评论回复审核";
            con.Value = true.ToString();
            con.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            con.SortOrder = 400;
            con.Description = "评论回复审核是否开启";
            con.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleGuestCommentEnable,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "是否允许游客评论";
            con.Label = "是否允许游客评论";
            con.Value = true.ToString();
            con.DataType = ObjektFactory.Find<Value>(DataType.BOOLEAN);
            con.SortOrder = 500;
            con.Description = "是否允许游客评论";
            con.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeArticleNonCommentDefaultText,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "无评论时缺省文字";
            con.Label = "无评论时缺省文字";
            con.Value = "如果您对本文章有什么评论或经验,欢迎分享!";
            con.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            con.SortOrder = 600;
            con.Description = "无评论时缺省文字";
            con.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeCommentApprovedPendingPrompt,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "评论等待审核提示";
            con.Label = "评论等待审核提示";
            con.Value = "您的问题已经提交成功,管理员会尽快回复!";
            con.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            con.SortOrder = 700;
            con.Description = "评论等待审核提示";
            con.Save();

            con = ObjektFactory.New<SystemConfiguration>(FeSystemConfigurationIDs.FeCommentReplyDonePrompt,
                KlassIDs.SystemConfiguration);
            con.ConfigurationType = v;
            con.Name = "评论回复成功提示";
            con.Label = "评论回复成功提示";
            con.Value = "评论提交成功!";
            con.DataType = ObjektFactory.Find<Value>(DataType.STRING);
            con.SortOrder = 800;
            con.Description = "评论回复成功提示";
            con.Save();
        }

        private void Modeling1_0_1()
        {
        }
    }
}