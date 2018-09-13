<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ page language="java" import="java.lang.String"%>
<%@ page language="java" import="java.lang.Integer"%>
<jsp:include page="/hy/logincheck.jsp" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>会议室预约情况画面</title>
<sx:head debug="true" />
<script language="text/javascript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js"></script>
<script language="text/javascript" type="text/javascript"
	src="js/_date.js"></script>
<link href="CSS/gener.css" rel="stylesheet" type="text/css" />
</head>
<script language="javascript">
//开始日期和结束日期文本框的可输入性转换，只有当期button被选中时，两个文本框才可用。

function textEmptyCheck(){
	var radioCheckSign = document.getElementById("rq");
	if( ((radioCheckSign.checked==true) && document.getElementById("startDate").value=="") && (document.getElementById("endDate").value=="")){
		alert("开始日期或结束日期不允许全为空。");
		return false ;
	}
	return true;
}

//当鼠标移动到对应的链接上时对应的标签由隐藏变为显示。
function show(hysm){
	
	var objDiv=document.getElementById(hysm) ;
	objDiv.style.display="";
}
//当鼠标从链接上移开时对应的标签由显示变为隐藏。
function hide(hysm){
	var objDiv=document.getElementById(hysm) ;
	objDiv.style.display="none";
}
//在画面参加人中点击查看链接时提交链接到预约更改画面。
function yueyueAction(){
	targetForm = document.forms[0];
	targetForm.action = "yuyue" ;
	targetForm.submit();
}
function conferensituation(){
	targetForm = document.forms[0];
	targetForm.action = "conferensituation" ;
	targetForm.submit();
}
//在画面会议报告中点击查看链接时提交链接到预约更改画面。
function conferenceinitAction(conferensituationId){	
	targetForm = document.forms[0];
	targetForm.action = "conferenceinit?hamianMC=hysyuyue&conferensituationId="+parseInt(conferensituationId) ;
	targetForm.submit();
}

//
 function hysYySummit(hyskssj , hyskssjhour , hyskssjminute , hysid){
    	  var  targetForm = document.forms[0];
    	  targetForm.action="yuyue?" ; 
    	  targetForm.submit();
}

