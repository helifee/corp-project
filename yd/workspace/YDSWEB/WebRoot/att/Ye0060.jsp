<%--
 * @(#)Ye0060.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
--%>

<%--
 * 项目加班一览画面
 * 
 * @author sundefu
 * @version 1.00 2010/12/02
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
	<s:head/>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>js/tafelTree/css/tree.css" />

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/treeTableX.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0060.js"></script>	
	
	<title>项目加班一览</title>
</head>
<body onload="init();">
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div id="content" class="ydscontainer position_rel">
	<s:form id="ye0060InitForm" action="ye0060Init" namespace="/att" method="post" validate="true">
       	<s:hidden id="mode" name="mode"/>
       	<s:hidden id="ifPrjLeader" name="ye0060CondA.ifPrjLeader"/>
       	<s:hidden id="searchFlag" name="searchFlag"/>
       	<s:hidden id="loginUserId" name="loginUserId"/>
		<div class="span-24">
			<div class="span-2 text_right">
				<s:label value="项目"></s:label>
			</div>
	        <s:if test="mode==1">
				<div id="prjTypeDiv" class="span-3 text_left">
					<s:radio id="prjType" name="prjType" list="#{'1':'进行中','2':'已结束'}" onclick="getPrjListByStatus(this)"/>
		        </div>	        
				<div id="projectListDiv" class="span-3 text_left">
			  		<s:select id="projectId" name="ye0060CondA.prjId" list="projectList" listKey="orgId" listValue="orgSnm"  cssClass="span-3" onchange="getPrjDetailInfo(this)"/>
		       	</div>
		    </s:if>
		    <s:else>
		       	<div id="projectLabel" class="span-3 text_left">
		       		<s:label name="ye0060CondA.prjName"></s:label>
		       		<s:hidden id="projectId" name="ye0060CondA.prjId"></s:hidden>
		       	</div>		    
	       	</s:else> 
	       	<div class="span-4">
		       	<div class="span-2 text_right">
		       		<s:label value="主管"></s:label>
		       	</div>
		       	<div class="span-2 text_left last">
		       		<s:label id="leaderName" name="ye0060CondA.prjLeaderName"></s:label>
		       	</div>
	       	</div>
	       	<div class="span-2 text_right">
	       		<s:label value="项目期间"></s:label>
	       	</div>
	       	<div class="span-4 text_left">
	       		<s:label id="prjStartTime" name="ye0060CondA.prjStartTime"></s:label>
	       		～
	       		<s:label id="prjEndTime" name="ye0060CondA.prjEndTime"></s:label>
	       	</div>
		</div>
		<div class="span-24">
	       	<div class="span-2 text_right">
				<s:label  value="统计方式"></s:label>
			</div>
			<div class="span-6 text_left">
				<s:radio id="staticMode" name="ye0060CondA.statisticMode" list="staticMode" listKey="diffNo" listValue="diffName"/>
	        </div>		
			<div class="span-2 text_right">
				<s:label  value="年月"></s:label>
			</div>
	        <div class="span-6 text_left">
				<s:radio id="dateOptionList" name="ye0060CondA.dateOptionType" list="dateOption" listKey="diffNo" listValue="diffName" onclick="selectDateType(this)"/>
	        </div>
		    <div class="span-5 text_left last">
	          <s:textfield id="startDate" name="ye0060CondA.searchStartTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
	          <span>～</span>
	          <s:textfield id="endDate" name="ye0060CondA.searchEndTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
	        </div>
	    </div>
	    <div class="span-24">
	        <div class="span-2 text_right">
				<s:label  value="受益形式"></s:label>
			</div>
	        <div class="span-6 text_left">
	        	<s:radio id="searchBenifitFlag" name="ye0060CondA.benifitFlag" list="searchBenefitList" listKey="diffNo" listValue="diffName"/>
			</div>
	        <div class="span-2 text_right">
				<s:label  value="审批状态"></s:label>
			</div>
			<div class="span-7 text_left">
				<s:radio id="confirmStatus" name="ye0060CondA.stateFlag" list="confirmStatus" listKey="diffNo" listValue="diffName"/>
	        </div>
		    <div class="span-2 text_center last">
		    	<input type="checkbox" id="checkMyProject" name="checkBoxMyProject"/>
		    	<s:hidden id="myOvertime" name="ye0060CondA.myOvertime"/>
		    	我的加班
		    </div>	        
	        <div class="span-4 text_right last">
				<input type="button" id="search" value="查询" class="span-2 btn color_blue" onclick="searchOvertime()" />
			</div>	    	
	    </div>
       	</s:form>
		<div class="span-24 separator"></div>
		<!--员工加班信息一览表 -->
		<div id="div_ye0060_view" class="span-20 show_grid container last">
			<div  class="span-24 margin_top_2 margin_bottom_2">
					<div class="span-19 text_left">
						<s:label name="notations" value="带*时刻表示翌日退勤"/>
					</div>
					<div class="span-5 text_right last">
						<s:if test="mode==1">
							<input type="button" id="submitSelected" value="提交所选" class="span-2 btn color_blue none" onclick="changeOvertimeInfoStatus(1)" />
							<input type="button" id="overtimeApply" value="加班登记" class="span-2 btn color_blue" onclick="popOvertimeApply()" />
						</s:if>	
						<s:elseif test="mode==3">
							<input type="button" id="agreeSelected" value="同意所选" class="span-2 btn color_blue" onclick="changeOvertimeInfoStatus(2)" />
							<input type="button" id="refuseSelected" value="否决所选" class="span-2 btn color_blue" onclick="changeOvertimeInfoStatus(3)" />
						</s:elseif>
					</div>
			</div>
			<div class="span-24 box_border overflow_hd">
				<div class="span-24 ">
					<table id="" class="datagrid5 text_center">
						<tr>
							<th id="tableTitleDate1" rowspan="2" class="percent_14 none">加班日期</th>
							<th id="tableTitleEmp" rowspan="2" class="percent_6">员工</th>
							<th id="tableTitleDate2" rowspan="2" class="percent_14 none">加班日期</th>
							<th colspan="3" class="percent_18">加班计划</th>
							<th colspan="3" class="percent_18">加班实际</th>
							<th rowspan="2" class="percent_16">加班内容</th>
							<th rowspan="2" class="percent_6">受益</th>
							<th rowspan="2" class="percent_6">审批</th>
							<th class="percent_4">选择</th>
							<th rowspan="2" class="percent_12">操作</th>
						</tr>
						<tr>
						  <th class="">开始</th>
						  <th class="">结束</th>
						  <th class="">加班</th>
						  <th class="">开始</th>
						  <th class="">结束</th>
						  <th class="">加班</th>
						  <th class="">
						  	<input type="checkbox" value="" class="" onclick="selectAllItems(this)"/>
						  </th>
						</tr>
					</table>
				</div>
				<div id="" class="span-24 overflow_scr_y h_400">
					<div id="overTimeTreetable" class="span-24 ">
					</div>
				</div>
				<div id="" class="span-24">
					<table id="" class="datagrid5 text_center">
					<tr>
						<th class="percent_20">总计</th>
						<th class="percent_18"><div class="text_right"><s:label id="appOvertimeSum" name="appOvertimeSum"></s:label></div></th>
						<th class="percent_18"><div class="text_right"><s:label id="actualOvertimeSum" name="actualOvertimeSum"></s:label></div></th>
						<th class="percent_28"></th>
						<th class="percent_16"></th>
					</tr>
					</table>
				</div>
		    </div>	
		</div>
		<!-- 加班信息弹出层 -->
		<div id="div_ye0060_overtimeInfo" class="none">
			<s:include value="Ye0061.jsp" />
		</div>
		<!-- 参照登记加班信息弹出层 -->
		<div id="div_ye0060_applyByRefered" class="none span-5">
			<div class="span-5">
				<div class="span-2 text_right">申请日期</div>
				<div class="span-3 last text_left">
					<s:textfield id="referApplyingDate" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
				</div>
			</div>
			<div class="span-5 text_center">
				<input type="button" value="提交" class="btn span-2" onClick="newOvertimeByRefer();"/>
				<input type="button" value="取消" class="btn span-2" onClick="closeApplyByRefer();"/>
			</div>
		</div>
	</div>
</body>
</html>
