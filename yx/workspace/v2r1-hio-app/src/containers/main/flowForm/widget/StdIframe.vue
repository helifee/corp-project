<template>
  <div class="wrapper">
    <label
      v-if="isDesign"
      for=""
      :style="isHiddenLabel"
    >
      <span
        :style="[isRequired, isFlowVar]"
      >*</span>
      {{property.label}}
    </label>
    <div>
      <iframe
        scrolling="no"
        :src="iframeSrc"
        :formMode="formMode"
        :deviceType="deviceType"
        @load="resizeEmbeddedView($event)"
      ></iframe>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import wdgUtils from '../utils/wdg';
import domUtils from '../utils/dom';
import sysUtils from '../utils/sys';

export default {
  name: 'StdIframe',
  props: [
    'businessId', 'property', 'isDesign', 'isInstance', 'isPreview',
    'formMode'
  ],
  data() {
    return {
    };
  },
  mounted: () => {},
  updated: () => {
  },
  methods: {
    save() {},
    labelDisplay(className) {
      return wdgUtils.labelDisplay(this.property, className);
    },
    resizeEmbeddedView(event){
      let ifm = document.querySelector(`iframe[formMode="${this.formMode}"]`);
      let ifmSrcKey = this.$store.state.customForm.propertyData.extInfo.keyParam;
      let offsetHeight = 0;
      if (ifmSrcKey == 'YGZZ') {
        offsetHeight = 45;
      } else if (ifmSrcKey == 'KQQJ') {
        offsetHeight = 20;
      } else if (ifmSrcKey == 'TDX') {
        offsetHeight = 95;
      }
      ifm.style.height = ifm.contentDocument.documentElement.scrollHeight + offsetHeight + 'px';
      // window.setTimeout(domUtils.resizeEmbeddedView, 1000, {event: event, property: this.property});
    },
  },
  computed: {
    deviceType() {
      return sysUtils.getDeviceType();
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
      return wdgUtils.isHiddenLabel(this.property);
    },
    iframeSrc() {
      let iframeSrc = this.property.link;
      let link = sysUtils.parseUrlParams(this.property.link);

      let formMode = this.formMode;
      switch(this.formMode) {
        case 'rePreview':
        case 'reInstance':
        case 'draft':
          formMode = 'instance';
          break;
      }

      // 替换url中的参数businessId, personId, formMode
      link.params['businessId'] = this.businessId;
      link.params['personId'] = this.$store.state.session.sid;
      link.params['formMode'] = formMode;

      let href = link.href;
      let queryParams = sysUtils.stringifyParams(link.params);
      iframeSrc = `${link.href}?0=0${queryParams}`;

      return iframeSrc;
    },
  },
};
</script>

<style lang="less" scoped>
  @import url('../assets/style/theme.define.less');
  div.wrapper {
    min-height: 400px;
    padding: 10px;
    & label {
      width: 100px;
      font-weight: bold;
      padding-right: 10px;
    }
    & div > iframe {
      height: 550px;
      width: 100%;
      // border: 1px solid @color-border-layout-instance;
      border: 0px;
      padding: 3px;
      border-radius: 3px;
    }
  }
</style>
