<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat"%>
	

<html>
<head>
<title>
</title>
</head>
<body bgcolor="#ecf6ff" topmargin="0" leftmargin="10">
<%
      String use_id="";
      HttpSession hs=request.getSession(true);
      if(hs.getAttribute("use_id") ==null){
            response.sendRedirect("../login/LOGOUT.jsp");
      }else{
      use_id=hs.getAttribute("use_id").toString();
       
%>
<SCRIPT LANGUAGE="javascript"> 
	//弹出会议室详细一览对话框
	function openwin_xx(obj) { 
	 var Rand=Math.random();
	 var now =
   window.showModalDialog("PROJ_HYYLXX.jsp?HYS_ID=" + obj.HYS_ID+"&YY_DATE="+document.getElementById("hidden_Date").value+"&Rnd="+Rand,window,"status:no;help:no;scroll:yes;dialogWidth:950px;dialogHeight:650px");
 
	}
	//弹出会议室预约对话框
	function openwin_yy(obj) { 
  		var now =
    	window.showModalDialog("HYSYY.jsp?YY_DATE="+ obj.YY_DATE+"&YY_STARTTIME="+obj.YY_STARTTIME+"&YY_ENDTIME="+obj.YY_ENDTIME+"&HYS_ID="+obj.HYS_ID+"&SQ_ID="+obj.SQ_ID,window,"status:no;help:no;scroll:yes;dialogWidth:700px;dialogHeight:400px");
    	//if(now ==null){
    	//	parent.location.href="HYSYL_FRAME.jsp?YyDate="+document.getElementById("hidden_Date").value;
    	//}else{
    	//	parent.location.href="HYSYL_FRAME.jsp?YyDate="+now;
    	//}
    	return false;  
		}

</SCRIPT> 
<%!	//单元格长度的计算
	public int cdjs(String beginTime,String endTime){
			int length=0;
			String start_xiaoshi=beginTime.substring(0,2);
			String start_fen=beginTime.substring(3,5);
			String end_xiaoshi=endTime.substring(0,2);
			String end_fen=endTime.substring(3,5);
			int start=Integer.parseInt(start_xiaoshi)*60+Integer.parseInt(start_fen);
			int end=Integer.parseInt(end_xiaoshi)*60+Integer.parseInt(end_fen);
			length=(int)((((end-start)/30)*1176)/28);
			return length;
	}
%>
<jsp:useBean id="hysyl" scope="page" class="com.ysys.db.RowSet" />
<jsp:useBean id="hyssqcount" scope="page" class="com.ysys.db.RowSet" />
<jsp:useBean id="conference" scope="page" class="com.ysys.db.RowSet" />
<jsp:useBean id="sqrId" scope="page" class="com.ysys.db.RowSet" />
<jsp:useBean id="emp_name" scope="page" class="com.ysys.db.RowSet" />
 <% 
   String riqi="";
   String riqiNow="";
   int now_hh=0;
	 int now_mm=0;
	 String now_dd="";
   Date nowTime=new Date();
	 SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
	 SimpleDateFormat formatter_hh=new SimpleDateFormat("HH");
	 SimpleDateFormat formatter_mm=new SimpleDateFormat("mm");
	 riqiNow=formatter.format(nowTime);
	 now_hh=Integer.parseInt(formatter_hh.format(nowTime));
	 now_mm=Integer.parseInt(formatter_mm.format(nowTime));
		 
   if(request.getParameter("YyDate")==null||request.getParameter("YyDate")==""){
     riqi=formatter.format(nowTime);  
   }else{ 
   	   riqi=request.getParameter("YyDate");
   }
   
   //申请详细信息(SQL)
   String sql ="SELECT CJRS, HYSID ,SQRID ,START_TIME,END_TIME,YY_DATE FROM TAB_HYSSQ WHERE YY_DATE='"+riqi+"' ORDER BY HYSID,START_TIME";
   //会议室使用次数(SQL)
   String sqlYHYS_ID ="SELECT HYSID,COUNT(YY_DATE) FROM TAB_HYSSQ WHERE YY_DATE='"+riqi+"' GROUP BY HYSID;";
   //会议室一览(SQL)
   String sqlconference ="SELECT CNFS_ID ,CNFS_NAME FROM CONFERENCE_TYPE ORDER BY CNFS_ID";
   //会议室申请人(SQL)
   String sqlHyssqr_ID="SELECT  SQRID  FROM TAB_HYSSQ WHERE YY_DATE='"+riqi+"' GROUP BY SQRID ORDER BY SQRID;";
   //申请会议室职工姓名(SQL)
   StringBuffer sql_empName=new StringBuffer();
   
   //以申请会议室
   hyssqcount.setDbName("UTF8");
   hyssqcount.freeConnection();
   hyssqcount.setCommand(sqlYHYS_ID);
   hyssqcount.executeQuery();
   String[][] rsCount;
   rsCount = new String[hyssqcount.getRowCount()][2];
   int k2 =0;
   while(hyssqcount.next()){
		rsCount[k2][0]=hyssqcount.getString(1);    	
   	rsCount[k2][1]=hyssqcount.getString(2);    	
   	k2++;
   } 
   hyssqcount.close();
   
    //取得申请人ID   
    sqrId.setDbName("UTF8");
    sqrId.freeConnection();
    sqrId.setCommand(sqlHyssqr_ID);
    sqrId.executeQuery();
    sql_empName.append("SELECT EMP_ID,EMP_NAME FROM TEMPINFO WHERE");
    while(sqrId.next()){ 
    	sql_empName.append(" EMP_ID='");
    	sql_empName.append(sqrId.getString(1));
    	sql_empName.append("' OR ");
    } 
    sql_empName.append("1=2");
    sql_empName.append(";");
    sqrId.close();
    
    //取得申请人姓名
	String [][] empName_ID=null;
    if (sql_empName.length()>46){
      emp_name.setDbName("UTF8");
    	emp_name.freeConnection();
      emp_name.setCommand(sql_empName.toString());
    	emp_name.executeQuery();
    	empName_ID =new String[emp_name.getRowCount()][2];
    	int k5=0;
    	while(emp_name.next()){
    		empName_ID[k5][0]=emp_name.getString(1);
    		empName_ID[k5][1]=emp_name.getString(2);
    		k5++;
    	}
    	emp_name.close();
    }
    
   //会议室申请详细信息
   hysyl.setDbName("UTF8");
   hysyl.freeConnection();
   hysyl.setCommand(sql);
   hysyl.executeQuery();
   Calendar startTime= Calendar.getInstance();
   Calendar endTime= Calendar.getInstance();
   String[][] rs;
   String[] length;
   int j=0;
   rs=  new String[hysyl.getRowCount()][8];
   while(hysyl.next()){
   		for (int i=0;i<6;i++){
   			rs[j][i]= hysyl.getString(i+1);
   		} 
   		for(int k=0;k<rsCount.length;k++){
   			if(rs[j][1].equals(rsCount[k][0])){
   				rs[j][7]=rsCount[k][1];
   			}
   		}
   		if(empName_ID!=null||empName_ID.length!=0){
   			for (int k=0;k<empName_ID.length;k++){
   				if(rs[j][2].equals(empName_ID[k][0])){
   					rs[j][6]=empName_ID[k][1];
   				}
   			}
   		}
	 	j++;
    }
    hysyl.close();

    //取得会议室列表   
    conference.setDbName("UTF8");
    conference.freeConnection();
    conference.setCommand(sqlconference);
    conference.executeQuery();
    String[][] cnfs = new String[conference.getRowCount()][2];
    int k3 =0;
    while(conference.next()){ 
    	cnfs[k3][0]=conference.getString(1);
    	cnfs[k3][1]=conference.getString(2);
    	k3++;
    } 
    conference.close();
   
	  String[]kxcnfs= new String[cnfs.length];
		int flag_m=0,flag_n=0,flag_j=0;
		while(true){
			if(flag_n<rs.length){
				if(cnfs[flag_m][0].equals(rs[flag_n][1])){
					flag_m++;
					flag_n++;
				}else if(Integer.parseInt(cnfs[flag_m][0])<Integer.parseInt(rs[flag_n][1])){
					kxcnfs[flag_j]=cnfs[flag_m][0];
					flag_m++;
					flag_j++;
				}else if(Integer.parseInt(cnfs[flag_m][0])>Integer.parseInt(rs[flag_n][1])){
					flag_n++;
				}
			}else {
				kxcnfs[flag_j]=cnfs[flag_m][0];
				flag_m++;
				flag_j++;
			}
			if(flag_m==cnfs.length){
				break;
			}
		}  

    %>
<style>
.table_bk table{border:1px;
	border-collapse:collapse;}
.tb_font {
	font-family: 宋体;
	font-size: 12px;
	font-style: normal;
	font-weight: normal;
	text-transform: none;
	
}
</style>

<input type="hidden" id="hidden_Date" value=<%=riqi%>>
<table width="1314px" border="0px" border="0px" cellpadding="0" cellspacing="0" class="table_bk">
	<tr>
		<td style="WIDTH:55px;"></td>
		<%
		for(int i=8;i<=22;i++){
			if (i<10){
 			%><td align="center" style="width:81px"><FONT face=宋体 size=3>0<%=i+":00"%></td>
 			<%}else{
 			%><td align="center" style="width:81px"><FONT face=宋体 size=3><%=i+":00"%></td>
 			<%}
 			}%>
 	 </tr>
  </table>
	<table  style="margin-top:0px;" height="10px" width="1271px" border="1px" cellpadding="0" cellspacing="0" rules="cols" frame="rhs" class="table_bk">
  			<tr>
  				<td style="WIDTH:101px;"></td>
  				<%
 				for(int i=0;i<=27;i++){
 				
 						if((i%2)==0){
 							%>
 							<td align="center" style="width:42px;" ></td>
 							<%
 						}else{
 							%>
 							<td align="center" style="width:41px;border:1px"></td>
 							<%
 						}
 					
 				}
 				%>
 		   </tr>
       <tr>
         	<td style="WIDTH:101px;"></td>
  				<%
  				for(int i=0;i<=27;i++){
 				%>
 				<td align="center" style="width:42px;"></td>
 				<%
 				}
 				%>
       </tr>
  	</table>
<table id="tb" style="width:1276px; margin-top:-8px;" cellpadding="0" cellspacing="5" border=0 > 

<%
 for(int i=0;i<conference.getRowCount();i++){
 %>
 <tr>
  <td style="WIDTH:85px;" align="center"><FONT face=宋体 size=3><a align="center" href="#" onclick="return openwin_xx(this)" HYS_ID=<%=cnfs[i][0]%>><%=cnfs[i][1]%></a></td>
  <td>
    <table id="tb" cellpadding="0" cellspacing="0" border="1px" width="1176px" class="tb_font" > 
 	   <tr height="35px" style="word-break:break-all">
 	   	<% 
 	   	for(int k4=0;k4<rs.length;k4++){
	   		if(cnfs[i][0].equals(rs[k4][1])){
	   		
	   			if(!rs[k4][3].equals("08:00:00")){
		   			if(k4==0||!rs[k4][1].equals(rs[k4-1][1])){
		   					if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
										%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs("08:00:00",rs[k4][3])-2%>px">&nbsp</td>	 
										<%
								}else{
									if(riqiNow.equals(riqi)){
										if((now_hh<Integer.parseInt(rs[k4][3].substring(0,2)))||(now_hh==Integer.parseInt(rs[k4][3].substring(0,2))&& now_mm<Integer.parseInt(rs[k4][3].substring(3,5)))){
									  %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs("08:00:00",rs[k4][3])-2%>px">
				   				  <!--	<a href="#" onclick="return openwin_yy(this)" YY_DATE=<%=riqi%> YY_STARTTIME=08:00:00 YY_ENDTIME=<%=rs[k4][3]%> HYS_ID=<%=cnfs[i][0]%> SQ_ID=IN>预约</a> -->
				   					<a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=08:00:00&YY_ENDTIME=<%=rs[k4][3]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN"  target="_parent">预约</a>
				   					</td> 		   				
		   			        <%
								    }else{			
		   							%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs("08:00:00",rs[k4][3])-2%>px">&nbsp
				   					</td> 		   				
		   			        <%}	
								  }else{
								  	 %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs("08:00:00",rs[k4][3])-2%>px">
				   				  <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=08:00:00&YY_ENDTIME=<%=rs[k4][3]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN"  target="_parent">预约</a>
				   					</td> 		   				
		   			        <%
								  }
		   			  } 		   		
		   			}		
		   			if(Integer.parseInt(rs[k4][7])>=2){
		   				%>
		   				<td align="center" bgcolor="#CCFFCC" style="WIDTH:<%=cdjs(rs[k4][3],rs[k4][4])-2%>px;" >
				   	   	<% if(use_id.equals(rs[k4][2])){%>
				   	   	<a href="HYSYY.jsp?YY_DATE=<%= riqi %>&YY_STARTTIME=<%=rs[k4][3]%>&YY_ENDTIME=<%=rs[k4][4]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=UPDATE"  target="_parent"><%=rs[k4][6]%><br>(<%=rs[k4][0]%>人)</a>
				   	   	<% }else{ %>
				   	   	<%=rs[k4][6]%><br>(<%=rs[k4][0]%>人)	
				   	   	<%}%>
				   	   	</td>
				   		<%
		   				if((k4+1)<rs.length&&rs[k4][1].equals(rs[k4+1][1])){
		   					if(!rs[k4][4].equals(rs[k4+1][3])){
		   						if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
											%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],rs[k4+1][3])-2%>px;">&nbsp</td>	 
											<%
										}else{
											 if(riqiNow.equals(riqi)){
		   								    if((now_hh<Integer.parseInt(rs[k4+1][3].substring(0,2)))||(now_hh==Integer.parseInt(rs[k4+1][3].substring(0,2))&& now_mm<Integer.parseInt(rs[k4+1][3].substring(3,5)))){
		   								    %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],rs[k4+1][3])-2%>px;">
				   	   		  	    <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][4]%>&YY_ENDTIME=<%=rs[k4+1][3]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a> 
				   			  		    </td>
				   						    <%
		   								    }else{
		   								    %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],rs[k4+1][3])-2%>px;">&nbsp
				   			  		    </td>
				   						    <%
		   								    }
		   								 }else{
								  	     %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs("08:00:00",rs[k4][3])-2%>px">
				   				       <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=08:00:00&YY_ENDTIME=<%=rs[k4][3]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN"  target="_parent">预约</a>
				   					     </td> 		   				
		   			             <%
								       }
		   							}
		   						}
				   		 }
				   		if(k4==rs.length-1){
		   						if(!rs[k4][4].equals("22:00:00")){
		   							if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
											%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px;">&nbsp</td>	 
											<%
										}else{
		   								%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px;">
				   	   		  	<a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][4]%>&YY_ENDTIME=22:00:00&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a>
				   			  		</td>
				   					<%
				   					}
		   						}
				   		}
				   		if((k4+1)<rs.length&&!rs[k4][1].equals(rs[k4+1][1])&&!rs[k4][4].equals("22:00:00")){
				   			if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
										%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px;">&nbsp</td>	 
										<%
								}else{
				   			%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px;">
				   	   		  <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][4]%>&YY_ENDTIME=22:00:00&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a>
				   			  </td>
				   			<%
				   			}
				   		}
		   			}else{
		   				%><td align="center" bgcolor="#CCFFCC" style="WIDTH:<%=cdjs(rs[k4][3],rs[k4][4])-2%>px;">
				   	 	  <% if(use_id.equals(rs[k4][2])){%>
				   	 	  <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][3]%>&YY_ENDTIME=<%=rs[k4][4]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=UPDATE" target="_parent"><%=rs[k4][6]%><br>(<%=rs[k4][0]%>人)</a>
				   	  	  <%}else{%>
				   	   	  <%=rs[k4][6]%><br>(<%=rs[k4][0]%>人)	
				   		  <%}%>
				   	  	  </td>
		   				<% if(!rs[k4][4].equals("22:00:00")){
		   							if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
											%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px">&nbsp</td>	 
											<%
										}else{
		   							%>
		   							<td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px">
				     				<a  href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][4]%>&YY_ENDTIME=22:00:00&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a>
				 						</td>
		   							<%
		   							}
		   						}
		   				}
		   		}else{
		   			%><td align="center" bgcolor="#CCFFCC" style="WIDTH:<%=cdjs(rs[k4][3],rs[k4][4])-2%>px">
				     <% if(use_id.equals(rs[k4][2])){%>
				     <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][3]%>&YY_ENDTIME=<%=rs[k4][4]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=UPDATE" target="_parent"><%=rs[k4][6]%><br>(<%=rs[k4][0]%>人)</a>
				 		 <%}else{%>
				 		 <%=rs[k4][6]%><br>(<%=rs[k4][0]%>人)	
				   	 <%}%>
				 		 </td>
		   			 <%if(Integer.parseInt(rs[k4][7])==1&&!rs[k4][4].equals("22:00:00")){
		   			 	 	if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
									%>
									<td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px">&nbsp</td>	 
									<%
								}else{
		   			 			%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],"22:00:00")-2%>px">
		   	  		  	<a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][4]%>&YY_ENDTIME=22:00:00&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a></td>	 
		   			 			<%
		   			   }
		   			  }
		   			 if(k4+1<rs.length&&Integer.parseInt(rs[k4][7])>1&&!rs[k4][4].equals(rs[k4+1][3])){
		   			 		if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
									%><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],rs[k4+1][3])-2%>px">&nbsp</td>	 
									<%
									}else{
										 if(riqiNow.equals(riqi)){
										    if((now_hh<Integer.parseInt(rs[k4+1][3].substring(0,2)))||(now_hh==Integer.parseInt(rs[k4+1][3].substring(0,2))&& now_mm<Integer.parseInt(rs[k4+1][3].substring(3,5)))){
									      %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],rs[k4+1][3])-2%>px">
		   	  		  	      <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=<%=rs[k4][4]%>&YY_ENDTIME=<%=rs[k4+1][3]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a>	
		   			 			      <%
									      }else{
									      %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs(rs[k4][4],rs[k4+1][3])-2%>px">
    		   	  		  	  &nbsp
		      			 			  <%
										    }
										 }else{
								  	    %><td align="center" bgcolor="#f7efde" style="WIDTH:<%=cdjs("08:00:00",rs[k4][3])-2%>px">
				   				      <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=08:00:00&YY_ENDTIME=<%=rs[k4][3]%>&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN"  target="_parent">预约</a>
				   					    </td> 		   				
		   			            <%
								     }
								  }
		   				}
		   		}
		   	}
		}for(int k=0;k<kxcnfs.length;k++){
			if(cnfs[i][0].equals(kxcnfs[k])){
				if(request.getParameter("YyDate")!=null&&request.getParameter("YyDate")!=""&&java.sql.Date.valueOf(riqiNow).after(java.sql.Date.valueOf(request.getParameter("YyDate")))){ 
				%>
				<td align="center" bgcolor="#f7efde" >&nbsp</td>	 
				<%
				}else{
				%><td align="center" bgcolor="#f7efde" >
		   		<!--  <a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=08:00:00&YY_ENDTIME=22:00:00&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN >预约</a>
		     <a href="#" onclick="return openwin_yy(this)" HYS_ID=<%=cnfs[i][0]%>>预约</a>-->
		   	  	<a href="HYSYY.jsp?YY_DATE=<%=riqi%>&YY_STARTTIME=08:00:00&YY_ENDTIME=22:00:00&HYS_ID=<%=cnfs[i][0]%>&SQ_ID=IN" target="_parent">预约</a>	
		   	  </td>	 
				<%
				}
			}
		}
		%>
		</td>
	 	</tr>
	   </table>
	 </td>
 	</tr>
 <%
 }%>
</table>
<br>
<%}%>
</body>
</html>
