<%--
 * @(#)Yd0012.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>
<%--
 * 转账画面
 * 
 * @author pengchuan
 * @version 1.00 2010/11/01
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_trans_acc"  class="span-8 show_grid container last">
	<s:form id="transrAccForm" action="yd0010SaveTrans" method="post" namespace="/gps" validate="true">
		<div id="errorMessage" class="prepend-2 span-5 last">
			<s:fielderror></s:fielderror>
		</div>
		<div class="span-8 last">
				<div class="span-8 last">
					<div class="span-2 text_right">
						<s:label value="转账对象" />
						<span class="color_red">*</span>
					</div>
					<s:textfield id="accId" name="tansferCondA.inId" maxlength="6" cssClass="span-2" />
				 	<s:textfield id="accName" maxlength="20" cssClass="span-2" />
				 	<s:hidden id="loginId" value="%{#session.userinfo.userId}"></s:hidden>
				</div>
		</div>
		<div class="span-8 last">
		        <div class="span-8 last">
					<div class="span-2 text_right">
						<s:label value="转账金额" />
						<span class="color_red">*</span>
					</div>
					<s:textfield id="transMoney" name="tansferCondA.exMoney" maxlength="6" tooltip="请输入金额"  tagtype="money" cssClass="span-2 text_right padding_right_2"/>
				    <s:label value="元"></s:label>
				</div>
		</div>
	    <div class="span-8 margin_top_8 text_center last">
			<input type="button" id="refer" name="refer" value="保存" class="btn span-2" onclick="submitTransAcc()" />
	    </div>
  </s:form>
</div>