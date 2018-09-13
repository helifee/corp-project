<template>
    <div>
          <div>
            <scrollerPage :page="scrollPage" :decision="decision" :list="list" v-on:gotoDetail="gotoScrollDetail"></scrollerPage>
              <load-more tip="loading" v-show="isShow && isJixu"></load-more>
              <div class="look-all continue" v-show="isJixu">
                  <span class="loadNextPage" style="cursor: pointer" @click="loadMore">展开更多</span>
              </div>
              <div class="look-all noMore" v-show="!isJixu && !nopage">
                  <a class="" style="cursor: pointer">没有更多了</a>
              </div>
          </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import scrollerPage from './m_crm_scrollPage.vue'
    import { LoadMore } from 'vux'
    export default {
        name:"my_scroller",
        components: {
            LoadMore,
            scrollerPage
        },
        props:["list","decision","scrollPage","isContinue","pageNum","nopage","pageTotal"],
        data () {
            return {
                isShow:false,
                isJixu:this.isContinue,
            }
        },
        mounted(){
            if(this.pageTotal){
                if(this.pageNum<this.pageTotal){
                    this.isJixu = true;
                }
            }
        },
        methods: {
            isJixuFn(flag){
                this.isJixu = flag;
            },
            gotoScrollDetail(sid){
                this.$emit("gotoDetail",sid);
            },
            loadMore(){
                this.isShow = true;
                this.$emit("getList",(this.pageNum+1));
            }
        },
        watch:{
            list:function(){
                this.isShow = false;
            }

        }
    }
</script>
<style lang="scss">
    .look-all{
        height: 40px;
        line-height: 40px;
        background: #fff;
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

    .look-all.noMore a{
        font-size: 12px;
        color: #999;
    }
</style>