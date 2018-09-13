<%--
 * @(#)k070021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 成绩明细
 * @author 远东)chenzhong
 * @version 1.00 2010/03/30
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
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k070031.js"></script>

	<title>成绩明细</title>
</head>	
<body onLoad="initPage(${paperNum})">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	<div class="container showgrid">
		<div class="span-24 padding_top_8 title_tt">
			<h2>成绩明细</h2>
		</div>
		
		<div class="span-24">
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right"><s:label value="考试名称:"/></div>
				<div class="span-12 text_left">
				<s:property value="examineInfo.examineId" /> 
				<s:property value="examineInfo.examineName" />
				</div>
			</div>
			<div class="clear_both"></div>
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right"><s:label value="考试说明:"/></div>
				<div class="span-18 text_left"><s:property value="examineInfo.examineComment" /></div>
			</div>

			<div class="clear_both"></div>
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right"><s:label value="考试时间:"/></div>
				<div class="span-10 text_left">	
					<s:date name="examineInfo.examineStartTime" id="examineStartTimeFmt" format="yyyy-MM-dd HH:mm"  />
					<s:date name="examineInfo.examineEndTime" id="examineEndTimeFmt" format="yyyy-MM-dd HH:mm"  />
					<s:property value="%{examineStartTimeFmt}" /> ～　<s:property value="%{examineEndTimeFmt}" />
				</div>
			</div>
			<div class="clear_both"></div>
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right"><s:label value="考试分类:"/></div>
				<div class="span-12 text_left">
					<s:property value="examineInfo.categoryName" />
				</div>
			</div>
				<div class="clear_both"></div>
	
			<div class="span-24 margin_top_6">
				<div class="span-3 text_right"><s:label value="本次考试统计:"/></div>		
				<div class="span-2 text_right"><s:label value="参加人数:"/></div>
					<div class="span-2 text_left">
						<s:property value="headInfo.joinExamineNum"/><s:label value="人"/>
					</div>
				<div class="span-2 text_right"><s:label value="合格人数:"/></div>
					<div class="span-2 text_left">
						<s:property value="headInfo.passExamineNum"/><s:label value="人"/>
					</div>	            
				<div class="span-3 text_right"><s:label value="不合格人数:"/></div>
					<div class="span-2 text_left">
						<s:property value="headInfo.notPassExamineNum" /><s:label value="人"/>
					</div>
	            <div class="clear_both"></div>
				<div class="span-5 text_right"><s:label value="通过率:"/></div>
	                <div class="span-2 text_left">
	                	<s:property value="headInfo.passRate" /><s:label value="%"/>
	                </div>
	            <div class="span-2 text_right"><s:label value="满分:"/></div>
	                <div class="span-2 text_left">
	                	<s:property value="examineInfo.totalScore" /><s:label value="分"/>
	                </div>
				<div class="span-3 text_right"><s:label value="平均分:"/></div>
	                <div class="span-2 text_left">
	                	<s:property value="headInfo.averageScore" /><s:label value="分"/>
	                </div>		
				<div class="clear_both"></div>
				<s:if test="!headInfo.resultlevel1Name.isEmpty()">
					<div class="span-3 text_left prepend-3">
						<s:property value="headInfo.resultlevel1Name + ': ' + headInfo.resultlevel1Num + '人'" /></div>
					<s:if test="!headInfo.resultlevel2Name.isEmpty()">
						<div class="span-3 text_left">
							<s:property value="headInfo.resultlevel2Name + ': ' + headInfo.resultlevel2Num + '人'" /></div>
						<s:if test="!headInfo.resultlevel3Name.isEmpty()">
							<div class="span-3 text_left">
								<s:property value="headInfo.resultlevel3Name + ': ' + headInfo.resultlevel3Num + '人'" /></div>
							<s:if test="!headInfo.resultlevel4Name.isEmpty()">
								<div class="span-3 text_left">
									<s:property value="headInfo.resultlevel4Name + ': ' + headInfo.resultlevel4Num + '人'" /></div>
								<s:if test="!headInfo.resultlevel5Name.isEmpty()">
									<div class="span-3 text_left">
										<s:property value="headInfo.resultlevel5Name + ': ' + headInfo.resultlevel5Num + '人'" /></div>
								</s:if>		
							</s:if>				
						</s:if>					
					</s:if>				
				</s:if>
			</div>
		</div>
		<div class="clear_both"></div>
		<div class="span-16">
		<s:if test="detailListInfos.size > 0">
		<s:iterator value="detailListInfos" status="stat">
			<div class="span-24 margin_top_10">
	        	<div class="span-3 text_right"><s:label value="试卷名称:"/></div>
            	<div class="span-12 text_left"><s:property value="paperName"/></div>
            	<div class="prepend-1 span-14">
                	<table id="table_paper${stat.index}" class="datagridtt span-14">
	                    <tr>
	                        <th class="span-2 text_center">员工ID</th>
	                        <th class="span-2 text_center">员工姓名</th>
	                        <th class="span-2 text_center">通过与否</th>
	                        <th class="span-2 text_center">档次</th>
	                        <th class="span-3 text_center">总得分（分）</th>
		 					<th class="span-3 text_center">操作</th>
	                    </tr>
	                    <s:if test="personInfos.size > 0">
						<s:iterator value="personInfos">
		                    <tr>
		                        <td class="span-2 text_center"><s:property value="employeesId"/></td>
		                        <td class="span-2 text_center"><s:property value="employeesName"/></td>
		                        <td class="span-2 text_center"><s:property value="passExamineFlg"/></td>
		                        <td class="span-2 text_center"><s:property value="resultLeavelName"/></td>
		                        <td class="span-3 text_right"><s:property value="score"/></td>
								<td class="span-3 text_center"><s:a href="#" onclick="gainPointDetail('%{examineId}','%{employeesId}')">得分明细</s:a></td>
		                    </tr>
	                    </s:iterator>
           				</s:if>
	                    <tr class="bgclr_tt">
	                        <td class="span-2"></td>
	                        <td class="span-2"></td>
	                        <td class="span-2"></td>
	                        <td class="span-2 text_right">平均分：</td>
	                        <td class="span-3 text_right"><s:property value="paperAverageScore"/></td>
	                        <td class="span-3"></td>
                    	</tr>	                       
                	</table>
               	</div>

        	</div>
		</s:iterator>
	    </s:if>
	    </div>
		<div id="detailDiv" class="span-6 last none">
           <s:include value="k070031_details.jsp"></s:include>
        </div>
	    <div class="clear_both"></div> 
	</div>
		</div>
  </div>
<s:include value="../manager/foot.jsp" />
</div>					
</body>
</html>
