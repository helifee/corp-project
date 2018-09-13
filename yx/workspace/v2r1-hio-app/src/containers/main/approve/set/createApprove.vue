<template>
    <div class="approve_wrap create_approve">
      <!-- <div class="close_button" @click="$router.push({path:'/approve/set/flowDesign'})" title="关闭当前窗口"><i class="el-icon-close"></i></div> -->
      <el-row class="steps">
        <el-col :span="24">
          <el-steps :active="pageActive" align-center finish-status="success">
            <el-step v-for="(item,index) in l('{approveLocale.set.flowDesign.createApproveType.steps}')" :key="index" :title="item"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24" :offset="0">
          <!--基本配置-->
          <div v-if="pageActive == 0">
            <el-form ref="stepOneForm" :model="stepOneForm" :rules="stepOneRules" label-width="220px" class="step_one_form">
              <el-form-item style="display:none">
                <el-input v-model="stepOneForm.flowId"></el-input>
              </el-form-item>
              <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_1.skipRepeatUser.label}')" prop="repeatUser">
                <el-radio-group v-model="stepOneForm.repeatUser">
                  <el-radio v-for="(item,index) in l('{approveLocale.set.flowDesign.createApproveType.step_1.skipRepeatUser.radio}')" :key="index" :label="index==0?2:1">{{item}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_1.flowType.label}')" prop="flowType">
                <el-select v-model="stepOneForm.flowType" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_1.flowType.placeholder}')">
                  <el-option v-for="(item,index) in flowTypeList" :key="index" :label="item.name" :value="item.sid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_1.freeFlow.label}')" prop="freeFlow">
                <el-radio-group v-model="stepOneForm.freeFlow">
                  radio
                  <el-radio v-for="(item,index) in l('{approveLocale.set.flowDesign.createApproveType.step_1.freeFlow.radio}')" :key="index" :label="index">{{item}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_1.flowName.label}')" prop="flowName">
                <el-input v-model="stepOneForm.flowName" :maxlength="51" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_1.flowName.placeholder}')"></el-input>
                </el-select>
              </el-form-item>
              <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_1.flowDesc.label}')" prop="flowDesc">
                <el-input v-model="stepOneForm.flowDesc" :maxlength = "201"  :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_1.flowDesc.placeholder}')"></el-input>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <!--表单设计-->
          <div v-if="pageActive == 1 && flowTemplateId !=0">
            <flow-form
              ref="design"
              formMode="design"
              :flowTemplateCode="flowTemplateId"
              @saveSuccessNext="changePageActive"
            ></flow-form>
          </div>
          <!--流程配置-->
          <div v-if="pageActive == 2">
            <div class="flow_design">
              <flow-client ref = "flow_client" v-if="pageActive == 2" :flowClientShow="pageActive"></flow-client>
              <!-- 流程配置模块的子页面demo：
              <el-button type="danger" @click="setFlowInfo('newNode')">新节点</el-button>
              <el-button type="danger" @click="setFlowInfo('conditionGateway')">条件网关</el-button>
              <el-button type="danger" @click="setFlowInfo('conditionExpression')">条件表达式</el-button> -->
            </div>
          </div>
          <!--权限设置-->
          <div v-if="pageActive == 3">
            <el-form ref="stepFourForm" :model="stepFourForm" :rules="stepFourRules" label-width="220px" class="step_four_form">
              <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_4.permission.label}')" prop="permission">
                <!--全局组件的使用-权限选择，组合树-->
                <blend-tree
                    ref= "stepFourFormTree"
                    :tagButtons="tagButtonsForStepFourForm"
                    :activeTab = "activeTabForStepFourForm"
                    :selectedDataToTree = "selectedDataToTreeForStepFourForm"
                    @getDataFromTree = "getDataFromTreeForStepFourForm">
                    <!--添加按钮图标的插槽-->
                    <div slot="add_button">
                      <i class="el-icon-circle-plus" @click.stop = "$refs.stepFourFormTree.blendTreeDialogShow()"></i>
                    </div>
                </blend-tree>

                <!--权限选择，组合树-->
                <!-- <group-tree
                  :selectedDeptsToTree="stepFourFormCopy.deptList"
                  :selectedRolesToTree="stepFourFormCopy.roleList"
                  :selectedUsersToTree="stepFourFormCopy.userList"
                  @getDataFromGroupTree = "getDataFromGroupTree"
                >
                </group-tree> -->
              </el-form-item>
            </el-form>
          </div>
        </el-col>

        <el-col :span="20" :offset="2" style="margin-top:30px;margin-bottom:30px;">
          <el-button v-if="pageActive !== 0" @click="prev" size="small">{{l('{approveLocale.set.flowDesign.createApproveType.prevButton}')}}</el-button>
          <el-button type="primary" @click="next" v-text="pageActive > 2 ? l('{approveLocale.set.flowDesign.createApproveType.nextButton}')[0] : l('{approveLocale.set.flowDesign.createApproveType.nextButton}')[1] " size="small">{{}}</el-button>
          <el-button  @click="$router.push({path:'/approve/set/flowDesign'})" size="small">关闭</el-button>
        </el-col>
      </el-row>
      <!--右侧弹窗-->
      <right-slide-modal :title="l('{approveLocale.set.flowDesign.createApproveType.step_3.'+dialogcComponent+'.title}')" 
      :showClose="false" :visible.sync="dialogVisible" 
     
      class="approve_right_model">
          <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li v-for="(item,index) in l('{approveLocale.set.flowDesign.createApproveType.modalButtons}')" :key="index">
                  <el-button @click="operateFun(index)">{{item}}</el-button>
                </li>
            </ul>
          </div>
          <div>
            <new-node v-if="dialogcComponent === 'newNode'" ref="fcPop" 
            :newnodeData="flowTempData[dialogcComponent]"
            :dialogVisible="dialogVisible"
            ></new-node>
          </div>
          <div>
            <condition-gateway ref="cgt"
             v-if="dialogcComponent === 'conditionGateway'"
            :conditionGateway="flowTempData[dialogcComponent]"
            :dialogVisible="dialogVisible"
           :flowTemplateId="flowTemplateId"
            ></condition-gateway>
          </div>
          <div>
            <condition-expression ref="fcExpression" 
            v-if="dialogcComponent === 'conditionExpression'"
            :flcondition="flowTempData[dialogcComponent]"
            :dialogVisible="dialogVisible"
            :flowTemplateId="flowTemplateId"
            ></condition-expression>
          </div>
      </right-slide-modal>
      <!--选择部门-->
      <!-- <dept-tree
        :selectDeptDialogVisible="showDeptTree"
        :enable-checked-multiple="deptTreeEnableCheckedMultipleDept"
        :selectedDepts = "stepFourForm[stepFourSelectPermissionType]"
        @closeCreateModal ="showDeptTree = !showDeptTree"
        @getDeptTree = "getDeptTree">
      </dept-tree> -->
      <!--选中角色-->
      <!-- <role-tree
        :selectRoleDialogVisible="showRoleTree"
        :selectedRoles = "stepFourForm[stepFourSelectPermissionType]"
        @closeCreateModal ="showRoleTree = !showRoleTree"
        @getRoleTree = "getRoleTree">
      </role-tree> -->
      <!--选择用户-->
      <!-- <user-tree
        :selectUserDialogVisible="showUserTree"
        :enable-checked-multiple="userTreeEnableCheckedMultipleUser"
        :show-inside-outside-tabs="userTreeShowInsideOutsideTabs"
        :selectedUsers = "stepFourForm[stepFourSelectPermissionType]"
        @closeCreateModal ="showUserTree = !showUserTree"
        @getUserTree = "getUserTree">
      </user-tree> -->
    </div>
