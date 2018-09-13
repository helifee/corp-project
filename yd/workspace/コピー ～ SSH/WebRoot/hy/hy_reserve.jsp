<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>


<html>	
	<head>
		<title>会议室预约</title>
		
		<!-- import the calendar script -->
		<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="js/_date.js"></script>
		
		<script type="text/javascript">
		<!--
			function set_yuyue_type(type) {
				document.getElementById("yuyueleixing").innerHTML = type;
			}
		//-->
		</script>
		
		<script type="text/javascript">
		<!--
			function display_enddate() {	//显示结束日期
				var enddate = window.document.getElementById('enddate');
			  	if(enddate.style.display == 'none') {
			  		enddate.style.display = '';
			  	}
			}

			function hidden_enddate() {		//隐藏结束日期
				var enddate = window.document.getElementById('enddate');
			  	if(enddate.style.display == '') {
			  		enddate.style.display = 'none';
			  	}
			}
		//-->
		</script>
	</head>
	
	<body bgcolor="#ecf6ff">
		<p align="center"><font size="4" color="green"><strong>会议室预约</strong></font></p>
		<s:form id="hysyy" name="hysyy" method="post" action="saveYuyueData" theme="simple">			 
				<table align="center" cellspacing="10" width="520">
				<tr>
					<td width="70"><s:radio id="dangri" name="yuyueinfo.yuyuetype" list="#{0 : '当日'}" 
											onclick="hidden_enddate();"></s:radio>
					</td>
				</tr>
				
				<tr>
					<td><s:radio name="yuyueinfo.yuyuetype" list="#{1 : '周期'}" 
								onclick="display_enddate();"></s:radio></td>
					<td width="359">
						<table width="350">
							<tr>
								<td width="53">
									<s:radio id="meiri" name="yuyueinfo.zhouqitype" list="#{1 : '每日'}">
									</s:radio>
								</td>
								<td width="285"></td>
							</tr>
						</table>
					</td>
				</tr>
				
				<tr>
					<td></td>
					<td>
						<table width="350">
							<tr>
								<td width="53">
									<s:radio name="yuyueinfo.zhouqitype" list="#{2 : '每周'}">
									</s:radio>
								</td>
								<td width="285">
									<s:checkbox name="yuyueinfo.mon" fieldValue="2" ></s:checkbox>星期一
									<s:checkbox name="yuyueinfo.tue" fieldValue="3" ></s:checkbox>星期二
									<s:checkbox name="yuyueinfo.wen" fieldValue="4" ></s:checkbox>星期三
								</td>
							</tr>
						</table>
					</td>
				</tr>
				
				<tr>
					<td></td>
					<td>
						<table width="350">
							<tr>
								<td width="53"></td>
								<td width="285">
										<s:checkbox name="yuyueinfo.thu" fieldValue="5" ></s:checkbox>星期四
										<s:checkbox name="yuyueinfo.fri" fieldValue="6" ></s:checkbox>星期五		
								</td>
							</tr>
						</table>						
					</td>
				</tr>
				
				<tr>
					<td></td>
					<td>
						<table width="350">
							<tr>
								<td width="53">
									<s:radio name="yuyueinfo.zhouqitype" list="#{3 : '每月'}">
									</s:radio>
								</td>
								<td width="285">
									<s:textfield name="yuyueinfo.day" cssStyle="width:25px" maxlength="2"></s:textfield>&nbsp;日
									<s:radio name="yuyueinfo.qianhou" list="#{1 : '遇休日提前'}"></s:radio>
									<s:radio name="yuyueinfo.qianhou" list="#{0 : '遇休日后延'}"></s:radio>
								</td>
							</tr>
						</table>								
					</td>
				</tr>
								
				<tr>
					<td>预约类型</td>
					<td><label id="yuyueleixing"></label></td>
				</tr>
					   
				<tr>
					<td >日期</td>
				    <td ><s:textfield id= "yyDate" name="yuyueinfo.startdate" cssStyle="width:80px; text-align:center" maxlength ="10" 
				    					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})" 
				    					theme="simple" readonly="true">
				    	</s:textfield>
				    	<span id="enddate" style="display:none">&nbsp;～&nbsp;
				    		<s:textfield name="yuyueinfo.enddate" cssStyle="width:80px; text-align:center" maxlength ="10" 
				    					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
				    					theme="simple" >
				    		</s:textfield>
				    	</span>
				    	
					</td>	    			
				</tr>
				
				<tr>	
					<td >会议室</td>
					<td >
					 <s:select name="yuyueinfo.hys" list="hysList" listKey="Id" listValue="Hysmc" headerKey="0" headerValue="-------------------请选择-------------------">
					 </s:select>
					 <s:property value="errormsg" />
					</td>
				</tr>
				
				<tr>
					<td >会议主题</td>
				    <td ><s:textfield name="yuyueinfo.hyzt" cssStyle="width:267px" maxlength = "100" ></s:textfield></td>
				</tr>
				
				<tr>			
					<td >时间 </td>
				    <td >
						<s:select list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', '15':'15', '16':'16', '17':'17', '18':'18', '19':'19',
										'20':'20', '21':'21'}" name="yuyueinfo.start_hour" cssStyle="width:52px">
						</s:select>
				     	：
						<s:select list="#{'00':'00', '30':'30'}" name="yuyueinfo.start_minute" cssStyle="width:52px">
						</s:select>
				      	～
						<s:select list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', '15':'15', '16':'16', '17':'17', '18':'18', '19':'19',
										'20':'20', '21':'21', '22':'22'}" name="yuyueinfo.end_hour" cssStyle="width:52px">
						</s:select>
						：
						<s:select list="#{'00':'00', '30':'30'}" name="yuyueinfo.end_minute" cssStyle="width:52px">
						</s:select>
					</td>
				</tr>
				
				<tr>
					<td >申请人</td>		
				    <td ><s:textfield name="yuyueinfo.sqr" cssStyle="width:115px" maxlength="5" readonly="true"></s:textfield></td>  
				</tr>
				
				<tr>
					<td>参加人</td>
				    <td><s:textfield name="yuyueinfo.cjr" cssStyle="width:267px" maxlength="10" readonly="true"></s:textfield>
				    	<input type="button" name="select" value="选择" style="width:70px" onClick="location.href='参加会议人员一览画面.html'">
					</td>
				</tr>
				
				<tr>
					<td >参加人数</td>
				    <td ><s:textfield name="yuyueinfo.cjrs" cssStyle="width:115px" maxlength="2" readonly="true"></s:textfield></td>
				</tr>		
			</table>
			<br />
			
			<table align="center" >
				<tr>
					<td align="center"><input type="submit" style="width:70px" id="insert" name="insert" value="预约" onclick=""></td>		
				</tr>				   
			</table>
			
			<table align="center" style="width:500px">
				<tr>
					<td align="right">
						<s:url action="conferenceinit" id="conferencenameUrl"></s:url>
						<font size="3"><s:a href="%{conferencenameUrl}">返回</s:a></font>
					</td>
				</tr>
			</table>
			
		</s:form>
		
	</body>	
</html>
