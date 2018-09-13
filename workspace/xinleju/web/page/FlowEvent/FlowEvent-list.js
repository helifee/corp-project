
var newBizParticipant = function() {
    var dt = new Date();
    window.open('BizParticipant!edit.do?act=create', 'flow_' + dt.getTime(), opts);
};

var editBizParticipant = function(id) {
    var dt = new Date();
    window.open('BizParticipant!edit.do?id='+id, 'flow_' + dt.getTime(), opts);
};

var queryFlowEvent = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据加载中...");
     $("#frm").submit();
};