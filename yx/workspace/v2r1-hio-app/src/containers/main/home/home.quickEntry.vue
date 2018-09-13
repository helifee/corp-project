<template>
    <div class="quick_entry home_warp">
        <!--menu start -->
        <div class="top_nav">
            <div class="content-tabs">
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <ul class="nav">
                            <li v-for="(item,index) in quickEntryData" :key="index">
                                <h3 class="J_menuTab" @click="goto(item.code)" :class="{active:(index === 0)}">
                                  
                                  <div class="icon_logo_warp">
                                      <!-- <div class="icon_logo" :style="{'background-color':bgColor[index%11]}" >
                                          <i class="icon">{{item.name.slice(0,1)}}</i>
                                      </div> -->
                                      <div class="icon_logo" :style="{'background-image':'url('+JZY.c.imgPath+'/home/'+bgImg[index%6]+'.png)' }" >
                                          <i class="icon">{{item.name.slice(0,1)}}</i>
                                      </div>
                                   </div>
                                  <el-tooltip class="myTipsList" :disabled="myTipsListState[index]" effect="dark" :content="item.name" placement="bottom-start">
                                      <div class="icon_name">
                                        <em>{{item.name}}</em>
                                      </div>
                                   </el-tooltip>
                                </h3>
                                <!-- <item-list :itemObject = "item"></item-list> -->
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="J_tab_button" v-if=" quickEntryData.length > 0 ">
                <div  class="roll-nav roll-left J_tabLeft"><i class="icon iconfont icon-jiantou"></i></div>
                <div class="roll-nav roll-right J_tabRight"><i class="icon iconfont icon-right"></i></div>
            </div>
        </div>
        <!--menu end -->
    </div>
</template>
<script>

  import '@Main/task/fonts/iconfont.css'
  import config from '@/config/index.js'
  import '@Main/home/topNav.js'
  // import mockData from '@MockData'

  export default {
    data() {
      return {
        bgColor:['#FFECEC','#f49c42','#1ba7ff','#BE96F9','#46A7FF','#F35959','#FFCC22','#c6fbff','#ffff00','#16c998','#BE96F9'],//图标的背景颜色
        bgImg:['business','charge','contract','finance','hr','office'],//图标的背景图片
        myTipsListState:[],//维护快速入口中tips是否生效
        myTipsListState:[],//维护快速入口中tips是否生效
      };
    },
    props: ['quickEntryData'],
    components:{
        // itemList,
    },
    methods: {
        goto: function (code = '') {//跳转到审批模块
            this.$router.push({
                path: '/approve',
                query:{code: code}
            });
            // this.$message("您点击的外链code为：" + code)
        }
    },
    updated (){
        // console.log('this.quickEntryData---:',JSON.stringify(this.quickEntryData))
        this.$nextTick(function () {

          jQuery.noConflict(); //jQuery让出"$",也就是jQuery不在全局占用$这个符号,避免命名冲突
          (function($){
            //在匿名函数里使用$作为jQuery别名,不影响全局
            $(function(){ 

              //菜单导航栏切换
              var TabMenu = $('.content-tabs').menuTab({
                                'content_tab':'.content-tabs',
                                'nav_tab':'.page-tabs',
                                'tab_list':'.page-tabs-content ul.nav'
                            });
              $('.J_tabRight').on('click',function(){
                  TabMenu.nextTab();
                  TabMenu.setTabColor();//改变左右按钮颜色
              })
              $('.J_tabLeft').on('click',function(){
                  TabMenu.prevTab();
                  TabMenu.setTabColor();//改变左右按钮颜色
              })
              $('.J_menuTab').on('click',function(){
                  $('.J_menuTab.active').removeClass('active');
                  $(this).addClass('active');
                  TabMenu.goTab($(this).parent('li'));
                  TabMenu.setTabColor();//改变左右按钮颜色
              })

              $("ul.nav li").hover(function(){
                $(this).addClass("on");
                $(this).parent("ul").siblings("h3").addClass("choice");
              },function(){
                $(this).removeClass("on");
                $(this).parent("ul").siblings("h3").removeClass("choice");
              });
              //设置元素的宽度
              $(".page-tabs-content ul.nav li").width( ($(".content-tabs").width() / 8) )
              
              TabMenu.setTabColor();//初始化左右按钮颜色
              // $("ul.nav li").parent("ul").siblings("h3").append('<span class="sub"><i class="icon iconfont icon-right"></i></span>');


            }); //这里相当于$(document).ready(function(){});
          })(jQuery); //jQuery作为匿名函数的参数


        });
    },
    mounted(){

        //tips 是否显示
        function isEllipsis(dom) {
            var checkDom = dom.cloneNode(), parent, flag;
            checkDom.style.width = dom.offsetWidth + 'px';
            checkDom.style.height = dom.offsetHeight + 'px';
            checkDom.style.overflow = 'auto';
            checkDom.style.position = 'absolute';
            checkDom.style.zIndex = -1;
            checkDom.style.opacity = 0;
            checkDom.style.whiteSpace = "nowrap";
            checkDom.innerHTML = dom.innerHTML;

            parent = dom.parentNode;
            parent.appendChild(checkDom);
            flag = checkDom.scrollWidth > checkDom.offsetWidth;
            parent.removeChild(checkDom);
            return flag;
        };
        //设置快速入口的 tips 是否显示
        //此方法为临时使用，待抽空封装为全局的指令，再应用于其他模块
        this.$nextTick(function () {
            let that = this

            setTimeout (function(){
                var all = document.getElementsByClassName("myTipsList")
                for(var i=0;i<all.length;i++) {
                    // console.info("isEllipsis", isEllipsis( all[i] ) )
                    that.$set(that.myTipsListState,i, !isEllipsis( all[i] ) )
                }
            },500)
        });
        console.info("myTipsListState", this.myTipsListState)
    },
  }
