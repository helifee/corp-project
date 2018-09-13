
// let home = r => require.ensure([], () => r(require('@/containers/home.vue')), 'home')
//
//
// let NotFoundContainer = r => require.ensure([], () => r(require('@/containers/NotFoundContainer.vue')), '404')
// // let login = r => require.ensure([], () => r(require('@Main/LoginContainer.vue')), '404')
//
let demo1 = r => require.ensure([], () => r(require('@Main/demo/demo1.vue')), 'demo1')
// let demo = r => require.ensure([], () => r(require('@Main/demo/demo.vue')), 'demo')
//
// let news = r => require.ensure([], () => r(require('@Main/news/news.vue')), 'news')
//
// let schedule = r => require.ensure([], () => r(require('@Main/schedule/schedule.vue')), 'schedule')
// let ehr = r => require.ensure([], () => r(require('@Main/ehr/ehr.vue')), 'ehr')
//
// let task = r => require.ensure([], () => r(require('@Main/task/task.vue')), 'task')
// let taskConcern = r => require.ensure([], () => r(require('@Main/task/concern.vue')), 'taskConcern')
// let taskShare = r => require.ensure([], () => r(require('@Main/task/share.vue')), 'taskShare')
// let taskSet = r => require.ensure([], () => r(require('@Main/task/set.vue')), 'taskSet')
//
// let plan = r => require.ensure([], () => r(require('@Main/plan/planHome.vue')), 'plan')
// let newsDetails = r => require.ensure([], () => r(require('@Main/news/details.vue')), 'newsDetails')
// let newsColumn = r => require.ensure([], () => r(require('@Main/news/column.vue')), 'newsColumn')
// let newsNotice = r => require.ensure([], () => r(require('@Main/news/notice.vue')), 'newsNotice')
// let newsRegulation = r => require.ensure([], () => r(require('@Main/news/regulation.vue')), 'newsRegulation')
// let editNews = r => require.ensure([], () => r(require('@Main/news/editNews.vue')), 'editNews')
//
//
//
// let project = r => require.ensure([], () => r(require('@Main/project/project.vue')), 'project')
// let projectDetail = r => require.ensure([], () => r(require('@Main/project/details.vue')), 'projectDetail')


export default [
    // {path: '/', component: home},
    //
    // {path: '*', component: NotFoundContainer},
    //
    // {path: '/404', component: NotFoundContainer},
    //
    // // {path: '/login', component: login},
    //
    {path: '/demo1', component: demo1},

    // {path: '/demo', component: demo},
    //
    // //新闻
    // {path: '/news', component: news},
    // {path: '/news/details/:id', component: newsDetails},
    // {path: '/news/column', component: newsColumn},
    // {path: '/news/notice', component: newsNotice},
    // {path: '/news/regulation', component: newsRegulation},
    // {path: '/news/editNews/:id', component: editNews},
    //
    // //任务
    // {path: '/task', component: task},
    // {path: '/task/concern', component: taskConcern},
    // {path: '/task/share', component: taskShare},
    // {path: '/task/set', component: taskSet},
    //
    //
    // {path: '/schedule', component: schedule},
    // {path: '/ehr', component: ehr},
    // //计划
    // {path: '/plan', component: plan},
    // //项目
    // {path: '/project', component: project},
    // {path: '/project/details/:id', component: projectDetail},
]
