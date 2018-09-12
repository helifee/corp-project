<template>
    <el-dialog
            class="jzy-dialog__wrapper"
            @open="handleOpen"
            @close="handleClose"
            @closed="handleClosed"
    :visible="visible"
    :title="title"
    :append-to-body="appendToBody"
    :modal="modal"
    :modalAppendToBody="modalAppendToBody"
    :lockScroll="lockScroll"
    :closeOnClickModal="closeOnClickModal"
    :closeOnPressEscape="closeOnPressEscape"
    :showClose="showClose"
    :width="width"
    :fullscreen="fullscreen"
    :customClass="customClass"
    :top="top"
    :beforeClose="beforeClose"
    :center="center"
    >
        <div class="el-dialog__header">
            <slot name="title">
                <p class="el-dialog__title">
                    <span class="note"></span>
                    {{ title }}
                </p>
            </slot>
            <slot name="operateButtons"  class="operate_buttons"></slot>
        </div>

        <!--<span slot="title">-->
            <!--<slot name="operateButtons"></slot>-->
        <!--</span>-->
        <div slot>
            <slot></slot>
        </div>
        <div slot="footer">
            <slot name="footer"></slot>
        </div>



    </el-dialog>
</template>
<style lang="scss">
    @keyframes right-dialog-fade-in {
        0% {

            right: -75%;
            opacity: 0
        }
        to {
            right: 0;

            opacity: 1
        }
    }

    @keyframes right-dialog-fade-out {
        0% {
            right:0;

            opacity: 1
        }
        to {
            right:-75%;

            opacity: 0
        }
    }
    .cc-body .jzy-dialog__wrapper{
        width:650px;
        .el-dialog__body{
            padding-left:15px;
        }
    }
    .jzy-dialog__wrapper{

        &.dialog-fade-enter-active{
            animation: right-dialog-fade-in .3s;
            -webkit-animation: right-dialog-fade-in .3s;
        }

        &.dialog-fade-leave-active{
            animation: right-dialog-fade-out .3s;
            -webkit-animation: right-dialog-fade-out .3s;
        }

        width:848px;
        // box-shadow: -3px 0px 5px rgba(153, 153, 153, 0.349019607843137);
        // -webkit-box-shadow: -3px 0px 5px rgba(153, 153, 153, 0.349019607843137);
            right:0;
            left:auto;
        /*top: 60px;*/
        /*&.dialog-fade-enter-active{*/
             /*animation: right-dialog-fade-in .3s;*/
             /*-webkit-animation: right-dialog-fade-in .3s;*/
         /*}*/

        /*&.dialog-fade-leave-active{*/
             /*animation: right-dialog-fade-out .3s;*/
             /*-webkit-animation: right-dialog-fade-out .3s;*/
         /*}*/
        .el-dialog{
            width: 100%;
            height: 100%;
            margin-bottom:0;
            /*margin-top: 0;*/
        }
        .el-dialog__title{
            /*max-width: 500px;*/
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            margin: 0;
        .note{
            top: 16px;
        }
        }
        .is-fullscreen{
            overflow:hidden;
        }
    }
</style>
<script>

    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            openDelay: {},
            closeDelay: {},
            zIndex: {},
            modal: {
                type: Boolean,
                default: false
            },
            modalFade: {
                type: Boolean,
                default: true
            },
            modalClass: {},
            modalAppendToBody: {
                type: Boolean,
                default: true
            },

            closeOnPressEscape: {
                type: Boolean,
                default: false
            },
            closeOnClickModal: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },

            modal: {
                type: Boolean,
                default: true
            },

            modalAppendToBody: {
                type: Boolean,
                default: true
            },

            appendToBody: {
                type: Boolean,
                default: true
            },

            lockScroll: {
                type: Boolean,
                default: false
            },

            closeOnClickModal: {
                type: Boolean,
                default: false
            },

            closeOnPressEscape: {
                type: Boolean,
                default: false
            },

            showClose: {
                type: Boolean,
                default: false
            },

            width: String,

            fullscreen: Boolean,

            customClass: {
                type: String,
                default: ''
            },

            top: {
                type: String,
                default: '0'
            },
            beforeClose: Function,
            center: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            handleOpen:function(){
                console.log('handle open')
                this.$emit('open',...arguments)
            },
            handleClose:function(){
                console.log('handle close')
                this.$emit('close',...arguments)
            },
            handleClosed:function(){
                console.log('handle closed')
                this.$emit('closed',...arguments)
            }
        }
    }
</script>