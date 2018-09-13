<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page  language="java" import="java.text.SimpleDateFormat,java.util.Date"%>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<title>
TLVEINFOUPDATESUBMIT
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" scope="session" class="com.ysys.db.RowSet"/>
<jsp:useBean id="date_check" scope="session" class="com.ysys.db.RowSet"/>	
<%
			SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMddHHmmssSSS");
      String str = formatter.format(new Date()).toString();
      
      request.setCharacterEncoding("UTF-8");
      conference_type.setDbName("UTF8");
      conference_type.setCommand("update CONFERENCE_TYPE set CNFS_NAME=?,MEN_NUM=?,CNFS_TEL=?,CNFS_EQMT=?,CNFS_DATE=? WHERE CNFS_ID='"+request.getParameter("CNFS_ID")+"'");
      conference_type.freeConnection();
      conference_type.setParameter(1,request.getParameter("CNFS_NAME"));
      conference_type.setParameter(2,request.getParameter("MEN_NUM"));
      conference_type.setParameter(3,request.getParameter("CNFS_TEL"));
      conference_type.setParameter(4,request.getParameter("CNFS_EQP"));
      conference_type.setParameter(5,str);
      String date1 = conference_type.getString("CNFS_DATE");
           
      date_check.setDbName("UTF8");
      date_check.setCommand("SELECT * FROM CONFERENCE_TYPE  WHERE CNFS_ID='"+request.getParameter("CNFS_ID")+"'");
      date_check.freeConnection();
      date_check.executeQuery();
      if (date_check.getRowCount()==0){
      		out.println("<script language = javascript>alert('您要修改的会议室已经被删除。');"); 
					out.println("location.href='CONFERENCE_TYPE.jsp'</script>");
      }
    	else{    	
      	date_check.next();
      	String date2 = date_check.getString("CNFS_DATE");      
      	if(date1.equals(date2)){
      			if(conference_type.executeUpdate()>0);
      			int PageNo = 1;
      			if(request.getParameter("PageNo") != null){
            		PageNo = Integer.valueOf(request.getParameter("PageNo")).intValue();
      			}
      					response.sendRedirect("CONFERENCE_DVIEW.jsp?PageNo=" + PageNo);      				
      	}						
      	else{
     				out.println("<script language = javascript>alert('您要修改的数据已经被别人修改过，请重新修改。');"); 
						out.println("location.href='CONFERENCE_DVIEW.jsp?PageNo=1'</script>"); 
     		}
     	}		
     				
%>
</body>
</html>
