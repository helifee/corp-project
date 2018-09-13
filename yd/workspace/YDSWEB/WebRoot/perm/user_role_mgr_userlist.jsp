<%--
 * @(#)user_role_mgr_userlist.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 用户角色管理画面（一览部分JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/02/08
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">    
<div class="span-14" >
    <table class="span-13 datagrid2">
      <tr >
		<th class="percent_12">用户ID</th>
		<th class="percent_14">用户姓名</th>
		<th class="percent_10">角色ID</th>
		<th class="percent_14">角色姓名</th>
		<th class="percent_20">有效期间 start</th>
		<th class="percent_18">有效期间 end</th>
		<th class="percent_10">角色数</th>
	</tr>
    </table>
    <div id="MingXiXiangQing" style="OVERFLOW-Y: scroll;width:525px; OVERFLOW-X:hidden;height:336px;border-bottom:1px solid; border-left:1px solid">
	     <table class="span-13 datagrid2">
		      <s:if test="userRoleMgrInfo.size > 0">
				<s:iterator value="userRoleMgrInfo">
					<tr>
					    <td class="percent_12"><s:property value="userId" /></td>
					    <td class="percent_14"><s:property value="userCnm" /></td>
						<td class="percent_10"><s:property value="roleId" /></td>
						<td class="percent_14"><s:property value="roleNm" /></td>
						<td class="percent_20"><s:property value="permitStaDate" /></td>
						<td class="percent_18"><s:property value="permitEndDate" /></td>
						<td class="percent_10"><s:property value="roleNum" /></td>				
					</tr>
				</s:iterator>
			</s:if>     
	    </table>
    </div>
</div>

