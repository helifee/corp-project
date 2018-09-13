<template>
    <div>
        <header class="header-box">
            <i class="left-arrow" @click="goBack"></i>
            <span>{{titleName}}</span>
            <i :class="rightBtnText ? 'right-btn-style' : 'icon-plus'" v-show="isShowPlus" @click="goToAddPage">{{rightBtnText}}</i>
        </header>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { XHeader } from 'vux'

    export default {
        name:"mCrmHeader",
        components: {
            XHeader
        },
        props: ['titleName','isShowPlus','rightBtnText'],
        data () {
            return {
//                isShowPlus:false
            }
        },
        mounted(){

        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            goToAddPage(){
              this.$emit("rightClick");
            }
        }
    }
</script>

<style lang="scss">
    @import '../static/css/m_crm.scss';
    /*@import '~vux/src/styles/1px.less';*/
    /*@import '~vux/src/styles/center.less';*/

    .header-box{
        height: 44px;
        line-height: 44px;
        vertical-align: middle;
        font-size: 17px;
        color: #333333;
        padding: 0 10px;
        background: #fff;
        text-align: center;
        .left-arrow{
            width: 9px;
            height: 16px;
            display: inline-block;
            float: left;
            background: url("../static/images/return.png") no-repeat;
            background-size: 9px 16px;
            margin-top: 15px;
        }
    .icon-plus{
        width: 20px;
        height: 20px;
        display: inline-block;
        float: right;
        background: url("../static/images/add.png") no-repeat;
        background-size: 20px 20px;
        margin-top: 12px;
    }
    .right-btn-style{
        font-size: 16px;
        color: #009EFF;
        float: right;
    }
    }

</style>