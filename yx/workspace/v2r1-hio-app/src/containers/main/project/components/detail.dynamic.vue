<template>
    <div class="dynamic-content">
        <el-row :gutter="20" class="row">
            <el-col :span="8">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: red"></i>aaaa
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
        </el-row>
        <el-row :gutter="20" class="row">
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
        </el-row>
        <el-row :gutter="20" class="row">
            <el-col :span="8">
                <div class="">
                    <i class="icon circle" style="margin-right: 20px;margin-left: 20px;color: lightgreen"></i>aaaa
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
        </el-row>
        <el-row :gutter="20" class="row">
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
        </el-row>
    </div>
</template>
<script>

    export default {
        components: {

        },
        data() {
            return {

            }
        },
        props: [],
        computed: {

        },
        filters:{
        },
        methods: {


        },
        watch: {
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
