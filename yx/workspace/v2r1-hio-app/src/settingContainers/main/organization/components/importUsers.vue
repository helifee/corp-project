<template>
    <div>
    <!--右侧弹窗导入用户-->
        <right-slide-modal title="导入用户" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button v-if="active!=2" @click="operateClose()">取消</el-button></li>
                    <li><el-button v-if="active!=0 && active!=2" @click="prevFun()" >上一步</el-button></li>
                    <li><el-button v-if="active!=2 && excelDataView" @click="nextFun()" >下一步</el-button></li>
                    <li><el-button v-if="active==2" @click="finshFun()" >完成</el-button></li>
                </ul>
            </div>
            <div class="importUsers">
                <el-steps :active="active" simple>
                    <el-step title="上传文件" icon="el-icon-jzysys-1"></el-step>
                    <el-step title="数据预览" icon="el-icon-jzysys-2"></el-step>
                    <el-step title="数据导入" icon="el-icon-jzysys-3"></el-step>
                </el-steps>
                <!--:action="JZY.c.xhrSetting.HOST['GLOBAL.ZHOU_QINLIN'].url+'/sys/user/excel/preview'"-->
                <!--:action="JZY.xhr.transformUrl('/sys/user/excel/preview','GLOBAL.ZHOU_QINLIN',false)"-->
                <div v-if="active==0">
                    <div class="uploadExcel">
                        <el-upload
                                class="upload-demo"
                                action=""
                                :headers="uploadHeaders"
                                :on-change="handleFileChange"
                                :before-upload="beforeAvatarUpload"
                                :limit="2"
                                :auto-upload = 'false'
                                accept=".xlsx,xls"
                                name="resource"
                                :data="uploadData"
                                ref="upload"
                                :on-remove="handleRemoveFile"
                                :file-list="fileList">
                            <el-button  type="primary" size="small">上传文件</el-button>
                            <!--<el-button   size="small">上传文件</el-button>-->
                            <div slot="tip" class="el-upload__tip">
                                <a  :href="JZY.xhr.transformUrl('/sys/user/download/template'+'?'+JZY.s.getAccessTokenByAuthorization(),'GLOBAL',false)" class="templeUpdoad">下载excel模板</a>
                                <div class="uploadInfo">
                                    <p>上传要求：</p>
                                    <p>1. 文件后缀名为 .xls 或者 .xlsx</p>
                                    <p>2. 用户条数不超过500条</p>
                                    <p>3. 数据请不要放在合并的单元格中</p>
                                    <p>4. 文件大小不超过1MB</p>
                                </div>
                                <div class="excelFile">
                                    <img v-if="iconExcel" src="../../sysIcon/sys-excel-big.png"/>
                                </div>
                                <!--<a class="templeUpdoad"  :href="JZY.xhr.transformUrl('/sys/user/download/template'+'?'+JZY.s.getAccessTokenByAuthorization(),'GLOBAL.TESTSYS',false)">下载模板</a>-->
                                <!--<a class="templeUpdoad"  :href="JZY.c.xhrSetting.HOST['GLOBAL.ZHOU_QINLIN'].url+'/sys/user/download/template'">下载模板</a>-->
                            </div>
                        </el-upload>

                    </div>

                </div>
                <div v-else-if="active==1" class="activeShowTable">
                     <div class="syyl">
                         <div>预览数据：<span></span></div>
                         <el-table :data="tableData" >
                             <el-table-column  label="序号" prop="order"></el-table-column>
                             <el-table-column  label="姓名" prop="userName"></el-table-column>
                             <el-table-column  label="电话" prop="userMobile"></el-table-column>
                             <el-table-column  label="邮箱" prop="userEmail"></el-table-column>
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
    // import axios from 'axios'
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
               },
               iconExcel:false,
               excelDataView:false,    //点下步是事可进行数据预览

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
                    if(this.excelDataView){
                        this.active++;
                        this.iconExcel=false;
                    }else{
                        this.$message.error('请选择上传文件!');
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
                    if(this.active==1){
                        this.excelDataView=false;
                    }
                    this.tableData=[];
                    this.active--;
                }
            },
            finshFun(){
                //刷新userlist
                this.$emit("refreshUserTable");
                this.$emit("closeCreateModal");
            },
            handleFileChange(file, fileList) {
                if(fileList.length>1){fileList.shift();}
                this.iconExcel=true;
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    this.$message.error('上传文件大小不超过1MB!');
                    return false;
                }
                let url= JZY.xhr.transformUrl('/sys/user/excel/preview','GLOBAL.TESTSYS',false);
                JZY.xhr.request({
                    type:'POST',
                    url:url,
                    timeout: 60000, //设置超时时间为1分钟
                    data:{resource:file.raw, organizationId:this.depData.depId},
                    headers:{'Content-Type': 'multipart/form-data'}
                }).then((resultData)=>{
                    // console.log("resultData:"+JSON.stringify(resultData))
                    // this.active++;
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
                    this.excelDataView=true;
                }).catch((e)=>{
                    this.excelDataView=false;
                })
            },
            beforeAvatarUpload(file){
                // alert("sesew")
                // let Xls = file.name.split('.');
                // if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
                //     return file
                // }else {
                //     this.$message.error('上传文件只能是 xls/xlsx 格式!')
                //     return false
                // }
            },
            handleRemoveFile(files, fileList) {
                this.iconExcel=false;
            },
            downloadFailExcel(){
                this.commitDownloadFailExcel()
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

<style  lang="scss">
    @import '../../sysIcon/iconfont.css';

    .operate_buttons {
        float: right;
    }
    .importUsers{
        .uploadExcel{
            min-height: 86px;
            border: 1px dashed #999999;
            border-radius: 8px;
            margin-top: 39px;
            /*text-align: center;*/
            padding: 45px 100px;
            .templeUpdoad{
                position: absolute;
                left: 120px;
                top:0;
                background-color: #fff;
                color: #46A7FF;
                border: 1px solid #dcdfe6;
                border-radius: 3px;
                padding: 3px 15px;
            }
            .upload-demo{
                position: relative;
            }
            .el-upload-list{
                position: absolute;
                left: 300px;
                top: 160px;
            }
            .el-icon-document:before{
                 content: none;
            }
        }
        .uploadInfo{
            margin-top: 39px;
            text-align: left;
            div{
                font-size: 18px;
                color: #333333;
            }
            p{
                font-size: 13px;
                color: #999999;
            }
        }
        .excelFile{
            position: absolute;
            left: 350px;
            top: 100px;
            img{
                width: 64px;
                height: 64px;
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
        .el-steps--simple{
            background: none;
        }
        .el-step.is-simple .el-step__icon{
            height: 35px;
            width: 32px
        }
        .el-step.is-simple .el-step__head.is-process{
            color: #409EFF;
        }
        .el-step__title.is-process{
            color: #409EFF;
            font-weight:1;
        }
        .el-step.is-simple .el-step__head.is-finish{
            color: #c0c4cc;
            border-color:#c0c4cc;
        }
        .el-step__title.is-finish{
            color: #c0c4cc;
        }
        .el-step.is-simple .el-step__icon-inner[class*=el-icon]:not(.is-status){
            font-size: 26px;
        }
        .el-step.is-simple .el-step__arrow::after, .el-step.is-simple .el-step__arrow{
            border-bottom: 1px dashed #999999;
            margin: 10px;
        }
        .el-step.is-simple .el-step__arrow::after, .el-step.is-simple .el-step__arrow::before{
            display: none;
        }
        .el-step.is-simple .el-step__arrow::after, .el-step.is-simple .el-step__arrow::after{
            display: none;
        }

    }
</style>