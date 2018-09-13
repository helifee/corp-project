// import r from "@main/utils/xhr.js"
let s = {
    getContractList(param){
        let url = "/oa/contract/contractInfo/getContractMobilePage";
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
    getContractInfo(param){
        let url = "/oa/contract/contractInfo/getContractInfo";
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
    //合同变更详情
    getChangeInfo(id){
        let url = "/oa/contract/contractChange/get/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'GET',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    getPayList(param){
        let url = "/oa/contract/contractPayment/getContractMobilePage";
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
    getPayInfo(id){
        let url = "/oa/contract/contractPayment/get/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'GET',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //月度合同列表
    getTotalListByMonth(){
        let url = "/oa/contract/contractInfo/getTotalListByMonth/";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //年度
    getTotalListByYear(){
        let url = "/oa/contract/contractInfo/getTotalListByYear/";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //创建合同变更
    saveContractChange(param){
        let url = "/oa/contract/contractChange/save/";
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

    //获取合同类型列表
    getContractType(){
        let url = "/oa/contract/contractType/getContractTypeList";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //获取合同变更类型列表
    getContractChangeTypeList(){
        let url = "/oa/contract/contractChangeType/getContractChangeTypeList";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //合同主题
    getContractList(param){
        let url = "/oa/contract/contractInfo/page";
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
    //新增付款信息
    savePaymentInfo(param){
        let url = "/oa/contract/contractPayment/save";
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
    saveContractInfo(param){
        let url = "/oa/contract/contractInfo/save";
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    }
}
export default s;