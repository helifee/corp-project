<template>
    <div class="wrap">
        <div class="content-title">
            <h3>销售商机</h3>
            <ul class="operation">
                <li>
                    <el-dropdown split-button type="primary" @click="showBusinessDialog">
                        <i class="el-icon-plus"></i> 创建商机
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>导出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>

        </div>
        <!--项目列表-->
        <div class="project-wrap">
            <div>
                <ul class="color-panle">
                    <li v-for ="(item,index) in customerClassChange" @click="tab(index)" :class="{cur:index == showIndex}"  :style="{  width: item.width +'%', backgroundColor: item.color }">{{item.name}}（{{item.value}}）</li>
                </ul>
            </div>
            <!--查询条件-->
            <div class="project-search">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                    <el-form-item label=" 查询名称：" prop="searchVal">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 预计签约金额：" prop="searchVal1">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 预计签约日期：" prop="searchVal2">
                        <el-date-picker
                                v-model="searchForm.searchVal"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

            </div>
            <!--表格-->
            <my-table :tableTitle="tableTitle" :tableData="tableData">
                    <el-table-column slot="otherscolumn"
                            prop="des"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="flowUpfn(scope.row,'modify')">跟进</el-button>
                            <el-button type="text" size="small" @click="editBusinessFn(scope.row,'modify')">编辑</el-button>
                            <el-button @click="editBusinessFn(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </my-table>
        </div>
        <!--分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
        <dialog-create-business  :dialogVisible="businessDialogVisible"  @showGoodsModal="showGoodsDialog" @closeCreateModal="showBusinessDialog"></dialog-create-business> <!--选择物品的弹窗-->
        <dialog-choose-goods  class="goods" :dialog-visible="goodsDialogVisible"  @chooseGoodsHandle="chooseDataDia" @closeCreateModal="showGoodsDialog"></dialog-choose-goods>

    </div>
</template>

