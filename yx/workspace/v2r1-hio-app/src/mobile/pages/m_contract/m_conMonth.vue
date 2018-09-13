<template>
    <div class="monthBox">
        <!--<mCrmHeader titleName="月度统计" :isShowPlus="true" rightBtnText="时间倒排序" v-on:rightClick="rightClick"></mCrmHeader>-->
        <div v-for="(item,index) in list" :key="index">
            <contractItem :data="item" titText="本月" :showMore="false" myclass="h3-style"></contractItem>
        </div>
    </div>
</template>
<script>
    import contractItem from '../../components/contract_item.vue'
    import service from '../m_contract/m_contract_service.js'
    export default {
        name:"m_conMonth",
        components: {
            contractItem
        },
        data () {
            return {
                list:[]
            }
        },
        created(){
            document.title = "月度统计";
        },
        mounted(){
            this.getTotalListByMonth();
        },
        methods: {
            getTotalListByMonth(){
                service.getTotalListByMonth().then((data)=>{
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