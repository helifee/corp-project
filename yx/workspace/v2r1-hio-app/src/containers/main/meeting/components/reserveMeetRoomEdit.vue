<template>
    <div>
        <!--右侧弹窗创建预定会议室-->
        <right-slide-modal title="预订会议室" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button  v-if="reserveRoomLook && detailData.existUpdateDeleteButton=='1'" @click="operateEdit()" >编辑</el-button></li>
                    <li><el-button  v-if="reserveRoomLook && detailData.existUpdateDeleteButton=='1'" @click="operateDel()" >删除</el-button></li>
                    <li><el-button v-if="!reserveRoomLook"  @click="operateSave()"  :disabled="btnDisabled">提交</el-button></li>
                    <li><el-button @click="operateClose()">关闭</el-button></li>
                </ul>
            </div>
            <div v-if="reserveRoomLook" class="reserveRoomView">
                <el-form label-position="right" label-width="120px">
                    <el-form-item label="预订主题：">
                        {{detailData.reserveTitle}}
                    </el-form-item>
                    <el-form-item label="会议室名称：">
                        {{detailData.meetingBoardroomName}}
                    </el-form-item>
                    <el-form-item label="预订时间：">
                        <span>{{detailData.meetingTime[0]}}~ {{detailData.meetingTime[1]}}</span>
                    </el-form-item>
                    <el-form-item label="使用人：">
                        <span>{{detailData.useUserName}}</span>
                    </el-form-item>
                    <el-form-item label="备注：">
                        {{detailData.remarks}}
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <el-form label-position="right" label-width="120px" :model="detailData" :rules="rules" ref="refForm">
                    <el-form-item label="预订主题：" prop="reserveTitle" >
                        <el-input v-model="detailData.reserveTitle"  placeholder="请输入预订主题" style="width: 600px" maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="会议室名称：" prop="meetingBoardroomId" >
                        <el-select  v-model="detailData.meetingBoardroomId" placeholder="请选择会议室"
                                    style="width: 400px"  size="medium" popper-class="meetingBoardroomCss" >
                            <el-option v-for="item in meetingRoomList" style="width: 400px"
                                       :label="item.name" :value="item.sid" :key="item.sid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预订时间：" prop="meetingTime">
                        <el-date-picker  v-model="detailData.meetingTime"
                                         :picker-options="pickerOptions"
                                         type="datetimerange"
                                         style="width: 400px"
                                         popper-class="meetingPopperClass"
                                         value-format="yyyy-MM-dd HH:mm:ss"
                                         range-separator="至"
                                         start-placeholder="开始日期"
                                         end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="使用人：" prop="useUserName">
                        <!--<el-tag type="success" closable v-if="detailData.useUserName" @close="handleDelSelUser">{{detailData.useUserName}}</el-tag>-->
                        <!--<i class="el-icon-news btnicon"  style="cursor: pointer" v-if="detailData.useUserName==''" @click = "handleSelectUser"></i>-->
                        <blend-tree ref= "refSelectUseUserName" :selectedDataToTree = "selectedUsersToTree"
                                    :enable-checked-multiple = "false" :tagButtons="['user']" activeTab = "user"
                                    @getDataFromTree = "userFromTreeFunc">
                            <!--添加按钮图标的插槽-->
                            <div slot="add_button">
                                <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectUseUserName.blendTreeDialogShow()"></i>
                            </div>
                        </blend-tree>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remarks">
                        <el-input v-model="detailData.remarks" type="textarea" :rows="8" style="width: 600px" v-textarea-limiter maxlength="2500"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </right-slide-modal>
        <!--<seleUser :selectUserDialogVisible="selectUserDialogVisible"-->
                  <!--:enable-checked-multiple = "false"-->
                  <!--@closeCreateModal ="selectUserDialogVisible = !selectUserDialogVisible"-->
                  <!--:show-inside-outside-tabs="false"-->
                  <!--:selectedUsers= "selectedUsersToTree" @getUserTree = "userFromTreeFunc"-->
        <!--&gt;</seleUser>-->
    </div>
</template>

