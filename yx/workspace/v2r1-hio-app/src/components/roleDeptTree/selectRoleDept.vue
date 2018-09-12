<template>
    <div class="select_role_dept role_dept_tree approve">
        <el-row :gutter="24" class="dept-tree">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="left_content">
                        <div class="content">
                            <smarter-tree
                                ref="roleTreeGrid"
                                checked-key="isCheckedNode"
                                :customProp = "customPropRole"
                                @mounted="$refs.roleTreeGrid.refreshTreeTable(roleData)"
                                @radioClick="radioClickRole"
                                :expand-all="true"
                                child-key = "children"
                                :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                                :enable-check="enableCheck"
                                :enableCheckedFolder="enableCheckedFolder"
                                tree-key="roleId"
                                :enable-checked-multiple="false"
                                prop="roleName"

                                
                                absoluteTop="-45px"
                                maxHight="300px"
                                label="">
                                <!-- <template slot-scope="scope">
                                    <span style="margin-left:30px;">
                                        path:{{scope.row.$extra.path}}
                                    </span>
                                </template> -->
                            </smarter-tree>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <div class="right_content">
                        <div class="content">
                            <smarter-tree
                                ref="deptTreeGrid"
                                checked-key="isCheckedNode"
                                :customProp = "customPropDept"
                                :enable-filter="enableTargetTreeFilter"
                                
                                @mounted="$refs.deptTreeGrid.refreshTreeTable(deptData)"
                                @radioClick="radioClickDept"
                                :expand-all="true"
                                child-key = "children"
                                :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                                :enable-check="enableCheck"
                                :enableCheckedFolder="enableCheckedFolder"
                                tree-key="nodeId"
                                :enable-checked-multiple="false"
                                prop="name"
                                
                                maxHight="340px"
                                label="">
                                <!-- <template slot-scope="scope">
                                    <span style="margin-left:30px;">
                                        path:{{scope.row.$extra.path}}
                                    </span>
                                </template> -->
                            </smarter-tree>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="result">
                <span class="label">选择结果：</span>
                <span>{{selectedNodeRole.roleName}}</span> + 
                <span>{{selectedNodeDept.name}}</span> = 
                <span v-for="(item,index) in resultNames" :key="index" style="margin-right:10px;">{{item.name}}</span>
            </el-col>
            <el-col :span="24" class="notice">
                *以上角色和部门均为单选
            </el-col>
        </el-row>

    <!-- <el-button @click="selectedNode">console.log所有节点(包括未选中)</el-button>
    <el-button @click="enableCheck=!enableCheck">toggle enableCheck</el-button> -->
    </div>
