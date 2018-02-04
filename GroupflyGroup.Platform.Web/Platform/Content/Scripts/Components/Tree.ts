/// <reference path="UIComponentBase.ts" />

/** 树 */
class Tree extends UIComponentBase {

    constructor() {
        super();
    }

    static elementName = "gf-tree".toLowerCase();

    /** 点击启用 */
    public isMenuClick: boolean = true;

    /** 延迟加载子菜单api */
    get lazyLoaduUrl() {
        return this.getAttribute("lazyLoaduUrl");
    }
    set lazyLoaduUrl(val) {
        this.setAttribute("lazyLoaduUrl", val);
    }

    /** 菜单项点击事件处理 */
    get clickHandler() {
        return this.getAttribute("clickHandler");
    }
    set clickHandler(val) {
        this.setAttribute("clickHandler", val);
    }

    /** 左侧留白距离 */
    get paddingleft() {
        return this.getAttribute("paddingleft");
    }
    set paddingleft(val) {
        this.setAttribute("paddingleft", val);
    }

    /** 数据 */
    get data() {
        return this.getAttribute("data");
    }
    set data(val) {
        this.setAttribute("data", val);
    }

    public expand(node) {
        $(this.get("ul")).tree('expand', node);
    }

    public append(node, data) {
        $(this.get("ul")).tree('append', {
            parent: node,
            data: data
        });
    }

    public reload() {
        var ul = this.get("ul");
        var selected = $(ul).tree('getSelected');
        if (this.data) {
            this.loadDatastring(this.data, this.clickHandler)
        }
        if (selected) {
            $(ul).tree('expandAll');
            var node = $(ul).tree('find', selected.id);
            if (node) {
                $(ul).tree('select', node.target);
            }
        }
    }

    public loadData(data, click) {
        var element = this;
        $(element.get("ul")).tree({
            data: data,
            onBeforeExpand: function (node, param) {
                if (!node.children || node.children.length == 0) {
                    element.ajax({
                        url: element.lazyLoaduUrl,
                        data: { id: node.id, parentId: node.parentId },
                        success: function (result) {
                            element.append(node.target, JSON.parse(result.Data));
                            element.expand(node);
                        }
                    });
                }
            },
            onExpand: function (node, param) {
                element.changeCssClass();
            },
            onClick: function (node) {    
                if (element.isMenuClick) {
                    if (click) {
                        var func = element.stringToObject(click);
                        func(node);
                    }
                    element.fireHook(EventNames.NodeClick, [node]);
                }
            }
        });
        element.changeCssClass();
    }

    public loadDatastring(data, click) {
        var element = this;
        var ul = this.get("ul");
        $(ul).tree({
            data: element.stringToObject(data),
            onBeforeExpand: function (node, param) {;
                if (!node.children || node.children.length == 0) {
                    element.ajax({
                        url: element.lazyLoaduUrl,
                        data: { id: node.id, parentId: node.parentId },
                        sync: true,
                        success: function (result) {
                            element.append(node.target, JSON.parse(result.Data));
                        }
                    });
                }
            }, 
            onExpand: function (node, param) {
                element.changeCssClass();
            },
            onClick: function (node) {
                if (element.isMenuClick) {
                    if (click) {
                        var func = element.stringToObject(click);
                        func(node);
                    }
                    element.fireHook(EventNames.NodeClick, [node]);
                }
            }
        });
        element.changeCssClass();
    }

    public find(id) {
        return $(this.get("ul")).tree('find', id);
    }

    public select(id) {
        var node = this.find(id);
        $(this.get("ul")).tree('select', node.target);
    }



    public onRender(): HTMLElement {
        if (this.renderedHTMLElement) {
            return this.renderedHTMLElement;
        }
        var element = this;
        var ul = document.createElement("ul");
        //element.appendChild(ul);
        element.set("ul", ul);
        if (element.data) {
            element.loadDatastring(element.data, element.clickHandler)
        }
        return ul;     
    }


    afterRender() {
        var element = this;
        $(element).find(".tree-file").removeClass("tree-file");
        if (element.paddingleft) {
            $(element).find(".tree-node").css("padding-left", parseInt(element.paddingleft));
        }
        $(element).find(".tree-folder").removeClass("tree-folder");
        $(element).find(".tree-folder-open").removeClass("tree-folder-open");  
       
    }

    protected changeCssClass() {
        var element = this;
        $(element).find(".tree-file").removeClass("tree-file");
        if (element.paddingleft) {
            $(element).find(".tree-node").css("padding-left", parseInt(element.paddingleft));
        }
        $(element).find(".tree-folder").removeClass("tree-folder");
        $(element).find(".tree-folder-open").removeClass("tree-folder-open");

    }

    public getNode(target) {

        return $(this.get("ul")).tree('getNode', target);

    }


}
Tree.register();


