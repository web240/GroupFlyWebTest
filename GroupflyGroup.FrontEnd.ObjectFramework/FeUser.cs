using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.FrontEnd.ObjectFramework.Strings;


namespace GroupflyGroup.FrontEnd.ObjectFramework
{

    /// <summary>
    /// 用户
    /// </summary>
    [Serializable]
    public class User : GroupflyGroup.Platform.ObjectFramework.User
    {

        /// <summary>
        /// 用户类型
        /// </summary>
        public Value UserType
        {
            get { return GetProperty<Value>(FePropertyNames.userType); }
            set { SetProperty(FePropertyNames.userType, value); }
        }

        /// <summary>
        /// 注册渠道
        /// </summary>
        public Value CreatedFrom
        {
            get { return GetProperty<Value>(FePropertyNames.createdFrom); }
            set { SetProperty(FePropertyNames.createdFrom, value); }
        }

        /// <summary>
        /// 组织
        /// </summary>
        public Organization Organization
        {
            get { return GetProperty<Organization>(FePropertyNames.organization); }
            set { SetProperty(FePropertyNames.organization, value); }
        }

        /// <summary>
        /// 人员
        /// </summary>
        public Person Person
        {
            get { return GetProperty<Person>(FePropertyNames.person); }
            set { SetProperty(FePropertyNames.person, value); }
        }

        ///// <summary>
        ///// 
        ///// </summary>
        //public override Klass Klass
        //{
        //    get { return Klass.ForName(KlassNames.User); }
        //}
    }
}
