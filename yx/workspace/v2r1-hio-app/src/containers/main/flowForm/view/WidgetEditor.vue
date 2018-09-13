<template>
  <div class="list" v-if="item.property">
    <!-- 标题 -->
    <div class="item"
    >
      <div>标题</div>
      <div>
        <input type="text"
          name="label"
          :value="item.property.label"
          @input="updateLabel"
        >
      </div>
    </div>
    <!-- 标题布局 -->
    <div class="item"
      v-if="item.property.labelDisplay!==undefined"
    >
      <div>标题布局</div>
      <div>
        <input type="radio"
          name="labelDisplay"
          v-model="item.property.labelDisplay"
          value="inline"
        >
        <label for="">横</label>
        <input type="radio"
          name="labelDisplay"
          v-model="item.property.labelDisplay"
          value="block"
        >
        <label for="">列</label>
      </div>
    </div>
    <!-- 数据源 -->
    <div class="item"
      v-if="item.property.linkDataSrc!==undefined"
    >
      <div>数据源</div>
      <div>
        <select name="" id=""
          v-model="iframeSrc"
          @input="pickUpIframeSrc($event)"
        >
          <option v-for="(link, k) in linkDataSrc" 
            :value="link.value"
            :key="k"
          >
          {{ link.text }}
          </option>
        </select>
      </div>
    </div>
    <!-- 数据源 -->
    <div class="item"
      v-if="item.property.wdgCallbackType!==undefined"
    >
      <div>合同组件</div>
      <div>
        <select name="" id=""
          v-model="item.property.wdgContractType"
          @input="pickUpWdgCallbackKey($event)"
        >
          <option v-for="(link, k) in wdgCallbackType" 
            :value="link.value"
            :key="k"
          >
          {{ link.text }}
          </option>
        </select>
      </div>
    </div>
    <!-- 相关链接 -->
    <div class="item hidden"
      v-if="item.property.link!==undefined"
    >
      <div>相关链接</div>
      <div>
        <input 
          class="w100"
          type="text" name="link"
          v-model="item.property.link"
        >
      </div>
    </div>
    <!-- 是否为流程变量 -->
    <div class="item"
      v-if="item.property.isFlowVar!==undefined"
    >
      <div for="isFlowVar">是流程变量</div>
      <input
        type="checkbox"
        id="isFlowVar"
        name="isFlowVar"
        v-model="item.property.isFlowVar"
        @click="changeFlowVar($event)"
      >
    </div>
    <!-- 是否为必填项目 -->
    <div class="item"
      v-if="item.property.isRequired!==undefined"
    >
      <div for="isRequired">必填项目</div>
      <input type="checkbox"
        id="isRequired"
        name="isRequired"
        v-model="item.property.isRequired"
      >
    </div>
    <!-- 是否为唯一值 -->
    <div class="item"
      v-if="item.property.isUnique!==undefined"
    >
      <div>唯一值</div>
      <input type="checkbox" name="isUnique"
        v-model="item.property.isUnique"
      >
    </div>
    <!-- 控件大小  -->
    <div class="item"
      v-if="item.property.dimension!==undefined"
    >
      <div>控件大小</div>
      <div>
        <input type="radio"
          id="dimension.sm"
          value="sm"
          v-model="item.property.dimension"
        >
        <label for="dimension.sm">小</label>

        <input type="radio"
          id="dimension.md"
          value="md"
          v-model="item.property.dimension"
        >
        <label for="dimension.md">中</label>

        <input type="radio"
          id="dimension.lg"
          value="lg"
          v-model="item.property.dimension"
        >
        <label for="dimension.lg">大</label>
      </div>
    </div>
    <!-- 最大长度 -->
    <div class="item"
      v-if="item.property.maxLength!==undefined"
    >
      <div v-if="item.property.valueType == 'float' || item.property.valueType == 'int'" >最大数额</div>
      <div v-else >最大长度</div>
      <input type="text" name="maxLength"
        v-model="item.property.maxLength"
      >
    </div>
    <!-- 用户定义可选项 -->
    <div class="item"
      v-if="item.property.options!==undefined"
    >
      <div>定义选项</div>
      <ul>
        <li
          v-if="item.property.options.length == 0"  
        >
          <input 
            :disabled="item.property.options.length == 0"
            type="text" 
            name="options" 
            :option-key="random"
            @change="changeOption($event)"
          >
          <button
            @click="eraseOption()"
          >-</button>
          <button
            @click="addOption()"
          >+</button>
        </li>
        <li
          v-else
          v-for="item in item.property.options"
          :key="item.value"
        >
          <input type="text" 
            :option-key="item.value"
            :value="item.text"
            @input="changeOption($event)"
          >
          <button
            @click="eraseOption(item.value)"
          >-</button>
          <button
            @click="addOption()"
          >+</button>
        </li>
      </ul>
    </div>
    <!-- 其他设置 -->
    <div>
      <div>其他设置</div>
      <div>
        <!-- 隐藏标题 -->
        <p
          v-if="item.property.isHiddenLabel!==undefined"
        >
          <input type="checkbox"
            name="isHiddenLabel"
            id="isHiddenLabel"
            :value="item.property.isHiddenLabel"
            @click="updateIsHiddenLabel"
          >
          <label for="isHiddenLabel">隐藏标题</label>
        </p>
        <!-- 缺省值 -->
        <p
          v-if="item.property.defaultValue!==undefined"
        >
          <input type="checkbox" name="defaultValue"
            v-model="item.property.defaultValue"
          >
          <label for="defaultValue">缺省值</label>
        </p>
        <!-- 只读 -->
        <p
          v-if="item.property.isReadOnly!==undefined"
        >
          <input type="checkbox"
            name="isReadOnly"
            id="isReadOnly"
            :value="item.property.isReadOnly"
            @click="updateIsReadOnly"
          >
          <label for="isReadOnly">只读</label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dataUtils from '../utils/dataSrc';

