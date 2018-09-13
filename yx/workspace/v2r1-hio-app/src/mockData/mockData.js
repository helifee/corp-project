
/*

 */


import u from '@/utils/util.js'


let mockData={
    foo:'bar'
}

function fun(key){
    key=key.replace(/(\/)(\d)+/g,'');
    console.log('kcuf_u key----:',key);
    return u.getDataByModel(mockData,key);
}


export default fun;


//任务-list
export const taskTableData = [{
      id:'001',
      taskName: '测试项222目名称',
      concerned:true,
      completed:true,
      shared:true,
      ownUserName: '王小虎',
      process: 0,
      taskState:'3',
      region:'1',
      startDate:'2016-1-03 21:00:22',
      lastDate:'2018-07-03'
    }, {
      id:'002',
      taskName: '测试项目名称',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎2',
      process: 56,
      taskState:'2',
      region:'2',
      startDate:'2017-11-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'003',
      taskName: '上海市普陀区金沙江路 1518 弄',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎3',
      process: 100,
      taskState:'4',
      region:'1',
      startDate:'2018-06-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'004',
      taskName: '普陀区金沙江',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎4',
      process: 50,
      taskState:'3',
      region:'3',
      startDate:'2018-06-03 21:00:22',
      lastDate:'2018-09-03'
    }, {
      id:'005',
      taskName: '金沙江路',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎5',
      process: 40,
      taskState:'1',
      region:'1',
      startDate:'2017-06-03 21:00:22',
      lastDate:'2018-09-03'
    }, {
      id:'006',
      taskName: '普陀区',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎6',
      process: 70,
      taskState:'2',
      region:'1',
      startDate:'2016-06-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'007',
      taskName: '普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎7',
      process: 2,
      taskState:'1',
      region:'1',
      startDate:'2016-06-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'008',
      taskName: '普陀区8金沙',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎7',
      process: 2,
      taskState:'1',
      region:'1',
      startDate:'2016-12-03 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'009',
      taskName: '9普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎7',
      process: 2,
      taskState:'1',
      region:'1',
      startDate:'2016-06-13 21:00:22',
      lastDate:'2016-09-03'
    }, {
      id:'010',
      taskName: '10普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      ownUserName: '王小虎7',
      process: 2,
      taskState:'1',
      region:'1',
      startDate:'2016-06-23 21:00:22',
      lastDate:'2016-09-03'
    }];
    
//审批-list
export const approveTableData = [{
      id:'001',
      approveName: '测试项目名称',
      concerned:true,
      completed:true,
      shared:true,
      originator:'杨帆',
      currentApprover: '王小虎',
      approveType: '办公用品领用',
      startDate:'2017-01-03 21:00:22',
      lastDate:'2018-07-03 21:00:22',
      approveState:{
        name:'草',
        state:0
      }
    }, {
      id:'002',
      approveName: '测试项目名称',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆1',
      currentApprover: '王小虎2',
      approveType: '出差申请',
      startDate:'2018-03-03 21:00:22',
      lastDate:'2016-09-03 21:00:22',
      approveState:{
        name:'批',
        state:1
      }
    }, {
      id:'003',
      approveName: '上海市普陀区金沙江路 1518 弄',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆',
      currentApprover: '王小虎3',
      approveType: '请假申请',
      startDate:'2018-01-03 21:00:22',
      lastDate:'2016-09-03 21:00:22',
      approveState:{
        name:'驳',
        state:2
      }
    }, {
      id:'004',
      approveName: '普陀区金沙江',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆4',
      currentApprover: '王小虎4',
      approveType: '合同付款',
      startDate:'2017-12-03 21:00:22',
      lastDate:'2018-09-03 21:00:22',
      approveState:{
        name:'√',
        state:3
      }
    }, {
      id:'005',
      approveName: '金沙江路',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆',
      currentApprover: '王小虎5',
      approveType: '合同付款',
      startDate:'2018-02-03 21:00:22',
      lastDate:'2018-09-03 21:00:22',
      approveState:{
        name:'x',
        state:4
      }
    }, {
      id:'006',
      approveName: '普陀区',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆6',
      currentApprover: '王小虎6',
      approveType: '合同付款',
      startDate:'2016-06-03 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'批',
        state:1
      }
    }, {
      id:'007',
      approveName: '普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆7',
      currentApprover: '王小虎7',
      approveType: '合同付款',
      startDate:'2017-06-22 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'√',
        state:3
      }
    }, {
      id:'008',
      approveName: '8普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆8',
      currentApprover: '王小虎8',
      approveType: '合同付款',
      startDate:'2017-11-03 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'批',
        state:1
      }
    }, {
      id:'009',
      approveName: '9普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆9',
      currentApprover: '王小虎9',
      approveType: '合同付款',
      startDate:'2016-06-12 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'√',
        state:3
      }
    }, {
      id:'010',
      approveName: '10普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆10',
      currentApprover: '王小虎10',
      approveType: '合同付款',
      startDate:'2016-06-13 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'√',
        state:3
      }
    }, {
      id:'011',
      approveName: '11普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆10',
      currentApprover: '王小虎11',
      approveType: '合同付款',
      startDate:'2017-05-13 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'批',
        state:1
      }
    }, {
      id:'012',
      approveName: '12普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆12',
      currentApprover: '王小虎12',
      approveType: '合同付款',
      startDate:'2016-09-13 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'批',
        state:1
      }
    }, {
      id:'013',
      approveName: '13普陀区金沙',
      concerned:false,
      completed:false,
      shared:false,
      originator:'杨帆13',
      currentApprover: '王小虎13',
      approveType: '合同付款',
      startDate:'2018-03-13 21:00:22',
      lastDate:'2016-09-03',
      approveState:{
        name:'批',
        state:1
      }
    }]