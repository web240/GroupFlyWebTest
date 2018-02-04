/// <reference path="UIComponentBase.ts" />

/** 按钮点击下拉框 */
class ButtonComboBox extends UIComponentBase {
    
    constructor(){
        super();
    }
    static elementName = "Gf-ButtonComboBox".toLowerCase();

    /** 数据 */
    get data(){
        return this.getAttribute("data");
    }
    set data(val){
        this.setAttribute("data",val);
    }

    public getValue(){
        return $(this.get("button")).val();
    }
    
    /**
     * 值改变回调
     * @param eventHandler 回调函数
     */
    public onValueChange(eventHandler:(oldValue:any, newValue:any)=>void){
        this.addHook(EventNames.ValueChange,eventHandler);
    }

    public setValue(value){
        var old = $(this.get("button")).val();
        $(this.get("button")).val(value);
        if(value != old){
            this.fireHook(EventNames.ValueChange,[old,value]);
        }
    }

    public loadData(data){
        var expand = $(this.get("div"));
        var target = this.get("button");
        var element = this;
        expand.html("");

        $(data).each(function() {
            element.addOption(this.value,this.label);
        });
    }
    
    public toggleExpand(){
        var div = this.get("div");
        var button = this.get("button");

        if (!$(div).is(":hidden")) {  $(div).hide(); return;  }
        
        var x = button.getBoundingClientRect().left+document.documentElement.scrollLeft;
        var y = button.getBoundingClientRect().top+document.documentElement.scrollTop;
        div.style.left = x + "px";
        div.style.top = y + 25 + "px";
        $(div).show();
    }


    protected addOption(value: string, label: string) {
        var element = this;
        var option = document.createElement("div");
        $(option).addClass("combobox-item item");
        option.innerText = label;
        $(option).attr("value", value);
        $(option).click(function () {
            if (element.getValue() != value) {
                element.setValue(value);
            }
            $(element.get("div")).hide();
        });
        element.get("div").appendChild(option);
    }

    public onRender() {
        var span = document.createElement("span");
        var element = this;
        $(element).addClass("GfButtonComboBox");
        //按钮
        var button = document.createElement("input");
        button.id = this.getUniqueId("Button");
        $(button).attr("type", "button");
        $(button).css("width", (element.width || "25"));
        $(button).css("height", (element.height || "25"));
        element.set("button",button);

        //下拉框
        var expanddiv = document.createElement("div");
        expanddiv.id = this.getUniqueId("ComboBox");
        $(expanddiv).addClass("combo-panel panel-body panel-body-noheader GfButtonComboBox expanddiv");
        $(expanddiv).hide();
        element.set("div",expanddiv);

        //点击按钮切换下拉框显示/隐藏
        $(button).click(function () {
            element.toggleExpand();
        });
        $(button).mouseout(function () {
            $(expanddiv).hide();
        });


        $(expanddiv).mouseover(function () {
            $(expanddiv).show();
        });
        $(expanddiv).mouseout(function () {
            $(expanddiv).hide();
        });

        //添加到主元素中
        span.appendChild(button);
        document.body.appendChild(expanddiv);


        //绑定数据
        var options = element.getElementsByTagName("Gf-Option");
        if (options) {
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                this.addOption(option.getAttribute("value"), option.getAttribute("label"));
            }
        }
        return span;
    }
}
ButtonComboBox.register();
    