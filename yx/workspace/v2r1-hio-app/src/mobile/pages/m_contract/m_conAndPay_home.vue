<template>
    <div class="contract-box">
        <!--<mCrmHeader titleName="付款合同/付款台账"  :isShowPlus="false"></mCrmHeader>-->
        <grid class="tab-grid-box">
            <grid-item :link="{path: item.path}" v-for="(item,index) in list" :key="index">
                <img slot="icon" :src="item.img">
                <span class="grid-center my-item-title">{{item.name}}</span>
            </grid-item>
        </grid>
        <contractItem titText="本月" :data="monthData" :showMore="true" :url="monthUrl"></contractItem>
        <contractItem titText="本年" :data="yearData" :showMore="true" :url="yearUrl"></contractItem>
    </div>
</template>
<script>
    import {Grid,GridItem } from 'vux'
    import contractItem from '../../components/contract_item.vue'
    import service from '../m_contract/m_contract_service.js'
    export default {
        name:"m_contract_home",
        components: {
            contractItem,
            Grid,
            GridItem
        },
        data () {
            return {
                list:[
                    {name:"付款合同",path:"./m_contract/m_contract_home",img:JZY.c.m_imgPath+"/hetong@2x.png"},
                    {name:"付款台账",path:"./m_contract/m_pay_home",img:JZY.c.m_imgPath+"/zhifu@2x.png"}
                ],
                monthData:{},
                monthUrl:"#/m_contract/m_conMonth",
                yearData:{},
                yearUrl:"#/m_contract/m_conYear",
                todayYearMonth:"",
                todayYear:""

            }
        },
        created(){
          document.title = "付款合同/付款台账";
        },
        mounted(){
            this.getTotalListByMonth();
            this.getTotalListByYear();
            this.todayYearMonth = new Date().getMonth()<10 ? new Date().getFullYear()+"年0"+(new Date().getMonth()+1)+"月" : new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月";
            this.todayYear = new Date().getFullYear()+"年";
        },
        methods: {
            getTotalListByMonth(){
                service.getTotalListByMonth().then((data)=>{
                    if(data[0] && data[0].length>0){
                        data[0].forEach((n,i)=>{
                            if(n.totalTime==this.todayYearMonth){
                                this.monthData = n;
                            }
                        })
                    }

                console.log(data);
            });
            },
            getTotalListByYear(){
                service.getTotalListByYear().then((data)=>{
                    if(data[0] && data[0].length>0){
                        data[0].forEach((n,i)=>{
                            if(n.totalTime==this.todayYear){
                                this.yearData = n;
                            }
                        })
                    }
                console.log(data);
            });
            },
            getSearchResult(){

            },
            getMySelected(){

            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_crm.scss';
</style>
<style lang="scss">
    .contract-box .tab-grid-box{

        background: #fff;
    .weui-grid__icon{
        width: 40px;
        height: 45px;
    }
        .weui-grid__icon img{
            width: 40px;
            height: 40px;
            vertical-align: middle;
        }
    .my-item-title{
        font-size: 13px;
        color: #191919;
    }
    .weui-grid{
        text-align: center;
    }
    .weui-grid:before{
        border-right: none;
    }
    }


</style>