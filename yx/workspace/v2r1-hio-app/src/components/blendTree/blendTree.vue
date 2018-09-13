<!--此组件基于vue2.0的树组件-->
<template>
  <div class="blend_tree_wrap">
    <div class="item_list" v-if="resultDataListShow">
      <el-tag
        v-for="(item,index) in selectedListCopy"
        :key="item.type+'-'+item.sid"
        :closable = "!readOnly"
        :disable-transitions="false"
        @close="deleteListData( item.sid, item.type )">
        <span class="icon_img"><icon :name="'blendTree_'+item.type" scale="1.8"></icon></span>
        <span :title="item.name" class="title_name">{{item.name}}</span>
      </el-tag>
      <!--添加按钮图标的插槽-->
      <div class="add_button" v-if="!readOnly">
        <slot name="add_button"></slot>
      </div>
    </div>

    <!--组件弹出窗 开始-->
    <el-dialog
      title="添加选择"
      :visible.sync="blendTreeDialogVisible"
      width="50%"
      append-to-body
      top="8vh"
      custom-class="blend_tree_content"
      :close-on-click-modal="false"
      :before-close="closeModal">
      <el-row :gutter="0" class="content_wrap">
        <el-col :span="14" class="left">
          <el-tabs v-model="activeTabName" @tab-click="tabClick" type="border-card">
            <el-tab-pane label="用户" name="user" v-if="tagButtons.indexOf('user') !== -1 ">
              <user-tree
                v-if="activeTabName == 'user' && blendTreeDialogVisible"
                ref="user"
                :enableCheckedMultiple = "enableCheckedMultiple"
                :workStatus = "workStatus"
                :filterDataUrl = "filterDataUrl"
                :selectedUsersable ="selectedUsersable"
                @setSelectedData = "setSelectedData"
                >
              </user-tree>
            </el-tab-pane>
            <el-tab-pane label="部门" name="dept" v-if="tagButtons.indexOf('dept') !== -1 ">
              <dept-tree
                v-if="activeTabName == 'dept' && blendTreeDialogVisible"
                ref="dept"
                @setSelectedData = "setSelectedData"
                >
              </dept-tree>
            </el-tab-pane>
            <el-tab-pane label="角色" name="role" v-if="tagButtons.indexOf('role') !== -1 ">
              <role-tree
                v-if="activeTabName == 'role' && blendTreeDialogVisible"
                ref="role"
                @setSelectedData = "setSelectedData"
                >
              </role-tree>
            </el-tab-pane>
            <el-tab-pane label="外部联系人" name="userOutside" v-if="tagButtons.indexOf('userOutside') !== -1 ">
              <user-outside-tree
                v-if="activeTabName == 'userOutside' && blendTreeDialogVisible"
                ref="userOutside"
                :enableCheckedMultiple = "enableCheckedMultiple"
                :workStatus = "workStatus"
                :filterDataUrl = "filterDataUrl"
                :selectedUsersable ="selectedUsersable"
                @setSelectedData = "setSelectedData"
                >
              </user-outside-tree>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="10" class="right">
          <div class="selected_warp">
            <div class="header">
              <div class="selected_num">
                已选<span>{{selectedList.length}}</span>
              </div>
              <div class="selected_clear" @click="clearSelectedList">
                清空
              </div>
            </div>
            <div class="list">
              <div class="schedule_title" v-if="fromMoudle === 'schedule'">
                <span class="name">姓名</span>
                <span class="check_box">显示标题</span>
              </div>
              <ul>
                <li v-for="(item,index) in selectedList" :key="index">
                  <div class="name">
                    <span class="icon_type"><icon :name="'blendTree_'+item.type" scale="1.8"></icon></span>
                    <span class="item_name" :class="{'scheduleTitleShow':item.hasOwnProperty('scheduleTitleShow')}" :title="item.name">
                      {{item.name}}
                    </span>
                    <span class="slot_title">
                      <slot :data="item">
                        
                      </slot>
                    </span>
                  </div>
                  <div class="delete" @click="deleteSelectedList( item.sid , item.type )"><i class="el-icon-close"></i></div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      
      
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectUserClose">取 消</el-button>
        <el-button size="small" type="primary" @click="selectUserSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userTree from './widget/user';
