<template>
    <div class="meetingTable">
        <el-table  :data="tableData"  :header-cell-class-name="tableHeaderCell" @sort-change="handleSortChange">
            <el-table-column prop="mtTitle" label="会议主题"  min-width="300" show-overflow-tooltip >
                <template slot-scope="scope" >
                    <router-link  :to="'/meeting/detail/' + scope.row.meetingInfoId ">{{ scope.row.mtTitle}}</router-link>
                    <!--<span v-else>{{ scope.row.mtTitle}}</span>-->
                </template>

            </el-table-column>
            <el-table-column prop="createPersonName"  label="创建人"  width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="statusName"  label="会议状态"  width="110" >
                <template slot-scope="scope">
                    <span v-text="meetingsatename(scope.row.statusName)"></span>
                </template>
            </el-table-column>
            <el-table-column prop="beginDate"  label="召开时间"  width="240" sortable="custom"></el-table-column>
            <el-table-column prop="distanceDate"  label="距离开始时间"  width="150" sortable="custom"></el-table-column>
            <el-table-column   label="操作"  width="150" >
                <template  slot-scope="scope" >
                     <span v-if="scope.row.haveMeetingSummary=='1'"
                           @click="viewRecord(scope.$index, scope.row)" class="operation">查看纪要</span>
                    <span v-else-if="scope.row.haveMeetingSummary=='2'"
                          @click="writeRecord(scope.$index, scope.row)" class="operation">填写纪要</span>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="page" v-if="pagination">
            <el-row justify="right">
                <el-col :span="24">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNum"
                            :page-sizes="[10,20, 50, 100]"
                            :page-size="pageCount"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="dataTotal">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "meetingTable",
        props:{
            // tableData:{
            //     required:true
            // },
            viewMeetingDetail:{
                type:Boolean
            },
            isCopyMe:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                tableData:[
                    {
                        mtTitle:"",
                        statusName:"",
                        createPersonName:"",
                        beginDate:"",
                        distanceDate:"",
                        haveMeetingSummary:"",  //0什么也不显示，1查看会议纪要，2填写会议纪要
                        meetingSummaryId:"",     //会议纪要id
                        meetingInfoId:""         //会议id
                    }
                ],
                // tableSort:[{
                //     prop: 'status',
                //     order: 'asc'
                // },{
                //     prop: 'beginDate',
                //     order: 'asc'
                // }],
                tableSort:"",
                pageTotal:0,   //总页数
                pageNum:1,      //当前页数
                pageCount:10, //分页大小,每页多少条
                dataTotal:0,   //数据总条数
                searchForm:"",
                // existCopySend:""
                pagination:false
            }
        },
        methods:{
            tableHeaderCell(){
                return "tableHeaderCell"
            },
            meetingsatename(val){
                switch(val){
                    case "0":return "草稿";
                    case "1":return "会议中";
                    case "2":return "未开始";
                    case "3":return "已结束";
                }
            },
            viewRecord(index,row){
                // console.log("index:"+index+";row:"+row.state)
                this.$emit("showViewRecordDialog",row)
            },
            writeRecord(index,row){
                this.$emit("showWirteRecordDialog",row)

            },
            handleSortChange(sortInfo){
                // debugger
                if(sortInfo.prop=="distanceDate"){
                    if(sortInfo.order.startsWith("desc")){
                        this.tableSort="distanceDate-desc"
                    }else{
                        this.tableSort="distanceDate-asc";
                    }
                }else if(sortInfo.prop=="beginDate"){
                    if(sortInfo.order.startsWith("desc")){
                        this.tableSort="begin_date-desc";
                    }else{
                        this.tableSort="begin_date-asc";
                    }
                }else {
                    this.tableSort="";
                }
                this.getMeetingListData(this.searchForm);
            },
            handleSizeChange(size){
                this.pageCount=size;
                this.getMeetingListData(this.searchForm);
            },
            handleCurrentChange(currentPage){
                this.pageNum=currentPage;
                this.getMeetingListData(this.searchForm);
            },
            handleResetPageNum(){
                this.pageNum=1;
            },
            async getMeetingListData(searchForm){
                // this.loading=true;
                //existCopySend true是我的抄送
                this.searchForm=searchForm;
                // this.existCopySend=existCopySend;
                // let strSort="m.status "+this.tableSort[0].order+",m.begin_date "+this.tableSort[1].order
                let pas={pageNum:this.pageNum,pageCount:this.pageCount,orderBy:this.tableSort,
                    status:searchForm.state,mtTitle:searchForm.theme,existCopySend:this.isCopyMe};
                await JZY.xhr.post('/meeting/meetingInfo/page',pas,{alertSuccess:false}).then((resultData)=>{
                    try{
                        this.tableData=resultData[0].list;
                        // this.loading=false;
                        this.pageTotal=resultData[0].pageTotal;
                        this.pageNum=resultData[0].pageNum;
                        this.dataTotal=resultData[0].total;
                        if(this.dataTotal==0){
                            this.pagination=false;
                        }else{
                            this.pagination=true;
                        }
                    }catch (e){
                        this.$message("meetingTable.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
        }

    }
</script>

<style  lang="scss">
    .meetingTable{
        background:#fff;
        .el-table{
            .tableHeaderCell{
                color:#333333;
                background-color: rgba(250, 250, 250, 1);
            }
            .operation{
                color: #409EFF;
                cursor:pointer;
            }
        }
        .page{
            padding:10px 0;
            text-align: right;
        }
    }
</style>