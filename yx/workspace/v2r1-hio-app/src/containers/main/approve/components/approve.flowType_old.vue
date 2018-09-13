<template>
  <div class="approve flow_type">
    <el-row :gutter="0" class="wrap">
        <!--左侧tabs标签-->
        <el-col :span="6">
            <el-tabs tab-position="left" type="card" class="flow_type_tabs" v-model="activeName" @tab-click="tabClick">
                <el-tab-pane v-for="(item,index) in approveInfo" :key="index" :label="item.name" :name = " 'list-' + index "></el-tab-pane>
            </el-tabs>
        </el-col>
        <!--右侧tabs对应的content内容-->
        <el-col :span="18">
            <el-row :gutter="0" class="flow_type_panels">
              <el-col :span="24">
                <div v-for="(item,index) in approveInfo.length" :key="index" v-if="tabType == index" class="sub_items">
                    <ul>
                        <li v-for="(subItem,index1) in approveInfo[index].subItems" :key="index1" @click="goLink(subItem)">
                            {{subItem.name}}
                        </li>
                        </li>
                    </ul>
                </div>
              </el-col>
            </el-row>
        </el-col>
    </el-row>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'list-0',
        tabType:0,
      }
    },
    props: ['approveInfo'],
    methods: {
        //左侧标签的点击切换事件
        tabClick(tab, event) {
            console.log(tab, event);
            this.tabType = tab.index;
        },
        goLink:function (subItemObj) {
            this.$emit('openCreatePage',subItemObj)
        },
    },
    mounted(){
        window.vue =this;
    },
    watch:{
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
        border:1px solid $borderColor;
        .flow_type_panels{
            border-left:none;
            .sub_items{
                padding:18px 10px;
                ul{
                    padding:0;
                    margin: 0;
                    li{
                        list-style: none;
                        height: 75px;
                        width: calc(23% - 17px);
                        line-height: 22px;
                        padding-top: 10px;
                        margin-left: 1%;
                        margin-right: 1%;
                        margin-bottom: 13px;
                        padding-left: 17px;
                        float: left;
                        font-size: 15px;
                        display: inline-block;
                        background-color:rgba(69, 167, 254, 0.2);
                        overflow: hidden;
                        &:hover{
                            cursor: pointer;
                            color: #fff;
                            background-color:rgba(0, 204, 255, 1);
                            box-shadow:5px 5px 5px rgba(69, 167, 254, 0.2);
                        }
                    }
                }
            }
        }
    }
}
</style>