<template>

    <div class="attach-uploader-wrapper" ref="attachUploaderWrapper">
        <div v-if="isDetailListFetched">
            <el-button :title="chooseFileTitle"
                    :disabled="!multiple && (uploadFilesList.length>0) || (multiple && fileNumLimit<=uploadFilesList.length)"
                       v-if="!readonly && (!multiple && (uploadFilesList.length==0) || (multiple && fileNumLimit>uploadFilesList.length))" ref="uploadFileButton"
                       style="margin-bottom:10px;"
                       @click="openOSFilePicker()" type="primary" size="small">{{l('{g.chooseAttach}')}}</el-button>

            <preview-file ref="previewFile"></preview-file>

            <div v-if="multiple">
                <div v-if="!uploadFilesList.length && readonly">您暂未上传过任何文件</div>

                <el-table v-if="uploadFilesList.length>0" :data="uploadFilesList">
                    <el-table-column label="" width="60">

                        <template slot-scope="scope">
                            <i v-if="scope.row.isLoading" class="el-icon-loading"></i>
                            <row-icon :row="scope.row"></row-icon>
                        </template>
                    </el-table-column>
                    <el-table-column width="225" :label="l('{g.upload.file}')" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="attach-file-name">{{scope.row.file.name}}</span>
                            <!--<span @click.native="handleFilePreview(scope.row)" :title="scope.row.cannotPerview?'该文件不支持预览':'点击预览文件'" class="attach-file-name">{{scope.row.file.name}}</span>-->
                            <!--<el-button size="mini" @click="handleFilePreview(scope.row)">预览</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column :label="l('{g.upload.progress}')" width="150" v-if="!readonly">
                        <template slot-scope="scope">

                            <el-progress :percentage="scope.row.progress"
                                         :status="scope.row.errorMsg!=''?'exception':(scope.row.progress>=100?'success':'')">
                                <!--<span v-if="scope.row.errorMsg!=''">{{scope.row.errorMsg}}</span>-->
                            </el-progress>

                            <span>{{scope.row.errorMsg||scope.row.infoMsg}}</span>

                        </template>
                    </el-table-column>
                    <el-table-column label="" width="75">
                        <template slot-scope="scope">
                            <el-button :title="scope.row.cannotPerview?'该文件不支持预览':'点击预览文件'" v-if="scope.row.allowDownload"
                                       :disabled="scope.row.cannotPerview" size="mini" @click="handleFilePreview(scope.row)">预览</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="l('{g.upload.size}')" width="100">
                        <template slot-scope="scope">
                            {{bytesToSize(scope.row.fileSize)}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="l('{g.upload.uploadTime}')" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.uploadTime || scope.row.xhrResponse">
                                 {{scope.row.uploadTime||scope.row.xhrResponse.result.file.uploadTime||scope.row.xhrResponse.result.file.updateDate}}

                            </span>
                           </template>
                    </el-table-column>

                    <el-table-column label="" v-if="!readonly">
                        <template slot-scope="scope">
                            <i @click="removeFile(scope.row,scope.$index)" class="el-icon-circle-close icon20 hover-blue" style="cursor:pointer;"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="下载">
                        <template slot-scope="scope">
                            <i v-if="scope.row.allowDownload" @click="downloadFile(scope.row,scope.$index)" class="el-icon-download icon20 hover-blue" style="cursor:pointer;"></i>

                        </template>
                        <!--allowDownload-->
                    </el-table-column>
                </el-table>
            </div>
            <div v-else style="display:inline;">
                <span v-if="!uploadFilesList.length && readonly" class="noData">暂无附件</span>
                <span v-if="uploadFilesList.length>0">
                    <!--<template slot-scope="scope">-->


                    <!--</template>-->
                    <el-tag
                            @close="removeFile(uploadFilesList[0],0)"
                            :closable="!readonly"

                            :disable-transitions="false">
                        <span style="width:20px;margin-right:10px;float:left;">

                            <row-icon :row="uploadFilesList[0]"></row-icon>
                    </span>
                    {{uploadFilesList[0].file.name}}&nbsp;&nbsp;({{bytesToSize(uploadFilesList[0].fileSize)}})


                        <i v-if="uploadFilesList[0].allowDownload"
                           @click="downloadFile(uploadFilesList[0],0)" class="el-icon-download icon20 hover-blue" style="cursor:pointer;margin-left: 20px;
                            position: relative;
                            top: 3px;"></i>

                    </el-tag>
                    <i v-if="uploadFilesList[0].isLoading" class="el-icon-loading"></i>
                    <el-button :title="uploadFilesList[0].cannotPerview?'该文件不支持预览':'点击预览文件'"
                               v-if="uploadFilesList[0].allowDownload"
                               :disabled="uploadFilesList[0].cannotPerview" size="mini"
                               @click="handleFilePreview(uploadFilesList[0])">预览</el-button>

                    <!--<span style="width:80px;">-->
                         <el-progress v-if="!uploadFilesList[0].allowDownload" style="display:inline-block;width:180px;"
                                      :percentage="uploadFilesList[0].progress"
                                      :status="uploadFilesList[0].errorMsg!=''?'exception':(uploadFilesList[0].progress>=100?'success':'')"></el-progress>

                    <span>{{uploadFilesList[0].errorMsg||uploadFilesList[0].infoMsg}}</span>
                    <!--</span>-->


                </span>


            </div>




        </div>
        <div :id="wrapperId+'picker'" style="width:0.5px;height:0.5px;opacity:0;pointer-events: none;">选择大文件</div>

    </div>





</template>
<!--<style lang="scss">-->
<!--.attach-file-name{-->
    <!--cursor:pointer;-->
    <!--&:hover{-->
        <!--text-decoration: underline;-->
    <!--}-->
<!--}-->
<!--</style>-->
<script>

    // import CryptoJS from './Crypto.js'
    import previewFile from '@Main/netDisk/previewFile.vue'
    import rowIcon from '@Main/netDisk/netDisk.rowIcon'
    import u from '@util'
    // export const CryptoJS = crypto  aaaa

    export default {
        computed: {

            chooseFileTitle(){

                if(!this.multiple && (this.uploadFilesList.length>0)){
                    return '单选模式下只能选择一个文件'
                }
                if(this.multiple && this.fileNumLimit<=this.uploadFilesList.length){
                    return '最大允许上传10个附件'
                }
                // !multiple && (uploadFilesList.length>0) || (multiple && fileNumLimit<=uploadFilesList.length)
            },
            allowSubmit(){
                if(this.readonly){
                    return true
                }else{
                    let resAllowSubmit=((this.required==false) && (!this.isUploading)) || (this.required  && (!this.isUploading) && this.uploadFilesList.length>0)


                    console.log('resAllowSubmit----:',resAllowSubmit)
                    return !this.hasHttpError && resAllowSubmit
                }


            }
        },

        components:{
            rowIcon,
            previewFile
        },
        methods: {
            handleFilePreview(row){
                this.$refs.previewFile.preview(row,'ATTACH')
            },
            saveFiles(){
                return new Promise((resolve,reject)=>{

                    console.log('this.uploadFilesList---:',this.uploadFilesList)

                    // alert(this.uploadFilesList.filter((item)=>!item.allowDownload).length)
                    if(this.uploadFilesList.filter((item)=>item.hasOwnProperty('xhrResponse') && item.xhrResponse.hasSavedToDB!=true).length==0){
                        resolve()
                        return false
                    }

                    // if(isInvokeInCurrentFile==true){
                    //     resolve()
                    //     return false
                    // }

                    if(this.hasHttpError){
                        reject()
                        return false
                    }



                    console.log('finished  listttt--:',this.uploadFilesList)

                    let sendKeys='appId businessId categoryId extendName fileSize fullName name path sid type url'.split(' '),
                        body=[]


                    this.uploadFilesList.forEach((row)=>{
                        let res=null
                        try{
                            res=row.xhrResponse.result.file
                        }catch(e){

                        }
                        if(res){
                            let map={}
                            sendKeys.forEach((key)=>{


                                map[key]=(res[key])
                            })

                            body.push(map)
                        }


                    })

                    // if(body.length==0){
                    //     return false
                    //     // this.$emit('uploadFinished',{})
                    //     this.isUploadFinished=true
                    // }

                    JZY.xhr.r({
                        type:'post',
                        data:body,
                        url:JZY.xhr.transformUrl('/disk/attachment/saveBatch','GLOBAL',false)
                    })
                        .then(([res])=>{
                            // this.$emit('uploadFinished',res)

                            // allowDownload

                            this.uploadFilesList.forEach((row)=>{

                                if(row.hasOwnProperty('xhrResponse')){
                                    row.xhrResponse.hasSavedToDB=true
                                }

                                row.allowDownload=true
                            })

                            // this.isUploadFinished=true

                            resolve()
                        })
                        .catch(()=>{
                            JZY.u.errorMsg('附件保存失败，请重试')
                            reject()
                            // this.$emit('uploadFinished',res)
                            // this.$emit('uploadError')
                        })
                })
            },
            initUpload(){

            },
            fileCountReachMax:u.debounce(function(){
                JZY.u.warningMsg('最多允许上传10个附件')
            },200),
            downloadFile(row,index){
                console.log('down load file row:',row)
                let openedUrl=
                    JZY.xhr.transformUrl('/disk/attachment/downLoadByFileId?fileId='
                            +(row.sId||row.sid||row.xhrResponse.result.file.sId||row.xhrResponse.result.file.sid)
                        // +window.encodeURIComponent(row.fullName||row.xhrResponse.result.file.fullName)
                        // +'&filePath='+(row.path||row.xhrResponse.result.file.path)
                        +'&'+JZY.s.getAccessTokenByAuthorization()
                        ,'GLOBAL',false)

                console.log('opened url--:',openedUrl)

                window.open(openedUrl)
            },
            getFilesList(){
                let self=this

                try{
                    JZY.xhr.r({
                        type:'post',
                        multipart:true,
                        data:{
                            appId:this.appId,
                            businessId:this.businessId,
                            categoryId:this.categoryId,
                        },
                        url:JZY.xhr.transformUrl('/disk/attachment/queryList','GLOBAL',false)
                    })
                        .then(([res])=>{

                            let arr=[]

                            // self.lastUploadFilesListLen=res.length


                            res.forEach((item)=>{
                                arr.push({
                                    ...item,
                                    isLoading:false,
                                    file:{
                                        __hash:null,
                                        name:item.fullName
                                    },
                                    // fileSize:file.size,
                                    errorMsg:'',
                                    cannotPerview:false,
                                    infoMsg:'',
                                    allowDownload:true,
                                    md5Progress:0,
                                    progress:100,
                                    paused:false
                                })
                            })


                            self.isDetailListFetched=true
                            console.log("kcuf_u arr--:",arr)
                            // debugger

                            self.uploadFilesList=arr

                            if(!self.readonly){
                                self.initUpload()
                            }

                            // this.isDetailListFetched=true

                        })
                }catch(e){
                    console.log('此error也许不影响页面执行:',e)
                }

            },
            async removeFile(row,index){


                let removeAction=()=>{
                    try{
                        this.uploader.removeFile(row.file,true)
                    }catch(e){

                    }

                    this.uploadFilesList.splice(index,1)
                    // this.lastUploadFilesListLen-=1
                    // if(this.uploadFilesList.length==0){
                    //     this.$emit('uploadFinished')
                    // }
                    console.log('remove file row and index:',row,index,this.uploadFilesList)


                    if(this.uploadFilesList.every((item)=>!item.errorMsg)){
                        this.hasHttpError=false
                    }

                }

                if(row.errorMsg!=''){
                    removeAction()
                }
                else if((row.progress<100)){
                    JZY.u.infoMsg(JZY.locale.$t('{g.upload.confirmRemoveUploadingFile}'),true)
                        .then(()=>{
                            removeAction()
                        })
                }else{

                    await JZY.u.infoMsg('文件删除后将不可恢复，确认继续?',true)

                    JZY.xhr.r({
                        type:'post',
                        data:{
                            // path:row.path||row.xhrResponse.result.file.path,
                            sid:row.sId||row.sid||row.xhrResponse.result.file.sId||row.xhrResponse.result.file.sid,
                        },
                        url:JZY.xhr.transformUrl('/disk/attachment/deletefile','GLOBAL',false)
                    })
                        .then(()=>{
                            removeAction()
                        })


                }


            },
            handleUploadError(){
                console.log('upload errorrr')
                this.$emit('uploadError')
                // this.$emit('uploadFinished')
                this.isUploading=false
                this.uploadFilesList.forEach((item)=>{
                    if(item.progress<100){
                        this.uploader.cancelFile( item.file );
                        item.errorMsg=JZY.locale.$t('{g.networkError}')
                    }
                })
            },
            bytesToSize(bytes) {
                var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 KB';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                var res=(bytes / Math.pow(1024, i))
                if(i==0){
                    res=(res/1024).toFixed(1);
                    if(res==0){
                        res=0
                    }
                    return res+'KB'
                }
                return res.toFixed(1) + sizes[i];
            },
            getFileInput(){



                // debugger

                // return this.$refs.attachUploaderWrapper.querySelector('[type=file]');
                // return this.$refs.attachUploaderWrapper.querySelector('[type=file]');
                // return jQuery(document.querySelector('.webuploader-pick')).next().get(0).querySelector('[type=file]');
                // return jQuery(document.querySelector('#abcde .webuploader-pick')).next().get(0).querySelector('[type=file]');
                return this.$refs.attachUploaderWrapper.querySelector('[type=file]')



                },
            openOSFilePicker(){
                // console.log('this.$refs.attachUploaderWrapper--:',this.$refs.attachUploaderWrapper)
                // alert(jQuery(this.$refs.attachUploaderWrapper.querySelector('.webuploader-pick')))
                // this.$nextTick(()=>{
                //     this.getFileInput().click()
                // })

                // setTimeout(()=>{
                    this.getFileInput().click()
                // },1000)

            },
            startUpload(){
                this.hasHttpError=false
                this.isUploading=true
                this.uploader.upload();
            }
        },
        watch:{
            appId(){this.getFilesList()},
            businessId(){this.getFilesList()},
            categoryId(){this.getFilesList()},
            readonly(v){
                // this.$watch('readonly',(v)=>{
                if(!v && (!this.isInitUpload)){
                    this.initUpload()
                }
                // })
            }
        },
        props: {
            multiple:{
                type:Boolean,
                default:true
            },
            readonly:{
                type:Boolean,
                default:false
            },
            required:{
                type:Boolean,
                default:true
            },
            appId:{
                type:[String,Number],
                default:'0'
            },
            businessId:{
                type:[String,Number],
                default:'0'
            },
            categoryId:{
                type:[String,Number],
                default:'0'
            },
            type:{
                type:String,
                default:'file'
            }


            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        // updated(){
        //
        //         console.log("this.appId",this.appId)
        // },
        created(){

        },
        data() {



            return {
                fileNumLimit:10,
                // lastUploadFilesListLen:0,//757
                webUploaderName:'upload'+JZY.u.uuid(),
                hasHttpError:false,
                // initUpload:null,
                isInitUpload:false,
                wrapperId:JZY.u.uuid(),
                isDetailListFetched:false,
                isUploading:false,
                // isUploadFinished:this.required,
                uploader:null,
                uploadFilesList:[

                ],
            }
        },

        beforeDestroy(){
            try{

                // window.WebUploader.Uploader.unRegister(self.webUploaderName)
                this.uploader.destroy()
            }catch(e){}

        },
        destroyed(){

        },
        // watch:{
        //     readonly(value){
        //         if(value&&(!this.isInitUpload)){
        //
        //         }
        //     }
        // },
        async mounted() {
            JZY.DEBUG_MODE && (window.ATTACH_UPLOAD=this)
            await JZY.s.getScript('/static/web-uploader/webuploader.js')
            var self=this,
                uploader




            self.initUpload=initUpload

            function initUpload(){


                console.log('init upload was invoked')

                if(self.isInitUpload){
                    return false
                }

                self.isInitUpload=true


                // fileNumLimit<=uploadFilesList.length
                // WebUploader.Uploader.register({
                //     name:self.webUploaderName,
                //
                //     'before-send-file':function(file){
                //         var task = new jQuery.Deferred();
                //
                //         try{
                //             let rowIndex = self.uploadFilesList.findIndex((item) => item.file === file),
                //                 row=self.uploadFilesList[rowIndex]
                //
                //
                //             if(self.fileNumLimit<=self.uploadFilesList.length){
                //                 uploader.skipFile(file);
                //                 uploader.removeFile(file);
                //                 self.uploadFilesList.splice(rowIndex,1)
                //                 task.reject()
                //             }else{
                //                 task.resolve()
                //             }
                //         }catch(e){
                //             console.warn('before send file e--:',e)
                //         }
                //
                //
                //
                //
                //
                //         return jQuery.when(task);
                //     }
                //
                //     // 'init':function(){
                //     //     setTimeout(()=>{
                //     //         let file=self.getFileInput()
                //     //         console.log('kcuf_u file---:',file)
                //     //
                //     //         // file.removeEventListener('change',self.startUpload)
                //     //         file.addEventListener('change',function(){
                //     //             console.log('file change---:',this.arguments)
                //     //         })
                //     //     })
                //     // }
                // })

                // WebUploader.Uploader.register({
                //     'before-send-file': 'beforeSendFile',
                //     'before-send': 'beforeSend',
                //     'init':'init'
                // }, {
                //
                //     init(){
                //
                //         // setTimeout(()=>{
                //             let file=self.getFileInput()
                //
                //             file.removeEventListener('change',self.startUpload)
                //             file.addEventListener('change',self.startUpload)
                //         // })
                //
                //     },
                //
                //     beforeSendFile: function (file) {
                //
                //         JZY.s.clog("file in before send file---:",file,self.uploadFilesList,self.uploadFilesList.length)
                //
                //         let row=self.uploadFilesList.find((item)=>item.file===file)
                //
                //         // row.infoMsg=JZY.locale.$t('{g.upload.calculatingMd5}')
                //
                //         // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
                //         var task = new $.Deferred(),md5Defer;
                //
                //
                //         task.resolve();
                //         return $.when(task);
                //     },
                //
                //
                //     beforeSend: function (block) {
                //
                //
                //
                //         // console.log(block)
                //         var task = new $.Deferred();
                //         // var file = block.file;
                //         // var missChunks = file.missChunks;
                //         // var blockChunk = block.chunk;
                //         // console.log("当前分块：" + blockChunk);
                //         // console.log("missChunks:" + missChunks);
                //         //
                //         //
                //         // if (missChunks !== null && missChunks !== undefined && missChunks !== '') {
                //         //     var flag = true;
                //         //     for (var i = 0; i < missChunks.length; i++) {
                //         //         if (blockChunk == missChunks[i]) {
                //         //             console.log(file.name + ":" + blockChunk + ":还没上传，现在上传去吧。");
                //         //             flag = false;
                //         //             break;
                //         //         }
                //         //     }
                //         //     if (flag) {
                //         //         task.reject();
                //         //     } else {
                //         //         task.resolve();
                //         //     }
                //         // } else {
                //         //     task.resolve();
                //         // }
                //
                //         task.resolve();
                //         return $.when(task);
                //     }
                // });




                uploader=self.uploader = window.WebUploader.create({
                    fileNumLimit:self.fileNumLimit,
                    compress:false,
                    resize: false,
                    duplicate:true,
                    maxSelectedFilesCount:10,
                    pick: {
                        id: '#'+self.wrapperId+'picker',
                        label: '选择文件',
                        multiple:self.multiple
                    },
                    fileVal:'resource',
                    formData: {
                        // guid: 0,
                        // fileHashCode: '',
                        // chunkSize: chunkSize,
                        "Authorization": JZY.c.AUTO_LOGIN.headers.authorization,
                        // "access_token": JZY.c.AUTO_LOGIN.headers.authorization,

                    },
                    //dnd: '#dndArea',
                    //paste: '#uploader',
                    swf: '/static/web-uploader/Uploader.swf',
                    chunked: false,
                    // chunkSize: chunkSize, // 字节 1M分块
                    threads: 1,
                    // chunkRetry:0,
                    prepareNextFile:false,
                    // server: JZY.xhr.transformUrl('/disk/diskCompanyFile/chunkFileUp','GLOBAL.GATEWAY.LV_JIE',false),
                    server: JZY.xhr.transformUrl('/disk/attachmentTemp/upload','GLOBAL',false),
                    auto: false,

                    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                    disableGlobalDnd: true,
                    // fileNumLimit: 1024,
                    // fileSizeLimit: 100 * 1024 * 1024,    // 200 M

                    fileSingleSizeLimit: 20*1024*1024 //attachment/upload 1024 * 1024    // 50 M
                    
                    // fileSingleSizeLimit: 20 *attachment/upload 1024 * 1024    // 50 M
                });

                // let file=self.getFileInput()
                // file.addEventListener('change',function(){
                //     console.log('file change--:',this,arguments)
                // })



                //当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
                uploader.onUploadBeforeSend = function (obj, data,headers) {
                    console.log('before send--:',arguments)
                    headers.Authorization = JZY.c.AUTO_LOGIN.headers.authorization;




                    // appId:{
                    //     type:[String,Number],
                    // default:'0'
                    // },
                    // businessId:{
                    //     type:[String,Number],
                    // default:'0'
                    // },
                    // categoryId:{
                    //     type:[String,Number],
                    // default:'0'
                    // },
                    data.appId=self.appId;
                    data.businessId=self.businessId;
                    data.categoryId=self.categoryId;
                    data.fileName=obj.blob.name||obj.file.name;


                    // // //console.log("onUploadBeforeSend");
                    // // var file = obj.file;
                    // data.fileHashCode = fileHashCode || '';
                    // data.guid = guid;
                    //
                    // if(JZY.DEBUG_MODE){
                    //     data.parentId=12
                    // }

                };


                uploader.on('uploadProgress', function (file, percentage) {

                    console.log('progress fikes len--:',self.uploadFilesList.length,file,percentage)


                    // try{

                    let row=self.uploadFilesList.find((item)=>item.file===file)


                    console.log('progress error msg:',row.errorMsg)


                    // self.$nextTick(()=>{
                    if(row.errorMsg!=''){
                        self.handleUploadError()
                    }else{
                        row.progress=Math.max(1,Math.round(percentage*100)-1)
                    }
                    // })








                    // }catch(e){
                    //
                    // }


                });

                uploader.on('uploadFinished',function(){

                    self.isUploading=false

                    self.$emit('uploadFinished')


                    console.log('upload finished has been emitted')

                    // self.saveFiles()
                    // return false

                    // if(JZY.NODE_ENV=='testing'){
                    //     self.saveFiles()
                    // }else{
                    //     JZY.u.warningMsg('亲，如果你是前端开发者，看到此警告时候请对代码做如下修改：在每一个附件所在表单' +
                    //         '提交保存的方法中成功之后的回调里，添加' +
                    //         ' await Promise.all("attachUpload1,attachUpload2".split(",").map((ref)=>this.$refs[ref].saveFiles())) ' +
                    //         '此语句假设表单中有两个附件实例,这句代码可从demo文件中handleAttachSubmit方法里复制,记得await关键字要配合async使用哈',true)
                    // }





                })

                uploader.on('uploadSuccess', function (file,response) {

                    let row=self.uploadFilesList.find((item)=>item.file===file)
                    // let row=self.uploadFilesList.find((item)=>item.file===file)


                    console.log('upload success--:',response,row)


                    // if(self.uploadFilesList.find((item)=>item.file===file)){

                    let successFun=(clearErrorMsg=true)=>{
                        if(clearErrorMsg){
                            row.errorMsg=''
                            row.progress=100
                        }



                        row.xhrResponse=response


                        row.allowDownload=true


                        console.log('upload success fun--:',row,self.uploadFilesList)

                    }

                    try{
                        // alert(JZY.xhr.http.settings.isCodeSuccess(response))
                        if(JZY.xhr.http.settings.isCodeSuccess(response)){
                            successFun()
                        }else{

                            row.errorMsg=response.msg||response.message

                            self.hasHttpError=true
                            // alert(row.errorMsg)
                            successFun(false)
                            self.uploader.stop()
                        }
                    }catch(e){
                        successFun()
                    }




                    // }


                    console.log('upload succcess --:',file,response)
                });
                uploader.on('uploadError', function (file,response) {

                    self.handleUploadError()

                    // let row=self.uploadFilesList.find((item)=>item.file===file)
                    // row.errorMsg=JZY.locale.$t('{g.upload.networkError}')


                    console.log('upload error and res--:',file,response,typeof(response),response.toString());




                });

                uploader.on('beforeFileQueued',function(file){

                    if(self.uploadFilesList.length>=self.uploader.options.fileNumLimit){
                    // if(self.lastUploadFilesListLen>=self.uploader.options.fileNumLimit){
                        self.fileCountReachMax()
                    }

                    if(file.size==0){

                        JZY.u.warningMsg(JZY.locale.$t('{g.upload.noopSizeFileAdded}'))
                    }
                    if(file.size>self.uploader.options.fileSingleSizeLimit){
                        JZY.u.warningMsg(JZY.locale.$t('{g.upload.fileSizeTooLarge}',self.uploader.options.fileSingleSizeLimit/1024/1024))
                    }else{
                        self.$nextTick(()=>{
                            // self.uploadFilesList.forEach((item)=>{
                            //     console.log("eached item hash and file hash:",item.file.__hash,file.__hash)
                            // })


                            if(self.uploadFilesList.find((item)=>((item.file.__hash!=null) && (item.file.__hash===file.__hash)))){
                                JZY.u.warningMsg(JZY.locale.$t('{g.upload.selectedFileExistedInList}'))
                            }
                        })
                    }







                    console.log("before file queued:",file,self.uploadFilesList)
                })


                uploader.on('fileQueued', function (file) {

                    if(self.uploadFilesList.length>=self.uploader.options.fileNumLimit){
                        uploader.removeFile(file,true);
                        self.fileCountReachMax()
                        return false
                    }


                    self.uploadFilesList.push({
                        file:file,
                        isLoading:false,
                        fileSize:file.size,
                        errorMsg:'',
                        cannotPerview:false,
                        infoMsg:'',
                        allowDownload:false,
                        md5Progress:0,
                        progress:0,
                        paused:false
                    })
                    // self.lastUploadFilesListLen++

                    self.$nextTick(()=>{







                        self.$emit('fileQueued',file)
                        // self.isUploadFinished=false


                        self.startUpload()
                    })

                    // let maxMB=250
                    //
                    // if(file.size>maxMB*1024*1024){
                    //     JZY.u.warningMsg("单个文件大小不能超过"+maxMB+"MB");
                    //     return false;
                    // }


                    //
                    // console.log('find index---:',self.uploadFilesList.findIndex((item)=>item.file===file))
                    //
                    //
                    // // return false;
                    //
                    //
                    // uploader.md5File(file)
                    // // .progress(function (percentage) {   // 及时显示进度
                    // //     console.log('计算md5进度:', percentage);
                    // //     // getProgressBar(file, percentage, "MD5", "MD5");
                    // // })
                    //     .then(function (val) { // 完成
                    //
                    //
                    //         console.log('md5 result again:', val);
                    //         return false
                    //
                    //
                    //
                    //
                    //
                    //
                    // });

                });

                // 文件上传
                // $btn.on('click', function () {
                //     console.log("上传...");
                //     uploader.upload();
                //     console.log("上传成功");
                // });


                // this.$nextTick(()=>{
                //
                // })
            }


            // if(this.readonly){
                // if(!)



            this.getFilesList()



                // return false;
            // ?


            // fileVal










        },

    }
</script>