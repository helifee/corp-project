<template>
  <div class="approve approve_wrap detail">
    <!--页头-->
    <el-row class="row-bg title" justify="space-between">
      <el-col :span="8" class="text_left">
          <span class="approve_name">{{form.templateName}}</span>
      </el-col>
      <el-col :span="16" class="text_right">
          <!--操作前的部分按钮-->
          <el-button size="small" v-for="(item,index) in form.leftButtonList" :key="index" @click="operateFun(item)" :class = "{'red_color': index === 1 }">{{l('{approveLocale.details_buttons}')[item]}}</el-button>
          <!--操作功能-->
          <el-dropdown @command="doSelectedCommand">
            <el-button type="primary"  size = "small" >
              {{l('{approveLocale.details_operate.name}')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index1) of form.operateButtonList" :command="item" :key="index1">
                {{l('{approveLocale.details_operate.childrens}')[item]}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--返回按钮-->
          <el-button size="small" @click="goback">{{l('{approveLocale.details_operate.goback}')}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="bottom_border"></el-col>
    </el-row>
    <!-- <el-row class="operate_buttons">
        <el-col :span="8" class="title">
          {{form.templateName}}
        </el-col>
        <el-col :span="15" style="text-align:right">
          
            <el-button v-for="(item,index) in form.leftButtonList" :key="index" @click="operateFun(item)" :class="{ red_color: index===1 }">{{l('{approveLocale.details_buttons}')[item]}}</el-button>
          
            <el-dropdown @command="doSelectedCommand">
              <el-button type="default" >
                {{l('{approveLocale.details_operate.name}')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index1) of form.operateButtonList" :command="item" :key="index1">
                  {{l('{approveLocale.details_operate.childrens}')[item]}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          
            <el-button @click="goback">{{l('{approveLocale.details_operate.goback}')}}</el-button>
        </el-col>
    </el-row> -->
    <!--表单项-->
    <div class="detail_content">
        <!-- <div class="title">{{approveType}}</div> -->
        <el-form ref="form" :rules="detailRules" label-position="right" label-width="100px" class="detail_form">
            <el-form-item label="申请流程：">
                <span v-text="form.templateName"></span>
            </el-form-item>
            <el-form-item label="流程说明：">
                <span v-text="form.description"></span>
            </el-form-item>
            <!-- <el-row :gutter="0">
              <el-col :span="24"><div class="line"></div></el-col>
            </el-row> -->
            <el-form-item label="审批状态：">
                <span>{{ form.state | acstate }}</span>
            </el-form-item>
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="申请人：">
                        <span v-text="form.createPersonName"></span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门：">
                        <span v-text="form.dept"></span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请时间：">
                        <span v-text="form.createDate"></span>
                    </el-form-item>
                </el-col>
            </el-row>

            <!--表单部分 start-->
            <flow-form
                v-if="form.businessId"
                ref="draft"
                :formMode="formMode"
                :flowTemplateCode = "form.templateId"
                :businessId = "form.businessId"
                :instanceId = "form.instanceId"
                :customFormId = "form.customFormId"
                @cb-flow-form-instance-saved="cbFlowFormInstanceSaved"
                style="margin-bottom: 32px;"
            >
            </flow-form>
            
            <el-form-item label="抄送人：">
                <span v-for="(user,index) of form.copyUserInfoList" :key="index" v-text="user.name" class="shared_user"></span>
            </el-form-item>
            <el-form-item label="附件：">
              <attach-upload
                ref="attachUpload"
                v-if="form.attachmentId"
                :required="false"
                :readonly="true"
                :appId="form.appId"
                :businessId="form.attachmentId"
                :categoryId="form.attachmentCategoryId">
              </attach-upload>
                <!-- <span v-text="form.attachmentId"></span> -->
            </el-form-item>
            <el-form-item label="关联项目：">
              <span v-text="form.projectName || form.projectId"></span>
            </el-form-item>

            <el-row :gutter="0">
              <el-col :span="24"><div class="line"></div></el-col>
            </el-row>
            <div class="title">审批进度：</div>
            <div class="aprrove_step">
                <el-table
                  :data="form.instanceStep"
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
                            <img :src="scope.row.approvalUserPhoto ? scope.row.approvalUserPhoto : JZY.c.imgPath+'/logo.png' " />
                          </el-col>
                          <el-col :span="20" class="approve_user_info">
                            <div class="info">
                              <el-row :gutter="0">
                                <el-col :span="3" >
                                  {{scope.row.approvalUserName}}
                                </el-col>
                                <el-col :span="16" >
                                  {{ scope.row.postName == null ? ' &nbsp;':scope.row.postName }}
                                  <span v-if="fromPage == 'flowManage' && form.admin && scope.row.acState == 1 && scope.row.state == 0" style="margin-left:30px;color:blue;cursor: pointer;" @click.stop = "openChangeInstanceApprover( scope.row.approvalId , scope.row.instanceAcId , scope.row.approvalUser )">
                                    修改审批人
                                  </span>
                                </el-col>
                                <el-col :span="5" >
                                  {{scope.row.updateDate}}
                                </el-col>
                              </el-row>
                            </div>
                            <div class="info">

                              <el-row :gutter="0">
                                <el-col :span="19" >
                                  <span :style="{color:scope.row.state === 3 ? 'red':'#409eff' }">{{ scope.row.state | state }}</span>
                                </el-col>
                                <el-col :span="5" >
                                  {{scope.row.adminId && ('管理员'+scope.row.adminId+'操作') }}
                                </el-col>
                              </el-row>
                              
                            </div>
                            <div class="info2">
                              {{scope.row.approvalDescription}}
                            </div>
                            <!--自由流不显示下面内容，错；5.31放开控制，产品、测试确认过的-->
                            <div class="add_user" v-if="scope.row.otherOperate ">
                              <el-tooltip effect="dark" :content="scope.row.otherOperate" :hide-after="0" placement="bottom">
                                  <em>{{scope.row.otherOperate}}</em>
                              </el-tooltip>
                            </div>
                          </el-col>
                        </el-row>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </el-form>
    </div>
    <!--弹出窗:通过-->
    <el-dialog title="审批处理" :visible.sync="passDialog.visible" class="pass_dialog">
      <el-form :rules="passDialogRules" :model="passDialog" ref="passDialog" label-width="100px">
        <el-form-item label="审批意见：">
          <el-tag>通过</el-tag>
        </el-form-item>
        <el-form-item label="意见说明：" prop="desc">
          <el-input v-model="passDialog.desc" v-textarea-limiter type="textarea" :maxlength="201" :rows="5" :placeholder="l('{approveLocale.approve.detail.dialog.textareaPlaceholder}')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="setInstancePass">确 定</el-button>
      </div>
    </el-dialog>
    <!--弹出窗:驳回-->
    <el-dialog :title="rejectDialog.title" :visible.sync="rejectDialog.visible" class="reject_dialog">
      <el-form :rules="rejectDialogRules" :model="rejectDialog" ref="rejectDialog" label-width="100px">
        <el-form-item label="审批意见：">
          <el-tag type="danger">{{l('{approveLocale.approve.detail.rejectType}')[rejectDialog.type]}}</el-tag>
        </el-form-item>
        <el-form-item label="回退到：" prop="goback">
          <div >
            <el-radio v-model="rejectDialog.goback" :label="2">申请人</el-radio>
            <span class="goback">{{form.createPersonName}}</span>
          </div>
          <div >
            <el-radio v-model="rejectDialog.goback" :label="1">上一级</el-radio>
            <!-- <span class="goback">王五</span> -->
          </div>
        </el-form-item>
        <el-form-item label="意见说明：" prop="desc">
          <el-input v-model="rejectDialog.desc" v-textarea-limiter type="textarea" :maxlength="101" :rows="5" :placeholder="l('{approveLocale.approve.detail.dialog.textareaPlaceholder}')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rejectDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="setInstanceReject">确 定</el-button>
      </div>
    </el-dialog>
    <!--弹出窗:前加签-->
    <add-label
      v-if="addLabelData.visible"
      :instanceId = "form.instanceId"
      :instanceAcId = "form.instanceAcId"
      :infoData = "addLabelData"
      :approvalUser= "form.approvalUser"
      @reflashInstanceInfo="instanceInfo"
      @goback="$router.go(-1)"
      position="xx"
    >
    </add-label>


    <!--抄送人员多选-选择-->
    <blend-tree
        ref= "ccUserTree"
        :tagButtons="tagButtonsForCcUser"
        :activeTab = "activeTabForCcUser"
        :resultDataListShow = "false"
        :selectedDataToTree = "selectedDataToTreeForCcUser"
        @getDataFromTree = "getDataFromTreeForCcUser">
    </blend-tree>
    <!--修改审批人单选-选择-->
    <blend-tree
        ref= "changeApproverTree"
        :enable-checked-multiple = "false"
        :tagButtons="tagButtonsForChangeApprover"
        :activeTab = "activeTabForChangeApprover"
        :resultDataListShow = "false"
        :selectedDataToTree = "selectedDataToTreeForChangeApprover"
        @getDataFromTree = "getDataFromTreeForChangeApprover">
    </blend-tree>



    <!--选择抄送人-作废-->
    <user-tree
        :selectUserDialogVisible="showUserTreeOnly"
        :selectedUsers = "showUserOnly"
        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
        @getUserTree = "getUserTreeOnly">
    </user-tree>
    <!--选择修改审批人 单选-作废-->
    <user-tree
        :selectUserDialogVisible="showUserTreeOnly1"
        :enable-checked-multiple = "false"
        :selectedUsers = "showUserOnly1"
        @closeCreateModal ="showUserTreeOnly1 = !showUserTreeOnly1"
        @getUserTree = "getUserTreeOnly1">
    </user-tree>
    <!--流程编辑，右侧弹窗-->
    <approve-edit
        v-if="editDialogVisible"
        :dialogVisible = "editDialogVisible"
        :approveEditInfo = "form"
        @closeEditModal="changeEditDialogVisible">
    </approve-edit>

</div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  JZY.locale.add("approveLocale", require("../approve.locale"));
  import addLabel from '@Main/approve/components/detail/addLabel.vue'
  
  import flowForm from "@/containers/main/flowForm/client"

  import approveEdit from '@Main/approve/components/approve.edit.vue'

  //数据接口文件
  import { getInstanceInfo, setInstanceWithdraw, setInstancePass, setInstanceReject, setInstanceCc, setInstanceFollow, setInstanceDelete, setInstanceRefer, draftSave, setInstanceSkip, deleteInstance, updateInstanceStatus, changeInstanceApprover, getAlreadyCopy, } from '@Main/approve/getData'

  //项目接口：根据项目id获取项目名称
  import { getProjectDetailForProject } from "@Main/project/getData";

  export default {
    components: {
      addLabel,
      flowForm,
      approveEdit,
    },
    data() {
      return {
        pageButtons:[],//页头右侧的按钮数组
        operateButtons:[],//操作里的功能项

        approveName: '办公用品领用申请',
        fromPage: '',
        approveType: '',


        activeTabSessionForMy: 0,//缓存url中我的审批my的tab状态

        // rowID:0,//计算出table从第几行开始合并行
        // rowNum:2,//计算此位置需合并几行
        // rowSpan:[{
        //   rowID:0,
        //   rowNum:2
        // },{
        //   rowID:3,
        //   rowNum:2
        // }],
        rowSpan:[],
        row : -1,
        rowNum : -1,


        selectUserDialogVisible:false,//组织架构弹出窗

        editDialogVisible:false,//流程编辑，右侧弹出窗

        form: {
          instanceId:this.$route.params.id,//流程id
          businessId:'',//表单id
          templateId:'',//模板id
          freeOrTemplate:'F',//模板类型，F自由流，T固定流

          leftButtonList:[],//操作权限按钮左侧的按钮
          operateButtonList:[],//操作权限按钮
          buttonList:[],//后端返回的权限按钮，全部

          createPersonName:'',
          dept:'',
          createDate:'',
          templateName:'',//流程名称

          customFormId:'',//流程表单
          description:'',
          state:0,
          //表单部分

          copyUserIds:[],//抄送人
          copyUserInfoList:[],//抄送人详情，带name
          attachmentId:'',//附件id

          instanceAcId:'',//当前环节id
          approvalUser:{},//当前环节审批人

          admin:false,//是否管理员-显示修改审批人

          projectId:'',//项目id
          projectName:'',//项目名称

          instanceStep:[],
          // instanceStep: [{
          //   stepId:'002',
          //   name:'审批环节1',
          //   id:'01',
          //   approvalUserName:'1卫忠',
          //   img:'/static/images/logo.png',
          //   postName:'产品部经理',
          //   updateDate:'2018-03-10 12:01:02',
          //   state:3,
          //   approvalDescription:'时间不对，请修改',
          //   otherOperate:'',
          // },{
          //   stepId:'001',
          //   name:'审批环节2',
          //   id:'02',
          //   approvalUserName:'2赵六',
          //   img:'',
          //   postName:'技术部总监',
          //   updateDate:'2018-03-10 12:01:02',
          //   state:2,
          //   approvalDescription:'安心回家处理事务',
          //   otherOperate:'杨帆加签',
          // },{
          //   stepId:'001',
          //   name:'审批环节3',
          //   id:'03',
          //   approvalUserName:'3李飞',
          //   img:'',
          //   postName:'技术部经理',
          //   updateDate:'2018-03-10 12:01:02',
          //   state:'3',
          //   approvalDescription:'同意',
          //   otherOperate:'杨帆加签',
          // },{
          //   stepId:'002',
          //   name:'审批环节4',
          //   id:'01',
          //   approvalUserName:'1卫忠',
          //   img:'',
          //   postName:'产品部经理',
          //   updateDate:'2018-03-10 12:01:02',
          //   state:'3',
          //   approvalDescription:'时间不对，请修改',
          //   otherOperate:'',
          // },{
          //   stepId:'001',
          //   name:'审批环节5',
          //   id:'02',
          //   approvalUserName:'2赵六',
          //   img:'',
          //   postName:'技术部总监',
          //   updateDate:'2018-03-10 12:01:02',
          //   state:0,
          //   approvalDescription:'安心回家处理事务',
          //   otherOperate:'杨帆加签',
          // },{
          //   stepId:'001',
          //   name:'审批环节6',
          //   id:'03',
          //   approvalUserName:'3李飞',
          //   img:'',
          //   postName:'技术部经理',
          //   updateDate:'2018-03-10 12:01:02',
          //   state:'2',
          //   approvalDescription:'同意',
          //   otherOperate:'杨帆加签',
          // }],
        },
        detailRules:{
          // leaveType: [
          //   { required: true, message: '请选择请假类型', trigger: 'blur' }
          // ],
          // instanceName: [
          //   { required: true, message: '请输入主题', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
          // betweenTime: [
          //   { required: true, message: '请选择请假时间段', trigger: 'blur' }
          // ],
          // leaveDesc: [
          //   { required: true, message: '请输入请假事由', trigger: 'blur' }
          // ],
        },
        passDialog:{//审批通过
          visible: false,
          desc:'',
        },
        passDialogRules:{
          desc: [
            { required: false, message: '请输入审批意见说明', trigger: 'blur' },
            { max: 200, message: '请输入不超过 200 个字符', trigger: 'blur' },
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
          ],
        },
        fromPage:'',//是否是流程管理页面
        addLabelData:{ //前后加签、会签
          visible: false,
          title:'',//页面标题
          detailDesc:'',//页面提醒
          signType:'',//加签方式，前加签、后加签
        },
        rejectDialog:{//审批驳回、退回
          visible: false,
          title:'',//页面标题
          type:0,//0驳回，1退回
          goback:1,//1:驳回上一级,2:驳回到发起人,3:退回上一级,4:退回到发起人
          desc:'',
        },
        rejectDialogRules:{
          goback: [
            { required: true, message: '请选择', trigger: 'change' },
          ],
          desc: [
            { required: true, message: '请输入审批意见说明', trigger: 'blur' },
            { max: 100, message: '请输入不超过 100 个字符', trigger: 'blur' },
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
          ],
        },
        /*1棵树*/
        showUserTreeOnly:false,
        showUserOnly:[],//已选抄送人
        /*另一1棵树 单选*/
        showUserTreeOnly1:false,
        showUserOnly1:[],//已选抄送人
        adminChangedApprovalId:'',//缓存当前管理员修改的"审批id"
        adminChangedInstanceAcId:'',//缓存当前管理员修改的"审批环节id"
        adminChangedApprovalUser:'',//缓存当前管理员修改的"审批人的id"

        isAttachUploadFinished:false,//附件上传

        allowFrontAddLabel:true,//是否允许前加签

        operateType: '0',//state是否为3驳回，6退回，7驳回已处理，8退回已处理，则为新增，1；否则不处理0
        formMode:'draft',//自定义表单模式

        //抄送 混合树组件
        selectedDataToTreeForCcUser:{//已选树节点
          userList:[],
          userOutsideList:[]
        },
        tagButtonsForCcUser:['user','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTabForCcUser:'user',//初始化激活的tab标签

        //修改审批人 混合树组件
        selectedDataToTreeForChangeApprover:{//已选树节点
          userList:[],
          userOutsideList:[]
        },
        tagButtonsForChangeApprover:['user','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTabForChangeApprover:'user',//初始化激活的tab标签

      }
      
    },
    created(){
        this.initData();
    },
    // props: ['approveInfo'],
    computed:{
    },
    filters:{
        //审批状态（审批记录里用）:0未审批、1已审批、2后端用的、3驳回、4跳过
        state (value){
            switch (value) {
                case 0:
                    return '未审批';
                case 1:
                    return '已审批';
                case 2:
                    return '';//加签？后端用
                case 3:
                    return '驳回';
                case 4:
                    return '跳过';
                case 5:
                    return '退回'; //5.31：zcy发cc消息要求添加此状态
                default:
                    return '-'+value+'-';
            }
        },
        //废弃，05月11日改，审批环节的状态（审批记录中调用）:1审批中、2已完成、3驳回、4跳过
        // acstate (value){
        //     switch (value) {
        //         case 0:
        //             return 'xxxx';
        //         case 1:
        //             return '审批中';
        //         case 2:
        //             return '已完成';
        //         case 3:
        //             return '驳回';
        //         case 4:
        //             return '跳过';
        //         default:
        //             return '--';
        //     }
        // },
        //审批流程的状态（对应于外部list列表的状态）
        acstate (value){
            switch (value) {
                case 0:
                    return 'xxxx';
                case 1:
                    return '审批中';
                case 2:
                    return '已审批';
                case 3:
                    return '驳回';
                case 4:
                    return '草稿';
                case 5:
                    return '跳过';
                case 6:
                    return '退回';
                case 7:
                    return '驳回';//驳回已处理
                case 8:
                    return '退回';//退回已处理
                default:
                    return '-'+value+'-';
            }
        },
    },
    methods: {
        //初始化获取数据
        initData(){
            //获取从页面传递过来的参数
            this.form.instanceId = this.$route.params.id
            this.approveName = this.$route.params.type
            this.fromPage = this.$route.params.fromPage
        },
        //获取流程详情
        async instanceInfo(){
            const params = {
              instanceId:this.form.instanceId,
              // manager:this.fromPage=='flowManage',
              readOnly:this.fromPage==='project'?'1':'0',//如果从项目里打开审批详情页，此值为1
              terminalType:'web',
              monitor:this.fromPage=='flowManage',
            }
            let res = await getInstanceInfo(params)
            this.form = JZY.u.deepExtend( {} , this.form, res[0] )
            console.info(this.form)

            //循环设置操作按钮数组和其右侧的按钮数组
            let leftButtonTemp = ['pass','skip','reject','untread']  //右侧可能出现的按钮
            this.form.leftButtonList = []
            this.form.operateButtonList = []
            res[0].buttonList && res[0].buttonList.forEach((item)=>{
              if (leftButtonTemp.includes(item)) {
                this.form.leftButtonList.push(item)
              }else{
                this.form.operateButtonList.push(item)
              }
            })
            //审批详情页的操作按钮里不包括saveForm:保存功能
            if (this.form.operateButtonList.indexOf('saveForm') !== -1) {
              this.form.operateButtonList.splice(this.form.operateButtonList.indexOf('saveForm'), 1);
            }

            //处理state是否为3驳回，6退回，7驳回已处理，8退回已处理，如果是，则调用表单的rePreview模式，类似于新流程的发起
            if (this.form.state == 3 || this.form.state == 6 || this.form.state == 7 || this.form.state == 8 ) {

                this.operateType = '1'  //计算为新增，1
                this.formMode = 'rePreview'

            }


            this.form.instanceStep = []
            //设置当前页面的环节id
            let instanceAcIdTmep = []  //临时存储所有符合条件的流程实例id

            res[0].approvalRecordList && res[0].approvalRecordList.length > 0 && res[0].approvalRecordList.forEach((item,index)=>{

              
              //设置审批记录
              console.info(index)
              console.info(item)
              
              console.info("item.approverList",item.approverList)

              if (item.approverList.length > 1) {
                this.rowSpan.push({
                  rowID:this.form.instanceStep.length,
                  rowNum:item.approverList.length
                })
              }

              if ( item.approverList.length > 0 ) {//审批环节不为空
                item.approverList.forEach((subItem,subIndex)=>{

                  //设置当前页面的环节id
                  if(item.acState == 1 && item.delflag == 0){


                    //判断是否可以前加签
                    if(subItem.state !== 0){//未审批0
                      this.allowFrontAddLabel = false
                    }



                    this.form.instanceAcId = item.flowInstanceAcId  //作废，如果是管理员，保留
                    if( subItem.approvalUser == this.$store.state.session.sid ){
                        instanceAcIdTmep.push( item.flowInstanceAcId )
                    }
                    //当前环节的审批人
                    this.form.approvalUser = {
                      name:item.approverList[0]['approvalUserName'],
                      dept:item.approverList[0]['postName']
                    }

                  }
                  console.info(subItem.approvalUser)
                  console.info(this.$store.state.session.sid)
                

                  let stepObj = JZY.u.deepExtend( {}, {
                    stepId:index,
                    name:'审批环节' + JZY.u.intToChinese( res[0].approvalRecordList.length - index ) ,
                    acState:item.acState,
                    img:'',//用户头像
                    otherOperate:item.acCreatePerson ? (item.name + ' | ' + item.acCreatePerson):'',
                    instanceAcId:item.flowInstanceAcId,
                    type:2,//type 是修改审批人的时候传2   如果当前审批记录里面  环节对应的审批人位空 type 为1 
                  } ,subItem )
                  
                  this.form.instanceStep.push(stepObj)

                })
              }else{//审批环节不为空，压入默认值，为了管理员可以修改审批人
                  let stepObj = {
                    stepId:index,
                    name:'审批环节' + JZY.u.intToChinese( res[0].approvalRecordList.length ) ,
                    acState:item.acState,
                    img:'',//用户头像
                    otherOperate:item.acCreatePerson ? (item.name + ' | ' + item.acCreatePerson):'',

                    type:item.type,
                    instanceAcId:item.flowInstanceAcId,
                    state:0,
                    approvalUserPhoto:'',
                    approvalUserName:'--- / ---',
                    postName:'',
                    approvalId:'',
                    updateDate:'',
                    approvalDescription:'',
                    adminId:''

                  }
                  
                  this.form.instanceStep.push(stepObj)
              }


            })
            console.info("this.form.instanceStep",this.form.instanceStep)

            
            //设置当前页面的环节id，不能为空
            
            if( instanceAcIdTmep.length > 0 ){
                this.form.instanceAcId = instanceAcIdTmep[0]
            }else if(this.form.admin){//管理员
                // this.form.instanceAcId = this.form.instanceAcId
            }else{//整个流程已审批完成
                // this.$message('当前环节id获取错误，服务器错误！')
            }

            console.info("this.form.instanceAcId",instanceAcIdTmep)
            console.info("this.form.instanceAcId",this.form.instanceAcId)

            //根据项目id获取项目名称
            if(this.form.projectId !='' && this.form.projectId != null ){
              let projectObj = await getProjectDetailForProject( this.form.projectId )
              
              console.info("projectObj",projectObj[0])
              this.form.projectName = projectObj[0].projectName
            }
            
        },

        //右侧弹出页面顶部的功能按钮事件
        operateFun(operateType) {
          console.info(operateType)
            switch(operateType){
              case 'pass'://通过
                  this.passDialog.visible = true;
                  break;
              case 'reject'://驳回
                  this.rejectDialog.visible = true
                  this.rejectDialog.title = '审批处理'
                  this.rejectDialog.type = 0
                  break;
              case 'skip'://跳过，流程管理
                  this.$confirm('您确认将跳过该环节?', '提示', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.setInstanceSkip()
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
                  break;
              case 'untread'://退回，流程管理
                  this.rejectDialog.title = '退回'
                  this.rejectDialog.visible = true
                  this.rejectDialog.type = 1
                  break;
              default:
                  this.$message('1错误');
            }
        },
        //操作流程的事件
        doSelectedCommand(command) {
          console.info(command)
            switch(command){
                case 'withdraw':
                    // this.$message("撤回")
                    this.setInstanceWithdraw()
                    break;
                // case 'pass':
                //     this.$message("通过")
                //     this.setInstancePass()
                //     break;
                // case 'reject':
                //     this.$message("驳回")
                //     this.setInstanceReject()
                //     break;
                case 'front_add_label':
                    // this.$message("前加签")

                    if (this.allowFrontAddLabel) {  //false不允许前加签
                      this.setInstanceFrontAddLabel()
                    }else{
                      this.$message({
                        type: 'warning',
                        message: '此流程不允许进行前加签操作！'
                      });
                    }
                    
                    break;
                case 'after_add_label':
                    // this.$message("后加签")
                    this.setInstanceAfterAddLabel()
                    break;
                case 'cc':
                    // this.$message("抄送")
                    //获取已抄送的人员列表
                    // this.getAlreadyCopy( )

                    // this.showUserTreeOnly = true

                    this.$refs.ccUserTree.blendTreeDialogShow()
                    // this.setInstanceCc()
                    break;
                case 'follow':
                    // this.$message("关注")
                    this.setInstanceFollow(1)
                    break;
                case 'unfollow':
                    // this.$message("取消关注")
                    this.setInstanceFollow(2)
                    break;
                case 'deleteForm':
                    // this.$message("删除")
                    this.setInstanceDelete()
                    break;
                case 'editorForm':
                    // this.$message("编辑")
                    this.setInstanceEdit()
                    break;
                case 'submitForm':
                    // this.$message("提交")
                    this.setInstanceRefer()
                    break;
                default:
                    alert(command)
            }
        },
        //审批撤回
        async setInstanceWithdraw( desc = '' ){
            let res = await setInstanceWithdraw( this.form.instanceId , desc )
            console.info(res)
            this.instanceInfo()//获取审批详情
        },
        //审批通过，desc描述
        async setInstancePass( ){
            this.$refs.passDialog.validate(async (valid) => {
                if (valid) {
                  try{
                      let res = await setInstancePass( this.form.instanceId , this.passDialog.desc )

                      console.info(res[0])
                      this.$refs.passDialog.resetFields()//置空表单项
                      this.passDialog.visible = false //关闭审批通过的弹出窗

                      this.$router.go(-1)
                      // this.instanceInfo()//获取审批详情
                      
                  }catch(err){
                    console.log(err)
                  }
                } else {
                  // this.$notify.error({
                  //   title: '错误',
                  //   message: '请检查输入是否正确',
                  //   offset: 100
                  // });
                  return false;
                }
            });
        },
        //审批0驳回、1退回
        async setInstanceReject( ){

            this.$refs.rejectDialog.validate(async (valid) => {
                if (valid) {
                  let state = this.rejectDialog.type === 0 ? this.rejectDialog.goback : (this.rejectDialog.goback + 2) //退回到哪里

                  //let rejectType = this.rejectDialog.type //驳回0，退回1

                  try{
                    let res = await setInstanceReject( this.form.instanceId , this.form.instanceAcId , state ,this.rejectDialog.desc ,this.rejectDialog.type)

                      console.info(res[0])
                      this.$refs.rejectDialog.resetFields()//置空表单项
                      this.rejectDialog.visible = false //关闭审批驳回的弹出窗

                      this.$router.go(-1)
                      // this.instanceInfo()//获取审批详情
                      
                  }catch(err){
                    console.log(err)
                  }
                } else {
                  // this.$notify.error({
                  //   title: '错误',
                  //   message: '请检查输入是否正确',
                  //   offset: 100
                  // });
                  return false;
                }
            });

            
            
            
        },
        //前加签，instanceAcId：实例环节Id
        async setInstanceFrontAddLabel( name = '' , approvalType ='' , userIds = [] ){
          this.addLabelData = JZY.u.deepExtend ( {} , this.addLabelData ,{
              visible:true,
              title:'前加签',
              detailDesc:'前加签是指新增审批环节位于当前审批节点之前',
              // position:'',
              signType:'before'
            })
        },
        //后加签，instanceAcId：实例环节Id
        async setInstanceAfterAddLabel( name = '' , approvalType ='' , userIds = [] ){
          this.addLabelData = JZY.u.deepExtend ( {} , this.addLabelData ,{
              visible:true,
              title:'后加签',
              detailDesc:'后加签是指新增审批环节位于当前审批节点之后',
              // position:'',
              signType:'after'
            })
        },
        //获取当前实例已抄送的人员列表-作废
        async getAlreadyCopy( ){
            let res = await getAlreadyCopy( this.form.instanceId )
            console.info("getAlreadyCopy",res[0])
        },
        //抄送
        async setInstanceCc( copyUserIds = [] ){
            let res = await setInstanceCc( this.form.instanceId , copyUserIds )
            console.info(res[0])
            // this.showUserTreeOnly = false
            this.$message({
              type: 'success',
              message: '抄送成功'
            });

            this.instanceInfo()//获取审批详情
        },
        //关注，isFollow:1关注，0/2取消关注
        async setInstanceFollow( isFollow = 1 ){
            let res = await setInstanceFollow( this.form.instanceId , isFollow )
            if (isFollow == 1) {
              this.$message({
                type: 'success',
                message: '成功关注'
              }); 
            }else{
              this.$message({
                type: 'success',
                message: '成功取消关注'
              });
            }
            this.instanceInfo()//获取审批详情
            // console.info(res[0])
        },
        //删除
        async setInstanceDelete( ){
            let res = await setInstanceDelete( this.form.instanceId ,true)
            console.info(res)
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.goback()//返回上一页
        },
        //跳过
        async setInstanceSkip(){
            let res = await setInstanceSkip( this.form.instanceId )
            console.info(res)
            this.$message({
                type: 'success',
                message: '成功跳过!'
            });
            this.goback()//返回上一页
            // this.instanceInfo()//获取审批详情
        },
        //返回
        goback (){
          if ( this.fromPage == 'my') {//我的审批，缓存tab状态
              this.$router.push({
                path:'/approve/my?tab='+this.activeTabSessionForMy
              })

          }else{
              this.$router.go(-1);
          }
            
        },
        //修改审批人弹出窗-管理员操作
        openChangeInstanceApprover(  approvalId = '' ,instanceAcId = '', approvalUser = '' ){
            // this.showUserTreeOnly1 = true //调用人员选择的组件，单选
            this.adminChangedApprovalId = approvalId
            this.adminChangedInstanceAcId = instanceAcId
            this.adminChangedApprovalUser = approvalUser
            // debugger
            //修改审批人 混合树组件-回写用
            // this.selectedDataToTreeForChangeApprover = {//已选树节点
            //   userList:[],
            //   userOutsideList:[]
            // }
            //弹出选人组件
            this.$refs.changeApproverTree.blendTreeDialogShow()
        },
        //接收管理员-修改审批人，混合树组件2.0返回值
        getDataFromTreeForChangeApprover( obj = {} ){
            console.info(obj)
            console.info(JSON.stringify(obj))

            let approveUserOnly = []
            obj.userList && obj.userList.forEach((item)=>{
                approveUserOnly.push({
                    sid:item.sid,
                    name:item.name
                })
            })
            obj.userOutsideList && obj.userOutsideList.forEach((item)=>{
                approveUserOnly.push({
                    sid:item.sid,
                    name:item.name
                })
            })
            // debugger
            if ( approveUserOnly.length >= 0 && approveUserOnly[0]['sid'] ) {
                this.$confirm('您确定将当前审批人替换为：'+ approveUserOnly[0].name + ' 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.changeInstanceApprover( approveUserOnly[0].sid )

                    //清空已选修改审批人-混合树组件
                    this.selectedDataToTreeForChangeApprover = {
                        userList:[],
                        userOutsideList:[]
                    }

                }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                });
            }
        },
        //用户树-开始
        //接收管理员-修改审批人，选择用户树组件的返回值-作废
        getUserTreeOnly1:function(arr){
            this.showUserOnly1 = [...arr]

            if ( this.showUserOnly1[0].sid ) {
                this.$confirm('您确定将当前审批人替换为：'+ this.showUserOnly1[0].name + ' 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.changeInstanceApprover( this.showUserOnly1[0].sid )

                }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                });
            }
        },
        //修改审批人-管理员操作
        async changeInstanceApprover(  id = '' ){
            
            console.info(this.form.instanceId + id + this.adminChangedApprovalUser)

            const type = this.adminChangedApprovalUser == '' ? 1 : 2  //type 是修改审批人的时候传2   如果当前审批记录里面  环节对应的审批人位空 type 为1

            let res = await changeInstanceApprover( this.form.instanceId , id , this.adminChangedApprovalId , type , this.adminChangedInstanceAcId )


            this.instanceInfo()//获取审批详情

        },
        //提交
        async setInstanceRefer( ){
            let res=''
            if(this.formMode == 'rePreview'){ //驳回、退回等的草稿提交

              //调用表单的保存事件
              res = await this.$refs.draft.submitInstanceForm();

            }else{//纯草稿直接提交审批，draft模式

              //调用表单的保存事件draft
              res = await this.$refs.draft.submitInstanceForm();

              

            }

            
        },
        // 提交部分的回调
        async cbFlowFormInstanceSaved(data) {
          if (data.validation == false) {//自定义表单校验不通过
              this.$message({
                  showClose: true,
                  message: '自定义表单校验失败！',
                  type: 'warning'
              })
          }else{//自定义表单校验通过

            if ( this.formMode == 'draft' ) { //草稿模式

                let params = {
                    instanceId:this.form.instanceId,
                    templateId:this.form.templateId,
                    businessId:this.form.businessId,
                    freeOrTemplate:this.form.freeOrTemplate,
                    operateType:this.operateType,
                    copyUserIds:this.form.copyUserIds,
                    projectId:this.form.projectId,
                    
                    businessData: data.businessData,
                };


                const resDraft = await setInstanceRefer( params )

                //重置流程实例id，被退回再提交，注销原流程，生成新的流程
                this.form.instanceId = resDraft[0]
                

                this.$message({
                  type: "success",
                  message: "提交成功"
                });
                // this.instanceInfo()//获取审批详情

                this.$router.go(-1)

            }else{

              let params = {
                  templateId: this.form.templateId,
                  valueData: JSON.stringify(data.valueData),
                  businessData: data.businessData,
                  customFormId: data.customFormId,
                  businessId: data.businessId,
                  operateType: this.operateType,
                  copyUserIds:this.form.copyUserIds,
                  projectId:this.form.projectId,

                  instanceId:this.form.instanceId,
                  freeOrTemplate:this.form.freeOrTemplate
              };

              const res = await setInstanceRefer( params );

              //重置流程实例id，被退回再提交，注销原流程，生成新的流程
              this.form.instanceId = res[0]
              this.$message({
                type: "success",
                message: "提交成功"
              });
              // this.instanceInfo()//获取审批详情

              this.$router.go(-1)
            }
          }
        },
        //编辑
        async setInstanceEdit( ){
            this.editDialogVisible = true
        },
        //流程编辑，子组件回调，关闭父组件弹出窗
        changeEditDialogVisible:function(type = ''){
          this.editDialogVisible = false
          console.info(type)
          if (type === 'reflashData') {//刷新流程实例详情
            this.instanceInfo()//获取审批详情
            this.$refs.attachUpload.getFilesList();//获取新的附件列表
          }
        },
        //保存---作废，审批详情页没有保存的功能
        async setInstanceSave( ){
            let res = await draftSave( )
            this.$message({
              type: 'success',
              message: '关注成功'
            });
        },
        //用户树-开始
        /*1棵树*/
        //接收用户树组件的返回值-作废
        getUserTreeOnly:function(arr){
            // this.showUserOnly = [...arr]
            let copyUserIds = []
            arr.length && arr.forEach((item)=>{
                // copyUserIds.push({
                //   sid:item.isInside=='inside' ?item.sid:item.imUserId,
                //   type:item.isInside=='inside' ? 0 : 1
                // })
                copyUserIds.push(item.sid)

            })
            if (copyUserIds.length > 0) {
                this.setInstanceCc( copyUserIds )
            }else{
                this.$message({
                  showClose: true,
                  message: '请选择抄送人',
                  type: 'warning'
                })
            }
            
        },
        //审批记录table行合并方法
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          // debugger
          // if (columnIndex === 0) {
          //   if (rowIndex % 2 === 0) {
          //     return {
          //       rowspan: 2,
          //       colspan: 1
          //     };
          //   } else {
          //     return {
          //       rowspan: 0,
          //       colspan: 0
          //     };
          //   }
          // }
          // console.info("this.rowSpan",this.rowSpan)
          if (columnIndex === 0) {
            // console.info(rowIndex)
            this.rowSpan.forEach((item)=>{
              if( rowIndex  == item.rowID ){
                this.row = item.rowID
                this.rowNum = item.rowNum
                // console.info("___"+this.row)
                // console.info("_000__"+this.rowNum)
              }
            })

            // console.info("this.rowSpan",this.rowSpan)
            // console.info("this.form.instanceStep",this.form.instanceStep)


            // setTimeout(function(){


                if (rowIndex  === this.row) {
                  console.info("rowIndex")
                  return {
                    rowspan: this.rowNum,
                    colspan: 1
                  };
                } else if( rowIndex > this.row && rowIndex < (this.row + this.rowNum ) ){
                  console.info("被上面合并的行"+rowIndex)
                    return [0,0];
                    // return {
                    //   rowspan: 0,
                    //   colspan: 0
                    // };
                } else {
                  console.info("没合并的行"+rowIndex)
                  return {
                    rowspan: 1,
                    colspan: 1
                  };
                }
            // },1000)
                // if (rowIndex  == this.rowID) {
                //     return [this.rowNum,1];
                // } else if(rowIndex >this.rowID && rowIndex <(this.rowID+this.rowNum)){
                //     return [0,0];
                // }else {
                //     return [1,1];
                // }
            
          }

          if (rowIndex === this.form.instanceStep.length - 1 ) {
            console.info(this.form.instanceStep.length)
            return ;
          }


        },
        //审批记录的table中的第二列添加class
        approveColumnAddClass({ row, column, rowIndex, columnIndex }) {
          if(columnIndex === 1){
            return 'secondColumn';
          }
        },


        //抄送人，接收混合树组件的返回值
        getDataFromTreeForCcUser( obj = {} ){
            console.info(obj)
            console.info(JSON.stringify(obj))

            let copyUserIds = []

            obj.userList.forEach((item)=>{
              copyUserIds.push(item.sid)
            })
            obj.userOutsideList.forEach((item)=>{
              copyUserIds.push(item.sid)
            })
// debugger
            if (copyUserIds.length > 0) {
                this.setInstanceCc( copyUserIds )
            }else{
                this.$message({
                  showClose: true,
                  message: '请选择抄送人',
                  type: 'warning'
                })
            }

        },
    },
    mounted(){
      const routerObj = this.$route.query
      console.info(routerObj)
      this.fromPage = routerObj.fromPage;//从哪个页面打开的审批

      this.activeTabSessionForMy = routerObj.tab
      this.instanceInfo()//获取审批详情

    },
  }
</script>
<style lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.detail{
  .el-table .secondColumn{
    padding:8px 0;
    .cell{
      overflow: inherit;
    }
  }
  .el-dialog__header{
    border-bottom: 1px solid $borderColor;
  }
  .pass_dialog,.reject_dialog{
    .el-dialog__body{
      padding:20px 40px 20px 20px;
    }
  }
                
}
</style>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.detail{
    padding: 16px 24px;
    position: relative;
    background: #fff;
    .title {
        // margin-bottom: 8px;
    }
    .approve_name{
        width:100%;
        height:32px;
        display: inline-block;
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
    }
    .operate_buttons{
        width: 82.333%;
        position: fixed;
        top: 70px;
        right:0px;
        height:40px;
        line-height:40px;
        background-color:$backgroundColor;
        z-index:1;
        .title{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          text-indent:20px;
        }
        .red_color{
          border:1px solid red;
          color: red;
        }
    }
    .text_right{
        .el-button{
          margin-left:12px;
        }
        .el-dropdown{
          margin-left:-4px;
          margin-right:-4px;
        }
        .red_color{
          // border:1px solid red;
          // color: red;
        }
    }
    .detail_content{
        .title{
            text-align: left;
            font-size: 15px;
            line-height: 30px;
            font-weight:700;
            padding-bottom:10px;
        }
        .detail_form{
            padding: 24px 0px;
            .el-form-item{
              margin-bottom:0px;
            }
            .shared_user{
              margin-right:10px;
            }
            .file_name{
              margin-right:10px;
            }
            .line{
                margin-left: 0px;
                margin-right: 0px;
                margin-top:16px;
                margin-bottom:16px;
                border-top: 1px solid $borderColor;
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
                  border-radius: 50%;
                  border: 1px solid $borderColor;
                }
              }
              .approve_user_info{
                margin-top:3px;
                .info{
                  .el-col{
                    color: #ccc;
                    &:first-child{
                      color: $color;
                    }
                  }
                  
                }
                .info2{
                  line-height:16px;
                  width:calc(100% - 100px)
                }
                .add_user{
                  width:auto;
                  height:24px;
                  max-width:100px;
                  position:absolute;
                  right: -10px;
                  bottom:-8px;
                  color: #fff;
                  font-size:12px;
                  line-height:24px;
                  padding:1px 5px;
                  background-color:$blueColor;
                  overflow:hidden;
                  white-space:nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
        }
    }
    .reject_dialog{
      .goback{
        font-size:12px;
        color: #ccc;
        margin-left:30px;
      }
    }

}
</style>