<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page  language="java" import="java.text.SimpleDateFormat,java.util.Date"%>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<title>
TLVEINFOINSERTSUBMIT
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" class="com.ysys.db.RowSet" />
<jsp:useBean id="conference_check" class="com.ysys.db.RowSet" />
	
<%
			SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMddHHmmssFFF");
      String str = formatter.format(new Date()).toString();
      
      request.setCharacterEncoding("UTF-8");
      conference_type.setDbName("UTF8");
      conference_type.freeConnection();    
            
      conference_type.setCommand("insert into CONFERENCE_TYPE values(?,?,?,?,?,?)");
      conference_type.setParameter(1,request.getParameter("CNFS_ID"));
      conference_type.setParameter(2,request.getParameter("CNFS_NAME"));
      conference_type.setParameter(3,request.getParameter("MEN_NUM"));
      conference_type.setParameter(4,request.getParameter("CNFS_TEL"));     
      conference_type.setParameter(5,request.getParameter("CNFS_EQP"));
      conference_type.setParameter(6,str);
      
      conference_check.setDbName("UTF8");
      conference_check.freeConnection();
      conference_check.setCommand("select * from CONFERENCE_TYPE where CNFS_ID='"+request.getParameter("CNFS_ID")+"'");
      conference_check.executeQuery();
      if (conference_check.getRowCount()>0){
      		out.println("<script language = javascript>alert('您要添加的会议室ID已经存在。');"); 
					out.println("location.href='CONFERENCE_TYPE.jsp'</script>");
      }
    	else{
      	if(conference_type.executeUpdate()>0);
      	conference_type.setCommand("select * from CONFERENCE_TYPE");
      	conference_type.freeConnection();
      	conference_type.executeQuery();
					
      	if(request.getParameter("flag")!= null){
            if(conference_type.getRowCount()%15==0) {
                 response.sendRedirect("CONFERENCE_TYPE.jsp?PageID=" + (conference_type.getRowCount()/15));
            }
            else
            {    response.sendRedirect("CONFERENCE_TYPE.jsp?PageID=" + (conference_type.getRowCount()/15+1));
            }
      	}
      	else{
            response.sendRedirect("CONFERENCE_DVIEW.jsp?PageNo=" + conference_type.getRowCount());
      	}
    }
%>
</body>
</html>
