 <%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
	<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
 		<script type="text/javascript">
			function commitForm(){
		   var msg = "@";
			 	
		 
			 var dbtracct = document.getElementById("dbtracct");
			 var dbtrnm = document.getElementById("dbtrnm");
			 var dbtrbrnchid = document.getElementById("dbtrbrnchid");
			  var dbtrissuer = document.getElementById("dbtrissuer");
			 var dbtrmmbid = document.getElementById("dbtrmmbid");
			  var dtlAmt = document.getElementById("dtlAmt");
			 
			 if(isNull(trim(dbtracct.value))){
					msg += dbtracct.title+"����Ϊ�գ�@";
				    }
			 if(isNull(trim(dbtrnm.value))){
					msg += dbtrnm.title+"����Ϊ�գ�@";
				    }
			
			if(isNull(trim(dbtrissuer.value))){
					msg += dbtrissuer.title+"����Ϊ�գ�@";
				    }
			if(isNull(trim(dbtrmmbid.value))){
					msg += dbtrmmbid.title+"����Ϊ�գ�@";
				    }
			if(isNull(trim(dtlAmt.value))){
					msg += dtlAmt.title+"����Ϊ�գ�@";
				    }
				   
				 var boo = msgSplit(msg);
				 
			
				
		 if(boo){
		 	 document.getElementById("dtlAmt").value=rmoney(document.getElementById("dtlAmt").value) ;
				document.forms[0].submit();
			 }
				 
		 }
		 
		 	 
	
			
			         //�������кŲ�ѯ
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var dbtrbrnchid= document.getElementById("dbtrbrnchid");
				var dbtrbrnchnm=document.getElementById("dbtrbrnchnm");
				selectBank(url,dbtrbrnchid,dbtrbrnchnm,"");
				
				var recvbkno= document.getElementById("dbtrbrnchid");
				var recvbkname=document.getElementById("dbtrbrnchnm");
				var recvopnbkno=document.getElementById("dbtrmmbid");
				var skhkhhhh= document.getElementById("dbtrissuer");
				var skrkhhmc=document.getElementById("dbtrissuernm");
				selectkhhBank(url,recvbkno,recvbkname,recvopnbkno,skhkhhhh,skrkhhmc);
				
			}
			        
		// �������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var dbtrissuer= document.getElementById("dbtrissuer");
				 var dbtrissuernm= document.getElementById("dbtrissuernm");
				selectBank(url,dbtrissuer,dbtrissuernm,"");
			}
		</script>
	</head>
	<body  > 
	 		<form method="post" name="form0"
			action="<%=path%>/RegularDebitChildrenAction.do?method=saveChild">
			 <input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			 <input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${PrntId}"/>
		    <input type="hidden" name="poDetails.pmtgrpid" id="pmtgrpid" maxlength="32" value="${pmtgrpid}"/>
		    
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
						                  	<div  class="text_title"><span class="text_blue2">��������Ϣ���</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                 <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
                                                      </tr>
                                                   
                                                 		<tr>
															<td class="text_tablehead_b"  >
																�������˺�
																</td>
																<td>
																		<input type="text" name="poDetails.dbtracct" id="dbtracct"  title="�������˺�" maxlength="32" onKeyPress="actkeyPress()"/><font color="#FF0000">*</font>
																</td>
															
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td >
																<input type="text" name="poDetails.dbtrnm" id="dbtrnm"   title="����������" maxlength="60"/><font color="#FF0000">*</font>
																	</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	�����˵�ַ
																</td>
																<td colspan="3" >
																		<input type="text" name="poDetails.dbtraddr"  style=" width : '400px'"  id="dbtraddr" title="�����˵�ַ" maxlength="140"/>
						                  	
																</td>

																
																</tr>
																	<tr>
																	
																
																
																<td class="text_tablehead_b" >
																			�������к�
																</td>
																<td>
																	<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" readonly="readonly"
																		maxlength="14" style="width:80px " title="�������к�"/>
																		<input type="button" class="button"  value="����" onclick="selectBankInfo()"><font color="#FF0000">*</font>
															
																</td>
																<td class="text_tablehead_b"  >
																����������
																</td>
																<td >
																	<input type="text" name="poDetails.dbtrbrnchnm" id="dbtrbrnchnm" 
																		maxlength="60" title="����������" readonly="readonly"/><font color="#FF0000">*</font>
																</td>
																</tr>
																
																<tr>
																	
																 
																<td class="text_tablehead_b" >
																	�����˿������к�
																</td>
																<td>
																<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" readonly="readonly"
																	 title="�����˿������к�" style="width:80px " maxlength="14"/>
																<input type="button" class="button"  value="����" onclick="selectBankInfoOfFkk()"><font color="#FF0000">*</font>
																	</td>
																	
																	<td class="text_tablehead_b" >
																�����˿���������
																</td>
																<td >
																	<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm"
																		 title="�����˿���������" readonly="readonly" maxlength="60"/><font color="#FF0000">*</font>
																</td>
																	
																</tr>
																
																<tr>
																
																
																<td>
																	<input type="hidden" name="poDetails.dbtrmmbid" id="dbtrmmbid" title="�����������к�" style="width:80px " maxlength="14"/>
																		 
																		
															</td>
																</tr>
                                                 	</table>
                                                </div>
                                                
                                                
                                                
                                                
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�����Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b" >
																	ҵ���������
																</td>
																<td >
																<select name="poDetails.pmtkd" id="pmtkd" style="width: 130px;">
						                   		 					
										                   			<c:if test="${pmtkd eq '00100'}"><option value="00100">���</option>        </c:if>
																	<c:if test="${pmtkd eq '00200'}"><option value="00200">ˮů��</option>      </c:if>
																	<c:if test="${pmtkd eq '00300'}"><option value="00300">ú����</option>      </c:if>
																	<c:if test="${pmtkd eq '00400'}"><option value="00400">�绰��</option>      </c:if>
																	<c:if test="${pmtkd eq '00500'}"><option value="00500">ͨѶ��</option>      </c:if>
																	<c:if test="${pmtkd eq '00600'}"><option value="00600">���շ�</option>      </c:if>
																	<c:if test="${pmtkd eq '00700'}"><option value="00700">���ݹ����</option>  </c:if>
																	<c:if test="${pmtkd eq '00800'}"><option value="00800">��������</option>  </c:if>
																	<c:if test="${pmtkd eq '00900'}"><option value="00900">ѧ�̷�</option>      </c:if>
																	<c:if test="${pmtkd eq '01000'}"><option value="01000">���ߵ��ӷ�</option>  </c:if>
																	<c:if test="${pmtkd eq '01100'}"><option value="01100">��ҵ�������</option></c:if>
																	<c:if test="${pmtkd eq '09001'}"><option value="09001">����</option></c:if>
										                   		</select><font color="#FF0000">*</font>
																	</td> 
															<td class="text_tablehead_b">
																	���
																</td>
																<td >
																			<input type="text" name="poDetails.dtlAmt" id="dtlAmt" maxlength="10"
																			 title="���" onkeyup="value=value.replace(/[^\d.,]/g,'') " 
																			 	onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';  " />
																	<font color="#FF0000">*</font>
																</td>
																
															</tr>
															
																<tr>
																
																	<td width="140" class="text_tablehead_b">
						                  	�ۿ��ͬ���
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.pmtagrmtnb" id="pmtagrmtnb" maxlength="60"  title="�ۿ��ͬ���"   value="${poDetails.pmtagrmtnb}"/>
						                  	</td>
															 
																
																</tr>
															  	</table>
                                                </div>
                                                
                                                 
                                                    <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	����
																</td>
																<td colspan="3">
																	<textarea name="poDetails.addtlinf" id="addtlinf" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','addtlinf')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                                                  	<%-- 
                                                <div class="table_content">
                                                                                                  
                                                        		<table>
                                                    		
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��ע��Ϣ</span></td>
                                                      </tr><tr>
																<td class="text_tablehead_b" >
																	��ע
																</td>
																<td colspan="3">
																	<textarea name="poDetails.ustrd" id="ustrd" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','ustrd')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    </div>
                                                   
                                                   --%>
                                                   
                                                            <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
											<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="��  ��"  />
                                                    			</td>
                                                    			
                                                    		</tr>
                                                    	</table>
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
					<td></td>

					
				</tr>
			</table>
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		   
													
						 

		</form>
	</body>
</html>
 