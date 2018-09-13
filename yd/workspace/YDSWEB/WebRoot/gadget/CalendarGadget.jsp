<%--
 * @(#)CalendarGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>

<%--
 * 活动桌面日历
 * 
 * @author 远东)zhangzheng
 * @version 1.00 2010/08/12
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
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	<style>
		div.number {
			position: absolute;
			top: 3px;
			left: 3px;
			font-family: "Arial Black";
			font-size: 18px;
			color: #666;
			text-align: center;
			width: 30px;
			line-height:18px;
		}
		
		div.festval {
			position: absolute;
			top: 6px;
			left: 38px;
			font-size: 12px;
			line-height:13px;
		}
		
		div.sakura {	
			width: 12px;
			height: 12px;
			background-image: url(../images/activeDesk/sakura.png);
			background-repeat:no-repeat;
			float: right;
		}
		div.ydsHol {
			width: 12px;
			height: 12px;
			background-image: url(../images/activeDesk/ydsHol.png);
			background-repeat:no-repeat;
			float: right;			
		}
		div.icon{
			position:absolute;
			top: 27px;
			left: 66px;
			width: 26px;
			height:12px;
		}
		div.ydsWork {
			width: 14px;
			height: 12px;
			background-image: url(../images/activeDesk/ydsWork.png);
			background-repeat:no-repeat;
			float: right;
		}
		
		div.luna {
			position: absolute;
			top: 20px;
			left: 6px;
			font-size: 12px;
		}
		
		div.jxqi {
			color: #900;
		}
		
		div.jxri1 {
			color: #090;
		}
		
		div.jxri2 {
			color: #009;
		}
		
		td.weekend{
			background:#f4ffdf;
		}
		
		td.weekend .number {
			color: #eac;
		}
		
		th.weekend {
			background: #c19702 !important;
		}
		
		.dataTable th {
			width: 92px;
			height: 24px;
			line-height: 24px;
			background: #666;
			border: 1px solid #777;
			color: white;
		}
		
		.dataTable td {
			height: 40px;
			border: 1px solid #777;
		}
		
		.dataTable {
			border-collapse: collapse;
			width: 100%;
			background: white;
		}
		
		td.redDay{
			background:#f4ffdf !important;
		}
		
		td.redDay div.number{
			color:#ff0000 !important;
		}
		
		td.blackDay{
			background:#ffffff !important;
		}
		
		td.blackDay div.number{
			color:#666 !important;
		}
		
		td.today {
			background-color: #cf5 !important;
		}
		
		td.empty{
			background:#ffffff !important;
		}
		a{
			font-size:11.5px;
			font-color:#0ff;
		}
		.w_60{
			width:60px;
		}
		.w_40{
			width:40px;
		}
		.initMask div{
			display:none;
		}
		.legend{
			position:relative;
		}
		.legend img{
			position:absolute;
			top:2px;
			width:14px;
			height:14px;
		}
		.legend span{
			padding-left:17px;
		}
	</style>

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/Calendar.js"></script>

	<title>活动桌面日历</title>
