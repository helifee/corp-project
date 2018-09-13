<!--自由流-流程配置-->
<template>
  <div class="approve create add_label">
    <right-slide-modal title="流程配置" :visible.sync="propsData" class="add_user_freeFlow_dialog" :fullscreen="false" append-to-body :modal-append-to-body="true" ref="addUserDialog1">
      <el-form :rules="addUserDialogRules" :model="addUserDialog" ref="addUserDialog" label-width="140px">
        <el-alert
          title="如下配置此流程的审批人列表"
          type="warning"
          show-icon style="width:100%;margin-bottom:10px;">
        </el-alert>
        <!--当前审批节点页面-->
        <div class="approve_content" ref="approve_content">
          <div v-for="(item,index) in dataListInfo" :key="index">
            <div class="title">
                <div class="name">环节{{JZY.u.intToChinese(index + 1 )}}</div>
                <div class="delete" @click="deleteStep(index)"><i class="el-icon-delete"></i></div>
            </div>
            <div class="info">
              <el-form-item label="审批类型：">
                  <el-radio-group v-model="item.nodeType" @change = "changenodeType($event,index)">
                      <el-radio :label="1">普通审批</el-radio>
                      <el-radio :label="2">会签</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="审批人员：" prop="approvers">
                  <!--审核-全局组件的使用-->
                  <blend-tree
                      v-if="item.nodeType == 1"
                      :ref= "'approverTree'+index"
                      :enable-checked-multiple = "false"
                      :tagButtons="tagButtonsForApprover"
                      :activeTab = "activeTabForApprover"
                      :selectedDataToTree = "item.approvers3"
                      @getDataFromTree = "getDataFromTreeForApprover">
                      <!--添加按钮图标的插槽-->
                      <div slot="add_button">
                        <i class="icon el-icon-circle-plus" @click.stop = "addApproveUser1( index, item.nodeType )"></i>
                      </div>
                  </blend-tree>

                  <!--会签-全局组件的使用-->
                  <blend-tree
                      v-else
                      :ref= "'signTree'+index"
                      :enable-checked-multiple = "true"
                      :tagButtons="tagButtonsForSign"
                      :activeTab = "activeTabForSign"
                      :selectedDataToTree = "item.approvers4"
                      @getDataFromTree = "getDataFromTreeForSign">
                      <!--添加按钮图标的插槽-->
                      <div slot="add_button">
                        <i class="icon el-icon-circle-plus" @click.stop = "addApproveUser1( index, item.nodeType )"></i>
                      </div>
                  </blend-tree>

                  <!-- <el-tag
                    v-if="user.sid"
                    v-for="(user,index2) in item.nodeType == 1 ?item.approvers1 : item.approvers2"
                    :key="index2"
                    closable
                    :disable-transitions="false"
                    @close="deleteUserOnly(index,user.sid)">
                    {{user.name}}
                  </el-tag>
                  <i class="icon el-icon-circle-plus" @click="addApproveUser( index, item.nodeType )"></i> -->
              </el-form-item>
            </div>
          </div>
        </div>
        <!--添加环节按钮-->
        <el-button type="primary" class="insert_user_button"  @click="addStep()">
          <i class="el-icon-arrow-right el-icon-plus"></i>
          添加环节
        </el-button>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="propsData = false">取 消</el-button>
        <el-button type="primary" @click="submitFlow">确 定</el-button>
      </div>
    </right-slide-modal>

    <!--1棵树-->
    <user-tree
        :selectUserDialogVisible="showUserTreeOnly"
        :selectedUsers = "showUserOnly"
        :enable-checked-multiple = "enableCheckedMultiple"
        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
        @getUserTree = "getUserTreeOnly">
    </user-tree>

  </div>
