<template>
    <right-slide-modal
            :title="detailData.stockName"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button plain  @click="editOfficeHanlder(id)">编辑</el-button></li>
                <li><el-button plain @click="operateClose">关闭</el-button></li>
            </ul>
        </div>
        <div>
            <div class="detail-content">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">物品名称：</span>
                            <span class="des">{{detailData.stockName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">物品编号：</span>
                            <span  class="des">{{detailData.stockNum}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">类别：</span>
                            <span  class="des">{{detailData.typeName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">规格：</span>
                            <span  class="des">{{detailData.stockSpecifications}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">品牌：</span>
                            <span  class="des">{{detailData.stockBrand}}</span>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">单位：</span>
                            <span  class="des">{{detailData.meteringUnit}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">库存量：</span>
                            <span  class="des">{{detailData.stockCount}}</span>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content ">
                            <span class="label">状态：</span>
                            <span v-if="!detailData.state">禁用</span>
                            <span v-else>启用</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <hr/>
            <h3>库存记录</h3>
            <div class="detail-record">
                <el-table
                        :data="detailData.officeInOutDtoList"
                        style="width: 100%">
                    <el-table-column
                            prop="type"
                            :label="l('{officeLocale.goods.detail.record.type}')"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="getUserPersonName"
                            :label="l('{officeLocale.goods.detail.record.requisition}')"
                            width="180"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="outPerson"
                            :label="l('{officeLocale.goods.detail.record.operation}')"
                            width="180"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            :label="l('{officeLocale.goods.detail.record.time}')">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            :label="l('{officeLocale.goods.detail.record.number}')">
                        <template slot-scope="scope">
                            {{scope.row.type |typeSymbol}}{{scope.row.count}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </right-slide-modal>
</template>

<script>
    import editOffice from '@Main/officeSupplies/components/edit/edit.office.vue'
    import {mapMutations,mapGetters} from 'vuex'
    import {getofficeInfo} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
            editOffice
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            id:{
                required:false
            },
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
//            关闭
            operateClose(formName){
                this.$emit("closeCreateModal");
            },
            editOfficeHanlder (id){
                this.$emit("showCreateModal",id);
            },
            //根据Id获取物品详情 id
            async rqOfficeIn(id){
                let res = await getofficeInfo (id);
                this.detailData = {...res};
            },
        },
        data(){
            return {
                detailData:{}
            }
        },
        watch:{
            propsDialogVisible:{
                handler(curVal){
                    if(curVal){
                        this.rqOfficeIn(this.id)
                    }

                }
            }
        },
        mounted (){

        },

        filters:{
            typeSymbol (value){
                //项目等级：0正常、1紧急、2非常紧急
                switch (value) {
                    case '出库':
                        return '-';
                    case '入库':
                        return '+';
                    case '2':
                        return '非常紧急';
                    default:
                        return '--';
                }
            },
            state (value){
                //'项目状态 ：0进行中、1已延期、2未启动、3已完成、4已撤销。',
                switch (value) {
                    case '0':
                        return '进行中';
                    case '1':
                        return '已延期';
                    case '2':
                        return '未启动';
                    case '3':
                        return '已完成';
                    case '4':
                        return '已撤销';
                    default:
                        return '--';
                }
            },
            time (value){
                return moment(value).format('YYYY-MM-DD')
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate-buttons {
        margin-top: 8px;
        float: right;
    }
    .label{
        color: $theme-black-other;
        width: 78px;
        text-align: right;
        margin-right: 12px;
        display: inline-block;
        float: left;
    }
    .des{
    }
</style>
