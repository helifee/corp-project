<template>
    <!--创建会议按钮事件请传入btnCreateClick方法会回调-->
    <div class="metttitle">
        <div class="content-title">
            <span>{{title}}</span>
            <el-button v-if="isBtnCreate=='true'"　type="primary" class="add-news" size="small" @click="handlerCreateMeeting">
                <i class="el-icon-plus"></i> 创建会议
            </el-button>
        </div>
        <!--查询条件-->
        <div class="searchForm">
            <el-form :inline="true"  ref="searchForm" size="small">
                <el-form-item label="会议主题：">
                    <el-input v-model="searchForm.theme" placeholder="请输入会议主题" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="会议状态：" style="width: 340px">
                    <el-select v-model="searchForm.state" placeholder="请选择会议状态">
                        <el-option v-for="item in states" 
                        :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="backSearchInfo">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
      
</template>

<script>
    export default {
        name: "meeting",
        props:["title","isBtnCreate"],
        data(){
            return{
                searchForm:{
                    theme:"",
                    state:""
                },
                states:[{
                    label:"请选择",
                    value:""
                },{
                    label:"草稿",
                    value:"0"
                },{
                    label:"会议中",
                    value:"1"
                },{
                    label:"未开始",
                    value:"2"
                },{
                    label:"已结束",
                    value:"3"
                }]
            }
        },
        mounted(){
            this.backSearchInfo();
        },
        methods:{
            handlerCreateMeeting(){
                this.$emit('btnCreateClick',{
                    name: "searchForm"
                })
            },
            backSearchInfo(){
                this.$emit('getSearchInfo',this.searchForm)
            },
            handleReset(){
                this.searchForm={
                    theme:"",
                    state:""
                }
            }
        }
    }
</script>

<style scoped lang="scss">
     .metttitle{
        background:#fff;
        padding-left: 18px;
        .content-title{
            position: relative;
            margin: 12px 0px;
            line-height: 32px;
            height: 48px;
            border-bottom: 1px solid #eeeeee;
            .add-news{
                position: absolute;
                right: 20px;
            }
        }
    }
</style>