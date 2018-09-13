<style lang="less" scoped>
  .list {
    padding: 0 10px;
    line-height: 25px;
    & .item {
      padding-bottom: 10px;
    }
  }
</style>

<template>
  <div class="list">
    <div class="item">
      <div>标题</div>
      <div>
        <input 
          id=""
          name="" 
          type="text" 
          :value="extInfo.title"
          @input="updateExtInfoTitle"
        >
      </div>
    </div>
    <div>
      <div>描述</div>
      <div>
        <textarea name="" id="" cols="30" rows="10"
          :value="extInfo.description"
          @input="updateExtInfoDescription"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormEditor',
  data() {
    return {
    };
  },
  computed: {
    extInfo() {
      return this.$store.state.customForm.extInfo;
    }
  },
  methods: {
    updateExtInfoTitle(event) {
      this.$store.commit({
       type: 'customForm/UPDATE_EXT_INFO', 
       key: 'title',
       value: event.target.value
      });
    },
    updateExtInfoDescription(event) {
      this.$store.commit({
       type: 'customForm/UPDATE_EXT_INFO', 
       key: 'description',
       value: event.target.value
      });
    },
  }
};
</script>
