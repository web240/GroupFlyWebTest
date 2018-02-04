/// <reference path="../Extension/CreateObjektPropertyCollectionViewHook.ts" />

class CreateObjektPropertyCollectionViewImpl extends CreateObjektPropertyCollectionViewHook {
    getOrder() {
        return 100;
    }

    getDescription() {
        return `对象视图组件初始化前处理`;
    }

    createComponent(context: HookContext) {
        var component = context.getParam() as UIComponentBase;
        if (component instanceof ObjektPropertyCollectionView) {
            var element = component as ObjektPropertyCollectionView;
            var obj;
            element.ajax({
                sync: true,
                url: "/GroupflyGroup.Platform.Web/Platform/GetViewList",
                data: { klass: element.klass, objektid: element.objektid, viewtype: "ObjektDetailView" },
                success: function (result) {
                    obj = JSON.parse(result.Data);
                }
            });


            var customviewcount = 0;
            var viewid = "";
            if ("viewtype" in obj) {
                for (var viewobj in obj) {
                    var view = obj[viewobj]
                    if (view.ishidden == "false") {
                        view = obj[viewobj];
                        customviewcount = customviewcount + 1;
                    }
                }
            }
            if (customviewcount > 0) {
                //自定义表单视图
                if (customviewcount == 1) {
                    var viewmodel = document.createElement("gf-viewmodel");
                    viewmodel["objektid"] = element.objektid
                    viewmodel["viewid"] = viewid;
                    element.appendChild(viewmodel);
                    return viewmodel;
                } else {
                    var tab = document.createElement("Gf-Tabs");
                    tab["fit"] = true;
                    tab["lazyload"] = true;
                    element.appendChild(tab);
                    tab["closeAll"]();
                    for (var viewobj in obj) {
                        var view = obj[viewobj]
                        if (view.ishidden == "false") {
                            viewid = view['viewid'];
                            var viewname = view['viewname'];
                            var id = element.getUniqueId(element.klass);
                            var href = "/GroupflyGroup.Platform.Web/Platform/GetCustomFormView" + "?objektid=" + element.objektid + "&viewid=" + viewid;
                            tab["add"](id, viewname, href, "", false);
                            customviewcount = customviewcount + 1;
                        }
                    }
                    tab["select"](0);
                    return tab;
                }

            } else {
                return "";
            }
        }
    }
}
CreateObjektPropertyCollectionViewImpl.register();