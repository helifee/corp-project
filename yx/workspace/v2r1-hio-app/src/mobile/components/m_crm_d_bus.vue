<template>
    <div class="base penal-box purpple">
        <h3><span>商机</span><i></i></h3>
        <div class="item" v-for="(item,index) in list" :key="index">
            <p><label>{{item.customerName}}</label><span>{{item.lastFollowTime}}</span></p>
            <p class="address"><label>北京万卓科技公司</label><span>{{item.estimateAmount}}</span></p>
            <a class="btn">{{stageMap[item.stage]}}</a>
        </div>
        <p class="can-click-style"><a class="detail" href="javascript;void(0);">查看全部商机&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{opporTotal}}</i></a></p>

    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { Divider } from 'vux'
    import s from '@mobile/m_service.js'
    export default {
        name:"mCrmDetailBus",
        components: {
            Divider
        },
        props: ["list","opporTotal"],
        data () {
            return {
//                isShowPlus:false
            }
        },
        mounted(){

        },
        methods: {
            putFromUrl(){
                let fromUrl = {
                    name:this.$route.name,
                    query:this.$route.query
                }
                s.putData("fromUrl",fromUrl);
            },
        }
    }
</script>

<style lang="scss">

</style>