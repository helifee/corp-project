<template>
    <div style="height:100%;">
        <!--<x-button type="primary" @click.native="$vux.toast.text('How are you~', 'top')">use text function</x-button>-->
        <router-view style="height:100%;"></router-view>
    </div>
</template>
<style lang="sass">

@import './m_common.scss'

</style>
<script>
    import messageBox from '@messageBox'
    import Vue from 'vue'
    import  { LoadingPlugin } from 'vux'
    let {ConfirmPlugin,ToastPlugin}=messageBox


    // import {ToastPlugin} from '@message'
    Vue.use(ToastPlugin)
    Vue.use(ConfirmPlugin)
    Vue.use(LoadingPlugin)
    // Vue.use(ToastPlugin, {position: 'bottom'})
    //
    // import { Toast, Group, XSwitch, XButton } from 'vux'

    export default {
         components: {

         },
        data(){
            return {
                show2: false,
            }
        },
        mounted(){
             JZY.s.showLoading=()=>{
                 this.$vux.loading.show({
                     text: 'Loading'
                 })
             }
             JZY.s.hideLoading=()=>{
                 this.$vux.loading.hide()
             }
            'warning success info error'.split(' ').forEach((type)=> {

                JZY.u[type + 'Msg'] = (msg, isShowCancel,d=3000)=> {

                    if(!isShowCancel){
                        let finalType={
                            warning:'warn',
                            success:'success',
                            info:'text',
                            error:'warn'
                        }[type]
                        return new Promise((resolve)=>{

                            // console.log('kcuf_u this.$vux.toast.text--:',this.$vux.toast)

                            // this.$vux.toast[finalType](msg, 'bottom')

                            // alert(finalType)

                            this.$vux.toast.show({
                                text: ''+msg,
                                type:finalType,
                                time:d
                            })
                            resolve()
                        })
                    }else{
                        return new Promise((resolve,reject)=>{
                            this.$vux.confirm.show({
                                title:msg,
                                // 组件除show外的属性
                                onCancel () {
                                    reject()
                                },
                                onConfirm () {
                                    resolve()
                                }
                            })
                        })

                    }

                    return emitAlert(msg, isShowCancel, type,d)
                }


            })
            // console.log('Toast--:',Toast)
            // Toast.show({
            //     text: 'Hello World',
            //     onShow() {
            //         console.log('Plugin: I\'m showing')
            //     },
            //     onHide() {
            //         console.log('Plugin: I\'m hiding')
            //         _this.show9 = false
            //     }
            // })
        }
    }
</script>