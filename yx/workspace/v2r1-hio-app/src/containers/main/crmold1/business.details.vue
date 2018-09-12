<template>
    <div class="wrap">
        <div class="top-wrap">
            <div class="title-wrap">
                <div class="title-name">
                巨洲云科技有限公司
                </div>
                <div class="operate-box">
                    <el-button @click="showEdit">编辑</el-button>
                    <el-button @click="del">删除</el-button>
                    <el-button @click="back">返回</el-button>
                </div> 
            </div>
            <div class="content-list-wrap" :class="{hiddenClass:!showList}">
                <el-row>
                    <el-col :span="6"  v-for ="(item,index) in details.info" :key="index" class="items">
                        <div class="grid-content">
                            <span class="name">{{item.name}}：</span><span class="text">{{item.text}}</span>
                            </div>
                        </el-col>
                </el-row>
                <div class="o-bt" @click="isShow()">
                    <span class="el-icon-arrow-up"></span>
                    <span>收起</span>
                </div>
            </div>
        </div>
        <div class="customer-detail-tab">
            <el-tabs v-model="activeName">
                <el-tab-pane label="动态（99）" name="dynamic">
                    <detail-dynamic></detail-dynamic>
                </el-tab-pane>

                <el-tab-pane label="订单（26）" name="file" >
                    <detail-order></detail-order>
                </el-tab-pane>
                <el-tab-pane label="跟进记录（26）" name="participants">
                    <detail-followrecord></detail-followrecord>
                </el-tab-pane>
                <el-tab-pane label="跟进计划（26）" name="approval">
                    <detail-followplan></detail-followplan>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import detailDynamic from '@Main/project/components/detail.dynamic.vue'
    import detailContacts from '@Main/crm/components/detail.contacts.vue'
    import detailBusiness from '@Main/crm/components/detail.business.vue'
    import detailOrder from '@Main/crm/components/detail.order.vue'
    import detailFollowrecord from '@Main/crm/components/detail.followrecord.vue'
    import detailFollowplan from '@Main/crm/components/detail.followplan.vue'
    export default{
        components: {
            detailDynamic,
            detailContacts,
            detailBusiness,
            detailOrder,
            detailFollowrecord,
            detailFollowplan
        },
        methods:{
           isShow (){
               this.showList = !this.showList;
           },
           showEdit(){

           },
           del(){

           },
           back(){

           }
        },
        data(){
            return {
                activeName: 'dynamic',
                showList:false,
                details:{
                    info : [
                        {
                            name:"客户来源",
                            text:"网站"
                        },
                        {
                            name:"创建于",
                            text:"2017-12-29 13:28:28"
                        },
                        {
                            name:"客户类型",
                            text:"潜在客户"
                        },
                        {
                            name:"联系电话",
                            text:"010-228388378"
                        },
                        {
                            name:"客户来源",
                            text:"网站"
                        },{
                            name:"客户来源",
                            text:"网站"
                        },{
                            name:"客户来源",
                            text:"网站"
                        },{
                            name:"客户来源",
                            text:"网站"
                        },{
                            name:"客户来源",
                            text:"网站"
                        },
                    ]
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal1: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal2: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal3: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        computed:{
            
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .top-wrap{
            margin-bottom: 10px;
            position: relative;
            .title-wrap{
                position: relative;
                border-bottom:1px solid #ebeef5;
                padding:10px;
                .title-name{ font-size:20px;font-weight: bold; color:#333;}
                .operate-box{position: absolute; right:10px;bottom:0;}
            }
            .content-list-wrap{
                .items{float: left;width:25%; line-height: 1.5em;
                        font-size:13px;
                        box-sizing: border-box;
                        display: -webkit-box;
                        padding:10px;
                        .name{ color:#999}
                        .text{ color:#333}
                    }
                .o-bt{
                    text-align: center;
                    color:#2E9CFF;
                    cursor: pointer;
                    font-size:14px;
                    .el-icon-arrow-up{ color:#fff;
                    background:#2E9CFF; 
                    width:18px;height:18px;border-radius: 50%}
                }
            }
            .content-list-wrap.hiddenClass{ 
                position: relative;
                .el-row{width:90%;    overflow: hidden;
                height: 30px;}
                .o-bt{
                    position: absolute;
                    right:10px;
                    top: 10px;
                }
            }
        }
        .customer-detail-tab{
            padding:20px;
            background:#fff;
        }

    }

</style>
