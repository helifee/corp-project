<template>

    <div class="dynamic-content scrollContent" @scroll="getSrcollFn()" 
    style="overflow-y:scroll; overflow-x:hidden;">
        <div style="">
            <el-row :gutter="20" class="row" v-for="(item,index) in list">
                <el-col :span="8">
                    <div class="">
                        <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: red"></i>{{item.createPersonName}}
                    </div>
                </el-col>
                <el-col :span="8">
                    <span class="line"></span>
                    <div class="">
                        <span>{{item.changeContent}}    </span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="">
                        <span>{{item.createDate}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        
    </div>

</template>
<script>
    import cService from '@Main/crm/crm_service.js'
import { clearInterval } from 'timers';
    export default {
        components: {

        },
        data() {
            return {
                bottomFlag:false,
                screenHeight:0,
                list : [],
                opportunityId : this.$route.params.id,
                customerId:this.$route.query.customer,
                pageNum : 1,
                pageCount : 10
            }
        },
        props: {
            typePage:{
                type : String
            },
            setVal:{
                type : Boolean
            }
        },
        methods: {
            async getDynamic(){

                let params = {
                    pageNum : this.pageNum,
                    pageCount : this.pageCount,
                    opportunityId: this.opportunityId,
                    customerId:this.customerId
                }
                // this.typePage == "opportunity" ? (params.opportunityId = this.businessId) : (params.customerId = this.businessId);

                params = JSON.stringify(params);
                // if(this.list.length != this.total){
                    await cService.getCustomerGetAll(params).then( (data) =>{
                        if(data.status == "200"){
                            if(data.result.list && data.result.list.length){
                                if(this.pageNum != 1){
                                this.list.push.apply( this.list, data.result.list );
                                }else{
                                    this.list = data.result.list;
                                }
                            }
                            this.total = data.result.total;
                        }
                    })
                // }
            },
            
            getSrcollFn(e){
                let scrollBd = $(".scrollContent");
               this.bottomFlag = false;
                let scrollTop = scrollBd[0].scrollTop;
                    let scrollHeight = scrollBd[0].scrollHeight;
                    let clientHeight = scrollBd[0].clientHeight;
                　　if(scrollHeight - scrollTop  <= clientHeight){
                        this.bottomFlag = true;  
                　　}
            },
            setHeight(){
                let screenHeight = document.body.clientHeight;
                    let $bd = $(".dynamic-content");
                    if($bd.length){
                        let tempHeight = screenHeight - $bd.offset().top - 115;
                        this.screenHeight = tempHeight;
                        $bd.css("height",this.screenHeight);
                        let tempNum = Math.ceil(this.screenHeight/44);
                        tempNum = Math.ceil(tempNum/10);
                        this.pageCount = tempNum * 10;
                    }
            },
            initPage(){
                this.pageNum = 1;
                    //初始化列表
                this.getDynamic();
            }

        },
        watch: {
            setVal(nVal){
                if(nVal){
                    this.pageNum = 1;
                    //初始化列表
                    this.getDynamic();
                }
            },
            bottomFlag(nVal){
                if(nVal){
                    this.pageNum ++;
                    this.getDynamic();
                }
            }
        },
        mounted(){
            //初始化列表
            let that = this;
            that.setHeight();
            this.getDynamic();
            // window.onresize = () => {
            //     return (() => {
            //         that.setHeight();
            //     })()
            // }
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
