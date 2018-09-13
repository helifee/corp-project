<%--
 * @(#)Ye0052.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *      SubSystem: 考勤系统
--%>

<%--
 * 审批意见画面
 * 
 * @author pengchuan
 * @version 1.00 2010/12/08
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-8">
  <div>
  		审批意见:
  </div>
  <s:form id="attCorInfoForm" action="ye0050AttOperate" method="post" namespace="/att" validate="true" >
	  <div>
	  		<s:textarea id="reason" name="attCorrect.exaReason" rows="10" cols="60"/>
	  </div>
  </s:form>
  <div class="text_center">
  		<input type="button" value="确定"  class="span-2 btn color_blue text_center" onclick="reason()"/>
  </div>
</div>