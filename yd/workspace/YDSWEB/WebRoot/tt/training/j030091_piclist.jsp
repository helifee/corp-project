<%--
 * @(#)j030091_piclist.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 插入图片画面（子页面JSP）
 * 
 * @author shiyanyan
 * @version 1.00 2010/04/12
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
	<script type="text/javascript" src="../../js/ttTraining/j030091.js"></script>
	
	<title>插入图片</title>
</head>

<body onload="initSub()" style="overflow-x:hidden;overflow-y:auto;">
<div class="span-20 showgrid prepend-h">
<s:form id="deletePicForm" action="j030091DeletePic.action" method="post" enctype="multipart/form-data"  >		
	<table>
  		<!-- 预设格式 -->
	  	<tr>
	  		<td class="percent_24"></td>
	  		<td class="percent_24"></td>
	  		<td class="percent_24"></td>
	  		<td></td>
	  	</tr>
	    <!-- 教材图片资料 -->
	    <s:if test="mode == 1">		   
	    	<s:iterator value="bookAttachmentsList" status="stat">
	    		<s:if test="#stat.index%4==0">
	    			<tr>
	    		</s:if>
	    			<td>	    				
	    				<div class="span-4 text_center">
                			<div class="span-4"><s:label id="picDescribe%{#stat.index}" 
                				 	     name="remark"  />&nbsp;
                			</div>
                			<div class="span-4">
                				<img class="span-4 ttImg" src="../../tt/manager/getFile.action?flag=BOOK_IMAGE&fileName=${dataId}" 
                					 alt="${dataName}"/>
                			</div>
                			<div class="span-4 last">
                    			<input class="span-2 btn" type="button" value="引用" onclick="recommendPic('${dataId}','${remark}')"/>
                    			<input class="span-2 btn" type="button" value="删除" onclick="deletePic('${dataId}')"/>
                			</div>             		
						</div>							    			
	    			</td>
	    		<s:if test="(#stat.index+1)%4==0 || #stat.isLast()">
	    			</tr>
				</s:if>
	    	</s:iterator>
	    </s:if>
	    <!-- 题库图片资料 -->
	    <s:if test="mode==2">	
	    	<s:iterator value="questionAttachmentsList" status="stat">
	    		<s:if test="#stat.index%4==0">
	    			<tr>
	    		</s:if>
	    			<td>
	    				<div class="span-4 text_center">
                			<div class="span-4"><s:label id="picDescribe%{#stat.index}" 
                				 	     name="comment" />&nbsp;
                			</div>
                			<div class="span-4">
                				<img class="span-4 ttImg" src="../../tt/manager/getFile.action?flag=QUESTION_IMAGE&fileName=${fileId}" 
                					 alt="${fileName}"/>
                			</div>
                			<div class="span-4 last">
                    			<input class="span-2 btn" type="button" value="引用" onclick="recommendPic('${fileId}','${comment}')"/>
                    			<input class="span-2 btn" type="button" value="删除" onclick="deletePic('${fileId}')"/>
                			</div>
						</div>	    			
	    			</td>
	    		<s:if test="(#stat.index+1)%4==0 || #stat.isLast()">	
	    			</tr>
				</s:if>
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