/// <reference path="DatePropertyView.ts" />

/** 日期时间属性组件 */
class DateTimePropertyView extends DatePropertyView {

    constructor() {
        super();
    }

    protected createComponentBrowseState() {
        return new DateTimePropertyViewBrowse(this);
    }

    protected createComponentEditState() {
        return new DateTimePropertyViewEdit(this);
    }

    static elementName = "Gf-DateTimePropertyView".toLowerCase();

  
}
DateTimePropertyView.register();   


class DateTimePropertyViewBrowse extends DatePropertyViewBrowse {

    

}

class DateTimePropertyViewEdit extends DatePropertyViewEdit {

    onRender() {

        var wrapper = this.getWrapper() as DateTimePropertyView;

        var span = super.onRender();

        $(wrapper.input).datetimebox({
            value: wrapper.getValue(),
            width: wrapper.width || 170,
            height:wrapper.height || 24,
            formatter: function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mi = date.getMinutes();
                var s = date.getSeconds();
                function formatNumber(value) {
                    return (value < 10 ? '0' : '') + value;
                }
                return y + '/' + m + '/' + d + ' ' + formatNumber(h) + ':' + formatNumber(mi) + ':' + formatNumber(s);
            },
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

        })

        return span;
    }
}