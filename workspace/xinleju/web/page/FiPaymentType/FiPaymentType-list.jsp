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
		<script type="text/javascript" src="page/FiPaymentType/FiPaymentType-list.js?time=New Date()"></script>
		<script type="text/javascript">
				var contextPath = '${pageContext.request.contextPath}';
				if(contextPath.length==1){
					contextPath = '';
				}

				//给客服的账套ID赋值
				global.accountSetId = ${accountSetId};
				
				$(function(){
					//加载会计科目treegrid数据
					global.accountSetCode='${accountSetCode}';
					global.sysId='${sysId}';
					global.accountSetId = ${accountSetId};
					loadGrid();
				});
				
				
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
			<div id="grid_tb">
				<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="javascript:addPaymentType();" class="t_more">新增</a>
			  	<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="javascript:editPaymentType();" class="t_more">编辑</a>
			  	<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="javascript:deletePaymentType();" class="t_more">删除</a>
			  	<a class="easyui-linkbutton"  plain="true" 
					onclick="javascript:exportPaymentType();" class="t_more">导出</a>
				<a class="easyui-linkbutton"  plain="true" 
					onclick="javascript:importPaymentType();" class="t_more">导入</a>
			  <!-- 	<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="javascript:loadYsDepts();" class="t_more">同步预算科目</a> -->
		    </div>
            <table  id="grid"></table>
		</div>
		<!-- 新增/编辑 对话框 -->
		 <div id="dlg" class="easyui-dialog" style="width:600px;height:550px;padding:10px 20px" closed="true" buttons="#dlg-buttons">
        	<div class="ftitle">款项类型对应会计科目编辑</div>
	        <form id="fm" method="post" novalidate>
	        	<s:token></s:token>
	            <div class="fitem">
                    <label>财务科目:</label>
                    <input id="capId" name="capAcId" class="easyui-textbox" style="width:400px" data-options="disabled:false">
                    <input id="accountCapCode" name="accountCapCode" style="display: none"/>
                    <input id="accountCapName" name="accountCapName" style="display: none"/>
                    <input id="accountCapId" name="accountCapId" style="display: none"/>
                </div>
	            <div class="fitem">
	                <label>款项类型:</label>
	                <input id="acId" name="parentAcId" class="easyui-textbox" style="width:400px" data-options="disabled:false">
	                <input id="accountSetCode" name="accountSetCode" style="display: none"/>
	                <input id="id" name="id" style="display: none"/>
	                <input id="sysId" name="sysId" style="display: none"/>
	                <input id="accountSetId" name="fiPaymentType.accountSetId" style="display: none"/>
	                <input id="typeCode" name="typeCode" style="display: none"/>
	                <input id="typeName" name="typeName" style="display: none"/>
	                <input id="coId" name="coId" style="display: none"/>
	                <input id="createDate" name="createDate"  style="display: none"/>
	            </div>
	        </form>
    	</div>
    	<div id="dlg-buttons">
	        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveOrUpdateFiPaymentType()" style="width:90px">保存</a>
	        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">取消</a>
	    </div>

		<div id="importDialog" class="easyui-dialog" style="background:#fff;padding:0 10 0 10;vertical-align: middle;" data-options="title:'导入excel',closed:true">
			<s:form id="importfrm" enctype="multipart/form-data" theme="simple"  method="post" >
				<table width=100%  >
			        <tr height=30 >
			            <td align=center  >
			                <input type="file" name="uploadfile" id="uploadfile" >
			            </td>
			        </tr>
			        <tr height=30 >
			            <td align=center  >
			                <input type="button" value="保存" onclick="updateload();" >
			            </td>
			        </tr>
			    </table>
			</s:form>
		</div>
	</body>
</html>
