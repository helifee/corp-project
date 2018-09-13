<template>
    <div class="base penal-box blue attach_i_b_f">
        <h3 :class="{'exepnd':isShow}"  @click="isShow=!isShow"><span>{{h3Title ? h3Title:"附件"}}</span></h3>
        <div class="album" v-show="!isShow">
            <div class="attach-item" style="cursor: pointer" @click.stop="downLoadFn(item)" v-for="(item,index) in attachList">
                <span class='title'><span>{{item.fullName}}</span><br><label>{{bytesToSize(item.fileSize)}}</label></span>
            </div>
        </div>
    </div>
</template>
<script>
    import mService from '../pages/m_attach/m_attach_service'
    export default {
        name:"attachItem",
        components: {

        },
        props: ['param',"isCollo","h3Title"],
        data () {
            return {
                isShow:true,
                attachList:[]
            }
        },
        mounted(){
            this.getAttachments();
        },
        methods: {
            bytesToSize(bytes) {
                var sizes = ['B', 'K', 'M', 'G', 'T'];
                if (bytes == 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return (bytes / Math.pow(1024, i)).toFixed(1) + sizes[i];
            },
           getAttachments(){
               mService.getAttachments(this.param).then((data)=>{
                   console.log(data)
                    this.attachList = data[0];
                });
           },
            downLoadFn(obj){
                let tendId = sessionStorage.getItem("tendId");
                setupWebViewJavascriptBridge(function(bridge){
                    bridge.callHandler(
                            'jzyJsHandlers',{'method':6,'params':{'tendId':tendId,'fileId':obj.sid,'fileDownloadPath':JZY.c.xhrSetting.HOST.GLOBAL+'/disk/attachment/downLoadByFileIdAndTendId/'+obj.sid+'/'+tendId,'fileName':obj.name,'fileType':obj.file,'fileSize':obj.fileSize,'fileOriName':obj.fullName,'filePreviewPath':JZY.c.xhrSetting.HOST.GLOBAL+'/disk/attachment/previewByFileIdAndTendId/'+obj.sid+'/'+tendId,'fileExtendType':obj.extendName,'fileGroupPath':'','isSupportPreview':obj.isPreview,'extType':1}},
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
            position: relative;
        }
         h3:after {
             content: " ";
             display: inline-block;
             height: 6px;
             width: 6px;
             border-width: 0 2px 2px 0;
             border-color: #C8C8CD;
             border-style: solid;
             transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
             position: absolute;
             top: 50%;
             right: 15px;
             margin-top: -4px;
         }
            h3.exepnd:after{
                border-width: 2px 2px 0 0;
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
        .attach-item {
            padding:20px 10px;
            cursor: pointer;
            overflow: hidden;
            border-bottom: 1px solid #ededed;
            position: relative;
           .title {
                float: left;
                width: 100%;
                span{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 92%;
                    display: inline-block;
                }
            }
        }
    }
</style>