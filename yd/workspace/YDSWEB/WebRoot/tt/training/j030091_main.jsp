<%--
 * @(#)j030091_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 插入图片画面（主页面JSP）
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
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030091.js"></script>
	
	<title>插入图片</title>
</head>

<body onload="initForm()" style="overflow-x:hidden;overflow-y:hidden;">
<div class="span-20 showgrid">
	<s:form id="uploadPicForm" action="j030091UploadPic.action" target="piclist" method="post" enctype="multipart/form-data"  >	
    	<!-- title -->
        <div class="span-20 padding_top_8 title_tt"><h2>插入图片</h2></div>
        <!--插入图片画面-->        
        <div class="span-20">
        	<div class="span-3 text_right"><s:label value="选择图片："/></div>
            <div class="span-5">
            	<input class="jsFileInput cur_pointer" type="file" id="uploadImg" name="uploadImg" onChange="ff.value=this.value" hidefocus />                
                <input class="span-5" id="filetext" name="ff" readonly/>
            </div>
            <div class="span-2">
                <input class="span-2 btn" type="button" id="btnUpload" value="浏览..." onmouseover="inputMouseover(event)"/>
            </div>
            <div class="span-2 text_right"><s:label value="图片描述："/></div>
            <div class="span-5">
                <input class="span-5" id="text" type="text" name="picRemark" maxlength="200"/>
            </div>
            <div class="last">
                <input class="span-2 btn" type="button" value="上传" onclick="uploadPic()"/>
            </div>
        </div>
        <s:hidden id="objectId" name="objectId"/>
	    <s:hidden id="editNo" name="editNo"/>
	    <s:hidden id="mode" name="mode"/>
	</s:form>
    <div class="span-20">
        <div class="span-3 text_right"><s:label value="图片显示大小："/></div>
        <div class="span-5">
        	<s:radio id="size" name="size" list="#{'1':'原始大小','0':'自定义大小'}" 
        		listKey="key" listValue="value" value="1" onclick="defineSize(this.value)"/>
        </div>            
        <div class="last">
            <div class="span-1 text_right"><s:label value="宽："/></div>
            <div class="span-1"><s:textfield cssClass="span-1" id="widthSize" disabled="true"/></div>                
            <div class="span-1"><s:label value="px"/></div>
            <div class="span-1 text_right"><s:label value="高："/></div>
            <div class="span-1"><s:textfield cssClass="span-1" id="heightSize" disabled="true"/></div>
            <div class="span-1"><s:label value="px"/></div>
        </div>
    </div>
    <div class="span-20">
        <div class="span-3 text_right"><s:label value="边框："/></div>
        <s:radio id="imgFrame" name="imgFrame" list="#{'1':'不显示','0':'显示'}"
        	 listKey="key" listValue="value" value="1"/>
    </div>	
    <s:form id="subInitBook" action="j030091InitPicListBookMode.action" target="piclist">
	    <s:hidden name="objectId"/>
	    <s:hidden name="editNo"/>
	    <s:hidden name="mode"/>
    </s:form>
    <s:form id="subInitQue" action="j030091InitPicListQuesMode.action" target="piclist">
	    <s:hidden name="objectId"/>
	    <s:hidden name="editNo"/>
	    <s:hidden name="mode"/>
    </s:form>
	<div class="span-20" style="height: 490px;">
		<iframe  class="span-20" name="piclist" src="j030091_piclist.jsp"
		         frameborder="0" marginwidth="0" marginheight="0" style="height: 100%;">
		</iframe>
	</div>
</div>  
</body>
</html>