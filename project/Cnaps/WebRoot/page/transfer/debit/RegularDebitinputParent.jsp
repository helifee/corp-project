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
		<c:when test="${syspara == 'addmxjl'}">���ڽ��-��ϸ�������</c:when>
		<c:when test="${syspara == 'modifymxjl'}">���ڽ��-��ϸ�����޸�</c:when>
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
<body>
<html:form method="post" action="/regularDebitAction.do?method=sendMsgcreatedetails&syspara=${syspara}">
	<input id="business_name" type="hidden" value="RegularDebitMsg">
	<input id="repeatmark" type="hidden" value="0">
	
	
	
	------------------------------------
	
	
	
	
	
	
	gggggggggggggggggggggggggg
	
	
	
	
	
	
	
	----------------------------------------
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
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
								<c:when test="${syspara == 'addmxjl'}">���ڽ��-��ϸ�������</c:when>
								<c:when test="${syspara == 'modifymxjl'}">���ڽ��-��ϸ�����޸�</c:when>
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
								<c:when test="${syspara == 'addmxjl'}">
									<table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
			          					<tr>
						                  	<td width="165" class="text_tablehead_b">
						                  		�տ���<font color="#FF0000">*</font>
						                  	</td>
						                  	<td width="415" colspan="4"><div align="left">
						                   		<input type="text" name="po.amount" id="amount" maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
						                   		<input type="hidden" name="po.aclmtamt" value="0"/>
						                  		<input type="hidden" name="po.nboftxs" value="0"/>
						                  	</td>
						                 </tr>
						            </table>
						            <table border="1" bordercolor="#BDD#F0" bgcolor="#f4f8fd" align="center" cellpadding="0" cellspacing="0">
			          					<tr>
						                  	<td class="text_tablehead_b" width="2" rowspan="5" style="writing-mode=tb-rl;text-align: center;">
		                						��������Ϣ
		                					</td>
		                					<td width="140" class="text_tablehead_b">
						                		������֤����
						                	</td>
						                  	<td width="130"><div align="left">
						                   		<input type="text" name="po.proposercertid" id="proposercertid" maxlength="30"/>
						                  	</td>
						                  	<td width="140" class="text_tablehead_b">
						                  		�����˿ͻ���
						                  	</td>
						                  	<td width="130"><div align="left">
						                   		<input type="text" name="po.proposercstmrid" id="proposercstmrid" maxlength="30"/>
						                  	</td>
						                 </tr>
						                 <tr>
						                  	<td class="text_tablehead_b">
						                  		֤�����й���
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="po.proposercertissued" id="proposercertissued" maxlength="3"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		�������˻�����
						                  	</td>
						                  	<td><div align="left">
						                   		<select name="po.proposeraccttp" id="proposeraccttp" style="width: 100%">
						                   			<option value="">��ѡ��</option>
						                   			<option value="AT00">�Թ��˻�</option>
						                   			<option value="AT01">���˴��ǿ��˻�</option>
						                   			<option value="AT02">���˽�ǿ�</option>
						                   			<option value="AT03">����</option>
						                   			<option value="AT04">����</option>
						                   		</select>
						                  	</td>
						                  </tr>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		�������˻�����
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="po.proposeracctccy" id="proposeracctccy" maxlength="3"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		֤������
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="po.proposercerttp" id="proposercerttp" maxlength="30"/>
						                  	</td>
						                  </tr>
						                  <tr>
						                  	<td class="text_tablehead_b">
						                  		����������
						                  	</td>
						                  	<td ><div align="left">
						                   		<input type="text" name="po.proposernm" id="proposernm" maxlength="60"/>
						                   	</td>
						                   	<td class="text_tablehead_b">
						                   		��������ϵ�绰
						                   	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="po.proposertel" id="proposertel" maxlength="20"/>
						                    </td>
						                  </tr>
						                  <tr>	
						                  	<td class="text_tablehead_b">
						                  		�������˺�
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="po.proposeracct" id="proposeracct" maxlength="32"/>
						                  	</td>
						                  	<td class="text_tablehead_b">
						                  		�����˵�ַ
						                  	</td>
						                  	<td><div align="left">
						                   		<input type="text" name="po.proposeraddr" id="proposeraddr" maxlength="70"/>
						                  	</td>
						                   </tr>
						               </table>
								</c:when>
								<c:when test="${syspara == 'modifymxjl'}">
									
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
					<c:when test="${syspara == 'addmxjl'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="ckeckwethornull();" /></c:when>
					<c:when test="${syspara == 'modifymxjl'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="xiugaibc()" /></c:when>
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
