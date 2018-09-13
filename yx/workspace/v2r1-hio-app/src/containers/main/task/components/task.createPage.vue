<template>
  <div class="task create_page">
    <el-form ref="taskCreateForm" :model="taskCreateForm" :rules="taskCreateRules" label-position="right" label-width="100px" class="task_create_form">
        <el-row :gutter="0" class="">
            <el-col :span="24">
                <el-form-item prop="taskName" :label="l('{taskLocale.createTask.form.taskName}')">
                    <el-input v-model="taskCreateForm.taskName"
                    :disabled="editableByRole.taskName" class="task_name" :placeholder="l('{taskLocale.createTask.form.placeholder}')" :maxlength="101"></el-input>
                </el-form-item>
            </el-col>
            <!--关联项目-->
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.projectName}')"  prop="projectId">
                    <el-select v-model="taskCreateForm.projectName"
                      clearable
                     :disabled = "projectId !='' || editableByRole.projectName" class="project_name"
                      :title="taskCreateForm.projectName" :placeholder="l('{taskLocale.createTask.form.projectNamePlaceholder}')" @change = "setProjectId(taskCreateForm.projectName)">
                      <el-option v-for="(item,index) in projectList" :key="index" :label="item.projectName" :value="index" 
                      ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 
            <el-col :span="12" class="stage_project">
                <el-form-item :label="l('{taskLocale.createTask.form.projectstageName}')" prop="projectstageId">
                    <el-select v-model="taskCreateForm.projectstageName" :disabled = "editableByRole.projectstageName" :placeholder="l('{taskLocale.createTask.form.projectstageNamePlaceholder}')" @change = "setProjectstageId">
                      <el-option v-for="(item,index) in projectstageList" :key="index" :label="item.projectstageName" :value="item.sid"
                      ></el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->
            <!--负责人-->
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.taskLiableName}')" prop="taskLiableId">
                  <!--负责人树组件的使用-->
                  <blend-tree
                      ref= "taskLiableNameTree"
                      :enable-checked-multiple="false"
                      :filterDataUrl = "taskCreateForm.projectId == '' ? {} : filterDataUrl"
                      :tagButtons="tagButtonsForTaskLiable"
                      :activeTab = "activeTabForTaskLiable"
                      :readOnly = "editableByRole.taskLiableId"
                      :selectedDataToTree = "selectedForTaskLiable"
                      @getDataFromTree = "getDataFromTreeForTaskLiable">
                      <!--添加按钮图标的插槽-->
                      <div slot="add_button">
                        <i class="el-icon-edit" v-if="!editableByRole.taskLiableId" @click.stop = "$refs.taskLiableNameTree.blendTreeDialogShow()"></i>
                      </div>
                  </blend-tree>


                    <!-- <el-tag
                        v-if="showUser1.length!=0"
                        v-for="(item,index) in showUser1"
                        :key="item.sid"
                        :closable = "!editableByRole.taskLiableId"
                        :disable-transitions="false"
                        @close="deleteUser(item.sid,'user1')">
                        {{item.name}}
                    </el-tag>
                    <i class="el-icon-edit" v-if="!editableByRole.taskLiableId" @click = "showClick('user1')"></i> -->
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.startDate}')" prop="betweenDate">
                    <el-date-picker
                      v-model="taskCreateForm.betweenDate"
                      :disabled = "editableByRole.taskLiableId"
                      type="daterange"
                      :range-separator="l('{taskLocale.createTask.form.betweenTo}')"
                      :start-placeholder="l('{taskLocale.createTask.form.startDate}')"
                      :end-placeholder="l('{taskLocale.createTask.form.lastDate}')"
                      format = "yyyy-MM-dd"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <!--参与人-->
        <el-row :gutter="0" class="">
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.joinUserName}')">
                  <!--参与人树组件的使用-->
                  <blend-tree
                      ref= "joinUserNameTree"
                      :tagButtons="tagButtonsForJoinUser"
                      :activeTab = "activeTabForJoinUser"
                      :readOnly = "editableByRole.taskParticipantsSharedListDto"
                      :selectedDataToTree = "selectedForJoinUser"
                      @getDataFromTree = "getDataFromTreeForJoinUser">
                      <!--添加按钮图标的插槽-->
                      <div slot="add_button">
                        <i class="el-icon-circle-plus" v-if = "!editableByRole.taskParticipantsSharedListDto" @click.stop = "$refs.joinUserNameTree.blendTreeDialogShow()"></i>
                      </div>
                  </blend-tree>


                    <!-- <el-tag
                        v-if="showUser2.length > 0"
                        v-for="(item,index) in showUser2"
                        :key="item.sid"
                        :closable = "!editableByRole.taskParticipantsSharedListDto"
                        :disable-transitions="false"
                        @close="deleteUser(item.sid,'user2')">
                        {{item.name}}
                    </el-tag>
                    <i class="el-icon-circle-plus add_permission" v-if = "!editableByRole.taskParticipantsSharedListDto" @click = "showClick('user2')"></i> -->


                </el-form-item>
            </el-col>
            <el-col :span="24"><div class="line"></div></el-col>
            <!--共享人-->
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.sharedUserName}')">
                  <!--共享人树组件的使用-->
                  <blend-tree
                      ref= "sharedUserNameTree"
                      :tagButtons="tagButtonsForSharedUser"
                      :activeTab = "activeTabForSharedUser"
                      :selectedDataToTree = "selectedForSharedUser"
                      @getDataFromTree = "getDataFromTreeForSharedUser">
                      <!--添加按钮图标的插槽-->
                      <div slot="add_button">
                        <i class="el-icon-circle-plus" @click.stop = "$refs.sharedUserNameTree.blendTreeDialogShow()"></i>
                      </div>
                  </blend-tree>
                  <!-- 
                    <group-tree
                      :selectedDeptsToTree="groupTreeDataCopy.deptList"
                      :selectedRolesToTree="groupTreeDataCopy.roleList"
                      :selectedUsersToTree="groupTreeDataCopy.userList"
                      :userTreeShowInsideOutsideTabs="true"
                      @getDataFromGroupTree = "getDataFromGroupTree"
                    >
                    </group-tree> -->
                </el-form-item>
            </el-col>
            <el-col :span="24"><div class="line"></div></el-col>
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.process}')" prop="taskProgress">
                    <el-row :gutter="0">
                        <el-col :span="22" class="process">
                            <!-- <el-progress :percentage="form.process"></el-progress> -->
                            <el-slider
                              v-model="taskCreateForm.taskProgress"
                              :disabled="editableByRole.taskProgress"></el-slider>
                        </el-col>
                        <el-col :span="2" style="text-align:center;color:#46A7FF">
                          {{taskCreateForm.taskProgress}} %
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
            <el-col :span="24" class="region">
                <el-form-item :label="l('{taskLocale.createTask.form.taskUrgentFlag}')" prop="taskUrgentFlag">
                    <span class="region_icon" :class="regionSelectedClass">
                        <em class="region_circle"></em>
                    </span>
                    <el-select v-model="taskCreateForm.taskUrgentFlag" :disabled="editableByRole.taskUrgentFlag" @change="regionSelected" popper-class="region">
                        <el-option v-for="(item,index) in l('{taskLocale.createTask.form.regionSelectOptions}')" :key="index" :label="item.name" :value="item.value">
                            <div class="region_html" :class="regionClass[index]">
                                <em class="region_circle"></em>
                                <span>{{item.name}}</span>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24"><div class="line"></div></el-col>
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.describe}')" prop="describe">
                    <el-input v-model="taskCreateForm.describe" v-textarea-limiter type="textarea" :maxlength="2500" :rows="5"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24"><div class="line"></div></el-col>
            <el-col :span="24" class="warn_date">
                <el-row :gutter="0">
                    <el-col :span="13">
                        <el-form-item :label="l('{taskLocale.createTask.form.advanceTime}')">
                            {{l('{taskLocale.createTask.form.advanceTimeDesc}')}}
                            <el-select v-model="taskCreateForm.advanceTime" :placeholder="l('{taskLocale.createTask.form.datePlaceholder}')">
                                <el-option v-for="(item,index) in l('{taskLocale.createTask.form.advanceTimeSelectOptions}')" :key="index" :label="item.name" :value="item.value">
                                    {{item.name}}
                                </el-option>
                            </el-select>
                            <el-time-select
                                v-model="taskCreateForm.remindTime"
                                :picker-options="{
                                  start: '00:00',
                                  step: '00:30',
                                  end: '24:00'
                                }"
                                :disabled = "taskCreateForm.advanceTime == -1"
                                :clearable="false"
                                placeholder="09:00">
                            </el-time-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" >
                        <el-form-item :label="l('{taskLocale.createTask.form.advanceTimeName}')" prop="warmListSelected">
                            <el-checkbox-group v-model="taskCreateForm.warmListSelected">
                                <el-checkbox :disabled ="taskCreateForm.advanceTime == -1" v-for="(item,index) in l('{taskLocale.createTask.form.warmList}')" :key="index" :label="index">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24"><div class="line"></div></el-col>
            <el-col :span="24">
                <el-form-item :label="l('{taskLocale.createTask.form.file}')" class="file_upload">
                  <attach-upload
                    ref="attachUpload"
                    v-if="taskCreateForm.taskId"
                    :required = "false"
                    :multiple = "false"
                    :appId="taskCreateForm.app"
                    :businessId="taskCreateForm.taskId"
                    :categoryId="taskCreateForm.businessType"
                    @fileQueued="handleAttachQueued"
                    @uploadError="handleAttachError"
                    @uploadFinished="handleAttachUploadSuccess">
                  </attach-upload>
                </el-form-item>
            </el-col>
            <el-col :span="24"><div class="line"></div></el-col>
            
        </el-row>
    </el-form>
    <!--用户树，调用两次，作废-->
    <!-- <user-tree
        :selectUserDialogVisible="showUserTree"
        :show-inside-outside-tabs="showInsideOutsideTabs"
        :enable-checked-multiple="enableCheckedMultipleUser"
        :selectedUsers = "userData"
        :filterDataUrl = "taskCreateForm.projectId == '' || showType =='user2' ? {} : filterDataUrl"
        @getUserTree = "getUserTree"
        @closeCreateModal ="showUserTree = !showUserTree">
    </user-tree> -->

    <!--负责人用户树-->
    <user-tree
        :selectUserDialogVisible="showUserTree1"
        :show-inside-outside-tabs="false"
        :enable-checked-multiple="false"
        :selectedUsers = "userData"
        :filterDataUrl = "taskCreateForm.projectId == '' ? {} : filterDataUrl"
        @getUserTree = "getUserTree"
        @closeCreateModal ="showUserTree1 = !showUserTree1">
    </user-tree>
    <!--参与人用户树-->
    <user-tree
        :selectUserDialogVisible="showUserTree2"
        :show-inside-outside-tabs="true"
        :enable-checked-multiple="true"
        :selectedUsers = "userData"
        @getUserTree = "getUserTree"
        @closeCreateModal ="showUserTree2 = !showUserTree2">
    </user-tree>
  </div>
