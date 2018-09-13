<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<meta NAME="GENERATOR" Content="Microsoft Visual Studio 6.0">
<SCRIPT ID=clientEventHandlersJS LANGUAGE=javascript>
<!--
      function frmDelete_onsubmit(){
            if(confirm("确实要删除吗？") == false) {
                  return false;
            }
      }
-->
</SCRIPT>
<title>
CONFERENCE_DVIEW
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" class="com.ysys.db.RowSet" />
<%
      request.setCharacterEncoding("UTF-8");
      String sql = "SELECT * FROM CONFERENCE_TYPE order by CNFS_ID";
      conference_type.setDbName("UTF8");
      conference_type.setCommand(sql);
      conference_type.executeQuery();
      conference_type.freeConnection();
      conference_type.setPageSize(1);
      int PageNo = 1;
      if(request.getParameter("PageNo") != null){
            PageNo = Integer.valueOf(request.getParameter("PageNo")).intValue();
      }
      conference_type.absolutePage(PageNo);
      %>
      <form method=post action="CONFERENCE_DELETE_SUBMIT.jsp?PageNo=<%=PageNo%>&CNFS_ID=<%=conference_type.getString(1)%>" >
      <br>
      <TABLE align=center border=0>
            <tr>
            <td>
            <% if(PageNo==1) {  %>
                  <img border=0 src=images/firstrecd.gif width=30 height=32>
                  <img border=0 src=images/prevrecd.gif width=30 height=32>
            <%}
            else{
            %>
                  <a href="CONFERENCE_DVIEW.jsp?PageNo=1"><img border=0 alt="首页" src="images/firstrec.gif" width=30 height=32></a>
                  <a href="CONFERENCE_DVIEW.jsp?PageNo=<%=(PageNo-1)%>"><img border=0 alt="上一页" src="images/prevrec.gif" width=30 height=32></a>
            <%}
            if (PageNo == conference_type.getPageCount()){  %>
                  <img border=0 src="images/nextrecd.gif" width=30 height=32>
                  <img border=0 src="images/lastrecd.gif" width=30 height=32>
            <%  }
            else{
            %>
                  <a href="CONFERENCE_DVIEW.jsp?PageNo=<%=(PageNo+1)%>"><img border=0 alt="下一页" src="images/nextrec.gif" width=30 height=32></a>
                  <a href="CONFERENCE_DVIEW.jsp?PageNo=<%=conference_type.getPageCount()%>"><img border=0 alt="尾页" src="images/lastrec.gif" width=30 height=32></a>
            <%}%>
                  <a href="CONFERENCE_INSERT.jsp?PageNo=<%=PageNo%>"><img border=0 alt=增加 src=images/addnew.gif width=30 height=32 ></a>
                  <a href="CONFERENCE_UPDATE.jsp?PageNo=<%=PageNo%>&CNFS_ID=<%=conference_type.getString(1)%>"><img border=0 alt=修改 src=images/editrow.gif width=30 height=32 ></a>
                  <input type="image"  src="images/deleterec.gif"  alt="删除" onClick="return frmDelete_onsubmit()">
                  <a href="CONFERENCE_TYPE.jsp"><img border=0 alt=列表 src=images/list.gif width=30 height=32 ></a>
            </tr>
            </td>
      </TABLE>
      <br>
      <TABLE align=center border=0 width=350>
            <tr>
                  <td align=CENTER width=150 > </td>
                  <td align=right width=200> <font  color="#ffffff" size=2>[第<%=conference_type.getCurrentPage()%>页 共<%=conference_type.getPageCount()%>页]</font></td>
            </tr>
            <TR>
                  <td align=CENTER bgcolor=#800000> <font style="ARIAL NARROW" color="#ffffff" size=2>会议室ID</font></td>
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=2><%=conference_type.getString(1)%></font></TD>
            </TR>
            <TR>
                  <td align="CENTER"  bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=2>会议室名称</font></td>
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=2><%=conference_type.getString(2)%></font></TD>
            </TR>
            <TR>
                  <td align="CENTER"  bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=2>容纳人数</font></td>
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=2><%=conference_type.getString(3)%></font></TD>
            </TR>
            <TR>
                  <td align="CENTER"  bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=2>电话</font></td>
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=2><%=conference_type.getString(4)%></font></TD>
            </TR>
            <TR>
                  <td align="CENTER"  bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=2>设备</font></td>
                  <TD style="WIDTH:250;WORD-WRAP:break-word" bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=2><%=conference_type.getString(5)%></font></TD>
            </TR>
      </TABLE>
      </FORM>
</body>
</html>
