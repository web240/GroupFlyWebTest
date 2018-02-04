//resize of div 
(function ($, h, c) {
    var a = $([]),
    e = $.resize = $.extend($.resize, {}),
    i,
    k = "setTimeout",
    j = "resize",
    d = j + "-special-event",
    b = "delay",
    f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                r = $.data(this, d);
                if (r) {
                    r.w = o !== c ? o : q.width();
                    r.h = p !== c ? p : q.height();
                }
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function () {
            a.each(function () {
                var n = $(this),
                m = n.width(),
                l = n.height(),
                o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l]);
                }
            });
            g();
        },
        e[b]);
    }
})(jQuery, this);

//jquery 对象序列化
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//删除对象数组中满足属性筛选条件的元素，返回新数组（arry：对象数组, objPropery：筛选属性名, objValue：筛选属性值）
function removeObjFromArray(arry, objPropery, objValue) {
    return $.grep(arry, function (cur, i) {
        return cur[objPropery] != objValue;
    });
}
//获取对象数组中满足属性筛选条件的元素，返回新数组（arry：对象数组, objPropery：筛选属性名, objValue：筛选属性值）
function getObjFromArray(arry, objPropery, objValue) {
    return $.grep(arry, function (cur, i) {
        return cur[objPropery] == objValue;
    });
}

function clone(myObj) {
    if (typeof (myObj) != 'object') return myObj;
    if (myObj == null) return myObj;

    var myNewObj = new Object();

    for (var i in myObj)
        myNewObj[i] = clone(myObj[i]);

    return myNewObj;
}

function isString(obj){ //判断对象是否是字符串  
        return Object.prototype.toString.call(obj) === "[object String]";  
}

function htmlEncode(value) {
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

function stringToObject(str) {
    return eval("(" + str + ")");
}

//统一ajax调用
function platformAjax(option) {
    if (option.data) {
        option.data.AjaxType = "Operation";
    } else {
        option.data = { AjaxType: "Operation" }
    }
    $.ajax({
        type: option.type || "post",
        url: option.url,
        async: !option.sync,
        data: option.data,
        datatype: option.datatype || "json",
        success: function (result) {
            if (isString(result))
                result = JSON.parse(result);
            if (!("IsSuccess" in result) || result.IsSuccess) {
                option.success(result);
            }
            else {
                switch (result.FailCode) {
                    case "LoginRequired":
                        var loginUrl = result.Data;
                        if (top) {
                            top.location.href = loginUrl;
                        } else {
                            window.location.href = loginUrl;
                        }
                        break;
                    default:
                        if (option.fail) {
                            option.fail(result);
                        } else {
                            ComponentRoot.showError(result.Message, result.Data);
                        }
                        break;
                }
            }
            if (option.finallyCall) {
                option.finallyCall(result);
            }
            ajaxLoadEnd();
        },
        error: function (result) {
            if (option.error) {
                option.error(result);
            } else {
                ComponentRoot.showError(result.Message, result.Data);
            }
            if (option.finallyCall) {
                option.finallyCall(result);
            }
            ajaxLoadEnd();
        }
    });
}

function ajaxLoading(msg) {
    if (!msg) {
        msg = "正在处理，请稍候...";
    }
    $('<div class="datagrid-mask"></div>').css({ zIndex : "99999999", display: "block", width: "100%", height: $(window).height() }).appendTo("body");
    $('<div class="datagrid-mask-msg"></div>').html(msg).appendTo("body").css({ zIndex: "99999999", display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
}

function ajaxLoadEnd() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}
