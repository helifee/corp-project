<style lang='less' scoped>
  body {
    margin: 0;
    padding: 0;
    & .form-container {
      background-color: #fff;
      min-width: 300px;
    }

    & .container-wrapper {
      border-radius: 1px;
    }
  }
</style>

<template>
  <div class="container-wrapper">
    <form-container
      class="form-container"
      ref="refFormContainer"
      @cb-form-instance-saved="cbFormInstanceSaved"
      :editType="editType"
      :businessId="businessId"
      :formMode='formMode'
      :deviceType='deviceType'
      ></form-container>
  </div>
</template>

<script>
import FormContainer from './view/FormContainer';
import sysUtils from './utils/sys';
import domUtils from './utils/dom';

export default {
  name: 'FormInstance',
  components: {
    FormContainer,
  },
  props: ['formMode', 'businessId', 'customFormId', 'instanceId', 'flowTemplateCode'],
  data() {
    return {
    };
  },
  created() {
    this.$store.commit({
      type: 'customForm/INIT_FORM_MODE',
      formMode: this.formMode,
    });
  },
  computed: {
    editType() {
      // 自定义表单与合同表单，模式对应关系
      let MAPPING_EDIT_TYPE = {
        'add': 'add',
        'design': 'design',
        'draft': 'look',
        'preview': 'look',
        'rePreview': 'reLook',
        'duplication': 'reLook',
        'instance': 'edit',
        'reInstance': 'reEdit',
      };

      let mappingState = MAPPING_EDIT_TYPE[this.formMode];
      if (null == this.instanceId && this.formMode != 'design') {
        // preview the custom form model
        // if the instanceId var is null, then mapp
        mappingState = MAPPING_EDIT_TYPE['add'];

      } else if (this.instanceId == '' && this.formMode != 'design') {
        mappingState = MAPPING_EDIT_TYPE['add'];
      }

      return mappingState;
      // return (MAPPING_EDIT_TYPE[this.formMode])? MAPPING_EDIT_TYPE[this.formMode] : 'look';
    },
    deviceType() {
      return sysUtils.getDeviceType();
    }
  },
  mounted() {
    let businessId = this.businessId || '';
    let customFormId = this.customFormId || '';
    let flowTemplateCode = this.flowTemplateCode || '';
    this.initData({
      businessId,
      customFormId,
      flowTemplateCode,
    });
  },
  methods: {
    initData(param) {
      let businessId = param.businessId || '';
      let customFormId = param.customFormId || '';
      let flowTemplateCode = param.flowTemplateCode || '';

      if (businessId == '' && flowTemplateCode != '') {
        this.$store.dispatch('customForm/getModelData', flowTemplateCode).then((res) => {
          this.$store.commit('customForm/IMPORT_MODEL_DATA', {res});
        });

      } else if ( businessId != '') {
        this.$store.dispatch('customForm/getValueDataWithModel', {businessId, customFormId})
        .then((res) => {
          this.$store.commit('customForm/IMPORT_ALL_DATA', {res});
        });
      }
    },
    saveModel() {
      // 保存模型数据
      if (this.flowTemplateCode) {
        return this.$refs.refFormContainer.saveModel(this.flowTemplateCode);
      }
    },
    save() {
      // 用作无校验的保存
      return this.$refs.refFormContainer.save('value');
    },
    submit() {
      // 用作有校验的保存
      return this.$refs.refFormContainer.save('value');
    },
    fetchBusinessData() {
      // 主动激活（获取）businessData
      return this.$refs.refFormContainer.fetchBusinessData();
    },
    cbFormInstanceSaved (data) {
      // 来自于子组件的回调
      this.$emit('cb-client-saved', data);
    }
  }
};
</script>
