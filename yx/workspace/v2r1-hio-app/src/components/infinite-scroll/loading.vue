<template>
  <div class="nsr-loading-center">
    <i class="el-icon-loading"
    :class="{'nsr-loading-hiden': hideLoading}"></i>
  </div>
</template>

<script>
export default {
  props: {
    hideLoading: {
      // default: true
    },
    isEndText: {
      // default: ''
    }
  },
}
</script>

<style>
.nsr-loading-center {
  text-align: center;
  margin: 0px auto;
  color: #505050;
  font-size: 22px;
}
.nsr-loading-hiden {
  display: none;
}
</style>
