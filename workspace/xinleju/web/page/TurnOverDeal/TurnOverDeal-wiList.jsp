<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	
	
</head>
<body>
	<s:form action="TurnOverDeal!wiList" id="frm">
		<s:hidden id="partyEntityId" name="partyEntityId" value="%{#request.partyEntityId}"></s:hidden>
		<s:hidden id="partyEntityName" name="partyEntityName" value="%{#request.partyEntityName}"></s:hidden>
		<s:hidden id="userName" name="userName" value="%{#request.userName}"></s:hidden>
		<s:hidden name="start"></s:hidden>
		<!-- 主区域工具栏 start-->
		<div class="top_tool_box">
			<span style="float: left;">
			        原流程参与者：
				<s:hidden id="fromPartyIdVar" name="fromPartyIdVar" value="%{#request.fromPartyIdVar}"></s:hidden>
				<s:textfield name="fromPartyVar" id="fromPartyVar" placeholder="请选择" value="%{#request.fromPartyVar}" cssClass="input125" cssStyle="width: 200px; color:gray;" readonly="true"></s:textfield>
				<input name="button" type="button" class="dfbtn_chs" id="button" value="..." onclick="choosePartySonWindow('fromPartyIdVar','fromPartyVar');" style="vertical-align:middle;"/>
				<input name="button" type="button" class="dfbtn_chs" id="button" value="清空" onclick="chosePartClearWindow();" style="vertical-align:middle;"/>
				<img src="images/icon_search.png" width="24" height="22" align="absmiddle" title="查询" onclick="javascript:queryWi();return false;" border="0" style="cursor: pointer; vertical-align: middle;" />
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="images/forward.png" width="40px" height="24px" align="absmiddle" title="将原流程参与者替换为新流程参与者" onclick="return false;" border="0" style="vertical-align:middle;">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				新流程参与者：
				<s:hidden id="toPartyIdVar" name="toPartyIdVar" value="%{#request.toPartyIdVar}"></s:hidden>
				<s:textfield name="toPartyVar" id="toPartyVar" placeholder="请选择" cssClass="input125" value="%{#request.toPartyVar}" cssStyle="width: 200px; color:gray;" readonly="true"></s:textfield>
				<input name="button" type="button" class="dfbtn_chs" id="button" value="..." onclick="choosePartySonWindow('toPartyIdVar','toPartyVar');" />
				<input name="button" type="button" class="dfbtn_chs" id="button" value="清空" onclick="document.getElementById('toPartyVar').value='';document.getElementById('toPartyIdVar').value='';" />
			</span>
			<input id="replacePartyButton" name="button" type="button" class="dfbtn_chs" id="button" value="替换参与者" onclick="replaceWiParticipants('toPartyIdVar','toPartyVar','fromPartyIdVar','fromPartyVar');return false;" style="vertical-align:middle;"/>
		</div>
	 		<div  id="replacePartyPost" class="top_tool_box">

		
		</div>	
		<input type="hidden" id="userPostDivHtml_default" value="${userPostDivHtml}"/>
		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="5px"><input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" /></th>
				<th width="80px">应用名称</th>
				<th width="100px">业务类型</th>
				<th width="280px">流程名称</th>
				<th width="150px;">所属公司</th>
				<th width="100px;">发起人</th>
				<th width="150px;">开始时间</th>
			</tr>
			<s:iterator value="page.items" id="item">
				<tr>
					<td align="center"><input name="ids" type="checkbox" value="${item[0]}" /></td>
					<td align="center"><s:property value="#item[1]" /></td>
					<td><s:property value="#item[2]" /></td>
					<td><a href="#" onclick="openwindow('FlowInstanceApprove!detail.do?fiId=${item[0]}','fi_wi',1270,0)"><s:property value="#item[3]" /></a></td>
					<td><s:property value="#item[4]" /></td>
					<td><s:property value="#item[5]" /></td>
					<td><s:date name="#item[6]" format="yyyy-MM-dd HH:mm:ss"/></td>
				</tr>
			</s:iterator>
		</table>
		<div class="page">
			<div style="float: left;">
				
			</div>
			<app:PageTag actionName="TurnOverDeal!wiList"></app:PageTag>
		</div>
	</s:form>
</body>
<script type="text/javascript" src="page/TurnOverDeal/TurnOverDeal-wiList.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript">
     $(function(){
        var fromPartyIdVar =$("#fromPartyIdVar").val();
        if(fromPartyIdVar){
        	var  id=fromPartyIdVar.replace("Part_","");
	 		$.ajax({
	 			url : 'FlowAuth!getUserJobs.do',
	 			data : {userId : id},
	 			dataType : "json",
	 			success :function(data){
	 				var replacePartyPost = $("#replacePartyPost");
	 				replacePartyPost.html("");
	 				for ( var idx = 0; idx < data.length; idx++ ) {
	 					if(idx!=0 && (idx*1)%9==0){
	 						replacePartyPost.append($("<input type='checkbox' name='jobs' value='" + data[idx].id + "' />&nbsp;<span>" + data[idx].name + "</span></br>") );
	 					}else{
	 						replacePartyPost.append($("<input type='checkbox' name='jobs' value='" + data[idx].id + "' />&nbsp;<span>" + data[idx].name + "</span>") );
	 					}
	 				}
	 				$("#" + idDomId).val(idVar);
	 				$("#" + nameDomId).val(nameVar);
	 			},
	 			error : function(){
	 				alert("操作失败！");
	 			}
	 		});
	    	 
        }

     });
     function chosePartClearWindow(){
     	document.getElementById('fromPartyVar').value='';
     	document.getElementById('fromPartyIdVar').value=''; 
     	$("#replacePartyPost").html('');
    }

</script>
</html>
