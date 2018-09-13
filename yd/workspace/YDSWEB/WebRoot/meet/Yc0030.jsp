<%--
 * @(#)Yc0030.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 会议室预约详细画面
 * 
 * @author chenyuer,bixiuqing
 * @version 1.00 2010/07/21
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
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/meet/Yc0030.js"></script>
	<title>会议室预约更改</title>	
</head>
<body onload="init();" scroll="no">
	
	<div class="span-18 last h_542">
		<!-- 操作状态消息 -->
	 	<s:hidden id="operateTip" value="%{#session.operateTip}"></s:hidden>
		<%session.removeAttribute("operateTip");%>
	  	<s:form id="metReserveForm" name="metReserveForm" method="post" validate="true" action="yc0030SaveData">
	  		<div class="span-18 h_50 last"></div>
	  		<div>
				<s:hidden id="canGetCycleInfo" name="yc0030MetInfo.canGetCycleInfo"></s:hidden>
			</div>
			<div>
				<s:hidden id="fromId" name="fromIdH"></s:hidden>
			</div>
			<div>
				<s:hidden id="updateFlg" name="yc0030MetInfo.updateFlg"></s:hidden>
			</div>
			<div>
				<s:hidden id="userPermission" name="yc0030MetInfo.UserPermission"></s:hidden>
			</div>
			<div>
				<s:hidden id="backFlg" name="backFlg"></s:hidden>
			</div>
			<div>
				<s:hidden id="editable" name="yc0030MetInfo.editable"></s:hidden>
			</div>
			<div>
				<s:hidden id="cycleMetId" name="yc0030MetInfo.cycleMetId"></s:hidden>
			</div>
			<div>
				<s:hidden id="viewMode" name="viewMode"></s:hidden>
			</div>
			<div>
				<s:hidden id="myMinDate" name="yc0030MetInfo.minDateS"></s:hidden>
			</div>
			<div class="span-18 margin_top_4 last">
				<div class="span-4 text_right">预约方式</div>
				<div class="span-4 text_left">
					<s:radio id="reserveType" name="yc0030MetInfo.reserveType" list="reserveTypeMap"
						listKey="key" listValue="value" onclick="getMetreserveInfo(this);">
					</s:radio>
				</div>
				<div class="span-4 text_left last">
					<s:property value="errormsg" />
					<s:fielderror />
				</div>
			</div>
			<div class="span-18 last">
				<div class="span-18 last" id="cycle">
					<div class="span-4 text_right margin_top_4">周期设定</div>
					<div class="span-14 last">
						<div class="span-14 text_left margin_top_4 last">
							<s:radio id="cycleType" name="yc0030MetInfo.cycleType" list="#{1 : '每日'}" 
								onclick="clearOther();">
							</s:radio>
						</div>
						<div class="span-14 margin_top_4 last">
							<div class="span-2">
								<s:radio id="cycleType" name="yc0030MetInfo.cycleType" list="#{2 : '每周'}" 
									onclick="clearOther();">
								</s:radio>
							</div>
							<div class="span-12 last">
								<s:checkboxlist id = "workDay" cssClass="span-2" name="yc0030MetInfo.workDay" list="workDayLst" 
								listKey="key" listValue="value"  value="%{yc0030MetInfo.workDay}" onclick="selectWeekly();"/>
							</div>
						</div>
						<div class="span-14 margin_top_4 last">
							<div class="span-2">
								<s:radio id="cycleType" name="yc0030MetInfo.cycleType" list="#{3 : '每月'}" onclick="selectMonth();">
								</s:radio>
							</div>
							<div class="span-2">
								<s:textfield id="day" name="yc0030MetInfo.day" cssClass="span-1"
									maxlength="2" onclick="clickDay();"></s:textfield>&nbsp;日 
							</div>
							<div class="span-4">
								<s:radio id="delayedFlg" name="yc0030MetInfo.delayedFlg" list="#{1 : '遇休日提前'}" 
									onclick="selectMonthly();">
								</s:radio>
							</div>
							<div class="span-6 text_left last">
								<s:radio id="delayedFlg" name="yc0030MetInfo.delayedFlg" list="#{0 : '遇休日后延'}" 
									onclick="selectMonthly();">
								</s:radio>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="span-18 margin_top_4 last">
				<div class="span-4 text_right">会议室<span class="color_red">*</span></div>
				<div class="span-14 last">
					<s:select id="metId" name="yc0030MetInfo.metId"
					list="metRoomInfoLst" listKey="metId" listValue="metRnmContainCnt">
					</s:select>&nbsp;		
					<s:hidden id="metIdOld" name="yc0030MetInfo.metIdOld"></s:hidden>
					<s:hidden id="metIdH" name="yc0030MetInfo.metId"></s:hidden>
				</div>		
			</div>
			<div class="span-18 margin_top_4 last">
				<div class="span-4 text_right">会议主题<span class="color_red">*</span></div>
				<div class="span-8">
					<s:textfield id="metTopic" name="yc0030MetInfo.metTopic" cssClass= "span-8" maxlength="30"></s:textfield>
				</div>
				<div class="span-5 text_left last">
					<s:checkbox id="publicFlg" name="yc0030MetInfo.publicFlg" fieldValue="1" cssClass = "padding_bottom_4"
						value="%{yc0030MetInfo.publicFlg==1}"></s:checkbox>保密
				</div>
			</div>
			<div class="span-18 margin_top_4 last">
				<div class="span-4 text_right">日期<span class="color_red">*</span></div>
				<div class="span-14 last">
					<div class="span-2">
						<s:textfield id="startDate" name="yc0030MetInfo.startDate" maxlength="10" cssClass="span-2"
							onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, 
							minDate: g_minData})" readonly="true">
						</s:textfield> 
					</div>
					<s:hidden id="startDateOld" name="yc0030MetInfo.startDateOld"></s:hidden>
					<div id="startEnd" class="span-11 last">
						<div class="span-1 text_center">&nbsp;～&nbsp; </div>
						<div class="span-10 text_left last">
							<s:textfield id="endDate" name="yc0030MetInfo.endDate"  cssClass="span-2"
								onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
								maxlength="10" readonly="true">
							</s:textfield>
						</div>
					</div>
					<s:hidden id="endDateOld" name="yc0030MetInfo.endDateOldS"></s:hidden>
				</div>
			</div>
			<div class="span-18 margin_top_4 last">
				<div class="span-4 text_right">时间<span class="color_red">*</span></div>
				<div class="span-14 last">
					<s:hidden id="startTimeOld" name="yc0030MetInfo.startTimeOld"></s:hidden>
					<s:select id="startHour" name="yc0030MetInfo.startHour"
						list="startHourMap" listKey="key" listValue="value">
					</s:select> ： 
					<s:select id="startMinute" name="yc0030MetInfo.startMinute"
						list="minuteMap" listKey="key" listValue="value">
					</s:select> ～ 
					<s:select id="endHour" name="yc0030MetInfo.endHour"
						list="endHourMap" listKey="key" listValue="value">
					</s:select> ： 
					<s:select id="endMinute" name="yc0030MetInfo.endMinute"
						list="minuteMap" listKey="key" listValue="value">
					</s:select>
					<s:hidden id="endTimeOld" name="yc0030MetInfo.endTimeOld"></s:hidden>
				</div>
			</div>
			<div class="span-18 last margin_top_4">
				<div class="span-4 text_right">预约者<span class="color_red">*</span></div>
				<div class="span-14 last">
					<s:textfield id="reserverNm" name="yc0030MetInfo.reserverNm" cssClass="span-2"
						maxlength="5"  disabled="true">
					</s:textfield>
				</div>
				<s:hidden id="reserverId" name="yc0030MetInfo.reserverId"></s:hidden>
			</div>
			
		<!--  	<div class="span-18 last margin_top_4">
				<div class="span-4 text_right">组选择</div>
				<div class="span-14 last">
					<s:select id="teamSelect" name="teamSelect" list="teamList" listKey="teamId" listValue="teamSnm" cssClass="span-3"/>
				</div>	
			</div>-->
			
			<div class="span-18 margin_top_4 last">
				<div class="span-4 text_right">参加者</div>
				<div class="span-14 last">


					<div class="span-3 text_left ">
						<!-- 参加人ID List -->
						<s:hidden id="metUserId" name="yc0030MetInfo.metUserId"></s:hidden>
						<input id="select" type="button" class="btn span-2" value="选择人员" onclick="doSubmit('select')" />
					</div>
					<div id="teamSelectDiv" class="span-11 last">
						<s:select id="teamSelect" name="teamSelect" list="teamList" listKey="teamId" listValue="teamSnm" onchange="getTeamUser()" cssClass="span-3"/>
						（按组选择）
					</div>	
					<div class="span-14 last">
						<s:textarea id="metUserNm" name="yc0030MetInfo.metUserNm"
						 disabled="true" cols="60" rows="3">
						</s:textarea>
						<a href="#this" id="add2team" onclick="openTeam();" class="none" title="將该选择结果添加为组">添加为组</a>
					</div> 
				</div>
			</div>
			<div class="span-18 last margin_top_4">
				<div class="span-4 text_right"><span>人数<span class="color_red">*</span></span></div>
				<div class="span-14 text_left last">
					<s:textfield id="metUserCnt" name="yc0030MetInfo.metUserCnt" cssClass="span-1 text_right"
					maxlength="3"></s:textfield><span>&nbsp;&nbsp;人</span>
				</div>
			</div>
			<div class="span-18 last margin_top_4">
				<div class="span-4">&nbsp;</div>
				<div class="span-14 text_left last">
					<s:checkbox id="contactUser" name="yc0030MetInfo.contactUser" 
						value="%{yc0030MetInfo.contactUser==1}" onclick="showMetNotes()" fieldValue="1">
					</s:checkbox>通知参加者
				</div>
			</div>
			<div>
				<div id="notes" class="span-18 last margin_top_4">
					<div class="span-4 text_right">备注</div>
					<div class="span-14 last">
						<s:textarea id="metNotes" name="yc0030MetInfo.metNotes" cols="60" rows="4">
						</s:textarea>
					</div>
				</div>
				<!-- 初始时保存会议室人数字符串("20,8,30,4,15")，用于检查修改时人数是否超员 -->
				<s:hidden id="metRoomSize" name="metRoomSize"></s:hidden>
			</div>
			<div class="span-18 text_center margin_top_4 last">
				<div class="span-18 last">
					<s:if test="%{yc0030MetInfo.editable}">
						<input id="update" type="button" class="btn span-2" value="更改预约" onclick="doSubmit('update')"
						 	/>
						<input id="delete" type="button" class="btn span-2" value="取消预约" onclick="doSubmit('delete')"
							/>
					</s:if>
				</div>
			</div>
			<div class="span-18 text_center margin_top_4 last">
				<div class="span-18 last">
					<s:if test="viewMode==0">
						<input id="save" type="button" class="btn span-2" value="预约会议" onclick="doSubmit('reserve')" />&nbsp;
					</s:if>
				</div>
			</div>
	  		<div id="cycleHide" class="span-18 h_50 last"></div>
			<!-- 人员选择弹出层  -->
			<div id="empSelect" class="none">
				<iframe id="empSelectPage" frameBorder="0" class="overflow_hd"></iframe>  
			</div>
		</s:form>
		
		<!-- 创建组弹出层 -->
		<div id="teamInfo" class="none">
			<s:form id="teamInfoForm" action="yc0030CreateTeam" method="post" namespace="/meet" validate="true">	
				<div class="span-8 last">
					<div class="span-8 margin_top_4 last">
						<div class="span-2 text_right"><s:label value="组名"/></div>
						<div class="span-6 last"><s:textfield name="empTeamInfo.teamNm" id="teamNm" maxlength="10"/>
						<s:textfield name="hiddennm" id="hiddennm" cssClass="none" maxlength="10"/>
						</div>
						
					</div>
					<div class="span-8 margin_top_4 last">
						<div class="span-2 text_right"><s:label value="组类别"/></div>
						<div class="span-6 last">
							<s:radio id="teamDiffNm" name="empTeamInfo.teamFlg" list="teamTypeList"
							 listKey="diffNo" listValue="diffName" value="empTeamInfo.teamFlg"/>
						</div>
					</div>
					
					<div class="span-8 margin_top_4 text_center last">
						<span class="font_size_12 color_gray_0 text_center">提示：关于组的详细管理，请到员工管理>组管理页面！</span>
					</div>
					
					<div class="span-8 text_center margin_top_10 margin_bottom_10 last">
						<s:hidden name="empTeamInfo.userId" id="userId"/>
						<input type="button" id="savaTeam" name="savaTeam" value="保存" class="span-2 btn" onclick="createTeam()"/>
					</div>
				</div>
			</s:form>
		</div>	
	</div>
</body>
</html>