function conferensituation(){
	 var isOrNotNull = textEmptyCheck();
	 if(isOrNotNull == true){
		var  targetForm = document.forms[0];
		targetForm.action="conferensituation" ; 
		targetForm.submit();
    }
	  
}
</script>
<BODY bgcolor="#ecf6ff">
<p align="center"><font size="5" COLOR="green"> <strong><s:property	value="conferensituationName" />预约情况画面</strong></font></p>
  <s:form action="" method="post" theme="simple" name="hyyyForm">
	<table width="943" border="0" cellspacing="1" cellpadding="1" align="center">
	  <tr>
		<td width="200"></td>
		<td align="right"><font size="4" color="#6c95d0"><strong>查询条件选择:</strong></font></td>
		<td>
		  <s:if test="radiobutton == 'dr'">
			<input type="radio" name="radiobutton" value="dr" checked="checked" id="dr" />
			<label for="dr">当日 </label>
		  </s:if>
		  <s:else>
			<input type="radio" name="radiobutton" value="dr" id="dr" />
			<label for="dr">当日 </label>
		  </s:else>
		  <s:if test="radiobutton == 'dz'">
			  <input type="radio" name="radiobutton" value="dz" checked="checked"	id="dz" />
			  <label for="dz">当周</label>
		  </s:if> 
		  <s:else>
			<input type="radio" name="radiobutton" value="dz" id="dz" />
			<label for="dz">当周 </label>
		  </s:else>
          <s:if test="radiobutton == 'dy'">
			<input type="radio" name="radiobutton" value="dy" checked="checked"	id="dy" />
			<label for="dy">当月</label>
		  </s:if> <s:else>
			<input type="radio" name="radiobutton" value="dy" id="dy" />
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
		    <input type="radio" name="radiobutton" value="rq" checked="checked"	id="rq" />
				<label for="rq">日期：</label>
		  </s:if> 
		  <s:else>
			<input type="radio" name="radiobutton" value="rq" id="rq" />
			<label for="rq">日期： </label>
		  </s:else>
		  <s:if test="startDate == null || startDate == ''">
			<input type="text" id="YyDate" name="startDate" 
			        value=""	style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
					onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
		  </s:if> 
		  <s:else>
			<input type="text" id="YyDate" name="startDate"
					value="<s:property value="startDate"/>"
					style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
					onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
		  </s:else>
		       ～ 
		  <s:if test="endDate == null || endDate == ''">
			<input type="text" id="YyDate1" name="endDate" value=""
					style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
					onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
		  </s:if>
		  <s:else>
			<input type="text" id="YyDate1" name="endDate"
					value="<s:property value="endDate"/>"
					style="WIDTH: 100px; HEIGHT: 20px" maxlength="10"
					onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="readonly" />
		  </s:else>
	    </td>
	    <td align="right">
	      <input type="button" name="Submit" value="查询"
				style="WIDTH: 60px; HEIGHT: 24px" onclick="conferensituation();" />
		  <input type="button" name="Submit2" value="返回"
				onclick="conferenceinitAction('<s:property value="conferensituationId" />');"
				style="WIDTH: 60px; HEIGHT: 24px" />
	    </td>
	  </tr>
    </table>
	<table width="943" border="0" cellspacing="2" cellpadding="2" align="center" >
		<tr>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">日期</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">时间</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">申请人</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">参加人数</font></td>
			
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">参加与否</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">会议主题</font></td>
			<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">详细</font></td>
		</tr>
		<s:if test="conferensituations.size > 0">
			<s:iterator value="conferensituations" id ="aaa">
				<tr align="center">
					<td width="75" height="25" bgcolor="#ffffd9"><font   size=2><s:property	value="hyrq" /></font></td>
					<td width="65" bgcolor="#ffffd9"><font   size=2><s:property value="hykssj" />~<s:property value="hyjssj" /></font></td>
					<td width="75" bgcolor="#ffffd9"><font   size=2><s:property value="userName" /></font></td>
					<td width="85" bgcolor="#ffffd9"><font   size=2><s:property value="cjzrs" /></font></td>
					<td align="center" width="120" bgcolor="#ffffd9"><label 	onmouseover="show('<s:property value="hysm"/>')"	onmouseout="hide('<s:property value="hysm"/>')">
					<font   size=2><s:property value="sumHZ" />/<s:property value="cjzrs" />已回复（一览）</font></label>
					<div id="<s:property value="hysm"/>"	style=" background-color: #99CC99; position: absolute; width: 200px; height: 100px; display: none">未回复人员：				
					<p align="left"><s:property value="wcjrs" /></p>
					</div>
					</td>
					<td align="left" width="345" bgcolor="#ffffd9"><font   size=2><s:property
						value="hyzt" /> </font></td>
					<td align="left" width="80" bgcolor="#ffffd9">
                      <s:url action="yuyue" id="reserveUrl">
						<s:param name="yuyueinfo.startdate" value="%{#aaa.hyrq}"></s:param>
						<s:param name="yuyueinfo.start_hour" value="%{#aaa.hykssjhour}"></s:param>
						<s:param name="yuyueinfo.start_minute" value="%{#aaa.hykssjminute}"></s:param>
						<s:param name="yuyueinfo.end_hour"   value="%{#aaa.hyjssjhour}"></s:param>
						<s:param name="yuyueinfo.end_minute" value="%{#aaa.hyjssjminute}"></s:param>
						<s:param name="yuyueinfo.hys" value="%{#aaa.hysid}"></s:param>
					  </s:url> <s:a href="%{reserveUrl}">详细</s:a>
                    </td>
				</tr>

			</s:iterator>
		</s:if>
	</table>
</s:form>
</BODY>
</html>
