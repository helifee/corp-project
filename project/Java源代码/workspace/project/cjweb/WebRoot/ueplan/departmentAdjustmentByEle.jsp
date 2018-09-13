<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用能计划-部门调整(用电)</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>
	
	<script src="common/js/jquery-1.5.2.min.js"></script>
	<script src="common/js/common.js"></script>
	<script type="text/javascript">
		function test(obj,remaining){
			onlyEnterNumbers($(obj));
			var totalsum = 0;
			//循环所有设定总量的输入框，并值相加
			$.each($("input[name=total]"),function(){
				var sum = Number(totalsum) + Number($(this).val());
				if (Number(remaining) < Number(sum)){
					alert("设定的总量不能大于剩余量，请重新输入！");
					$(this).val("");
					return false;
				}
				totalsum = sum;
			});
			//剩余量-所有设定的总量值
			var newremaining = Number(remaining) - Number(totalsum);
			$("#remaining").text(newremaining);
		}
	</script>
  </head>
  
  <body>
  	<table align="center">
  		<tr>
  			<td><jsp:include page="head.jsp"></jsp:include></td>
  		</tr>
    	<tr>
    		<td>
	    		<a>用电量</a>&nbsp;&nbsp;
	    		<a href="ueplan/departmentAdjustmentByWater.jsp?type=water">用水量</a>
    		</td>
    	</tr>
		<tr>
			<td>
				<table align="center">
					<tr>
						<td>总量：<span class="underline">10000</span>&nbsp;千瓦时</td>
						<td>分配量：<span class="underline">8000</span>&nbsp;千瓦时</td>
						<td>剩余量：<span id="remaining" class="underline">2000</span>&nbsp;千瓦时</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<br />
				<form id="departmentAdjustmentForm" action="" method="post">
					<table class="table">
						<tr>
							<td>部门名称</td>
							<td>累计用量(千瓦时)</td>
							<td>累计用量占比</td>
							<td>累计时间占比</td>
							<td>剩余总量(千瓦时)</td>
							<td>原计划总量(千瓦时)</td>
							<td>调整设置</td>
						</tr>
						<tr>
							<td>部门A</td>
							<td>10000</td>
							<td>90%</td>
							<td>90%</td>
							<td>2000</td>
							<td>8000</td> 
							<td>
								设定总量：<input name="total" size="10px;" onkeyup="javascript:test($(this),'2000');" />
								<input type="reset" value="取消"/>
							</td>
						</tr>
						<tr>
							<td>部门B</td>
							<td>20000</td>
							<td>90%</td>
							<td>90%</td>
							<td>12000</td>
							<td>18000</td> 
							<td>
								设定总量：<input name="total" size="10px;" onkeyup="javascript:test($(this),'2000');"/>
								<input type="button" value="取消"/>
							</td>
						</tr>
						<tr>
							<td colspan="7" align="right">
								<br/>
								<input type="submit" value="确定"/>
								<input type="reset" value="取消"/>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</td>
						</tr>
						
					</table>
				</form>
			</td>
		</tr>
		<tr>
			<td>
				<p>&nbsp;</p>
				调整日志<br />
				选择部门：
				<select id="department">
					<option>部门A</option>
					<option>部门B</option>
				</select>
				<table class="table">
					<tr>
						<td>序号</td>
						<td>调整日期</td>
						<td>调整部门</td>
						<td>调整后总量(千瓦时)</td>
					</tr>
					<tr>
						<td>1</td>
						<td>2011-06-11</td>
						<td>部门A</td>
						<td>10000</td>
					</tr>
					<tr>
						<td>2</td>
						<td>2011-06-12</td>
						<td>部门B</td>
						<td>20000</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
  </body>
</html>
