/**
 * Created by xph on 2017/6/30.
 */

//上来就执行
$(function () {
    //根据业务id加载数据
    applyId = $.xljUtils.getUrlParam("businessId");//业务id 即申请单id 平台默认拼接businessId=？
    //getOjtDemandById(applyId);
    queryId(applyId);
    getSysApplyById(applyId);
});
/**
 * 根据applyId获取id
 */
function queryId(applyId) {
    var uBody = "ojt/hrOjtDemand/queryId";
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'POST',
        url: uAll,
        data: JSON.stringify({
            id: applyId
        }),
        dataType: "JSON",
        contentType: "application/json",
        success: function (data) {
            var ff = data.result;
            getOjtDemandById(ff.id);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "加载试卷设置信息");
        }
    })
}
/**
 * 加载单据信息
 * @param applyId 单据id
 */
function getSysApplyById(applyId) {
    var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#id1").val(data.result.id);
            $("#name1").text(data.result.name);
            $("#code").text(data.result.code);
            //制单人
            $("#createrName").text(data.result.createrName);
            //经办人
            $("#applicant").text(data.result.applicantName);

            $("#companyName").text(data.result.companyName);
            $("#deptName").text(data.result.deptName);

            $("#applyDate").text(data.result.applyDate);
            var status = data.result.status;
            $("#sysApplyFrom").find("input[name='status']").val(status);
            var statusValue = $.hrUtils.getHRCodeNameById(status);
            $("#statusValue").text(statusValue);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化指标集请求失败");
        }
    })
}
/**
 * 根据id加载指标集信息
 */
function getOjtDemandById(id) {
    var uBody = "/ojt/hrOjtDemand/get/" + id + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            //根据结果集 解析、赋值、显示
            $("#name").text(data.result.name);
            if (data.result.type == 0) {
                var type = '内部';
            } else {
                var type = '外部';
            }
            $("#type").text(type);
            $("#chargeName").text(data.result.chargeName);
            $("#trainNum").text(data.result.trainNum);
            $("#trainStudent").text(data.result.trainStudent);
            $("#trainFee").text(data.result.trainFee);
            $("#stratDate").text(data.result.stratDate);
            $("#endDate").text(data.result.endDate);
            $("#trainAddress").text(data.result.trainAddress);
            $("#trainTeacher").text(data.result.trainTeacher);
            $("#trainAim").text(data.result.trainAim);
            $("#trainContent").text(data.result.trainContent);
            $("#trainClass").text(data.result.trainClass);
            var orgName = $.hrUtils.getHROrgNameById(data.result.orgId);
            $("#orgName").text(orgName == undefined ? data.result.orgId : orgName);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化培训需求请求失败");
        }
    })
}
