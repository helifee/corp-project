

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
        <title>用户选择</title>
        <link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="css/xy_cost.css"   />
        
        <script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="js/jquery/jquery.json-2.2.js"></script>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/Orgn/Orgn-userList.js"></script>
		<script type="text/javascript">
		  $(function(){
			  
			 // $("#addTr tr td").css("align","left");
		  });
		</script>
    </head>
    <body>
        <s:form id="frm" name="frm" action="Orgn!userList.do" method="post">
            <input type="hidden" name="paramJsonStr" id="paramJsonStr" value="${paramJsonStr}"/>
            <input type="hidden" name="orgnId" id="orgnId" value="${orgnId}"/>
            <input type="hidden" name="allSearch" id="allSearch" />
            <s:hidden name="start"></s:hidden> 
            <table width="100%" border="0" cellspacing="0" cellpadding="0">     
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
					      <div class="hh">已选人员</div>
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
                                <th width="5%"><input type="checkbox" name="l_check_all" id="l_check_all" onclick="javascript:sc.checkAll(this);" /></th>
                                <th width="33%">姓名</th>
                                <th width="32%">账号</th>
                                <th width="30%">职位</th>
                            </tr>
                            <s:iterator value="page.items" var="item">
                                <tr id="${item.id}" ondblclick="javascript:sc.additionUserSingle(${item.id});return false;">
                                    <td align="center"><input type="checkbox" name="l_user" value="${item.id}" onclick="javascript:sc.checkOne(this);" /></td>
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
							<app:PageTag actionName="Orgn!userList.do" ></app:PageTag>
						</div>
				   </td>
				  
				   <td valign="middle"  align="center">
				      <div><a href="#" title="选择" onclick="javascript:sc.additionUser();return false;"><img src="images/arrow_03.png" width="32" height="36" /></a></div> 
				      <div style="margin-top:10px;"><a href="#" title="移除" onclick="javascript:sc.removeUser();return false;"><img src="images/arrow_02.png" width="32" height="36" /></a></div>
				      <div style="margin-top:10px;"><a href="#" title="全部移除" onclick="javascript:sc.removeAll();return false;"><img src="images/arrow_01.png" width="32" height="50" /></a></div>
				   </td>
				   <td valign="top">
				       <table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01" id="r_table">
                           <tbody id="addTr">
                             <tr>
                                <th width="5%"><input type="checkbox" name="r_check_all" id="r_check_all" onclick="javascript:sc.checkAll(this);" /></th>
                                <th width="95%">名称</th>
                             </tr>
                             <s:iterator value="selectedUserList" var="item">
                                 <tr id="${item.id}" ondblclick="javascript:sc.removeUserSingle(${item.id});return false;">
                                     <td align="center"><input type="checkbox" name="r_user" value="${item.id}" onclick="javascript:sc.checkOne(this);" /></td>
                                     <td align="left">${item.realName}</td>
                                 </tr>
                             </s:iterator>
                          </tbody>
                        </table>
                        <!-- 
                        <div class="page">
                            <jdt:pager url="Orgn!userList.do" ifNeedChangePageSize="false"></jdt:pager>
                        </div>
                         -->
				   </td>
				</tr>
            </table>
            <%--<s:hidden name="userIds" id="userIds"></s:hidden>
            --%><input type="hidden" name="userIds" id="userIds" value="${userIds}"/>
        </s:form>
    </body>
</html>