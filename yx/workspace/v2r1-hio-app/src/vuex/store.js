import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

import customForm from '../containers/main/flowForm/store/index'

// import allVars from './modules/allVars/allVars'
//import logcat from './modules/logcat/logcat'
// import multationWatcher from './plugins/multationWatcher'
// import util from './plugins/util'

// console.log("util------:",util);

Vue.use(Vuex)

// let defaultState = {
//   topics: [
//     {
//       title:'aaaaaaaaaaa'
//     }
//   ],
//   count: 1
// }
//
// let inBrowser = typeof window !== 'undefined'
//
// // if in browser, use pre-fetched state injected by SSR
// let state = (inBrowser && window.__INITIAL_STATE__) || defaultState

// let mutations = {
//   TOPICS_LIST: (state, options) => {
//     // setTimeout(function(){
//     //   state.topics = state.topics.concat(options.arr)
//     // },1000)
//
//     state.topics = state.topics.concat(options.arr)
//
//   },
//   // INCREMENT:function(){
//   //   console.log('multation的参数',arguments);
//   // },
//
//   INCREMENT: (state,params) => {
//     console.log('multation的参数',params);
//     // setTimeout(function(){
//       state.count+=params.step
//     // },1000)
//
//   },
//
//   DECREMENT: (state) => {
//     state.count--
//   }
// }


const debug = process.env.NODE_ENV !== 'production'

var newStore=new Vuex.Store({
    state,//必须
    actions,
    mutations,
    getters,//非必须
    modules: {
        customForm,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
    // plugins:[multationWatcher]
})


export default newStore
