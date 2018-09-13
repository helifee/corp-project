import messageBox from '@messageBox'
import deepExtend from './deepExtend'
import Vue from 'vue'

let {ConfirmPlugin,ToastPlugin}=messageBox

// import {ToastPlugin} from '@message'




function emitAlert(msg, isShowCancel, type,duration=3000) {

    if(msg.trim()==''){
        return new Promise((resolve)=>{


            resolve()
            return false
        })
    }


    // if(util.messageBoxVisible){
    //     return new Promise((resolve,reject)=>{
    //
    //         reject()
    //     })
    //     util.messageBoxVisible=false
    // }

    isShowCancel = isShowCancel || false

    let title

    if (typeof(window.JZY) != 'undefined') {
        title = JZY.locale.$t('{g.dialogTitles.' + (type || 'warning') + '}')
        // title={
        //     warning: JZY.locale.$t('{g.warning}'),
        //     info: JZY.locale.$t('{g.info}'),
        //     success: JZY.locale.$t('{g.success}'),
        //     error: JZY.locale.$t('{g.error}')
        // }[type || 'warning']
    } else {
        title = {
            warning: '警告',
            info: '提示',
            success: '恭喜',
            error: '错误'
        }[type || 'warning']
    }




    if(isShowCancel){
        let options = {
            title: title,
            message: msg || '系统繁忙请稍等片刻再试',
            showCancelButton: isShowCancel,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnPressEscape: true,
            closeOnClickModal: false,
            type: type || 'warning'

        }

        util.messageBoxVisible = true
        return ConfirmPlugin(options)
            .then(() => {
                util.messageBoxVisible = false
            })
    }else{



        return new Promise((resolve)=>{

            ToastPlugin({
                duration:duration,
                message: msg || '',
                type: type || 'warning'
            });

            setTimeout(()=>{

                jQuery('.el-message--info').each((index,obj)=>{
                    $(obj).css('z-index',$(obj).css('z-index')-0+1)
                })
            })

            resolve()
        })
    }






}

export const alertMsg = emitAlert


