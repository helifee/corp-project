<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ taglib uri="http://jsptags.com/tags/navigation/pager" prefix="pg" %>
<jsp:include page="/hy/logincheck.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>会议室预约情况画面</title>
<sx:head debug="true" />
<script type="text/javascript"
	src="js/common.js"></script>
<script type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"
	src="js/_date.js"></script>
<link href="CSS/gener.css" rel="stylesheet" type="text/css" >
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/applicationSituation.js"></script>

</head>
<BODY bgcolor="#ecf6ff">
<s:include value="../common/topmenu.jsp" />
<p align="center"><font size="5" COLOR="green"> <strong><s:property	value="conferensituationName" />预约情况画面</strong></font>
  <input type="button" name="huamianxuanzeButton"  id="huamianxuanzeButton" value="会议室选择" 	style="WIDTH: 80px; HEIGHT: 28px" onclick="distributeAction();" />
</p>
  <s:form action="" method="post" theme="simple" name="YuyueQingkuang" id = "YuyueQingkuang">
  <input type="hidden" name="conferensituationId" id = "conferensituationId" value="<s:property value="conferensituationId"/>"/>
	<table width="943" border="0" cellspacing="1" cellpadding="1" align="center">
	  <tr>
		<td width="200"></td>
		<td align="right"><font size="4" color="#6c95d0"><strong>查询条件选择:</strong></font></td>
		<td>
		  <s:if test="radiobutton == 'dr'">
			<input type="radio" name="radiobutton" value="dr" checked="checked" id="dr" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/>
			<label for="dr">当日 </label>
		  </s:if>
		  <s:else>
			<input type="radio" name="radiobutton" value="dr" id="dr" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/>
			<label for="dr">当日 </label>
		  </s:else>
		  <s:if test="radiobutton == 'dz'">
			  <input type="radio" name="radiobutton" value="dz" checked="checked"	id="dz" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/>
			  <label for="dz">当周</label>
		  </s:if> 
		  <s:else>
			<input type="radio" name="radiobutton" value="dz" id="dz"  onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/>
			<label for="dz">当周 </label>
		  </s:else>
          <s:if test="radiobutton == 'dy'">
			<input type="radio" name="radiobutton" value="dy" checked="checked"	id="dy" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/>
			<label for="dy">当月</label>
		  </s:if> <s:else>
			<input type="radio" name="radiobutton" value="dy" id="dy" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/>
			<label for="dy">当月 </label>
		  </s:else>
		</td>
		<td></td>
	  </tr>
	  <tr>
		<td></td>
		<td></td>
		<td>
		  <s:if test="radiobutton == 'rq'">
		    <input type="radio" name="radiobutton" value="rq" checked="checked"	id="rq" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/><label for="rq"  >日期：</label>
		  </s:if> 
		  <s:else>
			<input type="radio" name="radiobutton" value="rq" id="rq" onclick = "textDisabled('<s:property value="currentDay" />' , '<s:property value="firstWeek" />' , '<s:property value="lastWeek" />' , '<s:property value="firstMonth" />' , '<s:property value="lastMonth" />');"/><label for="rq"  >日期： </label>
		  </s:else>		  
		  <s:if test="radiobutton == 'rq'">
			  <s:if test="startDate == null || startDate == ''">
				<input type="text" id="startDate" name="startDate" value="" style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
			  </s:if> 
			  <s:else>
				<input type="text" id="startDate" name="startDate"	value="<s:property value="startDate"/>" style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
			  </s:else>
		  </s:if>
		  <s:else>
		      <s:if test="startDate == null || startDate == ''">
				<input type="text" id="startDate" name="startDate" value="" style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" disabled = "disabled"/>
			  </s:if> 
			  <s:else>
				<input type="text" id="startDate" name="startDate"	value="<s:property value="startDate"/>" style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" disabled = "disabled"/>
			  </s:else>
		  </s:else>	  
		       ～ 		    		       
		  <s:if test="radiobutton == 'rq'">     
			  <s:if test="endDate == null || endDate == ''">
				<input type="text" id="endDate" name="endDate" value=""	style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
			  </s:if>
			  <s:else>
				<input type="text" id="endDate" name="endDate"	value="<s:property value="endDate"/>" style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
			  </s:else>
		  </s:if>
		  <s:else>
		      <s:if test="endDate == null || endDate == ''">
				<input type="text" id="endDate" name="endDate" value=""	style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" disabled = "disabled"/>
			  </s:if>
			  <s:else>
				<input type="text" id="endDate" name="endDate"	value="<s:property value="endDate"/>" style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
				onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" disabled = "disabled"/>
			  </s:else>
		  </s:else>	  
	    </td>
	    <td align="right">
	      <input type="button" name="Submit" id="Submit" value="查询" style="WIDTH: 60px; HEIGHT: 24px" onclick="conferensituation();" />
		  <input type="button" name="Submit2" id="Submit2" value="返回" onclick="conferenceinitAction('<s:property value="startDate"/>');"
				style="WIDTH: 60px; HEIGHT: 24px" />
	    </td>
	  </tr>
    </table>
 </s:form>
   <div id="div_hy_situationXiangxiAjax"  align="center"><s:include	value="hy_situation.jsp" /></div>
   <table width="943" border="0" cellspacing="1" cellpadding="1" align="center">
   <tr>
   <td height = "300">
   &nbsp;
   </td>
   </tr>
   </table>
</BODY>
</html>
