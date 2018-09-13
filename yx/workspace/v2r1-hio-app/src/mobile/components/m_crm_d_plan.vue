<template>
    <div class="base penal-box yellow">
        <h3><span>跟进计划</span><router-link v-on:click.native="putFromUrl" :to=""><i></i></router-link></h3>
        <router-link :to="{name:'m_cus_his_detail',params:{id:item.sid}}" v-for="(item,index) in list" :key="index" v-show="index<2">
            <div class="item">
                <p><label>{{item.target}}</label></p>
                <p><label>计划日期：</label><label>{{item.contactTime}}</label></p>
                <p><label>负责人：</label><label>{{item.createPersonName}}</label></p>
                <span class="status"><i class="circle green-circle"></i>已跟进</span>
            </div>
        </router-link>
        <p class="can-click-style"><router-link class="detail" :to="{name:'m_cus_plan',query:{customerId:id}}">查看全部计划&nbsp;&nbsp;|&nbsp;&nbsp;<i>{{planTotal}}</i></router-link></p>

    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import s from '@mobile/m_service.js'
    import { Divider } from 'vux'
    export default {
        name:"mCrmDetailPlan",
        components: {
            Divider
        },
        props: ["list","planTotal","addRoute"],
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