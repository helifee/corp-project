<%--
 * 权限查询画面（一览部分JSP）
 * 
 * @author liangkezhen
 * @version 1.00 2010/02/05
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_perm_permitInfoList" class="span-18 last">
	<s:if test="userPerms.size >= 0">
		<div id="div_perm_list_user" class="span-11 box_border">
			<div id="div_userTitle" class="span-11 font_weight_b box_head_bc last">
				<span>拥有  <span class="color_red" id="labPerName"></span> 权限用户一览</span>
			</div>
			<div class="span-11 last">
				<ul class="list_reset">
					<s:iterator value="userPerms">
						<s:a href="#this" onclick="popInnerPageUserPerms('%{userId}')">
							<li class="text_center span-2 float_l"><s:property value="%{userName}" /></li> 
						</s:a>
					</s:iterator>
				</ul>
			</div>
		</div>
	</s:if>
	<s:if test="roleInfos.size >= 0">
		<div id="div_perm_list_role" class="span-5 box_border">
			<div id="div_roleTitle" class="span-5 font_weight_b box_head_bc last">
				<span>拥有 <span class="color_red" id="labPerName2"></span> 权限角色一览</span>
			</div>
			<div class="prepend-1 span-4 last">
				<ul class="list">
					<s:iterator value="roleInfos">
						<s:a href="#this" cssClass="block" onclick="popInnerPageRoleInfos('%{roleId}')">
							<li class="span-3"><s:property value="roleName" /></li>
						</s:a>
					</s:iterator>
				</ul>
			</div>
		</div>
	</s:if>
</div>
