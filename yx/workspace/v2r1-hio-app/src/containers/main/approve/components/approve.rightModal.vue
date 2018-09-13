<template>
  <div class="approve right_modal">


    <right-slide-modal :title="pageTitle" :visible.sync="propsData" class="approve_right_model">
      <div slot="operateButtons" class="operate_buttons">
        <ul>
          <!--<li><el-button @click="dialogVisible1=true">open dialogVisible1</el-button></li>-->
          <li v-for="(item,index) in pageButtons" :key="index">
            <el-button @click="operateFun(index)">{{item}}</el-button>
          </li>
        </ul>
      </div>
        <approve-create-page
            v-if="showCreateComponent"
            ref="approveCreate"
            :approveInfo="createFormData"
            :projectId="projectId"
            :projectName ="projectName"
            @closeDialog = "gobackFromCreate">
        </approve-create-page>
        <approve-flow-type
            v-else
            :approveInfo="flowTypeData"
            @openCreatePage="openCreatePage">
        </approve-flow-type>
    </right-slide-modal>
  </div>
</template>
<script>
JZY.locale.add("approveLocale", require("../approve.locale"));
import approveFlowType from "@Main/approve/components/approve.flowType.vue";
import approveCreatePage from "@Main/approve/components/approve.createPage.vue";
import {getUserCategory , } from '@Main/approve/getData'

export default {
    components: {
        approveFlowType,
        approveCreatePage
    },
    data() {
        return {
            // dialogVisible1:false,
            pageTitle: l("{approveLocale.flowType.title}"),//页头标题
            pageButtons: l("{approveLocale.flowType.buttons}"),//页头右侧的按钮数组
            showCreateComponent: false,//弹出窗内容默认打开审批类型
            createFormData: {//新增审批表单的data
                // id: "",
                // name: ""
            },
            flowTypeData: [],//审批类型的表单data
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        },
        openFlowTypeIdFromHome:{//系统首页快速入口
            type:String,
            default:''
        },
        //自于项目，项目id
        projectId: {
            type: String,
            default:''
        },
        //自于项目，项目名称
        projectName: {
            type: String,
            default:''
        },
    },
    computed: {
        propsData:{//初始化dialog是否显示的变量
            get: function(){
              return this.dialogVisible
            },
            set: function(){
              this.$emit('closeCreateModal',false)
            }
        }
    },
    methods: {
        //设置当前打开的组件
        setNowComponent:function(){
            if (this.showCreateComponent) {
                //当前是新增审批页面的操作
                this.showCreateComponent = false
                this.pageTitle = l("{approveLocale.flowType.title}")
                this.pageButtons = l("{approveLocale.flowType.buttons}")
                console.info(this.flowTypeData)
            } else {
                //审批分类页面的操作
                this.showCreateComponent = true
            }
        },
        //右侧弹出页面顶部的功能按钮事件
        operateFun(index) {
            console.info(index);
            let type = this.showCreateComponent ? "create" + index : "flowTpye" + index

            switch (type) {
                case "create0": //新增审批页面中的保存事件
                    this.saveDialog();
                    break;
                case "create1": //新增审批页面中的提交事件
                    this.refer();
                    break;
                case "create2": //新增审批页面中的关闭事件
                    this.gobackFromCreate();
                    break;
                case "flowTpye0": //审批分类页面中的关闭事件
                    this.goback2();
                    break;
                default:
                    this.$message("错误");
            }
        },
        //保存审批
        saveDialog() {
            this.$refs.approveCreate.saveForm();
        },
        //提交审批
        refer: function() {
            this.$refs.approveCreate.submitForm();
            // this.$router.push({path:'/approve', query:{stage: stage}});
            // 带查询参数，变成/approve?stage=stage
            // this.$message("提交成功");
        },
        //关闭1
        gobackFromCreate(str = '') {
            if (str === 'reflashData') {
                this.$emit("closeCreateModal", str); //关闭弹出窗
                this.setNowComponent()
            }else if(str ==='noClose'){
                // console.info("setNowComponent")
            }else{
                this.setNowComponent()
            }
        },
        //返回2
        goback2() {
            this.$emit("closeCreateModal", ''); //关闭弹出窗
        },
        //在审批分类页面中直接打开新增审批页面
        openCreatePage: function(obj) {
            // this.pageTitle = obj.name;
            this.pageTitle = l("{approveLocale.createApprove.title}");
            console.info("createFormData")
            this.pageButtons = l("{approveLocale.createApprove.buttons}");
            console.info("createFormData")
            console.info(obj)
            this.createFormData = JZY.u.deepExtend({} ,obj)
            // this.$message("成功打开新建审批的表单页面:" + obj.name);
            this.showCreateComponent = true;
        },
        //获取我的审批分类
        async userCategory(){
            let res = await getUserCategory()
            console.info(res)
            // this.flowTypeData = [...this.flowTypeData,...res]
            this.flowTypeData = [...res[0]]
            //系统首页快速入口
            this.initFromHome()
            
            // console.info(this.flowTypeData)
            // console.info("this.createFormData")
            // console.info(this.createFormData)
        },

        //系统首页快速入口
        initFromHome:function(){
            if(this.openFlowTypeIdFromHome){
                for( let i = 0 ; i < this.flowTypeData.length ; i++) {
                    let item = this.flowTypeData[i].childList
                    if (item && item.length > 0 ) {
                        for( let j = 0 ; j < item.length ; j++ ) {
                            if ( item[j].code ==  this.openFlowTypeIdFromHome ) {
                                this.createFormData = JZY.u.deepExtend( {} , item[j] )
                                this.openCreatePage( this.createFormData )
                                return;
                            }
                        }
                    }
                }
                
            }
        },

    },
    mounted(){
        this.userCategory()
    },
    watch: {
        //系统首页快速入口
        openFlowTypeIdFromHome:function(newVal,oldVal){
            // console.info(newVal)
            // console.info("oldVal")
            // this.initFromHome()
        },
    },
};
</script>
<style lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.right_modal {
}
</style>