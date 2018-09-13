<template>
<div class="news_notice home_warp">
    <div v-if="newsDataList.length">
        <div v-for="(row,index) in newsDataList" :key="index" class="news_item">
            <span v-if="row.isNew" class="isNew"></span>
            <router-link  tag="div" class="link-news" :to="'news/details/'+row.sid">
                <i class="el-icon-tickets"></i>
                <span class="newsTitle" :title="row.title">{{row.title}}</span>
                <span class="column">{{row.newsTypeName}}</span>
                <span class="person" :title="row.createPersonName">发布人：{{row.createPersonName}}</span>
                <span class="date">{{row.publishDate}}</span>
            </router-link>
            <!--<span v-if="row.newsTop" class="newsTop">置顶</span>-->

        </div>
    </div>

    <div v-else class="noData">
        <p>暂无数据</p>
    </div>
</div>
</template>

<script>
    import { postNewsList } from '@Main/news/getData.js'
    import moment from 'moment'
  export default {
    data() {
      return {
        newsDataList:[],
        tableData:[],
      }
    },
    methods:{
		//新闻列表
        async rqNewsList( pageNum = 1 ){

            //新闻大权限的判断
            let newsPremission = false
            if(this.$store.state.session.tenantInfo.roleMenus.length > 0 ){//非管理员
                newsPremission = this.$store.state.session.tenantInfo.roleMenus.some((item)=>{
                    return item.url.indexOf('/news') != -1
                })
            }else{
                newsPremission = true
            }

            if(newsPremission){//没有新闻大权限，不发请求

              let res = await postNewsList('','','1',pageNum,5);

              let len = res[0].list.length;
              if(len){
                  res[0].list.map(item=>{
                      let today = moment().format("YYYY-MM-DD");
                      let beforeDay = moment(today).subtract(1, "days").format("YYYY-MM-DD") +'00:00:00';
                      let threeBeforeDay = moment(today).subtract(3, "days").format("YYYY-MM-DD HH:mm:ss");
                      let publishTime = moment(item.publishDate).format("YYYY-MM-DD HH:mm:ss");

                      let curYear = moment().format("YYYY");
                      let itemYear =  moment(item.publishDate).format("YYYY");

                      if(curYear==itemYear){
                          item.publishDate = moment(item.publishDate).format("MM-DD HH:mm");
                      }else{
                          item.publishDate = moment(item.publishDate).format("YYYY-MM-DD HH:mm");
                      }
                      if(publishTime>threeBeforeDay){
                          item.isNew = true;
                      }else{
                          item.isNew = false;
                      }
                      this.newsDataList.push(item);
                  });

                  this.$emit("setHeight")//修改父组件的高度
              }
            }

            this.$emit("changeNewsRole",newsPremission)
		
//		        console.log(this.newsDataList);
        },
      },
      mounted(){
//        console.info("rqNewsList")
        this.rqNewsList(1)
      }
  }
</script>

<style lang="scss" scoped>
.news_notice.home_warp{
    .el-icon-tickets{
        position: absolute;
        left: 0px;
        top: 1px;
        color: $theme-blue;
        font-size: 14px;
    }
  .news_item{
    position: relative;
    // line-height:36px;
    height: 36px;
    font-size:14px;
    /*text-indent:10px;*/
      .link-news:hover{
          color: $theme-blue;
          cursor: pointer;
          .column,.person,.date{
              color: $theme-blue;
          }
      }
    .newsTitle{
        display: inline-block;
      width:auto;
      max-width: calc(100% - 380px);
      height:32px;
      font-size:12px;
      // padding-right:100px;
      /*float: left;*/
      position:relative;
      overflow: hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
        margin-left: 10px;
        padding-left: 10px;
    }
    .isNew{
        background:$theme-red;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        position: absolute;
        left: 9px;
        top: -1px;
        z-index: 3;
    }
    .newsTop{
        color:$theme-blue;
        margin-left:5px;
        font-size:12px;
    }
      .column{
          position:absolute;
          right: 235px;
          top: 0;
          width: 100px;
          font-size: 12px;
          color: $theme-black-other;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
      .person{
          position:absolute;
          right: 110px;
          top: 0;
          width: 125px;
          font-size: 12px;
          color: $theme-black-other;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
    
    .date{
      position:absolute;
      right:0;
      top: 0;
      @include sc(12px,$theme-black-other)
    }
  }

    @media screen and (max-width: 1020px) {
        .newsTitle{
            max-width: calc(100% - 300px);
        }
        .column{
            display: none;
        }
    }

  .noData{
      p{
          color: $theme-black-other;
          text-align: center;
          line-height: 30px;
          font-size: 12px;
      }
  }
}
</style>