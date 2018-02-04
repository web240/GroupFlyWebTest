/// <reference path="UIComponentBase.ts" />

/** UML生成参数 */
class UmlParams extends UIComponentBase {
    constructor() {
        super();
    }
    static elementName = "Gf-UmlParams".toLowerCase();
    
    /** 多对象id拼接*/
    get ids(){
        return this.getAttribute("ids");
    }
    set ids(val){
        this.setAttribute("ids",val);
    }
    
    /** 获取uml图api */
    get getumlurl(){
        return this.getAttribute("getumlurl");
    }
    set getumlurl(val){
        this.setAttribute("getumlurl",val);
    }
    
    /** 检查uml请求api */
    get checkumlurl(){
        return this.getAttribute("checkumlurl");
    }
    set checkumlurl(val){
        this.setAttribute("checkumlurl",val);
    }
    
    /** 生成选项数据api */
    get listdataurl(){
        return this.getAttribute("listdataurl");
    }
    set listdataurl(val){
        this.setAttribute("listdataurl",val);
    }
    
    
    public onRender() {

        var span = document.createElement("span");
        var element = this;
        var listData;
        element.ajax({
            url: element.listdataurl || ComponentRoot.APIs.getListValues,
            sync: true,
            data: { listid: 'a91676b8d73046d6aa29b2d87df7f73a@List' },
            success: function (result) {
                listData = result.Data;
                var array = listData.split(',');
                var options = '';
                $(array).each(function () {
                    if (this != "") {
                        options += `<option value ="` + this.split('_')[0] + `">` + this.split('_')[1] + `</option>`;
                    }
                });
                var form = document.createElement("form");
                $(form).html(`
                <div>
                    <table>
                        <tr>
                            <th class="PropertyLabel">展开 :</th>
                            <td class="PropertyValue">
                            <select name="extendingLayerNum">
                                <option value ="0">0</option>
                                <option value ="1" selected = "selected" >1</option>
                                <option value ="2">2</option>
                                <option value ="3">3</option>
                                <option value ="10">不限</option>
                            </select>层
                            </td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">简化继承 :</th>
                            <td class="PropertyValue"> <input type="checkbox" name="conciseGeneration" checked="checked" /></td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">属性关联 :</th>
                            <td class="PropertyValue"> <input type="checkbox" name="showPropertyRelationship" /></td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">显示标签 :</th>
                            <td class="PropertyValue"> <input type="checkbox" name="showLabel" checked="checked" /></td>
                        </tr>
                        <tr>
                            <th class="PropertyLabel">生成格式 :</th>
                            <td class="PropertyValue">
                            <select name="format">
                                `+ options + `
                            </select>
                            <input type="hidden" name="ids" value="`+ element.ids + `" />
                            </td>
                        </tr>
                    </table>
                </div>`);
                element.set("form", form);
                span.appendChild(form);
                span.appendChild(element.buildButtons());
            }
        });
        return span;


    }

    protected buildButtons() {
        var element = this;
        var sure = this.createButton("生成", "fa fa-check", function () {
            var obj = $(element.get("form")).serializeObject();
            obj.conciseGeneration = obj.conciseGeneration == "on";
            obj.showPropertyRelationship = obj.showPropertyRelationship == "on";
            obj.showLabel = obj.showLabel == "on";

            var dialog = element.get("dialog");
            dialog.close();
            window["ajaxLoading"]("正在生成UML，请稍候...");

            element.ajax({
                url: element.getumlurl || ComponentRoot.APIs.getUml,
                data: { model: obj },
                success: function (result) {

                    var umlObj = JSON.parse(result.Data);
                    var text = window["unescape"](encodeURIComponent(umlObj.text));
                    text = window["encode64"](window["zip_deflate"](text, 9));

                    element.ajax({
                        url: element.checkumlurl || ComponentRoot.APIs.checkUml,
                        sync: true,
                        data: { url: umlObj.url + "check/" + text },
                        success: function (result) {
                            var url = umlObj.url + umlObj.format + "/" + text;
                            window.open(url);
                            window["ajaxLoadEnd"]();
                        }
                    });
                }
            });
        });


        var check = this.createButton("查看", "fa fa-code", function () {
            var obj = $(element.get("form")).serializeObject();
            obj.conciseGeneration = obj.conciseGeneration == "on";
            obj.showPropertyRelationship = obj.showPropertyRelationship == "on";
            obj.showLabel = obj.showLabel == "on";

            window["platformAjax"]({
                url: element.getumlurl || ComponentRoot.APIs.getUml,
                sync: true,
                data: { model: obj },
                success: function (result) {
                    var umlObj = JSON.parse(result.Data);
                    var div = document.createElement("div");
                    var textarea = document.createElement("textarea");
                    $(textarea).attr("disabled", "disabled");
                    $(textarea).height("500px");
                    $(textarea).width("750px"); 
                    $(textarea).val(umlObj.text);
                    $(div).css("padding", "10px")
                    $(div).append(textarea);
                    ComponentRoot.openDialog({
                        id: element.id + "-checkText",
                        width: 800,
                        height: 600,
                        title: '查看UML源码',
                        content: div
                    });
                }
            });
        });

        var cancel = element.createButton("取消", "fa fa-times", function () {
            var dialog = element.get("dialog");
            dialog.close();
        });

        var buttonsdiv = document.createElement("div");
        $(buttonsdiv).addClass("dialog-button");
        buttonsdiv.id = element.getUniqueId("buttonsdiv");
        buttonsdiv.appendChild(sure);
        buttonsdiv.appendChild(check);
        buttonsdiv.appendChild(cancel);
        return buttonsdiv;
    }

    public open() {
        var element = this;
        var dialog = ComponentRoot.openDialog({
            id: element.id + "-uml",
            width: 500,
            height: 225,
            title: '生成UML参数',
            content: element
        });
        element.set("dialog", dialog);
    }
}
UmlParams.register();