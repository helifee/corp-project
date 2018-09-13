<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script language="JavaScript" type="text/javascript" src="pj.js"></script>
<title>スーパー初期画面(周倩竹)</title>
</head>
<body background=imag\vb.jpg >
<form >
<TABLE align=center border=1 CELLSPACING=0 width="560" >
      <tr><td width="540" colspan=4><P ><FONT size=4 ><strong>プロジェクト詳細</strong></FONT></P></td></tr>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト番号</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="projectid_a" /></font></TD>
      <TD   align=center width="80" ><font size=2 color=97412d>プロジェクト主管者</font></TD>
      <TD   align=center width="200"><font size=2><s:property value="muserid_a" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>予定開始日</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="ystartdate_a" /></font></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>予定終了日</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="Yenddate_a" /></font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>実際開始日</font></TD>
      <TD align=center width="200"><font size=2><s:property value="startdate_a" /></font></TD>
      <TD align=center width="80" ><font size=2 color=97412d>実際終了日</font></TD>
      <TD  align=center width="200"><font size=2><s:property value="enddate_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>日本語名称</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="prjmei_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>中国語名称</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="projecttyuname_a" /></font></TD>

      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>英語名称</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="projecteiname_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>お客さん</font></TD>
      <TD  colspan=3 width="450"   ><font size=2><s:property value="kyakuname_a" /></font></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>開発環境</font></TD>

      <TD  colspan=3 width="450"   >
      	<textarea rows="8" cols="50" name="message"><s:property value="pjem_a" /></textarea>
      </TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>プロジェクト概要</font></TD>
 	  <TD  colspan=3 width="450"   ><font size=2><s:property value="pjgaiyou_a" /></font></TD>
      </TR>
      <TR>
</TABLE>

<table>
<tr>
	
	 <td width=750 colspan=9  align="right">
	 	<s:submit name="submit" value="消除" onclick="delect();"></s:submit>
	 </td>

</tr>
</table>
</form>
<p align=center><a href="javascript:history.back(1)">戻る</a></p>

	 
</body>
</html>