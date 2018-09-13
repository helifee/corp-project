/**
 * 用户增加和修改
 * @author shiyong
 */
//打开方式：0新增，1修改
var editUserType=0;
//组织机构树
var zTreeObj;
//组织机构树 的参数配置
var setting = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClick,
			onClick: onClick
		}
};

/**
 * 递归设置树的图片样式
 */
function recursionArray(arr) {
	//所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
	for(var i in arr) {
		if(/['"#$%&\^*]/.test(arr[i].name)){
    		arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
    	}
		if(arr[i].type == "zb" || arr[i].type == "company") {
			arr[i].iconSkin = "diy-company";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		}else if(arr[i].type == "dept" ) {
			arr[i].iconSkin = "diy-department";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		}else if(arr[i].type == "group" ) {
			arr[i].iconSkin = "diy-program";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		}else if(arr[i].type == "branch" ) {
			arr[i].iconSkin = "diy-program";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		}else if(arr[i].type == "cata" ) {
			arr[i].iconSkin = "diy-group";
			if(arr[i].children.length > 0) {
				recursionArray(arr[i].children);
			}
		} 
	}
};
/**
 * 获取组织机构树
 */
function initOrgTree() {
	var urlBody = "sys/org/root/getTree";
	var urlAll = serviceUrl + urlBody;
	var jsonData={
    		rootDelFlag:0,
    		orgDelFlag:0,
    		rootStatus:1,
    		orgStatus:1
    };
	$.ajax({
		type:'POST',
		url:urlAll,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(jsonData),
		success: function(json) {
			var zNodes = json.result;
			recursionArray(zNodes);
			zTreeObj = $.fn.zTree.init($("#treeOrg"), setting, zNodes);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取组织机构树请求失败");
		}
	})
}
/**
 * 组织机构树点击前触发事件
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function beforeClick(treeId, treeNode) {
	return true;
}

/**
 * 点击树触发事件
 * @param e
 * @param treeId
 * @param treeNode
 */
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeOrg"),
	nodes = zTree.getSelectedNodes(),
	v = "";
	k = "";
//	r = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
//		r += nodes[i].rootId + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
//	if (r.length > 0 ) r = r.substring(0, r.length-1);
//	var rootId = $("#rootId");
//	var belongOrgId = $("#belongOrgId");
//	var belongOrgIdName = $("#belongOrgIdName");
////	rootId.attr("value", r);
//	belongOrgId.attr("value", k);
//	belongOrgIdName.attr("value", v);
	$("#userForm").find("input[id='belongOrgId']").val(k);
	var name=v;
	name=$.xljUtils.htmlDecode(name);
	$("#userForm").find("input[id='belongOrgIdName']").val(name);
}
/**
 * 显示树
 */
