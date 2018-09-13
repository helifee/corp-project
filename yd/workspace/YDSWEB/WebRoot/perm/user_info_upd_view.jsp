<%--
 * @(#)user_info_upd_view.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 用户信息管理画面（新建/修改用户信息栏JSP）
 *
 * @author chenyuer
 * @version 1.00 2010/01/07
 --%>

<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 新建/修改用户基本信息画面 -->
<div class="span-24">
	<div class="span-6 margin_bottom_4">
		<div class="span-2 text_right">
			<s:label id="userIdLbl" value="用户ID" />
			<span class="color_red">*</span>
		</div>
		<s:textfield id="UpdUserId" name="userInfo.userId" 
	 			maxlength="6" cssClass="span-2"/>
	</div>
	<div class="span-8 margin_bottom_4">
		<div class="span-3 text_right"> 		
			<s:label id="userCPNmLbl" value="姓名(拼音)"/>
			<span class="color_red">*</span>
		</div>
		<s:textfield id="UpdUserCPNm" name="userInfo.userCPNm" 
		 		maxlength="30" cssClass="span-4"/>
	</div>
	<div class="span-10 margin_bottom_4 last">
		<div class="span-2 text_right">
			<s:label id="userCnmLbl" value="中文姓名"/>
			<span class="color_red">*</span>
		</div>
		<s:textfield id="UpdUserCNm" name="userInfo.userCnm"
				maxlength="30" cssClass="span-4"/>
	</div>
</div>
<div class="span-24">	
	<div class="span-6 margin_bottom_4">
		<div class="span-2  text_right">
		<s:label id="userJRNmLbl" value="日文罗马字"/>
		</div>	
		<s:textfield id="UpdUserJRNm" name="userInfo.userJRNm" 
				maxlength="30" cssClass="span-3"/>
	</div>
	<div class="span-8 margin_bottom_4">
		<div class="span-3  text_right">
			<s:label id="userJKNmLbl" value="日文片假名"/>
		</div>
		<s:textfield id="UpdUserJKNm" name="userInfo.userJKNm"
				maxlength="30" cssClass="span-4"/>
	</div>
	<div class="span-10 margin_bottom_4 last">
		<div class="span-2  text_right">	
        <s:label id="userJNmLbl" value="日文汉字"/>
        </div>
		<s:textfield id="UpdUserJNm" name="userInfo.userJNm"
				maxlength="30" cssClass="span-4"/>
	</div>
</div>
<div class="span-24">	
	<div class="span-10 margin_bottom_4">
		<div class="span-2  text_right">
			<s:label id="userDMNmLbl" value="域用户名"/>
			<span class="color_red">*</span>
		</div>
		<s:textfield id="UpdUserDMNm" name="userInfo.userDMNm"
	 			maxlength="30" cssClass="span-7"/>
	</div>
</div>
<div class="span-24">	
    <div class="span-6 margin_bottom_4">
    	<div class="span-2  text_right">
    		<s:label id="startDateLbl" value="入社日期"/>
    		<span class="color_red">*</span>
    	</div>
		<s:textfield id="UpdStartDate" name="userInfo.startDate" 
				maxlength="10" cssClass="span-3" onclick="WdatePicker()"/>
	</div>
	<div class="span-8 margin_bottom_4">
		<div class="span-3  text_right">		
			<s:label id="userEmail1Lbl" value="社内信箱"/>
		</div>
		<s:textfield id="UpdUserEmail1" name="userInfo.userEmail1" 
				maxlength="30" cssClass="span-4"/>
	</div>
	<div class="span-10 margin_bottom_4 last">
		<div class="span-2  text_right">
			<s:label id="userEmail2Lbl" value="社外信箱"/>
		</div>
		<s:textfield id="UpdUserEmail2" name="userInfo.userEmail2" 
				maxlength="30" cssClass="span-4"/>
    </div>
</div>
<div class="span-24">
    <div class="span-6 margin_bottom_4">
    	<div class="span-2  text_right">
    		<s:label id="userDptLbl" value="所属部门"/>
    	</div>	
		<s:select id="UpdDeptList" name="userInfo.deptId" list="deptList" listKey="deptId" 
			listValue="deptNm" value="userInfo.deptId" cssClass="span-3"/>
	</div>
</div>
<div class="span-24">
	<div id="div_userState_radio" class="span-6 margin_bottom_4">
		<div class="span-2  text_right">
			<s:label id="userStateLbl" value="用户状态"/>
			<span class="color_red">*</span>
		</div>
		<s:radio id="UpdUserStateRadioList" name="userInfo.userState" list="userStateList"
			listKey="%{diffNo}" listValue="%{diffName}" value="userInfo.userState"/>
	</div>
	<div id="div_empStatus_radio" class="span-17 margin_bottom_4">
		<div class="span-3  text_right">
        	<s:label id="empStatusLbl" value="员工属性"/>	
			<span class="color_red">*</span>
		</div>
		<s:radio id="UpdEmpStatusRadioList" name="userInfo.empStatus" list="empStatusList" 
			listKey="%{diffNo}" listValue="%{diffName}" value="userInfo.empStatus"/>
    </div>
</div>
<div class="span-24">
	<div class="span-18 margin_bottom_4">
		<div class="span-2  text_right">
    	<s:label id="userDespLbl" value="备注"/>
    	</div>
    	<s:textfield id="UpdUserDesp" name="userInfo.userDesp"
    		maxlength="200" cssClass="span-10"/>
    </div>
</div>   
<div class="span-24 text_right">
	<input type="button" id="submit" name="refer" value="提交"
			class="btn" onclick="submitUserInfo()"/>
	<input type="button" id="modifyCancle" name="cancle" value="取消"
			class="btn" onclick="clearUserInfo(1)"/>
</div>
