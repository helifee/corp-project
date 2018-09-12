<template>
  <div class="approve flow_type">
    <el-row :gutter="0" class="wrap">
        <!--左侧tabs标签-->
        <el-col :span="24" v-for="(item,index) in approveInfo" :key="index" v-if="item.childList.length > 0">
            <!-- <div class="title" :style="{color:titleColor[index%4]}">{{item.name}}</div> -->
            <div class="title">{{item.name}}</div>
            <div class="item_approve">
                <ul>
                    <!-- <li v-for="(subItem,index1) in item.childList" :key="index1" @click="goLink(subItem)" :style="{'border-color':itemBorderColor[index%4],'background-color':itemBackgroundColor[index%4]}">
                        <div class="sub_name" :title="subItem.name">{{subItem.name}}</div>
                        <div class="desc" :title="subItem.description">描述：{{subItem.description}}</div>
                    </li> -->
                    <li v-for="(subItem,index1) in item.childList" :key="index1" @click="goLink(subItem)">
                        <div class="sub_name" :title="subItem.name">{{subItem.name}}</div>
                        <div class="desc" :title="subItem.description">描述：{{subItem.description}}</div>
                    </li>
                </ul>
            </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        titleColor:['#46A7FF','#BE96F9','#F05A5A','#F5A623'],//标题颜色
        itemBorderColor:['rgba(149,204,255,0.50)','rgba(216,191,216,0.80)','rgba(240,90,90,0.50)','rgba(245,166,35,0.50)'],//内容边框颜色
        itemBackgroundColor:['rgba(238,247,255,0.30)','rgba(244,251,236,0.40)','#FFF7F7','#FEFBF5'],//内容背景色

      }
    },
    props: ['approveInfo'],
    methods: {
        //进入新建审批页面
        goLink:function (subItemObj) {
            this.$emit('openCreatePage',subItemObj)
        },
    },
    mounted(){
        window.vue =this;
    },
    watch:{
      'approveInfo':{
          handler:function(newVal,oldVal){
            // console.info("approveInfo")
            // console.info(newVal)
            // console.info(oldVal)
          },
          deep:true
      },
        // '$route' (to, from) {
        //     //刷新参数放到这里里面去触发就可以刷新相同界面了
        //     this.getStatus(this.$route.path)
        // }
    }
  }
</script>

<style lang="scss">
.approve.flow_type{
    .flow_type_tabs{
        width: 100%;
        .el-tabs__header.is-left{
            width: calc(100% - 1px);
            border:none;
            .el-tabs__nav{
                border:none;
                .el-tabs__item.is-left{
                    text-align: center;
                    height: 85px;
                    line-height: 85px;
                    font-size: 15px;
                }
            }
        }
        .el-tabs__nav{
            border:none;
        }
    }
}
</style>

<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.flow_type{
    .wrap{
        font-size:14px;
        .title{
            // font-size:16px;
            text-indent:8px;
            // height:30px;
            // border-bottom: 1px solid $borderColor;
            margin-bottom:8px;
        }
        .item_approve{
            margin-bottom:24px;
            ul{
                padding:0;
                margin: 0;
                float:left;
                width:100%;
                margin-bottom:4px;
                li{
                    list-style: none;
                    height: 78px;
                    // width: calc(23% - 2px - 8px);
                    width: calc(31.3% - 2px - 16px);
                    line-height: 22px;
                    padding-top: 16px;
                    margin-left: 1%;
                    margin-right: 1%;
                    margin-bottom: 16px;
                    padding-left: 16px;
                    float: left;
                    display: inline-block;
                    background-color:rgba(255, 255, 255, 1);
                    border: 1px solid #CEE8FF;
                    // border-radius:8px;
                    overflow: hidden;
                    .sub_name,.desc{
                        width:100%;
                        color: $theme-blue;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                    }
                    .desc{
                        color: $theme-black-other;
                        font-size: 12px;
                        margin-top: 8px;
                    }
                    &:hover{
                        cursor: pointer;
                        // background-color:$blueColor;
                        background-color:#EAF5FF;
                        // box-shadow:5px 5px 3px rgba(70, 167, 255, 0.5);
                        .sub_name{
                            font-weight:bold;
                        }
                        .desc{
                            color: $theme-blue;
                            // color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>