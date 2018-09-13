<!--用户树，非树是树-->
<template>
  <div class="tree_wrap user_tree">
    <el-input
      class="search"
      placeholder="请输入姓名/部门/手机号码/全拼/简拼进行检索"
      clearable
      v-model="filterText">
    </el-input>

    <el-tree
      ref="user"
      class="tree_list"
      :data="userData"
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
import {userList} from '../utils/data.js';
//数据接口文件
import { getUserList } from '../utils/getData'

export default {
  name: 'userTreeView',
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
      // userData: userList,//原始数据
      userData: [],//原始数据
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
    this.initData( this.filterDataUrl )
  },
  methods: {
      //初始化获取用户树数据
      async initData( { host = '', type = '', url = '',data = {} } = {} ){
        
          let res = await getUserList( host, type, url, data, this.workStatus )
          console.info(res[0])
          // debugger
          if ( url === '' && host === '' &&  type === '' ) {//访问默认组件的所有人员
            this.userData = res[0].length === 0 ? [] : [...res[0]]
          }else{
            this.userData = res[0].length === 0 ? [] : [...res[0]['organizationUsers']]
          }
      },
      //搜索过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1 || data.organizationName.indexOf(value) !== -1 || data.mobile.indexOf(value) !== -1 || data.pinyinFirst.indexOf(value) !== -1 || data.pinyinFull.indexOf(value) !== -1;
      },
      //行点击事件-作废
      nodeClick( data , node ){
        console.log(data , node)
        if(!node.checked){//增加，选中
          if (!this.enableCheckedMultiple && !this.selectedUsersable) {//单选模式，且超过限制数
              this.$message({
                  type: 'warning',
                  message: '当前为单选模式'
              });
          }else{
            this.$refs.user.setChecked(data.sid, !node.checked)
            // debugger
            //将已选节点(增、删)回传给父组件
            this.$emit('setSelectedData', { ...data, type: 'user' , state: node.checked } )
          }
        }else{//删除，取消选中
          this.$refs.user.setChecked(data.sid, !node.checked)
          // debugger
          //将已选节点(增、删)回传给父组件
          this.$emit('setSelectedData', { ...data, type: 'user' , state: node.checked } )
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
            this.$refs.user.setChecked(data.sid, false)
            this.$message({
                type: 'warning',
                message: '当前为单选模式'
            });

            //处理单选情况下，用新的已选节点替换旧的已选节点-内外部目前无法互通
            // console.info(this.$refs.user.getCheckedKeys())
            // let slectNodeId = this.$refs.user.getCheckedKeys().filter((item)=> {
            //   return item != data.sid;
            // });
            // console.info(slectNodeId)

            // //将已选节点(增、删)回传给父组件——删除之前已选的元素
            // this.$emit('setSelectedData', { sid: slectNodeId[0], type: 'user' , state: false } )
            // this.$refs.user.setChecked(slectNodeId[0], false)
            // //将已选节点(增、删)回传给父组件——增加最后点击的元素
            // this.$emit('setSelectedData', { ...data, type: 'user' , state: true, scheduleTitleShow: false } )

            // debugger
          }else{
            //将已选节点(增、删)回传给父组件——仅剩下增加
            this.$emit('setSelectedData', { ...data, type: 'user' , state: state, scheduleTitleShow: false } )
          }
        }else{//删除，取消选中
          //将已选节点(增、删)回传给父组件——仅剩下删除
          this.$emit('setSelectedData', { ...data, type: 'user' , state: state } )
        }
      },
      //自定义树节点的内容
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span class="icon_img"><icon name="blendTree_user" scale="1.5"></icon></span>
            <span class="user_name" title={node.label}>{node.label}</span>
            <span class="user_dept" title={data.organizationName}>
              {data.organizationName}
            </span>
          </span>);
      },
  },
  watch: {
    //模糊搜索
    filterText(val) {
      this.$refs.user.filter(val);
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
.tree_wrap.user_tree{
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
      .custom-tree-node{
        .icon_img{
          width:22px;
          height:22px;
          text-align:center;
          line-height:22px;
          float:left;
          vertical-align: middle;
          border-radius:100%;
          border:1px solid #cc0;
          margin-right:16px;
        }
        .user_name{
          max-width:120px;
          float:left;
          overflow:hidden;
          white-space:nowrap;
          text-overflow: ellipsis;
        }
        .user_dept{
          max-width:80px;
          height:100%;
          line-height:36px;
          text-align: right;
          position:absolute;
          right:16px;
          top:0;
          overflow:hidden;
          white-space:nowrap;
          text-overflow: ellipsis;
        }
      } 
    }
  }
}

</style>