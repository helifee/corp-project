<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>

<title>
HYSYL_FRAME
</title>
</head>
<jsp:useBean id="work" class="com.ysys.db.RowSet" />
<%	
HttpSession hs=request.getSession(true);
if(hs.getAttribute("use_id") ==null){
      response.sendRedirect("../login/LOGOUT.jsp");
}else{
			%>
      <frameset rows="200px,*" name="mainFrame" frameborder="NO" framespacing = 0>
      	<% if (request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""){
      	%>
      	 <frame name="topFrame"  noresize src="HYSYL_TOP_QRY.jsp?YyDate=<%=request.getParameter("YyDate")%>">
      	 <frame name="botFrame"  noresize src="HYSYL_BOT_VIEW.jsp?YyDate=<%=request.getParameter("YyDate")%>">
      	<%
      		}else{
      	%>
					<frame name="topFrame"  noresize src="HYSYL_TOP_QRY.jsp">
					<frame name="botFrame"  noresize src="HYSYL_BOT_VIEW.jsp">
				<%}%>
      	  
      	</frameset>
<%}%>
</html>
