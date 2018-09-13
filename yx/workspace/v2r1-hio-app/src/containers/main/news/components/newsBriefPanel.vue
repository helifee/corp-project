<template>
    <router-link tag="div" class="news-brief-panel" :to="'/news/details/' + dataList.id ">
        <div class="news-title">{{dataList.title}}<span class="red" v-if="dataList.isNew">new</span><span v-if="dataList.isTop">置顶</span></div>
        <div class="news-brief">{{dataList.brief}}</div>
        <div class="news-info">
            {{dataList.author}}
            {{l('{newsLocale.kewWords.publishedIn}')}}{{dataList.time}}/
            {{dataList.frequency}}{{l('{newsLocale.kewWords.times}')}}
            <span class="news-label">{{dataList.label}}</span>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'newsBriefPanel',
  props: ["dataList"]
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
    .news-brief-panel{
        display: block;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        color: #303133;
        margin-bottom: 16px;
        cursor: pointer;
        .news-title{
            height: 36px;
            line-height: 36px;
            background-color: #f9fafc;
            padding: 0 22px;
        }
        .news-brief{
            padding: 12px 36px 22px;
            font-size: 14px;
            line-height: 24px;
            border-bottom: 1px solid #eaeefb;
            color: #999999;
        }
        .news-info{
            line-height: 36px;
            padding: 0 22px;
            color: #999999;
            font-size: 14px;
        }
        &:hover{
            box-shadow:2px 3px 5px #888888;
        }
    }
</style>
