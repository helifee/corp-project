<%--
 * @(#)Ye0040.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤管理
--%>

<%--
 * 
 * 
 * @author lincheng
 * @version 1.00 
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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0040.js"></script>	
	<title>请假审批</title>
</head>
<body onload="init();">
	<s:include value="../common/commonPage.jsp"></s:include>
	<div id="content" class="ydscontainer position_rel">
		<s:form id="ye0040InitForm" action="ye0040Init" namespace="/att" method="post" validate="true">
		<div class="span-24">
			<div class="span-2 text_center">休假日期</div>
			<div class="span-10">
				<input type="radio" name="applyDate" value="nm" onclick="qDate(this)" checked="checked">当月
				<input type="radio" name="applyDate" value="bm" onclick="qDate(this)">前月
				<input type="radio" name="applyDate" value="wy" onclick="qDate(this)">全年
				<input type="radio" name="applyDate" value="md" onclick="qDate(this)" id="appDate">指定日期
				<input type="text" name="ye0040CondA.sdate" id="sDate" class="span-2" onClick="WdatePicker()" /> ～
				<input type="text" name="ye0040CondA.edate" id="eDate" class="span-2" onClick="WdatePicker()" />
	        </div>
			<div class="span-2 text_center">审批状态</div>
			<div class="span-4 last">
				<input type="radio" name="ye0040CondA.stateFlag" value="1">待批
				<input type="radio" name="ye0040CondA.stateFlag" value="3">已批
				<input type="radio" name="ye0040CondA.stateFlag" value="" checked="checked">全部
			</div>
	   	</div>
		<div class="span-24 margin_top_10">
			<div class="span-2 text_center">休假类型</div>
			<div class="span-11">
				<table id="" class="datagrid2">
					<tr>
						<td class="span-2 text_center">
							<input type="checkbox" onclick="checkAll(this)" id="wujiatiao"/><label for="wujiatiao">无假条</label>
						</td>
						<td class="">
							<input type="checkbox" name="ye0040CondA.gc" id="ye0040CondA.gc" value="true" /><label for="ye0040CondA.gc">公出</label>
							<input type="checkbox" name="ye0040CondA.hx" id="ye0040CondA.hx" value="true" /><label for="ye0040CondA.hx">换休</label>
							<input type="checkbox" name="ye0040CondA.cc" id="ye0040CondA.cc" value="true" /><label for="ye0040CondA.cc">出差</label>
							<input type="checkbox" name="ye0040CondA.hbj" id="ye0040CondA.hbj" value="true" /><label for="ye0040CondA.hbj">半天病假</label>
							<input type="checkbox" name="ye0040CondA.hsj" id="ye0040CondA.hsj" value="true" /><label for="ye0040CondA.hsj">半天事假</label>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="span-24 margin_top_10">
			<div class="span-2">&nbsp;</div>
			<div class="span-11">
				<table id="" class="datagrid2">
					<tr>
						<td class="span-2 text_center">
							<input type="checkbox" onclick="checkAll(this)" id="youjiatiao"/><label for="youjiatiao">有假条</label>
						</td>
						<td class="">
							<input type="checkbox" name="ye0040CondA.bj" id="ye0040CondA.bj" value="true" /><label for="ye0040CondA.bj">病假</label>
							<input type="checkbox" name="ye0040CondA.shij" id="ye0040CondA.shij" value="true" /><label for="ye0040CondA.shij">事假</label>
							<input type="checkbox" name="ye0040CondA.nx" id="ye0040CondA.nx" value="true" /><label for="ye0040CondA.nx">年休</label>
							<input type="checkbox" name="ye0040CondA.tj" id="ye0040CondA.tj" value="true" /><label for="ye0040CondA.tj">特假</label>
							<input type="checkbox" name="ye0040CondA.hj" id="ye0040CondA.hj" value="true" /><label for="ye0040CondA.hj">婚假</label>
							<input type="checkbox" name="ye0040CondA.cj" id="ye0040CondA.cj" value="true" /><label for="ye0040CondA.cj">产假</label>
							<input type="checkbox" name="ye0040CondA.sj" id="ye0040CondA.sj" value="true" /><label for="ye0040CondA.sj">丧假</label>
						</td>
					</tr>
				</table>
			</div>
			<div class="span-11 text_right last">
				<input type="button" value="查询" class="btn span-2" onclick="searchAttList()" />
			</div>
		</div>
		</s:form>
		<%-- 分割线 --%>
		<div class="span-24 separator margin_top_10"></div>
		<div class="span-24" id="araList">
			<div class="span-24">
				<div class="span-4">总计：<s:property value="count" />件</div>
				<div class="span-20 text_right last">
					<input type="button" value="请假申请" class="btn span-2" onclick="attInfoDetail()"/>
				</div>
			</div>
			<div class="span-24 box_border">
				<div class="span-24">
					<table id="" class="datagrid5">
						<tr>
							<th rowspan="2" class="percent_6">申请人</th>
							<th rowspan="2" class="percent_6">部门</th>
							<th rowspan="2" class="percent_8">项目组</th>
							<th rowspan="2" class="percent_8">休假起始日</th>
							<th rowspan="2" class="percent_8">休假终了日</th>
							<th rowspan="2" class="percent_4">天数</th>
							<th rowspan="2" class="percent_6">休假类型</th>
							<th rowspan="2" class="percent_16">休假理由</th>
							<th colspan="3" class="percent_18">意见</th>
							<th rowspan="2" class="percent_6">结论</th>
							<th rowspan="2" class="percent_12">操作</th>
						</tr>
						<tr>
							<th class="">组长</th>
							<th class="">部长</th>
							<th class="">领导</th>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div id="div_ye0040_info" class="span-6 none">
		<s:textarea cssClass="span-6 h_122" id="exaSuggestion"></s:textarea>
		<input type="button" value="确定" class="btn span-2 margin_top_6" onclick="rejectOk();"/>
	</div>
	<div class="none" id="attInfoDetailBox" >
		<iframe id="attInfoDetail" frameBorder="0"></iframe>
	</div>
</body>
</html>
