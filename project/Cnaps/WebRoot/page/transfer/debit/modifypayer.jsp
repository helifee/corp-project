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
			 	 
			 var endToEndId = document.getElementById("endToEndId");
			 var dbtracct = document.getElementById("dbtracct");
			 var dbtrnm = document.getElementById("dbtrnm");
			 var dbtrbrnchid = document.getElementById("dbtrbrnchid");
			  var dbtrissuer = document.getElementById("dbtrissuer");
			 var dbtrmmbid = document.getElementById("dbtrmmbid");
			  var dtlAmt = document.getElementById("dtlAmt");
			  var pmtagrmtnb = document.getElementById("pmtagrmtnb");

			 
			  
			 
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
				 
				 document.getElementById("dtlAmt").value=rmoney(document.getElementById("dtlAmt").value) ;
				
		 if(boo){
				document.forms[0].submit();
			 }
				 
		 }
		 
	
	     var A00100 = {name:"00100",value:"���"}; 
         var A00200 = {name:"00200",value:"ˮů��"}; 
         var A00300 = {name:"00300",value:"ú����"}; 
         var A00400 = {name:"00400",value:"�绰��"}; 
         var A00500 = {name:"00500",value:"ͨѶ��"}; 
         var A00600 = {name:"00600",value:"���շ�"}; 
         var A00700 = {name:"00700",value:"���ݹ����"};   
         var A00800 = {name:"00800",value:"��������"}; 
         var A00900 = {name:"00900",value:"ѧ�̷�"};
         var A01000 = {name:"01000",value:"��ҵ�������"};
         var A09001 = {name:"09001",value:"����"};
         var A01100 = {name:"01100",value:"��������"};
         var A01200 = {name:"01200",value:"н�𱨳�"};
     A104 = [A00100,A00200,A00300,A00400,A00500,A00600,A00700,A00800,A00900,A01000,A01100,A09001 ]; 
	function tt(){
	 
	for(var i=0;i < A104.length;i++){
		     if(A104[i].name=="${poDetails.pmtkd}"){
		    
		          document.getElementById("pmtkd").value=   A104[i].value;
		     }
			 }
	
	}
		// �������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var dbtrissuer= document.getElementById("dbtrissuer");
				 var dbtrissuernm= document.getElementById("dbtrissuernm");
				selectBank(url,dbtrissuer,dbtrissuernm,"");
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
		</script>
	</head>
	<body  onload="tt()"> 
	 		<form method="post" name="form0"
			action="<%=path%>/RegularDebitChildrenAction.do?method=updateChild">
			 <input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<input type="hidden" name="poDetails.id" id="id" maxlength="32" value="${poDetails.id}"/>
		     <input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${poDetails.prntid}"/>
		                					         					
		  
		  
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
						                  	<div  class="text_title"><span class="text_blue2">��������Ϣ�޸�</span></div>
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
																		<input type="text" name="poDetails.dbtracct" id="dbtracct" maxlength="32" title="�������˺�"  value="${poDetails.dbtracct}"/>
																<font color="#FF0000">*</font></td>
															
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td >
																<input type="text" name="poDetails.dbtrnm" id="dbtrnm" maxlength="60"  title="����������"  value="${poDetails.dbtrnm}" /><font color="#FF0000">*</font>
																	</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	�����˵�ַ
																</td>
																<td >
																		<input type="text" name="poDetails.dbtraddr" id="dbtraddr" title="�����˵�ַ" maxlength="70"  value="${poDetails.dbtraddr}"/>
						                  	
																</td>
 
																</tr>
																
																<tr>
																	<td class="text_tablehead_b" >
																			�������к�
																</td>
																<td>
																	<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" maxlength="14" style="width:100px" readonly="readonly" value="${poDetails.dbtrbrnchid}"/>
																	<input type="button" class="button"  value="����" onclick="selectBankInfo()"><font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b"  >
																
																����������
																</td>
																<td >
																	<input type="text" name="poDetails.dbtrbrnchnm" readonly="readonly" id="dbtrbrnchnm" maxlength="60" value="${poDetails.dbtrbrnchnm}"/><font color="#FF0000">*</font>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	�����˿������к�
																</td>
																<td>
																<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" readonly="readonly" style="width:100px"
																	maxlength="14"  value="${poDetails.dbtrissuer}"/>
																	<input type="button" class="button"  value="����" onclick="selectBankInfoOfFkk()"><font color="#FF0000">*</font></td>
																	
																	<td class="text_tablehead_b" >
																�����˿���������
																</td>
																<td >
																	<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm" readonly="readonly" maxlength="60"  value="${poDetails.dbtrissuernm}"/><font color="#FF0000">*</font>
																</td>
																</tr>
																<tr>
																<td>
																	<input type="hidden" name="poDetails.dbtrmmbid" id="dbtrmmbid" maxlength="14" value="${poDetails.dbtrmmbid}"/>
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
																 
																<input type="text" id="pmtkd" maxlength="19"  
																  readonly="readonly"/><font color="#FF0000">*</font>
															
																	</td>
															 <td class="text_tablehead_b">
																	���
																</td>
																<td >
																		<input type="text" name="poDetails.dtlAmt" id="dtlAmt" maxlength="10"
																			 title="���" onkeyup="value=value.replace(/[^\d.,]/g,'') " 
																			 	onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';  "  value="${poDetails.dtlAmt}" />
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
																		rows="2" cols="80" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')">${poDetails.addtlinf}</textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                                                  	
  <%-- 
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
																		rows="2" cols="80" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')">${poDetails.ustrd}</textarea>
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
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
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
 