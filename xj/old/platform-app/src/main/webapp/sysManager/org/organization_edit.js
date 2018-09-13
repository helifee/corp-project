/**
 * 组织机构增加和修改
 * @author shiyong
 */
//打开方式：0新增，1修改
var editType=0;
//修改时用原父级组织机构Id
var patentIdold;
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
	var urlAll = hostUrl + urlBody;
	$.ajax({
		type:'POST',
		url:urlAll,
		dataType:'json',
		contentType:'application/json',
		data:'{}',
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
	 r = "";
	 parentprefixId ="";
	 parentprefixName ="";
	 t = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
		r += nodes[i].rootId + ",";
		parentprefixId += nodes[i].prefixId + ",";
		parentprefixName += nodes[i].prefixName + ",";
		t += nodes[i].type + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	if (r.length > 0 ) r = r.substring(0, r.length-1);
	if (parentprefixId.length > 0 ) parentprefixId = parentprefixId.substring(0, parentprefixId.length-1);
	if (parentprefixName.length > 0 ) parentprefixName = parentprefixName.substring(0, parentprefixName.length-1);
	if (t.length > 0 ) t = t.substring(0, t.length-1);
	var orgId = $('#id').val();
	if(k == orgId){
		pop_tip_open("blue","上级组织不能选择自己");
	}else{
		if(t == "cata"){
			$("#orgnazationFrom").find("input[id='parentIdName']").val(v);
			$("#orgnazationFrom").find("input[id='parentId']").val("");
			$("#orgnazationFrom").find("input[id='parentprefixId']").val("");
			$("#orgnazationFrom").find("input[id='parentprefixName']").val("");
		}else{
			$("#orgnazationFrom").find("input[id='rootId']").val(r);
			$("#orgnazationFrom").find("input[id='parentId']").val(k);
			$("#orgnazationFrom").find("input[id='parentIdName']").val(v);
			$("#orgnazationFrom").find("input[id='parentprefixId']").val(parentprefixId);
			$("#orgnazationFrom").find("input[id='parentprefixName']").val(parentprefixName);
		}
		
	}

}
/**
 * 清空组织机构上级
 */
function empty(){
	$("#orgnazationFrom").find("input[id='parentId']").val("");
	$("#orgnazationFrom").find("input[id='parentIdName']").val("");
	$("#orgnazationFrom").find("input[id='parentprefixId']").val("");
	$("#orgnazationFrom").find("input[id='parentprefixName']").val("");
}

/**
 * 上级组织机构回调函数
 * @param data
 */
function orgCallback(data) {
	var orgId = $('#id').val();
	if(data.id == orgId){
		pop_tip_open("blue","上级组织不能选择自己");
	}else{
		if(data.type == "cata"){
			$("#orgnazationFrom").find("input[id='parentIdName']").val(data.name);
			$("#orgnazationFrom").find("input[id='parentId']").val("");
			$("#orgnazationFrom").find("input[id='parentprefixId']").val("");
			$("#orgnazationFrom").find("input[id='parentprefixName']").val("");
		}else{
			$("#orgnazationFrom").find("input[id='rootId']").val(data.rootId);
			$("#orgnazationFrom").find("input[id='parentId']").val(data.id);
			$("#orgnazationFrom").find("input[id='parentIdName']").val(data.name);
			$("#orgnazationFrom").find("input[id='parentprefixId']").val(data.prefixId);
			$("#orgnazationFrom").find("input[id='parentprefixName']").val(data.prefixName);
		}
		
	}
}

/**
 * 负责人岗位回调函数
 * @param data
 */
function postCallback(data) {
	var leaderType = data.type;
    leaderType = leaderType =='user'?"1":"0";
	$("#orgnazationFrom").find("input[id='leaderId']").val(data.id);
	$("#orgnazationFrom").find("input[id='leaderIdName']").val(data.name);
	$("#orgnazationFrom").find("input[id='leaderType']").val(leaderType);
}

/**
 * 负责人清空
 * @param data
 */
function postempty() {
	$("#orgnazationFrom").find("input[id='leaderId']").val("");
	$("#orgnazationFrom").find("input[id='leaderIdName']").val("");
}

/**
 * 二级管理员回调函数
 * @param data
 */
function userCallback(data) {
	$("#orgnazationFrom").find("input[id='upLeaderId']").val(data.id);
	$("#orgnazationFrom").find("input[id='upLeaderIdName']").val(data.name);
}

/**
 * 二级管理员清空
 * @param data
 */
function userempty() {
	$("#orgnazationFrom").find("input[id='upLeaderId']").val("");
	$("#orgnazationFrom").find("input[id='upLeaderIdName']").val("");
}


/**
 * 显示树
 */
function showMenu() {
	var cityObj = $("#parentIdName");
	var cityOffset = $("#parentIdName").offset();
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
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "generator/getGuuid"+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#orgnazationFrom").find("input[name='id']").val(guuid);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
		}
	})
}


