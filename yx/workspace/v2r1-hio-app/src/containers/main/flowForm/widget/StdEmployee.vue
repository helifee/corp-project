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
        :placeholder="mixedPlaceHolder"
        >
      </el-input>
      <el-input 
        v-if="isInstance && this.formMode != 'draft'"
        :readonly="property.isReadOnly"
        v-model="value"
        :maxlength="property.maxLength || 200"
        @input="updatePropertyData"
        :style="validation? {'border': 0} : {'border': '1px solid red'}"
        :placeholder="mixedPlaceHolder"
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
      :required="property.isRequired"
      v-model="value"
      :title="property.label"
      @on-enter="updatePropertyData"
      @on-change="updatePropertyData"
      :style="validation? {'border': 0} : {'border': '1px solid red'}"
      :max="property.maxLength || 200"
      :placeholder="mixedPlaceHolder"
    >
    </x-input>
    <!-- preview 模式 ，不可编辑, 不能用input，改为cell -->
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
  name: 'StdEmployee',
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
      this.validation = this.validBeforeSave();
      return this.validation;
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
      this.value = sysUtils.cleanFaceEmoji(this.value);

      let maxLength = typeof(this.property.maxLength) == 'string'? 1 * this.property.maxLength : this.property.maxLength;
      let valid = wdgUtils.validMaxLength(this.value, maxLength);
      if(!valid.status) {
        this.$alert(`输入字符长度应小于等于${maxLength}`);
        return false;

      } else {
        this.$store.commit({
        type: 'customForm/UPDATE_PROPERTY_DATA',
        wdgId: this.property.wdgId,
        key: 'value',
        value: this.value.substring(0, maxLength)
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
    mixedPlaceHolder() {
      if (this.property.maxLength >= 0) {
        return `最长可输入${this.property.maxLength}字符` 
      } else {
        return `最长可输入200字符` 
      }
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
