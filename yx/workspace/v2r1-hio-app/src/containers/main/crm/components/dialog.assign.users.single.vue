<template>
<div>
    <right-slide-modal
            title="分配客户"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul style="margin-top:7px;">
                <el-button @click="operateSubmit()" size="medium ">确定分配</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="distributionSingle">

            <el-form :model="form">
                <!-- <el-form-item label="客户范围：">
                    <el-select v-model="form.value" placeholder="客户范围">
                        <el-option label="查询结果" value="0"></el-option>
                        <el-option label="选中客户" value="1"></el-option>
                    </el-select>
                </el-form-item> -->

                <el-form-item label="分配用户">
                    <!--全局组件的使用-->
                    <blend-tree
                        ref= "singleTree"
                        :enable-checked-multiple = "enableCheckedMultiple"
                        :filterDataUrl = "filterDataUrl"
                        :tagButtons="tagButtons"
                        :activeTab = "activeTab"
                        :workStatus = "workStatus"
                        :readOnly = "readOnly"
                        :resultDataListShow = "resultDataListShow"
                        :selectedDataToTree = "selectedDataToTree"
                        @getDataFromTree = "getDataFromTree">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                        <i class="el-icon-circle-plus" @click.stop = "$refs.singleTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>
                    <!-- <i class="el-icon-circle-plus-outline" @click="showUserTreeOnly = !showUserTreeOnly"></i>
                    <el-tag
                    v-for="(item,index) in showUserOnly"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="deleteUserOnly(item.sid)">
                    {{item.name}}
                    </el-tag>

                    <user-tree
                        :selectUserDialogVisible="showUserTreeOnly"
                        :enable-checked-multiple="enableCheckedMultipleUser"
                        :show-inside-outside-tabs="showInsideOutsideTabs"
                        :selectedUsers = "showUserOnly"
                    
                        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
                        @getUserTree = "getUserTreeOnly">
                    </user-tree> -->
                        <!-- <el-input v-model="searchForm.searchVal6" placeholder="请输入关键词进行检索" style="width: 200px"></el-input> -->
                    </el-form-item>
                    
                <!-- <el-form-item label="分配方式：">
                    <p style="display：inline-block; margin-top:0px;">系统根据您分配用户的数据将客户资料平均分配给用户</p>
                </el-form-item> -->
            </el-form>

        </div>
    </right-slide-modal>
</div>
</template>

<script>
import {cusDist} from '@Main/crm/getData'

    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            queryData:{
                 type:Object,
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
            }
        },
        methods:{
            //分配客户
            async cusDistData(obj){
                let res = await cusDist(obj);
                this.$emit("closeCreateModal");
            },
            destSingle(data,salesmanId,salesmanName){
                if(salesmanId==null || salesmanId=="" || salesmanId==undefined){
                    this.selectedDataToTree={};
                }else{
                    this.selectedDataToTree={//已选树节点
                        userList:[{
                            sid:salesmanId,
                            name:salesmanName
                        }]
                    };
                }
                this.multipleSelection.push(data);
                console.log('客户列表',this.multipleSelection);
            },
            // query(data){
            //     this.query=data;
            //     console.log('查询对象',this.query);
            // },
            //接收用户树组件的返回值
            getUserTreeOnly:function(obj){
            this.showUserOnly = [...obj]
            console.log(obj);
            },
            //接收混合树组件的返回值
            getDataFromTree( obj = {} ){
                console.info(obj.userList)
                this.showUserOnly=obj.userList;
                obj.userList.forEach((item)=>{
                    console.info(item.sid)
                })
                console.info(JSON.stringify(obj))
                // debugger
            },
            //删除用户tag的事件
            deleteUserOnly(sid) {
                this.showUserOnly = this.showUserOnly.filter(function(item) {
                return item.sid != sid;
                });
                console.log(this.showUserOnly);
            },
//            关闭
            operateClose(){
                this.$emit("closeDist");
            },
            operateSubmit(){
                // console.log('客户范围',this.form.value);
                // console.log('选择人',this.showUserOnly);
                // console.log('查询对象',this.queryData);
                // console.log('客户列表',this.multipleSelection);
                let saleIds=[];
                this.showUserOnly.forEach((item)=>{
                    saleIds.push(item.sid);
                })
                console.log('选择分配人列表',saleIds);
                if(saleIds.length==0){
                    JZY.u.errorMsg("无法分配，请选择分配用户")
                }else{
                    let obj={
                        'custRangeType':1,
                        'customerSearch':{},
                        'custIds':this.multipleSelection,
                        'saleIds':saleIds
                    }
                this.cusDistData(obj);
                }  
            }
        },
        data(){
            return {
                enableCheckedMultiple:false,//人员树是否可以多选
                filterDataUrl:{host:'',type:'',url:''},//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树
                tagButtons:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
                activeTab:'user',//初始化激活的tab标签
                workStatus:1,//人员状态，默认值是1，0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;7、在职、离职 （包含删除人员）
                readOnly:false,//只读模式，默认false是可编辑模式；true：不允许添加和删除人员
                resultDataListShow:true,//组合树返回已选数据项，是否展示，默认true展示
                selectedDataToTree:{},
                
                query:{},
                multipleSelection:[],
                //用户树-开始
                //单选还是多选设置
                enableCheckedMultipleUser:false,//false单选，true多选（默认是多选，此种模式可不传递此参数）
                showInsideOutsideTabs:false,//显示内、外部，false:只显示‘人员’，其他逻辑无差异
                // filterDataUrl:{
                //     host:'GLOBAL.SHANG_BIN',
                //     type:'post',
                //     url:'/journal/journal/selectCondition',
                //     data:{
                //         journalDate:'2018-04-16'
                //     }
                // },//过滤数据源，获取data的接口
                /*1棵树*/
                showUserTreeOnly:false,
                showUserOnly:[],
                form:{
                    value:''
                }
            }
        },
        watch:{
            "queryData":{
                handler:function(newVal,oldVal){
                    console.info('newnewnewnewnew',newVal)
                    this.query=newVal;
                    console.info('oldoldoldoldold',oldVal)
                    // console.info(this.$refs.transferTree)
                    // this.$refs.transferTree.render(this.userData);
                },
                deep:true
            },
        },
        mounted(){
           
        },
        created(){
            // this.query=newVal;
            // console.log('搜索对象',this.query);

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .distributionSingle{
        line-height: 48px;
        .el-form .el-form-item .el-form-item__label{
            display: inline-block;
            text-align: right;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #505050;
            letter-spacing: 0;
        }
    }
</style>
