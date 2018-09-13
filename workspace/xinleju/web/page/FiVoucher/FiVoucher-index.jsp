<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="css/jeasyui_form.css" />

<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script language="javascript"  type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/TemplateWindow.js"></script>
<script type="text/javascript" src="page/FiVoucher/FiVoucher-index.js"></script>
<script>
var contextPath = '${pageContext.request.contextPath}';
if (contextPath.length == 1) {
	contextPath = '';
}
sysId = '${sysId}'
//var companyList = ${companyList};//公司列表
//var fisysList = ${fisysList};//财务系统列表
</script>
</head>
<body>
	<div class="easyui-layout" data-options="border:false,fit:true">
		<!-- <div data-options="region:'west',split:true,title:'账套管理'" style="width:300px;padding:5px;background:#eee;">
			<div id="tb">
				<div style="text-align: center;margin-bottom:15px">
					公司：<input  id="company" class="easyui-combobox" style="width:150px" type="text"/>
				</div>
			</div>
			<table id="zt" class="easyui-datagrid" data-options="fitColumns:true,fit:true,toolbar:'#gb',singleSelect:true">
				<thead>   
			        <tr>   
			            <th data-options="field:'code'">账套编码</th>   
			            <th data-options="field:'companyName'">公司名称</th>   
			            <th data-options="field:'name'">账套名称</th>   
			        </tr>   
			    </thead>   
			</table>
		</div> -->
		<div data-options="region:'west',split:true,title:'财务系统公司'"
			style="width:330px;padding:5px;background:#eee;">

			<div class="t_title_input">
				财务系统名称： <select id="fiSysId" class="easyui-combobox"
					style="width:120px;">
					<s:iterator value="#request.fisysList" var="fs">
						<option value="${fs.id }">${fs.fiSysName }</option>
					</s:iterator>
				</select> <a href="#" title="查询" onclick="query();"><img
					src="images/icon_search.png" width="20" height="20" align="bottom" />
				</a>
			</div>
			<!-- <div id="partyTree" style="height:350px;overflow-y:auto;"></div> -->
			<div id="grid"></div>
		</div>
		<div id="center" data-options="region:'center'" style="background:#eee;">
		    <div id="tt" class="easyui-tabs" data-options="onSelect:tabOnSelect">   
			    <div class="tab_" title="凭证生成" data-options="fit:true" url="FiVoucher!generate.do?companyCode=" frameId="f1">   
			         <iframe id="f1" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>      
			    </div>   
			    <div class="tab_" title="凭证输出" data-options="fit:true" url="FiVoucher!export.do?companyCode=" frameId="f2">   
			        <iframe id="f2" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>    
			    </div>   
		    </div>
		</div>
	</div>
</body>
</html>
