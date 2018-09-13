<template>
    <div class="select_role_dept role_dept_tree approve">
        <el-row :gutter="24" class="dept-tree">
            <el-col :span="9">
                <div class="grid-content bg-purple">
                    <div class="left_content">
                        <div class="content">
                            <smarter-tree
                                ref="roleTreeGrid"
                                checked-key="selected"
                                :customProp = "customPropRole"
                                @mounted="$refs.roleTreeGrid.refreshTreeTable(roleData)"
                                @radioClick="radioClickRole"
                                :expand-all="true"
                                child-key = "children"
                                :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                                :enable-check="enableCheck"
                                :enableCheckedFolder="enableCheckedFolder"
                                tree-key="permissionId"
                                :enable-checked-multiple="false"
                                prop="orgName"

                                
                                absoluteTop="-45px"
                                maxHight="300px"
                                label="选择网点">
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
            <el-col :span="15">
                <div class="grid-content bg-purple-light">
                    <div class="right_content">
                        <div class="content">
                            <smarter-tree
                                ref="deptTreeGrid"
                                checked-key="selected"
                                :customProp = "customPropDept"
                                :enable-filter="enableTargetTreeFilter"
                                :disabled-deepth="[1]"
                                @mounted="$refs.deptTreeGrid.refreshTreeTable(deptData)"
                                @radioClick="radioClickDept"
                                :expand-all="true"
                                child-key = "children"
                                :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                                :enable-check="enableCheck"
                                :enableCheckedFolder="enableCheckedFolder"
                                tree-key="permissionId"
                                :enable-checked-multiple="false"
                                prop="orgName"
                                
                                maxHight="340px"
                                label="选择网点">
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
                <span>{{selectedNodeRole.orgName}}</span> + 
                <span>{{selectedNodeDept.orgName}}</span> = 
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
<style scoped lang="scss">
$borderColor:#dcdfe6;
.select_role_dept.role_dept_tree.approve{
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
        border-bottom:none;
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
    import {roleData,deptData} from './roleDept.js'//tree原始数据
    import mockData from '@MockData'

    export default{
        components: {
        },
        data(){
            let _self = this;
            return {
                roleData:roleData,
                deptData:deptData,
                checkedAllChildsWhenParentChecked:true,
                enableCheck:true,
                enableCheckedFolder:true,

                selectedNodeRole:JZY.u.deepExtend({}, this.selectedroleDeptsToTree.role),//已选择的角色
                selectedNodeDept:JZY.u.deepExtend({}, this.selectedroleDeptsToTree.dept),//已选择的部门
                resultNames:[...this.selectedroleDeptsToTree.resultNames],//经后端返回的计算结果

                customPropRole:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                    isCheckedNode(node){//根据调用组件时，已选择的角色，渲染tree
                        // console.log('custom prop role thwis:',node.permissionId,this,node)
                        // console.info("存在已选择的人员")


                        if (_self.selectedroleDeptsToTree.role && _self.selectedroleDeptsToTree.role.permissionId == node.permissionId){
                            return node.selected=true
                        }else{
                            return node.selected=false
                        }
                    },
                    iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                        // console.log('custom prop this:',this,node)
                        return node.$extra.hasChildren === true
                    }
                      
                },
                customPropDept:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                    isCheckedNode(node){//根据调用组件时，已选择的部门，渲染tree
                        // console.log('custom prop dept thwis:',node.permissionId,this,node)
                        // console.info("存在已选择的人员")

                        if (_self.selectedroleDeptsToTree.dept && _self.selectedroleDeptsToTree.dept.permissionId == node.permissionId){
                            return node.selected=true
                        }else{
                            return node.selected=false
                        }
                    },
                    iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                        // console.log('custom prop this:',this,node)
                        return node.$extra.hasChildren === true
                    }
                      
                },
            }
        },
        props:{
            selectedroleDeptsToTree: {
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
        methods:{
            //根据选择的角色和部门，远程获取人员信息resultNames
            getResult:function(){
                //请求后端ajax
                this.resultNames = [{
                      id:10021201,
                      name:'张三ajax'
                    },{
                      id:10021202,
                      name:'李四2ajax'
                    }]
                let role = this.selectedNodeRole,
                    dept = this.selectedNodeDept,
                    resultNames = [...this.resultNames];

                this.$emit('roleDeptFromTreeFunc',{'role':role,'dept':dept,'resultNames':resultNames})
            },
            //获取选中的node
            selectedNode:function(){
                console.info(this.$refs.roleTreeGrid.getCheckedNodes())
                console.info(this.$refs.deptTreeGrid.getCheckedNodes())
            },
            //角色单选框的点击事件，非change事件
            radioClickRole:function(row){
                this.selectedNodeRole = row
                this.$message("您点击的是：" + row.orgName)
                this.getResult();
            },
            //部门单选框的点击事件，非change事件
            radioClickDept:function(row){
                this.selectedNodeDept = row
                this.$message("您点击的是：" + row.orgName)
                this.getResult();
            },
        },
        mounted(){
        },
        watch:{
            "selectedroleDeptsToTree":{
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