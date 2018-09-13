
let userInfo=JSON.parse(localStorage.getItem('userInfo'))||{}
console.log("user info--:",userInfo)



let defaultState = {

    isRouterChanging:false,
    locale:{},
    GLOBAL_COLOR:'#45A7FE',

    rq:{},
    isLoading:false,
    // locale:{
    //     global:globalLocale
    // },
    session:{


        ...userInfo,
        // userIdIM 8987504d-decc-42dd-9504-afe0da22a38d
        // userIdOA userIdOA
        // userIdOA 测试用户001
        // userIdIM :'8987504d-decc-42dd-9504-afe0da22a38d',
        // name:'许国平',
        // sid: "10133",
        // parentRealityId:'1001',//部门id
        // dept: "研发中心",
        // role: "管理员",

        sysTime:new Date,//获取当前时间
    },
    // totalPrice:0,
    columnsList:[],
    officeDetailId:'',
    officeEditId:'',

    taskModule:{
        leftMenu: {
            task: '1',//我的任务条数
            create: '2',//我创建的条数
            own: '3',//我负责的条数
            join: '4',//我参与的条数
            concern: '5',//我关注的条数
            share: '6'//共享给我的条数
        },
    }

};





let inBrowser = typeof window !== 'undefined'

// console.log('defaultState--',defaultState);
// if in browser, use pre-fetched state injected by SSR
let state = (inBrowser && window.__INITIAL_STATE__) || defaultState


export default state;