/**
 * 保存表单
 * @param sign 0保存 1保存并新增
 */
function saveForm(sign){
	//校验组织机构上级以及下级是否正确
	var parentId =$("#orgnazationFrom").find("input[id='parentId']").val();
	var type="";
	var temp = document.getElementsByName("type");
	for(var i=0;i<temp.length;i++)
	{
		if(temp[i].checked)
			type = temp[i].value;
	}
	
	if(null == parentId || "" == parentId){
		if(type!="zb" && type!="company"){
			pop_tip_open("blue","一级组织只能建立集团或者公司");
			return ;
		}
	}else{
		var treeNode = zTreeObj.getNodeByParam("id", parentId, null);
		var parentType = treeNode.type;
		if(type == "zb" || type == "company") {
			if(parentType == "dept" || parentType == "group" || parentType == "branch"){
				pop_tip_open("blue","集团或者公司只能建立在集团或者公司下");
				return ;
			}
		}else if(type == "dept" ) {
			if(parentType == "group" || parentType == "branch"){
				pop_tip_open("blue","部门只能建立在集团、公司、或者部门下");
				return ;
			}
		}else if(type == "group" ) {
			if(parentType == "dept" || parentType == "group" || parentType == "branch"){
				pop_tip_open("blue","项目只能建立在集团或者公司下");
				return ;
			}
		}else if(type == "branch" ) {
			if(parentType == "zb" || parentType == "company" || parentType == "dept" || parentType == "branch"){
				pop_tip_open("blue","分期只能建立在项目下");
				return ;
			}
		}
	}
	if(editType==1){//编辑
		editSaveForm();
	}else{//新增
		addSaveForm(sign);
	}
}

/**
 * 新增保存表单
 */
