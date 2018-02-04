/// <reference path="StringPropertyView.ts" />

/** 时间属性组件 */
class TimePropertyView extends StringPropertyView {
    
    constructor() {
        super();
    }


    protected createComponentBrowseState() {
        return new TimePropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new TimePropertyViewEdit(this);
    }

    static elementName = "Gf-TimePropertyView".toLowerCase();   
}
TimePropertyView.register();



class TimePropertyViewBrowse extends StringPropertyViewBrowse {



}

class TimePropertyViewEdit extends StringPropertyViewEdit {

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

        $(input).timespinner({
            value: wrapper.getValue(),
            width: wrapper.width || 170,
            height: wrapper.height || 22,
            showSeconds: true,
            onChange: function (newValue, oldValue) {
                wrapper.fireValueChange(oldValue, newValue);
            }
        });

        return span;
    }
}