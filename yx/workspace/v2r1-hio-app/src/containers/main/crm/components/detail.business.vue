<template>

<div class="participants-wrap">
         <div style="width:80%; margin-bottom:10px;">
                <ul class="color-panle">
                    <li v-for ="(item,index) in customerClassChange" 
                    @click="tab(index)" :class="{cur:index == showIndex}"
                        :key="index"
                      :style="{  width: item.width +'%', backgroundColor: item.color }">
                      {{item.name}}（{{item.value}}）</li>
                </ul>
            </div>
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label=" 商机名称:" prop="key">
                    <el-input v-model="searchForm.key" placeholder="输入商机名称" style="width: 160px"></el-input>
                </el-form-item>
                <el-form-item label=" 预计签约金额:" prop="amount">
                    <el-input v-model="searchForm.amount.start" placeholder="￥" style="width: 80px"></el-input>

                    <el-input v-model="searchForm.amount.start" placeholder="￥" style="width: 80px"></el-input>
                </el-form-item>
                <el-form-item label=" 预计签约日期:" prop="date">
                    <el-input v-model="searchForm.date" placeholder="输入手机号" style="width: 160px"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
            </el-form>

        </div>
        <!--新建任务-->
        <el-button type="primary" class="add-part" @click="showGoodsDialog"><i class="el-icon-plus"></i> 添加商机</el-button>
        <tableCrm :isSelection="isSelection"></tableCrm>
        <dialog-create-business  :dialogVisible="businessDialogVisible"  @showGoodsModal="showGoodsDialog"  @closeCreateModal="showGoodsDialog"></dialog-create-business> <!--选择物品的弹窗-->
        <dialog-choose-goods  class="goods" :dialog-visible="goodsDialogVisible"  @chooseGoodsHandle="chooseDataDia" @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>

    </div>

</template>

<script>
    import tableCrm from '@Main/crm/components/table.vue'
    import dialogCreateBusiness from '@Main/crm/components/dialog.create.business.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'

    export default{
        components:{
            tableCrm,
            dialogCreateBusiness,
            dialogChooseGoods
        },
        props:{
            
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
        },
        methods:{
            showGoodsDialog(){
                this.businessDialogVisible = !this.businessDialogVisible;
            },
            closeGoodsDialog(){
                this.goodsDialogVisible = !this.goodsDialogVisible;
            },
            //获取从弹窗选择的物品
            chooseDataDia (val){
                console.log(val,"val");
                this.chooseGoodsData = [...val];
            },

            tab(index){
                if(this.showIndex == index){
                    this.showIndex = -1;
                }else{
                    this.showIndex = index;
                }

            },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
            },
        },
        data(){
            return {
                businessDialogVisible:false,
                goodsDialogVisible:false,
                showIndex:0,
                isSelection:true,
                searchForm:{
                    key:'',
                    amount: ''
                },
                searchRules:{
                    key: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                customerClassification:{
                    value1:66,
                    value2:23,
                    value3:48,
                    value4:25,
                    value5:28
                },
                customerClass:[{
                    name:'立项',
                    value:66,
                    width:0,
                    color:'rgba(255, 204, 0, 1)'
                },{
                    name:'初步沟通',
                    value:23,
                    width:0,
                    color:'rgba(255, 102, 153, 1)'
                },{
                    name:'需求商定',
                    value:48,
                    width:0,
                    color:'rgba(255, 153, 0, 1)'
                },{
                    name:'方案报价',
                    value:25,
                    width:0,
                    color:'rgba(0, 204, 0, 1)'
                },{
                    name:'未联系',
                    value:28,
                    width:0,
                    color:'rgba(204, 0, 153, 1)'
                }],
                
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   .participants-wrap{
        position: relative;
        .add-part {
            position: absolute;
            right: 20px;
            top:0px;
            padding: 8px 12px;
            border-radius: 0px;
        }
    }
    .color-panle{
        width: 100%;
        height: 48px;
        color:#fff;
        font-size:12px;
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
</style>
