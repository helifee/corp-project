<template>
  <div class="tree_wrap role_tree">
    <el-input
      class="search"
      placeholder="请输入角色名称进行检索"
      clearable
      v-model="filterText">
    </el-input>

    <el-tree
      ref="role"
      class="tree_list"
      :data="roleData"
      show-checkbox
      node-key="roleId"
      default-expand-all
      highlight-current
      check-strictly
      :expand-on-click-node ="false"
      check-on-click-node
      :props="defaultProps"
      :render-content="renderContent"
      @check = "checkClick"
      :filter-node-method="filterNode">
    </el-tree>
  </div>
</template>

<script>
import {roleList} from '../utils/data.js';
//数据接口文件
import { getRoleList } from '../utils/getData'

export default {
  name: 'deptTreeView',
  components: {
    // FormContainer,
  },
  props: ['formMode'],
  data() {
    return {
      filterText: '',
      // roleList: roleList,//原始数据
      roleData: [],
      defaultProps: {
        children: 'children',
        label: 'roleName'
      }
    };
  },
  created() {
  },
  mounted() {
    //初始化数据
    this.initData()
    // debugger
    console.info(this.roleData)
  },
  methods: {
      //初始化获取角色树数据
      async initData(){
        let requestData = {
            name:"",
            pageNum:1,
            pageCount:500
        }
        let res = await getRoleList( requestData )
        this.roleData = res[0].list.length === 0 ? [] : [...res[0].list]
      },       
      //搜索过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.roleName.indexOf(value) !== -1;
      },
      //行点击事件
      nodeClick( data , node ){
        console.log(data , node)
        this.$refs.role.setChecked(data.roleId, !node.checked)
        // debugger
        //角色属性的转换roleId -> sid  ; roleName -> name
        const returnData = {
          ...data,
          sid:data.roleId,
          name:data.roleName
        }
        //将已选节点(增、删)回传给父组件
        this.$emit('setSelectedData', { ...returnData, type: 'role' , state: node.checked } )
      },
      //复选框的值改变的事件
      checkClick( data , nodeList ){
        console.info(data)
        console.info(nodeList)
        //角色属性的转换roleId -> sid  ; roleName -> name
        const returnData = {
          ...data,
          sid:data.roleId,
          name:data.roleName
        }
        const state = nodeList.checkedKeys.indexOf(data.roleId)  != -1 ? true : false
        //将已选节点(增、删)回传给父组件
        this.$emit('setSelectedData', { ...returnData, type: 'role' , state: state } )
      },
      //自定义树节点的内容
      renderContent(h, { node, data, store }) {
        console.info(node)
        console.info(data)
        console.info(store)
        // debugger
        return (
          <span class="role-tree-node">
            <span class="role_name" title={node.label}>{node.label}</span>
            <span class="roles_count">
              {data.roleUserCount} 人
            </span>
          </span>);
      },
  },
  watch: {
    //模糊搜索
    filterText(val) {
      this.$refs.role.filter(val);
    }
  },
};
</script>
<style lang="scss">
.tree_wrap.role_tree{
  .tree_list{
    height:300px;
    overflow:auto;
    .el-tree-node__content>.el-checkbox{
      margin-right:16px;
    }
    .el-tree-node__content{
      position:relative;
      .el-checkbox__input{
        vertical-align:baseline;
      }
      .role_name{
        max-width: 220px;
        float: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .roles_count{//角色组件
        line-height:36px;
        position:absolute;
        right:16px;
        top:0;
      }
    }
  }
}
</style>