import main from './transferTree.vue'

/* istanbul ignore next */
main.install = function(Vue) {
    Vue.component(main.name, main)
}

export default main
