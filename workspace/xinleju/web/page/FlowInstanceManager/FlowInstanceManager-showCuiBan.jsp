<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="X-UA-Compatible"content="IE=8;IE=10">
	<title>催办</title>
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div class="wdtable_title_sp" style="width: 980px;">
		<div class="wdtable_title_sp_t">催办</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<input type="button" class="dfbtn" onclick="window.close();" value="关闭"/>
		</div>
	</div>
	<div class="sp_wrapper" style="width: 980px;">
		<input type="hidden" id="fiId" value="${fiId }"/>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
			<s:iterator value="#request.lstFlowInstanceStep" var="flowInstanceStep" status="flowInstanceStepStatus">
			<tr>
				<th width="100px">需要催办的节点</th>
				<td>
					<s:property value="#flowInstanceStep.displayName"/>
				</td>
			</tr>
			<tr>
				<th width="100px">需要催办的操作人</th>
				<td>
					
						<s:iterator value="#flowInstanceStep.lstFlowInstanceStepWork" var="flowInstanceStepWork">
							<s:iterator value="#flowInstanceStepWork.lstFlowInstanceStepWorkTask" var="flowInstanceStepWorkTask">
								<font style="font-weight:bold">
								  <s:property value="#flowInstanceStepWorkTask.participantUserName"/>
								</font>
								<s:if test="null != #flowInstanceStepWork.participantPostName && '' != #flowInstanceStepWork.participantPostName">
									(<s:property value="#flowInstanceStepWork.participantPostName"/>)
								</s:if>;
							</s:iterator>
						</s:iterator>
						<input type="hidden" id="taskIds"  name="taskIds" value="${taskIds }"/>
				</td>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<s:if test="#request.errorMsg == null ">
						<input type="button" class="dfbtn" id="dealCuiBan" value="催办"/>
					</s:if>
				</td>
			</tr>
			</s:iterator>
		</table>
	</div>
	<script>
		$(function(){
			
			var errMsg = '${errorMsg}';
			if(errMsg){
				alert(errMsg);
			}
			
			$('#dealCuiBan').click(function(){
				var fiId = $('#fiId').val();
				var taskIds = $('#taskIds').val();
				$.post('FlowInstanceManager!cbFlowInstanceStepWorkTask.do',{"taskIds" : taskIds,fiId : fiId},function(data){
					if (data.success){
						alert("催办成功！");
					} else {
						alert(data.msg);
					}
					window.close();
				});
			});
		});
	</script>
</body>
</html>