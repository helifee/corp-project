<%/**
 * 概要： 	会议室预约画面
 * 版数      日付          担当      内容
 * V2.0   2009.2.18       滕长龙    新規作成
 */
%>

<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<html>

<head>
<link rel="stylesheet" type="text/css" media="all" href="calendar/calendar-blue.css"/>
<!-- import the calendar script -->
<script type="text/javascript" src="calendar/calendar.js"></script>
<!-- import the language module -->
<script type="text/javascript" src="calendar/calendar-en.js"></script>
<!-- the following script defines the Calendar.setup helper function, which makes
adding a calendar a matter of 1 or 2 lines of code. -->
<script type="text/javascript" src="calendar/calendar-setup.js"></script>

 <script type="text/javascript">
				function hysq_check_onsubmit() 
				{
					//日期检查
					var rq=document.all.rq.value;
					var systime=document.all.systime.value;
					var sysyy = systime.substring(0,4);
					var sysmm = systime.substring(5,7);
					var sysdd = systime.substring(8,10);
					var syshh = systime.substring(11,13);
					var sys_mm = systime.substring(14,16);
					var sysss = systime.substring(17,19);
					
					if(rq=="")
					{
          	alert("请输入日期！");                  
            return false;
          }
          
          if (rq.length!=10)
          {
          	alert("日期格式错误！请按照YYYY-MM-DD格式输入或点击日期选择按钮！");                  
            return false;
          }
          
          //日期输入合法性检查
					var str=/^\d+$/;
					var str1="-";
					
					if (!(rq.substring(0,4).match( str ) && 
								rq.substring(4,5).match(str1) && 
								rq.substring(5,7).match(str) && 
								rq.substring(7,8).match(str1) && 
								rq.substring(8,10).match(str))) 
					{ 
 					
							alert("无效日期！请按照YYYY-MM-DD的格式输入或点击日期选择按钮！"); 
							return false; 
					}
					
					var yy = rq.substring(0,4);
					var mm = rq.substring(5,7);
					var dd = rq.substring(8,10);
					
					if (parseInt(yy)<2000 || parseInt(yy)>2109)
					{
							alert("无效日期！年份输入错误！"); 
							return false;	
					}
					
					if (parseInt(mm>12) || mm=="00")
					{
							alert("无效日期！月份输入错误！"); 
							return false; 	
					}
					
					if (dd=="00")
					{
							alert("无效日期！日期输入错误！"); 
							return false;
					}
										
					if(mm=="01" || mm=="03" || mm=="05" || mm=="07" || mm=="08" || mm=="10" || mm=="12")
					{
							if (parseInt(dd)>31)
							{
								alert("无效日期！本月日期不能大于31！"); 
								return false; 	
							}	
					}
					
					if (mm=="04" || mm=="06" || mm=="09" || mm=="11")
					{
							if (parseInt(dd)>30)
							{
								alert("无效日期！本月日期不能大于30！"); 
								return false; 	
							}	
					}
					
					if (mm=="02")
					{
							if ((parseInt(yy)%400==0) || (parseInt(yy)%100!=0) && (parseInt(yy)%4==0))
							{
									if (parseInt(dd)>29)
									{
										alert("无效日期！闰年2月份日期不能大于29！"); 
										return false;
									}	
							}
							else
							{
									if (parseInt(dd)>28)
									{
										alert("无效日期！平年2月份日期不能大于28！"); 
										return false;
									}	
							}
					}
					
					var rqtime=new Date(yy,mm-1,dd);
					var now=new Date(sysyy,sysmm-1,sysdd,syshh,sys_mm,sysss);
				
					if(rqtime.getYear()<now.getYear())
					{
								alert("不能预约过去的时间！");
								return false;
					}
					else
					{
								if(rqtime.getYear()==now.getYear())
								{
											if(rqtime.getMonth()<now.getMonth())
											{
														alert("不能预约过去的时间！");
														return false;	
											}
											else
											{		
														if(rqtime.getMonth()==now.getMonth())
														{
																	if(rqtime.getDate()<now.getDate())
																	{
																			alert("不能预约过去的时间！");
																			return false;		
																	}									
														}
											}
								}
					}
					 
          //时间检查
					function   comptime(a,b)   
				  {   
					  var   aParts   =   a.split(":");   
					  var   aMinutes   =   aParts[0]*60+aParts[1];   
					  var   bParts   =   b.split(":");   
					  var   bMinutes   =   bParts[0]*60+bParts[1];   
					  return   bMinutes-aMinutes;   
				  }   
				    
				  var timeStart = document.all.start_time_hh.value + ":" + document.all.start_time_mm.value;   
				  var timeEnd   = document.all.end_time_hh.value + ":" + document.all.end_time_mm.value;  
				    
				  if(comptime(timeStart,timeEnd)<=0)
				  {
					  	alert("开始时间必须小于结束时间!");   
							return false;
				  }
				  
				  if (timeEnd=="22:30")
				  {
					  	alert("太晚了!早点回去休息吧~~预约不能超过22点！");   
							return false;
				  	
				  }
				  
				  if (rqtime.getYear()==now.getYear() && 
				  		rqtime.getMonth()==now.getMonth() && 
				  		rqtime.getDate()==now.getDate())
				  {
				  		if(parseInt(document.all.end_time_hh.value) < now.getHours())
				  		{
				  				alert("您预约的时间已过，请预约其他时间！");   
				  				return false;
				  		}
				  		else
				  		{
				  				if (parseInt(document.all.end_time_hh.value)==now.getHours())	
				  				{
				  						if (parseInt(document.all.end_time_mm.value)<now.getMinutes() ||
				  								parseInt(document.all.end_time_mm.value)==now.getMinutes())
				  						{
				  								alert("您预约的时间已过，请预约其他时间！");   
				  								return false;
				  						}
				  						
				  				}	
				  			
				  		}
		
				  }
				  
	
          //参加人数检查
          //定义正则表达式部分 
					var str=/^\d+$/; 
          if(document.all.flag.value=="delete")
          {
 							//不用检查		 	
          }
          else
          {
	          	if(document.all.cjrs.value=="")
		          {
		          	alert("请输入参加人数！");                
		            return false;
		          }
		          if (document.all.cjrs.value.match( str ) && document.all.cjrs.value>0) 
							{ 
				
							} 
							else 
							{ 
									alert("请确认参加人数：只能输入1~99的数字！"); 
									return false; 
							}
							if (parseInt(document.all.cjrs.value)>parseInt(document.all.men_num.value))
							{
								if (confirm("会议室装不下这么多人！您确定要预约吗？"))
								{
										
								}
								else
								{
										return false;		
								} 	
								 					 		
							} 
          }
              									
          	return true;  
				}
