<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java"
	import="java.text.SimpleDateFormat,java.util.Date"%>
<html>

<head>
<title>会议室预约一览画面</title>
<link rel="stylesheet" type="text/css" href="css/_decoration-col.css" />

</head>

<body bgcolor="#ecf6ff" topmargin="10" leftmargin="10">
<script language="JavaScript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js"></script>
<script language="JavaScript" type="text/javascript" src="js/_date.js"></script>
<br>
<p align="center"><font size="4" COLOR="green"><strong>会议室预约情况一览</strong></font></p>
<form method="post" id="hysyl" action="conferenceinit">

<table width="497" border="0" align="center" cellpadding="10"
	cellspacing="0" style="WIDTH: 500">
	<tr>
		<td align="center" WIDTH="129"><input type="submit"
			id="before_DATE" value="<< 前日" onClick="return before()"
			style="width: 60px"></td>
		<td align="right" WIDTH="58"><font color="#000000" size="3"><strong>日
		期</strong></font></td>

		<td align="left" WIDTH="100"><s:textfield id="yyDate"
			cssStyle="WIDTH: 100px; HEIGHT: 22px" onchange="submit()"
			name="yyDate" maxLength="10"
			onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false})"
			theme="simple" readonly="true"></s:textfield></td>

		<td align="center" WIDTH="133"><input type="submit"
			id="after_DATE" value="后日 >>" onClick="return after()"
			style="width: 60px"></td>
	</tr>

	<tr>
		<td align="center" WIDTH="129"><s:url action="hystatistics"
			id="statisticsUrl" /> <s:a href="%{statisticsUrl}">
			<FONT face="宋体" size="2"></FONT>预约统计</s:a></td>
		<td></td>
		<td align="left" WIDTH="100"><s:url action="hygroupmanage"
			id="groupmanageUrl" /> <s:a href="%{groupmanageUrl}">
			<FONT face="宋体" size="2"></FONT>组管理</s:a></td>
		<td align="center" WIDTH="133"><s:url action="distributeaction"
			id="distributeUrl" /> <s:a href="%{distributeUrl}">
			<FONT face="宋体" size="2"></FONT>会议室分布</s:a></td>
	</tr>
</table>
<table width="1314px" border="0px" cellpadding="0" cellspacing="0">
	<tr>
		<td style="WIDTH: 55px;"></td>
		<%
			for (int i = 8; i <= 22; i++) {
				if (i < 10) {
		%><td align="center" style="width: 80px"><FONT face="宋体" size="3"></FONT>0<%=i + ":00"%></td>
		<%
			} else {
		%><td align="center" style="width: 80px"><FONT face="宋体" size="3"><%=i + ":00"%></FONT></td>
		<%
			}
			}
		%>
	</tr>
</table>

<table style="margin-top: 0px;" height="10px" width="1271px"
	border="1px" cellpadding="0" cellspacing="0" rules="cols" frame="rhs"
	class="table_bk">
	<tr>
		<td style="WIDTH: 101px;"></td>
		<%
			for (int i = 0; i <= 27; i++) {

				if ((i % 2) == 0) {
		%>
		<td align="center" style="width: 42px;"></td>
		<%
			} else {
		%>
		<td align="center" style="width: 41px; border: 1px"></td>
		<%
			}

			}
		%>
	</tr>
	<tr>
		<td style="WIDTH: 101px;"></td>
		<%
			for (int i = 0; i <= 27; i++) {
		%>
		<td align="center" style="width: 42px"></td>
		<%
			}
		%>
	</tr>
</table>
<table style="height: 10px" border="0">

