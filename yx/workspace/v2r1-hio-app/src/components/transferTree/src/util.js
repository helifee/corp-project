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
let u={
    clog(){
        if(typeof(Vue.prototype.BX)!='undefined'){
            console.log('---begin----')
            for(var i=0;i<arguments.length;i++){
                console.log('第'+(i+1)+'个参数:',arguments[i])
            }
            console.log('---end---')
        }
    },
    // 函数节流
    debounce: function (func, wait=100, immediate=true) {
        // console.log('')
        let timeout
        return function () {
            let context = this, args = arguments
            let later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            let callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },
    //从list中获取所有key为key的元素的value并存放到一个新数组中
    getValueArrByKeyFromArray(list,key,conFun){
        conFun=conFun||function(){return true}
        var result=[]
        list.forEach((item)=>{
            if(conFun(item)){
                result.push(item[key])
            }

        })
        return result
    },
    // 函数轮询
    poll:function (fn, callback, errback, timeout, interval) {












        let endTime = Number(new Date()) + (timeout || 200000)
        interval = interval || 100

        function p() {
            // If the condition is met, we're done!
            if (fn()) {
                callback()
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval)
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments))
            }
        }

        p()
    },
    deepExtend:(function(){

        function extend(source,tar){
            var copiedSource=u.copy(source),
                copiedTar=u.copy(tar)
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
    copy(obj) {
        let temp
        if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
            return obj


        if (obj instanceof Date){
            temp = new obj.constructor() //or new Date(obj)
        }

        else{
            temp = obj.constructor()
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null
                temp[key] = u.copy(obj[key])
                delete obj['isActiveClone']
            }
        }

        return temp
    },
    // 在$scope这个对象中访问modelExpression指定的数据
    // getDataByModel: function ($scope, modelExpression, otherWiseVal) {
    //     otherWiseVal = otherWiseVal || null
    //
    //     if(!$scope){
    //         return otherWiseVal
    //     }
    //
    //     var arr = modelExpression.split('.'), len = arr.length, result = $scope
    //     // console.log('len:',len)
    //     if (len === 1) {
    //         // if($scope.hasOwnProperty(arr[0])) {
    //         //     return $scope[arr[0]]
    //         // }
    //         // else if($scope.result && $scope.result[arr[0]]) {
    //         //     return $scope.result[arr[0]]
    //         // }
    //         return $scope.hasOwnProperty(arr[0])?$scope[arr[0]]:otherWiseVal
    //     } else if (len > 1) {
    //         var isError = false
    //         for (var i in arr) {
    //             if (typeof(result[arr[i]]) === 'undefined') {
    //                 isError = true
    //                 break
    //             } else {
    //                 result = result[arr[i]]
    //             }
    //         }
    //         if (isError) {
    //             return otherWiseVal
    //         } else {
    //             return result
    //         }
    //     } else if (len === 0) {
    //         return otherWiseVal
    //     }
    // },
    // 对一个简单对象删除某些属性并返回改对象副本
    copyDataAndDeleteSomeProps(obj,props){
        let newObj=u.copy(obj)
        props.forEach((prop)=>{
            delete newObj[prop]
        })
        return newObj
    },
    // 一个简单粗暴的搜索算法
    // BFS(data,treeKey,pidKey){
    //     var result={
    //         // self:null,
    //         children:{
    //
    //         }
    //     },keyIndex={},len=data.length
    //     for(var i=0;i<len;i++){
    //         var item=data[i]
    //         if(item.$extra.deepth==1){
    //
    //             result.children[item[treeKey]]={
    //                 ...u.copyDataAndDeleteSomeProps(item,['children']),
    //                 children:{}
    //             }
    //             keyIndex[''+item[treeKey]]=result.children[item[treeKey]]
    //
    //         }else{
    //             // if(typeof(keyIndex[pidKey])!=='undefined'){
    //
    //             let parentId=u.getDataByModel(item,pidKey)
    //             if(!keyIndex[parentId]){
    //                 keyIndex[parentId]={
    //                     ...u.copyDataAndDeleteSomeProps(item,['children']),
    //                     children:{}
    //                 }
    //             }
    //             keyIndex[''+item[treeKey]]=keyIndex[parentId].children[item[treeKey]]={
    //                 self:item,
    //                 children:{}
    //             }
    //
    //         }
    //     }
    //     return result
    //
    // }
}


'warning success info error'.split(' ').forEach(function(type){
    u[type+'Msg']=function(msg,isShowCancel){
        return emitMessageBox(msg,isShowCancel,type)
    }
})

export default u
