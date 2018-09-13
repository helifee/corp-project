<template>
  <div>
    <form-design
      v-if="formMode == 'design'"
      ref="design"
      :flowTemplateCode="flowTemplateCode"
      :formMode='formMode'
      >
    </form-design>
    <form-instance
      v-if="formMode == 'instance' || formMode == 'duplication' || formMode == 'reInstance' || formMode == 'rePreview' || formMode == 'draft'"
      ref="instance"
      @cb-client-saved="cbClientSaved"
      :flowTemplateCode="flowTemplateCode"
      :businessId="businessId"
      :instanceId="instanceId"
      :customFormId="customFormId"
      :formMode='formMode'
      >
    </form-instance>
    <form-preview
      v-if="formMode == 'preview'"
      :businessId="businessId"
      :customFormId="customFormId"
      :formMode='formMode'
      >
    </form-preview>
  </div>
</template>

<script>
import FormDesign from './FormDesign';
import FormInstance from './FormInstance';
import FormPreview from './FormPreview';

export default {
  components: {
    FormDesign,
    FormInstance,
    FormPreview,
  },
  props: ['formMode', 'flowTemplateCode' , 'businessId', 'customFormId', 'instanceId'],
  watch: {
    flowTemplateCode: function (newVal, oldVal) {
      // 通过模型是否改变，激活实例的初始化方法
      let businessId = this.businessId || '';
      let customFormId = this.customFormId || '';
      let flowTemplateCode = newVal || '';
      let param = {
        businessId,
        customFormId,
        flowTemplateCode,
      };
      switch (this.formMode) {
        case 'draft':
        case 'rePreview':
        case 'reInstance':
        case 'instance':
          this.$refs.instance.initData(param);
          break;
      }
    },
    businessId: function (val, old) {
    },
    customFormId: function (val, old) {
    },
    instanceId: function (val, old) {
    }
  }, 
  methods:{
    //调用instance组件，表单保存事件
    async saveInstanceForm(){
      let res =  await this.$refs.instance.save();
      return res;
    },
    async fetchBusinessData(){
      let res =  await this.$refs.instance.fetchBusinessData();
      return res;
    },
    async submitInstanceForm(){
      let res =  await this.$refs.instance.submit();
      return res;
    },
    cbClientSaved(data) {
      this.$emit('cb-flow-form-instance-saved', data);
    }
  },
  mounted(){
    console.info(this.formMode)
    console.info(this._customFormId)
    console.info(this._flowTemplateCode)
    console.info(this._businessId)
    console.info(this._instanceId)
  },
}
</script>
