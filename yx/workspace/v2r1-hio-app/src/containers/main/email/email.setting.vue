<template>
    <div class="emailsetting">
      <el-alert class="topalert" :title="l('{emailLocale.setting.setHint}')"  type="warning" show-icon :closable="false"></el-alert>

      <el-table  :data="tableData"  :header-cell-class-name="tableHeaderCell"  style="width:780px">
        <el-table-column type="index" :label="l('{emailLocale.setting.order}')"  width="100" ></el-table-column>
        <el-table-column prop="account"  :label="l('{emailLocale.setting.account}')"  width="300"></el-table-column>
        <el-table-column   :label="l('{emailLocale.setting.operation}')"  width="380" >
          <template  slot-scope="scope" >
            <span @click="handleEdit(scope.$index, scope.row)" class="operation">{{l('{emailLocale.setting.edit}')}}</span>
            <span @click="handleEdit(scope.$index, scope.row)" class="operation">{{l('{emailLocale.setting.del}')}}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" icon="el-icon-plus" size="small" class="btnAdd" @click="addSet">{{l('{emailLocale.setting.addAccount}')}}</el-button>

      <!--<el-dialog title="收货地址" :visible.sync="dialogFormVisible">-->
      <!--<emailSettingEdit :windialogFormVisible.sync="dialogFormVisible"></emailSettingEdit>-->
      <!--<div>sdsdfsdf</div>-->
      <!--</el-dialog>-->
      <div>
        <el-dialog title="新建账号" :visible.sync="dialogFormVisible" width="525px">
          <el-form :model="form"  label-position="left" size="mini">
            <el-form-item :label="l('{emailLocale.setting.email}')" :label-width="formLabelWidth">
              <el-input v-model="form.name"  ></el-input>
            </el-form-item>
            <el-form-item :label="l('{emailLocale.setting.pwd}')" :label-width="formLabelWidth">
              <el-input v-model="form.pwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="l('{emailLocale.setting.recType}')" :label-width="formLabelWidth">
              <el-select v-model="form.serverType" >
                <el-option label="POP3" value="POP3"></el-option>
                <el-option label="IMAP" value="IMAP"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">{{l('{emailLocale.setting.test}')}}</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">{{l('{emailLocale.setting.save}')}}</el-button>
          </div>
        </el-dialog>
      </div>


    </div>
</template>

<script>
    JZY.locale.add('emailLocale',require('./email.locale'));
   const data={
     account:"yangfan@sina.com"
   }
    export default {
        name: "emailSetting",
        components:{
          // emailSettingEdit
        },
        data(){
          return{
            tableData:Array(5).fill(data),
            dialogFormVisible:false,
            form: {
              name: '',
              serverType: 'POP3',
              pwd: ''
            },
            formLabelWidth: '120px'
          }
        },
        methods:{
          tableHeaderCell(){
            return "tableHeaderCell"
          },
          handleEdit(index, row){
            console.log(index, row);
            this.dialogFormVisible=true;
          },
          addSet(){
            this.dialogFormVisible=true;
            // console.log("执行数dialogFormVisible："+this.dialogFormVisible)
          }
        }

    }
</script>

<style  lang="scss">
.emailsetting{
  background: #ffffff;
  /*height: calc(100% - 60px);*/
  /*overflow: auto;*/
  /*position: absolute;*/
  /*width: 100%;*/
  .topalert{
    border: 1px solid #e6a23c;
    width: 464px;
    height: 32px;
    line-height: 32px;
    margin: 15px 10px;
    .el-alert__title{
      color:#333333;
    }
  }
  .el-table{
    text-align: center;
    margin: 15px 10px;
    .tableHeaderCell{
      border-top: 1px solid rgba(235, 235, 235, 1);
      border-bottom: 1px solid rgba(235, 235, 235, 1);
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.847058823529412);
      background-color: rgba(250, 250, 250, 1);
      font-weight: 600;
      font-size: 14px;
    }
    .operation{
      color: #409EFF;
      cursor:pointer;
      padding-right: 10px;
    }
  }
  .btnAdd{
    margin: 15px 10px;
  }

}
</style>
