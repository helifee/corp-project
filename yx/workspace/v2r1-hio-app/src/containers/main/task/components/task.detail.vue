<template>
  <div class="task task_wrap detail">
    <!--页头-->
    <el-row class="row-bg title" justify="space-between">
      <el-col :span="18" class="text_left">
            <span class="task_name">{{form.taskName}}</span>
            <span class="task_state">{{ form.taskStatus | state }}</span>
      </el-col>
      <el-col :span="6" class="text_right">
        <el-dropdown @command="doSelectedCommand" v-if="showOperateButton">
            <el-button type="primary"  size = "small" >
                {{l('{taskLocale.goBackButtons.initName}')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" size="small">
                <el-dropdown-item v-for="(item,index) in goBackButtons" :key="index" :command="item" >
                    {{l('{taskLocale.goBackButtons}')[item]}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button  @click="goback" size="small" style="margin-left:12px;">{{l('{taskLocale.goBackButtons}')[taskReturn]}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="bottom_border"></el-col>
    </el-row>
    <!--表单项-->
    <div class="detail_content">
        <el-form ref="form" label-position="right" label-width="95px" class="form">
            <el-row :gutter="0" class="">
                <el-col :span="24">
                    <!--关联项目-->
                    <el-col :span="24">
                        <el-form-item :label="l('{taskLocale.createTask.form.projectName}')">{{form.projectName}}</el-form-item>
                    </el-col>
                    <!-- <el-col :span="12" class="stage_project">
                        <el-form-item :label="l('{taskLocale.createTask.form.projectstageName}')">{{form.projectstageName}}</el-form-item>
                    </el-col> -->
                </el-col>
                <el-col :span="24">
                    <!--负责人-->
                    <el-col :span="12">
                        <el-form-item :label="l('{taskLocale.createTask.form.taskLiableName}')">
                            {{form.taskLiableName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="l('{taskLocale.createTask.form.startDate}')">
                            <span v-if="form.beginDate">{{form.beginDate | formatDate}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="l('{taskLocale.createTask.form.lastDate}')">
                            <span v-if="form.endDate">{{form.endDate | formatDate}}</span>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-col :span="24"><div class="line"></div></el-col>
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.process}')">
                        <el-row :gutter="0">
                            <el-col :span="16" class="process">
                                <el-progress :percentage="form.taskProgress"></el-progress>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="region">
                    <el-form-item :label="l('{taskLocale.createTask.form.taskUrgentFlag}')" >
                        <span class="region_circle" :style="{background:regionColor[form.taskUrgentFlag]}"></span>
                        <span style="margin-left:10px;">{{ form.taskUrgentFlag | level}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.advanceTimeForDetail}')">
                        <span v-if="form.advanceTime != -1">
                            {{l('{taskLocale.createTask.form.advanceTimeDesc}')}}
                            <span class="selected">
                                <span v-if="form.advanceTime != 0"><em v-text="form.advanceTime"></em>天</span>
                                <em v-text="form.remindTime"></em>
                            </span>
                        </span>
                        <span v-else>
                            不提醒
                        </span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.advanceTimeNameForDetail}')">
                        <span v-for="(item,index) in l('{taskLocale.createTask.form.warmList}')" :key="index" class="selected">
                            <i v-if="form.isremindCreateperson && index === 0 ">{{item}}</i>
                            <i v-if="form.isremindLiable && index === 1">{{item}}</i>
                            <i v-if="form.isremindAffiliated && index === 2">{{item}}</i>
                        </span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-col :span="24"><div class="line"></div></el-col>

            <el-row :gutter="0">
            <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.createTaskByUser}')">
                        <span v-text="form.createPersonName"></span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.createTaskTime}')">
                        <span v-text="form.createDate"></span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.joinUserName}')">
                        <div class="sharedUser">
                            <span
                              v-if="form.taskParticipantsSharedListDto.personList.length > 0"
                              v-for="(tag,index) in form.taskParticipantsSharedListDto.personList">
                              {{tag.sharedshowName}}
                            </span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.sharedUserName}')">
                        <div class="sharedUser">
                            <span
                              v-if="form.taskSharedListDto.departmentList.length > 0"
                              v-for="(tag,index) in form.taskSharedListDto.departmentList"
                              :key="'dept'+index">
                              {{tag.sharedshowName}}
                            </span>
                            <span
                              v-if="form.taskSharedListDto.roleList.length > 0"
                              v-for="(tag,index) in form.taskSharedListDto.roleList"
                              :key="'role'+index">
                              {{tag.sharedshowName}}
                          </span>
                            <span
                              v-if="form.taskSharedListDto.personList.length > 0"
                              v-for="(tag,index) in form.taskSharedListDto.personList"
                              :key="'user'+index">
                              {{tag.sharedshowName}}
                          </span>
                      </div>
                    </el-form-item>
                </el-col>
                
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.describe}')">
                        <div class="desc">
                            <pre>{{form.describe}}</pre>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                
                <!--附件-->
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.file}')" class="file_upload">
                      <attach-upload
                        ref="attachUpload"
                        :required="false"
                        :readonly="true"
                        :appId="form.app"
                        :businessId="form.taskId"
                        :categoryId="form.businessType">
                      </attach-upload>
                        <!-- <span v-for="(item,index) in form.fileList3" :key="index" class="file">
                            {{item.name}}
                        </span> -->
                    </el-form-item>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
            </el-row>
        </el-form>
    </div>
    <el-row>
      <el-col :span="24" class="bottom_border_16"></el-col>
    </el-row>
    <div class="task_comment">
        <smart-comment
            :businessId="form.taskId"
            :commentUserId = 'form.taskLiableId'
            :startComment = " fromPage !== 'set' "
            business_type="0">
        </smart-comment>
    </div>
    <!--右侧弹窗，创建、编辑任务-->
      <!-- <task-right-modal :dialogVisible = "dialogVisible" @closeCreateModal="changeDialogVisible"></task-right-modal> -->
    <task-right-modal :dialogVisible = "dialogVisible" :taskInfo = "form" @closeCreateModal="changeDialogVisible"></task-right-modal>
  </div>
