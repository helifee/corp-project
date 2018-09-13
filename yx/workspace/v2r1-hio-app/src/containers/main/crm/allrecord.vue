<template>
    <div class="wrap">
        <div class="content-title">
            <h3>我的全部商机</h3>
            <el-button type="primary" size="small" class="goback" @click="goback">返回</el-button>
        </div>
        <div class="content">
            <!--搜索-->
            <div class="search recordSearch">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="rules"  ref="searchForm">
                    <el-form-item label="商机名称：" prop="name">
                        <el-input v-model="searchForm.name" placeholder="输入商机名称" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="预计成交金额：" prop="startMoney">
                        <numberInput style="width:120px;" type="blend" prefix-icon placeholder="￥"
                            v-model="searchForm.startMoney">
                        </numberInput>
                        <!-- <el-input v-model="searchForm.contacts" placeholder="请输入关键词进行检索" style="width: 240px"></el-input> -->
                    </el-form-item>
                    <el-form-item label="" prop="">
                        -
                    </el-form-item>
                    <el-form-item label="" prop="endMoney">
                        <numberInput style="width:120px;" type="blend"  prefix-icon placeholder="￥"
                            v-model="searchForm.endMoney">
                        </numberInput>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="search">查询</el-button>
                        <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

            </div>
            <!--结果-->
            <div>
                <el-table
                        :data="tableData"
                        style="width: 100%;text-align: center;"
                        :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                        :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
                    <el-table-column
                            prop="name"
                            label="商机名称"
                             width="140">
                    <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/business/details/' + scope.row.sid + '?customer=' + scope.row.customerId ">{{ scope.row.name}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="personInChargeName"
                            label="负责人"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="customerName"
                            width="140"
                            label="客户名称">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/customer/details?customerId=' + scope.row.customerId">{{ scope.row.customerName}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="contactName"
                            label="联系人"
                            width="80">
                        <template slot-scope="scope">
                            <router-link class="apprave-detail-panel" :to="'/crm/contacts/details?customerId=' + scope.row.customerId+'&contactId='+ scope.row.contactId">{{ scope.row.contactName}}</router-link>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                            prop="relation"
                            label="决策关系"
                            width="100">
                    </el-table-column> -->
                    <el-table-column
                            prop="phoneNumber"
                            label="手机号码"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="estimateAmount"
                            sortable
                            label="预计成交金额"
                            width="140"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="lastContactTime"
                            sortable
                            label="最后跟进"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="stage"
                            label="商机阶段"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                                <a style="cursor: pointer; color:#46A7FF; font-size:14px;" class="el-icon-tickets" @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.sid)"></a>
                            </el-tooltip>
                            <!-- <span @click="showRecordformDialog(scope.row.customerId,scope.row.contactId,scope.row.sid)" style="color: #409EFF; cursor: pointer;">查看记录</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <el-pagination v-if="dataTotal==0?false:true" style="float:right;"
                :current-page="pageNum"
                :page-size="pageCount"
                :page-sizes="[10,20,50,100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <dialog-follow-recordform-cu-spe-opp :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-spe-opp>
        <dialog-follow-record  :dialogVisible="recordDialogVisible" :recordId="recordId" @closeCreateModal="closeRecordDialog"></dialog-follow-record>
    </div>

</template>

