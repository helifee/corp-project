<template>
  <div
    @drop="dropEnd($event)"
    @dragover="dragOver($event)"
    :class="{
      'wdg-container-design': isDesign,
      'wdg-container-instance': isInstance,
      'wdg-container-preview': isPreview,
    }"
  >
    <div :class="{
      'header-design': isDesign,
      'header-instance': isInstance,
      'header-preview': isPreview,
    }">
      <p
        v-if="isDesign"
        class="title">{{ extInfo.title || '标题' }}</p>
      <p
        v-if="isDesign"
        class="description">{{ extInfo.description || '描述信息' }}</p>
      <input type="hidden" name="businessId" :value="businessId">
    </div>
    <!-- 行布局开始 -->
    <div
      v-if="deviceType=='pc'"
      type="row"
      :key="key"
      v-for="(r, key) in containerData"
      :class="{row: true, 'with-border': isInstance||isPreview}"
    >
      <!-- 组件外围的格子, 用来放组件的布局 -->
      <div
        :key="k"
        :draggable="isDesign? true : false"
        type="cell"
        :class="{
          cell: true,
          design: isDesign,
          preview: isPreview,
          instance: isInstance,
        }"
        :style="c['style']"
        :wdgId="c['wdgId']"
        v-for="(c, k) in r['row']"
        @mouseout="isDesign? mouseOut($event) : null"
        @mouseover="isDesign? mouseOver($event) : null"
        @click="isDesign? selectedWidgetItem($event, c['wdgId']) : null"
        @dragstart="dragRowStart($event)"
        @drop="dropRowEnd($event)"
      >
        <i
          v-if="isDesign"
          v-show="typeof(r['widget'][k]['key']) != 'undefined'"
          :style="deleteWidgetIcon"
          @click="isDesign? deleteWidget($event, r['widget'][k]['wdgId']) : null"
          class="el-icon-circle-close"
        ></i>
        <i
          v-if="isDesign"
          v-show="typeof(r['widget'][k]['key']) != 'undefined'"
          :style="sortWidgetIcon"
          class="el-icon-rank"
        ></i>
        <!-- 组件部分 -->
        <component
          type="widget"
          class="trans-border"
          @cb-widget-saved="cbWidgetSaved"
          :is="r['widget'][k]['key']"
          :id="r['widget'][k]['wdgId']"
          :wdgId="r['widget'][k]['wdgId']"
          :property="r['widget'][k]"
          :editType="editType"
          :isDesign="isDesign"
          :isInstance="isInstance"
          :isPreview="isPreview"
          :isReadOnly="isReadOnly"
          :formMode="formMode"
          :businessId="businessId"
          :deviceType="deviceType"
          @mouseout="isDesign? mouseOut($event) : null"
          @mouseover="isDesign? mouseOver($event) : null"
          ref="refWidgetWrapper"
        ></component>
      </div>
    </div>
    <!-- 行布局结束 -->

    <!-- 手机端布局 -->
    <group 
      v-if="deviceType=='mobile'"
      style="width:100%;"
    >
    <div
      type="row"
      :key="key"
      v-for="(r, key) in containerData"
      :class="{row: true, 'with-border': isInstance||isPreview}"
    >
      <!-- 组件外围的第一层格子 -->
      <div
        :key="k"
        type="cell"
        :class="{
          cell: true,
          design: isDesign,
          preview: isPreview,
          instance: isInstance,
        }"
        :style="c['style']"
        :wdgId="c['wdgId']"
        v-for="(c, k) in r['row']"
        @mouseout="isDesign? mouseOut($event) : null"
        @mouseover="isDesign? mouseOver($event) : null"
        @click="isDesign? selectedWidgetItem($event, c['wdgId']) : null"
      >
        <!-- 组件部分 -->
        <component
          type="widget"
          class="trans-border"
          @cb-widget-saved="cbWidgetSaved"
          :is="r['widget'][k]['key']"
          :id="r['widget'][k]['wdgId']"
          :wdgId="r['widget'][k]['wdgId']"
          :property="r['widget'][k]"
          :editType="editType"
          :isDesign="isDesign"
          :isInstance="isInstance"
          :isPreview="isPreview"
          :isReadOnly="isReadOnly"
          :formMode="formMode"
          :businessId="businessId"
          :deviceType="deviceType"
          @mouseout="isDesign? mouseOut($event) : null"
          @mouseover="isDesign? mouseOver($event) : null"
          ref="refWidgetWrapper"
        ></component>
      </div>
    </div>
    </group>
  </div>
</template>

<script>
import domUtils from '../utils/dom';
import sysUtils from '../utils/sys';
import {Group} from 'vux';
import '../widget';

