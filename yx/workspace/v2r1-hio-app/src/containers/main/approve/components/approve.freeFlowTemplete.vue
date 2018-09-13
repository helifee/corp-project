<template>
  <div class="approve create free_flow">
    <!--表单项-->
    <el-row :gutter="0">
      <el-col :span="24">
        <div class="detail_content">
            <!-- <h1 class="title">{{data.name}}</h1> -->
            <el-form ref="freeFlowInfo" label-width="85px" class="free_flow_info">
              <el-form-item label="申请流程：">
                <span v-text="data.name"></span>
              </el-form-item>
              <el-form-item label="流程说明：">
                <span v-text="data.description"></span>
              </el-form-item>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="申请人：">
                    <span v-text="$store.state.session.name"></span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门：">
                    <span v-text="$store.state.session.dept"></span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="日期：">
                    <span>{{attachUploadInfo.startTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!--调用表单-->
            <flow-form
                ref="instance"
                v-if="freeFlowForm.templateId"
                formMode="instance"
                :flowTemplateCode = "freeFlowForm.templateId"
                :businessId = "freeFlowForm.businessId"
                :instanceId = "freeFlowForm.instanceId"
                :customFormId = "freeFlowForm.customFormId"
                @cb-flow-form-instance-saved="cbFlowFormInstanceSaved"
            >
            </flow-form>
            
            <el-form ref="freeFlowForm" :model="freeFlowForm" :rules="freeFlowRules" label-width="100px" class="free_flow_content">
              <!--自由流程F，显示-->
                <el-form-item label="配置流程：" v-if="data.freeOrTemplate === 'F'">
                    <el-button @click="labelDialogVisible = !labelDialogVisible">+</el-button>
                    <span v-for="(subItem,index) in nodeFromAddLabelList" :key = "index">
                      <em v-if=" subItem.approvers.length > 1">[ </em>
                      <el-tag
                        v-if="user.sid"
                        v-for="(user,index2) in subItem.approvers"
                        :key="index2"
                        :disable-transitions="false">
                        {{user.name}}
                      </el-tag>
                      <em v-if=" subItem.approvers.length > 1"> ]</em>

                      <em v-if=" nodeFromAddLabelList.length -1 > index "> ==> </em>
                      
                    </span>
                </el-form-item>
                <el-form-item label="添加抄送：">
                    <!--抄送人全局组件的使用-->
                    <blend-tree
                        ref= "sharedUserTree"
                        :tagButtons="tagButtonsForSharedUser"
                        :activeTab = "activeTabForSharedUser"
                        :selectedDataToTree = "selectedDataToTreeForSharedUser"
                        @getDataFromTree = "getDataFromTreeForSharedUser">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                          <i class="el-icon-circle-plus" @click.stop = "$refs.sharedUserTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>

                    <!-- <el-tag
                      v-for="(item,index) in sharedUsers"
                      :key="index"
                      closable
                      :disable-transitions="false"
                      @close="deleteUser(item.nodeId)">
                      {{item.name}}
                    </el-tag>
                    <span class="el-icon-circle-plus " @click="showUserTree = !showUserTree">添加抄送人</span> -->
                </el-form-item>
                <el-form-item label="附件：">
                  <attach-upload
                    ref="attachUpload"
                    v-if="attachUploadInfo.businessId"
                    :required = "false"
                    :multiple = "false"
                    :appId="attachUploadInfo.appId"
                    :businessId="attachUploadInfo.businessId"
                    :categoryId="attachUploadInfo.categoryId"
                    @fileQueued="handleAttachQueued"
                    @uploadError="handleAttachError"
                    @uploadFinished="handleAttachUploadSuccess">
                  </attach-upload>
                </el-form-item>
                <el-form-item label="关联项目：">
                  <el-input v-if="projectId && projectName" :disabled="true" v-model="projectName" :title="projectName"></el-input>
                  <el-select popper-class="select_project" v-else v-model="freeFlowForm.projectId"  :title="freeFlowForm.projectName" @change = "setProjectId(freeFlowForm.projectId)" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in projectList"
                      :key="index"
                      :label="item.projectName"
                      clearable
                      :value="item.sid">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-form>
        </div>
      </el-col>
    </el-row>

    <!--弹出窗:自由流需要配置流程-审批人-->
    <add-label
      :labelDialogVisible = "labelDialogVisible"
      :infoData = "freeFlowForm"
      @closeAddLabelModal="labelDialogVisible = !labelDialogVisible"
      @saveInfoData="saveInfoData"
    >
    </add-label>

    <!--选择人员-->
    <user-tree
      :selectUserDialogVisible="showUserTree"
      :show-inside-outside-tabs="true"
      :selectedUsers = "sharedUsers"
      @closeCreateModal ="showUserTree = !showUserTree"
      @getUserTree = "getUserTree">
    </user-tree>

  </div>  
</template>
<script>
// import '@Main/task/fonts/iconfont.css'
import flowForm from "@/containers/main/flowForm/client";
import addLabel from "@Main/approve/components/create/addLabel.vue";
import { mapGetters } from "vuex";
import {
  getFlowStartView,
  addFreeFlow,
  draftSave
} from "@Main/approve/getData";
//项目接口：数据接口文件
import { getProjectListById } from "@Main/project/getData";
// import Vue from 'vue'
// import Vuex, { Store } from 'vuex';

// Vue.use(Vuex);

export default {
  components: {
    flowForm,
    addLabel
  },
  data() {
    return {
      saveMode: "", // draftSave, submit
      labelDialogVisible: false, //自由流-流程配置

      showUserTree: false, //抄送人弹出窗
      sharedUsers: [], //抄送人

      freeFlowForm: {
        isRemove: false, //true:删除草稿，false: 不删除
        instanceId: "", //流程实例id
        templateId: this.data.code, //模板code
        businessId: "", //业务单据Id
        businessData: [
          {
            //业务单据
            attrCode: "", //字段属性代码
            attrName: "", //字段属性名称
            attrType: "", //字段属性类型
            attrValue: "" //字段属性值
          }
        ],
        customFormId: "", //保存表单，后端返回的值
        valueData: {}, //表单key-value键值对
        terminalType: "web", //终端类型：ios android web
        copyUserIds: [], //抄送人
        attachmentId: "", //附件id
        projectId: this.projectId, //关联项目id
        projectName: this.projectName, //关联项目名称
        freeOrTemplate: this.data.freeOrTemplate, //流程发起方式：F：自由流 T：模板
        nodeList: [] //自由流审批人列表，提交表单
      },
      nodeFromAddLabelList: [], //自由流审批人列表
      freeFlowRules: {
        // instanceName: [
        //   { required: true, message: '请输入主题', trigger: 'blur' },
        //   { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        // ],
      },
      projectList: [], //关联项目
      // projectList:[{//关联项目
      //     projectName:'项目一',
      //     sid:'beijing'
      // },{
      //     projectName:'项目二',
      //     sid:'shanghai'
      // },{
      //     projectName:'项目三项目三项目三项目三',
      //     sid:'tianjin'
      // }],
      isAttachUploadFinished: false, //附件上传
      attachUploadInfo: {
        //获取附件所需的参数
        appId: "",
        businessId: "",
        categoryId: "",
        startTime: ""
      },
      //混合树组件2.0-抄送人
      selectedDataToTreeForSharedUser:{//已选树节点
        userList:[],
        userOutsideList:[]
      },
      tagButtonsForSharedUser:['user','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
      activeTabForSharedUser:'user',//初始化激活的tab标签
    };
  },
  props: ['data','projectId','projectName'],
  computed: {
    ...mapGetters({
      session: "session"
    })
  },
  methods: {
    //获取新增流程的详情，附件用
    async getFlowStartView(templateCode = "") {
      let res = await getFlowStartView(templateCode);
      this.attachUploadInfo = res[0];

      // this.freeFlowForm.businessId = this.attachUploadInfo.businessId
      this.freeFlowForm.businessId = ""
      this.freeFlowForm.attachmentId = this.attachUploadInfo.businessId


      console.info("attachUploadInfo", this.attachUploadInfo);
    },
    //删除抄送人tag的事件-作废
    deleteUser(nodeId) {
      this.sharedUsers = this.sharedUsers.filter(function(item) {
        return item.nodeId != nodeId;
      });

      this.freeFlowForm.copyUserIds.splice(
        this.freeFlowForm.copyUserIds.indexOf(nodeId),
        1
      );
    },
    //接收用户树返回的数据：抄送人-作废
    getUserTree: function(arr) {
      this.sharedUsers = [...arr];
      this.freeFlowForm.copyUserIds = [];

      this.sharedUsers.forEach(item => {
        // this.freeFlowForm.copyUserIds.push({
        //     sid:item.isInside=='inside' ?item.sid:item.imUserId,
        //     type:item.isInside=='inside' ? 0 : 1
        // });
        this.freeFlowForm.copyUserIds.push(item.sid);
      });
    },
    //自由流，审批环节设置数据
    saveInfoData: function(dataInfo = {}) {
        console.info("dataInfo=======", JZY);

        this.nodeFromAddLabelList = JZY.u.copy(dataInfo)


        this.freeFlowForm.nodeList = JZY.u.copy(dataInfo)


        //返回后端的，将sid替换成id，作废了，不变属性了6.1
        // this.freeFlowForm.nodeList.forEach((item,index)=>{
        //   item.approvers = item.approvers.map((item1)=>{
        //     return {
        //       id:item1.sid,
        //       name:item1.name,
        //       type:item1.type
        //     }
        //   })
        // })

        console.info("dataListInfo1=======",this.nodeFromAddLabelList)
        //动态绑定
        // dataInfo.forEach((item,index)=>{
        //   this.$set( this.nodeFromAddLabelList ,index , item )
        // })


        this.labelDialogVisible = !this.labelDialogVisible;
        console.info("this.freeFlowForm=======", this.freeFlowForm);
    },
    //根据人员id获取项目list
    async getlistProjectListById(sid = "") {
      let res = await getProjectListById(sid);
      console.info(res[0]);
      if (res[0].length > 0) {
        this.projectList = [...res[0]];
      }
      console.info(this.projectList);
    },
    //根据选择的项目id，设置项目name
    setProjectId:function( value ){
      console.info(value)
      console.info(this.projectList)
      const selectProjectObj = this.projectList.filter((item)=>{
        return item.sid == value
      })

      this.freeFlowForm.projectId = value
      this.freeFlowForm.projectName = selectProjectObj[0].projectName

    },
    //保存流程为草稿的事件
    async saveForm() {
      if (this.freeFlowForm.freeOrTemplate == 'F' && this.nodeFromAddLabelList.length == 0) {//审批人列表为空，不允许发起自由流
          this.$message({
            showClose: true,
            message: '请配置流程中的审批人',
            type: 'warning'
          })
      }else{
        //保存表单的接口，子组件
        this.data.saveMode = "draftSave";
        let res = await this.$refs.instance.saveInstanceForm();
      }
      
    },
    //流程提交事件
    async submitForm() {
      if (this.freeFlowForm.freeOrTemplate == 'F' && this.nodeFromAddLabelList.length == 0) {//审批人列表为空，不允许发起自由流
          this.$message({
            showClose: true,
            message: '请配置流程中的审批人',
            type: 'warning'
          })
      }else{
        //保存表单的接口，子组件
        this.data.saveMode = "submit";
        let res = await this.$refs.instance.submitInstanceForm();
      }
    },
    cbFlowFormInstanceSaved(data) {
      if (data.validation == false) {
          this.$message({
            showClose: true,
            message: '自定义表单校验失败！',
            type: 'warning'
          })
      }else{//自定义表单校验通过
        if (this.data.saveMode == "draftSave") {
          this.$refs.freeFlowForm.validate(async valid => {
            if (valid) {
              //过滤掉审批人的name属性
              // console.info("this.nodeFromAddLabelList",this.nodeFromAddLabelList)
              // this.nodeFromAddLabelList.forEach((node, index) => {
              //   let approversArr = []
              //   node.approvers.forEach((item) => {
              //     approversArr.push(item.sid)
              //   });
              //   this.freeFlowForm.nodeList[index] = JZY.u.deepExtend({},node)

              //   this.freeFlowForm.nodeList[index]["approvers"] = [...approversArr];
              // });

              console.info("this.freeFlowForm-----", this.freeFlowForm);

              let params = {
                templateId: this.data.sid,
                valueData: JSON.stringify(data.valueData),
                businessData: data.businessData,
                customFormId: data.customFormId,
                businessId: data.businessId,
                operateType: '1',
              };

              params = JZY.u.deepExtend({}, this.freeFlowForm, params);
              try {
                //保存流程
                const result = await draftSave(params);
                //附件上传bug修复
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))

                this.$refs.freeFlowForm.resetFields(); //置空表单项

                this.$emit("closeDialog", "reflashData"); //关闭父组件的弹出窗
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
              } catch (err) {
                console.log(err);
              }
            } else {
              // this.$notify.error({
              //   title: "错误",
              //   message: "请检查输入是否正确",
              //   offset: 100
              // });
              this.$emit("$closeDialog", "noClose"); //不关闭也不切换组件
              return false;
            }
          });

        } else if (this.data.saveMode == "submit") {
          // 提交部分的回调
          this.$refs.freeFlowForm.validate(async valid => {
            if (valid) {
              //过滤掉审批人的name属性
              // this.nodeFromAddLabelList.forEach((node, index) => {
              //   let approversArr = []
              //   node.approvers.forEach((item) => {
              //     approversArr.push(item.sid)
              //   });
              //   this.freeFlowForm.nodeList[index] = JZY.u.deepExtend({},node)

              //   this.freeFlowForm.nodeList[index]["approvers"] = [...approversArr];
              // });

              let params = {
                templateId: this.data.sid,
                valueData: JSON.stringify(data.valueData),
                businessData: data.businessData,
                customFormId: data.customFormId,
                businessId: data.businessId,
                operateType: '1'
              };

              params = JZY.u.deepExtend({}, this.freeFlowForm, params);
  // debugger
              console.info("params+++++", params);
              try {
                const result = await addFreeFlow(params);
                
                //附件上传bug修复
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
  // debugger
                // this.$refs.freeFlowForm.resetFields(); //置空表单项
                this.$emit("closeDialog", "reflashData"); //关闭父组件的弹出窗
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
              } catch (err) {
                console.log(err);
              }
            } else {
              // this.$notify.error({
              //   title: "错误",
              //   message: "请检查输入是否正确",
              //   offset: 100
              // });
              this.$emit("closeDialog", "noClose"); //不关闭也不切换组件
              return false;
            }
          });
        }
      }
    },
    //文件上传-上传中
    handleAttachQueued() {
      // alert('add one new attach file')
      this.isAttachUploadFinished = false;
    },
    //文件上传-成功
    handleAttachUploadSuccess(res) {
      this.isAttachUploadFinished = true;
      // alert("全部上传成功,返回信息请查看控制台显示");
      // console.log("附件上传成功返回信息：", res);
    },
    //文件上传-出错
    handleAttachError() {
      this.$message('附件上传出错啦')
    },

    //抄送人2.0组件-接收混合树组件的返回值
    getDataFromTreeForSharedUser( obj = {} ){
        console.info(obj)
        console.info(JSON.stringify(obj))
        // debugger
        this.freeFlowForm.copyUserIds = [];
        obj.userList && obj.userList.forEach((item)=>{
            this.freeFlowForm.copyUserIds.push(item.sid)
        });
        obj.userOutsideList && obj.userOutsideList.forEach((item)=>{
            this.freeFlowForm.copyUserIds.push(item.sid)
        });
    },
  },
  mounted() {
    //初始化流程，获取附件需要的属性
    this.getFlowStartView(this.data.code);

    //从vuxe里获取当前登陆人的sid
    this.getlistProjectListById(this.$store.state.session.sid);

    console.info(this.data, "this.data");
    console.info(this.$store.state.customForm);
  },
  watch: {
    //监控表单保存是否完成，并取值
    "$store.state.customForm.valueData": {
      handler(newValue, oldValue) {
        console.info("newValue");
        console.info(newValue);

        // console.info(this.$store.state.customForm.businessData,"businessData")
        this.freeFlowForm.businessData = [
          ...this.$store.state.customForm.businessData
        ];
        this.freeFlowForm.valueData = JZY.u.deepExtend({}, newValue);

        console.info(this.freeFlowForm.businessData);
      },
      deep: true
    },
    //监控表单校验是否通过，ture即通过校验
    "$store.state.customForm.valueRules": {
      handler(newValue, oldValue) {
        console.info("newValue");
        console.info(newValue);
        // this.saveFlow()
        if (newValue == true) {
        } else {
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.approve.create.free_flow {
  .free_flow_info {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .el-form {
    .el-form-item {
      // margin-bottom: 12px;
      .el-form-item__label {
        width: 100px;
      }
      .el-form-item__content {
        // .el-input{
        //     width: calc(100% - 120px);
        // }
      }
      .el-tag {
        margin-left: 10px;
        margin-right: 10px;
      }
      .el-select{
        width:100%
      }
    }
  }
}

.el-popper.select_project{
  .el-select-dropdown__list,.el-cascader-menu{
      max-width:644px;
  }
}
</style>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.create.free_flow {
  .free_flow_info {
  }
  .detail_content {
    padding: 0;
    background-color: #fff;
    .title {
      text-align: center;
      font-size: 16px;
    }
    .free_flow_content {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid $borderColor;
      .el-form-item{
        margin-bottom:8px
      }
    }
  }
}
</style>