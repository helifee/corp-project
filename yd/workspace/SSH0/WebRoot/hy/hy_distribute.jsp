<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<jsp:include page="/hy/logincheck.jsp" />
<html>
<head>
<title>会议室详细信息</title>
<link href="css/generdistribute.css" rel="stylesheet" type="text/css">
<sx:head debug="true" />
<script language="JavaScript" type="text/javascript"
	src="js/applicationDistribute.js"></script>

</head>

<body bgcolor="#ecf6ff" >
<s:include value="../common/topmenu.jsp" />
<table width="972"  border="0" align="center"
	cellpadding="0" cellspacing="0">
	<tr>
		<td width="44" height="72"></td>
		<td width="884" align="center"><font size="5" color="green"><strong>会议室分布</strong></font></td>
		<td width="44"></td>
	</tr>
	<tr>
		<td height="173" align="center"></td>
		<td align="center">
		<table width="884" border="0" cellpadding="2" cellspacing="2"
			rules="all">
			<tr>
				<td width="50"></td>
				<td width="784" align="center"><font size="4" color="#6c95d0"><strong>会议室分布图</strong></font></td>
				<td width="50"></td>
			</tr>
			<tr>
				<td></td>
				<td align="center"><font size="4" color="#6c95d0">*点击会议室返回上一个画面。</font>
				</td>
				<td align="right">
				<s:if	test="quanxian <= 31 || quanxian == 99 ">
					<s:a href="#" onclick="distributeUpdateAction();">变更</s:a>
				</s:if>
				</td>
			</tr>
		</table>
		<div id="juedui" style="position: relative;"><img
			src="images/conference_map.jpg"> <s:if
			test="divMessagelist.size > 0">
			<s:iterator value="divMessagelist">
				<div id="layer<s:property value="hysid"/>"
					onmouseover="show('<s:property value="hysid"/>' );"
					onmouseout="hide('<s:property value="hysid"/>' );"
					style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:<s:property value="divWidth" />px;  height:<s:property value="divHeigth" />px;  left: <s:property value="imageFromX" />px;   top: <s:property value="imageFromY" />px; "
					onclick="hysYySummit('<s:property value="hysid"/>' , '<s:property value="conferensituationId" />' , '<s:property value="pageId"  />' , '<s:property value="startDate"/>' , '<s:property value="endDate"/>' , '<s:property value="radiobutton"/>' , '<s:property value="yyDate"/>' );"><span
					class='edge003'></span><span class='container003'><font
					size="5"><s:property value="hysid" /></font></span></div>
			</s:iterator>
		</s:if></div>
		</td>
		<td align="center"></td>
	</tr>
	<tr>
		<td height="227" colspan="3" align="center"><s:form
			theme="simple" method="post">
			<br />
			<div align="center"><font size="4" color="#6c95d0"><strong>会议室信息</strong></font></div>
			<table width="896" border="0" cellpadding="2" cellspacing="1"
				rules="none">
				<tr bgcolor="#6c95d0" align="center">
					<td width="30"><font color="#FFFFFF" size="2">ID</font></td>
					<td width="150"><font color="#FFFFFF" size="2">会议室名</font></td>
					<td width="70"><font color="#FFFFFF" size="2">容纳人数</font></td>
					<td width="100"><font color="#FFFFFF" size="2">网线接口数量</font></td>
					<td width="40"><font color="#FFFFFF" size="2">电话</font></td>
					<td><font color="#FFFFFF" size="2">设备设备</font></td>
				</tr>
			</table>
			<div
				style="OVERFLOW-Y: scroll; WIDTH: 884; HEIGHT: 250px; background-color: #CEE8FF"
				align="center">
			<table width="878" style="BORDER-COLLAPSE: collapse" cellpadding="1"
				cellspacing="1">
				<s:if test="distributes.size > 0">
					<s:iterator value="distributes" id="dis">
						<tr>
							<td align="center">
							<table width="878" border="0"
								id="xianshiTable<s:property value="id"/>" cellpadding="1"
								cellspacing="1" rules="none">
								<tr bgcolor="#ffffd9"
									onmouseover="showTable('<s:property value="id"/>')"
									onmouseout="hideTable('<s:property value="id"/>' )"
									onclick="hysYySummit('<s:property value="id" />'  , '<s:property value="conferensituationId" />' , '<s:property value="pageId"  />' , '<s:property value="startDate"/>' , '<s:property value="endDate"/>' , '<s:property value="radiobutton"/>' , '<s:property value="yyDate"/>' );">
									<td width="31" align="center"><font size="2"><s:property
										value="id" /></font></td>
									<td width="152"><font size="2"><s:property
										value="hysmc" /></font></td>
									<td width="72" align="right"><font size="2"><s:property
										value="rnrs" /></font></td>
									<td width="102" align="right"><font size="2"><s:property
										value="wxjk" /></font></td>
									<td width="42" align="center"><font size="2"><s:property
										value="dh" /></font></td>
									<td><font size="2"><s:property value="sb" /></font></td>
								</tr>
							</table>
							</td>
						</tr>
					</s:iterator>
				</s:if>

			</table>
			</div>
		</s:form></td>
		<td></td>
		<td></td>
	</tr>
	<tr></tr>
</table>
</body>
</html>
