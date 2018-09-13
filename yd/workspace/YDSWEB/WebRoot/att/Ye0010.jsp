<%--
 * @(#)Ye0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
--%>

<%--
 * 个人考勤信息
 * 
 * @author jinfang
 * @version 1.00 2010/12/07
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0010.js"></script>	
	<title>个人考勤信息</title>
</head>
<body onload="init();">
	<s:include value="../common/commonPage.jsp"></s:include>
	<s:hidden name="txtfYear"/>
	<s:hidden name="txtfMonth"/>
	<div id="content" class="ydscontainer position_rel">
		<div class="span-19">
	       	<div class="span-7 text_right">	
				<input type="button" value="<< 前月" class="btn" id="befmon" onClick="change(-1)"/>
	        </div>
	        <div class="span-5 text_center">
	        	<input type="text" id="selmon" value="${txtfYear}年${txtfMonth}月" class="span-2" onclick="WdatePicker({maxDate:'%y-%M',dateFmt:'yyyy年M月',onpicked:pickedFunc})"/>
	        </div>
	       	<div class="span-7 text_left last">
				<input type="button" value="次月 >>" class="btn" id="aftmon" onClick="change(1)"/>
			</div>
	    </div>
		<s:form id="ye0010InitForm" action="ye0010Init" namespace="/att" method="post" validate="true">
			<div class="span-19 margin_top_10 position_rel">
				<!-- 背景 -->
			  	<span class="position_abs kaoqinBg text_center float_l" style="z-index:-1" id="bgmonth"></span>
				<!-- 日历 -->
				<div class="span-19 last" id="caldiv">
					<table cellspacing="1" cellpadding="1" id="cal" class="datagrid5">
			            <tbody>
			                <tr class="text_center font_weight_b ">
			                    <td class="bgclr_ffe6ff percent_14 font_size_14 color_pink">SUN</td>
			                    <td class="percent_14 font_size_14">MON</td>
			                    <td class="percent_14 font_size_14">TUE</td>
			                    <td class="percent_14 font_size_14">WED</td>
			                    <td class="percent_14 font_size_14">THE</td>
			                    <td class="percent_14 font_size_14">FRI</td>
			                    <td class="bgclr_d9ffe2 percent_14 font_size_14 color_pink">SAT</td>
			                </tr>
			                <s:set var="lines" value="((wkDay+days-1)*2+13)/14-1"/>
			                <s:iterator begin="0" end="#lines" status="sLine">
			                	<tr class="text_center h_96">
			                		<s:iterator begin="0" end="6" status="sDay">
			                			<s:set var="dayNum" value="#sLine.index*7+#sDay.index-wkDay+1"/>
			                			<s:if test="(#sDay.index+1<wkDay && #sLine.index==0) || (#dayNum>=days)">
			                				<td class="<s:if test="#sDay.index==0">bgclr_ffe6ff</s:if><s:elseif test="#sDay.index==6">bgclr_d9ffe2</s:elseif>"></td>
			                			</s:if>
			                			<s:else>
			                				<td class="<s:if test="#sDay.index==0">bgclr_ffe6ff</s:if><s:elseif test="#sDay.index==6">bgclr_d9ffe2</s:elseif>">
			                					<!-- 日期 -->
				                				<div class="font_weight_b font_size_14 position_rel <s:if test="ye0010CalInfoList[#dayNum].dayColor!=null">${ye0010CalInfoList[dayNum].dayColor}</s:if><s:elseif test="(#sDay.index+1)%7<2||(#sDay.index+1)%7>6">color_pink</s:elseif>">
				                					${dayNum+1}
				                				</div>
			                					<!-- 旷工、漏考、考勤更正-->
				                				<div class="line_calline">
				                					<s:if test="ye0010CalInfoList[#dayNum].attCorHref!=null">
				                						<a href="#this" onclick='popInnerPage4("${ye0010CalInfoList[dayNum].appIdCor}","${ye0010CalInfoList[dayNum].year}","${ye0010CalInfoList[dayNum].month}","${ye0010CalInfoList[dayNum].day}");'>
					                						<span class="${ye0010CalInfoList[dayNum].attCorColor}">
					                							<s:if test="ye0010CalInfoList[#dayNum].attCorInfo==null">&nbsp;</s:if>
					                							<s:else>${ye0010CalInfoList[dayNum].attCorInfo}</s:else>
					                						</span>
				                						</a>
				                					</s:if>
				                					<s:else>
				                						<span class="${ye0010CalInfoList[dayNum].attCorColor}">
				                							<s:if test="ye0010CalInfoList[#dayNum].attCorInfo!=null">${ye0010CalInfoList[dayNum].attCorInfo}</s:if>
				                							<s:else>&nbsp;</s:else>
				                						</span>
				                					</s:else>
				                				</div>
			                					<!-- 上午、整天休假-->
				                				<div class="line_calline">
				                					<s:if test="ye0010CalInfoList[#dayNum].amRestHref!=null">
				                						<a href="#this" onclick='popInnerPage3("${ye0010CalInfoList[dayNum].appRestId}");'>
						                					<span class="${ye0010CalInfoList[dayNum].amRestColor}">
						                						<s:if test="ye0010CalInfoList[#dayNum].amRestInfo!=null">${ye0010CalInfoList[dayNum].amRestInfo}</s:if>
				                								<s:else>&nbsp;</s:else>
						                					</span>
						                				</a>
				                					</s:if>
				                					<s:else>
						                				<span class="${ye0010CalInfoList[dayNum].amRestColor}">
					                						<s:if test="ye0010CalInfoList[#dayNum].amRestInfo!=null">${ye0010CalInfoList[dayNum].amRestInfo}</s:if>
			                								<s:else>&nbsp;</s:else>
						                				</span>
				                					</s:else>
				                				</div>
			                					<!-- 下午休假-->
				                				<div class="line_calline">
				                					<s:if test="ye0010CalInfoList[#dayNum].pmRestHref!=null">
						                				<a href="#this" onclick='popInnerPage3("${ye0010CalInfoList[dayNum].appRestIdAddi}");'>
						                					<span class="${ye0010CalInfoList[dayNum].pmRestColor}">
						                						<s:if test="ye0010CalInfoList[#dayNum].pmRestInfo!=null">${ye0010CalInfoList[dayNum].pmRestInfo}</s:if>
		                										<s:else>&nbsp;</s:else>
						                					</span>
						                				</a>
				                					</s:if>
				                					<s:else>
					                					<span class="${ye0010CalInfoList[dayNum].pmRestColor}">
					                						<s:if test="ye0010CalInfoList[#dayNum].pmRestInfo!=null">${ye0010CalInfoList[dayNum].pmRestInfo}</s:if>
	                										<s:else>&nbsp;</s:else>
					                					</span>
				                					</s:else>
				                				</div>
			                					<!-- 实际出勤日时-->
				                				<div class="text_right line_calline">
				                					<s:if test="ye0010CalInfoList[#dayNum].rstartHref!=null">
				                						<a href="#this" onclick='popInnerPage4("${ye0010CalInfoList[dayNum].appIdCor}","${ye0010CalInfoList[dayNum].year}","${ye0010CalInfoList[dayNum].month}","${ye0010CalInfoList[dayNum].day}");'>
						                					<span class="${ye0010CalInfoList[dayNum].rstartColor}">
						                						<s:if test="ye0010CalInfoList[#dayNum].rstartTime!=null">${ye0010CalInfoList[dayNum].rstartTime}</s:if>
		                										<s:else>&nbsp;</s:else>
						                					</span>
						                				</a>
				                					</s:if>
				                					<s:else>
					                					<span class="${ye0010CalInfoList[dayNum].rstartColor}">
					                						<s:if test="ye0010CalInfoList[#dayNum].rstartTime!=null">${ye0010CalInfoList[dayNum].rstartTime}</s:if>
	                										<s:else>&nbsp;</s:else>
					                					</span>
				                					</s:else>
				                				</div>
						                        <div class="text_right line_calline">
			                						<!-- 加班-->
						                            <div class="float_l w_65">
					                					<span class="${ye0010CalInfoList[dayNum].overTimeColor}">
					                						<s:if test="ye0010CalInfoList[#dayNum].overTimeInfo!=null">${ye0010CalInfoList[dayNum].overTimeInfo}</s:if>
		                									<s:else>&nbsp;</s:else>
					                					</span>
					                				</div>
			                						<!-- 实际退勤日时-->
							                        <div class="float_r w_33">
					                					<s:if test="ye0010CalInfoList[#dayNum].rendHref!=null">
				                							<a href="#this" onclick='popInnerPage4("${ye0010CalInfoList[dayNum].appIdCor}","${ye0010CalInfoList[dayNum].year}","${ye0010CalInfoList[dayNum].month}","${ye0010CalInfoList[dayNum].day}");'>
								                            	<span class="${ye0010CalInfoList[dayNum].rendColor}">
								                            		<s:if test="ye0010CalInfoList[#dayNum].rendTime!=null">${ye0010CalInfoList[dayNum].rendTime}</s:if>
								                            		<s:else>&nbsp;</s:else>
								                            	</span>
							                				</a>
					                					</s:if>
					                					<s:else>
							                            	<span class="${ye0010CalInfoList[dayNum].rendColor}">
							                            		<s:if test="ye0010CalInfoList[#dayNum].rendTime!=null">${ye0010CalInfoList[dayNum].rendTime}</s:if>
							                            		<s:else>&nbsp;</s:else>
							                            	</span>
					                					</s:else>
					                				</div>
						                        </div>
			                				</td>
			                			</s:else>
			                		</s:iterator>
			                	</tr>
			                </s:iterator>
						</tbody>
					</table>
				</div>
		  	</div>
			<div id="detailDate">
	    		<!--本月小计-->
	        	<div class="span-4 text_center font_weight_b">本月小计</div>
	            <div class="span-5 last">
	            	<div class="span-2 last" >平日加班</div>
	            	<div class="span-2 text_right padding_right_10" id="monworkot">
	            		<s:if test="Ye0010CondA.monWorkdayOtMin!=null"><s:label name="Ye0010CondA.monWorkdayOtMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">休日加班</div>
	            	<div class="span-2 text_right padding_right_10" id="monrestot">
	            		<s:if test="Ye0010CondA.monErestMin!=null"><s:label name="Ye0010CondA.monErestMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">迟到时间</div>
	            	<div class="span-2 text_right padding_right_10" id="monbelate">
	            		<s:if test="Ye0010CondA.monBelateMin!=null"><s:label name="Ye0010CondA.monBelateMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">迟到次数</div>
	            	<div class="span-2 text_right padding_right_10" id="monbelatecnt">
	            		<s:if test="Ye0010CondA.monBelateCnt!=0"><s:label name="Ye0010CondA.monBelateCnt"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">次</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">早退时间</div>
	            	<div class="span-2 text_right padding_right_10" id="monlveear">
	            		<s:if test="Ye0010CondA.monLveEarlyMin!=null"><s:label name="Ye0010CondA.monLveEarlyMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">早退次数</div>
	            	<div class="span-2 text_right padding_right_10" id="monlveearcnt">
	            		<s:if test="Ye0010CondA.monLveEarlyCnt!=0"><s:label name="Ye0010CondA.monLveEarlyCnt"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">次</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">迟到早退</div>
	            	<div class="span-2 text_right padding_right_10" id="monlate">
	            		<s:if test="Ye0010CondA.monLateTotalMin!=null"><s:label name="Ye0010CondA.monLateTotalMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">其他欠时</div>
	            	<div class="span-2 text_right padding_right_10" id="monoutdays">
	            		<s:if test="Ye0010CondA.monOtherMin!=null"><s:label name="Ye0010CondA.monOtherMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	        	<!--全年合计-->
	        	<div class="span-4 text_center font_weight_b margin_top_10">全年合计</div>
	            <div class="span-5 last">
	            	<div class="span-2 last">平日加班</div>
	            	<div class="span-2 text_right padding_right_10" id="yearrestot">
	            		<s:if test="Ye0010CondA.yearWorkdayOtMin!=null"><s:label name="Ye0010CondA.yearWorkdayOtMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">休日加班</div>
	            	<div class="span-2 text_right padding_right_10" id="yearrestot">
	            		<s:if test="Ye0010CondA.yearErestMin!=null"><s:label name="Ye0010CondA.yearErestMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">迟到次数</div>
	            	<div class="span-2 text_right padding_right_10" id="yearbelatecnt">
	            		<s:if test="Ye0010CondA.yearBelateCnt!=0"><s:label name="Ye0010CondA.yearBelateCnt"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">次</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">早退次数</div>
	            	<div class="span-2 text_right padding_right_10" id="yearlveearcnt">
	            		<s:if test="Ye0010CondA.yearLveEarlyCnt!=0"><s:label name="Ye0010CondA.yearLveEarlyCnt"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">次</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">迟到早退</div>
	            	<div class="span-2 text_right padding_right_10" id="yearlate">
	            		<s:if test="Ye0010CondA.yearLateTotalMin!=null"><s:label name="Ye0010CondA.yearLateTotalMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">其他欠时</div>
	            	<div class="span-2 text_right padding_right_10" id="yearoutdays">
	            		<s:if test="Ye0010CondA.yearOtherMin!=null"><s:label name="Ye0010CondA.yearOtherMin"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">剩余年休</div>
	            	<div class="span-2 text_right padding_right_10" id="annrestremain">
	            		<s:if test="Ye0010CondA.annRestRemain!=null"><s:label name="Ye0010CondA.annRestRemain"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">日</div>
	            </div>
	            <div class="span-5 last">
	            	<div class="span-2 last">剩余换休</div>
	            	<div class="span-2 text_right padding_right_10" id="erestremain">
	            		<s:if test="Ye0010CondA.eRestRemain!=null"><s:label name="Ye0010CondA.eRestRemain"></s:label></s:if>
	            		<s:else><s:label>&nbsp;</s:label></s:else>
	            	</div>
	            	<div class="span-1 text_left last">时:分</div>
				</div>
	            <!-- 弹出层：x休假申请 -->
	            <div class="none" id="div_att_rest" >  
					<iframe id="restPage" frameBorder="0" class="overflow_hd"></iframe>
	            </div>  
	            <!-- 弹出层：考勤更正申请 -->
	            <div class="none" id="div_att_correct">
					<iframe id="myInnerPage" frameBorder="0" class="overflow_hd"></iframe>
    			</div>
	            <div class="span-5 margin_top_10 last">
	            	<input type="button" value="休假申请" class="span-2 btn" onClick="popInnerPage1();" id="pervacation"/>
	            </div>
	            <div class="span-5 margin_top_4 last">
	              	<input type="button" value="考勤更正" class="span-2 btn" onClick="popInnerPage2();" id="attcorrect"/>
	            </div> 
	      	</div>
		</s:form>
	</div>
	<s:hidden id="loginId" name="Ye0010CondA.empId"></s:hidden>
</body>
</html>
