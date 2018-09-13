<?xml version="1.0" encoding="UTF-8"?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="base.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/javascript/framework/sha1.js"></script>
<script type="text/javascript">
$(function(){
	 var L=($(window).width()/2)-($(".login").width()/2);
     var T=($(window).height()/2)-($(".login").height()/2);
     $(".login").css({"left":L,"top":T});

})
</script>
<title>Insert title here</title>
</head>
<body style="position:relative;background-color:#e0ecff;">
<%
com.creditease.model.UserBaseInfo userBaseInfo = 
	com.creditease.sso.client.util.CasClientUtil.getUserBaseInfo(request);
%>
hello, <%= request.getRemoteUser() %>, <%= userBaseInfo.getName() %>
	<div class="login" style="position:absolute;width:500px;height:200px;">
		<div id="loginPanel">
			<form id="loginInputForm" method="post">
				<table cellpadding="5" style="margin:30px auto 10px;">
		    		<tr>
		    			<td>用户名:</td>
		    			<td><input class="easyui-textbox" type="text" name="userId" style="width: 200px;" data-options="required:true,missingMessage:'请填写登录名称'"></input></td>
		    		</tr>
		    		<tr>
		    			<td>密码:</td>
		    			<td><input class="easyui-textbox" type="password" name="password" style="width: 200px;" data-options="required:true,missingMessage:'请填写密码'"></input></td>
		    		</tr>
	    		</table>
			</form>
			<div style="text-align:center;padding:5px">
		    	<a style="margin:0 20px 0 55px;"href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()">登陆</a>
		    	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()">重置</a>
		    </div>
		</div>
	</div>
	<script type="text/javascript">
		$(function() {
			$('#loginPanel').panel({
				width : 500,
				height : 200,
				title : '管理员登录'
			});
		})
		
		//提交表单
		function submitForm(){
			$('#loginInputForm').find('input[name=password]').val(hex_sha1($('#loginInputForm').find('input[name=password]').val()));
			$('#loginInputForm').form('submit', {
				url: '${pageContext.request.contextPath}/user/login',
				onSubmit: function(){
					var isValid = $(this).form('validate');
					return isValid;	// 返回false将停止form提交 
				},
				success: function(data){
					var json = $.parseJSON(data);
					if (json && json.success) {
						window.location.href='${pageContext.request.contextPath}/';
					} else {
						$.messager.show({
							title : '失败',
							msg : json.msg,
							showType:'fade',
							style:{
								right:'',
								bottom:''
							}
						});
					}
				}
			});
		}
		
		//清空表单
		function clearForm(){
			$('#loginInputForm').form('clear');
		}
	</script>
</body>
</html>