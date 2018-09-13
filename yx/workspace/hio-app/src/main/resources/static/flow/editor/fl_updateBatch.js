var ids;
$(function() {
	ids = window.opener.updateIds;
});

/**
 * 打开选择默认标题配置页面
 */
function openToSelectVariable(){
	var objectId = $("#businessObjectId").val();
	var objectName = $("#businessObjectName").val();
	window.open(encodeURI("fl_variable.html?isDeafultObject=true"));
}
/**
 * 保存
 */
function  saveAll() {
	var flowTitle = $("#flowTitle").val();
	var titleUpdate = $('input:radio[name="titleUpdate"]:checked').val();
	var approvalRepeat = $("#approvalRepeat").val();
    var postMultiPerson = $("#postMultiPerson").val();
    var retract = $('input:radio[name="retract"]:checked').val();
	if(!flowTitle && !titleUpdate && !approvalRepeat && !postMultiPerson && !retract ){
        pop_tip_open("blue","请修改属性!");
        return;
	}
	var paramData = {
		ids:ids,
        flowTitle:flowTitle,
        titleUpdate:titleUpdate,
        approvalRepeat:approvalRepeat,
        postMultiPerson:postMultiPerson,
        retract:retract
	};
    $.ajax({
        type: "POST",
        url: serviceUrl + "flow/fl/updateFlowsByids",
        data: JSON.stringify(paramData),
        dataType:"json",
        contentType : 'application/json;charset=utf-8', //设置请求头信息
        success: function(data){
            if(data.success&&data.result){
                $.xljUtils.tip("green","设置成功！");
                window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");
                closeWin();
            }
        },
        error: function(xhr){
            $.xljUtils.getError(xhr.status);
        }
    });
}

function  closeWin() {
	window.close();
}
/**
 * 从新页面返回来的数据
 * @param showTitle
 * @param hiddenTitleId
 */
function setNewTitleVariable(showTitle, hiddenTitleId){
    $("#flowTitleShow").val(showTitle);
    $("#flowTitle").val(hiddenTitleId);
}