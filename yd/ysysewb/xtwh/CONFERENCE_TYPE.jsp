<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<title>
conference_type
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" class="com.ysys.db.RowSet" />
	
<%
  String sql = "SELECT * FROM CONFERENCE_TYPE order by CNFS_ID";
  conference_type.setDbName("UTF8");
  conference_type.setCommand(sql);
  conference_type.executeQuery();
  conference_type.freeConnection();   
  
  if(conference_type.getRowCount()==0){
  
				response.sendRedirect("CONFERENCE_INSERT.jsp?record=null");
        
  }
  else{

          if(conference_type.getRowCount()<=15){
                conference_type.setPageSize(conference_type.getRowCount());
          }
          else{
                conference_type.setPageSize(15);
          }
          int PageID = 1;
          if(request.getParameter("PageID") != null){
                  PageID = Integer.valueOf(request.getParameter("PageID")).intValue();
          }
          conference_type.absolutePage(PageID);
          %>
          <br>
          <TABLE align=center border=0>
          <tr>
                <td>
                <% if(PageID==1) {  %>
                      <img border=0 src=images/firstrecd.gif width=30 height=32>
                      <img border=0 src=images/prevrecd.gif width=30 height=32>
                <%}
                else{
                %>
                      <a href="CONFERENCE_TYPE.jsp?PageID=1"><img border=0 alt=首页 src=images/firstrec.gif width=30 height=32></a>
                      <a href="CONFERENCE_TYPE.jsp?PageID=<%=(PageID - 1)%>"><img border=0 alt=上一页 src=images/prevrec.gif width=30 height=32></a>
                <%}
                if (PageID == conference_type.getPageCount()){
                %>
                      <img border=0 src=images/nextrecd.gif width=30 height=32>
                      <img border=0 src=images/lastrecd.gif width=30 height=32>
                <% }
                else{
                %>
                      <a href="CONFERENCE_TYPE.jsp?PageID=<%=(PageID + 1)%>"><img border=0 alt=下一页 src=images/nextrec.gif width=30 height=32></a>
                      <a href="CONFERENCE_TYPE.jsp?PageID=<%=conference_type.getPageCount()%>"><img border=0 alt=尾页 src=images/lastrec.gif width=30 height=32></a>
                <% }   %>
                      <a href="CONFERENCE_INSERT.jsp?flag=list&PageID=<%=PageID%>"><img border=0 alt=增加 src=images/addnew.gif width=30 height=32 ></a>
                      <a href="CONFERENCE_DVIEW.jsp?PageID=<%=PageID%>"><img border=0 alt=详细 src=images/detail.gif width=30 height=32 ></a>
                </td>
          </tr>
          </TABLE>
          <TABLE align=center border=0 width=650>          
          <tr>
          			<td align="right" >
          			<form action="CONFERENCE_UPLOAD.jsp" name=frmUpLoad id=frmUpLoad method=post enctype="multipart/form-data">	
          			<font color ="#ffffff" size=3u>位置图</font>
          			<input type="file" name="upfile" size="20"> <INPUT type="submit" style="width:50px;height:21px" name="Submit" value="上传" >
          			</td>  			
        	</tr>		
          </TABLE>
          </form>		
          <TABLE align=center border=0 width=650>
                <font color="#ffffff" size=2>[第<%=conference_type.getCurrentPage()%>页 共<%=conference_type.getPageCount()%>页]</font>
                <tr>
                      <td align=CENTER width=100 bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size="2">会议室ID</font></td>
                      <td align=CENTER width=150 bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size="2">会议室名称</font></td>
                      <td align=CENTER width=100 bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size="2">容纳人数</font></td>
                      <td align=CENTER width=50 bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size="2">电话</font></td>
                      <td align=CENTER width=250 bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size="2">设备</font></td>                   
                </tr>
                <% for(int j = 1;j <= conference_type.getPageSize(); j++){   %>
                      <tr>
                            <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW"  size="2"><a href="CONFERENCE_DVIEW.jsp?PageNo=<%=conference_type.getCurrentRow()%>"><%=conference_type.getString(1)%></A></font></TD>
                            <TD style="WIDTH:150;WORD-WRAP:break-word;overflow:hidden;" bgcolor=f7efde align=LEFT><font style="ARIAL NARROW"  size="2"><%=conference_type.getString(2)%></font></TD>
                            <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW"  size="2"><%=conference_type.getString(3)%></font></TD>
                            <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW"  size="2"><%=conference_type.getString(4)%></font></TD>
                            <TD style="WIDTH:250;WORD-WRAP:break-word;overflow:hidden;" bgcolor=f7efde align=LEFT><font style="ARIAL NARROW"  size="2"><%=conference_type.getString(5)%></font></TD>
                            <!-- <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW"  size="2"><%=conference_type.getString(6)%></font></TD>-->
                      </tr>
                <%
                      if (conference_type.isLast()){
                            break;
                      }
                      conference_type.next();
                }
                %>
          </TABLE>
  <% } %>
</body>
</html>

