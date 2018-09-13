<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
      response.setHeader("Pragma","No-cache");
   response.setHeader("Cache-Control","no-cache");
   response.setDateHeader("Expires", 0);
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>�ޱ����ĵ�</title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<html:form method="post" action="systemManage/systemGroupManageAction.do?method=xxx">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;ϵͳ����&nbsp;->&nbsp;�û������&nbsp;->&nbsp;ϵͳ�û������</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="800" height="30" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td height="40">
													<div align="center">
														<span class="text_blue2">�û�����ϸ</span>
													</div>
												</td>
											</tr>
											<tr>
												<td height="30">
													<div align="center">
														<table style="width:450px" border="0" cellpadding="1"
															cellspacing="1" class="tbcolor">
															<tr>
																<td  class="text_tablehead_b" >
																	<div align="right">
																		ID��:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="teamid" value="${entity.teamid}" style="width:280px" maxlength="12" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
																<tr>
																<td  class="text_tablehead_b" >
																	<div align="right">
																		������:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="teamname" value="${entity.teamname}" style="width:280px" maxlength="12" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		���ƴ���:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="namecode" value="${entity.namecode}" style="width:280px" maxlength="5" readonly="true"/>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		Ӣ������:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:text property="englishname" value="${entity.englishname}" style="width:280px" readonly="true"></html:text>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		ƴ����:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:text property="phoneticizecode" value="${entity.phoneticizecode}" style="width:280px" readonly="true"/>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		�û���ɫ:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																	<html:select property="roleindentifier" style="width: 280px" disabled="true">
																			<logic:present name="roleList">
																					<logic:iterate id="role" name="roleList">
																							<logic:equal name="role" property="identifier" value="${entity.roleindentifier }">
																							<option
																								value="${role.identifier }" selected="selected">
																								${role.name }
																							</option>
																							</logic:equal>
																							<logic:notEqual name="role" property="identifier" value="${entity.teamid }">
																							<option
																								value="${role.identifier }">
																								${role.name }
																							</option>
																							</logic:notEqual>
																						</logic:iterate>
																				</logic:present>
																		</html:select>
																	</div>
																</td>
															</tr>
															<tr>
																<td  class="text_tablehead_b">
																	<div align="right">
																		��ע:
																	</div>
																</td>
																<td  class="text_list">
																	<div align="left">
																		<html:textarea property="common" value="${entity.common}" style="width:280px" rows="4" style="width:280px" readonly="true"></html:textarea>
																	</div>
																</td>
															</tr>													
														</table>
														<br />
													</div>
												</td>
											</tr>
										</table>
										<br />
										<br />
										<input name="backButton" type="button" class="button" value="��  ��"
											onclick="history.back();" />
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					
				</tr>
			</table>
			
		</html:form>
	</body>
	<script language='javascript'>
	var brselect1=document.getElementById("brselect1").innerHTML;
	var brselect2=document.getElementById("brselect2").innerHTML;
	function changeOption(){
		var brType=document.getElementById("brType").value;
		
		if(brType=="1"){
		    alert("��ѡ���������");
		    return false;
			document.getElementById("brselect1").style.display="none"
			document.getElementById("brselect2").style.display="none";//���ò�ռλ
			document.getElementById("brselect1").innerHTML="<select><option value=''>��</option></select>";			
		}
		if(brType=="2"){
			document.getElementById("brselect1").style.display="block"
			document.getElementById("brselect2").style.display="none";//���ò�ռλ;
			document.getElementById("brselect1").innerHTML=brselect1;			
		}
		if(brType=="3"){
			document.getElementById("brselect2").style.display="block";//���ò�ռλ
			document.getElementById("brselect1").style.display="none";//
			document.getElementById("brselect2").innerHTML=brselect2;					
		}		
	}
	function load(){
		document.getElementById("brselect1").style.display="block"
			document.getElementById("brselect2").style.display="none";//���ò�ռλ
			document.getElementById("brselect1").innerHTML="<select style='width:150px'><option  value=''>��</option></select>";
	}
	function checkadduserinput(){
	
	var brCode=document.getElementsByName("brCode")[0].value;
	if(brCode == ""){
			alert("�кŲ���Ϊ�գ�");
			document.getElementsByName("brCode")[0].focus();
			return false;
	}
	
	var brcode = /^([0-9]{12})/;
	if(!brcode.exec(brCode)){
			alert("��������кų��Ȳ������зǷ��ַ���");
			document.getElementsByName("brCode")[0].focus();
			return false;
	}
	
	var jigoucode=document.getElementsByName("jigoucode")[0].value;
<%--	if(jigoucode == ""){--%>
<%--			alert("�������벻��Ϊ�գ�");--%>
<%--			document.getElementsByName("jigoucode")[0].focus();--%>
<%--			return false;--%>
<%--	}--%>
	
<%--	var jigou = /^([0-9]{5})/;--%>
<%--	if(!jigou.exec(jigoucode)){--%>
<%--			alert("������Ļ������볤�Ȳ������зǷ��ַ���");--%>
<%--			document.getElementsByName("jigoucode")[0].focus();--%>
<%--			return false;--%>
<%--	}--%>
	
	var brType=document.getElementsByName("brType")[0].value;
	var brpid = /^([1])/;
	if(brpid.exec(brType)){
			alert("��ѡ���������");
			document.getElementsByName("brType")[0].focus();
			return false;
	}
	
	var brName=document.getElementsByName("brName")[0].value;
	if(brName==""){
			alert("�������Ʋ���Ϊ��");
			document.getElementsByName("brName")[0].focus();
			return false;
	}
	
	var brOrgNo=document.getElementsByName("brOrgNo")[0].value;
<%--	if(brOrgNo==""){--%>
<%--			alert("��֯��������Ϊ�գ�");--%>
<%--			document.getElementsByName("brOrgNo")[0].focus();--%>
<%--			return false;--%>
<%--	}--%>
<%--	var brorgno = /^([0-9]{8})([-])([A-Za-z0-9])/;--%>
<%--	if(!brorgno.exec(brOrgNo)){--%>
<%--			alert("��������������������ȷ�ĸ�ʽ���磺��88888888-z����");--%>
<%--			document.getElementsByName("brOrgNo")[0].focus();--%>
<%--			return false;--%>
<%--	}--%>
	
	
	var brParentid=document.getElementsByName("brParentid")[0].value;

	if(brParentid == ""){
			alert("��ѡ�񸸼�������");
			document.getElementsByName("brParentid")[0].focus();
			return false;
	}
    var brParent = /^([0-9]{1,11})/;
	if(!brParent.exec(brParentid)){
			alert("������ĸ��������зǷ��ַ���");
			document.getElementsByName("brParentid")[0].focus();
			return false;
	}
	var brAddress=document.getElementsByName("brAddress")[0].value;
<%--	if(brAddress==""){--%>
<%--			alert("������ַ����Ϊ��");--%>
<%--			document.getElementsByName("brAddress")[0].focus();--%>
<%--			return false;--%>
<%--	}   --%>
        
    document.form1.submit();
    opendiv();
	}
	
	</script>
</html>
 