</head>
<body onload="initial();">
	<div class="w_600 float_l">
		<div class="w_600 float_l">
			<div class="float_l margin_right_4 cur_pointer padding_left_10 padding_top_4 " onclick="change(-1,0);" title="上一年"><img height="14px"  src="../images/activeDesk/year-befor.png"></div>
			<div class="float_l cur_pointer padding_top_4" onclick="change(0,-1);" title="上一月"><img height="14px" src="../images/activeDesk/month-befor.png"></div>
			<div class="float_l prepend-4">
				<span id="vYear" class="prepend-h"></span>
				<span id="cYear" class="prepend-h">
					<select class="w_60">
						<option value="1949">1949</option>
						<option value="1950">1950</option>
						<option value="1951">1951</option>
						<option value="1952">1952</option>
						<option value="1953">1953</option>
						<option value="1954">1954</option>
						<option value="1955">1955</option>
						<option value="1956">1956</option>
						<option value="1957">1957</option>
						<option value="1958">1958</option>
						<option value="1959">1959</option>
						<option value="1960">1960</option>
						<option value="1961">1961</option>
						<option value="1962">1962</option>
						<option value="1963">1963</option>
						<option value="1964">1964</option>
						<option value="1965">1965</option>
						<option value="1966">1966</option>
						<option value="1967">1967</option>
						<option value="1968">1968</option>
						<option value="1969">1969</option>
						<option value="1970">1970</option>
						<option value="1971">1971</option>
						<option value="1972">1972</option>
						<option value="1973">1973</option>
						<option value="1974">1974</option>
						<option value="1975">1975</option>
						<option value="1976">1976</option>
						<option value="1977">1977</option>
						<option value="1978">1978</option>
						<option value="1979">1979</option>
						<option value="1980">1980</option>
						<option value="1981">1981</option>
						<option value="1982">1982</option>
						<option value="1983">1983</option>
						<option value="1984">1984</option>
						<option value="1985">1985</option>
						<option value="1986">1986</option>
						<option value="1987">1987</option>
						<option value="1988">1988</option>
						<option value="1989">1989</option>
						<option value="1990">1990</option>
						<option value="1991">1991</option>
						<option value="1992">1992</option>
						<option value="1993">1993</option>
						<option value="1994">1994</option>
						<option value="1995">1995</option>
						<option value="1996">1996</option>
						<option value="1997">1997</option>
						<option value="1998">1998</option>
						<option value="1999">1999</option>
						<option value="2000">2000</option>
						<option value="2001">2001</option>
						<option value="2002">2002</option>
						<option value="2003">2003</option>
						<option value="2004">2004</option>
						<option value="2005">2005</option>
						<option value="2006">2006</option>
						<option value="2007">2007</option>
						<option value="2008">2008</option>
						<option value="2009">2009</option>
						<option value="2010">2010</option>
						<option value="2011">2011</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
						<option value="2016">2016</option>
						<option value="2017">2017</option>
						<option value="2018">2018</option>
						<option value="2019">2019</option>
						<option value="2020">2020</option>
						<option value="2021">2021</option>
						<option value="2022">2022</option>
						<option value="2023">2023</option>
						<option value="2024">2024</option>
						<option value="2025">2025</option>
						<option value="2026">2026</option>
						<option value="2027">2027</option>
						<option value="2028">2028</option>
						<option value="2029">2029</option>
						<option value="2030">2030</option>
						<option value="2031">2031</option>
						<option value="2032">2032</option>
						<option value="2033">2033</option>
						<option value="2034">2034</option>
						<option value="2035">2035</option>
						<option value="2036">2036</option>
						<option value="2037">2037</option>
						<option value="2038">2038</option>
						<option value="2039">2039</option>
						<option value="2040">2040</option>
						<option value="2041">2041</option>
						<option value="2042">2042</option>
						<option value="2043">2043</option>
						<option value="2044">2044</option>
						<option value="2045">2045</option>
						<option value="2046">2046</option>
						<option value="2047">2047</option>
						<option value="2048">2048</option>
						<option value="2049">2049</option>
					</select>
				</span>
				<span>年</span>
				<span id="vMonth"></span>
				<span id="cMonth">
					<select class="w_40">
						<option value="0">1</option>
						<option value="1">2</option>
						<option value="2">3</option>
						<option value="3">4</option>
						<option value="4">5</option>
						<option value="5">6</option>
						<option value="6">7</option>
						<option value="7">8</option>
						<option value="8">9</option>
						<option value="9">10</option>
						<option value="10">11</option>
						<option value="11">12</option>
					</select>
				</span>
				<span>月</span>
			</div>
			<div class="float_l prepend-h">
				<span id="lunaYear"></span>
			</div>
			<div id="today" class="float_l cur_pointer prepend-h" title="转至今天">
				<span class="text_decoration_udl">返回今天</span>
			</div>
			<div class="float_r margin_left_4 cur_pointer margin_right_10 padding_top_4" onclick="change(1,0);" title="下一年"><img height="14px" src="../images/activeDesk/year-after.png"></div>
			<div class="float_r cur_pointer padding_top_4" onclick="change(0,1);" title="下一月"><img height="14px" src="../images/activeDesk/month-after.png"></div>
			</div>
			<div class="float_l padding_left_10 padding_right_10">
				<table id="dataTable" class="dataTable initMask">
					<tbody>
						<tr>
							<th class="weekend">星期日SUN</th>
							<th>星期一MON</th>
							<th>星期二TUE</th>
							<th>星期三WEN</th>
							<th>星期四THU</th>
							<th>星期五FRI</th>
							<th class="weekend">星期六SAT</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="float_l padding_left_10"><a id="lunaVis" href="#this" onclick ="lunaVis()"></a></div>
			<div class="legend float_r padding_right_10">
				<img src="../images/activeDesk/ydsWork.png" /><span>为调休上班</span>
				<img src="../images/activeDesk/ydsHol.png" /><span>为远东假日</span>
				<img src="../images/activeDesk/sakura.png" /><span>为日本假日</span>
			</div>
		</div>
	</body>
</html>