<script>
    // import seleUser from '@/components/userTree/userTree.vue'
    export default {
        name: "reserve-meet-room-edit",
        data(){
           return{
               btnDisabled:false,
               detailData:{
                   reserveTitle:"",
                   meetingBoardroomId:"",
                   meetingBoardroomName:"",
                   meetingTime:[new Date(),new Date()],
                   useUserid:this.$store.state.session.sid,
                   useUserName:this.$store.state.session.name,
                   remarks:"",
                   existUpdateDeleteButton:"0"
               },
               rules:{
                   reserveTitle:[{ required: true, message: '预订主题不能为空', trigger: 'blur' },
                       {min:1, max:100, message:"预订主题长度不能大于100字符，请重新输入！", trigger:'blur'},
                   ],
                   meetingBoardroomId:{ required: true, message: '请选择会议室', trigger: 'blur' },
                   meetingTime:{ required: true, message: '请选择预订时间', trigger: 'blur' },
                   useUserName:{ required: true, message: '使用人不能为空', trigger: 'blur' },
               },
               meetingRoomList:[],
               pickerOptions:{
                   // disabledDate(time) {
                   //     let timeDate=moment(time.getTime()).format('YYYY-MM-DD');
                   //     let nowDate=moment(new Date()).format('YYYY-MM-DD');
                   //     return moment(timeDate).isBefore(nowDate);
                   // },
               },
               selectUserDialogVisible:false,
               reserveRoomLook:false,
               selectedUsersToTree:{userList:[{sid:this.$store.state.session.sid,name:this.$store.state.session.name}]}
           }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            reserveMeetingRoomId:{
                required:true
            },
            reserveMeetingLook:{
                type:Boolean,
                required:true
            },
        },
        mounted(){
            if(this.reserveMeetingLook){
                this.reserveRoomLook=true;
                this.btnEdit=true
            }
           if(this.reserveMeetingRoomId!=""){
               //编辑
               JZY.xhr.requestPromises([
                   JZY.xhr.r("/meeting/meetingReserveBoardroom/get/"+this.reserveMeetingRoomId),
                   this.getMeetingRoomList()
               ]).then(async ([reserveRoomDetail])=>{
                  // console.log(JSON.stringify(reserveRoomDetail))
                   this.detailData.reserveTitle=reserveRoomDetail[0].reserveTitle;
                   this.detailData.meetingBoardroomId=reserveRoomDetail[0].meetingBoardroomId;
                   this.detailData.meetingBoardroomName=reserveRoomDetail[0].meetingBoardroomName;
                   this.detailData.meetingTime=[reserveRoomDetail[0].reserveStartTime,reserveRoomDetail[0].reserveEndTime],
                   this.detailData.useUserid=reserveRoomDetail[0].useUserid;
                   this.detailData.useUserName=reserveRoomDetail[0].useUserName;
                   if(this.detailData.useUserid!="" && this.detailData.useUserid!=null){
                       this.selectedUsersToTree={userList:[{sid:this.detailData.useUserid,name:this.detailData.useUserName}]}
                   }
                   this.detailData.remarks=reserveRoomDetail[0].remarks;
                   //是否显示编辑、删除按钮，1显示，0不显示
                   this.detailData.existUpdateDeleteButton=reserveRoomDetail[0].existUpdateDeleteButton;
               })
           }else{
               this.getMeetingRoomList();
           }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            },
            // selectedUsersToTree(){
            //     let usrs=[{
            //         sid:this.detailData.useUserid,
            //         userName:this.detailData.useUserName
            //     }];
            //     return usrs;
            // },
        },
        methods: {
            // meetingPopperFocus(){
            //     this.$nextTick(()=>{
            //         $(".meetingPopperClass  .el-date-range-picker__editors-wrap .el-input input").attr("readonly","readonly");
            //     })
            // },
            operateClose() {
                this.$emit("closeCreateModal");
            },
            operateDel(){
                this.delReserveRoomData(this.reserveMeetingRoomId);
            },
            operateSave() {
                this.btnDisabled=true;
                this.$refs.refForm.validate(valid=>{
                   if(valid){
                       if(this.detailData.meetingTime==null){
                           this.detailData.meetingTime=[];
                       }
                      let pas={
                          meetingBoardroomId:this.detailData.meetingBoardroomId,
                          reserveTitle:this.detailData.reserveTitle,
                          useUserid:this.detailData.useUserid,
                          reserveStartTime:this.detailData.meetingTime[0]==undefined?"":moment(this.detailData.meetingTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                          reserveEndTime:this.detailData.meetingTime[1]==undefined?"":moment(this.detailData.meetingTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                          remarks:this.detailData.remarks,
                      }
                       if(this.reserveMeetingRoomId!=""){
                           this.commitAllData(pas,'/meeting/meetingReserveBoardroom/update/'+this.reserveMeetingRoomId,'update')
                       }else{
                           this.commitAllData(pas,'/meeting/meetingReserveBoardroom/save','add')
                       }
                   }else{
                       this.btnDisabled=false;
                       return;
                   }
                 })
            },
            handleSelectUser(){
                 this.selectUserDialogVisible=true;
            },
            handleDelSelUser(){
                this.detailData.useUserid="";
                this.detailData.useUserName=""
            },
            userFromTreeFunc(selectedUsers){
                // console.log("selectedUsers:"+JSON.stringify(selectedUsers))
                if(selectedUsers.userList.length>0){
                    this.detailData.useUserid=selectedUsers.userList[0].sid;
                    this.detailData.useUserName=selectedUsers.userList[0].name;
                }
            },
            operateEdit(){
                this.reserveRoomLook=false;
            },
            async getMeetingRoomList(){
                await JZY.xhr.post('/meeting/meetingBoardroom/queryList',{},{alertSuccess:false}).then((resultData)=>{
                    this.meetingRoomList=resultData[0];
                }).catch((e)=>{
                    //接口失败
                })
            },
            async delReserveRoomData(reserveRoomId){
                await JZY.xhr.drop('/meeting/meetingReserveBoardroom/delete/'+reserveRoomId,{},{alertSuccess:true}).then((resultData)=>{
                    this.$emit("reserveSuccessFun");
                }).catch((e)=>{
                    //接口失败
                })
            },
            async commitAllData(pas,url,type){
                let requestType="post";
                if(type=="update"){
                    requestType="PUT"
                }
                await JZY.xhr.request({type:requestType,url,data:pas}).then((resultData)=>{
                // await JZY.xhr.request({type:requestType,url,data:pas},false,false).then((resultData)=>{
                // await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.btnDisabled=false;
                        this.$emit("reserveSuccessFun");
                        JZY.u.successMsg('操作成功');
                    }catch (e){
                        this.btnDisabled=false;
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
        }
    }
</script>

<style lang="scss">
    .meetingBoardroomCss{
        .el-select-dropdown__list, .el-popper .el-cascader-menu{
            width:178px;
        }
    }
    .operate_buttons {
        float: right;
    }
    .meetingPopperClass{
        .el-date-range-picker__editors-wrap .el-input input{
            readonly:"readonly"
        }
    }
    /*.reserveRoomView{*/
        /*.el-form .el-form-item{*/
            /*margin-bottom:0;*/
        /*}*/
    /*}*/
</style>