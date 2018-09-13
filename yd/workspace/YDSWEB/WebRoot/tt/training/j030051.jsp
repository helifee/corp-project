<%--
 * @(#)j30051.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 教材内容编辑画面
 * 
 * @author zhanghaibo
 * @version 1.00 2010/04/01
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>教材内容编辑</title>
<!--[if IE]>
	<link rel="stylesheet" href="../../css/ie.css" type="text/css" media="screen, projection" />
<![endif]-->
<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/ttTraining/j030051.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ckeditor/ckeditor.js"></script>

</head>
<body onload="initForm()">
<%-- 生成校验js action="updBookInfoAction" method="post" namespace="/tt/training" validate="true" --%>
<%-- 正式运行用   id="mainForm" method="post"  --%>
<s:include value="%{basePath}/tt/manager/operateTip.jsp"></s:include>
<div class="container showgrid">

	<s:form id="mainForm" method="post" >
	    <!-- title -->
	    <div class="padding_top_8 title_tt span-24"><h2>教材内容编辑</h2></div>
	    <div class="span-24">
	    	<div class="span-2">
	    		<input id="btnSave" title="可用快捷键Ctrl+S" type="button" value="保存" class="span-2 btn" onclick="save()" />
	    	</div>
	    	<div class="span-2">
	    		<input id="btnClose" type="button" value="关闭" title="关闭并解锁画面" class="span-2 btn" onclick="quitEdit()" />
	    	</div>
        </div>
	    <div class="span-24 margin_top_6">
	        <div class="span-2 text_right"><s:label value="标题："/></div>
	        <div class="span-22 last">
	        	<s:textfield id="chapterTitle" name="bookContentInfo.chapterTitle" 
	                    		maxlength="100" cssClass="span-12" />
	            <s:hidden id="bookId" name="bookContentInfo.bookId"></s:hidden>
	            <s:hidden id="editNo" name="bookContentInfo.editNo"></s:hidden>
	            <s:hidden id="chapterNo" name="bookContentInfo.chapterNo"></s:hidden>
            </div>
	    </div>
	    <div class="span-24">
	    	<s:textarea id="editor" name="bookContentInfo.bookContent" >
	    	</s:textarea>
	    </div>
	    <div class="span-13">
	    	<input type="button" id="add" name="add" class="span-2 btn" value="添加" onclick="addline()"/>				
	   		<table id="anchorsTable" class="datagridtt ellipsis">
				<tr>
					<th class="span-4 text_center">锚点链接显示名</th>
					<th class="span-4 text_center">锚点名称</th>
					<th class="text_center">锚点内容</th>
				</tr>
				<s:iterator value="anchorInfos" status="stat">
					<tr>
		               	<td class="span-4 text_center">
		                	<s:textfield name="anchorInfos[%{#stat.index}].linkId" id="linkId%{#stat.index}" theme="simple"/>
		                </td>
		            	<td class="span-4 text_center">
							<s:textfield name="anchorInfos[%{#stat.index}].linkName" id="linkName%{#stat.index}" theme="simple"/>
						</td>
						<td class="text_center">
							<s:textfield name="anchorInfos[%{#stat.index}].linkTxt" id="linkTxt%{#stat.index}" theme="simple" readOnly='true'/>
						</td>
					</tr>
				</s:iterator>
				<tr id="cloneline" class="none">
					<td class="span-4 text_center">
						<s:textfield name="linkId" id="linkId" theme="simple"/>
					</td>
					<td class="span-4 text_center">
						<s:textfield name="linkName" id="linkName" theme="simple"/>
					</td>
					<td class="text_center">
						<s:textfield name="linkTxt" id="linkTxt" theme="simple" readOnly='true'/>
					</td>
				</tr>
			</table>
			<div class="span-14">
				<s:textarea cssClass="span-13" id="txtInnerLinkText" name="bookContentInfo.innerIndex" rows="4" cols="50" readOnly='true'/>
				<input type="button" id="btnAddAnchorTxt" class="span-2 btn" value="合成" onclick="addInnerIndex()"/>
           	</div>
	    </div>
	</s:form> 
	<div class="prepend-2">
	<s:fielderror></s:fielderror>
	</div>
	<div class="clear_both"></div>  
</div>
</body>
</html>