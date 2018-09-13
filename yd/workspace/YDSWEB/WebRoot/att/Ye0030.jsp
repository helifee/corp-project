<%--
 * @(#)Ye0030.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
--%>

<%--
 * 
 * 
 * @author 
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
	<script type="text/javascript" src="<%=basePath%>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0030.js"></script>	
	<title></title>
</head>
<body onload="init();">
<script type="text/javascript">
		window['g_path'] = '<%=path %>';
		window['g_basePath'] = '<%=basePath %>';
</script>
<div class="span-12">
 <s:form id="attCorrectForm" action="ye0030Init" method="post" namespace="/att" validate="true">
  <div class="span-12">
			<div class="span-8 last margin_top_6">
				<div class="span-2">
					<s:label value="申请人" />
					<span class="color_red">*</span>
				</div>
				<s:textfield id="accId" maxlength="6" cssClass="span-2"/>
			 	<s:textfield id="accName" name="ye0030AttCorrect.loginName" maxlength="20" cssClass="span-2" />
			 	<s:hidden id="loginId" name="ye0030AttCorrect.loginId"></s:hidden>
			</div>
			<div class="span-8 last margin_top_6">
				<div class="span-2">
					<s:label value="考勤日期" />
					<span class="color_red">*</span>
				</div>
				<s:textfield id="attDate" name="attDate" maxLength="10" cssClass="span-2" onFocus="WdatePicker({maxDate:'%y-%M-{%d-1}',onpicked:getCorrectInfo})" />
			</div>
				<div class="span-12 last margin_top_6">
					<div class="span-2">
						<s:label value="考勤时间" />
						<span class="color_red">*</span>
					</div>
					<div class="span-9 box_border padding_bottom_4">
						<div class="span-9">
							<div class="span-2 margin_left_4">
								<s:label value="首末次打卡" />
							</div>
							<div class="span-3 last">
								<s:label id="firstTime" name="ye0030AttCorrect.firstTime"/>
							</div>
							<div class="span-1 text_center">
								<span>～</span>
							</div>
							<div class="span-3 last">
								<s:label id="lastTime" name="ye0030AttCorrect.lastTime"/>
							</div>
						</div>
						<div class="span-9">
							<div class="span-2 margin_left_4">
								<s:label value="变更前" />
							</div>
							<div class="span-3 last">
								<s:label id="befStartTime" name="ye0030AttCorrect.befStarthhmm"/>
							</div>
							<div class="span-1 text_center">
								<span>～</span>
							</div>
							<div class="span-3 last">
								<s:label id="befEndTime" name="ye0030AttCorrect.befEndhhmm"/>
							</div>
						</div>
					<div class="span-9">
						<div class="span-2 margin_left_4">
							<s:label value="变更后" />
						</div>
						<div class="span-3 last">
							<s:textfield id="aftStartTime" name="aftStartTime" maxlength="6" size="5" onFocus="WdatePicker({quickSel:['08:00'],dateFmt:'HH:mm'})"/>
							<s:checkbox name="" id="chkStartTime"/><s:label value="(翌日)" />
							<s:hidden id="aftStartDateTime" name="ye0030AttCorrect.aftStartTime"/>
						</div>
						<div class="span-1 text_center">
							<span>～</span>
						</div>
						<div class="span-3 last">
							<s:textfield id="aftEndTime" name="aftEndTime" maxlength="6" size="5" onFocus="WdatePicker({quickSel:['17:00'],dateFmt:'HH:mm'})"/>
							<s:checkbox name="" id="chkEndTime"/><s:label value="(翌日)" />
							<s:hidden id="aftEndDateTime" name="ye0030AttCorrect.aftEndTime"/>
						</div>
					</div>
			    </div>
		 </div>
		<div class="span-12 last margin_top_8">
				<div class="span-2">
					<s:label value="更正理由"/>
					<span class="color_red">*</span>
				</div>
				<div class="span-9 last">
					<s:textarea id="correctReason" name="ye0030AttCorrect.correctReason"  rows="5" cssClass="span-9"/>
				</div>
		</div>
		<div class="span-12 last margin_top_6">
				<div class="span-2">
					<s:label value="审批流程"/>
				</div>
				<div class="span-9 last">
					<s:select id="tradeType" name="ye0030AttCorrect.strOrgId" list="ye0030AttCorrect.attExamin" listKey="orgId" listValue="orgSnm" cssClass="span-9"/>
				</div>
	   </div>
	   <div id="divSuggestion" class="span-12 last">
				<div class="span-2">
					<s:label value="审批意见"/>
				</div>
				<div class="span-9 last">
					<s:textarea id="suggestion" name="ye0030AttCorrect.exaSuggestion"  rows="5" cssClass="span-9"/>
				</div>
		
	  </div>
 </div>
  <div id="btnInsert" class="span-12 last text_center margin_top_2">
	  <input type="button" id="insert" value="提交" class="btn span-2" onclick="setTime()"/>
  </div>
  <div id="btnDelete" class="span-12 last text_center margin_top_2">
	  <input type="button" id="delete" value="撤销" class="btn span-2" onclick="deleteTime()"/>
  </div>
  <s:hidden id="appId" name="ye0030AttCorrect.appId"/>
  <s:hidden id="statusCor" name="ye0030AttCorrect.statusCor"/>
  <s:hidden id="loginId_A" value="%{#session.userinfo.userId}"/>
 </s:form>
</div>
</body>
</html>
