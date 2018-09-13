<template>
    <div>
      <h3 class="J_menuTab" @click="goto(itemObject.url)">
      <div class="icon_logo">
          <i class="icon iconfont icon-jishuwendang1"></i>
      </div>
      <div class="icon_name">{{itemObject.moudelName}}</div>
      </h3>
    </div>
</template>
<script>

  import '@Main/task/fonts/iconfont.css'
  import config from '@/config/index.js'
  import mockData from '@MockData'

  export default {
    data() {
      return {
        
      };
    },
    props: ['itemObject'],
    methods: {
        goto: function (url) {//
            console.info(url)
        },
    }
  }
</script>

<style scoped lang="scss">

.topNav {
    width: 100%;
    height: 100px;
    float: left;
    position: relative;
    overflow: hidden;
}
.topNav .content-tabs {
    width: 87.5%;
    float: left;
}
.topNav .content-tabs .page-tabs a {
    width: auto;
    float: left;
    display: inline;
    margin: 0 20px;
    color: #fff;
    text-decoration: none;
}
.topNav .content-tabs nav.page-tabs {
    width: 100000px;
    height: 100px;
}
.topNav .content-tabs nav.page-tabs .page-tabs-content {
    float: left
}
.topNav .J_tab_button{
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
}
.topNav .J_tab_button .roll-nav{
    border: 0;
    height: 100px;
    width:30px;
    line-height: 42px;
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

.topNav .roll-left {
    /*left: 0;*/
    margin-left: 20px;
    border-right: solid 1px #eee
}
.topNav .roll-right {
    /*right: 0;*/
    border-left: solid 1px #eee
}
.content-tabs .page-tabs a.active {
    background: #2f4050;
    color: #a7b1c2
}
.content-tabs .page-tabs-content ul.nav li{ width: 200px;position: relative;z-index: 101; text-align:center; list-style: none;}
.content-tabs .page-tabs-content ul.nav > li{ float: left;}


.content-tabs .page-tabs-content ul.nav li h3{
    height: 100px;
    margin: 0;
    font-size:14px;
    &.J_menuTab{
        &.active{
            color: red;
            &:hover{
                // background-color: #333;
                cursor:pointer;
            }
        }
        &:hover{
            color: #ccc;
            cursor: pointer;
        }
    }

    .icon_logo{
        width: 44px;
        height: 44px;
        line-height:100%;
        background-color:#16c998;
        border-radius:0px 10px 10px 10px;
        margin:4px auto;
        position:relative;
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




.content-tabs .page-tabs-content ul.nav > li > h3{ }
.content-tabs .page-tabs-content ul.nav > li > ul > li h3{ text-align: left; text-indent: 20px; background: #fff;color: #333;font-size:16px;}
.content-tabs .page-tabs-content ul.nav > li h3:hover,.choice{ background: #1397ec; cursor: pointer;}
.content-tabs .page-tabs-content ul > li > ul{ display: none;}
.content-tabs .page-tabs-content ul > li.on > ul{ display: block;padding:0;}
.content-tabs .page-tabs-content ul.nav>li{ width: 120px;}
.content-tabs .page-tabs-content ul.nav > li > ul > li ul{ position:  absolute; top: 0; right: -200px;}
.content-tabs .page-tabs-content ul.nav span.sub{ position: absolute; display: block; right:60px; top: 0; width: 10px; height: 100px; }
.content-tabs .page-tabs-content ul.nav >li >h3>span.sub{display: none;}

</style>