function showMenu() {
	var cityObj = $("#belongOrgIdName");
	var cityOffset = $("#belongOrgIdName").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
/**
 * 隐藏树
 */
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
/**
 * 点击树外
 */
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

/**
 * 清空组织机构上级
 */
function empty(){
	$("#userForm").find("input[id='belongOrgId']").val("");
	$("#userForm").find("input[id='belongOrgIdName']").val("");
}

/**
 * 上级组织机构回调函数
 * @param data
 */
function orgCallback(data) {
	$("#userForm").find("input[id='belongOrgId']").val(data.id);
	var name=data.name;
	var prefixName = data.prefixName;
//	name=$.xljUtils.htmlDecode(name);
	$("#userForm").find("input[id='belongOrgIdName']").val(prefixName);
}

/**
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#userForm").find("input[name='id']").val(guuid);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
		}
	})
}
/**
 * 初始化使用范围
 */
function initApplicableScope(){
//	$("#applicableScope").append("<input type='checkbox' name='appScope' value='1'><span>OA产品--授权数：500个；已有用户数：120个</span></br>");
//	$("#applicableScope").append("<input type='checkbox' name='appScope' value='2'><span>平台产品--授权数：300个；已有用户数：10个</span></br>");
//	$("#applicableScope").append("<input type='checkbox' name='appScope' value='3'><span>地产ERP产品--授权数：30个；已有用户数：30个</span></br>");
//	$("#applicableScope").append("<input type='checkbox' name='appScope' value='4'><span>非地产ERP--授权数：40个；已有用户数：20个</span></br>");
//	$("#applicableScope").append("<input type='checkbox' name='appScope' value='5'><span>人力系统产品--授权数：150个；已有用户数：0个</span></br>");
	var uBody = "sys/org/user/ApplicableScope"+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var listApplicableScope=data.result;
			for(var k =0;k<listApplicableScope.length;k++){
				if(listApplicableScope[k].noHaveNum >0){
					$("#applicableScope").append("<input type='checkbox' name='appScope' value='"+listApplicableScope[k].code+"'><span>"+listApplicableScope[k].name+"--授权数："+listApplicableScope[k].pronumber+"个；已有用户数："+listApplicableScope[k].haveNum+"个;剩余用户数："+listApplicableScope[k].noHaveNum+"个</span></br>");
				}else{
					$("#applicableScope").append("<input type='checkbox' disabled='disabled' onclick='return false'  name='appScope' value='"+listApplicableScope[k].code+"'><span>"+listApplicableScope[k].name+"--授权数："+listApplicableScope[k].pronumber+"个；已有用户数："+listApplicableScope[k].haveNum+"个;剩余用户数："+listApplicableScope[k].noHaveNum+"个</span></br>");
					
				}
			}
			if(editUserType==1){
				getUserById();
			}
			
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化使用范围请求失败");
		}
	})
}

/**
 * 保存表单
 */
function saveForm(sign){
	var pwd=$("#password").val();
	if(pwd.length <6){
		pop_tip_open("blue","密码长度不能小于6位！");
		return false;
	}
	if(editUserType==1){//编辑
		editSaveForm();
	}else{//新增
		addSaveForm(sign);
	}
}
/**
 * 新增保存表单
 */
function addSaveForm(sign){
	var userArr= $("#userForm").serializeArray();
	var userDto={};
	var data;
	for(var i in userArr){
		if(userArr[i].name=="workTime"||"createDate"==userArr[i].name||"updateDate"==userArr[i].name|| "disabledDate"==userArr[i].name ||userArr[i].name=="entryDate"||userArr[i].name=="leaveDate"){
			date = userArr[i].value.replace(/-/g,'/'); 
			if(date!=""){
				userDto[userArr[i].name]=new Date(date).getTime();
			}else{
				userDto[userArr[i].name]=null;
			}
		}else if(userArr[i].name=="belongOrgIdName" || userArr[i].name=="_id"|| userArr[i].name=="_name" ){

		}else if(userArr[i].name=="appScope"){
		}else{
			userDto[userArr[i].name]=userArr[i].value;
		}
	}
	var app_obj = document.getElementsByName("appScope");
	var appScope_val = "";
//	for(k in app_obj){
	for(var k =0;k<app_obj.length;k++){
		if(app_obj[k].checked){
			appScope_val += app_obj[k].value + ",";
		}
	}
	if (appScope_val.length > 0 ){
		appScope_val = appScope_val.substring(0, appScope_val.length-1);
	}else{
		pop_tip_open("blue","请选择使用范围");
		return false;
	}
	userDto.applicableScope=appScope_val;
	userDto.delflag=false;
	if(userDto.entryDate!=null&&userDto.leaveDate!=null&&(userDto.entryDate - userDto.leaveDate >0)){
		pop_tip_open("blue","离职时间应大于入职时间");
		return false;
	}
	var uBody = "sys/org/user/save";
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(userDto),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					refreshParent(userDto.id);
					window.opener.userOnId=userDto.id;
					if(sign==1){//保存并新增
						pop_tip_open("green","数据保存成功");
						refreshWin();
					}else{
						closeWin();
					}
				}else {
					pop_tip_open("red","数据保存失败！"+msg);
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据保存请求失败");
		}
	});
}
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/**
 * 刷新父页面表格数据
 */
