/// <reference path="UIComponentBase.ts" />

/** 选项卡 */
class Tabs extends UIComponentBase {

    constructor() {
        super();
    }

    static elementName = "Gf-Tabs".toLowerCase();

    public createComponentBrowseState() {
        return null;
    }

    public createComponentEditState() {
        return null;
    }

    /** tabs标签 */
    private _tabsElement: HTMLDivElement;

    /** panel数组 */
    private _panelArray: Array<any> = new Array<any>();

    /** 面板集合 */
    get panels() {
        return this._panelArray;
    }
    
    /** 是否可关闭（显示关闭图标与右键菜单） */
    get closable() {

        return this.safeToString(this.getAttribute("closable")).toLowerCase() == "true";

    }
    set closable(val) {

        this.setAttribute("closable", val.toString());

    }

    /** 是否自适应父容器尺寸 */
    get fit(){
        return this.safeToString(this.getAttribute("fit")).toLowerCase() == "true";
    }
    set fit(val){
        this.setAttribute("fit",val.toString());
    }

    /** 是否延迟加载面板内容（面板第一次打开时加载） */
    get lazyload(){
        return this.safeToString(this.getAttribute("lazyload")).toLowerCase() == "true";
    }
    set lazyload(val){
        this.setAttribute("lazyload",val.toString());
    }

    public add(id, title, href, iconCls, isiframe) {        
        var element = this;
        var div = this._tabsElement;
        if(!id){
            id = this.getUniqueId("tab");
        }
        var tabExist = element.tabExist(id);
        if (!tabExist) {
            
            var tabhref = '';
            if(!element.lazyload){
                tabhref = isiframe ? '' : href;
            }
            $(div).tabs('add',{
                id : id,
                title: title,
                content : isiframe ? '<iframe src="'+ href +'" width="99%" height="99%" style="border-width:0px;">' : '',
                href : tabhref,
                iconCls : iconCls,
                closable : element.closable
            });
            element.panels.push({ id: id, href: href, loaded: false });
        }
    }
    public addContent(id,title,content){
        var element = this;
        var container = element._tabsElement;
        var tabExist = element.tabExist(id);
        if(!tabExist){
            $(container).tabs('add',{
                id : id,
                title: title,
                content : '<div id="' + id + 'div" class="easyui-layout" data-options="fit:true" ><div>',
                href : '',
                closable : element.closable
            });
            element.panels.push({ id : id, content : content, loaded : true });
            var wrapper = document.getElementById(id + "div");
            $(content).appendTo(wrapper);
        }
    }
    
    public close(index) {
        $(this._tabsElement).tabs("close", index);
    }
         
