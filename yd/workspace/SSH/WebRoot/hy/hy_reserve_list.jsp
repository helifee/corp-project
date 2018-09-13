<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>会议室预约一览画面</title>
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/prototype.js"></script>
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/hyReserveList.js"></script>
	
</head>
<body onload="init();">
<div id="content" class="container position_rel none">
	<div class="span-24 title">
		<h2>会议室预约情况一览</h2>
	</div>
	<div class="span-24">
		<div id="hysMap" class="hysMap"></div>
	</div>
	<hr class="space"/>
	<hr class="space"/>
	<div class="span-24">
		<div class="prepend-8 float_l">&nbsp;</div>
		<div id="btnPrev" class="float_l imgBtn1 margin_right_10" onclick="gotoDay(-1);">&lt;&lt;前日</div>
		<div class="span-2 padding_top_2">
			<input type="text" id="viewDay" onclick="changeDay();" onblur="dayOnchange();" nowday="${cdri}" today="${today}" nowtime="${nowTime}" class="span-2"/>
		</div>
		<div class="span-2 text_indent_8">
			<label id="weekDay"></label>
		</div>
		<div id="btnNext" class="imgBtn1 float_l" onclick="gotoDay(1);">后日&gt;&gt;</div>
	</div>
	<div class="span-24">
		<div class="float_l">
			<div class="float_l">&nbsp;</div>
			<div id="hysList" class="float_l"></div>
		</div>
		<div class="span-22 last position_rel">
			<div class="float_l margin_bottom_4">
				<div class="float_l font_simsun">
					<div class="float_l hysTimeText">08:00</div>
					<div class="float_l hysTimeText">09:00</div>
					<div class="float_l hysTimeText">10:00</div>
					<div class="float_l hysTimeText">11:00</div>
					<div class="float_l hysTimeText">12:00</div>
					<div class="float_l hysTimeText">13:00</div>
					<div class="float_l hysTimeText">14:00</div>
					<div class="float_l hysTimeText">15:00</div>
					<div class="float_l hysTimeText">16:00</div>
					<div class="float_l hysTimeText">17:00</div>
					<div class="float_l span-1">18:00</div>
				</div>
				<div id="tLine" class="float_l hysTimeLine"></div>
			</div>
			<div id="yyList" class="float_l">
			</div>
		</div>
	</div>
	<div id="hysToolTip" class="hysToolTip">
		<table>
			<tr>
				<td class="text_right">名称：</td>
				<td id="tipMc" class="span-3"></td>
			</tr>
			<tr>
				<td class="text_right">人数：</td>
				<td id="tipRs"></td>
			</tr>
			<tr>
				<td class="text_right">设备：</td>
				<td id="tipSb"></td>
			</tr>
			<tr>
				<td class="text_right">网线：</td>
				<td id="tipJk"></td>
			</tr>
			<tr>
				<td class="text_right">电话：</td>
				<td id="tipDh"></td>
			</tr>
		</table>
	</div>
</div>
</body>
</html>