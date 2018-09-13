<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
       <%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>スーパー初期画面(周倩竹)</title>
<script language="JavaScript" type="text/javascript" src="pj.js"></script>
</head>
<body background=imag\vb.jpg >
<s:form>
<TABLE align=center border=1 CELLSPACING=0 width="560" >

      <tr><td width="540" colspan=4><P ><FONT size=4 ><strong>プロジェクト詳細</strong></FONT></P></td></tr>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト番号</font></TD>
      <TD><font size=2><s:textfield name="projectid_a"  /></font></TD>
      <TD   align=center width="80" ><font size=2 color=97412d>プロジェクト主管者</font></TD>
      <TD><font size=2><s:textfield name="muserid_a" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>予定開始日</font></TD>
      <TD><font size=2><s:textfield name="ystartdate_a" /></font></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>予定終了日</font></TD>
      <TD><font size=2><s:textfield name="Yenddate_a" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>実際開始日</font></TD>
      <TD width="200"><font size=2><s:textfield name="startdate_a" /></font></TD>
      <TD align=center width="80" ><font size=2 color=97412d>実際終了日</font></TD>
      <TD><font size=2><s:textfield name="enddate_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>日本語名称</font></TD>
      <TD colspan=3><font size=2><s:textfield name="prjmei_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>中国語名称</font></TD>
      <TD colspan=3><font size=2><s:textfield name="projecttyuname_a" /></font></TD>

      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>英語名称</font></TD>
      <TD colspan=3><font size=2><s:textfield name="projecteiname_a"/></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>お客さん</font></TD>
      <TD colspan=3><font size=2><s:textfield name="kyakuname_a"/></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center><font size=2 color=97412d>開発環境</font></TD>
      <TD colspan=3><font size=2 ><s:textfield name="pjem_a" style="WIDTH: 200px; HEIGHT: 100PX" /></font></TD>
     
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>プロジェクト概要</font></TD>
 	  <TD  colspan=3 width="450"   ><font size=2><s:textfield name="pjgaiyou_a"/></font></TD>
      </TR>
      <TR>
</TABLE>
<table border=0 align=center>
    <tr>
	 	<td width="540" align="right"> 
	 	<s:submit value="保存" onclick="save1();"></s:submit>
	 	</td>
	</tr>

</table>
</s:form>
<TABLE border=0 CELLSPACING=0  align=center>

<Tr>

<TD>
<p align=center><a href="searchPageAction.action">戻る</a></p>
</TD>
</Tr>
</TABLE>
</body>
</html>