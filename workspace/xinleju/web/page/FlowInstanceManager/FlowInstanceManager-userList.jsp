

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
        <title>用户选择</title>
        <link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="css/xy_cost.css"   />
        
        <script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="js/jquery/jquery.json-2.2.js"></script>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/Orgn/Orgn-userList.js"></script>
		<%--<script src="js/mergeRowsCell.js"></script>
		--%><script type="text/javascript">
		  $(function(){
			 $('#replace').click(function(){
				 $.post('FlowInstanceManager!replaceFlowInstanceStepWorkTask.do',
						 {replaceUserId : $('input[name=l_user]:checked').val(),
					 	  replacedUserId : $('input[name=replacedItem]:checked').val()},function(data){
				 	 if (data.msg){
						 alert(data.msg);
					 }
				 	 location.href = location.href;
				});
			 });
		  });
		</script>
    </head>
    <body>
        <s:form id="frm" name="frm" action="FlowInstanceManager!userList.do" method="post">
            <s:hidden name="start"></s:hidden>
            <input type="hidden" name="orgnId" id="orgnId" value="${orgnId}"/>
            <input type="hidden" name="fiId" id="fiId" value="${fiId}"/>
            <table id="tbl_user" width="100%" border="0" cellspacing="0" cellpadding="0">     
                <tr>
					<td width="48%" valign="top">
					   <div class="t_title" style='margin-top: 5px; margin-bottom:5px;'>
					      <div class="hh">可选人员</div>
					    </div> 
					</td>
					<td width="4%">
					
					</td>
					<td width="48%" valign="top">
					   <div class="t_title" style='margin-top: 5px'>
					      <div class="hh">当前审批人</div>
					    </div> 
					</td>
				</tr>
				<tr>
				   <td colspan="3">
				      <s:textfield name="name" id="name" value="%{#request.name}" cssClass="input125" onkeydown="javascript:po.pressEnter(event);"></s:textfield>
                        <img src="images/btn_search01.png" width="59" height="21" align="absmiddle" border="0" style="cursor: pointer;" onclick="javascript:po.queryDepsAndUserName();"/>
				   </td>
				</tr>
				<tr>
				   <td valign="top">
				      <table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01" id="l_table">
                            
                            <tr>
                                <th width="5%"/></th>
                                <th width="33%">姓名</th>
                                <th width="32%">账号</th>
                                <th width="30%">职位</th>
                            </tr>
                            <s:iterator value="page.items" var="item">
                                <tr id="${item.id}">
                                    <td align="center"><input type="radio" name="l_user" value="${item.id}" /></td>
                                    <td align="left">${item.realName }</td>
                                    <td align="left">${item.loginName}</td>
                                    <td align="left" title="${item.position}"><app:TruncateTag size="7" src="${item.position}"></app:TruncateTag></td>
                                </tr>
                            </s:iterator>
                        </table>
                        <div class="page">
							<div style="float: left;">
								&nbsp;
							</div>
							<app:PageTag actionName="FlowInstanceManager!userList.do" ></app:PageTag>
						</div>
				   </td>
				  
				   <td valign="middle"  align="center">
				      <input type="button" value="替换" id="replace"/>
				   </td>
				   <td valign="top">
				       <table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01" id="r_table">
                           <tbody id="addTr">
                             <tr>
                             	<th width="5%"></th>
                                <th width="40%">环节</th>
                                <th width="40%">岗位名</th>
                                <th width="15%">责任人</th>
                             </tr>
                             <s:iterator value="#request.lstFlowInstanceStep" var="flowInstanceStep">
                             	<s:iterator value="#flowInstanceStep.lstFlowInstanceStepWork" var="flowInstanceStepWork">
                             		<s:if test="#flowInstanceStepWork.status == 1">
                             			<s:iterator value="#flowInstanceStepWork.lstFlowInstanceStepWorkTask" var="flowInstanceStepWorkTask">
                             				<s:if test="#flowInstanceStepWorkTask.status == 1">
				                                <tr>
				                                	<td><input type="radio" name="replacedItem" value="${flowInstanceStepWorkTask.participant},${flowInstanceStepWorkTask.guid}"/></td>
				                                	<td>${flowInstanceStep.displayName}</td>
				                                    <td>${flowInstanceStepWork.participantPostName}</td>
				                                    <td>${flowInstanceStepWorkTask.participantUserName}</td>
				                                </tr>
			                                </s:if>
		                         		</s:iterator>
                             		</s:if>
                                 </s:iterator>
                             </s:iterator>
                          </tbody>
                        </table>
				   </td>
				</tr>
            </table>
            <%--<s:hidden name="userIds" id="userIds"></s:hidden>
            --%><input type="hidden" name="userIds" id="userIds" value="${userIds}"/>
        </s:form>
    </body>
</html>