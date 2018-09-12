<template>
  <div class="emaillist">
     <div class="ehead">
        <div v-if="JZY.s.getPathName().startsWith('/email/inbox')">
            <span>{{l('{emailLocale.menu.inbox}')}} </span><span>({{emailTotal}})</span>
            <span>{{noReadNum}}{{l('{emailLocale.list.piece}')}}</span><span>{{l('{emailLocale.list.noRead}')}}</span>
        </div>
        <div v-if="JZY.s.getPathName().startsWith('/email/outbox')">
          <span>{{l('{emailLocale.menu.outbox}')}} </span><span>({{emailTotal}})</span>
        </div>
       <div v-if="JZY.s.getPathName().startsWith('/email/stars')">
         <span>{{l('{emailLocale.menu.starsBox}')}} </span><span>({{emailTotal}})</span>
       </div>
       <div v-if="JZY.s.getPathName().startsWith('/email/drafts')">
         <span>{{l('{emailLocale.menu.drafts}')}}  </span><span>({{emailTotal}})</span>
       </div>
       <div v-if="JZY.s.getPathName().startsWith('/email/deleted')">
         <span>{{l('{emailLocale.menu.deletedBox}')}}  </span>
       </div>
       <div v-if="JZY.s.getPathName().startsWith('/email/junk')">
         <span>{{l('{emailLocale.menu.junk}')}}  </span>
       </div>
    </div>
    <emailSummary  v-for="item in emaillist" :sender="item.sender" :noRead="item.noRead" :title="item.title" :date="item.date"
                   :id="item.id"  :key="item.id"></emailSummary>
    <div>正在加载处理{{$route.params.id}}</div>
  </div>
</template>
<script>
    import emailSummary from './email.list.summary.vue'
    export default {
        name: "emailList",
       components:{
         emailSummary
       },
       data(){
          return{
            noReadNum:12,
            emailTotal:25
          }
       },
      props:["emaillist"]
    }
</script>

<style scoped lang="scss">
  $fontSize:14px;
  .emaillist{
    width:448px;
    background: #fff;
    height:100%;
    overflow: auto;
    position: absolute;
    .ehead{
      font-size: $fontSize;
      padding: 14px;
      span:first-child{
        font-weight: 600;
      }
      span:nth-child(2){
        font-size: $fontSize - 1px;
      }
      span:nth-child(3){
        font-size: $fontSize - 1px;
        float: right;
        font-weight: 400;
      }
      span:nth-child(4){
        font-weight: 600;
        float: right;
        margin-right: 7px;
      }

    }
  }
</style>
