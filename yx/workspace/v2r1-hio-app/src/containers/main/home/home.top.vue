<template>
    <div class="top home_warp">
        <div class="top_nav">
            <div class="content-tabs">
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <ul class="nav">
                            <li v-for="(item,index) in quickEntryData" :key="index">
                                <h3 class="J_menuTab" @click="goto(item.url)" :class="{active:(index === 0)}">
                                  <div class="icon_logo" :class=" 'bgColor_' + index ">
                                      <i class="icon iconfont icon-jishuwendang1"></i>
                                  </div>
                                  <div class="icon_name">{{item.moudelName}}</div>
                                </h3>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="J_tab_button">
            <div  class="roll-nav roll-left J_tabLeft"><i class="icon iconfont icon-jiantou"></i></div>
            <div class="roll-nav roll-right J_tabRight"><i class="icon iconfont icon-right"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
  import '@Main/task/fonts/iconfont.css'
  import config from '@/config/index.js'
  import '@Main/home/topNav.js'
  import mockData from '@MockData'

  export default {
    data() {
      return {
        
      };
    },
    props: ['quickEntryData'],
    components:{
        // itemList,
    },
    methods: {
        goto: function (url) {//
            this.$message("您点击的外链url为：" + url)
        },
    },
    mounted (){
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
          TabMenu.setTabColor();//初始化左右按钮颜色
          $("ul.nav li").hover(function(){
            $(this).addClass("on");
            $(this).parent("ul").siblings("h3").addClass("choice");
          },function(){
            $(this).removeClass("on");
            $(this).parent("ul").siblings("h3").removeClass("choice");
          });

          // $("ul.nav li").parent("ul").siblings("h3").append('<span class="sub"><i class="icon iconfont icon-right"></i></span>');

        }); //这里相当于$(document).ready(function(){});
      })(jQuery); //jQuery作为匿名函数的参数
    }
  }
</script>

<style scoped lang="scss">
.top.home_warp{
    .top_nav {
        width: 100%;
        height: 100px;
        float: left;
        position: relative;
        overflow: hidden;
        .content-tabs {
            width: 87.5%;
            float: left;
            .page-tabs {
                width: 100000px;
                height: 100px;
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
                    ul.nav li{
                        width: 120px;
                        float: left;
                        position: relative;
                        z-index: 101;
                        text-align:center;
                        list-style: none;
                        h3{
                            height: 100px;
                            margin: 0;
                            font-size:14px;
                            &:hover,.choice{
                                // background: #1397ec;
                                cursor: pointer;
                            }
                            &.J_menuTab{
                                &.active{
                                    color: red;
                                    &:hover{
                                        // background-color: #333;
                                        cursor:pointer;
                                    }
                                }
                                &:hover{
                                    color: red;
                                    cursor: pointer;
                                }
                            }

                            .icon_logo{
                                width: 44px;
                                height: 44px;
                                line-height:100%;
                                border-radius:0px 10px 10px 10px;
                                margin:4px auto;
                                position:relative;
                                &.bgColor_0{
                                    background-color: #16c998;
                                }
                                &.bgColor_1{
                                    background-color: #f49c42;
                                }
                                &.bgColor_2{
                                    background-color: #1ba7ff;
                                }
                                &.bgColor_3{
                                    background-color: #c185ef;
                                }
                                &.bgColor_4{
                                    background-color: #42c34b;
                                }
                                &.bgColor_5{
                                    background-color: #1ba7ff;
                                }
                                &.bgColor_6{
                                    background-color: #ff4d4c;
                                }
                                &.bgColor_7{
                                    background-color: #16c998;
                                }
                                &.bgColor_8{
                                    background-color: #c6fbff;
                                }
                                &.bgColor_9{
                                    background-color: #ffff00;
                                }
                                &.bgColor_10{
                                    background-color: #16c998;
                                }
                                &.bgColor_11{
                                    background-color: #f49c42;
                                }
                                .icon{
                                    width: 20px;
                                    height: 20px;
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    margin-top: -10px;
                                    margin-left: -10px;
                                    &:before{
                                        color:#fff;
                                        font-size:20px;
                                    }
                                }
                            }
                            .icon_name{
                                width: 100%;
                                height: 30px;
                                line-height:30px;
                                text-align:center;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }
        .J_tab_button{
            width: 12.5%;
            min-width:100px;
            // float: right;
            background-color:#fff;
            text-align: left;
            color: #999;
            position: absolute;
            right: 0;
            top:0;
            z-index: 102;
            .roll-nav{
                border: 0;
                height: 100px;
                width:30px;
                line-height: 70px;
                float: left;
                outline: 0;
                cursor: pointer;
                color: #fff;
                &:hover{
                    color: #0c0;
                }
                .iconfont{
                    font-size:40px;
                }
            }
        }
        .roll-left {
            /*left: 0;*/
            margin-left: 20px;
            border-right: solid 1px #eee
        }
        .roll-right {
            /*right: 0;*/
            border-left: solid 1px #eee
        }
    }
}
</style>