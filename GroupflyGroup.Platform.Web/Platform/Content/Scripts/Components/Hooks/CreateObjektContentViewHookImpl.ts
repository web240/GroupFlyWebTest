/// <reference path="../Extension/CreateObjektContentViewHook.ts" />

class CreateObjektContentViewHookImpl extends CreateObjektContentViewHook {
    getOrder() {
        return 100;
    }

    getDescription() {
        return `对象视图组件初始化前处理`;
    }

    createComponent(context: HookContext) {
        var component = context.getParam() as UIComponentBase;
        if (component instanceof ObjektContentView) {
            var element = component as ObjektContentView;
            var customviewcount = 0;
            var viewid = "";
            var obj;
            element.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: element.klass, objektid: element.objektid, viewtype: "ObjektCustomFormView" },
                success: function (result) {
                    obj = JSON.parse(result.Data);
                    customviewcount = 0;
                    if ("viewtype" in obj) {
                        for (var viewobj in obj) {
                            var view = obj[viewobj]
                            if (view.ishidden == "false") {
                                viewid = view['viewid'];
                                customviewcount = customviewcount + 1;
                            }
                        }
                    }
                }
            });
            if (customviewcount > 0) {
                //自定义表单视图
                if (customviewcount == 1) {
                    var viewmodel = document.createElement("gf-viewmodel");
                    viewmodel["objektid"] = element.objektid
                    viewmodel["viewid"] = viewid;
                    element.div.appendChild(viewmodel);
                } else {
                    var tab = document.createElement("Gf-Tabs");
                    tab["fit"] = true;
                    tab["lazyload"] = true;
                    element.div.appendChild(tab);
                    tab["closeAll"]();
                    for (var viewobj in obj) {
                        var view = obj[viewobj]
                        if (view.ishidden == "false") {
                            viewid = view['viewid'];
                            var viewname = view['viewname'];
                            var id = element.getUniqueId(element.klass);
                            var href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView" + "?objektid=" + element.objektid + "&viewid=" + viewid;
                            tab["add"](id, viewname, href, "", false);
                        }
                    }
                    tab["select"](0);
                }
            } else {
                return "";
            }
        }
        return "";
    }
}
CreateObjektContentViewHookImpl.register();