function refreshParent(userId) {

	var queryDataPost={
			"orgId":$("#belongOrgId").val()
	};
	var queryDataPostUser={
			"postId":""
	};
	var queryDataUser={
			"orgId":$("#belongOrgId").val(),
			"includelow":window.opener.includelow
	};
	var queryDataUserPost={
			"userId":userId
	};
	window.opener.jqGridPost.jqGrid("setGridParam", { postData: queryDataPost }).trigger("reloadGrid");
	window.opener.jqGridPostUser.jqGrid("setGridParam", { postData: queryDataPostUser }).trigger("reloadGrid");
	window.opener.jqGridUser.jqGrid("setGridParam", { postData: queryDataUser }).trigger("reloadGrid");
	window.opener.jqGridUserPost.jqGrid("setGridParam", { postData: queryDataUserPost }).trigger("reloadGrid");

//	window.opener.document.getElementById(elementId);
	var ss = window.opener.zTreeObj;
	var treeNode = ss.getNodeByParam("id", $("#belongOrgId").val(), null);
	ss.selectNode(treeNode);
//	closeWin();
};
/**
 * 修改-保存表单
 */
function editSaveForm(){
	var userArr= $("#userForm").serializeArray();
	var userDto={};
	var data;
	for(var i in userArr){
		if(userArr[i].name=="workTime"||"createDate"==userArr[i].name||"updateDate"==userArr[i].name|| "disabledDate"==userArr[i].name ||userArr[i].name=="entryDate"||userArr[i].name=="leaveDate"){
			date = userArr[i].value.replace(/-/g,'/'); 
			if(date!=""){
				userDto[userArr[i].name]=new Date(date).getTime();
			}else{
				userDto[userArr[i].name]=null;
			}
		}else if(userArr[i].value==""){
			userDto[userArr[i].name]=null;
		}else if(userArr[i].name=="belongOrgIdName" || userArr[i].name=="_id"|| userArr[i].name=="_name"){

		}else if(userArr[i].name=="password"&&userArr[i].value=="******"){
		}else if(userArr[i].name=="emailPwd"&&userArr[i].value=="******"){
		}else{
			userDto[userArr[i].name]=userArr[i].value;
		}
	}
	var app_obj = document.getElementsByName("appScope");
	var appScope_val = "";
//	for(k in app_obj){
	for(var k =0;k<app_obj.length;k++){
		if(app_obj[k].checked){
			appScope_val += app_obj[k].value + ",";
		}
	}
	if (appScope_val.length > 0 ){
		appScope_val = appScope_val.substring(0, appScope_val.length-1);
	}else{
		pop_tip_open("blue","请选择使用范围");
		return false;
	}
	userDto.applicableScope=appScope_val;
	
	userDto.delflag=false;
	if(userDto.entryDate!=null&&userDto.leaveDate!=null&&(userDto.entryDate - userDto.leaveDate >0)){
		pop_tip_open("blue","离职时间应大于入职时间");
		return false;
	}
	var userId = $('#id').val();
	userDto.id=userId;
	var loginName = $('#loginName').val();
	userDto.loginName=loginName;
	var uBody = "sys/org/user/update/"+userId;
	var uAll = serviceUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(userDto),
		type:'PUT',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					window.opener.userOnId=userDto.id;
					refreshParent(userDto.id);
					closeWin();
				}else {
					pop_tip_open("red","数据修改保存失败！"+msg);
				}
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","数据修改保存请求失败");
		}
	});

}

/**
 * TODO 后期去掉此方法，一次性获取上级机构name
 */
