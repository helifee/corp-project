<style lang="less" scoped>
@import url("../assets/style/theme.define.less");
div.wrapper {
  // max-height: 480px;
  min-height: 200px;
  padding: 10px;
  & label {
    width: 100px;
    font-weight: bold;
    padding-right: 10px;
  }
  & div > iframe {
    border: 1px solid @color-border-layout-instance;
    padding: 3px;
    border-radius: 3px;
  }
}
</style>


<template>
  <div class="wrapper" :style="labelDisplay('wrapper')">
    <label for=""
      :style="isHiddenLabel"
    >
      <span
        :style="[isRequired, isFlowVar]"
      >*</span>
      {{property.label}}
    </label>
    <div
      v-if="isPc"
      :style="dimension"
    >
      <contract-edit
        v-if="property.wdgContractType == 'OA_CONTRACT_INFO'"
        :contractId="contractId"
        :editType="editType"
        @saveBackFun="saveBackFun"
        ref="refContractEdit"
        :style="customStyle"
        >
      </contract-edit>
      <contract-change-edit
        v-if="property.wdgContractType == 'OA_CONTRACT_CHANGE'"
        :contractChangeId="contractId"
        :editType="editType"
        @saveBackFun="saveBackFun"
        ref="refContractChangeEdit"
        :style="customStyle"
        >
      </contract-change-edit>
      <contract-payment-edit
        v-if="property.wdgContractType == 'OA_CONTRACT_PAYMENT'"
        :contractPayId="contractId"
        :editType="editType"
        @saveBackFun="saveBackFun"
        ref="refContractPaymentEdit"
        :style="customStyle"
        >
      </contract-payment-edit>
    </div>
    <div
      v-if="isMobile"
      :style="dimension"
    >
      <mobile-contract-detail
        v-if="property.wdgContractType == 'OA_CONTRACT_INFO'"
        :contractId="contractId"
        ref="refMobileContractDetail"
        >
      </mobile-contract-detail>
      <mobile-contract-pay-detail
        v-if="property.wdgContractType == 'OA_CONTRACT_PAYMENT'"
        :contractPayId="contractId"
        ref="refMobileContractPayDetail"
      >
      </mobile-contract-pay-detail>
      <mobile-contract-change-detail
              v-if="property.wdgContractType == 'OA_CONTRACT_CHANGE'"
              :contractChangeId="contractId"
              ref="refMobileContractChangeDetail"
      >
      </mobile-contract-change-detail>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
import contractEdit from "../../contract/components/contractEdit";
import contractPaymentEdit from "../../contract/components/contractPaymentEdit";
import contractChangeEdit from "../../contract/components/contractChangeEdit";
import contractDetail from "@mobile/pages/m_contract/m_contract_detail";
import contractPayDetail from "@mobile/pages/m_contract/m_pay_detail";
import contractChangeDetail from "@mobile/pages/m_contract/m_ctrc_change_detail";


import wdgUtils from "../utils/wdg";
import domUtils from "../utils/dom";

export default {
  name: "StdContract",
  components: {
    ContractEdit: contractEdit,
    ContractChangeEdit: contractChangeEdit,
    ContractPaymentEdit: contractPaymentEdit,
    MobileContractDetail: contractDetail,
    MobileContractPayDetail: contractPayDetail,
    MobileContractChangeDetail: contractChangeDetail,
  },
  props: [
    "property",
    "isDesign",
    "isInstance",
    "isPreview",
    "isClicked",
    "editType",
    "businessId",
    "formMode",
    "deviceType"
  ],
  data() {
    return {};
  },
  computed: {
    contractId() {
      if (this.editType == "add" || this.editType == "design") {
        return "";
      } else {
        return this.businessId;
      }
    },
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
      // return wdgUtils.isHiddenLabel(this.property);
      return {'display': 'none'}
    },
    isPc() {
      return this.deviceType == "pc";
    },
    isMobile() {
      return this.deviceType == "mobile";
    },
    customStyle() {
      if (this.formMode == 'preview' || this.formMode == 'draft') {
        return {'overflow-y': 'hidden'}
      }
    }
  },
  mounted() {
    domUtils.resizeEmbeddedView({
      event,
      property: this.property
    });
  },
  methods: {
    save(saveMode = true) {
      const contractType = this.property.wdgContractType || this.property.contractType;

      switch(contractType) {
        case 'OA_CONTRACT_INFO': 
          this.$refs.refContractEdit.flowSave(saveMode);
          break;
        case 'OA_CONTRACT_PAYMENT': 
          this.$refs.refContractPaymentEdit.flowSave(saveMode);
          break;
        case 'OA_CONTRACT_CHANGE': 
          this.$refs.refContractChangeEdit.flowSave(saveMode);
          break;
      }
    },
    saveBackFun(type, detailData) {
      if (type == "success") {
        let contractData = detailData;

        // 从给定的contractData中的businessId提取出来
        let businessId = contractData['businessId'];

        let valueData = {};
        let valueTypeItems = { 
          money: "float", 
          newMoney: 'float', 
          changeMoney: 'float', 
          paymentMoney: 'float', 
          sumPaymentMoney: 'float' 
          };
        let flowVarItems = {
          contractTypeName: true,
          contractType: true,
          money: true,
          firstParty: true,
          secondParty: true,
          changeType: true,
          changeMoney: true,
          newMoney: true,
          paymentMoney: true,
          sumPaymentMoney: true,
        };
        for (let k in contractData) {
          let val = contractData[k];
          // 去掉逗号
          if (valueTypeItems[k] == "int" || valueTypeItems[k] == "float") {
            if (typeof(contractData[k].replace) == 'function') {
              val = contractData[k].replace(/,/g, "");
            }
          }
          valueData[k] = {
            value: val,
            valueType: valueTypeItems[k] || "str",
            isFlowVar: flowVarItems[k] || false
          };
        }

        this.$store.commit("customForm/SAVE_VALUE_DATA", valueData);

        let propertyData = this.$store.state.customForm.propertyData["wdgInfo"];
        let customFormId = this.$store.state.customForm.extInfo["customFormId"];
        valueData = wdgUtils.getValueData("component", valueData);
        let businessData = wdgUtils.getBusinessData(
          "component",
          propertyData,
          valueData
        );

        // 将自动生成的businessId
        // let businessId = this.$store.state.customForm.businessId;

        this.$emit("cb-widget-saved", {
          valueData,
          businessData,
          customFormId,
          businessId
        });
        return;
      }
    },
    labelDisplay(className) {
      return wdgUtils.labelDisplay(this.property, className);
    }
  },
};
</script>
