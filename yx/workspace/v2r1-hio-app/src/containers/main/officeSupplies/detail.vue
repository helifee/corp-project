<template>
    <div class="wrap">
        <el-button plain>
            <router-link class="" :to="'/office/edit/qqq' + 1">{{l('{officeLocale.goods.otherButtons.edit}')}}</router-link>
        </el-button>
        <el-button plain @click="goback()">{{l('{officeLocale.goods.otherButtons.goback}')}}</el-button>

        <div class="detail-content">
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.name}')}}：</span>{{goods.name}}
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.number}')}}：</span>{{goods.number}}
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.category}')}}：</span>{{goods.category}}
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.specification}')}}：</span>{{goods.specification}}
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.brand}')}}：</span>{{goods.brand}}
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.unit}')}}：</span>{{goods.unit}}
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="grid-content ">
                        <span>{{l('{officeLocale.goods.detail.inventory}')}}：</span>{{goods.inventory}}
                    </div>
                </el-col>
            </el-row>
        </div>
        <hr/>
        <div class="detail-record">
            <el-table
                    :data="goods.recordData"
                    style="width: 100%">
                <el-table-column
                        prop="type"
                        :label="l('{officeLocale.goods.detail.record.type}')"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="requisition"
                        :label="l('{officeLocale.goods.detail.record.requisition}')"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="operation"
                        :label="l('{officeLocale.goods.detail.record.operation}')">
                </el-table-column>
                <el-table-column
                        prop="time"
                        :label="l('{officeLocale.goods.detail.record.time}')">
                </el-table-column>
                <el-table-column
                        prop="number"
                        :label="l('{officeLocale.goods.detail.record.number}')">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    JZY.locale.add('officeLocale',require('./office.locale'))
    import reportDetail from '@Main/plan/report.Detail.vue'
    export default{
        components:{
            reportDetail
        },
        methods:{
            goback(){
                this.$router.back(-1);
            }
        },
        data(){
            return {
                goods:{
                    number: 'H008',
                    name: '固体胶',
                    specification:'36g',
                    brand:'得力',
                    unit:'个',
                    inventory:'1',
                    recordData:[{
                        type:'入库',
                        requisition:'王丽丽',
                        operation:'曲丽丽',
                        time:'2017-10-01 12:00:23',
                        number:'+20'
                    },{
                        type:'出库',
                        requisition:'王丽丽',
                        operation:'曲丽丽',
                        time:'2017-10-01 12:00:23',
                        number:'-20'
                    },{
                        type:'入库',
                        requisition:'王丽丽',
                        operation:'曲丽丽',
                        time:'2017-10-01 12:00:23',
                        number:'+20'
                    }
                    ],
                }
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        height: 100%;
        overflow-y: scroll;
        padding: 22px;
        .detail-content{
            overflow-x: hidden;
            width: 100%;
            .grid-content{
                span{
                    font-size: 16px;
                    display: inline-block;
                    width: 120px;
                    text-align: right;
                    line-height: 48px;
                    margin-right: 12px;
                }
            }
        }
    }

</style>
