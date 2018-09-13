
let s = {
    //获取当前页面的token
    getToken(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let locationTemp = window.location.hash;
        locationTemp = locationTemp ? locationTemp.split('?') : "";
        locationTemp = locationTemp ? locationTemp[1] : "";
        // var sessionToken = sessionStorage.getItem("authorization");
        // if(sessionToken){
        //     return sessionToken;
        // }
        var r = locationTemp ? locationTemp.match(reg) : null;
        if (r != null) return unescape(r[2]); return null;
    },
    ajaxfn(option){
        let param = {
            type : option.type || "POST",
            url : option.url,
            timeout : 15*1000,
            beforeSend: function(xhr) {  
                let sessionToken = sessionStorage.getItem("authorization");
                let sessionTendId = sessionStorage.getItem("tendId");
                
                let token = s.getToken('accessToken') || sessionToken;
                // let token = "af7b5d55-06e9-4d0e-baed-0346018777a0"; 
                let tendId = s.getToken('tendId') || sessionTendId;
                if(token && tendId){
                    xhr.setRequestHeader("Authorization", token ); 
                    xhr.setRequestHeader("tendId", tendId ); 
                }   
             },  
            statusCode: {
                404: function() {
                    // console.log(this)
                    // this.$message("404")
                },
                500:function(){
                    // console.log(this)
                    // this.$message("系统出现错误，请稍后重试")
                }
                ,
                401:function(){
                    // console.log(this)
                    // this.$message("登陆失败")
                }
            }        
        }
        $.extend(param,option);
        this.oldXhr = $.ajax(param)
        this.aborts.push(this.oldXhr);

    },
    //所有ajax请求
    aborts:[],
    //上一个ajax请求
    oldXhr:null,
    setAjaxFn(option){
        let my = this;
        return new Promise(function(resolve,reject){
            let r = {
                success(data,textStatus,setting){

                    if(textStatus == "success" && data.status == "200"){
                        resolve(data)
                    }else{
                        reject(data);
                        if(option.isHiddenError){
                            return;
                        }
                        JZY.u.errorMsg(data.message);
                    }
                },
                error(data){
                    reject(data);
                },
                complete(data){
                    resolve(data)
                }
            }
            
            $.extend(option,r);
            option.serviceName = option.serviceName ? option.serviceName : 'GLOBAL.XSD';
            option.url = JZY.xhr.transformUrl(option.url,option.serviceName,true);
            my.ajaxfn(option);
        })
        // return q
    },
    //商机 订单 分页
    getOpportunitiesPage(param,type){
        let url = type ? '/crm/order/page': '/crm/opportunities/page';
        
        let params = {
            url:url,
            data:param,
            contentType:'application/json' 
        }
        return this.setAjaxFn(params);
    },
    //获取商机阶段分类
    async getopportunitiesStages(params){
        let url = "/crm/opportunities/queryGroupStages";
        let param = {
            type:'POST',
            url:url,
            data:params,
            contentType:'application/json' 
        }
        return await this.setAjaxFn(param);
    },
    //商机初始化（修改）
    async getOpportunities(Id,type){
        let url = (type == true || type == 'true' ) ? '/crm/order/get/' : '/crm/opportunities/get/';
        url = url + Id;
        let param = {
            type:'POST',
            url:url
        }
        return await this.setAjaxFn(param);
    },
    async getUuid(type){  //订单和商机sid
        let url = type ? "/crm/order/getAttachmentParam" : "/crm/opportunities/getAttachmentParam";
        let params = {
            type:'POST',
            url:url
        }
        return await this.setAjaxFn(params);
    },
    //商机保存 新增 修改
    async saveOpportunities(param,type){
        let url = type ? "/crm/order/save": "/crm/opportunities/save";
        // url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        let params = {
            type:'POST',
            url:url,
            data:param.data,
            contentType:'application/json' 
        }
        $.extend(params,param);
        return await this.setAjaxFn(params);
    },
    //删除商品 订单
    async delBusiness(p,type){
        let url = type ? '/crm/order/delete/' : '/crm/opportunities/delete/';
        url = url + p.id;
        let params = {
            type:'POST',
            url:url
        }
        return await this.setAjaxFn(params);
    },
    //产品列表
    async getProductByType(param){
        let url = "/crm/product/pageToSelect";
        // let url = "/crm/product/page"
        let params = {
            type:'POST',
            url:url,
            data:param,
            contentType:'application/json' 
        }
        return await this.setAjaxFn(params);
    },
    getFollow(param,type){
        let url = ( type == "plan" )? "/crm/followPlan/queryPlanList" : "/crm/followHis/queryHisList";
        let params = {
            type:'POST',
            url:url,
            data:param,
            contentType:'application/json'
        }
        return this.setAjaxFn(params);
    },
    //所有联系人 根本客户获取联系人
    async getContactsList(param){
        let url = "/crm/contact/queryAll";
        let params = {
            type:'POST',
            url:url,
            data:param,
            contentType:'application/json'
        }
        return await this.setAjaxFn(params)
    },
    //同一客户名称商机名称不重复验证
    valNamevalite(params,seting){
        let url = "/crm/opportunities/valName";
        let param = {
            type:'POST',
            url : url,
            data: params,
            contentType:'application/json' 
        }
        jQuery.extend(param,seting);
        return this.setAjaxFn(param);
    },
    //删除商品 订单
    delBusiness(p,type){
        let url = type ? '/crm/order/delete/' : '/crm/opportunities/delete/';
        url = url + p.id;
        let params = {
            type:'POST',
            url:url
        }
        return this.setAjaxFn(params);
    },
}
export default s;