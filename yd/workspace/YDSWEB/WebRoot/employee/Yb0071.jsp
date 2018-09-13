<%--
 * @(#)Yb0071.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 组信息新建/修改画面
 * 
 * @author fangjiayuan
 * @version 1.00 2010/08/10
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div id="teamTitle" class="none">组信息</div>
<div id="div_emp_team"  class="span-14 last">
	<s:form id="teamCreatForm" action="yb0070InsertTeamInfo" namespace="/employee" method="post" validate="true">
		<div class="span-14 last">
			<div class="span-14 last">
				<div class="span-7 margin_bottom_6 margin_top_10">
					<div class="span-2 text_right">
						<span>组名<span class="color_red">*</span></span>
					</div>
					<s:textfield id="teamNm" name="teamInfo.teamNm" maxlength="20" cssClass="span-3"/>
					<s:hidden id="teamId" name="teamInfo.teamId"></s:hidden>
				</div>
				<div class="span-7 margin_bottom_6 margin_top_10 last">
					<div class="span-2 text_right">
						<span>组略称<span class="color_red">*</span></span>
					</div>
					<s:textfield id="teamSnm" name="teamInfo.teamSnm" maxlength="10" cssClass="span-3"/>
				</div>
			</div>
			<div class="span-14 last">
				<div class="span-9 margin_bottom_6 margin_top_6">
					<div class="span-2 text_right">
						<span>属性</span>
					</div>
					<s:hidden id="loginUserId" value="%{#session.userinfo.userId}"></s:hidden>
					<s:hidden id="loginUserNm" value="%{#session.userinfo.userName}"></s:hidden>
					<div class="span-6 text_left">
						<s:radio id="teamDiffNm" name="teamInfo.teamFlg" list="teamTypeList" listKey="diffNo" listValue="diffName" value="teamInfo.teamFlg" onclick="teamLeaderIdAdd()"/>
					</div>
				</div>
			</div>
			<div class="span-14 last">
				<div class="span-7 margin_bottom_6 margin_top_6 last">
					<div class="span-2 text_right">
						<span>组长<span class="color_red">*</span></span>
					</div>
					<s:textfield id="teamLeaderId" name="teamInfo.teamLeaderId" maxlength="6" cssClass="span-2"/>
					<s:textfield id="teamLeaderNm" name="teamInfo.teamLeaderNm" cssClass="span-3"/>
				</div>
				<div class="span-2 text_right margin_top_6 margin_bottom_6">
					<s:checkbox id="joinApplyFlga" name="teamInfo.joinApplyFlg" value="applayFlg" fieldValue="1" cssClass="padding_top_6"/>					
				</div>
				<div class="margin_top_6 margin_bottom_6">
					<label  onclick="selectYesOrNo()">成员加入/退出需要组长审批</label>
				</div>			
			</div>
			<div class="span-14 last">
				<div class="span-14 margin_bottom_6 margin_top_6 last">
					<div class="span-2 text_right" >
						<span>成员</span>
					</div>					
					<div class="span-9 last ">
						<s:textarea id="userNm" name="teamInfo.teamUserNm" rows="8" cols="45" disabled="true" cssClass="span-8 bgclr_fff"></s:textarea>
						<s:hidden id="userId" name="teamInfo.teamUserId"></s:hidden>		
					</div>
					<div class="span-3 last ">
						<input type="button" id="choose" name="choose" value="选择人员" class="span-2 btn" onclick="chooseUser()"/>	
					</div>
				</div>				
			</div>	
			<div class="span-14 last">
				<div class="prepend-2 span-5 text_left">
					<s:label value="共" />
					<s:label id="userCnt" name="teamInfo.userCnt" />
					<s:label value="人" />
				</div>
			</div>
		</div>
	</s:form>
	<div class="prepend-9 span-5 last margin_bottom_6 margin_top_10">
		<input type="button" id="search" name="search" value="保存" class="span-2 btn" onclick="saveTeamInfo()"/>
<!--		<input type="button" id="clear" name="clear" value="关闭" class="span-2 btn" onclick="cancelTeamInfo()"/>	-->
	</div>
</div>
