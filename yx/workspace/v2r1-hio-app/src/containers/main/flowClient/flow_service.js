import  utils  from "@/containers/main/flowClient/utils.js"

let f_service = {
    //获取uuid
    getUuidXhr (count){

        // let url = "/template/getGuuids";
        let url = "/flow/template/getGuuids"+"?random=" + Math.random();
        url = JZY.xhr.transformUrl(url,'GLOBAL.COMPONENTS.ZCY_TEST',true);
        return  JZY.xhr.request({
                type:'POST',
                url:url,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            // return JZY.xhr.post(url,null,{alertSuccess:false})
        // return JZY.xhr.request(url,{count:count})
        
    },
    //获取流程模版
    getAllXml(fid){
        // fid = "1002";
        // let url = "/template/getFlowTemplateParam?code="+fid;
        let url = "/flow/template/getFlowTemplateParam?code="+fid;
        url = JZY.xhr.transformUrl(url,'GLOBAL.COMPONENTS.ZCY_TEST',true);
        return  JZY.xhr.request({
            type:'GET',
            url:url
        })
    },
    //保存流程模版
    // param flowTemplateId ac step
    saveFlData(params){
        // let url = "/template/saveFlowTemplateConfigParam";
        let url = "/flow/template/saveFlowTemplateConfigParam";
        url = JZY.xhr.transformUrl(url,'GLOBAL.COMPONENTS.ZCY_TEST',true);
        return  JZY.xhr.request({
                type:'POST',
                url:url,
                data:params,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        // return JZY.xhr.request({type:"post"},url,params,{alertSuccess:false});
    },
    
    //初始化流程数据(创建节点时获取其参数)
    async initFlDatas (param){
        let my = this;


        let data = await my.getAllXml(param.flId);
        my.currentFLSid = data[0].sid || "";
        return data[0];
            // .then(function(data){
            //     //有流程模块时保存模块sid
            //     my.currentFLSid = data[0].sid || "";
                
            //     resolve(data[0]);
            // });
        
    },
    //验证编码重复性
    checkFlowCode (flCode){
        let my = this;
        let q = new Promise(function(resolve,reject){
            if(my.hasCode){
                resolve(true);
            }else{
                let url = "/flow/fl/queryFlList";
                url = JZY.xhr.transformUrl(url,'GLOBAL.COMPONENTS.ZCY_TEST',true);
                JZY.xhr.request(url,{code:flCode})
                .then(function(data){
                    if (data.success) {
                        let dataRes = data.result;
                        my.hasCode = true;
                        if(dataRes.list != null && dataRes.list.length > 0) {
                            my.hasCode = false;
                        }
                    }else{
                        my.hasCode = false;
                    }
                    resolve(my.hasCode)
                })
            }
        })
        return q;
    },
    //初始化流程默认变量
    async initVariableList (code,type,params){
        // let url = "/linkLine/flowExpression?code=" + code //流程实例
        let url = "/flow/linkLine/flowExpression?code=" + code 
        url = JZY.xhr.transformUrl(url,'GLOBAL.COMPONENTS.ZCY_TEST',true);
        return await JZY.xhr.request({
            type:'GET',
            url:url
        })
    },
    //表达式验证
    validateFormula(param){

        // let url = '/linkLine/validate?expression='+param;
        let url = '/flow/linkLine/validate?expression='+param;
        // return JZY.xhr.get(url,param,{alertSuccess:false})
        url = JZY.xhr.transformUrl(url,'GLOBAL.COMPONENTS.ZCY_TEST',true);
        return  JZY.xhr.request({
            type:'GET',
            url:url
        })

    }
}
export default f_service;