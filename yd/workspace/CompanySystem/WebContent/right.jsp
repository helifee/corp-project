<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="java.util.*" %>
<%@ page import ="com.parameter.UserList" %>
<%@ page import ="com.parameter.UserDeteils" %>

<%@ page import ="parameter.OnlineUserPara" %>
<%@ page import ="com.parameter.ParaManager" %>

<%!UserList userlist=UserList.getInstance(); %>
<jsp:useBean id="usertrace" class="parameter.UserTrace" scope="session"/>
<%

	OnlineUserPara myPara=new OnlineUserPara();
	ParaManager ParaGm =new ParaManager("onlineuser1");
	myPara=(OnlineUserPara)ParaGm.getParameter();
	UserDeteils userid_page=null;
	
	
	userid_page=myPara.getUser();
	
	Enumeration<UserDeteils> elementse=userlist.getList();
	String existflg="false";
	while(elementse.hasMoreElements()){
		UserDeteils name=(UserDeteils)elementse.nextElement();
		if(userid_page==name){		
			existflg="true";
			break;
		}else{	
			existflg="false";
		}
	}
	if(existflg=="false"){

		session.setAttribute("usertrace",usertrace);
		userlist.addUser(usertrace.getUserDeteils());
	}else{
		
	}
	
	
%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script language="JavaScript" type="text/javascript" src="right.js"></script>
</head>
<body background=D:\lhj\backblue.jpg >

 
<h2>オンランリスト</h2>
<center>
<table>

 <textarea rows="22" cols="28"  style="boder:0px dashed black;" disabled>
 <%
 	
	 Enumeration<UserDeteils> elements=userlist.getList();
	 	out.print("ユーザ名  ");
		out.print("ユーザ種類  ");
		out.println("部門");
		out.println("ーーーーーーーーーーーーーーー");
 		while(elements.hasMoreElements()){
 		UserDeteils name=(UserDeteils)elements.nextElement();
 		out.print(name.getUsername_a().trim()+"    ");
 		out.print(name.getUserkindname_a().trim()+"    ");
 		out.println(name.getBusyoname_a().trim());
 	}
 	session.setMaxInactiveInterval(1800);
 %>   
   
</textarea> 

 <tr>
<td colspan=3><s:submit onclick="logout123();" name="logout" value=" 退出 " > </s:submit></td>
</tr> 

</table>
</center>
</body>
</html>
