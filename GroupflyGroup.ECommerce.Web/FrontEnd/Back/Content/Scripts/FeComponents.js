var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../../../../Platform/Content/Scripts/Components.ts" />
var GfFeDataGridViewState;
(function (GfFeDataGridViewState) {
    GfFeDataGridViewState[GfFeDataGridViewState["Large"] = 0] = "Large";
    GfFeDataGridViewState[GfFeDataGridViewState["List"] = 1] = "List";
})(GfFeDataGridViewState || (GfFeDataGridViewState = {}));
var GfFeDataGridSortType;
(function (GfFeDataGridSortType) {
    GfFeDataGridSortType[GfFeDataGridSortType["Down"] = 0] = "Down";
    GfFeDataGridSortType[GfFeDataGridSortType["Up"] = 1] = "Up";
})(GfFeDataGridSortType || (GfFeDataGridSortType = {}));
function DataFormater(jsonDate) {
    try {
        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        //var milliseconds = date.getMilliseconds();
        //return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
    catch (ex) {
        return "";
    }
}
var GfFeUpFileDialog = (function (_super) {
    __extends(GfFeUpFileDialog, _super);
    function GfFeUpFileDialog(extension) {
        var _this = _super.call(this, extension) || this;
        _this.autoInit = true;
        _this.elementName = "Gf-GfFeUpFileDialog";
        _this.addProperty("getwatermarkurl");
        _this.addProperty("getimgsizeurl");
        _this.addProperty("showimagesizecheckbox");
        return _this;
    }
    GfFeUpFileDialog.prototype.initWebUploader = function (element) {
        _super.prototype.initWebUploader.call(this, element);
        //重新控件样式
        var toolbarid = "#" + element.get("toolbarid");
        $(toolbarid).empty();
        var uploaderImageSizeList = document.createElement("span");
        uploaderImageSizeList.className = "imageToolbarContainer";
        var uploaderWatemarkList = document.createElement("span");
        uploaderWatemarkList.className = "imageToolbarContainer";
        $(toolbarid).append(uploaderWatemarkList);
        $(toolbarid).append(uploaderImageSizeList);
        if (element.showimagesizecheckbox === "true") {
            //调整图片尺寸
            if (element.getimgsizeurl) {
                $.ajax({
                    url: element.getimgsizeurl,
                    dataType: "json",
                    type: "GET",
                    success: function (result) {
                        if (result.length > 0) {
                            var imgSizeCheckbox = document.createElement("input");
                            imgSizeCheckbox.type = "checkbox";
                            imgSizeCheckbox.id = element.xtag.imgSizeCheckboxId;
                            imgSizeCheckbox.className = "uploaderCheckbox";
                            $(uploaderImageSizeList).append(imgSizeCheckbox);
                            $(uploaderImageSizeList).append("调整图片尺寸");
                            var imgSizeCheckboxContainer = document.createElement("span");
                            imgSizeCheckboxContainer.className = "uploaderSelect";
                            $(uploaderImageSizeList).append(imgSizeCheckboxContainer);
                            var imgSizeSelect = document.createElement("input");
                            imgSizeSelect.id = element.xtag.imgSizeSelectId;
                            $(imgSizeCheckboxContainer).append(imgSizeSelect);
                            $(imgSizeCheckbox).change(function (e) {
                                if ($(e.delegateTarget).is(":checked")) {
                                    $(imgSizeCheckboxContainer).show();
                                }
                                else {
                                    $(imgSizeCheckboxContainer).hide();
                                }
                            });
                            var dataSource = [];
                            result.forEach(function (record) {
                                var width = record.Width;
                                if (width == -1) {
                                    width = "*";
                                }
                                var height = record.Height;
                                if (height == -1) {
                                    height = "*";
                                }
                                dataSource.push({ "id": record.ID, "text": width + " x " + height });
                            });
                            $(imgSizeSelect).combobox({
                                valueField: "id",
                                textField: "text",
                                mode: "local",
                                data: dataSource,
                                editable: false,
                                multiple: true
                            });
                            $(imgSizeCheckboxContainer).hide();
                        }
                    }
                });
            }
        }
        //添加水印
        if (element.getwatermarkurl) {
            $.ajax({
                url: element.getwatermarkurl,
                dataType: "json",
                type: "GET",
                success: function (result) {
                    if (result.length > 0) {
                        var watermarCheckbox = document.createElement("input");
                        watermarCheckbox.id = element.xtag.watermarCheckboxId;
                        watermarCheckbox.type = "checkbox";
                        watermarCheckbox.className = "uploaderCheckbox";
                        $(uploaderWatemarkList).append(watermarCheckbox);
                        $(uploaderWatemarkList).append("添加水印");
                        var watermarSelect = document.createElement("select");
                        watermarSelect.id = element.xtag.watermarSelectId;
                        watermarSelect.className = "uploaderSelect";
                        $(uploaderWatemarkList).append(watermarSelect);
                        $(watermarCheckbox).change(function (e) {
                            if ($(e.delegateTarget).is(":checked")) {
                                $(watermarSelect).show();
                            }
                            else {
                                $(watermarSelect).hide();
                            }
                        });
                        result.forEach(function (record) {
                            var option = $("<option>").val(record.ID).text(record.Name);
                            $(watermarSelect).append(option);
                        });
                        $(watermarSelect).hide();
                    }
                }
            });
        }
    };
    GfFeUpFileDialog.prototype.initContent = function (element) {
        _super.prototype.initContent.call(this, element);
        element.xtag.watermarCheckboxId = this.GetUniqueId("watermarCheckbox");
        element.xtag.watermarSelectId = this.GetUniqueId("watermarSelect");
        element.xtag.imgSizeCheckboxId = this.GetUniqueId("imgSizeCheckbox");
        element.xtag.imgSizeSelectId = this.GetUniqueId("imgSizeSelect");
    };
    return GfFeUpFileDialog;
}(GfUpFileDialog));
var GfFeDataGrid = (function (_super) {
    __extends(GfFeDataGrid, _super);
    function GfFeDataGrid(extension) {
        var _this = _super.call(this, extension) || this;
        //this.autoInit = true;
        _this.elementName = "Gf-GfFeDataGrid";
        //切换视图事件
        _this.addProperty("changeviewstate");
        //设置排序字段[{'name':'文件名','field':'name'},{'name':'大小','field':'Size'}]
        _this.addProperty("sortfields");
        //设置工具按钮['移动','设置水印','替换','查看引用','下载','放入回收站','彻底删除']
        _this.addProperty("toolbuttons");
        //工具按钮点击事件
        _this.addProperty("toolbuttonsclick");
        //数据的url，post方式
        _this.addProperty("url");
        //数据加载完成后触发
        _this.addProperty("loaded");
        //左文本
        _this.addProperty("lefttext");
        //导航文本
        _this.addProperty("navrighttext");
        //勾选数据项后触发
        _this.addProperty("changecheck");
        //点击数据项后触发
        _this.addProperty("dataitemdblclick");
        //表格视图列信息
        _this.addProperty("datacolumns");
        //显示模式
        //html：按前台html标签设置显示列表和分页
        //cs:按后台设置显示列表和分页
        //默认值为html
        _this.addProperty("loadmodel");
        //分页参数
        _this.addProperty("paginationargs");
        //异步请求的url
        _this.addProperty("isrefasyncurl");
        //是否显示选择框
        _this.addboolProperty("showcheckbox");
        //是否开启自动处理文件夹点击事件，如果开启点击文件夹后不会触发dataitemdblclick事件，并进入点击的文件夹，重新加载数据，刷新导航。
        _this.addboolProperty("autodirectoryclick");
        //是否开启分页
        _this.addboolProperty("pagination");
        //是否自动填充父容器
        _this.addboolProperty("fit");
        //提供设置按钮工具栏按钮方法
        _this.addMethod("setButtons", "function (buttons) { control.setButtons(buttons,this); }");
        //提供设置左文本方法
        _this.addMethod("setLeftText", "function (text) { control.setLeftText(text,this); }");
        //提供设置导航右文本方法
        _this.addMethod("setNavRightText", "function (text) { control.setNavRightText(text,this); }");
        //重新加载数据方法
        _this.addMethod("reLoad", "function () { control.dataLoader(this); }");
        //获取当前目录id
        //this.addMethod("getCruuentDirectoryId", "function () { return this.xtag.parentDirectoryId; }");
        //设置查询参数
        _this.addMethod("setQueryParams", "function (params) { this.xtag.queryParams = params }");
        //获取返回值数据
        _this.addMethod("getResult", "function () { return this.xtag.data; }");
        //获取当前目录id
        _this.addMethod("getDirectoryId", "function () { return this.xtag.parentDirectoryId; }");
        //获取当前目录名称
        _this.addMethod("getDirectoryName", "function () { return this.xtag.parentDirectoryName; }");
        //获取选中的项
        _this.addMethod("getCheckList", "function () { return this.xtag.checkList; }");
        return _this;
    }
    GfFeDataGrid.prototype.builddiv = function (element) {
        var _this = this;
        var id;
        var target = this;
        var uniqueId = _super.prototype.GetUniqueId.call(this, "feDataGrid");
        //创建最外层容器
        var div = document.createElement("div");
        $(div).attr("id", uniqueId);
        $(div).addClass("GfFeDataGrid");
        element.appendChild(div);
        element.xtag.div = div;
        element.xtag.parentDirectoryId = "";
        element.xtag.sortfield = "";
        element.xtag.sortType = GfFeDataGridSortType.Down;
        element.xtag.navigate = [];
        element.xtag.viewState = GfFeDataGridViewState.Large;
        //创建导航层
        var navigationContent = document.createElement("div");
        $(navigationContent).addClass("navigationContent");
        $(div).append(navigationContent);
        var span = document.createElement("span");
        span.id = uniqueId + "_navigation";
        $(span).addClass("left");
        $(navigationContent).append(span);
        //导航右文本
        span = document.createElement("span");
        span.id = uniqueId + "_NavRightText";
        $(span).addClass("right");
        //设置导航右文本
        if (element.navrighttext) {
            $(span).text(element.navrighttext);
        }
        $(navigationContent).append(span);
        //工具栏容器
        var toolbarContent = document.createElement("div");
        $(toolbarContent).addClass("toolbarContent");
        $(div).append(toolbarContent);
        //左工具栏
        var toolbarLeftContent = document.createElement("div");
        $(toolbarLeftContent).addClass("toolbarLeftContent");
        $(toolbarContent).append(toolbarLeftContent);
        //全选工具栏
        var toolbarLeftAllCheck = document.createElement("div");
        $(toolbarLeftAllCheck).addClass("toolbarLeftAllCheck");
        $(toolbarLeftContent).append(toolbarLeftAllCheck);
        //全选控件
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        $(toolbarLeftAllCheck).append(checkbox);
        $(toolbarLeftAllCheck).append("全选");
        $(checkbox).change(function () {
            if ($(checkbox).is(":checked")) {
                _this.showAllSelectItem(uniqueId);
            }
            else {
                _this.hideAllSelectItem(uniqueId);
            }
            _this.changeCheck(element);
        });
        //工具栏左文本
        var toolbarLeftText = document.createElement("div");
        toolbarLeftText.id = uniqueId + "_toolbarLeftText";
        $(toolbarLeftText).addClass("toolbarLeftText");
        if (element.lefttext) {
            $(toolbarLeftText).text(element.lefttext);
        }
        $(toolbarLeftContent).append(toolbarLeftText);
        //工具栏按钮
        var toolbarLeftButton = document.createElement("div");
        toolbarLeftButton.id = uniqueId + "_toolbarLeftButtonBox";
        $(toolbarLeftButton).addClass("toolbarLeftButton");
        $(toolbarLeftContent).append(toolbarLeftButton);
        //按钮
        if (element.toolbuttons) {
            var buttons = this.stringToObject(element.toolbuttons);
            target.setButtons(buttons, element);
        }
        //右边工具栏
        var toolbarRightContent = document.createElement("div");
        $(toolbarRightContent).addClass("toolbarRightContent");
        $(toolbarContent).append(toolbarRightContent);
        //排序
        if (element.sortfields) {
            var fields = this.stringToObject(element.sortfields);
            if (fields.length > 0) {
                var toolbarRightSort = document.createElement("div");
                $(toolbarRightSort).addClass("toolbarRightSort");
                toolbarRightSort.id = uniqueId + "_sort_text";
                $(toolbarRightSort).append("<i class='fa fa-long-arrow-down' aria-hidden='true'></i>" + fields[0].name);
                $(toolbarRightContent).append(toolbarRightSort);
            }
        }
        //视图切换
        var toolbarRightView = document.createElement("div");
        $(toolbarRightView).addClass("toolbarRightView");
        $(toolbarRightView).append("<i id='" + uniqueId + "_viewButton_large' class='fa fa-th-large selected' aria-hidden='true'></i>");
        $(toolbarRightView).append("<i id='" + uniqueId + "_viewButton_list' class='fa fa-list-ul' aria-hidden='true'></i>");
        $(toolbarRightContent).append(toolbarRightView);
        id = "#" + uniqueId + "_viewButton_large";
        $(id).click(function () {
            _this.changeViewState(uniqueId, element, GfFeDataGridViewState.Large);
        });
        id = "#" + uniqueId + "_viewButton_list";
        $(id).click(function () {
            _this.changeViewState(uniqueId, element, GfFeDataGridViewState.List);
        });
        //添加排序字段
        if (element.sortfields) {
            var fields = this.stringToObject(element.sortfields);
            if (fields.length > 0) {
                //排序列表
                var toolbarRightSortItems = document.createElement("div");
                toolbarRightSortItems.id = uniqueId + "_sort_Items";
                $(toolbarRightSortItems).addClass("toolbarRightSortItems");
                fields.forEach(function (field) {
                    var sortSelectItemId = uniqueId + target.GetUniqueId("_sort_Items_Item_");
                    $(toolbarRightSortItems).append("<ul id='" + sortSelectItemId + "_down' sortType='down' field='" + field.field + "'  fieldName='" + field.name + "' ><i class='fa fa-long-arrow-down' aria-hidden='true'></i>" + field.name + "</ul>");
                    $(toolbarRightSortItems).append("<ul id='" + sortSelectItemId + "_up' sortType='up' field='" + field.field + "' fieldName='" + field.name + "' ><i class='fa fa-long-arrow-up' aria-hidden='true'></i>" + field.name + "</ul>");
                });
                $(div).append(toolbarRightSortItems);
                //添加排序项点击事件
                $("[id^='" + uniqueId + "_sort_Items_Item_']").click(function () {
                    var sortType;
                    if ($(this).attr("sortType") == "down") {
                        sortType = GfFeDataGridSortType.Down;
                    }
                    else {
                        sortType = GfFeDataGridSortType.Up;
                    }
                    element.xtag.sortfield = $(this).attr("field");
                    element.xtag.sortFieldName = $(this).attr("fieldName");
                    element.xtag.sortType = sortType;
                    target.dataLoader(element);
                    $("#" + element.xtag.div.id + "_sort_Items").hide();
                });
                //添加鼠标移动事件，显示引用排序列
                id = "#" + uniqueId + "_sort_text";
                var itemsId = "#" + uniqueId + "_sort_Items";
                $(id).mouseenter(function () {
                    var left = $(id).offset().left;
                    var top = $(id).offset().top;
                    var width = $(id).width();
                    var right = left + width;
                    $(itemsId).show();
                    width = $(itemsId).width();
                    left = right - width;
                    $(itemsId).offset({ top: top, left: left });
                });
                $(itemsId).mouseleave(function () {
                    $(itemsId).hide();
                });
            }
        }
        //添加大图标列表
        var largeDataGridView = document.createElement("div");
        largeDataGridView.id = "largeDataGridView_" + uniqueId;
        $(largeDataGridView).addClass("largeDataGridView");
        $(div).append(largeDataGridView);
        //清浮动
        var clear = document.createElement("div");
        clear.className = "clear";
        $(div).append(clear);
        //添加列表视图容器
        var listDataGridView = document.createElement("div");
        listDataGridView.id = "listDataGridView_" + uniqueId;
        $(listDataGridView).addClass("listDataGridView");
        $(div).append(listDataGridView);
        //添加列表视图控件
        var listDataGridViewControl = document.createElement("div");
        listDataGridViewControl.id = "control_listDataGridView_" + uniqueId;
        $(listDataGridView).append(listDataGridViewControl);
        //分页控件
        if (element.pagination) {
            var pagination = document.createElement("div");
            pagination.id = uniqueId + "_paginationControl";
            $(pagination).addClass("pagination");
            $(div).append(pagination);
            //如果是html标签设置
            if (!element.loadmodel || element.loadmodel.toLowerCase() == "html") {
                element.xtag.pageArgs = target.stringToObject(element.paginationargs);
            }
        }
        //加载排序和数据
        if (element.sortfields) {
            var fields = this.stringToObject(element.sortfields);
            if (fields.length > 0) {
                element.xtag.sortfield = fields[0].Name;
                element.xtag.sortType = GfFeDataGridSortType.Down;
                this.dataLoader(element);
            }
            else {
                element.xtag.sortfield = "";
                element.xtag.sortType = GfFeDataGridSortType.Down;
                this.dataLoader(element);
            }
        }
        else {
            element.xtag.sortfield = "";
            element.xtag.sortType = GfFeDataGridSortType.Down;
            this.dataLoader(element);
        }
        //清浮动
        clear = document.createElement("div");
        clear.className = "clear";
        $(div).append(clear);
        return div;
    };
    GfFeDataGrid.prototype.initContent = function (element) {
        var target = this;
        var div = this.builddiv(element);
        $.parser.parse($(div).parent());
    };
    GfFeDataGrid.prototype.createNavigation = function (element) {
        var navId = element.xtag.div.id + "_navigation";
        var target = this;
        $("#" + navId).empty();
        if (element.xtag.data && element.xtag.data.Navigation.length > 0) {
            var naviage = element.xtag.data.Navigation;
            //加入返回上一级导航
            if (naviage.length > 1) {
                $("#" + navId).append("<a id='" + navId + this.GetUniqueId("_item_") + "' href='#' navId='" + naviage[naviage.length - 2].Id + "' class='navLink'>返回上一级</a><span class='navSeparator'>|</span>");
            }
            //添加导航
            for (var i = 0; i < naviage.length; i++) {
                //如果不是根节点，加入分隔符
                if (i != 0) {
                    $("#" + navId).append("<span class='navSeparator'>&gt;</span>");
                }
                //如果是最后一项，自己。
                if (i + 1 == naviage.length) {
                    $("#" + navId).append("<span class='navText'>" + naviage[i].Text + "</span>");
                }
                else {
                    $("#" + navId).append("<a id='" + navId + this.GetUniqueId("_item_") + "' navId='" + naviage[i].Id + "' href='#' class='navLink'>" + naviage[i].Text + "</a>");
                }
            }
            $("a[id^=" + navId + "_item_]").click(function () {
                element.xtag.parentDirectoryId = $(this).attr("navId");
                target.setPageNumber(element, 1);
                target.dataLoader(element);
            });
        }
    };
    GfFeDataGrid.prototype.dataLoader = function (element) {
        var _this = this;
        var uniqueId = element.xtag.div.id;
        var target = this;
        var largeDataGridView = $("#largeDataGridView_" + uniqueId)[0];
        var listDataGridViewId = "#control_listDataGridView_" + uniqueId;
        var columns = [[]];
        $(largeDataGridView).empty();
        //加载表
        if (element.url) {
            var postData = {};
            postData.directoryId = element.xtag.parentDirectoryId;
            postData.sortField = element.xtag.sortfield;
            postData.sortType = element.xtag.sortType;
            if (Object.prototype.toString.call(element.xtag.queryParams) === "[object String]") {
                postData.queryParams = element.xtag.queryParams;
            }
            else {
                postData.queryParams = JSON.stringify(element.xtag.queryParams);
            }
            if (element.xtag.pageArgs) {
                if (element.xtag.pageArgs.pageSize) {
                    postData.pageSize = element.xtag.pageArgs.pageSize;
                }
                else {
                    postData.pageSize = 10;
                }
                if (element.xtag.pageArgs.pageNumber) {
                    postData.pageNumber = element.xtag.pageArgs.pageNumber;
                }
            }
            $.ajax({
                type: "POST",
                url: element.url,
                data: postData,
                dataType: "json",
                success: function (result) {
                    element.xtag.data = result;
                    target.createNavigation(element);
                    element.xtag.parentDirectoryId = result.DirectoryId;
                    element.xtag.parentDirectoryName = result.DirectoryName;
                    //添加checkbox
                    if (element.showcheckbox) {
                        var colCheckbox = {};
                        colCheckbox.title = "";
                        colCheckbox.field = "checkbox";
                        colCheckbox.formatter = function (value, row, index) {
                            var id = uniqueId + "_checkbox_listDataGridView_" + row.Id.replace("@", "_");
                            return "<input id='" + id + "' recordId='" + row.Id + "' type='checkbox' />";
                        };
                        columns[0].push(colCheckbox);
                    }
                    if (!element.loadmodel || element.loadmodel.toLowerCase() == "html") {
                        //设置列
                        if (element.datacolumns) {
                            var args = target.stringToObject(element.datacolumns);
                            args.forEach(function (column) {
                                columns[0].push(column);
                            });
                        }
                    }
                    else if (element.loadmodel.toLowerCase() == "cs") {
                        //后台设置列
                        result.Columns.forEach(function (column) {
                            var col = {};
                            col.title = column.Text;
                            col.field = column.Field;
                            if (column.Width) {
                                col.width = column.Width;
                            }
                            if (column.Align) {
                                col.align = column.Align;
                            }
                            if (column.HAlign) {
                                col.halign = column.HAlign;
                            }
                            if (column.SorTable) {
                                col.sortable = true;
                            }
                            else {
                                col.sortable = false;
                            }
                            if (column.ReSizable) {
                                col.resizable = true;
                            }
                            else {
                                col.resizable = false;
                            }
                            if (column.Hidden) {
                                col.hidden = true;
                            }
                            else {
                                col.hidden = false;
                            }
                            if (column.Formatter) {
                                fun = target.stringToObject(column.Formatter);
                                col.formatter = fun;
                            }
                            columns[0].push(col);
                        });
                    }
                    var paginationArgs = null;
                    //加载分页控件
                    if (element.pagination) {
                        var paginationId = "#" + uniqueId + "_paginationControl";
                        paginationArgs = {};
                        if (!element.loadmodel || element.loadmodel.toLowerCase() == "html") {
                            //设置分页
                            paginationArgs = element.xtag.pageArgs;
                        }
                        else if (element.loadmodel.toLowerCase() === "cs") {
                            if (!element.xtag.pageArgs) {
                                element.xtag.pageArgs = {
                                    pageSize: result.PageSize,
                                    pageNumber: result.PageNumber
                                };
                            }
                            else {
                                element.xtag.pageArgs.pageSize = result.PageSize;
                                element.xtag.pageArgs.pageNumber = result.PageNumber;
                            }
                            //后台设置分页
                            paginationArgs.pageSize = result.PageSize;
                            paginationArgs.pageNumber = result.PageNumber;
                            if (result.PageList && result.PageList.length > 0) {
                                paginationArgs.pageList = result.PageList;
                                paginationArgs.showPageList = true;
                            }
                            else {
                                paginationArgs.showPageList = false;
                            }
                            paginationArgs.loading = result.Loading;
                            paginationArgs.showRefresh = result.ShowRefresh;
                            if (result.BeforePageText) {
                                paginationArgs.beforePageText = result.BeforePageText;
                            }
                            if (result.AfterPageText) {
                                paginationArgs.afterPageText = result.AfterPageText;
                            }
                            if (result.DisplayMsg) {
                                paginationArgs.displayMsg = result.DisplayMsg;
                            }
                        }
                        paginationArgs.total = result.RecordTotal;
                        //添加事件
                        paginationArgs.onSelectPage = function (pageNumber, pageSize) {
                            if (!element.xtag.pageArgs) {
                                element.xtag.pageArgs = {};
                            }
                            element.xtag.pageArgs.pageSize = pageSize;
                            element.xtag.pageArgs.pageNumber = pageNumber;
                            _this.dataLoader(element);
                        };
                        $(paginationId).pagination(paginationArgs);
                    }
                    //加载大图标列表
                    result.Items.forEach(function (record) {
                        //数据项
                        var dataItem = document.createElement("div");
                        $(dataItem).addClass("dataItem");
                        $(dataItem).attr("recordId", record.Id);
                        dataItem.id = uniqueId + target.GetUniqueId("_dataItem_");
                        $(largeDataGridView).append(dataItem);
                        //选择框
                        var checkItem = document.createElement("div");
                        $(checkItem).addClass("checkItem");
                        $(dataItem).append(checkItem);
                        //选择框控件
                        var checkItemControl = document.createElement("input");
                        checkItemControl.type = "checkbox";
                        $(checkItem).append(checkItemControl);
                        $(checkItem).append("&nbsp;");
                        $(checkItemControl).change(function () {
                            _this.changeCheck(element);
                        });
                        //数据项图片
                        var imageItem;
                        //文件夹
                        if (record.IsDirectory) {
                            imageItem = document.createElement("img");
                            $(imageItem).addClass("imageItemDirectory");
                            imageItem.src = document.body["apppath"] + "FrontEnd/Back/Content/images/folder.png";
                            imageItem.id = "imageItem_" + dataItem.id;
                            $(dataItem).append(imageItem);
                        }
                        else {
                            //文件图标优先
                            if (record.Icon) {
                                imageItem = document.createElement("span");
                                $(imageItem).addClass("imageItemContainer");
                                var imageControl = document.createElement("img");
                                imageControl.src = document.body["apppath"] + record.Icon + _this.GetUniqueId("?");
                                $(imageControl).addClass("imageItem");
                                $(imageItem).append(imageControl);
                                //计算图片大小，缩放容器，避免失真
                                //1.如果无法获取图片尺寸，则把图片统一设置为宽103，高86，不考虑失真问题。
                                if (parseInt(record.Width) !== record.Width
                                    || parseInt(record.Height) !== record.Height) {
                                    $(imageControl).css("width", "103px");
                                    $(imageControl).css("height", "86px");
                                }
                                else if (record.Width <= 103 && record.Height <= 86) {
                                    //2.如果宽度小于103且宽度小于86，使用原尺寸，图片居中
                                    $(imageControl).css("width", record.Width + "px");
                                    $(imageControl).css("height", record.Height + "px");
                                }
                                else {
                                    //3.容器宽除图片宽，容器高除图片高，算出比例
                                    var wRatio = 103 / record.Width;
                                    var hRatio = 86 / record.Height;
                                    //4.取小比例，设置容器宽和高。
                                    var ratio;
                                    if (wRatio < hRatio) {
                                        ratio = wRatio;
                                    }
                                    else {
                                        ratio = hRatio;
                                    }
                                    var width = record.Width * ratio;
                                    var height = record.Height * ratio;
                                    width = parseInt(width);
                                    height = parseInt(height);
                                    $(imageControl).css("width", width + "px");
                                    $(imageControl).css("height", height + "px");
                                }
                                imageItem.id = "imageItem_" + dataItem.id;
                                $(dataItem).append(imageItem);
                                //加入异步处理,是否被引用
                                if (element.isrefasyncurl) {
                                    $(imageControl).load(function () {
                                        $.ajax({
                                            type: "POST",
                                            url: element.isrefasyncurl,
                                            data: { fileId: record.Id },
                                            dataType: "text",
                                            success: function (asyncIsRef) {
                                                if (asyncIsRef.toLowerCase() === "true") {
                                                    var imageViewRef = "<div class='imageViewRef'><span>引</span></div>";
                                                    $(dataItem).append(imageViewRef);
                                                }
                                            }
                                        });
                                    });
                                }
                            }
                            else if (record.FaIcon) {
                                //字体图标
                                imageItem = document.createElement("span");
                                imageItem.className = record.FaIcon + " faImageItem";
                                imageItem.id = "imageItem_" + dataItem.id;
                                $(dataItem).append(imageItem);
                                //加入异步处理,是否被引用
                                if (element.isrefasyncurl) {
                                    $.ajax({
                                        type: "POST",
                                        url: element.isrefasyncurl,
                                        data: { fileId: record.Id },
                                        dataType: "text",
                                        success: function (asyncIsRef) {
                                            if (asyncIsRef.toLowerCase() === "true") {
                                                var imageViewRef = "<div class='imageViewRef'><span>引</span></div>";
                                                $(dataItem).append(imageViewRef);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        $(imageItem).dblclick(function () {
                            _this.dataItemDblClick(record, element);
                        });
                        $(imageItem).click(function () {
                            _this.changeImageCheckboxState(element, record.Id);
                        });
                        //文本
                        var textItem = document.createElement("div");
                        textItem.className = "textItem";
                        textItem.title = record.Name;
                        $(textItem).append(record.Name);
                        $(dataItem).append(textItem);
                        //带锁图标
                        if (record.IsLock) {
                            var lockImage = document.createElement("img");
                            lockImage.className = "lockImage";
                            lockImage.src = document.body["apppath"] + "FrontEnd/Back/Content/images/lock.png";
                            $(dataItem).append(lockImage);
                            $(lockImage).dblclick(function () {
                                _this.dataItemDblClick(record, element);
                            });
                            $(lockImage).click(function () {
                                _this.changeImageCheckboxState(element, record.Id);
                            });
                        }
                        //添加图片视图层代码
                        if (record.IsShowImageView && record.Icon) {
                            var imageViewId = "imageView_" + dataItem.id;
                            var imageView = "<table id='" + imageViewId + "' class='imageView'>";
                            imageView += "<tr class='operContent'>";
                            imageView += "<td>";
                            imageView += "<img title='复制链接' imageItemId='imageItem_" + dataItem.id + "' id='copyLink_" + imageViewId + "' src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/img-copy-link.png' />";
                            imageView += "</td>";
                            imageView += "<td>";
                            imageView += "<img title='复制图片' imageItemId='imageItem_" + dataItem.id + "' id='copyImg_" + imageViewId + "' src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/img-copy-img.png' />";
                            imageView += "</td>";
                            imageView += "<td>";
                            imageView += "<img title='复制代码' imageItemId='imageItem_" + dataItem.id + "' id='copyCode_" + imageViewId + "' src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/img-copy-code.png' />";
                            imageView += "</td>";
                            imageView += "</tr>";
                            imageView += "<tr class='textContent'>";
                            imageView += "<td colspan='3'><div title='" + record.Name + "'>" + record.Name + "</div></td>";
                            imageView += "</tr>";
                            imageView += "</table>";
                            $(dataItem).append(imageView);
                            $("#copyLink_" + imageViewId).zclip({
                                path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
                                copy: function () {
                                    $(this).fadeOut();
                                    $(this).fadeIn();
                                    var imageItemId = $(this).attr("imageItemId");
                                    var imageUrl = location.origin + $("#" + imageItemId + " img").attr("src");
                                    return imageUrl;
                                }
                            });
                            $("#copyImg_" + imageViewId).zclip({
                                path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
                                copy: function () {
                                    $(this).fadeOut();
                                    $(this).fadeIn();
                                    var imageItemId = $(this).attr("imageItemId");
                                    var imageUrl = location.origin + $("#" + imageItemId + " img").attr("src");
                                    return imageUrl;
                                }
                            });
                            $("#copyCode_" + imageViewId).zclip({
                                path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
                                copy: function () {
                                    $(this).fadeOut();
                                    $(this).fadeIn();
                                    var imageItemId = $(this).attr("imageItemId");
                                    var imageUrl = $("#" + imageItemId + " img").attr("src");
                                    var code = "<img src='" + imageUrl + "' />";
                                    return code;
                                }
                            });
                        }
                        //添加被引用提示层代码
                        if (!element.isrefasyncurl) {
                            if (record.IsRef) {
                                var imageViewRef = "<div class='imageViewRef'><span>引</span></div>";
                                $(dataItem).append(imageViewRef);
                            }
                        }
                        $(dataItem).mouseenter(function () {
                            var imageViewId = "#imageView_" + $(this).attr("id");
                            $(imageViewId).show();
                            target.showSelectItem($(this).attr("id"));
                        });
                        $(dataItem).mouseleave(function () {
                            var imageViewId = "#imageView_" + $(this).attr("id");
                            $(imageViewId).hide();
                            if (!target.isCheckedItem($(this).attr("id"))) {
                                target.hideSelectItem($(this).attr("id"));
                            }
                        });
                    });
                    //加载详细列表
                    $($(listDataGridViewId).parent()).show();
                    $(listDataGridViewId).datagrid({
                        columns: columns,
                        data: result.Items,
                        onCheck: function (rowIndex, rowData) {
                            var id = uniqueId + "_checkbox_listDataGridView_" + rowData.Id.replace("@", "_");
                            if ($("#" + id).is(":checked")) {
                                _this.setImageCheckbox(element, rowData.Id, true);
                            }
                            else {
                                _this.setImageCheckbox(element, rowData.Id, false);
                            }
                        },
                        onUncheck: function (rowIndex, rowData) {
                            var id = uniqueId + "_checkbox_listDataGridView_" + rowData.Id.replace("@", "_");
                            if ($("#" + id).is(":checked")) {
                                _this.setImageCheckbox(element, rowData.Id, true);
                            }
                            else {
                                _this.setImageCheckbox(element, rowData.Id, false);
                            }
                        },
                        onDblClickCell: function (rowIndex, field, value) {
                            var record = $(listDataGridViewId).datagrid('getData').rows[rowIndex];
                            _this.dataItemDblClick(record, element);
                        }
                    });
                    //还原视图状态
                    target.changeViewState(element.xtag.div.id, element, element.xtag.viewState);
                    //设置当前排序字段文本
                    if (element.xtag.sortfield) {
                        var toolbarRightSortId = "#" + uniqueId + "_sort_text";
                        if (element.xtag.sortType == GfFeDataGridSortType.Down) {
                            $(toolbarRightSortId).empty();
                            $(toolbarRightSortId).append("<i class='fa fa-long-arrow-down' aria-hidden='true'></i>" + element.xtag.sortFieldName);
                        }
                        else {
                            $(toolbarRightSortId).empty();
                            $(toolbarRightSortId).append("<i class='fa fa-long-arrow-up' aria-hidden='true'></i>" + element.xtag.sortFieldName);
                        }
                    }
                    //loaded事件
                    if (element.loaded) {
                        var fun = target.stringToObject(element.loaded);
                        fun(element);
                    }
                }
            });
        }
    };
    //设置工具栏按钮
    GfFeDataGrid.prototype.setButtons = function (buttons, element) {
        var _this = this;
        var id = "#" + element.xtag.div.id + "_toolbarLeftButtonBox";
        $(id).empty();
        var target = this;
        if (buttons && buttons.length > 0) {
            buttons.forEach(function (buttonName) {
                var toolButton = document.createElement("a");
                $(toolButton).addClass("easyui-linkbutton");
                $(toolButton).text(buttonName);
                $(id).append(toolButton);
                $(toolButton).click(function () {
                    _this.toolButtonClick($(toolButton).text(), element);
                });
            });
            $.parser.parse($(id));
        }
    };
    //设置工具栏左文本
    GfFeDataGrid.prototype.setLeftText = function (text, element) {
        var target = this;
        var id = "#" + element.xtag.div.id + "_toolbarLeftText";
        element.lefttext = text;
        if (text) {
            $(id).text(text);
        }
        else {
            $(id).text("");
        }
    };
    //设置导航栏右文本
    GfFeDataGrid.prototype.setNavRightText = function (text, element) {
        var target = this;
        var id = "#" + element.xtag.div.id + "_NavRightText";
        element.navrighttext = text;
        if (text) {
            $(id).text(text);
        }
        else {
            $(id).text("");
        }
    };
    GfFeDataGrid.prototype.changeImageCheckboxState = function (element, recordId) {
        var id = element.xtag.div.id + "_dataItem_";
        var imageCheckboxList = $("[id^='" + id + "']");
        if (imageCheckboxList) {
            for (var i = 0; i < imageCheckboxList.length; i++) {
                if ($(imageCheckboxList[i]).attr("recordId") == recordId) {
                    if ($(imageCheckboxList[i]).children().first().children().first().is(":checked")) {
                        this.setImageCheckbox(element, recordId, false);
                    }
                    else {
                        this.setImageCheckbox(element, recordId, true);
                    }
                    break;
                }
            }
        }
    };
    GfFeDataGrid.prototype.setImageCheckbox = function (element, recordId, isChecked) {
        var id = element.xtag.div.id + "_dataItem_";
        var imageCheckboxList = $("[id^='" + id + "']");
        var checkboxControl;
        if (imageCheckboxList) {
            for (var i = 0; i < imageCheckboxList.length; i++) {
                if ($(imageCheckboxList[i]).attr("recordId") == recordId) {
                    checkboxControl = imageCheckboxList[i];
                    $(imageCheckboxList[i]).children().first().children().first().prop("checked", isChecked);
                    break;
                }
            }
            if (isChecked) {
                this.showSelectItem($(checkboxControl).attr("id"));
            }
            else {
                this.hideSelectItem($(checkboxControl).attr("id"));
            }
            this.changeCheck(element);
        }
    };
    GfFeDataGrid.prototype.setPageNumber = function (element, pageNumber) {
        if (element.pagination) {
            if (!element.xtag.pageArgs) {
                element.xtag.pageArgs = {};
            }
            element.xtag.pageArgs.pageNumber = pageNumber;
        }
    };
    GfFeDataGrid.prototype.dataItemDblClick = function (record, element) {
        if (element.autodirectoryclick && record.IsDirectory) {
            element.xtag.parentDirectoryId = record.Id;
            this.setPageNumber(element, 1);
            this.dataLoader(element);
        }
        else {
            if (element.dataitemdblclick) {
                var fun = this.stringToObject(element.dataitemdblclick);
                fun(record, element, element.xtag.sortfield, element.xtag.sortType);
            }
        }
    };
    GfFeDataGrid.prototype.showAllSelectItem = function (uniqueId) {
        var target = this;
        var id = uniqueId + "_dataItem_";
        $("[id^='" + id + "']").each(function () {
            $(this).children().first().children().first().prop("checked", true);
            target.showSelectItem($(this).attr("id"));
        });
    };
    GfFeDataGrid.prototype.hideAllSelectItem = function (uniqueId) {
        var target = this;
        var id = uniqueId + "_dataItem_";
        $("[id^='" + id + "']").each(function () {
            $(this).children().first().children().first().prop("checked", false);
            target.hideSelectItem($(this).attr("id"));
        });
    };
    GfFeDataGrid.prototype.showSelectItem = function (dataItemId) {
        //显示复选框
        var id = "#" + dataItemId;
        var checkControl = $(id).children().first().children().first();
        $(checkControl).show();
        $(id).addClass("dataItemMouseEnter");
        $(id).removeClass("dataItem");
    };
    GfFeDataGrid.prototype.isCheckedItem = function (dataItemId) {
        var id = "#" + dataItemId;
        var checkControl = $(id).children().first().children().first();
        if ($(checkControl).is(":checked")) {
            return true;
        }
        return false;
    };
    GfFeDataGrid.prototype.changeCheck = function (element) {
        var target = this;
        var id = element.xtag.div.id + "_dataItem_";
        var records = [];
        $("[id^='" + id + "']").each(function () {
            var recordId = $(this).attr("recordId");
            if ($(this).children().first().children().first().is(":checked")) {
                for (var i = 0; i < element.xtag.data.Items.length; i++) {
                    if (element.xtag.data.Items[i].Id == recordId) {
                        records.push(element.xtag.data.Items[i]);
                        break;
                    }
                }
            }
        });
        //同步列表视图的checkbox
        $("[id^=" + element.xtag.div.id + "_checkbox_listDataGridView_]").each(function () {
            var recordId = $(this).attr("recordId");
            var isChecked = false;
            for (var i = 0; i < records.length; i++) {
                if (recordId == records[i].Id) {
                    isChecked = true;
                    break;
                }
            }
            $(this).prop("checked", isChecked);
        });
        element.xtag.checkList = records;
        if (element.changecheck) {
            var fun = this.stringToObject(element.changecheck);
            fun(records, element);
        }
    };
    GfFeDataGrid.prototype.hideSelectItem = function (dataItemId) {
        var id = "#" + dataItemId;
        var checkControl = $(id).children().first().children().first();
        $(checkControl).hide();
        $(id).addClass("dataItem");
        $(id).removeClass("dataItemMouseEnter");
    };
    GfFeDataGrid.prototype.resize = function (state, element) {
        //自动填充容器
        if (element.fit) {
            //height: 731px;  169
            var parentHeight = $(element).parent().height();
            var largeDataGridViewId = "#largeDataGridView_" + element.xtag.div.id;
            var listDataGridViewId = "#listDataGridView_" + element.xtag.div.id;
            $(largeDataGridViewId).css("height", (parentHeight - 169) + "px");
            $(listDataGridViewId).css("height", (parentHeight - 119) + "px");
        }
    };
    GfFeDataGrid.prototype.changeViewState = function (uniqueId, element, state) {
        var largeId = "#" + uniqueId + "_viewButton_large";
        var listId = "#" + uniqueId + "_viewButton_list";
        var largeDataGridViewId = "#largeDataGridView_" + uniqueId;
        var listDataGridViewId = "#listDataGridView_" + uniqueId;
        element.xtag.viewState = state;
        switch (state) {
            case GfFeDataGridViewState.Large:
                $(listId).removeClass("selected");
                $(largeId).addClass("selected");
                $(largeDataGridViewId).show();
                $(listDataGridViewId).hide();
                break;
            case GfFeDataGridViewState.List:
                $(largeId).removeClass("selected");
                $(listId).addClass("selected");
                $(largeDataGridViewId).hide();
                $(listDataGridViewId).show();
                var listDataGridViewId = "#control_listDataGridView_" + uniqueId;
                $(listDataGridViewId).datagrid("resize");
                break;
        }
        this.resize(state, element);
        if (element.changeviewstate) {
            var fun = this.stringToObject(element.changeviewstate);
            fun(state, element);
        }
    };
    GfFeDataGrid.prototype.toolButtonClick = function (buttonName, element) {
        if (element.toolbuttonsclick) {
            var fun = this.stringToObject(element.toolbuttonsclick);
            fun(buttonName, element);
        }
    };
    return GfFeDataGrid;
}(CustomElement));
var GfFeImageViewer = (function (_super) {
    __extends(GfFeImageViewer, _super);
    function GfFeImageViewer(extension) {
        var _this = _super.call(this, extension) || this;
        _this.autoInit = true;
        _this.elementName = "Gf-GfFeImageViewer";
        //关闭按钮点击事件
        _this.addProperty("closeclick");
        //从服务器加载数据的url
        _this.addProperty("url");
        //通过url从服务器加载数据时的参数
        _this.addProperty("imageid");
        //单击图片列表中图片项事件
        _this.addProperty("imageitemclick");
        //是否自动处理图片切换请求，需要指定url才有效
        _this.addboolProperty("autoimageitemclick");
        _this.addMethod("reload", "function(id,sortfield,sortType){ this.xtag.isReloadImageNavigate = true; this.imageid = id; control.dataLoader(this,sortfield,sortType); }");
        return _this;
    }
    //构建控件
    GfFeImageViewer.prototype.buildControls = function (element) {
        var _this = this;
        var uniqueId = this.GetUniqueId("feImageViewer");
        //复制链接按钮id
        element.xtag.copyLinkButtonId = uniqueId + "_CopyLinkButton";
        //复制图片按钮id
        element.xtag.copyImageButtonId = uniqueId + "_CopyImageButton";
        //复制代码按钮id
        element.xtag.copyCodeButtonId = uniqueId + "_CopyCodeButton";
        //关闭按钮id
        element.xtag.closeButtonId = uniqueId + "_CloseButton";
        //图片展示控件id
        element.xtag.imgViewId = uniqueId + "_ImgView";
        //图片名称id
        element.xtag.imageNameId = uniqueId + "_ImageName";
        //上传时间标签id
        element.xtag.createOnId = uniqueId + "_CreateOn";
        //上传者标签id
        element.xtag.creatorId = uniqueId + "_Creator";
        //原图文件大小标签id
        element.xtag.fileSizeId = uniqueId + "_FileSize";
        //原图尺寸标签id
        element.xtag.imageSizeId = uniqueId + "_ImageSize";
        //原图位置标签id
        element.xtag.imageLocationId = uniqueId + "_ImageLocation";
        //图片尺寸列表id
        element.xtag.imageSizeListId = uniqueId + "_ImageSizeList";
        //图片列表容器id
        element.xtag.imageListId = uniqueId + "_ImageList";
        //图片列表左翻页id
        element.xtag.imageListLeftPageId = uniqueId + "_ImageListLeftPage";
        //图片列表右翻页id
        element.xtag.imageListRightPageId = uniqueId + "_ImageListRightPage";
        //当前导航页
        element.xtag.imageNavigateIndex = 1;
        //是否重新加载图片列表导航
        element.xtag.isReloadImageNavigate = true;
        //控件容器
        var container = document.createElement("div");
        $(container).attr("id", uniqueId);
        $(container).addClass("GfFeImageViewer");
        element.appendChild(container);
        element.xtag.container = container;
        //工具栏容器
        var toolbarContainer = document.createElement("div");
        $(toolbarContainer).addClass("toolbarContainer noselect");
        $(container).append(toolbarContainer);
        //复制链接
        var copyLinkButton = document.createElement("div");
        copyLinkButton.id = element.xtag.copyLinkButtonId;
        $(copyLinkButton).append("<img src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/img_view_link.png' />复制链接");
        $(toolbarContainer).append(copyLinkButton);
        $(toolbarContainer).append("<div style='width:30px;'>&nbsp;</div>");
        $(copyLinkButton).zclip({
            path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
            copy: function () {
                return _this.copyLinkButtonClick(copyLinkButton, element);
            }
        });
        //复制图片
        var copyImageButton = document.createElement("div");
        copyImageButton.id = element.xtag.copyImageButtonId;
        $(copyImageButton).append("<img src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/img_view_img.png' />复制图片");
        $(toolbarContainer).append(copyImageButton);
        $(toolbarContainer).append("<div style='width:30px;'>&nbsp;</div>");
        $(copyImageButton).zclip({
            path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
            copy: function () {
                return _this.copyImageButtonClick(copyImageButton, element);
            }
        });
        //复制代码
        var copyCodeButton = document.createElement("div");
        copyCodeButton.id = element.xtag.copyCodeButtonId;
        $(copyCodeButton).append("<img src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/img_view_code.png' />复制代码");
        $(toolbarContainer).append(copyCodeButton);
        $(toolbarContainer).append("<div style='width:30px;'>&nbsp;</div>");
        $(copyCodeButton).zclip({
            path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
            copy: function () {
                return _this.copyCodeButtonClick(copyCodeButton, element);
            }
        });
        //关闭按钮
        //var closeButton = document.createElement("div");
        //closeButton.id = element.xtag.closeButtonId;
        //$(closeButton).append("x");
        //$(closeButton).addClass("closeButton");
        //$(toolbarContainer).append(closeButton);
        //$(closeButton).click(() => {
        //    this.closeButtonClick(closeButton, element);
        //});
        //内容容器
        var contentContainer = document.createElement("div");
        $(contentContainer).addClass("contentContainer");
        $(container).append(contentContainer);
        $(contentContainer).append("<table class='imgViewContainer'><tr><td><img id='" + element.xtag.imgViewId + "' class='imgView' src='" + document.body["apppath"] + "FrontEnd/Back/Content/images/noimage.png' /></td></tr></table>");
        ////图片展示容器
        //var imgViewContainer = document.createElement("div");
        //$(imgViewContainer).addClass("imgViewContainer");
        //$(contentContainer).append(imgViewContainer);
        ////图片展示
        //var imgView = document.createElement("img");
        //imgView.id = element.xtag.imgViewId;
        //$(imgView).addClass("imgView");
        //$(imgView).attr("src", document.body["apppath"] + "FrontEnd/Back/Content/images/noimage.png");
        //$(imgViewContainer).append(imgView);
        //图片信息容器
        var infoContainer = document.createElement("div");
        $(infoContainer).addClass("infoContainer");
        $(contentContainer).append(infoContainer);
        //图片名
        var imageName = document.createElement("div");
        imageName.id = element.xtag.imageNameId;
        $(imageName).addClass("imageName");
        $(imageName).append("QQ截图20150810094958.pngQQ截图20150810094958.pngQQ截图20150810094958.pngQQ截图20150810094958.pngQQ截图20150810094958.png");
        $(imageName).attr("title", "QQ截图20150810094958.pngQQ截图20150810094958.pngQQ截图20150810094958.pngQQ截图20150810094958.pngQQ截图20150810094958.png");
        $(infoContainer).append(imageName);
        //图片属性容器
        var imgProperty = document.createElement("div");
        $(imgProperty).addClass("imgProperty");
        $(imgProperty).append("<span class='imgInfoTitle'>图片属性</span>");
        $(imgProperty).append("<span id='" + element.xtag.createOnId + "' class='imgInfoDetails'>上传时间：2015/08/10 09:52</span>");
        $(imgProperty).append("<span id='" + element.xtag.creatorId + "' class='imgInfoDetails'>上传者：454623</span>");
        $(imgProperty).append("<span id='" + element.xtag.fileSizeId + "' class='imgInfoDetails'>原图大小：7.11k</span>");
        $(imgProperty).append("<span id='" + element.xtag.imageSizeId + "' class='imgInfoDetails'>原图尺寸：478x370</span>");
        $(imgProperty).append("<span id='" + element.xtag.imageLocationId + "' class='imgInfoDetails'>原图位置：我的图片</span>");
        $(infoContainer).append(imgProperty);
        //图片尺寸容器
        var imgSize = document.createElement("div");
        $(imgSize).addClass("imgSize");
        $(imgSize).append("<span class='imgInfoTitle'>图片尺寸</span>");
        $(infoContainer).append(imgSize);
        //图片尺寸列表
        var imgSizeList = document.createElement("div");
        imgSizeList.id = element.xtag.imageSizeListId;
        $(imgSizeList).addClass("imgSizeList");
        $(imgSize).append(imgSizeList);
        for (var i = 0; i < 100; i++) {
            //图片尺寸数据项
            var imgSizeListItem = document.createElement("div");
            $(imgSizeListItem).addClass("imaSizeListItem");
            $(imgSizeListItem).append("原：478x370");
            $(imgSizeList).append(imgSizeListItem);
            //图片尺寸数据项查看按钮
            var imgSizeListItemViewButton = document.createElement("a");
            $(imgSizeListItemViewButton).attr("recordId", i);
            $(imgSizeListItemViewButton).addClass("noselect");
            $(imgSizeListItemViewButton).text("查看");
            $(imgSizeListItem).append(imgSizeListItemViewButton);
            //图片尺寸数据项复制按钮
            var imgSizeListItemCopyButton = document.createElement("a");
            $(imgSizeListItemCopyButton).attr("recordId", i);
            $(imgSizeListItemCopyButton).addClass("noselect");
            $(imgSizeListItemCopyButton).text("复制");
            $(imgSizeListItem).append(imgSizeListItemCopyButton);
            //添加按钮事件
            $(imgSizeListItemViewButton).click(function (e) {
                _this.imgSizeViewButtonClick(e.delegateTarget, element);
            });
            $(imgSizeListItemCopyButton).click(function (e) {
                _this.imgSizeCopyButtonClick(e.delegateTarget, element);
            });
            //分隔符
            $(imgSizeListItem).append("<span>|</span>");
        }
        //清浮动
        var clear = document.createElement("div");
        clear.className = "clear";
        $(container).append(clear);
        //图片列表容器
        var imgListContainer = document.createElement("div");
        $(imgListContainer).addClass("imgListContainer");
        $(container).append(imgListContainer);
        //图片列表左翻页
        var imgListLeftPage = document.createElement("div");
        imgListLeftPage.id = element.xtag.imageListLeftPageId;
        $(imgListLeftPage).addClass("imgListPage noselect");
        $(imgListLeftPage).append("&lt;");
        $(imgListContainer).append(imgListLeftPage);
        //图片列表
        var imgList = document.createElement("div");
        imgList.id = element.xtag.imageListId;
        $(imgList).addClass("imgList noselect");
        $(imgListContainer).append(imgList);
        //图片列表右翻页
        var imgListRightPage = document.createElement("div");
        imgListRightPage.id = element.xtag.imageListRightPageId;
        $(imgListRightPage).addClass("imgListPage noselect");
        $(imgListRightPage).append("&gt;");
        $(imgListContainer).append(imgListRightPage);
        for (var j = 0; j < 8; j++) {
            //图片列表数据项
            var imgListItem = document.createElement("img");
            $(imgListItem).addClass("imgListItem");
            $(imgListItem).attr("src", document.body["apppath"] + "FrontEnd/Back/Content/images/noimage.png");
            $(imgList).append(imgListItem);
        }
        return container;
    };
    GfFeImageViewer.prototype.imgSizeViewButtonClick = function (target, element) {
        return true;
    };
    GfFeImageViewer.prototype.imgSizeCopyButtonClick = function (target, element) {
        var url = location.origin + document.body["apppath"] + $(target).attr("imgUrl");
        return url;
    };
    //关闭按钮点击
    GfFeImageViewer.prototype.closeButtonClick = function (target, element) {
        var proxy = this.buildProxy(element.closeclick, element);
        if (proxy) {
            proxy(target);
        }
    };
    //构建代理方法
    GfFeImageViewer.prototype.buildProxy = function (property, element) {
        if (property) {
            var fun = this.stringToObject(property);
            if ($.isFunction(fun)) {
                return $.proxy(fun, element);
            }
        }
    };
    //复制代码按钮点击
    GfFeImageViewer.prototype.copyCodeButtonClick = function (target, element) {
        $(target).fadeOut();
        $(target).fadeIn();
        var imageUrl = $("#" + element.xtag.imgViewId).attr("src");
        var code = "<img src='" + imageUrl + "' />";
        return code;
    };
    //复制图片按钮点击
    GfFeImageViewer.prototype.copyImageButtonClick = function (target, element) {
        $(target).fadeOut();
        $(target).fadeIn();
        var imageUrl = location.origin + $("#" + element.xtag.imgViewId).attr("src");
        return imageUrl;
    };
    //复制链接按钮点击
    GfFeImageViewer.prototype.copyLinkButtonClick = function (target, element) {
        $(target).fadeOut();
        $(target).fadeIn();
        var imageUrl = location.origin + $("#" + element.xtag.imgViewId).attr("src");
        return imageUrl;
    };
    //点击图片列表中的图片项
    GfFeImageViewer.prototype.imageItemClick = function (target, element) {
        if (element.autoimageitemclick) {
            //刷新控件
            element.imageid = $(target).attr("recordId");
            //如果自动处理图片列表点击事件时，切换图片不需要重新加载列表，和切换分页到第一页
            element.xtag.isReloadImageNavigate = false;
            this.dataLoader(element);
        }
        else if (element.imageitemclick) {
            var proxy = this.buildProxy(element.imageitemclick, element);
            if (proxy) {
                proxy(target);
            }
        }
    };
    //初始化
    GfFeImageViewer.prototype.initContent = function (element) {
        var container = this.buildControls(element);
        this.dataLoader(element);
        //使用easyui重新渲染控件
        $.parser.parse($(container).parent());
    };
    //加载数据
    GfFeImageViewer.prototype.dataLoader = function (element, sortfield, sortType) {
        var _this = this;
        if (element.imageid) {
            var postData = {
                imageid: element.imageid,
                sortfield: sortfield,
                sortType: sortType
            };
            $.ajax({
                type: "POST",
                url: element.url,
                data: postData,
                dataType: "json",
                success: function (result) {
                    //计算图片大小，缩放容器，避免失真
                    //1.如果无法获取图片尺寸，则把图片统一设置为宽600，高400，不考虑失真问题。
                    if (parseInt(result.Width) !== result.Width || parseInt(result.Height) !== result.Height) {
                        $("#" + element.xtag.imgViewId).css("width", "600px");
                        $("#" + element.xtag.imgViewId).css("height", "400px");
                    }
                    else if (result.Width <= 600 && result.Height <= 400) {
                        //2.如果宽度小于600且宽度小于400，使用原尺寸，图片居中
                        $("#" + element.xtag.imgViewId).css("width", result.Width + "px");
                        $("#" + element.xtag.imgViewId).css("height", result.Height + "px");
                    }
                    else {
                        //3.容器宽除图片宽，容器高除图片高，算出比例
                        var wRatio = 600 / result.Width;
                        var hRatio = 400 / result.Height;
                        //4.取小比例，设置容器宽和高。
                        var ratio;
                        if (wRatio < hRatio) {
                            ratio = wRatio;
                        }
                        else {
                            ratio = hRatio;
                        }
                        //原图，宽1000，高800，600/1000=0.6，400/800=0.5，那么容器缩放后宽1000*0.5=500，高800*0.5=400
                        var width = result.Width * ratio;
                        var height = result.Height * ratio;
                        width = parseInt(width);
                        height = parseInt(height);
                        $("#" + element.xtag.imgViewId).css("width", width + "px");
                        $("#" + element.xtag.imgViewId).css("height", height + "px");
                    }
                    //显示图片
                    $("#" + element.xtag.imgViewId).attr("src", document.body["apppath"] + result.ImageUrl + _this.GetUniqueId("?"));
                    //设置图片属性
                    $("#" + element.xtag.imageNameId).text(result.ImageName);
                    $("#" + element.xtag.imageNameId).attr("title", result.ImageName);
                    $("#" + element.xtag.createOnId).text("上传时间：" + result.CreateOn);
                    $("#" + element.xtag.creatorId).text("上传者：" + result.Creator);
                    $("#" + element.xtag.fileSizeId).text("原图大小：" + result.FileSize);
                    $("#" + element.xtag.imageSizeId).text("原图大小：" + result.ImageSize);
                    $("#" + element.xtag.imageLocationId).text("原图位置：" + result.ImageLocation);
                    //图片尺寸
                    $("#" + element.xtag.imageSizeListId).empty();
                    if (result.ImageSizeList && result.ImageSizeList.length > 0) {
                        result.ImageSizeList.forEach(function (item) {
                            //图片尺寸数据项
                            var imgSizeListItem = document.createElement("div");
                            $(imgSizeListItem).addClass("imaSizeListItem");
                            $(imgSizeListItem).append(item.Title + "：" + item.Size);
                            $("#" + element.xtag.imageSizeListId).append(imgSizeListItem);
                            //图片尺寸数据项查看按钮
                            var imgSizeListItemViewButton = document.createElement("a");
                            $(imgSizeListItemViewButton).attr("recordId", item.Id);
                            $(imgSizeListItemViewButton).attr("imgUrl", item.Url);
                            $(imgSizeListItemViewButton).attr("href", document.body["apppath"] + item.Url);
                            $(imgSizeListItemViewButton).attr("target", "_blank");
                            $(imgSizeListItemViewButton).addClass("noselect");
                            $(imgSizeListItemViewButton).text("查看");
                            $(imgSizeListItem).append(imgSizeListItemViewButton);
                            //图片尺寸数据项复制按钮
                            var imgSizeListItemCopyButton = document.createElement("a");
                            $(imgSizeListItemCopyButton).attr("recordId", item.Id);
                            $(imgSizeListItemCopyButton).attr("imgUrl", item.Url);
                            $(imgSizeListItemCopyButton).addClass("noselect");
                            $(imgSizeListItemCopyButton).text("复制");
                            $(imgSizeListItem).append(imgSizeListItemCopyButton);
                            //添加按钮事件
                            $(imgSizeListItemViewButton).click(function (e) {
                                return _this.imgSizeViewButtonClick(e.delegateTarget, element);
                            });
                            $(imgSizeListItemCopyButton).zclip({
                                path: document.body["apppath"] + 'FrontEnd/Back/Content/Scripts/ZeroClipboard.swf',
                                copy: function (e) {
                                    return _this.imgSizeCopyButtonClick(e.delegateTarget, element);
                                }
                            });
                            //分隔符
                            $(imgSizeListItem).append("<span>|</span>");
                        });
                    }
                    //加载图片导航
                    element.xtag.imageList = result.ImageList;
                    if (!element.xtag.isReloadImageNavigate) {
                    }
                    else {
                        element.xtag.imageNavigateIndex = 1;
                        _this.imageNavigateLoader(element);
                    }
                }
            });
        }
    };
    //加载图片列表导航
    GfFeImageViewer.prototype.imageNavigateLoader = function (element) {
        var _this = this;
        $("#" + element.xtag.imageListId).empty();
        $("#" + element.xtag.imageListLeftPageId).unbind("click");
        $("#" + element.xtag.imageListLeftPageId).css("color", "#d7d7d7");
        $("#" + element.xtag.imageListRightPageId).unbind("click");
        $("#" + element.xtag.imageListRightPageId).css("color", "#d7d7d7");
        if (element.xtag.imageList && element.xtag.imageList.length > 0) {
            var i = 8 * (element.xtag.imageNavigateIndex - 1);
            var count = element.xtag.imageNavigateIndex * 8;
            if (count > element.xtag.imageList.length) {
                count = element.xtag.imageList.length;
            }
            for (; i < count; i++) {
                var recordItem = element.xtag.imageList[i];
                var imgListItemContainer = document.createElement("span");
                $(imgListItemContainer).addClass("imgListItemContainer");
                $("#" + element.xtag.imageListId).append(imgListItemContainer);
                var imgListItem = document.createElement("img");
                $(imgListItem).addClass("imgListItem");
                $(imgListItem).attr("src", document.body["apppath"] + recordItem.ImageUrl + this.GetUniqueId("?"));
                $(imgListItem).attr("recordId", recordItem.Id);
                $(imgListItemContainer).append(imgListItem);
                //计算图片大小，缩放容器，避免失真
                //1.如果无法获取图片尺寸，则把图片统一设置为宽76，高76，不考虑失真问题。
                if (parseInt(recordItem.Width) !== recordItem.Width
                    || parseInt(recordItem.Height) !== recordItem.Height) {
                    $(imgListItem).css("width", "76px");
                    $(imgListItem).css("height", "76px");
                }
                else if (recordItem.Width <= 76 && recordItem.Height <= 76) {
                    //2.如果宽度小于76且宽度小于76，使用原尺寸，图片居中
                    $(imgListItem).css("width", recordItem.Width + "px");
                    $(imgListItem).css("height", recordItem.Height + "px");
                }
                else {
                    //3.容器宽除图片宽，容器高除图片高，算出比例
                    var wRatio = 76 / recordItem.Width;
                    var hRatio = 76 / recordItem.Height;
                    //4.取小比例，设置容器宽和高。
                    var ratio;
                    if (wRatio < hRatio) {
                        ratio = wRatio;
                    }
                    else {
                        ratio = hRatio;
                    }
                    var width = recordItem.Width * ratio;
                    var height = recordItem.Height * ratio;
                    width = parseInt(width);
                    height = parseInt(height);
                    $(imgListItem).css("width", width + "px");
                    $(imgListItem).css("height", height + "px");
                }
                $(imgListItem).click(function (e) {
                    _this.imageItemClick(e.delegateTarget, element);
                });
            }
            //如果不是第一页显示左翻页
            if (element.xtag.imageNavigateIndex !== 1) {
                $("#" + element.xtag.imageListLeftPageId).css("color", "#333");
                $("#" + element.xtag.imageListLeftPageId).click(function () {
                    element.xtag.imageNavigateIndex = element.xtag.imageNavigateIndex - 1;
                    _this.imageNavigateLoader(element);
                });
            }
            //如果还有没显示的图片，显示右翻页
            if (count < element.xtag.imageList.length) {
                $("#" + element.xtag.imageListRightPageId).css("color", "#333");
                $("#" + element.xtag.imageListRightPageId).click(function () {
                    element.xtag.imageNavigateIndex = element.xtag.imageNavigateIndex + 1;
                    _this.imageNavigateLoader(element);
                });
            }
        }
    };
    return GfFeImageViewer;
}(CustomElement));
var Gffemultcombobox = (function (_super) {
    __extends(Gffemultcombobox, _super);
    function Gffemultcombobox(extension) {
        var _this = _super.call(this, extension) || this;
        _this.autoInit = true;
        _this.elementName = "Gf-GfFeUpFileDialog";
        _this.addProperty("getwatermarkurl");
        _this.addProperty("getimgsizeurl");
        _this.addProperty("showimagesizecheckbox");
        return _this;
    }
    Gffemultcombobox.prototype.initWebUploader = function (element) {
        _super.prototype.initWebUploader.call(this, element);
        //重新控件样式
        var toolbarid = "#" + element.get("toolbarid");
        $(toolbarid).empty();
        var uploaderImageSizeList = document.createElement("span");
        uploaderImageSizeList.className = "imageToolbarContainer";
        var uploaderWatemarkList = document.createElement("span");
        uploaderWatemarkList.className = "imageToolbarContainer";
        $(toolbarid).append(uploaderWatemarkList);
        $(toolbarid).append(uploaderImageSizeList);
        if (element.showimagesizecheckbox === "true") {
            //调整图片尺寸
            if (element.getimgsizeurl) {
                $.ajax({
                    url: element.getimgsizeurl,
                    dataType: "json",
                    type: "GET",
                    success: function (result) {
                        if (result.length > 0) {
                            var imgSizeCheckbox = document.createElement("input");
                            imgSizeCheckbox.type = "checkbox";
                            imgSizeCheckbox.id = element.xtag.imgSizeCheckboxId;
                            imgSizeCheckbox.className = "uploaderCheckbox";
                            $(uploaderImageSizeList).append(imgSizeCheckbox);
                            $(uploaderImageSizeList).append("调整图片尺寸");
                            var imgSizeCheckboxContainer = document.createElement("span");
                            imgSizeCheckboxContainer.className = "uploaderSelect";
                            $(uploaderImageSizeList).append(imgSizeCheckboxContainer);
                            var imgSizeSelect = document.createElement("input");
                            imgSizeSelect.id = element.xtag.imgSizeSelectId;
                            $(imgSizeCheckboxContainer).append(imgSizeSelect);
                            $(imgSizeCheckbox).change(function (e) {
                                if ($(e.delegateTarget).is(":checked")) {
                                    $(imgSizeCheckboxContainer).show();
                                }
                                else {
                                    $(imgSizeCheckboxContainer).hide();
                                }
                            });
                            var dataSource = [];
                            result.forEach(function (record) {
                                var width = record.Width;
                                if (width == -1) {
                                    width = "*";
                                }
                                var height = record.Height;
                                if (height == -1) {
                                    height = "*";
                                }
                                dataSource.push({ "id": record.ID, "text": width + " x " + height });
                            });
                            $(imgSizeSelect).combobox({
                                valueField: "id",
                                textField: "text",
                                mode: "local",
                                data: dataSource,
                                editable: false,
                                multiple: true
                            });
                            $(imgSizeCheckboxContainer).hide();
                        }
                    }
                });
            }
        }
        //添加水印
        if (element.getwatermarkurl) {
            $.ajax({
                url: element.getwatermarkurl,
                dataType: "json",
                type: "GET",
                success: function (result) {
                    if (result.length > 0) {
                        var watermarCheckbox = document.createElement("input");
                        watermarCheckbox.id = element.xtag.watermarCheckboxId;
                        watermarCheckbox.type = "checkbox";
                        watermarCheckbox.className = "uploaderCheckbox";
                        $(uploaderWatemarkList).append(watermarCheckbox);
                        $(uploaderWatemarkList).append("添加水印");
                        var watermarSelect = document.createElement("select");
                        watermarSelect.id = element.xtag.watermarSelectId;
                        watermarSelect.className = "uploaderSelect";
                        $(uploaderWatemarkList).append(watermarSelect);
                        $(watermarCheckbox).change(function (e) {
                            if ($(e.delegateTarget).is(":checked")) {
                                $(watermarSelect).show();
                            }
                            else {
                                $(watermarSelect).hide();
                            }
                        });
                        result.forEach(function (record) {
                            var option = $("<option>").val(record.ID).text(record.Name);
                            $(watermarSelect).append(option);
                        });
                        $(watermarSelect).hide();
                    }
                }
            });
        }
    };
    Gffemultcombobox.prototype.initContent = function (element) {
        _super.prototype.initContent.call(this, element);
        element.xtag.watermarCheckboxId = this.GetUniqueId("watermarCheckbox");
        element.xtag.watermarSelectId = this.GetUniqueId("watermarSelect");
        element.xtag.imgSizeCheckboxId = this.GetUniqueId("imgSizeCheckbox");
        element.xtag.imgSizeSelectId = this.GetUniqueId("imgSizeSelect");
    };
    return Gffemultcombobox;
}(GfUpFileDialog));
/*
****属性*****
设置控件title, 弹出窗口标题，不设置没有标题栏，设置" "显示标题，但没有问题。有标题栏才可拖拽
html:<Gf-FeImageSelector id="feImageSelector" dialogtitle="选择图片">
js:$("#feImageSelector").feImageSelector({ title: '选择图片1' });

设置目录树的根节点，默认为空，程序会识别为文件系统的根目录
html:<Gf-FeImageSelector rootdirectoryid="6dfd40570c084bda9b7989837fe24a9f@File">

设置获取文件目录信息的url，默认为“~/FeImageSelector/DirectoryTree”，已实现方法。
html:<Gf-FeImageSelector directorytreeurl="/FeImageSelector/DirectoryTree">

设置获取图片信息的url，默认为“~/FeImageSelector/ImageList”，已实现方法。
html:<Gf-FeImageSelector imagelisturl="/FeImageSelector/ImageList">

设置图片上传处理程序路径，默认为“~/FeImage/UpLoadProcess”，已实现方法。
html:<Gf-FeImageSelector upfileserver="/FeImage/UpLoadProcess">

设置图片上传时自动缩放尺寸列表url，默认为“”，不缩放。另提供获取全部尺寸方法，~/FeImageType/GetImageSizeList
html:<Gf-FeImageSelector getimgsizeurl="">

设置图片上传时自动添加水印url，默认为“”，不添加任何水印。另提供获取全部水印方法，~/FeWatermark/GetFeWatermarkPageList
html:<Gf-FeImageSelector getwatermarkurl="">

设置当前环境是否是后台，用于从配置中读取文件后缀和上传大小。默认为“false”，前台
注意：填写isback为true，不写为false
html:<Gf-FeImageSelector isback>

****方法****
以dialog模式显示控件
js:$("#feImageSelector").feImageSelector("open");

****事件****
选择图片，点击确认后触发submit事件，参数为图片id和图片的url
js:$("#feImageSelector").feImageSelector("submit", function(id, url) {  });
*/
var GfFeImageSelector = (function (_super) {
    __extends(GfFeImageSelector, _super);
    function GfFeImageSelector(extension) {
        var _this = _super.call(this, extension) || this;
        _this.autoInit = true;
        _this.elementName = "Gf-FeImageSelector";
        _this.addProperty("dialogtitle");
        _this.addProperty("rootdirectoryid");
        _this.addProperty("directorytreeurl");
        _this.addProperty("imagelisturl");
        _this.addProperty("getwatermarkurl");
        _this.addProperty("getimgsizeurl");
        _this.addboolProperty("isback");
        _this.addMethod("open", "function(){ control.openDialog(this); }");
        _this.addMethod("settitle", "function(title){ control.setTitle(this,title); }");
        _this.addMethod("setoptions", "function(options) { control.setOptions(this, options); }");
        return _this;
    }
    GfFeImageSelector.prototype.initContent = function (element) {
        var container = this.buildControls(element);
    };
    GfFeImageSelector.prototype.buildControls = function (element) {
        var _this = this;
        var uniqueId = this.GetUniqueId("feImageSelector");
        //初始化运行时状态对象
        element.xtag.runtime = {};
        //设置默认值
        this.setOptions(element, "default");
        //控件容器
        var container = document.createElement("div");
        $(container).attr("id", uniqueId);
        $(container).addClass("feImageSelector");
        element.appendChild(container);
        element.xtag.container = container;
        //添加上传控件
        var uploadControl = document.createElement("Gf-GfFeUpFileDialog");
        if (element.uploadControl) {
            $(uploadControl).attr("upfileserver", element.uploadControl);
        }
        else {
            $(uploadControl).attr("upfileserver", document.body["apppath"] + "FeImage/UpLoadProcess");
        }
        if (element.getimgsizeurl) {
            $(uploadControl).attr("getimgsizeurl", element.getimgsizeurl);
        }
        if (element.getwatermarkurl) {
            $(uploadControl).attr("getwatermarkurl", element.getwatermarkurl);
        }
        $(container).append(uploadControl);
        $(uploadControl)[0].registerEventHandler("onSubmit", function () {
            $(element.xtag.treeControl)[0].select(element.xtag.runtime.directoryId);
            _this.loadImageView(element, { id: element.xtag.runtime.directoryId, text: element.xtag.runtime.directoryText });
        });
        $(uploadControl)[0].overrideEventHandler("uploadBeforeSend", function (object, data, headers) {
            if ($("#" + this.xtag.watermarCheckboxId).is(":checked")) {
                data.watermarkId = $("#" + this.xtag.watermarSelectId).val();
            }
            if ($("#" + this.xtag.imgSizeCheckboxId).is(":checked")) {
                data.sizeIds = $("#" + this.xtag.imgSizeSelectId).combobox("getValues");
            }
        });
        //查询容器
        var searchContainer = document.createElement("div");
        $(searchContainer).addClass("searchContainer");
        $(container).append(searchContainer);
        //查询文本框容器
        var searcTextBoxContainer = document.createElement("span");
        $(searcTextBoxContainer).addClass("searcTextBoxContainer");
        $(searchContainer).append(searcTextBoxContainer);
        //查询文本控件
        var txtSearchControl = document.createElement("input");
        $(txtSearchControl).addClass("txtSearchControl");
        $(searcTextBoxContainer).append(txtSearchControl);
        element.xtag.txtSearchControl = txtSearchControl;
        $(txtSearchControl).textbox({
            prompt: '请输入图片名称'
        });
        //添加查询
        var btnSeach = document.createElement("a");
        $(btnSeach).addClass("button");
        $(btnSeach).text("查询");
        $(searchContainer).append(btnSeach);
        $(btnSeach).linkbutton({});
        $(btnSeach).click(function () {
            _this.loadImageView(element, element.xtag.treeNode);
        });
        //上传按钮
        var btnUpload = document.createElement("a");
        $(btnUpload).addClass("button");
        $(btnUpload).text("上传图片");
        $(searchContainer).append(btnUpload);
        $(btnUpload).linkbutton({});
        $(btnUpload).click(function () {
            var uploadType = "FrontImage";
            if (element.isback) {
                uploadType = "BackImage";
            }
            $.ajax({
                url: document.body["apppath"] + "FeFileUploadConfig/FileExtConfig?uploadType=Image",
                type: "GET",
                cache: false,
                dataType: "text",
                success: function (ext) {
                    $.ajax({
                        url: document.body["apppath"] + "FeFileUploadConfig/FileSizeConfig?uploadType=" + uploadType,
                        type: "GET",
                        cache: false,
                        dataType: "text",
                        success: function (size) {
                            $(uploadControl)[0].directoryid = element.xtag.runtime.directoryId;
                            $(uploadControl)[0].directoryname = element.xtag.runtime.directoryText;
                            $(uploadControl)[0].fileNumLimit = 100;
                            $(uploadControl)[0].ext = ext;
                            $(uploadControl)[0].showimagesizecheckbox = "true";
                            $(uploadControl)[0].fileSingleSizeLimit = size;
                            $(uploadControl)[0].open();
                        }
                    });
                }
            });
        });
        //确认按钮
        var btnConfirm = document.createElement("a");
        $(btnConfirm).addClass("button");
        $(btnConfirm).text("确认");
        $(searchContainer).append(btnConfirm);
        $(btnConfirm).linkbutton({
            disabled: true
        });
        element.xtag.btnConfirm = btnConfirm;
        $(btnConfirm).click(function () {
            _this.submit(element);
        });
        //左边树容器
        var leftContainer = document.createElement("div");
        $(leftContainer).addClass("leftContainer");
        $(container).append(leftContainer);
        //中间图片列表容器
        var centerContainer = document.createElement("div");
        $(centerContainer).addClass("centerContainer");
        $(centerContainer).append("center");
        $(container).append(centerContainer);
        element.xtag.centerContainer = centerContainer;
        //右边图片尺寸容器
        var rightContainer = document.createElement("div");
        $(rightContainer).addClass("rightContainer");
        $(rightContainer).append("reight");
        $(container).append(rightContainer);
        element.xtag.rightContainer = rightContainer;
        //底部容器
        var bottomContainer = document.createElement("div");
        $(bottomContainer).addClass("bottomContainer");
        $(container).append(bottomContainer);
        //分页
        var paginationControl = document.createElement("div");
        $(paginationControl).addClass("paginationControl");
        $(bottomContainer).append(paginationControl);
        element.xtag.paginationControl = paginationControl;
        $(paginationControl).pagination({
            total: 2000,
            pageSize: 16,
            pageList: [16, 32, 48, 64],
            onSelectPage: function (pageNumber, pageSize) {
                _this.showImageListView(element, pageNumber);
            }
        });
        $.ajax({
            url: element.xtag.options.directoryTreeUrl,
            data: { directoryId: element.xtag.options.rootDirectoryId },
            dataType: "json",
            type: "POST",
            success: function (result) {
                var treeControl = document.createElement("Gf-Tree");
                treeControl.hidefoldericon = true;
                treeControl.loadData(result);
                treeControl.registerEventHandler("onNodeClick", function (node) {
                    $(element.xtag.txtSearchControl).textbox("setValue", "");
                    _this.loadImageView(element, node);
                });
                $(leftContainer).append(treeControl);
                element.xtag.treeControl = treeControl;
                $(treeControl)[0].select(result[0].id);
                //自动选择根节点。
                _this.loadImageView(element, { id: result[0].id, text: result[0].text });
            }
        });
        //构建dialog
        $(container).dialog({
            closed: true,
            cache: false,
            modal: true
        });
    };
    GfFeImageSelector.prototype.loadImageView = function (element, node) {
        var _this = this;
        element.xtag.runtime.selectRecord = undefined;
        element.xtag.runtime.directoryId = node.id;
        element.xtag.runtime.directoryText = node.text;
        $.ajax({
            url: element.xtag.options.imageListUrl,
            data: { directoryId: node.id, imageName: $(element.xtag.txtSearchControl).textbox("getValue") },
            dataType: "json",
            type: "POST",
            success: function (result) {
                element.xtag.treeNode = node;
                element.xtag.records = result;
                _this.showImageListView(element, 1);
            }
        });
    };
    GfFeImageSelector.prototype.showImageListView = function (element, pageNumber) {
        var _this = this;
        $(element.xtag.centerContainer).empty();
        $(element.xtag.rightContainer).empty();
        $(element.xtag.btnConfirm).linkbutton("disable");
        $(element.xtag.paginationControl).pagination({
            total: element.xtag.records.length
        });
        var pageSize = $(element.xtag.paginationControl).pagination("options").pageSize;
        var count = pageSize * pageNumber;
        var index = pageSize * (pageNumber - 1);
        var records = [];
        //闭包问题，重新构建集合使用foreach
        for (index; index < count; index++) {
            records.push(element.xtag.records[index]);
        }
        records.forEach(function (record) {
            if (record) {
                //添加图片项容器
                var imageItemContainer = document.createElement("span");
                imageItemContainer.id = element.xtag.container.id + "_" + record.Id.replace("@", "_");
                $(imageItemContainer).addClass("imageItemContainer");
                $(element.xtag.centerContainer).append(imageItemContainer);
                $(imageItemContainer).click(function () {
                    _this.imageListItemClick(element, record);
                });
                //添加图片容器
                var imageContainer = document.createElement("span");
                $(imageContainer).addClass("imageContainer");
                $(imageItemContainer).append(imageContainer);
                //添加图片控件
                var imageControl = document.createElement("img");
                $(imageControl).addClass("imageControl");
                $(imageControl).attr("src", document.body["apppath"] + record.ImageUrl);
                //计算图片大小，缩放容器，避免失真
                //1.如果无法获取图片尺寸，则把图片统一设置为宽90，高90，不考虑失真问题。
                if (parseInt(record.Width) !== record.Width || parseInt(record.Height) !== record.Height) {
                    $(imageControl).css("width", "90px");
                    $(imageControl).css("height", "90px");
                }
                else if (record.Width <= 90 && record.Height <= 90) {
                    //2.如果宽度小于90且宽度小于90，使用原尺寸，图片居中
                    $(imageControl).css("width", record.Width + "px");
                    $(imageControl).css("height", record.Height + "px");
                }
                else {
                    //3.容器宽除图片宽，容器高除图片高，算出比例
                    var wRatio = 90 / record.Width;
                    var hRatio = 90 / record.Height;
                    //4.取小比例，设置容器宽和高。
                    var ratio;
                    if (wRatio < hRatio) {
                        ratio = wRatio;
                    }
                    else {
                        ratio = hRatio;
                    }
                    var width = record.Width * ratio;
                    var height = record.Height * ratio;
                    width = parseInt(width);
                    height = parseInt(height);
                    $(imageControl).css("width", width + "px");
                    $(imageControl).css("height", height + "px");
                }
                $(imageContainer).append(imageControl);
                //添加图片名称容器
                var imageNameContainer = document.createElement("div");
                $(imageNameContainer).addClass("imageNameContainer");
                $(imageNameContainer).text(record.Name);
                $(imageNameContainer).attr("title", record.Name);
                $(imageItemContainer).append(imageNameContainer);
                //添加勾选
                var selectControl = document.createElement("em");
                $(selectControl).attr("recordId", record.Id);
                $(selectControl).addClass("selectControl");
                $(imageItemContainer).append(selectControl);
            }
        });
    };
    //实现控件弹出方法
    GfFeImageSelector.prototype.openDialog = function (element) {
        $(element.xtag.container).dialog({
            title: element.xtag.options.title,
            width: 888
        });
        $(element.xtag.container).dialog('open');
    };
    //设置控件相关参数
    GfFeImageSelector.prototype.setOptions = function (element, options) {
        if (!element.xtag.options) {
            element.xtag.options = {};
        }
        //设置默认值
        if (options === "default") {
            element.xtag.options.title = element.dialogtitle || "";
            element.xtag.options.rootDirectoryId = element.rootdirectoryid || "";
            element.xtag.options.directoryTreeUrl = element.directorytreeurl || document.body["apppath"] + "FeImageSelector/DirectoryTree";
            element.xtag.options.imageListUrl = element.imagelisturl || document.body["apppath"] + "FeImageSelector/ImageList";
        }
        else if (typeof options === "object") {
            if (typeof options.title === "string") {
                element.xtag.options.title = options.title;
            }
        }
    };
    //图片列表中项的点击事件
    GfFeImageSelector.prototype.imageListItemClick = function (element, record) {
        var imageItemContainer = $("#" + element.xtag.container.id + "_" + record.Id.replace("@", "_"));
        $(".selectControl").hide();
        $(element.xtag.rightContainer).empty();
        $(element.xtag.btnConfirm).linkbutton("enable");
        var em = $(imageItemContainer).find("em");
        em.show();
        element.xtag.runtime.selectRecord = record;
        //如果是图片，直接处理
        if (record.IsImagePack) {
            //构建尺寸列表数据
            var imageSizeItem = {};
            var imageSizeList = [];
            var width = record.Width || "auto";
            var height = record.Height || "auto";
            var hopeSize = "原";
            imageSizeItem.Name = hopeSize + "(" + width + "*" + height + ")";
            imageSizeItem.Id = record.SourceImageId;
            imageSizeItem.Url = record.ImageUrl;
            imageSizeList.push(imageSizeItem);
            if (record.ImageSizeList.length > 0) {
                record.ImageSizeList.forEach(function (item) {
                    width = item.Width || "auto";
                    height = item.Height || "auto";
                    if (item.HopeWidth === -1 || !item.HopeWidth) {
                        hopeSize = "auto";
                    }
                    else {
                        hopeSize = item.HopeWidth;
                    }
                    hopeSize += "*";
                    if (item.HopeHeight === -1 || !item.HopeHeight) {
                        hopeSize += "auto";
                    }
                    else {
                        hopeSize += item.HopeWidth;
                    }
                    imageSizeItem = {};
                    imageSizeItem.Name = hopeSize + "(" + width + "*" + height + ")";
                    imageSizeItem.Id = item.Id;
                    imageSizeItem.Url = item.ImageUrl;
                    imageSizeList.push(imageSizeItem);
                });
            }
            this.loadImageSizeList(element, imageSizeList);
        }
    };
    GfFeImageSelector.prototype.loadImageSizeList = function (element, imageSizeList) {
        var rightContainer = element.xtag.rightContainer;
        var isSourceImage = true;
        imageSizeList.forEach(function (record) {
            //尺寸项容器
            var imageSizeItemContainer = document.createElement("div");
            $(imageSizeItemContainer).addClass("imageSizeItemContainer");
            $(rightContainer).append(imageSizeItemContainer);
            //选择框控件
            var sizeCheckControl = document.createElement("input");
            sizeCheckControl.type = "checkbox";
            $(sizeCheckControl).attr("recordId", record.Id);
            $(sizeCheckControl).attr("imageUrl", record.Url);
            $(sizeCheckControl).addClass("sizeCheckControl");
            $(imageSizeItemContainer).append(sizeCheckControl);
            //尺寸名称
            var sizeNameControl = document.createElement("span");
            $(sizeNameControl).addClass("sizeNameControl");
            $(sizeNameControl).text(record.Name);
            $(imageSizeItemContainer).append(sizeNameControl);
            //查看
            var viewControl = document.createElement("a");
            $(viewControl).addClass("viewControl");
            $(viewControl).text("查看");
            $(viewControl).attr("href", document.body["apppath"] + record.Url);
            $(viewControl).attr("target", "_blank");
            $(imageSizeItemContainer).append(viewControl);
            //原图默认选择
            if (isSourceImage) {
                isSourceImage = false;
                $(sizeCheckControl).prop("checked", true);
            }
            //添加选择事件
            $(sizeCheckControl).change(function () {
                if ($(sizeCheckControl).is(':checked')) {
                    $(".sizeCheckControl").prop("checked", false);
                    $(sizeCheckControl).prop("checked", true);
                    $(element.xtag.btnConfirm).linkbutton("enable");
                }
                else {
                    //检查是否所有尺寸都被取消
                    $(element.xtag.btnConfirm).linkbutton("disable");
                }
            });
        });
    };
    GfFeImageSelector.prototype.submit = function (element) {
        $(element.xtag.container).dialog('close');
        if (element.xtag.eventHandlers
            && element.xtag.eventHandlers.submitHandler
            && $.isFunction(element.xtag.eventHandlers.submitHandler)) {
            if (element.xtag.runtime.selectRecord) {
                var record = element.xtag.runtime.selectRecord;
                //如果是图片
                if (!record.IsImagePack) {
                    element.xtag.eventHandlers.submitHandler(record.Id, record.ImageUrl);
                }
                else {
                    var id;
                    var url;
                    //图片包
                    $(element.xtag.container).find(".sizeCheckControl").each(function (index, item) {
                        if ($(item).is(':checked')) {
                            id = $(item).attr("recordId");
                            url = $(item).attr("imageUrl");
                            return false;
                        }
                    });
                    if (id && url) {
                        element.xtag.eventHandlers.submitHandler(id, url);
                    }
                }
            }
        }
    };
    return GfFeImageSelector;
}(CustomElement));
$.fn.feImageSelector = function (method, args) {
    $(this).each(function () {
        if (!this.xtag.eventHandlers) {
            this.xtag.eventHandlers = {};
        }
        if (this.nodeType === 1 && this.tagName === "GF-FEIMAGESELECTOR") {
            if (typeof method === 'object') {
                this.setoptions(method);
            }
            else if (method === "open") {
                this.open();
            }
            else if (method === "submit" && $.isFunction(args)) {
                this.xtag.eventHandlers.submitHandler = args;
            }
        }
    });
};
/*
****属性*****







****方法****
设置数据表格
document.querySelector("xx").SetDataGrid(columns,frozenColumns)
columns:设置的数据列
frozenColumns:设置的冻结列

查询数据
document.querySelector("xx").SearchData(url,dataparam,pagenumber)
url:请求的数据源Url(注意此异步方法里必须要有(pageNumber, pageSize, param)三个参数
dataparam:数据参数
pagenumber:请求第几页数据(不写为请求当前页数据)

得到选择的数据行
document.querySelector("xx").GetSelections()

设置行列
document.querySelector("xx").SetMergeCells(mergeCells)
mergeCells设置的行列

****事件****
 表格控件数据加载完成，并呈现后初始化
 document.querySelector("xx").registerEventHandler("SetDataGridLoadSuccess", function (row, data) {});
 row:行
 data:数据集合

 数据查询成功后事件
 document.querySelector("xx").registerEventHandler("AfterSelectPage", function (result) {})
 result:查询完成后得到的数据集合
*/
var GfFeDataList = (function (_super) {
    __extends(GfFeDataList, _super);
    function GfFeDataList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.autoInit = true;
        _this.elementName = "Gf-FeDataList";
        _this.addMethod("SetDataGrid", "function(columns,frozenColumns){control.SetDataGrid(this,columns,frozenColumns) }");
        _this.addMethod("SearchData", "function(url,dataparam,pagenumber){control.SearchData(this,url,dataparam,pagenumber) }");
        _this.addMethod("GetSelections", "function(){return control.GetSelections(this) }");
        _this.addMethod("SetMergeCells", "function(mergeCells){control.SetMergeCells(this,mergeCells) }");
        return _this;
    }
    GfFeDataList.prototype.initContent = function (element) {
        var container = this.buildControls(element);
    };
    //设置行列
    GfFeDataList.prototype.SetMergeCells = function (element, mergeCells) {
        var DataListTable = $(element.get("DataListTable"));
        $(DataListTable).datagrid('mergeCells', mergeCells);
    };
    //返回选中行的实例
    GfFeDataList.prototype.GetSelections = function (element) {
        var DataListTable = $(element.get("DataListTable"));
        return $(DataListTable).datagrid("getSelections");
    };
    //查询方法
    GfFeDataList.prototype.SearchData = function (element, url, dataparam, pagenumber) {
        element.set("ActionUrl", url);
        element.set("DataParam", dataparam);
        var DataListTable = $(element.get("DataListTable"));
        if (pagenumber != "undefine" && pagenumber != "") {
            $(DataListTable).datagrid("getPager").pagination('select', pagenumber);
        }
        else {
            $(DataListTable).datagrid("getPager").pagination('select');
        }
    };
    //设置列表项
    GfFeDataList.prototype.SetDataGrid = function (element, columns, frozenColumns) {
        var that = this;
        var DataListTable = $(element.get("DataListTable"));
        $(DataListTable).datagrid({
            rownumbers: true,
            pagination: true,
            onLoadSuccess: function (row, data) {
                element.triggerEventHandler("SetDataGridLoadSuccess", [row, data]);
            },
            columns: [
                columns
            ],
            frozenColumns: [
                frozenColumns
            ]
        });
        $(DataListTable).datagrid('getPager').pagination({
            pageNumber: 1,
            pageSize: 10,
            pageList: [5, 10, 20, 50, 100],
            beforePageText: '第',
            afterPageText: '页     共{pages}页',
            displayMsg: '当前显示{from}-{to}条记录  共{total}条记录',
            onSelectPage: function (pageNumber, pageSize) {
                that.OnSelectPage(pageNumber, pageSize, element);
            }
        });
    };
    GfFeDataList.prototype.OnSelectPage = function (pageNumber, pageSize, element) {
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        var DataListTable = $(element.get("DataListTable"));
        $(DataListTable).datagrid("options").loadMsg = "正在加载...";
        $(DataListTable).datagrid("loading");
        var DataParam = element.get("DataParam");
        window["platformAjax"]({
            url: element.get("ActionUrl"),
            type: "post",
            data: { pageNumber: pageNumber, pageSize: pageSize, param: DataParam },
            success: function (result) {
                var data = eval("(" + result.Data + ")");
                $(DataListTable).datagrid('loadData', data);
                $(DataListTable).datagrid("loaded");
                $(DataListTable).datagrid('resize', {
                    height: "100%",
                    width: "100%"
                });
                element.triggerEventHandler("AfterSelectPage", [result]);
            }
        });
    };
    GfFeDataList.prototype.buildControls = function (element) {
        //初始化运行时状态对象
        element.xtag.runtime = {};
        //控件容器
        var container = document.createElement("div");
        $(container).addClass("feDataList");
        $(container).css("height", "100%");
        $(container).css("width", "99.3%");
        element.appendChild(container);
        //控件表格
        var table = document.createElement("table");
        $(container).append(table);
        element.set("DataListTable", table);
    };
    return GfFeDataList;
}(CustomElement));
var GfMultCombobox = (function (_super) {
    __extends(GfMultCombobox, _super);
    function GfMultCombobox(extension) {
        var _this = _super.call(this, extension) || this;
        _this.elementName = "Gf-MultCombobox";
        _this.addProperties("data,valuefield,textfield,defaultoption,color,source,rootvalue");
        _this.methods["setDisplay"] = "function(display) { $(display).text(this.getText()); }";
        _this.methods["getValue"] = "function() { \n                                        var obj = this.get(\"obj\");\n                                        if(obj && obj[this.valuefield]){\n                                            return JSON.stringify(obj); \n                                        }\n                                        else{\n                                            return \"\";\n                                        }\n                                    }";
        _this.addMethod("setObject", "function(obj){ \n                                        if(!obj){\n                                            obj = {};\n                                            obj['klass'] = '';\n                                            obj[this.textfield] = '';\n                                            obj[this.valuefield] = '';\n                                        }\n                                        this.set(\"obj\",obj); \n                                        $(this.get(\"valueInput\")).val(obj[this.valuefield]);\n                                        $(this.get(\"select\")).combobox('setValue', obj[this.valuefield]); \n                                     }");
        _this.addMethod("getObject", "function(){ return this.get(\"obj\"); }");
        _this.addMethod("getText", "function(){ var selecttext = this.get(\"selecttext\"); var obj = this.get(\"obj\"); return selecttext ? selecttext : obj[this.textfield]; }");
        _this.addMethod("enable", "function(){\n                                        var selects = this.get(\"selects\");\n                                        for (var i = 0; i < selects.length; i++) {\n                                            $(selects[i]).combobox('enable'); \n                                        }\n                                    }");
        _this.addMethod("disable", "function(){ \n                                        var selects = this.get(\"selects\");\n                                        for (var i = 0; i < selects.length; i++) {\n                                            $(selects[i]).combobox('disable'); \n                                        }\n                                    }");
        _this.methods["resize"] = "function(width) { \n                                        var selects = this.get(\"selects\");\n                                        for (var i = 0; i < selects.length; i++) {\n                                            $(selects[i]).combobox('resize',width); \n                                        }\n                                     }";
        _this.emptyValue = null;
        return _this;
    }
    GfMultCombobox.prototype.innerSetValue = function (element, value) {
        if (value) {
            if (window["isString"](value)) {
                this.planSelect(element, element.value);
            }
            else {
                element.setObject(value);
            }
        }
        else {
            element.setObject(null);
        }
    };
    GfMultCombobox.prototype.parseToObject = function (element, value) {
        var obj = {};
        obj['klass'] = element.klass;
        obj[element.textfield] = '';
        obj[element.valuefield] = '';
        if (value) {
            if (window["isString"](value)) {
                //obj = this.stringToObject(value);
            }
            else {
                obj = value;
            }
        }
        return obj;
    };
    GfMultCombobox.prototype.valueEquals = function (oldValue, newValue, element) {
        return this.parseToObject(element, oldValue)[element.valuefield] == this.parseToObject(element, newValue)[element.valuefield];
    };
    GfMultCombobox.prototype.create = function (element) {
        var control = this;
        element.registerEventHandler("onafterchange", function () {
            element.value = element.getObject()[element.valuefield];
            control.planSelect(element, element.getObject()[element.valuefield]);
        });
        _super.prototype.create.call(this, element);
    };
    GfMultCombobox.prototype.initContent = function (element) {
        var objselects = [];
        element.set("selects", objselects);
        element.set("selecttext", "");
        var valueInput = document.createElement("input");
        $(valueInput).attr("type", "hidden");
        $(valueInput).attr("name", $(element).attr("name"));
        element.appendChild(valueInput);
        element.set("valueInput", valueInput);
        if (element.value == null) {
            element.value = "";
        }
        this.planSelect(element, element.value);
    };
    GfMultCombobox.prototype.getSelectList = function (element, selectvalue) {
        var selectlist = selectvalue;
        if (selectvalue != "") {
            var j = 1;
            for (var i = 0; i < j; i++) {
                selectvalue = this.getParentvalue(element, selectvalue);
                if (selectvalue != element.rootvalue && selectvalue != "") {
                    selectlist = selectvalue + "," + selectlist;
                    j = j + 1;
                }
            }
        }
        return selectlist;
    };
    GfMultCombobox.prototype.getParentvalue = function (element, sonvalue) {
        var parentvalue = "";
        if (element.data) {
            var array = element.data.split(',');
            $(array).each(function () {
                if (this.length > 0 && this.split('_')[0] == sonvalue) {
                    parentvalue = this.split('_')[2];
                }
            });
        }
        return parentvalue;
    };
    GfMultCombobox.prototype.planSelect = function (element, selectvalue) {
        $(element.get("wrapper")).empty();
        var selectlist = this.getSelectList(element, selectvalue);
        selectlist = element.rootvalue + "," + selectlist + ",";
        selectlist = selectlist.replace(",,", ",").replace(",,", ",");
        var array = selectlist.split(',');
        element.set("loadfinish", 0);
        for (var i = 0; i < array.length - 1; i++) {
            this.addSelect(element, array[i], array[i + 1]);
        }
        element.set("loadfinish", 1);
    };
    GfMultCombobox.prototype.addSelect = function (element, parentvalue, selectvalue) {
        var objs = [];
        if (element.data) {
            var array = element.data.split(',');
            $(array).each(function () {
                if (this.length > 0 && this.split('_')[2] == parentvalue) {
                    var obj = {};
                    obj[element.valuefield] = this.split('_')[0];
                    obj[element.textfield] = this.split('_')[1];
                    obj.color = this.split('_')[3];
                    objs.push(obj);
                    if (this.split('_')[0] == selectvalue) {
                        element.setObject(obj);
                        var ttext = element.get("selecttext");
                        element.set("selecttext", ttext + " " + this.split('_')[1]);
                    }
                }
            });
        }
        if (objs) {
            if (objs.length > 0) {
                if (element.defaultoption) {
                    var obj = {};
                    obj[element.valuefield] = "";
                    obj[element.textfield] = element.defaultoption;
                    objs.unshift(obj);
                }
                var wrapper = element.get("wrapper");
                var display = element.get("display");
                var select = document.createElement("select");
                wrapper.appendChild(select);
                var objselects = element.get("selects");
                objselects.push(select);
                element.set("selects", objselects);
                $(select).combobox({
                    valueField: element.valuefield,
                    textField: element.textfield,
                    width: element.width || 170,
                    editable: false,
                    loadData: objs,
                    onChange: function (newValue, oldValue) {
                    },
                    onSelect: function (record) {
                        if (element.get("loadfinish") > 0) {
                            element.setObject(record);
                            for (var i = 0; i < $("div.combo-panel").length; i++) {
                                var hidecombo = $("div.combo-p").get(i);
                                if ($(hidecombo).is(':visible')) {
                                    $(hidecombo).hide();
                                }
                            }
                            element.triggerEventHandler("onafterchange", [record]);
                        }
                    }
                });
                $(select).combobox('loadData', objs);
                if (selectvalue != "") {
                    $(select).combobox('setValue', selectvalue);
                }
            }
        }
    };
    return GfMultCombobox;
}(GfPropertyControl));
//【列表下拉框】
var GfListValueCombobox = (function (_super) {
    __extends(GfListValueCombobox, _super);
    function GfListValueCombobox(extension) {
        var _this = _super.call(this, extension) || this;
        _this.elementName = "Gf-ListValueCombobox";
        _this.addProperties("defaultoption,source,createurl");
        _this.methods["setDisplay"] = "function(display) { $(display).text(this.getText()); }";
        _this.methods["getValue"] = "function() { \n                                        var obj = this.get(\"obj\");\n                                        if(obj && obj[\"id\"]){\n                                            return obj[\"id\"];\n                                        }\n                                        else{\n                                            return \"\";\n                                        }\n                                    }";
        _this.addMethod("setObject", "function(obj){ \n                                        if(!obj){\n                                            obj = {};\n                                            obj[\"id\"] = '';\n                                            obj[\"lable\"] = '';\n                                        }\n                                        this.set(\"obj\",obj); \n                                        $(this.get(\"valueInput\")).val(obj[\"id\"]);\n                                        $(this.get(\"select\")).combobox('setValue', obj[\"lable\"]); \n                                     }");
        _this.addMethod("getObject", "function(){ return this.get(\"obj\"); }");
        _this.addMethod("loadData", "function(data) { \n                                        if(control.isString(data)){\n                                            data = control.stringToObject(data);\n                                        }\n                                        if(this.defaultoption){\n                                            var obj = {};\n                                            obj[\"id\"] = \"\";\n                                            obj[\"lable\"] = this.defaultoption;\n                                            data.unshift(obj);\n                                        }\n                                        $(this.get(\"select\")).combobox('loadData',data); \n                                    }");
        _this.addMethod("getText", "function(){ var obj = this.get(\"obj\"); return obj ? obj[\"lable\"] : \"\"; }");
        _this.addMethod("enable", "function(){ $(this.get(\"select\")).combobox('enable');  }");
        _this.addMethod("disable", "function(){ $(this.get(\"select\")).combobox('disable');  }");
        _this.methods["resize"] = "function(width) { $(this.get(\"select\")).combobox('resize',width);  }";
        _this.emptyValue = null;
        return _this;
    }
    GfListValueCombobox.prototype.innerSetValue = function (element, value) {
        if (value) {
            if (window["isString"](value)) {
                element.setObject(this.parseToObject(element, value));
            }
            else {
                element.setObject(value);
            }
        }
        else {
            element.setObject(null);
        }
    };
    GfListValueCombobox.prototype.parseToObject = function (element, value) {
        var obj = {};
        if (value) {
            if (window["isString"](value)) {
                obj["id"] = value;
                obj["lable"] = "";
                var objs = element.get("objs");
                if (objs) {
                    for (var i = 0; i < objs.length; i++) {
                        if (objs[i]["id"] == value) {
                            obj = objs[i];
                        }
                    }
                }
            }
            else {
                obj = value;
            }
        }
        return obj;
    };
    GfListValueCombobox.prototype.valueEquals = function (oldValue, newValue, element) {
        return oldValue == newValue;
    };
    GfListValueCombobox.prototype.create = function (element) {
        element.registerEventHandler("onafterinit", function () {
            var seldata = { param: [{ field: "source", type: "=", value: element.source }], klass: "Value" };
            window['platformAjax']({
                url: element.createurl || document.body['listdataurl'],
                data: seldata,
                success: function (result) {
                    var listData = JSON.parse(result.Data);
                    var objs = [];
                    var selobj = {};
                    for (var item in listData.rows) {
                        var valueData = listData.rows[item];
                        var obj = {};
                        obj["id"] = valueData.id;
                        obj["lable"] = valueData.label;
                        objs.push(obj);
                        if (valueData.id == element.value) {
                            selobj = obj;
                        }
                    }
                    element.loadData(objs);
                    element.set("objs", objs);
                    element.setObject(selobj);
                }
            });
        });
        _super.prototype.create.call(this, element);
    };
    GfListValueCombobox.prototype.initContent = function (element) {
        var wrapper = element.get("wrapper");
        var display = element.get("display");
        var select = document.createElement("select");
        wrapper.appendChild(select);
        element.set("select", select);
        var valueInput = document.createElement("input");
        $(valueInput).attr("type", "hidden");
        $(valueInput).attr("name", $(element).attr("name"));
        element.appendChild(valueInput);
        element.set("valueInput", valueInput);
        $(select).combobox({
            valueField: "id",
            textField: "lable",
            width: element.width || 170,
            editable: false,
            onChange: function (newValue, oldValue) {
            },
            onSelect: function (record) {
                element.setObject(record);
                element.triggerEventHandler("onafterchange", [record]);
            }
        });
    };
    return GfListValueCombobox;
}(GfPropertyControl));
var FeTemplateComponentBase = (function (_super) {
    __extends(FeTemplateComponentBase, _super);
    function FeTemplateComponentBase(extension) {
        var _this = _super.call(this, extension) || this;
        //组件存放数组,用于判断组件是否需要请求资源
        _this.feComponentItems = [];
        //组件路径存放数组,用于组件得到自己的路径
        _this.feComponentPathItems = [];
        _this.autoInit = _this.getAutoInit();
        _this.elementName = _this.getElementName();
        _this.addProperties("width,height,componentPath");
        _this.addMethod("extendfunctionproxy", "function(method,args){ return control.extendFunctionProxy(this,method,args); }");
        if (_this.extendName()) {
            var extendName = _this.extendName();
            var tagName = _this.getElementName();
            tagName = tagName.toUpperCase();
            eval("$.fn." + extendName + " = function (method, args) {" +
                "var result;" +
                "$(this).each(function () {" +
                "if (this.nodeType === 1 && this.tagName === '" + tagName + "') {" +
                "result = this.extendfunctionproxy(method,args);" +
                "}" +
                "});" +
                "return result;" +
                "}");
        }
        return _this;
    }
    //设置属性
    FeTemplateComponentBase.prototype.setOptions = function (element, options) {
        var _this = this;
        $.each(options, function (key, value) {
            var result = _this.beforeSetOption(element, key, element[key], value);
            if (result) {
                element[key] = value;
                _this.afterSetOption(element, key, element[key], value);
            }
        });
    };
    //获取属性
    FeTemplateComponentBase.prototype.getOption = function (element, optionName) {
        return element[optionName];
    };
    //设置默认属性
    FeTemplateComponentBase.prototype.setDefaultOptions = function (element) {
        var options = this.defaultOptions();
        $.each(options, function (key, value) {
            element[key] = element[key] || value;
        });
    };
    //获取组件根容器
    FeTemplateComponentBase.prototype.componentContainer = function (element) {
        return element.xtag.rootElement_base;
    };
    FeTemplateComponentBase.prototype.initContent = function (element) {
        element.componentPath = 'FrontEnd/Back/Content/Scripts';
        //判断是否为复合组件
        var childElements = [];
        if (element.childElementCount > 0) {
            $(element).children().each(function (index, node) {
                childElements.push(node);
            });
        }
        var uniqueId = this.GetUniqueId(this.getElementName() + "-");
        //控件容器
        var container = document.createElement("div");
        $(container).addClass("FeComponents");
        element.xtag.rootElement_base = container;
        $(container).attr("id", uniqueId);
        element.appendChild(container);
        element.xtag.container = container;
        //如果是复合组件，把内容放到主容器中，统一管理
        for (var _i = 0, childElements_1 = childElements; _i < childElements_1.length; _i++) {
            var childElement = childElements_1[_i];
            $(childElement).appendTo(container);
        }
        if (element.width && parseInt(element.width) == element.width) {
            $(container).css("width", element.width + "px");
        }
        if (element.height && parseInt(element.height) == element.height) {
            $(container).css("height", element.height + "px");
        }
        this.setDefaultOptions(element);
        this.buildComponents(element, uniqueId, container);
        $.parser.parse($(container));
        $(container).resize(function (e) {
            $.parser.parse(e.delegateTarget);
        });
    };
    //获取子控件
    FeTemplateComponentBase.prototype.findControl = function (element, behaviorId) {
        var result = undefined;
        var controls = $(element).find("[behaviorId='" + behaviorId + "']");
        if (controls.length > 0) {
            result = controls[0];
        }
        return result;
    };
    //扩展方法代理
    FeTemplateComponentBase.prototype.extendFunctionProxy = function (element, method, args) {
        if (method === "findControl") {
            return this.findControl(element, args);
        }
        else if (method === "reload") {
            return this.reload(element, args);
        }
        else if (typeof method === 'object') {
            return this.setOptions(element, method);
        }
        else if (method === "options") {
            return this.getOption(element, args);
        }
        return this.extendFunction(element, method, args);
    };
    //获取当前组件的路径
    FeTemplateComponentBase.prototype.getCurrentComponentPath = function () {
        return this.componentPath;
    };
    //转换url路径。“~/”代表应用程序根目录，“~/{Component}”代表模板根目录
    FeTemplateComponentBase.prototype.resolveUrl = function (element, relativeUrl) {
        var convertedUrl = relativeUrl;
        var appPathLower = document.body["apppath"].toLowerCase();
        var relativeUrlLower = relativeUrl.toLowerCase();
        //1.如果以“/”开头
        if (relativeUrl.indexOf("/") === 0) {
            //2.全部转成小写，对比是否开头为应用程序根路径。
            if (relativeUrlLower.indexOf(appPathLower) !== 0) {
                convertedUrl = document.body["apppath"] + convertedUrl.substring(1);
            }
        }
        else if (relativeUrl.indexOf("~/") === 0) {
            //3.如果以“~/”开头，直接替换把“~/”替换为应用程序根路径。
            convertedUrl = document.body["apppath"] + convertedUrl.substring(2);
        }
        //4.替换{Component}
        convertedUrl = convertedUrl.replace("{Component}", element.componentPath);
        convertedUrl = convertedUrl.replace("//", "/");
        convertedUrl = convertedUrl.replace(":/", "://");
        return convertedUrl;
    };
    //添加创建组件的资源列表
    FeTemplateComponentBase.prototype.AddHttpJs = function (apppath) {
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = apppath;
        $('head').append(oScript);
    };
    //添加创建组件的资源列表
    FeTemplateComponentBase.prototype.AddControl = function (tagName) {
        //if (this.feComponentItems.indexOf(tagName) === -1) {
        //    this.feComponentItems.push(tagName);
        //    let jsItems: Array<string> = [];
        //    let cssItems: Array<string> = [];
        //    let xtagItems: Array<string> = [];
        //    xtagItems.push(tagName);
        //    $.ajax({
        //        url: $(document.body).attr("apppath") + "FeTemplateEngine/GetComponentResources",
        //        type: "POST",
        //        dataType: "json",
        //        async: false,
        //        data: { tagNames: xtagItems },
        //        success: (datas) => {
        //            datas.forEach((data) => {
        //                //为标签设置componentPath属性
        //                if (data.TagName && data.TemplateComponentPath) {
        //                    $(data.TagName).each((index, element) => {
        //                        element.componentPath = data.TemplateComponentPath;
        //                        this.feComponentPathItems["'" + tagName + "'"] = data.TemplateComponentPath;
        //                    });
        //                }
        //                //3.获取资源后放入集合，并忽略相同的资源
        //                if (data && data.Items && data.Items.length > 0) {
        //                    data.Items.forEach((item) => {
        //                        if (item.ResourceItemType === "js" && jsItems.indexOf(item.ResourceItemPath) === -1) {
        //                            jsItems.push(item.ResourceItemPath);
        //                        }
        //                        else if (item.ResourceItemType === "css" && cssItems.indexOf(item.ResourceItemPath) === -1) {
        //                            cssItems.push(item.ResourceItemPath);
        //                        }
        //                    });
        //                }
        //            });
        //            //4.遍历资源列表集合，按资源类型引入资源
        //            for (let item of jsItems) {
        //                if ($("head")[0].innerHTML.indexOf(item) === -1) {
        //                    var oScript = document.createElement("script");
        //                    oScript.type = "text/javascript";
        //                    oScript.src = $(document.body).attr("apppath") + item;
        //                    $('head').append(oScript);
        //                }
        //            }
        //            for (let item of cssItems) {
        //                if ($("head")[0].innerHTML.indexOf(item) === -1) {
        //                    var link = document.createElement("link");
        //                    link.type = "text/css";
        //                    link.rel = "stylesheet";
        //                    link.href = $(document.body).attr("apppath") + item;
        //                    $('head').append(link);
        //                }
        //            }
        //        }
        //    });
        //}
        //else {
        //    $(tagName).each((index, element) => {
        //        element.componentPath = this.feComponentPathItems["'" + tagName + "'"];
        //    });
        //}
    };
    return FeTemplateComponentBase;
}(CustomElement));
/*
****属性*****
mode，设置文章分类模式，默认值为“Category”
设置值包括：按分类展示“Category”、展示热点“Hot”、展示头条“Head”、展示推荐“Recommend”
如果设置为“Category”，请同时设置“categoryid”属性
html:<Gf-FeTemplate-Component-ArticleCategoryTitleImageList mode="Category">
js:$("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList("mode","Category");
   var mode = $("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList('options','mode');

count，设置文章呈现数量，默认为“0”，呈现所有。 设置方法同上

categoryid，设置要查询的分类，默认值为“”，顶级分类

****方法****

****事件****
moreClick，点击更多按钮
js:$("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList("moreClick",function(mode, categoryid){ });

itemClick,点击标题文章事件
js:$("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList("itemClick",function(id){ });

*/
var FeComponentArticleCategoryTitleImageList = (function (_super) {
    __extends(FeComponentArticleCategoryTitleImageList, _super);
    function FeComponentArticleCategoryTitleImageList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("characterid,count,categoryid");
        return _this;
    }
    FeComponentArticleCategoryTitleImageList.prototype.defaultOptions = function () {
        var options = {
            characterid: "",
            count: 0,
            categoryid: ''
        };
        return options;
    };
    //设置选项前
    FeComponentArticleCategoryTitleImageList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCategoryTitleImageList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleCategoryTitleImageList.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleCategoryTitleImageList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCategoryTitleImageList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCategoryTitleImageList.prototype.extendName = function () {
        return "feComponentArticleCategoryTitleImageList";
    };
    //扩展方法实现
    FeComponentArticleCategoryTitleImageList.prototype.extendFunction = function (element, method, args) {
        if ("itemClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.itemClick = args;
        }
        else if ("moreClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.moreClick = args;
        }
        else if ("setCategoryId" === method) {
            this.SetCategoryId(element, args);
        }
    };
    FeComponentArticleCategoryTitleImageList.prototype.SetCategoryId = function (element, categoryId) {
        element.categoryid = categoryId;
        this.reload(element);
    };
    //重新加载
    FeComponentArticleCategoryTitleImageList.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleList"),
            type: "POST",
            dataType: "json",
            data: {
                mode: "Character",
                modevalue: element.characterid,
                categoryId: element.categoryid,
                count: element.count,
                pageIndex: 1
            },
            success: function (result) {
                var div = document.createElement("div");
                $(div).addClass("j-tainment");
                $(div).addClass("j-put-news");
                $(div).addClass("clearfix");
                $(container).append(div);
                var h3 = document.createElement("h3");
                $(h3).addClass("clearfix");
                $(div).append(h3);
                var span = document.createElement("span");
                $(span).addClass("fl");
                $(span).text(result.TitleName);
                $(h3).append(span);
                span = document.createElement("span");
                $(span).addClass("fr");
                $(h3).append(span);
                var a = document.createElement("a");
                $(a).attr("href", "#");
                $(a).text("更多>");
                $(span).append(a);
                $(a).click(function () {
                    if (element.xtag.eventHandlers.moreClick) {
                        element.xtag.eventHandlers.moreClick(element.characterid);
                    }
                });
                var ul = document.createElement("ul");
                $(ul).addClass("js-list");
                $(div).append(ul);
                result.Items.forEach(function (item) {
                    var li = document.createElement("li");
                    $(li).addClass("clearfix");
                    $(ul).append(li);
                    $(li).click(function () {
                        if (element.xtag.eventHandlers.itemClick) {
                            element.xtag.eventHandlers.itemClick(item.Id);
                        }
                    });
                    var dl = document.createElement("dl");
                    $(li).append(dl);
                    var dt = document.createElement("dt");
                    $(dl).append(dt);
                    a = document.createElement("a");
                    $(a).attr("href", "#");
                    if (item.ImageId != null && item.ImageId != "") {
                        $(a).append("<img src='" + _this.resolveUrl(element, "~/File?id=" + item.ImageId) + "'>");
                    }
                    $(dt).append(a);
                    var dd = document.createElement("dd");
                    $(dl).append(dd);
                    var b = document.createElement("b");
                    $(b).text(item.Title);
                    $(dd).append(b);
                });
            }
        });
    };
    //构建组件
    FeComponentArticleCategoryTitleImageList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCategoryTitleImageList");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleCategoryTitleImageList;
}(FeTemplateComponentBase));
/*
继承至FeComponentArticleCategoryTitleImageList多有属性，方法和事件

****属性*****

****方法****

****事件****

*/
var FeComponentArticleCategoryTitleList = (function (_super) {
    __extends(FeComponentArticleCategoryTitleList, _super);
    function FeComponentArticleCategoryTitleList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentArticleCategoryTitleList.prototype.defaultOptions = function () {
        var options = _super.prototype.defaultOptions.call(this);
        return options;
    };
    //设置选项前
    FeComponentArticleCategoryTitleList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCategoryTitleList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleCategoryTitleList.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleCategoryTitleList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCategoryTitleList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCategoryTitleList.prototype.extendName = function () {
        return "feComponentArticleCategoryTitleList";
    };
    //扩展方法实现
    FeComponentArticleCategoryTitleList.prototype.extendFunction = function (element, method, args) {
        _super.prototype.extendFunction.call(this, element, method, args);
    };
    //重新加载
    FeComponentArticleCategoryTitleList.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        var div = document.createElement("div");
        $(div).addClass("j-tainment j-hot-news j-headlines clearfix");
        $(container).append(div);
        var h3 = document.createElement("h3");
        $(h3).addClass("clearfix");
        $(div).append(h3);
        var span = document.createElement("span");
        $(span).addClass("fl");
        $(h3).append(span);
        var span_2 = document.createElement("span");
        $(span_2).addClass("fr");
        $(h3).append(span_2);
        var a = document.createElement("a");
        $(a).attr("href", "#");
        $(a).text("更多>");
        $(span_2).append(a);
        $(a).click(function () {
            if (element.xtag.eventHandlers.moreClick) {
                element.xtag.eventHandlers.moreClick(element.characterid);
            }
        });
        var ul = document.createElement("ul");
        $(ul).addClass("js-list");
        $(div).append(ul);
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleList"),
            type: "POST",
            dataType: "json",
            data: {
                mode: "Character",
                modevalue: element.characterid,
                categoryId: element.categoryid,
                count: element.count,
                pageIndex: 1
            },
            success: function (result) {
                $(span).text(result.TitleName);
                result.Items.forEach(function (item) {
                    var li = document.createElement("li");
                    $(ul).append(li);
                    $(ul).find("li:first").addClass("hover");
                    $(li).hover(function () {
                        $(ul).find("li").removeClass("hover");
                        $(li).addClass("hover");
                    }, function () {
                    });
                    $(li).click(function () {
                        if (element.xtag.eventHandlers.itemClick) {
                            element.xtag.eventHandlers.itemClick(item.Id);
                        }
                    });
                    var h2 = document.createElement("h2");
                    $(li).append(h2);
                    var p1 = document.createElement("p");
                    $(p1).text(item.Title);
                    $(h2).append(p1);
                    var div_img_news = document.createElement("div");
                    $(div_img_news).addClass("j-img-news hidden");
                    $(li).append(div_img_news);
                    var div_img = document.createElement("div");
                    $(div_img).addClass("j-img");
                    $(div_img_news).append(div_img);
                    var a = document.createElement("a");
                    $(a).attr("href", "#");
                    $(a).append("<img src='" + _this.resolveUrl(element, "~/File?id=" + item.ImageId) + "'>");
                    $(div_img).append(a);
                    p1 = document.createElement("p");
                    $(p1).text(item.Title);
                    $(div_img_news).append(p1);
                });
            }
        });
    };
    //构建组件
    FeComponentArticleCategoryTitleList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCategoryTitleList");
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleCategoryTitleList;
}(FeComponentArticleCategoryTitleImageList));
/*
****属性*****
pagesize:每页显示数量
total:总数量
pagenumber:默认显示第几页
isskip:是否显示跳转按钮(true:显示,false:不显示,默认显示)
componentstyle:组件风格(completely:完全,simple:简约,默认完全)
totalbutton:按钮总数量
****方法****
$(xxx).feComponentAspNetPager("Select",1);选择第几页
****事件****
$(xxx).feComponentAspNetPager("OnSelectPage", function (pageNumber, pageSize) {xxxx});选择页面事件
*/
var FeComponentAspNetPager = (function (_super) {
    __extends(FeComponentAspNetPager, _super);
    function FeComponentAspNetPager(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("pagesize,total,pagenumber,isskip,componentstyle,totalbutton");
        return _this;
    }
    FeComponentAspNetPager.prototype.defaultOptions = function () {
        var options = {
            pagesize: 5,
            total: 0,
            pagenumber: 1,
            isskip: "true",
            componentstyle: "completely",
            totalbutton: 7
        };
        return options;
    };
    //设置选项前
    FeComponentAspNetPager.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentAspNetPager.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        if (key === "total") {
            this.DisplayPageButton(element.pagenumber, element);
        }
    };
    //设置当前组件标签名
    FeComponentAspNetPager.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-AspNetPager";
    };
    //获取当前组件是否自动初始化
    FeComponentAspNetPager.prototype.getAutoInit = function () {
        return false;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentAspNetPager.prototype.extendName = function () {
        return "feComponentAspNetPager";
    };
    //扩展方法实现
    FeComponentAspNetPager.prototype.extendFunction = function (element, method, args) {
        //选择页面事件扩展       
        if ("OnSelectPage" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.OnSelectPage = args;
        }
        //选择第几页
        if ("Select" === method) {
            this.OnSelectPage(args, element);
        }
    };
    //重新加载
    FeComponentAspNetPager.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //组件加载
    FeComponentAspNetPager.prototype.loadData = function (element, container) {
    };
    //选择页面
    FeComponentAspNetPager.prototype.OnSelectPage = function (pageNumber, element) {
        if (element.xtag.eventHandlers.OnSelectPage) {
            var pageSize = element.pagesize;
            element.pagenumber = pageNumber;
            element.xtag.eventHandlers.OnSelectPage(pageNumber, pageSize);
            this.DisplayPageButton(pageNumber, element);
        }
    };
    //创建分页按钮
    FeComponentAspNetPager.prototype.DisplayPageButton = function (SelectPage, element) {
        var _this = this;
        //记录选中第几页
        element.pagenumber = SelectPage;
        //每页显示数量
        var pagesize = parseInt(element.pagesize);
        //数据总数
        var total = parseInt(element.total);
        //算出总页数
        var TotalNumberPage = Math.ceil(total / pagesize);
        //选中第几页
        SelectPage = parseInt(SelectPage);
        if (TotalNumberPage != 0 && SelectPage <= TotalNumberPage) {
            var container = this.componentContainer(element);
            $(container).empty();
            if (element.componentstyle == "simple") {
                $(container).addClass("FeComponentAspNetPagerSimple");
            }
            else {
                $(container).addClass("FeComponentAspNetPager");
            }
            if (element.isskip == "true") {
                //跳转Div
                var AspNetPagerSkipDiv = document.createElement("div");
                $(AspNetPagerSkipDiv).addClass("SkipDiv");
                $(container).append(AspNetPagerSkipDiv);
                //跳转输入框前文字
                var AspNetPagerSkipDivBeforeA = document.createElement("a");
                $(AspNetPagerSkipDivBeforeA).text("到第");
                $(AspNetPagerSkipDiv).append(AspNetPagerSkipDivBeforeA);
                //跳转输入框
                var AspNetPagerSkipDivTextBox_1 = document.createElement("input");
                $(AspNetPagerSkipDivTextBox_1).attr("type", "text");
                $(AspNetPagerSkipDivTextBox_1).addClass("SkipDivInput");
                $(AspNetPagerSkipDivTextBox_1).val("");
                $(AspNetPagerSkipDiv).append(AspNetPagerSkipDivTextBox_1);
                //跳转输入框后文字
                var AspNetPagerSkipDivAfterA = document.createElement("a");
                $(AspNetPagerSkipDivAfterA).text("页");
                $(AspNetPagerSkipDiv).append(AspNetPagerSkipDivAfterA);
                //跳转确定按钮
                var AspNetPagerSkipDivButton = document.createElement("input");
                $(AspNetPagerSkipDivButton).attr("type", "submit");
                $(AspNetPagerSkipDivButton).addClass("SkipDivButton");
                $(AspNetPagerSkipDivButton).val("确定");
                $(AspNetPagerSkipDivButton).click(function (e) {
                    var SkipTextBoxValue = parseInt($(AspNetPagerSkipDivTextBox_1).val());
                    if (SkipTextBoxValue >= 1 && SkipTextBoxValue <= TotalNumberPage) {
                        _this.OnSelectPage(SkipTextBoxValue, element);
                    }
                });
                $(AspNetPagerSkipDiv).append(AspNetPagerSkipDivButton);
            }
            //排序Div    
            var AspNetPagerPagerWrapDiv = document.createElement("div");
            $(AspNetPagerPagerWrapDiv).addClass("PagerWrap");
            $(container).append(AspNetPagerPagerWrapDiv);
            if (SelectPage != 1) {
                //上一步
                var AspNetPagerPrevPageA = document.createElement("a");
                $(AspNetPagerPrevPageA).addClass("PrevPage");
                $(AspNetPagerPrevPageA).text("上一页");
                $(AspNetPagerPrevPageA).click(function (e) {
                    var PrevPage = parseInt(element.pagenumber) - 1;
                    if (PrevPage > 0) {
                        _this.OnSelectPage(PrevPage, element);
                    }
                });
                $(AspNetPagerPagerWrapDiv).append(AspNetPagerPrevPageA);
            }
            //总按钮数
            var TotalButton = parseInt(element.totalbutton);
            if (TotalButton < 5) {
                TotalButton = 5;
            }
            //最大偏移量
            var MaxDeviation = Math.floor((TotalButton - 2) / 2);
            //偏移量起始位置
            var DeviationStart = 0;
            //左省略号是否存在
            var LeftSpotExist = false;
            //右省略号是否存在
            var RightSpotExist = false;
            //如果首页和选中页之间偏移量不足,那么将偏移量右移(即起始偏移量减少)
            if (SelectPage - 2 <= MaxDeviation) {
                //偏移量位置=起始偏移量+首页和选中页之间不足的偏移量(补齐)
                //MaxDeviation = -MaxDeviation + (MaxDeviation - (SelectPage - 1 - 1));
                DeviationStart = -SelectPage + 2;
                //右省略号存在     
                LeftSpotExist = false;
                RightSpotExist = true;
            }
            //如果尾页和选中页之间偏移量不足,那么将偏移量左移(即起始偏移量增加)
            if (TotalNumberPage - SelectPage - 1 <= TotalButton - 3 - MaxDeviation) {
                //偏移量位置=起始偏移量+尾页和选中页之间不足的偏移量(补齐)
                //MaxDeviation = - MaxDeviation - (TotalButton - 3 - MaxDeviation-(TotalNumberPage - SelectPage - 1));
                DeviationStart = TotalNumberPage - SelectPage - TotalButton + 2;
                //左省略号存在
                LeftSpotExist = true;
                RightSpotExist = false;
            }
            //两边偏移量都不足
            if (SelectPage - 2 <= MaxDeviation && TotalNumberPage - SelectPage - 1 <= TotalButton - 3 - MaxDeviation) {
                //偏移量位置=起始偏移量+首页和选中页之间不足的偏移量(补齐)
                DeviationStart = -SelectPage + 2;
                LeftSpotExist = false;
                RightSpotExist = false;
            }
            //两边偏移量都足够
            if (SelectPage - 2 > MaxDeviation && TotalNumberPage - SelectPage - 1 > TotalButton - 3 - MaxDeviation) {
                //偏移量位置=起始偏移量
                DeviationStart = -MaxDeviation;
                LeftSpotExist = true;
                RightSpotExist = true;
            }
            //按钮数量不够,不显示省略号,偏移量不左移也不右移
            if (TotalNumberPage <= TotalButton) {
                DeviationStart = -SelectPage + 2;
                LeftSpotExist = false;
                RightSpotExist = false;
            }
            var _loop_1 = function () {
                if (i <= TotalNumberPage) {
                    //数字按钮
                    var AspNetPagerNumberPageA_1 = document.createElement("a");
                    $(AspNetPagerNumberPageA_1).addClass("NumberPage");
                    //第一个按钮
                    if (i == 1) {
                        if (i == SelectPage) {
                            $(AspNetPagerNumberPageA_1).addClass("Current");
                        }
                        $(AspNetPagerNumberPageA_1).text(i);
                    }
                    else if (i == TotalButton) {
                        if (TotalNumberPage == SelectPage) {
                            $(AspNetPagerNumberPageA_1).addClass("Current");
                        }
                        $(AspNetPagerNumberPageA_1).text(TotalNumberPage);
                    }
                    else {
                        if (DeviationStart == 0) {
                            $(AspNetPagerNumberPageA_1).addClass("Current");
                        }
                        $(AspNetPagerNumberPageA_1).text(SelectPage + DeviationStart);
                        DeviationStart++;
                    }
                    $(AspNetPagerNumberPageA_1).click(function (e) {
                        _this.OnSelectPage($(AspNetPagerNumberPageA_1).text(), element);
                    });
                    $(AspNetPagerPagerWrapDiv).append(AspNetPagerNumberPageA_1);
                    //判断省略号是否存在
                    if (i == 2) {
                        if (LeftSpotExist == true) {
                            var AspNetPagerNumberPageSpot = document.createElement("a");
                            $(AspNetPagerNumberPageSpot).addClass("SpotPage");
                            $(AspNetPagerNumberPageSpot).text("...");
                            $(AspNetPagerNumberPageA_1).before(AspNetPagerNumberPageSpot);
                            LeftSpotExist = false;
                        }
                    }
                    if (i == TotalButton - 1) {
                        if (RightSpotExist == true) {
                            var AspNetPagerNumberPageSpot = document.createElement("a");
                            $(AspNetPagerNumberPageSpot).addClass("SpotPage");
                            $(AspNetPagerNumberPageSpot).text("...");
                            $(AspNetPagerNumberPageA_1).after(AspNetPagerNumberPageSpot);
                            RightSpotExist = false;
                        }
                    }
                }
            };
            for (var i = 1; i <= TotalButton; i++) {
                _loop_1();
            }
            if (SelectPage != TotalNumberPage) {
                //下一步
                var AspNetPagerNextPageA = document.createElement("a");
                $(AspNetPagerNextPageA).addClass("NextPage");
                $(AspNetPagerNextPageA).text("下一页");
                $(AspNetPagerNextPageA).click(function (e) {
                    var NextPage = parseInt(element.pagenumber) + 1;
                    if (NextPage <= TotalNumberPage) {
                        _this.OnSelectPage(NextPage, element);
                    }
                });
                $(AspNetPagerPagerWrapDiv).append(AspNetPagerNextPageA);
            }
        }
    };
    //构建组件
    FeComponentAspNetPager.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentAspNetPager;
}(FeTemplateComponentBase));
/*
****属性*****
html:<Gf-FeTemplate-Component-Character articleid=>
js:$("#character").feComponentCharacter("articleid",'');
   var articleid = $("#character").feComponentCharacter('options','articleid');

****方法****

****事件****
click，点击标签事件
js:$("#character").feComponentCharacter("CharacterClick",function(articleid,characterid){  });

*/
var FeComponentCharacter = (function (_super) {
    __extends(FeComponentCharacter, _super);
    function FeComponentCharacter(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("articleid,icon");
        return _this;
    }
    FeComponentCharacter.prototype.defaultOptions = function () {
        var options = {
            articleid: '',
            icon: 'SmallIcon'
        };
        return options;
    };
    //设置选项前
    FeComponentCharacter.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentCharacter.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentCharacter.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Character";
    };
    //获取当前组件是否自动初始化
    FeComponentCharacter.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentCharacter.prototype.extendName = function () {
        return "feComponentCharacter";
    };
    //扩展方法实现
    FeComponentCharacter.prototype.extendFunction = function (element, method, args) {
        //super.extendFunctionProxy(element, method, args);
        if ("CharacterClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.CharacterClick = args;
        }
        else {
            _super.prototype.extendFunctionProxy.call(this, element, method, args);
        }
    };
    //重新加载
    FeComponentCharacter.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        if (element.articleid != "") {
            $.ajax({
                url: this.resolveUrl(element, "~/FeArticle/GetCharacters"),
                type: "post",
                data: { articleId: element.articleid },
                datatype: "json",
                async: false,
                success: function (result) {
                    result.forEach(function (item) {
                        var a = document.createElement("a");
                        $(a).attr("href", "#");
                        if (element.icon == "BigIcon") {
                            if (item.BigIcon != null) {
                                $(a).append("<img src='" + _this.resolveUrl(element, "~/File?id=" + item.BigIcon) + "'>");
                            }
                            else {
                                $(a).text(item.Name);
                            }
                            $(a).addClass("character1");
                        }
                        else {
                            if (item.SmallIcon != null) {
                                $(a).append("<img src='" + _this.resolveUrl(element, "~/File?id=" + item.SmallIcon) + "'>");
                            }
                            else {
                                $(a).text(item.Name);
                            }
                            $(a).addClass("character");
                        }
                        $(container).append(a);
                        $(a).click(function () {
                            if (element.xtag.eventHandlers.CharacterClick) {
                                element.xtag.eventHandlers.CharacterClick(item.Id);
                            }
                        });
                    });
                }
            });
        }
    };
    //构建组件
    FeComponentCharacter.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentCharacter");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentCharacter;
}(FeTemplateComponentBase));
/*
****属性*****
sourceidid: 数据源ID
wholewidth: 控件宽度
headlabel:标题文字
sourceurl:数据源url(数据源异步提交方法)
pagesize:列表显示数量
ischildren:是否默认显示二级回复列表
****方法****

****事件****

*/
var FeComponentCommentDetailList = (function (_super) {
    __extends(FeComponentCommentDetailList, _super);
    function FeComponentCommentDetailList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("sourceid,sourceurl,wholewidth,headlabel,pagesize,ischildren");
        return _this;
    }
    FeComponentCommentDetailList.prototype.defaultOptions = function () {
        var options = {
            sourceid: '',
            wholewidth: '880px',
            sourceurl: "",
            headlabel: '全部评论',
            pagesize: 5,
            ischildren: "false"
        };
        return options;
    };
    //设置选项前
    FeComponentCommentDetailList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentCommentDetailList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentCommentDetailList.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-CommentDetailList";
    };
    //获取当前组件是否自动初始化
    FeComponentCommentDetailList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentCommentDetailList.prototype.extendName = function () {
        return "feComponentCommentDetailList";
    };
    //扩展方法实现
    FeComponentCommentDetailList.prototype.extendFunction = function (element, method, args) {
        if ("ContentListRefresh" === method) {
            $(element.get("Gf-FeTemplate-Component-CommentDetailList-AspNetPager")).feComponentAspNetPager("Select", 1);
        }
    };
    //重新加载
    FeComponentCommentDetailList.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //组件加载
    FeComponentCommentDetailList.prototype.loadData = function (element, container) {
        $(container).addClass("FeComponentCommentDetailList");
        $(container).css("width", element.wholewidth);
        //评论列表顶部标题h3
        var headh3 = document.createElement("h3");
        $(headh3).text(element.headlabel);
        $(headh3).addClass("clearfix");
        $(container).append(headh3);
        //评论数量
        var headh3b = document.createElement("b");
        $(headh3b).text("(0条)");
        $(headh3).append(headh3b);
        //评论列表Div
        var listdiv = document.createElement("div");
        $(listdiv).addClass("j-loops-list");
        $(listdiv).addClass("clearfix");
        $(container).append(listdiv);
        //评论列表ul
        var listdivul = document.createElement("ul");
        $(listdivul).addClass("clearfix");
        $(listdivul).addClass("detailul");
        $(listdiv).append(listdivul);
        var that = this;
        //分页组件
        var listdivAspNetPager = document.createElement("Gf-FeTemplate-Component-AspNetPager");
        listdivAspNetPager.pagesize = element.pagesize;
        element.set("Gf-FeTemplate-Component-CommentDetailList-AspNetPager", listdivAspNetPager);
        $(listdiv).append(listdivAspNetPager);
        _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-AspNetPager");
        listdivAspNetPager["init"]();
        $(listdivAspNetPager).feComponentAspNetPager("OnSelectPage", function (pageNumber, pageSize) {
            that.GetCommentList(listdivAspNetPager, pageNumber, pageSize, element, listdivul, headh3b);
        });
        $(listdivAspNetPager).feComponentAspNetPager("Select", 1);
    };
    //查询评论列表
    FeComponentCommentDetailList.prototype.GetCommentList = function (pageElement, pageNumber, pageSize, element, listdivul, headh3b) {
        var _this = this;
        $.ajax({
            url: this.resolveUrl(element, element.sourceurl),
            type: "POST",
            dataType: "json",
            data: {
                SourceID: element.sourceid,
                pageIndex: pageNumber,
                pageSize: pageSize
            },
            success: function (result) {
                if (result) {
                    $(listdivul).empty();
                    $(pageElement).feComponentAspNetPager({ total: result.total });
                    $(headh3b).text("(" + result.total + "条)");
                    result.rows.forEach(function (item) {
                        //评论列表li
                        var listdivulli = document.createElement("li");
                        $(listdivulli).addClass("detailulli");
                        $(listdivul).append(listdivulli);
                        //评论列表人物头像div
                        var listdivullipeodiv = document.createElement("div");
                        $(listdivullipeodiv).addClass("j-img");
                        $(listdivullipeodiv).addClass("fl");
                        $(listdivulli).append(listdivullipeodiv);
                        //评论列表人物头像img
                        var listdivullidivimg = document.createElement("img");
                        $(listdivullidivimg).addClass("j-img");
                        if (item.CreatorImg != null && item.CreatorImg != "") {
                            $(listdivullidivimg).attr("src", _this.resolveUrl(element, "~/File?id=" + item.CreatorImg));
                        }
                        $(listdivullipeodiv).append(listdivullidivimg);
                        //评论列表回复信息div
                        var listdivulliinfodiv = document.createElement("div");
                        $(listdivulliinfodiv).addClass("j-size");
                        $(listdivulli).append(listdivulliinfodiv);
                        //评论列表回复信息h2    
                        var listdivulliinfodivh2 = document.createElement("h2");
                        $(listdivulliinfodivh2).addClass("clearfix");
                        $(listdivulliinfodiv).append(listdivulliinfodivh2);
                        //评论列表回复信息左侧
                        var listdivulliinfodivh2leftspan = document.createElement("span");
                        $(listdivulliinfodivh2leftspan).addClass("fl");
                        $(listdivulliinfodivh2).append(listdivulliinfodivh2leftspan);
                        //评论列表回复信息左侧登录名
                        var listdivulliinfodivh2leftspanb = document.createElement("b");
                        $(listdivulliinfodivh2leftspanb).text(item.Creator);
                        $(listdivulliinfodivh2leftspan).append(listdivulliinfodivh2leftspanb);
                        //评论列表回复信息左侧时间
                        $(listdivulliinfodivh2leftspan).append(item.CreatedOn);
                        //评论列表回复信息右侧
                        var listdivulliinfodivh2rightspan = document.createElement("span");
                        $(listdivulliinfodivh2rightspan).addClass("fr");
                        $(listdivulliinfodivh2rightspan).text("回复");
                        $(listdivulliinfodivh2).append(listdivulliinfodivh2rightspan);
                        //评论列表右侧展开二级回复
                        var listdivulliinfodivh2rightspan1 = document.createElement("span");
                        $(listdivulliinfodivh2rightspan1).addClass("SearchReply");
                        $(listdivulliinfodivh2rightspan1).hide();
                        $(listdivulliinfodivh2).append(listdivulliinfodivh2rightspan1);
                        //查看回复按钮
                        var listdivulliinfodivh2rightspan1a = document.createElement("a");
                        $(listdivulliinfodivh2rightspan1a).addClass("SearchReplyButton");
                        $(listdivulliinfodivh2rightspan1a).attr("childrendispaly", "0");
                        $(listdivulliinfodivh2rightspan1a).attr("name", "SearchReplyButton");
                        $(listdivulliinfodivh2rightspan1a).text("查看回复");
                        $(listdivulliinfodivh2rightspan1).append(listdivulliinfodivh2rightspan1a);
                        //回复列表数量
                        var listdivulliinfodivh2rightspan1b = document.createElement("b");
                        $(listdivulliinfodivh2rightspan1b).addClass("ChildrenListCount");
                        $(listdivulliinfodivh2rightspan1b).text("(0条)");
                        $(listdivulliinfodivh2rightspan1b).attr("title", "0条");
                        $(listdivulliinfodivh2rightspan1b).attr("name", "ChildrenListCount");
                        $(listdivulliinfodivh2rightspan1).append(listdivulliinfodivh2rightspan1b);
                        //评论列表回复内容p
                        var listdivulliinfodivp = document.createElement("p");
                        $(listdivulliinfodivp).addClass("j-evaluate");
                        $(listdivulliinfodivp).html(item.Content);
                        $(listdivulliinfodiv).append(listdivulliinfodivp);
                        //评论的二级回复列表
                        var listdivulliinfodivchildrendiv = document.createElement("div");
                        $(listdivulliinfodivchildrendiv).attr("name", 'replydiv');
                        $(listdivulliinfodivchildrendiv).addClass("j-reply");
                        $(listdivulliinfodiv).append(listdivulliinfodivchildrendiv);
                        $(listdivulliinfodivchildrendiv).hide();
                        //二级回复的小三角
                        var listdiv_ul_liinfo_div_children_div_em = document.createElement("em");
                        $(listdiv_ul_liinfo_div_children_div_em).addClass("j-replyem");
                        $(listdivulliinfodivchildrendiv).append(listdiv_ul_liinfo_div_children_div_em);
                        //二级回复ul
                        var list_div_ul_liinfo_div_childrendiv_ul = document.createElement("ul");
                        $(list_div_ul_liinfo_div_childrendiv_ul).addClass("j-replyul");
                        $(listdivulliinfodivchildrendiv).append(list_div_ul_liinfo_div_childrendiv_ul);
                        //展开按钮
                        $(listdivulliinfodivh2rightspan1a).click(function () {
                            if ($(listdivulliinfodivh2rightspan1a).attr("childrendispaly") == "1") {
                                $(listdivulliinfodivchildrendiv).fadeOut();
                                $(listdivulliinfodivh2rightspan1a).text("查看回复");
                                $(listdivulliinfodivh2rightspan1a).attr("childrendispaly", "0");
                            }
                            else {
                                $(listdivulliinfodivchildrendiv).fadeIn();
                                $(listdivulliinfodivh2rightspan1a).text("收起回复");
                                $(listdivulliinfodivh2rightspan1a).attr("childrendispaly", "1");
                            }
                        });
                        //二级回复分页组件
                        var ChildrenlistdivAspNetPager = document.createElement("Gf-FeTemplate-Component-AspNetPager");
                        ChildrenlistdivAspNetPager.pagesize = element.pagesize;
                        ChildrenlistdivAspNetPager.isskip = "false";
                        ChildrenlistdivAspNetPager.componentstyle = "simple";
                        $(listdivulliinfodivchildrendiv).append(ChildrenlistdivAspNetPager);
                        ChildrenlistdivAspNetPager["init"]();
                        var that = _this;
                        $(ChildrenlistdivAspNetPager).feComponentAspNetPager("OnSelectPage", function (pageNumber, pageSize) {
                            that.GetChildrenCommentList(ChildrenlistdivAspNetPager, pageNumber, pageSize, item.ID, element, list_div_ul_liinfo_div_childrendiv_ul, listdivulliinfodivh2rightspan1);
                        });
                        $(ChildrenlistdivAspNetPager).feComponentAspNetPager("Select", 1);
                        //创建评论提交组件ID
                        var CommentSubmitID = _this.GetUniqueId("FeComponentCommentSubmitID");
                        $(listdivulliinfodivh2rightspan).click(function (e) {
                            _this.CommentReplyClick(e, element, listdivulliinfodivp, CommentSubmitID, item.ID, ChildrenlistdivAspNetPager);
                        });
                    });
                }
            }
        });
    };
    FeComponentCommentDetailList.prototype.GetChildrenCommentList = function (pageElement, pageNumber, pageSize, commentID, element, list_div_ul_liinfo_div_childrendiv_ul, listdivulliinfodivh2rightspan1) {
        var _this = this;
        $.ajax({
            url: this.resolveUrl(element, "~/FeComment/GetCommentChildrenByCommentID"),
            type: "POST",
            dataType: "json",
            data: {
                pageIndex: pageNumber,
                pageSize: pageSize,
                commentID: commentID
            },
            success: function (result) {
                if (result) {
                    if (result.rows.length > 0) {
                        //分页组件赋值                              
                        $(pageElement).feComponentAspNetPager({ total: result.total });
                        //清空列表
                        $(list_div_ul_liinfo_div_childrendiv_ul).empty();
                        //显示展开回复按妞
                        $(listdivulliinfodivh2rightspan1).show();
                        //回复列表数量
                        $(listdivulliinfodivh2rightspan1).find("[name='ChildrenListCount']").text("(" + result.total + "条)").attr("title", result.total + "条");
                        //判断是否默认显示二级回复列表
                        if (element.ischildren == "true") {
                            $(listdivulliinfodivh2rightspan1).find("[name='SearchReplyButton']").click();
                        }
                        result.rows.forEach(function (children) {
                            //二级回复li
                            var list_div_ul_liinfo_div_childrendiv_ul_li = document.createElement("li");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li).addClass("j-replyulli");
                            $(list_div_ul_liinfo_div_childrendiv_ul).append(list_div_ul_liinfo_div_childrendiv_ul_li);
                            //回复人头像Div
                            var list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv = document.createElement("div");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv).addClass("j-img");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv).addClass("fl");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li).append(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv);
                            //回复人头像
                            var list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv_img = document.createElement("img");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv_img).addClass("j-img");
                            if (children.CreatorImg != null && children.CreatorImg != "") {
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv_img).attr("src", _this.resolveUrl(element, "~/File?id=" + children.CreatorImg));
                            }
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_imgdiv_img);
                            //头像右侧Div
                            var list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv = document.createElement("div");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).addClass("j-replyullirightdiv");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li).append(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv);
                            //回复人
                            var list_div_ul_liinfo_div_childrendiv_ul_li_b = document.createElement("b");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_b).addClass("j-replyullib");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_b).text(children.Creator);
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_b);
                            if (children.ReplyUpPerson != "") {
                                var list_div_ul_liinfo_div_childrendiv_ul_li_b1 = document.createElement("b");
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_b1).addClass("j-replyullib1");
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_b1).text("回复");
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_b1);
                                var list_div_ul_liinfo_div_childrendiv_ul_li_b2 = document.createElement("b");
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_b2).addClass("j-replyullib");
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_b2).text(children.ReplyUpPerson);
                                $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_b2);
                            }
                            var list_div_ul_liinfo_div_childrendiv_ul_li_colon = document.createElement("b");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_colon).text(":");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_colon);
                            //回复内容
                            var list_div_ul_liinfo_div_childrendiv_ul_li_p = document.createElement("p");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_p).addClass("j-replyullip");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_p).html(children.Content);
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_p);
                            //回复内容下方操作Div
                            var list_div_ul_liinfo_div_childrendiv_ul_li_div = document.createElement("div");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div).addClass("j-replyullidiv");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_rightdiv).append(list_div_ul_liinfo_div_childrendiv_ul_li_div);
                            //回复时间
                            var list_div_ul_liinfo_div_childrendiv_ul_li_div_span = document.createElement("span");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div_span).addClass("j-replyullidivspan");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div_span).text(children.CreatedOn);
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div).append(list_div_ul_liinfo_div_childrendiv_ul_li_div_span);
                            //回复按钮
                            var list_div_ul_liinfo_div_childrendiv_ul_li_div_a = document.createElement("a");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div_a).addClass("j-replyullidiva");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div_a).text("回复");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div).append(list_div_ul_liinfo_div_childrendiv_ul_li_div_a);
                            var CommentChildrenSubmitID = _this.GetUniqueId("FeComponentCommentChildrenSubmitID");
                            $(list_div_ul_liinfo_div_childrendiv_ul_li_div_a).click(function (e) {
                                _this.CommentReplyClick(e, element, list_div_ul_liinfo_div_childrendiv_ul_li_div, CommentChildrenSubmitID, children.ID, pageElement);
                            });
                        });
                    }
                }
            }
        });
    };
    //回复点击展开评论提交组件
    FeComponentCommentDetailList.prototype.CommentReplyClick = function (e, element, container, CommentSubmitID, ParentCommentID, pageElement) {
        var CommentSubmit = $(container).parent().find("#" + CommentSubmitID);
        if ($(CommentSubmit).length <= 0) {
            var ArticleCommentSubmit_1 = document.createElement("Gf-FeTemplate-Component-CommentSubmit");
            $(ArticleCommentSubmit_1).attr("id", CommentSubmitID);
            $(ArticleCommentSubmit_1).attr("headisshow", "false");
            $(ArticleCommentSubmit_1).attr("sourceid", element.sourceid);
            $(ArticleCommentSubmit_1).attr("sourceurl", "~/FeArticleComment/AddArticleComment");
            $(ArticleCommentSubmit_1).attr("parentid", ParentCommentID);
            $(ArticleCommentSubmit_1).attr("buttonlabel", "提交回复");
            $(ArticleCommentSubmit_1).hide();
            $(container).after(ArticleCommentSubmit_1);
            _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-CommentSubmit");
            ArticleCommentSubmit_1["init"]();
            //提交成功后刷新页面
            $(ArticleCommentSubmit_1).feComponentCommentSubmit("AfterCommentSubmitClick", function () {
                $(pageElement).feComponentAspNetPager("Select", 1);
            });
            //用于判断$(document).click事件的添加次数,只用添加一次
            if (element.get("Gf-FeTemplate-Component-CommentSubmitHideValue") != "true") {
                $(document).click(function (e) {
                    $(element).find("[elementname=" + $(ArticleCommentSubmit_1).attr("elementname") + "]").hide();
                });
            }
            element.set("Gf-FeTemplate-Component-CommentSubmitHideValue", "true");
        }
        var CommentSubmit = $(container).parent().find("#" + CommentSubmitID);
        $(element).find("[elementname=" + $(CommentSubmit).attr("elementname") + "][id!='" + $(CommentSubmit).attr("id") + "']").hide();
        $(CommentSubmit).toggle();
        e.stopPropagation();
    };
    //构建组件
    FeComponentCommentDetailList.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentCommentDetailList;
}(FeTemplateComponentBase));
/*
****属性*****
sourceid: 数据源ID
parentid:评论父级ID,如果没有则为空
loginState:登录状态
headlabel: 头部标签名称
sourceurl:数据源url(数据源异步提交方法)
buttonLabel: 按钮名称
headisshow: 头部是否隐藏false隐藏true显示
wholewidth: 控件宽度
allowtourist:是否允许游客评论
****方法****

****事件****

*/
var FeComponentCommentSubmit = (function (_super) {
    __extends(FeComponentCommentSubmit, _super);
    function FeComponentCommentSubmit(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("sourceid,parentid,sourceurl,loginstate,headlabel,buttonlabel,headisshow,wholewidth,allowtourist");
        return _this;
    }
    FeComponentCommentSubmit.prototype.defaultOptions = function () {
        var options = {
            sourceid: '',
            parentid: '',
            sourceurl: '',
            loginstate: 'false',
            headlabel: '参与讨论',
            buttonlabel: '提交评论',
            headisshow: 'true',
            wholewidth: '100%',
            allowtourist: 'false'
        };
        return options;
    };
    //设置选项前
    FeComponentCommentSubmit.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentCommentSubmit.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentCommentSubmit.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-CommentSubmit";
    };
    //获取当前组件是否自动初始化
    FeComponentCommentSubmit.prototype.getAutoInit = function () {
        return false;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentCommentSubmit.prototype.extendName = function () {
        return "feComponentCommentSubmit";
    };
    //扩展方法实现
    FeComponentCommentSubmit.prototype.extendFunction = function (element, method, args) {
        if ("AfterCommentSubmitClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.AfterCommentSubmitClick = args;
        }
    };
    //重新加载
    FeComponentCommentSubmit.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //组件加载
    FeComponentCommentSubmit.prototype.loadData = function (element, container) {
        var _this = this;
        $(container).addClass("FeComponentCommentSubmit");
        $(container).css("width", element.wholewidth);
        //头部是否显示
        if (element.headisshow == "true") {
            //评论提交顶部Div                  
            var headDiv = document.createElement("div");
            $(headDiv).addClass("j-headed");
            $(container).append(headDiv);
            //参与讨论标签
            var headDivlabelB = document.createElement("b");
            $(headDivlabelB).text(element.headlabel);
            $(headDiv).append(headDivlabelB);
            //未登录显示登录提醒
            if (element.loginState == "false") {
                //判断是否允许游客评论,不允许游客评论显示登录提醒
                if (element.allowtourist == "false") {
                    //登录评论标签
                    var headDivSpan = document.createElement("span");
                    $(headDivSpan).html("请<a href='#'>登录</a>后参与评论");
                    $(headDiv).append(headDivSpan);
                }
            }
        }
        //评论内容Div
        var contentDiv = document.createElement("div");
        $(contentDiv).addClass("comment");
        $(container).append(contentDiv);
        //评论内容文本框
        var contentDivText = document.createElement("Gf-Editor");
        contentDivText["toolbar"] = "None";
        $(contentDivText).attr("width", "99.7%");
        $(contentDivText).attr("height", "135px");
        $(contentDiv).append(contentDivText);
        contentDivText["init"]();
        //评论按钮和表情包
        var contentDivP = document.createElement("p");
        $(contentDiv).append(contentDivP);
        //评论按钮
        var contentDivPInput = document.createElement("input");
        $(contentDivPInput).addClass("sub_btn");
        $(contentDivPInput).attr("type", "button");
        $(contentDivPInput).val(element.buttonlabel);
        //评论提交事件
        $(contentDivPInput).click(function (e) {
            _this.CommentSubmitClick(contentDivText, element);
        });
        $(contentDivP).append(contentDivPInput);
        //调用表情包组件
        var contentDivPSpan = document.createElement("Gf-FeTemplate-Component-Emoticon");
        $(contentDivP).append(contentDivPSpan);
        _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-Emoticon");
        contentDivPSpan["init"]();
        //扩展表情包点击事件,将表情赋值给容器
        this.EmoticonImgClick(contentDivPSpan, contentDivText);
    };
    //评论提交事件
    FeComponentCommentSubmit.prototype.CommentSubmitClick = function (container, element) {
        var containerText = container["getValue"]();
        if (containerText == "") {
            $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "评论内容不能为空", position: 'bottomRight' });
            return;
        }
        $.ajax({
            url: this.resolveUrl(element, element.sourceurl),
            type: "POST",
            dataType: "json",
            data: {
                ParentID: element.parentid,
                SourceID: element.sourceid,
                FeCommentContent: containerText
            },
            success: function (result) {
                if (result) {
                    $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "评论提交成功", position: 'bottomRight' });
                    container["setValue"]("");
                    if (element.xtag.eventHandlers.AfterCommentSubmitClick) {
                        element.xtag.eventHandlers.AfterCommentSubmitClick();
                    }
                }
                else {
                    $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "评论提交失败", position: 'bottomRight' });
                }
            },
            error: function () {
                $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "评论提交失败", position: 'bottomRight' });
            }
        });
    };
    //扩展表情包点击事件,将表情赋值给容器
    FeComponentCommentSubmit.prototype.EmoticonImgClick = function (emoticonimg, container) {
        $(emoticonimg).feComponentEmoticon("EmoticonImgClick", function (src) {
            var image = document.createElement("img");
            $(image).attr("src", src);
            container["insertHtml"]($(image).prop("outerHTML"));
        });
    };
    //构建组件
    FeComponentCommentSubmit.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentCommentSubmit;
}(FeTemplateComponentBase));
/*
****属性*****
emoticonimgcount:显示多少个表情
emoticonbox:表情盒子的宽度
****方法****

****事件****
表情图片点击事件
js:$("#xxx").feComponentEmoticon("EmoticonImgClick",function(src) {});
参数src:图片路径
*/
var FeComponentEmoticon = (function (_super) {
    __extends(FeComponentEmoticon, _super);
    function FeComponentEmoticon(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("emoticonimgcount,emoticonbox");
        return _this;
    }
    FeComponentEmoticon.prototype.defaultOptions = function () {
        var options = {
            emoticonimgcount: '75',
            emoticonbox: '425px'
        };
        return options;
    };
    //设置选项前
    FeComponentEmoticon.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentEmoticon.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentEmoticon.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Emoticon";
    };
    //获取当前组件是否自动初始化
    FeComponentEmoticon.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentEmoticon.prototype.extendName = function () {
        return "feComponentEmoticon";
    };
    //扩展方法实现
    FeComponentEmoticon.prototype.extendFunction = function (element, method, args) {
        if ("EmoticonImgClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.EmoticonImgClick = args;
        }
    };
    //重新加载
    FeComponentEmoticon.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //点击图标展开表情盒子
    FeComponentEmoticon.prototype.EmoticonSpanClick = function (e, element, target, EmoticonBoxID) {
        var _this = this;
        //取表情盒子元素
        var EmoticonBox = $(target).find("#" + EmoticonBoxID);
        if ($(EmoticonBox).length <= 0) {
            //盒子不存在创建盒子
            //创建盒子Div
            var EmoticonBoxDiv = document.createElement("div");
            $(EmoticonBoxDiv).addClass("qqFace");
            $(EmoticonBoxDiv).css("width", element.emoticonbox);
            $(EmoticonBoxDiv).attr("id", EmoticonBoxID);
            var offset = $(target).position();
            var top = offset.top + $(target).outerHeight();
            $(EmoticonBoxDiv).css('top', top);
            $(EmoticonBoxDiv).css('left', offset.left);
            $(EmoticonBoxDiv).hide();
            $(target).append(EmoticonBoxDiv);
            //创建ul表格用于存放表情图标
            var EmoticonBoxDivUl = document.createElement("ul");
            $(EmoticonBoxDivUl).addClass("clearfix");
            $(EmoticonBoxDiv).append(EmoticonBoxDivUl);
            //显示多少个表情            
            var EmoticonImgCount = element.emoticonimgcount;
            //图片存放地址
            var EmoticonImagePath = this.resolveUrl(element, "~/{Component}/../Images/EmoticonImage/");
            for (var i = 1; i <= EmoticonImgCount; i++) {
                //添加li
                var EmoticonBoxDivUlLi = document.createElement("li");
                $(EmoticonBoxDivUl).append(EmoticonBoxDivUlLi);
                //添加表情图片
                var EmoticonBoxDivUlLiImg = document.createElement("img");
                $(EmoticonBoxDivUlLiImg).attr("src", EmoticonImagePath + i + ".gif");
                //添加表情图片点击事件
                $(EmoticonBoxDivUlLiImg).click(function (e) {
                    _this.EmoticonImgClick(e, element, EmoticonBoxID);
                });
                $(EmoticonBoxDivUlLi).append(EmoticonBoxDivUlLiImg);
            }
            //一个凸出的三角图片
            var EmoticonBoxDivEm = document.createElement("em");
            $(EmoticonBoxDiv).append(EmoticonBoxDivEm);
        }
        //取表情盒子元素
        var EmoticonBox = $(target).find("#" + EmoticonBoxID);
        $(EmoticonBox).toggle();
        //阻止其他事件冒泡
        e.stopPropagation();
    };
    //表情图片点击事件
    FeComponentEmoticon.prototype.EmoticonImgClick = function (e, element, EmoticonBoxID) {
        if (element.xtag.eventHandlers.EmoticonImgClick) {
            var src = $(e.target).attr("src");
            element.xtag.eventHandlers.EmoticonImgClick(src);
            $("#" + EmoticonBoxID).hide();
            e.stopPropagation();
        }
    };
    //组件加载
    FeComponentEmoticon.prototype.loadData = function (element, container) {
        var _this = this;
        $(container).addClass("FeComponentEmoticon");
        //展示表情图标
        var EmoticonSpan = document.createElement("span");
        $(EmoticonSpan).addClass("emotion");
        $(container).append(EmoticonSpan);
        //表情图标右上的标注提醒点
        var EmoticonSpanSpot = document.createElement("i");
        $(EmoticonSpan).append(EmoticonSpanSpot);
        //创建盒子ID
        var EmoticonBoxID = this.GetUniqueId("FeComponentEmoticonBoxID");
        //表情图标点击事件        
        $(EmoticonSpan).click(function (e) {
            _this.EmoticonSpanClick(e, element, container, EmoticonBoxID);
        });
        $(document).click(function (e) {
            $("#" + EmoticonBoxID).hide();
        });
    };
    //构建组件
    FeComponentEmoticon.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentEmoticon;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentFootDown = (function (_super) {
    __extends(FeComponentFootDown, _super);
    function FeComponentFootDown(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentFootDown.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentFootDown.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentFootDown.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentFootDown.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-FootDown";
    };
    //获取当前组件是否自动初始化
    FeComponentFootDown.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentFootDown.prototype.extendName = function () {
        return "feComponentFootDown";
    };
    //扩展方法实现
    FeComponentFootDown.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentFootDown.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentFootDown.prototype.loadData = function (element, container) {
        var items = [];
        $.ajax({
            url: this.resolveUrl(element, '~/FeDecoration/GetFootDownList'),
            type: 'POST',
            dataType: "json",
            data: {},
            async: false,
            success: function (datas) {
                datas.forEach(function (data) {
                    items.push({
                        locallink: data.LocalLink,
                        friendlink: data.FriendLink,
                        tel: data.Tel,
                        worktime: data.WorkTime,
                        email: data.Email,
                        copyright: data.Copyright
                    });
                });
            }
        });
        var a = document.createElement("a");
        //let div_size = document.createElement("div");
        //$(div_size).addClass("j-foot-size");
        //$(container).append(div_size);
        var div = document.createElement("div");
        $(div).addClass("j-footer-box");
        $(div).addClass("j-covers");
        $(container).append(div);
        var div_navigation = document.createElement("div");
        $(div_navigation).addClass("j-navigation");
        $(div_navigation).addClass("clearfix");
        $(div).append(div_navigation);
        for (var i = 0; i < items[0].locallink.length; i++) {
            a = document.createElement("a");
            $(a).attr("href", items[0].locallink[i].href);
            $(a).text(items[0].locallink[i].text);
            $(div_navigation).append(a);
        }
        var div_blogroll = document.createElement("div");
        $(div_blogroll).addClass("j-blogroll");
        $(div_blogroll).addClass("clearfix");
        $(div).append(div_blogroll);
        var dl = document.createElement("dl");
        $(div_blogroll).append(dl);
        var dt = document.createElement("dt");
        $(dt).addClass("fl");
        $(dt).text("友情链接：");
        $(dl).append(dt);
        var dd = document.createElement("dd");
        $(dd).addClass("j-link-con");
        $(dl).append(dd);
        for (var i = 0; i < items[0].friendlink.length; i++) {
            a = document.createElement("a");
            $(a).attr("href", items[0].friendlink[i].href);
            $(a).text(items[0].friendlink[i].text);
            $(dd).append(a);
        }
        var dd_apply = document.createElement("dd");
        $(dd_apply).addClass("j-apply");
        $(dl).append(dd_apply);
        a = document.createElement("a");
        $(a).attr("href", "#");
        $(a).text("申请链接");
        $(dd_apply).append(a);
        $(div_blogroll).append();
        var div_copyright = document.createElement("div");
        $(div_copyright).addClass("j-copyright");
        $(div_copyright).addClass("clearfix");
        $(div).append(div_copyright);
        var div_copyright_fl = document.createElement("div");
        $(div_copyright_fl).addClass("j-copyright-fl");
        $(div_copyright_fl).addClass("fl");
        $(div_copyright).append(div_copyright_fl);
        var p = document.createElement("p");
        $(p).text("全国订购热线:" + items[0].tel + "  7×24小时在线订购  客服工作时间:" + items[0].worktime);
        $(div_copyright_fl).append(p);
        p = document.createElement("p");
        $(p).text("Email：" + items[0].email);
        $(div_copyright_fl).append(p);
        var div_copyright_fr = document.createElement("div");
        $(div_copyright_fr).addClass("j-copyright-fr");
        $(div_copyright_fr).addClass("fr");
        $(div_copyright).append(div_copyright_fr);
        //for (let i = 0; i < items[0].copyright.length; i++) {
        //    let ul = document.createElement("ul");
        //    $(div_copyright_fr).append(ul);
        //    let li = document.createElement("li");
        //    $(ul).append(li);
        //    dl = document.createElement("dl");
        //    $(li).append(dl);
        //    dt = document.createElement("dt");
        //    $(dt).addClass("fl");
        //    $(dl).append(dt);
        //    let img = document.createElement("img");
        //    $(img).attr("src", this.resolveUrl(element, "~/File?id=" + items[0].copyright[i].image));
        //    $(dt).append(img);
        //    dd = document.createElement("dd");
        //    $(dl).append(dd);
        //    p = document.createElement("p");
        //    $(p).text(items[0].copyright[i].text);
        //    $(dd).append(p);
        //}
        var ul = document.createElement("ul");
        $(div_copyright_fr).append(ul);
        var li = document.createElement("li");
        $(ul).append(li);
        dl = document.createElement("dl");
        $(li).append(dl);
        dt = document.createElement("dt");
        $(dt).addClass("fl");
        $(dl).append(dt);
        var img = document.createElement("img");
        $(img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/credit.png"));
        $(dt).append(img);
        dd = document.createElement("dd");
        $(dl).append(dd);
        p = document.createElement("p");
        $(p).text("诚信网站示范企业");
        $(dd).append(p);
        ul = document.createElement("ul");
        $(div_copyright_fr).append(ul);
        li = document.createElement("li");
        $(ul).append(li);
        dl = document.createElement("dl");
        $(li).append(dl);
        dt = document.createElement("dt");
        $(dt).addClass("fl");
        $(dl).append(dt);
        img = document.createElement("img");
        $(img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/esteem.png"));
        $(dt).append(img);
        dd = document.createElement("dd");
        $(dl).append(dd);
        p = document.createElement("p");
        $(p).text("可信网站信誉评价");
        $(dd).append(p);
        ul = document.createElement("ul");
        $(div_copyright_fr).append(ul);
        li = document.createElement("li");
        $(ul).append(li);
        dl = document.createElement("dl");
        $(li).append(dl);
        dt = document.createElement("dt");
        $(dt).addClass("fl");
        $(dl).append(dt);
        img = document.createElement("img");
        $(img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/record.png"));
        $(dt).append(img);
        dd = document.createElement("dd");
        $(dl).append(dd);
        p = document.createElement("p");
        $(p).text("经营网站备案信息");
        $(dd).append(p);
    };
    //构建组件
    FeComponentFootDown.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentFootDown");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentFootDown;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentFootNote = (function (_super) {
    __extends(FeComponentFootNote, _super);
    function FeComponentFootNote(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentFootNote.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentFootNote.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentFootNote.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentFootNote.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-FootNote";
    };
    //获取当前组件是否自动初始化
    FeComponentFootNote.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentFootNote.prototype.extendName = function () {
        return "feComponentFootNote";
    };
    //扩展方法实现
    FeComponentFootNote.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentFootNote.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentFootNote.prototype.loadData = function (element, container) {
        var div = document.createElement("div");
        $(div).addClass("j-footnote");
        $(div).addClass("clearfix");
        $(container).append(div);
        var prims = document.createElement("Gf-FeTemplate-Component-Prims");
        $(div).append(prims);
        _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-Prims");
        var div_help = document.createElement("div");
        $(div_help).addClass("j-help-box");
        $(div_help).addClass("j-covers");
        $(div_help).addClass("clearfix");
        $(div).append(div_help);
        var helpbox = document.createElement("Gf-FeTemplate-Component-HelpBox");
        $(div_help).append(helpbox);
        _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-HelpBox");
        var wechatcode = document.createElement("Gf-FeTemplate-Component-WeChatCode");
        $(div_help).append(wechatcode);
        _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-WeChatCode");
        var div_foot = document.createElement("div");
        $(div_foot).addClass("j-foot-size");
        $(div).append(div_foot);
        var footdown = document.createElement("Gf-FeTemplate-Component-FootDown");
        $(div_foot).append(footdown);
        _super.prototype.AddControl.call(this, "Gf-FeTemplate-Component-FootDown");
    };
    //构建组件
    FeComponentFootNote.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentFootNote");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentFootNote;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentFootUp = (function (_super) {
    __extends(FeComponentFootUp, _super);
    function FeComponentFootUp(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentFootUp.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentFootUp.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentFootUp.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentFootUp.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-FootUp";
    };
    //获取当前组件是否自动初始化
    FeComponentFootUp.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentFootUp.prototype.extendName = function () {
        return "feComponentFootUp";
    };
    //扩展方法实现
    FeComponentFootUp.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentFootUp.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentFootUp.prototype.loadData = function (element, container) {
        var div = document.createElement("div");
        $(div).addClass("j-wechats");
        $(div).addClass("fl");
        $(container).append(div);
        $(div).append("<ul class=\"jd_menu clearfix\"><li><dl><dt><div class=\"gtotop_title\">特色服务</div></dt><dd><a href=\"#\" target=\"_blank\">礼物赠送</a></dd><dd><a href=\"#\" target=\"_blank\">上门服务</a></dd><dd><a href=\"#\" target=\"_blank\">延保服务</a></dd><dd><a href=\"#\" target=\"_blank\">价格保护</a></dd><dd><a href=\"#\" target=\"_blank\">商品拍卖</a></dd></dl></li><li><dl><dt><div class=\"gtotop_title\">售后服务</div></dt><dd><a href=\"#\" target=\"_blank\">延迟发货</a></dd><dd><a href=\"#\" target=\"_blank\">上门维修</a></dd><dd><a href=\"#\" target=\"_blank\">退货说明</a></dd><dd><a href=\"#\" target=\"_blank\">保修换货</a></dd><dd><a href=\"#\" target=\"_blank\">联系客服</a></dd></dl></li><li><dl><dt><div class=\"gtotop_title\">支付方式</div></dt><dd><a href=\"#\" target=\"_blank\">网银支付</a></dd><dd><a href=\"#\" target=\"_blank\">银行转账</a></dd><dd><a href=\"#\" target=\"_blank\">公司转账</a></dd><dd><a href=\"#\" target=\"_blank\">邮局汇款</a></dd><dd><a href=\"#\" target=\"_blank\">货到付款</a></dd></dl></li><li><dl><dt><div class=\"gtotop_title\">配送方式</div></dt><dd><a href=\"#\" target=\"_blank\">申通快递</a></dd><dd><a href=\"#\" target=\"_blank\">中铁快运</a></dd><dd><a href=\"#\" target=\"_blank\">特快专递(EMS)</a></dd><dd><a href=\"#\" target=\"_blank\">邮局普包</a></dd><dd><a href=\"#\" target=\"_blank\">快递运输</a></dd></dl></li><li><dl><dt><div class=\"gtotop_title\">购物指南</div></dt><dd><a href=\"#\" target=\"_blank\">系统指引</a></dd><dd><a href=\"#\" target=\"_blank\">积分方案</a></dd><dd><a href=\"#\" target=\"_blank\">联系客服</a></dd><dd><a href=\"#\" target=\"_blank\">交易条款</a></dd><dd><a href=\"#\" target=\"_blank\">购物流程</a></dd></dl></li><li><dl><dt><div class=\"gtotop_title\">关于我们</div></dt><dd><a href=\"#\" target=\"_blank\">如何申请开店</a></dd><dd><a href=\"#\" target=\"_blank\">如何管理店铺</a></dd><dd><a href=\"#\" target=\"_blank\">查看售出商品</a></dd><dd><a href=\"#\" target=\"_blank\">如何发货</a></dd><dd><a href=\"#\" target=\"_blank\">法律声明</a></dd></dl></li></ul>");
    };
    //构建组件
    FeComponentFootUp.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentFootUp");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentFootUp;
}(FeTemplateComponentBase));
/*
****属性*****
gomembercenter:会员中心地址
backhomepage:返回首页地址
****方法****

****事件****

*/
var FeComponentFrontEndLogin = (function (_super) {
    __extends(FeComponentFrontEndLogin, _super);
    function FeComponentFrontEndLogin(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("gomembercenter,backhomepage");
        return _this;
    }
    FeComponentFrontEndLogin.prototype.defaultOptions = function () {
        var options = {
            gomembercenter: document.body["apppath"] + "/FeAccount",
            backhomepage: document.body["apppath"] + "/FeArticle/FrontIndex"
        };
        return options;
    };
    //设置选项前
    FeComponentFrontEndLogin.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentFrontEndLogin.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentFrontEndLogin.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-FrontEndLogin";
    };
    //获取当前组件是否自动初始化
    FeComponentFrontEndLogin.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentFrontEndLogin.prototype.extendName = function () {
        return "feComponentFrontEndLogin";
    };
    //扩展方法实现
    FeComponentFrontEndLogin.prototype.extendFunction = function (element, method, args) {
        if ("AfterLoginSuccess" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.AfterLoginSuccess = args;
        }
    };
    //重新加载
    FeComponentFrontEndLogin.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //组件加载
    FeComponentFrontEndLogin.prototype.loadData = function (element, container) {
        var _this = this;
        $(container).addClass("FeComponentFrontEndLogin");
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndLogin/CheckIsLogin"),
            type: "POST",
            dataType: "json",
            data: {},
            success: function (result) {
                if (result.IsLogin == "true") {
                    _this.LoadWelCome(element, container, result.UserName);
                }
                else {
                    _this.LoadLoginPage(element, container);
                }
            },
            error: function () {
            }
        });
    };
    FeComponentFrontEndLogin.prototype.LoadLoginPage = function (element, container) {
        var _this = this;
        if ($("head")[0].innerHTML.indexOf(document.body["apppath"] + "/Platform/Content/Scripts/MD5.js") === -1) {
            this.includeJS(document.body["apppath"] + "/Platform/Content/Scripts/MD5.js");
        }
        //登录页Div
        var LoginPageDiv = document.createElement("div");
        $(LoginPageDiv).addClass("FrontEndLoginPage");
        $(container).append(LoginPageDiv);
        //登录Div
        var LoginPageDiv_LoginDiv = document.createElement("div");
        $(LoginPageDiv_LoginDiv).addClass("Login");
        $(LoginPageDiv).append(LoginPageDiv_LoginDiv);
        //登录帐号提示信息Div
        var LoginPageDiv_LoginDiv_AccountInfo = document.createElement("div");
        $(LoginPageDiv_LoginDiv_AccountInfo).addClass("AccountInfo");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_AccountInfo);
        //帐号提示信息
        var LoginPageDiv_LoginDiv_Account_Span = document.createElement("span");
        $(LoginPageDiv_LoginDiv_Account_Span).text("用户名/手机/邮箱");
        $(LoginPageDiv_LoginDiv_AccountInfo).append(LoginPageDiv_LoginDiv_Account_Span);
        //马上注册
        var LoginPageDiv_LoginDiv_Account_GoRegister = document.createElement("a");
        $(LoginPageDiv_LoginDiv_Account_GoRegister).addClass("GoUrl");
        $(LoginPageDiv_LoginDiv_Account_GoRegister).attr("href", this.resolveUrl(element, "~/FrontEndRegister"));
        $(LoginPageDiv_LoginDiv_Account_GoRegister).text("马上注册");
        $(LoginPageDiv_LoginDiv_AccountInfo).append(LoginPageDiv_LoginDiv_Account_GoRegister);
        //忘记密码
        var LoginPageDiv_LoginDiv_Account_GoPassword = document.createElement("a");
        $(LoginPageDiv_LoginDiv_Account_GoPassword).addClass("GoUrl");
        $(LoginPageDiv_LoginDiv_Account_GoPassword).text("忘记密码");
        $(LoginPageDiv_LoginDiv_AccountInfo).append(LoginPageDiv_LoginDiv_Account_GoPassword);
        //帐号输入框Div
        var LoginPageDiv_LoginDiv_AccountInput = document.createElement("div");
        $(LoginPageDiv_LoginDiv_AccountInput).addClass("AccountDiv");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_AccountInput);
        //帐号输入框
        var LoginPageDiv_LoginDiv_AccountInput_input = document.createElement("input");
        $(LoginPageDiv_LoginDiv_AccountInput_input).attr("type", "text");
        $(LoginPageDiv_LoginDiv_AccountInput_input).attr("maxlength", "32");
        $(LoginPageDiv_LoginDiv_AccountInput_input).addClass("AccountInput");
        $(LoginPageDiv_LoginDiv_AccountInput).append(LoginPageDiv_LoginDiv_AccountInput_input);
        $(LoginPageDiv_LoginDiv_AccountInput_input).focus();
        element.set("AccountText", LoginPageDiv_LoginDiv_AccountInput_input);
        //$(LoginPageDiv_LoginDiv_AccountInput_input).blur(() => {
        //    if (this.CheckLoginInfo(element, "AccountText")) {
        //        this.ShowVerifyCode(element);
        //    }
        //});     
        $(LoginPageDiv_LoginDiv_AccountInput_input).change(function () {
            if (_this.CheckLoginInfo(element, "AccountText")) {
                _this.ShowVerifyCode(element);
            }
        });
        //账号输入框图像
        var LoginPageDiv_LoginDiv_AccountInput_i = document.createElement("i");
        $(LoginPageDiv_LoginDiv_AccountInput_i).addClass("AccountInputImg");
        $(LoginPageDiv_LoginDiv_AccountInput).append(LoginPageDiv_LoginDiv_AccountInput_i);
        //登录密码提示信息Div
        var LoginPageDiv_LoginDiv_PasswordInfo = document.createElement("div");
        $(LoginPageDiv_LoginDiv_PasswordInfo).addClass("PasswordInfo");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_PasswordInfo);
        //密码提示信息
        var LoginPageDiv_LoginDiv_PasswordInfo_Span = document.createElement("span");
        $(LoginPageDiv_LoginDiv_PasswordInfo_Span).text("密码");
        $(LoginPageDiv_LoginDiv_PasswordInfo).append(LoginPageDiv_LoginDiv_PasswordInfo_Span);
        //密码输入框Div
        var LoginPageDiv_LoginDiv_PasswordInput = document.createElement("div");
        $(LoginPageDiv_LoginDiv_PasswordInput).addClass("PasswordDiv");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_PasswordInput);
        //密码输入框
        var LoginPageDiv_LoginDiv_PasswordInput_input = document.createElement("input");
        $(LoginPageDiv_LoginDiv_PasswordInput_input).attr("type", "password");
        $(LoginPageDiv_LoginDiv_PasswordInput_input).attr("maxlength", "32");
        $(LoginPageDiv_LoginDiv_PasswordInput_input).addClass("PasswordInput");
        $(LoginPageDiv_LoginDiv_PasswordInput).append(LoginPageDiv_LoginDiv_PasswordInput_input);
        element.set("PasswordText", LoginPageDiv_LoginDiv_PasswordInput_input);
        $(LoginPageDiv_LoginDiv_PasswordInput_input).blur(function () {
            _this.CheckLoginInfo(element, "PasswordText");
        });
        //密码输入框图像
        var LoginPageDiv_LoginDiv_PasswordInput_i = document.createElement("i");
        $(LoginPageDiv_LoginDiv_PasswordInput_i).addClass("PasswordInputImg");
        $(LoginPageDiv_LoginDiv_PasswordInput).append(LoginPageDiv_LoginDiv_PasswordInput_i);
        //验证码提示信息Div
        var LoginPageDiv_LoginDiv_CodeInfo = document.createElement("div");
        $(LoginPageDiv_LoginDiv_CodeInfo).addClass("CodeInfo");
        $(LoginPageDiv_LoginDiv_CodeInfo).css("display", "none");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_CodeInfo);
        element.set("CodeInfo", LoginPageDiv_LoginDiv_CodeInfo);
        //验证码提示信息
        var LoginPageDiv_LoginDiv_CodeInfo_Span = document.createElement("span");
        $(LoginPageDiv_LoginDiv_CodeInfo_Span).text("验证码");
        $(LoginPageDiv_LoginDiv_CodeInfo).append(LoginPageDiv_LoginDiv_CodeInfo_Span);
        //验证码输入框Div
        var LoginPageDiv_LoginDiv_CodeInput = document.createElement("div");
        $(LoginPageDiv_LoginDiv_CodeInput).addClass("CodeDiv");
        $(LoginPageDiv_LoginDiv_CodeInput).css("display", "none");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_CodeInput);
        element.set("CodeDiv", LoginPageDiv_LoginDiv_CodeInput);
        //验证码输入框
        var LoginPageDiv_LoginDiv_CodeInput_input = document.createElement("input");
        $(LoginPageDiv_LoginDiv_CodeInput_input).attr("type", "text");
        $(LoginPageDiv_LoginDiv_CodeInput_input).attr("maxlength", "4");
        $(LoginPageDiv_LoginDiv_CodeInput_input).addClass("CodeInput");
        $(LoginPageDiv_LoginDiv_CodeInput).append(LoginPageDiv_LoginDiv_CodeInput_input);
        element.set("CodeText", LoginPageDiv_LoginDiv_CodeInput_input);
        //验证码图片
        var LoginPageDiv_LoginDiv_CodeInput_ImgDiv = document.createElement("div");
        $(LoginPageDiv_LoginDiv_CodeInput_ImgDiv).addClass("CodeImg");
        $(LoginPageDiv_LoginDiv_CodeInput).append(LoginPageDiv_LoginDiv_CodeInput_ImgDiv);
        //创建验证码组件
        var LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code = document.createElement("Gf-VerifyCode");
        LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code["imgwidth"] = "60";
        LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code["imgheight"] = "30";
        $(LoginPageDiv_LoginDiv_CodeInput_ImgDiv).append(LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code);
        element.set("VerifyCode", LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code);
        LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code["init"]();
        //验证码刷新
        var LoginPageDiv_LoginDiv_CodeInput_a = document.createElement("a");
        $(LoginPageDiv_LoginDiv_CodeInput_a).text("看不清楚?点一下");
        $(LoginPageDiv_LoginDiv_CodeInput_a).addClass("Refresh");
        $(LoginPageDiv_LoginDiv_CodeInput).append(LoginPageDiv_LoginDiv_CodeInput_a);
        $(LoginPageDiv_LoginDiv_CodeInput_a).click(function () {
            LoginPageDiv_LoginDiv_CodeInput_ImgDiv_Code["Refresh"]();
        });
        //登录按钮Div
        var LoginPageDiv_LoginDiv_LoginInput = document.createElement("div");
        $(LoginPageDiv_LoginDiv_LoginInput).addClass("LoginDIv");
        $(LoginPageDiv_LoginDiv).append(LoginPageDiv_LoginDiv_LoginInput);
        //错误提示信息
        var LoginPageDiv_LoginDiv_LoginInput_span = document.createElement("span");
        $(LoginPageDiv_LoginDiv_LoginInput_span).addClass("ErrorInfo");
        $(LoginPageDiv_LoginDiv_LoginInput).append(LoginPageDiv_LoginDiv_LoginInput_span);
        element.set("ErrorInfo", LoginPageDiv_LoginDiv_LoginInput_span);
        //成功提示信息
        var LoginPageDiv_LoginDiv_LoginInput_spanSuccess = document.createElement("span");
        $(LoginPageDiv_LoginDiv_LoginInput_spanSuccess).addClass("SuccessInfo");
        $(LoginPageDiv_LoginDiv_LoginInput).append(LoginPageDiv_LoginDiv_LoginInput_spanSuccess);
        element.set("SuccessInfo", LoginPageDiv_LoginDiv_LoginInput_spanSuccess);
        //登录按钮
        var LoginPageDiv_LoginDiv_LoginInput_input = document.createElement("input");
        $(LoginPageDiv_LoginDiv_LoginInput_input).addClass("LoginInput");
        $(LoginPageDiv_LoginDiv_LoginInput_input).attr("type", "button");
        $(LoginPageDiv_LoginDiv_LoginInput_input).val("登录");
        $(LoginPageDiv_LoginDiv_LoginInput).append(LoginPageDiv_LoginDiv_LoginInput_input);
        element.set("BtnLogin", LoginPageDiv_LoginDiv_LoginInput_input);
        $(LoginPageDiv_LoginDiv_LoginInput_input).click(function () {
            _this.Login(element);
        });
        //绑定回车事件
        $(document).keydown(function (event) {
            if (event.keyCode == 13) {
                //触发登录按钮
                $(LoginPageDiv_LoginDiv_LoginInput_input).click();
            }
        });
        //第三方合作登录Div
        var LoginPageDiv_SeccondDiv = document.createElement("div");
        $(LoginPageDiv_SeccondDiv).addClass("Seccond");
        $(LoginPageDiv).append(LoginPageDiv_SeccondDiv);
        //第三方登录提示信息
        var LoginPageDiv_SeccondDiv_Info = document.createElement("div");
        $(LoginPageDiv_SeccondDiv_Info).addClass("Info");
        $(LoginPageDiv_SeccondDiv_Info).text("使用合作网站账号登录：");
        $(LoginPageDiv_SeccondDiv).append(LoginPageDiv_SeccondDiv_Info);
        //第三方登录显示ul
        var LoginPageDiv_SeccondDiv_ul = document.createElement("ul");
        $(LoginPageDiv_SeccondDiv_ul).addClass("clearfix");
        $(LoginPageDiv_SeccondDiv).append(LoginPageDiv_SeccondDiv_ul);
        for (var i = 0; i < 5; i++) {
            //第三方登录显示li1
            var LoginPageDiv_SeccondDiv_ul_li = document.createElement("li");
            $(LoginPageDiv_SeccondDiv_ul).append(LoginPageDiv_SeccondDiv_ul_li);
            //第三方登录显示a
            var LoginPageDiv_SeccondDiv_ul_li_a = document.createElement("a");
            $(LoginPageDiv_SeccondDiv_ul_li_a).addClass("SeccondHref");
            $(LoginPageDiv_SeccondDiv_ul_li_a).attr("href", "#");
            $(LoginPageDiv_SeccondDiv_ul_li).append(LoginPageDiv_SeccondDiv_ul_li_a);
            //第三方登录显示img1
            var LoginPageDiv_SeccondDiv_ul_li_a_img = document.createElement("img");
            $(LoginPageDiv_SeccondDiv_ul_li_a_img).addClass("SeccondImg");
            $(LoginPageDiv_SeccondDiv_ul_li_a).append(LoginPageDiv_SeccondDiv_ul_li_a_img);
            //第三方登录显示b
            var LoginPageDiv_SeccondDiv_ul_li_a_b = document.createElement("b");
            $(LoginPageDiv_SeccondDiv_ul_li_a_b).addClass("SeccondName");
            $(LoginPageDiv_SeccondDiv_ul_li_a).append(LoginPageDiv_SeccondDiv_ul_li_a_b);
            if (i == 0) {
                $(LoginPageDiv_SeccondDiv_ul_li_a_img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/") + "QQ.gif");
                $(LoginPageDiv_SeccondDiv_ul_li_a_b).text("QQ");
            }
            else if (i == 1) {
                $(LoginPageDiv_SeccondDiv_ul_li_a_img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/") + "BaiDu.jpg");
                $(LoginPageDiv_SeccondDiv_ul_li_a_b).text("百度");
            }
            else if (i == 2) {
                $(LoginPageDiv_SeccondDiv_ul_li_a_img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/") + "XinLang.png");
                $(LoginPageDiv_SeccondDiv_ul_li_a_b).text("新浪微博");
            }
            else if (i == 3) {
                $(LoginPageDiv_SeccondDiv_ul_li_a_img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/") + "ZhiFuBao.jpg");
                $(LoginPageDiv_SeccondDiv_ul_li_a_b).text("支付宝");
            }
            else if (i == 4) {
                $(LoginPageDiv_SeccondDiv_ul_li_a_img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/") + "TaoBao.png");
                $(LoginPageDiv_SeccondDiv_ul_li_a_b).text("淘宝");
            }
        }
    };
    //显示验证码
    FeComponentFrontEndLogin.prototype.ShowCode = function (element) {
        $(element.get("CodeInfo")).show();
        $(element.get("CodeDiv")).show();
    };
    //隐藏验证码
    FeComponentFrontEndLogin.prototype.HideCode = function (element) {
        $(element.get("CodeInfo")).hide();
        $(element.get("CodeDiv")).hide();
    };
    //判断是否显示验证码
    FeComponentFrontEndLogin.prototype.ShowVerifyCode = function (element) {
        var _this = this;
        var Account = $(element.get("AccountText")).val();
        $.ajax({
            url: this.resolveUrl(element, "~/Login/CheckLoginNeedVerifyCode"),
            type: "POST",
            dataType: "json",
            data: {
                userName: Account
            },
            success: function (result) {
                if (result.IsSuccess == false) {
                    if (result.FailCode == "LoginNeedVerifyCode") {
                        _this.ShowCode(element);
                    }
                }
                else {
                    _this.HideCode(element);
                }
            }
        });
    };
    //登录
    FeComponentFrontEndLogin.prototype.Login = function (element) {
        var _this = this;
        if (this.CheckLoginInfo(element, "All") == false) {
            return;
        }
        var Account = $(element.get("AccountText")).val();
        var Password = $(element.get("PasswordText")).val();
        var Code = $(element.get("CodeText")).val();
        var ErrorInfo = $(element.get("ErrorInfo"));
        var SuccessInfo = $(element.get("SuccessInfo"));
        var BtnLogin = $(element.get("BtnLogin"));
        $.ajax({
            url: this.resolveUrl(element, "~/Login/LoginSubmit"),
            type: "POST",
            dataType: "json",
            data: {
                userName: Account,
                password: window["hex_md5"](Password),
                verifycode: Code
            },
            success: function (result) {
                if (result.IsSuccess == false) {
                    if (result.FailCode == "LoginNeedVerifyCode") {
                        _this.ShowCode(element);
                        element.get("VerifyCode")["Refresh"]();
                    }
                    ErrorInfo.text(result.Message);
                    ErrorInfo.show();
                }
                else {
                    SuccessInfo.text("登录成功");
                    SuccessInfo.show();
                    $(BtnLogin).attr("disabled", "false");
                    _this.AfterLoginSuccess(element);
                }
            },
            error: function () {
            }
        });
    };
    FeComponentFrontEndLogin.prototype.AfterLoginSuccess = function (element) {
        if (element.xtag.eventHandlers.AfterLoginSuccess) {
            element.xtag.eventHandlers.AfterLoginSuccess();
        }
    };
    //验证输入框值的正确性
    //element:element对象用于传值
    //checkMode验证模式,AccountText:只验证帐号输入框,PasswordText:只验证密码输入框,All全体验证,此参数用于前台显示错误的一种效果
    FeComponentFrontEndLogin.prototype.CheckLoginInfo = function (element, checkMode) {
        var Account = $(element.get("AccountText")).val();
        var Password = $(element.get("PasswordText")).val();
        var Code = $(element.get("CodeText")).val();
        var ErrorInfo = $(element.get("ErrorInfo"));
        if (Account == "") {
            ErrorInfo.text("请输入用户名");
            ErrorInfo.show();
            return false;
        }
        else {
            if (checkMode == "AccountText") {
                ErrorInfo.hide();
                return true;
            }
        }
        if (Password == "") {
            ErrorInfo.text("请输入密码");
            ErrorInfo.show();
            return false;
        }
        else {
            if (checkMode == "PasswordText") {
                ErrorInfo.hide();
                return true;
            }
        }
        ErrorInfo.hide();
        return true;
    };
    FeComponentFrontEndLogin.prototype.LoadWelCome = function (element, container, LoginName) {
        //欢迎页外部Div
        var WelComeDiv = document.createElement("div");
        $(WelComeDiv).addClass("FrontEndLoginWelCome");
        $(container).append(WelComeDiv);
        //内容Div
        var ContentDiv = document.createElement("div");
        $(ContentDiv).addClass("WelComeContent");
        $(WelComeDiv).append(ContentDiv);
        //打勾图标
        var WelComeDiv_em = document.createElement("em");
        $(WelComeDiv_em).addClass("ImgHook");
        $(ContentDiv).append(WelComeDiv_em);
        //提示信息
        var WelComeDiv_h1 = document.createElement("h1");
        $(WelComeDiv_h1).addClass("Prompt");
        $(WelComeDiv_h1).text("您好！您已经成功登陆！");
        $(ContentDiv).append(WelComeDiv_h1);
        //登录信息
        var WelComeDiv_p = document.createElement("p");
        $(WelComeDiv_p).addClass("Message");
        $(WelComeDiv_p).html("您登陆的用户名为：<b style='color:#c40000;'>" + LoginName + "</b>！");
        $(ContentDiv).append(WelComeDiv_p);
        //按钮Div
        var WelComeDiv_btnDiv = document.createElement("div");
        $(WelComeDiv_btnDiv).addClass("clearfix");
        $(ContentDiv).append(WelComeDiv_btnDiv);
        //第一个按钮
        var WelComeDiv_btnDiv_firstBtn = document.createElement("a");
        $(WelComeDiv_btnDiv_firstBtn).addClass("Btn");
        $(WelComeDiv_btnDiv_firstBtn).addClass("FirstBtn");
        $(WelComeDiv_btnDiv_firstBtn).attr("href", element.gomembercenter);
        $(WelComeDiv_btnDiv_firstBtn).text("进入会员中心");
        $(WelComeDiv_btnDiv).append(WelComeDiv_btnDiv_firstBtn);
        //其他按钮
        var WelComeDiv_btnDiv_otherBtn = document.createElement("a");
        $(WelComeDiv_btnDiv_otherBtn).addClass("Btn");
        $(WelComeDiv_btnDiv_otherBtn).addClass("OtherBtn");
        $(WelComeDiv_btnDiv_otherBtn).attr("href", element.backhomepage);
        $(WelComeDiv_btnDiv_otherBtn).text("返回首页");
        $(WelComeDiv_btnDiv).append(WelComeDiv_btnDiv_otherBtn);
    };
    //构建组件
    FeComponentFrontEndLogin.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentFrontEndLogin;
}(FeTemplateComponentBase));
/*
****属性*****
membertype:会员类型,General:普通会员,Company:企业会员
successislogin:注册成功后是否登录
messagetemplateid:消息验证码模版id
messagesenderid:消息发送器id
****方法****

****事件****
 注册成功后事件
 $("#xxx").feComponentFrontEndRegister("AfterRegisterSuccess", function () {});
*/
var FeComponentFrontEndRegister = (function (_super) {
    __extends(FeComponentFrontEndRegister, _super);
    function FeComponentFrontEndRegister(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("membertype,successislogin,messagetemplateid,messagesenderid");
        return _this;
    }
    FeComponentFrontEndRegister.prototype.defaultOptions = function () {
        var options = {
            membertype: "General",
            successislogin: "true",
            messagetemplateid: "",
            messagesenderid: ""
        };
        return options;
    };
    //设置选项前
    FeComponentFrontEndRegister.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentFrontEndRegister.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentFrontEndRegister.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-FrontEndRegister";
    };
    //获取当前组件是否自动初始化
    FeComponentFrontEndRegister.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentFrontEndRegister.prototype.extendName = function () {
        return "feComponentFrontEndRegister";
    };
    //扩展方法实现
    FeComponentFrontEndRegister.prototype.extendFunction = function (element, method, args) {
        if ("AfterRegisterSuccess" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.AfterRegisterSuccess = args;
        }
    };
    //重新加载
    FeComponentFrontEndRegister.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //组件加载
    FeComponentFrontEndRegister.prototype.loadData = function (element, container) {
        $(container).addClass("FeComponentFrontEndRegister");
        if (element.membertype == "General") {
            this.LoadGeneralMember(element, container);
        }
        else if (element.membertype == "Company") {
            this.LoadCompanyMember(element, container);
        }
        else {
            this.LoadGeneralMember(element, container);
        }
    };
    //普通会员加载
    FeComponentFrontEndRegister.prototype.LoadGeneralMember = function (element, container) {
        var that = this;
        //普通会员加载外部div
        var GeneralDiv = document.createElement("table");
        $(GeneralDiv).addClass("GeneralDiv");
        $(container).append(GeneralDiv);
        //帐号div
        var GeneralDiv_Account = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_Account);
        //左方信息
        var GeneralDiv_Account_LeftInfo = document.createElement("td");
        $(GeneralDiv_Account_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_Account_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;用户名：");
        $(GeneralDiv_Account).append(GeneralDiv_Account_LeftInfo);
        //右方div
        var GeneralDiv_Account_RightInfo = document.createElement("td");
        $(GeneralDiv_Account_RightInfo).addClass("RightInfo");
        $(GeneralDiv_Account).append(GeneralDiv_Account_RightInfo);
        //输入框div
        var GeneralDiv_Account_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_Account_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_Account_RightInfo).append(GeneralDiv_Account_RightInfo_InputDiv);
        //输入框
        var GeneralDiv_Account_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_Account_RightInfo_InputDiv_Input).attr("type", "text");
        $(GeneralDiv_Account_RightInfo_InputDiv_Input).addClass("InputBox");
        $(GeneralDiv_Account_RightInfo_InputDiv).append(GeneralDiv_Account_RightInfo_InputDiv_Input);
        element.set("AccountText", GeneralDiv_Account_RightInfo_InputDiv_Input);
        $(GeneralDiv_Account_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "由4-20位由英文字母、汉字、数字和下划线组成");
        });
        $(GeneralDiv_Account_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckLogin(element);
        });
        //提示信息
        var GeneralDiv_Account_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_Account_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_Account_RightInfo).append(GeneralDiv_Account_RightInfo_Input_PromptInfo);
        //一次密码div
        var GeneralDiv_OnePassword = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_OnePassword);
        //左方信息
        var GeneralDiv_OnePassword_LeftInfo = document.createElement("td");
        $(GeneralDiv_OnePassword_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_OnePassword_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;密码：");
        $(GeneralDiv_OnePassword).append(GeneralDiv_OnePassword_LeftInfo);
        //右方div
        var GeneralDiv_OnePassword_RightInfo = document.createElement("td");
        $(GeneralDiv_OnePassword_RightInfo).addClass("RightInfo");
        $(GeneralDiv_OnePassword).append(GeneralDiv_OnePassword_RightInfo);
        //输入框div
        var GeneralDiv_OnePassword_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_OnePassword_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_OnePassword_RightInfo).append(GeneralDiv_OnePassword_RightInfo_InputDiv);
        //输入框
        var GeneralDiv_OnePassword_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_OnePassword_RightInfo_InputDiv_Input).attr("type", "password");
        $(GeneralDiv_OnePassword_RightInfo_InputDiv_Input).addClass("InputBox");
        $(GeneralDiv_OnePassword_RightInfo_InputDiv).append(GeneralDiv_OnePassword_RightInfo_InputDiv_Input);
        element.set("OnePasswordText", GeneralDiv_OnePassword_RightInfo_InputDiv_Input);
        $(GeneralDiv_OnePassword_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "6-20位字符，可使用字母数字和符号的组合");
        });
        $(GeneralDiv_OnePassword_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckOnePassword(element);
        });
        //提示信息
        var GeneralDiv_OnePassword_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_OnePassword_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_OnePassword_RightInfo).append(GeneralDiv_OnePassword_RightInfo_Input_PromptInfo);
        //二次密码div
        var GeneralDiv_TwoPassword = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_TwoPassword);
        //左方信息
        var GeneralDiv_TwoPassword_LeftInfo = document.createElement("td");
        $(GeneralDiv_TwoPassword_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_TwoPassword_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;确认密码：");
        $(GeneralDiv_TwoPassword).append(GeneralDiv_TwoPassword_LeftInfo);
        //右方div
        var GeneralDiv_TwoPassword_RightInfo = document.createElement("td");
        $(GeneralDiv_TwoPassword_RightInfo).addClass("RightInfo");
        $(GeneralDiv_TwoPassword).append(GeneralDiv_TwoPassword_RightInfo);
        //输入框div
        var GeneralDiv_TwoPassword_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_TwoPassword_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_TwoPassword_RightInfo).append(GeneralDiv_TwoPassword_RightInfo_InputDiv);
        //输入框
        var GeneralDiv_TwoPassword_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_TwoPassword_RightInfo_InputDiv_Input).attr("type", "password");
        $(GeneralDiv_TwoPassword_RightInfo_InputDiv_Input).addClass("InputBox");
        $(GeneralDiv_TwoPassword_RightInfo_InputDiv).append(GeneralDiv_TwoPassword_RightInfo_InputDiv_Input);
        element.set("TwoPasswordText", GeneralDiv_TwoPassword_RightInfo_InputDiv_Input);
        $(GeneralDiv_TwoPassword_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "请再次输入密码");
        });
        $(GeneralDiv_TwoPassword_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckTwoPassword(element);
        });
        //提示信息
        var GeneralDiv_TwoPassword_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_TwoPassword_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_TwoPassword_RightInfo).append(GeneralDiv_TwoPassword_RightInfo_Input_PromptInfo);
        //手机号码div
        var GeneralDiv_Mobile = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_Mobile);
        //左方信息
        var GeneralDiv_Mobile_LeftInfo = document.createElement("td");
        $(GeneralDiv_Mobile_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_Mobile_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;手机号码：");
        $(GeneralDiv_Mobile).append(GeneralDiv_Mobile_LeftInfo);
        //右方div
        var GeneralDiv_Mobile_RightInfo = document.createElement("td");
        $(GeneralDiv_Mobile_RightInfo).addClass("RightInfo");
        $(GeneralDiv_Mobile).append(GeneralDiv_Mobile_RightInfo);
        //输入框div
        var GeneralDiv_Mobile_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_Mobile_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_Mobile_RightInfo).append(GeneralDiv_Mobile_RightInfo_InputDiv);
        //输入框
        var GeneralDiv_Mobile_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_Mobile_RightInfo_InputDiv_Input).attr("type", "text");
        $(GeneralDiv_Mobile_RightInfo_InputDiv_Input).addClass("InputBox");
        $(GeneralDiv_Mobile_RightInfo_InputDiv).append(GeneralDiv_Mobile_RightInfo_InputDiv_Input);
        element.set("MobileText", GeneralDiv_Mobile_RightInfo_InputDiv_Input);
        $(GeneralDiv_Mobile_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "11位手机号");
        });
        $(GeneralDiv_Mobile_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckMobile(element);
        });
        //提示信息
        var GeneralDiv_Mobile_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_Mobile_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_Mobile_RightInfo).append(GeneralDiv_Mobile_RightInfo_Input_PromptInfo);
        //验证码div
        var GeneralDiv_Code = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_Code);
        //左方信息
        var GeneralDiv_Code_LeftInfo = document.createElement("td");
        $(GeneralDiv_Code_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_Code_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;验证码：");
        $(GeneralDiv_Code).append(GeneralDiv_Code_LeftInfo);
        //右方div
        var GeneralDiv_Code_RightInfo = document.createElement("td");
        $(GeneralDiv_Code_RightInfo).addClass("RightInfo");
        $(GeneralDiv_Code).append(GeneralDiv_Code_RightInfo);
        //输入框div
        var GeneralDiv_Code_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_Code_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_Code_RightInfo).append(GeneralDiv_Code_RightInfo_InputDiv);
        //输入框
        var GeneralDiv_Code_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_Code_RightInfo_InputDiv_Input).attr("type", "text");
        $(GeneralDiv_Code_RightInfo_InputDiv_Input).addClass("CodeBox");
        $(GeneralDiv_Code_RightInfo_InputDiv).append(GeneralDiv_Code_RightInfo_InputDiv_Input);
        element.set("CodeText", GeneralDiv_Code_RightInfo_InputDiv_Input);
        $(GeneralDiv_Code_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "输入图中的4位验证码");
        });
        $(GeneralDiv_Code_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckCode(element);
        });
        //验证码图片
        var GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv = document.createElement("div");
        $(GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv).addClass("CodeImg");
        $(GeneralDiv_Code_RightInfo_InputDiv).append(GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv);
        //创建验证码组件
        var GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code = document.createElement("Gf-VerifyCode");
        GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["imgwidth"] = "60";
        GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["imgheight"] = "30";
        var CodeKey = this.GetUniqueId("CodeKey");
        GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["codekey"] = CodeKey;
        $(GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv).append(GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code);
        GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["init"]();
        //验证码刷新
        var GeneralDiv_Code_RightInfo_InputDiv_a = document.createElement("a");
        $(GeneralDiv_Code_RightInfo_InputDiv_a).text("换一张");
        $(GeneralDiv_Code_RightInfo_InputDiv_a).addClass("Refresh");
        $(GeneralDiv_Code_RightInfo_InputDiv).append(GeneralDiv_Code_RightInfo_InputDiv_a);
        $(GeneralDiv_Code_RightInfo_InputDiv_a).click(function () {
            GeneralDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["Refresh"]();
        });
        //提示信息
        var GeneralDiv_Code_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_Code_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_Code_RightInfo).append(GeneralDiv_Code_RightInfo_Input_PromptInfo);
        //手机验证码div
        var GeneralDiv_MobileCode = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_MobileCode);
        //左方信息
        var GeneralDiv_MobileCode_LeftInfo = document.createElement("td");
        $(GeneralDiv_MobileCode_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_MobileCode_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;手机验证码：");
        $(GeneralDiv_MobileCode).append(GeneralDiv_MobileCode_LeftInfo);
        //右方div
        var GeneralDiv_MobileCode_RightInfo = document.createElement("td");
        $(GeneralDiv_MobileCode_RightInfo).addClass("RightInfo");
        $(GeneralDiv_MobileCode).append(GeneralDiv_MobileCode_RightInfo);
        //输入框div
        var GeneralDiv_MobileCode_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_MobileCode_RightInfo).append(GeneralDiv_MobileCode_RightInfo_InputDiv);
        //输入框
        var GeneralDiv_MobileCode_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_Input).attr("type", "text");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_Input).addClass("CodeBox");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv).append(GeneralDiv_MobileCode_RightInfo_InputDiv_Input);
        element.set("MobileCodeText", GeneralDiv_MobileCode_RightInfo_InputDiv_Input);
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "输入手机收到的验证码");
        });
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckMobileCode(element);
        });
        //短信验证码按钮div
        var GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv = document.createElement("div");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv).addClass("CodeBtn");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv).append(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv);
        //短信验证码按钮
        var GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn = document.createElement("Gf-MessageCode");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("messagetemplateid", element.messagetemplateid);
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("messagesenderid", element.messagesenderid);
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("width", "142px");
        var SmsCodeKey = this.GetUniqueId("SmsCode");
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("codekey", SmsCodeKey);
        element.set("Gf-MessageCode", GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn);
        $(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv).append(GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn);
        GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn["init"]();
        GeneralDiv_MobileCode_RightInfo_InputDiv_SendBtn["registerEventHandler"]("BeforeSendMessage", function () {
            if (!that.CheckMobile(element)) {
                return;
            }
        });
        //提示信息
        var GeneralDiv_MobileCode_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_MobileCode_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_MobileCode_RightInfo).append(GeneralDiv_MobileCode_RightInfo_Input_PromptInfo);
        //用户协议div
        var GeneralDiv_Agreement = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_Agreement);
        //左方信息
        var GeneralDiv_Agreement_LeftInfo = document.createElement("td");
        $(GeneralDiv_Agreement_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_Agreement_LeftInfo).text("");
        $(GeneralDiv_Agreement).append(GeneralDiv_Agreement_LeftInfo);
        //右方div
        var GeneralDiv_Agreement_RightInfo = document.createElement("td");
        $(GeneralDiv_Agreement_RightInfo).addClass("RightInfo");
        $(GeneralDiv_Agreement).append(GeneralDiv_Agreement_RightInfo);
        //输入框div
        var GeneralDiv_Agreement_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_Agreement_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_Agreement_RightInfo).append(GeneralDiv_Agreement_RightInfo_InputDiv);
        //选择框span
        var GeneralDiv_Agreement_RightInfo_InputDiv_Span = document.createElement("span");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_Span).addClass("CheckBoxSpan");
        $(GeneralDiv_Agreement_RightInfo_InputDiv).append(GeneralDiv_Agreement_RightInfo_InputDiv_Span);
        //选择框
        var GeneralDiv_Agreement_RightInfo_InputDiv_Input = document.createElement("input");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_Input).attr("type", "checkbox");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_Input).attr("checked", "checked");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_Input).addClass("CheckBox");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_Span).append(GeneralDiv_Agreement_RightInfo_InputDiv_Input);
        element.set("AgreeMentText", GeneralDiv_Agreement_RightInfo_InputDiv_Input);
        $(GeneralDiv_Agreement_RightInfo_InputDiv_Input).change(function (e) {
            that.CheckAgreement(element);
        });
        //信息
        var GeneralDiv_Agreement_RightInfo_InputDiv_b = document.createElement("b");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_b).text("我已看过并接受");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_b).addClass("Agree");
        $(GeneralDiv_Agreement_RightInfo_InputDiv).append(GeneralDiv_Agreement_RightInfo_InputDiv_b);
        //注册协议
        var GeneralDiv_Agreement_RightInfo_InputDiv_a = document.createElement("a");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_a).text("《用户注册协议》");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_a).attr("href", "#");
        $(GeneralDiv_Agreement_RightInfo_InputDiv_a).addClass("Agreement");
        $(GeneralDiv_Agreement_RightInfo_InputDiv).append(GeneralDiv_Agreement_RightInfo_InputDiv_a);
        //提示信息
        var GeneralDiv_Agreement_RightInfo_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_Agreement_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_Agreement_RightInfo).append(GeneralDiv_Agreement_RightInfo_Input_PromptInfo);
        //按钮Div
        var GeneralDiv_Btn = document.createElement("tr");
        $(GeneralDiv).append(GeneralDiv_Btn);
        //左方信息
        var GeneralDiv_Btn_LeftInfo = document.createElement("td");
        $(GeneralDiv_Btn_LeftInfo).addClass("LeftInfo");
        $(GeneralDiv_Btn_LeftInfo).text("");
        $(GeneralDiv_Btn).append(GeneralDiv_Btn_LeftInfo);
        //右方div
        var GeneralDiv_Btn_RightInfo = document.createElement("td");
        $(GeneralDiv_Btn_RightInfo).addClass("RightInfo");
        $(GeneralDiv_Btn).append(GeneralDiv_Btn_RightInfo);
        //输入框div
        var GeneralDiv_Btn_RightInfo_InputDiv = document.createElement("div");
        $(GeneralDiv_Btn_RightInfo_InputDiv).addClass("RightInput");
        $(GeneralDiv_Btn_RightInfo).append(GeneralDiv_Btn_RightInfo_InputDiv);
        //注册按钮
        var GeneralDiv_Btn_RightInfo_InputDiv_Input = document.createElement("a");
        $(GeneralDiv_Btn_RightInfo_InputDiv_Input).text("注册");
        $(GeneralDiv_Btn_RightInfo_InputDiv_Input).addClass("RegBtn");
        $(GeneralDiv_Btn_RightInfo_InputDiv).append(GeneralDiv_Btn_RightInfo_InputDiv_Input);
        element.set("RegisterBtn", GeneralDiv_Btn_RightInfo_InputDiv_Input);
        $(GeneralDiv_Btn_RightInfo_InputDiv_Input).click(function (e) {
            that.RegisterGeneralMemberClick(element, CodeKey, SmsCodeKey);
        });
        //绑定回车事件
        $(document).keydown(function (event) {
            if (event.keyCode == 13) {
                //触发登录按钮
                $(GeneralDiv_Btn_RightInfo_InputDiv_Input).click();
            }
        });
        //提示信息
        var GeneralDiv_Btn_RightInfo_InputDiv_Input_PromptInfo = document.createElement("div");
        $(GeneralDiv_Btn_RightInfo_InputDiv_Input_PromptInfo).addClass("ShowInfo");
        $(GeneralDiv_Btn_RightInfo).append(GeneralDiv_Btn_RightInfo_InputDiv_Input_PromptInfo);
    };
    //验证用户名
    FeComponentFrontEndRegister.prototype.CheckLogin = function (element) {
        var _this = this;
        var AccountText = element.get("AccountText");
        var TextValue = $(AccountText).val();
        if (TextValue == "") {
            this.ErrorTips(AccountText, "用户名不能为空");
            return false;
        }
        var check = false;
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndRegister/CheckUserName"),
            type: "POST",
            dataType: "json",
            async: false,
            data: {
                userName: TextValue
            },
            success: function (result) {
                if (result.IsRegister == "true") {
                    _this.SuccessTips(AccountText, "用户名可以使用");
                    check = true;
                }
                else {
                    _this.ErrorTips(AccountText, result.Message);
                    check = false;
                }
            },
            error: function () {
                _this.ErrorTips(AccountText, "系统错误");
                check = false;
            }
        });
        return check;
    };
    //验证密码
    FeComponentFrontEndRegister.prototype.CheckOnePassword = function (element) {
        var _this = this;
        var OnePasswordText = element.get("OnePasswordText");
        var TextValue = $(OnePasswordText).val();
        if (TextValue == "") {
            this.ErrorTips(OnePasswordText, "密码不能为空");
            return false;
        }
        var weakPwdArray = "123456123456789111111520131412345678123123password";
        if (weakPwdArray.indexOf(TextValue) != -1) {
            this.ErrorTips(OnePasswordText, "该密码比较简单，有被盗风险，建议您更改为复杂密码");
            return false;
        }
        var check = false;
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndRegister/CheckLoginPassword"),
            type: "POST",
            dataType: "json",
            async: false,
            data: {
                Password: TextValue
            },
            success: function (result) {
                if (result.IsRegister == "true") {
                    _this.SuccessTips(OnePasswordText, "密码正确");
                    check = true;
                }
                else {
                    _this.ErrorTips(OnePasswordText, result.Message);
                    check = false;
                }
            },
            error: function () {
                _this.ErrorTips(OnePasswordText, "系统错误");
                check = false;
            }
        });
        return check;
    };
    //验证确认密码
    FeComponentFrontEndRegister.prototype.CheckTwoPassword = function (element) {
        var TwoPasswordText = element.get("TwoPasswordText");
        var TextValue = $(TwoPasswordText).val();
        if (TextValue == "") {
            this.ErrorTips(TwoPasswordText, "确认密码不能为空");
            return false;
        }
        var OnePasswordText = element.get("OnePasswordText");
        var TextValue1 = $(OnePasswordText).val();
        if (TextValue != TextValue1) {
            this.ErrorTips(TwoPasswordText, "两次密码不一致");
            return false;
        }
        this.SuccessTips(TwoPasswordText, "确认密码正确");
        return true;
    };
    //验证手机号
    FeComponentFrontEndRegister.prototype.CheckMobile = function (element) {
        var _this = this;
        var MobileText = element.get("MobileText");
        var TextValue = $(MobileText).val();
        if (TextValue == "") {
            this.ErrorTips(MobileText, "手机号不能为空");
            return false;
        }
        var check = false;
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndRegister/CheckLoginMobile"),
            type: "POST",
            dataType: "json",
            async: false,
            data: {
                Mobile: TextValue
            },
            success: function (result) {
                if (result.IsRegister == "true") {
                    _this.SuccessTips(MobileText, "手机号可以使用");
                    var GfMessageCode = element.get("Gf-MessageCode");
                    $(GfMessageCode).attr("accounts", TextValue);
                    check = true;
                }
                else {
                    _this.ErrorTips(MobileText, result.Message);
                    check = false;
                }
            },
            error: function () {
                _this.ErrorTips(MobileText, "系统错误");
                check = false;
            }
        });
        return check;
    };
    //验证验证码
    FeComponentFrontEndRegister.prototype.CheckCode = function (element) {
        var CodeText = element.get("CodeText");
        var TextValue = $(CodeText).val();
        if (TextValue == "") {
            this.ErrorTips(CodeText, "验证码不能为空");
            return false;
        }
        this.HideTips(CodeText);
        return true;
    };
    //验证手机验证码
    FeComponentFrontEndRegister.prototype.CheckMobileCode = function (element) {
        var MobileCodeText = element.get("MobileCodeText");
        var TextValue = $(MobileCodeText).val();
        if (TextValue == "") {
            this.ErrorTips(MobileCodeText, "手机验证码不能为空");
            return false;
        }
        this.HideTips(MobileCodeText);
        return true;
    };
    //验证注册协议
    FeComponentFrontEndRegister.prototype.CheckAgreement = function (element) {
        var AgreeMentText = element.get("AgreeMentText");
        var TextBox = $(AgreeMentText).is(':checked');
        if (TextBox != true) {
            this.ErrorTips($(AgreeMentText).parent(), "未接受用户协议");
            return false;
        }
        this.SuccessTips($(AgreeMentText).parent(), "确认接受协议");
        return true;
    };
    //验证公司名称
    FeComponentFrontEndRegister.prototype.CheckCompanyName = function (element) {
        var CompanyNameText = element.get("CompanyNameText");
        var TextValue = $(CompanyNameText).val();
        if (TextValue == "") {
            this.ErrorTips(CompanyNameText, "公司名称不能为空");
            return false;
        }
        this.SuccessTips(CompanyNameText, "公司名称正确");
        return true;
    };
    FeComponentFrontEndRegister.prototype.CheckContactsName = function (element) {
        var ContactsNameText = element.get("ContactsNameText");
        var TextValue = $(ContactsNameText).val();
        if (TextValue == "") {
            this.ErrorTips(ContactsNameText, "联系人姓名不能为空");
            return false;
        }
        this.SuccessTips(ContactsNameText, "联系人姓名正确");
        return true;
    };
    //企业会员注册
    FeComponentFrontEndRegister.prototype.RegisterComPanyMemberClick = function (element, CodeKey, SmsCodeKey) {
        var _this = this;
        if (this.CheckLogin(element) && this.CheckOnePassword(element) && this.CheckTwoPassword(element) && this.CheckMobile(element) && this.CheckCode(element) && this.CheckMobileCode(element) && this.CheckAgreement(element) && this.CheckCompanyName(element)) {
            var RegisterBtn = element.get("RegisterBtn");
            var AccountText = $(element.get("AccountText")).val();
            var OnePasswordText = $(element.get("OnePasswordText")).val();
            var TwoPasswordText = $(element.get("TwoPasswordText")).val();
            var MobileText = $(element.get("MobileText")).val();
            var OrganizationName = $(element.get("CompanyNameText")).val();
            var OrganizationLocation = $(element.get("CompanyPositionText")).attr("value");
            var OrganizationAddress = $(element.get("CompanyAdressText")).val();
            var OrganizationScale = element.get("CompanyPeopleNumberText").getValue();
            var OrganizationIndustry = element.get("CompanyIndustryText").getValue();
            var OrganizationNature = element.get("CompanyNatureText").getValue();
            var ContactFirstName = $(element.get("ContactsNameText")).val();
            var ContactEmail = $(element.get("ContactsEmailText")).val();
            var ContactTelephone = $(element.get("ContactsTelephoneText")).val();
            var ContactCellphone = $(element.get("MobileText")).val();
            var CodeText = $(element.get("CodeText")).val();
            var SmsCodeText = $(element.get("MobileCodeText")).val();
            var Model = {
                UserName: AccountText,
                Password: OnePasswordText,
                PasswordConfirm: TwoPasswordText,
                Cell: MobileText,
                OrganizationName: OrganizationName,
                OrganizationLocation: OrganizationLocation,
                OrganizationAddress: OrganizationAddress,
                OrganizationScale: OrganizationScale,
                OrganizationIndustry: OrganizationIndustry,
                OrganizationNature: OrganizationNature,
                ContactFirstName: ContactFirstName,
                ContactEmail: ContactEmail,
                ContactTelephone: ContactTelephone,
                ContactCellphone: ContactCellphone
            };
            $.ajax({
                url: this.resolveUrl(element, "~/FrontEndRegister/RegisterComPanyMember"),
                type: "POST",
                dataType: "json",
                async: false,
                data: {
                    Model: Model,
                    Code: CodeText,
                    CodeKey: CodeKey,
                    MessageCode: SmsCodeText,
                    MessageCodeKey: SmsCodeKey
                },
                success: function (result) {
                    if (result.IsRegister == "true") {
                        _this.SuccessTips(RegisterBtn, "注册成功");
                        if (element.successislogin == "true") {
                            //注册登录
                            _this.Login(element, AccountText, OnePasswordText);
                        }
                        if (element.xtag.eventHandlers.AfterRegisterSuccess) {
                            element.xtag.eventHandlers.AfterRegisterSuccess();
                        }
                    }
                    else {
                        _this.ErrorTips(RegisterBtn, result.Message);
                    }
                },
                error: function () {
                    _this.ErrorTips(RegisterBtn, "系统错误");
                }
            });
        }
    };
    //个人会员注册
    FeComponentFrontEndRegister.prototype.RegisterGeneralMemberClick = function (element, CodeKey, SmsCodeKey) {
        var _this = this;
        if (this.CheckLogin(element) && this.CheckOnePassword(element) && this.CheckTwoPassword(element) && this.CheckMobile(element) && this.CheckCode(element) && this.CheckMobileCode(element) && this.CheckAgreement(element)) {
            var RegisterBtn = element.get("RegisterBtn");
            var AccountText = $(element.get("AccountText")).val();
            var OnePasswordText = $(element.get("OnePasswordText")).val();
            var TwoPasswordText = $(element.get("TwoPasswordText")).val();
            var MobileText = $(element.get("MobileText")).val();
            var CodeText = $(element.get("CodeText")).val();
            var SmsCodeText = $(element.get("MobileCodeText")).val();
            var Model = { UserName: AccountText, Password: OnePasswordText, PasswordConfirm: TwoPasswordText, Cell: MobileText };
            $.ajax({
                url: this.resolveUrl(element, "~/FrontEndRegister/RegisterGeneralMember"),
                type: "POST",
                dataType: "json",
                async: false,
                data: {
                    Model: Model,
                    Code: CodeText,
                    CodeKey: CodeKey,
                    MessageCode: SmsCodeText,
                    MessageCodeKey: SmsCodeKey
                },
                success: function (result) {
                    if (result.IsRegister == "true") {
                        _this.SuccessTips(RegisterBtn, "注册成功");
                        if (element.successislogin == "true") {
                            //注册登录
                            _this.Login(element, AccountText, OnePasswordText);
                        }
                        if (element.xtag.eventHandlers.AfterRegisterSuccess) {
                            element.xtag.eventHandlers.AfterRegisterSuccess();
                        }
                    }
                    else {
                        _this.ErrorTips(RegisterBtn, result.Message);
                    }
                },
                error: function () {
                    _this.ErrorTips(RegisterBtn, "系统错误");
                }
            });
        }
    };
    FeComponentFrontEndRegister.prototype.Login = function (element, loginName, password) {
        if ($("head")[0].innerHTML.indexOf(document.body["apppath"] + "/Platform/Content/Scripts/MD5.js") === -1) {
            this.includeJS(document.body["apppath"] + "/Platform/Content/Scripts/MD5.js");
        }
        $.ajax({
            url: this.resolveUrl(element, "~/Login/LoginSubmit"),
            type: "POST",
            dataType: "json",
            async: false,
            data: {
                userName: loginName,
                password: window["hex_md5"](password)
            },
            success: function (result) {
            },
            error: function () {
                $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "登录失败", position: 'bottomRight' });
            }
        });
    };
    //焦点取消提示信息()
    FeComponentFrontEndRegister.prototype.HideTips = function (textBox) {
        $(textBox).css("border-color", "");
        var html = "";
        $(textBox).parent().siblings(".ShowInfo").html(html);
    };
    //焦点提示信息
    FeComponentFrontEndRegister.prototype.ShowTips = function (textBox, content) {
        $(textBox).css("border-color", "#46a7e6");
        var html = "";
        html += "<em class='RemindImg'></em>";
        html += "<span class='RemindText'>" + content + "</span>";
        $(textBox).parent().siblings(".ShowInfo").html(html);
    };
    //焦点警告信息
    FeComponentFrontEndRegister.prototype.ErrorTips = function (textBox, content) {
        $(textBox).css("border-color", "#e64547");
        var html = "";
        html += "<em class='ErrorImg'></em>";
        html += "<span class='RemindText'>" + content + "</span>";
        $(textBox).parent().siblings(".ShowInfo").html(html);
    };
    //焦点成功信息
    FeComponentFrontEndRegister.prototype.SuccessTips = function (textBox, content) {
        $(textBox).css("border-color", "");
        var html = "";
        html += "<em class='SuccessImg'></em>";
        html += "<span class='SuccessText'>" + content + "</span>";
        $(textBox).parent().siblings(".ShowInfo").html(html);
    };
    //企业会员加载
    FeComponentFrontEndRegister.prototype.LoadCompanyMember = function (element, container) {
        var that = this;
        var CompanyDiv = document.createElement("div");
        $(CompanyDiv).addClass("CompanyDiv");
        $(container).append(CompanyDiv);
        ;
        //账户信息下划线
        var CompanyDiv_AccountUnderline = document.createElement("div");
        $(CompanyDiv_AccountUnderline).addClass("UnderlineDiv");
        $(CompanyDiv).append(CompanyDiv_AccountUnderline);
        //下划线图片
        var CompanyDiv_AccountUnderline_Img = document.createElement("div");
        $(CompanyDiv_AccountUnderline_Img).addClass("UnderlineImg");
        $(CompanyDiv_AccountUnderline).append(CompanyDiv_AccountUnderline_Img);
        //账户信息
        var CompanyDiv_AccountUnderline_a = document.createElement("div");
        $(CompanyDiv_AccountUnderline_a).text("账户信息");
        $(CompanyDiv_AccountUnderline_a).addClass("Content");
        $(CompanyDiv_AccountUnderline).append(CompanyDiv_AccountUnderline_a);
        //账户Table
        var CompanyDiv_AccountTable = document.createElement("table");
        $(CompanyDiv_AccountTable).addClass("CompanyTable");
        $(CompanyDiv).append(CompanyDiv_AccountTable);
        //帐号div
        var CompanyDiv_Account = document.createElement("tr");
        $(CompanyDiv_AccountTable).append(CompanyDiv_Account);
        //左方信息
        var CompanyDiv_Account_LeftInfo = document.createElement("td");
        $(CompanyDiv_Account_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_Account_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;用户名：");
        $(CompanyDiv_Account).append(CompanyDiv_Account_LeftInfo);
        //右方div
        var CompanyDiv_Account_RightInfo = document.createElement("td");
        $(CompanyDiv_Account_RightInfo).addClass("RightInfo");
        $(CompanyDiv_Account).append(CompanyDiv_Account_RightInfo);
        //输入框div
        var CompanyDiv_Account_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_Account_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_Account_RightInfo).append(CompanyDiv_Account_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_Account_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_Account_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_Account_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_Account_RightInfo_InputDiv).append(CompanyDiv_Account_RightInfo_InputDiv_Input);
        element.set("AccountText", CompanyDiv_Account_RightInfo_InputDiv_Input);
        $(CompanyDiv_Account_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "由4-20位由英文字母、汉字、数字和下划线组成");
        });
        $(CompanyDiv_Account_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckLogin(element);
        });
        //提示信息
        var CompanyDiv_Account_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_Account_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_Account_RightInfo).append(CompanyDiv_Account_RightInfo_Input_PromptInfo);
        //一次密码div
        var CompanyDiv_OnePassword = document.createElement("tr");
        $(CompanyDiv_AccountTable).append(CompanyDiv_OnePassword);
        //左方信息
        var CompanyDiv_OnePassword_LeftInfo = document.createElement("td");
        $(CompanyDiv_OnePassword_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_OnePassword_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;密码：");
        $(CompanyDiv_OnePassword).append(CompanyDiv_OnePassword_LeftInfo);
        //右方div
        var CompanyDiv_OnePassword_RightInfo = document.createElement("td");
        $(CompanyDiv_OnePassword_RightInfo).addClass("RightInfo");
        $(CompanyDiv_OnePassword).append(CompanyDiv_OnePassword_RightInfo);
        //输入框div
        var CompanyDiv_OnePassword_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_OnePassword_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_OnePassword_RightInfo).append(CompanyDiv_OnePassword_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_OnePassword_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_OnePassword_RightInfo_InputDiv_Input).attr("type", "password");
        $(CompanyDiv_OnePassword_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_OnePassword_RightInfo_InputDiv).append(CompanyDiv_OnePassword_RightInfo_InputDiv_Input);
        element.set("OnePasswordText", CompanyDiv_OnePassword_RightInfo_InputDiv_Input);
        $(CompanyDiv_OnePassword_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "6-20位字符，可使用字母数字和符号的组合");
        });
        $(CompanyDiv_OnePassword_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckOnePassword(element);
        });
        //提示信息
        var CompanyDiv_OnePassword_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_OnePassword_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_OnePassword_RightInfo).append(CompanyDiv_OnePassword_RightInfo_Input_PromptInfo);
        //二次密码div
        var CompanyDiv_TwoPassword = document.createElement("tr");
        $(CompanyDiv_AccountTable).append(CompanyDiv_TwoPassword);
        //左方信息
        var CompanyDiv_TwoPassword_LeftInfo = document.createElement("td");
        $(CompanyDiv_TwoPassword_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_TwoPassword_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;确认密码：");
        $(CompanyDiv_TwoPassword).append(CompanyDiv_TwoPassword_LeftInfo);
        //右方div
        var CompanyDiv_TwoPassword_RightInfo = document.createElement("td");
        $(CompanyDiv_TwoPassword_RightInfo).addClass("RightInfo");
        $(CompanyDiv_TwoPassword).append(CompanyDiv_TwoPassword_RightInfo);
        //输入框div
        var CompanyDiv_TwoPassword_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_TwoPassword_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_TwoPassword_RightInfo).append(CompanyDiv_TwoPassword_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_TwoPassword_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_TwoPassword_RightInfo_InputDiv_Input).attr("type", "password");
        $(CompanyDiv_TwoPassword_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_TwoPassword_RightInfo_InputDiv).append(CompanyDiv_TwoPassword_RightInfo_InputDiv_Input);
        element.set("TwoPasswordText", CompanyDiv_TwoPassword_RightInfo_InputDiv_Input);
        $(CompanyDiv_TwoPassword_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "请再次输入密码");
        });
        $(CompanyDiv_TwoPassword_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckTwoPassword(element);
        });
        //提示信息
        var CompanyDiv_TwoPassword_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_TwoPassword_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_TwoPassword_RightInfo).append(CompanyDiv_TwoPassword_RightInfo_Input_PromptInfo);
        //公司信息下划线
        var CompanyDiv_CompanyUnderline = document.createElement("div");
        $(CompanyDiv_CompanyUnderline).addClass("UnderlineDiv");
        $(CompanyDiv).append(CompanyDiv_CompanyUnderline);
        //下划线图片
        var CompanyDiv_CompanyUnderline_Img = document.createElement("div");
        $(CompanyDiv_CompanyUnderline_Img).addClass("UnderlineImg");
        $(CompanyDiv_CompanyUnderline).append(CompanyDiv_CompanyUnderline_Img);
        //公司信息
        var CompanyDiv_CompanyUnderline_a = document.createElement("div");
        $(CompanyDiv_CompanyUnderline_a).text("公司信息");
        $(CompanyDiv_CompanyUnderline_a).addClass("Content");
        $(CompanyDiv_CompanyUnderline).append(CompanyDiv_CompanyUnderline_a);
        //公司信息Table
        var CompanyDiv_CompanyTable = document.createElement("table");
        $(CompanyDiv_CompanyTable).addClass("CompanyTable");
        $(CompanyDiv).append(CompanyDiv_CompanyTable);
        //公司名称div
        var CompanyDiv_CompanyName = document.createElement("tr");
        $(CompanyDiv_CompanyTable).append(CompanyDiv_CompanyName);
        //左方信息
        var CompanyDiv_CompanyName_LeftInfo = document.createElement("td");
        $(CompanyDiv_CompanyName_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_CompanyName_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;公司名称：");
        $(CompanyDiv_CompanyName).append(CompanyDiv_CompanyName_LeftInfo);
        //右方div
        var CompanyDiv_CompanyName_RightInfo = document.createElement("td");
        $(CompanyDiv_CompanyName_RightInfo).addClass("RightInfo");
        $(CompanyDiv_CompanyName).append(CompanyDiv_CompanyName_RightInfo);
        //输入框div
        var CompanyDiv_CompanyName_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_CompanyName_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_CompanyName_RightInfo).append(CompanyDiv_CompanyName_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_CompanyName_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_CompanyName_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_CompanyName_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_CompanyName_RightInfo_InputDiv).append(CompanyDiv_CompanyName_RightInfo_InputDiv_Input);
        element.set("CompanyNameText", CompanyDiv_CompanyName_RightInfo_InputDiv_Input);
        $(CompanyDiv_CompanyName_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "请填写公司名称");
        });
        $(CompanyDiv_CompanyName_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckCompanyName(element);
        });
        //提示信息
        var CompanyDiv_CompanyName_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_CompanyName_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_CompanyName_RightInfo).append(CompanyDiv_CompanyName_RightInfo_Input_PromptInfo);
        //公司地址div
        var CompanyDiv_CompanyAdress = document.createElement("tr");
        $(CompanyDiv_CompanyTable).append(CompanyDiv_CompanyAdress);
        //左方信息
        var CompanyDiv_CompanyAdress_LeftInfo = document.createElement("td");
        $(CompanyDiv_CompanyAdress_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_CompanyAdress_LeftInfo).text("公司地址：");
        $(CompanyDiv_CompanyAdress).append(CompanyDiv_CompanyAdress_LeftInfo);
        //右方div
        var CompanyDiv_CompanyAdress_RightInfo = document.createElement("td");
        $(CompanyDiv_CompanyAdress_RightInfo).addClass("RightInfo");
        $(CompanyDiv_CompanyAdress).append(CompanyDiv_CompanyAdress_RightInfo);
        //输入框div
        var CompanyDiv_CompanyAdress_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_CompanyAdress_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_CompanyAdress_RightInfo).append(CompanyDiv_CompanyAdress_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_CompanyAdress_RightInfo_InputDiv).append(CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input);
        element.set("CompanyAdressText", CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input);
        $(CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "请填写公司地址");
        });
        $(CompanyDiv_CompanyAdress_RightInfo_InputDiv_Input).blur(function (e) {
            that.HideTips(e.target);
        });
        //提示信息
        var CompanyDiv_CompanyAdress_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_CompanyAdress_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_CompanyAdress_RightInfo).append(CompanyDiv_CompanyAdress_RightInfo_Input_PromptInfo);
        //加载公司人数,公司行业,公司性质组件
        this.LoadListValueFromCompany(element, CompanyDiv_CompanyTable);
        //联系人信息下划线
        var CompanyDiv_ContactsUnderline = document.createElement("div");
        $(CompanyDiv_ContactsUnderline).addClass("UnderlineDiv");
        $(CompanyDiv).append(CompanyDiv_ContactsUnderline);
        //下划线图片
        var CompanyDiv_ContactsUnderline_Img = document.createElement("div");
        $(CompanyDiv_ContactsUnderline_Img).addClass("UnderlineImg");
        $(CompanyDiv_ContactsUnderline).append(CompanyDiv_ContactsUnderline_Img);
        //联系信息
        var CompanyDiv_ContactsUnderline_a = document.createElement("div");
        $(CompanyDiv_ContactsUnderline_a).text("联系信息");
        $(CompanyDiv_ContactsUnderline_a).addClass("Content");
        $(CompanyDiv_ContactsUnderline).append(CompanyDiv_ContactsUnderline_a);
        //联系人信息Table
        var CompanyDiv_ContactsTable = document.createElement("table");
        $(CompanyDiv_ContactsTable).addClass("CompanyTable");
        $(CompanyDiv).append(CompanyDiv_ContactsTable);
        //联系人姓名div
        var CompanyDiv_ContactsName = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_ContactsName);
        //左方信息
        var CompanyDiv_ContactsName_LeftInfo = document.createElement("td");
        $(CompanyDiv_ContactsName_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_ContactsName_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;联系人姓名：");
        $(CompanyDiv_ContactsName).append(CompanyDiv_ContactsName_LeftInfo);
        //右方div
        var CompanyDiv_ContactsName_RightInfo = document.createElement("td");
        $(CompanyDiv_ContactsName_RightInfo).addClass("RightInfo");
        $(CompanyDiv_ContactsName).append(CompanyDiv_ContactsName_RightInfo);
        //输入框div
        var CompanyDiv_ContactsName_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_ContactsName_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_ContactsName_RightInfo).append(CompanyDiv_ContactsName_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_ContactsName_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_ContactsName_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_ContactsName_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_ContactsName_RightInfo_InputDiv).append(CompanyDiv_ContactsName_RightInfo_InputDiv_Input);
        element.set("ContactsNameText", CompanyDiv_ContactsName_RightInfo_InputDiv_Input);
        $(CompanyDiv_ContactsName_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "联系人姓名");
        });
        $(CompanyDiv_ContactsName_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckContactsName(element);
        });
        //提示信息
        var CompanyDiv_ContactsName_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_ContactsName_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_ContactsName_RightInfo).append(CompanyDiv_ContactsName_RightInfo_Input_PromptInfo);
        //联系人邮箱div
        var CompanyDiv_ContactsEmail = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_ContactsEmail);
        //左方信息
        var CompanyDiv_ContactsEmail_LeftInfo = document.createElement("td");
        $(CompanyDiv_ContactsEmail_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_ContactsEmail_LeftInfo).text("联系人邮箱：");
        $(CompanyDiv_ContactsEmail).append(CompanyDiv_ContactsEmail_LeftInfo);
        //右方div
        var CompanyDiv_ContactsEmail_RightInfo = document.createElement("td");
        $(CompanyDiv_ContactsEmail_RightInfo).addClass("RightInfo");
        $(CompanyDiv_ContactsEmail).append(CompanyDiv_ContactsEmail_RightInfo);
        //输入框div
        var CompanyDiv_ContactsEmail_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_ContactsEmail_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_ContactsEmail_RightInfo).append(CompanyDiv_ContactsEmail_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_ContactsEmail_RightInfo_InputDiv).append(CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input);
        element.set("ContactsEmailText", CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input);
        $(CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "联系人邮箱");
        });
        $(CompanyDiv_ContactsEmail_RightInfo_InputDiv_Input).blur(function (e) {
            that.HideTips(e.target);
        });
        //提示信息
        var CompanyDiv_ContactsEmail_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_ContactsEmail_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_ContactsEmail_RightInfo).append(CompanyDiv_ContactsEmail_RightInfo_Input_PromptInfo);
        //联系人固定电话div
        var CompanyDiv_ContactsTelephone = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_ContactsTelephone);
        //左方信息
        var CompanyDiv_ContactsTelephone_LeftInfo = document.createElement("td");
        $(CompanyDiv_ContactsTelephone_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_ContactsTelephone_LeftInfo).text("固定电话：");
        $(CompanyDiv_ContactsTelephone).append(CompanyDiv_ContactsTelephone_LeftInfo);
        //右方div
        var CompanyDiv_ContactsTelephone_RightInfo = document.createElement("td");
        $(CompanyDiv_ContactsTelephone_RightInfo).addClass("RightInfo");
        $(CompanyDiv_ContactsTelephone).append(CompanyDiv_ContactsTelephone_RightInfo);
        //输入框div
        var CompanyDiv_ContactsTelephone_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_ContactsTelephone_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_ContactsTelephone_RightInfo).append(CompanyDiv_ContactsTelephone_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_ContactsTelephone_RightInfo_InputDiv).append(CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input);
        element.set("ContactsTelephoneText", CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input);
        $(CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "固定电话");
        });
        $(CompanyDiv_ContactsTelephone_RightInfo_InputDiv_Input).blur(function (e) {
            that.HideTips(e.target);
        });
        //提示信息
        var CompanyDiv_ContactsTelephone_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_ContactsTelephone_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_ContactsTelephone_RightInfo).append(CompanyDiv_ContactsTelephone_RightInfo_Input_PromptInfo);
        //手机号码div
        var CompanyDiv_Mobile = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_Mobile);
        //左方信息
        var CompanyDiv_Mobile_LeftInfo = document.createElement("td");
        $(CompanyDiv_Mobile_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_Mobile_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;手机号码：");
        $(CompanyDiv_Mobile).append(CompanyDiv_Mobile_LeftInfo);
        //右方div
        var CompanyDiv_Mobile_RightInfo = document.createElement("td");
        $(CompanyDiv_Mobile_RightInfo).addClass("RightInfo");
        $(CompanyDiv_Mobile).append(CompanyDiv_Mobile_RightInfo);
        //输入框div
        var CompanyDiv_Mobile_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_Mobile_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_Mobile_RightInfo).append(CompanyDiv_Mobile_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_Mobile_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_Mobile_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_Mobile_RightInfo_InputDiv_Input).addClass("InputBox");
        $(CompanyDiv_Mobile_RightInfo_InputDiv).append(CompanyDiv_Mobile_RightInfo_InputDiv_Input);
        element.set("MobileText", CompanyDiv_Mobile_RightInfo_InputDiv_Input);
        $(CompanyDiv_Mobile_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "11位手机号");
        });
        $(CompanyDiv_Mobile_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckMobile(element);
        });
        //提示信息
        var CompanyDiv_Mobile_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_Mobile_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_Mobile_RightInfo).append(CompanyDiv_Mobile_RightInfo_Input_PromptInfo);
        //验证码div
        var CompanyDiv_Code = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_Code);
        //左方信息
        var CompanyDiv_Code_LeftInfo = document.createElement("td");
        $(CompanyDiv_Code_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_Code_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;验证码：");
        $(CompanyDiv_Code).append(CompanyDiv_Code_LeftInfo);
        //右方div
        var CompanyDiv_Code_RightInfo = document.createElement("td");
        $(CompanyDiv_Code_RightInfo).addClass("RightInfo");
        $(CompanyDiv_Code).append(CompanyDiv_Code_RightInfo);
        //输入框div
        var CompanyDiv_Code_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_Code_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_Code_RightInfo).append(CompanyDiv_Code_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_Code_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_Code_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_Code_RightInfo_InputDiv_Input).addClass("CodeBox");
        $(CompanyDiv_Code_RightInfo_InputDiv).append(CompanyDiv_Code_RightInfo_InputDiv_Input);
        element.set("CodeText", CompanyDiv_Code_RightInfo_InputDiv_Input);
        $(CompanyDiv_Code_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "输入图中的4位验证码");
        });
        $(CompanyDiv_Code_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckCode(element);
        });
        //验证码图片
        var CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv = document.createElement("div");
        $(CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv).addClass("CodeImg");
        $(CompanyDiv_Code_RightInfo_InputDiv).append(CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv);
        //创建验证码组件
        var CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code = document.createElement("Gf-VerifyCode");
        CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["imgwidth"] = "60";
        CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["imgheight"] = "30";
        var CodeKey = this.GetUniqueId("CodeKey");
        CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["codekey"] = CodeKey;
        $(CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv).append(CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code);
        CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["init"]();
        //验证码刷新
        var CompanyDiv_Code_RightInfo_InputDiv_a = document.createElement("a");
        $(CompanyDiv_Code_RightInfo_InputDiv_a).text("换一张");
        $(CompanyDiv_Code_RightInfo_InputDiv_a).addClass("Refresh");
        $(CompanyDiv_Code_RightInfo_InputDiv).append(CompanyDiv_Code_RightInfo_InputDiv_a);
        $(CompanyDiv_Code_RightInfo_InputDiv_a).click(function () {
            CompanyDiv_Code_RightInfo_InputDiv_CodeImgDiv_Code["Refresh"]();
        });
        //提示信息
        var CompanyDiv_Code_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_Code_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_Code_RightInfo).append(CompanyDiv_Code_RightInfo_Input_PromptInfo);
        //手机验证码div
        var CompanyDiv_MobileCode = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_MobileCode);
        //左方信息
        var CompanyDiv_MobileCode_LeftInfo = document.createElement("td");
        $(CompanyDiv_MobileCode_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_MobileCode_LeftInfo).append("<span style=\"color: #C00;\">*</span>&nbsp;手机验证码：");
        $(CompanyDiv_MobileCode).append(CompanyDiv_MobileCode_LeftInfo);
        //右方div
        var CompanyDiv_MobileCode_RightInfo = document.createElement("td");
        $(CompanyDiv_MobileCode_RightInfo).addClass("RightInfo");
        $(CompanyDiv_MobileCode).append(CompanyDiv_MobileCode_RightInfo);
        //输入框div
        var CompanyDiv_MobileCode_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_MobileCode_RightInfo).append(CompanyDiv_MobileCode_RightInfo_InputDiv);
        //输入框
        var CompanyDiv_MobileCode_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_Input).attr("type", "text");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_Input).addClass("CodeBox");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv).append(CompanyDiv_MobileCode_RightInfo_InputDiv_Input);
        element.set("MobileCodeText", CompanyDiv_MobileCode_RightInfo_InputDiv_Input);
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_Input).focus(function (e) {
            that.ShowTips(e.target, "输入手机收到的验证码");
        });
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_Input).blur(function (e) {
            that.CheckMobileCode(element);
        });
        //短信验证码按钮div
        var CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv = document.createElement("div");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv).addClass("CodeBtn");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv).append(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv);
        //短信验证码按钮
        var CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn = document.createElement("Gf-MessageCode");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("messagetemplateid", element.messagetemplateid);
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("messagesenderid", element.messagesenderid);
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("width", "142px");
        var SmsCodeKey = this.GetUniqueId("SmsCode");
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn).attr("codekey", SmsCodeKey);
        element.set("Gf-MessageCode", CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn);
        $(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtnDiv).append(CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn);
        CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn["init"]();
        CompanyDiv_MobileCode_RightInfo_InputDiv_SendBtn["registerEventHandler"]("BeforeSendMessage", function () {
            if (!that.CheckMobile(element)) {
                return;
            }
        });
        //提示信息
        var CompanyDiv_MobileCode_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_MobileCode_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_MobileCode_RightInfo).append(CompanyDiv_MobileCode_RightInfo_Input_PromptInfo);
        //用户协议div
        var CompanyDiv_Agreement = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_Agreement);
        //左方信息
        var CompanyDiv_Agreement_LeftInfo = document.createElement("td");
        $(CompanyDiv_Agreement_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_Agreement_LeftInfo).text("");
        $(CompanyDiv_Agreement).append(CompanyDiv_Agreement_LeftInfo);
        //右方div
        var CompanyDiv_Agreement_RightInfo = document.createElement("td");
        $(CompanyDiv_Agreement_RightInfo).addClass("RightInfo");
        $(CompanyDiv_Agreement).append(CompanyDiv_Agreement_RightInfo);
        //输入框div
        var CompanyDiv_Agreement_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_Agreement_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_Agreement_RightInfo).append(CompanyDiv_Agreement_RightInfo_InputDiv);
        //选择框span
        var CompanyDiv_Agreement_RightInfo_InputDiv_Span = document.createElement("span");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_Span).addClass("CheckBoxSpan");
        $(CompanyDiv_Agreement_RightInfo_InputDiv).append(CompanyDiv_Agreement_RightInfo_InputDiv_Span);
        //选择框
        var CompanyDiv_Agreement_RightInfo_InputDiv_Input = document.createElement("input");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_Input).attr("type", "checkbox");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_Input).attr("checked", "checked");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_Input).addClass("CheckBox");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_Span).append(CompanyDiv_Agreement_RightInfo_InputDiv_Input);
        element.set("AgreeMentText", CompanyDiv_Agreement_RightInfo_InputDiv_Input);
        $(CompanyDiv_Agreement_RightInfo_InputDiv_Input).change(function (e) {
            that.CheckAgreement(element);
        });
        //信息
        var CompanyDiv_Agreement_RightInfo_InputDiv_b = document.createElement("b");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_b).text("我已看过并接受");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_b).addClass("Agree");
        $(CompanyDiv_Agreement_RightInfo_InputDiv).append(CompanyDiv_Agreement_RightInfo_InputDiv_b);
        //注册协议
        var CompanyDiv_Agreement_RightInfo_InputDiv_a = document.createElement("a");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_a).text("《用户注册协议》");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_a).attr("href", "#");
        $(CompanyDiv_Agreement_RightInfo_InputDiv_a).addClass("Agreement");
        $(CompanyDiv_Agreement_RightInfo_InputDiv).append(CompanyDiv_Agreement_RightInfo_InputDiv_a);
        //提示信息
        var CompanyDiv_Agreement_RightInfo_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_Agreement_RightInfo_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_Agreement_RightInfo).append(CompanyDiv_Agreement_RightInfo_Input_PromptInfo);
        //按钮Div
        var CompanyDiv_Btn = document.createElement("tr");
        $(CompanyDiv_ContactsTable).append(CompanyDiv_Btn);
        //左方信息
        var CompanyDiv_Btn_LeftInfo = document.createElement("td");
        $(CompanyDiv_Btn_LeftInfo).addClass("LeftInfo");
        $(CompanyDiv_Btn_LeftInfo).text("");
        $(CompanyDiv_Btn).append(CompanyDiv_Btn_LeftInfo);
        //右方div
        var CompanyDiv_Btn_RightInfo = document.createElement("td");
        $(CompanyDiv_Btn_RightInfo).addClass("RightInfo");
        $(CompanyDiv_Btn).append(CompanyDiv_Btn_RightInfo);
        //输入框div
        var CompanyDiv_Btn_RightInfo_InputDiv = document.createElement("div");
        $(CompanyDiv_Btn_RightInfo_InputDiv).addClass("RightInput");
        $(CompanyDiv_Btn_RightInfo).append(CompanyDiv_Btn_RightInfo_InputDiv);
        //注册按钮
        var CompanyDiv_Btn_RightInfo_InputDiv_Input = document.createElement("a");
        $(CompanyDiv_Btn_RightInfo_InputDiv_Input).text("注册");
        $(CompanyDiv_Btn_RightInfo_InputDiv_Input).addClass("RegBtn");
        $(CompanyDiv_Btn_RightInfo_InputDiv).append(CompanyDiv_Btn_RightInfo_InputDiv_Input);
        element.set("RegisterBtn", CompanyDiv_Btn_RightInfo_InputDiv_Input);
        $(CompanyDiv_Btn_RightInfo_InputDiv_Input).click(function (e) {
            that.RegisterComPanyMemberClick(element, CodeKey, SmsCodeKey);
        });
        //绑定回车事件
        $(document).keydown(function (event) {
            if (event.keyCode == 13) {
                //触发登录按钮
                $(CompanyDiv_Btn_RightInfo_InputDiv_Input).click();
            }
        });
        //提示信息
        var CompanyDiv_Btn_RightInfo_InputDiv_Input_PromptInfo = document.createElement("div");
        $(CompanyDiv_Btn_RightInfo_InputDiv_Input_PromptInfo).addClass("ShowInfo");
        $(CompanyDiv_Btn_RightInfo).append(CompanyDiv_Btn_RightInfo_InputDiv_Input_PromptInfo);
    };
    //加载公司人数,公司行业,公司性质列表组件
    FeComponentFrontEndRegister.prototype.LoadListValueFromCompany = function (element, FatherContainer) {
        var that = this;
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndRegister/GetCompanyValueList"),
            type: "POST",
            dataType: "json",
            async: false,
            data: {},
            success: function (result) {
                //公司所在地div
                var CompanyDiv_CompanyPosition = document.createElement("tr");
                $(FatherContainer).append(CompanyDiv_CompanyPosition);
                //左方信息
                var CompanyDiv_CompanyPosition_LeftInfo = document.createElement("td");
                $(CompanyDiv_CompanyPosition_LeftInfo).addClass("LeftInfo");
                $(CompanyDiv_CompanyPosition_LeftInfo).text("公司所在地：");
                $(CompanyDiv_CompanyPosition).append(CompanyDiv_CompanyPosition_LeftInfo);
                //右方div
                var CompanyDiv_CompanyPosition_RightInfo = document.createElement("td");
                $(CompanyDiv_CompanyPosition_RightInfo).addClass("RightInfo");
                $(CompanyDiv_CompanyPosition).append(CompanyDiv_CompanyPosition_RightInfo);
                //输入框div
                var CompanyDiv_CompanyPosition_RightInfo_InputDiv = document.createElement("div");
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv).addClass("RightLocation");
                $(CompanyDiv_CompanyPosition_RightInfo).append(CompanyDiv_CompanyPosition_RightInfo_InputDiv);
                //输入框
                var CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input = document.createElement("Gf-MultCombobox");
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input).attr("valuefield", "id");
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input).attr("textfield", "label");
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input).attr("defaultoption", "请选择");
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input).attr("rootvalue", result.LocationRoot);
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input).attr("data", result.LocationData);
                $(CompanyDiv_CompanyPosition_RightInfo_InputDiv).append(CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input);
                CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input["init"]();
                element.set("CompanyPositionText", CompanyDiv_CompanyPosition_RightInfo_InputDiv_Input);
                //提示信息
                var CompanyDiv_CompanyPosition_RightInfo_Input_PromptInfo = document.createElement("div");
                $(CompanyDiv_CompanyPosition_RightInfo_Input_PromptInfo).addClass("ShowInfo");
                $(CompanyDiv_CompanyPosition_RightInfo).append(CompanyDiv_CompanyPosition_RightInfo_Input_PromptInfo);
                //公司人数div
                var CompanyDiv_CompanyPeopleNumber = document.createElement("tr");
                $(FatherContainer).append(CompanyDiv_CompanyPeopleNumber);
                //左方信息
                var CompanyDiv_CompanyPeopleNumber_LeftInfo = document.createElement("td");
                $(CompanyDiv_CompanyPeopleNumber_LeftInfo).addClass("LeftInfo");
                $(CompanyDiv_CompanyPeopleNumber_LeftInfo).text("公司人数：");
                $(CompanyDiv_CompanyPeopleNumber).append(CompanyDiv_CompanyPeopleNumber_LeftInfo);
                //右方div
                var CompanyDiv_CompanyPeopleNumber_RightInfo = document.createElement("td");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo).addClass("RightInfo");
                $(CompanyDiv_CompanyPeopleNumber).append(CompanyDiv_CompanyPeopleNumber_RightInfo);
                //输入框div
                var CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv = document.createElement("div");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv).addClass("RightInput");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo).append(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv);
                //公司人数列表组件
                var CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input = document.createElement("Gf-ListValueCombobox");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input).attr("value", "");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input).attr("source", result.PersonScale);
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input).attr("defaultoption", "请选择");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input).attr("createurl", document.body["apppath"] + "/FrontEnd/GetObjektCollection");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv).append(CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input);
                CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input["init"]();
                element.set("CompanyPeopleNumberText", CompanyDiv_CompanyPeopleNumber_RightInfo_InputDiv_Input);
                //提示信息
                var CompanyDiv_CompanyPeopleNumber_RightInfo_Input_PromptInfo = document.createElement("div");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo_Input_PromptInfo).addClass("ShowInfo");
                $(CompanyDiv_CompanyPeopleNumber_RightInfo).append(CompanyDiv_CompanyPeopleNumber_RightInfo_Input_PromptInfo);
                //公司行业div
                var CompanyDiv_CompanyIndustry = document.createElement("tr");
                $(FatherContainer).append(CompanyDiv_CompanyIndustry);
                //左方信息
                var CompanyDiv_CompanyIndustry_LeftInfo = document.createElement("td");
                $(CompanyDiv_CompanyIndustry_LeftInfo).addClass("LeftInfo");
                $(CompanyDiv_CompanyIndustry_LeftInfo).text("公司行业：");
                $(CompanyDiv_CompanyIndustry).append(CompanyDiv_CompanyIndustry_LeftInfo);
                //右方div
                var CompanyDiv_CompanyIndustry_RightInfo = document.createElement("td");
                $(CompanyDiv_CompanyIndustry_RightInfo).addClass("RightInfo");
                $(CompanyDiv_CompanyIndustry).append(CompanyDiv_CompanyIndustry_RightInfo);
                //输入框div
                var CompanyDiv_CompanyIndustry_RightInfo_InputDiv = document.createElement("div");
                $(CompanyDiv_CompanyIndustry_RightInfo_InputDiv).addClass("RightInput");
                $(CompanyDiv_CompanyIndustry_RightInfo).append(CompanyDiv_CompanyIndustry_RightInfo_InputDiv);
                var CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input = document.createElement("Gf-ListValueCombobox");
                $(CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input).attr("value", "");
                $(CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input).attr("source", result.Industry);
                $(CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input).attr("defaultoption", "请选择");
                $(CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input).attr("createurl", document.body["apppath"] + "/FrontEnd/GetObjektCollection");
                $(CompanyDiv_CompanyIndustry_RightInfo_InputDiv).append(CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input);
                CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input["init"]();
                element.set("CompanyIndustryText", CompanyDiv_CompanyIndustry_RightInfo_InputDiv_Input);
                //提示信息
                var CompanyDiv_CompanyIndustry_RightInfo_Input_PromptInfo = document.createElement("div");
                $(CompanyDiv_CompanyIndustry_RightInfo_Input_PromptInfo).addClass("ShowInfo");
                $(CompanyDiv_CompanyIndustry_RightInfo).append(CompanyDiv_CompanyIndustry_RightInfo_Input_PromptInfo);
                //公司性质div
                var CompanyDiv_CompanyNature = document.createElement("tr");
                $(FatherContainer).append(CompanyDiv_CompanyNature);
                //左方信息
                var CompanyDiv_CompanyNature_LeftInfo = document.createElement("td");
                $(CompanyDiv_CompanyNature_LeftInfo).addClass("LeftInfo");
                $(CompanyDiv_CompanyNature_LeftInfo).text("公司性质：");
                $(CompanyDiv_CompanyNature).append(CompanyDiv_CompanyNature_LeftInfo);
                //右方div
                var CompanyDiv_CompanyNature_RightInfo = document.createElement("td");
                $(CompanyDiv_CompanyNature_RightInfo).addClass("RightInfo");
                $(CompanyDiv_CompanyNature).append(CompanyDiv_CompanyNature_RightInfo);
                //输入框div
                var CompanyDiv_CompanyNature_RightInfo_InputDiv = document.createElement("div");
                $(CompanyDiv_CompanyNature_RightInfo_InputDiv).addClass("RightInput");
                $(CompanyDiv_CompanyNature_RightInfo).append(CompanyDiv_CompanyNature_RightInfo_InputDiv);
                //输入框
                var CompanyDiv_CompanyNature_RightInfo_InputDiv_Input = document.createElement("Gf-ListValueCombobox");
                $(CompanyDiv_CompanyNature_RightInfo_InputDiv_Input).attr("value", "");
                $(CompanyDiv_CompanyNature_RightInfo_InputDiv_Input).attr("source", result.OrganizationNature);
                $(CompanyDiv_CompanyNature_RightInfo_InputDiv_Input).attr("defaultoption", "请选择");
                $(CompanyDiv_CompanyNature_RightInfo_InputDiv_Input).attr("createurl", document.body["apppath"] + "/FrontEnd/GetObjektCollection");
                $(CompanyDiv_CompanyNature_RightInfo_InputDiv).append(CompanyDiv_CompanyNature_RightInfo_InputDiv_Input);
                CompanyDiv_CompanyNature_RightInfo_InputDiv_Input["init"]();
                element.set("CompanyNatureText", CompanyDiv_CompanyNature_RightInfo_InputDiv_Input);
                //提示信息
                var CompanyDiv_CompanyNature_RightInfo_Input_PromptInfo = document.createElement("div");
                $(CompanyDiv_CompanyNature_RightInfo_Input_PromptInfo).addClass("ShowInfo");
                $(CompanyDiv_CompanyNature_RightInfo).append(CompanyDiv_CompanyNature_RightInfo_Input_PromptInfo);
            },
            error: function () {
                $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "加载组织列表失败", position: 'bottomRight' });
            }
        });
    };
    //构建组件
    FeComponentFrontEndRegister.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentFrontEndRegister;
}(FeTemplateComponentBase));
/*
****属性 *****

****方法 ****

****事件 ****

*/
var FeComponentHelpBox = (function (_super) {
    __extends(FeComponentHelpBox, _super);
    function FeComponentHelpBox(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentHelpBox.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentHelpBox.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentHelpBox.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentHelpBox.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-HelpBox";
    };
    //获取当前组件是否自动初始化
    FeComponentHelpBox.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentHelpBox.prototype.extendName = function () {
        return "feComponentHelpBox";
    };
    //扩展方法实现
    FeComponentHelpBox.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentHelpBox.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentHelpBox.prototype.loadData = function (element, container) {
        var items = [];
        $.ajax({
            url: this.resolveUrl(element, '~/FeDecoration/GetHelpBoxList'),
            type: 'POST',
            dataType: "json",
            data: {},
            async: false,
            success: function (datas) {
                datas.forEach(function (data) {
                    items.push({
                        title: data.Title,
                        items: data.Items
                    });
                });
            }
        });
        var div = document.createElement("div");
        $(div).addClass("foot-help");
        $(div).addClass("fl");
        $(container).append(div);
        var ul = document.createElement("ul");
        $(ul).addClass("jd_menu");
        $(ul).addClass("clearfix");
        $(div).append(ul);
        for (var i = 0; i < items.length; i++) {
            var li = document.createElement("li");
            $(ul).append(li);
            var dl = document.createElement("dl");
            $(li).append(dl);
            var dt = document.createElement("dt");
            $(dl).append(dt);
            div = document.createElement("div");
            $(div).addClass("gtotop_title");
            $(div).text(items[i].title);
            $(dt).append(div);
            for (var j = 0; j < items[i].items.length; j++) {
                var dd = document.createElement("dd");
                $(dl).append(dd);
                var a = document.createElement("a");
                $(a).attr("href", items[i].items[j].href);
                $(a).attr("target", "_blank");
                $(a).text(items[i].items[j].text);
                $(dd).append(a);
            }
        }
    };
    //构建组件
    FeComponentHelpBox.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentHelpBox");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentHelpBox;
}(FeTemplateComponentBase));
/*
****属性*****
设置欢迎的文本，默认为“欢迎光临！”
html:<Gf-FeTemplate-Component-LoginState welcome="欢迎光临！">
js:$("#loginState").feTemplateLoginState({welcome:'欢迎光临！'});     var text = $("#loginState").feTemplateLoginState('options','welcome');

设置注册的文本，默认为“免费注册”，属性为“register”，使用方式同上

设置登录的文本，默认为“请登录”，属性为“login”，使用方式同上

设置登录后问候语文本，默认为“你好！”，属性为“hello”，使用方式同上

设置登录后登出按钮文本，默认为“[退出]”，属性为“logout”，使用方式同上

设置登录跳转Url，默认为document.body["apppath"] + "/FrontEndLogin"，属性为“loginurl”，使用方式同上

设置注册跳转Url，默认为document.body["apppath"] + "/FrontEndRegister"，属性为“registerurl”，使用方式同上

****方法****
//登录状态刷新
js:$("#loginState").feTemplateLoginState("LoginStateRefresh");

****事件****

点击登录按钮事件
js:$("#loginState").feTemplateLoginState("BeforeLoginClick",function() {});

点击退出按钮事件
js:$("#loginState").feTemplateLoginState("AfterLogoutClick",function() {});

点击注册按钮事件
js:$("#loginState").feTemplateLoginState("BeforeRegisterClick",function() {});

*/
var FeComponentLoginState = (function (_super) {
    __extends(FeComponentLoginState, _super);
    function FeComponentLoginState(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("welcome,register,login,hello,logout,loginurl,registerurl");
        return _this;
    }
    FeComponentLoginState.prototype.defaultOptions = function () {
        var options = {
            welcome: '欢迎光临！',
            register: '免费注册',
            login: '请登录',
            hello: '你好！',
            logout: '[退出]',
            loginurl: document.body["apppath"] + "/FrontEndLogin",
            registerurl: document.body["apppath"] + "/FrontEndRegister"
        };
        return options;
    };
    //设置选项前
    FeComponentLoginState.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentLoginState.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentLoginState.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-LoginState";
    };
    //获取当前组件是否自动初始化
    FeComponentLoginState.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentLoginState.prototype.extendName = function () {
        return "feComponentLoginState";
    };
    //扩展方法实现
    FeComponentLoginState.prototype.extendFunction = function (element, method, args) {
        if ("BeforeLoginClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.BeforeLoginClick = args;
        }
        else if ("AfterLogoutClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.AfterLogoutClick = args;
        }
        else if ("BeforeRegisterClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.btnRegisterClick = args;
        }
        else if ("LoginStateRefresh" === method) {
            this.reload(element);
        }
    };
    FeComponentLoginState.prototype.btnLoginClick = function (element) {
        var _this = this;
        if (element.xtag.eventHandlers.BeforeLoginClick) {
            element.xtag.eventHandlers.BeforeLoginClick();
        }
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndLogin/CheckIsLogin"),
            type: "POST",
            dataType: "json",
            data: {},
            success: function (result) {
                if (result.IsLogin == "true") {
                    _this.reload(element);
                }
                else {
                    window.location.href = element.loginurl;
                }
            },
            error: function () {
            }
        });
    };
    FeComponentLoginState.prototype.btnLogoutClick = function (element) {
        var _this = this;
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndLogin/LogOut"),
            type: "POST",
            dataType: "json",
            data: {},
            success: function (result) {
                $("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "消息", msg: "退出成功", position: 'bottomRight' });
                _this.reload(element);
                if (element.xtag.eventHandlers.AfterLogoutClick) {
                    element.xtag.eventHandlers.AfterLogoutClick();
                }
            },
            error: function () {
            }
        });
    };
    FeComponentLoginState.prototype.btnRegisterClick = function (element) {
        if (element.xtag.eventHandlers.btnLogoutClick) {
            element.xtag.eventHandlers.btnLogoutClick();
        }
        window.location.href = element.registerurl;
    };
    //重新加载
    FeComponentLoginState.prototype.reload = function (element) {
        //得到组件内所有元素
        var container = this.componentContainer(element);
        //清空所有标签
        $(container).empty();
        //加载初始化方法
        this.loadData(element, container);
    };
    //组件加载
    FeComponentLoginState.prototype.loadData = function (element, container) {
        var _this = this;
        $(container).addClass("FeComponentLoginState");
        $.ajax({
            url: this.resolveUrl(element, "~/FrontEndLogin/CheckIsLogin"),
            type: "POST",
            dataType: "json",
            data: {},
            success: function (result) {
                if (result.IsLogin == "true") {
                    _this.AfterLogin(element, container, result.UserName);
                }
                else {
                    _this.BeforeLogin(element, container);
                }
            },
            error: function () {
            }
        });
    };
    FeComponentLoginState.prototype.AfterLogin = function (element, container, LoginName) {
        var _this = this;
        //登录后
        var afterLogin = document.createElement("div");
        $(afterLogin).attr("behaviorId", "afterLogin");
        $(afterLogin).addClass("afterLogin");
        $(container).append(afterLogin);
        //ul容器
        var ulAfter = document.createElement("ul");
        $(ulAfter).addClass("clearfix");
        $(afterLogin).append(ulAfter);
        //欢迎文本
        var hello = document.createElement("li");
        $(hello).attr("behaviorId", "hello");
        $(hello).text(this.getOption(element, "hello"));
        $(ulAfter).append(hello);
        //登录名容器
        var loginNameContainer = document.createElement("li");
        $(ulAfter).append(loginNameContainer);
        //登录名
        var loginName = document.createElement("a");
        $(loginName).attr("behaviorId", "loginName");
        $(loginName).addClass("loginName");
        $(loginName).text(LoginName);
        $(loginName).attr("href", "#");
        $(loginNameContainer).append(loginName);
        //登录名容器
        var logoutContainer = document.createElement("li");
        $(ulAfter).append(logoutContainer);
        //退出
        var logout = document.createElement("a");
        $(logout).attr("behaviorId", "logout");
        $(logout).addClass("logout");
        $(logout).text(this.getOption(element, "logout"));
        $(logoutContainer).append(logout);
        $(logout).click(function () {
            _this.btnLogoutClick(element);
        });
    };
    FeComponentLoginState.prototype.BeforeLogin = function (element, container) {
        var _this = this;
        //登录前
        var beforeLogin = document.createElement("div");
        $(beforeLogin).attr("behaviorId", "beforeLogin");
        $(beforeLogin).addClass("beforeLogin");
        $(container).append(beforeLogin);
        //ul容器
        var ul = document.createElement("ul");
        $(ul).addClass("clearfix");
        $(beforeLogin).append(ul);
        //欢迎文本
        var welcome = document.createElement("li");
        $(welcome).attr("behaviorId", "welcome");
        $(welcome).text(this.getOption(element, "welcome"));
        $(ul).append(welcome);
        //登录容器
        var loginContainer = document.createElement("li");
        $(ul).append(loginContainer);
        //登录按钮
        var login = document.createElement("a");
        $(login).attr("behaviorId", "login");
        $(login).addClass("login");
        $(login).text(this.getOption(element, "login"));
        $(loginContainer).append(login);
        $(login).click(function () {
            _this.btnLoginClick(element);
        });
        //注册容器
        var registerContainer = document.createElement("li");
        $(ul).append(registerContainer);
        //注册按钮
        var register = document.createElement("a");
        $(register).attr("behaviorId", "register");
        $(register).addClass("register");
        $(register).text(this.getOption(element, "register"));
        $(registerContainer).append(register);
        $(registerContainer).click(function () {
            _this.btnRegisterClick(element);
        });
    };
    //构建组件
    FeComponentLoginState.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {
            state: false
        };
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentLoginState;
}(FeTemplateComponentBase));
/*
****属性*****
logoid，如果设置，组件会自动请求后台，根据id加载相关图片、文字和图片链接，默认值为空。
从后台获取到图片、文字和图片链接优先级告诉imageurl,href和text属性设置的值，当后台未设置，才会从属性中取得。
比如：通过logoid获取到了图片，那么imageurl属性就无效，但后台记录中文本和链接为空，组件就会继续查找href和text属性的值。
html:<Gf-FeTemplate-Component-Logo logoid="12345">
js:$("#feComponentLogo").feComponentLogo({logoid:'12345'});     var id = $("#feComponentLogo").feComponentLogo('options','logoid');

imageurl，图片的url支持“~”
****方法****

****事件****

*/
var FeComponentLogo = (function (_super) {
    __extends(FeComponentLogo, _super);
    function FeComponentLogo(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("logoid,imageurl,imagelink,text");
        return _this;
    }
    FeComponentLogo.prototype.defaultOptions = function () {
        var options = {
            logoid: '',
            imageurl: '~/{Component}/../Images/logo.png',
            imagelink: '~/FeArticle/FrontIndex',
            text: '',
            channelid: ''
        };
        return options;
    };
    //设置选项前
    FeComponentLogo.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentLogo.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentLogo.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Logo";
    };
    //获取当前组件是否自动初始化
    FeComponentLogo.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentLogo.prototype.extendName = function () {
        return "feComponentLogo";
    };
    //扩展方法实现
    FeComponentLogo.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentLogo.prototype.reload = function (element) {
        var _this = this;
        var url = this.resolveUrl(element, "~/FeLogo/GetLogo");
        var logoId = this.getOption(element, "logoid");
        var imageLink = this.findControl(element, "imageLink");
        var font = this.findControl(element, "font");
        var img = this.findControl(element, "img");
        if (logoId) {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: { id: logoId },
                success: function (result) {
                    if (result.ImagePath) {
                        $(img).attr("src", _this.resolveUrl(element, result.ImagePath));
                    }
                    if (result.Link) {
                        $(imageLink).attr("href", _this.resolveUrl(element, result.Link));
                    }
                    if (result.Label) {
                        $(font).text(result.Label);
                    }
                }
            });
        }
        if (element.imageurl) {
            $(img).attr("src", this.resolveUrl(element, element.imageurl));
        }
        if (element.imagelink) {
            $(imageLink).attr("href", this.resolveUrl(element, element.imagelink));
        }
        if (element.text) {
            $(font).text(element.text);
        }
    };
    //构建组件
    FeComponentLogo.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentLogo");
        var div = document.createElement("div");
        $(div).addClass("j-logos fl");
        $(container).append(div);
        var imageContainer = document.createElement("div");
        $(imageContainer).addClass("j-img fl");
        $(div).append(imageContainer);
        var imageLink = document.createElement("a");
        $(imageLink).attr("href", this.resolveUrl(element, element.imagelink));
        $(imageLink).attr("behaviorId", "imageLink");
        $(imageContainer).append(imageLink);
        var img = document.createElement("img");
        $(img).attr("src", this.resolveUrl(element, element.imageurl));
        $(img).attr("behaviorId", "img");
        $(imageLink).append(img);
        var text = document.createElement("span");
        $(text).addClass("j-size");
        $(div).append(text);
        var font = document.createElement("b");
        $(font).text(element.text);
        $(font).attr("behaviorId", "font");
        $(text).append(font);
        this.reload(element);
    };
    return FeComponentLogo;
}(FeTemplateComponentBase));
/*
****属性*****
            title: '标题',
            msg: '内容',
            showtype: 'show',//展示方式 可选show slide
            delay: 4000,//延迟 多久消息框消失
            width: 400,//消息框宽度
            height: 200,//消息框高度
            position: 'bottomRight'//消息框显示位置 可选topLeft topCenter topRight centerLeft center centerRight bottomLeft bottomCenter bottomRight
****方法****
$("Gf-FeTemplate-Component-Messager").feComponentMessager("show", { title: "aaaaa", position: 'center' });
****事件****

*/
var FeComponentMessager = (function (_super) {
    __extends(FeComponentMessager, _super);
    function FeComponentMessager(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("title,msg,showtype,delay,position,width,height");
        return _this;
    }
    FeComponentMessager.prototype.defaultOptions = function () {
        var options = {
            title: 'message title',
            msg: 'message content',
            showtype: 'show',
            delay: 4000,
            width: 400,
            height: 200,
            position: 'bottomRight' //topLeft topCenter topRight centerLeft center centerRight bottomLeft bottomCenter bottomRight
        };
        return options;
    };
    //设置选项前
    FeComponentMessager.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentMessager.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentMessager.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Messager";
    };
    //获取当前组件是否自动初始化
    FeComponentMessager.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentMessager.prototype.extendName = function () {
        return "feComponentMessager";
    };
    //扩展方法实现
    FeComponentMessager.prototype.extendFunction = function (element, method, args) {
        if ("show" === method) {
            element.title = args.title == null ? element.title : args.title;
            element.msg = args.msg == null ? element.msg : args.msg;
            element.showtype = args.showtype == null ? element.showtype : args.showtype;
            element.delay = args.delay == null ? element.delay : args.delay;
            element.width = args.width == null ? element.width : args.width;
            element.title = args.title == null ? element.title : args.title;
            element.height = args.height == null ? element.height : args.height;
            element.position = args.position == null ? element.position : args.position;
            this.show(args, element);
        }
        else {
            _super.prototype.extendFunctionProxy.call(this, element, method, args);
        }
    };
    //重新加载
    FeComponentMessager.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentMessager.prototype.loadData = function (element, container) {
        var div = document.createElement("div");
        $(div).attr("id", "msg");
        $(container).append(div);
        var h2 = document.createElement("h2");
        $(h2).text(element.title);
        $(div).append(h2);
        var divcontent = document.createElement("div");
        $(divcontent).text(element.msg);
        $(div).append(divcontent);
    };
    FeComponentMessager.prototype.show = function (obj, element) {
        this.reload(element);
        var options = {
            title: 'message title',
            msg: 'message content',
            showtype: 'show',
            delay: 4000,
            width: 400,
            height: 200,
            position: 'bottomRight' //topLeft topCenter topRight centerLeft center centerRight bottomLeft bottomCenter bottomRight
        };
        var opt = {};
        $.each(options, function (key, value) {
            if (obj[key] != undefined) {
                opt[key] = obj[key];
            }
            else {
                opt[key] = options[key];
            }
        });
        var postion;
        /**** 页面宽度 ****/
        var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        /**** 页面高度 ****/
        var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        /**** 浏览器垂直滚动位置 ****/
        var de = document.documentElement;
        var scrollY = window.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
        /**** 浏览器水平滚动位置 ****/
        var scrollX = window.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
        /**** 当前页面实际高度 ****/
        var pageHeight = document.body.scrollHeight;
        /**** 当前页面实际宽度 ****/
        var pageWidth = document.body.scrollWidth;
        /**** 当前页面实际高度 ****/
        var offsetHeight = document.body.offsetHeight;
        /**** 当前页面实际宽度 ****/
        var offsetWidth = document.body.offsetWidth;
        switch (opt.position) {
            case "topLeft":
                postion = { left: scrollX + 'px', top: -(offsetHeight - scrollY) + 'px' };
                break;
            case "topCenter":
                postion = { left: (clientWidth - opt.width) / 2 + scrollX + "px", top: -(offsetHeight - scrollY) + 'px' };
                break;
            case "topRight":
                postion = { left: (clientWidth - opt.width + scrollX - 30) + 'px', top: -(offsetHeight - scrollY) + 'px' };
                break;
            case "centerLeft":
                postion = { left: scrollX + 'px', top: -(offsetHeight - scrollY - clientHeight / 2 + opt.height / 2) + 'px' };
                break;
            case "center":
                postion = { left: (clientWidth - opt.width) / 2 + scrollX + "px", top: -(offsetHeight - scrollY - clientHeight / 2 + opt.height / 2) + 'px' };
                break;
            case "centerRight":
                postion = { left: (clientWidth - opt.width + scrollX - 30) + 'px', top: -(offsetHeight - scrollY - clientHeight / 2 + opt.height / 2) + 'px' };
                break;
            case "bottomLeft":
                postion = { left: scrollX + 'px', top: -(offsetHeight - scrollY - clientHeight + opt.height) + 'px' };
                break;
            case "bottomCenter":
                postion = { left: (clientWidth - opt.width) / 2 + scrollX + "px", top: -(offsetHeight - scrollY - clientHeight + opt.height) + 'px' };
                break;
            case "bottomRight":
                postion = { left: (clientWidth - opt.width + scrollX - 30) + 'px', top: -(offsetHeight - scrollY - clientHeight + opt.height) + 'px' };
                break;
            default:
                postion = { left: (clientWidth - opt.width + scrollX) + 'px', top: -(offsetHeight - scrollY - clientHeight + opt.height) + 'px' };
                break;
        }
        //console.log({ width: clientWidth, height: clientHeight, scrollX: scrollX, scrollY: scrollY });
        //console.log(postion);
        $("#msg").css(postion);
        $("#msg").fadeIn(2000);
        this.autoClose(opt.delay);
    };
    FeComponentMessager.prototype.autoClose = function (delay) {
        setTimeout(function () { $("#msg").fadeOut(2000); }, delay);
    };
    //easyui 方式实现
    FeComponentMessager.prototype.loadData1 = function (element, container) {
        var div = document.createElement("div");
        $(div).addClass("j-wechats");
        $(div).addClass("fl");
        $(container).append(div);
        var position;
        switch (element.position) {
            case "topLeft":
                position = {
                    right: '',
                    left: 0,
                    top: document.body.scrollTop + document.documentElement.scrollTop,
                    bottom: ''
                };
                break;
            case "topCenter":
                position = {
                    right: '',
                    top: document.body.scrollTop + document.documentElement.scrollTop,
                    bottom: ''
                };
                break;
            case "topRight":
                position = {
                    left: '',
                    right: 0,
                    top: document.body.scrollTop + document.documentElement.scrollTop,
                    bottom: ''
                };
                break;
            case "centerLeft":
                position = {
                    left: 0,
                    right: '',
                    bottom: ''
                };
                break;
            case "center":
                position = {
                    right: '',
                    bottom: ''
                };
                break;
            case "centerRight":
                position = {
                    left: '',
                    right: 0,
                    bottom: ''
                };
                break;
            case "bottomLeft":
                position = {
                    left: 0,
                    right: '',
                    top: '',
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                };
                break;
            case "bottomCenter":
                position = {
                    right: '',
                    top: '',
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                };
                break;
            case "bottomRight":
                position = null;
                break;
            default:
                position = null;
                break;
        }
        //展示
        function show() {
            if (position != null) {
                $.messager.show({
                    title: element.title,
                    msg: element.msg,
                    showType: element.showtype,
                    timeout: element.timeout,
                    style: position
                });
            }
            else {
                $.messager.show({
                    title: element.title,
                    msg: element.msg,
                    showType: element.showtype,
                    timeout: element.timeout
                });
            }
        }
    };
    //构建组件
    FeComponentMessager.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentMessager");
        //$(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentMessager;
}(FeTemplateComponentBase));
/*
****属性*****
data，设置导航数据
html:<Gf-FeTemplate-Component-Navigate data="[{text:'首页',url:''},{text:'资讯',url:''}]">
js:$("#navigate").feComponentTagView("data","[{text:'首页',url:''},{text:'资讯',url:''}]");
   var data = $("#navigate").feComponentTagView('options','data');

****方法****


****事件****

*/
var FeComponentNavigate = (function (_super) {
    __extends(FeComponentNavigate, _super);
    function FeComponentNavigate(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("data");
        return _this;
    }
    FeComponentNavigate.prototype.defaultOptions = function () {
        var options = {
            data: "[]"
        };
        return options;
    };
    //设置选项前
    FeComponentNavigate.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentNavigate.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentNavigate.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-Navigate";
    };
    //获取当前组件是否自动初始化
    FeComponentNavigate.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentNavigate.prototype.extendName = function () {
        return "feComponentNavigate";
    };
    //扩展方法实现
    FeComponentNavigate.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentNavigate.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        var div = document.createElement("div");
        $(div).addClass("j-their");
        $(div).addClass("j-covers");
        $(div).addClass("clearfix");
        $(container).append(div);
        if (element.data) {
            var items = eval('(' + element.data + ')');
            ;
            if (items && items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    if (i !== 0) {
                        $(div).append("<label>></label>");
                    }
                    if (i !== items.length - 1) {
                        if (items[i].url) {
                            var a = document.createElement("a");
                            $(a).attr("href", this.resolveUrl(element, items[i].url));
                            $(a).text(items[i].text);
                            $(div).append(a);
                        }
                        else {
                            $(div).append("<label>" + items[i].text + "</label>");
                        }
                    }
                    else {
                        $(div).append("<label class='j-color'>" + items[i].text + "</label>");
                    }
                }
            }
        }
    };
    //构建组件
    FeComponentNavigate.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentNavigate");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentNavigate;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentPrims = (function (_super) {
    __extends(FeComponentPrims, _super);
    function FeComponentPrims(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentPrims.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentPrims.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentPrims.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentPrims.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Prims";
    };
    //获取当前组件是否自动初始化
    FeComponentPrims.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentPrims.prototype.extendName = function () {
        return "feComponentPrims";
    };
    //扩展方法实现
    FeComponentPrims.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentPrims.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentPrims.prototype.loadData = function (element, container) {
        var items = [];
        $.ajax({
            url: this.resolveUrl(element, '~/FeDecoration/GetPrimsList'),
            type: 'POST',
            dataType: "json",
            data: {},
            async: false,
            success: function (datas) {
                datas.forEach(function (data) {
                    items.push({
                        title: data.Title,
                        text: data.Text
                    });
                });
            }
        });
        var div = document.createElement("div");
        $(div).addClass("foot-prims");
        $(div).addClass("j-covers");
        $(container).append(div);
        var div_warper = document.createElement("div");
        $(div_warper).addClass("warper");
        $(div).append(div_warper);
        var ul = document.createElement("ul");
        $(ul).addClass("clearfix");
        $(div_warper).append(ul);
        for (var i = 0; i < items.length; i++) {
            var li = document.createElement("li");
            $(ul).append(li);
            var em = document.createElement("em");
            $(em).text(items[i].title);
            $(li).append(em);
            $(li).append(items[i].text);
        }
    };
    //构建组件
    FeComponentPrims.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentPrims");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentPrims;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentReturn = (function (_super) {
    __extends(FeComponentReturn, _super);
    function FeComponentReturn(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentReturn.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentReturn.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentReturn.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentReturn.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Return";
    };
    //获取当前组件是否自动初始化
    FeComponentReturn.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentReturn.prototype.extendName = function () {
        return "feComponentReturn";
    };
    //扩展方法实现
    FeComponentReturn.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentReturn.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentReturn.prototype.loadData = function (element, container) {
        $(container).append("<li class=\"j-return\" onclick=\"$('div').animate({ 'scrollTop': 0 }, 500);\">"
            + "<em class=\"j-icon3\"></em>"
            + "</li>");
    };
    //构建组件
    FeComponentReturn.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentReturn");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentReturn;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentShare = (function (_super) {
    __extends(FeComponentShare, _super);
    function FeComponentShare(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentShare.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentShare.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentShare.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentShare.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-Share";
    };
    //获取当前组件是否自动初始化
    FeComponentShare.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentShare.prototype.extendName = function () {
        return "feComponentShare";
    };
    //扩展方法实现
    FeComponentShare.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentShare.prototype.reload = function (element) {
        //super.AddHttpJs("http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh");
        //super.AddHttpJs("http://static.bshare.cn/b/bshareC0.js");
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentShare.prototype.loadData = function (element, container) {
        $(container).append("<div class=\"bshare-custom icon-medium-plus\"><div class=\"bsPromo bsPromo2\"></div><a title=\"分享到微信\" class=\"bshare-weixin\" href=\"javascript:void(0);\"></a><a title=\"分享到新浪微博\" class=\"bshare-sinaminiblog\"></a></div>");
        //$(container).append("<script type=\"text/javascript\" charset=\"utf-8\" src=\"http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh\"></script>");
        //$(container).append("<script type=\"text/javascript\" charset=\"utf-8\" src=\"http://static.bshare.cn/b/bshareC0.js\"></script>");
    };
    //构建组件
    FeComponentShare.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentShare");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentShare;
}(FeTemplateComponentBase));
/*
****属性*****
count，设置标签显示数量，默认值为“0”，显示全部
html:<Gf-FeTemplate-Component-TagView count="9">
js:$("#tagView").feComponentTagView("count",9);
   var count = $("#tagView").feComponentTagView('options','count');

****方法****

****事件****
click，点击标签事件
js:$("#tagView").feComponentTagView("click",function(tag){ var id=tag.Id; var name=tag.Name; });

*/
var FeComponentTagView = (function (_super) {
    __extends(FeComponentTagView, _super);
    function FeComponentTagView(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("count");
        return _this;
    }
    FeComponentTagView.prototype.defaultOptions = function () {
        var options = {
            count: 0
        };
        return options;
    };
    //设置选项前
    FeComponentTagView.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentTagView.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentTagView.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-TagView";
    };
    //获取当前组件是否自动初始化
    FeComponentTagView.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentTagView.prototype.extendName = function () {
        return "feComponentTagView";
    };
    //扩展方法实现
    FeComponentTagView.prototype.extendFunction = function (element, method, args) {
        if ("click" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.click = args;
        }
    };
    //重新加载
    FeComponentTagView.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        var div = document.createElement("div");
        $(div).addClass("j-tainment");
        $(div).addClass("j-label");
        $(div).addClass("clearfix");
        $(container).append(div);
        var h3 = document.createElement("h3");
        $(h3).addClass("clearfix");
        $(div).append(h3);
        var span = document.createElement("span");
        $(span).addClass("fl");
        $(span).text("热门标签");
        $(h3).append(span);
        var ul = document.createElement("ul");
        $(div).append(ul);
        $.ajax({
            data: { count: element.count },
            url: this.resolveUrl(element, "~/FeTagLibrary/GetTopTags"),
            type: "post",
            datatype: "json",
            success: function (result) {
                result.forEach(function (item) {
                    var li = document.createElement("li");
                    $(ul).append(li);
                    var a = document.createElement("a");
                    $(a).attr("href", "#");
                    $(a).text(item.Name);
                    $(li).append(a);
                    $(a).click(function () {
                        if (element.xtag.eventHandlers.click) {
                            element.xtag.eventHandlers.click({
                                Id: item.Id,
                                Name: item.Name
                            });
                        }
                    });
                });
            }
        });
    };
    //构建组件
    FeComponentTagView.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentTagView");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentTagView;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentWeChatCode = (function (_super) {
    __extends(FeComponentWeChatCode, _super);
    function FeComponentWeChatCode(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentWeChatCode.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentWeChatCode.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentWeChatCode.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentWeChatCode.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-WeChatCode";
    };
    //获取当前组件是否自动初始化
    FeComponentWeChatCode.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentWeChatCode.prototype.extendName = function () {
        return "feComponentWeChatCode";
    };
    //扩展方法实现
    FeComponentWeChatCode.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentWeChatCode.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentWeChatCode.prototype.loadData = function (element, container) {
        var items = [];
        $.ajax({
            url: this.resolveUrl(element, '~/FeDecoration/GetQRCodeList'),
            type: 'POST',
            dataType: "json",
            data: {},
            async: false,
            success: function (datas) {
                datas.forEach(function (data) {
                    items.push({
                        title: data.Title,
                        url: data.Url,
                        image: data.Image
                    });
                });
            }
        });
        var div = document.createElement("div");
        $(div).addClass("j-wechats");
        $(div).addClass("fl");
        $(container).append(div);
        var ul = document.createElement("ul");
        $(div).append(ul);
        for (var i = 0; i < items.length; i++) {
            var li = document.createElement("li");
            if (i > 0) {
                $(li).addClass("j-left");
            }
            $(ul).append(li);
            var p = document.createElement("p");
            $(p).addClass("j-size");
            $(p).text(items[i].title);
            $(li).append(p);
            p = document.createElement("p");
            $(li).append(p);
            var img = document.createElement("img");
            if (items[i].image != null && items[i].image != "") {
                $(img).attr("src", this.resolveUrl(element, "~/File?id=" + items[i].image));
            }
            $(p).append(img);
        }
    };
    //构建组件
    FeComponentWeChatCode.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentWeChatCode");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentWeChatCode;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentAdvertBanner = (function (_super) {
    __extends(FeComponentAdvertBanner, _super);
    function FeComponentAdvertBanner(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentAdvertBanner.prototype.defaultOptions = function () {
        var options = {};
        return options;
    };
    //设置选项前
    FeComponentAdvertBanner.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentAdvertBanner.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentAdvertBanner.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-AdvertBanner";
    };
    //获取当前组件是否自动初始化
    FeComponentAdvertBanner.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentAdvertBanner.prototype.extendName = function () {
        return "feComponentAdvertBanner";
    };
    //扩展方法实现
    FeComponentAdvertBanner.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentAdvertBanner.prototype.reload = function (element) {
    };
    //构建组件
    FeComponentAdvertBanner.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentAdvertBanner");
        $(container).addClass("clearfix");
        var slide = document.createElement("div");
        $(slide).addClass("j-slide");
        $(container).append(slide);
        var ul = document.createElement("ul");
        $(ul).addClass("j-slide-ul");
        $(slide).append(ul);
        for (var i = 1; i < 6; i++) {
            var li = document.createElement("li");
            $(ul).append(li);
            var a = document.createElement("a");
            $(a).attr("href", "#");
            $(a).attr("target", "_blank");
            $(li).append(a);
            var img = document.createElement("img");
            $(img).attr("src", this.resolveUrl(element, "~/{Component}/../Images/lb" + i + ".jpg"));
            $(a).append(img);
        }
        var num = document.createElement("div");
        $(num).addClass("num");
        $(slide).append(num);
        ul = document.createElement("ul");
        $(num).append(ul);
        $(".j-slide").slide({
            titCell: ".num ul",
            mainCell: ".j-slide-ul",
            effect: "fold",
            autoPlay: true,
            delayTime: 700,
            autoPage: true
        });
    };
    return FeComponentAdvertBanner;
}(FeTemplateComponentBase));
/*
****属性*****
mode，设置文章分类模式，默认值为“Category”
设置值包括：按分类展示“Category”、展示热点“Hot”、展示头条“Head”、展示推荐“Recommend”
如果设置为“Category”，请同时设置“categoryid”属性
html:<Gf-FeTemplate-Component-ArticleCategoryDetailsList mode="Category">
js:$("#articleCategoryDetailsList").feComponentArticleCategoryDetailsList("mode","Category");
   var mode = $("#articleCategoryDetailsList").feComponentArticleCategoryDetailsList('options','mode');

count，设置文章呈现数量，默认为“0”，呈现所有。 设置方法同上

categoryid，设置要查询的分类，默认值为“”，顶级分类

showmore，设置是否显示更多按钮，默认为true，显示

showloadmore，设置如果没加载完，是否在底部显示加载更多，默认为false，不显示

showhead，设置是否显示组件头部，默认为true，显示

tag:要显示的标签分类

****方法****

****事件****
moreClick，点击更多按钮
js:$("#articleCategoryDetailsList").feComponentArticleCategoryDetailsList("moreClick",function(mode, categoryid){ });

titleClick，点击标题事件
js:$("#articleCategoryDetailsList").feComponentArticleCategoryDetailsList("titleClick",function(id){ });

categoryClick，点击分类事件
js:$("#articleCategoryDetailsList").feComponentArticleCategoryDetailsList("categoryClick",function(id){ });

tagClick，点击分类事件
js:$("#articleCategoryDetailsList").feComponentArticleCategoryDetailsList("tagClick",function(tag){ });
*/
var FeComponentArticleCategoryDetailsList = (function (_super) {
    __extends(FeComponentArticleCategoryDetailsList, _super);
    function FeComponentArticleCategoryDetailsList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("mode,modevalue,channelid,count,showmore,showloadmore,showhead");
        return _this;
    }
    FeComponentArticleCategoryDetailsList.prototype.defaultOptions = function () {
        var options = {
            mode: "Category",
            modevalue: '',
            channelid: '',
            count: 0,
            showmore: true,
            showloadmore: false,
            showhead: true
        };
        return options;
    };
    //设置选项前
    FeComponentArticleCategoryDetailsList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCategoryDetailsList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        element.xtag.runtime.pageIndex = 1;
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentArticleCategoryDetailsList.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-ArticleCategoryDetailsList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCategoryDetailsList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCategoryDetailsList.prototype.extendName = function () {
        return "feComponentArticleCategoryDetailsList";
    };
    //扩展方法实现
    FeComponentArticleCategoryDetailsList.prototype.extendFunction = function (element, method, args) {
        if ("moreClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.moreClick = args;
        }
        else if ("titleClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.titleClick = args;
        }
        else if ("categoryClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.categoryClick = args;
        }
        else if ("tagClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.tagClick = args;
        }
        else if ("listCharacterClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.listCharacterClick = args;
        }
        else {
            _super.prototype.extendFunctionProxy.call(this, element, method, args);
        }
    };
    //重新加载
    FeComponentArticleCategoryDetailsList.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        var titleText = null;
        var loadmore = null;
        if (element.showhead && element.showhead === "true") {
            var title = document.createElement("div");
            $(title).addClass("j-title");
            $(title).addClass("clearfix");
            $(container).append(title);
            titleText = document.createElement("span");
            $(titleText).addClass("fl");
            $(title).append(titleText);
            var titleMore = document.createElement("span");
            $(titleMore).addClass("fr");
            $(title).append(titleMore);
            if (element.showmore && element.showmore.toLowerCase() === "true") {
                var moreLink = document.createElement("a");
                $(moreLink).attr("href", "#");
                $(moreLink).text("更多");
                $(titleMore).append(moreLink);
                $(moreLink).click(function () {
                    if (element.xtag.eventHandlers.moreClick) {
                        element.xtag.eventHandlers.moreClick(element.mode, element.modevalue);
                    }
                });
            }
        }
        var newList = document.createElement("div");
        $(newList).addClass("j-news-list");
        $(newList).addClass("clearfix");
        $(container).append(newList);
        var listContainer = document.createElement("ul");
        $(newList).append(listContainer);
        if (element.showloadmore && element.showloadmore.toLowerCase() === "true") {
            loadmore = document.createElement("div");
            $(loadmore).addClass("j-loads");
            $(loadmore).text("加载更多");
            $(container).append(loadmore);
            $(loadmore).click(function () {
                element.xtag.runtime.pageIndex += 1;
                _this.loadData(element, container, listContainer, titleText, loadmore);
            });
        }
        this.loadData(element, container, listContainer, titleText, loadmore);
    };
    FeComponentArticleCategoryDetailsList.prototype.loadData = function (element, container, listContainer, titleText, loadmore) {
        var _this = this;
        var HtmlUtil = {
            /*1.用浏览器内部转换器实现html转码*/
            htmlEncode: function (html) {
                //1.首先动态创建一个容器标签元素，如DIV
                var temp = document.createElement("div");
                //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
                (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
                //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
                var output = temp.innerHTML;
                temp = null;
                return output;
            },
            /*2.用浏览器内部转换器实现html解码*/
            htmlDecode: function (text) {
                var output = text;
                for (var i = 0; i < 1; i++) {
                    //1.首先动态创建一个容器标签元素，如DIV
                    var temp = document.createElement("div");
                    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
                    temp.innerHTML = text;
                    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
                    output = temp.innerText || temp.textContent;
                    temp = null;
                    i = i - 1;
                    if (output == text) {
                        i = i + 1;
                    }
                    text = output;
                }
                return output;
            }
        };
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleList"),
            type: "POST",
            dataType: "json",
            async: false,
            data: {
                mode: element.mode,
                modeValue: element.modevalue,
                channelId: element.channelId,
                count: element.count,
                pageIndex: element.xtag.runtime.pageIndex
            },
            success: function (result) {
                if (result) {
                    $(titleText).text(result.TitleName);
                    if (result.IsLastPage) {
                        $(loadmore).hide();
                    }
                    if (result.Items.length == 0) {
                        $(container).empty();
                    }
                    result.Items.forEach(function (item) {
                        var li = document.createElement("li");
                        $(li).addClass("j-list");
                        $(li).addClass("clearfix");
                        $(listContainer).append(li);
                        var dl = document.createElement("dl");
                        $(li).append(dl);
                        var dt = document.createElement("dt");
                        $(dl).append(dt);
                        var imgLink = document.createElement("a");
                        $(dt).append(imgLink);
                        var img = document.createElement("img");
                        if (item.ImageId != "" && item.ImageId != null) {
                            $(img).attr("src", _this.resolveUrl(element, "~/File?id=" + item.ImageId));
                        }
                        $(imgLink).append(img);
                        var dd = document.createElement("dd");
                        $(dl).append(dd);
                        var h3 = document.createElement("h3");
                        $(dd).append(h3);
                        _super.prototype.AddControl.call(_this, "Gf-FeTemplate-Component-Character");
                        var character = document.createElement("Gf-FeTemplate-Component-Character");
                        $(h3).append(character);
                        var options = {
                            articleid: item.Id,
                            icon: "SmallIcon"
                        };
                        $(character).feComponentCharacter(options);
                        character["init"]();
                        $(character).feComponentCharacter("CharacterClick", function (id) {
                            if (element.xtag.eventHandlers.listCharacterClick) {
                                element.xtag.eventHandlers.listCharacterClick(id);
                            }
                        });
                        var listTitleLink = document.createElement("a");
                        $(listTitleLink).attr("href", "#");
                        $(listTitleLink).text(item.Title);
                        $(listTitleLink).addClass("title");
                        $(h3).append(listTitleLink);
                        var id = item.Id;
                        $(listTitleLink).click(function () {
                            if (element.xtag.eventHandlers.titleClick) {
                                element.xtag.eventHandlers.titleClick(id);
                            }
                        });
                        var p = document.createElement("p");
                        $(p).text(HtmlUtil.htmlDecode(item.Content));
                        $(dd).append(p);
                        var category = document.createElement("div");
                        $(category).addClass("j-category");
                        $(dd).append(category);
                        var ul;
                        ul = document.createElement("ul");
                        $(category).append(ul);
                        li = document.createElement("li");
                        $(ul).append(li);
                        var em = document.createElement("em");
                        $(em).addClass("j-icon1");
                        $(li).append(em);
                        $(li).append(item.CreatedOn);
                        li = document.createElement("li");
                        $(li).addClass("j-min");
                        $(ul).append(li);
                        em = document.createElement("em");
                        $(em).addClass("j-icon2");
                        $(li).append(em);
                        var a;
                        a = document.createElement("a");
                        $(a).attr("href", "#");
                        $(a).text(item.CategoryName);
                        $(li).append(a);
                        $(a).click(function () {
                            if (element.xtag.eventHandlers.categoryClick) {
                                element.xtag.eventHandlers.categoryClick(item.CategoryId);
                            }
                        });
                        li = document.createElement("li");
                        $(li).addClass("j-lists");
                        $(ul).append(li);
                        em = document.createElement("em");
                        $(em).addClass("j-icon3");
                        $(li).append(em);
                        var count = item.Tags.length;
                        if (count > 3) {
                            count = 3;
                        }
                        for (var i = 0; i < count; i++) {
                            a = document.createElement("a");
                            $(a).attr("href", "#");
                            $(a).attr("title", item.Tags[i]);
                            $(a).text(item.Tags[i]);
                            $(a).attr("tagText", item.Tags[i]);
                            $(li).append(a);
                            $(a).click(function (event) {
                                if (element.xtag.eventHandlers.tagClick) {
                                    element.xtag.eventHandlers.tagClick($(event.target).attr("tagText"));
                                }
                            });
                        }
                    });
                }
            }
        });
    };
    //构建组件
    FeComponentArticleCategoryDetailsList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCategoryDetailsList");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleCategoryDetailsList;
}(FeTemplateComponentBase));
/*
****属性*****

****方法****

****事件****

*/
var FeComponentArticleCategoryImageList = (function (_super) {
    __extends(FeComponentArticleCategoryImageList, _super);
    function FeComponentArticleCategoryImageList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentArticleCategoryImageList.prototype.defaultOptions = function () {
        var options = _super.prototype.defaultOptions.call(this);
        return options;
    };
    //设置选项前
    FeComponentArticleCategoryImageList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCategoryImageList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleCategoryImageList.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleCategoryImageList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCategoryImageList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCategoryImageList.prototype.extendName = function () {
        return "feComponentArticleCategoryImageList";
    };
    //扩展方法实现
    FeComponentArticleCategoryImageList.prototype.extendFunction = function (element, method, args) {
    };
    //重新加载
    FeComponentArticleCategoryImageList.prototype.reload = function (element) {
    };
    //构建组件
    FeComponentArticleCategoryImageList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCategoryImageList");
    };
    return FeComponentArticleCategoryImageList;
}(FeComponentArticleCategoryTitleList));
/*
继承至FeComponentArticleCategoryTitleImageList多有属性，方法和事件

****属性*****

****方法****

****事件****

*/
var FeComponentArticleCategoryNewestTitleList = (function (_super) {
    __extends(FeComponentArticleCategoryNewestTitleList, _super);
    function FeComponentArticleCategoryNewestTitleList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("");
        return _this;
    }
    FeComponentArticleCategoryNewestTitleList.prototype.defaultOptions = function () {
        var options = _super.prototype.defaultOptions.call(this);
        return options;
    };
    //设置选项前
    FeComponentArticleCategoryNewestTitleList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCategoryNewestTitleList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleCategoryNewestTitleList.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleCategoryNewestTitleList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCategoryNewestTitleList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCategoryNewestTitleList.prototype.extendName = function () {
        return "feComponentArticleCategoryNewestTitleList";
    };
    //扩展方法实现
    FeComponentArticleCategoryNewestTitleList.prototype.extendFunction = function (element, method, args) {
        _super.prototype.extendFunction.call(this, element, method, args);
    };
    //重新加载
    FeComponentArticleCategoryNewestTitleList.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        var div = document.createElement("div");
        $(div).addClass("j-tainment j-news-width j-high clearfix");
        $(container).append(div);
        var h3 = document.createElement("h3");
        $(h3).addClass("clearfix");
        $(div).append(h3);
        var span = document.createElement("span");
        $(span).addClass("fl");
        $(h3).append(span);
        var ul = document.createElement("ul");
        $(ul).addClass("js-list");
        $(div).append(ul);
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleList"),
            type: "POST",
            dataType: "json",
            data: {
                mode: "Newest",
                categoryId: element.categoryid,
                count: element.count,
                pageIndex: 1
            },
            success: function (result) {
                $(span).text(result.TitleName);
                result.Items.forEach(function (item) {
                    var li = document.createElement("li");
                    $(ul).append(li);
                    $(li).hover(function () {
                        $(li).find("h2 p:first").addClass("hover");
                    }, function () {
                        $(ul).find("li h2").find("p:first").removeClass("hover");
                    });
                    $(li).click(function () {
                        if (element.xtag.eventHandlers.itemClick) {
                            element.xtag.eventHandlers.itemClick(item.Id);
                        }
                    });
                    var h2 = document.createElement("h2");
                    $(li).append(h2);
                    var p1 = document.createElement("p");
                    $(p1).text(item.Title);
                    $(h2).append(p1);
                    var p2 = document.createElement("p");
                    $(p2).addClass("j-color");
                    $(p2).text(item.Time);
                    $(h2).append(p2);
                });
            }
        });
    };
    //构建组件
    FeComponentArticleCategoryNewestTitleList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCategoryNewestTitleList");
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleCategoryNewestTitleList;
}(FeComponentArticleCategoryTitleImageList));
/*
****属性*****
mode，设置文章分类模式，默认值为“Category”
设置值包括：按分类展示“Category”、展示热点“Hot”、展示头条“Head”、展示推荐“Recommend”
如果设置为“Category”，请同时设置“categoryid”属性
html:<Gf-FeTemplate-Component-ArticleCategoryOutlineImageList mode="Category">
js:$("#articleCategoryOutlineImageList").feComponentArticleCategoryOutlineImageList("mode","Category");
   var mode = $("#articleCategoryOutlineImageList").feComponentArticleCategoryOutlineImageList('options','mode');

count，设置文章呈现数量，默认为“0”，呈现所有。 设置方法同上

categoryid，设置要查询的分类，默认值为“”，顶级分类

****方法****

****事件****
moreClick，点击更多按钮
js:$("#articleCategoryOutlineImageList").feComponentArticleCategoryOutlineImageList("moreClick",function(mode, categoryid){ });

itemClick,点击标题文章事件
js:$("#articleCategoryOutlineImageList").feComponentArticleCategoryOutlineImageList("itemClick",function(id){ });

*/
var FeComponentArticleCategoryOutlineImageList = (function (_super) {
    __extends(FeComponentArticleCategoryOutlineImageList, _super);
    function FeComponentArticleCategoryOutlineImageList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("characterid,count,categoryid");
        return _this;
    }
    FeComponentArticleCategoryOutlineImageList.prototype.defaultOptions = function () {
        var options = {
            characterid: "",
            count: 0,
            categoryid: ''
        };
        return options;
    };
    //设置选项前
    FeComponentArticleCategoryOutlineImageList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCategoryOutlineImageList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleCategoryOutlineImageList.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleCategoryOutlineImageList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCategoryOutlineImageList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCategoryOutlineImageList.prototype.extendName = function () {
        return "feComponentArticleCategoryOutlineImageList";
    };
    //扩展方法实现
    FeComponentArticleCategoryOutlineImageList.prototype.extendFunction = function (element, method, args) {
        if ("itemClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.itemClick = args;
        }
        else if ("moreClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.moreClick = args;
        }
        else if ("setCategoryId" === method) {
            this.SetCategoryId(element, args);
        }
    };
    FeComponentArticleCategoryOutlineImageList.prototype.SetCategoryId = function (element, categoryId) {
        element.categoryid = categoryId;
        this.reload(element);
    };
    //重新加载
    FeComponentArticleCategoryOutlineImageList.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleList"),
            type: "POST",
            dataType: "json",
            data: {
                mode: "Character",
                modevalue: element.characterid,
                categoryId: element.categoryid,
                count: element.count,
                pageIndex: 1
            },
            success: function (result) {
                if (result) {
                    var div = document.createElement("div");
                    $(div).addClass("j-tainment");
                    $(div).addClass("j-hot-news");
                    $(div).addClass("clearfix");
                    $(container).append(div);
                    var h3 = document.createElement("h3");
                    $(h3).addClass("clearfix");
                    $(div).append(h3);
                    var span = document.createElement("span");
                    $(span).addClass("fl");
                    $(span).text(result.TitleName);
                    $(h3).append(span);
                    span = document.createElement("span");
                    $(span).addClass("fr");
                    $(h3).append(span);
                    var a_1 = document.createElement("a");
                    $(a_1).attr("href", "#");
                    $(a_1).text("更多>");
                    $(span).append(a_1);
                    $(a_1).click(function () {
                        if (element.xtag.eventHandlers.moreClick) {
                            element.xtag.eventHandlers.moreClick(element.characterid);
                        }
                    });
                    var ul_1 = document.createElement("ul");
                    $(ul_1).addClass("js-list");
                    $(div).append(ul_1);
                    result.Items.forEach(function (item) {
                        var li = document.createElement("li");
                        $(ul_1).append(li);
                        var h2 = document.createElement("h2");
                        $(li).append(h2);
                        var p = document.createElement("p");
                        $(p).text(item.Title);
                        $(h2).append(p);
                        $(p).click(function () {
                            if (element.xtag.eventHandlers.itemClick) {
                                element.xtag.eventHandlers.itemClick(item.Id);
                            }
                        });
                        var dl = document.createElement("dl");
                        $(li).append(dl);
                        $(p).mouseover(function (event) {
                            $(ul_1).find("li dl").hide();
                            $(event.target).parent().next().show();
                        });
                        var dt = document.createElement("dt");
                        $(dl).append(dt);
                        a_1 = document.createElement("a");
                        $(a_1).attr("href", "#");
                        if (item.ImageId != "" && item.ImageId != null) {
                            $(a_1).append("<img src='" + _this.resolveUrl(element, "~/File?id=" + item.ImageId) + "'>");
                        }
                        $(dt).append(a_1);
                        $(a_1).click(function () {
                            if (element.xtag.eventHandlers.itemClick) {
                                element.xtag.eventHandlers.itemClick(item.Id);
                            }
                        });
                        var dd = document.createElement("dd");
                        $(dl).append(dd);
                        var b = document.createElement("b");
                        $(b).text(item.Content);
                        $(dd).append(b);
                        $(b).click(function () {
                            if (element.xtag.eventHandlers.itemClick) {
                                element.xtag.eventHandlers.itemClick(item.Id);
                            }
                        });
                    });
                    $(ul_1).find(":first h2 p").trigger("mouseover");
                }
            }
        });
    };
    //构建组件
    FeComponentArticleCategoryOutlineImageList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCategoryOutlineImageList");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleCategoryOutlineImageList;
}(FeTemplateComponentBase));
/*
****属性*****
url，设置组件获取频道列表的url
html:<Gf-FeTemplate-Component-ArticleChannelNavigate url="~/FeChannel/GetChannelList"> 默认值为“~/FeChannel/GetChannelList”
js:$("#feComponentArticleChannelNavigate").feComponentArticleChannelNavigate({url:'~/FeChannel/GetChannelList'});     var url = $("#feComponentArticleChannelNavigate").feComponentArticleChannelNavigate('options','url');

homeurl，设置首页的url，默认值为“~/FeArticle/FrontIndex”

****方法****
selectById，根据id选择导航项，并且触发selectcategoryChanged事件
js:$("#feComponentArticleChannelNavigate").feComponentArticleChannelNavigate("selectById","id");

selectByIndex，根据索引选择导航项，并且触发selectcategoryChanged事件
js:$("#feComponentArticleChannelNavigate").feComponentArticleChannelNavigate("selectByIndex",0);

selectedItem，获取当前选择项
js:var item = $("#feComponentArticleChannelNavigate").feComponentArticleChannelNavigate("selectedItem");

****事件****
selectcategoryChanged
js:$("#feComponentArticleChannelNavigate").feComponentArticleChannelNavigate("selectcategoryChanged",function(index,id,text,url){});
*/
var FeComponentArticleChannelNavigate = (function (_super) {
    __extends(FeComponentArticleChannelNavigate, _super);
    function FeComponentArticleChannelNavigate(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("channelid,categoryid");
        return _this;
    }
    FeComponentArticleChannelNavigate.prototype.defaultOptions = function () {
        var options = {
            channelid: '',
            categoryid: ''
        };
        return options;
    };
    //设置选项前
    FeComponentArticleChannelNavigate.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleChannelNavigate.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleChannelNavigate.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleChannelNavigate";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleChannelNavigate.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleChannelNavigate.prototype.extendName = function () {
        return "feComponentArticleChannelNavigate";
    };
    //扩展方法实现
    FeComponentArticleChannelNavigate.prototype.extendFunction = function (element, method, args) {
        if ("selectById" === method && typeof args === "string") {
            this.selectById(element, args);
        }
        else if ("selectcategoryChanged" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.selectcategoryChanged = args;
        }
        else if ("setCategoryId" === method) {
            this.SetCategoryId(element, args);
        }
    };
    FeComponentArticleChannelNavigate.prototype.SetCategoryId = function (element, categoryId) {
        if (categoryId == "") {
            element.categoryid = element.channelid;
        }
        else {
            element.categoryid = categoryId;
        }
        this.reload(element);
    };
    //重新加载
    FeComponentArticleChannelNavigate.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        var div_menu = document.createElement("div");
        $(div_menu).addClass("j-nav-menu");
        $(container).append(div_menu);
        var ul = document.createElement("ul");
        $(div_menu).append(ul);
        var items = [];
        $.ajax({
            url: this.resolveUrl(element, '~/FeChannel/GetCategoryList'),
            type: 'POST',
            dataType: "json",
            data: {
                channelId: element.channelid,
            },
            async: false,
            success: function (datas) {
                datas.forEach(function (data) {
                    items.push({
                        id: data.Id.replace("@", "_quanquan_"),
                        name: data.Name,
                        parentid: data.ParentId.replace("@", "_quanquan_")
                    });
                });
            }
        });
        var li;
        var a;
        var div;
        var p;
        var span;
        if (items.length > 0) {
            //频道首页
            li = document.createElement("li");
            //$(li).addClass("selectItem");
            $(ul).append(li);
            var div_a = document.createElement("div");
            $(li).append(div_a);
            a = document.createElement("a");
            $(a).attr("href", "#");
            $(a).attr("categoryId", items[0].id);
            $(a).text("频道首页");
            $(div_a).click(function () {
                _this.selectById(element, items[0].id);
            });
            $(div_a).append(a);
            if (element.categoryid.replace("@", "_quanquan_") == items[0].id.replace("@", "_quanquan_") || element.categoryid == "") {
                $(li).addClass("selectItem");
                element.categoryid = items[0].id.replace("_quanquan_", "@");
            }
            div = document.createElement("div");
            $(div).addClass("subnav");
            $(li).append(div);
            p = document.createElement("p");
            $(div).append(p);
        }
        var index = 0;
        var div_more = document.createElement("div");
        $(div_more).addClass("j-nav-more");
        //$(div_menu).append(div_more);
        var dl = document.createElement("dl");
        $(div_more).append(dl);
        var dt = document.createElement("dt");
        $(dt).text("更多");
        $(dl).append(dt);
        var i = document.createElement("i");
        $(i).addClass("j-icon");
        $(dt).append(i);
        var dd = document.createElement("dd");
        $(dd).addClass("hidden");
        $(dl).append(dd);
        var _loop_2 = function (i_1) {
            if (items[i_1].parentid == items[0].id) {
                index = index + 1;
                if (index < 10) {
                    li = document.createElement("li");
                    $(ul).append(li);
                    var div_a = document.createElement("div");
                    $(li).append(div_a);
                    a = document.createElement("a");
                    $(a).attr("href", "#");
                    $(a).attr("categoryId", items[i_1].id);
                    $(a).text(items[i_1].name);
                    $(div_a).click(function () {
                        _this.selectById(element, items[i_1].id);
                    });
                    $(div_a).append(a);
                    //$(li).hover(() => {
                    //    $(ul).find("li").removeClass("selectItem");
                    //    $(li).addClass("selectItem");
                    //}, () => {
                    //    $(ul).find("li").removeClass("selectItem");
                    //});
                    if (element.categoryid.replace("@", "_quanquan_") == items[i_1].id.replace("@", "_quanquan_")) {
                        $(ul).find("li").removeClass("selectItem");
                        $(li).addClass("selectItem");
                    }
                    div = document.createElement("div");
                    $(div).addClass("subnav");
                    $(li).append(div);
                    p = document.createElement("p");
                    $(div).append(p);
                    span = document.createElement("span");
                    $(p).append(span);
                    var _loop_3 = function (j) {
                        if (items[i_1].id == items[j].parentid) {
                            a = document.createElement("a");
                            $(a).attr("href", "#");
                            $(a).attr("categoryId", items[j].id);
                            $(a).click(function () {
                                _this.selectById(element, items[j].id);
                            });
                            $(a).text(items[j].name);
                            $(span).append(a);
                            if (element.categoryid.replace("@", "_quanquan_") == items[j].id.replace("@", "_quanquan_")) {
                                $(ul).find("li").removeClass("selectItem");
                                $(li).addClass("selectItem");
                                $(a).addClass("selectItem");
                            }
                            //$(a).hover(() => {
                            //    $(ul).find("a").removeClass("selectItem");
                            //    $(li).addClass("selectItem");
                            //}, () => {
                            //    $(ul).find("a").removeClass("selectItem");
                            //});
                        }
                    };
                    for (var j = 0; j < items.length; j++) {
                        _loop_3(j);
                    }
                }
                else {
                    a = document.createElement("a");
                    $(a).attr("href", "#");
                    $(a).attr("categoryId", items[i_1].id);
                    $(a).click(function () {
                        _this.selectById(element, items[i_1].id);
                    });
                    $(a).text(items[i_1].name);
                    $(dd).append(a);
                }
            }
        };
        for (var i_1 = 0; i_1 < items.length; i_1++) {
            _loop_2(i_1);
        }
        if (index > 9) {
            $(div_menu).append(div_more);
        }
        element.xtag.runtime.items = items;
    };
    //构建组件
    FeComponentArticleChannelNavigate.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        $(container).addClass("FeComponentArticleChannelNavigate");
        $(container).addClass("clearfix");
        this.reload(element);
    };
    FeComponentArticleChannelNavigate.prototype.selectById = function (element, id) {
        var container = this.componentContainer(element);
        $(container).find(".selectItem").each(function (index, item) {
            $(item).removeClass("selectItem");
        });
        if (id) {
            var categoryId = id.replace("@", "_quanquan_");
            var elements = $(container).find("[categoryId=" + categoryId + "]");
            if (elements.length > 0) {
                $(elements[0]).addClass("selectItem");
                $(elements[0]).parent().parent().addClass("selectItem");
                $(elements[0]).parent().parent().parent().parent().addClass("selectItem");
            }
            categoryId = id.replace("_quanquan_", "@");
            element.categoryid = categoryId;
            if (element.xtag.runtime.selectId != id) {
                element.xtag.runtime.selectId = id;
                if (element.xtag.eventHandlers.selectcategoryChanged) {
                    element.xtag.eventHandlers.selectcategoryChanged(categoryId);
                }
                else {
                    alert("方法失效,bug待处理,未找到规律");
                }
            }
        }
    };
    return FeComponentArticleChannelNavigate;
}(FeTemplateComponentBase));
/*
****属性*****
mode，设置文章分类模式，默认值为“Category”
设置值包括：按分类展示“Category”、展示热点“Hot”、展示头条“Head”、展示推荐“Recommend”
如果设置为“Category”，请同时设置“categoryid”属性
html:<Gf-FeTemplate-Component-ArticleCategoryTitleImageList mode="Category">
js:$("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList("mode","Category");
   var mode = $("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList('options','mode');

count，设置文章呈现数量，默认为“0”，呈现所有。 设置方法同上

categoryid，设置要查询的分类，默认值为“”，顶级分类

****方法****

****事件****
moreClick，点击更多按钮
js:$("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList("moreClick",function(mode, categoryid){ });

itemClick,点击标题文章事件
js:$("#articleCategoryTitleImageList").feComponentArticleCategoryTitleImageList("itemClick",function(id){ });

*/
var FeComponentArticleCharacterTitleImageList = (function (_super) {
    __extends(FeComponentArticleCharacterTitleImageList, _super);
    function FeComponentArticleCharacterTitleImageList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("characterid,count,categoryid,styletype");
        return _this;
    }
    FeComponentArticleCharacterTitleImageList.prototype.defaultOptions = function () {
        var options = {
            characterid: "",
            count: 0,
            categoryid: '',
            styletype: "0"
        };
        return options;
    };
    //设置选项前
    FeComponentArticleCharacterTitleImageList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleCharacterTitleImageList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentArticleCharacterTitleImageList.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-ArticleCharacterTitleImageList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleCharacterTitleImageList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleCharacterTitleImageList.prototype.extendName = function () {
        return "feComponentArticleCharacterTitleImageList";
    };
    //扩展方法实现
    FeComponentArticleCharacterTitleImageList.prototype.extendFunction = function (element, method, args) {
        if ("itemClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.itemClick = args;
        }
        else if ("moreClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.moreClick = args;
        }
        else {
            _super.prototype.extendFunctionProxy.call(this, element, method, args);
        }
    };
    //重新加载
    FeComponentArticleCharacterTitleImageList.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleList"),
            type: "POST",
            dataType: "json",
            data: {
                mode: "Character",
                modevalue: element.characterid,
                categoryId: element.categoryid,
                count: element.count,
                pageIndex: 1
            },
            success: function (result) {
            }
        });
    };
    FeComponentArticleCharacterTitleImageList.prototype.getelement = function (element, result) {
    };
    //构建组件
    FeComponentArticleCharacterTitleImageList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleCharacterTitleImageList" + element.styletype);
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleCharacterTitleImageList;
}(FeTemplateComponentBase));
/*
****属性*****

count，设置文章呈现数量，默认为“0”，呈现所有。
html:<Gf-FeTemplate-Component-ArticleClickRankList>
js:$("#articleClickRankList").feComponentArticleClickRankList("count","count");
   var count = $("#articleClickRankList").feComponentArticleClickRankList('options','count');


categoryid，设置要查询的分类，默认值为“”，顶级分类

****方法****

****事件****
itemClick,点击标题文章事件
js:$("#articleClickRankList").feComponentArticleClickRankList("itemClick",function(id){ });

*/
var FeComponentArticleClickRankList = (function (_super) {
    __extends(FeComponentArticleClickRankList, _super);
    function FeComponentArticleClickRankList(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("count,categoryid");
        return _this;
    }
    FeComponentArticleClickRankList.prototype.defaultOptions = function () {
        var options = {
            count: 0,
            categoryid: ''
        };
        return options;
    };
    //设置选项前
    FeComponentArticleClickRankList.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleClickRankList.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentArticleClickRankList.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ArticleClickRankList";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleClickRankList.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleClickRankList.prototype.extendName = function () {
        return "feComponentArticleClickRankList";
    };
    //扩展方法实现
    FeComponentArticleClickRankList.prototype.extendFunction = function (element, method, args) {
        if ("itemClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.itemClick = args;
        }
        else {
            _super.prototype.extendFunctionProxy.call(this, element, method, args);
        }
    };
    //重新加载
    FeComponentArticleClickRankList.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        var div = document.createElement("div");
        $(div).addClass("j-news-nine");
        $(container).append(div);
        //title部分
        var divtitle = document.createElement("div");
        $(divtitle).addClass("j-nine-title");
        $(div).append(divtitle);
        var ul = document.createElement("ul");
        $(divtitle).append(ul);
        for (var i = 0; i < 3; i++) {
            var li = document.createElement("li");
            if (i == 0) {
                $(li).addClass("cur");
            }
            else {
                $(li).addClass("j-lines");
            }
            var span = document.createElement("span");
            switch (i) {
                case 0:
                    $(span).text("昨日点击排行");
                    break;
                case 1:
                    $(span).text("今日点击排行");
                    break;
                case 2:
                    $(span).text("本周热榜");
                    break;
            }
            $(li).append(span);
            if (i != 2) {
                var b = document.createElement("b");
                $(b).addClass("j-line-li");
                $(b).text("|");
                $(li).append(b);
            }
            $(ul).append(li);
        }
        //绑定事件
        $(divtitle).find("li").hover(function (event) {
            var index = $(event.delegateTarget).index();
            $(divtitle).find("li").eq(index).addClass("cur").siblings().removeClass("cur");
            $(".j-nine-box").eq(index).children().show();
            $(".j-nine-box").eq(index).siblings(".j-nine-box").children().hide();
        });
        var _loop_4 = function (i) {
            //content内容
            var divbox = document.createElement("div");
            $(divbox).addClass("j-nine-box");
            $(div).append(divbox);
            var divboxlist = document.createElement("div");
            $(divboxlist).addClass("j-nine-list");
            if (i === 0) {
                $(divboxlist).css("display", "block");
            }
            else {
                $(divboxlist).css("display", "none");
            }
            $(divbox).append(divboxlist);
            var divboxul = document.createElement("ul");
            $(divboxlist).append(divboxul);
            $.ajax({
                url: this_1.resolveUrl(element, "~/FeArticle/GetArticleHitsRankList"),
                type: "POST",
                dataType: "json",
                data: {
                    categoryId: element.categoryid,
                    count: element.count,
                    queryType: i.toString()
                },
                success: function (result) {
                    if (result) {
                        result.Items.forEach(function (item, index, c) {
                            var li = document.createElement("li");
                            $(divboxul).append(li);
                            var a = document.createElement("a");
                            $(a).attr("href", "#");
                            $(li).append(a);
                            $(a).append("<em " + (index < 3 ? "class=\"on\"" : "") + " > " + (index + 1) + " </em>" + item.Title);
                            $(a).click(function () {
                                if (element.xtag.eventHandlers.itemClick) {
                                    element.xtag.eventHandlers.itemClick(item.Id);
                                }
                            });
                        });
                    }
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            _loop_4(i);
        }
        $(divtitle).find("li").trigger("hover");
    };
    //构建组件
    FeComponentArticleClickRankList.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleClickRankList");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleClickRankList;
}(FeTemplateComponentBase));
/*
****属性*****

articleid，设置文章Id

****方法****

****事件****

tagClick，点击分类事件
js:$("#ArticleHomeDetail").feComponentArticleHomeDetail("tagClick",function(tag){ });
*/
var FeComponentArticleHomeDetail = (function (_super) {
    __extends(FeComponentArticleHomeDetail, _super);
    function FeComponentArticleHomeDetail(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("articleid");
        return _this;
    }
    FeComponentArticleHomeDetail.prototype.defaultOptions = function () {
        var options = {
            articleid: ''
        };
        return options;
    };
    //设置选项前
    FeComponentArticleHomeDetail.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleHomeDetail.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentArticleHomeDetail.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-ArticleHomeDetail";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleHomeDetail.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleHomeDetail.prototype.extendName = function () {
        return "feComponentArticleHomeDetail";
    };
    //扩展方法实现
    FeComponentArticleHomeDetail.prototype.extendFunction = function (element, method, args) {
        if ("tagClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.tagClick = args;
        }
        else if ("detailCharacterClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.detailCharacterClick = args;
        }
    };
    //重新加载
    FeComponentArticleHomeDetail.prototype.reload = function (element) {
        var container = this.componentContainer(element);
        $(container).empty();
        this.loadData(element, container);
    };
    FeComponentArticleHomeDetail.prototype.loadData = function (element, container) {
        var _this = this;
        $.ajax({
            url: this.resolveUrl(element, "~/FeArticle/GetArticleDetail"),
            type: "POST",
            dataType: "json",
            data: {
                articleId: element.articleid
            },
            success: function (result) {
                if (result) {
                    var div_details = document.createElement("div");
                    $(div_details).addClass("j-info-details");
                    $(div_details).addClass("j-covers");
                    $(div_details).addClass("clearfix");
                    $(container).append(div_details);
                    var div_region = document.createElement("div");
                    $(div_region).addClass("j-region-con");
                    $(div_region).addClass("j-covers");
                    $(div_region).addClass("clearfix");
                    $(div_details).append(div_region);
                    var div_con = document.createElement("div");
                    $(div_con).addClass("j-con-fl");
                    $(div_con).addClass("fl");
                    $(div_region).append(div_con);
                    //h3_title
                    var h3_title = document.createElement("h3");
                    $(h3_title).addClass("j-title");
                    $(div_con).append(h3_title);
                    _super.prototype.AddControl.call(_this, "Gf-FeTemplate-Component-Character");
                    var character = document.createElement("Gf-FeTemplate-Component-Character");
                    $(h3_title).append(character);
                    var options = {
                        articleid: result.Id,
                        icon: "BigIcon"
                    };
                    $(character).feComponentCharacter(options);
                    character["init"]();
                    $(character).feComponentCharacter("CharacterClick", function (id) {
                        if (element.xtag.eventHandlers.detailCharacterClick) {
                            element.xtag.eventHandlers.detailCharacterClick(id);
                        }
                    });
                    var h3_span = document.createElement("span");
                    $(h3_span).addClass("title");
                    $(h3_span).text(result.TitleValue);
                    $(h3_title).append(h3_span);
                    //$(h3_title).append(result.TitleValue);
                    //div_source
                    var div_source = document.createElement("div");
                    $(div_source).addClass("j-source");
                    $(div_source).addClass("fl");
                    $(div_con).append(div_source);
                    var ul = document.createElement("ul");
                    $(div_source).append(ul);
                    var li1 = document.createElement("li");
                    $(li1).text("编辑：" + result.Author);
                    $(ul).append(li1);
                    var li2 = document.createElement("li");
                    if (result.From == null) {
                        $(li2).text("来源：未知");
                    }
                    else {
                        $(li2).text("来源：" + result.From);
                    }
                    $(ul).append(li2);
                    var li3 = document.createElement("li");
                    $(li3).text("时间：" + result.CreatedOn);
                    $(ul).append(li3);
                    //div_about
                    var div_about = document.createElement("div");
                    $(div_about).addClass("j-about");
                    $(div_about).addClass("clearfix");
                    $(div_con).append(div_about);
                    var p = document.createElement("p");
                    $(p).addClass("imgp");
                    $(div_about).append(p);
                    var img = document.createElement("img");
                    if (result.ImageFileId != null && result.ImageFileId != "") {
                        $(img).attr("src", _this.resolveUrl(element, "~/File?id=" + result.ImageFileId));
                    }
                    $(p).append(img);
                    $(div_about).append(result.Content);
                    //div_tags
                    var div_tags = document.createElement("div");
                    $(div_tags).addClass("j-tags");
                    $(div_tags).addClass("clearfix");
                    $(div_con).append(div_tags);
                    var dl = document.createElement("dl");
                    $(div_tags).append(dl);
                    var dt = document.createElement("dt");
                    $(dt).addClass("fl");
                    $(dt).text("标签：");
                    $(dl).append(dt);
                    var dd = document.createElement("dd");
                    $(dl).append(dd);
                    var ul_2 = void 0;
                    ul_2 = document.createElement("ul");
                    $(dd).append(ul_2);
                    var arr = result.Tag.split(',');
                    var a_2 = void 0;
                    var li_2 = void 0;
                    for (var i = 0; i < arr.length; i++) {
                        a_2 = document.createElement("a");
                        li_2 = document.createElement("li");
                        $(a_2).attr("href", "#");
                        $(a_2).text(arr[i]);
                        $(li_2).append(a_2);
                        $(a_2).click(function (event) {
                            if (element.xtag.eventHandlers.tagClick) {
                                element.xtag.eventHandlers.tagClick($(event.target).text());
                            }
                        });
                        $(ul_2).append(li_2);
                    }
                    var div_edit = document.createElement("div");
                    $(div_edit).addClass("j-edit-size");
                    $(div_edit).addClass("clearfix");
                    $(div_con).append(div_edit);
                    var span = document.createElement("span");
                    $(span).text("编辑：" + result.Author);
                    $(span).addClass("j-name");
                    $(span).addClass("fl");
                    $(div_edit).append(span);
                    var div6 = document.createElement("div");
                    $(div6).addClass("j-functions");
                    $(div6).addClass("fr");
                    $(div_edit).append(div6);
                    var ul_3 = void 0;
                    ul_3 = document.createElement("ul");
                    $(ul_3).addClass("clearfix");
                    $(div6).append(ul_3);
                    //let li_3;
                    //li_3 = document.createElement("li");
                    //$(ul_3).append(li_3);
                    //let em_3;
                    //em_3 = document.createElement("em");
                    //$(em_3).addClass("j-icon1");
                    //$(li_3).append(em_3);
                    //$(li_3).append(result.CommentNum);
                    var li_4 = void 0;
                    li_4 = document.createElement("li");
                    $(li_4).addClass("j-line");
                    $(ul_3).append(li_4);
                    var em_4 = void 0;
                    em_4 = document.createElement("em");
                    $(em_4).addClass("j-icon2");
                    $(li_4).append(em_4);
                    $(li_4).append(result.HitsNum);
                    var li_5 = void 0;
                    li_5 = document.createElement("li");
                    $(li_5).text("分享到：");
                    $(ul_3).append(li_5);
                    var li_6 = document.createElement("li");
                    $(li_6).addClass("f-pr");
                    $(ul_3).append(li_6);
                    var share = document.createElement("Gf-FeTemplate-Component-Share");
                    $(li_6).append(share);
                    _super.prototype.AddControl.call(_this, "Gf-FeTemplate-Component-Share");
                    var li_7 = document.createElement("li");
                    $(ul_3).append(li_7);
                    var returntop = document.createElement("Gf-FeTemplate-Component-Return");
                    $(li_7).append(returntop);
                    _super.prototype.AddControl.call(_this, "Gf-FeTemplate-Component-Return");
                }
            }
        });
    };
    //构建组件
    FeComponentArticleHomeDetail.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleHomeDetail");
        $(container).addClass("clearfix");
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        element.xtag.runtime.pageIndex = 1;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleHomeDetail;
}(FeTemplateComponentBase));
/*
****属性*****
hometext，设置主页导航文本
html:<Gf-FeTemplate-CompositeComponent-ArticleHomeHead hometext="返回商城首页"> 默认值为“返回商城首页”
js:$("#feComponentArticleHomeHead").feComponentArticleHomeHead({hometext:'返回商城首页'});     var hometext = $("#feComponentArticleHomeHead").feComponentArticleHomeHead('options','hometext');

homehref，设置主页的url，默认值为“#”使用方法同上

prompt,搜索框中的提示文本，默认值为“请输入关键词” 使用方法同上
****方法****

****事件****
searchClick，点击搜索按钮触发
js:$("#feComponentArticleHomeHead").feComponentArticleHomeHead("searchClick",function(text){});

*/
var FeComponentArticleHomeHead = (function (_super) {
    __extends(FeComponentArticleHomeHead, _super);
    function FeComponentArticleHomeHead(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("hometext,homehref,prompt");
        return _this;
    }
    FeComponentArticleHomeHead.prototype.defaultOptions = function () {
        var options = {
            hometext: '返回商城首页',
            homehref: '#',
            prompt: '请输入关键词'
        };
        return options;
    };
    //设置选项前
    FeComponentArticleHomeHead.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleHomeHead.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        if ("hometext" === key || "homehref" === key) {
            this.reloadGoHome(element);
        }
        else if ("prompt" === key) {
            this.rebindSeachInput(element);
        }
    };
    //设置当前组件标签名
    FeComponentArticleHomeHead.prototype.getElementName = function () {
        return "Gf-FeTemplate-CompositeComponent-ArticleHomeHead";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleHomeHead.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleHomeHead.prototype.extendName = function () {
        return "feComponentArticleHomeHead";
    };
    //扩展方法实现
    FeComponentArticleHomeHead.prototype.extendFunction = function (element, method, args) {
        if ("searchClick" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.searchClick = args;
        }
    };
    //重新加载
    FeComponentArticleHomeHead.prototype.reload = function (element) {
    };
    //构建组件
    FeComponentArticleHomeHead.prototype.buildComponents = function (element, uniqueId, container) {
        var _this = this;
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        $(container).addClass("FeComponentArticleHomeHead");
        this.reloadGoHome(element);
        this.rebindSeachInput(element);
        var btnSeach = this.findControl(element, "btnSeach");
        $(btnSeach).click(function () {
            if (element.xtag.eventHandlers.searchClick) {
                var txtSeach = _this.findControl(element, "txtSeach");
                var text = $(txtSeach).val();
                if (text === element.prompt) {
                    text = "";
                }
                element.xtag.eventHandlers.searchClick(text);
            }
        });
    };
    FeComponentArticleHomeHead.prototype.rebindSeachInput = function (element) {
        var txtSeach = this.findControl(element, "txtSeach");
        $(txtSeach).val(element.prompt);
        $(txtSeach).unbind("focus");
        $(txtSeach).unbind("blur");
        $(txtSeach).focus(function (event) {
            var handler = event.delegateTarget;
            if ($(handler).val() === element.prompt) {
                $(handler).val("");
            }
            $(handler).css('color', '#666');
        });
        $(txtSeach).blur(function (event) {
            var handler = event.delegateTarget;
            if ($(handler).val() === element.prompt || $(handler).val() === '') {
                $(handler).val(element.prompt);
                $(handler).css('color', '#999');
            }
        });
    };
    FeComponentArticleHomeHead.prototype.reloadGoHome = function (element) {
        var goHome = this.findControl(element, "goHome");
        $(goHome).text(element.hometext);
        $(goHome).attr("href", this.resolveUrl(element, element.homehref));
    };
    return FeComponentArticleHomeHead;
}(FeTemplateComponentBase));
/*
****属性*****


****方法****


****事件****

*/
var FeComponentArticleNavigate = (function (_super) {
    __extends(FeComponentArticleNavigate, _super);
    function FeComponentArticleNavigate(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("mode,modevalue");
        return _this;
    }
    FeComponentArticleNavigate.prototype.defaultOptions = function () {
        var options = {
            mode: "",
            modevalue: ""
        };
        return options;
    };
    //设置选项前
    FeComponentArticleNavigate.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentArticleNavigate.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
        this.reload(element);
    };
    //设置当前组件标签名
    FeComponentArticleNavigate.prototype.getElementName = function () {
        return "Gf-FeTemplate-Component-ArticleNavigate";
    };
    //获取当前组件是否自动初始化
    FeComponentArticleNavigate.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentArticleNavigate.prototype.extendName = function () {
        return "feComponentArticleNavigate";
    };
    //扩展方法实现
    FeComponentArticleNavigate.prototype.extendFunction = function (element, method, args) {
        _super.prototype.extendFunctionProxy.call(this, element, method, args);
    };
    //重新加载
    FeComponentArticleNavigate.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        var div = document.createElement("div");
        $(div).addClass("j-their");
        $(div).addClass("j-covers");
        $(div).addClass("clearfix");
        $(container).append(div);
        $.ajax({
            url: this.resolveUrl(element, '~/FeArticle/GetNavigateString'),
            type: 'POST',
            dataType: "json",
            data: {
                mode: element.mode,
                modevalue: element.modevalue
            },
            async: false,
            success: function (datas) {
                var items = eval('(' + datas.NavigateString + ')');
                ;
                if (items && items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        if (i !== 0) {
                            $(div).append("<label>></label>");
                        }
                        if (i !== items.length - 1) {
                            if (items[i].url) {
                                var a = document.createElement("a");
                                $(a).attr("href", _this.resolveUrl(element, items[i].url));
                                $(a).text(items[i].text);
                                $(div).append(a);
                            }
                            else {
                                $(div).append("<label>" + items[i].text + "</label>");
                            }
                        }
                        else {
                            $(div).append("<label class='j-color'>" + items[i].text + "</label>");
                        }
                    }
                }
            }
        });
    };
    //构建组件
    FeComponentArticleNavigate.prototype.buildComponents = function (element, uniqueId, container) {
        $(container).addClass("FeComponentArticleNavigate");
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        this.reload(element);
    };
    return FeComponentArticleNavigate;
}(FeTemplateComponentBase));
/*
****属性*****
url，设置组件获取频道列表的url
html:<Gf-FeTemplate-Component-ChannelNavigate url="~/FeChannel/GetChannelList"> 默认值为“~/FeChannel/GetChannelList”
js:$("#feComponentChannelNavigate").feComponentChannelNavigate({url:'~/FeChannel/GetChannelList'});     var url = $("#feComponentChannelNavigate").feComponentChannelNavigate('options','url');

homeurl，设置首页的url，默认值为“~/FeArticle/FrontIndex”

****方法****
selectById，根据id选择导航项，并且触发selectChanged事件
js:$("#feComponentChannelNavigate").feComponentChannelNavigate("selectById","id");

selectByIndex，根据索引选择导航项，并且触发selectChanged事件
js:$("#feComponentChannelNavigate").feComponentChannelNavigate("selectByIndex",0);

selectedItem，获取当前选择项
js:var item = $("#feComponentChannelNavigate").feComponentChannelNavigate("selectedItem");

****事件****
selectChanged
js:$("#feComponentChannelNavigate").feComponentChannelNavigate("selectChanged",function(index,id,text,url){});
*/
var FeComponentChannelNavigate = (function (_super) {
    __extends(FeComponentChannelNavigate, _super);
    function FeComponentChannelNavigate(extension) {
        var _this = _super.call(this, extension) || this;
        _this.addProperties("url,homeurl");
        return _this;
    }
    FeComponentChannelNavigate.prototype.defaultOptions = function () {
        var options = {
            url: '~/FeChannel/GetChannelList',
            homeurl: '~/FeArticle/FrontIndex'
        };
        return options;
    };
    //设置选项前
    FeComponentChannelNavigate.prototype.beforeSetOption = function (element, key, oldValue, newVaule) {
        return true;
    };
    //设置选项后
    FeComponentChannelNavigate.prototype.afterSetOption = function (element, key, oldValue, newVaule) {
    };
    //设置当前组件标签名
    FeComponentChannelNavigate.prototype.getElementName = function () {
        //return "Gf-FeTemplate-CompositeComponent-Template";
        return "Gf-FeTemplate-Component-ChannelNavigate";
    };
    //获取当前组件是否自动初始化
    FeComponentChannelNavigate.prototype.getAutoInit = function () {
        return true;
    };
    //扩展名，自动注册jquery扩展方法的名称，可以让前端统一使用 $("#id").extendName(method, args)方式绑定组件的方法和事件
    //如果不需要jquery扩展，返回空即可。
    FeComponentChannelNavigate.prototype.extendName = function () {
        return "feComponentChannelNavigate";
    };
    //扩展方法实现
    FeComponentChannelNavigate.prototype.extendFunction = function (element, method, args) {
        if ("selectById" === method && typeof args === "string") {
            this.selectById(element, args);
        }
        else if ("selectByIndex" === method && typeof args === "number") {
            this.selectByIndex(element, args);
        }
        else if ("selectChanged" === method && $.isFunction(args)) {
            element.xtag.eventHandlers.selectChanged = args;
        }
        else if ("selectedItem" === method) {
            return element.xtag.runtime.items[element.xtag.runtime.selectIndex];
        }
        return null;
    };
    //重新加载
    FeComponentChannelNavigate.prototype.reload = function (element) {
        var _this = this;
        var container = this.componentContainer(element);
        $(container).empty();
        var ul = document.createElement("ul");
        $(ul).addClass("clearfix");
        $(container).append(ul);
        var items = [
            { text: "零售", url: "#", id: "0" },
            { text: "O2O", url: "#", id: "1" },
            { text: "跨境电商", url: "#", id: "2" },
            { text: "移动电商", url: "#", id: "3" },
            { text: "国际电商", url: "#", id: "4" },
            { text: "B2B", url: "#", id: "5" },
            { text: "品牌", url: "#", id: "6" },
            { text: "分销", url: "#", id: "7" },
            { text: "多用户", url: "#", id: "8" },
            { text: "P2P金融", url: "#", id: "9" },
            { text: "CRM", url: "#", id: "10" },
            { text: "ERP", url: "#", id: "11" },
            { text: "WMS", url: "#", id: "12" },
            { text: "TMS", url: "#", id: "13" },
            { text: "IT社交", url: "#", id: "14" }
        ];
        items = [];
        $.ajax({
            url: this.resolveUrl(element, element.url),
            type: 'POST',
            dataType: "json",
            async: false,
            success: function (datas) {
                datas.forEach(function (data) {
                    var id = data.Id.replace("@", "_quanquan_");
                    items.push({
                        text: data.Name,
                        url: _this.resolveUrl(element, data.Url),
                        id: id
                    });
                });
            }
        });
        items.splice(0, 0, {
            text: '首页',
            url: this.resolveUrl(element, element.homeurl),
            id: "首页"
        });
        var li;
        var a;
        var index = items.length;
        if (index > 11) {
            index = 11;
        }
        var _loop_5 = function (i) {
            li = document.createElement("li");
            $(li).attr("recordId", items[i].id);
            $(ul).append(li);
            a = document.createElement("a");
            $(a).attr("href", "#");
            $(a).click(function () {
                _this.selectById(element, items[i].id);
            });
            $(a).text(items[i].text);
            $(li).append(a);
        };
        for (var i = 0; i < index; i++) {
            _loop_5(i);
        }
        if (items.length > 11) {
            var more = document.createElement("div");
            $(more).addClass("more");
            $(container).append(more);
            var dl = document.createElement("dl");
            $(more).append(dl);
            var dt = document.createElement("dt");
            $(dt).append("更多");
            $(dl).append(dt);
            var img = document.createElement("i");
            $(img).addClass("icon");
            $(dt).append(img);
            var dd = document.createElement("dd");
            $(dl).append(dd);
            var _loop_6 = function (j) {
                a = document.createElement("a");
                $(a).attr("href", "#");
                //$(a).attr("href", this.resolveUrl(element, items[j].url));
                $(a).text(items[j].text);
                $(a).attr("recordId", items[j].id);
                $(a).click(function () {
                    _this.selectById(element, items[j].id);
                });
                $(dd).append(a);
            };
            for (var j = 11; j < items.length; j++) {
                _loop_6(j);
            }
        }
        element.xtag.runtime.items = items;
    };
    //构建组件
    FeComponentChannelNavigate.prototype.buildComponents = function (element, uniqueId, container) {
        //初始化运行时状态集合对象
        element.xtag.runtime = {};
        //初始化事件集合对象
        element.xtag.eventHandlers = {};
        $(container).addClass("FeComponentChannelNavigate");
        $(container).addClass("clearfix");
        this.reload(element);
        this.selectByIndex(element, 0);
    };
    FeComponentChannelNavigate.prototype.selectById = function (element, id) {
        var container = this.componentContainer(element);
        var recordId = id.replace("@", "_quanquan_");
        $(container).find(".selectItem").each(function (index, item) {
            $(item).removeClass("selectItem");
        });
        if (id) {
            var elements = $(container).find("[recordId=" + recordId + "]");
            if (elements.length > 0) {
                $(elements[0]).addClass("selectItem");
            }
            var items = element.xtag.runtime.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === recordId) {
                    element.xtag.runtime.selectIndex = i;
                    break;
                    ;
                }
            }
            if (element.xtag.eventHandlers.selectChanged) {
                var index = element.xtag.runtime.selectIndex;
                if (element.xtag.eventHandlers.selectChanged) {
                    recordId = items[index].id.replace("_quanquan_", "@");
                    element.xtag.eventHandlers.selectChanged(index, recordId, items[index].text, items[index].url);
                }
            }
        }
        else {
            element.xtag.runtime.selectIndex = -1;
        }
    };
    FeComponentChannelNavigate.prototype.selectByIndex = function (element, index) {
        if (element.xtag.runtime.items && element.xtag.runtime.items.length > index && index > -1) {
            this.selectById(element, element.xtag.runtime.items[index].id);
        }
    };
    return FeComponentChannelNavigate;
}(FeTemplateComponentBase));
var FeReferenceDialogOptions = (function () {
    function FeReferenceDialogOptions() {
    }
    return FeReferenceDialogOptions;
}());
var FeReferenceDialog = (function () {
    function FeReferenceDialog(options) {
        this.options = options;
        this.dialogId = "#" + options.controlId + "_dialog";
        this.btnCloseId = "#" + options.controlId + "_btnClose";
        this.datagridId = "#" + options.controlId + "_datagrid";
        this.paginationId = "#" + options.controlId + "_pagination";
        this.containerId = "#" + options.controlId + "_container";
        this.refCountId = "#" + options.controlId + "_refCount";
        this.init();
    }
    FeReferenceDialog.prototype.init = function () {
        var _this = this;
        $(this.dialogId).dialog({
            title: '',
            closed: true,
            cache: false,
            modal: true
        });
        $(this.btnCloseId).click(function () {
            $(_this.dialogId).dialog("close");
        });
        $(this.paginationId).pagination({
            pageSize: this.options.pageSize,
            showPageList: false,
            showRefresh: false,
            onSelectPage: function (pageNumber, pageSize) {
                _this.feReferenceDialogLoader(pageNumber);
            }
        });
    };
    FeReferenceDialog.prototype.feReferenceDialogLoader = function (pageNumber) {
        var _this = this;
        var postData = {
            fileId: this.fileId,
            pageSize: this.options.pageSize,
            pageNumber: pageNumber
        };
        var containerWidth = $(this.containerId).width();
        var fieldWidth;
        if (containerWidth) {
            fieldWidth = (containerWidth - 40) / 3;
        }
        if (!fieldWidth) {
            fieldWidth = 200;
        }
        $.ajax({
            url: this.options.url,
            type: "POST",
            dataType: "json",
            data: postData,
            width: 700,
            success: function (result) {
                $(_this.datagridId).datagrid({
                    columns: [
                        [
                            {
                                field: 'SourceObject',
                                title: '源对象',
                                width: fieldWidth,
                                formatter: function (value, rowData, rowIndex) {
                                    return "<span title='" + value + "'>" + value + "</span>";
                                }
                            },
                            {
                                field: 'RefObject',
                                title: '引用对象',
                                width: fieldWidth,
                                styler: function () {
                                    return "cursor: pointer;";
                                },
                                formatter: function (value, rowData, rowIndex) {
                                    return "<span title='" + value + "'>" + value + "</span>";
                                }
                            },
                            { field: 'RefPorperty', title: '引用属性', width: fieldWidth }
                        ]
                    ],
                    data: result.Items,
                    fitColumns: true,
                    onClickCell: function (rowIndex, field, value) {
                        if (field === "RefObject") {
                            if (_this.options.objectClick && $.isFunction(_this.options.objectClick)) {
                                _this.options.objectClick(result.Items[rowIndex].RefObjectId);
                            }
                        }
                    }
                });
                if (result.Total === 0) {
                    $(_this.refCountId).text("当前文件未被其它对象引用");
                }
                else {
                    $(_this.refCountId).text("引用次数 " + result.Total);
                }
                $(_this.paginationId).pagination('refresh', {
                    total: result.Total,
                    pageNumber: pageNumber
                });
            }
        });
    };
    FeReferenceDialog.prototype.showDialog = function (fileId) {
        $(this.dialogId).dialog("open");
        this.fileId = fileId;
        this.feReferenceDialogLoader(1);
    };
    return FeReferenceDialog;
}());
$.fn.fereferencedialog = function (method, args) {
    $(this).each(function () {
        if (!this.xobject) {
            this.xobject = new FeReferenceDialog(method);
        }
        else if (this.xobject) {
            if (method === "open") {
                this.xobject.showDialog(args);
            }
        }
    });
};
