/// <reference path="BigIntPropertyView.ts" />
/** 整数属性组件 */
class IntPropertyView extends BigIntPropertyView {
    
    constructor() {
        super();
        this.defaultMaxValue = 2147483647;
        this.defaultMinValue = -2147483648;
        this.defaultPrecision = 10;
    }

    static elementName = "Gf-IntPropertyView".toLowerCase();
}
IntPropertyView.register();