<template>
    <div class="orgaMenu">
        <el-tree  :data="orgTree"  node-key="nodeId" :expand-on-click-node="false" @node-click="handleNodeClick"
                  :props="treeProps"  class="orgaTree" draggable
                  :default-expanded-keys="orgTreeExpandedKeys"
                  @node-drag-start="handleDragStart"
                  @mousewheel.native="handleMousewheel"
                  :allow-drag="allowDrag"
                  @node-drop="handleDrop">
          <span class="custom-tree-node" slot-scope="{ node, data }" >
            <span>{{ data.name}}</span>
            <span class="opera">
                <i class="el-icon-circle-plus-outline" @click.stop="appendDep(data)"></i>
                <i class="el-icon-edit-outline"  @click.stop="editDep(data)"></i>
                <i class="el-icon-close" v-if="data.parentId"  @click.stop="delDep(data)"></i>
            </span>
              <span style="visibility:hidden;width: 40px">只占位置,只占位置</span>
          </span>
        </el-tree>
        <!--右侧弹窗编辑部门-->
        <departmentEdit :depId="depId" :treeNodeData="selTreeNodeInfo" v-if="depEditDiaVisible"
                        :dialogVisible="depEditDiaVisible" @closeCreateModal="closeDepEditDialog"  @successBackFun="successEideDepBackFun" ></departmentEdit>
    </div>
</template>

