<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<link href="css/jeasyui_form.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
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
		<script type="text/javascript" src="page/FiAccountSubject/FiAccountSubject-list.js"></script>
		<script type="text/javascript">
				var contextPath = '${pageContext.request.contextPath}';
				if(contextPath.length==1){
					contextPath = '';
				}
				<s:iterator value="#request.refs" var="map">
			    var ${map.key} = '${map.value}';
				</s:iterator>
				//给客服的账套ID赋值
				global.accountSetId='${accountSetId}';
				global.accountSetCode='${accountSetCode}';
				global.sysId='${sysId}';
				//var bizObjs = '${bizObjs}';
				var assMppObjs = ${assMppObjs};

				$(function(){
		
					/* $("#bizdata").combobox({
						valueField:'objectName',    
					    textField:'objectName',
						data:bizObjs,
						onSelect:function(record){
							initBizDatamx(record);
						}
					}); */
				
					//辅助核算
					$("#assName").combobox({
						valueField:'assName',    
					    textField:'assName',
						data:assMppObjs,
						multiple:true
					});
					
					loadGrid();
					
				});
			/* 	function initBizDatamx(record){
					var url = contextPath+"/FiAccountCaption!loadBizDatamx.do?name="+record.objectName+"&accountSetId=";
					$("#bizDatamx").combobox({
						valueField:'name',    
					    textField:'name',
					    url:url,
					    contentType: "application/x-www-form-urlencoded; charset=utf-8" 
					});
				} */
				
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
		<div class="easyui-layout" data-options="border:false,fit:true">
       <!--    <div data-options="region:'center',title:'会计科目管理'"> -->
			<div id="grid_tb">
				<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="javascript:addAccountCaption();" class="t_more">新增</a>
			  	<a class="easyui-linkbutton" iconCls="icon-edit" plain="true"onclick="javascript:editAccountCaption();" class="t_more">编辑</a>
			  	<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="javascript:deleteAccountCaption();" class="t_more">删除</a>
		    </div>
            <table  id="grid"></table>
      <!--   </div> -->
		</div>
		<!-- 新增/编辑 对话框 -->
		 <div id="dlg" class="easyui-dialog" style="width:400px;height:350px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        	<div class="ftitle">会计科目编辑</div>
	        <form id="fm" method="post" novalidate>
	        	<s:token></s:token>
	            <div class="fitem">
	                <label>科目代码:</label>
	                <input name="code" class="easyui-textbox" required="true">
	            </div>
	            <div class="fitem">
	                <label>科目名称:</label>
	                <input name="name" class="easyui-textbox" required="true">
	            </div>
	            <div class="fitem">
	                <label>上级科目:</label>
	                <input id="parentAcId" name="parentId" class="easyui-textbox">
	            </div>
	         <!--    <div class="fitem">
	                <label>业务数据类型:</label>
	                <input id="bizdata" name="bizData" class="easyui-textbox"/>
	            </div>
	            <div class="fitem">
	                <label>业务数据项目:</label>
	                <input id="bizDatamx" name="bizDatamx" class="easyui-combobox"/>
	            </div> -->
	            <div class="fitem">
	                <label>辅助核算:</label>
 					<input id="assName" name="assName" class="easyui-textbox" />
	            </div>
	            <div class="fitem">
	                <label>内容列表:</label>
 					<input id="content" name="content" class="easyui-textbox" />
	            </div>
	            <div class="fitem">
	                <label>辅助核算内容:</label>
 					<input id="assContent" name="assContent" />
 					<input id="accountSetCode" name="accountSetCode" style="display: none"/>
 					<input id="createDate" name="createDate"  style="display: none"/>
	            </div>
	        </form>
    	</div>
    	<div id="dlg-buttons">
	        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveOrUpdateAccountCaption()" style="width:90px">保存</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
	    </div>

	</body>
</html>