</template>
<style lang="scss">
.select_role_dept.role_dept_tree.approve{
    .dept-tree .tree-label.radio-tree-label{
        max-width: 170px;
    }
}
</style>
<style scoped lang="scss">
$borderColor:#dcdfe6;
.select_role_dept.role_dept_tree.approve{
    .dept-tree .tree-label.radio-tree-label{
        max-width: 170px;
    }
    .left_content{
        margin-top: 40px;
    }
    .right_content{
        .content{
            border-top:1px solid $borderColor;
        }
    }
    .content{
        padding:7px 0 0;
        border:1px solid $borderColor;
        border-top:none;
    }
    .result{
        margin:20px 0px;
    }
    .notice{
        font-size:12px;
        color: red;
    }
}
</style>
<script>
    import config from '@/config/index.js'
    import {roleData,deptData} from './roleDeptTree.js'//tree原始数据
    import mockData from '@MockData'

    export default{
        components: {
        },
        data(){
            let _self = this;
            return {
                roleData:[],
                deptData:[],
                checkedAllChildsWhenParentChecked:true,
                enableCheck:true,
                enableCheckedFolder:true,
                selectedNodeRole:JZY.u.deepExtend({}, this.selectedRoleDeptsToTree.role),//已选择的角色
                selectedNodeDept:JZY.u.deepExtend({}, this.selectedRoleDeptsToTree.dept),//已选择的部门
                resultNames:[...this.selectedRoleDeptsToTree.resultNames],//经后端返回的计算结果

                customPropRole:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                    isCheckedNode(node){//根据调用组件时，已选择的角色，渲染tree
                        // console.log('custom prop role thwis:',node.permissionId,this,node)
                        // console.info("存在已选择的人员")
                        if (_self.selectedRoleDeptsToTree.role && _self.selectedRoleDeptsToTree.role.roleId == node.roleId){
                            return true
                            // return node.selected=true
                        }else{
                            return false
                            // return node.selected=false
                        }
                    },
                    iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                        // console.log('custom prop this:',this,node)
                        // return node.$extra.hasChildren === true
                        return false
                    }
                      
                },
                customPropDept:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                    isCheckedNode(node){//根据调用组件时，已选择的部门，渲染tree
                        // console.log('custom prop dept thwis:',node.permissionId,this,node)
                        // console.info("存在已选择的人员")
                        if (_self.selectedRoleDeptsToTree.dept && _self.selectedRoleDeptsToTree.dept.sid == node.sid){
                            return true
                        }else{
                            return false
                        }
                    },
                    iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                        // console.log('custom prop this:',this,node)
                        // return node.$extra.hasChildren === true
                        return false
                    }
                      
                },
            }
        },
        props:{
            selectedRoleDeptsToTree: {
                type: Object,
                default: function(){
                    return {}
                }
            },
            enableTargetTreeFilter: {
                type: Boolean,
                default: false
            },
        },
        // computed:{
        //     deptDataConstruct:function(){ //添加“本部门”
        //         let nowDeptObj = [{
        //             "permissionId": "-1",
        //             "orgCode": "xxxx",
        //             "orgName": "本部门",
        //             "currentOrg": "-1",
        //             "children": []
        //         }]
        //         return [...nowDeptObj,...this.deptData]
        //     }
        // },
        methods:{
            //获取角色树数据
            async getRoleData(){
              let requestData = {
                  name:"",
                  pageNum:1,
                  pageCount:500
              }
              let res = await JZY.xhr.r([{type:'post',url:'/role/queryRoles',data:requestData}],'GLOBAL.COMPONENTS.WANG_TAO',{alertError:false}).then((resultData)=>{
                  try{
                      return resultData;
                  }catch (e){
                      this.$message("role.list.vue:"+e);
                      return false;
                  }
              }).catch((e)=>{
                  //接口失败
                  throw new Error(e)
              })
              this.$refs.roleTreeGrid.refreshTreeTable(res[0].list);
              this.roleData = res[0].list.length === 0 ? [] : [...res[0].list]

            },

            //获取部门树数据
            async getDeptData(){
                let res = await JZY.xhr.r([{type:'post',url:'/sys/organization/queryTree'}],'GLOBAL.COMPONENTS.ZCY_TEST',{alertError:false}).then((resultData)=>{
                    try{
                        return resultData;
                    }catch (e){
                        this.$message("role.list.vue:"+e);
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                })

                let ownDept = [{
                    "nodeId": "-1",
                    "sid": "-1",//本部门，不需要回传
                    "name": "本部门",
                    "type":"ownDept",
                    "children": []
                }]
                this.deptData = res.length === 0 ? [...ownDept] : [...ownDept,...res]
                console.info(this.deptData)
                this.$refs.deptTreeGrid.refreshTreeTable(this.deptData);
            
            },
            //根据选择的角色和部门，远程获取人员信息resultNames
            async getResult(){
                //请求后端ajax
                console.info("请求后端ajax")
                //如果是本部门，获取用户登陆之后存入state中的主部门id
                // let deptId = this.selectedNodeDept.sid == -1 ? this.$store.state.session.defaultJob.organizationId : this.selectedNodeDept.sid
                let deptId = this.selectedNodeDept.sid

                let postData = {
                    organizationIds:[deptId],
                    roleIds:[this.selectedNodeRole.roleId]
                }
                console.info("this.selectedNodeDept",this.selectedNodeRole.roleId && this.selectedNodeDept.sid)

                if( this.selectedNodeRole.roleId && deptId ){

                    let res = await JZY.xhr.r([{type:'post',url:'/user/queryUserUnionByOrganizationIdsAndRoleIds',data:postData}],'GLOBAL.COMPONENTS.WANG_TAO',{alertError:false}).then((resultData)=>{
                        try{
                            return resultData;
                        }catch (e){
                            // this.$message("role.list.vue:"+e);
                            return false;
                        }
                    }).catch((e)=>{
                        //接口失败
                        throw new Error(e)
                    })
                    console.info("res",res[0])
                    this.resultNames = [ ...res[0] ]
                    // this.resultNames = [{
                    //       sid:'10021201',
                    //       name:'张三ajax'
                    //     },{
                    //       id:'10021202',
                    //       name:'李四2ajax'
                    //     }]
                    let role = this.selectedNodeRole,
                        dept = this.selectedNodeDept,
                        resultNames = [...this.resultNames];

                    this.$emit('roleDeptFromTreeFunc',{'role':role,'dept':dept,'resultNames':resultNames})
                }
            },
            //获取选中的node
            selectedNode:function(){
                console.info(this.$refs.roleTreeGrid.getCheckedNodes())
                console.info(this.$refs.deptTreeGrid.getCheckedNodes())
            },
            //角色单选框的点击事件，非change事件
            radioClickRole:function(row){
                this.selectedNodeRole = row
                // this.$message("您点击的是：" + row.roleName)
                this.getResult();
            },
            //部门单选框的点击事件，非change事件
            radioClickDept:function(row){
                this.selectedNodeDept = row
                // this.$message("您点击的是：" + row.name)
                this.getResult();
            },
        },
        mounted(){
            this.getRoleData()
            this.getDeptData()
            this.getResult();//更新人员信息
            console.info(this.deptData)
        },
        watch:{
            "selectedRoleDeptsToTree":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    if (newVal.role && newVal.dept){//没有选择
                        this.$refs.roleTreeGrid.clearCheckedNodes()//清空已选项
                        this.$refs.deptTreeGrid.clearCheckedNodes()//清空已选项

                    }
            
                    this.selectedNodeRole = JZY.u.deepExtend({}, newVal.role);
                    this.selectedNodeDept = JZY.u.deepExtend({}, newVal.dept);
                    this.resultNames = [...newVal.resultNames]


                    this.getResult();//更新人员信息

                    let role = [...this.roleData];
                    let dept = [...this.deptData];

                    this.$refs.roleTreeGrid.refreshTreeTable(role);
                    this.$refs.deptTreeGrid.refreshTreeTable(dept);
                },
                deep:true
            }
        }
    }
</script>