<script>
    import departmentEdit from './components/departmentEdit.vue'
    import {sysOrgEventBus} from './orgEventBus'
    import testData from './localTestData'
    export default {
        name: "organizationmenu",
        components:{
            departmentEdit
        },
        data() {
            return {
                depEditDiaVisible:false,
                // orgTree: testData.orgData.orgTree,
                orgTree:[],
                treeProps:{
                    label:"name",
                    children:"children"
                },
                depId:"add",
                selTreeNodeInfo:"",
                draggableBeforeData:"",
                orgTreeExpandedKeys:[],
            }
        },
        mounted(){
            // this.orgTree=testData.orgData.orgTree;
            this.getOrgTreeListData();
        },
        beforeDestroy(){
            sysOrgEventBus.$off();
        },
        methods: {
            appendDep(data) {
                this.depId="add";
                this.selTreeNodeInfo=data;
                this.depEditDiaVisible=true;
            },
            editDep(data){
                // console.log(JSON.stringify(data))
                this.depId=data.sid;
                this.selTreeNodeInfo=data;
                this.depEditDiaVisible=true;
            },
            delDep(data){
                this.$confirm('此操作将删除当前部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delDepData(data.sid,data.sid);
                }).catch(() => {
                });
            },
            handleNodeClick(data,node){
                sysOrgEventBus.$emit('sysOrg_emit_orgId', {orgSid:data.sid,orgName:data.name,prefixId:data.prefixId});
            },
            closeDepEditDialog(){
                this.depEditDiaVisible=false;
            },
            handleDragStart(node, ev) {
                // console.log('drag start', node);
                //保存拖拽前数据
                this.draggableBeforeData=JZY.u.copy(this.orgTree);
            },
            allowDrag(draggingNode){
               if(draggingNode.data.parentId==undefined){
                   return false;
               }else{
                    return true;
               }
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                // console.log('tree drop: ',draggingNode.data.sid,dropNode.label, dropType);
                //拖拽成功完成时触发的事件
                let pas={}
                pas.desId=dropNode.data.sid;                 //目标部门
                pas.sourceId=draggingNode.data.sid;          //源部门
                //top-表示拖动到目标上面，bottom-表示拖动到目标下方，inner-表示拖动到目标里面
                if(dropType=="inner"){
                    pas.dragType="inner"
                }else  if(dropType=="before"){
                    pas.dragType="top"
                }else  if(dropType=="after"){
                    pas.dragType="bottom"
                }
                // console.log(JSON.stringify(pas))
                this.draggingNodeTree(pas);
                // let self=this;
                // setTimeout(function () {
                //     //后台不成功，还原树
                //     self.orgTree=JZY.u.copy(self.draggableBeforeData);
                // },1000)
                return ;
            },
            successEideDepBackFun(type,pas){
                this.depEditDiaVisible=false;
                // console.log(type,pas)
                this.editTreeData(this.orgTree,type,pas);

            },
            async getOrgTreeListData(){
                await JZY.xhr.post('/sys/organization/queryTree',{},{alertSuccess:false}).then((resultData)=>{
                    // console.log("getOrgTreeListData:"+JSON.stringify(resultData))
                    try{
                        this.orgTree=resultData;
                        this.orgTreeExpandedKeys=[resultData[0].nodeId];
                        sysOrgEventBus.$emit('sysOrg_emit_orgId', {orgSid:resultData[0].sid,orgName:resultData[0].name,prefixId:resultData[0].prefixId});
                    }catch (e){
                        this.$message("role.list.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            async delDepData(sId,nodeId){
                await JZY.xhr.drop('/sys/organization/deletePseudo/'+sId,{}).then((resultData)=>{
                    try{
                        //成功后删除树结点
                        this.delTreeNode(this.orgTree,nodeId)
                    }catch (e){
                        this.$message("role.list.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            async draggingNodeTree(pas){
                //树结点的拖拽
                let self=this;
                await JZY.xhr.post('/sys/organization/updateOrgBelongs',pas,{alertSuccess:true}).then((resultData)=>{
                    // console.log("getOrgTreeListData:"+JSON.stringify(resultData))
                }).catch((e)=>{
                    //后台不成功，还原树
                    self.orgTree=JZY.u.copy(self.draggableBeforeData);
                })
            },
            editTreeData(data,type,pas){
                //给树的节点添加编辑结点
                try{
                    data.forEach(item=>{
                        if(type=="update"){
                            if(pas.organizationId==item.sid){
                                item.name=pas.name;
                                sysOrgEventBus.$emit('sysOrg_emit_orgId', {orgSid:item.sid,orgName:item.name,prefixId:item.prefixId});
                                foreach.break=new Error("StopIteration");
                            }
                        }else if(type=="add"){
                            if(pas.parentId==item.sid){
                                item.children.push(pas);
                                this.orgTreeExpandedKeys.push(item.nodeId);
                                sysOrgEventBus.$emit('sysOrg_emit_orgId', {orgSid:pas.sid,orgName:pas.name,prefixId:pas.prefixId});
                                foreach.break=new Error("StopIteration");
                            }
                        }
                        if(item.children){
                            this.editTreeData(item.children,type,pas);
                        }
                    })
                }catch (e){
                    console.log("editTreeData:"+e)
                }

            },
            delTreeNode(treedata,delNodeId){
                treedata.forEach((item,index)=>{
                    if(item.sid==delNodeId){
                        treedata.splice(index,1);
                        return;
                    }
                    if(item.children){
                        this.delTreeNode(item.children,delNodeId);
                    }
                })
            },
            handleMousewheel(){
                // this.$refs.refOrgTree.scrollTo('100%');
                //
                // this.$nextTick(() => {
                //     //在vue中操作dom尽量用ref, 但它不是响应式的
                //     console.log(document.getElementById("refOrgTree").scrollHeight);
                //     document.getElementById("refOrgTree").scrollTop=document.getElementById("refOrgTree").scrollHeight;
                //     // this.$refs.refOrgTree.scrollTop = "800px";
                // })
            }
        }
    }
</script>

<style lang="scss">
.orgaMenu{
    /*background-color: rgba(102, 102, 102, 1);*/
    height: 100%;
    .orgaTree{
        padding-top:20px ;
        font-size: 12px;
        /*color: #FFFFFF;*/
        /*background-color: rgba(102, 102, 102, 1);*/
        .custom-tree-node{
            width: 100%;
            .opera{
                /*float: right;*/
                padding-left: 10px;
                display: none;
            }
            &:hover{
                .opera{
                   display: inline-block;
                }
            }
        }

    }
    .el-tree{
        width: 100%;
        overflow: auto;
        height: calc(100% - 24px);
        white-space:nowrap
    }
    .el-tree>.el-tree-node{
        display: inline-block !important;
    }
}
</style>