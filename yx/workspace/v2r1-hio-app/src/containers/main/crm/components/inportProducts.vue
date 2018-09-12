<template>
    <div>
    <!--右侧弹窗导入用户-->
        <right-slide-modal title="导入产品" :visible.sync="dialogVisible" :showClose="false" @open="openModal">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li>
                        <el-button  size="medium " v-if="page<1 || (page>1 && page < 3)" @click="back()">上一步</el-button>
                    </li>
                    <li>
                        <el-button  size="medium " v-if="page<3" @click="next()">下一步</el-button>
                    </li>
                    <li>
                        <el-button  size="medium " @click="operateFun" v-if="page!=3" >取消</el-button>
                    </li>
                    <li>
                        <el-button  size="medium " v-if="page==3" @click="finish('end')">完成</el-button>
                    </li>
                </ul>
            </div>
            <div class="">
                <el-steps  finish-status="success" >
                    <el-step title="步骤 1" description="上传excel文件"></el-step>
                    <el-step title="步骤 2" description="数据预览"></el-step>
                    <el-step title="步骤 3" description="数据导入"></el-step>
                </el-steps> 
                <div v-show="page==1">
                    <div class="uploadExcel">
                        <el-upload
                            ref="loadElement"
                            :on-change="handleChange"
                            :on-remove="handRemove"
                            :multiple="false"
                            accept=".xlsx,xls"
                            :auto-upload = 'false'
                            :before-upload="beforeAvatarUpload"
                            :on-exceed="excedFn"
                            :on-progress="progressFn"
                            action=""
                            >
                            <el-button  type="primary" style="width: 300px">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                <div>
                                    <span class="excel">上传excel</span>
                                    <a class="templeUpdoad" :href="downloadUrl" >下载模板</a>
                                </div>
                                <div v-if="loadStatus" style="text-align:center;padding:10px;">
                                    <img src="../images/load.gif" width="20">
                                </div>
                            </div>
                            
                        </el-upload>
                        <div style="color:red">
                            {{errorUpdoad}}
                        </div>
                    </div>
                    <div class="uploadInfo">
                        <div class="title">Excel文件请符合以下标准：</div>
                        <p>后缀名为xls或者xlsx</p>
                        <p>数据请勿放在合并的单元格中</p>
                        <p>用户导入条数不超过500条</p>
                    </div>
                </div>
                
                <div class="downTable" v-show="page==2">
                    <div class="bd">
                        <div class="title">预览数据</div>
                        <myTable :tableTitle="tableTitle" :tableData="listTable"></myTable>
                    </div>
                    
                </div>
                <div class="activeFinsh" v-show="page==3">
                    <div class="hint" v-show="saveResult.importStatus=='success'" >
                        <div>
                            <i class="el-icon-circle-check-outline" style="font-size: 49px;color:#67c23a"></i>
                        </div>
                        <div>已成功！</div>
                        <div class="info">您共导入成功<span>{{saveResult.successCnt}}</span>条数据，没有导入失败数据！</div>
                    </div>
                    <div class="hint" v-show="saveResult.importStatus=='part'">
                        <div>
                            <i class="el-icon-circle-check-outline" style="font-size: 49px;color:#FAAD14"></i>
                        </div>
                        <div>已成功！</div>
                        <div class="info">您共导入成功<span>{{saveResult.successCnt}}</span>条数据，
                            导入失败<span>{{saveResult.failCnt}}</span>条数据,<a @click="downError">下载失败数据表</a></div>
                    </div>
                    <div class="hint" v-show="saveResult.importStatus=='fail'">
                        <div>
                            <i class="el-icon-circle-check-outline" style="font-size: 49px;color:#F5222D"></i>
                        </div>
                        <div>导入失败！</div>
                        <div class="info">您共导入成功<span>{{saveResult.successCnt}}</span>条数据，导入失败
                            <span>{{saveResult.failCnt}}</span>条数据,<a @click="downError">下载失败数据表</a></div>
                    </div>
                </div>
            </div>
        </right-slide-modal>
    </div>
</template>
<script>
import cService from '@Main/crm/crm_service.js'
import myTable from '@Main/crm/components/table.vue'

