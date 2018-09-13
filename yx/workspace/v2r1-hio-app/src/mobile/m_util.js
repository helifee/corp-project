
function isSpecificValue(val) {
    return (
        val instanceof Buffer
        || val instanceof Date
        || val instanceof RegExp
    ) ? true : false;
}

function cloneSpecificValue(val) {
    if (val instanceof Buffer) {
        var x = new Buffer(val.length);
        val.copy(x);
        return x;
    } else if (val instanceof Date) {
        return new Date(val.getTime());
    } else if (val instanceof RegExp) {
        return new RegExp(val);
    } else {
        throw new Error('Unexpected situation');
    }
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
    var clone = [];
    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            } else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item);
            } else {
                clone[index] = deepExtend({}, item);
            }
        } else {
            clone[index] = item;
        }
    });
    return clone;
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = function (/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }

    if (arguments.length < 2) {
        return arguments[0];
    }

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var val, src, clone;

    args.forEach(function (obj) {
        // skip argument if isn't an object, is null, or is an array
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return;
        }

        Object.keys(obj).forEach(function (key) {
            src = target[key]; // source value
            val = obj[key]; // new value

            // recursion prevention
            if (val === target) {
                return;

                /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
            } else if (typeof val !== 'object' || val === null) {
                target[key] = val;
                return;

                // just clone arrays (and recursive clone objects inside)
            } else if (Array.isArray(val)) {
                target[key] = deepCloneArray(val);
                return;

                // custom cloning and overwrite for specific objects
            } else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val);
                return;

                // overwrite by new value if source isn't object or array
            } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;

                // source value and new value is objects both, extending...
            } else {
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });

    return target;
}


let util={
    simpleTplEngine(options) {


        options = util.deepExtend({
            left_split: "{",
            right_split: "}",
            tpl: "",
            data: null
        }, options)
        if (options.data == null) {
            return options.tpl
        } else {
            var reg = new RegExp(options.left_split + "(.+?)" + options.right_split, "gi")
            var strs = options.tpl.match(reg)||[], tpl = options.tpl
            for (var i = 0; i < strs.length ;i++) {
                var str = strs[i]
                strs[i] = str.substring(options.left_split.length, str.length - (options.right_split.length))
                // tpl = tpl.replace(str, str.indexOf(".") == -1 ? ([strs[i]] in options.data?(options.data[strs[i]]):'') : (util.getDataByModel(options.data, strs[i])) || '')  //xgp-20180123注释
                //xgp-20180123添加
                if(str.indexOf(".") == -1){
                    tpl = tpl.replace(str, ([strs[i]] in options.data?(options.data[strs[i]]):''));
                }else{
                    let tempObj = util.getDataByModel(options.data, strs[i]);
                    //暂不支持对象和字符串同时调用，如{{l('{approveLocale.approve.items}和{demo.test}至少选择一项')}}
                    if(typeof tempObj == 'object'){ //如果是返回的是对象
                        tpl = tempObj;
                    }else{//字符串
                        tpl = tpl.replace(str, tempObj)
                    }
                }
                // console.info("++++++++++")
                // console.info(util.getDataByModel(options.data, strs[i]));
                // console.info(str)
                // tpl = tpl.replace(str, str.indexOf(".") == -1 ? (options.data[strs[i]] || '') : (util.getDataByModel(options.data, strs[i])) || '')
            }
            // console.log("return tpl:"+tpl)
            return tpl
        }
    },
    getDataByModel: function ($scope, modelStr, otherWiseVal) {
        otherWiseVal = otherWiseVal || null

        if(!$scope){
            return otherWiseVal
        }

        var arr = modelStr.split('.'), len = arr.length, result = $scope
        // console.log('len:',len)
        if (len === 1) {
            // if($scope.hasOwnProperty(arr[0])) {
            //     return $scope[arr[0]]
            // }
            // else if($scope.result && $scope.result[arr[0]]) {
            //     return $scope.result[arr[0]]
            // }
            return $scope.hasOwnProperty(arr[0])?$scope[arr[0]]:otherWiseVal
        } else if (len > 1) {
            var isError = false
            for (var i in arr) {
                if (typeof(result[arr[i]]) === 'undefined') {
                    isError = true
                    break
                } else {
                    // console.log("arr start")
                    // console.log(arr)
                    // console.log("arr end")
                    //             console.log(arr[i])
                    result = result[arr[i]]
                    // console.log(result)
                }
            }
            if (isError) {
                return otherWiseVal
            } else {
                return result
            }
        } else if (len === 0) {
            return otherWiseVal
        }
    },
    deepExtend:deepExtend,
    getUrlKey:function(name){
        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
    },
    setupWebViewJavascriptBridge(callback){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(isiOS){
            if (window.RyJsBridge) { return callback(RyJsBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        }else if(isAndroid){
            if (window.RyJsBridge) {
                callback(RyJsBridge)
            } else {
                document.addEventListener(
                    'RyJsBridgeReady'
                    , function() {
                        callback(RyJsBridge)
                    },
                    false
                );
            }
        };
    },
    checkAndroidOrIos(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS;
    },
    //返回2018-05-06 格式 兼容ios Android
    handleDateTimeFn(date) {
        if (date) {
            let r_date = new Date(`${date}`);
            if(this.checkAndroidOrIos()){
                r_date = new Date(`${date.replace(/-/g,'/')}`)
            }
            let m = (r_date.getMonth() + 1)<10 ? "0"+(r_date.getMonth() + 1):(r_date.getMonth() + 1);
            let d = (r_date.getDate())<10 ? "0"+(r_date.getDate()):r_date.getDate();
            return r_date.getFullYear() + '-' + m + '-' + d;
        }
    },
    handleTimeNoSecondFn(date) {
        if (date) {
            let r_date = new Date(` ${date}`);
            if(this.checkAndroidOrIos()){
                r_date = new Date(`${date.replace(/-/g,'/')}`);
            }
            let m = (r_date.getMonth() + 1)<10 ? "0"+(r_date.getMonth() + 1):(r_date.getMonth() + 1);
            let d = (r_date.getDate())<10 ? "0"+(r_date.getDate()):r_date.getDate();
            let h = (r_date.getHours())<10 ? "0"+(r_date.getHours()):r_date.getHours();
            let miu = (r_date.getMinutes())<10 ? "0"+(r_date.getMinutes()):r_date.getMinutes();
            return r_date.getFullYear() + '-' + m + '-' + d +' '+ h +":" + miu;
        }
    },
    handleHtmlText(str,refObj){
        if(str){
            let div = document.createElement('div');
            div.innerHTML = str;
            refObj.appendChild(div);
        }
    },
    setParam(param, value) {
        var query = location.search.substring(1);
        var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");
        if (p.test(query)) {
            var firstParam = query.split(param)[0];
            var secondParam = query.split(param)[1];
            if (secondParam.indexOf("&") > -1) {
                var lastPraam = secondParam.substring(secondParam.indexOf('&')+1);
                return '?' + firstParam + param + '=' + value + '&' + lastPraam;
            } else {
                if (firstParam) {
                    return '?' + firstParam + param + '=' + value;
                } else {
                    return '?' + param + '=' + value;
                }
            }
        } else {
            if (query == '') {
                return '?' + param + '=' + value;
            } else {
                return '?' + query + '&' + param + '=' + value;
            }
        }
    },

}

export default util;