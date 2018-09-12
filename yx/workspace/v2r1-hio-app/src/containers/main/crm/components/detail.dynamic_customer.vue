<template>
    <div class="dynamic-content scrollContent1" style="">
        <div style="">
            <el-row :gutter="20" class="row" :key="index" v-for="(item,index) in this.list ">
                <el-col :span="8">
                    <div class="">
                        <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: lightgreen"></i>{{item.createPersonName}}
                    </div>
                </el-col>
                <el-col :span="8">
                    <span class="line"></span>
                    <div class="">
                        <span>{{item.changeContent}}</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="">
                        <span>{{item.createDate}}</span>
                    </div>
                </el-col>
            </el-row>
            <!-- <el-row :gutter="20" class="row">
                <el-col :span="8">
                    <div class="">
                        <i class="icon circle" style="margin-right: 20px;margin-left: 20px"></i>aaaa
                    </div>
                </el-col>
                <el-col :span="8">
                    <span class="line"></span>
                    <div class="">
                        <span>修改任务(项目启动会)状态为完成    </span>
                        <br>
                        <span>修改任务(项目启动会)状态为完成    </span>
                        <br>
                        <span>修改任务(项目启动会)状态为完成    </span>
                        <br>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="">
                        <span>2018-01-21 13：23：12</span>
                    </div>
                </el-col>
            </el-row> -->
            <!-- <el-row :gutter="20" class="row">
                <el-col :span="8">
                    <div class="">
                        <i class="icon circle" style="margin-right: 20px;margin-left: 20px"></i>aaaa
                    </div>
                </el-col>
                <el-col :span="8">
                    <span class="line"></span>
                    <div class="">
                        <span>修改任务(项目启动会)状态为完成    </span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="">
                        <span>2018-01-21 13：23：12</span>
                    </div>
                </el-col>
            </el-row> -->
        </div>
        
    </div>
</template>
<script>
    // import cService from '@Main/crm/crm_service.js'
    import {dynamic} from '@Main/crm/getData'
    export default {
        components: {

        },
        data() {
            return {
                // customerId : this.$route.query.customer,
                // opportunityId : this.$route.params.id,
                customerId:'',
                opportunityId:'',
                pageNum:1,
                pageCount:10,
                dataTotal:1,
                pageTotal:1,
                list:[],
            }
        },
        props: [],
        computed: {

        },
        filters:{
        },
        methods: {
            // async getDynamic(){
            //     let params = {
            //         customerId: this.customerId,
            //         opportunityId : this.opportunityId,
            //         pageNum : this.pageNum,
            //         pageCount : this.pageCount
            //     } 
            //     params = JSON.stringify(params);
            //     await cService.getCustomerGetAll(params).then( (data) =>{
                    
            //         console.log(data)
            //     })
            // },

            // 获取商机动态数据
            async dynamicData( {
                customerId = '' ,
                opportunityId = '' ,
                pageNum='',
                pageCount=''
            } = {} ){
                let res = await dynamic(
                    customerId,
                    opportunityId,
                    pageNum,
                    pageCount
                    )
                
                console.log('动态数据列表',res[0].list);
                console.log(res[0]);

                this.list=res[0].list;
                console.log(this.list);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total

                //判断是否出现了滚动条
                this.$nextTick(function(){
                    let my=this;
                    let divHeight;
                    if($(".router-wrapper").children("div").length==1){
                        divHeight=$(".router-wrapper").children("div").height();
                    }else{
                        let oneDiv=$(".router-wrapper").children('.top-wrap').height();
                        let twoDiv=$(".router-wrapper").children('.customer-detail-tab').height()+20;
                        divHeight=oneDiv+twoDiv;
                    }
                    if(divHeight<$(".router-wrapper").height()){
                       if(this.pageCount>this.dataTotal){
                            return false;
                        }else{
                            my.pageCount=my.pageCount+10;
                            let pageNum=my.pageNum;
                            let pageCount=my.pageCount;
                            let customerId=my.$route.query.customerId;
                            let opportunityId=my.opportunityId;
                            my.dynamicData({
                                'pageNum':pageNum,
                                'pageCount':pageCount,
                                'customerId':customerId,
                                'opportunityId':opportunityId
                            });
                        } 
                    }
                })
            },
               
            setScroll(){
                // let scrollBd = $(".scrollContent1");
                let scrollBd = $(".router-wrapper");
                let my = this;
                scrollBd.scroll( function(e) {
                    if($('#pane-dynamic').css("display")=="block"){
                    //向下滚动到底
                    let scrollTop = $(this)[0].scrollTop;
                    let scrollHeight = $(this)[0].scrollHeight;
                    let clientHeight = $(this)[0].clientHeight;
                　　if(scrollHeight - scrollTop  == clientHeight){
                // 　　    my.pageNum ++;
                       if(my.pageCount>my.dataTotal){
                            return false;
                        }else{
                        my.pageCount=my.pageCount+10;
                        let pageNum=my.pageNum;
                        let pageCount=my.pageCount;
                        let customerId=my.$route.query.customerId;
                        let opportunityId=my.opportunityId;
                        my.dynamicData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerId':customerId,
                            'opportunityId':opportunityId
                        });
                        } 
                　　}
                }
                });
            }

        },
        watch: {
        },
        mounted(){
            //初始化列表
            this.customerId=this.$route.query.customerId;
            let customerId=this.customerId;
            let opportunityId=this.opportunityId;
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            this.dynamicData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'opportunityId':opportunityId
                });
            this.setScroll();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dynamic-content{
        .row{
            line-height: 32px;
            color: #888888;
            font-size: 14px;
            padding: 6px 0px;
            border-left:1px solid #888888 ;
            position: relative;

        }
        .row:last-child{
            span.line{
                width: 0px;

            }
        }
        i{
            border-radius: 50%;
            border: 2px solid;
            border-color: inherit;
            background: #ffffff;
            width: 10px;
            height: 10px;
            display: inline-flex;
            box-sizing: border-box;
            vertical-align: middle;
            position: relative;
            z-index: 3;
        }
        span.line{
            position: absolute;
            left: 34px;
            top: 18px;
            content: '';
            width: 1px;
            background: #888888;
            height: 100%;

        }
        /*i::after{*/
        /*position: absolute;*/
        /*content: '';*/
        /*width: 1px;*/
        /*background: #888888;*/
        /*height: 30px;*/
        /*}*/
    }
</style>
