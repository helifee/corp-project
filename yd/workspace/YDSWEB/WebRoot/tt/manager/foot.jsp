<%--
 * @(#)foot.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 共通
--%>

<%--
 * 共通底部
 * 
 * @author qianguorong
 * @version 1.00 2010/03/11
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
String requestUrl =  request.getServletPath()+"?"+request.getQueryString();
%>
  	<div class="span-24 bottom text_center margin_top_4">
   		<div class="bottom_left"></div>
    	<div class="bottom_c">
    		<p>大连远东计算机系统版权所有<font face="arial" >&copy;</font>2010</p>
    	</div>
   		<div class="bottom_right">
   		建议使用IE7以上。如有疑问请与技术人员联系或者点击   
           	<s:url action="../../common/initAdvice.action" id="url">
				<s:param name="subSys" value="'TT'"></s:param>
 				<s:param name="pageId" value=""></s:param>
           	</s:url>
			<s:a href="%{url}" target="_blank" title="向维护人员反馈建议，意见和错误">意见反馈</s:a>
   		</div>
  </div>
  <div class="clear_both"></div>
  </div>