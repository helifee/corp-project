let s = {
    getToken(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let locationTemp = window.location.hash;
        locationTemp = locationTemp ? locationTemp.split('?') : "";
        locationTemp = locationTemp ? locationTemp[1] : "";
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
                let tendId = s.getToken('tendId') || sessionTendId;
                if(token && tendId){
                    xhr.setRequestHeader("Authorization", token ); 
                    xhr.setRequestHeader("tendId", tendId ); 
                }   
             },  
            statusCode: {
                404: function() {

                },
                500:function(){

                }
                ,
                401:function(){

                }
            }        
        }
        $.extend(param,option);
        $.ajax(param);
    },
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
            option.serviceName  = option.serviceName ? option.serviceName : 'GLOBAL.COMPONENTS.WANG_TAO';
            option.url = JZY.xhr.transformUrl(option.url,option.serviceName,true);
            my.ajaxfn(option);
        })
    },

}
export default s;
