<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>

		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript">
		
		function getDefaultDate(){
		 var newDay=new Date();
		 var year=newDay.getFullYear();
		 var month=newDay.getMonth();
		 var day=newDay.getDate();
		 document.getElementById("paydt").value= year+'-'+(month+1)+'-'+day;
		}
		
		function selectBankZHCPR(){
				var url ="<%=request.getContextPath()%>";
				var holderbk= document.getElementById("holderbk");
				var holderbkname=document.getElementById("holderbkname");
				selectBank(url,holderbk,holderbkname,'');
			}
		
		function selectBankHPQHH(){
				var url ="<%=request.getContextPath()%>";
				var issuerbk= document.getElementById("issuerbk");
				var issuerbkname=document.getElementById("issuerbkname");
				selectBank(url,issuerbk,issuerbkname,'');
			}
			
			function commitForm(){
				if(VForm.Validate()){
				document.getElementById("issueamt").value = rmoney(document.getElementById("issueamt").value);
				  document.forms[0].submit();
				}
			}

			function fmoney(s, n)//������ת���ɶ��ŷָ�����ʽ,������λС��s:value,n:С��λ��      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			}   
			//��ԭ���   
			function rmoney(s)   
			{   
				var str=/\S/;
				if(!str.test(s)){
					return 0;
				}
				 return parseFloat(s.replace(/[^\d\.-]/g, ""));   
			}
			//����������

		</script>
	</head>
	<body>
		<form name="form1" method="post"
			action="<%=path%>/cashReturnedAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
			<input id="contrperson" name="contrperson" type="hidden">

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
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">���б�Ʊ�����˻�</span>
													</div>
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
                                                        
																<td class="text_tablehead_b">
																		��Ʊ����
																	</td>
																	<td>
																		<select name="po.businessSizeCode" 
																			id="businessSizeCode" style="width: 180px;"
																			title="��Ʊ����">
																			<option value="${po.businessSizeCode}"  'selected' }>
																			  <c:if test="${po.businessSizeCode eq '1' }">�ֽ�Ʊ</c:if>
																			  <c:if test="${po.businessSizeCode eq '2' }">ת�˱�Ʊ</c:if>
												                  
																			</option>
																			</select>
																			
																		<span class="STYLE1">*</span>
																	</td>
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td>
																	<input name="honourno" id="" type="text"  value="${po.honourno}"  maxlength="60" onKeyPress="numPress()"  title="��Ʊ����" />
																
																	<span name="validate" dataName="honourno" dataType="Empty" msg="��Ʊ���벻��Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																
															</tr>
                                                       
                                                         <tr>
																
																<td class="text_tablehead_b" >
																    ��Ʊ����
																</td>
																<td>
																
																	<input name="issueDt" id="cprq" class="Wdate" type="text"  onKeyPress="fun_date()"
																		readonly="readonly" title="��Ʊ����" 
																		class="Wdate" onclick="WdatePicker()" value="${po.issueDt}"/>	
																	<span name="validate" dataName="issueDt" dataType="Empty" msg="��Ʊ���ڲ���Ϊ�գ�" class="STYLE1">*</span>	
																	</td>
																<td class="text_tablehead_b">
																		��Ʊ��ˮ��
																	</td>
																	<td>
																		<input name="po.paymentGrouppo" id="paymentGroupNum"
																			type="text" readonly="readonly" value="${po.paymentGrouppo}" style="width: 180px;"
																			title="��Ʊ��ˮ��" maxlength="22" />
																		<span class="STYLE1"> *</span>

																	</td>	
																
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊ��Ѻ
																</td>
																<td>
																	<input name="billseal" id="" type="text" value="${po.billseal}" maxlength="14" onKeyPress="numPress()"   title="��Ʊ��Ѻ" />
																
																	<span name="validate" dataName="billseal" dataType="Empty" msg="��Ʊ��Ѻ����Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																
															</tr>
															<tr><td>&nbsp;</td></tr>
																<tr>
																	<td class="text_tablehead_b">
																		֤������
																	</td>
																	<td>
																		<select name="po.certsize" id="certsize">
																			<option value="01">
																				����֤
																			</option>
																			<option value="02">
																				����֤
																			</option>
																			<option value="03">
																				ѧ��֤
																			</option>

																		</select>

																	</td>
																<td class="text_tablehead_b">
																		������֤��
																	</td>
																	<td>
																		<input name="po.certnum" id="certnum" type="text"
																			size="19" maxlength="32" title="������֤��" />
																	</td>
															</tr>
															<tr>
																	<td class="text_tablehead_b">
																		֤�����й���
																	</td>
																	<td>
																		<select name="po.issueState" title="֤�����й���"
																			id="issueState">
																			<option value="CN">
																				CN-�л����񹲺͹�
																			</option>
																		</select>


																	</td>
																	<td class="text_tablehead_b">
																		��������ϵ�绰
																	</td>
																	<td>
																		<input name="po.phone" id="phone" type="text"
																			maxlength="20" title="��������ϵ�绰" />

																	</td>
																</tr>
																<tr>
																<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input name="po.proposerNm" id="name" type="text"
																			title="����������" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
															
															<tr>
															    <td>&nbsp;</td>
															</tr>
															<tr>
																<td class="text_tablehead_b">
																		ԭ������������
																	</td>
																	<td>
																		<input name="po.proposerNm" id="name" type="text"
																			title="ԭ������������" maxlength="60" onKeyPress="charPress()" value="${po.proposerNm}"/>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		ԭ�տ���������
																	</td>
																	<td>
																		<input name="po.name" id="name" type="text"
																			title="ԭ�տ���������" maxlength="60" onKeyPress="charPress()" value="${po.name}"/>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
															
															
															<tr>

																	<td class="text_tablehead_b">
																		���ִ���
																	</td>
																	<td>
																		<input name="po.moneyClassCode" id="moneyClassCode"
																			type="text" title="���ִ���" value="CNY"
																			readonly="readonly" onKeyPress="actkeyPress()" value="${po.moneyClassCode}" />
																	</td>
																	<td class="text_tablehead_b">
																		���
																	</td>
																	<td>
																		<input name="po.issueAmt" id="issueamt"
																			type="text" readonly="readonly" title="���"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "  value="${po.issueAmt}"/>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
															
															
															 <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	����
																</td>
																<td colspan="3">
																	<textarea name="remarkinfo" id="fy"   onKeyPress="jsxxcd(this,60)"
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
															<tr align="center">
                                                    		<td>&nbsp;</td><td>&nbsp;</td>
                                                    			<td align="center">
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="��  ��" onclick="commitForm();" />
                                                    			</td>
                                                    		</tr>
															
															
															</table>
                                              </div>
                                               
                                                 
                                                  
                                              
                                                    <div class="table_content">
                                                    	<table>
                                                    	
                                                    	
                                                    	</table>
                                                    </div>
                                                     <div class="table_content" align="center">
										    		
													<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
													
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
<br />
													<br />
													<br />
		</form>
	</body>
</html>