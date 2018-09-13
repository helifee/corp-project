<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="proId" name="proId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_PRO_NAME}" key="proName" value="%{model.proName}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PRO_NAME_CN}" key="proNameCn" value="%{model.proNameCn}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=PerProject.ALIAS_PRO_NAME_ENG%>:
		</td>	
		<td>
		<input value="${model.proNameEngString}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PRO_NAME_ENG%>'})" id="proNameEngString" name="proNameEngString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_PRO_DESC}" key="proDesc" value="%{model.proDesc}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PARENT_PRO}" key="parentPro" value="%{model.parentPro}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_CUS_NAME}" key="cusName" value="%{model.cusName}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_CUS_CONTACT}" key="cusContact" value="%{model.cusContact}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DEVELOP_ENVI}" key="developEnvi" value="%{model.developEnvi}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_DEPT_ID}" key="deptId" value="%{model.deptId}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerProject.ALIAS_PLAN_STA_DATE%>:
		</td>	
		<td>
		<input value="${model.planStaDateString}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PLAN_STA_DATE%>'})" id="planStaDateString" name="planStaDateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerProject.ALIAS_PLAN_END_DATE%>:
		</td>	
		<td>
		<input value="${model.planEndDateString}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_PLAN_END_DATE%>'})" id="planEndDateString" name="planEndDateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=PerProject.ALIAS_REAL_STA_DATE%>:
		</td>	
		<td>
		<input value="${model.realStaDateString}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_REAL_STA_DATE%>'})" id="realStaDateString" name="realStaDateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<%=PerProject.ALIAS_REAL_END_DATE%>:
		</td>	
		<td>
		<input value="${model.realEndDateString}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_REAL_END_DATE%>'})" id="realEndDateString" name="realEndDateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=PerProject.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=PerProject.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="required " />
		</td>
	</tr>
	