function addSaveForm(sign){
	var orgnazationArr= $("#orgnazationFrom").serializeArray();
	var orgnazationDto={};
	for(var i in orgnazationArr){
		if(orgnazationArr[i].name=="registrationDate"||"createDate"==orgnazationArr[i].name||"updateDate"==orgnazationArr[i].name|| "disabledDate"==orgnazationArr[i].name){
		}else if(orgnazationArr[i].name=="parentIdName" || orgnazationArr[i].name=="upLeaderIdName" || orgnazationArr[i].name=="leaderIdName" || orgnazationArr[i].name=="disabledId" || orgnazationArr[i].name=="_id"|| orgnazationArr[i].name=="_name"){

		}else if(orgnazationArr[i].name=="parentprefixId"){
			if(orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value){
				orgnazationDto.prefixId = $('#id').val();
			}else{
				orgnazationDto.prefixId = orgnazationArr[i].value+"/"+$('#id').val();
			}
			
		}else if(orgnazationArr[i].name=="parentprefixName"){
			if(orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value){
				orgnazationDto.prefixName = $('#name').val();
			}else{
				orgnazationDto.prefixName = orgnazationArr[i].value+"/"+$('#name').val();
			}
			
		}else{
			orgnazationDto[orgnazationArr[i].name]=orgnazationArr[i].value;
		}
	}
	orgnazationDto.delflag=false;

	var uBody = "sys/org/orgnazation/save";
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(orgnazationDto),
		type:'POST',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					addTreeNode(orgnazationDto.prefixId,orgnazationDto.prefixName);
					window.opener.xljUtilOrg.treeResizeFn();
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
 * 父页面组织机构树插入新增组织机构的节点
 */
function addTreeNode(prefixId,prefixName) {
	var ss = window.opener.zTreeObj;
	var parentId = $("#parentId").val();
	var nodes = ss.getNodes();
	var rootNode = nodes[0];
	var treeNode = ss.getNodeByParam("id", parentId, null);
	var id = $("#id").val();
	var name = $("#name").val();
	var type ;
	var iconSkin ;
	var sort = $("#sort").val();
	var rootId = $("#rootId").val();
	var children = [];
	var status = $("input[name='status']:checked").val();

	var temp = document.getElementsByName("type");
	for(var i=0;i<temp.length;i++)
	{
		if(temp[i].checked)
			type = temp[i].value;
	}
	if(type == "zb" || type == "company") {
		iconSkin = "diy-company";
	}else if(type == "dept" ) {
		iconSkin = "diy-department";
	}else if(type == "group" ) {
		iconSkin = "diy-program";
	}else if(type == "branch" ) {
		iconSkin = "diy-program";
	}else if(type == "cata" ) {
		iconSkin = "diy-group";
	} 
	name = name.replace(/\\\\/g,"\\");
	name = name.replace(/\\\'/g,"'");
	if (treeNode) {
		treeNode = ss.addNodes(treeNode, {id:id, name:name, type:type,status:status, sort:sort,rootId:rootId,children:children,iconSkin:iconSkin,prefixId:prefixId,prefixName:prefixName});
	} else {
		treeNode = ss.addNodes(rootNode, {id:id, name:name, type:type,status:status, sort:sort,rootId:rootId,children:children,iconSkin:iconSkin,prefixId:prefixId,prefixName:prefixName});
	}
	//重置父级滚动条
	/*$(window.opener.document.getElementById('treeDemo').parentNode).niceScroll({
		autohidemode: false,
		cursorcolor: "#fff",
		cursorwidth: "6px", // 滚动条的宽度，单位：便素
		cursorborder: "1px solid #fff", // CSS方式定义滚动条边框
		horizrailenabled: true, // nicescroll可以
		// 管理水平滚动
		background: "#fff"

	});*/
	$(window.opener.document.getElementById('treeDemo').parentNode).getNiceScroll().show().resize();

//	closeWin();
};

/**
 * 修改-保存表单
 */
function editSaveForm(){
	var orgnazationArr= $("#orgnazationFrom").serializeArray();
	var orgnazationDto={};
	for(var i in orgnazationArr){
		if(orgnazationArr[i].name=="registrationDate"||"createDate"==orgnazationArr[i].name||"updateDate"==orgnazationArr[i].name|| "disabledDate"==orgnazationArr[i].name){
		}else if(orgnazationArr[i].name=="parentIdName" || orgnazationArr[i].name=="upLeaderIdName" || orgnazationArr[i].name=="leaderIdName" || orgnazationArr[i].name=="disabledId"|| orgnazationArr[i].name=="_id"|| orgnazationArr[i].name=="_name"){

		}else if(orgnazationArr[i].name=="parentprefixId"){
			if(orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value){
				orgnazationDto.prefixId = $('#id').val();
			}else{
				orgnazationDto.prefixId = orgnazationArr[i].value+"/"+$('#id').val();
			}
			
		}else if(orgnazationArr[i].name=="parentprefixName"){
			if(orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value){
				orgnazationDto.prefixName = $('#name').val();
			}else{
				orgnazationDto.prefixName = orgnazationArr[i].value+"/"+$('#name').val();
			}
			
		}else{
			orgnazationDto[orgnazationArr[i].name]=orgnazationArr[i].value;
		}
	}
	orgnazationDto.delflag=false;
	var orgId = $('#id').val();
	orgnazationDto.id=orgId;
	var uBody = "sys/org/orgnazation/update/"+orgId;
	var uAll = hostUrl + uBody;
	$.ajax({
		url:uAll,
		data:JSON.stringify(orgnazationDto),
		type:'PUT',
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag) {
					editTreeNode(orgnazationDto.prefixId,orgnazationDto.prefixName);
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
 * 父页面组织机构树修改组织机构的节点
 */
function editTreeNode(prefixId,prefixName) {
	var ss = window.opener.zTreeObj;
	var parentId = $("#parentId").val();
	var treeNodep = ss.getNodeByParam("id", parentId, null);
	var id = $("#id").val();
	var treeNodec = ss.getNodeByParam("id", id, null);	
	var name = $("#name").val();
	var type ;
	var iconSkin ;
	var sort = $("#sort").val();
	var rootId = $("#rootId").val();
	var status = $("input[name='status']:checked").val();
	var temp = document.getElementsByName("type");
	for(var i=0;i<temp.length;i++)
	{
		if(temp[i].checked)
			type = temp[i].value;
	}
	if(type == "zb" || type == "company") {
		iconSkin = "diy-company";
	}else if(type == "dept" ) {
		iconSkin = "diy-department";
	}else if(type == "group" ) {
		iconSkin = "diy-program";
	}else if(type == "branch" ) {
		iconSkin = "diy-program";
	}else if(type == "cata" ) {
		iconSkin = "diy-group";
	} 
	name = name.replace(/\\\\/g,"\\");
	name = name.replace(/\\\'/g,"'");
	treeNodec.name = name;
	treeNodec.type = type;
	treeNodec.iconSkin = iconSkin;
	treeNodec.sort = sort;
	treeNodec.status = status;
	treeNodec.rootId = rootId;
	treeNodec.prefixId = prefixId;
	treeNodec.prefixName = prefixName;
	ss.updateNode(treeNodec);//更新节点属性

	if(patentIdold!=parentId){//移动节点
		ss.moveNode(treeNodep, treeNodec, "inner");
	}
	closeWin();
};

/**
 * TODO 后期去掉此方法，一次性获取上级机构name
 */
function getOrgNameById(orgId){
	var uBody = "sys/org/orgnazation/get/"+orgId+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			$("#orgnazationFrom").find("input[id='parentIdName']").val(data.result.name);
			$("#orgnazationFrom").find("input[id='parentprefixId']").val(data.result.prefixId);
        	$("#orgnazationFrom").find("input[id='parentprefixName']").val(data.result.prefixName);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","获取上级机构请求失败");
		}
	})
}

/**
 * 根据ID获取要修改的组织机构
 */
function getOrgById(){
//	var orgId="9bbbfdad059345ffada9e20b1ea8d1e2";
	var orgId = window.opener.edit_orgId;
	var uBody = "sys/org/orgnazation/get/"+orgId+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
//			var guuid=data.result;
			if(data.result.type == "zb"){
				$("input[name='type'][value=zb]").attr("checked",true); 
			}else if(data.result.type == "company"){
				$("input[name='type'][value=company]").attr("checked",true); 
			}else if(data.result.type == "dept"){
				$("input[name='type'][value=dept]").attr("checked",true); 
			}else if(data.result.type == "group"){
				$("input[name='type'][value=group]").attr("checked",true); 
			}else if(data.result.type == "branch"){
				$("input[name='type'][value=branch]").attr("checked",true); 
			}else{
				$("input[name='type'][value=zb]").attr("checked",true); 
			}
			// 项目分期，全部可以编辑
            var type = data.result.type;
            if(type && (type =='group'||type =='branch')){
                $("input[name='type']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='id']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='code']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='name']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='fullName']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='leaderIdName']").attr("disabled",true);
                $("#orgnazationFrom").find("input[id='parentIdName']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='upLeaderIdName']").attr("disabled",true);
                $("#orgnazationFrom").find("input[name='sort']").attr("disabled",true);
                $("input[name='status']").attr("disabled",true);
                $("#orgnazationFrom").find("textarea[name='remark']").attr("disabled","disabled");
                $(".input-group-addon").remove();
            }

            $("#orgnazationFrom").find("input[name='id']").val(data.result.id);
			$("#orgnazationFrom").find("input[name='code']").val(data.result.code);
			$("#orgnazationFrom").find("input[name='name']").val(data.result.name);
			$("#orgnazationFrom").find("input[name='fullName']").val(data.result.fullName);
			$("#orgnazationFrom").find("input[name='leaderId']").val(data.result.leaderId);
			$("#orgnazationFrom").find("input[name='leaderType']").val(data.result.leaderType);
			$("#orgnazationFrom").find("input[name='leaderIdName']").val(data.result.leaderIdName);
			$("#orgnazationFrom").find("input[id='parentId']").val(data.result.parentId);
			/*if(data.result.parentId != null && data.result.parentId != ""){
				getOrgNameById(data.result.parentId);
			}*/
			$("#orgnazationFrom").find("input[id='parentIdName']").val(data.result.parentIdName);
			$("#orgnazationFrom").find("input[id='parentprefixId']").val(data.result.parentprefixId);
        	$("#orgnazationFrom").find("input[id='parentprefixName']").val(data.result.parentprefixName);
			$("#orgnazationFrom").find("input[id='rootId']").val(data.result.rootId);
			patentIdold=data.result.parentId;
			$("#orgnazationFrom").find("input[name='upLeaderId']").val(data.result.upLeaderId);
			$("#orgnazationFrom").find("input[name='upLeaderIdName']").val(data.result.upLeaderIdName);
			$("#orgnazationFrom").find("input[name='sort']").val(data.result.sort);
			if(data.result.status == "1"){
				$("input[name='status'][value=1]").attr("checked",true); 
			}else{
				$("input[name='status'][value=0]").attr("checked",true); 
			}
			$("#orgnazationFrom").find("textarea[name='remark']").val(data.result.remark);
			$("#orgnazationFrom").find("input[name='createPersonId']").val(data.result.createPersonId);
			$("#orgnazationFrom").find("input[name='createPersonName']").val(data.result.createPersonName);
			$("#orgnazationFrom").find("input[name='createDate']").val(data.result.createDate);
			$("#orgnazationFrom").find("input[name='updatePersonId']").val(data.result.updatePersonId);
			$("#orgnazationFrom").find("input[name='updatePersonName']").val(data.result.updatePersonName);
			$("#orgnazationFrom").find("input[name='updateDate']").val(data.result.updateDate);
			$("#orgnazationFrom").find("input[name='disabledDate']").val(data.result.disabledDate);
			$("#remark").val(data.result.remark);
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化组织机构请求失败");
		}
	})
}


