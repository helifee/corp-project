
<template>
  <!--表格-->
  <!-- 可用于为每例添加自定义的点击事件 -->
        <el-table ref="myTable"
                :data="tableData"
                 :show-header="showheader"
                 :row-class-name='rowClassNameFn'
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}"
                @row-click='show' 
                @selection-change='handleSelectionChange'
                style="width: 100%">

            <el-table-column v-if="isSelection"
                type="selection"
                width="55">
                </el-table-column> 
                 
            <el-table-column
                v-for='(item, key) in tableTitle'
                :key='key'
                :prop='item.type'
                :label='item.name'
                :show-overflow-tooltip='item.showoverflowtooltip'
                :align="item.align || 'center'"
                :width='item.width'
                :formatter='item.formatter'
                :sortable='item.sortable'
                :class='item.class'
                
            >
                <template slot-scope="scope">
                    <div v-if="item.solt" :class="{'overflowClass':item.overflowClass}">
                        <span class="linkSpan" @click="item.solt.clickFn(scope.row)" v-if="item.solt.clickFn">{{ scope.row[item.solt.label]}}</span>
                    </div>
                    <div v-else :class="{'overflowClass':item.overflowClass}">
                        <span v-if="item.formatter" >{{ item.formatter(scope.row) }}</span>
                        <span v-else style="">{{ scope.row[item.type]}}</span>
                    </div>
                </template>
            </el-table-column>
            <slot name="otherscolumn"></slot>
        </el-table>
</template>
<script>
    export default{
        components:{
        },
        props:[
            "rowClassNameFn",
            "showheader",
            "tableData", //
            "tableTitle", //必传
            "isSelection",  //是否显示多选
            "multipleSelection" //取消多选
        ],
            
        computed:{
            
        },
        methods:{
            show(item){
                this.$emit("row-click",item)
            },
            handleSelectionChange(item){
                this.$emit("selection-change",item)
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
   .linkSpan{ cursor: pointer; }
   .linkSpan:hover{color:#46A7FF}
   .overflowClass{overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
   
</style>