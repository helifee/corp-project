<%--
 * 用户职位管理画面（按用户）
 * 
 * @author yuanjinling
 * @version 1.00 2010/01/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:form id="formsearch" action="getUserPosMgrUserListUserAction" method="post" theme="simple">
  <div class="span-5">
    <s:label value="部门" />
    <s:select id="deptId" name="userPosMgrUserDetailInfo.deptId" listValue="deptNm" list="deptList" listKey="deptId" cssClass="w_150" />
  </div>
  <div class="span-3">
    <s:label value="入社年" />
    <s:textfield id="userStartYear" name="userPosMgrUserDetailInfo.userStartYear" label="入社年" maxlength="4" cssClass="span-1" theme="simple" ></s:textfield>
  </div>
  <div class="span-5">
    <s:label value="姓名" />	
    <s:textfield id="userNm" name="userPosMgrUserDetailInfo.userNm" label="姓名" cssClass="span-3" theme="simple"></s:textfield>
  </div>
  <div class="span-2">
    <input type="button" value="检索" onclick="searchUsePos()"/>
  </div>
</s:form> 
<br>
<div class="span-23 last">
  <a href="#this" onClick="toggleAll();">
    <span id="icon_all" class="img_opt"></span>
    <span id="txt_all">All</span>
  </a>
</div>
<div id="UserPosMgrList" class="span-24">
  <s:include value="user_pos_mgr_user_list.jsp" />
</div>
<div class="span-24">
<s:form id="deladd" method="post" theme="simple" > 	
 <br/>
 <br>
<table>
	<tr>
		<td align="center" width="80" bgColor="#6c95d0"><font color="#FFFFFF">用户IDY</font></td>
		<td align="center" width="130" bgColor="#6c95d0"><font color="#FFFFFF">权限区分Y</font></td>
		<td align="center" width="110" bgColor="#6c95d0"><font color="#FFFFFF">职位/角色IDY</font></td>
		<td align="center" width="110" bgColor="#6c95d0"><font color="#FFFFFF">操作人IDY</font></td>
	</tr>
	<tr align="center">
		<td align="center"><s:textfield name="perUserPermitInfo.userId" id="userId" theme="simple"></s:textfield></td>
		<td align="center"><s:textfield name="perUserPermitInfo.permFlag" id="permFlag" theme="simple"></s:textfield></td>
		<td align="center"><s:textfield name="perUserPermitInfo.posRoleId" id="posRoleId" theme="simple"></s:textfield></td>
		<td align="center"><s:textfield name="perUserPermitInfo.operatorId" id="operatorId" theme="simple"></s:textfield></td>
	</tr>
</table>
<input type="submit" value="插入" style="WIDTH: 60px; HEIGHT: 24px" onclick="delOrAdd(this)" id="ins"/>
<input type="submit" value="删除" style="WIDTH: 60px; HEIGHT: 24px" onclick="delOrAdd(this)" id="del"/>
</s:form>
</div>
