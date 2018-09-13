<template>
    <div class="dynamic-content">
        <el-row :gutter="20" class="row" v-for="item,index in dynamicData" :key="index">
            <el-col :span="8">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px"></i>
                    <span class="name">{{index}}{{item.trendPersonName}}</span>
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
                dynamicData:[],
            }
        },

        computed: {

        },
        filters:{
        },
        methods: {
        //获取项目动态getProjectDynamic
            async rquireProjectDynamic(id){
                let res = await getProjectDynamic(id);
                console.log(res);
                this.dynamicData = [...res];
                this.$emit("dynamicnum",res.length);
            },
        },
        watch: {
            id(curVal,oldVal){
               this.rquireProjectDynamic(curVal)
            },
            randomNum(){
                this.rquireProjectDynamic(this.id)
            }
        },
        mounted(){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dynamic-content{
        min-height: 300px;
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
        .name{
            line-height: 24px;
            vertical-align: bottom;
        }
    }
</style>
