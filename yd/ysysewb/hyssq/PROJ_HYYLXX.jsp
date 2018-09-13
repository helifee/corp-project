<%/**
 * 概要： 会议室详细一览信息
 * 版数      日付          担当      内容
 * V2.0   2009.2.18     苑金玲   新規作成
 */
%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<jsp:useBean id="HYSNAME" class="com.ysys.db.RowSet"/>
<jsp:useBean id="HYS_XX" class="com.ysys.db.RowSet"/>
<jsp:useBean id="HYS_SQR" class="com.ysys.db.RowSet"/>
<HTML>
<HEAD> 
	  <TITLE>会议室详细一览</TITLE>
</HEAD>
<base target="_self"> 
<link rel="stylesheet" type="text/css" media="all" href="calendar/calendar-blue.css"/>
<!-- import the calendar script -->
<script type="text/javascript" src="calendar/calendar.js"></script>
<!-- import the language module -->
<script type="text/javascript" src="calendar/calendar-en.js"></script>
 <!-- the following script defines the Calendar.setup helper function, which makes
       adding a calendar a matter of 1 or 2 lines of code. -->
<script type="text/javascript" src="calendar/calendar-setup.js"></script>
	<script  LANGUAGE=javascript >
		//前日的实现
	  function previous(){	
        var   d1   =   document.getElementById("YY_DATE").value;    
        execScript('dim   n   :   n   =   DateAdd("d",-1,   "'+   d1   +'")','vbscript');   
        var   d   =   new   Date(n);  
        if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10 && d.getDate()>0 && d.getDate()<10){
        var Date1=d.getFullYear()   +   "-0"   +   (d.getMonth()   +   1)   +   "-0"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
        if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10 && d.getDate()>9){
        var Date1=d.getFullYear()   +   "-0"   +   (d.getMonth()   +   1)   +   "-"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
        if ((d.getMonth()+1)>9 && d.getDate()>0 && d.getDate()<10){
        var Date1=d.getFullYear()   +   "-"   +   (d.getMonth()   +   1)   +   "-0"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
        if ((d.getMonth()+1)>9 && d.getDate()>9){
        var Date1=d.getFullYear()   +   "-"   +   (d.getMonth()   +   1)   +   "-"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
      }
    //次日的实现
		function next(){							 
        var   d1   =   document.getElementById("YY_DATE").value;    
        execScript('dim   n   :   n   =   DateAdd("d", 1,   "'+   d1   +'")','vbscript');   
        var   d   =   new   Date(n);  
        if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10 && d.getDate()>0 && d.getDate()<10){
        var Date1=d.getFullYear()   +   "-0"   +   (d.getMonth()   +   1)   +   "-0"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
        if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10 && d.getDate()>9){
        var Date1=d.getFullYear()   +   "-0"   +   (d.getMonth()   +   1)   +   "-"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
        if ((d.getMonth()+1)>9 && d.getDate()>0 && d.getDate()<10){
        var Date1=d.getFullYear()   +   "-"   +   (d.getMonth()   +   1)   +   "-0"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }
        if ((d.getMonth()+1)>9 && d.getDate()>9){
        var Date1=d.getFullYear()   +   "-"   +   (d.getMonth()   +   1)   +   "-"   +   d.getDate(); 
        document.getElementById("YY_DATE").value=Date1;
        }	
       }       				  	  
</script>
<BODY align="center" bgcolor="#ffffff">
	<br/>
<%
      request.setCharacterEncoding("UTF-8");
      HYSNAME.setDbName("UTF8");
      //在数据库中查找会议室名字
      HYSNAME.setCommand("SELECT CNFS_NAME FROM CONFERENCE_TYPE WHERE CNFS_ID='" + request.getParameter("HYS_ID") + "'");
      HYSNAME.executeQuery();
      HYSNAME.freeConnection();
      if(HYSNAME.next()){
      //显示会议室名字;
%>
	<p align=center><font size=5 COLOR=green><strong><%=HYSNAME.getString(1)%>预约情况</strong></font></p>
<%
          }else{
%>
<p align=center><font size=5 COLOR=green><strong><strong><%=request.getParameter("HYS_ID")%>预约情况</strong></FONT></p>
<%
          	}        	
	HYSNAME.close();
%>
<form action="PROJ_HYYLXX.jsp" method=post >
	<br/>
  <table align="center" border="0px" style=" margin-top:-20px;width: 600px;">
     <tr>
     	  <td align="right" width=160><input type="Submit" style="WIDTH: 60px; HEIGHT: 24px" value="<<前日" onClick="previous()"></td>  
        <td  width=180 align="center"><font color="#000000" size="3"><strong>日 期</strong></font>   
      	<input type="text" readOnly="true" id=YY_DATE name=YY_DATE style="WIDTH: 100px; HEIGHT: 22px" maxlength=10 value=<%=request.getParameter("YY_DATE")%> " onchange="submit()">
      	</td>      
      	<input type="hidden" id=HYS_ID name=HYS_ID value=<%=request.getParameter("HYS_ID")%>>
        <script type="text/javascript">
     		Calendar.setup({
        		inputField     :    "YY_DATE",   // id of the input field
        		ifFormat       :    "%Y-%m-%d"
    		});
        </script>  
        <td align="left" width=95><input type="Submit" style="WIDTH: 60px; HEIGHT: 24px" value="次日>>" onClick="next()"></td>  
       </tr>               	
   </table>
</form>
<table align="center" border="1px" style=" margin-top:0px;WIDTH: 600px" bgcolor="f7efde" bordercolor="black">      
<tr>

      <td align=CENTER width=150 bgcolor="#800000"><font color="#ffffff" size="2">时间</font></td>

      <td align=CENTER width=80 bgcolor="#800000"><font color="#ffffff" size="2">申请人</font></td>

      <td align=CENTER width=100 bgcolor="#800000"><font color="#ffffff" size="2">参加人数</font></td>

      <td align=CENTER width=190 bgcolor="#800000"><font color="#ffffff" size="2">会议主题</font></td>
<%
     HYS_XX.setDbName("UTF8");
      //在数据库中查找选中会议室的预约详细信息
      HYS_XX.setCommand("SELECT * FROM TAB_HYSSQ WHERE HYSID = '"+request.getParameter("HYS_ID")+ "'AND YY_DATE='"+request.getParameter("YY_DATE")+"' ORDER BY START_TIME");
      HYS_XX.executeQuery();
      HYS_XX.freeConnection();
      while(HYS_XX.next()){
      //显示会议室信息;
%>
<tr>
<%   
      String fromdate1 = HYS_XX.getString(3); 
      String fromdate = fromdate1.substring(0,5);
      String enddate2 =  HYS_XX.getString(4); 
      String enddate = enddate2.substring(0,5);     
%>
            <td align=CENTER width=150 bgcolor="f7efde"><font size="2"><%=fromdate%>~<%=enddate%></font></td>
		  <%
		      HYS_SQR.setDbName("UTF8");
		      //在数据库中查找会议室申请人名字
		      HYS_SQR.setCommand("SELECT EMP_NAME FROM TEMPINFO WHERE EMP_ID='"+HYS_XX.getString(2)+"'");
		      HYS_SQR.executeQuery();
		      HYS_SQR.freeConnection();
		      if(HYS_SQR.next()){
		      //显示申请人姓名
		 %>
            <td align=CENTER width=80 bgcolor="f7efde"> <font size="2"><%=HYS_SQR.getString(1)%></font></td>
		 <%
		       }else{
		 %>
		            <td align=CENTER width=80 bgcolor="f7efde"> <font size="2"><%=HYS_XX.getString(2)%></font></td>
		 <% 
		      }
		       if(HYS_XX.getString(7)!=null){
		 %>
		       <td align=CENTER width=100  bgcolor="f7efde"> <font size="2"><%=HYS_XX.getString(7)%></font></td>
		 <%
		       }else{
		 %>
		     	 <td align=CENTER width=100  bgcolor="f7efde"> <font size="2"> </font></td>
		 <%
		     	}
		     	if(HYS_XX.getString(5)!=null){
		 %>
		     	<td align=CENTER width=190  bgcolor="f7efde"> <font size="2"><%=HYS_XX.getString(5)%></font></td>
		 <%
		    }else{
		 %>
		    	 <td align=CENTER width=190  bgcolor="f7efde"> <font size="2"></font></td>
		 <%
		    	 }
		    HYS_SQR.close();	 
    	 }
    	 HYS_XX.close();

 %> 
 </table> 
 <table align="center" border="0px" style=" margin-top:0px;WIDTH: 600px"> 
 	 <tr>
     <td align="right"><input type="button" style="WIDTH: 60px; HEIGHT: 24px"  value="关 闭" onClick="window.close()"></td>
 	 </tr>
 </table> 
<BODY>