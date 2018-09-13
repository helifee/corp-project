<template>
  <div class="emaillist">
     <div class="ehead">
       <div>
         <span>正在跳转邮箱..........</span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: ccEmailboxList
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

