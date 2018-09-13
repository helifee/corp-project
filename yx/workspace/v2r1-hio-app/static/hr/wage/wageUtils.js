/**
 * 薪酬模块使用
 * @author ruanxin
 * @date 2018/3/1
 */

;(function ($) {
    if (!$.wageUtils) {
        $.extend({
            wageUtils: {

                isInteger: function (obj) {
                    return Math.floor(obj) === obj
                },

                /*
                 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
                 * @param floatNum {number} 小数
                 * @return {object}
                 *   {times:100, num: 314}
                 */
                toInteger: function (floatNum) {
                    var ret = {times: 1, num: 0};
                    var isNegative = floatNum < 0;
                    if (this.isInteger(floatNum)) {
                        ret.num = floatNum
                        return ret
                    }
                    var strfi  = floatNum + '';
                    var dotPos = strfi.indexOf('.');
                    var len    = strfi.substr(dotPos+1).length;
                    var times  = Math.pow(10, len);
                    var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
                    ret.times  = times;
                    if (isNegative) {
                        intNum = -intNum;
                    }
                    ret.num = intNum;
                    return ret;
                },

                /*
                 * 核心方法，实现加减乘除运算，确保不丢失精度
                 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
                 *
                 * @param a {number} 运算数1
                 * @param b {number} 运算数2
                 * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
                 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
                 *
                 */
                operation: function (a, b, digits, op) {
                    var o1 = this.toInteger(a);
                    var o2 = this.toInteger(b);
                    var n1 = o1.num;
                    var n2 = o2.num;
                    var t1 = o1.times;
                    var t2 = o2.times;
                    var max = t1 > t2 ? t1 : t2;
                    var result = null;
                    switch (op) {
                        case 'add':
                            if (t1 === t2) { // 两个小数位数相同
                                result = n1 + n2
                            } else if (t1 > t2) { // o1 小数位 大于 o2
                                result = n1 + n2 * (t1 / t2)
                            } else { // o1 小数位 小于 o2
                                result = n1 * (t2 / t1) + n2
                            }
                            return result / max;
                        case 'subtract':
                            if (t1 === t2) {
                                result = n1 - n2;
                            } else if (t1 > t2) {
                                result = n1 - n2 * (t1 / t2);
                            } else {
                                result = n1 * (t2 / t1) - n2;
                            }
                            return result / max;
                        case 'multiply':
                            result = (n1 * n2) / (t1 * t2);
                            return result;
                        case 'divide':
                            result = (n1 / n2) * (t2 / t1);
                            return result;
                    }
                },

                // 加减乘除的四个接口
                add: function(a, b, digits) {
                    return this.operation(a, b, digits, 'add');
                },
                subtract: function(a, b, digits) {
                    return this.operation(a, b, digits, 'subtract');
                },
                multiply: function(a, b, digits) {
                    return this.operation(a, b, digits, 'multiply');
                },
                divide: function(a, b, digits) {
                    return this.operation(a, b, digits, 'divide');
                }
            }
        });
    }

    $.extend($.wageUtils, {});
})(jQuery);
