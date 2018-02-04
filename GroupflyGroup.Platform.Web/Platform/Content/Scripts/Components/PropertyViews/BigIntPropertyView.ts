/// <reference path="NumberPropertyView.ts" />
/** 大整数属性组件 */
class BigIntPropertyView extends NumberPropertyView {

    constructor() {
        super();
        this.defaultScale = 0;
    }
    static elementName = "Gf-BigIntPropertyView".toLowerCase();

    /**
     * 值数据类型转换
     * @param value 值
     */
    protected valueConvert(value:string){
        if(!value){
            return null;
        }
        return parseInt(value);
    }
    
    
    
}
BigIntPropertyView.register();