import deptTree from './widget/dept';
import roleTree from './widget/role';
import userOutsideTree from './widget/userOutside';

export default {
  components: {
    userTree,
    deptTree,
    roleTree,
    userOutsideTree,
  },
  data(){
    return {
      blendTreeDialogVisible:false,//是否显示选人弹出窗
      activeTabName:this.activeTab,//当前选中的tab标签
      selectedList:[],//已选列表
      selectedListCopy:[],//已选列表复制，纯sid，name属性组成，点击确定按钮用
      selectedListCopyForClose:[],//已选列表复制，纯sid，name属性组成，点击取消或者x按钮回调用

      selectedUsersable:true,//单选情况下，是否可以继续选择（未超过最大限制数）,

      // customProp:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
      //     //内部 true，外部false
      //     isInside(node){
      //         return node.type === 'external'?'outside':'inside'
      //     },
      // },
    }
  },
  props: {
    tagButtons:{//可用的tab标签，默认全部
      type:Array,
      default:function(){
        return ['user','dept','role','userOutside']
      }
    },
    activeTab:{//组件默认选中的tab标签
      type:String,
      default:'user'
    },
    selectedDataToTree:{//已选择数据
      type:Object,
      default:function(){
        return {
          userList:[],
          deptList:[],
          roleList:[],
          userOutsideList:[]
        }
      }
    },
    enableCheckedMultiple:{//用户、外部联系人默认多选
      type:Boolean,
      default:true
    },
    workStatus:{//workStatus : 0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;
      type:Number,
      default:1
    },
    readOnly:{//只读模式，默认false是可编辑模式；true：不允许添加和删除人员
      type:Boolean,
      default:false
    },
    resultDataListShow:{//组合树返回已选数据项，是否展示，默认true展示
      type:Boolean,
      default:true
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
    fromMoudle:{//日程模块专用
      type:String,
      default:''
    },
    // blendTreeDialogVisible:{//是否显示此组件弹出窗，作废
    //     type:Boolean,
    //     default:true
    // },
  },
  computed: {
      // propsData:{//初始化dialog是否显示的变量，作废
      //     get: function(){
      //       return this.blendTreeDialogVisible
      //     },
      //     set: function(){
      //       this.$emit('closeDialog',false)
      //     }
      // }
  },
  methods:{
    //初始化
    init(){
      this.activeTabName = this.activeTab
      //设置已选人员
      this.selectedDataToTree.userList && this.selectedDataToTree.userList.forEach((item) => {
        this.selectedList.push({
          ...item,
          sid:item.sid,
          name:item.name,
          type:'user'
        })
      });
      //设置已选部门
      this.selectedDataToTree.deptList && this.selectedDataToTree.deptList.forEach((item) => {
        this.selectedList.push({
          ...item,
          sid:item.sid,
          name:item.name,
          type:'dept'
        })
      });
      //设置已选角色
      this.selectedDataToTree.roleList && this.selectedDataToTree.roleList.forEach((item) => {
        this.selectedList.push({
          ...item,
          sid:item.roleId || item.sid,
          name:item.roleName || item.name,
          type:'role'
        })
      });
      //设置已选外部联系人
      this.selectedDataToTree.userOutsideList && this.selectedDataToTree.userOutsideList.forEach((item) => {
        this.selectedList.push({
          ...item,
          sid:item.sid,
          name:item.name,
          type:'userOutside'
        })
      });
      this.selectedListCopy = [ ...this.selectedList ]
      //缓存已选数据，关闭回调用
      this.selectedListCopyForClose = [ ...this.selectedList ]
      
      if (!this.enableCheckedMultiple) {//单选
        this.setSelectedUsersForEnableCheckedMultiple()
      }

    },
    //组件树显示事件
    blendTreeDialogShow(){
      this.blendTreeDialogVisible = true

      // debugger
      this.$nextTick(function(){
        let selectedListTemp = []
        this.selectedList.forEach((item) => {
          if (item.type == this.activeTabName) {
            selectedListTemp.push(item.sid)
          }
        });
        //设置选中
        if( selectedListTemp.length > 0 ){
          this.$refs[this.activeTabName].$refs[this.activeTabName].setCheckedKeys(selectedListTemp);
        }
      })

    },
    //tab标签的点击切换事件
    tabClick(tab, event) {
      console.log(tab, event);
      this.activeTabName = tab.name
      // debugger

      let selectedListTemp = []
      this.selectedList.forEach((item) => {
        if (item.type == tab.name) {
          selectedListTemp.push(item.sid)
        }
      });

      this.$nextTick(function(){
        //设置选中
        this.$refs[tab.name].$refs[tab.name].setCheckedKeys(selectedListTemp);
      })

    },
    //单选情况下，是否可以继续选择人员的逻辑处理
    setSelectedUsersForEnableCheckedMultiple(){
      let tempArr = []
      this.selectedList.forEach((item)=>{
        if (item.type === 'user' || item.type === 'userOutside') {
          tempArr.push(item.sid)
        }
      })
      // debugger
      this.selectedUsersable = tempArr.length > 0 ? false : true
    },
    //接收从其他树组件返回的已选对象
    setSelectedData( obj = {} ){
      if (obj.hasOwnProperty('state') && obj.state) {//增加节点
        this.selectedList.push(obj)
      }else if (obj.hasOwnProperty('state') && !obj.state){//删除已选节点
        // debugger
        this.selectedList = this.selectedList.filter((item) => {
          return item.sid !== obj.sid
        });
      }

      if (!this.enableCheckedMultiple) {//单选
        this.setSelectedUsersForEnableCheckedMultiple()
      }

      // debugger
    },
    //删除右侧已选对象，单个
    deleteSelectedList( sid = 0 , type = ''){
      
      this.selectedList = this.selectedList.filter((item) => {
        if ( item.type == type ) {
          return item.sid !== sid
        }else{
          return true;
        }
      });
      // this.selectedListCopy = [ ...this.selectedList ]
      //同时删除左侧已选的此对象
      if ( this.activeTabName === type ) {
        this.$refs[type].$refs[type].setChecked(sid,false)
        // debugger
      }

      if (!this.enableCheckedMultiple) {//单选
        this.setSelectedUsersForEnableCheckedMultiple()
      }
      
    },
    //清空右侧已选全部列表
    clearSelectedList(){
      // alert("清空已选列表")
      //清空子组件中已选的全部对象
      this.$refs[this.activeTabName].$refs[this.activeTabName].setCheckedKeys([]);
      this.selectedList = []
      this.$message('已选节点列表已清空')

      if (!this.enableCheckedMultiple) {//单选
        this.selectedUsersable = true
      }
    },
    //确定选择事件
    selectUserSure(){
        let listTemp = [] //已选列表copy

        let userList = []  //已选人员列表
        let deptList = []  //已选部门列表
        let roleList = []  //已选角色列表
        let userOutsideList = []  //已选外部联系人列表

        //将角色列表的sid -> roleId  name -> roleName
        this.selectedList.forEach((item)=>{
          if (item.type === 'user') {
            userList.push({
              ...item,
              parentId:item.organizationId
            })
          }else if (item.type === 'dept') {
            deptList.push(item)
          }else if (item.type === 'role') {
            roleList.push({
              ...item,
              roleId:item.sid,
              roleName:item.name
            })
          }else if (item.type === 'userOutside') {
            userOutsideList.push({
              ...item,
              parentId:item.organizationId
            })
          }
        })

        this.$emit('getDataFromTree',{
          userList:userList,
          deptList:deptList,
          roleList:roleList,
          userOutsideList:userOutsideList
        })

        //修改已缓存的已选数据，关闭的时候回写数据
        this.selectedListCopyForClose = [ ...this.selectedList ]
        if (!this.enableCheckedMultiple) {//单选
          this.setSelectedUsersForEnableCheckedMultiple()
        }
        //关闭弹出窗
        this.blendTreeDialogVisible = false

        this.selectedListCopy = [...this.selectedList]

    },
    //取消选择事件
    selectUserClose(){
        console.log("取消并关闭")
        // this.$emit('closeDialog',false)

        //缓存已选数据，关闭的时候回写数据
        this.selectedList = [ ...this.selectedListCopyForClose ]
        if (!this.enableCheckedMultiple) {//单选
          this.setSelectedUsersForEnableCheckedMultiple()
        }
        this.blendTreeDialogVisible = false 
    },
    //关闭弹窗前的事件
    closeModal(done) {

        //缓存已选数据，关闭的时候回写数据
        this.selectedList = [ ...this.selectedListCopyForClose ]
        done();
        // this.$confirm('确认关闭？').then(_ => {
        //     console.info(done)
        //     done();
        // }).catch(_ => {
        //     console.log("关闭")
        // });
    },
    //已选列表（外层）的删除事件
    deleteListData( sid = 0 , type = ''){
      this.selectedListCopy = this.selectedListCopy.filter((item) => {
        if ( item.type == type ) {
          return item.sid !== sid
        }else{
          return true;
        }
      });
      let userList = []  //已选人员列表
      let deptList = []  //已选部门列表
      let roleList = []  //已选角色列表
      let userOutsideList = []  //已选外部联系人列表

      //将角色列表的sid -> roleId  name -> roleName
      this.selectedListCopy.forEach((item)=>{
        if (item.type === 'user') {
          userList.push(item)
        }else if (item.type === 'dept') {
          deptList.push(item)
        }else if (item.type === 'role') {
          roleList.push({
            roleId:item.sid,
            roleName:item.name
          })
        }else if (item.type === 'userOutside') {
          userOutsideList.push(item)
        }
      })

      this.$emit('getDataFromTree',{
        userList:userList,
        deptList:deptList,
        roleList:roleList,
        userOutsideList:userOutsideList
      })

      this.selectedList = [ ...this.selectedListCopy ]
      //修改已缓存的已选数据，关闭的时候回写数据
      this.selectedListCopyForClose = [ ...this.selectedListCopy ]

      if (!this.enableCheckedMultiple) {//单选
        this.setSelectedUsersForEnableCheckedMultiple()
      }

    },
    
  },
  mounted(){
    console.info(this.tagButtons)

    this.init()
  },
  watch: {
    //监控tab标签的切换
    activeTab: function (newValue, oldValue) {
      // alert(val)
      this.activeTabName = newValue
    },
    //监控输入已选数据的改变
    selectedDataToTree:{
　　　　handler(newValue, oldValue) {
          // console.info(oldValue)
          console.info("newValue",newValue)
          // debugger
          this.selectedList = []
          this.init() //初始化数据
　　　　},
　　　　deep: true
    },
  }, 
}
</script>




<style lang="scss">
$bc:#f1f3f6;
$contentHeihgt:410px;
.blend_tree_wrap{
    .item_list{
      .el-tag{
        i.el-icon-close{
          position:absolute;
          right:8px;
          top: 8px;
        }
      }
    }
}
.blend_tree_content{
  min-width:670px;
  max-width:800px;
  .el-dialog__body{
    padding: 16px 24px;
    .content_wrap{
      .left{
        .el-tabs--border-card{
          box-shadow:none;
          border-color:$bc;
          border-radius:4px;
          & >.el-tabs__content{
            height: calc(410px - 39px - 24px);
            padding:12px 18px;
          }
          & >.el-tabs__header{
            border-bottom-color:$bc;
            .el-tabs__item{
              color: #505050;
              font-size:12px;
            }
          }
          & >.el-tabs__header .el-tabs__item.is-active{
            border-left-color:$bc;
            border-right-color:$bc;
          }
          .tree_wrap{
            .search{
              margin-bottom:12px;
            }
          }

          .el-tree-node__content{//树组件的行高
            height:36px;
          }
        }
      }
      .right{
        padding-left:24px;
        .selected_warp{
          width:100%;
          min-height:$contentHeihgt;
          overflow-y:auto;
          border:1px solid $bc;
          border-radius:4px;
          .header{
            height: 39px;
            line-height:39px;
            border-bottom:1px solid $bc;
            background-color:#f5f7f9;
            .selected_num{
              width: calc( 100% - 30px - 18px );
              float:left;
              text-indent:18px;
              overflow: hidden;
              span{
                margin-left:8px;
              }
            }
            .selected_clear{
              width: 30px;
              float:left;
              text-align:right;
              color:#A0A0A0;
              margin-right:18px;
              overflow: hidden;
              &:hover{
                cursor:pointer;
              }
            }
          }
          .list{
            height:345px;
            overflow-y:auto;
            padding:10px 0 12px;
            ul{
              margin:0;
              padding:0;
              li{
                list-style: none;
                line-height:36px;
                padding:0 16px;
                position: relative;
                .delete{
                  font-size: 16px;
                  position: absolute;
                  top:0;
                  right:16px;
                  display:none;
                  &:hover{
                    cursor:pointer;
                  }
                }
                &:hover{
                  background-color:#f5f7fa;
                  .delete{
                    display:block;
                  }
                }
                .name{
                  position:relative;
                  height:36px;
                  .item_name{
                    width: calc(100% - 20px);
                    float: left;
                    display:inline-block;
                    text-indent:30px;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow: ellipsis;
                    &.scheduleTitleShow{
                      width: calc(100% - 20px - 24px);
                    }
                  }
                  .slot_title{
                    width: 24px;
                    float: left;
                    display:inline-block;
                  }
                  .icon_type{
                    width:22px;
                    height:18px;
                    color:#46A7FF;
                    text-align: center;
                    vertical-align: middle;
                    line-height: 18px;
                    border-radius: 50%;
                    position:absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                  }
                }
              }
            }
            .schedule_title{//日程专用
              height:36px;
              line-height:36px;
              text-align:center;
              .name{
                width: 63%;
                float: left;
              }
              .check_box{
                width: 30%;
                float: left;

              }
            }
          }
        }
      }
    }
  }
}

</style>

<style lang="scss" scoped>
  .blend_tree_wrap{
    .item_list{
      position:relative;
      min-height:44px;
      .el-tag{
        margin-top: 4px;
        margin-bottom: 8px;
        position: relative;
        display: inline-flex;
        padding: 0 32px 0 36px;
        .title_name{
          max-width:120px;
          display:inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .icon_img {
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          display: inline-block;
          vertical-align: middle;
          color:#46A7FF;
          // margin-right: 8px;
          position:absolute;
          left:10px;
          top: 7px;
        }
        i.el-icon-close{
          position:absolute;
          right:8px;
          top: 8px;
        }
      }
      .add_button{
        display:inline-block;
        i{
          font-size: 14px;
          color: #46A7FF;
          position: absolute;
          bottom: 16px;
          padding-left: 8px;
          &:hover{
            cursor:pointer;
          }
        }
      }
      // .item{
      //   height:32px;
      //   line-height:32px;
      //   padding:0 10px;
      //   display: inline-block;
      //   margin-right:12px;
      //   border-radius: 4px;
      //   background-color: rgba(236, 245, 255, 1);
      //   border:1px solid rgba(210, 232, 255, 1);
      // }
    }
  }
</style>