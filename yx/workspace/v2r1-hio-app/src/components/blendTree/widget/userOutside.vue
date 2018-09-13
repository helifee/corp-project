<template>
  <div class="tree_wrap user_outside_tree">
    <el-input
      class="search"
      placeholder="请输入姓名进行检索"
      clearable
      v-model="filterText">
    </el-input>

    <el-tree
      ref="userOutside"
      class="tree_list"
      :data="userOutsideData"
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
import {userOutsideList} from '../utils/data.js';
//数据接口文件
import { getUserOutsideList } from '../utils/getData'

export default {
  name: 'userOutsideTreeView',
  components: {
    // FormContainer,
  },
  props: {
    enableCheckedMultiple:{//用户、外部联系人默认多选
      type:Boolean,
      default:true
    },
    selectedUsersable:{//单选情况下，是否可以继续选择（未超过最大限制数）
      type:Boolean,
      default:true
    },
    workStatus:{//workStatus : 0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;
      type:Number,
      default:1
    },
    filterDataUrl:{//选人组件url的动态切换
        type:Object,
        default:function(){
            return {
                host:'',
                type:'',
                url:'',
                data:{}
            }
        }
    },
  },
  data() {
    return {
      filterText: '',
      // userOutsideData: userOutsideList,//原始数据
      userOutsideData: [],//原始数据
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  created() {
    // this.$store.commit({
    //   type: 'customForm/INIT_FORM_MODE',
    //   formMode: this.formMode,
    // });
  },
  mounted() {
    //初始化数据
    this.initData( this.filterDataUrl )
    // console.info(this.roleData)
  },
  methods: {
      //初始化获取用户树数据
      async initData( {host = '', type = '', url = '',data = {} } = {} ){
          let res = await getUserOutsideList( host, type, url, data, this.workStatus )
          console.info(res[0])

          if ( url === '' ) {//访问默认组件的所有人员
            this.userOutsideData = res[0].length === 0 ? [] : [...res[0]]
          }else{
            this.userOutsideData = res[0].length === 0 ? [] : [...res[0]['externalUsers']]
          }
      },
      //搜索过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //行点击事件
      nodeClick( data , node ){
        console.log(data , node)
        if(!node.checked){//增加，选中
          if (!this.enableCheckedMultiple && !this.selectedUsersable) {//单选模式，且超过限制数
              this.$confirm('您设定的为单选模式，但是有超过一条数据为选中状态，将仅设定第一个选中的为选中节点，其他都变为非选中状态。', '警告', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'warning'
                });
          }else{
            this.$refs.userOutside.setChecked(data.sid, !node.checked)
            //将已选节点(增、删)回传给父组件
            this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: node.checked } )
          }
        }else{//删除，取消选中
          this.$refs.userOutside.setChecked(data.sid, !node.checked)
          //将已选节点(增、删)回传给父组件
          this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: node.checked } )
        }
        // debugger
        
      },
      //复选框的值改变的事件
      checkClick( data , nodeList ){
        console.info(data)
        console.info(nodeList)
        const state = nodeList.checkedKeys.indexOf(data.sid)  != -1 ? true : false
        // debugger
        if(state){//增加，选中
          if (!this.enableCheckedMultiple && !this.selectedUsersable) {//单选模式，且超过限制数
              this.$refs.userOutside.setChecked(data.sid, false)
              this.$message({
                  type: 'warning',
                  message: '当前为单选模式'
              });
              //处理单选情况下，用新的已选节点替换旧的已选节点-内外部目前无法互通
              // console.info(this.$refs.userOutside.getCheckedKeys())
              // let slectNodeId = this.$refs.userOutside.getCheckedKeys().filter((item)=> {
              //   return item != data.sid;
              // });
              // console.info(slectNodeId)

              // //将已选节点(增、删)回传给父组件——删除之前已选的元素
              // this.$emit('setSelectedData', { sid: slectNodeId[0], type: 'userOutside' , state: false } )
              // this.$refs.userOutside.setChecked(slectNodeId[0], false)
              // //将已选节点(增、删)回传给父组件——增加最后点击的元素
              // this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: true } )
          }else{
            //将已选节点(增、删)回传给父组件——仅剩下增加
            this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: state } )
          }
        }else{//删除，取消选中
          //将已选节点(增、删)回传给父组件——仅剩下删除
          this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: state } )
        }
      },
      // //行点击事件-作废，添加单选
      // nodeClick( data , node ){
      //   console.log(data , node)
      //   this.$refs.userOutside.setChecked(data.sid, !node.checked)
      //   // debugger
      //   //将已选节点(增、删)回传给父组件
      //   this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: node.checked } )
      // },
      // //复选框的值改变的事件-作废，添加单选
      // checkClick( data , nodeList ){
      //   console.info(data)
      //   console.info(nodeList)

      //   const state = nodeList.checkedKeys.indexOf(data.sid)  != -1 ? true : false
      //   //将已选节点(增、删)回传给父组件
      //   this.$emit('setSelectedData', { ...data, type: 'userOutside' , state: state } )
      // },
      //自定义树节点的内容
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span class="userOutside_name" title={node.label}>{node.label}<i>{data.externalLabel}</i></span>
            <span class="userOutside_desc" title={data.externalCompany}>
              {data.externalCompany}
            </span>
          </span>);
      },
  },
  watch: {
    //模糊搜索
    filterText(val) {
      this.$refs.userOutside.filter(val);
    },
    //监控用户树入参url的改变
    "filterDataUrl":{
        handler:function(newVal,oldVal){
            console.log(newVal);
            // console.log(oldVal);

            this.initData({
                host:newVal.host,
                type:newVal.type,
                url:newVal.url,
                data:newVal.data
            })
        },
        deep:true
    },
  },
};
</script>
<style lang="scss">
.tree_wrap.user_outside_tree{
  .tree_list{
    height:300px;
    overflow:auto;
    .el-tree-node__content>.el-checkbox{
      margin-right:16px;
      height: 45px;
      line-height: 45px;
    }
    .el-tree-node__content{
      height:60px !important;
      .custom-tree-node{
        width: calc(100% - 70px);
        .userOutside_name{
          width:100%;
          display:block;
          overflow:hidden;
          white-space:nowrap;
          text-overflow: ellipsis;
          i{
            margin-left:12px;
          }
        }
        .userOutside_desc{
          width:100%;
          display:block;
          overflow:hidden;
          white-space:nowrap;
          text-overflow: ellipsis;

        }
      }
    }
  }
}

</style>