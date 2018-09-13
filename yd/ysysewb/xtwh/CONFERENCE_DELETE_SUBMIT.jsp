<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<title>
CONFERENCE_DELETE_SUBMIT
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" class="com.ysys.db.RowSet" />
<%
			conference_type.setDbName("UTF8");
			//out.print(request.getParameter("CNFS_ID"));
      request.setCharacterEncoding("UTF-8");
      int PageNo = 1;
      if(request.getParameter("PageNo") != null){
            PageNo = Integer.valueOf(request.getParameter("PageNo")).intValue();
      }
      conference_type.setDbName("UTF8");
      conference_type.setCommand("delete from CONFERENCE_TYPE where CNFS_ID=?");
      conference_type.freeConnection();
      conference_type.setParameter(1,request.getParameter("CNFS_ID"));
      if(conference_type.executeUpdate()>0);
      conference_type.setCommand("SELECT * from CONFERENCE_TYPE");
      conference_type.freeConnection();
      conference_type.executeQuery();
      if(conference_type.getRowCount()==0) {
            response.sendRedirect("CONFERENCE_INSERT.jsp?record=null");
      }
      else{
            if(PageNo <= conference_type.getPageCount()) {
                  response.sendRedirect("CONFERENCE_DVIEW.jsp?PageNo=" + PageNo);
            }
            else{
                  response.sendRedirect("CONFERENCE_DVIEW.jsp?PageNo=" + (PageNo-1));
            }
      }
%>
</body>
</html>
