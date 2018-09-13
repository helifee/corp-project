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

<template>
  <div class="wrapper" :style="labelDisplay('wrapper')">
    <label 
      v-if="deviceType=='pc'"
      :style="labelDisplay('label')"
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
      <el-date-picker
        v-if="isDesign"
        readonly
        :value="property.defaultValue"
        :placeholder="property.placeholder"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy 年 MM 月 dd 日">
      </el-date-picker>
      <el-date-picker
        v-if="isInstance && this.formMode != 'draft'"
        type="date"
        :readonly="isReadOnly"
        v-model="value"
        @input="updatePropertyData"
        :placeholder="property.placeholder"
        value-format="yyyy-MM-dd"
        :style="styleIsRequired"
        format="yyyy 年 MM 月 dd 日">
      </el-date-picker>
      <el-date-picker
        v-if="isPreview || this.formMode == 'draft'"
        class="preview"
        :value="property.value"
        :style="dimension"
        :readonly="true"
        value-format="yyyy-MM-dd"
        format="yyyy 年 MM 月 dd 日">
      </el-date-picker>
    </div>
    <!-- 移动端 -->
    <datetime
      v-if="deviceType=='mobile' && isInstance && this.formMode != 'draft'"
      format="YYYY-MM-DD"
      :title="property.label"
      :required="property.isRequired"
       v-model="value"
      @on-change="updatePropertyData"
      :style="styleIsRequired"
      :placeholder="property.placeholder">
    </datetime>
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
import {XInput, Cell,Datetime} from 'vux';

export default {
  name: 'StdSingleDate',
  components: {
     XInput,
     Datetime,
     Cell
  },
  props: [
    'property', 'isDesign', 'isInstance', 'isPreview', 'isReadOnly', 'formMode',
    'deviceType'
  ],
  data() {
    return {
      wdgId: this.property.wdgId,
      value: this.property.value || '',
      validation: true,
    };
  },
  methods: {
    save() {
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
      // this.value = sysUtils.filterSpecStr(this.value);
      // let strDate = this.value;
      // if (typeof(this.value) == 'object') {
      //   strDate = moment(this.value).format("YYYY-MM-DD");
      // } 
      this.$store.commit({
       type: 'customForm/UPDATE_PROPERTY_DATA',
       wdgId: this.property.wdgId,
       key: 'value',
       value: this.value 
      });
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
    styleIsRequired() {
      return this.validation? {'border': 0} : {'border': '1px solid red'}
    }
  },
};
</script>
