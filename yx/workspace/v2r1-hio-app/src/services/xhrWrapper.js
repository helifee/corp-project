import xhrWrapperCore from './xhrWrapper.core'
// import MessageBox from 'element-ui/lib/message-box'
// import Message from 'element-ui/lib/message'

import {alertMsg} from '../utils/util'

import s from '../services/service'





// function alertMsg(msg,isShowCancel=false,type) {
//     // s.$store.state.isLoading=false
//     var options = {
//         title: {
//             warning: '警告',
//             info: '提示',
//             success: '恭喜',
//             error: '错误'
//         }[type || 'warning'],
//         message: msg || '系统繁忙请稍后再试',
//         showCancelButton: isShowCancel,
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         closeOnPressEscape: true,
//         closeOnClickModal: false,
//         type: type || 'warning'
//
//     }
//     return MessageBox(options)
//     // .then(()=>{
//     //     s.$store.state.isLoading=false
//     // })
//
// }

// function alertMsg(msg, isShowCancel, type) {
//
//     // if(util.messageBoxVisible){
//     //     return new Promise((resolve,reject)=>{
//     //
//     //         reject()
//     //     })
//     //     util.messageBoxVisible=false
//     // }
//
//     isShowCancel = isShowCancel || false
//
//     let title
//
//     if (typeof(window.JZY) != 'undefined') {
//         title = JZY.locale.$t('{g.dialogTitles.' + (type || 'warning') + '}')
//         // title={
//         //     warning: JZY.locale.$t('{g.warning}'),
//         //     info: JZY.locale.$t('{g.info}'),
//         //     success: JZY.locale.$t('{g.success}'),
//         //     error: JZY.locale.$t('{g.error}')
//         // }[type || 'warning']
//     } else {
//         title = {
//             warning: '警告',
//             info: '提示',
//             success: '恭喜',
//             error: '错误'
//         }[type || 'warning']
//     }
//
//
//
//
//     if(isShowCancel){
//         let options = {
//             title: title,
//             message: msg || '系统繁忙请稍后再试',
//             showCancelButton: isShowCancel,
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             closeOnPressEscape: true,
//             closeOnClickModal: false,
//             type: type || 'warning'
//
//         }
//
//         util.messageBoxVisible = true
//         return MessageBox(options)
//             .then(() => {
//                 util.messageBoxVisible = false
//             })
//     }else{
//
//         return new Promise((resolve)=>{
//
//             Message({
//                 message: msg || '系统繁忙请稍后再试',
//                 type: type || 'warning'
//             });
//
//             resolve()
//         })
//     }
//
//
//
//
//
//
// }

'warning success info error'.split(' ').forEach(function(type){
    xhrWrapperCore[type+'Msg']=function(msg,isShowCancel){


        if(type=='error' && !s.hasXhrError){

            s.hasXhrError=true
            //
            if(JZY.DEBUG_MODE && JZY.LOG_MODE && JZY.RELOAD_WHEN_ERROR){
                setTimeout(()=>{

                    location.reload()

                },5000)
            }

        }

        return alertMsg(msg,isShowCancel,type)
    }
})







export default xhrWrapperCore