</template>
<script>
JZY.locale.add('taskLocale',require('../task.locale'))
import {mapGetters} from 'vuex'
//数据接口文件
import { getCreateTaskId, saveCreateTask, updateTask,  } from '@Main/task/getData'
//项目接口：数据接口文件
import { getProjectListById, getUserListByProjectId, } from '@Main/project/getData'

  export default {
    components: {
    },
    data() {
      //共享人员的验证
      var validateTaskLiableId = (rule, value, callback) => {
        console.info(rule)
        console.info(this.taskCreateForm.taskLiableId)
        console.info(callback)
        if (this.taskCreateForm.taskLiableId === '') {
          callback(new Error('请选择负责人'))
        } else {
          callback();
        }
      };
      return {
        doTaskType:'',//编辑edit，新建create
        editableByRole:{//参与人可编辑的字段是：共享人、描述、提醒、附件
            taskName:false,
            projectName:false,
            projectstageName:false,
            taskLiableId:false,
            betweenDate:false,
            taskParticipantsSharedListDto:false,
            taskUrgentFlag:false,
            taskProgress:false,
        },
        taskCreateForm: {//表单项
          taskId:'',//任务id，业务id
          taskName: '',
          projectId:this.projectId,//关联项目id
          projectName:this.projectName,//关联项目
          projectstageId:'',//关联项目的阶段id
          projectstageName:'',//关联项目的阶段
          taskLiableId:'',//负责人
          taskLiableName:'',
          betweenDate:[],
          taskParticipantsSharedListDto:{//参与人
            personList: []
          },
          taskSharedListDto:{//共享人
            personList:[],
            roleList:[],
            departmentList:[]
          },
          taskUrgentFlag: 0,
          taskProgress: 0,
          describe: '', //描述
          advanceTime:0, //提醒时间
          remindTime:'09:00', //提醒时间（分钟）
          warmListSelected:[0],//提醒人list

          app:1,//系统id，附件上传用
          businessType:1,//附件分类id，附件上传用
          fileList:'', //附件上传，发给后端的，作废
        },
        taskCreateRules: {//表单验证规则
          taskName: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
          ],
          taskLiableId:[
            { validator: validateTaskLiableId, required: true,  trigger: 'blur' }
          ],
          betweenDate:[
            { required: true, message: '请选择起止日期',  trigger: 'blur' }
          ],
          taskUrgentFlag:[
            { required: true, message: '请选择紧急程度', trigger: 'change' }
          ],
        },

        /*多棵树*/
        // filterDataUrl:{
        //   host:'GLOBAL.YANG_NING',
        //   type:'get',
        //   url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectId/'
        // },//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树
        showInsideOutsideTabs:true,//false:不可选外部人员；true:都可以选择
        enableCheckedMultipleUser:true,//false:单选；true:多选
        showUserTree:false,
        showUserTree1:false,
        showUserTree2:false,
        userData :[],//传入树组件、接受树组件返回的数据
        showType:'',//区分当前操作的变量

        showUser1:[],//负责人临时数组
        showUser2:[],//参与人临时数组

        //用户树-结束

        //组合树-开始
        groupTreeData:{ //共享人临时对象
            deptList:[],//已选择的部门
            roleList:[],//已选择的角色
            userList:[]//已选择的用户
        },
        //组合树-开始
        groupTreeDataCopy:{ //共享人临时对象
            deptList:[],//已选择的部门
            roleList:[],//已选择的角色
            userList:[]//已选择的用户
        },
        isAttachUploadFinished:false,//附件上传
        // groupTreeData:{ //共享人临时对象
        //     deptList:[{//已选择的部门
        //         sid:'1002',
        //         name:'市场部'
        //     },{
        //         sid:'1003',
        //         name:'人事部'
        //     }],
        //     roleList:[{//已选择的角色
        //       roleId:'1003',
        //       roleName:'销售经理'
        //     }],
        //     userList:[{//已选择的用户
        //         // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
        //         sid:'1000',
        //         name:'创建者'
        //     }],
        // },

        projectList:[],//关联项目
        // projectList:[{//关联项目
        //     projectName:'项目一',
        //     sid:'beijing'
        // },{
        //     projectName:'项目二',
        //     sid:'shanghai'
        // },{
        //     projectName:'项目三',
        //     sid:'tianjin'
        // }],
        // projectstageList:[{//关联项目阶段
        //     nprojectstageName:'阶段一',
        //     sid:'beijing'
        // },{
        //     nprojectstageName:'阶段二',
        //     sid:'shanghai'
        // },{
        //     nprojectstageName:'阶段三',
        //     sid:'tianjin'
        // }],
        regionClass:['default','warning','very_warning'],//紧急程度可选class，正常、紧急、非常紧急
        regionSelectedClass:'default',//紧急程度已选择的标识class

        fromProject:false,//是否从项目打开此页面


        //负责人，只能选择内部联系人
        selectedForTaskLiable:{//已选负责人-混合树入参
          userList:[]
        },
        selectedForTaskLiableCoyp:{//混合树输出已选的负责人，缓存用
          userList:[]
        },
        tagButtonsForTaskLiable:['user'],
        activeTabForTaskLiable:'user',//初始化激活的tab标签
        filterDataUrl:{
          host:'GLOBAL.YANG_NING',
          type:'get',
          url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/'
        },//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树

        //参与人
        selectedForJoinUser:{//已选参与人-混合树入参
          userList:[],
          userOutsideList:[]
        },
        selectedForJoinUserCoyp:{//混合树输出已选的参与人，缓存用
          userList:[],
          userOutsideList:[]
        },
        tagButtonsForJoinUser:['user','userOutside'],
        activeTabForJoinUser:'user',//初始化激活的tab标签

        //共享人
        selectedForSharedUser:{//已选共享人-混合树入参
          userList:[],
          deptList:[],
          roleList:[],
          userOutsideList:[]
        },
        selectedForSharedUserCoyp:{//混合树输出已选的共享人，缓存用
          userList:[],
          deptList:[],
          roleList:[],
          userOutsideList:[]
        },
        tagButtonsForSharedUser:['user','dept','role','userOutside'],
        activeTabForSharedUser:'dept',//初始化激活的tab标签
        
      }
    },
    props: {
      taskInfo:{
        type:Object,
        default:function(){
          return {}
        }
      },
      random:{//随机书，解决二次打开组件，init方法不执行的bug
        type:Number,
        default:0
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
      ...mapGetters({
          session:'session'
      })
    },
    filters:{
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //根据选择的项目，设置项目的id
        setProjectId:function( index ){
          if(index !== ''){
            console.info(this.projectList[index].sid)
            console.info(this.projectList[index].projectName)

            this.taskCreateForm.projectId = this.projectList[index].sid
            this.taskCreateForm.projectName = this.projectList[index].projectName

            //根据已选的项目id获取负责人树的list
            this.getUserListByProjectId(this.taskCreateForm.projectId)
          }else{
            this.taskCreateForm.projectId = ''
            this.taskCreateForm.projectName = ''

            // alert(index+':项目为空')
          }
        },
        //根据选择的项目阶段，设置项目阶段的id
        setProjectstageId:function( id = '' ){
          this.taskCreateForm.projectstageId = id
        },
        //获取新建任务的id
        async getCreateTaskId(){
            let res = await getCreateTaskId()
            if (Object.keys(res[0]).length != 0) {
                this.taskCreateForm.taskId = res[0].taskId
                this.taskCreateForm.app = res[0].app
                this.taskCreateForm.businessType = res[0].businessType
            }
        },
        //负责人，接收混合树组件的返回值
        getDataFromTreeForTaskLiable( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          this.selectedForTaskLiableCoyp = JZY.u.deepExtend( {}, obj )

          //没有选择负责人
          if ( this.selectedForTaskLiableCoyp.userList.length === 0 ) {
            this.taskCreateForm.taskLiableId = ''
            this.taskCreateForm.taskLiableName = ''
          }else{//选中负责人
            this.taskCreateForm.taskLiableId = this.selectedForTaskLiableCoyp.userList[0]['sid']
            this.taskCreateForm.taskLiableName = this.selectedForTaskLiableCoyp.userList[0]['name']
          }


        },
        //参与人，接收混合树组件的返回值
        getDataFromTreeForJoinUser( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          this.selectedForJoinUserCoyp = JZY.u.deepExtend( {}, obj )
        },
        //共享人，接收混合树组件的返回值
        getDataFromTreeForSharedUser( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          this.selectedForSharedUserCoyp = JZY.u.deepExtend( {}, obj )
        },



        /*多棵树，作废*/
        showClick:function(type){
          this.showType = type
          let userObj = []
          if (type === 'user1') {//负责人
            // this.enableCheckedMultipleUser = false//单选
            // this.showInsideOutsideTabs = false//负责人不可以选择外部联系人，王东宇6.4改
            this.userData = [...this.showUser1]
            this.showUserTree1 = !this.showUserTree1

          }else if(type === 'user2'){//参与人
            // this.enableCheckedMultipleUser = true//多选
            // this.showInsideOutsideTabs = true
            this.userData = [...this.showUser2]
            this.showUserTree2 = !this.showUserTree2
          }
          
        },
        //接收用户树组件的返回值，作废
        getUserTree:function(arr){
          console.info(arr)
          console.info(this.showType)
          if(this.showType === 'user1'){//负责人
            this.showUser1 = [...arr]
            this.taskCreateForm.taskLiableId = this.showUser1[0].sid
            this.taskCreateForm.taskLiableName = this.showUser1[0].name
          }else if(this.showType === 'user2'){//参与人
            this.showUser2 = [...arr]
            this.taskCreateForm.taskParticipantsSharedListDto.personList =this.showUser2.map((item) => {
                    return {sharedshowId:item.sid,sharedshowName:item.name,sharedshowImid:item.imUserId,outType:item.isInside=='inside'?'0':'1'}
                })
            // console.info("this.showUser2",this.showUser2.map((item) => {
            //         return {sharedshowId:item.sid,sharedshowName:item.name,sharedshowImid:item.imUserId,outType:item.isInside=='inside'?'0':'1'}
            //     }))
          }
          console.info(this.showUser1)
          console.info(this.showUser2)
        },
        //删除用户tag的事件，作废
        deleteUser(sid,type) {
          if(type === 'user1'){
            this.showUser1 = this.showUser1.filter(function(item) {
              return item.sid != sid;
            });
            //设置负责人
            this.taskCreateForm.taskLiableId = ''
            this.taskCreateForm.taskLiableName = ''
          }else if(type === 'user2'){
            this.showUser2 = this.showUser2.filter(function(item) {
              return item.sid != sid;
            });
            //设置参与人
            this.taskCreateForm.taskParticipantsSharedListDto.personList=[]
            this.showUser2.forEach((item) =>{
                this.taskCreateForm.taskParticipantsSharedListDto.personList.push({
                    sharedshowId:item.sid,
                    sharedshowName:item.name,
                    sharedshowImid:item.hasOwnProperty('imUserId')?item.imUserId : item.sharedshowImid,
                    outType:item.isInside=='inside'?'0':'1'
                })
            })
           
          }
          console.info(this.showUser2)
          console.info("this.taskCreateForm.taskParticipantsSharedListDto.personList",this.taskCreateForm.taskParticipantsSharedListDto.personList)
          console.info(this.userFormat(this.showUser2))
        },
        //接收组合树组件的返回值，作废
        getDataFromGroupTree:function(obj){
            console.info("getDataFromGroupTree")
            console.info(obj)
            this.groupTreeData = JZY.u.deepExtend({},obj)
            console.info(this.groupTreeData)
            if (Object.keys(obj).length != 0 ) {
              //共享人
              let deptTemp = [],
                  roleTemp = [],
                  userTemp = []
// debugger
              obj.deptList.forEach((item) =>{
                  deptTemp.push({
                      sharedshowId:item.sid,
                      sharedshowName:item.name
                  })
              })
              obj.roleList.forEach((item) =>{
                  roleTemp.push({
                      sharedshowId:item.roleId,
                      sharedshowName:item.roleName
                  })
              })
              obj.userList.forEach((item) =>{
                  userTemp.push({
                      sharedshowId:item.sid,
                      sharedshowName:item.name,
                      sharedshowImid:item.imUserId,
                      outType:item.isInside=='inside'?'0':'1'
                  })
              })
              this.taskCreateForm.taskSharedListDto = {
                  departmentList:[...deptTemp],
                  roleList:[...roleTemp],
                  personList:[...userTemp]
              }
            }
            // debugger
            console.info(this.taskCreateForm.taskSharedListDto)
        },
        //格式化人员列表，返回人员sid和name，作废
        userFormat:function(oldObj){
            return oldObj.map((item)=>{
                return item.sid,item.name
            });
        },
        //选择任务的负责人，作废
        selectTasker: function () {
            alert('获取组织架构')
        },
        //共享人、参与人的删除事件
        deleteOneUser(nameType,tag) {
            this.form[nameType].splice(this.form[nameType].indexOf(tag), 1);
        },
        //文件上传-上传中
        handleAttachQueued(){
          // alert('add one new attach file')
          this.isAttachUploadFinished=false
        },
        //文件上传-成功
        handleAttachUploadSuccess(res){
            this.isAttachUploadFinished=true
          // alert('全部上传成功,返回信息请查看控制台显示')
          // console.log('附件上传成功返回信息：',res)
        },
        //文件上传-出错
        handleAttachError(){
          this.$message('附件上传出错啦')
        },

        //文件上传事件，作废
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        //紧急程度选择事件
        regionSelected(val){
            this.regionSelectedClass = this.regionClass[val];
        },
        //提交表单
        submitTaskCreateForm(){
            console.info(this.taskCreateForm)
            this.$refs.taskCreateForm.validate(async (valid) => {
                if (valid) {

                  //负责人
                  // this.taskCreateForm.taskLiableId = this.selectedForTaskLiableCoyp.userList[0]['sid']
                  // this.taskCreateForm.taskLiableName = this.selectedForTaskLiableCoyp.userList[0]['name']
                  

                  //参与人
                  this.taskCreateForm.taskParticipantsSharedListDto.personList = []
                  //参与人，内部
                  this.selectedForJoinUserCoyp.userList && this.selectedForJoinUserCoyp.userList.forEach((item)=>{
                    this.taskCreateForm.taskParticipantsSharedListDto.personList.push({
                        sharedshowId:item.sid,
                        sharedshowName:item.name,
                        sharedshowImid:item.imUserId,
                        outType:'0'
                    })
                  })
                  //参与人，外部
                  this.selectedForJoinUserCoyp.userOutsideList && this.selectedForJoinUserCoyp.userOutsideList.forEach((item)=>{
                    this.taskCreateForm.taskParticipantsSharedListDto.personList.push({
                        sharedshowId:item.sid,
                        sharedshowName:item.name,
                        sharedshowImid:item.imUserId,
                        outType:'1'
                    })
                  })

                  //共享人
                  this.taskCreateForm.taskSharedListDto = {
                    personList:[],
                    departmentList:[],
                    roleList:[]
                  }
                  //共享人，内部
                  this.selectedForSharedUserCoyp.userList && this.selectedForSharedUserCoyp.userList.forEach((item)=>{
                    this.taskCreateForm.taskSharedListDto.personList.push({
                        sharedshowId:item.sid,
                        sharedshowName:item.name,
                        sharedshowImid:item.imUserId,
                        outType:'0'
                    })
                  })
                  //共享人，外部
                  this.selectedForSharedUserCoyp.userOutsideList && this.selectedForSharedUserCoyp.userOutsideList.forEach((item)=>{
                    this.taskCreateForm.taskSharedListDto.personList.push({
                        sharedshowId:item.sid,
                        sharedshowName:item.name,
                        sharedshowImid:item.imUserId,
                        outType:'1'
                    })
                  })
                  //共享人，部门
                  this.selectedForSharedUserCoyp.deptList && this.selectedForSharedUserCoyp.deptList.forEach((item)=>{
                    this.taskCreateForm.taskSharedListDto.departmentList.push({
                        sharedshowId:item.sid,
                        sharedshowName:item.name
                    })
                  })
                  //共享人，角色
                  this.selectedForSharedUserCoyp.roleList && this.selectedForSharedUserCoyp.roleList.forEach((item)=>{
                    this.taskCreateForm.taskSharedListDto.roleList.push({
                        sharedshowId:item.sid,
                        sharedshowName:item.name
                    })
                  })


                  const groupObj = {
                    taskUrgentFlag:this.taskCreateForm.taskUrgentFlag.toString(),
                    beginDate:this.taskCreateForm.betweenDate.length > 0 ? this.taskCreateForm.betweenDate[0]+' 00:00:00' : '',
                    endDate:this.taskCreateForm.betweenDate.length > 1 ? this.taskCreateForm.betweenDate[1]+' 23:59:59' : '',
                    isremindCreateperson:this.taskCreateForm.warmListSelected.indexOf(0) !== -1,
                    isremindLiable:this.taskCreateForm.warmListSelected.indexOf(1) !== -1,
                    isremindAffiliated:this.taskCreateForm.warmListSelected.indexOf(2) !== -1,
                  }
                  let params = JZY.u.deepExtend({},this.taskCreateForm,groupObj)
                  console.info("params",params)
                  // debugger
                  try{
                    let result =''
                    if (this.doTaskType === 'create') {//创建任务
                      result = await saveCreateTask(params)
                        await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                    }else{//编辑任务
                      
                      if(this.taskInfo.isCreatePersonLiable == true){//是否是创建人or负责人

                        result = await updateTask(params)
                          await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))

                      }else if(this.taskInfo.isAffiliated == true){//是否是参与人
                        const getParams = ['taskId','taskSharedListDto','taskSharedListDto','describe','advanceTime','remindTime','fileList']//设置可以更新的字段，回传后端
                        let newParams = {}
                        Object.keys(params).forEach((item)=>{
                          if (getParams.includes(item)) {
                            newParams[item] = params[item]
                          }
                        })
                        newParams = JZY.u.deepExtend({},newParams,{
                          isremindCreateperson:this.taskCreateForm.warmListSelected.indexOf(0) !== -1,
                          isremindLiable:this.taskCreateForm.warmListSelected.indexOf(1) !== -1,
                          isremindAffiliated:this.taskCreateForm.warmListSelected.indexOf(2) !== -1,
                        })
                        console.info(newParams)
                        result = await updateTask(newParams)
                          await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                        //清空参与人是否可编辑的控制
                        Object.keys(this.editableByRole).forEach((item)=>{
                          this.editableByRole[item] = false
                        })

                      }else{ //管理员？
                        result = await updateTask(params)
                          await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                      }

                    }
                    console.info(result[0])
                    if (result[0] == 1) {
                        this.$refs.taskCreateForm.resetFields()//置空表单项

                        this.taskCreateForm.projectName = ''
                        this.showUser2=[]
                        
                        if(this.fromProject){//刷新项目的动态
                          JZY.s.eventBus.$emit('UPDATE_PROJECT_DYNAMIC')
                        }
                        

                        //清空如下表单值
                        this.selectedForTaskLiable = {//已选负责人-混合树入参
                          userList:[]
                        }
                        this.selectedForTaskLiableCoyp = {//混合树输出已选的负责人，缓存用
                          userList:[]
                        }
                        this.filterDataUrl = {
                          host:'GLOBAL.YANG_NING',
                          type:'get',
                          url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/'
                        }//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树

                        //参与人
                        this.selectedForJoinUser = {//已选参与人-混合树入参
                          userList:[],
                          userOutsideList:[]
                        }
                        this.selectedForJoinUserCoyp = {//混合树输出已选的参与人，缓存用
                          userList:[],
                          userOutsideList:[]
                        }

                        //共享人
                        this.selectedForSharedUser = {//已选共享人-混合树入参
                          userList:[],
                          deptList:[],
                          roleList:[],
                          userOutsideList:[]
                        }
                        this.selectedForSharedUserCoyp = {//混合树输出已选的共享人，缓存用
                          userList:[],
                          deptList:[],
                          roleList:[],
                          userOutsideList:[]
                        }


                        this.$message({
                          type: 'success',
                          message: '基本信息保存成功'
                        });
                        this.$emit('closeCreateModal','saveSuccess')
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
        //根据人员id获取项目list
        async getlistProjectListById ( sid = '' ){
          let res = await getProjectListById( sid )
          console.info(res[0])
          if (res[0].length > 0) {
            this.projectList = [...res[0]]
          }
          console.info(this.projectList)
        },
        //根据已选项目的id获取负责人可选范围内的user树
        getUserListByProjectId ( projectId = '' ){
          
          this.filterDataUrl.url = '/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/' + projectId
          // alert(this.filterDataUrl.url)

          // let res = await getUserListByProjectId( projectId )
          // console.info(res[0])
          // if (res[0].length > 0) {
          //   // this.projectList = [...res[0]]
          // }
          // console.info(this.projectList)
        },
        //初始化数据
        init :function(){
          console.info("this.taskInfo",this.taskInfo)
          if (Object.keys(this.taskInfo).length > 0 && this.taskInfo.taskId) {//编辑任务
              this.doTaskType = 'edit'

              if(this.taskInfo.isCreatePersonLiable == true){//是否是创建人or负责人
                Object.keys(this.editableByRole).forEach((item)=>{
                  this.editableByRole[item] = false
                })
              }else if(this.taskInfo.isAffiliated == true){//是参与人
                Object.keys(this.editableByRole).forEach((item)=>{
                  this.editableByRole[item] = true
                })
                console.info(this.editableByRole)
              }else{
                //管理员？清空参与人是否可编辑的控制
                Object.keys(this.editableByRole).forEach((item)=>{
                  this.editableByRole[item] = false
                })
              }
              //初始化获取关联项目list
              this.getlistProjectListById( this.taskInfo.taskLiableId )

              //负责人
              // this.showUser1 = [{
              //     sid:this.taskInfo.taskLiableId,
              //     name:this.taskInfo.taskLiableName
              // }]
              this.selectedForTaskLiable = {
                userList:[]
              }
              this.selectedForTaskLiable.userList.push({
                  sid:this.taskInfo.taskLiableId,
                  name:this.taskInfo.taskLiableName
              })
              this.selectedForTaskLiableCoyp = JZY.u.deepExtend( {}, this.selectedForTaskLiable )

              //参与人
              // this.showUser2 = [...this.taskInfo.taskParticipantsSharedListDto.personList]
              this.selectedForJoinUser = {
                userList:[],
                userOutsideList:[]
              }
              this.taskInfo.taskParticipantsSharedListDto.personList && this.taskInfo.taskParticipantsSharedListDto.personList.forEach((item) =>{
                  if ( item.outType == '0' ) {//内部人员
                    this.selectedForJoinUser.userList.push({
                        sid:item.sharedshowId,
                        name:item.sharedshowName,
                        imUserId:item.sharedshowImid,
                        isInside:'0'
                    })
                  }else{//外部人员
                    this.selectedForJoinUser.userOutsideList.push({
                        sid:item.sharedshowId,
                        name:item.sharedshowName,
                        imUserId:item.sharedshowImid,
                        isInside:'1'
                    })
                  }

                  this.selectedForJoinUserCoyp = JZY.u.deepExtend( {}, this.selectedForJoinUser )
                  
              })
              //共享人
              this.selectedForSharedUser = {
                userList:[],
                deptList:[],
                roleList:[],
                userOutsideList:[]
              }

              this.taskInfo.taskSharedListDto.personList.forEach((item) =>{
                  if ( item.outType == '0' ) {//内部人员
                    this.selectedForSharedUser.userList.push({
                        sid:item.sharedshowId,
                        name:item.sharedshowName,
                        imUserId:item.sharedshowImid,
                        isInside:'0'
                    })
                  }else{//外部人员
                    this.selectedForSharedUser.userOutsideList.push({
                        sid:item.sharedshowId,
                        name:item.sharedshowName,
                        imUserId:item.sharedshowImid,
                        isInside:'1'
                    })
                  }
              })
              this.taskInfo.taskSharedListDto.departmentList.forEach((item) =>{
                  this.selectedForSharedUser.deptList.push({
                      sid:item.sharedshowId,
                      name:item.sharedshowName
                  })
              })
              this.taskInfo.taskSharedListDto.roleList.forEach((item) =>{
                  this.selectedForSharedUser.roleList.push({
                      roleId:item.sharedshowId,
                      roleName:item.sharedshowName
                  })
              })

              this.selectedForSharedUserCoyp = JZY.u.deepExtend( {}, this.selectedForSharedUser )



              //作废
              // let deptTemp = [],
              //     roleTemp = [],
              //     userTemp = []

              // this.taskInfo.taskSharedListDto.departmentList.forEach((item) =>{
              //     deptTemp.push({
              //         sid:item.sharedshowId,
              //         name:item.sharedshowName
              //     })
              // })
              // this.taskInfo.taskSharedListDto.roleList.forEach((item) =>{
              //     roleTemp.push({
              //         roleId:item.sharedshowId,
              //         roleName:item.sharedshowName
              //     })
              // })
              // this.taskInfo.taskSharedListDto.personList.forEach((item) =>{
              //     userTemp.push({
              //         sid:item.sharedshowId,
              //         name:item.sharedshowName,
              //         imUserId:item.sharedshowImid,
              //         isInside:item.outType == '0' ? 'inside' : 'outside',
              //     })
              // })
              // this.groupTreeData = {
              //     deptList:[...deptTemp],
              //     roleList:[...roleTemp],
              //     userList:[...userTemp]
              // }
              // this.groupTreeDataCopy = {
              //     deptList:[...deptTemp],
              //     roleList:[...roleTemp],
              //     userList:[...userTemp]
              // }

              // console.info(this.groupTreeData)

              const returnObj = {
                  taskUrgentFlag:Number(this.taskCreateForm.taskUrgentFlag),
                  betweenDate:[this.taskInfo.beginDate ,this.taskInfo.endDate],
                  warmListSelected:[+this.taskInfo.isremindCreateperson ? 0:'', +this.taskInfo.isremindLiable ? 1:'',+this.taskInfo.isremindAffiliated  ? 2:''],
              }
              this.taskCreateForm = JZY.u.deepExtend({},this.taskInfo,returnObj)


              this.filterDataUrl.url='/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/'+this.taskInfo.projectId

              console.info("this.taskCreateForm=-===",this.taskCreateForm)

          }else{//新建任务
              this.doTaskType = 'create'
              //负责人，作废
              // this.showUser1 = [{//从vuxe里获取当前登陆人的sid和name
              //     sid:this.session.tenantInfo.userId,
              //     name:this.session.tenantInfo.userName
              // }]

              //负责人
              this.selectedForTaskLiable.userList=[{
                  sid:this.session.tenantInfo.userId,
                  name:this.session.tenantInfo.userName
              }]

              this.selectedForTaskLiableCoyp = JZY.u.deepExtend( {},this.selectedForTaskLiable )

              

              this.taskCreateForm.taskLiableId = this.session.tenantInfo.userId
              this.taskCreateForm.taskLiableName = this.session.tenantInfo.userName
              //初始化获取关联项目list
              this.getlistProjectListById(this.session.tenantInfo.userId)

              //作废
              // this.groupTreeData = { //共享人临时对象
              //     deptList:[],//已选择的部门
              //     roleList:[],//已选择的角色
              //     userList:[]//已选择的用户
              // },

              // this.groupTreeDataCopy = {
              //     deptList:[],
              //     roleList:[],
              //     userList:[]
              // }

              
              this.filterDataUrl.url='/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/'+this.taskCreateForm.projectId

              this.getCreateTaskId()//获取新建任务的id
              this.$nextTick(function () {
                  this.$refs.taskCreateForm.resetFields()//置空表单项

                  //在项目中创建任务，绑定项目id
                  this.taskCreateForm.projectId = this.projectId
                  this.taskCreateForm.projectName = this.projectName

                  //项目中创建任务
                  if (this.projectId!='' && this.projectName!='') {
                    this.fromProject = true
                  }
                 // console.log(this.$el.textContent) // => '更新完成'
              })

          }

          console.info("this.taskCreateForm")
          console.info(this.taskCreateForm)
        },
        
    },
    created(){
      this.init()
    },
    mounted(){
        // console.info(this.$refs)
        // debugger
    },
    watch: {
      'taskInfo':{
          handler:function(newVal,oldVal){
              // console.info(newVal)
              // console.info(oldVal)
              this.init()
          },
          deep:true
      },
      'taskCreateForm.taskLiableId':function(newVal,oldVal){
        //初始化获取关联项目list
        console.info(newVal)
        console.info(oldVal)
        newVal && this.getlistProjectListById( newVal )
      },
      random(newVal,oldVal){
        this.init()
      },
      //需过滤掉此选择组件的clearable事件
      'taskCreateForm.projectName':function(newVal,oldVal){
        //初始化获取关联项目list
        console.info(newVal)
        console.info(oldVal)
        if (newVal == '') {
          this.taskCreateForm.projectId = ''
        }

      },
        'showUser1':{
            handler:function (curVal) {
//                    console.log("aD");
                let length = curVal.length;
                let  validtaskLiableId;
                console.log(length,"sadsa");
                this.$refs['taskCreateForm'].validateField('taskLiableId',(valid) => {
                    validtaskLiableId = valid?false:true;
                });

//                    console.log(validGroupData);
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
              
    }
  }
</script>
<style lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.create_page{
    overflow: hidden;
    .task_create_form{
        // .el-form-item__label,.el-form-item__content{
        //     font-size: 15px;
        //     color: $color;
        // }
        .el-range-editor.el-input__inner{
            // width:260px;
            width:100%;
        }
        .el-date-editor.el-input{
            width: 140px;
        }
        .task_name.el-input,.project_name.el-select{
            width: 100%;
        }
        .ql-toolbar.ql-snow{
            border:none;
            border-bottom:1px solid $borderColor;
            margin-left:-20px;
            margin-right:-20px;
        }
        .ql-container.ql-snow{
            border:none;
            margin-left:-20px;
            margin-right:-20px;
        }
        .region{
            .el-input__inner{
                text-indent:30px;
            }
        }
        .warn_date{
            .el-input{
                width:100px;
                margin-left:8px;
            }
        }
    }
}
</style>
<style scoped lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.create_page{
    // .el-col{
    //     .el-form-item{
    //         margin-top: 12px;
    //         margin-bottom: 12px;
    //         .el-tag + .el-tag {
    //             margin-left: 10px;
    //         }
    //     }
    // }
    .border_all{
        // padding-left: 20px;
        // padding-right: 20px;
        // border:1px solid $borderColor;
        // border-radius:4px;
        // margin-bottom: 20px;
    }
    .line{
        // margin-left: -20px;
        // margin-right: -20px;
        // border-top: 1px solid $borderColor;
    }
    // .task_name{
    //     input{
    //         border: none;
    //         border-bottom: 1px solid $borderColor;
    //         font-size: 18px;
    //         border-radius: 0px;
    //         padding-left: 0;
    //         color: $color;
    //     }
    // }
    // .process{
    //     margin-top: 3px;
    // }
    // .el-checkbox-group{
    //     height: 40px
    // }
    .file_upload{
        margin-top: 5px;
        label{
            margin-top: 7px;
        }
        .el-upload__tip{
            font-size: 14px;
            color: #999;
            display: inline-block;
            margin-left: 30px;
        }
    }
    // .add_permission{
    //   color: #67C23A;
    //   margin-left:15px;
    //   font-size:18px;
    //   &:hover{
    //     cursor:pointer;
    //   }
    // }
}
.region{

  .region_icon{
      position:absolute;
      left: 20px;
      top: 1px;
      z-index:2;
      
  }
  //弹出层，在根dom下
  .region_html{
      span{
          margin-left:8px;
      }
  }
  .region_circle{ 
      width: 12px; 
      height: 12px; 
      display:inline-block;
      -moz-border-radius: 50px; 
      -webkit-border-radius: 50px; 
      border-radius: 50px; 
  } 
  .default{
      .region_circle{
          background:#eee;
      }
  }
  .warning{
      .region_circle{
          background: #ffba38;
      }
  }
  .very_warning{
      .region_circle{
          background: #e60000;
      }
  }
}
</style>