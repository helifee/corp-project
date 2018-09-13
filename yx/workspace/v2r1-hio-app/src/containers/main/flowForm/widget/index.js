import Vue from 'vue';

/**
 * 批量获取所有的组件
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const requireComponent = require.context(
  '.', false, /\.vue$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
