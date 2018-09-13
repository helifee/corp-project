<%--
 * @(#)Yb0012.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 员工一览画面（一览部分JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/05/17
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 员工一览列表画面 -->
<div class="span-24">
	<div class="span-12 text_left">
		<s:label value="总计：" />
		<s:label id="empInfosCnt" name="empInfosCnt" />
		<s:label value="人" />
	</div>
	<div class="span-12 text_right last">
		<!-- 用户拥有该画面的管理和修改权限时，显示按钮 -->
		<s:if test="hasPermit('employee','allEmpPermit') || hasPermit('employee','registEmpPermit')">
			<input type="button" id="createBtn" name="createBtn" value="员工登记" onclick="empRegist()" class="btn span-2" />
		</s:if>
	</div>
</div>
<div class="span-24 bd_1s000 overflow_hd margin_top_4">
	<div class="span-24">
		<table id="table_peoListHead" class="datagrid2 ellipsis">
			<tr>
				<th class="percent_10">员工编号</th>
				<th class="" locked="1" source="me.readAttribute('empCpnm')">员工姓名</th>
				<th class="percent_6">性别</th>
				<th class="percent_10">所属部门</th>
				<th class="percent_12" source="me.readAttribute('posSEQ')">主要职位</th>
				<th class="percent_10">员工类别</th>
				<th class="percent_8">员工状态</th>
				<th class="percent_12" sorttype="date">入职时间</th>
				<th class="percent_20" nosort="1" locked="1">操作 </th>
			</tr>
		</table>
	</div>
	<div id="table_peo" class="span-24 overflow_scr_y">
		<div class="span-24 last">
			<table id="table_peoList" class="datagrid2 ellipsis none ">
				<tbody>
				<s:if test="empInfoList.size > 0">
					<s:iterator value="empInfoList" status="stat">
						<tr>
							<td class="text_center percent_10"><s:property value="empId" /></td>
							<td class="" empCpnm="${empCpnm}"><s:property value="empCnm" /></td>
							<td class="text_center percent_6"><s:property value="empSex" /></td>
							<td class="percent_10"><s:label name="deptNm" title="%{deptNm}"/></td>
							<td class="percent_12" posSEQ="${posSEQ}"><s:property value="posNm" /></td>
							<td class="percent_10"><s:property value="empStatusNm" /></td>
							<td class="percent_8"><s:property value="empStateNm" /></td>
							<td class="text_center percent_12"><s:property value="startDate" /></td>
							<td class="text_center percent_20 margin_right_15">
							<s:hidden id="updateTime%{#stat.index}" name="updateTime" />
								<div class="margin_right_15">
									<s:url action="yb0020ModInit?fromId=011&mode=2" id="yb0020ModInitUrl">
										<s:param name="empId" value="empId"></s:param>
									</s:url>		
       				 				<s:a href="%{yb0020ModInitUrl}">查看</s:a>
								<!-- 用户拥有该画面的管理和修改权限时，显示链接 -->
								<s:if test="hasPermit('employee','allEmpPermit') || hasPermit('employee','registEmpPermit')">
       				 				<s:if test="empStatePro2 == 0">
										<span>修改</span>
										<span>状态</span>
										<span>资源</span>
									</s:if>
									<s:else>
										<s:url action="yb0020ModInit?fromId=012&mode=3" id="yb0020ModInitUrl">
											<s:param name="empId" value="empId"></s:param>
										</s:url>	
										<s:a href="%{yb0020ModInitUrl}">修改</s:a>
	
										<s:url action="yb0030Init?fromId=01&modeFlg=2" id="yb0030InitUrl">
											<s:param name="empId" value="empId"></s:param>
											<s:param name="empNm" value="empCnm"></s:param>
											<s:param name="empInfoUpdTime" value="updateTime"></s:param>
										</s:url>
										<s:a href="%{yb0030InitUrl}">状态</s:a>
							 			<!-- 
										<s:a href="#this" onclick="yb0010ToYb0030Mod('%{empId}','%{empCnm}','%{updateTime}')">状态</s:a>
							 			--><!--
										
										<s:url action="employee/zyfpAction" id="zyfpActionUrl">
											<s:param name="empId" value="empId"></s:param>
										</s:url>									
										<s:a href="%{zyfpActionUrl}">资源</s:a>
											
									-->
									<span>资源</span>
									<!--
									<s:url action="yb0040Init" id="yb0040InitUrl">
											<s:param name="empId" value="empId"></s:param>
											<s:param name="empName" value="empName"></s:param>
										</s:url>
									-->
										<s:a href="#this" onclick="popInnerPage(this)">职位</s:a>
									</s:else>	
								</s:if>
														
								</div>
 							</td>
						</tr>
					</s:iterator>
				</s:if>		
		        </tbody>
			</table>
		</div>
	</div>
</div>

