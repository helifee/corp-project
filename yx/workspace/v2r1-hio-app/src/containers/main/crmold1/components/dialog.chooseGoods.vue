<template>
    <el-dialog title="选择产品" :visible.sync.stop="propsDialogVisible">
        <!--检索内容-->
        <el-form :inline="true" :model="searchForm"  ref="searchForm" style="padding-left: 22px">
            <el-form-item label="">
                <!--<cascader-tree v-model="searchForm.houseId" :sid="searchForm.houseId" style="width: 200px" @chooseValue="chooseVal" ></cascader-tree>-->
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchForm.stockName" placeholder="请输入物品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search('searchForm')">查询</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
                ref="multipleTable"
                :data="tableData"
                @selection-change="handleSelectionChange"
                :row-key="getRowKeys"
        >
            <el-table-column
                prop="id"
                type="selection"
                :reserve-selection="true"
                width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="产品名称">
            </el-table-column>
            <el-table-column
                    prop="unit"
                    label="单位"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="des"
                    label="描述"
                    width="300">
            </el-table-column>
        </el-table>
        <ul>
            <li><el-button @click="confirm">确定</el-button></li>
            <li><el-button @click="operateClose">取消</el-button></li>
        </ul>
    </el-dialog>
</template>

<script>
    let tableData = [{
        "name":"台式机1",
        "unit":"台",
        "price":"18000.00",
        "des":"i5 4G内存 1T硬盘",
    },{
        "name":"台式机2",
        "unit":"台",
        "price":"18000.00",
        "des":"i5 4G内存 1T硬盘",
    },{
        "name":"台式机3",
        "unit":"台",
        "price":"18000.00",
        "des":"i5 4G内存 1T硬盘",
    },{
        "name":"台式机4",
        "unit":"台",
        "price":"18000.00",
        "des":"i5 4G内存 1T硬盘",
    },{
        "name":"台式机5",
        "unit":"台",
        "price":"18000.00",
        "des":"i5 4G内存 1T硬盘",
    }];

    import ElButton from "../../../../plugins/element-ui/packages/button/src/button";
//    import cascaderTree from '@Main/officeSupplies/components/cascader.tree.vue'
//    import {postOfficeHouseQueryList} from  '@Main/officeSupplies/getData.js'
    export default{
        components:{
            ElButton,
//            cascaderTree
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            },
        },
        methods:{
            //取消
            operateClose(){
                this.$emit("closeCreateModal");
            },

            //选中
            handleSelectionChange(rows) {

                this.multipleSelection = rows;

                this.selectId = [];
                if (rows) {
                    rows.forEach(row => {
                        if (row) {
                            this.selectId.push(row.id);
                        }
                    });
                }
            },
            toggleSelection() {
//                if (rows) {
//                    rows.forEach(row => {
//                        this.$refs.multipleTable.toggleRowSelection(row);
//                    });
//                } else {
//                    this.$refs.multipleTable.clearSelection();
//                }
            },

            //确定
            confirm (){
//                let that = this
//                this.multipleSelection.forEach(function(item){
//                    that.ids.push({id: item.id})
//                });
//                console.log(this.multipleSelection,"this.multipleSelection");
//                console.log(this.ids,"this.ids");
                if(this.multipleSelection.length){
                    this.$emit("chooseGoodsHandle",this.multipleSelection);
                    this.$emit("closeCreateModal");
                }else{
                    this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }

            },
            chooseVal(val){
                this.searchForm.houseId = val.sid;
                console.log(val.typeName,val.sid)
//                this.$set(this.form,"houseId",typeName)
            },
            //
//            async rqGoodsData (){
//                let houseId = this.searchForm.houseId;
//                let stockName = this.searchForm.stockName;
//                let res = await postOfficeHouseQueryList (houseId,stockName,"1","1","10");
//                let resData = res[0];
//                this.goodsData = {...resData};
//
//            },
            //禁用
//            checkboxInit(row,index){
//                let result = 1;
//                if(this.ids.length){
//                   this.ids.map(function (item1) {
//                        if (item1.id == row.id){
//                            console.log(item1.id,"item1.id不可勾选啊啊")
//                            result =  0;
//                            return;
//                        }
//                        if(!result){
//                            return;
//                        }
//                    })
//                }
//                console.log(result,"result")
//                return result;
//
//
//            },
            search (){
                console.log(this.searchForm);
//                this.rqGoodsData();
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
//                this.rqGoodsData();
            },
        },
        data(){
            return {

                // 获取row的key值
                getRowKeys(row) {
                    return row.sid;
                },
                tableData:tableData,
                goodsData:{},//列表数据
                multipleSelection:[],
                selectId:[],
                searchForm:{
                    houseId:'',
                    stockName:'',
                },
//                goodsData:[
//                    {"id":"001", "value": "铅笔0", "category": "办公用品","name":'铅笔0', "code":"001", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"002", "value": "铅笔1", "category": "办公用品","name":'铅笔1', "code":"002", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"003", "value": "铅笔2", "category": "办公用品","name":'铅笔2', "code":"003", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"004",  "value": "铅笔3", "category": "办公用品","name":'铅笔3', "code":"004", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"005",  "value": "铅笔4", "category": "办公用品","name":'铅笔4', "code":"005", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"006",  "value": "铅笔5", "category": "办公用品","name":'铅笔5', "code":"006", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"007",  "value": "铅笔6", "category": "办公用品","name":'铅笔6', "code":"007", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"008",  "value": "铅笔14", "category": "办公用品","name":'铅笔14', "code":"015", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                ],
//                goodsData2:[
//                    {"id":"044", "value": "铅笔44", "category": "办公用品","name":'铅笔0', "code":"001", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"002", "value": "铅笔2", "category": "办公用品","name":'铅笔1', "code":"002", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"003", "value": "铅笔3", "category": "办公用品","name":'铅笔2', "code":"003", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"045",  "value": "铅笔45", "category": "办公用品","name":'铅笔3', "code":"004", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"018",  "value": "铅笔18", "category": "办公用品","name":'铅笔4', "code":"005", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"023",  "value": "铅笔5", "category": "办公用品","name":'铅笔5', "code":"006", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"004",  "value": "铅笔4", "category": "办公用品","name":'铅笔6', "code":"007", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"006",  "value": "铅笔6", "category": "办公用品","name":'铅笔14', "code":"015", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                ],
//                goodsData3:[
//                    {"id":"001", "value": "铅笔0", "category": "办公用品","name":'铅笔0', "code":"001", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"002", "value": "铅笔1", "category": "办公用品","name":'铅笔1', "code":"002", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"003", "value": "铅笔2", "category": "办公用品","name":'铅笔2', "code":"003", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"004",  "value": "铅笔3", "category": "办公用品","name":'铅笔3', "code":"004", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"005",  "value": "铅笔4", "category": "办公用品","name":'铅笔4', "code":"005", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"006",  "value": "铅笔5", "category": "办公用品","name":'铅笔5', "code":"006", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"007",  "value": "铅笔6", "category": "办公用品","name":'铅笔6', "code":"007", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                    {"id":"008",  "value": "铅笔14", "category": "办公用品","name":'铅笔14', "code":"015", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
//                ],
            }
        },
        watch:{
            propsDialogVisible(curVal,oldVal){
                if(curVal){
//                    this.rqGoodsData();
                    console.log(this.$refs)
//                    this.$refs.multipleTable.clearSelection();
                }
            },

            },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
