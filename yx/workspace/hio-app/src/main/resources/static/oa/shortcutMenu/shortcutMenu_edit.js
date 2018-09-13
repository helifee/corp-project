/**
 * Created by admin on 2017/6/12.
 */
$(function () {
	var adminUser = $.xljUtils.getUrlParams().adminUser;
	if(adminUser&&adminUser!='undefined'&&adminUser!=''){
		$('#adminUser').val(adminUser);
	}

	$('#sortNum').val($.xljUtils.getUrlParams().sortNum);

    //保存
    $('#saveBtn').on('click',function () {
    	getUUID();
        $('#shortcutMenuForm').attr('data-validate-success','saveForm("save")');
        $('#shortcutMenuForm').submit();
    });

    $('#saveAndCreateBtn').on('click',function () {
    	getUUID();
        $('#shortcutMenuForm').attr('data-validate-success','saveForm("saveAndCreate")');
        $('#shortcutMenuForm').submit();
    });
    
    $('#removeResourceBtn').on('click',function () {
    	$("#shortcutMenuResourceId").val("");
    	$("#shortcutMenuResourceName").val("");
    	$("#shortcutMenuLinkAddr").val("");
    });

    $('#selectResourceBtn').xljSingleSelector({
    	title:'资源',//选择器标题，默认是'选择组织机构'
    	selectorType:'userMenu',
        targetId:'shortcutMenuResourceId',
        targetName:'shortcutMenuResourceName',
        selectNodeType:{isParent:false,msg:'只能选择子菜单'},
        saveCallback:function (selectData,ele) {
        	var resourceCode = selectData.code;
        	var resourceName = selectData.name;
            var resourceId = selectData.id;
            var openmode = selectData.openmode;
            var resourceUrl = selectData.resourceurl;
            var parentSelectData = getParentSelectData(selectData);
            var parentCode = parentSelectData.code;
            var parentResourceurl = parentSelectData.resourceurl;
            if(openmode == 0){
            	resourceUrl = resourceUrl;
            	$("input[name='innerLink'][value='false']").click();
            	//$('#shortcutMenuResourceId').val("");
                //$('#shortcutMenuResourceName').val("");
            }else{
            	 if(resourceUrl.indexOf("?") >= 0){
                 	resourceUrl = resourceUrl + "&_proCode="+parentCode+"&_menuCode="+resourceCode;
                 }else{
                 	resourceUrl = resourceUrl + "?_proCode="+parentCode+"&_menuCode="+resourceCode;
                 }
            	 $('#shortcutMenuResourceId').val(resourceId);
                 $('#shortcutMenuResourceName').val(resourceName);
            }
            if(parentResourceurl.indexOf("casUrlLogin") >= 0 && parentResourceurl.indexOf("erpUrl") >= 0){
            	var num = parentResourceurl.indexOf("erpUrl");
            	var parentErpUrl = parentResourceurl.substring(0,num);
            	resourceUrl = resourceUrl.replace('?', '&');
            	resourceUrl = parentErpUrl + "erpUrl=" + resourceUrl + "&username=#[userName]&DTL_SESSION_ID=#[sessionId]";
            }
            $('#shortcutMenuName').val(resourceName);
            $('#shortcutMenuCode').val(resourceCode);
            $('#shortcutMenuLinkAddr').val(resourceUrl);

        }
    });
    
    function getParentSelectData(selectData){
    	var selectParenData = selectData.getParentNode();
    	if(selectParenData != null){
    		return getParentSelectData(selectParenData);
    	}else{
    		return selectData;
    	}
    }

    $('#shortcutMenuForm :input[name="innerLink"]').on('click',function () {
        if(this.checked&&this.value=='true') {
            $('#resourceTr').show();
        } else {
            $('#resourceTr').hide();
        }
    });

    $('#closeWindowBtn').on('click',function () {
        window.close();
    });
});

function closeShortcutMenuModal(saveType,resultData) {
    if(resultData&&resultData.success) {
        if(saveType=='save'){
            window.opener.initShortcutMenuList();
            window.close();
            //$.xljUtils.tip('green','数据保存成功！');
        }else{
            window.opener.initShortcutMenuList();
            window.location.href = hostUrl + 'oa/shortcutMenu/shortcutMenu_edit.html';
        }
    }else {
        $.xljUtils.tip('red',resultData.msg);
    }
}

function getUUID(){
	 var url = serviceUrl + "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
     $.ajax({
         type: 'get',
         url: url,
         async:false,
         success: function (data) {
             var guuid = data.result;
             $("#shortcutMenuId").val(guuid);
         }
     });
}

function saveForm(op){
	
	var input = document.getElementById("shortcutMenuIcon");  
	if(input.files){
		//读取图片数据  
		var f = input.files[0];
		if(f != null && f != "undefined"){
			var imageSize = f.size;
			if(parseInt(imageSize) > parseInt(1*1024*1024)){
				pop_tip_open("red","图片尺寸不能大于1M");
				return;
			}
		}
	}
	
	var ajax_option={
		url:serviceUrl+"oa/shortcutMenu/save",//form 的action
		type:"post",  //form 的method方法
		//beforeSubmit:checkUppro,  //在表达提交前执行的验证函数
		contentType: "application/x-www-form-urlencoded; charset=utf-8",   //设置编码集
		success:function(data){  //表单提交成功后执行的函数
			formSubmitCallBack(data,op);
		}
	};
	$('#shortcutMenuForm').ajaxSubmit(ajax_option);
}

/**
 * form表单提交回掉方法
 */
function formSubmitCallBack(resultData,op){
	resultData = JSON.parse(resultData);
	if(resultData) {
		var successFlag = resultData.success;
		var result = resultData.result;
		var msg = resultData.msg;
		if(successFlag) {
			if(op=="save"){
				if(window.opener&&$.isFunction(window.opener.divRefresh)){
					window.opener.divRefresh();
				}

         	   window.close();
            }else if(op=="saveAndCreate"){
				if(window.opener&&$.isFunction(window.opener.divRefresh)){
					window.opener.divRefresh();
				}
				var adminUser = $.xljUtils.getUrlParams().adminUser;
				if(adminUser){
					window.location.href = hostUrl + 'oa/shortcutMenu/shortcutMenu_edit.html?adminUser='+adminUser+'&_t='+new Date().getTime();
				}else{
					window.location.href = hostUrl + 'oa/shortcutMenu/shortcutMenu_edit.html?_t='+new Date().getTime();
				}

            }
		}else {
			pop_tip_open("red",resultData.msg);
		}
	}
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

	document.getElementById('newImg').setAttribute('width',"80px");
	document.getElementById('newImg').setAttribute('hight',"80px");
	try{
		var windowURL = window.URL || window.webkitURL;
		var loadImg = windowURL.createObjectURL(document.getElementById('shortcutMenuIcon').files[0]);
		document.getElementById('newImg').setAttribute('src',loadImg);
	}catch(e){
		document.getElementById('newImg').setAttribute('src',"../../common/img/default.png");
		var div = document.getElementById('newImg');
		document.getElementById('shortcutMenuIcon').select();
		document.getElementById('shortcutMenuIcon').blur();
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
	$('#shortcutMenuIcon').replaceWith('<input type="file" id="shortcutMenuIcon"  onchange="newFile(this)" name="icon" multiple="true" class="" accept="image/*"/>');
	$("#isDelPic").val("0");
}