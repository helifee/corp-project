<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@page import="com.cnaps.hvps.persistence.info.Querybook"%>
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
<title> ��Ʊ��Ѻ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">

 

</script>
		<script type="text/javascript">
		
		
		
			function checkAndSub(){
			var flag=1;
			 if(this.document.getElementById("code").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=0;
			 if(this.document.getElementById("num").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=0;
			 if(this.document.getElementById("money").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=0;
			 if(flag=0){
			 	alert("ҵ��Ҫ�ز�������");
			 	return;
			 } 
			 else{
			 	this.document.forms[0].submit();
			 }
			}

		
			
		</script>
</head>
<body>

<html:form method="post" action="/BianYaAction.do?method=sendMessage">
	 
	<input id="repeatmark" type="hidden" value="0" />




	<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">���б�Ʊ��Ѻ</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                      <div class="table_content">
                                                      <table >
																 
													 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��Ѻ��Ϣ</span></td>
                                                      </tr>	
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td>
																<select  name="po.benpiaoclass" id="benpiaoclass" style="width:180px;" title="��Ʊ����">
																<option value="01"  selected="selected">�ֽ�Ʊ</option>
																<option value="03"  >ת�˱�Ʊ</option>
															</select><span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	ǩ�����к�
																</td>
																<td >
																<input style="width:180px;" name="po.signbankcode" id="signbankcode" type="text" readonly="readonly"
																		 title="ǩ�����к�" value="${bankCode }"/>
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		ǩ������
																</td>
																<td>
																<input type="text" name="po.signdate" id="signdate"   class="Wdate" value="${workFormatDate }" onclick="WdatePicker()" />
																</td>
														
																<td class="text_tablehead_b" >
																	��Ʊ������
																</td>
																<td >
																	<input style="width:180px;" name="po.code" id="code" type="text" size="19"
																		maxlength="19" title="��Ʊ������" /><span  class="STYLE1">*</span>
																	
																</td>
															</tr>
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	��Ʊ����
																</td>
																<td >
																		<input name="po.num" id="num" type="text"
																		style="width: 180px;" title="��Ʊ����" maxlength="35"/><span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																	���
																</td>
																<td >
															
																<input name="po.money" id="money" type="text"
																			 title="���" maxlength="12"
																			 onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; " />
																	<span  class="STYLE1">*</span>
																
																</td>
															
																
															</tr>
															</table>
                                                </div>
                                                 <div class="table_content" align="center">
                                                 <br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="checkAndSub();"/>
										<br />
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
                                                     </div>
                                                    </div>
                                           </td>
                                         </tr>
                                      </table>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table> 
</html:form>
</body>
</html>
