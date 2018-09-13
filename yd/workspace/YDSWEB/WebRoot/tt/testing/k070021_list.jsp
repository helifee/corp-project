<%--
 * @(#)k070021_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统
--%>
<%--
 * 成绩一览画面（一览部分JSP）
 * @author tengchanglong
 * @version 1.00 2010/03/22
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
		<div class="overflow_scr_y">
					<div class="span-23 margin_top_6 prepend-h">
						<table id="table_scoreInfo" class="datagridtt ellipsis">
							<tr>
								<th class="percent_8"><span>员工ID</span></th>
								<th class="percent_8"><span>员工姓名</span></th>
								<th class="percent_8"><span>考试ID</span></th>
								<th class="percent_14"><span>考试名称</span></th>
								<th class="none"><span>考试分类</span></th>
								<th class="percent_8"><span>考试时间</span></th>
								<th class="percent_8"><span>通过率(%)</span></th>
								<th class="percent_8"><span>平均分(分)</span></th>
								<th class="percent_8"><span>通过与否</span></th>
								<th class="percent_6"><span>档次</span></th>
								<th class="percent_6"><span>得分(分)</span></th>
								<th ><span>操作</span></th>
							</tr>
							<s:if test="scoreInfoLists.size > 0">
							<s:iterator value="scoreInfoLists">
								<tr>
									<td class="text_center">
										<s:property value="staffId"/>
									</td>
									<td class="text_center"><s:property value="staffName"/></td>
									<td class="text_center"><s:property value="testId"/></td>
									<td><s:label title="%{testName}" name="testName"/></td>
									<td class="none"><s:property value="testType"/></td>
									<td class="text_center"><s:property value="testDate"/></td>
									<td class="text_right"><s:property value="passRate"/></td>
									<td class="text_right"><s:property value="average"/></td>
									<td class="text_center">
										<s:if test="passFlg == 1">
										O
										</s:if>
										<s:else>
										X
										</s:else>									
									</td>
									<td class=""><s:property value="grade"/></td>
									<td class="text_right"><s:property value="score"/></td>
									<td id="testNum" class="none"><s:property value="testNum"/></td>
									<td class="text_center">
										<s:a href="#" onclick="window.open('k060091TestAnswerViewMode.action?examineId=%{examId}&employeeId=%{staffId}&examineJoinTimes=%{testNum}')">查看试卷</s:a>
										<s:a href="#" onclick="window.open('k070031InitScoreDetails.action?examineId=%{testId}')">成绩明细</s:a>
									</td>
								</tr>
                			</s:iterator>
                			</s:if> 
						</table>
					</div>
				</div>
				<div class="clear_both"></div>
				
				<div class="span-24 err"></div>
		