function getOrgNameById(orgId){
	var uBody = "sys/org/orgnazation/get/"+orgId+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var name=data.result.name;
			var parentprefixName = data.result.parentprefixName;
			name=$.xljUtils.htmlDecode(name);
			if(null == parentprefixName || parentprefixName == "null"){
			}else{
				name = parentprefixName+"/"+name
			}
			$("#userForm").find("input[name='belongOrgIdName']").val(name);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取上级机构请求失败");
		}
	})
}

/**
 * 根据Id获取用户
 */
var oldPwd;
function getUserById(){
	var userId = window.opener.edit_userId;
	var uBody = "sys/org/user/get/"+userId+"?time="+Math.random();
	var uAll = serviceUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			$("#userForm").find("input[name='id']").val(data.result.id);
			$("#userForm").find("input[name='realName']").val(data.result.realName);
			var password=data.result.password;
			if(password!=""&&password!=null){
				$("#userForm").find("input[name='password']").val("******"); 
				oldPwd=password;
			}
			var emailPwd=data.result.emailPwd;
			if(emailPwd!=""&&emailPwd!=null){
				$("#userForm").find("input[name='emailPwd']").val("******"); 
			}else{
				$("#userForm").find("input[name='emailPwd']").val(""); 
			}
			$("#userForm").find("input[name='sort']").val(data.result.sort);
			$("#userForm").find("input[name='weChat']").val(data.result.weChat);
			var entryDate=data.result.entryDate;
			if(entryDate){
				entryDate = entryDate.substring(0,10);
			}
			$("#userForm").find("input[name='entryDate']").val(entryDate);
			var workTime=data.result.workTime;
			if(workTime){
				workTime = workTime.substring(0,10);
			}
			$("#userForm").find("input[name='workTime']").val(workTime);
			var leaveDate=data.result.leaveDate;
			if(leaveDate){
				leaveDate = leaveDate.substring(0,10);
			}
			$("#userForm").find("input[name='leaveDate']").val(leaveDate);
			if(data.result.isMale == "1"){
				$("input[name='isMale'][value=1]").attr("checked",true); 
			}else{
				$("input[name='isMale'][value=0]").attr("checked",true); 
			}
			$("#userForm").find("input[name='loginName']").val(data.result.loginName);
			$("#userForm").find("input[name='belongOrgId']").val(data.result.belongOrgId);
			if(data.result.belongOrgId != null && data.result.belongOrgId != ""){
				getOrgNameById(data.result.belongOrgId);
			}
			$("#userForm").find("input[name='mobile']").val(data.result.mobile);
			$("#userForm").find("input[name='email']").val(data.result.email);
			if(data.result.type == "1"){
				$("input[name='type'][value=1]").attr("checked",true); 
			}else if(data.result.type == "2"){
				$("input[name='type'][value=2]").attr("checked",true); 
			}else if(data.result.type == "3"){
				$("input[name='type'][value=3]").attr("checked",true); 
			}else if(data.result.type == "4"){
				$("input[name='type'][value=4]").attr("checked",true); 
			}else{
				$("input[name='type'][value=0]").attr("checked",true); 
			}
			if(data.result.status == "1"){
				$("input[name='status'][value=1]").attr("checked",true); 
			}else{
				$("input[name='status'][value=0]").attr("checked",true); 
			}
			
			var applicableScope = data.result.applicableScope;
			
			if(null != applicableScope && applicableScope != '' ){
				var listappscope = applicableScope.split(",");
				var app_obj = document.getElementsByName("appScope");
				for(var k=0;k<listappscope.length;k++){
					for(var j =0;j<app_obj.length;j++){
						if(app_obj[j].value == listappscope[k]){
							app_obj[j].checked=true;
							app_obj[j].disabled=false;
							app_obj[j].onclick=null;
						}
					}
				}
			}
			
			$("#userForm").find("input[name='createPersonId']").val(data.result.createPersonId);
			$("#userForm").find("input[name='createPersonName']").val(data.result.createPersonName);
			$("#userForm").find("input[name='updatePersonId']").val(data.result.updatePersonId);
			$("#userForm").find("input[name='updatePersonName']").val(data.result.updatePersonName);
			$("#userForm").find("input[name='createDate']").val(data.result.createDate);
			$("#userForm").find("input[name='updateDate']").val(data.result.updateDate);
			$("#userForm").find("input[name='disabledDate']").val(data.result.disabledDate);
			$("#remark").val(data.result.remark);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取用户请求失败");
		}
	})
}


