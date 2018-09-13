
<template>
<div>
  <!--表格-->
  <!-- 仅作展示用 -->
        <el-table ref="myTable"
                :data="tableData5"
                :default-sort = "{prop: 'date'}"
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}"
                @row-click='show' 
                @selection-change='handleSelectionChange'
                style="width: 100%; text-align:center;">

                <el-table-column
                    label="联系人"
                    width="120"
                    prop="contactName"
                    >
                </el-table-column>
                <el-table-column
                    label="联系方式"
                     width="100"
                    prop="contactWay"
                    >
                </el-table-column>
                <el-table-column
                    label="决策关系"
                     width="100"
                    prop="decisionRole"
                    >
                </el-table-column>
                <el-table-column
                    label="商机"
                     width="100"
                    prop="opportunityName"
                    >
                </el-table-column>
                <el-table-column
                    label="跟进目标"
                     width="120"
                    prop="target"
                    >
                </el-table-column>
                <el-table-column
                    label="计划跟进时间"
                    sortable
                    width="140"
                    prop="contactTime"
                    >
                </el-table-column>
                <el-table-column
                    label="跟进人"
                     width="100"
                    prop="createPersonName"
                    >
                </el-table-column>
                <el-table-column
                    label="更新时间"
                     width="140"
                    sortable
                    prop="updateDate"
                    >
                </el-table-column>
                <el-table-column
                    label="操作" width="">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <i class="el-icon-mobile-phone"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <i class="el-icon-edit" @click="showCustomerDialogUpdate(scope.row.customerId)"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="作废" placement="bottom">
                            <i class="el-icon-delete" @click="voidMethod(scope.row.customerId)"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>

            <!-- <el-table-column v-if="isSelection"
                type="selection"
                width="100%">
                </el-table-column>  -->
                 
            <!-- <el-table-column
                v-for='(item, key) in tableTitle'
                :key='key'
                :prop='item.type'
                :label='item.name'
                :width='item.width'
                :formatter='item.formatter'
                :sortable='item.sortable'
                
            >
            </el-table-column> -->
            <!-- <slot name="otherscolumn"></slot> -->
        </el-table>
        <!--分页-->
        <el-pagination v-if="dataTotal==0?false:true" style="float: right; margin-top:20px; margin-bottom:0px; margin-left:12px; margin-right:12px;"
            :current-page="pageNum"
            :page-size="pageCount"
            :page-sizes="[10,20,50,100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
</div> 
</template>
<script>
import {customerFollowPlan} from '@Main/crm/getData'
    export default{
        components:{
        },
        // props:[
        //     "tableData", //
        //     "tableTitle", //必传
        //     "isSelection",  //是否显示多选
        //     "multipleSelection" //取消多选
        // ],
            
        computed:{
            
        },
        methods:{
            test(obj){
                console.log(obj);
                this.contactName=obj.contactName;
                this.startTime=obj.startTime;
                this.endTime=obj.endTime;
                console.log(this.endTime);


                let customerId=this.$route.query.customerId;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });


            },
            // 获取列表数据
            async customerFollowPlanData( {
                customerId = '' ,
                contactId = '' ,
                opportunityId = '' ,
                contactName='',
                startTime = '',
                endTime = '',
                pageNum="",
                pageCount = ''
             } = {} ){
                let res = await customerFollowPlan(
                    customerId,
                    contactId,
                    opportunityId,
                    contactName,
                    startTime,
                    endTime,
                    pageNum,
                    pageCount
                    )
                console.log(res[0].list);
                res[0].list.forEach((item)=>{
                    if(item.decisionRole=="0"){
                        item.decisionRole="普通员工";
                    }else if(item.decisionRole=="1"){
                        item.decisionRole="采购决策人";
                    }else if(item.decisionRole=="2"){
                        item.decisionRole="项目决策人";
                    }else if(item.decisionRole=="3"){
                        item.decisionRole="人事决策人";
                    }
                })
                
                res[0].list.forEach((item)=>{
                    if(item.contactWay=="0"){
                        item.contactWay="电话";  
                    }else if(item.contactWay=="1"){
                        item.contactWay="邮件";
                    }else if(item.contactWay=="2"){
                        item.contactWay="短信";
                    }else if(item.contactWay=="3"){
                        item.contactWay="上门拜访";
                    }else if(item.contactWay=="4"){
                        item.contactWay="会务";
                    }
                })
                res[0].list.forEach((item)=>{
                    item.contactTime=item.contactTime.substring(0,item.contactTime.length-3);
                })
                this.tableData5=res[0].list;
                console.log("跟进数据",this.tableData5);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total
               
            },
            show(item){
                this.$emit("row-click",item)
            },
            handleSelectionChange(item){
                this.$emit("selection-change",item)
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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.info(typeof val)
                this.pageCount = val;
                let customerId=this.$route.query.customerId;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.info(typeof val)
                this.pageNum = val
                let customerId=this.$route.query.customerId;
                let contactId=this.$route.query.contactId;
                let opportunityId=this.$route.query.opportunityId;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contactName=this.contactName;
                let startTime=this.startTime;
                let endTime=this.endTime;
                this.customerFollowPlanData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':customerId,
                        'contactId':contactId,
                        'opportunityId':opportunityId,
                        'contactName':contactName,
                        'startTime':startTime, 
                        'endTime':endTime, 
                    });
            },

        },
        data(){
            return {
                tableData5:[],
                pageNum:1,
                pageCount:10,
                dataTotal:0,
                pageTotal:1,
                list:[],  
                contactName:'',
                startTime:'',
                endTime:''
            }
        },
        watch : {
        },
        created (){
            let customerId=this.$route.query.customerId;
            let contactId=this.$route.query.contactId;
            let opportunityId=this.$route.query.opportunityId;
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            let contactName=this.contactName;
            let startTime=this.startTime;
            let endTime=this.endTime;
            this.customerFollowPlanData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'contactId':contactId,
                    'opportunityId':opportunityId,
                    'contactName':contactName,
                    'startTime':startTime, 
                    'endTime':endTime, 
                });
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   
</style>