</template>

<script>
    

    JZY.locale.add('approveLocale',require('../approve.locale'))
    import config from '@/config/index.js'

    import flowClient from "@/containers/main/flowClient/client"
    import flowForm from "@/containers/main/flowForm/client"

    import newNode from '@Main/approve/set/createApprove/newNode.vue'
    import conditionGateway from '@Main/approve/set/createApprove/conditionGateway.vue'
    import conditionExpression from '@Main/approve/set/createApprove/conditionExpression.vue'

    import setFlowAPI from "@/containers/main/approve/set/setFlowAPI.js"//流程配置的调用接口
    import  s_flow  from "@/containers/main/flowClient/s_flow.js"

    import {getApproveInfoById,getCategory,saveApproveInfo,saveApproveRole,getApproveRoleById} from '@Main/approve/getData'

    export default{
        components: {
          flowClient,
          flowForm,
          newNode,
          conditionGateway,
          conditionExpression,

        },
        data(){
            return {
              flowTempData:{
                  newNode : null,
                  conditionGateway:null,
                  conditionExpression:null
              },
              flowTemplateId:this.$route.params.id,//当前模板的id
              // showDeptTree:false,//部门树组件弹出窗开关
              // deptTreeEnableCheckedMultipleDept:true,//部门树：false单选，true多选（默认是多选，此种模式可不传递此参数
              // showRoleTree:false,//角色树组件弹出窗开关
              // showUserTree:false,//用户树组件弹出窗开关
              // // userTreeData :[],//用户树组件，传入已选择用户
              // showUserTreeType:'',//用户树类型，审批人、抄送人等
              // userTreeEnableCheckedMultipleUser:true,//用户树：false单选，true多选（默认是多选，此种模式可不传递此参数）
              // userTreeShowInsideOutsideTabs:true,//用户树：显示内、外部，false:只显示‘人员’，其他逻辑无差异
              // stepFourSelectPermissionType:'',//流程提交权限类型
              pageActive: Number(this.$route.query.stage),//当前步骤
              beforePageActive: -1,//上一步骤
              dialogVisible:false,//流程配置页面，右侧弹出窗
              dialogcComponent:'',//流程配置页面，右侧弹出的组件名
              
              stepOneForm:{
                flowId:'',//编辑用，审批模板id
                flowCode:'',//编辑用，审批模板code
                repeatUser:1,//审批环节人员重复是否跳过2不跳过，1跳过
                flowType:'',//流程类型id
                freeFlow:0,//是否是自由流程，否
                flowName:'',//流程名称
                flowDesc:'',//流程描述
                startSign:''//移动端用
              },


              flowTypeList:[],//基本信息，流程类型list
              stepOneRules: {
                repeatUser: [
                  { required: true, message: '请选择是否跳过', trigger: 'change' }
                ],
                flowType: [
                  { required: true, message: '请选择流程类型', trigger: 'change' }
                ],
                freeFlow: [
                  { required: true, message: '请选择是否是自由流程', trigger: 'change' }
                ],
                flowName:[
                  { required: true, message: '请输入流程名称', trigger: 'blur' },
                  { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                  { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                ],
                flowDesc:[
                  { required: false, message: '请输入流程描述', trigger: 'blur' },
                  { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' },
                  { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                ],
              },

              stepFourAddButton:0,//添加审批人按钮类型0部门，1角色，2用户
              stepFourForm:{
                deptList:[],//已选择的部门
                roleList:[],//已选择的角色
                userList:[]//已选择的用户
              },
              stepFourFormCopy:{//临时数组
                deptList:[],//已选择的部门
                roleList:[],//已选择的角色
                userList:[]//已选择的用户
              },
              stepFourRules: {
                // permission: [
                //   { required: true, message: '请选择流程提交权限', trigger: 'change' }
                // ],
              },

              selectedDataToTreeForStepFourForm:{//已选树节点
                userList:[],
                deptList:[],
                roleList:[]
              },

              selectedDataToTreeForStepFourFormCopy:{//已选树节点
                userList:[],
                deptList:[],
                roleList:[]
              },
              tagButtonsForStepFourForm:['user','dept','role'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
              activeTabForStepFourForm:'dept',//初始化激活的tab标签


            }
        },
        props: ['categoryInfo'],
        created() {
          setFlowAPI.setCreateApproveThis(this)//传递vue实例this给接口库js
        },
        methods:{
            //初始化
            async initByRoute( stage = 0 ){
                this.flowTemplateId = this.$route.params.id
                switch(stage){
                    case 0://第一步，基本信息
                        console.info("第一步，基本信息")
                        this.getApproveInfoById()
                        break;
                    case 1://第二步，表单
                        console.info(this.flowTemplateId,"第二步，表单")
                        break;
                    case 2://第三步，流程配置
                        await this.getApproveInfoById()//获取模板基本信息
                        console.info("this.beforePageActive===",this.beforePageActive)
                        console.info("this.stepOneForm.freeFlow====",this.stepOneForm.freeFlow)
                        // alert(this.stepOneForm.freeFlow)
                        if(this.stepOneForm.freeFlow == 1){//自由流模板，跳过流程配置步骤3
                            this.$confirm('当前模板为自由流模板，不可配置固定流程，点击确定进入下一环节。', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '关闭',
                                type: 'warning'
                            }).then(() => {
                                if( this.beforePageActive == -1 || this.beforePageActive == 1 ){//进入权限设置环节
                                    this.changePageActive( 3 )

                                }else if( this.beforePageActive == 3){
                                  //进入表单设计环节
                                    this.changePageActive( 1 )
                                }else{

                                    this.changePageActive( this.beforePageActive )
                                }
                                

                            }).catch(() => {
                                this.$message({
                                  type: 'info',
                                  message: '已关闭'
                                }); 
                                setTimeout(function(){
                                  window.close()
                                },1000)         
                            });
                        }
                        break;
                    case 3://第四步，权限范围
                        console.info("第四步，权限范围")
                        this.getApproveRoleById()
                        break;
                    default:
                        this.$message('错误');
                }
                console.info(this.flowTemplateId ,'this.flowTemplateId')
            },
            //获取第一步基本信息
            async getApproveInfoById(){

              let res = await getCategory() //获取流程分类
                    console.info(res)
              this.flowTypeList = [...res]


              let resApproveInfo = await getApproveInfoById(this.flowTemplateId)//获取审批模板的基本信息

              console.info(resApproveInfo)
              if(resApproveInfo == null && this.flowTemplateId != 0){//此模板已经被删除，且非新增模板

                this.$confirm('当前打开的模板已被删除，不可以编辑！', '提示', {
                    confirmButtonText: '确定',
                    showClose:false,
                    showCancelButton:false,
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$router.push({path:'/approve/set/flowDesign'})

                }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                });

              }else if(resApproveInfo && resApproveInfo.hasOwnProperty('flowCategoryId')){
                this.stepOneForm = {
                  flowId:resApproveInfo.sid || null,//编辑用，审批模板id
                  flowCode:resApproveInfo.code || null,//编辑用，审批模板code
                  repeatUser:Number(resApproveInfo.isRepeat),//审批环节人员重复是否跳过
                  flowType:resApproveInfo.flowCategoryId,//流程类型id
                  freeFlow:this.radioValueChangeToNumber(resApproveInfo.freeOrTemplate),//是否是自由流程，F=>1自由流，T=>0固定流
                  flowName:resApproveInfo.name,//流程名称
                  flowDesc:resApproveInfo.description,//流程描述
                  startSign:resApproveInfo.startSign,//移动端用
                }
              }
              console.info("this.stepOneForm",this.stepOneForm)

              
            },
            //获取第四步权限范围
            async getApproveRoleById(){
              let resApproveRole = await getApproveRoleById(this.flowTemplateId) //获取模板的权限
              console.info("resApproveRole")
              console.info(resApproveRole)

              let deptResult = [],
                  roleResult = [],
                  userResult = []

              resApproveRole.departmentList && resApproveRole.departmentList.length>0 && resApproveRole.departmentList.forEach(item =>{
                deptResult.push({
                  sid:item.rootId,
                  name:item.rootName,
                  root:item.root
                })
              })
              resApproveRole.roleList && resApproveRole.roleList.length>0 && resApproveRole.roleList.forEach(item =>{
                roleResult.push({
                  roleId:item.rootId,
                  roleName:item.rootName
                })
              })
              resApproveRole.personList && resApproveRole.personList.length>0 && resApproveRole.personList.forEach(item =>{
                userResult.push({
                  sid:item.rootId,
                  name:item.rootName
                })
              })

              this.selectedDataToTreeForStepFourForm = {//已选树节点
                userList:[...userResult],
                deptList:[...deptResult],
                roleList:[...roleResult]
              }


              this.selectedDataToTreeForStepFourFormCopy = JZY.u.deepExtend( {} , this.selectedDataToTreeForStepFourForm )

              // this.stepFourForm.deptList = [...deptResult]
              // this.stepFourForm.roleList = [...roleResult]
              // this.stepFourForm.userList = [...userResult]

              
              // this.stepFourFormCopy.deptList = [...deptResult]
              // this.stepFourFormCopy.roleList = [...roleResult]
              // this.stepFourFormCopy.userList = [...userResult]

              
            },

            //上一步
            prev() {
              this.beforePageActive = this.pageActive //缓存上一步骤
              if (this.pageActive-- < 1){
                this.pageActive = 0;
              }
              console.info( this.pageActive )
              
              if(this.pageActive == 1){//流程配置页面2 跳转到 表单设计页1；需要保存当前流程配置
                this.saveFlowClient('noSkip') //不跳转到第4步骤
              }
              this.changePageActive( this.pageActive )
              
            },
            //下一步
            next() {
              this.beforePageActive = this.pageActive //缓存上一步骤
              console.info(this.pageActive)
              switch(this.pageActive){
                  case 0:
                    this.setApproveInfo() //保存审批模板基本信息
                    break;
                  case 1:
                    this.saveFlowForm() //保存表单基本信息
                    break;
                  case 2:
                    this.saveFlowClient()//保存流程配置信息
                    break;
                  case 3:
                    this.savePermissionForm()//保存权限信息
                    break;
                  default:
                    this.$message('错误');
              }
              
            },
            //页面跳转
            changePageActive:function( pageActive = 0 ){
                // console.info(pageActive)
                if (this.pageActive++ > 2){
                  this.pageActive = 3;
                }else{
                  this.pageActive = pageActive
                }
                // debugger

                this.$router.push({
                    path: '/setFlowClient/'+this.flowTemplateId,
                    query: {stage: pageActive}
                })
                //刷新流程模板，bug修复
                if (this.pageActive == 2) {
                    // console.info(this.$route)
                    let routeData = this.$router.resolve({
                        name: 'setFlowClient',
                        params:{id:this.flowTemplateId},
                        query: {stage: pageActive}
                    });
                    window.open(routeData.href, '_self');
                    window.location.reload()
                }
                //初始化
                this.initByRoute( pageActive )
                
              // status && this.pageActive++
            },
            //第一步基本信息设置
            setApproveInfo:function(){
              this.$refs.stepOneForm.validate(async (valid) => {
                if (valid) {
                  const params = {
                    sid:this.stepOneForm.flowId,
                    code:this.stepOneForm.flowCode,
                    name:this.stepOneForm.flowName,
                    freeOrTemplate:this.radioValueChangeToString(this.stepOneForm.freeFlow),
                    description:this.stepOneForm.flowDesc,
                    state:'', //默认为空，后端处理开启和禁用的逻辑
                    flowCategoryId:this.stepOneForm.flowType,
                    startSign:this.stepOneForm.startSign,//移动端用
                    isRepeat:this.stepOneForm.repeatUser.toString(),
                  }
                  console.info(params)
                  try{
                    let result = await saveApproveInfo(params)
                    console.info(result[0])
                    if ( result[0].hasOwnProperty('code') ) {
                      
                        this.flowTemplateId = result[0].code // 保存模板基本信息，后端返回模板的code
                        
                      this.stepOneForm.repeatUser = 0
                      this.stepOneForm.flowType = ''
                      this.stepOneForm.freeFlow = 0
                      this.stepOneForm.flowName = ''
                      this.stepOneForm.flowDesc = ''

                      this.changePageActive( 1 )

                      this.$message({
                        type: 'success',
                        message: '基本信息保存成功'
                      });
                    }
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
            //第二步保存自定义表单信息
            saveFlowForm(){
                this.$refs.design.$refs.design.$refs.formContainer.saveModel()//调用表单组件的保存表单事件

                //解决获取不到code的bug
                this.flowTemplateId = this.$route.params.id
                        
                //调用表单组件的保存表单事件
                // 旧的，已停用
                // this.$refs.design.$refs.design.$refs.topHeader.save()

                // this.changePageActive( 2 )
            },
            //第三步保存流程配置信息
            saveFlowClient( skip = '' ){
                let isValidate = (skip == 'noSkip') ? false:true;
                this.$refs.flow_client.save(isValidate,(data) =>{
                  if(data == 1 && skip !=='noSkip'){
                    this.changePageActive( 3 )
                  }
                })//调用表单组件的保存表单事件
                
            },
            //第四步保存权限信息
            async savePermissionForm(){
              let departmentList = [],
                  roleList = [],
                  personList = []
                  

              this.selectedDataToTreeForStepFourFormCopy.userList.forEach(item =>{
                personList.push({
                  flowTemplateId:this.flowTemplateId,
                  chooseType:'3',//权限类型（1  部门，2 角色，3用户）
                  rootId:item.sid,
                  rootName:item.name
                })
              });

              let rootTemp = false
              this.selectedDataToTreeForStepFourFormCopy.deptList.forEach(item =>{
                if (item.hasOwnProperty('root')) {//来自审批的接口
                  rootTemp=item.root !=null ? item.root : false 
                }else{//选部门组件返回
                  rootTemp=item.parentId == null
                }
                
                departmentList.push({
                  flowTemplateId:this.flowTemplateId,
                  chooseType:'1',//权限类型（1  部门，2 角色，3用户）
                  rootId:item.sid,
                  rootName:item.name,
                  root:rootTemp
                })
              });
              this.selectedDataToTreeForStepFourFormCopy.roleList.forEach(item =>{
                roleList.push({
                  flowTemplateId:this.flowTemplateId,
                  chooseType:'2',//权限类型（1  部门，2 角色，3用户）
                  rootId:item.roleId,
                  rootName:item.roleName
                })
              });

              const params = {
                departmentList: departmentList,
                roleList:roleList,
                personList:personList,
                flowTemplateId:this.flowTemplateId,
                code:this.flowTemplateId
              }
              let res = await saveApproveRole(params)
              if (res[0] ==1) {
                this.$message({
                    type: 'success',
                    message: '模板权限保存成功'
                });
                // setTimeout(function(){
                //   window.close()
                // },1000)
                this.$router.push({
                  path:'/approve/set/flowDesign'
                })
              }else{
                this.$message({
                    type: 'error',
                    message: '模板权限保存失败'
                });
              }
            },
            //右侧弹出页面顶部的功能按钮事件
            operateFun(index){
              switch(index){
                  case 0:
                    this.saveDialog ();
                    break;
                  case 1:
                    this.dialogVisible = false;
                    this.dialogcComponent = "";
                    this.closeDialog ();
                    break;
                  default:
                    this.$message('错误');
              }
            },
            //获取节点信息 （条件网关）
            setCellInfo(currentcell,info){  
              let edges = currentcell.edges;
              let forkLines = {};
              if(edges){
                for(let i = 0;i< edges.length;i++){
                  let edge = edges[i];
                  if(info[edge.id]){
                    edge.value = info[edge.id].name;
                    edge.conditionName = info[edge.id].conditionName;
                    edge.conditionFormula = info[edge.id].conditionFormula;

                    edge.conditionNameNew = info[edge.id].conditionNameNew;
                    edge.conditionFormulaNew = info[edge.id].conditionFormulaNew;
                  }
                }
              }
            },
            //保存流程节点信息
            saveDialog (){
              let myThis = this;
              if(this.currentCell){
                this.currentCell.flId = this.flowTemplateId;
              if(this.dialogcComponent == "newNode"){
                this.$refs['fcPop'].$refs['ruleForm'].validate((valid) => {
                  if (valid) {
                    myThis.dialogVisible = false;
                    myThis.dialogcComponent = "";
                    let currentForm = myThis.$refs.fcPop.ruleForm;
                    //审批类型放在extra里
                   // debugger
                    let extra = myThis.currentCell.extra ? (JSON.parse(myThis.currentCell.extra)):{};
                    extra.approvalType = currentForm.approveType;

                    myThis.currentCell.extra = JSON.stringify(extra);

                    myThis.currentCell.name = currentForm.name;
                    myThis.currentCell.value = currentForm.name;
                    let participant ;
                    let ccPerson = [];
                    participant = s_flow.tranApproveList(myThis.currentCell,currentForm.approverUser,1);
                    myThis.currentCell.participant = JSON.stringify(participant);
                    s_flow.filterApprove(myThis.currentCell,currentForm.userShared,0,ccPerson);
                    myThis.currentCell.ccPerson = JSON.stringify(ccPerson);
                  
                    s_flow.updateCellAttr(myThis.currentCell.id,'value',currentForm.name);
                    
                  }
                });
                }else if(this.dialogcComponent == "conditionExpression"){  //连线
                    
                    this.$refs['fcExpression'].$refs['ruleForm'].validate((valid) => {
                      if (valid) {
                        let currentForm = myThis.$refs.fcExpression.ruleForm;
                        
                        //条件节点
                        // s_flow.forkInit(myThis.currentCell,currentForm);
                        myThis.currentCell.name = currentForm.name;
                        myThis.currentCell.value = currentForm.name;
                        // let currentForm = myThis.$refs.fcExpression.ruleForm;
                        //获取当前节点的条件
                        let conditionName = currentForm.conditionName || "";

                        myThis.currentCell.conditionFormula = currentForm.conditionFormula;

                        myThis.currentCell.conditionName = conditionName;
                        
                        myThis.currentCell.conditionNameNew = currentForm.conditionNameNew;

                        myThis.currentCell.conditionFormulaNew = currentForm.conditionFormulaNew;

                        s_flow.updateCellAttr(myThis.currentCell.id,'value',currentForm.name);
                        myThis.dialogVisible = false;
                        myThis.dialogcComponent = ""
                      }
                    })
                }else if(this.dialogcComponent == "conditionGateway"){  //条件网关
                    
                    myThis.dialogVisible = false;
                    myThis.dialogcComponent = "";
                    let cgt = this.$refs['cgt'].$refs["cgt"];
                    //节点信息
                    let info = cgt.data;
                    let infoObj = {};
                    info.forEach(function (value) {
                      // this.getFormula(value);
                      infoObj[value.nodeId] = value;
                      
                    });
                    this.setCellInfo(this.currentCell,infoObj);
                }
              }
                // this.$message('保存成功');
            },
            //关闭审批分类弹窗
            closeDialog (){
                // this.$message('关闭成功');
                
            },
            //设置各流程配置页面中的节点信息
            setFlowInfo:function(type,obj={}){
                this.dialogVisible = true;
                this.dialogcComponent = type;
                this.flowTempData[type] = obj;
                this.currentCell = obj;
            },
            //是否自由流单选框vuale的切换
            radioValueChangeToNumber:function( val = '' ){
              let state = 0
              if (val=='F') { //自由流F
                state = 1
              }else{ //模板T
                state = 0
              }
              return state

            },
            //是否自由流单选框vuale的切换
            radioValueChangeToString:function( val = 1 ){
              let state = 'T' 
              if (val == 1) {//自由流F
                state = 'F'
              }else{ //模板
                state = 'T'
              }
              return state
            },
            //接收组合树组件的返回值-作废
            getDataFromGroupTree:function(obj){
              console.info("getDataFromGroupTree")
              console.info(obj)
              this.stepFourForm = JZY.u.deepExtend ( {} , obj )
              console.info(this.stepFourForm)
            },

            //接收混合树组件的返回值-权限
            getDataFromTreeForStepFourForm( obj = {} ){
              console.info(obj)
              console.info(JSON.stringify(obj))
              // debugger
              this.selectedDataToTreeForStepFourFormCopy = JZY.u.deepExtend ( {} , obj )
            },

        },
        async mounted(){
            // console.info(this.$route.params.id)
            console.info(Number(this.$route.query.stage),"this.$route.query.stage")
            this.initByRoute( Number(this.$route.query.stage) )
        },
        beforeRouteEnter (to, from, next) {
          console.log(to)
          console.log(from)
          console.log(next)
          next();
          //如果是流程模板设计，强制刷新页面，彭亮需要，6.6
          if ( from.fullPath == '/approve/set/flowDesign' && to.query.stage === 2) {
              window.location.reload()
          }
        },
        watch:{
          //监控路由
          "$route.params.id": {
            handler(newValue, oldValue) {
              console.info("newValue",newValue);
              this.flowTemplateId = newValue
            },
            deep: true
          },
          

        },
    }
</script>

<style lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.create_approve.approve_wrap{
    .el-textarea{
      textarea{
        box-shadow:none;
      }
    }
    // .el-tag + .el-tag {
    //   margin-left: 10px;
    // }
    .el-step__head.is-process {
      color: $blueColor;
      border-color: $blueColor;
    }
    .el-step__title.is-process{
      color:$blueColor;
    }

}
</style>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.create_approve.approve_wrap{
    margin-top: 20px;
    position:relative;
    .close_button{
      position:absolute;
      top: 0px;
      right:20px;
      i{
        font-size:16px;
        &:hover{
          cursor:pointer;
          color: $theme-blue-active;
        }
      }
    }
    .steps{
      margin-bottom:20px;
      padding-bottom:20px;
      border-bottom:1px solid $borderColor;
    }
    .add_permission{
      color: #67C23A;
      margin-left:15px;
      font-size:18px;
      &:hover{
        cursor:pointer;
      }
    }
}
</style>