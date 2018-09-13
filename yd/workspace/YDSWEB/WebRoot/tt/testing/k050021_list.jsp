<%--
 * @(#)k050021_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 试卷一览画面（一览部分JSP）
 * 
 * @author yinfuyan
 * @version 1.00 2010/01/07
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!-- 试卷一览信息列表画面 -->
<div class="span-23">
	<table id="pagerCommonList" class="datagridtt ellipsis">
	<tr>
		<s:if test="modeKbn == 2">
			<th class="percent_4">
					<input type="checkbox" id="srcAll" onclick="srcClickAll()">
			</th>
		</s:if>
		<th class="percent_8 text_center"><span>试卷ID</span></th>
		<s:if test="modeKbn == 1">
			<th class="percent_18 text_center"><span>试卷标题</span></th>
		</s:if>
		<s:if test="modeKbn == 2">
			<th class="percent_10 text_center"><span>试卷标题</span></th>
			<th class="percent_8 text_center"><span>随机题标识</span></th>
		</s:if>
		<th class="percent_8 text_center"><span>试卷类型</span></th>
		<th class="percent_16 text_center"><span>试卷分类</span></th>
		<s:if test="modeKbn == 2">
			<th class="percent_8 text_center"><span>试卷总分</span></th>
			<th class="percent_8 text_center"><span>答题时间</span></th>
		</s:if>
		<th class="percent_6 text_center"><span>状态</span></th>
		<th class="percent_6 text_center"><span>创建者</span></th>
		<th class="percent_6 text_center"><span>更新者</span></th>
		<th class="percent_8 text_center"><span>更新日期</span></th>
		<s:if test="modeKbn == 1">
			<th class=" text_center"><span>操作</span></th>
		</s:if>
	</tr>
	<s:hidden id="itemCount" value="%{paperListInfoList.size}"/>
	<s:if test="paperListInfoList.size > 0">
		<s:iterator value="paperListInfoList" status="stat">
			<tr>
				<s:if test="modeKbn == 2">
					<td class="text_center">
							<input id="paperSelected${stat.index}" name="paperSelected" type="checkbox" onclick="selectOneItem(${stat.index})"/>
							<!-- <s:checkbox name="paperIdChcckBox" fieldValue="%{paperId}" id="src_ + #stat.index + 1" /> -->
					</td>
				</s:if>
				<td class="text_center" id="paperId${stat.index}">
				<s:hidden id="paperVersion" name="paperVersionNo"/>
				<s:if test="modeKbn == 1">
					<s:url action="k050051InitPaperView" id="getK050051InitActionViewUrl">
						<s:param name="paperId" value="%{paperId}"/>
						<s:param name="paperVersionNo" value="%{paperVersionNo}"/>
						<s:param name="mode" value="2"/>
					</s:url>
     				<s:a href="%{getK050051InitActionViewUrl}" target="viewPaper" ><s:property value="paperId" /></s:a>				
				</s:if>
				<s:else>
					<s:property value="paperId" />
				</s:else>
				</td>
				<td class="text_left"><s:label title="%{paperTitle}" name="paperTitle"/></td>			
				<s:if test="modeKbn == 2">
					<td class="text_center"><s:property value="randomBigquestFlgNM" /></td>
				</s:if>
				<td class="text_center"><s:property value="paperTypeName" /></td>
				<td class="text_left"><s:label title="%{categoryName}" name="categoryName"/></td>
				<s:if test="modeKbn == 2">
					<td class="text_center"><s:property value="paperTotalScore" /></td>
					<td class="text_center"><s:property value="paperTime" /></td>
				</s:if>
				<td class="text_center"><s:property value="paperStatusName" /></td>
				<td class="text_center"><s:property value="createUserName" /></td>
				<td class="text_center"><s:property value="updateUserName" /></td>
				<td class="text_center"><s:property value="updateTime" /></td>
				<s:if test="modeKbn == 1">
					<td class="text_center">
						<s:if test="!(operatingKbn == 4||operatingKbn == 8||operatingKbn == 12)">
							<s:url action="k050011InitManageMode" id="initPaperEditActionUrl">
								<s:param name="paperId" value="%{paperId}"/>
								<s:param name="paperVersionNo" value="%{paperVersionNo}"/>
								<s:param name="belongId" value="%{belongId}"/>
								<s:param name="callScreenId" value="'K050021'"/>
							</s:url>
     				 				<s:a href="%{initPaperEditActionUrl}">管理</s:a>
						</s:if>
						<s:else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
						<s:if test="!(operatingKbn == 2||operatingKbn == 4||operatingKbn == 6||operatingKbn == 8||operatingKbn == 12||operatingKbn == 14)">
							<s:url action="k050011InitReferenceMode" id="getK050011InitActionCreateUrl">
								<s:param name="paperId" value="%{paperId}"/>
								<s:param name="paperVersionNo" value="%{paperVersionNo}"/>
								<s:param name="belongId" value="%{belongId}"/>
							</s:url>
     				 				<s:a href="%{getK050011InitActionCreateUrl}">参照新建</s:a>
						</s:if>
						<s:else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
						<s:if test="operatingKbn == 1||operatingKbn == 2||operatingKbn == 3||operatingKbn == 4||operatingKbn == 5||operatingKbn == 6||operatingKbn == 7||operatingKbn == 9||operatingKbn == 10||operatingKbn == 11||operatingKbn == 12||operatingKbn == 13||operatingKbn == 14||operatingKbn == 15">
							<s:url action="k050031InitTestPaperEditMode" id="initTestPaperEditActionUrl">
								<s:param name="paperId" value="%{paperId}"/>
							</s:url>
     				 				<s:a href="%{initTestPaperEditActionUrl}">编辑</s:a>
						</s:if>
						<s:else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
						<s:if test="paperStatus == 2 && (operatingKbn == 8||operatingKbn == 9||operatingKbn == 10||operatingKbn == 11||operatingKbn == 12||operatingKbn == 13||operatingKbn == 14||operatingKbn == 15)">
							<s:url action="k050051InitPaperView" id="getK050051InitActionApproveUrl">
								<s:param name="paperId" value="%{paperId}"/>
								<s:param name="paperVersionNo" value="%{paperVersionNo}"/>
								<s:param name="mode" value="8"/>
							</s:url>
     				 				<s:a href="%{getK050051InitActionApproveUrl}">审批</s:a>
						</s:if>
						<s:else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
						<s:if test="!(operatingKbn == 4||operatingKbn == 8||operatingKbn == 12)">
						<s:url action="k050051InitPaperView" id="getK050051InitActionDeleteUrl">
								<s:param name="paperId" value="%{paperId}"/>
								<s:param name="paperVersionNo" value="%{paperVersionNo}"/>
								<s:param name="mode" value="3"/>
							</s:url>
     				 				<s:a href="%{getK050051InitActionDeleteUrl}">删除</s:a>
						</s:if>
						<s:else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</s:else>
					</td>
				</s:if>
			</tr>
		</s:iterator>
	</s:if>
	</table>
	<div class="span-23 text_center">
		<s:include value="../../common/pagerNavigation.jsp" />
	</div>
	<div id="errorArea" class="prepend-2">
		<s:fielderror></s:fielderror>
	</div>
</div>
