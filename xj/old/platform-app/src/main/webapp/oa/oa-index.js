/**
 * erp_cloud_platform oa-index Created by dingguanghuai on 2017/4/11.
 * @author dingguanghuai
 * @date 2017/4/11
 */
var baseUrl = '/platform-app/';
var hostUrl = '/platform-app/';
$(function () {

    function initPortalWithPermision() {
        $.ajax({
            url:hostUrl + 'oa/portal/portalPage/getPortalWithPermision?_time='+new Date().getTime(),
            type:'GET',
            async:false,
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){
                    var result = resultData.result;
                    if(result) {
                        var portalPageId = result.id;
                        window.location.href = hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+portalPageId+'&_time='+new Date().getTime();
                    }else{
                       // $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
                    }

                }else{
                  //  $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
                }
            },
            error:function (xhr) {
              //  $.xljUtils.getError(xhr.status);
            }

        });
    }

    initPortalWithPermision();
});