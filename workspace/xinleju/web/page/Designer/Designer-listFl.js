var h = screen.height;
var w = screen.width;
var opts = 'height=' + h + ',width=' + w + ',top=' + (screen.height - h) / 2 + ',left=' + (screen.width - w) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';

var coFlow = function(flowId) {
    var dt = new Date();
    window.open('Designer!index.do?act=check&flowId=' + flowId + '', 'flow_' + dt.getTime(), opts);
};

var editFlow = function(flowId) {
    var dt = new Date();
    window.open('Designer!index.do?act=edit&flowId=' + flowId + '', 'flow_' + dt.getTime(), opts);
};

var viewFlow = function(flowId) {
    var dt = new Date();
    window.open('Designer!index.do?act=view&flowId=' + flowId + '', 'flow_' + dt.getTime(), opts);
};

var newFlow = function() {
    var dt = new Date();
    var ctIdVar = $("#ctId").val();
    var serviceObjectDefineIdVar = $("#serviceObjectDefineId").val();
    window.open('Designer!index.do?act=create&ctId=' + ctIdVar + '&serviceObjectDefineId=' + serviceObjectDefineIdVar, 'flow_' + dt.getTime(), opts);
};

var moveFlow = function() {
	var dt = new Date();
	if ($("input[type='checkbox']").is(":checked")) {
		var checkIdBox = $("input[name='ids']:checked");
		var flowIds = "";
		for (var i = 0, j = checkIdBox.length; i < j; i++) {
			flowIds += checkIdBox[i].value + (i == j-1 ? "" : ",");
		}
		var ctId = $("#ctId").val();
		var url = "Designer!moveFlow.do?ctId=" + ctId + "&flowIds="+flowIds;
		var sFeatures = {
			dialogWidth : 300,
			dialogHeight : 320,
			scroll : 'yes'
		};
		var rv = showModalDialogOverride(url, window, sFeatures);
		if(rv){
			$("#frm").submit();
		}
	} else {
		alert("请在右边列表复选框至少选择一条记录转移！");
	}

}


var startFlow = function(flowId) {
	
    $.post('Designer!startFl.ajax', {
        flowId : flowId
    }, function(data) {
        alert("启动成功！");
    });
};

var queryFl = function(start){
	if (start >= 0) {
        document.getElementsByName('start')[0].value = start;
    }
	$('#frm').submit();
};
