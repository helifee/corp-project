$(function() {
	var urlParam = $.xljUtils.getUrlParams();
    var act, id;
    if(urlParam){
   	 act = urlParam.act;
   	 id = urlParam.id;
    }
	getOfficeRecordInfo(id);	//获取库存信息
	
	//关闭按钮
	$(".closeWin").click(function() {
		window.close();
	})
	
	$('#buyPrice, #inCount').blur(function() {
		var _this = $(this);
		var v = _this.val() - 0;
		if(!v) {
			 $.xljUtils.tip("red", '请输入合法的数字');
			 _this.val('');
		 }else if(v < 0) {
			 $.xljUtils.tip("red", '请输入大于0的数字');
			 _this.val('');
		 }else {
			 _this.val(v);
			 var a = $("#buyPrice").val() - 0;
			 var b = $("#inCount").val() - 0;
			 var countMoney = a * b;
			 $('#countMoney').val(countMoney);
		 }
	})
	
	//修改库存
	$('.saveResult').click(function() {
		var officeSupplyInfoFormArr= $("#officeSupplyInfoForm").serializeArray();
		var formDataDto={};
		for(var i in officeSupplyInfoFormArr){
			formDataDto[officeSupplyInfoFormArr[i].name]=officeSupplyInfoFormArr[i].value;
		}
		$.ajax({
			url: hostUrl + "oa/office/officeRecord/update/" + id,
			type: "PUT",
			dataType:"JSON",
			data: JSON.stringify(formDataDto),
			contentType: "application/json",
			success: function(data) {
				if(data.success) {
					$.xljUtils.tip("green", "修改成功")
     			   window.opener.opener.location.reload();  
     			   window.close();
     		   } else {
     			  $.xljUtils.tip("red", "修改失败")
     		   } 
			}
		})
	})
})

function getOfficeRecordInfo(id) {
	$.ajax({
		url: hostUrl + "oa/office/officeRecord/get/" + id,
		type: "GET",
		success: function(data) {
			if(data && data.success && data.result) {
				var result = data.result;
				$('#stockName').val(result.stockName);
				$('#stockNum').val(result.stockNum);
				$('#stockCount').val(result.stockCount);
				$('#buyPrice').val(result.buyPrice);
				$('#inCount').val(result.inCount);
				$('#countMoney').val(result.countMoney);
			}
		}
	})
}

