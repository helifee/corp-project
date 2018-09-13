<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>スーパー初期画面(周倩竹)</title>
</head>
<script language="JavaScript" type="text/javascript" src="pj.js"></script>


<body background=imag\vb.jpg>
<s:form action="saveAction" validate="true" >

	<table align=center border=1 CELLSPACING=0 width="560">

		<tr>
			<td width="540" colspan=4>
			<P><FONT size=4><strong>プロジェクトの詳しい情報</strong></FONT></P>
			</td>
		</tr>
		<TR>
			<td align=center width="80">&nbsp;</td>
			<td>
		</TR>
		<tr>
			<TD align=center width="80"><font size=2 color=97412d>プロジェクト番号</font></TD>
			<TD><font size=2><s:textfield name="projectid" /></font></TD>
			<TD align=center width="80"><font size=2 color=97412d>プロジェクトの主管者</font></TD>
			<TD><font size=2><s:select name="selectmusername"
				list="listmuser" listKey="id" listValue="name" emptyOption="false" /></font></TD>
		</tr>

		<tr>
			<TD align=center width="80"><font size=2 color=97412d>初めを予想します</font></TD>
			<TD><font size=2><s:textfield name="ystartdate" /></font></TD>
			<TD align=center width="80"><font size=2 color=97412d>終わると予想します</font></TD>
			<TD><font size=2><s:textfield name="Yenddate" /></font></TD>
		</tr>
		<TR>
			<TD align=center width="80"><font size=2 color=97412d>実際の初め</font></TD>
			<TD width="200"><font size=2><s:textfield
				name="startdate" /></font></TD>
			<TD align=center width="80"><font size=2 color=97412d>実際に終わります</font></TD>
			<TD><font size=2><s:textfield name="enddate" /></font></TD>
		</TR>
		<TR>
			<TD width="80" align=center><font size=2 color=97412d>日本語の名称</font></TD>
			<TD><font size=2><s:textfield name="prjmei" /></font></TD>
		</TR>
		<TR>
			<TD width="80" align=center><font size=2 color=97412d>中国語の名称</font></TD>
			<TD><font size=2><s:textfield name="projecttyuname" /></font></TD>

		</TR>
		<TR>
			<TD width="80" align=center><font size=2 color=97412d>英語の名称</font></TD>
			<TD><font size=2><s:textfield name="projecteiname" /></font></TD>
		</TR>
		<TR>
			<TD width="80" align=center><font size=2 color=97412d>客さん名</font></TD>
			<TD><font size=2><s:textfield name="kyakuname" /></font></TD>
		</TR>
		<TR>
			<TD width="80" align=center><font size=2 color=97412d>開発環境</font></TD>
			<TD><font size=2><s:textfield name="pjem"
				style="WIDTH: 200px; HEIGHT: 100PX" /></font></TD>

		</TR>
		<TR>
			<TD width="80" align=center><font size=2 color=97412d>プロジェクトの概要</font></TD>
			<TD colspan=3 width="450"><font size=2><s:textfield
				name="pjgaiyou" /></font></TD>
		</TR>
		<TR>
			<Td><s:submit value="基本情報登陆"></s:submit></Td>
		</TR>

	</table>
</s:form>

<TABLE border=0 CELLSPACING=0 align=center>

	<Tr>

		<TD>
		<p align=center><a href="searchpjAction.action">返回</a></p>
		</TD>
	</Tr>
</TABLE>


</body>
</html>
