import MessageBox from 'element-ui/lib/message-box'
import Vue from 'vue'
// element-ui各种message box便捷调用
function emitMessageBox(msg,isShowCancel,type) {
    isShowCancel = isShowCancel || false
    let options = {
        title: {
            warning: '警告',
            info: '提示',
            success: '恭喜',
            error: '错误'
        }[type || 'warning'],
        message: msg || '',
        showCancelButton: isShowCancel,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnPressEscape: true,
        closeOnClickModal: false,
        type: type || 'warning'

    }
    return MessageBox(options)


}
let util={
    // dimString(str,startIndex,endIndex,dimStr='X'){
    //     let res=''
    //     for(let i=0,len=str.length;i<len;i++){
    //         if(i>=startIndex&&i<=endIndex){
    //             res+=dimStr
    //         }else{
    //             res+=str[i]
    //         }
    //     }
    //     return res
    // },
    // js动态给对象传递key值 let key = id; arr[i][key] 与 arr[i].id 相同
    uniqObjectInArray:function (arr,key) {
        let result = {};
        let finalResult = [];
        // console.log('--------选中key值为id的value-----------')
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i][key])
            result[arr[i][key]] = arr[i];
            //因为arr[i].id不能重复,达到去重效果,且这里必须知晓"id"或是其他键名
        }
        // console.log('--------生成的result对象-----------')
        // console.log(result)
        //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
        // console.log('--------便利对象的每一项-----------')
        for (let item in result) {
            // console.log(result[item])
            finalResult.push(result[item]);
        }
        // console.log('--------最终去重的结果-----------')
        return finalResult;
    },
    formatTime:function(d){
        if(Number.isInteger(d)){
            d=new Date(d)
        }
        // console.log('date this------:',this,value,new Date(value))
        var yyyy = d.getFullYear().toString()
        var mm = (d.getMonth()+1).toString()
        var dd  = d.getDate().toString()
        var hh=d.getHours().toString()
        var ii=d.getMinutes().toString()
        var ss=d.getSeconds().toString()
        return yyyy+'/' + (mm[1]?mm:"0"+mm[0])+'/' + (dd[1]?dd:"0"+dd[0])+' '+ (hh[1]?hh:"0"+hh[0])+':'+ (ii[1]?ii:"0"+ii[0])+':'+ (ss[1]?ss:"0"+ss[0])
    },
    // isAllTrue(arr){
    //     let res=true
    //     arr.forEach((item)=>{
    //         if(item!=true){
    //             res=false
    //         }
    //     })
    //     return res
    // },
    // multiSplice(valuesArr,indexArr){
    //     for (var i = indexArr.length -1; i >= 0 ;i--)
    //         valuesArr.splice(indexArr[i],1)
    // },
    // isLocal(){
    //     return location.host.includes('localhost')
    // },
    // isDebugMode(){
    //     return typeof(Vue.prototype.BX)!='undefined' || location.href.includes('bxdebug')
    //
    // },
    // SILog(){
    //     if(this.debugMode==true){
    //         console.log('---begin----')
    //         for(var i=0;i<arguments.length;i++){
    //             console.log('第'+(i+1)+'个参数:',arguments[i])
    //         }
    //         console.log('---end---')
    //     }
    // },
    // closest(el, selector) {
    //     var matchesFn
    //
    //     // find vendor prefix
    //     ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
    //         if (typeof document.body[fn] == 'function') {
    //             matchesFn = fn
    //             return true
    //         }
    //         return false
    //     })
    //
    //     var parent
    //
    //     // traverse parents
    //
    //     if(el[matchesFn](selector)){
    //         return el
    //     }
    //
    //     while (el) {
    //         parent = el.parentElement
    //         if (parent && parent[matchesFn](selector)) {
    //             return parent
    //         }
    //         el = parent
    //     }
    //
    //     return null
    // },
    clog(){
        if(JZY&&JZY.LOG_MODE){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---')
        }
        // if(util.isDebugMode()){
        //     console.log('---begin----')
        //     for(var i=0;i<arguments.length;i++){
        //         console.log('第'+(i+1)+'个参数:',arguments[i])
        //     }
        //     console.log('---end---')
        // }
    },
    isNumber(obj) {

        return typeof obj === 'number' && !isNaN(obj)
    },
    isNull: function (str) {
        return (typeof(str) === 'string' && str.trim() === '') || (typeof(str) === 'undefined') || (str === null)
    },
    // 对一个简单对象删除某些属性并返回改对象副本
    copyDataAndDeleteSomeProps(obj,props){
        let newObj=util.copy(obj)
        props.forEach((prop)=>{
            delete newObj[prop]
        })
        return newObj
    },
    // debounce: function (func, wait, immediate) {
    //     // console.log('')
    //     var timeout
    //     return function () {
    //         var context = this, args = arguments
    //         var later = function () {
    //             timeout = null
    //             if (!immediate) func.apply(context, args)
    //         }
    //         var callNow = immediate && !timeout
    //         clearTimeout(timeout)
    //         timeout = setTimeout(later, wait)
    //         if (callNow) func.apply(context, args)
    //     }
    // },
    //
    // //在一个map中，通过指定的key数组遍历找到对应的value，适用于某字段可以用不同key表示但是同一时刻必定仅有一个对应的value
    // getValueByMultiKeyFromMap(map,arr,notExistValue=null){
    //     var result=null
    //
    //     if(typeof(arr)==='string'){
    //         arr=arr.split(" ")
    //     }
    //
    //
    //     for(var i=0,len=arr.length;i<len;i++){
    //         if(arr[i] in map){
    //             result=map[arr[i]]
    //             break
    //         }
    //     }
    //
    //     if(result===null){
    //         return notExistValue
    //     }else{
    //         return result
    //     }
    // },
    deepExtend:(function(){

        function extend(source,tar){
            var copiedSource=util.copy(source),
                copiedTar=util.copy(tar)
            for(var i in copiedTar){
                copiedSource[i]=copiedTar[i]
            }
            return copiedSource
        }

        extend.all=function(args){
            // console.log('arr')
            // var args=arr[0]
            console.log('all args:',args)
            if(args.length<2){
                alert('必须大于2个参数才能深度合并')
            }else{
                var result=extend(args[0],args[1])
                for(var i=2;i<args.length;i++){
                    result=extend(result,args[i])
                }
                return result
            }
        }

        return extend

    })(),
    // poll:function (fn, callback, errback, timeout, interval) {
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //     var endTime = Number(new Date()) + (timeout || 200000)
    //     interval = interval || 100;
    //
    //     (function p() {
    //         // If the condition is met, we're done!
    //         if (fn()) {
    //             callback()
    //         }
    //         // If the condition isn't met but the timeout hasn't elapsed, go again
    //         else if (Number(new Date()) < endTime) {
    //             setTimeout(p, interval)
    //         }
    //         // Didn't match and too much time, reject!
    //         else {
    //             errback(new Error('timed out for ' + fn + ': ' + arguments))
    //         }
    //     })()
    // },
    copy(obj) {
        if (obj == null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj

        let temp

        if (obj instanceof Date){
            temp = new obj.constructor() //or new Date(obj)
        }

        else{
            temp = obj.constructor()
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
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    },
}

'warning success info error'.split(' ').forEach(function(type){
    util[type+'Msg']=function(msg,isShowCancel){
        return emitMessageBox(msg,isShowCancel,type)
    }
})
export default util
