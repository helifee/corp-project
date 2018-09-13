<%--
 * @(#)Yd0020.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>

<%--
 * 公司账户管理画面
 * 
 * @author pengchuan
 * @version 1.00 2010/11/02
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/js/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/tafelTree/Tree.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0020.js"></script>
	
	<title>公司账户管理</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_emp_main"  class="ydscontainer">
		<div class="nTab">
				<div class="TabTitle">
					<ul id="myTab0">
						<li class="active" onClick="nTabs(this,0);">存取管理</li>
						<li id="record_tab"  class="normal bd_r_1sccc" onClick="nTabs(this,1);">收支明细</li>   
			        </ul>
			   </div>
			   <s:hidden name="reloadFlg" id="reloadFlg"></s:hidden>
				<div class="TabContent"> 
					<div id="myTab0_Content0" class="prepend-h span-20 last h_542">
						<div id="gpsBig">
						<!--存取管理画面 -->
						<s:form id="accessMoneyForm" action="yd0020SaveTrans" namespace="/gps" method="post" validate="true">
								<div class="span-23 margin_top_20">
									<div class="span-3 text_right ">
										<s:label  value="公司余额："></s:label>
									</div>
									<div class="span-12">
										<s:label  name="comRemain" cssClass="money"></s:label>
									    <span>&nbsp;元&nbsp;&nbsp;(</span>
									    <s:label name="cafeAccount.accId"></s:label>
									    <span>:</span>
									    <s:label id="cafeRemain" name="cafeAccount.accSum" cssClass="moneySmall"></s:label>
									    <span>元&nbsp;&nbsp;</span>
									    <s:label  name="gpsAccount.accId"></s:label>
									    <span>:</span>
									    <s:label id="gpsRemain" name="gpsAccount.accSum" cssClass="moneySmall"></s:label>
									    <span>元)</span>
									</div>
									
									<div class="span-8 last margin_top_6">
										<p class="font_size_12 color_gray_0">注：公司余额=咖啡账户+团购账户+所有个人账户之总额</p>
									</div>
								</div>
								
								<div class="span-23 separator"></div>
							    <div class="span-20 margin_top_8">
									 <div class="span-3 text_right">
											<s:label  value="存取方式："></s:label>
									</div>
									
								    <div class="span-6 text_left" id="iodiv">
										  <s:radio id="ioType" name="tansferCondA.ioFlag"  value="1" 
										  list="ioTypeList" listKey="diffNo" listValue="pro2"  onclick="changeType()"/>
								    </div>
								</div>
								
								<div class="span-20">
									 <div class="span-3 text_right">
										  <s:label  value="账户类型："></s:label>
									</div>
									
								    <div class="span-6 text_left">
										  <s:radio id="accFlag" name="tansferCondA.accFlag" value="2" 
										  list="accFlagList" listKey="diffNo" listValue="diffName" onclick="changeFlag()"/>
								    </div>
								</div>
								<div class="span-20 ">
									<div  id="company" class="span-7 none">
										<div class="span-3 text_right">
											    <s:label  value="账户名称："></s:label>
										</div>
										<div class="span-4 last">
											<s:select id="comAccId" name="comAccId" list="accTypeList" listKey="diffNo" listValue="diffName" cssClass="span-3" onchange="getComRemain()"/>
									    </div>
									</div>
									<div  id="personal" class="span-7">
									    <div class="span-3 text_right">
											    <s:label  value="账户："></s:label>
										</div>
										<div class="span-4 last">
										       <s:textfield id="accId" name="pesAccId" maxlength="6" cssClass="span-2" onchange="getPerRemain()" tooltip="请输入账户ID（员工ID）"/>
									 	       <s:textfield id="accName" maxlength="20" cssClass="span-2" onblur="getPerRemain()" tooltip="请输入员工的姓名（汉字或拼音首字母）"/>
										     <s:hidden id="pesonRemain" name="pesonRemain"></s:hidden>     
										</div>
								    </div>
								    <div id="remain" class="span-7 text_left none">
								           <s:label value="(余额："></s:label>
								           <s:label id="enableRemain" cssClass="moneySmall"></s:label><span>&nbsp;元)</span>
								    </div>
							    </div>
							  <div class="span-20">
								   <div class="span-3 text_right">
										<s:label value="金额："></s:label>
								   </div>
								    <div class="span-4">
								      <s:textfield id="money" name="tansferCondA.exMoney" maxlength="20" cssClass="span-2 text_right padding_right_2" tagtype="money"/>
								      <span>&nbsp;元</span>
							        </div>
							 </div>
							 <div class= "span-20">
								 <div id="save" class="span-20">
										<div class="prepend-2 span-6 margin_top_8">
														<!--  <input type="button" value="存款" class="span-2 btn" onclick="accessMoney()" /> -->
														<img alt="存款" class="cur_pointer" src="../images/gps/btnSaveM.png" onclick="accessMoney()">
										</div>
								</div>
							</div>
							<div class= "span-20">
								<div id="out" class="span-20 none">
										<div class="prepend-2 span-6 margin_top_8 ">
														<!--  <input type="button" value="取款" class="span-2 btn" onclick="accessMoney()" /> -->
														<img alt="取款" class="cur_pointer" src="../images/gps/btnGetM.png" onclick="accessMoney()">
										</div>
								</div>
							</div>
						
					  </s:form>
					  </div>
				  </div>
			     <div id="myTab0_Content1" class="prepend-h span-23 none last h_542">
						<!--公司账户收支明细画面 -->
						<s:form id="compAccInfoForm" action="yd0020findExHisList" namespace="/gps" method="post" validate="true">
							<div class="span-20 margin_top_10">
								<div class="span-7">
										<div class="span-2 text_right">
											<s:label  value="账户类型："></s:label>
										</div>
									    <div class="span-4 ">
								          <s:radio id="accFlag"  name="yd0020CondA.accFlag" value="yd0020CondA.accFlag" list="accFlagList" listKey="diffNo" listValue="diffName" onclick="changeAcc()"/>
								        </div>
							     </div>
					             <div id="comAcc" class="span-10 ">
							        <div class="span-2 text_right">
										<s:label  value="账户名称："></s:label>
										<s:hidden id="oldParam"/>
									</div>
									<div class="span-4 text_left">
										<s:select id="accComId"  name="yd0020CondA.accId" cssClass="span-3" list="accTypeList" listKey="diffNo" listValue="diffName"/>
								         <s:hidden id="comAccId"></s:hidden>
								    </div>
						        </div>
							    <div id="perAcc" class="span-10 none">
									<div class="span-2 text_right">
											<s:label  value="账户："></s:label>
									</div>
									<div class="span-6 text_left">
									        <s:textfield id="accId2" name="yd0020CondA.accId" maxlength="20" cssClass="span-2" tooltip="请输入账户ID（员工ID）"/>
								 	       <s:textfield id="accName2"  name="yd0020CondA.accName" maxlength="20" cssClass="span-2" tooltip="请输入员工的姓名（汉字或拼音首字母）"/>
									</div>
								</div>
							        
						</div>
						<div class="span-24 margin_top_8 margin_bottom_6">
								<div class="span-2 text_right">
									<s:label  value="起止日期："></s:label>
								</div>
							    <div class="span-5">
						          <s:textfield id="startDate" name="yd0020CondA.exStartTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
									<span>～</span>
						          <s:textfield id="endDate" name="yd0020CondA.exEndTime" maxLength="10" cssClass="span-2" onclick="WdatePicker()"/>
						        </div>
						        <div class="span-2 text_right">
									<s:label  value="交易类型："></s:label>
								</div>
								<div class="span-4">
								  <s:select id="tradeType" name="yd0020CondA.exType" list="tradeTypeList" listKey="diffNo" listValue="diffName"  cssClass="span-3"/>
						        </div>
						        <div class="span-2 text_right">
									<s:label  value="收支区分："></s:label>
								</div>
						        <div class="span-6 text_left">
								  <s:radio id="iOType" name="yd0020CondA.ioFlag" list="ioList" listKey="diffNo" listValue="diffName"/>
						        </div>
						        <div class="span-1 ">
									<input type="button" id="search" value="查询" class="span-2 btn color_blue" onclick="searchExchangeHis()" />
								</div>
						</div>
					</s:form>
					
					<!-- 分割线  -->
					   <div class="span-23 separator"></div>
					<!--公司账户交易履历一览画面 -->
					<div id="div_company_accountInfoList">
						<s:include value="Yd0021.jsp" />
					</div>
				</div>
	     </div>
    </div>
</div>
</body>
</html>