<template>
  <div class="approve create_page">
    <!-- <h1>您新增的审批分类id是：{{approveInfo.sid}}</h1>
    <h1>您新增的审批分类name是：{{approveInfo.name}}</h1> -->
    <!--自由流审批页面-->
    <free-flow-templete
        :ref = "flowType"
        :data = "approveInfo"
        :projectId="projectId"
        :projectName ="projectName"
        @closeDialog="closeDialog">
    </free-flow-templete>
    <!--固定流审批页面-->
  </div>
</template>
<script>
import freeFlowTemplete from './approve.freeFlowTemplete'
  export default {
    data() {
      return {
        flowType:'freeFlow',//自由流
      }
    },
    components:{
        freeFlowTemplete,
    },
    props:['approveInfo','projectId','projectName'],
    methods: {
        //保存自由流模板的表单数据
        saveForm:function(){
            this.$refs[this.flowType].saveForm()
        },
        //提交自由流模板的表单数据
        submitForm:function(){
            this.$refs[this.flowType].submitForm()
        },
        //保存成功并关闭父组件弹出窗
        closeDialog:function(str){
            this.$emit('closeDialog',str)//关闭父组件的弹出窗
        }
    },
    mounted(){
        console.info(this.approveInfo)
    }
  }
</script>

<style lang="scss" scoped>
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.create_page{
    .operate_buttons {
        position: absolute;
        right: 0;
        top: 8px;
        ul {
            float: right;
            li {
                float: left;
                list-style: none;
                margin-right: 16px;
                .el-button {
                    padding: 6px 18px;
                    border-radius: 0px;
                    margin-top: 4px;
                    font-weight: normal;
                    color: #82848a;
                }
            }
        }
    }
}
</style>