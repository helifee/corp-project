<%--
 * @(#)g010021_password_maintenance.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 权限管理
--%>

<%--
 * 权限管理画面
 * 
 * @author guozhizhou
 * @version 1.00 2010/03/12
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24 padding_top_2 padding_bottom_2">
  	<!-- 原管理员帐号 -->
	<s:form id="passwordForm" action="g010021UpdAdminAccountInfo" method="post" validate="true">
	<div class="span-24 margin_top_10">
   		<div class="prepend-7 span-3 text_right">原管理员帐号：</div>
   		<div class="span-5 append-9 last" id="aaaa">
   			<s:textfield id="oldAdminId" name="g010021aInfo.oldAdminId" cssClass="span-5" maxlength="20" />
		</div>
    	</div>
    <!-- 原管理员密码 -->
	<div class="span-24 margin_top_6 margin_bottom_10">
   		<div class="prepend-7 span-3 text_right">原管理员密码：</div>
   		<div class="span-5 append-9 last">
   			<s:password id="oldAdminPsw" name="g010021aInfo.oldAdminPsw" cssClass="span-5" maxlength="20" />
		</div>
       </div>
    <!-- 新管理员帐号 -->
	<div class="span-24 margin_top_10">
   		<div class="prepend-7 span-3 text_right">新管理员帐号：</div>
   		<div class="span-5 append-9 last">
			<s:textfield id="newAdminId" name="g010021aInfo.newAdminId" cssClass="span-5" maxlength="20" />
		</div>
       </div>
    <!-- 新管理员密码 -->
	<div class="span-24 margin_top_6">
   		<div class="prepend-7 span-3 text_right">新管理员密码：</div>
   		<div class="span-5 append-9 last">
   			<s:password id="newAdminPsw" name="g010021aInfo.newAdminPsw" cssClass="span-5" maxlength="20" />
   		</div>
	</div>
	<!-- 确认新管理员密码 -->
	<div class="span-24 margin_top_6">
   		<div class="prepend-7 span-3 text_right">确认新管理员密码：</div>
   		<div class="span-5 append-9 last">
   			<s:password id="passwordConfim" name="g010021aInfo.passwordConfim" cssClass="span-5" maxlength="20" />
   		</div>
	</div>
	<!-- 确认 清空按钮 -->
	<div class="span-23 append-1 margin_top_10 margin_bottom_10">
   		<div class="prepend-9 span-2">
       		<input type="button" class="span-2 btn" value="确认" id="corfim"; onclick="saveModifyPassword();"/>
		</div>
		<div class="prepend-1 span-2 append-9 last">
   			<input type="button" class="span-2 btn" value="清空" id="reset"; onclick="passwordClear();"/>
   		</div>
	</div>
	<div class="span-24" id = "div_err">
		<s:fielderror></s:fielderror>
	</div>
	</s:form>
</div>
