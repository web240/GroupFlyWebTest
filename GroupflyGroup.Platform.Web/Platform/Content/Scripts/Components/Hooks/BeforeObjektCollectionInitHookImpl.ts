/// <reference path="../Extension/BeforeComponentInitHook.ts" />

class BeforeObjektCollectionInitHookImpl extends BeforeComponentInitHook{
    getOrder(){
        return 100;
    }

    getDescription(){
        return `对象集合视图组件初始化前处理`;
    }

    doBefore(context:HookContext){
        var component = context.getParam() as UIComponentBase;
        if(component instanceof ObjektCollectionView){
            var element = component as ObjektCollectionView;
            if (element.klass == "File"){
                element.isasc = "asc";
                element.orderby =  "sortOrder";
                element.relatedcolumns = 'fileType.faIcon';
                var column = document.createElement('Gf-Column');
                $(column).attr("field", "fileType.faIcon");
                $(column).attr("datatype",DataType.STRING);
                $(column).attr("title", '');
                $(column).attr("width",'50');
                $(column).attr("isreadonly", "true");
                $(column).attr("forbidquery", "true");

                column["formatter"] = function (value, row, index) {  if(!value) return ''; else return '<span class="'+ value +'"></span>'; };
                
                $(element).prepend(column);

                if(!element.hidetools){
                    element.hidetools = '[]';
                }
                if(element.hidetools != 'all')
                {
                    var hidetools = Utils.stringToObject(element.hidetools);
                    hidetools.push('add');
                    element.hidetools = JSON.stringify(hidetools);
                }
            }
            return true;
        }
        return false;
    }
}
BeforeObjektCollectionInitHookImpl.register();