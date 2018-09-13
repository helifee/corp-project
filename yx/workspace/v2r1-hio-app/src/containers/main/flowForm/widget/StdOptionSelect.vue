<style lang="less" scoped>
  @import url('../assets/style/theme.define.less');
  div.wrapper {
    padding: 0;
    font: 12px/40px "Microsoft YaHei";
    color: #000;
    & label {
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
      v-if="deviceType == 'pc'"
      :style="[labelDisplay('label'), isHiddenLabel]"
    >
      <span
        :style="[isRequired, isFlowVar]"
      >*</span>
      {{property.label}}:
    </label>
    <div
      v-if="deviceType == 'pc' && isDesign" 
      :style="dimension"
    >
      <el-select 
        class="w100"
        v-model="selected"
        :readonly="property.isReadOnly"
        v-if="property.options.length == 0"
        placeholder="请选择">
        <el-option value="" label="请选择" ></el-option>
      </el-select>
      <el-select 
        class="w100"
        :readonly="property.isReadOnly"
        v-else
        v-model="selected" placeholder="请选择">
        <el-option
          v-for="option in property.options"
          :key="option.value"
          :value="option.value"
          :label="option.text"
          >
        </el-option>
      </el-select>
    </div>
    <div
      v-if="deviceType == 'pc' && isInstance && this.formMode != 'draft'" 
      :style="[dimension, styleIsRequired]"
    >
      <el-select 
        class="w100"
        v-model="selected" placeholder="请选择"
        @change="updatePropertyData"
        :title="selectedText"
        >
        <el-option
          v-for="item in property.options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
          >
        </el-option>
      </el-select>
    </div>
    <div
      v-if="deviceType == 'pc' && (isPreview || this.formMode == 'draft')" 
      :style="dimension"
    >
      <el-select 
        class="w100"
        disabled=""
        :value="property.value"
        :title="selectedText"
        >
        <el-option
          v-for="item in property.options"
          :key="item.value"
          :value="item.value"
          :label="item.text"
          >
        </el-option>
      </el-select>
    </div>

    <!-- 移动端部分 -->
    <selector
      v-if="deviceType == 'mobile' && isInstance && this.formMode != 'draft'"
      :required="property.isRequired"
      v-model="selected"
      :options="mobileOptions"
      :title="property.label"
      :style="styleIsRequired"
      @on-change="updatePropertyData"
    >
    </selector>
    <selector
      v-if="deviceType == 'mobile' && isPreview"
      readonly
      :required="property.isRequired"
      v-model="selected"
      :options="mobileOptions"
      :title="property.label"
      @on-change="updatePropertyData"
    >
    </selector>
  </div>
</template>

<script>
import store from '../store/index';
import wdgUtils from '../utils/wdg';
import {Selector} from 'vux'; 

export default {
  name: 'StdOptionSelect',
  components: {
    Selector    
  },
  props: [
    'property', 'isDesign', 'isInstance', 'isPreview', 'formMode',
    'deviceType'
  ],
  data() {
    return {
      selected: this.property.wdgId && this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId]? this.$store.state.customForm.propertyData['wdgInfo'][this.property.wdgId]['value'] : '',
      validation: true,
    };
  },
  computed: {
    dimension() {
      return wdgUtils.dimension(this.property);
    },
    selectedText() {
      let obj = this.property.options.find((item)=>{
          return item.value === this.selected;
      });
      return obj&&obj.text || '';
    },
    isRequired() {
      return wdgUtils.isRequired(this.property);
    },
    isFlowVar() {
      return wdgUtils.isFlowVar(this.property);
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
    styleIsRequired() {
      return this.validation? {'border': 0} : {'border': '1px solid red'}
    },
    isHiddenLabel() {
      return wdgUtils.isHiddenLabel(this.property);
    },
  },
  methods: {
    save() {
      this.validation = this.validBeforeSave();
      return this.validation;
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
    updatePropertyData() {
      let obj = this.property.options.find((item)=>{
          return item.value === this.selected;
      });
      this.$store.commit({
        type: 'customForm/UPDATE_PROPERTY_DATA',
        wdgId: this.property.wdgId,
        key: 'value',
        value: obj.value, 
      });
      this.$store.commit({
        type: 'customForm/UPDATE_PROPERTY_DATA',
        wdgId: this.property.wdgId,
        key: 'text',
        value: obj.text, 
      });
    },
  },
};
</script>
