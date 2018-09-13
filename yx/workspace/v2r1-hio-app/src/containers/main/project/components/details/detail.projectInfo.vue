<template>
    <div class="content-list-wrap" :class="{hiddenClass:!showList}">

        <el-form ref="form" label-position="right" label-width="85px" class="form">
            <el-row>
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content" style="position: relative">
                        <el-form-item label="项目进度："><el-progress :percentage="infoData.projectProgressBar" style="width: 130px;position: relative;left: 0px;top: 13px;"></el-progress></el-form-item>
                        <!--<span class="name">项目进度：</span><el-progress :percentage="infoData.projectProgressBar" style="width: 130px;position: relative;left: 64px;top: -18px;"></el-progress>-->
                    </div>
                <!--</el-col>-->

                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="起止日期：">{{infoData.projectStart}}~{{infoData.projectEnd}}</el-form-item>
                        <!--<span class="name">起止日期：</span><span class="text">{{infoData.projectStart}}~{{infoData.projectEnd}}</span>-->
                    </div>
                <!--</el-col>-->
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="紧急程度：">{{infoData.projectLevel | level}}</el-form-item>
                        <!--<span class="name">紧急程度：</span><span class="text">{{infoData.projectLevel | level}}</span>-->
                    </div>
                <!--</el-col>-->
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="负责人：">{{infoData.projectResponsiblePersonName}}</el-form-item>
                        <!--<span class="name">负责人：</span><span class="text">{{infoData.projectResponsiblePersonName}}</span>-->
                    </div>
                <!--</el-col>-->
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="创建人：">{{infoData.projectCreatePersonName}}</el-form-item>
                        <!--<span class="name">创建人：</span><span class="text">{{infoData.projectCreatePersonName}}</span>-->
                    </div>
                <!--</el-col>-->
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="创建于：">{{infoData.createDate}}</el-form-item>
                        <!--<span class="name">创建于：</span><span class="text">{{infoData.createDate}}</span>-->
                    </div>
                <!--</el-col>-->
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="沟通群组：">{{infoData.projectCommunication | communication}}</el-form-item>
                        <!--<span class="name">沟通群组：</span><span class="text">{{infoData.projectCommunication | communication}}</span>-->
                    </div>
                <!--</el-col>-->
                <!--<el-col :span="6"  class="items">-->
                    <div class="grid-content">
                        <el-form-item label="云盘：">{{infoData.projectNetDisk | netDisk}}</el-form-item>
                        <!--<span class="name">网盘文件夹：</span><span class="text">{{infoData.projectNetDisk | netDisk}}</span>-->
                    </div>
                <!--</el-col>-->

                <!--<el-col :span="6"  class="items">-->
                    <!--<div class="grid-content">-->
                        <!--<span class="name">状态：</span><span class="text">{{infoData.projectStatus | state}}</span>-->
                    <!--</div>-->
                <!--</el-col>-->
                <el-col :span="24"  class="items">
                    <div class="">
                        <el-form-item label="参与人："><span v-for="item,index in infoData.projectParticipantPersonList" :key="index">{{item.teamPersonName}}&nbsp;&nbsp;&nbsp;&nbsp;</span></el-form-item>
                        <!--<span class="name">参与人：</span>-->
                        <!--<span class="text">-->
                            <!--<span v-for="item,index in infoData.projectParticipantPersonList" :key="index">{{item.teamPersonName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                        <!--</span>-->
                    </div>
                </el-col>
                <el-col :span="24"  class="items">
                    <div class="">
                        <el-form-item label="共享人："><span v-for="item,index in infoData.projectSharePersonList" :key="index">{{item.teamPersonName}}&nbsp;&nbsp;&nbsp;&nbsp;</span></el-form-item>
                        <!--<span class="name">共享人：</span>-->
                        <!--<span class="text">-->
                            <!--<span v-for="item,index in infoData.projectSharePersonList" :key="index">{{item.teamPersonName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                        <!--</span>-->
                    </div>
                </el-col>
                <el-col :span="24"  class="items">
                    <div class="">
                        <el-form-item label="项目描述：">
                            <pre  class="text project-desc" style="margin-left: 66px;margin-top: -30px">{{infoData.projectDesc}}</pre>
                        </el-form-item>
                        <!--<span class="name">项目描述：</span>-->
                    </div>
                </el-col>
                <el-col :span="24"  class="items">
                    <div class=" ">
                        <!--project-upload-->
                        <el-form-item label="附件：">
                           <span style="display: inline-block">
                                <attach-upload
                                        style="width: 500px;height: 36px;display: inline-block;overflow: hidden;margin-bottom: -12px"
                                        ref="attachUpload"
                                        :required="false"
                                        :readonly="true"
                                        :multiple="false"
                                        :appId="infoData.appId"
                                        :businessId="infoData.sid"
                                        :categoryId="infoData.categoryId">
                                </attach-upload>
                            </span>
                        </el-form-item>
                        <!--<span class="name">附件：</span>-->
                        <!--<span class="text">-->
                            <!--<span style="display: inline-block">-->
                                <!--<attach-upload-->
                                    <!--style="width: 500px;height: 36px;display: inline-block;overflow: hidden;margin-bottom: -12px"-->
                                    <!--ref="attachUpload"-->
                                    <!--:required="false"-->
                                    <!--:readonly="true"-->
                                    <!--:multiple="false"-->
                                    <!--:appId="infoData.appId"-->
                                    <!--:businessId="infoData.sid"-->
                                    <!--:categoryId="infoData.categoryId">-->
                                <!--</attach-upload>-->
                            <!--</span>-->
                        <!--</span>-->
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <div class="o-bt" @click="isShow()">
            <div v-show="!showList">
                <span class="el-icon-arrow-down"></span>
                <span>查看详情</span>
            </div>
            <div v-show="showList">
                <span class="el-icon-arrow-up"></span>
                <span>收起</span>
            </div>
        </div>

    </div>
</template>
<script>

    export default {
        components: {

        },
        data() {
            return {
                showList:false,
            }

        },
        props:{
            infoData:{
                type:Object,
                required:true
            },
            randomNum:{

                required:false
            }
        },
        computed: {

        },
        filters:{
            level (value){
                //项目等级：0正常、1紧急、2非常紧急
                switch (value) {
                    case '0':
                        return '正常';
                    case '1':
                        return '紧急';
                    case '2':
                        return '非常紧急';
                    default:
                        return '--';
                }
            },
            state (value){
                //'项目状态 ：0进行中、1已延期、2未启动、3已完成、4已撤销。',
                switch (value) {
                    case '0':
                        return '进行中';
                    case '1':
                        return '已延期';
                    case '2':
                        return '未启动';
                    case '3':
                        return '已完成';
                    case '4':
                        return '已撤销';
                    default:
                        return '--';
                }
            },
            communication(value){
                switch (value) {
                    case '0':
                        return '未创建';
                    case '1':
                        return '已创建';
                    default:
                        return '未创建';
                }
            },
            netDisk(value){
                switch (value) {
                    case '0':
                        return '未创建';
                    case '1':
                        return '已创建';
                    default:
                        return '未创建';
                }
            },
        },
        methods: {
//isShow
            isShow(){
                this.showList = !this.showList;
//                console.log('isShow',this.$refs.attachUpload.uploadFilesList.length);
            },

        },
        watch: {
            randomNum(){
                this.$refs.attachUpload.getFilesList();

//                console.log('randomNum',this.$refs.attachUpload.uploadFilesList.length);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .content-list-wrap{
        background-color: #ffffff;
        position: relative;
        padding: 12px;
        .el-form .el-form-item{
            margin-bottom: 0px;
        }
        .grid-content{
            min-width: 240px;
            width: 24%;
            float: left;
        }
        /*.items{*/
            /*float: left;*/
            /*!*width:25%;*!*/
            /*line-height: 1.5em;*/
            /*font-size:12px;*/
            /*box-sizing: border-box;*/
            /*display: -webkit-box;*/
            /*padding:10px;*/
            /*.name{*/
                /*color:#A0A0A0;*/
            /*}*/
            /*.text{*/
                /*color:#505050;*/
            /*}*/
        /*}*/
        .o-bt{
            text-align: center;
            color:#46A7FF;
            cursor: pointer;
            font-size:14px;
            .el-icon-arrow-up,.el-icon-arrow-down{
                color:#fff;
                background:#46A7FF;
                width:18px;
                height:18px;
                line-height: 18px;
                text-align: center;
                border-radius: 50%;
            }
        }
        .o-bt:hover{
            color: #2C92EE;
            .el-icon-arrow-up,.el-icon-arrow-down{
                background: #2C92EE;;
            }

        }
    }
    .content-list-wrap.hiddenClass{
        position: relative;
        overflow: hidden;
        height: 30px;
        .el-row{
            width:90%;
            overflow: hidden;
        }
        .o-bt{
            position: absolute;
            right:20px;
            top: 20px;
        }
    }

    .project-desc{
        display: inline-block;
        vertical-align: top;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .project-upload{
        .noData{
            line-height: 40px;
        }
    }
</style>
