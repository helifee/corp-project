<%--
 * @(#)Yb9010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>
<%--
 * 员工选择画面
 * 
 * @author tengchanglong
 * @version 1.00 2010/07/21
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/js/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/Tree.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/ydsTree.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/sortTable.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/employee/Yb9010.js"></script>
</head>
<body onload="empSelectInit()" scroll="no">
<div class="prepend-2 span-14 last">

		
		<div class="span-13 last ">	
			<s:form id="empInfoForm" action="yb9010FindEmp" namespace="/employee" method="post" validate="true">

				<div class="span-12 last margin_top_10 ">
					<div class="span-2 ">
						<s:label value="员工所属" />
					</div>
					<div class="span-8 ">
						<div class="span-3">
							<s:select id="deptId" name="yb9010CondA.deptId" list="deptInfoList" listKey="categoryKey" listValue="categoryValue" cssClass="span-3"/>
						</div>
						<s:if test="mode != 1">
							<div class="span-4">
								<select id="proId" name="yb9010CondA.proId" Class="span-3"></select>
								<s:label value="(项目)" />
							</div>						
						</s:if>
					</div>

					<div class=" span-2  last"><input type="button" value="查询" class="span-2 btn" onclick="searchEmp();"/></div>
					
				</div>
				<div class="span-12 last">
					<div class="span-5 ">
						<div class="span-2 ">
							<s:label value="担当职位" />
						</div>
						
						<div class="span-3 padding_top_2 last">
							<s:select id="posTypeId" name="yb9010CondA.position" list="positionList" listKey="categoryKey" listValue="categoryValue" cssClass="span-3"/>
						</div>
					</div>
					<div class="span-4 ">
						<s:textfield id="startYear" name="yb9010CondA.startYear" cssClass="span-2" maxLength="4"/>
						<input style="display:none">
						<s:label value="(年度)" />
					</div>

					<div class=" span-2 prepend-1 last"><input type="button" value="高级查询" class="span-2 btn" onclick="pop();"/></div>
						
				</div>
				<s:if test="mode != 1">
					<div class="span-12 last margin_top_2">
						<div class="span-2 ">
							<s:label id="teamLabelA" value="组选择"/>
						</div>
						<div class="span-4 padding_top_2">
							<s:select id="teamListA" name="yb9010CondA.teamId" list="teamList" listKey="teamId" listValue="teamSnm" cssClass="span-3"/>
						</div>	
					</div>				
				</s:if>
			</s:form>
		</div>
		<!-- 分割线  -->
		<div class=" span-12 last separator"></div>
		<div class=" span-9">
			<s:label value="总计:" />
			<s:label id="empCnt"/>
			<s:label value="人" />
		</div>
		<!-- 单人选择时画面 -->
		<s:if test="empNum == 1">
			<s:label id="empSelectedCnt" value="" cssClass="none"/>
		</s:if>
		<!-- 多人选择时画面 -->
		<s:else>
			<div class="prepend-1 span-2">
				<s:label value="已选:" />
				<s:label id="empSelectedCnt" value=""/>
				<s:label value="人" />
			</div>
		</s:else>
		<!-- 单人选择时画面 -->
		<s:if test="empNum == 1">
			<div class=" span-12 h_300">
				<div class="span-12 last">
					<div class="span-12 last box_border overflow_hd">
						<table id="emp_head" class="datagrid2 ellipsis" >
							<tr>
								<th locked="1">员工姓名</th>
								<th class="percent_18">性别</th>
								<th class="percent_50">员工所属</th>
							</tr>
						</table>		
						<div class="span-12 last">
							<div class="span-12 last" id ="div_empInfoList">
								<!--员工一览列表画面 -->
								<s:include value="Yb9012.jsp" />
							</div>
						</div>
						
					</div>
				</div>
				<div class="none">
					<table id= "selected_emp_head" class="datagrid2 none"></table>
					<table id="emp_right" class="datagrid2 none"><tbody></tbody></table>
				</div>
			</div>				
		</s:if>
		<!-- 多人选择时画面 -->
		<s:else>
		<div class=" span-13 h_300">
			<div class="span-7">
				<div class="span-7 box_border overflow_hd">
					<table id="emp_head" class="datagrid2 ellipsis" >
						<tr>
							<th locked="1">员工姓名</th>
							<th class="percent_18">性别</th>
							<th class="percent_50">员工所属</th>
						</tr>
					</table>		
					<div class="span-7 last">
						<div class="span-7 last" id ="div_empInfoList">
							<!--员工一览列表画面 -->
							<s:include value="Yb9012.jsp" />
						</div>
					</div>
					
				</div>
			</div>
			<div class=" span-2 ">
			
				<div>
					<input type="button" id="right" class="btn span-1" value=" > " onclick="addEmp();"/>
					<input type="button" id="right_all" class="btn span-1" value=" >> " onclick="addAllEmp();"/>
				</div>			
				<div class="margin_top_4 ">
					<input type="button" id="left_all" class="btn span-1" value=" << " onclick="delAllEmp();" />
					<input type="button" id="left" class="btn span-1" value=" < " onclick="delEmp();"/>
				</div>
	
			</div>
			<div class="prepend-1 span-2 last">
				<div class="span-2 last box_border overflow_hd ">
					
					<table id= "selected_emp_head" class="datagrid2">
						<tr>
							<th>已选员工</th>
						</tr>
					</table>
					<div class="span-2 last">
						<div class="span-2 last">
							<table id="emp_right" class="datagrid2">
								<tbody></tbody>																																					
							</table>
						</div>				
					</div>
				</div>
				
				
			</div>
			
		</div>
		</s:else>
		<div class="prepend-1 span-11 last margin_bottom_8">
		<div class="prepend-9 span-2 margin_top_6 last">
			<s:if test="empNum == 1">
				<input type="button" id="choose" class="btn span-2 "  value="确定" onclick="empSubmit(1);"/>
			</s:if>
			<s:else>
				<input type="button" id="choose" class="btn span-2 "  value="确定" onclick="empSubmit();"/>
			</s:else>
			<s:hidden id="empNum" name="empNum"/>
		</div>
		</div>
		<!-- 高级查询层 -->
		<div id="div_empAdvSearch" class="none"></div>
		<!-- 隐藏项-->
		<s:hidden id="mode" name="mode"/>
	</div>
</body>
</html>