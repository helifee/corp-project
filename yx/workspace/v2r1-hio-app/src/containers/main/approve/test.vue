<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first"></el-tab-pane>
    <el-tab-pane label="配置管理" name="second"></el-tab-pane>
    <el-tab-pane label="角色管理" name="third"></el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
  </el-tabs>
  <div class="cc" v-if="tabType == 0" style="width:300px;height:300px;background-color:#990">
    0
  </div>
  <div v-if="tabType == 1">1</div>
  <div v-if="tabType == 2">2</div>
  <div v-if="tabType == 3">3</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        tabType:0
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        console.log(tab.index)
        this.tabType = tab.index;
      }
    }
  };
</script>