using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using EB.Common.QueryBuilder;
using GroupflyGroup.Platform.ObjectFramework;
using Org.Reddragonit.BpmEngine;
using Org.Reddragonit.BpmEngine.Interfaces;
using GroupflyGroup.Platform.Web.Common;

namespace GroupflyGroup.Platform.ObjectFramework

{
    /// <summary>
    /// 工作流流程
    /// </summary>

    [Serializable]
    public class WFProcess : Objekt
    {
        private BusinessProcess _businessProcess;
        private bool _inited = false;
        private WFInstance _currentInstance;
        private Objekt _currentObjekt;

        internal WFInstance Instance
        {
            get { return _currentInstance; }
        }

        /// <summary>
        /// 定义id(createOnly)
        /// </summary>
        public string DefId
        {
            get { return GetProperty<string>("DefId"); }
            set { SetProperty("DefId", value); }
        }

        /// <summary>
        /// 流程定义文件
        /// </summary>
        public File ProcessXml
        {
            get { return GetProperty<File>("ProcessXml"); }
            set { SetProperty("ProcessXml", value); }
        }

        /// <summary>
        /// 状态列表
        /// </summary>
        public List StateList
        {
            get { return GetProperty<List>("StateList"); }
            set { SetProperty("StateList", value); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        internal ProcessVariablesContainer _getVariables(WFInstance instance)
        {
            return new ProcessVariablesContainer(); ;
        }

        private void _initProcess()
        {
            if (!_inited)
            {


                var xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(Encoding.Default.GetString(ProcessXml.FileContent.ToBytes()));


                _businessProcess = new BusinessProcess(xmlDoc);

                _businessProcess.OnProcessStarted = (process, variables) =>
                {

                };

                _businessProcess.OnStateChange = document =>
                {
                    //var stream = new MemoryStream();
                    //document.Save(stream);
                    //_currentInstance.StateXml = stream;
                    //_currentInstance.Save();
                };

                _businessProcess.OnProcessCompleted = (process, variables) =>
                {
                    var a = _businessProcess.State.Document;
                };

                _businessProcess.OnTaskStarted = (task, variables) =>
                {
                    var elements = this.ROCC["ProcessElement"];
                    elements.ForEach(o =>
                    {
                        var element = o.Related as WFElement;
                        if (element.DefId == task.id)
                            element.Init(this);
                    });
                };
                _businessProcess.OnTaskCompleted = (task, variables) =>
                {

                };

                _inited = true;

            }

        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="instance"></param>
        internal void LoadState(WFInstance instance)
        {
            _currentInstance = instance;
            _currentObjekt = instance.RefObjekt;
            _initProcess();
            var stateXml = new XmlDocument();
            stateXml.LoadXml(Encoding.Default.GetString(instance.StateXml.ToBytes()));
            _businessProcess.LoadState(stateXml); 
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        internal BusinessProcess GetProcessDef()
        {
            _initProcess();
            return _businessProcess;
        }

        /// <summary>
        /// 从新开始一个流程，创建一个工作流实例
        /// </summary>
        public void Begin(Objekt instanceObjekt)
        {
            _currentInstance = new WFInstance();
            _currentInstance.Process = this;
            _currentInstance.RefObjekt = _currentObjekt;
            _currentInstance.Save();
            _initProcess();
            var variables = _getVariables(_currentInstance);
            _businessProcess.BeginProcess(variables);
        }

    }

    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class ProcessTask : RelationshipObjekt
    {
        
    }
    ///// <summary>
    ///// 
    ///// </summary>
    //public class WfLog : Objekt
    //{

    //}
    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public abstract class WFElement : Objekt
    {
        /// <summary>
        /// 定义id(createOnly)
        /// </summary>
        public string DefId
        {
            get { return GetProperty<string>("DefId"); }
            set { SetProperty("DefId", value); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="process"></param>
        internal abstract void Init(WFProcess process);

    }
    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class WFTask : WFElement
    {
        protected WFInstance currentInstance;

        /// <summary>
        /// 当前状态
        /// </summary>
        public Value WFState
        {
            get { return GetProperty<Value>("WFState"); }
            set { SetProperty("WFState", value); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="process"></param>
        internal override void Init(WFProcess process)
        {
            currentInstance = process.Instance;
            var processDef = process.GetProcessDef();
            processDef.ProcessTask = (IStepElement task, ref ProcessVariablesContainer variables) =>
            {

            };
        }
        internal virtual void Complete(WFProcess process, WFInstance instance)
        {

        }

    }
    ///// <summary>
    ///// 
    ///// </summary>
    //public class WFManualTask : WFTask
    //{
    //    internal override void Init(WFProcess process)
    //    {
    //        base.Init(process);

    //        var processDef = process.GetProcessDef();
    //        processDef.BeginManualTask = (task, variables, callback, back) =>
    //        {

    //        };
    //    }

    //    internal override void Complete(WFProcess process, WFInstance instance)
    //    {
    //        var processDef = process.GetProcessDef();
    //        processDef.CompleteManualTask(this.DefId, new ProcessVariablesContainer());
    //    }

    //}

    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class WFUserTask : WFTask
    {

        internal override void Init(WFProcess process)
        {
            base.Init(process);

            var processDef = process.GetProcessDef();
            processDef.BeginUserTask = (task, variables, callback, back) =>
            {
                currentInstance.Task = this;
                var stream = new MemoryStream();
                processDef.State.Document.Save(stream);
                currentInstance.StateXml = stream;
                currentInstance.Save();
            };
        }

        internal override void Complete(WFProcess process, WFInstance instance)
        {
            currentInstance = instance;
            var processDef = process.GetProcessDef();
            processDef.CompleteUserTask(this.DefId, new ProcessVariablesContainer(), "system");
        }
    }
    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class WFInstance : Objekt
    {
        /// <summary>
        /// 当前状态
        /// </summary>
        public Value WFState
        {
            get { return GetProperty<Value>("WFState"); }
            set { SetProperty("WFState", value); }
        }

        /// <summary>
        /// 状态文件
        /// </summary>
        public Stream StateXml
        {
            get { return GetProperty<Stream>("StateXml"); }
            set { SetProperty("StateXml", value); }
        }

        /// <summary>
        /// 当前任务
        /// </summary>
        public WFTask Task
        {
            get { return GetProperty<WFTask>("Task"); }
            set { SetProperty("Task", value); }
        }

        /// <summary>
        /// 所属流程(createOnly)
        /// </summary>
        public WFProcess Process
        {
            get { return GetProperty<WFProcess>("Process"); }
            set { SetProperty("Process", value); }
        }

        /// <summary>
        /// 关联的业务对象
        /// </summary>
        public Objekt RefObjekt
        {
            get { return GetProperty<Objekt>("RefObjekt"); }
            set { SetProperty("RefObjekt", value); }
        }
        /// <summary>
        /// 
        /// </summary>
        public void Continue()
        {
            Task.Init(Process);
            Task.Complete(Process, this);
        }

    }
    
    
}