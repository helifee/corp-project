<%--
 * @(#)Yd0050.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 团购系统
--%>

<%--
 * 订单一览（主页面JSP）
 * 
 * @author 远东)lincheng
 * @version 1.00 2010/11/05
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript">

		function init() {
	
			new JsNameFilter("idInput", "nameInput", "../", false);
	
		}
		function dosubmit() {
			var pars;
			var attId;
			var url;
			if ($('iotime').value=="" || ('idInput').value == ""){
				return ;
			}
			attId = $('idInput').value-138800;
			pars = "ioDataList[0].holderNo=0000&ioDataList[0].ioTime=";
			pars = pars + $('iotime').value;
			pars = pars + "&ioDataList[0].gateNo=03-4&ioDataList[0].attendanceId=";
			pars = pars + attId;
			url = "<%=basePath%>"+"ws/ioDataSync.action";
			//post(url,pars);
			new Ajax.Request(url, {
				method: 'post',
				parameters: pars,
				onSuccess: function(response) {
					var returnText = response.responseText;
					if (checkException(response)) return;
					if (returnText='0'){
						MsgBox.message('打卡成功！');  
					}else {
						MsgBox.message('打卡失败！');  
					}

					
				}
			});
		}
	</script>
	<title>打卡测试</title>
</head>
<body onload="init()">
	<div class="ydscontainer">
		<div class="prepend-1 span-18">
			如果重新打卡，请先将com_iodata表中的HOLDER_NO='0000'且IOTIME和EMP_ID为相应时间和用户的数据删除。<br>
			如 ：  DELETE FROM com_iodata WHERE holder_no = '0000';
		</div>
		<div class="prepend-1 span-18">
			<div class=" prepend-1 span-8">
				员工ID： <input type="text" class="span-2" id="idInput" name="idInput"/>
				姓名： <input type="text" class="span-2" id="nameInput" name="nameInput"/>
			</div>
			<div class ="span-6">
				打卡时间：<input type="text" class="span-4" id="iotime" name="iotime" value="" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
			</div>
			<div class ="span-3 last">
				<input type="button" onclick="dosubmit()" class="btn span-2" value="提交">
			</div>
		</div>
	</div>
</body>
</html>