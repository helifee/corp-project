<template>
    <div class="dia-wrap" >
        <h3>{{detailData.planTitle}}</h3>
        <span class="dia-wrap-time" v-if="type=='week'&&timeRangeFormat.startTime">{{timeRangeFormat.startTime}}~{{timeRangeFormat.endTime}}</span>
        <p class="time">
            最后提交于{{detailData.publishDate}}
        </p>
        <ul>
            <li>
                <!--<h4>{{typeName.planContent}}</h4>-->
                <p class="plan-lable"><span class="circle"></span><span>{{typeName.planContent}}</span></p>

                <div v-if="detailData.planContent" style="padding-left: 28px">
                    <pre>{{detailData.planContent}}</pre>
                </div>
                <p v-else  style="padding-left: 28px" class="gray">未填写</p>
            </li>
            <li>
                <!--<h4>{{typeName.planResult}}</h4>-->
                <p class="plan-lable"><span class="circle" style="background-color: #F8E71C"></span><span>{{typeName.planResult}}</span></p>

                <div v-if="detailData.planResult" style="padding-left: 28px"><pre>{{detailData.planResult}}</pre></div>
                <p v-else  style="padding-left: 28px" class="gray">未填写</p>
            </li>
            <li>
                <!--<h4>{{typeName.planSummary}}</h4>-->
                <p class="plan-lable"><span class="circle"></span><span>{{typeName.planSummary}}</span></p>

                <div v-if="detailData.planSummary" style="padding-left: 28px"><pre>{{detailData.planSummary}}</pre></div>
                <p v-else  style="padding-left: 28px" class="gray">未填写</p>
            </li>
        </ul>
        <!--&&(detailData.orgShareDtoList.length||uploadShow)-->
        <div class="planshare" v-if="showShare">
            <div class="item1" v-if="detailData.userShareDtoList.length|| detailData.roleShareDtoList.length||detailData.orgShareDtoList.length">
                <span>共享：</span>
                <el-tag style="margin-right: 12px;margin-top: 12px;margin-bottom:8px" type="success" v-for="item,index in detailData.orgShareDtoList" :key="index">{{item.name}}</el-tag><el-tag style="margin-right: 12px"  type="info" v-for="item in detailData.roleShareDtoList">{{item.name}}</el-tag><el-tag style="margin-right: 12px"  type="danger" v-for="item in detailData.userShareDtoList">{{item.name}}</el-tag>
          </div>
            <div class="item2" style="padding:3px 0 16px 20px;line-height: 32px" v-if="uploadShow">
                <span>附件：</span>
                <attach-upload
                        style="display: inline-block;vertical-align: top;"
                        ref="attachUpload"
                        :required="false"
                        :readonly="true"
                        :multiple="false"
                        :appId="detailData.appId"
                        :businessId="detailData.businessId"
                        :categoryId="detailData.categoryId">
                </attach-upload>
            </div>
        </div>
        <div>
            <smart-comment
                    :commentUserId = 'detailData.createPersonId'
                    :businessId="detailData.businessId"
                    business_type="2">
            </smart-comment>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default{
        name: 'reportDetail',
        props:{
            'detailData':{
                require:false,
            },
            'type':{
                require:true
            },
            'showShare':{
                require:false
            }
        },
        computed:{
            timeRangeFormat(){
                let startTime = moment(this.detailData.weekPlanStartDate).format("MM-DD");
                let endTime = moment(this.detailData.weekPlanEndDate).format("MM-DD");
                return {
                    startTime:startTime,
                    endTime:endTime,
                }
            },
        },
        methods:{
            changeTitle(type){
                let dataTitle = {};
                console.log(type,"typetypetype");

                switch(type) {
                    case 'week':
                        dataTitle={
                            planContent:'本周计划内容',
                            planResult:'本周工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                    case 'month':
                        dataTitle={
                            planContent:'本月计划内容',
                            planResult:'本月工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                    case 'quarter':
                        dataTitle={
                            planContent:'本季度计划内容',
                            planResult:'本季度工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                    case 'year':
                        dataTitle={
                            planContent:'本年计划内容',
                            planResult:'本年工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                }
            },
        },
        data(){
            return {
                uploadShow: true,
                typeName:{},
            }
        },
        watch:{
            type(curVal,oldVal){
                this.changeTitle(curVal)
            },
        },
        mounted(){
            this.changeTitle(this.type)
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dia-wrap{
        h3{
            font-size: 16px;
            font-weight: normal;
            margin: 20px 0 3px 0;
            display: inline-block;
            color: $theme-black-title;
            /*padding-bottom: 16px;*/
        }
        .dia-wrap-time{
            margin: 0px 20px 0px 20px;
            height: 24px;
            line-height: 24px;
            display: inline-block;
            color: $theme-black-other;
        }
        .time{
            height: 24px;
            line-height: 24px;
            margin: 0px 0 12px 0;
            font-size: 12px;
            color: $theme-black-other;
        }
        ul{
            li{
                h4{
                    padding-top: 12px;
                    font:16px normal;
                }
                div{
                    font-size: 14px;
                    line-height: 32px;
                    color: #333333;
                }
            }
        }
        .planshare{
            margin-top: 30px;
            -webkit-border-radius:3px;
            -moz-border-radius:3px;
            border-radius:3px;
            margin-bottom: 60px;
            .item1,item2{
                line-height: 24px;
                padding:20px;
            }
            .item1{
            }
        }
        .gray{
            color:  #C8C8C8;
        }
        .plan-lable{
            font-size: 14px;
            height: 32px;
            padding: 0;
            margin: 24px 0 0 0;
            span{
                float: left;
                vertical-align: middle;
                line-height: 18px;
            }
            .circle{
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background-color: $theme-blue;
                margin-right: 8px;
            }
        }
    }
</style>
