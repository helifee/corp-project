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
		<c:when test="${syspara == 'fkradd'}">��������Ϣ���</c:when>
		<c:when test="${syspara == 'fkrmod'}">��������Ϣ�޸�</c:when>
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
		if(confirm("ȷ��Ҫ������")){
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
						<h5 align="left">&nbsp;С��֧��ϵͳ&nbsp;->&nbsp;��ͨ���ҵ��&nbsp;->&nbsp;��ͨ���-����</h5>
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
								<c:when test="${syspara == 'fkradd'}">��������Ϣ���</c:when>
								<c:when test="${syspara == 'fkrmod'}">��������Ϣ�޸�</c:when>
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
		                						��������Ϣ
		                						<input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${prntid}"/>
		                						<input type="hidden" name="poDetails.pmtgrpid" id="pmtgrpid" maxlength="32" value="${pmtgrpid}"/>
		                					</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		�������˺�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtracct" id="dbtracct" maxlength="32"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		����������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrnm" id="dbtrnm" maxlength="60"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  		�����˵�ַ
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtraddr" id="dbtraddr" maxlength="70"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		�����˿������к�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" maxlength="14"/>
						                  	</td>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		�����˿���������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm" maxlength="60"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		�����������к�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrmmbid" id="dbtrmmbid" maxlength="14"/>
						                  	</td>
						                  </tr>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		����������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td ><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchnm" id="dbtrbrnchnm" maxlength="60"/>
						                   	</td>
						                  	<td class="text_tablehead_b">
						                  		�������к�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" maxlength="14"/>
						                  	</td>
						                  </tr>
						            </table>
							        <table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
							           	<tr>
							           		<td class="text_tablehead_b" width="2" rowspan="4" style="writing-mode=tb-rl;text-align: center;">
		                						����
		                					</td>
						                  	<td  width="140" class="text_tablehead_b">
						                  	�ۿ��ͬ���
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.pmtagrmtnb" id="pmtagrmtnb" maxlength="60" />
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  	ҵ���������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<select name="poDetails.pmtkd" id="pmtkd" style="width: 130px;">
						                   			<option value="">��ѡ��</option>
						                   			<option value="00100">���</option>
													<option value="00200">ˮů��</option>
													<option value="00300">ú����</option>
													<option value="00400">�绰��</option>
													<option value="00500">ͨѶ��</option>
													<option value="00600">���շ�</option>
													<option value="00700">���ݹ����</option>
													<option value="00800">��������</option>
													<option value="00900">ѧ�̷�</option>
													<option value="01000">���ߵ��ӷ�</option>
													<option value="01100">��ҵ�������</option>
													<option value="09001">����</option>
						                   		</select>
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	���<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.snglamt" id="snglamt" maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)" />
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	����
						                  	</td>
						                  	<td colspan="3"><div align="left">
						                  		<textarea name="poDetails.addtlinf" rows="3" style="width: 100%" id="addtlinf" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)" ></textarea>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  	��ע
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
		                						��������Ϣ
		                						<input type="hidden" name="poDetails.id" id="id" maxlength="32" value="${poDetails.id}"/>
		                						<input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${poDetails.prntid}"/>
		                					</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		�������˺�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtracct" id="dbtracct" maxlength="32" value="${poDetails.dbtracct}"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		����������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrnm" id="dbtrnm" maxlength="60" value="${poDetails.dbtrnm}"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  		�����˵�ַ
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtraddr" id="dbtraddr" maxlength="70" value="${poDetails.dbtraddr}"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		�����˿������к�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" maxlength="14" value="${poDetails.dbtrissuer}"/>
						                  	</td>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		�����˿���������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm" maxlength="60" value="${poDetails.dbtrissuernm}"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		�����������к�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrmmbid" id="dbtrmmbid" maxlength="14" value="${poDetails.dbtrmmbid}"/>
						                  	</td>
						                  </tr>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		����������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td ><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchnm" id="dbtrbrnchnm" maxlength="60" value="${poDetails.dbtrbrnchnm}"/>
						                   	</td>
						                  	<td class="text_tablehead_b">
						                  		�������к�<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" maxlength="14" value="${poDetails.dbtrbrnchid}"/>
						                  	</td>
						                  </tr>
						            </table>
							        <table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
							           	<tr>
							           		<td class="text_tablehead_b" width="2" rowspan="4" style="writing-mode=tb-rl;text-align: center;">
		                						����
		                					</td>
						                  	<td width="140" class="text_tablehead_b">
						                  	�ۿ��ͬ���
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.pmtagrmtnb" id="pmtagrmtnb" maxlength="60" value="${poDetails.pmtagrmtnb}"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  	ҵ���������<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                   		<select name="poDetails.pmtkd" id="pmtkd" style="width: 130px;">
						                   			<option value="">��ѡ��</option>
						                   			<option value="00100">���</option>
													<option value="00200">ˮů��</option>
													<option value="00300">ú����</option>
													<option value="00400">�绰��</option>
													<option value="00500">ͨѶ��</option>
													<option value="00600">���շ�</option>
													<option value="00700">���ݹ����</option>
													<option value="00800">��������</option>
													<option value="00900">ѧ�̷�</option>
													<option value="01000">���ߵ��ӷ�</option>
													<option value="01100">��ҵ�������</option>
													<option value="09001">����</option>
						                   		</select>
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	���<font color="#FF0000">*</font>
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.snglamt" id="snglamt" maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)" value="${poDetails.snglamt}"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                 	<td class="text_tablehead_b">
						                  	����
						                  	</td>
						                  	<td colspan="3"><div align="left">
						                  		<textarea name="poDetails.addtlinf" rows="3" style="width: 100%" id="addtlinf" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)" >${poDetails.snglamt}</textarea>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  	��ע
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
				<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
				<br />
				<br />
				<c:choose> 
					<c:when test="${syspara == 'fkradd'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="ckeckwethornull();" /></c:when>
					<c:when test="${syspara == 'fkrmod'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="xiugaibc()" /></c:when>
				</c:choose>
				&nbsp;
				<input id="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="history.back();" />
				</div>
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"></td>
	  	</tr>
	</table>
</html:form>
</body>
</html>
