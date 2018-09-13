<template>
    <div class="dynamic-content scrollContent" @scroll="getSrcollFn()"
         style="overflow-y:auto; overflow-x:hidden;">
        <el-row :gutter="20" class="row" v-for="item,index in list" :key="index">
            <el-col :span="8">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px"></i>
                    <span class="name">{{item.trendPersonName}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <span class="line"></span>
                <div class="">
                    <span>{{item.trendContent}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="">
                    <span>{{item.trendEndTime}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {getProjectDynamic} from '@Main/project/getData.js'
    export default {
        components: {

        },
        props: {
            id:{
                required:true
            },
            randomNum:{
                required:false
            }
        },
        data() {
            return {
                bottomFlag:false,
                screenHeight:0,
                list : [],
                pageNum : 1,
                pageCount : 10
            }
        },

        computed: {

        },
        filters:{
        },
        methods: {
        //获取项目动态getProjectDynamic
//            async rquireProjectDynamic(id){
//                let res = await getProjectDynamic(id);
//                console.log(res);
//                this.dynamicData = [...res];
//                this.$emit("dynamicnum",res.length);
//            },
            async getDynamic(){

                let params = {
                    pageNum : this.pageNum,
                    pageCount : this.pageCount,
                    projectId:this.$route.params.id
                }

                let res  = await JZY.xhr.r([{type:'post',url:'/project/projectTrends/page',data:params}],'GLOBAL.YANG_NING',false,false).then((resultData)=>{
                    try{
                        return resultData;

                    }catch (e){
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });
                if(res[0].list && res[0].list.length){
                    if(this.pageNum != 1){
                        this.list.push.apply( this.list, res[0].list );
                    }else{
                        this.list = res[0].list;
                    }
                 }
                this.total = res[0].total;
                this.$emit("dynamicnum",res[0].total);


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
            }
        },
        watch: {
            randomNum(){
                this.pageNum=1;
                this.getDynamic(this.id)
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
