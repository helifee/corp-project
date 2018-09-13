<template>
    <div class="m_list_view_project" >
        <scroller lock-x  :height="scrollerHeight+'px'" @on-pulldown-loading="onPulldownLoading"
                  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100">
            <group title="" >
                <cell v-for="(item,index) in dataList" :key="index" :title="item.projectName" @click.native="handleViewDetail(index, item)">
                    <div class="list_icon" slot="icon" >
                        <icon  name="m_project_list_1" scale="3"></icon>
                    </div>
                    <div class="list_desc" slot="inline-desc">
                        <p>负责人：{{item.projectResponsiblePersonName}}</p>
                        <p>项目进度：{{item.projectProgressBar}}%</p>
                        <!--<p>到期日：{{ item.endDate | formatEendDateByMoment }}</p>-->
                    </div>
                    <div class="list_right" solt="value">
                        <span class="state">
                            {{item.projectStatus | state}}
                        </span>
                        <span v-if="moduleName!='set'" class="concerned" @click.stop="setTaskFollow(index, item)">
                            <x-icon class="orange" type="ios-star" size="22" v-if="item.concern=='1'"></x-icon>
                            <x-icon class="orange" type="ios-star-outline" size="22" v-else></x-icon>
                        </span>
                    </div>
                </cell>
                <!--<load-more tip="loading" ></load-more>-->
                <div>
                    <load-more tip="loading" v-if="loading &&　!noMore"></load-more>
                    <div class="look-all noMore" v-if="noMore">
                        <a class="" style="cursor: pointer">没有更多了</a>
                    </div>

                </div>
            </group>
        </scroller>
    </div>
</template>

<script>
    import moment from 'moment'
    import { Group, Cell, XButton ,Scroller,LoadMore  } from 'vux'
    export default {
        name:"m-project-listView",
        components: {
            Group,
            Cell,
            XButton,
            Scroller,
            LoadMore
        },
        props: {
            //来自于哪个栏目
            moduleName: {
                type: String,
                default:'myCreate'
            },
            scrollerHeight:{
              type:Number,
            },
            noMore:{
                type:Boolean,
                default:false
            },
            loading:{
                type:Boolean,
                default:true
            },
            dataList:{
                type:Array,
                default:function(){
                    return []
                }
            },
            orgType:{//1为正常企业 2为合作企业；
                type: String,
                default:'1'
            }
        },
        data () {
            return {
                // color:'#0ABF86'
                // loadingStatus:true,
                // noMore:false,
            }
        },
        // watch:{
        //     dataList: function (val, oldVal) {
        //         console.log('loadingOver')
        //         this.loadingStatus=false;
        //     },
        // },
        filters:{
            state (value){
                //'项目状态 ：0进行中、1已延期、2未启动、3已完成、4已撤销。',
                switch (value) {
                    case '0':
                        return '进行中';
                    case '1':
                        return '已延期';
                    case '2':
                        return '未启动';
                    case '3':
                        return '已完成';
                    case '4':
                        return '已撤销';
                    default:
                        return '--';
                }
            },
            formatEendDateByMoment (value){
                return moment(value).format("YYYY-MM-DD")
            },
        },
        methods: {
            //关注任务
            async setTaskFollow(index,row){
                // console.log("kdkkd")
                this.$emit('setTaskFollow',row)
            },
            onPulldownLoading(){
                // console.log("loading onPulldownLoading")
            },
            handleViewDetail(index, item){
                console.log("handleViewDetail",item.sid)
                this.$router.push("../m_project_detail?projectId="+item.sid+"&fromPage="+this.moduleName+"&orgType="+this.orgType)
            },
            scrollerReset(){
                this.$refs.scrollerBottom.reset({top:0})
            },
            onScrollBottom() {
                if(!this.noMore){
                    // this.loadingStatus = true;
                    // console.log("loading more")
                    this.$emit('loadingMoreDatas')
                }

                // setTimeout(() => {
                //     // let last = this.list[this.list.length - 1];
                //     // for (let i = 1; i <= 10; i++) {
                //     //     this.list.push(last + i);
                //     // }
                //     // this.loading = false;
                // }, 2500);
            }
        },
        mounted(){
        },
    }
</script>

<style lang="scss">
    .m_list_view_project{
        .weui-cells{
         margin-top: 0px;
        }
        .list_desc{
            line-height:18px;
            color:#999;
            font-size: 12px;
            p{
                width:100%;
                height:18px;
                display:block;
                overflow:hidden;
                white-space:nowrap;
                text-overflow: ellipsis;
            }
        }
        .list_icon{
            width:30px;
            height:30px;
            line-height:30px;
            text-align:center;
            /*background-color:#0ABF86;*/
            /*color:#fff;*/
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
        .list_right{
            width:70px;
            height:22px;
            line-height:22px;
            text-align:left;
            position: relative;
            .state{
                font-size:12px;
                position: absolute;
                top: 50%;
                left: 0px;
                transform: translateY(-50%);
            }
            .concerned{
                width:22px;
                height: 22px;
                position: absolute;
                top: 50%;
                right: 0px;
                transform: translateY(-50%);
                svg{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .orange{
                    fill: #F9A82E;
                }
            }
        }
        .noMore{
            text-align:center;
            padding:20px;
            font-size: 12px;
        }

        .weui-cells{
            margin-top:0px;
            .weui-cell{
                padding: 12px 15px 18px 15px;
                .vux-cell-bd.vux-cell-primary{
                    width:calc(100% - 50px - 70px)
                }
                .vux-label{
                    width:auto;
                    height:30px;
                    line-height:30px;
                    color:#191919;
                    font-size:15px;
                    display:block;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow: ellipsis;
                }
                /*//有链接的情况下，去掉箭头*/
                /*&.weui-cell_access .weui-cell__ft{*/
                    /*padding-right:0px;*/
                    /*&:after{*/
                        /*border: none;*/
                        /*width: 0px;*/
                        /*height: 0;*/
                    /*}*/
                /*}*/
            }
        }
    }
</style>