</script>

<style scoped lang="scss">
$tab_height:90px;

.quick_entry.home_warp{
    .top_nav {
        width: 100%;
        position: relative;
        overflow: hidden;
        margin-bottom:10px;
        .content-tabs {
            width: 90%;
            position:absolute;
            left:5%;
            right:5%;
            z-index:101;
            overflow:hidden;
            .page-tabs {
                width: 100000px;
                height: $tab_height;
                a {
                    width: auto;
                    float: left;
                    display: inline;
                    margin: 0 20px;
                    color: #fff;
                    text-decoration: none;
                    &.active {
                        background: #2f4050;
                        color: #a7b1c2
                    }
                }
                .page-tabs-content{
                    float: left;
                    ul.nav{
                        padding: 0;
                        margin:0;
                        li{
                            width: 12.5%;
                            min-width:70px;
                            max-width:166px;
                            float: left;
                            position: relative;
                            z-index: 101;
                            text-align:center;
                            list-style: none;
                            h3{
                                height: $tab_height;
                                margin: 0;
                                @include font(12px,14px);
                                color:$theme-black;
                                &:hover,.choice{
                                    // background: #1397ec;
                                    cursor: pointer;
                                    .icon_logo_warp .icon_logo{
                                        @include wh(50px,50px)
                                    }
                                }
                                &.J_menuTab{
                                    &.active{
                                        color: $theme-black-title;
                                        &:hover{
                                            // background-color: #333;
                                            cursor:pointer;
                                        }
                                    }
                                    &:hover{
                                        color: $theme-black-title;
                                        cursor: pointer;
                                    }
                                }
                                .icon_logo_warp{
                                    @include wh(50px,50px);
                                    margin:0px auto;
                                    line-height:100%;
                                    text-align:center;
                                    .icon_logo{
                                        width: 44px;
                                        height: 44px;
                                        @include ct;
                                        line-height:100%;
                                        border-radius:50%;
                                        margin:0px auto;
                                        position:relative;
                                        background-repeat:no-repeat;
                                        background-size: 100%;
                                        background-position: center;
                                        .icon{
                                            width: 14px;
                                            height: 14px;
                                            @include center(14px,14px);
                                            @include font(14px,14px);
                                            color:#fff;
                                            &:before{
                                                color:#fff;
                                                font-size:14px;
                                            }
                                        }
                                    }
                                    
                                }
                                .icon_name{
                                    width: 100%;
                                    height: 26px;
                                    line-height:26px;
                                    text-align:center;
                                    overflow: hidden;
                                    white-space:nowrap;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                    }
                }
            }
        }
        .J_tab_button{
            width: 100%;
            height: $tab_height;
            // width: 12.5%;
            // min-width:120px;
            // float: right;
            background-color:#fff;
            text-align: left;
            color: $theme-black;
            // position: absolute;
            // right: 0;
            // top:50%;
            // transform: translateY(-50%);
            // z-index: 102;
            .roll-nav{
                border: 0;
                width:18px;
                line-height:$tab_height;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                // line-height: 70px;

                // float: left;
                outline: 0;
                cursor: pointer;
                color: #fff;
                &:hover{
                    color: #0c0;
                }
                .iconfont{
                    font-size:18px;
                }
            }
        }
        .roll-left {
            left: 0;
            // margin-left: 20px;
            border-right: solid 1px #eee
        }
        .roll-right {
            right: 0;
            border-left: solid 1px #eee
        }
    }
}
</style>