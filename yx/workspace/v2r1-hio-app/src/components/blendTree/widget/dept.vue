<!--部门树-->
<template>
  <div class="tree_wrap dept_tree">
    <el-input
      class="search"
      placeholder="请输入部门名称进行检索"
      clearable
      v-model="filterText">
    </el-input>

    <el-tree
      ref="dept"
      class="tree_list"
      :data="deptData"
      show-checkbox
      node-key="sid"
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
import {deptList} from '../utils/data.js';
//数据接口文件
import { getDeptList } from '../utils/getData'

export default {
  name: 'deptTreeView',
  components: {
    // FormContainer,
  },
  props: ['formMode'],
  data() {
    return {
      filterText: '',
      // deptData: deptList,//原始数据
      deptData: [],//原始数据
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  created() {
  },
  mounted() {
    //初始化数据
    this.initData()
    // debugger
    console.info(this.deptData)
  },
  methods: {
      //初始化获取部门树数据
      async initData(){
        let res = await getDeptList()
        this.deptData = res.length === 0 ? [] : [...res]
      },
      //搜索过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //行点击事件
      nodeClick( data , node ){
        console.log(data , node)
        this.$refs.dept.setChecked(data.sid, !node.checked)
        // debugger
        //将已选节点(增、删)回传给父组件
        this.$emit('setSelectedData', { ...data, type: 'dept' , state: node.checked } )
      },
      //复选框的值改变的事件
      checkClick( data , nodeList ){
        console.info(data)
        console.info(nodeList)
        const state = nodeList.checkedKeys.indexOf(data.sid)  != -1 ? true : false
        //将已选节点(增、删)回传给父组件
        this.$emit('setSelectedData', { ...data, type: 'dept' , state: state } )
      },
      //自定义树节点的内容
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span class="dept_name" title={node.label}>{node.label}</span>
          </span>);
      },
  },
  watch: {
    //模糊搜索
    filterText(val) {
      this.$refs.dept.filter(val);
    }
  },
};
</script>
<style lang="scss">
.tree_wrap.dept_tree{
  .tree_list{
    height:300px;
    overflow:auto;
    .el-tree-node.is-expanded>.el-tree-node__content{
      // overflow:visible;
      // overflow:auto;
    }
    .el-tree-node__content>.el-checkbox{
      margin-right:16px;
      .el-checkbox__input{
        vertical-align:baseline;
      }
    }
  }
}
</style>