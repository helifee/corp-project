<template>
  <div class="infinite_wrap">
    <div class="scroll_content"
      ref="scrollWrap"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      :infinite-scroll-listen-for-event = "false"
      infinite-scroll-throttle-delay="200"
      infinite-scroll-distance="10">
      <div class="scrollWrap1" ref="scrollWrap1">
        <slot name="contentScroll"></slot>
        <slot></slot>
        <div class="noData" v-if="isloadingComplete">
          没有多余数据可加载！
        </div>
      </div>
    </div>
    <div class="nsr-card-loading">
      <nsr-loading
      :hide-loading="isloadingComplete"
      :is-end-text="endText">
      </nsr-loading>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'; // get vue
import InfiniteScroll from 'vue-infinite-scroll'; // get vue-infinite-scroll
Vue.use(InfiniteScroll);

export default {
  data(){
    return{
      busy: false,//加载更多开关
      isloadingComplete:this.noData,//加载更多动画
      endText:'加载中...'
    }
  },
  components: {
    'nsr-loading': require('./loading.vue'),
  },
  props:{
    noData:{//是否有更多数据可加载
      type:Boolean,
      default:false
    },
  },
  mounted() {
  },
  methods: {
      //触发加载更多的事件
      loadMore: function () {
        if (! this.busy) {
          this.isloadingComplete = false
          // alert(this.busy)
          this.busy = true;
          console.log('loading... ' + this.busy);
          this.$emit("reflashData")//回调加载更多数据
          console.log('this.busy... ' + this.busy);
        }
      },
      //数据加载之后，回调，改变dom
      changeDom(){
          this.$nextTick(() => {
              let container = this.$refs.scrollWrap//滚动最外层div对象
              let container1 = this.$refs.scrollWrap1//滚动最外层div对象
              // let viewH = container.clientHeight;//可见高度
              let contentH = container1.scrollHeight;//内容高度  
              let scrollTop = container.scrollTop;//滚动高度 
// debugger
              //定位滚动条当前的位置
              //100期望本次滚动条相对于上次滚动条的位置高度差，此值是以滚动条最上端为参照
              // container.scrollTop = scrollTop
              //设置视窗的高度
              container.style.height = contentH + 'px';
              this.busy = false
              this.isloadingComplete = false
              console.info("container.scrollTop",container.scrollTop)
          })
      },
      //没有多余数据可加载的回调，改变滚动状态
      changeScrollState(){
        // debugger
        
        this.$nextTick(() => {
              let container = this.$refs.scrollWrap//滚动最外层div对象
              let container1 = this.$refs.scrollWrap1//滚动最外层div对象
              // let viewH = container.clientHeight;//可见高度
              let contentH = container1.scrollHeight;//内容高度  
              let scrollTop = container.scrollTop;//滚动高度

              // debugger
              container.style.height = contentH + 40 + 'px';
              this.busy = true
              this.isloadingComplete = true
          })
        // debugger
      },
  },
  watch:{
    noData(newVal,oldVal){
      this.busy = !newVal
      // if (newVal) {
        this.isloadingComplete = newVal
      // }
    },
  }
}
</script>

<style scoped lang="scss">
.infinite_wrap{
  padding-bottom:24px;
  .scroll_content{
    width: 100%;
    margin: 0px auto;
    // background-color:#c00;
    // border:1px solid #000;
    .noData{
      width:100%;
      height:48px;
      line-height:48px;
      text-align:center;
      color: $theme-red;
    }
  }
}
</style>