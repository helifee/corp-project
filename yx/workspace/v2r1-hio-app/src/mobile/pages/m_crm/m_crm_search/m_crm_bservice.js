// import r from "@main/utils/xhr.js"
let s = {
    saveCustomer(param){
            let url = "/crm/customer/save";
            url = JZY.xhr.transformUrl(url,'GLOBAL',true);
            return JZY.xhr.request({
                type:'POST',
                url:url,
                data:param,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        },
    getCustomerInfoById(id){
        let url = "/crm/customer/getForMobile/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    searchCustomerByName(param){
        let url = "/crm/customer/searchNames";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //获取所有联系人
    getLinkerListAll(){
        let url = "/crm/contact/queryAll";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //联系人列表--分页
    getLinkerList(params){
        let url = "/crm/contact/pageForMobile";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:params,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //获取联系人单条数据
    getLinkerInfoById(id){
        let url = "/crm/contact/get/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:{},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //保存联系人
    saveLinkerFn(param){
        let url = "/crm/contact/save";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //销售排行榜
    getMonthRankingsFn(){
        let url = "/crm/salesRankings/monthRankings";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //今日跟进计划
    getPlanListFn(){
        let url = "/crm/followPlan/queryFollowPlan";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //获取首页商机
    getOpporListFn(){
        let url = "/crm/opportunities/queryOpportunities";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //获取跟进记录
    queryHisList(params){
        let url = "/crm/followHis/queryHisList";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:params,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //获取跟进计划
    queryPlanList(params){
        let url = "/crm/followPlan/queryPlanList";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:params,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //跟进计划详情
    getFollowPlanById(id){
        let url = "/crm/followPlan/get/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //跟进记录详情
    getFollowLogsById(id){
        let url = "/crm/followHis/get/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //获取跟进记录的附件参数
    getFollowAttachParam(){
        let url = "/crm/followPlan/getAttachmentParam";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //历史跟进记录
    getPlanList(params){
        let url = "/crm/followPlan/queryFollowPlanList";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:params,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //保存跟进记录
    saveFollow(param){
        let url = "/crm/followPlan/saveFollow";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //根据客户名称 模糊查询
    searchCustomer(val){
        let url = "/crm/customer/searchNames?name="+val;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //删除联系人
    deleteLinkerById(id){
        let url = "/crm/contact/delete/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //获取客户列表 --有分页
    getCustomerList(param){
        let url = "/crm/customer/page/";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //客户作废
    deleteCustomer(id){
        let url = "/crm/customer/repealed/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //删除跟进计划
    deletePlan(id){
        let url = "/crm/followPlan/delete/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    },
    //获取客户里的动态列表
    getDyanmicList(param){
        let url = "/crm/customer/getAll/";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //客户详情页面---跟进计划 记录 等
    getCusDetailInfo(param,url){
       url = JZY.xhr.transformUrl(url,'GLOBAL',true);
       return JZY.xhr.request({
           type:'POST',
           url:url,
           data:param,
           headers:{
               'Content-Type': 'application/json'
           }
       })
    },
    //获取附件id
    getAttachmentParam(){
        let url = "/crm/customer/getAttachmentParam/";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    }
}
export default s;