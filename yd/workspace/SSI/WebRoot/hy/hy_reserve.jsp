<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<html>
<head>
<title>会议室预约</title>

<!-- import css -->
<link rel="stylesheet" type="text/css" href="css/reserve.css" />

<!-- import the calendar script -->
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/reserve.js"></script>

<script type="text/javascript">
function init() {
	
	var value = 0;
	var radio = window.document.getElementsByName('yuyueinfo.yuyuetype');
	for(i=0; i<radio.length; i++) {
		if(radio[i].checked) {
			value = radio[i].value;
		}
	}
	
	if(value == 0) {
		hidden_enddate();

		//指定周期开始日期，结束日期在Java中指定
		document.getElementById("startdate2").value = document.getElementById("startdate1").value;
		
	} else if(value == 1) {
		display_enddate();
	}
}
</script>
</head>

<body onload="init()">

<s:include value="../common/topmenu.jsp" />

<p>会议室预约</p>

<table align="center" style="width: 500px">
	<tr>
		<td align="right">
			<s:url action="conferenceinit" id="conferencenameUrl">
				<s:param name="yyDate" value="%{yilanDate}"></s:param>
			</s:url> 
			<s:a href="%{conferencenameUrl}">返回</s:a>
		</td>
	</tr>
</table>

<s:form id="hysyy" name="hysyy" method="post" theme="simple">

	<table align="center" cellspacing="10" width="470">
		<tr>
			<td width="70">
				<s:radio id="danri" name="yuyueinfo.yuyuetype" list="#{0 : '单日'}"
					onclick="hidden_enddate('%{yuyueinfo.startdate}');">
				</s:radio>
			</td>
		</tr>
	</table>

	<div align="center">
	<fieldset style="width: 470px; padding-right: 0px;">
		<legend><s:radio id="zhouqi" name="yuyueinfo.yuyuetype" list="#{1 : '周期'}"
		 onclick="display_enddate('%{yuyueinfo.startdate_cycle}');"></s:radio>
		</legend>

	<table align="center" cellspacing="10" width="469">
		<tr>
			<td width="40"></td>
			<td width="60"><s:radio id="meiri" name="yuyueinfo.zhouqitype"
				list="#{1 : '每日'}" onclick="selectZhouqi();"></s:radio></td>
			<td></td>
		</tr>

		<tr>
			<td width="40"></td>
			<td width="60"><s:radio name="yuyueinfo.zhouqitype"
				list="#{2 : '每周'}" onclick="selectZhouqi();">
				</s:radio></td>
			<td><s:checkbox id="mon" name="yuyueinfo.mon" fieldValue="2"
				theme="ysyshy" value="%{yuyueinfo.mon}" onclick="selectMeiZhou();"></s:checkbox>星期一 
				<s:checkbox id="tue" name="yuyueinfo.tue" fieldValue="3" 
				theme="ysyshy" value="%{yuyueinfo.tue}" onclick="selectMeiZhou();"></s:checkbox>星期二
				<s:checkbox id="wen" name="yuyueinfo.wen" fieldValue="4" 
				theme="ysyshy" value="%{yuyueinfo.wen}" onclick="selectMeiZhou();"></s:checkbox>星期三
			</td>
		</tr>

		<tr>
			<td width="40"></td>
			<td width="60"></td>
			<td><s:checkbox id="thu" name="yuyueinfo.thu" fieldValue="5"
				theme="ysyshy" value="%{yuyueinfo.thu}" onclick="selectMeiZhou();"></s:checkbox>星期四 
				<s:checkbox id="fri" name="yuyueinfo.fri" fieldValue="6" 
				theme="ysyshy" value="%{yuyueinfo.fri}" onclick="selectMeiZhou();"></s:checkbox>星期五
			</td>
		</tr>

		<tr>
			<td width="40"></td>
			<td width="60"><s:radio name="yuyueinfo.zhouqitype"
				list="#{3 : '每月'}" onclick="selectMonth();selectZhouqi();">
				</s:radio></td>
			<td>
				<s:textfield id="yuyueinfo.day" name="yuyueinfo.day" 
					cssStyle="width:25px" maxlength="2" onclick="clickDay();">
				</s:textfield>&nbsp;日
				<s:radio name="yuyueinfo.qianhou" list="#{1 : '遇休日提前'}" 
					onclick="selectMeiYue();"></s:radio> 
				<s:radio name="yuyueinfo.qianhou" list="#{0 : '遇休日后延'}" 
					onclick="selectMeiYue();"></s:radio>
			</td>
		</tr>

	</table>
	</fieldset>
	</div>
	
	<table align="center" cellspacing="10" width="500">
		<tr>
			<td><font color="red" size="2"><s:property value="errormsg" /></font></td>
			<td><s:fielderror /></td>
		</tr>
	</table>

	<table align="center" cellspacing="10" width="500">
		<s:hidden id="startdate1" name="yuyueinfo.startdate"></s:hidden>
		<s:hidden id="startdate2" name="yuyueinfo.startdate_cycle"></s:hidden>
		
		<tr>
			<td>日期</td>
			<td><s:textfield id="startdate" name="tempdate" 
					cssStyle="width:80px; text-align:center"  maxlength="10"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
					onchange="textToHidden()" theme="simple" readonly="true"></s:textfield> 
				<span id="enddate" style="display: none">&nbsp;～&nbsp; 
					<s:textfield id="yuyueinfo.enddate" name="yuyueinfo.enddate" 
					cssStyle="width:80px; text-align:center" maxlength="10"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
					theme="simple"  readonly="true"></s:textfield> 
				</span></td>
		</tr>

		<tr>
			<td>会议室</td>
			<td><s:select id="yuyueinfo.hys" name="yuyueinfo.hys" list="hysList" 
					listKey="Id" listValue="Hysmc" headerKey="0"
					headerValue="-------------------请选择-------------------">
				</s:select></td>
		</tr>

		<tr>
			<td>会议主题</td>
			<td><s:textfield id="yuyueinfo.hyzt" name="yuyueinfo.hyzt" cssStyle="width:220px"
					maxlength="100"></s:textfield> 
				<s:checkbox name="yuyueinfo.bmbz" fieldValue="1" theme="ysyshy" 
					value="%{yuyueinfo.bmbz}"></s:checkbox>保密
			</td>
		</tr>

		<tr>
			<td>时间</td>
			<td><s:select id="yuyueinfo.start_hour" name="yuyueinfo.start_hour" cssStyle="width:52px"
					list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', 
					'15':'15', '16':'16', '17':'17', '18':'18', '19':'19','20':'20', '21':'21'}">
				</s:select> ： 
				<s:select id="yuyueinfo.start_minute" name="yuyueinfo.start_minute" cssStyle="width:52px" 
					list="#{'00':'00', '30':'30'}">
				</s:select> ～ 
				<s:select id="yuyueinfo.end_hour" name="yuyueinfo.end_hour" cssStyle="width:52px"
					list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', 
					'15':'15', '16':'16', '17':'17', '18':'18', '19':'19', '20':'20', '21':'21', '22':'22'}">
				</s:select> ： 
				<s:select id="yuyueinfo.end_minute" name="yuyueinfo.end_minute" cssStyle="width:52px"
					list="#{'00':'00', '30':'30'}">
				</s:select></td>
		</tr>

		<tr>
			<td>申请人</td>
			<td><s:textfield id="yuyueinfo.sqr" name="yuyueinfo.sqr" cssStyle="width:115px"
				maxlength="5" readonly="true"></s:textfield></td>
		</tr>

		<tr>
			<td>参加人</td>
			<td><s:textfield id="yuyueinfo.cjr" name="yuyueinfo.cjr" cssStyle="width:267px"
					maxlength="10"></s:textfield> 
				<input type="button" value="选择" onclick="doSubmit('select')" /></td>
		</tr>

		<tr>
			<td>参加人数</td>
			<td><s:textfield id="yuyueinfo.cjrs" name="yuyueinfo.cjrs" cssStyle="width:115px"
				maxlength="2"></s:textfield></td>
		</tr>

		<s:hidden id="yuyueinfo.cjrIdList" name="yuyueinfo.cjrIdList"></s:hidden>
		<s:hidden id="rsString" name="rsString"></s:hidden>
	</table>
	<br />

	<table align="center">
		<tr>
			<td align="center"><input type="button" value="预约" width="70"
				onclick="doSubmit('reserve')" /></td>
		</tr>
	</table>
	
</s:form>
</body>
</html>
