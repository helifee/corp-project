import {alertMsg} from '@/utils/util'

let c_service = {
    goods :[], 

    setGoodsList(item){
        this.goods = item;
    },
    getGoodsList(item){
        return this.goods;
    },
    //获取url param
    getParam(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let locationTemp = window.location.hash;
        locationTemp = locationTemp ? locationTemp.split('?') : "";
        locationTemp = locationTemp ? locationTemp[1] : "";
        var r = locationTemp ? locationTemp.match(reg) : null;
        if (r != null) return unescape(r[2]); return null;
    },
    ajaxfn(option){
        let param = {
            type : option.type || "GET",
            url : option.url,
            beforeSend: function(xhr) {  
                // let token = "af7b5d55-06e9-4d0e-baed-0346018777a0"; 
                // xhr.setRequestHeader("Authorization", "Bearer " + token ); 
                let token = JZY.c.AUTO_LOGIN.headers.authorization; 
                xhr.setRequestHeader("Authorization", token ); 
             },  
            statusCode: {
                404: function() {
                    // return alertMsg({
                    //     message : "404错误",
                    //     type: "error"
                    // })
                },
                500:function(){
                    // return alertMsg({
                    //     message : "系统出现错误，请稍后重试",
                    //     type: "error"
                    // })
                }
                ,
                401:function(){
                    // return alertMsg({
                    //     message : "登陆失败",
                    //     type: "error"
                    // })
                }
            }        
        }
        jQuery.extend(param,option);
        jQuery.ajax(param);
    },
    setAjaxFn(option,isMsg){
        let my = this;
        return new Promise(function(resolve,reject){
            let r = {
                success(data,textStatus){
                    if(textStatus == "success"){
                        resolve(data)
                    }else{
                        reject(data);
                        if(isMsg){
                            alertMsg({
                                message : data.err.message,
                                type: "error"
                            })
                        }
                        
                    }
                    
                },
                error(data){
                    reject(data);
                    if(isMsg){
                        alertMsg({
                            message : data.err.message,
                            type: "error"
                        })
                    }
                }
            }
            jQuery.extend(option,r);
            my.ajaxfn(option);
        })
        // return q
    },
    //删除商品 订单
    delBusiness(p,type){
        let url = type ? '/crm/order/delete/' : '/crm/opportunities/delete/';
        url = url + p.id;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        let params = {
            type:'POST',
            url:url,
            context:p.context
        }
        return this.setAjaxFn(params);
    },
    //获取产品分类列表
    getProductCategory (param,type){
        let url = type ? ("/crm/productCategory/queryCategory?pid=" + param.pid + "&status=" + param.status): "/crm/productCategory/queryCategoryTree?status="+param;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
        
        })
        
    },
    
    //保存产品分类
    saveProductCategory(param){
        let url = "/crm/productCategory/save";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        let params = {
            type:'POST',
            url:url,
            data:param,
            contentType:'application/json' 
        }
        jQuery.extend(params,param);
        return this.setAjaxFn(params);
        // return JZY.xhr.request({
        //     type:'POST',
        //     url:url,
        //     data:param,
        //     headers:{
        //         'Content-Type': 'application/json'
        //     }
        // })
    },
    
    //新增产品
    saveProducts(param){
        let url = "/crm/product/save";      
        let params = {
            type:'POST',
            url:url,
            data:param,
            contentType:'application/json' 
        }
        jQuery.extend(params,param);
        return this.setAjaxFn(params);
    },
    //产品详情 或 产品分类节点详情
    getProductById(id,type){
        let url = (type=='p') ? ("/crm/product/get/") : ("/crm/productCategory/get/");
        url = url + id;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url
        })
    },
    //删除产品或分类
    operateProduct(Id,type){
        let url = (type == "p") ? "/crm/product/delete/":"/crm/productCategory/delete/";
        url = url + Id;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url
        })
    },
    //产品列表
    getProductByType(param,type){
        let url = (type=="other") ? "/crm/product/pageToSelect" :"/crm/product/page";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //所有联系人 根本客户获取联系人
    getContactsList(param){
        let url = "/crm/contact/queryAll";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            data:param
        })
    },
    //商机保存 新增 修改
     saveOpportunities(param,type){
        let url = type ? "/crm/order/save": "/crm/opportunities/save";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        let params = {
            type:'POST',
            url:url,
            data:param.data,
            contentType:'application/json' 
        }
        jQuery.extend(params,param);
        return this.setAjaxFn(params);
    },
    //业务id
    getUuid(type){  //订单和商机sid
        let url = type ? "/crm/order/getAttachmentParam" : "/crm/opportunities/getAttachmentParam";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url
        }).then( (data)=>{
            try{
                return data;
            }catch (e){
                return false;
            }
        })
    },
    // 
    getCustomerList(param){
        let url = '/crm/customer/searchNames?name=' + param;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url
        })
    },
    //商机列表 订单列表
    getOpportunitiesPage(param,type){
        let url = type ? '/crm/order/page': '/crm/opportunities/page';
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //商机初始化（修改）
    async getOpportunities(Id,type){
        let url = type ? '/crm/order/get/' : '/crm/opportunities/get/';
        url = url + Id;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  await JZY.xhr.request({
            type:'POST',
            url:url
        })
    },
    //联系人-列表/客户级联联系人 // 商机-商机列表/客户关联商机查询
    getjointlevelqueryAll(param,type){
        let url = type? "/crm/opportunities/queryList" : "/crm/contact/queryAll";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        let params = {
            type:'POST',
            url:url,
            data:param.data,
            contentType:'application/json' 
        }
        jQuery.extend(params,param);
        return this.setAjaxFn(params);
    },
    //获取商机阶段分类
    getopportunitiesStages(params){
        let url = "/crm/opportunities/queryGroupStages";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        let param = {
            type:'POST',
            url:url,
            data:params,
            contentType:'application/json' 
        }
        return this.setAjaxFn(param);
    },
    //获取商机下的产品
    async getOpportunitiesProduct(params){
        let url = "/crm/opportunities/product?oppoId=" + params;
        let param = {
            type:'POST',
            url:url
        }
        return await this.setAjaxFn(param);
    },
    //产品类别
    filterProducts(arr){
        if(arr && arr.length){
            arr.forEach( (row,index) =>{
                row.categoryname = 
                            row.categoryBaseName +  (row.categoryName ? (" - " + row.categoryName) : "");
            })
        }
    },
    //同一客户名称商机名称不重复验证
    valNamevalite(params){
        let url = "/crm/opportunities/valName";
        let param = {
            type:'POST',
            url : url,
            data: params,
            contentType:'application/json' 
        }
        return this.setAjaxFn(param);
    },
    //商机详情页面各tab数量查询
    //客户详情页面各tab数量查询
    async getStatistical(p,type){
        let url = !type ? "/crm/opportunities/statistical" : "/crm/customer/statistical";
        let params = JSON.stringify(p);
        let param = {
            type:'POST',
            url : url,
            data: params,
            contentType:'application/json' 
        }
        return await this.setAjaxFn(param);
    },
    //验证产品名称是否可用
    getProductValName(p){
        let url = "/crm/product/valName";
        let params = JSON.stringify(p);
        let param = {
            type:'POST',
            url : url,
            data: params,
            contentType:'application/json' 
        }
        return this.setAjaxFn(param);
    },
    //验证产品名称是否可用
    getProductCategoryValName(p){
        let url = "/crm/productCategory/valName";
        let params = JSON.stringify(p);
        let param = {
            type:'POST',
            url : url,
            data: params,
            contentType:'application/json' 
        }
        return this.setAjaxFn(param);
    },
    //验证商机订单中的产品是否有过修改
    async getProductValProductInfo(p){
        let url = "/crm/product/valProductInfo";
        let params = JSON.stringify(p);
        let param = {
            type:'POST',
            url : url,
            data: params,
            contentType:'application/json' 
        }
        return await this.setAjaxFn(param);
    }
    

   
    

}
export default c_service;