</template>
<script>

  export default {
    components:{
    },
    data() {
      return {
        dataListInfo:[{//环节信息
          id:1,
          nodeName:1,//环节名称
          nodeType:1,//审批类型1审核、2会签
          approvers:[{//审批人
            sid:'',
            name:''
          }],
          approvers1:[{//审核的审批人，缓存用
            sid:'',
            name:''
          }],
          approvers2:[{//会签的审批人，缓存用
            sid:'',
            name:''
          }],
          approvers3:{//审核的审批人，缓存用
            userList:[],
            userOutsideList:[]
          },
          approvers4:{//会签的审批人，缓存用
            userList:[],
            userOutsideList:[]
          },

        },],

        addUserDialog:{
          visible: false,
        },
        addUserDialogRules:{
          type: [
            { required: true, message: '请选择', trigger: 'change' },
          ],
        },
        /*1棵树*/
        showUserTreeOnly:false,
        enableCheckedMultiple:true,//默认多选true，false单选
        showUserOnly:[],//已选用户，传入tree的数据
        nowShowDataIndex:0,//当前环节序号，用户树

        //审核-混合组件2.0
        selectedDataToTreeForApprover:{//已选树节点
          userList:[],
          userOutsideList:[]
        },
        tagButtonsForApprover:['user','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTabForApprover:'user',//初始化激活的tab标签

        //会签-混合组件2.0
        selectedDataToTreeForSign:{//已选树节点
          userList:[],
          userOutsideList:[]
        },
        tagButtonsForSign:['user','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
        activeTabForSign:'user',//初始化激活的tab标签



      }
    },
    props:{
      labelDialogVisible:{
          type: Boolean,
          default:true, //调试用
          required: true
      },
      infoData:{
        type:Object,
        default:function(){
          return {}
        }
      },

    },
    computed: {
        propsData:{//初始化dialog是否显示的变量
            get: function(){
              return this.labelDialogVisible
            },
            set: function(){
              this.$emit('closeAddLabelModal',false)
            }
        }
    },
    methods: {
        //添加环节
        addStep(){
          const info = {//环节信息
            id:this.dataListInfo.length + 1,
            nodeName:this.dataListInfo.length + 1,//环节名称
            nodeType:1,//审批类型1审核、2会签
            approvers:[{//审批人
              sid:'',
              name:''
            }],
            approvers1:[{//审核的审批人，缓存用
              sid:'',
              name:''
            }],
            approvers2:[{//会签的审批人，缓存用
              sid:'',
              name:''
            }],

            approvers3:{
              userList:[],//审核的审批人，缓存用
              userOutsideList:[]
            },
            approvers4:{//会签的审批人，缓存用
              userList:[],
              userOutsideList:[]
            },

          }

          this.dataListInfo.push( info )

          //定位滚动条到div的最底
          this.$nextTick(() => {
            // console.info(this.$refs)
             // var container = this.$refs.approve_content
             var container = this.$refs.addUserDialog1.$el.children[0].children[1]

             // console.log(container)
             container.scrollTop = container.scrollHeight
          })

        },
        //删除环节
        deleteStep:function( index = 0 ){//前、后
          this.dataListInfo.splice(index,1)
          console.info(index)
        },
        //审批方式切换事件
        changenodeType( event ,index = 0 ){
          console.info(event)
          console.info(index)

          this.dataListInfo[index]['nodeType'] = event


          if (event == 1) {//审核
            this.dataListInfo[index]['approvers'] = JZY.u.copy(this.dataListInfo[index]['approvers1'])
            this.showUserOnly = JZY.u.copy(this.dataListInfo[index]['approvers1'])

          }else{//会签
            this.dataListInfo[index]['approvers'] = JZY.u.copy(this.dataListInfo[index]['approvers2'])
            this.showUserOnly = JZY.u.copy(this.dataListInfo[index]['approvers2'])
          }


          // this.dataListInfo[index]['approvers'] = event == 1 ? this.dataListInfo[index]['approvers1'] : this.dataListInfo[index]['approvers2']

        },
        /*1棵树*/
        //显示会签人选择组件,TYPE:1审核；2会签
        addApproveUser:function( index = 0, type = 1 ){
          if (type == 1) {//审核
            this.enableCheckedMultiple = false
            this.showUserOnly = JZY.u.copy(this.dataListInfo[index]['approvers1'])

          }else{//会签
            this.enableCheckedMultiple = true
            this.showUserOnly = JZY.u.copy(this.dataListInfo[index]['approvers2'])
          }

          this.nowShowDataIndex = index
          this.showUserTreeOnly = true
        },
        //接收用户树组件的返回值
        getUserTreeOnly:function(arr){
          this.showUserOnly = JZY.u.copy(arr)
          this.dataListInfo[this.nowShowDataIndex]['approvers'] = JZY.u.copy(arr)

          if (this.dataListInfo[this.nowShowDataIndex]['nodeType'] == 1) {//审核
            this.dataListInfo[this.nowShowDataIndex]['approvers1'] = JZY.u.copy(arr)
          }else{//会签
            this.dataListInfo[this.nowShowDataIndex]['approvers2'] = JZY.u.copy(arr)
          }

          
          console.info("this.dataListInfo--------",this.dataListInfo)
        },
        //删除用户tag的事件
        deleteUserOnly(index = 0 ,sid = '') {

            console.info("index-------",index)
            console.info("sid-------",sid)
            console.info("this.dataListInfo[index]['approvers']-------",this.dataListInfo[index]['approvers'])

            this.dataListInfo[index]['approvers'] = this.dataListInfo[index]['approvers'].filter(function(item) {
                return item.sid != sid;
            });


            if (this.dataListInfo[index]['nodeType'] == 1) {//审核
              this.dataListInfo[index]['approvers1'] = JZY.u.copy(this.dataListInfo[index]['approvers'])
            }else{//会签
              this.dataListInfo[index]['approvers2'] = JZY.u.copy(this.dataListInfo[index]['approvers'])
            }
        },

        //流程配置提交事件
        async submitFlow(){

          let submitBoolean = true  //所有环节是否都配置审批人

          let tempArr = JZY.u.copy(this.dataListInfo)

          //过滤审批人的属性
          this.dataListInfo.forEach((item,index)=>{


              tempArr[index]['approvers'] = []

              delete tempArr[index]['approvers1']
              delete tempArr[index]['approvers2']
              console.info(item)


              item.approvers.forEach((item2)=>{
                  if (item2.sid) {
                      // tempArr[index]['approvers'].push({
                      //     sid:item2.isInside=='inside' ? item2.sid : item2.imUserId,
                      //     name:item2.name,
                      //     type:item2.isInside=='inside' ? 0 : 1
                      // })
                      tempArr[index]['approvers'].push({
                          sid:item2.sid,
                          name:item2.name,
                          type:item2.isInside=='inside' ? 0 : 1
                      })
                  }else{
                      submitBoolean = false
                  }
              })

              if( item.approvers.length == 0){
                  submitBoolean = false
              }


          });


          console.info("tempArr=======",tempArr)
          if (submitBoolean) {
              this.$emit('saveInfoData',tempArr)
          }else{
              this.$message({
                  showClose: true,
                  message: '请配置流程环节中的审批人',
                  type: 'warning'
              })
          }
          
          // let res = await setInstanceFrontAddLabel( this.instanceid , this.instanceAcId , name , this.addUserDialog.nodeType , userIds )
          
        },


        //显示会签人选择组件,TYPE:1审核；2会签
        addApproveUser1:function( index = 0, type = 1 ){

          if (type == 1) {//审核
            this.selectedDataToTreeForApprover = JZY.u.deepExtend( {} , this.dataListInfo[index]['approvers3'] )

            // JZY.u.copy(this.dataListInfo[index]['approvers1'])
            this.$refs['approverTree'+index][0].blendTreeDialogShow()

          }else{//会签
            this.selectedDataToTreeForSign = JZY.u.deepExtend( {} , this.dataListInfo[index]['approvers4'] )

            this.$refs['signTree'+index][0].blendTreeDialogShow()

          }

          this.nowShowDataIndex = index
          // this.showUserTreeOnly = true
        },

        //接收混合树组件的返回值-审核
        getDataFromTreeForApprover( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          // debugger
          // this.dataListInfo[this.nowShowDataIndex]['approvers3'] = {userList:[],
          //   userOutsideList:[]
          // }
          
          this.dataListInfo[this.nowShowDataIndex]['approvers'] = []
          obj.userList && obj.userList.forEach((item)=>{
            this.dataListInfo[this.nowShowDataIndex]['approvers'].push(item)
          })
          obj.userOutsideList && obj.userOutsideList.forEach((item)=>{
            this.dataListInfo[this.nowShowDataIndex]['approvers'].push(item)
          })
          console.info(this.dataListInfo)
        },

        //接收混合树组件的返回值-会签
        getDataFromTreeForSign( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          // debugger
          this.dataListInfo[this.nowShowDataIndex]['approvers'] = []
          obj.userList && obj.userList.forEach((item)=>{
            this.dataListInfo[this.nowShowDataIndex]['approvers'].push(item)
          })
          obj.userOutsideList && obj.userOutsideList.forEach((item)=>{
            this.dataListInfo[this.nowShowDataIndex]['approvers'].push(item)
          })

          console.info(this.dataListInfo)

        },
      
    },
    mounted(){
      this.addUserDialog = JZY.u.deepExtend( {}, this.infoData )
    },
    watch:{
        "infoData":{
            handler:function(newVal,oldVal){
                // console.info(newVal)
                // console.info(oldVal)
                this.addUserDialog = JZY.u.deepExtend( {}, this.addUserDialog , newVal )
                this.showUserOnly = []
            },
            deep:true
        },
    },
  }
</script>
<style lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.add_user_freeFlow_dialog{

  .el-dialog__header{
    border-bottom: 1px solid $borderColor;
  }
  .el-dialog{
    margin-top: 0;
    width:100%;
    .el-dialog__body {
      height: calc(100% - 50px - 32px - 48px - 70px);
    }
  }
  // .add_user_before_dialog{
  //   .el-dialog__body{
  //     padding:20px;
  //   }
  //   .el-tag{
  //     margin-right: 10px;
  //   }
  // }
                
}
</style>
<style scoped lang="scss">
@import "../../approveGlobalVar.scss"; //引入任务项目的css变量
.add_user_freeFlow_dialog{
    .approve_content{
      border:1px solid $borderColor;
      line-height:40px;
      // max-height:300px;
      overflow-y:auto;
      .title{
        background-color:$backgroundColor1;
        border-bottom:1px solid $borderColor;
        text-indent:20px;
        font-weight:bolder;
        position:relative;
        .delete{
          width:50px;
          line-height:40px;
          text-align:center;
          position:absolute;
          top: 0px;
          right: 20px;
          &:hover{
            color: $deleteHoverColor;
            cursor:pointer;
          }
        }
      }
      .info{
        padding-top:22px;
        .icon{
          font-size:18px;
          color:#46A7FF;
          &:hover{
            cursor:pointer;
          }
        }
        .name{
          margin-right:50px;
        }
        .user_name{
          font-size:12px;
          color: #999;
          margin-right:10px;
        }
      }
    }
    .insert_user_button{
      margin-top:20px;
    }
}
</style>