<style lang="less" scoped>
.header {
  display: flex;
  flex-direction: row;
  & .header-left {
    width: 50%;
    padding: 10px;
  }
  & .header-right {
    text-align: right;
    width: 50%;
    padding: 10px;
  }
}
</style>

<template>
  <div class="header">
    <div class="header-left">
      表单设计器
    </div>
    <div class="header-right">
      <!-- <el-button
        plain
        size="small"
        @click="save($event)"
      >保存</el-button>
      <el-button plain size="small">预览</el-button> -->
    </div>
  </div>
</template>

<script>
import sys from '../utils/sys';

export default {
  name: 'TopHeader',
  data() {
    return {
      propertyData: this.$store.state.propertyData,
    };
  },
  props: ['flowTemplateCode'],
  methods: {
    save: function( event = '') {
      event && event.preventDefault();
      this.$store.dispatch('customForm/saveModelData', this.flowTemplateCode)
      .then((res) => {
        sys.notify(res, this);
      });
    },
  }
};
</script>
