<template>
    <div>

        <div style="padding:15px;">
            <button type="primary" @click="$vux.toast.text('How are you~', 'top')">use text function</button>
        </div>
    </div>
</template>



<script>
    import { Toast, Group, XSwitch, XButton } from 'vux'

    import Vue from 'vue'
    import  { ToastPlugin } from 'vux'
    Vue.use(ToastPlugin)
    export default {
        // mounted(){
        //   console.log("this in toast demo:",this)
        // },
        components: {
            // Toast,
            // Group,
            // XSwitch,
            // XButton
        },
        methods: {
            showPosition (position) {
                this.position = position
                this.showPositionValue = true
            },
            onHide () {
                console.log('on hide')
            },
            onChange (val) {
                const _this = this
                if (val) {
                    this.$vux.toast.show({
                        text: 'Hello World',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                            _this.show9 = false
                        }
                    })
                } else {
                    this.$vux.toast.hide()
                }
            }
        },
        data () {
            return {
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,
                show7: false,
                show8: false,
                show9: false,
                position: 'default',
                showPositionValue: false
            }
        }
    }
</script>