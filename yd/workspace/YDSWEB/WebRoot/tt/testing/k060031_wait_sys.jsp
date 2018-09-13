<%--
 * @(#)K060031_wait_sys.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 课考试开始等待
 * 
 * @author chenjunshuai
 * @version 1.00 2010/10/13
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<s:date name="systemTime" id="systemTimeFormat" format="yyyy-MM-dd HH:mm:ss" />
	<s:hidden id="sysTime" value="%{systemTimeFormat}" />
