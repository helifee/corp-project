<template>
    <div class="bg">
        <ul class="businessBox">
            <li v-for="item in searchList" v-on:click="selectItem(item)">
                <div>
                    <h2 class="title"><span class="name">{{ item.opportunitName }}</span> <span class="time">{{item.lastFollowTime}}</span></h2>
                    <p class="dec">{{ item.customerName }} <span>{{item.estimateAmount}}</span></p>
                </div>
                <div class="ft">
                    <span>{{ item.stage | filterStage }}</span>
                </div>
            </li>
        </ul> 
        <myloadMore :currentTotal="currentTotal" :pageNum="pageNum" :status="status" :total="total" @getPageNum="getPageNum"></myloadMore>

    </div>
    
</template>
<script>
    import myloadMore from './loadMore.vue'


    export default {

        components: {
           myloadMore
        },
        props:{
            status:{
                type:Boolean
            },
            searchList :{
                type:Array
            },
            currentTotal: {
                type:Number
            },
            pageNum : {
                type:Number
            },
            total : {
                type : Number
            }
        },
        methods: {
            selectItem(item){
                this.$emit("selected",item);
            },
            getPageNum(val){
                this.$emit("loadMore",val)
            }
        },
        filters:{
            filterStage (val){
                let str = "";
                switch(val){
                    case 0:
                    str = "立项";
                    break;
                    case 1:
                    str = "初步沟通";
                    break;
                    case 2:
                    str = "需求商定";
                    break;
                    case 3:
                    str = "方案报价";
                    break;
                    case 4:
                    str = "赢单";
                    break;
                    case 5:
                    str = "输单";
                    break;
                }
                return str;
            }
        },
        data () {
            return {
            
            }
        }
    } 
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../../static/css/n_myCss.scss';
    
</style>
<style lang="scss" rel="stylesheet/scss" >
// body{background: #f5f5f5;}
</style>