<template>
  <div >
    <emailList :emaillist="datalist"></emailList>
    <div class="contentContain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import emailList from './email.list.vue'
  JZY.locale.add('emailLocale',require('./email.locale'));

  const datalist=[{
    id:"1111",
    sender:"YF杨帆",
    title:"致中国内地iCloud用户的重要通知致中的重要",
    date:"2018-01-31",
    noRead:true
  },
    {
      id:"222",
      sender:"YF杨帆",
      title:"感谢您使用 iCloud。我们在此与您分享有关中国内地 iCloud 服务的重要信息",
      date:"2018-01-31"
    },
    {
      id:"333",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"444",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"555",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"666",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"777",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"888",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"999",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"000",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"111",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    },
    {
      id:"1212",
      sender:"YF杨帆",
      title:"致中国内地iCloud用户的重要通知致中的重要",
      date:"2018-01-31",
      noRead:true
    }]

    export default {
        name: "email",
      components:{
        emailList
      },
      data(){
          return{
            datalist
          }
      },
      updated(){
          // console.log("email updated")
      },
      mounted(){
        // console.log("email mounted")
      }
    }
</script>

<style scoped lang="scss">
  .contentContain{
    background: #fff;
    width: calc(100% - 448px);
    left: 448px;
    position: absolute;
    height: 100%;
    overflow: auto;
  }
/*.emaillist{*/
  /*width:448px;*/
  /*background: #fff;*/
/*}*/
</style>
