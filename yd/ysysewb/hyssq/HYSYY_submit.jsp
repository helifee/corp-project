<%/**
 * 概要： 	会议室预约画面
 * 版数      日付          担当      内容
 * V2.0   2009.2.18       滕长龙    新規作成
 */
%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<%@ page import="java.util.*,java.text.SimpleDateFormat"%>
<html>
<head>
<title>
HYSSQINSERTSUBMIT
</title>
</head>
<body>
<%
      HttpSession hs=request.getSession(true);
      if(hs.getAttribute("use_id") ==null){
            response.sendRedirect("../login/LOGOUT.jsp");
      }else{
%>
<jsp:useBean id="HYSSQ" class="com.ysys.db.RowSet" />
<jsp:useBean id="HYSCX" class="com.ysys.db.RowSet" />
<jsp:useBean id="HYSSC" class="com.ysys.db.RowSet" />
<jsp:useBean id="HYSGX" class="com.ysys.db.RowSet" />
	
<%	 				
			request.setCharacterEncoding("UTF-8");
			//out.println("----"+request.getParameter("flag")+"<br>");		
			//out.println("----"+request.getParameter("rq")+"<br>");    
      //out.println("----"+request.getParameter("hys")+"<br>");     
      //out.println("----"+request.getParameter("hyzt")+"<br>");
      
      //out.println("----"+request.getParameter("start_time_hh"));
      //out.println(":"+request.getParameter("start_time_mm")+"<br>");
      //out.println("----"+request.getParameter("end_time_hh"));
      //out.println(":"+request.getParameter("end_time_mm")+"<br>");      
      //out.println(start_time+"<br>");     
      //out.println(end_time+"<br>");
      //out.println("----"+request.getParameter("sqr")+"<br>");  
      //out.println("----"+request.getParameter("cjrs")+"<br>");
 
   	  		String flg =request.getParameter("flag");
   	  		//String flg ="delete";
   	  		//String flg ="insert";
   	  		//String flg ="update";
   	  		String sqr_id= (String)hs.getAttribute("use_id");
   	  		String rq = request.getParameter("rq");
   	  		String hys =request.getParameter("hys");
   	  		String hyzt =request.getParameter("hyzt");
   	  		if(hyzt.equals(null) || hyzt.equals(""))
   	  		{
   	  				hyzt="保密";
   	  		}
   	  		String cjrs =request.getParameter("cjrs");
   	  		String key_start_time =request.getParameter("key_hys_stime");
   	  		String key_end_time =request.getParameter("key_hys_etime");
   	  		String key_hys_rq =request.getParameter("key_hys_rq");
   	  		String key_hys_id =request.getParameter("key_hys_id");
   	  		
   	  		
   	  		String start_time=request.getParameter("start_time_hh")+":"+request.getParameter("start_time_mm")+":00";
   	  		String end_time=request.getParameter("end_time_hh")+":"+request.getParameter("end_time_mm")+":00";
		      String stime ="";
		      String etime ="";
		      String checktime ="";
		      String now =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		      
		      String sysyy = now.substring(0,4);
					String sysmm = now.substring(5,7);
					String sysdd = now.substring(8,10);
					
					String syshh = now.substring(11,13);
					String sys_mm = now.substring(14,16);
					String sysss = now.substring(17,19);
					
					String yy = rq.substring(0,4);
					String mm = rq.substring(5,7);
					String dd = rq.substring(8,10);
					
					String key_yy = key_hys_rq.substring(0,4);
					String key_mm = key_hys_rq.substring(5,7);
					String key_dd = key_hys_rq.substring(8,10);
					
					String end_time_hh = request.getParameter("end_time_hh");
		      String end_time_mm = request.getParameter("end_time_mm");
		      
		      String key_end_time_hh = request.getParameter("key_end_time_hh");
		      String key_end_time_mm = request.getParameter("key_end_time_mm");
		      boolean time_ctrl_flg = true;
		      
		      if (flg.equals("delete"))
		      {		//删除情况
		      		//服务器日期检查
							if(key_yy.compareTo(sysyy)<0)
							{
										
										time_ctrl_flg = false;
										%>
											<script>
											<!--
												alert("不能删除过去的时间！");
												
												history.go(-1);// 返回原画面
											-->
											</script>
											<%
							}
							else
							{
										if(key_yy.equals(sysyy))
										{
													if(key_mm.compareTo(sysmm)<0)
													{
																
																time_ctrl_flg = false;
																%>
																<script>
																<!--
																	alert("不能删除过去的时间！");
																	history.go(-1);// 返回原画面
																-->
																</script>
																<%
													}
													else
													{		
																if(key_mm.equals(sysmm))
																{
																			if(key_dd.compareTo(sysdd)<0)
																			{
																					
																					time_ctrl_flg = false;
																					%>
																					<script>
																					<!--
																						alert("不能删除过去的时间！");
																						history.go(-1);// 返回原画面
																					-->
																					</script>
																					<%		
																			}									
																}
													}
										}
							}
							
							//服务器时间检查
							
							if (key_yy.equals(sysyy) && key_mm.equals(sysmm) && key_dd.equals(sysdd))
						  {
						  		if(Integer.parseInt(key_end_time_hh) < Integer.parseInt(syshh))
						  		{
						  				time_ctrl_flg = false;
											%>
											<script>
											<!--
													alert("您要删除的预约记录时间已过，不允许删除！");   
													history.go(-1);// 返回原画面
											-->
											</script>
											<%		
						  		}
						  		else
						  		{
						  				if (Integer.parseInt(key_end_time_hh)==Integer.parseInt(syshh))	
						  				{
						  						if (Integer.parseInt(key_end_time_mm)<Integer.parseInt(sys_mm) ||
						  								Integer.parseInt(key_end_time_mm)==Integer.parseInt(sys_mm))
						  						{
						  								time_ctrl_flg = false;
															%>
															<script>
															<!--
																	alert("您要删除的预约记录时间已过，不允许删除！");   
																	history.go(-1);// 返回原画面
															-->
															</script>
															<%		
						  						}
						  						
						  				}	
						  			
						  		}
				
						   }
		      
		      
		      
		      } 
		    	else
		    	{		//插入和更新情况
		      		//服务器日期检查
							if(yy.compareTo(sysyy)<0)
							{
										
										time_ctrl_flg = false;
										%>
											<script>
											<!--
												alert("不能预约过去的时间！");
												
												history.go(-1);// 返回原画面
											-->
											</script>
											<%
							}
							else
							{
										if(yy.equals(sysyy))
										{
													if(mm.compareTo(sysmm)<0)
													{
																
																time_ctrl_flg = false;
																%>
																<script>
																<!--
																	alert("不能预约过去的时间！");
																	history.go(-1);// 返回原画面
																-->
																</script>
																<%
													}
													else
													{		
																if(mm.equals(sysmm))
																{
																			if(dd.compareTo(sysdd)<0)
																			{
																					
																					time_ctrl_flg = false;
																					%>
																					<script>
																					<!--
																						alert("不能预约过去的时间！");
																						history.go(-1);// 返回原画面
																					-->
																					</script>
																					<%		
																			}									
																}
													}
										}
							}
							
							//服务器时间检查
							
							if (yy.equals(sysyy) && mm.equals(sysmm) && dd.equals(sysdd))
						  {
						  		if(Integer.parseInt(end_time_hh) < Integer.parseInt(syshh))
						  		{
						  				time_ctrl_flg = false;
											%>
											<script>
											<!--
													alert("您预约的时间已过，请预约其他时间！");   
													history.go(-1);// 返回原画面
											-->
											</script>
											<%		
						  		}
						  		else
						  		{
						  				if (Integer.parseInt(end_time_hh)==Integer.parseInt(syshh))	
						  				{
						  						if (Integer.parseInt(end_time_mm)<Integer.parseInt(sys_mm) ||
						  								Integer.parseInt(end_time_mm)==Integer.parseInt(sys_mm))
						  						{
						  								time_ctrl_flg = false;
															%>
															<script>
															<!--
																	alert("您预约的时间已过，请预约其他时间！");   
																	history.go(-1);// 返回原画面
															-->
															</script>
															<%		
						  						}
						  						
						  				}	
						  			
						  		}
				
						   }
		       }
		      
%>

				  			    
<%//============================插入=========================
		      
		      if(flg.equals("insert") && time_ctrl_flg)
		      {		
		      		boolean insert_ctrl_flg = true;   
				      String cx_sql="SELECT HYSID,SQRID,START_TIME,END_TIME,YY_DATE,SYS_DATE FROM TAB_HYSSQ" + 
				      							" WHERE YY_DATE='" + rq +"'" + 
				      							" AND HYSID='" + hys + "'";
				      //out.println(cx_sql);							
							HYSCX.setDbName("UTF8");
						  HYSCX.freeConnection();
						  HYSCX.setCommand(cx_sql);
							HYSCX.executeQuery();
							//out.println(HYSCX.getRowCount());
							if(HYSCX.getRowCount() > 0)
							{ 
			      		while(HYSCX.next())
			       		{
			       			stime=HYSCX.getString(3);
			       			etime=HYSCX.getString(4);
			       			
			       			SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
			       			
			       			Date date_s=sdf.parse(stime);//数据库中的开始时间
									Date date_e=sdf.parse(etime);//数据库中的结束时间
									
									//要插入的开始时间
									Date date_start = sdf.parse(start_time); 
									Date date_end = sdf.parse(end_time);
			       			if (date_start.after(date_s) && date_e.after(date_start) )
									{
												//out.println("can not insert~~开始时间在区间内"+"<br>");
												
												insert_ctrl_flg = false;
												break;
									}
										
									if( date_start.equals(date_s))
									{
												//out.println("can not insert~~开始时间=区间开始时间"+"<br>");
												
												insert_ctrl_flg = false;
												break;		
									}
										
										
									if (date_end.after(date_s) && date_e.after(date_end))
									{
												//out.println("can not insert~~~结束时间在区间内"+"<br>");
											
												insert_ctrl_flg = false;
												break;
									}
										
									if( date_end.equals(date_e))
									
									{
												//out.println("can not insert~~结束时间=区间结束时间"+"<br>");
												
												insert_ctrl_flg = false;
												break;		
									}
									
										
									if (date_s.after(date_start) && date_end.after(date_s) && date_e.after(date_start) && date_end.after(date_e) )
									{
												//out.println("can not insert~~~区间包含于所选时间"+"<br>");
												
												insert_ctrl_flg = false;
												break;
									}
			       							       			
								}
							
							}			
							else
							{				
								insert_ctrl_flg= true;
								out.println(insert_ctrl_flg);
							}
							HYSCX.close();
							

							
				
							if (insert_ctrl_flg)
							{
									String cr_sql = "INSERT INTO TAB_HYSSQ" + 
																	" (HYSID,SQRID,START_TIME,END_TIME,YY_DATE,HYZT,CJRS,SYS_DATE)" + 
																	" VALUES (?,?,?,?,?,?,?,NOW())";
				     
						      HYSSQ.setDbName("UTF8");
						      HYSSQ.freeConnection();
						      HYSSQ.setCommand(cr_sql);
						     
						      HYSSQ.setParameter(1, hys);
						      HYSSQ.setParameter(2, sqr_id);
						      HYSSQ.setParameter(3, start_time);
						      HYSSQ.setParameter(4, end_time);
						      java.sql.Date HYSSQ_DATE= java.sql.Date.valueOf(rq);
						      HYSSQ.setParameter(5, HYSSQ_DATE);
						      HYSSQ.setParameter(6, hyzt);
						      HYSSQ.setParameter(7, cjrs);
						      
						      if(HYSSQ.executeUpdate() <= 0)
						      {	
											%>
											<script>
											<!--
												alert("数据错误，请返回!!");
												
												history.go(-1);// 返回原画面
											-->
											</script>
											<%
		      				}
									else
									{
											%>
											<script>
											<!--
												window.navigate("HYSYL_FRAME.jsp?YyDate=<%=rq%>");
											-->
											</script>				
											<%				
									}
									HYSSQ.close();				
							}
							else
							{
									%>
											<script>
											<!--
												alert("对不起！您预约的时间段会议室非空闲，请预约其他时间或其他会议室！");
												history.go(-1);// 返回原画面
											-->
											</script>				
									<%		
							}
							
							
		      }
%>		      
<%//======================删除===========================
		      if(flg.equals("delete")&& time_ctrl_flg)
		      {							
		      		String sc_sql="DELETE FROM TAB_HYSSQ WHERE YY_DATE='"+ key_hys_rq + "'" +
		      									" AND HYSID='" + key_hys_id +"'" +
		      									" AND START_TIME='" + key_start_time +"'";
											HYSSC.setDbName("UTF8");
											HYSSC.freeConnection();
											HYSSC.setCommand(sc_sql);
											if (HYSSC.executeUpdate() <= 0)
								      {	
													%>
													<script>
													<!--
														alert("数据错误，请返回!!");
														
														history.go(-1);// 返回原画面
													-->
													</script>
													<%
				      				}
											else
											{
													%>
													<script>
													<!--
														
														window.navigate("HYSYL_FRAME.jsp?YyDate=<%=rq%>");
													-->
													</script>				
													<%				
											}
											HYSSC.close(); 														
		      	
		      }
%>		      
<%//==============================更新==============================
					if(flg.equals("update")&& time_ctrl_flg)
					{		
					
							String cx_sql="";
							boolean update_ctrl_flg = true;
							if (rq.equals(key_hys_rq) && hys.equals(key_hys_id))
							{
									 cx_sql="SELECT HYSID,SQRID,START_TIME,END_TIME,YY_DATE,SYS_DATE FROM TAB_HYSSQ" + 
				      									" WHERE YY_DATE='" + rq + "'" + 
						      							" AND HYSID='" + hys + "'" +
						      							" AND START_TIME <>'" + key_start_time + "'" ;
							}
							else
							{
									 cx_sql="SELECT HYSID,SQRID,START_TIME,END_TIME,YY_DATE,SYS_DATE FROM TAB_HYSSQ" + 
				      									" WHERE YY_DATE='" + rq + "'" + 
				      									" AND HYSID='" + hys + "'" ;
							}    							
							//out.println(cx_sql+"<br>");
		      		HYSCX.setDbName("UTF8");
							HYSCX.freeConnection();
							HYSCX.setCommand(cx_sql);
							HYSCX.executeQuery();
							//out.println(HYSCX.getRowCount());
							if(HYSCX.getRowCount() > 0)
							{ 
			      		while(HYSCX.next())
			       		{
			       			stime=HYSCX.getString(3);
			       			etime=HYSCX.getString(4);
			       			SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
			       			Date date_s=sdf.parse(stime);//数据库中的开始时间
									Date date_e=sdf.parse(etime);//数据库中的结束时间
			   
									//要插入的开始时间
									Date date_start = sdf.parse(start_time); 
									Date date_end = sdf.parse(end_time);
									if (date_start.after(date_s) && date_e.after(date_start))
									{
												//out.println("can not insert~~始时间在区间内"+"<br>");
												
												update_ctrl_flg = false;
												break;
									}
										
									if (date_start.equals(date_s))
									{
												//out.println("can not insert~~开始时间=区间开始时间"+"<br>");
												
												update_ctrl_flg = false;
												break;		
									}
										
									if (date_end.after(date_s) && date_e.after(date_end))
									{
												//out.println("can not insert~~~结束时间在区间内"+"<br>");
												
												update_ctrl_flg = false;
												break;
									}
										
									if( date_end.equals(date_e))
									
									{
												//out.println("can not insert~~结束时间=区间结束时间"+"<br>");

												update_ctrl_flg = false;
												break;		
									}
									
										
									if (date_s.after(date_start) && date_end.after(date_s) && date_e.after(date_start) && date_end.after(date_e) )
									{
												//out.println("can not insert~~~区间包含于所选时间"+"<br>");
												
												update_ctrl_flg = false;
												break;
									}						 
									  				       			
								}
								
							}				
							else
							{				
								update_ctrl_flg= true;
								//out.println("可以更改");
							}
							HYSCX.close();				
							
							if (update_ctrl_flg)
							{
									java.sql.Date HYSSQ_DATE= java.sql.Date.valueOf(rq);
									String gx_sql = " UPDATE TAB_HYSSQ SET HYSID='" + hys + "'," +
																	" START_TIME='" + start_time + "'," +
																	" END_TIME='" + end_time + "'," +
																	" YY_DATE='" + HYSSQ_DATE + "'," +
																	" HYZT='" + hyzt + "'," +
																	" CJRS='" + cjrs + "'," +
																	" SYS_DATE=NOW()" +
																	" WHERE SQRID='" + sqr_id + "'" +
																	" AND YY_DATE='" + key_hys_rq +"'" +
																	" AND HYSID='" + key_hys_id + "'" +
																	" AND START_TIME='" + key_start_time + "'";
																			
										//out.println(gx_sql);								
						     
								    HYSGX.setDbName("UTF8");
								    HYSGX.freeConnection();
								    HYSGX.setCommand(gx_sql);
								      
									  if(HYSGX.executeUpdate() <= 0)
							      {	
												%>
												<script>
												<!--
													alert("数据错误，请返回!!");
													
													history.go(-1);// 返回原画面
												-->
												</script>
			
												<%
			      				}
										else
										{
												%>
												<script>
												<!--
													window.navigate("HYSYL_FRAME.jsp?YyDate=<%=rq%>");
												-->
												</script>				
												<%				
										}
										HYSGX.close();			
							}
							else
							{
									%>
											<script>
											<!--
												alert("对不起！您预约的时间段会议室非空闲，请预约其他时间或其他会议室！");
												
												history.go(-1);// 返回原画面
											-->
											</script>				
									<%		
							}       
		    	}
		      			
%>

<%

      }
%>
</body>
</html>