export default {
  name: 'FormContainer',
  components: { Group },
  props: ['formMode', 'editType', 'businessId', 'flowTemplateCode', 'deviceType'],
  data() {
    return {
      overTarget: this.$store.state.customForm.overTarget,
      isDesign: this.$store.state.customForm.isDesign,
      isInstance: this.$store.state.customForm.isInstance,
      isPreview: this.$store.state.customForm.isPreview,
      isReadOnly: (this.formMode == 'draft')? true : false,
      // isReadOnly: true,
    };
  },
  computed: {
    containerData() {
      return this.$store.state.customForm.containerData;
    },
    extInfo() {
      return this.$store.state.customForm.extInfo;
    },
    deleteWidgetIcon() {
      return {
        position: 'relative',
        float: 'right',
        top: '5px',
        right: '-2px',
        color: 'firebrick',
        zIndex: 10,
        fontSize: '14px',
      };
    },
    sortWidgetIcon() {
      return {
        position: 'relative',
        float: 'right',
        top: '5px',
        left: '-2px',
        color: '#45a7fe',
        zIndex: '10',
        fontSize: '14px',
        fontWeight: 'bolder',
      };
    },
  },
  mounted: function() {
    if (this.businessId == ''
    || this.formMode == 'duplication'
    || this.formMode == 'rePreview'
    || this.formMode == 'reInstance') {
      this.$store.dispatch('customForm/getUniqueId');
    } else {
      this.$store.commit('customForm/SAVE_BUSINESS_ID', this.businessId);
    }
  },
  methods: {
    saveModel: function () {
      // 保存模型
      let flowTemplateCode = this.flowTemplateCode;
      let nextUrl = {
        "name": 'setFlowClient',
        "params": {'id': flowTemplateCode},
        "query": {'stage': 2}
      };
      let routeData;
      this.$store.dispatch('customForm/saveModelData', flowTemplateCode)
      .then((res) => {
        sysUtils.notify(res, this);

      }).then(() => {
        // 获得相关组件的属性
        let wdg = this.$refs.refWidgetWrapper[0];
        let wdgKey = wdg.property.key;

        // 如果是合同，还得保存下模型的细节
        if (wdgKey == 'StdContract') {
          if (typeof(wdg.saveBackFun) == 'function') {
            wdg.save();
          }
        }
      }).then(() => {
        ///////////////////////////
        // this.$emit('saveSuccessNext',2)
        ///////////////////////////
        // window.setTimeout(() => {
        //   this.$router.push({
        //     path: '/setFlowClient/'+this.flowTemplateCode,
        //     query: {stage: 2}
        //   });
        //   window.location.reload()
        // }, 1000);
        ///////////////////////////
        debugger
        routeData = this.$router.resolve(nextUrl);
        window.open(routeData.href, '_self');
        window.location.reload();
      });
    },
    save: function(saveMode) {
      // 保存值
      // 从保存表单一开始，分save（）和submit（）方式
      // 一直到这里，以变量saveMode区分
      let wdg = this.$refs.refWidgetWrapper[0];
      let wdgKey = wdg.property.key;

      // TODO
      // 增加校验，判断模型里不能为空
      // if (null == wdgKey) {
        // return false;
      // } else
      if (wdgKey == 'StdContract') {
        // 合同部分，需要执行组件内部的save方法
        // save方法执行后，改组件内的saveBackFun会被
        // 第三方合同组件调用
        if (typeof(wdg.saveBackFun) == 'function') {
          wdg.save(saveMode);
          return true;
        }

      } else {
        if (wdgKey != 'StdIframe') {
          for(let i in this.$refs.refWidgetWrapper) {
            let wdg = this.$refs.refWidgetWrapper[i];
            let validation = wdg.save();
            if (undefined == validation || !validation) {
              return false;
            }
          }
        }

        // 非合同的表单
        // 出发store中的保存值部分
        // 如果是iframe，人事部分，则会自定调用第三方的固定接口
        this.$store.commit('customForm/SAVE_VALUE_DATA');

        // 发起回调
        window.setTimeout(() => {
          let valueData = this.$store.state.customForm.valueData;
          let businessData = this.$store.state.customForm.businessData;
          let customFormId = this.$store.state.customForm.extInfo.customFormId;
          let businessId = this.$store.state.customForm.businessId;
          let validation = this.$store.state.customForm.validation;

          this.$emit('cb-form-instance-saved', {
            valueData,
            businessData,
            customFormId,
            businessId,
            validation,
          });
        }, 1000);
      }

      return false;
    },
    fetchBusinessData: function () {
      // 主动激活（获取）businessData
      if (this.$refs.refWidgetWrapper && this.$refs.refWidgetWrapper.length >= 1) {
        let wdg = this.$refs.refWidgetWrapper[0];
        let wdgKey = wdg.property.key;

        if (wdgKey == 'StdContract') {
          // 判断是合同模型，并且有saveBackFun回调方法
          if (typeof(wdg.saveBackFun) == 'function') {
            wdg.save();
          }
        }
      }
    },
    cbWidgetSaved: function(data) {
      this.$emit('cb-form-instance-saved', data);
    },
    dragRowStart: function(event) {
      // 开始拖拽行
      this.$store.commit({
        type: 'customForm/DRAG_ROW_START',
        event
      });
    },
    dropRowEnd: function(event) {
      // 结束拖拽
      this.$store.commit({
        type: 'customForm/DROP_ROW_END',
        event
      });
    },
    dragOver: function(event) {
      event.preventDefault();
      this.$store.commit({
          type: 'customForm/DRAG_OVER',
          event
        }
      );
    },
    dropEnd: function(event) {
      // event.preventDefault();
      this.$store.commit({
        type: 'customForm/DROP_END',
        event
      });
    },
    mouseOut: function(event) {
      event.preventDefault();

      let wdgId = this.$store.state.customForm.overTarget.wdgId;
      domUtils.toggleClassNameByWdgid(wdgId, 'dashed-border');
    },
    mouseOver: function(event) {
      event.preventDefault();

      this.$store.commit({
        type: 'customForm/MOUSE_OVER',
        event
      });

      // TODO: 需要剥离的部分
      // 获得元素的class并做相关切换
      let wdgId = this.$store.state.customForm.overTarget.wdgId;
      domUtils.toggleClassNameByWdgid(wdgId, 'dashed-border');
    },
    deleteWidget: function(event, wdgId) {
      this.$store.dispatch('customForm/deleteFlowVarByWdgId', {wdgId})
      .then((res) => {
        // 若res.data.result == true, 说明可以删除
        // 反之，不行。因为已经有实例产生
        if (res.data.success) {
          // TODO: delete widget from containerData
          this.$store.commit({
            type: 'customForm/DELETE_WIDGET',
            wdgId
          });
        } else {
          this.$alert(res.data.message);
        }
      });

    },
    selectedWidgetItem: function(event, wdgCellId) {
      // event.preventDefault();
      // event.stopPropagation();

      const colIfo = domUtils.findColInfoByEvent(event);
      domUtils.toggleClassNameByWdgid(colIfo['wdgId'], 'row-bg', true);

      // 点击拖拽页面区域中，不同的元素所在的区域
      // 获得其属性
      this.$store.commit({
        type: 'customForm/SELECTED_WIDGET_ITEM',
        event,
      });
    },
  },
};
</script>

