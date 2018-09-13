<%--
 * @(#)Yb0021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
--%>

<%--
 * 员工登记画面（职位设定部分）
 * 
 * @author gaoweiwei
 * @version 1.00 2010/06/04
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-4 text_right"><s:label value="担当职位"/><span class="color_red">*</span></div>
<div class="span-6">
	<div class="span-6 bd_1s000 overflow_hd">
		<div class="span-6">
		    <table id="posTableHead" class="datagrid2 text_center">
		        <tr>
		            <th class="percent_40">职位类别</th>
		            <th>职位名称</th>
		        </tr>
		    </table>
		</div>
		<div id="table_pos" class="span-6">
			<div class="span-6">
		    	<table class="datagrid2 text_center none" id="posTable" >
					<tbody>
					<s:if test="flg==1">
						<s:if test="posList.size > 0">
							<s:iterator value="posList" status="staff" id="pos">
								<s:if test="#pos.endTime == \"9999-12-31\"">
									<tr id="cloneTr">
										<td class="percent_40">
		                  					<s:property value="posTypeName" />
											<s:hidden id="posTypeName%{#staff.index}" name="posList[%{#staff.index}].posTypeName" />
											<s:hidden id="empId%{#staff.index}" name="posList[%{#staff.index}].empId" />
											<s:hidden id="empName%{#staff.index}" name="posList[%{#staff.index}].empName" />
											<s:hidden id="posType%{#staff.index}" name="posList[%{#staff.index}].posType" />
											<s:hidden id="posId%{#staff.index}" name="posList[%{#staff.index}].posId" />
											<s:hidden id="posSName%{#staff.index}" name="posList[%{#staff.index}].posSName" />
											<s:hidden id="mainPosFlg%{#staff.index}" name="posList[%{#staff.index}].mainPosFlg" />
											<s:hidden id="startTime%{#staff.index}" name="posList[%{#staff.index}].startTime" />
											<s:hidden id="endTime%{#staff.index}" name="posList[%{#staff.index}].endTime" />
										 </td>
										<td class="margin_right_15">
		                  					<s:property value="posSName" />
										</td>
									</tr>
								</s:if>
							</s:iterator>
						</s:if>
					</s:if>
					<s:else>
						<s:if test="empPosList.size > 0">
							<s:iterator value="empPosList" status="stat" id="eplt">
								<s:if test="#eplt.endTime == \"9999-12-31\"">
									<tr id="cloneTr">
										<td class="percent_40">
		                  					<s:property value="posTypeName" />
											<s:hidden id="posTypeName%{#stat.index}" name="empPosList[%{#stat.index}].posTypeName" />
											<s:hidden id="empId%{#stat.index}" name="empPosList[%{#stat.index}].empId" />
											<s:hidden id="empName%{#stat.index}" name="empPosList[%{#stat.index}].empName" />
											<s:hidden id="posType%{#stat.index}" name="empPosList[%{#stat.index}].posType" />
											<s:hidden id="posId%{#stat.index}" name="empPosList[%{#stat.index}].posId" />
											<s:hidden id="posSName%{#stat.index}" name="empPosList[%{#stat.index}].posSName" />
											<s:hidden id="mainPosFlg%{#stat.index}" name="empPosList[%{#stat.index}].mainPosFlg" />
											<s:hidden id="startTime%{#stat.index}" name="empPosList[%{#stat.index}].startTime" />
											<s:hidden id="endTime%{#stat.index}" name="empPosList[%{#stat.index}].endTime" />
										 </td>
										<td class="margin_right_15">
		                  					<s:property value="posSName" />
										</td>
									</tr>
								</s:if>
							</s:iterator>
						</s:if>
					</s:else>
		            </tbody>
		        </table>
		    </div>
		</div>
	</div>
	<div class="text_center">
		<s:label value="（首行为主要职位）"/>
	</div>
</div>
<!-- 
<input type="button" id="setPos" class="btn span-2" value="设定职位" onclick="setPos($('empId'))"/>
 -->
 <input type="button" id="setPos" class="btn span-2" value="设定职位" onclick="popInnerPage()"/>

