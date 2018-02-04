/*消息验证码
  组件名Gf-SmsCode

  属性:
  messagetemplateid:消息模版Id,必填

  messagesenderid:消息发送器Id可多个,用','分隔,必填

  accounts:消息接收账户,可多个,用','分隔,必填

  codekey:验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突

  width:组件宽度,不填默认150px

  codelength:验证码长度,不填默认长度4

  timeNumber:消息发送间隔计数,默认计数60秒

  方法:

  事件:

   //发送消息前事件
   document.querySelector("xx").registerEventHandler("BeforeSendMessage", function () {});

   //发送消息后事件
   document.querySelector("xx").registerEventHandler("AfterSendMessage", function () {});

*/
class MessageCode extends UIComponentBase {

    constructor() {

        super();                   
    }

    static elementName = "Gf-MessageCode".toLowerCase();

    /** 消息发送按钮 */
    private _btnSendMessage: HTMLButtonElement;

    /** 计时器ID */
    private _clearIntervalId: number;
  
     /** 消息发送间隔计数,默认计数60秒 */
    get timeNumber() {

        if (!this.getAttribute("timeNumber")) {

            return 60;

        }

        return parseInt(this.getAttribute("timeNumber")); 

    }
    set timeNumber(val) {
       
        this.setAttribute("timeNumber", val.toString());

    }


    /** 验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突 */    
    get codeKey() {

        return this.getAttribute("codekey");

    }
    set codeKey(val) {

        this.setAttribute("codekey", val.toString());

    }

    /** 组件宽度,不填默认150px */
    get width() {

        if (!this.getAttribute("width")) {

            return "150px";

        }

        return this.getAttribute("width");

    }
    set width(val) {

        this.setAttribute("width", val.toString());

    }

    /** 验证码长度,不填默认长度4 */
    get codeLength() {

        if (!this.getAttribute("codelength")) {

            return 4;

        }

        return parseInt(this.getAttribute("codelength"));

    }
    set codeLength(val) {

        this.setAttribute("codelength", val.toString());

    }

    /** 消息接收账户,可多个,用','分隔 */
    get accounts() {

        return this.getAttribute("accounts");

    }
    set accounts(val) {

        this.setAttribute("accounts", val.toString());

    }


    /** 消息模版Id */
    get messageTemplateId() {

        return this.getAttribute("messageTemplateId");

    }
    set messageTemplateId(val) {

        this.setAttribute("messageTemplateId", val.toString());

    }

    /** 消息发送器Id可多个,用','分隔,必填 */
    get messageSenderId() {

        return this.getAttribute("messageSenderId");

    }
    set messageSenderId(val) {

        this.setAttribute("messageSenderId", val.toString());

    }
    
    createComponentBrowseState() {

        return null;

    }

    createComponentEditState() {

        return null;

    }

    onRender() {

        return this.MessageCodeInit();
        
    }


    /*
    * 初始化
    */
    protected MessageCodeInit() {

        var that = this;

        this.id = this.id || this.getUniqueId("SmsCode");

        //控件容器
        var container = document.createElement("div");

        $(container).addClass("MessageCode");
               
        var btnSendMessage = document.createElement("input");

        $(btnSendMessage).attr("type", "button");

        $(btnSendMessage).attr("value", "点击免费获取");

        $(btnSendMessage).addClass("BtnSendMessage");

        $(btnSendMessage).css({

            "width": that.width

        });

        $(btnSendMessage).on("mousedown", function () {
            
            $(this).addClass("MouseDown");

        }).on("mouseup", function () {

            $(this).removeClass("MouseDown");

        }).on("click", function () {

            that.SendMessage();

        });

        this._btnSendMessage = btnSendMessage;
        
        $(container).append(btnSendMessage);

        return container;
    }

    /*
    * 发送消息
    */
    protected SendMessage() {

        var that = this;

        this.fireHook("BeforeSendMessage");

        if (!this.accounts) {

            return;

        }
        var data = {

            messageTemplateId: this.messageTemplateId,

            messageSenderId: this.messageSenderId,

            accounts: this.accounts,

            codeLength: this.codeLength

        };

        if (this.codeKey) {

            data["smsVerifyCodeKey"] = this.codeKey;

        }

        var btnSendMessage = this._btnSendMessage;

        $(btnSendMessage).attr("disabled", "false");

        window["platformAjax"]({

            url: ComponentRoot.APIs.sendMessageCode,
            
            type: "post",

            data: data,

            success: function (result) {

                that._clearIntervalId = setInterval("document.querySelector('#" + that.id + "').MessageCountDown()", 1000);
                                  
            },
            fail: function (result) {
                
                $(btnSendMessage).val("失败重新获取");

                $(btnSendMessage).removeAttr("disabled");

            },
            error: function () {

                $(btnSendMessage).val("失败重新获取");

                $(btnSendMessage).removeAttr("disabled");

            }
        });

        this.fireHook("AfterSendMessage");

    }



    /*
    * 消息倒数计时
    */
    public MessageCountDown() {

        var btnSendMessage = this._btnSendMessage;

        this.timeNumber--
  
        $(btnSendMessage).val(this.timeNumber + "秒后可重新发送");

        if (this.timeNumber == 0) {
           
            this.timeNumber = 60;

            $(btnSendMessage).val("点击免费获取");

            clearInterval(this._clearIntervalId);

            $(btnSendMessage).removeAttr("disabled");

        }
    }


    /*
    * 发送消息前回调
    */
    public onBeforeSendMessage(eventHandler: () => void) {

        this.addHook("BeforeSendMessage", eventHandler);

    }
   
    /*
    * 发送消息后回调
    */
    public onAfterSendMessage(eventHandler: () => void) {

        this.addHook("BeforeSendMessage", eventHandler);

    }


}
MessageCode.register();