<style lang="less" scoped>
  @import url('../assets/style/theme.define.less');
  .wdg-container-design {
    height: 400px;
  }
  .wdg-container-instance {
    min-height: 400px;
  }
  .wdg-container-preview {
    height: auto;
  }
  .header {
    &-design {
      margin: 0;
      padding: 15px 5px 10px 15px;
      background-color: #fff;
      .title {
        .def-header-title();
      }
      .description {
        .def-header-description();
      }
    }
    &-instance {
      margin: 0;
      padding: 15px 5px 10px 15px;
      background-color: transparent;
      // background-color: @color-bgcolor-form-header;
      .title {
        .def-header-title();
      }
      .description {
        .def-header-description();
      }
    }
    &-preview {
      margin: 0;
      padding: 0;
      height: 1px;
      background-color: transparent;
      // background-color: @color-bgcolor-form-header;
      .title {
        .def-header-title();
      }
      .description {
        .def-header-description();
      }
    }
  }
  .row {
    display: flex;
    margin-top: 2px;
    & .cell {
      padding: 0 5px 5px 5px;
      display: table-column;
      min-height: 40px;
      }
      & .design {
        border: 1px solid @color-border-layout-design;
        & .delete-widget-icon {
          position: 'relative';
          float: 'right';
          top: '0px';
          right: '0px';
        }
    }
    & .instance {
      // border: 1px solid @color-border-layout-instance;
      border: 0;
    }
    & .preview {
      // border: 1px solid @color-border-layout-instance;
      border: 0;
    }
    .dashed-border {
      border: 1px dashed @over-color-layout-box-border;
    }
  }

  .row-bg {
    background-color: @clicked-bgcolor-widget-box;
    // background-color: transparent;
  }
  .trans-border {
    border: 1px dashed transparent;
  }
  .with-border {
    margin: -1px;
  }
</style>
