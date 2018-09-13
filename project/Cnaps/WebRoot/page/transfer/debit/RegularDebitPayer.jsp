<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>
	<c:choose> 
		<c:when test="${syspara == 'fkradd'}">付款人信息添加</c:when>
		<c:when test="${syspara == 'fkrmod'}">付款人信息修改</c:when>
	</c:choose>
</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">
	function dispywzlbm(txt){
		this.document.getElementById("pmtkd").value=txt;
	}
	function xiugaibc(){
		if(confirm("确定要更改吗？")){
			ckeckwethornull();
		}
	}
</script>
</head>
<body onload="dispywzlbm('${poDetails.pmtkd}')">
<html:form method="post" action="/regularDebitAction.do?method=sendMsgInput&pmtgrpid=${pmtgrpid}&syspara=${syspara}">
	<input id="business_name" type="hidden" value="RegularDebitPayer">
	<input id="repeatmark" type="hidden" value="0">
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td class="text_tablehead_b">
					<%--
						<h5 align="left">&nbsp;小额支付系统&nbsp;->&nbsp;普通借记业务&nbsp;->&nbsp;普通借记-总账</h5>
					--%>
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	      		<table width="75%" border="0" cellspacing="0" cellpadding="0" align="center">
	        		<tr>
			        	<td width="10">&nbsp;</td>
			        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;">
		        			<c:choose> 
								<c:when test="${syspara == 'fkradd'}">付款人信息添加</c:when>
								<c:when test="${syspara == 'fkrmod'}">付款人信息修改</c:when>
							</c:choose>
			        	</td>
			        </tr>
			        <tr>
			        	<td width="10">&nbsp;</td>
			        	<td width="10">&nbsp;</td>
			        </tr>
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
		          			<c:choose> 
								<c:when test="${syspara == 'fkradd'}">
									<table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
			          					<tr>
			          						<td class="text_tablehead_b" width="2" rowspan="4" style="writing-mode=tb-rl;text-align: center;">
		                						付款人信息
		                						<input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${prntid}"/>
		                						<input type="hidden" name="poDetails.pmtgrpid" id="pmtgrpid" maxlength="32" value="${pmtgrpid}"/>
		                					</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		付款人账号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtracct" id="dbtracct" maxlength="32"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		付款人名称<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrnm" id="dbtrnm" maxlength="60"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  		付款人地址
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtraddr" id="dbtraddr" maxlength="70"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		付款人开户行行号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" maxlength="14"/>
						                  	</td>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		付款人开户行行名<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm" maxlength="60"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		付款清算行行号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrmmbid" id="dbtrmmbid" maxlength="14"/>
						                  	</td>
						                  </tr>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		付款行行名<font color="#FF0000">*</font>
						                  	</td>
						                  	<td ><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchnm" id="dbtrbrnchnm" maxlength="60"/>
						                   	</td>
						                  	<td class="text_tablehead_b">
						                  		付款行行号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" maxlength="14"/>
						                  	</td>
						                  </tr>
						            </table>
							        <table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
							           	<tr>
							           		<td class="text_tablehead_b" width="2" rowspan="4" style="writing-mode=tb-rl;text-align: center;">
		                						其他
		                					</td>
						                  	<td  width="140" class="text_tablehead_b">
						                  	扣款合同编号
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.pmtagrmtnb" id="pmtagrmtnb" maxlength="60" />
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  	业务种类编码<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<select name="poDetails.pmtkd" id="pmtkd" style="width: 130px;">
						                   			<option value="">请选择</option>
						                   			<option value="00100">电费</option>
													<option value="00200">水暖费</option>
													<option value="00300">煤气费</option>
													<option value="00400">电话费</option>
													<option value="00500">通讯费</option>
													<option value="00600">保险费</option>
													<option value="00700">房屋管理费</option>
													<option value="00800">代理服务费</option>
													<option value="00900">学教费</option>
													<option value="01000">有线电视费</option>
													<option value="01100">企业管理费用</option>
													<option value="09001">其他</option>
						                   		</select>
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	金额<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.snglamt" id="snglamt" maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)" />
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	附言
						                  	</td>
						                  	<td colspan="3"><div align="left">
						                  		<textarea name="poDetails.addtlinf" rows="3" style="width: 100%" id="addtlinf" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)" ></textarea>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  	备注
						                  	</td>
						                  	<td colspan="3"><div align="left">
						                  		<textarea name="poDetails.ustrd" rows="3" style="width: 100%" id="ustrd" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)" ></textarea>
						                  	</td>
						                 </tr>
			          				</table>
								</c:when>
								<c:when test="${syspara == 'fkrmod'}">
									<table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
			          					<tr>
			          						<td class="text_tablehead_b" width="2" rowspan="4" style="writing-mode=tb-rl;text-align: center;">
		                						付款人信息
		                						<input type="hidden" name="poDetails.id" id="id" maxlength="32" value="${poDetails.id}"/>
		                						<input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${poDetails.prntid}"/>
		                					</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		付款人账号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtracct" id="dbtracct" maxlength="32" value="${poDetails.dbtracct}"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		付款人名称<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrnm" id="dbtrnm" maxlength="60" value="${poDetails.dbtrnm}"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  		付款人地址
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtraddr" id="dbtraddr" maxlength="70" value="${poDetails.dbtraddr}"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		付款人开户行行号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" maxlength="14" value="${poDetails.dbtrissuer}"/>
						                  	</td>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		付款人开户行行名<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm" maxlength="60" value="${poDetails.dbtrissuernm}"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		付款清算行行号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrmmbid" id="dbtrmmbid" maxlength="14" value="${poDetails.dbtrmmbid}"/>
						                  	</td>
						                  </tr>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		付款行行名<font color="#FF0000">*</font>
						                  	</td>
						                  	<td ><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchnm" id="dbtrbrnchnm" maxlength="60" value="${poDetails.dbtrbrnchnm}"/>
						                   	</td>
						                  	<td class="text_tablehead_b">
						                  		付款行行号<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" maxlength="14" value="${poDetails.dbtrbrnchid}"/>
						                  	</td>
						                  </tr>
						            </table>
							        <table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
							           	<tr>
							           		<td class="text_tablehead_b" width="2" rowspan="4" style="writing-mode=tb-rl;text-align: center;">
		                						其他
		                					</td>
						                  	<td width="140" class="text_tablehead_b">
						                  	扣款合同编号
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.pmtagrmtnb" id="pmtagrmtnb" maxlength="60" value="${poDetails.pmtagrmtnb}"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  	业务种类编码<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<select name="poDetails.pmtkd" id="pmtkd" style="width: 130px;">
						                   			<option value="">请选择</option>
						                   			<option value="00100">电费</option>
													<option value="00200">水暖费</option>
													<option value="00300">煤气费</option>
													<option value="00400">电话费</option>
													<option value="00500">通讯费</option>
													<option value="00600">保险费</option>
													<option value="00700">房屋管理费</option>
													<option value="00800">代理服务费</option>
													<option value="00900">学教费</option>
													<option value="01000">有线电视费</option>
													<option value="01100">企业管理费用</option>
													<option value="09001">其他</option>
						                   		</select>
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	金额<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.snglamt" id="snglamt" maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)" value="${poDetails.snglamt}"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	附言
						                  	</td>
						                  	<td colspan="3"><div align="left">
						                  		<textarea name="poDetails.addtlinf" rows="3" style="width: 100%" id="addtlinf" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)" >${poDetails.snglamt}</textarea>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  	备注
						                  	</td>
						                  	<td colspan="3"><div align="left">
						                  		<textarea name="poDetails.ustrd" rows="3" style="width: 100%" id="ustrd" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)">${poDetails.pmtagrmtnb}</textarea>
						                  	</td>
						                 </tr>
			          				</table>
								</c:when>
							</c:choose>
	          			</td>
	        		</tr>
	    		</table>
	    		<div align="center">
	    		<br />
				<span class="STYLE1">说明：红色*标注项为必填项</span>
				<br />
				<br />
				<c:choose> 
					<c:when test="${syspara == 'fkradd'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" /></c:when>
					<c:when test="${syspara == 'fkrmod'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="xiugaibc()" /></c:when>
				</c:choose>
				&nbsp;
				<input id="backButton" style="cursor: pointer" type="button" class="button" value="返  回" onclick="history.back();" />
				</div>
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"></td>
	  	</tr>
	</table>
</html:form>
</body>
</html>
