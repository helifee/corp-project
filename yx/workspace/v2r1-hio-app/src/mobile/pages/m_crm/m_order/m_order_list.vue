<template>
  
    <div class="bg">
        <ul class="orderPage">
            <li v-for="item in searchList" v-on:click="selectItem(item)">
                <div>
                    <div class="tp">
                        <span class="title">{{item.orderName}}</span>
                        <span class="code" v-if="item.orderCode">订单编号：{{item.orderCode}}</span>
                        </div>
                    <div class="ft">
                        <p>{{item.customerName}}</p>
                        <p>签约金额：{{item.signAmount}} 元</p>
                        <p>订单状态：{{item.orderStatus ? "已签" : '草稿'}}</p>
                    </div>
                    
                </div>
            </li>
        </ul> 
        <myloadMore :currentTotal="currentTotal" :pageNum="pageNum" :status="status" :total="total" @getPageNum="getPageNum"></myloadMore>

    </div>
</template>
<script>
    import myloadMore from '@mobile/pages/m_crm/m_business/loadMore.vue'

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
        data () {
            return {
                
            }
        }
    } 
</script>

<style lang="scss">
    @import '../../../static/css/business.scss';
</style>