<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>
 
	 
	 ���ڽ��ת�� 
	 
</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/DebitService.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
 <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script> 
 <script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
    
<style type="text/css">
input {width: 150px;}
</style>
 
<script language="javascript">
function getpmtkd(pmtkd ){
	  if( pmtkd=="00100"){
		document.getElementById("pmtkd").value="���";
		}	
		  if( pmtkd=="00200"){
		document.getElementById("pmtkd").value="ˮů��";
		}
		  if( pmtkd=="00300"){
		document.getElementById("pmtkd").value="ú����";
		}
		  if( pmtkd=="00400"){
		document.getElementById("pmtkd").value="�绰��";
		}	
		  if( pmtkd=="00500"){
		document.getElementById("pmtkd").value="ͨѶ��";
		}	
		  if( pmtkd=="00600"){
		document.getElementById("pmtkd").value="���շ�";
		}	
		 if( pmtkd=="00700"){
		document.getElementById("pmtkd").value="���ݹ����";
		}
		 if( pmtkd=="00800"){
		document.getElementById("pmtkd").value="��������";
		}
		 if( pmtkd=="00900"){
		document.getElementById("pmtkd").value="ѧ�̷�";
		}
		 if( pmtkd=="01000"){
		document.getElementById("pmtkd").value="���ߵ��ӷ�";
		}	
		 if( pmtkd=="01100"){
		document.getElementById("pmtkd").value="��ҵ�������";
		}	
		 if( pmtkd=="09001"){
		document.getElementById("pmtkd").value="����";
		}	
}

		function queryBypmtgrpid(paymentGroupNum){
	      clrAmt();	
                 	if(isNull(trim(paymentGroupNum))){
					 return;
				   }
		     
		         
			  	 PubService.queryRegularDebit(paymentGroupNum,function(obj){
			  	   
				   if(obj==null||obj.pmtgrpid==null){
				  alert("֧��������Ų����ڣ�����ʧЧ��δ�鵽�������");
				  document.getElementById("pmtgrpid").value="";       
					document.getElementById("proposercertid").value="";   
					document.getElementById("proposertel").value="";      
					document.getElementById("proposercstmrid").value="";  
					document.getElementById("proposercerttp").value="";   
					  document.getElementById("proposercerttp1").value="";
					document.getElementById("cdtracct").value="";         
					document.getElementById("cdtrnm").value="";           
					                                                      
					document.getElementById("cdtrbrnchid").value="";      
					document.getElementById("cdtrbrnchnm").value="";      
					document.getElementById("cdtrissuer").value="";       
					document.getElementById("cdtrissuernm").value="";     
					document.getElementById("cdtrmmbid").value="";        
					 document.getElementById("cdtraddr").value="";        
					document.getElementById("nboftxs").value="";          
					document.getElementById("aclmtamt").value="";         
				  
				   document.getElementById("pmtgrpid").focus();
				   return;
				  }else{
				
				  document.getElementById("pmtgrpid").value=obj.pmtgrpid==null?"": obj.pmtgrpid;
				  document.getElementById("proposercertid").value=obj.proposercertid==null?"": obj.proposercertid;
				  document.getElementById("proposertel").value=obj.proposertel==null?"": obj.proposertel;
				  document.getElementById("proposercstmrid").value=obj.proposercstmrid==null?"": obj.proposercstmrid;
				  document.getElementById("proposercerttp").value=obj.proposercerttp==null?"": obj.proposercerttp;//֤������
				    document.getElementById("proposercerttp1").value=obj.proposercerttp==null?"": obj.proposercerttp;//֤������
				  document.getElementById("cdtracct").value=obj.cdtracct==null?"": obj.cdtracct;
				  document.getElementById("cdtrnm").value=obj.cdtrnm==null?"": obj.cdtrnm;
				  
				  document.getElementById("cdtrbrnchid").value=obj.cdtrbrnchid==null?"": obj.cdtrbrnchid;
				  document.getElementById("cdtrbrnchnm").value=obj.cdtrbrnchnm==null?"": obj.cdtrbrnchnm;
				  document.getElementById("cdtrissuer").value=obj.cdtrissuer==null?"": obj.cdtrissuer;
				  document.getElementById("cdtrissuernm").value=obj.cdtrissuernm==null?"": obj.cdtrissuernm;
				  document.getElementById("cdtrmmbid").value=obj.cdtrmmbid==null?"": obj.cdtrmmbid;
				   document.getElementById("cdtraddr").value=obj.cdtraddr==null?"": obj.cdtraddr;
				  document.getElementById("nboftxs").value=obj.nboftxs==null?"": obj.nboftxs;
				  document.getElementById("aclmtamt").value=obj.aclmtamt==null?"": fmoney(obj.aclmtamt);
				  
				  getpmtkd(obj.pmtkd);
				  if(obj.pmttp=="F100"){
		document.getElementById("pmttp").value="��ͨ���ڽ��ҵ��";
		}	
		  	  if(obj.pmttp=="E102"){
		document.getElementById("pmttp").value="���ڴ���";
		}	
				  if(obj.proposeraccttp=="AT00"){
		document.getElementById("proposeraccttp").value="�Թ��˻�";
		}	
		
			if(obj.proposeraccttp=="AT01"){
		document.getElementById("proposeraccttp").value="���˴��ǿ��˻�";
		}	
			if(obj.proposeraccttp=="AT02"){
		document.getElementById("proposeraccttp").value="���˽�ǿ��˻�";
		}	
			if(obj.proposeraccttp=="AT03"){
		document.getElementById("proposeraccttp").value="����";
		}
			if(obj.proposeraccttp=="AT04"){
		document.getElementById("proposeraccttp").value="����";
		}		
				  }
				  }
				  )
			  			
		

			}
	//�����ܶ�
	 	function jisuan(){
				var sxf = $("#servicecharge").val();
				var ydf = $("#postage").val();
				var ydjs = $("#outstationcharge").val();
				var hkje = $("#amount").val();//�����
			 
				document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			 
		  function zcx(val){
				if(val.value=='Y'){
					$("#servicecharge").val("");//������
					$("#postage").val("");//�ʵ��
					$("#outstationcharge").val("");//��ؼ���
					$("#outstationcharge").attr("readonly",true);
					$("#postage").attr("readonly",true);
					$("#servicecharge").attr("readonly",true);
					jisuan();
				}else{
				 
					$("#servicecharge").attr("readonly",false);
					$("#postage").attr("readonly",false);
					$("#outstationcharge").attr("readonly",false);
				}
			}	 
			 

	 	function commitForm(){
	 	
	 	
			   var msg = "@";
					var pmtgrpid = document.getElementById("pmtgrpid");//֧���������
					var rcptltd = document.getElementById("rcptltd");//��ٻ�ִ����
					var amount = document.getElementById("amount");//�����
					var aclmtamt = document.getElementById("aclmtamt");//��ϸ���
					var totalamt = document.getElementById("totalamt");//�ܶ�
				 
				 var nboftxs = document.getElementById("nboftxs");//��ϸ����
				 var pmttp = document.getElementById("pmttp");//ҵ������
				  var pmtkd = document.getElementById("pmtkd");//ҵ������
				  var cdtracct = document.getElementById("cdtracct");//�տ����˺�
				    var cdtrnm = document.getElementById("cdtrnm");//�տ�������
				     var cdtrissuer = document.getElementById("cdtrissuer");//�տ��˿������к�
				    var cdtrissuernm = document.getElementById("cdtrissuernm");//�տ��˿���������
                  
                 	if(isNull(trim(pmtgrpid.value))){
					msg += pmtgrpid.title+"����Ϊ�գ� @";
				   }
				   if(isNull(trim(rcptltd.value))){
					msg += rcptltd.title+"����Ϊ�գ� @";
				   }
				   if(isNull(trim(pmttp.value))){
					msg += pmttp.title+"����Ϊ�գ� @";
				   }
				    if(isNull(trim(pmtkd.value))){
					msg += pmtkd.title+"����Ϊ�գ� @";
				   }
				   if(isNull(trim(cdtracct.value))){
					msg += cdtracct.title+"����Ϊ�գ� @";
				   }
				   if(isNull(trim(cdtrnm.value))){
					msg += cdtrnm.title+"����Ϊ�գ� @";
				   }
				   if(isNull(trim(cdtrissuer.value))){
					msg += cdtrissuer.title+"����Ϊ�գ� @";
				   }
				   if(isNull(trim(cdtrissuernm.value))){
					msg += cdtrissuernm.title+"����Ϊ�գ� @";
				   }
				   
				   
				   
				   
				   
				   
                   	if(isNull(trim(aclmtamt.value))){
					msg += aclmtamt.title+"����Ϊ�գ�@";
				   }
			 	   if(isNull(trim(nboftxs.value))){
					msg += nboftxs.title+"����Ϊ�գ�  @";
				   }
				
				
				var boo = msgSplit(msg);
				 
		 
				 
				if(boo){
			    	if(aclmtamt.value==amount.value){
				    	var servicecharge = document.getElementById("servicecharge");
						  var postage = document.getElementById("postage");
						  var outstationcharge = document.getElementById("outstationcharge");
					    document.getElementById("amount").value=rmoney(amount.value);//�����
					    document.getElementById("servicecharge").value=rmoney(servicecharge.value);
					    document.getElementById("postage").value=rmoney(postage.value);
					    document.getElementById("outstationcharge").value=rmoney(outstationcharge.value);
					     document.getElementById("totalamt").value=rmoney(totalamt.value);
					     document.getElementById("aclmtamt").value=rmoney(aclmtamt.value);
					   	
						document.forms[0].submit();
					}else{
					  alert("�տ������ۼ�¼���һ��");
					}
				}
		 }
	//���������Ѳ�ѯ
		function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('amount'),
				 	transno:'7125',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('servicecharge'),
				    ydf : document.getElementById('postage'),
				    ydjs : document.getElementById('outstationcharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalamt'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	bepsgbf: document.getElementById("bepsgbf"),
				  	hvpsgbf: document.getElementById("hvpsgbf"),
				  	waiven: document.getElementById("waiven")
				  };
				 calcharge(url,beginamt,endamt,obj);
			}	 
		 function clrAmt(){
				document.getElementById('amount').value="";
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
		 function clrAmt0(){
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value=document.getElementById('amount').value;
			}
</script>
 
</head>
<body>
 
<!--   
<html     form method="post" action="/regularDebitAction.do?method=sendMsgcreatedetails&syspara=input">-->

<html:form method="post" action="/RegularDebitTurnAction.do?method=sendturn" > 
	<input id="business_name" type="hidden" value="RegularDebitLdeger">
	<input type="hidden" name="token" value="${token}" />
	<input id="repeatmark" type="hidden" value="0">
	<input type="hidden" name="po.signmd" value="03"/> 
	<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
									  
	
	
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
						                  	<div  class="text_title"><span class="text_blue2">
						       
								 ���ڽ��ת�� 
						 
						                  	</span></div>
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
																<td class="text_tablehead_b" >
																	֧���������
																</td>
																<td>	
													<input type="text" style="width: 180px;" name="po.pmtgrpid"  id="pmtgrpid" maxlength="20" title="֧���������" onblur="queryBypmtgrpid(this.value)"/>																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																ҵ�����ͱ���
																</td>
																<td >
																<input type="text" style="width: 180px;" name="po.pmttp"  id="pmttp" maxlength="20" readonly="readonly" title="ҵ�����ͱ���" />																	<span  class="STYLE1">*</span>
													
														
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	��ٻ�ִ����
																</td>
																<td >
																		<input type="text" name="po.rcptltd" style="width: 180px;" title="��ٻ�ִ����"  id="rcptltd" maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	<!--�˵��˱�ʶ��-->ҵ���������
																</td>
																<td >
																<input type="text" style="width: 180px;" name="po.pmtkd"  id="pmtkd" maxlength="20" readonly="readonly" title="ҵ���������" />																	<span  class="STYLE1">*</span>
													
														
																</td>
																
															</tr>
															</table>
                                                 </div>
                                                  
                                                   <div class="table_content">
                                                 	<table>
                                                 	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td>
																<input type="hidden"   name="po.proposercerttp" id="proposercerttp">
																<select  id="proposercerttp1" disabled="disabled">
																		<option value="">
																			��ѡ��
																		</option>
																		<option value="01">
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																	</select>
																</td>
															
																<td class="text_tablehead_b" >
																	֤����
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercertid"   title="������֤����"  style="width: 180px;"/>	</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																	��ϵ�绰
																</td>
																<td>
																	<input type="text" readonly="readonly" id="proposertel" title="��������ϵ�绰"  style="width: 180px;"/>
																</td>
																<td class="text_tablehead_b" >
																	�ͻ���
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercstmrid" title="�����˿ͻ���" style="width: 180px;"/>
																</td>
																</tr>
																
																
																<tr>
																

																<td class="text_tablehead_b" >
																	�˻�����
																</td>
																<td>
																<input type="text"  maxlength="30" name="po.proposeraccttp" title="�������˻�����"  readonly="readonly" id="proposerAcctTp" style="width: 180px;">
														
																</td>
																
																</tr>
																
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td>
																		<input type="text" name="po.cdtracct" style="width: 180px;" id="cdtracct"  title="�տ����˺�"  readonly="readonly"  maxlength="32"/>
				                   		<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b">
																	�տ�������
																</td>
																<td>
																	<input type="text" name="po.cdtrnm" id="cdtrnm" style="width: 180px;" title="�տ�������"  readonly="readonly"  maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	  		�տ��˿������к�
																</td>
																<td >
																		<input type="text" name="po.cdtrissuer" id="cdtrissuer" style="width: 180px;" title="�տ��˿������к�" readonly="readonly"  maxlength="14"/>
				                   		<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	�տ��˿���������
																</td>
																<td>
																	<input type="text" name="po.cdtrissuernm" id="cdtrissuernm" title="�տ��˿���������" style="width: 180px;" readonly="readonly" maxlength="60"/><font color="#FF0000">*</font>
				               
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ��˵�ַ
																</td>
																<td colspan="4">
																
																
																	<input type="text" name="po.cdtraddr" id="cdtraddr" style="width: 480px;" title="�տ��˵�ַ"   readonly="readonly" maxlength="14"/>
				                   	
																	</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�տ����к�
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchid" id="cdtrbrnchid" style="width: 180px;" title="�տ����к�" readonly="readonly" maxlength="14"/>
				                   		<font color="#FF0000">*</font> 
																</td>
																<td class="text_tablehead_b" >
																		�տ�������
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchnm" id="cdtrbrnchnm" style="width: 180px;" title="�տ�������" readonly="readonly" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				
																<td>

																	<input type="hidden" name="po.cdtrmmbid" id="cdtrmmbid" style="width: 180px;" title="�տ��������к�"   readonly="readonly" maxlength="14"/>
				                   		
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
																<td class="text_tablehead_b" align="right">
																��ϸ����
																</td>
																<td>
																 
																	
																	<input type="text" id="nboftxs" readonly="readonly" style="width: 180px;" title="��ϸ����"  /><font color="#FF0000">*</font>
																<td class="text_tablehead_b" align="right" >
																	�ۼ�¼����
																</td>
																<td>
															<input type="text" id="aclmtamt" readonly="readonly" style="width: 180px;" title="�ۼ�¼����"  /><font color="#FF0000">*</font>
															</tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	���ִ���
																</td>
																<td>
																		<input type="text" name="po.currencycd" style="width: 180px;" id="currencycd"   title="���ִ���" readonly="readonly" value="CNY"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	�ܶ�
																</td>
																<td >
																		<input type="text" name="po.totalamt" style="width: 180px;" id="totalamt" title="�ܶ�" maxlength="19" readonly="readonly" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" /><font color="#FF0000">*</font>
				                
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		�����
																	</td>
																	<td colspan="4">
																	<input type="text" id="amount"  name="po.amount" title="�����"  style="width: 180px;" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(); "/><font color="#FF0000">*</font>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                   
                                                    <div class="table_content">
                                                    		<table>
                                                    					 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�Ʒ�/������Ϣ</span></td>
                                                      </tr>
                                                    			<tr>	 
																<td class="text_tablehead_b" >
																	��ȡ����
																</td>
																<td >
																	<input type="radio" class="text_tablehead_b_rad"  name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">��ȡ
																	<input type="radio"  class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">����ȡ
																</td>
															</tr>	
															<tr>
															<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																		<input type="text" name="po.servicecharge" id="servicecharge" style="width: 180px;"  title="������" 
				                   		 maxlength="19" onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
				                 
																</td>
																<td class="text_tablehead_b" >
																	������Ϣ
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="ϵͳ��" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="ϵͳ��" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			���
																		</option>
																		<option value="BEPS">
																			С��
																		</option>
																	</select>
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input type="text" name="po.postage" id="postage" maxlength="19" style="width: 180px;"  title="�ʵ��"
				                   		onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
																</td>
																<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td  >
																	<input type="text" name="po.outstationcharge" id="outstationcharge" style="width: 180px;" title="��ؼ���"
				                   		maxlength="19" onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td  >
																	<input name="po.counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="������" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
																</td>
															</tr>
                                                    		</table>
                                                    </div>
                                                    
                                                    
                                                    
                                                       <div class="table_content">
                                                    	<table>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    			<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
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
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    	</table>
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

 
		  
		  
	  
		  
		  
		  
		    

	 	
			
			
			
			
			
			
			
			
			
			
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</html:form>
</body>
</html>