</script>
<%
      HttpSession hs=request.getSession(true);
      if(hs.getAttribute("use_id") ==null){
            response.sendRedirect("../login/LOGOUT.jsp");
      }else{
%>
<%	String now =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		
		String hys_sqr_id = (String)hs.getAttribute("use_id");// 会议室申请人ID
		String key_hys_rq = request.getParameter("YY_DATE");
		String key_hys_id = request.getParameter("HYS_ID");
		String key_hys_stime = request.getParameter("YY_STARTTIME");
		String key_hys_etime = request.getParameter("YY_ENDTIME");
		String key_hys_zt = "";
		String key_hys_cjrs = "";
		
		int key_start_time_hh=0;
		String key_start_time_mm="";
		int key_end_time_hh=0;
		String key_end_time_mm="";
		
		String showName = "";// 页面表头名称
		String hys_rq = "";// 会议室日期
		String hys_id  = "";// 会议室ID
		String hys_hys  = "";// 会议室名
		String hys_list ="";//会议室列表
		String hys_list_num="";//会议室列表人数
		String hys_men_num = "";// 会议室容纳人数
		String hys_zt  = "";// 会议主题
		String hys_stime = "";// 开始时间
		String hys_etime  = "";// 结束时间
		String hys_sqr = "";// 会议室申请人
		String hys_cjrs = "";// 参加人数
		String hys_flg= "ok";// 页面显示控制标志

		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		java.util.Date currentTime = new java.util.Date();//得到当前系统时间 
		String str_sysdate = formatter.format(currentTime).substring(0,10); //将日期时间格式化 
		String sq_id = request.getParameter("SQ_ID");
		hys_rq=request.getParameter("YY_DATE");
		hys_id=request.getParameter("HYS_ID");

		if (sq_id.equals("IN"))
		{
		
				if(str_sysdate.compareTo(hys_rq)<0 || str_sysdate.equals(hys_rq))
				{
					showName = "会议室预约";	
				}	
				else
				{
					showName = "会议室预约查看";
					hys_flg = "no";
				}
			
		}
		else
		{	
				if(str_sysdate.compareTo(hys_rq)<0 || str_sysdate.equals(hys_rq))
				{
					showName = "会议室预约更改";
				}
				else
				{
					showName = "会议室预约查看";
					hys_flg = "no";
				}
			
		}
	
%>   
<title>
<%=showName%>
</title>
</head>

<body bgcolor="#ecf6ff">
<FORM action="HYSYY_submit.jsp" method=post id=HYSYY name=HYSYY onsubmit="return hysq_check_onsubmit();">
 
<p align=center><font size=4 COLOR=green><strong><%=showName%></strong></font></p>

<table align="center" cellspacing="10">

<%//========日期========%>	   
<tr>
<jsp:useBean id="RQXZ" class="com.ysys.db.RowSet"/>
<td>日期</td>
<%      
      if(hys_flg.equals("no"))
      {
%>
    		<td ><input id="rq" name="rq" style="width:70px" maxlength =10 value=<%=hys_rq%> disabled></td>	    			
<%	 
      		
      }
    	else
    	{
%>
    		<td ><input id="rq" name="rq" style="width:70px" maxlength =10 value=<%=hys_rq%>></td>	    			
<%	
    	}
%>      
</tr>


<%//======会议室=======%>
<tr>
<jsp:useBean id="HYSXZ" class="com.ysys.db.RowSet" />	
<jsp:useBean id="HYSNAME" class="com.ysys.db.RowSet" />	
<%
			HYSXZ.setDbName("UTF8");
			HYSXZ.freeConnection();
			//HYSXZ.setCommand("SELECT CNFS_ID,CNFS_NAME,MEN_NUM FROM CONFERENCE_TYPE WHERE CNFS_ID='01'");
			HYSXZ.setCommand("SELECT CNFS_ID,CNFS_NAME,MEN_NUM FROM CONFERENCE_TYPE WHERE CNFS_ID='"+request.getParameter("HYS_ID")+"'");
			HYSXZ.executeQuery();	
			if(HYSXZ.getRowCount() > 0)
			{
				HYSXZ.first();
				//out.println(HYSXZ.getString(2));
				//out.println(Integer.valueOf(HYSXZ.getString(1)));
				hys_men_num=HYSXZ.getString(3);
				hys_hys=HYSXZ.getString(2)+ "(可容纳 "+ Integer.valueOf(hys_men_num) +" 人)";
				hys_id=HYSXZ.getString(1);
			}
			HYSXZ.close();
%>			
<td >会议室 &nbsp;&nbsp;&nbsp;</td>

<%
if (hys_flg.equals("no"))
{
%>
		<td><SELECT style="WIDTH:260px" ID ="hys" name = "hys" disabled>
				<Option selected value=<%=hys_id%>><%=hys_hys%></Option>
		</SELECT></td>
<%		
}
else
{
%>
		<td ><SELECT style="WIDTH:260px" ID ="hys" name = "hys" onchange=get_num()>
<%
			HYSNAME.setDbName("UTF8");
			HYSNAME.freeConnection();
			HYSNAME.setCommand("SELECT CNFS_ID,CNFS_NAME,MEN_NUM FROM CONFERENCE_TYPE");
			HYSNAME.executeQuery();
		
		
			if(HYSNAME.getRowCount() > 0)
			{
      		while(HYSNAME.next())
       		{
       			if (HYSNAME.getString(1).equals(hys_id))
       			{
%>					       				
       				<Option selected value=<%=hys_id%>><%=hys_hys%></Option>
<%    			
       			}
       			else
       			{ 
       				hys_list_num=HYSNAME.getString(3);
       				hys_list=HYSNAME.getString(2)+"(可容纳 "+ Integer.valueOf(hys_list_num) +" 人)";
       				
%>   			
       				<Option Value=<%=HYSNAME.getString(1)%>><%=hys_list%></Option>
<%   			
       			}
     	 		}
      }
      HYSNAME.close();
%>  
		</SELECT></td>

<%		
}
%>
 <script type="text/javascript">
			//会议室人数取得
			function get_num(x) 
			{ 	
					var obj=document.all.hys;
					for(i=0;i<obj.length;i++)
					{
	   					if(obj[i].selected==true)
	   					{
	   						 var num=obj[i].innerText.split(" ")[1];   					
	    					 document.all.men_num.value=num;				
							}
					}	
			} 
</script>		
</tr>


<%//=====会议主题=====%> 
<tr>
<jsp:useBean id="HYSZT" class="com.ysys.db.RowSet" />

<td >会议主题</td>

<%
if (hys_flg.equals("no"))
{					
					HYSZT.setDbName("UTF8");
					HYSZT.freeConnection();
					HYSZT.setCommand("SELECT HYZT,CJRS FROM TAB_HYSSQ WHERE YY_DATE='"+ key_hys_rq +"' AND HYSID='" + key_hys_id +"' AND START_TIME='" + key_hys_stime +"'");
					HYSZT.executeQuery();						
					if(HYSZT.getRowCount() > 0)
					{
						HYSZT.first();
						hys_zt=HYSZT.getString(1);
						hys_cjrs=HYSZT.getString(2);
					}
					HYSZT.close();	
%>
					<td ><input style="WIDTH:260px" id="hyzt" name="hyzt" maxlength = 100 Value="<%=hys_zt%>" disabled></td>
<%		
}
else
{
%>

<%    
   		if (sq_id.equals("IN"))
      {   
%>     
      <td ><input style="WIDTH:260px" id="hyzt" name="hyzt" maxlength = 100" ></td>
<% 
			}
			else
			{
					HYSZT.setDbName("UTF8");
					HYSZT.freeConnection();
					HYSZT.setCommand("SELECT HYZT,CJRS FROM TAB_HYSSQ WHERE YY_DATE='"+ key_hys_rq +"' AND HYSID='" + key_hys_id +"' AND START_TIME='" + key_hys_stime +"'");
					HYSZT.executeQuery();						
					if(HYSZT.getRowCount() > 0)
					{
						HYSZT.first();
						key_hys_zt=HYSZT.getString(1);
						key_hys_cjrs=HYSZT.getString(2);
						hys_zt=HYSZT.getString(1);
						hys_cjrs=HYSZT.getString(2);
					}
					HYSZT.close();	
%>       
					<td ><input style="WIDTH:260px" id="hyzt" name="hyzt" maxlength = 100 Value="<%=hys_zt%>"></td>
<% 
			}      
%> 

<%
}
%>


       

</tr>


<%//============时间==================================%>
<tr>
<jsp:useBean id="HYSSTIME" class="com.ysys.db.RowSet" />		
<jsp:useBean id="HYSETIME" class="com.ysys.db.RowSet" />
		
<%
	
	hys_stime=request.getParameter("YY_STARTTIME");
	//hys_stime="09:30:00";
	hys_etime=request.getParameter("YY_ENDTIME");
	//hys_etime="13:30:00";

	String start_hh =hys_stime.substring(0,2);
	String start_mm =hys_stime.substring(3,5);
	String end_hh =hys_etime.substring(0,2);
	String end_mm =hys_etime.substring(3,5);
	
	key_start_time_hh=Integer.parseInt(start_hh);
	key_start_time_mm=start_mm;
	key_end_time_hh=Integer.parseInt(end_hh);
	key_end_time_mm=end_mm;
	
%>	
			
	
<td >时间 </td>
<%
if (hys_flg.equals("no"))
{

%>
				<td><SELECT style="WIDTH:50px" ID = "start_time_hh" name = "start_time_hh" disabled>
      	<Option Value =<%=Integer.parseInt(start_hh)%>><%=Integer.parseInt(start_hh)%></Option></SELECT>
				 ：
      	<SELECT style="WIDTH:50px" ID = "start_time_mm" name = "start_time_mm" disabled>
				<Option Value =<%=start_mm%>><%=start_mm%></Option></SELECT>
				 ～
				<SELECT style="WIDTH:50px" ID = "end_time_hh" name = "end_time_hh" disabled>
				<Option Value =<%=Integer.parseInt(end_hh)%>><%=Integer.parseInt(end_hh)%></Option></SELECT>
				 ：
				<SELECT style="WIDTH:50px" ID = "end_time_mm" name = "end_time_mm" disabled>
				<Option Value =<%=end_mm%>><%=end_mm%></Option></SELECT></td>
					
<%
}
else
{

%>

      <td><SELECT style="WIDTH:50px" ID = "start_time_hh" name = "start_time_hh">
<%
      	  int i = 8;
      	  while(i<22)
      	  {
      	  	if(i==Integer.parseInt(start_hh))
      	  	{
%>  	
      	  		  <Option selected value =<%=i%>><%=i%></Option>  		
<% 	
      	  		  i=i+1;	
      	  	}
      	  	else
      	  	{
%>
      	  			<Option Value =<%=i%>><%=i%></Option>
<%  
      					i=i+1;			 		
      	  	}
       	  }
%> 	  	  
      </SELECT>
      ：
      <SELECT style="WIDTH:50px" ID = "start_time_mm" name = "start_time_mm">
<%
      	if (start_mm.equals ("00"))
      	{
      	  	
%>	
       		<Option selected value="00">00</Option>
      		<Option Value ="30">30</Option>	
<%	
      	}
      	else
      	{
%> 		
      	<Option Value ="00">00</Option>
      	<Option selected value="30">30</Option>      	
<%
      	}
%>	
      </SELECT>
      
      ～
      
      <SELECT style="WIDTH:50px" ID = "end_time_hh" name = "end_time_hh">
<%
      	  int j = 8;
      	  while(j<23)
      	  {
      	  if(j==Integer.parseInt(end_hh))
      	  	{
%>  	
      	  		<Option selected value =<%=j%>><%=j%></Option>  		
<% 	
      	  		j=j+1;	
      	  	}
      	  	else
      	  	{
%>
      	  			<Option Value =<%=j%>><%=j%></Option>
<%  
      					j=j+1;			 		
      	  	}
       	  }
%> 	     	  	  
      </SELECT>
      
      ：
      
      <SELECT style="WIDTH:50px" ID = "end_time_mm" name = "end_time_mm">
<%
      if (end_mm.equals ("00"))
      	{
      	  	
%>	
       		<Option selected value="00">00</Option>
      		<Option Value ="30">30</Option>	
<%	
      	}
      	else
      	{
%> 		
      	<Option Value ="00">00</Option>
      	<Option selected value="30">30</Option>      	
<% 	
      	}
%>	
      </SELECT></td>


<%
}				  
%>

</tr>


<%//=============申请人=========================%>
<tr>
	<jsp:useBean id="SQR" class="com.ysys.db.RowSet" />	
<%
			SQR.setDbName("UTF8");
			SQR.freeConnection();
			//SQR.setCommand("SELECT EMP_NAME FROM TEMPINFO WHERE EMP_ID='YD200301'");
			SQR.setCommand("SELECT EMP_NAME FROM TEMPINFO WHERE EMP_ID='"+hys_sqr_id+"'");
			SQR.executeQuery();	
			if(SQR.getRowCount() > 0)
			{
				SQR.first();
				hys_sqr=SQR.getString(1);  	
			}
			SQR.close();
%>
<td >预约者</td>		



<%
if (hys_flg.equals("no"))
{

%>
			<td ><input id="sqr" name="sqr" style="width:115px" maxlength=5 value=<%=hys_sqr%> disabled></td>  
<%
}
else
{
%>

      <td ><input id="sqr" name="sqr" style="width:115px" maxlength=5 value=<%=hys_sqr%> readonly></td>  
      
<%
}				  
%>       
      
</tr>

<%//==========参加人数======================%>
<tr>
<td >参加人数</td>
<%
if (hys_flg.equals("no"))
{

%>

		<td ><input id="cjrs" name="cjrs" style="width:115px" align="center" maxlength=2 value="<%=hys_cjrs%>" disabled></td>


<%
}
else
{
%>



<%    
   		if (sq_id.equals("IN"))
      {   
%>     	   
      	<td ><input id="cjrs" name="cjrs" style="width:115px" align="center" maxlength=2 ></td>
<% 
			}
			else
			{
%>       
				<td ><input id="cjrs" name="cjrs" style="width:115px" align="center" maxlength=2 value="<%=hys_cjrs%>"></td>
<% 
			}      
%> 


<%
}				  
%>    

</tr>


</table>
<br>

<%//========按钮================%>
<table align="center" >
<tr>
<%
	if (sq_id.equals("IN"))
	{	
		if(str_sysdate.compareTo(hys_rq)<0 || str_sysdate.equals(hys_rq))
		{
%>
				<td align="center"><input type="submit" style="WIDTH:70px" id="insert" name="insert" value="预约" onclick="insert_submit();"></td>		
<%
	
		}
								
	}	
	else
	{
			if(str_sysdate.compareTo(hys_rq)<0 || str_sysdate.equals(hys_rq))
			{			
%>
				<td align="center" ><input type="submit" style="WIDTH:70px" id="update" name="update" value="更改预约" onclick="return update_submit();"> &nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td align="center" ><input type="submit" style="WIDTH:70px" id="delete" name="delete" value="取消预约" onclick="return delete_submit();"></td>
<%
			}
				
	}
%>

 <script type="text/javascript">
	
			function insert_submit()
			{
				document.all.flag.value="insert";	
			} 
		
			function update_submit()
			{
				if (confirm("您确定要更改预约吗？"))
				{ 
					document.all.flag.value="update";	 
				}
				else
				{ 
					return false;
				} 				
			} 
	
			function delete_submit()
			{	
				
				//alert(document.all.rq.value);
				//alert(document.all.key_hys_rq.value + "key");
			
				//alert(document.all.hys.value);
				//alert(document.all.key_hys_id.value+ "key");
				
				//alert(document.all.hyzt.value);
				//alert(document.all.key_hys_zt.value+ "key");
				
				//alert(document.all.cjrs.value);
				//alert(document.all.key_hys_cjrs.value+ "key");
				
				//alert(document.all.start_time_hh.value);
				//alert(document.all.key_start_time_hh.value);
				
				//alert(document.all.start_time_mm.value);
				//alert(document.all.key_start_time_mm.value);
				
				//alert(document.all.end_time_hh.value);
				//alert(document.all.key_end_time_hh.value);
						
				//alert(document.all.end_time_mm.value);
				//alert(document.all.key_end_time_mm.value);


				
				if (document.all.rq.value == document.all.key_hys_rq.value &&
						document.all.hys.value == document.all.key_hys_id.value && 
						document.all.hyzt.value == document.all.key_hys_zt.value &&
						document.all.cjrs.value == document.all.key_hys_cjrs.value &&
						document.all.start_time_hh.value == document.all.key_start_time_hh.value &&
						document.all.start_time_mm.value == document.all.key_start_time_mm.value &&
						document.all.end_time_hh.value == document.all.key_end_time_hh.value &&
						document.all.end_time_mm.value == document.all.key_end_time_mm.value)
				{
						if (confirm("您确定要取消预约吗？"))
						{ 
								document.all.flag.value="delete"; 
						}
						else
						{ 
								return false;
						}
		          			        
				}
				else
				{
						if (confirm("您已经修改了画面内容，不能取消预约，放弃修改后请重新点击【取消预约】按钮。\n确定要放弃修改吗？"))
						{ 
								document.all.rq.value = document.all.key_hys_rq.value;
								document.all.hys.value = document.all.key_hys_id.value;
								document.all.hyzt.value = document.all.key_hys_zt.value;
								document.all.cjrs.value = document.all.key_hys_cjrs.value;
								document.all.start_time_hh.value = document.all.key_start_time_hh.value;
								document.all.start_time_mm.value = document.all.key_start_time_mm.value;
								document.all.end_time_hh.value = document.all.key_end_time_hh.value;
								document.all.end_time_mm.value = document.all.key_end_time_mm.value;
								return false;
						}
						else
						{ 
								return false;
						}
						
				}
				
			} 			
</script> 

 <script type="text/javascript">
    		Calendar.setup(
    		{
        		
         		ifFormat   :    "%Y-%m-%d",
         		inputField :    "rq"
    		}
    		);
</script>
</tr>
   
</table>
<table align="center" style="WIDTH:500px">
<td align="right"><font size="3" bgcolor="88ef3e"><A href=HYSYL_FRAME.jsp?YyDate=<%=hys_rq%>>返回</A></font></td>
<!--<td align="right"><input type="button" style="WIDTH: 60px; HEIGHT: 24px"  value="关 闭" onClick="window.close()"></td>-->
</table>

<table align="center">
<tr>
			<input type="hidden" id="flag" name="flag">
			<input type="hidden" id="key_hys_stime" name="key_hys_stime" value="<%=key_hys_stime%>">
			
			<input type="hidden" id="key_start_time_hh" name="key_start_time_hh" value="<%=key_start_time_hh%>">
			<input type="hidden" id="key_start_time_mm" name="key_start_time_mm" value="<%=key_start_time_mm%>">
			<input type="hidden" id="key_end_time_hh" name="key_end_time_hh" value="<%=key_end_time_hh%>">
			<input type="hidden" id="key_end_time_mm" name="key_end_time_mm" value="<%=key_end_time_mm%>">
			
			<input type="hidden" id="key_hys_etime" name="key_hys_etime" value="<%=key_hys_etime%>">
			<input type="hidden" id="key_hys_rq" name="key_hys_rq" value="<%=key_hys_rq%>">
			<input type="hidden" id="key_hys_id" name="key_hys_id" value="<%=key_hys_id%>">
			<input type="hidden" id="key_hys_zt" name="key_hys_zt" value="<%=key_hys_zt%>">
			<input type="hidden" id="key_hys_cjrs" name="key_hys_cjrs" value="<%=key_hys_cjrs%>">
			<input type="hidden" id="men_num" name="men_num" value="<%=Integer.valueOf(hys_men_num)%>">
			<input type="hidden" id="systime" name="systime" value="<%=now%>">	
</tr>
</table>

</FORM>
<%
      }
%>


</body>
</html>