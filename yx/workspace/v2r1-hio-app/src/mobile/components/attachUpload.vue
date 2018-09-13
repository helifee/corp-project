<template>
    <div class="base penal-box blue attach_i_b_f_upload">
        <h3 class="no-event"><span>{{h3Title ? h3Title : "附件"}}</span>
            <i id="camera" style="cursor: pointer;position: relative" v-show="isShowUpload">
                <input type="file" class="hid-file" id="uploadImage" name="resource" accept='image/*'>
            </i>
        </h3>
        <div class="album">
            <div class="attach-item"  @click.stop="downLoadFn(item,1)" v-for="(item,index) in attachList">
                <i class="attach-del" @click.stop="delAttach(item,index)"></i>
                <span class='title hasDel'><span>{{item.fullName}}</span><br><label>{{bytesToSize(item.fileSize)}}</label></span>
            </div>
            <div class="attach-item"  @click.stop="downLoadFn(item,3)" v-for="(item,index) in fileNewUpArray">
                <i class="attach-del" @click.stop="delAttach(item,index,1)"></i>
                <span class='title hasDel'><span>{{item.fullName}}</span><br><label>{{bytesToSize(item.fileSize)}}</label></span>
            </div>
        </div>
        <loadingComp ref="loadCompment"></loadingComp>
    </div>
</template>
<script>
    import uploadPluginW from '../static/js/jquery-file-upload/js/vendor/jquery.ui.widget.js'
    import uploadPluginU from '../static/js/jquery-file-upload/js/jquery.fileupload.js'
    import uploadPluginF from '../static/js/jquery-file-upload/js/jquery.iframe-transport.js'
    import attachment from '../static/js/my-attachment.js'
    import mService from '../pages/m_attach/m_attach_service'
    import {AlertModule,Alert} from 'vux'
    import loadingComp from './loadingComp'
    export default {
        name:"attachUpload",
        components: {
            loadingComp,
            AlertModule,
            Alert
        },
        props: ['param','maxUploadNum',"h3Title"],
        data () {
            return {
                isShow:true,
                attachNum:0,
                upLoadNum:0,
                isShowUpload:true,
                attachList:[],
                fileNewUpArray:[]
            }
        },
        mounted(){
            attachment.initFn(this.param,this.isCanUpload);
            if(this.param.businessId)  this.getAttachments();
        },
        methods: {
            bytesToSize(bytes) {
                var sizes = ['B', 'K', 'M', 'G', 'T'];
                if (bytes == 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return (bytes / Math.pow(1024, i)).toFixed(1) + sizes[i];
            },
            isCanUpload(data){
                this.fileNewUpArray = data;
                //this.attachList.push.apply(this.attachList,data);
                if(this.maxUploadNum){
                    if(data.length>=parseInt(this.maxUploadNum)){
                        this.isShowUpload = false;
                    }else{
                        this.isShowUpload = true;
                    }
                }
                console.log(data);
            },
            //删除附件
            delAttach(item,index,flag){
                this.$confirm("确定删除该附件").then(()=>{
                    const param = {
                        sid:item.sid
                    };
                    mService.deleteAttach(param).then((data)=>{
                        // console.log(data);
                        if(data[0]=="1"){
                            AlertModule.show({
                                content: '删除附件成功!'
                            })
                            setTimeout(() => {
                                AlertModule.hide()
                            }, 2000)
                            flag ? this.fileNewUpArray.splice(index,1) : this.attachList.splice(index,1);
                            this.isShowUpload = true;
                        }
                    });
                }).catch(function(){

                })
            },
            //提交 保存的时候调用
            saveAttachFn(){
                //保存附件
                let attacharr = attachment.checkIsHasNewAttach(this.fileNewUpArray);
                if(attacharr){
                    mService.saveUploadAttach(attacharr).then((data)=>{
                        console.log("保存附件成功");
                    console.log(data);
                });
                }
            },
            //获取附件列表
           getAttachments(){
               mService.getAttachments(this.param).then((data)=>{
                   console.log(data)
                    this.attachList = data[0];
                       if(this.maxUploadNum){
                           if(this.attachList.length>=parseInt(this.maxUploadNum)){
                               this.isShowUpload = false;
                           }
                       }

                });
           },
            downLoadFn(obj,extType){
                let tendId = sessionStorage.getItem("tendId");
                setupWebViewJavascriptBridge(function(bridge){
                    bridge.callHandler(
                        'jzyJsHandlers',{'method':6,'params':{'tendId':tendId,'fileId':obj.sid,'fileDownloadPath':JZY.c.xhrSetting.HOST.GLOBAL+'/disk/attachment/downLoadByFileIdAndTendId/'+obj.sid+'/'+tendId,'fileName':obj.name,'fileType':obj.file,'fileSize':obj.fileSize,'fileOriName':obj.fullName,'filePreviewPath':JZY.c.xhrSetting.HOST.GLOBAL+'/disk/attachment/previewByFileIdAndTendId/'+obj.sid+'/'+tendId,'fileExtendType':obj.extendName,'fileGroupPath':'','isSupportPreview':obj.isPreview,'extType':extType}},
                            function(response){

                            }
                    );
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

.base.penal-box {
    margin-top: 10px;
    background: #fff;
    overflow: hidden;
    padding-left: 15px;
    h3{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #191919;
        text-align: left;
        padding-left: 15px;
        padding-right: 15px;
        border-bottom: 1px solid #ededed;
        background: url(/mobilestatic/images/blue.png) 1px center no-repeat;
        background-size: 6px 20px;
        i{
            background: url(/mobilestatic/images/add.png) no-repeat;
            background-size: 20px 20px;
            display: inline-block;
            width: 20px;
            height: 20px;
            float: right;
            margin-top: 14px;
            input.hid-file {
                height: 20px;
                width: 20px;
                position: absolute;
                opacity: 0;
                z-index: 800;
                top: 0;
            }
        }
    }
    .attach-item:after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        right: 15px;
        margin-top: -4px;
    }
}
</style>