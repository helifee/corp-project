<template>
    <div>
    <!--右侧弹窗导入用户-->
        <right-slide-modal title="导入用户" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <el-button v-if="active!=2" @click="operateClose()" size="medium ">取消</el-button>
                    <el-button v-if="active!=0 && active!=2" @click="prevFun()" size="medium ">上一步</el-button>
                    <el-button v-if="active!=2" @click="nextFun()" size="medium ">下一步</el-button>
                    <el-button v-if="active==2" @click="finshFun()" size="medium ">完成</el-button>
                </ul>
            </div>
            <div class="importUsers">
                <el-steps :active="active" finish-status="success" >
                    <el-step title="步骤 1" description="上传excel文件"></el-step>
                    <el-step title="步骤 2" description="数据预览"></el-step>
                    <el-step title="步骤 3" description="数据导入"></el-step>
                </el-steps>
                <!--:action="JZY.c.xhrSetting.HOST['GLOBAL.ZHOU_QINLIN'].url+'/sys/user/excel/preview'"-->
                <!--:action="JZY.xhr.transformUrl('/sys/user/excel/preview','GLOBAL.ZHOU_QINLIN',false)"-->
                <div v-if="active==0">
                    <div class="uploadExcel">
                        <el-upload
                                class="upload-demo"
                                action=""
                                :headers="uploadHeaders"
                                :on-preview="handlePreview"
                                :before-upload="beforeAvatarUpload"
                                :limit="1"
                                :auto-upload = 'false'
                                accept=".xlsx,xls"
                                :on-exceed="handleExceed"
                                name="resource"
                                :data="uploadData"
                                ref="upload"
                                :on-success = 'handleSuccess'
                                :file-list="fileList">
                            <el-button  type="primary" style="width: 300px">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                <span class="excel">上传excel</span>
                                <a class="templeUpdoad"  :href="JZY.xhr.transformUrl('/sys/user/download/template','GLOBAL.TESTSYS',false)">下载模板</a>
                                <!--<a class="templeUpdoad"  :href="JZY.c.xhrSetting.HOST['GLOBAL.ZHOU_QINLIN'].url+'/sys/user/download/template'">下载模板</a>-->
                            </div>
                        </el-upload>
                    </div>
                    <div class="uploadInfo">
                          <div>Excel文件请符合以下标准：</div>
                          <p>后缀名为xls或者xlsx</p>
                          <p>数据请勿放在合并的单元格中</p>
                          <p>文件大小请勿超过1MB,用户导入条数不超过500条</p>
                    </div>
                </div>
                <div v-else-if="active==1" class="activeShowTable">
                     <div class="syyl">
                         <div>预览数据：<span>import.xml</span></div>
                         <el-table :data="tableData" :show-header="false">
                             <el-table-column   prop="order"></el-table-column>
                             <el-table-column   prop="userName"></el-table-column>
                             <el-table-column   prop="userMobile"></el-table-column>
                             <el-table-column   prop="userEmail"></el-table-column>
                         </el-table>
                     </div>
                </div>
                <div v-else-if="active==2" class="activeFinsh">
                     <div class="hint" v-if="importResult.importStatus=='success'">
                         <div style="margin-left: -15px;">
                             <i class="el-icon-circle-check-outline" style="font-size: 49px;color:#67c23a"></i>
                         </div>
                         <div>已成功！</div>
                         <div class="info">您共导入成功<span>{{importResult.successCnt}}</span>条数据，没有导入失败数据！</div>
                     </div>
                    <div class="hint" v-if="importResult.importStatus=='part'">
                        <div style="margin-left: -15px;">
                            <i class="el-icon-circle-check-outline" style="font-size: 49px;color:#FAAD14"></i>
                        </div>
                        <div>已成功！</div>
                        <div class="info">您共导入成功<span>{{importResult.successCnt}}</span>条数据，
                            导入失败<span>{{importResult.failCnt}}</span>条数据,<a @click="downloadFailExcel">下载失败数据表</a></div>
                    </div>
                    <div class="hint" v-if="importResult.importStatus=='fail'">
                        <div style="margin-left: -15px;">
                            <i class="el-icon-circle-check-outline" style="font-size: 49px;color:#F5222D"></i>
                        </div>
                        <div>导入失败！</div>
                        <div class="info">您共导入成功<span>{{importResult.successCnt}}</span>条数据，导入失败
                            <span>{{importResult.failCnt}}</span>条数据,<a @click="downloadFailExcel">下载失败数据表</a></div>
                    </div>
                </div>
            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "import-users",
        data(){
           return{
               active:0,
               fileList: [],
               uploadData:{
                   organizationId:"1001"
               },
               tableData:[{
                   order:"",
                   userName:"",
                   userMobile:"",
                   userEmail:""
               }],
               previewDataResult:[],
               importResult:{},
               uploadHeaders:{
                   // authorization:"Bearer b955868c-0268-42d7-a489-4d9530ec461e"
               }
            // importResult:{"totalCnt":3,"successCnt":0,"failCnt":3,"importStatus":"fail","errorDownloadUrl":"D:/test.xlsx"}
            //    importResult:{"totalCnt":3,"successCnt":3,"failCnt":0,"importStatus":"success","errorDownloadUrl":"D:/test.xlsx"}
           }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            depData:{
                required:true
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
            nextFun(){
                if(this.active==0){
                     // this.$refs.upload.submit();
                    let url= JZY.xhr.transformUrl('/sys/user/excel/preview','GLOBAL.TESTSYS',false);
                    let fileValue = document.querySelector('.el-upload .el-upload__input');
                    // let fileValue = $('.el-upload  .el-upload__input');
                    let file=fileValue.files[0];
                    // console.log("file:"+fileValue)
                    if(file!==undefined) {
                        let Xls = file.name.split('.');
                        if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
                            JZY.xhr.request({
                                type:'POST',
                                url:url,
                                // multipart:true,
                                data:{
                                    resource:file,
                                    organizationId:this.depData.depId
                                },
                                headers:{
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then((resultData)=>{
                                // console.log("resultData:"+JSON.stringify(resultData))
                                // JZY.u.successMsg('操作成功')
                                this.active++;
                                this.tableData=[];
                                resultData[0].forEach((item,index)=>{
                                    let objUser={
                                        order:index+1,
                                        userName:item.userName,
                                        userMobile:item.userMobile,
                                        userEmail:item.userEmail,
                                    }
                                    this.tableData.push(objUser)
                                })
                                this.previewDataResult=resultData[0];
                            }).catch((e)=>{

                            })
                        }else {
                            this.$message.error('上传文件只能是 xls/xlsx 格式!')
                            return false
                        }
                    }else {
                        this.$message.error('请先选择上传文件!')
                        return false
                    }
                }else if (this.active==1) {
                    let pas={
                        users:this.previewDataResult
                    }
                    this.commitImportUserData(pas,'/sys/user/excel/import')
                }else  if(this.active==2){
                    this.active++;
                }
            },
            prevFun(){
                if (this.active>0) {
                    this.tableData=[];
                    this.active--;
                }
            },
            finshFun(){
                //刷新userlist
                this.$emit("refreshUserTable");
                this.$emit("closeCreateModal");
            },
            handlePreview(file) {
                console.log("handlePreview")
            },
            beforeAvatarUpload(file){
                let Xls = file.name.split('.');
                if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
                    return file
                }else {
                    this.$message.error('上传文件只能是 xls/xlsx 格式!')
                    return false
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            downloadFailExcel(){
                this.commitDownloadFailExcel()
            },
            handleSuccess(res,file,fileList){
                // if(res.status===200){
                //     this.active++;
                //     this.tableData=[];
                //     res.result.forEach((item,index)=>{
                //         let objUser={
                //             order:index+1,
                //             userName:item.userName,
                //             userMobile:item.userMobile,
                //             userEmail:item.userEmail,
                //         }
                //         this.tableData.push(objUser)
                //     })
                //     this.previewDataResult=res.result;
                // }else {
                //     this.$message({
                //         message: res.msg,
                //         type: 'error'
                //     });
                // }
            },
            async commitImportUserData(pas,url){
                await JZY.xhr.post(url,pas,{alertSuccess:false}).then((resultData)=>{
                    this.active++;
                    this.importResult=resultData[0]
                    //{"totalCnt":3,"successCnt":0,"failCnt":3,"importStatus":"fail","errorDownloadUrl":"D:/test.xlsx"}
                    //{"totalCnt":3,"successCnt":3,"failCnt":0,"importStatus":"success","errorDownloadUrl":"D:/test.xlsx"}
                    // console.log("kkdkd:"+JSON.stringify(resultData))
                }).catch((e)=>{
                    //接口失败
                })
            },
            async commitDownloadFailExcel(){
                let pas={
                    users:this.importResult.users
                }
                // await JZY.xhr.post('/sys/user/download/error',pas,{alertSuccess:false}).then(([resultData,res])=>{
                    // let url="/sys/user/download/error";
                //通过造一个隐藏的form表单方式实现
                let url= JZY.xhr.transformUrl('/sys/user/download/error','GLOBAL.TESTSYS',false);
                url=url+"?"+JZY.s.getAccessTokenByAuthorization();
                let $iframe = $('<iframe id="down-file-iframe" />');
                        let form = $('<form method="POST" action="' + url + '">');
                        pas.users.forEach((item,index)=>{
                            form.append($('<input type="hidden"  name="users['+index+'].userMobile" value="' + item.userMobile+ '">'));
                            form.append($('<input type="hidden"  name="users['+index+'].userName" value="' + item.userName+ '">'));
                            form.append($('<input type="hidden"  name="users['+index+'].userEmail" value="' + item.userEmail+ '">'));
                            form.append($('<input type="hidden"  name="users['+index+'].msg" value="' + item.msg+ '">'));
                        })
                $iframe.append(form);
                $(document.body).append($iframe);
                form[0].submit();
                $iframe.remove();
                    // }

                // }).catch((e)=>{
                //     //接口失败
                // })
            }
        }
    }
</script>

<style scoped lang="scss">
    .operate_buttons {
        float: right;
    }
    .importUsers{
        .uploadExcel{
            min-height: 86px;
            border: 1px dashed #999999;
            border-radius: 8px;
            margin-top: 39px;
            text-align: center;
            padding: 10px 300px;
            .templeUpdoad{
                color: #46A7FF;
                margin-left: 20px;
                font-weight: 400;
                font-size: 13px;
            }
            .excel{
                font-weight: 400;
                font-size: 13px;
                color: #999999;
            }
        }
        .uploadInfo{
            min-height: 106px;
            border: 1px dashed #999999;
            border-radius: 8px;
            margin-top: 39px;
            text-align: left;
            padding: 20px 30px 10px 30px;
            div{
                font-size: 18px;
                color: #333333;
            }
            p{
                font-size: 13px;
                color: #999999;
            }
        }
        .activeShowTable{
            .syyl{
                background: rgba(228, 228, 228, 0.458824);
                margin: 50px;
                padding: 10px;
            }
        }
        .activeFinsh{
            .hint{
                text-align: center;
                margin: 50px;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.647058823529412);
                line-height: 27px;
                .info{
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.447058823529412);
                    a{
                        cursor: pointer;
                        color: #00a0e9;
                    }
                }
            }
        }
    }
</style>