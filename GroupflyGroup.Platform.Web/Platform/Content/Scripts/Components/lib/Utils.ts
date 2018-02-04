
/**
 * 工具类
 */
class Utils{
    
    /**
     * 生成唯一id
     * @param prefix id随机编码的前缀部分
     */
    public static getUniqueId(prefix:string){
        return prefix + Date.parse(new Date().toString()).toString(16) + Math.floor(Math.random() * 10000);
    }

    /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
    */
    public static strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
        obj[k] = v;
        }
        return obj;
    }
    /**
     *map转换为json
    */
    public static mapToJson(map) {
        return JSON.stringify(Utils.strMapToObj(map));
    }
    /**
    *对象转换为Map
    */
    public static objToStrMap(obj){
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
        strMap.set(k,obj[k]);
        }
        return strMap;
    }

   /**
    *json转换为对象，再转为map
    */
    public static jsonToMap(jsonStr){
      return  Utils.objToStrMap(JSON.parse(jsonStr));
    }

   /**
    *map转为数组
    */
    public static mapToArray(map){
        var array = [];
        for (let[k,v] of map) {
            array.push(v);
        }
        return array;

    }

   /**
   * 对象数组条件查询,返回第一个匹配对象的index,不匹配则返回-1
   * @param objArray 对象数组
   * @param objPropery 对象属性名
   * @param objValue 对象属性值
   */
    public static ObjectArraySearch(objArray, objPropery, objValue) {

        var arrayIndex = -1;

        $(objArray).each(function (index) {

            if (this[objPropery] == objValue) {

                arrayIndex = index;

            }

        });

        return arrayIndex;
    }

    /**
     * 字符串转对象
   * @param str 字符串
     */
    public static stringToObject(str) {
        if(!str){
            return null;
        }
        return eval("(" + str + ")");
    }

    /**
    * 判断对象是否是字符串
    * @param obj 对象
    */
    public static isString(obj) {
        return Object.prototype.toString.call(obj) === "[object String]";
    }

    /**
    * 判断对象是否是函数
    * @param obj 对象
    */
    public static isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]'
    }

    /**
    * 执行操作等待提示
    * @param msg 提示消息（可空，默认为‘正在处理，请稍候...’）
    */
    public static ajaxLoading(msg?:string){
        window["ajaxLoading"](msg);
    }

    /**
    * 关闭执行操作等待提示
    */
    public static ajaxLoadEnd(){
        window["ajaxLoadEnd"]();
    }
    
    
    /* console.log(eq(0, 0)) // true
    console.log(eq(0, -0)) // false

    console.log(eq(NaN, NaN)); // true
    console.log(eq(Number(NaN), Number(NaN))); // true

    console.log(eq('Curly', new String('Curly'))); // true

    console.log(eq([1], [1])); // true
    console.log(eq({ value: 1 }, { value: 1 })); // true

    var a, b;

    a = { foo: { b: { foo: { c: { foo: null } } } } };
    b = { foo: { b: { foo: { c: { foo: null } } } } };
    a.foo.b.foo.c.foo = a;
    b.foo.b.foo.c.foo = b;

    console.log(eq(a, b)) // true */
    public static eq(a, b, aStack, bStack) {
    
        // === 结果为 true 的区别出 +0 和 -0
        if (a === b) return a !== 0 || 1 / a === 1 / b;
    
        // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
        if (a == null || b == null) return false;
    
        // 判断 NaN
        if (a !== a) return b !== b;
    
        // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
        var type = typeof a;
        if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    
        // 更复杂的对象使用 deepEq 函数进行深度比较
        return this.deepEq(a, b, aStack, bStack);
    };

    public static deepEq(a, b, aStack, bStack) {
    
        // a 和 b 的内部属性 [[class]] 相同时 返回 true
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
    
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
    
        var areArrays = className === '[object Array]';
        // 不是数组
        if (!areArrays) {
            // 过滤掉两个函数的情况
            if (typeof a != 'object' || typeof b != 'object') return false;
    
            var aCtor = a.constructor,
                bCtor = b.constructor;
            // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
            if (aCtor == bCtor && !(this.isFunction(aCtor) && aCtor instanceof aCtor && this.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
    
    
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
    
        // 检查是否有循环引用的部分
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b;
            }
        }
    
        aStack.push(a);
        bStack.push(b);
    
        // 数组判断
        if (areArrays) {
    
            length = a.length;
            if (length !== b.length) return false;
    
            while (length--) {
                if (!this.eq(a[length], b[length], aStack, bStack)) return false;
            }
        }
        // 对象判断
        else {
    
            var keys = Object.keys(a),
                key;
            length = keys.length;
    
            if (Object.keys(b).length !== length) return false;
            while (length--) {
    
                key = keys[length];
                if (!(b.hasOwnProperty(key) && this.eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
    
        aStack.pop();
        bStack.pop();
        return true;
    
    }
}




