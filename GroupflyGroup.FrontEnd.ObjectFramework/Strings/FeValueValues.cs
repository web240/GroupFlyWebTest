using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupflyGroup.FrontEnd.ObjectFramework.Strings
{
    /// <summary>
    ///FrontEnd Value值
    /// </summary>
    public static class FeValueValues
    {
        /// <summary>
        /// 标签来源：手工
        /// </summary>
        public const string FeTagSource_Manual = "manual";
        /// <summary>
        /// 标签来源：自动
        /// </summary>
        public const string FeTagSource_Auto = "auto";

        /// <summary>
        /// 审核状态：待审核
        /// </summary>
        public const string FeApprovalStatus_Pending = "Pending";
        /// <summary>
        /// 审核状态：审核通过
        /// </summary>
        public const string FeApprovalStatus_Approved = "Approved";
        /// <summary>
        /// 审核状态：审核不通过
        /// </summary>
        public const string FeApprovalStatus_NotApproved = "NotApproved";

        /// <summary>
        /// 访问域名类型：使用目录名称
        /// </summary>
        public const string FeDomainType_DirectoryName = "DirectoryName";

        /// <summary>
        /// 访问域名类型：二级域名
        /// </summary>
        public const string FeDomainType_SecondDomain = "SecondDomain";

        /// <summary>
        /// 访问域名类型：顶级域名
        /// </summary>
        public const string FeDomainType_TopDomain = "TopDomain";


        /// <summary>
        /// 模板类型-文章系统模板
        /// </summary>
        public const string FeTemplateType_ArticleSystem = "ArticleHome";

        /// <summary>
        /// 模板类型-频道模板
        /// </summary>
        public const string FeTemplateType_Channel = "ArticleChannel";

        /// <summary>
        /// 系统配置-文章
        /// </summary>
        public const string FeConfigurationType_Article = "FeArticle";


        /// <summary>
        /// 文章评论开关-全部开启
        /// </summary>
        public const string FeArticleCommentType_On = "On";
        /// <summary>
        /// 文章评论开关-全部关闭
        /// </summary>
        public const string FeArticleCommentType_Off = "Off";
        /// <summary>
        /// 文章评论开关-文章内决定
        /// </summary>
        public const string FeArticleCommentType_ByArticle = "ByArticle";


        /// <summary>
        /// 左上角裁切
        /// </summary>
        public const string FeImageCutType_LeftTop = "LeftTop";
        /// <summary>
        /// 等比缩放
        /// </summary>
        public const string FeImageCutType_RatioZoom = "RatioZoom";


        /// <summary>
        /// 左上
        /// </summary>
        public const string FeLayoutLocation_1 = "1";
        /// <summary>
        /// 中上
        /// </summary>
        public const string FeLayoutLocation_2 = "2";
        /// <summary>
        /// 右上
        /// </summary>
        public const string FeLayoutLocation_3 = "3";
        /// <summary>
        /// 左中
        /// </summary>
        public const string FeLayoutLocation_4 = "4";
        /// <summary>
        /// 中中
        /// </summary>
        public const string FeLayoutLocation_5 = "5";
        /// <summary>
        /// 右中
        /// </summary>
        public const string FeLayoutLocation_6 = "6";
        /// <summary>
        /// 左下
        /// </summary>
        public const string FeLayoutLocation_7 = "7";
        /// <summary>
        /// 中下
        /// </summary>
        public const string FeLayoutLocation_8 = "8";
        /// <summary>
        /// 右下
        /// </summary>
        public const string FeLayoutLocation_9 = "9";

        /// <summary>
        /// 文字水印
        /// </summary>
        public const string FeWatermark_FeText = "FeText";
        /// <summary>
        /// 图片水印
        /// </summary>
        public const string FeWatermark_FeImage = "FeImage";




    }
}
