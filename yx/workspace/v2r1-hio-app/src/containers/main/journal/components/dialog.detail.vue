<template>
    <right-slide-modal
            title="日志查看"
            @open="rqJouranlDetail(journalId)"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-button plain @click="operateClose">关闭</el-button>
                </li>
            </ul>


        </div>
        <div v-if="detailData.sid" v-loading="!detailData.sid" style="min-height: 500px">
            <div class="detail">
                <!--<div class="avatar">头像</div>-->
                <!--<div class="filter-content">-->
                <!--<p class="member">杨帆</p>-->
                <!--<div>今日工作内容已经完成，原型设计</div>-->
                <!--<p class="time">2018-01-04 09：52：30</p>-->
                <!--</div>-->
                <div class="avatar">
                    <img :src="detailData.imgUrl || '/static/images/logo.png' " alt="">

                </div>
                <div class="filter-content">
                    <p class="member">{{detailData.createPersonName}}</p>
                    <pre v-html="detailData.content"></pre>
                    <p class="time">{{detailData.createDate}}</p>
                </div>
            </div>
            <div>
                <smart-comment
                        :commentUserId = 'detailData.createPersonId'
                        :businessId="detailData.sid"
                        business_type="3">
                </smart-comment>
            </div>
        </div>

        <!--<smart-comment-->
                <!--:businessId="journalId">-->
        <!--</smart-comment>-->
    </right-slide-modal>
</template>

<script>
    import {getJouranl} from '@Main/journal/getData.js'

    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            journalId:{
                required:true
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
            //获取日志详情
            async rqJouranlDetail(id){
                let res = await getJouranl(id);
                this.detailData = {...res};
                console.log(res,"获取日志详情");
            },


            async rqJouranlDetail(id){
                let res = await JZY.xhr.r([{
                    type: 'get',
                    url: '/journal/get/'+id,
                    data: {}
                }], 'GLOBAL.MA_CHANG_XI', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {
                        this.detailData = {...res[0]};
                        return res;

                    } catch (e) {
                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
            }

        },
        data(){
            return {
                detailData:{}
            }
        },
        watch:{
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
        position: relative;
        /*border-top: 1px solid #ccc;*/
        padding: 16px;
        .avatar{
            width: 40px;
            height: 40px;
            background-color: #fff;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            left: 20px;
            top:20px;
            img{
                width: 40px;
                height: 40px;
            }
        }
        .filter-content{
            margin-left:60px;
            .member {
                color: $theme-blue;
                font-size: 14px;
                line-height: 32px;
                margin: 0px;
            }
            pre{
                font-size: 14px;
                line-height: 24px;
                color: $theme-black;
            }
            .time{
                color: #666666;
                font-size: 12px;
                line-height: 24px;
                display: inline-block;
            }
        }
    }
</style>