/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/**
 * 页面加载
 */
$(function () {
	$("#saveBtn").on('click',function(){
		$("#orgnazationFrom").attr("data-validate-success","saveForm(0)");
		$("#orgnazationFrom").submit();
	});

	$("#saveAndCreateBtn").on('click',function(){
		$("#orgnazationFrom").attr("data-validate-success","saveForm(1)");
		$("#orgnazationFrom").submit();
	});

	//打开方式：0新增，1修改
	editType=window.opener.editType;
	if(editType==1){
		$("#saveAndCreateBtn").hide();
		$("#editTitel").text("修改");
		$("title").html("组织机构-修改");
		getOrgById();
	}else{
		$("#editTitel").text("新增");
		$("title").html("组织机构-新增");
		//默认带出来已选中的
		var orgNode=window.opener.orgNode;
		//默认带过来的目录
		var orgRootNode=window.opener.orgRootNode;
		$("#orgnazationFrom").find("input[id='rootId']").val(orgRootNode.id);
		if(orgNode != null && orgNode != undefined){
			if(orgNode.id != orgRootNode.id){
				$("#orgnazationFrom").find("input[id='parentId']").val(orgNode.id);
				var name=orgNode.name;
				name=$.xljUtils.htmlDecode(name);
				$("#orgnazationFrom").find("input[id='parentIdName']").val(name);
				$("#orgnazationFrom").find("input[id='parentprefixId']").val(orgNode.prefixId);
				$("#orgnazationFrom").find("input[id='parentprefixName']").val(orgNode.prefixName);
				if(orgNode.type == "zb" || orgNode.type == "company" || orgNode.type == "dept"){
					$("input[name='type'][value=dept]").attr("checked",true); 
				}else if(orgNode.type == "group"){
					$("input[name='type'][value=branch]").attr("checked",true); 
				}
			}else{
				$("input[name='type'][value=company]").attr("checked",true); 
			}
		}

		initUuid();
	}

	initOrgTree();

});
$('.singleArray-first').xljSingleArraySelector({
    selectorTypeArray:['onlyPerson','post'],
    targetId:'leaderId',//选择的数据的ID存储input域
    targetName:'leaderIdName',//选择的数据的Name存储input域
    treeParam : {'userStatus':true},//生成zTree树的参数
    /**
     * 保存回调函数
     * @param selectDatas 已选择的数据json对象
     */
    saveCallback: function (treeNode) {
        postCallback(treeNode[0]);
    }
});


