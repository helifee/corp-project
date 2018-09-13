<style lang="less" scoped>
@import url("../assets/style/theme.define.less");
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
.weui-cells_checkbox label div p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.txtOverFlow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: ellipsis;
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
    <div v-if="isPc && isDesign" >
      <el-checkbox
        disabled
        v-if="property.options.length == 0"
        value=""
        label=""
      > 
      </el-checkbox> 
      <el-checkbox
        disabled
        v-else
        v-for="item in property.options"
        :key="item.value"
        :value="item.value"
        :label="item.text"
        :style="pcStyleEllipsis"
        :title="item.text"
      > 
      </el-checkbox> 
    </div>
    <div v-if="isPc && isInstance && this.formMode != 'draft'" 
      :style="styleIsRequired"
    >
      <el-checkbox
        v-model="selected" 
        v-for="item in property.options"
        :key="item.value"
        :value="item.value"
        :label="item.text"
        @change="updatePropertyData"
        :style="pcStyleEllipsis"
        :title="item.text"
      > 
      </el-checkbox> 
    </div>
    <div v-if="isPc && (isPreview || this.formMode == 'draft')" >
      <el-checkbox
        disabled
        v-model="property.value" 
        v-for="item in property.options"
        :key="item.value"
        :value="item.value"
        :label="item.text"
        :title="item.text"
        :style="pcStyleEllipsis"
      > 
      </el-checkbox> 
    </div>

    <!-- 移动端部分 -->
    <checklist
      v-if="isMobile && isInstance && this.formMode != 'draft'"
      :required="property.isRequired"
      :options="mobileOptions"
      :title="property.label"
      :value="mobileSelectedLabel"
      :style="[mobileLabelEllipsis, pcStyleEllipsis]"
      @on-change="updatePropertyData"
    ></checklist>
    <checklist
      disabled
      v-if="isMobile && (isPreview || this.formMode == 'draft')"
      :required="property.isRequired"
      v-model="selected"
      :value="selected"
      :title="property.label"
      :style="mobileLabelEllipsis"
      :options="mobileOptionsValues"
    ></checklist>
  </div>
</template>

<script>
import store from "../store/index";
import wdgUtils from "../utils/wdg";
import { Checklist } from "vux";

export default {
  name: "StdSingleSelect",
  components: { Checklist },
  props: [
    "property",
    "isDesign",
    "isInstance",
    "isPreview",
    "formMode",
    "deviceType"
  ],
  data() {
    return {
      item: this.$store.state.customForm.propertyData["wdgInfo"][
        this.property.wdgId
      ],
      wdgId: this.property.wdgId,
      selected:
        this.$store.state.customForm.propertyData["wdgInfo"][
          this.property.wdgId
        ]["value"] || [],
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
      return this.deviceType == "pc";
    },
    isMobile() {
      return this.deviceType == "mobile";
    },
    mobileOptionsValues() {
      let mob = [];
      this.property.options.map((opt, k) => {
        mob.push(opt.text);
      });
      return mob;
    },
    mobileOptions() {
      let mob = [];
      this.property.options.map((opt, k) => {
        mob.push({
          key: opt.value,
          value: opt.text
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

      let selectedValues = [];
      this.selected.map((item, k) => {
        let idx = optLabels.indexOf(item);
        if (idx > -1) {
          selectedValues.push(optValues[idx]);
        }
      });

      return selectedValues;
    },
    mobileLabelEllipsis() {
      return {
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap"
      };
    },
    pcStyleEllipsis () {
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
    updatePropertyData(value, label) {
      if (this.deviceType == "pc") {
        this.$store.commit({
          type: "customForm/UPDATE_PROPERTY_DATA",
          wdgId: this.property.wdgId,
          key: "value",
          value: this.selected
        });
      } else if (this.deviceType == "mobile") {
        // debugger
        // let optObjects = {};
        // this.property.options.map((opt, k) => {
        //   optObjects[opt.value+''] = opt.text;
        // });

        // let selectedText = [];
        // this.selected.map((item, k) => {
        //   if (optObjects[item]) {
        //     selectedText.push(optObjects[item]);
        //   }
        // });

        // debugger
        if (label) {
          this.$store.commit({
            type: "customForm/UPDATE_PROPERTY_DATA",
            wdgId: this.property.wdgId,
            key: "value",
            value: label
          });
        }
      }
    }
  }
};
</script>
