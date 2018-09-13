
export let increment=function({commit}){
  // // console.log('action的参数:',arguments);return false;
  // var options=arguments[1];
  //
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     commit('INCREMENT',options)
  //     resolve()
  //   }, 10)
  // });
};

// export const increase = function ({commit}, price) {
//     setTimeout(function () {
//         commit('increment', price);
//     },3000)
// }


// //新建栏目
// export const addColumn = function ({commit}, newColumn) {
//     //接口
//         commit('ADD_COLUMN' , newColumn);
//
// }
// //编辑栏目
// export const editColumn = function ({commit}, newColumn,index) {
//     //接口
//     commit('EDIT_COLUMN' , newColumn,index);
//
// }
//
// //拖拽排序
// export const sortColumn = function ({commit}, newColumnList) {
//     //接口
//         commit('SORT_COLUMN' , newColumnList);
//
// }
// //删除栏目
// export const delColumn = function ({commit}, index) {
//     //接口
//         commit('DEL_COLUMN' , index);
//
// }


//更新栏目
export const updateColumn = function ({commit}, newColumnList) {
    //接口
    commit('UPDATE_COLUMN' , newColumnList);

}


//更新系统时间
export const setSysTime = function ({commit}, time) {
    //接口
    commit('SET_SYS_TIME' , time);
}
//更新任务模块的左侧菜单条数
export const taskSetMenuNumber = function ({commit}, obj ) {
    //接口
    commit( 'TASK_SET_MENU_NUMBER' , obj );
}