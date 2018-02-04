using GroupflyGroup.FrontEnd.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using System;
using System.Linq;
using System.Text;
using GroupflyGroup.Platform.ObjectFramework.Strings;

namespace GroupflyGroup.FrontEnd.ObjectFramework
{
    /// <summary>
    /// 频道
    /// </summary>
    [Serializable]
    public class FeImageTypeImageSize : RelationshipObjekt
    {
        public Value cutType
        {
            get
            {
                return GetProperty<Value>(FePropertyNames.cutType);
            }
            set
            {
                SetProperty(FePropertyNames.cutType, value);
            }
        }
    }

}
