/*图片验证码
  组件名Gf-VerifyCode

  属性:
  codelength：验证码长度(默认值4,即4个验证码)
  fontsize：字体大小(默认值14字号)
  imgwidth：图片宽度(默认值60)
  imgheight：图片高度(默认值30)
  codekey: 验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突

  方法:
  刷新验证码
  document.querySelector("#xxx").Refresh();
  事件:

*/

class VerifyCode extends UIComponentBase {
    constructor() {

        super();                
       
    }

    static elementName = "Gf-VerifyCode".toLowerCase();

    /** 验证码图片标签*/
    private _verifyCodeImg: HTMLImageElement;

    /** 验证码图片Url*/
    private _verifyCodeImgSrc: string;

    

    /** 验证码长度(默认值4,即4个验证码) */
    get codeLength() {

        if (!this.getAttribute("codeLength")) {

            return 4;

        }

        return parseInt(this.getAttribute("codeLength"));

    }
    set codeLength(val) {

        this.setAttribute("codeLength", val.toString());

    }

    /** 字体大小(默认值14字号) */
    get fontSize() {

        if (!this.getAttribute("fontSize")) {

            return 14;

        }

        return parseInt(this.getAttribute("fontSize"));

    }
    set fontSize(val) {

        this.setAttribute("fontSize", val.toString());

    }

    /** 图片宽度(默认值60) */
    get imgWidth() {

        if (!this.getAttribute("imgWidth")) {

            return 60;

        }

        return parseInt(this.getAttribute("imgWidth"));

    }
    set imgWidth(val) {

        this.setAttribute("imgWidth", val.toString());

    }

    /** 图片高度(默认值30) */
    get imgHeight() {

        if (!this.getAttribute("imgHeight")) {

            return 30;

        }

        return parseInt(this.getAttribute("imgHeight"));

    }
    set imgHeight(val) {

        this.setAttribute("imgHeight", val.toString());

    }

    /** 验证码Key,用于保证验证码的唯一性,不填可能导致公用冲突 */
    get codeKey() {

        return this.getAttribute("codeKey");

    }
    set codeKey(val) {

        this.setAttribute("codeKey", val.toString());

    }


    createComponentBrowseState() {

        return null;

    }

    createComponentEditState() {

        return null;

    }

    onRender() {

        return this.VerifyCodeInit();        
    }


    /*
    *刷新验证码
    */
    public Refresh() {

        var VerifyCodeImg = this._verifyCodeImg;

        var ImgSrc = this._verifyCodeImgSrc + "&" + this.getUniqueId();

        $(VerifyCodeImg).attr("src", ImgSrc);

    }

    /*
    *初始化
    */
    protected VerifyCodeInit() {
               
        //控件容器
        var container = document.createElement("div");

        $(container).addClass("ImgVerifyCode");

        $(container).css("height", "100%");

        $(container).css("width", "100%");
        
        //图片宽度
        var ImgWidth = this.imgWidth;

        //图片高度
        var ImgHeight = this.imgHeight;

        //字体大小
        var FontSize = this.fontSize;

        //验证码长度
        var CodeLength = this.codeLength;
        
        //图片路径
        var ImgSrc = ComponentRoot.apppath + "/VerifyCode/CreatVerifyCode?" + "VerifyCodeLength=" + CodeLength + "&ImgWidth=" + ImgWidth + "&ImgHeigth=" + ImgHeight + "&FontSize=" + FontSize + "&" + this.getUniqueId();

        if (this.codeKey) {

            ImgSrc += "&VerifyCodeKey=" + this.codeKey;

        }

        this._verifyCodeImgSrc = ImgSrc;        

        //创建图片
        var VerifyCodeImg = document.createElement("img");

        $(VerifyCodeImg).attr("src", ImgSrc);

        $(VerifyCodeImg).css("cursor", "pointer");

        $(container).append(VerifyCodeImg);
        
        this._verifyCodeImg = VerifyCodeImg;

        $(VerifyCodeImg).click((e) => {

            this.Refresh();

        });

        return container;
    }
}
VerifyCode.register();
