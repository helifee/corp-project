<%--
 * @(#)Yb9011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工高级查询画面
 * 
 * @author tengchanglong
 * @version 1.00 2010/07/26
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<div id="div_emp_adv_search"  class="span-14 last">
	<s:form id="advEmpInfoForm" action="yb9011FindAdvEmpLst" namespace="/employee" method="post" validate="true">
		<div class="span-14 last">
			<div class=" span-14 last  margin_top_6">
				<div class="span-5 last">
					<div class="span-2 text_right">
						<s:label value="员工编号" />
					</div>
					<div class="span-2  padding_top_2">	
						<s:textfield id="advEmpId" name="yb9010CondB.empId" maxlength="6" cssClass="span-2"/>
					</div>
				</div>
				<div class=" span-7 last">
					<div class="span-7 last">
						<div class="span-2 text_right">
							<s:label value="入职期间" />
						</div>
						<div class="span-5 last">
							<s:textfield id="startYearFrom" name="yb9010CondB.startYearFrom" cssClass="span-2" maxLength="4" />
							<span>~</span>
							<s:textfield id="startYearTo" name="yb9010CondB.startYearTo" cssClass="span-2" maxLength="4"/>
						</div>
					</div>

				</div>
			</div>
			<div class=" span-14 last margin_bottom_6 margin_top_6">
				<div class=" span-5 last">
					<div class="span-2 text_right">
						<s:label value="员工姓名" />
					</div>
					<div class="span-2 last ">	
						<s:textfield id="advEmpNm" name="yb9010CondB.empNm" maxlength="20" cssClass="span-2" />
					</div>
				</div>
				<div class=" span-9 last">
					<div class=" span-1 text_right">
						<s:label value="性别" />
					</div>
					<div class=" span-7 last">
						<s:checkbox id="advEmpSexM" name="empSexM" value="m" />男
						<s:checkbox id="advEmpSexF" name="empSexF" value="f" />女
						<s:hidden id="empSex" name="yb9010CondB.empSex"></s:hidden>
						<s:if test="mode != 1">
							<s:label id="teamLabel" value="组选择" cssClass="prepend-1"/>
							<s:select id="teamList" name="yb9010CondB.teamId" list="teamList" listKey="teamId" listValue="teamSnm" cssClass="span-2"/>
						</s:if>
					</div>
				</div>
			</div>
			<div class="span-14 last margin_bottom_6">
				<div class="span-2 text_right ">
					<s:label value="员工类别" />
				</div>
				<div class="span-10">
					<s:checkboxlist  id="empStatusIdInfos" name="yb9010CondB.empStatusIdInfos" list="statusList" listKey="diffNo" listValue="diffName" cssClass="span-2-1"></s:checkboxlist>
				</div>
			</div>
			<div class="span-14 last margin_bottom_6">
				<div class="span-2 text_right ">
					<s:label value="员工状态" />
				</div>
				<div class="span-12 last">
					<s:checkboxlist id="empStateIdInfos" name="yb9010CondB.empStateIdInfos" list="stateList" listKey="diffNo" listValue="diffName" cssClass="span-2-1"></s:checkboxlist>	
				</div>
				
			</div>
		</div>
		<div class="prepend-h span-14 last margin_bottom_6">
			<div class="span-6 last">
				<div class="span-6 last ">
					<span>■</span>
					<s:label value="员工所属" />
				</div>
				<div  id="table_dept" class="span-6 h_122 bd_1s999 overflow_scr_y ">
					<div id="myTreeDept" class="span-5 t_auto line_h ">
					</div>
				</div>
			</div>
			<div class="prepend-1 span-6 last">
				<div class="span-6 last">
					<span>■</span>
					<s:label value="员工职位" />
				</div>
				<div id="table_pos" class="span-6 h_122 bd_1s999 overflow_scr_y last">
					<div id="myTreePos" class="span-5 t_auto line_h last">
					</div>
				</div>
			</div>
		</div>
<!--		<div class="prepend-1 span-14 last margin_bottom_10">-->
<!--			<div class="span-7">-->
<!--				<div class="span-7 ">-->
<!--					<span>■</span>-->
<!--					<s:label value="员工类别" />-->
<!--				</div>-->
<!--				<div  id="table_status" class="span-5 h_122 bd_1s999 overflow_scr_y last">-->
<!--					<div class="span-5 last">-->
<!--						<s:checkboxlist id="empStatusIdInfos" name="yb9010CondB.empStatusIdInfos" list="statusList" listKey="diffNo" listValue="diffName"></s:checkboxlist>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class=" span-6 last">-->
<!--				<div class=" span-6 last">-->
<!--					<span>■</span>-->
<!--					<s:label value="员工状态" />-->
<!--				</div>-->
<!--				<div  id="table_state" class="span-5 h_122 bd_1s999 overflow_scr_y last">-->
<!--					<div class="span-5 last">-->
<!--						<s:checkboxlist id="empStateIdInfos" name="yb9010CondB.empStateIdInfos" list="stateList" listKey="diffNo" listValue="diffName"></s:checkboxlist>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>	-->
	</s:form>
	<div class="span-14 text_center last margin_bottom_6">
		<input type="button" id="search" name="search" value="查询" class="span-2 btn" onclick="advSearchEmpInfo()"/>
		<input type="button" id="clear" name="clear" value="清空" class="span-2 btn" onclick="clearEmpInfo()"/>
	</div>	
	<div class="clear_both"></div>
</div>
