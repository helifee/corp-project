<%--
 * @(#)k060151.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试试卷生成一览画面（主页面JSP）
 * 
 * @author shiyanyan
 * @version 1.00 2010/03/30
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
	<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/ttTesting/k060151.js"></script>
	
	<title>考试试卷生成一览</title>
</head>

<body>
<div class="container showgrid">
<input type="hidden" id="basePath" value="<%=basePath%>" />
<s:include value="%{basePath}/tt/manager/head.jsp" />　　
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="%{basePath}/tt/manager/navigator.jsp" />
	<s:form id="paperListForm" action="k060151UpdatePaperDetails" method="post">		
		<!-- title -->
    	<div class="span-24 padding_top_8 title_tt"><h2>考试试卷生成一览</h2></div>
        
		<div class="span-24">
	    <div class="span-4 text_right">
	    	<s:label value="考试名称："/>
	    </div>
	    <div class="last text_left">
	    	<s:property value="examineInfo.examineId" />
	    	<s:hidden id="examineId" name="examineId"/>
	    	<s:property value="examineInfo.examineName" />
	    </div>
		</div>
		<div class="span-24">
		    <div class="span-4 text_right">
		    	<s:label value="考试说明："/>
		    </div>
		    <div class="last text_left">
		    	<s:property value="examineInfo.examineComment" />
		    </div>
		</div>
		<div class="span-24">
		    <div class="span-4 text_right">
		    	<s:label value="考试时间："/>
		    </div>
		    <div class="text_left last">
				<s:date name="examineInfo.examineStartDate" id="examineStartDateFormat" format="yyyy-MM-dd HH:mm" />
				<s:property value="%{examineStartDateFormat}" />
				～
				<s:date name="examineInfo.examineEndDate" id="examineEndDateFormat" format="yyyy-MM-dd HH:mm" />
				<s:property value="%{examineEndDateFormat}" />
		    </div>
		</div>
		<div class="span-24">
		    <div class="span-4 text_right">
		    	<s:label value="考试分类："/>
		    </div>
		    <div class="last text_left">
		    	<s:property value="examineInfo.categoryName" />
		    </div>
		</div>
		<div class="span-23 prepend-h">
            <div class="span-3"><s:label value="未分卷子人数："/><s:label id="noPaperNum" value="0"></s:label></div>
            <div class="prepend-18 span-2 last"><input class="span-2 btn" type="button" value="确定" onclick="updatePaperDetails()"/></div>
		</div>
		<!--考试试卷一览-->
		<div class="span-23 prepend-h">
			<table class="datagridtt">
            	<tr>
                	<th class="percent_8 text_center"><span>NO.</span></th>
                    <th class="percent_15 text_center"><span>试卷</span></th>
                    <th class="percent_12 text_center" colspan="3"><span>张数</span></th>
                </tr>
				<s:iterator value="picPaperInfos" status="stat">
	            	<tr>
                    	<td class="text_center"><s:property value="#stat.index + 1" /></td>
                        <td>
                        	<s:property value="paperId" />
                        	<s:property value="paperNo" />
                        	<s:hidden id="examineId%{#stat.index}" name="picPaperInfos[%{#stat.index}].examineId" />
                        	<s:hidden id="paperNo%{#stat.index}" name="picPaperInfos[%{#stat.index}].paperNo" />
                        	<s:hidden id="paperId%{#stat.index}" name="picPaperInfos[%{#stat.index}].paperId" />
                        	<s:hidden id="paperVersionNo%{#stat.index}" name="picPaperInfos[%{#stat.index}].paperVersionNo" />
                        	<s:hidden id="paperNumIdHide%{#stat.index}" name="picPaperInfos[%{#stat.index}].paperNum" />
                        	<s:hidden id="paperTitle%{#stat.index}" name="picPaperInfos[%{#stat.index}].paperTitle" />
                        	<s:hidden id="paperDescription%{#stat.index}" name="picPaperInfos[%{#stat.index}].paperDescription" />
                        	<s:hidden id="bigquestionNum%{#stat.index}" name="picPaperInfos[%{#stat.index}].bigquestionNum" />
                        	<s:hidden name="picPaperInfos[%{#stat.index}].RandomBigquestionFlg" />
                        </td>
                        <td class="text_right">			                               
			   	        	<s:label id="paperNumId%{#stat.index}" name="paperNum" />
			   	        </td>
                        <td class="percent_8 text_center" onclick="addPaperNum(${stat.index})"><a class="cur_pointer" >↑</a></td>
                        <td class="percent_8 text_center" onclick="mulPaperNum(${stat.index})"><a class="cur_pointer" >↓</a></td>
                   	</tr>	
				</s:iterator> 
			</table>
		</div>   	
	</s:form>
<div class="prepend-2">
<s:fielderror></s:fielderror>
</div>
<div class="clear_both"></div>
</div>
</div>
<s:include value="../manager/foot.jsp" />	
</div>
</body>
</html>
