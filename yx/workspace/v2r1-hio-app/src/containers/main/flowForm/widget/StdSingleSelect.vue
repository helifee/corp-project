<style lang="less" scoped>
  @import url('../assets/style/theme.define.less');
  div.wrapper {
    padding: 0;
    font: 12px/40px "Microsoft YaHei";
    color: #000;
    & > label {
      min-width: 80px;
      padding-right: 20px;
    }
  }
  div.widget-item {
    position: relative;
    display: inline-flex;
    label.widget-title {
      text-align: right;
      width: 60px;
    }
  }
  .w100 {
    width: 100%;
  }
</style>

<template>
  <div class="wrapper" :style="labelDisplay('wrapper')">
    <label 
      v-if="isPc"
      :style="[labelDisplay('label'), isHiddenLabel]"
    >
      <span
        :style="[isRequired, isFlowVar]"
      >*</span>
      {{property.label}}:
    </label>
    <div v-if="isPc && isDesign" 
    >
      <el-radio
        disabled
        v-if="property.options.length == 0"
        value=""
        label=""
      > 
      </el-radio> 
      <el-radio
        disabled
        v-else
        v-model="selected" 
        :readonly="property.isReadOnly"
        v-for="item in property.options"
        :key="item.value"
        :value="item.value"
        :label="item.text"
        :style="styleEllipsis"
        :title="item.text"
      > 
      </el-radio> 
    </div>
    <div 
      v-if="isPc && isInstance && this.formMode != 'draft'" 
      :style="styleIsRequired"
      >
      <el-radio
        v-model="selected" 
        :readonly="property.isReadOnly"
        v-for="item in property.options"
        :key="item.value"
        :value="item.value"
        :label="item.text"
        @change="updatePropertyData"
        :style="styleEllipsis"
        :title="item.text"
      > 
      </el-radio> 
    </div>
    <div 
      v-if="isPc && (isPreview || this.formMode == 'draft')" >
      <el-radio
        disabled
        v-model="property.value" 
        v-for="item in property.options"
        :key="item.value"
        :value="item.value"
        :label="item.text"
        :title="item.text"
        :style="styleEllipsis"
      > 
      </el-radio> 
    </div>
    <radio
      v-if="isMobile && isInstance && this.formMode != 'draft'"
      :required="property.isRequired"
      :value="mobileSelectedLabel"
      :options="mobileOptions"
      :title="property.label"
      :style="styleEllipsis"
      @on-change="updatePropertyData"
    >
    </radio>
    <radio
      v-if="isMobile && isPreview"
      disabled
      :required="property.isRequired"
      :value="mobileSelectedLabel"
      :options="mobileOptions"
      :title="property.label"
    >
    </radio>
  </div>
</template>

<script>
import store from '../store/index';
import wdgUtils from '../utils/wdg';
import {Radio} from 'vux';

export default {
  name: 'StdSingleSelect',
  components: { Radio },
  props: [
    'property', 'isDesign', 'isInstance', 'isPreview', 'formMode',
    'deviceType'
  ],
  data() {
    return {
      item: this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId],
      wdgId: this.property.wdgId,
      selected: this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId].value,
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
    isPc() {
      return this.deviceType == 'pc';
    },
    isMobile() {
      return this.deviceType == 'mobile';
    },
    mobileOptions() {
      let mob = [];
      this.property.options.map((opt, k) => {
        mob.push({
          key: opt.value,
          value: opt.text,
        });
      });
      return mob;
    },
    mobileSelectedLabel() {
      let optLabels = [];
      let optValues = [];
      this.property.options.map((opt, k) => {
        optLabels.push(opt.text);
        optValues.push(opt.value);
      });

      let selectedValues = '';
      let idx = optLabels.indexOf(this.selected);
      if (idx > -1) {
        selectedValues = optValues[idx];
      }

      return selectedValues;
    },
    styleEllipsis () {
      return {
        "white-space": "nowrap",
        "text-overflow": "ellipsis",
        "overflow": "hidden",
        "min-width": "50px",
        "max-width": "150px",
        "margin-left": 0,
        "padding-right": "10px"
      }
    },
    styleIsRequired() {
      return this.validation? {'border': 0} : {'border': '1px solid red'}
    },
    isHiddenLabel() {
      return wdgUtils.isHiddenLabel(this.property);
    },
  },
  methods: {
    save() {
      let vali = this.validBeforeSave();
      return this.validation = vali;
    },
    validBeforeSave() {
      if (this.property.isRequired) {
        return wdgUtils.validIsRequired(this.selected);
      } else {
        return true;
      }
    },
    labelDisplay(className) {
      return wdgUtils.labelDisplay(this.property, className);
    },
    updatePropertyData(value, label) {
      if (this.deviceType == 'pc') {
        this.$store.commit({
          type: 'customForm/UPDATE_PROPERTY_DATA',
          wdgId: this.property.wdgId,
          key: 'value',
          value: this.selected, 
        });
      } else if (this.deviceType == 'mobile') {
        if (label) {
          this.$store.commit({
            type: 'customForm/UPDATE_PROPERTY_DATA',
            wdgId: this.property.wdgId,
            key: 'value',
            value: label, 
          });
        }

      }
    },
  },
};
</script>
