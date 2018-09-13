// import * as types from './mutation-types'
export default {
    UPDATE_IS_ROUTER_CHANGING(state,bool){
        state.isRouterChanging=bool
    },
    UPDATE_USERINFO_COMPANYLOGO(state,logoUrl){
        try{
            state.session.tenantInfo.logo=logoUrl;
        }catch(e){
            console.warn('modify logoUrl error--:',e)
        }
    },
    UPDATE_USERINFO(state,userInfo){

        if(userInfo!==null && !userInfo.hasOwnProperty('requireTendId')){
            userInfo.requireTendId=true
        }

        try{
            if(!userInfo){

                for(var i in state.session){
                    if('sysTime'!=i){
                        delete state.session[i]
                    }
                }
                return false
            }



            console.log('kcuf_u userinfo--:',userInfo)



            // userIdIM :'8987504d-decc-42dd-9504-afe0da22a38d',
            //     name:'许国平',
            //     sid: "10133",
            //     parentRealityId:'1001',//部门id
            //     dept: "研发中心",
            //     role: "管理员",


            state.session.userIdIM=userInfo.userInfo.userIdIM
            state.session.userInfo=userInfo.userInfo
            state.session.defaultTenat=(userInfo.userInfo.tendList||[]).find((item)=>item.defaultFlag==1)||{}


            if(!userInfo.tenantInfo){

                if(userInfo.requireTendId==true){
                    JZY.u.errorMsg('获取租户信息失败')
                    return false
                }



            }else{
                state.session.name=userInfo.tenantInfo.userName
                state.session.sid=userInfo.tenantInfo.userId


                let defaultJob=userInfo.tenantInfo.jobs.find((item)=>(item.isDefault==true||item.isDefault=='true'||item.isDefault==1))||{}



                state.session.parentRealityId=defaultJob.organizationId||''
                state.session.dept=defaultJob.organizationName||''
                state.session.role=userInfo.tenantInfo.roleNames||''


                state.session.tenantInfo=userInfo.tenantInfo



                state.session.defaultJob=(userInfo.tenantInfo.jobs||[]).find((item)=>item.isDefault=='true')||{}
            }




            localStorage.setItem('userInfo',JSON.stringify(state.session))


        }catch(e){
            console.warn('modify user finfo error--:',e)
        }




    },
    TOGGLE_LOADING(state,bool){
      state.isLoading=bool
    },
    UPDATE_LOCALE(state,obj){
      // console.log('state and obj:',state,obj)
      state.locale[obj.key]=obj.locale
    },
    TOGGLE_SCREEN_READY(state){
        state.isScreenReady=!state.isScreenReady;
    },
    MODIDY_NAME(state){
        state.name="SB"+Math.random();
    },
    // increment(state,price) {
    //     state.totalPrice += price;
    // },
    // decrement (state,price){
    //     state.totalPrice -=price;
    // },
    // ADD_COLUMN (state , newColumn) {
    //     if(newColumn){
    //         newColumn.id = state.columnsList.length+1;
    //         newColumn.time =  new Date();
    //         newColumn.number = Math.round(Math.random()*9+1);
    //         state.columnsList.push(newColumn);
    //     }
    // },
    // RDIT_COLUMN (state,newColumn,index) {
    //     state.columnsList[index] = newColumn;
    //
    // },
    // SORT_COLUMN (state,newColumnList) {
    //     if(newColumnList){
    //         console.log(newColumnList,"newColumnList")
    //         state.columnsList=[...newColumnList];
    //     }
    // },
    // DEL_COLUMN (state,index) {
    //         state.columnsList.splice(index,1);
    //
    // },
    UPDATE_COLUMN(state,newColumnList){
            console.log(newColumnList,"newColumnList")
            state.columnsList=[...newColumnList];
    },


    // SET_OFFICEEDIRID (state,id) {
    //     state.officeEditId(id);
    // },
    // SET_OFFICEDETAILID (state,id) {
    //     state.officeDetailId(id);
    // },
    //获取系统时间
    SET_SYS_TIME(state,time){
        state.session.sysTime = time;
    },
    //更新任务模块的左侧菜单条数
    TASK_SET_MENU_NUMBER( state , {num = '' , moduleType = ''} = {} ){
        state.taskModule.leftMenu[moduleType] = num;
    }
}
