<style lang="less" scoped>
    .normal {
      list-style-type: none;
      padding: 0;
      margin: 0;
      & .widget-layout {
        border: 1px dashed #ccc;
        margin: 5px 10px 10px 10px;
        background-color: #e6e6e6;
        & .item {
          height: 30px;
          padding: 4px;
          & span {
            vertical-align: middle;
          }
        }
        & .icon {
          float: right;
          margin: 4px;
        }
      }
    }

  @media screen {
    .widget-layout-wrapper {
      .normal();
      display: block;
      & .widget-layout {
        width: 90%;
      }
    }
  }

</style>

<template>
  <ul class="widget-layout-wrapper" >
    <li
      class="widget-layout"
      v-for="(item, key) in items['ROW']"
      :key="key" >
      <div class="item"
        draggable="true"
        wdgKey="ROW"
        :wdgtype="item.type"
        @dragstart="dragStart($event)"
      >
        <span> {{ item.wdgName }} </span>
        <span class="icon">
          <i class="el-icon-menu"></i>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import items from '../config/widgetLayout.define';
// import store from '../store/index';

export default {
  name: 'WidgetLayout',
  data() {
    return {
      items,
    };
  },
  methods: {
    dragStart(event) {
      this.$store.commit({
        type: 'customForm/DRAG_START',
        event
      });
    },
  },
};
</script>