<script>
    import dialogCreateBusiness from '@Main/crm/components/dialog.create.business.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'
    import myTable from '@Main/crm/components/table.vue'

    export default{
        components: {
            dialogCreateBusiness,
            dialogChooseGoods,
            myTable
        },
        methods:{
            //创建跟进
            flowUpfn(){

            },
            //商机新建及修改
            editBusinessFn(){

            },
            tab(index){
                if(this.showIndex == index){
                    this.showIndex = -1;
                }else{
                    this.showIndex = index;
                }

            },
            showBusinessDialog(){
                this.businessDialogVisible  = !this.businessDialogVisible;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            submitForm(formName) {
                console.log(this[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
            },
            jump(){
                location.href = "#/crm/business/details/2"
            },
            //选择物品的弹窗
            showGoodsDialog(){
                this.goodsDialogVisible = !this.goodsDialogVisible;
            },


            //获取从弹窗选择的物品
            chooseDataDia (val){
                console.log(val,"val");
                this.chooseGoodsData = [...val];
            }
        },
        data(){
            return {
                tableTitle:[{
                      type:"name",
                      name:"商机名称"
                    },
                    {
                      type:"header",
                      name:"负责人"
                    },
                    {
                      type:"cusromerName",
                      name:"客户名称"
                    },
                    {
                      type:"contacts",
                      name:"主要联系人"
                    },
                    {
                      type:"phone",
                      name:"手机"
                    },
                    {
                      type:"estimateMoney",
                      name:"预计成交额"
                    },
                    {
                      type:"time",
                      name:"预计签约时间"
                    },
                    {
                      type:"stage",
                      name:"商机阶段"
                    }
                ],
                tableData:[],
                showIndex:-1,
                businessDialogVisible:false,
                goodsDialogVisible:false,
                searchForm:{
                    searchVal:'',
                    searchVal1:'',
                    searchVal2:'',
                    searchVal3:'',
                },
                chooseGoodsData:[],

                currentPage4: 4,
                content:"",
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
                tableData5: [{
                    id: '11',
                    businessName: '智能设备再购1',
                    header: '张芳',
                    cusromerName: '北京分享科技有限公司',
                    contacts: '张海',
                    telephone: '14911927889',
                    estimateMoney: '1,000,000',
                    estimateTime: '2018-03-10 13:23:34',
                    stage: '立项',
                },{
                    id: '22',
                    businessName: '智能设备再购',
                    header: '张芳',
                    cusromerName: '北京分享科技有限公司',
                    contacts: '张海',
                    telephone: '14911927889',
                    estimateMoney: '1,000,000',
                    estimateTime: '2018-03-10 13:23:34',
                    stage: '初步沟通',
                },{
                    id: '33',
                    businessName: '智能设备再购',
                    header: '张芳',
                    cusromerName: '北京分享科技有限公司',
                    contacts: '张海',
                    telephone: '14911927889',
                    estimateMoney: '1,000,000',
                    estimateTime: '2018-03-10 13:23:34',
                    stage: '需求商定',
                },{
                    id: '44',
                    businessName: '智能设备再购',
                    header: '张芳',
                    cusromerName: '北京分享科技有限公司',
                    contacts: '张海',
                    telephone: '14911927889',
                    estimateMoney: '1,000,000',
                    estimateTime: '2018-03-10 13:23:34',
                    stage: '方案报价',
                }],
                UEconfig:{
                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:250,//设置编辑器高度
                    // 设置不自动调整高度
                    scaleEnabled:false//不可以拉伸
                },

                customerClassification:{
                    value1:66,
                    value2:23,
                    value3:48,
                    value4:25,
                    value5:28,
                    value6:30,
                },
                customerClass:[{
                    name:'立项',
                    value:66,
                    width:0,
                    color:'#eed3d7'
                },{
                    name:'初步沟通',
                    value:23,
                    width:0,
                    color:'#5fe9ee'
                },{
                    name:'需求商定',
                    value:48,
                    width:0,
                    color:'#62ee3b'
                },{
                    name:'方案报价',
                    value:25,
                    width:0,
                    color:'#ee3535'
                },{
                    name:'赢单',
                    value:28,
                    width:0,
                    color:'#2758aa'
                },{
                    name:'输单',
                    value:30,
                    width:0,
                    color:'#aaa'
                }],
            }
        },
        computed:{
            customerClassChange: function () {
                let customerNumber = 0;
                for (let key in this.customerClassification){
                    customerNumber +=  Number(this.customerClassification[key]);
                }
                return this.customerClass.map(function (item) {
                    item.width = item.value/customerNumber*100;
                    return item;
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        background: #ffffff;
        .content-title{
             position: relative;
             margin: 12px 0px;
             line-height: 32px;
             height: 48px;
             border-bottom: 1px solid #eeeeee;
             h3{
                 padding-left: 18px;
             }
            .operation{
                position: absolute;
                right: 20px;
                top:0px;
                padding: 8px 12px;
                li{
                    float: left;
                    margin-left: 20px;
                }
            }

        }
        .project-wrap{
            padding: 20px;
        }
        .el-pagination{
            float: right;
            margin: 20px 12px;
        }
    }
    .slide-modal{
        .operation{
            position: fixed;
            top: 70px;
            right:0px;
            width: 82.333%;
            height: 36px;
            background: rgba(255,255,255,0.3);
            z-index: 1001;
            ul{
                float: right;
                li{
                    float: left;
                    margin-right: 16px;
                    .el-button{
                        padding: 6px 18px;
                        border-radius: 0px;
                        margin-top: 4px;
                        font-weight: normal;
                        color: #82848a;
                    }
                }
            }
        }
        .dia-content{
            margin-top: 60px;
            .information{
                position: relative;
                .add{
                    position: absolute;
                    right: 24px;
                    top:10px;
                    color: #409EFF;
                    font-size: 30px;
                    z-index: 5;
                    cursor: pointer;
                }
            }

        }
    }
    /*项目进度滑块位置调整*/
    .el-slider .el-slider__button-wrapper{
        top:-18px;
    }
    .color-panle{
        width: 100%;
        height: 48px;
        li:first-child{
            border-radius: 36px 0px 0px 36px;
        }
        li:last-child{
            border-radius: 0px 36px 36px 0px;
        }
        li{
            float: left;
            height: 36px;
            line-height: 36px;
            vertical-align: middle;
            text-align: center;
            cursor: pointer;
        }
        li.cur{
            height: 50px;
            line-height: 50px;
            margin-top: -7px;
        }
        li.cur:first-child{
            border-radius: 36px 0px 0px 36px;
        }
        li.cur:last-child{
            border-radius: 0px 36px 36px 0px;
        }
    }
    .goods{
        z-index: 3000!important;
    }
</style>
