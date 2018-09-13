<template>
    <div>
        <!--右侧弹窗创建会议室-->
        <right-slide-modal :title="roomTitle" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button @click="operateSave()"  :disabled="btnDisabled">保存</el-button></li>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <div>
                <el-form label-position="right" label-width="120px" :model="detailData" :rules="rules" ref="refForm">
                    <el-form-item label="会议室名称：" prop="name" >
                        <el-input v-model.trim="detailData.name" placeholder="请输入会议室名称" @blur="handleBlurName"
                                  onkeyup="value=value.replace(/[\/&'<>%*\\]/g,'')" style="width: 500px" maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="会议室地址：" prop="address">
                        <el-input v-model="detailData.address" placeholder="请输入会议室地址" style="width: 500px" maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="容纳人数：" prop="maxPersonNum">
                        <el-input v-model.trim="detailData.maxPersonNum" placeholder="请输入容纳人数" style="width: 250px" maxlength="8"></el-input>
                    </el-form-item>
               </el-form>
            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    export default {
        name: "meeting-room-edit",
        data(){
            return{
                detailData:{
                    name:"",
                    address:"",
                    sid:"",
                    maxPersonNum:'',
                },
                rules:{
                    name:[{ required: true, message: '会议室名称不能为空', trigger: 'blur' },
                        // { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' },
                        {min:1, max:100, message:"会议室名称长度不能大于100字符，请重新输入！", trigger:'blur'},],
                    address:[{min:1, max:100, message:"会议室名称长度不能大于100字符，请重新输入！", trigger:'blur'}],
                    maxPersonNum:[
                        { pattern: /^[1-9]\d*$/,message: '容纳人数必须为正整数', trigger: 'blur' },
                        {min:1, max:7, message:'容纳人数长度不能大于7位数，请重新输入！', trigger:'blur'},
                    ]
                },
                btnDisabled:false,
                roomTitle:"创建会议室"
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            meetingRoomId:{
                required:true
            }
        },
        mounted(){
           if(this.meetingRoomId!=""){
               this.roomTitle="修改会议室";
               this.getRoomDataById();
           }else{
               this.roomTitle="创建会议室";
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
            }
        },
        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
            },
            handleBlurName(){
                let newUserMobile=this.detailData.name.replace(/[/&'<>%*\\]/g,'');
                this.$nextTick(() => {
                    this.detailData.name=newUserMobile;
                });
            },
            operateSave(){
                this.btnDisabled=true;
                this.$refs.refForm.validate((valid)=>{
                    if(valid){
                        try{
                            let pas={
                                name:this.detailData.name,
                                address:this.detailData.address,
                                maxPersonNum:this.detailData.maxPersonNum
                            }
                            if(this.meetingRoomId!=""){
                                pas.sid=this.meetingRoomId;
                                this.commitAllData(pas,'/meeting/meetingBoardroom/update/'+this.meetingRoomId,"update")
                            }else{
                                this.commitAllData(pas,'/meeting/meetingBoardroom/save',"add")
                            }
                        }catch (e){
                            this.btnDisabled=false;
                            this.$message("保存数据异常:"+e)
                        }
                    }else {
                        this.btnDisabled=false
                        return false;
                    }
                })
            },
            async commitAllData(pas,url,type){
                let requestType="post";
                if(type=="update"){
                    requestType="PUT"
                }
                await JZY.xhr.request({type:requestType,url,data:pas}).then((resultData)=>{
                // await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                        // this.roleData=resultData[0].list;
                        this.$emit("closeCreateModal");
                        this.btnDisabled=false;
                        //要优化不去后台拿数据
                         this.$emit("updateRoomList",type,resultData);
                         JZY.u.successMsg('操作成功');
                }).catch((e)=>{
                    //接口失败
                    // JZY.u.errorMsg(e);
                    this.btnDisabled=false;
                })
            },
            async getRoomDataById(){
                await JZY.xhr.request('/meeting/meetingBoardroom/get/'+this.meetingRoomId).then((resultData)=>{
                    // console.log("getUserListData1111:"+JSON.stringify(resultData))
                    try{
                        this.detailData.name=resultData[0].name;
                        this.detailData.address=resultData[0].address;
                        this.detailData.maxPersonNum=resultData[0].maxPersonNum+"";
                        this.detailData.sid=resultData[0].sid;
                        this.detailData.maxPersonNum=this.detailData.maxPersonNum=="null"?"":this.detailData.maxPersonNum;
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            }
        }
    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>