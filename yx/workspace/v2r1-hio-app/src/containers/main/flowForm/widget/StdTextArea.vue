<style lang="less" scoped>
  div {
    padding: 0;
    font: 12px/40px "Microsoft YaHei";
    color: #000;
    & label {
      min-width: 80px;
      text-align: right;
      padding-right: 20px;
    }
    textarea {
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 0;
      padding: 2px;
    }
  }
</style>

<template>
  <div :style="labelDisplay('wrapper')">
    <label
      v-if="deviceType == 'pc' "
      :style="[labelDisplay('label'), isHiddenLabel]"
    >
      <span
        :style="[isRequired, isFlowVar]"
      >*</span>
      {{ property.label }}:
    </label>
    <div
      v-if="deviceType=='pc'"
      :style="dimension"
    >
      <el-input 
        v-if="isDesign"
        type="textarea"
        :readonly="property.isReadOnly"
        :value="property.defaultValue"
        :placeholder="mixedPlaceHolder"
        >
      </el-input>
      <el-input 
        v-if="isInstance && this.formMode != 'draft'"
        :readonly="property.isReadOnly"
        v-model="value"
        type="textarea"
        :maxlength="property.maxLength || 200"
        @input="updatePropertyData"
        :style="[styleIsRequired]"
        :placeholder="mixedPlaceHolder"
        >
      </el-input>
      <pre 
        v-if="isPreview || this.formMode == 'draft'"
      >{{property.value}}</pre>
    </div>

    <!-- 移动端 -->
    <x-textarea
      v-if="deviceType == 'mobile' && isInstance && this.formMode != 'draft'"
      :required="property.isRequired"
      v-model="value"
      :title="property.label"
      @on-change="updatePropertyData"
      :max="property.maxLength || 200"
      :style="styleIsRequired"
      :placeholder="property.placeholder"
    >
    </x-textarea>
    <cell
      v-if="deviceType=='mobile' && isPreview"
      :required="property.isRequired"
      :title="property.label"
      :value="value"
    >
    </cell>
    <!--<p v-if="deviceType == 'mobile' && isPreview"><label>{{property.label}}</label><span>{{value}}</span></p>-->
  </div>
</template>

<script>
import store from '../store/index';
import wdgUtils from '../utils/wdg';
import sysUtils from '../utils/sys';
import {XTextarea,Cell} from 'vux';

export default {
  name: 'StdTextArea',
  components: {
     XTextarea,Cell
  },
  props: [
    'property', 'isDesign', 'isInstance', 'isPreview', 'formMode',
    'deviceType'
  ],
  data() {
    return {
      item: this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId],
      wdgId: this.property.wdgId,
      value: this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId].value,
      validation: true,
    };
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
    },
    styleIsRequired() {
      return this.validation? {'border': 0} : {'border': '1px solid red'}
    }
  },
  methods: {
    save(){
      this.validation = this.validBeforeSave();
      return this.validation; 
    },
    validBeforeSave() {
      if (this.property.isRequired) {
        return wdgUtils.validIsRequired(this.value);
      } else {
        return true;
      }
    },
    labelDisplay(className) {
      return wdgUtils.labelDisplay(this.property, className);
    },
    updatePropertyData() {
      this.value = sysUtils.filterSpecStr(this.value);
      this.value = sysUtils.cleanFaceEmoji(this.value);

      this.$store.commit({
       type: 'customForm/UPDATE_PROPERTY_DATA', 
       wdgId: this.property.wdgId,
       key: 'value',
       value: this.value
      });
    }
  }
};
</script>
