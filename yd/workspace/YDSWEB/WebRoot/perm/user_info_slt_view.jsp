<%--
 * @(#)user_info_slt_view.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 部门管理画面（检索用户基本信息JSP）
 *
 * @author chenyuer
 * @version 1.00 2010/01/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 用户基本信息检索画面 -->
<div class="span-24">
	<div class="span-6 margin_bottom_4">
		<div class="span-3 text_right">	
			<s:label id="userIdLbl" value="用户ID"/>
		</div>
		<s:textfield id="SltUserId" name="userInfo.userId"
	 		maxlength="6" cssClass="span-2"/>
	</div>
	<div class="span-8 margin_bottom_4">
		<div class="span-3 text_right">	
			<s:label id="userCPNmLbl" value="姓名(拼音)"/>
		</div>
		<s:textfield id="SltUserCPNm" name="userInfo.userCPNm"
		 	maxlength="30" cssClass="span-4"/>
	</div>	
	<div class="span-10 margin_bottom_4 last">
		<div class="span-3 text_right">	 	
		<s:label id="userCnmLbl" value="中文姓名"/>
		</div>
		<s:textfield id="SltUserCNm" name="userInfo.userCnm" 
			maxlength="30" cssClass="span-3"/>
	</div>	
</div>
<div class="span-24">
	<div class="span-7 margin_bottom_4">
		<div class="span-3 text_right">	 	
    		<s:label id="startDateFromLbl" value="入社日期From"/>
		</div>
		<s:textfield id="SltStartDateFrom" name="userInfo.startDateFrom"
	 		maxlength="10" onclick="WdatePicker()" cssClass="span-3"/>
	</div>
	<div class="span-8 margin_bottom_4">
		<div class="span-1 text_right">	
	 		<s:label id="wavesLineLbl" value="～"/>
	 	</div>
	 	<div class="span-3 text_right">
			<s:label id="startDateToLbl" value="入社日期To"/>
		</div>
		<s:textfield id="SltStartDateTo" name="userInfo.startDateTo"
		 	maxlength="10" onclick="WdatePicker()" cssClass="span-3"/>
	</div>
	<div class="span-6 margin_bottom_4">
		<div class="span-2 text_right">
			<s:label id="userDptLbl" value="所属部门"/>
		</div>
		<s:select id="SltDeptList" name="userInfo.deptId" list="deptList"
			listKey="deptId" listValue="deptNm" />
	</div>
</div>
<div class="span-24">
	<div id="div_userState" class="span-9 margin_bottom_4">
		<div class="span-3 text_right">
			<s:label id="userStateLbl" value="用户状态"/>
		</div>
		<s:if test="userStateList.size > 0">
			<s:iterator value="userStateList">
				<s:checkbox name="diffNo" fieldValue="%{diffNo}"/>
				<s:property value="diffName" />
			</s:iterator>
		</s:if>
	</div>
	<div id="div_empStatus" class="span-15 margin_bottom_4 last">
		<div class="span-2 text_right">
        	<s:label id="empStatusLbl" value="员工属性"/>
        </div>	
		<s:if test="empStatusList.size > 0">
			<s:iterator value="empStatusList">
				<s:checkbox name="diffNo" fieldValue="%{diffNo}"/>
				<s:property value="diffName"/>
			</s:iterator>
		</s:if>    
    </div>
</div>
<div id="div_pos" class="span-24">
	<div class="span-3 text_right">
		<s:label id="userPosition" value="职位"/>
	</div>	
		<s:if test="posList.size > 0">
		<s:iterator value="posList">
				<s:checkbox name="posId" fieldValue="%{posId}"/>
				<s:property value="posName" />
		</s:iterator>
		</s:if> 
</div>  
	<div align="right">
		<input type="button" id="refer" name="refer" value="检索"
			class="btn" onclick="getUserInfo();"/>
		<input type="button" id="searchCancle" name="cancle" value="取消"
			class="btn" onclick="clearUserInfo(0);"/>
	</div>
