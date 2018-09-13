<style lang="less" scoped>
    .normal {
      list-style-type: none;
      padding: 0;
      margin: 0;
      & .widget-item {
        border: 1px dashed #ccc;
        margin: 5px 10px 10px 10px;
        background-color: #e6e6e6;
        & .item {
          height: 30px;
          padding: 4px;
          & span {
            vertical-align: middle;
            line-height: 25px;
            font-weight: bold;
          }
        }
        & .icon {
          float: right;
          margin: 4px;
        }
      }
    }

  @media (min-width: 1440px) {
    .widget-item-wrapper {
      .normal();
      display: flex;
      flex-direction: row;
      flex-flow: wrap;
      & .widget-item {
        width: 43%;
      }
    }
  }

  @media (max-width: 1440px) {
    .widget-item-wrapper {
      .normal();
      display: flex;
      flex-direction: column;
      & .widget-item {
        width: 90%;
      }
    }
  }

</style>

<template>
  <ul
    class="widget-item-wrapper"
  >
    <li
      class="widget-item"
      v-for="(item, key) in items"
      v-if="isSuper || ( !isSuper && key != 'StdIframe' && key != 'StdContract')"
      :key="key"
     >
      <div class="item"
        draggable="true"
        :wdgKey="key"
        @dragstart="dragWdgStart($event)"
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
import items from '../config/widgetItem.define';

export default {
  name: 'WidgetItem',
  data() {
    return {
      items,
    };
  },
  methods: {
    dragWdgStart(event) {
      if (event.dataTransfer) {
        // chrome 不需要, 但Firefox !!!必须!!! 否则，无法拖拽
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.currentTarget);
      }

      this.$store.commit({
        type: 'customForm/DRAG_WIDGET_START',
        event
      });
    },
  },
  computed: {
    isSuper() {
      if (JZY.store.state.session.tenantInfo.isSuper != '1') {
        return false;
      }
      return true;
    }
  }
};
</script>
