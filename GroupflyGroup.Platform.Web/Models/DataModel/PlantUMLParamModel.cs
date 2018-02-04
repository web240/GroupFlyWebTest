using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using EB.Common;
using GroupflyGroup.Platform.ObjectFramework;
using GroupflyGroup.Platform.ObjectFramework.Persistence;
using GroupflyGroup.Platform.ObjectFramework.Strings;
using GroupflyGroup.Platform.ObjectFramework.Utils;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class PlantUMLParamModel
    {
        /// <summary>
        /// 生成类id串
        /// </summary>
        public string ids { get; set; }

        /// <summary>
        /// 展开层次
        /// </summary>
        public int extendingLayerNum { get; set; }

        /// <summary>
        /// 简化继承
        /// </summary>
        public bool conciseGeneration { get; set; }

        /// <summary>
        /// 属性关联
        /// </summary>
        public bool showPropertyRelationship { get; set; }

        /// <summary>
        /// 显示标签
        /// </summary>
        public bool showLabel { get; set; }

        /// <summary>
        /// 生成格式
        /// </summary>
        public string format { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected List<Klass> GetKlassList()
        {
            var list = new List<Klass>();
            if (ids.IsNullOrEmpty())
            {
                return list;
            }
            var idArray = ids.Split(',');
            if (idArray.IsNullOrEmpty())
            {
                return list;
            }
            idArray.Each(id =>
            {
                if (!id.IsNullOrEmpty())
                    list.Add(Klass.ForId(id));
            });
            return list;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GenerateUmlJson()
        {
            var url = ObjektFactory.Find<SystemConfiguration>(SystemConfigurationIDs.plantUmlUrl).Value;

            var list = GetKlassList();
            var text = PlantUML.GenerateUmlText(this.extendingLayerNum, list, this.conciseGeneration,
                this.showPropertyRelationship, this.showLabel);

            var format = ObjektFactory.Find<Value>(this.format).Value_.ToLower();

            return new { url, format, text }.ObjectToJson();
            
        }
    }
}