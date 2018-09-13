<template>
    <div class="monthBox">
        <!--<mCrmHeader titleName="年度统计" :isShowPlus="true" rightBtnText="时间倒排序" v-on:rightClick="rightClick"></mCrmHeader>-->

        <div v-for="(item,index) in list" :key="index">
            <contractItem :data="item" titText="本年" :showMore="false"  myclass="h3-style"></contractItem>
        </div>
    </div>
</template>
<script>
    import contractItem from '../../components/contract_item.vue'
    import service from '../m_contract/m_contract_service.js'
    export default {
        name:"m_conYear",
        components: {
            contractItem
        },
        data () {
            return {
                list:[]
            }
        },
        created(){
            document.title = "年度统计";
        },
        mounted(){
            this.getTotalListByYear();
        },
        methods: {
            getTotalListByYear(){
                service.getTotalListByYear().then((data)=>{
                    this.list = data[0];
                    console.log(data);
            });
            },
            getSearchResult(){

            },
            getMySelected(){

            },
        rightClick(){

        }
        }
    }
</script>

<style lang="scss">


</style>