/**
 * lixd
 * 系统申请审批单js
 *
 */
//审批访问的路径
//var spurl="http://192.168.3.84:8080/";
//var spurl="http://www.testing-xyre.com/";
//var spurl="http://192.168.3.26:8080/";
/**
 * 通过业务编码发起
 * @param businessObjectCode
 * @param businessId
 */
function toApplyByObjectCode(businessObjectCode, businessId) {
    window.open(SPURL+"platform-app/flow/runtime/approve/start.html?businessObjectCode=" + businessObjectCode + "&businessId=" + businessId);
}
/**
 * 通过流程编码发起
 * @param flCode
 * @param businessId
 */
function toApplyByFlCode(flCode, businessId) {
    window.open(SPURL+"platform-app/flow/runtime/approve/start.html?flCode=" + flCode + "&businessId=" + businessId);
}
/**
 * 查询审批信息
 * @param businessId 业务数据ID（必输项），即申请表id
 * @param flCode 流程模板编码（必输项）
 * @param appId 注册的系统编码 默认HR
 * @param userId 用户ID，为空的话默认为平台当前用户。
 */
function toFlowView(businessId, flCode, appId, userId) {
    // window.open(SPURL+"platform-app/flow/runtime/approve/flow_view.html?flCode=" + flCode + "&businessId=" + businessId + "&appId=HR&userId=");
    //新的查询路径，发起人可以撤回未经审批的审批流
    window.open(SPURL+"platform-app/flow/runtime/approve/flow.html?flCode=" + flCode + "&businessId=" + businessId + "&appId=HR&userId=");
}
/**
 * 嵌套到平台上展示业务信息的页面
 * 设置iframe的高度
 */
function setIframeHeight() {
	//隐藏滚动条
    $('body').css({'min-width':'100%',"overflow":"hidden"});
    // if (window.parent&&window.parent.document.bizForm){
     //    var bizForm = window.parent.document.bizForm;
     //    // $(window.parent.document.getElementById('bizForm')).height(bizForm.document.getElementsByTagName('body')[0].scrollHeight);
     //    var mheight=Math.max(bizForm.document.body.scrollHeight,bizForm.document.body.clientHeight);
     //    $(window.parent.document.getElementById('bizForm')).height($(document.body).height());
    // }else{
     //    // ff
     //    // var iframeBody = document.getElementById('bizForm').contentDocument.body;
     //    // b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
     //    var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
     //    if(iframeBody[0]!=undefined){
     //        iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight+20);
     //    }
    // }
    // try{
     //    $(window.parent.document.getElementById('bizForm')).width('100%');
    // }catch (e){
    //
    // }
    //处理跨域问题
    var topWinSrc;
    try{
        topWinSrc = window.top.location.href;
        if(topWinSrc.indexOf('#')!=-1){
            topWinSrc = topWinSrc.substring(0,topWinSrc.indexOf('#'));
        }
        window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
    }catch(e){
        topWinSrc = $.xljUtils.getUrlParam('topWinSrc');
        if(topWinSrc){
            window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
        }
    }
}


/**
 * 测试：获取业务对象接口变量
 * 因为不同业务对象的变量不一样，各业务需要自己写
 * @param uBody 请求路径
 * @param businessId 业务ID",（必输项）
 * @param businessObjectCode 业务对象编码
 * @param flCode 流程模板编码
 */
function getBusinessObjectVar(uBody,businessId,businessObjectCode,flCode) {
    var uBody = uBody;
    var uAll = hostUrl + uBody;
    var postData = {};
    postData.businessId = businessId;
    postData.businessObjectCode = businessObjectCode;
    postData.flCode = flCode;
    $.ajax({
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        url: uAll,
        success: function (xhr) {
            if (xhr.success) {
                console.log(xhr.result);
                pop_tip_open("blue", xhr.msg);
            } else {
                pop_tip_open("red", xhr.msg);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取失败");
        }
    })
}

/**
 * 测试：状态回调接口
 * 公共的接受状态变化的接口
 * @param businessId 业务ID
 * @param businessObjectCode 业务对象编码
 * @param status 流程审批状态(平台审批单的状态) (1-运行中、2-正常完成、3-撤回、4-打回、7-作废、9-挂起)
 * @param instanceId 流程实例ID
 * @param categoryId 附件分类ID（仅校稿环节有）
 */
function statusCallBack(businessId,businessObjectCode,status,instanceId,categoryId) {
    var uBody = "/sys/sysApply/queryStatusCallBack";
    var uAll = hostUrl + uBody;
    var postData = {};
    debugger;
    postData.businessId = businessId;
    postData.businessObjectCode = businessObjectCode;
    postData.status = status;
    postData.instanceId = instanceId;
    postData.categoryId = categoryId;
    $.ajax({
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        url: uAll,
        success: function (xhr) {
            if (xhr.success) {
                console.log(xhr.result);
                pop_tip_open("blue", xhr.msg);
            } else {
                pop_tip_open("red", xhr.msg);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取失败");
        }
    })
}