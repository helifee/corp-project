<!--预览模板-->
<template>
  <div class="approve show_approve">
    <!--表单项-->
    <el-row :gutter="0">
      <el-col :span="24">
        <div class="detail_content">
            <h1 class="title">{{flowTemplateInfo.name}}</h1>
            <el-form ref="freeFlowInfo" label-width="100px" class="free_flow_info">
              <el-form-item label="申请流程：">
                <span v-text="flowTemplateInfo.name"></span>
              </el-form-item>
              <el-form-item label="流程说明：">
                <span v-text="flowTemplateInfo.description"></span>
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
                    <span>{{flowTemplateInfo.startDate}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!--调用表单-->
            <flow-form
                v-if="flowTemplateInfo.code"
                formMode="instance"
                ref="instance"
                :flowTemplateCode = "flowTemplateInfo.code"
                :businessId = "flowTemplateInfo.businessId"
                :instanceId = "flowTemplateInfo.instanceId"
            >
            </flow-form>

            <el-form ref="flowTemplateInfo" :model="flowTemplateInfo" :rules="flowTemplateInfoRules" label-width="100px" class="free_flow_content">
                <!-- <el-form-item label="添加抄送：">
                    <el-tag
                      v-for="(item,index) in sharedUsers"
                      :key="index"
                      closable
                      :disable-transitions="false"
                      @close="deleteUser(item.nodeId)">
                      {{item.name}}
                    </el-tag>
                    <span class="el-icon-circle-plus " @click="showUserTree = !showUserTree">添加抄送人</span>
                </el-form-item> -->
                <!-- <el-form-item label="附件：">
                  <attach-upload
                    ref="attachUpload"
                    :required = "false"
                    :multiple = "false"
                    :appId="flowTemplateInfo.app"
                    :businessId="flowTemplateInfo.taskId"
                    :categoryId="flowTemplateInfo.businessType"
                    @fileQueued="handleAttachQueued"
                    @uploadError="handleAttachError"
                    @uploadFinished="handleAttachUploadSuccess">
                  </attach-upload>
                </el-form-item> -->
                <!-- <el-form-item label="关联项目：">
                  <el-select v-model="flowTemplateInfo.projectId" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in projectList"
                      :key="index"
                      :label="item.projectName"
                      :value="item.sid">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="选择申请人：">

                  <!--全局组件的使用-->
                  <blend-tree
                      ref= "approverTree"
                      :enable-checked-multiple = "false"
                      :tagButtons="tagButtonsForApprover"
                      :activeTab = "activeTabForApprover"
                      :selectedDataToTree = "selectedDataToTreeForApprover"
                      @getDataFromTree = "getDataFromTreeForApprover">
                      <!--添加按钮图标的插槽-->
                      <div slot="add_button">
                        <i class="el-icon-circle-plus" @click.stop = "$refs.approverTree.blendTreeDialogShow()"></i>
                      </div>
                  </blend-tree>

                  <!-- <el-tag
                      v-if="approver.sid"
                      closable
                      :disable-transitions="false"
                      @close="deleteUserOnly1( approver.sid )">
                      {{approver.name}}
                  </el-tag>
                  <i class="el-icon-circle-plus add_permission" @click = "showUserTreeOnly1 = !showUserTreeOnly1"></i> -->

                </el-form-item>
                <el-form-item label="审批流程：">
                  <el-button type="button" @click="getFlowApproverByTemplateCode"> 获取审批流程 </el-button>
                </el-form-item>
            </el-form>


            <div class="aprrove_step">
                <el-table
                  v-if="instanceStep.length > 0"
                  :data="instanceStep"
                  :span-method="objectSpanMethod"
                  border
                  :show-header="false" 
                  :cell-class-name = "approveColumnAddClass"
                  style="width: 100%; margin-top: 20px">
                  <el-table-column
                    prop="name"
                    label="name"
                    width="120">
                    <template slot-scope="scope">
                        <div class = "step">{{scope.row.name}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="approvalUserName"
                    label="approvalUserName">
                    <template slot-scope="scope">
                        <el-row :gutter="0">
                          <el-col :span="2" class="approve_user_img">
                            <img :src="scope.row.img ? scope.row.img : JZY.c.imgPath+'/logo.png' " />
                          </el-col>
                          <el-col :span="22" class="approve_user_info">
                            <div class="info">
                              <el-row :gutter="0">
                                <el-col :span="3" >
                                  {{scope.row.approvalUserName}}
                                </el-col>
                                <el-col :span="16" >
                                  {{scope.row.postName !='null'? scope.row.postName : ''}}
                                  
                                </el-col>
                                <el-col :span="5" >
                                  {{scope.row.updateDate}}
                                </el-col>
                              </el-row>
                            </div>
                            <div class="info">

                              <!-- <el-row :gutter="0">
                                <el-col :span="19" >
                                  <span :style="{color:scope.row.state === 3 ? 'red':'#409eff' }">{{scope.row.state}} - {{ scope.row.state | state }}</span>
                                </el-col>
                                <el-col :span="5" >
                                  {{scope.row.adminId && '管理员操作'}}
                                </el-col>
                              </el-row> -->
                              
                            </div>
                            <div class="info">
                              {{scope.row.approvalDescription}}
                            </div>
                            <div class="add_user" v-if="scope.row.otherOperate">
                              <el-tooltip effect="dark" :content="scope.row.otherOperate+' | '+scope.row.approvalUserName" :hide-after="0" placement="bottom">
                                  <em>{{scope.row.otherOperate}} | {{scope.row.approvalUserName}}</em>
                              </el-tooltip>
                            </div>
                          </el-col>
                        </el-row>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </div>
      </el-col>
    </el-row>
    <!--选择人员-抄送人-作废-->
    <user-tree
      :selectUserDialogVisible="showUserTree"
      :show-inside-outside-tabs="true"
      :selectedUsers = "sharedUsers"
      @closeCreateModal ="showUserTree = !showUserTree"
      @getUserTree = "getUserTree">
    </user-tree>

    <!--选择人员 单选，审批人选择-作废-->
    <user-tree
      :selectUserDialogVisible="showUserTreeOnly1"
      :enable-checked-multiple = "false"
      :show-inside-outside-tabs="false"
      :selectedUsers = "showUserOnly1"
      @closeCreateModal ="showUserTreeOnly1 = !showUserTreeOnly1"
      @getUserTree = "getUserTreeOnly1">
    </user-tree>
  </div>  
</template>
<script>
  // import '@Main/task/fonts/iconfont.css'
  import flowForm from "@/containers/main/flowForm/client"
  import addLabel from '@Main/approve/components/create/addLabel.vue'
  import {mapGetters} from 'vuex'
  import { showFlowTemplate, showFlowApproverByTemplateCode, } from '@Main/approve/getData'
  //项目接口：数据接口文件
  import { getProjectListById } from '@Main/project/getData'
  // import Vue from 'vue'
  // import Vuex, { Store } from 'vuex';


  // Vue.use(Vuex);

  export default {
    components: {
      flowForm,
      addLabel,
    },
    data() {
      return {
        isAttachUploadFinished:false,//附件上传
        //审批记录合并列
        rowSpan:[],
        row : -1,
        rowNum : -1,
        //审批记录步骤数据
        instanceStep: [],
        // instanceStep: [{
        //     stepId:'002',
        //     name:'审批环节1',
        //     id:'01',
        //     approvalUserName:'1卫忠',
        //     img:'/static/images/logo.png',
        //     postName:'产品部经理',
        //     updateDate:'2018-03-10 12:01:02',
        //     state:3,
        //     approvalDescription:'时间不对，请修改',
        //     otherOperate:'',
        //   },{
        //     stepId:'001',
        //     name:'审批环节2',
        //     id:'02',
        //     approvalUserName:'2赵六',
        //     img:'',
        //     postName:'技术部总监',
        //     updateDate:'2018-03-10 12:01:02',
        //     state:2,
        //     approvalDescription:'安心回家处理事务',
        //     otherOperate:'杨帆加签',
        //   },{
        //     stepId:'001',
        //     name:'审批环节3',
        //     id:'03',
        //     approvalUserName:'3李飞',
        //     img:'',
        //     postName:'技术部经理',
        //     updateDate:'2018-03-10 12:01:02',
        //     state:'3',
        //     approvalDescription:'同意',
        //     otherOperate:'杨帆加签',
        //   },{
        //     stepId:'002',
        //     name:'审批环节4',
        //     id:'01',
        //     approvalUserName:'1卫忠',
        //     img:'',
        //     postName:'产品部经理',
        //     updateDate:'2018-03-10 12:01:02',
        //     state:'3',
        //     approvalDescription:'时间不对，请修改',
        //     otherOperate:'',
        //   },{
        //     stepId:'001',
        //     name:'审批环节5',
        //     id:'02',
        //     approvalUserName:'2赵六',
        //     img:'',
        //     postName:'技术部总监',
        //     updateDate:'2018-03-10 12:01:02',
        //     state:0,
        //     approvalDescription:'安心回家处理事务',
        //     otherOperate:'杨帆加签',
        //   },{
        //     stepId:'001',
        //     name:'审批环节6',
        //     id:'03',
        //     approvalUserName:'3李飞',
        //     img:'',
        //     postName:'技术部经理',
        //     updateDate:'2018-03-10 12:01:02',
        //     state:'2',
        //     approvalDescription:'同意',
        //     otherOperate:'杨帆加签',
        //   }],


        labelDialogVisible:false,//自由流-流程配置

        showUserTree:false,//抄送人弹出窗
        sharedUsers:[],//抄送人

        flowTemplateInfo: {//模板信息
          name:'',//模板名称
          description:'',//模板描述
          startDate:'',//模板创建时间
          code:'',//表单code
          instanceId:'',//流程实例id
          templateId: this.data.code,//模板code
          businessId:'',//业务单据Id
          projectId:'',//关联项目id
          copyUserIds:[],//抄送人
          freeOrTemplate:'T',//流程发起方式：F：自由流 T：模板
        },
        flowTemplateInfoRules: {
          // instanceName: [
          //   { required: true, message: '请输入主题', trigger: 'blur' },
          //   { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          // ],
        },
        projectList:[],//关联项目
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
        approver:{//当前审批人
          sid:'', //id
          name:'' //名称
        },
        showUserTreeOnly1:false,//审批人选择
        showUserOnly1:[],//已选审批人

        //混合树组件2.0-审批人
        selectedDataToTreeForApprover:{//已选树节点
          userList:[],
        },
        tagButtonsForApprover:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTabForApprover:'user',//初始化激活的tab标签

      }
    },
    props: ['data'],
    computed: {
      ...mapGetters({
          session:'session'
      })
    },
    filters:{
        //审批状态:0未审批、1已审批、2后端用的、3驳回、4跳过
        state (value){
            switch (value) {
                case 0:
                    return '未审批';
                case 1:
                    return '已审批';
                case 2:
                    return '后端用';
                case 3:
                    return '驳回';
                case 4:
                    return '跳过';
                default:
                    return '--';
            }
        },
      },
    methods: {
        //初始化
        async initData ( ){
          let res = await showFlowTemplate( this.data.sid,this.data.code )
          console.info("flowTemplateInfo",res[0])
          this.flowTemplateInfo = JZY.u.deepExtend( {} , res[0] )
          

          this.approver = {//当前审批人
            sid:'', //id
            name:'' //名称
          }
          // this.showUserOnly1 = []//已选审批人
          this.selectedDataToTreeForApprover = {//已选树节点
            userList:[],
          }
          this.instanceStep = []
          // this.getFlowApproverByTemplateCode()//动态获取审批记录

          // if (res[0].length > 0) {
          //   this.projectList = [...res[0]]
          // }
          // console.info(this.projectList)
        },
        //动态获取此模板的审批人
        async getFlowApproverByTemplateCode ( ){

          // console.info(this.$store.state.customForm.businessData)
          if (this.flowTemplateInfo.freeOrTemplate == 'F') {//此模板是自由流
                this.$message({
                  type: 'warning',
                  showClose:true,
                  message: '此模板是自由流模板，无法计算审批流程上的审批人！'
                });
          }else{
            //触发表单组件写入businessData值
            let res = await this.$refs.instance.fetchBusinessData();
            
            let businessData = [ ...this.$store.state.customForm.businessData ] //自定义表单中的填项的值
            // businessData.push({
            //   code:'',
            //   name:'',
            //   value:'',
            //   text:'',
            //   type:''
            // })

            // let res = await showFlowApproverByTemplateCode( this.$store.state.session.sid, this.data.code, businessData  )
            if (this.approver.sid) { //审批人id不为空

              let tempArr = []
              this.rowSpan = []
              this.instanceStep = []
              let res = await showFlowApproverByTemplateCode( this.approver.sid, this.data.code, businessData  )
              

              console.info(res)
              console.info("showFlowApproverByTemplateCode",res[0])
              
              let preApproverListLength = 0//上一个审批人列表的长度
              // debugger
              res[0] && res[0].length > 0 && res[0].forEach((item,index)=>{
                  
                  //设置审批记录
                  console.info(index)
                  console.info(item)
                  

                  if (item.approverList.length > 1) {
                    this.rowSpan.push({
                      rowID:tempArr.length,
                      rowNum:item.approverList.length
                    })
                  }


                  item.approverList.length > 0 && item.approverList.forEach((subItem,subIndex)=>{
                    
                      let stepObj = JZY.u.deepExtend( {}, {
                        stepId:index,
                        rowId:preApproverListLength,//行合并用
                        rowSpan:item.approverList.length,//行合并用
                        name:'审批环节' + JZY.u.intToChinese( index + 1) ,
                        acState:item.acState,
                        img:'',//用户头像
                        otherOperate:item.name,
                      } ,subItem )
                      
                      tempArr.push(stepObj)

                  })

                  preApproverListLength += item.approverList.length


                })
                this.instanceStep = [...tempArr]
                console.info("this.instanceStep",this.instanceStep)
            }else{
                this.$message({
                  type: 'warning',
                  message: '请选择申请人！'
                });
            }
          }

        },
        //文件上传-上传中
        handleAttachQueued(){
          // alert('add one new attach file')
          this.isAttachUploadFinished=false
        },
        //文件上传-成功
        handleAttachUploadSuccess(res){
          this.isAttachUploadFinished=true
          console.log('附件上传成功返回信息：',res)
        },
        //文件上传-出错
        handleAttachError(){
          alert('附件上传出错啦')
        },
        //审批记录table行合并方法
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {


          // this.rowSpan.forEach((item1)=>{
          //     if( rowIndex  === item1.rowID ){
          //       this.row = item1.rowID
          //       this.rowNum = item1.rowNum
          //       console.info("___"+this.row)
          //       console.info("_000__"+this.rowNum)
          //     }
          //   })



          if (columnIndex === 0) {
            console.info(rowIndex)


            if( rowIndex  === row.rowId ){

              this.row = row.rowId
              this.rowNum = row.rowSpan
              console.info("___"+this.row)
              console.info("_000__"+this.rowNum)
            }
                        

            if (rowIndex  === this.row) {
              console.info("rowIndex")
              return {
                rowspan: this.rowNum,
                colspan: 1
              };
            } else if( rowIndex > this.row && rowIndex < (this.row+this.rowNum ) ){
              console.info("被上面合并的行"+rowIndex)
                return {
                rowspan: 0,
                colspan: 0
              };
            } else {
              console.info("没合并的行"+rowIndex)
              return {
                rowspan: 1,
                colspan: 1
              };
            }



          // for (var i = this.rowSpan.length - 1; i >= 0; i--) {
            
          //   if( rowIndex  === this.rowSpan[i]['rowID'] ){
          //       this.row = this.rowSpan[i]['rowID']
          //       this.rowNum = this.rowSpan[i]['rowNum']
          //       console.info("___"+this.row)
          //       console.info("_000__"+this.rowNum)
          //       break;
          //     }

          // }


            
              // debugger
              // if (rowIndex  === this.row) {
              //   console.info("rowIndex")
              //   return {
              //     rowspan: this.rowNum,
              //     colspan: 1
              //   };
              // } else if( rowIndex > this.row && rowIndex < (this.row+this.rowNum ) ){
              //   console.info("被上面合并的行"+rowIndex)
              //     return [0,0];
              // } else {
              //   console.info("没合并的行"+rowIndex)
              //   return {
              //     rowspan: 1,
              //     colspan: 1
              //   };
              // }
                  // if (rowIndex  == this.rowID) {
                  //     return [this.rowNum,1];
                  // } else if(rowIndex >this.rowID && rowIndex <(this.rowID+this.rowNum)){
                  //     return [0,0];
                  // }else {
                  //     return [1,1];
                  // }
              if ( rowIndex == this.instanceStep.length - 1 ) {
                // alert(4)
                return ;
              }
            
          }

          
        },
        //审批记录的table中的第二列添加class
        approveColumnAddClass({ row, column, rowIndex, columnIndex }) {
          if(columnIndex === 1){
            return 'secondColumn';
          }
        },
        openChangeInstanceApprover(){

        },
        //删除抄送人tag的事件
        deleteUser(nodeId) {
          this.sharedUsers = this.sharedUsers.filter(function(item) {
            return item.nodeId != nodeId;
          });

          this.flowTemplateInfo.copyUserIds.splice(this.flowTemplateInfo.copyUserIds.indexOf(nodeId), 1)

        },
        //接收用户树返回的数据：抄送人
        getUserTree:function(arr){
          this.sharedUsers = [...arr]
          this.flowTemplateInfo.copyUserIds = []

          this.sharedUsers.forEach((item)=>{
            this.flowTemplateInfo.copyUserIds.push(item.sid)
          })
        },
        //删除审批人tag的事件-作废
        deleteUserOnly1(nodeId) {
            this.showUserOnly1 = this.showUserOnly1.filter(function(item) {
              return item.sid != nodeId;
            });

            this.approver = {
              sid:'',
              name:''
            }

        },
        //审批人，选择用户树组件的返回值-作废
        getUserTreeOnly1:function(arr){
            this.showUserOnly1 = [...arr]
            this.approver = {
              sid:this.showUserOnly1[0].sid,
              name:this.showUserOnly1[0].name,
            }
        },
        //接收混合树组件的返回值
        getDataFromTreeForApprover( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          // debugger
          if (obj.userList.length > 0 ) {
              this.approver = {
                sid:obj.userList[0].sid,
                name:obj.userList[0].name,
              }
          }else{
              this.approver = {
                sid:'',
                name:''
              }
          }
          
        },
        //根据人员id获取项目list
        async getlistProjectListById ( sid = '' ){
          let res = await getProjectListById( sid )
          console.info(res[0])
          if (res[0].length > 0) {
            this.projectList = [...res[0]]
          }
          console.info(this.projectList)
        },
        
    },
    mounted(){
        //从vuxe里获取当前登陆人的sid
        this.initData( )
        console.info(this.data,'this.data')
        console.info(this.$store.state.customForm)

    },
    watch:{
      //审批模板详情
      'data':{
    　　　　handler(newValue, oldValue) {
                console.info("data")
                
                this.initData( )
    　　　　},
    　　　　deep: true
    　　},
    },
  }
</script>
<style lang="scss">
.approve.show_approve{
  .free_flow_info{
    .el-form-item{
      margin-bottom: 12px;
    }
  }
  .el-form{
      .el-form-item{
          // margin-bottom: 12px;
          .el-form-item__label{
              width: 100px;
          }
          .el-form-item__content{
              .el-input{
                  // width: calc(100% - 120px);
              }
          }
          .el-tag{
            margin-left:10px;
            margin-right:10px;
          }
      }
  }
}
</style>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.show_approve{
    .free_flow_info{

    }
    .detail_content{
        padding: 0px 30px;
        background-color: #fff;
        .title{
            text-align: center;
            font-size: 16px;
        }
        .free_flow_content{
            padding: 30px 0px 20px;
            margin-top:15px;
            border-top:1px solid $borderColor;
            // .add_approver{
            //   color: #67C23A;
            //   margin-left:15px;
            //   font-size:18px;
            //   &:hover{
            //     cursor:pointer;
            //   }
            // }
        }
        .aprrove_step{
          .step{
            // width:20px;
            text-align:center;
            line-height:20px;
            margin:0 auto;
          }
          .approve_user_img{
            text-align:center;
            img{
              width:35px;
              height:35px;
              margin-top:13px;
              border-radius: 50%;
              border: 1px solid $borderColor;
            }
          }
          .approve_user_info{
            margin-top:16px;
            padding-left:16px;
            .info{
              line-height:30px;
              .el-col{
                color: #ccc;
                &:first-child{
                  color: $color;
                }
              }
              
            }
            .add_user{
              width:auto;
              height:24px;
              max-width:100px;
              position:absolute;
              right: -10px;
              bottom:0px;
              color: #fff;
              font-size:12px;
              line-height:24px;
              padding:0px 5px;
              background-color:$blueColor;
              overflow:hidden;
              white-space:nowrap;
              text-overflow: ellipsis;
            }
          }
        }
    }
}
</style>