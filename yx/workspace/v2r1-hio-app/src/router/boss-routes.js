let demo = r => require.ensure([], () => r(require('@demo')), 'demo')
//
//
// export default [
//     {path: '/demo', component: demo}
// ]






let netDisk = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.vue')), 'netDisk')
// let netDiskMenu = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.menu.vue')), 'netDiskMenu')
// let personalNetDisk = r => require.ensure([], () => r(require('@Main/personalNetDisk/personalNetDisk.vue')), 'personalNetDisk')
// let personalNetDiskMenu = r => require.ensure([], () => r(require('@Main/personalNetDisk/personalNetDisk.menu.vue')), 'personalNetDiskMenu')
// let personalNetDiskMyFollow = r => require.ensure([], () => r(require('@Main/personalNetDisk/personalNetDisk.myFollow.vue')), 'personalNetDiskMyFollow')
let netDiskDirManage = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.dirManage.vue')), 'netDiskDirManage')
let netDiskMyFollow = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.myFollow.vue')), 'netDiskMyFollow')
let netDiskRecentlyVisit = r => require.ensure([], () => r(require('@Main/netDisk/netDisk.recentlyVisit.vue')), 'netDiskRecentlyVisit')




let routes=[
    {path: '/demo', component: demo},

    //网盘
    {path:'/netDisk',component:netDisk},
    {path:'/netDisk/dirManage',component:netDiskDirManage},
    {path:'/netDisk/myFollow',component:netDiskMyFollow},
    {path:'/netDisk/recentlyVisit',component:netDiskRecentlyVisit},

]






// console.log('routes--:',routes)







// console.log("process node env in routes:",process.env.NODE_ENV)

// if(process.env.NODE_ENV!='prodduction'){
//     // console.log("not prod demo---:",demo)
//     routes.push({path: '/demo', component: demo})
//     routes.push({path: '/demo1', component: demo1})
// }

// let appEnv=process.env.APP_ENV||'dev'
// if(appEnv=='local' || appEnv=='dev' || appEnv=='undefined'){
//     routes.push({path: '/test', component: test})
// }

export default routes
