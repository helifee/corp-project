<template>
    <div class="role_table_data">
      <el-row :gutter="24" class="dept-tree">
        <el-col :span="24">
            <div class="content">
              <el-row>
                <el-col></el-col>
              </el-row>
                <smarter-tree
                    ref="roleTreeGrid"
                    checked-key="isCheckedNode"
                    :customProp = "customPropRole"
                    :enable-filter="enableTargetTreeFilter"
                    @mounted="$refs.roleTreeGrid.refreshTreeTable(roleData)"
                    @radioClick="radioClickRole"
                    @checkboxClick="checkboxClickRole"
                    :expand-all="true"
                    child-key = "children"
                    :checked-all-childs-when-parent-checked="checkedAllChildsWhenParentChecked"
                    :enable-check="enableCheck"
                    :enableCheckedFolder="enableCheckedFolder"
                    tree-key="roleId"
                    :enable-checked-multiple="enableCheckedMultiple"
                    prop="roleName"

                    
                    absoluteTop="-45px"
                    maxHight="300px"
                    label="角色">
                    <template slot-scope="scope">
                        <span style="margin-left:30px;">
                            {{scope.row.roleRemark}} 人数:{{scope.row.roleUserCount}}
                        </span>
                    </template>
                </smarter-tree>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<style scoped lang="scss">
$borderColor:#dcdfe6;
.content{
    margin-top:40px;
    padding:7px 0 0;
    border:1px solid $borderColor;
    border-top:none;
}
</style>
<script>
    import config from '@/config/index.js'
    // import {roleData} from './roleData.js'//tree原始数据
    import mockData from '@MockData'

    export default{
        components: {
        },
        data(){
          let _self = this;
            return {
              checkedAllChildsWhenParentChecked:true,
              enableCheck:true,
              enableCheckedFolder:true,

              roleData:[],//角色原生数据
              selectedNodeRole:[...this.selectedRoleToTree],//已选择的角色
              customPropRole:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                  isCheckedNode(node){//根据调用组件时，已选择的角色，渲染tree
                      // console.log('custom prop role thwis:',node.id,this,node)
                      // console.info("存在已选择的人员")
                      if (_self.selectedRoleToTree.find((item, index, arr) =>{
                                return item.roleId == node.roleId
                            }
                        )){
                          return true
                      }else{
                          return false
                      }
                  },
                  iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                      // console.log('custom prop this:',this,node)
                      // return node.$extra.hasChildren === true
                  }
                    
              },
            }
        },
        props:{
          selectedRoleToTree: {//接收父组件的角色数据
                type: Array,
                default: function(){
                    return []
                }
            },
            enableTargetTreeFilter: {//过滤是否开启
                type: Boolean,
                default: true
            },
            enableCheckedMultiple:{//单选false、多选true
                type:Boolean,
                default:true
            },
        },
        methods:{
          //获取角色树数据
          async getRoleData(){
              let requestData = {
                  name:"",
                  pageNum:1,
                  pageCount:500
              }
              let res = await JZY.xhr.r([{type:'post',url:'/role/queryRoles',data:requestData}],'GLOBAL.COMPONENTS.WANG_TAO',false,false).then((resultData)=>{
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
          //将选择的角色回传给父组件
          getResult:function(){
            // console.info(this.selectedNodeRole)
            // console.info(this.$refs.roleTreeGrid.getCheckedNodes())
            this.$emit('roleFromTreeFunc',this.$refs.roleTreeGrid.getCheckedNodes())
          },
          //角色多选框的点击事件，非change事件
          checkboxClickRole:function(row){
              this.selectedNodeRole = row
              // this.$message("您点击的是：" + row.roleName)
              this.getResult();
          },
          //角色单选框的点击事件，非change事件
          radioClickRole:function(row){
              this.selectedNodeRole = row
              // this.$message("您点击的是：" + row.roleName)
              this.getResult();
          },
        },
        mounted(){
          this.getRoleData()
        },
        watch:{
          "selectedRoleToTree":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    this.selectedNodeRole =  [...newVal]
                    
                    this.$emit('roleFromTreeFunc',this.selectedNodeRole)
                    this.$refs.roleTreeGrid.refreshTreeTable(this.roleData);
                },
                deep:true
            },
        }
    }
</script>