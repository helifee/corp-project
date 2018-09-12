<template>
  <div class="approve detail_edit">
    <!--页头-->
    <el-row class="goBackButtons">
        <el-col :span="22">
            您打开的审批流程id是：{{$route.params.id}}
        </el-col>
        <el-col :span="2">
            <el-button size="small" @click="goback">返回</el-button>
        </el-col>
    </el-row>
    <!--表单项-->
    <div class="detail_content">
        <div class="title">办公用品领用申请</div>
        <el-form ref="form" :model="form" class="formContent">
            <el-form-item label="主题：">
                <el-input v-model="form.approveName" placeholder="主题" clearable></el-input>
            </el-form-item>
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item label="领用人：">
                        <el-input v-model="form.applicant" class="" placeholder="领用人"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item label="经办人：">
                        <el-input v-model="form.operater" class="" placeholder="经办人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办部门：">
                        <el-input v-model="form.operateDept" class="" placeholder="经办部门"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--领用明细-->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>领用明细</span>
                <div class="table_buttons">
                    <el-button type="danger" size="small" v-on:click="handleDeleteAll">全部删除</el-button>
                    <el-button type="primary" size="small" v-on:click="handleAdd">新增</el-button>
                </div>
              </div>
              <el-table :data="tableData3" highlight-current-row height="250" border @cell-dblclick ="tdDblclick" class="table_list" :header-cell-style="{'text-align':'center'}">
                  <el-table-column label="日期"  prop="date">
                    <template slot-scope="scope">
                        <span v-if="!input[scope.$index]" >
                            {{scope.row.date}}
                        </span>
                        <el-input v-model="scope.row.date" v-if="input[scope.$index]">
                        </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="success"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
              </el-card>
        </el-form>
        <el-row class="approve_type">
            <el-col :span="12">
                <el-radio-group v-model="form.approveProccessType">
                    <el-row>
                        <el-col :span="12">
                            <el-radio label="自由流"></el-radio>
                            <div class="txt_tips">流程发起时需要制定审批人</div>
                        </el-col>
                        <el-col :span="12">
                            <el-radio label="使用流程模板"></el-radio>
                            <div class="txt_tips">使用流程模板发起审批流程</div>
                        </el-col>
                    </el-row>
                </el-radio-group>
            </el-col>
        </el-row>
        <div class="approveStep">
            <approve-step v-for="(item,index) in form.approveStepData" :data="item" :key="index"></approve-step>
        </div>
    </div>
</div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  import approveStep from './approve.step.vue'

  export default {
    components: {
      approveStep
    },
    data() {
      return {
        input:[],
        tableData3: [{
            id:'001',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            id:'002',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            id:'003',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            id:'004',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            id:'005',
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            id:'006',
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            id:'007',
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],

        form: {
          id:'',
          approveName: '打印纸领用申请',
          applicant:'杨帆',
          operater: '李四',
          operateDept: '集团/行政中心',
          approveProccessType: '自由流',
          approveStepData: [{
              stepName: '环节1',
              approveName: '审批',
              approveType:'竞争',
              status: '1',
              users: [{
                        userId:'200',
                        userName:'张三',
                        dept:'XX公司/财务部/',
                      },{
                        userId:'201',
                        userName:'李四',
                        dept:'XX公司/技术部/',
                      },{
                        userId:'202',
                        userName:'王五',
                        dept:'XX公司/运营中心/',
              }],
            },{
              stepName: '环节2',
              approveName: '会签',
              approveType:'并行',
              status: '0',
              users: [{
                    userId:'200',
                    userName:'张三',
                    dept:'XX公司/财务部/财务部/财务部/',
                  },{
                    userId:'201',
                    userName:'李四',
                    dept:'XX公司/技术部/',
                  },{
                    userId:'202',
                    userName:'王五',
                    dept:'XX公司/运营中心/',
                  }],
            },{
              stepName: '环节3',
              approveName: '校稿',
              approveType:'并行',
              status: '0',
              users: [{
                    userId:'200',
                    userName:'张三',
                    dept:'XX公司/财务部/',
                  },{
                    userId:'201',
                    userName:'李四',
                    dept:'XX公司/技术部/',
                  },{
                    userId:'202',
                    userName:'王五',
                    dept:'XX公司/运营中心/运营中心/运营中心/',
                  }],
            },{
              stepName: '环节4',
              approveName: '抄送',
              approveType:'',
              status: '0',
              users: [{
                    userId:'200',
                    userName:'张三',
                    dept:'XX公司/财务部/',
                  },{
                    userId:'201',
                    userName:'李四',
                    dept:'XX公司/技术部/',
                  },{
                    userId:'202',
                    userName:'王五',
                    dept:'XX公司/运营中心/',
                  }],
            }]
        },
      }
    },
    props: ['approveInfo'],
    methods: {
        goback (){
            this.$router.go(-1);
        },
        handleDeleteAll(){
            this.tableData3 = [];
        },
        handleAdd(){
            let randomId = Math.floor(Math.random()*1024);
            var _data ={
                id:randomId,
                date: 'xxx',
                name: '222',
                address: '上海市普陀区金沙江路 1518 弄'
            }
            this.tableData3.unshift(_data);
        },
        handleEdit(index, row) {//行编辑
            this.$message("编辑id为："+row.id+"的行");
        },
        handleDelete(index, row) {//行删除
            this.tableData3 = this.tableData3.filter((item)=>{
                return item.id !== row.id
            })
            this.$message("删除id为："+row.id+"的行");
        },
        tdDblclick(row, column, cell, event){//双击单元格事件
            console.info(row)
            console.info(column)
            console.info(cell)
            console.info(event)
            // this.input[index] = true;
            this.$message("双击单元格事件");
        },
    }
  }
</script>
<style lang="scss">
.approve.detail_edit{
  .el-form{
      .el-form-item{
          margin-bottom: 12px;
          .el-form-item__label{
              width: 100px;
          }
          .el-form-item__content{
              .el-input{
                  width: calc(100% - 120px);
              }
          }
      }
      .el-card__header{
          line-height:32px;
          background:#e4e4e4;
          padding: 10px 20px;
      }
  } 
  .el-radio-group{
      width: 100%;
  }
}
</style>
<style scoped lang="scss">
$color:#303133;
$borderColor:#dcdfe6;
.approve.detail{
    padding: 20px;
    position: relative;
    background: whitesmoke;
    .goBackButtons{
        width: 82.333%;
        position: fixed;
        top: 70px;
        right:0px;
        height:40px;
        line-height:40px;
        background-color:#e4e4e4;
        z-index:1;
    }
    .detail_content{
        margin-top: 30px;
        padding: 20px 30px;
        background-color: #fff;
        border:1px solid $borderColor;
        .title{
            text-align: center;
            font-size: 15px;
            line-height: 30px;
            padding-bottom:10px;
        }
        .formContent{
            padding: 40px 20px 20px;
            border:1px solid $borderColor;
            .table_buttons{
                float:right;
            }
            .table_list{
                text-align: center;
                .operate{
                    button{
                        margin-bottom: 8px;
                        float: right;
                        &:first-child{
                            margin-left: 4px;
                        }
                    }
                }

            }
        }
        .approve_type{
            padding: 25px;
            .txt_tips{
                font-size: 12px;
                color: #999;
                line-height: 1.5;
            }
        }
    }
}
</style>