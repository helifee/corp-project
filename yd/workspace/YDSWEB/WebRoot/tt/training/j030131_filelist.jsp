<%--
 * @(#)j030131_filelist.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 插入下载文件画面（子页面JSP）
 * 
 * @author shiyanyan
 * @version 1.00 2010/04/28
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
	<!--[if IE]>
		<link rel="stylesheet" href="../../css/ie.css" type="text/css" media="screen, projection" />
	<![endif]-->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="../../js/common/prototype.js"></script>
	<script type="text/javascript" src="../../js/common/util.js"></script>
	<script type="text/javascript" src="../../js/common/commonMessage.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="../../js/ttTraining/j030131.js"></script>
	
	<title>插入下载文件</title>
</head>

<body onload="initSub()" style="overflow-x:hidden;overflow-y:auto;">
<div class="span-20 showgrid">
	<s:form id="deleteFileForm" action="j030131DeleteFile.action" method="post" enctype="multipart/form-data"  >		
	  <table class="datagridtt ellipsis">
	  	<tr>
        	<th class="percent_24 text_center"><span>资料名称</span></th>
            <th class="percent_24 text_center"><span>描述</span></th>
            <th class="percent_14 text_center"><span>大小</span></th>
            <th class="percent_10 text_center"><span>创建日期</span></th>
            <th class="percent_10 text_center"><span>创建者</span></th>
            <th class="text_center" colspan="2"><span>操作</span></th>
        </tr>
	    <!-- 教材文件资料 -->
	    <s:if test="mode == 1">		   
	    	<s:iterator value="bookAttachmentsList" status="stat">
	    		<tr>
	    			<td class="text_center">
	    				<s:url action="../../tt/manager/getFile?flag=BOOK_FILE" id="getFileActionUrl">
							<s:param name="fileName" value="%{dataId}"></s:param>
						</s:url>
       				 	<s:a href="%{getFileActionUrl}" title="%{dataName}"><s:property value="dataName"/></s:a>
       				</td>
	    			<td class="text_center">
	    				<s:label title="%{remark}" name="remark"/>
	    			</td>
	    			<td class="text_center"><s:property value="size"/></td>
	    			<td><s:property value="createTime"/></td>
	    			<td class="text_center"><s:property value="createUserName"/></td>
	    			<td class="text_center"><a href="#" onclick="deleteFile('${dataId}')">删除</a></td>
	    			<td class="text_center"><a href="#" onclick="recommendFile('${dataId}','${dataName}')">引用</a></td>
	    		</tr>
	    	</s:iterator>
	    </s:if>
	    <!-- 题库文件资料 -->
	    <s:if test="mode==2">	
	    	<s:iterator value="questionAttachmentsList" status="stat">
	    		<tr>
	    			<td class="text_center">
	    				<s:url action="../../tt/manager/getFile?flag=QUESTION_FILE" id="getFileActionUrl">
							<s:param name="fileName" value="%{fileId}"></s:param>
						</s:url>
	    				<s:a href="%{getFileActionUrl}"><s:property value="fileName"/></s:a>
	    			</td>
	    			<td class="text_center"><s:property value="comment" /></td>
	    			<td class="text_center"><s:property value="fileSize" /></td>
	    			<td><s:property value="createTime" /></td>
	    			<td class="text_center"><s:property value="createUserName" /></td>
	    			<td class="text_center"><a href="#" onclick="deleteFile('${fileId}')">删除</a></td>
	    			<td class="text_center"><a href="#" onclick="recommendFile('${fileId}','${fileName}')">引用</a></td>	    			
	    		</tr>
	    	</s:iterator>
	    </s:if>
	  </table>
	  <s:hidden id="objectId" name="objectId"/>
	  <s:hidden id="editNo" name="editNo"/>
	  <s:hidden id="mode" name="mode"/>
	  <s:hidden id="dataId" name="dataId"/>
   	</s:form>
</div>
</body>
</html>