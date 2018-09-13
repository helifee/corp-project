import l from '@/locale/locale.js'
export default function(){
    return [
        {url:'/',name:l.$t('{global.headerMenu.home}'),id:1,isMore:false},
        {url:'/news',name:l.$t('{global.headerMenu.news}'),id:2,isMore:false},
        {url:'/approve',name:l.$t('{global.headerMenu.approve}'),id:3,isMore:false},
        {url:'/schedule',name:l.$t('{global.headerMenu.schedule}'),id:4,isMore:false,asideMenu:false},
        {url:'/crm',name:l.$t('{global.headerMenu.CRM}'),id:5,isMore:false},
        {url:'/plan',name:l.$t('{global.headerMenu.plan}'),id:6,isMore:false},
        {url:'/project/create',name:l.$t('{global.headerMenu.project}'),id:7,isMore:false},
        // {url:'/task',name:l.$t('{global.headerMenu.task}'),id:8,isMore:false},
        {url:'/netDisk',name:'网盘',id:9,isMore:false},
        // {url:'/ehr',name:l.$t('{global.headerMenu.EHR}'),id:100,isMore:false},
        // {url:'/demo1',name:'demo1',id:11,isMore:false},
        {url:'/more',name:l.$t('{global.headerMenu.more}'),id:11,isMore:true}
    ]
}
