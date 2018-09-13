<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="css/jeasyui_form.css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="page/FiYsDept/FiYsDept-list.js"></script>
<script>
var contextPath = '${pageContext.request.contextPath}';
function closes(){
	$("#Loading").fadeOut("normal",function(){
		$(this).remove();
	});
}
var pc_;
$.parser.onComplete = function(){
	if(pc_) clearTimeout(pc);
	pc_ = setTimeout(closes, 500);
}

</script>
</head>
<body>
	<div id='Loading' style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB ;text-align:center;padding-top: 20%;">
		<h1><image src='images/loading.gif'/><font color="#15428B">加载中···</font></h1>
	</div>
	<div class="easyui-layout" data-options="fit:true,border:true,title:'预算部门与平台部门对照'">
		<!-- <div data-options="region:'north',border:true,title:'预算部门与平台部门对照'"> -->
			<s:form id="frm" action="FiAssMapping!list">
				<s:hidden name="start"></s:hidden>
				<!-- 查询条件 -->
				<div class="s1_searchWrap"></div>
			</s:form>
			<!-- 标题 -->
			<div id="grid1_tb">
				<a class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add'" onclick="javascript:editFiAssMappingDialog()"> 新增</a> 
				<a class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove'" onclick="javascript:del()" class="t_del">删除</a>
			    <a class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove'" onclick="javascript:loadYsDepts()" class="t_del">同步数据</a>
			</div>

	</div>
</body>
</html>
