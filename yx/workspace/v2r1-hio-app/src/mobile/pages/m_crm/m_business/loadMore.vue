<template>
    <div>
        <load-more tip="loading" v-if="status"></load-more>
        <div class="look-all continue" v-if="currentTotal<total">
            <span class="loadNextPage" style="cursor: pointer" @click="loadMore">展开更多</span>
        </div>
        <div class="look-all noMore" v-if="currentTotal>=total">
            <a class="" style="cursor: pointer">没有更多了</a>
        </div>

    </div>
    
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))

    import { LoadMore } from 'vux'
    
    export default {
        components: {
           LoadMore
        },
        props:{
            status:{
                type:Boolean
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
            // selectItem(item){
            //     this.$emit("selected",item);
            // },
            loadMore(){
                let nextPage = this.pageNum + 1;
                this.$emit("getPageNum",nextPage)
            }
        },
        data () {
            return {
                // isShow:false,
                // isContinue:false
            }
        }
    } 
</script>

<style lang="scss">
   
    .businessBox {
        ul,ul li{
        list-style: none
        }
        li{ border-bottom:1px solid #dedede; padding-bottom:10px}
        .title{font-size:1rem;font-weight: normal}
        .dec { color:#ccc; font-size:0.8rem}
        .title span{ float:right}
        .dec span{ float:right}
        
    }
</style>
<style lang="scss" scoped>
.look-all{
            height: 40px;
            line-height: 40px;
            // background: #fff;
            text-align: center;
            cursor: pointer;
            /*border-top: 1px solid #EDEDED;*/
            position: relative;
        }
        .look-all span:after{
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 0px 1px 1px 0px;
            border-color: #C8C8CD;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: absolute;
            top: 50%;
            right: 36%;
            margin-top:-4px;
        }
        .look-all span{
            font-size: 12px;
            color: #999999;
            text-decoration: none;
        }
        .look-all.noMore{
            text-align:center;
            padding:20px;
        }
        .look-all.noMore a{
            font-size: 12px;
            color: #999;

        }
</style>