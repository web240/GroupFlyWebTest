using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GroupflyGroup.Platform.Web.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class JsonResultModel
    {

        /// <summary>
        /// 
        /// </summary>
        public JsonResultModel(string data = "")
        {
            IsSuccess = true;
            Message = "";
            Data = data;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="isSuccess"></param>
        /// <param name="message"></param>
        /// <param name="failCode"></param>
        /// <param name="data"></param>
        public JsonResultModel(bool isSuccess, string message,string failCode = "", string data = "")
        {
            IsSuccess = isSuccess;
            Message = message;
            FailCode = failCode;
            Data = data;
        }

        /// <summary>
        /// 
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Data { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Object ObjectData { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string FailCode { get; set; }
    }

   
}