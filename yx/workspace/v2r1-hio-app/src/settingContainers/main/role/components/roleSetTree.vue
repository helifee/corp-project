<template>
    <div class="roleSetTree">
        <el-table :data="treeData" border :show-header="false"  ref="refRoleTable" empty-text=" " v-loading="loading" >
                <tree-grid
                        :advancedRelevanceStrategy="advancedRelevanceStrategyTest"
                        ref="refRoleTree"
                        prop="name"
                        label="权限名称"
                        :expand-all="true"
                        tree-key="nodeId"
                        :autoExpandCheckedNodes="false"
                        :enable-check="true"
                        checked-key="nodeChecked"
                        :checked-all-childs-when-parent-checked="false"
                        child-key="children"
                        @checkboxClick="checkboxClick"
                        width="150"
                        :showArraw="false"
                >
                    <!--<template slot-scope="scope">-->
                        <!--<span style="margin-left:50px;color: #999999;">-->
                            <!--{{scope.row.remark}}-->
                        <!--</span>-->
                        <!--<span style="float: right" v-if="scope.row.parentId">-->
                            <!--<el-checkbox v-if="scope.row['premissionLook']!= null"@change="permissionLookChange(scope)"-->
                                         <!--:disabled="scope.row.premissionLookDisabled" v-model="scope.row.premissionLook">查看</el-checkbox>-->
                            <!--<el-checkbox v-if="scope.row['permissionEdit']!= null" @change="permissionEditChange(scope)"-->
                                         <!--:disabled="scope.row.permissionEditDisabled" v-model="scope.row.permissionEdit">编辑</el-checkbox>-->
                            <!--<el-checkbox v-if="scope.row['permissionFile']!= null" @change="permissionFileChange(scope)"-->
                                         <!--:disabled="scope.row.permissionFileDisabled"  v-model="scope.row.permissionFile">归档</el-checkbox>-->
                        <!--</span>-->
                    <!--</template>-->
                </tree-grid>
            <el-table-column prop="remark"  show-overflow-tooltip></el-table-column>
            <el-table-column width="260">
                <template slot-scope="scope">
                    <span style="float: right" v-if="scope.row.parentId">
                        <el-checkbox v-if="scope.row['premissionLook']!= null"@change="permissionLookChange(scope)"
                        :disabled="scope.row.premissionLookDisabled" v-model="scope.row.premissionLook">查看</el-checkbox>
                        <el-checkbox v-if="scope.row['permissionEdit']!= null" @change="permissionEditChange(scope)"
                        :disabled="scope.row.permissionEditDisabled" v-model="scope.row.permissionEdit">编辑</el-checkbox>
                        <el-checkbox v-if="scope.row['permissionFile']!= null" @change="permissionFileChange(scope)"
                        :disabled="scope.row.permissionFileDisabled"  v-model="scope.row.permissionFile">归档</el-checkbox>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import testData from './localTestData'
    export default {
        name: "role-set-tree",
        props:{
            treeData:{
                required:true
            }
        },
        updated(){
            this.$refs.refRoleTree.refreshTreeTable(this.treeData);
            this.loading=false;
            // console.log("this.treeData:"+JSON.stringify(this.treeData));
        },
        // watch:{
        //     treeData:function (value,oldvalue) {
        //         // console.log("treeData change");
        //         // // console.log("treeData change:"+JSON.stringify(value)+";oldvalue:"+JSON.stringify(oldvalue))
        //         // this.$refs.refRoleTree.refreshTreeTable(this.treeData);
        //         // this.$refs.refRoleTree.expandAllNodes();
        //         // this.$refs.refRoleTree.checked-all-childs-when-parent-checked=true
        //     }
        // },
        data(){
            return{
                advancedRelevanceStrategyTest:{
                    onChecked:{
                        syncParents:true,
                        syncChilds:true,
                    },
                    onCancelChecked:{
                        syncParents:true,
                        syncChilds:true,
                    }
                },
                checked:true,//临时解决checkboxClick触发两次bug
                loading:true,
                // treeData:testData.treeData
            }
        },
        methods:{
            permissionEditChange(scope){
               //  scope.row.premissionLook=true;
               //  console.log(JSON.stringify(scope.row))
                // if(scope.row.parentName=="EHR"){
                //
                // }
               this.$emit('updataRoleTreeDataBySingleCheck',scope.row,"edit")
            },
            permissionLookChange(scope){
                // scope.row.permissionEdit=false
                this.$emit('updataRoleTreeDataBySingleCheck',scope.row,"view")
            },
            permissionFileChange(scope){
                // scope.row.premissionLook=true
                this.$emit('updataRoleTreeDataBySingleCheck',scope.row,"file")
            },
            checkboxClick(row){
                //有同时触发两次的bug 得空时解决
                // console.log("999:"+JSON.stringify(row))
                if(this.checkClick){
                    this.checkClick=false;
                }else {
                    this.checkClick=true;
                }
                if(!this.checkClick){
                    // console.log("999:"+JSON.stringify(row))
                    this.$emit('updataRoleTreeData',row)
                }
                return;
            },
            refreshRoleTree(){
                this.$refs.refRoleTree.refreshTreeTable(this.treeData);
                this.loading=false;
            }
        }
    }
</script>

<style  lang="scss">
.roleSetTree{
  .el-table__body{
      width:100% !important;
  }
}
</style>