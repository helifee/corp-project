<template>
  <!--表格-->
        <el-table
                :data="tableData"
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}"
                @row-click='show' style="width: 100%">

            <el-table-column v-if="isSelection"
                type="selection"
                width="55">
                </el-table-column>   
            <el-table-column
                v-for='(item, key) in tableTitle'
                :key='key'
                :prop='item.type'
                :label='item.name'
                :width='item.width'
            >
            </el-table-column>
            <slot name="otherscolumn"></slot>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination> -->
</template>
<script>
    export default{
        components:{
        },
        props:[
            "tableData", //
            "tableTitle", //必传
            "isSelection",  //是否显示多选
            "multipleSelection" //取消多选
        ],
            
        computed:{
            
        },
        methods:{
            show(item){
                this.$emit("iteme",item)
            }
        },
        data(){
            return {
                
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   
</style>