</table>
<table id="tb" style="width: 1276px; margin-top: -8px;" cellpadding="0"
	cellspacing="5" border="0">
	<s:if test="hysinfo.size > 0">
		<s:iterator value="hysinfo" id="hyif">
			<tr>
				<s:if test="#hyif.hysysflg == 1">
					<td style="WIDTH: 85px;" bgcolor="#DE7594" align="center"><s:url
						action="conferensituation" id="situationUrl">
						<s:param name="conferensituationId" value="%{#hyif.hysid}"></s:param>
						<s:param name="startDate" value="%{cdri}"></s:param>
						<s:param name="endDate" value="%{cdri}"></s:param>
						<s:param name="radiobutton" value="'rq'"></s:param>
					</s:url> <s:a href="%{situationUrl}">
						<s:property value="hysmc" />
					</s:a></td>
				</s:if>
				<s:else>
					<td style="WIDTH: 85px;" align="center"><s:url
						action="conferensituation" id="situationUrl">
						<s:param name="conferensituationId" value="%{#hyif.hysid}"></s:param>
						<s:param name="startDate" value="%{cdri}"></s:param>
						<s:param name="endDate" value="%{cdri}"></s:param>
						<s:param name="radiobutton" value="'rq'"></s:param>
					</s:url> <s:a href="%{situationUrl}">
						<s:property value="hysmc" />
					</s:a></td>
				</s:else>

				<td>
				<table id="tb" cellpadding="0" cellspacing="0" border="1px"
					width="1176px" class="tb_font">
					<tr height="35px" style="word-break: break-all">
						<s:if test="hyslist.size > 0">
							<s:iterator value="hyslist" id="hylt">
								<s:if test="#hylt.cgnowtimeflg==1">
									<s:if test="#hylt.haverenflg == 0">
										<td align="center" bgcolor="#f7efde"
											style="width:<s:property value="#hylt.hyslength" />px">&nbsp;</td>
									</s:if>
								</s:if>
								<s:else>
									<s:if test="#hylt.haverenflg == 0">
										<td align="center" bgcolor="#f7efde"
											style="width:<s:property value="#hylt.hyslength" />px">
										<s:url action="yuyue" id="reserveUrl">
											<s:param name="yuyueinfo.startdate" value="%{cdri}"></s:param>
											<s:param name="yuyueinfo.start_hour"
												value="%{#hylt.starthhTime}"></s:param>
											<s:param name="yuyueinfo.start_minute"
												value="%{#hylt.startmmTime}"></s:param>
											<s:param name="yuyueinfo.end_hour" value="%{#hylt.endhhTime}"></s:param>
											<s:param name="yuyueinfo.end_minute"
												value="%{#hylt.endmmTime}"></s:param>
											<s:param name="yuyueinfo.hys" value="%{#hyif.hysid}"></s:param>
										</s:url> <s:a href="%{reserveUrl}">
											预约</s:a></td>
									</s:if>
									<s:elseif test="#hylt.haverenflg == 1">
										<td align="center" bgcolor="#CCFFCC"
											style="width:<s:property value="#hylt.hyslength" />px">
										<s:if test="#hylt.sqridflg==1">
											<s:url action="yuyueModifyInit" id="xgreserveUrl">
												<s:param name="yuyueinfo.startdate" value="%{cdri}"></s:param>
												<s:param name="yuyueinfo.start_hour"
													value="%{#hylt.starthhTime}"></s:param>
												<s:param name="yuyueinfo.start_minute"
													value="%{#hylt.startmmTime}"></s:param>
												<s:param name="yuyueinfo.hys" value="%{#hyif.hysid}"></s:param>
											</s:url>
											<s:a href="%{xgreserveUrl}">
												<s:property value="#hylt.sqrName" />
												<br>
												(<s:property value="#hylt.cjrs" />)
											</s:a>
										</s:if> <s:else>
											<s:property value="#hylt.sqrName" />
											<br>
											(<s:property value="#hylt.cjrs" />)
										</s:else></td>
									</s:elseif>
								</s:else>
							</s:iterator>
						</s:if>
					</tr>
				</table>
				</td>
			</tr>
		</s:iterator>
	</s:if>
</table>
<br>
</form>
<style>
.table_bk table {
	border: 1px;
	border-collapse: collapse;
}

.tb_font {
	font-family: 宋体;
	font-size: 12px;
	font-style: normal;
	font-weight: normal;
	text-transform: none;
}
</style>
</body>
</html>
