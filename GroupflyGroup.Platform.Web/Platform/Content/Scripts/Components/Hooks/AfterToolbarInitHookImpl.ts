/// <reference path="../Extension/AfterComponentInitHook.ts" />

class AfterToolbarInitHookImpl extends AfterComponentInitHook{
    getOrder(){
        return 100;
    }

    getDescription(){
        return `工具栏组件初始化后处理`;
    }

    doAfter(context:HookContext){
        var component = context.getParam() as UIComponentBase;
        if(component instanceof ToolBar){
            var tb = component as ToolBar;
            tb.addButton(
                { 
                    label: '打开实例', 
                    icon: 'fa fa-list iconfont',
                    name : 'openInstance',
                    whenToShow: { selectToShow : 'singleSelect' },
                    after: 'refresh'
                });
            tb.onToolbarCommand(function(toolname){
                if(toolname == 'openInstance'){
                    var objs = tb.selected;
                    if(objs && objs.length > 0){
                        let obj = objs[0];
                        ComponentRoot.openTabPage(obj.name, ComponentRoot.APIs.objektCollection + '?klass=' + obj.name, obj.label, false);
                    }
                }
            });
            tb.hideTool('openInstance');
            tb.onCheckToShow(function(){
                var array = tb.selected;
                if(array && array.length > 0){
                    $(array).each(function () {
                        var klass = this.id.split('@')[1];
                        if(klass.toLowerCase() != 'klass'){
                            tb.hideTool('openInstance');
                        }
                    });
                }
            });
            return true;
        }
        return false;
    }
}
AfterToolbarInitHookImpl.register();