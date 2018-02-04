/// <reference path="StringPropertyView.ts" />

/** 日期属性组件 */
class DatePropertyView extends StringPropertyView {
    
    constructor() {
        super();
    }

    static elementName = "Gf-DatePropertyView".toLowerCase();

    protected createComponentBrowseState() {
        return new DatePropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new DatePropertyViewEdit(this);
    }

}
DatePropertyView.register();


class DatePropertyViewBrowse extends StringPropertyViewBrowse {

   

}

class DatePropertyViewEdit extends StringPropertyViewEdit {

    onRender() {
   
        var wrapper = this.getWrapper() as DatePropertyView;
        var input = document.createElement("input");
        $(input).attr("name", $(this).attr("name"));
        $(input).val(wrapper.value);
        wrapper.input = input;
        
        var span = document.createElement("span");
        $(span).hide();
        $(span).click(function(e){ 
            (e as Event).stopPropagation();
        });
        span.appendChild(input);

        $(input).datebox({          
            value: wrapper.getValue(),
            width: wrapper.width || 170,
            height: wrapper.height || 24,
            editable: true,
            formatter: function (date) { return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(); },
            parser: function (s) {
                var t = Date.parse(s);
                if (!isNaN(t)) {
                    return new Date(t);
                } else {
                    return new Date();
                }
            },
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });

        return span;
    }
}