</template>
<script>
  JZY.locale.add('taskLocale',require('../task.locale'))
  import moment from 'moment'
  import taskRightModal from '@Main/task/components/task.rightModal.vue'
  //数据接口文件
  import { getTaskInfoById, getTaskAuth, deleteTask, updateTaskStatus, setFollow, setCancelFollow, } from '@Main/task/getData'

  export default {
    components: {
        taskRightModal,
    },
    data() {
      return {
        dialogVisible:false,
        goBackButtons:[],//任务的操作按钮
        taskReturn:'taskReturn',//任务返回按钮
        regionColor:['#eee','#ffba38','#e60000'],
        form: {
            taskId:'',
            taskStatus:'2',
            taskName: '',
            projectId:'',//关联项目id
            projectName:'',//关联项目id
            projectstageId:'',//关联项目的阶段id
            projectstageName:'',//关联项目的阶段
            taskLiableId:'',//负责人
            taskLiableName:'',
            isfollow:false,//是否已关注
            betweenDate:[],
            beginDate:'',
            endDate:'',
            taskParticipantsSharedListDto:{//参与人
                personList: []
            },
            taskSharedListDto:{//共享人
                personList:[],
                roleList:[],
                departmentList:[]
            },
            taskUrgentFlag: '0',
            taskProgress: 0,
            describe: '', //描述
            advanceTime:0, //提醒时间
            remindTime:'', //提醒时间（分钟）
            warmListSelected:[],//提醒人list
            app:1,//系统id，附件上传用
            businessType:1,//附件分类id，附件上传用
            // fileList3: [{//附件
            //     name: 'food.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            //     status: 'finished'
            // }, {
            //     name: 'food2.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            //     status: 'finished'
            // }],
            createPersonName:'',//创建人
            createDate:'',//创建时间
        },
        fromPage:'',//从哪个页面打开的详情页
        showOperateButton:true,//项目下的任务，不可管理
      }
    },
    created(){
        this.initData();
    },
    computed: {
        
    },
    props:{
        taskId:{
            type:String,
            default:''
        },
    },
    filters:{
        //任务等级：0正常、1紧急、2非常紧急，小红点的处理
        level(value){
            switch (value) {
                case '0':
                    return '正常';
                case '1':
                    return '紧急';
                case '2':
                    return '非常紧急';
                default:
                    return '-';
            }
        },
        state (value){
        //任务状态 ：0未完成、1已完成、2已关闭、3超期
            switch (value) {
                case '0':
                    return '未完成';
                case '1':
                    return '已完成';
                case '2':
                    return '已关闭';
                case '3':
                    return '超期';
                default:
                    return '--';
            }
        },
        //日期格式化yy-mm-dd
        formatDate (value){
            return moment(value).format("YYYY-MM-DD")
        },
    },
    methods: {
        //初始化获取数据
        initData(){
            //从页面传递过来的参数，或者地址栏里获取
            this.form.taskId = this.taskId || this.$route.params.id
            console.info(this.taskId)
            console.info(this.form.taskId)
        },
        //获取任务详情
        async taskInfo(){
            let res = await getTaskInfoById(this.form.taskId)
            console.info(res[0])
            if (Object.keys(res[0]).length > 0) {
                this.form = JZY.u.deepExtend({} ,this.form ,res[0])

                this.getTaskAuth()//获取此任务的按钮权限
            }
            console.info(this.form)
        },
        //查询任务对应操作权限
        async getTaskAuth(){
            let res = await getTaskAuth(this.form.taskId)
            // console.info(res[0])
            if (Object.keys(res[0]).length > 0) {
                this.taskReturn = res[0]['taskReturn'] ? 'taskReturn' :  ''//过滤掉返回按钮

                this.goBackButtons = [] //清空
                Object.keys(res[0]).forEach((item)=>{
                    item !== 'taskReturn' && res[0][item] && this.goBackButtons.push(item)
                })
                if (this.fromPage === 'set') {//任务管理，不显示关注和取消关注的按钮
                    if (this.goBackButtons.indexOf('unfollow') !== -1) {//未关注
                        this.goBackButtons.splice(this.goBackButtons.indexOf('unfollow'),1)//删除未关注
                    }else if(this.goBackButtons.indexOf('follow') !== -1){
                        this.goBackButtons.splice(this.goBackButtons.indexOf('follow'),1)//删除关注
                    }
                    if ( this.form.projectId !== '') {//项目下的任务，不可管理
                        this.showOperateButton=false
                        this.goBackButtons = []

                    }
                    
                }else{
                    // console.info(this.goBackButtons)
                    if (this.goBackButtons.indexOf('follow') === -1) {//未关注
                        this.goBackButtons.splice(1, 0, 'follow')//插入取消关注
                    }else{
                        this.goBackButtons.splice(this.goBackButtons.indexOf('follow'),1)//删除关注
                        this.goBackButtons.splice(1, 0, 'unfollow')//插入取消关注
                    }
                }
            }
            // console.log(this.goBackButtons)
        },
        //对任务，执行相应的操作
        doSelectedCommand(command) {
            switch(command){
                case 'update': //编辑
                    this.editTask()
                    break;
                case 'follow': //关注
                    this.setTaskFollow(true)
                    break;
                case 'unfollow': //取消关注
                    this.setTaskFollow(false)
                    break;
                case 'taskFinish': //任务完成
                    this.updateTaskStatus('1')
                    break;
                case 'taskClose': //任务关闭
                    this.updateTaskStatus('2')
                    break;
                case 'taskActivation': //任务激活
                    this.updateTaskStatus('4')
                    break;
                case 'taskNotFinish': //任务未完成
                    this.updateTaskStatus('5')
                    break;
                case 'taskDelete': //任务删除
                    this.deleteTask()
                    break;
                default:
                    alert(command)
            }
        },
        //返回上一级
        goback (){
            this.$router.go(-1);
        },
        //编辑任务
        editTask(){
            this.dialogVisible = true
        },
        //关注任务
        async setTaskFollow( bool = true){
            // console.log(bool ? '关注操作':"取消关注")
            if (bool === true) {//关注
                let res = await setFollow(this.form.taskId)
                if (res[0] == 1 ) {
                    this.$message({
                        type: 'success',
                        message: '关注成功'
                    });
                    this.getTaskAuth()
                }
            }else{//取消关注
                let res = await setCancelFollow(this.form.taskId)
                if (res[0] == 1 ) {
                    this.$message({
                        type: 'success',
                        message: '取消关注成功'
                    });
                    this.getTaskAuth()
                }
            }
        },
        //改变任务状态
        async updateTaskStatus(type = ''){
            let res = await updateTaskStatus(this.form.taskId , type)
            if (res[0] == 1) {
                this.$message({
                    message: '此任务状态修改成功',
                    type: 'success'
                })
                this.taskInfo()//获取任务详情
                this.getTaskAuth()//获取操作权限按钮
            }else{
                this.$message({
                    message: '修改失败',
                    type: 'warning'
                })
            }     
        },
        //删除任务
        async deleteTask(){
            const h = this.$createElement;
            this.$msgbox({
              title: '消息',
              message: h('p', null, [
                h('p', null, '确认删除 '),
                h('i', { style: 'color: red' }, '该任务数据都会被删除'),
                h('p', null, '你还要继续吗？ ')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: async (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '执行中...';
                  let res = await deleteTask( this.form.taskId )
                    if (res[0] == 1) {
                        instance.confirmButtonLoading = false
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        done();
                        setTimeout(() => {
                            this.goback ()
                        }, 300);
                        // this.$router.push({path:'/task'})
                    }else{
                        this.$message({
                            message: '删除任务失败',
                            type: 'error'
                        });
                    }
                } else {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                  done();
                }
              }
            }).then(action => {
              // this.$message({
              //   type: 'info',
              //   message: 'action: ' + action
              // });
            });
        },
        //子组件回调，关闭父组件弹出窗
        changeDialogVisible:function(type = ''){
          this.dialogVisible = false
          console.info(type)
          if (type === 'refleshTable') {//刷新table
            this.taskInfo()//获取任务详情
            this.$refs.attachUpload.getFilesList();//获取新的附件列表
          }
        },
    },
    mounted(){
        this.taskInfo()//获取任务详情
        this.fromPage = this.$route.query.fromPage
    },
    watch: {
    }
  }
</script>
<style lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.detail{
    // .el-form-item__label,.el-form-item__content{
    //     font-size: 15px;
    //     color: $color;
    // }
    .el-date-editor.el-input,.el-input{
        width: 140px;
    }
    .el-form-item__content{


    }
}
</style>
<style scoped lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.detail{
    // position: relative;
    .operate_buttons{
        // width: 82.333%;
        // position: fixed;
        // top: 70px;
        width: 100%;
        // position: absolute;
        top: 0px;
        right:0px;
        height:40px;
        line-height:40px;
        background-color:$backgroundColor;
        z-index:1;
    }
    .task_name{
        @include sc(14px,$theme-black-title)
    }
    .task_state{
        @include sc(12px,$theme-red)
        margin-left:8px;
    }
    .detail_content{
        padding: 24px 0px;
        background-color: #fff;
        .form{
            .el-form-item{
                margin-bottom:0;
            }
            .sharedUser{
                line-height: 20px;
                margin-top: 10px;
                display: inline-block;
                span{
                    display: inline-block;
                    & + span{
                        margin-left:8px;
                    }
                }
            }
            .desc{
                margin-top:10px;
                line-height:20px;
                span{
                    line-height: 20px;
                    margin-top: 10px;
                    display: inline-block;
                }
            }
            // .el-form-item{
            //     margin-top: 12px;
            //     margin-bottom: 12px;
            //     .el-tag + .el-tag {
            //         margin-left: 10px;
            //     }
            // }
            // .border_all{
            //     padding-left: 20px;
            //     padding-right: 20px;
            //     border:1px solid $borderColor;
            //     border-radius:4px;
            //     margin-bottom: 20px;
            // }
            // .line{
            //     margin-left: -20px;
            //     margin-right: -20px;
            //     border-top: 1px solid $borderColor;
            // }
            .process{
                margin-top: 10px;
            }
            .region_circle{ 
                width: 7px; 
                height: 7px;
                display:inline-block;
                -moz-border-radius: 50%; 
                -webkit-border-radius: 50%; 
                border-radius: 50%; 
                position:absolute;
                top:13px;
                left: 0px;
            }
            .selected{
                color:$theme-blue;
                margin-right:12px;
                em{
                    margin-left:10px;
                }
            }
            .file_upload{
                .file{
                    margin-right:20px;
                }
            }

        }
    }
    .bottom_border_16{
        width: calc( 100% + 48px );
        height: 16px;
        background-color: $theme-grey-body-background;
        margin-left:-24px;
        margin-right:-24px;
    }
    .task_comment{
        padding-top:24px;
    }
}
</style>