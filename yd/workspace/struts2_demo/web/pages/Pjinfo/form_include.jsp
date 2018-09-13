<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="projectid" name="projectid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<tr>	
		<td class="tdLabel">
			<%=Pjinfo.ALIAS_ENDDATE%>:
		</td>	
		<td>
		<input value="${model.enddateString}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_ENDDATE%>'})" id="enddateString" name="enddateString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Pjinfo.ALIAS_STARTDATE%>:
		</td>	
		<td>
		<input value="${model.startdateString}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_STARTDATE%>'})" id="startdateString" name="startdateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_PRJMEI}" key="prjmei" value="%{model.prjmei}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_KYAKUNAME}" key="kyakuname" value="%{model.kyakuname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_CANCELFLAG}" key="cancelflag" value="%{model.cancelflag}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_INTIMESTP}" key="intimestp" value="%{model.intimestp}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_UPTIMESTP}" key="uptimestp" value="%{model.uptimestp}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_PROJECTTYUNAME}" key="projecttyuname" value="%{model.projecttyuname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PROJECTEINAME}" key="projecteiname" value="%{model.projecteiname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_MUSERID}" key="muserid" value="%{model.muserid}" cssClass="required " required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Pjinfo.ALIAS_YSTARTDATE%>:
		</td>	
		<td>
		<input value="${model.ystartdateString}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_YSTARTDATE%>'})" id="ystartdateString" name="ystartdateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span><%=Pjinfo.ALIAS_YENDDATE%>:
		</td>	
		<td>
		<input value="${model.yenddateString}" onclick="WdatePicker({dateFmt:'<%=Pjinfo.FORMAT_YENDDATE%>'})" id="yenddateString" name="yenddateString"  maxlength="0" class="required " />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_USERNUM}" key="usernum" value="%{model.usernum}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PJGAIYOU}" key="pjgaiyou" value="%{model.pjgaiyou}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_PJEM}" key="pjem" value="%{model.pjem}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_STATUSFLG}" key="statusflg" value="%{model.statusflg}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SUPUSERID}" key="supuserid" value="%{model.supuserid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_BIKO}" key="biko" value="%{model.biko}" cssClass="" required="false" />
	
