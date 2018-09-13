<template>
    <div class="phoneList">
        <el-row style="height: 100%">
            <el-col :span="5" class="phoneTree">
                <!--<h3>{{prefixName[0]}}</h3>-->
                <el-tree  :data="orgTree"  node-key="nodeId" :expand-on-click-node="false" @node-click="handleNodeClick"
                          :props="treeProps"  :default-expanded-keys="orgTreeExpandedKeys" class="orgaTree" >
                      <span class="custom-tree-node" slot-scope="{ node, data }" >
                        <span class="custom-name">{{ data.name}}</span>
                        <span class="opera">
                            <span>{{data.userCount}}人</span>
                        </span>
                      </span>
                </el-tree>
            </el-col>
            <el-col :span="19" class="phoneListRight">
                <div>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="width: calc( 100% - 280px);display: inline-block;">
                        <el-breadcrumb-item v-for="(item,index) in prefixName" :key="index">{{item}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-input size="medium" placeholder="请输入姓名"  class="searchInput"
                              v-model="searchName" @keyup.enter.native="handleQuery">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleQuery" style="cursor: pointer;"></i>
                    </el-input>
                </div>
                <el-table v-loading="loading" :data="userData" >
                    <el-table-column label="姓名" prop="name" min-width="130" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div>
                                <img :src="JZY.c.imgPath+'/userlogo.png'" style="width: 35px;vertical-align:middle;display:inline" />
                                <span >{{scope.row.name}}</span>
                                <img src="./u634.png" style="width: 16px;vertical-align:middle;display:inline" />
                                <span class="icon_yuan bg_0" v-if="scope.row.isDefault=='0'">兼 </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="职务" prop="position" min-width="100" show-overflow-tooltip> </el-table-column>
                    <!--<el-table-column label="性别" prop="sex" min-width="40"> </el-table-column>-->
                    <el-table-column label="手机号码" prop="mobile" min-width="100"> </el-table-column>
                    <el-table-column label="电子邮件" prop="email" min-width="130"> </el-table-column>
                    <el-table-column label="所属部门" prop="organizationName" min-width="100" show-overflow-tooltip> </el-table-column>

                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home-phone-list",
        data(){
            return{
                orgTree:[],
                treeProps:{
                    label:"name",
                    children:"children"
                },
                loading:false,
                searchName:"",
                userData:[],
                prefixName:[],
                orgTreeExpandedKeys:[],

            }
        },
        mounted(){
            this.getOrgTreeListData();
        },
        methods:{
            handleQuery(){
                this.getUserListData();
            },
            handleNodeClick(data,node){
                if(!this.loading){
                    this.orgSid=data.sid;
                    this.orgPrefixId=data.prefixId;
                    this.getUserListData();
                    this.prefixName=data.prefixName.split("/");
                }
            },
            async getOrgTreeListData(){
                await JZY.xhr.post('/sys/organization/queryTree',{},{alertSuccess:false}).then((resultData)=>{
                    try{
                        this.orgTree=resultData;
                        this.orgSid=resultData[0].sid;
                        this.orgPrefixId=resultData[0].prefixId;
                        this.orgTreeExpandedKeys=[resultData[0].nodeId];
                        this.getUserListData();
                        this.prefixName=resultData[0].prefixName.split("/");
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            async getUserListData(){
                let jobStatus=5;  //1表示不包含离职、兼职；2表示包含离职；3表示包含兼职；4表示两者都包含 5表示在职兼职不含未确认
                this.loading=true;
                let pas={organizationId:this.orgSid,
                    prefixId:this.orgPrefixId,
                    queryCondition:this.searchName,
                    status:jobStatus,
                    pageNum:1,
                    pageCount:1000};
                // console.log(JSON.stringify(pas))
                await JZY.xhr.post('/sys/user/getUserList',pas,{alertSuccess:false}).then((resultData)=>{
                    // console.log("getUserListMain:"+JSON.stringify(resultData))
                    this.loading=false;
                    try{
                        this.userData=resultData[0].list || [];
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.loading=false;
                })
            },
        }
    }
</script>

<style  lang="scss">
  .phoneList{
      overflow: hidden;
      .phoneTree{
          padding: 16px 24px;
          height: 100%;
          h3{
              margin: 0;
              line-height: 48px;
              font-size: 14px;
              font-weight: normal;
              color: $theme-black-title;
          }
          .custom-tree-node{
              width: 100%;
              /*font-size: 13px;*/
              /*.custom-name{*/
                  /*!*margin-right: 80px;*!*/
                  /*white-space:nowrap;*/
                  /*width: 100%;*/
                  /*overflow: auto;*/
                /*}*/
              .opera{
                  /*float: right;*/
                  padding-left: 50px;
                  /*margin-left: 50px;*/
              }
          }
      }
      .phoneListRight{
          padding: 15px 0 0 24px;
          height: 100%;
          overflow: auto;
          border-left: 1px solid $theme-grey-input-border;
          .searchInput{
              margin: 0 24px 15px 0;
              width: 240px;
              display: inline-block;
          }
      }
      .el-table{
          .operation{
              color: #409EFF;
              cursor:pointer;
              margin-right: 5px;
          }
          .icon_yuan {
              width: 18px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              border-radius: 50%;
              display: inline-block;
              color: #fff;
              margin: 0 10px;
              &.bg_0 {
                  background-color: #f00; //红
              }
              &.bg_1 {
                  background-color: #46a7ff; //蓝
              }
          }
          .no_confirmed_css{
              color:rgb(188, 188, 188);
          }
      }
      .el-tree{
          width: 100%;
          overflow: auto;
          /*height: calc(100% - 40px);*/
          height: 100%;
          white-space:nowrap

      }
      .el-tree>.el-tree-node{
          display: inline-block !important;
      }
      .el-tree-node__content{
          height: 36px;
      }
  }

</style>