export default {
  name: 'WidgetEditor',
  data() {
    return {
      item: this.$store.state.customForm.clickedWidgetItem || {},
      formMode: this.$store.state.customForm.formMode,
      iframeSrc: '',
    };
  },
  computed: {
    containerData() {
      return this.$store.state.customForm.containerData;
    },
    linkDataSrc() {
      // the property is desgined for HR iframe
      let formMode = this.$store.state.customForm.formMode;
      return dataUtils.getListByIframeType('HR', formMode);
    },
    wdgCallbackType() {
      // this property is designed for Contract forms
      let formMode = this.$store.state.customForm.formMode;
      return dataUtils.getListByIframeType('CONTRACT', formMode);
    },
    random() {
      return Math.ceil(Math.random()*1000000);
    },
  },
  methods: {
    updateLabel (event) {
      this.updateProperty('label', event.target.value);
    },
    updateIsHiddenLabel(event) {
      this.updateProperty('isHiddenLabel', event.target.checked);
    },
    updateIsReadOnly(event) {
      this.updateProperty('isReadOnly', event.target.checked);
    },
    updateProperty (key, value) {
      let wdgId = this.item.property.wdgId;
      if (wdgId) {
        this.$store.commit({
          type: 'customForm/UPDATE_WIDGET_PROPERTY',
          item: this.item,
          key,
          value,
        });
      }
    },
    pickUpIframeSrc (event) {
      let value = event.target.selectedOptions[0].value
      this.updateProperty('link', value);
    },
    pickUpWdgCallbackKey (event) {
      let value = event.target.selectedOptions[0].value
      this.updateProperty('wdgContractType', value);
    },
    changeOption (event){
      let value = event.target.getAttribute('option-key');
      let text = event.target.value;
      this.$store.commit({
        type: 'customForm/UPDATE_PROPERTY_OPTION',
        item: this.item,
        value,
        text,
      });
    },
    changeFlowVar (event) {
      let isFlowVar = !this.item.property.isFlowVar;
      let wdgId = this.item.property.wdgId;
      if (!isFlowVar) {
        this.$store.dispatch('customForm/deleteFlowVarByWdgId', {wdgId})
        .then((res) => {
          // IF res.data.result == true, the checkbox be checked to false
          // IF any instance of this form model is exist, the checkbox is disabled
          this.$store.commit({
            type: 'customForm/UPDATE_WIDGET_PROPERTY',
            item: this.item,
            key: 'isFlowVar',
            value: !res.data.result,
          });
        });
      }
    },
    eraseOption (value){
      this.$store.commit({
        type: 'customForm/ERASE_PROPERTY_OPTION',
        item: this.item,
        value,
      });
    },
    addOption (){
      this.$store.commit({
        type: 'customForm/ADD_PROPERTY_OPTION',
        item: this.item,
      });
    },
  }
};
</script>

<style lang="less" scoped>
  .list {
    padding: 0 10px;
    line-height: 25px;
    & .item {
      padding-bottom: 10px;
    }
    .w100 {
      width: 100%;
    }
  }
  .hidden {
    display: none;
  }
</style>
