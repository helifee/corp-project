<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用能计划-考核管理(用水)</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>
	
	<script src="common/js/common.js"></script>
	<script src="common/js/jquery-1.5.2.min.js"></script>
	<script src="/cjweb/common/plugin/My97DatePicker/WdatePicker.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$("#date").change(function(){
				assessForm.submit();
			});
			
			$("#depart").change(function(){
				assessForm.submit();
			});
		})
	</script>
  </head>
  
  <body>
  	<table align="center">
  		<tr>
  			<td><jsp:include page="head.jsp"></jsp:include></td>
  		</tr>
    	<tr>
    		<td>
	    		<a href="ueplan/assessManager.do?type=ele">用电量</a>&nbsp;&nbsp;
	    		<a>用水量</a>
	    	</td>
    	</tr>
    	<tr>
    		<td>
				<form id="assessForm" action="ueplan/assessManager.do?type=water" method="post">
					<table class="t_table">
						<tr>
							<td>用能提示：</td> 
						</tr>
						<tr>
							<td colspan="2">
								<div id="uetip" class="borderlines" style="width:300px;">
									<c:forEach items="${usagePromptList }" var="upList">
										${upList.departName }部门  ${upList.month }月份 用水量 过快<br />
									</c:forEach>
								</div>
							</td>
						</tr>
						<tr> <td colspan="2"> <br /> </td> </tr>
						<tr>
							<td colspan="2">
								选择月份：
								<input id="date" name="date" class="Wdate" onchange="" onfocus="WdatePicker({dateFmt:'yyyy-M'})" value="${date }"/>
							</td> 
						</tr>
						<tr>
							<td colspan="2">
								<table width="100%" class="table">
									<tr>
										<td>部门名称</td>
										<td>计划量(立方米)</td>
										<td>实际量(立方米)</td>
										<td>偏差量(立方米)</td>
										<td>偏差比例</td>
									</tr>
									<c:forEach items="${departmentUseInfoList }" var="dpList">
										<tr class="departUsageInfo">
											<td>${dpList.name }</td>
											<td>${dpList.planUsage }</td>
											<td>${dpList.actualUsage }</td>
											<td>${dpList.deviationAmount }</td>
											<td>${dpList.deviationRate }</td>
										</tr>
									</c:forEach>
								</table>
							</td> 
						</tr>
						<tr> <td colspan="2"> <br /> </td> </tr>
						<tr>
							<td colspan="2">
								选择部门：
								<select id="depart" name="depart">
									<c:forEach items="${departmentList }" var="depart">
										<option value="${depart.id }">${depart.name }</option>
									</c:forEach>
								</select>
							</td> 
						</tr>
						<tr>
							<td colspan="2">
								<table width="100%" class="table">
									<tr>
										<td>表计名称</td>
										<td>计划量(立方米)</td>
										<td>实际量(立方米)</td> 
										<td>偏差量(立方米)</td>
										<td>偏差比例</td>
									</tr>
									<c:forEach items="${meterUseInfoList }" var="meterList">
										<tr>
											<td>${meterList.name }</td>
											<td>${meterList.planUsage }</td>
											<td>${meterList.actualUsage }</td>
											<td>${meterList.deviationAmount }</td>
											<td>${meterList.deviationRate }</td>
										</tr>
									</c:forEach>
								</table>
							</td>
						</tr>
					</table>
				</form>
    		</td>
    	</tr>
	</table>
  </body>
</html>
