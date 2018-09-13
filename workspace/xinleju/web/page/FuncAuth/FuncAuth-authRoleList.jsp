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
</head>
<body>

	<form id="frm" name="frm" action="FuncAuth!funcRoleList.do"
		method="post">
		<input type="hidden" id="start" name="start" value="${start }" /> <input
			type="hidden" id="roleId" name="roleId" value="${roleId }" /> <input
			type="hidden" id="systemCode" name="systemCode"
			value="${systemCode }" /> <input type="hidden" id="roleIds"
			name="roleIds" /> <input type="hidden" id="moduleId" name="moduleId"
			value="${moduleId }" />

		<div class="t_title">
			<div class="hh">
				<ul>
					<li><a
						href="FuncAuth!funcRoleList.do?moduleId=${moduleId }&systemCode=${systemCode }">授权</a></li>
					<li class="current"><a
						href="FuncAuth!funcRoleList.do?moduleId=${moduleId }&systemCode=${systemCode }&flag=view">已授权查询</a></li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>

		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">动作点列表</div>
			<div class="tool">
				<!-- 		  		<a href="#" onclick="selectRole(2);" class="t_new">引用其他功能权限</a> -->
				<!-- 		  		<a href="#" onclick="save(2);" class="t_save">保存</a> -->
			</div>
			<div class="clear"></div>
		</div>
		<script>
			var rowHide2 = true;
			var rowHide3 = true;
			var rowHide4 = true;
		</script>
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

			<s:iterator value="roleGeneralList" var="roleGeneral">
				<s:set id="isExistRoleGeneralValue"
					value="isExistRoleGeneralValue(#request.moduleId,#roleGeneral.id)"></s:set>
				<s:if test="isExistRoleGeneralValue">

					<tr>
						<td width="20%">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${roleGeneral.name }</td>
						<td width="10%" align="center">${funcModule.name }</td>
					</tr>
				</s:if>
			</s:iterator>


			<s:iterator value="roleList" var="role" status="a">
				<!-- 二级角色 -->
				<s:set id="cList" value="getChildRoleList(#role.id)"></s:set>
				<%-- <tr id="row_2_${a.index}" style="display:none;"> --%>
				<s:set id="isExistValue" value="#request.rmMap[#val.id]!=null"></s:set>
				<s:if test="isExistValue">
					<tr id="row_2_${a.index}">
						<td width="20%">${role.name }</td>
						<td width="10%" align="center">${funcModule.name }</td>
						<script>
							rowHide2 = true;
						</script>
						<%--  <s:iterator value="btnList" var="btn" status="i">
		                    <s:set id="isExist" value="isExistRB(#role.id, moduleId, #btn.id)"></s:set>
		                    <td align="center" width="${(0.7/btnList.size())*100}%">
		                        <input type="checkbox" 
			                        class="${role.id }_${i.count}" name="rbIds" value="${role.id}_${btn.id}"
			                        onclick="clickMe(this);" <s:if test="isExist">checked="checked"</s:if>
		                        />
		                    </td>
		                    <script>
		                    	if(${isExist}){		                    		
		                    		rowHide2 = false;
		                    	}
		                    </script>
		                </s:iterator>
		                <script>
		                    	if(!rowHide2){
		                    		$("#row_2_"+${a.index}).show();
		                    	}
		                </script> --%>
					</tr>

				</s:if>
				<s:if test="#cList.size()>0">
					<s:iterator value="cList" var="crole" status="b">
						<!-- 三级角色 -->
						<s:set id="ccList" value="getChildRoleList(#crole.id)"></s:set>
						<%-- <tr id="row_3_${a.index}_${b.index}"  style="display:none;"> --%>
						<s:set id="isExistPRM" value="#request.rmMap[#crole.id]!=null"></s:set>
						<s:if test="isExistPRM">

							<tr id="row_3_${a.index}_${b.index}">
								<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${crole.name }</td>
								<td align="center">${funcModule.name }</td>
								<script>
									rowHide3 = true;
								</script>
								<%--  <s:iterator value="btnList" var="btn" status="i">
				                    <s:set id="isExist" value="isExistRB(#crole.id, moduleId, #btn.id)"></s:set>
		                            <td align="center">
		                                <input type="checkbox" class="${role.id }_${i.count}_${btn.id }"
		                                    name="rbIds" value="${crole.id}_${btn.id}"
		                                    onclick="clickMe(this);" <s:if test="isExist">checked="checked"</s:if>                          
		                                />
		                            </td>
						                <script>
					                    	if(${isExist}){		                    		
					                    		rowHide3 = false;
					                    	}
					                    </script>
				                </s:iterator>
				                <script>
				                    	if(!rowHide3){
				                    		$("#row_3_"+${a.index}+"_"+${b.index}).show();
				                    	}
				                </script>	 --%>
							</tr>
						</s:if>

						<s:if test="#ccList.size()>0">
							<s:iterator value="ccList" var="ccrole" status="c">
								<s:set id="cList" value="getChildRoleList(#ccrole.id)"></s:set>
								<s:set id="isExistCRM" value="#request.rmMap[#ccrole.id]!=null"></s:set>
								<s:if test="isExistCRM">
									<tr id="row_4_${a.index}_${b.index}_${c.index}">
										<%-- <tr id="row_4_${a.index}_${b.index}_${c.index}"  style="display:none;"> --%>
										<td>
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${ccrole.name
											}</td>
										<td align="center">${funcModule.name }</td>
										<script>
											rowHide4 = true;
										</script>
										<%--  <s:iterator value="btnList" var="btn" status="i">
						                    <s:set id="isExist" value="isExistRB(#ccrole.id, moduleId, #btn.id)"></s:set>
				                            <td align="center">
		                                        <input type="checkbox"  value="${ccrole.id}_${btn.id}"
		                                            class="${role.id }_${i.count}_${btn.id }_${ccrole.id }" name="rbIds"
		                                            onclick="clickMe(this);" <s:if test="isExist">checked="checked"</s:if>           
		                                        />
				                            </td>
								                 <script>
							                        
							                    	if(${isExist}){		                    		
							                    		rowHide4 = false;
							                    	}
							                    </script>
							                </s:iterator>
							                <script>
							                    	if(!rowHide4){
							                    		$("#row_4_"+${a.index}+"_"+${b.index}+"_"+${c.index}).show();
							                    	}
							                </script>	 --%>
									</tr>
								</s:if>
							</s:iterator>
						</s:if>
					</s:iterator>
				</s:if>
			</s:iterator>
		</table>

		<div class="page">
			<app:PageTag actionName="FuncAuth!funcRoleList.do"></app:PageTag>
		</div>
	</form>
</body>

</html>