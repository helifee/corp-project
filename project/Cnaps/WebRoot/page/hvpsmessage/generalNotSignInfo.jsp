<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">
<META   HTTP-EQUIV="Expires"   CONTENT="0"> 
<title> ͨ�÷�ǩ����Ϣ¼�� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript" src="<%=path%>/js/transfer/test.js"></script>
<script language="javascript">
	function changefj(){
		if(this.document.getElementById("ywfj").value == "1"){
			this.document.getElementById("fjxx").style.display = "";
		}else{
			this.document.getElementById("fjxx").style.display = "none";
			this.document.getElementById("attachment").value = "";
		}
	}
	function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("recvdrctpty");
				selectkhhBank(url,recvbkno,"","","","");
			}
</script>

</head>
<body onload="changefj()">
<html:form enctype="multipart/form-data" method="post" action="/generalNotSignInfoAction.do?method=sendMsg&business=${business}">
	<input id="business_name" type="hidden" value="generalNotSignInfo">
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
						                  	<div  class="text_title"><span class="text_blue2">ͨ�÷�ǩ��¼��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																		���ղ��������
																</td>
																<td >
																	<input type="text" name="po.recvdrctpty" id="recvdrctpty" readonly="readonly" maxlength="14"/>
																	<input id="selbutton" type="button" class="button"  value="����" onclick="selectBankInfo()" >
																		<font color="#FF0000">*</font>
																</td>
															
																<td class="text_tablehead_b"  >
																		ϵͳ��ţ�
																</td>
																<td >
																	<select name="po.systemcode" id="systemcode" style="width: 130px;"">
											                  			<option value="HVPS">���</option>
											                  			<option value="BEPS">С��</option>
											                  		</select> <font color="#FF0000">*</font>
																</td>
															</tr>
															<td class="text_tablehead_b"  >
																��ע��
																</td>
																<td colspan="3">
																	<textarea name="po.remarkinfo" id="remarkinfo" rows="3" cols="50" onkeyup="jsxxcd(this,256)" onblur="jsxxcd(this,256)"></textarea>	
																</td>
															</table>
                                                 </div>
                                                 </br>
                                                 </br>
                                                 </br>
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">ǩ����Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
																<td class="text_tablehead_b" >
																	ҵ�����ͱ��룺
																</td>
																<td >
																<select  name="po.transactiontypecode" id="transactiontypecode" style="width: 180px;" >
				                  		                 	         
				                  		                          </select>
																</td>
																<td class="text_tablehead_b">
																	��Ϣ���⣺
																</td>
																<td >
																	<input type="text" name="po.title" id="title" maxlength="80"/> <font color="#FF0000">*</font>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b"  >
																	��Ϣ���ݣ�
																</td>
																<td colspan="3">
																	<textarea name="po.content" id="content" rows="3" cols="50" onkeyup="jsxxcd(this,256)" onblur="jsxxcd(this,256)"></textarea> <font color="#FF0000">*</font>	
																</td>
																 
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	���޸�����
																</td>
																<td>
																<select id="ywfj" style="width: 130px;" onchange="changefj()">
										                   			<option value="0">��</option>
										                   			<option value="1">��</option>
										                   		</select> 
																</td>
																</tr>
                                                 	</table>
                                                </div>
                                                    <div class="table_content" id="fjxx" >
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>	
                                                      		<td class="text_tablehead_b">
										                   		������
										                	</td>
										                <td colspan="3" width="434">
										                	<span id="uploadImg"> <input name="po.attachment"
													  			type="file" id="attachment" size="1" value="� ��"  /> 
															</span> 
										               </td>
                                                  		</table>
                                                 </div>
                                                   
                                        <div class="table_content" align="center">          
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="ckeckwethornull();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="��  ��" onclick="history.back();" />
										<br />
										<br />   
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
                                           </td>
                                         </tr>
                                      </table>
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>
				</tr>
			</table>
</html:form>
<xml id="oxml">
		<item>
		
		<item value="A108" text="�ֽ���"/>                                          
<item value="A110" text="���ճи�"/>                                          
<item value="A109" text="ί���տ�(����)"/>                                          
<item value="A101" text="�������ʽ�㻮"/>                                          
<item value="A102" text="������"/>                                          
<item value="A104" text="�����ʽ���ǻ���"/>                                         
<item value="A301" text="�ɷ�ҵ��"/>                                          
<item value="A201" text="֧Ʊ"/>                                          
<item value="A100" text="��ͨ���"/>                                          
<item value="A112" text="�������"/>                                          
<item value="A200" text="�м��ʽ�㻮"/>                                          
<item value="A202" text="���л�Ʊ"/>                                          
<item value="A113" text="�羳֧��"/>                                          
<item value="A307" text="�����ʽ��ծ�Ҹ����ǻ���"/>                                 
<item value="B307" text="�����ʽ��ծ�Ҹ���ǻ���"/>                                 
<item value="A106" text="֧ȡ���л���"/>                                          
<item value="B100" text="��ͨ���ҵ��"/>                                          
<item value="C102" text="���˴���ͨ��ҵ��"/>                                         
<item value="D102" text="���˴���ͨ��ҵ��"/>                                         
<item value="E100" text="��ͨ���ڴ���ҵ��"/>                                         
<item value="B308" text="֧Ʊ����"/>                                          
<item value="B309" text="Ʊ�ݽ���"/>                                          
<item value="A113" text="�羳֧��"/>                                          
<item value="A309" text="CISͨ��Ʊ��ҵ���ִ"/>                                      
<item value="A308" text="CIS֧Ʊҵ���ִ"/>
		
		
		</item>
		</xml>
<script>
		    var C=AttachXMLForSelect(oxml.XMLDocument,[generalNotSignInfoForm("transactiontypecode")]);
		</script>
</body>
</html>
