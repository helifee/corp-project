
<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
   response.setHeader("Content-disposition","inline; filename=test3.xls");
   //以上这行设定传送到前端浏览器时的档名为test1.xls
   //就是靠这一行，让前端浏览器以为接收到一个excel档 
%>

<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=UTF-8">

<title>管理者初期画面（張瑜）</title>
</head>
<body>
<TABLE id="tableEXCEL" align=center border=1 CELLSPACING=0 width="560">
      <tr><td width="540" colspan=4><P ><FONT size=4 ><strong>项目详细信息</strong></FONT></P></td></tr>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>プロジェクト番号</font></TD>
      <TD align=center width="200"> <s:property value="projectid_d"/></TD>
      <TD  align=center width="80" ><font size=2 color=97412d> 所属部門</font></TD>
      <TD  align=center width="200"><s:property value="busyoidname_d"/></TD>
      </TR>
      <TR>
      <TD   align=center width="80" ><font size=2 color=97412d>プロジェクトの主管者</font></TD>
      <TD   align=center width="200"><s:property value="username_d"/></TD>
      <TD   align=center width="80" height="20" ><font size=2 color=97412d>副主管者</font></TD>


      <TD align=center width="200"><font size=2>&nbsp;</font></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>初めを予想します</font></TD>
      <TD  align=center width="200"><s:property value="ystartdate_d"/></TD>
      <TD  align=center width="80" ><font size=2 color=97412d>終わると予想します</font></TD>
      <TD  align=center width="200"><s:property value="yenddate_d"/></TD>
      </TR>
      <TR>
      <TD  align=center width="80" ><font size=2 color=97412d>実際の初め</font></TD>
      <TD align=center width="200"><s:property value="startdate_d"/></TD>
      <TD align=center width="80" ><font size=2 color=97412d>実際に終わります</font></TD>
      <TD  align=center width="200"><s:property value="enddate_d"/></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>日本語の名称</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="prjmei_d"/></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>中国語の名称</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="projecttyuname_d"/></TD>

      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>英語の名称</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="projecteiname_d"/></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>客さん名</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="kyakuname_d"/></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>客户负责</font></TD>
      <TD  colspan=3 width="450"   ><s:property value="projecttyuname_d"/></TD>
      </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>開発環境</font></TD>

      <TD  colspan=3 width="450"   ><s:property value="pjem_d"/></TD>
  </TR>
      <TR>
      <TD  width="80" align=center ><font size=2 color=97412d>プロジェクトの概要</font></TD>

     <TD   colspan=3 width="450"  ><font size=2 face=宋体 >
	     <TABLE align=center border=0 CELLSPACING=0 width=445>
	     <tr><td width=440><s:property value="pjgaiyou_d"/>
	     </td>
	     </tr>
	     </table></font>
     </TD>
    </TR>
  
</TABLE>
</body>
</html>