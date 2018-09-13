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
    
    <title>用能计划-总量调整(用电)</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>
	
	<script src="common/js/jquery-1.5.2.min.js"></script>
	<script src="common/js/common.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$("#newTotal").keyup(function(){
				//验证输入框只能输入数字（小数点也不能输入）
				onlyEnterNumbers($(this));
				var total = $(this).val();
				var price = $("#price").val();
				var amount = Number(total) * Number(price);
				$("#amount").text(amount);
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
	    		<a>用电量 </a>&nbsp;&nbsp;
	    		<a href="ueplan/totalAdjustmentInit.do?type=water">用水量 </a>
    		</td>
    	</tr>
    	<tr>
    		<td>
				<form id="totalAdjustmentForm" action="" method="post">
					<table>
						<tr>
							<td width="250px;">
								上&nbsp;次&nbsp;&nbsp;总&nbsp;量：<span class="underline">${totalAmount[0].planAmount }</span>&nbsp;千瓦时
							</td>
							<td width="250px;">
								累计用量：<span class="underline">${totalAmount[0].actualAmount }</span>&nbsp;千瓦时
							</td>
							<td width="250px;">
								累计用量占比：<span class="underline">${totalAmount[0].actualRate }</span>
							</td>
							<td width="250px;">
								时间占比：<span class="underline">${totalAmount[0].timeRate }</span>
							</td>
						</tr>
						<tr>
							<td>
								设定新总量：<input id="newTotal" name="newTotal" size="10px;"/>&nbsp;千瓦时
							</td>
							<td>
								单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								价：<input id="price" name="price" value="${price }" size="8px;" disabled="disabled"/>
								元/千瓦时
							</td>
							<td colspan="2">
								金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								额：<span id="amount" class="underline">0</span>&nbsp;万元
							</td>
						</tr>
						<tr>
							<td>
								<input type="submit" value="确定"/>
								<input type="reset" value="取消"/>
							</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
					</table>
					<input id="showtype" name="showtype" type="hidden"/>
				</form>
				<p>&nbsp;</p>
			</td>
		</tr>
		<tr>
			<td>
				<table class="table">
					<tr>
						<td>部门名称 </td>
						<td>累计用量(千瓦时)</td>
						<td>累计用量占比 </td>
						<td>所用时间占比 </td>
						<td>剩余用量(千瓦时)</td>
						<td>计划总量(千瓦时)</td>
					</tr>
					<c:forEach items="${dptAmount }" var="dptInfo">
						<tr>
							<td>${dptInfo.deptName }</td>
							<td>${dptInfo.actualAmount }</td>
							<td>${dptInfo.actualRate }</td>
							<td>${dptInfo.timeRate }</td>
							<td>${dptInfo.remainAmount }</td>
							<td>${dptInfo.planAmount }</td>
						</tr>
					</c:forEach>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<p>&nbsp;</p>调整日志：
				<table id="adjustmentLog" class="table">
					<tr>
						<td>序号 </td>
						<td>调整日期</td>
						<td>调整后总量(千瓦时)</td>
						<td style="display:none">操作人</td>
					</tr>
					<c:forEach items="${adjustLog }" var="log">
						<tr>
							<td>${log.id }</td>
							<td>${log.date }</td>
							<td>${log.adjustedAmount }</td>
						</tr>
					</c:forEach>
				</table>
			</td>
		</tr>
	</table>
  </body>
</html>
