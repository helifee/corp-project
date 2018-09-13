<template>
  <div class="wrapper" :style="labelDisplay('wrapper')">
    <label 
      v-if="deviceType=='pc'"
      :style="[labelDisplay('label'), isHiddenLabel]"
    >
      <span
        :style="[isRequired, isFlowVar]"
      >*</span>
      {{property.label}}:
    </label>
    <div
      v-if="deviceType=='pc'"
      :style="dimension"
    >
      <el-input 
        v-if="isDesign"
        :readonly="property.isReadOnly"
        :value="property.defaultValue"
        :placeholder="property.placeholder"
        >
      </el-input>
      <el-input 
        v-if="isInstance && this.formMode != 'draft'"
        :readonly="property.isReadOnly"
        v-model.number="value"
        @input="updatePropertyData"
        :style="styleIsRequired"
        :placeholder="property.placeholder"
        >
      </el-input>
      <span
        v-if="isPreview || this.formMode == 'draft'"
        class="preview"
        :style="dimension"
        >
        {{property.value}}
      </span>
    </div>
    <!-- 移动端 -->
    <x-input
      v-if="deviceType=='mobile' && isInstance && this.formMode != 'draft'"
      v-model='value'
      :required="property.isRequired"
      :title="property.label"
      :min="0"
      :max="property.maxLength"
      type="number"
      width="100px"
      @on-enter="updatePropertyData"
      @on-change="updatePropertyData"
      :style="styleIsRequired"
      :placeholder="property.placeholder"
    >
    </x-input>
    <!-- preview 模式 ，不可编辑不能用input，改为cell -->
    <cell 
      v-if="deviceType=='mobile' && isPreview"
      :required="property.isRequired"
      :title="property.label" 
      :value="value"
      >
    </cell>
  </div>
</template>

<script>
import store from '../store/index';
import wdgUtils from '../utils/wdg';
import sysUtils from '../utils/sys';
import {XInput, Cell} from 'vux';

export default {
  name: 'StdMoney',
  components: {
     XInput,
     Cell
  },
  props: [
    'property', 'isDesign', 'isInstance', 'isPreview', 'isReadOnly', 'formMode',
    'deviceType'
  ],
  data() {
    return {
      wdgId: this.property.wdgId,
      // value: this.$store.state.customForm.propertyData? this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId]['value'] : '',
      value: this.property.value || '',
      validation: true,
    };
  },
  methods: {
    save() {
      let vali = this.validBeforeSave();
      return this.validation = vali;
    },
    labelDisplay(className) {
      return wdgUtils.labelDisplay(this.property, className);
    },
    validBeforeSave() {
      if (this.property.isRequired) {
        return wdgUtils.validIsRequired(this.value);
      } else {
        return true;
      }
    },
    updatePropertyData() {
      this.value = sysUtils.filterSpecStr(this.value);

      let maxLength = typeof(this.property.maxLength) == 'string'? 1 * this.property.maxLength : this.property.maxLength;
      let valid = wdgUtils.validMaxLength(this.value, maxLength);
      if(!valid.status) {
        this.$alert(`输入数字应小于等于${maxLength}`);
        return false;

      } else {
        this.$store.commit({
          type: 'customForm/UPDATE_PROPERTY_DATA',
          wdgId: this.property.wdgId,
          key: 'value',
          value: valid.value.toFixed(2)
        });
      }
    },
  },
  computed: {
    dimension() {
      return wdgUtils.dimension(this.property);
    },
    isRequired() {
      return wdgUtils.isRequired(this.property);
    },
    isFlowVar() {
      return wdgUtils.isFlowVar(this.property);
    },
    isHiddenLabel() {
      return wdgUtils.isHiddenLabel(this.property);
    },
    styleIsRequired() {
      return this.validation? {'border': 0} : {'border': '1px solid red'}
    }
  },
};
</script>

<style lang="less" scoped>
  @import url('../assets/style/theme.define.less');
  div.wrapper {
    // padding: 10px 0 0px 10px;
    padding: 0;
    font: 12px/40px "Microsoft YaHei";
    color: #000;
    & label {
      min-width: 80px;
      padding-right: 20px;
    }
    input {
      width: 100%;
      .def-wdg-input-text(32px);
    }
    .preview {
      line-height: 40px;
    }
  }
</style>
