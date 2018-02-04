using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GroupflyGroup.Platform.ObjectFramework.Utils;

namespace GroupflyGroup.Platform.Web.Controllers
{
    /// <summary>
    /// 机器码
    /// </summary>
    public class MachineCodeController : ApiController
    {
        /// <summary>
        /// 生成机器吗
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string Generate()
        {
           string fileName = MachineCoder.GenerateMachineCodeFile();
            return "机器码文件生成完成，文件位置（服务器）：" + fileName;
        }
    }
}
