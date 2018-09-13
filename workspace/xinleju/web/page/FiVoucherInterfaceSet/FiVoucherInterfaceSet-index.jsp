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
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/TemplateWindow.js"></script>
<script type="text/javascript" src="page/FiVoucherInterfaceSet/FiVoucherInterfaceSet-index.js"></script>
<script>
var contextPath = '${pageContext.request.contextPath}';
if (contextPath.length == 1) {
	contextPath = '';
}
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
var companyList = ${companyList};//公司列表
var fisysList = ${fisysList};//财务系统列表
</script>
</head>
<body>
	<div id='Loading' style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB ;text-align:center;padding-top: 20%;">
		<h1><image src='images/loading.gif'/><font color="#15428B">加载中···</font></h1>
	</div>
	<div class="easyui-layout" data-options="border:false,fit:true">
		<div data-options="region:'west',split:true,title:'账套管理'" style="width:300px;padding:5px;background:#eee;">
			<div id="tb">
				<a class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="editDialog();">新增</a>
				<a class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="editDialog(1);">修改</a>
				<a class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="del();">删除</a>
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
		</div>
		<div id="center" data-options="region:'center'" style="">
		    <div id="tt" class="easyui-tabs" data-options="onUnselect:tabOnUnselect,onSelect:tabOnSelect">   
			    <div class="tab_" title="账套数据" data-options="fit:true" url="FiAccountSetData!list.do?accountSetId=" frameId="f1">   
			         <iframe id="f1" scrolling="auto" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>      
			    </div>   
			    <div class="tab_" title="会计科目管理" data-options="fit:true" url="FiAccountSubject!list.do?accountSetId=" frameId="f2">   
			        <iframe id="f2" scrolling="auto" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>    
			    </div> 
			    <div class="tab_" title="辅助核算对照" data-options="fit:true" url="FiAssMapping!list.do?accountSetId=" frameId="f3">   
			        <iframe id="f3" scrolling="auto" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>    
			    </div>   
			    <div class="tab_" title="凭证模板设置" data-options="fit:true" url="FiVoucherTempType!list.do?accountSetId=" frameId="f4">   
			        <iframe id="f4" scrolling="auto" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>    
			    </div>
		    </div>
		</div>
	</div>
	<!-- ------------编辑对话框----------- -->
	<div id="editDialog" class="easyui-dialog" title="编辑" style="width:400px;height:220px;" data-options="
		iconCls:'icon-edit',
		resizable:true,
		modal:true,
		buttons:'#dlg-buttons',
		closed:true
	">   
		<form id="fm" method="post" novalidate>
        	<s:token></s:token>
        	<input id="id" name="id" type="hidden" value=""/>
        	<input id="companyId" name="companyId" type="hidden" value=""/>
        	<input id="companyName" name="companyName" type="hidden" value=""/>
        	<input id="companyCode" name="companyCode" type="hidden" value=""/>
            <div class="fitem">
                <label>账套编码:</label>
                <input name="code" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>账套名称:</label>
                <input name="name" class="easyui-textbox" required="true">
            </div>
            <div class="fitem">
                <label>财务接口URL:</label>
                <input id="url" name="url" class="easyui-textbox">
            </div>
            <div class="fitem">
                <label>财务系统:</label>
                <input id="fisys" name="fiSysId" class="easyui-combobox"/>
            </div>
        </form>
	</div>
	<div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="save()" style="width:90px">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#editDialog').dialog('close')" style="width:90px">取消</a>
    </div>
</body>
</html>
