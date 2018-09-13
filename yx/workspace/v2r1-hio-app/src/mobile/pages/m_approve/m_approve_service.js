// import r from "@main/utils/xhr.js"
let s = {
    //流程发起
    addFreeFlow(param){
        let url = "/instance/start";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    draftSaveFn(param){
        let url = "/instance/draftSave";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    getApproveDetail(param){
        let url = "/instance/flowView";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    submitApproveFn(param){
        let url = "/instance/approve";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    rejectApproveFn(param){
        let url = "/instance/reject";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //流程审批列表
    getApproveList(param){
        let url = "/approval/getPage";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    getNoReadList(param){
        let url = "/copy/getPage";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    getMyLunchList(param){
        let url = "/instance/getPage";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    getApproveNum(state){
        let url = "/instance/approval/listCount/"+state;
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    getQueryAttachId(param){
        let url = "flow/template/flowStartView";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //获取发起模板列表
    getTemplateList(){
        let url = "flow/category/getMyFlowCateGoryTemplate?sign=mobile";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    getTemplateListBySearch(param){
        let url = "flow/category/getAllList";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            data:param,
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //获取我的草稿
    getMyDraftList(param){
        let url = "flow/instance/getPage";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            data:param,
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //获取项目审批列表
    getProjectApproveList(param){
        let url = "flow/instance/getInstanceListByProjectId";
        url = JZY.xhr.transformUrl(url,'GLOBAL.ZHANG_CHAOYANG',true);
        return JZY.xhr.request({
            type:'POST',
            data:param,
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //获取项目的信息列表 跟进责任人id
    getProjectInfo(id){
        let url = "oa/project/projectInfo/queryProjectInfoByTeamPerson/"+id;
        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })

    },
    //根据id获取项目信息
    getProjectInfoById(id){
        // let url = "oa/project/projectInfo/get/"+id;

        //白名单，不做权限校验
        let url = "oa/project/projectInfo/queryWhitelistProject/"+id;

        url = JZY.xhr.transformUrl(url,'GLOBAL',true);
        return JZY.xhr.request({
            type:'get',
            url:url,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
}
export default s;