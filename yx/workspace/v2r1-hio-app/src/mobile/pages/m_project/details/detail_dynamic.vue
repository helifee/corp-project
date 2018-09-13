<template>
    <div class="m_project_dynamic">
        <scroller lock-x  :height="wrapperHeight+'px'"
                  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100">
            <div>
                <cell v-for="(item,index) in list" :key="index" :title="item.trendContent" class="dynamic_cell">
                    <div class="list_icon" slot="icon" :style="{'background-color': '#009EFF' }">
                        <icon  name="m_project_dynamic" scale="1.5"></icon>
                    </div>
                    <div class="list_desc" slot="inline-desc">
                        <p>操作人：{{item.trendPersonName}}</p>
                        <p>{{ item.trendEndTime }}</p>
                    </div>
                </cell>
                <load-more tip="loading" v-if="moreData"></load-more>

                <load-more tip="没有更多数据" :show-loading="false" v-else></load-more>
            </div>
        </scroller>
    </div>

</template>

<script>
    import {Group, Cell, XButton, Swiper, SwiperItem, Scroller, LoadMore, AlertModule,} from 'vux'
    import {postProjectDynamic} from '@mobile/pages/m_project/detailService.js'
    export default {
        name: "m_project",
        components: {
            Group,
            Cell,
            XButton,
            Swiper,
            SwiperItem,
            Scroller,
            LoadMore,
        },
        data(){
            return{
                wrapperHeight:0,
                id:this.$route.params.id,
                pageNum:1,
                pageCount:10,
                pageTotal:0,
                total:0,
                list:[],
                moreData:true,
                loading: false,
            }
        },
         mounted(){
             document.title = '最新动态'
            this.wrapperHeight = document.documentElement.clientHeight;
             this.moreData = true;
             this.rqProjectDynamic();
         },
        methods:{
            onScrollBottom() {
                if(this.loading){
                    this.moreData = true;
                    this.loading = false;
                    console.log("loading more")
                    this.rqProjectDynamic();
                }
            },
            async rqProjectDynamic(){
//                let res = await postProjectDynamic(this.id,this.pageNum,this.pageCount);


                let queryData = {
                    projectId:this.id,
                    pageNum:this.pageNum,
                    pageCount:this.pageCount,
                };
                let res = await JZY.xhr.post(
                    '/oa/project/projectTrends/page'
                    ,queryData
                    ,{alertError:true,alertSuccess:false})
                    .then(async (resultData)=>{
                        return resultData
                    }).catch((e)=>{
                    this.loading = true;

                    //接口失败
                    console.log("接口失败",e);
                })



//                console.log(res[0])
                let len = res[0].list.length;
                if(len){
                    if(this.pageNum == 1){
                        this.list =[...res[0].list];
                    }else{
                        console.log(res[0].list,"push")
                        this.list.push.apply( this.list, res[0].list );
                    }
                    if(this.list.length<=10){
                        this.moreData = false;
                        this.loading = false;
                    }
                    this.pageNum++;
                    this.pageTotal = res[0].pageTotal;
                    this.total = res[0].total;
                    this.loading = true;
                }else{
                    this.loading = false;
                    this.moreData = false;
                }


            },
        }
    }
</script>

<style lang="scss" scoped="scoped">
.m_project_dynamic{
    .dynamic_cell{
        background-color: #ffffff;
        margin-top: 10px;
        .vux-label{
            font-size: 15px;
            color: #191919;
        }

    }
    .dynamic_cell.weui-cell:before{
        border-top: 0px none;
    }

    .list_desc{
        line-height:18px;
        color:#999;
        font-size: 12px;
        p{
            width:100%;
            font-size: 12px;
            color: #999999;
            line-height: 19px;
            display:block;
        }
    }
    .list_icon{
        width:30px;
        height:30px;
        line-height:30px;
        text-align:center;
        background-color:#0ABF86;
        color:#fff;
        border-radius:50%;
        margin-right:20px;
        position: relative;
        svg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>

<style lang="scss">
    body{
        overflow: auto!important;
    }
</style>