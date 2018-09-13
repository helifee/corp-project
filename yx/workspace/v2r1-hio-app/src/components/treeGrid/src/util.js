import MessageBox from 'element-ui/lib/message-box'
import Vue from 'vue'

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


// import Vue from 'vue'


const findIndexInArr = (val, arr) => {
    let has = -1
    for (let i = 0 ;i < arr.length; i++) {
        if (arr[i] == val) {
            has = i
            break
        }
    }
    return has
}



// const hash = ()=> Math.floor(Math.random()*Math.random()*Math.random()*Math.random()*1000)
// const index = (hash,data) =>{
//     let i = 0
//     while(data[i] ) {
//         if( data[i].$extra && data[i].$extra.hash == hash ){
//             break
//         }
//         i++
//     }
//     return i
// }


let u={
    closest(el, selector) {
        var matchesFn

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn
                return true
            }
            return false
        })

        var parent

        // traverse parents

        if(el[matchesFn](selector)){
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
    testTime(str,fn){
      let t=Date.now()
      let res=fn()
      u.clog('任务['+str+']耗时:',(Date.now()-t)/1000)
        return res
    },
    findIndexInArr,
    // hash,
    // index,
    //一个空函数，通过编辑器替换clog为illLog后将不再显示任何日志
    killLog(){},
    //此方法替代console.log，用于便捷控制log的开启与关闭
    clog(){
        if(JZY&&JZY.LOG_MODE){
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

    //js深度对象扩展
    deepExtend:deepExtend,
    //js深拷贝
    copy(obj,excludeKeys=[]) {
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
            if (Object.prototype.hasOwnProperty.call(obj, key)&&(!excludeKeys.includes(key))) {

                obj['isActiveClone'] = null
                temp[key] = u.copy(obj[key])
                delete obj['isActiveClone']
            }
        }


        return temp
    },

    // 对一个简单对象删除某些属性并返回改对象副本
    copyDataAndDeleteSomeProps(obj,props){
        let newObj=u.copy(obj)
        props.forEach((prop)=>{
            delete newObj[prop]
        })
        return newObj
    },

}


//增加4个函数，分别用于弹框发出警告 成功 信息 错误的弹窗
'warning success info error'.split(' ').forEach(function(type){

    if(typeof(Vue)!='undefined'){
        u[type+'Msg']=function(msg,isShowCancel){
            return emitMessageBox(msg,isShowCancel,type)
        }
    }else{
        u[type+'Msg']=function(msg,isShowCancel){
            alert(msg)
        }
    }


})

export default u
