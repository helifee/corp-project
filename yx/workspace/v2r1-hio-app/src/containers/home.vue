<template>
    <div class="home" id="home">
        <div class="main_content" :style="{height: myHeight+'px'}">
            <div class="left" id="homeLeft">
                <div id="left_warp">
                    <!--快速入口导航-->
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        {{l('{homeLocale.middleTop.quickEntry} ')}}
                        <!-- <span v-if="approveManagePremission" class="more" title="点击进入流程模板配置页面" @click="$router.push('/approve/set/flowDesign')">编辑</span> -->
                      </div>
                      <quick-entry :quickEntryData ="quickEntryData"></quick-entry>
                    </el-card>
                    <!--工作信息-->
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        {{l('{homeLocale.middleTop.workInfo} ')}}
                        <span class="more" title="点击进入我发起的流程" @click="$router.push('/approve')">全部</span>
                      </div>
                      <work-info></work-info>
                    </el-card>
                    <!--新闻公告-->
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        {{l('{homeLocale.middleTop.newsNotice} ')}}
                        <span class="more" title="点击进入更多" @click="$router.push('/news')" v-if="newsRole">全部</span>
                      </div>
                      <news-notice @getLeftHeight="getLeftHeight" @changeNewsRole="changeNewsRole"></news-notice>
                    </el-card>
                </div>
            </div>
            <div class="right" id="homeRight">
                <div id="right_warp" style="float:right">
                    <home-right @getRightHeight="getRightHeight"></home-right>
                </div>
            </div>
            
        </div>
<!--         <div class="aside-right-wrapper">
            <home-right></home-right>
        </div> -->
    </div>
</template>

<script>
    JZY.locale.add("homeLocale", require("./main/home/home.locale"));
    import config from '@/config/index.js'
    import homeRight from '@Main/home/home.right.vue'
    import quickEntry from '@Main/home/home.quickEntry.vue'
    import workInfo from '@Main/home/home.workInfo.vue'
    import newsNotice from '@Main/home/home.newsNotice.vue'


    //获取发起审批的快速入口
    import { getUserCategory, } from '@Main/approve/getData'

    export default{
        components:{
            homeRight,
            quickEntry,
            workInfo,
            newsNotice
        },
        data(){
            return {
                quickEntryData:[],//发起审批的快速入口data
                // flowData:[],//流程审批信息
                approveManagePremission:false,//审批模板的编辑权限
                myHeight: '',//最大高度
                leftWarpHeight:'',//左侧高度
                rightWarpHeight:'',//右侧高度
                newsRole:true,//是否有新闻的查看权限
            }
        },
        methods:{
            //获取发起审批的快速入口
            async getUserCategory(){
                //审批大权限的判断
                let approvePremission = false
                if(this.$store.state.session.tenantInfo.roleMenus.length > 0 ){//非管理员
                    approvePremission = this.$store.state.session.tenantInfo.roleMenus.some((item)=>{
                        return item.url.indexOf('/flow') != -1
                    })

                    this.approveManagePremission = this.$store.state.session.tenantInfo.roleMenus.some((item)=>{
                        return item.code === 'flow_manage'
                    })
                }else{
                    approvePremission = true
                    this.approveManagePremission  = true
                }
                
                if(approvePremission){//没有审批大权限，不发请求
                    let res = await getUserCategory()
                    if( res[0] && res[0].length > 0 ){
                        res[0].forEach((item)=>{
                            this.quickEntryData = [...this.quickEntryData, ...item.childList]
                        })

                        this.getLeftHeight()
                    }
                }
            },
            //设置内容区域的高度
            setAllHeight:function(){
                let that = this

                jQuery.noConflict(); 
                (function($){
                    //在匿名函数里使用$作为jQuery别名,不影响全局
                    $(function(){
                        let myHomeHeight = $("#home").height()
                        let myLeftHeight = $("#left_warp").height()
                        let myRightHeight = $("#right_warp").height()
                        
                            // console.info("myHomeHeight",myHomeHeight)
                            // console.info("myLeftHeight",myLeftHeight)
                            // console.info("myRightHeight",myRightHeight)
                            if (myHomeHeight > myLeftHeight && myHomeHeight > myRightHeight ) {
                                that.myHeight = myHomeHeight
                            }else{
                                that.myHeight = myLeftHeight > myRightHeight ? myLeftHeight : myRightHeight
                            }
                            $("#homeLeft").height( that.myHeight )
                            $("#homeRight").height( that.myHeight )

                            // console.info(that.myHeight)
                        

                    }); //这里相当于$(document).ready(function(){});
                })(jQuery); //jQuery作为匿名函数的参数
            },
            //获取内容区域左侧的高度
            getLeftHeight:function(){
                this.$nextTick(function(){
                    this.leftWarpHeight = document.getElementById('left_warp').offsetHeight
                    // alert("this.leftWarpHeight"+this.leftWarpHeight)
                })
            },
            //获取内容区域右侧的高度
            getRightHeight:function(){
                this.$nextTick(function(){
                    this.rightWarpHeight = document.getElementById('right_warp').offsetHeight

                    // alert("this.rightWarpHeight"+this.rightWarpHeight)
                })
            },
            //获取新闻模块的权限
            changeNewsRole( state = true){
                this.newsRole = state
            },

        },
        mounted(){
            this.getUserCategory() //获取发起审批的快速入口

            let that = this
            this.$nextTick(function(){
                setTimeout(function(){
                    that.setAllHeight();
                },300)
            });
            // 注：window.onresize只能在项目内触发1次
            window.onresize = function windowResize (){
                that.setAllHeight();
            }
        },
        watch:{
            leftWarpHeight(newVal,oldVal){
                this.setAllHeight();
            },
            rightWarpHeight(newVal,oldVal){
                // alert("newVal"+newVal)
                this.setAllHeight();
            },

        },
    }
</script>
<style lang="scss">
.home{
    .main_content{
        .el-card{
            .el-card__header{
                padding:20px 24px;
                border-bottom:none;
            }
            .el-card__body{
                padding:0 24px 0;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.home{
    background: $theme-grey-body-background;
    .main_content{
        width: 100%;
        float: left;
        background-color:#fff;
        background-image:url('/static/images/home_right_background.png');
        background-position:right;
        background-repeat-y: repeat;
        background-repeat-x: no-repeat;
        .left{
            width: calc(100% - 320px - 16px);
            float: left;
            background-color:#fff;
            padding-bottom:0px;
            .el-card{
                background-color:#fff;
                box-shadow:none;
                position:relative;
                border:none;
                & + .el-card{
                    border-top:16px solid $theme-grey-body-background;

                }
                .iconfont{
                    color:#1ba7ff;
                    font-size:22px;
                    margin-right:8px;
                }
                .more{
                    position:absolute;
                    right:24px;
                    top:22px;
                    font-size:12px;
                    color: $theme-black-other;
                    &:hover{
                        color:$theme-blue-active;
                        cursor:pointer;
                    }
                }
            }
        }
        .right{
            float: right;
            width: 320px;
            background-color:#fff;
            padding-bottom:0px;
        }
        
    }
    .aside-right-wrapper{
        width:320px;
        height:calc(100% - 50px - 16px);
        background:#fff;
        // box-shadow:-3px 0px 5px rgba(153, 153, 153, 0.349019607843137);
        position:fixed;
        right:0;
        bottom: 0;
        top:0px;
        margin-top: 50px;
        overflow-y: auto;
        border-top:16px solid $theme-grey-body-background;
    }
}
</style>