let util = {
    waiting(second=0){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve('OK')
            },second)
        })
    },
    MAX_JAVA_INT:2147483647,
    md5:require('./md5.js').md5,
    computedMap(obj){
        let res={

        }

        for(var i in obj){
            if(typeof(obj[i])=='function'){
                res[i]=obj[i](res)
                // res[i]=obj[i].call(res)
            }else{
                res[i]=obj[i]
            }
        }
        return res
    },

    debounce: function (func, wait, immediate) {
        // console.log('')
        var timeout
        return function () {
            var context = this, args = arguments
            var later = function () {
                timeout = null
                if (!immediate) return func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) return func.apply(context, args)
        }
    },
    messageBoxVisible: false,
    isIE9() {
        return navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0"
    },
    multiSplice(valuesArr,indexArr){
        for (var i = indexArr.length -1; i >= 0 ;i--)
            valuesArr.splice(indexArr[i],1)
    },
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";


        var uuid = s.join("");
        return uuid;
    },
    setDataByModel: function ($scope, modelStr, val) {


        var arr = modelStr.split('.'), len = arr.length
        if (len === 1) {
            $scope[arr[0]] = val
        } else if (len > 1) {
            var ns = arr, obj = $scope
            for (var i = 0; i < len - 1; i++) {
                var key = ns[i]
                obj = obj[key]
            }
            console.log("this is obj and key:", obj, ns[len - 1], val)

            obj[ns[len - 1]] = val

        }
    },
    getFlashVersion() {
        try {
            if (typeof window.ActiveXObject != 'undefined') {
                return parseInt((new ActiveXObject('ShockwaveFlash.ShockwaveFlash')).GetVariable("$version").split(" ")[1].split(",")[0], 10);
            } else {
                return parseInt(navigator.plugins["Shockwave Flash"].description.split(' ')[2], 10);
            }
        } catch (e) {
            return 0;
        }
    },
    getDataByModel: function ($scope, modelStr, otherWiseVal) {
        otherWiseVal = otherWiseVal || null

        if (!$scope) {
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
            return $scope.hasOwnProperty(arr[0]) ? $scope[arr[0]] : otherWiseVal
        } else if (len > 1) {
            var isError = false
            for (var i in arr) {
                if (typeof(result[arr[i]]) === 'undefined') {
                    isError = true
                    break
                } else {
                    result = result[arr[i]]
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
            var strs = options.tpl.match(reg) || [], tpl = options.tpl
            for (var i = 0; i < strs.length; i++) {
                var str = strs[i]
                strs[i] = str.substring(options.left_split.length, str.length - (options.right_split.length))
                // tpl = tpl.replace(str, str.indexOf(".") == -1 ? ([strs[i]] in options.data?(options.data[strs[i]]):'') : (util.getDataByModel(options.data, strs[i])) || '')  //xgp-20180123注释
                //xgp-20180123添加
                if (str.indexOf(".") == -1) {
                    tpl = tpl.replace(str, ([strs[i]] in options.data ? (options.data[strs[i]]) : ''));
                } else {
                    let tempObj = util.getDataByModel(options.data, strs[i]);
                    //暂不支持对象和字符串同时调用，如{{l('{approveLocale.approve.items}和{demo.test}至少选择一项')}}
                    if (typeof tempObj == 'object') { //如果是返回的是对象
                        tpl = tempObj;
                    } else {//字符串
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
    disabledAllInput(context) {
        console.log('disabled all input --:',context)
        var inputs = context.querySelectorAll('input')
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('disabled', 'disabled')
            inputs[i].classList.add('bx-disabled-input')


            if(input.value==''){
                input.setAttribute('placeholder','')
            }

        }

        // var inputNumbers=document.querySelectorAll('.el-input-number')
        // for(var j=0j<inputNumbers.lengthj++){
        //     inputNumbers[j].classList.add('bx-disabled-input-number-div')
        // }
    },
    formatTime(date) {
        let d = new Date(date)

        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = d.getDate().toString();
        var hh = d.getHours().toString();
        var ii = d.getMinutes().toString();
        var ss = d.getSeconds().toString();
        // return '20180211'+hh+ii+ss;
        return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + ' ' + (hh[1] ? hh : "0" + hh[0]) + ':' + (ii[1] ? ii : "0" + ii[0]) + ':' + (ss[1] ? ss : "0" + ss[0])
        // return yyyy+'/' + (mm[1]?mm:"0"+mm[0])+'/' + (dd[1]?dd:"0"+dd[0])+' '+ (hh[1]?hh:"0"+hh[0])+':'+ (ii[1]?ii:"0"+ii[0])+':'+ (ss[1]?ss:"0"+ss[0])

        // return yyyy+'-' + (mm[1]?mm:"0"+mm[0])+'-' + (dd[1]?dd:"0"+dd[0]);
    },
    isNull: function (str) {

        if(str!==null && typeof(str)=='object'&& !Array.isArray(str) && !str instanceof Date){

            let isNoop=true
            for(var i in str){
                if(str[i].length>0){
                    isNoop=false;
                    break;
                }
            }
            return isNoop
        }

        return (typeof(str) === 'string' && str.trim() === '') || (typeof(str) === 'undefined') || (str === null)
    },
    closest(el, selector) {
        var matchesFn

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn
                return true
            }
            return false
        })

        var parent

        // traverse parents

        if (el[matchesFn](selector)) {
            return el
        }

        while (el) {
            parent = el.parentElement
            if (parent && parent[matchesFn](selector)) {
                return parent
            }
            el = parent
        }

        return null
    },
    getDataByModel: function ($scope, modelStr, otherWiseVal) {
        otherWiseVal = otherWiseVal || null

        if (!$scope) {
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
            return $scope.hasOwnProperty(arr[0]) ? $scope[arr[0]] : otherWiseVal
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
    // parseUrl:function(href) {
    //     var url = href || location.href;
    //     alert(url)
    //     var a = document.createElement('a');
    //     a.href = url;
    //     var ret = {},
    //         seg = a.search.replace(/^\?/, '').split('&'),
    //         len = seg.length,
    //         i = 0,
    //         s;
    //     for (; i < len; i++) {
    //         if (!seg[i]) {
    //             continue;
    //         }
    //         s = seg[i].split('=');
    //         ret[s[0]] = s[1];
    //     }
    //     return ret;
    // },
    deepExtend: deepExtend,
    copy(obj) {

        // console.log('kcuf_u copy obj--:',obj instanceof File)
        // for(var i in obj){
        //     console.log("i :",i,typeof(obj[i]),obj[i])
        // }

        if(obj instanceof File){
            return obj
        }

        if (obj == null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj

        let temp

        if (obj instanceof Date) {
            temp=new Date(obj.getTime())
            // temp = new obj.constructor() //or new Date(obj)
        }

        else {
            try{
                temp = obj.constructor()
            }catch(e){
                temp=obj
            }

        }

        for (var key in obj) {


            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null
                temp[key] = util.copy(obj[key])
                delete obj['isActiveClone']
            }
        }

        return temp
    },
    //数字转中文大写intToChinese(2)
    intToChinese ( str ) {
        str = str+'';
        var len = str.length-1;
        var idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
        // var num = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
        var num = ['零','一','二','三','四','五','六','七','八','九'];
        return str.replace(/([1-9]|0+)/g,function( $, $1, idx, full) {
            var pos = 0;
            if( $1[0] != '0' ){
                pos = len-idx;
                if( idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
                    return idxs[len-idx];
                }
                return num[$1[0]] + idxs[len-idx];
            } else {
                var left = len - idx;
                var right = len - idx + $1.length;
                if( Math.floor(right/4) - Math.floor(left/4) > 0 ){
                    pos = left - left%4;
                }
                if( pos ){
                    return idxs[pos] + num[$1[0]];
                } else if( idx + $1.length >= len ){
                    return '';
                }else {
                    return num[$1[0]]
                }
            }
        });
    },
 
}


//增加4个函数，分别用于弹框发出警告 成功 信息 错误的弹窗
'warning success info error'.split(' ').forEach(function (type) {

    util[type + 'Msg'] = function (msg, isShowCancel,d) {
        return emitAlert(msg, isShowCancel, type,d)
    }


})


export default util
