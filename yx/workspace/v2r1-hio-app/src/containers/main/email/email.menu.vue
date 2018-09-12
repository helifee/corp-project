<template>
<div class="emailMenu">
  <el-row  class="line">
    <el-col :span="22" :offset="1">
      <el-select v-model="curEmail">
        <el-option
          v-for="item in emailValue"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
    </el-col>
  </el-row>

  <el-row >
    <el-col :span="16" :offset="4">
      <el-button type="primary" icon="el-icon-plus" class="btnWrite" @click="writeEmail">{{l('{emailLocale.menu.compose}')}}</el-button>
    </el-col>
  </el-row>

  <el-menu  class="menuList" :router="true" :default-openeds="openeds" >
    <el-submenu index="/email/id">
      <template slot="title">
        <i class="el-icon-message iconColor" ></i>
        <span>{{l('{emailLocale.menu.email}')}}</span>
      </template>
      <div class="menuItem">
        <el-menu-item index="/email/inbox/id">{{l('{emailLocale.menu.inbox}')}}（3）</el-menu-item>
        <el-menu-item index="/email/outbox/id">{{l('{emailLocale.menu.outbox}')}}</el-menu-item>
        <el-menu-item index="/email/stars/id">{{l('{emailLocale.menu.starsBox}')}}（5）</el-menu-item>
        <el-menu-item index="/email/drafts/id">{{l('{emailLocale.menu.drafts}')}}（15）</el-menu-item>
        <el-menu-item index="/email/deleted/id">{{l('{emailLocale.menu.deletedBox}')}}</el-menu-item>
        <el-menu-item index="/email/junk/id">{{l('{emailLocale.menu.junk}')}}</el-menu-item>
      </div>
    </el-submenu>
    <el-menu-item index="/email/setting">
      <i class="el-icon-setting iconColor" ></i>
      <span slot="title">{{l('{emailLocale.menu.setting}')}}</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
    export default {
      data(){
          return{
            emailValue: [{
              value: 'yangfan@sina.com',
              label: 'yangfan@sina.com'
            }, {
              value: 'yangfan@xinyuan.com',
              label: 'yangfan@xinyuan.com'
            }, {
              value: 'yangfan@163.com',
              label: 'yangfan@163.com'
            }, {
              value: 'yangfan@162.com',
              label: 'yangfan@162.com'
            }],
            curEmail:"yangfan@sina.com",
            openeds:['/email/id']
          }
      },
      methods: {
        // handleOpen(key, keyPath) {
        //   // console.log(this.$router.currentRoute.path)
        // },
        // handleClose(key, keyPath){
        //   // this.$router.push({ name: 'task'})
        //   // this.$router.go(1);
        // }
          writeEmail(){
              console.log("test")
              this.$router.push({ path: '/email/edit'})
              this.$router.go(1);
          }
      },
    }
</script>

<style  lang="scss">
  .emailMenu{
    padding-top: 10px;
    .iconColor{
      color: rgb(64, 158, 255);
    }
    .menuItem{
      padding-left: 13px;
    }
    .btnWrite{
      width: 100%;
    }
    .line{
      border-bottom: 1px solid #ebeef5;
      padding-bottom: 10px;
    }
    .el-row {
      margin-bottom: 10px;
    }
    .el-input__inner{
      border: 0;
    }
  }

</style>
