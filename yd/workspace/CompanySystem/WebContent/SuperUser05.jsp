<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>スーパー初期画面(周倩竹)</title>
<style type="text/css"> .errorMessage {color: red; }</style>
</head>
<script language="JavaScript" type="text/javascript" src="pj.js"></script>
<sx:head />

<body background=imag\vb.jpg>
<s:form action="SuperUser05Action" validate="true" theme="xhtml">

	<table align=center border=1 CELLSPACING=0 width="560">

		<tr>
			<td width="540" colspan=4>
			<P><FONT size=4 ><strong>プロジェクトの詳しい情報</strong></FONT></P>
			</td>
		</tr>
		<TR>
			<td align=center width="80">&nbsp;</td>
			<td>
		</TR>
		<tr>
			<TD><font size=2 ><s:textfield
				name="projectid" label="プロジェクト番号" /></font></TD>
			<TD><font size=2><s:select name="selectmusername"
				list="listmuser" listKey="id" listValue="name" emptyOption="false"
				label="プロジェクト主管者" /></font></TD>
		</tr>

		<tr>
			<TD><font size=2 color=97412d><sx:datetimepicker
				name="ystartdate" label="予定開始日" value="" displayFormat="yyyyMMdd" /></font></TD>
			<TD><font size=2 color=97412d><sx:datetimepicker
				name="yenddate" label="予定終了日" value="" displayFormat="yyyyMMdd"/></font></TD>
		</tr>
		<TR>
			<TD width="200"><font size=2><sx:datetimepicker
				name="startdate" label="実際開始日" value="" displayFormat="yyyyMMdd"/></font></TD>
			<TD><font size=2><sx:datetimepicker name="enddate"
				label="実際終了日" value="" displayFormat="yyyyMMdd"/></font></TD>
		</TR>
		<TR>
			<TD><font size=2><s:textfield name="prjmei"
				label="日本語名称" label="日本語名称" /></font></TD>
		</TR>
		<TR>

			<TD><font size=2><s:textfield name="projecttyuname"
				label="中国語名称" label="中国語名称" /></font></TD>

		</TR>
		<TR>
			<TD><font size=2><s:textfield name="projecteiname"
				label="英語名称" label="英語名称" /></font></TD>
		</TR>
		<TR>

			<TD><font size=2><s:textfield name="kyakuname"
				label="お客さん" /></font></TD>
		</TR>
		<TR>

			<TD><font size=2><s:textfield name="pjem"
				style="WIDTH: 200px; HEIGHT: 100PX" label="開発環境" /></font></TD>

		</TR>
		<TR>
			<TD colspan=3 width="450"><font size=2><s:textfield
				name="pjgaiyou" label="プロジェクト概要" /></font></TD>
		</TR>
		
		<TR>
			<Td><s:submit value="基本情報登陆"></s:submit></Td>
		
			
		</TR>

	</table>
</s:form>

<TABLE border=0 CELLSPACING=0 align=center>

	<Tr>

		<TD>
		<p align=center><a href="searchPageAction.action">戻る</a></p>
		</TD>
	</Tr>
</TABLE>


</body>
</html>
