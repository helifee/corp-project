<template>

    <right-slide-modal
            title="入库详情"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateClose" size="medium ">关闭</el-button></li>
            </ul>
        </div>
        <div>
            <div>
                <div class="detail">

                    <span class="label">入库单编号：</span>{{detailData.code}}<br>
                    <span class="label">入库主题：</span>{{detailData.theme}}<br>
                    <span class="label">入库人：</span>{{detailData.inPersonName}}
                    <span class="label" style="margin-left: 150px">入库时间：</span>{{detailData.createDate}}
                </div>
                <hr>
                <h3>入库记录</h3>
                <el-table :data="detailData.officeInInfoDtoList">
                    <el-table-column
                            label="序号">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column property="stockName" label="物品名称" width="150"></el-table-column>
                    <el-table-column property="typeName" label="物品类别" width="200"></el-table-column>
                    <el-table-column property="stockNum" label="编号"></el-table-column>
                    <el-table-column property="stockSpecifications" label="规格"></el-table-column>
                    <el-table-column property="stockBrand" label="品牌"></el-table-column>
                    <el-table-column property="meteringUnit" label="单位"></el-table-column>
                    <el-table-column property="officeinfoNum" label="入库数量"></el-table-column>
                </el-table>
            </div>
        </div>
    </right-slide-modal>

</template>

<script>
import {getGoodsIn} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            id:{
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
//          关闭
            operateClose(formName){
                this.$emit("closeCreateModal");
            },
            //根据Id获取入库，包含物品详情列表 id
            async rqGoodsStorage(id){
                let res = await getGoodsIn (id);
                this.detailData = {...res};
                console.log(res,"details")
            },


        },
        data(){
            return {
                detailData:{}
            }
        },
        watch:{
            id:{
                handler(curVal){
                    this.rqGoodsStorage(curVal)
                }
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate-buttons {
        margin-top: 8px;
        float: right;
    }
    .detail{
        line-height: 36px;
        .label{
            width: 150px;
            text-align: right;
            margin-right: 12px;
            display: inline-block;
        }
    }

</style>
