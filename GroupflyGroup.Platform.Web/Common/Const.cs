using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Common
{
    /// <summary>
    ///  常量类
    /// </summary>
    public static class Const
    {
        #region where条件操作符

        /// <summary>
        /// 等于
        /// </summary>
        public const string Oper_Equals = "=";

        /// <summary>
        /// 不等于
        /// </summary>
        public const string Oper_NotEquals = "!=";

        /// <summary>
        /// 为空
        /// </summary>
        public const string Oper_IsNull = "N";

        /// <summary>
        /// 不为空
        /// </summary>
        public const string Oper_IsNotNull = "!N";

        /// <summary>
        /// 大于
        /// </summary>
        public const string Oper_Greater = ">";

        /// <summary>
        /// 大于等于
        /// </summary>
        public const string Oper_GreaterOrEquals = ">=";

        /// <summary>
        /// 小于
        /// </summary>
        public const string Oper_Less = "<";

        /// <summary>
        /// 小于等于
        /// </summary>
        public const string Oper_LessOrEquals = "<=";

        /// <summary>
        /// 介于（含两端）
        /// </summary>
        public const string Oper_Between = "[..]";

        /// <summary>
        /// 介于（不含两端）
        /// </summary>
        public const string Oper_BetweenInner = "(..)";

        /// <summary>
        /// 包含
        /// </summary>
        public const string Oper_Contains = "*";

        /// <summary>
        /// 不包含
        /// </summary>
        public const string Oper_NotContains = "!*";

        /// <summary>
        /// 开始于
        /// </summary>
        public const string Oper_BeginWith = "=*";

        /// <summary>
        /// 结束于
        /// </summary>
        public const string Oper_EndWith = "*=";

        /// <summary>
        /// 存在于
        /// </summary>
        public const string Oper_In = "In";

        #endregion

        #region 请求失败类型

        /// <summary>
        /// 未登录或会话超时
        /// </summary>
        public const string FailType_LoginRequired = "LoginRequired";

        #endregion

        #region Ajax请求类型

        /// <summary>
        /// Ajax请求类型名称
        /// </summary>
        public const string AjaxType = "AjaxType";

        /// <summary>
        /// ajax操作标记
        /// </summary>
        public const string AjaxType_Operation = "Operation";

        #endregion

        #region UI组件名称

        /// <summary>
        /// 对象集合视图组件
        /// </summary>
        public const string ElementName_ObjektCollectionView = "Gf-ObjektCollectionView";

        /// <summary>
        /// 对象关联集合视图组件
        /// </summary>
        public const string ElementName_RelationshipObjektCollectionView = "Gf-RelationshipObjektCollectionView";

        /// <summary>
        /// 字符串属性组件
        /// </summary>
        public const string ElementName_StringPropertyView = "Gf-StringPropertyView";

        /// <summary>
        /// MD5属性组件
        /// </summary>
        public const string ElementName_GfMD5PropertyView = "Gf-MD5PropertyView";

        /// <summary>
        /// 文本属性组件
        /// </summary>
        public const string ElementName_GfTextPropertyView = "Gf-TextPropertyView";

        /// <summary>
        /// 整数属性组件
        /// </summary>
        public const string ElementName_GfIntPropertyView = "Gf-IntPropertyView";

        /// <summary>
        /// 大整数属性组件
        /// </summary>
        public const string ElementName_GfBigIntPropertyView = "Gf-BigIntPropertyView";

        /// <summary>
        /// 小数属性组件
        /// </summary>
        public const string ElementName_GfNumberPropertyView = "Gf-NumberPropertyView";

        /// <summary>
        /// 列表属性组件
        /// </summary>
        public const string ElementName_GfListPropertyView = "Gf-ListPropertyView";

        /// <summary>
        /// 日期属性组件
        /// </summary>
        public const string ElementName_GfDatePropertyView = "Gf-DatePropertyView";

        /// <summary>
        /// 日期时间属性组件
        /// </summary>
        public const string ElementName_GfDateTimePropertyView = "Gf-DateTimePropertyView";

        /// <summary>
        /// 时间属性组件
        /// </summary>
        public const string ElementName_GfTimePropertyView = "Gf-TimePropertyView";

        /// <summary>
        /// 布尔属性组件
        /// </summary>
        public const string ElementName_GfBooleanPropertyView = "Gf-BooleanPropertyView";

        /// <summary>
        /// 对象属性组件
        /// </summary>
        public const string ElementName_GfObjektPropertyView = "Gf-ObjektPropertyView";

        /// <summary>
        /// 富文本属性组件
        /// </summary>
        public const string ElementName_GfRichContentPropertyView = "Gf-RichContentPropertyView";

        /// <summary>
        /// 源码文本属性组件
        /// </summary>
        public const string ElementName_GfSourceCodePropertyView = "Gf-SourceCodePropertyView";

        /// <summary>
        /// 视图模型属性组件
        /// </summary>
        public const string ElementName_GfViewModelContentPropertyView = "Gf-ViewModelContentPropertyView";

        /// <summary>
        /// 列
        /// </summary>
        public const string ElementName_GfColumn = "Gf-Column";

        /// <summary>
        /// 对象集合视图
        /// </summary>
        public const string ElementName_GfObjektCollectionView = "Gf-ObjektCollectionView";

        /// <summary>
        /// 颜色字符串属性组件
        /// </summary>
        public const string ElementName_GfColorStringPropertyView = "Gf-ColorStringPropertyView";

        #endregion

        #region 菜单处理类型

        /// <summary>
        /// 地址
        /// </summary>
        public const string MenuHandleType_Url = "Url";

        /// <summary>
        /// 内容
        /// </summary>
        public const string MenuHandleType_Content = "Content";

        /// <summary>
        /// 脚本
        /// </summary>
        public const string MenuHandleType_Script = "Script";

        /// <summary>
        /// 无
        /// </summary>
        public const string MenuHandleType_None = "None";

        #endregion

        #region 验证码

        /// <summary>
        /// 随机生成可用验证码字符串
        /// </summary>
        public const string VerifyCodeCharacter = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

        /// <summary>
        /// 短信验证码模版
        /// </summary>
        public const string SmsVerifyCodeTemplate = "ecd7ff4febc24203a268f227b6f1788f@MessageTemplate";

        /// <summary>
        /// 短信发送器
        /// </summary>
        public const string SmsMessageSender = "b19fda5c61ca49258302b3c3ff7eb3b5@MessageSender";

        /// <summary>
        /// 邮件发送器
        /// </summary>
        public const string EmailMessageSender = "ebabb829eb374a0aa0306b9436bb4369@MessageSender";


        /// <summary>
        /// 消息验证码过期时间
        /// </summary>
        public const string MessageVerificationCodeExpiration = "e47c64274e3345f09fef32fa5cdbb85c@SystemConfiguration";


        /// <summary>
        /// 验证码表达式
        /// </summary>
        public const string SmsVerifyCodeExpression = "SmsVerifyCode";

        /// <summary>
        /// 默认图片验证码Key
        /// </summary>
        public const string DefaultImgVerifyCode = "DefaultImgVerifyCode";

        /// <summary>
        /// 默认短信验证码Key
        /// </summary>
        public const string DefaultSmsVerifyCode = "DefaultSmsVerifyCode";


        /// <summary>
        /// 默认QQ验证码Key
        /// </summary>
        public const string DefaultQQVerifyCode = "DefaultQQVerifyCode";

        /// <summary>
        /// 默认微信验证码Key
        /// </summary>
        public const string DefaultWeChatVerifyCode = "DefaultWeChatVerifyCode";

        #endregion

        #region 欢迎页

        /// <summary>
        /// 欢迎页类ID
        /// </summary>
        public const string DashboardKlassID = "Dashboard@Klass";

        /// <summary>
        /// 欢迎页小部件类ID
        /// </summary>
        public const string DashboardWidgetKlassID = "DashboardWidget@Klass";

        /// <summary>
        /// 系统默认欢迎页 
        /// </summary>
        public const string DefaultDashboard = "a73be01b8ec640cda6ad51ffbfa05b41@Dashboard";

        #endregion

        #region 部件

        /// <summary>
        /// 小部件类ID
        /// </summary>
        public const string WidgetKlassID = "Widget@Klass";

        /// <summary>
        /// 小部件菜单项类ID
        /// </summary>
        public const string WidgetMenuItemKlassID = "WidgetMenuItem@Klass";



        #endregion

        #region 对象数据状态

        /// <summary>
        /// 原始
        /// </summary>
        public const string ObjektState_Original = "O";

        /// <summary>
        /// 创建
        /// </summary>
        public const string ObjektState_Created = "C";

        /// <summary>
        /// 修改
        /// </summary>
        public const string ObjektState_Updated = "U";

        /// <summary>
        /// 删除
        /// </summary>
        public const string ObjektState_Deleted = "D";


        #endregion  
    }
}