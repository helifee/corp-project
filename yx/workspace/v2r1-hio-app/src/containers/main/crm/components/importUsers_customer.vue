<template>
    <div>
    <!--右侧弹窗导入用户-->
        <right-slide-modal title="导入客户" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button v-if="active!=0 && active!=2" @click="prevFun()" >上一步</el-button></li>
                    <li><el-button v-if="active!=2 && excelDataView" @click="nextFun()" >下一步</el-button></li>
                    <li><el-button v-if="active==2" @click="finshFun()" >完成</el-button></li>
                    <li><el-button v-if="active!=2" @click="operateClose()">取消</el-button></li>
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
                            <el-button v-show="upBtnShow"  type="primary" size="small">上传文件</el-button>
                            <!--<el-button   size="small">上传文件</el-button>-->
                            <div slot="tip" class="el-upload__tip">
                                <a  :href="JZY.xhr.transformUrl('/crm/customer/download/template?'+'access_token='+accessToken,'GLOBAL.XU_SHENG_DONG',false)" class="templeUpdoad">下载excel模板</a>
                                <div class="uploadInfo">
                                    <p>上传要求：</p>
                                    <p>1. 文件后缀名为 .xls 或者 .xlsx</p>
                                    <p>2. 用户条数不超过500条</p>
                                    <p>3. 数据请不要放在合并的单元格中</p>
                                    <p>4. 文件大小不超过1MB</p>
                                </div>
                                <div class="excelFile">
                                    <img v-if="iconExcel" src="../images/sys-excel-big.png"/>
                                </div>
                                <!--<a class="templeUpdoad"  :href="JZY.xhr.transformUrl('/sys/user/download/template'+'?'+JZY.s.getAccessTokenByAuthorization(),'GLOBAL.TESTSYS',false)">下载模板</a>-->
                                <!--<a class="templeUpdoad"  :href="JZY.c.xhrSetting.HOST['GLOBAL.ZHOU_QINLIN'].url+'/sys/user/download/template'">下载模板</a>-->
                            </div>
                        </el-upload>

                    </div>
                    <div v-if="loadShow" style="position: absolute; top: 50%; left:50%; -webkit-transform: translateX(-50%) translateY(-50%); -webkit-transform: translateX(-50%) translateY(-50%); -moz-transform: translateX(-50%) translateY(-50%); -ms-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%);"><img src="../images/load.gif"></div>
                </div>
                <div v-else-if="active==1" class="activeShowTable">
                     <div class="syyl">
                         <div>预览数据：<span>{{this.fileName}}</span></div>
                         <el-table :data="tableData" :show-header="true">
                             <!-- <el-table-column label="序号" prop="order"></el-table-column> -->
                             <el-table-column label="客户名称" prop="custName" width="120px" align="center"></el-table-column>
                             <el-table-column label="联系电话" prop="phone" width="100px" align="center"></el-table-column>
                             <el-table-column label="电子邮件" prop="email" width="180px" align="center"></el-table-column>
                             <el-table-column label="客户来源" prop="sourceName" width="80px" align="center"></el-table-column>
                            
                             <el-table-column label="客户类型" prop="typeName" width="80px" align="center"></el-table-column>
                             <el-table-column label="联系地址" prop="address" width="150px" align="center"></el-table-column>

                             <el-table-column label="企业网站" prop="webSite" width="100px" align="center"></el-table-column>
                             <el-table-column label="客户负责人" prop="salesName" width="80px" align="center"></el-table-column>
                             <el-table-column label="联系人姓名" prop="contactName" width="80px" align="center"></el-table-column>
                             <el-table-column label="联系人职务" prop="title" width="80px" align="center"></el-table-column>

                             <el-table-column label="联系人手机" prop="contactPhone" width="100px" align="center"></el-table-column>
                             <el-table-column label="联系人邮箱" prop="contactEmail" width="180px" align="center"></el-table-column>
                             <el-table-column label="决策关系" prop="decisionRoleName" width="80px" align="center"></el-table-column>
                             
                         </el-table>
                     </div>
                     <div v-if="loadShow" style="position: absolute; top: 50%; left:50%; -webkit-transform: translateX(-50%) translateY(-50%); -webkit-transform: translateX(-50%) translateY(-50%); -moz-transform: translateX(-50%) translateY(-50%); -ms-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%);"><img src="../images/load.gif"></div>
                </div>
                <div v-else-if="active==2" class="activeFinsh">
                     <div class="hint" v-if="importResult.importStatus=='success'">
                         <div style="margin-left: -15px;">
                             <i class="el-icon-success" style="font-size: 49px;color:#67c23a"></i>
                         </div>
                         <div>已成功！</div>
                         <div class="info">您共导入成功<span>{{importResult.successCnt}}</span>条数据，没有导入失败数据！</div>
                     </div>
                    <div class="hint" v-if="importResult.importStatus=='part'">
                        <div style="margin-left: -15px;">
                            <i class="el-icon-warning" style="font-size: 49px;color:#FAAD14"></i>
                        </div>
                        <div>已成功！</div>
                        <div class="info">您共导入成功<span>{{importResult.successCnt}}</span>条数据，
                            导入失败<span>{{importResult.failCnt}}</span>条数据,<a @click="downloadFailExcel">下载失败数据表</a></div>
                    </div>
                    <div class="hint" v-if="importResult.importStatus=='fail'">
                        <div style="margin-left: -15px;">
                            <i class="el-icon-error" style="font-size: 49px;color:#F5222D"></i>
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
               accessToken:'',
               upBtnShow:true,
               loadShow:false,
               fileName:'',
               active:0,
               fileList: [],
               uploadData:{
                   organizationId:"1001"
               },
               tableData:[],
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
            // depData:{
            //     required:true
            // }
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
        mounted(){
            this.accessToken=JZY.c.AUTO_LOGIN.headers.authorization.slice(7);
            console.log('token',this.accessToken);
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
                    this.loadShow=true;
                    let pas=this.previewDataResult;
                    this.commitImportUserData(pas,'/crm/customer/saveImportData')
                }else  if(this.active==2){
                    this.active++;
                }
            },
            prevFun(){
                if (this.active>0) {
                    if(this.active==1){
                        this.excelDataView=false;
                        this.upBtnShow=true;
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
                this.loadShow=true;
                console.log('file',file);
                this.fileName=file.name;
                
                if(fileList.length>1){fileList.shift();}
                this.iconExcel=true;
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    this.$message.error('上传文件大小不超过1MB!');
                    return false;
                }
                let url= JZY.xhr.transformUrl('/crm/customer/excel/preview','GLOBAL.XU_SHENG_DONG',false);
                JZY.xhr.request({
                    type:'POST',
                    url:url,
                    timeout: 60000, //设置超时时间为1分钟
                    data:{resource:file.raw},
                    headers:{'Content-Type': 'multipart/form-data'}
                }).then((resultData)=>{
                    // console.log("resultData:"+JSON.stringify(resultData))
                    // this.active++;
                    console.log('表单数据',resultData);
                    resultData[0].forEach((item,index)=>{
                        let objUser={
                            order:index+1,
                            address:item.address,
                            contactEmail:item.contactEmail,
                            contactName:item.contactName,
                            contactPhone:item.contactPhone,
                            custName:item.custName,
                            decisionRoleName:item.decisionRoleName,
                            email:item.email,
                            phone:item.phone,
                            salesName:item.salesName,
                            sourceName:item.sourceName,
                            title:item.title,
                            typeName:item.typeName,
                            webSite:item.webSite
                        }
                        this.tableData.push(objUser)
                    })
                    this.previewDataResult=resultData[0];
                    this.excelDataView=true;
                    this.upBtnShow=false;
                    this.loadShow=false;
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
                this.upBtnShow=true;
                this.iconExcel=false;
            },
            downloadFailExcel(){
                this.commitDownloadFailExcel()
            },
            async commitImportUserData(pas,url){
                await JZY.xhr.post(url,pas,{alertSuccess:false}).then((resultData)=>{
                    this.active++;
                    this.importResult=resultData[0]
                    this.loadShow=false;
                    //{"totalCnt":3,"successCnt":0,"failCnt":3,"importStatus":"fail","errorDownloadUrl":"D:/test.xlsx"}
                    //{"totalCnt":3,"successCnt":3,"failCnt":0,"importStatus":"success","errorDownloadUrl":"D:/test.xlsx"}
                    // console.log("kkdkd:"+JSON.stringify(resultData))
                }).catch((e)=>{
                    //接口失败
                })
            },
            async commitDownloadFailExcel(){
                let pas={
                    custList:this.importResult.failDataList
                }
                // await JZY.xhr.post('/sys/user/download/error',pas,{alertSuccess:false}).then(([resultData,res])=>{
                    // let url="/sys/user/download/error";
                //通过造一个隐藏的form表单方式实现
                let url= JZY.xhr.transformUrl('/crm/customer/download/errorData','GLOBAL.XU_SHENG_DONG',false);
                url=url+"?"+JZY.s.getAccessTokenByAuthorization();
                console.log('失败路径',url);
                // console.log(failData);
                let $iframe = $('<iframe id="down-file-iframe" />');
                        let form = $('<form method="POST" action="' + url + '">');
                        // pas.custList.forEach((item,index)=>{
                            form.append($('<input type="hidden"  name="failData" value="">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].cusName" value="' + item.cusName+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].contactNumber" value="' + item.contactNumber+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].customerEmail" value="' + item.customerEmail+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].customerSource" value="' + item.customerSource+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].customerType" value="' + item.customerType+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].contactAddress" value="' + item.contactAddress+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].enterpriseWebsite" value="' + item.enterpriseWebsite+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].contactName" value="' + item.contactName+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].post" value="' + item.post+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].phoneNumber" value="' + item.phoneNumber+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].contactEmail" value="' + item.contactEmail+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].decisionRelation" value="' + item.decisionRelation+ '">'));
                            
                            // form.append($('<input type="hidden"  name="custList['+index+'].userName" value="' + item.userName+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].userEmail" value="' + item.userEmail+ '">'));
                            // form.append($('<input type="hidden"  name="custList['+index+'].msg" value="' + item.msg+ '">'));
                        // })
                    
                $iframe.append(form);
                $(document.body).append($iframe);
                let formList=document.getElementsByName("failData")[0].value=JSON.stringify(pas.custList)
                // console.log('11111',formList);
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
    // @import '../sysIcon/iconfont.css';

    .operate_buttons {
        float: left;
        display: inline-block;
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