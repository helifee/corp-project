<style lang='less' scoped>
  @import url('assets/style/theme.define.less');
  body {
    margin: 0;
  }
  .main-header {
    display: none;
    height: 50px;
    background-color: @color-bgcolor-header-design;
  }
  .main-container {
    padding: 0;
    border-bottom: 1px solid #e4f1ff;
    & .form-container {
      margin: 20px 20px 0 20px;
      min-height: 600px;
      box-shadow: 1px 1px 6px;
      background-color: #fff;
      overflow-y: auto;
    }
    & .bg-container-wrapper {
      background: #e4f1ff;
    }

    & .grid-content {
      border-radius: 1px;
      min-height: 600px;
      margin: 0 8px;
    }
  }
</style>

<template>
<el-container>
  <el-header height="50px" class="main-header">
    <TopHeader
      ref="topHeader"
      :flowTemplateCode="flowTemplateCode"
    ></TopHeader>
  </el-header>
  <el-main class="main-container">
    <el-row>
      <el-col :xs="1" :sm="1" :md="3" :lg="6" :xl="6"
        v-if="deviceType=='pc'"
      >
        <div class="grid-content">
          <el-tabs v-model="activeWidgetPanelName">
            <el-tab-pane label="布局控件" name="widget-layout">
              <widget-layout></widget-layout>
            </el-tab-pane>
            <el-tab-pane label="字段控件" name="widget-item">
              <widget-item></widget-item>
            </el-tab-pane>
            <el-tab-pane label="常用字段" name="widget-favorite">
              <widget-favorite
                :stapleWidget="stapleWidget"
              ></widget-favorite>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col class="bg-container-wrapper" :xs="22" :sm="22" :md="18" :lg="12" :xl="12">
        <div class="grid-content bg-design-wrapper">
          <form-container 
            ref="formContainer"
            class="form-container"
            editType="design"
            :formMode="formMode"
            :flowTemplateCode='flowTemplateCode'
            :deviceType='deviceType'
          ></form-container>
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="6" :xl="6"
        v-if="deviceType=='pc'"
      >
        <div class="grid-content">
          <el-tabs v-model="activeEditorPanelName">
            <el-tab-pane label="控件属性" name="widget-editor">
              <widget-editor></widget-editor>
            </el-tab-pane>
            <el-tab-pane label="表单设置" name="form-editor">
              <form-editor></form-editor>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </el-main>
</el-container>
</template>

<script>
import { Main, Container, Header, Col, Row, Tabs, TabPane } from 'element-ui';
import TopHeader from './view/TopHeader';
import WidgetLayout from './view/WidgetLayout';
import WidgetItem from './view/WidgetItem';
import WidgetFavorite from './view/WidgetFavorite';
import FormContainer from './view/FormContainer';
import FormEditor from './view/FormEditor';
import WidgetEditor from './view/WidgetEditor';
import sysUtils from './utils/sys';

export default {
  name: 'FormDesign',
  components: {
    ElMain: Main,
    ElContainer: Container,
    ElHeader: Header,
    ElCol: Col,
    ElRow: Row,
    ElTabs: Tabs,
    ElTabPane: TabPane,
    TopHeader,
    WidgetLayout,
    WidgetItem,
    WidgetFavorite,
    FormContainer,
    WidgetEditor,
    FormEditor,
  },
  props: ['flowTemplateCode', 'formMode'],
  data() {
    return {
      activeWidgetPanelName: 'widget-item',
      activeEditorPanelName: 'widget-editor',
      extInfo: {title: '无标题', description: '无描述'},
      propertyData: this.$store.state.customForm.propertyData,
      // stapleWidget: this.$store.state.customForm.stapleWidget,
    };
  },
  created () {
    this.$store.commit({
      type: 'customForm/INIT_FORM_MODE',
      formMode: 'design',
    });
  },
  mounted () {
    let flowTemplateCode = this.flowTemplateCode;
    this.$store.dispatch('customForm/getModelData', flowTemplateCode).then((res)=>{
      if (!res.data.success) {
        this.$alert(res.data.message);
        this.$store.commit({
          type: 'customForm/CLEAN_ALL_DATA',
        });
      } else {
        this.$store.commit('customForm/IMPORT_MODEL_DATA', {res});
      }
    });
  },
  computed: {
    deviceType() {
      return sysUtils.getDeviceType();
    },
    stapleWidget() {
      return this.$store.state.customForm.stapleWidget;
    }
  },
  methods: {
    // getEmbeddedData(this) {
    //   // 获得嵌入表单中的，组件的值们，比如取得合同组件中的form中的值们
    //   // 获得目前模型中的合同的wdgId
    //   let wdgPropertyData = this.$store.state.propertyData['wdgInfo'];
    //   debugger
    //   for (let k in wdgPropertyData) {
    //     let wdg = wdgPropertyData[k];
    //     if (wdg.key == 'StdContract') {
    //       this.$refs[`${wdg.wdgId}`].save(this.editType || 'add');
    //       break;
    //     }
    //   }

    // },
  }
}
</script>


