<template>
    <div class="summary" @click="showDetail">
      <ul>
        <li>
          <span v-if="noRead==true" class="point"></span>
          <a class="sender">{{sender}}</a>
          <span class="date">{{date}}</span>
        </li>
        <li>
          <p>{{title}}</p>
          <i :class="star" @click.stop="clickStar"></i>
        </li>
      </ul>
    </div>

</template>

<script>
    export default {
        name: "emailSummary",
        props: ['noRead','title','sender','date','id'],
        data(){
          return{
            curSel:this.$props.noRead,
            star:"el-icon-star-off star"
          }
        },
       mounted(){
         // console.log(this.curSel+"cur")
       },
      methods:{
        clickStar(event){
          this.star=this.star.indexOf("-on")>-1?"el-icon-star-off star":"el-icon-star-on star";
        },
        showDetail(){
          let path=this.$route.path.split("/");
          path.pop();
          this.$router.push(path.join("/")+"/"+this.$props.id)
          // this.$route.params.id=this.$props.id;
        }
      }
    }
</script>

<style scoped lang="scss">
  .summary{
    padding: 5px 15px;
    position: relative;
    border-bottom: 1px solid #ebeef5;
    color: #333333;
    cursor:pointer;
    li{
      padding: 5px 0;
    }
    .point{
       display: inline-block;
       height: 7px;
       width: 7px;
       background: #8c0615;
       border-radius: 50%;
       position: absolute;
       top: 17px;
    }
    .sender{
      font-size: 16px;
      margin-left: 14px;
    }
    .date{
      float: right;
      color:rgba(51, 51, 51, 0.647058823529412);
    }
    p{
      padding-left: 14px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 291px;
      display: inline-block;
      font-size: 14px;
    }
    .star{
      float: right;
      color:#ea9518;
    }
    &:hover{
      background-color: rgba(244,244,244,1);
    }
  }
</style>
