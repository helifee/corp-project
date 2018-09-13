/**
 * Created by ztf on 2017/8/10.
 */
var urlParamJson = $.xljUtils.getUrlParams();
$(function () {
	initFormData();
	 //保存
    $('#saveBtn').on('click',function () {
        $('#logoForm').attr('data-validate-success','saveForm("save")');
        $('#logoForm').submit();
    });
    $('#closeWindowBtn').on('click',function () {
    	 newwin = window.open("","_parent","");  
         newwin.close();
    });
});

/**
 * 初始化表单数据
 */
function initFormData() {
	//添加图标组件
	$('#selectCaptionName').xljIconRelationSelector({
		saveCallback: function(selectedData ,ele) {
			$("#url").val($(selectedData[0].url).attr('src'));
		}
	});
    var idVal = urlParamJson.id;
    $.ajax({
        url:hostUrl+'sys/sysLogo/get/'+idVal+'?time='+Math.random(),
        type:'GET',
        dataType:'JSON',
        success:function (resultData) {
            if(resultData&&resultData.success){
                var result = resultData.result;
                $("#id").val(result.id);
                $("#name").val(result.name);
				$("#url").val(result.url);
                // if(result.pic){
                // 	$("#newImg").attr('src',"data:image/jpeg;base64,"+result.pic);
	             //    $("#newImg").attr('width',"132px");
	             //    $("#newImg").attr('height',"30px");
	             //    $('#newImg').next().html("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
	             //    $('#logoIcon').replaceWith('<input type="file" id="logoIcon"  onchange="newFile(this)" name="icon" multiple="true" class="valid" accept="image/*" aria-invalid="false"/>');
	             //    $("#isDelPic").val("1");
	             //    $("#newImg").show();
                // }else{
                // 	$("#newImg").hide();
                // }
            }
        }
    });
}

/**
 * 初始化UUID
 */
function initUUID() {
    $.ajax({
        type:"GET",
        url:baseUrl+"oa/content/contentChild/getGuuid?time="+Math.random(),
        dataType:"json",
        success: function(resultValue, textStatus) {
            var uuid = resultValue.result;
            $('#id').val(uuid);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $.xljUtils.tip("red","服务异常,请联系管理员！");
        }
    });
}

function saveForm(op){
	
	// var input = document.getElementById("logoIcon");
	// if(input.files){
	// 	//读取图片数据
	// 	var f = input.files[0];
	// 	if(f != null && f != "undefined"){
	// 		var imageSize = f.size;
	// 		if(parseInt(imageSize) > parseInt(1*1024*1024)){
	// 			pop_tip_open("red","图片尺寸不能大于1M");
	// 			return;
	// 		}
	// 	}
	// }
	
	var ajax_option={
		url:hostUrl+"sys/sysLogo/update",//form 的action
		type:"post",  //form 的method方法
		//beforeSubmit:checkUppro,  //在表达提交前执行的验证函数
		contentType: "application/x-www-form-urlencoded; charset=utf-8",   //设置编码集
		success:function(data){  //表单提交成功后执行的函数
			formSubmitCallBack(data,op);
		}
	}
	$('#logoForm').ajaxSubmit(ajax_option);
}

function empty(){
	$("#url").val('');
}

/**
 * form表单提交回掉方法
 */
function formSubmitCallBack(resultData,op){
	// resultData = JSON.parse(resultData);
	// if(resultData) {
	// 	var successFlag = resultData.success;
	// 	var result = resultData.result;
	// 	var msg = resultData.msg;
	// 	if(successFlag) {
     // 	   window.opener.reloadGrid(urlParamJson.id);
     // 	   window.close();
	// 	}else {
	// 		pop_tip_open("red",resultData.msg);
	// 	}
	// }
	window.opener.reloadGrid(urlParamJson.id);
	window.close();
}
function newFile(target) {
	//判断文件类型
	var filePath = target.value;
	if(filePath!=""){
		var fileType=(filePath.substr(filePath.lastIndexOf("."))).toLowerCase();
		if(fileType!=".jpg"&&fileType!=".gif"&&fileType!=".jpeg"&& fileType!=".png"){
			pop_tip_open("blue","您上传图片的类型不符合(.jpg|.jpeg|.gif|.png)！");
			clearPic();
			return false;
		}
	}

	document.getElementById('newImg').setAttribute('width',"132px");
	document.getElementById('newImg').setAttribute('height',"30px");
	try{
		var windowURL = window.URL || window.webkitURL;
		var loadImg = windowURL.createObjectURL(document.getElementById('logoIcon').files[0]);
		document.getElementById('newImg').setAttribute('src',loadImg);
	}catch(e){
		document.getElementById('newImg').setAttribute('src',"../../common/img/default.png");
		var div = document.getElementById('newImg');
		document.getElementById('logoIcon').select();
		document.getElementById('logoIcon').blur();
		top.parent.document.body.focus();
		var src = document.selection.createRange().text;
		div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
		div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
	}
    $('#newImg').next().html("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
    $("#isDelPic").val("1");
    $("#newImg").show();
}  
function clearPic(){
	$("#newImg").attr("src","");
	$('#newImg').hide();
	$("#newImg").removeAttr("width");
	$("#newImg").removeAttr("height");
	$('#newImg').next().html("");
	$('#logoIcon').replaceWith('<input type="file" id="logoIcon"  onchange="newFile(this)" name="icon" multiple="true" class="" accept="image/*"/>');
	$("#isDelPic").val("0");
}