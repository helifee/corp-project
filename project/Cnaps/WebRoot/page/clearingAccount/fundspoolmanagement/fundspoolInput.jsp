<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Expires"   CONTENT="0"> 
		<title>�����˻��ʽ�ع�������</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/fundspool.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
				if(VForm.Validate()){
					var fundstooltype=document.getElementById("fundsOfPoolManagementType").value;
					if(fundstooltype=="MT00"){
						var fenzijigou = new Array();
						fenzijigou = document.getElementsByName("fenzijigou");
						for(var i=0;i<fenzijigou.length;i++){
							if(fenzijigou[i].value.length<=0){
								alert("�������֧�����������к� ");
								return false;
							}
						}
					}
					document.forms[0].submit();
				}
			  
			  
			}
			function selectType(){
				var fenzijigou = new Array();
				fenzijigou = document.getElementsByName("fenzijigou");
				for(var i=0;i<fenzijigou.length;i++){
					fenzijigou[i].value="";
				}
				var fundstooltype=document.getElementById("fundsOfPoolManagementType").value;
				if(fundstooltype=="MT00"){
					document.getElementById("A1044").style.display='block';
					document.getElementById("listnum1").value=1;
				}else{
					document.getElementById("A1044").style.display='none';
					document.getElementById("listnum1").value=0;
				}
			}
			
			
		</script>
	</head>
	<body >
	
	 
		
		<form method="post" name="myform"
			action="<%=path%>/FundspoolAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
	 
		  
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
						                  	<div  class="text_title"><span class="text_blue2">�ʽ�ع���¼�� </span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                             <div class="table_body">
                                           		 <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">		������Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																���˻����������кţ�
																</td>
																<td>
																	<input name="po.mgrId" id="mgrId" type="text"
																		style="width: 180px;" maxlength="15" title="���˻����������к�" onKeyPress="amountPress()"
																						onkeyup="value=value.replace(/[^\d.]/g,'')" />
																		<span name="validate" dataName="po.mgrId" dataType="Empty" msg="���˻����������кŲ���Ϊ�գ�" class="STYLE1">*</span>
															
																</td>
															
																<td class="text_tablehead_b" >
																		�ʽ�ع������ͣ�
																</td>
																<td >
																<select name="po.fundsOfPoolManagementType" id="fundsOfPoolManagementType" onchange="selectType()">
																			<option value="MT00">���ý��˳��</option>
																			<option value="MT01">������˳��</option>
																			<option value="MT02">ֹͣ�ʽ�ع���</option>
																			<option value="MT03">��������</option>
																		</select>
																		<span class="STYLE1">*</span>
															</td>
															</tr>
																<tr>
																
																<td  class="text_tablehead_b">
											                		��Ч����
											                	</td>
											                  	<td>
											                  		<input type="text" name="po.effectiveDate" id="effectiveDate" value="" onclick="WdatePicker()" class="Wdate">
											                  		<span  class="STYLE1">*</span>
											                  	</td>
				                  		
																<td class="text_tablehead_b">
																��֧������Ŀ��
																</td>
																<td >
																	<input name="po.branchQuantity" id="listnum1" type="text" readonly="sreadonly"
																		 maxlength="8" title="���˻����������к�" value="1" />
																		<span class="STYLE1">*</span>
																</td>

																
																</tr>
																<tr>
											                  	<td  class="text_tablehead_b">
											                  		��ע
											                  	</td>
											                  	<td colspan="3" >
											                   		<textarea name="po.remarkInfo" class="textarea_msg"  cols="50" rows="2" id="remarkInfo" onKeyPress="charPress()"></textarea>
											                   	</td>
											               </tr>
																<tr>
																
																<td class="text_tablehead_b" >
																	��֧�����ʽ���嵥��
																</td>
																<td>
																<input type=button  class="button" value="���" onclick="AddRow();" />
																	</td>
																	</tr>
																	<tr id="A1044" style="display: block;">
																<td colspan="4" align="right">
																	<div align="center">
																		<table id="mytable" border="0" cellpadding="2"
																			cellspacing="2" bordercolor="#CCCCCC"
																			style="text-align: left; vertical-align: top">
																			<tr id="gr1">
																				<td class="text_tablehead_b" align="right" >
																					��֧�����������кţ�
																				</td>
																				<td >
																					<input type="text" name="fenzijigou" id="fenzijigou" value=""
																						onKeyPress="amountPress()"
																						onkeyup="value=value.replace(/[^\d.]/g,'')" />
																				</td>
															</tr>
															
																		</table>
																	</div>
																</td>
															</tr>
                                                 	</table>
                                                 	
                                                </div>
                                                <div class="table_content" align="center">
                                                <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
                                                 				<br />
                                                 				</br>
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										
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
					<td></td>

					
				</tr>
			</table>
			 <br />	<br />
</form>	
	</body>
</html>
