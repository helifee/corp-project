<%--
 * @(#)Ye0070.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: ATT
--%>

<%--
 * 员工加班一览画面
 * 
 * @author  李珂楠
 * @version 1.00 2010/12/07
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
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/treeTableX.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0070.js"></script>
	
	<title>员工加班一览</title>
</head>
<body onload="init();">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="content"  class="ydscontainer position_rel">
	<s:form id="ye0070InitForm" action="ye0070Init" namespace="/att" method="post" validate="true">
		<div class="span-24">
			<div class="span-1 text_lett">
				<s:label value="部门"></s:label>
			</div>
    		<div class="span-3">
				<s:select id="departId" name="ye0070CondA.deptId" list="departList" listKey="orgId" listValue="orgNm" cssClass="span-3 w_90" />
      		</div>
			<div class="span-2 text_right">
				<s:label  value="统计方式"></s:label>
			</div>
			<div class="span-4 text_left last">
				<s:radio id="staticMode" name="ye0070CondA.statisticMode" list="staticMode" listKey="diffNo" listValue="diffName"/>
	        </div>
			<div class="span-2 text_right">
				<s:label value="审批状态"></s:label>
			</div>
			<div class="span-6 text_left">
				<s:radio id="confirmStatus" name="ye0070CondA.attStateId" list="confirmStatusList" listKey="diffNo" listValue="diffName"/>
			</div>	
		</div>
		<div class="span-24">
			<div class="span-1 text_lett">
					<s:label value="年月"></s:label>
			</div>
			<div class="span-5 text_left">
				<s:radio id="dateOptionList" name="ye0070CondA.dateOptionType" list="dateOption" listKey="diffNo" listValue="diffName" onclick="selectDateType(this)"/>
	        </div>
		    <div class="span-5 last">
	        	<s:textfield id="startDate" name="ye0070CondA.searchStartTime" maxLength="10" cssClass="span-2" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
	        	<span>～</span>
	        	<s:textfield id="endDate" name="ye0070CondA.searchEndTime" maxLength="10" cssClass="span-2" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
		    </div>
		    <div class="span-13 text_right last">
				<input type="button" id="search" value="查询" class="span-2 btn color_blue" onclick="searchOvertime()" />
			</div>
	    </div>
 	</s:form>  		
  	<!-- 分割线  -->
	<div class="span-24 separator"></div>
  		
	<!-- 员工加班一览画面 -->
	<div class="span-24 bd_1s000 overflow_hd margin_top_4">
		<div class="span-24 ">
			<table id="table_Overtime_Head" class="datagrid2 ellipsis">
			<tr>
			<th id="tableTitleDate1" rowspan="2" class="percent_20 none">项目</th>
			<th rowspan="2" class="percent_10">年月</th>
			<th id="tableTitleDate2" rowspan="2" class="percent_20 none">项目</th>
			<th colspan="3" class="percent_24">加班预计</th>
			<th colspan="3" class="percent_24">加班实际</th>
			<th rowspan="2" class="percent_6">状态</th>
			<th rowspan="2" class="percent_16">操作</th>
			</tr>
			<tr>
			  <th class="percent_8">有料时间</th>
			  <th class="percent_8">换休时间</th>
			  <th class="percent_8">人次</th>
			  <th class="percent_8">有料时间</th>
			  <th class="percent_8">换休时间</th>
			  <th class="percent_8">人次</th>
			</tr>
			</table>
		</div>
		
		<div id="" class="span-24 overflow_scr_y h_400">
			<div id="overTimeTreetable" class="span-24 ">
			</div>
		</div>
		
		<div class="span-24">
			<table id="table_Overtime_Final" class="datagrid2 ellipsis">
			<tr>
				<th class="percent_30">总计</th>
				<th class="percent_8"><s:label id="appSumCash" name="appSumCash"></s:label></th>
				<th class="percent_8"><s:label id="appSumRest" name="appSumRest"></s:label></th>
				<th class="percent_8"><s:label id="appSumPerCnt" name="appSumPerCnt"></s:label></th>
				<th class="percent_8"><s:label id="actualSumCash" name="actualSumCash"></s:label></th>
				<th class="percent_8"><s:label id="actualSumRest" name="actualSumRest"></s:label></th>
				<th class="percent_8"><s:label id="actualSumPerCnt" name="actualSumPerCnt"></s:label></th>
				<th class="percent_22"></th>
			</tr>
			</table>
		</div>
	</div>
	
	<div class="clear_both"></div>
	<div id="div_ye0070_info"></div>	
</div>
	
</body>
</html>