/**
 * 刷新页面
 */
function refreshWin(){
	$("#id").val("");
	$("#code").val("");
	$("#name").val("");
	$("#fullName").val("");
	$("#leaderId").val("");
	$("#leaderIdName").val("");
	$("#upLeaderId").val("");
	$("#upLeaderIdName").val("");
	$("#sort").val("");
	$("input[name='type'][value=zb]").attr("checked",true); 
	$("input[name='status'][value=1]").attr("checked",true); 
	$("#remark").val("");
	
	//默认带出来已选中的
	var orgNode=window.opener.orgNode;
	//默认带过来的目录
	var orgRootNode=window.opener.orgRootNode;
	$("#orgnazationFrom").find("input[id='rootId']").val(orgRootNode.id);
	if(orgNode != null && orgNode != undefined){
		if(orgNode.id != orgRootNode.id){
			$("#orgnazationFrom").find("input[id='parentId']").val(orgNode.id);
			$("#orgnazationFrom").find("input[id='parentIdName']").val(orgNode.name);
			$("#orgnazationFrom").find("input[id='parentprefixId']").val(orgNode.prefixId);
			$("#orgnazationFrom").find("input[id='parentprefixName']").val(orgNode.prefixName);
		}
	}
	editType=0;
	initUuid();
}
