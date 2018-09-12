<template>
<div class="storage-detail">
    <div class="content-title">

        <div class="operation">
            <ul>
                <li><el-button  @click="goback" size="small">返回</el-button></li>
            </ul>
        </div>
    </div>
    <div>
        <div v-loading="loading">
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
                        label="序号"
                width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column property="stockName" label="物品名称" min-width="180"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column property="typeName" label="物品类别" min-width="160"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column property="stockNum" label="编号"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column property="stockSpecifications" label="规格"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column property="stockBrand" label="品牌"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column property="meteringUnit" label="单位"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column property="officeinfoNum" label="入库数量"
                                 show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
    </div>


</div>


</template>

<script>
    JZY.locale.add('officeLocale',require('./../../office.locale'))
    import {getGoodsIn} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
        },
        props:{
        },
        computed:{

        },
        methods:{
//          关闭
            goback(){
                JZY.router.push('/office/storage')
            },
            //根据Id获取入库，包含物品详情列表 id
            async rqGoodsStorage(id){
                let res = await getGoodsIn (id);
                this.detailData = {...res};
                this.loading = false;
                console.log(res,"details")
            },


        },
        data(){
            return {
                detailData:{},
                id:'',
                loading:true
            }
        },
        watch:{

        },
        mounted (){
            this.id = this.$route.params.id;
            this.rqGoodsStorage(this.id)
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .storage-detail{
        background-color: #fff;
        padding: 16px 24px;

        .content-title{
            position: relative;
            /*padding: 0px 0px 12px;*/
            line-height: 32px;
            /*height: 48px;*/
            margin-left: 24px;
            border-bottom: 1px solid #eeeeee;
            background: #ffffff;
            min-height: 44px;
            h3{
                min-height: 32px;
                color: #191919;
                font-size: 14px;
                font-weight: normal;
                padding: 0px 210px 0px 0px;
                span{
                    font-size: 12px;
                    display: inline-block;
                    margin-left: 12px;
                }
            }
            .operation{
                position: absolute;
                top: 0px;
                right: 8px;
                z-index: 1001;
                ul{
                    float: right;
                    li{
                        float: left;
                        margin-right: 16px;
                    }
                }
            }
        }

    }
    hr{
        border:0 none;
        background-color: $theme-grey-input-border;
        height:1px;
    }
    .detail{
        padding-top: 16px;
        line-height: 36px;
        .label{
            color: $theme-black-other;
            width: 78px;
            text-align: right;
            margin-right: 12px;
            display: inline-block;
        }
    }

</style>
