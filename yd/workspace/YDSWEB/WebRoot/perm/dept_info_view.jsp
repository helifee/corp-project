<%--
 * @(#)dept_info_view.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 部门管理画面（编辑部分JSP）
 * 
 * @author renlong
 * @version 1.00 2010/01/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 部门详细信息画面 -->
<div class="span-24">
	<div class="span-4 margin_bottom_4">
		<div class="span-2 text_right">
			<s:label id="deptidLbl" value="部门ID" />
			<span class="color_red">*</span>
		</div>
		<s:textfield id="deptId" name="departmentInfo.deptId"
	 		maxlength="3" cssClass="span-1" />
	 </div>
	 <div class="span-9 margin_bottom_4">
		<div class="span-2 text_right">
			<s:label id="deptnmLbl" value="部门名称" />
			<span class="color_red">*</span>
		</div>
		<s:textfield id="deptNm" name="departmentInfo.deptNm"
			maxlength="30" cssClass="span-6" />
	</div>
	<div class="span-10 margin_bottom_4 last">
		<div class="span-2 text_right">
			<s:label id="deptsnmLbl" value="部门略称" />
			<span class="color_red">*</span>
		</div>
		<s:textfield id="deptSnm" name="departmentInfo.deptSnm"
			maxlength="30" cssClass="span-6" />
	</div>
</div>
<div class="span-24">
	<div class="span-13 margin_bottom_4">
		<div class="span-2 text_right"><s:label id="parentdeptidLbl" value="上级部门ID" /></div>
		<s:textfield id="parentDeptId" name="departmentInfo.parentDeptId"
				maxlength="3" cssClass="span-1" onchange="getDeptName()" />
		<s:label id="parentDeptNm" name="departmentInfo.parentDeptNm" />
	</div>
	<div class="span-10 margin_bottom_4 last">
		<div class="span-2 text_right"><s:label id="leaderidLbl" value="部门主管ID" /></div>
		<s:textfield id="leaderId" name="departmentInfo.leaderId"
			maxlength="6" cssClass="span-2" onchange="getMemberName()" />
		<s:label id="leaderNm" name="departmentInfo.leaderNm" />
	</div>
</div>
<div class="span-24">
	<div class="span-23 margin_bottom_4 last">
		<div class="span-2 text_right"><s:label id="deptdescLbl" value="部门描述" /></div>
		<s:textfield id="deptDesc" name="departmentInfo.deptDesc"
			maxlength="200" cssClass="span-19" />
	</div>
</div>
<div class="span-24 text_right">
	<input type="button" id="refer" name="refer" value="提交"
		class="btn" onclick="submitDeptInfo()" />
	<input type="button" id="cancle" name="cancle" value="取消"
		class="btn" onclick="clearDeptInfo()" />
</div>
