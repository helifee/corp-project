<%--
 * @(#)k060121.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试评分详细
 * 
 * @author liuyiwei
 * @version 1.00 2010/05/24
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

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060121.js"></script>

	<title>考试评分详细</title>
</head>
<body onload="initForm()">
	<div class="container showgrid">
	<s:include value="../manager/head.jsp" />
		<div class="span-24 margin_top_2">
			<div class="tt_module padding_bottom_4 overflow_hd">
			<s:include value="../manager/navigator.jsp" />　　
	        <!-- title -->
	        <div class="span-24 padding_top_8 title_tt">
	        	<h2>考试评分详细</h2>
	       	</div>
	       	<s:form id="markTaskListForm"  action="" method="post"  validate="false">
      		<div class="span-24">
				<div class="span-3 text_right">
					<s:label value = "考试名称："/>
				</div>
				<!--考试名称-->
				<div class="span-12 text_left">
					<s:property value="examineId"/> <s:property value="examineInfo.examineName"/>
				</div>
			</div>
			<div class="clear_both"></div>
		
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right">
					<s:label value = "考试说明："/>
				</div>
				<!--考试说明-->
				<div class="span-18 text_left">
					<s:property value = "examineInfo.examineComment"/>
				</div>
			</div>
			<div class="clear_both"></div>
			
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right">
					<s:label value = "考试时间："/>
				</div>
				<!--考试开始时间-->
				<div class="span-12 text_left">
					<s:date name="examineInfo.examineStartTime" id="examineStartTimeFmt" format="yyyy-MM-dd HH:mm"  />
					<s:date name="examineInfo.examineEndTime" id="examineEndTimeFmt" format="yyyy-MM-dd HH:mm"  />
					<s:property value="%{examineStartTimeFmt}" /> ～　<s:property value="%{examineEndTimeFmt}" />
				</div>
			</div>
			<div class="clear_both"></div>
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right">
					<s:label value = "考试分类："/>
				</div>
				<!--考试分类-->
				<div class="span-12 text_left">
					<s:property value = "examineInfo.categoryName"/>
				</div>
			</div>
			<div class="clear_both"></div>
					
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right">
					<s:label value = "当前状态："/>
				</div>
				<!--当前状态-->
				<div class="span-12 text_left">
					<s:property value = "examineInfo.examineStatusName"/>
				</div>
			</div>
			<div class="clear_both"></div>
			
		<s:hidden id="operatMode" name="operatMode"></s:hidden>
			<s:hidden id="examineId" name="examineId"></s:hidden>
			<div class="clear_both"></div>
			</s:form>
			<div class="span-24 margin_top_6">
                 <div class="span-3 text_right">
                 	<s:label value = "评分任务一览："/>
                 </div>
                 <div class="clear_both"></div>
            </div>     
			<div class="span-22 prepend-1">
				<table class="datagridtt">
					<tr>
						<th class="percent_10">
							<!--<input id="selectAll" type="checkbox" onclick="selectAll()"/>-->
							<span>任务序号</span>
						</th>

						<!-- 按试卷分配-->
                        <s:if test="operatMode == 1">
                        	<th class="percent_20"><span>试卷标题</span></th>
                        </s:if>
                        <!-- 按大题分配-->
                        <s:else>
							<th class="percent_20"><span>大题名称</span></th>
						</s:else>
						<th class="percent_12"><span>已分评分者</span></th>
						<th class="percent_12"><span>任务状态</span></th>
						<th class="percent_12"><span>当前评分者</span></th>
						<th class="percent_12"><span>完成状态</span></th>
						<th><span>操作</span></th>
					</tr>
				</table>
			</div>
			<div class="clear_both"></div>
			<div class="overflow_hd span-22 prepend-1">
				<s:hidden id="itemCount" value="%{examineInfoList.size}"></s:hidden>
				<table class="datagridtt" id="examineList">
					<s:if test="examineInfoList.size > 0">
						<s:iterator value = "examineInfoList" status="stat">
							<tr>
								<td class="percent_10 text_center">
								<!--<input type="checkbox" name="checkbox" id="itemSelected${stat.index}" onClick="selectOneItem(${stat.index})">-->
									<s:property value="#stat.index+1"/>
								</td>
								<td class="percent_20">
									<s:property value ="missionName"/>
									<div id="itemId${stat.index}" value = "${missionId}" class="none"></div>
								</td>
								<td class="percent_12 text_center"><s:property value = "examineMarkerName"/></td>
								<td class="percent_12 text_center"><s:property value = "markStatusName"/></td>
								<td class="percent_12 text_center"><s:property value = "presentMarker"/></td>
								<td class="percent_12 text_center"><s:property value = "finishStatusName"/></td>
								<td class="text_center">
								<s:if test="finishStatus == 2">
									<s:a href="#" onclick="operation('%{missionId}')">开始评分</s:a>
								</s:if>
								<s:else>
									<s:a href="#" onclick="operation('%{missionId}')">重新评分</s:a>
								</s:else>
								</td>
							</tr>
						</s:iterator>
					</s:if>
				</table>
			</div>
			<!--
            <div class="span-24 margin_top_10">
                <div class="span-12 text_right">
                	<input type="button" id="paperMarkBtn" class="span-2 btn" onclick="markSelectedInWholeView()" value="整卷评分"/>
                </div>
                <div class="span-10 text_left">
                	<input type="button" id="questionMarkBtn" class="span-2 btn" onclick="markSelectedInSingleView()" value="单题评分"/>
                </div>
            </div>
            -->
            <div class="prepend-2 span-20">
				<s:fielderror cssClass="list_reset color_red"/>
			</div>
	 		<div class="clear_both"></div>
			</div>
		</div>
	<s:include value="../manager/foot.jsp" />
	</div>
</body>
</html>