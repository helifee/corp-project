var path; 
var businessId;
$(function() {
	var curWwwPath = window.document.location.href;
    var pathName =  window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    path = localhostPaht + projectName;

	var currentDay = getUrlParams().currentDay;
	if(currentDay){
		$('#beginTime').text(currentDay + ' 00:00');
		$(':input[name="beginTime"]').val(currentDay + ' 00:00');
		$('#endTime').text(currentDay + ' 23:59');
		$(':input[name="endTime"]').val(currentDay + ' 23:59');
	}

});

(function($) {
    $.init();
    var btns = $('.my-mui-time');
    btns.each(function(i, btn) {
		var optionsJson = this.getAttribute('data-options') || '{}';
		var options = JSON.parse(optionsJson);
		var id = this.getAttribute('id');
		var picker = new $.DtPicker(options);
        btn.addEventListener('click', function() {
			var inputBd = this.nextSibling.nextSibling;
            picker.show(function(rs) {
                btn.value = rs.text;
				btn.innerText = rs.text;
				btn.innerHTML = rs.text;
				inputBd.value = rs.text;
				picker.hide();
            });
        }, false);
    });

	var $input = $("input");
	$input.each(function(i,bd){
		bd.addEventListener('focus',function(){
			$("header")[0].style.top = 0;
		});
		bd.addEventListener("blur",function(){
			$("header")[0].style.top = 0;
		});
	});
})(mui);


function saveAndCloseMe(){
	var formDataArray = $("#dataForm").serializeArray();
	var dataDto = {};
	for(var i in formDataArray){
		dataDto[formDataArray[i].name] = formDataArray[i].value;
	}
	var content = dataDto.content;
	var beginTime = dataDto.beginTime;
	var endTime = dataDto.endTime;

	if(content==''){
		mui.toast('事项内容不能为空！',{ duration:'long', type:'div' });
		return;
	}
	if(beginTime==''){
		mui.toast('开始日期不能为空！',{ duration:'long', type:'div' });
		return;
	}
	if(endTime==''){
		mui.toast('结束日期不能为空！',{ duration:'long', type:'div' });
		return;
	}
	beginTime += ':00';
	endTime += ':00';
	beginTime = beginTime.replace(/-/g,'/');
	endTime = endTime.replace(/-/g,'/');
	if(new Date(endTime).getTime()<new Date(beginTime).getTime()){
		mui.toast('结束日期不能小于开始日期！',{ duration:'long', type:'div' });
		return;
	}

	delete dataDto.typeName;
	dataDto.source = "协同办公";
	dataDto.delflag = false;
	dataDto.periodProceeding = 0;
	
	dataDto.type = "PERSONAL_PROCEEDING";
	var urlText = path+"/oa/workSchedule/save";
	$.ajax({
		type: "POST",
		url: urlText,
		data: JSON.stringify(dataDto),
		contentType: 'application/json',
		dataType: 'JSON',
		success:function(retData){
			var success = retData.success;
			window.location.href = path+"/mobile/schedule/schedule_list.html?hideHeader=true&time="+new Date().getTime();
		},
		error:function (xhr, textStatus, errorThrown) {
			//alert(JSON.stringify(xhr));
			mui.toast('保存失败！',{ duration:'long', type:'div' });
		}
	});
}

function cancelAction(){
	window.location.href = path+"/mobile/schedule/schedule_list.html?hideHeader=true&time="+new Date().getTime();
}

function getUrlParams() {
	var urlParam = location.search;
	var urlParamObj = "";
	if(urlParam){
		urlParam = urlParam.replace("?", "").replace(/&/g, "\",\"");
		urlParam = urlParam.replace(/=/g, '":"');
		if (urlParam != "") {
			try {
				urlParamObj = JSON.parse('{"' + urlParam + '"}');
			}catch(e) {
				urlParamObj = {};
			}

		}else{
			urlParamObj = {};
		}
	}else{
		urlParamObj = {};
	}
	return urlParamObj;
}