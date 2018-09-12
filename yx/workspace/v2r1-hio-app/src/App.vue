<template>
  <div style="height:100%;background-color:#fff">
    <!--<header-index></header-index>-->
    <!--<router-view></router-view>-->
    <!--<footer-index></footer-index>-->
    <systemApp v-if="JZY.s.getPathName().startsWith('/system')"></systemApp>

    <userApp v-else></userApp>
  </div>
</template>

<script>

// import headerIndex from './components/header'
// import footerIndex from './components/footer'
import userApp from '@/containers/AppContainer.vue'
import systemApp from '@setContainers/MainContainer.vue'
export default {
    created(){
        document.body.classList.add('pc-body')
        // window.$=jQuery;
        // let memeryAuthorization=JZY.c.AUTO_LOGIN.headers.authorization
        // let authorization=localStorage.getItem('authorization')
        //
        // if(authorization && (!memeryAuthorization)){
        //     // if(authorization && (!memeryAuthorization)){
        //     // JZY.s.clog("JZY.c.AUTO_LOGIN--:",JSON.stringify(JZY.c.AUTO_LOGIN))
        //     JZY.c.AUTO_LOGIN.headers.authorization=authorization
        // }
    },
  components: {
    // headerIndex:headerIndex,
    // footerIndex:footerIndex
      userApp,
      systemApp
  }
}
// new Promise((resolve)=>{
//   resolve()
// }).then(()=>{
//   alert('then')
// })
</script>

<style>
  /**{box-sizing:border-box;font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}*/
  /*body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button {margin:0;padding:0}*/
  /*fieldset,img {border:0 none}*/
  /*dl,ul,ol,menu,li {list-style:none;}*/
  /*blockquote, q {quotes: none}*/
  /*blockquote:before, blockquote:after,q:before, q:after {content:'';content:none}*/
  /*input,select,textarea,button {vertical-align:middle}  !* 重置表单控件垂直居中*!*/
  /*button {border:0 none;background-color:transparent;cursor:pointer}  !* 重置表单button按钮效果 *!*/
  /*body,th,td,input,select,textarea,button {font-size:12px;line-height:1 ;font-family:"微软雅黑", "黑体","宋体";color:#666} !* 重置页面文字属性 *!*/
  /*a {color:#666;text-decoration:none}  !* 重置链接a标签 *!*/
  /*a:active, a:hover {text-decoration:none}   !* 重置链接a标签的鼠标滑动效果 *!*/
  /*address,caption,cite,code,dfn,em,var {font-style:normal;font-weight:normal}  !* 重置样式标签的样式 *!*/
  /*img{vertical-align:top}  !* 图片在当前行内的垂直位置 *!*/
</style>