<script>
    import dialogFollowRecordformCuSpeOpp from '@Main/crm/components/dialog.follow.recordform_cu_spe_opp.vue'
    import dialogFollowRecord from '@Main/crm/components/dialog.follow.record.vue'
    import numberInput from '@Main/crm/components/number.vue'
    import {allRecord} from '@Main/crm/getData'
    
    export default{
        components:{
            dialogFollowRecord,
            dialogFollowRecordformCuSpeOpp,
            numberInput
        },
        methods:{
            showRecordformDialogClo(){
                this.recordformDialogVisible = false;
                let customerName=this.searchForm.name;
                let startMoney=this.searchForm.startMoney;
                let endMoney=this.searchForm.endMoney;

                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'name':customerName,
                    'startAmount':startMoney,
                    'endAmount':endMoney,
                };
                this.allRecordData(obj);  
            },
            showRecordformDialog (customerId,contactId,opportunityId){
                this.recordformDialogVisible = true;
                this.$nextTick(function(){
                    this.$refs.recordformId.test(customerId,contactId,opportunityId)
                })
            },
            async allRecordData(obj){
                let res = await allRecord(obj)
                console.log(res[0]);
                res[0].list.forEach((item)=>{
                    if(item.stage=="0"){
                        item.stage="立项";
                    }else if(item.stage=="1"){
                        item.stage="初步沟通";
                    }else if(item.stage=="2"){
                        item.stage="需求商定";
                    }else if(item.stage=="3"){
                        item.stage="方案报价";
                    }else if(item.stage=="4"){
                        item.stage="赢单";
                    }else if(item.stage=="5"){
                        item.stage="输单";
                    }
                })
                this.tableData=res[0].list;
                console.log('商机数据',this.tableData);
                console.log(this.tableData);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total
            },
            //后端排序
            sortTableList(obj){
                // console.info(obj.prop)
                if (obj.prop) {//排序规则非空
                    let orderProp = obj.prop.replace(/([A-Z])/g,"_$1").toLowerCase();//驼峰命名和下划线转换
                    let orderby = orderProp + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                    this.$emit('sortTaskList',orderby)
                }
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.info(typeof val)
                this.pageCount = val;
                console.log(this.$router);
                this.$router.push({
                    path: '/crm/allrecord',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let customerName=this.searchForm.name;
                let startMoney=this.searchForm.startMoney;
                let endMoney=this.searchForm.endMoney;

                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'name':customerName,
                    'startAmount':startMoney,
                    'endAmount':endMoney,
                };
                this.allRecordData(obj);  
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.info(typeof val)
                this.pageNum = val;
                console.log(this.$router);
                this.$router.push({
                    path: '/crm/allrecord',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let customerName=this.searchForm.name;
                let startMoney=this.searchForm.startMoney;
                let endMoney=this.searchForm.endMoney;

                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'name':customerName,
                    'startAmount':startMoney,
                    'endAmount':endMoney,
                };
                this.allRecordData(obj);  
            },
            search(){
                this.$refs["searchForm"].validate((valid) => {
                    if(valid){
                        let customerName=this.searchForm.name;
                        let startMoney=this.searchForm.startMoney;
                        let endMoney=this.searchForm.endMoney;
                        
                        this.pageNum=1;
                        this.$router.push({
                            path: '/crm/allrecord',
                            query:{pageNum:this.pageNum,pageCount:this.pageCount}
                        });
                        let pageNum=this.pageNum;
                        let pageCount=this.pageCount;
                        var obj={
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'name':customerName,
                            'startAmount':startMoney,
                            'endAmount':endMoney,

                        };
                        this.allRecordData(obj); 
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.searchForm.name="";
                this.searchForm.startMoney="";
                this.searchForm.endMoney="";

                let customerName=this.searchForm.name;
                let startMoney=this.searchForm.startMoney;
                let endMoney=this.searchForm.endMoney;
                this.pageNum=1;
                this.$router.push({
                    path: '/crm/allrecord',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                var obj={
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'name':customerName,
                    'startAmount':startMoney,
                    'endAmount':endMoney,

                };
                this.allRecordData(obj);    
            },
            goback(){
                this.$router.back(-1);
            },
            showRecordDialog (id){
                this.recordId = id;
                this.recordDialogVisible = true;
            },
            closeRecordDialog (id){
                this.recordDialogVisible = false;
            },
        },
        created (){
            let pageNum=this.pageNum;
            if(this.$route.query.pageNum !==undefined){
                pageNum=this.$route.query.pageNum;
            }
            let pageCount=this.pageCount;
            if(this.$route.query.pageCount !==undefined){
                pageCount=this.$route.query.pageCount;
            }
            let customerName=this.searchForm.name;
            let startMoney=this.searchForm.startMoney;
            let endMoney=this.searchForm.endMoney;

            var obj={
                'pageNum':pageNum,
                'pageCount':pageCount,
                'name':customerName,
                'startAmount':startMoney,
                'endAmount':endMoney,
            };
            this.allRecordData(obj);  
        },
        data(){
            let my = this;
            //小数点两位验证
            let startMoneyNum = (rule, value, callback) => {
                if(value){
                    let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
                    if(reg.test(value)){
                        if(my.searchForm.endMoney && (Number(value) > Number(my.searchForm.endMoney))){
                            my.$refs.searchForm.validateField('endMoney');
                        }
                        callback();
                    }else{
                        callback(new Error("请输入13位整数或带两位小数的15位数字"))
                    }
                }else{
                     callback();
                }
            }
            let endMoneyNum = (rule, value, callback) => {
                if(value){
                    let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
                    if(reg.test(value)){
                        if(my.searchForm.startMoney && (Number(value) < Number(my.searchForm.startMoney))){
                            callback(new Error("请输入大于开始金额的数字"))
                        }else{
                            callback();
                        }
                    }else{
                        callback(new Error("请输入13位整数或带两位小数的15位数字"))
                    }
                }else{
                    callback();
                }
            }
            return {
                rules:{
                    startMoney: [
                        {validator:startMoneyNum,trigger: ['blur','change']}
                    ],
                    endMoney: [
                        {validator:endMoneyNum,trigger: ['blur','change']},
                    ],
                },
                recordformDialogVisible : false,
                searchForm:{
                    name:'',
                    // contacts:''
                    startMoney:'',
                    endMoney:'',

                },
                tableData: [],
                pageNum:1,
                pageCount:10,
                dataTotal:0,
                pageTotal:1,
                list:[],
                recordId:'',
                recordDialogVisible:false
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.recordSearch{
    .el-form-item .el-form-item__label{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #505050;
            letter-spacing: 0;
        }
    .el-form-item__error{width: 240px;}
    .el-input__inner{ height: 32px; line-height: 32px; background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 3px; font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .content-title{
            position: relative;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eeeeee;
            h3{
                padding-left: 24px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #191919;
                margin-top:0px;
                margin-bottom:0px;
            }
            .goback{
                position: absolute;
                right: 24px;
                top:15px;
            }
        }
        .content{
            padding: 16px 24px 16px 24px;
        }
    }

</style>
