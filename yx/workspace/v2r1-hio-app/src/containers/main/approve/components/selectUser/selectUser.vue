<template>
    <div class="select_user approve">
        <el-row :gutter="20">
            <el-col :span="14">
                <div class="grid-content bg-purple">
                    <el-input
                        placeholder="请输入员工名称"
                        v-model="inputUserName">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <div class="left_content">
                        <div class="head_title">
                            <div class="name">人员</div>
                        </div>
                        <div class="tab_nav">
                            <ul>
                                <li v-for="(item,index) in tabsNav" :key="index" @click="tabToggle(index,item.tabPanel)" :class="{active:active == index}">
                                    {{item.name}}
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <component :is="currentView" :userListSelected.sync="userListSelected" :ref="currentView" keep-alive></component>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple-light">
                    <div class="right_content">
                        <div class="selected_title">
                            已选：(<span v-text ="userListSelected.length"></span>)
                            <span class="clear_button" @click="clearSelectedUser">清空</span>
                        </div>
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in userListSelected" :key="index" @dblclick="dropThisUser(item.id)">
                                    {{item.label}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('../../approve.locale'))
    import config from '@/config/index.js'
    import deptUser from '@Main/approve/components/selectUser/deptUser.vue'
    import definedGroupUser from '@Main/approve/components/selectUser/definedGroupUser.vue'
    import mockData from '@MockData'

    export default{
        components: {
            deptUser,
            definedGroupUser
        },
        data(){
            return {
                inputUserName:'',
                active: 0,
                currentView: 'deptUser',
                tabsNav:[
                {
                    name:'按部门',
                    tabPanel:'deptUser'
                },{
                    name:'自定义组',
                    tabPanel:'definedGroupUser'
                }],
                userListSelected:[],
            }
        },
        computed:{
        },
        methods:{
            tabToggle(i, v){
                this.active = i
                this.currentView = v
            },
            clearSelectedUser(){
                // this.$refs.deptUser.resetChecked();
                this.$refs[this.currentView].resetChecked();//父组件调用子组件中的属性
            },
            dropThisUser(id){
                let tempList = this.userListSelected;
                let tempListID = [];

                tempList = tempList.filter(function(item) {
                    return item.id != id;
                });
                this.userListSelected = tempList;

                tempListID = tempList.map(function(item){
                    return item.id
                })
                // console.info(tempListID)
                this.$refs[this.currentView].setCheckedByKeys(tempListID);
            },
        },
        mounted(){
          window.vue = this //chrome中console调试用，完事后可删除
        },
        watch:{
            userListSelected: {
                handler(newValue, oldValue) {
                    
        　　　　},
        　　　　deep: true
            }
        }
    }
</script>
<style scoped lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.select_user.approve{
  font-size:12px;
  .left_content{
    height:350px;
    margin-top: 10px;
    border:1px solid $borderColor;
    overflow:scroll;
    .head_title{
        position:relative;
        height: 28px;
        border-bottom:1px solid $borderColor;
        .name{
            width:100px;
            height:29px;
            line-height:29px;
            text-align:center;
            position:absolute;
            top: -2px;
            border-top:2px solid $blueColor;
            color:$blueColor;
            background:#fff;
            border-right:1px solid $borderColor;
        }
    }
    .tab_nav{
        height:36px;
        border-bottom:1px solid $borderColor;
        ul{
            padding: 0;
            margin: 10px 0 0;
            li{
                width:auto;
                float:left;
                padding:0 5px;
                list-style:none;
                margin-left:10px;
                background:#fff;
                color:$color;
                &.active{
                    background:#6c6c6c;
                    color:#fff;
                }
                &:hover{
                    cursor: pointer;
                    color: $blueColor;
                }
            }
        }
    }
    .content{
        padding:20px 0;
    }
  }
  .right_content{
    height:400px;
    border:1px solid $borderColor;
    .selected_title{
        height:38px;
        line-height:38px;
        background:#f6f5f4;
        text-indent:18px;
        .clear_button{
            float:right;
            cursor:pointer;
            margin-right:10px;
        }
    }
    .content{
        ul{
            padding:15px;
            li{
                list-style:none;
                &:hover{
                    cursor: pointer;
                    color: $blueColor;
                }
            }
        }
    }
  }
}
</style>