$(function () {
	$("#saveBtn").on('click',function(){
		$("#userForm").attr("data-validate-success","saveForm(0)");
		$("#userForm").submit();
	});

	$("#saveAndCreateBtn").on('click',function(){
		$("#userForm").attr("data-validate-success","saveForm(1)");
		$("#userForm").submit();
	});

	//打开方式：0新增，1修改
	editUserType=window.opener.editUserType;
	if(editUserType==1){
		$("#saveAndCreateBtn").hide();
		$("#editTitel").text("修改");
		$("title").html("用户-修改");
		$("#loginName").attr("disabled",true); 
		initApplicableScope();
	}else{
		$("#editTitel").text("新增");
		$("title").html("用户-新增");
		//默认带出来已选中的
		var orgNode=window.opener.orgNode;
		//默认带过来的目录
		var orgRootNode=window.opener.orgRootNode;
		if(orgNode != null && orgNode != undefined){
			if(orgNode.id != orgRootNode.id){
				$("#userForm").find("input[id='belongOrgId']").val(orgNode.id);
				var name=orgNode.prefixName;
				name=$.xljUtils.htmlDecode(name);
				$("#userForm").find("input[id='belongOrgIdName']").val(name);
			}
		}
		initUuid();
		initApplicableScope();
	}
	initOrgTree();
	initDatetimepicker();
	
});


//初始化日期控件
function initDatetimepicker(){
    $('.form_datetime').datetimepicker({
        /*language:  'zh-CN',
        format: 'yyyy-mm-dd hh:ii:ss',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1*/
    	language: 'zh-CN', //语言
    	format: 'yyyy-mm-dd',//显示格式
    	minView: "month",//设置只显示到月份
    	initialDate: new Date(),//初始化当前日期
    	autoclose: true,//选中自动关闭
    	todayBtn: true//显示今日按钮
    });
    //防止按钮刷新页面
    $('.btn').click(function(e) {
        e.preventDefault();
    });
}

/**
 * 刷新页面
 */
function refreshWin(){
	$("#id").val("");
	$("#realName").val("");
	$("#loginName").val("");
	$("#password").val("");
	$("#sort").val("");
	$("#mobile").val("");
	$("#weChat").val("");
	$("#email").val("");
	//$("#entryDate").val("");
	//$("#leaveDate").val("");
	//$("#workTime").val("");
	$('.form_datetime').find(".glyphicon-remove").click();
	$(".datetimepicker").hide();
	$("#emailPwd").val("");
	$("input[name='type'][value=1]").attr("checked",true); 
	$("input[name='isMale'][value=1]").attr("checked",true); 
	$("input[name='status'][value=1]").attr("checked",true); 
	$("#remark").val("");
	
	//默认带出来已选中的
	var orgNode=window.opener.orgNode;
	//默认带过来的目录
	var orgRootNode=window.opener.orgRootNode;
	if(orgNode != null && orgNode != undefined){
		if(orgNode.id != orgRootNode.id){
			$("#userForm").find("input[id='belongOrgId']").val(orgNode.id);
			var name=orgNode.prefixName;
			name=$.xljUtils.htmlDecode(name);
			$("#userForm").find("input[id='belongOrgIdName']").val(name);
		}
	}
	editUserType=0;
	initUuid();
	$("#applicableScope").empty();
	initApplicableScope();
}