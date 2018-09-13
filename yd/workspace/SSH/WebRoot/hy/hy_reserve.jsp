<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>会议室预约</title>

<!-- import css -->
<link rel="stylesheet" type="text/css" href="css/style.css" />

<!-- import the calendar script -->
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/reserve.js"></script>

</head>

<body onload="init()">
	<div class="container">
	  <s:form id="hysyy" name="hysyy" method="post" theme="simple">
		<div class="span-24 title">
			<div class="span-22">
				<h2>会议室预约</h2>
			</div>
			<div class="span-2 margin_top_4 last">
			<s:url action="conferenceinit" id="conferencenameUrl">
				<s:param name="yyDate" value="%{yilanDate}"></s:param>
			</s:url> 
			<s:a href="%{conferencenameUrl}" cssClass="btn span-2">返回</s:a>
			</div>
			
		</div>

		<div class="span-24">
			<div class="span-2 text_right">
				预约方式
			</div>
			<div class="span-3">
				<s:radio id="danri" name="yuyueinfo.yuyuetype" list="#{0 : '单日'}"
					onclick="hidden_enddate('%{yuyueinfo.startdate}');">
				</s:radio>
				<s:radio id="zhouqi" name="yuyueinfo.yuyuetype" list="#{1 : '周期'}"
		 			onclick="display_enddate('%{yuyueinfo.startdate_cycle}');">
		 		</s:radio>
			</div>
			<div class="span-15 color_red">
				<s:property value="errormsg" /><br />
				<s:fielderror />
			</div>
		</div>
		<div class="span-24" id="cycle">
			<div class="span-2 text_right">
				周期设定
			</div>
			<div class="span-22 last">
				<div class="span-22 last">
				  <div class="span-2">
					<s:radio id="meiri" name="yuyueinfo.zhouqitype" list="#{1 : '每日'}" 
						onclick="selectZhouqi();">
					</s:radio>
				  </div>
				</div>
				<div class="span-22 last">
					<div class="span-10">
						<s:radio name="yuyueinfo.zhouqitype" list="#{2 : '每周'}" onclick="selectZhouqi();">
						</s:radio>
						<s:checkbox id="mon" name="yuyueinfo.mon" fieldValue="2"
							theme="ysyshy" value="%{yuyueinfo.mon}" onclick="selectMeiZhou();"></s:checkbox>星期一 
						<s:checkbox id="tue" name="yuyueinfo.tue" fieldValue="3" 
							theme="ysyshy" value="%{yuyueinfo.tue}" onclick="selectMeiZhou();"></s:checkbox>星期二
						<s:checkbox id="wen" name="yuyueinfo.wen" fieldValue="4" 
							theme="ysyshy" value="%{yuyueinfo.wen}" onclick="selectMeiZhou();"></s:checkbox>星期三
						<s:checkbox id="thu" name="yuyueinfo.thu" fieldValue="5"
							theme="ysyshy" value="%{yuyueinfo.thu}" onclick="selectMeiZhou();"></s:checkbox>星期四 
						<s:checkbox id="fri" name="yuyueinfo.fri" fieldValue="6" 
							theme="ysyshy" value="%{yuyueinfo.fri}" onclick="selectMeiZhou();"></s:checkbox>星期五
					</div>
					<div class="span-20 last">
						<div class="span-10">
							<s:radio name="yuyueinfo.zhouqitype" list="#{3 : '每月'}" onclick="selectMonth();selectZhouqi();">
							</s:radio>
							<s:textfield id="yuyueinfo.day" name="yuyueinfo.day" 
								cssStyle="width:25px" maxlength="2" onclick="clickDay();">
							</s:textfield>&nbsp;日
							<s:radio name="yuyueinfo.qianhou" list="#{1 : '遇休日提前'}" 
								onclick="selectMeiYue();">
							</s:radio> 
							<s:radio name="yuyueinfo.qianhou" list="#{0 : '遇休日后延'}" 
								onclick="selectMeiYue();">
							</s:radio>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<s:hidden id="startdate1" name="yuyueinfo.startdate"></s:hidden>
		<s:hidden id="startdate2" name="yuyueinfo.startdate_cycle"></s:hidden>
		
		<div class="span-24">
			<div class="span-2 text_right">日期*</div>
			<div class="span-8">
				<s:textfield id="startdate" name="tempdate" 
					cssStyle="width:80px; text-align:center"  maxlength="10"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
					onchange="textToHidden()" theme="simple" readonly="true"></s:textfield> 
				<span id="enddate" style="display: none">&nbsp;～&nbsp; 
					<s:textfield id="yuyueinfo.enddate" name="yuyueinfo.enddate" 
					cssStyle="width:80px; text-align:center" maxlength="10"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
					theme="simple"  readonly="true"></s:textfield> 
				</span>
			</div>
		</div>
		<div class="span-24">
			<div class="span-2 text_right">会议室*</div>
			<div class="span-20">
				<s:select id="yuyueinfo.hys" name="yuyueinfo.hys" list="hysList" 
					listKey="Id" listValue="Hysmc" headerKey="0"
					headerValue="-------------------请选择-------------------">
				</s:select>&nbsp;
			</div>
		</div>
		<div class="span-24">
			<div class="span-2 text_right">会议主题*</div>
			<div class="span-10">
				<s:textfield id="yuyueinfo.hyzt" name="yuyueinfo.hyzt" cssStyle="width:210px"
					maxlength="100"></s:textfield> 
				<s:checkbox name="yuyueinfo.bmbz" fieldValue="1" theme="ysyshy" 
					value="%{yuyueinfo.bmbz}"></s:checkbox>保密
			</div>
		</div>
		<div class="span-24 margin_top_4">
			<div class="span-2 text_right">时间*</div>
			<div class="span-20">
				<s:select id="yuyueinfo.start_hour" name="yuyueinfo.start_hour" cssStyle="width:52px"
					list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', 
					'15':'15', '16':'16', '17':'17', '18':'18'}">
				</s:select> ： 
				<s:select id="yuyueinfo.start_minute" name="yuyueinfo.start_minute" cssStyle="width:52px" 
					list="#{'00':'00', '30':'30'}">
				</s:select> ～ 
				<s:select id="yuyueinfo.end_hour" name="yuyueinfo.end_hour" cssStyle="width:52px"
					list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', 
					'15':'15', '16':'16', '17':'17', '18':'18'}">
				</s:select> ： 
				<s:select id="yuyueinfo.end_minute" name="yuyueinfo.end_minute" cssStyle="width:52px"
					list="#{'00':'00', '30':'30'}">
				</s:select>
			</div>
		</div>
		<div class="span-24">
			<div class="span-2 text_right">申请者*</div>
			<div class="span-10">
				<s:textfield id="yuyueinfo.sqr" name="yuyueinfo.sqr" cssStyle="width:115px"
				maxlength="5" readonly="true"></s:textfield>&nbsp;
			</div>
		</div>
		<div class="span-24">
			<div class="span-2 text_right">参加者*</div>
			<div class="span-10">
				<s:textfield id="yuyueinfo.cjr" name="yuyueinfo.cjr" cssStyle="width:267px"
					maxlength="10" readonly="true"></s:textfield> 
				<input type="button" class="btn" value="选择" onclick="doSubmit('select')" />
			</div>
		</div>
		<div class="span-24">
			<div class="span-2 text_right">人数*</div>
			<div class="span-10">
				<s:textfield id="yuyueinfo.cjrs" name="yuyueinfo.cjrs" cssStyle="width:115px"
				maxlength="2" readonly="true"></s:textfield>&nbsp;
				<s:hidden id="yuyueinfo.cjrIdList" name="yuyueinfo.cjrIdList"></s:hidden>
				<s:hidden id="rsString" name="rsString"></s:hidden>
			</div>
		</div>
		<!-- 
		<div class="prepend-2 span-22 last">
			<input type="checkbox" id="notice" name="notice" checked="checked" />
			<label for="notice">通知开发人员</label>
		</div>
		<div class="span-24">
			 <div class="span-2 text_right">备注</div>
			 <div>
				 <textarea id="comment" name="comment" rows="3" cols="60"></textarea>
			 </div>
		</div>
		 -->
		<div class="span-24">
			<div class="span-10 text_center">
				<input type="button" class="btn" value="提交预约" onclick="doSubmit('reserve')" />&nbsp;
				
			</div>
		</div>
		</s:form>
	</div>
</body>
</html>
