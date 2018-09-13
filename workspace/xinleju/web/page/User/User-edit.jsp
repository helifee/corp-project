<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>用户编辑</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="page/User/User-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px; padding: 0px;">
	<s:form action="User!save.do" id="frm">
	<s:token/>
		<s:hidden name="user.id" id="id"></s:hidden>
<!-- 		<s:hidden name="user.status"></s:hidden> -->
		<s:hidden name="user.prefix"></s:hidden>
		<s:hidden name="start"></s:hidden>
		<s:hidden name="user.createDate"></s:hidden>
		<s:hidden name="user.distinguishedName" id="distinguishedName" ></s:hidden>
		<s:hidden name="user.objectGuid" id="objectGuid" ></s:hidden>
		<s:hidden name="user.adFlag" id="adFlag" ></s:hidden>
		<s:hidden name="user.entityType" id="entityType" ></s:hidden>
	    <s:hidden name="user.extend" id="extend" ></s:hidden>
		
		<input type="hidden" name="parentEntityId" id="parentEntityId" value="${parentEntityId }"></input>
		<input type="hidden" name="partyStructTypeId" id="partyStructTypeId" value="${partyStructTypeId }"></input>
		<table width="70%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA"  style="margin-left:auto;margin-right:auto;">
			<tr>
				<td>
					<div class="wdtable_titleh">编辑用户</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="dealSave()">保存</a>
						<a href="#" onclick="window.close();">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="70%" border="0" cellspacing="1" cellpadding="0" class="table02" style="margin-left:auto;margin-right:auto;">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">编辑用户</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<td width="110px" align="right"><span style="color: red;">*</span>用户名称</td>
							<td colspan="3">
								<s:textfield name="user.realName" cssStyle="width:80%" datatype="*1-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="110px" align="right">工号</td>
							<td colspan="3">
								<s:textfield name="user.jobNumber" cssStyle="width:80%" datatype="*0-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="110px" align="right"><span style="color: red;">*</span>用户登录名称</td>
							<td colspan="3">
								<s:textfield name="user.loginname" id="loginname" cssStyle="width:80%" datatype="*1-50" ajaxurl="User!checkLoginName.do?id=${user.id}"></s:textfield>
							</td>
						</tr>
						
							<tr>
							<td width="110px" align="right">密码</td>
							<td colspan="3">
								<input type="password" name="user.password" value="${user.password}" style="width:80%" ></input>
							</td>
							</tr>
						
						<tr>
							<td width="110px" align="right"><span style="color: red;">*</span>手机</td>
							<td colspan="3">
								<s:textfield name="user.mobile" cssStyle="width:80%" datatype="m"></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="110px" align="right">默认岗位</td>
							<td colspan="3">
								<span id="mainRole">${mainRoleFullName}</span>
								<s:hidden name="user.mainRoleId" id="mainRoleId"></s:hidden>
								<a href="javascript:void(0)" onclick="partyWindow();" style="color:#00c;">选择岗位</a>
								<a href="javascript:void(0)" onclick="clearParty();" style="color:#00c;">清空</a>
							</td>
						</tr>
						<tr>
							<td width="110px" align="right">电子邮箱</td>
							<td colspan="3">
								<s:textfield name="user.email" cssStyle="width:80%" datatype="e" ignore="ignore"></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="110px" align="right"><span style="color: red;">*</span>职务</td>
							<td width="250px">
								<s:textfield name="user.position" cssStyle="width:50%" datatype="*1-50"></s:textfield>
							</td>
							<td width="110px" align="right"><span style="color: red;"></span>职级</td>
							<td width="250px">
								<s:select emptyOption="false" cssStyle="width:50%;" list="#request.lvs" listValue="name" listKey="value" name="user.zhiji"></s:select>
							</td>							
						</tr>						
						<tr>
							<td width="110px" align="right">办公电话</td>
							<td width="250px">
								<s:textfield name="user.workphone" cssStyle="width:50%" datatype="n" ignore="ignore"></s:textfield>
							</td>
							<td width="110px" align="right">家庭电话</td>
							<td width="250px">
								<s:textfield name="user.contactPhone" cssStyle="width:50%" datatype="n" ignore="ignore"></s:textfield>
							</td>							
						</tr>
						<tr>
							<td width="110px" align="right">出生日期</td>
							<td width="250px">
								<input name="user.birthday" value="<s:date name="user.birthday"  format="yyyy-MM-dd"/>" style="width: 50%;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							</td>
							<td width="110px" align="right">参加工作日期</td>
							<td width="250px">
								<input name="user.employstartdate" value="<s:date name="user.employstartdate"  format="yyyy-MM-dd"/>" style="width: 50%;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							</td>							
						</tr>
						<tr>
							<td width="110px" align="right">入职日期</td>
							<td width="250px">
								<input name="user.hiredate" value="<s:date name="user.hiredate"  format="yyyy-MM-dd"/>" style="width: 50%;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							</td>
							<td width="110px" align="right">离职日期</td>
							<td width="250px">
								<input name="user.dismissdate" value="<s:date name="user.dismissdate"  format="yyyy-MM-dd"/>" style="width: 50%;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							</td>							
						</tr>		
						<tr>
							<td width="110px" align="right">性别</td>
							<td width="250px">
							    <input type="radio" style="vertical-align: middle;" name="user.ismale" value="0" <s:if test="user.ismale!=1">checked</s:if> /><span style="padding-left:5px;padding-right:20px;vertical-align: middle;">男</span>
							    <input type="radio" style="vertical-align: middle;" name="user.ismale" value="1" <s:if test="user.ismale==1">checked</s:if> /><span style="vertical-align: middle;">女</span> 
							</td>
							<td width="110px" align="right">是否外地</td>
							<td width="250px">
							    <input type="radio" style="vertical-align: middle;" name="user.islocal" value="0" <s:if test="user.islocal!=1">checked</s:if> /><span style="padding-left:5px;padding-right:20px;vertical-align: middle;">本地</span>
							    <input type="radio" style="vertical-align: middle;" name="user.islocal" value="1" <s:if test="user.islocal==1">checked</s:if> /><span style="vertical-align: middle;">外地</span> 
							</td>							
						</tr>										
						<tr>
							<td width="110px" align="right">是否外部专家</td>
							<td width="250px">
								<s:checkbox name="user.type" value="user.type=='outer'" fieldValue="outer" label="是"></s:checkbox>
							</td>
							<td width="110px" align="right">发资金计划编制提醒</td>
							<td width="250px">
								<s:checkbox name="user.zjjh" value="user.zjjh=='yes'" fieldValue="yes" label="是"></s:checkbox>
							</td>							
						</tr>
						<tr>
							<td width="110px" align="right">是否管委会成员</td>
							<td width="250px">
								<s:checkbox name="user.gwh" value="user.gwh=='yes'" fieldValue="yes" label="是"></s:checkbox>
							</td>
							<td width="110px" align="right">是否接受日报</td>
							<td width="250px">
								<s:checkbox name="user.rb" value="user.rb=='yes'" fieldValue="yes" label="是"></s:checkbox>
							</td>							
						</tr>
						<tr>
							<td width="110px" align="right">是否禁用</td>
							<td  colspan="3">
							    <input type="radio" style="vertical-align: middle;" name="user.status" value="0" <s:if test="user.status!=1">checked</s:if> /><span style="padding-left:5px;padding-right:20px;vertical-align: middle;">启用</span>
							    <input type="radio" style="vertical-align: middle;" name="user.status" value="1" <s:if test="user.status==1">checked</s:if> /><span style="vertical-align: middle;">禁用</span> 
							</td>
						</tr>
						<tr>
							<td width="110px" align="right">说明</td>
							<td colspan="3">
								<s:textarea name="user.note" rows="2" cols="90" cssStyle="width:80%" datatype="*0-200"></s:textarea>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
</body>
</html>