    public closeAll(){
        
        var element = this;
        var div = element._tabsElement;
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function(){
            var index = $(div).tabs('getTabIndex', this[0]);
            element.close(index);
        });
    }

    public closeAllExcept(tabIndex){
        var element = this;
        var div = element._tabsElement;
        var selectedTab = $(div).tabs('getSelected');
        var selectedIndex = $(div).tabs('getTabIndex',selectedTab);
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function(){
            var index = $(element).tabs('getTabIndex', this[0]);
            if(tabIndex != index){
                element.close(index);   
            }
            if(index < tabIndex){
                tabIndex --;
                if(selectedIndex > 0){
                    selectedIndex --;
                }
            }
        });
        $(div).tabs('select',selectedIndex);
    }

    public closeLeft(tabIndex){

        var element = this;
        var div = element._tabsElement;
        var selectedTab = $(div).tabs('getSelected');
        var selectedIndex = $(div).tabs('getTabIndex',selectedTab);
        var tabs = $(div).tabs('tabs');
        
        $(tabs).each(function(){
            var index = $(div).tabs('getTabIndex', this[0]);
            if(index < tabIndex){
                element.close(index);   
                tabIndex --;
                if(selectedIndex > 0){
                    selectedIndex --;
                }
            }
        });
        $(div).tabs('select',selectedIndex);
    }             

    public closeRight(tabIndex){
        var element = this;
        var div = element._tabsElement;
        var tabs = $(div).tabs('tabs');
        $(tabs).each(function(){
            var index = $(div).tabs('getTabIndex', this[0]);
            if(index > tabIndex){
                element.close(index);   
            }
        });
    }

    public getAllTabs() {
        return $(this._tabsElement).tabs("tabs"); 
    }
    

    public getTab(index){
        return $(this._tabsElement).tabs("getTab", index);
    }

    public getTabIndex(tab){
        return $(this._tabsElement).tabs("getTabIndex", tab);
    }

    public getSelected(){
        return $(this._tabsElement).tabs("getSelected");
    }

    public refreshTab(index){
        var panelobj = this.panels[index];
        if (panelobj) {
            $("#" + panelobj.id).load(panelobj.href);
            panelobj.loaded = true;
        }
    }

    public select(index) {
        var currentIndex = $(this._tabsElement).tabs('getTabIndex', this.getSelected());
        currentIndex = currentIndex < 0 ? 0 : currentIndex;
        $(this._tabsElement).tabs("select", index); 
        if (currentIndex == index) {
            this.fireHook(EventNames.TabSelect, ["", index]);
        }
    }
    
    public tabExist(id) {
        var container = this._tabsElement;
        var tabExist = false;
        var alltabs = $(container).tabs('tabs');
        $(alltabs).each(function () {
            if(this[0].id == id){
                var index = $(container).tabs('getTabIndex', this[0]);
                $(container).tabs('select', index);
                tabExist = true;
            }
        });
        return tabExist;
    }

    public tabGoto(href){
        var tab = this.getSelected();
        $(tab).load(href);
    }

    public tabGoback(){
        var tab = this.getSelected();
        var index = this.getTabIndex(tab);
        var panelobj = this.panels[index];
        $(tab).load(panelobj.href);
    }

    protected connected(){
        //this.autoInit = true;
        super.connected();
    }

    public hideTitle() {
        for (var i = 0; i < $(this._tabsElement).tabs('tabs').length; i++) {
            $(this._tabsElement).tabs('getTab', i).panel('options').tab.hide();
        }
    }

    public onRender(): HTMLElement {      
        var element = this;
        $(this).addClass("GfTab");
        
        var container = document.createElement("div");
        $(container).addClass("GfTabPanel");
        
        var div = document.createElement("div");
        $(div).addClass("GfTabElement");
        $(container).append(div);
        
        element._tabsElement = div;

        return container;
    }


    afterRender() {

        var element = this;
        element.addHook(EventNames.TabSelect, function (title, index) {
            if (element.lazyload) {
                var panelobj = element.panels[index];
                if (panelobj && !panelobj.loaded) {
                    $("#" + panelobj.id).load(panelobj.href, null, function () {
                        element.fireHook(EventNames.TabPanelLoad, [index]);
                    });
                    panelobj.loaded = true;
                }
            }
        });
        
        $(element._tabsElement).tabs({
            width: element.width || 'auto',
            height: element.height || 'auto',
            fit: element.fit,
            border: false,
            scrollDuration: 0,
            onSelect: function (title, index) {
                element.fireHook(EventNames.TabSelect, [title, index]);
            },
            onLoad: function (panel) {
                element.fireHook(EventNames.TabLoad, [panel]);
            },
            onClose: function (title, index) {
                element.panels.splice(index, 1);
            },
            onContextMenu: function (e, title, index) {
                if (element.closable) {
                    e.preventDefault();
                    var id = element.getUniqueId('tabContextMenu');
                    var menu = $(`<div id="` + id + `" class="easyui-menu" style="width:120px;">
                                    <div id="`+ id + `-tabRefresh" data-options="name:-1">刷新</div>
                                    <div id="`+ id + `-tabclose" data-options="name:1">关闭</div>
                                    <div id="`+ id + `-tabcloseall" data-options="name:2">关闭全部</div>
                                    <div id="`+ id + `-tabcloseother" data-options="name:3">关闭其他</div>
                                    <div class="menu-sep"></div>
                                    <div id="`+ id + `-tabcloseright" data-options="name:4">关闭左侧全部</div>
                                    <div id="`+ id + `-tabcloseleft" data-options="name:5">关闭右侧全部</div>
                                </div>`).appendTo(document.body);

                    $("#" + id).menu({
                        onClick: function (item) {
                            switch (item.name) {
                                case -1:
                                    element.refreshTab(index);
                                    break;
                                case 1:
                                    element.close(index);
                                    break;
                                case 2:
                                    element.closeAll();
                                    break;
                                case 3:
                                    element.closeAllExcept(index);
                                    break;
                                case 4:
                                    element.closeLeft(index);
                                    break;
                                case 5:
                                    element.closeRight(index);
                                    break;

                            }
                        }
                    });

                    if (index >= 0) {
                        $("#" + id).menu('show', {
                            left: e.pageX,
                            top: e.pageY
                        });
                    }
                }
            }
        });
    }
}
Tabs.register();