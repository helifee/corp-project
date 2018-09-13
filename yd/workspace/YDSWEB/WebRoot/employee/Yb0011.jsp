<%--
 * @(#)Yb0011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工高级查询画面
 * 
 * @author fangjiayuan
 * @version 1.00 2010/06/04
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<div id="div_emp_adv_search"  class="span-14 last">
	<s:form id="advEmpInfoForm" action="yb0011FindAdvEmpLst" namespace="/employee" method="post" validate="true">
		<div class="span-14 last">
			<div class="span-14 margin_bottom_6 margin_top_10 last">
				<div class="span-7">
					<div class="span-2 text_right">
						<span>员工编号</span>
					</div>
					<s:textfield id="advEmpId" name="yb0011CondA.empId" maxlength="6" cssClass="span-3"/>
				</div>
				<div class="span-7 last">
					<div class="span-1 text_right">
						<span>性别</span>
					</div>
					<div class="span-4 text_left">
						<s:checkbox id="advEmpSexM" name="empSexM" value="m"/>男&nbsp;&nbsp;&nbsp;
						<s:checkbox id="advEmpSexF" name="empSexF" value="f"/>女
						<s:hidden id="empSex" name="yb0011CondA.empSex"></s:hidden>
					</div>
				</div>
			</div>
			<div class="span-14 margin_bottom_6 margin_top_6 last">
				<div class="span-6">
					<div class="span-2 text_right">
						<span>员工姓名</span>
					</div>
					<s:textfield id="advEmpNm" name="yb0011CondA.empNm" maxlength="30" cssClass="span-3" />
				</div>
				<div class="span-7 last">
					<div class="span-2 text_right">
						<span>入社期间</span>
					</div>
					<div class="span-5 last">
						<div class="span-2">
							<s:textfield id="startYearFrom" name="yb0011CondA.startYearFrom" cssClass="span-2" maxLength="4"/>
						</div>
						<div class="float_l padding_right_10">~</div>
						<div class="span-2 last">
							<s:textfield id="startYearTo" name="yb0011CondA.startYearTo" cssClass="span-2" maxLength="4" onchange="startYearValidate()"/>
						</div>
					</div>
				</div>
			</div>
			<div class="span-14 last margin_bottom_6">
				<div class="span-2 text_right">
					<s:label value="员工类别" />
				</div>
				<div class="span-12 last">
					<s:checkboxlist id="empStatusIdInfos" name="yb0011CondA.empStatusIdInfos" list="statusList" listKey="diffNo" listValue="diffName" cssClass="span-2-1"></s:checkboxlist>
				</div>
			</div>
			<div class="span-14 last margin_bottom_6">
				<div class="span-2 text_right">
					<s:label value="员工状态" />
				</div>
				<div class="span-12 last">
					<s:checkboxlist id="empStateIdInfos" name="yb0011CondA.empStateIdInfos" list="stateList" listKey="diffNo" listValue="diffName" cssClass="span-2-1" value="%{result}"></s:checkboxlist>
				</div>	
			</div>
		</div>
		<div class="prepend-1 span-13 margin_bottom_10 last">
			<div class="span-6">
				<div class="span-6">
					<span>■</span>
					<span>所属部门</span>
				</div>
				<div id="table_dept" class="span-5 h_122 bd_1s999 overflow_scr_y">
					<div id="myTreeDept" class="span-5 t_auto line_h">
					</div>
				</div>
			</div>
			<div class="span-6 last">
				<div class="span-6 last">
					<span>■</span>
					<span>员工职位</span>
				</div>
				<div id="table_pos" class="span-6 h_122 bd_1s999 overflow_scr_y last">
					<div id="myTree" class="span-6 t_auto line_h last">
					</div>
				</div>
			</div>
		</div>
<!-- 
		<div class="prepend-1 span-13 last margin_bottom_10">
			<div class="span-6">
				<div class="span-6 last">
					<span>■</span>
					<span>员工类别</span>
				</div>
				<div  id="table_status" class="span-5 bd_1s999 overflow_scr_y h_122 last">
					<div class="span-5 last">
						<s:checkboxlist id="empStatusIdInfos" name="yb0011CondA.empStatusIdInfos" list="statusList" listKey="diffNo" listValue="diffName" onclick="empStatusIdNoCheck()"></s:checkboxlist>
					</div>
				</div>
			</div>
			<div class="last">
				<div class="last">
					<span>■</span>
					<span>员工状态</span>
				</div>
				<div  id="table_state" class="span-5 bd_1s999 overflow_scr_y h_122 last">
					<div class="span-5 last">
						<s:checkboxlist id="empStateIdInfos" name="yb0011CondA.empStateIdInfos" list="stateList" listKey="diffNo" listValue="diffName" onclick="empStateIdNoCheck()"></s:checkboxlist>
					</div>
				</div>
			</div>
		</div>	
 -->
	</s:form>
	<div class="span-14 text_center last margin_bottom_6">
		<input type="button" id="search" name="search" value="查询" class="span-2 btn" onclick="advSearchEmpInfo()"/>
		<input type="button" id="clear" name="clear" value="清空" class="span-2 btn" onclick="clearEmpInfo()"/>	
	</div>	
	<div class="clear_both"></div>
</div>
