<template>
  <div class="approve edit_page">
    <right-slide-modal :alt="approveEditInfo.templateName" :title="pageTitle" :showClose="false" :visible.sync="propsData" class="approve_right_model">
      <div slot="operateButtons" class="operate_buttons">
        <ul>
          <li v-for="(item,index) in pageButtons" :key="index">
            <el-button @click="operateFun(index)">{{item}}</el-button>
          </li>
        </ul>
      </div>
      <div class="content">
        <!--自由流审批页面-->
        <free-flow-templete
            :ref = "flowType"
            :data = "approveEditInfo"
            @closeDialog="closeDialog">
        </free-flow-templete>
        <!--固定流审批页面-->
      </div>
    </right-slide-modal>
  </div>
</template>
<script>
  JZY.locale.add("approveLocale", require("../approve.locale"));
  import freeFlowTemplete from './edit/approve.freeFlowTemplete'
  export default {
    components:{
        freeFlowTemplete,
    },
    data() {
      return {
        pageTitle: l("{approveLocale.editApprove.title}"),//页头标题
        pageButtons: l("{approveLocale.editApprove.buttons}"),//页头右侧的按钮数组
        flowType:'freeFlow',//自由流
      }
    },
    computed: {
        propsData:{//初始化dialog是否显示的变量
            get: function(){
              return this.dialogVisible
            },
            set: function(){
              this.$emit('closeEditModal',false)
            }
        }
    },
    props:{
        dialogVisible: {
            type: Boolean,
            required: true
        },
        approveEditInfo:{//流程实例的信息
            type:Object,
            default:function(){
                return {}
            }
        },
    },
    methods: {
        //右侧弹出页面顶部的功能按钮事件
        operateFun(index) {
            console.info(index);

            switch (index) {
                case 0: //保存事件
                    this.saveDialog();
                    break;
                case 1: //提交事件
                    this.refer();
                    break;
                case 2: //关闭事件
                    this.closeDialog();
                    break;
                default:
                    this.$message("错误");
            }
        },

        //保存审批
        saveDialog() {
            this.$refs[this.flowType].saveForm()
        },
        //提交审批
        refer: function() {
            this.$refs[this.flowType].submitForm()
        },
        //关闭
        closeDialog( str = '' ) {
            console.info(str)
            this.$emit('closeEditModal',str)//关闭父组件的弹出窗
            this.$router.go(-1)  //跳出当前编辑的实例页面，后端在驳回再编辑后提交，会生成新的实例id
        },
    },
    mounted(){
        console.info(this.approveEditInfo)
    },
    watch:{
        approveEditInfo:{
    　　　　handler(newValue, oldValue) {
                console.info("oldValue")
                console.info(newValue)
    　　　　},
    　　　　deep: true
        },
    },
  }
</script>

<style lang="scss" scoped>
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.edit_page{
}
</style>