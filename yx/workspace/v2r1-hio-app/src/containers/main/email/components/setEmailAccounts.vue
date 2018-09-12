<template>
    <div class="email_set_wrap">
        <el-form :model="form" :rules="rules" ref="myForm" label-width="150px">
            <el-form-item prop="selectedEmail" label="选择邮箱类型">
                <el-select v-model="form.selectedEmail" placeholder="请选择"
                  @change="changedEmail"
                >
                    <el-option
                      v-for="item in allSupportedEmails"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                </el-select>
                <el-button v-if="form.sid != ''" 
                  @click="unbindAccount()"
                > 解绑 </el-button>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input 
                    ref="ref_account"
                    :readonly="form.sid != ''"
                    :disabled="form.sid != ''"
                    v-model="form.account" placeholder="请输入邮箱账号">
                    <template v-if="form.selectedEmail" slot="append">@{{form.selectedEmail}}</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="pwd" label="密码" >
                <el-input 
                    :readonly="form.sid != ''"
                    :disabled="form.sid != ''"
                    ref="ref_password" v-model="form.pwd" type="password" placeholder="请输入邮箱密码">
                </el-input>
            </el-form-item>
            <div style="text-align:right">
                <el-button 
                  :disabled="form.sid != ''"
                  type="primary" 
                  size="small" 
                  @click="save">绑定</el-button>
            </div>
        </el-form>
    </div>
</template>
<style>
</style>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: "setEmailAccounts",
  props: ['emailAccounts'],
  methods: {
    changedEmail(value) {
      const accounts = this.emailAccounts[0];
      for (let i=0; i<accounts.length; i++) {
        let mbox = accounts[i];
        if (mbox.account.indexOf(value) > -1) {
          this.form.account = mbox.account.split('@')[0];
          if (this.form.account != '') {
            this.form.sid = mbox.sid;
            this.form.pwd = mbox.password;
          } else {
            this.form.sid = '';
            this.form.pwd = '';
          }
          break;
        } else {
          this.form.sid = '';
          this.form.pwd = '';
          this.form.account = '';
        }
      }
    },
    unbindAccount() {
      let sid = this.form.sid;
      let prefixAccount = this.form.account && this.form.account.split('@')[0] || '';
      let account = `${prefixAccount}@${this.form.selectedEmail}`;
      if (sid) {
        let url= JZY.xhr.transformUrl('/unbind-account.php','GLOBAL.EMAIL',false);
        let header = JZY.c.AUTO_LOGIN.headers;
        let param = qs.stringify({'id': sid, 'u': account, 't': header.authorization});
        axios.post(url, param).then((res) => {
          this.form.sid = '';
          this.form.account = '';
          this.form.pwd = '';
        });
      }
    },
    save() {
      this.$refs.myForm.validate(res => {
        if (res) {
          if (!this.form.account) return false;
          let prefixAccount = this.form.account && this.form.account.split('@')[0] || '';
          let account = `${prefixAccount}@${this.form.selectedEmail}`;
          let password = this.form.pwd;
          let sid = this.form.sid;

          // Save or Update the userinfo on the email server
          let url= JZY.xhr.transformUrl('/bind-account.php','GLOBAL.EMAIL',false);
          let header = JZY.c.AUTO_LOGIN.headers;
          let param = qs.stringify({'id': sid, 'u': account, 'p': password, 't': header.authorization});
          axios.post(url, param).then((res) => {
            if (res.data && res.data.result) {
              this.form.sid = res.data.result;
              this.$emit('closeEmailAccountsSetting');
            }
          });
        }
      });
    }
  },
  data() {
    return {
      rules: {
        selectedEmail: [
          { required: true, message: "请选择邮箱类型", trigger: "change" }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { required: true, message: "请输入账号", trigger: "change" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "change" }
        ]
      },
      form: {
        selectedEmail: "",
        account: "",
        pwd: "",
        sid: ''
      },
      // selectedEmail:'',
      allSupportedEmails: [
        { name: "hio.com" },
        { name: "xyre.com" },
        { name: "126.com" },
        { name: "163.com" },
        { name: "sina.com" },
        { name: "qq.com" },
      ],
      data: [
        {
          a: "sdfsdf",
          isVisible: false
        }
      ]
    };
  },

  beforeDestroy() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped>
  .email_set_wrap{
    .el-dialog .el-dialog__body{
      overflow: hidden;
    }
    .el-input{
      width: 250px;
    }
  }
</style>