const tableTitle = [{
    name : '一级分类',
    type : 'cateleveOneName'
    },{
        name : '二级分类',
        showoverflowtooltip:true,
        type : 'cateLeveTwoName'
    },{
        name : '产品名称',
        showoverflowtooltip:true,
        type : 'name'
    },
    {
        name : '产品单位',
        showoverflowtooltip:true,
        type : 'unit'
    },
    {
        name : '产品单价',
        showoverflowtooltip:true,
        type : 'price'
    },
    
    {
        name : '产品状态',
        showoverflowtooltip:true,
        type : 'productStatusName'
    }
]
export default {
    components:{
        myTable
    },
    data() {
        let accessToken = JZY.c.AUTO_LOGIN.headers.authorization;
        accessToken = accessToken ? accessToken.split(" ")[1] : "";
        accessToken = "?access_token=" + accessToken;
        return {
            loadStatus:false,
            status:false,
            tableTitle:tableTitle,
            currentPage:1,
            errorUpdoad:'',
            listTable:[],
            page:1,
            saveResult:{},
            limit:1,
            actionUrl:JZY.xhr.transformUrl('/crm/product/excel/preview','GLOBAL'),
            downloadUrl:JZY.xhr.transformUrl('/crm/product/download/template' + accessToken,'GLOBAL.XSD',false),
            saveDataUrl:JZY.xhr.transformUrl('/crm/product/saveImportData','GLOBAL.XSD',false),
            errorLoadUrl:JZY.xhr.transformUrl('/crm/product/download/errorData','GLOBAL.XSD',false)
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        back(){
            if(this.page == 1){
                return;
            }
            --this.page;
        },
        finish(){
            this.$emit("reloadTable");
            this.$emit("reloadTree");
            this.operateFun();
        },
        next(val){
            if(this.page >= 3){
                return;
            }
            
            if(this.page == 2){

                this.saveData();
            }
            if(this.status){
                this.page++;
            }
            
        },
        saveData(){
            
            let saveDataUrl = this.saveDataUrl;
            if(this.listTable && this.listTable.length){
                let param = {
                    data : JSON.stringify(this.listTable),
                    type:'POST',
                    url : saveDataUrl,
                    contentType:'application/json' 
                }
                cService.setAjaxFn(param).then((data)=>{
                    //导入结果
                    if(data.status == 200){
                        this.saveResult = data.result;
                        
                    }
                    
                })
            }
        },
        openModal(){

        },
        excedFn(files, fileList){
            // console.log(this.$refs['loadElement'])
            // this.$refs['loadElement'].clearFiles();
             
            // this.handRemove(files,fileList);
            // this.$refs['loadElement'].onRemove(fileList[0],fileList);
            
            // let str = "只能上传" + this.limit + "个文件";

            // this.errorUpdoad = str;
        },
        progressFn(event, file, fileList){
            
        },
        beforeAvatarUpload(file){
            
            let error ;
            error || (file.type == 'xlsx' || file.type == "xls") || (error = "文件格式错误，只能上传xlsx或xls的文件");
            error || (file.size / 1024 / 1024 < 1) || (error = "上传文件大小不能超过 1MB!");
            if(error){
                this.errorUpdoad = error;
                return false;
            }
            this.errorUpdoad = "";
            return true;
        },
        async getImgUrl (file) {
            let url = this.actionUrl;

            var formData = new FormData();
            formData.append('resource', file.raw);
            let param = {
                type:'POST',
                url:url,
                data : formData,
                processData: false,
                contentType:false 
            }
            return await cService.setAjaxFn(param);
            
        },
        handRemove(file,fileList){
            this.status = false;
        },
        async handleChange(file,fileList){
            // fileList.splice(0,1);
            if(fileList.length>1){fileList.shift();}
            this.listTable = [];
            this.status = false;
            this.loadStatus = true;
            let res = await this.getImgUrl(file);
            this.loadStatus = false;
            //上传文件后之后
            if(res.status == 200){
                this.listTable = res.result;
                this.errorUpdoad = "";
                this.status = true;
            }else{
                this.errorUpdoad = res.message;
                // this.$message(res.message);
                
                
            }
            
        },
        operateFun(){
            this.$emit("closeModal")
        },
        downFile(blob, fileName) {
            
            var link = document.createElement('a');//a标签下载
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
            
        },
        downError(){
            let url = this.errorLoadUrl;
            url=url+"?"+JZY.s.getAccessTokenByAuthorization();
            let errorList = this.saveResult;
            let $iframe = $('<iframe id="down-file-iframe" />');
            let form = $('<form method="POST" action="' + url + '">');

            form.append($('<input type="hidden"  name="failData" value="">'));
            $iframe.append(form);
            $(document.body).append($iframe);
            document.getElementsByName("failData")[0].value=JSON.stringify(this.saveResult.failDataList);
            form[0].submit();
            $iframe.remove();
            return;
            var formData = new FormData();
            
            let file = JSON.stringify(this.saveResult.failDataList);

            formData.append('failData', file);
            let params = {
                'failData' : file
            }
            let param = {
                type:'POST',
                url:url,
                data : file,
                processData: false,
                contentType:"application/json"
            }
            cService.setAjaxFn(param).then((data)=>{

                var bstr = Window.atob(data);//解码
                var n = bstr.length;
                var u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);//转二进制
                }
                let blob = new Blob(u8arr, {type:'application/msexcel'});
                this.downFile(blob,'kkk.excel');
            })
            return;
        }
    }
   
}
</script>
<style lang="scss">
    .uploadExcel,.uploadInfo{

        .el-upload-list{
                display: inline-block;
                min-width: 200px;
                margin: 0 auto;
        }
    }

</style>

<style scoped lang="scss">
    a{color:#46A7FF}
    .uploadExcel,.uploadInfo{
        text-align: center;
        border:1px dashed #999999;
        padding:20px;
        border-radius: 8px;
        margin:20px 0;
        
        a{color:#46A7FF}
    }
    .uploadInfo{
        text-align: left;
        .title{
            font-size:18px;
        }
    }
    .activeFinsh{
        .hint{ text-align: center;}
        a{ cursor: pointer;}
    }
    .downTable{
        padding:10%;
        .bd{background:#efefef;}
    }
</style>

