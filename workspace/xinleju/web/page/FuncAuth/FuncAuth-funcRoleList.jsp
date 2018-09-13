<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>功能授权</title>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script language="javascript" type="text/javascript"
	src="page/FuncAuth/FuncAuth-funcBtnList.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
</head>
<body>

	<form id="frm" name="frm" action="FuncAuth!funcRoleList.do"
		method="post">
		<input type="hidden" id="start" name="start" value="${start }" /> <input
			type="hidden" id="roleId" name="roleId" value="${roleId }" /> <input
			type="hidden" id="systemCode" name="systemCode"
			value="${systemCode }" />
		<!-- <input type="hidden" id="roleIds" name="roleIds"/> -->
		<input type="hidden" id="moduleId" name="moduleId"
			value="${moduleId }" />

		<div class="t_title">
			<div class="hh">
				<ul>
					<li class="current"><a
						href="FuncAuth!funcRoleList.do?moduleId=${moduleId }&systemCode=${systemCode }">授权</a></li>
					<li><a
						href="FuncAuth!funcRoleList.do?moduleId=${moduleId }&systemCode=${systemCode }&flag=view">已授权查询</a></li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>

		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">角色列表</div>
			<div class="tool">
				<!-- 		  		<a href="#" onclick="selectRole(2);" class="t_new">引用其他功能权限</a> -->
				<a href="#" onclick="save(2);" class="t_save">保存</a>
			</div>
			<div class="clear"></div>
		</div>

		<table width="100%" cellpadding="0" cellspacing="1" id="tab"
			class="wd_tablelist01">
			<tr>
				<th>角色</th>
				<th>菜单/按钮</th>
				<%-- <s:iterator value="btnList" var="btn">
				    <th>
				        ${btn.name }
				    </th>
				</s:iterator> --%>
			</tr>

			
			
			<tr>
				<td width="20%">标准角色</td>
				<td width="10%" align="center">${funcModule.name }</td>
			</tr>
			<s:iterator value="roleList" var="role">
				<!-- 二级角色 -->
				<s:set id="cList" value="getChildRoleList(#role.id)"></s:set>
				<tr>
					<td width="20%" onclick="clickThisRow('m_${role.id}');">
						&nbsp;&nbsp;&nbsp; <s:set id="isExistValue"
							value="#request.rmMap[#val.id]!=null"></s:set> <input
						type="checkbox" class="m_${role.id}" id="m_${role.id}"
						name="reIds" value="${role.id}"
						<s:if test="isExistValue">checked="checked"</s:if>
						onclick="clickThisRow('m_${role.id}');" /> ${role.name }
					</td>
					<td width="10%" align="center">${funcModule.name }</td>
					<%-- <s:iterator value="btnList" var="btn" status="i">
		                    <s:set id="isExist" value="isExistRB(#role.id, moduleId, #btn.id)"></s:set>
		                    <td align="center" width="${(0.7/btnList.size())*100}%">
		                        <input type="checkbox" 
			                        class="${role.id }_${i.count}" name="rbIds" value="${role.id}_${btn.id}"
			                        onclick="clickMe(this);" <s:if test="isExist">checked="checked"</s:if>
		                        />
		                    </td>
		                </s:iterator> --%>
				</tr>
				<s:if test="#cList.size()>0">
					<s:iterator value="cList" var="crole">
						<!-- 三级角色 -->
						<s:set id="ccList" value="getChildRoleList(#crole.id)"></s:set>
						<tr>
							<td onclick="clickThisRow('m_${role.id}_${crole.id}');">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <s:set
									id="isExistPRM" value="#request.rmMap[#crole.id]!=null"></s:set>
								<s:if test="isExistPRM">
									<script type="text/javaScript">
										$("input[class='m_${role.id}']").attr(
												"checked", true);
									</script>
								</s:if> <input type="checkbox" class="m_${role.id}_${crole.id}"
								id="m_${role.id}_${crole.id}" name="reIds" value="${crole.id }"
								<s:if test="isExistPRM">checked="checked"</s:if>
								onclick="clickThisRow('m_${role.id}_${crole.id}');" />

								${crole.name }
							</td>
							<td align="center">${funcModule.name }</td>
							<%--  <s:iterator value="btnList" var="btn" status="i">
				                    <s:set id="isExist" value="isExistRB(#crole.id, moduleId, #btn.id)"></s:set>
		                            <td align="center">
		                                <input type="checkbox" class="${role.id }_${i.count}_${btn.id }"
		                                    name="rbIds" value="${crole.id}_${btn.id}"
		                                    onclick="clickMe(this);" <s:if test="isExist">checked="checked"</s:if>                          
		                                />
		                            </td>
				                </s:iterator> --%>
						</tr>

						<s:if test="#ccList.size()>0">
							<s:iterator value="ccList" var="ccrole">
								<s:set id="cccList" value="getChildRoleList(#ccrole.id)"></s:set>
								<tr>
									<td
										onclick="clickThisRow('m_${role.id}_${crole.id}_${ccrole.id}');">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<s:set id="isExistCRM"
											value="#request.rmMap[#ccrole.id]!=null"></s:set> <input
										type="checkbox" class="m_${role.id}_${crole.id}_${ccrole.id}"
										id="m_${role.id}_${crole.id}_${ccrole.id}" name="reIds"
										value="${ccrole.id}"
										<s:if test="isExistCRM">checked="checked"</s:if>
										onclick="clickThisRow('m_${role.id}_${crole.id}_${ccrole.id}');" />
										${ccrole.name }
									</td>
									<td align="center">${funcModule.name }</td>
									<%-- <s:iterator value="btnList" var="btn" status="i">
						                    <s:set id="isExist" value="isExistRB(#ccrole.id, moduleId, #btn.id)"></s:set>
				                            <td align="center">
		                                        <input type="checkbox"  value="${ccrole.id}_${btn.id}"
		                                            class="${role.id }_${i.count}_${btn.id }_${ccrole.id }" name="rbIds"
		                                            onclick="clickMe(this);" <s:if test="isExist">checked="checked"</s:if>           
		                                        />
				                            </td>
						                </s:iterator> --%>
								</tr>
								
								
								
								<s:if test="#cccList.size()>0">
							<s:iterator value="cccList" var="cccrole">
								<s:set id="ccccList" value="getChildRoleList(#cccrole.id)"></s:set>
								<tr>
									<td
										onclick="clickThisRow('m_${role.id}_${crole.id}_${ccrole.id}_${cccrole.id}');">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<s:set id="isExistCRMc"
											value="#request.rmMap[#cccrole.id]!=null"></s:set> 
											
											<s:if test="isExistCRMc">
									<script type="text/javaScript">
										$("input[class='m_${role.id}_${crole.id}_${ccrole.id}']").attr(
												"checked", true);
									</script>
								</s:if>
											<input
										type="checkbox" class="m_${role.id}_${crole.id}_${ccrole.id}_${cccrole.id}"
										id="m_${role.id}_${crole.id}_${ccrole.id}_${cccrole.id}" name="reIds"
										value="${cccrole.id}"
										<s:if test="isExistCRMc">checked="checked"</s:if>
										onclick="clickThisRow('m_${role.id}_${crole.id}_${ccrole.id}_${cccrole.id}');" />
										${cccrole.name }
									</td>
									<td align="center">${funcModule.name }</td>
								</tr>
							</s:iterator>
						</s:if>
						
						
						
						
							</s:iterator>
						</s:if>
						
						
						
						
					</s:iterator>
				</s:if>
			</s:iterator>
			
			<tr>
				<td width="20%">通用角色</td>
				<td width="10%" align="center">${funcModule.name }</td>
			</tr>
			
			<s:iterator value="roleGeneralList" var="roleGeneral">
				<tr>
					<td width="20%" onclick="clickThisRow('m_${pre}${roleGeneral.id}');">
						&nbsp;&nbsp;&nbsp; 
							<s:set id="isExistRoleGeneralValue" value="isExistRoleGeneralValue(#request.moduleId,#roleGeneral.id)"></s:set>
							<input
						type="checkbox" class="m_${pre}${roleGeneral.id}" id="m_${pre}${roleGeneral.id}"
						name="reIds" value="${pre}${roleGeneral.id}"
						<s:if test="isExistRoleGeneralValue">checked="checked"</s:if>
						onclick="clickThisRow('m_${pre}${roleGeneral.id}');" /> ${roleGeneral.name }
					</td>
					<td width="10%" align="center">${funcModule.name }</td>
				</tr>
			</s:iterator>
			
		</table>

		<div class="page">
			<app:PageTag actionName="FuncAuth!funcRoleList.do"></app:PageTag>
		</div>
	</form>
</body>

</html>