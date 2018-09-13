import u from '@util'
let language;

import globalLocale from './global.locale'

let {uuid}=u







const fun=function(){

}
fun.addEnglishLocale=function(obj){
    let map={

    }
    for(var i in obj['zh-CN']){
        map[i]=i
    }
    obj['en']=map

    return obj
}
const map={
//     headerMenu:fun.addEnglishLocale({
//         'zh-CN':{
//             'home':'首页',
//             'news':'新闻',
//             'approve':'审批',
//             'schedule':'日程',
//             'CRM':'CRM',
//             'plan':'计划',
//             'project':'项目',
//             'task':'任务',
//             'EHR':'EHR',
//             'more':'更多'
//         }
//     }),
    global:globalLocale

}
fun.getCurrentLanguage=function(){
    return new Promise((resolve,reject)=>{
        let lan=localStorage.getItem('defaultLanguage')


        if(!lan||!(lan in map.global)){
            lan='zh-CN'
        }
        language=lan
        resolve(lan)
    })

}




// let addLocaleToStore=function(key,locale){
//   locale=locale[language]
//   store.commit('UPDATE_LOCALE',{
//     key:key,
//     locale:locale
//   })
// }
//
//
//
// addLocaleToStore('global',map.global)




let transformExpr=function(expr){


    // let isArray=Array.isArray(expr),
    //     joinSymbol=uuid()
    //
    //
    // if(isArray){
    //     expr=expr.join(joinSymbol)
    // }


    let res=expr.replace(/{.*?}/gi,function (str) {
        let arr=str.split('.'),res
        arr.splice(1,0,language)
        res=arr.join('.')

        let exprFindingArr=[arr[0].replace(/{|}/gi,'')],
            localeDeps=JZY.c.localeDeps[JZY.s.getModuleName()]
        if(localeDeps){
            (localeDeps=JZY.u.copy(localeDeps)).forEach((item,index)=>{
                localeDeps[index]=localeDeps[index]+'Locale'
            })
            exprFindingArr=exprFindingArr.concat(localeDeps)

            // JZY.s.clog('exprFindingArr--:',exprFindingArr)
        }

        let previousExprStr=res.substring(1,res.length-1)
        for(var i=0;i<exprFindingArr.length;i++){

             let findExpr=exprFindingArr[i]+'.'+previousExprStr.split('.').slice(1).join('.')
             // console.log('findExpr-=:',findExpr)

            if(u.getDataByModel(map,findExpr)){

                res=findExpr
                break;
            }

        }


        // let strOfModel=u.getDataByModel(map,res.substring(1,res.length-1))


        // if(!u.getDataByModel(map,res.substring(1,res.length-1))){
        //     arr.splice(1,0,arr[0].replace(/{|}/gi,''))
        //     res=arr.join('.')
        // }


        return '{'+res+'}'
    })

    //
    // if(isArray){
    //     res=res.split(joinSymbol)
    // }


    return res


}

fun.switchLanguage=function(lan){
    // language=lan
    localStorage.setItem('defaultLanguage',lan)
    location.reload()
}
fun.getAll=function(){
    return map
}

fun.add=function(moduleName,obj){
    map[moduleName]=obj
  // addLocaleToStore(moduleName,obj)
  // store.commit('UPDATE_LOCALE',map)
    // console.log("kcuf_u map:",map)
}
fun.$t=function(expr){
  // console.log('transformExpr(expr)--:',expr)
  // return 'hello world'

    // let tpl

    // console.log('expr before:',expr)
    let prefixStr=JZY.s.getPathName().substring(1).split('/')[0]+'Locale',
        leftBraceCount=0,
        transformStrFun=(str)=>{
            leftBraceCount++;

            if(str.startsWith('{g.')){
                str='{global.'+str.substring(3)
            }
            if(!str.startsWith('{global')){
                if(str.startsWith('{')&&str.endsWith('}')){
                    let postStr=str.substring(1,str.length-1),
                        strBeforeFirstPoint=str.substring(1).split('.')[0]
                    // alert(strBeforeFirstPoint)

                    if(strBeforeFirstPoint.includes('Locale')||(strBeforeFirstPoint==prefixStr)){
                        str=postStr
                    }else{
                        str=prefixStr+'.'+postStr
                    }

                    str='{'+str+'}'
                }
                else if((!str.includes('{'))&&(!str.includes('}'))){
                    str='{'+prefixStr+'.'+str+'}'
                }
            }

            return str;
        }


        let a=/[!({)]{(.+?)}/g

    expr=expr.replace(/{(.+?)}/g,transformStrFun)


    // JZY.s.clog('leftBraceCount:',leftBraceCount)

    if(leftBraceCount==0){
        expr=transformStrFun(expr)
    }





    let tpl=transformExpr(expr),
        percentCharCount=0,
        restArgs=Array.from(arguments).slice(1)


    // JZY.s.clog('expr tpl--:',tpl)

    // console.log('tpl---:',tpl)
    // if()

    let res=u.simpleTplEngine({
        tpl:tpl,
        data:map
    }),
        handleVar=(str)=>{
            return str.replace(/ %(.+?)% /g,(str)=>{
                return restArgs[percentCharCount++]
            })
        }

        if(!res){
            return '语言未设定'
        }else{

            // JZY.s.clog('res--:',res)

            if(typeof(res)=='string'){
                res=handleVar(res)
                return res
            }else{
                // let isArray=Array.isArray(res)
                // if(isArray){
                //     res.forEach((item)=>{
                //         item=handleVar(item)
                //     })
                // }else if(typeof(res)=='object'){
                //     for(var i in res){
                //         res[i]=handleVar(res[i])
                //     }
                // }
                // else{
                //     return '语言未设定'
                // }
                return res;
            }
        }





}

//
// fun.mapLocale=function(to,from){
//     if(typeof(from)=='string'){
//         from=[from]
//     }
//     from.forEach((item)=>{
//         map[to][map[item]]=map[item]
//     })
// }

export default fun
