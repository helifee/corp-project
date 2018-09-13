<template>
  <div class="approve detail_step">
    <el-row :gutter="0" class="title">
        <el-col :span="5" class="approve_name">{{data.approveName}}</el-col>
        <el-col :span="12" class="approve_type">
            审批方式：<span>{{data.approveType}}</span>
        </el-col>
        <span class="step_name">{{data.stepName}}</span>
    </el-row>

    <el-row :gutter="20" class="approve_user">
        <el-col :span="24" class="warp">
            <div class="user" v-for="(item,index) in data.users" :key="index">
                <h5>处理人：</h5>
                <i class="iconfont icon-user"></i>
                <span>{{item.dept}} {{item.userName}}</span>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  export default {
    data() {
      return {}
    },
    props: ['data'],
    methods: {

    },
  }
</script>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.detail_step{
    margin-bottom: 20px;
    border: 1px solid $borderColor;
    .title{
        padding: 10px 10px 0px;
        padding-top: 10px;
        .approve_name{
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            color: $labelColor;
        }
        .approve_type{
            text-align: left;
            color: $labelColor;
            font-size: 14px;
        }
        .step_name{
            position:absolute;
            top: 5px;
            left: 10px;
            font-size: 12px;
            color: $labelColor;
            font-weight: bold;
        }
    }
    .approve_user{
        margin-top: 10px;
        .warp{
            width: 94%;
            margin-left: 3%;
            margin-bottom: 15px;
            border: 1px solid $borderColor;
            background: whitesmoke;
            .user{
                width: 20%;
                float: left;
                color: $labelColor;
                padding-top: 5px;
                margin-bottom: 10px;
                font-size: 14px;
                h5{
                    padding-bottom:5px;
                }
                .iconfont{
                    color: #09f;
                    font-size: 30px;
                }
            }
        }
    }
    
}
</style>