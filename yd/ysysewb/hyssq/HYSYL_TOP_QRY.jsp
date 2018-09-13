<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<%@ page  language="java" import="java.text.SimpleDateFormat,java.util.Date"%>
<html>
<head>
<link rel="stylesheet" type="text/css" media="all" href="calendar/_calendar-blue.css"/>
<!-- import the calendar script -->
<script type="text/javascript" src="calendar/_calendar.js"></script>
<!-- import the language module -->
<script type="text/javascript" src="calendar/_calendar-en.js"></script>
 <!-- the following script defines the Calendar.setup helper function, which makes
       adding a calendar a matter of 1 or 2 lines of code. -->
<script type="text/javascript" src="calendar/_calendar-setup.js"></script>
<title>
HYSYL_TOP_QRY
</title>
</head>
<SCRIPT LANGUAGE="javascript"> 
	 function before(){ 	 	 
 		 var d1=document.getElementById("YyDate").value;
 		 execScript('dim n:n=DateAdd("d",-1,"'+d1+'")','vbscript');   
 		 var d =new Date(n); 
 		 var Date1=d.getFullYear()  
 		 if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10){
 		 	Date1=Date1+"-0"+(d.getMonth()+1);
 		 }else{
 		 	 Date1=Date1+"-"+(d.getMonth()+1);
 		 } 
 		 if(d.getDate()>0 && d.getDate()<10){
          	 Date1=Date1+"-0"+d.getDate(); 
         }else{
         	 Date1=Date1+"-"+d.getDate(); 
         }
 		 document.getElementById("YyDate").value=Date1;
  }
    function after(){
 		 var d1=document.getElementById("YyDate").value;
 		 execScript('dim n:n=DateAdd("d",1,"'+d1+'")','vbscript');   
 		 var d =new Date(n);  
 		 var Date1=d.getFullYear()  
 		 if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10){
 		 	Date1=Date1+"-0"+(d.getMonth()+1);
 		 }else{
 		 	 Date1=Date1+"-"+(d.getMonth()+1);
 		 } 
 		 if(d.getDate()>0 && d.getDate()<10){
          	 Date1=Date1+"-0"+d.getDate(); 
         }else{
         	 Date1=Date1+"-"+d.getDate(); 
         }
 		 document.getElementById("YyDate").value=Date1;
  }

	function OpenWeiZhi() { 
	//弹出会议室位置图
    window.showModalDialog("HYSWZT.jsp",window,"status:yes;help:no;scroll:yes;dialogWidth:950px;dialogHeight:650px");
     return false;
}
	function OpenHuiYiShi() { 
	//弹出会议室详细信息
		var Rand=Math.random();
    window.showModalDialog("HYSXX.jsp?Rnd="+Rand,window,"status:yes;help:no;scroll:yes;dialogWidth:1050px;dialogHeight:650px");
     return false;
}
</SCRIPT> 
<body bgcolor="#ecf6ff">
<%
      HttpSession hs=request.getSession(true);
      if(hs.getAttribute("use_id") ==null){
            response.sendRedirect("../login/LOGOUT.jsp");
      }else{
       	Date nowTime=new Date();
	   		SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
	   		SimpleDateFormat formatter1=new SimpleDateFormat("yyyy年MM月dd日");
	   		String riqi="";
	   		if(request.getParameter("YyDate")==null||request.getParameter("YyDate")==""){
     			riqi=formatter.format(nowTime);  
   	 		}else{ 
   	   		riqi=request.getParameter("YyDate");
   			}
	   
%><br>
<p align=center><font size=4 COLOR=green><strong>会议室预约情况一览</strong></font></p>
<form method="post" id="frmGrxx" name="frmGrxx" action="HYSYL_BOT_VIEW.jsp" target = "botFrame">
<table cellpadding="10" cellspacing="0" align="center" border="0" style="WIDTH: 900">
<tr>
<td WIDTH="200px"></td>	
<td align="right" WIDTH="100px"><input type="submit" id="before_DATE" value="<< 前日" onclick="return before()"style="width:60px"></td>
<td align=right  WIDTH="50px"><font color="#000000" size="3"><strong>日 期</strong></font></td>
<td align=left WIDTH="100px"><input readOnly="true" type="text" id=YyDate name=YyDate style="WIDTH: 100px; HEIGHT: 22px" maxlength=10 value=<%=riqi%> onChange="submit()"></td>
<!--<td align="left"><input type="submit" id="qry" value="检 索" style="width:60px"></td>-->
<td align="left" WIDTH="100px"><input type="submit" id="after_DATE" value="后日 >>" onclick="return after()"style="width:60px"></td>	
<td ></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>	
<td></td>	

<td align="center" WIDTH="95px"><a  href="#" onclick=" return OpenHuiYiShi()"><FONT face=宋体 size=2>会议室分布情况</a></td>	
</tr>
</table>

</from>
<%
      }
%>

 <script type="text/javascript">
    		Calendar.setup({
        		button     :    "YyDate",
         		ifFormat   :    "%Y-%m-%d",
         		inputField :    "YyDate"
    		});
 </script>
</body>
</html>
