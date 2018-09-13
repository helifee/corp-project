<style lang='less' scoped>
  body {
    margin: 0;
    padding: 0;
    & .form-container {
      min-height: 400px;
      /*box-shadow: 1px 1px 6px;*/
      background-color: #fff;
      min-width: 300px;
      width: auto;
    }

    & .grid-content {
      border-radius: 1px;
      min-height: 400px;
    }

  }
</style>

<template>
  <div class="grid-content">
    <form-container
      class="form-container"
      editType="look"
      :businessId="businessId"
      :isReject="isReject"
      :deviceType='deviceType'
      ></form-container>
  </div>
</template>

<script>
import FormContainer from './view/FormContainer';
import sys from './utils/sys';

export default {
  name: 'FormPreview',
  components: {
    FormContainer,
  },
  props: ['businessId', 'customFormId', 'isReject'],
  created() {
    this.$store.commit({
      type: 'customForm/INIT_FORM_MODE',
      formMode: 'preview',
    });
  },
  mounted() {
    let businessId = this.businessId || '';
    let customFormId = this.customFormId || '';
    if (businessId != '') {
      this.$store.dispatch('customForm/getValueDataWithModel', {businessId, customFormId})
      .then((res) => {
        // sys.notify(res, this);
        this.$store.commit('customForm/IMPORT_ALL_DATA', {res});
      });
    }
  },
  computed: {
    deviceType() {
      return sys.getDeviceType();
    }
  }
};
</script>
