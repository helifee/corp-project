<%--
 * @(#)user_role_mgr_userview.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 用户角色管理画面（部分JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/02/08
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:form id="formliebiao"  action="" namespace="" theme="simple" method="post">
<div class="span-5 module">
	<div class="span-5 module_header">
  		<div class="span-2 text_indent_10">
       		<s:label id="liebiao" value="角色列表" />
    	</div>
    	<div class="span-1">
    		<span class="img_opt opt_NewDoc" onClick=""></span>
    	</div>
    </div>
	<div class="module_body">
		<ul class="text_indent_20 list_reset" style="height:320px">
			<s:if test="userRoleInfo.size > 0">
				<s:iterator value="userRoleInfo">
					<li>
						<s:checkbox id="roleId"  name="roleId" value="false" fieldValue="roleId" />
						<s:property value="roleNm" />				
					</li>
				</s:iterator>
			</s:if>
		</ul>
	</div>
</div>
</s:form>
<div class="span-14">
	<strong>调整结果</strong>
</div>
<div class="span-17">
	<s:form id="formdeladd" method="post" theme="simple"  >
		<table class="datagrid2">
			<tr>
				<th class="percent_12">用户ID</th>
				<th>权限区分</th>
				<th>职位/角色ID</th>
				<th>操作人ID</th>
				<th>有效期间 start</th>
				<th>有效期间 end</th>
				<th>flag</th>
				<th>old有效期间 start</th>
			</tr>
			<s:iterator value = "perUserPermitInfo" status="stat" >
			<tr>
				<td class="percent_12"><s:textfield name="perUserPermitInfo[%{#stat.index}].userId" id="perUserPermitInfo[%{#stat.index}].userId" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].permFlag" id="perUserPermitInfo[%{#stat.index}].permFlag" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].posRoleId" id="perUserPermitInfo[%{#stat.index}].posRoleId" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].operatorId" id="perUserPermitInfo[%{#stat.index}].operatorId" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].permitStaDate" id="perUserPermitInfo[%{#stat.index}].permitStaDate" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].permitEndDate" id="perUserPermitInfo[%{#stat.index}].permitEndDate" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].insDelFlag" id="perUserPermitInfo[%{#stat.index}].insDelFlag" theme="simple"/></td>
				<td><s:textfield name="perUserPermitInfo[%{#stat.index}].oldPermitStaDate" id="perUserPermitInfo[%{#stat.index}].oldPermitStaDate" theme="simple"/></td>
			</tr>
			</s:iterator>
		</table>
	<input type="button" id="submit" class="btn" value="提交" onclick="submitPermitInfo()"/>
	</s:form>
</div>





